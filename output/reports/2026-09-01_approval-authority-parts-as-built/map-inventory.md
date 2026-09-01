# MAP / FILE INVENTORY — page `authorized-approval-limits` ("Authorized Approval Limits")

Corpus root: `/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE`
Guide dirs swept with equal weight: `concur-invoice-professional-edition-admin-guides` (1209 files),
`concur-invoice-professional-edition-tools-guides` (650 files). Release-note dirs swept once, for
dating only (result below: they contribute nothing).
Date of sweep: 2026-09-01. Corpus version 2026_08, crawled 2026-08-29.

---

## 0. HEADLINE FINDINGS THE EXTRACTORS MUST CARRY FORWARD

**F1 — THE PAGE HAS ONLY TWO ATTESTING TOPICS, AND THEY BELONG TO TWO DIFFERENT GUIDES.**
`grep -rliF "Authorized Approval Limits"` over BOTH guide dirs returns exactly two files:
`user-administrator-fcfd570c.md` and `user-administration-8b167b96.md`. Nothing else in the corpus —
including all four directories — names this window. But those two topics sit in different guide
threads, and that single fact explains almost every contradiction on this page:

| | fcfd570c ("User Administrator") | 8b167b96 ("User Administration") |
|---|---|---|
| guide thread | **Authorized Approvers** (rev-history root `authorized-approvers-8b3c26cc.md`) | **Cost Object Approval** (rev-history root `cost-object-approval-8b3d1e0f.md`) |
| gate sentence | "If the Authorized Approver feature is activated and the company's Authorized Approver hierarchy has at least one level (in addition to Global)" | "When the **Cost Object Approver feature** is activated, the Authorized Approval Limits link appears..." |
| its Step 4 sibling | `step-4-assign-the-proper-rights-to-users-86389a18.md` | `step-4-assign-the-proper-rights-to-users-82481079.md` |
| its Configuration sibling | `configuration-8b3be88b.md` | `configuration-8b3cce3f.md` |
| Level control | absent | present ("For level-based cost object approval, select a level.") |

Verified: `grep -c -F "When the Cost Object Approver feature is activated, the Authorized Approval Limits link appears in the Expense and Invoices Settings section in User Administration."` → 1 on 8b167b96.
`grep -rlF "Cost Object Approver feature"` → `configuration-8b3cce3f.md`, `user-administration-8b167b96.md` (2 files only).

CONSEQUENCE: **two features are documented as surfacing a link with the SAME name in the SAME
section.** The window described by 8b167b96 is the Cost-Object-Approver rendering; the window
described by fcfd570c is the Authorized-Approver rendering. This is *stronger* corroboration of
brief item (C)'s hypothesis than the brief itself claims — the contested Level field is not a
labelling accident, it is a different feature's window. RECORD BOTH GATE SENTENCES. Do NOT
reconcile them into one condition.

**F2 — THE TWO "Step 4: Assign the Proper Rights to Users" TOPICS ARE NOT A REPUBLISH PAIR.**
Distinct loios (`86389a180d6d405083a199bd8e46a5ab` vs `824810795dee4b2085bbe0ca1269b156`) and
materially different bodies. 86389a18 lists "Authorized Approver List / employee import / User
Administration"; 82481079 lists "The employee import / User Admin / The Authorized Approvers tab in
Workflows" — note 82481079 writes **"User Admin"**, a fourth label variant for the host page.
Neither is consumed by the built graph.

**F3 — A SIXTH ATTESTATION OF THE THREE-SETTER CLAIM, NOT IN THE SEED LIST.**
`understand-the-process-3966259c.md` (2 hits): "Activate the feature. (Then define the actual limit
– per approver – using the Authorized Approver List, the employee import, or User Administration.)"
and "define the actual limit—per approver—by using the Authorized Approver List, the employee
import, or User Administration." The brief named five corroborations (8b3be88b, 86389a18, 82481079,
8b3c119a, 8b3c5273); this is a sixth, from a guide-thread the seeds missed. The three-setter verdict
is therefore corpus-stated six times over.

**F4 — `user-administrator-fcfd570c.md` IS ALREADY PARTIALLY CONSUMED BY THE BUILT GRAPH, AND WHAT
CONSUMED IT CARRIES THE NOW-REVERSED SCOPE CLAIM.** Checked with python3 against
`/mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-invoice-config.json` (22 pages /
607 fields). Three existing nodes cite it:
  * `dep.gworkflows.060` — source `field.feature-hierarchies.level`, targetRef `{page:"User
    Administration", field:"Authorized Approval Limits", resolved:false}`, sourceQuote "then the
    Authorized Approval Limits link appears in the Expense and Invoices Setting section". Its
    `condition` text says verbatim: *"Administration > Company > Company Admin > User Administration
    is out of scope for this graph by the 2026-08-31 decision, and the Authorized Approval Limits
    window is real and documented but is not a page to build."* **That sentence is now false.**
    This dependency is a FORWARD REFERENCE THAT THIS RUN RESOLVES. Flag it for repair (retarget to
    the new page; rewrite the stale condition prose). Do not leave it asserting the reversed call.
  * `vset.gworkflows.unnamed.two-further-named-feature-hierarchies-attested-in-the-corpus` — notes
    say "user-administrator-fcfd570c.md sits under Administration > Company > User Administration,
    which is out of scope for this graph." Same stale claim.
  * `vset.gworkflows.unnamed.the-four-configuration-steps-for-authorized-approvers-and-wh` (cites
    `8a960238`) — notes say "User Administration sits under Administration > Company, which is out
    of scope for this whole graph and must stay an unresolved forward reference." Same stale claim.
  None of the three mines a *field* from fcfd570c, so no field on this page is a re-home. But the
  merge must not leave three nodes asserting the reversed scope decision.
  `8a960238` is likewise cited only inside a Workflows configStep rationale and that value set —
  never as a field source. Both files are therefore still legitimate mustReads here.

