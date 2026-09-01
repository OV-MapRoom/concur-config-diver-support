# ADVERSARIAL CRITIC — COMPLETENESS (what is MISSING)
Group: Workflows Run A (`workflows`, `feature-hierarchies`) · corpus SAP 2026_08 Professional Edition, crawled 2026-08-29
Every count below was produced by a command. Nothing is asserted from the digest.

## 0. Baseline established before criticising

```
grep -rl "<table" ROOT/admin-guides | wc -l              -> 31
grep -rl "<table" ROOT/tools-guides | wc -l              -> 1
```
Both reproduce the map's figures exactly.

Grounding was verified mechanically, not sampled, over every `sourceQuote`/`sourceFile` pair in
`roster-*.json` + `synth-*.json`:

```
281 quote/file pairs
bad sourceFile prefixes (CONCUR_INVOICE/, ./, absolute): 0
verbatim FAILURES: 0
```

**The build is grounding-clean. Every finding below is about absence, not about a broken quote.**

Merged citation surface across all lenses: **85 distinct sourceFiles**
(`roster-*`, `synth-*`, `extract-*` walked for every `sourceFile` key).
Emitted payload: 121 fields (114 WF + 7 FH), 26 valueSets, 61 dependencies, 24 contradictions,
5 compressedRanges, 7 steps.

---

## 1. MUST-READ FILES NEVER CITED

The digest's `mustReadNeverCited` lists are **per-lens**, and badly overstate the problem. Merged
across all three lenses only **52 of the ~120 must-read files** are uncited. I measured each:

```
size / pipe-rows (leading-whitespace-safe) / <tr / bullets
```

**44 of the 52 are under 2.1 KB with pipe=0, tr=0** — genuine stubs, CRUD delete-halves and section
anchors. Clean bill: they carry nothing a graph could hold. The eight that are not trivial:

| file | B | pipe | tr | bul | verdict |
|---|---|---|---|---|---|
| `filter-authorized-approvers-by-workflow-approval-step-aae69350.md` | 6234 | 21 | 3 | 12 | **Correctly skipped as a source of values.** I read it in full. The raw `<table>` is an Employee>Line Manager>Country Mgr>HR Approver diagram; the 21-row pipe table is six invented approvers (John/Fred/Crystal/Susan/Terry/Vic). Emitting either would inject tenant-shaped data. Its four real behavioural rules and the singular `Authorized Approver tab` nav form DID reach the notes/contradictions. **No loss.** |
| `how-the-system-determines-which-approver-an-employee-uses-1c83d905.md` | 3698 | 0 | 0 | 12 | Runtime resolution order, not configuration. Clean bill. |
| `authorized-approvers-8b3c26cc.md` / `cost-object-approval-8b3d1e0f.md` / `email-notifications-8b3dbad4.md` | — | 64/85/61 | 0 | — | Revision histories. Correctly refused as rosters. `grep -o '%[A-Za-z\\_]*%' \| sort -u \| wc -l` on `8b3dbad4` returns **1** against **18** in the real catalog — the mis-seeding was not repeated. Clean bill. |
| `vendor-group-mapping-record-type-310-6eb8ffdc.md` | 4384 | 74 | 0 | 2 | Import record spec. Correctly not re-homed onto FH. Its `Future Use 1 - 10` range is deliberately withheld with a written reason. Clean bill. |
| `general-information-00eca1ce.md` | 2281 | 0 | 0 | 2 | Variable *semantics* parent; its substance is folded into `email_body` notes. Clean bill. |
| `workflow-errors-6b89e3f8.md` | 1058 | 0 | 0 | 0 | The build reported "no enumerable error list exists in the corpus." **I tested that claim**: the only 200-row error catalog in the corpus is `error-messages-3b8339b0.md` (210 pipe rows) and `grep -ci workflow` on it returns **0** — it is supplier-invoice-creation error codes. **The thin finding is honest and now independently confirmed.** |
| `approval-status-flags-4f534f16.md` | 1830 | 0 | 0 | 2 | Engine flags, correctly not wired to a field (rule 7). Clean bill. |

**One never-cited file is a real miss and it is severe — see §4 F-1: `approver-terminology-8559861c.md`.**
It *is* cited (once, for a nav label) but the value it carries was not taken. Detailed below.

**One never-opened file pair is the run's biggest single loss — `the-query-builder-and-the-condition-editor-{e10473f9,af058a80}.md`. See §4 F-2.**

---

## 2. FILES THE INVENTORY NEVER FOUND

