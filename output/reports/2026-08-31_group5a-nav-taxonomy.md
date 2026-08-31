# Group 5A Navigation Taxonomy — Expense Types, Forms and Fields, Accounting Administration, Map Invoice Concept Fields

Corpus searched: both `concur-invoice-professional-edition-admin-guides` and `...-tools-guides` (2026_08).

---

## 1. Expense Types

**Click sequence** (`accessing-expense-types-acb02b63.md`):
> "1. Select Administration  Invoice. 2. From the Invoice Processing Admin menu, choose Expense Types."

Also stated in `expense-types-and-policies`/`expense-types-process-8b2dbb0e.md` as living in "Expense Types tool in Invoice Administration."

- **Aliases**: "Invoice Processing Admin > Expense Types" (primary); "Expense Types area of the Administrator" (`changing-the-status-of-an-expense-type-1e641b70.md`).
- **Tabs/steps on the page**: not tabs but a 3-step wizard when adding — Step 1: General (Name, Spend Category), Step 2: Policies, Step 3: Attendees (`adding-expense-types-97cac818.md`). Editing reopens the same steps (`edit-expense-types-c6d0b6fc.md`: "Click Next until you reach the Attendees tab").
- **Admin role**: "By default, only an administrator with Global rights can create or edit a new expense type. If the Group Create Rights policy setting is selected, then a group administrator can also create and edit expense types." (`adding-expense-types-97cac818.md`). Activation-per-policy is done separately in the **Policies** tool, not on this page.
- **Renamed/absorbed/split?** No — the page is present and current. It has a duplicate pair of near-identical topics for several actions (e.g., `editing-expense-types-87b972d0.md` vs `edit-expense-types-c6d0b6fc.md`; `change-the-status...-cf452b6a.md` vs `changing-the-status...-1e641b70.md`) — these read as legacy/rewrite duplicates covering the same UI, not a legacy/New-Experience split (no "New Experience" language found on any of them; treat as `uiVariant: undifferentiated`).
- **Coverage read**: Solid — access, add, edit, delete, and status-change are all separately documented with verbatim field tables (attendee checkbox table is thin-but-real).
- **Catalog tables**:
  - `list-of-spend-categories-8b2de886.md` — **"Available Spend Categories"** pipe table with columns Spend Category / Spend Category Code / Recommended Use / Description. Counted **~50 concrete entries** (verified via unique uppercase code strings, e.g. TRAIN, UTLTS). Not raw HTML (`grep -c "<table"` = 0). This is the catalog the extractors need for the Spend Category field on Step 1: General.
  - `spend-categories-3e18cb3b.md` is a short concept page, not the catalog itself — don't double-count it.

---

## 2. Forms and Fields (Invoice Processing Admin)

**Click sequence** (`accessing-the-forms-and-fields-page-8b2e27af.md`):
> "1. Click Administration  Invoice. 2. Under the Invoice Processing Admin menu, click Forms and Fields."

- **Aliases**: none beyond the standard "Administration > Invoice > Invoice Processing Admin > Forms and Fields."
- **Structure/tabs**: This page is driven by a **Form Type** selector (`select-a-form-type-36dec640.md`, `accessing-forms-e46897a3.md`), which then exposes two tabs:
  - **Fields** tab (`accessing-fields-17089536.md`, `working-with-the-forms-and-fields-page-8b2ea265.md`) — modify field attributes.
  - **Form Fields** tab (`accessing-forms-fields-d7c875b0.md`, `modifying-form-fields-f9433665.md`) — has a search box (label substring + magnifying glass) and per-form field trees.