**F5 — SECTION LABEL DRIFT IS WORSE THAN THE BRIEF STATES, AND ONE FILE DRIFTS INTERNALLY.**
Measured counts (`grep -rlF`, both guide dirs):
  * "Expense and Invoices Setting section" → **1 file** (fcfd570c) — the branch-attached form.
  * "Expense and Invoices Settings section" → **1 file** (8b167b96).
  * "Expense and Invoice Settings" → **6 files**, not the 4 the brief predicted. The two extra are
    tools-guides: `step-4-add-the-custom-field-to-the-employee-form-da376eef.md` and
    `step-6-select-the-vendor-access-group-for-the-user-bb58ded2.md`. This is the corpus-MAJORITY
    form and the one a driver should search for first.
  * `user-administration-8b167b96.md` uses BOTH: "Expense and Invoice Settings" in its summary
    paragraph (line 21) and "Expense and Invoices Settings section" in the procedure (line 43).
    The drift is intra-file, not just cross-file.

**F6 — A FOURTH CLICK-PATH RENDERING, WITH THE ">" GLYPHS STRIPPED BY THE CRAWL.**
`assigning-the-approver-for-the-purchase-request-user-20294611.md:27` reads (double spaces, no
angle brackets — copy bytes, never retype): `Administration  Company Administration  User
Administration (Search & Select)  Expense and Invoice Settings  Approvers.` Note "Company
**Administration**", not "Company Admin". Four distinct renderings of the host path exist:
  1. `Administration > Company > Company Admin > User Administration` (fcfd570c ×2)
  2. `Administration > User Administration` (fcfd570c line 23, parenthetical)
  3. `User Administration` bare (8b167b96 throughout — it never gives a full path)
  4. `Administration  Company Administration  User Administration (Search & Select)` (20294611)
  A fifth, `Administration > User Administration`, also appears in `f772bed1`. Record all of them as
  navPathAlternates; the driver needs the whole set.

**F7 — RELEASE NOTES CONTRIBUTE NOTHING.** `grep -rliF "Authorized Approval Limits" .` across all
FOUR directories returns only the two admin-guides primaries. There is no release-note dating and no
UI-variant corroboration to be had. `uiVariant = "undifferentiated"` re-confirmed independently:
8 `*-new-experience-*` / `*legacy*` / `*classic*` files exist corpus-wide; none is in the candidate
set, and piping the two AAL files through `grep -ilE "new experience|legacy|classic"` returns zero.

**F8 — THE ZERO/NULL SEMANTICS HAVE A THIRD, DATED ATTESTATION IN A REVISION HISTORY.**
`authorized-approvers-8b3c26cc.md` (April 22, 2017 row): "...identify a zero amount for an approver
who may be included in the AA or COA approval chain but may not authorize an amount above zero.
This is typically used for a manager who wishes to see/approve the report but does not have any
signing authority for any amount in the cost center. **An unlimited approval amount is only for a
NULL value.**" (grep -F verified, 1 hit). `cost-object-approval-8b3d1e0f.md` dates the same change
in its own revision history: "Added a note about unlimited approval amount in the _To assign the
proper rights_ procedure." (April 22, 2017). These are DATING evidence and a corroborating quote —
they are revision-history tables, not field tables. **Never mine a field from either.**

**F9 — CONFIRMED NEGATIVE, per brief item (D): no "Approver" control on this page.** Neither
primary names an Approver picker anywhere. `grep -rlF "New Authorized Approver"` → a9522ec8 and
d8bf669c only, both Workflows-path topics. `grep -rlF "Modify Authorized Approver"` → d8bf669c only.
The record context is arrived at by search — 20294611 "User Administration (Search & Select)",
f772bed1 "With the user loaded in the form". Do NOT emit an Approver field.

---

## 1. FILENAME SWEEP — BOTH GUIDE DIRECTORIES

Terms swept as filename substrings (`find … -iname "*<t>*"`, both dirs, maxdepth 1):
`approval-limit` (0 hits), `approver` (43), `authorized` (14), `user-admin` (5),
`user-administration` (1), `user-administrator` (2), `limit` (15), `signing` (12 — all false
positives, "assigning-*"), `hierarchy` (24), `employee-import` (4), `global-group` (1),
`cost-object` (13).

Notable: **`approval-limit` returns ZERO filenames.** No topic in this corpus is titled after the
control. Every field on this page must be recovered from prose inside topics named after the
*surface* (user-administrator / user-administration) or the *feature* (authorized-approvers /
cost-object-approval). That is why a filename-only recon misses this page entirely.

## 2. CONTENT SWEEP — BOTH GUIDE DIRECTORIES

Seed terms (file counts, `grep -rliF`, both dirs). Where the brief predicted a count, agreement is
noted; disagreement is flagged.

