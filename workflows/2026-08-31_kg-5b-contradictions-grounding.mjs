export const meta = {
  name: 'kg-5b-contradictions',
  description: 'Ground Group 5B raw contradictions and compressed ranges into schema-valid, quote-verified nodes',
  phases: [
    { title: 'Ground', detail: 'one agent per page: give every reading its own verbatim quote' },
    { title: 'Merge', detail: 'dedupe across lenses and pages, assign refs, kind and consequence' },
    { title: 'Verify', detail: 'grounding refuter + is-it-really-a-contradiction refuter' },
    { title: 'Emit', detail: 'apply verdicts and write the final node files' },
  ],
}

const CORPUS = '/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE'
const REPO = '/mnt/c/Users/manci/PROJECTS/concur-config-diver-support'
const PARTS = '/tmp/claude-1000/-mnt-c-Users-manci/121ceff0-9ce5-4ce2-b7bf-be6841646c10/scratchpad/5b-parts'
const KINDS = "'label-drift' | 'option-list' | 'scope' | 'structure' | 'cardinality' | 'requirement'"

const PAGES = [
  { id: 'tax-administration', name: 'Tax Administration' },
  { id: 'company-locations', name: 'Company Locations' },
  { id: 'list-management', name: 'List Management' },
]

const PREAMBLE = [
  'You are working on a KNOWLEDGE GRAPH OF THE SAP CONCUR INVOICE ADMIN CONFIGURATION SURFACE,',
  'derived BLIND FROM DOCUMENTATION. A future Chromium automation drives the admin UI from it.',
  '',
  'CORPUS - read files directly with Bash (cat / sed -n / grep). There is NO MCP server.',
  '  ROOT = ' + CORPUS,
  '  Two guide directories, both counting equally:',
  '    concur-invoice-professional-edition-admin-guides/   (1209 files)',
  '    concur-invoice-professional-edition-tools-guides/   (650 files)',
  '  sourceFile format is exactly "<guide-dir>/<file>.md", relative to ROOT. Never an absolute path,',
  '  never a bare basename, never a CONCUR_INVOICE/ prefix.',
  '',
  '=== THE TASK IN ONE SENTENCE ===',
  'The governing constraint says: where two topics give DIFFERENT accounts of the same control,',
  'RECORD BOTH AND STATE THE CONTRADICTION - never reconcile by picking one. Group 5B did that work',
  'and produced 47 contradiction records and 15 compressed ranges, but they were written into a',
  'container the pipeline discarded. Two new node types now exist for them. Your job is to turn the',
  'raw records into nodes that can actually be validated.',
  '',
  '=== WHY THEY ARE NOT ALREADY NODES ===',
  'The raw records put their evidence in PROSE - readingA reads like',
  '  "admin-guides: \'Countries that are not supported for VAT ... are the US, Canada, India\'"',
  'with the quote wrapped in commentary and a shared `files` list that does not map one-to-one onto',
  'the readings. The project\'s invariant is NO QUOTE, NO NODE, and that cannot be checked against a',
  'prose blob. Every reading must end up with its OWN sourceQuote and its OWN sourceFile.',
  '',
  '=== GROUNDING - NON-NEGOTIABLE ===',
  'Every sourceQuote must be a VERBATIM SUBSTRING of its cited file. Verify BEFORE you emit:',
  '    grep -F -c "<the exact quote>" "' + CORPUS + '/<sourceFile>"',
  'must return >= 1. A deterministic validator re-checks every one and FAILS THE BUILD on a miss -',
  'for these node types an unverifiable quote is an ERROR, exactly as it is for a field.',
  'Keep quotes short enough to survive markdown line-wrapping: prefer one unwrapped line or clause.',
  'Never join wrapped lines, never normalise whitespace, never "clean up" a quote.',
  '',
  '=== BLIND BUILD ===',
  'Model what the docs SAY, never what a tenant does. Do NOT reconcile a contradiction, do not pick',
  'a winner, and do not invent a reading the corpus does not contain. Many of these differences are',
  'provisioning-dependent - what a screen offers varies with the modules a site has enabled - so a',
  'single answer would be wrong while looking right. A hypothesis about the cause goes in `notes`,',
  'phrased as a hypothesis.',
].join('\n')

