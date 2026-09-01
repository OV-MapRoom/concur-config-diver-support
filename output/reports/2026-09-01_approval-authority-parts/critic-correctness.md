# CRITIC — CORRECTNESS: Authorized Approval Limits (`page.authorized-approval-limits`)

Run 2026-09-01. Lens: **correctness** (what is WRONG). Every claim below has a command behind it and
the command is shown. I read the two primaries end to end, the boundary file `a9522ec8`, the built
graph (`output/kg-invoice-config.json`, 22 pages / 607 fields), all six part files, all three extract
files, both map files, and the workflow script.

**Headline.** This is the cleanest build I have audited on this project. Grounding is perfect
(58/58 verbatim), zero invented values, zero unwired value sets, zero mis-homed fields, the
`a9522ec8` hard rule is obeyed, and the reverse-drop trap (killing "Can approve exception" because
it looks like a Workflows duplicate) was **not** fallen into. The defect classes my predecessor
found do not recur.

But **the merge as currently staged fails its own boundary gate and loses the page's most
distinctive fact.** Two blocking findings, three that lose real content, three minor.

---

## 1. QUOTE FIDELITY — 58/58 verbatim. Zero misses.

Mechanical, exhaustive, not sampled. Script at `aal-parts/verify.py`; the full pass:

```
python3 - <<'EOF'   # 9 field quotes + 16 dep quotes + 28 contradiction readings + 5 value-set values
...  q in open(os.path.join(ROOT, sourceFile)).read()  ...
EOF
TOTAL GROUNDED STRINGS CHECKED: 58   VERBATIM: 58   MISSES: 0
```

Spot-confirmed with `grep -F -c` per the house rule:

```
$ cd /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE
$ grep -F -c "The administrator clicks the link. The Authorized Approval Limits window appears." \
    concur-invoice-professional-edition-admin-guides/user-administrator-fcfd570c.md      -> 1
$ grep -F -c "You can enter 0 in the Amount field." ...fcfd570c.md                        -> 1
$ grep -F -c "You can enter 0 in the Manager Approval Limit field." ...fcfd570c.md        -> 1
$ grep -F -c "the Manager Approval Limit field and the Approval Limit Currency list appear." -> 1
$ grep -F -c "For level-based cost object approval, select a level." \
    ...user-administration-8b167b96.md                                                    -> 1
```

**Stronger than required: every field quote is UNIQUE corpus-wide** and occurs only in its own cited
file. I loaded all 1,859 guide files and counted containing files per quote — all nine returned
exactly 1. That closes the "reformatted table survivor vs verbatim twin" defect class outright: there
is no twin anywhere.

`sourceFile` prefix hygiene: all paths start `concur-invoice-professional-edition-…`. **No
`CONCUR_INVOICE/` prefix anywhere** in the roster or any synth file. No release-note file is cited
as a `sourceFile` anywhere (grep for `release-note` across all part files returns nothing).

The full-graph validator run on a simulated merge confirms it independently:
`quotes verbatim in cited file: 616/616 (100.0%)`, `ERROR: none`.

---

## 2. INVENTED VALUES — none. The Yes/No trap was avoided.

* All nine fields carry `validValues: []`. Verified programmatically, not read.
* `synth-valuesets.json` → `valueSets: []`, `validValuesAdditions: []`. Nothing to invent into.
* The only enumerated strings in the whole run are 5 values across two orphan candidates, and all 5
  are verbatim:
  * `['Level', 'Limit']` — `level-based-approvals-and-limit-based-approvals-b335cf33.md` lines 25/27,
    under the lead-in `A cost object approval step can be based on either:`. Confirmed by eye at
    `sed -n '23,28p'`.
  * `['The employee import', 'User Admin', 'The Authorized Approvers tab in Workflows.']` —
    `step-4-assign-the-proper-rights-to-users-82481079.md` lines 25/27/31. Confirmed by eye.

**The specific trap, checked explicitly:** two checkboxes are emitted
(`can_approve_exception`, `authorized_approver_checkbox`) and **neither was given a
selected/cleared or Yes/No pair.** The corpus describes only the act of selecting them; the
complementary state is undocumented and was left undocumented. This is exactly the discipline whose
absence produced the two deleted "Yes" values on Capture Processing Admin.

