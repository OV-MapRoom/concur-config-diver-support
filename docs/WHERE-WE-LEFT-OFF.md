# Where we left off

_Last updated: 2026-08-31_

## Start here

1. `docs/2026-08-31_HANDOFF-KG-BUILD-v2.md` — authoritative: schema, method, prompt rules, the
   blind-build constraint, open debt.
2. `docs/RESUME-PROMPT.md` — paste-ready prompt for a fresh session.
3. This file — current state only.

## Status

**14 of 37 pages · 337 fields · 278 dependencies · 22 steps · 30 value sets (410 values).**
`output/kg-invoice-config.json` — `meta.status: IN_PROGRESS`. **Validator: ERROR-clean.**

Built: Group 1 (Policy & Scope), Group 2 (Routing & Approval, incl. an Audit Rules deep-dive that
took that page 36 → 91 fields), Group 4 (Capture & Vendors), Group 5A (Expense Types, Forms and
Fields, Accounting Administration, Map Invoice Concept Fields).

Quality: **337/337 sourceQuotes verify verbatim** against their cited corpus file; 336/337
validValue lists fully found in source; zero dangling dependency endpoints.

## Next

**Group 5B** — Tax Administration, Budget Configuration, List Management, Company Locations.
Merge with `--patch` (Group 5A already owns the "Group 5" label).
Then: Group 3 PO Matching (new-first), Workflows, Group 6, then the remediation sweep.

## Standing decisions

- **Blind build from documentation.** Never validated against or inferred from a configured
  tenant. Corpus gaps are properties of the docs, not a validation backlog.
- **New Experience is the primary UI target** — most customers run it (Luke). `uiVariant: both`
  is a positive verification claim; `undifferentiated` means nobody checked. 299 of 337 fields are
  currently `undifferentiated`, which is the honest size of the retrofit debt.
- **Model tiers are Claude's call** (standing authorization). Cheap tier for clerical fan-out,
  `opus` for the adversarial refuter, Repair, synthesis and the critic. Never cheapen the last two.
- **Accuracy over token cost.**

## Open debt

Full list in the handoff. Highest-value first:

1. **Repair can add fields** — constrain to one record per input; additions never face the refuter.
2. **Audit Rules alias collapse** — 91 entries encode ~68 real controls.
3. **Catalog ranges** — the true catalog is 492 names, not 278; 15 bullets are compressed ranges.
4. **New Experience retrofit** over Groups 1–2 — the PO Policy New Experience doc is 10× richer
   than the legacy stub we built from.
5. **Group 1 / 2 remediation** — both built before the Repair phase existed.
