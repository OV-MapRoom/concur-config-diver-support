// =============================================================================
// Concur Invoice KG — WORKFLOWS group PAGE-ROSTER RECON.
//
// Adapted from workflows/2026-08-31_kg-group3-page-recon.mjs — the exact script as run for the
// Group 3 recon (run wf_a2215035-e91: 9 agents, 1.91M tokens, ~55 min, both critics endorsing).
// Changed: the six sweep charters (PO domain -> workflow domain), the reconciliation target
// (11 -> 13), the already-built list (18 -> 20 pages), and OUT. ALL SIX SWEEPS ARE KEPT: they
// are blind to each other by design and the convergence across six independent angles is what
// made the Group 3 answer trustworthy.
//
// ONE CORRECTION CARRIED IN FROM THE BUILD TEMPLATE: the Group 3 recon's PREAMBLE told agents to
// "check the front-matter deliverable_id before claiming a variant". deliverable_id is a
// PER-DIRECTORY CONSTANT and carries zero information; loio is the per-topic discriminator. The
// build template was corrected 2026-08-31, the recon template was not. Corrected here.
//
// The lost INVOICE-CONFIG-MAP.md recorded "Workflows | (path not preserved in handoff) | Built in
// the lost vertical slice — 13 pages of workflow config". 13 is an UPPER BOUND ON SURFACES, not a
// page count: the map's own Workflows line puts 13 pages under ONE left-menu entry, which is the
// tell. Group 3 carried an identical "11 pages" claim and the real answer was 2.
//
// It builds NO fields. Output is a candidate page roster with evidence, plus a richness estimate
// per page so the build can be split and model-tiered sensibly.
// =============================================================================

export const meta = {
  name: 'kg-workflows-page-recon',
  description: 'Re-derive the lost Workflows admin-page roster from the Concur Invoice corpus',
  phases: [
    { title: 'Sweep', detail: 'six blind, independent sweeps: click paths, admin-guides filenames, tools-guides, roles and menus, the existing graph and release notes, and configuration-guide step topics' },
    { title: 'Roster', detail: 'merge the sweeps into one candidate page roster with evidence and a richness estimate' },
    { title: 'Challenge', detail: 'two adversarial critics: page-hood (is it a page, a tab, or an end-user screen) and completeness (what did every sweep miss)' },
  ],
}

const CORPUS = '/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE'
const REPO = '/mnt/c/Users/manci/PROJECTS/concur-config-diver-support'
const KG = REPO + '/output/kg-invoice-config.json'
const OUT = '/tmp/claude-1000/-mnt-c-Users-manci/bc53169c-7f0a-473a-a07f-cf6d37ca509c/scratchpad/wf-recon'

const PREAMBLE = [
  'You are re-deriving a LOST PAGE ROSTER for a knowledge graph of the SAP CONCUR INVOICE ADMIN',
  'CONFIGURATION SURFACE, built BLIND FROM DOCUMENTATION. The graph answers: for a desired config',
  'change, which pages, which fields, which valid values, in what order. A future Chromium automation',
  'will drive the admin UI from it.',
  '',
  'THIS RUN EXTRACTS NO FIELDS. Your product is PAGE IDENTITY: which distinct admin pages make up the',
  'WORKFLOW / APPROVAL configuration area, what each is called, how it is reached by clicking, and how',
  'much of it the corpus documents. Do not build field rosters. Do not extract settings tables. Note',
  'where the rich material is so the real build can be aimed at it, but do not do that build here.',
  '',
  'CORPUS - read files directly with Bash (cat / sed -n / grep / rg). There is NO MCP server.',
  '  ROOT = ' + CORPUS,
  '  TWO guide directories, and BOTH COUNT EQUALLY:',
  '    concur-invoice-professional-edition-admin-guides/   (1209 files)',
  '    concur-invoice-professional-edition-tools-guides/   (650 files)',
  '  Two release-note directories also exist (concur-invoice-professional-edition-release-notes/ 138,',
  '  concur-invoice-professional-edition-release-note-summaries/ 233). They are NOT a source for fields',
  '  or values. For THIS run they may be used to corroborate a page NAME or a UI-variant claim, and you',
  '  must label any such citation as a release note.',
  '  Everything is SAP version 2026_08, Professional Edition, crawled 2026-08-29.',
  '',
  'sourceFile FORMAT - exactly "<guide-dir>/<filename>.md", relative to ROOT:',
  '  RIGHT: concur-invoice-professional-edition-admin-guides/workflows-tool-8b3b4dbe.md',
  '  WRONG: CONCUR_INVOICE/... , ./... , an absolute path, or a bare filename.',
  '',
  '=== THE GOVERNING CONSTRAINT: BLIND BUILD ===',
  'This graph models what the product\'s configuration surface IS, per SAP\'s docs - never how any',
  'tenant has configured it.',
  '  * A page enters the roster ONLY because the corpus names it as an administrative page or tool.',
  '    NEVER because a workflow configuration area plausibly ought to have such a page.',
  '  * Where two topics describe the same surface differently - one calling it a page, another a tab -',
  '    record BOTH and STATE THE CONTRADICTION. Do not reconcile by picking one.',
  '  * Never validate against, or infer from, a configured system. You have no tenant. You must not',
  '    imagine one.',
  '  * THIN IS A CORRECT ANSWER. If the workflow area turns out to be three pages rather than thirteen,',
  '    three is the answer and the discrepancy is itself a finding.',
  '  * No CSS selectors, DOM ids, or XPaths. No tenant-specific values, no customer PII.',
  '',
  '=== GROUNDING - NON-NEGOTIABLE ===',
  'Every sourceQuote must be a VERBATIM SUBSTRING of the cited file. Verify BEFORE you emit:',
  '    grep -F -c "<the exact quote>" "' + CORPUS + '/<sourceFile>"',
  'must return >= 1. A deterministic validator re-checks every quote mechanically downstream and fails',
  'the build on any miss. NO QUOTE, NO NODE. Keep quotes short enough to survive markdown line-wrapping',
  '- prefer one unwrapped line or clause. Never invent whitespace, never join wrapped lines, never',
  '"clean up" a quote.',
  '',
  '=== WHAT COUNTS AS A PAGE - THE CENTRAL JUDGEMENT OF THIS RUN ===',
  'This project has already been burnt by both errors in this pair:',
  '  * "Forms and Fields" is TWO structurally distinct pages under one label - an Invoice Processing',
  '    Admin tool, and a tab inside Capture Processing Admin with a stricter role gate. Collapsing them',
  '    would have been wrong.',
  '  * "Audit Rules" is ONE page with three tabs (Custom / Validation / Random). "Validation Rules" is',
  '    an alias, not a separate page. Splitting them would have been wrong.',
  '  * A page node was once created for a label with ZERO corpus hits, and the critic said it should',
  '    never have existed.',
  'So for every candidate, answer explicitly: is this a distinct admin PAGE reached by its own click',
  'path, a TAB or section inside another page, a WIZARD/DIALOG opened from a page, a separate TOOL with',
  'its own left-menu entry, an END-USER screen, or merely a FEATURE NAME with no screen of its own?',
  'Cite the evidence. "I am not sure" with the evidence laid out beats a confident guess.',
  '',
  '=== ADMIN vs END-USER - THE WORKFLOW AREA\'S SPECIFIC TRAP, AND IT IS THE WORST IN THE PRODUCT ===',
  'Workflow documentation is dominated by APPROVER-SIDE RUNTIME SCREENS: the Approval Flow page, the',
  'Requests Pending Your Approval window, My Work / approval links on the home page, Approve / Send Back',
  'to Employee / Recall buttons, the Invoice Manager, the Approvals list, viewing an invoice\'s approval',
  'workflow, moving through batch verification, delegate/proxy switching. EVERY ONE OF THOSE IS A TRAP.',
  'This graph models the ADMIN CONFIGURATION surface only. A screen an employee, approver or processor',
  'uses to do day-to-day work is NOT a config page, however thoroughly it is documented - but the',
  'SETTINGS THAT GOVERN IT ARE, AND THEY LIVE SOMEWHERE. When you reject a screen as end-user, SAY WHERE',
  'ITS CONFIGURATION LIVES. That sentence is the deliverable, not the rejection.',
  'The inverse trap also exists here: an approval STEP is configured by an admin but EXECUTED by an',
  'approver, and the same noun names both. Be explicit about which one a topic is describing.',
  '',
  '=== NAVIGATION ===',
  'navPath is LOAD-BEARING, not the URL: a direct goto on an admin URL bounces via dcredirect, so pages',
  'are reached by clicking. The corpus publishes NO .asp URLs at all - zero hits corpus-wide for',
  'PolicyAdmin, auditRules, accountingAdmin, dcredirect. The URLs of the 20 pages already in the graph',
  'came from live-UI observation recorded in an earlier handoff. FOR THE WORKFLOWS GROUP THERE IS NO',
  'SUCH RECORD - the original map preserved the Workflows row with the path field literally reading',
  '"(path not preserved in handoff)" - so THE CLICK PATH IS ALL THE NAVIGATION KNOWLEDGE THAT WILL',
  'EXIST. Do not invent a URL. Collect click paths exhaustively.',
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
  '  directly off Administration. A path that omits it may be an abbreviation, not a different page.',
  '  DUPLICATE TITLES ARE RIFE IN THIS DOMAIN. There are FOUR files named workflow-guides-*.md and TWO',
  '  named create-a-new-workflow-*.md. Same title, different loio, possibly different content or',
  '  different product context. NEVER identify a topic by title alone in this area - always by filename',
  '  or loio, and DIFF the twins before calling them duplicates or variants.',
  '  SAP ships legacy and New Experience topics in the SAME 2026_08 corpus, and New Experience is the',
  '  primary UI target for this project. Find every *-new-experience-* twin in the workflow area and say',
  '  which is richer, with byte counts from real commands.',
  '',
  '=== CENSUS CALIBRATION - EVERY MECHANICAL COUNT IN THIS CORPUS NEEDS IT ===',
  'Three separate under-counts cost real time on the last group. A census returning 0 deserves MORE',
  'suspicion than one returning many.',
  '  * INDENTED TABLES. SAP indents markdown tables nested inside numbered steps, so a census anchored',
  '    on "^|" UNDER-COUNTS badly: one seed file returns 0 for grep -c "^| " and 22 for grep -cP',
  '    "^\\s*\\|". ALWAYS allow leading whitespace when you count table rows.',
  '  * PACKED <tr>. A 21-entry catalog once packed its whole payload into ONE <tr> as 25 <p> cells, so',
  '    grep -c "<tr" returned 1 and the catalog was dismissed as illustrative. Count <p inside a table',
  '    too before you judge a raw table small.',
  '  * grep -c "<table" MATCHES PROSE. "<table name and permission name>" inside a quoted error message',
  '    is not a table. Require "<table>" or "<table " with an attribute.',
].join('\n')

