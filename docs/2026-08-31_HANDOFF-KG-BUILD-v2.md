# Handoff — Concur Config Diver · Knowledge Graph Build (v2)

**Filed:** 2026-08-31
**Supersedes:** `docs/2026-08-31_HANDOFF-KG-BUILD.md` (the original, written before this repo existed)
**For:** A fresh Claude instance with no prior context
**Repo:** https://github.com/OV-MapRoom/concur-config-diver-support (public, `main`)

---

## What this project is

A **knowledge graph of the Concur Invoice admin configuration surface**, built **blind from
documentation**. It is the prerequisite for a future "config writer" — a Chromium automation that
navigates Concur's admin UI to a target state at ~80% automation. The graph answers: for a desired
config change, which pages, which fields, which valid values, in what order.

### The governing constraint — read this before anything else

**This is a blind build from documentation.** The graph models what the product's configuration
surface *is*, per SAP's docs — never how any tenant has configured it.

- A value enters the graph only because a documented list enumerates it. Never because it is
  plausible, standard, or typical. Two "Yes" values were caught and removed for exactly this —
  someone completed a No/Yes toggle the corpus only describes one side of.
- Where two topics give different lists for the same control, **record both and state the
  contradiction**. Do not reconcile by picking one. Many differences are provisioning-dependent —
  what a screen offers varies with the modules a site has enabled — so there is often no single
  correct list to find.
- Never validate against, or infer from, a configured system. Sections in the build log headed
  *"Undetermined by the documentation"* are properties of the corpus, **not** a to-do list against
  a live tenant.

---

## Corpus

`PROJECTS/concur-corpus/CONCUR_INVOICE/` — on disk, **no MCP server needed**.

| Path | Files |
|---|---|
| `concur-invoice-professional-edition-admin-guides/` | 1,209 |
| `concur-invoice-professional-edition-tools-guides/` | 650 |

All SAP `2026_08`, Professional Edition, crawled `2026-08-29T12:14:11.751Z`, repo commit `d838939`.
Verified: every one of the 1,859 files carries `version: '2026_08'`; zero mixed versions.

**The earlier handoff said the `concur-docs-genie` MCP was required. It is not connected on this
machine and is not needed** — reading the files directly is cheaper and equivalent.

---

## Current state (2026-08-31)

**18 of 37 pages · 437 fields · 335 dependencies · 28 steps · 54 value sets carrying 749 values ·
24 contradictions carrying 74 readings · 10 compressed ranges carrying 62 members.**

`output/kg-invoice-config.json` — `meta.status: IN_PROGRESS`. **Graph is ERROR-clean, exit 0.**
437/437 sourceQuotes verify verbatim against their cited corpus file.

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

Two zero-field pages, and they are not the same kind of thing. **Budget Configuration** is a
documented negative: zero corpus hits for the page name or any Budget admin string, and the one
budget topic defers to the *Shared: Budget Setup Guide*, which is not in this corpus. Its node
carries a 7,787-character `verifyNotes` recording the searches and their zero results.
**Map Invoice Concept Fields** (5A) has no such record and the 5A critic argued the node should not
exist at all — it is still open.

---|---|---|---|
| Audit Rules | 91 | good | 2 |
| Policies | 46 | good | 1 |
| Forms and Fields | 40 | good | 5 |
| Capture Processing Admin | 32 | good | 4 |
| Expense Types | 31 | good | 5 |
| Group Configurations | 22 | good | 1 |
| Image Handling | 21 | good | 4 |
| Accounting Administration | 18 | good | 5 |
| Invoice Settings | 13 | good | 1 |
| Routing Configuration | 10 | good | 2 |
| Exceptions | 8 | good | 2 |
| Units Of Measure | 3 | thin | 4 |
| Vendor Search Admin | 2 | thin | 4 |
| Map Invoice Concept Fields | 0 | thin | 5 |

`uiVariant`: 299 undifferentiated · 27 both · 6 legacy · 5 new.

---

## The method — one workflow per group

```
Map → Extract (pages × 3 lenses) → Verify (2 refuters) → Repair → Synthesize (×4) → Critic (×2)
```

