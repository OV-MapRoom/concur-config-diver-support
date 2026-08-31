All 74 sourceQuotes verified verbatim; all 31 sourceFiles exist. Verdict below.

---

## 1. Condition editor — COMPLETE (Table 1, all 8 columns)

I enumerated Table 1 of `the-condition-page-5d4ea870.md` myself. Eight rows: **A: Left Parenthesis, B: Data Object, C: Field/Value, D: Operator, E: Data Object, F: Field/Value, G: Right Parenthesis, H: And/Or**. All eight are in the graph and correctly ordered:

| Col | Field id | Status |
|---|---|---|
| A | `condition_left_parenthesis` | present |
| B | `condition_data_object_left` | present, **10 validValues exact match** to Table 1 |
| C | `condition_field_value_left` | present |
| D | `condition_operator` | present |
| E | `condition_data_object_right` | present, `[]` — correct, corpus does not enumerate E |
| F | `condition_field_value_right` | present |
| G | `condition_right_parenthesis` | present |
| H | `condition_and_or` | present |

Column B's fix is real and correctly gated. **Nothing from Table 1 is missing.**

But the editor is encoded **three times over**. Eight columns occupy 16 field ids: `left_parenthesis`/`right_parenthesis`/`operator`/`data_object`/`field_value`/`second_field_value`/`and_or`/`condition_data_object_b` are pure aliases. Across the whole set, **91 field entries encode roughly 68 real controls — ~23 are duplicates**, and `rule_name_link` appears **twice as a literal duplicate key** (legacy + new). A consumer keying on `name` loses one silently.

---

## 2. Table 2 — PARSE IS PERFECT, PAYLOAD IS SUSPECT

I counted the file myself. **13 data objects, 278 bullet lines.** Per-object:

| Object | Corpus | Captured |
|---|---|---|
| Attendee Totals | 4 | 4 ✓ |
| Budget | 15 | 15 ✓ |
| Detail | 21 | 21 ✓ |
| Detail Allocation | 5 | 5 ✓ |
| Employee | 26 | 26 ✓ |
| Line Item Attendee | 13 | 13 ✓ |
| Purchase Request | 24 | 24 ✓ |
| Purchase Request Distribution | 3 | 3 ✓ |
| Purchase Request Item | 21 | 21 ✓ |
| Request | 97 | 97 ✓ |
| Request Exception | 2 | 2 ✓ |
| Vendor Remittance Address | 29 | 29 ✓ |
| Vendor Ship From Address | 18 | 18 ✓ |
| **Total** | **278** | **278 ✓** |

