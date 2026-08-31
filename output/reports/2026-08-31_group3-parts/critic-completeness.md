# Group 3 — ADVERSARIAL CRITIC: COMPLETENESS (what is MISSING)

**Pages under review:** `purchase-order-matching-rules`, `purchase-order-configuration`
**Corpus:** `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE` — SAP 2026_08, Professional Edition, crawled 2026-08-29
**Graph on disk:** `/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json` — 18 pages / 437 fields / 335 deps / 28 steps / 54 value sets / 24 contradictions / 10 compressed ranges (measured with `python3`, not taken from the digest)
**Date:** 2026-08-31

Every claim below has a command behind it. Directory sizes re-verified: `ls | wc -l` → **1209** admin-guides, **650** tools-guides.

---

## 0. HEADLINE — FIVE THINGS THAT WOULD CHANGE THE GRAPH

| # | Finding | Measurement |
|---|---|---|
| 1 | **`Receipt Type` is absent from the entire deliverable and from the entire graph** — yet it is the documented HARD GATE on whether the receipt matching rules this page configures ever fire, it is enumerated in **four different value vocabularies**, and it is the exact twin of `Receipt Required`, which *was* captured. | `grep -c "Receipt Type" *.json` over all 13 Group 3 artifacts → **0 in every file**. `json.dumps(graph).count('Receipt Type')` → **0**. Corpus: **8 files**, 16 lines. |
| 2 | **Invoice Settings carries 13 of 24 documented rows** — the canonical settings table was never re-read, and one of the 11 missing rows is the *target of a dependency this very run emits*, so that edge lands on a phantom. | `available-invoice-settings-8b3411f0.md` = **24 data rows** (row-opener scan, `mdtbl`=101). Graph `page.invoice-settings` = **13 fields**. Missing = **11**. |
| 3 | **`concur-receiving-roles-099f375f.md` (admin-guides) was never opened** — it is the admin twin of the 6×4 Concur Receiving roles matrix that *was* extracted from tools-guides, and the two twins **materially disagree** on one role requirement. | `diff` of bodies: 15 hunks, 14 punctuation-only, **1 substantive**: admin L90 `the user must also have the Receipt User role.` vs tools L94 `the user can have the Receipt User role.` |
| 4 | **A real raw-`<table>` catalog was dismissed as "a pencils example" on `<tr>` count alone.** `configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md:65` holds a 3-column Copy Down Source roster of **21 named entries + 2 EN-DASH compressed ranges**, byte-identical at `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md:122`. Nothing in the 437-field graph carries it. | `grep -c '<table'`=5, `grep -c '<tr'`=5 — but table 5 packs **25 `<p class="p">` cells into one `<tr>`**. Graph `configCompressedRanges` = 10, none is `Custom 1–24` / `Custom 1–20`. |
| 5 | **`purchase-order-processor-experience-8b507c54.md` was RULED OUT but is the only tools-guides attestation of group-aware PO Configuration**, and it gives a *different* three-item attribute list than the admin topic. | tools L29 `supporting documents, logos, and email addresses` vs admin `b603f04b.md:23` `the company name, logo, email address, and other details`. Both `grep -F -c` = 1. |

---

## 1. MUST-READ FILES NEVER CITED — verdict per file

The digest lists **19** never-cited must-reads for page 1 and **0** for page 2. I opened all 19. **Every skip reason holds.** This is a clean bill and I state it as a finding, not a formality — the roster's skip declarations are the most honest artifact in this build.

Measured per file (`grep -c '<table'`, `grep -cP '^\s*\|'`, `grep -cP '^\s*-   '`), all in `concur-invoice-professional-edition-admin-guides/` unless marked:

| File | rawtbl / mdtbl / bullets | What a graph would have gained |
|---|---|---|
| `purchase-order-matching-rules-8b357dbb.md` | 0/0/7 | **Nothing.** Diffed line-by-line against the New Experience twin: bodies 1–30 identical; the 7-bullet capability run is byte-identical in both. Citing it double-counts. |
| `edit-purchase-order-matching-rules-604d1e31.md` | 0/0/0 | **Marginal.** It is the only file spelling out the Edit path as a numbered 4-step (`In Purchase Order Matching Set` → `Click Edit` → change → `Click Save.`). Every claim is duplicated in `access-…-8407c500.md`, which *is* cited, and the step sequence is reachable from step-2/step-3. Cited 3× in `synth-steps.json` prose but never as a `sourceFile` — acceptable. |
| `copy-purchase-order-matching-rules-c6d4106a.md` | 0/0/0 | **Nothing.** One sentence: copying is identical to Step 1. Thin is correct. |
| `refine-the-rules-allow-submission-despite-tolerance-9b96d467.md` | 0/0/0 | **Nothing new** — it IS cited (1× as sourceFile in the histogram below). Locates `Allow Submit/Approve` in `the Options section of the Rules tab`; already in notes. |
| `refine-the-rules-include-an-exception-message-c174b2b6.md` | 0/0/0 | **Nothing new** — also cited 1×. |
| `refine-the-rules-include-condition-based-rules-in-a-rule-set-ad7b0d65.md` | 0/0/0 | **Nothing.** Evaluation semantics (conditional rules run as subsets; default rules run when no condition met). No control. |
| `refine-the-rules-combine-the-life-to-date-and-rules-rule-types-2b46973f.md` | 0/0/5 | **Nothing.** A worked $400/$500 flat-screen example. The one durable fact ("a tolerance value of zero" is legitimate) is in `toleranceBasis` notes. |
| `receipt-central-confirmation-type-a30f804b.md` | 0/0/0 | **Nothing configurable.** RCEN runtime behaviour + the end-user `Send to Purchasing` button. |
| `receipt-individual-confirmation-type-56fd62f1.md` | 0/0/0 | **Nothing configurable** — but see §9: its example RIND message is a *completely different string* from step-5's shipped RIND default. Both are marked "(configurable)". Worth one line in notes. |
| `invoice-confirmation-type-3142509d.md` | 0/0/0 | **Nothing configurable.** Its INVC example message *begins with* step-5's default and continues — a superset, not a conflict. Correctly not treated as the default. |
| `how-receipt-confirmation-exceptions-appear-9d67250d.md` | 0/0/0 | **Nothing.** PO exceptions and receipt-confirmation exceptions co-occur. |
| `match-rule-set-per-policy-8b14149d.md` | 0/0/0 | **Nothing.** One scoping sentence, already in `associated_policies` notes. |
| `general-notes-ced8d7d0.md` | 0/0/0 | **Nothing.** Confirmed abstract-only restatement of `e98c9b2c`. Emitting both would create the two-fields-from-one-constraint defect. |
| `audit-trail-c1a37524.md` | 0/0/2 | **Nothing homeable.** Two behavioural facts; there is no audit-trail toggle to attach them to. |
| `before-you-begin-dc5d817c.md` | 0/0/0 | **Nothing.** Section shell, one sentence. |
| `overview-8b37481c.md` | 0/0/0 | **Nothing beyond nav.** Third nav attestation with U+00A0 separators — already in the map phase. |
| `required-roles-ec6fae13.md` | 0/0/0 | **Nothing beyond the role gate**, already in map-phase `roleGates`. NOTE: the 6-row roles matrix lives in the *tools* sibling `ef2c2901` — and now also in the never-opened `concur-receiving-roles-099f375f.md` (§2). |
| `best-practices-129dae61.md` | 0/0/2 | **Nothing.** Confirmed the corpus defect the map flagged: its abstract is boilerplate about **SAP software versions**, unrelated to matching. |
| `overview-8b4fd062.md` (tools) | 0/0/3 | **Nothing.** Confirmed cross-deliverable republish of `overview-8b35a33f.md`. |

**Citation reality check.** Across `roster-*.json` + `synth-*.json`, only **39 distinct files** appear as a `sourceFile` on an emitted node, out of 82 corpus files referenced anywhere in the artifacts. Tools-guides share of cited sourceFiles: **9 of 39 (23%)**. Top of the histogram: `configure-purchase-orders-8128725e.md` 28, `step-3-…-64eb1c47.md` 23, `configure-three-way-matching-c043e5c8.md` 22.

---

## 2. FILES THE INVENTORY NEVER FOUND

I re-ran the sweep in BOTH directories with synonyms the mapper's own search log does not contain, then subtracted every file referenced anywhere in the 13 Group 3 artifacts.

```bash
grep -rliE "purchase order|purchase request|matching rule|match rule|receipt confirmation|concur receiving" $A $T | sort -u   # 354-file universe
for term in "matching rule" "match rule" "rule set" "tolerance" "three-way" "Concur Receiving" \
            "goods receipt" "delivery slip" "quantity receipt" "In Use" "Overage" "variance" \
            "transmitted purchase order" "Next Sequence" "Postfix" "bill-to" "branding" "logo" \
            "Supporting Document" "group aware" "DoNotReply" "Receipt Type"; do
  grep -rliF "$term" $A $T | grep -vxF -f cited.txt; done
```

### 2.1 `adding-receipt-type-field-to-the-purchase-request-header-form-ba26762e.md` — **NEVER OPENED. THE BIGGEST MISS.**

`grep -c "ba26762e" *.json` → **0 in all 13 artifacts**. `graph.count('Receipt Type')` → **0**. `graph.count('Quantity Receipt')` → **0**.

This is the structural twin of `is-receipt-required-value-on-po-line-item-896466e1.md`, which the build DID capture as the hard gate and DID emit as a dependency (`confirmation_type → Purchase Order Import | Is Receipt Required`). The Receipt Type gate got no such treatment. Verbatim, all `grep -F -c` = 1:

- `ba26762e.md:23` — `For receipt matching rules to apply, the Receipt Type at the purchase order line item level needs to be Quantity Receipt.`
- `ba26762e.md:25` — `The Receipt Type field needs to be added to the Purchase Request Header form` (→ **Forms and Fields** dependency, exactly like Delivery Slip Number)
- `ba26762e.md:29` — `The default Receipt Type for goods is Quantity Receipt, and the default Receipt Type for services is None.`
- cross-directory corroboration, `tools-guides/concur-receiving-8b4f0098.md:33` — `The default will be None for services and Quantity Receipt for goods.`

**And it carries a four-way value-vocabulary contradiction, all four groundable, none recorded anywhere:**

| Source | Vocabulary | n |
|---|---|---|
| `ba26762e.md` + `tools-guides/concur-receiving-8b4f0098.md` | UI labels: `Quantity Receipt`, `None` | 2 |
| `purchase-order-import-web-service-8b355806.md:25` | numeric: `0 (Default; No receipt; two-way matching)`, `1 (Receipt Confirmation)`, `2 (Received Quantity; three-way matching)` | 3 |
| `purchase-order-request-header-record-type-200-format-46f69dcc.md:597` | mnemonic **header**: `NONE (No receipt; two-way matching)`, `RCON (Receipt Confirmation)`, `WQTY (Receipt Confirmation with Quantity; three-way matching)` | 3 |
| `purchase-order-line-item-record-type-300-format-11a7a2be.md:351` | mnemonic **line item**: `NONE`, `WQTY` — **RCON is omitted**, `Maximum 4 characters`, `If left empty, the default value will be NONE.` | 2 |

That is a header-vs-line-item partial-list disagreement *inside one import spec family*, plus a numeric-vs-mnemonic disagreement across two admin topics. This is precisely the class the brief says must be recorded as a contradiction, not reconciled.

**Disposition (page ownership respected):** do NOT put a `Receipt Type` field on either Group 3 page. Emit (a) `Purchase Order Matching Rules → Forms and Fields | Receipt Type` (form enablement), (b) `Purchase Order Matching Rules → Purchase Order Import | Receipt Type` (data gate), (c) one ConfigContradiction node carrying all four vocabularies with per-file quotes.

### 2.2 `concur-receiving-roles-099f375f.md` — **NEVER OPENED. An admin twin that contradicts its tools twin.**

`bytes=2690  lines=151  rawtbl=0  mdtbl=36  bullets=0` — the identical census signature to the tools file `required-roles-ef2c2901.md` (`mdtbl`=36), which the build DID extract in full as an orphan candidate. Title: **`Concur Receiving Roles`**; distinct `loio: 099f375f613145e5a31f4e5a34208257`.

Both carry the same **6 rows** (`Purchase Order Processor`, `Invoice Processor`, `Purchase Request User`, `Invoice User`, `Central Receiver`, `Receipt User` — admin at lines 44/61/78/95/112/131, tools at 48/65/82/99/116/135). A full body `diff` produces 15 hunks. Fourteen are punctuation (trailing full stops, `In Purchase Order tab` vs `In the Purchase Order tab`, one U+00A0 nav path). **One is substantive:**

- admin `099f375f.md:90` — `The admin must have selected (enabled) the Allow Purchase Request Owners to Edit their own Purchase Orders option in Invoice Settings. Alternatively, the user must also have the Receipt User role.`
- tools `ef2c2901.md:94` — `… Alternatively, the user can have the Receipt User role.`

`must also have` vs `can have` is an optional-vs-mandatory disagreement on a role prerequisite. A third reading breaks toward the tools form: `tools-guides/concur-receiving-8b4f0098.md:27` — `Provided the admin has selected (enabled) the … option in Invoice Settings **or** added the Receipt User role in User Permissions`. Record as a contradiction with three readings; do not silently pick.

Second, smaller: the admin twin **lacks** the sentence `Only the Invoice Configuration administrator can access and configure the Purchase Order Matching Rules feature.` that the tools twin carries. The role-gate wording therefore has three attestations, not two.

### 2.3 `purchase-order-processor-experience-8b507c54.md` — ruled out on a partial read

The map ruled it out on one quote (`The Purchase Order Processor role clicks Requests > Purchase Requests > Process Purchase Orders.`). Lines 27–31 are a section headed **`Purchase Order Configuration is Group-Aware`** — a cross-directory twin of `b603f04b.md` and the ONLY tools-guides statement of the group-aware scope:

> `This configuration may include region- or subsidiary-specific attributes, including supporting documents, logos, and email addresses.` (`grep -F -c` = 1)

versus the admin topic (`b603f04b.md:23`, `grep -F -c` = 1):

> `you can refine the company name, logo, email address, and other details`

**Three-item lists that disagree**: admin says *company name*, tools says *supporting documents*; both say logo + email address; admin closes with `and other details` (open list), tools with `including` (also open). Two open partial lists that do not agree on their third member. Record as a contradiction on `group_selector` / page 2's group-aware scope; it also strengthens the currently ADJACENCY-ONLY binding of `supporting_documents` to the Group.

