# Resume prompt

Paste this into a fresh session. Everything else is on disk.

---

```
Continue the Concur Invoice config knowledge-graph build.

Read these two files first, in order:
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/2026-08-31_HANDOFF-KG-BUILD-v2.md
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/WHERE-WE-LEFT-OFF.md

The handoff is authoritative — schema, method, prompt rules, open debt, and the blind-build
constraint that governs everything. Do not re-derive any of it.

Next task: Group 5B — Tax Administration, Budget Configuration, List Management, Company
Locations.

Build it exactly like Group 5A. The working script is at
  /tmp/claude-1000/.../scratchpad/g5a.mjs
but that path is session-scoped and probably gone; if so, reconstruct the workflow from the
method section of the handoff. Validate any workflow script with `node --check` inside an async
wrapper BEFORE launching — a top-level `return` is legal in the workflow runtime but not in a
plain module, so wrap it to check. A brace error in a compressed JSON schema literal cost a
launch once; write schemas expanded, not on one line.

One change from 5A: constrain the Repair prompt to return AT MOST ONE record per input field.
In 5A it returned 17 records from 14 inputs, and fields created during Repair are only
grep-grounded — they never face the adversarial refuter, so a wrong page assignment would pass.
Any genuine split must be reported separately for refutation instead.

After the workflow returns:
  1. Save critic, mapping, and the full result JSON into output/reports/ with a date prefix.
  2. BUILD_DATE=<today> python3 bin/merge-group.py <raw-result.json> "Group 5 — Data Structure & Accounting" --patch
     (--patch because Group 5A already owns that group label; a plain merge would delete its pages.)
  3. python3 bin/apply-corrections.py
  4. python3 bin/validate-graph.py    # must exit 0 before committing
  5. Append a section to output/kg-build-log.md, update docs/WHERE-WE-LEFT-OFF.md, commit, push.

Report: node counts, what the critic found, and anything the validator caught. Be blunt about
defects — every real improvement in this project came from taking the critic seriously.

Ultracode is on and accuracy is the priority over token cost. Do not cheapen the adversarial
refuter or the critic.
```

---

## After 5B, in order

1. **Group 3 — PO Matching** (11 pages). Build **new-first** — it has a documented New Experience
   variant, and building it right now beats retrofitting it later.
2. **Workflows** (13 pages).
3. **Group 6 — Compliance / E-Invoicing** (3 pages).
4. **Remediation sweep** — Audit Rules alias collapse, range expansion to the true 492 catalog
   names, New Experience retrofit over Groups 1–2, the Group 1 critic's named missing fields, and
   the one accepted `knownGap`.

Set `meta.status = "COMPLETE"` only when every non-deferred group is in and
`bin/validate-graph.py` exits 0.