**Positive call worth recording:** `extract-…-tables.json` proposed two value sets whose members were
Type/Description *column cells* from the employee-import 710 table — `"Numeric"`, `"3 characters"`,
`"Specified in the approval limit currency."`. Synthesis refused to promote them, correctly: they are
type/length declarations, not selectable entries, and emitting them would tell a driver `Numeric` is
a legal keystroke. That refusal is reasoned out in `synth-valuesets.json` orphan #3. Right answer.

---

## 3. VALUE-SET WIRING — nothing lands unwired-by-accident. One shape defect.

`synth-valuesets.json` carries `valueSets: []`, so the 16-of-18-unwired failure mode cannot recur here.
Three `orphanCandidates` become `knownGap` sets on merge, each deliberately ownerless with reasoning.
Verified against a real merge:

```
$ python3 bin/assemble-parts.py <parts> aal-raw.json --group "Approval Authority"
  valueSets 3 | valueSetsKnownGap 3 | valuesInSets 5
```

**FINDING C-6 (minor, shape).** Orphan #3 (`"NOT AN ENUMERATION - a DECLARED DOMAIN…"`) carries
`values: []` and the assembler materialises it as a value set anyway. Census of the built graph:

```
$ python3 -c "... [v['id'] for v in g['nodes']['configValueSets'] if not v.get('values')]"
built value sets with EMPTY values: 0
```

It would be **the first zero-value value set in the graph** (confirmed on the simulated merge:
`vset.gapproval-authority.unnamed.not-an-enumeration-a-declared-domain-logged-here-so-it-is-no`,
`values: []`). Its content — the 710 domain rules — already lives verbatim in the notes of all four
owner fields, which the orphan itself says is "the right channel". **Fix:** delete orphan #3 from
`synth-valuesets.json`; nothing is lost.

**FINDING C-7 (minor, stale instruction).** The roster's `verifyNotes` carry-forward item (a) still
instructs the merge to *"rewire to `approval_limit_amount` and `approval_limit_currency_window`…
or those two sets land unwired."* Synthesis instead deleted both sets (correctly, see §2). The
instruction is now stale and, if a merge helper acts on it, would **re-create the two sets synthesis
deliberately refused**. Strike it, or annotate it "superseded — sets deleted, not rewired".

---

## 4. PAGE OWNERSHIP — clean. Every field's documentation places it on this page.

Grepped each distinctive label corpus-wide, both guide directories with equal weight:

```
$ grep -rl -F "Manager Approval Limit"      admin-guides tools-guides  -> fcfd570c.md ONLY
$ grep -rl -F "Approval Limit Currency"     ...                        -> employee-import-e28f2294.md, fcfd570c.md
$ grep -rl -F "Authorized Approval Limits"  ...                        -> 8b167b96.md, fcfd570c.md   (2 files, corpus-wide)
$ grep -rl -F "Can approve exception"       ...                        -> a9522ec8.md, fcfd570c.md
$ grep -rl -F "Authorized Approver check box" ...                      -> fcfd570c.md ONLY
```

Every hit describes either this window/section or the already-built Workflows sibling. **No field is
sourced from a topic that describes some other page.** The seven-mis-homed-import-fields defect class
does not recur: `employee-import-e28f2294.md` is cited **only inside notes and one INFERRED-marked
dependency**, never as a field `sourceFile`.

I also checked the container's *other* links, to be sure none was wrongly swept in or wrongly left
out. `grep -rl -E "Expense and Invoices? Settings?"` returns 7 files; the five that are not the
primaries document **different** links in the same section — Invoice Preferences / shipping address
(`f772bed1`), Approvers (`20294611`), vendor group (`bb58ded2`), employee form fields
(`5e3daf7c`, `da376eef`). None documents an approval-limit control. Correctly excluded.

I opened the title-collision file the map declined to open,
`admin-guides/user-administrator-5aa3eb5e.md` (1,432 B, loio `5aa3eb5e…`, distinct from the primary's
`fcfd570c…`). **The map's skip is correct**: it documents the Invoice Delegates / Purchase Request
Delegates links and contains no approval-limit content. It belongs to Delegate Configurations
(Workflows Run B), not here.

Reverse check — name collisions with a *different* control elsewhere in the graph:

```
$ # 9 roster names vs 607 built names
  NAME COLLISIONS: none
```

---

## 5. DUPLICATE NAMES vs DUPLICATE CONTROLS — and **the one blocking defect is here**.

**Duplicate names within the page:** none (9 distinct). **Duplicate labels within the page:** none.
Neither would have escaped the validator anyway.

**Duplicated CONTROLS across pages — the invisible defect.** Field-by-field against the built
Workflows Authorized Approver List tab:

| this page | label | Workflows sibling | own control or same value twice? | names sibling id in notes? |
|---|---|---|---|---|
| `authorized_approval_limits_link` | Authorized Approval Limits | — | own (branch-B trigger) | n/a |
| `hierarchy_level_selector` | (descriptive) | none built | own; roster **states the asymmetry** that a9522ec8/d8bf669c describe the same picker on Workflows and it was never emitted there | n/a |
| `can_approve_exception` | Can approve exception | `field.workflows.authorized-approver-can-approve-exception` | **own control, same underlying record** | **id named — but see C-1** |
| `approval_limit_currency_window` | (descriptive) | `…authorized-approver-approval-limit` (1:4) | own | yes |
| `approval_limit_amount` | Amount | `…authorized-approver-approval-limit` | own (different label, different surface) | yes |
| `cost_object_approval_level` | Level | `…authorized-approver-level` | own, **CONTESTED**, hypothesised different value | yes |
| `authorized_approver_checkbox` | Authorized Approver | — | own (branch A) | n/a |
| `manager_approval_limit` | Manager Approval Limit | `…authorized-approver-approval-limit` | own (third label) | yes |
| `approval_limit_currency_branch_a` | Approval Limit Currency | `…authorized-approver-approval-limit` | own (branch-A captioned) | yes |

The 1:4 shape finding (one Workflows "Approval Limit" ↔ four controls here) is stated, sourced to the
three-setter sentence, and is a genuine surface-shape difference rather than duplication. **No fifth
"Approval Limit" was minted** — the checker's own rule for that fires clean.

### FINDING C-1 — BLOCKING. `can_approve_exception` fails `bin/check-approval-authority.py`.

I merged into an isolated copy of the graph and ran both gates:

```
$ cp bin/*.py output/kg-invoice-config.json  -> $SC/sim/
$ cd $SC/sim && python3 bin/merge-group.py $SC/aal-raw.json "Approval Authority"
  merged Approval Authority -> {configPages 23, configFields 616, ...}
$ python3 bin/validate-graph.py
  ERROR: none          # 616/616 quotes verbatim
$ python3 bin/check-approval-authority.py
  . collision declared: field.authorized-approval-limits.cost-object-approval-level <-> ['field.workflows.authorized-approver-level']

  BOUNDARY FINDINGS: 1
  ! collides with Workflows ['field.workflows.authorized-approver-can-approve-exception']
    and does not name the sibling in notes: field.authorized-approval-limits.can-approve-exception
```

Exit **1**. The gate's rule (`bin/check-approval-authority.py` line ~55) is
`if 'sibling' not in (f.get('notes') or '').lower()`. Measured across the roster:

```
authorized_approval_limits_link      'sibling' in notes: False
hierarchy_level_selector             'sibling' in notes: False
can_approve_exception                'sibling' in notes: False   <-- collides, so this one fires
approval_limit_currency_window       'sibling' in notes: False
approval_limit_amount                'sibling' in notes: False
cost_object_approval_level           'sibling' in notes: True
authorized_approver_checkbox         'sibling' in notes: True
manager_approval_limit               'sibling' in notes: True
approval_limit_currency_branch_a     'sibling' in notes: True
```

This is a **word-choice defect, not a reasoning defect**: `can_approve_exception`'s notes *do* name
`field.workflows.authorized-approver-can-approve-exception` by exact id and explain the
distinct-surface/one-record verdict in full. It simply never uses the token the gate looks for.
It is nonetheless a real blocker, and it is exactly the class the brief calls "a field that collides
and does not name its sibling is a defect even if its quote is perfect".

**Exact fix.** In `roster-authorized-approval-limits.json`, field `can_approve_exception`, `notes` —
change the opening of the second sentence from

> `SAME visible label as the built field.workflows.authorized-approver-can-approve-exception (source …)`

to

> `SIBLING CONTROL, SAME visible label: the built field.workflows.authorized-approver-can-approve-exception (source …)`

One word. Re-run `bin/check-approval-authority.py` → expect `BOUNDARY CHECK: clean`.
(No other field trips the rule: `hierarchy_level_selector`, `approval_limit_amount`,
`manager_approval_limit`, `approval_limit_currency_*` and the two branch-A/link controls do not
collide by exact name or label with any Workflows field, so the rule never evaluates them.)

### The reverse check — was a real control dropped for looking like a duplicate? **No.**

