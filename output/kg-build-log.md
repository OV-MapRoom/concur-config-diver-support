# KG Build Log

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

### Thin — needs a live-UI spot check (ranked)

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

### Thin — needs a live-UI spot check (ranked)

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
  picker, the add/remove widget, and the available-field catalog exist only in the live UI.
  **Highest value per minute of spot-checking in the whole group.**
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

### Thin — live-UI spot check (ranked)

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