const CONTRA_SHAPE = [
  'CONTRADICTION node shape:',
  '{',
  '  "kind": ' + KINDS + ',',
  '     label-drift  - same control, different name/label across topics',
  '     option-list  - different enumerations offered for the same control',
  '     scope        - disagreement about what is supported, or where something applies',
  '     structure    - disagreement about where something lives or how it is organised',
  '     cardinality  - disagreement about HOW MANY (one VAT field or four)',
  '     requirement  - required in one topic, optional in another',
  '  "topic": "<what the corpus disagrees about, in one line>",',
  '  "appliesTo": {"page": "<exact page name>", "field": "<exact field name from that page\'s roster>"},',
  '        OR {} when it attaches to no single field. BOTH ARE VALID. A contradiction about whether',
  '        Canada is supported for VAT is about the PRODUCT, not a field - leave appliesTo empty',
  '        rather than attaching it to a plausible neighbour. An honest null beats a wrong owner.',
  '  "readings": [',
  '     {"summary": "<what THIS document says, in your words, one or two lines>",',
  '      "sourceQuote": "<VERBATIM substring of THIS reading\'s own file, grep -F verified>",',
  '      "sourceFile": "<guide-dir>/<file>.md"},',
  '     ... AT LEAST TWO, and they must cite DIFFERENT (file, quote) pairs',
  '  ],',
  '  "consequenceForWriter": "<what the config writer should actually DO about it>",',
  '  "notes": "<any hypothesis about the cause, stated as a hypothesis>"',
  '}',
  '',
  'consequenceForWriter IS THE LOAD-BEARING FIELD, the way `rationale` is for a ConfigStep.',
  '"The docs disagree" is not actionable. "Expect either label and match on whichever resolves first"',
  'is. Say what the automation should do when it meets this on screen.',
].join('\n')

const RANGE_SHAPE = [
  'COMPRESSED RANGE node shape:',
  '{',
  '  "label": "<the compressed string EXACTLY as the source writes it>",',
  '        CHARACTER-EXACT. An en-dash is not a hyphen. "Vat" is not "VAT". "Custom 1 - 20" is not',
  '        "Custom 1-20". The point is to match what a crawler will read off the screen, so copy the',
  '        source\'s characters rather than tidying them. Where the distinction matters, say so in notes.',
  '  "expandsTo": ["<member>", "<member>", ...],',
  '        AN ENUMERATION, NOT A DESCRIPTION. ["Level 1 Code", ... "Level 10 Code"] - never',
  '        "ten segment level columns". Several raw records wrote a prose description here; that is',
  '        exactly what makes them useless to an automation. Expand them.',
  '  "count": <MUST equal expandsTo.length - the validator checks this>,',
  '  "appliesTo": {"page": "...", "field": "..."} or {},',
  '  "sourceQuote": "<VERBATIM substring of sourceFile showing the compressed form, grep -F verified>",',
  '  "sourceFile": "<guide-dir>/<file>.md",',
  '  "notes": "<source-character notes, and what the members mean>"',
  '}',
].join('\n')

const RECEIPT = {
  type: 'object',
  additionalProperties: false,
  required: ['wroteTo', 'jsonValid', 'contradictionCount', 'rangeCount', 'droppedForNoQuote', 'headline'],
  properties: {
    wroteTo: { type: 'string' },
    jsonValid: { type: 'boolean', description: 'True only after python3 -m json.tool actually passed.' },
    contradictionCount: { type: 'integer' },
    rangeCount: { type: 'integer' },
    droppedForNoQuote: {
      type: 'array',
      description: 'Raw records you could NOT ground with two verbatim quotes. Dropping is correct; hiding it is not.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['topic', 'why'],
        properties: { topic: { type: 'string' }, why: { type: 'string' } }
      }
    },
    headline: { type: 'string' }
  }
}

const VERDICTS = {
  type: 'object',
  additionalProperties: false,
  required: ['refuter', 'verdicts', 'findings'],
  properties: {
    refuter: { type: 'string' },
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['ref', 'disposition', 'reason'],
        properties: {
          ref: { type: 'string', description: 'The topic (contradictions) or label (ranges) exactly as given.' },
          disposition: { type: 'string', enum: ['keep', 'repair', 'drop'] },
          reason: { type: 'string' },
          defect: { type: 'string', description: 'On repair: exactly what is wrong and what it should be.' }
        }
      }
    },
    findings: { type: 'string' }
  }
}

// ---------------------------------------------------------------------------
phase('Ground')
log('Grounding 47 raw contradictions and 15 raw compressed ranges from the Group 5B extracts')

