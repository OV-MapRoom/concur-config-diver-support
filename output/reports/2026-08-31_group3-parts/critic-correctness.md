# Group 3 — Adversarial Critic: CORRECTNESS

Scope: `roster-purchase-order-matching-rules.json` (35 fields), `roster-purchase-order-configuration.json`
(16 fields), `synth-valuesets.json` (16), `synth-dependencies.json` (40), `synth-steps.json` (6 steps /
104 sequence entries), `synth-contradictions.json` (12), `synth-ranges.json` (2), plus the six lens
extracts and the live graph at `output/kg-invoice-config.json` (18 pages / 437 fields).

**Headline: this build is materially cleaner than its predecessor.** The three defect classes that
sank the last run — unwired value sets, invented toggle halves, and records conjured during Repair —
are all *absent here*, and I verified each mechanically rather than by sampling. What remains is
**one hard page-ownership defect, one unearned `uiVariant` claim, one fabricated contradiction, and a
short tail of label/wiring hygiene.** Nine findings; two would change the graph materially.

---

## 1. QUOTE FIDELITY — CLEAN (417/417)

I extracted every `(sourceFile, sourceQuote)` pair from **all 13 JSON artifacts** by walking the trees
(not just the rosters), then tested each as an *exact* Python substring — stricter than
`bin/validate-graph.py`, which folds dashes, quotes, NBSP and whitespace and lowercases before
comparing.

```
python3 crit/qverify.py
TOTAL (sourceFile,sourceQuote) pairs found: 417
VERBATIM OK: 417
MISSING FILE: 0
BAD PREFIX: 0
QUOTE MISS: 0
```

Per artifact: matching-rules extracts 68/66/64, config extracts 28/26/20, `synth-dependencies` 40,
`synth-contradictions` 36 (readings), rosters 35 + 16, `synth-valuesets` 16, `synth-ranges` 2.

I confirmed by key-census that `sourceQuote` is the **only** quote-bearing key in the entire artifact
set (no `quote`, `evidence`, or `sourceQuotes`), so 417 is the complete population, not a subset.

Spot-check in the brief's mandated form, all returning `1`:

```
grep -F -c "In Use: Shows if the matching rule set has been applied against any active invoice (Yes) or has not yet applied (No) in the system." .../access-purchase-order-matching-rules-8407c500.md   -> 1
grep -F -c "Match Status displays on the My Invoices, Approve Invoice, Assign Invoice, and Processor List pages." .../understand-the-match-status-assigned-to-an-invoice-52477c6b.md                     -> 1
grep -F -c "Each PO configuration you create is based on the Group you select before creating the configuration." .../purchase-order-configuration-is-group-aware-b603f04b.md                            -> 1
grep -F -c "The header and line time fields you select will appear on the purchase order." .../configure-purchase-orders-8128725e.md                                                                    -> 1
```

**No `CONCUR_INVOICE/` prefix defects** — the 18-node bug from the last run is not repeated. Zero
`./`, zero absolute paths, zero missing files.

**Nothing to act on.**

---

## 2. INVENTED VALUES — CLEAN in the merge inputs

386 value strings checked across `values`, `validValues`, `expandsTo` in all artifacts; 314 found in
their cited file. All 72 misses classified:

| cluster | count | verdict |
|---|---|---|
| `synth-ranges` `expandsTo` (Custom 2–24, Custom 2–20) | 40 | **Not a defect.** Declared mechanical expansion; matches graph precedent |
| `extract-*-tables` composite `"Name — Description"` strings | 24 | Upstream lens formatting; the roster/synth records carry the bare names |
| `synth-valuesets` `orphanCandidates[0]` `" \|\| "` row joins | 6 | Orphan bucket, never merged; reformat is declared |
| `extract-*` singletons | 2 | Repaired before the roster (see below) |

**The Yes/No invention class is clear.** Exactly one two-value Yes/No pair exists in the whole build —
`in_use` = `['Yes','No']` — and **both halves are literally in its own sourceQuote**: *"…has been
applied against any active invoice (Yes) or has not yet applied (No) in the system."* This is a
documented display column, not a completed toggle. No other field pairs a documented value with an
undocumented opposite.

