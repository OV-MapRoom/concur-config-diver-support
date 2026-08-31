# Resume prompt

Paste this into a fresh session. Everything else is on disk.

---

```
Continue the Concur Invoice config knowledge-graph build.

Read these two files first, in order:
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/2026-08-31_HANDOFF-KG-BUILD-v2.md
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/WHERE-WE-LEFT-OFF.md

The handoff is authoritative — schema, method, architecture, prompt rules, open debt, and the
blind-build constraint that governs everything. Don't re-derive any of it.

Next: Group 3 — PO Matching. 11 pages, and their names and paths were NOT preserved in the
handoff, so the Map phase has to re-derive them from the corpus before anything else runs.

Build it from workflows/2026-08-31_kg-group-5b.mjs — the exact script as run for 5B, preserved in
the repo. Its header lists the five things to change per group. Do NOT re-author it from scratch
and do NOT thin out the preamble, the eleven rules, the lens charters or the refuter framings;
every line of that is a defect this project already paid for.

Four things that will bite otherwise:

- Group 3 is a NEW group label, so merge WITHOUT --patch and drop `patchPage` from the workflow's
  return. (--patch was only needed for 5B because 5A already owned the "Group 5" label.)
- Pass --journal to bin/assemble-parts.py. navPathEvidence is recovered from the workflow journal,
  and without it every page merges with an empty navPath — which the validator does not check, so
  it fails silently. navPath is the load-bearing field: a direct goto on an admin URL bounces via
  dcredirect, so pages are reached by clicking.
- Validate the workflow script with `node --check` inside an async wrapper before launching (a
  top-level `return` is legal in the workflow runtime but not in a plain module). Write JSON
  schemas expanded, not on one line.
- Contradictions and compressed ranges are NODE TYPES now (docs/SCHEMA.md), emitted by the fourth
  Synthesize agent. Every contradiction reading needs its OWN verbatim quote; fewer than two
  grounded readings is not a contradiction and must be dropped. Group 3 is the group most likely to
  produce them, since it is the one with a documented legacy/New Experience split on both sides.
- 11 pages is ~73 agents in one run, roughly 3-4 hours at 5B's rate. Consider splitting 3A/3B — in
  which case the SECOND merge needs --patch and a `patchPage` label, exactly as 5B did.

BUILD NEW-FIRST. Group 3 has a documented New Experience variant, and
policies-the-purchase-order-policy-new-experience-* (15,800 bytes) beside its legacy twin (1,490)
is the trap that damaged Groups 1-2 — they were built from the stub. Read both twins, and only
claim uiVariant "both" when you actually did.

After the workflow returns:
  1. python3 bin/assemble-parts.py <parts-dir> output/reports/<date>_group3-raw-result.json \
       --journal <journal.jsonl> --group "Group 3 — PO Matching"
     Read both critics in full before merging, and verify their actionable claims yourself before
     acting on them — they are usually right, and on 5B one dry-run finding was already stale.
     CHECK agents_error ON THE RUN FIRST. A refuter died mid-response inside a workflow that
     reported completion; resuming it repaired 18 of 24 nodes. If an agent errored, resume with
     Workflow({scriptPath, resumeFromRunId}) before trusting anything downstream of it.
  2. BUILD_DATE=<today> python3 bin/merge-group.py <raw-result.json> "Group 3 — PO Matching"
  3. python3 bin/apply-corrections.py
  4. python3 bin/validate-graph.py    # must exit 0 before committing
  5. Save critic, mapping, raw result and the part files into output/reports/ with a date prefix.
  6. Append to output/kg-build-log.md, update docs/WHERE-WE-LEFT-OFF.md, commit, push.

Report: node counts, what the critics found, and anything the validator caught. Be blunt about
defects — every real improvement in this project came from taking the critic seriously, and on 5B
the biggest find was a PLUMBING gap, not a reading gap: the merge had no reader for orphan value
sets and would have silently deleted 323 enumerated values including a 249-row catalog. Check what
the pipeline discards, not only what the agents produce.

Ultracode is on and accuracy is the priority over token cost. Do not cheapen the adversarial
refuters or the critics.
```

---

## After Group 3, in order

1. **Workflows** (13 pages, from the lost slice).
2. **Group 6 — Compliance / E-Invoicing** (3 pages: Peppol, Shipping, Localization).
3. **Remediation sweep** — Audit Rules alias collapse (91 entries encode ~68 controls), range
   expansion to the true 492 catalog names, New Experience retrofit over Groups 1–2, the Group 1
   critic's named missing fields, the Group 5B remediation list, the 23 Group 2
   `step-references-unknown-field` warnings, and the one accepted `knownGap` from 5A.

Set `meta.status = "COMPLETE"` only when every non-deferred group is in and
`bin/validate-graph.py` exits 0.