**Zero objects missing. Zero lists truncated.** Thirteen of thirteen, count-exact. The B-vs-Table-2 mismatch (Table 2 has three Purchase Request objects absent from B's 10; B says "Vendor Remittance"/"Vendor Ship From", Table 2 says "…Address") is recorded, not silently reconciled. Correct call.

**Two problems remain:**

- **The names may not actually be in the graph.** Every value set carries only `count`. `condition_field_value_left.validValues` is `[]` — the place a consumer looks. Exact counts prove the table was parsed; they do not prove the 278 strings were stored. If the value-set rows behind those counts do not hold literal strings, the headline deliverable is *still* not delivered, it just fails a layer deeper than last time. **Verify this before shipping.**
- **15 of the 278 bullets are compressed ranges** ("Custom 01 - 20", "Org Unit 1 - 6", "Attendee Entry Custom 1-5", "Address 1 - 3", "Custom 01 – 21"…). Expanded, the catalog is **492 field names**, not 278. Nothing in the graph records that ranges need expansion.

---

## 3. `validation-conditional-expressions-67302876.md` — FULLY REPRESENTED

Read in full. Every constraint is present with a verbatim quote:

- Four hard constraints: Type + Id 01 required ✓ · equal-operator-only against Id/Type/Detail Allocation ✓ · Id fields in numeric order 1→n ✓ · Detail Allocation right-hand-side only ✓
- Both Validation-only objects: `data_object_field_validation` ✓, `data_object_list_validation` ✓ (+ `list_validation_helper_pane`, E-only rule) ✓
- Short-code lookup, all three sub-cases ✓ · Entry City ✓ · Entry State/Province incl. the `Field_validation.ID_1 = Entry.State/Province` side rule ✓ · Entry Country, with the correct refusal to extrapolate the side rule ✓ · Type-column reuse ✓ · worked AND example ✓

This file went from 0% to 100%. No gaps.

---

## 4. Random numeric input + list controls — PRESENT

- `RandomPercentage` (max 100 %) and `RandomSequentialCount` (max 999,999), both `type: number`, both gated on `RandomRuleType`, both maxima quoted verbatim from `random-audit-rules-8b29a270.md`. Fixed. The two-Save distinction (Rule Type modal vs. grid) is caught — that was easy to miss.
- All five list controls present: `CustomRuleModifyButton` + `ValidationRuleModifyButton`, `CustomDeleteSelectedRowsButton`, `CustomRuleNameLinkLegacy`/`NewUI`, `ValidationRemoveButton` + `ValidationRemoveConfirmYes`, `RandomRemoveButton`. The Custom-has-no-confirmation / Validation-has-one asymmetry is correctly flagged.

---

## 5. UI variants — mostly earned, three are not

I diffed every legacy/new pair. Genuine, verified `both`: add-custom (0f1d320e vs 43e3f9aa differ by **exactly one line**), edit (6b5ffce1/ebccc173 byte-identical), delete (1ba67b2e/5736c0e0 identical), deactivate (51344640/e9ad1047 identical), access (70726665/d8c64dd4 differ only in blurb + a Note — and that Note *is* quoted). The legacy/new **split** on view-a-custom-audit-rule is correct: those two files genuinely diverge (Quick View panel vs. Next/Finish wizard walk). Good work.

**Unearned:**
- **`custom_audit_rule_event: "both"` — wrong twice.** Its 17 values come from `events-triggers-72339a13.md`, which has **no legacy/new counterpart**. And those 17 are the *Events (Triggers) reference list*, not the Event dropdown on the Add page — which enumerates **6**. One control now carries two conflicting value sets under two ids, one of them falsely variant-tagged.
- **`rule_name`, `editable_by`, `applies_to`, `active`, `exception_code`, `exception_level`, `exception_text`, `exception_visibility`, `wizard_next`, `new_exception`, `save_exception`, `done_button` are tagged `both` yet reused in the Validation and Random steps**, which have exactly one documented variant each. `both` is verified for the Custom wizard and false everywhere else those ids appear.
- **`insert_condition` / `remove_condition: "both"`** while the graph itself states the Validation page never documents them. Defensible for Custom; misleading as written.

---

## 6. Still missing — ranked

**1. The entire Validation Actions page: six controls, three enumerated lists, zero fields.** `add-a-validation-rule-0b31c4c0.md` (a file the graph cites five times) documents: the action selector (**Field update only / Exception only / Update, then exception**), **From Data Source** (**Constant / Validation Table / Employee / Request**), **From Field Name**, **To Data Source** (**Concur Request**), **To Field Name**, and **"Execute action when validation condition is:"** (**True / False**). The graph flags them in prose and creates **none**. That is the same failure mode as last time — a read, enumerated list left out because it didn't fit the id set. The fix is to add fields, not to annotate the omission. Worse: they were mapped onto `exception_visibility` and `active`, so the Validation sequence now uses `active` at order 7 *and* order 10 for two different controls, and `exception_visibility` at order 22 *and* order 24 for two different controls. That is wrong data with a disclaimer attached.

**2. Two documented bounds skipped inside a file the graph already cites twice.** `exceptions-then-portion-of-the-if-then-statement-6a3d96b1.md`: *"Exception code: … up to eight alphanumeric characters, all upper case"* and *"Exception level: The client decides how many exception levels (up to 99) to use."* `exception_code` is bare `type: text`; `exception_level` is `type: unknown`. This is precisely the Random-numeric-bounds miss repeated one page over.

**3. Copy a Custom Audit Rule — topic entirely absent.** `copy-a-custom-audit-rule-ba9c8aef.md` / `f18e140f.md` (byte-identical pair, so `uiVariant: both`). No Copy field, no step, no dependency. Corroborated by `access-custom-audit-70726665.md`: *"create, edit, copy, activate, deactivate, and delete."* Sixth list-level control, missed.

**4. Edit a Random Audit Rule — topic absent.** `edit-a-random-audit-rule-8b33d880.md` uncited. Random edit has a distinct shape (no Modify button, inline grid, two Saves). The lifecycle step covers Custom edit and Validation edit and skips Random.

**5. A false "undocumented" claim.** The graph says of the Validation event list: *"One entry, Payment Post Request Submit, is documented with an unresolved editorial placeholder — record it as enumerated but undescribed."* `events-triggers-7977f6ee.md` describes it: *"This rule is triggered after the invoice is submitted (only the Approver would see the exception)."* That whole file — the 12 Validation event trigger descriptions — is uncited. The agent asserted a corpus gap without checking the sibling.

**6. `DROPPED: []` is false bookkeeping.** At minimum items 1, 3 and 4 above were consciously omitted. None recorded.

**7. `active.validValues: ["Yes"]` violates locked rule 6.** *"Select Yes to activate the rule upon completion"* is an instruction with one value, not an enumeration. No "No" appears anywhere. Should be `[]`.

**8. Tools-guides coverage is thin but not wrong.** Only one tools-guides file is cited (`the-query-builder-and-the-condition-editor-e10473f9.md`). Uncited: `af058a80.md` (a second Query Builder page carrying **two more per-data-object catalogs**, PR Processor + PO Processor, with objects — Bill To, Ship To, Purchase Order, PO Distribution, PO Item — absent from Audit Rules Table 2), and `understand-conditional-expressions-39d99456/db3d7418`. I checked all three: **correctly out of scope** for an Audit Rules page, since they document PR/PO Processor surfaces. No raw-`<table>` catalog was missed anywhere — `grep -c '<table'` on `5d4ea870.md` returns **0**, and the only audit-adjacent raw-HTML table in either directory (`create-a-conditional-rule-in-the-editor-86a92887.md`) belongs to Print Condition Rules and holds two fields. Group 4's failure mode did not recur.

**9. Minor: paraphrase inside rationale text.** Step 24 renders the parenthesis counter-examples as `'Condition1 ) And ( Condition2'`; the corpus has `Condition1) And (Condition2`, no spaces — and a **third** counter-example the graph drops: `Condition1) And (Condition2) Or (Condition3`. Not a `sourceQuote` field, so rule 1 holds, but it is inaccurate transcription.

### Resolvable only at the live UI
- **Operator values.** The corpus never enumerates them — only *"equals, not equals, is greater than, etc."* plus named specials (In, Not In, Within, Any, Every). `validValues: []` is correct and cannot be improved from disk.
- **The event → column-B Data Object mapping.** Stated as a dependency, never tabulated. Note the contradiction the corpus leaves open: `events-triggers-72339a13.md` offers Purchase Order Save / Line Item Save / Transmit as audit-rule events, yet Table 2 has **no** Purchase Order data objects. Only the live UI resolves that.
- **Column E's own value list**, and the E auto-population algorithm.
- **Custom 01–NN / Org Unit 1–6 range expansion** to real labels (client-configured).
- **Exception level count and blocking threshold** — client-defined, set in Workflows/Settings.
- Whether Insert/Remove exist on the Validation Conditions page; whether an Inherited toggle exists on the Validation and Random tabs (summary pages assert inheritance, procedures document no control). The graph correctly refuses to borrow the Custom control for either — keep that refusal.

**Bottom line:** the two named headline failures are fixed and verifiable — Table 1 is 8/8, Table 2 is 13/13 and 278/278, `67302876.md` is fully in, the Random numeric input and all five list controls are present, and every quote I checked is verbatim. The page is no longer half-built. It is now over-built in ids and still under-built on the Validation Actions page, which is the same category of miss the run existed to eliminate.