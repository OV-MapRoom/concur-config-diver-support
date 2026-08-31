## 1. Missing configuration — named files

**A. `Map Invoice Concept Fields` is not a documented page.** Zero hits corpus-wide for `"Map Invoice"` and `"concept field"` (both dirs + release notes). The only `"oncept"` hits are Capture "fingerprinting concepts", validation "General Concepts", Peppol, workflow terminology. Coverage "thin/0 fields" is not thin — the node has **no documentary basis at all** and should be dropped or renamed to whatever it was meant to proxy (`map-to-the-general-ledger-ada4de6b.md` is the only mapping-ish accounting topic, and it is 25 lines of prose with no controls).

**B. `configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md` — the copy-down source-field catalog. Missed entirely.** Raw `<table>` at line 65, duplicated verbatim at line 122 of `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md`. Enumerates exactly what `copyDownField` / `copyDownFieldPO` (both currently `validValues: []`) can be set to:
- PO Header = **11**: `Custom 1–24`, Currency, Description, Discount Percentage, Discount Terms, Name, Net Payment Terms, Order Date, Requested Delivery Date, Shipping, Tax
- PO Line Item = **10**: `Custom 1–20`, Account Code Description, External ID, `Line Number Expense Type`, Quantity, `Requested`, `Delivery Date`, Supplier Part ID, Tax, Unit Price
- PO Distributions = "No Configuration / Not a "Source" choice: / Always copies down if available data on PO / Ensure PO and Invoice Distribution Forms "match": Custom 1 to Custom 1"

Two compressed ranges, and note the **en-dash** `Custom 1–24` / `Custom 1–20` vs the hyphenated `Custom 1-20` in Accounting Administration. Also missed: the prose constraint that PO Distributions is *not* offered in Copy Down Source — which qualifies `copyDownSource`'s 4 values.

**C. `overview-attendee-forms-and-fields-96aa4b66.md` (430 lines) — the 34-row attendee field catalog. This is the "long table skipped for being long" failure repeating.** Field Name/Description rows: Attendee Count, Attendee Name, Attendee Title, Attendee Type, Company, Company Category 1/2 × {Authorized, Submitted} × {Amount YTD, Amount Previous YTD} (8), Created By (Private List), Currency Key, `Custom 1-20`, Attendee Entry, Employee Amount Previous Year, Employee Amount YTD, Employee Category 1/2 × … (8), External ID, First Name, Last Name, Middle Initial, Suffix, Total Amount Previous Year, Total Amount YTD = **34**, one compressed range. This is the enumeration for `addFieldsToFormsFieldSelector` at ConfigStep-05 order 2.

Same file, two raw `<table>`s (lines 422, 424) documenting a **named Modify Form control that is not in the graph**: the `Created By (Private List)` check box in the Modify Form window for form type Expense Attendee — it is what makes an attendee list shared vs private. ConfigStep 05 order 3 uses a bare `modifyFormButton` instead.

**D. Connected Lists tab — the 5-step "Add a New Connected List Definition" wizard (`add-a-new-connected-list-definition-fc9f852a.md`) is a 7-row settings table; the graph captured 1 of 7.** Step 3 table rows: Field Name, Data Type, Default Value Type, Field Default Value, Copy Down Source, Field, Access Rights. Only `Connected List - Default Value Type` survived. Also missing: the `Connected List Definition Name` text field (Step 1), the Previous button, the Step-2 constraint "The number of fields selected must equal the number of levels in the list", the Step-5 Assign to Forms selector. `connectedListsTab` sits in the graph as a bare `unknown` node over a fully documented sub-surface (`access-connected-lists-39dd2408.md`, `modify-a-connected-list-definition-8f8d8910.md`, `work-with-connected-list-definitions-4dd05e1d.md`, `assign-a-connected-list-to-a-form-5111fbf5.md`, `connected-list-overview-3fc65ecf.md`).

