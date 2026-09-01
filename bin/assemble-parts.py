#!/usr/bin/env python3
"""Assemble a workflow's on-disk part files into one raw-result JSON for bin/merge-group.py.

Why this exists
---------------
Through Group 5A, a build workflow passed every field record from agent to agent inside prompts
and returned the whole graph slice as its return value. That works, but the full result is ~300KB
and it has to travel through the orchestrating context twice - once out of the workflow, once back
onto disk - and a quote that is retyped is a quote that may stop being verbatim.

From Group 5B the agents write their own artefacts to a parts directory and return only a small
receipt. This script assembles those parts deterministically. No model is involved, so a quote can
only get into the raw result by having been written there by the agent that verified it.

Usage:
  python3 bin/assemble-parts.py <parts-dir> <out.json> [--journal <journal.jsonl>]
                                [--group "<label>"] [--patch-page "<label>"]

Reads from <parts-dir>:
  roster-<pageid>.json     one per page: the final field roster (authoritative)
  synth-valuesets.json     valueSets + validValuesAdditions + orphanCandidates
  synth-dependencies.json  dependencies
  synth-steps.json         steps
  map-navigation.md        prose survey  -> `mapping`
  map-inventory.md         prose survey  -> `mapping`
  critic-*.md              every critic  -> `critic`

navPathEvidence is recovered from the workflow journal rather than a file: the map agent returns it
as structured, schema-validated output, and the journal is a verbatim record of that return value.
"""
import glob, json, os, re, sys, unicodedata
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CORPUS = '/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE'

DASHES = {'‐': '-', '‑': '-', '‒': '-', '–': '-', '—': '-', '−': '-'}
QUOTES = {'‘': "'", '’': "'", '“': '"', '”': '"'}


def norm(s):
    s = unicodedata.normalize('NFKC', s or '')
    for k, v in list(DASHES.items()) + list(QUOTES.items()):
        s = s.replace(k, v)
    s = s.replace(' ', ' ')
    return re.sub(r'\s+', ' ', s).strip().lower()


_cache = {}
def body(rel):
    """Normalised text of a corpus file, or None. Mirrors bin/validate-graph.py exactly."""
    if rel in _cache:
        return _cache[rel]
    txt = None
    p = os.path.join(CORPUS, rel or '')
    if rel and os.path.isfile(p):
        txt = open(p, encoding='utf-8', errors='replace').read()
    elif rel:
        base = os.path.basename(rel)
        for d in sorted(os.listdir(CORPUS)):
            c = os.path.join(CORPUS, d, base)
            if os.path.isfile(c):
                txt = open(c, encoding='utf-8', errors='replace').read()
                break
    _cache[rel] = (txt, norm(txt) if txt is not None else None)
    return _cache[rel]


def read_json(path, default=None):
    if not os.path.isfile(path):
        return default
    with open(path, encoding='utf-8') as fh:
        return json.load(fh)


def read_text(path):
    return open(path, encoding='utf-8', errors='replace').read() if os.path.isfile(path) else ''


def nav_from_journal(path):
    """The map agent's returned pages[], found by shape: it is the only result carrying navPathEvidence."""
    if not path or not os.path.isfile(path):
        return {}
    best = {}
    for line in open(path, encoding='utf-8'):
        line = line.strip()
        if not line:
            continue
        try:
            d = json.loads(line)
        except ValueError:
            continue
        if d.get('type') != 'result':
            continue
        r = d.get('result')
        if not isinstance(r, dict):
            continue
        pages = r.get('pages')
        if not isinstance(pages, list) or not pages:
            continue
        if not any(isinstance(p, dict) and 'navPathEvidence' in p for p in pages):
            continue
        for p in pages:
            if isinstance(p, dict) and p.get('id'):
                best[p['id']] = p
    return best


FIELD_KEYS = ('name', 'label', 'fieldType', 'validValues', 'sourceQuote', 'sourceFile', 'notes')


