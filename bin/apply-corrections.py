#!/usr/bin/env python3
"""Apply critic-identified corrections that the build pipeline itself cannot make.

Idempotent. Re-run after any merge — the merge rebuilds nodes from raw results, so these
corrections must be re-applied afterwards. Every entry cites the critic finding that justifies it.
"""
import json, os, re, sys

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


# ---------------------------------------------------------------------------
# Group 3 (PO Matching) critics, 2026-08-31. Both critics independently flagged the
# uiVariant defect; every entry below was re-verified by hand before being written here.
# ---------------------------------------------------------------------------

# A page-level uiVariant is a POSITIVE VERIFICATION CLAIM. "both" means someone read both
# variants and they matched.
PAGE_UIVARIANT = {
    'page.purchase-order-matching-rules': (
        'undifferentiated',
        'Corrected 2026-08-31 (both Group 3 critics, independently): page uiVariant was "both" '
        'while all 35 of its own fields were "undifferentiated" — a claim the build\'s own '
        'evidence contradicts. The roster\'s own skip note says the legacy twin "is the evidence '
        'for NOT claiming uiVariant both", and the crosscut lens declined it explicitly: the New '
        'Experience twin contributes no unique procedure, differing only in the control label '
        '"Change to Non PO Invoice" vs "Change to Non-PO" (recorded separately as a contradiction). '
        'In the live graph the only page marked "both" is Audit Rules, which backs it with 27 '
        '"both" + 6 legacy + 5 new fields. Nobody checked here, so the honest value is '
        '"undifferentiated".'),
}

# Fields the corpus does not place on the page they landed on. Dropping is reserved for records
# whose own cited source names a different owner - not for records that are merely thin.
DROP_FIELDS = {
    'field.purchase-order-matching-rules.match-status': (
        'Dropped 2026-08-31 (Group 3 correctness critic): Match Status is a derived RUNTIME '
        'attribute of an invoice, not a control on this admin page. Its own sourceQuote names the '
        'pages it belongs to and this is not one of them — "Match Status displays on the My '
        'Invoices, Approve Invoice, Assign Invoice, and Processor List pages." grep -c "Purchase '
        'Order Matching Rules" on the cited file returns 0, and the corpus documents no setter. '
        'Its 6-value catalog is retained as a knownGap value set — unwired, not deleted.'),
    'field.purchase-order-matching-rules.matching-rule-type': (
        'Dropped 2026-08-31 (Group 3 correctness critic): a taxonomy, not a control. Its label '
        '"Matching rule type" appears in ZERO corpus files (verified: grep -rlF over both guide '
        'directories), and its two validValues "Life to Date" and "Rules" already exist as the '
        'records life_to_date_tab and rules_tab. A driver told to set "Matching rule type = Rules" '
        'has no control to act on; the real action is clicking a tab. The build\'s own '
        'splitsProposed conceded this and referred it to a human.'),
}

# An existing edge whose textual endpoint never matched any field name, so it dangles forever
# while looking like it should resolve.
REPOINT_ENDPOINT = {
    # dep.g1.057 / .058 targeted {page: Purchase Order Configuration, field: "PO Configuration"}.
    # Group 3 created the page but no such field: "PO Configuration" was the PAGE name written
    # into a field slot. dep.g1.057's sourceQuote is BYTE-IDENTICAL to group_selector's, from the
    # same file and sentence, which makes the intended endpoint unambiguous.
    ('dep.g1.057', 'targetRef'): ('Purchase Order Configuration', 'group_selector'),
    ('dep.g1.058', 'targetRef'): ('Purchase Order Configuration', 'group_selector'),
}

# Value sets whose "values" are not the enumeration they claim to be.
VALUESET_VALUE_FIXES = {
    # A 6x4 matrix flattened into six ||-joined row strings. The role NAMES are the enumerable
    # thing and each is verbatim; the other three columns are description and belong in notes.
    'vset.g3.unnamed.concur-receiving-roles-matrix-the-complete-6-row-x-4-column-': (
        ['Purchase Order Processor', 'Invoice Processor', 'Purchase Request User',
         'Invoice User', 'Central Receiver', 'Receipt User'],
        'Corrected 2026-08-31 (assembler pre-merge check): the six values were ||-joined 4-column '
        'table rows, which can never verify verbatim against the source. Reduced to the six role '
        'names, each of which is verbatim in the cited file. The What/Where/Conditions columns are '
        'description, not enumeration. NOTE the unresolved twin disagreement flagged by the '
        'completeness critic: the never-opened admin twin concur-receiving-roles-099f375f.md says '
        '"the user must also have the Receipt User role" where the extracted tools twin says "can '
        'have" — mandatory vs optional. Recorded as debt, not reconciled here.'),
}