| term | files | vs brief |
|---|---|---|
| `Authorized Approval Limits` | 2 | matches (2) |
| `Manager Approval Limit` | 1 | matches (1) — SINGLE-SOURCED, branch A |
| `Approval Limit Currency` | 3 | matches (3) |
| `Can approve exception` | 2 | matches (2) |
| `Expense and Invoices Setting` | 2 | matches (2) |
| `User Admin rights` | 1 | matches (1) |
| `limit approval` | 15 | matches (15) |
| `limit-based` | 12 | matches (12) |
| `level-based cost object` | 3 | matches (3) |
| `Limit Approved` | 9 | matches (9) |
| `Approval Limit` | **22** | seed list named 5 — beaten 4× |
| `authorized approver` | **59** | not in seed list |
| `User Administration` | **42** | not in seed list |
| `Company Admin` | 53 | 34 are boilerplate `permissions-*.md` topics — ruled out, §5 |
| `Administration > Company` | 5 | only fcfd570c is page-relevant |
| `Expense and Invoice Settings` | **6** | brief predicted 4 |
| `unlimited approval` | 5 | — |
| `signing authority` | 6 | — |
| `exception limit` | 4 | — |
| `Global group` | 30 | mostly vendor-group topics — ruled out |
| `hierarchy level` | 10 | mostly account-code topics — ruled out |
| `approval amount` | 4 | — |
| `Cost Object Approver feature` | **2** | not in seed list — decides F1 |
| `COA approval chain` | 2 | not in seed list |
| `Authorized Approval Limits window` | 2 | — |
| `Invoice User Administration` | 1 | matches (1) |
| `record type 720` | 1 | d8bf669c |
| `710 Cost Object Approver` | 1 | e28f2294 |
| `New Authorized Approver` | 2 | both Workflows-path |
| `Modify Authorized Approver` | 1 | Workflows-path |

## 3. RAW `<table>` CENSUS — **AND THE ZERO IS THE FINDING**

Measured on every candidate with `grep -c "<table"`, `grep -o "<tr" | wc -l` (never `grep -c "<tr"`,
per the documented row-count trap), and `grep -cP '^\s*\|'` (leading whitespace allowed, per the
indented-table trap).

**BOTH PRIMARIES RETURN ZERO ON EVERY MEASURE:**

| file | bytes | `<table` | `<tr` (-o) | md rows | lines |
|---|---|---|---|---|---|
| user-administrator-fcfd570c.md | 4603 | **0** | **0** | **0** | 77 |
| user-administration-8b167b96.md | 2314 | **0** | **0** | **0** | 54 |

Every field on this page lives in procedure prose. Confirmed as predicted.

Full census across the candidate set (files with any structure, plus the notable zeros):

| file | bytes | `<table` | `<tr` (-o) | md rows |
|---|---|---|---|---|
| filter-authorized-approvers-by-workflow-approval-step-aae69350.md | 6234 | **1** | **3** | 21 |
| additional-approver-situations-fbb5034c.md | 8664 | **1** | **7** | 0 |
| global-group-vs-authorized-approver-hierarchy-8a960238.md | 2247 | 0 | 0 | 25 |
| authorized-approver-list-a9522ec8.md | 3773 | 0 | 0 | 16 |
| employee-import-e28f2294.md | 1763 | 0 | 0 | 19 |
| procedure-2d20b513.md | 1554 | 0 | 0 | 10 |
| authorized-approvers-8b3c26cc.md | 3067 | 0 | 0 | **64** |
| cost-object-approval-8b3d1e0f.md | 4040 | 0 | 0 | **85** |
| step-4-…-86389a18.md | 1521 | 0 | 0 | 0 |
| step-4-…-82481079.md | 1107 | 0 | 0 | 0 |
| step-2-assign-the-level-to-the-approver-d8bf669c.md | 1751 | 0 | 0 | 0 |
| edit-authorized-approver-information-8b3c119a.md | 1499 | 0 | 0 | 0 |
| remove-authorized-approvers-8b3c5273.md | 1859 | 0 | 0 | 0 |
| level-based-approvals-and-limit-based-approvals-b335cf33.md | 1767 | 0 | 0 | 0 |
| configuration-8b3be88b.md | 1213 | 0 | 0 | 0 |
| configuration-8b3cce3f.md | 1393 | 0 | 0 | 0 |
| definition-of-amount-for-limit-approval-06806875.md | 2038 | 0 | 0 | 0 |
| setting-an-unlimited-approval-amount-9d98b489.md | 988 | 0 | 0 | 0 |
| user-administrator-5aa3eb5e.md | 1432 | 0 | 0 | 0 |
| understand-the-process-3966259c.md | 1553 | 0 | 0 | 0 |
| authorized-approvers-overview-8b3bd2d0.md | 2059 | 0 | 0 | 0 |
| assigning-the-approver-…-20294611.md | 1355 | 0 | 0 | 0 |
| fields-overview-5e3daf7c.md | 2077 | 0 | 0 | 0 |
| approval-status-flags-4f534f16.md | 1830 | 0 | 0 | 0 |
| how-the-system-determines-…-1c83d905.md | 3698 | 0 | 0 | 0 |
| tools/workflow-and-approval-routing-8b4ff6c9.md | 1502 | 0 | 0 | 0 |
| tools/how-single-step-approval-workflow-works-40145f24.md | 2419 | 0 | 0 | 0 |
| tools/before-you-begin-3c458d83.md | 972 | 0 | 0 | 0 |
| tools/combine-invoice-roles-for-invoice-tasks-ea319cdd.md | 1747 | 0 | 0 | 0 |
| authorized-approvers-8b3ab7ad.md | 1853 | 0 | 0 | 0 |
| step-1-define-the-invoice-authorized-approver-hierarchy-fed7c7fe.md | 985 | 0 | 0 | 0 |
| step-2-activate-the-authorized-approver-feature-c87493ee.md | 939 | 0 | 0 | 0 |
| step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md | 1289 | 0 | 0 | 0 |
| configure-the-level-filter-8b3bfd21.md | 979 | 0 | 0 | 0 |
| employee-import-6954b441.md | 923 | 0 | 0 | 0 |
| employee-import-f6a516c8.md | 1235 | 0 | 0 | 0 |
| required-roles-for-setup-ef627f4b.md | 1315 | 0 | 0 | 0 |
| approver-terminology-8559861c.md | 6899 | 0 | 0 | 0 |
| overview-5ce8a567.md | 2203 | 0 | 0 | 0 |
| how-limit-based-cost-object-approvals-work-8b3d0a3b.md | 1253 | 0 | 0 | 0 |
| how-level-based-cost-object-approvals-work-8b3cf6b4.md | 1117 | 0 | 0 | 0 |
| set-a-default-shipping-and-billing-address-f772bed1.md | 4286 | 0 | 0 | 0 |

