# Where we left off

_Last updated: 2026-08-31_

## Status: Group 1 built and pushed. 1 of 7 groups done.

Repo is live and public: **https://github.com/OV-MapRoom/concur-config-diver-support**
(branch `main`). The corporate machine can clone it directly.

`output/kg-invoice-config.json` — `meta.status: IN_PROGRESS`

| Node type | Count |
|---|---|
| ConfigPage | 3 |
| ConfigField | 79 (32 dropped in verification) |
| ConfigDependency | 81 (56 are forward refs into unbuilt groups) |
| ConfigStep | 4 |

Full detail, findings and defects: `output/kg-build-log.md`.

## Two decisions carried forward

1. **Corpus is read from disk, not MCP.** `concur-docs-genie` is not connected on this machine.
   `PROJECTS/concur-corpus/CONCUR_INVOICE/` (2,230 files, all `2026_08`, Professional Edition,
   crawled 2026-08-29) is the source. Cheaper and equivalent.
2. **`sourceFile` added to ConfigField and ConfigDependency.** The handoff locks the schema but
   requires verifiers to re-read the cited doc — with no citation key that is impossible. One
   additive string per node.

## Fix before Group 2 runs

- **Extractor blind spot:** 32 corpus files carry settings in raw `<table>` HTML rather than
  markdown pipe tables. The Group 1 extractors missed all of them. Add an explicit instruction
  to read raw HTML tables.
- **Refuter calibration:** 11 rows of the canonical Invoice Settings table were killed by the
  verifier, not missed by search. The adversarial prompt is too aggressive on table rows.
- **Model tiers:** run extraction on `sonnet` at `effort: low`, keep the adversarial verifier,
  synthesis and critic on `opus`. Luke gave standing authorization to pick per-agent tiers.

## Also open

- **Group 1 remediation pass** — the critic named specific missed fields (`Exclude Attendee Types`,
  `Default Attendee Type`, `Require PO Matching?`, the `Save` control, 5 settings in
  `invoice-settings-cace748d.md`). Worth one small workflow before moving on, or fold into a
  later sweep.
- **The prior vertical slice is still missing** (Groups 2-partial and 3 — 24 pages / 145 fields
  built on the corporate device). Copying `output/kg-invoice-config.json`,
  `INVOICE-CONFIG-MAP.md`, `RESUME-2026-08-29-KG-2.md` and `CONFIG-VALUES.md` off that machine
  would save rebuilding them. `INVOICE-CONFIG-MAP.md` here is a partial reconstruction — 22 of 37 pages.
- **"New Experience" UI variant** exists in the corpus and the graph has no concept of it. If the
  target tenant runs New Experience, the modelled Policies layout may be legacy.
- **Live-UI spot check** — 13 ranked thin items in the build log. Luke runs these, not a session.

## Next step

Group 2 remainder: Routing Configuration, Audit Rules, Exceptions.
