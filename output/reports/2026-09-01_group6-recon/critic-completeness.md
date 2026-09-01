# Group 6 recon — completeness critic

## Verdict

SIX PAGES IS RIGHT. I could not find a seventh, and I ran eight instruments to try — including two the five sweeps never used (a 73-entry GUIDE-ROOT enumeration and release-note mining across 371 files). That negative is now proved, not assumed.

But the roster is NOT ready to build from. Its page-hood work is sound (every one of its 17 nav and gate quotes verifies at grep -F -c = 1 or 2 as claimed); its SURFACE MAP and its MEASUREMENTS are not.

The blocker: Printed Invoices has a navigation level nobody found. "The Print Format Content page appears." occurs in 2 files, 4 times, and appears in no sweep, no brief, no tab list, no modal list. The real chain to the 13/9/9/7-row content-type rosters — the bulk of that page's estimated 60 fields — is Printed Invoices > Print Formats tab > select format > Modify Content > PRINT FORMAT CONTENT > select content > Modify Content/Modify Fields > Edit Content/Edit Fields. A driver built from the roster stops two clicks short. Worse, attestation runs backwards: "The Printed Invoices page appears" is in 1 file, "The Edit Content for print format page appears" is in 6. Any extractor ranking by attestation inverts the hierarchy.

The measurement layer is worse than the brief warned. The brief's trap-2 conversion, (cellopen − sep)/(cols+1), SILENTLY UNDER-COUNTS whenever a row carries an empty cell written as U+00A0 — SAP collapses ` | \xa0 |` onto one line. Measured: country-code-list 191 vs 250 real; details-section 194 vs 257 real (the ROLEGATES sweep shipped the 194); error-messages 52 vs 61 real. Two independent correct methods (pipes/(cols+1) − sep, and row-start lines at the separator's indent) agree on every file I tested. The project has shipped cell-opener errors into three builds; this is the mechanism.

And the largest table in the whole Group 6 domain is named by nobody: error-messages-3b8339b0.md, 60 data rows, the Peppol guide's own Appendix error catalog — invisible because it contains the word "peppol" ZERO times. That single file falsifies the roster's "field-mapping is the largest table in the set by a factor of four."

Seed coverage is thin where it matters most. Printed Invoices: 16 admin-guide topics unnamed, ~30 KB, 30% of the page — including every destructive and creation action (Delete a Print Format, Add a New Content ID, Split a Content ID into Two, Assign the Rule to a Content Type). Peppol: 10 of 35 files unnamed, 46,071 of 75,649 bytes pointed at. And the content-type object model is 7 kinds, not the 4 the roster names.

Build it. But fix the surface map and swap the row formula first, or the 20-agent run extracts a page it cannot reach and reports SAP documentation dates and ISO country codes as configuration fields.

---

## [blocker] Printed Invoices is missing a whole navigation level: the Print Format Content page

The roster gives Printed Invoices three tabs and rules 'Edit Content for print format' / 'Edit Fields for Print Format' modals opened directly over a selected format. That is wrong: there is an intermediate surface between them.

grep -rlF "The Print Format Content page appears." -> 2 files, grep -rhoF | wc -l -> 4 hits (edit-a-print-format-676b3ee0.md lines 38/53/68, edit-print-format-content-576e44df.md). It appears in NO sweep, NO brief, no tab list, no modal list.

Verbatim from edit-a-print-format-676b3ee0.md:
  1. On the Print Formats tab, select a new or copied print format.
  2. Click Modify Content. The Print Format Content page appears.
  3. Select the content you want to modify and then click Modify Content. The Edit Content for print format page appears.
(and the Modify Fields variant at line 70)

So the real path to the content-type rosters — 13/9/9/7 true rows, i.e. most of this page's ~60 estimated fields — is: Printed Invoices > Print Formats tab > select format > Modify Content > PRINT FORMAT CONTENT > select content > Modify Content|Modify Fields > Edit Content|Edit Fields for print format. The roster's node has no node, tab, or modal for the middle step.

ATTESTATION RUNS BACKWARDS, which is how this was lost: grep -rlF counts are Printed Invoices page appears = 1 file; Print Format Content page appears = 2; Edit Content for print format page appears = 6. An extractor ranking by attestation will model the modal as the page.