* **"Can approve exception" is present**, sourced to `fcfd570c` (this window), not to `a9522ec8`.
  Correct: the parenthetical in its own quote is the scope fence, and only the tenant-wide RANGE went
  to Workflows (deps 9 and 10). This is the trap the brief warned about and it was avoided.
* **"Approver" is correctly absent.** Neither primary names an Approver picker; the approver is the
  record context ("User Administration (Search & Select)" / "With the user loaded in the form").
  A confirmed negative, not a drop.
* **"Approval Limit" is correctly absent** — no control with that exact label is documented here.

### Hard-rule checks — all PASS.

```
fields citing admin-guides/authorized-approver-list-a9522ec8.md  -> NONE
fields citing admin-guides/procedure-2d20b513.md                 -> NONE
re-emission of minimum_exception_level / maximum_exception_level /
   authorized_approver_feature_available_for_workflows           -> NONE
```
`a9522ec8` appears only where it should: as one reading inside contradiction #2 (the two-act unlimited
recipe) and in boundary prose. That is legitimate boundary citation, not a field source.

---

## 6. WRONG DROPS — roster clean; **synthesis lost three real things.**

`dropped: []`, `splitsProposed: []`. Nine candidates in, nine out. No refuter killed a documented
control, so calibration rule 6 is not implicated at the field level. Contradictions: all 10 lens
candidates survive (deduped to 6) — nothing lost there either.

The losses are all in the **extract → synth** hand-off, which no refuter guards.

### FINDING C-3 (medium). The branch-A ↔ branch-B **mutual-exclusion edge** was dropped, and it is the one dropped candidate whose endpoints both resolve.

`extract-…-procedure.json` proposed
`(authorized_approver_checkbox → Authorized Approval Limits / authorized_approval_limits_link)`
quoting `"The settings that appear in User Administration (Administration > User Administration) differ depending on whether the configuration includes:"`
(`grep -F -c` = 1 in `fcfd570c`). It is **not** in `synth-dependencies.json`:

```
$ diff of 32 dependencyCandidates vs 16 emitted edges
  DROP ('authorized_approver_checkbox', 'Authorized Approval Limits', 'authorized_approval_limits_link')
```

Mutual exclusion is the single most operationally load-bearing structural fact on this page — the
roster, both step goals and four field notes all call it out — yet it survives only as *prose*.
The graph encodes the gate from each side separately (dep 1 and dep 4, both → `Feature Hierarchies /
level`) but never encodes that the two renderings **exclude each other**. Both endpoints are local
fields on this page, so the edge would resolve cleanly. **Reverse this drop.** (If `depends_on` /
`precedes` / `triggers` cannot express exclusion, emit it as `depends_on` with the exclusion stated
in `condition` — that is how every other conditional-visibility fact in this graph is carried.)

### FINDING C-4 (medium). Two verified behavioural facts reach **no node at all**.

`extract-…-crosscut.json` extracted and verified both; synthesis dropped both because their proposed
endpoints (`invoice_approval_routing`, `invoice_approver_role`) do not exist. Dropping the *endpoint*
was right; dropping the *fact* was not. Neither string appears in any merge input:

```
$ grep -l -F "goes into effect immediately"                   roster-*.json synth-*.json  -> (nothing)
$ grep -l -F "does not delete the standard Invoice approver role" roster-*.json synth-*.json -> (nothing)
```

Both are verbatim and both are things a driver acts on:

* `"An edit to an authorized approver record goes into effect immediately upon save. The new values are used to search for and evaluate that approver from the point of save forward."` —
  `admin-guides/edit-authorized-approver-information-8b3c119a.md` (`grep -F -c` = 1), plus the
  in-flight consequence in the next bullet: `"Any invoices currently assigned to the edited authorized approver will use the new values…"`.
* `"Removing a user's authorized approver permissions does not delete the standard Invoice approver role nor does it delete the approver from the system."` —
  `admin-guides/remove-authorized-approvers-8b3c5273.md` (`grep -F -c` = 1).

This is a **broken promise inside the run**: the roster's own `mustReadSkipsDeclared` for `8b3c119a`
says the immediate-effect fact is *"a dependency for the prose lens"* — i.e. explicitly handed off —
and the dependency layer then dropped it. **Fix:** append both to the notes of
`approval_limit_amount` (or `manager_approval_limit`), verbatim, with their files. No new field, no
new edge needed.

### FINDING C-5 (low). A 14-value verified catalogue was dropped **silently**.

