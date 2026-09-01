// =============================================================================
// Concur Invoice KG — AUTHORIZED APPROVAL LIMITS, 2026-09-01.
// ONE page. Adapted from workflows/2026-08-31_kg-workflows-run-a.mjs (20 agents, 0 errors,
// 121 fields, validator exit 0). Only the per-group knobs were turned. The PREAMBLE, the
// hard-won rules, the lens charters, the refuter framings, the Repair cap and the schemas are
// accumulated method and were NOT thinned out.
//
// WHY THIS PAGE EXISTS, AND WHY IT IS ITS OWN GROUP
// The Workflows page recon's two critics SPLIT on it. The completeness critic said add it; the
// page-hood critic endorsed a four-page roster without it. That split was adjudicated:
//   * Completeness was RIGHT ON THE FACT. The recon roster deferred this surface claiming the
//     corpus defers it to an external Shared guide. That claim is FALSE — user-administrator-
//     fcfd570c.md (4,603 B) and user-administration-8b167b96.md (2,314 B) document it directly,
//     with an explicit click path, a role gate and named fields. The per-user approval LIMIT,
//     the value that decides whether limit-approval can happen at all, had no home in the graph.
//   * Page-hood was RIGHT ON THE ACTION. It is not an Administration > Invoice page, and every
//     one of the 22 built pages is. So it was NOT smuggled into the Workflows build.
// Luke made the scope call on 2026-09-01: build it, as its own narrowly-scoped group.
//
// SCOPE — THIS IS CORE CONCUR INVOICE CONFIG, NOT A BORROWING FROM ANOTHER PRODUCT
// Corrected 2026-09-01 (Luke, and the corpus agrees). An earlier draft of this header argued the
// page sat "outside" the Invoice admin surface because its click path is Administration > Company.
// THAT REASONING WAS WRONG: it used MENU LOCATION as a proxy for PRODUCT SCOPE. navPath is a
// navigation fact and says nothing about which product's configuration surface a control belongs
// to. The correct test is: DOES THIS CONTROL GOVERN INVOICE BEHAVIOUR?
// It does, and the mechanism is Concur Invoice's NON-PO capability. A PO-based invoice carries its
// authority on the purchase order; a NON-PO invoice has no PO to carry it, so approval authority
// has to come from the approver's authorization limit — which is what this window sets.
// The corpus states the direction outright, grep -F verified:
//   "All workflow options available for non-PO policies are also available to a PO-based invoice
//    policy. This includes options such as workflow rules and Authorized Approvers."
//    (tools-guides/workflow-and-approval-routing-8b4ff6c9.md)
//   -> Authorized Approvers is a NON-PO policy option FIRST, extended to PO-based. Corroborated by
//      procedure-2d20b513.md ("control invoice workflow authorization"),
//      step-2-activate-the-authorized-approver-feature-c87493ee.md ("control invoice approval
//      processes ... setting approval or exception limits") and
//      authorized-approvers-overview-8b3bd2d0.md ("An authorized approver can have limit approval").
// So this is Invoice configuration REACHED THROUGH a Company menu. Record the click path faithfully
// — a driver needs it — but do NOT frame the page as out-of-product in any note you write.
//
// STILL SCOPED TO ONE PAGE. Employee Import and the general User Administration surface stay OUT,
// not because of their menu but because both defer to external Shared guides absent from this
// corpus — a documentary gap, not a scope judgement. If you find yourself adding a second page
// here, stop and ask.
//
// ONE HONEST COUNTER-SIGNAL, recorded rather than suppressed:
// direct-approval-under-limit-based-cost-object-approval-1d8b6bca.md sits in the INVOICE corpus but
// is worded for Concur Expense ("allows Concur Expense to route cost object approvals"). Limit-based
// approval is a mechanism SHARED across both products. That does not make the Invoice side someone
// else's config, but if a topic speaks in Expense's voice, say so in notes rather than restating it
// as an Invoice claim.
//
// THE CENTRAL RISK, AND IT IS NOT A SMALL ONE — READ BEFORE THE BUILD
// The built Workflows page ALREADY carries, on its Authorized Approvers > Authorized Approver
// List tab: `authorized_approver_approval_limit` (label "Approval Limit"),
// `authorized_approver_level` ("Level"), `authorized_approver_can_approve_exception`
// ("Can approve exception") and `authorized_approver_list_approver` ("Approver"), all from
// authorized-approver-list-a9522ec8.md. The corpus says the SAME VALUE has THREE setter
// surfaces: "The amount is set for each approver in the Authorized Approver List, in User
// Administration, or in the employee import." (configuration-8b3be88b.md).
// So the question this build must answer is NOT "what fields are on this page" but "which of
// these controls are genuinely a DIFFERENT surface, and which are the same value written down
// twice". A duplicate here is invisible to bin/validate-graph.py — it checks quotes against
// files, never controls against pages. That is the whole reason this is a pipeline run and not
// four hand-written nodes.
//
// url: '' — the corpus publishes NO .asp URLs and there is no live-UI observation for this page.
// The click path is the only navigation knowledge that will exist.
//
// GROUP LABEL is 'Approval Authority' and deliberately carries no "Group N":
// merge-group.py derives gtag from /Group (\d+)/, so any label reusing an existing number would
// mint dep ids colliding with a built group — and a non-patch merge under an EXISTING label deletes
// that group's fields (the repo's sharpest footgun). 'Group 2 — Routing & Approval' and 'Workflows'
// are both taxonomically plausible homes and both are UNSAFE for that reason.
// gtag = 'approval-authority', step prefix 'grpapproval-authority-'.
// It is a NEW label, so the merge runs WITHOUT --patch and touches nothing already in the graph.
// The label names the CAPABILITY (approval authority for non-PO invoices), not the menu.
//
// See docs/2026-08-31_HANDOFF-KG-BUILD-v2.md and docs/SCHEMA.md.
// =============================================================================

