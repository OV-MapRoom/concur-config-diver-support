#!/usr/bin/env python3
"""Post-merge boundary check for the Approval Authority group.

bin/validate-graph.py is a pure QUOTE verifier: it checks every claim against its cited corpus file
and never joins a field to the page its source documents. That blind spot is exactly where this
group can fail — the built Workflows page carries four controls whose LABELS collide with this one,
and a duplicated control validates clean at exit 0. This script covers only that gap. It is
deliberately NOT part of validate-graph.py, which must stay group-agnostic.
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KG = os.path.join(ROOT, 'output', 'kg-invoice-config.json')
PAGE = 'page.authorized-approval-limits'
AG = 'concur-invoice-professional-edition-admin-guides/'

# Files whose own click path is Administration > Invoice > Workflows. Anything sourced from one of
# these belongs to the built Workflows page, not to this window.
WORKFLOWS_OWNED = {AG + 'authorized-approver-list-a9522ec8.md', AG + 'procedure-2d20b513.md'}

# Already built on Workflows from procedure-2d20b513.md — re-emitting any of them is a duplicate.
ALREADY_ON_WORKFLOWS = {'authorized_approver_feature_available_for_workflows',
                        'minimum_exception_level', 'maximum_exception_level'}


def main():
    kg = json.load(open(KG, encoding='utf-8'))
    n = kg['nodes']
    pn = {p['id']: p['name'] for p in n['configPages']}
    findings, notes = [], []

    new = [f for f in n['configFields'] if f.get('pageId') == PAGE]
    if not new:
        print('page %s carries no fields — nothing to check' % PAGE)
        return 0
    notes.append('fields on %s: %d' % (PAGE, len(new)))
    if not 4 <= len(new) <= 10:
        findings.append('FIELD COUNT %d is outside the expected 4-10 (recon expected 7-8)' % len(new))

    bad = [f['id'] for f in new if f.get('sourceFile') in WORKFLOWS_OWNED]
    if bad:
        findings.append('sourced from a Workflows-owned file: %s' % bad)

    dup = [f['id'] for f in new if f['name'] in ALREADY_ON_WORKFLOWS]
    if dup:
        findings.append('re-emits a field already built on Workflows: %s' % dup)

    # Generic commit / navigation controls legitimately repeat on every page and are NOT the
    # duplication this gate exists to catch. Measured on the graph 2026-09-01: "Save" appears on 12
    # pages, "New" on 12, "Remove" on 7, "Done" on 7. Flagging those would bury the real signal.
    GENERIC = {'save', 'done', 'cancel', 'next', 'previous', 'new', 'add', 'remove', 'delete',
               'submit', 'ok', 'close', 'search'}

    wf = [f for f in n['configFields'] if pn.get(f.get('pageId')) == 'Workflows']
    wf_names = {f['name'].strip().lower() for f in wf}
    wf_labels = {(f.get('label') or '').strip().lower() for f in wf}
    for f in new:
        nm, lb = f['name'].strip().lower(), (f.get('label') or '').strip().lower()
        if lb in GENERIC:
            continue
        if nm in wf_names or (lb and lb in wf_labels):
            sib = [x['id'] for x in wf
                   if x['name'].strip().lower() == nm or (x.get('label') or '').strip().lower() == lb]
            # The rule is "the note must NAME the colliding Workflows control", so test for the
            # sibling's id or name - not for the word "sibling". Testing the word was a proxy, and it
            # produced a false positive on can_approve_exception, whose note names the sibling by
            # exact id and gives the full distinct-surface verdict. Corrected 2026-09-01.
            note = (f.get('notes') or '').lower()
            named = any(x['id'].lower() in note or x['name'].lower() in note for x in wf
                        if x['id'] in sib) or 'sibling' in note
            if not named:
                findings.append('collides with Workflows %s and NAMES NONE OF THEM in notes: %s'
                                % (sib, f['id']))
            else:
                notes.append('collision declared: %s <-> %s' % (f['id'], sib))
        if lb == 'approval limit':
            findings.append('field labelled exactly "Approval Limit": no such control is documented '
                            'on this window (fcfd570c names only "the Amount field"): %s' % f['id'])

    # cross-page dependency endpoints must use graph NAMES, never the labels a human sees
    for d in n['configDependencies']:
        for side in ('sourceRef', 'targetRef'):
            r = d.get(side) or {}
            if (r.get('page') or '').strip().lower() == 'workflows' and not r.get('resolved'):
                if d.get('group') == 'Approval Authority':
                    findings.append('%s.%s points at Workflows but did not resolve — a label was '
                                    'probably written where a field name belongs: %r'
                                    % (d['id'], side, r.get('field')))

    for m in notes:
        print('  . ' + m)
    if findings:
        print('\nBOUNDARY FINDINGS: %d' % len(findings))
        for f in findings:
            print('  ! ' + f)
        return 1
    print('\nBOUNDARY CHECK: clean')
    return 0


if __name__ == '__main__':
    sys.exit(main())