const ALREADY_BUILT = [
  'PAGES ALREADY IN THE GRAPH (20). A control documented on one of these is NOT a Workflows page, and a',
  'Workflows candidate that turns out to be one of these under another name is a DUPLICATE, not a page:',
  '  Group 1: Policies, Group Configurations, Invoice Settings',
  '  Group 2: Audit Rules, Routing Configuration, Exceptions',
  '  Group 3: Purchase Order Matching Rules, Purchase Order Configuration',
  '  Group 4: Capture Processing Admin, Vendor Search Admin, Image Handling, Units Of Measure',
  '  Group 5: Expense Types, Forms and Fields, Accounting Administration, Map Invoice Concept Fields,',
  '           Tax Administration, Budget Configuration, List Management, Company Locations',
  'STILL UNBUILT and NOT part of Workflows: Peppol Configuration, Shipping Configuration, Localization',
  '(Group 6), and an undefined Group 7 (Ops).',
  'The full graph is on disk at ' + KG + ' - read it with python3 for exact page and field names.',
  '',
  'TWO ALREADY-BUILT PAGES SIT DIRECTLY ON THIS GROUP\'S BOUNDARY AND YOU MUST NOT RE-HOME THEIR FIELDS:',
  '  * ROUTING CONFIGURATION (Group 2, 10 fields, navPath Administration > Invoice > Invoice Processing',
  '    Admin > Routing Configuration). Workflow vs approval vs routing is the boundary this recon has to',
  '    draw. Read its 10 field names out of the graph before you propose anything adjacent, and if you',
  '    believe a control belongs on Routing Configuration rather than a new Workflows page, SAY SO - that',
  '    is a finding about the existing graph, not a Workflows page.',
  '  * AUDIT RULES (Group 2, 91 fields). Exceptions is a documented HUB feeding both Audit Rules AND',
  '    Workflows, and the exception-level threshold controls appear on both sides of that boundary.',
].join('\n')

const CANDIDATE_ITEM = {
  type: 'object',
  additionalProperties: false,
  required: ['candidateName', 'kind', 'confidence', 'aliases', 'evidence', 'navPathEvidence', 'roleGates', 'keyFiles', 'whyThisKind', 'notes'],
  properties: {
    candidateName: {
      type: 'string',
      description: 'The page name as the corpus writes it, not as you would tidy it.'
    },
    kind: {
      type: 'string',
      enum: ['admin-page', 'tab-within-page', 'wizard-or-dialog', 'separate-tool', 'end-user-screen', 'feature-name-only', 'unclear'],
      description: 'Your judgement of what this surface actually is. "unclear" is legitimate and better than a guess.'
    },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    aliases: { type: 'array', items: { type: 'string' } },
    evidence: {
      type: 'array',
      description: 'At least one verbatim quote naming this surface. More is better.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['sourceQuote', 'sourceFile'],
        properties: {
          sourceQuote: { type: 'string' },
          sourceFile: { type: 'string' }
        }
      }
    },
    navPathEvidence: {
      type: 'array',
      description: 'Every distinct documented click path to this surface. One entry per distinct quote.',
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
    keyFiles: {
      type: 'array',
      description: 'The files that document this surface, richest first, with byte counts from ls -la or wc -c.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['file', 'bytes', 'why'],
        properties: {
          file: { type: 'string' },
          bytes: { type: 'integer' },
          why: { type: 'string' }
        }
      }
    },
    whyThisKind: { type: 'string', description: 'The reasoning behind the kind verdict, citing evidence.' },
    notes: { type: 'string' }
  }
}

const SWEEP_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['sweep', 'wroteTo', 'candidates', 'rejected', 'searchLog', 'headline'],
  properties: {
    sweep: { type: 'string' },
    wroteTo: { type: 'string' },
    candidates: { type: 'array', items: CANDIDATE_ITEM },
    rejected: {
      type: 'array',
      description: 'Surfaces you considered and ruled out, each with the reason. An honest rejection is a finding; silence is not. For an end-user screen, the reason MUST say where its configuration lives.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'why'],
        properties: { name: { type: 'string' }, why: { type: 'string' } }
      }
    },
    searchLog: { type: 'string', description: 'The literal commands you ran, so the sweep is auditable and reproducible.' },
    headline: { type: 'string', description: 'The most important thing you found or failed to find. Two or three sentences.' }
  }
}

