// =============================================================================
// Concur Invoice KG — WORKFLOWS group, RUN B build workflow, 2026-09-01.
// Pages: Email Reminders (2 tabs) + Delegate Configurations (2 tabs).
//
// Adapted from workflows/2026-08-31_kg-workflows-run-a.mjs (Run A: Workflows + Feature
// Hierarchies, 20 agents, 0 errors, 121 fields, validator exit 0), with the fixes made during
// the Approval Authority build (2026-09-01) PORTED FORWARD. The PREAMBLE, the hard-won rules,
// the lens charters, the refuter framings, the Repair cap and the schemas are accumulated
// method and were NOT thinned out.
//
// ⚠ READ THIS BEFORE YOU CHANGE ANYTHING — THE PARENT'S OWN KNOB LIST IS WRONG.
// Run A's header says "patchPage - in the return: ... RUN B MUST SET IT". THAT IS A NO-OP.
// assemble-parts.py composes the raw result from the PARTS DIRECTORY; the workflow's return
// value is not an input to it. `patchPage` in the merged result comes from
//   python3 bin/assemble-parts.py <parts> <out> --group "Workflows" --patch-page "Workflows"
// and NOWHERE ELSE. Setting it in the return here would change nothing while looking like it had.
// This is deliberately left ABSENT from the return below, and the flag is documented in
// docs/RESUME-PROMPT.md instead.
//
// ⚠ AND THE CONSEQUENCE OF GETTING THAT WRONG IS TOTAL. `merge-group.py --patch` with a NULL
// patchPage keeps only nodes whose `patch` tag equals None-the-tag — i.e. it DELETES every
// dependency, step, value set, contradiction and range minted by every NON-patch merge, and
// validate-graph.py then prints "ERROR: none" and exits 0 over the wreckage. Measured
// 2026-09-01 on a sandbox copy: 436 deps -> 115, 41 steps -> 12, 114 value sets -> 37.
// merge-group.py now hard-aborts on that combination, but PASS THE FLAG; do not lean on a guard.
//
// WHY THIS RUN IS SEPARATE FROM RUN A, AND WHY IT MUST USE --patch
// The group label `Workflows` ALREADY EXISTS in the graph (Run A). A NON-patch merge under an
// existing label DELETES that group's fields — the repo's sharpest footgun. With --patch the
// merge strips only nodes whose pageId is touched by THIS result plus nodes tagged patch ==
// 'Workflows'; Run A's nodes carry patch: null and survive. Verified against merge-group.py:60-95.
//
// STEP-ID NAMESPACE — A REAL COLLISION RISK, NEW TO THIS RUN.
// assemble-parts.py derives the step prefix 'grpworkflows-' and merge-group.py mints dep ids
// under gtag 'workflowsw' (it suffixes the patch-page initials). The two DISAGREE, which is
// benign for dep ids but means THIS RUN SHARES THE STEP-ID NAMESPACE WITH RUN A. Run A already
// minted grpworkflows-s1 .. grpworkflows-s7. So this run's steps use the sub-prefix
// 'grpworkflows-b1-', 'grpworkflows-b2-', ... which still satisfies the assemble-parts prefix
// check. validate-graph.py's duplicate-node-id invariant (added 2026-09-01) is the backstop.
//
// THE TWO PAGES, AND WHY THEY ARE PAIRED
// Both were found by the Workflows page recon (output/reports/2026-08-31_workflows-recon/) and
// its PAGE-HOOD CRITIC ENDORSED BOTH OUTRIGHT. Neither was on the lost map at all. They are
// paired because they share ZERO source files with each other (verified: 0 overlap), so neither
// can contaminate the other, and both are small, two-tab, prose-shaped pages.
//
// ⚠ THE EASIEST COLLAPSE ERROR IN THIS DOMAIN, FLAGGED LOUDLY BY THE RECON:
// EMAIL REMINDERS (this run's page) and the WORKFLOWS > EMAIL NOTIFICATIONS TAB (built in Run A)
// are TWO DIFFERENT SURFACES that both send email to approvers. NOTIFICATIONS are event-driven
// templates authored inside Workflows and assigned to a workflow object. REMINDERS are
// interval-driven nag emails with their own rule engine, on their own page, assigned by GROUP.
// DO NOT MERGE THEM, and do not re-home a single Run A Email Notifications field.
//
// EXACTLY ONE FILE IS SHARED WITH RUN A: delegate-self-approval-1b627285.md (1,284 B).
// The control it describes — "Allow delegated approvers to approve their own requests" — is
// ALREADY BUILT on Workflows as field.workflows.allow-delegated-approvers-to-approve-own-requests.
// CORRECTION TO THE HANDOFF, verified 2026-09-01: that built field cites
// create-a-new-workflow-554e86aa.md, NOT this file — so delegate-self-approval-1b627285.md is
// an UNMINED CORROBORATION SOURCE, not a duplicate source. RUN B MUST NOT EMIT A FIELD FROM IT.
// It may be cited in notes (it places the setting on the "General step" and names the delegate /
// AP User distinction), and a dependency into the built Workflows field is legitimate.
//
// TOOLCHAIN FIXES PORTED FORWARD FROM THE APPROVAL AUTHORITY BUILD (2026-09-01):
//   * NAV_SCHEMA now declares `tabs` / `tabsSourceQuote` / `tabsSourceFile` and REQUIRES `tabs`.
//     This is link 1 of the three-link tabs chain; it was still broken in Run A, so Run A's seven
//     tabs had to be added afterwards by hand via apply-corrections.py. IT BITES IMMEDIATELY
//     HERE: Email Reminders has TWO documented tabs (Rules, Email Reminders) and Delegate
//     Configurations has TWO (Invoice, Purchase Request). Proven end-to-end on Approval Authority.
//   * VERDICT_SCHEMA now REQUIRES verbatimVariantIndex — the prompt always demanded it and the
//     schema left it optional, so a silent omission read as "not checked" and Repair depends on it.
//   * The NBSP instruction now names the real tooling trap: grep here is ugrep 7.8.4, and
//     `grep -P '\xc2\xa0'` returns a SILENT ZERO even under LC_ALL=C.
//
// TO ADAPT FOR THE NEXT GROUP, change only:
//   PAGES        - id / name / url, plus recon `seeds`
//   GROUP        - the group label, em-dash exactly as it appears in the graph
//   step id prefix - the Synthesize/steps prompt hard-codes the group tag
//   PARTS        - the current session's scratchpad path
//   AND THEN DIFF THE WHOLE FILE AGAINST ITS PARENT AND READ EVERY HUNK THAT DID NOT CHANGE.
//   That is not optional advice. On the Approval Authority build a pre-flight audit found ~23
//   stale passages below the constants, including an ALREADY_BUILT block — injected into all six
//   agent families — telling every agent the page it was building was out of scope. This knob
//   list has now been wrong or incomplete three generations running.
//
// See docs/2026-08-31_HANDOFF-KG-BUILD-v2.md, docs/RESUME-PROMPT.md and docs/SCHEMA.md.
// =============================================================================

export const meta = {
  name: 'kg-workflows-run-b',
  description: 'Concur Invoice KG - Workflows Run B: Email Reminders + Delegate Configurations (merged WITH --patch)',
  phases: [
    { title: 'Map', detail: 'page identity + navPath evidence, and an exhaustive must-read file inventory with a raw <table> census' },
    { title: 'Extract', detail: '2 pages x 3 lenses: procedures / reference tables and long catalogs / tools-guides and cross-cutting' },
    { title: 'Verify', detail: '2 perspective-diverse adversarial refuters per page, three-way disposition' },
    { title: 'Repair', detail: 'at most one record per input; genuine splits reported, never merged' },
    { title: 'Synthesize', detail: 'value sets, dependencies, config steps, and contradictions/ranges built against the final field rosters' },
    { title: 'Critic', detail: 'two adversarial critics: completeness, and correctness/wiring' },
  ],
}

// ---------------------------------------------------------------------------
// constants
// ---------------------------------------------------------------------------
const CORPUS = '/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE'
const REPO = '/mnt/c/Users/manci/PROJECTS/concur-config-diver-support'
const KG = REPO + '/output/kg-invoice-config.json'
const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/7a585e6d-f82b-458a-aa77-3ab10457ee03/scratchpad/wf-b-parts'
const GROUP = 'Workflows'

const PAGES = [
  {
    id: 'email-reminders',
    name: 'Email Reminders',
    url: '',
    seeds: 'TWO-TAB ADMIN PAGE, PROSE-SHAPED, ZERO RAW <table> ANYWHERE IN ITS SET. ~25 files by a broad sweep (the recon counted 17; treat 17 as a FLOOR, my own grep -rli "email reminder" over both guide dirs returns 25). ~37,000 B. Estimated ~25 fields. ### THE CENSUS TRAP IS EXTREME ON THIS PAGE AND IT IS THE FIRST THING TO GET RIGHT. The real field roster, create-email-reminders-604c4a46.md (10,163 B), returns ZERO for grep -c "^| " and FORTY-NINE for grep -cP "^\\\\s*\\\\|". ⚠ BUT 49 IS NOT A ROW COUNT AND YOU MUST NOT TREAT IT AS ONE. SAP writes every table CELL on its own line, so the correct anchor returns roughly 1 + (columns+1) x rows. THE TRUE FIGURE HERE IS FIFTEEN FIELD ROWS: Name, Reminder Type, Reminder Rule, Frequency, Number of Days, Specific days, Display as From, Email Subject, Email Message, Copy to Approver, Copy to Employee, Copy to Email Address, Editable By, Applies to, Active. Report approxRows as TRUE ROWS and keep the raw cell-opener count in notes. An extractor that believes 49 will hunt for 34 fields that do not exist. Same shape on both Delegate rosters (37 -> about 11, and 22 -> about 6). SAP indents tables nested inside numbered steps and that is CORRECT markdown, not crawl damage. Any census anchored on ^| will report this page as having no tables at all and you will lose the entire roster. ALWAYS allow leading whitespace. ### NAV PATH, both quotes grep -F verified: "From the Invoice Processing Admin navigation menu, choose Email Reminders." and "The Email Reminders page appears." (access-email-reminders-96f3ca18.md). Note the middle nav node: Administration > Invoice > Invoice Processing Admin > Email Reminders. The (left menu) census MISSES this page because its access topic uses the other phrasing - that is why 4 of 6 recon sweeps failed to find it. ### ROLE GATE - AND READ THE CORRECTION, BECAUSE AN EARLIER DRAFT OVERSTATED THIS. The gate is real but it is NOT distinct: the \'Invoice Configuration administrator (Restricted)\' role gates NINE surfaces in this corpus (Account Codes, Shipping Configuration, the Capture Processing Admin Other Settings tab and more). Page-hood here rests on the MENU DESTINATION and the OBJECT MODEL, not on the gate - do not argue it from the gate. ⚠ BUT THE GATE CARRIES A ROLE PARTITION THE GRAPH SHOULD RECORD: overview-8b2edfd0.md states \'The Group Configurations tool is not visible if you have the Invoice Configuration administrator (Restricted) role.\' - so the very admin who can reach Email Reminders CANNOT reach Group Configurations. That is a hard constraint on the group-assignment dependency. Note also that \'(Restricted)\' and \'Global and Group Configuration administrator\' both appear in the SAME file, so they are NOT a contradiction - they describe different rights. The gate quotes: "The Email Reminders tool is visible if you have the Invoice Configuration administrator (Restricted) role." (email-reminders-tool-8b2c8a11.md). Also "Group administrators can only create email reminder rules if given \\"create\\" rights." (create-reminder-rules-b0a7fac5.md). ### TWO TABS, both explicitly "of the Email Reminders page": "On the Email Reminders page, select the Rules tab." (create-reminder-rules-b0a7fac5.md) and "On the Email Reminders tab of the Email Reminders page, create a new configuration." (configuration-process-8b2c271f.md). EMIT THEM as tabs / tabsSourceQuote / tabsSourceFile - NAV_SCHEMA now accepts them (it did not in Run A, which is why the Workflows tabs had to be added by hand afterwards). ### ⚠ THREE GUARANTEED NAME COLLISIONS WITHIN THIS ONE PAGE, AND duplicate-field-name IS A HARD VALIDATOR ERROR SCOPED PER PAGE, NOT PER TAB. The Rules tab roster create-reminder-rules-b0a7fac5.md has exactly THREE field rows - Name, Reminder Type, Editable By - and ALL THREE labels also appear on the Email Reminders tab roster create-email-reminders-604c4a46.md (verified: each label is a standalone table cell in both files). They are DIFFERENT CONTROLS. Prefix the rule-side names (rule_name / rule_reminder_type / rule_editable_by), keep the reminder-side bare, and put the tab in notes on both. DO NOT MERGE THEM TO DUCK THE ERROR - their Reminder Type option lists genuinely disagree, and that disagreement is the strongest grounded contradiction in this run: \'Approval Request - Vendor Request\' appears ONLY in create-email-reminders-604c4a46.md while \'Approval Request - Payment Vendor\' appears ONLY in create-reminder-rules-b0a7fac5.md, and the shared option is defined incompatibly (\'When a cash advance request has a status of Pending Approval.\' versus \'When an invoice has a status of Pending Approval.\'). Emit BOTH as value sets with distinct context and ONE contradiction node. Do not reconcile. ### TWO OBJECT TYPES WITH FULL CRUD ON EACH, and an ordering between them: reminder RULES (create/edit/copy/delete) and email REMINDERS (create/edit/copy/delete). A rule must exist before a reminder can use it. That ordering is a dependency and a ConfigStep, not a footnote. ### ⚠ THE EASIEST COLLAPSE ERROR IN THIS DOMAIN - READ TWICE. Email Reminders (THIS page) and the WORKFLOWS > EMAIL NOTIFICATIONS TAB (already built in Run A) are TWO DIFFERENT SURFACES that both email approvers. NOTIFICATIONS are event-driven templates authored inside Workflows and assigned to a workflow object. REMINDERS are interval-driven nag emails with their own rule engine on their own page, assigned by GROUP. DO NOT MERGE THEM. Do not re-home a single Run A Email Notifications field, and do not emit a field here whose documentation places it on that tab. Check every candidate against the built graph before you emit it. ### A KNOWN GAP IN THE GRAPH THAT THIS PAGE SHOULD CLOSE: the Group 3 build left vset.g3.unnamed.email-message-replacement-tokens-... deliberately orphaned with knownGap: true, and its own note says WHAT WOULD FIX IT is "an Email Reminders page node that owns this table properly". The file is email-message-replacement-tokens-c9cc4af4.md (2,796 B). ⚠ ITS CELL-OPENER COUNT IS 21 AND ITS TRUE CONTENT IS FOUR TOKENS - %1%, %2%, %3%, %4%. The existing graph node is literally named ...the-4-row-variable-label-na and already carries exactly those four values, so the correct action is to RE-HOME that 4-value set onto this page, NEVER to hunt for 17 more tokens that do not exist. It belongs HERE. One recon sweep mis-filed it under Email Notifications; that was corrected. If you can give that catalogue a real owner on this page, do - and say so in notes. ### SCHEDULING IS NOT AN ADMIN CONTROL ON THIS PAGE. "Scheduling email reminders is done in the Import/Extract Administrator tool and is performed by SAP Concur staff." and scheduling "requires you to submit a service request to SAP Concur support." (configuration-process-8b2c271f.md). Emit it as a dependency / step rationale pointing at the unbuilt Import/Extract Administrator surface, NEVER as a field. A driver cannot click it. ### LABEL COLLISION TO CARRY, THREE WAYS: "Rules tab" is ALSO a tab of the built Purchase Order Matching Rules page, and it shadows the Workflows Step Rules wizard page. Three different Rules surfaces in this product. Say which one you mean, every time. ### THE 91-ROW CATALOG IS A REVISION HISTORY, NOT A ROSTER. email-reminders-8b2caa99.md (3,921 B) returns 91 CELL-OPENERS on the correct anchor - about 29 dated revision entries, not 91 of anything - and is the guide revision history. Census it, classify it as history, and move on. The real roster is create-email-reminders-604c4a46.md. ### EXTRA SEEDS the recon completeness critic named (finding 6): pre-defined-rules-220a1fe7.md, overview-8b2c769e.md, best-practices-when-localizing-subject-and-email-message-fields-48515f40.md. (terminology-e1e1ed99.md was mis-filed onto this page and has been moved to Delegate Configurations, where it belongs - it contains ZERO occurrences of \'reminder\'.) ### ADJACENT PAGE: group-level reminder assignment touches the built Group Configurations page - emit the cross-page dependency. ⚠ AND CORRECT A CLAIM AN EARLIER DRAFT OF THIS BRIEF MADE: it said \'no built field cites any reminder file\'. THAT IS FALSE ONCE YOU BEAT THE SEED FLOOR. Six files in the broad sweep are ALREADY MINED and you must NOT re-emit their fields: work-with-the-steps-page-fab249d1.md (11 built Workflows fields), add-groups-ec5d8d8b.md (14 built Group Configurations fields), overview-8b2edfd0.md (the Group Configurations overview - it surfaces only because it lists email reminders as one thing a group carries), workflow-667cee21.md, about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md, and email-message-replacement-tokens-c9cc4af4.md (the orphan value set this run is meant to close). Those six are CORROBORATION and DEPENDENCY sources ONLY. grep the graph for a file path before you emit any field from it.',
  },
  {
    id: 'delegate-configurations',
    name: 'Delegate Configurations',
    url: '',
    seeds: 'TWO-TAB ADMIN PAGE WITH A CHILD WINDOW, PROSE-SHAPED, ZERO RAW <table>. 17 files, ~33,000 B, estimated ~25 fields. ZERO source files are shared with Email Reminders (verified), so the two pages in this run cannot contaminate each other. ### THE CENSUS TRAP APPLIES HERE TOO: create-a-new-invoice-delegate-configuration-fcf42662.md returns 0 naive / 22 correct, and access-and-view-payment-delegate-configurations-8ed1298f.md returns 0 naive / 37 correct. Always allow leading whitespace. ### NAV PATH: "Select Delegate Configurations (left menu) , the Delegate Configurations page appears." (access-and-view-payment-delegate-configurations-8ed1298f.md). ⚠ THE STRAY SPACE BEFORE THE COMMA IS VERBATIM IN THE SOURCE - do not tidy it or your grep -F will fail. Second path: "Invoice delegates are accessed from the Invoice Admin link." (same file) - and remember Invoice Admin is a live alias for Administration > Invoice. ### TWO TABS: "On the Delegate Configurations page, select either the Invoice or Purchase Request tab." (create-a-new-invoice-delegate-configuration-fcf42662.md). EMIT THEM as tabs / tabsSourceQuote / tabsSourceFile. ### A CHILD WINDOW, NOT A THIRD TAB: "Choose New. The Add Delegate Configuration - Invoice page appears." (same file). Decide explicitly whether that is a separate page node or a modal on this one, and say why in identityNotes. ⚠ AND DO NOT REST ON THE WORD \'page\': the \'X page appears\' idiom is PROVEN NON-DISCRIMINATING in this corpus - it covers real pages AND the Workflows General / Steps / Step Rules modal wizard that this graph already ruled is NOT a page, while page.authorized-approval-limits IS a page node and its own nav quote says \'window appears\'. Decide on STRUCTURE: does it have its own menu destination, its own role gate, its own object model? ### THE CORPUS CONTRADICTS ITSELF ABOUT THIS CHILD SURFACE AND YOU MUST SEE BOTH SIDES. delegate-experience-8b30fb06.md (1,796 B - A MUST-READ, and it was missing from an earlier draft of these seeds) calls it a WINDOW and gives the full path: \'This window is available by clicking Administration > Invoice > Delegate Configurations > New (or Modify, if existing configuration).\' Meanwhile create-a-new-invoice-delegate-configuration-fcf42662.md calls it a PAGE, edit-an-invoice-delegate-configuration-c7f51424.md says \'The Modify Delegate Configuration page appears.\' and access-and-view-payment-delegate-configurations-8ed1298f.md says \'a link to the Edit Delegate Configuration page\'. FIVE names for ONE surface across FOUR files - that is a grounded label-drift contradiction in its own right, emit it. The corpus calls it a page; the Approval Authority precedent (a modal window reached from a link, recorded as its own page) and the Workflows precedent (General / Steps / Step Rules are a MODAL WIZARD over an object and are NOT pages) both bear on it. Do not create a page node without an argument. ### IT RESOLVES AN ALREADY-WRITTEN GRAPH ENDPOINT: dep.g1.059 targets {page: "Delegate Configurations", field: "Delegate Configuration", resolved: false}, carrying the cardinality quote "Each group within your company can only have one Invoice delegate configuration." It was written by a Group 1 agent with no roster, so it is independent corroboration of the PAGE NAME. ⚠ BUT NOTE ITS FIELD NAME IS LABEL-SHAPED ("Delegate Configuration"), which is exactly the LABEL-vs-NAME trap that leaves an edge dangling forever. It will only auto-resolve if this run happens to emit a field named exactly that. Do NOT contort your naming to force it - report the mismatch in notes for a correction pass instead. ### THE WORKFLOWS BOUNDARY. This page is squarely APPROVAL configuration - it decides who may approve on behalf of whom and for how long - and it cross-references the built Workflows Authorized Approvers tab directly via a field "Restrict approvers to those with equal or higher authorized approver limit". But the corpus NEVER places it under Workflows: not once in 17 delegate-named admin files. It is a SIBLING page. Emit the cross-page dependency; do not re-home. ### ⚠ EXACTLY ONE FILE IS SHARED WITH RUN A AND YOU MUST NOT EMIT A FIELD FROM IT: delegate-self-approval-1b627285.md (1,284 B). The control it describes, "Allow delegated approvers to approve their own requests", is ALREADY BUILT as field.workflows.allow-delegated-approvers-to-approve-own-requests. CORRECTION VERIFIED 2026-09-01: that built field cites create-a-new-workflow-554e86aa.md, NOT this file - so this file is an UNMINED CORROBORATION SOURCE rather than a duplicate source, and the handoff describing it as "its field" was loose. You MAY cite it in notes (it places the setting on the "General step" and distinguishes a delegate acting for an Approver from one acting as an AP User) and you MAY emit a dependency into the built Workflows field. You may NOT emit a field here from it. ### DROP THE "two user interfaces" UI HINT. It is 2014 boilerplate present in 40 corpus files, including most of the already-built pages. It is not a property of this page and it must not become a uiVariant claim. ### THE 91-ROW CATALOG IS A REVISION HISTORY: delegate-configuration-8b2bd26d.md (4,236 B, 91 CELL-OPENERS on the correct anchor - about 29 dated revision entries, not 91 of anything). Census it, classify it as history. The real rosters are create-a-new-invoice-delegate-configuration-fcf42662.md (22 cell-openers = about SIX field rows) and access-and-view-payment-delegate-configurations-8ed1298f.md (37 = about ELEVEN). ⚠ A RECON ESTIMATE OF ~25 FIELDS LOOKS HIGH AGAINST THOSE ROSTERS: an independent check put the UNIQUE control count nearer 11-13, because several controls are documented under two or three different labels across files. Collapse aliases. Do not inflate to hit a number. ### EXTRA SEEDS the recon completeness critic named (finding 6): overview-8b2ba917.md (1,223 B, the permission-subset model that is this page whole semantics) and terminology-e1e1ed99.md (2,026 B - a SIX-ENTRY DELEGATE TERMINOLOGY CATALOGUE and this page richest alias source: Invoice Delegates, Invoice Request Delegates, Purchase Request Delegates, Temporary Approval Delegation, Delegate Restriction to Group, Delegated Approver. Three are field-shaped. ZERO occurrences of \'reminder\' - it belongs to THIS page only). ### ALIASES to record: Delegate Configurations tool, Delegate Configuration, Payment Delegate Configurations, Invoice delegates.',
  },
]

