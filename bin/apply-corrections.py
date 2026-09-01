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

# ---------------------------------------------------------------------------
# WORKFLOWS RUN A critics, 2026-08-31. The correctness critic named three BLOCKING
# defects and both critics independently found the SAME pattern on two different
# fields: a list closed from a hedge that omits the attested value "Employee".
# Every fix below was re-verified with grep before being written here.
# ---------------------------------------------------------------------------
VALUE_FIXES.update({
    'field.workflows.step-role': (
        [],
        'Corrected 2026-08-31 (Workflows correctness critic, BLOCKING): the six values were '
        'derived from a HEDGE, not an enumeration - work-with-the-steps-page-fab249d1.md line 55 '
        'reads "If it is a non-system role, such as Authorized Approver, ...". "such as" does not '
        'close a list. The corpus attests a seventh value the list omitted: "Employee" is the Role '
        'of step 1 in BOTH shipped default workflows (grep -c "^    Employee$" '
        'default-workflows-a6fa157a.md = 2) and does not appear on line 55 at all. This build had '
        'ALREADY reached that conclusion in its own contradiction node, whose consequenceForWriter '
        'says "Treat the Role list as OPEN, not closed" - and then the roster emitted the closed '
        'list anyway. Same family as the two deleted invented "Yes" values. validValues emptied; '
        'the open list survives in the value set and in the contradiction node, so nothing is lost. '
        'validate-graph.py could NOT catch this: all six strings are verbatim in the file.'),
})

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
    # 2026-09-01: the Authorized Approval Limits page now exists, but this edge names the
    # CONTAINING surface ('User Administration') and the page's UI label rather than the field
    # name, so merge-group.py's exact (page, field) re-resolve misses on BOTH halves.
    # dep.gworkflows.046 is deliberately NOT here: its 'approver' is the per-employee assignment
    # on the User Administration user profile, a genuinely different surface. Resolving it would
    # encode a corpus falsehood that then looks like a win to the validator.
    ('dep.gworkflows.060', 'targetRef'): ('Authorized Approval Limits', 'authorized_approval_limits_link'),

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
            if ref.get('page') == page and ref.get('field') == field and ref.get('resolved'):
                continue
            fid = names.get((page.lower(), field.lower()))
            if not fid:
                print('  ! repoint target not found: %s %s -> %s' % (d['id'], key, field))
                continue
            # merge-group.py re-resolves endpoints by the STABLE (page, field) ref on every merge
            # (merge-group.py:222-233). Writing only the field leaves the old page name in place,
            # so a cross-page repoint silently un-resolves on the next merge. Found 2026-09-01.
            ref['page'] = page
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
        # A STATED page that does not carry the field is evidence AGAINST a graph-wide guess.
        # Without this, a set written {page: 'Authorized Approval Limits', field: 'Level'} silently
        # wires to field.feature-hierarchies.level — turning validate-graph.py's unwired-value-set
        # ERROR into a green build carrying a false owner. Found 2026-09-01.
        pick = same[0] if len(same) == 1 else (allm[0] if (pid is None and len(allm) == 1) else None)
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


# A repair that swapped a control-naming quote for a non-discriminating one. The repair's own
# note claimed no markup-free quote existed; a single grep disproves it. Repair-created records
# never face the adversarial refuter, which is exactly why they need this pass.
SOURCEQUOTE_FIXES = {
    'field.workflows.settings-prevent-payment-request-submission-exception-level': (
        'Prevent this payment request submission when exception level exceeds',
        'concur-invoice-professional-edition-admin-guides/invoice-settings-cace748d.md',
        'Corrected 2026-08-31 (Workflows correctness critic, BLOCKING): the repaired quote was '
        '"Type a number from one to 99." - which names NO control, and which describes three '
        'DIFFERENT controls in three different files (invoice-settings-cace748d.md, '
        'purchase-request-settings-b0bce285.md, purchase-order-settings-a5a997b4.md), so as a graph '
        'claim it cannot distinguish which field it grounds. It was also already in use as the '
        'sourceQuote of this field\'s compressedRange. The repair justified itself with "every '
        'available quote for this control carried raw HTML markup"; grep -F -c of the restored '
        'string against the same file returns 1. This was the ONLY one of the nine Settings-tab '
        'fields not carrying its own label.'),
}


