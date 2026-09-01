# Group 6 recon — roster (run wf_f7ae0fdc-832)

**6 pages.** Both critics independently confirmed the shape.

## Printed Invoices (`page.printed-invoices`)

- navPath: `Administration > Invoice > Printed Invoices`
- quote: "Click Administration > Invoice and then click Printed Invoices." — /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/access-printed-invoices-c04fdd28.md
- role gate: Only the Global Invoice Configuration administrator can make edits in the Print Templates section of Printed Invoices page. If required, submit a service request to change template configuration.
- tabs: ['Print Formats', 'Print Templates', 'Print Condition Rules']
- files 37 / 87392 B / est. 60 fields

THE BIGGEST RECOVERY OF THIS RECON. Not in the 25-page graph. ALL THREE TESTS FIRE — the only candidate for which that is true besides Shipping Configuration, and this one has 37 files behind it instead of 1.

WHY IT WAS NEARLY LOST: its nav sentence is PROSE, not an 'A > B > C' chain — "Click Administration > Invoice and then click Printed Invoices." The CLICKPATHS sweep, which ran the most thorough nav-chain regex of the five, MISSED THIS PAGE ENTIRELY. Two sweeps found it, three did not. I kept it on the corpus, not the vote. Nav quote and gate quote both verified: grep -rlF returns exactly access-printed-invoices-c04fdd28.md for each. od-equivalent python3 check: that file has 0 NBSP, the '>' is a real ASCII glyph.

TESTS: (a) own top-level Invoice left-menu destination, "The Printed Invoices page appears." (b) own role gate, and a DISTINCT one — GLOBAL Invoice Configuration administrator, not the plain 'Invoice Configuration administrator' (28 files) nor the '(Restricted)' variant (9 files). 'Global Invoice Configuration administrator' covers 5 files / 4 surfaces. Reinforced by an ownership model in print-formats-8b366049.md: "Each print format is owned by the Global or Group administrator who created it." This is the Forms-and-Fields gate-split signal. (c) FOUR object kinds with full add/edit/delete/assign verb sets: print formats, print templates, print condition rules, content IDs.

TABS — ONE PAGE, THREE TABS (Audit Rules precedent). All three verified grep -rlF = 1, all three anchored to the SAME parent page:
  "Click the Print Formats tab on the Printed Invoices page." (add-a-print-format-5c28923a.md)
  "On the Printed Invoices page, click the Print Templates tab." (access-print-templates-9e6397c3.md)
  "On the Printed Invoices page, click Print Condition Rules." (access-the-printed-invoices-condition-849f65a7.md)
CONFLICTING PHRASING TO IGNORE: add-a-template-91efc6b9.md says "On the Print Templates page" — loose use of 'page' for a tab. The explicit 'click the ... tab' sentences win.

SEED FILES RICHEST FIRST — bytes / cell-openers / TRUE ROWS (cols+1 conversion, sep lines removed). NOTE naive=0 on nearly every one: these tables are INDENTED inside numbered steps, so grep -c '^| ' returns ZERO. Trap 1 fires hard on this page set.
  invoice-list-data-content-type-50e66a27.md      8957 B  naive=0  cellopen=40  cols=2  TRUE ROWS 13
  invoice-text-content-type-02b21c13.md           5619 B  naive=0  cellopen=22  cols=2  TRUE ROWS 7   (<table>=1, <tr>=11)
  invoice-form-data-content-type-6c4a88d2.md      5422 B  naive=0  cellopen=28  cols=2  TRUE ROWS 9
  edit-print-format-content-576e44df.md           4784 B  no table — prose
  invoice-barcode-content-type-81641f43.md        4482 B  naive=0  cellopen=28  cols=2  TRUE ROWS 9   (<table>=1, <tr>=4)
  add-a-print-format-5c28923a.md                  4359 B  naive=0  cellopen=27  cols=2  TRUE ROWS ~8.7 (non-integer: a multi-line cell; read it, do not trust the arithmetic here)
  content-types-and-content-ids-d6268235.md       3196 B  naive=9  cellopen=25  cols=2  TRUE ROWS 8
  the-condition-page-3408dec8.md                  2820 B  naive=10 cellopen=28  cols=2  TRUE ROWS 9
  edit-a-print-format-676b3ee0.md                 2386 B  no table
  print-templates-8b3672f3.md                     2280 B  no table
  add-a-template-91efc6b9.md                      2007 B  cellopen=13 cols=2  TRUE ROWS 4
  access-printed-invoices-c04fdd28.md             1247 B  nav + gate, no table
  access-print-templates-9e6397c3.md               931 B  tab nav only
  access-the-printed-invoices-condition-849f65a7.md 1074 B tab nav only

RAW <table> CENSUS across the set: only 3 files carry HTML tables at all — invoice-text-content-type-02b21c13.md (grep -c '<table' = 1, grep -o '<tr' | wc -l = 11), invoice-barcode-content-type-81641f43.md (1 / 4), create-a-conditional-rule-in-the-editor-86a92887.md (1 / 3). Everything else is pipe-markdown. NBSP measured with python3 b'\xc2\xa0' on all 37 files: ZERO NBSP anywhere in this page set. This is the one Group 6 page where trap 4 does not apply.

TRAP 5 FIRES: printed-invoice-configuration-8b35ee51.md is cellopen=64 -> 21 TRUE ROWS and is the guide REVISION HISTORY ("Applies to these SAP Concur solutions:" / "Revision History" / "Date | Notes/Comments/Changes"). It is the SECOND-largest table in the set and it is not a roster. Do not send an extractor at it.

NAME COLLISION THE EXTRACTOR MUST NOT TRIP ON: there are TWO files titled "The Condition Page". 3408dec8 belongs HERE ("The Condition page in Print Condition Rules is similar to the Condition page used for Audit Rules and Invoice Processor."). 5d4ea870 belongs to the ALREADY-BUILT page.audit-rules ("The Condition page in Audit Rules..."). Mixing them will duplicate ~9 rows of operator/field values onto the wrong page.

BOUNDARIES AGAINST BUILT PAGES:
  page.policies — create-a-new-policy-dd9549c0.md line 328 carries "(Optional) If you want to configure and use print formats, select the print format that you want to use for the policy." That selector is a POLICIES field REFERENCING a Printed Invoices object. It is why the keyword grep returns that 8,706-byte file; EXCLUDE it from this page's seed set. Same for assign-a-print-format-to-a-policy-6bd703e7.md and assigning-a-print-format-to-an-existing-policy-cb5f4b75.md — the assignment ACTION lives here, the target field lives on page.policies.
  page.audit-rules — shares the whole Condition Editor vocabulary (data objects, fields, operators, values). See the name collision above.
  page.forms-and-fields — Invoice Form Data content type pulls FROM form fields; the field definitions are already built there, only the print-side selection belongs here.
  page.localization — print-templates-8b3672f3.md: "Do not embed text into the HTML—it is not localized. Instead, create a text content ID and add the text in the Print Format." This is why a compliance sweep surfaced this page at all.