const ROSTER_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['pages', 'deferred', 'reconciliation', 'inheritedFindings', 'splitProposal', 'wroteTo', 'headline'],
  properties: {
    pages: {
      type: 'array',
      description: 'The proposed Workflows build roster. Admin pages only.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'name', 'aliases', 'documentedBasis', 'richness', 'uiVariantEvidence', 'navPathEvidence', 'roleGates', 'identityNotes', 'seedFiles', 'foundBySweeps'],
        properties: {
          id: { type: 'string', description: 'kebab-case stable id, e.g. "workflows".' },
          name: { type: 'string' },
          aliases: { type: 'array', items: { type: 'string' } },
          documentedBasis: {
            type: 'string',
            enum: ['rich', 'moderate', 'sparse', 'none'],
            description: 'How much of THIS PAGE\'s configuration surface the corpus actually documents.'
          },
          richness: {
            type: 'object',
            additionalProperties: false,
            required: ['fileCount', 'totalBytes', 'rawTableFiles', 'longCatalogs', 'estimatedFields'],
            properties: {
              fileCount: { type: 'integer' },
              totalBytes: { type: 'integer' },
              rawTableFiles: { type: 'integer', description: 'Files among this page\'s sources where a real <table> element is present (not the prose false positive).' },
              longCatalogs: { type: 'integer', description: 'Enumerations of roughly 10+ entries across this page\'s sources.' },
              estimatedFields: { type: 'integer', description: 'Honest order-of-magnitude estimate of how many config fields the build will yield.' }
            }
          },
          uiVariantEvidence: {
            type: 'string',
            description: 'New Experience / legacy twins for this page, with filenames and byte counts, or "none found".'
          },
          navPathEvidence: {
            type: 'array',
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
          identityNotes: {
            type: 'string',
            description: 'Page-hood reasoning, boundaries against already-built pages and against sibling candidates, tab-vs-page verdict with click-path evidence, and any contradiction the corpus leaves unresolved.'
          },
          seedFiles: {
            type: 'array',
            description: 'Starting-point files for the build\'s Map phase, richest first.',
            items: { type: 'string' }
          },
          foundBySweeps: { type: 'array', items: { type: 'string' } }
        }
      }
    },
    deferred: {
      type: 'array',
      description: 'Candidates deliberately NOT on the build roster, each with the reason: end-user screen, tab within a built page, belongs to another group, no documentary basis. For an end-user screen the reason MUST name where its configuration lives.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'kind', 'why'],
        properties: { name: { type: 'string' }, kind: { type: 'string' }, why: { type: 'string' } }
      }
    },
    reconciliation: {
      type: 'string',
      description: 'The lost map recorded THIRTEEN pages of workflow config under ONE left-menu entry. Say how your count compares, and account for the difference honestly rather than padding or trimming to reach 13.'
    },
    inheritedFindings: {
      type: 'array',
      description: 'The five inherited findings this recon was chartered to settle, each CONFIRMED or REFUTED with the command and quote that settles it. Never "assumed".',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['finding', 'verdict', 'evidence', 'consequence'],
        properties: {
          finding: { type: 'string' },
          verdict: { type: 'string', enum: ['confirmed', 'refuted', 'partly-confirmed', 'undetermined-by-the-documentation'] },
          evidence: { type: 'string', description: 'The literal commands run and the verbatim quotes that settle it.' },
          consequence: { type: 'string', description: 'What the build must do differently because of this verdict.' }
        }
      }
    },
    splitProposal: {
      type: 'string',
      description: 'A proposed split by page, balanced on estimated extraction cost, with the reasoning. Say if the group should not be split.'
    },
    wroteTo: { type: 'string' },
    headline: { type: 'string' }
  }
}

const CRITIC_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['lens', 'wroteTo', 'findingCount', 'severeFindings', 'verdict'],
  properties: {
    lens: { type: 'string' },
    wroteTo: { type: 'string' },
    findingCount: { type: 'integer' },
    severeFindings: {
      type: 'array',
      description: 'The findings that would change the roster if acted on. Most severe first.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'detail', 'action'],
        properties: {
          title: { type: 'string' },
          detail: { type: 'string' },
          action: { type: 'string', description: 'The concrete edit to the roster: add page X, drop page Y, merge Y into Z, split Z into Z1/Z2.' }
        }
      }
    },
    verdict: { type: 'string' }
  }
}

// The five inherited findings. Every sweep sees them; the roster must return a verdict on each.
// They are CLAIMS TO TEST, not premises. On the last group one confident causal inference by a
// critic was flatly wrong, so an observation is reliable and an inference about its cause is a
// hypothesis. Confirm or refute with commands; "assumed" is not an available answer.
const INHERITED = [
  '=== FIVE INHERITED FINDINGS THIS RECON MUST SETTLE - CONFIRM OR REFUTE, NEVER ASSUME ===',
  '',
  '(1) PURCHASE ORDER SETTINGS and PURCHASE REQUEST SETTINGS BELONG TO WORKFLOWS, NOT TO THE BUILT',
  '    INVOICE SETTINGS PAGE. This is the single most load-bearing inherited claim and the Group 3',
  '    recon settled it against the corpus. REPRODUCE THE CLINCHER YOURSELF:',
  '        grep -c "select their own approver" <admin>/available-invoice-settings-8b3411f0.md   -> 0',
  '        grep -c "select their own approver" <admin>/invoice-settings-cace748d.md             -> 2',
  '    The argument is STRUCTURAL, so understand it before you repeat it. available-invoice-settings-',
  '    8b3411f0.md (8,368 B) is the INVOICE SETTINGS PAGE\'s own field roster - "The Invoice Settings',
  '    page includes the following settings used to activate a feature" - and all 9 of the graph\'s',
  '    file-cited Invoice Settings fields come from it. invoice-settings-cace748d.md (4,901 B) is a',
  '    DIFFERENT topic family: a 3-row Setting|Description table of GLOBAL APPROVAL controls. Its three',
  '    rows are approver selection, approval links on the home page, and an exception-level submission',
  '    block. purchase-request-settings-b0bce285.md (3,735 B) is its 3-row sibling for purchase requests',
  '    and purchase-order-settings-a5a997b4.md (1,417 B) is its 1-row sibling for purchase orders.',
  '    NOW THE PART NOBODY HAS SETTLED, AND IT IS YOURS: there are THREE siblings in that family, not',
  '    two. ZERO fields in the graph cite invoice-settings-cace748d.md - verify that yourself against',
  '    ' + KG + '. So say explicitly WHERE THE WHOLE FAMILY LIVES, all three members, with click-path',
  '    evidence. Three answers are possible and you must choose on evidence, not on tidiness:',
  '      (a) all three are Workflows pages/surfaces;',
  '      (b) all three are settings tables on some other page and the family name is the page;',
  '      (c) the invoice member belongs to the built Invoice Settings page and the PR/PO members do not,',
  '          which would make the family a naming coincidence rather than a family.',
  '    If the answer is (c), the invoice member is INVOICE SETTINGS REBUILD DEBT and must NOT be',
  '    silently re-homed onto a new Workflows page by this group. Say that plainly.',
  '    BOTH PR and PO settings files carry a PROSE NUMERIC RANGE - "Type a number from one to 99" - that',
  '    NO DIGIT-BASED RANGE REGEX WILL FIND. Flag it for the build.',
  '    The graph already carries dep.g2.012 -> {Purchase Request Settings, "Prevent purchase request',
  '    submission when exception level exceeds X"} and dep.g2.013 -> {Purchase Order Settings, "Prevent',
  '    purchase order transmission when exception level exceeds X"}, both unresolved. Those endpoints',
  '    were written by an agent with no roster, so they are independent corroboration of the NAMES.',
  '',
  '(2) IS "WORKFLOWS" ONE PAGE WITH TABS, OR SEVERAL PAGES? SETTLE IT ON CLICK-PATH EVIDENCE.',
  '    The graph already carries endpoint references to four distinct workflow surfaces: "Workflows",',
  '    "Workflows > Settings tab", an "Email Notifications tab", and "Approval Statuses > Purchase',
  '    Request". The corpus has admin-guides files named workflows-tool-*, access-workflow-*,',
  '    workflow-settings-*, select-an-email-notification-in-the-workflows-tab-*, edit-workflow-',
  '    properties-*, edit-workflow-rules-and-actions-*, edit-and-reorder-workflow-steps-*.',
  '    BOTH PRECEDENTS ARE LIVE AND THEY POINT OPPOSITE WAYS. Audit Rules: one page, three tabs, do not',
  '    split. Forms and Fields: one label, two genuinely distinct pages, do not collapse. The tiebreaker',
  '    is CLICK PATHS AND ROLE GATES, not intuition and not symmetry: a surface with its own left-menu',
  '    entry or its own role gate is a page; a surface only ever reached by clicking a tab inside another',
  '    page is a tab. Find the paths. If the corpus contradicts itself, record the contradiction.',
  '    Note that "workflow" is ALSO an object an admin creates (there can be many workflows), not only a',
  '    page. Distinguish the PAGE that lists and edits workflows from the OBJECT it edits, and be careful',
  '    that a topic titled "Create a New Workflow" is about the object.',
  '',
  '(3) DOES FEATURE HIERARCHIES BELONG TO THIS GROUP?',
  '    It is a real left-menu page - the corpus contains the literal string "Click Feature Hierarchies',
  '    (left menu)." - and a genuine workflow prerequisite. The Group 3 recon judged it not PO-domain and',
  '    left it UNCLAIMED BY ANY GROUP. FOUR dependency endpoints in the graph already name it',
  '    (dep.g1.061, dep.g2.003, dep.g5g5.050, dep.g5g5.051) and every one is about a SOURCE LIST.',
  '    It is documented across BOTH directories (17 files mention it; tools-guides has',
  '    create-the-invoice-routing-feature-hierarchy-8b510285.md and step-2-associate-the-feature-',
  '    hierarchy-to-the-source-list-bcaf1f5a.md). Decide with evidence, and note that the tools-guides',
  '    filename says ROUTING - which puts it on the Routing Configuration boundary too. An honest',
  '    "belongs to neither, it is its own thing" is an acceptable answer; leaving it unclaimed a second',
  '    time is not.',
  '',
  '(4) WHERE IS THE BOUNDARY AGAINST ROUTING CONFIGURATION (Group 2, ALREADY BUILT, 10 fields)?',
  '    Workflow vs approval vs routing. Read its 10 field names out of ' + KG + ' FIRST. DO NOT RE-HOME',
  '    ITS FIELDS. If a control you find is already on Routing Configuration, that is a duplicate, not a',
  '    page. If you believe a Routing Configuration field is mis-homed, report it as a finding about the',
  '    EXISTING GRAPH and do not put it on a Workflows page. tools-guides/workflow-and-approval-routing-',
  '    8b4ff6c9.md sits exactly on this boundary - open it and say which side it falls on, or that it',
  '    straddles.',
  '',
  '(5) END-USER TRAPS. See the ADMIN vs END-USER section of the preamble - this domain is the worst in',
  '    the product for it. Every rejection must name where the configuration lives. A rejection with no',
  '    such sentence is an incomplete finding and will be sent back by the critics.',
].join('\n')

