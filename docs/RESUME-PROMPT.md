# Resume prompt — paste-ready

_Last updated: 2026-09-01. Copy the block below into a fresh session._

---

Continue the Concur Invoice config knowledge-graph build. Next job: **Group 6 — Compliance /
E-Invoicing** (Peppol Configuration, Shipping Configuration, Localization). Workflows Run B is DONE
and the Workflows group is complete.

Read these three files first, in order:
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/2026-08-31_HANDOFF-KG-BUILD-v2.md
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/docs/WHERE-WE-LEFT-OFF.md
  /mnt/c/Users/manci/PROJECTS/concur-config-diver-support/output/kg-build-log.md  (the last TWO
    sections: **Approval Authority** and **Workflows Run B**)

The graph is at **25 pages / 674 fields**, `validate-graph.py` exits 0 and
`bin/check-approval-authority.py` exits 0. Keep it that way.

**START FROM `workflows/2026-09-01_kg-workflows-run-b.mjs`** — the most corrected script in the repo.
`Group 6 — Compliance / E-Invoicing` is a NEW label, so the merge runs **WITHOUT `--patch`** and you
do NOT pass `--patch-page`.

## Do this before you write a line of the script

**DIFF THE SCRIPT AGAINST ITS PARENT AND READ EVERY HUNK THAT DID NOT CHANGE.** A pre-flight audit
has found blockers in three consecutive scripts. On Run B **five of the six were introduced during
authoring, by someone who had just completed a stale-content pass** — so the pass is necessary and
not sufficient. Run the audit as a separate workflow before you launch the build; it has paid for
itself three times.

**NEVER PORT A PAGE-SPECIFIC MEASUREMENT FORWARD.** This is the single most repeated defect. The Run
B script states which of its files carry NBSP, what its table row counts are, and which role gate
applies. **Every one of those is wrong for Group 6.** Re-measure everything you carry, and prefer
deleting a measured claim to carrying a stale one.

**AND RUN THE GATE, BECAUSE THE INSTRUCTION ABOVE IS NOT ENOUGH ON ITS OWN:**

```bash
python3 bin/check-script-staleness.py workflows/<your-script>.mjs    # must exit 0
```

It re-measures the script's checkable claims against the corpus and the graph: corpus filenames that
do not exist, graph node ids that do not exist, stale "N pages / M fields" bookkeeping, ZERO-NBSP
claims that are false, **cell-opener counts quoted as row counts**, files seeded onto a page whose
own name appears nowhere in them, the receipts-destructuring bug, and a no-op `patchPage` in the
return. It exists because prose did not work: this instruction was already in the handoff when Run B
was authored, and five of that script's six blockers were introduced anyway, in the pass that was
looking for them.

Written 2026-09-01 and back-tested against all three prior scripts, where it found real defects that
had shipped unnoticed — including three cell-opener-as-row-count errors in Run A and one in Run B
that survived my own correction pass. WARNs are advisory (a script legitimately names files it is
telling agents NOT to open). One ERROR is expected on any already-run script: `STALE-GRAPH-COUNT`,
because the graph grew after it ran — that is precisely the line you must update when you adapt it.

**CELL-OPENERS ARE NOT ROWS.** SAP writes every table CELL on its own line, so `grep -cP '^\s*\|'`
returns `1 + (columns+1) x rows`. A "49-row" table is 15 rows. Convert before you report, or an
extractor will hunt for fields that do not exist and a critic will report a phantom truncation.

The parse check, because neither raw `node --check` nor a bare async wrapper works on a Workflow
script (it legally carries BOTH a top-level `export const meta` and a top-level `return`):

```bash
printf 'async function __w(){\n' > /tmp/chk.mjs \
  && sed 's/^export const meta/const meta/' workflows/<script>.mjs >> /tmp/chk.mjs \
  && printf '\n}\n' >> /tmp/chk.mjs && node --check /tmp/chk.mjs && echo PARSE OK
```

Also grep the WHOLE toolchain, not just the workflow file. **Fourteen** defects have been found that
way across four sessions and every one was latent for every future group.

## Group 6 specifics

- Three pages, all unbuilt: **Peppol Configuration, Shipping Configuration, Localization**.
- A complete 6-step Localization click path is already in
  `step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md` lines 102-110.
- The `Invoice Configuration administrator (Restricted)` role gates **Shipping Configuration** among
  nine surfaces — do not present it as distinctive to any one page.