const LENSES = [
  {
    key: 'procedure',
    label: 'procedures and controls',
    model: 'sonnet',
    effort: 'high',
    charter: [
      'LENS A - PROCEDURES AND CONTROLS. You own every control a human touches to complete a documented task on this page.',
      'Read every task/how-to topic for this page: add-*, create-*, edit-*, editing-*, modify-*, modifying-*, delete-*, remove-*, access-*, accessing-*, configure-*, configuring-*, set-*, setting-*, use-*, using-*, work-with-*, working-with-*, step-N-*, and any numbered-procedure topic.',
      'Emit: buttons (New, Modify, Remove, Delete, Save, Done, Next, Previous, Cancel, Search, Import, Export, Add, Assign), tabs, wizard steps, dialog/confirmation controls, list-page columns that are selectable or sortable, checkboxes, radio groups, and every input a procedure tells the admin to complete.',
      'For each, capture the enumerated options if - and ONLY if - the topic enumerates them.',
      'Record ROLE GATES verbatim when a procedure names the role required ("only an administrator with ... rights").',
      'Record ORDERING constraints verbatim ("you must ... before ..."), as dependencyCandidates.',
      'You are NOT excused from a file because you think another lens will read it. Coverage of your charter across BOTH guide directories is yours alone.',
    ].join('\n'),
  },
  {
    key: 'tables',
    label: 'reference tables and long catalogs',
    model: 'opus',
    effort: 'high',
    charter: [
      'LENS B - REFERENCE TABLES AND LONG CATALOGS. This lens exists because the single most expensive defect in this project was a long table skipped for being long.',
      'MANDATORY MECHANICAL SWEEP before you read anything: for every candidate file for this page, run',
      "    grep -c '<table' \"$FILE\"",
      'and read IN FULL every file that returns non-zero. Also run grep for markdown pipe tables (grep -c \"^|\" or \"^ *|\") and for long bullet runs (files where a single list exceeds ~15 items).',
      'You own: settings tables, field-definition tables, terminology tables, enumerated option lists, import/export column-format tables, appendix tables, code lists, and every raw <table> element.',
      'ENUMERATE EVERY ROW. Never sample, truncate, summarise, elide, or write "and so on" / "etc." / "(remaining rows omitted)". A 250-row table means 250 entries. If a table is huge, that is precisely why it matters: it is the option list a config writer cannot function without.',
      'Set fromRawHtmlTable: true ONLY on records whose cited file returns non-zero for grep -c \"<table\". Four of five such flags were false before this rule.',
      'Distinguish an ILLUSTRATIVE table (a before/after example, a screenshot caption, a search-order demonstration) from a SETTINGS table. Illustrative tables are correctly skipped - but say in notes that you skipped one and why.',
      'Compressed ranges ("Custom 01 - 20", "Org Unit 1 - 6", "Custom 1-24"): emit them into compressedRanges with what they expand to, and REPRODUCE THE SOURCE CHARACTER EXACTLY - an en-dash is not a hyphen.',
      'Where two topics enumerate the SAME control differently, emit BOTH as separate valueSetCandidates and record the disagreement in contradictions. Do not reconcile.',
    ].join('\n'),
  },
  {
    key: 'crosscut',
    label: 'tools-guides and cross-cutting',
    model: 'opus',
    effort: 'medium',
    charter: [
      'LENS C - TOOLS-GUIDES AND CROSS-CUTTING. This lens is the standing guard against admin-guides skew. Of 617 fields in the graph so far, only ~60 cite tools-guides. That ratio is a bug, not a fact about the corpus. FOR THIS RUN SPECIFICALLY, AND I HAVE MEASURED IT SO YOU CAN TELL A THIN CORPUS FROM A LAZY SWEEP: grep -rliF over the 650 tools-guides files returns \'email reminder\' in ZERO files and \'delegate\' in FIVE. So admin-guides is unambiguously the FIELD SOURCE for both pages, and an empty field yield from this lens is a CORRECT result - say so plainly rather than padding. Your real job here is CORROBORATION and CROSS-CUTTING: \'Invoice Configuration administrator\' returns 22 tools-guides files (the role-gate vocabulary. MEASURED, AND IT CORRECTS A CLAIM YOU WILL SEE ELSEWHERE IN THIS SCRIPT: the \'(Restricted)\' role is NOT distinct to Email Reminders - it gates NINE surfaces including Account Codes, Shipping Configuration and the Capture Processing Admin Other Settings tab. Page-hood here rests on the MENU DESTINATION and the OBJECT MODEL, not on the gate. AND THE GATE CARRIES A ROLE PARTITION WORTH EMITTING: overview-8b2edfd0.md says \'The Group Configurations tool is not visible if you have the Invoice Configuration administrator (Restricted) role.\' - so the admin who can reach Email Reminders CANNOT reach Group Configurations. That is a real constraint on the group-assignment dependency, not a footnote), \'(left menu)\' returns 10, \'Invoice Processing Admin\' returns 4. Search those, plus \'delegate\', \'proxy\', \'on behalf of\', \'reminder\'. Do NOT search the bare word \'workflow\' - it will drown you in the already-built Workflows page. You also own the scheduling handoff: email-reminder scheduling is performed by SAP Concur staff in the Import/Extract Administrator tool via a service request, so it is a dependency into an unbuilt surface and NEVER a field.',
      'START in concur-invoice-professional-edition-tools-guides/ and exhaust it for this page BEFORE opening admin-guides.',
      'You own: required-roles / permissions topics, overview topics, limitations topics, prerequisites, import and export file formats (record layouts, column definitions, required-vs-optional flags), integration and interaction topics (how this page feeds or is fed by another tool), and any topic in ANOTHER page\'s guide that describes a control on THIS page.',
      'You also own UI-VARIANT DETECTION: search filenames and bodies for "new experience", "new ui", "legacy", "current user interface". Set uiVariant to "new" or "legacy" only on documented evidence; "both" ONLY if you actually read BOTH variants and they match; otherwise leave "undifferentiated". "both" is a positive verification claim - three unearned "both" claims are already outstanding debt on Audit Rules. Do not add a fourth.',
      'Record cardinality and constraint rules verbatim ("Every policy has one assigned request header form", "You assign employee forms to groups, not policies") as dependencyCandidates.',
      'You are NOT excused from a file because you think another lens will read it.',
    ].join('\n'),
  },
]

