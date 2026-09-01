#!/usr/bin/env python3
"""Merge a workflow result into output/kg-invoice-config.json.

Usage:
  python3 bin/merge-group.py <workflow-output.json> "<Group label>"
  python3 bin/merge-group.py <workflow-output.json> "<Group label>" --patch

Normal mode replaces every node belonging to the named group.
--patch mode replaces ONLY the pages present in the result, leaving the group's other pages
intact. Use it for a single-page rebuild (e.g. the Audit Rules deep-dive, which sits inside
Group 2 alongside Routing Configuration and Exceptions).

Append-only: existing pages/fields/dependencies/steps are preserved. Re-running for a group
already present replaces just that group's nodes, so a remediation pass is safe.
"""
import json, os, re, sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KG = os.path.join(ROOT, 'output', 'kg-invoice-config.json')

# Every non-deferred label MUST appear here. groupsRemaining is computed as the set
# difference against it, and `status` flips to COMPLETE when every non-Ops entry is done —
# so a group missing from this list is invisible in groupsRemaining AND cannot block
# COMPLETE. 'Workflows' was absent until 2026-08-31: it carries no "Group N" in its label
# (deliberately — 'Group 2W' would derive gtag '2' and collide with the existing dep.g2.*
# ids from the built Group 2), so nothing else in the pipeline would have named it.
ALL_GROUPS = [
    'Group 1 — Policy & Scope', 'Group 2 — Routing & Approval', 'Workflows',
    'Approval Authority',
    'Group 3 — PO Matching',
    'Group 4 — Capture & Vendors', 'Group 5 — Data Structure & Accounting',
    'Group 6 — Compliance / E-Invoicing', 'Group 7 — Ops (deferred)',
    # DELIBERATE, 2026-09-01, and do NOT remove it to make the graph look finished.
    # `status` is COMPLETE when every non-Ops entry here is done, and Group 6 was the last of them —
    # so merging it would have flipped the graph to COMPLETE while page.invoice-settings carried 13
    # of the 24 documented rows of available-invoice-settings-8b3411f0.md, Audit Rules' 91-entry
    # roster encoded ~68 real controls, and 636 of 674 fields were uiVariant 'undifferentiated'
    # (i.e. nobody checked). A config writer reading COMPLETE would reasonably assume the surface is
    # covered. It is not. This entry makes the coverage debt block the claim instead of living only
    # in the build log. Retire it by MERGING a remediation result under this label, never by editing
    # this list. Luke's call, 2026-09-01.
    'Remediation Sweep',
]

def slug(s):
    s = re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
    return re.sub(r'-+', '-', s)[:60] or 'unnamed'

def load_result(path):
    d = json.load(open(path))
    return d['result'] if 'result' in d and 'summary' in d else d