def fix_page_uivariant(kg):
    changed = 0
    for p in kg['nodes']['configPages']:
        fx = PAGE_UIVARIANT.get(p['id'])
        if fx and p.get('uiVariant') != fx[0]:
            p['uiVariant'] = fx[0]
            p['identityNotes'] = ((p.get('identityNotes') or '').rstrip() + ' ' + fx[1]).strip()
            changed += 1
            print('  uiVariant %s -> %s' % (p['id'], fx[0]))
    return changed


def drop_fields(kg):
    """Drop mis-homed records, but never silently drop an enumeration with them (rule 11)."""
    changed = 0
    present = {f['id'] for f in kg['nodes']['configFields']}
    for fid, reason in DROP_FIELDS.items():
        if fid not in present:
            continue
        for v in kg['nodes'].get('configValueSets', []):
            if v.get('appliesToFieldId') == fid:
                v['appliesToFieldId'] = None
                v['knownGap'] = True
                v['whyNoOwner'] = reason
                v.setdefault('appliesToRef', {})['resolved'] = False
                print('  value set %s -> knownGap (owner dropped)' % v['id'])
        # A contradiction or range that named the dropped field keeps its readings — the
        # disagreement is still real and still grounded — but loses its owner. An empty
        # appliesTo is valid and common (docs/SCHEMA.md); a dangling one is a hard ERROR.
        for key in ('configContradictions', 'configCompressedRanges'):
            for c in kg['nodes'].get(key, []):
                if c.get('appliesToFieldId') == fid:
                    c['appliesToFieldId'] = None
                    c['appliesTo'] = {}
                    c['notes'] = ((c.get('notes') or '').rstrip() + ' Owner cleared 2026-08-31: '
                                  'the field it was attached to was dropped as mis-homed. The '
                                  'disagreement stands on its own readings.').strip()
                    print('  %s %s -> owner cleared (field dropped)' % (key, c['id']))
        kg['nodes']['configFields'] = [f for f in kg['nodes']['configFields'] if f['id'] != fid]
        changed += 1
        print('  dropped %s' % fid)
    return changed


def repoint_endpoints(kg):
    changed = 0
    names = {}
    pages = {p['id']: p['name'] for p in kg['nodes']['configPages']}
    for f in kg['nodes']['configFields']:
        names[(pages.get(f['pageId'], '').lower(), f['name'].strip().lower())] = f['id']
    for d in kg['nodes']['configDependencies']:
        for key in ('sourceRef', 'targetRef'):
            fix = REPOINT_ENDPOINT.get((d['id'], key))
            if not fix:
                continue
            page, field = fix
            ref = d.get(key) or {}
            if ref.get('field') == field and ref.get('resolved'):
                continue
            fid = names.get((page.lower(), field.lower()))
            if not fid:
                print('  ! repoint target not found: %s %s -> %s' % (d['id'], key, field))
                continue
            ref['field'] = field
            ref['resolved'] = True
            d[key] = ref
            d['%sId' % key.replace('Ref', '')] = fid
            d['sourceId' if key == 'sourceRef' else 'targetId'] = fid
            changed += 1
            print('  repointed %s.%s -> %s' % (d['id'], key, fid))
    return changed


def fix_valueset_values(kg):
    changed = 0
    for v in kg['nodes'].get('configValueSets', []):
        fx = VALUESET_VALUE_FIXES.get(v['id'])
        if fx and v.get('values') != fx[0]:
            v['values'] = list(fx[0])
            if fx[1] not in (v.get('notes') or ''):
                v['notes'] = ((v.get('notes') or '').rstrip() + ' ' + fx[1]).strip()
            changed += 1
            print('  value set values corrected: %s' % v['id'])
    return changed


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


def _norm(s):
    return re.sub(r'[^a-z0-9]', '', (s or '').lower())