def norm_field(f):
    out = {
        'name': (f.get('name') or '').strip(),
        'label': f.get('label') or f.get('name') or '',
        'fieldType': f.get('fieldType') or 'unknown',
        'validValues': list(f.get('validValues') or []),
        'sourceQuote': f.get('sourceQuote') or '',
        'sourceFile': (f.get('sourceFile') or '').lstrip('./'),
        'notes': f.get('notes') or '',
        'uiVariant': f.get('uiVariant') or 'undifferentiated',
    }
    # a CONCUR_INVOICE/ prefix broke a drop pass once; strip it here rather than fight it downstream
    if out['sourceFile'].startswith('CONCUR_INVOICE/'):
        out['sourceFile'] = out['sourceFile'][len('CONCUR_INVOICE/'):]
    if f.get('fromRawHtmlTable'):
        out['fromRawHtmlTable'] = True
    return out


def slug(s):
    r"""Byte-identical to merge-group.py's slug. group_tag()'s non-numeric branch called this
    and it was never defined: every group label so far matched /Group (\d+)/, so the branch
    had never executed. The 'Workflows' label (deliberately carrying no "Group N", to avoid
    minting dep.g2.* ids that collide with the built Group 2) is the first to reach it, and it
    raised NameError. Found 2026-08-31."""
    s = re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
    return re.sub(r'-+', '-', s)[:60] or 'unnamed'


def group_tag(group, patch_page=None):
    """Step-id prefix for a group label. 'Group 3 — PO Matching' -> 'grp3-'.

    A patch into an existing group label appends the patch initials, matching how
    merge-group.py builds its gtag: Group 5 + 'Group 5B' -> 'grp5b-'.
    """
    m = re.search(r'Group (\d+)', group or '')
    tag = m.group(1) if m else slug(group or 'x')
    if patch_page:
        pm = re.search(r'Group\s*(\d+\s*[A-Za-z]?)', patch_page)
        if pm:
            tag = pm.group(1).replace(' ', '').lower()
    return 'grp%s-' % tag


