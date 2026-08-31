// =============================================================================
// Concur Invoice KG — Group 3 (PO Matching) PAGE-ROSTER RECON.
//
// The original INVOICE-CONFIG-MAP.md recorded 11 PO-matching pages by count only; their names
// and paths were lost with the corporate-device working copy. This run re-derives the roster
// from the corpus so the Group 3 build workflow can be written against real page identities.
//
// It builds NO fields. Output is a candidate page roster with evidence, plus a richness
// estimate per page so the build can be split 3A/3B sensibly.
// =============================================================================

export const meta = {
  name: 'kg-group3-page-recon',
  description: 'Re-derive the lost Group 3 (PO Matching) admin-page roster from the Concur Invoice corpus',
  phases: [
    { title: 'Sweep', detail: 'six blind, independent sweeps: click paths, admin-guides filenames, tools-guides, roles and menus, the existing graph and release notes, and configuration-guide step topics' },
    { title: 'Roster', detail: 'merge the sweeps into one candidate page roster with evidence and a richness estimate' },
    { title: 'Challenge', detail: 'two adversarial critics: page-hood (is it a page, a tab, or an end-user screen) and completeness (what did every sweep miss)' },
  ],
}

const CORPUS = '/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE'
const REPO = '/mnt/c/Users/manci/PROJECTS/concur-config-diver-support'
const KG = REPO + '/output/kg-invoice-config.json'
const OUT = '/tmp/claude-1000/-mnt-c-Users-manci/1c189ac8-e070-426a-be01-c36742d928ed/scratchpad/g3-recon'

