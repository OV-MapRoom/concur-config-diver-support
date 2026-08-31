# Group 4 "Capture & Vendors" — Navigation Taxonomy (2026_08, Professional Edition)

## 1. Capture Processing Admin

**Click sequence (verbatim):** "The Invoice Configuration administrator (Unrestricted) role navigates to Administration > Invoice > Capture Processing Admin to open the page."
`sourceFile: concur-invoice-professional-edition-admin-guides/accessing-capture-processing-admin-2fb515a6.md`

**Aliases:** Deliverable/topic is also titled "Capture Processing (Client-Managed)" (`capture-processing-client-managed-8b2ac260.md`) and referred to inline as "the Capture Processing Admin tool" (`using-the-capture-processing-admin-tool-8b2ae77c.md`). Field-adding instructions say fields are added "using the Administration > Invoice > Capture Processing Admin tool" (`configuring-forms-and-fields-in-capture-processing-7c14446c.md`) — same path, no variant wording.

**Tabs (verbatim, from `using-the-capture-processing-admin-tool-8b2ae77c.md`):** "The tool includes options available on several tabs on the page: Forms and Fields ... Task Definition ... Email Administration ... Supplier Email Administration ... Other Settings"
- Forms and Fields
- Task Definition(s) — page opens by default here per `accessing-capture-processing-admin-2fb515a6.md`: "The page opens to the Capture Processing view of the Forms and Fields tab."
- Email Administration
- Supplier Email Administration
- Other Settings

**Admin role required:** "Invoice Configuration administrator (Unrestricted): To use Invoice Admin tools, such as Capture Processing Admin, Routing Configuration and Forms & Fields" — `sourceFile: concur-invoice-professional-edition-admin-guides/required-roles-3ddb8d70.md`. Working the actual verification queue instead requires "Client Managed Capture Verifier" or "Invoice AP User" (same file).

**Coverage read:** Deep — dedicated admin guide (`capture-processing-client-managed-8b2ac260.md`) plus per-tab detail files (Forms and Fields, Task Definitions, Other Settings, Supplier Email Administration) and a large raw-HTML field-catalog table in `configuring-forms-and-fields-in-capture-processing-7c14446c.md` (confirmed `<table>` present, count=1) enumerating default Header/Line-Item captured fields.

**Renamed/absorbed/split/absent:** Present and stable in 2026_08 under this exact path; no legacy-UI/new-UI sibling topic found (`new-ui`/`legacy-ui`/"New Experience" grep against this topic returns nothing) — this page appears to be single-UI only in the current corpus.

---

## 2. Vendor Search Admin

**Click sequence (verbatim):** "The Invoice Admin accesses the new Vendor Search Admin tool by clicking Administration Invoice Vendor Search Admin (left menu)."
`sourceFile: concur-invoice-professional-edition-tools-guides/adding-and-removing-vendor-search-fields-e7023558.md`

**Aliases:** None found beyond "Vendor Search Admin" / "Vendor Search Admin tool" / "Vendor Search Admin page" (same file, used interchangeably). Note the doc calls it "the **new** Vendor Search Admin tool" — implying a prior/legacy vendor-search configuration surface, but no older-named page was found anywhere in either corpus directory to corroborate what it replaced.

**Tabs:** None documented — it reads as a single-screen page (grid of fields + a Searchable Yes/No column), not tab-structured.

**Admin role required:** Not explicitly named in this file beyond "Invoice Admin" (generic reference, not the formal "Invoice Configuration administrator (Unrestricted)" role string used elsewhere). No admin-guides topic exists for this page to cross-check the formal role name.

**Coverage read:** Thin — exists ONLY in the tools-guides directory (`adding-and-removing-vendor-search-fields-e7023558.md`, plus a passing mention in `adding-vendor-search-variables-for-the-user-8b53d610.md` and `user-experience-217e2941.md`). Zero hits for "vendor search" anywhere in admin-guides — no admin-guide topic documents this page at all in 2026_08.

**Renamed/absorbed/split/absent:** **Not absent, but under-documented from the admin side.** It is a real, named admin page ("Vendor Search Admin") reachable at Administration > Invoice > Vendor Search Admin, but the entire administrative reference for it lives in the Tools Guides deliverable rather than the Admin Guides deliverable — worth flagging as a coverage gap rather than a missing feature.

---

## 3. Image Handling

**Click sequence (verbatim):** "Click Administration > Invoice (on the sub-menu). ... Click Image Handling (left menu). The Image Handling window appears."
`sourceFile: concur-invoice-professional-edition-admin-guides/create-or-modify-an-invoice-or-vendor-imaging-configuration-284f3fdf.md`

