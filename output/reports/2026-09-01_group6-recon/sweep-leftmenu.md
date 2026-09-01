# G6 RECON — SWEEP: LEFTMENU (left-menu census under Administration > Invoice)
Date 2026-09-01. Corpus 2026_08 Professional Edition. FROZEN — read-only, nothing written to corpus.

## METHOD — four independent anchors, NBSP-normalised before every match
Trap 4 confirmed live on this machine before anything else:
    grep -rlP "\xc2\xa0" admin-guides  -> 0      (ugrep LIES)
    grep -rlP "\x{00a0}" admin-guides  -> 117    (truth)
All four extractors read files as BYTES and do `.replace(b'\xc2\xa0', b' ')` before decoding.
Scripts: census.py (chain first-segment), leftmenu.py ("(left menu)" anchor), chains.py (full nav
chain), plus two inline extractors ("The X page appears" gated on Administration; two-step
"Click Administration > Invoice." then "Click X.").

A1 "(left menu)" literal anchor      -> 26 raw labels
A2 "Administration > Invoice ..." chain -> 56 distinct chains
A3 "The X page/tool/window appears" (file must contain Administration) -> 47 labels
A4 two-step nav (step N = Administration>Invoice, step N+1 = Click X) -> 14 labels
A4 produced ZERO labels not already in A1+A2+A3 => census is closed by triangulation.

## THE CENSUS (labels attested as destinations on the Administration > Invoice left menu)
BUILT (25 graph pages) — all 25 accounted for; 23 have a direct left-menu attestation.
  Policies / Group Configurations / Invoice Settings / Routing Configuration / Exceptions /
  Capture Processing Admin / Vendor Search Admin / Image Handling / Units Of Measure / Audit Rules /
  Expense Types / Forms and Fields / Accounting Administration / Company Locations / List Management /
  Tax Administration / Purchase Order Configuration / Purchase Order Matching Rules /
  Feature Hierarchies / Workflows / Delegate Configurations / Email Reminders
  + Authorized Approval Limits (different tree: Administration > Company > Company Admin > User Admin)
  NOTE: page.map-invoice-concept-fields and page.budget-configuration carry navPath = [] in the
  graph and score ZERO in this left-menu census. They were not found by any menu anchor.

GROUP 6, already ground truth (3):
  Peppol Configuration   — "Navigate to Administration > Invoice > Invoice Processing Admin > Peppol Configuration." (professional-edition-7e36681a.md, grep -F -c = 1). SECOND-LEVEL: it hangs under Invoice Processing Admin, not the top left menu.
  Shipping Configuration — "Access this tool by clicking Administration > Invoice > Shipping Configuration, clicking a tab as required." (grep -F -c = 1). Role gate: "Invoice Configuration administrator or Invoice Configuration administrator (Restricted)". ONE FILE ONLY in the whole corpus.
  Localization           — "Click Localization (left menu)." (grep -F -c = 1) + "Administration > Invoice > Localization > Export Localization" x2 (invoice-line-item-import-record-type-410/420). Sub-object "Edit Localization page appears".

## LEFTOVERS — labels the census finds that the graph does not have
### 1. PRINTED INVOICES  *** strongest find ***
  (a) MENU  "Click Administration > Invoice and then click Printed Invoices."  [grep -F -c = 1]
            "The Printed Invoices page appears."                               [grep -F -c = 1]
            file: admin-guides/access-printed-invoices-c04fdd28.md ; ASCII spaces, no NBSP (od -c verified)
  (b) GATE  "Only the Global Invoice Configuration administrator can make edits in the Print Templates section" [=1]
            GLOBAL Invoice Configuration administrator — DISTINCT from the plain
            "Invoice Configuration administrator" that gates Shipping Configuration.
            Also: "Each print format is owned by the Global or Group administrator who created it."
  (c) OBJECT MODEL  print formats, print templates, content IDs, print condition rules.
            "New to add a new print format or select an existing format and click Copy"
  33-file subtree: print-formats-8b366049, print-templates-8b3672f3, print-condition-editor-8b364c62,
  add/edit/delete-a-print-format, add-a-template, add-a-new-content-id, split-a-content-id-into-two,
  invoice-barcode / invoice-list-data / invoice-form-data / invoice-text content types,
  print-format-components, default-printed-invoices-templates, assign-a-print-format-to-a-policy.
  ALL THREE TESTS FIRE. Verdict: admin-page.
  TABS (Audit Rules precedent — one page, three tabs, NOT three pages):
    "On the Printed Invoices page, click the Print Templates tab."      [=1]
    "Click the Print Formats tab on the Printed Invoices page."         [=1]
    "On the Printed Invoices page, click Print Condition Rules."        [=1]
  Modals seen in A3: "Edit Content for print format", "Edit Fields for Print Format" — NOT pages.