const jstr = (o) => JSON.stringify(o, null, 2)

// ---------------------------------------------------------------------------
// PHASE 1 - SWEEP. Six independent angles, each blind to the others.
// ---------------------------------------------------------------------------
phase('Sweep')
log('Workflows recon: six blind sweeps for the lost workflow/approval page roster')

const SWEEPS = [
  {
    key: 'clickpaths',
    model: 'opus',
    effort: 'high',
    charter: [
      '=== SWEEP A - CLICK PATHS AND MENU STRUCTURE ===',
      'You find admin pages by finding the documented ways to REACH them. A click path names its',
      'destination, which makes this the highest-precision way to enumerate the admin surface. In THIS',
      'group it is also the tiebreaker for the central question - one page with tabs, or several pages -',
      'so your evidence decides finding (2). Treat that as your primary charter, not a side task.',
      '',
      'Sweep the WHOLE corpus, both guide directories, for navigation phrasing, then keep the hits that',
      'land in the workflow / approval / notification domain. At minimum run variants of:',
      '    grep -rn "Administration > Invoice" <both dirs>',
      '    grep -rn "Administration >Invoice" <both dirs>        # the missing-space trap',
      '    grep -rn "Invoice Processing Admin" <both dirs>',
      '    grep -rn "left menu\\|left-hand menu\\|menu, click\\|click .*tab\\|select .*tab" <both dirs>',
      '    grep -rn "Workflows" <both dirs>',
      'and follow every workflow-domain hit into its file to see what page the path terminates at.',
      '',
      'For EVERY distinct destination in the workflow domain, emit a candidate with the full click',
      'sequence as a navPath array (["Administration", "Invoice", "..."]) and the verbatim quote that',
      'states it. Emit EVERY distinct path you find as a separate navPathEvidence entry, each with its',
      'own quote: downstream tooling picks the longest, most-attested path and keeps the rest as',
      'alternates, so more distinct evidence is strictly better.',
      '',
      'THE TAB TREE IS YOUR DELIVERABLE. Build the complete click tree of the workflow area: which labels',
      'are reached from the left menu, which from a tab, which from a button inside a page, which from a',
      'dialog opened from that. Named surfaces to place in the tree, at minimum - Workflows, Settings tab,',
      'Email Notifications, Approval Statuses, Steps, Rules, Actions, Properties, Add/Edit Workflow Steps,',
      'Edit Workflow. For EACH, say tab-within-page or admin-page AND WHY, citing the path.',
      'Where two topics place the same label at DIFFERENT depths, that is a contradiction: emit the',
      'majority tree and record the disagreement rather than silently drawing one tree.',
      'Watch for the middle nav node: "Invoice Processing Admin" sits between "Administration > Invoice"',
      'and most Invoice admin pages. A path that omits it may be an abbreviation, not a different page -',
      'record the middle segment as UNATTESTED rather than asserting it is absent.',
    ].join('\n'),
  },
  {
    key: 'adminfiles',
    model: 'opus',
    effort: 'high',
    charter: [
      '=== SWEEP B - ADMIN-GUIDES FILENAME AND CONTENT SWEEP ===',
      'You own concur-invoice-professional-edition-admin-guides/ (1209 files) and you sweep it',
      'exhaustively for the workflow domain. Breadth is your job; another sweep is doing tools-guides.',
      '',
      'Filename sweep first - ls the directory and grep the filenames for every term and synonym:',
      '  workflow, approv, approver, approval, step, rule, action, notification, email, notify, escalat,',
      '  timeout, delegate, proxy, authorized-approver, cost-object, self-approval, single-step,',
      '  submit, recall, send-back, reject, status, statuses, hierarch, level, threshold, exception-level,',
      '  routing, route, pending, queue, reminder, reassign, substitute, out-of-office, backup.',
      'Then a content sweep with grep -rl for the same terms, case-insensitive, because the corpus names',
      'topics inconsistently and a page may be documented in a file whose name never says "workflow".',
      'THE FILENAME SWEEP ALONE RETURNS ~35 workflow-* files and ~78 approv-* files. That is a large',
      'domain and you must not sample it. Group before you judge.',
      '',
      'Then GROUP the hits by the administrative surface they configure, and for each group ask the',
      'page-hood question from the preamble. Report the file count and total bytes per group - the build',
      'downstream is sized off your numbers, so use wc -c and ls, not impressions.',
      '',
      'Three specific things to resolve, because all three are documented ambiguously:',
      '  1. THE FOUR workflow-guides-*.md FILES (8b3b85da, 8b3c7b2a, 8b3d6ede, 8b3e09a7) share one title.',
      '     DIFF THEM. Are they four different guides\' overview topics, four product contexts, or the',
      '     same content republished? Their loio values differ; their content may not. This decides',
      '     whether the workflow area is one guide or several, which is the strongest structural signal',
      '     available for the page-count question.',
      '  2. THE TWO create-a-new-workflow-*.md FILES (15992497, 554e86aa). Same title. Diff them. If they',
      '     describe DIFFERENT workflow types on the same page, that is one page. If they describe the',
      '     same procedure on two different pages, that is two pages.',
      '  3. THE SETTINGS FAMILY of finding (1): invoice-settings-cace748d.md, purchase-request-settings-',
      '     b0bce285.md, purchase-order-settings-a5a997b4.md. Establish what SURFACE these three tables',
      '     live on. Read the finding (1) brief in full first - the answer is not obvious and the wrong',
      '     answer either invents a page or loses three real controls.',
    ].join('\n'),
  },
  {
    key: 'toolsguides',
    model: 'opus',
    effort: 'high',
    charter: [
      '=== SWEEP C - TOOLS-GUIDES SWEEP ===',
      'You are the standing guard against admin-guides skew. Of 486 fields in the graph so far, only a',
      'handful cite tools-guides, and that ratio is a bug rather than a fact about the corpus: Vendor',
      'Search Admin is documented ONLY in tools-guides and was nearly lost, Company Locations turned out',
      'to be documented mostly there too, and on the last group the tools directory supplied the single',
      'catalog the roster would otherwise have missed.',
      '',
      'START in concur-invoice-professional-edition-tools-guides/ (650 files) and EXHAUST it for the',
      'workflow domain before you open admin-guides at all. ls it in full and read the filenames; the',
      'directory is small enough to eyeball completely, so do that rather than relying on greps alone.',
      'NOTE THE ASYMMETRY AND DO NOT LET IT SHORTEN YOUR SWEEP: only 4 tools filenames contain',
      '"workflow" against 35 in admin-guides, but 22 contain "approv". The workflow material in this',
      'directory is filed under APPROVAL, not under WORKFLOW. Search the concept, not the word.',
      '',
      'You own in particular: required-roles and permissions topics, overview topics, limitations,',
      'prerequisites, terminology topics, IMPORT AND EXPORT FILE FORMAT specifications (record layouts,',
      'column definitions, required-vs-optional flags - these are long catalogs and among the most',
      'valuable artefacts in the corpus), and integration topics describing how a workflow surface feeds',
      'or is fed by another tool.',
      '',
      'Known files, as starting points and NOT a limit: workflow-and-approval-routing-8b4ff6c9.md,',
      'how-single-step-approval-workflow-works-40145f24.md, view-the-approval-workflow-of-an-invoice-',
      'd8046bec.md, moving-through-the-batch-verification-workflow-01738020.md, create-the-invoice-',
      'routing-feature-hierarchy-8b510285.md, step-2-associate-the-feature-hierarchy-to-the-source-list-',
      'bcaf1f5a.md.',
      '  * workflow-and-approval-routing-8b4ff6c9.md sits exactly on the Routing Configuration boundary',
      '    (finding 4). Open it and say which side it falls on, or that it straddles.',
      '  * The last two are the Feature Hierarchies question (finding 3), and their filenames say ROUTING.',
      '  * view-the-approval-workflow-* and moving-through-the-batch-verification-* look like end-user',
      '    screens. If they are, say where their configuration lives - that sentence is the deliverable.',
      '',
      'Also settle: does an EMPLOYEE IMPORT or USER ADMINISTRATION surface own the approver assignment?',
      'The settings family of finding (1) says "every employee must have an approver set for them in the',
      'User Administration page or through the employee import". The graph already carries unresolved',
      'endpoints naming "Employee Import", "User Administration" and "User Permissions". Establish',
      'whether any of those is an Invoice admin page in this corpus, a shared-product page outside this',
      'graph\'s scope, or a file specification with no screen of its own.',
    ].join('\n'),
  },
  {
    key: 'rolesmenus',
    model: 'opus',
    effort: 'high',
    charter: [
      '=== SWEEP D - ROLES, PERMISSIONS AND FEATURE ACTIVATION ===',
      'Admin pages are gated by roles, and role documentation enumerates the tools a role can reach.',
      'That makes a required-roles topic an index of the admin surface, read from the other direction.',
      'In the workflow domain this is doubly true, because ROLES ARE ALSO THE SUBJECT MATTER: approver,',
      'cost object approver, authorized approver and delegate are all roles that workflow configuration',
      'assigns. Keep those two senses apart - a role that REACHES an admin page, versus a role a workflow',
      'step ROUTES TO - and say which sense each hit is.',
      '',
      'Sweep both guide directories for: required-roles*, *-roles-*, "user permissions", "role", "rights",',
      '"only an administrator", "you must have the", "Invoice Configuration Administrator",',
      '"Invoice Processor", "Workflow Administrator", "Approver", "Cost Object Approver",',
      '"Authorized Approver", "Delegate", "Invoice Manager".',
      'For each role, list the administrative surfaces it is documented as reaching, then keep the ones',
      'in the workflow domain.',
      '',
      'Also sweep FEATURE ACTIVATION topics: "activate", "enable the", "feature activation",',
      '"contact SAP Concur support", "must be enabled by". In this product a configuration surface is',
      'frequently gated behind a feature that support enables, and the gate is itself load-bearing',
      'knowledge for a config writer - a page that cannot be reached until a feature is on needs saying.',
      'enabling-and-disabling-an-invoice-workflow-setting-0e1e6d33.md and self-approval-of-cost-object-',
      'based-workflows-20fd435d.md are known starting points, not a limit.',
      '',
      'THE COST OBJECT APPROVAL CLUSTER IS YOURS AND IT IS THE LIKELIEST PLACE FOR A PAGE NOBODY ELSE',
      'FINDS. ~13 admin filenames contain "cost-object" and ~14 contain "authorized-approver".',
      'step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md exists and a step-1 topic implies a',
      'numbered setup flow across several surfaces. Establish whether cost object approval is configured',
      'on the Workflows page, on Feature Hierarchies, on a page of its own, or through an import with no',
      'screen. Same question for DELEGATES (~17 admin filenames) - "Delegate Configurations" already',
      'appears as an unresolved endpoint in the graph.',
      '',
      'For every workflow-domain surface a role or activation topic names, emit a candidate with the role',
      'gate quoted verbatim. Where a role reaches a surface that no other sweep would find - because it',
      'has no dedicated topic file of its own - that is the highest-value find available to you.',
    ].join('\n'),
  },
  {
    key: 'graphrefs',
    model: 'opus',
    effort: 'high',
    charter: [
      '=== SWEEP E - THE EXISTING GRAPH\'S OWN FORWARD REFERENCES ===',
      'Six group builds have already run, and their dependency edges point FORWARD into the workflow',
      'area. Those endpoints were written by agents reading the corpus with no knowledge of this roster,',
      'which makes them INDEPENDENT EVIDENCE for what the workflow pages are called. On the last group',
      'this sweep produced free corroboration nobody had been using, and it is the reason the sweep',
      'exists. YOU START WITH A STRONGER SIGNAL THAN GROUP 3 HAD: nine unresolved endpoints already name',
      '"Workflows" outright.',
      '',
      'Read ' + KG + ' with python3. Extract:',
      '  1. Every ConfigDependency whose sourceRef or targetRef has resolved:false, and the page name it',
      '     carries. Rank by frequency. Known counts to start from and VERIFY: Workflows 9,',
      '     Feature Hierarchies 4, Purchase Request Settings 1, Purchase Order Settings 1,',
      '     Delegate Configurations 1, User Permissions 5, Employee Import 1, User Administration 1.',
      '     The nine Workflows endpoints carry these field slots - dep.g1.021 "workflow deletion",',
      '     dep.g1.026 "Workflow", dep.g2.014 "Settings", dep.g4.045 "invoice submission for approval",',
      '     dep.g2ar.021/023 "workflow_first_step", dep.g2ar.022 "workflow_approval_steps",',
      '     dep.g2ar.024/026 "exception_level_limit". Read each edge\'s sourceQuote and sourceFile and',
      '     follow it into the corpus - the quote says what the edge is really about, and a snake_case',
      '     field slot is an Audit Rules condition token, not necessarily a Workflows control.',
      '  2. Every ConfigStep sequence entry naming a page not in configPages.',
      '  3. Every field NOTE and every page identityNotes/verifyNotes mentioning workflow, approval,',
      '     approver, notification, delegate or escalation. A note saying "configured on X" names X.',
      '  4. Every ConfigContradiction whose topic touches the workflow area.',
      '  5. THE 10 FIELD NAMES ON THE BUILT ROUTING CONFIGURATION PAGE, verbatim, with their sourceFiles.',
      '     This is finding (4) and you are the sweep positioned to answer it. Anything you propose that',
      '     collides with one of those 10 is a duplicate, not a page.',
      '',
      'For EACH page name you recover, go to the corpus and try to CORROBORATE it with a verbatim quote.',
      'A name that appears only in the graph and nowhere in the corpus is a previous agent\'s invention',
      'and must be reported as such - that is a real finding about existing graph quality, and this is',
      'the only sweep positioned to make it. "Approval Statuses > Purchase Request" and "Email',
      'Notifications tab" are two names to test hardest, because both read like tab paths rather than',
      'page names and one of them may be neither.',
      '',
      'Then check the two release-note directories for workflow page names and for New Experience',
      'announcements in the workflow area. Release notes are NOT a source for fields or values; for page',
      'NAMES and UI-variant dating they are legitimate, and you must label any citation from them as a',
      'release note. This area is the likeliest in the product to have been renamed across releases, so a',
      'release note announcing a rename is a high-value find - it would explain a corpus alias that no',
      'current topic justifies.',
    ].join('\n'),
  },
  {
    key: 'setupflow',
    model: 'opus',
    effort: 'high',
    charter: [
      '=== SWEEP F - CONFIGURATION-GUIDE STRUCTURE AND SETUP FLOW ===',
      'SAP configuration guides are written as ordered setup procedures, and a "Step N - do X on page Y"',
      'topic enumerates the admin surface IN BUILD ORDER. That ordering is exactly what the graph\'s',
      'ConfigSteps need, and this sweep is the only one positioned to recover it.',
      '',
      'Sweep both guide directories for step and process topics in the workflow domain:',
      '  step-1-*, step-2-*, ... step-N-*, *-configuration-process-*, *-creation-process-*,',
      '  configuration-overview-*, *-setup-*, overview-*, *-checklist-*, prerequisites-*,',
      '  "before you begin", "in this order", "you must ... before".',
      'Known starting points, NOT a limit: workflow-creation-process-1d37b85f.md,',
      'create-and-configure-workflows-8b3add35.md, step-1-assign-the-level-to-the-workflow-step-',
      '6035f10a.md, step-3-edit-the-workflow-steps-f2731590.md, step-3-add-edit-the-workflow-options-',
      'workflow-steps-workflow-rules-14d98974.md, step-8-vendor-approved-workflow-step-2f0d90b9.md,',
      'step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md, overview-of-steps-37e3c289.md,',
      'understand-steps-and-workflow-rules-7cc4696b.md, general-workflow-terminology-48a34eb8.md,',
      'default-workflows-a6fa157a.md, workflow-the-default-po-payment-workflow-8b35b62d.md,',
      'purchase-request-workflow-0cc46220.md, example-of-typical-purchase-order-workflow-6d3b90d0.md.',
      '',
      'A "step-8-*" topic implies at least eight steps in one flow. RECONSTRUCT THE FULL NUMBERED FLOWS -',
      'find every sibling step topic of each one, in order, and say which guide each flow belongs to.',
      'A flow whose steps land on eight different surfaces is direct evidence for a multi-page answer; a',
      'flow whose eight steps all land on ONE page with different tabs is direct evidence for the',
      'one-page answer. THIS IS THE SECOND-STRONGEST EVIDENCE FOR FINDING (2) AFTER CLICK PATHS, so make',
      'the surface-per-step mapping explicit and do not summarise it away.',
      '',
      'Read the front matter of the workflow topics you find. Files carry a loio and title; use loio (NOT',
      'deliverable_id, which is a per-directory constant) to tell genuinely distinct topics from',
      'republished ones, and use titles to reconstruct WHICH GUIDE each topic belongs to. A guide called',
      'something like "Concur Invoice: Workflow Configuration Guide" would be the single best index of',
      'this group that exists - find out whether one is present, and if so reproduce its structure. The',
      'four same-titled workflow-guides-*.md files are the obvious place to start looking for it.',
      '',
      'Emit a candidate for every admin surface the setup flow tells the administrator to visit, in the',
      'order it tells them to. Where the flow crosses into an already-built page (Policies, Audit Rules,',
      'Exceptions, Routing Configuration, Forms and Fields, Group Configurations), say so rather than',
      'emitting a duplicate: a workflow setup flow that routes through Policies is evidence about',
      'ORDERING, not a new page.',
    ].join('\n'),
  },
]

