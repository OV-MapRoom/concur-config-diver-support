# G6 RECON — SWEEP: GRAPHREFS (unresolved endpoints + already-built check)
Date 2026-09-01. Corpus frozen, read-only. Graph v0.8.0 / 25 pages / 674 fields.

## METHOD
1. python3 over kg-invoice-config.json: enumerate every dependency whose sourceId or targetId is null
   (163 such sides across 488 deps) and bucket by targetRef.page / sourceRef.page.
2. Same for configSteps[].pages entries not matching a built page name, and for configValueSets with knownGap.
3. Grep the whole graph blob for domain tokens; then take every in-domain endpoint back to the corpus and
   apply the three page-hood tests (menu destination / role gate / object model).
4. Cross-check every candidate against ALREADY-BUILT fields so nothing gets rebuilt.

## RAW COUNTS
- 488 configDependencies. Unresolved sides: 119 targetId-null, 44 sourceId-null, 44 both.
- 79 distinct unresolved page labels.
- In-domain unresolved page labels: **Peppol Configuration, Localization, Printed Invoices, Print Format Administration**.
- "Shipping Configuration" occurs **0 times** in the entire graph JSON. No built group forward-referenced it.

## GRAPH SAYS THESE EXIST (verbatim from the graph)
- dep.g1.073  Invoice Settings "Enable Peppol Integration" -> Peppol Configuration page. condition:
  "The Invoice Settings check box (default cleared) only allows Peppol Integration; the actual field-level
  configuration is then done separately on the Peppol Configuration page."
- dep.g5g5.028 Company Locations addressCode -> Peppol Configuration "Ship To Address Code".
  "FORWARD REFERENCE - Peppol Configuration is not yet built."
- step g1-s4 order (Enable Peppol Integration) rationale: "the real configuration happens on the separate
  Peppol Configuration page under Invoice Processing Admin, whose own Peppol Integration Enablement field
  is a distinct Active/Inactive selector."
- dep.g3.022 PO Matching Rules confirmation_type -> Localization "Invoice Receipt Confirmations".
- dep.g5g5.046 List Management itemCode -> Localization "Export System Expense Types".
  "FORWARD REFERENCE - Localization is not yet built."
- dep.gworkflowsw.015 Email Reminders email-subject -> Localization "Email Reminder Text Translation".
- step grpworkflows-b1 order 26 page "Localization": "Target page is UNBUILT and unresolved on purpose."
- dep.g1.020 / dep.g1.030 Policies "Print Format" <-> Printed Invoices (create/modify then assign; deletion blocked while active).
- dep.g5.055 Forms and Fields accessRights -> "Print Format Administration" / "Field on the printed invoice".

## CORPUS VERIFICATION (every quote grep -F -c == 1)
### Peppol Configuration — PAGE
  "Navigate to Administration > Invoice > Invoice Processing Admin > Peppol Configuration."
    professional-edition-7e36681a.md  (nbsp=0, real ">" glyphs)
  Object model: single tenant config record, Edit/Save, "Click Edit" (modifying-peppol-integration-configuration-b8013633.md).
  Field table in configuring-peppol-integration-60b28605.md: naive `^| ` = 0 (TRAP 1 LIVE),
    cell-openers `^\s*\|` = 19, columns=2 -> (19-1)/3 = **6 rows = header + 5 fields**:
    Participant ID, Email Address, Default Invoice Policy, Default Vendor, Active.
  LABEL DRIFT: field table says "Active"; deactivating-peppol-integration-f8577b2a.md says
    "In the Peppol Integration Enablement field, select Inactive". Same control, two labels.
  35 corpus files mention peppol (32 admin + 3 tools).
  NOT a second page: participant registration happens in SAP Document and Reporting Compliance, cloud
    edition — an EXTERNAL system (registering-peppol-participants-...-127aee02.md, administrator-configurations-a08482da.md).

### Localization — PAGE (and it is BIGGER than the graph modelled)
  "Click Localization (left menu)."  step-5-...-5328a8e1.md (nbsp=0)
  "Click Modify. The Edit Localization page appears."  same file — opens over a selected language/category
    row, so by the Workflows-wizard precedent it is NOT its own page.
  **NEW, found only by this sweep — a second documented leg, attested twice:**
    "Go to Administration > Invoice > Localization > Export Localization, select a language to export to,
     select the Payment Expense Types category, and then click Export."
       invoice-line-item-import-record-type-410-format-a4ea333f.md
    "click Administration > Invoice > Localization > Export Localization, and select a language to export
     to. Then select the Payment Expense Types category and click Export."
       invoice-line-item-import-record-type-420-format-0880199e.md
    Both files DO carry NBSP (2 and 5) but only inside empty table cells (' | \xa0 |'), never in the nav
    sentence — checked with python3 b.count(b'\xc2\xa0') and a per-line dump, not with grep -P "\xc2\xa0".
  So Localization = ONE page with at least two legs (edit/modify + Export Localization), a language
    selector and a Category selector. Categories attested: "Invoice Receipt Confirmations",
    "Payment Expense Types". Corrects the graph's invented target field "Export System Expense Types".
  Only 8 corpus files mention localization — this page is documentation-thin and will not yield a fat roster.