I ran my own sweep over BOTH dirs with 36 terms including synonyms the mapper did not use
(`Modify Hierarchy`, `Segment Name`, `New Level`, `Source List`, `Hierarchy Name`, `escalation`,
`approval chain`, `Approval Limit`, `Workflow Name`, `Approve and Forward`, `Authorized Approval Limits`):

```
my sweep:               247 files
wf-candidates.txt:      227 files
in mine, not theirs:     46
```

Triaged all 46. Result:

* **32** are Feature-Hierarchies files (the FH inventory found them on its own track) or already-built
  pages (Policies, Audit Rules, Accounting Administration, Group Configurations).
* **`accessing-the-account-code-hierarchy-page-edce1aa5.md`, `adding-a-new-segment-d6dfb07b.md`,
  `editing-a-segment-f79aecf7.md`, `deleting-a-segment-62b49ad9.md`** all contain `Modify Hierarchy`
  and `Segment Name` — the two most distinctive Feature Hierarchies control names. I opened all four:
  they are the **Account Code Hierarchy for Ledger** page under Accounting Administration
  (`Select Modify Hierarchy to display the Account Code Hierarchy for Ledger page.`), Group 5, and
  correctly out of scope. **This is a trap the build walked past cleanly and the credit is real** —
  a naive `Modify Hierarchy` grep would have re-homed a built page's controls onto the thinnest page
  in this run.
* **`overview-8b2edfd0.md`** — see §9 U-3, an unrecorded ordering contradiction.
* **`understand-editable-by-groups-and-applies-to-groups-645ff499.md`** — cross-cutting semantics for
  a field that appears FOUR times on this page (`editable_by_groups`, `approval_status_editable_by_groups`,
  `pr_approval_status_editable_by_groups`, `confirmation_agreement_editable_by_groups`). It says
  *"If you select Global, then the information can be edited or deleted…"* against 554e86aa's
  *"If you select Global Group, then the workflow can be edited or deleted…"*. Already in the graph
  on `page.policies` (`grep -c 645ff499 kg-invoice-config.json` -> 9), so **no new node is owed**, but
  the value-label variance Global / Global Group is unrecorded. Low severity.
* **`assigning-the-approver-for-the-purchase-request-user-20294611.md`** — opened; it is entirely
  Profile + Company>User Administration, out of scope. Clean bill.

**Tools-guides re-sweep (rule 1).** Lens C claimed tools-guides yields zero Workflows fields. I
re-derived it: 71 tools-guides filenames match `workflow|approv|notif|confirm|reason|hierarch|step|delegat|escalat`.
I opened the three most promising never-read ones — `email-notifications-aa8d0c10.md` (card-voucher
payment emails to vendors), `filter-the-approver-and-processor-views-cbcab060.md` (runtime search
filters), `step-6-select-the-vendor-access-group-for-the-user-bb58ded2.md` (Company>User Administration).
**All three are clean bills; the zero-field claim survives for those.**
**It does NOT survive for the Query Builder pair — see §4 F-2.**

**Bookkeeping hole, no data loss:** `purchase-order-settings-a5a997b4.md` is in NEITHER
`wf-candidates.txt` NOR `wf-measure.txt` (`grep -c` -> 0 in both), despite being one of the three
Settings-tab source files that the inventory's own mechanical proof
(`grep -rl "apply globally to"` -> exactly 3 files) named. The file was nevertheless read and cited
12×, its one control and its `one to 99` range both landed. **Census hole, not a graph hole.**

---

## 3. RAW `<table>` SWEEP

Full occurrence counts (not `grep -c`, which lies on packed lines):

```
14 policies-the-purchase-order-policy-new-experience-5a1ba7ef.md      (G1, built)
14 configure-forms-and-fields-for-purchase-order-copy-down-to-pr-...  (G3, built)
13 creating-card-accounts-cf71feb4.md                                 (out of group)
11 what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md       (G4, built — sole tools-guides raw table)
11 onboarding-card-accounts-with-payment-providers-bf273997.md
11 invoice-text-content-type-02b21c13.md
11 configuring-forms-and-fields-in-capture-processing-7c14446c.md
10 overview-attendee-forms-and-fields-96aa4b66.md
 7 additional-approver-situations-fbb5034c.md          <- WORKFLOWS
 4 invoice-barcode-content-type-81641f43.md
 4 global-level-a53bf756.md
 3 invoice-settings-cace748d.md                        <- WORKFLOWS
 3 filter-authorized-approvers-...-aae69350.md          <- WORKFLOWS
 3 create-a-conditional-rule-in-the-editor-86a92887.md
 1 x 18 sample-record*/example-data files
```

Three land on Workflows, zero on Feature Hierarchies. Dispositions, all verified by opening the file:

| file | rows | class | in graph? |
|---|---|---|---|
| `invoice-settings-cace748d.md` | 3 `<tr>` on ONE physical line (`grep -c '<tr'`=1 **lies**, `grep -o '<tr' \| wc -l`=3) | **SETTINGS TABLE** | **YES — all 3 recovered.** I dumped the cells independently: `Prevent this payment request submission when exception level exceeds X`, `Filter payment request items to those that are applicable to Cost Object`, `Allow processor to recall a payment request to last processor step`. Settings-tab total = 5+3+1 = **9**, confirmed against source. |
| `additional-approver-situations-fbb5034c.md` | 7 | illustrative (six approvers A–F, limits 100/900/500/750/1000/5000) | correctly skipped |
| `filter-authorized-approvers-...-aae69350.md` | 3 | illustrative level diagram | correctly skipped |
| `create-a-conditional-rule-in-the-editor-86a92887.md` | 3 | **RULED OUT correctly** — I opened it; its two fields are `Print Condition Rule Name` / `Editable By`, i.e. Print Condition Rules, not Workflows. |

**No settings table in category 1 is missing from the graph.**

---

## 4. LONG CATALOG SWEEP — TWO REAL MISSES

I re-measured every candidate (273 files, union of both sweeps) for `pipe>=10 or bullets>=10 or <tr>=6`
AND not cited. 46 hits. I opened every one that could plausibly belong to these two pages:

* `examples-f8248518.md` (90 rows) — worked approver example (A1…), illustrative. Clean.
* `available-actions-e164ad23.md` (83 rows) — Invoice Processor role/action matrix, runtime. Clean.
* `approver-action-approved-{73c69e93,4e3e0532,07bd5cc2}.md` (30/30/28) — COA worked examples with
  dollar amounts. Illustrative. Clean.
* `procedure-configure-settings-068fa6f3.md` (69) + `overview-settings-78643171.md` (11 bullets) —
  the **Attendees** Settings tab, a THIRD "Settings tab" in this corpus the label-collision register
  never named. Correctly excluded here; worth adding to the traps list.
* `error-messages-3b8339b0.md` (210) — supplier-invoice creation errors, zero workflow mentions. Clean.
* `workflow-guides-{8b3b85da,8b3c7b2a,8b3d6ede,8b3e09a7}.md` — I diffed the four. The 4-guide payload
  is **content-identical**, differing only in markdown emphasis and one SAP typo in 8b3e09a7
  (`Concur Invoice: Workflow –Authorized Approvers`, missing space). Skip is right; the md5s are NOT
  identical, so the digest's "identical payload" phrasing is loose but the conclusion holds.

### F-1 (SEVERE) — a documented third value for `Steps Can Be Added By`, declared "undetermined"

`synth-contradictions.json` contains this, on `steps_can_be_added_by`:

> "Do NOT treat either two-value list as exhaustive: the General-page description of this field speaks
> of 'the employee and/or the approver', so **a third, employee-only value is likely present — it is
> deliberately NOT invented here, and the driver must read the live list.**"

The corpus enumerates it. `approver-terminology-8559861c.md` line 66:

```
grep -F -c "If the Steps Can Be Added By field is set to Employee, then the employee can choose
their own approvers using the Approval Flow page." <file>   -> 1
```

It is the **only** corpus occurrence (`grep -rn` over both dirs returns exactly this one line).
`8559861c` **was opened by this run** — it supplies a nav-label reading inside the Authorized-Approvers
naming contradiction — so the file was in hand and the sentence was not taken.

Net: `steps_can_be_added_by` ships with 2 values and a written claim that a third is undocumented,
when the corpus documents it in a file the build cited. **This is the exact class of defect the brief
describes: "a named site setting with an enumerated value missed."**