// ---------------------------------------------------------------------------
// shared preamble
// ---------------------------------------------------------------------------
const PREAMBLE = [
  'You are building part of a KNOWLEDGE GRAPH OF THE SAP CONCUR INVOICE ADMIN CONFIGURATION SURFACE,',
  'derived BLIND FROM DOCUMENTATION. The graph answers: for a desired config change, which pages,',
  'which fields, which valid values, in what order. A future Chromium automation will drive the',
  'admin UI from it.',
  '',
  'CORPUS - read files directly with Bash (cat / sed -n / grep / rg). There is NO MCP server.',
  '  ROOT = ' + CORPUS,
  '  TWO guide directories, and BOTH COUNT EQUALLY:',
  '    concur-invoice-professional-edition-admin-guides/   (1209 files)',
  '    concur-invoice-professional-edition-tools-guides/   (650 files)',
  '  Two release-note directories also exist (concur-invoice-professional-edition-release-notes/,',
  '  concur-invoice-professional-edition-release-note-summaries/). They are NOT a source for fields',
  '  or values. Consult them only to date or corroborate a UI-variant claim; never cite one as a sourceFile.',
  '  Everything is SAP version 2026_08, Professional Edition, crawled 2026-08-29.',
  '',
  'sourceFile FORMAT - exactly "<guide-dir>/<filename>.md", relative to ROOT:',
  '  RIGHT: concur-invoice-professional-edition-tools-guides/access-company-locations-024afbe1.md',
  '  WRONG: CONCUR_INVOICE/... , ./... , an absolute path, or a bare filename.',
  '  (18 existing nodes carry the CONCUR_INVOICE/ prefix by mistake and it broke a drop pass. Do not repeat it.)',
  '',
  '=== THE GOVERNING CONSTRAINT: BLIND BUILD ===',
  'This graph models what the product\'s configuration surface IS, per SAP\'s docs - never how any',
  'tenant has configured it.',
  '  * A value enters the graph ONLY because a documented list enumerates it. NEVER because it is',
  '    plausible, standard, typical, or the obvious other half of a toggle. Two invented "Yes" values',
  '    have already been caught and deleted for exactly that: someone completed a No/Yes pair the',
  '    corpus only describes one side of.',
  '  * Where two topics give DIFFERENT lists for the same control, record BOTH and STATE THE',
  '    CONTRADICTION. Do not reconcile by picking one. Many differences are provisioning-dependent -',
  '    what a screen offers varies with the modules a site has enabled - so there is often no single',
  '    correct list to find.',
  '  * Never validate against, or infer from, a configured system. You have no tenant. You must not',
  '    imagine one.',
  '  * THIN IS A CORRECT ANSWER. Never pad a page the corpus does not document. Reporting "this page',
  '    has no documentary basis in this corpus" is a valuable, publishable finding.',
  '  * No CSS selectors, DOM ids, or XPaths - the crawler resolves elements at runtime.',
  '  * No tenant-specific values, no customer PII, no pricing, no confidential deal data.',
  '',
  '=== GROUNDING - NON-NEGOTIABLE ===',
  'Every sourceQuote must be a VERBATIM SUBSTRING of the cited file. Verify BEFORE you emit:',
  '    grep -F -c "<the exact quote>" "' + CORPUS + '/<sourceFile>"',
  'must return >= 1. A deterministic validator (bin/validate-graph.py, no model involved) re-checks',
  'every quote mechanically after the merge and fails the build on any miss. NO QUOTE, NO NODE.',
  'Keep quotes short enough to survive markdown line-wrapping - prefer one unwrapped line or clause.',
  'Never invent whitespace, never join wrapped lines, never "clean up" a quote.',
  '',
  '=== HARD-WON RULES - every one is a defect this project already paid for ===',
  ' 1. Search BOTH guide directories with equal weight. Vendor Search Admin is documented ONLY in',
  '    tools-guides and a raw-HTML catalog was nearly lost because a search skewed to admin-guides.',
  ' 2. LONG CATALOGS ARE THE MOST VALUABLE ARTEFACT IN THE CORPUS, NOT NOISE. A ~250-name table was',
  '    skipped for being long and cost a dedicated 2.36M-token re-run to recover (it yielded 278',
  '    values). NEVER sample, truncate, or summarise a list.',
  ' 3. Parse raw <table> HTML, not just markdown pipe tables - 186 corpus files use it.',
  ' 4. Three-way disposition, never keep/drop. "repair" means THE CONTROL IS REAL, THE RECORD IS',
  '    DEFECTIVE. A binary gate silently deleted two real fields.',
  ' 5. A missing verdict routes to Repair, never to deletion.',
  ' 6. Refuter calibration: A ROW IN A DOCUMENTED FIELD TABLE IS A FIELD. A terse description, a short',
  '    quote, or an inferred "checkbox" type are NOT grounds to refute. Name the defect or keep it.',
  '    An early refuter killed 11 of 24 rows of a canonical settings table.',
  ' 7. A value set\'s appliesToField must be a field NAME, not a UI label. Extractors get this wrong',
  '    constantly - 17 sets landed unwired in one run.',
  ' 8. Note compressed ranges ("Custom 01 - 20") and what they expand to.',
  ' 9. Thin is a correct answer.',
  '',
  '=== TEXT TRAPS IN THIS CORPUS ===',
  '  "Administration >Invoice" appears without the space. "Polices" is misspelled in places.',
  '  Guide titles are often singular where page names are plural. Topic pairs exist in gerund and',
  '  imperative form (editing-x-... and edit-x-...) that are the SAME content republished, NOT a UI',
  '  variant - check the front-matter loio before claiming a variant. NOT deliverable_id: it is a',
  '  PER-DIRECTORY CONSTANT (41460672 on all 1209 admin-guides files, 41460673 on all 650 tools-guides)',
  '  and carries zero discriminating information. loio is unique per topic. Verified 2026-08-31.',
  '  Menu labels drift: "Invoice Admin" is a live alias for "Administration > Invoice".',
  '  "Invoice Processing Admin" is a MIDDLE NAV NODE - most Invoice admin pages hang off it, not',
  '  directly off Administration. IT IS LIVE AND IT SPLITS THIS RUN: Email Reminders IS reached through',
  '  it ("From the Invoice Processing Admin navigation menu, choose Email Reminders."), while Delegate',
  '  Configurations is reached by the plain "(left menu)" idiom. Two different access idioms in one run.',
  '  Record each page path exactly as its own topic states it; never copy one page idiom onto the other,',
  '  and where a middle segment is simply unmentioned treat it as UNATTESTED rather than absent.',
  '  INDENTED TABLES: SAP indents markdown tables nested inside numbered steps, so a census anchored on',
  '  "^|" UNDER-COUNTS badly. step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md returns 0 for',
  '  grep -c "^| " and 22 for grep -cP "^\\s+\\|". Always allow leading whitespace when you count tables.',
  '  SAP TYPO: configure-purchase-orders-8128725e.md writes "line time fields" for "line item fields".',
].join('\n')

const jstr = (o) => JSON.stringify(o, null, 2)

// ---------------------------------------------------------------------------
// schemas
// ---------------------------------------------------------------------------
const NAV_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['pages', 'narrativeMarkdown', 'wroteTo'],
  properties: {
    pages: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'name', 'documentedBasis', 'coverageGuess', 'uiVariant', 'navPathEvidence', 'aliases', 'roleGates', 'identityNotes', 'tabs'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          documentedBasis: {
            type: 'string',
            enum: ['rich', 'moderate', 'sparse', 'none'],
            description: 'How much of THIS PAGE\'s configuration surface the corpus actually documents.'
          },
          coverageGuess: { type: 'string', enum: ['good', 'partial', 'thin'] },
          uiVariant: { type: 'string', enum: ['new', 'legacy', 'both', 'undifferentiated'] },
          navPathEvidence: {
            type: 'array',
            description: 'Every distinct documented click path to this page. One entry per distinct quote.',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['navPath', 'sourceQuote', 'sourceFile'],
              properties: {
                navPath: { type: 'array', items: { type: 'string' } },
                sourceQuote: { type: 'string' },
                sourceFile: { type: 'string' }
              }
            }
          },
          aliases: { type: 'array', items: { type: 'string' } },
          roleGates: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['role', 'sourceQuote', 'sourceFile'],
              properties: {
                role: { type: 'string' },
                sourceQuote: { type: 'string' },
                sourceFile: { type: 'string' }
              }
            }
          },
          identityNotes: { type: 'string' },
          // LINK 1 OF THE THREE-LINK tabs CHAIN (NAV_SCHEMA -> assemble-parts.py -> merge-group.py).
          // Links 2 and 3 were fixed 2026-08-31 and this one was not, so the map agent has been
          // schema-BLOCKED from emitting tabs ever since and silently returned nothing. Fixed 2026-09-01.
          // Carry this schema into the Workflows Run B script: Email Reminders and Delegate
          // Configurations have two tabs each, so it bites there immediately.
          tabs: {
            type: 'array',
            description: 'Tab labels on this page, in documented order, exactly as the corpus writes them. Emit [] when the corpus describes a single undivided page or modal window - [] is a positive finding, not a skip.',
            items: { type: 'string' }
          },
          tabsSourceQuote: { type: 'string', description: 'Verbatim quote attesting the tab list, grep -F verified. "" when tabs is [].' },
          tabsSourceFile: { type: 'string', description: 'File the tabs quote came from. "" when tabs is [].' }
        }
      }
    },
    narrativeMarkdown: { type: 'string', description: 'Short markdown survey: page identity, boundaries against already-built pages, contradictions, text traps.' },
    wroteTo: { type: 'string' }
  }
}

const INVENTORY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['pages', 'narrativeMarkdown', 'wroteTo'],
  properties: {
    pages: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'mustRead', 'alsoRelevant', 'rawHtmlTableCensus', 'longCatalogs', 'searchLog', 'notes'],
        properties: {
          id: { type: 'string' },
          mustRead: {
            type: 'array',
            description: 'Files that MUST be read in full for this page. Every one will be checked for citation.',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['file', 'why', 'lines', 'rawTableCount'],
              properties: {
                file: { type: 'string' },
                why: { type: 'string' },
                lines: { type: 'integer' },
                rawTableCount: { type: 'integer' }
              }
            }
          },
          alsoRelevant: { type: 'array', items: { type: 'string' } },
          rawHtmlTableCensus: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['file', 'count'],
              properties: { file: { type: 'string' }, count: { type: 'integer' } }
            }
          },
          longCatalogs: {
            type: 'array',
            description: 'Any enumeration of roughly 10+ entries anywhere in this page\'s files.',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['file', 'enumerates', 'approxRows'],
              properties: { file: { type: 'string' }, enumerates: { type: 'string' }, approxRows: { type: 'integer' } }
            }
          },
          searchLog: { type: 'string', description: 'The literal grep/ls commands run, so the search is auditable and reproducible.' },
          notes: { type: 'string' }
        }
      }
    },
    narrativeMarkdown: { type: 'string' },
    wroteTo: { type: 'string' }
  }
}

const EXTRACT_RECEIPT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['pageId', 'lens', 'wroteTo', 'jsonValid', 'filesRead', 'mustReadCited', 'mustReadSkipped', 'fieldNames', 'valueSetCount', 'dependencyCount', 'coverageVerdict', 'headline'],
  properties: {
    pageId: { type: 'string' },
    lens: { type: 'string' },
    wroteTo: { type: 'string' },
    jsonValid: { type: 'boolean', description: 'True only after you actually ran python3 -m json.tool on the file and it passed.' },
    filesRead: { type: 'array', items: { type: 'string' } },
    mustReadCited: { type: 'array', items: { type: 'string' } },
    mustReadSkipped: {
      type: 'array',
      description: 'Must-read files you did NOT cite, each with the reason. Silence here is worse than an honest skip.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['file', 'why'],
        properties: { file: { type: 'string' }, why: { type: 'string' } }
      }
    },
    fieldNames: { type: 'array', items: { type: 'string' } },
    valueSetCount: { type: 'integer' },
    dependencyCount: { type: 'integer' },
    coverageVerdict: { type: 'string', enum: ['good', 'partial', 'thin'] },
    headline: { type: 'string', description: 'The most important thing you found or failed to find. Two or three sentences.' }
  }
}

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['pageId', 'refuter', 'verdicts', 'pageLevelFindings'],
  properties: {
    pageId: { type: 'string' },
    refuter: { type: 'string' },
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        // verbatimVariantIndex is REQUIRED: the prompt says it must be set and Repair depends on it,
        // but the schema left it optional, so a silent omission read as 'not checked'. Fixed 2026-09-01.
        required: ['fieldName', 'disposition', 'reason', 'verbatimVariantIndex'],
        properties: {
          fieldName: { type: 'string', description: 'Exactly as given to you in the candidate list.' },
          disposition: {
            type: 'string',
            enum: ['keep', 'repair', 'drop'],
            description: 'keep = record is sound as written. repair = THE CONTROL IS REAL BUT THE RECORD IS DEFECTIVE. drop = this is not a control on this page at all.'
          },
          reason: { type: 'string' },
          defect: { type: 'string', description: 'On repair: exactly what is wrong and what the corrected value should be.' },
          verbatimVariantIndex: { type: 'integer', description: 'Index of the candidate variant whose sourceQuote you verified verbatim with grep -F. -1 if none is verbatim.' },
          correctPage: { type: 'string', description: 'On a drop for page mis-assignment: the page the corpus actually places this control on.' },
          duplicateOf: { type: 'string', description: 'On a drop for duplication: the candidate name that should survive instead.' }
        }
      }
    },
    pageLevelFindings: { type: 'string' }
  }
}

const REPAIR_RECEIPT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['pageId', 'wroteTo', 'jsonValid', 'inputCount', 'finalFieldNames', 'droppedCount', 'repairedCount', 'splitsProposed', 'coverage', 'uiVariant', 'notes'],
  properties: {
    pageId: { type: 'string' },
    wroteTo: { type: 'string' },
    jsonValid: { type: 'boolean' },
    inputCount: { type: 'integer' },
    finalFieldNames: { type: 'array', items: { type: 'string' } },
    droppedCount: { type: 'integer' },
    repairedCount: { type: 'integer' },
    splitsProposed: {
      type: 'array',
      description: 'Inputs the docs show are genuinely several controls. REPORTED ONLY - never emitted into the roster.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['fromField', 'intoFields', 'why', 'sourceFile'],
        properties: {
          fromField: { type: 'string' },
          intoFields: { type: 'array', items: { type: 'string' } },
          why: { type: 'string' },
          sourceFile: { type: 'string' }
        }
      }
    },
    coverage: { type: 'string', enum: ['good', 'partial', 'thin'] },
    uiVariant: { type: 'string', enum: ['new', 'legacy', 'both', 'undifferentiated'] },
    notes: { type: 'string' }
  }
}

const SYNTH_RECEIPT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['kind', 'wroteTo', 'jsonValid', 'count', 'unresolvedCount', 'headline'],
  properties: {
    kind: { type: 'string' },
    wroteTo: { type: 'string' },
    jsonValid: { type: 'boolean' },
    count: { type: 'integer' },
    unresolvedCount: { type: 'integer' },
    headline: { type: 'string' }
  }
}

const CRITIC_RECEIPT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['lens', 'wroteTo', 'findingCount', 'severeFindings', 'verdict'],
  properties: {
    lens: { type: 'string' },
    wroteTo: { type: 'string' },
    findingCount: { type: 'integer' },
    severeFindings: {
      type: 'array',
      description: 'The findings that would change the graph if acted on. Most severe first.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'detail'],
        properties: { title: { type: 'string' }, detail: { type: 'string' } }
      }
    },
    verdict: { type: 'string' }
  }
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
const nrm = (s) => String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]/g, '')

function buildCandidates(receipts) {
  const byKey = new Map()
  for (const r of receipts) {
    if (!r) continue
    for (const nm of (r.fieldNames || [])) {
      const k = nrm(nm)
      if (!k) continue
      if (!byKey.has(k)) byKey.set(k, { name: nm, spellings: [], lenses: [] })
      const c = byKey.get(k)
      if (!c.spellings.includes(nm)) c.spellings.push(nm)
      if (!c.lenses.includes(r.lens)) c.lenses.push(r.lens)
    }
  }
  return Array.from(byKey.values())
}

function combineVerdicts(candidates, verdictSets) {
  const live = verdictSets.filter(Boolean)
  const byKey = new Map()
  const strays = []
  const known = new Set(candidates.map((c) => nrm(c.name)))
  for (const vs of live) {
    for (const v of (vs.verdicts || [])) {
      const k = nrm(v.fieldName)
      if (!known.has(k)) { strays.push(vs.refuter + ':' + v.fieldName); continue }
      if (!byKey.has(k)) byKey.set(k, [])
      byKey.get(k).push(Object.assign({ refuter: vs.refuter }, v))
    }
  }
  const keep = [], repair = [], drop = []
  for (const c of candidates) {
    const vs = byKey.get(nrm(c.name)) || []
    const ds = vs.map((v) => v.disposition)
    let d
    if (vs.length === 0) d = 'repair'                    // RULE 5: no verdict routes to Repair, never to deletion
    else if (vs.length < live.length) d = 'repair'       // RULE 5: a partial verdict set is a missing verdict
    else if (ds.indexOf('repair') !== -1) d = 'repair'   // RULE 4: any "keep, but..." is a repair
    else if (ds.every((x) => x === 'drop')) d = 'drop'   // unanimous drop only
    else if (ds.indexOf('drop') !== -1) d = 'repair'     // refuters disagree -> defect, not deletion
    else d = 'keep'
    const entry = Object.assign({}, c, { verdicts: vs, disposition: d })
    if (d === 'keep') keep.push(entry)
    else if (d === 'repair') repair.push(entry)
    else drop.push(entry)
  }
  return { keep, repair, drop, strays }
}

const pageBrief = PAGES.map((p) => '- id "' + p.id + '" | name "' + p.name + '" | url ' + p.url + '\n  ' + p.seeds).join('\n\n')

