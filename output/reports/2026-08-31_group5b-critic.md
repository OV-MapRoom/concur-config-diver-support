# Group 5B — Adversarial critics (two lenses)

Two critics ran in parallel at opus/xhigh over the same build: one for COMPLETENESS (what is
missing) and one for CORRECTNESS (what is wrong). Both are reproduced in full.

---

# Group 5B — Adversarial Critic: CORRECTNESS

Lens: what is **wrong**. Every claim below has a command behind it. Ten headings, in the order asked.

Scope audited: 4 rosters (100 fields), `synth-valuesets.json` (10 sets + 14 orphans),
`synth-dependencies.json` (57 edges), `synth-steps.json` (6 steps / 79 sequence entries),
12 extract files, both merge scripts, and the live graph.

**Headline:** the agents' work is the cleanest this project has produced — 100/100 quotes
byte-exact, zero invented values, zero unearned `both`, zero false raw-table flags, perfect
Repair discipline. The severe defects are **four bad edges and one plumbing hole that silently
discards 95% of the enumerated values this group found.**

---

## 1. QUOTE FIDELITY — CLEAN (100/100, byte-exact)

Every field's `sourceQuote` was grepped as an *exact, un-normalised* substring of its cited file.
Not sampled — scripted over all four rosters.

```
$ python3 scratchpad/qcheck.py           # exact `in` test, no dash/whitespace folding
TOTAL fields=100 quoteMisses=0 badPaths=0
```

Extended to every other quote-bearing record:

| record class | n | verbatim | method |
|---|---|---|---|
| roster fields | 100 | 100 | exact `in`, then normalised |
| dependency `sourceQuote` | 57 | 57 | exact `in` + validator-normalised |
| value-set `sourceQuote` | 10 | 10 | exact `in` |
| orphan-candidate `sourceQuote` | 14 | 14 | exact `in` |
| quotes embedded in step `rationale`/`action` | 104 | 103 | regex-extracted `"…" (file.md)` pairs |

The single step-rationale "miss" is **not a defect**: `grp5b-create-and-populate-list` order 15
cites the same file twice, giving the full relative path the first time and the bare basename
`use-an-expense-type-as-the-first-field-in-a-connected-list-e0c5f415.md` on the back-reference.
The quote itself verifies:

```
$ grep -F -c "The Expense Type List Item Key field must be the first item in the connected list" \
  .../admin-guides/use-an-expense-type-as-the-first-field-in-a-connected-list-e0c5f415.md
1
```

`sourceFile` format is clean everywhere — **zero** `CONCUR_INVOICE/` prefixes, zero absolute paths,
zero bare basenames in any `sourceFile` field. The 18 legacy prefixed nodes are not extended here.

`bin/assemble-parts.py` dry run over the parts directory: **`PRE-MERGE PROBLEMS: none`**,
`quotes verbatim: 100 ok / 0 bad`.

---

## 2. INVENTED VALUES — CLEAN (0 inventions, 0 Yes/No completions)

Nine fields carry `validValues` (16 strings total) and all 10 value sets were checked string-by-string
against their cited file. Zero misses.

**No Yes/No pair anywhere in this group.** The only two-member sets are `Header`/`Line Item` and
`header`/`line item details form`, both fully enumerated in one sentence each, and both deliberately
kept as *separate contradicting* sets rather than merged.

Three near-misses were caught by the build itself and I confirm all three calls:

* `taxRateTypeCalculationMethod` = `["Percentage"]` from *"Select Percentage. This is the default
  choice."* — "default choice" implies alternatives; none is named; **none was invented**.
* `expenseTypeGroupTaxCondition` / `vendorGroupTaxCondition` = `["Always"]` — no `Never`/`Conditional`
  invented.
* `expenseTypeGroupAppliesTo` and `vendorGroupAppliesTo` arrived from the tables lens carrying
  `["Payment Request"]` / `["Payment request"]` and were **stripped to `[]`**, with the reasoning
  written into `roster-tax-administration.json → verifyNotes §4`:
  *"prose naming one document type, not an enumerated option list … I confirmed by grep that 'Applies To'
  appears in exactly two tax files corpus-wide."* Verified: `grep -c "AppliesTo" synth-valuesets.json` = 0.
  Correct call, and — unusually — a documented one.

`vendorGroupTaxType` is correctly modelled as an **open** set (`international, domestic, taxable`)
because the source ends the list with `etc.`, and the closed vendor-import list `DITX / DNTX / INTX`
from `the-import-template-fields-and-descriptions-8b53850b.md` was explicitly kept off it. Right call:
different surface.

---

## 3. VALUE-SET WIRING — 10/10 wired, but **323 of 339 values never reach the graph**

### 3a. The wired sets are clean

```
WIRED  Tax Administration  taxRateTypeCalculationMethod   quote=OK badvals=[]
WIRED  Tax Administration  taxValidationType              quote=OK badvals=[]
WIRED  Tax Administration  requestTypeToBeAnalyzed        quote=OK badvals=[]
WIRED  Tax Administration  taxValidationLevel             quote=OK badvals=[]
WIRED  Tax Administration  formLevelToBeAnalyzed          quote=OK badvals=[]
WIRED  Tax Administration  expenseTypeGroupEffectiveDatesFilter  quote=OK badvals=[]
WIRED  Tax Administration  vendorGroupEffectiveDatesFilter       quote=OK badvals=[]
WIRED  Tax Administration  expenseTypeGroupTaxCondition          quote=OK badvals=[]
WIRED  Tax Administration  vendorGroupTaxCondition               quote=OK badvals=[]
WIRED  Tax Administration  vendorGroupTaxType                    quote=OK badvals=[]
```

Every `appliesToField` is **exactly** a `name` in the roster for its `appliesToPage`.
`assemble-parts.py` agrees: no `VALUE-SET-WOULD-LAND-UNWIRED`. The predecessor's "16 of 18 attached
to nothing" failure does **not** recur.

Every extract `valueSetCandidate` (34 across the 12 extract files) is accounted for — wired,
orphaned with a written `whyNoOwner`, or stripped with a written reason. Nothing vanished silently.

### 3b. **SEVERE — the orphans are dropped on the floor by the plumbing**

`synth-valuesets.json` ships **10 wired sets carrying 16 values** and **14 orphanCandidates carrying
323 values**:

```
$ python3 -c "...synth-valuesets.json..."
orphan sets: 14 values: 323
wired sets:  10 values: 16
```

Those 323 include the complete **249-row Country Code List**, the **27-row Available VAT Fields**
catalog, the **12-row Prorated VAT Fields** catalog, the 4-row VAT labels table, both Canada VAT
labelling schemes, the 4 CFDi validation statuses, the `DITX/DNTX/INTX` vendor Tax Type codes and
the `Level 1 Code – Level 10 Code` expansion.

They reach the graph **nowhere**:

* `bin/assemble-parts.py:211-214, 297` routes them to `result['orphanValueSetCandidates']`.
* `bin/merge-group.py:125` iterates **only** `r.get('valueSets', [])`. Nothing in merge-group ever
  reads `orphanValueSetCandidates`.

This directly violates the brief's Rule 2 — *"LONG CATALOGS ARE THE MOST VALUABLE ARTEFACT IN THE
CORPUS"* — not through any agent's fault but through the pipeline. A 2.36M-token re-run has already
been paid for once to recover a catalog of this class.

**The graph already has the mechanism.** `configValueSets` supports `knownGap`, and
`bin/validate-graph.py:104-108` demotes an unwired set from ERROR to WARN when it is set. The
precedent node exists, added yesterday:

```
vset.g5.copy-down-from-purchase-order-if-available.unnamed
  appliesToFieldId: null   knownGap: true
  notes: "Accepted gap 2026-08-31 … Left unwired deliberately."
```