const grounded = await parallel(PAGES.map((p) => () => agent([
  PREAMBLE,
  '',
  '=== YOUR JOB: GROUND ONE PAGE\'S RAW RECORDS ===',
  'Read the three Group 5B extract files for ' + p.name + ':',
  '  ' + PARTS + '/extract-' + p.id + '-procedure.json',
  '  ' + PARTS + '/extract-' + p.id + '-tables.json',
  '  ' + PARTS + '/extract-' + p.id + '-crosscut.json',
  'Each has a "contradictions" array ({topic, readingA, readingB, files}) and a "compressedRanges"',
  'array ({label, expandsTo, count, sourceFile}). Convert every one into the node shapes below.',
  '',
  'FOR EACH RAW CONTRADICTION:',
  ' 1. Work out which file backs readingA and which backs readingB. The raw `files` list is often',
  '    longer than the number of readings and is NOT positionally aligned - do not assume files[0]',
  '    goes with readingA. Read the files and find out.',
  ' 2. Open each file and find the sentence that ACTUALLY STATES that reading. Extract it verbatim.',
  '    A quote that merely mentions the subject is not evidence of the claim - the quote must carry',
  '    the disagreement.',
  ' 3. grep -F -c each quote against its own file. If it does not return >= 1, fix the quote.',
  ' 4. If a reading genuinely CANNOT be grounded in a verbatim sentence, drop the whole record and',
  '    record it in droppedForNoQuote with the reason. A contradiction needs two pieces of evidence;',
  '    one is not a contradiction. Dropping is the correct outcome there, and it must be visible.',
  ' 5. A raw record may carry THREE OR MORE readings folded into two prose blobs (the VAT country',
  '    one cites three files). Emit all of them as separate readings - more grounded evidence is',
  '    strictly better, and the schema takes 2 or more.',
  '',
  'FOR EACH RAW COMPRESSED RANGE:',
  ' 1. Several raw records put a PROSE DESCRIPTION in expandsTo instead of an enumeration. Open the',
  '    source and write the actual member names out. If the source enumerates them, copy them; if the',
  '    source only gives the compressed form, expand it mechanically ("Future Use 1-10" -> "Future',
  '    Use 1" ... "Future Use 10") and say in notes that the expansion is mechanical, not quoted.',
  ' 2. count MUST equal expandsTo.length.',
  ' 3. The label must be character-exact. Check the source bytes for en-dash vs hyphen and for case.',
  ' 4. sourceQuote must be the verbatim sentence or table cell showing the COMPRESSED form.',
  '',
  'ATTACHING TO A FIELD: the roster for this page is at ' + PARTS + '/roster-' + p.id + '.json.',
  'appliesTo.field must be an exact "name" from it (or from another page\'s roster / the existing',
  'graph at ' + REPO + '/output/kg-invoice-config.json). If nothing fits, leave appliesTo as {}.',
  '',
  CONTRA_SHAPE,
  '',
  RANGE_SHAPE,
  '',
  'Write {"contradictions": [...], "compressedRanges": [...]} to',
  '  ' + PARTS + '/ground-' + p.id + '.json',
  'Then run python3 -m json.tool on it until it passes, and return the receipt.',
].join('\n'), { label: 'ground:' + p.id, phase: 'Ground', model: 'opus', effort: 'high', schema: RECEIPT })))

const live = (grounded || []).filter(Boolean)
for (const g of live) log(g.wroteTo.split('/').pop() + ': ' + g.contradictionCount + ' contradictions, ' + g.rangeCount + ' ranges, ' + (g.droppedForNoQuote || []).length + ' dropped for no quote')
if (!live.length) throw new Error('Ground phase produced nothing')