`extract-…-tables.json` carries a value-set candidate with `appliesToField: ""` holding **14 values**
from the `8a960238` configuration-step matrix. I re-verified all 14 against the file: **14/14
verbatim**. It appears in neither `valueSets` nor `orphanCandidates` — it simply vanished, with no
reason recorded, which is the shape of the defect rule 2 exists to prevent.

Mitigation, and why this is low and not high: the built graph already carries the same matrix as
`vset.gworkflows.unnamed.the-four-configuration-steps-for-authorized-approvers-and-wh` — but only at
**4 values** (the step headers, colons stripped). The 10 lost members are the sub-bullets, including
the three assignment routes that decide this page's identity. **Fix:** either record the drop as a
deliberate duplicate-of-Workflows decision in `synth-valuesets.json`, or extend the existing
Workflows set to 14 (see also C-8 — that node needs editing anyway).

The other 13 dropped dependency candidates I reviewed individually; all point at endpoint names that
exist nowhere in the graph (`cost_object_approval_step`, `single_step_approval_skip_rule`,
`non_po_workflow_options`, `authorized_approver_hierarchy`, `cost_object_approver_hierarchy`,
`user_record`…). Dropping them rather than inventing endpoints is correct. **I would reverse none of
those.**

---

## 7. REPAIR DISCIPLINE — clean. The 17-from-14 failure does not recur.

```
inputs: 4 keep + 5 repair = 9
outputs: 9
names not in the input lists: 0
```
Every emitted `name` matches a procedure-lens candidate exactly (`hierarchy_level_selector`,
`can_approve_exception`, `approval_limit_currency_window`, `approval_limit_amount`,
`cost_object_approval_level`, `authorized_approver_checkbox`, `manager_approval_limit`,
`approval_limit_currency_branch_a`, `authorized_approval_limits_link`). **No record was created during
Repair**, so nothing bypassed the refuter.

All five repairs are label-form or notes-form only; no `name`, `sourceQuote`, `sourceFile`,
`fieldType`, `validValues` or `fromRawHtmlTable` changed. I re-verified the two substantive ones:

* Repair (3), the cross-branch splice: `"(cannot limit-approve)"` occurs **exactly once** in
  `fcfd570c` (`grep -o … | wc -l` → 1) and only in the branch-A paragraph (line 47). The branch-B
  paragraph (line 75) reads `"…final authority to approve the invoice. They can approve…"`
  (`grep -F -c` → 1). The repair is correct and the distinction it protects is the justification for
  emitting both records.
* Repair (5), the trailing period: `"system (reimbursement) currencies"` → 1;
  `"system (reimbursement) currencies."` → 0. Correct. The period-bearing form survives in the notes
  **only inside the description of the defect**, which is legitimate.

`splitsProposed: []` — nothing to review, and nothing in the evidence suggests a split was owed. The
one place a split could have been argued (branch A as its own page) is tested against `8a960238`'s
single step-4 row marked X in **both** deployment columns, which I re-read at
`sed -n '16,200p'` and confirm: 25 pipe rows, 4 data steps, step 4 X/X. **One page is right.**

---

## 8. `fromRawHtmlTable` FLAGS — no false flags.

All nine fields carry `fromRawHtmlTable: false`, and both cited files are genuinely table-free:

```
$ grep -c '<table' …user-administrator-fcfd570c.md      -> 0   ; grep -o '<tr' | wc -l -> 0 ; grep -cP '^\s*\|' -> 0
$ grep -c '<table' …user-administration-8b167b96.md     -> 0   ; grep -o '<tr' | wc -l -> 0 ; grep -cP '^\s*\|' -> 0
```

The two raw-`<table>` files in the inventory (`aae69350`, `fbb5034c`) were correctly identified as
**example data** and correctly not promoted. The `<tr>` counting trap is handled properly throughout
(`grep -o '<tr' | wc -l`, never `grep -c '<tr'`), and the indented-table trap is handled
(`grep -cP '^\s*\|'`, never `^\|`).

---

## 9. DEPENDENCIES AND STEPS

**16 edges, 16/16 quotes verbatim, 16/16 endpoints correct.** Endpoint resolution tested against the
graph's actual key (field `name`, not `label` — confirmed from `dep.gworkflows.046`, whose resolved
`sourceRef.field` is `settings_allow_users_select_own_approver_payment_requests`):

