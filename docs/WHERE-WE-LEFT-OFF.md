# Where we left off

_Last updated: 2026-09-01_

## Start here

1. `docs/2026-08-31_HANDOFF-KG-BUILD-v2.md` — authoritative: schema, method, prompt rules, the
   blind-build constraint, open debt.
2. `docs/2026-08-31_HANDOFF-WORKFLOWS.md` — the next group's brief, and what changed in the
   method since v2. **Run a page recon before building Workflows; its "13 pages" is not trusted.**
3. `docs/RESUME-PROMPT.md` — paste-ready prompt for a fresh session.
4. This file — current state only.

## Status

**23 of ~25 pages · 617 fields · 454 dependencies · 43 steps · 115 value sets (1,014 values) ·
66 contradictions (209 readings) · 17 compressed ranges (411 members).**
`output/kg-invoice-config.json` — `meta.status: IN_PROGRESS`. **Validator: ERROR-clean, exit 0.**
`bin/check-approval-authority.py` (the Approval Authority boundary gate) also exits 0.

Built: Group 1 (Policy & Scope), Group 2 (Routing & Approval, incl. an Audit Rules deep-dive that
took that page 36 → 91 fields), Group 3 (PO Matching — 2 pages, not the 11 the lost map claimed),
Group 4 (Capture & Vendors), Group 5A + 5B (Data Structure & Accounting),
**Workflows Run A (Workflows + Feature Hierarchies — 4 pages in the group, not the 13 the lost map
claimed)**, and **Approval Authority (Authorized Approval Limits — the first page in this graph not
reached under `Administration > Invoice`).**

Quality: **617/617 sourceQuotes verify verbatim** against their cited corpus file; 616/617
validValue lists fully found in source; 209/209 contradiction readings verbatim; zero dangling
dependency endpoints.

> The denominator moved twice now. The old "37 pages" came from the lost map, which counted
> *surfaces* rather than pages — Group 3's "11" re-derived to 2, and Workflows' "13" re-derived to
> 4 (and reconciles exactly as 7 tabs + 3 wizard pages + 3 settings tables). **Treat every
> remaining page count from that map as an upper bound.**

| Page | Fields | Coverage | Group |
|---|---|---|---|
| Workflows | 114 | good | Workflows |
| Audit Rules | 91 | good | 2 |
| Tax Administration | 59 | good | 5 |
| Policies | 46 | good | 1 |
| Forms and Fields | 40 | good | 5 |
| Purchase Order Matching Rules | 33 | good | 3 |
| Capture Processing Admin | 32 | good | 4 |
| Expense Types | 31 | good | 5 |
| Company Locations | 27 | good | 5 |
| Group Configurations | 22 | good | 1 |
| Image Handling | 21 | good | 4 |
| Accounting Administration | 18 | good | 5 |
| Purchase Order Configuration | 16 | partial | 3 |
| List Management | 14 | thin | 5 |
| Invoice Settings | 13 | good | 1 |
| Routing Configuration | 10 | good | 2 |
| Exceptions | 8 | good | 2 |
| Authorized Approval Limits | 10 | partial | Approval Authority |
| Feature Hierarchies | 7 | partial | Workflows |
| Units Of Measure | 3 | thin | 4 |
| Vendor Search Admin | 2 | thin | 4 |
| Map Invoice Concept Fields | 0 | thin | 5 |
| Budget Configuration | 0 | thin | 5 |

`page.workflows` is the graph's second page (after Forms and Fields) to carry machine-readable
`tabs` — seven of them. They are **individually attested by click path, not enumerated**: no
sentence anywhere in this corpus lists them together.

## Next

**Workflows Run A is DONE (2026-08-31)** — two pages, 121 fields, validator exit 0.
**Approval Authority is DONE (2026-09-01)** — one page, 10 fields, 18 dependencies, 6 contradictions
(one carrying 7 readings), 2 steps, validator and boundary gate both exit 0. Run `wf_c5bf5b7e-134`,
14 agents, 0 errors. Reports in `output/reports/2026-09-01_approval-authority-*`.

**Read the Approval Authority section of `output/kg-build-log.md` before the next build.** It
records six toolchain defects fixed that session — five latent for every future group — and two
claims in this file and the 2026-09-01 handoff that were FALSE, one of which was aimed squarely at
Run B (see item 1 below).

