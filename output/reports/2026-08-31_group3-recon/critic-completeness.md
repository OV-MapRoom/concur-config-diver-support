# GROUP 3 — COMPLETENESS CRITIC (what is MISSING)

**Lens:** completeness. **Verdict:** the two-page roster is CORRECT and survives an independent
corpus sweep — but it loses material at its edges, and it left the single decisive piece of evidence
about "the eleven" unopened **inside its own repo**.

Everything below has a command behind it. Corpus root
`/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`, both guide directories weighted equally.

---

## 1. MY OWN SWEEP — I started from the corpus, not the roster

### 1a. The brief's synonym list, run over both guide dirs (`grep -ril <term> | wc -l`)

| term | files | verdict |
|---|---:|---|
| catalog | **0** | roster correct — must not be invented |
| punchout / punch-out | **0** | roster correct |
| sourcing | **0** | roster correct |
| blanket order | **0** | — |
| standing order | **0** | — |
| encumbrance | **0** | — |
| service entry | **0** | — |
| landed cost | **0** | — |
| requisition | **1** | `configuring-header-and-item-level-data-to-copy-from-pr-to-po-45788d92.md` — *"copying from purchase requisition (PR) to purchase order (PO)"*. Incidental synonym. Roster correct. |
| obligation | 2 | not PO-config |
| freight | 2 | not PO-config |
| commodity | 6 | **all Tax Validation / UNSPSC** (`step-3-configure-the-service-14c3ef13.md`, `work-with-commodity-codes-in-this-view-f37c2a6e.md`) → `page.tax-administration`, built. Not PO. |
| contract | 8 | not PO-config |
| goods receipt | 11 | Concur Receiving / GRN, all covered |
| procurement | 26 | all already in scope; **one file the roster never names** — `tools-guides/establish-po-match-to-be-model-f397c50f.md` (2,380 B). I read it: a business-process "To Be" model with role narrative, no fields, no nav. Correctly absent. |
| delivery | 30 | Delivery Slip Number + delivery dates |
| supplier | 109 | Peppol / vendor / e-invoicing, not PO |

**No new surface.** The synonym axis is exhausted.

### 1b. Independent navigation censuses (I re-ran all four, plus two the roster didn't)

- **`Invoice > X`** — 33 distinct targets (`grep -rhoE "Invoice ?> ?[A-Z]..."`). PO-domain: exactly
  **two** — `Invoice > Purchase Order Matching Rules` (3) and `Invoice > Purchase Order Configuration` (2).
- **nbsp-separated nav (no `>` glyph)** — the trap the roster flagged for Feature Hierarchies. 16
  distinct forms. PO-domain: exactly **one** — `Administration Invoice Purchase Order Matching Rules`.
  Also present: `Administration Invoice Workflows Settings tab`, `Administration Invoice Admin`.
- **`(left menu)`** — 29 phrasings. PO-domain: `Purchase Order Matching Rules` only, twice
  (`Click Purchase Order Matching Rules (left menu)` and the bare form).
- **`The X page appears`** — 80 distinct names. PO-domain: **one**.
- **Python census of every `<Name> page|window|tool|screen|tab` phrase filtered to PO tokens** — 91
  distinct phrases. Every "page" candidate other than Purchase Order Matching Rules is end-user
  (All Orders, All Purchase Orders, Purchase Orders Pending Transmission, Image Received, Purchase
  Details, Closed purchase orders). **No new admin surface.**
- **`Administration > X` first segment** — 78× Invoice, 6× Company, 5× `Administration >Invoice`
  (no space), 4× `Invoice Admin`. **`Requests > X`** — `Requests > Purchase Requests` ×6,
  `Requests > All Purchase Orders page` ×1. All end-user.
- **Filename census** — 194 files whose name contains purchase|po|match|receiv|requisit. I opened
  every one that could plausibly be an admin surface (`change-the-configuration-of-the-po-policy-07102eaa`,
  `po-vendor-specific-fields-added-to-request-new-vendor-form-f894b9bd`,
  `workflow-the-default-po-payment-workflow-8b35b62d`, `copy-down-of-po-allocation-lines-f14c45e4`,
  `setting-the-purchase-email-notification-preferences-6652207b`, `prerequisites-8a3ef278`,
  `the-purchase-request-vendor-form-54010f45`, `configuring-header-and-item-level-data-to-copy-from-pr-to-po-45788d92`).
  **None carries an `Administration > Invoice > <new page>` string.**

