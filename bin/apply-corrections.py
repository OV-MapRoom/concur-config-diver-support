#!/usr/bin/env python3
"""Apply critic-identified corrections that the build pipeline itself cannot make.

Idempotent. Re-run after any merge — the merge rebuilds nodes from raw results, so these
corrections must be re-applied afterwards. Every entry cites the critic finding that justifies it.
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KG = os.path.join(ROOT, 'output', 'kg-invoice-config.json')

# field id -> (new pageId or None to leave, note to append)
REHOME = {
    # Group 4 critic §4: fields[] and steps[] disagreed on page binding. steps[] was right.
    'field.image-handling.ebunshotimestampconfigurationlist': (
        'page.policies',
        'RE-HOMED 2026-08-31 (Group 4 critic): the field node said Image Handling while its own '
        'notes and the ConfigStep both place it on Policies. Bound to Policies.'),
    'field.image-handling.policyscanconfiguration': (
        'page.policies',
        'RE-HOMED 2026-08-31 (Group 4 critic): this is a Policies (Modify Policy) dropdown '
        'populated from Scan Configurations defined on Image Handling. Bound to Policies.'),
    'field.image-handling.uploadimagesessionlimit': (
        None,
        'FLAGGED 2026-08-31 (Group 4 critic): end-user runtime constraint on the Upload Image '
        'window, not admin-settable config. Retained because a crawler needs the constraint, but '
        'it is not a control on this admin page.'),
}

def main():
    kg = json.load(open(KG))
    changed = 0
    by_id = {f['id']: f for f in kg['nodes']['configFields']}
    for fid, (new_page, note) in REHOME.items():
        f = by_id.get(fid)
        if not f:
            print('  ! not found (already renamed or dropped): %s' % fid); continue
        if note not in f['notes']:
            f['notes'] = (f['notes'].rstrip() + ' ' + note).strip(); changed += 1
        if new_page and f['pageId'] != new_page:
            f['pageId'] = new_page; changed += 1
            print('  re-homed %s -> %s' % (fid, new_page))
    if changed:
        kg['meta'].setdefault('corrections', [])
        stamp = 'Group 4 critic: 3 page-binding corrections applied via bin/apply-corrections.py'
        if stamp not in kg['meta']['corrections']:
            kg['meta']['corrections'].append(stamp)
        json.dump(kg, open(KG, 'w'), indent=2, ensure_ascii=False)
    print('corrections applied: %d change(s)' % changed)

if __name__ == '__main__':
    main()
