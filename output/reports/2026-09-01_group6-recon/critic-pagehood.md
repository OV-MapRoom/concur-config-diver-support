# Group 6 recon — pagehood critic

## Verdict

THE SIX-PAGE SHAPE HOLDS. I attacked all six in both directions and none collapses: no kept page demotes to a tab or a modal, and no deferred candidate is a page nobody counted — except one. My own independent 1859-file census (four NBSP-normalised anchors) returned no admin-config destination the roster had not already named, my prose-form regex ("Administration > Invoice and then click X") returns exactly ONE label in the entire corpus (Printed Invoices), and fresh jurisdiction probes the five sweeps never ran (withholding, SAF-T, eDocument, Fapiao, XRechnung, KSeF, legal archiv, self-billing) all score ZERO. Group 6 is complete at six.

WHERE IT FAILS IS THE BOUNDARY WORK, AND THE ROSTER NEVER LOOKED. It read nodes.configPages for empty navPaths and stopped. It never read navPathAlternates or field sourceFiles on the 25 built pages — so it did not notice that TWO of its six pages collide with nodes that already exist. page.image-handling already carries "Administration > Company > Tools > Invoice E-Bunsho Timestamp" as a nav alternate AND already holds field.image-handling.timestampstatus extracted from timestamp-status-f0082cf2.md — the file the roster calls "THE ONLY TABLE IN THE SET" of its new e-Bunsho page. page.expense-types already carries "Administration > Invoice > Expense Type Import" as an alternate. Both must be stripped or the driver gets two nodes claiming one click path.

AND THE ROSTER APPLIES ITS OWN DECISIVE ARGUMENT INCONSISTENTLY. It keeps Printed Invoices because "Group 6 is the last non-defered group and deferring it means it is never built," then one section later defers Expense Type Import — a page whose tests (a) AND (c) both fire, stronger than Localization and Change Log which it keeps on (a) alone — to "Group 5 or the deferred Group 7." meta.groupsComplete already contains Group 5; groupsRemaining is Group 6 and Group 7 (deferred). Both homes are shut.

Two gate arguments are also overstated: the "Forms-and-Fields gate-split precedent" the roster invokes twice does not exist in the built graph, and the Printed Invoices gate is a product-wide Global/Group role hierarchy spanning at least four built pages, not a page-specific gate. Neither verdict changes — Printed Invoices stands on (a)+(c), which are the strongest in the roster — but the extractor must not split it on gate evidence.

---

## [blocker] page.invoice-e-bunsho-timestamp-validation-request collides with the already-built page.image-handling — same click path, and its only table is already extracted

The roster never read navPathAlternates on the built nodes. page.image-handling's alternates already contain the exact string 'Administration > Company > Tools > Invoice E-Bunsho Timestamp' — the new page's own destination. Worse, its only real table is already bound elsewhere: field.image-handling.timestampstatus (name 'timestampStatus') carries sourceFile concur-invoice-professional-edition-admin-guides/timestamp-status-f0082cf2.md, which the roster itself calls 'THE ONLY TABLE IN THE SET' (7 true rows; I reproduce cellopen=22, sep=1, 2 cols -> (22-1)/3 = 7). Creating the new page as written gives the Chromium driver two nodes advertising one destination, and duplicates the status value set across two pages. Separately, page.policies already holds field.policies.timestamp-configuration and field.image-handling.ebunshotimestampconfigurationlist, both sourced from enable-e-bunsho-timestamp-for-a-policy-group-07ea2db1.md — so the policy-group side is genuinely built, exactly as the roster says, but it did not check the Tools side. The page itself is still real: I read view-validation-status-98f82b1e.md in full and confirm 'Click Administration > Company > Tools.' then 'Click Invoice E-Bunsho Timestamp.' then 'On the Invoice E-Bunsho Timestamp Validation Request page...' with zero NBSP in the file.

**Action:** Build the page, but as part of the same commit strip 'Administration > Company > Tools > Invoice E-Bunsho Timestamp' from page.image-handling.navPathAlternates and re-bind or delete field.image-handling.timestampstatus so the timestamp status value set lives on exactly one node. Decide explicitly whether timestampStatus is an Image Handling display field or this page's result-column value set — do not leave it on both.

---

