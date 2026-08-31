// =============================================================================
// Concur Invoice KG — Group 5B build workflow. THE EXACT SCRIPT AS RUN, 2026-08-31.
// 29 agents, 0 errors, 4.06M tokens, 80 min. Produced 100 fields at 100/100 verbatim.
//
// Preserved here because the Group 5A script lived only in a session scratchpad, was lost,
// and cost a full re-authoring. This file is the template for every later group.
//
// TO ADAPT FOR THE NEXT GROUP, change only:
//   PAGES        - id / name / url from INVOICE-CONFIG-MAP.md, plus recon `seeds`
//   GROUP        - the group label, em-dash exactly as it appears in the graph
//   patchPage    - in the return: set ONLY when the group label already exists in the graph
//                  (5B patched into Group 5 because 5A owned the label). For a NEW group,
//                  drop it and merge WITHOUT --patch.
//   step id prefix - the Synthesize/steps prompt hard-codes "grp5b-"
//   PARTS        - the current session's scratchpad path
// Everything else — PREAMBLE, the nine hard-won rules, lens charters, refuter framings,
// the Repair cap, the schemas — is the accumulated method. Do not thin it out.
//
// The only edit to the body below is this header. See docs/2026-08-31_HANDOFF-KG-BUILD-v2.md.
// =============================================================================

export const meta = {
  name: 'kg-group-5b',
  description: 'Concur Invoice KG - Group 5B: Tax Administration, Budget Configuration, List Management, Company Locations',
  phases: [
    { title: 'Map', detail: 'page identity + navPath evidence, and an exhaustive must-read file inventory with a raw <table> census' },
    { title: 'Extract', detail: '4 pages x 3 lenses: procedures / reference tables and long catalogs / tools-guides and cross-cutting' },
    { title: 'Verify', detail: '2 perspective-diverse adversarial refuters per page, three-way disposition' },
    { title: 'Repair', detail: 'at most one record per input; genuine splits reported, never merged' },
    { title: 'Synthesize', detail: 'value sets, dependencies and config steps built against the final field rosters' },
    { title: 'Critic', detail: 'two adversarial critics: completeness, and correctness/wiring' },
  ],
}

// ---------------------------------------------------------------------------
// constants
// ---------------------------------------------------------------------------
const CORPUS = '/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE'
const REPO = '/mnt/c/Users/manci/PROJECTS/concur-config-diver-support'
const KG = REPO + '/output/kg-invoice-config.json'
const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/121ceff0-9ce5-4ce2-b7bf-be6841646c10/scratchpad/5b-parts'
const GROUP = 'Group 5 - Data Structure & Accounting'