const sweeps = await parallel(SWEEPS.map((S) => () => agent([
  PREAMBLE,
  '',
  S.charter,
  '',
  INHERITED,
  '',
  '=== EVERY SWEEP SHARES THESE OBLIGATIONS ===',
  'You are ONE OF SIX independent sweeps, each blind to the others, each entering the corpus from a',
  'different direction. Do not narrow your search on the assumption that another sweep covers something',
  '- overlap is the design, and a candidate found by four sweeps is stronger evidence than one found by',
  'one. Equally, a candidate ONLY YOU find is the reason you exist: report it with your best evidence.',
  '',
  'THE NUMBER 13 IS AN UPPER BOUND ON SURFACES, NOT A TARGET. The lost map put 13 pages under ONE',
  'left-menu entry. Do not pad toward it and do not trim to it. Report what the corpus supports.',
  '',
  'Show the literal commands you ran in searchLog. Every quote grep -F verified before you emit it.',
  'Report byte counts from real commands, not estimates.',
  '',
  ALREADY_BUILT,
  '',
  '=== OUTPUT ===',
  'Write a markdown report to ' + OUT + '/sweep-' + S.key + '.md covering what you searched, what you',
  'found, what you ruled out and why, and your page-hood reasoning for each candidate. Then return the',
  'structured object with wroteTo set to that path and sweep set to "' + S.key + '".',
].join('\n'), {
  label: 'sweep:' + S.key,
  phase: 'Sweep',
  model: S.model,
  effort: S.effort,
  schema: SWEEP_SCHEMA,
})))

