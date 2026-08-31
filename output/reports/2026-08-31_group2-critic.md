Corpus root: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/` (paths below are relative to it, as in the graph).

---

# Group 2 Completeness Critique

## 1. Missing configuration — named

### Audit Rules — the Condition Editor is half-built (worst gap in the set)

The refuter killed both `ConditionDataObject1` and `dataObject` and explicitly instructed "re-extract once from `the-condition-page-5d4ea870.md`." **No re-extraction happened.** The graph now has *zero* Data Object field. Columns B and E of an 8-column editor are gone, and B is the column that gates every other column.

`admin-guides/the-condition-page-5d4ea870.md` carries, verbatim and enumerated:
- **Table 1, row B: Data Object — 10 values**: Attendee Totals, Budget, Detail, Detail Allocation, Employee, Line Item Attendee, Request, Request Exception, Vendor Remittance, Vendor Ship From.
- **Table 1, row E: Data Object** ("The system provides the option that best suits the previous choices. Change it if necessary.") — missing.
- **Table 1, row G: Right Parenthesis** ("Select zero to three parentheses…") — missing. `ConditionLeftParenthesis` survived; its mirror did not.
- **Table 2 — a complete Field/Value catalog per data object**, ~250 enumerated field names across 10+ objects (Attendee Totals 4, Budget 15, Detail 22, Detail Allocation 5, Employee ~30, Line Item Attendee 13, Purchase Request 25, Purchase Request Distribution 3, Purchase Request Item 21, Request 60+). **Entirely untouched.** This is the single largest body of enumerable structural knowledge on the page and it is not in the graph at all. It also contains a design warning the graph loses: *"consider not creating conditions against employee fields… use the copydown functionality."*
- Operator semantics missing from `ConditionOperator`'s notes: *"If you use the In or Not In operators for expense types, you can select multiple check boxes"* and *"The Within operator defines a set of dates… Within Today -2."*

From `admin-guides/understand-conditional-expressions-9a165c46.md`, three hard constraints with no representation anywhere (not as note, not as edge):
- *"There can be up to three parentheses for both left and right sides"* and left count must equal right count.
- *"If the parentheses are omitted, and/or operations are carried out left to right. There is no precedence of and over or."* — `ConditionAndOr` has neither this note nor an edge. An agent building a 3-condition rule will get the wrong logic.
- ANY/EVERY operator qualification (see §3).

### Audit Rules — Validation Rules' own condition semantics

`admin-guides/validation-conditional-expressions-67302876.md` is completely unrepresented. It documents two data objects that exist *only* in Validation Rules — **Field Validation** and **List Validation** — plus a set of constraints that will silently break a validation rule:
- *"The Type and Id 01 fields must be included when using the Field Validation data object."*
- *"The only operator that can be used against the Id columns and the Type column is the equal operator."*
- *"the Id fields must all be used in numeric order 1 through n. For example, if you use Id 5 you must use Id 1 through Id 4 first."*
- *"The Detail Allocation data object can only be on the right-hand side of the expression."*
- *"When the List Validation object is selected, the List Validation Helper pane will appear on the right side of the page."*

The graph has a step named "Author a Validation Rule that corrects a field" whose Conditions orders (8, 9) reuse the Custom-tab Condition Editor fields wholesale. That is wrong for validation rules — none of the above applies to the Custom tab.

### Audit Rules — Random tab

- **The numeric input inside the Rule Type window is missing.** `RandomRuleType` captures Percentage/Sequential but not the number, which is the actual audit rate. `admin-guides/random-audit-rules-8b29a270.md` gives the bounds verbatim: *"(The maximum is 999,999.)"* for Sequential and *"(The maximum is 100 %.)"* for Percentage. Two documented range constraints, dropped on the floor.
- **`RandomExceptionVisibility` is missing.** `admin-guides/add-a-random-audit-rule-3127d83a.md` step 7 enumerates the same three values on the Random tab as on the Custom tab. Step-plan `g2-random-audit-rule-percentage` order 5 talks about setting visibility but has to write against `RandomExceptionCode` because no field exists.
- `RandomAppliesTo` has empty validValues, but `admin-guides/summary-the-basic-process-of-creating-random-audit-rules-e794c09f.md` documents an inheritance toggle on it too: *"whether or not the rule is inherited to the groups below it."*
- Pool-combining behavior from `admin-guides/groups-and-the-random-audit-rule-cccc54a3.md` (*"it is the 10th invoice from the collective group"*) is absent — this is exactly the kind of thing that makes a 3-group rule sample at 1/3 the expected rate.

### Audit Rules — list-level controls (4 documented verbatim, 0 captured)

Only `ruleActiveInactiveAction` survived. Missing:
| Control | File |
|---|---|
| **Modify** — *"select the rule you want to edit… Select Modify. The Audit Rule step appears."* | `admin-guides/edit-a-custom-audit-rule-6b5ffce1.md` |
| **Delete Selected Rows** + per-row checkbox — *"select the check box associated with the desired rule. Choose Delete Selected Rows."* | `admin-guides/delete-a-custom-audit-rule-1ba67b2e.md` |
| **rule-name link (view)** — *"select the name (link) of the rule you want to view"* | `admin-guides/view-a-custom-audit-rule-45537e5c.md` |
| **Remove** (Random) — *"On the Random tab, select the rule you want to remove. Select Remove."* | `admin-guides/remove-a-random-audit-rule-b2aee8f6.md` |
| **Remove** (Validation) + confirmation *"Remove selected audit rule(s)?"* | `admin-guides/delete-a-validation-rule-5a16827b.md` |

Copy is documented (`admin-guides/copy-a-custom-audit-rule-ba9c8aef.md`) but the corpus's own procedure omits the Copy click — a genuine doc defect worth recording as thin, not inventing.

### Routing Configuration — the second import mechanism is absent

The graph documents only the Excel/Browse/Import path. There is a whole parallel **overnight CSV batch import** with its own field spec:
- `admin-guides/import-settings-record-type-200-format-c244e3ab.md` — a five-column field table (Field Name / Definition / Required? / Description / Client Field Definition). It contains a field the Excel template does not: **Future Use 1 – Future Use 10** — *"The future\_use fields are currently not in use… They must be accounted for in the data file, but any data included in them will be ignored."* Omitting those columns breaks the file.
- `admin-guides/create-the-import-data-file-8b45c5f4.md` — the file spec: *"Format Type: Comma Separated Value, ASCII Text File / Default Field Delimiter: Comma / Enclosing Character: Quotation Mark / Record Delimiter: CRLF."* Zero representation.
- `tools-guides/over-night-hierarchy-mapping-import-available-059c9571.md` — **the hard cap: *"This on-demand Excel-based record can import up to 500 records. If you require a greater number… use the overnight Invoice Routing Hierarchy Import instead."*** Step 7's rationale mentions the overnight job but never the 500-record limit, which is the whole reason it exists.
- `tools-guides/import-hierarchy-mappings-information-8b4a69e7.md` — *"The Excel template may differ in field naming and inclusion or exclusion of certain Custom and Future Use fields"*: the template is explicitly not stable, and the graph asserts it as if it were.

Minor missing controls on the Hierarchy Mapping List (`tools-guides/search-for-hierarchy-mappings-1dea6bb6.md`): the search-execute control (*"Click the magnifying glass () icon to begin the search"*) and the reset control (*"Clear the result set by clicking the x () icon"*). Both are real page controls; neither is a field node.

### Exceptions

Coverage of the four-row Exception Fields table is complete **except** `exceptionLevel` (see §3). Missing context, low value but real: `admin-guides/add-exceptions-7b73d8f0.md` names four alternate entry points — *"From the Exceptions helper pane within the Audit Rules tool, Workflows tool, Image Handling tool, and Invoice Processor"* — the graph's `newButton` note covers only the permission gate. `admin-guides/edit-exceptions-1c6e5030.md` carries a genuinely operational rule the graph has nowhere: *"If the exception level changes and there is a setting to restrict submission at that exception level and the invoice has already been submitted, then the restriction is not applied."*

---

## 2. Did the raw-HTML-table fix work? — **Untested. The regression could not fire here.**

Blunt answer: I grepped `<table` across every file matching *routing configuration | hierarchy mapping*, every file matching *audit rule*, and every `*exception*` file in both guide directories. **Zero hits.** Not one source file for these three pages contains a raw HTML table. 186 files corpus-wide have `<table`; 31 of them are in admin-guides and none belong to Group 2's pages.

So the Group 1 defect class was not exercised by Group 2 and this run proves nothing about the fix.

Worse, the metadata is unreliable. Of the **5 fields flagged `fromRawHtmlTable: true`**, I verified each:

| Flagged field | Claim | Reality |
|---|---|---|
| `exceptionLevel` | true | **FALSE** — `add-exceptions-7b73d8f0.md` has 0 `<table`, 0 `<td`. Markdown pipe table. |
| `exceptionMessage` | true | **FALSE** — same file, same reason. |
| `preventPaymentRequestSubmissionExceptionLevelExceedsX` | true | **TRUE** — verified programmatically: the row sits at offset 3509 in `invoice-settings-cace748d.md`, inside the `<table>` opened at 3298 with no intervening `</table>`. |
| `preventPurchaseOrderTransmissionExceptionLevelExceedsX` | false | correct (markdown) |
| `preventPurchaseRequestSubmissionExceptionLevelExceedsX` | false | correct (markdown) |

**4 of 5 flags are false positives.** The one true raw-HTML recovery was then correctly dropped as belonging to Invoice Settings. Net contribution of the raw-HTML fix to Group 2's kept fields: **zero**. Do not read "5 recovered" as evidence the fix works — treat that flag as unvalidated until a group whose pages actually use HTML tables is run.

One thing I can confirm honestly: the three approval-adjacent HTML-table files (`filter-authorized-approvers-by-workflow-approval-step-aae69350.md`, `additional-approver-situations-fbb5034c.md`, `global-level-a53bf756.md`) contain *illustrative example* tables (approval chains, approver-limit sample rows, expense-type code grids), not settings tables. No settings were lost there.

---

## 3. Wrong drops — **yes, two, and both are the refuter contradicting itself**

### (a) `Exceptions.exceptionLevel` — the refuter wrote "KEEP the field" and it was dropped anyway

Refuter verdict, verbatim: *"KEEP the field - it is row 2 of the same canonical settings table, quote byte-exact… validValues is DEFECTIVE and must be emptied."* The instruction was **empty the array, keep the row**. Instead the entire field was discarded. Verified: `Exceptions.fields` contains no `exceptionLevel`.

Consequence, visible in the plan itself: `g2-blocking-exception-audit-rule` order 3 sets exception severity while `"page": "Exceptions"` but has to reference `"field": "ExceptionLevel"` — an Audit-Rules field — and the rationale contains an apology for it (*"the identical field definition is documented on the Exceptions page… so the same value can be authored from either entry point"*). The graph now says the severity control does not exist on the page whose entire purpose is defining severity. `admin-guides/add-exceptions-7b73d8f0.md` is unambiguous: *"Exception Level | Type any number between 0 and 99."*

Restore as: `exceptionLevel`, type `number`, `validValues: []`, notes carrying the 0–99 range, the ascending-severity convention, the Invoice Processor query use, and the workflow-blocking pointer.

### (b) `Audit Rules.ValidationAction` — refuter wrote "KEEP", dropped anyway

Refuter verdict, verbatim: *"Field is real (wizard step 6, Actions page) and all three values are bulleted verbatim — KEEP. But the quote is NOT a contiguous substring… Fix by trimming."* The prescribed fix was a quote trim. The field was deleted instead.

I verified the trimmed quote is contiguous — this exact string returns `True` against `admin-guides/add-a-validation-rule-0b31c4c0.md`:

```
Field update only: If the rule is triggered, it will update the specified field. The invoice will continue through the workflow.
```

and the full three-bullet block runs contiguously from there through *"…it may prevent invoice submission."* with only list indentation between bullets.

Consequence: `g2-validation-rule-update-then-exception` order 10 — the **branch point of the entire step**, the choice that decides whether orders 11–14 or order 15 are even reachable — is written as `"field": "(no field written — action-type selection)"`. The step plan is documenting a control the graph refuses to contain. Restore with validValues `["Field update only", "Exception only", "Update, then exception"]`.

### (c) Borderline — `operatorQuantifier` (ANY/EVERY)

The drop was defensible on label grounds ("Operator Quantifier (Any/Every)" is invented; there is no A–H column for it). But the refuter overreached in saying the content is Expense-only. The generalizing sentence lives in the Invoice Audit Rules guide: `admin-guides/understand-conditional-expressions-9a165c46.md` — *"An operator is further defined by Any and Every depending on the type of data being compared"* — with **ANY** and **EVERY** each defined as capitalized enumerated values. The example is Expense; the rule is not. Net effect of the drop: `ConditionOperator` has empty validValues *and* no note about multi-value semantics, so nothing survives. Correct disposition is a note on `ConditionOperator`, not deletion.

The other ~15 drops (duplicates, report columns, run counts, prose-as-field, wrong-page thresholds) are all sound. The over-drop bias did **not** broadly persist — it narrowed to a specific new failure: **the pipeline is not honoring "KEEP with fix" verdicts.** It treats any non-clean verification as a delete. That is a mechanical bug, not a judgment bias, and it will recur on every group.

---

## 4. Mis-assigned surviving fields

Only one, and it is arguable rather than clearly wrong:

- **`Audit Rules.ExceptionLevel`, `ExceptionCode_New`, `ExceptionMessage`, `ExceptionEditableByGroups`** are all sourced from `admin-guides/add-exceptions-7b73d8f0.md` — the **Exceptions** page's field table — and assigned to Audit Rules on the reasoning that the New Exception dialog is reachable from the wizard. That is defensible (the dialog genuinely opens there: *"Select New. The New Exception window appears."*), but the result is a graph where the canonical definitions live on the borrowing page and the owning page has none of them. With `Exceptions.exceptionLevel` wrongly dropped (§3a), the Exceptions page ended up with **zero** of its own four settings-table rows for severity. Fix by restoring the four on Exceptions and marking the Audit Rules copies as the inline-dialog instances.

Everything else checks out. `FromDataSource`/`ToDataSource`/`ExecuteActionWhen`/`ValidationEvent` are correctly on Audit Rules (the Validation tab is a tab of Audit Rules — `admin-guides/access-validation-rules-5f8dbf9e.md`: *"Select Audit Rules (left menu)… Select Validation."*). The three "Prevent … exceeds X" thresholds are correctly held as cross-page dependency edges rather than fields. `Routing Configuration`'s import-template fields are correctly on that page.

---

## 5. Genuinely thin — ranked, live-UI spot check required

1. **The Custom tab Event dropdown: 6 values or 18?** The field table in `add-a-custom-audit-rule-43e3f9aa.md` lists **6**. The reference section `admin-guides/events-triggers-72339a13.md` — *for custom audit rules* — lists **18**, adding Payment Request Allocation Save, Payment Request Attendee Submit, Payment Request Budget Submit, Payment Request Manual Assign, Payment Request Import Assign, Purchase Order Line Item Save, Purchase Order Save, Purchase Order Transmit, Purchase Request Distribution Save, Purchase Request Item Save, Purchase Request Save, Purchase Request Submit. The corpus contradicts itself and hedges with "for example." The graph committed to 6. If the real dropdown has 18, every PO/PR audit rule is unreachable through this graph. **Nothing in the corpus resolves this. Open the dropdown.**
2. **The Condition Editor's Data Object list per event.** Table 1 says the list *"is based on the event that triggers the rule"* but never gives the mapping. Table 2's per-object field catalog includes Purchase Request / Purchase Request Item / Purchase Request Distribution objects that have no corresponding event in the 6-value Event list — same contradiction as #1, from the other side. Needs one screenshot per event.
3. **Legacy UI vs New UI on the Custom tab** (see §6). Determines whether the control is `Create` or `New`, whether viewing opens a wizard or a Quick View panel, and what the tab is called.
4. **The Rule Type window's numeric input.** Corpus says *"Percentage and then enter the appropriate percentage"* / *"Sequential and then enter the appropriate number"* — no label, no field name, no type. Bounds are documented (100%, 999,999) but the widget is not. Unresolvable from text.
5. **Whether the Random tab's Applies To carries an Inherited/Not Inherited toggle.** `add-a-random-audit-rule-3127d83a.md` omits it; `summary-…-random-audit-rules-e794c09f.md` implies it. One glance settles it.
6. **Exception Visibility label wording.** Three competing strings in the corpus: *"Invoice Owner, Approver, and Invoice Processor"* (custom), *"Invoice Owner, Approver and Invoice Processor"* — no Oxford comma (validation), *"Invoice User, Invoice Approver, and Invoice Processor"* (random summary). The graph carries all three variants as separate value sets. Only the UI knows.
7. **The Routing Configuration Actions menu.** Only `View Import Details` is documented. Whether the menu holds anything else (delete a mapping, export) is unknown — and there is *no* documented way to delete a single mapping from the UI, only via the import's Delete? flag. Verify that's really true.
8. **The Exceptions page's list columns and whether a Copy control exists.** The corpus repeatedly says lower-level admins *"can copy this exception"* but never documents a Copy button anywhere.

---

## 6. Doc drift and New Experience variants

**Yes — one of the three pages is documented in two UI versions and the plan papers over it.**

- `admin-guides/configure-custom-audit-rules-new-ui-3cc2360e.md` and `admin-guides/configure-custom-audit-rules-legacy-ui-6cb4534e.md` are sibling section parents, both `version: 2026_08`. The Custom Audit Rules area of this page is **explicitly bifurcated by SAP**, not by accident.
- The paired topics differ substantively in exactly two places:
  - **Create vs New:** `add-a-custom-audit-rule-0f1d320e.md` = *"On the **Custom Rules page**, select **Create**"*; `add-a-custom-audit-rule-43e3f9aa.md` = *"On the **Custom page**, select **New**"*. The step plan's order 7 note ("treat Create and New as the same control across UI versions") is a reasonable runtime hedge but it discards the fact that the corpus knows *which* is which.
  - **View is a different interaction entirely.** `view-a-custom-audit-rule-45537e5c.md` (legacy): name link → *"The Create New Custom Audit Rule page appears"* → Next/**Finish**. `view-a-custom-audit-rule-a4c909b3.md` (new): *"On the **Custom Rules tab**, click the name of the rule… **The Quick View panel appears on the right side of the page**, showing the rule details and exception details."* A Quick View panel and a re-entered wizard are not the same control. The graph captures neither.
  - copy/edit/delete/deactivate pairs are byte-identical — no drift there.
- **Tab/page naming is unstable across all of it:** "Custom page", "Custom tab", "Custom Rules page", "Custom Rules tab", "Custom Audit Rule List page" all appear in `2026_08` files. Same for Routing Configuration: `tools-guides/access-the-routing-configuration-page-be1f9063.md` says *"Click Administration > Invoice > Routing Configuration. **The Hierarchy Mapping List page appears**"* while `tools-guides/access-hierarchy-mappings-import-708f5fdc.md` says *"From the **Invoice Processing Admin menu**, click Routing Configuration. **The Routing Configuration page appears**"* — different menu depth *and* different landing-page name for the same click.
- **No "New Experience" variant exists for Exceptions or Routing Configuration.** The `*-new-experience-*.md` files in this corpus cover Purchase Order Policy and Purchase Order Matching Rules only — different pages, out of Group 2's scope.
- Nav confirmed correct in the plan: Audit Rules is *"Administration > Invoice > **Audit Rules (left menu)**"* (all four `access-*` files), **not** under Invoice Processing Admin. Exceptions *is* under Invoice Processing Admin. Routing Configuration is documented both ways.
- One drift note the graph does carry correctly and should keep: the Validation Rules site setting lives under **Concur Expense** site settings (`Administration > Expense > Site Settings`), not Invoice — a cross-product gate that will surprise an Invoice-only admin.