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
