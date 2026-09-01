# KG Build Log

> **Scope note.** This is a **blind build from documentation.** Every node is a structural claim
> backed by a verbatim quote from the SAP 2026_08 corpus. Nothing here is derived from, or
> validated against, any specific tenant's configured system — that would turn a config
> observation into a structural fact and defeat the point of the build.
>
> Sections headed *"Undetermined by the documentation"* list places where the corpus contradicts
> itself, goes silent, or describes behaviour that varies by provisioning. Those are recorded as
> **properties of the documentation**, not as a validation backlog. Where a value list is
> module-dependent, the honest graph carries the documented range and says it varies.

## 2026-08-31 — Group 1: Policy & Scope

**Corpus:** `concur-corpus` @ `d838939` · SAP `2026_08` · Professional Edition · crawled 2026-08-29T12:14:11.751Z
**Method:** 19-agent workflow — Map → Extract (3 pages × 3 lenses) → Verify (double, fail-closed) → Synthesize → Critic
**Source:** on-disk corpus files. The `concur-docs-genie` MCP was NOT used — it is not connected on this machine.
**Cost:** 2,270,946 subagent tokens · 449 tool calls · 47min · 19/19 agents, 0 errors

### Node counts

| Node type | Count |
|---|---|
| ConfigPage | 3 |
| ConfigField | 79 (of 111 extracted — **32 dropped** in verification) |
| ConfigDependency | 81 |
| ConfigStep | 4 |

Per page: Policies 44/51 kept · Group Configurations 22/31 · Invoice Settings 13/29.

### Verification

Every field faced two independent verifiers and needed **both** to keep it:
1. **Grounding** — re-opened the cited file, `grep -F` the `sourceQuote` as a literal substring, checked every `validValues` entry appears in that text.
2. **Adversarial refuter** — attacked on substance: is this a control on *this* page, or an end-user field / section heading / prose noun?

Fail-closed: a missing verdict from either verifier drops the field. 32 fields died this way.

### Dependencies — 58 of 81 have an unresolved endpoint

Only **2** point at a Group 1 page (both are feature-activation references, not fields). The other
**56 are forward references into groups not yet built** — Forms and Fields (5), Form Types (4),
User Permissions (4), Audit Rules (3), Invoice Pay (3), Workflows (2), Image Handling (2),
Purchase Order Configuration (2), Payment Manager (2), and 11 to the generic `Invoice` node.
These resolve as later groups land. `sourceRef`/`targetRef` preserve the textual endpoint so
nothing is lost in the meantime.

### Headline navigation findings

**1. A middle menu node the URLs hide.** No Group 1 page is reachable directly from `Administration`.
All three hang off **`Invoice Processing Admin`**:
`Administration > Invoice > Invoice Processing Admin > <page>`.

**2. The corpus publishes no URLs at all.** Zero hits across all 1,859 files for `PolicyAdmin`,
`groupConfiguration`, `invoiceSettings`, or `dcredirect`. The `.asp` paths in the handoff came
from live-UI observation, not documentation — they cannot be corpus-verified, now or later.

**3. `Invoice Admin` is a live alias** for the `Administration > Invoice` node, and several topics
collapse the path and skip `Invoice Processing Admin` entirely. A crawler must accept both.

**4. Invoice Settings has four distinct documented nav paths**, one on an entirely different menu
spine — `Administration > Expense & Invoice Settings > Invoice Settings > Invoice Compliance`.
Two files with the *same title* give irreconcilable paths. That is unmigrated content.

**5. A "New Experience" UI variant exists** (`policies-the-purchase-order-policy-new-experience`,
`purchase-order-matching-rules-new-experience`, and others) and the graph has **no concept of it**.
If the tenant runs New Experience, the Policies layout modelled here may be the legacy one.

### Known defects in this build

**Systematic extractor blind spot — raw HTML tables.** `invoice-settings-cace748d.md` holds a second
Invoice Settings field table whose rows are raw `<table>` HTML rather than markdown pipe tables. It
was never opened. **32 corpus files carry raw `<table>` blocks** — all are at risk in every group
built with this method. Five settings missed there, including
`Allow users to select their own approver for payment requests`, which the corpus states overrides
`Editable By Group(s)` and `Steps Can Be Added By` on the Edit Workflow page — a cross-page override
the graph has no edge for.

**Invoice Settings is ~40% covered, not "good".** The canonical table has 24 rows; 13 survived.
Eleven were killed by the verifier, not missed by search. Coverage on that page should be read as
`partial` despite the recorded value.