**Start from `workflows/2026-08-31_kg-group-5b.mjs`** — the exact script as run for Group 5B,
preserved in the repo precisely because the Group 5A script lived only in a session scratchpad, was
lost, and cost a full re-authoring. Its header lists the five things to change per group. Everything
else in it is accumulated method; do not thin it out.

Then, in the main loop:

```bash
python3 bin/assemble-parts.py <parts-dir> <out.json> --journal <workflow journal.jsonl> \
        [--group "<label>"] [--patch-page "<label>"]
BUILD_DATE=YYYY-MM-DD python3 bin/merge-group.py <raw-result.json> "<Group label>" [--patch]
python3 bin/apply-corrections.py     # ALWAYS after a merge — merges rebuild nodes and drop fixes
python3 bin/validate-graph.py        # must exit 0
```

Save every run's `critic`, `mapping`, full result JSON **and the intermediate part files** into
`output/reports/` before merging. They are the audit trail, and the session scratchpad is not durable.

### Architecture, as of Group 5B — four things that are now standard

1. **Agents write their own JSON artefacts to a parts directory** and return a small receipt;
   `bin/assemble-parts.py` composes the raw result deterministically. Through 5A every field record
   travelled agent-to-agent inside prompts and ~300KB came back as the return value. No model
   retypes a quote now, so a quote cannot stop being verbatim in transit. The assembler also runs a
   **pre-merge check** (quotes, duplicate names, value-set wiring, dependency endpoints, raw-table
   flags, node-id collisions) so defects surface before the merge rather than after it.
   `navPathEvidence` is recovered from the workflow journal — **pass `--journal` or all pages merge
   with an empty `navPath`, and nothing in the validator will catch it.**
2. **Two perspective-diverse refuters, not two identical ones.** Refuter 1 attacks grounding (quote
   verbatim, values present, type, truncation, raw-table flag). Refuter 2 attacks **page ownership,
   cross-page name collision, and admin-vs-end-user scope**. That second axis is where Group 5A
   actually lost accuracy — five fields mis-homed, three duplicated across pages — and it is the one
   failure mode `grep` cannot catch. On Company Locations the two refuters split 44-keep against
   25-keep, which is the design working, not a malfunction.
3. **The three-way disposition is computed in code, not by a model.** No verdict, a partial verdict
   set, or two refuters disagreeing all route to Repair. Only a *unanimous* drop drops.
4. **Two critics in parallel** — completeness (what is missing) and correctness (what is wrong).
   Both earned their cost on 5B: they independently ranked the same defect first.
5. **Contradictions and compressed ranges are NODES**, emitted by the fourth Synthesize agent into
   `synth-contradictions.json` / `synth-ranges.json`. See `docs/SCHEMA.md`. Every contradiction
   reading carries its OWN verbatim quote and the validator treats a miss as an ERROR; fewer than
   two grounded readings is not a contradiction and must be dropped.
6. **Check `agents_error` on every run before trusting the output.** On the schema pass a refuter
   died mid-response inside a workflow that reported completion. Resuming it — same script,
   `resumeFromRunId` — replayed the rest from cache and repaired 18 of 24 nodes. A failed agent
   inside a completed workflow is not a visible failure.

**Model tiers** (Luke gave standing authorization to choose these). As run for 5B:
Map → `opus`/`high`. Extract lens A (procedures) → `sonnet`/`high`; lens B (tables and long
catalogs) → `opus`/`high`; lens C (tools-guides, cross-cutting) → `opus`/`medium`. Refuters, Repair
and the three Synthesize agents → `opus`/`high`. Both critics → `opus`/`xhigh`.
**Do not cheapen the refuters or the critics** — every significant defect found in this project came
from one of those two, including the one that would have deleted 323 enumerated values.

### Hard-won prompt rules — carry ALL of these forward

1. **Search both guide directories with equal weight.** Vendor Search Admin is documented *only*
   in tools-guides; a raw-HTML catalog was missed because a search skewed to admin-guides.
