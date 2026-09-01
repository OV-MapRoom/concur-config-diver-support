# Handoff — Approval Authority, then Workflows Run B

**Filed:** 2026-09-01
**For:** A fresh Claude instance with no prior context
**Repo:** https://github.com/OV-MapRoom/concur-config-diver-support (public, `main`, pushed at `159f62e`)
**Read first:** `docs/2026-08-31_HANDOFF-KG-BUILD-v2.md` (authoritative method), then
`docs/WHERE-WE-LEFT-OFF.md` (current state). This file does not repeat either.

---

## State at filing

**22 pages · 607 fields · 436 dependencies · 41 steps · 114 value sets (1,011 values) ·
60 contradictions (179 readings) · 17 compressed ranges. `bin/validate-graph.py` exits 0,
ERROR-clean. 607/607 sourceQuotes verbatim.**

Built: Groups 1, 2, 3, 4, 5A, 5B, **Workflows Run A** (Workflows + Feature Hierarchies).
Remaining: **Approval Authority** (script written, NOT run), **Workflows Run B**,
**Group 6** (Peppol / Shipping / Localization), then the remediation sweep.
Group 7 (Ops) stays deferred unless Luke asks.

Repo is **pushed and clean at `159f62e`.**

---

## JOB 1 — Approval Authority (Authorized Approval Limits). Script is written and ready.

`workflows/2026-09-01_kg-authorized-approval-limits.mjs` — ONE page, ~5 core files, ~11,000 bytes,
**zero raw `<table>` and zero markdown table rows** on either primary. Expect roughly **seven
fields**. It was launched once, stopped 2 agents in when a framing error surfaced, and the script
was corrected rather than patched afterwards. **It has not produced any output yet.**

### Change exactly ONE thing before launching

`const PARTS` on line ~70 points at the previous session's scratchpad. **Repoint it at yours.**
Everything else — `GROUP`, the step-id prefix, `PAGES`, the absent `patchPage` — is already correct.

```bash
python3 bin/assemble-parts.py <your-parts-dir> <out.json> \
        --journal <run journal.jsonl> --group "Approval Authority"
BUILD_DATE=2026-09-01 python3 bin/merge-group.py <out.json> "Approval Authority"   # NO --patch
python3 bin/apply-corrections.py
python3 bin/validate-graph.py        # must exit 0
```

### Why this page is in scope — settle this before you read anything else

An earlier draft of this repo argued the page sat OUTSIDE the Invoice admin surface because its
click path is `Administration > Company > Company Admin > User Administration`. **That reasoning
was wrong and Luke corrected it on 2026-09-01.** It used MENU LOCATION as a proxy for PRODUCT
SCOPE. `navPath` is a navigation fact; it says nothing about which product's configuration surface
a control belongs to.

The correct test is: **does this control govern Invoice behaviour?** It does, through Concur
Invoice's **non-PO capability**. A PO-based invoice carries its approval authority on the purchase
order. A **non-PO invoice has no PO to carry it**, so the approver's authorization limit *is* the
authority. The corpus states the direction outright:

> "All workflow options available for non-PO policies are also available to a PO-based invoice
> policy. This includes options such as workflow rules and Authorized Approvers."
> — `tools-guides/workflow-and-approval-routing-8b4ff6c9.md`