## [blocker] Expense Type Import is deferred to two groups that are already closed, and it is simultaneously conflated into page.expense-types

The roster proves this page and then strands it. Verified myself: grep -rlF 'Select Expense Type Import (left menu).' returns exactly access-the-invoice-processing-expense-type-import-page-3f5d3994.md, whose full text is 'Choose Administration<NBSP><NBSP>Invoice.' then 'Select Expense Type Import (left menu). The Invoice Processing Expense Type Import page appears.' It is a top-level Invoice left-menu destination with its own access topic and a 14-file cluster (my count via grep -rli 'expense type import'), and it is never once called a tab anywhere in 1859 files. Tests (a) and (c) both fire — strictly stronger than Localization and Change Log, which the roster KEEPS on (a) alone. The roster defers it to 'Group 5 or the deferred Group 7'; meta.groupsComplete already lists 'Group 5 — Data Structure & Accounting' and groupsRemaining is ['Group 6', 'Group 7 (deferred)']. Both homes are shut, which is verbatim the argument the roster used to keep Printed Invoices. And Group 5 did not lose it — it MIS-BOUND it: page.expense-types.navPathAlternates already contains 'Administration > Invoice > Expense Type Import' alongside its real navPath of Invoice Processing Admin > Accounting Administration > Account Codes tab. Two destinations with different object models folded into one node, and zero fields in the graph are sourced from any of the import-spreadsheet topics.

