# Handoff — Workflows group (the last big build)

**Filed:** 2026-08-31
**For:** A fresh Claude instance with no prior context
**Repo:** https://github.com/OV-MapRoom/concur-config-diver-support (public, `main`)
**Read first:** `docs/2026-08-31_HANDOFF-KG-BUILD-v2.md` (authoritative method), then
`docs/WHERE-WE-LEFT-OFF.md` (current state). This file is the Workflows-specific brief and does
not repeat either.

---

## State at filing

**20 pages · 486 fields · 375 dependencies · 34 steps · 80 value sets (850 values) ·
36 contradictions · 12 compressed ranges. `bin/validate-graph.py` exits 0, ERROR-clean.**

Built: Groups 1, 2, 3, 4, 5A, 5B. Remaining: **Workflows**, **Group 6** (Peppol / Shipping /
Localization), then the remediation sweep. Group 7 (Ops) stays deferred unless Luke asks.

---

## The job: Workflows — and DO NOT trust the number 13

`INVOICE-CONFIG-MAP.md` records *"Workflows | (path not preserved in handoff) | Built in the lost
vertical slice — 13 pages of workflow config"*.

**Treat 13 as an upper bound on surfaces, not a page count.** Group 3 carried an identical claim —
"11 pages" — and a dedicated recon found the real answer was **2**. The other nine were dialogs,
tabs, sections on an already-built page, and two settings tables the corpus places elsewhere. The
lost map's counting unit was demonstrably sub-surfaces: its own Workflows line puts **13 pages
under ONE left-menu entry**, which is exactly the tell.

So: **run a page recon FIRST, as its own workflow, before writing the build.**

### Why this is not optional

Every field is filed under a page. Page mis-assignment is the one defect class
`bin/validate-graph.py` **cannot** catch — it checks quotes against files, never controls against
pages. Five groups were built against rosters inherited from the lost map with nothing verifying
the roster itself. Group 3 is the first that was checked, and the check moved the answer by 9
pages. Nine agents of recon avoided roughly 65 agents of building pages that do not exist.

### The recon template

`workflows/2026-08-31_kg-group3-page-recon.mjs` — run `wf_a2215035-e91`, 9 agents, 1.91M tokens,
~55 min. Six blind sweeps → a merge → two adversarial critics. Adapt it by changing:

- the six **sweep charters** (domain terms, the specific ambiguities to settle)
- the **reconciliation target** (13 for Workflows, and the instruction not to pad or trim to it)
- the **already-built list** (20 pages now, not 18)
- `OUT` — the current session's scratchpad

Keep all six sweeps. They are deliberately blind to each other and enter from different
directions; the convergence across six independent angles is what made the Group 3 answer
trustworthy. In particular keep **sweep E (the existing graph's own forward references)** — four
completed groups had blindly named the right two PO pages in their unresolved endpoints, which was
free corroboration nobody had been using. Workflows currently has **9** unresolved endpoints
naming it, plus the whole `step-references-unbuilt-page` warn class. That is a strong starting
signal.

### What the recon must settle for Workflows specifically

Carry these into the sweep charters — they are the known ambiguities, from the Group 3 recon's own
deferred list and from the existing graph:

1. **`Purchase Order Settings` and `Purchase Request Settings` belong to Workflows, not Invoice
   Settings.** The Group 3 recon settled this against the corpus and it is the single most
   load-bearing inherited finding. Proof it reproduced: `select their own approver` returns 0 in
   `available-invoice-settings-8b3411f0.md` and 2 in `invoice-settings-cace748d.md`.
   `purchase-request-settings-b0bce285.md` (admin-guides, 3,735 B) is a 3-row Setting|Description
   table; `purchase-order-settings-a5a997b4.md` is its 1-row sibling. Both carry a **prose numeric
   range** — *"Type a number from one to 99"* — which **no digit-based range regex will find**.
2. **Is "Workflows" one page with tabs, or several pages?** The graph already carries endpoint
   references to `Workflows`, `Workflows > Settings tab`, `Email Notifications tab`,
   `Approval Statuses > Purchase Request`. Audit Rules precedent: one page, three tabs, do not
   split. Forms and Fields precedent: one label, two genuinely distinct pages, do not collapse.
   Settle it with click-path evidence, not intuition.
3. **`Feature Hierarchies`** is a real left-menu page (*"Click Feature Hierarchies (left menu)."*)
   and a genuine workflow prerequisite, but the Group 3 recon judged it not PO-domain and left it
   unclaimed by any group. **Decide whether it belongs to Workflows.** Four dependency endpoints
   already name it.
4. **Workflow vs approval vs routing.** `Routing Configuration` (Group 2, 10 fields) is already
   built. Establish the boundary and do not re-home its fields.
5. **End-user traps.** The workflow domain is thick with approver-side runtime screens. Same trap
   the PO area had: a screen an approver uses is not a config page, but the settings that govern it
   are — say where they live.

---

## Method changes since handoff v2 — these are now standard

Everything in v2 still holds. Five additions from the Group 3 run:

1. **Recon-before-build** whenever a group's roster comes from the lost map (i.e. all remaining
   groups). Its output is the `PAGES` array of the build workflow, with the critics' seed
   corrections folded into the page briefs rather than the raw roster.