**Result: I found no third PO admin page. The roster's "two" holds.** What I did find is loss at the
edges — below.

---

## 2. THE ELEVEN — the roster called this unverifiable. It is not. The evidence is in its own repo.

The roster writes: *"offered as hypotheses because the map itself is gone and I cannot check either"*
and *"a live-UI pass should be the tiebreaker."* Both statements are wrong, and correcting them
turns the roster's weakest section into its strongest.

**`/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/INVOICE-CONFIG-MAP.md`** — the surviving
reconstruction — says under Group 2:

> `| Workflows | *(path not preserved in handoff)* | Built in the lost vertical slice — 13 pages of workflow config |`

**Thirteen "pages" under ONE left-menu entry.** That is a direct, in-repo demonstration that the lost
map's counting unit was NOT the left-menu entry — it counted sub-surfaces (tabs, step editors,
dialogs). Hypothesis A stops being a hypothesis.

**`docs/2026-08-31_HANDOFF-KG-BUILD.md`** goes further. It records the lost slice's actual yield:

> `| ConfigPage | 24 (11 PO-matching, 13 workflow) |`
> `| ConfigField | 145 |`

145 fields over 24 pages ≈ **6 fields per page**. Eleven PO pages × 6 ≈ **66 PO fields.** The roster's
own independent estimate is **58**. The two builds are extracting essentially the same field surface;
only the granularity differs. That is the argument that should be leading the reconciliation section.

**And the handoff preserves lost-build Group 3 field content the roster never carries:**

> *"Example depth: `Tolerance → None / Within / Custom`, `Match Level → Header / Vendor / Line Item / Line Item-Receipt`"*

I tested both against the corpus:

```
grep -ril "Match Level"          both guide dirs → 0
grep -ril "Line Item-Receipt"    both guide dirs → 1
grep -ril "Line Item – Receipt"  both guide dirs → 3   (en dash)
```

**`Match Level` has ZERO corpus hits.** The corpus writes the control as `Level`:
`Select a value from Level (Header, Vendor, Line Item, Line Item - Receipt)`
(`admin-guides/step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md` — note the **spaced
hyphen**, a third spelling). `Match Level` is a live-UI label preserved from the lost build that the
corpus contradicts. A Chromium driver needs it as an alias, and the roster carries neither the label
nor the four values.

**Arithmetic check the roster never ran.** The map says 37 pages across 7 groups, 22 named. Named:
G1=3, G2=4, G4=4, G5=8, G6=3 = 22. 37 − 22 = 15 unrecovered = 11 (Group 3) + Group 7 + stragglers ≈ 4.
There is **no room in the arithmetic for an orphaned PO page** that the 2026_08 corpus has since
dropped. That closes the roster's own "one caveat I will not paper over" far more tightly than it did.

---

## 3. THE DEFERRED LIST — one deferral class is a silent deletion, and it is the roster's worst defect

I read every deferral and challenged its reason. Most hold. **One class does not.**

### 3a. SEVERE — deferrals point at CLOSED groups that provably do not hold the content

`output/kg-invoice-config.json` `meta.groupsComplete` = Groups 1, 2, 4, 5. The roster defers eight
PO-domain controls to `page.invoice-settings` (Group 1) and `page.forms-and-fields` (Group 5) with
language that reads as *already done*. I grepped the built graph for each:

| deferred control | roster says it lives on | hits in built graph |
|---|---|---:|
| Enable Change Order | Invoice Settings (G1) | **0** |
| Allow system to associate Invoice lines to PO lines based on data attributes | Invoice Settings (G1) | **0** |
| Allow Purchase Request Owners to **Transmit** their own Purchase Orders | Invoice Settings (G1) | **0** |
| Allow Purchase Request Owners to **Edit** their own Purchase Orders | Invoice Settings (G1) | **0** |
| Assign invoice to Purchase Request Owner | Invoice Settings (G1) | **0** |
| Purchase Order Number field (Multiple PO activation) | Forms and Fields (G5) | **0** |
| Delivery Slip Number | Forms and Fields (G5) | **0** |
| Receipt Type field on the PR Header form | Forms and Fields (G5) | **0** |