BONUS — this also SETTLES the roster's own stated 'SECOND OPEN QUESTION' about whether Edit Content is a page. The corpus contains the exact Timestamp-Validation-Failure disambiguator and the roster never cited it: edit-print-format-content-576e44df.md line 78, grep -F -c = 1, "The Edit Content for print format window appears." Window, at line 78; page, at line 86. Same file. Modal confirmed.

**Action:** Before building, add the Print Format Content surface to page.printed-invoices as a child/step node (not a page — it is entered by clicking Modify Content on a selected format) and re-anchor the four content-type rosters beneath it, not beneath the Print Formats tab. Record the window quote from edit-print-format-content-576e44df.md:78 as the modal ruling for Edit Content / Edit Fields, closing the roster's open question with evidence instead of judgment.

---

## [high] The largest table in the Group 6 domain is named by nobody: the Peppol Appendix error catalog

error-messages-3b8339b0.md (admin-guides, 6,843 B) carries a 3-column table with 61 rows including header = 60 DATA ROWS (columns: Error Messages | Error Codes | Reason). It appears in NO sweep and NO brief.

It is Peppol's. Proved by sibling reference, not inference: receiving-exception-email-notifications-from-concur-invoice-28039049.md (a named Peppol seed) ends with "More Information: For a complete list of error messages and error codes to reference, refer to the Error Messages section in the Appendix in this guide." and appendix-a084989c.md (also unnamed) says "Field mapping and error message tables provide essential information for integrating Peppol invoices into Concur Invoice."

WHY ALL SIX PASSES MISSED IT: grep -ci peppol error-messages-3b8339b0.md = 0. The word never appears. Every sweep keyed on the term.

THIS FALSIFIES A ROSTER CLAIM the extractor is told to rely on: 'field-mapping-e3881fa5.md ... is the largest table in the set by a factor of four.' Measured: field-mapping = 45 rows incl header (44 data); error-messages = 61 incl header (60 data). error-messages is larger, and it sits in the same Appendix.

It is NOT a page roster — it is a troubleshooting catalog — so it is the same class of landmine the roster correctly flagged for field-mapping, one size bigger and undeclared. It also carries 35 U+00A0.

**Action:** Add error-messages-3b8339b0.md to the Peppol page's seed set explicitly CLASSIFIED as an appendix troubleshooting catalog (60 data rows, do not extract as fields), alongside appendix-a084989c.md. Correct the brief's 'largest table' sentence. Any future domain sweep must include sibling-reference walking ('refer to the X section in this guide'), not keyword matching alone.

---

## [high] The brief's cell-opener row formula silently under-counts on every table containing an NBSP empty cell

Trap 2 in the brief says convert cell-openers with (cellopen - sepLines)/(cols+1). That formula breaks whenever a row has an empty cell, because SAP writes the empty cell as U+00A0 and collapses the row's trailing cells onto ONE line: b' | \xc2\xa0 |' instead of three separate pipe lines.

MEASURED ERRORS (formula vs truth):
  country-code-list-8b3e2eda.md   191.0 vs 250 rows  (-59)
  details-section-49500221.md     194.1 vs 257 rows  (-63)   <-- the ROLEGATES sweep shipped '~194 rows'
  error-messages-3b8339b0.md       52.25 vs 61 rows  (-9)
  field-mapping-e3881fa5.md        44.0 vs 45 rows   (-1)
The non-integer results are the tell. Any non-integer output from that formula means the file has collapsed rows and the number is wrong.

TWO CORRECT METHODS, which agree with each other on every file I tested (20 files across all six page sets):
  (a) PIPE COUNT: sum of '|' characters on all lines containing '|', divided by (cols+1), minus the number of separator lines. Exact for every file except one with a genuine 1-cell row.
  (b) ROW-START COUNT: count lines whose leading whitespace equals the SEPARATOR LINE's indent and which match ^\s*\|, minus 1 for the separator. Works for indented tables too, so it also defeats trap 1.
Both reproduce the roster's correct numbers (limitations 5, configuring-peppol 6, change-log 20, printed-invoice-configuration 21, invoice-list-data 13, step-5 localization 4) and expose the four wrong ones above.