const PREAMBLE = [
  'You are re-deriving a LOST PAGE ROSTER for a knowledge graph of the SAP CONCUR INVOICE ADMIN',
  'CONFIGURATION SURFACE, built BLIND FROM DOCUMENTATION. The graph answers: for a desired config',
  'change, which pages, which fields, which valid values, in what order. A future Chromium automation',
  'will drive the admin UI from it.',
  '',
  'THIS RUN EXTRACTS NO FIELDS. Your product is PAGE IDENTITY: which distinct admin pages make up the',
  'PO Matching configuration area, what each is called, how it is reached by clicking, and how much of',
  'it the corpus documents. Do not build field rosters. Do not extract settings tables. Note where the',
  'rich material is so the real build can be aimed at it, but do not do that build here.',
  '',
  'CORPUS - read files directly with Bash (cat / sed -n / grep / rg). There is NO MCP server.',
  '  ROOT = ' + CORPUS,
  '  TWO guide directories, and BOTH COUNT EQUALLY:',
  '    concur-invoice-professional-edition-admin-guides/   (1209 files)',
  '    concur-invoice-professional-edition-tools-guides/   (650 files)',
  '  Two release-note directories also exist (concur-invoice-professional-edition-release-notes/,',
  '  concur-invoice-professional-edition-release-note-summaries/). They are NOT a source for fields or',
  '  values. For THIS run they may be used to corroborate a page NAME or a UI-variant claim, and you',
  '  must label any such citation as a release note.',
  '  Everything is SAP version 2026_08, Professional Edition, crawled 2026-08-29.',
  '',
  'sourceFile FORMAT - exactly "<guide-dir>/<filename>.md", relative to ROOT:',
  '  RIGHT: concur-invoice-professional-edition-admin-guides/configure-purchase-orders-8128725e.md',
  '  WRONG: CONCUR_INVOICE/... , ./... , an absolute path, or a bare filename.',
  '',
  '=== THE GOVERNING CONSTRAINT: BLIND BUILD ===',
  'This graph models what the product\'s configuration surface IS, per SAP\'s docs - never how any',
  'tenant has configured it.',
  '  * A page enters the roster ONLY because the corpus names it as an administrative page or tool.',
  '    NEVER because a PO configuration area plausibly ought to have such a page.',
  '  * Where two topics describe the same surface differently - one calling it a page, another a tab -',
  '    record BOTH and STATE THE CONTRADICTION. Do not reconcile by picking one.',
  '  * Never validate against, or infer from, a configured system. You have no tenant. You must not',
  '    imagine one.',
  '  * THIN IS A CORRECT ANSWER. If the PO area turns out to be six pages rather than eleven, six is',
  '    the answer and the discrepancy is itself a finding.',
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
  '=== ADMIN vs END-USER - THE PO AREA\'S SPECIFIC TRAP ===',
  'PO Matching documentation is unusually heavy with END-USER procedure: creating purchase requests,',
  'receiving goods, processing PO-based invoices, the Invoice Manager, the PR and PO Processor. This',
  'graph models the ADMIN CONFIGURATION surface only. A screen an employee or a processor uses to do',
  'day-to-day work is NOT a config page, however thoroughly it is documented - but the SETTINGS that',
  'govern it usually are, and they live somewhere. When you reject a screen as end-user, say where its',
  'configuration lives.',
  '',
  '=== NAVIGATION ===',
  'navPath is LOAD-BEARING, not the URL: a direct goto on an admin URL bounces via dcredirect, so pages',
  'are reached by clicking. The corpus publishes NO .asp URLs at all - zero hits corpus-wide for',
  'PolicyAdmin, auditRules, accountingAdmin, dcredirect. The URLs of the 18 pages already in the graph',
  'came from live-UI observation recorded in an earlier handoff. For GROUP 3 THERE IS NO SUCH RECORD -',
  'the original map was lost - so THE CLICK PATH IS ALL THE NAVIGATION KNOWLEDGE THAT WILL EXIST. Do not',
  'invent a URL. Collect click paths exhaustively.',
  '',
  '=== TEXT TRAPS IN THIS CORPUS ===',
  '  "Administration >Invoice" appears without the space. "Polices" is misspelled in places.',
  '  Guide titles are often singular where page names are plural. Topic pairs exist in gerund and',
  '  imperative form (editing-x-... and edit-x-...) that are the SAME content republished, NOT a UI',
  '  variant - check the front-matter deliverable_id before claiming a variant.',
  '  Menu labels drift: "Invoice Admin" is a live alias for "Administration > Invoice".',
  '  "Invoice Processing Admin" is a MIDDLE NAV NODE - most Invoice admin pages hang off it, not',
  '  directly off Administration.',
  '  SAP ships legacy and New Experience topics in the SAME 2026_08 corpus. In the PO area specifically,',
  '  policies-the-purchase-order-policy-new-experience-5a1ba7ef.md is 15,800 bytes against its legacy',
  '  twin policies-the-purchase-order-policy-8b35454a.md at 1,490 bytes. Groups 1-2 of this project were',
  '  built from the stub and that is outstanding debt. Find every such twin in the PO area and say which',
  '  is richer, with byte counts.',
].join('\n')

