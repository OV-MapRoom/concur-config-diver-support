# Where we left off

_Last updated: 2026-08-31_

## Status: Groups 1 and 2 built and pushed. 2 of 7 done (3 of 7 counting the lost Group 3).

Repo: **https://github.com/OV-MapRoom/concur-config-diver-support** (`main`, public).
`output/kg-invoice-config.json` — `meta.status: IN_PROGRESS`

| Node type | Cumulative |
|---|---|
| ConfigPage | 6 |
| ConfigField | 133 |
| ConfigDependency | 113 |
| ConfigStep | 8 |

Per-group detail, findings and defects: `output/kg-build-log.md`.
Full unedited agent reports (critic, nav taxonomy, raw JSON): `output/reports/`.

## Method

Each group = one workflow: Map → Extract (pages × 3 lenses) → Verify (double, fail-closed) →
Synthesize → Critic. Result merged with `bin/merge-group.py` (idempotent; re-resolves cross-group
dependency edges each run).

Model tiers (standing authorization from Luke): Map/Extract/grounding on `sonnet`, adversarial
refuter + synthesis + critic on `opus`. Cut Group 2's cost 27% vs Group 1 with no quality loss.

## Open defects in the method

1. **~~No repair path~~ — FIXED for Group 4 onward.** Verification was binary keep/drop, so refuter
   verdicts of *"real field, just trim the quote"* deleted it. Cost Group 2 at least two real
   fields (`Exceptions.exceptionLevel`, `Audit Rules.ValidationAction`). Groups 1 and 2 were built
   without the fix and both need a remediation pass.
2. **`fromRawHtmlTable` flag is unreliable** — 4 of 5 were false positives in Group 2. The raw-HTML
   extraction fix itself is still **untested**: no Group 2 page had an HTML table. 186 files
   corpus-wide do (31 in admin-guides). Group 5 is the likely real test.

## Known content gaps to remediate

- **Audit Rules Condition Editor is half-built** — Data Object column (10 values) missing, and
  Table 2's ~250-name per-object field catalog is entirely absent. Biggest single gap in the graph.
- **Validation Rules condition semantics unrepresented** — `validation-conditional-expressions-67302876.md`.
- **Group 1**: `Exclude Attendee Types`, `Default Attendee Type`, `Require PO Matching?`, the `Save`
  control, 5 settings in `invoice-settings-cace748d.md` (raw HTML table).
- **Exceptions severity rows** are assigned to Audit Rules instead of their owning page.

## Also open

- **The prior vertical slice is still missing** — Groups 2-Workflows and 3-PO Matching (24 pages /
  145 fields) were built on the corporate device. Copying them over beats rebuilding.
  `INVOICE-CONFIG-MAP.md` here is a partial reconstruction — 22 of 37 pages.
- **New Experience UI is real and confirmed.** `configure-custom-audit-rules-new-ui-*` and
  `-legacy-ui-*` are sibling parents, both `2026_08`. Create vs New; wizard vs Quick View panel.
  The graph models neither variant. Needs a decision: which UI is the config writer targeting?
- **Live-UI spot checks** — 13 ranked items from Group 1, 8 from Group 2, in the build log.
  Top of the list: does the Custom audit rule Event dropdown have 6 values or 18?

## Next

Group 4 (Capture & Vendors) — running with the Repair phase. Then Group 5, Group 6, then
remediation sweep over Groups 1-2.