**Action:** Replace the cell-opener conversion in the build instructions with the pipe-count method (or the row-start-at-separator-indent method) and require BOTH to be reported per table. Re-measure details-section-49500221.md as 256 data rows, not ~194, before any Group 5/7 build consumes that number.

---

## [high] Printed Invoices has SEVEN content types; the roster models four

content-types-and-content-ids-d6268235.md carries an 8-row table (header + 7 data; confirmed by both methods, and grep -c '^| $' = 8). The seven content types and their syntaxes:
  Invoice Text ($rtext_XXXX)
  Invoice Form Data ($rformdata_XXXX)
  Invoice List Data ($rlistdata_XXXX)
  Summary ($rsummarydata_XXXX)          <-- NO topic file, unnamed in roster
  Invoice Barcode ($rbarcode_XXXX)
  Approval Flow Data ($rapproval_XXXX)  <-- NO topic file, unnamed in roster
  Audit Trail ($rauditdata_XXXX)        <-- NO topic file, unnamed in roster

The roster's brief names only the four that happen to have their own topic file (invoice-list-data 13 rows, invoice-form-data 9, invoice-barcode 9, invoice-text 7). This matters because edit-print-format-content-576e44df.md:86 states "The Edit Content for print format page appears. DEPENDING ON THE CONTENT TYPE, THE PAGE VARIES." — so there are seven Edit Content variants, three of which have no documented field roster at all, and the driver must know they exist rather than assuming four.

Same file line 61 further constrains it: "Modify Fields: Enables you to add or remove fields... This is applicable only for Form Data, Summary Data, and List Data." — i.e. the Modify Fields branch is gated to three content types, one of which (Summary) the roster does not model.

**Action:** Record all seven content types on page.printed-invoices as an enumerated value set with their $-syntaxes, flag Summary / Approval Flow Data / Audit Trail as documented-name-only (no field roster in corpus, must come from live UI), and record the Modify Fields gate (Form Data, Summary Data, List Data only) as a constraint.

---

## [high] The Printed Invoices seed list omits 16 admin-guide topics, ~30 KB, including every create/delete action

The roster's brief lists 14 seed files while declaring the page is 37 files. My domain sweep (grep -rliE 'printed invoice|print format|print template|print condition|content id|content type') returns 40 files / 100,306 B; 18 are named in no sweep and no brief (16 in admin-guides, 2 in tools-guides), totalling 30,516 B — 30% of the page set.

The unnamed 16, with titles:
  Overview (overview-8b362706.md, 2330 B)
  Default Printed Invoices Templates (f5f834c2, 2054)
  Split a Content ID into Two (024c44ce, 1982)
  Add a New Content ID (b11e521a, 1934)
  Sections of a Default Printed Invoice (b221b1ee, 1832)
  Before You Begin (8a2e529a, 1792)
  Work With Print Condition Rules and Content IDs (1b70c30e, 1755)
  Differences Between Configurable Printed Expense Reports and Configurable Printed Invoices (7629df71, 1703)
  Components of the Template Code (ddf64e26, 1674)
  Default Templates (1d363e9c, 1497)
  Delete a Print Format (7ba7e0ff, 1462)
  Assign the Rule to a Content Type (a192fa6d, 1434)
  Configuration Process (8b35dba0, 1426)
  Before You Begin (94617c5e, 1339)
  Print Format Components (75e8af91, 1236)
  Change the Template Code (ce7e566f, 858)

What a graph gains: the roster's own page-hood argument rests on 'four object kinds with full add/edit/delete/assign verb sets' — yet DELETE (delete-a-print-format-7ba7e0ff), the two CONTENT ID creation topics (add-a-new-content-id-b11e521a, split-a-content-id-into-two-024c44ce), and the rule-to-content-type ASSIGN topic (a192fa6d) are all absent from the seed list. The evidence for page-hood is in files the extractor will never open. assign-the-rule-to-a-content-type-a192fa6d.md also contains two of the six 'Click Modify Content.' steps that reveal the missing navigation level in finding 1.

