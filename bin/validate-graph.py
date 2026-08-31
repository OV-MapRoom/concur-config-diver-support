#!/usr/bin/env python3
"""Deterministic invariant check over the whole graph. No model involved — pure verification.

Every claim in the graph is supposed to be a verbatim quote from a real corpus file. This
re-checks that mechanically, across every node, every time. Run after any merge or correction.

Usage: python3 bin/validate-graph.py [--verbose]
Exit 0 if clean, 1 if any ERROR-level invariant is violated.
"""
import json, os, re, sys, unicodedata
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KG = os.path.join(ROOT, 'output', 'kg-invoice-config.json')
CORPUS = '/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE'
VERBOSE = '--verbose' in sys.argv

# A quote copied out of markdown loses layout: list markers, wrapped lines, table pipes.
# Normalising both sides tests the CLAIM (these words, in this order, in this file) rather than
# the transcription. Unicode dashes/quotes are folded because the corpus mixes them.
DASHES = {'‐': '-', '‑': '-', '‒': '-', '–': '-', '—': '-', '−': '-'}
QUOTES = {'‘': "'", '’': "'", '“': '"', '”': '"'}

def norm(s):
    s = unicodedata.normalize('NFKC', s or '')
    for k, v in list(DASHES.items()) + list(QUOTES.items()):
        s = s.replace(k, v)
    s = s.replace(' ', ' ')
    return re.sub(r'\s+', ' ', s).strip().lower()

SELECTOR = re.compile(r'(?:^|[\s(])(?:#[a-z][\w-]*\s*\{|\.[a-z][\w-]*\s*\{|//\*\[@|xpath\s*[:=]|querySelector|getElementById)', re.I)

_cache = {}
def body(rel):
    if rel in _cache:
        return _cache[rel]
    p = os.path.join(CORPUS, rel)
    txt = None
    if os.path.isfile(p):
        txt = open(p, encoding='utf-8', errors='replace').read()
    else:  # tolerate a loose path by searching for the basename
        base = os.path.basename(rel)
        for d in os.listdir(CORPUS):
            c = os.path.join(CORPUS, d, base)
            if os.path.isfile(c):
                txt = open(c, encoding='utf-8', errors='replace').read()
                break
    _cache[rel] = (txt, norm(txt) if txt is not None else None)
    return _cache[rel]