Correct disposition: add `Employee` as a third value with `8559861c` as its source, and rewrite the
contradiction's `consequenceForWriter` — the readings become three (`Approver Only`/`Both Employee and
Approver` from b847d65b; `Approver`/`Both Employee and Approver` from 1d37b85f; `Employee` from 8559861c),
and the label form of the approver-side option remains genuinely undetermined.

### F-2 (SEVERE) — 433 condition-editor entries and 12 compressed ranges in two never-opened tools-guides files

`mustReadSkipsDeclared` says:

> "the-query-builder-and-the-condition-editor-af058a80.md / -e10473f9.md … these are the Processor
> RUNTIME Query Builder (used while processing an invoice), not the admin config Condition editor;
> deliberately excluded as do-not-confuse."

They were never opened. I opened both. They are **not one file, they are two distinct surfaces**, and
their own opening sentences tie them to the admin condition editor:

`e10473f9.md:23` — verified `grep -F -c` = 1:
> "The Query Builder window in Invoice Processor is very similar to the Condition page within several
> of the other features in the Invoice Configuration administrator."

Measured payload:

| file | surface | Data Object list | Field/Value entries | compressed ranges |
|---|---|---|---|---|
| `tools-guides/the-query-builder-and-the-condition-editor-e10473f9.md` | Invoice Processor | **7** — *identical members* to the Workflows Condition page's 7 (Detail, Detail Allocation, Employee, Request, Request Exception, Vendor Remittance, Vendor Ship From) but **each with a description the admin file lacks** | **217** | **7**: `Address 1-3`, `Custom 01-10`, `Custom 01-15`, `Custom 01-20`, `Custom 01-24`, `Org Unit 1-6`, `Org Unit 4-6` |
| `tools-guides/the-query-builder-and-the-condition-editor-af058a80.md` | PR Processor **and** PO Processor | **TWO further lists**: PR = Employee, Purchase Request, Purchase Request Distribution, Purchase Request Item, Vendor Remittance Address (5); PO = Bill To, Employee, Purchase Order, Purchase Order Distribution, Purchase Order Item, Ship To, Vendor Remittance Address (7) | **216** | **5**: `Custom 01-07`, `Custom 01-20`, `Custom 01-22`, `Custom 01-24`, `Custom 02-20` |

Against what the graph carries for the Workflows condition editor: `workflow_condition_field_value_c`
holds **2 + 13 = 15** entries, from a table SAP itself opens with

> "The table below shows **a partial list** of the options that appear for the Field / Value based on
> your selection from the Data Object list."  (`4d98af34`, `grep -F -c` = 1)

This is the brief's named failure mode twice over: rule 1 (an admin-skewed search losing a tools-guides
catalog) and rule 2 (a ~250-name table skipped for being long — here, **two** of them).

**I am NOT saying home 433 values on the Workflows page.** They belong to Processor surfaces the recon
deferred, and re-homing them would be exactly the padding error the FH lens correctly refused elsewhere.
What is owed is:
1. a **contradiction node** on `workflow_condition_field_value_c` / `_f`: the Workflows topic gives 15
   and calls itself partial; two topics on a control SAP calls "very similar" give 217 and 216; the
   corpus never states whether the lists coincide. Ground it on the two quotes above.
2. a **corroboration note** on `workflow_condition_data_object_b`: `e10473f9` independently reproduces
   the same 7 members *with descriptions*, which materially strengthens the 7-value set and is free.
3. an **unbuilt-surface pointer** so the deferred Processor pages inherit the 433 entries and 12 ranges
   instead of a future run re-discovering them.

### F-3 (SEVERE) — a direct, unrecorded contradiction on `workflow_condition_data_object_e`

Same two files, same table row, opposite instructions. Both verified `grep -F -c` = 1:

* `4d98af34.md:177` (Workflows, **E: Data Object**) — "The system provides the option that best suits
  the previous choices. **Change it if necessary.**"
* `e10473f9.md:110` (Processor Query Builder, second Data Object) — "**This field will always display
  as Value and you cannot change this.**"

Editable vs not editable on the same column of a control SAP calls "very similar". The graph currently
gives `workflow_condition_data_object_e` the note "Condition page." and nothing else. A driver told the
field is settable will behave differently from one told it is fixed. **Record both readings; do not
reconcile.**

### F-4 (MODERATE) — the Audit-Rules condition page is the corpus's real catalog and nothing points at it

`admin-guides/the-condition-page-5d4ea870.md` — **820 lines, 288 bullets**, already in the graph on
`page.audit-rules` (51 references), opens (`:23`, `grep -F -c` = 1):

> "The Condition page in Audit Rules is similar to the Condition page used for **Workflow** and Processor."

Its Data Object list is **10** (Attendee Totals, Budget, Detail, Detail Allocation, Employee,
Line Item Attendee, Request, Request Exception, Vendor Remittance, Vendor Ship From) against the
Workflows list's **7**. The three extra are Attendee Totals / Budget / Line Item Attendee — plausibly
provisioning-driven, since both files use the identical lead-in "The choices that appear in this list
are based on the event that triggers the rule."

**The 7 is right and should not be extended.** The finding is that the 7-vs-10 divergence, on a control
SAP explicitly links to Workflow, is unrecorded, and the Workflows records carry no pointer to the one
admin-guides file that actually enumerates this editor at scale. Its ranges are also the corpus's
dash-variance evidence: `Custom 01 - 20`, `Custom 01-20`, `Custom 01 – 21` (en dash), `Org Unit 1 - 6`,
`Org Unit 1-6`, `Attendee Entry Custom 1-5`, `Custom 01-24`, `Custom 01-25`, `Address 1 - 3`, `Custom 01 - 10`.

### F-5 (MODERATE) — the Feature Hierarchies name catalog is short by two, on a stated ground the corpus refutes

`synth-valuesets.json`, `feature_name`, notes:

> "TWO FURTHER HIERARCHY NAMES ARE WITHHELD, deliberately … 'Payment Authorized Approvers' and the
> Cost Object Approver hierarchy are attested as hierarchy names but **no file states they are selected
> on THIS page**."

Two files this run read *do* state it. Both verified `grep -F -c` = 1:

* `understand-the-hierarchy-b65d7089.md:23` — "You must define the authorized approver hierarchy
  **(Invoice > Feature Hierarchies)** and import/create its associated source list before the
  authorized approver feature can be activated."
* `step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md:25` — "This portion of the configuration
  requires permissions for **the Feature Hierarchies section in Administration**." (paired with
  "Set up the Cost Object Hierarchy just like any other hierarchy.")

On the thinnest page in the run, the landing-screen catalog goes from 3 attested names to 5. The set
already carries per-value provenance and a "floor, not closed" caveat, so extending it costs nothing
structurally. Same treatment as the existing three, with a note that these two are *placement*-attested
rather than *selection*-attested (nobody writes "select the Cost Object Approver hierarchy").

### F-6 (MODERATE) — Table 2 governs C **and** F; the value sets are wired only to C (rule 7)

```
grep -o "For specific field/value choices, refer to Table 2 for more information." 4d98af34.md | wc -l  -> 2
grep -o "based upon the selection made in the Data Object list" 4d98af34.md | wc -l                     -> 2
```
Lines 155 and 190 — the **C: Field/Value** row and the **F: Field/Value** row carry byte-identical text
and the identical Note. The 2-entry Employee set and the 13-entry Request set are attached to
`workflow_condition_field_value_c` only. `workflow_condition_field_value_f` ships with
`validValues: []` and the note "Condition page." A driver filling column F has nothing.

### F-7 (LOW-MODERATE) — `H: And/Or` has an enumerated pair the roster declines

The field note reads: "Two implied options (And / Or), **not separately enumerated as a bulleted list
in this file** — left validValues empty per the thin-is-correct rule."

The members are enumerated, just in prose, `4d98af34.md:52`, `grep -F -c` = 1:

> "When a conditional expression is composed of multiple conditions, each condition is separated by
> **either and or or**."

Corroborated at `:73` ("connected by and / or operators", `grep -F -c` = 1) and by the column label
itself. This is **not** completing a toggle — both members are written down. Two values, grounded.

### F-8 (LOW) — the Exception Visibility list exists in a file this run cited

`step_rule_exception_visibility` ships `fieldType: "unknown"`, `validValues: []`. Its Generate-Exception
context comes from `4c33cda0`. The three-value list lives in `add-a-custom-audit-rule-0f1d320e.md:134-142`
— **a file this run cited** — as `Invoice Owner, Approver, and Invoice Processor` / `Approver and Invoice
Processor` / `Invoice Processor`, and the built `page.audit-rules` already carries exactly those three.
The Workflows record's decision to keep it definition-less is defensible (the definition surface is
Audit Rules), but it does not name the list or point at the Audit Rules node, so the pointer is lost.

---

## 5. TRUNCATION — every enumeration that DID reach the graph, counted at source

I counted each source myself rather than trusting the roster.

| enumeration | source | source count | in graph | verdict |
|---|---|---|---|---|
| Default approval statuses | `default-approval-statuses-34c83d58.md` | **13** (48 pipe lines; I enumerated: Accounting Review, Approval Time Expired, Approved, Auto Approved, Extracted, Submitted, Not Submitted, Paid, Pending Approval, Pending Payment, Pending Validation, Sent Back to Employee, Vendor Approval) | 13 | **exact** |
| Email variables | `variables-for-invoices-or-purchase-requests-26e917cb.md` | **18** (`grep -o '%[A-Za-z\\_]*%' \| sort -u \| wc -l` = 18) | 18 | **exact**. Corpus-wide check: only 3 files contain `%L\_`, the other two hold 1 and 2 tokens. No second catalog exists. |
| Default Payment Workflow steps | `default-workflows-a6fa157a.md` | 8 | 8 | exact |
| Default PO Payment Workflow steps | same file | 2 | 2 | exact |
| PO workflow steps (competing) | `example-of-typical-purchase-order-workflow-6d3b90d0.md` | 7 | 7 | exact, contradiction recorded |
| Required system steps | `required-steps-43399a5d.md` | 4 | 4 | exact |
| Condition-editor columns A–H | `4d98af34.md` | 8 | 8 | exact |
| Data Object (Workflows) | `4d98af34.md` | 7 | 7 | exact |
| Field/Value Employee / Request | `4d98af34.md` | 2 / 13 | 2 / 13 | exact **against a source SAP calls partial** — see F-2 |
| Rule action catalog | `4c33cda0.md` + `fab249d1.md` | 5 (+3 single-instance / 2 multi-instance) | 5 / 3 / 2 | exact |
| Add Workflow Step fields | `fab249d1.md` | **8** in the table (the map said 9) | 8 + `step_order_column` + 3 conditional Role-triggered fields | correct; map's "9" was loose |
| General page fields | `554e86aa.md` | **27** rows (map said 28) | 27 named + 2 label variants | correct; the tables lens's correction holds |
| Approval Time Expired Action | `554e86aa.md` | **5** (No Action, Send to Approver' Approver, Skip to the Next Step, Add Processor Step, Send Back to the Employee) | 5 | **exact — and the map-inventory's "3" was wrong.** The build beat its own brief here. |
| Assignment Timeout Action | `554e86aa.md` | **2** (No Action, Submit Request) | 2 | **exact — the map-inventory mis-assigned {Add Processor Step, Send Back to the Employee} to this field; they belong to Approval Time Expired Action.** Build corrected it. |
| Settings-tab controls | `cace748d` + `b0bce285` + `a5a997b4` | 5 + 3 + 1 = **9** | 9 | exact, incl. the 3 packed |
| Confirmation Agreement HTML tags | `3e153f29.md` | 8 | 0 in validValues, **all 8 in notes** | deliberate demotion (markup, not selectable values) with a written reason — content preserved, no loss |
| Workflow approaches | `1d37b85f.md` | **5** under the header "Workflow type" | **0** | see §5b |

### 5b — an enumeration that reached the extract and died in assembly

`extract-workflows-tables.json` carried this note on `wf_workflow_type`:

> "The 5-row table in workflow-creation-process-1d37b85f.md enumerates approval APPROACHES
> (Centralized approval workflow / Decentralized workflow or Employee-directed Approval /
> Approver-Directed Approval / To Use an Authorized Approvers List / Approval Time Expired), NOT this
> field's values — deliberately not wired to it."

That is a **good** decision. But `roster-workflows.json` dropped `wf_workflow_type` as a cross-lens
duplicate with the boilerplate *"every note or quote the loser held that was better than the survivor's
has been folded into the survivor"*, and the surviving `workflow_type` note reads in full:

> "General page, wizard page 1 of 3 (modal object under Workflows tab). Read-only display field,
> populated by the source workflow being copied."

The reasoning is gone. `grep -l "Centralized approval workflow" *.json` returns only the two
`extract-*` files; `grep -c` on the graph returns 0. A future pass will re-mine a 5-row table headed
"Workflow type" and have to re-derive the same decision. **The de-dupe merge claim is not true for this
record** — worth checking whether other drops lost notes the same way (86 drops on Workflows, 1 on FH).

Separately: `1d37b85f` is the source of the **only** enumeration for `Workflow Type` anywhere; the
General-page row says only *"This field is read-only."* and `access-workflow-fa9892a7.md` says only
*"Displays the type of workflow."* **`workflow_type.validValues: []` is the honest answer** and I
confirm it. The loss is the note, not the values.

---

## 6. COMPRESSED RANGES

Sweep over all 273 candidates for `Custom N-M`, `Level N-M`, `Future Use N-M`, `N to M`, `zero to three`,
`up to N`:

```
1 vendor-record-type-200-9c92487a.md:856   Custom 16 - 20        (vendor import, out of group)
1 vendor-record-type-200-9c92487a.md:275   Future Use 5-8        (out of group)
1 vendor-group-mapping-record-type-310-6eb8ffdc.md:278  Future Use 1 - 10   (import spec; withheld with reason, 3 near-identical ranges already in graph)
1 purchase-request-settings-b0bce285.md:66    one to 99          -> IN GRAPH
1 invoice-settings-cace748d.md:61             one to 99          -> IN GRAPH
1 purchase-order-settings-a5a997b4.md:40      one to 99          -> IN GRAPH
1 create-a-confirmation-agreement-3e153f29.md:72  up to 2000 characters  -> IN GRAPH (as sourceQuote on confirmation_agreement_text)
2 conditional-expressions-...-4d98af34.md:118,203  zero to three parentheses  -> IN GRAPH (both A and G)
3 adding-a-new-segment-d6dfb07b.md            Custom 1-20        (Account Code Hierarchy, G5; grep -c d6dfb07b on graph = 9 -> already covered)
```

**5 of 5 in-scope ranges are recorded, with expansions.** The `zero to three` handling is exemplary —
the expansion is written in the source's own register (words, not digits) with an explicit statement
that the on-screen option strings are unknown. **No range miss inside the group.**

**Dash variance:** the two pages' own sources contain **no** `Custom N–M` range at all, so there is
nothing to report on en-dash vs hyphen *here* — and that is the honest finding. The variance lives in
the sibling condition-page files (F-2/F-4), which use three different dash forms in one file
(`Custom 01 - 20`, `Custom 01-20`, `Custom 01 – 21`). A future condition-editor pass must normalise on
the character, not the string.

---

## 7. THIN PAGES — honest or lazy?

**Feature Hierarchies (7 fields, `documentedBasis: sparse`) — HONEST, with one correctable shortfall.**

Proof the thinness is real, not a mining failure:
```
grep -rli "Feature Hierarch" both dirs        -> 24 files (13 admin / 11 tools)
raw <table> in any of the 24                  -> 0
```
Of the 24, **23 were read**. The one that was not — `overview-8b2edfd0.md` — was excluded by a written
anti-padding guard (it is Group Configurations, built) and that guard is correct for *fields*, though
not for the ordering claim it carries (§9 U-3). I read both primary procedures end to end
(`bcaf1f5a`, 48 lines; `fb3e6aa2`, 49 lines) and confirm the page's entire documented control surface
is: feature-name selector, Modify Hierarchy, Source List, New, Level, Segment Name, Save. **Seven.
That is all there is.** The build did not pad it and did not fake a table.

The shortfall is F-5 (catalog short by two), not the field count.

One inverse observation, since a completeness critic that only counts upward is half-blind: the
`segment_name` value set carries `Custom 10 / Custom 11 / Custom 12` from `8b510285`, whose own framing
is *"In the example below, the source list 'sample' is selected"*. The notes say so explicitly
(*"THESE ARE THE SOURCE'S EXAMPLE CHOICES"*), but this is the same shape as the illustrative tables the
run correctly refused elsewhere (`aae69350`, `fbb5034c`, `f8248518`). Consider demoting to notes for
consistency with the run's own standard.

**Zero-hit page nodes: none created.** Both pages have real documentary basis. Neither should be dropped.

**Workflows (114 fields, `rich`) — no thin-page issue**, but note that seven of its tabs rest on very
uneven documentation: the Reason Category and Codes tab yields two prose fields with no option list
(`b2b61596`, `overview-9c8ca06e` — I read both; neither enumerates a single Reason Category), and that
is honest.

---

## 8. NEW EXPERIENCE / LEGACY

Filename sweep, both dirs, for `new-experience|legacy|classic|nextgen|next-gen|new-ui|old-`:

```
comparison-classic-and-current-client-managed-capture-offerings-2fe966db.md   (G4)
configure-custom-audit-rules-legacy-ui-6cb4534e.md                           (G2)
configure-custom-audit-rules-new-ui-3cc2360e.md                              (G2)
end-user-experience-new-experience-85c2652b.md                               (end-user)
legacy-records-professional-only-8b425e3b.md                                 (import)
policies-the-purchase-order-policy-new-experience-5a1ba7ef.md                (G1 — the known precedent)
purchase-order-matching-rules-new-experience-6c8fb80f.md                     (G3)
using-the-invoice-manager-page-new-experience-f83ba5fa.md                    (end-user)
using-the-unassigned-invoice-page-new-experience-072e2f18.md                 (end-user)
```

Body sweep for `new experience` / `New Experience` returns 9 files, `legacy` returns 18. **Not one is a
Workflows or Feature Hierarchies topic.** There is no PO-Policy-shaped stub/rich twin pair here.

`uiVariant: "undifferentiated"` on every field of both pages is therefore **correct and earned**, and
the run's own counter-evidence is well chosen: `approval-flow-page-c73e063f.md` proves the corpus
*can* mark UI generation explicitly and simply does not for this surface. **No variant was built from
the wrong twin. Clean bill on item 8.**

One nit: the four `workflow-guides-*` topics are four distinct `loio` republishing the same payload, and
the four `the-condition-page-*` / `the-query-builder-*` topics are **not** republished twins — they are
four different surfaces (Audit Rules / Print Condition Rules / Invoice Processor / PR+PO Processor).
The build's skip note collapses the last pair into one thing (§4 F-2). Twin-detection by title is
unsafe in this family; use the first body sentence, which always names the surface.

---

## 9. UNDETERMINED BY THE DOCUMENTATION — ranked

These are properties of the corpus. Recording them accurately is deliverable, not backlog.

**U-1. The true option list of the Workflows Condition page Field/Value helper.** SAP declares its own
list partial in the same sentence that presents it, then publishes 217- and 216-entry lists for controls
it calls "very similar" without ever saying whether they coincide. **Unresolvable in principle from this
corpus** — but the *existence and size* of the sibling lists must be recorded (F-2). Currently the graph
says 15 and is silent about 433.

**U-2. Whether `E: Data Object` is editable.** "Change it if necessary" vs "you cannot change this",
two topics, same column. No third topic adjudicates. (F-3)

**U-3. Whether Feature Hierarchies precedes or follows List Management.** Two readings, both verified
`grep -F -c` = 1 in `overview-8b2edfd0.md`:
* `:27` — "2. **In the Feature Hierarchies section of Administration** in Concur Invoice, you define a
  hierarchy for the feature … and associate a source list with the hierarchy."
* `:29` — "3. **In List Management, you create the source list** associated with the feature hierarchies."

i.e. FH at step 2, List Management at step 3 — the **reverse** of every other source
(`cc91aa73` "Step 1: Create the Source List in List Management"; `fb3e6aa2` "The source list and custom
field referenced in the steps below must already be configured before you proceed."; `37e3c289`
"Step 1: List Management / Step 2: Feature Hierarchies"). The graph emits the precedence edge in one
direction only. **Record the contradiction; the driver's order is genuinely contested.**
(`overview-8b2edfd0.md` also supplies a third nav register — "the Feature Hierarchies **section of
Administration**" — against "Feature Hierarchies (left menu)" and "Administration > Invoice > Hierarchies".)

**U-4. The label form of the approver-side value of `Steps Can Be Added By`.** Genuinely undetermined
between `Approver Only` and `Approver`. The *`Employee`* half is NOT undetermined (F-1) — only the
approver half is.

**U-5. Whether the Level control's options vary by feature hierarchy.** "Employee … cannot be changed"
vs "Set the level to Request." The build's refusal to reconcile is exactly right and its two
context-scoped one-value sets are the correct shape. Corroborating and equally unresolving:
`b65d7089` "By default, the Request Authorized Approver hierarchy uses the Request and Employee fields".

**U-6. Whether the Data Object list is closed for PR workflows.** The Workflows editor lists 7; the
Audit Rules editor lists 10; the PR Processor Query Builder lists a *disjoint* 5 (Purchase Request,
Purchase Request Distribution, Purchase Request Item…). Since the Workflows tool configures PR workflows
too, and since every one of these files says the list "is based on the event that triggers the rule",
the PR-workflow case is unstated. Provisioning/event dependent by SAP's own words.

**U-7. Whether the middle nav node applies.** Already correctly recorded as a contradiction
(`Invoice Processing Admin` present in 5 topics, absent in 8). For Feature Hierarchies:
`grep -rl "Invoice Processing Admin"` returns 24–31 files and **not one** is a Feature Hierarchies
topic — UNATTESTED, not absent, exactly as recorded.

**U-8. `Notification Type` options.** `a6e5f4ba` says only "The Payment notification type is displayed."
One value, displayed not chosen. Left empty — honest.

**U-9. Reason Category options.** Neither `b2b61596` nor `overview-9c8ca06e` enumerates one. Thin is
correct.

---

## SUMMARY

The build is grounding-clean (281/281 verbatim, 0 bad prefixes), its raw-table recovery is complete
(the packed 3-row table in `invoice-settings-cace748d.md` is fully recovered), its compressed ranges are
complete 5/5, its in-group catalogs are untruncated on every count I re-derived, and it beat its own
map-inventory twice on the timeout value sets. Feature Hierarchies' thinness is proven honest by a
24-file sweep with zero raw tables.

Three things would change the graph if acted on, in order:

1. **F-2 / F-3 / F-4** — two never-opened tools-guides files holding 433 condition-editor entries,
   12 compressed ranges, two extra Data Object lists, and a flat editability contradiction, against a
   graph that carries 15 entries from a source SAP labels partial.
2. **F-1** — `Steps Can Be Added By` = `Employee`, enumerated once in the corpus, in a file this run
   cited, currently declared undocumented.
3. **F-5** — the Feature Hierarchies name catalog withheld two attested names on a stated ground that
   two read files refute.

Then F-6 (Table 2 governs C and F), F-7 (`And/Or`), §5b (the dropped `Workflow Type` note), U-3
(the reversed FH/List Management ordering), F-8, and the `segment_name` example-data demotion.