// ---------------------------------------------------------------------------
phase('Merge')
const merged = await agent([
  PREAMBLE,
  '',
  '=== YOUR JOB: DEDUPE AND MERGE ACROSS PAGES ===',
  'Three agents grounded one page each. Their output files:',
  live.map((g) => '  ' + g.wroteTo).join('\n'),
  '',
  'THE SAME CONTRADICTION WAS FOUND MORE THAN ONCE. Three lenses ran per page and they overlap, and',
  'some contradictions span pages. Known duplicates in the raw data, which you must confirm yourself:',
  '  - "Country support for VAT" was found by BOTH the tax crosscut and tax tables lenses.',
  '  - "Tax Validation option labels" was found by BOTH the tax crosscut and tax tables lenses.',
  '  - "Future Use 1-10" appears FOUR times (two import-record files x two lenses). Two of those are',
  '    genuinely different source files (the 210 and 220 records) and must stay separate; the other',
  '    two are the same file seen twice and must merge.',
  '  - "Level 1 Code - Level 10 Code" appears twice from DIFFERENT files (8b51ca3d and 8b4aa547) -',
  '    check whether those are two real sources or one document published twice before merging.',
  '',
  'MERGE RULE: two records are the same node when they are about the same disagreement. Merge them',
  'into one, taking the UNION of readings, deduplicated on (sourceFile, sourceQuote). More grounded',
  'readings on one node is better than two nodes with one reading each. Never merge two records that',
  'cite genuinely different sources about genuinely different things.',
  '',
  'THEN, for every surviving node:',
  ' - Assign `kind` from the enum. ' + KINDS,
  ' - Write `consequenceForWriter` - what the automation should DO. This is the load-bearing field',
  '   and several raw records have nothing usable in them yet.',
  ' - Set `appliesTo` to an exact {page, field} from a roster or the existing graph, or {} if none',
  '   fits. Do not attach a product-level disagreement to a plausible field.',
  ' - Re-verify every quote with grep -F -c before you write it. You are copying quotes between',
  '   files, which is exactly where a verbatim quote stops being verbatim.',
  '',
  'Rosters: ' + PARTS + '/roster-*.json   Graph: ' + REPO + '/output/kg-invoice-config.json',
  '',
  CONTRA_SHAPE,
  '',
  RANGE_SHAPE,
  '',
  'Write the merged set to ' + PARTS + '/cand-contradictions.json as',
  '  {"contradictions": [...], "compressedRanges": [...]}',
  'Validate with python3 -m json.tool and return the receipt. In headline, say how many duplicates',
  'you collapsed and which ones you refused to collapse, with the reason.',
].join('\n'), { label: 'merge:dedupe', phase: 'Merge', model: 'opus', effort: 'high', schema: RECEIPT })

if (!merged) throw new Error('Merge phase failed')
log('merged: ' + merged.contradictionCount + ' contradictions, ' + merged.rangeCount + ' ranges')

// ---------------------------------------------------------------------------
phase('Verify')
const shared = [
  PREAMBLE,
  '',
  '=== YOUR JOB: ADVERSARIALLY VERIFY ===',
  'The candidate nodes are at ' + PARTS + '/cand-contradictions.json. Read them. Return a disposition',
  'for EVERY contradiction (by its `topic`) and EVERY range (by its `label`).',
  '',
  'THREE-WAY DISPOSITION:',
  '  keep   = sound as written, and I verified it with commands.',
  '  repair = the record is REAL but DEFECTIVE. Say exactly what is wrong and what it should be.',
  '  drop   = this is not a contradiction / not a compressed range at all.',
  'If you find yourself writing "keep, but..." the disposition is REPAIR. When in doubt, repair.',
  'Never drop to resolve your own uncertainty. A missing verdict routes to repair automatically, so',
  'an omission costs accuracy and saves you nothing.',
].join('\n')

const [vGround, vReal] = await parallel([
  () => agent([
    shared,
    '',
    '=== YOUR LENS: GROUNDING (refuter 1 of 2) ===',
    'Attack every quote against its own cited file. This is mechanical - script it, do not sample.',
    ' 1. Does the file exist at the stated path, in the stated guide directory?',
    ' 2. Does each sourceQuote appear VERBATIM? Run grep -F -c on every single one.',
    ' 3. Does the quote actually STATE the reading it is attached to, or does it merely mention the',
    '    subject? A quote that does not carry the disagreement is not evidence - that is a repair.',
    ' 4. Do the two readings of a contradiction cite DIFFERENT (file, quote) pairs? Two readings of',
    '    the same sentence are not a contradiction - that is a drop.',
    ' 5. For each range: does count equal expandsTo.length? Is expandsTo an ENUMERATION rather than a',
    '    prose description? Is the label character-exact against the source bytes (check en-dash vs',
    '    hyphen with grep, and check case)?',
    ' 6. Is appliesTo an exact page+field that exists in a roster or the graph? A near-miss name is a',
    '    repair, not a drop.',
  ].join('\n'), { label: 'verify:grounding', phase: 'Verify', model: 'opus', effort: 'high', schema: VERDICTS }),

  () => agent([
    shared,
    '',
    '=== YOUR LENS: IS IT REALLY A CONTRADICTION? (refuter 2 of 2) ===',
    'Attack the CLAIM rather than the quote. The expensive failure mode here is a node asserting a',
    'disagreement that does not exist - it would tell a Chromium automation to distrust a list that is',
    'actually reliable. For each contradiction:',
    ' 1. Do the two readings genuinely CONFLICT, or are they COMPATIBLE? Two topics describing',
    '    different scopes of the same feature, or one being more specific than the other, is not a',
    '    contradiction. Read both files properly before deciding. If they are compatible, DROP it and',
    '    say why.',
    ' 2. Is the `kind` right? A cardinality disagreement filed as label-drift sends the automation',
    '    down the wrong path.',
    ' 3. Is `consequenceForWriter` actually actionable, or does it just restate that the docs differ?',
    '    Vague consequence = repair, and say what it should say.',
    ' 4. Is this a contradiction between TOPICS, or just one document being imprecise? A single file',
    '    using two labels loosely is worth recording as label-drift; a typo is not.',
    ' 5. Check the corpus front matter. Two same-titled files with the SAME deliverable_id are often',
    '    one document republished, not two independent sources - Group 5A already learned this and',
    '    mistook a republication for a UI variant. Confirm before you accept a contradiction that',
    '    rests on it, and say which case each one is.',
    ' 6. For ranges: is the expansion CORRECT? "Vat Amount 2 - 4" expands to three members, not four.',
    '    Where an expansion is mechanical rather than quoted, is that disclosed in notes?',
  ].join('\n'), { label: 'verify:reality', phase: 'Verify', model: 'opus', effort: 'high', schema: VERDICTS }),
])

