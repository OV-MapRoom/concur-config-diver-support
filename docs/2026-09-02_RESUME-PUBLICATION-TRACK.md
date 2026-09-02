# Resume — Publication track (extractor, reproducibility, ID re-minting)

_Written 2026-09-02. Branch: `concur-luminary`._

## Read this first: this is NOT the build track

There are now **two live tracks** in this project. Do not confuse them.

| Track | Next step | Resume doc |
|---|---|---|
| **KG build** (unchanged) | Group 6 — Compliance / E-Invoicing, six pages. Recon is DONE; do not re-run it. | `docs/RESUME-PROMPT.md` + `docs/WHERE-WE-LEFT-OFF.md` |
| **Publication** (this doc) | Settle relationship ID minting before anything is published. | this file |

`docs/RESUME-PROMPT.md` still points at Group 6 and is untouched. Nothing in this
document changes the build plan, the schema, or the graph.

**Nothing in the repo was modified by the session that produced this note.** The graph
was read only. Verify:

```
git log --oneline -3
sha256sum output/kg-invoice-config.json
```

## Where this came from

Notion crumb **09.01.26 — KG tooling for Concur Config Diver → publish the extractor,
not the graph**, and its subpage **🧱 Storage & reproducibility — the graph is a build
artifact, not a database** (filed 2026-09-02). The subpage is the authoritative record
of the reasoning; this file is the repo-side operational summary.

The crumb's decision set is intact except where noted under **Decisions changed** below.

## The headline

Reproducible and updatable are **build-system properties, not database properties.**
The graph must be a derived artifact, never a stored one:

```
corpus -> build -> versioned JSONL in git -> loaded into a disposable store
```

The store is a cache you can drop and rebuild. This strengthens the existing decision to
ship triples + published schema rather than a database dump.

Updatability comes from a content-addressed cache keyed on:

```
sha256(source doc) + sha256(prompt template) + model id + schema version
```

A corpus bump then re-extracts only the changed docs and produces **a pull request
containing a diff of the graph**, which a human reviews. That review loop is the whole
value of the plan — and §1 below is what currently breaks it.

## 1. BLOCKING: relationship IDs are build-order derived

Found by inspecting the built graph. Two ID regimes, only one survives a rebuild.

| Node type | Example id | Survives rebuild? |
|---|---|---|
| ConfigPage | `page.policies` | YES — content-derived |
| ConfigField | `field.policies.policy-name` | YES — content-derived |
| ConfigDependency | `dep.g1.001` | NO — group + ordinal |
| ConfigStep | `g1-s1-create-policy-and-activate-for-group` | NO — group + ordinal |
| ConfigValueSet | `vset.g2ar.field-value.attendee-totals` | NO — group-tagged |
| ConfigContradiction | `contr.g5g5.001` | NO — group + ordinal |
| ConfigCompressedRange | `range.g5g5.001` | NO — group + ordinal |

**Entities are stable. Relationships are not.** Relationships are what a config writer
traverses.

`dep.g1.001` means *the first dependency emitted by the Group 1 run*. Re-extract in a
different order — or re-cut groups into public domains, which publishing requires — and
`dep.g1.001` silently describes a **different edge**. It will not error.

Two consequences:

1. Every rebuild churns the whole file, so the git diff is noise. The PR-review update
   story above stops working, and real changes hide among false ones.
2. Any external consumer pinning an edge id gets repointed without warning.

**Proposed fix:** mint relationship ids from content — `dep.<sourceId>.<type>.<targetId>`
or a hash of the semantic tuple — the way pages and fields already are.

### The hard case, measured

Minting from `(sourceId, type, targetId)` is not sufficient as stated. Re-derive with:

```
python3 - <<'PY'
import json, collections
g=json.load(open('output/kg-invoice-config.json'))['nodes']
c=collections.Counter((d.get('sourceId'), d.get('type'), d.get('targetId'))
                      for d in g['configDependencies'])
d={k:v for k,v in c.items() if v>1}
print('dependencies:', len(g['configDependencies']))
print('distinct tuples:', len(c))
print('colliding tuples:', len(d), ' edges involved:', sum(d.values()))
for k,v in sorted(d.items(), key=lambda x:-x[1])[:6]: print(' x%d %s' % (v,k))
PY
```

As of `meta.version 0.8.0`: **488 dependencies, 418 distinct tuples, 29 colliding tuples
covering 99 edges.** The worst offenders have **both endpoints null** — 44 edges
(18 `depends_on`, 16 `triggers`, 10 `precedes`).

Those nulls are not defects. They are the deliberate cross-group forward references
described in `docs/SCHEMA.md` under ConfigDependency: `sourceRef` / `targetRef` carry the
textual `{page, field, resolved}` so an edge survives with an unresolved endpoint until
the target group is built, and `bin/merge-group.py` re-resolves them on each merge.