Authorized Approvers is a **non-PO policy option first**, extended to PO-based. Corroborated by
`procedure-2d20b513.md` ("control invoice workflow authorization"),
`step-2-activate-the-authorized-approver-feature-c87493ee.md` ("control invoice approval
processes … setting approval or exception limits") and `authorized-approvers-overview-8b3bd2d0.md`
("An authorized approver can have limit approval"). **Do not re-litigate this and do not write
"out of scope" in any note.** Record the click path faithfully — a driver needs it — and frame the
page as *Invoice configuration reached through the Company admin menu*.

### THE CENTRAL RISK — this is why it is a pipeline run and not seven hand-written nodes

The built **Workflows** page already carries, on its Authorized Approvers > Authorized Approver
List tab: `authorized_approver_approval_limit` (label "Approval Limit"), `authorized_approver_level`
("Level"), `authorized_approver_can_approve_exception` ("Can approve exception") and
`authorized_approver_list_approver` ("Approver") — all from `authorized-approver-list-a9522ec8.md`.

And the corpus says **one value has three setter surfaces**:

> "The amount is set for each approver in the Authorized Approver List, in User Administration, or
> in the employee import." — `configuration-8b3be88b.md`

So the question is **not** "what fields are on this page". It is: for each control, is this a
genuinely different surface, or the same value written down twice? Answer per field, in notes,
citing the file that decides it. **A duplicate here is invisible to `bin/validate-graph.py`** — it
checks quotes against files, never controls against pages. If the run returns a fifth "Approval
Limit" with no boundary reasoning, that is a defect, not a field.

### Two things a driver would otherwise get backwards

- **The link is conditionally visible.** It appears only when the Authorized Approver feature is
  activated AND the hierarchy has at least one non-Global level. Emit it as a dependency.
- **Blank means UNLIMITED, not unset**, and `0` means in-chain-but-no-final-authority
  (`setting-an-unlimited-approval-amount-9d98b489.md`). A driver treating blank as "unset"
  configures the opposite of the intent.

---

## JOB 2 — Workflows Run B (Email Reminders + Delegate Configurations)

34 unique files, 70,074 B, ~50 estimated fields. Both are real left-menu pages the lost map never
counted; both were found and page-hood-endorsed by the recon
(`output/reports/2026-08-31_workflows-recon/`). Start from
`workflows/2026-08-31_kg-workflows-run-a.mjs` and change the usual knobs, **plus**:

1. **Merge WITH `--patch`.** The label `Workflows` now EXISTS, so a non-patch merge would DELETE
   Run A's 121 fields. Set `patchPage` in the return. Run B's two pages are new, so `--patch`
   strips nothing — verified against `merge-group.py:62-76`.
2. **FIX `NAV_SCHEMA` FIRST.** It sets `additionalProperties: false` and declares no `tabs`
   property, so the map agent is schema-blocked and silently returns `tabs: None`. This is link 1
   of a three-link chain; links 2 and 3 (`assemble-parts.py`, `merge-group.py`) are already fixed.
   Email Reminders has two tabs (Rules, Email Reminders) and Delegate Configurations has two
   (Invoice, Purchase Request), so it bites immediately.
3. **Exactly ONE file is shared with Run A** — `delegate-self-approval-1b627285.md` (1,284 B) —
   and its field belongs to the Workflows **General page**. **Run B must not extract it.**
4. Extra seeds the recon completeness critic named (finding 6): `pre-defined-rules-220a1fe7.md`,
   `overview-8b2c769e.md`, `best-practices-when-localizing-subject-and-email-message-fields-48515f40.md`,
   `terminology-e1e1ed99.md`, `overview-8b2ba917.md`.
5. Drop the `"two user interfaces"` UI hint from Delegate Configurations — it is 2014 boilerplate
   present in **40 files**, including most of the twenty already-built pages. Not a page property.

---

## Method notes added since handoff v2 — these are now standard

1. **Grep the WHOLE toolchain for the previous group's tag, not just the workflow file.** Four
   defects were found this way across two sessions, every one latent for every future group. The
   newest and nastiest: `bin/assemble-parts.py`'s `group_tag()` called an **undefined `slug()`**.
   Every prior group label matched `/Group (\d+)/`, so that branch had **never executed** in the
   project's history; the first label without a digit reached it and raised `NameError`.
2. **A data path has more than one link, and fixing the one you are looking at is not fixing it.**
   The `tabs` chain is NAV_SCHEMA → assemble-parts → merge-group. Only the last was fixed first,
   and it was reported as done. The map agent returning `tabs: None` is what exposed it. Before
   claiming a pipeline gap is closed, walk every link.
3. **A new group label must be added to `ALL_GROUPS` in `merge-group.py`.** `groupsRemaining` is a
   set difference against it and `status` flips to COMPLETE when every non-Ops entry is done, so an
   unregistered group is invisible AND cannot block COMPLETE.
4. **Never reuse a "Group N" number in a label.** `gtag` derives from `/Group (\d+)/`; a colliding
   tag mints dep ids over a built group, and a non-patch merge under an existing label deletes that
   group's fields. Name new groups by capability (`Workflows`, `Approval Authority`).
5. **Two critics DISAGREEING is two findings, not a tie to break.** On the Workflows recon they
   split over adding a fifth page and were **both right about different things** — one about the
   fact (the deferral rested on a false claim), one about the action (it did not belong in that
   build). Adjudicate against the corpus and the graph, and record both halves.
6. **Menu location is not product scope.** See Job 1. This one cost a wrong header and a wrong
   proposed scope rule before Luke caught it.

---

## Open debt — highest value first

1. **F-2 (Workflows) — 433 condition-editor entries and 12 compressed ranges in two never-opened
   tools-guides files.** `the-query-builder-and-the-condition-editor-e10473f9.md` (7 Data Objects,
   217 Field/Value entries, 7 ranges) and `-af058a80.md` (two further Data Object lists, 216
   entries, 5 ranges). They were collapsed into one "do-not-confuse" skip and neither was opened.
   **Do NOT home them on Workflows** — they belong to deferred Processor surfaces. Owed: a
   contradiction node (the graph carries 15 entries from a table SAP itself calls "a partial
   list"), a corroboration note, and an unbuilt-surface pointer.
2. **Invoice Settings rebuild** — 13 fields against a source documenting ~34. Scope it as a full
   page rebuild owning the page's entire source set, never as "add the missing N": `--patch`
   REPLACES a page's fields wholesale.
3. **Audit Rules alias collapse** — 91 entries encode ~68 real controls. The Workflows correctness
   critic measured the duplication independently: seven labels appear two or three times (e.g.
   "B: Data Object" as `condition_data_object_left` + `data_object` + `condition_data_object_b`),
   so the roster is inflated by roughly 8. **Anything deduping against that list propagates the
   error** — dedupe on SOURCE FILES instead.
4. **New Experience retrofit** over Groups 1–2.
5. **Workflows F-3 / F-6 / F-7 / F-5** — an unrecorded editability contradiction, `Table 2`
   governing both Field/Value columns while only C is wired, an `And/Or` pair enumerated in prose
   but declined, and two placement-attested Feature Hierarchies names withheld. All in
   `output/reports/2026-08-31_workflows-run-a-critic-completeness.md`.
6. **A de-dupe drop silently lost its note** (`wf_workflow_type`). Worth auditing the other 85
   Workflows drops for the same loss.
7. **Three existing-graph defects reported, not fixed:** `dep.g2.011` targets `Invoice Settings`
   while citing `invoice-settings-cace748d.md` (should be Workflows > Settings tab); `dep.g2ar.025`
   duplicates `dep.g2ar.024`; `page.exceptions.navPathAlternates` and
   `page.image-handling.navPathAlternates` each contain a route that does not lead to that page.
8. **The built Exceptions page is missing its documented Exception Level field**, so all
   exception-level edges anchor on Audit Rules.
9. **`meta.groupsRemaining` is only recomputed at merge time**, so it will not list
   `Approval Authority` until something merges. Cosmetic, but do not read it as authoritative
   between merges.

---

## Standing constraints — do not relax

- **Blind build from documentation.** Corpus gaps are properties of the docs, not a validation
  backlog against a live tenant.
- **The corpus is FROZEN during a build.** No re-crawls, prunes or edits to `PROJECTS/concur-corpus`
  while a group build is running. Prove the freeze held with
  `git show --name-only <commit> | grep -E '^(CONCUR_|SAP_)'`.
- **Accuracy over token cost.** Never cheapen the refuters or the critics.
- **Thin stays thin**, and a thin page must carry `documentedBasis` + `verifyNotes` saying why.
- **`sourceQuote` verbatim on every field. No quote, no node.** No CSS selectors. No tenant values.
- Date-prefix any new loose file `YYYY-MM-DD_`. No customer PII, pricing, or deal data.

## Parked, deliberately — not for this session

`PROJECTS/concur-corpus` has **2 unpushed commits** (`b989ee6`, `fbd8751`). Pushing redeploys the
genie via Netlify. Verified: neither touches a corpus content file. **Luke parked this on
2026-08-31. Do not push it as a side effect of anything else.**
