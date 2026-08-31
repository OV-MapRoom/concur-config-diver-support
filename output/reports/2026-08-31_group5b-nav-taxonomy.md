# Group 5B — Navigation taxonomy and corpus file inventory (Map phase)

# Group 5B — Page Identity & Navigation Survey

Corpus: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`, SAP 2026_08, Professional Edition, crawled 2026-08-29.
Both guide directories searched with equal weight (`admin-guides` 1209 files, `tools-guides` 650 files). Release-note
directories were not used as a source and are not cited.

Every quote below was verified with `grep -F -c` against its cited file before emission (43 + 16 quotes, all pass).

---

## 1. Tax Administration — `page.tax-administration`

**documentedBasis: rich. coverageGuess: good. uiVariant: undifferentiated.**

### Existence
`concur-invoice-professional-edition-admin-guides/tax-administration-tool-0f5fff3c.md` is a dedicated topic:
> "The Tax Administration tool is used to configure and maintain the tax authorities for each country"

The page is confirmed as a landing page by name in three separate procedures ("The Tax Administration page appears.").

### Distinct documented click paths (5)
| # | Path | File |
|---|---|---|
| 1 | Administration > Invoice > Tax Administration (left menu) | admin/configure-predefined-tax-codes-6b42509f.md — "1.  Select Administration > Invoice > Tax Administration (left menu)." |
| 2 | Administration > Invoice > Tax Administration (left menu) — *imperative twin* | admin/step-7-optional-configure-predefined-tax-codes-be8bc5b8.md — "1.  Click Administration > Invoice > Tax Administration (left menu)." |
| 3 | Administration > **Invoice Admin** > Tax Administration | admin/step-3-configure-the-service-14c3ef13.md — "1.  As the Invoice Tax Administrator, click Administration > Invoice Admin > Tax Administration. The Tax Administration page appears." |
| 4 | Administration > Invoice, then Tax Administration (left menu), then Tax Authorities tab | admin/step-3-access-tax-authorities-2fae4ae3.md — "2.  Click Tax Administration left menu. The Tax Administration page appears." |
| 5 | Administration > Invoice > Tax Administration > Tax Authorities tab (prose form) | admin/the-basic-process-12a5686d.md |

Paths 1 and 2 are the gerund/imperative republication trap: same content, different verb. Both are recorded as
separate evidence because each is a distinct verbatim attestation, but they are NOT a UI variant.

### Tabs attested (page structure, not fields)
- **Tax Authorities** — "3.  Click the Tax Authorities tab." (step-3-access-tax-authorities-2fae4ae3.md)
- **Expense Type Groups** — "Administration > Invoice > Tax Administration > Expense Type Groups tab" (the-basic-process-12a5686d.md)
- **Expense Types Group** — "1.  On the Expense Types Group tab, select from the Tax Authority list." (step-5-...-e8d87361.md)
  → **CONTRADICTION (label):** the same tab is spelled *Expense Type Groups* in one topic and *Expense Types Group*
  in another. Both recorded; neither reconciled. A crawler must accept either label.
- **Vendor Groups** — "1.  On the Vendor Groups tab, select from the Tax Authority list." (step-6-...-d8b7786d.md)
- **Tax Code** — "2.  Click the Tax Code tab." (both configure-predefined-tax-codes-6b42509f.md and step-7-...-be8bc5b8.md)
- **Tax Validation** — "2.  Click the Tax Validation tab." (step-3-configure-the-service-14c3ef13.md)

**Ambiguity worth recording:** the Tax Validation *tab* is then referred to as the "Tax Validation page"
("1.  On the Tax Validation page, configure the following options:", same file; and the whole of
work-with-the-tax-validation-page-options-c3fe1df5.md). The corpus does not settle whether Tax Validation is a
tab of Tax Administration or a page in its own right. Treated here as a tab of Tax Administration, because the
only documented way to reach it is by clicking the tab on the Tax Administration page.

### Aliases
- "Tax Administration tool"
- "Tax Administration link" — "Assign this role so that the user can see and work with the Tax Administration link." (step-2-...-b7f391c8.md)
- "Tax Administrator link" — "this user may now access the Tax Administrator link, which displays the Tax Administration tool." (step-3-configure-the-service-14c3ef13.md)
  → **CONTRADICTION (alias):** one topic calls the menu entry *Tax Administration*, another calls it
  *Tax Administrator*. Do not collapse; a click-path resolver should try both strings.
- "Tax Administration page"

### Role gates — CONTRADICTION
- **Invoice Tax Administrator** — "3.  Under Available Roles, select Invoice Tax Administrator, then click Add." (step-2-...-b7f391c8.md);
  also "expose the Invoice Tax Administrator role in User Permissions" (step-1-enable-the-tax-validation-feature-sap-concur-staff-31fca0d8.md).
- **Tax Administrator** — "To add and manage tax authorities, the user needs to have the Tax Administrator role." (required-roles-81c8eace.md).

Two different role names for what appears to be the same gate, in the same guide directory. Recorded as two role
gates, unreconciled. Provisioning note: the Invoice Tax Administrator role is only exposed after SAP Concur staff
enable the Tax Validation feature, so the role list a tenant actually sees is provisioning-dependent.

### Nav-node note
Tax Administration is NEVER described as hanging off "Invoice Processing Admin" anywhere in the corpus. It is
reached either from "(left menu)" after Administration > Invoice, or under "Invoice Admin". This differs from
most already-built Invoice admin pages (Policies, Exceptions, Expense Types, Forms and Fields, Invoice Settings,
Routing Configuration, Workflows) which the corpus explicitly places under the Invoice Processing Admin menu.

### Documentation source
tools-guides carry ZERO Tax Administration content. This page is documented entirely in admin-guides — the
inverse of the Vendor Search Admin / Company Locations skew. Both directories were checked.

---

## 2. Budget Configuration — `page.budget-configuration`

**documentedBasis: none. coverageGuess: thin. uiVariant: undifferentiated. navPathEvidence: EMPTY. Zero fields is the correct answer.**

### The honest finding
There is **no Budget Configuration page in this corpus**. Exhaustive searches returned zero hits for every one of:
`Budget Configuration`, `budgetConfiguration`, `Budget Admin`, `Budget Item`, `Budget Manager`, `Budget Viewer`,
`Budget Owner`, `Budget Category`, `Manage Budget` — across both guide directories **and** both release-note
directories. There is no documented click path, no tab, no field, no role gate for such a page.

### What the corpus does instead
Every substantive Budget statement defers to an external guide that is not in this corpus:

> "For more information about budget approval and budget workflows, refer to the _Shared: Budget Setup Guide_."
> — admin/budget-approval-59251c3b.md

The same deferral appears in `approver-terminology-8559861c.md` (Budget Approver) and in both copies of
`add-a-custom-audit-rule-*.md` ("For audit rule notifications for Budget, refer to the Shared: Budget Setup Guide.").
The **Shared: Budget Setup Guide** is the named external authority. This corpus is Concur Invoice Professional
Edition only and does not contain it.

The remaining Budget mentions belong to OTHER, already-built pages and must not be re-homed here:
- **Audit Rules** (already built): `the-condition-page-5d4ea870.md` lists a *Budget* data object with Budget Amount,
  Budget Name, Budget Remaining Amount, Budget Type, HasBudget. These are audit-rule condition operands, not
  fields on a budget-configuration screen.
- **Workflows** (not yet built): `events-triggers-72339a13.md` documents a *Payment Request Budget Submit* event.
- Terminology only: *Budget Approver* in `approver-terminology-8559861c.md`; *Budget Center* as an example
  accounting segment in `define-the-who-in-a-transaction-1488d041.md`.
- One provisioning fact worth keeping: "The Budget feature is a purchased service."
  (`vat-at-the-line-item-level-itemization-summary-only-a41e7ad6.md`) — which explains the absence: Budget is a
  separately-purchased shared service documented outside the Invoice Professional Edition set.

**Recommendation:** either omit the page node entirely, or keep it as an explicit zero-field "documented
elsewhere" marker pointing at the Shared: Budget Setup Guide. Do not synthesise a screen.

---

## 3. List Management — `page.list-management`

**documentedBasis: sparse. coverageGuess: partial. uiVariant: undifferentiated.**

### Existence
Named as a page in three separate procedures, each ending "The List Management page appears."

### Distinct documented click paths (3)
| # | Path | File |
|---|---|---|
| 1 | Administration > Invoice > List Management | admin/use-a-custom-list-f3fc8bee.md — "1.  Select Administration\>Invoice." then "2.  Select List Management (left menu). The List Management page appears." |
| 2 | Administration > Invoice > List Management | admin/use-a-connected-list-1eaafd29.md — "2.  Select List Management (left menu). The List Management page appears." |
| 3 | Administration > Invoice > List Management | tools/step-1-create-the-source-list-in-list-management-cc91aa73.md — "2.  Click List Management (left menu). The List Management page appears." |

**TEXT TRAP — non-breaking spaces.** The step-1 lines of paths 2 and 3 are NOT plain ASCII:
`1.  Select Administration␠U+00A0␠U+00A0␠Invoice .` and `1.  Click Administration␠U+00A0␠U+00A0␠Invoice.`
Path 1's step 1 is `1.  Select Administration\>Invoice.` — the "Administration >Invoice" no-space trap, with a
markdown-escaped `\>`. Only path 1's step-1 line is safely quotable; for paths 2 and 3 the second step is quoted
instead. Do not "clean up" these strings.

### PAGE IDENTITY — List Management vs the Connected Lists tab (RESOLVED, with one contradiction)
The corpus **does** separate them, and they must stay separate:

- **Connected Lists is a TAB on the already-built Forms and Fields page.**
  "1.  On the Forms and Fields page, in the Form Type list, select the desired form type." /
  "2.  Click the Connected Lists tab." (admin/access-connected-lists-39dd2408.md)
  "You can use the Connected Lists tab to add new connected list definitions and modify existing connected list
  definitions." (admin/connected-list-overview-3fc65ecf.md)
  "The Connected Lists tab is available only when you select a form that supports this feature; otherwise, it is
  disabled." (admin/work-with-connected-list-definitions-4dd05e1d.md)
  → All connected-list DEFINITION controls (Select a List / Select fields / Configure User Interface / Preview /
  Assign to Forms) belong to `page.forms-and-fields`, field `connectedListsTab`. Do NOT re-home them.

- **List Management holds the list CATEGORY, the list, and the list ITEMS.**
  "Using the combination of the List Management and Forms and Fields tools, the administrator can create a
  connected list whose first field is an expense type." (admin/use-an-expense-type-as-the-first-field-in-a-connected-list-e0c5f415.md)
  "You use the Forms and Fields and List Management pages to perform the following tasks, typically in the order
  shown." + "On the List Management page:" (admin/forms-fields-lists-and-validations-configuration-process-76d94b3b.md)
  "In List Management, you create the source list associated with the feature hierarchies." (admin/overview-8b2edfd0.md)

- **CONTRADICTION (ownership of connected-list definitions).** One topic attributes the definition work to a
  third, differently-named tool owned by a different role:
  "Shared Configuration administrator: Using the Connected List Definition tool to define the connected list
  fields and hierarchy" (admin/use-a-connected-list-1eaafd29.md)
  versus access-connected-lists-39dd2408.md placing exactly that work on the Forms and Fields > Connected Lists
  tab. Recorded, not reconciled. Plausibly provisioning-dependent (Shared Configuration is a cross-product tool),
  but the corpus does not say so and I will not infer it.

### Controls actually documented (why "sparse")
Only a short procedure's worth: **New** button → **New List** page → **List Name**, choose an existing list
category or **New List Category** / **Add New List Category**, **Save**; then per-item **Item Code**,
**Save and Add**, **Done**. There is no field table for the List Management page anywhere in the corpus.
Everything else is deferred outward — and the deferral target is itself inconsistently named:
- "refer to the Shared: List Management Setup Guide." (admin/use-a-custom-list-f3fc8bee.md, and 6 more topics)
- "refer to _Concur Invoice: List Management Setup Guide_." (tools/step-4-add-the-custom-field-to-the-employee-form-da376eef.md)
Neither guide is in this corpus. **CONTRADICTION (external source name)** recorded.

### Aliases
"List Management tool", "List Management page", "Step 1: List Management" (tools/overview-of-steps-37e3c289.md).

### Role gates — CONTRADICTION (three different roles)
- **Invoice Admin** — "This portion of the process requires the role of Invoice Admin." (admin/use-a-custom-list-f3fc8bee.md)
- **Invoice Admin + Shared Configuration administrator** — "This portion of the process requires the roles of
  Invoice Admin and Shared Configuration administrator." (admin/use-a-connected-list-1eaafd29.md) — but the
  Shared Configuration half is scoped to the Connected List Definition tool, not to List Management itself.
- **Invoice Configuration Administrator** — "Invoice Configuration Administrator: Will configure the Concur
  Invoice modules, such as List Management, Group Configurations, and Employee form" (tools/required-roles-53a9a79c.md);
  reinforced by tools/overview-of-steps-37e3c289.md: "All tasks require the Invoice Configuration administrator
  role unless".
All three recorded. The corpus gives no single answer.

---

## 4. Company Locations — `page.company-locations`

**documentedBasis: rich. coverageGuess: good. uiVariant: undifferentiated.**

### Existence
A whole tools-guides sub-guide is devoted to it (`company-locations-8b49554d.md` is the guide cover with its
revision history). Nine tools topics plus at least six admin topics.
"The Company Locations tool is used to add, edit, delete, import, and export shipping and billing addresses."
(tools/overview-8b494195.md)

### Distinct documented click paths (4)
| # | Path | File |
|---|---|---|
| 1 | Administration > Invoice > Company Locations (left menu), under Invoice Processing Admin | tools/access-company-locations-024afbe1.md — "1.  Go to Administration > Invoice." / "2.  Select Company Locations (left menu)." / "Company Locations is accessible from the Invoice Processing Admin menu." |
| 2 | Administration > Invoice > Company Locations | admin/set-a-default-shipping-and-billing-address-f772bed1.md — "Click Administration > Invoice, and then click Company Locations to open the Company Locations page." |
| 3 | Administration > Invoice > Company Locations (prose) | admin/set-a-default-shipping-and-billing-address-f772bed1.md — "The billing address is configured in Administration > Invoice > Company Locations." |
| 4 | **Invoice Admin** > Company Locations | admin/provide-a-location-for-the-tax-service-6ba2cb41.md — "To add shipping information, click Invoice Admin > Company Locations." |
| 5 | Administration >Invoice > Company Locations (no-space trap) | admin/understand-and-use-company-locations-377ff23e.md — "which is accessed by clicking Administration\> Invoice > Company Locations." |

This is the ONLY one of the four pages the corpus explicitly places under the **Invoice Processing Admin** middle
nav node — and it does so in a prose sentence while the numbered steps say only "(left menu)". Longest attested
path: Administration > Invoice > Invoice Processing Admin > Company Locations.

**Documentation skew — the Vendor Search Admin trap avoided.** The procedural body of this page (access, add,
edit, delete, import, export, PO-import interaction, required roles) lives ENTIRELY in `tools-guides`. The
admin-guides mentions are cross-references from Purchase Orders, Peppol, and Tax Validation. A search skewed to
admin-guides would have found only fragments.

### Tabs attested
- **Ship To** — "1.  On the Company Locations page, select the Ship To tab." (tools/add-a-shipping-or-billing-address-3b51c816.md; also import-shipping-or-billing-addresses-601c2549.md)
- **Bill To** — "1.  On the Company Locations page, select the Ship To or Bill To tab." (tools/delete-a-shipping-or-billing-address-ae7aef28.md; also export-shipping-or-billing-addresses-59f051b2.md)

Long-catalog territory confirmed: `add-a-shipping-or-billing-address-3b51c816.md` is 203 lines and carries a raw
field table for the address form — the field-extraction pass must parse it whole, not sample it. Import/export
topics (`import-shipping-or-billing-addresses-601c2549.md`, `export-shipping-or-billing-addresses-59f051b2.md`)
and `how-company-locations-works-with-the-purchase-order-import-ed09e36a.md` (Address Code / External ID identity
matching, 210/220 PO records) are the second catalog cluster.

### Aliases
"Company Locations tool", "Company Locations page". External guide references are inconsistently named —
**CONTRADICTION (external source name)**, three names for what is presumably one document:
- "refer to the Concur Invoice: Company Locations Setup Guide." (admin/understand-and-use-company-locations-377ff23e.md)
- "refer to the Concur Invoice: Company Locations User Guide." (admin/set-a-default-shipping-and-billing-address-f772bed1.md)
- "refer to the Shared: Locations Setup Guide." (admin/provide-a-location-for-the-tax-service-6ba2cb41.md)

### Role gate
"To use the Company Locations tool, users must be assigned the Invoice Configuration administrator or Invoice
Configuration (Restricted) administrator role." (tools/required-roles-476a5f62.md) — a single, clean, two-role
gate. Note the **(Restricted)** variant IS admitted here, unlike Group Configurations which the corpus says is
hidden from the Restricted role (admin/overview-8b2edfd0.md). Same-named role, different visibility per page:
worth carrying forward as a gate nuance, not a contradiction.

---

## Cross-cutting observations

1. **Two competing top-level menu labels.** Three of the four pages have at least one path rooted at
   "Invoice Admin" rather than "Administration > Invoice" (Tax Administration, Company Locations). The alias is
   live and must be tried by the click-path resolver.
2. **"Invoice Processing Admin" coverage is uneven.** It is asserted for Company Locations only. Tax
   Administration and List Management are documented purely as "(left menu)" items after Administration > Invoice.
   Do not assume the middle node for them; there is no quote for it.
3. **Non-breaking spaces are a real hazard** in the List Management nav lines and would silently break a
   `grep -F` validation if copied naively.
4. **Gerund/imperative twins** confirmed for the tax predefined-tax-code procedure
   (`configure-predefined-tax-codes-6b42509f.md` "Select" vs `step-7-...-be8bc5b8.md` "Click"). Same
   `deliverable_id: 41460672`, same content, NOT a UI variant.
5. **No UI-variant evidence at all** for any of the four pages — no NextGen/legacy language anywhere. All four
   are `undifferentiated`.
6. **One of the four pages should probably not exist.** Budget Configuration has zero documentary basis. That is
   the finding, not a gap to be filled.


---

# Group 5B — MAP / Exhaustive File Inventory and Table Census

ROOT = `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`
Corpus counts verified this run: admin-guides **1209**, tools-guides **650**, release-notes 138,
release-note-summaries 233. Version 2026_08, Professional Edition, crawled 2026-08-29.

All `sourceFile` values below are `<guide-dir>/<filename>.md` relative to ROOT. Guide dirs are
abbreviated in prose as **A/** = `concur-invoice-professional-edition-admin-guides/` and
**T/** = `concur-invoice-professional-edition-tools-guides/`, but every path in the machine-readable
output is written out in full.

---

## 0. Corpus-wide RAW `<table>` CENSUS (run once, reused by all four pages)

```
grep -rl "<table" concur-invoice-professional-edition-admin-guides/ | while read f; do echo "$(grep -c '<table' "$f") $f"; done | sort -rn
grep -rl "<table" concur-invoice-professional-edition-tools-guides/  | while read f; do echo "$(grep -c '<table' "$f") $f"; done | sort -rn
```

Result: **31 files in admin-guides, 1 file in tools-guides** — matches the brief exactly.

| count | file |
|---|---|
| 5 | A/policies-the-purchase-order-policy-new-experience-5a1ba7ef.md |
| 5 | A/configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md |
| 2 | A/overview-attendee-forms-and-fields-96aa4b66.md |
| 1 | A/sample-record-type-420-85d647a0.md |
| 1 | A/sample-record-type-410-157e0ab8.md |
| 1 | A/sample-record-type-310-1303b053.md |
| 1 | A/sample-record-type-310-04182982.md |
| 1 | A/sample-record-type-300-7da0dd27.md |
| 1 | A/sample-record-type-300-4e6c56cf.md |
| 1 | A/sample-record-type-300-2e278186.md |
| 1 | A/sample-record-type-210-91f4d609.md |
| 1 | A/sample-record-type-200-c45336e5.md |
| 1 | A/sample-record-type-200-b660ce2e.md |
| 1 | A/sample-record-type-200-3c0a370d.md |
| 1 | A/sample-record-type-100-dd94ecfd.md |
| 1 | A/sample-record-type-100-626cb419.md |
| 1 | A/sample-record-type-100-2deb79ae.md |
| 1 | A/sample-record-type-100-0902106a.md |
| 1 | A/sample-record-c83b2160.md |
| 1 | A/sample-record-4ae2b08c.md |
| 1 | A/onboarding-card-accounts-with-payment-providers-bf273997.md |
| 1 | A/invoice-text-content-type-02b21c13.md |
| 1 | A/invoice-settings-cace748d.md |
| 1 | A/invoice-barcode-content-type-81641f43.md |
| 1 | A/global-level-a53bf756.md |
| 1 | A/filter-authorized-approvers-by-workflow-approval-step-aae69350.md |
| 1 | A/example-data-f7ca8383.md |
| 1 | A/creating-card-accounts-cf71feb4.md |
| 1 | A/create-a-conditional-rule-in-the-editor-86a92887.md |
| 1 | **A/configuring-forms-and-fields-in-capture-processing-7c14446c.md** |
| 1 | A/additional-approver-situations-fbb5034c.md |
| 1 | **T/what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md** |

**Only two of the 32 touch any of my four pages' domains** — the two bolded OCR/capture field tables,
which are tax-domain (see Tax Administration §1.5). Every other raw-`<table>` file was opened or
grepped and ruled out:

* `sample-record-type-210-91f4d609.md` is a **historical-invoice** import sample (`210,true`), NOT the
  Purchase Order Bill-To 210 record. Easy trap — ruled out by reading it.
* `invoice-text-content-type`, `invoice-barcode-content-type`, `global-level`, `example-data`,
  `invoice-settings`, card-account and approver files: print-format / ledger / card / workflow
  domains, none of my four.
* `policies-the-purchase-order-policy-new-experience` and `overview-attendee-forms-and-fields` show
  `vat` grep hits that are **false positives inside the word "Private"** (`Created By (Pri-vat-e List)`).
  Verified with `grep -oiE ".{60}vat.{60}"`. Ruled out.
* `configure-forms-and-fields-for-purchase-order-copy-down-to-pr` has zero hits for ship-to/bill-to/
  company location/list management/tax authority/VAT. Ruled out.

Consequence: **for all four of my pages the page-relevant raw-`<table>` count is 0, except the two
capture-processing OCR tables logged under Tax Administration.** Every long catalog my pages depend
on is an SAP-flavoured *indented* markdown pipe table.

### Census-method warning for the extraction agents
`grep -c '^|'` **undercounts badly** in this corpus. SAP tables inside numbered procedure steps are
indented four spaces, so the anchor must be `grep -cE '^ *\|'`. Example:
`T/add-a-shipping-or-billing-address-3b51c816.md` scores `^|` = 0 but `^ *\|` = 39 and in fact holds a
**12-row field catalog**. If an extractor uses `^|` it will declare that file table-free and lose the
entire Company Locations field set.

---

## 1. PAGE: `tax-administration` — Tax Administration (`/expense/admin/invoice/taxAdministrator.asp`)

### 1.1 Commands run

```
ls concur-invoice-professional-edition-admin-guides/ | grep -iE 'tax|vat|withhold'
ls concur-invoice-professional-edition-tools-guides/  | grep -iE 'tax|vat|withhold'
ls <both> | grep -iE '(^|-)(tax|vat|vats|withholding)(-|$)|tax-|-tax|vat-|-vat'
grep -ril -E "tax administration|tax administrator|tax authorit|tax code|tax validation|withholding|tax service|value added tax|\bVAT\b" <both dirs>
grep -ril -E "Tax Administration|Invoice > Tax|Tax Administrator \(|taxAdministrator" <both dirs>
grep -rhoiE "Administration ?> ?Invoice ?> ?[A-Za-z &()'-]+" <both dirs> | sort | uniq -c | sort -rn
grep -ril "withhold" <both dirs>
grep -rhoiE "Click the ([A-Za-z ]+) tab" <tax files>
```

**Filename sweep caution recorded:** `grep -i 'vat'` matches `acti-vat-e` / `deacti-vat-e` /
`reacti-vat-e`. The first sweep returned ~20 activation files that have nothing to do with VAT. The
refined pattern above is the one to trust.

**`withholding` returns ZERO files in both guide directories.** Withholding tax is not documented in
this corpus. Say so; do not synthesise a withholding control.

### 1.2 Counts
* Filename sweep: **60 admin** files, **4 tools** files.
* Content sweep: **~100 admin** files, **17 tools** files carry a tax/VAT term.
* Nav sweep: `Administration > Invoice > Tax Administration` appears 5× (3 bare + 2 "(left menu)"),
  in 12 admin files, **0 tools files**.
* Tabs documented on the Tax Administration page: **Tax Authorities**, **Tax Code**,
  **Tax Validation**, **Expense Types Group**, **Vendor Groups**.

### 1.3 mustRead (with reasons)

| file | why | lines | raw tbl |
|---|---|---|---|
| A/step-4-add-a-new-tax-authority-7f90cede.md | **The single richest config topic on this page.** Three-step New Tax Authority wizard with THREE field tables: General (Tax Authority Name, Country, State/Province, Tax Name — "up to five characters maximum"), Tax Rate Types (Tax Rate Type Name, Calculation Method — the only documented value is "Select Percentage. This is the default choice."), Tax Rates (Rate Type, Effective Date, Tax Percent). 39 indented pipe lines. | 211 | 0 |
| A/step-3-configure-the-service-14c3ef13.md | 6-row **Tax Validation tab** field table: Partner Account Number, Tax Validation Type (documented single value "Payment Request Only"), Tax Validation Level (Header / Line Item), Turn On Tax Validation, Expense Types (read-only), UNSPSC Commodity Code. Nav here is `Administration > Invoice Admin > Tax Administration` — the "Invoice Admin" alias. | 114 | 0 |
| A/step-5-optional-add-a-new-expense-type-group-to-a-tax-authority-e8d87361.md | 7-row Group Name field table for the **Expense Types Group tab**: Group Name, Effective Date, End Date, Applies To, Tax Code (20 chars), Disable VAT calculation. Plus the Expense Types step and Tax Rates step (default tax condition "Always", Rate Type column) and the "with effective dates" search filter. | 160 | 0 |
| A/step-6-optional-add-a-new-vendor-group-to-a-tax-authority-d8b7786d.md | Twin of step-5 for the **Vendor Groups tab**. Same 7 fields, but the Vendor Name step adds a **Tax Type list** ("international, domestic, taxable, etc.") that has no counterpart in step-5. Must be read separately, not assumed identical. | 160 | 0 |
| A/step-3-access-tax-authorities-2fae4ae3.md | 4-column-listing table for the **Tax Authorities tab grid**: Tax Authority, Country, State/Province, Tax Name. Also the canonical nav: "Click Tax Administration left menu." | 94 | 0 |
| A/configure-predefined-tax-codes-6b42509f.md | **Tax Code tab** procedure: New → type name → Save. | 49 | 0 |
| A/step-7-optional-configure-predefined-tax-codes-be8bc5b8.md | Near-duplicate of the above but **CONTRADICTS it**: 6b42509f says the user then sees "the tax code fields (1-4) as a list"; be8bc5b8 says "the VAT Tax Code 1 field as a list". Different loio, same deliverable_id 41460672 — this is NOT the gerund/imperative republish pattern. Record both. | 47 | 0 |
| A/step-2-assign-the-tax-administrator-role-b7f391c8.md | Role assignment, nav path A: "Click User Administration > User Permissions > Invoice tab of the Company Admin tool." | 39 | 0 |
| A/step-2-assign-the-tax-administrator-role-b903b7c8.md | Same title, different loio, **different navigation**: "Click Administration > Company > Company Admin" then "Click User Permissions (left menu) and then click the Invoice tab." **Record the contradiction** — do not reconcile. | 37 | 0 |
| A/step-1-enable-the-tax-validation-feature-sap-concur-staff-31fca0d8.md | Establishes that the Invoice Tax Administrator role only exists after SAP Concur staff enable the feature — a hard dependency/gate for the whole page. | 27 | 0 |
| A/work-with-the-tax-validation-page-options-c3fe1df5.md | Prose enumeration of the same Tax Validation options as step-3, but with **DIFFERENT LABELS**: "Unique Tax Partner Number" (vs "Partner Account Number") and "Turn On Tax Validation check box". Also states the Purchase Request type is not yet available. Contradiction pair with step-3. | 40 | 0 |
| A/available-vat-fields-8b395ce2.md | **27-row VAT field catalog** (VAT Amount 1–4, VAT Rate 1–4, VAT Tax Code 1–4, Request Line Item VAT Amount, Request Amount Without VAT, Line Item VAT Amount 1–4, Line Item VAT Rate 1–4, Line Item Amount without VAT, Line Item VAT Tax Code 1–4). Compressed ranges throughout — record "1 - 4" expansions per rule 8. **These are Forms-and-Fields form fields, not Tax Administration page controls** — cite as the tax-domain catalog, do NOT re-home them onto page.forms-and-fields. | 334 | 0 |
| A/extract-vat-data-8b3996e0.md | **12-row Prorated VAT field catalog** (Prorated VAT Amount 1–4, Prorated VAT Tax Code 1–4, Prorated VAT Rate 1–4) plus the PRAE in-line-vs-separate-row behaviour. Same re-homing caution. | 239 | 0 |
| A/supported-countries-for-vat-8b38bab8.md | Country support statement — the anchor of the biggest contradiction on this page (see §1.5). | 27 | 0 |
| T/canada-de22c9f9.md | **tools-guides-only** Canada VAT field implementation: four-field labelling (VAT Amount 1 = GST, 2 = PST, 3 = HST, 4 = QST) and two-field labelling (GST/HST → VAT Amount 1, PST/QST → VAT Amount 2). Directly contradicts the admin-guides "Canada is not supported" line. | 61 | 0 |
| T/uk-us-japan-australia-0557084a.md | **tools-guides-only**: "For the UK, the US, Japan, and Australia, use the VAT Amount 1 field, which is for primary tax." Contradicts the admin-guides "US ... not supported" line. | 25 | 0 |
| T/other-countries-84722445.md | **tools-guides-only**: for other countries the corpus explicitly defers to the Account Manager and to the *Concur Invoice: VAT Setup Guide* (not in corpus). This is the honest "no list here" record. | 23 | 0 |
| T/switch-tax-mode-dcd0a51d.md | **tools-guides-only** Switch Tax Mode button behaviour, and the configuration precondition ("Tax fields added at both header and line item levels"). The only place the Switch Tax Mode control is described. | 55 | 0 |
| A/configure-the-specify-tax-in-invoice-details-or-itemization-summary-feature-11c6df01.md | The activation procedure for Specify Tax in — an 11-step Forms-and-Fields procedure that *gates* a Tax Administration-adjacent behaviour. Documents the "at least one VAT field at header AND line item" rule. | 55 | 0 |
| A/control-tax-amount-handling-8540cd38.md | States the same gate with different wording plus the negative rule ("will not appear if the admin has only selected one VAT field"). | 27 | 0 |
| A/configure-vat-labels-9d4795b9.md | 4-row VAT label catalog (VAT Amount, VAT Rate, VAT Tax Code, VAT Type) with the note that **VAT Type is mandatory** for the configuration. Lives on Forms and Fields; cite, don't re-home. | 91 | 0 |
| A/step-3-optional-configure-the-digital-tax-invoice-validation-69ba75a6.md | Enumerates the digital-tax-invoice status values (**Not validated / Valid / Valid with warnings / Invalid**) and the exception code **INVXMLST**. A genuine documented value list. | 40 | 0 |
| A/understand-and-use-the-effective-date-and-the-end-date-ccf72f26.md | Semantics of Effective Date / End Date on tax groups, incl. the documented default **12/31/9999**. | 31 | 0 |
| A/requirements-to-calculate-vat-821a71ea.md | 5-item dependency list (Tax Authority, Expense type, Date, Location, Vendor) — the dependency edges for this page. | 36 | 0 |
| A/calculate-vat-and-required-criteria-89f97622.md | The formula "Tax Authority + Company Location (Ship To) + Expense Type (or Vendor) = Calculation" — the hard dependency from Tax Administration onto **Company Locations**. | 27 | 0 |

### 1.4 alsoRelevant
`A/tax-administration-tool-0f5fff3c.md` (tool purpose, "exempt, standard, or reduced" named as
*examples* of rate type — do not harvest as a value set),
`A/configure-tax-authorities-8b383099.md` (section preamble),
`A/tax-administrator-experience-8b37bd88.md`,
`A/configuring-the-tax-validation-feature-8b376eeb.md` (stub),
`A/the-tax-service-provider-05d51077.md`,
`A/provide-a-location-for-the-tax-service-6ba2cb41.md` (**dual-page**: also Company Locations; uses the
"Invoice Admin > Company Locations" alias),
`A/work-with-commodity-codes-in-this-view-f37c2a6e.md`,
`A/create-an-invoice-with-tax-validation-a515e7a3.md` (Calculated Tax Amount / Tax Rate read-only fields),
`A/apply-vat-to-expense-type-groups-0efbc573.md`, `A/apply-vat-to-vendor-groups-bebd6efa.md`,
`A/availability-of-expense-types-based-on-location-of-tax-authority-8485155d.md`,
`A/sources-of-vat-amounts-27c4ff7a.md`, `A/specify-tax-in-invoice-details-or-itemization-summary-ee1951bb.md`,
`A/using-the-tax-field-at-both-the-invoice-and-line-item-levels-a55b90c8.md`,
`A/working-with-tax-fields-587e5641.md`, `A/track-vat-2e7fc9f0.md`,
`A/client-responsibility-regarding-vat-969ec2ca.md`, `A/appendix-a-tax-amount-calculation-8b380a96.md`,
`A/uk-example-applicable-to-all-single-level-vat-countries-ef37bb45.md`,
`A/forms-and-fields-ensure-employees-account-for-all-tax-amounts-f362dd07.md`,
`A/prorated-vat-fields-070c3917.md` (title-only stub, 19 lines),
`A/vendor-tax-id-0f8f83bc.md` (**Audit Rules domain** — Japan NTA validation; already-built page, cite only),
`T/working-with-tax-and-vat-data-f690215c.md`,
`T/keeping-track-on-vat-included-in-the-unit-price-e9669bed.md` (Vendor includes VAT in Unit Price option),
`A/vendor-information-for-vat-included-in-the-unit-price-{9eebdaa0,a4fc76a1}.md` (twin pair),
`A/configure-and-calculate-vat-for-capture-processing-{5c00348f,bf604f43}.md` (twin pair),
`A/calculation-of-vat-is-form-dependent-{91166c1e,e2329bd7}.md` (twin pair),
`A/enabling-cfdi-attachments-for-reporting-to-mexican-tax-authorities-5ce1fd0c.md` +
`T/enabling-cfdi-attachments-for-reporting-to-mexican-tax-authorities-fe09e159.md` (cross-dir twin).

### 1.5 Long-catalog census — Tax Administration

| file | enumerates | ~rows |
|---|---|---|
| A/available-vat-fields-8b395ce2.md | VAT field names + descriptions (header & line item) | 27 |
| A/extract-vat-data-8b3996e0.md | Prorated VAT fields | 12 |
| A/step-4-add-a-new-tax-authority-7f90cede.md | 3 tables: General (4), Tax Rate Types (2), Tax Rates (3) | 9 |
| A/step-3-configure-the-service-14c3ef13.md | Tax Validation tab fields | 6 |
| A/step-5-...-expense-type-group-e8d87361.md | Group Name fields | 6 |
| A/step-6-...-vendor-group-d8b7786d.md | Group Name fields | 6 |
| A/step-3-access-tax-authorities-2fae4ae3.md | Tax Authorities grid columns | 4 |
| A/configure-vat-labels-9d4795b9.md | VAT labels | 4 |
| A/step-3-optional-configure-the-digital-tax-invoice-validation-69ba75a6.md | digital tax invoice statuses (bullet run) | 4 |
| T/what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md | **RAW `<table>`** — OCR-captured header + line-item fields | ~20 cells |
| A/configuring-forms-and-fields-in-capture-processing-7c14446c.md | **RAW `<table>`** — its admin twin | ~18 cells |

Revision-history-only files (long tables, **zero config value**; use for dating a UI-variant claim
only, never as a field source): `A/tax-authority-8b386a59.md` (23 rows),
`A/tax-validation-8b37962d.md`, `A/image-handling-digital-tax-invoice-8b2fb78f.md`,
`A/value-added-tax-vat-8b39be89.md`, `A/country-code-list-8b3e41a4.md`.

### 1.6 CONTRADICTIONS TO RECORD (do not reconcile)
1. **Country support.** `A/supported-countries-for-vat-8b38bab8.md`: "Countries that are not supported
   for VAT in Concur Invoice are the US, Canada, India, and other multi-tax countries." vs
   `T/canada-de22c9f9.md` (full four-field and two-field Canada VAT implementations) and
   `T/uk-us-japan-australia-0557084a.md` ("For the UK, the US, Japan, and Australia, use the VAT
   Amount 1 field"). **This is the tools-guides skew the brief warned about — the contradicting
   evidence lives only in tools-guides.**
2. **OCR capture table, tools vs admin twin.** T/…8eddb3cf lists
   `Vat 1 (Primary Tax - Canada GST/HST, Australia GST, US Tax, VAT UK/Japan)` **and a separate
   `Vat 2 (Secondary Tax – Canada PST/QST)` row**. The admin twin
   A/configuring-forms-and-fields-in-capture-processing-7c14446c.md lists
   `Vat 1 (Australia GST, US Tax, VAT UK/Japan)` and **has no Vat 2 row at all**. Both raw `<table>`.
   Record both lists.
3. **Tax Validation field labels.** step-3 "Partner Account Number" vs c3fe1df5 "Unique Tax Partner
   Number"; step-3 "Tax Validation Level ... Header or the Line Item" vs c3fe1df5 "Form Level to Be
   Analyzed".
4. **Tax Administrator role nav.** b7f391c8 (`User Administration > User Permissions > Invoice tab of
   the Company Admin tool`) vs b903b7c8 (`Administration > Company > Company Admin` → `User
   Permissions (left menu)` → `Invoice tab`).
5. **Predefined tax code result.** "tax code fields (1-4) as a list" (6b42509f) vs "VAT Tax Code 1
   field as a list" (be8bc5b8).
6. **Nav alias drift.** `Administration > Invoice > Tax Administration (left menu)` (step-3, step-7),
   `Administration > Invoice Admin > Tax Administration` (step-3-configure-the-service),
   `Click Tax Administration left menu` (step-3-access).

### 1.7 Ruled out
* All `deactivate|activate|reactivate` filename hits — `grep -i vat` false positives on "acti**vat**e".
* `T/vendor-manager-8b542597.md`, `T/vendor-import-8b535373.md`, `T/the-import-template-fields-and-descriptions-8b53850b.md`,
  `A/approved-vendor-v3-8b465c46.md`, `A/vendor-record-type-200-9c92487a.md` — vendor-import domain; the
  tax hits are a `Tax ID`/`country code` column, not Tax Administration config.
* `A/audit-rules-*`, `A/the-condition-page-5d4ea870.md`, `T/the-query-builder-and-the-condition-editor-*.md`
  — Audit Rules / Processor domain, already built.
* Invoice header/line-item import record-type format files (300/310/410/420) — Imports domain.
* Release notes / release-note summaries — consulted for nothing here; not cited.

---

## 2. PAGE: `budget-configuration` — Budget Configuration (`/expense/admin/invoice/budgetConfiguration.asp`)

### 2.1 Commands run

```
ls concur-invoice-professional-edition-admin-guides/ concur-invoice-professional-edition-tools-guides/ | grep -i budget
grep -ril "budget" concur-invoice-professional-edition-admin-guides
grep -ril "budget" concur-invoice-professional-edition-tools-guides
grep -ric "budget" concur-invoice-professional-edition-admin-guides/*.md concur-invoice-professional-edition-tools-guides/*.md | grep -v ':0$' | sort -t: -k2 -rn
grep -ril "Budget Configuration" .          # corpus-wide, all four dirs
grep -ril "budgetConfiguration" .           # corpus-wide, all four dirs
ls concur-invoice-professional-edition-release-notes/ concur-invoice-professional-edition-release-note-summaries/ | grep -i budget
grep -ril -E "budget approv|budget approver|budget workflow|spend budget" <both guide dirs>
cat concur-invoice-professional-edition-admin-guides/budget-approval-59251c3b.md
```

### 2.2 THE HONEST ANSWER: `mustRead` IS EMPTY. THIS PAGE HAS **ZERO** CONFIGURATION FIELDS IN THIS CORPUS.

Hard evidence:

* **The literal string "Budget Configuration" appears in ZERO files corpus-wide** — not in
  admin-guides, not in tools-guides, not in either release-note directory.
* **"budgetConfiguration" appears in ZERO files corpus-wide.**
* Exactly **one** file has "budget" in its name: `A/budget-approval-59251c3b.md`. Total corpus:
  16 admin + 6 tools files mention the word at all; the highest count in any file is 7.
* `A/budget-approval-59251c3b.md` is 30 lines, has no procedure, no field table, no navigation path,
  and **explicitly defers to an external guide that is not in this corpus**:
  *"For more information about budget approval and budget workflows, refer to the Shared: Budget Setup
  Guide."* That guide is a **Shared** deliverable; this corpus is Concur Invoice Professional Edition
  only (deliverable_ids 41460672 / 41460673).
* `A/approver-terminology-8559861c.md` names a "Budget Approver" role and defers to the **same**
  external guide.

**The corpus defers this page's entire configuration surface to the `Shared: Budget Setup Guide`,
which is absent from the corpus.** That is the finding. Report it; publish the page thin with zero
fields.

### 2.3 Every remaining "budget" hit, and why it is NOT a field on this page

| file | the hit | correct home |
|---|---|---|
| A/the-condition-page-5d4ea870.md (7 hits) | Budget data object: Budget Amount / Budget Name / Budget Remaining Amount / Budget Type | **Audit Rules (already built)** |
| A/audit-rules-8b297db8.md, A/add-a-custom-audit-rule-{0f1d320e,43e3f9aa}.md, A/conditional-expressions-and-the-condition-page-4d98af34.md, T/understand-conditional-expressions-db3d7418.md | same condition-page data object | **Audit Rules (already built)** |
| A/events-triggers-72339a13.md | "Payment Request Budget Submit: The rule is triggered when an invoice or purchase request is associated with a submitted budget." | **Workflows (not yet built)** |
| A/workflow-667cee21.md, T/workflow-and-approval-routing-8b4ff6c9.md | budget approval named as a workflow capability | **Workflows (not yet built)** |
| A/approver-terminology-8559861c.md | Budget Approver role | **Workflows / role model** |
| A/benefits-of-using-cost-object-approval-ed5de5de.md | "budget ownership" prose | Cost Object Approval |
| A/define-the-who-in-a-transaction-1488d041.md | "Budget Center" as an example accounting segment name | Accounting Administration (built) |
| A/manage-allocation-favorites-{7c5a05d4,9414be27}.md, T/create-and-manage-allocation-favorites-{22cb2e7c,4d3a7e54}.md, T/distribute-allocate-a-purchase-request-689dbc62.md, T/select-for-different-vendors-and-project-and-event-based-requests-1f3c9d5b.md | incidental prose | Allocations |
| A/general-information-8b3b0308.md, A/purchase-request-and-purchase-order-8b36ae07.md | revision-history lines ("Added Budget Approver in the Terminology section") | revision history |
| A/vat-at-the-line-item-level-itemization-summary-only-a41e7ad6.md | incidental | Tax |

**DO NOT harvest the Audit Rules Budget data object as Budget Configuration fields.** Two invented
"Yes" values have already been deleted from this graph; four invented budget fields would be worse.

### 2.4 alsoRelevant (context only, cite for the deferral, never for a field)
`A/budget-approval-59251c3b.md`, `A/approver-terminology-8559861c.md`.

### 2.5 Long-catalog / raw-table census
Long catalogs: **none.** Raw `<table>`: **0 files.** Both correct and both worth stating.

---

## 3. PAGE: `list-management` — List Management (`/expense/admin/invoice/listManagement.asp`)

### 3.1 Commands run

```
ls concur-invoice-professional-edition-admin-guides/ | grep -iE 'list|hierarch'
ls concur-invoice-professional-edition-tools-guides/  | grep -iE 'list|hierarch'
grep -ril "List Management" <both dirs>
grep -ril -E "connected list|custom list|list item|list definition|source list|list management|simple list" <both dirs>
grep -rhoiE "Administration ?> ?Invoice ?> ?[A-Za-z &()'-]+" <both dirs> | sort | uniq -c | sort -rn
wc -l / grep -cE '^ *\|' on every candidate
python3 rows.py <candidates>            # table + row-delimiter census
```

**Nav-sweep finding:** `Administration > Invoice > List Management` does **NOT** appear in the
`Administration > Invoice > X` enumeration at all. The page is reached via the two-step form
`Click Administration > Invoice.` then `Click List Management (left menu).` — three files use it
(cc91aa73, f3fc8bee, 1eaafd29). An extractor grepping only the one-line arrow form will find nothing.

### 3.2 PAGE-IDENTITY RESOLUTION (asked for explicitly; resolved from the corpus, not assumed)

The corpus **does** separate them, and it separates them cleanly on the nav, but it introduces a
third name that must be recorded as a contradiction.

* **List Management owns list CATEGORIES, LISTS, and LIST ITEMS.** `T/step-1-create-the-source-list-in-list-management-cc91aa73.md`:
  "Click List Management (left menu). The List Management page appears." → "Click New to open the New
  List page." → "Provide a descriptive name for List Name, and then click Save" → select the list name
  → "New to begin creating the list items" → "Record the Item Code values" → "Add each list item by
  clicking Save and Add" → "(Optional): For a multi-level connected list, select any of the list items
  and continue to add sub-levels as required." → "Click Done".
  `A/use-a-custom-list-f3fc8bee.md` adds the **List Category** control on the New List page:
  "Choose Existing: Select an existing list category, such as Allocations, from the list" /
  "Create New: Select New List Category and, in Add New List Category, type a name and select Save."
* **Connected list DEFINITIONS are on Forms and Fields.** `A/access-connected-lists-39dd2408.md`:
  "On the Forms and Fields page, in the Form Type list, select the desired form type." → "Click the
  Connected Lists tab." Matches the already-built `page.forms-and-fields` / field `connectedListsTab`.
* **CONTRADICTION to record:** `A/use-a-connected-list-1eaafd29.md` splits the work by role and names
  a **third tool**: "Invoice Admin or Invoice: Using the List Management tool to create a new list
  category ... and create a new list within the category" / "Shared Configuration administrator: Using
  the **Connected List Definition tool** to define the connected list fields and hierarchy." The corpus
  therefore gives two different homes for connected-list definition work (a Forms-and-Fields *tab*, and
  a separately-named *tool* under a different role). Record both; do not pick one.
* Secondary contradiction: the deferral target is named **"Shared: List Management Setup Guide"** in
  9 files but **"Concur Invoice: List Management Setup Guide"** in `T/step-4-add-the-custom-field-to-the-employee-form-da376eef.md`.
  Neither guide is in this corpus.

### 3.3 mustRead

| file | why | lines | raw tbl |
|---|---|---|---|
| T/step-1-create-the-source-list-in-list-management-cc91aa73.md | **The ONLY end-to-end procedure for the List Management page itself.** Nav, New List page, List Name, Save, list items, Item Code, Save and Add, multi-level sub-levels, Done, and the "code format (EAST; NORTH) ... must be typed exactly" rule. tools-guides only. | 52 | 0 |
| A/use-a-custom-list-f3fc8bee.md | The **List Category** control on the New List page — Choose Existing vs Create New / New List Category / Add New List Category. The only documented source for the category concept. Also names the required role: Invoice Admin. | 48 | 0 |
| A/use-a-connected-list-1eaafd29.md | Same New List / category procedure **plus the role split** that produces the identity contradiction (Invoice Admin vs Shared Configuration administrator + "Connected List Definition tool"). | 52 | 0 |
| A/use-an-expense-type-as-the-first-field-in-a-connected-list-e0c5f415.md | Real List Management constraints with named fields: the **Expense Type List Item Key** field must be first in the connected list; it can be used in only one connected list definition; Item Code must exactly match the expense type code (Awards = "AWRDS"); Item Name must match the Expense Type name for audit rules. | 65 | 0 |
| A/overview-8b2edfd0.md | The canonical three-step relationship List Management → Feature Hierarchies → Group Configurations: "In List Management, you create the source list associated with the feature hierarchies. The process of creating this list is equivalent to creating Groups since each item in the source list is in effect a group." The dependency edge. | 44 | 0 |
| A/forms-fields-lists-and-validations-configuration-process-76d94b3b.md | Ordering: which tasks happen on Forms and Fields vs on the List Management page, and in what sequence. Direct input to the graph's step ordering. | 46 | 0 |
| T/step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md | The consuming side: Feature Hierarchies → **Source List** control, Level (Employee, "default and cannot be changed"), Segment Name. Establishes what a source list is *for*. | 47 | 0 |
| T/overview-of-steps-37e3c289.md | The 6-step tool order with List Management as Step 1 and the required roles. | 45 | 0 |
| T/required-roles-53a9a79c.md | "Invoice Configuration Administrator: Will configure the Concur Invoice modules, such as List Management, Group Configurations, and Employee form" — the role gate. | 27 | 0 |
| A/access-connected-lists-39dd2408.md | **Read to DEFEND the boundary**, not to harvest: proves connected-list definitions are reached from the Forms and Fields page. | 29 | 0 |
| A/field-configuration-information-5813462a.md | Hard, quotable list-behaviour limits: simple list "displays a maximum of 500 items"; connected list "maximum of 500 items ... search either by the list item text or code"; site setting **TOP_VALUE_ON_MRU** (0 disables MRU); the "at least two fields" connected-list rule; "you cannot mark any connected list fields below it as read-only." Forms-and-Fields home — cite, don't re-home. | 97 | 0 |
| T/additional-documentation-a105a5d7.md | Names the external guide the corpus defers to for List Management. Needed to state the deferral honestly. | 42 | 0 |

### 3.4 alsoRelevant
`A/connected-list-overview-3fc65ecf.md` ("Connected lists are also called as Multiple Level Lists" —
an alias worth recording), `A/work-with-connected-list-definitions-4dd05e1d.md` (New / Modify / Remove
on the Connected Lists **tab**), `A/add-a-new-connected-list-definition-fc9f852a.md` (**7-row field
table — Field Name, Data Type, Default Value Type {Copy Down, None, Constant}, Field Default Value,
Copy Down Source, Field, Access Rights — but this is `page.forms-and-fields`; already-built, cite only,
NEVER re-home onto list-management**), `A/modify-a-connected-list-definition-8f8d8910.md`,
`A/assign-a-connected-list-to-a-form-5111fbf5.md`, `A/create-hierarchy-and-import-connected-list-data-c6ab8a52.md`,
`A/not-using-custom-or-connected-lists-cdd84186.md` (the negative branch),
`A/step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`, `A/hierarchies-7f68a876.md`
(`Administration > Invoice > Hierarchies` — a *different* page), `T/auto-assign-an-invoice-using-hierarchies-c4035783.md`,
`T/working-with-multiple-check-configurations-e88666b1.md` + `T/working-with-multiple-funding-accounts-baf93427.md`
(near-identical twins; both: "Payments Groups are linked to items in a list from List Management" — a
real downstream dependency), `T/step-4-add-the-custom-field-to-the-employee-form-da376eef.md`,
`T/the-import-template-fields-and-descriptions-8b51ca3d.md` (Vendor Employee Access import: Vendor Code,
Address Code, **Level 1 Code – Level 10 Code** "of the source list attached to the Invoice Vendor
Employee Access feature hierarchy" — compressed range, rule 8), `T/other-columns-4436522d.md`
(field types: free-text / list / connected (linked) list), `T/search-queries-by-list-item-code-08d2dba9.md`
(**Query Builder / processor tool, not List Management** — Display List Code check box).

### 3.5 Long-catalog census — List Management

| file | enumerates | ~rows |
|---|---|---|
| A/add-a-new-connected-list-definition-fc9f852a.md | Select Level Properties fields (+ Default Value Type value set) | 7 |
| A/field-configuration-information-5813462a.md | list-behaviour constraints (bullet run) | ~10 |
| T/the-import-template-fields-and-descriptions-8b51ca3d.md | Vendor Employee Access import columns | ~10 |
| T/overview-of-steps-37e3c289.md | tool-order steps (bullet run) | 6 |

**No page-relevant raw `<table>` file exists for List Management.** No ~250-row catalog belongs here.

### 3.6 Ruled out (with reason — several are on the recon list)
* `T/invoice-lists-e7e47e19.md` — **NOT this page.** It is the end-user "My Invoice → Unsubmitted
  Invoices" list in PO Matching. Recon false lead; read and rejected.
* `A/invoice-list-data-content-type-50e66a27.md` — **NOT this page.** It is the **Invoice List Data
  print-format content type** (Content ID, Content Type, Heading, No Items Message, Print Condition
  Rule). Print Formats domain. Recon false lead; read and rejected. Its 40 pipe lines would have
  produced five bogus List Management fields.
* `A/country-code-list-8b3e2eda.md` — 249-row catalog, but scoped to the **vendor import file** (see §4.5).
* `A/list-of-spend-categories-8b2de886.md` (1000 lines, ~125 rows) and
  `T/list-of-spend-category-names-and-codes-8b4a094d.md` (488 lines, ~50 rows) — **enormous catalogs,
  but they are Spend Category name/code catalogs belonging to Expense Types / Accounting
  Administration (already built), not List Management lists.** Logged here so nothing downstream
  "discovers" them and mis-homes them.
* `A/hierarchies-7f68a876.md`, `T/create-the-invoice-routing-feature-hierarchy-8b510285.md`,
  `T/hierarchy-mappings-import-*.md`, `T/access-hierarchy-mappings-import-708f5fdc.md`,
  `T/the-import-template-fields-and-descriptions-8b4aa547.md` — Feature Hierarchies / Routing
  Configuration pages, not List Management.
* `A/account-code-hierarchy-*.md`, `A/ledger-and-account-code-hierarchy-levels-73c7c458.md`,
  `A/global-level-a53bf756.md` — Accounting Administration (already built).
* `A/authorized-approver-list-a9522ec8.md`, `A/routing-configuration-hierarchy-8b45d8d3.md` —
  Routing Configuration (already built).
* `A/restrict-use-of-delete-request-link-in-the-payment-request-list-page-f201c8db.md`,
  `T/using-the-capture-batch-list-page-cceaaeae.md`,
  `T/searching-for-supplier-or-upload-batches-in-the-capture-batch-list-page-3045c1d0.md` —
  the word "list" in a grid name, not a list object.

---

## 4. PAGE: `company-locations` — Company Locations (`/expense/admin/invoice/companyLocations.asp`)

### 4.1 Commands run

```
ls concur-invoice-professional-edition-admin-guides/ | grep -iE 'location|address|ship|bill-to|billing|site'
ls concur-invoice-professional-edition-tools-guides/  | grep -iE 'location|address|ship|bill-to|billing|site'
grep -ril "Company Locations" <both dirs>
grep -ril -E "shipping address|billing address|ship to address|bill to address|Ship To|Bill To|company location" <both dirs>
grep -rhoiE "Administration ?> ?Invoice ?> ?[A-Za-z &()'-]+" <both dirs> | sort | uniq -c | sort -rn
grep -ril "Download the import template" <both dirs>
for f in <candidates>; do wc -l; grep -cE '^ *\|'; grep -c '<table'; grep -m1 deliverable_id:; done
```

### 4.2 Documentation skew — CONFIRMED, and it is the Vendor-Search-Admin pattern again
`grep -ril "Company Locations"` returns **9 admin files and 10 tools files**, but the *procedural* body
of the page — access, add, edit, delete, import, export, search, default assignment, PO-import
interaction — is **entirely in tools-guides (deliverable_id 41460673)**. The admin-guides files are
context and cross-references only. A search skewed to admin-guides loses the whole page, including its
12-row field catalog.

### 4.3 mustRead

| file | why | lines | raw tbl |
|---|---|---|---|
| T/add-a-shipping-or-billing-address-3b51c816.md | **The page's field catalog: a 12-row table** — Name (Required), Address Code (Required), Address 1 (Required), Address 2 (Optional), Address 3 (Optional), City (Required), Postal Code (Required), Country Code (Required), State/Province (Optional), Email Address (Optional), VAT ID (Optional), "Add address as a Ship To Location as well" (Optional). Also the Ship To tab, the New button and the **Add New Ship To Location** window. Scores `^|` = 0 — **must be counted with `^ *\|`**. | 203 | 0 |
| T/access-company-locations-024afbe1.md | Canonical nav: "Company Locations is accessible from the **Invoice Processing Admin** menu." then `Go to Administration > Invoice.` / `Select Company Locations (left menu).` Confirms the middle-nav-node rule. | 27 | 0 |
| T/overview-8b494195.md | The tool's five verbs: "add, edit, delete, import, and export shipping and billing addresses". Generic filename — easily missed; anchored to deliverable_id 41460673. | 25 | 0 |
| T/required-roles-476a5f62.md | "Invoice Configuration administrator or Invoice Configuration (Restricted) administrator role" + Invoice Users select their own default via Profile. Generic filename — easily missed. | 21 | 0 |
| T/edit-a-shipping-or-billing-address-c8138913.md | Modify path (select + Modify, or double-click) and the **Modify Ship To Location** window. | 35 | 0 |
| T/delete-a-shipping-or-billing-address-ae7aef28.md | Remove button, the "Remove selected Company Locations" confirmation, and the **soft-delete semantics**: "The address remains available and can be reactivated by entering the same Address Code. The system creates a new record." | 37 | 0 |
| T/import-shipping-or-billing-addresses-601c2549.md | Import button, **Import Ship To Locations** window, "Download the import template" link, Browse/Open/Import, Import Summary page, "Ship To Locations import history" section. | 49 | 0 |
| T/export-shipping-or-billing-addresses-59f051b2.md | **Export All** button → Excel. | 29 | 0 |
| T/how-company-locations-works-with-the-purchase-order-import-ed09e36a.md | The 210/220 record linkage and the identity rule: "Identical records are those that share the same Address Code (in Company Locations) and External ID (within the associated record in the PO import)." | 27 | 0 |
| T/search-for-a-ship-to-or-bill-to-address-1d864cfe.md | Ship To Address / Bill To Address search fields and what the type-ahead shows. | 25 | 0 |
| T/assign-or-select-a-default-shipping-address-bf0bdfe0.md | Default-shipping assignment via the Employee Import **360-record set** using Address Code. | 23 | 0 |
| A/set-a-default-shipping-and-billing-address-f772bed1.md | The admin-side counterpart: `Click Administration > Invoice, and then click Company Locations`, Ship To → New, Import / **Export All**, the "type the Name value (for example, Triton, and not the Address)" tip, the Employee Import **Default Shipping Address** field in the 360-level record set, Profile > Invoice Preferences > Purchase Request > Default Shipping Address, and User Administration assignment. | 72 | 0 |
| A/understand-and-use-company-locations-377ff23e.md | The nav variant `Administration\> Invoice > Company Locations` (backslash-escaped `>` — a text trap), and the tax dependency: ship-to location dictates VAT. Names the external *Concur Invoice: Company Locations Setup Guide*. | 29 | 0 |
| A/purchase-order-bill-to-address-record-type-210-format-b8e18edd.md | **12-row import column catalog** for Bill-To: Record Type (static 210), External ID (max 32), Name (max 100), Address 1/2/3 (max 255), City, State/Province, Postal Code, Country Code, **Future Use 1-10** (compressed range — rule 8), with Required? Y/N per row. | 226 | 0 |
| A/purchase-order-ship-to-address-record-type-220-format-d6da48d9.md | Twin of the above for Ship-To (record type 220). Field names verified **identical** to 210 by extraction; read both anyway — the Required? column and Definition text must be checked per file, not assumed. | 226 | 0 |
| T/change-ship-to-or-bill-to-address-18a4dbb6.md + T/change-ship-to-or-bill-to-address-2c926795.md | Same title, two loios, 39 vs 41 lines — a genuine near-twin pair. Read both and record any UI difference rather than merging. | 39 / 41 | 0 |
| T/change-ship-to-address-564e516a.md | Third variant of the same action, ship-to only. | 37 | 0 |

### 4.4 alsoRelevant
`T/company-locations-8b49554d.md` (**cover topic — 23-row revision history, no config content**, but it
is the only place that dates the field additions: "April 14, 2018 ... addition of the email address
field", "September 9, 2016 ... VAT ID field in bill-to address / State/Province field now an optional
field", "September 17, 2014 ... two user interfaces". Use for dating a UI-variant claim only, per the
release-note rule applied by analogy),
`A/configuration-overview-8b381d33.md` (**dual-page** — Tax Administration overview that also names
company locations), `A/provide-a-location-for-the-tax-service-6ba2cb41.md` (**dual-page** — uses the
`Invoice Admin > Company Locations` alias and defers to the *Shared: Locations Setup Guide*),
`A/step-4-add-a-new-tax-authority-7f90cede.md` (**dual-page** — "Invoice will pull the ship-to
information from the Company Locations page"), `A/calculate-vat-and-required-criteria-89f97622.md`
(Company Location as a calculation input), `A/create-an-invoice-with-tax-validation-a515e7a3.md`,
`A/limitations-f5fac4b5.md` (**Peppol** limitation: "The company ship-to address code maintained in
Company Locations ... must match the ship-to address code in the invoices coming from Peppol" — a
dependency onto the not-yet-built Peppol Configuration page),
`A/configure-purchase-orders-8128725e.md`, `A/step-4-additional-configuration-steps-37f6c7ba.md`,
`A/shipping-configuration-and-shipping-terms-3429ee14.md` (points at the not-yet-built Shipping
Configuration page — a legitimately unresolved dependency),
`T/purchase-order-contact-and-email-address-d5bdbbad.md`, `T/view-purchase-order-contact-and-email-address-f6f9330e.md`,
`T/complete-the-purchase-request-3dfd5f5c.md`, `T/assign-vendors-to-multiple-groups-by-vendor-and-by-address-code-7af18a16.md`.

### 4.5 Long-catalog census — Company Locations

| file | enumerates | ~rows |
|---|---|---|
| T/add-a-shipping-or-billing-address-3b51c816.md | Ship To / Bill To address fields (Required/Optional) | 12 |
| A/purchase-order-bill-to-address-record-type-210-format-b8e18edd.md | 210 import columns (4-col: Field Name / Definition / Required? / Description) | 12 |
| A/purchase-order-ship-to-address-record-type-220-format-d6da48d9.md | 220 import columns | 12 |
| T/company-locations-8b49554d.md | revision history | 23 |
| **A/country-code-list-8b3e2eda.md** | **country code → country name, 249 entries** (AF/AFGHANISTAN … ZW/ZIMBABWE, includes AX ÅLAND ISLANDS and the retired YU YUGOSLAVIA) | **249** |

#### ⚠ Scope warning on the 249-row country code catalog — read before using it
`A/country-code-list-8b3e2eda.md` (2336 lines) is **the largest single catalog relevant to any of my
four pages** and is exactly the class of artefact this project has lost before. But its own documented
scope is narrower than it looks:

> "The following lists the country code list that you use when creating the **vendor import file**."
> "It is important that you use capital letters (ALL CAPS) for the country code."

Company Locations' own Country Code field says only: *"If you are using the import template to import
company locations, you must use 2 character ISO code."* — it never points at this table.
**So: capture all 249 rows, and record the appliesTo scope VERBATIM as the vendor import file.
Attaching this list to the Company Locations `Country Code` field would be an inference, not a
documented enumeration.** Flag the gap instead.
The second file, `A/country-code-list-8b3e41a4.md` (173 lines), is the **revision-history cover topic of
the same guide** and contains no codes — do not treat the two as contradicting lists.

### 4.6 Contradictions / variants to record
1. **Three nav renderings**: `Administration > Invoice > Company Locations` (bare),
   `Administration\> Invoice > Company Locations` (backslash-escaped, 377ff23e), and
   `Invoice Admin > Company Locations` (6ba2cb41). Plus the middle-nav-node claim
   "accessible from the Invoice Processing Admin menu" (024afbe1).
2. **Three "change ship-to/bill-to address" topics** with distinct loios (18a4dbb6, 2c926795, 564e516a)
   — check for a UI variant rather than assuming a republish.
3. **External-guide names differ**: *Concur Invoice: Company Locations Setup Guide* (377ff23e),
   *Concur Invoice: Company Locations User Guide* (f772bed1), *Shared: Locations Setup Guide* (6ba2cb41).
   None is in this corpus.
4. `VAT ID` is documented in the shared Add-address table but carries the restriction "only applicable
   on the bill-to address" — the same table serves both tabs, so the per-tab field set is **not**
   identical. Record that, do not flatten.

### 4.7 Ruled out
* `A/allocation*`, `A/*email-address*`, `T/setting-up-an-exception-email-address-b233e300.md`,
  `T/filtering-the-vendors-based-on-the-email-address-f6edb26a.md` — filename `address` hits in the
  Allocations / vendor-filter / exception-email domains.
* `A/sample-record-type-210-91f4d609.md` — historical-invoice sample, not the PO 210 bill-to record.
* `T/the-import-template-fields-and-descriptions-8b53850b.md` (715 lines, 163 pipe lines) — the
  **Vendor import** template, not the Company Locations import template. Note: **the Company Locations
  import template's column list is NOT documented anywhere in this corpus** — 601c2549 only says
  "Download the import template link". That absence is itself a finding; the 210/220 record formats are
  the nearest documented column set and are a *different* import.
* `A/use-the-employee-import-overnight-job-3a884841.md`, `A/implementation-sequence-of-records-babdd3d9.md`,
  `A/pre-configuration-checklist-4d3d6cf0.md` — Imports domain; Company Locations is a cross-reference.

---

## 5. Cross-page notes for the extraction agents

* **Dual-homed files** (assign to both, do not pick arbitrarily):
  `A/provide-a-location-for-the-tax-service-6ba2cb41.md`, `A/step-4-add-a-new-tax-authority-7f90cede.md`,
  `A/calculate-vat-and-required-criteria-89f97622.md`, `A/create-an-invoice-with-tax-validation-a515e7a3.md`,
  `A/configuration-overview-8b381d33.md`, `A/limitations-f5fac4b5.md` → tax-administration **and**
  company-locations.
* **Cite-but-never-re-home** (they belong to already-built pages):
  `A/available-vat-fields-8b395ce2.md`, `A/extract-vat-data-8b3996e0.md`, `A/configure-vat-labels-9d4795b9.md`,
  `A/configure-the-specify-tax-in-invoice-details-or-itemization-summary-feature-11c6df01.md` →
  page.forms-and-fields; `A/add-a-new-connected-list-definition-fc9f852a.md`,
  `A/field-configuration-information-5813462a.md`, `A/access-connected-lists-39dd2408.md` →
  page.forms-and-fields (field `connectedListsTab`); `A/vendor-tax-id-0f8f83bc.md` → page.audit-rules;
  `A/configuring-forms-and-fields-in-capture-processing-7c14446c.md` +
  `T/what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md` → page.capture-processing-admin.
* **Unresolvable dependencies** (target page not built — leave unresolved, do not invent):
  Peppol Configuration (from `A/limitations-f5fac4b5.md`), Shipping Configuration (from
  `A/shipping-configuration-and-shipping-terms-3429ee14.md`), Workflows (from `A/events-triggers-72339a13.md`),
  Localization (from `A/use-an-expense-type-as-the-first-field-in-a-connected-list-e0c5f415.md`),
  Feature Hierarchies and Hierarchies (both real Invoice admin pages, neither in the build list).
* **External guides the corpus defers to and that are NOT in this corpus** — cite the deferral, never
  the content: *Shared: Budget Setup Guide*, *Shared: List Management Setup Guide* /
  *Concur Invoice: List Management Setup Guide*, *Shared: Feature Hierarchies Setup Guide*,
  *Concur Invoice: Company Locations Setup Guide* / *User Guide*, *Shared: Locations Setup Guide*,
  *Concur Invoice: VAT Setup Guide*, *Shared: Validations Setup Guide*,
  *Concur Invoice: Payment Request Accounting Extract V2 (Current) Specifications*.
* Nothing in this inventory is sourced from `concur-invoice-professional-edition-release-notes/` or
  `concur-invoice-professional-edition-release-note-summaries/`. Those were queried only to confirm the
  absence of "Budget Configuration" corpus-wide.