# An endpoint naming a field that does not exist on a page that DOES. Different defect from a
# forward reference to an unbuilt page, and invisible to the validator: it looks like it is merely
# awaiting a build. Blanking the field keeps the claim and removes the phantom control.
BLANK_ENDPOINT_FIELD = {
    ('dep.gworkflows.050', 'targetRef'):
        'Corrected 2026-08-31 (Workflows correctness critic): targetField was "PR hierarchy '
        'selection", a control that does not exist on the built Policies page - its nearest match '
        'is field.policies.invoice-workflow, a workflow selector, not a hierarchy selector. Left as '
        'a page-level forward reference so the relationship survives without rendering a phantom '
        'field on a built page.',
}


# Notes a build cannot add about itself: cross-page homonyms, and a documented reason for a
# validator WARN so it reads as a decision rather than an unexplained regression.
NOTE_APPEND = {
    'field.feature-hierarchies.segment-name':
        'HOMONYM 2026-08-31 (Workflows correctness critic): field.accounting-administration.'
        'segment-name is a DIFFERENT control of the same name - an account-code hierarchy segment '
        'from adding-a-new-segment-d6dfb07b.md. Not a validator ERROR (duplicate-field-name is '
        'scoped per page), but this run named its own button modify_hierarchy_button precisely to '
        'keep the identical collision visible and did not apply the same discipline here.',
}

# Keyed by value-set NODE ID (VALUESET_NOTE_APPEND above is keyed by a VALUE MARKER — two different
# lookups, and using the wrong one silently applies nothing). Added 2026-09-01.
VALUESET_NOTE_APPEND_BY_ID = {
    'vset.gworkflows.unnamed.the-four-configuration-steps-for-authorized-approvers-and-wh':
        ' SCOPE CORRECTION 2026-09-01: this note says User Administration is out of scope for this '
        'whole graph. That decision was REVERSED. One of the three assignment routes it names - '
        'User Administration - is now the built page Authorized Approval Limits (group Approval '
        'Authority). The other two routes, the Authorized Approver List (built, on Workflows) and '
        'the employee import (unbuilt, defers to an external Shared guide), are unchanged. The '
        'value set stays a deliberate knownGap for the reason given: it is a procedure-ordering '
        'matrix in the wrong shape, not an option list.',
    'vset.gworkflows.unnamed.two-further-named-feature-hierarchies-attested-in-the-corpus':
        ' SCOPE CORRECTION 2026-09-01: this note declines these names partly because '
        'user-administrator-fcfd570c.md "sits under Administration > Company, which is out of scope '
        'for this graph". That decision was REVERSED and that file is now the primary source of the '
        'built page Authorized Approval Limits. THE CONCLUSION STILL STANDS on its own merits: the '
        'names remain unattested as rows of the Feature Hierarchies selector, which is the real and '
        'sufficient reason to leave them unwired.',
}

VALUESET_NOTE_APPEND = {
    '%L_WhoChanged%':
        'MARKDOWN ESCAPE, documented 2026-08-31 (Workflows correctness critic): 9 of these 18 '
        'values will not verify as literal substrings of the cited file, because the corpus escapes '
        'the underscore for markdown - the file writes "%L\\_WhoChanged%" and this set records '
        '"%L_WhoChanged%". The UNESCAPED form is correct for the graph: a driver typing into an '
        'email template types %L_WhoChanged%, and the backslash is markdown syntax, not part of the '
        'variable. The catalog itself is COMPLETE and verified - all 18 variables (9 %L\\_X% label '
        'forms and 9 %X% value forms) are genuinely present in the file; nothing was inferred from '
        'the documented "add L and underscore" rule. The value-set-entries-not-in-file WARN on these '
        'two sets is therefore expected and accepted, not a regression.',
}


