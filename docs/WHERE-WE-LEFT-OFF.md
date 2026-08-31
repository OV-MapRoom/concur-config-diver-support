# Where we left off

_Last updated: 2026-08-31_

## Start here

1. `docs/2026-08-31_HANDOFF-KG-BUILD-v2.md` — authoritative: schema, method, prompt rules, the
   blind-build constraint, open debt.
2. `docs/RESUME-PROMPT.md` — paste-ready prompt for a fresh session.
3. This file — current state only.

## Status

**20 of ~24 pages · 486 fields · 375 dependencies · 34 steps · 80 value sets (850 values) ·
36 contradictions (110 readings) · 12 compressed ranges (106 members).**
`output/kg-invoice-config.json` — `meta.status: IN_PROGRESS`. **Validator: ERROR-clean, exit 0.**

Built: Group 1 (Policy & Scope), Group 2 (Routing & Approval, incl. an Audit Rules deep-dive that
took that page 36 → 91 fields), **Group 3 (PO Matching — 2 pages, not the 11 the lost map claimed)**,
Group 4 (Capture & Vendors), Group 5A + 5B (Data Structure & Accounting).

Quality: **486/486 sourceQuotes verify verbatim** against their cited corpus file; 485/486
validValue lists fully found in source; zero dangling dependency endpoints.

> The denominator moved. The old "37 pages" came from the lost map, which counted *surfaces*
> rather than pages — Group 3's "11" re-derived to 2. Treat any remaining page count from that
> map as an upper bound, Workflows' 13 especially.

| Page | Fields | Coverage | Group |
|---|---|---|---|
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
| Units Of Measure | 3 | thin | 4 |
| Vendor Search Admin | 2 | thin | 4 |
| Map Invoice Concept Fields | 0 | thin | 5 |
| Budget Configuration | 0 | thin | 5 |

`uiVariant`: 448 undifferentiated · 27 both · 6 legacy · 5 new.

## Next

**Group 3 — PO Matching is DONE (2026-08-31).** Two pages, 49 fields, validator exit 0. Details in
`output/kg-build-log.md`; the page recon that retired the 11-page figure is in
`output/reports/2026-08-31_group3-recon/`.

**Next up: Workflows.** The lost map called it 13 pages — under ONE left-menu entry, which is the
same surfaces-vs-pages error Group 3 just disproved. **Run a page recon first**
(`workflows/2026-08-31_kg-group3-page-recon.mjs` is the reusable template — change the domain
terms, the sweep charters and the reconciliation target). Do not budget 13 pages until a recon
says so. It is still the largest remaining build.

Then: Group 6 (Peppol / Shipping / Localization — a complete 6-step Localization click path is
already sitting in `step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md`
lines 102–110), then the remediation sweep.

Set `meta.status = "COMPLETE"` only when every non-deferred group is in and
`bin/validate-graph.py` exits 0.

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