- Run a page recon first if the roster looks uncertain. The lost map's page counts have been wrong
  every time they were tested (11 -> 2, 13 -> 4).

## After the workflow returns

  0. **CHECK `agents_error`** — a workflow that reports success is not a visible failure.
  1. `python3 bin/assemble-parts.py <parts-dir> <out.json> --journal <journal.jsonl>
     --group "Group 6 — Compliance / E-Invoicing"`
     **`--journal` is REQUIRED** — navPath, tabs, roleGates, aliases, documentedBasis and
     identityNotes are ALL recovered from it, and without it the pages merge empty with nothing in
     the validator to catch it. **No `--patch-page`: this is a new label.**
  2. **Read BOTH critics in full and VERIFY THEIR CLAIMS YOURSELF before acting.** They are usually
     right and they earn their cost — but an observation is reliable while an attribution is a
     hypothesis. On the last two runs, critics named the wrong source file for a real quote, retyped
     a quote with a curly apostrophe the corpus writes as ASCII, and reported two "blockers" that
     were artefacts of their own simulation. **Two critics converging is the strongest signal this
     pipeline emits** — on Run B both independently reversed a drop, from opposite directions, and
     they were right. Two critics DISAGREEING is two findings, not a tie to break.
  3. `BUILD_DATE=<today> python3 bin/merge-group.py <out.json> "Group 6 — Compliance / E-Invoicing"`
  4. `python3 bin/apply-corrections.py`
  5. `python3 bin/validate-graph.py`   # MUST exit 0
  6. Save critics, mapping, raw result and the parts into `output/reports/` with a date prefix.
  7. Append to `output/kg-build-log.md`, update `docs/WHERE-WE-LEFT-OFF.md`, commit.

Then: **the remediation sweep — and it is now a REGISTERED GROUP, not a wishlist.**
`'Remediation Sweep'` sits in `merge-group.py`'s `ALL_GROUPS` and BLOCKS `meta.status` from
flipping to COMPLETE (Luke's call, 2026-09-01: Group 6 was the last non-Ops entry, so merging it
would have declared the graph finished over 13-of-24 Invoice Settings, an Audit Rules roster
inflated by ~8, and 636 of 674 fields nobody had UI-variant-checked). Retire it by MERGING a
result under that label, never by editing the list. Its highest-value item is now measured rather
than estimated —
**`page.invoice-settings` carries 13 of the 24 documented rows** of
`available-invoice-settings-8b3411f0.md`, with 11 named settings absent, each with a documented
Default Status. The list is in the Workflows Run B section of the build log. Scope it as a full page
rebuild owning the page's entire source set, never as "add the missing 11": `--patch` REPLACES a
page's fields wholesale.

**When you dedupe Audit Rules, do NOT dedupe against its 91-entry roster** — that count is inflated
by roughly 8, so anything deduping against the list propagates the error. Dedupe on SOURCE FILES.

## Standing constraints

- **Blind build from documentation.** Corpus gaps are properties of the docs, not a validation
  backlog against a live tenant.
- **THE CORPUS IS FROZEN while a build runs.** No re-crawls, prunes or edits to
  `PROJECTS/concur-corpus` — agents read those files directly and `validate-graph.py` re-verifies
  every quote against them afterwards. Investigate freely; defer any write. Prove the freeze held
  with `git -C ../concur-corpus status --porcelain`.
- **Accuracy over token cost. Never cheapen the refuters or the critics.**
- `sourceQuote` verbatim on every field. No quote, no node. No CSS selectors. No tenant values.
- **Check what the pipeline DISCARDS, not only what the agents produce.** On Run B this was the
  single largest source of recovered content: 7 dropped table rows and 3 refused controls, both
  reversed on the graph's own precedent.
- **`grep` on this machine is ugrep**, not GNU grep: `grep -P '\xc2\xa0'` returns a SILENT ZERO even
  under `LC_ALL=C`. Use `grep -P '\x{00a0}'`, or python for a definitive count.
- Date-prefix any new loose file `YYYY-MM-DD_`. No customer PII, pricing, or deal data.

**PARKED — do not touch:** `PROJECTS/concur-corpus` has 2 unpushed commits. Pushing redeploys the
genie. Luke parked that decision; do not push it as a side effect of anything else.

Ultracode is on and accuracy is the priority over token cost.
