#!/usr/bin/env python3
"""Merge one group's workflow result into output/kg-invoice-config.json.

Usage:  python3 bin/merge-group.py <workflow-output.json> "<Group label>"

Append-only: existing pages/fields/dependencies/steps are preserved. Re-running for a group
already present replaces just that group's nodes, so a remediation pass is safe.
"""
import json, os, re, sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KG = os.path.join(ROOT, 'output', 'kg-invoice-config.json')

ALL_GROUPS = [
    'Group 1 — Policy & Scope', 'Group 2 — Routing & Approval', 'Group 3 — PO Matching',
    'Group 4 — Capture & Vendors', 'Group 5 — Data Structure & Accounting',
    'Group 6 — Compliance / E-Invoicing', 'Group 7 — Ops (deferred)',
]

def slug(s):
    s = re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
    return re.sub(r'-+', '-', s)[:60] or 'unnamed'

def load_result(path):
    d = json.load(open(path))
    return d['result'] if 'result' in d and 'summary' in d else d

def main(src_path, group):
    r = load_result(src_path)
    kg = json.load(open(KG)) if os.path.exists(KG) else {
        'meta': {'version': '0.1.0', 'status': 'IN_PROGRESS'},
        'nodes': {'configPages': [], 'configFields': [], 'configDependencies': [], 'configSteps': [],
                  'configValueSets': []},
    }
    n = kg['nodes']
    n.setdefault('configValueSets', [])

    # drop any prior nodes for this group so a re-run replaces rather than duplicates
    old_pages = {p['id'] for p in n['configPages'] if p.get('group') == group}
    n['configPages'] = [p for p in n['configPages'] if p.get('group') != group]
    n['configFields'] = [f for f in n['configFields'] if f['pageId'] not in old_pages]
    n['configSteps'] = [s for s in n['configSteps'] if s.get('group') != group]
    n['configDependencies'] = [d for d in n['configDependencies'] if d.get('group') != group]
    n['configValueSets'] = [v for v in n['configValueSets'] if v.get('group') != group]

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
            'uiVariant': p.get('uiVariant', 'both'),
        })
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
                'uiVariant': f.get('uiVariant', 'both'),
            }
            if f.get('fromRawHtmlTable'):
                entry['fromRawHtmlTable'] = True
            n['configFields'].append(entry)
            index[(p['name'].lower(), f['name'].strip().lower())] = fid

    start = len(n['configDependencies'])
    unresolved = 0
    for i, d in enumerate(r['dependencies'], start + 1):
        s = index.get((str(d['sourcePage']).lower(), str(d['sourceField']).strip().lower()))
        t = index.get((str(d['targetPage']).lower(), str(d['targetField']).strip().lower()))
        if not s or not t:
            unresolved += 1
        n['configDependencies'].append({
            'id': 'dep.%03d' % i, 'group': group, 'type': d['type'],
            'sourceId': s, 'targetId': t,
            'sourceRef': {'page': d['sourcePage'], 'field': d['sourceField'], 'resolved': bool(s)},
            'targetRef': {'page': d['targetPage'], 'field': d['targetField'], 'resolved': bool(t)},
            'condition': d['condition'], 'sourceQuote': d['sourceQuote'], 'sourceFile': d['sourceFile'],
        })

    for i, v in enumerate(r.get('valueSets', []), 1):
        owner = index.get((str(v.get('appliesToPage', '')).lower(),
                           str(v.get('appliesToField', '')).strip().lower()))
        n['configValueSets'].append({
            'id': 'vset.%s.%s' % (slug(v.get('appliesToField', 'unknown')), slug(v.get('context', str(i)))),
            'group': group,
            'appliesToFieldId': owner,
            'appliesToRef': {'page': v.get('appliesToPage'), 'field': v.get('appliesToField'),
                             'resolved': bool(owner)},
            'context': v.get('context'),
            'contextFieldRef': v.get('contextField'),
            'values': v.get('values', []),
            'sourceQuote': v.get('sourceQuote'), 'sourceFile': v.get('sourceFile'),
            'notes': v.get('notes', ''),
        })

    for s in r['steps']:
        n['configSteps'].append({
            'id': s['id'], 'group': group, 'name': s['name'], 'goal': s['goal'],
            'pages': s['pages'], 'fields': s['fields'],
            'sequence': sorted(s['sequence'], key=lambda x: x['order']),
        })

    # re-resolve every edge now that new fields exist — later groups fill earlier forward refs
    reresolved = 0
    page_name_by_id = {p['id']: p['name'] for p in n['configPages']}
    index = {(page_name_by_id[f['pageId']].lower(), f['name'].strip().lower()): f['id']
             for f in n['configFields'] if f['pageId'] in page_name_by_id}
    for d in n['configDependencies']:
        for side, key in (('sourceRef', 'sourceId'), ('targetRef', 'targetId')):
            ref = d[side]
            if not ref['resolved']:
                hit = index.get((str(ref['page']).lower(), str(ref['field']).strip().lower()))
                if hit:
                    d[key] = hit; ref['resolved'] = True; reresolved += 1

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
    print('  unresolved endpoints in this group: %d | earlier edges newly resolved: %d' % (unresolved, reresolved))
    print('  status: %s | groups complete: %d' % (kg['meta']['status'], len(done)))

if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