**Action:** Expand the page.printed-invoices seed set to all 40 domain files with the 16 above added; at minimum add delete-a-print-format-7ba7e0ff, add-a-new-content-id-b11e521a, split-a-content-id-into-two-024c44ce, work-with-print-condition-rules-and-content-ids-1b70c30e, assign-the-rule-to-a-content-type-a192fa6d, print-format-components-75e8af91, components-of-the-template-code-ddf64e26 before the build starts.

---

## [high] The Peppol node points at 25 of 35 files; 10 unnamed, including a second Standard-Edition landmine

grep -rli peppol across both guide dirs = 35 files / 75,649 B. The roster's node declares files: 25 / 46,071 B. Ten files, 29,578 B (39% of the domain), are named nowhere:

  standard-edition-db173132.md (1088 B) — A SECOND STANDARD-EDITION FILE IN THE PEPPOL SET. The roster's WARNING 3 covers only standard-edition-d252f36e.md. This one carries a different Standard-only rule: "Clients using Concur Invoice for Standard Edition must be using a Japan or Australia country pack." / "Standard Edition does not offer a Germany and Belgium country pack." An extractor told there is exactly one Standard leak will trust this file.
  appendix-a084989c.md (810 B) — the pointer to the missed error catalog (finding 2).
  japan-6bd85166.md (986 B) — Japan compliance: 7-year Peppol document retention. A genuine COUNTRY MANDATE topic, and the only place the corpus states a retention period.
  australia-and-new-zealand-0bdf2180.md (1310 B) — AU/NZ retention guidance, links to ato.gov.au and einvoicing.govt.nz.
  setting-up-a-global-account-4523b507.md (1352 B) — the SAP BTP GLOBAL ACCOUNT precondition. The roster models the App Center prerequisite as exactly TWO inputs (T&C + subaccount subdomain); this is a third, upstream precondition it does not carry.
  managing-peppol-integration-for-concur-invoice-a087ac46.md (1047 B)
  peppol-exchange-concepts-0779b34d.md (943 B) — off-product pointer, worth marking as such.
  downloading-the-pdf-version-of-the-peppol-xml-file-3e741256.md (1366 B)
  downloading-the-peppol-xml-attachment-b4079bcc.md (1081 B)
  approver-and-processor-experience-021fc80a.md (973 B) / end-user-experience-a085adfc.md (2374 B) — end-user, safe to exclude but should be excluded explicitly.

Also: the roster calls configuring-peppol-integration-60b28605.md 'THE ACTUAL PAGE ROSTER'. It is not edition-pure. Line 99: "For Concur Invoice for Standard Edition, the policy is associated with the country pack." and in the Default Vendor description: "For Standard Edition, this field is the default vendor." Two Standard sentences sit inside the Professional five-field table.

**Action:** Extend the Peppol seed set to all 35 files with per-file classification (config / prerequisite / country-mandate context / Standard-Edition-DO-NOT-USE / end-user-exclude). Widen the Standard-Edition warning to name standard-edition-db173132.md as well as d252f36e. Add the SAP BTP global account as a third prerequisite input. Flag the two in-file Standard sentences in configuring-peppol-integration-60b28605.md so they are not extracted as Professional field behaviour.

---

## [medium] Every role-gate file count in the roster is understated — the discriminating baselines are wrong by up to 2.5x

The roster leans on gate file counts to argue distinctiveness. They were taken case-sensitively and the corpus mixes case.

  "Invoice Configuration administrator" — roster says 28 files. Measured: grep -rlF with capital A = 28, with lowercase a = 44, UNION (grep -rliF) = 71 FILES. The roster's baseline is 39% of the truth.
  "Invoice Configuration administrator (Restricted)" — roster says 9 files / 9 surfaces. Case-sensitive 9, any-case 11.
  "Global Invoice Configuration administrator" — roster says 5 files / 4 surfaces. Case-sensitive lowercase-a 5, capital-A 1, any-case 6 files: access-printed-invoices-c04fdd28, delete-exceptions-aa2889cc, deleting-expense-types-8d2f5b2b, invoice-form-data-content-type-6c4a88d2, overview-6e3fab65 (Workflows editing), workflows-tool-8b3b4dbe. That is 6 files / 5 distinct surfaces, not 5/4.
  "Digital Compliance Administrator" = 1 file, 1 surface — CONFIRMED exactly as claimed (e-bunsho-timestamp-092c1c08.md:32).