**E. `formType` has recoverable verbatim values that were never collected.** Ten distinct values appear in "In the Form Type list, select/click X" procedures across the corpus: Employee, Expense Attendee, Payment Request Allocation, Payment Request Attendee Detail View, Payment Request Header, Payment Request Line Item Details, Payment Vendor, Purchase Request Item (`hiding-the-url-field-from-purchase-request-item-form-6f1fe3e4.md`), Purchase Order Header (`modifying-fields-b16a6078.md`), Line Item Details (`modifying-fields-b16a6078.md`, Launch URL condition). These are *dropdown selections*, unlike the 8 in `forms-overview-533281bd.md`, which are form descriptions — and they don't agree (see §6).

**F. `different-processes-for-different-options-f133ed25.md` (260 lines) — 22-row feature × scope matrix (Global / Attendee Type / Expense Types / Group). Missed.** It is also the topic that *resolves* the page-ownership question ConfigStep 05 orders 7–8 flag as unresolved: "By expense type within the policy: Set based on the expense type and policy, **using the Expense Types page**."

**G. Smaller, real, missed:**
- `field-configuration-information-5813462a.md`: site setting **`TOP_VALUE_ON_MRU`** ("Setting this value to 0 disables the Most Recently Used functionality") — a named setting with an enumerated value; the **500-item** thresholds that flip a simple list to a search-wheel text field and cap connected lists; "you cannot mark any connected list fields below it as read-only" (a hard constraint on `accessRights`); "must configure at least two fields to be associated connected list fields".
- `hiding-the-url-field-...-6f1fe3e4.md`: **"In the Access Rights section, select hidden for the roles that should not see the URL field."** `accessRights` is modelled as a single dropdown with 3 values; the corpus describes a **per-role section** (employee / approver / processor per `invoice-form-data-content-type-6c4a88d2.md`). Structural mis-model, not just a missing value.
- `editing-expense-types-87b972d0.md`: "The Undefined expense type name cannot be edited" — a constraint on `expenseTypeName` not captured (only the delete constraint was).
- `searching-for-an-expense-type-b0e53752.md`: the **Search** button and the page-number pagination ("By default, the Expense Types page displays 35 expense types") — `findExpenseTypes` exists, its submit control does not.
- `change-the-status-of-an-expense-type-cf452b6a.md`: Done button + Shift/Ctrl multi-select on Modify Policy.
- Spend category **codes** (ACCNT, ADVTG, … 50 of them) and the **Recommended Use** column are enumerated in both catalogs and not captured — the catalog was taken at 50 of ~150 enumerated cells.
- `form-configuration-information-fa4ab4c2.md`: "Every policy has one assigned request header form" / "You assign employee forms to groups, not policies" — cardinality rules, no dependency edge.

## 2. Value sets — counts correct, wiring almost entirely broken

I counted every source. **Counts are good; 16 of 18 sets are attached to nothing.**

