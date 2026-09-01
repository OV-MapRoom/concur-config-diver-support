# Resume prompt — paste-ready

_Last updated: 2026-09-01. Copy the block below into a fresh session._

---

Continue the Concur Invoice config knowledge-graph build. Next job: **Group 6 — Compliance /
E-Invoicing**, the last build group. **Its page recon is already DONE and it is SIX pages, not the
three the lost map claimed** — Printed Invoices, Peppol Configuration, Invoice E-Bunsho Timestamp
Validation Request, Localization, Change Log, Shipping Configuration. Do not re-run that recon.
Workflows Run B is DONE and the Workflows group is complete at four pages.

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

## Group 6 specifics — THE RECON IS DONE. DO NOT RE-RUN IT.

`output/reports/2026-09-01_group6-recon/` (run `wf_f7ae0fdc-832`, 8 agents, 0 errors: five blind
sweeps, a roster merge, two adversarial critics). **Read `roster.md` — it carries a build brief per
page — then both critic files, which are where the real findings are.**

**THE GROUP IS SIX PAGES, NOT THE THREE THE LOST MAP CLAIMED.** Three of the six were pages the map
never listed. Both critics confirmed six independently and **proved there is no seventh** (a 73-entry
guide-root enumeration, release-note mining over 371 files, and jurisdiction probes for withholding /
SAF-T / eDocument / Fapiao / XRechnung / KSeF / legal archiving / self-billing, all zero). That
negative is proved — do not spend another recon on it.

| page | files | tabs | est. fields |
|---|---|---|---|
| **Printed Invoices** | 37 | Print Formats, Print Templates, Print Condition Rules | ~60 |
| Peppol Configuration | 25 | — | ~15 |
| Invoice E-Bunsho Timestamp Validation Request | 12 | — | ~15 |
| Localization | 7 | — | ~10 |
| Change Log | 4 | — | ~5 |
| Shipping Configuration | 1 | unnamed in the corpus | ~6 |

`Group 6 — Compliance / E-Invoicing` is a NEW label: merge **WITHOUT `--patch`**, no `--patch-page`.
~44 agents at 6 pages x 3 lenses. Consider whether to split — but a split forces `--patch` on the
second half, which is the repo's sharpest footgun, so one clean non-patch merge is probably safer.

### Two BLOCKERS from the page-hood critic — handle these or the graph gets two nodes for one path

1. **The e-Bunsho page COLLIDES with the already-built `page.image-handling`.** That page already
   carries `Administration > Company > Tools > Invoice E-Bunsho Timestamp` in its `navPathAlternates`
   AND already holds `field.image-handling.timestampstatus`, sourced from `timestamp-status-f0082cf2.md`
   — the file the roster calls "THE ONLY TABLE IN THE SET" of the new page. Build the page, but in the
   same commit strip that alternate and decide explicitly where `timestampStatus` lives. Do not leave
   it on both. Also check `page.policies`, which holds `field.policies.timestamp-configuration`.
2. **`Expense Type Import` is a real unbuilt left-menu page** (`Administration > Invoice > Expense
   Type Import`, own access topic, 14-file cluster; tests (a) and (c) both fire — stronger than
   Localization and Change Log, which the roster keeps on (a) alone). The roster deferred it to two
   groups that are both CLOSED. **It is now deferred to `Remediation Sweep`, which is open and blocks
   `meta.status`.** When it is built, strip `Administration > Invoice > Expense Type Import` from
   `page.expense-types.navPathAlternates`.

### What the completeness critic found that changes the build

- **Printed Invoices has a navigation level nobody had seen.** `The Print Format Content page appears.`
  occurs in 2 files / 4 times and is in no sweep, no brief, no tab list. The real chain is
  `Printed Invoices > Print Formats tab > select format > Modify Content > PRINT FORMAT CONTENT >
  select content > Modify Content/Modify Fields > Edit Content/Edit Fields`. **The content-type
  rosters that make up most of that page's ~60 fields sit two clicks deeper than the roster assumed.**
  Attestation runs backwards here: "The Printed Invoices page appears" is in 1 file, "The Edit Content
  for print format page appears" is in 6 — an extractor ranking by attestation inverts the hierarchy.
- **The largest table in the whole Group 6 domain is named by nobody**: `error-messages-3b8339b0.md`,
  a 60-row Peppol Appendix error catalog. No sweep found it because the file contains the word
  "peppol" ZERO times.
- **Printed Invoices has five child modals, and the field tables hang off the modals, not the tabs.**

### Calibration corrections to carry

- The **Printed Invoices role gate is NOT distinctive** — `Global Invoice Configuration administrator`
  is a product-wide Global/Group scoping model shared with `page.exceptions`, `page.expense-types` and
  `page.workflows`. Page-hood rests on tests (a)+(c).
- **Localization has NO role gate at all** — test (b) is EMPTY, not weak, verified across every gate
  form in the corpus.
- The only genuinely 1-of-1 gate in the compliance domain is **`Digital Compliance Administrator`**
  (e-Bunsho), 1 file / 1 surface.
- **Run gate counts CASE-INSENSITIVELY.** The roster's were case-sensitive and understated
  (`Invoice Configuration Administrator` is 71 files, not 28).
- **Key every merge and boundary check on the `pageId` attribute, never on the id prefix.** The graph
  already carries `field.image-handling.ebunshotimestampconfigurationlist` with
  `pageId: page.policies` — a prior correction repaired the binding and left the id string behind.

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