const ALREADY_BUILT = [
  'Pages ALREADY IN THE GRAPH (do not rebuild, do not duplicate, and never re-home their fields):',
  '  Group 1: Policies, Group Configurations, Invoice Settings',
  '  Group 2: Audit Rules, Routing Configuration, Exceptions',
  '  Group 3: Purchase Order Matching Rules, Purchase Order Configuration',
  '  Group 4: Capture Processing Admin, Vendor Search Admin, Image Handling, Units Of Measure',
  '  Group 5: Expense Types, Forms and Fields, Accounting Administration, Map Invoice Concept Fields,',
  '            Tax Administration, Budget Configuration, List Management, Company Locations',
  '  Workflows group: WORKFLOWS (ONE page, seven tabs, 114 fields) and Feature Hierarchies (7 fields).',
  '  Approval Authority: Authorized Approval Limits (10 fields, built 2026-09-01).',
  '',
  '=== THE TWO PAGES THIS RUN BUILDS ARE Email Reminders AND Delegate Configurations. ===',
  'They are NOT in the list above. They are new page nodes and this run creates them. An earlier',
  'version of this constant said "do NOT build them here" - that was correct for Run A and is WRONG',
  'for this run. Build them.',
  '',
  '=== WORKFLOWS IS THE PAGE YOU MUST NOT CONTAMINATE, AND THE RISK IS SPECIFIC. ===',
  'Its EMAIL NOTIFICATIONS tab is already built and it is a DIFFERENT SURFACE from the Email',
  'Reminders page you are building. Notifications = event-driven templates authored inside Workflows',
  'and assigned to a workflow object. Reminders = interval-driven nag emails with their own rule',
  'engine, on their own page, assigned by GROUP. The recon called this the easiest collapse error in',
  'the domain. Do not merge them, do not re-home a Run A field, and check every candidate against the',
  'built graph before you emit it.',
  'Workflows also already owns field.workflows.allow-delegated-approvers-to-approve-own-requests',
  '("Allow delegated approvers to approve their own requests", from create-a-new-workflow-554e86aa.md).',
  'admin-guides/delegate-self-approval-1b627285.md describes that SAME control. Cite it in notes or as',
  'a dependency if useful, but DO NOT emit a field from it on Delegate Configurations.',
  '',
  'NOT yet built (a dependency may legitimately point at one of these and stay unresolved):',
  '  Peppol Configuration, Shipping Configuration, Localization (Group 6);',
  '  the Import/Extract Administrator tool (email-reminder SCHEDULING lives there and is performed by',
  '  SAP Concur staff via a service request - it is not an admin control anywhere);',
  '  the Employee Import and the general User Administration user-profile surface, both of which defer',
  '  to external Shared guides absent from this corpus - a DOCUMENTARY gap, not a menu-location one.',
  '',
  'SCOPE NOTE, CORRECTED 2026-09-01: an earlier version of this constant said surfaces under',
  'Administration > COMPANY were out of scope for the whole graph and that the Authorized Approval',
  'Limits window was "NOT a page for you to build". THAT DECISION WAS REVERSED and the page IS built.',
  'Menu location is not product scope. Do not reintroduce that framing in any note you write.',
  '',
  'THE "13 WORKFLOW PAGES" FIGURE IS RETIRED. A six-sweep recon (2026-08-31, run wf_f4d39441-6cb)',
  're-derived the roster and its PAGE-HOOD CRITIC ENDORSED IT OUTRIGHT. The workflow area is FOUR',
  'pages: Workflows (ONE page, SEVEN TABS), Feature Hierarchies, plus the two THIS RUN builds. The 13',
  'the old map counted reconcile as 7 tabs + 3 wizard pages (General / Steps / Step Rules) + 3 settings',
  'tables (Invoice / Purchase Request / Purchase Order Settings). Every one is corpus-attested; NOT ONE',
  'IS A PAGE. Do NOT create a page node for any of them.',
  'All 41 deferred surfaces are listed with reasons in',
  'output/reports/2026-08-31_workflows-recon/roster.md, and every end-user rejection there names where',
  'its configuration lives - use that when you need to know where a runtime behaviour is configured.',
  'The full graph is on disk at ' + KG + ' - read it with python3 when you need exact page or field names.',
  'It holds 23 pages / 617 fields and is ERROR-clean at 617/617 verbatim quotes. This run adds TWO new',
  'pages and must not rebuild or re-home anything already in it.',
].join('\n')

// ---------------------------------------------------------------------------
// PHASE 1 - MAP
// ---------------------------------------------------------------------------
phase('Map')
log('Workflows Run B - mapping 2 pages: Email Reminders (2 tabs), Delegate Configurations (2 tabs)')

const [nav, inventory] = await parallel([
  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: MAP / PAGE IDENTITY AND NAVIGATION ===',
    'Establish, for each of the two pages below, (a) that it exists as an admin page, (b) how',
    'it is reached by CLICKING, with a verbatim quote for every distinct path, (c) what it is called in',
    'the corpus under every alias, (d) which role gates it, and (e) how much of it the corpus documents.',
    '',
    'navPath is LOAD-BEARING, not the URL: a direct goto on an admin URL bounces via dcredirect, so',
    'pages are reached by clicking. The corpus publishes NO .asp URLs at all - zero hits corpus-wide for',
    'PolicyAdmin, auditRules, accountingAdmin, dcredirect. THIS RUN PUBLISHES NO URL FOR EITHER PAGE -',
    'the url field is deliberately empty on both. Do not hunt for one and do not invent one. navPath IS',
    'the identifier, which is why navPathEvidence carries more weight here than anywhere else.',
    '',
    'Emit EVERY distinct documented click path you find as a separate navPathEvidence entry, each with',
    'its own verbatim quote and file. Downstream tooling picks the longest, most-attested path and keeps',
    'the rest as alternates, so more distinct evidence is strictly better. Watch the text traps:',
    '"Administration >Invoice" without the space, and "Invoice Processing Admin" as a middle nav node.',
    '',
    'PAGE IDENTITY IS A REAL QUESTION, NOT A FORMALITY. "Forms and Fields" turned out to be TWO',
    'structurally distinct pages under one label (an Invoice Processing Admin tool, and a tab inside',
    'Capture Processing Admin with a stricter role gate) and they must never be collapsed. Ask the same',
    'question of both pages here. A dedicated recon already endorsed the page-hood of both',
    '(output/reports/2026-08-31_workflows-recon/) after reproducing every mechanical claim, so your job',
    'is to CONFIRM OR REFUTE against the corpus, not to re-open the roster. What it settled:',
    '  (a) EMAIL REMINDERS IS ITS OWN PAGE, not a tab of Workflows. Both halves of the tiebreaker fire:',
    '      its own menu destination in the same syntactic slot as six already-built pages ("From the',
    '      Invoice Processing Admin navigation menu, choose Email Reminders." / "The Email Reminders page',
    '      appears."), and its OWN DISTINCT ROLE GATE - "Invoice Configuration administrator (Restricted)"',
    '      - which is exactly the discriminator that made Forms and Fields two pages. Confirm the gate.',
    '  (b) DELEGATE CONFIGURATIONS IS A SIBLING PAGE, never under Workflows: not once in 17',
    '      delegate-named admin files. It is reached by "(left menu)", the standard idiom.',
    '  (c) EACH HAS TWO TABS. Email Reminders: Rules and Email Reminders (both attested as "of the Email',
    '      Reminders page"). Delegate Configurations: Invoice and Purchase Request. EMIT THEM as tabs,',
    '      tabsSourceQuote, tabsSourceFile - NAV_SCHEMA accepts them now and did NOT in Run A, which is',
    '      why the Workflows tabs had to be repaired by hand afterwards. This is the first run where the',
    '      whole tabs chain is live from the schema through to the merge.',
    '  (d) DO NOT create a page node for any Workflows tab or wizard page. The workflow area is FOUR',
    '      pages total and two of them are already built.',
    'THE ONE IDENTITY QUESTION THE RECON DID NOT SETTLE, AND IT IS YOURS: Delegate Configurations opens',
    'a CHILD WINDOW - "Choose New. The Add Delegate Configuration - Invoice page appears." The corpus',
    'calls it a page. Decide explicitly whether that is a separate page node or a modal on this one, and',
    'argue it. Two precedents pull opposite ways: the Workflows General / Steps / Step Rules wizard is a',
    'MODAL OVER AN OBJECT and is NOT a page, while Authorized Approval Limits IS a page node despite',
    'being a modal window reached from a link. Do not create a node without an argument, and do not',
    'silently flatten it either - say which and why in identityNotes.',
    'RECORD RATHER THAN RECONCILE where the corpus drifts: "Rules tab" names THREE different surfaces in',
    'this product (Email Reminders > Rules, the built Purchase Order Matching Rules > Rules, and the',
    'Workflows Step Rules wizard page). Delegate Configurations carries four aliases (Delegate',
    'Configurations tool, Delegate Configuration, Payment Delegate Configurations, Invoice delegates).',
    'And "Invoice Admin" is a live alias for "Administration > Invoice", used by the delegate access',
    'topic. Note also that Email Reminders is reached THROUGH the Invoice Processing Admin middle nav',
    'node while Delegate Configurations is reached by "(left menu)" directly - two different idioms in',
    'one run, and a driver needs both recorded exactly.',
    'VERBATIM TRAP, MEASURED: the delegate access quote contains a STRAY SPACE BEFORE THE COMMA -',
    '"Select Delegate Configurations (left menu) , the Delegate Configurations page appears." Do not',
    'tidy it. Extract quote bytes with sed/awk from the file itself and grep -F them before emitting.',
    'NBSP HAZARD: ~40% of nav sentences in this corpus have NO ">" glyph at all - the separators are',
    'U+00A0. Measured: after "Administration", 96 ASCII ">" vs 65 NBSP-only. Never grep -F across a menu',
    'arrow; run BOTH separator forms or declare the census incomplete.',
    'TOOLING TRAP, MEASURED 2026-09-01: grep on this machine is ugrep 7.8.4, NOT GNU grep. `grep -P',
    '"\\xc2\\xa0"` SILENTLY RETURNS 0 even under LC_ALL=C - across a corpus that genuinely holds 1,729 NBSPs',
    'in 117+ files. The forms that actually work are `grep -P "\\x{00a0}"` or a bash literal',
    '`grep $\'\\u00a0\'`; for a definitive count use python3 counting b"\\xc2\\xa0". NEVER conclude "no NBSP"',
    'from a \\xc2\\xa0 grep - that is a silent zero, the worst kind of wrong answer.',
    'NBSP MEASURED FOR THIS RUN, AND IT SPLITS THE TWO PAGES - so do NOT carry a habit across them.',
    'DELEGATE CONFIGURATIONS IS CLEAN: access-and-view-payment-delegate-configurations-8ed1298f.md and',
    'its siblings return 0, and that page writes a plain ASCII "Administration > Invoice".',
    'EMAIL REMINDERS IS NOT CLEAN, and the NBSPs sit in the two sentences you most need:',
    '  access-email-reminders-96f3ca18.md (2 NBSP) - nav step 1 reads "Select Administration<NBSP><NBSP>',
    '  Invoice." with NO ">" GLYPH AT ALL;',
    '  email-reminders-tool-8b2c8a11.md (2 NBSP) - the ROLE-GATE sentence, "located in',
    '  Administration<NBSP><NBSP>Invoice, allows a Global and Group Configuration administrator to...";',
    '  create-email-reminders-604c4a46.md (14) and create-reminder-rules-b0a7fac5.md (14) - inside the',
    '  "Editable By" descriptions.',
    '⚠ AND THE VALIDATOR WILL NOT SAVE YOU HERE: bin/validate-graph.py NORMALISES NBSP to a space before',
    'comparing, so a quote you retyped with an ASCII space still passes and lands permanently wrong in the',
    'graph - a nav path a Chromium driver can never match. Every prior NBSP cost was paid loudly at grep',
    'time; this one would be paid silently after the merge. EXTRACT THESE QUOTE BYTES WITH sed/awk/python',
    'FROM THE FILE ITSELF. Never retype a menu string, and never assume there is an arrow in it.',
    '',
    'documentedBasis is a judgement you must make honestly:',
    '  "rich"     - the corpus documents this page at field level across multiple topics',
    '  "moderate" - some field-level documentation, gaps obvious',
    '  "sparse"   - the page is named and reachable but almost nothing about its controls is documented',
    '  "none"     - NO documentary basis at all. Last run a page node was created with zero fields for a',
    '               label that returns ZERO corpus hits; the critic said it should never have existed.',
    '               If that is the answer here, say so plainly and say what the corpus does instead.',
    '',
    ALREADY_BUILT,
    '',
    '=== PAGES ===',
    pageBrief,
    '',
    '=== OUTPUT ===',
    'Write a markdown navigation-and-taxonomy survey to ' + PARTS + '/map-navigation.md',
    '(page identity, boundaries against already-built pages, aliases, role gates, contradictions,',
    'text traps, and your documentedBasis reasoning for each page).',
    'Then return the structured object. Set wroteTo to that path. Put the same survey in narrativeMarkdown.',
    'Every sourceQuote must pass grep -F against its file before you emit it.',
  ].join('\n'), { label: 'map:navigation', phase: 'Map', model: 'opus', effort: 'high', schema: NAV_SCHEMA }),

  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: MAP / EXHAUSTIVE FILE INVENTORY AND TABLE CENSUS ===',
    'You decide what the extraction agents read. Every file you miss here is a hole in the graph that',
    'nothing downstream can fill. The last critic\'s single largest finding class was FILES NEVER READ -',
    'a 34-row attendee catalog, a copy-down source catalog duplicated across two files, a 22-row',
    'feature-by-scope matrix, and a tools-guides OCR table that contradicts its admin-guides twin. All',
    'were in the corpus. All were missed. Your inventory is the fix.',
    '',
    'FOR EACH of the two pages, do all of this and show the commands in searchLog:',
    ' 1. Filename sweep in BOTH guide directories: ls the dirs and grep the filenames for every term and',
    '    synonym for the page (and its aliases, and the objects it manages).',
    ' 2. Content sweep in BOTH guide directories: grep -rl for the page name, its aliases, and the',
    '    distinctive nouns of its domain. Case-insensitive. Then grep -rl for the navigation phrasing.',
    ' 3. RAW TABLE CENSUS: for every candidate file, run grep -c "<table" and record the count. Corpus-wide',
    '    there are 31 such files in admin-guides and 1 in tools-guides; a page-relevant one is a near-',
    '    certain long catalog. Report the census even for files you rank low.',
    ' 4. LONG CATALOG CENSUS: find every enumeration of roughly 10+ entries in the candidate files -',
    '    markdown pipe tables, raw <table>, and long bullet runs. Record the file, what it enumerates,',
    '    and the approximate row count. Use wc -l and grep -c to count rather than eyeballing.',
    ' 5. Rank into mustRead (will be checked for citation downstream) and alsoRelevant.',
    '',
    'Search terms are your job, but at minimum cover, in BOTH guide directories:',
    '  for EMAIL REMINDERS - email reminder, reminder rule, reminder, nag, escalation, interval,',
    '  frequency, schedule, scheduling, days, aging, overdue, unsubmitted, pending approval, recipient,',
    '  email subject, email message, replacement token, variable, localize, localization, group, rule,',
    '  default rule, pre-defined rule, copy, Import/Extract Administrator;',
    '  for DELEGATE CONFIGURATIONS - delegate, delegation, delegate configuration, invoice delegate,',
    '  payment delegate, proxy, acting as, on behalf of, temporary, start date, end date, expiration,',
    '  permission, can approve, can submit, can view receipts, preview, notification, purchase request',
    '  delegate, authorized approver limit.',
    'THE SEED LISTS IN THE PAGE BRIEFS ARE FLOORS, NOT CEILINGS. The recon counted 17 files for Email',
    'Reminders; a broad grep -rli "email reminder" over both guide dirs returns 25. Beat the floor and',
    'say what you added.',
    'MEASURED SHAPE OF BOTH PAGES: ZERO raw <table> and ZERO <tr> anywhere in either set. Every field',
    'lives in procedure prose. An empty rawHtmlTableCensus is the CORRECT output - run the census anyway',
    'and report the zeros.',
    '⚠ THE INDENTED-TABLE TRAP IS EXTREME ON THIS RUN AND IT WILL COST YOU THE ENTIRE ROSTER IF YOU MISS',
    'IT. All three real roster files return ZERO on the naive anchor and a large number on the correct',
    'one: create-email-reminders-604c4a46.md 0 naive / 49 correct;',
    'access-and-view-payment-delegate-configurations-8ed1298f.md 0 / 37;',
    'create-a-new-invoice-delegate-configuration-fcf42662.md 0 / 22. Use grep -cP "^\\s*\\|", never',
    'grep -c "^| ". A census anchored on ^| reports both pages as having no tables at all.',
    'REVISION-HISTORY TRAP, MEASURED FOR THIS RUN: the LARGEST table in each page set is the guide',
    'revision history, not a roster - email-reminders-8b2caa99.md (91 rows) and',
    'delegate-configuration-8b2bd26d.md (91 rows). Census them, classify them as HISTORY, and do not',
    'mistake either for a missed catalogue. The real rosters are the three files named above.',
    'ONE CATALOGUE IS A GENUINE PRIZE: email-message-replacement-tokens-c9cc4af4.md (21 rows on the',
    'correct anchor, 6 on the naive one). The graph is ALREADY ASKING FOR IT - a Group 3 value set sits',
    'orphaned with knownGap:true and a note saying what would fix it is "an Email Reminders page node',
    'that owns this table properly". Enumerate it in full.',
    '',
    'BOUNDARY DUTY OF THIS INVENTORY, AND IT IS THE MOST VALUABLE THING YOU DO HERE. Several strong hits',
    'for the terms above are files the built WORKFLOWS or GROUP CONFIGURATIONS pages ALREADY CONSUMED.',
    'For Email Reminders: add-an-email-notification-c237a2de.md, modify-an-email-notification-a6e5f4ba.md',
    'and select-an-email-notification-in-the-workflows-tab-663bb8ac.md are the Workflows Email',
    'NOTIFICATIONS tab - a DIFFERENT surface; work-with-the-steps-page-fab249d1.md (11 built fields),',
    'add-groups-ec5d8d8b.md (14 built fields), overview-8b2edfd0.md, workflow-667cee21.md and',
    'about-vendor-approval-workflow-step-and-timeout-b3d1bd2c.md are all already mined.',
    'For Delegate Configurations: delegate-self-approval-1b627285.md (its control is already built on',
    'Workflows) and delegates-email-notification-7c866769.md (END-USER routing behaviour, not an admin',
    'control on any page).',
    'Check every candidate against the graph at ' + KG + ' with python3. List each already-mined file in',
    'alsoRelevant with an explicit ALREADY-MINED-BY flag naming the page, NEVER in mustRead.',
    'A file may legitimately appear under more than one page. Say so rather than assigning it arbitrarily.',
    'If a page genuinely has no configuration documentation, an EMPTY mustRead with a clear explanation is',
    'the correct output. Do not manufacture a reading list to look thorough.',
    '',
    ALREADY_BUILT,
    '',
    '=== PAGES ===',
    pageBrief,
    '',
    '=== OUTPUT ===',
    'Write a markdown inventory report to ' + PARTS + '/map-inventory.md (per page: the must-read list with',
    'reasons, the raw-table census, the long-catalog census, the literal commands you ran, and what you',
    'ruled out and why). Then return the structured object with wroteTo set to that path.',
  ].join('\n'), { label: 'map:inventory', phase: 'Map', model: 'opus', effort: 'high', schema: INVENTORY_SCHEMA }),
])

