# Adversarial Critic — CORRECTNESS
## Workflows Run A (Workflows + Feature Hierarchies), 2026-08-31

Scope: what is WRONG. Everything below has a command behind it. Corpus root abbreviated `$C` =
`/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`; build dir `$B` =
`/tmp/claude-1000/-mnt-c-Users-manci/bc53169c-7f0a-473a-a07f-cf6d37ca509c/scratchpad/wf-a-parts`.

**Headline.** This is the cleanest build this project has produced. The five defect classes the
previous critic found are all closed: **0 unwired value sets** (predecessor: 16 of 18), **0 fields
homed on a page the docs place elsewhere**, **0 verbatim twins dropped in favour of reformatted
survivors**, **0 invented Yes/No completions**, **0 duplicate field names**. 281 primary quotes and
159 embedded rationale quotes verify verbatim with zero misses.

Eight findings survive, of which **two would change the graph** and one is a **counting error that
hides an unreviewed record**. The rest are wiring hygiene and forward-reference tidiness.

---

## 1. QUOTE FIDELITY — CLEAN (281/281)

Script: `$B/../crit/q1_quotes.py` and `q1c.py`.

```
FIELD QUOTES checked: 121 misses: 0
BAD PATH FORMAT: 0
SYNTH primary quotes checked: 160 misses: 0     # 26 valueSets + 61 deps + 68 contradiction readings + 5 ranges
```

Also checked: the `CONCUR_INVOICE/` prefix bug that broke a prior drop pass. **Zero occurrences** —
every one of the 121 `sourceFile` values is exactly `<guide-dir>/<file>.md`.

Embedded quotes inside step `rationale` prose (which is where the ordering claims actually live and
where no validator will ever look):

```
cleaned embedded quotes: 162  misses: 3
```
All 3 "misses" are my regex splitting on a possessive apostrophe (`Exceptions'`, `SAP's`), not quote
failures. Verified by hand. **Effective result: 159/159.**

Quote uniqueness inside the cited file (a quote that occurs twice cannot pin a row):

```
QUOTE OCCURS 2x IN ITS OWN FILE: workflow_condition_left_parenthesis      (A/G share one sentence — by design, table rows A and G are byte-identical)
QUOTE OCCURS 2x IN ITS OWN FILE: workflow_condition_right_parenthesis_g
QUOTE OCCURS 2x IN ITS OWN FILE: workflow_condition_field_value_c         (C/F share one sentence — by design)
QUOTE OCCURS 2x IN ITS OWN FILE: workflow_condition_field_value_f
QUOTE OCCURS 2x IN ITS OWN FILE: email_subject                            (the documented split, see §7)
```
All five are declared and correct. Verified against `$C/concur-invoice-professional-edition-admin-guides/conditional-expressions-and-the-condition-page-4d98af34.md` lines 195–212: rows **A** and **G**
each carry `Select zero to three parentheses, depending on the complexity of the condition.` in their
own cell. Two records, one sentence, correctly.

**Nothing to fix here.**

---

## 2. INVENTED VALUES — one real defect, two transcription defects

### 2.1 **SEVERE — `step_role.validValues` asserts a closed list the corpus explicitly leaves open, and omits a corpus-attested value**

`$B/roster-workflows.json`, field `step_role`:

```json
"validValues": ["System","Authorized Approver","Invoice Approver",
                "Invoice Processor","Invoice Processor Manager","Invoice Vendor Manager"]
"sourceQuote": "such as Authorized Approver, Invoice Approver, Invoice Processor, Invoice Processor Manager, or Invoice Vendor Manager"
```

The source sentence (`work-with-the-steps-page-fab249d1.md`, line 55) reads:

> `If it is a non-system role, such as Authorized Approver, Invoice Approver, Invoice Processor, Invoice Processor Manager, or Invoice Vendor Manager, then you must select an action…`

`such as` is a hedge, not an enumeration. And the corpus attests a seventh value the list omits:

```
$ grep -c "^    Employee$" $C/concur-invoice-professional-edition-admin-guides/default-workflows-a6fa157a.md
2                      # Role column, step 1 of BOTH shipped default workflows
$ sed -n '55p' .../work-with-the-steps-page-fab249d1.md | grep -c "Employee"
0
```

This build **already caught this** and wrote it up as contradiction index 17
(`$B/synth-contradictions.json`), whose `consequenceForWriter` says, verbatim:

> "Treat the Role list as OPEN, not closed… **Do not emit a value set for this field from the 'such as' sentence.**"

…and then the roster emits exactly that list as `validValues`. The graph will ship a field whose
own contradiction node says its value list is wrong. A Chromium driver reading `validValues` will
reject `Employee`, the Role of step 1 in every shipped workflow.

This is the same family as the two deleted invented "Yes" values: completing a list the corpus does
not close. The validator will NOT catch it — `norm(v) in low` passes for all six strings.

**FIX:** set `step_role.validValues` to `[]`. The open list already lives correctly in
`synth-valuesets.json` valueSet[10] (5 values, context: *"SECOND, CONFLICTING READING… the distinct
Role values actually used by the two workflows SAP ships"*) and in contradiction 17. Nothing is lost.

### 2.2 Email-variable catalog: 9 of 18 values in each of two sets are de-escaped

`synth-valuesets.json` valueSet[17] (`email_body`) and valueSet[18] (`email_subject`) each carry
`%L_WhoChanged%`, `%L_RequestName%`, `%L_RequestDate%`, `%L_SubmitDate%`, `%L_Total%`,
`%L_StepApprovalStatus%`, `%L_PayStatus%`, `%L_EmpName%`, `%L_SubmittingUserName%`.

```
$ f=$C/concur-invoice-professional-edition-admin-guides/variables-for-invoices-or-purchase-requests-26e917cb.md
$ grep -F -c '%L\_WhoChanged%' $f   → 1     # what the file says
$ grep -F -c '%L_WhoChanged%'  $f   → 0     # what the graph says
```

The corpus escapes the underscore for markdown. The **catalog itself is complete and correct** — I
counted independently and there are exactly 18 distinct variables, 9 label + 9 value forms, and all
18 are present, nothing sampled:

```
$ grep -oP '%[A-Za-z\\_]+%' $f | sort -u | wc -l → 18
```

This is a transcription decision, not an invention, and the rendered form is the one a driver would
type. But it will fire `value-set-entries-not-in-file 9 of 18` **twice** at validation, and an
unannotated WARN is indistinguishable from a regression.

**FIX (choose one, don't leave it silent):** keep the rendered form and add one sentence to both
`notes` — *"the source escapes the underscore for markdown (`%L\_WhoChanged%`); the rendered UI
string has no backslash, which is the form recorded here"* — so the WARN is a documented decision.
Precedent exists: 6 of the 80 existing value sets already carry non-verbatim entries.

### 2.3 `segment_name` value set expands a prefix-elided range into strings the file never writes

`synth-valuesets.json` valueSet[24], values `["Custom 10","Custom 11","Custom 12"]`,
cited to `create-the-invoice-routing-feature-hierarchy-8b510285.md`:

```
$ grep -F -c 'Custom 10, 11, and 12' .../create-the-invoice-routing-feature-hierarchy-8b510285.md → 1
$ grep -F -c 'Custom 11'             .../create-the-invoice-routing-feature-hierarchy-8b510285.md → 0
$ grep -F -c 'Custom 12'             .../create-the-invoice-routing-feature-hierarchy-8b510285.md → 0
```

The `notes` declare the expansion openly and the reasoning is sound (a driver hunting a field named
"11" would fail). But **the graph has a node type for exactly this** — `configCompressedRanges`,
which this same build uses five times — and it was not used here.

**FIX:** emit a `compressedRange` (`label: "Custom 10, 11, and 12"`, `expandsTo: ["Custom 10","Custom
11","Custom 12"]`, `count: 3`, `appliesTo: {page:"Feature Hierarchies", field:"segment_name"}`,
quote unchanged) and drop the two expansions from the value set. Same information, right node type,
no WARN.

### 2.4 Yes/No pair — CHECKED AND CLEAN

The one two-value Yes/No in the run, `email_notification_overwrite_all_languages`, is genuinely
two-sided in the corpus:

```
$ grep -n "Select Yes\|set this value to No" $C/.../modify-an-email-notification-a6e5f4ba.md
79:    Select Yes if you would like to apply the new text to all languages.
81:    To make changes only for the selected language, set this value to No.
```
Likewise `consolidate_pr_items_same_vendor_into_single_po` — both option strings are literal source
bullets (`37e7bf0f.md` lines 29 and 31). **No invented completions.**

Full sweep: 212 values checked across `validValues`, value sets and orphans; the only non-verbatim
entries are the 24 catalogued in 2.2/2.3 plus 2 in an `orphanCandidates` entry (which never enters
the graph). SAP's own typo `Send to Approver' Approver` is preserved byte-exact — correct.

---

## 3. VALUE-SET WIRING — CLEAN (26/26), with one structural fix

Every set's `appliesToField` is **exactly** a `name` in the roster for its `appliesToPage`:

```
#   page                   appliesToField                                 WIRED
0-21  Workflows            (22 sets)                                      True
22-25 Feature Hierarchies  level, level, segment_name, feature_name       True
```

`bin/merge-group.py:153` keys on `(appliesToPage.lower(), appliesToField.lower())` and the new
fields are indexed before value sets are processed, so all 26 will resolve. Predecessor run: 16 of
18 landed unwired. **This is fixed.**

Also checked: no `vset.gworkflows.*` id collisions (slug of field + slug of context, all distinct),
no collision with the 80 existing sets.

### 3.1 `feature_name` value set cites one file but 2 of its 3 values come from two others

valueSet[25], values `["Invoice Vendor Employee Access","Invoice Payment","Invoice Routing"]`,
`sourceFile: .../step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md`.

```
$ grep -F -c 'Invoice Payment' .../bcaf1f5a.md → 0
$ grep -F -c 'Invoice Routing' .../bcaf1f5a.md → 0
```
Provenance is given **per value** in `notes` (fb3e6aa2 for Invoice Payment, 8b510285 for Invoice
Routing), which is honest, but the node schema has one `sourceFile` and the validator will WARN
`2 of 3`.

**FIX:** split into three one-value sets, one per file — the structure this same build already used
correctly for `level` (valueSet[22] cites bcaf1f5a for `Employee`; valueSet[23] cites fb3e6aa2 for
`Request`). Follow its own precedent.

### 3.2 Five sets restate a compressedRange on the same field with the same quote (low)

| set | field | range |
|---|---|---|
| 3 | `workflow_condition_left_parenthesis` (`["zero to three"]`) | range 3 |
| 4 | `workflow_condition_right_parenthesis_g` | range 4 |
| 19 | `settings_prevent_payment_request_submission_exception_level` (`["one to 99"]`) | range 0 |
| 20 | `settings_prevent_purchase_request_submission_exception_level` | range 1 |
| 21 | `settings_prevent_purchase_order_transmission_exception_level` | range 2 |

A one-entry value set whose single "value" is the range label is not an enumeration. Harmless, but
it doubles the node count on five controls and a consumer will render `one to 99` as a selectable
option. Consider dropping these five; the ranges carry the same claim, correctly typed.

---

## 4. PAGE OWNERSHIP — CLEAN, with one naming collision

**No field in this run is homed on the wrong page.** The strongest single test:

```
FILES CITED BY THIS RUN THAT ARE ALREADY CITED BY AN EXISTING PAGE:
(none)
```
Zero of the 30 cited source files is cited by any of the 20 built pages. Nothing was re-homed.

Every homing that looked risky was read in full and holds:

| field family | cited file | in-file evidence |
|---|---|---|
| 9 × `settings_*` | invoice-settings-cace748d / purchase-request-settings-b0bce285 / purchase-order-settings-a5a997b4 | `51b11602.md`: *"The setting appears in Administration␠␠Invoice␠␠Workflows␠␠Settings tab"*; `0e1e6d33.md`: *"Review the tables below for each setting function"* on the Workflow Settings page |
| 4 × `authorized_approver_*` | authorized-approver-list-a9522ec8 | steps 1–3: *"Click Administration > Invoice > Workflows (left menu)"* → *"Click the Authorized Approvers tab."* → *"Click the Authorized Approver List tab."* |
| `authorized_approver_feature_available_for_workflows`, min/max exception level | procedure-2d20b513 | same three-step path → *"Click the Configuration tab."* |
| `reason_category`, `reason_code` | creating-a-reason-code-b2b61596 | *"Click the Reason Category and Codes tab."* |
| `allow_employee_to_automatically_transmit_purchase_orders` | 0f2e7fae | *"…Administration␠␠Invoice␠␠Workflows␠␠Workflows tab by opening a PR workflow…"* — **not** Purchase Order Configuration |
| `consolidate_pr_items_same_vendor_into_single_po` | 37e7bf0f | *"The setting appears in Administration > Invoice > Workflows > Workflow tab…"* |
| 7 × Feature Hierarchies | bcaf1f5a, fb3e6aa2 | *"Click Feature Hierarchies (left menu)."* / *"Go to Administration␠␠Invoice␠␠Feature Hierarchies."* |

Critically, the **Workflows condition editor** (`4d98af34.md`, *"The Condition page in the Workflows
tool"*) is kept separate from the Audit Rules editor (`the-condition-page-5d4ea870.md`) and the new
fields are prefixed `workflow_condition_*`, so they cannot merge with Audit Rules' `condition_*`.
Correct — and better discipline than the built page itself, which carries the same eight columns
twice under two naming schemes (`condition_left_parenthesis` **and** `left_parenthesis`,
`condition_and_or` **and** `and_or`, `condition_data_object_left`/`data_object`/`condition_data_object_b`,
`condition_field_value_right`/`second_field_value`). That is pre-existing Audit Rules debt, not this
run's, but it is worth a remediation ticket.

### 4.1 **Reverse collision: `segment_name` is two different controls in the graph**

```
$ python3 → existing graph:
Accounting Administration | segment_name | Segment Name | adding-a-new-segment-d6dfb07b.md
$ this run:
Feature Hierarchies       | segment_name | Segment Name | .../bcaf1f5a.md
```
The Accounting Administration one is an account-code hierarchy segment; the Feature Hierarchies one
is *"the field that will act as the list in User Permissions"*. Same name, different controls.

Not a validator ERROR (`duplicate-field-name` is scoped per page), but note the **asymmetry**: this
same run deliberately named the FH button `modify_hierarchy_button` **precisely** to avoid the
identical collision with `modify_hierarchy` on Accounting Administration, and says so in its notes —
*"the account-code homonym collision the survivor's '_button' suffix exists to keep visible"* — then
did not apply the same discipline one field over.

**FIX:** either rename to `feature_hierarchy_segment_name`, or at minimum add the homonym warning to
`segment_name.notes` the way `modify_hierarchy_button` has it. Do not leave the graph with two
`segment_name` records and only one of them aware of the other.

Other label homonyms checked and cleared: `Editable By Group(s)` (5 records here + Policies /
Exceptions / Image Handling — genuinely one label on many surfaces, distinct names everywhere);
`Email Subject` vs Purchase Order Configuration's `default_email_subject_when_transmitting_purchase_orders`
(different names, no collision); `Level` vs `segment_level` / `level_field` (no collision);
`Exception Visibility` vs Audit Rules (handled honestly — see §7).

---

## 5. DUPLICATE NAMES — CLEAN

```
workflows           fields 114  dup-names: {}
feature-hierarchies fields   7  dup-names: {}
cross-page name overlap: set()
id collisions with existing graph: set()
step id collisions: set()
```
No hard validator ERROR.

Nine duplicate **labels** exist within Workflows and all nine are correct, because SAP genuinely
reuses one label on several tabs. Each pair was checked in source:

* `Remove` ×2 — `btn_remove_workflow` (Workflows tab) vs `remove_workflow_step` (Steps page).
  `delete-a-workflow-or-workflow-steps-e9a84a07.md` documents **two separate procedures** with two
  separate gates (*"If the workflow is available for deletion…"* / *"If the step is available for
  deletion…"*). Two records is right.
* `Workflow Name` / `Workflow Type` / `Steps Can Be Added By` ×2 each — the Workflows-tab **list
  column** vs the General-page **input**. Distinct names (`workflows_list_*_column`), distinct quotes.
* `Status` / `Action Text` / `Description` / `Editable by Group(s)` ×2 — Invoice sub-tab vs Purchase
  Request sub-tab of Approval Statuses, from two different files (`d8cbbe5d` / `1c39ee21`). The
  build explicitly refused to dedupe these. Correct.

---

## 6. WRONG DROPS — NONE. Do not reverse any.

```
roster-workflows:        dropped 86  | ALL 86 carry duplicateOf | 0 unresolvable | 0 without duplicateOf
roster-feature-hierarchies: dropped 5 | ALL 5 carry duplicateOf | 0 unresolvable
```

**Every single drop is a cross-lens name-variant merge.** Not one field was dropped for a terse
description, a short quote, or an inferred type — the refuter-calibration failure that killed 11 of
24 rows on a previous run did not recur.

Conservation is exact on Workflows:

```
extract input names: 200 | kept 114 | dropped 86      (200 = 114 + 86)
KEPT NAMES NOT PRESENT IN ANY EXTRACT: 0
EXTRACT NAMES NEITHER KEPT NOR DROPPED: 0
```

The three drop records I audited hardest all name the verbatim-twin trap explicitly and check it
before deciding — e.g. `save` (Feature Hierarchies): *"BOTH REFUTERS CHECKED THE QUOTE BEFORE
DROPPING, PRECISELY BECAUSE A PRIOR RUN DROPPED A VERBATIM TWIN… this record's `8.  Click Save.`
verifies at grep -F -c = 1… exactly as the survivor's `Click Save.` does."* I re-ran both. True.

**One bookkeeping gap (minor):** on Feature Hierarchies, 15 extract names → 7 kept + 5 dropped = 12.
Three names vanish without a `dropped` row: `modify_hierarchy`, `sourceList`, `segmentName`. The
first two are accounted for in prose (`modifyHierarchy`'s drop reason covers `modify_hierarchy`;
`source_list.notes` carries `[MERGE] Cross-lens duplicate 'sourceList'`). **`segmentName` is
accounted for nowhere.** I verified the substance survived — the tables-lens `segmentName` and the
kept `segment_name` share an identical file and an identical quote — so nothing was lost, but add
the merge note so the conservation arithmetic closes.

---

## 7. REPAIR DISCIPLINE — one counting error, one repair that traded a good quote for a worse one

### 7.1 **`repairedCount` is understated by one — 17 declared, 18 actual**

```
$ python3 → _fields.json['repaired'] length            = 18
$ python3 → fields whose notes contain "REPAIR"        = 18
$ roster-workflows.json: cleanCount 96 + repairedCount 17 = 113 ≠ 114 fields
```
Repaired records never face the adversarial refuter, so the repaired list **is** the list of
unreviewed records. An undercount hides one from review. The eighteenth is
`settings_prevent_payment_request_submission_exception_level` — which is finding 7.2.

**FIX:** `repairedCount: 18`. (Feature Hierarchies is correct: 5 + 2 = 7.)

### 7.2 **SEVERE — a repair replaced a control-naming quote with a non-discriminating one, on a false premise**

`settings_prevent_payment_request_submission_exception_level` now carries:

```
sourceQuote: "Type a number from one to 99."
```

Its repair note justifies this with: *"every available quote for this control carried raw HTML markup
… which is useless to a driver matching visible label text."* **That premise is false.**

```
$ grep -F -c 'Prevent this payment request submission when exception level exceeds' \
    $C/concur-invoice-professional-edition-admin-guides/invoice-settings-cace748d.md
1
```
A markup-free, control-naming, verbatim quote exists. Both the tables lens and the crosscut lens had
it (`extract-workflows-tables.json`, `extract-workflows-crosscut.json`); the repair discarded both in
favour of the procedure lens's generic sentence.

Why this matters concretely:
* `Type a number from one to 99.` **names no control.** It is the description cell, and the identical
  sentence describes **three different controls in three different files** (cace748d, b0bce285,
  a5a997b4). As a graph claim it cannot distinguish which field it grounds.
* It is the **same string** already used as the `sourceQuote` of compressedRange[0] on the very same
  field — so the field and its range now cite one sentence for two different assertions.
* It is the **only one of the nine Settings-tab fields** that does not carry its own label:

```
settings_allow_users_select_own_approver_payment_requests   'Allow users to select their own approver for payment requests'
settings_display_payment_request_approval_links             'Display payment request approval links to approvers on the home page'
settings_filter_payment_request_items_cost_object           'Filter payment request items to those that are applicable to Cost Object'
settings_allow_processor_recall_payment_request             'Allow processor to recall a payment request to last processor step'
settings_allow_users_select_own_approver_purchase_requests  'Allow users to select their own approver for purchase requests'
settings_display_purchase_request_approval_links            'Display purchase request approval links to approvers on the home page'
settings_prevent_purchase_request_submission_exception_level 'Prevent purchase request submission when exception level exceeds X'
settings_prevent_purchase_order_transmission_exception_level 'Prevent purchase order transmission when exception level exceeds X'
settings_prevent_payment_request_submission_exception_level 'Type a number from one to 99.'          ← the outlier
```

**FIX:** set `sourceQuote` to `Prevent this payment request submission when exception level exceeds`
(no markup, grep-verified count 1). Keep `label` as-is, keep `fromRawHtmlTable: true`, keep the
compressedRange. This is a one-line change that restores parity across all nine.

### 7.3 The other 17 repairs — reviewed, all sound

Spot-audited eight. Three are genuinely valuable catches a grep gate could not make:

* `workflow_condition_operator_d` — **wrong-row quote**. The extracted quote (*"The system provides
  the option that best suits the previous choices."*) is verbatim but belongs to the **E: Data
  Object** row. Replaced with D's own text. I confirmed against 4d98af34 lines 168–186. Correct, and
  exactly the class of defect this critique exists to find.
* `confirmation_agreement_text` — `validValues` held eight HTML **formatting tags** (`<B>`, `<BIG>`,
  `<BR>`, `<CENTER>`, `<I>`, `<SMALL>`, `<STRIKE>`, `<u>`). Those are permitted markup inside a free-
  text field, not options. Emptied, whitelist kept in notes, and re-reported as `orphanCandidates[2]`.
  Correct call.
* `step_email_employee_when_step_is_complete` — routed to Repair only because a refuter returned no
  verdict, re-checked, **nothing changed**. That is the "missing verdict routes to Repair, never to
  deletion" rule working as designed.

`remove_workflow_step` correctly refuses to rename during repair (*"The assembly may not emit a name
that did not face the adversarial refuters"*) and reports the suggestion instead. Right instinct.

### 7.4 `splitsProposed` — all four are correct calls, none should be executed here

* **`email_subject` / `email_body` → primary vs delegate recipient.** Real. `add-an-email-notification-c237a2de.md`
  documents `Make the desired changes to the Email Subject field.` **twice** (my uniqueness scan
  independently flagged this quote as the only non-designed 2× occurrence in the run), on the
  Primary Recipient step and the Delegate Recipient step, and the delegate body is gated by
  `Use Primary Recipient Email`. A merged record cannot express the conditional. Reported not split —
  correct, because a split record would be a Repair-created record that never met a refuter.
* **`email_notifications_field` → three slots.** Correctly identified as a **documented granularity
  contradiction** (one control in `554e86aa`, three per-slot fields in `663bb8ac`) and carried both
  ways rather than reconciled. Both presentations are in the roster. Right answer under the
  "record both, state the contradiction" rule.
* **Feature Hierarchies `level` → two contexts.** The reasoning given (provisioning-dependent; two
  refuters ordered one record; a Repair-created node faces no refuter) is exactly the project's own
  doctrine. The two readings are carried as valueSet[22]/[23] plus contradiction 21. Do not split.

---

## 8. `fromRawHtmlTable` FLAGS — CLEAN (3 true, 0 false)

```
$ grep -c '<table' invoice-settings-cace748d.md → 1     (all three rows on line 61 — grep -c '<tr' returns 1 and LIES; grep -o '<tr'|wc -l returns 3)

flag=True  line 61  settings_filter_payment_request_items_cost_object
flag=True  line 61  settings_allow_processor_recall_payment_request
flag=True  line 61  settings_prevent_payment_request_submission_exception_level
flag=False line 36  settings_allow_users_select_own_approver_payment_requests    (markdown table)
flag=False line 51  settings_display_payment_request_approval_links              (markdown table)
```
Every flagged record's quote is physically inside the `<table>` at line 61; every unflagged record's
quote is in the markdown table above it. No file elsewhere in the run contains `<table>`.
`false-rawhtml-flag` (an ERROR-level invariant) will not fire.

**Adjacent finding, out of this run's scope but flag it now:** the map's own
`rawTableFilesInInventory` includes `create-a-conditional-rule-in-the-editor-86a92887.md`, which has
**no skip declaration anywhere**. It holds a packed 3-row raw table with two real fields:

```
Print Condition Rule Name | Enter the name for the new print condition rule.
Editable By               | Select the group(s) that can edit the print condition rule.
```
It is the **Print Condition Rules** surface (Email Reminders territory → Run B), so excluding it here
is right — but it is cited by **zero** fields in the current graph, and packed raw tables are exactly
the artefact class this project has already lost once. Carry it into Run B's must-read list.

---

## 9. DEPENDENCIES AND STEPS

### 9.1 Endpoints — 57 of 61 resolve exactly; 4 unresolved, 3 legitimately

```
endpoints that do NOT resolve to a field: 4
  [45] target User Administration.approver                     PAGE-UNKNOWN  (out of scope by the 2026-08-31 decision — correct)
  [59] target User Administration.Authorized Approval Limits   PAGE-UNKNOWN  (correct)
  [60] target Payment Group Configuration.payment group        PAGE-UNKNOWN  (unbuilt page — correct)
  [49] target Policies.PR hierarchy selection                  PAGE-OK       ← problem
```
Cross-page endpoints spot-checked against the graph and **all exact**: `Exceptions.exceptionCode`,
`Group Configurations.Group Name`, `List Management.listName`, `Forms and Fields.fieldName`,
`Routing Configuration.level_1_10_code`, `Audit Rules.exception_level` /
`.validation_rule_event` / `.custom_audit_rule_event` / `.random_audit_rule_event`,
`Policies.Invoice Workflow`. No mistyped endpoint will silently fail.

**dep[49] invents a field name on a BUILT page.** `Policies` carries no hierarchy selector; the only
matching field is `field.policies.invoice-workflow`, which is the workflow selector, not a hierarchy.
The `condition` is honest about it, but the graph will render a phantom `PR hierarchy selection`
control on a page that has none.
**FIX:** blank `targetField` and leave it a page-level forward reference. The claim survives; the
phantom does not.

### 9.2 Do the quotes state the relationship? Mostly yes; two are inference

Read all 61. Two edges are grounded in a quote that does not state the link:

* **dep[35]** `Workflows.minimum_exception_level → Exceptions.exceptionCode`, quote *"All exceptions
  created in the Exceptions page appear as options for the Audit Rules tool and Workflows tool when
  creating rules."* That sentence is about exception codes appearing as **rule** options; Minimum
  Exception Level is a numeric threshold on the Authorized Approvers Configuration tab. The quote
  mentions both surfaces without stating this relationship. The `condition` opens with `INFERRED:`
  and says so. Honest.
* **dep[46]** `Feature Hierarchies.feature_name → Workflows.cost_object_hierarchy_type`, quote *"Set
  up the Cost Object Hierarchy just like any other hierarchy."* States no ordering. `condition` opens
  with `INFERRED:`. Honest.

Both are correctly labelled but the label is prose, not a field — the dependency schema
(`bin/merge-group.py:145`) has no machine-readable inferred flag, so a consumer counting grounded
edges over-counts by 2. Low severity; worth a `condition`-prefix convention note at merge.

One weaker case worth a second opinion: **dep[28]** `step_role → step_order_column`, quote *"The
Vendor Approval system step _cannot_ precede the Cost Object Approval step."* The constraint is real
and important, but the quote names two **step kinds**, not either endpoint field. The endpoint choice
(role chooses the kind, step order expresses the sequence) is a reasonable modelling decision; just
be aware the quote does not carry it.

Three duplicate endpoint pairs exist ([07]/[10], [36]/[37], [56]/[57]), each with distinct evidence
from a different file. The existing graph already has 8 such pairs in 375 edges, so this matches
precedent. Not a defect.

### 9.3 Steps — ids, resolution, and honesty

```
all 7 ids start with 'grpworkflows-'                      ✓
step.fields unresolved:  s1 ['Save'], s7 ['Save']  →  'save' IS a graph-wide field name → no WARN
seq fields not in step.fields:  two empty-string entries (s2 o28, s3 o24)
seq pages not in step.pages:    none
unknown pages: 'User Administration' in s2, s3   → WARN 'step-references-unbuilt-page' ×2, expected
rationale tags: CORPUS-STATED 117 | INFERRED 5 | UNTAGGED 0
```
**Every one of the 122 sequence rationales is explicitly tagged**, and each says what breaks. Sampled
verification of the "what breaks" claims: s1's `goal` names four distinct half-works (no custom
status → Initial Status list offers only shipped defaults; no Copy → nothing to configure, *"the
administrator cannot create a workflow from scratch"*; no policy → inert workflow, and once attached
it can no longer be deleted; rules before steps → nothing to attach to). All four are grounded in
quotes I verified.

The two empty-`field` sequence entries are deliberate out-of-scope forward references to User
Administration, each carrying a page. The existing graph already has 23 unknown field refs across its
34 steps, so this is consistent.

---

## 10. UNEARNED `uiVariant` CLAIMS — NONE

```
$ grep -o '"uiVariant": "[a-z]*"' $B/*.json | sort | uniq -c
   → "undifferentiated" 361, across every roster, extract and _fields.json
roster-workflows.json           page: undifferentiated | fields: {undifferentiated: 114}
roster-feature-hierarchies.json page: undifferentiated | fields: {undifferentiated: 7}
```

**Zero `both` claims anywhere in the run.** Nothing to report under this heading, and the crosscut
lens's stated reason is the right one: the corpus demonstrably *can* mark UI generation
(`approval-flow-page-c73e063f.md` contrasts legacy and new explicitly) and simply does not for this
surface. The three unearned `both` claims outstanding on Audit Rules were not repeated.

---

## Appendix A — long catalogs, re-counted independently (hard-won rule 2)

Nothing was sampled or truncated. I recounted every one:

| catalog | file | graph | my count | verdict |
|---|---|---|---|---|
| Default approval statuses | `default-approval-statuses-34c83d58.md` | 13 | **13** | complete |
| Email variables | `variables-for-invoices-or-purchase-requests-26e917cb.md` | 18 | **18** (9 label + 9 value) | complete |
| Default Payment Workflow steps | `default-workflows-a6fa157a.md` | 8 | **8** | complete |
| Default PO Payment Workflow steps | same | 2 | **2** | complete |
| Condition editor, Request branch | `4d98af34.md` | 13 | **13** | complete — inventory's "15" was wrong, build corrected it |
| Condition editor columns A–H | `4d98af34.md` | 8 | **8** | complete |
| Condition editor Data Object | `4d98af34.md` | 7 | **7** | complete |
| Settings-tab controls | 3 files | 9 (5+3+1) | **9** | complete, incl. the 3 packed raw rows |

## Appendix B — map claims spot-checked

| claim | verified |
|---|---|
| `permissions for the Feature Hierarchies section in Administration` → 1 file | ✓ 1 |
| `permissions for the Workflows section in Administration` → 2 files | ✓ 2 (`27a421e2`, `f2731590`) |
| Depth A nav (5 topics with `Invoice Processing Admin`) | ✓ all 5 files contain the string |
| "no Feature Hierarchies topic mentions Invoice Processing Admin" | ✓ substantively — 1 file has both, and its IPA reference is to Group Configurations |
| `grep -rn "Invoice Processing Admin"` = 31 hits | ✗ **32** — trivial, does not change the conclusion |
| `Feature Hierarchies tab` = 0 | ✓ 0 |
| `Workflows (left menu)` = 8 files | ✓ 8 |

## Appendix C — presentation caution for the merge report

The flattened `mustReadSkipsDeclared` array contains entries declaring a file "NOT READ" that is
simultaneously the `sourceFile` of kept records (`work-with-the-steps-page-fab249d1.md`,
`work-with-the-step-rules-page-4c33cda0.md`, `conditional-expressions-and-the-condition-page-4d98af34.md`).
I checked: **per lens these are consistent** — the crosscut lens genuinely did not read them, the
procedure and tables lenses did. Zero files declared "NOT READ" by a lens are cited by that lens.
The contradiction is an artefact of merging three lenses' skip lists into one page-level array. Fix
the presentation (tag each skip with its lens) so a future auditor is not sent chasing a phantom.

---

## Action list, in order

1. `step_role.validValues` → `[]`. (§2.1 — the graph currently contradicts its own contradiction node
   and will make a driver reject `Employee`.)
2. `settings_prevent_payment_request_submission_exception_level.sourceQuote` →
   `Prevent this payment request submission when exception level exceeds`. (§7.2)
3. `roster-workflows.json: repairedCount` 17 → **18**. (§7.1)
4. Annotate the `%L\_` escaping in valueSet[17]/[18] notes, or record the escaped form. (§2.2)
5. Split valueSet[25] (`feature_name`) into three one-value sets, one per cited file. (§3.1)
6. Convert valueSet[24]'s `Custom 11` / `Custom 12` into a `compressedRange`. (§2.3)
7. Add the Accounting Administration homonym warning to `segment_name.notes` (or rename). (§4.1)
8. dep[49]: blank `targetField`; keep the page-level forward reference. (§9.1)
9. Add the `[MERGE]` note for `segmentName` on Feature Hierarchies. (§6)
10. Carry `create-a-conditional-rule-in-the-editor-86a92887.md` into Run B's must-read list. (§8)
11. Optional: drop the five value sets that restate a compressedRange. (§3.2)