### Shipping Configuration — PAGE, but a GRAPH ORPHAN
  ZERO graph references. Its only tie to built work is negative: Invoice Settings
  "Default shipping method" carries the note "the option list is NOT enumerated anywhere in the corpus" —
  because the codes are CREATED here, not enumerated.
  "Access this tool by clicking Administration > Invoice > Shipping Configuration, clicking a tab as required."
    shipping-configuration-and-shipping-terms-3429ee14.md (nbsp=0)
  Role gate: "the Invoice Configuration administrator or Invoice Configuration administrator (Restricted)".
  Object model: "create shipping types and shipping terms that incorporate a name and an internal code".
  ONE corpus file. Zero tables (cell-openers 0). Tabs are unnamed. NOT already built: Invoice Settings
  holds only DEFAULTS, Company Locations holds ADDRESSES, PO Config holds ship_to_without_requestor_name.

### Printed Invoices — PAGE, unbuilt, graph-referenced, DOMAIN IS THE OPEN QUESTION
  "Click Administration > Invoice and then click Printed Invoices." access-printed-invoices-c04fdd28.md
  Role gate distinct from every built page: "Only the Global Invoice Configuration administrator can make
  edits in the Print Templates section of Printed Invoices page." Print Formats adds a Global-vs-Group
  ownership model ("A Global print format can be viewed by a Group administrator but can only be edited by
  the Global administrator").
  Object model: print formats are first-class objects — add / copy / edit / delete / assign to policy.
  TABS, NOT PAGES: "On the Printed Invoices page, click the Print Templates tab.";
    "1. Click the Print Formats tab on the Printed Invoices page."; and
    "On the Printed Invoices page, click Print Condition Rules." (opens a Condition Editor over the page).
  "Modify Content -> The Print Format Content page appears" opens over a selected format = wizard, not a page.
  33 corpus files. Tables: add-a-print-format 27 cell-openers, invoice-form-data 28, invoice-barcode 28
    (<tr> = 4 via grep -o), invoice-text 22 (<tr> = 11), invoice-list-data 40. naive `^| ` = 0 on ALL of them.
  **GRAPH BUG TO HAND BACK: dep.g5.055 targets a page named "Print Format Administration".
    That string occurs ZERO times in the corpus. The documented name is "Printed Invoices".**
  DOMAIN CAVEAT: this is document-output, not e-invoicing/compliance. Its only localization tie is indirect
    (print-templates-8b3672f3.md: "Do not embed text into the HTML—it is not localized. Instead, create a
    text content ID and add the text in the Print Format."). Reporting it because it is a real, unbuilt,
    graph-referenced page; the main agent should decide whether it lands in G6 or its own group.

## RULED OUT
- **CFDi / Mexican digital tax invoice** (the obvious e-invoicing candidate). Its ONLY admin control is
  "Allow user to upload CFDi attachments" on Group Configurations — ALREADY BUILT as
  field.group-configurations.allow-users-to-upload-cfdi-attachments. Digital Tax Invoice Validation has no
  admin UI at all: "work with SAP Concur support to enable the feature" (step-3-...-69ba75a6.md).
  NOT A PAGE.
- **Registering Peppol Participants** — external system (SAP DRC cloud edition). NOT A PAGE.
- **Invoice Preferences** — carries "Default Shipping Address", so it looks in-domain, but it is the
  END-USER profile page: "Profile > Profile Settings > Invoice Preferences" (10 attestations). NOT ADMIN.
- **Edit Localization / Print Format Content / Print Condition Rules Condition Editor** — all open over an
  already-selected object. Workflows-wizard precedent: modal/wizard, not pages.

## OUT-OF-DOMAIN ORPHAN NOTED IN PASSING (not mine to call)
- "Vendor Handling": "Administration > Invoice > Image Handling ... or, for vendors, Administration >
  Invoice > Vendor Handling." — imaging-configuration-8b314b9a.md, ONE attestation corpus-wide. Sibling of
  the built Image Handling page. Group 4 domain.

## BOTTOM LINE FOR THIS SWEEP
Graph refs confirm 2 of the 3 mapped pages (Peppol Configuration, Localization) and are SILENT on the
third (Shipping Configuration — real, but a graph orphan). They also surface a 4th real unbuilt page the
map never counted: Printed Invoices. Direction of error: the map is a LOWER bound again, not an upper one —
same failure mode as Email Reminders / Delegate Configurations in the Workflows group.