### 2.4 Files re-found and honestly worth nothing (clean bills)

- `admin-guides/overview-8b3b733b.md` — Workflow overview; PO matching mentioned only as a workflow example. Workflows group.
- `tools-guides/manage-receipts-and-receipt-images-{d6db6388,e446057f,f177e036}.md` — three near-identical end-user topics, 0 tables, 0 lists. Runtime.
- `tools-guides/po-based-invoice-lifecycle-54df3d85.md` (15 bullets, never surfaced by any sweep) — a 5-stage runtime lifecycle. Corroborates `when-are-match-rules-run` (`Match Rules are run for the first time when the Invoice Owner is established (Assign)`); adds no control.
- `admin-guides/overview-8b459fc5.md` — PO **receipt extract** overview. Extract spec, not config.
- `tools-guides/concur-receiving-8b4f0098.md` — no tables/lists, but it is the cross-directory corroboration for §2.1 and §2.2 above, so it is not zero-value.
- `admin-guides/email-message-replacement-tokens-c9cc4af4.md` — the crosscut lens listed this as a **rejected near-miss**. **The rejection is correct**: the 4-row `%1%`–`%4%` table is scoped to `the Add Email Reminder page` / `reminder email subjects and bodies`, not PO transmission. Confirmed by reading.
- `admin-guides/units-of-measure-270126e4.md` — hits "matching rule", but its `Default Goods` / `Default Services` / `Spend Type` are already in the graph from that exact file (3 fields, `sourceFile` matches). Clean.

---

## 3. RAW `<table>` SWEEP — census independently reproduced, one verdict overturned

```bash
grep -rlF '<table' $A | wc -l   # 31
grep -rlF '<table' $T | wc -l   # 1
for f in $(grep -rlF '<table' $A $T); do printf '%s\t%s\t%s\n' "$(grep -cF '<table' $f)" "$(grep -cF '<tr' $f)" "$f"; done | sort -rn
```

**31 admin + 1 tools = 32 files.** This exactly reproduces the map's §4 census, file for file and count for count. Nothing was hidden.

**But the map's headline §0.1 verdict is half wrong.** It wrote: *"Not one of them is a field/value source … The two PO-adjacent ones are illustrative, not catalogs … a pencils example … `<tr>`=5 total. Measured, not eyeballed."* The `<tr>` count is right; the inference from it is not.

`configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md` has 5 `<table>`. Tables 1–4 (lines 43, 47, 54, 58) genuinely ARE the pencils example — 3 `<tr>` each of Office Supplies / No. 2 Pencils. **Table 5 (line 65) is a settings catalog** that packs its entire payload into ONE `<tr>` as 25 `<p class="p">` cells, which is exactly why a `<tr>` census under-counts it the same way `grep -c "^|"` under-counts an indented markdown table:

| Column | Entries | Content |
|---|---|---|
| `PO Header` | **11** | `Custom 1–24` (EN DASH, no spaces), Currency, Description, Discount Percentage, Discount Terms, Name, Net Payment Terms, Order Date, Requested Delivery Date, Shipping, Tax |
| `PO Line Item` | **10** | `Custom 1–20` (EN DASH), Account Code Description, External ID, `Line Number Expense Type`, Quantity, `Requested`, `Delivery Date`, Supplier Part ID, Tax, Unit Price |
| `PO Distributions` | **4** | `No Configuration`; `Not a "Source" choice:`; `Always copies down if available data on PO`; `Ensure PO and Invoice Distribution Forms "match": Custom 1 to Custom 1` |

**It is duplicated across two files and missed in both** — byte-identical at `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md:122` (verified by extracting the line from each and comparing). This is the predecessor's exact pattern.

**It is not in the graph.** The only related node is `vset.g5.copy-down-source.appears-only-if-default-value-type-copy-down` (4 values: Employee, Purchase Order Header, Payment Vendor, Purchase Request Details, from `modifying-fields-b16a6078.md`) — a *different axis* (which FORM is the source, not which FIELDS are available).

**Ownership:** Forms and Fields (Group 5, built) — correctly NOT homed on either Group 3 page. The tables lens caught this and flagged it for follow-up; that judgement was right and should be acted on via the existing `patch` mechanism on value-set nodes (precedent: `vset.g2ar.*` carries `"patch": "Audit Rules"`), not left as a note.

All other 30 raw-table files re-checked: 21 are `sample-record-*` / `record-type-*` import specs (1 `<table>`, 1 `<tr>` each), the rest belong to already-built pages. **`tools-guides/what-fields-are-extracted-during-the-ocr-process-8eddb3cf.md` is the only raw-table file in tools-guides** and is already the source of two graph compressed ranges.

---

## 4. LONG CATALOG SWEEP

Census over the 354-file PO/matching universe, keeping anything with `mdtbl >= 10` or `bullets >= 10` or `rawtbl >= 1`, minus everything the artifacts reference:

### 4.1 `available-invoice-settings-8b3411f0.md` — **24 rows in source, 13 in graph. THE 11-ROW WOUND IS STILL OPEN.**

`bytes=8368  mdtbl=101  rawtbl=0`. A 3-column `Setting | Description | Default Status` table. Lead-in (`grep -F -c` = 1): `The Invoice Settings page includes the following settings used to activate a feature:`

Row-opener scan gives **25 openers = 1 header + 24 data rows**. The graph's `page.invoice-settings` holds **13 fields**, and all 13 match rows from this table exactly. **11 rows are missing:**

| src line | Missing setting |
|---|---|
| 40 | Hide Payment Request Delete Link for Payment User |
| 55 | Hide Add and Delete Item Link for Payment Processor User |
| 68 | Hide Add and Delete Item Link for Payment Approver User |
| 111 | Allow processor users to approve requests that are pending other approvers |
| 124 | Allow users to manage favorite allocations for payment and purchase request |
| 137 | Limit Processors, Approvers, or Managers to use invoice owners vendor list |
| 150 | Assign invoice to Purchase Request Owner |
| 163 | Allow Purchase Request Owners to Transmit their own Purchase Orders |
| 176 | Allow Purchase Request Owners to Edit their own Purchase Orders |
| 215 | Enable Create and Approval for Invoice Vendor |
| 228 | **Allow system to associate Invoice lines to Purchase Order lines based on data attributes** |

**24 − 13 = 11.** Hard-won rule 6 records that *"an early refuter killed 11 of 24 rows of a canonical settings table."* That is this table, and **the kill was never reversed**. `graph.count('associate invoice lines')` = **0**; `graph.count('Allow Purchase Request Owners')` = **0**.

**Why this is a Group 3 problem and not someone else's:** this run emits the dependency
`Purchase Order Matching Rules | level_field → Invoice Settings | Allow system to associate invoice lines to Purchase Order lines based on data attributes`.
That target does not exist. The edge lands on a phantom the moment it merges. Note also the capitalisation trap: the canonical table writes **`Invoice lines`** (capital I) at line 228, while the Group 3 dependency and `line-identification-for-purchase-order-matching-3c7c8336.md` write `invoice lines` — so a naive string join will not resolve it even after the 11 rows are restored.

**A 25th setting exists outside that table**: `enable-the-po-change-order-feature-7dd5dcd4.md:25` (never read by any lens) — `To activate this feature, admin needs to use the Invoice Settings tool by selecting (enabling) the Enable Change Order check box. The default setting is cleared (disabled).` `Enable Change Order` is not in the 24-row table and not in the graph. The 24-row table is therefore itself incomplete — record it as such rather than treating it as closed.

### 4.2 `purchase-request-settings-b0bce285.md` — Workflows-owned, never surfaced

`bytes=3735  mdtbl=13  rawtbl=0`. A 2-column `Setting | Description` table with **3 rows**: `Allow users to select their own approver for purchase requests`, `Display purchase request approval links to approvers on the home page`, `Prevent purchase request submission when exception level exceeds X`. This is the sibling of `purchase-order-settings-a5a997b4.md` (**1 row**) that the recon roster already retired as Workflows-owned. Correct to keep off both Group 3 pages — but it is the *second* of "the two settings tables the corpus places on Workflows", and nothing in this run names it, so flag it for the Workflows group before it is lost.

### 4.3 Everything else in the sweep — correctly out

`details-section-49500221.md` (mdtbl=1360), `invoice-header-import-record-type-310-format-21975178.md` (366), `field-mapping-e3881fa5.md` (221), `error-messages-3b8339b0.md` (210), the `the-query-builder-and-the-condition-editor-*` pair (216/224 bullets), `the-condition-page-5d4ea870.md` (288 bullets) — all import/extract specs, Audit Rules, or already-built pages. `the-condition-page` in particular is Audit Rules (Group 2, built) and its 288 bullets are already the source of several `vset.g2ar.*` nodes; the map was right to ring-fence it.

### 4.4 Catalogs that DID reach the deliverable — all row-complete

No truncation found. Counted independently:

| Catalog | Source rows | In deliverable |
|---|---|---|
| Life to Date rule types, `step-2-…-dc296ae6.md` (INDENTED: `grep -c '^| '`=0, `grep -cP '^\s*\|'`=22) | **6** | 6 ✓ |
| Confirmation Type × Default Message × Intent, `step-5-…-5328a8e1.md` | **3** (+`None` in prose) | 3 + None ✓ |
| Match Status, `tools-guides/understand-the-match-status-…-52477c6b.md` | **6** | 6 ✓ |
| Concur Receiving roles, `tools-guides/required-roles-ef2c2901.md` | **6** | 6 ✓ (but see §2.2 — the admin twin was never read) |
| Confirmation types, `confirmation-types-b4a94761.md` | **4** | 4 ✓ |
| Tolerance, `step-3-…-64eb1c47.md` under `Choose one tolerance:` | **4** | 4 ✓, and the rival 3-list from `c043e5c8.md:46` recorded as `contr.g3.004` ✓ |
| Level, `step-3-…-64eb1c47.md:31` | **4** | 4 ✓, with 3-value rivals recorded as `contr.g3.006` ✓ |
| Terminology glossary, `terminology-d3b9f043.md` | **6** | 6 ✓ |
| Re-run triggers + cannot-run states, `tools-guides/when-are-match-rules-run-f835a01e.md` | **4 + 3** | 7 ✓ |
| Logo formats, `configure-purchase-orders-8128725e.md:39` | **3** | 3 ✓ |
| PO document sources, `tools-guides/preview-a-purchase-order-846396e1.md` | **4** | 4 ✓ |

**Clean bill on truncation.** Zero N-vs-M mismatches on this run's own two pages.

Bonus verification of a load-bearing map claim: `INVC` / `RIND` / `RCEN` really do appear **exactly once each, in one file** — `grep -rn` across all four corpus directories returns `step-5-…-5328a8e1.md` lines 56 / 69 / 82 and nothing else. The claim is TRUE.

---

## 5. TRUNCATION — see §4.4. No mismatches. One source-side truncation reconfirmed.

`create-purchase-order-matching-rules-adb700f9.md` ends on a bare line containing only `x` (`tail | cat -A` → `x$`). Confirmed. The build correctly refuses to use it as a primary source and flags incompleteness — the right call, and its 4-value lower-case Level list (`header, line item, line item – receipt, and/or vendor`) is carried only as a contradiction reading, not as an authoritative enumeration.

---

## 6. COMPRESSED RANGES

Independent sweep over every file the artifacts touch:

```bash
grep -noP '\b(Custom|Level|Future Use|Vat Amount|Segment|Field)\s*0?\d+\s*[-–—to]{1,3}\s*0?\d+|\b\d+\s*[–—]\s*\d+\b|one to \d+|from \d+ to \d+'
```

| Hit | File:line | Verdict |
|---|---|---|
| `Custom 1–24`, `Custom 1–20` (EN DASH U+2013, **no surrounding spaces**) | `configure-forms-and-fields-…-f926eac7.md:65` **and** `policies-the-purchase-order-policy-new-experience-5a1ba7ef.md:122` | REAL. Recorded in `synth-ranges.json` with correct expansions (24 and 20 members) and correct EN-DASH notes — **but with `appliesTo: {}`**. An unowned range node is a merge hazard; home them on `page.forms-and-fields` (`copyDownSource` / `copyDownFieldPO`) using the `patch` mechanism. Note the two families genuinely differ in length (24 vs 20) — do not normalise. |
| `1–3` (EN DASH) | `purchase-order-matching-rules-new-experience-6c8fb80f.md:65`, `test-and-change-match-rule-sets-49f57319.md:34` | NOT a field range — `Repeat steps 1–3`, a procedure back-reference. Correctly not recorded. |
| `one to 99` | `purchase-order-settings-a5a997b4.md:40` (and the same phrasing in `purchase-request-settings-b0bce285.md`) | REAL but **Workflows-owned**. A numeric constraint spelled in words, which no regex on digits will find. Flag for the Workflows group. |

**On the two Group 3 pages themselves there is not one compressed range.** `synth-ranges` reporting only the two Forms-and-Fields `Custom` families is the honest answer, and the lenses' `compressedRanges: []` per page is correct.

---

## 7. THIN PAGES — honest or lazy?

### `purchase-order-configuration` — coverage `partial`, 16 fields. **HONEST.**

I read `configure-purchase-orders-8128725e.md` end to end (131 lines) and checked all 16 field names against it. Every one of the 12 prose sections is represented; nothing was left on the table:

`PO Number Generation` (→ `po_number_next_sequence`, `po_number_prefix`, `po_number_postfix`), `Message to Include on Transmitted Purchase Orders`, `Default Email Subject…`, `Default Email Message…`, `Company Address`, `Supporting Documents`, `Company Branding Logo`, `Default Sender Email`, `Fields to Appear on Purchase Orders` (+ `policy`), `Ship To Without Requestor Name`, `Company Name Without Address`, `Use Email as Bill-To`, plus `group_selector` from `b603f04b.md`.