Why: **`page.invoice-settings` holds 13 fields.** Its own richest source,
`admin-guides/available-invoice-settings-8b3411f0.md` (8,368 B), enumerates a **24-row settings
catalog**. Eleven settings are missing, four of them PO-domain, and they are the four in the table
above. This is the "22-row feature matrix missed" failure recurring on a page that is already marked
complete. (`Enable Change Order` is not even in that file — it is in
`admin-guides/enable-the-po-change-order-feature-7dd5dcd4.md`, 1,770 B, a ninth orphan.)

Each of those eight has a dedicated topic with a live click step, e.g.
`allow-purchase-request-owners-to-transmit-their-own-purchase-orders-636950b7.md`:
*"Click Invoice Settings (left menu). The Invoice Settings page appears."*

**Deferring to a completed group is deletion.** The roster must either name a patch scope or say
plainly that G1/G5 have to be reopened.

### 3b. Deferrals I re-tested and would NOT reverse

- **Purchase Order Settings / Purchase Request Settings → Workflows.** Confirmed. I re-ran the
  clincher myself: `grep -c "select their own approver" available-invoice-settings-8b3411f0.md` = **0**;
  same grep on `invoice-settings-cace748d.md` = **2**. And
  `preventing-po-transmittal-when-po-exceeds-specified-exception-level-51b11602.md` reads
  *"A setting in Workflows can be used to prevent PO transmission…"*. Correct, and correctly refusing
  to mint a page.
- **PO Import / PO Extract / Quantity Receipt Import.** Confirmed no screen:
  `grep -n "Administration"` returns **nothing** in `concur-invoice-purchase-order-import-specification-8b443eee.md`
  or `purchase-order-import-web-service-8b355806.md`. `Import/Extract Administrator` appears in 21
  files and never for the PO import — it appears for the Employee Import default shipping address,
  Approved Vendor import, and list data. *Caveat to record:* a **RELEASE NOTE** does call it a tool —
  *"imported from the client's ERP system using the Purchase Order Import tool"*
  (`release-note-summaries/july-2023-invoice-professional-edition-admin-summary-46806acf.md`). Name
  only; no path; not enough to mint a page. Deferral stands.
- **Concur Receiving = feature, no screen.** Confirmed. `configure-concur-receiving-1ececc23.md`
  routes entirely to Policies (with SAP's own `Polices` misspelling inside the live click step).
- **Purchasing Admin / Receiving Admin / PO Admin.** Confirmed zero basis.
- **End-user screens.** Confirmed — every one reached from `Requests >` or an opened invoice.
- **Shipping Configuration / Localization / User Permissions / Feature Hierarchies / Delegate
  Configurations.** Real pages, correctly out of Group 3.

### 3c. Deferrals whose *reason* needs amending (not reversing)

- **"Concur Receiving Roles" is duplicated across directories and only one copy is seeded.**
  `tools-guides/required-roles-ef2c2901.md` (2,711 B, SEED) carries a 6-row Concur Receiving roles
  table; its admin-guides twin `required-roles-ec6fae13.md` (996 B, SEED) carries **only the one
  sentence** and no table; and a *third* file `admin-guides/concur-receiving-roles-099f375f.md`
  (2,690 B) carries the same table again and is **not seeded**. The tools twin is 2.7× the admin twin
  — the roster records the two-directory role gate but not that the directories disagree on content.

---

## 4. NEW EXPERIENCE TWINS — complete census, with byte counts and a superset proof

`find` over both guide dirs for `*new-experience*` and `grep -rl "^title:.*New Experience"` both
return the **same 5 files corpus-wide**:

| file | bytes | PO? |
|---|---:|---|
| `admin-guides/policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` | **15,800** | yes |
| `admin-guides/purchase-order-matching-rules-new-experience-6c8fb80f.md` | **4,804** | yes |
| `tools-guides/using-the-unassigned-invoice-page-new-experience-072e2f18.md` | 3,376 | no |
| `tools-guides/using-the-invoice-manager-page-new-experience-f83ba5fa.md` | 2,410 | no |
| `admin-guides/end-user-experience-new-experience-85c2652b.md` | 1,056 | no |

Legacy twins: `policies-the-purchase-order-policy-8b35454a.md` = **1,490 B** (10.6×);
`purchase-order-matching-rules-8b357dbb.md` = **2,404 B** (2.0×). Roster's counts confirmed.

**REPLACED or REVISED?** I diffed them rather than inferring.

- `diff` of `8b357dbb` vs `6c8fb80f` (body only): **identical except the title suffix, plus a pure
  append** of a `## Before You Begin` block. Not a replacement. **No legacy historical page node is
  warranted.**
- **But the New Experience twin is almost entirely redundant against the seed list already.** I split
  `6c8fb80f` into 15 paragraphs >60 chars and tested each against the concatenation of
  `{8b357dbb, test-and-change-match-rule-sets-49f57319, activate-exchange-rates-for-matching-rule-sets-c51af31c}`
  — **13 of 15 are verbatim substrings.** Exactly **one substantive paragraph is unique**: the
  *"Unlock a Matching Rule Set From Its In-Use Status"* procedure. The roster's "2.0× richer, BUILD
  FROM THIS" framing overstates the delta; the correct instruction is "seed all four and expect one
  unique procedure."
- **The two 'outstanding debt' files are ONE debt, not two.** `5a1ba7ef` (15,800 B) **strictly
  contains** `configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md` (10,109 B).
  Proof: 16 of f926eac7's 18 paragraphs are verbatim substrings of 5a1ba7ef (the 2 misses are its own
  H1 and its AI blurb), and all five HTML tables are byte-identical — 3/3/3/3/2 rows at
  1261/1314/1282/1295/1465 bytes in **both** files. The roster bills ~26 KB of Group 1/5 debt; the
  real unique payload is 15,800 B.
