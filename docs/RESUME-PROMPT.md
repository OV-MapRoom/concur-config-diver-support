# Resume prompt

Paste this into a fresh session. Everything else is on disk.

_Current as of 2026-08-31, after Group 3. Supersedes the Group 3 version of this file._

---

```
Continue the Concur Invoice config knowledge-graph build. Next group: Workflows.

Read these three files first, in order:
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/2026-08-31_HANDOFF-KG-BUILD-v2.md
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/2026-08-31_HANDOFF-WORKFLOWS.md
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/WHERE-WE-LEFT-OFF.md

v2 is the authoritative method — schema, phases, prompt rules, the blind-build constraint.
The WORKFLOWS handoff is the group brief and carries what changed since v2. Don't re-derive
either. The graph is at 20 pages / 486 fields and validate-graph.py exits 0; keep it that way.

RUN A PAGE RECON FIRST. Do not write the build workflow until it returns.

The lost map says "Workflows — 13 pages of workflow config", and that number is not
trustworthy. Group 3 carried an identical claim of 11 pages and the real answer was 2; the
other nine were dialogs, tabs, sections on an already-built page, and settings tables the
corpus places elsewhere. The map counted SURFACES, not pages — its own Workflows line puts 13
pages under ONE left-menu entry, which is the tell. 13 is an upper bound, not a target.

Why this is not optional: every field is filed under a page, and page mis-assignment is the one
defect class bin/validate-graph.py provably cannot catch — it checks quotes against files, never
controls against pages. Five groups were built against unverified rosters. Group 3 was the first
checked and the check moved the answer by nine pages.

Build the recon from workflows/2026-08-31_kg-group3-page-recon.mjs — the exact script as run
(9 agents, 1.91M tokens, both critics endorsing). Change the six sweep charters to the workflow
domain, the reconciliation target to 13, the already-built list to the current 20 pages, and OUT
to this session's scratchpad. KEEP ALL SIX SWEEPS — they are blind to each other by design and
the convergence across six independent angles is what made Group 3's answer trustworthy. Keep
sweep E especially: the existing graph's own forward references are independent corroboration
written by agents who had no roster. Workflows already has 9 unresolved endpoints naming it,
Feature Hierarchies 4, and Purchase Order / Purchase Request Settings 1 each.

Five things the recon must settle, all inherited findings — confirm or refute them, don't assume:
  1. Purchase Order Settings and Purchase Request Settings belong to WORKFLOWS, not Invoice
     Settings. The Group 3 recon settled this; reproduce the clincher — `select their own
     approver` returns 0 in available-invoice-settings-8b3411f0.md and 2 in
     invoice-settings-cace748d.md. Both files carry a PROSE range ("Type a number from one to
     99") that no digit-based regex will find.
  2. Is "Workflows" one page with tabs or several pages? The graph already references Workflows,
     Workflows > Settings tab, Email Notifications tab, and Approval Statuses > Purchase Request.
     Audit Rules precedent: one page, three tabs, don't split. Forms and Fields precedent: one
     label, two real pages, don't collapse. Settle it on click-path evidence.
  3. Does Feature Hierarchies belong to this group? Real left-menu page, real workflow
     prerequisite, currently unclaimed by any group, 4 endpoints already name it.
  4. Where is the boundary against the already-built Routing Configuration (Group 2, 10 fields)?
     Do not re-home its fields.
  5. End-user traps. The workflow domain is thick with approver-side runtime screens. A screen an
     approver uses is not a config page — but say where its governing settings live.

Then build from workflows/2026-08-31_kg-group-3.mjs (the most recent, already carrying the
current preamble and text traps). Change only: PAGES, GROUP, the step-id prefix, PARTS, and
patchPage (absent for a new group label — Workflows is new, so merge WITHOUT --patch). Fold the
recon critics' seed corrections into the page briefs rather than shipping the raw roster.

GREP THE WHOLE TOOLCHAIN for the previous group's tag, not just the workflow file. Handoff v2
lists five per-group knobs and all five are in the workflow; two more were found hiding in
bin/assemble-parts.py (a hard-coded step prefix, and --group/--patch-page defaulting to another
group's values so a run silently produced a result tagged for the wrong group). Both are fixed,
but the lesson is that a documented knob list goes stale silently.

Validate the script with `node --check` inside an async wrapper before launching (a top-level
`return` is legal in the workflow runtime but not in a plain module). Write JSON schemas
expanded, not on one line.

After the workflow returns:
  0. CHECK agents_error ON THE RUN FIRST. A failed agent inside a workflow that reports success
     is not a visible failure. Resume with Workflow({scriptPath, resumeFromRunId}) if any errored.
  1. python3 bin/assemble-parts.py <parts-dir> output/reports/<date>_workflows-raw-result.json \
       --journal <journal.jsonl> --group "<the group label>"
     --journal is REQUIRED: navPath is recovered from it, and without it every page merges with
     an empty navPath and nothing in the validator will catch it. --group is now required too.
  2. Read BOTH critics in full and VERIFY THEIR ACTIONABLE CLAIMS YOURSELF before acting. They
     are usually right — and on Group 3 one confident causal inference was flatly wrong (a file
     ending in a bare "x" was called a crawl truncation; SAP publishes it that way). An
     observation is reliable; an inference about its cause is a hypothesis.
     Two critics agreeing independently is the strongest signal this pipeline emits. Two critics
     DISAGREEING is two findings, not a tie to break — on Group 3 they split on merge/don't-merge
     and were both right about different things.
  3. BUILD_DATE=<today> python3 bin/merge-group.py <raw-result.json> "<the group label>"
  4. python3 bin/apply-corrections.py    # ALWAYS after a merge; add this group's fixes there
  5. python3 bin/validate-graph.py       # MUST exit 0 before committing
  6. Save critics, mapping, raw result and the part files into output/reports/ with a date prefix.
  7. Append to output/kg-build-log.md, update docs/WHERE-WE-LEFT-OFF.md, commit.

THE CORPUS IS FROZEN while the build runs. No re-crawls, prunes or edits to PROJECTS/concur-corpus:
agents read those files directly and validate-graph.py re-verifies every quote against them
afterwards. Investigate freely (reading and refetching a live source_url is safe, as is
`npm run audit` there), but defer every write.

PARKED — do not touch: PROJECTS/concur-corpus has 2 unpushed commits. Pushing redeploys the genie.
Luke parked that decision; do not push it as a side effect of anything else.

Report: node counts, what the recon found versus the claimed 13, what the critics found, and
anything the validator caught. Be blunt about defects — every real improvement in this project has
come from taking the critic seriously, and the two biggest finds of the last two runs were a
PLUMBING gap and a PAGE ROSTER that was wrong by nine pages. Check what the pipeline discards and
what it never questioned, not only what the agents produce.

Ultracode is on and accuracy is the priority over token cost. Do not cheapen the refuters or the
critics.
```

---

## After Workflows, in order

1. **Group 6 — Compliance / E-Invoicing** (3 pages: Peppol, Shipping, Localization). A complete
   6-step Localization click path already sits in
   `step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md` lines 102–110.
   Run a recon here too, but expect it to be cheap — three named pages with real click paths.
2. **The remediation sweep.** Highest-value first: the **Invoice Settings rebuild** (13 of 24
   documented rows, and a Group 3 edge already points at one of the 11 missing); the Audit Rules
   alias collapse (91 entries ≈ 68 controls); the New Experience retrofit over Groups 1–2; range
   expansion to the true 492 catalog names; the 23 `step-references-unknown-field` warnings; and
   Group 3's debt item 8.
   Scope every one of these as a **page rebuild owning that page's full source set** — `--patch`
   REPLACES a page's fields, so a narrow patch deletes what it does not re-derive.
3. **Group 7 — Ops.** Deferred unless Luke asks.

Set `meta.status = "COMPLETE"` only when every non-deferred group is in and
`bin/validate-graph.py` exits 0.