def wire_by_name(kg):
    """Wire value sets whose appliesToField is a field's LABEL rather than its name.

    Extractors keep writing the human label ("Data Type") where the schema wants the field's
    `name` ("dataType"). Rather than hand-map each one, match on a normalised name — preferring a
    field on the same page, falling back to a graph-wide unique match. Ambiguous or absent
    matches are left unwired on purpose: a wrong owner is worse than an honest null.
    """
    fields = kg['nodes']['configFields']
    pages = {p['name'].strip().lower(): p['id'] for p in kg['nodes']['configPages']}
    changed = 0
    for v in kg['nodes'].get('configValueSets', []):
        if v.get('appliesToFieldId'):
            continue
        want = _norm((v.get('appliesToRef') or {}).get('field') or v.get('appliesToField'))
        if not want:
            continue
        pid = pages.get(str((v.get('appliesToRef') or {}).get('page') or '').strip().lower())
        same = [f for f in fields if _norm(f['name']) == want and f['pageId'] == pid]
        allm = [f for f in fields if _norm(f['name']) == want]
        pick = same[0] if len(same) == 1 else (allm[0] if len(allm) == 1 else None)
        if not pick:
            continue
        v['appliesToFieldId'] = pick['id']
        v.setdefault('appliesToRef', {})['resolved'] = True
        note = ('Wired 2026-08-31 by normalised name match: the extractor wrote the field label '
                '"%s" where the schema wants the field name "%s".' % (v.get('appliesToField'), pick['name']))
        if note not in (v.get('notes') or ''):
            v['notes'] = ((v.get('notes') or '').rstrip() + ' ' + note).strip()
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


# Value sets whose stated owner is not a field. Each resolved on its merits, not force-wired.
VALUESET_REPOINT = {
    # Group 5A independently re-extracted a catalog Group 4 already captured as validValues.
    # Both runs got 11 header / 8 line-item entries — a useful cross-check. Point at the existing field.
    'Fields Supported for Capture (Header Fields)': 'field.capture-processing-admin.captured-header-fields-catalog',
    'Fields Supported for Capture (Line-Item Fields)': 'field.capture-processing-admin.captured-line-item-fields-catalog',
}
# Not a field at all — a page property. Promoted onto the ConfigPage and the set removed.
VALUESET_TO_PAGE_TABS = {'Forms and Fields page tabs': 'page.forms-and-fields'}

# A documented control the extractor never emitted as a field. Left unwired ON PURPOSE — wiring it
# to something else would be worse than an honest null — and marked so the validator reports it as
# an accepted gap rather than a fresh regression.
KNOWN_GAPS = {
    'Copy Down from Purchase Order if available':
        'Accepted gap 2026-08-31: the corpus documents this control with enumerated options '
        '("Yes" / "No (Default)") but no extractor emitted it as a ConfigField, so the set has no '
        'owner. Left unwired deliberately. Emit the field in the Group 5 remediation pass.',
}


def resolve_orphan_sets(kg):
    n = kg['nodes']
    ids = {f['id'] for f in n['configFields']}
    pages = {p['id']: p for p in n['configPages']}
    changed, keep = 0, []
    for v in n.get('configValueSets', []):
        want = (v.get('appliesToRef') or {}).get('field') or v.get('appliesToField')
        if v.get('appliesToFieldId'):
            keep.append(v); continue
        target = VALUESET_REPOINT.get(want)
        if target and target in ids:
            v['appliesToFieldId'] = target
            v.setdefault('appliesToRef', {})['resolved'] = True
            note = ('Re-pointed 2026-08-31: this catalog was extracted twice, by Group 4 (as '
                    'validValues) and Group 5A (as a value set). Both runs agree on the entry '
                    'count. Wired to the existing field.')
            if note not in (v.get('notes') or ''):
                v['notes'] = ((v.get('notes') or '').rstrip() + ' ' + note).strip()
            changed += 1
            keep.append(v); continue
        pid = VALUESET_TO_PAGE_TABS.get(want)
        if pid and pid in pages:
            pg = pages[pid]
            if pg.get('tabs') != v['values']:
                pg['tabs'] = list(v['values'])
                pg['tabsSourceQuote'] = v.get('sourceQuote')
                pg['tabsSourceFile'] = v.get('sourceFile')
                changed += 1
            continue  # drop the set: tabs are a page property, not a field's options
        gap = KNOWN_GAPS.get(want)
        if gap:
            if not v.get('knownGap'):
                v['knownGap'] = True
                v['notes'] = ((v.get('notes') or '').rstrip() + ' ' + gap).strip()
                changed += 1
        keep.append(v)
    n['configValueSets'] = keep
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
    changed += fix_page_uivariant(kg)
    changed += drop_fields(kg)
    changed += repoint_endpoints(kg)
    changed += fix_valueset_values(kg)
    changed += fix_values(kg)
    changed += wire_value_sets(kg)
    changed += wire_by_name(kg)
    changed += resolve_orphan_sets(kg)
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