2. **Long catalogs are the most valuable artefact in the corpus, not noise.** A ~250-name table
   was skipped for being long and cost a dedicated 2.36M-token re-run to recover (it yielded 278
   values). Never sample, truncate, or summarise a list.
3. **Parse raw `<table>` HTML**, not just markdown pipe tables. 186 files corpus-wide use it.
   Set `fromRawHtmlTable` **only** after `grep -c '<table'` returns non-zero — 4 of 5 such flags
   were false before that rule.
4. **Three-way disposition, never keep/drop.** `repair` means *the control is real, the record is
   defective*. If a verifier writes "keep, but…" the disposition is `repair`. A binary gate
   silently deleted two real fields.
5. **A missing verdict routes to Repair, never to deletion.** One agent failed mid-run and zero
   fields were lost because of this.
6. **Refuter calibration:** a row in a documented field table IS a field. Terse description, short
   quote, or an inferred `checkbox` type are not grounds to refute. Name the defect or keep it.
   An early refuter killed 11 of 24 rows of a canonical settings table.
7. **`appliesToField` on a value set must be a field `name`, not a UI label.** Extractors get this
   wrong constantly — 17 sets landed unwired in one run. `wire_by_name()` now repairs it after the
   fact, but say it in the prompt anyway.
8. **Note compressed ranges** ("Custom 01 - 20", "Org Unit 1 - 6") and what they expand to.
9. **Thin is a correct answer.** Never pad a page the corpus does not document — but a thin page
   must say WHY. Page nodes carry `documentedBasis`, `verifyNotes`, `roleGates`, `aliases` and
   `identityNotes`; a bare `{name, url, coverage: thin}` node is indistinguishable from a lazy miss,
   which is exactly the charge the 5A critic laid against Map Invoice Concept Fields.
10. **Cap Repair at one record per input.** Records created during Repair are only grep-grounded —
   they never face the adversarial refuter, and mis-assignment to the wrong page is precisely what
   grep cannot catch. A genuine split goes to `splitsProposed`, reported and NOT emitted. 5A returned
   17 records from 14 inputs; 5B held the cap exactly on all three populated pages.
11. **An enumeration with no legitimate owner must still land.** "Unwired" and "deleted" are
   different answers. Refusing to wire a catalog to a field is often correct — the corpus really does
   scope it elsewhere — but it must merge as a `knownGap` value set carrying its `whyNoOwner`, which
   `bin/validate-graph.py` demotes from ERROR to WARN. On 5B the pipeline had no reader for these and
   would have silently dropped 323 of 339 values, including a 249-row catalog. **Check what the
   pipeline discards, not only what the agents produce.**

---

## Tooling

| Script | Purpose |
|---|---|
| `bin/assemble-parts.py` | **Deterministic, no model.** Composes a raw-result JSON from the parts a workflow's agents wrote, recovering `navPathEvidence` from the run journal. Runs a pre-merge check and exits non-zero on a fatal one. Materialises `validValuesAdditions` as unconditional value sets and `orphanCandidates` as `knownGap` sets. |
| `bin/merge-group.py` | Merge a workflow result. Idempotent; `--patch` rebuilds only the pages in the result (for single-page rebuilds inside an existing group). Endpoint ids are always re-derived from the stable `{page, field}` ref — never trusted from storage. |
| `bin/apply-corrections.py` | Critic-identified fixes a build cannot make itself. Idempotent. **Re-run after every merge.** |
| `bin/validate-graph.py` | **Deterministic, no model.** Re-checks every claim against the corpus: quotes verbatim, values present, no selectors, no duplicate names per page, value sets wired, no dangling edges. Exits non-zero on ERROR. |

`validate-graph.py` is the accuracy backstop. It found 32 errors that four rounds of adversarial
LLM review had missed. Run it every time.

---

## What remains

| Work | Pages | Notes |
|---|---|---|
| **Group 3 — PO Matching** | 11 | Build **new-first**; it has a documented New Experience variant. At 11 pages this is ~73 agents in one run — consider splitting 3A/3B, in which case the second merge needs `--patch` |
| **Workflows** | 13 | Was in the lost slice |
| **Group 6 — Compliance** | 3 | Peppol Configuration, Shipping Configuration, Localization |
| Group 7 — Ops | ? | Deferred unless asked |

