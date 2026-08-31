# CLAUDE.md — concur-config-diver-support

Local, file-only project. **No build, test, lint, or deploy — do not scaffold one.**

## What this is

A **knowledge graph of the Concur Invoice admin configuration surface**. The graph is the
prerequisite for a future "config writer" — a Chromium automation that navigates Concur's
admin UI to a target state (~80% automation). The graph answers: for a desired config change,
which pages, which fields, which valid values, in what order.

## Start here

1. `docs/2026-08-31_HANDOFF-KG-BUILD.md` — the authoritative spec (schema, groups, rules).
2. `docs/WHERE-WE-LEFT-OFF.md` — current state.

## Corpus source

The handoff assumes the `concur-docs-genie` MCP server (`concur_search_docs` / `concur_get_doc`).
**That MCP is not connected on this machine.** The same corpus is on disk:

```
PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-admin-guides/   (1,209 .md)
PROJECTS/concur-corpus/CONCUR_INVOICE/concur-invoice-professional-edition-tools-guides/   (650 .md)
```

Extract with grep/read against those files. Cheaper than MCP and equivalent in content.

## Locked rules (from the handoff — do not relax)

- **`sourceQuote` required on every ConfigField.** No corpus grounding ⇒ drop the field.
- **No CSS selectors** in the graph. The config writer resolves DOM at runtime.
- **No BestRun/tenant-specific values.** Structural knowledge only.
- **Thin pages stay thin** — `coverage: "thin"`, never invent fields.
- **Do not validate against the live Concur UI** in a build session.
- Corporate-adjacent work: no customer PII, pricing, or confidential deal data in outputs.
- Schema is **locked**: ConfigPage / ConfigField / ConfigDependency / ConfigStep.

## Conventions

- New loose files get a `YYYY-MM-DD_` prefix.
- `output/kg-invoice-config.json` is append-only — read before writing, never overwrite prior groups.
- Build one group at a time, write to disk, stop.