### ▶ RESUME HERE — Workflows Run B

**Email Reminders + Delegate Configurations.** 34 unique files, 70,074 B, ~50 estimated fields.
Both are real left-menu pages the lost map never counted; both were found and page-hood-endorsed by
the recon. Start from `workflows/2026-08-31_kg-workflows-run-a.mjs` and change the usual knobs, plus:

1. **Merge WITH `--patch`, and pass `--patch-page "Workflows"` to `assemble-parts.py`.** The group
   label `Workflows` now EXISTS, so a non-patch merge would DELETE Run A's 121 fields. **The claim
   filed here that `patchPage` comes from the workflow return and that "`--patch` strips nothing"
   was FALSE** — it comes from `assemble-parts.py --patch-page`, and `--patch` with a null
   `patchPage` deletes every node from every non-patch merge while the validator still exits 0
   (measured 2026-09-01: 436 deps → 115). `merge-group.py` now aborts on that combination. See the
   Approval Authority section of `output/kg-build-log.md`.
2. ~~**FIX `NAV_SCHEMA` FIRST**~~ — **DONE 2026-09-01, and proven end-to-end.** Link 1 of the
   three-link `tabs` chain is fixed in
   `workflows/2026-09-01_kg-authorized-approval-limits.mjs` (`tabs` / `tabsSourceQuote` /
   `tabsSourceFile` declared, `tabs` in `required`). The Approval Authority page merged carrying
   `tabs: []` — a positive finding for a modal window, and the first proof the whole chain carries.
   **Copy that `NAV_SCHEMA` verbatim into the Run B script.** Email Reminders has two documented
   tabs and Delegate Configurations two, so it would have bitten immediately.
3. **Exactly ONE file is shared with Run A** — `delegate-self-approval-1b627285.md` (1,284 B) —
   and its field belongs to the Workflows **General page**. **Run B must not extract it.**
4. Seed corrections the recon critics already made are in the Run A page briefs; the Email Reminders
   and Delegate Configurations additions are in
   `output/reports/2026-08-31_workflows-recon/critic-completeness.md` finding 6
   (`pre-defined-rules-220a1fe7.md`, `overview-8b2c769e.md`,
   `best-practices-when-localizing-subject-and-email-message-fields-48515f40.md`,
   `terminology-e1e1ed99.md`, `overview-8b2ba917.md`).
5. Drop the `"two user interfaces"` UI hint from Delegate Configurations — it is **2014 boilerplate
   present in 40 files**, including most of the twenty already-built pages, not a page property.

Then: **Group 6** (Peppol / Shipping / Localization — a complete 6-step Localization click path is
already sitting in `step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md`
lines 102–110), then the remediation sweep.

Set `meta.status = "COMPLETE"` only when every non-deferred group is in and
`bin/validate-graph.py` exits 0.

### ~~A SCOPE DECISION THAT IS LUKE'S~~ — DECIDED, AND THE PAGE IS BUILT (2026-09-01)