**So the design question is: how do you mint a stable id for an edge whose endpoints are
not yet resolved?** Answering that decides the whole approach. Candidate directions, none
chosen: mint from `sourceRef`/`targetRef` text rather than resolved ids; carry a
disambiguator drawn from `condition` or `sourceFile`; or accept a two-phase id that is
promoted on resolution (and then is not stable, which defeats the purpose).

## 2. SAFETY: re-minting is the first non-append-only operation this project has proposed

`CLAUDE.md` states `output/kg-invoice-config.json` is **append-only — read before writing,
never overwrite prior groups.** Re-minting rewrites ids on roughly 340 existing nodes in
place. It is exactly the class of operation that rule exists to prevent.

There is a documented precedent for how badly this goes: `merge-group.py --patch` with a
null `patchPage` deleted every node from every non-patch merge (**436 dependencies -> 115,
measured**) and **`bin/validate-graph.py` still exited 0 over the result.** See the
Approval Authority section of `output/kg-build-log.md`.

**Green is not proof.** The validator is structurally incapable of catching mass deletion.

Required protocol if this is executed:

- [ ] **Tag the before-state first.** `git tag -a kg-v0.8.0-pre-remint -m "..."` and push it.
      This was NOT done in the 2026-09-02 session — it is still outstanding.
- [ ] **Never write in place.** Emit to a new file, diff, swap only after review.
- [ ] **Bijection check as the gate** — old->new id map must be exactly 1:1, and per-type
      node counts must match before and after. This is the check that would have caught
      436->115 and that the validator cannot do.
- [ ] **Keep `legacyId` on every re-minted node** so the mapping is auditable and reversible.
- [ ] **Dry-run reporter first** — read-only, reports what it *would* rename plus the
      collision list. Not yet written.
- [ ] Run `bin/validate-graph.py` and `bin/check-approval-authority.py`, but treat exit 0
      as necessary, not sufficient.

Note also the standing hazard from `docs/WHERE-WE-LEFT-OFF.md`: a stale id/pageId mismatch
exists (`field.image-handling.ebunshotimestampconfigurationlist` carries
`pageId: page.policies`). **Key every operation on the `pageId` attribute, never on the id
prefix.** Re-minting must not assume the id prefix is truthful.

## 3. Decisions changed since the 09.01 crumb

| Crumb decision | Status |
|---|---|
| 2 — schema-constrained extraction, no framework | **Stands.** Unaffected. |
| 3 — storage: Kùzu or Neo4j | **SUPERSEDED.** Kùzu was archived 2025-10-10 (Kùzu Inc. acquired by Apple, repo read-only, site down). The Kineviz `bighorn` fork is inactive; `LadybugDB` is the live successor. Storage is a disposable loader, not a decision. Do not build on Kùzu. |
| 6 — publish the extractor; repo = schema/ + extract/ + graph/ + README | **Stands, and strengthens.** Add the content-hash cache to `extract/`, and promote `bin/validate-graph.py` to a first-class published artifact — publishing the thing that proves your own output is rarer and more credible than publishing the extractor. |
| 7 — scrub sourceQuote verbatim text during extraction | **Stands, with a refinement.** Publish the citation as a pointer (`sourceFile` + char offsets + hash) plus a `verify.py` that reconstitutes quotes locally from the consumer's own corpus copy. Ships the *ability* to verify verbatim without republishing SAP prose. |
| 8 — two repos, public doc-graph / private tenant snapshot | **Stands.** See §5 for a trap in how the public repo is created. |

New, not in the 09.01 set:

- **Relationship ids must be content-derived.** Open, and blocking publication (§1).
- **"Reproducible" needs a scoped definition before the README asserts one.** LLM
  extraction is nondeterministic; `git clone && make` will never be byte-identical. The
  claim must be *passes the same validator and matches the published graph within a stated
  tolerance on a stated diff metric.* A diff/scoring harness is therefore part of the
  public repo, not an afterthought.

## 4. First domain — answered, with evidence

Crumb Open Question 1 ("which config domain is first?") was UNANSWERED AND BLOCKING. It is
answerable from the graph. The selection criterion is **the smallest domain that exercises
all 7 node types** — otherwise a consumer opens `schema/` and finds types that never fire.

| group | pages | fields | deps | steps | valueSets | contradictions | ranges | src files | types |
|---|---|---|---|---|---|---|---|---|---|
| Group 5 — Data Structure | 8 | 189 | 114 | 11 | 41 | 24 | 10 | 105 | 7/7 |
| Workflows | 4 | 178 | 95 | 11 | 46 | 43 | 6 | 84 | 7/7 |
| Group 2 — Routing | 3 | 109 | 89 | 9 | 13 | 0 | 0 | 47 | 5/7 |
| Group 1 — Policy & Scope | 3 | 81 | 81 | 4 | 0 | 0 | 0 | 56 | 4/7 |
| Group 4 — Capture | 4 | 58 | 51 | 4 | 0 | 0 | 0 | 41 | 4/7 |
| **Group 3 — PO Matching** | **2** | **49** | **40** | **6** | **25** | **12** | **2** | **32** | **7/7** |
| Approval Authority | 1 | 10 | 18 | 2 | 1 | 6 | 0 | 9 | 6/7 |