**Fix (two small edits, both mechanical):**
1. `bin/assemble-parts.py` — after line 211, append each orphan into `value_sets` with
   `'knownGap': True` (carrying `enumerates` → `context` and `whyNoOwner` + `whatWouldFixIt` → `notes`).
   The existing pre-merge check will then emit `VALUE-SET-WOULD-LAND-UNWIRED` ×14 and
   `VALUE-SET-ENTRIES-NOT-IN-FILE` ×2 — both **non-fatal** (only QUOTE-NOT-VERBATIM /
   MISSING-SOURCE-FILE / DUPLICATE-FIELD-NAME / EMPTY-FIELD-NAME return 1).
2. `bin/merge-group.py:125-140` — copy `knownGap` through into the emitted node, else those 14
   become ERROR-level `unwired-value-set` and fail the build.

The 2 expected `VALUE-SET-ENTRIES-NOT-IN-FILE` warnings are *correct and self-disclosed*, not
defects: orphan 0 encodes each country row as `"<Code> — <COUNTRY>[note]"` and says so verbatim
(*"The em-dash separator and the square brackets are THIS RECORD'S encoding, not source characters"*);
orphan 11 expands the compressed range `Level 1 Code - Level 10 Code` and says so. Rule 8 satisfied.

### 3c. Same root cause — the contradiction record is not a graph citizen

The extracts hold **47 structured `contradictions` records**. `assemble-parts.py` never reads
`extract-*.json` at all, and `merge-group.py` discards `mapping`, `critic`,
`orphanValueSetCandidates`, `dropped`, `splitsProposed`, `verifyNotes`, `roleGates`,
`documentedBasis` and `identityNotes`. I measured survival by verbatim-reading match:

```
contradiction records: 47 | at least one verbatim reading present in the assembled result: 39
```

39 survive **only because an agent hand-copied them into a field's `notes` or a dependency's
`condition`** (e.g. `taxCodeName.notes` carries the `tax code fields (1-4)` vs `VAT Tax Code 1`
contradiction verbatim; `stateProvince.notes` carries the Optional-vs-Required=Y contradiction).
That is luck, not architecture. The brief's core instruction — *"record BOTH and STATE THE
CONTRADICTION"* — currently has no node type to land in.

---

## 4. PAGE OWNERSHIP — CLEAN (0 mis-homed fields), one bad *edge* (see §9)

Mechanical sweep: for every distinct `sourceFile`, how many fields it supplies and whether it names
the page it is filed under.

```
########## Tax Administration
   13 fields | page-name hits   0 | step-4-add-a-new-tax-authority-7f90cede.md
   13 fields | page-name hits   0 | step-5-...-expense-type-group-e8d87361.md
   12 fields | page-name hits   0 | step-6-...-vendor-group-d8b7786d.md
    8 fields | page-name hits   3 | step-3-configure-the-service-14c3ef13.md
    6 fields | page-name hits   4 | step-3-access-tax-authorities-2fae4ae3.md
    3 fields | page-name hits   1 | work-with-the-tax-validation-page-options-c3fe1df5.md
    2 fields | page-name hits   4 | the-basic-process-12a5686d.md
    2 fields | page-name hits   3 | configure-predefined-tax-codes-6b42509f.md
########## List Management / Company Locations — every file names its page
```

The three zero-hit files are **not** mis-homed: they are Steps 4/5/6 of the numbered procedure whose
Step 3 lands on the page — `step-3-access-tax-authorities-2fae4ae3.md` reads *"Click Tax Administration
left menu. The Tax Administration page appears."* then *"Click the Tax Authorities tab."*, and step-4
opens *"On the Tax Authorities page, click New."* Chain documented.

**The two ownership traps this group faced were both caught by the build, and I re-verified both
independently:**

* **22 PO-import columns** (`poImport210BillTo_*`, `poImport220ShipTo_*`) dropped from Company
  Locations. Correct: `grep -c "Company Locations"` = 0 in both record-format files, and their parent
  is `concur-invoice-purchase-order-import-specification-8b443eee.md`. This is exactly the
  predecessor's "seven fields belonging to a separate import tool filed under the wrong page"
  defect, and it did **not** recur.
* **`shipToAddressSearch` / `billToAddressSearch`** dropped. Correct — the corpus places that control
  on the end-user purchase request, not the admin page:
  ```
  $ grep -rl "Ship To Address" both guide dirs   → 6 files, none a Company Locations topic
  $ grep -n "Ship T" .../complete-the-purchase-request-3dfd5f5c.md
  31: When the user clicks the Ship To Address or Bill To Address field, a list of the available
      addresses (previously configured by the Invoice Configuration Administrator) appears…
  ```

**Reverse check (name collision with a different control elsewhere):** 4 collisions, all benign —
`newButton`, `modifyButton`, `removeButton`, `saveButton` exist on both **Company Locations** and the
already-built **Exceptions** page. `merge-group.py` keys its index on `(page, field)` and mints
`field.<pageid>.<slug>` ids, so these are distinct nodes. The only consequence is
`validate-graph.py`'s step check, which flattens field names globally — it can only produce a false
*negative*, never an error. No action needed; recorded so it is not re-raised.

---

## 5. DUPLICATE NAMES — CLEAN (0 hard errors)

```
=== duplicate name WITHIN one new page ===   (none)
=== same name on 2+ of the NEW pages ===     (none)
=== new name colliding with an EXISTING graph field name ===
  newbutton / modifybutton / removebutton / savebutton : Company Locations vs Exceptions  (benign, §4)
```

17 *labels* repeat within Tax Administration (`Tax Code` ×3, `Rate Type` ×3, `Effective Date` ×3,
`Applies To` ×2 …). Every one is a genuinely distinct control on a different tab/wizard, correctly
disambiguated by name prefix (`expenseTypeGroup*` / `vendorGroup*` / `taxAuthorities*`). This is the
right modelling, not a defect.

---

## 6. WRONG DROPS — **none. I would reverse zero of the 85 drops.**

```
Tax Administration — 39 dropped, 0 without duplicateOf
List Management    —  8 dropped, 0 without duplicateOf
Company Locations  — 38 dropped, 24 without duplicateOf  (22 PO-import + 2 address-search)
```

All 47 dedupes cite a surviving twin. All 24 substantive drops are page-ownership calls verified in
§4. Applying the calibration rule — *a row in a documented field table IS a field* — **not one
documented table row was dropped**. I re-read all three field tables against the roster:

* `step-4` General (4) + Tax Rate Types (2) + Tax Rates (3) = **9/9 captured**
* `step-3-configure-the-service-14c3ef13.md` Tax Validation table = **6/6 captured** + the Search link
* `step-5` and `step-6` Group Name tables = **6/6 each**
* `step-3-access-tax-authorities-2fae4ae3.md` grid = **4/4**
* `add-a-shipping-or-billing-address-3b51c816.md` = **12/12**, in source order, with every
  `(Required)` / `(Optional)` marker preserved in `notes`

**One defective drop record** (audit trail only, does not reach the graph):

```
*** DANGLING duplicateOf: addressSearchField -> 'shipToAddressSearch' (not a surviving field)
```

`addressSearchField` is logged as a duplicate of `shipToAddressSearch`, which was itself dropped on
page-ownership grounds. The pointer terminates in nothing, and the "duplicate" framing mislabels an
ownership refutation as a dedupe. **Fix:** set `duplicateOf: null` and copy the
`PAGE OWNERSHIP REFUTED` reason from `shipToAddressSearch`.

---

## 7. REPAIR DISCIPLINE — **PERFECT. The Group 5A "Repair can ADD fields" hole is closed.**

The build log records the 5A defect (*Expense Types "repair recovered 17/14"*) and the constraint
imposed for 5B. It held exactly:

```
### Tax Administration: extracts=98 roster=59 dropped=39 | extract-union covers roster? YES
### List Management:    extracts=22 roster=14 dropped= 8 | YES
### Company Locations:  extracts=65 roster=27 dropped=38 | YES
### Budget Configuration: 0 = 0 + 0                      | YES
```

98 = 59 + 39, 22 = 14 + 8, 65 = 27 + 38. **Zero roster names absent from the extract union** — no
record was created during Repair, so nothing entered unrefuted. Zero extract names unaccounted for.

**`splitsProposed` (7) reviewed on their merits — I endorse all seven as reported-not-emitted.**
The reasoning is right in each case, and all six/four/three contexts are real:

* `buttonNew` → 6 contexts. I confirmed New exists on Tax Authorities, the Tax Rate Types step
  (*"On the Tax Rate Types step, click New"*), the Tax Rates step (*"On the Tax Rates step, click New"*),
  the Tax Code tab, and both group tabs (*"Click New. The Group Name step appears."* ×2). Six is right.
* `buttonSave` → 4 contexts; *"3.  Click Save."* does occur twice in step-4, plus Tax Code, plus the
  Tax Validation tab's *"1.  Click Save."* Correct.
* `buttonSearchGroups` → the split note is honest that this is the **one place the page's own
  modelling is inconsistent** (every other group control is doubled `expenseTypeGroup*`/`vendorGroup*`;
  Search is not). Worth acting on in a future refutable pass, not now.
* List Management's `addNewListCategorySaveButton` — a real third Save, correctly withheld.
* `listSelection`/`listItemsNewButton` is filed "for transparency only, no action needed" and is
  indeed already correctly split. Fine.

---

## 8. `fromRawHtmlTable` FLAGS — CLEAN, and the absence is **verified, not defaulted**

```
$ grep -c '<table' over every one of the 22 distinct cited files
  (zero hits on all 22)
$ fields with fromRawHtmlTable=true
  (none)
```

So `false` on all 100 records is a measured fact. `assemble-parts.py` reports no
`FALSE-RAWHTML-FLAG`, and there is no missing *true* flag either.

The two genuine raw-`<table>` files in the neighbourhood
(`what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md`,
`configuring-forms-and-fields-in-capture-processing-7c14446c.md`) belong to the already-built
**Capture Processing Admin** page and were correctly not re-homed. Their sharp finding — the tools
twin has a `Vat 2 (Secondary Tax – Canada PST/QST)` row and the admin twin **has no Vat 2 row at
all** — survives only inside `map-inventory.md`, which `merge-group.py` discards (§3c).

---

## 9. DEPENDENCIES AND STEPS — steps clean, **four edges need action**

### 9a. Steps — CLEAN

```
id prefix check: all 6 begin grp5b-      ✓
problem step entries: 0                  (all 79 sequence entries resolve to a real page AND a
                                          real field ON THAT PAGE, checked against graph + rosters)
rationale tags: CORPUS-STATED 76 | INFERRED 3 | UNTAGGED 0   (11 rationales carry both tags,
                                          marking which half of the claim is inferred)
```

Rationales do say what breaks: *"Run the Tax Administration wizard first and it completes without any
error — the authority is simply inert"*; *"spending that key on the wrong definition here cannot be
undone by editing List Management afterwards."* This is the best-evidenced part of the build, and it
is where several contradictions actually survive.

### 9b. Endpoint resolution — no typos, but 6 permanently-dangling target pages

```
57 dependencies, 114 endpoints, unresolved: 10 — ALL 'PAGE-UNKNOWN', ZERO 'FIELD-NOT-FOUND'
```