### Open debt

- ~~**Repair can ADD fields.**~~ **CLOSED in Group 5B.** The cap held exactly: 98=59+39,
  65=27+38, 22=14+8, with zero roster names absent from the extract union. It is now prompt rule 10
  and it stays.
- ~~**`contradictions` and `compressedRanges` have no node type.**~~ **CLOSED 2026-08-31.** Two node
  types added and 24 contradictions / 10 ranges landed. The blocked OCR-table fix is recorded: the
  tools twin's `Vat 2 (Secondary Tax – Canada PST/QST)` row against the admin twin that has none.
- **Group 5B remediation** — four unread admin-guides files (chiefly
  `implementation-best-practices-8b39ab5d.md`, which falsifies that build's own "the Canada
  contradiction lives only in tools-guides" framing), four named controls found but not emitted
  (`Calculated Tax Amount`, `Tax Rate`, `(Optional) Tax Reference ID`, `Vendor includes VAT in the
  Unit Price`), and zero role-gate edges against the graph's own `dep.g1.033/034/055/056` precedent.
- **Six dependency endpoints name pages on no build list** — Vendor Manager, Employee Import,
  Feature Hierarchies, Vendor Employee Access Import, Check Configurations. Two are import file
  specs, not admin pages. Decide whether they become pages or the edges become notes.
- **~23 alias duplicates on Audit Rules** — 91 entries encode ~68 real controls, because three
  extraction areas each modelled the condition editor independently. Needs an alias-collapse pass.
- **The catalog's true size is 492, not 278** — 15 of the 278 bullets are compressed ranges.
  Nothing in the graph records that they expand.
- **New Experience retrofit** — Groups 1–2 cite zero New Experience sources. Notably
  `policies-the-purchase-order-policy-new-experience-*` (15,800 bytes) versus its legacy twin
  (1,490) — the New Experience doc is 10× richer and we built from the stub.
- **One accepted `knownGap`**: `Copy Down from Purchase Order if available` is documented with
  options but no extractor emitted it as a field. Left unwired deliberately.
- **Three `uiVariant: both` claims are unearned** on Audit Rules.
- **Group 1 / Group 2 remediation** — both were built before Repair existed. The Group 1 critic
  named specific missed fields (`Exclude Attendee Types`, `Default Attendee Type`,
  `Require PO Matching?`, the `Save` control, 5 settings in `invoice-settings-cace748d.md`).

---

## Structural findings worth not rediscovering

- **`Invoice Processing Admin` is a middle nav node.** Nothing in Group 1 hangs directly off
  `Administration`. `Invoice Admin` is a live alias for `Administration > Invoice`.
- **The corpus publishes NO `.asp` URLs.** Zero hits for `PolicyAdmin`, `auditRules`,
  `accountingAdmin`, `dcredirect`. Every URL in the graph came from the original handoff's
  live-UI observation and **cannot be corpus-verified**. Click paths are the only navigational
  knowledge that exists.
- **"Forms and Fields" is TWO pages** — the Invoice Processing Admin tool, and a tab inside
  Capture Processing Admin with a stricter role gate (Unrestricted). Never collapse them.
- **Exceptions is a hub**, feeding both Audit Rules and Workflows.
- **Audit Rules is one page with three tabs** (Custom / Validation / Random); "Validation Rules"
  is an alias, not a separate page.
- **SAP ships legacy and New Experience topics in the same 2026_08 corpus.** Most customers run
  New Experience (Luke), so `new` is the primary target.
- **Text traps:** `Administration >Invoice` without the space; `Polices` misspelled; guide titles
  singular where page names are plural.

---

## Rules of engagement

- `sourceQuote` verbatim on every field. No quote, no node.
- No CSS selectors, DOM ids, or XPaths — the crawler resolves elements at runtime.
- No tenant-specific values.
- Thin stays thin.
- Date-prefix any new loose file `YYYY-MM-DD_`.
- No customer PII, pricing, or confidential deal data.