### 2. EXPENSE TYPE IMPORT
  (a) MENU "Select Expense Type Import (left menu). The Invoice Processing Expense Type Import page appears." [=1]
      Preceding step is "Choose Administration\xc2\xa0\xc2\xa0Invoice." — TWO NBSPs, NO ">" GLYPH.
      od -c: `A d m i n i s t r a t i o n  302 240 302 240  I n v o i c e`. Trap 4 exactly.
      file: tools-guides/access-the-invoice-processing-expense-type-import-page-3f5d3994.md
  (b) GATE  none distinct found ("allows administrators to add and update Invoice expense types")
  (c) OBJECT MODEL  own import subtree, 14 files (expense-type-import-8b49f43c, import-expense-types-8b49dfeb,
      step-1-download-the-expense-type-spreadsheet, step-3-upload..., step-4-view-the-initial-field-validation-results)
  (a) + (c) fire, (b) does not. Distinct from page.expense-types (which is Accounting Administration >
  Account Codes tab). Verdict: admin-page — but it is an IMPORT tool, thematically Group 5/7, NOT Group 6.

### 3. CHANGE LOG
  (a) MENU "From the Invoice Processing Admin menu, select Change Log." [=1] preceded by
      "Select Administration\xc2\xa0\xc2\xa0Invoice." — second-level, same shelf as Peppol Configuration.
  (b) GATE none found.
  (c) OBJECT MODEL none — READ-ONLY audit viewer. "records all configuration activity ... Date and
      time / Administrator / Configuration type / Object / Activity". It creates nothing.
  5 files. change-log-8b2b47a5 is a GUIDE COVER whose biggest table is the REVISION HISTORY (trap 5).
  Only (a) fires. Verdict: admin-page by menu, but zero config fields — Ops/Group 7 shaped.

### 4. VENDOR HANDLING  *** weak ***
  (a) MENU only, ONE attestation in the entire corpus:
      "for vendors, Administration > Invoice > Vendor Handling." [=1] in imaging-configuration-8b314b9a.md
  No access topic, no role gate, no object model, no "page appears".
  Reads as the vendor twin of Image Handling (already page.image-handling). Verdict: undetermined.

## LABELS THAT SCORE ZERO — attested nowhere as an Administration > Invoice left-menu destination
  Invoice Compliance (left menu) 0 | e-Bunsho (left menu) 0 | CFDI (left menu) 0 |
  Electronic Invoicing (left menu) 0 | "Invoice > E-Invoicing" 0 | "Invoice > Compliance" 0 |
  "Invoice > Peppol" 0 (it is only ever "Peppol Configuration") | Fapiao 0 | eDocument 0
  e-Bunsho (19 files) and CFDI (22 files) are REAL compliance features but they are SETTINGS ON
  EXISTING PAGES, not menu destinations:
    "Administration > Invoice > Group Configurations page in the Policies column, click Modify"  (e-Bunsho)
    "Administration > Invoice > Group Configurations"                                            (CFDI)
  Tax Validation (14 files) is a TAB: "Click the Tax Validation tab." [=1] on page.tax-administration.
  Print Templates / Print Formats / Print Condition Rules are TABS of Printed Invoices.
  "Digital Compliance Administrator" is a ROLE, not a page (grants access to the Tools page).

## SCORED BUT OUTSIDE THE INVOICE LEFT MENU (correctly excluded)
  Site Settings           -> "Administration > Expense > Site Settings (left menu)" (Expense product)
  Invoice Preferences     -> "Click Profile > Profile Settings" then "(left menu)" — END-USER
  User Permissions / User Administration -> Administration > Company > Company Admin
  Attendees               -> Administration > Expense > Attendees
  Payment Manager, Check Configurations, Funding Accounts, Card Accounts -> "Click Payments >
      Payment Manager", sub-sections of the Configuration section INSIDE Payment Manager. Group 7.
  Invoice Manager / Vendor Manager / Process Invoice Documents / Invoice Proxy Logon -> Invoice
      end-user + Profile menus.
  Hierarchy Mapping List -> what page.routing-configuration RENDERS, not a separate destination.

## HEADLINE
Group 6 as a left-menu census is THREE confirmed (Peppol Configuration, Shipping Configuration,
Localization) PLUS Printed Invoices, which is the largest unbuilt admin surface this sweep found
(33 files, 3 tabs, its own Global-admin role gate) and which no group in the graph currently owns.
Expense Type Import and Change Log are real unbuilt left-menu destinations but belong to other
groups. Vendor Handling is a single-attestation maybe.