No page verdict flips: the corrections make the non-distinctive gates even less distinctive, so Peppol's and Shipping's gates get weaker and e-Bunsho's stays uniquely strong. But the numbers handed to the extractor are wrong and will be repeated downstream.

**Action:** Recompute all gate counts with grep -rliF (case-insensitive) before writing roleGate metadata; restate the Invoice Configuration administrator baseline as 71 files, Restricted as 11, Global as 6 files / 5 surfaces. Keep Digital Compliance Administrator at 1/1.

---

## [medium] "Peppol Configuration and Change Log are the only two children on the Invoice Processing Admin shelf" is not what the corpus says

The roster asserts this twice and rests the Change Log page node partly on it. Its method was a '>' chain sweep, which returns exactly ONE Invoice Processing Admin chain in the whole corpus (professional-edition-7e36681a.md). One of twelve.

I re-derived the shelf a different way: all 32 lines mentioning 'Invoice Processing Admin' (NBSP-normalised). The shelf has TWELVE children, attested by 'From/Under the Invoice Processing Admin menu, choose|select|click X':
  Email Reminders, Exceptions, Workflows, Group Configurations, Policies, Expense Types, Invoice Settings, Change Log, Forms and Fields, Company Locations, Routing Configuration, Peppol Configuration.
Ten are already built. So the roster's conclusion (Change Log and Peppol are the only UNBUILT children) happens to hold — but its stated claim is false as written, and its method was not entitled to the negative.

This matters because the same '>'-chain reasoning is used elsewhere in the roster to assert absence.

**Action:** Restate the claim as 'the only two UNBUILT children of twelve' and record the shelf's full child list on the graph so the driver knows Invoice Processing Admin is a menu with twelve entries, not two. Retire '>'-chain sweeps as evidence of absence anywhere in this project.

---

## [medium] There is a second NBSP form nobody measured: the &nbsp; HTML entity — and it falsifies the roster's clean bill on Printed Invoices

The whole project measures NBSP as the byte sequence b'\xc2\xa0'. There is a second form in this corpus: the literal &nbsp; entity, which that count misses entirely.

Measured corpus-wide: byte U+00A0 in 186 files / 1,729 instances (matches the CLICKPATHS sweep); &nbsp; ENTITY in 9 FILES / 36 INSTANCES — a disjoint population the sweeps never counted.

The roster states for Printed Invoices: "NBSP measured with python3 b'\xc2\xa0' on all 37 files: ZERO NBSP anywhere in this page set. This is the one Group 6 page where trap 4 does not apply." Not true: invoice-text-content-type-02b21c13.md has byte-NBSP 0 but &nbsp; = 3.

Risk assessment, stated honestly: all 36 entity instances sit inside HTML table cells (empty-cell markers), none in a nav or gate sentence, so no recorded quote is currently at risk. The defect is the blanket clean bill, not a wrong quote. The nine files: additional-approver-situations-fbb5034c (6), overview-attendee-forms-and-fields-96aa4b66 (12), global-level-a53bf756 (7), invoice-text-content-type-02b21c13 (3), configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7 (2), configuring-forms-and-fields-in-capture-processing-7c14446c (2), policies-the-purchase-order-policy-new-experience-5a1ba7ef (2), filter-authorized-approvers-by-workflow-approval-step-aae69350 (1), what-fields-are-extracted-during-the-ocr-process-8eddb3cf (1).

Separately, the byte-NBSP audit confirms the roster's other claims: e-Bunsho 0 across all 20 domain files; Change Log 2 (nav topic only); Localization primary seed 0; Shipping 0; the two Localization import-format files carry 5 and 2 byte-NBSP but their Export Localization chain sentences (420 line 165, 410 line 133) are pure ASCII — the roster's quotes are safe.

**Action:** Add &nbsp; to the NBSP audit alongside b'\xc2\xa0' in any future sweep and in bin/validate-graph.py's normalisation. Downgrade the Printed Invoices claim from 'zero NBSP' to 'zero byte-NBSP; 3 entity-NBSP in invoice-text-content-type-02b21c13.md, all inside HTML cells, no quote at risk.'