export const meta = {
  name: 'kg-authorized-approval-limits',
  description: 'Concur Invoice KG - Authorized Approval Limits (Administration > Company > User Administration)',
  phases: [
    { title: 'Map', detail: 'page identity + navPath evidence, and an exhaustive must-read file inventory with a raw <table> census' },
    { title: 'Extract', detail: '1 page x 3 lenses: procedures / reference tables and long catalogs / tools-guides and cross-cutting' },
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
const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/7a585e6d-f82b-458a-aa77-3ab10457ee03/scratchpad/aal-parts'
const GROUP = 'Approval Authority'

const PAGES = [
  {
    id: 'authorized-approval-limits',
    name: 'Authorized Approval Limits',
    url: '',
    seeds: 'SMALL, PROSE-ONLY, AND THE WHOLE JOB IS A BOUNDARY QUESTION. ~5 core files, ~11,000 bytes, ZERO raw <table> elements and ZERO markdown table rows on either primary (measured: grep -c "<table" and grep -cP "^\\s*\\|" both return 0 on user-administrator-fcfd570c.md and user-administration-8b167b96.md). Every field lives in procedure prose. Expect ROUGHLY SEVEN fields. Do not manufacture more. ### SEEDS, richest first. AN INDEPENDENT CORPUS RECON (2026-09-01) EXTENDED THIS LIST: the original five did NOT include a single file that DECIDES the boundary or the page identity, which is the whole job. All paths are admin-guides unless marked. (1) user-administrator-fcfd570c.md (4,603 B - THE PRIMARY: click path, role gate, BOTH branch renderings, the field roster). (2) user-administration-8b167b96.md (2,314 B - the second independent attestation, and the ONLY source of the precedence rule). (3) authorized-approver-list-a9522ec8.md (3,773 B - THE SIBLING SURFACE. It owns all four colliding controls and you MUST open it to reason about them - but its own click path is Administration > Invoice > Workflows, so NOTHING may be sourced from it as a field on this page. Boundary evidence only.) (4) global-group-vs-authorized-approver-hierarchy-8a960238.md (2,247 B, 25 pipe rows - DECIDES PAGE IDENTITY: its step-4 row marks User Administration X in BOTH the Global-group and the hierarchy column). (5) step-4-assign-the-proper-rights-to-users-86389a18.md (1,521 B - DECIDES same-value-different-surface: "Regardless of how the authorized approvers are entered into Invoice, they all appear in the Authorized Approver List."). (6) filter-authorized-approvers-by-workflow-approval-step-aae69350.md (6,234 B, raw <table> - DECIDES the Level boundary and CONTRADICTS 8b167b96 outright). (7) step-2-assign-the-level-to-the-approver-d8bf669c.md (1,751 B - employee import record type 720). (8) employee-import-e28f2294.md (1,763 B - record set 710 and the ONLY documented value domains for the amount/currency pair). (9) step-4-assign-the-proper-rights-to-users-82481079.md (1,107 B). (10) edit-authorized-approver-information-8b3c119a.md (1,499 B - an edit takes effect immediately on save and in-flight invoices are re-evaluated). (11) remove-authorized-approvers-8b3c5273.md (1,859 B). (12) level-based-approvals-and-limit-based-approvals-b335cf33.md (1,767 B). (13) configuration-8b3be88b.md (1,213 B - THE THREE-SETTER SENTENCE, see below). (14) definition-of-amount-for-limit-approval-06806875.md (2,038 B). (15) setting-an-unlimited-approval-amount-9d98b489.md (988 B - the null semantics). (16) procedure-2d20b513.md (1,554 B). (17) tools-guides/workflow-and-approval-routing-8b4ff6c9.md - the scope sentence. ### TWO OF THESE ARE ZERO-FIELD SEEDS AND THE VERDICT IS ALREADY ESTABLISHED - DO NOT RE-DERIVE IT: procedure-2d20b513.md carries exactly THREE controls and ALL THREE are already built on Workflows (authorized_approver_feature_available_for_workflows, minimum_exception_level, maximum_exception_level). It is the DEPENDENCY source here - the feature gate - and yields ZERO fields. definition-of-amount-for-limit-approval-06806875.md is a pure SEMANTICS topic defining what "amount" means; it yields ZERO fields, and its only control reference, "Restrict approvers to those with limit authority", is ALREADY HOMED TWICE on Workflows, so emitting it here would be a third copy. Cite both for notes and dependencies, never as a sourceFile for a new field. ### TITLE COLLISION - DO NOT OPEN BY NAME: admin-guides/user-administrator-5aa3eb5e.md (1,432 B) carries the SAME title "User Administrator" as the primary but documents the Invoice Delegates / Purchase Request Delegates links. OUT OF SCOPE. Its existence is useful evidence for identityNotes: User Administration hosts several independent links, so THIS page is the Authorized Approval Limits link and its window, not the User Administration tool. ALSO SWEEP for "Approval Limit" and "Authorized Approval Limits" across BOTH guide directories yourself; the seed list is a FLOOR, not a ceiling, and the recon that produced it was not aimed at this page. ### THE CLICK PATH, and note it is NOT under Administration > Invoice: "Administration > Company > Company Admin > User Administration", then the "Authorized Approval Limits" link in the "Expense and Invoices Setting section". Verbatim anchors, both grep -F verified: "If the Authorized Approver feature is activated and the company\'s Authorized Approver hierarchy has at least one level (in addition to Global), then the Authorized Approval Limits link appears in the Expense and Invoices Setting section in Administration > Company > Company Admin > User Administration." and "The Authorized Approval Limits window appears." THE LINK IS CONDITIONALLY VISIBLE - it appears only when the Authorized Approver feature is activated AND the hierarchy has at least one non-Global level. That conditionality is load-bearing for a driver and must become a dependency, not a footnote. ### ROLE GATE - THREE CONDITIONS, NOT TWO. For the CHECK BOX (branch A), verbatim: "the user must have the User Admin rights and the Invoice User Administration rights" - two rights, not one. For the LINK (branch B), fcfd570c adds a THIRD: "In addition, the employee must be an approver." Capture all three, each verbatim. ### #### THE CENTRAL JUDGEMENT OF THIS RUN - READ IT TWICE, IT IS WHY THIS IS A PIPELINE RUN AND NOT FOUR HAND-WRITTEN NODES #### The built WORKFLOWS page ALREADY OWNS four controls with labels that collide with this page: authorized_approver_approval_limit (label "Approval Limit"), authorized_approver_level ("Level"), authorized_approver_can_approve_exception ("Can approve exception") and authorized_approver_list_approver ("Approver") - all sourced from authorized-approver-list-a9522ec8.md, i.e. the Workflows > Authorized Approvers > Authorized Approver List TAB. And the corpus states plainly that ONE value has THREE setter surfaces: "The amount is set for each approver in the Authorized Approver List, in User Administration, or in the employee import." (configuration-8b3be88b.md). SO THE QUESTION IS NOT "what fields are on this page". It is: FOR EACH CONTROL, is this a genuinely DIFFERENT surface, or the SAME VALUE written down twice? Answer it per field, out loud, in notes, citing the file that decides it. A field that is the same value reachable from another surface should be emitted ONLY if this window genuinely presents its own control for it - and if you emit it, say explicitly in notes that Workflows carries a sibling control for the same underlying value, and name the sibling. If you cannot tell, say so; "undetermined by the documentation" is a correct and valuable answer here. DO NOT silently create a fifth "Approval Limit". A duplicate is INVISIBLE to bin/validate-graph.py - it checks quotes against files, never controls against pages - and it is exactly the defect class that cost Group 5A five mis-homed fields. ### FIELDS THE RECON CRITIC NAMED (a starting point, each still to be verified and boundary-tested): the Authorized Approver check box, Manager Approval Limit, Approval Limit Currency, a hierarchy Level field, a Can approve exception check box, a currency + Amount pair, and a stated PRECEDENCE RULE between the Approval Limit area and the Level field. That precedence rule is the single most valuable thing on the page for a config writer - capture it verbatim and emit it as a dependency. ### VALUE SEMANTICS, DOCUMENTED AND UNUSUAL - capture both, they are not the same claim: 0 means the approver is in the chain but has NO final authority; a NULL/blank amount means UNLIMITED (setting-an-unlimited-approval-amount-9d98b489.md). A driver that treats blank as "unset" rather than "unlimited" configures the opposite of what was intended. ### BUT KNOW THIS BEFORE YOU CAPTURE THEM, OR YOU WILL MISTAKE OLD NEWS FOR A FINDING: the BUILT field field.workflows.authorized-approver-approval-limit ALREADY records both semantics in its notes AND already cites setting-an-unlimited-approval-amount-9d98b489.md - one of your own seeds. So capturing them here is NOT automatically new information. What IS distinct and worth capturing is that this surface states the 0 rule against TWO DIFFERENT LABELS - "You can enter 0 in the Manager Approval Limit field" (branch A) and "You can enter 0 in the Amount field" (branch B), both in fcfd570c. If you emit an approval-limit record here, its justification must be the DIFFERENT LABEL and the DIFFERENT SURFACE, named in notes with the sibling field id - never the value semantics alone. ### AND THE UNLIMITED RECIPE IS NOT THE SAME ON BOTH SURFACES: a9522ec8 (Workflows) requires TWO acts, "set to no approval limit currency, and leave the approval limit amount blank"; 8b167b96 (this window) states ONE, "For an unlimited approval amount, leave blank (null)." - the currency step is not mentioned. 9d98b489 is surface-agnostic and also states one act. Whether the currency must ALSO be cleared here is UNDETERMINED by the documentation. Say so explicitly rather than importing the Workflows recipe. The ZERO semantics, by contrast, are uniform across all four attestations and can be stated flatly. ### THIS PAGE IS OUT OF THE INVOICE MENU BUT IT IS NOT OUT OF INVOICE SCOPE - do not confuse the two. It is the FIRST page in this graph not reached under Administration > Invoice, and that navigational fact matters enormously to a driver, so record it plainly in identityNotes. But it configures CONCUR INVOICE: the Authorized Approver mechanism is a NON-PO policy workflow option (a PO-based invoice carries authority on the purchase order; a non-PO invoice has none, so the approver\'s limit IS the authority), stated verbatim in tools-guides/workflow-and-approval-routing-8b4ff6c9.md: \'All workflow options available for non-PO policies are also available to a PO-based invoice policy. This includes options such as workflow rules and Authorized Approvers.\' Frame identityNotes as \'Invoice configuration reached through the Company admin menu\', never as out-of-product. Do NOT let it drag in neighbours: Employee Import and the general User Administration surface are OUT OF SCOPE - both defer to external Shared guides absent from this corpus. The employee-import half of the three-setter sentence is a forward reference, not a page. ### uiVariant = "undifferentiated", and this is MEASURED, not assumed: 8 *-new-experience-* / *-legacy-* / *-classic-* files exist corpus-wide and NONE touches this surface; grep -rilF "Authorized Approval Limits" piped through grep -ilE "new experience|legacy|classic" returns ZERO. ONE HEDGE to record in notes and NOT to act on: tools-guides/how-single-step-approval-workflow-works-40145f24.md says the amounts are set via "the Authorized Approvers link from workflows in the classic interface" - that describes the WORKFLOWS SIBLING surface, not this window. Do not turn it into a fourth unearned "both" claim. ##### ADDENDUM, FROM AN INDEPENDENT PRE-FLIGHT CORPUS RECON RUN 2026-09-01. Every claim below was grep -F verified before it was written here. It is not a substitute for your own reading - it is a floor you must beat and a set of traps you would otherwise pay for. ##### ### (A) PAGE IDENTITY - BRANCH A vs BRANCH B, AND THREE OF THE SEVEN FIELDS HANG ON IT. fcfd570c documents TWO MUTUALLY EXCLUSIVE RENDERINGS of one section. BRANCH A, Global group only: an "Authorized Approver" CHECK BOX appears INLINE, revealing "the Manager Approval Limit field and the Approval Limit Currency list". THERE IS NO Authorized Approval Limits WINDOW AT ALL in that configuration, and it is limit-only ("This method is used only for limit-based authorized approvers. It cannot be used for exception-based authorized approvers."). BRANCH B, hierarchy with at least one non-Global level: the LINK appears and opens the window. THE RECON VERDICT, ~75% confidence, to TEST rather than adopt: ONE page - because 8a960238 puts User Administration in a SINGLE step-4 row marked X under BOTH branch columns, and one topic covers both under one lead sentence. If you agree, emit branch A three controls on this page WITH explicit conditional visibility ("Global group only; in this configuration the Authorized Approval Limits window does not exist") and a mutual-exclusion relationship against branch B. Do NOT create a second page - no corpus topic names one. Record the tension in identityNotes. Branch A is SINGLE-SOURCED: grep -rn -F "Manager Approval Limit" returns fcfd570c and nothing else, so there is no second attestation to wait for and dropping it for want of corroboration would be a real loss, not caution. ### (B) THE APPROVAL LIMIT SHAPE DIFFERS BY SURFACE. THIS IS THE FINDING, NOT A NUANCE. Workflows/a9522ec8 = ONE field literally named "Approval Limit" ("You can enter 0 in the Approval Limit field"). THIS WINDOW = an unnamed "Approval Limit area" (8b167b96) holding TWO controls: a currency selector and an "Amount" field - fcfd570c names only "the Amount field". BRANCH A = two further, differently-named controls, "Manager Approval Limit field" + "Approval Limit Currency list". So emit TWO controls for the window and TWO for branch A, and NEVER emit a field labelled "Approval Limit" on this page: no such control is documented here, and that exact label is the duplicate this run exists to avoid. ### (C) THE LEVEL FIELD IS CONTESTED - DO NOT RESOLVE IT SILENTLY. 8b167b96 puts a Level control in this window ("For level-based cost object approval, select a level."); aae69350 states the opposite ("Levels cannot be added to approvers via User Administration." and "The levels can be added to users via the Employee Import or the Authorized Approver list"). BOTH grep -F verify. The reconciliation the corpus supports - state it as a HYPOTHESIS, never as a resolution - is that these are TWO DIFFERENT VALUES SHARING A LABEL: the Workflows Level is the authorized-approver step filter (employee import record type 720, per d8bf669c; Authorized Approver Hierarchy), while this window Level is the level-based COST OBJECT approval level (record set 710, per employee-import-e28f2294.md; Cost Object Approver Hierarchy). If you emit it, give it a DISTINCT name such as cost_object_approval_level and NEVER present it as a sibling of field.workflows.authorized-approver-level. Record the aae69350 sentence verbatim as an unresolved contradiction. ### (D) ONE OF THE FOUR COLLISIONS HAS A CLEAN NEGATIVE: "Approver" IS NOT ON THIS PAGE. On Workflows/a9522ec8 you SELECT an approver because you are creating a list row via New. In User Administration the approver is the RECORD CONTEXT: you arrive having already searched for and opened that user ("User Administration (Search & Select)" in 20294611; "With the user loaded in the form" in f772bed1). Neither primary names an Approver control anywhere in its full description of the window. Do NOT emit an Approver field. Record the negative in identityNotes - a confirmed negative is as valuable here as a positive and much cheaper to state than to re-derive. ### (E) THE EXCEPTION PARENTHETICAL IS A SCOPE FENCE, NOT A DELETE ORDER. fcfd570c: "(The actual exception levels apply to all authorized approvers and are defined on the Authorized Approvers tab in Workflows.)" That SETTLES a split: the PER-APPROVER boolean "Can approve exception" is set HERE, while the TENANT-WIDE min/max exception RANGE is set on Workflows. KEEP the check box AND emit a dependency on the built field.workflows.minimum-exception-level / maximum-exception-level. Corroborated from a different file by configuration-8b3be88b.md, which also introduces a tab-name drift worth recording: fcfd570c writes "Authorized Approvers tab", 8b3be88b writes "Authorized Approver tab". ### (F) THE THREE-SETTER CLAIM IS CORROBORATED FIVE TIMES, so your boundary verdict is CORPUS-STATED rather than inferred: configuration-8b3be88b.md (the amount sentence), 86389a18 ("three ways to enter and define authorized approvers" AND the decisive "Regardless of how the authorized approvers are entered into Invoice, they all appear in the Authorized Approver List."), 82481079, 8b3c119a and 8b3c5273. VERDICT TO ADOPT: the surfaces are DISTINCT UI PRESENTATIONS WRITING ONE UNDERLYING PER-APPROVER RECORD. So emit this window controls as real fields, each carrying a note that names its Workflows counterpart by exact field id and cites the 86389a18 sentence as the reason. ### (G) VERBATIM TRAPS - COPY BYTES, NEVER RETYPE. Three quotes on this page will fail grep -F if you type them the natural way. (a) A CORPUS TYPO: 8b167b96 reads "needs to have at least on level" (missing e); the correct-English form returns 0. (b) 8b167b96 uses the CURLY apostrophe U+2019 while fcfd570c uses ASCII - the two primaries differ, so never carry an apostrophe across files. (c) THE PRECEDENCE RULE, the most valuable sentence on the page, contains TWO EM DASHES U+2014: "The cost object configuration defines the type[EMDASH]either limit or level. If you complete both areas in this window[EMDASH]the Approval Limit area and the Level field[EMDASH]Concur Invoice will use the one that applies to your configuration and ignore the other." ([EMDASH] marks where the real bytes are U+2014; this brief cannot carry them safely.) ASCII hyphens return 0. EXTRACT EVERY sourceQuote WITH sed OR awk FROM THE FILE ITSELF, then confirm with grep -F -c before you write it. ### (H) THE SECTION LABEL DRIFTS THREE WAYS - RECORD, DO NOT RECONCILE. "Expense and Invoices Setting section" (fcfd570c, 1 file); "Expense and Invoices Settings section" (8b167b96, 1 file); "Expense and Invoice Settings" (4 files, the corpus-MAJORITY form, confirmed by fields-overview-5e3daf7c.md and f772bed1 to name the same section of the User Details page). The brief above pins the rarest variant. Emit the branch-attached form as primary and the other two as aliases, with the file count behind each. A driver searches the page for that label. ### (I) EMPLOYEE IMPORT IS OUT OF SCOPE AS A PAGE - it defers to the external Shared: Employee Import Specification, absent from this corpus - BUT employee-import-e28f2294.md is the ONLY source for the VALUE DOMAINS of the amount/currency pair this page sets: "Numeric", "Specified in the approval limit currency. If used, then Approval Limit Currency Code below is required.", and "3 characters ... must be a valid currency in the list of system (reimbursement) currencies". Cite it for value domains and notes. Never emit an employee-import field. ### (J) THE EXPECTED SHAPE, from a roster the recon built from the corpus BEFORE reading this brief: EIGHT controls, or SEVEN if the left-side hierarchy selector is treated as navigation rather than a control. BRANCH B: hierarchy level selector (left side, attested twice), Can approve exception, currency, Amount, Level [CONTESTED - see (C)]. BRANCH A: Authorized Approver check box, Manager Approval Limit, Approval Limit Currency. Treat that as the expected shape, not a quota: if your honest reading lands elsewhere, say so and show why. ONE ASYMMETRY TO STATE EITHER WAY: the built Workflows page did NOT emit a left-side group/level selector even though a9522ec8 and d8bf669c describe the same picker there. Emitting one here is defensible - it is an explicit procedure step attested twice - but say plainly in notes that the Workflows sibling exists and was not emitted.',
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
      'MEASURED CENSUS FOR THIS PAGE, so you can tell a thin corpus from a lazy sweep: both primaries (user-administrator-fcfd570c.md, user-administration-8b167b96.md) are GENUINELY TABLE-FREE - 0 raw <table>, 0 markdown pipe rows. The field roster really does live in prose, and an empty output from this lens is a legitimate result. But do not stop there: TWO files in the wider candidate set carry raw <table> - filter-authorized-approvers-by-workflow-approval-step-aae69350.md (6,234 B; it decides the contested Level boundary) and additional-approver-situations-fbb5034c.md (8,664 B) - and the pipe-table files include global-group-vs-authorized-approver-hierarchy-8a960238.md (25 rows; it decides page identity) and employee-import-e28f2294.md (19 rows; the ONLY documented value domains for the amount/currency pair). ROW-COUNT TRAP: on aae69350 grep -c "<tr" returns 1 and LIES; grep -o "<tr" | wc -l returns 3. Count with grep -o, never grep -c.',
    ].join('\n'),
  },
  {
    key: 'crosscut',
    label: 'tools-guides and cross-cutting',
    model: 'opus',
    effort: 'medium',
    charter: [
      'LENS C - TOOLS-GUIDES AND CROSS-CUTTING. This lens is the standing guard against admin-guides skew. Of 607 fields in the graph so far, only ~60 cite tools-guides. That ratio is a bug, not a fact about the corpus. FOR THIS PAGE SPECIFICALLY: it is admin-guides-SOURCED for fields but tools-guides carries the sentence that puts it IN SCOPE, so this lens is load-bearing here even though it will emit few or no fields. This page is NOT under Administration > Invoice, so "Invoice Processing Admin" is useless - do NOT search it, and do not search the bare word "workflow". THREE tools-guides files corroborate this page and exhausting them is your job: (1) workflow-and-approval-routing-8b4ff6c9.md - the scope sentence, "All workflow options available for non-PO policies are also available to a PO-based invoice policy. This includes options such as workflow rules and Authorized Approvers." Read it FIRST. (2) how-single-step-approval-workflow-works-40145f24.md - the Approval Limit value for the Invoice Approver, the deferral to the external Shared: User Administration User Guide, and a "classic interface" phrasing that is about the WORKFLOWS sibling surface, not this window; the built Workflows page ALREADY cites this file, so use it for corroboration and NEVER as a field source here. (3) before-you-begin-3c458d83.md - prerequisites, user role plus approval limits. Search "Approval Limit", "authorized approver", "limit approval", "exception limit", "User Administration" and "Expense and Invoices Setting". Also read direct-approval-under-limit-based-cost-object-approval-1d8b6bca.md, which sits in the INVOICE corpus but is worded for Concur Expense - limit-based approval is a mechanism SHARED across both products; if a topic speaks in Expense\'s voice, say so in notes rather than restating it as an Invoice claim.',
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
  '  directly off Administration. THAT IS AN Administration > Invoice FACT AND IT DOES NOT APPLY TO THIS',
  '  PAGE: this page is reached through Administration > COMPANY, and "Invoice Processing Admin" appears in',
  '  none of its documented paths. Never offer it as an alternate here. It stays in this preamble only',
  '  because dependency endpoints into already-built pages still need it.',
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
  '',
  '=== WORKFLOWS IS THE BOUNDARY THIS RUN EXISTS TO DRAW. READ ITS FIELDS BEFORE YOU EMIT ANYTHING. ===',
  'On its Authorized Approvers > Authorized Approver List tab it ALREADY carries four controls whose',
  'labels collide with this page, all from admin-guides/authorized-approver-list-a9522ec8.md:',
  '    field.workflows.authorized-approver-approval-limit         label "Approval Limit"',
  '    field.workflows.authorized-approver-level                  label "Level"',
  '    field.workflows.authorized-approver-can-approve-exception  label "Can approve exception"',
  '    field.workflows.authorized-approver-list-approver          label "Approver"',
  'It ALSO already consumed admin-guides/procedure-2d20b513.md - a candidate source for THIS page - for',
  'three fields: authorized_approver_feature_available_for_workflows, minimum_exception_level,',
  'maximum_exception_level. And it already owns the tenant-wide exception RANGE.',
  'Never re-home any of them. Never mint a fifth "Approval Limit" without saying, in notes, that Workflows',
  'carries a sibling control for the same underlying value, and naming the sibling by its exact field id.',
  'a9522ec8 own click path is "Administration > Invoice > Workflows", so ANY field sourced from that file',
  'belongs to Workflows, not here. Cite it for boundary reasoning; never as a new field\'s sourceFile.',
  '',
  '=== SCOPE, REVISED 2026-09-01. THIS SUPERSEDES THE 2026-08-31 EXCLUSION AND IS NOT UP FOR DEBATE. ===',
  'An earlier decision treated every surface under Administration > COMPANY as out of scope for this',
  'graph. THAT DECISION IS REVERSED. It used MENU LOCATION as a proxy for PRODUCT SCOPE, and navPath is a',
  'navigation fact that says nothing about which product a control configures.',
  'Authorized Approval Limits IS the page you are building. It configures Concur Invoice through the',
  'NON-PO capability: a PO-based invoice carries its approval authority on the purchase order, a non-PO',
  'invoice has none, so the approver authorization limit IS the authority. Stated outright in',
  'tools-guides/workflow-and-approval-routing-8b4ff6c9.md: "All workflow options available for non-PO',
  'policies are also available to a PO-based invoice policy. This includes options such as workflow rules',
  'and Authorized Approvers."',
  'It is the FIRST page in this graph not reached under Administration > Invoice, and that navigational',
  'fact matters enormously to a driver - record the click path faithfully. But NEVER write "out of scope",',
  '"not a page to build", or any equivalent about this page in any note, condition, rationale or verdict.',
  'The scope call was adjudicated by Luke on 2026-09-01 and the evidence is in this script header.',
  '',
  'STILL NOT BUILT (a forward reference may legitimately point at one of these and stay unresolved):',
  '  Email Reminders and Delegate Configurations (WORKFLOWS RUN B - next run, do NOT build them here),',
  '  Peppol Configuration, Shipping Configuration, Localization (Group 6),',
  '  the Employee Import, and the GENERAL User Administration user-profile surface - which is NOT this',
  '  window. Both of those defer to external Shared guides absent from this corpus: a DOCUMENTARY gap,',
  '  not a menu-location judgement. Keep the distinction straight in anything you write.',
  'The full graph is on disk at ' + KG + ' - read it with python3 when you need exact page or field names.',
  'It holds 22 pages / 607 fields and is ERROR-clean at 607/607 verbatim quotes. This run adds exactly ONE',
  'new page and must not rebuild or re-home anything already in it.',
].join('\n')

// ---------------------------------------------------------------------------
// PHASE 1 - MAP
// ---------------------------------------------------------------------------
phase('Map')
log('Authorized Approval Limits - mapping 1 page')

const [nav, inventory] = await parallel([
  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: MAP / PAGE IDENTITY AND NAVIGATION ===',
    'Establish, for the single page below, (a) that it exists as an admin page, (b) how',
    'it is reached by CLICKING, with a verbatim quote for every distinct path, (c) what it is called in',
    'the corpus under every alias, (d) which role gates it, and (e) how much of it the corpus documents.',
    '',
    'navPath is LOAD-BEARING, not the URL: a direct goto on an admin URL bounces via dcredirect, so',
    'pages are reached by clicking. The corpus publishes NO .asp URLs at all - zero hits corpus-wide for',
    'PolicyAdmin, auditRules, accountingAdmin, dcredirect. AND UNLIKE THE EARLIER GROUPS, THERE IS NO',
    'LIVE-UI OBSERVATION FOR THIS SURFACE EITHER - url is deliberately empty and that is the honest answer.',
    'The click path is the ONLY navigation knowledge this page will ever have, which is exactly why',
    'navPathEvidence matters more here than anywhere else in the build. Do not invent a URL.',
    '',
    'Emit EVERY distinct documented click path you find as a separate navPathEvidence entry, each with',
    'its own verbatim quote and file. Downstream tooling picks the longest, most-attested path and keeps',
    'the rest as alternates, so more distinct evidence is strictly better. Watch the text traps:',
    '"Administration >Invoice" without the space, and "Invoice Processing Admin" as a middle nav node.',
    '',
    'PAGE IDENTITY IS A REAL QUESTION HERE, AND IT IS NOT THE USUAL ONE. This page is ONE WINDOW reached',
    'from a LINK on a page you are NOT building. The corpus calls it a window, not a tool with a left-menu',
    'entry: "The Authorized Approval Limits window appears." Three questions you must answer out loud:',
    '',
    '  (a) IS THIS ONE SURFACE OR TWO? user-administrator-fcfd570c.md documents TWO MUTUALLY EXCLUSIVE',
    '      RENDERINGS of one section, and which one a tenant sees depends on its hierarchy:',
    '        BRANCH A - Global group ONLY: an "Authorized Approver" CHECK BOX appears INLINE in the Expense',
    '        and Invoices Setting section, and selecting it reveals "the Manager Approval Limit field and',
    '        the Approval Limit Currency list". THERE IS NO Authorized Approval Limits WINDOW AT ALL in this',
    '        configuration, and it is limit-only: "This method is used only for limit-based authorized',
    '        approvers. It cannot be used for exception-based authorized approvers."',
    '        BRANCH B - hierarchy has at least one level besides Global: the "Authorized Approval Limits"',
    '        LINK appears and opens the window.',
    '      A PRIOR INDEPENDENT RECON ADJUDICATED THIS AT ~75% CONFIDENCE: ONE page, because',
    '      global-group-vs-authorized-approver-hierarchy-8a960238.md puts User Administration in a SINGLE',
    '      step-4 row marked X under BOTH branch columns, and one topic covers both under one lead sentence.',
    '      TEST that against the corpus rather than adopting it; if you agree, emit branch A controls on this',
    '      page WITH explicit conditional visibility and a mutual-exclusion relationship against branch B.',
    '      Do NOT create a second page - no corpus topic names one. Record the tension in identityNotes.',
    '',
    '  (b) DOES THE LINK BELONG TO User Administration, OR IS THE WINDOW ITS OWN SURFACE? Record the path to',
    '      the LINK and to the WINDOW as separate navPathEvidence entries. Evidence that User Administration',
    '      is a CONTAINER rather than this page: it hosts several independent links, and',
    '      admin-guides/user-administrator-5aa3eb5e.md (1,432 B) carries the SAME TITLE "User Administrator"',
    '      as the primary but documents the Invoice Delegates / Purchase Request Delegates links instead.',
    '      That file is OUT OF SCOPE - do not open it by name and do not mine it - but its existence is real',
    '      evidence for identityNotes: THIS page is the Authorized Approval Limits link and its window, not',
    '      the User Administration tool.',
    '',
    '  (c) DOES IT HAVE TABS? Almost certainly not - it is a single modal window. Emit tabs: [] with',
    '      tabsSourceQuote "" and tabsSourceFile "". [] IS A POSITIVE FINDING HERE, NOT A SKIP. Do not emit',
    '      navPathAlternates: merge-group.py derives those from your navPathEvidence entries.',
    '',
    'THE CLICK PATH CONTRADICTS ITSELF INSIDE ONE FILE. Record both, do not reconcile:',
    '  4-segment: "in Administration > Company > Company Admin > User Administration" (fcfd570c, twice)',
    '  2-segment: "(Administration > User Administration)" (fcfd570c, in its lead sentence)',
    'A driver tries the longer form first, so record the majority form AND the disagreement.',
    '',
    'THE ACTIVATION GATE ALSO CONTRADICTS ITSELF ACROSS THE TWO PRIMARIES, and this one is load-bearing:',
    '  fcfd570c: "If the Authorized Approver feature is activated and the company\'s Authorized Approver',
    '  hierarchy has at least one level (in addition to Global), then the Authorized Approval Limits link',
    '  appears in the Expense and Invoices Setting section in Administration > Company > Company Admin >',
    '  User Administration."',
    '  user-administration-8b167b96.md: "When the Cost Object Approver feature is activated, the Authorized',
    '  Approval Limits link appears in the Expense and Invoices Settings section in User Administration."',
    'AUTHORIZED APPROVER feature vs COST OBJECT APPROVER feature. A driver has to know which flag to check',
    'before it hunts for the link. Emit it as a contradiction. Note the section name drifts too:',
    '"Expense and Invoices Setting" (fcfd570c, 1 file) vs "Expense and Invoices Settings" (8b167b96, 1 file)',
    'vs "Expense and Invoice Settings" (4 files, the corpus-majority form, confirmed to name the same',
    'section of the User Details page by fields-overview-5e3daf7c.md). Emit the branch-attached form as',
    'primary and the other two as aliases, with the file count behind each.',
    '',
    'THE ROLE GATE HAS THREE CONDITIONS, NOT TWO. For the CHECK BOX: "the user must have the User Admin',
    'rights and the Invoice User Administration rights". For the LINK, fcfd570c adds a third: "In addition,',
    'the employee must be an approver." Capture all three, each verbatim.',
    'NBSP HAZARD: ~40% of nav sentences in this corpus have NO ">" glyph at all - the separators are',
    'U+00A0. Measured: after "Administration", 96 ASCII ">" vs 65 NBSP-only. Never grep -F across a menu',
    'arrow; run BOTH separator forms or declare the census incomplete.',
    'TOOLING TRAP, MEASURED 2026-09-01: grep on this machine is ugrep 7.8.4, NOT GNU grep. `grep -P',
    '"\\xc2\\xa0"` SILENTLY RETURNS 0 even under LC_ALL=C - across a corpus that genuinely holds 1,729 NBSPs',
    'in 117+ files. The forms that actually work are `grep -P "\\x{00a0}"` or a bash literal',
    '`grep $\'\\u00a0\'`; for a definitive count use python3 counting b"\\xc2\\xa0". NEVER conclude "no NBSP"',
    'from a \\xc2\\xa0 grep - that is a silent zero, the worst kind of wrong answer.',
    'Good news for THIS page: all its core files contain ZERO NBSP, so quotes taken from them are safe.',
    'The wider nav census is not.',
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
    'For the SINGLE page below, do all of this and show the commands in searchLog:',
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
    'Search terms are your job, but at minimum cover, in BOTH guide directories (file counts measured',
    'with grep -rli over both dirs on 2026-09-01, so you can tell a real miss from a thin corpus):',
    '  "Authorized Approval Limits" (2 files), "Manager Approval Limit" (1), "Approval Limit Currency" (3),',
    '  "Can approve exception" (2), "Expense and Invoices Setting" (2), "User Admin rights" (1),',
    '  "limit approval" (15), "limit-based" (12), "level-based cost object" (3), "Limit Approved" (9),',
    '  plus: authorized approver, cost object approver, approval limit, unlimited approval, approval amount,',
    '  signing authority, exception limit, User Administration, employee import, Global group,',
    '  hierarchy level, Invoice User Administration.',
    'THE SEED LIST IS A FLOOR, NOT A CEILING. "limit approval" alone returns 15 files and the seed list',
    'names 5; the recon that produced those seeds was aimed at Workflows, not at this page. Beat it.',
    '',
    'MEASURED SHAPE OF THIS PAGE - DO NOT HUNT STRUCTURE THAT IS NOT THERE. Both primaries return 0 for',
    'grep -c "<table" AND 0 for grep -cP "^\\s*\\|". Every field on this page lives in PROCEDURE PROSE. An',
    'empty rawHtmlTableCensus and an empty longCatalogs list is a CORRECT and expected output. Run the',
    'census anyway and REPORT THE ZEROS - the zero is the finding. But two files in the WIDER candidate set',
    'do carry raw <table>: filter-authorized-approvers-by-workflow-approval-step-aae69350.md (6,234 B, and',
    'it decides the Level boundary) and additional-approver-situations-fbb5034c.md (8,664 B). Pipe-table',
    'files include global-group-vs-authorized-approver-hierarchy-8a960238.md (25 rows, decides page',
    'identity) and employee-import-e28f2294.md (19 rows, value domains). ROW-COUNT TRAP: on aae69350,',
    'grep -c "<tr" returns 1 and LIES - grep -o "<tr" | wc -l returns 3. Count rows with grep -o, never',
    'grep -c. An inventory of 40 files for this page is a red flag, not thoroughness.',
    '',
    'BOUNDARY DUTY OF THE INVENTORY, and it is the most valuable thing you do here: several strong hits for',
    'these terms are files the built WORKFLOWS page ALREADY CONSUMED - authorized-approver-list-a9522ec8.md,',
    'procedure-2d20b513.md, overview-5ce8a567.md, and tools-guides/how-single-step-approval-workflow-works-',
    '40145f24.md. Check each against ' + KG + ' with python3. List them in alsoRelevant with an explicit',
    'ALREADY-MINED-BY-WORKFLOWS flag, NEVER in mustRead. They are boundary evidence, not field sources.',
    '',
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
        '    silently flatten two surfaces into one.',
        ' 6. THE WORKFLOWS BOUNDARY. THIS IS THE CENTRAL QUESTION OF THE ENTIRE RUN AND IT IS YOURS.',
        '    The built Workflows page already owns, on its Authorized Approvers > Authorized Approver List',
        '    tab and ALL from admin-guides/authorized-approver-list-a9522ec8.md:',
        '      authorized_approver_approval_limit         label "Approval Limit"',
        '      authorized_approver_level                  label "Level"',
        '      authorized_approver_can_approve_exception  label "Can approve exception"',
        '      authorized_approver_list_approver          label "Approver"',
        '    And configuration-8b3be88b.md says ONE VALUE HAS THREE SETTER SURFACES: "The amount is set for',
        '    each approver in the Authorized Approver List, in User Administration, or in the employee',
        '    import." The employee-import third setter is a FORWARD REFERENCE, never a field here.',
        '',
        '    THE CORPUS DRAWS PART OF THIS LINE ITSELF. Use it; do not re-derive it:',
        '      "(The actual exception levels apply to all authorized approvers and are defined on the',
        '       Authorized Approvers tab in Workflows.)"            (user-administrator-fcfd570c.md)',
        '      "The range is set in Administration > Invoice > Workflows > Authorized Approver tab."',
        '                                                            (configuration-8b3be88b.md)',
        '    That SETTLES a split, and read it the right way round: it is a SCOPE FENCE, not a delete order.',
        '    The tenant-wide min/max exception RANGE is unambiguously Workflows - a candidate for it here is',
        '    a DROP with correctPage "Workflows". But the PER-APPROVER "Can approve exception" CHECK BOX is',
        '    documented as a control of THIS window ("the administrator selects the Can approve exception',
        '    check box"), so it STAYS. Losing it would be the mirror-image error.',
        '',
        '    Now do the same for every candidate, and SAY WHICH of these three it is, citing the file:',
        '      (i)   a genuinely DISTINCT control on this window -> keep/repair, and NOTE the Workflows',
        '            sibling by its exact field id so the duplication is visible to a human reader;',
        '      (ii)  the SAME value reached from another surface with no control of its own here -> drop,',
        '            with correctPage "Workflows";',
        '      (iii) UNDETERMINED by the documentation -> repair, and say so. "Undetermined" is a correct,',
        '            valuable answer here and is far better than a confident guess.',
        '    A duplicate is INVISIBLE to bin/validate-graph.py - it checks quotes against files, never',
        '    controls against pages. You are the only gate. DO NOT let a fifth "Approval Limit" through',
        '    without that reasoning written down.',
        '',
        '    TWO ANSWERS ARE ALREADY ESTABLISHED BY AN INDEPENDENT RECON. Verify them, do not re-derive:',
        '      * "Approver" IS NOT ON THIS PAGE - a clean negative. On Workflows you SELECT an approver',
        '        because you are creating a list row via New. In User Administration the approver is the',
        '        RECORD CONTEXT: you arrive having already searched for and opened that user. Neither',
        '        primary names an Approver control anywhere in its full description of the window.',
        '      * ANY field whose sourceFile is authorized-approver-list-a9522ec8.md belongs to Workflows,',
        '        full stop - that file own click path is "Administration > Invoice > Workflows". A candidate',
        '        sourced from it is an automatic drop with correctPage "Workflows".',
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
  '"name" values in them are the ONLY legal field names for this page:',
  '  ' + rosterList,
  '',
  'The raw extraction files are also on disk and carry candidate material the rosters do not (value-set',
  'candidates, dependency candidates, contradictions, compressed ranges). Read them too:',
  built.flatMap((b) => b.extractFiles).map((f) => '  ' + f).join('\n'),
  '',
  'THE EXISTING GRAPH is at ' + KG + '. Read it with python3 to get exact page names and exact field',
  'names for the 22 pages already built. Cross-group references are valuable and must use exact names.',
  '',
  ALREADY_BUILT,
  '',
  'Page names for THIS run, exactly as they must be written: ' + PAGES.map((p) => '"' + p.name + '"').join(', ') + '.',
  'THE ONLY PAGE NAME LEGAL FOR A NEW RECORD IN THIS RUN IS "Authorized Approval Limits".',
  'It is NOT "User Administration", not "Administration > Company > User Administration", not "Company',
  'Admin". Those name the CONTAINING surface, which this graph does not build - and SIX existing',
  'unresolved endpoints already use them, so writing one here would create a page that is not this one.',
  'AND IT IS NOT "Workflows". "Workflows" is a DIFFERENT, ALREADY-BUILT page (114 fields) whose Authorized',
  'Approvers > Authorized Approver List tab carries controls with the SAME LABELS as this window. You MAY',
  'reference those Workflows fields as dependency endpoints, by their exact graph names - that is exactly',
  'what makes this run valuable. You may NOT emit a new field, value set, roster record or contradiction',
  'owner against the page "Workflows". Writing "Workflows" for a control of this window, or vice versa,',
  'silently merges two surfaces and bin/validate-graph.py cannot see it.',
].join('\n')

const [vsRec, depRec, stepRec, ctrRec] = await parallel([
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
    'BEFORE YOU EMIT EACH SET: open the roster for appliesToPage, confirm the exact string you are about',
    'to write appears as a field "name" in it, and only then emit. If no field owns the enumeration,',
    'DO NOT invent an owner and DO NOT attach it to a neighbour - report it in orphanCandidates instead,',
    'with what it would need. An honest null beats a wrong owner.',
    '',
    '=== EXPECT VERY FEW VALUE SETS HERE, POSSIBLY ZERO. THAT IS A CORRECT ANSWER. ===',
    'This page has no enumerated option lists: both primaries return 0 for grep -c "<table" AND 0 for',
    'grep -cP "^\\s*\\|". The only enumeration-SHAPED things are a currency selector (never enumerated in',
    'this corpus) and a hierarchy level selector (whose members are TENANT DATA, not documentation - and',
    'tenant values must never enter this graph). And the page two documented value facts - 0 means the',
    'approver is in the chain with NO final authority, blank/null means UNLIMITED - are field NOTES and',
    'validValues SEMANTICS, not context-dependent enumerations. DO NOT manufacture a set in order to have',
    'one. An empty valueSets array with an honest note is the right deliverable; anything you cannot own',
    'goes to orphanCandidates.',
    'ONE REAL VALUE-DOMAIN SOURCE DOES EXIST and it is easy to miss: employee-import-e28f2294.md (record',
    'set 710 Cost Object Approver) is the ONLY place the corpus states the domains for the amount/currency',
    'pair - "Numeric", "Specified in the approval limit currency. If used, then Approval Limit Currency',
    'Code below is required.", and "3 characters ... must be a valid currency in the list of system',
    '(reimbursement) currencies". Cite it for validValuesAdditions or notes on those two fields. Never',
    'emit an employee-import FIELD: that surface is unbuilt and stays that way.',
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
    '  "valueSets": [ { "appliesToPage": "Authorized Approval Limits",',
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
    'CROSS-GROUP EDGES ARE THE POINT OF THIS PAGE. It has roughly SEVEN fields and almost all of its value',
    'to a config writer is in its EDGES, not its roster. Quality over count: four or five well-grounded',
    'edges beat fifteen manufactured ones.',
    '',
    'SIX UNRESOLVED ENDPOINTS IN THE GRAPH ALREADY POINT AT THIS SURFACE. Read each with python3 before you',
    'write anything, and RECONCILE AGAINST THEM rather than restating the same relationship under a new id:',
    '  dep.gworkflows.060  Feature Hierarchies.level -> {User Administration, "Authorized Approval Limits"}',
    '  dep.gworkflows.046  Workflows.settings_allow_users_select_own_approver_payment_requests',
    '                                              -> {User Administration, "approver"}',
    '  dep.g1.060, dep.g5.024, dep.g5.026, dep.g5g5.031 - role assignment / vendor availability / import.',
    'CRITICAL: those endpoints name the CONTAINING surface "User Administration", NOT the page name this',
    'run creates. merge-group.py re-resolves endpoints by exact (page, field) match, so NONE of them will',
    'auto-resolve against this build. THAT MISMATCH IS EXISTING GRAPH DEBT, NOT YOUR JOB: report it in your',
    'notes for a post-merge correction pass. Do not silently mint a duplicate edge for the same fact.',
    'AND NOTE THE TRAP IN dep.gworkflows.046 SPECIFICALLY: its "approver" is the PER-EMPLOYEE default',
    'approver on the User Administration USER PROFILE - a genuinely different surface. This window sets a',
    'level, a currency+amount and a Can approve exception flag; it has NO approver-assignment control.',
    'That edge must STAY unresolved. Do not propose retargeting it here.',
    '',
    'THE EDGES THIS PAGE ACTUALLY OWES. Each needs its own verbatim quote that STATES the relationship:',
    '  (1) CONDITIONAL VISIBILITY OF THE LINK - the single most load-bearing edge for a driver. The link',
    '      appears ONLY IF the Authorized Approver feature is activated AND the hierarchy carries at least',
    '      one level beyond Global. Source: user-administrator-fcfd570c.md. A driver that does not know',
    '      this will hunt forever for a link that never renders. This is the SAME relationship',
    '      dep.gworkflows.060 records from the Feature Hierarchies side - point at the built page and field',
    '      by exact name; do not contradict it.',
    '  (2) THE PRECEDENCE RULE between the two halves of the window - the most valuable single sentence on',
    '      the page. Verbatim in user-administration-8b167b96.md: "The cost object configuration defines',
    '      the type-either limit or level. If you complete both areas in this window-the Approval Limit',
    '      area and the Level field-Concur Invoice will use the one that applies to your configuration and',
    '      ignore the other." WARNING: the real sentence uses EM DASHES (U+2014) where this brief shows',
    '      hyphens, because this file cannot carry them safely. Extract the bytes from the corpus file with',
    '      sed/awk and grep -F the result. A quote retyped with hyphens WILL FAIL validation.',
    '  (3) THE EXCEPTION-RANGE HANDOFF to the built Workflows page: "The range is set in Administration >',
    '      Invoice > Workflows > Authorized Approver tab." (configuration-8b3be88b.md), corroborated by',
    '      the fcfd570c parenthetical. Target page "Workflows" and its EXISTING field names',
    '      minimum_exception_level / maximum_exception_level. This is a scope fence: the per-approver',
    '      Can approve exception boolean is set HERE, the tenant-wide range is set THERE.',
    '  (4) THE THREE-SETTER RELATIONSHIP: configuration-8b3be88b.md says the amount is set in the',
    '      Authorized Approver List, in User Administration, OR in the employee import - and',
    '      step-4-assign-the-proper-rights-to-users-86389a18.md settles what that means: "Regardless of how',
    '      the authorized approvers are entered into Invoice, they all appear in the Authorized Approver',
    '      List." So these are DISTINCT UI SURFACES WRITING ONE UNDERLYING RECORD. Emit the edge to the',
    '      built Workflows field authorized_approver_approval_limit and say in condition which surface',
    '      wins - or state plainly that the corpus does not say. "UNDETERMINED by the documentation" is a',
    '      correct and valuable condition here. The employee-import third setter is a legitimate FORWARD',
    '      REFERENCE to an unbuilt surface.',
    '  (5) THE ROLE GATE as a precedes edge: User Admin rights AND Invoice User Administration rights, and',
    '      for the LINK a third condition - "In addition, the employee must be an approver."',
    '',
    'USE EXACT PAGE AND FIELD NAMES READ OUT OF THE GRAPH JSON. This is where this run is most likely to',
    'fail: the four colliding Workflows controls have LABELS ("Approval Limit", "Level", "Can approve',
    'exception", "Approver") that differ from their NAMES ("authorized_approver_approval_limit" and so on).',
    'An edge written with the LABEL dangles forever and hides among the 243 legitimate forward references.',
    'Verify every endpoint name against the graph or a roster with python3 BEFORE you emit it.',
    'Do NOT go resolving unrelated Workflows or Feature Hierarchies endpoints - that is another group work.',
    'An edge into a page that is NOT YET BUILT (Email Reminders, Delegate Configurations, Peppol, Shipping,',
    'Localization, the Employee Import, or the general User Administration user-profile surface) is',
    'legitimate and expected: write the page and field name as they will be, and the merge tool re-resolves',
    'the endpoint when that group is built. Prefer a well-labelled forward reference over dropping a real',
    'relationship.',
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
    'DEDUPE FIRST. Three lenses ran on this one page and they overlap heavily.',
    '',
    'THREE CONTRADICTIONS ARE ALREADY KNOWN ON THIS PAGE AND ALL THREE grep -F VERIFY. Emit them as nodes',
    'with their own verbatim readings, then hunt for more - do not stop at these:',
    '  (a) WHICH FEATURE GATES THE LINK - the highest-consequence one, because a driver has to know which',
    '      flag to check before it looks for the link. user-administrator-fcfd570c.md says the AUTHORIZED',
    '      APPROVER feature ("If the Authorized Approver feature is activated and the company\'s Authorized',
    '      Approver hierarchy has at least one level (in addition to Global), then the Authorized Approval',
    '      Limits link appears"); user-administration-8b167b96.md says the COST OBJECT APPROVER feature',
    '      ("When the Cost Object Approver feature is activated, the Authorized Approval Limits link',
    '      appears in the Expense and Invoices Settings section in User Administration.").',
    '  (b) NAV DEPTH, INSIDE ONE FILE. fcfd570c writes the path BOTH as the 4-segment "in Administration >',
    '      Company > Company Admin > User Administration" (twice) and as the 2-segment "(Administration >',
    '      User Administration)". consequenceForWriter: a driver tries the longer form first.',
    '  (c) DOES A LEVEL EXIST ON THIS SURFACE AT ALL - and this one is a genuine documentary conflict, not',
    '      wording. user-administration-8b167b96.md puts a Level control in this window ("For level-based',
    '      cost object approval, select a level."); filter-authorized-approvers-by-workflow-approval-step-',
    '      aae69350.md states the opposite outright: "Levels cannot be added to approvers via User',
    '      Administration." Both verify. The reconciliation the corpus supports - state it in notes as a',
    '      HYPOTHESIS, not as a resolution - is that these are TWO DIFFERENT VALUES SHARING A LABEL: the',
    '      Workflows Level is the authorized-approver step filter (employee import record type 720, per',
    '      step-2-assign-the-level-to-the-approver-d8bf669c.md; Authorized Approver Hierarchy), while this',
    '      window Level is the level-based COST OBJECT approval level (record set 710, per',
    '      employee-import-e28f2294.md; Cost Object Approver Hierarchy). RECORD THE CONFLICT. Do not',
    '      resolve it by picking a side.',
    'ALSO CHECK the section-name drift: "Expense and Invoices Setting" (fcfd570c) vs "Expense and Invoices',
    'Settings" (8b167b96) vs the corpus-majority "Expense and Invoice Settings" (4 files) - a driver',
    'searches the page for that label. And the tab-name drift between "Authorized Approvers tab" (fcfd570c)',
    'and "Authorized Approver tab" (configuration-8b3be88b.md).',
    'AND THE UNLIMITED RECIPE, which is NOT the same on both surfaces: a9522ec8 requires TWO acts ("set to',
    'no approval limit currency, and leave the approval limit amount blank") while 8b167b96 states ONE',
    '("For an unlimited approval amount, leave blank (null)."). Whether the currency must also be cleared',
    'HERE is UNDETERMINED by the documentation - say so rather than importing the Workflows recipe.',
    '',
    'Two records are the same node when they are about the same disagreement: merge',
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
    '=== YOUR JOB: BUILD THE ConfigSteps FOR THIS GROUP ===',
    'A ConfigStep is an ordered, end-to-end configuration procedure a config writer could actually drive:',
    'the real task an administrator sits down to do, across however many pages it takes.',
    '',
    'THE RATIONALE IS THE LOAD-BEARING PART OF EACH SEQUENCE ENTRY. It records WHAT BREAKS IF THE STEP RUNS',
    'OUT OF ORDER. A rationale that merely restates the action is worthless. Mark each one explicitly as',
    'CORPUS-STATED (with the quote that states it) or INFERRED (and say what it is inferred from). Where a',
    'role gate applies, quote it.',
    '',
    'AIM FOR ONE OR TWO STEPS, NOT FOUR TO SEVEN. This is a ~7-field modal window. Padding here means',
    're-authoring procedures the Workflows build already produced: the graph ALREADY holds',
    'grpworkflows-s2-configure-authorized-approver-feature, and it already cites configuration-8b3be88b.md,',
    'one of THIS run own seed files. READ THE 41 EXISTING STEPS IN ' + KG + ' BEFORE YOU WRITE ONE, and do',
    'not restate one of them under a new id.',
    'The procedures that are genuinely this page, and the corpus states their ordering:',
    '  (1) SET ONE APPROVER AUTHORIZATION LIMIT in the Authorized Approval Limits window. It has a hard',
    '      PRECONDITION CHAIN the corpus states outright: the Authorized Approver feature must be activated',
    '      AND the hierarchy - built on the already-built Feature Hierarchies page - must carry at least one',
    '      level beyond Global, or the link never appears. That precondition rationale is CORPUS-STATED:',
    '      quote it. user-administration-8b167b96.md hands you the numbered sequence verbatim ("1. In the',
    '      Expense and Invoices Settings section of User Administration, click the Authorized Approval',
    '      Limits link." / "2. On the left side, select the appropriate level in the hierarchy." / "3. On',
    '      the right side: ..."). Include the PRECEDENCE RULE between the Approval Limit area and the Level',
    '      field, and the two value semantics a driver will otherwise get backwards: 0 = in the approval',
    '      chain with NO final authority, blank/null = UNLIMITED.',
    '  (2) THE GLOBAL-GROUP-ONLY VARIANT, if you judge it in scope for this page: the inline Authorized',
    '      Approver check box -> Manager Approval Limit + Approval Limit Currency -> Save. Note it is',
    '      limit-only and cannot be used for exception-based approvers.',
    'Both cross into already-built pages by exact name - that is what makes them useful. If the corpus',
    'supports no second step, emit ONE. Do NOT invent a step for symmetry, and do NOT write steps about the',
    'Workflows wizard, its tabs, email notifications or the Settings-tab thresholds: another group owns',
    'those and they are already built.',
    '',
    'Step ids MUST be prefixed "grpapproval-authority-" (this is how the merge tool namespaces them;',
    'it is derived from the group label "Approval Authority" - see the script header).',
    'Every name in "fields" must be an exact field name from a roster in this run or from the existing graph.',
    'Every name in "pages" must be an exact page name. Steps may legitimately cross into already-built',
    'pages - that is what makes them useful.',
    '',
    SYNTH_CONTEXT,
    '',
    '=== OUTPUT - write to ' + PARTS + '/synth-steps.json ===',
    '{ "steps": [ { "id": "grpapproval-authority-...", "name": "...", "goal": "<what this achieves and what silently',
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
log('Critic input: ' + digest.reduce((a, d) => a + d.fieldCount, 0) + ' fields across ' + digest.length + ' page' + (digest.length === 1 ? '' : 's') + '; ' + uncitedTotal + ' must-read files never cited')

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
    '    related to this page. NOTE the measured baseline: both primaries are genuinely table-free, so a',
    '    zero here is expected - but aae69350 and fbb5034c DO carry raw <table>, and on aae69350',
    '    grep -c "<tr" returns 1 while grep -o "<tr" | wc -l returns 3. For each hit, decide: settings',
    '    table (must be captured) or',
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
    '    this page. The expected answer is a measured ZERO: 8 variant-marked files exist corpus-wide and',
    '    none touches this surface. ONE HEDGE to record but not act on:',
    '    tools-guides/how-single-step-approval-workflow-works-40145f24.md says the amounts are set via "the',
    '    Authorized Approvers link from workflows in the classic interface" - that is the WORKFLOWS SIBLING',
    '    surface, not this window. Do not let it become a fourth unearned "both" claim.',
    '    Any variant document that was built from the wrong twin is a real defect: the PO',
    '    Policy New Experience doc is 15,800 bytes against a 1,490-byte legacy stub, and Groups 1-2 were',
    '    built from the stub.',
    ' 8b. THE COUNT ITSELF IS A FINDING. An independent recon built this page roster from the corpus and',
    '    landed at 8 controls (7 if the left-side hierarchy selector is treated as navigation rather than a',
    '    control): BRANCH B - hierarchy level selector, Can approve exception, currency, Amount, and a',
    '    CONTESTED Level; BRANCH A - Authorized Approver check box, Manager Approval Limit, Approval Limit',
    '    Currency. If the run returned FIFTEEN, find what got over-emitted. If it returned THREE, find what',
    '    got lost - most likely the whole branch-A rendering. Branch A is SINGLE-SOURCED in fcfd570c',
    '    ("Manager Approval Limit" returns that file and no other), so there is no second attestation to',
    '    wait for and its absence would be a real loss, not caution.',
    '    NOTE ONE ASYMMETRY worth reporting either way: the built Workflows page did NOT emit a left-side',
    '    group/level selector even though a9522ec8 describes the same picker there. If this run emits one',
    '    and Workflows has none, say so - it is a defensible inconsistency but it should be a stated one.',
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
    ' 5. DUPLICATE NAMES AND DUPLICATE CONTROLS - AND THESE ARE NOT THE SAME CHECK. A duplicate NAME',
    '    within one page is a hard validator ERROR and the tooling catches it. A duplicated CONTROL across',
    '    two pages is INVISIBLE to the validator, and it is the exact defect this run exists to avoid.',
    '    Check this page against the built Workflows page field by field, especially its four colliding',
    '    labels (authorized-approver-approval-limit "Approval Limit", -level "Level",',
    '    -can-approve-exception "Can approve exception", -list-approver "Approver"). For each emitted',
    '    field, state whether this window presents its OWN control or whether the record is the same value',
    '    written down twice - and whether the roster SAID so in notes, naming the sibling field id. A field',
    '    that collides and does not name its sibling is a defect even if its quote is perfect.',
    '    THEN CHECK THE REVERSE, which is just as bad: was a REAL control dropped because its label looked',
    '    like a Workflows duplicate? The "Can approve exception" check box is documented as a control of',
    '    THIS window; only the tenant-wide exception RANGE belongs to Workflows.',
    '    HARD RULE, mechanically checkable: no field on this page may cite',
    '    admin-guides/authorized-approver-list-a9522ec8.md as its sourceFile - that file own click path is',
    '    "Administration > Invoice > Workflows". Run the check and report any hit as severe.',
    '    Also flag any re-emission of minimum_exception_level / maximum_exception_level /',
    '    authorized_approver_feature_available_for_workflows, all already built on Workflows from',
    '    procedure-2d20b513.md.',
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
    '    each honestly marked CORPUS-STATED or INFERRED? Are step ids prefixed grpapproval-authority-?',
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