const PAGES = [
  {
    id: 'tax-administration',
    name: 'Tax Administration',
    url: '/expense/admin/invoice/taxAdministrator.asp',
    seeds: 'Recon (starting points, NOT a limit): tax-administration-tool-0f5fff3c.md, tax-administrator-experience-8b37bd88.md, tax-authority-8b386a59.md, configure-tax-authorities-8b383099.md, configure-predefined-tax-codes-6b42509f.md, step-2-assign-the-tax-administrator-role-b7f391c8.md, step-2-assign-the-tax-administrator-role-b903b7c8.md, step-3-access-tax-authorities-2fae4ae3.md, step-4-add-a-new-tax-authority-7f90cede.md, step-5-optional-add-a-new-expense-type-group-to-a-tax-authority-e8d87361.md, step-6-optional-add-a-new-vendor-group-to-a-tax-authority-d8b7786d.md, step-7-optional-configure-predefined-tax-codes-be8bc5b8.md, tax-validation-8b37962d.md, configuring-the-tax-validation-feature-8b376eeb.md, work-with-the-tax-validation-page-options-c3fe1df5.md, control-tax-amount-handling-8540cd38.md, value-added-tax-8b38f5d1.md, value-added-tax-vat-8b39be89.md, appendix-a-tax-amount-calculation-8b380a96.md, availability-of-expense-types-based-on-location-of-tax-authority-8485155d.md, working-with-tax-fields-587e5641.md, using-the-tax-field-at-both-the-invoice-and-line-item-levels-a55b90c8.md, the-tax-service-provider-05d51077.md, provide-a-location-for-the-tax-service-6ba2cb41.md, configure-the-specify-tax-in-invoice-details-or-itemization-summary-feature-11c6df01.md. There are roughly 30 tax topics; expect this page to be the richest of the four.',
  },
  {
    id: 'budget-configuration',
    name: 'Budget Configuration',
    url: '/expense/admin/invoice/budgetConfiguration.asp',
    seeds: 'Recon warning: this page may have LITTLE OR NO documentary basis in this corpus. Only ONE file has "budget" in its name (budget-approval-59251c3b.md) and it explicitly defers: "For more information about budget approval and budget workflows, refer to the Shared: Budget Setup Guide." That guide is NOT in this corpus (this corpus is Concur Invoice Professional Edition only). Other Budget mentions are audit-rule data objects (the-condition-page-5d4ea870.md lists a Budget data object with Budget Amount / Budget Name / Budget Remaining Amount / Budget Type), a Payment Request Budget Submit workflow event (events-triggers-72339a13.md), and a Budget Approver role (approver-terminology-8559861c.md). SEARCH HARD AND EXHAUSTIVELY ANYWAY - then report the honest answer. If the configuration surface of this page is genuinely not documented here, THIN WITH ZERO FIELDS IS THE CORRECT ANSWER and you must say so explicitly, naming the external guide the corpus defers to. Do NOT invent a plausible budget-configuration screen. Do NOT harvest audit-rule Budget data-object values as if they were fields on this page - they belong to Audit Rules, which is already built.',
  },
  {
    id: 'list-management',
    name: 'List Management',
    url: '/expense/admin/invoice/listManagement.asp',
    seeds: 'Recon (starting points, NOT a limit): step-1-create-the-source-list-in-list-management-cc91aa73.md (tools-guides), connected-list-overview-3fc65ecf.md, work-with-connected-list-definitions-4dd05e1d.md, add-a-new-connected-list-definition-fc9f852a.md, modify-a-connected-list-definition-8f8d8910.md, access-connected-lists-39dd2408.md, assign-a-connected-list-to-a-form-5111fbf5.md, create-hierarchy-and-import-connected-list-data-c6ab8a52.md, use-a-custom-list-f3fc8bee.md, use-a-connected-list-1eaafd29.md, use-an-expense-type-as-the-first-field-in-a-connected-list-e0c5f415.md, not-using-custom-or-connected-lists-cdd84186.md, field-configuration-information-5813462a.md, forms-fields-lists-and-validations-configuration-process-76d94b3b.md, overview-8b2edfd0.md, step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md, step-2-associate-the-feature-hierarchy-to-the-source-list-bcaf1f5a.md, search-queries-by-list-item-code-08d2dba9.md, invoice-lists-e7e47e19.md, invoice-list-data-content-type-50e66a27.md, other-columns-4436522d.md, additional-documentation-a105a5d7.md, required-roles-53a9a79c.md, working-with-multiple-check-configurations-e88666b1.md, working-with-multiple-funding-accounts-baf93427.md, step-4-add-the-custom-field-to-the-employee-form-da376eef.md, auto-assign-an-invoice-using-hierarchies-c4035783.md. CAUTION - PAGE-IDENTITY QUESTION YOU MUST RESOLVE, NOT ASSUME: "List Management" is a distinct admin tool from the "Connected Lists" TAB that lives inside Forms and Fields (already built, page.forms-and-fields, field connectedListsTab). Connected list DEFINITIONS are created on Forms and Fields; list ITEMS / list DATA are managed in List Management. Establish from the corpus which controls belong to which, quote the evidence, and if the corpus does not separate them cleanly, RECORD THE CONTRADICTION rather than guessing.',
  },
  {
    id: 'company-locations',
    name: 'Company Locations',
    url: '/expense/admin/invoice/companyLocations.asp',
    seeds: 'Recon (starting points, NOT a limit) - NOTE THIS PAGE IS DOCUMENTED MOSTLY IN tools-guides, which is exactly the skew that nearly lost Vendor Search Admin last time: company-locations-8b49554d.md (tools), access-company-locations-024afbe1.md (tools), overview-8b494195.md (tools), required-roles-476a5f62.md (tools), add-a-shipping-or-billing-address-3b51c816.md (tools), edit-a-shipping-or-billing-address-c8138913.md (tools), delete-a-shipping-or-billing-address-ae7aef28.md (tools), import-shipping-or-billing-addresses-601c2549.md (tools), export-shipping-or-billing-addresses-59f051b2.md (tools), how-company-locations-works-with-the-purchase-order-import-ed09e36a.md (tools), understand-and-use-company-locations-377ff23e.md (admin), set-a-default-shipping-and-billing-address-f772bed1.md (admin), configuration-overview-8b381d33.md (admin), configure-purchase-orders-8128725e.md (admin), limitations-f5fac4b5.md (admin), step-4-additional-configuration-steps-37f6c7ba.md (admin), step-4-add-a-new-tax-authority-7f90cede.md (admin), provide-a-location-for-the-tax-service-6ba2cb41.md (admin), create-an-invoice-with-tax-validation-a515e7a3.md (admin). Import/export column-format tables are prime long-catalog territory.',
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
      'LENS C - TOOLS-GUIDES AND CROSS-CUTTING. This lens is the standing guard against admin-guides skew. Of 337 fields in the graph so far, only 23 cite tools-guides. That ratio is a bug, not a fact about the corpus.',
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
  '  variant - check the front-matter deliverable_id before claiming a variant.',
  '  Menu labels drift: "Invoice Admin" is a live alias for "Administration > Invoice".',
  '  "Invoice Processing Admin" is a MIDDLE NAV NODE - most Invoice admin pages hang off it, not',
  '  directly off Administration.',
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
        required: ['id', 'name', 'documentedBasis', 'coverageGuess', 'uiVariant', 'navPathEvidence', 'aliases', 'roleGates', 'identityNotes'],
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
          identityNotes: { type: 'string' }
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
        required: ['fieldName', 'disposition', 'reason'],
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
  '  Group 4: Capture Processing Admin, Vendor Search Admin, Image Handling, Units Of Measure',
  '  Group 5A: Expense Types, Forms and Fields, Accounting Administration, Map Invoice Concept Fields',
  'NOT yet built (a dependency may legitimately point at one of these and stay unresolved):',
  '  Workflows, the 11 PO Matching pages, Peppol Configuration, Shipping Configuration, Localization.',
  'The full graph is on disk at ' + KG + ' - read it with python3 when you need exact page or field names.',
].join('\n')

// ---------------------------------------------------------------------------
// PHASE 1 - MAP
// ---------------------------------------------------------------------------
phase('Map')
log('Group 5B - mapping 4 pages: Tax Administration, Budget Configuration, List Management, Company Locations')

const [nav, inventory] = await parallel([
  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: MAP / PAGE IDENTITY AND NAVIGATION ===',
    'Establish, for each of the four Group 5B pages below, (a) that it exists as an admin page, (b) how',
    'it is reached by CLICKING, with a verbatim quote for every distinct path, (c) what it is called in',
    'the corpus under every alias, (d) which role gates it, and (e) how much of it the corpus documents.',
    '',
    'navPath is LOAD-BEARING, not the URL: a direct goto on an admin URL bounces via dcredirect, so',
    'pages are reached by clicking. The corpus publishes NO .asp URLs at all - zero hits corpus-wide for',
    'PolicyAdmin, auditRules, accountingAdmin, dcredirect. The URLs given below came from live-UI',
    'observation recorded in an earlier handoff and CANNOT be corpus-verified. Do not try, and do not',
    'invent one. Use them only as the page identifier.',
    '',
    'Emit EVERY distinct documented click path you find as a separate navPathEvidence entry, each with',
    'its own verbatim quote and file. Downstream tooling picks the longest, most-attested path and keeps',
    'the rest as alternates, so more distinct evidence is strictly better. Watch the text traps:',
    '"Administration >Invoice" without the space, and "Invoice Processing Admin" as a middle nav node.',
    '',
    'PAGE IDENTITY IS A REAL QUESTION, NOT A FORMALITY. Last run discovered that "Forms and Fields" is',
    'TWO structurally distinct pages under one label (an Invoice Processing Admin tool, and a tab inside',
    'Capture Processing Admin with a stricter role gate) and they must never be collapsed. Ask the same',
    'question of all four pages here, and especially of List Management versus the Connected Lists tab',
    'inside Forms and Fields. If the corpus does not separate them cleanly, RECORD THE CONTRADICTION.',
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
    'FOR EACH of the four pages, do all of this and show the commands in searchLog:',
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
    'Search terms are your job, but at minimum cover: for Tax Administration - tax, VAT VAT, tax authority,',
    'tax code, tax administrator, tax validation, withholding, tax service; for Budget Configuration -',
    'budget, budget approval, budget approver, budget workflow, spend budget; for List Management - list,',
    'connected list, custom list, list item, list definition, list management, hierarchy, source list;',
    'for Company Locations - company location, shipping address, billing address, ship to, bill to,',
    'address, location, site.',
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
  '  "contradictions": [ {"topic": "...", "readingA": "...", "readingB": "...", "files": ["...","..."]} ],',
  '  "compressedRanges": [ {"label": "Custom 1-20", "expandsTo": "...", "count": 20, "sourceFile": "..."} ],',
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
        ' 6. THE LIST MANAGEMENT / CONNECTED LISTS BOUNDARY specifically: connected list DEFINITIONS are',
        '    documented on Forms and Fields (already built). If a candidate belongs there, drop it with',
        '    correctPage set. Be exact about which side of that line each control falls on.',
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
  'THE FINAL FIELD ROSTERS for Group 5B are on disk. Read them - they are authoritative, and the field',
  '"name" values in them are the ONLY legal field names for these four pages:',
  '  ' + rosterList,
  '',
  'The raw extraction files are also on disk and carry candidate material the rosters do not (value-set',
  'candidates, dependency candidates, contradictions, compressed ranges). Read them too:',
  built.flatMap((b) => b.extractFiles).map((f) => '  ' + f).join('\n'),
  '',
  'THE EXISTING GRAPH is at ' + KG + '. Read it with python3 to get exact page names and exact field',
  'names for the 14 pages already built. Cross-group references are valuable and must use exact names.',
  '',
  ALREADY_BUILT,
  '',
  'Group 5B page names, exactly as they must be written: ' + PAGES.map((p) => '"' + p.name + '"').join(', ') + '.',
].join('\n')

const [vsRec, depRec, stepRec] = await parallel([
  () => agent([
    PREAMBLE,
    '',
    '=== YOUR JOB: BUILD THE ConfigValueSets FOR GROUP 5B ===',
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
    '  "valueSets": [ { "appliesToPage": "<one of the four Group 5B page names>",',
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
    '=== YOUR JOB: BUILD THE ConfigDependencies FOR GROUP 5B ===',
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
    'CROSS-GROUP EDGES ARE THE MOST VALUABLE ONES. Tax Administration touches Expense Types, Policies and',
    'vendors; Company Locations touches purchase orders and the tax service; List Management touches Forms',
    'and Fields and Accounting Administration. Use EXACT existing page and field names read out of the',
    'graph JSON - an edge with a mistyped endpoint silently fails to resolve. Verify each endpoint name',
    'against the graph or a roster before you emit it.',
    'An edge into a page that is NOT YET BUILT (Workflows, PO Matching, Peppol, Shipping, Localization) is',
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
    '=== YOUR JOB: BUILD THE ConfigSteps FOR GROUP 5B ===',
    'A ConfigStep is an ordered, end-to-end configuration procedure a config writer could actually drive:',
    'the real task an administrator sits down to do, across however many pages it takes.',
    '',
    'THE RATIONALE IS THE LOAD-BEARING PART OF EACH SEQUENCE ENTRY. It records WHAT BREAKS IF THE STEP RUNS',
    'OUT OF ORDER. A rationale that merely restates the action is worthless. Mark each one explicitly as',
    'CORPUS-STATED (with the quote that states it) or INFERRED (and say what it is inferred from). Where a',
    'role gate applies, quote it.',
    '',
    'Aim for 3 to 6 steps that cover the genuinely useful procedures for these four pages - for example',
    'standing up a tax authority end to end, configuring predefined tax codes, creating and populating a',
    'list, adding and importing company shipping/billing addresses. Let the corpus decide: if a page',
    'supports no coherent end-to-end procedure, do not invent one for symmetry.',
    '',
    'Step ids MUST be prefixed "grp5b-" (this is how the merge tool namespaces them).',
    'Every name in "fields" must be an exact field name from a Group 5B roster or from the existing graph.',
    'Every name in "pages" must be an exact page name. Steps may legitimately cross into already-built',
    'pages - that is what makes them useful.',
    '',
    SYNTH_CONTEXT,
    '',
    '=== OUTPUT - write to ' + PARTS + '/synth-steps.json ===',
    '{ "steps": [ { "id": "grp5b-...", "name": "...", "goal": "<what this achieves and what silently',
    '               half-works if a leg is skipped>",',
    '               "pages": ["..."], "fields": ["..."],',
    '               "sequence": [ { "order": 1, "page": "...", "action": "<what the operator does>",',
    '                               "field": "<exact field name>",',
    '                               "rationale": "CORPUS-STATED: ... / INFERRED: ..." } ] } ] }',
    'Validate with python3 -m json.tool. Set kind to "steps"; count = number of steps; unresolvedCount =',
    'number of sequence entries whose page is not yet built.',
  ].join('\n'), { label: 'synth:steps', phase: 'Synthesize', model: 'opus', effort: 'high', schema: SYNTH_RECEIPT_SCHEMA }),
])

log('Synthesis: valueSets=' + (vsRec ? vsRec.count : 'FAILED') + ' dependencies=' + (depRec ? depRec.count : 'FAILED') + ' steps=' + (stepRec ? stepRec.count : 'FAILED'))

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
log('Critic input: ' + digest.reduce((a, d) => a + d.fieldCount, 0) + ' fields across 4 pages; ' + uncitedTotal + ' must-read files never cited')

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
    '    related to these four pages. For each hit, decide: settings table (must be captured) or',
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
    '    these four pages. Any variant document that was built from the wrong twin is a real defect: the PO',
    '    Policy New Experience doc is 15,800 bytes against a 1,490-byte legacy stub, and Groups 1-2 were',
    '    built from the stub.',
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
    ' 5. DUPLICATE NAMES. Within each page, and across the four pages, and against the existing graph. A',
    '    duplicate name within one page is a hard validator ERROR.',
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
    '    each honestly marked CORPUS-STATED or INFERRED? Are step ids prefixed grp5b-?',
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
  patchPage: 'Group 5B',
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
  },
  critics: {
    completeness: criticA || null,
    correctness: criticB || null,
  },
  navPages: (nav && nav.pages) ? nav.pages : [],
  navNarrative: (nav && nav.narrativeMarkdown) ? nav.narrativeMarkdown.slice(0, 6000) : '',
  inventoryNarrative: (inventory && inventory.narrativeMarkdown) ? inventory.narrativeMarkdown.slice(0, 6000) : '',
}