**Over-zealous drops.** Also missing on Policies: `Exclude Attendee Types` (an enumerated Add /
Modify (#) control), `Default Attendee Type`, `Require PO Matching?`, and the `Save` commit control
on the Modify Policy General page — all documented with quotable text in files no extractor cited.

**Dual-homed fields.** The seven attendee check boxes are modelled as Policies fields but every quote
was lifted from the Expense Types page, where the labels differ ("Add New Attendees button" vs
"New Attendee button"). They need Expense-Types-primary modelling with a Policies alias.

### Undetermined by the documentation (ranked)

1. **Auto Submit Conditions editor (Policies)** — corpus gives `Insert`, `Apply Auto Submit to Assignment`, `Save` and nothing else. No operators, no operands. A writer cannot author a condition from this graph.
2. **Purchase Request Configuration group (Policies)** — named as existing, not one field enumerated. Probably 3–5 unknown fields.
3. **Group Configurations columns beyond Policies** — confirm which of payment types, audit rules, car configurations, receipt limits, payment hold configurations, email reminders actually render as columns with Modify links. Payment Types especially: mandatory for group creation, no field table anywhere.
4. **`Require PO Matching?` vs `Is PO Policy?`** — two labels, two files, possibly one control. Determines whether step `g1-s2` order 4 is correct.
5. **`PO Receipt From`** — one bare bullet, no description; almost certainly `PO Receipt Form`.
6. **`Can request a new vendor?`** — only `Yes` is ever written. Confirm Yes/No vs a three-value list.
7. **`Default shipping terms` / `Default shipping method`** — control type undetermined; no carrier codes enumerated.
8. **`Timestamp Configuration`** — only `Japan e-Bunsho` ever named. Is that the whole list?
9. **Vendor banking per-role selectors (Group Configurations)** — values enumerated, *which roles* get a selector is not.
10. **Purchase Request Settings (3 settings)** — no nav path anywhere. Own page, or part of Invoice Settings?
11. **`Enable Manage Vendors Link for Invoice User`** — inverted polarity: selecting "Enable" *suppresses* the link. Its sibling topic is titled `[Delete] ...` with an empty body — verify it still exists.
12. **Policies commit control** — wizard ends "Select Done", Modify path ends "Select Save". Confirm both.
13. **`Editable By Group(s)`** — typed `multiselect` on no textual warrant; likely a hierarchy tree picker.

### Label drift to carry as aliases

- `Group Configuration` (guide title, singular) vs `Group Configurations` (page, plural) vs `Group Configurations List page`
- `Modify Policy page` — a construction; the corpus calls it **the General page**
- `Policies` is misspelled **`Polices`** in `configure-concur-receiving-1ececc23.md` — a matcher must tolerate it
- `Payment Request` → `Invoice` terminology is half-migrated: labels say "Payment Request", prose says "invoice"
- `Administration >Invoice` (missing space) appears 3× vs `Administration > Invoice` 4× — broke at least one exact-substring match in this build

### Next

Group 2 remainder (Routing Configuration, Audit Rules, Exceptions). Before it runs, the extractor
prompt needs an explicit instruction to read raw `<table>` HTML blocks, and the refuter needs
calibration against the 11 over-dropped Invoice Settings rows.

---

## 2026-08-31 — Group 2 (remainder): Routing & Approval

**Pages:** Routing Configuration · Audit Rules · Exceptions  *(Workflows deferred — it was in the lost slice)*
**Cost:** 1,646,818 subagent tokens · 230 tool calls · 28min · 19/19 agents, 0 errors
**vs Group 1:** −27% tokens, −49% tool calls, −41% wall clock. Extraction, Map and grounding ran on
`sonnet`; the adversarial refuter, both synthesis agents and the critic ran on `opus`
(critic at `xhigh`). Moving the cheap work down a tier cost nothing measurable in quality.

### Node counts

| | This group | Cumulative |
|---|---|---|
| ConfigPage | 3 | 6 |
| ConfigField | 54 (28 dropped of 82) | 133 |
| ConfigDependency | 32 (of 53 candidates) | 113 |
| ConfigStep | 4 | 8 |

Per page: Audit Rules 36/50 · Routing Configuration 10/16 · Exceptions 8/16.
Only **8** unresolved dependency endpoints this group, down from 58 in Group 1 — most Group 2
edges land inside the group.

### MECHANICAL BUG FOUND — the pipeline cannot repair, only delete

The verification stage has two outcomes: keep or drop. It has no third outcome for *"this field is
real but its quote needs trimming"* or *"real field, defective validValues — empty the array."*
The refuter wrote exactly those verdicts and the fields were **deleted anyway**:

- **`Exceptions.exceptionLevel`** — refuter verbatim: *"KEEP the field - it is row 2 of the same
  canonical settings table, quote byte-exact… validValues is DEFECTIVE and must be emptied."*
  Dropped. The Exceptions page now has no severity control — on the page whose entire purpose is
  defining severity. The corpus is unambiguous: *"Exception Level | Type any number between 0 and 99."*
- **`Audit Rules.ValidationAction`** — refuter verbatim: *"Field is real… all three values are
  bulleted verbatim — KEEP. But the quote is NOT a contiguous substring… Fix by trimming."*
  Dropped. This is the branch point of an entire ConfigStep; the step now names
  `"(no field written — action-type selection)"`.
- **`operatorQuantifier`** (ANY/EVERY) — borderline. Label was invented, but the semantics are real
  and generalizing. Correct disposition was a note on `ConditionOperator`, not deletion.

The critic's read: the Group 1 over-drop *bias* did not persist — the ~15 other drops are sound.
This is a different, mechanical failure and **it will recur on every group until fixed.**

**Fix before Group 4:** add a `disposition` enum (`keep` / `repair` / `drop`) plus
`repairInstruction` to the verdict schema, and a Repair phase that re-extracts a correctly grounded
quote for anything marked `repair`, then re-runs grounding on the result.

### Raw-HTML-table fix: UNTESTED, and the flag is unreliable

The regression could not fire here. Zero of Group 2's source files contain a raw `<table>` block —
186 files corpus-wide have one, 31 in admin-guides, **none** belonging to these three pages.

Worse, of the 5 fields flagged `fromRawHtmlTable: true`, **4 are false positives** (verified: the
cited files contain no `<table` or `<td` at all). The one true recovery was then correctly dropped
as belonging to Invoice Settings. **Net contribution of the fix to Group 2: zero.** Do not read
"5 recovered" as evidence the fix works. Treat the flag as unvalidated until a group whose pages
actually use HTML tables runs — Group 5 (Data Structure & Accounting) is the likely test.

### Biggest content gap — the Audit Rules Condition Editor is half-built

`the-condition-page-5d4ea870.md` carries an 8-column condition editor. The graph has columns A, C,
D, F, H and is missing:
- **Data Object (column B)** — 10 enumerated values (Attendee Totals, Budget, Detail, Detail
  Allocation, Employee, Line Item Attendee, Request, Request Exception, Vendor Remittance, Vendor
  Ship From). This is the column that gates every other column. The refuter killed it and wrote
  "re-extract once from this file" — nothing acted on that instruction (see the mechanical bug above).
- **Data Object (column E)** and **Right Parenthesis (column G)** — `ConditionLeftParenthesis`
  survived; its mirror did not.
- **Table 2 — the per-data-object Field/Value catalog**, roughly **250 enumerated field names**
  across 10+ objects (Request 60+, Employee ~30, Detail 22, Purchase Request 25, Purchase Request
  Item 21, Budget 15, Line Item Attendee 13, …). **Entirely untouched.** Single largest body of
  enumerable structural knowledge on the page, absent from the graph.
- Three hard constraints from `understand-conditional-expressions-9a165c46.md` with no
  representation: max three parentheses per side and counts must match; *"If the parentheses are
  omitted, and/or operations are carried out left to right. There is no precedence of and over or"*;
  and the ANY/EVERY operator qualification.

**`validation-conditional-expressions-67302876.md` is completely unrepresented** — it documents two
data objects that exist *only* on the Validation tab (Field Validation, List Validation) plus
constraints that silently break a rule (Type and Id 01 mandatory; only the equal operator against
Id/Type columns; Id fields must be used in numeric order 1..n; Detail Allocation only on the
right-hand side). The ConfigStep "Author a Validation Rule that corrects a field" currently reuses
Custom-tab condition fields wholesale, which is **wrong for validation rules**.

Also missing on Audit Rules: the Random tab's numeric input (bounds *are* documented — max 100%,
max 999,999), `RandomExceptionVisibility`, and 5 list-level controls (Modify, Delete Selected Rows,
the rule-name view link, Remove on Random, Remove on Validation).

### Mis-assignment

`ExceptionLevel`, `ExceptionCode_New`, `ExceptionMessage`, `ExceptionEditableByGroups` are all
sourced from the **Exceptions** page's field table but assigned to **Audit Rules**, on the
reasoning that the New Exception dialog opens from the wizard. Defensible, but combined with the
wrongly-dropped `Exceptions.exceptionLevel` it leaves the owning page with none of its own four
severity rows. Restore on Exceptions; mark the Audit Rules copies as inline-dialog instances.

### Navigation findings

- **Exceptions is a hub, not a leaf.** *"All exceptions created in the Exceptions page appear as
  options for the Audit Rules tool and Workflows tool when creating rules."* Model it as a shared
  dependency feeding two consumers.
- **Audit Rules is one page with three tabs** — Custom / Validation / Random. "Validation Rules" is
  filed under the alias *"Audit Rules (Validation Rules)"*; do not create a separate node for it.
- **Audit Rules absorbed new scope in 2026** (PO transmit / save-blocking events) with no page
  rename and no new URL — same page, expanded event catalog.
- **Routing Configuration is two screens** under one menu entry: Hierarchy Mapping List (landing)
  and Import Hierarchy Mappings.
- **Search trap:** *"Configuring: Exception Email Address and Instruction Text Options"* is a
  **Capture Processing** setting, not the Exceptions admin page. Do not conflate on the word
  "exception."

### New Experience — now confirmed and explicit

Group 1 flagged this as a risk; Group 2 confirms SAP bifurcates deliberately.
`configure-custom-audit-rules-new-ui-3cc2360e.md` and `configure-custom-audit-rules-legacy-ui-6cb4534e.md`
are sibling section parents, **both `version: 2026_08`**. Substantive differences:

- **Create vs New** — legacy: *"On the Custom Rules page, select Create"*; new: *"On the Custom
  page, select New"*.
- **View is a different interaction entirely** — legacy re-enters the wizard (Next/Finish); new
  opens *"the Quick View panel… on the right side of the page"*. The graph captures neither.
- copy / edit / delete / deactivate pairs are byte-identical — no drift there.

Tab naming is unstable across all of it: "Custom page", "Custom tab", "Custom Rules page",
"Custom Rules tab", "Custom Audit Rule List page" all appear in 2026_08.

### Undetermined by the documentation (ranked)

1. **Custom tab Event dropdown: 6 values or 18?** The field table lists 6; the reference topic
   `events-triggers-72339a13.md` lists 18 *for custom audit rules*, adding all the PO/PR events.
   The corpus contradicts itself and hedges with "for example". The graph committed to 6. If the
   real dropdown has 18, every PO/PR audit rule is unreachable through this graph. **Open the dropdown.**
2. **Data Object list per event** — Table 1 says the list *"is based on the event that triggers the
   rule"* and never gives the mapping. One screenshot per event.
3. **Legacy UI vs New UI on the Custom tab** — decides Create vs New, wizard vs Quick View panel.
4. **Rule Type window's numeric input** — bounds documented, widget never named or typed.
5. **Random tab's Applies To** — does it carry an Inherited/Not Inherited toggle? Two topics disagree.
6. **Exception Visibility label wording** — three competing strings in the corpus; the graph carries
   all three as separate value sets.
7. **Routing Configuration Actions menu** — only `View Import Details` documented. Confirm there is
   genuinely no UI path to delete a single mapping (corpus implies only the import Delete? flag).
8. **Exceptions page list columns and whether a Copy control exists** — the corpus repeatedly says
   lower-level admins *"can copy this exception"* but never documents a Copy button.

### Next

Group 4 (Capture & Vendors). Ship the Repair phase first — it is now the highest-value change to
the method, and Group 2 lost at least two real fields to its absence.

---

## 2026-08-31 — Group 4: Capture & Vendors

**Pages:** Capture Processing Admin · Vendor Search Admin · Image Handling · Units Of Measure
**Cost:** 2,158,659 subagent tokens · 318 tool calls · 26min · 27/27 agents, 0 errors
**New this run:** the **Repair phase** — a three-way `keep`/`repair`/`drop` disposition replacing
the keep/drop binary that silently deleted two real fields in Group 2.

### Node counts

| | This group | Cumulative |
|---|---|---|
| ConfigPage | 4 | 10 |
| ConfigField | 60 (13 salvaged by Repair) | 193 |
| ConfigDependency | 51 | 164 |
| ConfigStep | 4 | 12 |

Per page: Capture Processing Admin 32 (26 clean + 6 repaired) · Image Handling 23 (18+5) ·
Units Of Measure 3 · Vendor Search Admin 2 (0 clean + **2 repaired**).

### The Repair phase works — verdict: keep it

**13 of 13 attempted repairs succeeded**, every one with its new quote proven by `grep -F` before
acceptance. The critic re-checked all 13 against the cited files and found **no over-admission** —
repair did not become a back door for weak fields. Two examples of it working as designed:

- `enable_vendor_segregation` — repair correctly *narrowed* validValues to `Yes` alone, because
  the corpus only ever writes *"select Yes from the Enable Vendor Segregation list"*. Restraint,
  not invention.
- `timestampStatus` — all six values verified exact, including the odd-looking
  `Timestamp: NotRequested`, which the critic suspected was a label bleed and confirmed is real.

**Vendor Search Admin would have had zero fields without Repair.** Both survivors came through it.
Under the Group 2 pipeline that page would have entered the graph empty.

### Raw-HTML-table fix — tested at last, and it parses correctly

Group 4 is the first group whose pages actually use raw HTML tables. Exactly two files in scope:

| File | Outcome |
|---|---|
| `admin-guides/configuring-forms-and-fields-in-capture-processing-7c14446c.md` | **captured** — the header and line-item captured-field catalogs are in the graph |
| `tools-guides/what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md` | **missed** |

**The parser works; discovery is the weak link.** The missed file was never opened — it lives in
`tools-guides`, and the search skewed to `admin-guides`. The `fromRawHtmlTable` flag is now also
trustworthy: the critic re-ran `grep -c '<table'` on every flagged file and **all flags were
accurate**, including correct `0`s. That is a clean reversal of Group 2, where 4 of 5 were false.

**Fix for Group 5:** search both guide directories with equal weight. Group 5 (Data Structure &
Accounting) is the largest group and the most table-heavy — this matters most there.

### New defect — a missing verdict drops a field with no judgment recorded

`requireHardcopyReceipts` was dropped with `"refuter": "no verdict"`. The fail-closed rule
(no verdict ⇒ drop) is correct as a safety default, but it discards the field **without any
judgment having been made**, and nothing surfaces that difference. The field is real:
*"On the Workflow page, admin will see the Require Hardcopy Receipts option"*, and enabling it
exposes the **Hold for Invoice Hard Copy** step. It belongs to **Workflows** — correctly excluded
from Image Handling, but it should have become a cross-page dependency edge instead of vanishing.
The graph currently has **no Workflows edge at all**.

### Corrections applied — `bin/apply-corrections.py`

The critic found `fields[]` and `steps[]` disagreeing about page binding on three records; the
steps were right. Corrected, idempotently and with the justification recorded in each note:

- `eBunshoTimestampConfigurationList` → **Policies** (its own notes opened *"NOT an Image Handling control"*)
- `policyScanConfiguration` → **Policies** (a Modify Policy dropdown populated from Image Handling)
- `uploadImageSessionLimit` → flagged as an end-user runtime constraint, not admin config; retained
  because a crawler needs the constraint

Re-run this script after any merge — merges rebuild nodes from raw results and drop the fixes.

### Coverage findings

- **Vendor Search Admin is genuinely thin, and that is the corpus's fault, not ours.** The phrase
  *"Vendor Search Admin"* appears in **exactly two files corpus-wide**, both in `tools-guides`.
  **Zero** admin-guide topics document this page. Two fields is close to exhaustive. The field
  picker, the add/remove widget, and the available-field catalog are not documented anywhere
  in the corpus. Structurally undetermined.
- **Capture Processing Admin has five tabs** — Forms and Fields (default landing), Task
  Definitions, Email Administration, Supplier Email Administration, Other Settings.
- **Image Handling is not one self-contained screen.** Tabs: Invoice Imaging, Vendor Imaging, Scan
  Configurations. Its Scan Configuration function reaches into **Policies** and **Workflows**, and
  vendor-side imaging setup lives on a separate page, **Vendor Handling** — a page absent from the
  reconstructed 37-page map entirely.
- **Units Of Measure** is a flat grid; the unit name/identifier control is missing from the corpus.
  It is one of the few pages naming the **Restricted** admin role variant alongside Unrestricted.
- **No New Experience variant exists for any Group 4 page** — checked; the `new-ui`/`legacy-ui`/
  "New Experience" greps return nothing for all four.

### Undetermined by the documentation (ranked)

1. **Vendor Search Admin** — the field picker and available-field catalog. Best return in the group.
2. **Units Of Measure** — the unit name/identifier control; confirm soft-delete behaviour.
3. **Capture Processing Admin → Task Definitions tab** — thinnest of the five tabs.
4. **Image Handling → Vendor Imaging tab** vs the separate **Vendor Handling** page — are these two
   surfaces or one?

### Next

Audit Rules deep-dive (condition editor + ConfigValueSets + both UI variants), then the New
Experience retrofit, then Group 5.

---

## 2026-08-31 — Audit Rules deep-dive (patch to Group 2)

**Why:** the Group 2 build left this page half-built, and it is one of the highest-value config
surfaces in Concur Invoice. Run as an exhaustive single-page rebuild, not a breadth-first sweep.
**Cost:** 2,359,469 subagent tokens · 316 tool calls · 30min · 29 agents, 1 errored.

### Result

| | Before | After |
|---|---|---|
| Audit Rules ConfigField | 36 | **91** |
| ConfigValueSet | 0 | **13, carrying 278 enumerated values** |
| ConfigStep | 1 | 5 |

Graph total: **10 pages · 248 fields · 221 dependencies · 17 steps · 13 value sets.**

### The catalog is in — verified string by string, not by count

The headline miss from Group 2 is closed. The critic counted `the-condition-page-5d4ea870.md`
itself and compared against what was captured:

**13 of 13 data objects, 278 of 278 field names, count-exact, zero truncation.**
Attendee Totals 4 · Budget 15 · Detail 21 · Detail Allocation 5 · Employee 26 · Line Item
Attendee 13 · Purchase Request 24 · PR Distribution 3 · PR Item 21 · Request 97 ·
Request Exception 2 · Vendor Remittance Address 29 · Vendor Ship From Address 18.

The critic correctly refused to certify this on counts alone — it was shown only per-set sizes and
warned the strings themselves might not be stored, *"the headline deliverable still not delivered,
just failing a layer deeper."* Checked directly against the graph: **all 278 literal strings are
present**, zero empty or placeholder. The suspicion was an artifact of the summary it was given.

### Condition editor: all 8 columns

A Left Parenthesis · **B Data Object** (10 values, exact) · C Field/Value · D Operator ·
E Data Object (empty — correct, the corpus does not enumerate E) · F Field/Value ·
**G Right Parenthesis** · H And/Or. B was the column gating every other column; it is now present
and correctly gated.

The B-vs-Table-2 mismatch was **recorded, not silently reconciled** — Table 2 carries three
Purchase Request objects absent from B's list of 10, and B says "Vendor Remittance" where Table 2
says "Vendor Remittance Address". Correct call: that discrepancy is a live-UI question.

### Validation semantics: 0% → 100%

`validation-conditional-expressions-67302876.md` went from completely unrepresented to fully
represented — all four hard constraints (Type + Id 01 required; equal-operator-only against
Id/Type/Detail Allocation; Id fields in numeric order 1→n; Detail Allocation right-hand-side only),
both Validation-only data objects, the List Validation Helper pane, and the worked AND example.

### Random tab and list controls: present

`RandomPercentage` (max 100 %) and `RandomSequentialCount` (max 999,999), both typed `number`,
both gated on `RandomRuleType`, maxima quoted verbatim. All five missing list controls recovered,
with the Custom-has-no-confirmation / Validation-has-one asymmetry flagged.

### The missing-verdict fix earned its keep

One agent failed outright (structured-output retry cap). **Zero fields were dropped across all
seven extraction areas** — because a missing verdict now routes to Repair instead of silently
deleting, which is exactly the Group 4 failure this run was built to close. Several areas came
back almost entirely repaired (ui-variants 29 of 29, validation-semantics 14 of 15); under the
Group 2 pipeline those fields would simply have vanished.

### Corrections applied after merge

- **Value sets were unwired.** All 13 carried `appliesToField: "Field/Value"` — the column's
  *label*, not any field's name — so every set resolved to `null`. A perfect catalog attached to
  nothing. Now wired to `condition_field_value_left` (canonical) with `alsoAppliesToFieldId`
  pointing at the column F twin.
- **`rule_name_link` collided on name** across its legacy and new records (unique ids, same name).
  A consumer keying on name silently loses one. Renamed to `rule_name_link_legacy` / `_new`.
- **Patch-mode bug:** the first patch left 36 stale Group 2 fields behind (127 instead of 91),
  because patch cleared by origin group while the stale fields belonged to the group build. Patch
  now clears fields that live on a rebuilt page AND originate from that group or a prior patch of
  it — while preserving anything re-homed there from a different group.

### Still open on this page

- **~23 alias duplicates.** 91 entries encode roughly 68 real controls; the condition editor is
  encoded three times over across extraction areas (`condition_field_value_left` vs `field_value`
  vs `ConditionFieldValue`). Needs an alias-collapse pass — a consumer currently sees three
  controls where the UI has one.
- **15 of the 278 bullets are compressed ranges** ("Custom 01 - 20", "Org Unit 1 - 6"). Expanded,
  the catalog is **492 field names**, not 278. Nothing in the graph records that ranges expand.
- **Three `uiVariant: both` claims are unearned** — notably `custom_audit_rule_event`, whose 17
  values come from a single-variant source.
- **Event count settled at 17, not 6 or 18.** Three separate events-triggers files exist: custom
  (17 events), validation, and random (2 events only). The 6-value list in the Add topic is a
  subset. Still a live-UI confirmation item.

### Next

New Experience retrofit, then Group 5 (Data Structure & Accounting — largest and most table-heavy).

---

## 2026-08-31 — Group 5A: Expense Types · Forms and Fields · Accounting Administration · Map Invoice Concept Fields

**Cost:** 2,370,992 subagent tokens · 365 tool calls · 39min · 25/25 agents, 0 errors.
Group 5 was split in two; 5B covers Tax Administration, Budget Configuration, List Management,
Company Locations.

### Node counts

| | This run | Cumulative |
|---|---|---|
| ConfigPage | 4 | 14 |
| ConfigField | 89 (40 salvaged by Repair) | 337 |
| ConfigDependency | 57 | 278 |
| ConfigStep | 5 | 22 |
| ConfigValueSet | 18 (137 values) | 30 (410 values) |

Per page: Forms and Fields 40 · Expense Types 31 · Accounting Administration 18 ·
**Map Invoice Concept Fields 0 — thin, no quotable fields.**

### Headline structural finding — "Forms and Fields" is TWO pages

The corpus documents two structurally distinct pages under one label:

1. **Invoice Processing Admin > Forms and Fields** — the full field-modification tool (Form Type
   selector, Fields tab, Form Fields tab, Modify Field windows). Role: Invoice Configuration
   administrator.
2. **Capture Processing Admin > Forms and Fields tab** — a tab inside a different tool, scoped to
   OCR/verification form setup. Role: Invoice Configuration administrator **(Unrestricted)** —
   explicitly the stricter variant.

Different parent nav, different role gate, different fields. They must never be collapsed into one
node. Group 4 built (2); this run built (1).

### Cross-check: the same catalog extracted twice, independently

Group 4 captured the Capture Processing "Fields Supported for Capture" catalog from a raw `<table>`
as validValues; Group 5A re-extracted it independently as value sets. **Both runs produced 11
header and 8 line-item entries.** Independent agreement on a raw-HTML catalog, from two different
runs and prompts. The duplicate sets were re-pointed at the existing Group 4 fields rather than
creating rival nodes.

### Validator results after merge

`bin/validate-graph.py` — deterministic, no model in the loop:

- **337/337 sourceQuotes verify verbatim** against their cited corpus file.
- **336/337 validValue lists** fully found in source.
- **Zero dangling dependency endpoints.**
- 217 endpoints await an unbuilt page (Workflows, PO Matching, and the Group 5B pages) — expected.

**17 value sets landed unwired** — the same failure as the Audit Rules run, despite the schema
saying so explicitly: extractors write the field's LABEL ("Data Type") where the schema wants its
name ("dataType"). Fixed generically rather than by hand — `wire_by_name()` matches on a
normalised name, preferring a field on the same page, and refuses ambiguous matches. 13 wired
automatically. Of the remaining four:

- 2 were the duplicate capture catalogs above → re-pointed to the Group 4 fields.
- 1 was **"Forms and Fields page tabs"** — not a field at all. Promoted to a `tabs` property on the
  ConfigPage (Forms · Form Fields · Fields · Connected Lists · Validations) and the set removed.
- 1 is a **genuine accepted gap**: `Copy Down from Purchase Order if available` is documented with
  enumerated options ("Yes" / "No (Default)") but no extractor emitted it as a ConfigField, so the
  set has no owner. Left unwired deliberately — wiring it to a neighbour would be worse than an
  honest null — and marked `knownGap` so the validator reports it as an accepted gap rather than
  masking a fresh regression. Emit the field in the Group 5 remediation pass.

**Graph is ERROR-clean.**

### Method defect found — Repair can ADD fields

Expense Types logged `repair recovered 17/14` — the Repair agent returned **more records than it
was given**, splitting some inputs into several fields (an attendee checkbox block became
individual checkboxes). All 17 carry a grep-verified quote, so nothing unfounded entered the graph.

But it is still a hole in the gate: **fields created during Repair are grounded mechanically and
never seen by the adversarial refuter.** They could be real controls assigned to the wrong page —
the one failure mode grep cannot catch. For Group 5B the Repair prompt is constrained to return at
most one record per input, and any genuine split must be reported separately for refutation.

### Coverage notes

- **Map Invoice Concept Fields is thin** — no quotable field-level documentation was found.
  Recorded as thin rather than padded.
- **Expense Types** is a 3-step wizard (General · Policies · Attendees), not a tabbed page, and it
  carries the ~50-entry **Available Spend Categories** catalog.
- **Accounting Administration** has an Account Codes tab (default landing) and an Accounting
  Structure tab, with per-ledger "Modify Hierarchy" opening an Account Code Hierarchy page.
- Several Expense Types topics exist as near-identical duplicate pairs. These are legacy/rewrite
  duplicates of the same UI, **not** a legacy/New Experience split — no New Experience language
  appears on any of them. Correctly recorded as `undifferentiated`.

### Next

Group 5B (Tax Administration, Budget Configuration, List Management, Company Locations), with the
Repair-expansion constraint in place.

---

## 2026-08-31 — Group 5B: Tax Administration · Budget Configuration · List Management · Company Locations

**Cost:** 4,056,139 subagent tokens · 890 tool calls · 80min · 29/29 agents, 0 errors.
Merged with `--patch` (`patchPage: "Group 5B"`), so Group 5A's four pages and its `dep.g5.*` ids
are untouched; 5B's own ids namespace to `g5g5`.

### Node counts

| | This run | Cumulative |
|---|---|---|
| ConfigPage | 4 | 18 |
| ConfigField | 100 | 437 |
| ConfigDependency | 57 | 335 |
| ConfigStep | 6 | 28 |
| ConfigValueSet | 24 (339 values) | 54 (749 values) |

Per page: **Tax Administration 59 · Company Locations 27 · List Management 14 ·
Budget Configuration 0.**

### Method change — agents write artefacts, the assembler reads them

Through 5A, every field record travelled agent-to-agent inside prompts and the whole ~300KB slice
came back as the workflow's return value. From 5B the agents write their own JSON to a parts
directory and return a small receipt; a new deterministic script, **`bin/assemble-parts.py`**,
composes the raw result from those files. No model retypes a quote, so a quote cannot stop being
verbatim in transit. The script also runs a **pre-merge check** — quotes verbatim, duplicate names
per page, value-set wiring, dependency endpoints, `fromRawHtmlTable` flags, node-id collisions — so
defects surface before the merge rather than after it.

Structural improvements in the same pass, all aimed at named 5A defects:

- **Two perspective-diverse refuters** instead of two identical ones: refuter 1 attacks grounding
  (quote, values, type, truncation), refuter 2 attacks **page ownership, cross-page name collision
  and admin-vs-end-user scope**. That second axis is where 5A actually lost accuracy, and it is the
  one failure mode `grep` cannot catch.
- **The three-way disposition is computed in code, not by a model.** No verdict, a partial verdict
  set, or two refuters disagreeing all route to Repair. Only a unanimous drop drops.
- **Value sets, dependencies and steps are synthesised against the final field rosters**, so
  `appliesToField` is checked against a real field `name` before it is emitted.

### Repair discipline — the "Repair can ADD fields" hole is closed

The 5A defect (Expense Types returned 17 records from 14 inputs) did not recur. The constraint held
exactly, and the correctness critic verified it independently:

```
Tax Administration    98 extracted = 59 kept + 39 dropped   LOST 0
Company Locations     65 extracted = 27 kept + 38 dropped   LOST 0
List Management       22 extracted = 14 kept +  8 dropped   LOST 0
```

**Zero roster names absent from the extract union** — nothing was created during Repair, so nothing
entered the graph unrefuted. Seven genuine splits were detected (`buttonNew` really is six controls
across six tabs) and reported in `splitsProposed` rather than emitted.

### The biggest find was a hole in the plumbing, not in the reading

Both critics independently ranked the same defect first. The synthesiser correctly **refused to
wire 14 enumerations** to any Group 5B field — the 249-row country-code catalog is scoped by the
corpus to the vendor import file, the 27-row Available VAT Fields and 12-row Prorated VAT catalogs
belong to Forms and Fields. That refusal is right: a wrong owner is worse than an honest null.

But `merge-group.py` reads only `valueSets`, and nothing anywhere read `orphanCandidates`. **323 of
339 enumerated values would have been silently deleted** — the same class of loss that cost a
dedicated 2.36M-token re-run once already, one stage later in the pipeline.

Fixed at the plumbing, not by forcing owners: orphans now land as `knownGap` value sets carrying
their `whyNoOwner` and `whatWouldFixIt`, using the accepted-gap mechanism `validate-graph.py`
already demotes from ERROR to WARN. Value sets went **10 sets / 16 values → 24 sets / 339 values**.

### Critic-driven corrections applied before merge

Every claim below was re-verified independently before acting on it.

| Fix | Evidence |
|---|---|
| 14 orphan catalogs landed as `knownGap` sets (+323 values) | `merge-group.py` had no reader for `orphanCandidates` |
| **Deleted** edge `turnOnTaxValidation → Exceptions::exceptionCode` | cited file has 0 hits for "Turn On Tax Validation" and 0 for "Tax Administration" — it documents CFDi validation, a different feature |
| **Deleted** edge `Forms and Fields::formType → taxAuthorityName` | cited file has 0 hits for "tax authority"; the real edge already exists, sourced from `the-basic-process-12a5686d.md` |
| **Added** `expenseTypeGroupUnavailableExpenseTypes depends_on expenseTypeGroupTaxAuthorityFilter` | step-5 and step-6 carry the same rule verbatim but were modelled with different shapes; quote `grep -F` verified |
| **Added** `taxRateTaxPercent depends_on taxRateRateType` | *"Once you select the type, the Tax Percent field appears."* — a field that does not exist until another is set, which a crawler must know |
| Page nodes now carry `documentedBasis`, `verifyNotes`, `roleGates`, `aliases`, `identityNotes` | a bare `{name, url, coverage: thin}` node is indistinguishable from a lazy miss — the exact charge the 5A critic laid against Map Invoice Concept Fields |
| Corrected a dangling `duplicateOf` in the Company Locations drop log | pointed at a field that was itself dropped, mislabelling an ownership refutation as a dedupe |

### Budget Configuration — thin is the answer, and the node now says why

`documentedBasis: none`. Across all 2,230 corpus files the literal strings "Budget Configuration",
"budgetConfiguration", "Budget Admin", "Budget Item", "Budget Category", "Budget Period" and others
return **zero files**. `budget-approval-59251c3b.md` is 27 lines with no procedure, no field and no
nav path, and points outward: *"refer to the Shared: Budget Setup Guide"* — a guide that is not in
this corpus, which is Concur Invoice Professional Edition only.

Both critics re-proved this independently. The build correctly **refused to re-home** the Audit
Rules `Budget` data object (Budget Amount / Name / Remaining Amount / Type) or the
`Payment Request Budget Submit` workflow event onto this page.

The node merges with a 7,787-character `verifyNotes` recording the searches run and their zero
results. That is the difference between a documented negative finding and an empty node.

### Validator results after merge

`bin/validate-graph.py` — deterministic, no model:

- **437/437 sourceQuotes verify verbatim.** 100/100 of the new ones.
- 436/437 validValue lists fully found in source (the one miss is pre-existing).
- **ERROR: none.** Exit 0.
- Warnings 140 → 155. The entire delta is the 14 deliberate `knownGap` sets plus 2 self-disclosed
  encodings (the country catalog encodes `<Code> — <COUNTRY>`, and the `Level 1 Code - Level 10
  Code` range is expanded; both say so in their own notes). **No new warning class from 5B.**
- `step-references-unbuilt-page` fell 108 → 107: a pre-existing step referenced a page 5B built.

### Coverage findings

- **Tax Administration is one page with five tabs** — Tax Authorities, Expense Type Groups, Vendor
  Groups, Tax Code, Tax Validation — plus a multi-step New Tax Authority wizard (General · Tax Rate
  Types · Tax Rates). 59 fields, `good`.
- **Tax Administration is documented ONLY in admin-guides.** The tools-guides sweep for tax
  authority / administration / administrator / validation / code / expense type group / vendor group
  returned nothing but unrelated vendor-access and CFDi topics. Recorded as a published negative
  rather than forced to improve the tools-citation ratio.
- **Company Locations is the mirror image** — documented mostly in **tools-guides**, exactly the
  skew that nearly lost Vendor Search Admin. Two tabs (Ship To / Bill To), a 12-field address form
  captured 12/12 in source order with every `(Required)`/`(Optional)` marker preserved.
- **The List Management / Connected Lists boundary held.** Connected list *definitions* are authored
  on Forms and Fields (Group 5A); List Management owns list *categories, items and data*. Candidates
  falling on the Forms-and-Fields side were dropped with `correctPage` set, not absorbed.
- **22 PO-import columns were correctly refused** on Company Locations — `grep -c "Company Locations"`
  is 0 in both record-format files, whose parent is the purchase-order import specification. This is
  precisely 5A's "seven import fields filed under the wrong page" defect, and it did not recur.
- Zero raw `<table>` elements in any file these four pages own — verified by census over both guide
  directories, so `fromRawHtmlTable: false` on all 100 records is a measured fact, not a default.
- Zero `uiVariant: both` claims. No new-experience or legacy topic touches any of these four pages.

### Undetermined by the documentation (ranked)

1. **Is Canada supported for VAT?** `supported-countries-for-vat-8b38bab8.md` excludes the US,
   Canada and India; `canada-de22c9f9.md` and `implementation-best-practices-8b39ab5d.md` publish
   complete four-field and two-field Canadian implementations; `overview-8b38e2f7.md` adds a third
   framing. Almost certainly provisioning-dependent (Tax Authority calculation vs VAT field capture).
2. **Does predefining a tax code make all four VAT Tax Code fields lists, or only field 1?**
   `configure-predefined-tax-codes-6b42509f.md` says "the tax code fields (1-4)";
   `step-7-...-be8bc5b8.md` says "the VAT Tax Code 1 field". Same `deliverable_id`, identical steps.
3. **The Tax Validation tab has two parallel label sets** in two topics (Partner Account Number /
   Tax Validation Type / Level, versus Unique Tax Partner Number / Request Type to be Analyzed /
   Form Level to Be Analyzed). Both recorded as parallel fields with parallel value sets.
4. **Where is the Invoice Tax Administrator role assigned?** Two nav paths in two same-titled files.
5. **How do you modify or delete anything on Tax Administration?** The corpus documents how to
   *create* a tax authority, rate type, rate, tax code and both group types — and never once
   documents modify or delete. For an automation that is a first-class fact.
6. **The Company Locations import template columns are never enumerated** anywhere in the corpus,
   though the revision history confirms Country and State/Province are among them.
7. **Is the vendor-group Tax Type list closed?** The source ends it with "etc.", so no. Three values
   recorded with the openness disclosed.

### Debt this run created or confirmed

1. **`contradictions` and `compressedRanges` have no node type.** The extracts hold 47 structured
   contradiction records and 15 compressed ranges; roughly 8 of the 47 survive into the graph only
   because an agent hand-copied them into a field's `notes`. The brief's core instruction — *record
   both and state the contradiction* — has nowhere to land. **This is the highest-value schema gap.**
2. **Four unread admin-guides files named by the completeness critic**, chiefly
   `implementation-best-practices-8b39ab5d.md` (66 lines, 31 tax/VAT hits). It is the admin-guides
   twin of `canada-de22c9f9.md`, which means the "the contradicting evidence lives only in
   tools-guides" framing in this build's own extract headline is **wrong** — the contradiction is
   internal to admin-guides. Corrected here; the underlying fields were not re-extracted.
3. **Named controls found but not emitted:** `Calculated Tax Amount`, `Tax Rate`,
   `(Optional) Tax Reference ID` (`step-4-additional-configuration-steps-37f6c7ba.md`) and
   `Vendor includes VAT in the Unit Price` (`...-9eebdaa0.md`). Additions must face the refuter, so
   these are a remediation pass, not an edit.
4. **Zero role-gate dependencies** among 57 edges, against the graph's own precedent
   (`dep.g1.033/034/055/056` model role gates as `precedes` edges into `User Permissions`). Three
   documented gates went unmodelled.
5. **Six dependency endpoints name pages on no build list** — Vendor Manager, Employee Import,
   Feature Hierarchies, Vendor Employee Access Import, Check Configurations. Two are import file
   specs, not admin pages. Decide whether they become pages or the edges become notes.
6. **`vset.g5.fields-supported-for-capture-header-fields` is short a row.** The tools-guides OCR
   table has 12 header entries including `Vat 2 (Secondary Tax – Canada PST/QST)`; the admin twin
   has 11 and no Vat 2. The graph carries the admin version only. Both were parsed this run; the
   correction has nowhere to land until (1) is fixed.
7. **23 pre-existing `step-references-unknown-field` warnings are all Group 2**, left by the Audit
   Rules deep-dive renaming fields the Group 2 steps still cite. None are 5B's.
8. `A/details-section-49500221.md` — 4,762 lines, **256 data rows**, the largest catalog near this
   domain, correctly not a control on any of these four pages (its home is the unbuilt accounting
   extract / imports page). Logged so a future group does not re-lose it.

### Next

Group 3 — PO Matching, 11 pages, built **new-first**: it has a documented New Experience variant,
and `policies-the-purchase-order-policy-new-experience-*` (15,800 bytes) versus its legacy twin
(1,490) is the trap that damaged Groups 1–2.

---

## 2026-08-31 — Schema pass: ConfigContradiction and ConfigCompressedRange

**Cost:** 1,129,524 subagent tokens · 277 tool calls · 51min · 7 agents (one API failure, recovered
by resume). Run before Group 3 deliberately, because Group 3 is the group most likely to generate
contradictions — it is the one with a documented legacy/New Experience split on both sides.

### The gap this closes

The governing constraint says: *where two topics give different accounts of the same control, record
BOTH and state the contradiction, never reconcile by picking one.* Every extraction prompt carried
it. The build followed it — Group 5B alone produced **47 structured contradiction records and 15
compressed ranges** — and then the merge threw them away, because no node type existed to hold them.
The only ones that reached the graph were those an agent happened to hand-copy into a field's `notes`.

Handoff rule 8 ("note compressed ranges and what they expand to") had the same problem since Group 2.
The consequence is still visible: a Group 4 value set carries the literal string `Vat Amount 1 - 4`
**as one of its values**, with its expansion recorded nowhere.

### Two node types added

**`ConfigContradiction`** — `kind · topic · appliesToRef · readings[] · consequenceForWriter · notes`

- **Each reading carries its own verbatim quote.** A contradiction is a claim about what two
  documents *say*, so it needs two pieces of evidence, not one. Fewer than two grounded readings is
  not a contradiction. The validator treats an unverifiable reading quote as an **ERROR**, exactly as
  it does a field quote.
- **`consequenceForWriter` is load-bearing**, as `rationale` is for a ConfigStep. "The docs disagree"
  is not actionable. What landed reads like: *"Probe the left menu for 'Tax Administration' FIRST;
  only if that finds nothing, retry with 'Tax Administrator'. Do not treat them as coequal."*
- **No `resolution` field and no correct reading, by design.** `appliesToRef` may be null — whether
  Canada is supported for VAT is about the product, not any field. 16 of 24 are deliberately null.

**`ConfigCompressedRange`** — `label · expandsTo[] · count · appliesToRef · sourceQuote · sourceFile · notes`

- `label` is **character-exact**: `Vat Amount 1 - 4` with spaces, `Future Use 1-10` without, `Vat`
  not `VAT`. It has to match what a crawler reads off the screen.
- `expandsTo` is an **enumeration, not a description**; the validator enforces `count == len`.

### Why a grounding pass was needed, not just a merge

The raw records were not node-ready. Their evidence was in prose — `"admin-guides: 'Countries that
are not supported for VAT ... are the US, Canada, India'"` — with a shared `files` list that is
**not positionally aligned** to the readings and often longer than them. That cannot be checked, so
merging it as-is would have violated *no quote, no node*.

A 7-agent run converted them: 3 grounding agents (one per page), 1 dedupe/merge, 2 adversarial
refuters, 1 emit. **47 raw records → 26 merged → 24 contradictions (74 readings) + 10 ranges (62
members).** Every one of the 84 quotes was re-verified with `grep -F` against its own cited file.

### The second refuter earned its cost, and nearly did not run

`verify:reality` — the "do these two readings *genuinely conflict*, or are they compatible?" lens —
**died mid-response on an API connection error.** The first run therefore emitted 24 nodes judged by
the grounding refuter alone. `Workflow({scriptPath, resumeFromRunId})` replayed the three grounding
agents, the merge and the surviving refuter from cache, re-ran the failed agent, and re-emitted.

The delta is the argument for the lens. Same headline count, but **18 of 24 contradictions were
repaired**: six `sourceQuote`s replaced with spans that actually *carry* the claim rather than merely
mentioning the subject, plus readings added and removed (net 76 → 74). Under the combination rule,
7 records where the refuters split keep/drop routed to **repair, never deletion**; only the 2 both
refuters dropped were dropped. Both drops were for the right reason — *"no two readings give
different accounts of the same control"* — one of them a documented absence sitting beside a
differently-scoped catalog, which is complementary, not conflicting.

Had the failure gone unnoticed, 24 nodes would have merged with a third of their quotes not carrying
the disagreement they assert. **A failed agent inside a completed workflow is not a visible failure;
check `agents_error` on every run.**

### What landed

| | Count |
|---|---|
| ConfigContradiction | **24** (74 readings, 2–5 each, 74/74 quotes verbatim) |
| — `label-drift` 11 · `requirement` 5 · `structure` 4 · `cardinality` 2 · `scope` 1 · `option-list` 1 | |
| — attached to a field | 8 |
| — product- or page-level, deliberately unattached | 16 |
| ConfigCompressedRange | **10** (62 enumerated members, 10/10 quotes verbatim) |

**Graph: 18 pages · 437 fields · 335 dependencies · 28 steps · 54 value sets (749 values) ·
24 contradictions · 10 compressed ranges. ERROR-clean, exit 0, warnings unchanged at 155.**

### The blocked correction is now recorded

Group 5B parsed both twins of the OCR capture-fields table and could not record what it found. It is
now `option-list` with three readings: the tools-guides twin carries
`Vat 1 (Primary Tax - Canada GST/HST, Australia GST, US Tax, VAT UK/Japan) **` **and** a separate
`Vat 2 (Secondary Tax – Canada PST/QST) *` row; the admin twin carries
`Vat 1 (Australia GST, US Tax, VAT UK/Japan) *` and **no Vat 2 row at all**. Consequence: enumerate
what the Add Fields dialog actually offers, and do not treat Vat 2's absence as a failure.

### Records that correctly did NOT become nodes

- **Two compressed ranges dropped as ungroundable.** Both cited files that *enumerate* rather than
  compress — `grep -nE '1 ?- ?4|1-4|1 to 4'` returns nothing in either. A range node with nothing
  compressed in the source is not a range; the extractor had composed the label itself.
- **One reading dropped from a surviving record**: the claim was a documented *absence* (an empty
  Format cell), and an absence has no verbatim sentence to quote. Recorded in the record's notes
  instead of being given a quote that would not carry its own disagreement.
- A citation was **corrected**: the `Level 1 Code - Level 10 Code` range cited a file that enumerates
  all ten; it was moved to the one file where the compressed label actually appears. And one range
  nobody had recorded — `Future Use 1 - Future Use 10` in `import-settings-record-type-200-format-c244e3ab.md`
  — was found in the same table.

### Tooling

- `bin/merge-group.py` — merges both node types, resolves `appliesToRef` against the field index.
- `bin/validate-graph.py` — per-reading quote verbatim (ERROR), ≥2 readings, `kind` in enum, no two
  readings citing the same (file, quote), `count == len(expandsTo)`, dangling owner checks.
- `bin/assemble-parts.py` — reads `synth-contradictions.json` / `synth-ranges.json`; an unverifiable
  contradiction or range quote is **fatal** at assembly. Cross-group refs now resolve against the
  live graph, not just this run's rosters, because a contradiction found while building one group
  often belongs to a field built in another.
- `workflows/2026-08-31_kg-group-5b.mjs` — amended: the extraction shape now demands a per-reading
  quote, and a **fourth Synthesize agent** emits both node types. Group 3 gets them natively; no
  separate grounding run.

The whole round-trip was rehearsed on synthetic data before the real merge, and re-assembly is
byte-identical to what was merged.

### Next

Group 3 — PO Matching, 11 pages, new-first.

---

## Group 3 — PO Matching (2026-08-31)

**20 agents · 0 errors · 3.21M tokens · 80 min · 49 fields · validator exit 0.**

Two pages, not the eleven the lost map recorded. See the page recon
(`output/reports/2026-08-31_group3-recon/`, run `wf_a2215035-e91`) — six blind sweeps converged
with no dissent, both critics endorsed the roster, and the count reconciles as *surfaces* counted
where the map claimed pages.

| Page | Fields | Coverage | Basis | uiVariant | Dropped | Repaired |
|---|---|---|---|---|---|---|
| Purchase Order Matching Rules | 33 | good | rich | undifferentiated | 25 | 9 |
| Purchase Order Configuration | 16 | partial | moderate | undifferentiated | 5 | 9 |

Also landed: 26 value sets (101 values, 10 knownGap), 40 dependencies, 6 steps, 12 contradictions
(36 readings), 2 compressed ranges (44 names). Graph now **20 pages · 486 fields · 486/486 quotes
verbatim · ERROR-clean**.

### What the critics caught, and what was done

The correctness critic said *merge after fixing 1 and 2*; the completeness critic said *do not
merge as-is*. Both were right about different things. Every claim acted on was re-verified by hand
first — one of them (#5 below) was overstated by the critic and was corrected in the other
direction.

Applied via `bin/apply-corrections.py` (idempotent, re-run after every merge):

1. **Page `uiVariant` "both" → "undifferentiated".** Flagged independently by BOTH critics — the
   strongest signal available. The page claimed "both" while all 35 of its own fields were
   `undifferentiated`, and the roster's own skip note said the legacy twin "is the evidence for
   NOT claiming uiVariant both". The only page in the graph legitimately marked "both" is Audit
   Rules, which backs it with 27 both + 6 legacy + 5 new fields.
2. **Dropped `match_status`** — a derived runtime attribute, not a control here. Its own quote
   names its owners and this page is not among them: *"Match Status displays on the My Invoices,
   Approve Invoice, Assign Invoice, and Processor List pages."* `grep -c "Purchase Order Matching
   Rules"` on the cited file returns 0. **Its 6-value catalog was retained as a `knownGap` value
   set** — rule 11: unwired and deleted are different answers.
3. **Dropped `matching_rule_type`** — its label appears in **zero** corpus files (verified
   `grep -rlF` over both directories) and its two values already exist as `life_to_date_tab` and
   `rules_tab`. A driver told to set it has no control to act on; the real action is clicking a tab.
4. **Re-pointed `dep.g1.057` / `dep.g1.058`.** Both targeted `{Purchase Order Configuration,
   "PO Configuration"}` — the PAGE name written into a field slot, so they would have kept dangling
   while *looking* like this merge should have resolved them. `dep.g1.057`'s sourceQuote is
   byte-identical to `group_selector`'s, same file and sentence. **Two Group 1 edges that had
   dangled since Group 1 now resolve.**
5. **Repaired the Concur Receiving roles value set.** Six `||`-joined 4-column table rows reduced
   to the six role names, each verbatim. The assembler's pre-merge check caught this, not a model.

### Two tooling defects found and fixed — both would have hit every future group

- **`assemble-parts.py` hard-coded the step-id prefix `grp5b-`** (line 382), so it flagged all six
  correctly-prefixed `grp3-` ids. The prefix is now DERIVED from the group label, mirroring
  `merge-group.py`'s gtag so the two cannot disagree. Verified backwards-compatible:
  `Group 5 + patch "Group 5B"` still yields `grp5b-`.
- **`assemble-parts.py` defaulted `--group` and `--patch-page` to Group 5B's values.** A Group 3
  run silently produced a result carrying `patchPage: "Group 5B"`. Harmless here because the merge
  ran without `--patch`, but `merge-group.py --patch` would have used it to tag and strip nodes
  under the wrong group. Both defaults removed; `--group` is now required.
- `apply-corrections.py`'s new `drop_fields` clears contradiction and range owners when it drops a
  field. The validator caught the dangling owner the first time — an empty `appliesTo` is valid,
  a dangling one is a hard ERROR.

### Deferred — cross-group, deliberately NOT resolved here

Per the scope decision, nothing already-built was rebuilt. The completeness critic was explicit
that items 2, 4 and 8 must not be resolved by re-homing onto a Group 3 page, and they were not.

- **`Receipt Type` is absent from the graph entirely** — the twin gate to the captured
  `Receipt Required`, documented in 8 corpus files with four conflicting value vocabularies.
  `adding-receipt-type-field-to-the-purchase-request-header-form-ba26762e.md` was never opened by
  any lens. It belongs to Forms and Fields (open-debt item 7). Its *gate* on matching
  (*"For receipt matching rules to apply, the Receipt Type at the purchase order line item level
  needs to be Quantity Receipt."*) is Group-3-relevant and should be picked up as a dependency
  when that debt is worked.
- **A Group 3 edge targets a phantom.** `level_field → Invoice Settings :: Allow system to
  associate invoice lines to Purchase Order lines based on data attributes` cannot resolve: that
  row is one of the **11 of 24** rows missing from Invoice Settings. This is open-debt item 7
  biting exactly where predicted. The edge is retained as an honest forward reference.
- **`concur-receiving-roles-099f375f.md` never opened** — the admin twin of the extracted tools
  roles matrix. They disagree substantively: admin *"the user must also have the Receipt User
  role"* vs tools *"the user can have"* — mandatory vs optional. A third source breaks toward
  "can". Should be a contradiction node; not added because the admin twin was not read in this run.
- **A 21-entry raw-`<table>` copy-down catalog** in `f926eac7` was dismissed as illustrative on a
  `<tr>` count — it packs its payload into ONE `<tr>` as 25 `<p>` cells, the same under-count trap
  as the indented-markdown-table one. It carries two EN-DASH ranges (`Custom 1–24`, `Custom 1–20`).
  That file is Groups 1/5 debt, not Group 3.
- **`purchase-request-settings-b0bce285.md`** (3 rows, plus a prose range *"Type a number from one
  to 99"* that no digit regex finds) belongs to the unbuilt Workflows group.
- **A complete 6-step Localization click path** sits in `step-5-...-5328a8e1.md` for Group 6.

---

## Workflows — page recon + Run A (Workflows, Feature Hierarchies) — 2026-08-31

**Result: 22 pages · 607 fields · 436 dependencies · 41 steps · 114 value sets (1,011 values) ·
60 contradictions (179 readings) · 17 compressed ranges. `bin/validate-graph.py` exit 0, ERROR none.
607/607 sourceQuotes verbatim; 179/179 contradiction readings verbatim.**

### The recon retired "13 pages" — run `wf_f4d39441-6cb`, 9 agents, 0 errors, 1.97M tokens, 61 min

`INVOICE-CONFIG-MAP.md` recorded *"13 pages of workflow config"* under ONE left-menu entry. Six
blind sweeps converged with no dissent: **the workflow area is FOUR pages.**

| Page | Basis | Files | Est. fields | Found by |
|---|---|---|---|---|
| Workflows — ONE page, SEVEN tabs | rich | 86 | ~100 | 6 of 6 |
| Email Reminders | moderate | 17 | ~25 | 2 of 6 |
| Delegate Configurations | moderate | 17 | ~25 | 5 of 6 |
| Feature Hierarchies | sparse | 12 | ~5 | 6 of 6 |

**The 13 reconcile exactly:** 7 tabs + 3 wizard pages (General / Steps / Step Rules) + 3 settings
tables (Invoice / Purchase Request / Purchase Order Settings). Every one corpus-attested; not one
is a page. Settled mechanically, not by intuition: a corpus-wide `(left menu)` census over 1,859
files returns 30 distinct labels — Workflows scores 8, every candidate tab scores **0**;
`"Steps tab"` returns **0** corpus-wide; and there is ONE role gate for the whole surface, stated
twice as *"permissions for the Workflows section in Administration"*, never per tab. Audit Rules
precedent, not Forms and Fields. The page-hood critic **endorsed the roster outright** — no page
added, removed, merged or split — after reproducing every mechanical claim to the byte.

### The five inherited findings, all settled with commands

1. **PO/PR Settings belong to Workflows — CONFIRMED as answer (a), and the third sibling settled.**
   All three settings tables live on **Workflows > Settings tab**. Family cohesion is mechanically
   provable: `grep -rl "apply globally to"` over both guide dirs returns **exactly those three
   files and nothing else**. This is a **LABEL COLLISION** with the built Invoice Settings page,
   **not rebuild debt** — zero of the 486 prior fields cite any of the three, and the built page's
   13 fields come from `available-invoice-settings-8b3411f0.md`, a different file. Nothing moved.
2. **Workflows is ONE page with SEVEN tabs** — see above.
3. **Feature Hierarchies belongs to no single group** — claimed here rather than deferred a second
   time. Own left-menu entry, own role gate stated *in contrast to* the Workflows gate inside one
   three-step flow. It is a **sibling of Workflows, not a child**: its click paths carry no
   `Invoice Processing Admin` middle segment, so a driver routed via a Workflows path **will fail**.
4. **Routing Configuration boundary is clean** — all 10 of its fields re-read; nothing re-homed in
   either direction. `"routing"` is a **three-way homonym**: hierarchy-mapping import (built page),
   approval chain (Workflows Steps/Step Rules), and the Invoice Routing feature hierarchy.
5. **End-user traps confirmed and worse than filename-level** — an approval STEP is configured on
   the Workflows wizard and executed on the Approval Flow page. All 41 deferred surfaces name where
   their configuration lives.

**A sixth finding was added by the recon completeness critic and is UNDETERMINED:** the Workflows
guide's own revision history (2025-09-19) says *"Updated images and text to the new UI for the
Workflows Tool"*, while `tools-guides/how-single-step-approval-workflow-works-40145f24.md` says the
admin uses *"the classic interface"*. Two dated statements, opposite directions, one corpus version.
It matters more than any single field: click paths are the only navigation knowledge this group will
ever have. `uiVariant: undifferentiated` is the honest answer. (Text trap: that revision line
misspells **"Worflows"**, once corpus-wide.)

### Where the two recon critics disagreed — and how it was settled

Completeness said ADD a fifth page (`authorized-approval-limits`); page-hood endorsed four. A split
is **two findings, not a tie**:

- **Completeness was right on the fact.** The roster deferred it claiming the corpus defers it to an
  external Shared guide. **False** — `user-administrator-fcfd570c.md` (4,603 B) and
  `user-administration-8b167b96.md` (2,314 B) document it directly; all three anchor quotes verify.
- **Page-hood was right on the action.** Click path is `Administration > **Company** > Company Admin
  > User Administration` — outside the Invoice menu. Verified precedent: **all 20 built pages** sit
  under `Administration > Invoice`, zero exceptions, and five prior groups met these surfaces
  **eight times** and left every one an unresolved endpoint.

**Verdict: no fifth page.** Building it is a scope expansion of the whole graph — Luke's call, not a
roster conclusion. The deferral's *reason* was corrected and the click path, seven field names and
value semantics (0 = in chain but no final authority; null = unlimited) are recorded as scoped debt.

### Run A — `wf_bc0c21da-8dc`, 20 agents, 0 errors, 3.74M tokens, ~100 min

| Page | Fields | Dropped | Repaired | Coverage | mustReadNeverCited |
|---|---|---|---|---|---|
| Workflows | 114 | 86 | 18 | good | 57 |
| Feature Hierarchies | 7 | 5 | 2 | partial | 0 |

Plus 34 value sets (161 values, 8 knownGap), 61 dependencies, 24 contradictions (68 readings),
5 compressed ranges, 7 ConfigSteps / 122 sequence entries.

**Feature Hierarchies came in thin exactly as forecast** — ~5 predicted, 7 delivered, both lenses
independently agreeing, and the extractor said plainly it did not pad. SAP files the substance in
the external *Shared: Feature Hierarchies Setup Guide*, absent from this corpus. That is the Budget
Configuration failure mode predicted and avoided rather than repeated.

**The packed raw table was recovered.** `invoice-settings-cace748d.md` returns `grep -c '<tr'` = 1
but `grep -o '<tr' | wc -l` = 3 — three rows on one physical line. Settings-tab payload is **nine**
controls (5 invoice + 3 PR + 1 PO), not the three a markdown-only extractor would see. The brief
that settles finding (1) is the same file that would have been mis-read.

### Both critics: MERGE WITH FIXES. Three blocking, all verified before applying

1. **`step_role` asserted a closed 6-value list from a HEDGE** — *"such as Authorized Approver, ..."*.
   `"such as"` does not close a list, and the corpus attests a seventh value the list omitted:
   `Employee` is the Role of step 1 in BOTH shipped default workflows. **The build had already
   reached this conclusion in its own contradiction node** ("Treat the Role list as OPEN") and the
   roster then emitted the closed list anyway. Same family as the two deleted invented "Yes" values.
   `validate-graph.py` could NOT catch it — all six strings are verbatim. → `validValues = []`.
2. **A repair swapped a control-naming quote for a non-discriminating one on a false premise.** The
   repair claimed no markup-free quote existed; `grep -F -c` of the restored string returns 1. The
   discarded quote, *"Type a number from one to 99."*, names no control and describes three
   different controls in three different files. → quote restored.
3. **`repairedCount` understated 17 vs 18** — and repairs are precisely the records that never face
   the adversarial refuter, so an undercount hides one from review. The hidden one was defect 2.

**Both critics independently found the SAME pattern on two different fields** — a list closed or
declared open on partial evidence, omitting the attested value `Employee`. That agreement is the
strongest signal this pipeline emits. The second instance was a **false claim written into the
graph**: `contr.gworkflows.015` asserted a third employee-only value "is likely present — it is
deliberately NOT invented here", when `approver-terminology-8559861c.md:66` enumerates it outright
(`grep -F -c` = 1, one line corpus-wide) in a file this run had already cited. A third grounded
reading was added rather than the claim softened.

### FOUR toolchain defects found and fixed — the "grep the whole toolchain" lesson, again

1. `bin/assemble-parts.py` hard-coded `'grp5b-unnamed'` as the step-id fallback.
2. `bin/merge-group.py` `ALL_GROUPS` had **no Workflows entry** — `groupsRemaining` omitted it, and
   merging Group 6 would have flipped `meta.status` to COMPLETE with Workflows unbuilt.
3. **`bin/assemble-parts.py` `group_tag()` called an undefined `slug()`.** Every prior group label
   matched `/Group (\d+)/`, so the fallback branch had **never executed**. `Workflows` — which
   deliberately carries no "Group N", because any label containing "Group 2" would derive gtag `2`
   and mint `dep.g2.*` ids colliding with the built Group 2 — was the first to reach it, and it
   raised `NameError`. Backwards compatible: `grp3-` and `grp5b-` unchanged.
4. **The `tabs` chain has THREE links and only one was fixed at first.** `NAV_SCHEMA`
   (`additionalProperties:false`, no `tabs` property — the agent was schema-blocked and returned
   `tabs: None`) → `assemble-parts.py` (dropped the key) → `merge-group.py` (fixed first). Links 2
   and 3 are now fixed; **link 1 must be fixed in the Run B script.** Run A's tabs were added via
   `apply-corrections.py`.

**The seven tabs are individually attested, NOT enumerated.** Unlike Forms and Fields — whose tabs
come from one sentence, *"The tool consists of the following tabs:"* — **no sentence anywhere in
this corpus lists the Workflows tabs together** (that phrase returns exactly one hit corpus-wide and
it is Forms and Fields). Each of the seven is attested separately by its own click path: Workflows
14 files, Settings 15, Email Notifications 7, Authorized Approvers 6, Approval Statuses 5,
Confirmation Agreements 4, Reason Category and Codes 3.

### Open debt from this run

1. **F-2 SEVERE — 433 condition-editor entries and 12 compressed ranges in two never-opened
   tools-guides files.** `the-query-builder-and-the-condition-editor-e10473f9.md` (Invoice Processor:
   7 Data Objects, 217 Field/Value entries, 7 ranges) and `-af058a80.md` (PR + PO Processor: two
   further Data Object lists, 216 entries, 5 ranges). They were collapsed into one "do-not-confuse"
   skip and neither was opened. **Do NOT home these on Workflows** — they belong to deferred
   Processor surfaces. Owed: a contradiction node (the graph carries 15 entries from a table SAP
   itself opens *"The table below shows a partial list"*), a corroboration note, and an
   unbuilt-surface pointer so a future run inherits them instead of re-discovering them at cost.
2. **F-3 — flat editability contradiction unrecorded** on `workflow_condition_data_object_e`:
   *"Change it if necessary"* (Workflows) vs *"This field will always display as Value and you
   cannot change this"* (Processor), on a control SAP calls "very similar".
3. **F-6 — `Table 2` governs BOTH `C: Field/Value` and `F: Field/Value`**; the value sets are wired
   only to C, so a driver filling column F has no values at all.
4. **F-7 — `H: And/Or` declines a pair the corpus enumerates in prose** (*"separated by either and
   or or"*). Two grounded values, not a toggle completion.
5. **F-5 — Feature Hierarchies `feature_name` withheld two placement-attested names** on a ground
   two read files refute.
6. **Value-set hygiene** (5 WARNs added this run, all diagnosed): `email_body`/`email_subject` carry
   9 de-escaped variables — the corpus writes `%L\_WhoChanged%`, the graph records `%L_WhoChanged%`;
   the **unescaped form is correct for a driver** and the catalog is complete and verified, so the
   WARN is now a documented decision. `feature_name` cites one file for 3 values, 2 of which are
   elsewhere → split into three one-value sets. `segment_name` expands *"Custom 10, 11, and 12"* →
   should be a compressedRange.
7. **A de-dupe drop silently lost its note** — `wf_workflow_type`'s reasoning about a 5-row table
   enumerating approval APPROACHES did not survive into the merged record despite boilerplate
   claiming every note was folded in. **Worth auditing the other 85 Workflows drops for the same loss.**
8. **57 `mustReadNeverCited` on Workflows** (benchmark was 19 on a rich page). The completeness
   critic adjudicated and found the coverage sound, but the number is high and the F-2 skip sits
   inside it.
9. **Three existing-graph defects reported, not fixed here:** `dep.g2.011` targets page
   `Invoice Settings` while citing `invoice-settings-cace748d.md` (should be Workflows > Settings
   tab); `dep.g2ar.025` duplicates the already-correct `dep.g2ar.024`; and
   `page.exceptions.navPathAlternates` contains `Administration > Invoice > Workflows > Settings`,
   which is not a route to Exceptions. A second instance of that last class was found in
   `page.image-handling.navPathAlternates`.
10. **The built Exceptions page is missing its documented Exception Level field**, so all
    exception-level edges anchor on Audit Rules instead.

### Still to do

**Workflows Run B — Email Reminders + Delegate Configurations** (34 unique files, 70,074 B, ~50 est.
fields). Merge **WITH `--patch`** — the `Workflows` group label now exists. Exactly one 1,284 B file
is shared with Run A (`delegate-self-approval-1b627285.md`), whose field belongs to the Workflows
General page: **Run B must not extract it.** Fix `NAV_SCHEMA` to declare `tabs` before running.

---

## Approval Authority — Authorized Approval Limits (2026-09-01)

**23 pages · 617 fields · 454 dependencies · 43 steps · 115 value sets · 66 contradictions
(209 readings) · 17 compressed ranges. `bin/validate-graph.py` exits 0, ERROR-clean, 617/617
sourceQuotes verbatim.** Run `wf_c5bf5b7e-134`, 14 agents, **0 errors**.

One page, 10 fields. The corpus freeze held: `concur-corpus` at `fbd8751`, 0 files modified.

### THE SCRIPT WAS NOT READY, AND THE HANDOFF SAID IT WAS

The 2026-09-01 handoff and `docs/RESUME-PROMPT.md` both said to *"change exactly ONE thing"* (the
`const PARTS` scratchpad). **That was wrong by a wide margin, and `const PARTS` was the one thing
that did not strictly need changing** — it was an absolute path to a provisioned, empty directory.

A pre-flight audit (`wf_4ed79cf0-9f6`, 151 agents, 76 findings, **71 surviving two adversarial
refuters each**) found the script was adapted from Workflows Run A by turning the top-of-file knobs
only. `diff` against the parent showed 19 hunks, 13 of them above line 126 — **essentially every
agent-facing prompt below the constants was still Run A text**, and in three places still Group 3
text. Full findings in `output/reports/2026-09-01_approval-authority-preflight-audit.md`.

**The blocker:** `ALREADY_BUILT`, injected into all six agent families (Map, Extract, Verify,
Repair, Synthesize, Critic), told every agent:

> *"OUT OF SCOPE FOR THE WHOLE GRAPH, decided 2026-08-31: surfaces under Administration > COMPANY …
> The Authorized Approval Limits window … is NOT a page for you to build. Write forward references
> to it and let them stay unresolved."*

The run would have been instructed not to build the page it exists to build. The same constant also
**omitted Workflows (114 fields) and Feature Hierarchies from the built-pages list** while calling
Feature Hierarchies "this run" — so the one page this build had to draw a boundary against was
invisible to every agent. 22 further stale passages were fixed: the seven-tab Workflows recon block
in the Map prompt, Workflows/Feature-Hierarchies search terms, "the two pages" arity throughout,
"20 pages / 486 fields", two Synthesize prompts headed *"FOR GROUP 3"*, a dependency prompt naming
nine Workflows endpoints, a contradiction prompt ordering nine phantom *C1–C9* nodes, and a
refuter-2 boundary item naming the **Group 5B** List Management line instead of the Workflows one.

> **Standing rule, and it is now the third instance of this class:** when adapting a build script,
> diff it against its parent and read every hunk that did **not** change. An unchanged prompt in a
> script about a different page is the default failure mode, not the exception.

### Six toolchain defects fixed before the run — five were latent for every future group

1. **`apply-corrections.py` `wire_by_name` wired across pages.** Its graph-wide fallback ignores the
   stated page, and `Level` matches exactly one field graph-wide: `field.feature-hierarchies.level`.
   A value set written `{page: 'Authorized Approval Limits', field: 'Level'}` merged unwired
   (validator ERROR, exit 1) and `apply-corrections.py` — which runs **between** the merge and the
   validator — then wired it to Feature Hierarchies and turned exit 1 into a green build carrying a
   false owner. Now a stated page that does not carry the field is evidence *against* a graph-wide
   guess. Verified zero-regression against all 13 existing wire-by-name cases.
2. **`apply-corrections.py` `repoint_endpoints` never wrote `ref['page']`.** `merge-group.py`
   re-resolves endpoints from the stable `(page, field)` ref on every merge, so a cross-page repoint
   silently un-resolved on the next merge. The only two existing entries already had the correct
   page, so the branch had never executed. This run needed it.
3. **`assemble-parts.py` never checked dependency endpoints into already-built pages.** The check
   was scoped to this run's own rosters. Cross-page edges are written against a control's LABEL
   ("Approval Limit") rather than its NAME (`authorized_approver_approval_limit`), and such an edge
   dangles forever while the validator files it among the 243 legitimate forward references. Added
   `DEP-ENDPOINT-NOT-ON-BUILT-PAGE`, advisory not fatal.
4. **`assemble-parts.py`'s value-set collision detector drifted from `merge-group.py`'s id minter**
   (no `[:60]` truncation), and nothing anywhere checked node-id uniqueness. Detector now uses the
   same `slug()`; `validate-graph.py` gained a graph-wide `duplicate-node-id` invariant.
5. **`NAV_SCHEMA` — link 1 of the three-link `tabs` chain, still broken.** Links 2 and 3 were fixed
   2026-08-31 and reported done. The schema sets `additionalProperties: false` and declared no
   `tabs`, so the map agent was schema-blocked and silently returned nothing. **Now fixed and proven
   end-to-end: this page merged with `tabs: []`, which is a positive finding for a modal window.**
   Carry this `NAV_SCHEMA` into the Run B script.
6. **`merge-group.py --patch` with a null `patchPage` silently wipes the graph.** See below.

### ⚠ `--patch` DOES NOT "strip nothing" — both handoffs were wrong, and Run B was aimed at it

`docs/WHERE-WE-LEFT-OFF.md` and `docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md` both
stated *"`--patch` strips nothing — verified against `merge-group.py:62-76`"* and told Run B to
*"set `patchPage` in the return"*. **`patchPage` comes from `assemble-parts.py --patch-page`, not
from the workflow's return value.** `assemble-parts.py` always writes the key (as `None`), so
`merge-group.py:66`'s `.get()` default never fires, `tag` becomes `None`, and the five filters that
follow keep only patched nodes — deleting every node minted by every non-patch merge.

Measured on a sandbox copy: **436 dependencies → 115, 41 steps → 12, 114 value sets → 37, 60
contradictions → 24, 17 ranges → 10 — and `validate-graph.py` then printed "ERROR: none" and exited
0 over the wreckage.** A hard guard now aborts the merge. Both docs corrected.

### The central risk: the boundary, and how it was answered

The built Workflows page owns four controls whose labels collide with this page, all from
`authorized-approver-list-a9522ec8.md`, and `configuration-8b3be88b.md` says one value has three
setter surfaces. The verdict, per control, each grounded:

| Colliding label | Verdict here | Evidence |
|---|---|---|
| **"Approval Limit"** | **Never emitted under that label.** The shape differs by surface: Workflows has ONE field named "Approval Limit"; this window has an unnamed *"Approval Limit area"* holding a currency selector and an **Amount** field; branch A has *"Manager Approval Limit"* + *"Approval Limit Currency"*. Four controls, no duplicate. | `fcfd570c` names only *"the Amount field"*; `8b167b96` calls it an *area* |
| **"Level"** | Emitted as **`cost_object_approval_level`**, deliberately NOT a sibling id — two different values sharing a label (this is the level-based **cost object** level, record set 710; the Workflows one is the authorized-approver step filter, record type 720). | `aae69350` vs `8b167b96`, recorded as a contradiction with 7 readings |
| **"Can approve exception"** | **Kept.** The per-approver boolean is set here; only the tenant-wide min/max RANGE belongs to Workflows. The parenthetical is a scope fence, not a delete order. | `fcfd570c`: *"(The actual exception levels … are defined on the Authorized Approvers tab in Workflows.)"* |
| **"Approver"** | **Not emitted — a clean negative.** On Workflows you *select* an approver because you are creating a list row via New; here the approver is the record context you arrived with. | Neither primary names an Approver control anywhere |

Zero fields cite `authorized-approver-list-a9522ec8.md` or `procedure-2d20b513.md` (both
Workflows-owned); none of the three Workflows exception/activation fields was re-emitted.
`bin/check-approval-authority.py` was written to enforce exactly this and exits 0.

**Page identity resolved as ONE page with two mutually exclusive renderings.** Branch A
(Global-group-only) has no Authorized Approval Limits window at all — an inline check box reveals
Manager Approval Limit + Approval Limit Currency, and it is limit-only. Branch B opens the window.
`global-group-vs-authorized-approver-hierarchy-8a960238.md` puts User Administration in a single
step-4 row marked X under **both** branch columns, and no corpus topic names a second page.

### What the critics found, and what was verified before acting

Both critics returned MERGE-AFTER-FIXES. Every claim was re-verified against the corpus first, and
**two did not survive that check**:

- The completeness critic said the precedence-rule edges "terminate in prose" and should point at
  `field.workflows.cost-object-hierarchy-type`. **They already did.** Its other half was right: the
  orphan candidate refusing to wire `Level`/`Limit` gave a false premise, and that field already
  carries `validValues: ["Level","Limit"]`. The orphan was dropped rather than landed.
- The correctness critic called it BLOCKING that `can_approve_exception` fails
  `check-approval-authority.py`. It did — but the note already named
  `field.workflows.authorized-approver-can-approve-exception` by exact id with a full verdict. **The
  gate was testing for the literal word "sibling", a proxy rather than the rule.** The check was
  fixed to test for the sibling's id or name; the analysis was left alone. It also flagged the
  page's click path as lost — that was the critic simulating **without `--journal`**. With it:
  10 navPathEvidence entries, 5 role gates, 9 aliases, 16 KB of identityNotes.
- The correctness critic **retyped a quote with a curly apostrophe** that the corpus writes as
  ASCII, and it failed `grep -F` on first use — the exact trap the pre-flight had predicted.

Acted on, all quote-verified, all flagged `CRITIC-ADDED … AFTER THE ADVERSARIAL REFUTERS RAN` in
their own notes so they are never mistaken for refuter-passed content:

- **`branch_a_save` added** (10 fields, not 9). *"The administrator makes the appropriate choices and
  clicks Save."* Without it a driver on branch A fills two fields and never persists them; 12 built
  pages carry a Save. **Honest asymmetry recorded: branch B has no documented commit action at all.**
- **Two dependencies the synthesis dropped**: the branch-A/branch-B **mutual exclusion** (the most
  load-bearing structural fact on the page, surviving only as prose), and the only documented
  **setup-ordering prerequisite** into the built Feature Hierarchies page.
- **Two more readings on the contested Level** (now 7): the corpus does not agree with itself about
  whether "level" is an authorized-approver authority at all — `8b3bd2d0` enumerates two kinds,
  `8b3ab7ad` enumerates three.
- **Four behavioural facts** appended to field notes: the cost-object path uses the **net** amount of
  the line, not gross, and excludes tax and shipping (a *second, path-dependent* definition of the
  amount this limit is compared against); edits take effect immediately on save; removing authorized
  approver permissions does not delete the standard Invoice approver role.
- **Two bad orphan value sets dropped**: the `Level`/`Limit` duplicate, and one carrying `values: []`
  which would have been the first zero-value set in the graph.

### Six built nodes carried the reversed 2026-08-31 scope decision — two more than were known

The roster's remediation list named four; the correctness critic found **six**, and the two extra
were `configSteps` rationales — a node type no correction op could reach. `DEP_CONDITION`,
`STEP_RATIONALE` and `STEP_SEQ_RETARGET` ops were added to `bin/apply-corrections.py`, plus an
id-keyed `VALUESET_NOTE_APPEND_BY_ID` (the existing `VALUESET_NOTE_APPEND` is keyed by a *value
marker*, so id keys silently matched nothing). All six repaired; the reasons were rewritten without
changing any conclusion that is still correct.

**`dep.gworkflows.060` now RESOLVES** onto `field.authorized-approval-limits.authorized-approval-limits-link`.
**`dep.gworkflows.046` deliberately stays unresolved** — its `approver` is the per-employee
assignment on the User Administration **user profile**, a genuinely different surface with no
control in this window. Retargeting it would have encoded a corpus falsehood that then reads as a
win to the validator. Only its *reason* was corrected: that surface is unbuilt because its
documentation defers to an external Shared guide absent from this corpus, **not** because of its
menu location.

### Open debt from this run

1. **37 of 64 inventoried files (58%) were never opened by any extraction lens.** The map did its
   job; the extract phase read 42% of it. The completeness critic opened all 37: 19 are correct
   no-gain skips, 9 marginal, 2 revision histories, and **7 carried real content** — five of those
   are now landed above. Remaining: `approval-status-flags-4f534f16.md`,
   `approver-terminology-8559861c.md`, `employee-import-f6a516c8.md`.
2. **A 14-value catalogue from `8a960238` vanished between extract and synthesis with no reason
   recorded** — rule 2's exact failure shape. Mitigated only because the built graph already carries
   the same matrix as a Workflows value set, but at 4 values (the step headers) rather than 14. The
   10 lost members include the three assignment routes that decide this page's identity.
3. **A third `Feature Hierarchies` menu alias is unrecorded**: `hierarchies-7f68a876.md` writes
   *"Administration Invoice Hierarchies"* (glyphs stripped, singular "Hierarchies") where
   `b65d7089` writes *"(Invoice > Feature Hierarchies)"*.
4. **A seventh attestation of the three-setter claim** was found during verification and is not
   cited: `remove-authorized-approvers-8b3c5273.md:21`.
5. `dep.gapproval-authority.004` and `.013` are unresolved by design (User Administration user
   profile; Employee Import).

### Tooling note — the `node --check` recipe in the resume prompt does not work

A Workflow script legally carries **both** a top-level `export const meta` and a top-level `return`,
so neither raw `node --check` nor a bare async wrapper can validate one. The working form:

```bash
printf 'async function __w(){\n' > /tmp/chk.mjs \
  && sed 's/^export const meta/const meta/' workflows/<script>.mjs >> /tmp/chk.mjs \
  && printf '\n}\n' >> /tmp/chk.mjs && node --check /tmp/chk.mjs && echo PARSE OK
```

### Tooling note — `grep` on this machine is ugrep, and `-P '\xc2\xa0'` returns a SILENT ZERO

Measured: `grep -rlP '\xc2\xa0'` over admin-guides returns **0 files** while python counts **1,729
NBSPs across 117 files**, even under `LC_ALL=C`. The forms that work are `grep -P '\x{00a0}'` or the
bash literal. The corpus's NBSP navigation hazard is real (after "Administration": 96 ASCII `>` vs
65 NBSP-only), and the instruction telling agents to check for it was itself unrunnable. Fixed in
the workflow template.