- **Admin role**: "Invoice Configuration administrator" (unqualified/general) per `accessing-the-forms-and-fields-page-8b2e27af.md`. (Contrast with Capture Processing's separate page below, which requires the *Unrestricted* variant specifically.)
- **Renamed/absorbed/split?** **IMPORTANT FINDING — name collision, not a rename.** "Forms and Fields" is documented as **two structurally distinct pages** sharing one name:
  1. **Invoice Processing Admin > Forms and Fields** (this section) — the full field-modification tool with Form Type/Fields/Form Fields tabs, `Modify Field`/`Modify Fields` windows.
  2. **Capture Processing Admin > Forms and Fields tab** (see §2a below) — a tab inside a different admin tool (Capture Processing Admin), scoped only to OCR/verification form setup.
  Extractors must not conflate these — same label, different `page` nodes, different parent nav, different role gate.
- **Coverage read**: Good — access, modify-fields (single/attribute-level), and modify-form-fields (bulk/multi-select) are each documented, plus a large field-attribute reference table.
- **Catalog table**: `modifying-fields-b16a6078.md` contains the **Data Type → Control Type Options** mapping table (Amount/Boolean/Connected List/Date/Integer/List/Numeric/Text → their control types), plus the full Data Type enum (8 values: Amount, Boolean, Connected List, Date, Integer, List, Numeric, Text) and the Default Value Type enum (Copy Down / Copy Down from Purchase Order Header / None) and Access Rights enum (Modify / Read-only / Hidden). Small but fully enumerated and genuinely `validValues`-worthy. Markdown pipe table, not raw HTML.

### 2a. Forms and Fields tab (Capture Processing Admin) — related but separate page
Parent path: `accessing-capture-processing-admin-2fb515a6.md`:
> "The Invoice Configuration administrator (Unrestricted) role navigates to Administration > Invoice > Capture Processing Admin to open the page. The page opens to the Capture Processing view of the Forms and Fields tab."

- **Sibling tabs on Capture Processing Admin** (`using-the-capture-processing-admin-tool-8b2ae77c.md`): Forms and Fields, Task Definition, Email Administration, Supplier Email Administration, Other Settings.
- **Admin role**: "Invoice Configuration administrator (Unrestricted)" — explicitly the *Unrestricted* variant, distinct from the general role cited for the standalone Forms and Fields page.
- **Catalog table**: `configuring-forms-and-fields-in-capture-processing-7c14446c.md` has a **raw `<table>`** (`grep -c "<table"` = 1 → `fromRawHtmlTable: true` eligible) enumerating "Fields Supported for Capture for Client-Managed Capture Processing" — Header Fields (Vendor Name, Invoice Date, Invoice Number, Currency, Total Amount, Shipping, Tax, PO Number, Invoice Owner is configured, Vat 1, Vat Amount 1-4) and Line-Item Fields (Part Number, Description, Total (calculated), Quantity, Unit Price, PO Number, Vat 1, Vat Amount 2-4). Note the compressed ranges "Vat Amount 1-4" / "Vat Amount 2-4."
- **Tools-guides variant**: `forms-and-fields-dccd3d8c.md` (Tools Guides deliverable) is a thin end-user-facing restatement of the same Capture Processing Forms and Fields tab — confirms the tab exists but adds no new fields; use admin-guides as primary source.

---

## 3. Accounting Administration

**Click sequence** (`accessing-the-accounting-administration-page-64021b08.md`):
> "1. Select Administration  Invoice Admin. 2. Select Accounting Administration. The Account Codes tab of the Accounting Administration page appears."

- **Aliases**: "Invoice Admin" alias confirmed active here too.
- **Tabs**:
  1. **Account Codes** (default landing tab) — `account-codes-tab-2acab3a1.md`: left pane = account code hierarchy tree (root "Global," level 1 "Ledger," then configured levels); right pane = per-expense-type Account Code / Inherited Code / Inherited Level columns.
  2. **Accounting Structure** — reached via "Accounting Administration > Accounting Structure" (`accessing-the-ledger-a5dae897.md`, `accessing-the-account-code-hierarchy-page-edce1aa5.md`). Lists ledgers (Ledger Name/Ledger Code — `adding-a-new-ledger-1ef1c514.md`) and, per ledger, a "Modify Hierarchy" action opening the **Account Code Hierarchy for Ledger** page (adding/editing/deleting Segments: `adding-a-new-segment-d6dfb07b.md`, `editing-a-segment-f79aecf7.md`, `deleting-a-segment-62b49ad9.md`).
- **Admin role** (`required-roles-1f2a20f6.md`, verbatim): "The Shared Configuration administrator defines the ledger. The Invoice Configuration administrator: Defines the account code hierarchies / Maps the expense type/account codes. The Account Codes tool is available if the user has been assigned the Invoice Configuration administrator (Restricted) role." — three distinct role/task pairings, worth modeling separately.
- **Renamed/absorbed/split?** Not renamed. Note: "Ledgers" itself is documented as a **stub/pointer page** — `ledgers-1414170c.md`: "For information about ledgers, refer to the Concur Expense: Ledgers Setup Guide" — the Ledgers *concept* is authoritative in a different (Expense) guide even though the Accounting Structure tab is where ledgers are administered inside Invoice.
- **Coverage read**: Strong for Account Codes and Accounting Structure/segments; thin-by-design for the underlying Ledger concept (deliberately punted to Concur Expense docs — do not fabricate ledger fields from Invoice docs).
- **Catalog tables**:
  - `account-code-hierarchy-869f7eca.md` — enumerated criteria list: Invoice-related (Country, Currency, Policy, **"Org Unit 1-6"**, **"Custom 1-20"**), Invoice Line Item (Custom 1-20), Allocation-related (Custom 1-20). Compressed ranges present — "Org Unit 1-6" (expands to 6 concrete fields), "Custom 1-20" (expands to 20 concrete fields, appears 3 times in different scopes: Request, Line Item, Allocation — these are likely three *separate* field families despite the identical literal name, per-scope).
  - `adding-a-new-segment-d6dfb07b.md` — Segment Name options by Level: Request (Country, Currency, Custom 1-20, Org Unit 1-6, Policy Name), Line Item (Custom 1-20), Allocation (Custom 1-20). Same compressed-range caveat applies.
  - Both are small enumerated lists (not huge tables) but structurally important — every value is a genuine `validValues` candidate for the "Segment Name" list field.

---

## 4. Map Invoice Concept Fields

**Not found.** Exhaustive search (`grep -rli "map invoice concept\|concept field"` across both directories, plus "Map Invoice," "Concept," "mapping") returns **zero hits** for any page, alias, or breadcrumb matching this name. Related-but-distinct pages that do exist and might be confused with it:
- `field-mapping-e3881fa5.md` ("Field Mapping") — a **Peppol ↔ Concur Invoice field** reference table (not a "Concept Fields" admin page; it's a static integration-reference topic, not a configurable UI screen). Contains a large enumerated Peppol-field-to-Invoice-field table (~35+ rows) worth capturing separately if Peppol/e-invoicing is in scope for another group.
- `map-to-the-general-ledger-ada4de6b.md` ("Map to the General Ledger") — a short concept page about GL segment mapping philosophy, not a configuration screen with fields/tabs.

**Recommendation**: Report this target as absent from the 2026_08 corpus rather than force a match. If "Map Invoice Concept Fields" is a real screen name in some other SAP Concur product surface (e.g., unified Expense/Invoice data model "Concept" mapping used elsewhere in SAP DRC/Cloud Integration docs), it is not documented under CONCUR_INVOICE Professional Edition admin or tools guides as crawled.

---

## Summary table

| Page | Present in 2026_08? | Parent path | Tabs/steps | Role | Catalogs |
|---|---|---|---|---|---|
| Expense Types | Yes | Administration > Invoice > Invoice Processing Admin > Expense Types | 3-step wizard (General/Policies/Attendees) | Global rights (or Group Create Rights) | Spend Categories table (~50 entries) |
| Forms and Fields (Invoice Processing Admin) | Yes | Administration > Invoice > Invoice Processing Admin > Forms and Fields | Form Type selector → Fields tab, Form Fields tab | Invoice Configuration administrator (general) | Data Type/Control Type enum table |
| Forms and Fields tab (Capture Processing Admin) | Yes — separate page, same label | Administration > Invoice > Capture Processing Admin (opens on this tab) | Sibling tabs: Forms and Fields, Task Definition, Email Admin, Supplier Email Admin, Other Settings | Invoice Configuration administrator (Unrestricted) | Raw-HTML supported-fields table (Header + Line-Item) |
| Accounting Administration | Yes | Administration > Invoice Admin > Accounting Administration | Account Codes tab (default), Accounting Structure tab (→ Modify Hierarchy → segments) | Shared Config admin (ledger) + Invoice Config admin Restricted (account codes) | Org Unit 1-6 / Custom 1-20 compressed-range criteria lists (x2 pages) |
| Map Invoice Concept Fields | **Absent** | — | — | — | — |

No UI-variant (legacy vs. New Experience) split was found documented for any of these four targets — all read `uiVariant: undifferentiated`.