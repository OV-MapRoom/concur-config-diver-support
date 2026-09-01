# G6 RECON — SWEEP: SETUPFLOW (setup & ordering)
Corpus 2026_08 Professional Edition. Admin guides 1209 files, tools guides 650. Frozen; read-only.

## HEADLINE
The three claimed pages are real. SETUPFLOW finds a FOURTH page nobody counted
(Invoice E-Bunsho Timestamp Validation Request) and a FIFTH surface of undetermined rank
(Export Localization). It also finds one uncounted destination outside Group 6 (Vendor Handling).

## 1. PEPPOL — lifecycle is ONE page, not three
Nav: "Navigate to Administration > Invoice > Invoice Processing Admin > Peppol Configuration."
  professional-edition-7e36681a.md (count 1, 0 NBSP bytes in file)
configuring- / modifying- / deactivating- all re-enter the SAME page:
  "Access the Peppol Configuration page."          configuring-peppol-integration-60b28605.md
  "Navigate to the Peppol Configuration page."     modifying-peppol-integration-configuration-b8013633.md
  "Navigate to the Peppol Configuration page."     deactivating-peppol-integration-f8577b2a.md
=> singleton object, no New, no list. Edit -> Save. Lifecycle != page count.
ORDERING (administrator-configurations-a08482da.md, verbatim bullets):
  Onboard to SAP Document and Reporting Compliance, cloud edition
  -> Connect Concur Invoice to SAP DRC via SAP Concur App Center
  -> Register Peppol Participants in the Peppol Exchange (SAP DRC — EXTERNAL PRODUCT, NOT a Concur page;
     registering-peppol-participants-...-127aee02.md links out to help.sap.com/SAP_DRC_CLOUD)
  -> Configure Peppol Integration in Concur Invoice (= the page)
Upstream gates, none of them UI pages:
  requirements-3738ba47.md — SAP BTP enterprise global account + SAP DRC cloud edition licence
  feature-activation-04b47637.md — "must be enabled by SAP Concur staff ... service request"
  prerequisites-8a3ef278.md — suppliers registered as Peppol Exchange participants
  KG already holds page.invoice-settings field "Enable Peppol Integration" — that is the in-product predecessor.
CONTRADICTION for the extractor: configuring- names the activation field "Active";
  deactivating- names it "Peppol Integration Enablement". Same control, two labels.

## 2. SHIPPING CONFIGURATION — real page, ZERO documented fields
"Access this tool by clicking Administration > Invoice > Shipping Configuration, clicking a tab as required."
Role gate (both): "Invoice Configuration administrator or Invoice Configuration administrator (Restricted)
  create shipping types and shipping terms"
Documented in EXACTLY ONE file corpus-wide (grep -rl "Shipping Configuration" -> 1 hit).
Table anchors on that file: naive 0, correct 0. There is NO field roster anywhere.
Tabs are real but UNNAMED ("a tab as required"). Object model = shipping types + shipping terms,
each with a name + client-provided internal code. Exposed downstream as the Shipping Method field on PR forms.
DO NOT CONFLATE with Company Locations Ship To / Bill To tabs (addresses) — different surface,
and Company Locations is already page.company-locations in Group 5.

## 3. LOCALIZATION — real page; left-menu peer of built pages
"Click Localization (left menu)." — the left-menu sweep shows Localization sits in the same
  rank as Policies, Workflows, Forms and Fields, List Management, Feature Hierarchies (all built pages).
Object model: language x Category x message item. Only documented Category: "Invoice Receipt Confirmations".
"Click Modify. The Edit Localization page appears." -> Edit Localization is opened OVER a selected
  message item = the Workflows-wizard precedent = NOT its own page; its Message column + Save
  belong on page.localization.
Table: naive 5 / correct 17 cell-openers, 3 columns => 1+4r=17 => 4 rows => 3 confirmation types
  (INVC, RIND, RCEN) plus header. Not fields — default message text.
localizing-email-reminder-text-8b2cc1b0.md and best-practices-when-localizing-...-48515f40.md
  belong to Email Reminders (already built), NOT to Localization.

## 4. *** NEW PAGE — INVOICE E-BUNSHO TIMESTAMP VALIDATION REQUEST ***
Japan e-Bunsho electronic-document-retention compliance. 19 files mention bunsho. Never counted.
(a) OWN MENU DESTINATION, DIFFERENT TREE:
    "Click Administration > Company > Tools."  +  "Click Invoice E-Bunsho Timestamp."
      view-validation-status-98f82b1e.md (0 NBSP bytes)
    "can access the Invoice E-Bunsho Timestamp Validation Request tool from the
     Administration > Company > Tools page."  e-bunsho-timestamp-092c1c08.md
    Same shape that earned page.authorized-approval-limits its node: hangs off Administration > Company,
    no parent in this graph.
(b) OWN ROLE GATE: "Invoice Processor role combined with a role that grants access to the Tools page
    (for example, the Digital Compliance Administrator role or the Import/Extract Monitor role)".
    "Digital Compliance Administrator" occurs in exactly 1 file and nowhere else in the corpus —
    a gate found on no built page. This is the Forms-and-Fields split criterion.
(c) OWN OBJECT MODEL: date-ranged validation requests.
    "On the Invoice E-Bunsho Timestamp Validation Request page, enter the desired dates in the
     Creation Date (From / To) fields" ... click Search.
    Result columns (invoice-e-bunsho-timestamp-validation-request-tool-0f1e62c8.md):
      Total Images / Validated / Pending validation / Failed.