---

## [medium] Nested HTML value-sets inside pipe-table cells will be extracted as fields

Trap 3 in the brief covers grep -c '<tr' under-reporting. The real hazard in this domain is different: HTML tables NESTED INSIDE a markdown pipe-table cell, holding VALUE SETS, not fields.

Corpus-wide only 33 files carry any HTML table. In the Printed Invoices set:
  invoice-text-content-type-02b21c13.md — a 7-row pipe table (6 field rows) with an 11-<tr> HTML table nested inside ONE of its cells. The nested table is the Special Tags value set: Bold [b], Italic [i], Underlined [u], Numbered list [ol], Bulleted list [ul], List item [li], Line space [br], Anchor tag [a name=], Link [a href=] — NINE VALUES, plus a header and an &nbsp; spacer row. Those are picklist/syntax values for one field, not nine fields.
  invoice-barcode-content-type-81641f43.md — same shape, <tr> = 4.
  create-a-conditional-rule-in-the-editor-86a92887.md — <table> 1 / <tr> 3, and it has NO pipe table at all.
  components-of-the-template-code-ddf64e26.md — <tr> = 1 with <table> = 0. Not a table: it is an inline HTML fragment quoted in prose ("<tr><td>$rtext_TopNote</td></tr>") demonstrating template syntax. A <tr>-counting extractor will report it as a one-row table.

The roster reports these as bare counts ('<table>=1, <tr>=11') without saying what they contain.

**Action:** Classify every HTML table in the Printed Invoices set before extraction: invoice-text = 9 Special-Tag VALUES for one field; invoice-barcode = value set; components-of-the-template-code = prose code sample, NOT a table. Instruct the extractor that nested HTML inside a pipe cell is a value set belonging to the enclosing row's field.

---

## [medium] "Change Log" name collision: the 5th file in the set is about the invoice audit trail, not the configuration register

grep -rli 'change log' returns 5 files, not the roster's 4. The fifth is special-considerations-f7c5d1e0.md (tools-guides, 1,694 B) and it belongs to a different concept entirely: "The invoice is considered changed and the change logged whenever the employee clicks the OK or Save link on the Distribute Selected Items page, even if no changes took place." and "...if the employee changes a tracked field, then changes it back." It points to 'Track Processor Changes to Request Fields and Line Items' in the Forms and Fields guide and 'Track Processor Changes to a Request' in the Audit Rules guide.

That is the per-invoice PROCESSOR AUDIT TRAIL, configured on the already-built page.forms-and-fields and page.audit-rules. It is not the Administration > Invoice > Invoice Processing Admin > Change Log configuration register.

This is the same class of hazard the roster correctly caught for the two 'The Condition Page' files, one directory over and uncaught. Given that page.change-log has only FIVE display columns and zero settable fields, a single mis-attributed file is a large fraction of everything the extractor will see there.

**Action:** Explicitly exclude special-considerations-f7c5d1e0.md from page.change-log's seed set and record the collision in the page brief: 'change log' (invoice audit trail, Forms and Fields / Audit Rules) vs 'Change Log' (configuration register, this page).

---

## [low] Settled: add-a-print-format-5c28923a.md is 9 rows / 8 data rows, and the non-integer is a single-cell row, not a multi-line cell

The roster left this open: "TRUE ROWS ~8.7 (non-integer: a multi-line cell; read it, do not trust the arithmetic here)". I read it.

The table is indented 4 spaces. Row-start lines at the separator's indent are at lines 38, 47, 56, 65, 81, 90, 95, 108, 121 = 9 rows including header, so 8 DATA ROWS. The pipe method gives 8.67 because the row starting at line 90 has only TWO pipe lines ('    | ' at 90, '     |' at 94) with no mid ' | ' separator — a single-cell/merged row, not a multi-line cell. The row-start-at-separator-indent method returns the clean 9 and is the method to use here.

**Action:** Record 8 data rows for add-a-print-format-5c28923a.md and close the roster's open arithmetic question. Note the merged row at line 90 so an extractor expecting 2 cells per row does not mis-align the table.

---

