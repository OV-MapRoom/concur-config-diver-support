# Where we left off

_Last updated: 2026-08-31_

## Start here

1. `docs/2026-08-31_HANDOFF-KG-BUILD-v2.md` — authoritative: schema, method, prompt rules, the
   blind-build constraint, open debt.
2. `docs/RESUME-PROMPT.md` — paste-ready prompt for a fresh session.
3. This file — current state only.

## Status

**18 of 37 pages · 437 fields · 335 dependencies · 28 steps · 54 value sets (749 values).**
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

**Group 3 — PO Matching**, 11 pages. Build **new-first**: it has a documented New Experience
variant, and `policies-the-purchase-order-policy-new-experience-*` (15,800 bytes) beside its legacy
twin (1,490 bytes) is the trap that damaged Groups 1–2.
Then: Workflows (13 pages, from the lost slice), Group 6 (Peppol / Shipping / Localization), then
the remediation sweep.

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

1. **`contradictions` and `compressedRanges` have no node type.** Group 5B produced 47 structured
   contradiction records and 15 compressed ranges; only the handful an agent hand-copied into a
   field's `notes` survive into the graph. The brief's core instruction — *record both and state the
   contradiction* — has nowhere to land. **Highest-value schema gap.**
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