## 4. LONG CATALOG CENSUS (≈10+ entries)

**None of the four catalogs below sits on a primary.** The primaries carry zero catalogs, as
expected. All four are in the wider candidate set:

| file | enumerates | ≈rows | shape | use |
|---|---|---|---|---|
| `global-group-vs-authorized-approver-hierarchy-8a960238.md` | 4-step config matrix × 2 deployment shapes (# / Step / Global group only / Authorized Approver hierarchy) | 25 pipe rows (4 data steps) | markdown pipe | **DECIDES PAGE IDENTITY** — step 4 marks User Administration under BOTH columns. Already carried in the graph as an unwired Workflows value set (knownGap). |
| `authorized-approver-list-a9522ec8.md` | New Authorized Approver field table (Approver / Can approve exception / Approval Limit / Level) | 16 pipe rows (4 fields) | markdown pipe | **SIBLING SURFACE, ALREADY MINED BY WORKFLOWS (6 nodes).** Boundary evidence only. |
| `employee-import-e28f2294.md` | 710 Cost Object Approver record-set fields #15 Approval Limit, #16 Approval Limit Currency Code, with Definition / Req? / Description | 19 pipe rows (2 fields) | markdown pipe | **ONLY documented value domains for the amount/currency pair.** Cite for value domains + notes; never emit an employee-import field. |
| `filter-authorized-approvers-by-workflow-approval-step-aae69350.md` | (a) 3-row raw `<table>` workflow-step/level example; (b) 6-name approver→level example table | `<tr` -o = 3; 21 pipe rows | raw HTML + markdown | Example/illustrative data, NOT a value catalog. Its VALUE here is the flat contradiction sentence. |

Two further long tables in the candidate set are **REVISION HISTORIES — catalogued so nobody
re-discovers them as "missed value tables"**, and explicitly NOT field sources:

| file | enumerates | ≈rows |
|---|---|---|
| `authorized-approvers-8b3c26cc.md` | Authorized Approvers guide revision history (Date / Notes) | 20 dated rows (64 pipe lines) |
| `cost-object-approval-8b3d1e0f.md` | Cost Object Approval guide revision history (Date / Notes) | ~27 dated rows (85 pipe lines) |

`additional-approver-situations-fbb5034c.md` carries a 7-`<tr` raw `<table>` of six example
approvers with limits/departments. **Example data, not a documented option list.** Its real value is
the "walking up the hierarchy" runtime-behaviour prose. Do not promote its cells to validValues.

## 5. RULED OUT, AND WHY

* **34 `permissions-*.md` files** (admin) + **17** (tools) matched "Company Admin". They are a
  boilerplate permissions boilerplate block repeated across guides; none names Authorized Approval
  Limits, the Manager Approval Limit, or the Approval Limit Currency. Excluded wholesale.
* `user-administrator-5aa3eb5e.md` — **TITLE COLLISION**, distinct loio
  (`5aa3eb5e4dd844208e0c2bc1888b7d0c`). Same title "User Administrator" as the primary, but documents
  the Invoice Delegates / Purchase Request Delegates links. NOT a UI variant, NOT a republish. Kept
  in alsoRelevant purely as identityNotes evidence: User Administration hosts several independent
  links, so THIS page is the Authorized Approval Limits link and its window, not the User
  Administration tool. **Delegate Configurations is WORKFLOWS RUN B — do not build it here.**
* `e-bunsho-timestamp-092c1c08.md`, `scan-configuration-…-51c9d888.md`,
  `step-2-assign-the-tax-administrator-role-b903b7c8.md`, `view-validation-status-98f82b1e.md` —
  matched "Administration > Company" but concern unrelated Company-admin surfaces.
* `import-limits-d1b4e727.md`, `limit-vendors-available-to-the-ap-user-role-dd8bbfe1.md`,
  `limit-match-vendors-…-e0b41037.md`, `limitations-f5fac4b5.md`, all `delimiters-*.md` — filename
  "limit" false positives.
* All `assigning-*` files matched by "signing" — substring false positives.
* Account-code / ledger hierarchy topics (`account-code-hierarchy-869f7eca.md`,
  `adding-a-new-account-code-hierarchy-level-d3074f8c.md`,
  `ledger-and-account-code-hierarchy-levels-73c7c458.md`, `levels-of-account-codes-8e2fcbe1.md`,
  `global-level-a53bf756.md`, `step-3-account-codes-procedures-eb2f2f80.md`) — matched
  "hierarchy level" but belong to Accounting Administration, already built (Group 5).
* Vendor-group topics matched by "Global group" (tools-guides `overview-8b514cc1`, `8b51f1c4`,
  `8b52c8d3`, `plan-your-vendor-access-group-…-fc578356`, etc.) — Vendor Search Admin domain, built.
* `create-a-new-invoice-delegate-configuration-fcf42662.md` — Delegate Configurations, **NOT BUILT,
  WORKFLOWS RUN B**. Matched "Approval Limit" and "User Administration"; leave it for run B.
* Release-note and release-note-summary directories: zero hits for "Authorized Approval Limits".
  Nothing to date or corroborate from. Not cited anywhere.

## 6. VERBATIM VERIFICATION ALREADY PERFORMED (extractors: still re-verify with `grep -F -c`)

All confirmed at count 1 on the named file:

* fcfd570c: `The Authorized Approval Limits window appears.` ·
  `the user must have the User Admin rights and the Invoice User Administration rights` ·
  `In addition, the employee must be an approver.` ·
  `This method is used only for limit-based authorized approvers. It cannot be used for exception-based authorized approvers.` ·
  `the Manager Approval Limit field and the Approval Limit Currency list appear` ·
  `You can enter 0 in the Manager Approval Limit field.` · `You can enter 0 in the Amount field.` ·
  `On the left side, the administrator selects the appropriate level in the hierarchy.` ·
  `the administrator selects the Can approve exception check box.` ·
  `For limit approvers, the administrator selects the desired currency and enters the amount.`
* 8b167b96: `The Authorized Approval Limits window appears.` ·
  `For an unlimited approval amount, leave blank (null).` ·
  `For level-based cost object approval, select a level.` ·
  `For limit-based cost object approval, select a currency and enter an amount.` ·
  `On the left side, select the appropriate level in the hierarchy.` ·
  `When the Cost Object Approver feature is activated, the Authorized Approval Limits link appears in the Expense and Invoices Settings section in User Administration.`
* aae69350: `Levels cannot be added to approvers via User Administration.` ·
  `The levels can be added to users via the Employee Import or the Authorized Approver list`
* 8b3c26cc: `An unlimited approval amount is only for a NULL value.`

**BYTE TRAPS — CONFIRMED BY MEASUREMENT, extract with `sed`/`awk`, never retype:**
1. **Typo:** 8b167b96 has `needs to have at least on level` (count 1); the corrected-English
   `needs to have at least one level` returns **0**.
2. **Apostrophes differ across the two primaries:** 8b167b96 uses CURLY U+2019
   (`company’s Authorized Approver hierarchy` → 1; ASCII → 0); fcfd570c uses ASCII
   (`company's Authorized Approver hierarchy` → 1; curly → 0). Never carry an apostrophe between them.
3. **Em dashes:** the precedence sentence on 8b167b96 line 54 contains three U+2014 (verified with
   `cat -A` → `M-bM-^@M-^T`). ASCII hyphens return 0.
4. **Stripped `>` glyphs:** 20294611's nav path uses double spaces where `>` should be.
5. fcfd570c's zero-note also contains an en dash (`processor – depending`) — same class of hazard.

## 7. RANKED READING LIST

### mustRead (will be checked for citation)

1. `concur-invoice-professional-edition-admin-guides/user-administrator-fcfd570c.md` (4603 B, 77 L,
   0 raw tables) — **THE PRIMARY.** Click path ×2 renderings, three-part role gate, BOTH branch
   renderings (A: Global-group-only inline check box → Manager Approval Limit + Approval Limit
   Currency, limit-only; B: the link → the window → hierarchy level selector, Can approve exception,
   currency + Amount), the 0-semantics against the Manager Approval Limit label AND the Amount
   label, and the exception scope fence "(The actual exception levels apply to all authorized
   approvers and are defined on the Authorized Approvers tab in Workflows.)".
