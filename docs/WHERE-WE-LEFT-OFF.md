# Where we left off

_Last updated: 2026-08-31_

## Status: SCAFFOLD ONLY — build blocked on missing prior artifacts

Project created 2026-08-31 and the handoff spec filed. No graph nodes built here yet.

## Two things the handoff assumes that are NOT true on this machine

1. **The prior vertical slice is missing.** The handoff says Groups 2 (partial) and 3 are
   complete — 24 ConfigPages, 145 ConfigFields, 44 dependencies, 6 steps in
   `output/kg-invoice-config.json` (157KB, 2026-08-29). None of these files exist here:
   - `output/kg-invoice-config.json`
   - `output/kg-build-log.md`
   - `INVOICE-CONFIG-MAP.md`  ← the 37-page / 7-group taxonomy, a build input
   - `RESUME-2026-08-29-KG-2.md`
   - `CONFIG-VALUES.md`

   They live on the **corporate device** (paths in the handoff resolve under
   `/mnt/c/Users/I867525`, not `manci`). They must be copied over, or the vertical slice
   gets rebuilt from scratch.

2. **The `concur-docs-genie` MCP is not connected in this session.** No `concur_search_docs`
   / `concur_get_doc` tools. **Not a blocker** — the same corpus is on disk at
   `PROJECTS/concur-corpus/CONCUR_INVOICE/` (2,230 .md; 1,209 admin guides). Extract by
   grep/read instead. Cheaper than MCP round-trips.

## Next step — Luke's call

- **A.** Copy the 5 files above from the corporate device into this repo, then resume at Group 1.
- **B.** Rebuild from scratch here, starting with Group 1 (Policy & Scope), accepting that
  Groups 2/3 get redone later.

Either way the build is a fan-out job (extract → verify → synthesize → merge per group) and
needs explicit opt-in before agents are spawned. Handoff cost guidance: cheap model for
extraction, single-vote verify (not per-field fan-out), one group per run.