| # | appliesToField | count | source count | verdict |
|---|---|---|---|---|
| 1 | `spendCategory` | 50 | 50 (`list-of-spend-categories-8b2de886.md`, `grep -cE "^[A-Z]{5}$"` = 50) | ✅ count + wiring |
| 2 | `Data Type` | 8 | 8 bullets | count ✅ / **orphan** (field is `dataType`) |
| 3 | `Control Type` (Modify Fields) | 8 | 8 Data Type rows, **10** distinct control types; field carries 10 | **count wrong for values** / orphan (`controlType`) |
| 4 | `Control Type` (Terminology) | 9 | 9 Field Data Type rows, **11** distinct control types; field carries 11 | **count wrong for values** / orphan (`controlTypeTerminologyTable`) |
| 5 | `Default Value Type` | 3 | 3 | count ✅ / orphan (`defaultValueType`) |
| 6 | `Copy Down Source` | 4 | 4 | count ✅ / orphan (`copyDownSource`) |
| 7 | `Copy Down from Purchase Order if available` | 2 | 2 | count ✅ / orphan (`copyDownFromPOIfAvailable`) |
| 8 | `Access Rights` | 3 | 3 | count ✅ / orphan (`accessRights`) |
| 9 | `Form Type` (general) | 8 | 8 (`forms-overview-533281bd.md`) | count ✅ / orphan (`formType`) |
| 10 | `Form Type` (PR) | 3 | 3 (`forms-and-fields-616d64bc.md`) | count ✅ / orphan (`formType`) |
| 11 | Capture Header Fields | 11 | 11 (admin) | count ✅ / **orphan, no such field exists on any page** |
| 12 | Capture Line-Item Fields | 8 | 8 | count ✅ / **orphan, no such field** |
| 13 | `Connected List - Default Value Type` | 3 | 3 | ✅ count + wiring |
| 14 | Forms and Fields page tabs | 5 | 5 | count ✅ / **orphan, no such field** |
| 15 | `segmentName` (Request) | 5 | 5 | count ✅ / **orphan — `segmentName` was DROPPED; survivor is `segment_name`** |
| 16 | `segmentName` (Line Item) | 1 | 1 | count ✅ / orphan |
| 17 | `segmentName` (Allocation) | 1 | 1 | count ✅ / orphan |
| 18 | `segmentName` (concept page) | 5 | 5 | count ✅ / orphan |

**The exact failure you warned about happened:** the drop pass killed a field named `segmentName` (missing `CONCUR_INVOICE/` path prefix) and kept `segment_name`, but nobody re-pointed the four Accounting value sets. All four Segment Name catalogs — the only enumerations Accounting Administration has — are attached to a name that no longer exists in the graph. The Forms-and-Fields sets have the same disease structurally (label-cased `Data Type` vs camelCase `dataType`) because the drop pass kept the camelCase copies and the value sets were written against the label-cased ones.

`spendCategory`'s 50 values are verbatim-perfect, in source order, including the two en-dashes (`Cash Advance – Standard`, `Personal Car – Parking Expense`). Note `importSpendCategory` still carries `validValues: []` — the same 50 apply per `available-field-formats-8b49a3d9.md`.

## 3. Raw HTML tables

`grep -c "<table"` across both dirs: **31 files in admin-guides, exactly 1 in tools-guides.** Page-relevant subset:

| File | `<table` | Status |
|---|---|---|
| `configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md` | 5 | **1 settings table MISSED** (PO Header/Line Item/Distributions, §1B); 4 are before/after examples, correctly skippable |
| `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` | 5 (4 detected) | Same content duplicated — **MISSED twice** |
| `overview-attendee-forms-and-fields-96aa4b66.md` | 2 | **Both MISSED** — Search for Attendees / Search for Duplicates, source of the `Created By (Private List)` control |
| `configuring-forms-and-fields-in-capture-processing-7c14446c.md` | 1 | Captured (11 + 8). **Missed from the same file:** "The Capture Processing vendor form features a single field, **Vendor Code**, which is the only field that will be identified and captured" |
| `what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md` (**tools-guides**) | 1 | **MISSED — and it contradicts the admin version.** Group-4 skew repeating |
| `global-level-a53bf756.md` | 1 | Illustrative search-order matrix ("Table 1"), not a settings table — correctly skipped |

The tools-guides OCR table has **12 header entries, not 11**: it adds `Vat 2 (Secondary Tax – Canada PST/QST) *` and words Vat 1 differently — `Vat 1 (Primary Tax - Canada GST/HST, Australia GST, US Tax, VAT UK/Japan) **` vs the admin file's `Vat 1 (Australia GST, US Tax, VAT UK/Japan) *`. Line-item side is 8 in both. Record both; do not reconcile.

## 4. Wrong drops / bad survivals

Drops were sound — 39 of 41 were true duplicates and 2 were path/quote defects, all correctly reasoned. `segment_reorder` was rightly refused (invented label for an unnamed mechanism). `segment_name_line_item` / `segment_name_allocation` folding into `segment_name` is right.