# A contradiction node whose consequenceForWriter asserted something the corpus refutes. Both
# Workflows critics independently found the SAME pattern on two different fields - a list closed
# or declared open on partial evidence, omitting the attested value "Employee". That agreement is
# the strongest signal this pipeline emits, so the false assertion is corrected rather than noted.
CONTRADICTION_READING_ADDS = {
    'contr.gworkflows.015': {
        'reading': {
            'summary': 'A third value, Employee, IS enumerated: the approver-terminology topic '
                       'states the employee-only setting outright.',
            'sourceQuote': 'If the Steps Can Be Added By field is set to Employee, then the '
                           'employee can choose their own approvers using the Approval Flow page.',
            'sourceFile': 'concur-invoice-professional-edition-admin-guides/'
                          'approver-terminology-8559861c.md',
        },
        'consequence': (
            "Probe for an option whose visible text CONTAINS 'Approver' but not 'Employee', rather "
            "than matching either full string. THREE values are attested, not two: 'Approver Only' "
            "/ 'Approver', 'Both Employee and Approver', and 'Employee'. Only the LABEL FORM of the "
            "approver-side option remains undetermined; the Employee value is documented."),
        'note': (
            ' Corrected 2026-08-31 (Workflows completeness critic, F-1): this node previously '
            'asserted that a third employee-only value "is likely present - it is deliberately NOT '
            'invented here, and the driver must read the live list". That was FALSE and the build '
            'had the file in hand: approver-terminology-8559861c.md line 66 enumerates it, '
            'grep -F -c = 1, and a corpus-wide grep returns exactly that one line. The file was '
            'cited elsewhere in this same run for a nav-label reading, so the sentence was in reach '
            'and was not taken. A third grounded reading has been added rather than the claim '
            'merely being softened.'),
    },
}


# Page tabs the BUILD COULD NOT EMIT: NAV_SCHEMA sets additionalProperties:false and declares no
# `tabs` property, so the map agent was schema-blocked and returned tabs:None. (bin/assemble-parts.py
# and bin/merge-group.py were both fixed to carry tabs on 2026-08-31; the workflow schema is fixed
# for Run B.) This is the same value-set-to-tabs mechanism page.forms-and-fields already uses.
PAGE_TABS = {
    'page.workflows': {
        'tabs': ['Workflows', 'Settings', 'Email Notifications', 'Approval Statuses',
                 'Authorized Approvers', 'Confirmation Agreements', 'Reason Category and Codes'],
        'quote': 'The Workflows tab on the Workflows page appears.',
        'file': 'concur-invoice-professional-edition-admin-guides/access-workflow-fa9892a7.md',
        'note': (
            'TABS ARE INDIVIDUALLY ATTESTED, NOT ENUMERATED. Unlike Forms and Fields - whose tabs '
            'come from one sentence, "The tool consists of the following tabs:" '
            '(terminology-4b6cb686.md) - NO sentence anywhere in this corpus lists the Workflows '
            'tabs together. Verified: that phrase and its variants return exactly one hit '
            'corpus-wide and it is Forms and Fields. Each of these seven is attested separately by '
            'its own click path, in this many admin-guides files: Workflows 14, Settings 15, Email '
            'Notifications 7, Authorized Approvers 6, Approval Statuses 5, Confirmation Agreements '
            '4, Reason Category and Codes 3. tabsSourceQuote below anchors only the first. Four '
            'SUB-TABS also exist and are recorded in navPathAlternates, not here: Approval Statuses '
            '> {Invoice, Purchase Request} and Authorized Approvers > {Configuration, Authorized '
            'Approver List}. Added 2026-08-31 by apply-corrections.py because the build was '
            'schema-blocked from emitting them.'),
    },
}


def set_page_tabs(kg):
    changed = 0
    for pg in kg['nodes']['configPages']:
        fx = PAGE_TABS.get(pg['id'])
        if not fx:
            continue
        if pg.get('tabs') != fx['tabs']:
            pg['tabs'] = list(fx['tabs'])
            pg['tabsSourceQuote'] = fx['quote']
            pg['tabsSourceFile'] = fx['file']
            changed += 1
            print('  page tabs set: %s (%d tabs)' % (pg['id'], len(fx['tabs'])))
        if fx['note'] not in (pg.get('identityNotes') or ''):
            pg['identityNotes'] = ((pg.get('identityNotes') or '').rstrip() + ' ' + fx['note']).strip()
            changed += 1
    return changed