```
Workflows / authorized_approver_feature_available_for_workflows   RESOLVES
Feature Hierarchies / level                                        RESOLVES  (x3)
Workflows / cost_object_hierarchy_type                             RESOLVES  (x3)
Workflows / minimum_exception_level                                RESOLVES
Workflows / maximum_exception_level                                RESOLVES
Workflows / authorized_approver_approval_limit                     RESOLVES
Workflows / step_restrict_approvers_limit_authority_checkbox       RESOLVES
User Administration / Invoice User Administration rights           PAGE-NOT-BUILT (declared)
Employee Import / Approval Limit                                   PAGE-NOT-BUILT (declared)
```

No label was written where a name belongs — the exact failure the boundary checker's last rule hunts.
Confirmed on the simulated merge: `unresolved endpoints in this group: 2`, both the declared forward
references. Dependency `type` values (`depends_on`, `precedes`, `triggers`) all exist in the graph's
vocabulary.

**Do the quotes STATE the relationship?** Yes on 14 of 16. Two are weaker:

* **FINDING C-8a (minor).** Edges 9 and 10 split one tenant-wide exception RANGE across
  `minimum_exception_level` and `maximum_exception_level`, but **neither quote names either bound**.
  Edge 9 quotes `"The range is set in Administration > Invoice > Workflows > Authorized Approver tab."`
  and edge 10 quotes the `fcfd570c` parenthetical. Both genuinely state the scope fence, so the edges
  are sound; but the min/max split is editorial, and edge 10's condition text calls it
  "corroborated from a second file" when it is really the *same* fact from a second file applied to a
  different endpoint. Defensible; flagging so a reader does not mistake it for two attested bounds.
* Edge 13 (currency required-if-amount) is honestly marked **INFERRED** and says exactly why (the rule
  is attested on the import surface only). Correct handling.

Edges 2, 13 and 15 all carry explicit `INFERRED` markers where the identification is not corpus-stated.
Good discipline.

**Steps.** Two steps, ids `grpapproval-authority-s1-set-one-approver-authorization-limit` and
`grpapproval-authority-s2-global-group-only-inline-limit`. **Prefix requirement met.** Field
references use `name` (matching the Workflows-group convention — `grpworkflows-s2` uses
`feature_name`, `level`, `authorized_approver_feature_available_for_workflows`), not labels.
Confirmed by the validator delta: `step-references-unbuilt-page` stayed at 109 and
`step-references-unknown-field` stayed at 23 — **the two new steps introduced zero new warnings**, so
every page and field they name resolves.

Every rationale is tagged `CORPUS-STATED` and/or `INFERRED` (12 of 12 sequence entries), and each says
what breaks out of order — e.g. order 4: *"the right-side controls are read against whatever level is
currently selected, so entering a currency and amount first writes the authorization to the window's
default level… and nothing on screen reports the mismatch"* (marked INFERRED). Order 8's precedence
rule is marked CORPUS-STATED and carries the three-em-dash sentence verbatim. I verified the em dashes:
the ASCII-hyphen form returns 0.

`grpapproval-authority-s1` order 8's honest hedge — *"IF the control is present on this window"* — is
the right treatment of the contested Level.

---

## 10. UNEARNED `uiVariant` CLAIMS — none. `undifferentiated` is earned, not asserted.

Page and all nine fields are `undifferentiated`. **No `"both"` anywhere in this run**, so the three
unearned `"both"` claims outstanding on Audit Rules gain no company.

The claim is measured, and I re-measured it:

```
$ ls admin-guides tools-guides | grep -Ei 'new-experience|legacy|classic'
  comparison-classic-and-current-client-managed-capture-offerings-2fe966db.md
  configure-custom-audit-rules-legacy-ui-6cb4534e.md
  end-user-experience-new-experience-85c2652b.md
  legacy-records-professional-only-8b425e3b.md
  policies-the-purchase-order-policy-new-experience-5a1ba7ef.md
  purchase-order-matching-rules-new-experience-6c8fb80f.md
  using-the-invoice-manager-page-new-experience-f83ba5fa.md
  using-the-unassigned-invoice-page-new-experience-072e2f18.md      (8 files — none touches this surface)
```