if (!nav || !inventory) throw new Error('Map phase failed: nav=' + !!nav + ' inventory=' + !!inventory)

const navById = new Map((nav.pages || []).map((p) => [p.id, p]))
const invById = new Map((inventory.pages || []).map((p) => [p.id, p]))
for (const p of PAGES) {
  const n = navById.get(p.id), i = invById.get(p.id)
  log(p.name + ': basis=' + (n ? n.documentedBasis : '?') + ', mustRead=' + (i ? (i.mustRead || []).length : '?') + ' files, rawTables=' + (i ? (i.rawHtmlTableCensus || []).filter((x) => x.count > 0).length : '?'))
}

// ---------------------------------------------------------------------------
// per-page context
// ---------------------------------------------------------------------------
function pageContext(p) {
  const n = navById.get(p.id) || {}
  const i = invById.get(p.id) || {}
  return [
    '=== PAGE: ' + p.name + '  (id "' + p.id + '", url ' + p.url + ') ===',
    p.seeds,
    '',
    '--- MAP PHASE: navigation and identity for this page ---',
    jstr({
      documentedBasis: n.documentedBasis,
      coverageGuess: n.coverageGuess,
      uiVariant: n.uiVariant,
      aliases: n.aliases,
      roleGates: n.roleGates,
      identityNotes: n.identityNotes,
      navPathEvidence: n.navPathEvidence,
    }),
    '',
    '--- MAP PHASE: file inventory for this page ---',
    'MUST-READ (each of these is checked downstream for citation; if you skip one, you must say why):',
    jstr(i.mustRead || []),
    'ALSO RELEVANT:',
    jstr(i.alsoRelevant || []),
    'RAW <table> CENSUS (grep -c "<table"):',
    jstr(i.rawHtmlTableCensus || []),
    'LONG CATALOGS (10+ entries):',
    jstr(i.longCatalogs || []),
    'INVENTORY NOTES: ' + (i.notes || ''),
    '',
    'The inventory is a FLOOR, not a ceiling. If your own searching turns up a file it missed, read it',
    'and say so. If a must-read file turns out to be irrelevant to your lens, record it in',
    'mustReadSkipped with the reason - an honest skip is fine, silence is not.',
  ].join('\n')
}

const FILE_SHAPE = [
  'FILE SHAPE - write exactly this JSON structure:',
  '{',
  '  "pageId": "<the page id>",',
  '  "pageName": "<the page name>",',
  '  "lens": "<your lens key>",',
  '  "filesRead": ["concur-invoice-professional-edition-admin-guides/x.md", ...],',
  '  "fields": [',
  '    {',
  '      "name": "<stable machine identifier derived from the on-screen label>",',
  '      "label": "<the exact on-screen label, as the corpus writes it>",',
  '      "fieldType": "text|dropdown|checkbox|radio|button|multiselect|number|table|unknown",',
  '      "validValues": ["<only values the corpus explicitly enumerates; [] is normal and correct>"],',
  '      "sourceQuote": "<VERBATIM substring of sourceFile, grep -F verified>",',
  '      "sourceFile": "<guide-dir>/<file>.md",',
  '      "notes": "<constraints, defaults, role gates, caveats, contradictions, what is undetermined>",',
  '      "fromRawHtmlTable": false,',
  '      "uiVariant": "new|legacy|both|undifferentiated"',
  '    }',
  '  ],',
  '  "valueSetCandidates": [',
  '    {',
  '      "appliesToField": "<the FIELD NAME from fields[] above, never a UI label>",',
  '      "contextField": "<name of the field whose value selects this list, or \\"\\" if unconditional>",',
  '      "context": "<what selects this list, or why it is a value set rather than flat validValues>",',
  '      "values": ["<every entry, complete, verbatim, in source order>"],',
  '      "sourceQuote": "<verbatim>", "sourceFile": "<path>", "notes": "<...>"',
  '    }',
  '  ],',
  '  "dependencyCandidates": [',
  '    {',
  '      "type": "depends_on|precedes|triggers",',
  '      "sourceField": "<field name>", "sourcePage": "<page name>",',
  '      "targetField": "<field name>", "targetPage": "<page name>",',
  '      "condition": "<what the relationship actually is>",',
  '      "sourceQuote": "<verbatim>", "sourceFile": "<path>"',
  '    }',
  '  ],',
  '  "contradictions": [',
  '    {',
  '      "kind": "label-drift|option-list|scope|structure|cardinality|requirement",',
  '      "topic": "<what the corpus disagrees about, in one line>",',
  '      "appliesTo": {"page": "...", "field": "<a field NAME>"},   // or {} - see below',
  '      "readings": [',
  '        {"summary": "<what THIS document says>",',
  '         "sourceQuote": "<VERBATIM substring of THIS reading\'s own file, grep -F verified>",',
  '         "sourceFile": "<guide-dir>/<file>.md"}',
  '        // AT LEAST TWO, each citing a DIFFERENT (file, quote) pair',
  '      ],',
  '      "consequenceForWriter": "<what the config writer should DO about it>",',
  '      "notes": "<hypothesis about the cause, stated as a hypothesis>"',
  '    }',
  '  ],',
  '  "compressedRanges": [',
  '    {',
  '      "label": "<the compressed string EXACTLY as the source writes it - an en-dash is not a',
  '                hyphen, \'Vat\' is not \'VAT\', \'Custom 1 - 20\' is not \'Custom 1-20\'>",',
  '      "expandsTo": ["<member>", "<member>", "..."],   // AN ENUMERATION, NEVER A DESCRIPTION',
  '      "count": 20,                                     // MUST equal expandsTo.length',
  '      "appliesTo": {"page": "...", "field": "..."},    // or {}',
  '      "sourceQuote": "<VERBATIM substring showing the COMPRESSED form>",',
  '      "sourceFile": "<path>", "notes": "<source-character notes; say if an expansion is mechanical>"',
  '    }',
  '  ],',
  '',
  'CONTRADICTIONS AND RANGES ARE NODES NOW, NOT NOTES. Two node types exist for them',
  '(ConfigContradiction, ConfigCompressedRange) and the deterministic validator treats an',
  'unverifiable reading quote as an ERROR, exactly as it does a field quote. So:',
  '  * EVERY reading needs its OWN verbatim quote from its OWN file, grep -F verified. A quote that',
  '    merely mentions the subject is not evidence - it must carry the disagreement.',
  '  * Fewer than two grounded readings is not a contradiction. Say so and drop it.',
  '  * appliesTo {} IS VALID AND COMMON. "Is Canada supported for VAT" is about the product, not any',
  '    field. An honest null beats attaching it to a plausible neighbour.',
  '  * consequenceForWriter is load-bearing, like a ConfigStep rationale. "The docs disagree" is not',
  '    actionable; "probe label A first, fall back to label B" is.',
  '  * expandsTo must be enumerated. In Group 3 several records put prose there and two ranges had',
  '    to be dropped entirely because the cited file enumerated rather than compressed - if nothing',
  '    in the source is compressed, there is no range node to make.',
  '  "coverageVerdict": "good|partial|thin",',
  '  "notes": "<what you could not determine from the documentation, and why>"',
  '}',
  '',
  'NAMING: "name" is a stable machine identifier; "label" is the human string. Be internally consistent',
  'within your lens. NEVER emit two records with the same name for one page - the deterministic validator',
  'treats a duplicate name on a page as an ERROR and it fails the build.',
  '',
  'AFTER WRITING: run  python3 -m json.tool <yourfile> > /dev/null  and fix until it passes. Only then',
  'may you set jsonValid: true. Then re-verify a random sample of at least five of your sourceQuotes',
  'with grep -F -c against their cited files and fix any that do not return >= 1.',
].join('\n')

// ---------------------------------------------------------------------------
// PHASES 2-4 - EXTRACT -> VERIFY -> REPAIR, pipelined per page
// ---------------------------------------------------------------------------
phase('Extract')