2. `concur-invoice-professional-edition-admin-guides/user-administration-8b167b96.md` (2314 B, 54 L,
   0 raw tables) — the second attestation, the **Cost Object Approver** gate sentence, the Level
   control, the null=unlimited / zero=no-signing-authority pair, and the ONLY source of the
   precedence rule. Carries three separate byte traps.
3. `concur-invoice-professional-edition-admin-guides/global-group-vs-authorized-approver-hierarchy-8a960238.md`
   (2247 B, 25 pipe rows) — decides ONE-PAGE-vs-TWO: step 4 marks User Administration X under BOTH
   deployment columns. Already in the graph only as a Workflows step rationale + an unwired value
   set; no field is homed from it, so it is free to be read here.
4. `concur-invoice-professional-edition-admin-guides/filter-authorized-approvers-by-workflow-approval-step-aae69350.md`
   (6234 B, 1 raw `<table>`, 3 `<tr` by -o, 21 pipe rows) — the flat contradiction of 8b167b96's
   Level control. Emit as an unresolved contradiction, never a resolution. Also names the alternate
   routes (Employee Import, Authorized Approver list) and the Workflows nav path in parentheses.
5. `concur-invoice-professional-edition-admin-guides/step-4-assign-the-proper-rights-to-users-86389a18.md`
   (1521 B) — "three ways to enter and define authorized approvers" + the decisive "Regardless of how
   the authorized approvers are entered into Invoice, they all appear in the Authorized Approver
   List." This is the sentence that justifies emitting this window's controls as real fields with
   named Workflows siblings.
6. `concur-invoice-professional-edition-admin-guides/step-4-assign-the-proper-rights-to-users-82481079.md`
   (1107 B) — the COA-thread twin (F2). Adds the "User Admin" label variant and lists the setters in
   a different order/wording.