const liveSweeps = (sweeps || []).filter(Boolean)
if (liveSweeps.length === 0) throw new Error('All six sweeps failed')
for (const s of liveSweeps) log(s.sweep + ': ' + (s.candidates || []).length + ' candidates, ' + (s.rejected || []).length + ' rejected')
if (liveSweeps.length < SWEEPS.length) log('WARNING: only ' + liveSweeps.length + ' of ' + SWEEPS.length + ' sweeps returned')

// ---------------------------------------------------------------------------
// PHASE 2 - ROSTER. A barrier is correct here: the merge needs every sweep at once.
// ---------------------------------------------------------------------------
phase('Roster')

const sweepDigest = liveSweeps.map((s) => ({
  sweep: s.sweep,
  reportFile: s.wroteTo,
  headline: s.headline,
  candidates: s.candidates,
  rejected: s.rejected,
}))

const rosterAgent = () => agent([
  PREAMBLE,
  '',
  '=== YOUR JOB: MERGE SIX BLIND SWEEPS INTO ONE WORKFLOWS BUILD ROSTER ===',
  'Six sweeps entered the corpus from six directions and proposed candidate surfaces. Produce the single',
  'authoritative Workflows page roster the build workflow will be written against. Get this wrong and',
  'every field downstream is filed under the wrong page - the one failure mode grep cannot catch, and the',
  'one the deterministic validator provably cannot see, because it checks quotes against files and never',
  'controls against pages.',
  '',
  '=== HOW TO MERGE ===',
  ' 1. DEDUPE ON IDENTITY, NOT ON NAME. Two sweeps naming the same surface differently is the normal',
  '    case, not a conflict. Merge them, take the UNION of evidence and navPathEvidence deduplicated on',
  '    (sourceFile, sourceQuote), and record every name as an alias. More grounded evidence on one page',
  '    beats two thin pages.',
  ' 2. WEIGH AGREEMENT, THEN CHECK IT. A candidate found by five sweeps is strong evidence. A candidate',
  '    found by one is not thereby wrong - the sweeps had different charters and sweep D and E can each',
  '    reach surfaces no filename search would. Go to the corpus and check the singletons yourself.',
  ' 3. RESOLVE PAGE-HOOD, PAGE BY PAGE. Only kind "admin-page" and "separate-tool" belong on the build',
  '    roster. tab-within-page belongs to its parent - and if that parent is already built, it is debt',
  '    against that page, not a Workflows page. end-user-screen and feature-name-only go to deferred with',
  '    the reason, AND that reason must name where the configuration lives. Where the sweeps DISAGREE',
  '    about kind, that disagreement is the most valuable signal in this run: go to the corpus, settle it',
  '    with a quote, and record what the disagreement was.',
  ' 4. GUARD THE BOUNDARY against the 20 already-built pages, ROUTING CONFIGURATION AND AUDIT RULES',
  '    ABOVE ALL. A workflow control documented on Routing Configuration is not a Workflows page.',
  ' 5. SIZE EVERY PAGE HONESTLY. richness drives the split and the model tiers. Count files and bytes',
  '    with real commands, with the census calibrations from the preamble applied. estimatedFields is an',
  '    order-of-magnitude judgement - the pages already built range from 0 to 91 fields, so use that',
  '    scale.',
  ' 6. SEED FILES ARE THE BUILD\'S STARTING POINT, richest first. The build\'s Map phase re-derives its own',
  '    inventory, so seeds are a floor and not a ceiling - but a bad seed list aims the whole build wrong.',
  ' 7. RETURN A VERDICT ON ALL FIVE INHERITED FINDINGS in inheritedFindings. Each needs confirmed /',
  '    refuted / partly-confirmed / undetermined-by-the-documentation, the literal evidence, and what the',
  '    build must do differently. These are CLAIMS TO TEST, not premises you may assume. If the corpus',
  '    cannot settle one, "undetermined-by-the-documentation" is a correct and valuable answer - it is a',
  '    property of the corpus, NOT a to-do list against a live tenant.',
  '',
  '=== THE COUNT ===',
  'The lost map recorded THIRTEEN pages of workflow config - under ONE left-menu entry, which is the tell',
  'that it was counting SURFACES: dialogs, tabs, sections and settings tables. That number is a checksum,',
  'NOT a target. Do not pad to reach it and do not trim to it. The identical claim on the last group was',
  '"11 pages" and the real answer was 2. If you land on three or on nine, say so and account for the',
  'difference. Reconciling honestly is the deliverable. Where you can, ATTRIBUTE the surplus: name which',
  'dialogs, tabs and sections the original probably counted, so the reconciliation is a mapping and not',
  'an apology.',
  '',
  '=== THE SPLIT ===',
  'Each page costs roughly three extraction lenses plus two refuters. Propose a split balanced on',
  'ESTIMATED EXTRACTION COST rather than page count, keeping pages that share source files in the same',
  'half so two runs do not read the same long catalog twice. Say plainly if the group is small enough not',
  'to need splitting. Note for your sizing: a split second half must merge with --patch, and --patch',
  'REPLACES a page\'s fields wholesale rather than adding to them, so a split must never cut through a',
  'single page.',
  '',
  ALREADY_BUILT,
  '',
  INHERITED,
  '',
  '=== THE SIX SWEEPS ===',
  'Their full markdown reports are on disk and are richer than this digest. READ THEM - and go back to',
  'the corpus yourself for anything load-bearing. Do not take the digest on trust:',
  liveSweeps.map((s) => '  ' + s.wroteTo).join('\n'),
  '',
  jstr(sweepDigest),
  '',
  '=== OUTPUT ===',
  'Write the roster and your full reasoning as markdown to ' + OUT + '/roster.md - one section per page',
  'with its evidence, the deferred list with reasons, the five inherited-finding verdicts, the',
  'reconciliation against thirteen, and the split proposal. Then return the structured object with',
  'wroteTo set to that path.',
  'Every sourceQuote in your output must be grep -F verified against its cited file first.',
].join('\n'), {
  label: 'roster:merge',
  phase: 'Roster',
  model: 'opus',
  effort: 'xhigh',
  schema: ROSTER_SCHEMA,
})