**Action:** Promote it to its own page node in this build (the roster's own keep-criterion demands it), strip the 'Administration > Invoice > Expense Type Import' alternate from page.expense-types, and note the boundary: the import tool creates/updates expense-type objects that page.expense-types configures. If the main agent refuses, that refusal must be an explicit recorded decision to re-open Group 5 — not a deferral.

---

## [high] The Printed Invoices role gate is not distinctive — 'Global Invoice Configuration administrator' is a product-wide Global/Group role hierarchy across at least four built pages

The roster calls this 'a DISTINCT one... the Forms-and-Fields gate-split signal.' I measured grep -rliF 'Global Invoice Configuration administrator' = 6 files (roster said 5) and read every one. Only two are Printed Invoices (access-printed-invoices-c04fdd28.md, and invoice-form-data-content-type-6c4a88d2.md which merely points at the Forms and Fields guide). The other four are already-built pages carrying the identical Global-can-edit-all / Group-can-edit-only-what-it-created pattern: delete-exceptions-aa2889cc.md:23 (page.exceptions), deleting-expense-types-8d2f5b2b.md:25 (page.expense-types), overview-6e3fab65.md:23 and workflows-tool-8b3b4dbe.md:23 (page.workflows). That is a role-scoping model spanning the product, not a gate on this page. Test (b) should be recorded as WEAK/NON-DISTINCTIVE. Page-hood is unaffected: (a) fires ('Click Administration > Invoice and then click Printed Invoices.' + 'The Printed Invoices page appears.', both grep -rlF = 1, file has 0 NBSP and real ASCII '>') and (c) fires hardest in the roster (print formats, print templates, print condition rules, content IDs).

**Action:** Downgrade the Printed Invoices roleGate note from 'distinct' to 'non-distinctive Global/Group scoping, shared with page.exceptions, page.expense-types, page.workflows'. Do NOT let the Print Templates gate sentence be used to split Print Templates into its own page — the three 'click the ... tab' quotes settle it as one page, three tabs.

---

## [high] The 'Forms and Fields = TWO pages' precedent that two gate arguments rest on does not exist in the built graph

Both the brief and the roster cite 'a distinct gate is what made Forms and Fields TWO pages,' and the roster invokes it twice — for Printed Invoices ('the Forms-and-Fields gate-split signal') and for e-Bunsho ('the Forms-and-Fields signal, at maximum strength'). I read nodes.configPages: there are 25 pages and exactly ONE id containing 'form' — page.forms-and-fields, a single node with tabs ['Forms','Form Fields','Fields','Connected Lists','Validations'] and six navPathAlternates including 'Administration > Invoice > Capture Processing Admin > Forms and Fields (tab)'. The second entry point was folded INTO the one node, not split out. So the graph's actual precedent is the opposite of the one being cited: a second entry point with its own context became an ALTERNATE, not a page. Neither verdict changes (Printed Invoices stands on (a)+(c); e-Bunsho on (a) off a parentless tree, the Authorized Approval Limits shape, which I verified is a real precedent — page.authorized-approval-limits has nine navPathAlternates and a 'window appears' nav quote).

**Action:** Strike the Forms-and-Fields gate-split precedent from both briefs and re-state each page's argument on the tests that actually fired. If the main agent believes Forms and Fields SHOULD be two pages, that is a Group 5 correction to raise separately — it cannot be cited as settled precedent while the artifact says otherwise.

---

## [medium] Printed Invoices has at least five child modal surfaces, not two — and the field tables hang off the modals, not off the tabs

The roster names 'Edit Content for print format' and 'Edit Fields for Print Format' and rules them modals (correct — opened over a selected format, the Workflows New/Modify disqualifier). My own 'The X page appears' census across all 1859 files returns three more in this set: 'Edit Print Template' (add-a-template-91efc6b9.md), 'Print Format Content' (2 files), and — the one that matters — the field roster's own home. add-a-print-format-5c28923a.md step 3 reads 'On the Add Print Format or Edit Print Format page (depending on choice), complete all applicable fields.' immediately before the Print Format Name / Description / Print Template table. So the print-format field roster does not belong to the Print Formats tab; it belongs to a modal reached by New or Copy from that tab. Same for Edit Print Template from Print Templates. All five are correctly modals, but an extractor told 'three tabs' will bind eight-plus fields to the wrong container.

**Action:** Record the five child surfaces explicitly as modals of page.printed-invoices with their entry actions (New/Copy -> Add/Edit Print Format; Modify Content -> Edit Content for print format; Modify Fields -> Edit Fields for Print Format; New -> Edit Print Template), and note that the content-type rosters (13/9/9/7 true rows) reach the page THROUGH those modals.

---

## [medium] The group label is pure metadata — the roster's biggest open question is a one-attribute edit, so build all six now

The roster hedges hard on whether Printed Invoices and Change Log belong in Group 6, and the brief asserts 'the group label drives node id prefixes.' It does not. I read the schema: page ids are page.<slug>, field ids are field.<page-slug>.<field-slug>, and group appears only as a free-text 'group' attribute on pages and 'sourceGroup' on fields. Nothing in any id encodes a group. Moving Printed Invoices or Change Log into a future Group 7 later is a single attribute rewrite — no id churn, no re-extraction, no re-verification of quotes. Answering the lens question directly: the grouping matters for the COMPLETE flag and the label only; it does not matter for the build. Which makes the correct call unambiguous rather than a judgment call.

**Action:** Build all six under Group 6 without further deliberation and set groupsComplete. If a Group 7 (Ops) is ever opened, re-label page.printed-invoices, page.change-log and (if promoted) the Expense Type Import node by editing one attribute each. State that in meta so the next agent does not re-litigate it.

---

## [medium] Pre-existing id/pageId mismatch in the built graph — the id prefix is not a reliable page key

field.image-handling.ebunshotimestampconfigurationlist carries pageId 'page.policies'. The id namespace says image-handling, the binding says policies. meta.corrections records 'Group 4 critic: 3 page-binding corrections applied via bin/apply-corrections.py' — so the pageId was repaired and the id string was left behind. This is not a Group 6 defect, but it directly threatens this build: any Group 6 merge or dedupe step that keys fields to pages by id prefix rather than by the pageId attribute will silently mis-bind, and Group 6 is about to add two nodes whose source files overlap already-built pages (timestamp-status, enable-e-bunsho-timestamp-for-a-policy-group).

**Action:** Key every Group 6 merge and boundary check on the pageId attribute, never on the id prefix. Flag the stale id to whoever owns bin/apply-corrections.py — the repair should rewrite both, or the id should be treated as opaque everywhere.

---

## [low] Every gate count in the roster is understated; the conclusions survive and get stronger

Case-insensitive counts across both guide dirs: 'Invoice Configuration Administrator' = 71 files (roster: 28); 'Invoice Configuration administrator (Restricted)' = 11 files (roster: 9); 'Global Invoice Configuration administrator' = 6 files (roster: 5 files / 4 surfaces — actually 6 files / 5 surfaces). The roster evidently counted a case-sensitive exact form. Direction of every conclusion is unchanged and in fact reinforced: the Peppol and Shipping gates are even less distinctive than claimed. The one count I confirm exactly is the load-bearing one: 'Digital Compliance Administrator' = 1 file, 1 surface (e-bunsho-timestamp-092c1c08.md:32) — genuinely the only 1-of-1 gate in the compliance domain. And I confirm Localization's test (b) is EMPTY, not weak: grep -rn -i 'Localization' piped through grep -iE 'administrator|role|permission' across both dirs returns ZERO lines.

**Action:** Re-run gate counts case-insensitively before any of them are written into the graph as evidence. Keep the Digital Compliance Administrator gate as e-Bunsho's distinguishing evidence — it is the one that checks out.

---

## [low] Two naive-count claims are wrong; trap 1 does not fire universally on the Printed Invoices set

I reproduced every cell-opener count in the roster exactly — field-mapping 221, configuring-peppol-integration 19, limitations 16, invoice-list-data 40, change-log 61, printed-invoice-configuration 64, timestamp-status 22, step-5 17 — and the (cellopen - sep)/(cols+1) conversion in every case, including the calibration table (limitations: (16-1)/3 = 5, countable by eye). Two naive numbers are wrong: step-5-change-localize-...-5328a8e1.md is naive=5, not 0, and printed-invoice-configuration-8b35ee51.md is naive=22. So the roster's 'naive=0 on nearly every one... trap 1 fires hard on this page set' overstates it — trap 1 fires on the content-type files, not universally. I also confirm <table>=0 and <tr>=0 across every file I measured in all six page sets, and NBSP=0 everywhere except field-mapping-e3881fa5.md (5) and accessing-the-change-log-8b2b0deb.md (2, verified as b'Select Administration\xc2\xa0\xc2\xa0Invoice.' with no '>' glyph).

**Action:** Correct the two naive counts so nobody concludes trap 1 is absent when it is present elsewhere, and keep the trap-5 revision-history warnings — I confirm change-log-8b2b47a5.md (61 -> 20 rows) is the ONLY table on that page set and is the guide revision history.

---

## [low] Deferrals I re-proved from scratch, and negative probes the sweeps never ran — no seventh page exists

VENDOR HANDLING: reproduces exactly. Single subordinate clause, imaging-configuration-8b314b9a.md:29, and create-or-modify-an-invoice-or-vendor-imaging-configuration-284f3fdf.md gives 'Click Image Handling (left menu). The Image Handling window appears.' then 'Click the Vendor Imaging tab.' page.image-handling.navPathAlternates already contains 'Administration > Invoice > Vendor Handling' twice. Correctly a tab. ATTENDEES: overview-8b281639.md:29 'It is not available to clients who use Concur Invoice only,' and its tool sits at Administration > Company > Tools > Attendee Admin — the same Tools shelf as e-Bunsho, which independently corroborates modelling each Tools tool as its own page rather than a page.company-tools parent. INVOICE COMPLIANCE: I read the whole file; four lines of body, no table, Product Settings tree. SHIPPING CONFIGURATION: I read all 1416 bytes; the tabs are genuinely unnamed ('clicking a tab as required') and the roster is right to record 'Shipping Types / Shipping Terms' as an unverified assumption. CFDi: step-1-enable-by-invoice-group-ebe8724b.md routes to Group Configurations and step-3-optional-configure-the-digital-tax-invoice-validation-69ba75a6.md is an SAP-support/third-party contract, not a UI surface. FRESH PROBES: withholding=0, SAF-T=0, eDocument=0, Fapiao=0, XRechnung=0, KSeF=0, legal archiv=0, self-billing=0; 'Factur' (7) and 'SdI' (2) are substring false positives inside import specs and VAT topics. My chain regex missed Printed Invoices too, independently replicating the roster's stated failure mode, and my prose regex returns it as the corpus's only prose-form nav.

**Action:** Accept all deferrals as proven and stop sweeping. Keep the Shipping Configuration tab labels flagged as an assumption to be settled by the live UI, not by another corpus pass. Also carry forward the roster's out-of-scope flag: page.map-invoice-concept-fields and page.budget-configuration have navPath [] AND zero fields AND coverage 'thin' — they are empty shells, worse than the roster reported.