const perPage = await pipeline(
  PAGES,

  // ---- stage 1: EXTRACT, three lenses in parallel
  (p) => parallel(LENSES.map((L) => () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: EXTRACT ===',
    'Extract the configuration controls of ONE page through ONE lens, and write them to a JSON file.',
    '',
    L.charter,
    '',
    pageContext(p),
    '',
    ALREADY_BUILT,
    '',
    'PAGE OWNERSHIP: only emit a control the corpus documents as living on THIS page. If a topic',
    'describes a control on a different admin page, do not emit it here - instead emit a',
    'dependencyCandidate that points at it, naming the other page. Mis-assignment to the wrong page is',
    'the one failure mode grep cannot catch, and five fields were mis-homed on the last run.',
    '',
    'END-USER vs ADMIN: this graph models the ADMIN configuration surface. A control an ordinary',
    'employee uses while entering an invoice is not a configuration field. If a control is genuinely',
    'ambiguous, emit it and say so in notes - do not silently drop it.',
    '',
    FILE_SHAPE,
    '',
    'Write to: ' + PARTS + '/extract-' + p.id + '-' + L.key + '.json',
    'Then return the receipt, with wroteTo set to that exact path.',
  ].join('\n'), {
    label: 'extract:' + p.id + ':' + L.key,
    phase: 'Extract',
    model: L.model,
    effort: L.effort,
    schema: EXTRACT_RECEIPT_SCHEMA,
  }))),

  // ---- stage 2: VERIFY, two perspective-diverse adversarial refuters
  (lensReceipts, p) => {
    const live = (lensReceipts || []).filter(Boolean)
    const candidates = buildCandidates(live)
    const files = live.map((r) => r.wroteTo)
    if (candidates.length === 0) {
      log(p.name + ': 0 candidates from extract - skipping Verify, going straight to roster')
      return Promise.resolve({ page: p, lensReceipts: live, candidates, verdictSets: [], files })
    }
    log(p.name + ': ' + candidates.length + ' candidate controls from ' + live.length + ' lenses -> 2 refuters')

    const shared = [
      PREAMBLE,
      '',
      '=== YOUR JOB: ADVERSARIALLY VERIFY ONE PAGE ===',
      'Three extraction agents proposed controls for ' + p.name + '. Your job is to try to REFUTE each one,',
      'then return a disposition for EVERY candidate in the list. You are the accuracy gate. Do not be',
      'agreeable, and do not be trigger-happy either - both failure modes have already cost this project.',
      '',
      '=== THE THREE-WAY DISPOSITION - THIS IS THE WHOLE POINT ===',
      '  keep   = the record is sound as written and I verified it.',
      '  repair = THE CONTROL IS REAL BUT THE RECORD IS DEFECTIVE. Wrong quote, wrong file, wrong type,',
      '           an unsupported value in validValues, a false fromRawHtmlTable flag, a bad name, a',
      '           missing constraint. Say exactly what is wrong and what it should be, in "defect".',
      '  drop   = this is not a configuration control on this page at all.',
      '',
      'If you find yourself writing "keep, but..." the disposition is REPAIR, not keep. A binary',
      'keep/drop gate silently deleted two real fields on an earlier run - that is why this axis exists.',
      'WHEN IN DOUBT, REPAIR. Never drop to resolve your own uncertainty.',
      '',
      '=== CALIBRATION - READ THIS BEFORE YOU REFUTE ANYTHING ===',
      'An early refuter on this project killed 11 of 24 rows of a canonical settings table. These are',
      'NOT grounds to refute:',
      '  - a terse or unglamorous description',
      '  - a short sourceQuote',
      '  - a fieldType that was inferred rather than stated (that is normal; "unknown" is a legal type)',
      '  - "this seems minor" or "a config writer probably would not need this"',
      '  - an empty validValues array (the corpus very often does not enumerate; [] is correct)',
      'A ROW IN A DOCUMENTED FIELD TABLE IS A FIELD. Name the specific defect, or keep it.',
      '',
      '=== EVIDENCE YOU MUST ACTUALLY GATHER ===',
      'Read the extraction files yourself:',
      files.map((f) => '  ' + f).join('\n'),
      'For each candidate, look at EVERY variant across those files (the same control may appear under',
      'two or three names). Then run real commands - grep -F, grep -c, sed -n - against the corpus. A',
      'verdict with no command behind it is a guess, and guesses are what this phase exists to eliminate.',
      '',
      'For every candidate you must set verbatimVariantIndex: the 0-based index, IN THE ORDER THE',
      'VARIANTS APPEAR IN THE LIST BELOW, of the variant whose sourceQuote you personally verified',
      'verbatim with grep -F. Use -1 if NO variant verifies - and then the disposition is "repair"',
      '(quote defect), never "drop". Last run the pipeline kept a record whose quote was a reformatted',
      'table and dropped its twin whose quote was exactly verbatim. That must not happen again.',
      '',
      ALREADY_BUILT,
      '',
      pageContext(p),
      '',
      '=== CANDIDATES - RETURN A VERDICT FOR EVERY ONE, USING THE CANONICAL NAME EXACTLY ===',
      jstr(candidates.map((c, ix) => ({ index: ix, canonicalName: c.name, variantSpellings: c.spellings, foundByLenses: c.lenses }))),
      '',
      'A missing verdict is routed to Repair automatically, so an omission costs accuracy without saving',
      'you anything. Return all ' + candidates.length + '.',
    ].join('\n')

    return parallel([
      () => agent([
        shared,
        '',
        '=== YOUR LENS: GROUNDING AND CONTROL IDENTITY (refuter 1 of 2) ===',
        'Attack the record against its own cited source. For each candidate:',
        ' 1. Does the file exist at the stated path, in the stated guide directory?',
        ' 2. Does the sourceQuote appear VERBATIM? Run grep -F -c. Check every variant; report which one',
        '    passes in verbatimVariantIndex.',
        ' 3. Does that file actually describe this control, or was the quote lifted from an unrelated',
        '    passage that merely contains similar words?',
        ' 4. Is EVERY entry of validValues present in the cited file? Any value that is not is INVENTED -',
        '    disposition repair, and name the exact values to strip. This is the highest-severity defect',
        '    class in the project: two "Yes" values were invented to complete No/Yes toggles the corpus',
        '    only describes one side of.',
        ' 5. Is fromRawHtmlTable justified? Run grep -c "<table" on the cited file. Non-zero or it is false.',
        ' 6. Is the fieldType consistent with what the text describes? (Wrong type = repair, not drop.)',
        ' 7. Is a documented constraint, default, or role gate missing from notes that should be there?',
        ' 8. TRUNCATION CHECK: if this record carries an enumeration, count the rows in the source with',
        '    grep -c and compare. A validValues list shorter than its source table is a repair, and it is',
        '    the single most expensive defect class this project has hit.',
        'Default to repair when uncertain. Reserve drop for a record you can show is not a control.',
      ].join('\n'), {
        label: 'verify:' + p.id + ':grounding',
        phase: 'Verify',
        model: 'opus',
        effort: 'high',
        schema: VERDICT_SCHEMA,
      }),

      () => agent([
        shared,
        '',
        '=== YOUR LENS: PAGE OWNERSHIP, DUPLICATION AND SCOPE (refuter 2 of 2) ===',
        'Attack the record\'s PLACEMENT rather than its quote. This is the failure mode grep cannot catch,',
        'and it is where the last build actually lost accuracy: five fields were documented on one page and',
        'filed under another, and three fields were duplicated onto a second page because their names',
        'collided ACROSS pages rather than within one. For each candidate:',
        ' 1. PAGE OWNERSHIP. Where does the corpus actually place this control? Run',
        '      grep -rln "<the distinctive label>" ' + CORPUS + '/concur-invoice-professional-edition-*/',
        '    and read what those files say the page is. If the ONLY documentation places it on a different',
        '    admin page, disposition drop and set correctPage. If the corpus is ambiguous, disposition',
        '    repair and say so - do not resolve an ambiguity by fiat.',
        ' 2. CROSS-PAGE COLLISION. Read the existing graph at ' + KG + ' (python3). Does a field with this',
        '    name already exist on a DIFFERENT page? If so, is this genuinely a second, distinct control,',
        '    or is it the same control being filed twice? Say which, with evidence.',
        ' 3. INTRA-PAGE DUPLICATION. Do two candidates describe the SAME control under different names? If',
        '    so, drop the loser and set duplicateOf to the survivor - and prefer as survivor the record',
        '    whose sourceQuote is verbatim over one whose quote is a reformatted or reflowed table.',
        ' 4. ADMIN vs END-USER. Is this a control an administrator configures, or one an employee uses',
        '    while entering an invoice? An end-user runtime constraint is a drop - but say in reason if a',
        '    crawler would still want to know the constraint.',
        ' 5. SUB-PAGE / SEPARATE TOOL. Does this control actually live on a separate page reached FROM this',
        '    one (a wizard window, an import tool with its own left-menu entry, a hierarchy editor)? That is',
        '    usually a repair with a note, not a drop - but flag it explicitly so the graph does not',
        '    silently flatten two pages into one.',
        ' 6. ⚠ THE EMAIL REMINDERS / EMAIL NOTIFICATIONS BOUNDARY. THIS IS THE CENTRAL RISK OF THIS RUN',
        '    AND IT IS YOURS. The built Workflows page owns an EMAIL NOTIFICATIONS tab. The page being',
        '    built here is EMAIL REMINDERS. Both send email to approvers and the recon called this the',
        '    easiest collapse error in the domain. The distinction is mechanical, not stylistic:',
        '      NOTIFICATIONS = event-driven templates, authored INSIDE Workflows, assigned to a WORKFLOW',
        '        OBJECT. Already built. Any candidate the corpus places there is a DROP with correctPage',
        '        "Workflows".',
        '      REMINDERS = interval-driven, with their own RULE ENGINE, on their own page, assigned by',
        '        GROUP. These belong here.',
        '    For every email-related candidate, run grep -rln on its distinctive label and say which of',
        '    the two surfaces the hits actually describe. Then check the built graph: does a field of',
        '    that name already exist on page.workflows? If so, is this genuinely a second control or the',
        '    same one filed twice? Say which, with evidence. A duplicate across two pages is INVISIBLE to',
        '    bin/validate-graph.py - it checks quotes against files, never controls against pages.',
        ' 6b. THE DELEGATE BOUNDARY, smaller but real. field.workflows.allow-delegated-approvers-to-',
        '    approve-own-requests is ALREADY BUILT on Workflows. admin-guides/delegate-self-approval-',
        '    1b627285.md describes that SAME control, and NO field on Delegate Configurations may be',
        '    sourced from it. A candidate sourced from that file is an automatic drop with correctPage',
        '    "Workflows". Delegate Configurations legitimately CROSS-REFERENCES the Workflows Authorized',
        '    Approvers tab (a field "Restrict approvers to those with equal or higher authorized approver',
        '    limit") - that is a dependency endpoint, never a re-home.',
        'Default to repair when uncertain. Do not drop merely because you did not find corroboration.',
      ].join('\n'), {
        label: 'verify:' + p.id + ':ownership',
        phase: 'Verify',
        model: 'opus',
        effort: 'high',
        schema: VERDICT_SCHEMA,
      }),
    ]).then((verdictSets) => ({ page: p, lensReceipts: live, candidates, verdictSets, files }))
  },

  // ---- stage 3: REPAIR + roster assembly (one record per input, hard-capped)
  (v, p) => {
    const rosterPath = PARTS + '/roster-' + p.id + '.json'
    const combined = combineVerdicts(v.candidates, v.verdictSets)
    if (combined.strays.length) log(p.name + ': refuters returned ' + combined.strays.length + ' verdicts for names nobody proposed (ignored)')
    log(p.name + ': dispositions -> keep ' + combined.keep.length + ' | repair ' + combined.repair.length + ' | drop ' + combined.drop.length)

    const slim = (arr) => arr.map((c) => ({
      canonicalName: c.name,
      variantSpellings: c.spellings,
      foundByLenses: c.lenses,
      verdicts: (c.verdicts || []).map((x) => ({
        refuter: x.refuter,
        disposition: x.disposition,
        reason: x.reason,
        defect: x.defect,
        verbatimVariantIndex: x.verbatimVariantIndex,
        correctPage: x.correctPage,
        duplicateOf: x.duplicateOf,
      })),
    }))

    const allowed = combined.keep.concat(combined.repair).map((c) => c.name)

    return agent([
      PREAMBLE,
      '',
      '=== YOUR JOB: REPAIR AND ASSEMBLE THE FINAL FIELD ROSTER FOR ONE PAGE ===',
      'Two adversarial refuters have judged every candidate control on ' + p.name + '. You now produce the',
      'page\'s FINAL field roster: the single authoritative record for each surviving control.',
      '',
      '=== THE HARD CONSTRAINT - READ IT TWICE ===',
      'Your output "fields" array must contain AT MOST ONE RECORD PER INPUT NAME, and NO name that is not',
      'in the KEEP or REPAIR lists below. ' + allowed.length + ' names are allowed in; ' + allowed.length + ' or fewer come out.',
      'On the last run a Repair agent returned 17 records from 14 inputs by splitting an attendee checkbox',
      'block into individual checkboxes. Every one carried a grep-verified quote, so nothing unfounded got',
      'in - but records CREATED during Repair NEVER FACE THE ADVERSARIAL REFUTER, and mis-assignment to the',
      'wrong page is precisely what grep cannot catch. So: if the documentation shows an input is genuinely',
      'several distinct controls, DO NOT SPLIT IT. Emit the single best-grounded record and describe the',
      'split in splitsProposed, which is reported to the human and deliberately does not enter the graph.',
      'You MAY emit fewer records than you were given, by moving an input you cannot ground into "dropped".',
      '',
      '=== WHAT TO DO WITH EACH BUCKET ===',
      'KEEP: carry the record through unchanged EXCEPT that you must select the variant whose sourceQuote',
      '  is verbatim. Use the refuters\' verbatimVariantIndex, and confirm it yourself with grep -F -c. If',
      '  the refuters disagree about which variant is verbatim, check both and use the one that passes.',
      'REPAIR: fix exactly the defect the refuters named, then re-verify. Common repairs: replace a quote',
      '  that is not verbatim with one that is (from the same file, describing the same control); strip an',
      '  unsupported value out of validValues and NOTE that you did and why; clear a false fromRawHtmlTable',
      '  flag; correct fieldType; merge two spellings of one control into one record; add a documented',
      '  constraint, default or role gate that was missing from notes; complete a truncated enumeration by',
      '  reading the full table. If after honest effort you CANNOT ground a repair item, move it to',
      '  "dropped" with the reason - that is a legitimate outcome and better than a fabricated fix.',
      'DROP: do not emit. Record each in "dropped" with the refuters\' reason (and correctPage /',
      '  duplicateOf where they gave one), so the drop is auditable.',
      '',
      '=== ASSEMBLE PROGRAMMATICALLY, DO NOT RETYPE ===',
      'The extraction records already exist as JSON here:',
      v.files.map((f) => '  ' + f).join('\n'),
      'Use python3 to pull kept records straight out of those files into your roster. Retyping a quote by',
      'hand is how a verbatim quote stops being verbatim. HAND-AUTHOR ONLY the records you actually repair,',
      'and grep -F -c every quote you hand-author.',
      '',
      '=== NAME HYGIENE ===',
      'No two records in the roster may share a "name" - the deterministic validator treats a duplicate',
      'name on a page as an ERROR and fails the build. If a merge would collide, rename one and say so in',
      'notes. Also check the existing graph (' + KG + ') and avoid needlessly reusing a name that already',
      'means something different on another page.',
      '',
      pageContext(p),
      '',
      '=== KEEP (' + combined.keep.length + ') ===',
      jstr(slim(combined.keep)),
      '',
      '=== REPAIR (' + combined.repair.length + ') ===',
      jstr(slim(combined.repair)),
      '',
      '=== DROP (' + combined.drop.length + ') ===',
      jstr(slim(combined.drop)),
      '',
      '=== REFUTER PAGE-LEVEL FINDINGS ===',
      jstr((v.verdictSets || []).filter(Boolean).map((x) => ({ refuter: x.refuter, findings: x.pageLevelFindings }))),
      '',
      '=== OUTPUT FILE - write exactly this shape to ' + rosterPath + ' ===',
      '{',
      '  "pageId": "' + p.id + '", "pageName": "' + p.name + '", "url": "' + p.url + '",',
      '  "coverage": "good|partial|thin",',
      '  "uiVariant": "new|legacy|both|undifferentiated",',
      '  "fields": [ <field records, same shape the extractors used> ],',
      '  "dropped": [ {"name": "...", "reason": "...", "correctPage": "...", "duplicateOf": "..."} ],',
      '  "splitsProposed": [ {"fromField": "...", "intoFields": ["..."], "why": "...", "sourceFile": "..."} ],',
      '  "verifyNotes": "<what the refuters found at page level, and what you did about it>",',
      '  "cleanCount": <how many came through as keep>,',
      '  "repairedCount": <how many you actually repaired>',
      '}',
      'coverage is YOUR honest judgement: "good" = the corpus documents this page at field level;',
      '"partial" = real gaps; "thin" = the corpus does not document it at field level. THIN STAYS THIN.',
      'If this page has zero surviving fields, write the file anyway with "fields": [] and use verifyNotes',
      'to state plainly what the corpus does and does not say about the page - that negative finding is',
      'the deliverable for such a page, and padding it would be a defect.',
      'Then run python3 -m json.tool on the file until it passes, and only then return the receipt.',
    ].join('\n'), {
      label: 'repair:' + p.id,
      phase: 'Repair',
      model: 'opus',
      effort: 'high',
      schema: REPAIR_RECEIPT_SCHEMA,
    }).then((rec) => ({ page: p, roster: rosterPath, receipt: rec, combined, lensReceipts: v.lensReceipts, extractFiles: v.files }))
  }
)

const built = (perPage || []).filter(Boolean)
const rosterList = built.map((b) => b.page.name + ' -> ' + b.roster).join('\n  ')
for (const b of built) {
  const r = b.receipt || {}
  log(b.page.name + ': roster ' + (r.finalFieldNames || []).length + ' fields, ' + (r.droppedCount || 0) + ' dropped, ' + (r.repairedCount || 0) + ' repaired, coverage ' + (r.coverage || '?'))
}

// ---------------------------------------------------------------------------
// PHASE 5 - SYNTHESIZE
// ---------------------------------------------------------------------------
phase('Synthesize')

const SYNTH_CONTEXT = [
  'THE FINAL FIELD ROSTERS for this run are on disk. Read them - they are authoritative, and the field',
  '"name" values in them are the ONLY legal field names for these two pages:',
  '  ' + rosterList,
  '',
  'The raw extraction files are also on disk and carry candidate material the rosters do not (value-set',
  'candidates, dependency candidates, contradictions, compressed ranges). Read them too:',
  built.flatMap((b) => b.extractFiles).map((f) => '  ' + f).join('\n'),
  '',
  'THE EXISTING GRAPH is at ' + KG + '. Read it with python3 to get exact page names and exact field',
  'names for the 23 pages already built. Cross-group references are valuable and must use exact names.',
  '',
  ALREADY_BUILT,
  '',
  'Page names for THIS run, exactly as they must be written: ' + PAGES.map((p) => '"' + p.name + '"').join(', ') + '.',
  'TAB NAMES ARE NOT PAGE NAMES. This run builds two pages that each have two tabs. A control on the',
  'Rules tab is a field on the page "Email Reminders"; a control on the Purchase Request tab is a field',
  'on the page "Delegate Configurations". There is NO page called "Rules", "Invoice", "Purchase',
  'Request" or "Email Reminders tab". Use the tab name in the field NOTES, never as the page.',
  '⚠ AND THE TWO NAMES YOU MUST NEVER WRITE FOR A NEW RECORD IN THIS RUN ARE "Workflows" AND',
  '"Invoice Settings". Both are DIFFERENT, ALREADY-BUILT pages. "Workflows" owns the Email',
  'NOTIFICATIONS tab, which is the surface this run is most likely to collapse into Email REMINDERS.',
  'You MAY reference their fields as dependency endpoints by exact graph name - that is valuable and',
  'this run owes several such edges. You may NOT emit a field, value set, roster record or',
  'contradiction owner against either page. A duplicate across two pages is invisible to the validator.',
].join('\n')

