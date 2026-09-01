#!/usr/bin/env python3
"""Mechanically re-check the MEASURED CLAIMS in a build script against the corpus and the graph.

WHY THIS EXISTS. Each build script is adapted from its predecessor, and its ~1,800 lines interleave
two kinds of content in the same string literals: ACCUMULATED METHOD that must be carried forward
(refuter calibration, the Repair cap, the three-way disposition) and PAGE-SPECIFIC MEASUREMENTS that
must never be (NBSP counts, table row counts, seeded filenames, which pages are built). They are
indistinguishable by eye, so "diff against the parent and read every unchanged hunk" is the right
instruction and an insufficient one: on Workflows Run B a pre-flight audit found six blockers in a
script whose author had just completed exactly that pass, and FIVE HAD BEEN INTRODUCED DURING IT.

This turns that discipline into a gate. It does not judge prose. It re-measures the things that are
measurable and reports where the script disagrees with the corpus or the graph.

    python3 bin/check-script-staleness.py workflows/<script>.mjs

Exit 1 on any ERROR. WARNs are advisory - several are legitimate (a script may deliberately name a
file it is telling agents NOT to open).
"""
import json, os, re, sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CORPUS = '/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE'
KG = os.path.join(ROOT, 'output', 'kg-invoice-config.json')
DIRS = ['concur-invoice-professional-edition-admin-guides',
        'concur-invoice-professional-edition-tools-guides',
        'concur-invoice-professional-edition-release-notes',
        'concur-invoice-professional-edition-release-note-summaries']

errors, warns, notes = [], [], []


def corpus_index():
    ix = {}
    for d in DIRS:
        p = os.path.join(CORPUS, d)
        if os.path.isdir(p):
            for f in os.listdir(p):
                if f.endswith('.md'):
                    ix.setdefault(f, os.path.join(p, f))
    return ix


def cell_openers(path):
    return len(re.findall(r'^\s*\|', open(path, encoding='utf-8').read(), re.M))


def nbsp_count(path):
    return open(path, 'rb').read().count(b'\xc2\xa0')


def unwrap(src):
    """Rejoin filenames a script split across two source lines.

    These files hard-wrap at ~100 chars, so a long corpus filename is routinely broken as
    `...cost-object-` / newline / `approver-hierarchy-6e7b7dc6.md` - across a JS string concat, a
    comment continuation, or a bare line break. Scanning raw text then reports the orphan tail as a
    file that does not exist. Normalise before scanning or the checker cries wolf, which is worse
    than not having it.
    """
    src = re.sub(r"-'\s*,?\s*\n\s*'", '-', src)      # '...cost-object-',\n    'approver-...'
    src = re.sub(r"-\s*\n\s*//\s*", '-', src)         # // ...cost-object-\n// approver-...
    src = re.sub(r"-\s*\n\s*", '-', src)               # bare hyphen-newline continuation
    return src