**But the repair let three things through it should not have:**
1. **`account_code`, `inherited_code`, `inherited_level` exist on BOTH the Expense Types page and Accounting Administration.** `grep -rln "Inherited Code"` returns exactly one file corpus-wide: `account-codes-tab-2acab3a1.md`, which is the **Accounting Administration** Account Codes tab. There is no documentation placing any of the three on the Expense Types page. These three Expense Types copies are the same class of duplicate the drop pass removed everywhere else, and they slipped through because the names collide across pages instead of within one.
2. **`spend_category` was dropped for leaving `validValues` empty — but `importSpendCategory` survived with `validValues: []`** and the same 50 apply. Inconsistent standard.
3. **The `Control Type` duplicate that was dropped had the *verbatim* sourceQuote; the survivor `controlType`'s quote is a reformatted table.** The refuter admits this ("Its one advantage is that its sourceQuote IS verbatim, unlike controlType's reformatted table"). Under LOCKED RULE 1 the graph kept the copy that fails exact-substring and dropped the one that passes. Same pattern on `Default Value Type` and `Tool Tip`. Re-verify those three survivors' quotes with `grep -F` before shipping.

## 5. Mis-assigned fields

| Field | Assigned | Documented location |
|---|---|---|
| `account_code`, `inherited_code`, `inherited_level` | **Expense Types** | Accounting Administration, Account Codes tab (`account-codes-tab-2acab3a1.md`) — sole source. **Delete from Expense Types.** |
| `importExpenseTypeName`, `importNewExpenseTypeName`, `importAccountCode`, `importSpendCategory`, `importActivate`, `importPolicy`, `importLedger` (7) | Expense Types | `Administration > Invoice > Expense Type Import` (left menu), documented in **tools-guides** (`access-the-invoice-processing-expense-type-import-page-3f5d3994.md`, `available-field-formats-8b49a3d9.md`). Separate page node, not the Invoice Processing Admin > Expense Types page. Graph flags this in prose but still carries them. |
| `expenseTypeActiveStatusAction`, `expenseTypeStatusDisplay` | Expense Types | Policies > *policy* > Expense Types > Modify Policy (`1e641b70`, `cf452b6a`). Both source topics say "You create and manage the expense types listed on this page from the Expense Types area" — i.e. *this* page is Policies. |
| `excludeAttendeeTypes`, `defaultAttendeeType` | Expense Types | `Administration > Invoice > Policies > Expense Types > Modify Expense Type Properties` (`f4c6820d`, `65d01766`). **Resolvable:** `different-processes-for-different-options-f133ed25.md` scopes both to "the Expense Types page" — cite it and the assignment becomes earned rather than assumed. |
| `validationsTab` | Forms and Fields | Contradicted — see §6.2. |

## 6. Where the corpus leaves structure undetermined — ranked