def main(parts, out_path, journal=None, group=None, patch_page=None):
    if not group:
        sys.exit('--group is required: the group label as it must appear in the graph, '
                 'e.g. --group "Group 3 — PO Matching"')
    step_prefix = group_tag(group, patch_page)
    nav = nav_from_journal(journal)
    rosters = sorted(glob.glob(os.path.join(parts, 'roster-*.json')))
    if not rosters:
        sys.exit('no roster-*.json in %s' % parts)

    pages, problems, notes = [], [], []
    for rp in rosters:
        r = read_json(rp) or {}
        pid = r.get('pageId') or os.path.basename(rp)[len('roster-'):-len('.json')]
        n = nav.get(pid, {})
        fields = [norm_field(f) for f in (r.get('fields') or [])]
        # a duplicate name on one page is a hard validator ERROR - catch it before the merge
        for nm, c in Counter(f['name'].strip().lower() for f in fields).items():
            if c > 1:
                problems.append(('DUPLICATE-FIELD-NAME', pid, '%s x%d' % (nm, c)))
        for f in fields:
            if not f['name']:
                problems.append(('EMPTY-FIELD-NAME', pid, f.get('label', '')))
        pages.append({
            'id': pid,
            'name': r.get('pageName') or n.get('name') or pid,
            'url': r.get('url') or '',
            'coverage': r.get('coverage') or n.get('coverageGuess') or 'thin',
            'uiVariant': r.get('uiVariant') or n.get('uiVariant') or 'undifferentiated',
            'navPathEvidence': n.get('navPathEvidence') or [],
            'fields': fields,
            'dropped': r.get('dropped') or [],
            'splitsProposed': r.get('splitsProposed') or [],
            'cleanCount': r.get('cleanCount', 0),
            'repairedCount': r.get('repairedCount', 0),
            'verifyNotes': r.get('verifyNotes') or '',
            'documentedBasis': n.get('documentedBasis') or '',
            'roleGates': n.get('roleGates') or [],
            'aliases': n.get('aliases') or [],
            'identityNotes': n.get('identityNotes') or '',
            # tabs added 2026-08-31. The chain that carries a page's tabs to the graph has THREE
            # links (NAV_SCHEMA -> here -> merge-group.py) and only the last was fixed first; a
            # page's tabs die silently if any one of them drops the key. NAV_SCHEMA must also
            # declare `tabs` / `tabsSourceQuote` / `tabsSourceFile` (it sets additionalProperties
            # false, so an undeclared key cannot even be emitted). Absent keys stay absent.
            'tabs': n.get('tabs') or [],
            'tabsSourceQuote': n.get('tabsSourceQuote') or '',
            'tabsSourceFile': n.get('tabsSourceFile') or '',
        })

    by_page_field = {(p['name'].strip().lower(), f['name'].strip().lower()): f
                     for p in pages for f in p['fields']}

    # Cross-group refs are legitimate and valuable: a contradiction or range found while building one
    # group often belongs to a field built in another. Consult the live graph as well as this run's
    # rosters, or every such ref reads as a defect when it is actually the point.
    known_refs = set(by_page_field)
    kg_path = os.path.join(ROOT, 'output', 'kg-invoice-config.json')
    if os.path.isfile(kg_path):
        kg = json.load(open(kg_path, encoding='utf-8'))
        pn = {p['id']: p['name'] for p in kg['nodes']['configPages']}
        for f in kg['nodes']['configFields']:
            if f['pageId'] in pn:
                known_refs.add((pn[f['pageId']].strip().lower(), f['name'].strip().lower()))

    vs_doc = read_json(os.path.join(parts, 'synth-valuesets.json'), {}) or {}
    value_sets = []
    for v in (vs_doc.get('valueSets') or []):
        # An entry in valueSets[] MUST name its page. Without one, merge-group cannot resolve an owner
        # and apply-corrections.wire_by_name will guess one ANYWHERE in the graph — which is how a set
        # lands on a plausible neighbour on another page. "I cannot name the owner" has its own channel:
        # orphanCandidates, which land below as knownGap sets with an empty page ON PURPOSE, so this
        # check is scoped to the valueSets[] channel only. Added 2026-09-01.
        if not str(v.get('appliesToPage') or '').strip():
            problems.append(('VALUE-SET-NO-PAGE', str(v.get('appliesToField') or '?')[:40],
                             'appliesToPage is empty - put it in orphanCandidates instead'))
        value_sets.append({
            'appliesToPage': v.get('appliesToPage') or '',
            'appliesToField': v.get('appliesToField') or '',
            'contextField': v.get('contextField') or '',
            'context': v.get('context') or '',
            'values': list(v.get('values') or []),
            'sourceQuote': v.get('sourceQuote') or '',
            'sourceFile': (v.get('sourceFile') or '').lstrip('./'),
            'notes': v.get('notes') or '',
        })

    # validValuesAdditions become UNCONDITIONAL value sets rather than being spliced into a field's
    # validValues. The validator checks a field's values against the FIELD's sourceFile, so values
    # sourced from a different topic would warn there while being perfectly well grounded here.
    added = 0
    for a in (vs_doc.get('validValuesAdditions') or []):
        key = (str(a.get('page', '')).strip().lower(), str(a.get('field', '')).strip().lower())
        if key not in by_page_field:
            problems.append(('VALUE-ADDITION-UNKNOWN-FIELD', a.get('page', ''), a.get('field', '')))
            continue
        value_sets.append({
            'appliesToPage': a.get('page'),
            'appliesToField': a.get('field'),
            'contextField': '',
            'context': 'Unconditional option list. The field record cites a topic that does not '
                       'enumerate the options; this set carries the enumeration from the topic that '
                       'does. ' + (a.get('why') or ''),
            'values': list(a.get('values') or []),
            'sourceQuote': a.get('sourceQuote') or '',
            'sourceFile': (a.get('sourceFile') or '').lstrip('./'),
            'notes': 'Materialised from validValuesAdditions by bin/assemble-parts.py so the '
                     'enumeration is validated against its own cited file.',
        })
        added += 1
    if added:
        notes.append('%d validValuesAdditions materialised as unconditional value sets' % added)
    # Orphans are enumerations the synthesiser refused to attach to a field, on principle: the corpus
    # scopes them somewhere other than a Group 5B field, and a wrong owner is worse than an honest null.
    # They still MUST reach the graph. "Unwired" and "deleted" are different answers, and dropping them
    # here would repeat Rule 2's failure one stage later - the 249-row country catalog alone is the
    # class of artefact a 2.36M-token re-run was once paid to recover. They land as knownGap sets, the
    # same accepted-gap mechanism bin/validate-graph.py already demotes from ERROR to WARN.
    orphans = vs_doc.get('orphanCandidates') or []
    for o in orphans:
        value_sets.append({
            'appliesToPage': '',
            'appliesToField': '',
            'contextField': '',
            'context': o.get('enumerates') or '',
            'values': list(o.get('values') or []),
            'sourceQuote': o.get('sourceQuote') or '',
            'sourceFile': (o.get('sourceFile') or '').lstrip('./'),
            'knownGap': True,
            'notes': ('ACCEPTED GAP - deliberately unwired. WHY NO OWNER: ' + (o.get('whyNoOwner') or '')
                      + ' WHAT WOULD FIX IT: ' + (o.get('whatWouldFixIt') or '')),
        })
    if orphans:
        notes.append('%d orphanCandidates (%d values) landed as knownGap value sets - recorded, '
                     'deliberately unwired' % (orphans and len(orphans) or 0,
                                               sum(len(o.get('values') or []) for o in orphans)))

    deps = []
    for d in (read_json(os.path.join(parts, 'synth-dependencies.json'), {}) or {}).get('dependencies') or []:
        deps.append({
            'type': d.get('type') or 'depends_on',
            'sourcePage': d.get('sourcePage') or '',
            'sourceField': d.get('sourceField') or '',
            'targetPage': d.get('targetPage') or '',
            'targetField': d.get('targetField') or '',
            'condition': d.get('condition') or '',
            'sourceQuote': d.get('sourceQuote') or '',
            'sourceFile': (d.get('sourceFile') or '').lstrip('./'),
        })

    contradictions = []
    for c in (read_json(os.path.join(parts, 'synth-contradictions.json'), {}) or {}).get('contradictions') or []:
        contradictions.append({
            'kind': c.get('kind') or '',
            'topic': c.get('topic') or '',
            'appliesTo': c.get('appliesTo') or {},
            'readings': [{'summary': r.get('summary') or '',
                          'sourceQuote': r.get('sourceQuote') or '',
                          'sourceFile': (r.get('sourceFile') or '').lstrip('./')}
                         for r in (c.get('readings') or [])],
            'consequenceForWriter': c.get('consequenceForWriter') or '',
            'notes': c.get('notes') or '',
        })

    ranges = []
    for c in (read_json(os.path.join(parts, 'synth-ranges.json'), {}) or {}).get('compressedRanges') or []:
        ranges.append({
            'label': c.get('label') or '',
            'expandsTo': list(c.get('expandsTo') or []),
            'count': c.get('count'),
            'appliesTo': c.get('appliesTo') or {},
            'sourceQuote': c.get('sourceQuote') or '',
            'sourceFile': (c.get('sourceFile') or '').lstrip('./'),
            'notes': c.get('notes') or '',
        })

    steps = []
    for s in (read_json(os.path.join(parts, 'synth-steps.json'), {}) or {}).get('steps') or []:
        steps.append({
            'id': s.get('id') or (step_prefix + 'unnamed'),
            'name': s.get('name') or '',
            'goal': s.get('goal') or '',
            'pages': list(s.get('pages') or []),
            'fields': list(s.get('fields') or []),
            'sequence': sorted((s.get('sequence') or []), key=lambda x: x.get('order', 0)),
        })

    # ---- pre-merge self-check. bin/validate-graph.py is still the gate; this just fails earlier.
    quote_ok = quote_bad = 0
    for p in pages:
        for f in p['fields']:
            raw, low = body(f['sourceFile'])
            if raw is None:
                problems.append(('MISSING-SOURCE-FILE', p['id'], '%s -> %s' % (f['name'], f['sourceFile'])))
                continue
            if norm(f['sourceQuote']) and norm(f['sourceQuote']) in low:
                quote_ok += 1
            else:
                quote_bad += 1
                problems.append(('QUOTE-NOT-VERBATIM', p['id'], '%s :: %s' % (f['name'], f['sourceQuote'][:70])))
            bad = [x for x in f['validValues'] if norm(x) and norm(x) not in low]
            if bad:
                problems.append(('VALUE-NOT-IN-SOURCE', p['id'], '%s :: %s' % (f['name'], '; '.join(bad[:3]))))
            if f.get('fromRawHtmlTable') and '<table' not in (raw or '').lower():
                problems.append(('FALSE-RAWHTML-FLAG', p['id'], f['name']))

    for v in value_sets:
        key = (str(v['appliesToPage']).strip().lower(), str(v['appliesToField']).strip().lower())
        if key not in by_page_field and not v.get('knownGap'):
            problems.append(('VALUE-SET-WOULD-LAND-UNWIRED', v['appliesToPage'], v['appliesToField']))
        raw, low = body(v['sourceFile'])
        if raw is None:
            problems.append(('VALUE-SET-MISSING-FILE', v['appliesToField'], v['sourceFile']))
            continue
        miss = [x for x in v['values'] if norm(x) and norm(x) not in low]
        if miss:
            problems.append(('VALUE-SET-ENTRIES-NOT-IN-FILE', v['appliesToField'],
                             '%d of %d, e.g. %s' % (len(miss), len(v['values']), '; '.join(miss[:2]))))

    KINDS = {'label-drift', 'option-list', 'scope', 'structure', 'cardinality', 'requirement'}
    for i, c in enumerate(contradictions):
        who = (c['topic'] or '')[:40]
        if len(c['readings']) < 2:
            problems.append(('CONTRADICTION-UNDER-TWO-READINGS', who, '%d' % len(c['readings'])))
        if c['kind'] not in KINDS:
            problems.append(('CONTRADICTION-BAD-KIND', who, str(c['kind'])))
        for r in c['readings']:
            raw, low = body(r['sourceFile'])
            if raw is None:
                problems.append(('CONTRADICTION-MISSING-FILE', who, r['sourceFile']))
            elif not norm(r['sourceQuote']) or norm(r['sourceQuote']) not in low:
                problems.append(('CONTRADICTION-QUOTE-NOT-VERBATIM', who, r['sourceQuote'][:60]))
        ref = c['appliesTo'] or {}
        if ref.get('page') and ref.get('field'):
            if (str(ref['page']).strip().lower(), str(ref['field']).strip().lower()) not in known_refs:
                problems.append(('CONTRADICTION-REF-UNKNOWN', who,
                                 '%s / %s' % (ref.get('page'), ref.get('field'))))

    for c in ranges:
        who = (c['label'] or '')[:40]
        if c['count'] != len(c['expandsTo']):
            problems.append(('RANGE-COUNT-MISMATCH', who, 'count=%s len=%d' % (c['count'], len(c['expandsTo']))))
        if len(c['expandsTo']) < 2:
            problems.append(('RANGE-UNDER-TWO-MEMBERS', who, '%d' % len(c['expandsTo'])))
        raw, low = body(c['sourceFile'])
        if raw is None:
            problems.append(('RANGE-MISSING-FILE', who, c['sourceFile']))
        elif not norm(c['sourceQuote']) or norm(c['sourceQuote']) not in low:
            problems.append(('RANGE-QUOTE-NOT-VERBATIM', who, c['sourceQuote'][:60]))
        ref = c['appliesTo'] or {}
        if ref.get('page') and ref.get('field'):
            if (str(ref['page']).strip().lower(), str(ref['field']).strip().lower()) not in known_refs:
                problems.append(('RANGE-REF-UNKNOWN', who, '%s / %s' % (ref.get('page'), ref.get('field'))))

    # Two distinct endpoint checks. The first covers pages built IN THIS RUN; the second covers pages
    # ALREADY IN THE GRAPH, which went unchecked entirely until 2026-09-01. Cross-page edges are usually
    # written against a control's LABEL ("Approval Limit") rather than its name
    # ("authorized_approver_approval_limit"), and such an edge dangles forever while validate-graph.py
    # files it among the legitimate forward references to unbuilt groups. Both are advisory, not FATAL:
    # a page-level forward reference with no field is deliberate, and many built-page endpoints are
    # conceptual prose references rather than exact field names.
    page_names = {p['name'].strip().lower() for p in pages}
    live_pages = {p for p, _ in known_refs}
    for d in deps:
        for side in ('source', 'target'):
            pg, fl = str(d[side + 'Page']).strip().lower(), str(d[side + 'Field']).strip().lower()
            if not fl:
                continue  # a deliberate page-level forward reference
            if pg in page_names and (pg, fl) not in by_page_field:
                problems.append(('DEP-ENDPOINT-NOT-IN-ROSTER', d['type'], '%s / %s' % (d[side + 'Page'], d[side + 'Field'])))
            elif pg in live_pages and (pg, fl) not in known_refs:
                problems.append(('DEP-ENDPOINT-NOT-ON-BUILT-PAGE', d['type'], '%s / %s' % (d[side + 'Page'], d[side + 'Field'])))

    seen_vs = {}
    for v in value_sets:
        # MUST use the same slug() merge-group.py mints ids with (both truncate at 60 chars), or two
        # sets diverging only after 60 slug-chars read as distinct here and collide in the graph.
        k = (slug(str(v['appliesToField'])), slug(str(v['context'])))
        if k in seen_vs:
            problems.append(('VALUE-SET-ID-COLLISION', '/'.join(k), 'two sets would mint the same node id'))
        seen_vs[k] = True

    # The step-id prefix is per-group and MUST be derived, never hard-coded: this check
    # read 'grp5b-' until Group 3, where it flagged all six correctly-prefixed ids.
    # THE TWO DERIVATIONS CAN DISAGREE, and this comment used to claim they could not.
    # merge-group.py suffixes gtag with the patch-page initials when --patch is used, but only
    # matches /Group\s*(\d+...)/ here — so a non-numeric patch label like 'Workflows' yields
    # step prefix 'grpworkflows-' while merge-group mints dep ids under 'workflowsw'.
    # That divergence is BENIGN (step ids come from the parts, dep ids are minted) but it means
    # a patch run SHARES the step-id namespace with the run it patches. Give a patch run its own
    # step sub-prefix, and rely on validate-graph.py's duplicate-node-id invariant as the backstop.
    # Measured 2026-09-01 while scoping Workflows Run B.
    for s in steps:
        if not s['id'].startswith(step_prefix):
            problems.append(('STEP-ID-NOT-PREFIXED', s['id'], 'expected prefix %r from group %r' % (step_prefix, group)))

    mapping = '\n\n---\n\n'.join(x for x in [read_text(os.path.join(parts, 'map-navigation.md')),
                                             read_text(os.path.join(parts, 'map-inventory.md'))] if x)
    critic = '\n\n---\n\n'.join(read_text(f) for f in sorted(glob.glob(os.path.join(parts, 'critic-*.md'))))

    result = {
        'group': group,
        'patchPage': patch_page,
        'corpusVersion': '2026_08',
        'mapping': mapping,
        'pages': pages,
        'valueSets': value_sets,
        'dependencies': deps,
        'steps': steps,
        'contradictions': contradictions,
        'compressedRanges': ranges,
        'critic': critic,
        'orphanValueSetCandidates': orphans,
        'counts': {
            'pages': len(pages),
            'fields': sum(len(p['fields']) for p in pages),
            'dropped': sum(len(p['dropped']) for p in pages),
            'repaired': sum(p['repairedCount'] for p in pages),
            'splitsProposed': sum(len(p['splitsProposed']) for p in pages),
            'valueSets': len(value_sets),
            'valueSetsKnownGap': sum(1 for v in value_sets if v.get('knownGap')),
            'valuesInSets': sum(len(v['values']) for v in value_sets),
            'dependencies': len(deps),
            'steps': len(steps),
            'contradictions': len(contradictions),
            'contradictionReadings': sum(len(c['readings']) for c in contradictions),
            'compressedRanges': len(ranges),
            'rangeNames': sum(len(c['expandsTo']) for c in ranges),
        },
    }
    with open(out_path, 'w', encoding='utf-8') as fh:
        json.dump(result, fh, indent=2, ensure_ascii=False)

    print('assembled -> %s' % out_path)
    for k, v in result['counts'].items():
        print('  %-16s %s' % (k, v))
    for p in pages:
        print('  page %-26s %3d fields | coverage %-7s | basis %-8s | dropped %d'
              % (p['name'], len(p['fields']), p['coverage'], p['documentedBasis'] or '?', len(p['dropped'])))
    print('  quotes verbatim: %d ok / %d bad' % (quote_ok, quote_bad))
    for n in notes:
        print('  note: %s' % n)
    if problems:
        print('\nPRE-MERGE PROBLEMS: %d' % len(problems))
        for kind, cnt in Counter(k for k, _, _ in problems).most_common():
            print('   %-32s %d' % (kind, cnt))
        print()
        for k, a, b in problems:
            print('   %-32s %-28s %s' % (k, a, b))
    else:
        print('\nPRE-MERGE PROBLEMS: none')
    FATAL = ('QUOTE-NOT-VERBATIM', 'MISSING-SOURCE-FILE', 'DUPLICATE-FIELD-NAME', 'EMPTY-FIELD-NAME',
             'CONTRADICTION-QUOTE-NOT-VERBATIM', 'CONTRADICTION-MISSING-FILE',
             'CONTRADICTION-UNDER-TWO-READINGS', 'CONTRADICTION-BAD-KIND',
             'RANGE-QUOTE-NOT-VERBATIM', 'RANGE-MISSING-FILE', 'RANGE-COUNT-MISMATCH',
             'VALUE-SET-NO-PAGE')
    return 1 if any(k in FATAL for k, _, _ in problems) else 0


if __name__ == '__main__':
    a = [x for x in sys.argv[1:] if not x.startswith('--')]
    if len(a) < 2:
        sys.exit(__doc__)
    def opt(name, default=None):
        f = '--' + name
        return sys.argv[sys.argv.index(f) + 1] if f in sys.argv else default
    # No defaults for group / patch-page. They previously defaulted to Group 5B's values,
    # so a Group 3 run silently produced a result carrying patchPage 'Group 5B' — which
    # merge-group.py --patch would have used to tag and strip nodes under the wrong group.
    sys.exit(main(a[0], a[1], journal=opt('journal'),
                  group=opt('group'), patch_page=opt('patch-page')))