`synth-ranges` is honest work and needs no change: `appliesTo` is `{}` on both nodes, the notes state
outright *"THE EXPANSION IS MECHANICAL, NOT QUOTED"*, and they explicitly refuse to home the range to
either Group 3 page because it belongs to Forms and Fields / the Policies PO section. The graph's ten
existing `configCompressedRanges` do exactly the same (`range.g5g5.001` expands `Vat Amount 1 - 4`
with `appliesToFieldId: null`). Count/label/quote invariants all pass.

One upstream repair worth crediting: `extract-...-crosscut.json` gave `ruleLevel` a fourth value
`Line Item - Receipt` cited to `match-rules-and-match-status-8cc2c56b.md`, where it does not appear
(`grep -ic receipt` on that file = **0**). The roster caught it, dropped `ruleLevel`, and re-cited
`level_field` to `step-3-…-64eb1c47.md`, which contains all four inline. Correctly handled.

**Nothing to act on.**

---

## 3. VALUE-SET WIRING — CLEAN (16/16)

Every set's `appliesToField` is **exactly** a `name` in the roster for its `appliesToPage`:

```
valueSets: 16  UNWIRED: 0  WIRED: 16
contextField wiring: 5/5 resolve
```

This is the predecessor's worst defect (16 of 18 unwired) fully corrected. It matters more than it
looks: `validate-graph.py` treats `unwired-value-set` as an **ERROR**, not a warning, unless the node
carries `knownGap` — so all 16 would have failed the build.

Two observations that are *not* wiring failures but are worth a line:

- **`valueSets[13]` (INVC/RIND/RCEN) sets `contextField` = `confirmation_type` = its own
  `appliesToField`.** Self-referential context. Recommend clearing `contextField` to `""`.
- **`valueSets[13]`'s `sourceQuote` is `"(INVC)"`** — six characters. It verifies, but it does not
  *state* that these are codes for the Confirmation Type values. A stronger anchor exists in the same
  file: `Receipt Individual (RIND)`.

---

## 4. PAGE OWNERSHIP — ONE HARD DEFECT

I grepped every distinctive field label across both guide directories and collected the
`Administration > Invoice > X` nav paths carried by the hit files.

### 4.1 `match_status` does not belong on this page — **HIGH**

**Field:** `match_status`, roster index [33], `roster-purchase-order-matching-rules.json`
**Cited file:** `concur-invoice-professional-edition-tools-guides/understand-the-match-status-assigned-to-an-invoice-52477c6b.md`

Four independent lines of evidence place it elsewhere:

1. **Its own sourceQuote names the pages, and none is this one:**
   `"Match Status displays on the My Invoices, Approve Invoice, Assign Invoice, and Processor List pages."`
2. `grep -c "Purchase Order Matching Rules"` on the cited file = **0**.
3. The file's own framing: *"Match Status is an attribute of an invoice, and is determined by:
   Successful association to a PO … Presence of any match exceptions"* — a **derived runtime
   attribute**, not an admin control. There is no setter anywhere in the corpus.
4. **The build already knew.** Its dropped twin `matchStatusOutcome` (dropped[13]) carries
   `correctPage: "My Invoices / Approve Invoice / Assign Invoice / Processor List (end-user and
   processor list surfaces) - not an admin configuration page"`, and `valueSets[14]`'s own `context`
   says *"Read-only runtime attribute, not a configurable list"*.

This is **internally inconsistent with the build's own best work**: `change_to_non_po_action` was
correctly *dropped* (dropped[21]) on exactly these grounds — *"as a field of this page it would send a
Chromium driver hunting for a button that is not there"* — and re-filed as an outbound dependency. The
identical standard was not applied to `match_status`.

**Fix:** drop `match_status` from the roster; move `valueSets[14]` (6 values) to `orphanCandidates`
or attach it to the read-back it actually informs. The catalogue is genuinely valuable — it is the
closed set of outcomes a configured rule set produces — so preserve it as a value set with a null
owner rather than deleting it. Do **not** create a page node for My Invoices.

### 4.2 Purchase Order Configuration rests on adjacency — declared, and true

15 of 16 PO Config fields cite one file, `configure-purchase-orders-8128725e.md`. I verified the
roster's own caveat rather than trusting it:

```
grep -c "Purchase Order Configuration" .../configure-purchase-orders-8128725e.md   -> 0
front matter: title: Configure Purchase Orders    (no nav path, no breadcrumb to the tool)
```

The roster says so in 9 separate `notes` (*"PAGE BINDING: ADJACENCY-ONLY … Adjacency is not
attestation"*) and downgrades `coverage` to `partial`. **This is correct practice, not a defect** —
the binding is disclosed rather than asserted. The four independently-attested bindings
(`company_address`, `supporting_documents`, `company_branding_logo`, `company_name_without_address`,
plus `group_selector`) check out.

### 4.3 Reverse check — no colliding controls

`done_button` and `new_button` also exist on **Audit Rules** and **Expense Types**. Not a defect:
the validator's uniqueness invariant is **per page** (`duplicate-field-name` keys on `pageId`), and
the graph already carries `done_button` on two pages. Convention, not collision. Similarly
`level_field` was deliberately named to avoid colliding with Accounting Administration's
`segment_level` (labelled "Level") — see dropped[18]. Good discipline.

---

## 5. DUPLICATE NAMES — CLEAN

```
Purchase Order Matching Rules : duplicate names NONE | duplicate labels NONE
Purchase Order Configuration  : duplicate names NONE | duplicate labels NONE
cross-page overlap between the two new pages: NONE
```

`duplicate-field-name` is a hard validator **ERROR**; neither page trips it. Duplicate *labels* would
not trip the validator but would make a driver ambiguous — also none. Note the build actively avoided
one: `lifeToDateRuleType` was dropped (dropped[9]) precisely because *"its label 'Life to Date'
collides intra-page with life_to_date_tab"*.

---

## 6. WRONG DROPS — NONE. All 28 drops stand.

I read every `reason` in both `dropped[]` arrays and applied the calibration rule (a row in a
documented field table IS a field; a terse description or an inferred type is not grounds to refute).

- **23 drops on PO Matching Rules**: 20 are intra-page duplicates that *name the surviving twin* and
  state what evidence was merged forward. Several explicitly hand the loser's **better verbatim quote**
  to the survivor (`ruleSetCopy` → `copy_button`, `toleranceBasis` → `value_percentage_radio`,
  `default_sender_email_prefix` → `default_sender_email`). That is the exact inverse of the
  predecessor's "kept the reformatted twin, dropped the verbatim one" defect. Deliberately fixed.
- 3 are structural and correct: `matchAgainstReceivedQuantity` (a **value** promoted to a field — row 5
  of the 6-row Life to Date table), `default_rule_group_select` ("Default" is a value of
  `rule_groups_list`, not a widget), `ruleSetActionButtons` (a six-control bundle behind the synthetic
  string "Add / Edit / Copy / Delete / Rename / Edit Confirmation" that appears nowhere in the corpus —
  *"A driver cannot click a roster"*).
- **5 drops on PO Config**: all intra-page duplicates whose names were extractor abbreviations
  (`default_email_subject`, `transmitted_po_message`) truncating the documented label.

I verified the two load-bearing drop claims rather than accepting them:

```
drop[7]  "grep -i 'receipt' on match-rules-and-match-status-8cc2c56b.md returns zero lines"
         grep -ic receipt  -> 0                                                    CONFIRMED
drop[2]  "'Overage Tolerance' has exactly one attestation corpus-wide"
         grep -rl "Overage Tolerance" both dirs -> 1 file                          CONFIRMED
```

**I would reverse none of them.** `change_to_non_po_action` (dropped[21]) is the model disposition:
real control, wrong page, preserved as a dependency edge — and it is the standard §4.1 should have met.

---

## 7. REPAIR DISCIPLINE — CLEAN

The critical question is whether Repair conjured records that never faced a refuter.

```
Purchase Order Matching Rules: 68 lens candidates -> 35 kept + 23 dropped
   ROSTER NAMES NOT PRESENT IN ANY EXTRACT: 0
   TRULY UNACCOUNTED (after snake_case normalisation): NONE
Purchase Order Configuration: 36 lens candidates -> 16 kept + 5 dropped
   ROSTER NAMES NOT PRESENT IN ANY EXTRACT: 0
   TRULY UNACCOUNTED (after snake_case normalisation): NONE
```

The apparent 10 + 15 shortfall is entirely casing: the crosscut lens emitted camelCase
(`namedRulesGroupName`, `inUse`) and the tables lens Title Case (`PO Number Prefix`, `Company Address`);
all 25 map 1:1 onto a kept record under snake-case normalisation. **No record was created at Repair,
and nothing was silently dropped.**

### `splitsProposed` — all six correctly declined

All four PO Matching Rules splits and both PO Config splits were **reported, not executed**, each
citing the same reason: *"a record invented during Repair would never face the adversarial refuter."*
That is the right call. Two are real coverage gaps worth carrying forward as known gaps rather than
inventing:

- **`exception_message` → the editor's EDIT control.** One sentence documents a whole nested editor
  (`"Exception Message: Click Change and add a message by clicking New, or edit an existing message by
  selecting it and clicking Edit, then click Save."`). `Change`, `New` and `Save` all exist as records;
  the **Edit inside the editor does not**, so a driver told to modify an *existing* exception message
  has nothing to drive. Genuine gap, honestly reported.
- **`company_branding_logo` / `supporting_documents` → Upload / View / Remove.** The corpus names three
  discrete actions (`"click Upload in the Company Branding Logo section."`, `"You can view or remove a
  logo by clicking View or Remove respectively."`) and the graph already models 121 `button` fields, so
  buttons are in scope. One record currently stands in for three controls.

`matching_rule_type`'s split note is the one I'd act on — see §9.4.

---

## 8. fromRawHtmlTable FLAGS — CLEAN, and verified in both directions

```
Purchase Order Matching Rules: fields=35  fromRawHtmlTable=true: 0
Purchase Order Configuration:  fields=16  fromRawHtmlTable=true: 0
FALSE POSITIVES (validator ERROR: flag=true, file has no <table>): NONE
flag=false but cited file DOES contain <table> (missed raw table?):  NONE
```

The reverse check is the one that matters and it also passes: I ran `grep -c "<table"` over **all 12
distinct cited files** across both rosters and every one returns **0**. So `false` is a measured fact
here, not a default, and no raw-HTML table was parsed as markdown and lost. This is consistent with
the tables lens's own sweep of 55 files.

Separately, the tables lens's refusal to home the raw `<table>` in
`configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md` (5 `<table>` tags,
carrying `Custom 1–24` / `Custom 1–20`) is correct — it belongs to the already-built Forms and Fields
page. It survives as the two `synth-ranges` nodes with `appliesTo: {}`.

---

## 9. DEPENDENCIES AND STEPS

### Steps — CLEAN across the board

```
steps: 6 | all ids grp3- prefixed | 104 sequence entries
unmarked rationales (neither CORPUS-STATED nor INFERRED): 0
STEP REFERENCE PROBLEMS (page or field unresolvable): 0
```

Every `pages[]` entry and every `sequence[].field` resolves against this run's rosters or the live
graph. The three Policies endpoints a mistype would silently break — `Policy Name`, `Is PO Policy?`,
`PO Matching Ruleset` — are **exact `name` matches** on `page.policies`, so they will resolve, not
merely warn. The single `INFERRED` entry (`grp3-…-bind-to-policy` order 28, `Is PO Policy?`) is
honestly marked and says what it is inferred from.

Rationales genuinely state what breaks, not merely what happens — e.g. order 24: *"Nothing entered in
orders 19-23 exists as a rule until Add fires; a writer that moves straight to Save loses the
in-progress rule silently, because Save commits the rows, not the editor."* This is the standard.

### 9.1 `dep[24]` asserts a contradiction that does not exist — **MEDIUM**

`synth-dependencies.json` `dependencies[24]`, `level_field → Forms and Fields::Delivery Slip Number`.
Its `condition` opens: **"CONTRADICTION WITH THE EDGE ABOVE - BOTH RECORDED, NEITHER RECONCILED."**

The two sources are **complementary, not conflicting** — they describe different cases:

| case | `…-b0d3f1ca.md` (dep 23) | `…-12b976a5.md` (dep 24) |
|---|---|---|
| DSN field not added | *"will perform the matching sequentially by receipt"* | agrees (sequential default) |
| DSN added, GRN matches | match that GRN | match that GRN |
| DSN added, **no** GRN matches | **silent** | *"will not revert to the sequential association logic but will instead leave the invoice unassociated"* |

The tools-guides topic covers a case the admin-guides topic never addresses. Recording a phantom
conflict is as damaging as reconciling a real one: it tells the next builder there is an unresolved
disagreement to adjudicate when there is none.

**Fix:** rewrite `dependencies[24].condition` to describe the DSN-miss case on its own terms and drop
the contradiction language. Quotes stay as they are — both verify.

### 9.2 Two existing graph edges will still dangle after this merge — **MEDIUM**

`dep.g1.057` and `dep.g1.058` (Group 1) already target
`{page: "Purchase Order Configuration", field: "PO Configuration", resolved: false}`. This merge
creates that page — but **no field is named `PO Configuration`**, so both stay unresolved.

`dep.g1.057`'s `sourceQuote` is **byte-identical** to the new `group_selector`'s:
`"Each PO configuration you create is based on the Group you select before creating the configuration."`
— same file, same sentence. `group_selector` is unambiguously the intended endpoint (and this run's
own `dependencies[31]` encodes the same relationship in the opposite direction).

**Fix:** at merge, repoint `dep.g1.057` / `dep.g1.058` `targetRef.field` to `group_selector`, or carry
an alias. This is exactly the "mistyped endpoint silently fails to resolve" case — worth catching now,
because once the page exists a reader will assume the edges resolved.

### 9.3 `dep[26]` — quote mentions both endpoints but does not state the relationship — **LOW/MED**

`Audit Rules::field_value → Purchase Order Matching Rules::rulesGrid`, quote: *"The admin can create
rules by using the Is Purchase Order line Associated or Is Receipt Associated fields in the Audit Rules
tool."* That establishes those fields exist in Audit Rules. The `condition`'s claim — that the values
those conditions test *are produced by the rules configured on this page* — is an inference the quote
does not carry. Endpoints resolve (`field_value` is a real Audit Rules name), so nothing breaks; but
the edge should be marked inferred or re-quoted.

### 9.4 `matching_rule_type` is a taxonomy, not a control — **MEDIUM**

Roster [32]. `fieldType: "unknown"`, label `"Matching rule type"` — which returns **0 hits** corpus-wide
(`grep -rlF` over both directories). Its two values, `Life to Date` and `Rules`, **already exist as the
two tab records** `life_to_date_tab` and `rules_tab`. A driver told to "set Matching rule type = Rules"
has no control to act on; the real action is clicking a tab. The roster's own `splitsProposed` concedes
this and asks a human to decide.

Two corrections to the roster's stated reasoning, both in its favour:
- Its claim that the enumeration "cannot be treated as complete" because the file is truncated is
  **over-cautious**. I read `create-purchase-order-matching-rules-adb700f9.md` in full: both bullets
  (`Life to Date:` and `Rules:`) are intact; the truncation is a trailing bare `x` *after* the list.
  The values are properly attested — this is not an invention.
- **It anchors `contr.g3.010`** (`cardinality`, 2 readings). If dropped, re-home that contradiction to
  `rules_tab` or `life_to_date_tab`, or it becomes a dangling owner.

**Recommendation:** demote to a concept node, or keep as a field but relabel to something attested.
Do not delete the contradiction.

### 9.5 Fabricated labels — **LOW**

Two labels appear **nowhere in the corpus** (`grep -rlF`, both directories, 0 files):
- `rulesGrid` → label `"Rules (rule rows)"`. The attested label is `Rules`; the parenthetical is a
  disambiguator from `rules_tab`. Defensible intent, but a label-matching driver will never find it —
  put the disambiguation in `notes` and set the label to `Rules`.
- `matching_rule_type` → label `"Matching rule type"` (see §9.4). Corpus writes only the plural prose
  *"matching rule types"*.

Third, milder: `value_percentage_radio` → label `"Value or Percentage"` occurs once, but as prose
(*"select Value or Percentage"*), not as a label.

### 9.6 Value-set `values` contradict their own notes — **MEDIUM**

`valueSets[9]` (`payment_request_field`) and `valueSets[10]` (`purchase_order_field`) carry the
**identical** two-element array `["Line Quantity and Received Quantity", "Receipt Associated and
Receipt Associated"]` from one sentence. SAP writes these as **pairs spanning two lists** — the
parenthetical proves it: *"compares the quantity of the invoice line with the available quantity on
the associated receipts"* → Payment Request = `Line Quantity`, Purchase Order = `Received Quantity`.

The notes say exactly this and say it well (*"a driver reading this set should take 'Line Quantity' /
'Receipt Associated' for Payment Request and 'Received Quantity' / 'Receipt Associated' for Purchase
Order"*). But **the machine-readable `values` array asserts the combined string is selectable in both
lists**, and a consumer reading `values` without the prose will drive a string that is not in either
dropdown. Refusing to split is defensible blind-build discipline; leaving the misleading array as the
only machine-readable form is not.

**Fix:** keep the pair strings, but flag the set (e.g. `knownGap`/`pairwise` marker) so no consumer
treats the array as literal option labels.

### 9.7 Duplicate endpoint+type edges — **LOW**

Two `(sourcePage, sourceField, targetPage, targetField, type)` tuples occur twice:
`rule_set_name → Policies::PO Matching Ruleset` (deps 3 and 5) and
`level_field → Forms and Fields::Delivery Slip Number` (deps 23 and 24). Both pairs carry genuinely
different quotes and conditions (binding vs policy-attribute scoping; DSN-added vs DSN-miss), so
neither is a copy. Flagged only because a consumer keying on the endpoint tuple will collapse or
double them.

### 9.8 Endpoints against unbuilt pages — consistent with precedent, not a defect

13 endpoints do not resolve. Six name surfaces outside the admin graph (`My Invoices`,
`Purchase Order Import`, `Expense: Currency Admin`, `Purchase Order Receipt Import`,
`Preview Purchase Order`, `Invoice runtime state`). This matches established practice: **141 of the
graph's 335 dependencies already have an unresolved `targetId`**, with `targetRef.page` values like
`Invoice`, `Invoice Pay`, `Vendor Manager`, `Payment Manager`. The validator only errors on a *set*
`targetId` that dangles, so these are safe.

`Invoice runtime state::Invoice assignment state` (dep 30) is the weakest — a pseudo-page rather than
a surface — but it is honestly labelled and the quote states a genuine runtime precondition.

**One is a real coverage gap in an already-built page (report only, do not fix here):** dep[25] targets
`Invoice Settings :: "Allow system to associate invoice lines to Purchase Order lines based on data
attributes"`. That option is **real and documented as living on that page** —
`"On the Invoice Settings page, toggle (enable) the Allow system to associate invoice lines to Purchase
Order lines based on data attributes option."` (`line-identification-for-purchase-order-matching-3c7c8336.md`)
— but the built Invoice Settings page (13 fields) does not carry it. The dependency names it correctly;
the gap is upstream. Worth a Group 1 follow-up ticket.

---

## 10. UNEARNED uiVariant CLAIMS — ONE, AND IT IS THE ROSTER'S OWN

### 10.1 `Purchase Order Matching Rules` page `uiVariant: "both"` is unearned — **HIGH**

```
roster-purchase-order-matching-rules.json
  page uiVariant  = 'both'
  field uiVariants = Counter({'undifferentiated': 35})
```

Four reasons this must become `"undifferentiated"`:

1. **Not one of 35 fields carries a variant.** In the live graph the *only* page marked `both` is
   Audit Rules, and it backs the claim with 27 `both` + 6 `legacy` + 5 `new` fields. Every other page
   is `undifferentiated` with 100% `undifferentiated` fields. A `both` page with zero differentiated
   fields matches no precedent in the graph.
2. **The roster's own evidence says not to.** Its `mustReadSkipsDeclared` entry for
   `purchase-order-matching-rules-8b357dbb.md` reads: *"The read was load-bearing: it is the evidence
   for **NOT** claiming uiVariant 'both'."*
3. **Lens C explicitly declined it**, and said so in its headline: *"left every field uiVariant
   'undifferentiated' rather than claim a fourth unearned 'both'."*
4. **The twins do not match**, so "someone read both and they matched" is false either way. I diffed
   them directly:

```
diff <(sed -n '16,200p' purchase-order-matching-rules-8b357dbb.md) \
     <(sed -n '16,200p' purchase-order-matching-rules-new-experience-6c8fb80f.md)
```

The New Experience topic is a **40-line superset**: it adds a whole "Before You Begin" section
(Test and Change Match Rule Sets, the In-Use unlock procedure, Activate Exchange Rates) absent from the
legacy twin — and inside it writes **`Change to Non PO Invoice`** where the standalone topics write
`Change to Non-PO`. Distinct `loio`s (`8b357dbb…` / `6c8fb80f…`), so this is a real variant pair, not a
gerund/imperative republish.

That single genuine difference **is already captured correctly** as `contr.g3.008` (`label-drift`,
3 readings, 2:1 toward the hyphenated form). So flipping the page to `undifferentiated` loses nothing —
the one real variant fact is preserved in the contradiction node where it belongs.

**Fix:** `roster-purchase-order-matching-rules.json` → `"uiVariant": "undifferentiated"`.

### 10.2 `Purchase Order Configuration` — correctly `undifferentiated`

Page and all 16 fields `undifferentiated`; no New Experience twin exists for this tool. Nothing to do.

---

## Contradictions and ranges — validator-clean (checked, not assumed)

I ran the validator's own invariants over all 12 contradictions:

```
contradictions: 12 | CONTRADICTION PROBLEMS: 0
  all kinds in {label-drift, option-list, scope, structure, cardinality, requirement}
  all have >= 2 readings | no duplicate (file, quote) readings | no dangling owners
  all consequenceForWriter populated
```

`contr.g3.009` has `appliesTo: {page: null, field: null}` — legal (the validator only checks a *set*
`appliesToFieldId`), and correct, since the ingestion-route cardinality question belongs to no single
field. The build records both tolerance lists, all four Level readings, three dash spellings of
"Line Item – Receipt", and both quantity-receipt route counts as separate readings **without
reconciling any of them**. That is the standard the brief asks for, met.

Both compressed ranges pass `count == len(expandsTo)`, `len >= 2`, verbatim quote, no dangling owner.

## Other validator invariants swept

```
selector leaks (ERROR):            0
illegal uiVariant on fields:       0
orphan fields (pageId unknown):    n/a — both pages are new and declared
non-snake_case field names:        1  -> rulesGrid   (all other 50 conform)
```

---

## Findings, ranked

| # | Severity | Finding | Action |
|---|---|---|---|
| 1 | **HIGH** | `match_status` filed on PO Matching Rules; its own quote names four end-user pages, cited file never names this page, and the build's own drop record + value-set context both call it a non-control | Drop the field; keep `valueSets[14]` with a null owner |
| 2 | **HIGH** | Page `uiVariant: "both"` with 35/35 fields `undifferentiated`, contradicting the roster's own declared evidence and Lens C | Set `"undifferentiated"` |
| 3 | MED | `dep[24]` asserts a DSN contradiction that does not exist — the two sources cover different cases | Rewrite `condition`, drop contradiction language |
| 4 | MED | `dep.g1.057`/`.058` still dangle after merge: they target `PO Configuration`, roster has `group_selector` | Repoint at merge |
| 5 | MED | `matching_rule_type` is a taxonomy duplicating two tab records; label has 0 corpus hits | Demote to concept; re-home `contr.g3.010` |
| 6 | MED | `valueSets[9]/[10]` `values` assert pair strings as literal options in both lists; only the notes are correct | Flag the set as pairwise |
| 7 | LOW | Fabricated labels `"Rules (rule rows)"`, `"Matching rule type"` (0 corpus hits) | Relabel; disambiguate in notes |
| 8 | LOW | `dep[26]` quote mentions both endpoints without stating the dependency | Mark inferred or re-quote |
| 9 | LOW | `valueSets[13]` self-referential `contextField`; 6-char quote `"(INVC)"` | Clear `contextField`; use `Receipt Individual (RIND)` |

**Verdict: merge after fixing #1 and #2.** Both are one-line edits, both are supported by the build's
own declared evidence, and neither loses information — the Match Status catalogue survives as an
unowned value set and the sole real UI-variant difference survives as `contr.g3.008`. Findings #3–#6
should be cleared in the same pass; #7–#9 are hygiene that can ride along. Nothing here requires
re-derivation: every claim above names the file, the field, the exact string, and the command.