Corroborating measurements for the thinness:
- `grep -c "Purchase Order Configuration" configure-purchase-orders-8128725e.md` = **0** — the file that carries every setting names neither the page nor a nav path. Verified.
- `grep -c '<table'` = 0, `grep -cP '^\s*\|'` = 0, `grep -cP '^\s*-   '` = 0 on all five must-reads. Verified.
- `grep -rn "Next Sequence"` across both directories returns **exactly one line** — this page has no second witness anywhere.
- No Save/Cancel: the only `Save` in the five must-reads is `manage-images-03021850.md:62` `Click Save or Cancel when you are done.` — and reading its context shows it is step 2 of *To view an image* in the end-user **Purchase Request Images** window, not the admin tool. The procedure lens's claim survives.
- The `Default Email Subject` token tooltip IS captured, correctly, as *tokens exist but are never enumerated*: `When the admin clicks the Default Email Subject When Transmitting Purchase Orders field, they will see a tool tip with information (tokens) about how to enter text in the field.` No enumeration exists in the corpus, and the one token table that does exist (`email-message-replacement-tokens-c9cc4af4.md`) is scoped to email reminders. Correctly rejected.

**The page node is justified.** Two independent nav attestations in two directories (`use-the-purchase-order-configuration-tool-51009c8c.md:23`, `tools-guides/preview-a-purchase-order-846396e1.md:55`), a named role gate, and 16 named controls. This is not a zero-hit node.

**Two coverage gaps remain, both already self-reported by the roster and neither closed:** the `Upload` / `View` / `Remove` action controls on `Company Branding Logo` and on `Supporting Documents`. The corpus names all six explicitly (`click Upload in the Company Branding Logo section.`; `You can view or remove a logo by clicking View or Remove respectively.`; `You can also view and remove documents.`), the schema already models 121 `button` fields, and a Chromium driver cannot address them today. The roster declined to create them during Repair because Repair-created records escape the refuter — a defensible process rule, but the consequence is that six documented, groundable buttons stay out of the graph. This needs a decision, not another deferral.

### `purchase-order-matching-rules` — coverage `good`, 35 fields. **HONEST**, with one internal inconsistency (§8).

---

## 8. NEW EXPERIENCE / LEGACY

```bash
for d in $A $T; do ls $d | grep -i 'new-experience'; done   # 5 files corpus-wide
for d in $A $T; do ls $d | grep -i 'legacy'; done           # 2 files, neither PO
```

Only **one** New Experience variant exists for either Group 3 page: `purchase-order-matching-rules-new-experience-6c8fb80f.md` (4,804 B) against `purchase-order-matching-rules-8b357dbb.md` (2,404 B). I diffed the bodies myself:

- Lines 1–30 identical apart from the ` (New Experience)` title suffix.
- Lines 31–70 of the NE twin inline four sections that **all exist as standalone topics already in the reading list**: Before You Begin, Test and Change Match Rule Sets, "Unlock" a Matching Rule Set, Activate Exchange Rates.
- Its single divergent string is `Change to Non PO Invoice option in the Actions menu` — already recorded as `contr.g3.008`, and already broken 2:1 toward `Change to Non-PO` by `test-and-change-match-rule-sets-49f57319.md:40` and `tools-guides/change-a-po-based-invoice-policy-…-12786d77.md:29`.

**The New Experience twin contributes zero unique substantive content. Confirmed independently.**

**Therefore the page-level `uiVariant: "both"` is unsupported by this build's own evidence, and internally inconsistent with it.** Measured: `roster-purchase-order-matching-rules.json` has `uiVariant: "both"` at page level while **all 35 fields carry `uiVariant: "undifferentiated"`** (`Counter({'undifferentiated': 35})`); the map's own headline #2 and the crosscut lens both state the twin contributes nothing unique; and the one label that does differ was resolved *against* the NE twin. Set the page to `undifferentiated`, or produce a field that is genuinely variant-specific. As it stands the graph would assert a UI variant no field in it can express.

**The brief's warning about the wrong twin is real but lands elsewhere.** `policies-the-purchase-order-policy-8b35454a.md` is **1,490 B** and its New Experience sibling `5a1ba7ef.md` is **15,800 B** (`ls -l`, confirmed). I read the big one. Its unique payload is Forms-and-Fields and Policies material — `Is PO Policy`, `PO Matching Ruleset`, `External ID`, Multiple PO activation, Delivery Slip Number, and the copy-down roster of §3. Checking the graph: `Is PO Policy?`, `PO Matching Ruleset`, `External ID`, `PO Header/Line Item/Allocation Form` are all present on `page.policies` (sourced from `create-a-new-policy-dd9549c0.md` and `purchase-order-policy-fields-4aa0ac1b.md`), so Group 1 is **not** materially damaged by the stub. **The one thing genuinely lost from that big twin is the copy-down catalog in §3** — which is also the only thing in it that no other topic republishes.

---

## 9. UNDETERMINED BY THE DOCUMENTATION — ranked

These are properties of the corpus. Recording them accurately is the deliverable; none is a to-do against a tenant.