- **The variant is announced nowhere.** `grep -ril "new experience"` over **both release-note
  directories returns 0 files.** The only in-corpus dating is the PO Matching guide cover's
  Sept 19 2025 line. Record as undetermined.

---

## 5. RAW `<table>` SWEEP — 32 files corpus-wide, and the roster's `rawTableFiles: 0` is CORRECT

`grep -rl "<table" <both guide dirs> | wc -l` → **32**, exactly as briefed. PO-domain members:

| file | bytes | `<table` | owner |
|---|---:|---:|---|
| `admin-guides/policies-the-purchase-order-policy-new-experience-5a1ba7ef.md` | 15,800 | 5 | `page.policies` + `page.forms-and-fields` (G1/G5 debt) |
| `admin-guides/configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md` | 10,109 | 5 | `page.forms-and-fields` — **contained by the row above** |
| `admin-guides/invoice-settings-cace748d.md` | 4,901 | 1 | Workflows > Settings tab |
| `admin-guides/sample-record-type-*` (×15) | 1,058–3,108 | 1 ea | vendor / invoice **import samples**, not PO |

I also opened the one near-miss — `admin-guides/create-a-conditional-rule-in-the-editor-86a92887.md`
(2,278 B, 1 table) — because its title reads like the PO Matching condition editor. **It is Print
Condition Rules** ("Print Condition Rule Name", "Print Condition Rules List page"). Not PO. A future
sweep will trip on it; record it.

**Verification of the roster's own claim:** I ran `grep -c "<table"` on all **45** seed files across
both pages. **Zero hits on every one.** `rawTableFiles: 0` on both pages is confirmed, not asserted.

**Answer to the brief's question — "is every one attributed to a roster page's seedFiles?"** No, and
correctly so: no PO-domain raw-table file belongs to a Group 3 page. All three resolve to Group 1,
Group 5, or Workflows. That is the *finding*, and it is the strongest single justification for
`documentedBasis: moderate` on Page 2.

---

## 6. LONG CATALOG SWEEP — 50 catalogs in the PO domain, and NOT ONE is a Group 3 seed

I counted rows myself over all 350 PO-domain files (files mentioning purchase order / purchase
request / PO matching / receipt confirmation ≥1×), taking `max(markdown-cell-blocks, bullets, <tr>)`.
**50 files carry an enumeration of 10+ entries. Zero are Group 3 seeds.** Every one resolves elsewhere:

| rows | file | rightful owner |
|---:|---|---|
| 288 | `admin-guides/the-condition-page-5d4ea870.md` (11,176 B) | `page.audit-rules` (G2, built) — its own text: *"The Condition page in Audit Rules"* |
| 257 | `admin-guides/details-section-49500221.md` (29,059 B) | `page.forms-and-fields` field catalog |
| 224/216 | `tools-guides/the-query-builder-and-the-condition-editor-{e10473f9,af058a80}.md` | end-user PR/PO Processor — **the third condition builder** the roster warns about |
| 63/55 | `admin-guides/invoice-header-import-record-type-{310,300}-format-*.md` | import spec |
| 61 | `admin-guides/error-messages-3b8339b0.md` | Peppol supplier-invoice errors — the "Supplier Invoice Creation" phantom's only trace |
| 46 | `admin-guides/general-information-8b3b0308.md` | Workflows guide root |
| **36** | **`admin-guides/purchase-order-request-header-record-type-200-format-46f69dcc.md`** (6,965 B) | **PO Import spec — the largest PO-native catalog in the corpus, correctly not a page** |
| 30 | `admin-guides/concur-invoice-purchase-order-import-specification-8b443eee.md` | PO Import spec |
| 25 | `admin-guides/available-invoice-settings-8b3411f0.md` | **`page.invoice-settings` — 24 settings, 13 built. See §3a.** |
| 22 | `admin-guides/purchase-order-line-item-record-type-300-format-11a7a2be.md` | PO Import spec |
| 17 | `admin-guides/events-triggers-72339a13.md` | `page.audit-rules` — **7 of the 17 triggers are PO-domain** (Purchase Order Line Item Save, Purchase Order Save, Purchase Order Transmit, Purchase Request Distribution Save, Purchase Request Item Save, Purchase Request Save, Purchase Request Submit) |
| 12 | `admin-guides/events-triggers-7977f6ee.md` | Validation-rule variant, same page |
| 14/14 | `5a1ba7ef` / `f926eac7` | G1/G5 debt (§4) |

**TEXT TRAP FOUND WHILE DOING THIS — pass it on.** SAP indents markdown tables that sit inside
numbered steps, so **`grep -c "^| "` silently returns 0 on them.** `step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md`
scores 0 on `^|` and 21 on `^\s+\|`. Its Life to Date table (Gross Amount / Net Amount / Line Item
Total / Line Item Quantity / Match against Received Quantity / Line Item Tax) is a real 6-row catalog
that an anchored grep misses. I re-ran the whole sweep allowing indented pipes; the result above is
the corrected one. Any future census that anchors `^|` will under-count this corpus.

**Confirmed:** the largest enumeration in the entire Group 3 seed set is **6 entries** (Life to Date
rule types), not 7. `longCatalogs: 0` on Page 1 is right.

---

## 7. SEED QUALITY — six real gaps on Page 1, one on Page 2, one truncated file

I rebuilt each page's candidate set independently and sorted by bytes.

### Page 1 — Purchase Order Matching Rules (39 seeds claimed; the 45-file union is 99,657 B)

Candidate set = 81 files matching `match rule|matching rule|rule set|receipt confirmation|tolerance|confirmation type|life to date|two-way match|three-way match`. **Six admin-relevant files are not seeds — three of them from tools-guides:**

| bytes | file | why it belongs |
|---:|---|---|
| 2,528 | `tools-guides/understand-the-match-status-assigned-to-an-invoice-52477c6b.md` | **The 6-value Match Status catalog** — Matched / Does Not Match / Waiting for PO / Pending Match / Missing PO Number / No Match Required. This page's output. The roster seeds its 2,078-byte sibling `match-rules-and-match-status-8cc2c56b.md` and **not the file that holds the enumeration.** |
| 2,002 | `admin-guides/best-practices-129dae61.md` | Direct rule-set design guidance: *"Concur Invoice lets you use the rule set, tolerance, Submit action, and i[nstructional message]"*. Admin-guides, PO Matching guide, about configuring this page. |
| 1,773 | `admin-guides/is-receipt-required-value-on-po-line-item-896466e1.md` | The gate: *"Unless the Receipt Required field is set to Yes, no receipt confirmation logic configured in Concur Invoice will be evaluated for that line."* Without it the whole Receipt Confirmation branch is unconditioned. |
| 1,697 | `tools-guides/exceptions-and-three-way-matching-rules-65d52687.md` | Names the three-way rules — and carries **its own contradiction in one paragraph**: *"three purchase order matching rules are available. SAP Concur recommends that clients use **both** these rules"* then documents **one**. Three-vs-both-vs-one. |
| 1,687 | `tools-guides/receipt-association-and-three-way-matching-12b976a5.md` | GRN sequencing and DSN precedence; detail-level DSN is read-only and copies down from header. |
| 1,544 | `tools-guides/understanding-line-item-match-rule-application-7a56d0c5.md` | Sequence vs data-attribute line identification — decides whether Line Item rules can fire at all. |