let roster = await rosterAgent()
if (!roster) {
  log('Roster agent failed - retrying once')
  roster = await rosterAgent()
}
if (!roster) throw new Error('Roster phase failed twice')

log('Roster: ' + (roster.pages || []).length + ' pages, ' + (roster.deferred || []).length + ' deferred')
for (const p of (roster.pages || [])) {
  log('  ' + p.name + ' — basis ' + p.documentedBasis + ', ~' + (p.richness || {}).estimatedFields + ' fields, ' + (p.richness || {}).fileCount + ' files')
}
for (const f of (roster.inheritedFindings || [])) log('  finding: ' + f.verdict + ' — ' + f.finding)

// ---------------------------------------------------------------------------
// PHASE 3 - CHALLENGE. Two perspective-diverse adversarial critics.
// ---------------------------------------------------------------------------
phase('Challenge')

const CRITIC_CONTEXT = [
  '=== THE PROPOSED ROSTER ===',
  jstr(roster),
  '',
  '=== EVERYTHING IS ON DISK - READ IT, DO NOT TAKE THE DIGEST ON TRUST ===',
  '  Roster:  ' + OUT + '/roster.md',
  '  Sweeps:  ' + liveSweeps.map((s) => s.wroteTo).join(' , '),
  '  Graph:   ' + KG,
  '  Corpus:  ' + CORPUS,
  '',
  'You have Bash. USE IT. Every claim you make should have a command behind it. The critics on this',
  'project are believed and acted on precisely because they count rows with grep -c instead of asserting.',
  '',
  'ONE CALIBRATION FROM THE LAST RUN, AND IT IS ABOUT YOU. A critic\'s OBSERVATION is reliable; its',
  'CAUSAL INFERENCE is a hypothesis. Last run a critic correctly observed that one corpus file ends in a',
  'bare "x" and is the only one that does - then inferred a crawl truncation, and was WRONG: SAP',
  'publishes it that way, and re-converting the live source reproduces the file byte-for-byte. Separate',
  'what you MEASURED from what you INFER, and label the second as a hypothesis with the check that would',
  'settle it.',
  '',
  ALREADY_BUILT,
  '',
  INHERITED,
].join('\n')