def add_contradiction_readings(kg):
    changed = 0
    for c in kg['nodes'].get('configContradictions', []):
        fx = CONTRADICTION_READING_ADDS.get(c['id'])
        if not fx:
            continue
        quotes = {r.get('sourceQuote') for r in (c.get('readings') or [])}
        if fx['reading']['sourceQuote'] not in quotes:
            c.setdefault('readings', []).append(dict(fx['reading']))
            changed += 1
            print('  contradiction reading added: %s (now %d readings)' % (c['id'], len(c['readings'])))
        if fx.get('consequence') and c.get('consequenceForWriter') != fx['consequence']:
            c['consequenceForWriter'] = fx['consequence']
            changed += 1
        if fx.get('note') and fx['note'].strip() not in (c.get('notes') or ''):
            c['notes'] = ((c.get('notes') or '').rstrip() + fx['note']).strip()
            changed += 1
    return changed


def fix_sourcequotes(kg):
    changed = 0
    for f in kg['nodes']['configFields']:
        fx = SOURCEQUOTE_FIXES.get(f['id'])
        if not fx:
            continue
        quote, src, note = fx
        if f.get('sourceQuote') != quote:
            f['sourceQuote'] = quote
            f['sourceFile'] = src
            changed += 1
            print('  sourceQuote restored: %s' % f['id'])
        if note not in (f.get('notes') or ''):
            f['notes'] = ((f.get('notes') or '').rstrip() + ' ' + note).strip()
            changed += 1
    return changed


def blank_endpoint_fields(kg):
    changed = 0
    for d in kg['nodes']['configDependencies']:
        for key in ('sourceRef', 'targetRef'):
            note = BLANK_ENDPOINT_FIELD.get((d['id'], key))
            if not note:
                continue
            ref = d.get(key) or {}
            if ref.get('field'):
                ref['field'] = ''
                ref['resolved'] = False
                d['sourceId' if key == 'sourceRef' else 'targetId'] = None
                d[key] = ref
                changed += 1
                print('  blanked phantom endpoint field: %s.%s' % (d['id'], key))
            if note not in (d.get('notes') or ''):
                d['notes'] = ((d.get('notes') or '').rstrip() + ' ' + note).strip()
                changed += 1
    return changed


# Prose that lives inside a dependency `condition` or a step sequence `rationale` was unreachable by
# every existing op, and the validator reads neither. Added 2026-09-01, when the 2026-08-31 "Administration
# > Company is out of scope" decision was reversed and five nodes were left asserting the superseded rule —
# two of them saying that the page merged alongside them "is not a page to build".
DEP_CONDITION = {      # dep id -> replacement condition string
    # The 2026-08-31 "Administration > Company is out of scope" decision was REVERSED by Luke on
    # 2026-09-01 and the Authorized Approval Limits page was built. Six nodes were left asserting the
    # superseded rule; two of them said the page merged alongside them "is not a page to build".
    # These rewrite the REASON without changing any conclusion that is still correct.
    'dep.gworkflows.046':
        'FORWARD REFERENCE, EXPECTED TO STAY UNRESOLVED - and note WHY, because the reason changed on '
        '2026-09-01. The per-employee approver assignment lives on the User Administration USER PROFILE, '
        'which is a DIFFERENT surface from the Authorized Approval Limits window built that day (that '
        'window sets a hierarchy level, a currency and amount, and a Can approve exception flag; it has no '
        'approver-assignment control - verified against user-administrator-fcfd570c.md and '
        'user-administration-8b167b96.md). The user-profile surface is unbuilt because its documentation '
        'defers to an external Shared guide absent from this corpus - a DOCUMENTARY gap, NOT a '
        'menu-location judgement. Recorded because it is a hard operational consequence: clearing the '
        'Settings-tab checkbox activates a centralized approver workflow in which every employee must '
        'already have an approver set in User Administration or via the employee import, or submission '
        'fails with an error.',
    'dep.gworkflows.060':
        'RESOLVED 2026-09-01 against the Authorized Approval Limits page (group Approval Authority). The '
        'state of the Feature Hierarchies page decides whether that window is reachable at all: if the '
        'Authorized Approver feature is activated and the hierarchy built here carries at least one Level '
        'in addition to Global, the Authorized Approval Limits link appears; with the Global group alone '
        'it does not, and the inline Authorized Approver check box appears instead. The earlier text on '
        'this edge asserted that Administration > Company was out of scope for this graph and that the '
        'window was "not a page to build"; that decision was reversed - menu location is not product '
        'scope, and the window configures Concur Invoice through the non-PO capability.',
}

