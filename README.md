# concur-config-diver-support

Knowledge graph of the **Concur Invoice admin configuration surface** — the prerequisite
artifact for a future Chromium "config writer" that can drive Concur's admin UI to a target state.

Local file-only project. No build, no deploy.

## Layout

| Path | What lives here |
|---|---|
| `docs/2026-08-31_HANDOFF-KG-BUILD.md` | Authoritative spec — schema, 7 config groups, rules of engagement |
| `docs/WHERE-WE-LEFT-OFF.md` | Current state. Read first. |
| `output/kg-invoice-config.json` | The graph artifact (append-only) |
| `output/kg-build-log.md` | Build record per group |
| `notes/` | Dated working notes |
| `artifacts/` | Deliverables (HTML, decks, one-pagers) |

## Corpus

`PROJECTS/concur-corpus/CONCUR_INVOICE/` — 2,230 Concur Invoice articles on disk
(1,209 admin guides). Used directly; the `concur-docs-genie` MCP is not connected here.

## Status

Scaffold only. Prior vertical slice (Groups 2 partial + 3, 24 pages / 145 fields) was built
on a different machine and **its artifacts are not present here** — see `docs/WHERE-WE-LEFT-OFF.md`.

## Rebuilding the graph

Each group is produced by a workflow whose JSON result is merged in append-only:

```bash
BUILD_DATE=YYYY-MM-DD python3 bin/merge-group.py <workflow-output.json> "Group N — Name"
```

Re-running a group replaces just that group's nodes (idempotent), and every merge re-resolves
cross-group dependency edges that earlier groups left dangling.
