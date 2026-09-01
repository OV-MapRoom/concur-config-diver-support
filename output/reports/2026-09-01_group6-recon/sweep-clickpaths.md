# Group 6 Recon — CLICKPATHS sweep (blind, 1 of 5)
Corpus: CONCUR_INVOICE, 2026_08, Professional Edition. FROZEN — read only.
Dirs swept: admin-guides (1209) + tools-guides (650). Release-note dirs excluded.

## Method
All greps run through a Python loader that NORMALISES U+00A0 -> space before matching,
because ugrep's `grep -P "\xc2\xa0"` silently returns 0 (trap 4). Scripts in this dir:
nav.py (idiom census), dest.py (first-segment dest), chain.py (FULL chains), left.py
((left menu) dests), g6.py (compliance nav sentences), nouns.py (page|tool|window|tab
nouns), ipa.py (Invoice Processing Admin children + menu,choose idiom), nbsp.py
(glyphless nav), step2.py (step-1 -> step-2 destination pairs).

## Trap evidence measured in THIS sweep
- NBSP normalisation moved "Administration > Invoice" from 73 -> 76 files.
- 186 files carry NBSP; 1729 instances total.
- accessing-the-change-log-8b2b0deb.md: `'Select Administration\xa0\xa0Invoice.'`
  TWO NBSPs, ZERO ">" glyph. ugrep -cP "\xc2\xa0" = 0; -cP "\x{00a0}" = 1. Trap 4 live.
- 40 files use the glyphless `Administration<NBSP><NBSP>Invoice` step-1 form.
  A ">"-only sweep misses all 40. This is how Change Log hides.
- step-5 Localization file: "clickingAdministration" is a REAL missing-space typo,
  NOT an NBSP (that file has 0 NBSP). Do not mis-attribute.
- Method validation: my step-2 extractor independently reproduces
  "[Invoice Processing Admin navigation] -> Email Reminders" (the page 4 sweeps missed).

## FULL Administration chain roster (47 distinct) — G6-relevant rows
  1 file  Administration > Invoice > Invoice Processing Admin > Peppol Configuration
  1 file  Administration > Invoice > Shipping Configuration
  1 file  Administration > Invoice > Localization to access this tool
  2 files Administration > Invoice > Localization > Export Localization
  1 file  Administration > Expense & Invoice Settings > Invoice Settings > Invoice Compliance
  (already built: Tax Administration, Company Locations, Units Of Measure, Policies,
   Workflows, Forms and Fields, Group Configurations, PO Config/Matching, Image Handling,
   Capture Processing Admin, Invoice Settings, Delegate Configurations)

## VERDICTS
1. PEPPOL CONFIGURATION — admin-page. Professional path is 4 LEVELS DEEP and nests under
   Invoice Processing Admin, NOT off the Invoice left menu. Tests (a)+(c). 35 files mention
   peppol; 7 call it a page. Registration is EXTERNAL (SAP DRC portal link) — not a page.
   Modify = "Navigate to the Peppol Configuration page / Click Edit" = same page, not a page.
   WARNING for the extractor: standard-edition-d252f36e.md gives a DIFFERENT path
   (Invoice Settings > Connections > Peppol Configuration tile > Edit). That is Standard
   Edition. Do NOT drive Chromium from it.
2. SHIPPING CONFIGURATION — admin-page, ONE page with tabs. Tests (a)+(b)+(c).
   Dual role gate: "Invoice Configuration administrator or ... (Restricted)".
   Tab names are NOT given in the corpus ("clicking a tab as required") — shipping types
   and shipping terms are the two objects. Audit Rules precedent: tabs are not pages.
3. LOCALIZATION — admin-page. Tests (a)+(c). Left-menu destination, 6-step path confirmed.
   "Edit Localization page appears" comes from Modify over a SELECTED language/category row
   => modal-over-existing-object, Workflows-wizard precedent => NOT a page.
   "Export Localization" attested 2 files, both incidental (PET-code lookup inside import
   record-type topics), no topic of its own => function/tab within Localization, NOT a page.
   Localization is THIN: only 8 files mention it corpus-wide.
4. CHANGE LOG — NEW admin-page candidate the 3-page map never counted. Exactly the Email
   Reminders pattern: own access topic, own Invoice Processing Admin menu destination,
   own object model (change-log records), 4-file cluster. Compliance/audit in nature
   ("Use this page to audit changes and identify which administrator performed each action").
   Reached ONLY via the glyphless NBSP form — invisible to a ">" sweep.
   Group assignment (6 vs 7-Ops) is the main agent's call; it is read-only/audit, so it may
   be Ops. But it IS a page and it is NOT in the graph.
5. SAP DOC AND REPORTING COMPLIANCE — separate-tool. Real distinct page, but it lives in the
   APP CENTER, not Administration > Invoice. Connect/OAuth flow (subdomain + Connect), no
   config object roster. Different menu tree with no parent in this graph (the Authorized
   Approval Limits situation) — but it is an app-connection, not an admin config page.
6. INVOICE COMPLIANCE — undetermined, probably NOT a Professional admin page. ONE file
   attests it, zero table rows, no object model, and it sits in the "Administration >
   Expense & Invoice Settings" Product Settings tree whose only other attesting file is
   standard-edition-*. Title is "Accessing Invoice Pay RELATED Settings" => Invoice Pay.
   Flagging rather than asserting.
7. TAX VALIDATION — tab, NOT a page. Called "page" in 3 files, but
   step-3-configure-the-service-14c3ef13.md settles it: step 1 opens Tax Administration,
   step 2 is "Click the Tax Validation tab." Parent page.tax-administration ALREADY BUILT.
   This is the "X page appears" non-discrimination trap firing again.

## NET
Group 6 as clickpaths sees it: the 3 claimed pages hold, PLUS Change Log (new, real),
PLUS SAP DRC as an App Center surface, MINUS nothing. Tax Validation and Invoice
Compliance are decoys. Peppol's real path is deeper than "Administration > Invoice > X".
