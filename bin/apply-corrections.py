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

# Audit Rules deep-dive critic: value sets carried appliesToField "Field/Value", which is the
# column's LABEL, not any field's name — so every set failed to resolve. The catalog supplies the
# options for BOTH Field/Value columns (C and F) of the condition editor; C is the canonical owner.
VALUESET_OWNER = {
    'Field/Value': ('field.audit-rules.condition-field-value-left',
                    'field.audit-rules.condition-field-value-right'),
}

# The same critic: two records share the name `rule_name_link`, differing only by uiVariant.
# Unique ids, colliding names — a consumer keying on name silently loses one.
RENAME_BY_VARIANT = {'rule_name_link'}


# validate-graph.py findings, 2026-08-31. Each is a value or flag the corpus does not support —
# the exact class of quiet invention a blind build exists to prevent.
VALUE_FIXES = {
    'field.capture-processing-admin.block-incoming-emails': (
        ['No'],
        'Corrected 2026-08-31: "Yes" was removed — it appears nowhere in the cited file. The '
        'corpus documents only the No option ("unless the admin selects No"). The complementary '
        'state is undocumented; do not assume the control is a Yes/No pair.'),
    'field.capture-processing-admin.send-email-acknowledgement': (
        ['No'],
        'Corrected 2026-08-31: "Yes" was removed — not present in the cited file. The corpus gives '
        '"(Default = No)" and describes only selecting No. The opposite state is undocumented.'),
    'field.image-handling.formatsofemailsanduploads': (
        ['PNG', 'JPG', 'JPEG', 'PDF', 'TIF', 'TIFF'],
        'Corrected 2026-08-31: "HTML (no double-byte characters)" was removed — that phrasing '
        'appears nowhere in the cited file, and the only "double-byte" text in the corpus is in an '
        'unrelated topic about email message character limits. Conflated from another context.'),
}
CLEAR_RAWHTML_FLAG = {
    # flagged fromRawHtmlTable but grep -c '<table' on the cited file returns 0
    'field.exceptions.editablebygroups':
        'Corrected 2026-08-31: fromRawHtmlTable flag cleared — the cited file contains no <table> '
        'element. The value came from a markdown pipe table.',
}


def fix_values(kg):
    changed = 0
    for f in kg['nodes']['configFields']:
        fx = VALUE_FIXES.get(f['id'])
        if fx and f.get('validValues') != fx[0]:
            f['validValues'] = list(fx[0])
            if fx[1] not in (f.get('notes') or ''):
                f['notes'] = ((f.get('notes') or '').rstrip() + ' ' + fx[1]).strip()
            changed += 1
        note = CLEAR_RAWHTML_FLAG.get(f['id'])
        if note and f.get('fromRawHtmlTable'):
            f['fromRawHtmlTable'] = False
            if note not in (f.get('notes') or ''):
                f['notes'] = ((f.get('notes') or '').rstrip() + ' ' + note).strip()
            changed += 1
    return changed


def wire_value_sets(kg):
    changed = 0
    ids = {f['id'] for f in kg['nodes']['configFields']}
    for v in kg['nodes'].get('configValueSets', []):
        if v.get('appliesToFieldId'):
            continue
        owner = VALUESET_OWNER.get(v.get('appliesToRef', {}).get('field') or v.get('appliesToField'))
        if not owner:
            continue
        primary, also = owner
        if primary in ids:
            v['appliesToFieldId'] = primary
            v['appliesToRef']['resolved'] = True
            v['alsoAppliesToFieldId'] = also if also in ids else None
            note = ('Wired 2026-08-31: the catalog supplies options for both Field/Value columns '
                    '(C and F) of the condition editor; C is the canonical owner.')
            if note not in (v.get('notes') or ''):
                v['notes'] = ((v.get('notes') or '').rstrip() + ' ' + note).strip()
            changed += 1
    return changed


def disambiguate_names(kg):
    changed = 0
    for f in kg['nodes']['configFields']:
        if f['name'] in RENAME_BY_VARIANT and f.get('uiVariant') in ('new', 'legacy'):
            newname = '%s_%s' % (f['name'], f['uiVariant'])
            if f['name'] != newname:
                f['notes'] = ((f.get('notes') or '').rstrip() +
                              ' Renamed 2026-08-31 from "%s" to disambiguate the legacy/new pair, '
                              'which collided on name.' % f['name']).strip()
                f['name'] = newname
                changed += 1
    return changed


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
    changed += fix_values(kg)
    changed += wire_value_sets(kg)
    changed += disambiguate_names(kg)
    if changed:
        kg['meta'].setdefault('corrections', [])
        stamp = 'Group 4 critic: 3 page-binding corrections applied via bin/apply-corrections.py'
        if stamp not in kg['meta']['corrections']:
            kg['meta']['corrections'].append(stamp)
        json.dump(kg, open(KG, 'w'), indent=2, ensure_ascii=False)
    print('corrections applied: %d change(s)' % changed)

if __name__ == '__main__':
    main()