Also worth adding: `admin-guides/delivery-slip-number-field-for-three-way-matching-b0d3f1ca.md`
(1,569 B), the standalone admin topic for the optional Three-Way step.

**Republication pair the roster missed:** `general-notes-ced8d7d0.md` (813 B) and the seeded
`not-possible-to-base-rule-set-on-expense-type-or-account-code-e98c9b2c.md` (1,179 B) are the same
constraint published twice. Harmless; note it so the build doesn't double-count.

**A SEED FILE IS TRUNCATED IN THE CORPUS.** `admin-guides/create-purchase-order-matching-rules-adb700f9.md`
(seed #9, 2,699 B) ends with a bare line `x`. It is the **only file corpus-wide** that does:
`grep -rl "^x$" <both guide dirs> | wc -l` → **1**. Something was dropped in the crawl, on a Group 3
seed. Flag it as a build risk; do not let an extractor treat the file as complete.

### Page 2 — Purchase Order Configuration (6 seeds, 14,837 B)

The seed list is the right six, but **one file from the other guide directory is missing** — and it is
exactly the shape the roster itself calls "the sweep-C save":

- `tools-guides/manage-images-03021850.md` (2,867 B) carries a section headed
  **"Support Images and the PO Configuration Supporting Documents Feature"**:
  *"The PO configuration associated with a Group may also include supporting documents. These
  documents apply to all PO transmissions performed by the PO Processor for that Group and are
  included alongside any documents added by the user."*
  This is the **only cross-directory corroboration of the Supporting Documents field and its Group
  scope**, and it is the only place the interaction between admin-uploaded and user-uploaded PO
  attachments is stated. Add as seed #7.

**Second unenumerated field list, unflagged.** The roster records the unenumerated Payment Request /
Purchase Order lists on Page 1 but not the identical gap on Page 2:
*"Fields to Appear on Purchase Orders — The header and line time fields you select will appear on the
purchase order."* (`configure-purchase-orders-8128725e.md`). The selectable header / line-item field
roster is never enumerated. Mark it unenumerated. (And note SAP's typo **"line time"** for "line
item" — another text trap.)

**Richness correction.** `configure-purchase-orders-8128725e.md` scores
`grep -c "^| "` = **0**, `grep -c "^-   "` = **0**, `grep -c "<table"` = **0**. Its "12-entry catalog"
is **12 prose section headings**, not an enumeration. `longCatalogs: 1` overstates it. The
cheap-tier argument for Page 2 rests on that number and should rest instead on the fact that each of
the 12 sections carries a stated limit.

### Contradiction the roster does not record — and it is on the most-used control

`step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md` step 6 lists **FOUR** tolerance
choices under *"Choose one tolerance:"* — **None / Within (+/-) / Custom / Currency**.
`configure-three-way-matching-c043e5c8.md` step 4 says *"in the Tolerance section, select **None,
Within, or Custom**, and then select Value or Percentage"* — **three**. The lost build recorded three
(`Tolerance → None / Within / Custom`). Two seed files, two value sets, on the control every matching
rule uses. Preserve, do not reconcile.

### The click tree is missing a fifth dialog

`configure-three-way-matching-c043e5c8.md` steps 5 and 10, verbatim:
*"Exception Message: Click Change and add a message by clicking New, or edit an existing message by
selecting it and clicking Edit, then click Save."* That is a message-list dialog with New / Edit /
Save reached from the Rule Group rules window. The roster's DOCUMENTED CLICK TREE lists four dialogs
and omits it. A driver that must set an exception message cannot get there.

### Grounding — I re-verified all 21 roster sourceQuotes

Every one returns `grep -F -c` ≥ 1 against its cited file. No grounding defects.

---

## 8. THE SPLIT — "do not split" holds, but the run is no longer 2 pages

I verified the split rule's two triggers directly:

- **Shared sources:** the two seed lists intersect in **zero files** (39 + 6, no overlap). The
  "two runs read the same long catalog twice" hazard cannot occur.
- **Long catalogs to protect:** **none** — §6 proves not one 10+-entry catalog in the PO domain is
  owned by either page.

So: **do not split 3A/3B.** But the roster's cost model is now wrong in one direction. Per §3a, the
run must also carry a **patch pass onto two completed pages** (`page.invoice-settings`: 11 missing
settings of which 4 PO-domain; `page.forms-and-fields`: Multiple PO activation, Delivery Slip Number,
Receipt Type, 10 custom receipt-of-goods fields). Declare the run as **2 new pages + 2 patch targets**,
merge the patch targets with `--patch`, and **sequence the patch last** so a failure there cannot
corrupt the two new pages. The Group 1/5 New Experience debt (§4) is the *same* patch pass — one file,
15,800 B, not two files at 26 KB.

Order within the run is right as written: Purchase Order Matching Rules first (5.7× the bytes, the
whole contradiction load, and its rule set is what the Policies edge consumes), then Purchase Order
Configuration.

---

## 9. UNDETERMINED BY THE DOCUMENTATION — ranked

These are properties of the 2026_08 corpus. None is a to-do against a tenant.

1. **The `Invoice Processing Admin` middle node.** 27 occurrences name 11 pages (Policies, Workflows,
   Invoice Settings, Group Configurations, Forms and Fields, Routing Configuration, Exceptions,
   Expense Types, Change Log, Email Reminders, Peppol Configuration) and **never a PO page**. Every
   PO click path is the literal three-segment `Administration > Invoice > <page>`. Groups 1/2/5 put
   the node in `navPath`. The corpus cannot say whether that is a UI fact or a doc gap. **Record the
   literal path; do not normalise.**
2. **Tolerance is 3 or 4 values** (§7). No arbiter.
3. **Three spellings of one level value** — `Line Item – Receipt` (en dash, 3 files),
   `Line Item - Receipt` (spaced hyphen, step-3), `Line Item-Receipt` (lost build / handoff). No authority.
4. **`Match Level` vs `Level`** — the lost build's label has zero corpus support (§2). Carry both.
5. **tool vs window vs page for Purchase Order Configuration.** `"Purchase Order Configuration page"`
   = 0 corpus-wide; `(left menu)` = 0; "tool" every time; "window" once, in a revision-history line.
6. **Is `Purchase Order Matching Set` edit-mode-in-place or a modal?** `edit-…-604d1e31.md` uses the
   label for the list *and* for what Edit opens, two steps apart. Alias verdict is right; the modality
   is genuinely undetermined and it matters to a driver.
7. **Whether "New Experience" is a UI variant at all.** Zero hits for `new experience` across **both**
   release-note directories. The only in-corpus dating is one guide-cover revision line.
8. **A Group 3 seed is truncated** — `create-purchase-order-matching-rules-adb700f9.md` ends in a bare
   `x`; unique corpus-wide (§7). Unknown how much was lost.
9. **Where the unenumerated field lists come from.** Both pages have one — Page 1's Payment
   Request / Purchase Order lists (*"As different levels are chosen in Level, different field sets
   will populate…"*), Page 2's *Fields to Appear on Purchase Orders*. Neither is ever enumerated
   anywhere in the corpus.
10. **Activation authority for Multiple PO.** `5a1ba7ef` / `84e92edd` say the admin adds the field in
    Forms and Fields; `tools-guides/enabling-and-disabling-line-item-level-po-ef3f19cd.md` says it is
    *"activated by SAP Concur staff"*. Two topics, two authorities.

### Hand-overs to other groups (found here, not Group 3's to build)

- **Workflows:** `admin-guides/work-with-purchase-requests-approvals-1c39ee21.md` — *"On the Purchase
  Request tab, click New. **The Report Status window appears.**"* A window named *Report Status* on a
  *Purchase Request* tab. Mis-labelled surface; the Workflows build will need the string.
- **Audit Rules (G2, built):** 7 PO-domain event triggers in `events-triggers-72339a13.md` (§6).
- **Group 5:** `configuring-header-and-item-level-data-to-copy-from-pr-to-po-45788d92.md` places
  PR→PO copy-down in the **Connected List Definition window** — a copy-down *direction* the roster
  never mentions (it knows only PO→PR).