2. **A critic's observation is reliable; its causal inference is a hypothesis.** The Group 3
   completeness critic correctly observed that one corpus file ends in a bare `x` and is the only
   one that does — then inferred a crawl truncation and was **wrong**. `help.sap.com` serves
   `<p class="p">x</p>`; re-converting the live body reproduces the file byte-for-byte. Verify the
   cause before acting on it or reporting it. See `PROJECTS/concur-corpus/README.md` →
   *Auditing the corpus*, and `npm run audit` there.
3. **Two critics agreeing independently is the strongest signal the pipeline emits.** Both Group 3
   critics flagged the same unearned `uiVariant: "both"` without seeing each other's work; it was
   the highest-confidence finding of the run. Conversely they split on merge/don't-merge and were
   **both right about different things** — a split is two findings, not a tie to break.
4. **Grep the whole toolchain for the previous group's tag, not just the workflow.** Handoff v2
   lists five per-group knobs, all in the workflow file. Two more lived in `bin/assemble-parts.py`
   and are now fixed — but the lesson is that a documented knob list goes stale silently.
5. **`--patch` REPLACES a page's fields; it does not add to them** (`merge-group.py:60-64`). So a
   narrowly-scoped patch onto a built page deletes what it does not re-derive. Scope every patch as
   a **page rebuild owning that page's full source set**, never as "add these N fields."

### Census calibration — every mechanical count in this corpus needs it

Three separate under-counts cost real time on Group 3. A census returning **0** deserves more
suspicion than one returning many:

| Census | Trap | Fix |
|---|---|---|
| `grep -c '^| '` | SAP indents tables nested in numbered steps. One seed: **0** vs **22**. | `grep -cP '^\s*\|'` |
| `grep -c '<tr'` | A 21-entry catalog packed its whole payload into **one** `<tr>` as 25 `<p>` cells. | count `<p` inside the table too |
| `grep -c '<table'` | Matches prose — `<table name and permission name>` inside a quoted error message. | require `<table>` or `<table attr=` |
| `deliverable_id` | A **per-directory constant** (41460672 / 41460673). Carries zero information. | `loio` is the per-topic id |

---

## Two open tooling improvements, neither blocking

1. **The validator's "verbatim" is normalized, not byte-exact.** `norm()` in
   `bin/validate-graph.py` lowercases and collapses dash variants, curly quotes and whitespace.
   Measured 2026-08-31: **484 of 486 quotes are byte-exact**; 2 pass only after normalization (both
   legacy Group 1/2 nodes). Small in magnitude, but it normalizes away precisely the
   en-dash-vs-hyphen class this project treats as load-bearing for a driver matching UI strings.
   Worth reporting byte-exact and normalized-only as separate counts.
2. **An edge whose target page EXISTS but whose field does not is invisible.** `dep.g1.057/058`
   targeted `{Purchase Order Configuration, "PO Configuration"}` — the page name written into a
   field slot. They would have dangled forever while looking like they were merely awaiting an
   unbuilt page, and they are currently counted among the 239 `awaiting-unbuilt-page`. That is a
   different, cheaply checkable defect and deserves its own validator class.

---

## Open debt — read `docs/WHERE-WE-LEFT-OFF.md` for the full list

Highest-value, unchanged by this session: the **Invoice Settings rebuild** (13 of 24 documented
rows; a Group 3 edge already points at one of the 11 missing rows), the **Audit Rules alias
collapse** (91 entries ≈ 68 controls), the **New Experience retrofit** over Groups 1–2, and the
**Audit Rules catalog's true size of 492, not 278**.

Added by Group 3 as debt item 8: `Receipt Type` is absent from the entire graph; the never-opened
`concur-receiving-roles-099f375f.md` admin twin disagrees with its extracted tools twin
(mandatory vs optional Receipt User role); a 21-entry copy-down catalog in `f926eac7`; and six
documented buttons on Purchase Order Configuration reported in `splitsProposed` but never created.

---

## Standing constraints — do not relax

- **Blind build from documentation.** Corpus gaps are properties of the docs, not a validation
  backlog against a live tenant.
- **The corpus is FROZEN during a build.** No re-crawls, prunes or edits to
  `PROJECTS/concur-corpus` while a group build is running: agents read those files directly and
  `validate-graph.py` re-verifies every quote against them afterwards. Investigate freely, defer
  the write. Prove the freeze held with
  `git show --name-only <commit> | grep -E '^(CONCUR_|SAP_)'`.
- **Accuracy over token cost.** Never cheapen the refuters or the critics.
- **Thin stays thin**, and a thin page must carry `documentedBasis` + `verifyNotes` saying why.
- Date-prefix any new loose file `YYYY-MM-DD_`. No customer PII, pricing, or deal data.

---

## Parked, deliberately — not for this session

`PROJECTS/concur-corpus` has **2 unpushed commits** (`b989ee6` the corpus audit, `fbd8751` the
findings note). Pushing redeploys the genie via Netlify. The change is scripts and docs only and
cannot alter what is served. **Luke parked this decision on 2026-08-31. Do not push it as a side
effect of anything else** — it is his call whether to redeploy now or let it ride to the next
monthly corpus refresh.
