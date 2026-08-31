# Graph schema

Four node types are **locked** by the original handoff: ConfigPage, ConfigField,
ConfigDependency, ConfigStep. Two fields and **three** node types have been added since. Each
addition is listed with the reason it was unavoidable, and the pattern is the same every time: an
instruction the build was already following had no node to write its answer into, so the answer was
being computed and then thrown away.

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
`new` | `legacy` | `both` | `undifferentiated` — on ConfigPage and ConfigField.
**Default: `undifferentiated`.**

SAP ships **both UI versions inside the same `2026_08` corpus**. Confirmed pairs:
`configure-custom-audit-rules-new-ui-*` / `-legacy-ui-*`, and
`policies-the-purchase-order-policy-new-experience-*` (15,800 bytes) beside its legacy twin
(1,490 bytes) — the New Experience doc is **10× richer**.

The four values are distinct claims. Do not collapse them:

| Value | Claim | Config writer should |
|---|---|---|
| `new` | Documented for New Experience. Legacy differs, or legacy is silent. | Use it on a New Experience tenant. |
| `legacy` | Documented for the legacy UI only. | Expect it to be absent on New Experience. |
| `both` | **Positively verified** present in both variants, with the same control and values. | Trust it either way. |
| `undifferentiated` | The corpus never distinguished. **Nobody checked.** | Treat as unverified — a likely source of runtime misses. |

`both` and `undifferentiated` are the pair most easily confused, and confusing them is the
expensive mistake: one says *we looked and they match*, the other says *we never asked*. A field
may only be promoted to `both` by an extraction that actually read both variants.

**Most customers run New Experience** (Luke, 2026-08-31 — an install-base fact, stated nowhere in
the corpus). The config writer therefore targets `new` and falls back to `legacy`.

Groups 1 and 2 were built before this field existed and cite **zero** New Experience sources, so
all 133 of their fields are `undifferentiated`. Reclassifying them is the New Experience retrofit
pass; until it runs, the count of `undifferentiated` fields is the honest size of that debt.

## ConfigContradiction *(added)*
`id · group · patch · kind · topic · appliesToRef · readings[] · consequenceForWriter · notes`

**Where two topics give different accounts of the same control, the graph records BOTH and states
the contradiction.** That instruction is in the governing constraint, in the handoff, and in every
extraction prompt — and until now it had **nowhere to land**. Group 5B alone produced 47 structured
contradiction records; the only ones that reached the graph were those an agent happened to
hand-copy into a field's `notes`. Everything else was discarded by the merge. This node type is
that instruction's home.

- **`readings[]`** — two or more `{summary, sourceQuote, sourceFile}`. **Every reading carries its
  own verbatim quote**, validated exactly like a ConfigField's. A contradiction is a claim about
  what two documents say, so it needs two pieces of evidence, not one. No quote, no reading; fewer
  than two readings, no node.
- **`kind`** — `label-drift` | `option-list` | `scope` | `structure` | `cardinality` |
  `requirement`. What sort of disagreement it is, because the consequence differs: label drift means
  a crawler must try both strings, an option-list conflict means it must not trust either list.
- **`consequenceForWriter`** is the load-bearing field, as `rationale` is for ConfigStep. It says
  what the config writer should actually do. "The docs disagree" is not actionable; "expect either
  label and match on the first that resolves" is.
- **`appliesToRef`** — `{page, field, resolved}`, and both may be null. A contradiction can be about
  a field, a page, or the product (whether Canada is supported for VAT is none of the three). An
  unattached contradiction is still worth recording, so a null ref is valid and is not a defect.
- **Never reconcile.** There is no `resolution` field and no "correct" reading, by design. Many of
  these differences are **provisioning-dependent** — what a screen offers varies with the modules a
  site has enabled — so a single answer would be wrong while looking right. A hypothesis about the
  cause belongs in `notes`, phrased as one.

## ConfigCompressedRange *(added)*
`id · group · patch · label · expandsTo[] · count · appliesToRef · sourceQuote · sourceFile · notes`

The corpus routinely writes an enumeration in compressed form — `Custom 1 - 20`, `Org Unit 1 - 6`,
`Level 1 Code - Level 10 Code`, `VAT Amount 1 - 4`. A crawler cannot act on the compressed string: it
has to know that the field named `Custom 1 - 20` is twenty fields, and what each is called.

Handoff rule 8 has required these to be noted since Group 2, and they were — into a container the
pipeline discarded. The consequence is visible in the graph today: a value set carries the literal
string `Vat Amount 1 - 4` **as one of its values**, with its expansion recorded nowhere.

- **`label` is character-exact.** An en-dash is not a hyphen and `Vat` is not `VAT`. The whole point
  is to match what a crawler will actually read off the screen, so the source's characters are
  reproduced rather than normalised. Where the distinction is load-bearing, `notes` says so.
- **`expandsTo[]` is an enumeration, not a description.** `["Level 1 Code", … "Level 10 Code"]`, not
  "ten segment level columns". `count` must equal its length; the validator checks this.
- **`appliesToRef`** may be null for the same reason as ConfigValueSet's: some ranges belong to a
  surface this graph has not built (an import record layout, for instance). Unwired and deleted are
  different answers.

## Blind build — the governing constraint

This graph is derived **only** from the SAP 2026_08 documentation corpus. It is a model of what
the product's configuration surface *is*, not of how any tenant has configured it.

- No value enters the graph because a system was observed to have it. Every value is enumerated
  in a documented list, with the quote attached.
- Where the corpus gives different lists in different topics, both are recorded with the
  contradiction stated. Many such differences are **provisioning-dependent** — what a screen
  offers varies with the modules a site has enabled — so a single observed instance would answer
  the wrong question while looking like an answer.
- `coverage: thin` and the "Undetermined by the documentation" sections are statements about the
  **corpus**, not a to-do list against a running system.

The `uiVariant` dimension is not an exception to this: New Experience vs legacy is a distinction
SAP draws **in the documentation**, and targeting `new` is a decision about which documented
variant matters most — not an observation imported from any tenant.

## Rules that hold across every node

- No CSS selectors, DOM ids, or XPaths. The graph says page/field/value; the crawler resolves the
  element at runtime.
- No tenant-specific or BestRun-sandbox configured values. Structural knowledge only.
- Nothing in this graph is derived from or validated against any configured system. It is a
  documentation-derived model, and that is deliberate — see **Blind build** above.