## [low] country-code-list-8b3e2eda.md: a 249-row, 236-NBSP catalog in the compliance keyword space that no sweep and no brief names

9,921 B, 3 columns (Code | Country | Notes), 250 rows including header = 249 DATA ROWS, 236 byte-NBSP. Measured by both correct methods. It is the second-largest table in the entire corpus after details-section-49500221.md.

It is NOT a page roster. Its own text: "The following lists the country code list that you use when creating the vendor import file." It is a vendor-import reference. Its guide root, country-code-list-8b3e41a4.md, is a 16-row REVISION HISTORY — the trap-5 pattern, in a guide root nobody enumerated.

Why it matters for THIS build: 'Country Code List' is one of the 73 guide roots and is the only compliance/localization-flavoured root that appears in no sweep and no brief. Any Group 6 agent sweeping country / jurisdiction / localization keywords will hit it, and 249 rows of ISO country codes will look exactly like a roster — the same failure mode the roster warns about for field-mapping, at 5x the size. It is also where the brief's cell-opener formula fails hardest (191 vs 250).

**Action:** Pre-classify country-code-list-8b3e2eda.md (249-row vendor-import reference catalog) and country-code-list-8b3e41a4.md (revision history) as DO-NOT-EXTRACT in the Group 6 build brief, alongside the three revision histories the roster already flagged.

---

## [low] Proved negative: there is no seventh Group 6 page, and here are the eight instruments that say so

I ran the completeness hunt with two instruments no sweep used, plus six re-runs, and found nothing the roster has not already named or deferred.

NEW INSTRUMENT 1 — GUIDE-ROOT ENUMERATION. grep -rlF 'Applies to these SAP Concur solutions' = 73 guide roots (the ROLEGATES sweep said 53 and was cut off). This is SAP's own top-level feature partition. Compliance-flavoured roots: Peppol Integration, Change Log, Printed Invoice Configuration, Image Handling - Digital Tax Invoice, Tax Validation, Tax Authority, Value Added Tax (VAT), Receipt Confirmation, Positive Pay, and Country Code List. Every one is already a roster page, a built page, a deferred tab, or (Country Code List) an import reference. Decisive corroboration for the thinness verdict: there is NO Localization guide root, NO Shipping Configuration guide root, and NO e-Bunsho guide root anywhere in the 73.

NEW INSTRUMENT 2 — RELEASE-NOTE MINING (371 files across both release-note dirs, used only as a NAME GENERATOR then confirmed against the guides, never as page-hood evidence). 68 distinct 'X page' names; 36 absent from the guides entirely, and every one is end-user or shared-product: Create New Invoices, Unassigned Invoices, Unapproved Invoices, My Invoices, Sign In, Security Keys, Authentication Administration, Company Request Token, Invoice Capture Verification. Zero unbuilt Invoice ADMIN destinations.

RE-RUNS: 6-anchor destination census (119 labels, nothing unclassified in the compliance/document domain); two-step nav-pair census (21 destinations under Administration > Invoice/Company — Company yields only Tools > Invoice E-Bunsho Timestamp and Company Admin > User Administration); '(left menu)' census (25 labels); 'On the X page' census (90 names); 'The X page|tool|window <verb>' census (80 names); Invoice Processing Admin shelf (12 children).

COUNTRY-MANDATE / E-INVOICING SYNONYMS, all grep -rliF = 0: KSeF, Chorus, FatturaPA, ZUGFeRD, XRechnung, Factur-X, Nota Fiscal, SAF-T, Making Tax Digital, GSTN, Fapiao, eDocument, clearance, Incoterm, eIDAS, digital signature, legal archiv, Withholding, 1099, message catalog, translation vendor. Non-zero but yielding no surface: e-invoic 8, electronic invoic 17, retention 4 (all Peppol country topics), DRC 2, Message Monitor 1, country pack 2, freight 2.

The roster's negative finding holds and is now independently confirmed: Group 6 has no hidden e-invoicing pages.

**Action:** Record the guide-root enumeration (73 roots) and the release-note name-generator as reusable completeness instruments for the deferred Group 7 build — they are cheaper and more decisive than keyword sweeps, and they are the only two that would have caught Country Code List and the release-note-only surfaces.