const vsets = [vGround, vReal].filter(Boolean)
const byRef = new Map()
for (const vs of vsets) for (const v of (vs.verdicts || [])) {
  const k = String(v.ref || '').trim().toLowerCase()
  if (!byRef.has(k)) byRef.set(k, [])
  byRef.get(k).push({ refuter: vs.refuter, disposition: v.disposition, reason: v.reason, defect: v.defect })
}
const verdictReport = Array.from(byRef.entries()).map(([k, vs]) => ({ ref: k, verdicts: vs }))
log('verdicts collected for ' + byRef.size + ' records from ' + vsets.length + ' refuters')

// ---------------------------------------------------------------------------
phase('Emit')
const emitted = await agent([
  PREAMBLE,
  '',
  '=== YOUR JOB: APPLY THE VERDICTS AND WRITE THE FINAL NODE FILES ===',
  'Candidates: ' + PARTS + '/cand-contradictions.json',
  'Two adversarial refuters have judged every record. Their verdicts, keyed by topic/label:',
  JSON.stringify(verdictReport, null, 2),
  '',
  'COMBINATION RULE - apply it exactly, it is not yours to vary:',
  '  both refuters keep            -> keep as written',
  '  any refuter says repair       -> REPAIR (fix precisely the named defect, then re-verify)',
  '  refuters disagree keep/drop   -> REPAIR, never drop. Disagreement means defect, not deletion.',
  '  both refuters drop            -> drop, and record it',
  '  a record with NO verdict      -> REPAIR (treat as unverified; re-ground it yourself)',
  '',
  'If a repair cannot be grounded after honest effort, drop the record rather than fabricate a fix.',
  'Do NOT invent new contradictions or ranges that were not in the candidate set - additions here',
  'would never face the refuters, which is the exact hole this project closed in Group 5B.',
  '',
  'Assemble programmatically with python3 where you can; hand-author only what you actually repair,',
  'and grep -F -c every quote you touch. Retyping a quote by hand is how it stops being verbatim.',
  '',
  CONTRA_SHAPE,
  '',
  RANGE_SHAPE,
  '',
  'Write TWO files:',
  '  ' + PARTS + '/synth-contradictions.json   as {"contradictions": [...]}',
  '  ' + PARTS + '/synth-ranges.json           as {"compressedRanges": [...]}',
  'Validate BOTH with python3 -m json.tool. Then run a final self-check script that greps every',
  'sourceQuote in both files and reports any miss, and fix until it reports zero. Set wroteTo to the',
  'contradictions path, and in headline give the final counts plus what you dropped and why.',
].join('\n'), { label: 'emit:final', phase: 'Emit', model: 'opus', effort: 'high', schema: RECEIPT })

return {
  ground: live.map((g) => ({ file: g.wroteTo.split('/').pop(), contradictions: g.contradictionCount, ranges: g.rangeCount, dropped: g.droppedForNoQuote, headline: g.headline })),
  merged: merged ? { contradictions: merged.contradictionCount, ranges: merged.rangeCount, headline: merged.headline } : null,
  verdictSummary: verdictReport.map((v) => ({ ref: v.ref, dispositions: v.verdicts.map((x) => x.disposition) })),
  refuterFindings: vsets.map((v) => ({ refuter: v.refuter, findings: v.findings })),
  emitted: emitted || null,
}
