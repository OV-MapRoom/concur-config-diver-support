# Where we left off

_Last updated: 2026-08-31_

## Start here

1. `docs/2026-08-31_HANDOFF-KG-BUILD-v2.md` — authoritative: schema, method, prompt rules, the
   blind-build constraint, open debt.
2. `docs/RESUME-PROMPT.md` — paste-ready prompt for a fresh session.
3. This file — current state only.

## Status

**18 of 37 pages · 437 fields · 335 dependencies · 28 steps · 54 value sets (749 values) ·
24 contradictions (74 readings) · 10 compressed ranges (62 members).**
`output/kg-invoice-config.json` — `meta.status: IN_PROGRESS`. **Validator: ERROR-clean, exit 0.**

Built: Group 1 (Policy & Scope), Group 2 (Routing & Approval, incl. an Audit Rules deep-dive that
took that page 36 → 91 fields), Group 4 (Capture & Vendors), Group 5A (Expense Types, Forms and
Fields, Accounting Administration, Map Invoice Concept Fields), **Group 5B (Tax Administration,
Budget Configuration, List Management, Company Locations)**.

Quality: **437/437 sourceQuotes verify verbatim** against their cited corpus file; 436/437
validValue lists fully found in source; zero dangling dependency endpoints.

| Page | Fields | Coverage | Group |
|---|---|---|---|
| Audit Rules | 91 | good | 2 |
| Tax Administration | 59 | good | 5B |
| Policies | 46 | good | 1 |
| Forms and Fields | 40 | good | 5A |
| Capture Processing Admin | 32 | good | 4 |
| Expense Types | 31 | good | 5A |
| Company Locations | 27 | good | 5B |
| Group Configurations | 22 | good | 1 |
| Image Handling | 21 | good | 4 |
| Accounting Administration | 18 | good | 5A |
| List Management | 14 | thin | 5B |
| Invoice Settings | 13 | good | 1 |
| Routing Configuration | 10 | good | 2 |
| Exceptions | 8 | good | 2 |
| Units Of Measure | 3 | thin | 4 |
| Vendor Search Admin | 2 | thin | 4 |
| Map Invoice Concept Fields | 0 | thin | 5A |
| Budget Configuration | 0 | thin | 5B |

`uiVariant`: 399 undifferentiated · 27 both · 6 legacy · 5 new.

## Next

**Group 3 — PO Matching is TWO pages, not eleven.** The lost map's 11 was a count of *surfaces*,
not pages. A dedicated recon (2026-08-31, `workflows/2026-08-31_kg-group3-page-recon.mjs`, run
`wf_a2215035-e91`) re-derived the roster: six blind sweeps converged with no dissent, the
page-hood critic could refute neither survivor, and the completeness critic found no third page.
Full report in `output/reports/2026-08-31_group3-recon/`.

| Page | Files | Body bytes | Basis | Est. fields |
|---|---|---|---|---|
| Purchase Order Matching Rules | 45 | 64,431 | rich | ~40 |
| Purchase Order Configuration | 7 | ~10,000 | moderate | ~18 |

The other nine are dialogs and tabs with no independent click path, two conditional sections on
the already-built Policies page, and two settings tables (`Purchase Order Settings`,
`Purchase Request Settings`) the corpus places on **Workflows**, not Invoice Settings. All 34
rejected surfaces are listed with reasons in the roster. **Do not re-open this roster** without
new evidence — and note the one caveat the recon refused to paper over: this is a 2026_08 crawl,
and it cannot rule out that SAP retired a surface the original map saw. It found no positive
evidence of that (zero release-note hits, no orphaned page label), but a live-UI pass is the only
real tiebreaker.

**`Purchase Order Policy` resolved AGAINST a new page** — it is a policy *type* on the built
Policies page; no click path anywhere reaches a Purchase Order Policy page. So the 15,800-byte
`policies-the-purchase-order-policy-new-experience-*` file is **Group 1/5 New Experience debt**
(item 3 below), not a Group 3 source. Related correction: that file and
`configure-forms-and-fields-for-purchase-order-copy-down-to-pr-f926eac7.md` (10,109 B) are **one
debt, not two** — 16 of 19 paragraphs of the smaller file are verbatim substrings of the larger,
and all five HTML tables are byte-identical. The debt is 15,800 B, not ~26 KB.

Then: **Workflows (13 pages — now the largest remaining build)**, Group 6 (Peppol / Shipping /
Localization), then the remediation sweep.

### Corpus defect found by the recon — affects `concur-corpus`, not just this project

`concur-invoice-professional-edition-admin-guides/create-purchase-order-matching-rules-adb700f9.md`
is **truncated**: its body ends with a bare line containing only `x`. It is the only file
corpus-wide that does (`grep -rl '^x$'` over both guide dirs returns exactly 1). Content was
dropped during the 2026-08-29 crawl, on a Group 3 seed. Not yet re-crawled — `--manifest-key`
re-crawls a whole deliverable (~1,209 files), so a single-topic fetch is the cheaper fix.

### Two text traps the recon added

- **Indented markdown tables.** SAP indents tables nested inside numbered steps, so a census
  anchored on `^|` under-counts badly: `step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md`
  returns **0** for `grep -c '^| '` and **22** for `grep -cP '^\s+\|'`. Every `^|`-anchored count
  this project has run is suspect.
- **`deliverable_id` is a per-directory constant** — 41460672 on all 1,209 admin-guides files,
  41460673 on all 650 tools-guides. It carries zero discriminating information, and the handoff's
  own text-trap rule told every group to use it as the UI-variant test. **Corrected in the
  workflow template 2026-08-31**: `loio` is the discriminator.

## Method as of Group 5B

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