// ORDER MATTERS AND IT WAS WRONG UNTIL 2026-09-01: the array below is
// [valueSets, dependencies, contradictions, steps] but it was destructured as
// [vsRec, depRec, stepRec, ctrRec], so the log line and the returned summary swapped the last two.
// Proven on the Approval Authority run, which reported steps=6 / contradictions=2 when the truth was
// 2 steps and 6 contradictions. The GRAPH was never affected (it is assembled from the parts files,
// not from these receipts) - this was a reporting defect only, but it misreports every run.
const [vsRec, depRec, ctrRec, stepRec] = await parallel([
  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: BUILD THE ConfigValueSets FOR THIS GROUP ===',
    'A ConfigValueSet is a CONTEXT-DEPENDENT ENUMERATION - options that change based on another field\'s',
    'value - or a catalog too large or too structured to live in a flat validValues array. The Audit Rules',
    'condition editor is the canonical case: the Field column\'s options depend on which Data Object is',
    'selected, across 10+ data objects and roughly 250 field names. A flat array would either flatten them',
    'into one meaningless list or drop them, and an earlier extractor did drop them.',
    '',
    '=== THE ONE RULE THAT KEEPS BREAKING ===',
    'appliesToField MUST BE A FIELD "name" TAKEN FROM A ROSTER FILE - never a UI label, never a column',
    'heading, never a prose description. On the last two runs 17 of 18 value sets landed attached to',
    'nothing because the extractor wrote "Data Type" where the schema wanted "dataType", and wrote',
    '"Field/Value" (a column heading) where no field of that name exists at all.',
    'appliesToPage IS MANDATORY ON EVERY ENTRY OF valueSets[]. bin/assemble-parts.py now FAILS the build',
    'on an empty one, because a set with no page gets silently wired to a same-named field ANYWHERE in the',
    'graph. If you cannot name the page, the record belongs in orphanCandidates, which carries page and',
    'field as "" ON PURPOSE and lands as a knownGap set.',
    'BEFORE YOU EMIT EACH SET: open the roster for appliesToPage, confirm the exact string you are about',
    'to write appears as a field "name" in it, and only then emit. If no field owns the enumeration,',
    'DO NOT invent an owner and DO NOT attach it to a neighbour - report it in orphanCandidates instead,',
    'with what it would need. An honest null beats a wrong owner.',
    '',
    '=== COMPLETENESS ===',
    'Enumerate EVERY entry, verbatim, in source order. Never sample or truncate: a 250-name table means',
    '250 entries. Reproduce the source character exactly - an en-dash is not a hyphen. Where a source uses',
    'a compressed range ("Custom 1 - 24"), keep the range string as the source writes it AND record the',
    'expansion in notes. Where two topics enumerate the SAME control differently, emit BOTH sets with',
    'distinct "context" values and state the contradiction in notes. Do not reconcile them.',
    '',
    '=== validValuesAdditions ===',
    'If a roster field carries validValues: [] but the corpus plainly enumerates its options in a file the',
    'roster did not cite, report it in validValuesAdditions. Downstream these are materialised as',
    'UNCONDITIONAL value sets wired to that field, so each is checked against its OWN cited file -',
    'report them freely. These are values only - you may NOT add,',
    'rename or re-home a field. Every added value needs its own verbatim quote and file, because the',
    'deterministic validator checks each one against the cited source.',
    '',
    SYNTH_CONTEXT,
    '',
    '=== OUTPUT - write to ' + PARTS + '/synth-valuesets.json ===',
    '{',
    '  "valueSets": [ { "appliesToPage": "Email Reminders | Delegate Configurations",',
    '                   "appliesToField": "<exact field name from that page\'s roster>",',
    '                   "contextField": "<field name whose value selects this list, or \\"\\">",',
    '                   "context": "<what selects this list / why it is a set rather than flat values>",',
    '                   "values": ["<complete, verbatim, source order>"],',
    '                   "sourceQuote": "<verbatim>", "sourceFile": "<path>", "notes": "<...>" } ],',
    '  "validValuesAdditions": [ { "page": "...", "field": "<exact roster field name>",',
    '                              "values": ["..."], "sourceQuote": "...", "sourceFile": "...", "why": "..." } ],',
    '  "orphanCandidates": [ { "enumerates": "...", "values": ["..."], "sourceFile": "...",',
    '                          "whyNoOwner": "...", "whatWouldFixIt": "..." } ]',
    '}',
    'Validate with python3 -m json.tool. Set kind to "valueSets"; count = number of value sets;',
    'unresolvedCount = number of orphanCandidates.',
  ].join('\n'), { label: 'synth:valueSets', phase: 'Synthesize', model: 'opus', effort: 'high', schema: SYNTH_RECEIPT_SCHEMA }),

  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: BUILD THE ConfigDependencies FOR THIS GROUP ===',
    'A ConfigDependency is an ordering or conditioning relationship between two configuration fields:',
    '  depends_on - the source field\'s meaning, availability or option list depends on the target',
    '  precedes   - the source must be configured BEFORE the target for the target to work',
    '  triggers   - setting the source causes the target to take effect / become required / fire',
    'These edges are how the graph answers "in what order", so they are load-bearing, not decoration.',
    '',
    'EVERY edge needs a VERBATIM quote that actually states the relationship. A quote that merely mentions',
    'both fields is not evidence of a dependency. If the corpus only implies an ordering, say so in the',
    'condition text ("INFERRED: the corpus does not state this ordering; it follows from ...").',
    '',
    'CROSS-GROUP EDGES ARE THE MOST VALUABLE ONES. Both pages in this run are small and most of their',
    'value to a config writer is in their edges. Quality over count.',
    '',
    'ONE UNRESOLVED ENDPOINT IN THE GRAPH POINTS AT THIS RUN, and exactly one:',
    '  dep.g1.059 -> {page: "Delegate Configurations", field: "Delegate Configuration"}, unresolved,',
    '  carrying the cardinality quote "Each group within your company can only have one Invoice delegate',
    '  configuration." It was written by a Group 1 agent with no roster, so it is independent',
    '  corroboration of the PAGE NAME. ⚠ BUT ITS FIELD NAME IS LABEL-SHAPED, which is the exact',
    '  LABEL-vs-NAME trap that leaves an edge dangling forever. It resolves ONLY if this run happens to',
    '  emit a field named exactly "Delegate Configuration". DO NOT CONTORT YOUR NAMING TO FORCE IT -',
    '  report the mismatch in your notes for a correction pass instead.',
    '',
    '⚠ DO NOT MISTAKE THE OTHER UNRESOLVED "email" ENDPOINTS FOR YOURS. dep.g1.063 (Email',
    'Administration :: Alias Name), dep.g4.010 / .013 / .017 / .020 / .021 (Capture Processing Admin,',
    'email intake and the Email Administration tab) and dep.g1.069 (Invoice Pay vendor remittance) are',
    'ALL different surfaces. Email Reminders does not own one of them. Resolving one would be a',
    'confident, invisible error.',
    '',
    'THE EDGES THIS RUN ACTUALLY OWES, each needing its own verbatim quote that STATES the relationship:',
    '  (1) RULE BEFORE REMINDER - the load-bearing ordering on Email Reminders. A reminder configuration',
    '      has nothing to fire on without a rule; configuration-process-8b2c271f.md states the sequence.',
    '  (2) THE SCHEDULING HANDOFF, and it is the most important thing a driver can be told about this',
    '      page: "Scheduling email reminders is done in the Import/Extract Administrator tool and is',
    '      performed by SAP Concur staff." Emit it as a forward reference into that UNBUILT surface,',
    '      with a condition making clear a config writer CANNOT complete this leg.',
    '  (3) GROUP-LEVEL ASSIGNMENT from Email Reminders into the built Group Configurations page. Verified',
    '      that no built field cites any reminder file, so there is no duplication - but the edge is real.',
    '  (4) THE DELEGATE / AUTHORIZED-APPROVER CROSS-REFERENCE: Delegate Configurations carries a field',
    '      "Restrict approvers to those with equal or higher authorized approver limit", which points at',
    '      the built Workflows Authorized Approvers surface. Target page "Workflows" by EXACT field name.',
    '  (5) DELEGATE SELF-APPROVAL: field.workflows.allow-delegated-approvers-to-approve-own-requests is',
    '      already built and governs whether a delegate may approve their own request. An edge from a',
    '      Delegate Configurations permission field into it is legitimate; a FIELD sourced from',
    '      delegate-self-approval-1b627285.md is NOT.',
    '',
    '⚠ THE ENDPOINT-NAMING RULE THAT THIS RUN IS MOST LIKELY TO BREAK. The already-built pages you will',
    'reference use machine NAMES that differ from their on-screen LABELS. An edge written with the LABEL',
    'dangles forever and hides among the 244 legitimate forward references to unbuilt groups. Read the',
    'exact names out of the graph JSON with python3 and verify EVERY endpoint before you emit it.',
    'bin/assemble-parts.py now flags an endpoint that names a BUILT page but no field on it',
    '(DEP-ENDPOINT-NOT-ON-BUILT-PAGE) - do not make it fire.',
    'An edge into a page that is NOT YET BUILT (Peppol, Shipping, Localization, the Import/Extract',
    'Administrator, the Employee Import, the User Administration user profile) is legitimate and',
    'expected: write the page and field name as they will be. Prefer a well-labelled forward reference',
    'over dropping a real relationship.',
    '',
    'Do not manufacture edges for coverage. A page with few genuine relationships should have few edges.',
    '',
    SYNTH_CONTEXT,
    '',
    '=== OUTPUT - write to ' + PARTS + '/synth-dependencies.json ===',
    '{ "dependencies": [ { "type": "depends_on|precedes|triggers",',
    '                      "sourcePage": "<exact page name>", "sourceField": "<exact field name>",',
    '                      "targetPage": "<exact page name>", "targetField": "<exact field name>",',
    '                      "condition": "<what the relationship is, and INFERRED: if it is inferred>",',
    '                      "sourceQuote": "<verbatim>", "sourceFile": "<path>" } ] }',
    'Validate with python3 -m json.tool. Set kind to "dependencies"; count = number of edges;',
    'unresolvedCount = how many have an endpoint on a page that is not yet built.',
  ].join('\n'), { label: 'synth:dependencies', phase: 'Synthesize', model: 'opus', effort: 'high', schema: SYNTH_RECEIPT_SCHEMA }),

  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: BUILD THE ConfigContradictions AND ConfigCompressedRanges ===',
    'The extraction files carry raw contradiction and compressed-range records. Turn them into nodes.',
    '',
    'DEDUPE FIRST. Three lenses ran per page and they overlap heavily - in Group 3, 47 raw records',
    'collapsed to 26. There is no pre-supplied contradiction list for this run: FIND THEM YOURSELF.',
    'Places this run is likely to hold real ones, each still to be verified rather than assumed:',
    '  * ⚠ THE REMINDER TYPE OPTION LIST DIFFERS BETWEEN THE TWO EMAIL REMINDERS ROSTER FILES, AND THIS IS',
    '    THE STRONGEST CONTRADICTION IN THE RUN - both readings are single corpus hits in DIFFERENT files.',
    '    create-email-reminders-604c4a46.md enumerates "Approval Request - Vendor Request";',
    '    create-reminder-rules-b0a7fac5.md enumerates "Approval Request - Payment Vendor" for the same',
    '    slot. And the SHARED option is defined incompatibly: "Approval Request - Payment Request: When a',
    '    cash advance request has a status of Pending Approval." versus "...: When an invoice has a status',
    '    of Pending Approval." DO NOT RECONCILE. Emit both as value sets with distinct context',
    '    (reminder-side vs rule-side) and one contradiction node. consequenceForWriter: probe both label',
    '    spellings. The cash-advance reading is very likely Expense boilerplate, but the corpus does not',
    '    say so - and saying it does would be exactly the invention this graph forbids.',
    '  * THE "Rules" LABEL NAMES THREE DIFFERENT SURFACES in this product - the Email Reminders Rules',
    '    tab, the built Purchase Order Matching Rules page Rules tab, and the Workflows Step Rules wizard',
    '    page. A Chromium driver matches on labels, so a label that resolves three ways is exactly the',
    '    kind of thing this node type exists for.',
    '  * DELEGATE CONFIGURATIONS CARRIES FOUR ALIASES (Delegate Configurations tool, Delegate',
    '    Configuration, Payment Delegate Configurations, Invoice delegates) and TWO access idioms',
    '    ("(left menu)" and "the Invoice Admin link"). Record the majority form and the disagreement.',
    '  * SINGULAR / PLURAL AND TAB-NAME DRIFT across both page sets, the standard trap in this corpus.',
    '  * ROLE-GATE WORDING on Email Reminders: "Invoice Configuration administrator (Restricted)" versus',
    '    the "Global and Group Configuration administrator" phrasing in the same file, versus the',
    '    "create rights" qualifier in create-reminder-rules-b0a7fac5.md. If those genuinely disagree',
    '    about who can do what, that is a contradiction a driver needs.',
    'Do not manufacture one. Fewer than two grounded readings is not a contradiction - say so and drop',
    'it. Two records are the same node when they are about the same disagreement: merge',
    'them, taking the UNION of readings deduplicated on (sourceFile, sourceQuote). More grounded',
    'readings on one node beats two nodes with one reading each. Never merge records that cite',
    'genuinely different sources about genuinely different things.',
    '',
    'THEN GROUND EVERY READING. Open each cited file and find the sentence that ACTUALLY STATES that',
    'reading; extract it verbatim; grep -F -c it against its own file. A raw record\'s file list is',
    'often longer than its reading count and is NOT positionally aligned - read the sources, do not',
    'assume files[0] backs readingA. If a reading cannot be grounded in a verbatim sentence, drop the',
    'whole record: one piece of evidence is not a contradiction, and dropping is the correct outcome.',
    '',
    'DO NOT RECONCILE. Record both accounts side by side. There is no "correct" reading and no',
    'resolution field. Many of these are provisioning-dependent, so a single answer would be wrong',
    'while looking right. A hypothesis about the cause goes in notes, phrased as a hypothesis.',
    '',
    'RANGES: expandsTo must be an enumeration, not a description; count must equal its length; the',
    'label must be character-exact against the source bytes. If the cited file ENUMERATES rather than',
    'compresses, there is no range node to make - say so and drop it.',
    '',
    SYNTH_CONTEXT,
    '',
    '=== OUTPUT - write TWO files ===',
    '  ' + PARTS + '/synth-contradictions.json  as {"contradictions": [...]}',
    '  ' + PARTS + '/synth-ranges.json          as {"compressedRanges": [...]}',
    'Both in the shapes given in the extraction brief. Validate both with python3 -m json.tool, then',
    'run a self-check that greps every sourceQuote in both files and reports any miss; fix until zero.',
    'Set kind to "contradictions"; count = number of contradictions; unresolvedCount = how many have',
    'an empty appliesTo. Set wroteTo to the contradictions path.',
  ].join('\n'), { label: 'synth:contradictions', phase: 'Synthesize', model: 'opus', effort: 'high', schema: SYNTH_RECEIPT_SCHEMA }),

  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: BUILD THE ConfigSteps FOR THIS RUN ===',
    'A ConfigStep is an ordered, end-to-end configuration procedure a config writer could actually drive:',
    'the real task an administrator sits down to do, across however many pages it takes.',
    '',
    'THE RATIONALE IS THE LOAD-BEARING PART OF EACH SEQUENCE ENTRY. It records WHAT BREAKS IF THE STEP RUNS',
    'OUT OF ORDER. A rationale that merely restates the action is worthless. Mark each one explicitly as',
    'CORPUS-STATED (with the quote that states it) or INFERRED (and say what it is inferred from). Where a',
    'role gate applies, quote it.',
    '',
    '⚠ READ THE 43 EXISTING STEPS IN ' + KG + ' BEFORE YOU WRITE ONE. Run A already minted SEVEN steps',
    'in this very namespace (grpworkflows-s1 .. grpworkflows-s7), covering standing up a workflow end to',
    'end, the Authorized Approver feature, cost object approval, authoring an email NOTIFICATION and',
    'selecting it on a workflow, the exception-level thresholds, and confirmation agreements. DO NOT',
    'RE-AUTHOR ANY OF THEM. In particular grpworkflows-s4 already covers the email NOTIFICATION flow -',
    'a step about email REMINDERS is a different procedure on a different page, and you must make that',
    'difference explicit in the goal text so a reader cannot confuse the two.',
    '',
    'Aim for 3 to 5 steps that are genuinely THESE TWO PAGES. The corpus hands you real ordering:',
    '  (1) EMAIL REMINDERS, and configuration-process-8b2c271f.md gives the sequence outright: create a',
    '      RULE on the Rules tab -> create a REMINDER configuration on the Email Reminders tab and assign',
    '      it to groups -> schedule -> optionally localize. The RULE-BEFORE-REMINDER ordering is the',
    '      load-bearing part: a reminder has nothing to fire on without a rule. Quote it as CORPUS-STATED.',
    '      ⚠ THE SCHEDULING LEG IS NOT DRIVABLE: "Scheduling email reminders is done in the',
    '      Import/Extract Administrator tool and is performed by SAP Concur staff." Record it as a step',
    '      entry whose rationale says plainly that a config writer CANNOT complete it and must raise a',
    '      service request. That is exactly the kind of thing a driver needs told, and a step that',
    '      silently implies it can be clicked is worse than no step.',
    '  (2) DELEGATE CONFIGURATIONS: select the Invoice or Purchase Request tab -> New -> the Add Delegate',
    '      Configuration window -> set the permissions and any date bounds -> save. Its cardinality rule',
    '      is corpus-stated and belongs in a rationale: "Each group within your company can only have one',
    '      Invoice delegate configuration."',
    'Let the corpus decide. If a page supports no coherent end-to-end procedure, do not invent one for',
    'symmetry, and do not pad to reach a count.',
    '',
    '⚠ STEP IDS MUST USE THE SUB-PREFIX "grpworkflows-b1-", "grpworkflows-b2-", ... IN THIS RUN.',
    'The merge tool namespaces steps by the group tag "grpworkflows-", which this run SHARES with Run A',
    'because assemble-parts.py does not suffix the step prefix on a patch the way merge-group.py',
    'suffixes the dependency gtag. Run A already occupies grpworkflows-s1 through grpworkflows-s7, so a',
    'bare "grpworkflows-s1-..." here would be a DUPLICATE NODE ID. The "b" sub-prefix still satisfies',
    'the assemble-parts prefix check and keeps the two runs distinct. validate-graph.py now has a',
    'duplicate-node-id invariant as the backstop, but do not make it fire.',
    'Every name in "fields" must be an exact field name from a roster in this run or from the existing graph.',
    'Every name in "pages" must be an exact page name. Steps may legitimately cross into already-built',
    'pages - that is what makes them useful.',
    '',
    SYNTH_CONTEXT,
    '',
    '=== OUTPUT - write to ' + PARTS + '/synth-steps.json ===',
    '{ "steps": [ { "id": "grpworkflows-b1-...", "name": "...", "goal": "<what this achieves and what silently',
    '               half-works if a leg is skipped>",',
    '               "pages": ["..."], "fields": ["..."],',
    '               "sequence": [ { "order": 1, "page": "...", "action": "<what the operator does>",',
    '                               "field": "<exact field name>",',
    '                               "rationale": "CORPUS-STATED: ... / INFERRED: ..." } ] } ] }',
    'Validate with python3 -m json.tool. Set kind to "steps"; count = number of steps; unresolvedCount =',
    'number of sequence entries whose page is not yet built.',
  ].join('\n'), { label: 'synth:steps', phase: 'Synthesize', model: 'opus', effort: 'high', schema: SYNTH_RECEIPT_SCHEMA }),
])