IDENTITY QUESTION I COULD NOT SETTLE: is this a Group 6 page? It is document OUTPUT, not e-invoicing. It surfaced on compliance sweeps only because Print Templates is localization-coupled and printed-invoice layout is a compliance artefact in several jurisdictions. Its page-hood is not in doubt; its GROUP is. If the main agent creates a Group 7 for document output, this moves. If not, it must be built now — Group 6 is the last non-deferred group and deferring it means it is never built.

SECOND OPEN QUESTION: the 'Edit Content for print format' and 'Edit Fields for Print Format' surfaces (edit-print-format-content-576e44df.md, invoice-list-data-content-type step 2: "Click Modify Content. The Edit Content for print format page appears.") say 'page appears' but are opened over a SELECTED format — Workflows-wizard shaped. I have ruled them modals. If the live UI shows them as full navigations, the 13/9/9/7 content-type rosters may need to hang off a child node rather than the Print Formats tab.

## Peppol Configuration (`page.peppol-configuration`)

- navPath: `Administration > Invoice > Invoice Processing Admin > Peppol Configuration`
- quote: "Navigate to Administration > Invoice > Invoice Processing Admin > Peppol Configuration." — /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/professional-edition-7e36681a.md
- role gate: Access to Peppol Configuration is limited to users with the Invoice Configuration Administrator role.
- tabs: []
- files 25 / 46071 B / est. 15 fields

Ground truth already established; this recon corrects its SHAPE and hands the extractor five specific landmines.

CORRECTION THAT MATTERS FOR THE CHROMIUM DRIVER: Peppol Configuration does NOT hang off the Invoice left menu the way Localization does. It is FOUR levels deep, nested under Invoice Processing Admin. Verified verbatim, grep -F -c = 1 in professional-edition-7e36681a.md, followed by "The Peppol Configuration page appears." A first-segment regex truncates this to 'Invoice Processing Admin' and hides the page; only full-chain extraction recovers it. My own independent NBSP-normalised chain sweep returns 'Peppol Configuration' and 'Change Log' as the only two children on that shelf.

TESTS: (a) fires. (b) fires but NON-DISTINCTIVELY — 'Invoice Configuration Administrator' appears in 28 files corpus-wide, so the gate adds no page-hood weight beyond (a). (c) fires weakly: one company-level integration record, edited in place.

THE ACCESS TOPIC IS A STUB. accessing-peppol-configuration-bd62e1a5.md (888 B) contains a summary sentence and NO STEPS AT ALL — I read the whole file. The real click path lives in its child, professional-edition-7e36681a.md. Do not seed the access topic expecting a path.

SEED FILES RICHEST FIRST (bytes / cell-openers / TRUE ROWS):
  field-mapping-e3881fa5.md          8687 B  naive=46 cellopen=221 cols=4 TRUE ROWS 44  *** SEE WARNING ***
  configuring-peppol-integration-60b28605.md 5640 B naive=0 cellopen=19 cols=2 TRUE ROWS 6 (header + 5 fields) <- THE ACTUAL PAGE ROSTER
  overview-a0889c72.md               2463 B  no table
  minimum-required-...-931a0864.md   2284 B  naive=12 cellopen=32 sep=2 cols=2 TRUE ROWS 10
  administrator-configurations-a08482da.md 1866 B no table
  peppol-integration-a086fb28.md     1820 B  naive=12 cellopen=34 cols=2 TRUE ROWS 11  *** REVISION HISTORY ***
  registering-peppol-participants-...-127aee02.md 1791 B no table — OFF-PRODUCT (help.sap.com)
  receiving-exception-email-notifications-...-28039049.md 1694 B no table
  limitations-f5fac4b5.md            1666 B  naive=6  cellopen=16 cols=2 TRUE ROWS 5  <- CALIBRATION PROOF, rows countable by eye: Peppol Configuration, Company Locations, Invoice tax population, Ledgers + header. Conversion exact.
  storing-peppol-documents-...-a08b3193.md 1424 B no table
  deactivating-peppol-integration-f8577b2a.md 1330 B no table
  supported-markets-b041f417.md      1238 B  no table
  standard-edition-d252f36e.md       1143 B  *** WRONG EDITION — DO NOT SEED ***
  modifying-peppol-integration-configuration-b8013633.md 1054 B no table
  professional-edition-7e36681a.md   1039 B  the nav topic
  accessing-peppol-configuration-bd62e1a5.md 888 B  STUB
  requirements-3738ba47.md 1062 B / prerequisites-8a3ef278.md 632 B / feature-activation-04b47637.md 701 B — all no table
RAW <table> CENSUS: grep -c '<table' = 0 and grep -o '<tr'|wc -l = 0 across the ENTIRE Peppol set. All pipe-markdown.
NBSP (python3 b'\xc2\xa0'): field-mapping-e3881fa5.md = 5. Every other Peppol file = 0. The nav quote's '>' glyphs are real ASCII.