1. **`Receipt Type`'s vocabulary is genuinely unresolvable** (§2.1). Four documented value sets — UI labels (2), numeric codes (3), header mnemonics (3), line-item mnemonics (2) — and the corpus never states which surface shows which. The header/line-item split inside one import family (`RCON` present at header, absent at line item) is the sharpest single unanswerable question this page raises.
2. **Tolerance list length, 4 vs 3** (`contr.g3.004`). `step-3-…-64eb1c47.md` bullets `None / Within (+/-) / Custom / Currency`; `configure-three-way-matching-c043e5c8.md:46` says `select None, Within, or Custom`. Almost certainly provisioning-dependent (exchange-rate activation), and `Currency`'s own bullet cross-references `Activating Exchange Rates for Matching Rule Sets`. No reconciliation is available.
3. **`Level` list length, 4 vs 3** (`contr.g3.006`), and **three spellings of the receipt level** (`contr.g3.007`): `Line Item – Receipt` (EN DASH), `Line Item - Receipt` (ASCII HYPHEN), `Line Item-Receipt` (no spaces). One file (`exceptions-and-three-way-matching-rules-65d52687.md`) uses two of the three. A driver cannot be given one canonical string.
4. **Rules/Life to Date tab depth, one level vs two** (`contr.g3.005`). `step-3` reaches the Rules tab directly; `step-2` and `c043e5c8` go `Edit → Default → Edit Rules` first. Both procedures are complete and internally consistent; the corpus never says which build shows which.
5. **`Fields to Appear on Purchase Orders` is never enumerated.** `grep -rniE "fields to appear|appear on the purchase order"` returns exactly 2 lines, both in `configure-purchase-orders-8128725e.md`, and one of them carries SAP's typo `The header and line time fields you select will appear on the purchase order.` The PO import specs enumerate PO *file* fields, not the selectable UI roster; conflating them would be exactly the invention this build is designed to avoid. Leave unenumerated.
6. **Receipt User role: mandatory or optional** (§2.2) — `must also have` vs `can have` vs `or added the Receipt User role`. Three readings, two verdicts.
7. **Group-aware attribute list** (§2.3) — two open partial lists that disagree on their third member.
8. **Quantity Receipt ingestion routes, 2 vs 3** (`contr.g3.009`) — provisioning-dependent on whether Concur Receiving is activated on Policies.
9. **`exceptions-and-three-way-matching-rules-65d52687.md` contradicts itself in one paragraph** (`contr.g3.010`): `three purchase order matching rules are available` then `recommends that clients use both these rules`, and it documents only **one** of the three (`## The Line Item – Receipt: Line Quantity Rule`). The other two rule headings do not exist anywhere in the corpus — verified. Two of three three-way rules are simply undocumented.
10. **`Invoice Processing Admin` middle nav node** — grep-verified absent from all six nav-bearing topics across both pages, yet documented for ~20 siblings on the same menu. UNATTESTED, not absent. The driver must try both paths.
11. **RIND default message text diverges between two topics.** `step-5`'s table gives `Not all associated purchase order line items have been marked as received. Please update the receipt status before submitting/approving the request.`; `receipt-individual-confirmation-type-56fd62f1.md` shows `The invoice is being held until all items have been marked as received by the invoice owner in the ERP. Please update in [ERP Location], then submit this request.` Both are marked "(configurable)". The build takes step-5's, which is right — but the divergence itself is a corpus fact worth one note. (By contrast the INVC pair is a clean superset, not a conflict.)
12. **`Line Number Expense Type`, `Requested`, `Delivery Date`** in the copy-down roster (§3) are ambiguously cell-broken in the source HTML — `Requested Delivery Date` appears whole in the PO Header column but split across two `<p>` in the PO Line Item column. Whether the line-item family has 9 or 10 distinct members is not determinable from the markup. Record both readings.
13. **SAP text traps re-confirmed for the driver:** `line time fields` for *line item fields* (`configure-purchase-orders-8128725e.md`); `clickingAdministration` with no space and `his invoice cannot move forward` with a dropped T (`step-5-…-5328a8e1.md`); `Polices` (`configure-concur-receiving-1ececc23.md:29`); `header DNS field` (`tools-guides/receipt-association-and-three-way-matching-12b976a5.md`); `Administration  Invoice  Purchase Order Matching Rules` with U+00A0 and no `>` (`overview-8b37481c.md:23`).

---

## 10. WHAT I COULD NOT BREAK

Stated because a clean bill from an adversary is evidence:

- The raw-`<table>` census is exact, file for file (31 + 1).
- Every catalog that reached the deliverable is row-complete. Zero truncation.
- `INVC` / `RIND` / `RCEN` uniqueness: true.
- Both PO Matching Rules twins were genuinely read and genuinely diffed.
- All 19 never-cited must-reads are genuinely thin; every skip declaration survives inspection.
- The eight recorded contradictions plus four synth additions are all real and all correctly refuse to reconcile.
- Neither page node is a zero-hit invention.
- The dropped-field list (23 + 5) is duplicate-elimination and wrong-page routing, not silent deletion — I found no real control among them.
- `compressedRanges: []` per page is correct.
- The `PO Configuration` alias trap (Policies, not this page) and the `purchase-order-settings-a5a997b4.md` Workflows routing both hold under re-verification.
