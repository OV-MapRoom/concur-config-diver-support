# KG Build Log

## 2026-08-31 — Group 1: Policy & Scope

**Corpus:** `concur-corpus` @ `d838939` · SAP `2026_08` · Professional Edition · crawled 2026-08-29T12:14:11.751Z
**Method:** 19-agent workflow — Map → Extract (3 pages × 3 lenses) → Verify (double, fail-closed) → Synthesize → Critic
**Source:** on-disk corpus files. The `concur-docs-genie` MCP was NOT used — it is not connected on this machine.
**Cost:** 2,270,946 subagent tokens · 449 tool calls · 47min · 19/19 agents, 0 errors

### Node counts

| Node type | Count |
|---|---|
| ConfigPage | 3 |
| ConfigField | 79 (of 111 extracted — **32 dropped** in verification) |
| ConfigDependency | 81 |
| ConfigStep | 4 |

Per page: Policies 44/51 kept · Group Configurations 22/31 · Invoice Settings 13/29.

### Verification

Every field faced two independent verifiers and needed **both** to keep it:
1. **Grounding** — re-opened the cited file, `grep -F` the `sourceQuote` as a literal substring, checked every `validValues` entry appears in that text.
2. **Adversarial refuter** — attacked on substance: is this a control on *this* page, or an end-user field / section heading / prose noun?

Fail-closed: a missing verdict from either verifier drops the field. 32 fields died this way.

### Dependencies — 58 of 81 have an unresolved endpoint

Only **2** point at a Group 1 page (both are feature-activation references, not fields). The other
**56 are forward references into groups not yet built** — Forms and Fields (5), Form Types (4),
User Permissions (4), Audit Rules (3), Invoice Pay (3), Workflows (2), Image Handling (2),
Purchase Order Configuration (2), Payment Manager (2), and 11 to the generic `Invoice` node.
These resolve as later groups land. `sourceRef`/`targetRef` preserve the textual endpoint so
nothing is lost in the meantime.

### Headline navigation findings

**1. A middle menu node the URLs hide.** No Group 1 page is reachable directly from `Administration`.
All three hang off **`Invoice Processing Admin`**:
`Administration > Invoice > Invoice Processing Admin > <page>`.

**2. The corpus publishes no URLs at all.** Zero hits across all 1,859 files for `PolicyAdmin`,
`groupConfiguration`, `invoiceSettings`, or `dcredirect`. The `.asp` paths in the handoff came
from live-UI observation, not documentation — they cannot be corpus-verified, now or later.

**3. `Invoice Admin` is a live alias** for the `Administration > Invoice` node, and several topics
collapse the path and skip `Invoice Processing Admin` entirely. A crawler must accept both.

**4. Invoice Settings has four distinct documented nav paths**, one on an entirely different menu
spine — `Administration > Expense & Invoice Settings > Invoice Settings > Invoice Compliance`.
Two files with the *same title* give irreconcilable paths. That is unmigrated content.

**5. A "New Experience" UI variant exists** (`policies-the-purchase-order-policy-new-experience`,
`purchase-order-matching-rules-new-experience`, and others) and the graph has **no concept of it**.
If the tenant runs New Experience, the Policies layout modelled here may be the legacy one.

### Known defects in this build

**Systematic extractor blind spot — raw HTML tables.** `invoice-settings-cace748d.md` holds a second
Invoice Settings field table whose rows are raw `<table>` HTML rather than markdown pipe tables. It
was never opened. **32 corpus files carry raw `<table>` blocks** — all are at risk in every group
built with this method. Five settings missed there, including
`Allow users to select their own approver for payment requests`, which the corpus states overrides
`Editable By Group(s)` and `Steps Can Be Added By` on the Edit Workflow page — a cross-page override
the graph has no edge for.

**Invoice Settings is ~40% covered, not "good".** The canonical table has 24 rows; 13 survived.
Eleven were killed by the verifier, not missed by search. Coverage on that page should be read as
`partial` despite the recorded value.

**Over-zealous drops.** Also missing on Policies: `Exclude Attendee Types` (an enumerated Add /
Modify (#) control), `Default Attendee Type`, `Require PO Matching?`, and the `Save` commit control
on the Modify Policy General page — all documented with quotable text in files no extractor cited.

**Dual-homed fields.** The seven attendee check boxes are modelled as Policies fields but every quote
was lifted from the Expense Types page, where the labels differ ("Add New Attendees button" vs
"New Attendee button"). They need Expense-Types-primary modelling with a Policies alias.

### Thin — needs a live-UI spot check (ranked)

1. **Auto Submit Conditions editor (Policies)** — corpus gives `Insert`, `Apply Auto Submit to Assignment`, `Save` and nothing else. No operators, no operands. A writer cannot author a condition from this graph.
2. **Purchase Request Configuration group (Policies)** — named as existing, not one field enumerated. Probably 3–5 unknown fields.
3. **Group Configurations columns beyond Policies** — confirm which of payment types, audit rules, car configurations, receipt limits, payment hold configurations, email reminders actually render as columns with Modify links. Payment Types especially: mandatory for group creation, no field table anywhere.
4. **`Require PO Matching?` vs `Is PO Policy?`** — two labels, two files, possibly one control. Determines whether step `g1-s2` order 4 is correct.
5. **`PO Receipt From`** — one bare bullet, no description; almost certainly `PO Receipt Form`.
6. **`Can request a new vendor?`** — only `Yes` is ever written. Confirm Yes/No vs a three-value list.
7. **`Default shipping terms` / `Default shipping method`** — control type undetermined; no carrier codes enumerated.
8. **`Timestamp Configuration`** — only `Japan e-Bunsho` ever named. Is that the whole list?
9. **Vendor banking per-role selectors (Group Configurations)** — values enumerated, *which roles* get a selector is not.
10. **Purchase Request Settings (3 settings)** — no nav path anywhere. Own page, or part of Invoice Settings?
11. **`Enable Manage Vendors Link for Invoice User`** — inverted polarity: selecting "Enable" *suppresses* the link. Its sibling topic is titled `[Delete] ...` with an empty body — verify it still exists.
12. **Policies commit control** — wizard ends "Select Done", Modify path ends "Select Save". Confirm both.
13. **`Editable By Group(s)`** — typed `multiselect` on no textual warrant; likely a hierarchy tree picker.

### Label drift to carry as aliases

- `Group Configuration` (guide title, singular) vs `Group Configurations` (page, plural) vs `Group Configurations List page`
- `Modify Policy page` — a construction; the corpus calls it **the General page**
- `Policies` is misspelled **`Polices`** in `configure-concur-receiving-1ececc23.md` — a matcher must tolerate it
- `Payment Request` → `Invoice` terminology is half-migrated: labels say "Payment Request", prose says "invoice"
- `Administration >Invoice` (missing space) appears 3× vs `Administration > Invoice` 4× — broke at least one exact-substring match in this build

### Next

Group 2 remainder (Routing Configuration, Audit Rules, Exceptions). Before it runs, the extractor
prompt needs an explicit instruction to read raw `<table>` HTML blocks, and the refuter needs
calibration against the 11 over-dropped Invoice Settings rows.