log('Synthesis: valueSets=' + (vsRec ? vsRec.count : 'FAILED') + ' dependencies=' + (depRec ? depRec.count : 'FAILED') + ' steps=' + (stepRec ? stepRec.count : 'FAILED') + ' contradictions=' + (ctrRec ? ctrRec.count : 'FAILED'))

// ---------------------------------------------------------------------------
// PHASE 6 - CRITIC
// ---------------------------------------------------------------------------
phase('Critic')

const digest = built.map((b) => {
  const inv = invById.get(b.page.id) || {}
  const mustRead = (inv.mustRead || []).map((m) => m.file)
  const cited = Array.from(new Set((b.lensReceipts || []).flatMap((r) => r.mustReadCited || [])))
  const read = Array.from(new Set((b.lensReceipts || []).flatMap((r) => r.filesRead || [])))
  const rec = b.receipt || {}
  return {
    page: b.page.name,
    pageId: b.page.id,
    documentedBasis: (navById.get(b.page.id) || {}).documentedBasis,
    coverage: rec.coverage,
    uiVariant: rec.uiVariant,
    rosterFile: b.roster,
    fieldCount: (rec.finalFieldNames || []).length,
    fieldNames: rec.finalFieldNames || [],
    droppedCount: rec.droppedCount,
    repairedCount: rec.repairedCount,
    splitsProposed: rec.splitsProposed || [],
    mustReadFiles: mustRead,
    mustReadNeverCited: mustRead.filter((f) => cited.indexOf(f) === -1),
    mustReadSkipsDeclared: (b.lensReceipts || []).flatMap((r) => r.mustReadSkipped || []),
    filesActuallyRead: read,
    longCatalogsInInventory: inv.longCatalogs || [],
    rawTableFilesInInventory: (inv.rawHtmlTableCensus || []).filter((x) => x.count > 0),
    lensHeadlines: (b.lensReceipts || []).map((r) => r.lens + ': ' + r.headline),
    extractFiles: b.extractFiles,
  }
})

const uncitedTotal = digest.reduce((a, d) => a + d.mustReadNeverCited.length, 0)
log('Critic input: ' + digest.reduce((a, d) => a + d.fieldCount, 0) + ' fields across 2 pages; ' + uncitedTotal + ' must-read files never cited')

const CRITIC_CONTEXT = [
  '=== WHAT WAS BUILT ===',
  jstr(digest),
  '',
  '=== EVERYTHING IS ON DISK - READ IT, DO NOT TAKE THE DIGEST ON TRUST ===',
  '  Map:        ' + PARTS + '/map-navigation.md , ' + PARTS + '/map-inventory.md',
  '  Rosters:    ' + built.map((b) => b.roster).join(' , '),
  '  Extracts:   ' + PARTS + '/extract-*.json',
  '  Synthesis:  ' + PARTS + '/synth-valuesets.json , ' + PARTS + '/synth-dependencies.json , ' + PARTS + '/synth-steps.json',
  '  Graph:      ' + KG,
  '  Corpus:     ' + CORPUS,
  '',
  'You have Bash. USE IT. Every claim you make should have a command behind it. The last critic on this',
  'project was believed and acted on precisely because it counted rows with grep -c instead of asserting.',
  '',
  ALREADY_BUILT,
].join('\n')

const [criticA, criticB] = await parallel([
  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: ADVERSARIAL CRITIC - COMPLETENESS (what is MISSING) ===',
    'You are the last gate before this group is merged into a permanent graph. Your predecessor found, on',
    'a build that had already passed three adversarial rounds: a 34-row catalog never read; a settings',
    'table duplicated across two files and missed in both; a 22-row feature-by-scope matrix missed; a',
    '7-row wizard table captured at 1 of 7; a named site setting with an enumerated value missed; and a',
    'tools-guides table that CONTRADICTS its admin-guides twin, never opened. Assume the same is true here',
    'until you have proved otherwise with commands.',
    '',
    'Work through this, and name FILES AND LINE NUMBERS, not impressions:',
    ' 1. MUST-READ FILES NEVER CITED. The digest lists them. For each, open it and say what a graph would',
    '    have gained. If the answer is nothing, say that too - a clean bill on a file is a real finding.',
    ' 2. FILES THE INVENTORY NEVER FOUND. Re-run your own searches, in BOTH guide directories, with',
    '    synonyms the mapper may not have tried. Do not trust the inventory\'s reading list.',
    ' 3. RAW <table> SWEEP. Run grep -c "<table" across both guide directories for every file plausibly',
    '    related to these two pages. For each hit, decide: settings table (must be captured) or',
    '    illustrative example (correctly skipped). Report anything in the first category that is not in',
    '    the graph, with its full row count.',
    ' 4. LONG CATALOG SWEEP. Any enumeration of 10+ entries in a relevant file that did not reach the',
    '    graph. Count the rows yourself. State the exact count the graph should carry.',
    ' 5. TRUNCATION. For every enumeration that DID reach the graph, count the source rows and compare.',
    '    Report every count mismatch as N-in-graph vs M-in-source.',
    ' 6. COMPRESSED RANGES. Find every "Custom 1 - 20" style range in these pages\' sources. Is it recorded,',
    '    and is its expansion recorded? Note en-dash vs hyphen.',
    ' 7. THIN PAGES. For any page recorded as thin or zero-field: is that HONEST (the corpus really does',
    '    not document it) or LAZY (documentation exists and was not found)? Prove which. If a page has no',
    '    documentary basis at all, say whether the node should exist - last run a zero-hit page node was',
    '    created and should not have been.',
    ' 8. NEW EXPERIENCE / LEGACY. Search filenames and bodies for new-experience and legacy variants of',
    '    these two pages. Any variant document that was built from the wrong twin is a real defect: the PO',
    '    Policy New Experience doc is 15,800 bytes against a 1,490-byte legacy stub, and Groups 1-2 were',
    '    built from the stub.',
    ' 8b. THE BOUNDARY, BOTH DIRECTIONS - THE HIGHEST-VALUE THING YOU CAN CHECK ON THIS RUN. Email',
    '    Reminders (built here) and the Workflows > Email Notifications tab (built in Run A, 14 email',
    '    fields) are two surfaces that both email approvers. Read the built fields out of the graph with',
    '    python3 and answer BOTH directions with commands: (a) did anything documented as a REMINDER get',
    '    dropped because it looked like a notification? (b) did anything documented as a NOTIFICATION get',
    '    emitted here? Either is severe. A clean bill proved with commands is a real finding.',
    ' 8c. COUNT CALIBRATION. The recon estimated ~25 fields per page. An independent pre-flight recon put',
    '    Email Reminders nearer 21 controls plus buttons, and Delegate Configurations nearer 11-13 UNIQUE',
    '    controls once aliases are collapsed - notably lower than 25. Treat neither number as a target.',
    '    If Delegate Configurations came back at 25, look hard for the same control counted under two or',
    '    three labels. If Email Reminders came back near 15, check whether the buttons and the Rules-tab',
    '    trio were dropped. THE MEASURED TABLE BASELINE: both page sets return ZERO for grep -c "<table"',
    '    and ZERO for grep -c "<tr", so a zero raw-table census is the EXPECTED answer here and is not',
    '    evidence of a lazy sweep. And remember cell-openers are not rows.',
    ' 9. UNDETERMINED BY THE DOCUMENTATION. Rank the places where the corpus genuinely cannot answer the',
    '    question - contradictions between topics, provisioning-dependent lists, structures described but',
    '    never enumerated. These are properties of the corpus, NOT a to-do list against a live tenant, and',
    '    recording them accurately is part of the deliverable.',
    '',
    CRITIC_CONTEXT,
    '',
    '=== OUTPUT ===',
    'Write a thorough markdown critique to ' + PARTS + '/critic-completeness.md, organised by the nine',
    'headings above, citing files and counts throughout. Then return the receipt with the findings that',
    'would actually change the graph, most severe first. Set lens to "completeness".',
  ].join('\n'), { label: 'critic:completeness', phase: 'Critic', model: 'opus', effort: 'xhigh', schema: CRITIC_RECEIPT_SCHEMA }),

  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: ADVERSARIAL CRITIC - CORRECTNESS (what is WRONG) ===',
    'You are the last gate before this group is merged into a permanent graph. Your predecessor found, on',
    'a build that had already passed three adversarial rounds: 16 of 18 value sets attached to nothing;',
    'three fields duplicated onto a page with no documentation placing them there; seven fields belonging',
    'to a separate import tool filed under the wrong page; a survivor kept whose quote was a reformatted',
    'table while its verbatim twin was dropped; and two invented "Yes" values completing toggles the corpus',
    'only describes one side of. Hunt the same classes here.',
    '',
    'Work through this, and show the commands:',
    ' 1. QUOTE FIDELITY. Take every field in every roster and grep -F its sourceQuote against its cited',
    '    file. Report every miss. This is mechanical; do it exhaustively, with a script, not by sampling.',
    ' 2. INVENTED VALUES. For every validValues entry and every value-set entry, confirm the string appears',
    '    in the cited file. Any value that does not is an invention and the highest-severity defect class',
    '    in this project. Pay special attention to any two-value Yes/No pair where the corpus describes',
    '    only one side.',
    ' 3. VALUE-SET WIRING. For every set in synth-valuesets.json, confirm appliesToField is EXACTLY a field',
    '    "name" in the roster for appliesToPage. Report every set that would land unwired, and say what its',
    '    correct owner is - or that it has none.',
    ' 4. PAGE OWNERSHIP. For each field, grep the corpus for its distinctive label and check what page the',
    '    hits actually describe. Report every field whose documentation places it somewhere else. Then',
    '    check the reverse: does any field name here collide with a DIFFERENT control of the same name on',
    '    another page in the graph?',
    ' 5. DUPLICATE NAMES AND DUPLICATE CONTROLS - NOT THE SAME CHECK, AND THIS IS THE HIGHEST-VALUE',
    '    ITEM ON YOUR LIST. A duplicate NAME within one page is a hard validator ERROR and the tooling',
    '    catches it. A duplicated CONTROL across two pages is INVISIBLE to bin/validate-graph.py and is',
    '    the exact defect this run exists to avoid.',
    '    (a) WITHIN Email Reminders: its two tabs BOTH document Name, Reminder Type and Editable By.',
    '        Confirm the roster kept them distinct (rule_* prefixes) rather than merging them to duck the',
    '        error - and confirm it did NOT reconcile their genuinely different Reminder Type option',
    '        lists, which are a grounded contradiction, not a defect.',
    '    (b) ACROSS to the built WORKFLOWS EMAIL NOTIFICATIONS tab, which owns 14 email-related fields',
    '        including email_subject, email_body, email_notification_name, email_notification_type,',
    '        email_notification_display_as_from and email_notifications_field. "Email Subject" is',
    '        documented on BOTH surfaces - grep -rlF "Email Subject" returns',
    '        add-an-email-notification-c237a2de.md (built, Workflows) AND',
    '        create-email-reminders-604c4a46.md (this run). For EVERY such field state whether this page',
    '        presents its OWN control or the record is the same value written twice, and whether the',
    '        roster SAID so in notes naming the sibling field id.',
    '    (c) HARD RULE, MECHANICALLY CHECKABLE - RUN IT AND REPORT ANY HIT AS SEVERE: no field on page',
    '        "Email Reminders" may cite add-an-email-notification-c237a2de.md,',
    '        modify-an-email-notification-a6e5f4ba.md or',
    '        select-an-email-notification-in-the-workflows-tab-663bb8ac.md, and no field on page',
    '        "Delegate Configurations" may cite delegate-self-approval-1b627285.md. All four are',
    '        Workflows-owned.',
    ' 6. WRONG DROPS. Read each roster\'s "dropped" array and each refuter\'s reasoning. Was anything real',
    '    dropped? Apply the calibration rule: a row in a documented field table IS a field, and a terse',
    '    description or an inferred type is not grounds to refute. Name any drop you would reverse.',
    ' 7. REPAIR DISCIPLINE. Did any roster emit more records than it was given inputs, or a name that was',
    '    not in its keep/repair lists? Records created during Repair never face the refuter, so any such',
    '    addition must be treated as unverified and named here. Also review splitsProposed on their merits.',
    ' 8. fromRawHtmlTable FLAGS. grep -c "<table" every cited file and report every false flag.',
    ' 9. DEPENDENCIES AND STEPS. Does each edge\'s quote actually STATE the relationship, or merely mention',
    '    both fields? Do endpoint page and field names match the graph and the rosters EXACTLY (a mistyped',
    '    endpoint silently fails to resolve)? Do step rationales say what breaks if run out of order, and is',
    '    each honestly marked CORPUS-STATED or INFERRED? Are step ids prefixed grpworkflows-b (NOT bare',
    '    grpworkflows-s, which Run A already occupies at s1-s7 - a collision there is a duplicate node id)?',
    '10. UNEARNED uiVariant CLAIMS. "both" means someone actually read both variants and they matched.',
    '    "undifferentiated" means nobody checked. Report every "both" that was not earned - three unearned',
    '    ones are already outstanding debt on Audit Rules.',
    '',
    CRITIC_CONTEXT,
    '',
    '=== OUTPUT ===',
    'Write a thorough markdown critique to ' + PARTS + '/critic-correctness.md, organised by the ten',
    'headings above. Be specific enough that each finding can be acted on without re-deriving it: name the',
    'field, the file, the line, the exact wrong string and the exact right one. Then return the receipt',
    'with the findings that would actually change the graph, most severe first. Set lens to "correctness".',
  ].join('\n'), { label: 'critic:correctness', phase: 'Critic', model: 'opus', effort: 'xhigh', schema: CRITIC_RECEIPT_SCHEMA }),
])

// ---------------------------------------------------------------------------
// return a COMPACT summary - the bulk stays on disk for deterministic assembly
// ---------------------------------------------------------------------------
return {
  group: GROUP,
  corpusVersion: '2026_08',
  partsDir: PARTS,
  files: {
    mapNavigationMd: PARTS + '/map-navigation.md',
    mapInventoryMd: PARTS + '/map-inventory.md',
    rosters: built.map((b) => b.roster),
    extracts: built.flatMap((b) => b.extractFiles),
    valueSets: PARTS + '/synth-valuesets.json',
    dependencies: PARTS + '/synth-dependencies.json',
    steps: PARTS + '/synth-steps.json',
    contradictions: PARTS + '/synth-contradictions.json',
    ranges: PARTS + '/synth-ranges.json',
    criticCompleteness: PARTS + '/critic-completeness.md',
    criticCorrectness: PARTS + '/critic-correctness.md',
  },
  pages: digest.map((d) => ({
    page: d.page,
    documentedBasis: d.documentedBasis,
    coverage: d.coverage,
    uiVariant: d.uiVariant,
    fields: d.fieldCount,
    dropped: d.droppedCount,
    repaired: d.repairedCount,
    splitsProposed: d.splitsProposed.length,
    mustReadNeverCited: d.mustReadNeverCited,
    lensHeadlines: d.lensHeadlines,
  })),
  synthesis: {
    valueSets: vsRec || null,
    dependencies: depRec || null,
    steps: stepRec || null,
    contradictions: ctrRec || null,
  },
  critics: {
    completeness: criticA || null,
    correctness: criticB || null,
  },
  navPages: (nav && nav.pages) ? nav.pages : [],
  navNarrative: (nav && nav.narrativeMarkdown) ? nav.narrativeMarkdown.slice(0, 6000) : '',
  inventoryNarrative: (inventory && inventory.narrativeMarkdown) ? inventory.narrativeMarkdown.slice(0, 6000) : '',
}