**Aliases:** Split into topic-title variants for the same underlying feature area: "Image Handling – Scan Configuration" (`image-handling-scan-configuration-8b30ab80.md`), "Image Handling - Digital Tax Invoice" (`image-handling-digital-tax-invoice-8b2fb78f.md`), "Image Handling – Upload and Email" (`image-handling-upload-and-email-8b315f29.md`), and the umbrella process guide "Imaging Configuration" (`imaging-configuration-8b314b9a.md`). Also referenced as a companion page "Vendor Handling" for vendor-side imaging config: "Create an Invoice Imaging Configuration in Administration > Invoice > Image Handling ... or, for vendors, Administration > Invoice > Vendor Handling." — `sourceFile: imaging-configuration-8b314b9a.md`.

**Tabs (verbatim):** "Click the Invoice Imaging tab. ... – or – ... Click the Vendor Imaging tab." — `sourceFile: create-or-modify-an-invoice-or-vendor-imaging-configuration-284f3fdf.md`. Separately, the Scan Configuration sub-feature adds a **Scan Configurations** tab: "On the Image Handling page, admins will see the Scan Configurations tab." — `sourceFile: administrator-experience-8b302852.md`. So the page carries (at least): Invoice Imaging, Vendor Imaging, Scan Configurations.

**Admin role required:** "Invoice Configuration Administrator" performs setup steps (imaging-configuration-8b314b9a.md: "as the Invoice Configuration Administrator" appears twice for the config-creation and policy-assignment steps).

**Coverage read:** Solid but fragmented — four separate admin-guide topics cover different facets (base config, scan config, digital tax invoice, upload/email) rather than one consolidated page reference; Scan Configuration additionally reaches into the Policies and Workflows pages (Require Hardcopy Receipts step), per `administrator-experience-8b302852.md`.

**Renamed/absorbed/split/absent:** **Split across screens** — "Image Handling" is the base page/tab set (Invoice Imaging / Vendor Imaging), but its Scan Configuration functionality bleeds into Policies (Scan Configuration list) and Workflows (Require Hardcopy Receipts / Hold for Invoice Hard Copy step), and vendor-specific imaging setup is a distinct page, "Vendor Handling." Not absent, but not a single self-contained admin screen.

---

## 4. Units Of Measure

**Click sequence (verbatim):** "Click Administration > Invoice > Units Of Measure to open the page."
`sourceFile: concur-invoice-professional-edition-admin-guides/units-of-measure-270126e4.md`

**Aliases:** None found — consistently "Units of Measure" / "Units Of Measure" (only capitalization varies).

**Tabs:** None — single flat list/grid page (add/edit/soft-delete unit rows with Spend Type and Default Goods/Default Services columns); no tab structure documented.

**Admin role required:** "The Units of Measure page lets the Invoice Configuration Administrator and Invoice Configuration Administrator (Restricted) add, edit, and soft-delete a measurable identifier..." — both the Unrestricted and Restricted variants of the Invoice Configuration Administrator role are explicitly named (Restricted-role access to this page is notable since most Group-4 pages above cite only the Unrestricted role).

**Coverage read:** Thin but complete for its scope — one dedicated topic, no raw HTML table (grep confirmed 0 `<table>`), a single markdown-prose page covering purpose, default-unit designation, and downstream usage (PR/PO/Payment Request item forms, PO matching rules, audit rules, PO/Payment Request import).

**Renamed/absorbed/split/absent:** Present as its own small, standalone admin page — not folded into another tool in 2026_08, confirming this is genuinely a minor single-purpose screen rather than missing/merged content.

---

## Summary table

| Page | Status in 2026_08 | Tabs | Role |
|---|---|---|---|
| Capture Processing Admin | Present, own path, deep coverage | Forms and Fields, Task Definition(s), Email Administration, Supplier Email Administration, Other Settings | Invoice Configuration administrator (Unrestricted) |
| Vendor Search Admin | Present, but documented only in Tools Guides (admin-guides gap) | None (single screen) | "Invoice Admin" (generic; no formal role string found) |
| Image Handling | Present, split across Image Handling itself (Invoice Imaging/Vendor Imaging/Scan Configurations tabs), Policies, Workflows, and a separate "Vendor Handling" page | Invoice Imaging, Vendor Imaging, Scan Configurations | Invoice Configuration Administrator |
| Units Of Measure | Present, small, standalone, complete | None | Invoice Configuration Administrator + Invoice Configuration Administrator (Restricted) |