def main():
    kg = json.load(open(KG))
    n = kg['nodes']
    errors, warns = [], []
    stats = Counter()

    pages = {p['id']: p for p in n['configPages']}
    fields = n['configFields']
    field_ids = {f['id'] for f in fields}

    # ---- ConfigField invariants
    for f in fields:
        stats['fields'] += 1
        rel = f.get('sourceFile') or ''
        raw, low = body(rel)
        if raw is None:
            errors.append(('missing-source-file', f['id'], rel)); continue
        stats['file-ok'] += 1
        q = f.get('sourceQuote') or ''
        if not q.strip():
            errors.append(('empty-quote', f['id'], '')); continue
        if norm(q) in low:
            stats['quote-verbatim'] += 1
        else:
            errors.append(('quote-not-in-file', f['id'], q[:80]))
        bad = [v for v in (f.get('validValues') or []) if norm(v) and norm(v) not in low]
        if bad:
            warns.append(('value-not-in-source', f['id'], '; '.join(bad[:4])))
        else:
            stats['values-ok'] += 1
        blob = ' '.join([f.get('notes') or '', q])
        if SELECTOR.search(blob):
            errors.append(('selector-leak', f['id'], ''))
        if f['pageId'] not in pages:
            errors.append(('orphan-field', f['id'], f['pageId']))
        if f.get('uiVariant') not in ('new', 'legacy', 'both', 'undifferentiated'):
            errors.append(('bad-uivariant', f['id'], str(f.get('uiVariant'))))
        if f.get('fromRawHtmlTable') and '<table' not in (raw or '').lower():
            errors.append(('false-rawhtml-flag', f['id'], rel))

    # duplicate names inside one page silently lose a node for any name-keyed consumer
    per_page = defaultdict(list)
    for f in fields:
        per_page[f['pageId']].append(f['name'].strip().lower())
    for pid, names in per_page.items():
        for nm, c in Counter(names).items():
            if c > 1:
                errors.append(('duplicate-field-name', pid, '%s x%d' % (nm, c)))

    # ---- ConfigValueSet invariants
    for v in n.get('configValueSets', []):
        stats['value-sets'] += 1
        stats['values-in-sets'] += len(v.get('values') or [])
        if not v.get('appliesToFieldId'):
            errors.append(('unwired-value-set', v['id'], str(v.get('appliesToRef'))))
        elif v['appliesToFieldId'] not in field_ids:
            errors.append(('value-set-dangling-owner', v['id'], v['appliesToFieldId']))
        raw, low = body(v.get('sourceFile') or '')
        if raw is None:
            errors.append(('value-set-missing-file', v['id'], v.get('sourceFile') or ''))
        elif norm(v.get('sourceQuote') or '') not in low:
            warns.append(('value-set-quote-not-in-file', v['id'], (v.get('sourceQuote') or '')[:60]))
        missing = [x for x in (v.get('values') or []) if raw is not None and norm(x) not in low]
        if missing:
            warns.append(('value-set-entries-not-in-file', v['id'], '%d of %d' % (len(missing), len(v.get('values') or []))))

    # ---- ConfigDependency invariants
    fwd = 0
    for d in n['configDependencies']:
        stats['dependencies'] += 1
        for side, idk in (('sourceRef', 'sourceId'), ('targetRef', 'targetId')):
            ref, fid = d.get(side) or {}, d.get(idk)
            if fid and fid not in field_ids:
                errors.append(('dependency-dangling-id', d['id'], '%s=%s' % (idk, fid)))
            if not fid:
                fwd += 1
                if not ref.get('page'):
                    errors.append(('dependency-unlabelled-endpoint', d['id'], side))
        raw, low = body(d.get('sourceFile') or '')
        if raw is None:
            warns.append(('dependency-missing-file', d['id'], d.get('sourceFile') or ''))
        elif norm(d.get('sourceQuote') or '') not in low:
            warns.append(('dependency-quote-not-in-file', d['id'], (d.get('sourceQuote') or '')[:60]))
    stats['forward-refs'] = fwd

    # ---- ConfigStep invariants
    names_by_page = {p['name'].strip().lower(): p['id'] for p in n['configPages']}
    known = {f['name'].strip().lower() for f in fields}
    for s in n['configSteps']:
        stats['steps'] += 1
        for e in s.get('sequence') or []:
            if e.get('field') and e['field'].strip().lower() not in known and not e['field'].startswith('('):
                warns.append(('step-references-unknown-field', s['id'], e['field']))
            if e.get('page') and e['page'].strip().lower() not in names_by_page:
                warns.append(('step-references-unbuilt-page', s['id'], e['page']))

    # ---- report
    print('GRAPH VALIDATION — %s' % KG)
    print('  pages %d | fields %d | dependencies %d | steps %d | value sets %d (%d values)' % (
        len(pages), stats['fields'], stats['dependencies'], stats['steps'],
        stats['value-sets'], stats['values-in-sets']))
    if stats['fields']:
        print('  quotes verbatim in cited file: %d/%d (%.1f%%)' % (
            stats['quote-verbatim'], stats['fields'], 100.0 * stats['quote-verbatim'] / stats['fields']))
        print('  validValues fully found in source: %d/%d' % (stats['values-ok'], stats['fields']))
    print('  dependency endpoints awaiting an unbuilt page: %d' % stats['forward-refs'])
    print()
    for label, items in (('ERROR', errors), ('WARN', warns)):
        if not items:
            print('%s: none' % label); continue
        print('%s: %d' % (label, len(items)))
        for kind, cnt in Counter(k for k, _, _ in items).most_common():
            print('   %-32s %d' % (kind, cnt))
        if VERBOSE:
            for k, i, d in items:
                print('     %-32s %-56s %s' % (k, i, d))
        print()
    return 1 if errors else 0

if __name__ == '__main__':
    sys.exit(main())