CAVEAT: monitoring + search, not object creation. Judgment call for the graph owner.
NOT a page: Timestamp Validation Failure. Corpus self-contradicts —
  "The Timestamp Validation Failure page appears." then
  "Click X to close the Timestamp Validation Failure window."  view-failed-image-validations-e04820e4.md
  X-to-close, opened over a search-result row => modal.
E-bunsho CONFIG is already covered: page.policies has Timestamp Configuration
  (2 field rows in KG) and enable-e-bunsho-timestamp-for-a-policy-group-07ea2db1.md routes
  step 2 to Group Configurations. No new config page there.

## 5. *** EXPORT LOCALIZATION — undetermined rank, but the surface exists ***
Two INDEPENDENT files carry a 4th-level menu segment:
 "Go to Administration > Invoice > Localization > Export Localization, select a language to export to,
  select the Payment Expense Types category, and then click Export."
   invoice-line-item-import-record-type-410-format-a4ea333f.md
 "click Administration > Invoice > Localization > Export Localization, and select a language to
  export to. Then select the Payment Expense Types category and click Export."
   invoice-line-item-import-record-type-420-format-0880199e.md
(a) fires: its own click-path segment, reached from the menu, not opened over an object.
Category list here ("Payment Expense Types") is DISJOINT from the Localization landing category
  ("Invoice Receipt Confirmations") — evidence of a separate context, not the same list.
Corpus never says "tab" and never says "page" for it. A TAB IS NOT A PAGE (Audit Rules precedent),
so rank is UNDETERMINED — but the extractor must know it exists: it is the only documented way to
obtain the PET code that the 410/420 line-item import specs require.

## 6. OUT-OF-GROUP CONTRADICTION — VENDOR HANDLING
"Create an Invoice Imaging Configuration in Administration > Invoice > Image Handling as the
 Invoice Configuration Administrator, or, for vendors, Administration > Invoice > Vendor Handling."
  imaging-configuration-8b314b9a.md (count 1)
Image Handling IS page.image-handling (Group 4). Vendor Handling is its sibling destination and is
NOT in the 25. Not Group 6 — reported because it is a live uncounted menu destination.

## 7. RULED OUT (setup chains that land on already-built pages / no UI)
- Tax Validation: "click Administration > Invoice Admin > Tax Administration ... Click the Tax Validation tab."
  step-3-configure-the-service-14c3ef13.md — TAB of page.tax-administration; KG already has
  tabTaxValidation, Partner Account Number, Tax Validation Type/Level, Turn On Tax Validation.
  Chain step-1..step-7 (tax authorities / expense type groups / vendor groups / predefined tax codes)
  all land on Tax Administration tabs. Compliance-flavoured, zero new pages.
- CFDi (Mexico): enabling-cfdi-attachments-...-5ce1fd0c.md and step-1-enable-by-invoice-group-ebe8724b.md
  both route to "Administration > Invoice > Group Configurations" (built). Upload/view/delete CFDi
  are end-user actions.
- Digital Tax Invoice Validation (step-3-...-69ba75a6.md): third-party contract + SAP Concur support,
  exception code INVXMLST, workflow/audit rules. NO admin page of its own.
- Ship To / Bill To addresses: tabs of Company Locations (built). Add New / Modify / Import
  Ship To Location are windows over that page.
- overview-of-steps-37e3c289.md ("the administrator uses the following tools in the order presented")
  is the ONLY file with that phrase corpus-wide, and it is the Vendor Employee Access chain
  (List Management -> Feature Hierarchies -> Group Configurations -> Forms and Fields -> import -> User Admin).
  All built. Not Group 6.
- Non-Invoice Administration trees swept: only Company > Company Admin (Authorized Approval Limits, built),
  Company > Tools (the e-Bunsho find), Expense > Site Settings. Nothing else for G6.

## MEASUREMENT LOG — traps confirmed live in THIS group
Trap 1 CONFIRMED, worst case in the corpus so far:
  configuring-peppol-integration-60b28605.md  grep -c "^| " = 0 ; grep -cP "^\s*\|" = 19
  The ENTIRE Peppol field roster is invisible to the naive anchor. An extractor using it
  reports Peppol Configuration as having no fields.
Trap 2 conversions (2-col unless noted; count = 1 + (cols+1) x rows):
  configuring-peppol-integration  19 -> 6 rows -> 5 fields
      (Participant ID, Email Address, Default Invoice Policy, Default Vendor, Active)
  step-5 localization  17 (3 cols) -> 4 rows -> 3 confirmation types
  timestamp-status-f0082cf2  22 -> 7 rows -> 6 statuses
Trap 5 CONFIRMED: peppol-integration-a086fb28.md is the BIGGEST table in the Peppol set
  (naive 12 / correct 34 -> 11 rows) and it is the guide REVISION HISTORY, not a roster.
Trap 4: 1729 NBSP bytes across the two guide dirs. All cited nav quotes verified byte-level
  as ASCII-space (0 NBSP in professional-edition-7e36681a, shipping-...-3429ee14,
  step-5-...-5328a8e1, view-validation-status-98f82b1e, imaging-configuration-8b314b9a).
  The 410/420 files DO carry 2 and 5 NBSP bytes respectively, but not inside the Export
  Localization sentences.
Every quote above re-verified with an exact substring count (all returned 1).