7. `concur-invoice-professional-edition-admin-guides/employee-import-e28f2294.md` (1763 B, 19 pipe
   rows) — record set 710; the ONLY documented value domains for the amount/currency pair
   ("Numeric"; "Specified in the approval limit currency. If used, then Approval Limit Currency Code
   below is required."; "3 characters"; "must be a valid currency in the list of system
   (reimbursement) currencies"). Value domains + notes ONLY — never an employee-import field.
8. `concur-invoice-professional-edition-admin-guides/step-2-assign-the-level-to-the-approver-d8bf669c.md`
   (1751 B) — record type 720, Authorized Approver Hierarchy Level. The OTHER side of the Level
   split (720 vs 710). NOTE: already cited once by `field.workflows.authorized-approver-level` and
   `dep.gworkflows.017` — read it for the 720-vs-710 distinction; do not re-home its Level field.
9. `concur-invoice-professional-edition-admin-guides/configuration-8b3be88b.md` (1213 B) — the
   three-setter sentence ("The amount is set for each approver in the Authorized Approver List, in
   User Administration, or in the employee import.") and the tenant-wide exception-range fence.
   NOTE: already cited once by `field.workflows.maximum-exception-level`; read for boundary prose,
   do not re-home.
10. `concur-invoice-professional-edition-admin-guides/configuration-8b3cce3f.md` (1393 B) — **NEW,
    not in the seed list.** The Cost Object Approver 4-step configuration whose Step 4 is 82481079.
    Second of the two files naming "Cost Object Approver feature". Underwrites F1.
11. `concur-invoice-professional-edition-admin-guides/understand-the-process-3966259c.md` (1553 B) —
    **NEW, not in the seed list.** Sixth attestation of the three-setter claim (F3), from the
    Authorized Approver activation topic.
12. `concur-invoice-professional-edition-admin-guides/setting-an-unlimited-approval-amount-9d98b489.md`
    (988 B) — surface-agnostic null=unlimited. Note it is ALREADY cited in the notes of the built
    `field.workflows.authorized-approver-approval-limit`, so its semantics are NOT new information;
    any record emitted here must justify itself on the different LABEL and SURFACE, not the semantics.
13. `concur-invoice-professional-edition-admin-guides/edit-authorized-approver-information-8b3c119a.md`
    (1499 B) — edit takes effect immediately on save; in-flight invoices re-evaluated. Names all
    three setter surfaces. Behavioural dependency for a driver.
14. `concur-invoice-professional-edition-admin-guides/remove-authorized-approvers-8b3c5273.md`
    (1859 B) — removal semantics (does not delete the Invoice approver role); names all three setter
    surfaces. Behavioural dependency.
15. `concur-invoice-professional-edition-admin-guides/level-based-approvals-and-limit-based-approvals-b335cf33.md`
    (1767 B) — defines the Level/Limit dichotomy the precedence rule arbitrates, and equates limit
    with "signing authority". Needed to write the precedence dependency intelligibly.
16. `concur-invoice-professional-edition-admin-guides/assigning-the-approver-for-the-purchase-request-user-20294611.md`
    (1355 B) — **NEW as a nav source.** The fourth click-path rendering (F6) and the "(Search &
    Select)" record-context evidence that underwrites the confirmed-negative on "Approver" (F9).
17. `concur-invoice-professional-edition-tools-guides/workflow-and-approval-routing-8b4ff6c9.md`
    (1502 B) — **THE SCOPE SENTENCE.** "All workflow options available for non-PO policies are also
    available to a PO-based invoice policy. This includes options such as workflow rules and
    Authorized Approvers." The only tools-guides mustRead. Frames identityNotes.

### alsoRelevant

**ALREADY-MINED-BY-WORKFLOWS — boundary evidence only, NEVER a sourceFile for a field here:**
* `admin-guides/authorized-approver-list-a9522ec8.md` — **ALREADY-MINED-BY-WORKFLOWS (6 nodes:
  authorized-approver-list-approver, -can-approve-exception, -approval-limit, plus contr.gworkflows.008
  and the Workflows page/step).** Its own click path is `Administration > Invoice > Workflows`. MUST
  be opened to reason about the four colliding labels and the two-act unlimited recipe ("set to no
  approval limit currency, and leave the approval limit amount blank") that this window does not
  state. Nothing may be sourced from it.
* `admin-guides/procedure-2d20b513.md` — **ALREADY-MINED-BY-WORKFLOWS (5 nodes:
  authorized_approver_feature_available_for_workflows, minimum_exception_level,
  maximum_exception_level, dep.gworkflows.021, .022).** ZERO-FIELD SEED — the verdict is established;
  do not re-derive. It is the DEPENDENCY source (the feature gate that makes this page's link exist).
* `admin-guides/overview-5ce8a567.md` — **ALREADY-MINED-BY-WORKFLOWS
  (field.workflows.use-default-approver-lookup-to-find-authorized-approver, dep.gworkflows.030).**
* `tools-guides/how-single-step-approval-workflow-works-40145f24.md` — **ALREADY-MINED-BY-WORKFLOWS
  (page.workflows, contr.gworkflows.010).** Source of the ONE HEDGE: "the Authorized Approvers link
  from workflows in the classic interface". That describes the WORKFLOWS SIBLING, not this window.
  Record in notes; do NOT turn it into a uiVariant claim.
* Also already-consumed and therefore off-limits as field sources, though they surfaced in these
  sweeps: `create-an-authorized-approver-step-4640b5a5.md`,
  `step-1-assign-the-level-to-the-workflow-step-6035f10a.md`,
  `restrict-ad-hoc-steps-to-authorized-approvers-8a523257.md`, `understand-the-hierarchy-b65d7089.md`,
  `authorized-approvers-8b3ab7ad.md`, `using-the-default-approver-hierarchy-for-authorized-approvers-e977da80.md`,
  `approver-terminology-8559861c.md`, `step-1-define-the-cost-object-approver-hierarchy-6e7b7dc6.md`,
  `set-a-default-shipping-and-billing-address-f772bed1.md` (Company Locations).

**ZERO-FIELD BY ESTABLISHED VERDICT:**
* `admin-guides/definition-of-amount-for-limit-approval-06806875.md` — pure semantics topic. Its only
  control reference, "Restrict approvers to those with limit authority", is ALREADY HOMED TWICE on
  Workflows. Cite for notes/dependencies; never as a sourceFile for a new field.

**NOT YET CONSUMED, USEFUL FOR NOTES / DEPENDENCIES / IDENTITY:**
* `admin-guides/authorized-approvers-8b3c26cc.md` — revision history (20 rows). ONLY use: the dated
  April 22 2017 zero/NULL corroboration (F8). Never a field source.
* `admin-guides/cost-object-approval-8b3d1e0f.md` — revision history (~27 rows). Dates the unlimited
  note into the "To assign the proper rights" procedure. Never a field source.
* `admin-guides/user-administrator-5aa3eb5e.md` — TITLE COLLISION, distinct loio. identityNotes
  evidence only: User Administration hosts several independent links. Delegates = WORKFLOWS RUN B.
* `admin-guides/authorized-approvers-overview-8b3bd2d0.md` — defines limit vs exception approval;
  good notes framing for what the Amount and Can-approve-exception controls mean.
* `admin-guides/how-the-system-determines-which-approver-an-employee-uses-1c83d905.md` — runtime
  evaluation order; explains why a 0 limit still routes.
* `admin-guides/approval-status-flags-4f534f16.md` — the Limit Approved / Exception Approved flags
  the 0-semantics note references.
* `admin-guides/additional-approver-situations-fbb5034c.md` (raw `<table>`, 7 `<tr`) — "walking up"
  the hierarchy when no limit suffices; ties multiple approvers with equal limits. Example data only.
* `admin-guides/fields-overview-5e3daf7c.md` — names "the Expense and Invoice Settings section of the
  User Details page", corroborating the majority section label (F5).
* `admin-guides/employee-import-6954b441.md`, `employee-import-f6a516c8.md` — forward references to
  the external `Shared: Employee Import Specification`, absent from this corpus. f6a516c8 names both
  record sets: "the default PR, Authorized, and COA approvers within the associated field record sets
  (360, 720, etc.)". DOCUMENTARY gap, not a menu-location judgement.
* `admin-guides/step-2-activate-the-authorized-approver-feature-c87493ee.md`,
  `step-1-define-the-invoice-authorized-approver-hierarchy-fed7c7fe.md`,
  `configure-the-level-filter-8b3bfd21.md` — thin stubs (939/985/979 B) that only cross-reference.
  Prerequisite chain evidence; no fields.
* `admin-guides/how-limit-based-cost-object-approvals-work-8b3d0a3b.md`,
  `how-level-based-cost-object-approvals-work-8b3cf6b4.md` — runtime behaviour of the two types the
  precedence rule arbitrates.
* `admin-guides/required-roles-for-setup-ef627f4b.md`,
  `tools-guides/combine-invoice-roles-for-invoice-tasks-ea319cdd.md`,
  `tools-guides/before-you-begin-3c458d83.md` — role context; all three defer to the external
  `Shared: User Administration User Guide`. This is the documentary reason the general User
  Administration user-profile surface is not buildable from this corpus.

**MULTI-PAGE MEMBERSHIP, STATED RATHER THAN ARBITRARILY ASSIGNED:**
`8a960238` is legitimately both an Authorized Approval Limits mustRead (its step 4 marks this
surface) and a Feature Hierarchies must-read (its step 1) — the built graph already says so in the
value-set notes. `e28f2294` legitimately belongs to both this page (value domains) and a future
Employee Import page that this corpus cannot support. `aae69350` belongs to both Workflows (the Level
filter) and this page (the contradiction). Say so; do not force a single home.

## 8. SHAPE PREDICTION AND HONEST CAVEAT

The evidence supports the brief's expected shape: **eight controls, or seven if the left-side
hierarchy level selector is treated as navigation.**
* BRANCH B (the window): hierarchy level selector (attested twice, fcfd570c + 8b167b96, in
  differently-worded but parallel sentences), Can approve exception, currency, Amount, and the
  CONTESTED Level.
* BRANCH A (Global group only, no window at all): Authorized Approver check box, Manager Approval
  Limit, Approval Limit Currency. **Single-sourced to fcfd570c** — `grep -rlF "Manager Approval
  Limit"` returns exactly one file. There is no second attestation to wait for; dropping branch A
  for want of corroboration would delete three real, documented controls.

ASYMMETRY TO STATE EITHER WAY: the built Workflows page did NOT emit a left-side group/level
selector even though a9522ec8 step 4 ("On the left side of the page, select the icon to expand the
desired group") and d8bf669c step 3 ("On the left side of the page, select the appropriate hierarchy
node") describe the same picker there. Emitting one here is defensible — it is an explicit,
twice-attested procedure step — but the notes must say plainly that the Workflows sibling exists and
was not emitted.

NEVER emit a field labelled `Approval Limit` on this page. No such control is documented here:
8b167b96 has an unnamed "Approval Limit **area**" holding a currency selector and an Amount field;
fcfd570c names only "the Amount field". The literal label "Approval Limit" belongs to
`field.workflows.authorized-approver-approval-limit`.

## 9. LITERAL COMMANDS RUN

```bash
ROOT=/mnt/c/Users/manci/PROJECTS/concur-corpus/CONCUR_INVOICE
D="concur-invoice-professional-edition-admin-guides concur-invoice-professional-edition-tools-guides"

# 0. corpus shape
ls -1 $ROOT
ls -1 $ROOT/concur-invoice-professional-edition-admin-guides/ | wc -l   # 1209
ls -1 $ROOT/concur-invoice-professional-edition-tools-guides/ | wc -l   # 650

# 1. FILENAME SWEEP (both dirs, equal weight)
for t in approval-limit approver authorized user-admin user-administration user-administrator \
         limit signing hierarchy employee-import global-group cost-object; do
  find concur-invoice-professional-edition-admin-guides \
       concur-invoice-professional-edition-tools-guides -maxdepth 1 -type f -iname "*${t}*" | sort
done

# 2. CONTENT SWEEP — seed terms (case-insensitive, fixed-string)
for t in "Authorized Approval Limits" "Manager Approval Limit" "Approval Limit Currency" \
         "Can approve exception" "Expense and Invoices Setting" "Expense and Invoice Settings" \
         "User Admin rights" "limit approval" "limit-based" "level-based cost object" \
         "Limit Approved" "Approval Limit"; do
  grep -rliF "$t" $D | sort
done

# 2b. CONTENT SWEEP — navigation phrasing + domain nouns (beyond the seed floor)
for t in "Invoice User Administration" "User Administration" "Company Admin" \
         "Administration > Company" "Administration >Company" "unlimited approval" \
         "signing authority" "exception limit" "Global group" "hierarchy level" \
         "authorized approver" "approval amount" "authorized approvers link"; do
  grep -rliF "$t" $D | sort; grep -rliF "$t" $D | wc -l
done

# 2c. CONTENT SWEEP — targeted phrases that decide the boundary
for t in "Cost Object Approver feature" "Cost Object Approver Hierarchy" "COA approval chain" \
         "Authorized Approval Limits window" "Modify Authorized Approver" "New Authorized Approver" \
         "Invoice User Admin" "User Admin rights" "Authorized Approver check box" \
         "record type 720" "710 Cost Object Approver" "signing authority for any amount"; do
  grep -rlF "$t" $D
done

# 2d. section-label drift counts + in-context
for t in "Expense and Invoices Setting section" "Expense and Invoices Settings section" \
         "Expense and Invoice Settings" "Expense and Invoices Setting" "Expense and Invoices Settings"; do
  grep -rlF "$t" $D | wc -l
done
grep -rnF "Expense and Invoice Settings" $D

# 2e. corpus-wide (ALL FOUR dirs, incl. release notes — dating only)
grep -rliF "Authorized Approval Limits" .

# 3. RAW TABLE CENSUS — <table, <tr via grep -o (NOT grep -c), md rows with leading whitespace
while read -r f; do
  stat -c%s "$f"; grep -c "<table" "$f"; grep -o "<tr" "$f" | wc -l; grep -cP '^\s*\|' "$f"; wc -l < "$f"
done <<< "$CANDIDATE_LIST"    # 44 candidate files, table in §3

# 4. uiVariant measurement
grep -rilF "Authorized Approval Limits" $D | xargs -r grep -ilE "new experience|legacy|classic"   # ZERO
find $D -maxdepth 1 -type f \( -name "*-new-experience-*" -o -name "*legacy*" -o -name "*classic*" \) | wc -l  # 8

# 5. loio check (title-collision / republish-pair test)
for f in user-administrator-fcfd570c.md user-administration-8b167b96.md \
         step-4-assign-the-proper-rights-to-users-86389a18.md \
         step-4-assign-the-proper-rights-to-users-82481079.md user-administrator-5aa3eb5e.md \
         configuration-8b3be88b.md configuration-8b3cce3f.md; do
  grep -m1 '^loio:' $f
done

# 6. BOUNDARY CHECK against the built graph
python3 -c "import json;g=json.load(open('output/kg-invoice-config.json'));..."   # walked every
# sourceFile in nodes{configPages,configFields,configDependencies,configSteps,configValueSets,
# configContradictions,configCompressedRanges} and matched 45 candidate loio-suffixes.

# 7. VERBATIM VERIFICATION (all anchors in §6)
grep -c -F "<quote>" <file>                    # every anchor listed in §6 returned 1
grep -n "cost object configuration defines" user-administration-8b167b96.md | cat -A   # U+2014 x3
grep -c -F "needs to have at least on level"  user-administration-8b167b96.md   # 1  (typo is real)
grep -c -F "needs to have at least one level" user-administration-8b167b96.md   # 0
grep -c -F "company’s Authorized Approver hierarchy" user-administration-8b167b96.md   # 1 (curly)
grep -c -F "company's Authorized Approver hierarchy" user-administrator-fcfd570c.md    # 1 (ascii)
```

## 10. INVENTORY SIZE

17 mustRead + 29 alsoRelevant = 46 files touched, of which **17 are must-read**. The brief warns
that a 40-file inventory is a red flag; the must-read list is deliberately held to 17, and 12 of
those are under 2 KB. Total mustRead payload ≈ 35 KB. Everything above 17 is explicitly demoted to
boundary evidence, behavioural context, or ruled-out.