The Workflows recon's two critics split on whether to add a fifth page, **`Authorized Approval
Limits`**. On 2026-08-31 it was adjudicated as "completeness right on the fact, page-hood right on
the action" and no page was built, because it sits under `Administration > Company`.

**Luke reversed that on 2026-09-01 and the page is now built.** The 2026-08-31 reasoning used MENU
LOCATION as a proxy for PRODUCT SCOPE, and `navPath` is a navigation fact that says nothing about
which product a control configures. This window configures Concur Invoice through the **non-PO
capability**: a PO-based invoice carries approval authority on the purchase order; a non-PO invoice
has none, so the approver's authorization limit *is* the authority
(`tools-guides/workflow-and-approval-routing-8b4ff6c9.md`).

**`Administration > Company` is therefore no longer a blanket exclusion.** The test is whether a
control governs Invoice behaviour. The general **User Administration user profile** and the
**Employee Import** remain unbuilt — but for a DOCUMENTARY reason (both defer to external *Shared*
guides absent from this corpus), not a menu-location one. Keep that distinction in anything you
write: six built nodes asserted the old rule and all six were repaired on 2026-09-01.

### Six MORE toolchain defects fixed during Approval Authority (2026-09-01)

Full detail in `output/kg-build-log.md`. All six would have hit future groups; one destroys the graph.

- **`merge-group.py --patch` with a null `patchPage` deletes every node from every non-patch merge**
  and `validate-graph.py` still exits 0 over it (436 deps → 115, measured). Now guarded. **This is
  the one aimed at Run B** — see item 1 above.
- **`apply-corrections.py` `wire_by_name` wired a value set across pages**, turning a caught
  validator ERROR into a green build with a false owner.
- **`apply-corrections.py` `repoint_endpoints` never wrote `ref['page']`**, so a cross-page repoint
  silently un-resolved on the next merge.
- **`assemble-parts.py` never checked dependency endpoints into already-built pages** — the exact
  class this run was most likely to produce (LABEL vs NAME).
- **The value-set id collision detector drifted from the id minter**, and nothing checked node-id
  uniqueness. `validate-graph.py` gained a `duplicate-node-id` invariant.
- **`NAV_SCHEMA` tabs**, above.
- Also added: `DEP_CONDITION`, `STEP_RATIONALE`, `STEP_SEQ_RETARGET` and `VALUESET_NOTE_APPEND_BY_ID`
  ops in `apply-corrections.py` — dependency `condition` and step `rationale` prose was previously
  unreachable by every existing op, and `VALUESET_NOTE_APPEND` is keyed by a *value marker*, so an
  id key silently matches nothing.
- New: **`bin/check-approval-authority.py`** — a post-merge boundary gate for the one thing
  `validate-graph.py` is structurally incapable of checking (a control duplicated across two pages).

### Four toolchain defects fixed during Workflows — all would have hit every future group

- **`bin/assemble-parts.py` hard-coded `grp5b-unnamed`** as the step-id fallback.
- **`bin/merge-group.py` `ALL_GROUPS` had no `Workflows` entry**, so `groupsRemaining` omitted it
  and merging Group 6 would have flipped `meta.status` to COMPLETE with Workflows unbuilt.
- **`bin/assemble-parts.py` `group_tag()` called an undefined `slug()`.** Every prior label matched
  `/Group (\d+)/` so the fallback branch had never executed; `Workflows` reached it and raised
  `NameError`. Backwards compatible — `grp3-`/`grp5b-` unchanged.
- **The `tabs` chain has three links and only the last was fixed at first.** See Run B item 2.

**The group label is `Workflows`, deliberately carrying no "Group N".** `merge-group.py` derives
`gtag` from `/Group (\d+)/`, so any label containing "Group 2" (where the lost map files Workflows)
would mint `dep.g2.*` ids colliding with the built Group 2 — and a non-patch merge under that label
would delete Audit Rules' 91 fields.

### Two tooling defects fixed during Group 3 — they would have hit every future group

- **`bin/assemble-parts.py` hard-coded the step-id prefix `grp5b-`**, so it flagged all six
  correctly-prefixed `grp3-` ids as errors. Now DERIVED from the group label via `group_tag()`,
  mirroring `merge-group.py`'s gtag so the two cannot drift. Backwards-compatible.
- **The same script defaulted `--group` and `--patch-page` to Group 5B's values**, so a Group 3
  run produced a result carrying `patchPage: "Group 5B"`. Harmless without `--patch`, but
  `--patch` would have used it to tag and strip nodes under the wrong group. Defaults removed;
  `--group` is now required.

### The "truncated file" is NOT a crawl defect — SAP published it that way

`concur-invoice-professional-edition-admin-guides/create-purchase-order-matching-rules-adb700f9.md`
ends with a bare line containing only `x`, and it is the only file corpus-wide that does
(`grep -rl '^x$'` returns exactly 1). The recon's completeness critic inferred content had been
dropped in the crawl. **That inference was wrong, and it was checked and disproved 2026-08-31.**

Re-fetching the live source
(`help.sap.com/http.svc/pagecontent?deliverable_id=41460672&file_path=adb700f910b84d6294619e8991dcd0fb.html`)
returns `<p class="p">x</p>` in SAP's own HTML, immediately before `</section>`. Re-converting
that HTML through the crawler's exact turndown config reproduces the corpus file byte-for-byte.
**The crawl is faithful; the `x` is SAP's editorial stub.** The topic is also semantically
complete — it describes both matching rule types in full. Do not re-crawl it, and do not treat
the file as partial.

The same applies to the indented-table trap below: tables nested inside numbered steps are
indented because that is **correct** markdown for a table inside a list item. Turndown is right;
naive `^|` censuses are wrong. Neither finding is a crawler bug.

### Two text traps the recon added

- **Indented markdown tables.** SAP indents tables nested inside numbered steps, so a census
  anchored on `^|` under-counts badly: `step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md`
  returns **0** for `grep -c '^| '` and **22** for `grep -cP '^\s+\|'`. Every `^|`-anchored count
  this project has run is suspect.
- **`deliverable_id` is a per-directory constant** — 41460672 on all 1,209 admin-guides files,
  41460673 on all 650 tools-guides. It carries zero discriminating information, and the handoff's
  own text-trap rule told every group to use it as the UI-variant test. **Corrected in the
  workflow template 2026-08-31**: `loio` is the discriminator.

## Method as of Group 3

Same six phases — Map → Extract (pages × 3 lenses) → Verify → Repair → Synthesize → Critic — with
four changes that are now the standard:

- **Agents write their own JSON artefacts to a parts directory** and return a small receipt.
  `bin/assemble-parts.py` composes the raw result deterministically. No model retypes a quote, so a
  quote cannot stop being verbatim in transit. The script runs a **pre-merge check** so defects
  surface before the merge, not after.
- **Two perspective-diverse refuters**, not two identical ones: one attacks grounding, one attacks
  **page ownership, cross-page name collision and admin-vs-end-user scope**. The second axis is
  where Group 5A actually lost accuracy.
- **The three-way disposition is computed in code.** No verdict, a partial verdict set, or two
  refuters disagreeing all route to Repair. Only a unanimous drop drops.
- **Two critics run in parallel** at `opus`/`xhigh` — completeness and correctness. Both earned
  their cost on this run: they independently ranked the same defect first.
- **Contradictions and compressed ranges are nodes**, emitted by a fourth Synthesize agent. Each
  contradiction reading carries its own verbatim quote; an unverifiable one is an ERROR.
- **Check `agents_error` on every workflow run.** A refuter died mid-response inside an otherwise
  successful run; resuming it repaired 18 of 24 nodes. A failed agent is not a visible failure.

## Standing decisions

- **Blind build from documentation.** Never validated against or inferred from a configured
  tenant. Corpus gaps are properties of the docs, not a validation backlog.
- **New Experience is the primary UI target** — most customers run it (Luke). `uiVariant: both`
  is a positive verification claim; `undifferentiated` means nobody checked. 399 of 437 fields are
  currently `undifferentiated`, which is the honest size of the retrofit debt.
- **Model tiers are Claude's call** (standing authorization). Cheap tier for clerical fan-out,
  `opus` for the adversarial refuters, Repair, synthesis and the critics. Never cheapen the last two.
- **Accuracy over token cost.**
- **A thin page must say why it is thin.** Page nodes now carry `documentedBasis`, `verifyNotes`,
  `roleGates`, `aliases` and `identityNotes`. A bare `{name, url, coverage: thin}` node is
  indistinguishable from a lazy miss.

## Open debt

Full list in the handoff and in the Group 5B section of `output/kg-build-log.md`. Highest-value first:

1. ~~**`contradictions` and `compressedRanges` have no node type.**~~ **CLOSED 2026-08-31.**
   `ConfigContradiction` and `ConfigCompressedRange` added; 24 contradictions (74 readings) and 10
   ranges landed, every reading quote verbatim. The workflow template emits both natively now.
2. **Audit Rules alias collapse** — 91 entries encode ~68 real controls.
3. **New Experience retrofit** over Groups 1–2 — the PO Policy New Experience doc is 10× richer
   than the legacy stub we built from.
4. **Group 1 / 2 remediation** — both built before the Repair phase existed. Also the source of all
   23 `step-references-unknown-field` warnings: the Audit Rules deep-dive renamed fields the Group 2
   steps still cite.
5. **Group 5B remediation** — four unread admin-guides files (chiefly
   `implementation-best-practices-8b39ab5d.md`), four named controls found but not emitted, and
   zero role-gate edges against the graph's own `dep.g1.033/034/055/056` precedent.
6. **Catalog ranges** — the Audit Rules catalog's true size is 492, not 278; 15 bullets are
   compressed ranges and nothing records that they expand.
7. **PO controls stranded on closed groups — 8 named, scoped, and NOT built.** Found by the Group 3
   page recon (2026-08-31). Each was verified absent from the graph by grep, so deferring them
   silently would be deletion, not deferral.
   - → **Invoice Settings** (Group 1): `Enable Change Order`
     (`enable-the-po-change-order-feature-7dd5dcd4.md`); line identification "based on data
     attributes" (`line-identification-for-purchase-order-matching-3c7c8336.md` +
     `purchase-order-line-identification-8b356b0e.md`, two distinct topics carrying a control-type
     and default-state discrepancy — do NOT collapse them); allow PR owners to **edit** their own
     POs (`allow-purchase-request-owners-to-edit-their-own-purchase-orders-4a3f8202.md`); allow PR
     owners to **transmit** their own POs
     (`allow-purchase-request-owners-to-transmit-their-own-purchase-orders-636950b7.md`).
   - → **Forms and Fields** (Group 5): `Purchase Order Number` on the Payment Request Line Item
     Details form (this is how the Multiple PO feature is activated); `Delivery Slip Number`
     (`delivery-slip-number-field-for-three-way-matching-b0d3f1ca.md`); `Receipt Type` on the PR
     header form (`adding-receipt-type-field-to-the-purchase-request-header-form-ba26762e.md`);
     custom fields for receipts of goods (`adding-custom-fields-for-receipts-of-goods-469bd9d3.md`).

   **Why it was NOT attached to the Group 3 run** (Luke's call, 2026-08-31): `bin/merge-group.py`
   `--patch` **replaces** a page's fields wholesale — it strips every field whose `pageId` is
   touched and whose `sourceGroup` matches, then rebuilds from the result (`merge-group.py:60-64`;
   all 13 Invoice Settings fields carry `sourceGroup: Group 1 — Policy & Scope`, all 40 Forms and
   Fields carry `Group 5`). A PO-angled patch would therefore return ~4 fields and **delete the 13
   good ones**. And the file that would make such a patch safe —
   `available-invoice-settings-8b3411f0.md`, 8,368 B — is not a Group 3 source, so no agent in that
   run would have opened it.

   **What this job actually is: a page REBUILD, not a top-up.** Invoice Settings holds 13 fields
   against a source documenting roughly 34 — it is under-read by about two-thirds, which is the
   sharpened form of open-debt item 4. Scope a run with its own Map phase over the FULL Invoice
   Settings and Forms and Fields source sets, then `--patch` is correct behaviour rather than a
   hazard. Do not scope it as "add the 8".

8. **Group 3 deferred findings** — cross-group by construction; the completeness critic was
   explicit that none may be resolved by re-homing onto a Group 3 page. Full detail in the Group 3
   section of `output/kg-build-log.md`.
   - **`Receipt Type` is absent from the whole graph** — the twin gate to the captured
     `Receipt Required`, in 8 corpus files with four conflicting value vocabularies. Belongs to
     Forms and Fields (item 7). Its gate on matching is Group-3-relevant and should become a
     dependency when that debt is worked.
   - **A Group 3 edge points at a phantom**: `level_field → Invoice Settings :: Allow system to
     associate invoice lines to Purchase Order lines based on data attributes`. That row is one of
     the 11-of-24 missing from Invoice Settings — item 7 biting exactly where predicted.
   - **`concur-receiving-roles-099f375f.md` never opened.** The admin twin of the extracted tools
     roles matrix, and they disagree: admin *"the user must also have the Receipt User role"* vs
     tools *"can have"* — mandatory vs optional on a role prerequisite. Wants a contradiction node.
   - **A 21-entry copy-down catalog** in `f926eac7` was dismissed as illustrative on a `<tr>` count.
     It packs its payload into ONE `<tr>` as 25 `<p>` cells — the same under-count trap as indented
     markdown tables. Carries two EN-DASH ranges. Groups 1/5 debt.
   - **`purchase-request-settings-b0bce285.md`** (3 rows + the prose range *"Type a number from one
     to 99"*, which no digit regex finds) belongs to the unbuilt Workflows group.
   - Six documented buttons on Purchase Order Configuration were reported in `splitsProposed` and
     deliberately not created — a Repair-created record never faces the adversarial refuter. The
     schema already models 121 `button` fields, so this needs a decision, not a third deferral.