The one hedge (`tools-guides/how-single-step-approval-workflow-works-40145f24.md`, *"the Authorized
Approvers link from workflows in the classic interface"*) describes the **Workflows sibling**, not this
window — I read the sentence in full at line 23 and confirm. It was correctly not converted into a
fourth unearned `"both"`.

---

## ADDITIONAL FINDINGS THE TEN HEADINGS DO NOT COVER

### FINDING C-2 — BLOCKING. The page's click path, role gates, aliases and identity notes are **lost on merge**.

This page's whole reason for existing as a separate scope adjudication is that it is *"the FIRST page
in this graph not reached under Administration > Invoice"*, and the brief orders the click path
recorded faithfully. Assembled from the parts directory as staged, it isn't recorded at all:

```
$ python3 bin/assemble-parts.py <parts> aal-raw.json --group "Approval Authority"
  page Authorized Approval Limits   9 fields | coverage partial | basis ?  | dropped 0

$ # the assembled page node:
  navPathEvidence = []      documentedBasis = ""     roleGates = []
  aliases = []              identityNotes = ""       tabs = []

$ # after merge, the node in the graph:
  NEW keys: [coverage, group, id, name, navPath, navPathAlternates, navPathSourceFile,
             navPathSourceQuote, uiVariant, url, verifyNotes]
  navPath: []   navPathSourceQuote: ""   navPathAlternates: []
  WF  keys: [... aliases, documentedBasis, identityNotes, roleGates, tabs, tabsSourceFile ...]
  WF: documentedBasis 'rich', roleGates 6, aliases 28
```

The new page lands **without the `documentedBasis`, `roleGates`, `aliases`, `identityNotes` and `tabs`
keys at all**, while its immediate predecessors (Company Locations, List Management, Tax
Administration, PO Configuration, PO Matching Rules, Feature Hierarchies, Workflows) all carry them.
That is a regression, and on *this* page it deletes precisely:

* the **nine distinct documented click paths** the map enumerated (`map-navigation.md` §3), including
  the 4-segment/2-segment contradiction inside one file and the two container-label variants
  (`Company Administration` vs `Company Admin`; the `(left menu)` hop from `bb58ded2`);
* the **three-condition role gate** — the third condition being about the *record being edited*, not
  the operator, which the map correctly flags as a mis-diagnosis trap;
* the **three section-label aliases** (I re-measured the counts and the map is exact: `Expense and
  Invoices Setting section` 1 file, `Expense and Invoices Settings section` 1 file, `Expense and
  Invoice Settings` 6 files);
* the **branch-A/branch-B identity verdict** and the confirmed "Approver" negative.

**Root cause, located.** `bin/assemble-parts.py` line 80, `nav_from_journal()`: those six keys come
**only** from the workflow journal (`--journal <journal.jsonl>`), never from a parts file. The map
agent's structured return is schema-validated (`NAV_SCHEMA`, line 256, `required: [... documentedBasis,
navPathEvidence, aliases, roleGates, identityNotes, tabs]`) but is written nowhere on disk in
`aal-parts/` — only into the journal and into the workflow's own `navPages` return field.

**Fix (either):** (a) run `bin/assemble-parts.py … --journal <this run's journal.jsonl>` before
merging — nothing else changes; or (b) if the journal is unavailable, hand-write the map's §3/§4/§5
content into a `map-nav.json` and extend the assembler to read it. **Do not merge without one of
these.** Note `navPathEvidence` is 0 on all 22 built pages, so the navPath array itself is a
pre-existing systemic gap — but `documentedBasis`/`roleGates`/`aliases`/`identityNotes` are populated
on the seven most recent pages, so this page would visibly regress against its neighbours.

### FINDING C-8 — the reversed 2026-08-31 scope call is carried by **SIX** built nodes, not four.

The roster's `verifyNotes` item (b) says *"FOUR BUILT NODES CARRY THE NOW-REVERSED 2026-08-31 SCOPE
CALL, one more than the inventory named"* and names `dep.gworkflows.060`, `dep.gworkflows.046` and
the two `vset.gworkflows.unnamed.*`. I censused the graph for the prose itself:

```
$ python3 - <<'EOF'   # walk every string of every node; match /out of scope|2026-08-31|not a page to build/
                      # within 260 chars of /User Administration|Company Admin|Administration > Company/
### configDependencies dep.gworkflows.046   @/condition
### configDependencies dep.gworkflows.060   @/condition
### configSteps grpworkflows-s2-configure-authorized-approver-feature   @/sequence[27]/rationale
### configSteps grpworkflows-s3-vendor-employee-access-hierarchy-six-tool-sequence  @/sequence[23]/rationale
### configValueSets vset.gworkflows.unnamed.the-four-configuration-steps-for-authorized-approvers-and-wh @/notes
### configValueSets vset.gworkflows.unnamed.two-further-named-feature-hierarchies-attested-in-the-corpus @/notes
EOF
```

The two the roster missed are both **configSteps**, and one of them is squarely on this page's subject:

* `grpworkflows-s2-configure-authorized-approver-feature`, `sequence[27]` (order 28), rationale:
  *"The destination is Administration > Company > Company Admin > User Administration, **which is OUT
  OF SCOPE for this graph by the 2026-08-31 decision; no page node exists and none should be
  created.**"* — now flatly false: the page node exists and this step's order-28 leg should point at
  `Authorized Approval Limits / authorized_approval_limits_link`.
* `grpworkflows-s3-vendor-employee-access-hierarchy-six-tool-sequence`, `sequence[23]`:
  *"**Administration > Company surfaces are out of scope for this graph**, so no page node exists for
  it."* — a scope blanket that is now falsified even though its own subject (the vendor group link)
  legitimately stays unbuilt. Repair the reasoning, not the conclusion.

The brief forbids writing "out of scope"/"not a page to build" about this page in *any* note. Two
built nodes say exactly that and neither is on the remediation list.

### FINDING C-9 — `dep.gworkflows.060` did **not** self-resolve, and it will not.

The roster's carry-forward says it *"IS RESOLVED by this run — point it at the emitted
`authorized_approval_limits_link`."* The merge does not do that:

```
$ python3 bin/merge-group.py …
  unresolved endpoints in this group: 2 | earlier edges newly resolved: 0

$ # dep.gworkflows.060 after merge:
  targetId None | targetRef {'page': 'User Administration', 'field': 'Authorized Approval Limits', 'resolved': False}
```

`merge-group.py` re-resolves by **exact (page, field) match**, and this ref names page
`"User Administration"` (the page is `"Authorized Approval Limits"`) and field
`"Authorized Approval Limits"` (the field is `authorized_approval_limits_link`). **Both halves are
wrong**, so it will stay unresolved forever unless the ref is edited. It needs a
`bin/apply-corrections.py` patch alongside the C-8 edits, not an expectation that the merge notices.
`dep.gworkflows.046` correctly stays unresolved (documentary gap) — that distinction is right and
should be preserved in the repaired rationale.

---

## WHAT I CHECKED AND FOUND NOTHING WRONG WITH

Recorded so the next pass does not re-derive it: quote fidelity (58/58, and unique corpus-wide);
`sourceFile` prefixes; release-note contamination; invented values; Yes/No completion; value-set
wiring; page ownership for all nine labels; name collisions against 607 built fields; the `a9522ec8`
and `procedure-2d20b513` hard rules; re-emission of the three Workflows exception/activation fields;
the "Approval Limit"/"Approver" negatives; the reverse-drop of "Can approve exception"; repair
arithmetic (9→9, no additions); `fromRawHtmlTable` on both primaries; the `<tr>` and indented-table
counting traps; dependency endpoint resolution (16/16); step id prefix and field-key convention; step
rationale marking (12/12); `uiVariant` measurement (8 variant files, none relevant); the branch-A/
branch-B one-page verdict against `8a960238`; the title-collision file `5aa3eb5e` (correct skip); and
the section-label alias counts (1/1/6 — the map's count, not the brief's).

---

## FIX LIST, IN ORDER

| # | Sev | Fix | Where |
|---|---|---|---|
| C-1 | **BLOCK** | Insert the word `SIBLING` into `can_approve_exception` notes | `roster-authorized-approval-limits.json` |
| C-2 | **BLOCK** | Re-run `assemble-parts.py` with `--journal`; do not merge a page node with `navPathEvidence: []` and no `documentedBasis`/`roleGates`/`aliases`/`identityNotes` | build step |
| C-3 | med | Restore the branch-A↔branch-B mutual-exclusion edge | `synth-dependencies.json` |
| C-4 | med | Carry the immediate-effect-on-save and removal-semantics facts into notes | `roster-…json` |
| C-8 | med | Repair the reversed-scope prose in **6** built nodes (2 steps missed) | `bin/apply-corrections.py` |
| C-9 | med | Patch `dep.gworkflows.060`'s `targetRef` to `(Authorized Approval Limits, authorized_approval_limits_link)`; it will not self-resolve | `bin/apply-corrections.py` |
| C-5 | low | Record or restore the dropped 14-value `8a960238` catalogue | `synth-valuesets.json` |
| C-6 | low | Delete the zero-value orphan #3 | `synth-valuesets.json` |
| C-7 | low | Strike the stale "rewire the two value sets" carry-forward | `roster-…json` verifyNotes |
| C-8a | info | Note that the min/max exception split is editorial; neither quote names a bound | `synth-dependencies.json` |