def main(src_path, group, patch=False):
    r = load_result(src_path)
    kg = json.load(open(KG)) if os.path.exists(KG) else {
        'meta': {'version': '0.1.0', 'status': 'IN_PROGRESS'},
        'nodes': {'configPages': [], 'configFields': [], 'configDependencies': [], 'configSteps': [],
                  'configValueSets': [], 'configContradictions': [], 'configCompressedRanges': []},
    }
    n = kg['nodes']
    n.setdefault('configValueSets', [])
    n.setdefault('configContradictions', [])
    n.setdefault('configCompressedRanges', [])

    gnum = re.search(r'Group (\d+)', group)
    gtag = gnum.group(1) if gnum else slug(group)
    ptag = r.get('patchPage')
    # --patch WITHOUT a patchPage is a silent graph-wipe, not a no-op. assemble-parts.py ALWAYS writes
    # the key (as None when --patch-page is absent), so the .get() default below never fires; tag becomes
    # None, and the five filters that follow keep only nodes whose 'patch' equals None-the-tag — deleting
    # every dependency, step, value set, contradiction and range minted by every NON-patch merge.
    # Measured 2026-09-01 on a sandbox copy: 436 deps -> 115, 41 steps -> 12, 114 value sets -> 37, and
    # validate-graph.py then reported "ERROR: none" and exited 0 over the wreckage.
    # NOTE FOR THE NEXT RUN: patchPage comes from assemble-parts.py --patch-page, NOT from the workflow's
    # return value. Both handoffs said otherwise; they were wrong.
    if patch and not ptag:
        sys.exit('--patch requires patchPage in the result, and it comes from assemble-parts.py\n'
                 '--patch-page, NOT from the workflow return value. Without it every node whose\n'
                 '"patch" is None -- i.e. every node from every non-patch merge -- is deleted,\n'
                 'and validate-graph.py still exits 0 over the result.')
    if patch and ptag:
        gtag = '%s%s' % (gtag, ''.join(w[0] for w in slug(ptag).split('-'))[:3])

    # drop prior nodes so a re-run replaces rather than duplicates
    if patch:
        # only the pages this result actually rebuilds
        touched = {'page.' + p['id'] for p in r['pages']}
        tag = r.get('patchPage', sorted(touched)[0])
        n['configPages'] = [p for p in n['configPages'] if p['id'] not in touched]
        # remove fields that LIVE on a rebuilt page and originate from this group or a prior
        # patch of it — but keep any re-homed here from another group by apply-corrections.py
        n['configFields'] = [f for f in n['configFields']
                             if not (f['pageId'] in touched
                                     and f.get('sourceGroup') in (tag, group))]
        n['configSteps'] = [s for s in n['configSteps'] if s.get('patch') != tag]
        n['configDependencies'] = [d for d in n['configDependencies'] if d.get('patch') != tag]
        n['configValueSets'] = [v for v in n['configValueSets'] if v.get('patch') != tag]
        n['configContradictions'] = [c for c in n['configContradictions'] if c.get('patch') != tag]
        n['configCompressedRanges'] = [c for c in n['configCompressedRanges'] if c.get('patch') != tag]
    else:
        n['configPages'] = [p for p in n['configPages'] if p.get('group') != group]
        n['configFields'] = [f for f in n['configFields'] if f.get('sourceGroup') != group]
        n['configSteps'] = [s for s in n['configSteps'] if s.get('group') != group]
        n['configDependencies'] = [d for d in n['configDependencies'] if d.get('group') != group]
        n['configValueSets'] = [v for v in n['configValueSets'] if v.get('group') != group]
        n['configContradictions'] = [c for c in n['configContradictions'] if c.get('group') != group]
        n['configCompressedRanges'] = [c for c in n['configCompressedRanges'] if c.get('group') != group]

    # index every field already in the graph so cross-group edges can resolve
    page_name_by_id = {p['id']: p['name'] for p in n['configPages']}
    index = {(page_name_by_id[f['pageId']].lower(), f['name'].strip().lower()): f['id']
             for f in n['configFields'] if f['pageId'] in page_name_by_id}
    seen = {f['id'] for f in n['configFields']}

    for p in r['pages']:
        pid = 'page.' + p['id']
        counts = Counter(tuple(e['navPath']) for e in p['navPathEvidence'] if e.get('navPath'))
        best = max(counts.items(), key=lambda kv: (len(kv[0]), kv[1]))[0] if counts else ()
        primary = next((e for e in p['navPathEvidence'] if tuple(e.get('navPath') or ()) == best), None)
        n['configPages'].append({
            'id': pid, 'name': p['name'], 'navPath': list(best),
            'navPathSourceQuote': primary['sourceQuote'] if primary else '',
            'navPathSourceFile': primary['sourceFile'] if primary else '',
            'navPathAlternates': sorted({' > '.join(k) for k in counts if k != best}),
            'url': p['url'], 'group': group, 'coverage': p['coverage'],
            'uiVariant': p.get('uiVariant', 'undifferentiated'),
        })
        # A bare {name, url, coverage: thin} node is indistinguishable from a lazy miss - and one such
        # node (Map Invoice Concept Fields) drew exactly that charge from the Group 5A critic. Carry the
        # evidence forward when the build supplies it, so "thin" can be read as a finding about the
        # corpus rather than a gap in the build. Absent keys leave older results byte-identical.
        # tabs/tabsSourceQuote/tabsSourceFile added 2026-08-31 (Workflows recon, pagehood critic).
        # They were NOT in this list, so a build emitting tabs had them silently dropped at merge —
        # page.forms-and-fields carries tabs ONLY because apply-corrections.py:322 hard-codes a
        # value-set-to-tabs conversion for that one page. Generalised here rather than hard-coding a
        # second page: Workflows is one page with seven tabs and four sub-tabs, and losing them would
        # strand every future endpoint against a tab name.
        for key in ('documentedBasis', 'verifyNotes', 'roleGates', 'aliases', 'identityNotes',
                    'tabs', 'tabsSourceQuote', 'tabsSourceFile'):
            if p.get(key):
                n['configPages'][-1][key] = p[key]
        for f in p['fields']:
            base, fid, i = 'field.%s.%s' % (p['id'], slug(f['name'])), None, 2
            fid = base
            while fid in seen:
                fid = '%s-%d' % (base, i); i += 1
            seen.add(fid)
            entry = {
                'id': fid, 'pageId': pid, 'name': f['name'], 'label': f['label'],
                'fieldType': f['fieldType'], 'validValues': f['validValues'],
                'sourceQuote': f['sourceQuote'], 'sourceFile': f['sourceFile'], 'notes': f['notes'],
                'uiVariant': f.get('uiVariant', 'undifferentiated'),
                'sourceGroup': (ptag if patch else group),
            }
            if f.get('fromRawHtmlTable'):
                entry['fromRawHtmlTable'] = True
            n['configFields'].append(entry)
            index[(p['name'].lower(), f['name'].strip().lower())] = fid

    # group-scoped, deterministic ids: stable across re-merges and diffable across builds
    unresolved = 0
    for i, d in enumerate(r['dependencies'], 1):
        s = index.get((str(d['sourcePage']).lower(), str(d['sourceField']).strip().lower()))
        t = index.get((str(d['targetPage']).lower(), str(d['targetField']).strip().lower()))
        if not s or not t:
            unresolved += 1
        n['configDependencies'].append({
            'id': 'dep.g%s.%03d' % (gtag, i), 'group': group, 'patch': (ptag if patch else None), 'type': d['type'],
            'sourceId': s, 'targetId': t,
            'sourceRef': {'page': d['sourcePage'], 'field': d['sourceField'], 'resolved': bool(s)},
            'targetRef': {'page': d['targetPage'], 'field': d['targetField'], 'resolved': bool(t)},
            'condition': d['condition'], 'sourceQuote': d['sourceQuote'], 'sourceFile': d['sourceFile'],
        })

    for i, v in enumerate(r.get('valueSets', []), 1):
        owner = index.get((str(v.get('appliesToPage', '')).lower(),
                           str(v.get('appliesToField', '')).strip().lower()))
        n['configValueSets'].append({
            'id': 'vset.g%s.%s.%s' % (gtag, slug(v.get('appliesToField', 'unknown')), slug(v.get('context', str(i)))),
            'group': group, 'patch': (ptag if patch else None),
            'appliesToFieldId': owner,
            'appliesToRef': {'page': v.get('appliesToPage'), 'field': v.get('appliesToField'),
                             'resolved': bool(owner)},
            'context': v.get('context'),
            'contextFieldRef': v.get('contextField'),
            'values': v.get('values', []),
            'sourceQuote': v.get('sourceQuote'), 'sourceFile': v.get('sourceFile'),
            'notes': v.get('notes', ''),
        })
        # An accepted, documented gap must stay distinguishable from a fresh wiring regression:
        # bin/validate-graph.py demotes an unwired set from ERROR to WARN only when knownGap is set.
        if v.get('knownGap'):
            n['configValueSets'][-1]['knownGap'] = True

    # A contradiction is a claim about what two documents SAY, so each reading carries its own
    # verbatim quote. An unattached contradiction is valid: "is Canada supported for VAT" is about
    # the product, not about any field.
    for i, c in enumerate(r.get('contradictions', []), 1):
        ref = c.get('appliesTo') or {}
        owner = index.get((str(ref.get('page') or '').lower(), str(ref.get('field') or '').strip().lower()))
        n['configContradictions'].append({
            'id': 'contr.g%s.%03d' % (gtag, i), 'group': group, 'patch': (ptag if patch else None),
            'kind': c.get('kind'), 'topic': c.get('topic'),
            'appliesToFieldId': owner,
            'appliesToRef': {'page': ref.get('page'), 'field': ref.get('field'), 'resolved': bool(owner)},
            'readings': c.get('readings') or [],
            'consequenceForWriter': c.get('consequenceForWriter') or '',
            'notes': c.get('notes') or '',
        })

    for i, c in enumerate(r.get('compressedRanges', []), 1):
        ref = c.get('appliesTo') or {}
        owner = index.get((str(ref.get('page') or '').lower(), str(ref.get('field') or '').strip().lower()))
        n['configCompressedRanges'].append({
            'id': 'range.g%s.%03d' % (gtag, i), 'group': group, 'patch': (ptag if patch else None),
            'label': c.get('label'), 'expandsTo': c.get('expandsTo') or [],
            'count': c.get('count'),
            'appliesToFieldId': owner,
            'appliesToRef': {'page': ref.get('page'), 'field': ref.get('field'), 'resolved': bool(owner)},
            'sourceQuote': c.get('sourceQuote'), 'sourceFile': c.get('sourceFile'),
            'notes': c.get('notes') or '',
        })

    for s in r['steps']:
        n['configSteps'].append({
            'id': s['id'], 'group': group, 'patch': (ptag if patch else None), 'name': s['name'], 'goal': s['goal'],
            'pages': s['pages'], 'fields': s['fields'],
            'sequence': sorted(s['sequence'], key=lambda x: x['order']),
        })

    seen_edges, deduped = set(), []
    for d in n['configDependencies']:
        k = (d['type'], str(d['sourceRef']).lower(), str(d['targetRef']).lower(), (d.get('sourceQuote') or '')[:120])
        if k in seen_edges:
            continue
        seen_edges.add(k); deduped.append(d)
    dropped_dupes = len(n['configDependencies']) - len(deduped)
    n['configDependencies'] = deduped

    # re-resolve every edge now that new fields exist — later groups fill earlier forward refs
    reresolved = 0
    page_name_by_id = {p['id']: p['name'] for p in n['configPages']}
    index = {(page_name_by_id[f['pageId']].lower(), f['name'].strip().lower()): f['id']
             for f in n['configFields'] if f['pageId'] in page_name_by_id}
    # ALWAYS re-derive endpoint ids from the textual ref. Field ids change when a page is
    # rebuilt (the Audit Rules patch replaced 36 nodes with 91 new ids); the {page, field} ref is
    # the stable identity. Trusting a stored id left 22 edges pointing at deleted nodes.
    for d in n['configDependencies']:
        for side, key in (('sourceRef', 'sourceId'), ('targetRef', 'targetId')):
            ref = d[side]
            hit = index.get((str(ref['page']).lower(), str(ref['field']).strip().lower()))
            was = d.get(key)
            d[key] = hit
            ref['resolved'] = bool(hit)
            if hit and not was:
                reresolved += 1

    done = sorted({p['group'] for p in n['configPages']})
    kg['meta'].update({
        'version': '0.%d.0' % (len(done) + 1),
        'lastUpdated': os.environ.get('BUILD_DATE', kg['meta'].get('lastUpdated', '')),
        'corpusVersion': '2026_08', 'corpusCommit': 'd838939',
        'corpusCrawledAt': '2026-08-29T12:14:11.751Z', 'corpusEdition': 'Professional Edition',
        'groupsComplete': done,
        'groupsRemaining': [g for g in ALL_GROUPS if g not in done],
        'status': 'COMPLETE' if len([g for g in ALL_GROUPS if g not in done and 'Ops' not in g]) == 0 else 'IN_PROGRESS',
    })
    json.dump(kg, open(KG, 'w'), indent=2, ensure_ascii=False)
    tot = {k: len(v) for k, v in n.items()}
    print('merged %s -> %s' % (group, tot))
    vs = [v for v in n['configValueSets'] if v.get('group') == group]
    if vs:
        print('  value sets: %d carrying %d enumerated values' % (len(vs), sum(len(v['values']) for v in vs)))
    ct = [c for c in n['configContradictions'] if c.get('group') == group]
    rg = [c for c in n['configCompressedRanges'] if c.get('group') == group]
    if ct:
        print('  contradictions: %d carrying %d readings' % (len(ct), sum(len(c['readings']) for c in ct)))
    if rg:
        print('  compressed ranges: %d expanding to %d names' % (len(rg), sum(len(c['expandsTo']) for c in rg)))
    if dropped_dupes:
        print('  duplicate edges removed: %d' % dropped_dupes)
    print('  unresolved endpoints in this group: %d | earlier edges newly resolved: %d' % (unresolved, reresolved))
    print('  status: %s | groups complete: %d' % (kg['meta']['status'], len(done)))

if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if len(args) != 2:
        sys.exit(__doc__)
    main(args[0], args[1], patch='--patch' in sys.argv)