THE ACTUAL FIELD ROSTER, read in full from configuring-peppol-integration-60b28605.md — FIVE fields, then Save:
  Participant ID (format <scheme Identifier>:<Receiver/Customer Participant Identification Number>, unique per entity per country)
  Email Address (exception-email recipient)
  Default Invoice Policy (Non-PO defaults to NONPOPolicy; PO Invoices inherit the matching PO's policy)
  Default Vendor (approved vendors, format <Vendor Code>-<Vendor Address Code>)
  Active (defaults to Active; select Inactive to deactivate)
  then "Click Save to save the configuration and activate it for your company."
An extractor that reports ~44 fields here has fallen into the field-mapping trap.

WARNING 1 — field-mapping-e3881fa5.md IS NOT A PAGE ROSTER. It is a 44-row Peppol-XML-to-Concur field mapping SPEC ("The following table contains information for mapping Peppol fields with Concur Invoice fields") and it is explicitly cross-edition ("applicable for both Concur Invoice Professional and Standard Editions"). It is the largest table in the set by a factor of four and it will look exactly like a roster to a naive extractor. Classify it as a data-mapping reference, not page fields.
WARNING 2 — TRAP 5: peppol-integration-a086fb28.md (11 true rows) is the guide REVISION HISTORY.
WARNING 3 — TWO CLICK PATHS EXIST. standard-edition-d252f36e.md gives a completely different tile route: "In the Connections section, on the Peppol Configuration tile, click Edit" reached via the Invoice Settings menu. It is Standard Edition, it survived the corpus's Standard-Edition purge, and it is ONE OF ONLY TWO FILES containing "The Peppol Configuration page appears." Any sweep that counts that phrase across files will double-count Peppol or bind the wrong path. Driving Chromium from it navigates to a surface this Professional graph does not model.
WARNING 4 — SUB-SURFACES ARE NOT PAGES. modifying-peppol-integration-configuration-b8013633.md is "1. Navigate to the Peppol Configuration page. 2. Click Edit." and deactivating-peppol-integration-f8577b2a.md is the same shape with 'select Inactive'. Edit-in-place, no second destination.

BOUNDARIES AGAINST BUILT PAGES — the limitations table names three of them explicitly:
  page.company-locations — "The company ship-to address code maintained in Company Locations in Concur Invoice must match the ship-to address code in the invoices coming from Peppol. If the address codes don't match, invoice creation fails." A hard dependency edge, not a Peppol field.
  page.forms-and-fields — "Configure any of the following tax fields in the Invoice Header form: TAX, VAT1, VAT2, VAT3, or VAT4... ensure VAT1 is included". Those five field ids are ALREADY BUILT under page.forms-and-fields. Do not re-create them.
  page.accounting-administration — the Ledgers limitation, "The Ledger Name must always be set as 'Default'." A constraint on a built field.
  page.policies — Default Invoice Policy points at NONPOPolicy, a built object.
  page.invoice-settings — available-invoice-settings-8b3411f0.md (8,368 B) matches the peppol keyword but is the Invoice Settings roster, ALREADY BUILT. EXCLUDE from this page's seeds.

PREREQUISITE EDGE, NOT A PAGE: the App Center connect flow (connecting-to-sap-document-and-reporting-compliance-cloud-edition-007b7c11.md) contributes exactly TWO inputs that gate this page — Terms & Conditions acceptance and the SAP BTP subaccount subdomain. Attach them here as a dependency; see deferred.

IDENTITY QUESTION: does the live page have tabs? The corpus never says. Every procedure treats it as a single form with Edit/Save. I have set tabs = none, but that is an absence of evidence, not evidence of absence.

## Invoice E-Bunsho Timestamp Validation Request (`page.invoice-e-bunsho-timestamp-validation-request`)

- navPath: `Administration > Company > Tools > Invoice E-Bunsho Timestamp`
- quote: "Click Administration > Company > Tools." — /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/view-validation-status-98f82b1e.md
- role gate: Users with the Invoice Processor role combined with a role that grants access to the Tools page (for example, the Digital Compliance Administrator role or the Import/Extract Monitor role) can access the Invoice E-Bunsho Timestamp Validation Request tool from the Administration > Company > Tools page.
- tabs: []
- files 12 / 18945 B / est. 15 fields

FOUND BY ONE SWEEP OF FIVE. I re-verified it from scratch rather than discounting it — on a prior recon two sweeps beat four. It holds. This is the purest COMPLIANCE-DOMAIN page in Group 6 (Japan e-Bunsho electronic document retention law).

THE AUTHORIZED-APPROVAL-LIMITS SHAPE, EXACTLY. It hangs off Administration > Company, a menu tree with NO PARENT ANYWHERE IN THIS GRAPH, and is reached by CLICKING rather than by opening something over an existing object. That is precisely the argument that earned page.authorized-approval-limits its node.

FULL CLICK PATH, read verbatim from view-validation-status-98f82b1e.md (python3 confirms that file has ZERO NBSP, so every '>' is a real ASCII glyph — trap 4 does NOT apply here):
  1. Click Administration > Company > Tools.
  2. Click Invoice E-Bunsho Timestamp.
  3. On the Invoice E-Bunsho Timestamp Validation Request page, enter the desired dates in the Creation Date (From / To) fields or use the date picker to choose the desired dates, and then click Search.

TESTS: (a) FIRES, off a foreign tree. (b) FIRES UNIQUELY — this is the ONLY distinctive gate in the entire compliance domain. I counted: 'Digital Compliance Administrator' occurs in exactly 1 file and covers exactly 1 surface (grep -n across both guide dirs returns one line, e-bunsho-timestamp-092c1c08.md:32). Compare 'Invoice Configuration Administrator' at 28 files and the '(Restricted)' variant at 9. This is the Forms-and-Fields signal, at maximum strength. (c) DOES NOT FIRE — I will not oversell it: this is a date-range SEARCH and MONITOR surface that creates no objects.

SEED FILES RICHEST FIRST (bytes / cell-openers / TRUE ROWS):
  overview-8b320366.md                                   3007 B  cellopen=0
  timestamp-status-f0082cf2.md                           2181 B  naive=8 cellopen=22 cols=2 TRUE ROWS 7  <- THE ONLY TABLE IN THE SET
  e-bunsho-timestamp-8b310f28.md                         1768 B  cellopen=0
  e-bunsho-timestamp-d39de1b1.md                         1690 B  cellopen=0
  e-bunsho-timestamp-092c1c08.md                         1585 B  cellopen=0  <- THE GATE SENTENCE, line 32
  view-failed-image-validations-e04820e4.md              1507 B  cellopen=0  <- the modal
  enable-e-bunsho-timestamp-for-a-policy-group-07ea2db1.md 1464 B cellopen=0 <- BELONGS TO page.group-configurations
  invoice-e-bunsho-timestamp-validation-request-tool-0f1e62c8.md 1254 B cellopen=0 <- the 4 count fields
  view-validation-status-98f82b1e.md                     1194 B  cellopen=0  <- THE NAV TOPIC
  processor-experience-bc57b526.md                       1433 B  cellopen=0
  invoice-admin-experience-840503f4.md                    983 B  cellopen=0
  feature-activation-73c7020c.md                          879 B  cellopen=0
RAW <table> CENSUS: grep -c '<table' = 0 and grep -o '<tr'|wc -l = 0 across ALL 12 files. NBSP (python3 b'\xc2\xa0') = 0 across all 12.

HONEST YIELD FORECAST — THIS IS A THIN PAGE, ~10-15 fields, and the extractor must not go hunting for more:
  Creation Date (From) / Creation Date (To) + date picker, Search button
  Four read-only counts, listed verbatim in invoice-e-bunsho-timestamp-validation-request-tool-0f1e62c8.md: Total Number / Count of Images; Total Number / Count of Validated Images; Total Number / Count of (images) Pending validation; Total Number / Count of images that have Failed validation
  The Failed count is a drill-down link.
  timestamp-status-f0082cf2.md's 7 TRUE ROWS are the only real table — classify before extracting; it is a status value set, not a settings roster.

MODAL, NOT A PAGE (deferred separately): view-failed-image-validations-e04820e4.md says "2. The Timestamp Validation Failure page appears." — the proven non-discriminating phrase — but step 3 settles it: "3. Click X to close the Timestamp Validation Failure window." A surface dismissed with an X, opened by clicking a number in the Failed column of an existing result set. Its 5 read-only columns are Report Name, Expense Type, Vendor, Submit Date, Amount.

BOUNDARIES AGAINST BUILT PAGES:
  page.group-configurations — the POLICY-GROUP ENABLEMENT of e-Bunsho lives there, not here: enable-e-bunsho-timestamp-for-a-policy-group-07ea2db1.md routes through "Administration > Invoice > Group Configurations page in the Policies column, click Modify". That checkbox is a Group Configurations field.
  page.policies — "Administration > Invoice > Policies page, when Invoice Admins modify a policy, the admin will see the Timestamp Configuration field". Timestamp Configuration is a POLICIES field.
  page.image-handling — e-Bunsho timestamps are applied to invoice IMAGES; image-handling-upload-and-email-8b315f29.md is Image Handling's, not this page's.
  FEATURE ACTIVATION IS NOT A FIELD: feature-activation-73c7020c.md makes activation an SAP Concur support action, not a UI control.

IDENTITY QUESTION: the Tools page (Administration > Company > Tools) is itself a menu surface listing multiple tools. Should the graph model 'Tools' as a page whose children are tools, or model each tool as its own page hanging off the Tools path? I have taken the second reading, consistent with Authorized Approval Limits. If the main agent takes the first, this becomes a child of a new page.company-tools node and the Import/Extract Monitor tools would join it.

## Localization (`page.localization`)

- navPath: `Administration > Invoice > Localization`
- quote: "Click Localization (left menu)." — /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md
- role gate: NONE. No role-gate sentence anywhere in the corpus mentions Localization — test (b) is EMPTY, not weak. Verified across every gate form and across the 15 required-roles-*.md and 56 permissions-*.md topics, none of which is a Localization topic.
- tabs: []
- files 7 / 22324 B / est. 10 fields

REAL, BUT THE WEAKEST PAGE IN GROUP 6 ON EVERY MEASURE. All five sweeps agree it exists; three of them independently flagged how thin it is. Page-hood rests on test (a) ALONE.

FULL CLICK PATH, read verbatim from step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md (python3: that file has ZERO NBSP, so the '>' glyphs are real):
  1. Click Administration > Invoice.
  2. Click Localization (left menu).
  3. Select a language and then, in the Category column, select the Invoice Receipt Confirmations message item.
  4. Click Modify. The Edit Localization page appears.
  5. In the Message column, click the text to edit the message.
  6. Click Save when you are done editing the text for each language.
SECOND, INDEPENDENT ACCESS SENTENCE in the same file: "...localized into other languages by clickingAdministration > Invoice > Localization to access this tool." — the run-together 'clickingAdministration' is a GENUINE MISSING-SPACE SOURCE TYPO, verified NOT an NBSP (file NBSP count = 0). Do not mis-attribute it to trap 4; a previous sweep nearly did.

TESTS: (a) fires twice. (b) EMPTY. (c) weak — it edits localized message strings; the object is language x Category x message item.

SEED FILES RICHEST FIRST (bytes / cell-openers / TRUE ROWS):
  invoice-line-item-import-record-type-420-format-0880199e.md 7532 B — *** ONE LINE IS RELEVANT (line 165) ***
  invoice-line-item-import-record-type-410-format-a4ea333f.md 4084 B — *** ONE LINE IS RELEVANT (line 133) ***
  step-5-change-localize-...-5328a8e1.md 3897 B naive=0 cellopen=17 cols=3 TRUE ROWS 4 (header + 3) <- THE PRIMARY SEED
  use-an-expense-type-as-the-first-field-in-a-connected-list-e0c5f415.md 3355 B — one line (line 50), the OUT-OF-CORPUS pointer
  localizing-email-reminder-text-8b2cc1b0.md 1323 B  cellopen=0
  best-practices-when-localizing-subject-and-email-message-fields-48515f40.md 1317 B cellopen=0
  confirmation-message-configuration-65b79d9c.md 816 B cellopen=0
RAW <table> CENSUS: grep -c '<table' = 0, grep -o '<tr'|wc -l = 0 across all 7. NBSP (python3): 0 in the primary seed.

TRAP 2 WORKED EXAMPLE: the step-5 table is cellopen=17 with THREE columns. (17 - 1 sep) / (3+1) = 4 TRUE ROWS. Reporting 17 would send an extractor hunting thirteen fields that do not exist. The 3 data rows are the DEFAULT MESSAGE TEXT value set for one Category, not page fields: Invoice (INVC), Receipt Individual (RIND), Receipt Central (RCEN), with a fourth option None named in prose.

THE ACTUAL PAGE SURFACE, ~8-10 controls: a language selector; a Category column; a message-item list; Modify; a Message column (click-to-edit); Save; plus Export Localization (select a language to export to, select a category, Export).

ONLY TWO CATEGORY VALUES ARE ATTESTED IN THE WHOLE CORPUS. I grepped every occurrence: 'Invoice Receipt Confirmations' (step-5) and 'Payment Expense Types' (both import-format files). The real Category list must come from the live UI.

OUT-OF-CORPUS WARNING — THE DECISIVE CONSTRAINT ON THIS PAGE'S YIELD: use-an-expense-type-as-the-first-field-in-a-connected-list-e0c5f415.md line 50 says "For more information, refer to the Shared: Localization Setup Guide." Localization is a SHARED tool merely surfaced under the Invoice menu; its real field roster is in a guide that is NOT in this corpus. Only 14 files corpus-wide contain 'localization|localize|localizing' at all, and most concern sending strings to a translation vendor. Budget accordingly and do not read a thin extraction as a miss.

NOTE: there is NO "The Localization page appears." sentence anywhere in the corpus. The only 'appears' sentence in this domain is for Edit Localization. Page-hood here does not rest on that phrase at all — which is fine, since the phrase is proven non-discriminating.

SUB-SURFACES, BOTH DEFERRED, BOTH LOOK LIKE FOURTH MENU LEVELS AND NEITHER IS A PAGE:
  Edit Localization — "Click Modify. The Edit Localization page appears." opens OVER a selected language/category row. Says 'page appears' and is not one. Exactly the Workflows New/Modify disqualifier.
  Export Localization — attested in exactly 2 files, both incidental PET-code lookups inside import-format topics; no topic of its own, no access topic, no gate.

BOUNDARIES AGAINST BUILT PAGES:
  page.email-reminders — localizing-email-reminder-text-8b2cc1b0.md and best-practices-when-localizing-subject-and-email-message-fields-48515f40.md concern Email Subject and Email Message text, which are ALREADY-BUILT Email Reminders fields. This page only supplies the string-extraction mechanism; the fields belong there. Note the topic explicitly says the system does NOT localize them automatically and a service request may be needed — that is a limitation, not a field.
  page.expense-types — 'Payment Expense Types' is a Category here but the PET codes themselves belong to Expense Types.
  page.workflows / page.exceptions — the receipt-confirmation instructional text is attached to rule-group conditions via 'Edit Confirmation' / 'Select Confirmation Type', which is a Workflows surface. Localization only re-writes the string.
  page.printed-invoices — print-templates-8b3672f3.md's "Do not embed text into the HTML—it is not localized" is a Printed Invoices constraint that points here.

IDENTITY QUESTION: is Export Localization a TAB, a button, or a separate left-menu leaf? The two attesting sentences write it as a fourth path segment ('Administration > Invoice > Localization > Export Localization'), which reads like a menu level, but there is no topic, no access sentence and no gate behind it. I have modelled it as an in-page export function. The live UI must settle it.

## Change Log (`page.change-log`)

- navPath: `Administration > Invoice > Invoice Processing Admin > Change Log`
- quote: "From the Invoice Processing Admin menu, select Change Log." — /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/accessing-the-change-log-8b2b0deb.md
- role gate: NONE found. No role-gate sentence in the corpus mentions Change Log.
- tabs: []
- files 4 / 5580 B / est. 5 fields

THE EMAIL-REMINDERS PATTERN REPEATING. Absent from the 25-page graph, found by two sweeps, and reachable ONLY through the glyphless NBSP form — which is exactly why a lost map and several passes never caught it.

TRAP 4, MEASURED ON THIS FILE, THIS RUN: accessing-the-change-log-8b2b0deb.md step 1 is b'Select Administration\xc2\xa0\xc2\xa0Invoice.' — TWO NBSPs and ZERO '>' GLYPH. python3 count of b'\xc2\xa0' in that file = 2. Forty files corpus-wide use that step-1 form, so any '>'-anchored sweep is blind to all forty. Step 2 is plain ASCII: "From the Invoice Processing Admin menu, select Change Log." (grep -F -c = 1). USE THE STEP-2 QUOTE AS navQuote — it is ASCII-safe. If anyone ever records step 1, it MUST be recorded with the real U+00A0 bytes: bin/validate-graph.py normalises NBSP to a space, so a retyped ASCII version passes validation and lands wrong forever.

TESTS: (a) FIRES — own menu destination on the same Invoice Processing Admin shelf as Peppol Configuration; those two are the only children found on that shelf. It has its OWN ACCESS TOPIC, the same signature Peppol has. (b) does not fire. (c) DOES NOT FIRE — it creates and edits nothing.

SEED FILES RICHEST FIRST (bytes / cell-openers / TRUE ROWS):
  change-log-8b2b47a5.md   2588 B  naive=21 cellopen=61 cols=2 TRUE ROWS 20  *** REVISION HISTORY — TRAP 5 ***
  overview-8b2b3423.md     1121 B  cellopen=0  <- THE ONLY CONTENT TOPIC
  navigating-configuration-change-log-information-2483fc92.md 949 B cellopen=0
  accessing-the-change-log-8b2b0deb.md 922 B cellopen=0, NBSP=2  <- THE NAV TOPIC
RAW <table> CENSUS: grep -c '<table' = 0, grep -o '<tr'|wc -l = 0 across all 4 files. NBSP: 2 in the nav topic, 0 in the other three.

TRAP 5 IS THE WHOLE STORY HERE. The biggest table in this page set — 20 true rows, and the ONLY table — is the guide cover's REVISION HISTORY ("Applies to these SAP Concur solutions" / "Revision History" / "Date | Notes/Comments/Changes"). I read lines 17-32 to confirm. An extractor that trusts the largest table on this page will return twenty rows of SAP documentation dates as configuration fields. That is the single worst outcome available in this whole roster.

HONEST YIELD FORECAST: FIVE read-only display columns and nothing else. Read verbatim from overview-8b2b3423.md, "The Change Log page displays:" — Date and time of the activity (addition/deletion/change); Administrator who initiated the activity; Configuration type (group, policy, audit rule, and so on); Object (group name, policy name, audit rule name, and so on); Activity (created, deleted, old information/new information, and so on). navigating-configuration-change-log-information-2483fc92.md adds only that it is a scrolling list, one page at a time. There are ZERO settable configuration fields on this page.

WHY IT IS A PAGE ANYWAY: "The configuration Change Log page records all configuration activity in Concur Invoice, including additions, deletions, modifications, and import events" ... "Use this page to audit changes and identify which administrator performed each action." Own menu destination, own access topic, own 4-file cluster, explicitly audit/compliance purpose.

BOUNDARIES: it has no vocabulary collision because it OBSERVES the other pages rather than configuring anything. Its 'Configuration type' column enumerates the built pages themselves — group (page.group-configurations), policy (page.policies), audit rule (page.audit-rules). Model those as references to existing page nodes, never as new fields.

IDENTITY QUESTION, STATED AS A QUESTION AND NOT RESOLVED: is a read-only audit register a CONFIG PAGE at all? Every other node in this graph is a place where settings are made; this is a place where settings are inspected. If the deferred Group 7 (Ops) is ever built, Change Log is arguably its page, not Group 6's. I am keeping it here for one reason only: Group 6 is the LAST non-deferred group, two sweeps independently found it, and a silent drop is deletion rather than deferral — the rule that has already recovered real pages twice. The cost of keeping it is one small extraction that returns five columns; the cost of dropping it is permanent.

## Shipping Configuration (`page.shipping-configuration`)

- navPath: `Administration > Invoice > Shipping Configuration`
- quote: "Access this tool by clicking Administration > Invoice > Shipping Configuration, clicking a tab as required." — /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/shipping-configuration-and-shipping-terms-3429ee14.md
- role gate: The Shipping Configuration tool lets the Invoice Configuration administrator or Invoice Configuration administrator (Restricted) create shipping types and shipping terms that incorporate a name and an internal code as provided by the client.
- tabs: ['UNNAMED IN THE CORPUS — the source says only "clicking a tab as required"']
- files 1 / 1416 B / est. 6 fields

ALL THREE TESTS FIRE — and it is still the thinnest page in the roster. Both facts are true and the extractor needs both.

I READ THE ENTIRE FILE. It is 1,416 bytes including 15 lines of YAML front matter. The body is FOUR paragraphs. This is the complete documented surface of the page in a 1,859-file corpus.

EXHAUSTIVENESS PROOF — grep -rli "Shipping Configuration" across both guide dirs returns EXACTLY ONE FILE. I then grepped 'Shipping Type|Shipping Term|Shipping Method' across both dirs and read all 26 hits: every single other hit is either an import-spec column name (purchase-order-request-header-record-type-200-format-46f69dcc.md lines 378/395, vendor-record-type-200-9c92487a.md lines 418/431, the-import-template-fields-and-descriptions-8b53850b.md lines 476/489, sample-record-type-200-3c0a370d.md) or a Condition-Editor picklist entry (the-condition-page-5d4ea870.md lines 479/481 and 759/761, the-query-builder-and-the-condition-editor-e10473f9.md and -af058a80.md). NONE of them is this tool. There is no more material. Do not let an extractor wander into those files.

TESTS: (a) and (b) fire IN ONE SENTENCE EACH, both verified. (c) fires: it creates shipping types and shipping terms, its own object kinds, each "incorporat[ing] a name and an internal code as provided by the client".

GATE IS NOT DISTINCTIVE, AND THAT IS WORTH SAYING: it names two roles, and the more specific one — 'Invoice Configuration administrator (Restricted)' — appears in 9 files covering NINE surfaces (Email Reminders, Account Codes, Units Of Measure, Company Locations, Invoice Settings, Capture Processing Admin Other Settings, default-policy-for-emailed-invoices, default shipping/billing address, and this page). Zero discriminating power. Page-hood here rests on (a) and (c), not on the gate.

SEED FILE — THERE IS ONLY ONE:
  shipping-configuration-and-shipping-terms-3429ee14.md  1416 B
  naive grep -c '^| ' = 0 | correct grep -cP '^\\s*\\|' = 0 | sep lines = 0 | TRUE ROWS: N/A
  RAW <table> CENSUS: grep -c '<table' = 0, grep -o '<tr'|wc -l = 0
  NBSP (python3 b'\xc2\xa0') = 0 — the '>' glyphs in the nav quote are real ASCII
THE CELL-OPENER COUNT IS ZERO, NOT MISSING. This file carries NO field table of any kind. The extractor must read prose, not hunt a roster. THIS IS THE ONE PAGE WHERE TRAP 1 DOES NOT APPLY, and I checked with the correct anchor precisely so nobody re-checks it.

FIELD ROSTER INFERRED FROM THE ONE PARAGRAPH — ~4 to 6 fields, all from "create shipping types and shipping terms that incorporate a name and an internal code": shipping type Name, shipping type Internal Code, shipping term Name, shipping term Internal Code, plus New/Save actions. Anything beyond that is invention.

TABS: ONE PAGE, tabs unnamed. "clicking a tab as required" is the whole of what the corpus says. By the Audit Rules precedent (one page, three tabs) this is one page. But note the difference from Printed Invoices: there, three separate topics each name their tab explicitly; here there are no tab topics at all. The tab LABELS must come from the live UI. My working assumption, unverified: two tabs, Shipping Types and Shipping Terms, mirroring the two object kinds. STATE IT AS AN ASSUMPTION IN THE GRAPH, not a fact.

BOUNDARIES AGAINST BUILT PAGES:
  page.forms-and-fields — "The Shipping Method field may be exposed on any of the PR forms (it is not on any form by default) in order to select a shipping method when creating the purchase request." Shipping Method is a FORM FIELD whose exposure is configured on Forms and Fields; only the picklist VALUES are created here. This is the sharpest boundary on the page and the easiest to get wrong.
  page.company-locations — beware the 'shipping' keyword generally: it returns ~65 files, and the large majority are shipping/billing ADDRESS topics belonging to Company Locations (set-a-default-shipping-and-billing-address-f772bed1.md) or end-user Profile > Invoice Preferences. None of those is this page.
  page.purchase-order-configuration / page.audit-rules — Shipping Terms and Shipping Method appear as Condition Editor operands and as PO/vendor import columns. Those field ids may already exist in the built graph; check before creating.

IDENTITY QUESTION: is this a Compliance page at all? It is a procurement/purchase-request surface. It is in Group 6 because the original map put it there and no other group claims it — not because the corpus links it to compliance. If the main agent is re-cutting groups, this is the most arbitrary of the six placements.


# Deferred

EVERY candidate from all sweeps that I did not make a page, with the reason and where its configuration actually lives. Nothing dropped silently.

=== SETTLED BY ME AGAINST THE CORPUS (two sweeps left these open) ===

VENDOR HANDLING — NOT A PAGE. RESOLVED, not deferred-as-unknown. Two sweeps marked it "undetermined" on the single occurrence in 1,859 files: imaging-configuration-8b314b9a.md line 29, "Create an Invoice Imaging Configuration in Administration > Invoice > Image Handling as the Invoice Configuration Administrator, or, for vendors, Administration > Invoice > Vendor Handling." I settled it by finding the actual procedure topic neither sweep opened: create-or-modify-an-invoice-or-vendor-imaging-configuration-284f3fdf.md gives "1. Click Administration > Invoice (on the sub-menu). 2. Click Image Handling (left menu). The Image Handling window appears. 3. Either: Click the Invoice Imaging tab. – or – Click the Vendor Imaging tab." CONFIGURATION LIVES AT: the Vendor Imaging TAB of the ALREADY-BUILT page.image-handling, with a 5-true-row field table (cellopen=16, cols=2) including Name and Acrobat Reader Download URL. "Vendor Handling" is a documentation variant for that tab. Do not create a node.

INVOICE COMPLIANCE (Expense & Invoice Settings) — NOT A PROFESSIONAL-EDITION PAGE. One sweep called it undetermined; I am deferring it with reasons. Sole attestation: accessing-invoice-pay-related-settings-4b605020.md, "Click Administration > Expense & Invoice Settings \> Invoice Settings > Invoice Compliance." I read the ENTIRE file — it is 15 lines of YAML plus four lines of body. grep -cP '^\s*\|' = 0: no field table whatsoever. I grepped both anchoring phrases corpus-wide: "Expense & Invoice Settings" occurs in 2 files and the other is standard-edition-d252f36e.md; "Product Settings" occurs in 2 files and the other is standard-edition-55806366.md. "Invoice Compliance" occurs in exactly ONE line in the whole corpus. That tree is the Standard-style Product Settings UI, and the topic title is "Accessing Invoice Pay RELATED Settings" — an Invoice Pay surface, and Invoice Pay is not modelled in this graph at all. CONFIGURATION LIVES AT: the Standard Edition Product Settings tree, out of scope for this Professional graph; if Invoice Pay is ever modelled, it belongs there.

=== REAL PAGES, WRONG GROUP (must be built, but not by Group 6) ===

EXPENSE TYPE IMPORT (Invoice Processing Expense Type Import) — A GENUINE UNBUILT LEFT-MENU PAGE. Tests (a) and (c) fire. Nav verified: "Select Expense Type Import (left menu). The Invoice Processing Expense Type Import page appears." Its step 1 is a textbook trap-4 casualty — python3 shows access-the-invoice-processing-expense-type-import-page-3f5d3994.md contains b'Choose Administration \xc2\xa0\xc2\xa0Invoice.' with TWO NBSPs and NO '>' glyph, so a chain-anchored grep cannot see it. 15 files, richest the-basic-process-13c136d5.md (3,862 B) and expense-type-import-8b49f43c.md (3,335 B), with a 4-step spreadsheet download/populate/upload/validate flow. DISTINCT from the built page.expense-types, whose navPath is Invoice Processing Admin > Accounting Administration > Account Codes tab. NOT DEFERRED FOR LACK OF EVIDENCE — deferred because it is an IMPORT tool. CONFIGURATION LIVES AT: its own page, to be built under Group 5 (Data Structure & Accounting) or the deferred Group 7 (Ops). FLAG THIS LOUDLY to whoever owns Group 5: if neither group re-runs, this page is lost the same way Email Reminders nearly was.

ATTENDEES / ATTENDEE ADMIN — probably a real page, definitively not Group 6. Carries a genuinely DISTINCT COMPOUND gate no other surface uses: "To configure the Attendee feature for Concur Invoice, admins must have both the Expense Configuration Administrator role and Invoice Configuration Administrator role" ('Expense Configuration Administrator' occurs in only 2 files). Hangs off the Expense menu tree with no parent in this graph — the Authorized Approval Limits shape. Its nav is another trap-4 case: overview-8b281639.md contains b'(Administration \xc2\xa0\xc2\xa0Company \xc2\xa0\xc2\xa0Tools \xc2\xa0\xc2\xa0Attendee Admin.)' with 8 NBSP in the file and no '>' glyph. BUT: "The Attendees feature is available to clients who use both Concur Expense and Concur Invoice. It is not available to clients who use Concur Invoice only." CONFIGURATION LIVES AT: a cross-product Expense surface; belongs to an Expense-scope decision or Group 7, not Compliance.

PAYMENT MANAGER (with Check Configurations, Funding Accounts, Card Accounts, Payment Group Configuration) — Group 7 Ops, deferred by the graph meta. Different menu tree ("Click Payments > Payment Manager"), own role gate (Invoice Payment Manager), and its sub-surfaces are SECTIONS entered from within it ("In Payment Manager, under the Configuration section, select Check Configurations"). Flagged so the deferred Ops group is not assumed empty.

=== NOT A SURFACE THIS GRAPH CAN DRIVE ===

SAP DOC AND REPORTING COMPLIANCE (App Center connect) — a real, clickable page on the APP CENTER tree, but test (c) fails: it creates no configuration object. I read the whole flow in connecting-to-sap-document-and-reporting-compliance-cloud-edition-007b7c11.md: App Center tab > search > tile > Connect > accept Terms & Conditions > enter the SAP BTP subaccount subdomain > Connect. That is an OAuth-style connect with exactly TWO inputs. CONFIGURATION LIVES AT: attach those two inputs as a PREREQUISITE EDGE on page.peppol-configuration, not as a page. requirements-3738ba47.md makes it a licensing precondition: "A valid SAP Document and Reporting Compliance, cloud edition service license is required as an access point to the Peppol Exchange."

DRC MESSAGE MONITOR / PEPPOL PARTICIPANT REGISTRATION — a DIFFERENT SAP PRODUCT, not drivable from the Concur admin UI at all. Every More Information link points at help.sap.com/docs/cloud-edition/..., not a Concur page. registering-peppol-participants-to-receive-electronic-documents-127aee02.md sends registration off-product; administrator-configurations-a08482da.md lists it as a step performed OUTSIDE Concur. A Chromium driver cannot reach it. Must NOT become a node.

PEPPOL CONFIGURATION (Standard Edition tile path) — listed explicitly so no extractor follows it. standard-edition-d252f36e.md: "In the Connections section, on the Peppol Configuration tile, click Edit," reached via the Invoice Settings menu. SAME destination, DIFFERENT and wrong route for this graph. It is one of only TWO files containing "The Peppol Configuration page appears." — so a page-hood sweep that counts that phrase across files will either double-count Peppol or bind the wrong click path. Not a second page; not a Professional route.

=== TABS OF PAGES (Audit Rules precedent: one page, three tabs) ===

PRINT TEMPLATES / PRINT FORMATS / PRINT CONDITION RULES — three tabs of the NEW page.printed-invoices, not three pages. All three entered from the parent ("On the Printed Invoices page, click ..."), none appears in any left-menu census. Only Print Templates carries a gate of its own (Global Invoice Configuration administrator), which is a WITHIN-PAGE permission split, not a second destination.

TAX VALIDATION — a TAB of the ALREADY-BUILT page.tax-administration, despite 14 files and a strongly compliance-flavoured name, and despite THREE files calling it a "page" (one is titled "Work With the Tax Validation Page Options"). Settled by sequence in step-3-configure-the-service-14c3ef13.md: line 27 "click Administration > Invoice Admin > Tax Administration. The Tax Administration page appears." then line 29 "Click the Tax Validation tab." then line 34 "On the Tax Validation page, configure the following options". Reached by clicking a tab on an already-open page, so test (a) fails. THIS IS THE CLEANEST PROOF IN THIS RECON THAT "X page" LANGUAGE IS NON-DISCRIMINATING. Sibling tabs on the same built page: Tax Authorities, Expense Type Groups, Vendor Groups, Tax Code. CONFIGURATION LIVES AT: page.tax-administration.

VENDOR IMAGING / INVOICE IMAGING — tabs of the built page.image-handling. See Vendor Handling above.

LEDGERS — a tab of the built page.accounting-administration ("On the Accounting Structure tab, select New"), notable as a counterexample: it HAS a distinctive gate (Shared Configuration administrator, 6 files) and is STILL only a tab. A distinctive gate is a signal, not a proof.

=== MODALS AND WIZARDS (opened over an existing object) ===

EDIT LOCALIZATION — "Click Modify. The Edit Localization page appears." Says 'page appears' and is not one: opened only after a language and a Category-column message item are SELECTED. Precisely the Workflows General/Steps/Step Rules disqualifier. Belongs to page.localization as a modal.

TIMESTAMP VALIDATION FAILURE — "The Timestamp Validation Failure page appears" is contradicted three lines later by "Click X to close the Timestamp Validation Failure window." A surface dismissed with an X, opened by clicking a number in the Failed column of an existing result set. Its 5 read-only columns (Report Name, Expense Type, Vendor, Submit Date, Amount) belong to page.invoice-e-bunsho-timestamp-validation-request.

EDIT CONTENT FOR PRINT FORMAT / EDIT FIELDS FOR PRINT FORMAT — "Click Modify Content. The Edit Content for print format page appears," opened over a selected format. Modals of page.printed-invoices. (Flagged as an open question in that page's brief.)

CONNECTED LIST DEFINITION — an explicit five-step Previous/Next wizard over a selected list. Group 5, page.list-management, already built.

=== NOT A SURFACE ===

EXPORT LOCALIZATION — reads like a fourth menu level (Administration > Invoice > Localization > Export Localization) but has NO topic anywhere in the corpus. Attested in exactly 2 files, both incidental PET-code lookups inside import record-type format docs (410 line 133, 420 line 165). No access topic, no gate, no roster. An export function within page.localization.

e-BUNSHO POLICY ENABLEMENT and CFDi ATTACHMENTS — THE KEY NEGATIVE FINDING FOR GROUP 6, and it is a large one. e-Bunsho (19 files) and CFDi/Digital Tax Invoice (22 files, its own guide root "Image Handling - Digital Tax Invoice") are REAL compliance features with NO admin page of their own. CONFIGURATION LIVES AT: page.group-configurations — verified verbatim, enabling-cfdi-attachments-for-reporting-to-mexican-tax-authorities-5ce1fd0c.md lines 29/33 "Click Administration > Invoice > Group Configurations." then "In the Configuration for Group page, select Allow users to upload CFDi attachments"; and step-1-enable-by-invoice-group-ebe8724b.md line 41 "Select (enable) the Allow user to upload CFDi attachments check box." Also page.policies (the Timestamp Configuration field), and page.workflows / page.audit-rules for the INVXMLST exception code. These are GROUP 6 FIELDS ON EXISTING PAGE NODES — the compliance content is real and must be extracted, it just does not create pages.

VALUE ADDED TAX (VAT) — the single largest body of compliance content in the corpus (~25 VAT topics plus a guide root) and it produces NO page. CONFIGURATION LIVES AT: page.tax-administration (Tax Authorities / Expense Type Groups / Vendor Groups tabs) and page.forms-and-fields ("Step 1: Add VAT Fields to Forms", "Available VAT Fields", VAT Fields at Header and Line Item Level, configure-vat-labels-9d4795b9.md). No VAT menu destination exists anywhere in the corpus. Note the overlap with Peppol: the TAX/VAT1..VAT4 header fields named in the Peppol limitations table are these same already-built fields.

DIGITAL COMPLIANCE ADMINISTRATOR — a ROLE that grants access to the Tools page, not a page. It is the gate on page.invoice-e-bunsho-timestamp-validation-request.

HIERARCHY MAPPING LIST — a false positive of the "The X page appears" anchor. It is what the built page.routing-configuration RENDERS on arrival ("Click Routing Configuration. The Hierarchy Mapping List page appears with a list of hierarchy mappings imported for display"). No separate menu entry exists.

INVOICE PREFERENCES — caught by the "(left menu)" anchor and correctly rejected: it is the PROFILE left menu ("Click Profile > Profile Settings" then "Click Invoice Preferences (left menu)"). End-user surface. Its admin counterpart is the built page.company-locations.

SITE SETTINGS / USER PERMISSIONS / USER ADMINISTRATION — other product menus (Administration > Expense, Administration > Company > Company Admin). Reported for census completeness. Site Settings is worth one note: it is the gate that makes the Validation Rules tab appear on the built page.audit-rules.

ZERO-SCORE E-INVOICING PROBES — I re-ran the negative checks because they are load-bearing. Every plausible e-invoicing menu label returns ZERO files: "Invoice Compliance (left menu)", "e-Bunsho (left menu)", "CFDI (left menu)", "Electronic Invoicing (left menu)", "Invoice > E-Invoicing", "Invoice > Compliance", "Invoice > Peppol". Fapiao = 0 files, eDocument = 0 files. My own independent NBSP-normalised destination sweep (dest2.py, both dirs, all four anchors) returned 30 left-menu labels and 36 unbuilt destination segments and surfaced NOTHING that the five sweeps had not already named. CONCLUSION: Group 6 has no hidden e-invoicing pages. Peppol, Localization, Shipping Configuration and e-Bunsho are the whole e-invoicing/compliance story. What the map missed was the print/document surface next door and the audit register upstairs.

=== PRE-EXISTING GAP — NOT GROUP 6, BUT DO NOT LET IT GO UNRECORDED ===

page.map-invoice-concept-fields and page.budget-configuration are BUILT nodes that both carry navPath = [] (verified by reading nodes.configPages with python3) and score ZERO on every menu anchor in every sweep including my own. The future Chromium automation has NO CLICK PATH to either. That is a Group 5 defect, not a Group 6 finding, but it will break the driver just as surely as a missing page.

# Narrative

Group 6 is SIX pages, not three. The map was wrong upward again, and by more than any previous group.

The three claimed pages all survive, but they are the three THINNEST pages in the group. Shipping Configuration has exactly one topic file in 1,859 — I read the whole thing; it is four paragraphs and zero tables. Localization has no role gate anywhere in the corpus and its real roster lives in a Shared guide that was never crawled. Peppol Configuration is a five-field form. Together the three claimed pages are worth maybe thirty fields. The three pages the map never counted are worth roughly twice that.

PRINTED INVOICES is the recovery that matters, and the way it was nearly lost is the lesson. Its nav sentence is written as prose — "Click Administration > Invoice and then click Printed Invoices" — not as an A > B > C chain, so the sweep with the most thorough nav-chain regex missed it completely and said so honestly. Two of five sweeps found it. They were right, exactly as two beat four on the prior recon. It is 37 files and 87KB, all three structural tests fire, and it has by far the strongest object model of any candidate here: print formats, print templates, print condition rules and content IDs, each with its own add/edit/delete/assign topics, plus a genuinely distinct gate (Global Invoice Configuration administrator, five files, four surfaces — the Forms-and-Fields split signal) and a Global-versus-Group ownership model behind it. Three tabs, one page, by the Audit Rules precedent. I flag its group as an open question — it is document output, not e-invoicing — but Group 6 is the last non-deferred group, so deferring it means never building it.

INVOICE E-BUNSHO TIMESTAMP VALIDATION REQUEST came from one sweep of five. I re-verified it from scratch rather than discounting it, and it holds: Administration > Company > Tools > Invoice E-Bunsho Timestamp, a menu tree with no parent in this graph, reached by clicking — the exact shape that earned Authorized Approval Limits its node. It carries the ONLY distinctive gate in the entire compliance domain: "Digital Compliance Administrator" occurs in one file and covers one surface, against 28 files for the plain Invoice Configuration Administrator. It is also the most unambiguously compliance-domain page in the group. It is thin, about fifteen fields, and I say so in the brief rather than letting an extractor discover it.

CHANGE LOG is the Email Reminders pattern repeating almost exactly, and I kept it with a caveat I will not soften. It has its own access topic, its own destination on the same Invoice Processing Admin shelf as Peppol, and a four-file cluster — but it is reachable only through the glyphless NBSP form, b'Select Administration\xc2\xa0\xc2\xa0Invoice.', with no ">" glyph in the sentence. Forty files use that form. It is also a read-only audit register with five display columns and zero settable fields, so Group 7 may be its better home. That is a placement question, not a page-hood question, and a silent drop is deletion.

I settled two things the sweeps left open, both with commands rather than judgment. VENDOR HANDLING, which two sweeps called undetermined on a single sentence in 1,859 files, is NOT a page: the procedure topic neither sweep opened gives "Click Image Handling (left menu)... Click the Vendor Imaging tab" — it is a tab of the already-built page.image-handling, with a real five-row field table. INVOICE COMPLIANCE is a Standard-Edition Product Settings leak: its file is four lines with no table, and both phrases anchoring that menu tree co-occur only with Standard Edition topics.

Three traps fired live and one is new. The revision-history trap fires on THREE of the six pages — Printed Invoices, Peppol and Change Log each have a guide-root revision history as the largest or second-largest table in their set, and on Change Log it is the ONLY table, so an extractor trusting size returns twenty rows of SAP documentation dates as configuration fields. The indented-table trap fires on nearly every Printed Invoices file: naive grep returns zero where the correct anchor returns forty. And the new one, which the brief did not name: field-mapping-e3881fa5.md is a 44-true-row Peppol-XML-to-Concur mapping spec sitting in the Peppol set, four times larger than the actual five-field roster and shaped exactly like one. I have also flagged that TWO files share the title "The Condition Page" — one belongs to Printed Invoices, one to the already-built Audit Rules.

The negative finding is as valuable as the finds. e-Bunsho policy enablement, CFDi attachments and the whole VAT body — the largest compliance content in the corpus — produce no pages at all; they are Group 6 fields landing on Group Configurations, Policies, Tax Administration and Forms and Fields. Every plausible e-invoicing menu label scores zero, and my own independent NBSP-normalised sweep surfaced nothing the five sweeps had not already named. Group 6 has no hidden e-invoicing pages. What it had was a print surface and an audit register that nobody was looking for.

One thing outside my scope that will break the driver anyway: page.map-invoice-concept-fields and page.budget-configuration are built nodes with empty navPaths that score zero on every menu anchor in every sweep, mine included. Group 5 owns that, but it should not go unrecorded.