const [criticA, criticB] = await parallel([
  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: ADVERSARIAL CRITIC - PAGE-HOOD (what is WRONG in this roster) ===',
    'Try to REFUTE the page-hood of every entry on the roster. A wrong page roster is the most expensive',
    'possible defect here, because every field the build extracts gets filed under it and the error is',
    'invisible to the deterministic validator - it checks quotes against files, not controls against pages.',
    '',
    'For EACH page on the roster, attack it on these axes and show the commands:',
    ' 1. IS IT A PAGE? Or a tab, a wizard opened from another page, a dialog, a report, or a feature name',
    '    with no screen? Find the click path evidence yourself. A surface with no documented click path',
    '    and no left-menu entry is a weak page claim however many topics describe it. THIS GROUP\'S',
    '    CENTRAL QUESTION IS ONE-PAGE-WITH-TABS VERSUS SEVERAL-PAGES, so do not accept the roster\'s',
    '    answer in either direction without rebuilding the click tree yourself from the corpus.',
    ' 2. IS IT ADMIN? Workflow documentation is dominated by approver-side runtime screens - the Approval',
    '    Flow page, Requests Pending Your Approval, My Work approval links, Approve / Send Back / Recall,',
    '    the Invoice Manager, viewing an invoice\'s approval workflow, batch verification, delegate',
    '    switching. Every one is a trap. If a screen is where an employee, approver or processor does',
    '    daily work, it does not belong, however thoroughly documented. Name every roster entry that',
    '    fails this test. Then check the INVERSE: has a genuine ADMIN surface been deferred as end-user',
    '    because its documentation is written from the approver\'s point of view?',
    ' 3. IS IT ALREADY BUILT? grep the distinctive label across the corpus and read what page the hits',
    '    actually describe. Check the 20 built pages in ' + KG + '. ROUTING CONFIGURATION (10 fields) and',
    '    AUDIT RULES (91 fields) are the specific collisions to settle, and getting either wrong in either',
    '    direction costs: a duplicate page, or a real workflow page lost to an over-cautious boundary.',
    '    Read Routing Configuration\'s 10 field names and check every roster page against them by name.',
    ' 4. IS IT ONE PAGE OR SEVERAL? Audit Rules is one page with three tabs and splitting it would have',
    '    been wrong; Forms and Fields is two pages under one label and collapsing them would have been',
    '    wrong. Apply that scrutiny to the whole Workflows cluster and to anything named "Settings" or',
    '    "Configuration" - those labels attract conflation. Say which precedent applies and why.',
    ' 5. DOES THE EVIDENCE HOLD? grep -F every sourceQuote on the roster against its cited file. Report',
    '    every miss. Then check that each quote actually SUPPORTS the claim rather than merely containing',
    '    similar words - a quote that names a page in passing is not evidence that it is an admin page,',
    '    and in this domain the word "workflow" appears constantly as an abstract noun ("efficient',
    '    workflow management") with no screen behind it at all.',
    ' 6. IS THE NAME RIGHT? The name becomes the page node and every dependency endpoint that resolves',
    '    against it. Nine existing edges already spell it "Workflows" - if the roster names the page',
    '    anything else, those nine stay unresolved forever, so say what the corpus\'s own string is and',
    '    whether the roster matches it. Report every name you would change and to what.',
    ' 7. ARE THE RICHNESS NUMBERS REAL? Spot-check fileCount and totalBytes with wc -c. An inflated',
    '    estimate distorts the split; a deflated one starves a page of extraction effort. Apply the',
    '    census calibrations - an indented-table or packed-<tr> under-count would understate a page.',
    ' 8. ARE THE FIVE INHERITED VERDICTS SOUND? Each was supposed to be settled with a command and a',
    '    quote. Re-run the commands. A verdict of "confirmed" that rests on plausibility rather than',
    '    evidence is the worst outcome of this run, because it launders an assumption into a fact.',
    '',
    'CALIBRATION: do not refute a page merely because its documentation is thin - thin is a correct',
    'answer and a sparsely documented admin page is still a page. Name the specific defect, or endorse it.',
    '',
    CRITIC_CONTEXT,
    '',
    '=== OUTPUT ===',
    'Write a thorough markdown critique to ' + OUT + '/critic-pagehood.md, organised by the eight headings,',
    'citing files and counts throughout. Then return the receipt with the findings that would change the',
    'roster, most severe first, each with a concrete action. Set lens to "pagehood".',
  ].join('\n'), {
    label: 'critic:pagehood',
    phase: 'Challenge',
    model: 'opus',
    effort: 'xhigh',
    schema: CRITIC_SCHEMA,
  }),

  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: ADVERSARIAL CRITIC - COMPLETENESS (what is MISSING) ===',
    'Six sweeps ran and a roster was merged from them. Assume they collectively missed something, and',
    'prove what. On this project the completeness critic has repeatedly found material that had already',
    'survived three adversarial rounds: a 34-row catalog never read, a 22-row feature matrix missed, a',
    'tools-guides table contradicting its admin-guides twin and never opened, and on the last group six',
    'admin-relevant files the roster had missed, one holding a 6-value catalog that would have been lost.',
    '',
    'Work through this and name FILES, not impressions:',
    ' 1. RUN YOUR OWN SWEEP. Do not start from the roster. Start from the corpus, in BOTH guide',
    '    directories, with synonyms the six sweeps may not have tried: authorization, authorisation,',
    '    sign-off, signoff, endorse, concur (as a verb), review, reviewer, chain, ladder, tier, band,',
    '    limit, threshold, escalation, reminder, nudge, aging, overdue, SLA, timeout, expire, lapse,',
    '    substitute, out of office, backup approver, alternate, reassign, forward, skip, bypass,',
    '    auto-approve, straight-through, exception handler, send back, recall, unsubmit, withdraw.',
    '    Then compare what you find against the roster and the deferred list.',
    ' 2. THE THIRTEEN. The lost map recorded thirteen surfaces. If the roster has fewer, your job is to',
    '    find the missing ones or to prove they never existed as pages in this corpus version. If it has',
    '    more, find which are over-splits. Do not accept the reconciliation narrative without testing it.',
    '    The strongest test available: try to ATTRIBUTE all thirteen - name the specific dialogs, tabs,',
    '    sections and settings tables the original map most likely counted. A reconciliation that can',
    '    name thirteen concrete surfaces is credible; one that merely asserts a miscount is not.',
    ' 3. THE DEFERRED LIST IS WHERE MISTAKES HIDE, AND IN THIS DOMAIN IT WILL BE LONG. Read every',
    '    deferred entry and challenge its reason. An end-user screen wrongly deferred loses a real config',
    '    page; a feature-name-only rejection may be hiding a surface documented under a different label.',
    '    Check that EVERY end-user rejection names where its configuration lives - a rejection without',
    '    that sentence is incomplete and you should say so. Name every deferral you would reverse.',
    ' 4. NEW EXPERIENCE TWINS. Find EVERY new-experience / legacy pair in the workflow area with byte',
    '    counts. Groups 1-2 of this project were built from a 1,490-byte stub whose New Experience twin',
    '    is 15,800 bytes, and that is outstanding debt. Is any roster page about to repeat it? Is any twin',
    '    pair evidence that a surface was REPLACED rather than revised - which would make the legacy page',
    '    a separate historical entry rather than the same page?',
    ' 5. RAW <table> SWEEP. Run a real-table census across both guide directories for every file plausibly',
    '    in the workflow domain - require "<table>" or "<table " with an attribute, because grep -c',
    '    "<table" also matches prose. A page-relevant hit is a near-certain long catalog and the single',
    '    most expensive thing this project has lost. And do NOT judge a raw table small by its <tr> count:',
    '    a 21-entry catalog once packed its whole payload into one <tr> as 25 <p> cells. Is every real',
    '    table attributed to a roster page\'s seedFiles?',
    ' 6. LONG CATALOG SWEEP. Any enumeration of 10+ entries in a workflow-domain file - approval status',
    '    lists, workflow step type lists, rule condition catalogs, action lists, email notification',
    '    template lists, role matrices, import/export column specs, terminology tables. Count the rows',
    '    yourself, allowing leading whitespace on markdown table rows (a naive "^|" census returned 0',
    '    against a real 22). Say which roster page should own each. An unowned catalog is a page the',
    '    roster is missing, or a seed list that is incomplete.',
    ' 7. SEED QUALITY. For each roster page, is the seed list actually the richest files? Sort the',
    '    page\'s candidate files by bytes and compare. A seed list that misses the biggest file aims the',
    '    build at the stub. Pay specific attention to CROSS-DIRECTORY coverage: on the last group the',
    '    critic\'s most valuable single addition was a tools-guides file that was the only corroboration',
    '    of a control the admin-guides seeds carried alone.',
    ' 8. THE SPLIT. Does the proposed split separate pages that share source files, forcing two runs to',
    '    read the same long catalog twice? Is it balanced on real extraction cost? Does it cut through a',
    '    single page, which --patch semantics would make unsafe?',
    ' 9. THE FIVE INHERITED FINDINGS - IS ANY VERDICT UNDER-EVIDENCED, AND IS THERE A SIXTH? The five',
    '    were inherited from a previous run and a previous run\'s deferred list. Nothing guarantees the',
    '    list is complete. Name any ambiguity of the same kind that nobody chartered anyone to settle.',
    '10. UNDETERMINED BY THE DOCUMENTATION. Rank the places where the corpus genuinely cannot answer the',
    '    page-identity question. These are properties of the corpus, NOT a to-do list against a live',
    '    tenant, and recording them accurately is part of the deliverable.',
    '',
    CRITIC_CONTEXT,
    '',
    '=== OUTPUT ===',
    'Write a thorough markdown critique to ' + OUT + '/critic-completeness.md, organised by the ten',
    'headings, citing files and counts throughout. Then return the receipt with the findings that would',
    'change the roster, most severe first, each with a concrete action. Set lens to "completeness".',
  ].join('\n'), {
    label: 'critic:completeness',
    phase: 'Challenge',
    model: 'opus',
    effort: 'xhigh',
    schema: CRITIC_SCHEMA,
  }),
])

log('Critics: pagehood=' + (criticA ? criticA.findingCount : 'FAILED') + ' completeness=' + (criticB ? criticB.findingCount : 'FAILED'))

return {
  outDir: OUT,
  files: {
    sweeps: liveSweeps.map((s) => s.wroteTo),
    roster: OUT + '/roster.md',
    criticPagehood: OUT + '/critic-pagehood.md',
    criticCompleteness: OUT + '/critic-completeness.md',
  },
  sweepHeadlines: liveSweeps.map((s) => s.sweep + ': ' + s.headline),
  sweepCandidateNames: liveSweeps.map((s) => ({
    sweep: s.sweep,
    candidates: (s.candidates || []).map((c) => c.candidateName + ' [' + c.kind + '/' + c.confidence + ']'),
    rejected: (s.rejected || []).map((r) => r.name),
  })),
  roster: roster,
  critics: {
    pagehood: criticA || null,
    completeness: criticB || null,
  },
}