**Recommendation: Group 3 — PO Matching.** 7/7 node types at 32 source files and 49
fields — one third the corpus footprint of the next-smallest complete domain. Cheap enough
to regenerate on every commit, and three-way matching is legible to an SAP audience without
preamble. Approval Authority is smaller but 6/7, one page, `partial`, and would spend the
README explaining the `Administration > Company` boundary rule. Group 5 has two zero-field
thin pages, which read as a gap.

**Not yet confirmed by Luke.**

### The trap in choosing it

"Domain" is not "Group". Groups are build-order artifacts. Open debt item 7 in
`docs/WHERE-WE-LEFT-OFF.md` names **8 PO controls stranded on closed groups** — `Enable
Change Order`, PO line identification, the `Purchase Order Number` field that activates
Multiple PO, `Delivery Slip Number` for three-way matching — living on Invoice Settings
and Forms and Fields. Publish "PO Matching" as a domain and a consumer gets a PO story
missing the controls that turn PO matching on.

Two ways out, neither chosen: publish by group and say plainly that groups are build
units; or define the public domain as a dependency-closure query, which would pull in
controls that are not built yet.

## 5. TRAP: never create the public repo from this one

Do not fork, rename, or flip this repository to public.

Measured on 2026-09-02:

- **674 sourceQuotes — ~74,600 characters of verbatim SAP prose** in the current graph
- **18 commits** have touched `output/kg-invoice-config.json`, so history holds 18 snapshots
- **142 files** under `output/reports/` also contain `sourceQuote`
- 43 commits total, 3.74 MiB packed

Decision 7 scrubs quotes **at extraction**, which governs the working tree. It does nothing
to git history. Flipping this repo public would publish exactly the prose the scrub decision
exists to avoid, in a form that looks scrubbed on the surface. Cleaning it afterward means
`git filter-repo` over a published repo, which rewrites every commit hash and breaks every
clone.

**The public extractor repo is born empty and seeded with clean content.** Never descended
from this one.

Related: a parallel repo is **not** insurance for this work. Git already covers file
corruption and bad commits; a second copy on the same account covers neither host loss nor
divergence, and it manufactures the ambiguity risk of two plausible graphs. Use a **tag**
for the named restore point and a **`git bundle`** for off-GitHub cold storage.

## 6. Prior art — this has a name

The field is **software product line engineering / variability modeling**. The survey
literature splits variability-model extraction into three categories: *mining of documented
variability*, analysis of variant instances, and synthesis from annotated code. The first
is this project, named.

The modern interchange format is **UVL (Universal Variability Language)** — features with
mandatory/optional/alternative groups plus cross-tree constraints, recently extended to
typed features and arithmetic/string constraints. `ConfigDependency` with
`depends_on` / `precedes` / `triggers` is a homegrown dialect of the same idea.

Not a reason to adopt UVL wholesale. It matters because **exporting a UVL view would let
SAT/SMT solvers answer "is this config combination valid?"** — a capability the current
JSON cannot offer, and directly on the road to the config writer. Read before the config
writer is designed; not needed for the MPT.

**Honest read:** doc-to-KG has been done many times, mostly as content governance for
documentation teams. What has not been done is doing it with verbatim-citation discipline
as an enforced invariant, a contradiction node type with a never-reconcile stance, and a
published reproducibility claim. The technique is commodity; the rigor is not. Consistent
with the 09.01 conclusion that this is a credibility play, not a leverage play.

## 7. Still open

1. **How to mint a stable id for an edge with unresolved endpoints** (§1). Decides the
   approach. Nothing else in this track should start first.
2. **Confirm Group 3 — PO Matching as the first domain**, and decide the group-vs-domain
   packaging question (§4).
3. **Write the scoped reproducibility claim** before the README asserts one.
4. **Content-hash cache design** — DVC vs. hand-rolled Make + cache dir.
5. **The second load-bearing assumption, unexamined.** The crumb logged one (is the
   doc-derived graph authoritative without a tenant). There is a second: the built graph
   came from adversarial multi-agent workflows — Map, Extract, Verify, Repair, Synthesize,
   two perspective-diverse refuters, two opus/xhigh critics. Crumb decision 2 describes the
   published extractor as "LLM loop, one doc at a time." **Those are not the same machine.**
   If the published pipeline is a plain loop, it will produce a materially worse graph than
   the one in `output/`, and the reproducibility claim becomes "one command regenerates a
   worse graph." Either the refuter phases ship (and "one command" gets expensive) or the
   demo graph is not the graph that was built. Unresolved.
6. **Hon conversation** — still not had. Publishing remains the one irreversible step, and
   the repo stays private until then.

## Immediate next action

Write the **dry-run re-mint reporter** — read-only by construction. It reads the graph,
proposes content-derived ids for the five relationship node types, and reports:

- the proposed old->new mapping
- every collision, grouped by cause
- the unresolved-endpoint cases broken out separately

It changes nothing. Cut `kg-v0.8.0-pre-remint` before any script that writes.
