# Resume prompt — paste-ready

_Last updated: 2026-09-01. Copy the block below into a fresh session._

---

Continue the Concur Invoice config knowledge-graph build. Next job: **Approval Authority**
(the Authorized Approval Limits page). The build script is already written and has never been run.

Read these three files first, in order:
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/2026-08-31_HANDOFF-KG-BUILD-v2.md
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/2026-09-01_HANDOFF-APPROVAL-AUTHORITY-AND-RUN-B.md
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/WHERE-WE-LEFT-OFF.md

v2 is the authoritative method — schema, phases, prompt rules, the blind-build constraint. The
2026-09-01 handoff is the job brief and carries what changed since v2. Don't re-derive either.
The graph is at 22 pages / 607 fields and validate-graph.py exits 0. Keep it that way.

**The script is `workflows/2026-09-01_kg-authorized-approval-limits.mjs` and it is READY.**
Change exactly ONE thing: `const PARTS` points at a previous session's scratchpad — repoint it at
yours. `GROUP` ('Approval Authority'), the step-id prefix, `PAGES` and the deliberately-absent
`patchPage` are all already correct. Validate with `node --check` inside an async wrapper before
launching (top-level `return` is legal in a workflow script).

DO NOT re-litigate whether this page is in scope. It is. An earlier draft of this repo argued it
sat outside the Invoice admin surface because its click path is Administration > Company; that
used MENU LOCATION as a proxy for PRODUCT SCOPE and was wrong. It configures Concur Invoice via
the NON-PO capability: a PO-based invoice carries approval authority on the purchase order, a
non-PO invoice has none, so the approver's authorization limit IS the authority. The corpus states
the direction outright in tools-guides/workflow-and-approval-routing-8b4ff6c9.md. The script header
carries the full evidence. Frame it as "Invoice configuration reached through the Company admin
menu", never as out-of-product.

THE CENTRAL RISK, and the reason this is a pipeline run rather than seven hand-written nodes: the
built Workflows page ALREADY owns four controls whose labels collide with this page — "Approval
Limit", "Level", "Can approve exception", "Approver" — all from the Authorized Approver List tab.
The corpus says ONE value has THREE setter surfaces ("The amount is set for each approver in the
Authorized Approver List, in User Administration, or in the employee import"). So the job is not
"find the fields", it is: for each control, is this a genuinely different surface or the same value
written down twice? A duplicate is INVISIBLE to bin/validate-graph.py — it checks quotes against
files, never controls against pages. Expect roughly SEVEN fields. If it returns fifteen, treat that
as a warning sign, not a win.

GREP THE WHOLE TOOLCHAIN for stale tags before you run, not just the workflow file. Four defects
have been found that way and every one was latent for every future group — the newest was
`group_tag()` calling an undefined `slug()` in bin/assemble-parts.py, on a branch that had never
executed in the project's history. Also remember a data path has more than one link: the `tabs`
chain is NAV_SCHEMA → assemble-parts → merge-group, and fixing only the last one and reporting it
done is a mistake already made once here.

After the workflow returns:
  0. CHECK `agents_error` ON THE RUN — a workflow that reports success is not a visible failure.
     Resume with Workflow({scriptPath, resumeFromRunId}) if any errored.
  1. python3 bin/assemble-parts.py <parts-dir> <date>_approval-authority-raw-result.json \
       --journal <journal.jsonl> --group "Approval Authority"
     --journal is REQUIRED: navPathEvidence is recovered from it, and without it every page merges
     with an empty navPath and nothing in the validator will catch it. --group is required too.
  2. Read BOTH critics in full and VERIFY THEIR CLAIMS YOURSELF before acting. They are usually
     right — but an observation is reliable while an inference about its cause is a hypothesis.
     Two critics agreeing independently is the strongest signal this pipeline emits. Two critics
     DISAGREEING is two findings, not a tie to break.
  3. BUILD_DATE=<today> python3 bin/merge-group.py <raw-result.json> "Approval Authority"
     NO --patch. 'Approval Authority' is a NEW label, so the merge touches nothing already in the
     graph. (Using --patch, or reusing an existing label, is the sharpest footgun in this repo.)
  4. python3 bin/apply-corrections.py     # add this group's fixes there
  5. python3 bin/validate-graph.py        # MUST exit 0 before committing
  6. Save critics, mapping, raw result and the parts into output/reports/ with a date prefix.
  7. Append to output/kg-build-log.md, update docs/WHERE-WE-LEFT-OFF.md, commit.

Then: **Workflows Run B** (Email Reminders + Delegate Configurations) — merged WITH --patch, and
fix NAV_SCHEMA's missing `tabs` property first. Then Group 6. Details in the 2026-09-01 handoff.

THE CORPUS IS FROZEN while a build runs. No re-crawls, prunes or edits to PROJECTS/concur-corpus:
agents read those files directly and validate-graph.py re-verifies every quote against them
afterwards. Investigate freely (reading, and refetching a live source_url, is safe), but defer any
write.

PARKED — do not touch: PROJECTS/concur-corpus has 2 unpushed commits. Pushing redeploys the genie.
Luke parked that decision; do not push it as a side effect of anything else.

Report: node counts, what the critics found, what the validator caught, and the boundary verdict on
the four colliding controls. Be balanced — the biggest improvements in this project have come from
taking the critic seriously and from checking what the pipeline DISCARDS, not only what the agents
produce.

Ultracode is on and accuracy is the priority over token cost. Do not cheapen the refuters or the
critics.
