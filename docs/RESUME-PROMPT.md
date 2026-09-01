# Resume prompt — paste-ready

_Last updated: 2026-09-01. Copy the block below into a fresh session._

---

Continue the Concur Invoice config knowledge-graph build. Next job: **Workflows Run B**
(Email Reminders + Delegate Configurations). Approval Authority is DONE.

Read these three files first, in order:
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/2026-08-31_HANDOFF-KG-BUILD-v2.md
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/WHERE-WE-LEFT-OFF.md
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-build-log.md  (the
    **Approval Authority** section — it carries six toolchain fixes and two corrected falsehoods)

v2 is the authoritative method. The graph is at **23 pages / 617 fields**, `validate-graph.py`
exits 0 and `bin/check-approval-authority.py` exits 0. Keep it that way.

**START FROM `workflows/2026-08-31_kg-workflows-run-a.mjs`** and turn the per-group knobs.

## Do this before you write a line of the script

**DIFF THE SCRIPT AGAINST ITS PARENT AND READ EVERY HUNK THAT DID NOT CHANGE.** This is now the
third time an unchanged prompt in a script about a different page has been the defect. On the
Approval Authority run a pre-flight audit found 23 stale passages — including an `ALREADY_BUILT`
constant, injected into all six agent families, that told every agent the page they were building
was out of scope and *"is NOT a page for you to build."* The handoff had said to change exactly one
thing. It was wrong. Budget a real stale-content pass.

The parse check, because neither raw `node --check` nor a bare async wrapper works on a Workflow
script (it legally carries BOTH a top-level `export const meta` and a top-level `return`):

```bash
printf 'async function __w(){\n' > /tmp/chk.mjs \
  && sed 's/^export const meta/const meta/' workflows/<script>.mjs >> /tmp/chk.mjs \
  && printf '\n}\n' >> /tmp/chk.mjs && node --check /tmp/chk.mjs && echo PARSE OK
```

Also grep the WHOLE toolchain, not just the workflow file. **Ten** defects have been found that way
across three sessions and every one was latent for every future group.

## Run B specifics

1. **⚠ MERGE WITH `--patch`, AND PASS `--patch-page "Workflows"` TO `assemble-parts.py`.**
   The label `Workflows` exists, so a NON-patch merge deletes Run A's 121 fields. But the earlier
   claim that `patchPage` comes from the workflow's return value, and that "`--patch` strips
   nothing", was **FALSE**: it comes from `assemble-parts.py --patch-page`, and `--patch` with a
   null `patchPage` deletes every node minted by every non-patch merge (436 deps → 115, measured)
   while `validate-graph.py` still exits 0 over the wreckage. `merge-group.py` now aborts on that
   combination — but pass the flag, do not rely on the guard.
2. **`NAV_SCHEMA` is FIXED — copy it verbatim from
   `workflows/2026-09-01_kg-authorized-approval-limits.mjs`.** Link 1 of the three-link `tabs` chain
   is closed and proven end-to-end. Email Reminders has two tabs and Delegate Configurations two,
   so the old schema would have silently dropped all four.
3. **Exactly ONE file is shared with Run A** — `delegate-self-approval-1b627285.md` (1,284 B) — and
   its field belongs to the Workflows **General** page. **Run B must not extract it.**
4. Extra seeds the recon completeness critic named (finding 6): `pre-defined-rules-220a1fe7.md`,
   `overview-8b2c769e.md`,
   `best-practices-when-localizing-subject-and-email-message-fields-48515f40.md`,
   `terminology-e1e1ed99.md`, `overview-8b2ba917.md`.
5. Drop the `"two user interfaces"` UI hint from Delegate Configurations — 2014 boilerplate present
   in 40 files, not a page property.

## Scope, settled — do not re-litigate

`Administration > Company` is **no longer a blanket exclusion**. Luke reversed that on 2026-09-01
and Authorized Approval Limits was built. Menu location is not product scope. The general **User
Administration user profile** and the **Employee Import** stay unbuilt, but for a DOCUMENTARY reason
— both defer to external *Shared* guides absent from this corpus — never a menu one. Six built nodes
asserted the old rule and all six were repaired; do not reintroduce it.

## After the workflow returns

  0. **CHECK `agents_error`** — a workflow that reports success is not a visible failure.
     Resume with `Workflow({scriptPath, resumeFromRunId})` if any errored.
  1. `python3 bin/assemble-parts.py <parts-dir> <out.json> --journal <journal.jsonl>
     --group "Workflows" --patch-page "Workflows"`
     **`--journal` is REQUIRED** — navPathEvidence, roleGates, aliases, documentedBasis and
     identityNotes are ALL recovered from it, and without it the page merges empty with nothing in
     the validator to catch it.
  2. **Read BOTH critics in full and VERIFY THEIR CLAIMS YOURSELF before acting.** They are usually
     right and they earn their cost — but an observation is reliable while an inference about its
     cause is a hypothesis. On the last run three critic claims did not survive checking: two
     "blockers" were artefacts of the critic's own simulation and gate wording, and one critic
     retyped a quote with a curly apostrophe the corpus writes as ASCII. Two critics agreeing
     independently is the strongest signal this pipeline emits; two critics DISAGREEING is two
     findings, not a tie to break.
  3. `BUILD_DATE=<today> python3 bin/merge-group.py <out.json> "Workflows" --patch`
  4. `python3 bin/apply-corrections.py`
  5. `python3 bin/validate-graph.py`   # MUST exit 0
  6. Save critics, mapping, raw result and the parts into `output/reports/` with a date prefix.
  7. Append to `output/kg-build-log.md`, update `docs/WHERE-WE-LEFT-OFF.md`, commit.

Then: **Group 6** (Peppol / Shipping / Localization). Then the remediation sweep — the highest-value
item there is the **Invoice Settings rebuild** (13 fields against a source documenting ~34, and a
Workflows edge already points at one of the missing rows). Scope it as a full page rebuild owning
the page's entire source set, never as "add the missing N": `--patch` REPLACES a page's fields
wholesale.

**When you dedupe Audit Rules, do NOT dedupe against its 91-entry roster** — that count is inflated
by roughly 8 (seven labels appear two or three times), so anything deduping against the list
propagates the error. Dedupe on SOURCE FILES instead.

## Standing constraints

- **Blind build from documentation.** Corpus gaps are properties of the docs, not a validation
  backlog against a live tenant.
- **THE CORPUS IS FROZEN while a build runs.** No re-crawls, prunes or edits to
  `PROJECTS/concur-corpus` — agents read those files directly and `validate-graph.py` re-verifies
  every quote against them afterwards. Investigate freely; defer any write. Prove the freeze held
  with `git -C ../concur-corpus status --porcelain`.
- **Accuracy over token cost. Never cheapen the refuters or the critics.**
- `sourceQuote` verbatim on every field. No quote, no node. No CSS selectors. No tenant values.
- **Check what the pipeline DISCARDS, not only what the agents produce.** Two of the last run's real
  gains came from that.
- **`grep` on this machine is ugrep**, not GNU grep: `grep -P '\xc2\xa0'` returns a SILENT ZERO even
  under `LC_ALL=C`. Use `grep -P '\x{00a0}'`, or python for a definitive count.
- Date-prefix any new loose file `YYYY-MM-DD_`. No customer PII, pricing, or deal data.

**PARKED — do not touch:** `PROJECTS/concur-corpus` has 2 unpushed commits. Pushing redeploys the
genie. Luke parked that decision; do not push it as a side effect of anything else.

Ultracode is on and accuracy is the priority over token cost.
