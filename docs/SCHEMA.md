# Graph schema

Four node types are **locked** by the original handoff. Two fields and one node type have been
added since; each addition is listed with the reason it was unavoidable.

## ConfigPage
`id · name · navPath[] · url · group · coverage` *(locked)*
plus `navPathSourceQuote · navPathSourceFile · navPathAlternates[] · uiVariant`

- `navPath` is load-bearing, not the URL: direct `goto` bounces via `dcredirect`, so pages are
  reached by clicking. The corpus publishes **no** `.asp` URLs at all — every URL in the graph
  comes from live-UI observation recorded in the handoff, and cannot be corpus-verified.
- `coverage`: `good` | `partial` | `thin`. Thin means the corpus does not document the page at
  field level. Thin stays thin — nothing is invented to fill it.

## ConfigField
`id · pageId · name · label · fieldType · validValues[] · sourceQuote · notes` *(locked)*
plus `sourceFile · uiVariant · fromRawHtmlTable`

- **`sourceQuote`** is a verbatim substring of the cited file. No quote, no field.
- **`sourceFile` (added)** — the handoff requires verifiers to "re-read the cited corpus doc", but
  locked no citation key. Without it verification is unfalsifiable.
- **`validValues`** holds only values explicitly enumerated in the corpus. Empty array is a valid
  and common answer. See ConfigValueSet for values that depend on another field.
- **`fromRawHtmlTable`** — set only after `grep -c '<table'` on the file returns non-zero.
  In Group 2, 4 of 5 of these flags were false positives before that rule existed.

## ConfigDependency
`type · sourceId · targetId · condition` *(locked)*
plus `id · group · sourceRef · targetRef · sourceQuote · sourceFile`

- `type`: `depends_on` | `precedes` | `triggers`.
- **`sourceRef` / `targetRef` (added)** carry the textual `{page, field, resolved}` so a
  **cross-group edge survives with an unresolved endpoint** until the target group is built.
  `bin/merge-group.py` re-resolves every dangling edge on each merge. Group 1 finished with 58
  unresolved endpoints, nearly all forward references into groups that did not exist yet.

## ConfigStep
`id · name · pages[] · fields[] · sequence[]` *(locked)*
plus `group · goal`

- Each `sequence` entry is `{order, page, action, field, rationale}`. The **rationale is the
  load-bearing part** — it records what breaks if the step runs out of order. Where an ordering
  is inferred rather than stated by the corpus, the rationale must say so.

## ConfigValueSet *(added)*
`id · group · appliesToFieldId · appliesToRef · context · contextFieldRef · values[] · sourceQuote · sourceFile · notes`

A **context-dependent enumeration** — options that change based on another field's value.

`validValues` is a flat list and cannot express a dependent dropdown. The Audit Rules condition
editor is exactly that: the Field column's options depend on which Data Object is selected, across
10+ data objects and roughly 250 field names. A flat array would have to either flatten them into
one meaningless list or drop them. The Group 2 extractor dropped them.

Pair each ConfigValueSet with a `depends_on` ConfigDependency from the dependent field to its
context field, so a traversal finds both the relationship and the option list.

## uiVariant *(added)*
`new` | `legacy` | `both` — on ConfigPage and ConfigField. Defaults to `both`, which is correct for
most of the corpus, where SAP does not distinguish.

SAP ships **both UI versions in the same `2026_08` corpus**. Confirmed pairs:
`configure-custom-audit-rules-new-ui-*` / `-legacy-ui-*`, and
`policies-the-purchase-order-policy-new-experience-*` (15,800 bytes) beside its legacy twin
(1,490 bytes) — the New Experience doc is 10× richer.

**Most customers run New Experience** (Luke, 2026-08-31 — an install-base fact, not stated
anywhere in the corpus). The config writer therefore targets `new` and falls back to `legacy`.
Groups 1 and 2 were built before this field existed and cite **zero** New Experience sources;
they need a retrofit pass.

## Rules that hold across every node

- No CSS selectors, DOM ids, or XPaths. The graph says page/field/value; the crawler resolves the
  element at runtime.
- No tenant-specific or BestRun-sandbox configured values. Structural knowledge only.
- Nothing in this graph has been validated against the live Concur UI.