No mistyped endpoint against a built page. But of the 10 forward refs, only 3 point at pages on the
roadmap (Peppol Configuration ×1, Localization ×1, Purchase Order Import ×2 ≈ PO Matching). **Six
name pages that are on no build list at all** and so will never resolve:
`Vendor Manager` (#27), `Employee Import` (#33), `Feature Hierarchies` (#52, #53),
`Vendor Employee Access Import` (#54), `Check Configurations` (#55). Two of those
(`Employee Import`, `Vendor Employee Access Import`) are **import file specs, not admin pages**.
Decide whether they become pages or whether the edges become notes.

### 9c. **#26 — WRONG FEATURE. Drop it.**

```
#26 [triggers] Tax Administration::turnOnTaxValidation -> Exceptions::exceptionCode
    quote: "This exception uses the exception code INVXMLST, so workflow rules can be written…"
    file : step-3-optional-configure-the-digital-tax-invoice-validation-69ba75a6.md
```

That file documents **Digital Tax Invoice (CFDi) Validation**, a third-party service:
*"The client must contract with the validator, and work with SAP Concur support to enable the feature
and configure any desired workflow or audit rules."* It **never mentions** `Turn On Tax Validation`,
the Tax Validation tab, or Tax Administration. The edge's `condition` asserts *"The optional digital
tax invoice validation configured as part of Tax Validation setup"* — a claim the corpus does not
make; it conflates two similarly-named features (`Tax Validation` = tax-service-provider amount
validation, enabled per `step-1-enable-the-tax-validation-feature-sap-concur-staff-31fca0d8.md`).

**The build refutes itself here:** the Tax Administration roster's own declared skip for this same
file reads *"configured via third-party contract + SAP Concur support, no admin field/page named."*
The roster is right; the edge is wrong.
**Action:** delete #26. Keep `INVXMLST` as a note on the Exceptions page if wanted.

### 9d. **#7 — quote names neither endpoint, and duplicates #5. Drop or re-target.**

```
#7 [precedes] Forms and Fields::formType -> Tax Administration::taxAuthorityName
   quote: "The admin must add at least one VAT field at the header and at the line item level for the
           Specify Tax in Invoice Details or Itemization Summary feature to show on the Payment
           Request Header form of the invoice."
   file : configure-the-specify-tax-in-invoice-details-or-itemization-summary-feature-11c6df01.md

$ grep -in "tax authority" .../11c6df01.md
  (no output — the file never mentions Tax Authority)
```

The real ordering edge already exists, cleanly stated, as **#5**: *"Clients need to add VAT fields to
the relevant forms before they start configuring the Tax Authority feature."*
(`the-basic-process-12a5686d.md`). #7 adds nothing and grounds a Forms-and-Fields → Tax-Administration
`precedes` claim on a sentence about a different feature's visibility.

**Compounding audit defect (the claims are exactly inverted).** The roster's declared skip for
11c6df01 says *"no record cites this file directly"* and *"the gate is captured verbatim from its
twin, `control-tax-amount-handling-8540cd38.md`."* In fact 11c6df01 **is** the `sourceFile` of #7,
and 8540cd38 is the `sourceFile` of **zero** records. Both files carry the identical sentence:

```
$ grep -n "at least one VAT field" 11c6df01.md 8540cd38.md
  11c6df01.md:23: …The admin must add at least one VAT field at the header and at the line item level…
  8540cd38.md:23: …The admin must add at least one VAT field at the header and at the line item level…
```

**Action:** delete #7 (redundant with #5). If a Forms-and-Fields-internal gate is wanted, author it
between two Forms and Fields fields and cite `control-tax-amount-handling-8540cd38.md`, which states
the same rule *plus* the negative case.

### 9e. **#13 vs #14 — identical corpus sentences, two different edge shapes**

step-5 and step-6 carry the same rule verbatim, but the graph models them differently:

```
#13 expenseTypeGroupExpenseTypes  --depends_on-->  expenseTypeGroupUnavailableExpenseTypes
#14 vendorGroupUnavailableVendors --depends_on-->  vendorGroupTaxAuthorityFilter
```

A consumer asking *"what determines the Unavailable Expense Types pane?"* gets nothing, while the
vendor twin answers "the selected tax authority". One of the two shapes is wrong; at minimum they
should mirror.
**Action:** add `expenseTypeGroupUnavailableExpenseTypes --depends_on--> expenseTypeGroupTaxAuthorityFilter`
with the step-5 quote *"Any expense types that are already used for this tax authority appear in the
Unavailable Expense Types pane with the name of the group."* (grep -F -c = 1 in
`step-5-optional-add-a-new-expense-type-group-to-a-tax-authority-e8d87361.md`).

### 9f. **MISSING EDGE — a documented conditional field appearance, unmodelled**

`step-4-add-a-new-tax-authority-7f90cede.md`, Tax Rates table, Rate Type cell:

```
Once you select the type, the Tax Percent field appears.
```

This is a field that **does not exist until another field is set** — precisely what a Chromium
crawler must know — and there is no edge for it:

```
$ grep -c "Tax Percent" synth-dependencies.json
0
```

**Action:** add `Tax Administration::taxRateTaxPercent --depends_on--> Tax Administration::taxRateRateType`,
type `depends_on`, `sourceQuote` = *"Once you select the type, the Tax Percent field appears."*,
`sourceFile` = `concur-invoice-professional-edition-admin-guides/step-4-add-a-new-tax-authority-7f90cede.md`.

### 9g. Two weaker edges — worth a note, not a rebuild

* **#42** `List Management::listName precedes Forms and Fields::fieldsTabList`. The `sourceQuote`
  (*"…to perform the following tasks, typically in the order shown."*) does **not** itself state a
  direction; the order lives in the numbered list that follows, and that list actually runs
  Forms and Fields (1-3) → **List Management (4)** → Forms and Fields (5) → validations (6). The
  `condition` discloses the inference and quotes item 4. The modelled leg (4→5) is real; the
  first leg (1-3 → 4) is unmodelled.
* **#17** `tabVendorGroups depends_on tabExpenseTypesGroup` on *"Ensure that you are consistent if you
  configure expense type groups or vendor groups and define the VAT calculation mode."* That is a
  consistency **advisory**, not a dependency between two tabs. Consider retyping or demoting to a note.

The other 51 edges I read individually; their quotes state the relationship. 5 edges explicitly
disclose `INFERRED` endpoint pairing in their `condition` (#2, #7, #10, #42, #57) — that disclosure
discipline is good and should be kept.

---

## 10. UNEARNED `uiVariant` CLAIMS — CLEAN (zero `both`)

```
page uiVariant: all four = 'undifferentiated'
field uiVariant: {'undifferentiated': 100}
fields claiming "both": NONE
```

**Zero new unearned `both` claims.** The three outstanding on Audit Rules are not extended. The
Tax Administration crosscut lens states the honest reason — *"the only New-Experience hit in the
entire tax corpus is an end-user Display Tax toggle, not an admin control"* — and Company Locations
records the 2014 revision-history *"two user interfaces"* note in `notes` without upgrading the flag.
That is `undifferentiated` used correctly: nobody checked, and it says so.

---

## 11. ONE OPERATIONAL PRECONDITION (not a parts defect — but it will bite at merge)

`assemble-parts.py` recovers `navPathEvidence` **only** from the workflow journal
(`nav_from_journal`). No `.jsonl` journal exists on disk. My dry run:

```
Budget Configuration | navPathEvidence: 0
Company Locations    | navPathEvidence: 0
List Management      | navPathEvidence: 0
Tax Administration   | navPathEvidence: 0
```

Merged as-is, all four pages get `navPath: []` with empty `navPathSourceQuote`/`navPathSourceFile` —
and **`bin/validate-graph.py` never checks `navPath`**, so it passes silently. `INVOICE-CONFIG-MAP.md`
is explicit that this is the load-bearing field: *"Direct `goto` on an admin URL bounces via
`dcredirect`… the URL identifies the page, the navPath reaches it."*

The evidence exists in prose — `map-navigation.md` lines 24-28 give **five** distinct paths for Tax
Administration including the `Administration > Invoice Admin > Tax Administration` alias and the
`Tax Administration link` / `Tax Administrator link` contradiction.
**Action:** run `assemble-parts.py --journal <journal.jsonl>`, or backfill `navPathEvidence` into the
four rosters before merging.

*(Related, and deliberately **not** raised as a defect: no page `url` in this graph is corpus-grounded
— `grep -ril "\.asp"` over the corpus returns 0 files. All 18 URLs come from the project's own
`INVOICE-CONFIG-MAP.md`, an intentional out-of-corpus navigation survey. That is a governed exception,
not a 5B invention. Noted so a later critic does not re-derive it.)*

---

## Ledger

| # | Finding | Severity | Changes the graph? |
|---|---|---|---|
| 1 | 323 orphan values (incl. 249-row country catalog) never merged — plumbing gap | **severe** | yes, +14 sets / +323 values |
| 2 | Dep #26 links `turnOnTaxValidation` to a different feature's exception | **severe** | yes, −1 edge |
| 3 | Dep #7 grounded on a quote naming neither endpoint; duplicates #5 | high | yes, −1 edge |
| 4 | #13/#14 asymmetry on identical sentences | moderate | yes, +1 edge |
| 5 | Missing "Tax Percent field appears" conditional edge | moderate | yes, +1 edge |
| 6 | navPath empty for all 4 pages without the journal | moderate | yes, 4 page nodes |
| 7 | 47 contradiction records have no node type; 39 survive by hand-copy only | moderate | schema |
| 8 | `addressSearchField` dangling `duplicateOf` | low | audit trail |
| 9 | `newListCategoryOption` asserted as control while same string refused as value | low | 1 field |
| 10 | Roster's "word-for-word identical" claim about `1eaafd29` is false | low | audit trail |

**Verdict: MERGE after acting on findings 1–6.** Findings 2, 3 and 5 are three edits to
`synth-dependencies.json`; finding 4 is one addition; finding 1 is two lines in `bin/`; finding 6 is
a command-line flag. The 100 field records themselves are, as far as I can make them fail, correct.

### Detail on findings 9 and 10

**9.** The only sentence is *"Create New: Select New List Category and, in Add New List Category, type
a name and select Save."* `orphanCandidate[10]` refuses to wire `["New List Category"]` to
`listCategory` because membership is *"plausible but unstated"* — yet the roster emits the same string
as a standalone field `newListCategoryOption`. Both are assertions from one sentence; the field
version tells a crawler a separate control exists. The roster's contingency is recorded
(*"if it is ever established to be a value it must move into listCategory.validValues and this field
must be removed"*), so the asymmetry is a live choice, not an oversight — but it is a choice, and it
currently resolves against the more conservative option.

**10.** `roster-list-management.json` skip rationale claims `use-a-connected-list-1eaafd29.md` is
*"word-for-word identical to use-a-custom-list-f3fc8bee.md."* `diff` of the two bodies shows three
real differences: the role sentence (*"the role of Invoice Admin"* vs *"the roles of Invoice Admin
and Shared Configuration administrator"*), the nav rendering (`Select Administration\>Invoice.` vs
`Select Administration  Invoice .`) and *"When you define the list"* vs *"When defining the list"*.
The substance was captured elsewhere (role contradiction, and the nav trap in `verifyNotes` §12), so
no graph change — but the stated reason is inaccurate and a later reader would trust it.


---

# Group 5B — ADVERSARIAL CRITIC: COMPLETENESS (what is MISSING)

Lens: completeness. Every claim below has a command behind it. Paths are relative to
`ROOT = /mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`; `A/` = `concur-invoice-professional-edition-admin-guides/`,
`T/` = `concur-invoice-professional-edition-tools-guides/`.

**Headline.** The reading was good and the grounding is clean — I re-verified all 167 `sourceQuote`
values in the four rosters plus `synth-valuesets.json` and `synth-dependencies.json` against their cited
files: **167 checked, 0 not verbatim, 0 missing files.** The corpus sweep was also close to exhaustive:
all 20 files containing "List Management", all 19 containing "Company Locations", all 12 containing
"Tax Administration", and all 22 containing "budget" were read.

The losses are somewhere else. **They are in the plumbing between this group's artifacts and the graph,
and in one unread admin-guides twin that falsifies the group's own headline finding.**

---

## 1. MUST-READ FILES NEVER CITED

I recomputed citation coverage myself rather than trusting the digest, walking every `sourceFile`,
`sourceFiles` and `files` key in `extract-*.json` + `roster-*.json` per page.

**The digest's `mustReadNeverCited` is wrong in both directions for Company Locations.**

| page | digest claim | what the artifacts actually show |
|---|---|---|
| tax-administration | `T/other-countries-84722445.md` | **correct** — read, never cited |
| list-management | none | **correct** — all 12 must-reads cited |
| company-locations | the three `change-ship-to*` files | **wrong.** All three ARE cited (inside `contradictions[].files`). The two genuinely never cited anywhere are `T/overview-8b494195.md` and `T/required-roles-476a5f62.md` |
| budget-configuration | n/a (list empty by design) | correct |

### Clean bill: `T/other-countries-84722445.md`
Read in full (23 lines). It contains no field, no value, no control. Its whole body is
`For other countries, contact you SAP Concur Account Manager for up-to-date information about which VAT fields to use.`
(SAP's own "contact you" typo, verbatim) plus a deferral to two guides absent from this corpus. **A graph
would have gained nothing.** Publishable as-is.

### NOT a clean bill: `T/required-roles-476a5f62.md`
Read, never cited, and the excuse given ("the role gate already lives in the map-phase roleGates") does
not survive contact with the pipeline — see §1b. Its one substantive sentence is a **two-role** gate:

> `users must be assigned the Invoice Configuration administrator or Invoice Configuration (Restricted) administrator role`

That is an enumerated pair, and it is the first thing a Chromium driver needs before it can reach
`companyLocations.asp` at all.

### 1b. Zero role-gate dependencies in the whole group — against established graph precedent
```
python3 -c "... synth-dependencies.json ..."  ->  role deps: 0   (of 57)
```
Meanwhile the merged graph already encodes role gates, four times, as `precedes` edges with an
unresolved `sourceRef.page = "User Permissions"` (`dep.g1.033`, `dep.g1.034`, `dep.g1.055`, `dep.g1.056`).
Group 5B emits **none**, discarding three documented gates:

* Company Locations — `T/required-roles-476a5f62.md` (two roles, quoted above)
* List Management — `T/required-roles-53a9a79c.md`: `Invoice Configuration Administrator: Will configure the Concur Invoice modules, such as List Management, Group Configurations, and Employee form`
* Tax Administration — a **two-stage** gate: `A/step-1-enable-the-tax-validation-feature-sap-concur-staff-31fca0d8.md` (SAP Concur staff must enable before the role exists) then `A/step-2-assign-the-tax-administrator-role-{b7f391c8,b903b7c8}.md` (two contradictory nav paths, both recorded, neither turned into an edge).

---

## 2. FILES THE INVENTORY NEVER FOUND

I re-ran the sweeps with my own synonyms in both directories, then diffed against the union of
`filesRead` across all nine extracts. Term census (`grep -ril`, A/T):

```
withhold 0/0   reverse charge 0/0   self-assessed 0/0     <- confirms the "no withholding tax" finding
UNSPSC 4/0     commodity code 6/0   Tax Rate Type 3/0
Tax Administration 12/0   Company Locations 9/10   List Management 9/11   budget 16/6
```

Then: every file in either guide dir matching `\bVAT\b|tax authorit|tax administrat|tax validation|tax code|tax rate|tax service|value added tax`
**three or more times** that no lens opened. 37 such files. Four of them matter.

### 2.1 `A/implementation-best-practices-8b39ab5d.md` — THE MISS THAT FALSIFIES THE GROUP'S HEADLINE
66 lines, 31 tax/VAT hits, **never opened, never cited, absent from the map inventory entirely**
(`grep -c "implementation-best-practices" *.json map-*.md` → 0; `grep -c 8b39ab5d` → 0).

It is the **admin-guides twin of `T/canada-de22c9f9.md`**, near word-for-word:

```
:33  -   VAT Amount 1 – GST
:39  -   VAT Amount 4 – QST
:54  -   For GST/HST use VAT Amount 1
```

The tools-and-crosscutting lens's published headline is:

> "admin-guides states US, Canada and India are NOT supported for VAT, while **tools-only**
> canada-de22c9f9.md and uk-us-japan-australia-0557084a.md give full four-field and two-field
> US/Canada VAT implementations" … "the contradicting evidence lives **only** in tools-guides."

**That is false.** The Canada four-field and two-field implementations are in admin-guides too. The
contradiction is real but it is *internal to admin-guides*, not a directory-skew story, and the group's
single most-emphasised finding is mis-characterised in the record that will be merged.

Worse, `8b39ab5d` carries two facts its tools twin phrases differently and that nothing in the group
captured at all:
```
:46  All VAT fields may be added to Capture Processing forms. However, values for the VAT Amount 3
     and VAT Amount 4 fields must be entered manually at this time.
:59  Capture Processing will extract primary tax in the VAT Amount 1 field and provincial tax in
     the VAT Amount 2 field.
```
Both are hard constraints on the already-built Capture Processing Admin page.

### 2.2 `A/overview-8b38e2f7.md` — the Tax Authority feature Overview, never opened
40 lines, 18 hits. Carries:
```
:27  Most European countries levy VAT; the United States does not.
:37  To use the Tax Authority feature, clients need to have configured the relevant VAT fields first.
:25  ... when SAP Fiori UI themes are implemented, home page navigation is consolidated under the
     SAP Concur Home menu.
```
Line 27 is a **third, differently-worded reading** in the country-support contradiction the group treats
as a two-way disagreement. Line 25 is discussed in §8.

### 2.3 `A/overview-8b39e48a.md` — the VAT Overview, never opened
36 lines, 14 hits. It is the source that names the New-User-Experience `Display Tax` toggle and the
`Itemization Summary section or Itemizations section for the new UI` label pair (line 29, line 33). The
group asserted the Display-Tax finding without opening this file (it also lives in three other files;
see §8) and also carries the Fiori caveat.

### 2.4 `A/vendor-information-for-vat-included-in-the-unit-price-{9eebdaa0,a4fc76a1}.md` — on the map's own alsoRelevant list, never opened
`9eebdaa0` gives a complete four-step add-to-form procedure for a **named field**:
`In the Add Fields to Forms window that appears, select the Vendor includes VAT in the Unit Price field and then click Add Fields.`
with `Form Type = Payment Vendor`, and states the field surfaces as a check box in Vendor Manager.
`a4fc76a1` gives the calculation consequence.
`grep -c "includes VAT"` → **0 in every 5B artifact and 0 in `kg-invoice-config.json`.**
Aggravating: `T/keeping-track-on-vat-included-in-the-unit-price-e9669bed.md` **was read** and names the
same control (`When the Vendor includes VAT in Unit Price option is selected (enabled)…`) and produced
no record.

### 2.5 Files I checked and cleared
* `A/step-2-activate-the-feature-27a421e2.md` — reads like a missing "Step 2" of the tax family; it is Cost Object Approval / Workflows. Correctly skipped.
* `T/import-template-columns-7270f37b.md` — the filename is a trap; it is the **Distributions** import template (`Custom 01 through Custom 06`, `Custom 11`), not Company Locations. Correctly skipped, though it is an unrecorded compressed range for whoever owns Allocations.
* `A/error-messages-3b8339b0.md` — 60-row supplier-invoice error-code catalog including `:252 The Ship To Address is missing or invalid. | 6000` and `:265 The Bill To Address is missing or invalid. | 6001`. **Correctly not a Company Locations control**; flag it forward to Group 6 (Compliance / E-Invoicing).
* `A/validation-conditional-expressions-67302876.md` — four verbatim rules on how the **list item short code** (= List Management `itemCode`) is used in validation lookups and copy-down, plus `When the List Validation object is selected, the List Validation Helper pane will appear …`. Belongs to the unbuilt Validations page; a legitimate unresolved dependency out of `listManagement.itemCode` that was not emitted.
* `A/standard-edition-55806366.md` — Standard-Edition Payment Groups built on custom-list items, sitting inside a Professional-Edition-only corpus. Not a Professional page control; worth a note only.
* Revision-history cover topics (`invoice-accounts-payable-8b4735e7`, `capture-processing-client-managed-8b2ac260`, `forms-and-fields-8b2e66f6`, `group-configuration-8b2ecb41`): confirmed rev-history only. Clean.

---

## 3. RAW `<table>` SWEEP

I re-ran the census independently:
```
grep -rl "<table" A/ T/ | while read f; do echo "$(grep -c '<table' "$f") $f"; done | sort -rn
```
**32 files (31 admin, 1 tools) — matches the map exactly.** I then relevance-tested all 32 against
`company location|list management|tax authorit|tax administration|ship to|bill to|list categor|list item`:
**one hit only**, `A/invoice-text-content-type-02b21c13.md` ("List item", print-format domain, correctly
ruled out). So `fromRawHtmlTable=false` on all 100 merged fields is a verified count, not a default.

**But the one raw-table pair that IS in scope is captured and then thrown away.** I parsed both tables
with a real HTML parser:

| | header rows | `Vat` cells |
|---|---|---|
| `T/what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md` | 12 | `Vat 1 (Primary Tax - Canada GST/HST, Australia GST, US Tax, VAT UK/Japan) **` **and** `Vat 2 (Secondary Tax – Canada PST/QST) *` |
| `A/configuring-forms-and-fields-in-capture-processing-7c14446c.md` | 11 | `Vat 1 (Australia GST, US Tax, VAT UK/Japan) *` only |

The merged graph's `vset.g5.fields-supported-for-capture-header-fields…` carries **11 values, sourced
from the admin twin only**, and `grep -c "Vat 2" kg-invoice-config.json` = **0**. This is precisely the
defect the previous critic named ("a tools-guides table that CONTRADICTS its admin-guides twin, never
opened"). This time it *was* opened — and the correction still will not land, because it exists only as
an extract-level `contradictions[]` entry, a container the pipeline discards (§5b).

---

## 4. LONG CATALOG SWEEP

Mechanical sweep: every file in both dirs matching the four pages' vocabulary, with `≥11` markdown row
starts, `≥10` bullets, or any `<table>`. **74 candidates, 39 never opened.** Triaged, three matter.

### 4.1 `A/details-section-49500221.md` — 4,762 lines, **256 data rows**, never opened by anyone
```
grep -c '^| $' -> 257 (1 header + 256 rows);  grep -cE '^ *\| *-{3}' -> 1  (ONE table)
```
The single largest catalog anywhere near the tax domain. It is the extract/import field dictionary and
contains a **richer** enumeration of the Prorated VAT fields than the 12-row source the group used, plus
`Ship To Zip`, `Company Billing Address Tax ID` and ~250 other named fields.
**Verdict: correctly NOT a control on any of these four pages** (its home is the unbuilt Payment Request
Accounting Extract / Imports page). But it never appears in the map inventory, in any `filesRead`, or in
any rule-out list — nobody knew it was there. Log it explicitly so a future group does not re-lose it.

### 4.2 `A/field-mapping-e3881fa5.md` — 849 lines, **43 data rows**, never opened
The Peppol ⇄ Concur Invoice field-mapping table, explicitly scoped `applicable for both Concur Invoice
Professional and Standard Editions`. Two of its rows are Company-Locations-specific:
```
:103  CompanyBillToAddressCode | The code which identifies the company location to which the vendor billed the invoice.
:120  CompanyShipToAddressCode | The code which identifies the company location to which the vendor shipped items listed in the invoice.
```
The group emitted exactly one Peppol dependency (`companyLocations.addressCode → Peppol Configuration /
Ship To Address Code`, from `A/limitations-f5fac4b5.md`) and never learned the Peppol-side field names.
Forward-work for Peppol Configuration, but the inventory should have found it.

### 4.3 `A/step-4-additional-configuration-steps-37f6c7ba.md` — READ, CITED, and its 3-item list still lost
This file *is* in `filesActuallyRead` for Company Locations and *is* cited as a dependency source. It
enumerates the three fields the Tax Validation feature exposes on activation:
```
:47  -   Calculated Tax Amount
:49  -   Tax Rate
:51  -   (Optional) Tax Reference ID
```
`grep -c "Tax Reference ID"` → **0 in every 5B artifact**; and `Tax Reference ID` occurs **exactly once in
the entire corpus**, in this file. `Calculated Tax Amount` → **0 in every 5B artifact**, despite the map
inventory's own alsoRelevant note flagging "Calculated Tax Amount / Tax Rate read-only fields" in
`A/create-an-invoice-with-tax-validation-a515e7a3.md`, which was also read. Also lost from the same two
files: `the system moves the invoice to a queue where the appropriate Tax Partner Connector processes the
record at 30-minute intervals` (`grep -c "30-minute"` → 0).

---

## 5. TRUNCATION — every enumeration that DID reach the artifacts

I counted the source rows myself for every captured enumeration. **Zero truncation. This is a clean bill
and it is worth publishing.**

| enumeration | source rows (counted) | in artifacts | verdict |
|---|---|---|---|
| `A/country-code-list-8b3e2eda.md` | 250 row-starts − 1 header = **249** | 249 | exact |
| `A/available-vat-fields-8b395ce2.md` | 28 − 1 = **27** | 27 | exact |
| `A/extract-vat-data-8b3996e0.md` (Prorated VAT) | 13 − 1 = **12** | 12 | exact |
| `T/add-a-shipping-or-billing-address-3b51c816.md` | **12** | 12 fields | exact |
| `A/step-4-…-7f90cede.md` (3 tables, 3 separators @48/121/174) | 4 + 2 + 3 = **9** | 9 | exact |
| `A/step-3-configure-the-service-14c3ef13.md` | **6** | 6 | exact |
| `A/step-5-…-e8d87361.md` / `A/step-6-…-d8b7786d.md` | **6** each | 6 each | exact |
| `A/step-3-access-tax-authorities-2fae4ae3.md` | **4** | 4 | exact |
| `A/configure-vat-labels-9d4795b9.md` | **4** | 4 | exact |
| OCR raw tables | 12 (tools) / 11 (admin) | both parsed | exact, but see §3 |

**One inventory count is wrong (harmless).** `map-inventory.md §4.5` states the PO 210/220 import tables
are 12 rows each. They are **11** (`Record Type, External ID, Name, Address 1/2/3, City, State/Province,
Postal Code, Country Code, Future Use 1-10`). The extracts got it right at 11; only the map's prose is off.

**Field accounting across the whole group is clean.** Union of extract field names vs roster keep+drop:
```
tax-administration  98 extracted = 59 kept + 39 dropped   LOST 0
company-locations   65 extracted = 27 kept + 38 dropped   LOST 0
list-management     22 extracted = 14 kept +  8 dropped   LOST 0
budget-configuration 0 / 0 / 0                            LOST 0
```
Nothing vanished silently between extract and roster, and no roster field was invented during Repair.

### 5b. THE REAL TRUNCATION IS AT MERGE TIME — 323 of 339 values will not reach the graph
This is the most severe finding in this review, and it is mechanical.

```
bin/merge-group.py:125     for i, v in enumerate(r.get('valueSets', []), 1):
bin/assemble-parts.py:297      'orphanValueSetCandidates': orphans,
grep -n "orphanValueSetCandidates" bin/merge-group.py   ->  (no output)
```
`synth-valuesets.json` splits its work into `valueSets` (10 sets, **16 values total**) and
`orphanCandidates` (14 catalogs, **323 values total**). The merge reads only the first list. Nothing in
either script ever reads `orphanCandidates`. What is discarded:

```
249  Country Code catalog                     A/country-code-list-8b3e2eda.md
 27  Available VAT Fields                     A/available-vat-fields-8b395ce2.md
 12  Prorated VAT Fields                      A/extract-vat-data-8b3996e0.md
 10  Level 1 Code – Level 10 Code             T/the-import-template-fields-and-descriptions-8b4aa547.md
  4  VAT labels                               A/configure-vat-labels-9d4795b9.md
  4  Canada four-field scheme                 T/canada-de22c9f9.md
  4  CFDi validation statuses                 A/step-3-optional-…-69ba75a6.md
  3  Supported VAT countries                  A/supported-countries-for-vat-8b38bab8.md
  3  Vendor import Tax Type codes             T/the-import-template-fields-and-descriptions-8b53850b.md
  2  Canada two-field scheme                  T/canada-de22c9f9.md
  2  Ship To / Bill To tabs                   T/delete-a-shipping-or-billing-address-ae7aef28.md
  1+1+1  New List Category; 210; 220
```
The refusal to *wire* these to a field is correct and principled — the corpus really does scope the
country-code list to "the vendor import file", and the VAT catalogs really do belong to Forms and Fields.
But "unwired" and "deleted" are different answers, and the pipeline turns one into the other.

Two established precedents make a fix cheap and non-inferential:
* `vset.g5.copy-down-from-purchase-order-if-available.unnamed` already sits in the graph with
  `appliesToFieldId: null` — unresolved value sets **do** land, exactly like unresolved dependencies.
* Group 4/5A created a **catalog-holder field** for precisely this case:
  `field.capture-processing-admin.captured-header-fields-catalog`.

Reporting rule 2's failure has now cost this project a 2.36M-token re-run once. This is the same loss one
stage later.

---

## 6. COMPRESSED RANGES

Captured, and captured well — 15 `compressedRanges` entries across the extracts, with en-dash vs hyphen
called out explicitly (`Vat Amount 1 - 4` noted as "space-hyphen-space, NOT an en-dash, and 'Vat' not
'VAT'"; `Level 1 Code - Level 10 Code` noted as plain ASCII hyphen). My independent sweep of the page-owned
files found **no unrecorded range**:
```
configure-predefined-tax-codes-6b42509f.md:  (1-4)
purchase-order-bill-to-…-210-…md:            Future Use 1-10
purchase-order-ship-to-…-220-…md:            Future Use 1-10
```
all three recorded.

**But `compressedRanges` is a dead-end container too.** `grep -n "compressedRange" bin/*.py` → no output.
Survival check against merge-bound text (roster field notes + `synth-valuesets.valueSets` + deps + steps):

```
Level 1 Code / Level 10 Code   YES (survives in notes)
tax code fields (1-4)          YES
Future Use 1-10                NO
Vat Amount 1 - 4               NO   <- and the graph carries the compressed LABEL as a value with no expansion
VAT amount fields 1-4          NO
```
The graph's capture-processing value set literally contains the string `Vat Amount 1 - 4` as a value with
its expansion nowhere — a live rule-8 violation that this group diagnosed and could have patched.

---

## 7. THIN PAGES — honest or lazy?

### Budget Configuration — **HONEST, and I re-proved it independently**
```
grep -ril "Budget Configuration" .            -> 0 files (all four dirs, 2230 files)
grep -ril "budgetConfiguration" .             -> 0
grep -ril "budget" A/ T/                      -> 22 files  (16 admin + 6 tools)
grep -ril "budget" release-notes/ summaries/  -> 0
```
The 22-file set matches `filesActuallyRead` exactly. `A/budget-approval-59251c3b.md` is 27 lines with no
procedure, no field, no nav path, and one outward pointer to the *Shared: Budget Setup Guide*. Zero fields
is right, and refusing to re-home the 14-operand Audit Rules Budget data object is exactly right.

**But the node as it will merge is the failure mode the brief warns about.** `bin/merge-group.py:84–91`
writes page nodes with only `id, name, navPath, navPathSourceQuote, navPathSourceFile, navPathAlternates,
url, group, coverage, uiVariant`. It does **not** carry `documentedBasis`, `verifyNotes`, `roleGates` or
`aliases`, even though `assemble-parts.py:162–167` assembles all four. Budget Configuration has
`navPathEvidence: EMPTY`, so it merges as:

```
{ id: page.budget-configuration, name: "Budget Configuration", navPath: [],
  navPathSourceQuote: "", navPathSourceFile: "", url: "/expense/admin/invoice/budgetConfiguration.asp",
  coverage: "thin" }
```
A page name and an `.asp` URL with **zero corpus support and nothing saying why** — and note
`grep -ril "\.asp"` returns 0 files corpus-wide, so the URL is not documented either. That is
indistinguishable from a lazy miss. This is confirmed as a pre-existing pipeline gap, not a 5B invention:
all 14 existing `configPages` print `documentedBasis: None`.
**Recommendation: either carry `documentedBasis` + `verifyNotes` onto the page node, or drop the node.**
Do not merge it bare.

### List Management — **HONEST**
20 files mention it, all 20 read, 3 documented click paths, one end-to-end procedure. The corpus itself
says the rest is undocumented: `A/use-a-custom-list-f3fc8bee.md` step 5 is literally
`Fill out the remaining options, then select Save.` 14 fields is generous coverage of what exists.

### Company Locations — the declared documentation gap is **REAL**
`grep -rn "Download the import template"` returns exactly one line, in
`T/import-shipping-or-billing-addresses-601c2549.md:29`, and no file in the corpus enumerates that
template's columns. `T/import-template-columns-7270f37b.md` is a Distributions file, not this one.
Correct and publishable.
One qualification the group missed: `T/company-locations-8b49554d.md:185` does say
`Added clarification about filling in the Country and State/Province fields in the import template.` —
so the corpus confirms two columns exist without naming the set.

### Tax Administration — an honest gap nobody stated
`grep -inE "modify|remove|delete|edit"` across `step-3-access-tax-authorities`, `tax-administration-tool`,
`configure-tax-authorities`, `tax-administrator-experience`, `apply-vat-to-expense-type-groups`,
`apply-vat-to-vendor-groups` returns **only front-matter lines**. The corpus documents how to **create**
a tax authority, rate type, rate, tax code, expense type group and vendor group — and never once documents
how to modify or delete any of them. For an automation that is a first-class fact and it is not recorded
anywhere in the group's output.

---

## 8. NEW EXPERIENCE / LEGACY

Filename sweep: 8 files carry `new-experience|legacy|classic|current-experience`, and
**none of them touches these four pages**:
```
policies-the-purchase-order-policy-new-experience-5a1ba7ef.md   purchase-order-matching-rules-new-experience-6c8fb80f.md
using-the-invoice-manager-page-new-experience-f83ba5fa.md       using-the-unassigned-invoice-page-new-experience-072e2f18.md
configure-custom-audit-rules-legacy-ui-6cb4534e.md              end-user-experience-new-experience-85c2652b.md
comparison-classic-and-current-client-managed-capture-offerings-2fe966db.md   legacy-records-professional-only-8b425e3b.md
```
Body sweep for `new experience` intersected with the four pages' vocabulary: **zero files**.
`uiVariant: "undifferentiated"` on all four is **correct and defended**, and the PO-Policy stub trap that
damaged Groups 1–2 does not recur here.

**Two genuine variant facts were nonetheless left out, both in files nobody opened.**

1. **The New User Experience `Display Tax` toggle.** Four files carry it —
   `A/end-user-experience-new-user-experience-3fa9958b.md:41`,
   `A/end-user-experience-new-user-experience-a299fcaf.md:23`, `A/overview-8b39e48a.md:33`,
   `A/vat-at-header-and-line-item-level-8b39f76e.md:25` — and only the last was read. It is an end-user
   control, so excluding it is right; but the group asserted "the only New-Experience hit in the entire tax
   corpus" without having opened three of its four sources. Same file also gives the label pair
   `Itemization Summary section or Itemizations section for the new UI` (`:29`) — a real new-UI label
   variant for a section this page's fields write into.

2. **The SAP Fiori navigation caveat — 57 files, zero in the graph.**
   ```
   grep -rl "Fiori" A/ T/  ->  57 files ;  grep -c Fiori kg-invoice-config.json -> 0
   ```
   Verbatim: `For example, when SAP Fiori UI themes are implemented, home page navigation is consolidated
   under the SAP Concur Home menu.` Of the 57, exactly **one** was read by this group
   (`A/country-code-list-8b3e2eda.md`), and both tax-domain carriers (`A/overview-8b38e2f7.md:25`,
   `A/overview-8b39e48a.md`) are unread. This is the corpus explicitly saying the
   `Administration > Invoice > X` navPath the whole graph is built on **is not universal**. It belongs in
   `navPathAlternates` or a page note, and it is absent from all 14 existing pages too.

---

## 9. UNDETERMINED BY THE DOCUMENTATION — ranked

These are properties of the corpus. Recording them is the deliverable; none is a to-do against a tenant.

1. **Is Canada supported for VAT?** `A/supported-countries-for-vat-8b38bab8.md` says the US, Canada and
   India are not supported. `T/canada-de22c9f9.md` **and** `A/implementation-best-practices-8b39ab5d.md`
   give complete four-field and two-field Canadian implementations. `A/overview-8b38e2f7.md:27` adds a
   third framing (`Most European countries levy VAT; the United States does not`). Almost certainly
   provisioning- and feature-dependent (Tax Authority calculation vs. VAT field capture). Unresolvable
   here — and the group's "tools-only" framing must be corrected before merge.

2. **Does predefining a tax code make all four VAT Tax Code fields lists, or only field 1?**
   `A/configure-predefined-tax-codes-6b42509f.md`: `the user will now see the tax code fields (1-4) as a list`.
   `A/step-7-optional-configure-predefined-tax-codes-be8bc5b8.md`: `the VAT Tax Code 1 field as a list`.
   Same deliverable_id (41460672), identical four steps, different outcome. Correctly recorded, correctly
   unresolved. Compounded by `A/step-1-add-vat-fields-to-forms-6d93bfcd.md`:
   `Currently, in Tax Authority, Concur Invoice only supports one VAT amount field`.

3. **What are the Tax Validation tab's control labels?** `step-3-configure-the-service` says
   `Partner Account Number` / `Tax Validation Type` / `Tax Validation Level (Header or Line Item)`;
   `work-with-the-tax-validation-page-options-c3fe1df5` says `Unique Tax Partner Number` /
   `Request Type to be Analyzed` / `Form Level to Be Analyzed (header or line item details form)`.
   Both recorded as parallel fields with parallel value sets — the right answer.

4. **Where is the Invoice Tax Administrator role assigned?** Two nav paths in two same-titled files
   (`b7f391c8`, `b903b7c8`). Recorded, unresolved, correct.

5. **Is the Tax Type list closed?** `A/step-6-…-d8b7786d.md`:
   `select a type of tax, international, domestic, taxable, etc., for this optional step, from the Tax Type list.`
   The source's own "etc." says no. The group emitted 3 values and disclosed the openness in notes — the
   right call, and worth preserving verbatim through merge.

6. **What are the Company Locations `Country Code` and `State/Province` option lists?** Never enumerated
   for this page. The 249-row catalog is scoped to the vendor import file. `stateProvince` is documented
   as having *become* a list (`T/company-locations-8b49554d.md:194`,
   `Updated images to show that the State/Province field has changed to a list when creating a new
   ship-to or bill-to address`) but its contents are never given. **Note:** the roster leaves
   `fieldType: "unknown"` here; the corpus does state it is a list, and a Chromium driver needs
   select-vs-type. That one is over-cautious.

7. **Is State/Province required?** The page table says `(Optional)`; both PO import records say
   `Required? = Y` for the same logical address. Recorded, unreconciled, correct.

8. **Which page hosts the `Ship To Address` / `Bill To Address` search?**
   `T/search-for-a-ship-to-or-bill-to-address-1d864cfe.md` never names a hosting page
   (`grep -c "Company Locations"` = 0). The group dropped it to the end-user Purchase Request on strong
   counter-evidence and documented the reasoning in the drop record. Well handled — this is the model for
   the rest.

9. **Where are connected list definitions authored?** `A/access-connected-lists-39dd2408.md` says the
   Forms and Fields **Connected Lists tab**; `A/use-a-connected-list-1eaafd29.md` names a separate
   **"Connected List Definition tool"** under the Shared Configuration administrator, a phrase that appears
   nowhere else in either directory. Recorded, unresolved, correct.

10. **How do you modify or delete anything on Tax Administration?** Not documented at all (§7).

11. **What columns are in the Company Locations import template?** Not documented at all (§7).

---

## 10. WHAT WOULD CHANGE THE GRAPH — the short list

| # | change | evidence |
|---|---|---|
| 1 | Land the 14 `orphanCandidates` (323 values) as value sets with `appliesToField` naming the real owner and `resolved:false`, or as catalog-holder fields per `field.capture-processing-admin.captured-header-fields-catalog`. | `merge-group.py:125`; `assemble-parts.py:297`; no reader anywhere |
| 2 | Correct the "tools-guides-only" Canada claim and cite `A/implementation-best-practices-8b39ab5d.md`. | file never read; `grep -c 8b39ab5d` → 0 in all artifacts |
| 3 | Give `contradictions` and `compressedRanges` a home (page/field notes at minimum). 47 contradictions, 15 ranges; `grep -n "contradict\|compressedRange" bin/*.py` → nothing. | ~36/47 have no textual echo in merge-bound text |
| 4 | Patch `vset.g5.fields-supported-for-capture-header-fields…` with the tools-guides `Vat 2 (Secondary Tax – Canada PST/QST)` row and the wider `Vat 1` scope. | parsed both raw tables; `grep -c "Vat 2"` graph → 0 |
| 5 | Build the missing configSteps: Tax Validation (10 fields) and the Vendor Groups wizard (12 fields); Company Locations edit + delete (4 fields). | 28/59 tax fields and 4/27 CL fields appear in no step |
| 6 | Emit the three role gates as `precedes` edges to `User Permissions`, per `dep.g1.033/034/055/056`. | 0/57 role deps |
| 7 | Capture `Calculated Tax Amount`, `Tax Rate`, `(Optional) Tax Reference ID` and `Vendor includes VAT in the Unit Price`. | `A/step-4-…-37f6c7ba.md:47,49,51`; `A/…-9eebdaa0.md`; `grep -c` → 0 everywhere |
| 8 | Carry `documentedBasis` / `verifyNotes` onto page nodes, or drop `page.budget-configuration`. | `merge-group.py:84–91` |
| 9 | Record the SAP Fiori nav caveat as a navPath alternate. | 57 files; 0 in graph |
| 10 | Housekeeping: `mustReadNeverCited` for Company Locations is wrong (it is `overview-8b494195.md` + `required-roles-476a5f62.md`); `mustReadSkipsDeclared` repeats 7 files as duplicate entries (`other-countries-84722445` three times); `map-inventory.md §4.5` says the 210/220 tables are 12 rows, they are 11. | recomputed |