STEP_RATIONALE = {     # (step id, sequence order) -> replacement rationale
    ('grpworkflows-s2-configure-authorized-approver-feature', 28):
        "CORPUS-STATED alternative path: step-4-assign-the-proper-rights-to-users-86389a18.md lists three "
        "routes and states 'Regardless of how the authorized approvers are entered into Invoice, they all "
        "appear in the Authorized Approver List.' - so this leg is interchangeable with orders 22-25, not "
        "additional to them. The destination IS a built page as of 2026-09-01: the Authorized Approval "
        "Limits window (group Approval Authority), reached through Administration > Company > Company "
        "Admin > User Administration. The earlier claim that it was out of scope and that no page node "
        "should be created was reversed that day.",
    ('grpworkflows-s3-vendor-employee-access-hierarchy-six-tool-sequence', 24):
        "CORPUS-STATED as step 6 of the ordered tool list, but recorded as a FORWARD REFERENCE THAT STAYS "
        "UNRESOLVED: 'The User Administrator accesses User Administration and uses the newly-added field "
        "in Step 6 to select the named vendor group' (overview-of-steps-37e3c289.md). The same source "
        "flags this as the one tool NOT covered by the Invoice Configuration administrator role. The "
        "conclusion stands but the reason has changed: the vendor-group selector lives on the User "
        "Administration USER PROFILE, which is unbuilt because its documentation defers to an external "
        "Shared guide absent from this corpus - NOT because of its menu location. Administration > "
        "Company is no longer out of scope for this graph; the Authorized Approval Limits window under it "
        "was built 2026-09-01.",
}

STEP_SEQ_RETARGET = {  # (step id, sequence order) -> (new page, new field or None)
    ('grpworkflows-s2-configure-authorized-approver-feature', 28):
        ('Authorized Approval Limits', 'authorized_approval_limits_link'),
}


def fix_dep_conditions(kg):
    changed = 0
    for d in kg['nodes']['configDependencies']:
        new = DEP_CONDITION.get(d['id'])
        if new and d.get('condition') != new:
            d['condition'] = new
            changed += 1
            print('  rewrote condition on %s' % d['id'])
    return changed


def fix_step_rationales(kg):
    changed = 0
    for st in kg['nodes']['configSteps']:
        for e in (st.get('sequence') or []):
            key = (st['id'], e.get('order'))
            new = STEP_RATIONALE.get(key)
            if new and e.get('rationale') != new:
                e['rationale'] = new
                changed += 1
                print('  rewrote rationale on %s order %s' % key)
            tgt = STEP_SEQ_RETARGET.get(key)
            if tgt:
                page, field = tgt
                if e.get('page') != page:
                    old_page = e.get('page')
                    e['page'] = page
                    if old_page in (st.get('pages') or []):
                        st['pages'] = [page if p == old_page else p for p in st['pages']]
                    changed += 1
                    print('  retargeted %s order %s: %s -> %s' % (key[0], key[1], old_page, page))
                if field and e.get('field') != field:
                    e['field'] = field
                    changed += 1
    return changed


def append_notes(kg):
    changed = 0
    for f in kg['nodes']['configFields']:
        note = NOTE_APPEND.get(f['id'])
        if note and note not in (f.get('notes') or ''):
            f['notes'] = ((f.get('notes') or '').rstrip() + ' ' + note).strip()
            changed += 1
            print('  note appended: %s' % f['id'])
    for v in kg['nodes'].get('configValueSets', []):
        note = VALUESET_NOTE_APPEND_BY_ID.get(v.get('id'))
        if note and note not in (v.get('notes') or ''):
            v['notes'] = ((v.get('notes') or '').rstrip() + ' ' + note).strip()
            changed += 1
            print('  note appended (by id): %s' % v['id'])
        for marker, note in VALUESET_NOTE_APPEND.items():
            if marker in (v.get('values') or []) and note not in (v.get('notes') or ''):
                v['notes'] = ((v.get('notes') or '').rstrip() + ' ' + note).strip()
                changed += 1
                print('  note appended: %s' % v['id'])
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
    changed += fix_sourcequotes(kg)
    changed += blank_endpoint_fields(kg)
    changed += append_notes(kg)
    changed += fix_dep_conditions(kg)
    changed += fix_step_rationales(kg)
    changed += add_contradiction_readings(kg)
    changed += set_page_tabs(kg)
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