1. **Where Validations lives.** `terminology-4b6cb686.md` enumerates five Forms and Fields tabs including **Validations**. `access-validation-rules-5f8dbf9e.md` routes there via **`Administration > Invoice > Audit Rules (left menu) > Validation`** — a different page entirely. Two topics, both 2026_08, place the same tab in two tools. The graph carries `validationsTab` on Forms and Fields with no note.
2. **Data Type / Control Type: two irreconcilable tables in one guide.** `modifying-fields-b16a6078.md` gives 8 data types (incl. `Connected List`, `Numeric (floating point)`, `Amount (currency)`) → 10 control types (incl. `Drop-down List`, `Edit (w/ Connected List Helper)`). `terminology-4b6cb686.md` gives 9 field data types (incl. `Any (Custom)` and `Key` — "Neither visible nor selectable by the administrator"; **no Connected List**) → 11 control types, and lists `Integer` and `Amount` *as control types*, and puts `Launch URL` under `List` where Modify Fields puts it under `Text`. Both captured, both correct as recorded; the 9 terminology **data type** values were never captured as their own set. Almost certainly provisioning/vintage divergence, not an error to fix.
3. **Form Type has no authoritative list.** The dropdown is described but never enumerated ("This list displays the various form types available for configuration"), the on-page list is a figure marked `English Only`. Three partial, non-matching enumerations exist: 8 descriptive names (`forms-overview-533281bd.md`), 3 PR names (`forms-and-fields-616d64bc.md`), and ≥10 verbatim dropdown selections scattered through procedures (§1E). `Payment Request/Purchase Request Line Item Details` (overview) vs `Payment Request Line Item Details` (procedures) vs `Line Item Details` (Launch URL condition) are three renderings of what may be one or three entries. **The corpus does not permit a single list here.**
4. **Segment Level labels.** `adding-a-new-segment-d6dfb07b.md` = `Request` / `Line Item` / `Allocation`. `account-code-hierarchy-869f7eca.md`, one paragraph apart, uses `Request` and **`Request Line Item`**. Same topic also names the criterion `Policy` where the segment procedure names it `Policy Name`. Neither corrects the other.
5. **Capture supported-fields catalog: 11 vs 12 header entries** across admin and tools guides (§3), with `Vat 2 (Canada PST/QST)` present in one and absent from the other. Reads as provisioning/region-dependent.
6. **`Access Rights` is a role matrix described as a scalar.** "Indicates the level of access granted to *each role* that uses a form with this field"; `6f1fe3e4` calls it "the Access Rights **section**"; `6c4a88d2` names employee / approver / processor. The corpus never enumerates the role axis on the Forms and Fields page itself, so the matrix's dimensions are undetermined from this corpus alone.
7. **Import "All fields are required" vs rename-only columns.** `available-field-formats-8b49a3d9.md` opens "All fields are required" then defines `New Expense Type Name` as a rename-only column and `Ledger` with a blank-value fallback. Self-contradictory; unresolved.
8. **Attendee control ownership: Expense Types page vs Policies > Expense Types.** Every procedure routes through Policies; `f133ed25.md` assigns the scope to "the Expense Types page". Partially resolvable (§5) but the corpus never states it as a page identity.
9. **`Modify Fields` window contents are explicitly non-deterministic** — "The following figure is representative of the available options and changes field options depending on a preceding choice"; `Default Max Length` and `Default Validation` each "may or may not appear". A crawler must treat absence as valid state, and the full field set is not knowable from documentation.

## 7. UI variants

**No legacy/New Experience split exists for any of these pages, and no `both` claim was made — so nothing unearned.** Verified: no `*new-experience*` or `*legacy*` filenames for Expense Types, Forms and Fields, or Accounting Administration (the four such files are PO Policy, PO Matching Rules, Invoice Manager, Unassigned Invoice, plus `configure-custom-audit-rules-legacy-ui`). `undifferentiated` is correct throughout.

Two things to record rather than act on:
- `terminology-4b6cb686.md`: "The Forms and Fields page allows the administrator to manage Invoice forms and fields **within the current user interface**" — the corpus's only hint that another Forms and Fields UI exists, and it documents nothing about it. Single hedge, no variant topic.
- The gerund/imperative topic pairs (`changing-…-1e641b70` vs `change-…-cf452b6a`; `editing-…-87b972d0` vs `edit-…-c6d0b6fc`; `filtering-…-c10a54ab` vs `filter-…-f4c6820d`; `setting-…-39cd5f09` vs `set-…-65d01766`) are **not** UI variants — I checked front matter, all carry `deliverable_id: 41460672`, `version: 2026_08`. They are the same content republished from two SAP setup guides (Expense Types vs Attendees) flattened into one deliverable. The Active/`Activate` label difference between `1e641b70` and `cf452b6a` is a wording drift inside that duplication, not a UI generation — which the graph already records correctly.