const ALREADY_BUILT = [
  'PAGES ALREADY IN THE GRAPH (18). A control documented on one of these is NOT a Group 3 page, and a',
  'Group 3 candidate that turns out to be one of these under another name is a DUPLICATE, not a page:',
  '  Group 1: Policies, Group Configurations, Invoice Settings',
  '  Group 2: Audit Rules, Routing Configuration, Exceptions',
  '  Group 4: Capture Processing Admin, Vendor Search Admin, Image Handling, Units Of Measure',
  '  Group 5: Expense Types, Forms and Fields, Accounting Administration, Map Invoice Concept Fields,',
  '           Tax Administration, Budget Configuration, List Management, Company Locations',
  'STILL UNBUILT and NOT part of Group 3: Workflows (13 pages, its own group), Peppol Configuration,',
  'Shipping Configuration, Localization (Group 6), and an undefined Group 7 (Ops).',
  'The full graph is on disk at ' + KG + ' - read it with python3 for exact page and field names.',
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
      description: 'Surfaces you considered and ruled out, each with the reason. An honest rejection is a finding; silence is not.',
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
  required: ['pages', 'deferred', 'reconciliation', 'splitProposal', 'wroteTo', 'headline'],
  properties: {
    pages: {
      type: 'array',
      description: 'The proposed Group 3 build roster. Admin pages only.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'name', 'aliases', 'documentedBasis', 'richness', 'uiVariantEvidence', 'navPathEvidence', 'roleGates', 'identityNotes', 'seedFiles', 'foundBySweeps'],
        properties: {
          id: { type: 'string', description: 'kebab-case stable id, e.g. "purchase-order-matching-rules".' },
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
              rawTableFiles: { type: 'integer', description: 'Files among this page\'s sources where grep -c "<table" is non-zero.' },
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
            description: 'Page-hood reasoning, boundaries against already-built pages and against sibling candidates, and any contradiction the corpus leaves unresolved.'
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
      description: 'Candidates deliberately NOT on the build roster, each with the reason: end-user screen, tab within a built page, belongs to another group, no documentary basis.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'kind', 'why'],
        properties: { name: { type: 'string' }, kind: { type: 'string' }, why: { type: 'string' } }
      }
    },
    reconciliation: {
      type: 'string',
      description: 'The lost map recorded ELEVEN PO-matching pages. Say how your count compares, and account for the difference honestly rather than padding or trimming to reach 11.'
    },
    splitProposal: {
      type: 'string',
      description: 'A proposed 3A/3B split by page, balanced on estimated extraction cost, with the reasoning. Say if the group should not be split.'
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

const jstr = (o) => JSON.stringify(o, null, 2)

// ---------------------------------------------------------------------------
// PHASE 1 - SWEEP. Six independent angles, each blind to the others.
// ---------------------------------------------------------------------------
phase('Sweep')
log('Group 3 recon: six blind sweeps for the lost PO Matching page roster')

const SWEEPS = [
  {
    key: 'clickpaths',
    model: 'opus',
    effort: 'high',
    charter: [
      '=== SWEEP A - CLICK PATHS AND MENU STRUCTURE ===',
      'You find admin pages by finding the documented ways to REACH them. A click path names its',
      'destination, which makes this the highest-precision way to enumerate the admin surface.',
      '',
      'Sweep the WHOLE corpus, both guide directories, for navigation phrasing, then keep the hits that',
      'land in the PO / purchase order / matching / receiving domain. At minimum run variants of:',
      '    grep -rn "Administration > Invoice" <both dirs>',
      '    grep -rn "Administration >Invoice" <both dirs>        # the missing-space trap',
      '    grep -rn "Invoice Processing Admin" <both dirs>',
      '    grep -rn "click .*tab\\|select .*tab\\|left menu\\|left-hand menu\\|menu, click" <both dirs>',
      'and follow every PO-domain hit into its file to see what page the path terminates at.',
      '',
      'For EVERY distinct destination in the PO domain, emit a candidate with the full click sequence as',
      'a navPath array (["Administration", "Invoice", "..."]) and the verbatim quote that states it.',
      'Emit EVERY distinct path you find as a separate navPathEvidence entry, each with its own quote:',
      'downstream tooling picks the longest, most-attested path and keeps the rest as alternates, so more',
      'distinct evidence is strictly better.',
      '',
      'Watch for the middle nav node: "Invoice Processing Admin" sits between "Administration > Invoice"',
      'and most Invoice admin pages. A path that omits it may be an abbreviation, not a different page.',
      'Where a path terminates on a TAB inside a page, say so - that is a tab-within-page candidate, and',
      'distinguishing the two is the point of this sweep.',
    ].join('\n'),
  },
  {
    key: 'adminfiles',
    model: 'opus',
    effort: 'high',
    charter: [
      '=== SWEEP B - ADMIN-GUIDES FILENAME AND CONTENT SWEEP ===',
      'You own concur-invoice-professional-edition-admin-guides/ (1209 files) and you sweep it',
      'exhaustively for the PO domain. Breadth is your job; another sweep is doing tools-guides.',
      '',
      'Filename sweep first - ls the directory and grep the filenames for every term and synonym:',
      '  purchase-order, purchase order, purchase-request, po-, -po-, matching, match, match-rule,',
      '  rule-set, receiving, receipt-of-goods, goods-receipt, three-way, two-way, change-order,',
      '  copy-down, transmit, transmission, requisition, catalog, punchout, supplier, procurement.',
      'Then a content sweep with grep -rl for the same terms, case-insensitive, because the corpus names',
      'topics inconsistently and a page may be documented in a file whose name never says "PO".',
      '',
      'Then GROUP the hits by the administrative surface they configure, and for each group ask the',
      'page-hood question from the preamble. Report the file count and total bytes per group - the build',
      'downstream is sized off your numbers, so use wc -c and ls, not impressions.',
      '',
      'Two specific things to resolve, because both are documented ambiguously:',
      '  1. PURCHASE ORDER POLICY. Is this a distinct admin page, or is it a policy TYPE configured on',
      '     the already-built Policies page? Both readings are defensible from the file names alone.',
      '     policies-the-purchase-order-policy-new-experience-5a1ba7ef.md is the richest file in the PO',
      '     area at 15,800 bytes; establish what surface it actually documents before anyone builds it.',
      '  2. MATCHING RULES. access-purchase-order-matching-rules-*, create-*, edit-*, copy-*, and',
      '     purchase-order-matching-rules-new-experience-* exist. Is that one page with a list and an',
      '     editor, or several? Is "match rule set" a separate surface from "match rule"?',
    ].join('\n'),
  },
  {
    key: 'toolsguides',
    model: 'opus',
    effort: 'high',
    charter: [
      '=== SWEEP C - TOOLS-GUIDES SWEEP ===',
      'You are the standing guard against admin-guides skew. Of 437 fields in the graph so far, only a',
      'handful cite tools-guides, and that ratio is a bug rather than a fact about the corpus: Vendor',
      'Search Admin is documented ONLY in tools-guides and was nearly lost, and Company Locations turned',
      'out to be documented mostly there too.',
      '',
      'START in concur-invoice-professional-edition-tools-guides/ (650 files) and EXHAUST it for the PO',
      'domain before you open admin-guides at all. ls it in full and read the filenames; the directory is',
      'small enough to eyeball completely, so do that rather than relying on greps alone.',
      '',
      'You own in particular: required-roles and permissions topics, overview topics, limitations,',
      'prerequisites, IMPORT AND EXPORT FILE FORMAT specifications (record layouts, column definitions,',
      'required-vs-optional flags - these are long catalogs and among the most valuable artefacts in the',
      'corpus), and integration topics describing how a PO surface feeds or is fed by another tool.',
      '',
      'concur-invoice-purchase-order-import-specification-8b443eee.md is a known file. Establish whether',
      'the Purchase Order Import is a distinct ADMIN PAGE with its own click path, a tab inside an import',
      'tool shared across products, or a file specification with no screen of its own. The graph already',
      'carries unresolved dependency endpoints naming both "Purchase Order Import" and "Vendor Employee',
      'Access Import", and a previous group left exactly this question open - settle it with evidence.',
      '',
      'Also settle: is the "PR and PO Processor" (create-new-queries-in-pr-and-po-processor-*, edit-*,',
      'delete-*, export-query-results-*) an admin configuration page or an end-user processing tool?',
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
      '',
      'Sweep both guide directories for: required-roles*, *-roles-*, "user permissions", "role", "rights",',
      '"only an administrator", "you must have the", "Invoice Configuration Administrator",',
      '"Invoice Processor", "Purchasing", "PO Administrator", "Receiving", "Concur Receiving".',
      'For each role, list the administrative surfaces it is documented as reaching, then keep the ones',
      'in the PO domain.',
      '',
      'Also sweep FEATURE ACTIVATION topics: "activate", "enable the", "feature activation",',
      '"contact SAP Concur support", "must be enabled by". In this product a configuration surface is',
      'frequently gated behind a feature that support enables, and the gate is itself load-bearing',
      'knowledge for a config writer - a page that cannot be reached until a feature is on needs saying.',
      'activate-the-multiple-purchase-order-feature-*, enable-the-po-change-order-feature-* and',
      'configure-three-way-matching-* are known starting points, not a limit.',
      '',
      'For every PO-domain surface a role or activation topic names, emit a candidate with the role gate',
      'quoted verbatim. Where a role reaches a surface that no other sweep would find - because it has no',
      'dedicated topic file of its own - that is the highest-value find available to you.',
    ].join('\n'),
  },
  {
    key: 'graphrefs',
    model: 'opus',
    effort: 'high',
    charter: [
      '=== SWEEP E - THE EXISTING GRAPH\'S OWN FORWARD REFERENCES ===',
      'Five groups have already been built, and their dependency edges point FORWARD into the PO area.',
      'Those endpoints were written by agents reading the corpus with no knowledge of this roster, which',
      'makes them independent evidence for what the PO pages are called.',
      '',
      'Read ' + KG + ' with python3. Extract:',
      '  1. Every ConfigDependency whose sourceRef or targetRef has resolved:false, and the page name it',
      '     carries. Rank by frequency. Names already observed include "Purchase Order Configuration",',
      '     "Purchase Order Import", "Purchase Order Matching Rules", "Purchase Order Settings" and',
      '     "Purchase Request Settings" - confirm these against the corpus and find the rest yourself.',
      '  2. Every ConfigStep sequence entry naming a page not in configPages.',
      '  3. Every field NOTE and every page identityNotes/verifyNotes mentioning purchase orders,',
      '     matching, receiving or purchase requests. A note saying "configured on X" names X.',
      '  4. Every ConfigContradiction whose topic touches the PO area.',
      '',
      'For EACH page name you recover, go to the corpus and try to CORROBORATE it with a verbatim quote.',
      'A name that appears only in the graph and nowhere in the corpus is a previous agent\'s invention',
      'and must be reported as such - that is a real finding about existing graph quality, and this is',
      'the only sweep positioned to make it.',
      '',
      'Then check the two release-note directories for PO page names and for New Experience announcements',
      'in the PO area. Release notes are NOT a source for fields or values; for page NAMES and UI-variant',
      'dating they are legitimate, and you must label any citation from them as a release note.',
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
      'Sweep both guide directories for step and process topics in the PO domain:',
      '  step-1-*, step-2-*, ... step-N-*, *-configuration-process-*, configuration-overview-*,',
      '  *-setup-*, overview-*, *-checklist-*, prerequisites-*, "before you begin", "in this order",',
      '  "you must ... before", configure-purchase-orders-*, po-based-invoice-lifecycle-*,',
      '  example-of-typical-purchase-order-workflow-*.',
      '',
      'Read the front matter of the PO topics you find. Files carry a deliverable_id and title; use them',
      'to reconstruct WHICH GUIDE each topic belongs to and, where the corpus preserves it, the guide\'s',
      'own table of contents ordering. A guide called something like "Concur Invoice: Purchase Order',
      'Configuration Guide" would be the single best index of this group that exists - find out whether',
      'one is present, and if so reproduce its structure.',
      '',
      'Emit a candidate for every admin surface the setup flow tells the administrator to visit, in the',
      'order it tells them to. Where the flow crosses into an already-built page (Policies, Forms and',
      'Fields, Audit Rules, Expense Types), say so rather than emitting a duplicate: a PO setup flow that',
      'routes through Policies is evidence about ORDERING, not a new page.',
    ].join('\n'),
  },
]

const sweeps = await parallel(SWEEPS.map((S) => () => agent([
  PREAMBLE,
  '',
  S.charter,
  '',
  '=== EVERY SWEEP SHARES THESE OBLIGATIONS ===',
  'You are ONE OF SIX independent sweeps, each blind to the others, each entering the corpus from a',
  'different direction. Do not narrow your search on the assumption that another sweep covers something',
  '- overlap is the design, and a candidate found by four sweeps is stronger evidence than one found by',
  'one. Equally, a candidate ONLY YOU find is the reason you exist: report it with your best evidence.',
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
  '=== YOUR JOB: MERGE SIX BLIND SWEEPS INTO ONE GROUP 3 BUILD ROSTER ===',
  'Six sweeps entered the corpus from six directions and proposed candidate surfaces. Produce the single',
  'authoritative Group 3 page roster the build workflow will be written against. Get this wrong and every',
  'field downstream is filed under the wrong page - the one failure mode grep cannot catch.',
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
  '    against that page, not a Group 3 page. end-user-screen and feature-name-only go to deferred with',
  '    the reason. Where the sweeps DISAGREE about kind, that disagreement is the most valuable signal in',
  '    this run: go to the corpus, settle it with a quote, and record what the disagreement was.',
  ' 4. GUARD THE BOUNDARY against the 18 already-built pages. A PO surface documented on Policies is not',
  '    a Group 3 page. Resolve the Purchase Order Policy question explicitly and say which way it went.',
  ' 5. SIZE EVERY PAGE HONESTLY. richness drives the 3A/3B split and the model tiers. Count files and',
  '    bytes with real commands. Run grep -c "<table" over each page\'s sources for rawTableFiles. Count',
  '    enumerations of 10+ entries for longCatalogs. estimatedFields is an order-of-magnitude judgement -',
  '    the pages already built range from 2 to 91 fields, so use that scale.',
  ' 6. SEED FILES ARE THE BUILD\'S STARTING POINT, richest first. The build\'s Map phase re-derives its own',
  '    inventory, so seeds are a floor and not a ceiling - but a bad seed list aims the whole build wrong.',
  '',
  '=== THE COUNT ===',
  'The lost map recorded ELEVEN PO-matching pages. That number is a checksum, NOT a target. Do not pad',
  'to reach it and do not trim to it. If you land on eight or fourteen, say so and account for the',
  'difference - the original may have counted tabs as pages, or split matching rules differently, or',
  'included a surface this corpus version no longer documents. Reconciling honestly is the deliverable.',
  '',
  '=== THE SPLIT ===',
  'Eleven pages at three lenses each is roughly 73 agents in one run, about four hours. Propose a 3A/3B',
  'split balanced on ESTIMATED EXTRACTION COST rather than page count, keeping pages that share sources',
  'in the same half so two runs do not read the same long catalog twice. Say plainly if the group is small',
  'enough not to need splitting.',
  '',
  ALREADY_BUILT,
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
  'with its evidence, the deferred list with reasons, the reconciliation against eleven, and the split',
  'proposal. Then return the structured object with wroteTo set to that path.',
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
  ALREADY_BUILT,
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
    '    and no left-menu entry is a weak page claim however many topics describe it.',
    ' 2. IS IT ADMIN? PO documentation is heavy with end-user procedure - purchase requests, receiving,',
    '    the PR and PO Processor, the Invoice Manager, PO-based invoice creation. Every one of those is a',
    '    trap. If a screen is where an employee or processor does daily work, it does not belong, however',
    '    thoroughly documented. Name every roster entry that fails this test.',
    ' 3. IS IT ALREADY BUILT? grep the distinctive label across the corpus and read what page the hits',
    '    actually describe. Check the 18 built pages in ' + KG + '. Purchase Order Policy against the',
    '    built Policies page is the specific collision to settle, and getting it wrong in either direction',
    '    costs: a duplicate page, or 15,800 bytes of the richest PO documentation going unbuilt.',
    ' 4. IS IT ONE PAGE OR SEVERAL? Audit Rules is one page with three tabs and splitting it would have',
    '    been wrong; Forms and Fields is two pages under one label and collapsing them would have been',
    '    wrong. Apply that scrutiny to the matching-rules cluster and to anything named "Settings" or',
    '    "Configuration" - those labels attract conflation.',
    ' 5. DOES THE EVIDENCE HOLD? grep -F every sourceQuote on the roster against its cited file. Report',
    '    every miss. Then check that each quote actually SUPPORTS the claim rather than merely containing',
    '    similar words - a quote that names a page in passing is not evidence that it is an admin page.',
    ' 6. IS THE NAME RIGHT? The name becomes the page node and every dependency endpoint that resolves',
    '    against it. Is it what the corpus calls the page, or what an agent thought it should be called?',
    '    Prefer the corpus\'s own string. Report every name you would change and to what.',
    ' 7. ARE THE RICHNESS NUMBERS REAL? Spot-check fileCount and totalBytes with wc -c. An inflated',
    '    estimate distorts the split; a deflated one starves a page of extraction effort.',
    '',
    'CALIBRATION: do not refute a page merely because its documentation is thin - thin is a correct',
    'answer and a sparsely documented admin page is still a page. Name the specific defect, or endorse it.',
    '',
    CRITIC_CONTEXT,
    '',
    '=== OUTPUT ===',
    'Write a thorough markdown critique to ' + OUT + '/critic-pagehood.md, organised by the seven headings,',
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
    'tools-guides table contradicting its admin-guides twin and never opened.',
    '',
    'Work through this and name FILES, not impressions:',
    ' 1. RUN YOUR OWN SWEEP. Do not start from the roster. Start from the corpus, in BOTH guide',
    '    directories, with synonyms the six sweeps may not have tried: requisition, procurement,',
    '    commodity, catalog, punchout, supplier, sourcing, contract, blanket order, standing order,',
    '    encumbrance, obligation, goods receipt, service entry, delivery, freight, landed cost.',
    '    Then compare what you find against the roster and the deferred list.',
    ' 2. THE ELEVEN. The lost map recorded eleven pages. If the roster has fewer, your job is to find the',
    '    missing ones or to prove they never existed as pages in this corpus version. If it has more, find',
    '    which are over-splits. Do not accept the reconciliation narrative without testing it.',
    ' 3. THE DEFERRED LIST IS WHERE MISTAKES HIDE. Read every deferred entry and challenge its reason. An',
    '    end-user screen wrongly deferred loses a real config page; a feature-name-only rejection may be',
    '    hiding a surface documented under a different label. Name every deferral you would reverse.',
    ' 4. NEW EXPERIENCE TWINS. Find EVERY new-experience / legacy pair in the PO area with byte counts.',
    '    Groups 1-2 of this project were built from a 1,490-byte stub whose New Experience twin is 15,800',
    '    bytes, and that is outstanding debt. Is any roster page about to repeat it? Is any twin pair',
    '    evidence that a surface was REPLACED rather than revised - which would make the legacy page a',
    '    separate historical entry rather than the same page?',
    ' 5. RAW <table> SWEEP. Run grep -c "<table" across both guide directories for every file plausibly in',
    '    the PO domain. Corpus-wide there are about 32 such files. A page-relevant one is a near-certain',
    '    long catalog and the single most expensive thing this project has lost. Is every one of them',
    '    attributed to a roster page\'s seedFiles?',
    ' 6. LONG CATALOG SWEEP. Any enumeration of 10+ entries in a PO-domain file - import/export column',
    '    specs, match-rule condition catalogs, status lists, exception lists, field-definition tables.',
    '    Count the rows yourself and say which roster page should own each. An unowned catalog is a page',
    '    the roster is missing, or a seed list that is incomplete.',
    ' 7. SEED QUALITY. For each roster page, is the seed list actually the richest files? Sort the',
    '    page\'s candidate files by bytes and compare. A seed list that misses the biggest file aims the',
    '    build at the stub.',
    ' 8. THE SPLIT. Does the proposed 3A/3B split separate pages that share source files, forcing two runs',
    '    to read the same long catalog? Is it balanced on real extraction cost?',
    ' 9. UNDETERMINED BY THE DOCUMENTATION. Rank the places where the corpus genuinely cannot answer the',
    '    page-identity question. These are properties of the corpus, NOT a to-do list against a live',
    '    tenant, and recording them accurately is part of the deliverable.',
    '',
    CRITIC_CONTEXT,
    '',
    '=== OUTPUT ===',
    'Write a thorough markdown critique to ' + OUT + '/critic-completeness.md, organised by the nine',
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
