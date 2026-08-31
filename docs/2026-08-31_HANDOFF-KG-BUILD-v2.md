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

**14 of 37 pages · 337 fields · 278 dependencies · 22 steps · 30 value sets carrying 410 values.**

`output/kg-invoice-config.json` — `meta.status: IN_PROGRESS`. **Graph is ERROR-clean.**

| Page | Fields | Coverage | Group |
|---|---|---|---|
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
Map → Extract (pages × 3 lenses) → Verify (2 agents, 3-way) → Repair → Synthesize → Critic
```

Then, in the main loop:

```bash
BUILD_DATE=YYYY-MM-DD python3 bin/merge-group.py <raw-result.json> "<Group label>" [--patch]
python3 bin/apply-corrections.py     # ALWAYS after a merge — merges rebuild nodes and drop fixes
python3 bin/validate-graph.py        # must exit 0
```

Save every workflow's `critic`, `mapping`, and full result JSON into `output/reports/` before
merging. They are the audit trail, and the session scratchpad is not durable.

**Model tiers** (Luke gave standing authorization to choose these):
Map / Extract / grounding → `sonnet` at `medium`. Adversarial refuter, Repair, Synthesize → `opus`
at `high`. Critic → `opus` at `xhigh`. Cost fell 27% versus all-Opus with no quality loss.
**Do not cheapen the refuter or the critic** — every significant defect found this project came
from one of those two.

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
9. **Thin is a correct answer.** Never pad a page the corpus does not document.

---

## Tooling

| Script | Purpose |
|---|---|
| `bin/merge-group.py` | Merge a workflow result. Idempotent; `--patch` rebuilds only the pages in the result (for single-page rebuilds inside an existing group). Endpoint ids are always re-derived from the stable `{page, field}` ref — never trusted from storage. |
| `bin/apply-corrections.py` | Critic-identified fixes a build cannot make itself. Idempotent. **Re-run after every merge.** |
| `bin/validate-graph.py` | **Deterministic, no model.** Re-checks every claim against the corpus: quotes verbatim, values present, no selectors, no duplicate names per page, value sets wired, no dangling edges. Exits non-zero on ERROR. |

`validate-graph.py` is the accuracy backstop. It found 32 errors that four rounds of adversarial
LLM review had missed. Run it every time.

---

## What remains

| Work | Pages | Notes |
|---|---|---|
| **Group 5B** | 4 | Tax Administration, Budget Configuration, List Management, Company Locations |
| **Group 3 — PO Matching** | 11 | Build **new-first**; it has a documented New Experience variant |
| **Workflows** | 13 | Was in the lost slice |
| **Group 6 — Compliance** | 3 | Peppol Configuration, Shipping Configuration, Localization |
| Group 7 — Ops | ? | Deferred unless asked |

### Open debt

- **Repair can ADD fields.** One run returned 17 records from 14 inputs. All were grep-grounded,
  but **additions never face the adversarial refuter** — mis-assignment to the wrong page is
  exactly what grep cannot catch. Constrain Repair to one record per input; report genuine splits
  separately for refutation.
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