def main(script):
    raw = open(script, encoding='utf-8').read()
    src = unwrap(raw)
    ix = corpus_index()
    kg = json.load(open(KG, encoding='utf-8')) if os.path.exists(KG) else None

    # ---- 1. every corpus filename the script names must exist -------------------------------
    named = sorted(set(re.findall(r'\b([a-z0-9][a-z0-9\-]*-[0-9a-f]{6,8}\.md)\b', src)))
    missing = [f for f in named if f not in ix]
    for f in missing:
        errors.append(('FILE-NOT-IN-CORPUS', f, 'named in the script, absent from the corpus'))
    notes.append('%d corpus files named, %d resolve' % (len(named), len(named) - len(missing)))

    # ---- 2. graph node ids the script names must exist --------------------------------------
    if kg:
        live = {x['id'] for coll in kg['nodes'].values() for x in coll}
        ids = sorted(set(re.findall(r'\b((?:field|page|vset|dep|contr|range)\.[a-z0-9][a-zA-Z0-9._\-]{3,})', src)))
        for i in ids:
            i = i.rstrip('.,;:)')
            if i in live:
                continue
            # a script legitimately names ids it is ABOUT to create, and truncated ids in prose
            if any(x.startswith(i) for x in live):
                continue
            warns.append(('GRAPH-ID-NOT-FOUND', i, 'not a node in the graph - stale, or not yet built'))
        notes.append('%d graph node ids referenced' % len(ids))

        # ---- 3. "N pages / M fields" bookkeeping ---------------------------------------------
        np_, nf = len(kg['nodes']['configPages']), len(kg['nodes']['configFields'])
        for m in re.finditer(r'(\d{1,3})\s*pages?\s*/\s*(\d{2,4})\s*fields?', src):
            p, f = int(m.group(1)), int(m.group(2))
            if (p, f) != (np_, nf):
                errors.append(('STALE-GRAPH-COUNT', m.group(0),
                               'graph is %d pages / %d fields' % (np_, nf)))
        for m in re.finditer(r'[Oo]f (\d{3,4}) fields in the graph', src):
            if int(m.group(1)) != nf:
                warns.append(('STALE-FIELD-COUNT', m.group(0), 'graph has %d fields' % nf))

    # ---- 4. ZERO-NBSP claims, re-measured ----------------------------------------------------
    # The single most dangerous class: validate-graph.py NORMALISES NBSP to a space, so a quote
    # retyped without it passes validation and lands permanently wrong.
    for m in re.finditer(r'[^\n]{0,200}ZERO NBSP[^\n]{0,200}', src):
        seg = m.group(0)
        scope = [f for f in named if f in seg] or named
        dirty = [(f, nbsp_count(ix[f])) for f in scope if f in ix and nbsp_count(ix[f])]
        if dirty:
            errors.append(('FALSE-ZERO-NBSP', ', '.join('%s=%d' % x for x in dirty[:6]),
                           'the script claims ZERO NBSP; these files carry it'))
    if not re.search(r'NBSP', src):
        warns.append(('NO-NBSP-GUIDANCE', '-', 'the script says nothing about the NBSP trap'))

    # ---- 5. row-count claims that are really cell-opener counts ------------------------------
    # SAP writes every table CELL on its own line, so grep -cP '^\s*\|' returns 1+(cols+1)*rows.
    # A script quoting the raw count as "N rows" sends an extractor after fields that do not exist.
    for m in re.finditer(r'([a-z0-9][a-z0-9\-]*-[0-9a-f]{6,8}\.md)[^.\n]{0,120}?(\d{1,3})\s*(?:rows?|row)', src):
        f, claimed = m.group(1), int(m.group(2))
        if f not in ix:
            continue
        co = cell_openers(ix[f])
        if claimed == co and co > 4:
            # Deliberately does NOT assert a corrected row count. (co-1)//(cols+1) UNDER-COUNTS
            # whenever a row carries an empty cell written as U+00A0, because SAP collapses
            # ` | \xa0 |` onto one line - measured 191-vs-250 and 194-vs-257 on real files by the
            # Group 6 recon. Being honestly vague beats being precisely wrong, which is the same
            # mistake this check exists to catch. Count the rows by reading the table.
            errors.append(('CELL-OPENERS-CALLED-ROWS', '%s: "%d rows"' % (f, claimed),
                           'that is the raw cell-opener count, not rows - convert before quoting it '
                           '(and do not trust a divide-by-columns shortcut either)'))

    # ---- 6. seeded files must be topical for the page that seeds them ------------------------
    # Catches a file seeded onto the wrong page - the one thing that breaks a two-page run's
    # isolation, and invisible to every other check.
    for pm in re.finditer(r"id:\s*'([a-z0-9\-]+)',\s*\n\s*name:\s*'([^']+)'", src):
        pid, pname = pm.group(1), pm.group(2)
        block = src[pm.end():]
        nxt = re.search(r"\n  \{\n    id:", block)
        block = block[:nxt.start()] if nxt else block[:40000]
        stems = [w.lower() for w in re.findall(r'[A-Za-z]{5,}', pname)]
        for f in sorted(set(re.findall(r'\b([a-z0-9][a-z0-9\-]*-[0-9a-f]{6,8}\.md)\b', block))):
            if f not in ix:
                continue
            body = open(ix[f], encoding='utf-8').read().lower()
            if not any(st.rstrip('s') in body for st in stems):
                warns.append(('SEED-NOT-TOPICAL', '%s -> %s' % (pname, f),
                              'contains none of %s - check it is not seeded on the wrong page' % stems))

    # ---- 7. the receipts-destructuring bug ---------------------------------------------------
    if re.search(r'const \[vsRec, depRec, stepRec, ctrRec\]', raw):
        order = re.findall(r"label: 'synth:(\w+)'", raw)
        if order[:4] == ['valueSets', 'dependencies', 'contradictions', 'steps']:
            errors.append(('RECEIPTS-DESTRUCTURED-WRONG', 'stepRec/ctrRec',
                           'array is [valueSets, dependencies, contradictions, steps]; swap the last two'))

    # ---- 8. patchPage in the return is a no-op ------------------------------------------------
    tail = raw[raw.rindex('return {'):] if 'return {' in raw else ''
    if re.search(r'^\s*patchPage:', tail, re.M):
        errors.append(('PATCHPAGE-IN-RETURN', 'return.patchPage',
                       'a no-op: assemble-parts.py composes from the parts dir, not the return. '
                       'patchPage comes from --patch-page'))

    for lbl, arr in (('ERROR', errors), ('WARN', warns)):
        if arr:
            print('\n%s: %d' % (lbl, len(arr)))
            for k, a, b in arr:
                print('  %-28s %-52s %s' % (k, str(a)[:52], b))
    print('\n' + '\n'.join('  . ' + n for n in notes))
    print('\n%s' % ('STALENESS CHECK: clean' if not errors else 'STALENESS CHECK: %d ERROR(s)' % len(errors)))
    return 1 if errors else 0


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    sys.exit(main(sys.argv[1]))
