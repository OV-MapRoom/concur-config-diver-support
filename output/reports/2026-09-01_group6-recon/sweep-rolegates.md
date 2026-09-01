# Group 6 recon — SWEEP: ROLE GATES & TOOL TOPICS
Corpus 2026_08 Professional Edition. Frozen; read-only. 2026-09-01.

## Method
1. Extract every "<Name> tool" noun phrase and every "The X tool lets/is/allows..." sentence, corpus-wide.
2. Extract every role-gate sentence form: "is limited to users with", "must be assigned the", "must have the X role",
   "requires the X role", "is available if the user", "Only the user with", "Only the X administrator can",
   "is visible if/to", "can access the X tool/page", "This portion of the configuration requires permissions for".
3. For every gate found, COUNT the surfaces it covers before calling it distinctive.
4. Enumerate the `required-roles-*.md` and `permissions-*.md` topic families.
5. Cross-check each candidate against the three page-hood tests (a) menu destination (b) distinct role gate (c) object model.
6. Verify every quote with `grep -F -c`; NBSP-check with python3 counting b"\xc2\xa0".

## Gate distinctiveness table (files containing the literal gate string)
| gate | files | verdict |
|---|---|---|
| Invoice Configuration Administrator (any form) | 28 | NOT distinctive |
| Invoice Configuration administrator (Restricted) | 9 | NOT distinctive (matches the brief's "gates NINE surfaces") |
| Tax Administrator | 9 | scoped to Tax Administration (already a page) |
| Global Invoice Configuration administrator | 5 | 4 surfaces: Printed Invoices, Expense Types, Forms and Fields, Workflows — semi-distinctive |
| Group Invoice Configuration administrator | 4 | paired with the Global gate |
| Shared Configuration administrator | 8 hits / 6 files | Ledgers + Connected List Definition — both TABS/wizards, not pages |
| Import/Extract Monitor | 2 | Tools-page access, shared with e-Bunsho |
| Expense Configuration Administrator (Attendees) | 2 | distinct, but Expense domain |
| **Digital Compliance Administrator** | **1** | **THE ONLY DISTINCTIVE COMPLIANCE-DOMAIN GATE IN THE CORPUS** |

## `required-roles-*.md` family: 15 files. NONE is a Peppol / Shipping / Localization topic.
## `permissions-*.md` family: 56 files. 55 are boilerplate ("A company administrator may or may not have the
correct permissions..."). Exactly one carries real content (Capture Processing). This family yields ZERO
page-hood signal — do not mine it.

## Title-is-a-Tool topics (12 corpus-wide)
Access the Group Configurations Tool / Access the Process Images Tool / Accessing and Viewing Policies within
the Policies Tool / Accessing the Vendor Manager Tool / Email Reminders Tool / **Invoice E-Bunsho Timestamp
Validation Request Tool** / Ledger Tool / **Printed Invoice Tool** / Tax Administration Tool / Use the Purchase
Order Configuration Tool / Using the Capture Processing Admin Tool / Workflows Tool.
Two of these twelve are NOT in the 25-page graph: e-Bunsho Validation Request, Printed Invoice.

## The three claimed pages — what MY sweep adds
- **Peppol Configuration**: gate = "Access to Peppol Configuration is limited to users with the Invoice
  Configuration Administrator role." (limitations-f5fac4b5.md, 1 hit). Gate NOT distinctive (28 files).
  Nav verified: "Navigate to Administration > Invoice > Invoice Processing Admin > Peppol Configuration."
  (professional-edition-7e36681a.md, 1 hit). Edit/Deactivate are in-place (Click Edit → Save), NOT pages.
  Participant registration happens in SAP DRC cloud edition, an EXTERNAL product.
- **Shipping Configuration**: exactly ONE topic file in the whole corpus (shipping-configuration-and-shipping-
  terms-3429ee14.md). Gate names BOTH Invoice Configuration administrator and (Restricted) — neither
  distinctive. Tabs = Shipping Types / Shipping Terms; NO separate topics for them → one page, tabs.
- **Localization**: **NO ROLE GATE EXISTS ANYWHERE IN THIS CORPUS.** Test (b) does not fire at all.
  Passes (a) twice. Its own docs are out of corpus ("refer to the Shared: Localization Setup Guide") — it is a
  SHARED tool surfaced under the Invoice menu. "Export Localization" is a sub-action, "Edit Localization page"
  is the modify view over a selected message item. Neither is a separate page.

## NEW candidates my sweep found (not in the 25-page graph)
### A. Invoice E-Bunsho Timestamp Validation Request  — COMPLIANCE DOMAIN, strongest new find
- (a) FIRES, and off a DIFFERENT MENU TREE with no parent in this graph — the Authorized Approval Limits shape:
  "1.  Click Administration > Company > Tools." + "2.  Click Invoice E-Bunsho Timestamp."
  (view-validation-status-98f82b1e.md; both verified grep -F -c = 1; file has ZERO NBSP).
- (b) FIRES DISTINCTIVELY — the only 1-file gate in the compliance domain:
  "Users with the Invoice Processor role combined with a role that grants access to the Tools page (for example,
  the Digital Compliance Administrator role or the Import/Extract Monitor role) can access the Invoice E-Bunsho
  Timestamp Validation Request tool from the Administration > Company > Tools page." (e-bunsho-timestamp-092c1c08.md)
- (c) WEAK: a date-range search/monitor surface (Creation Date From/To, Search, four count columns). Creates no
  objects. Drill-down is a MODAL: "Click X to close the Timestamp Validation Failure window."
- Verdict: admin-page on (a)+(b). Thin (~4 fields + a modal), but it is a real, separately-reached destination.

### B. Printed Invoices  — 34 topic files, its own guide root, NOT in the graph
- (a) FIRES: "Click Administration > Invoice and then click Printed Invoices." → "The Printed Invoices page appears."
  (access-printed-invoices-c04fdd28.md). NOTE this nav is written WITHOUT a full "A > B > C" chain, so a
  nav-string regex sweep MISSES it entirely — it did in my own first extraction pass.
- (b) FIRES: "NOTE: Only the Global Invoice Configuration administrator can make edits in the Print Templates
  section of Printed Invoices page." plus a Global-vs-Group print-format ownership model in print-formats-8b366049.md.
- (c) FIRES HARDEST: print templates, print formats, print condition rules, content IDs — four object kinds with
  add / edit / delete / assign-to-policy verbs of its own.
- TABS (Audit Rules precedent → ONE page, three tabs):
  "On the Printed Invoices page, click the Print Templates tab." / "Click the Print Formats tab on the Printed
  Invoices page." / "On the Printed Invoices page, click Print Condition Rules."
- Has a GUIDE ROOT ("Printed Invoice Configuration", Applies-to + Revision History) exactly like "Peppol Integration".
- Group assignment ambiguous: document-output, but localization-coupled — Print Templates explicitly says
  "Do not embed text into the HTML—it is not localized. Instead, create a text content ID and add the text in the
  Print Format." That coupling is why it surfaced on a compliance/localization sweep.

### C. Attendees + Attendee Admin  — distinct gate, NOT compliance domain, flag for another group
"To configure the Attendee feature for Concur Invoice, admins must have both the Expense Configuration
Administrator role and Invoice Configuration Administrator role." (configuration-overview-and-procedures-8b282979.md)
Nav: "Administration Expense Attendees" (8 hits) and "(Administration \xa0\xa0Company \xa0\xa0Tools \xa0\xa0Attendee Admin.)".

## Negatives (compliance-domain features whose admin surface is ALREADY BUILT)
- Digital Tax Invoice / CFDi (Mexico): entire config is one check box on Group Configurations —
  "3.  In the Configuration for Group page, select Allow users to upload CFDi attachments." plus INVXMLST
  workflow/audit rules. Gate: plain Invoice Configuration administrator. NOT a page.
- VAT (25+ topics): lands on Tax Administration tabs (Expense Type Groups, Vendor Groups) + Forms and Fields.
- Ledgers ("Ledger Tool", gate = Shared Configuration administrator): "On the Accounting Structure tab, select
  New." → a TAB of Accounting Administration.
- Connected List Definition (gate = Shared Configuration administrator): an explicit five-step wizard → Workflows-
  wizard precedent, not a page.
- Invoice Preferences: END USER, Profile > Profile Settings > Invoice Preferences.
- SAP DRC cloud edition Message Monitor + Peppol SMP participant registration: a DIFFERENT SAP PRODUCT
  (help.sap.com/SAP_DRC_CLOUD links). Not drivable from the Concur admin UI.
- Vendor Handling: one single mention corpus-wide, "Administration > Invoice > Vendor Handling" as the vendor-side
  sibling of Image Handling. Undetermined; not compliance domain.
- Payment Group Configuration: Invoice Pay → Group 7 (deferred).

## Measurement traps — all four re-confirmed live in THIS domain
1/2. naive `grep -c "^| "` returns 0 on configuring-peppol-integration-60b28605.md while `grep -cP "^\s*\|"`
   returns 19. Conversion (cellopen − sepLines)/(cols+1): 19 → **6 rows** (2 cols), NOT 19.
   Calibration proof: limitations-f5fac4b5.md cellopen=16, 2 cols → (16−1)/3 = **5 rows**, and the table visibly
   has exactly 5 rows (header + Peppol Configuration, Company Locations, Invoice tax population, Ledgers). ✔
   step-5 Localization: cellopen=17, 3 cols → (17−1)/4 = **4 rows**, not 17.
3. `grep -o "<tr" | wc -l` used throughout (invoice-text-content-type-02b21c13.md has 11 raw <tr).
4. NBSP: 41 of the nav strings I extracted use U+00A0 as the separator with NO ">" glyph. Proven by a
   grep -F -c returning **0** on "(Administration   Company   Tools   Attendee Admin.)" typed with ASCII spaces;
   the real bytes are `Administration \xc2\xa0\xc2\xa0Company \xc2\xa0\xc2\xa0Tools \xc2\xa0\xc2\xa0Attendee Admin.`
5. REVISION-HISTORY trap live in BOTH new page sets: the largest table in the Peppol set is
   peppol-integration-a086fb28.md (cellopen 34 → 11 rows) = Revision History; the largest in the Printed Invoices
   set is printed-invoice-configuration-8b35ee51.md (cellopen 64 → 21 rows) = Revision History. Neither is a
   field roster. details-section-49500221.md (cellopen 1360, 6 cols → ~194 rows) is an EXTRACT/IMPORT field spec,
   not an admin-page roster.
6. deliverable_id constant per directory — confirmed, ignored.

## Bottom line from THIS sweep
Group 6 as three pages is WRONG IN BOTH DIRECTIONS AT ONCE.
- Localization is the WEAKEST of the three (no role gate anywhere; its own guide is out of corpus).
- Shipping Configuration rests on a SINGLE topic file.
- Two admin pages with better page-hood evidence than Localization are missing from the graph entirely:
  Invoice E-Bunsho Timestamp Validation Request (compliance domain, the only distinctive gate found) and
  Printed Invoices (34 files, own guide root, four object kinds, three tabs).
