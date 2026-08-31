# Handoff — Concur Config Diver · Knowledge Graph Build
**Filed:** 2026-08-31  
**For:** A fresh Claude instance with no prior context on this project  
**Scope:** Complete the knowledge graph build for remaining config groups (5 of 7 groups still to do)  
**Git access:** Not required — this is a local file-only project

---

## What this project is

A knowledge graph of the Concur Invoice admin configuration surface. The graph is the prerequisite for a future "config writer" — a Chromium automation that can navigate Concur's admin UI and configure it to a target state with ~80% automation. The graph answers: *given a desired config change, what pages do I navigate to, what fields do I touch, what values are valid, and in what order?*

**The MCP server that powers the build:**  
`concur-docs-genie` — an HTTP MCP server connected to 8,588 SAP Concur help articles. It is the corpus source for all knowledge graph content. Tools: `concur_search_docs`, `concur_get_doc`, `concur_list_deliverables`.

If MCP is not available in your session, this work cannot proceed — verify the tools are present before starting.

---

## What's already done

**Vertical slice: Groups 2 (partial) and 3 — COMPLETE**

The PO Matching and Workflow config areas were built end-to-end as a proof-of-concept:

| Node type | Count |
|---|---|
| ConfigPage | 24 (11 PO-matching, 13 workflow) |
| ConfigField | 145 — every field has a verbatim `sourceQuote` from the corpus |
| ConfigDependency | 44 (depends_on / precedes / triggers) |
| ConfigStep | 6 ordered action sequences |

Artifact: `output/kg-invoice-config.json` (157KB, written 2026-08-29 12:16)  
Build log: `output/kg-build-log.md`

The crux was proven: the concur-docs-genie corpus carries field-level navigational detail — field names, valid values, ordering dependencies — not just concepts. Example depth: `Tolerance → None / Within / Custom`, `Match Level → Header / Vendor / Line Item / Line Item-Receipt`, `Approval Time Expired Action → No Action / Send to Approver / Skip to Next Step / Add Processor Step / Send Back to Employee`.

---

## The schema (locked — do not change)

Four node types:

```
ConfigPage     — one admin UI page. Fields: id, name, navPath (click sequence), url, group, coverage
ConfigField    — one field on a page. Fields: id, pageId, name, label, fieldType, validValues[], sourceQuote, notes
ConfigDependency — a relationship between two fields. Fields: type (depends_on/precedes/triggers), sourceId, targetId, condition
ConfigStep     — an ordered action sequence a config writer executes. Fields: id, name, pages[], fields[], sequence[]
```

Key design decisions:
- **navPath lives on ConfigPage** (not just a URL) because direct `goto` bounces via `dcredirect`. Pages must be reached by clicking in-app.
- **sourceQuote is required on every ConfigField** — adversarial verification drops any field without one. No corpus grounding = no field.
- **Thin pages stay thin** — if corpus doesn't cover a page, mark `coverage: "thin"`, don't invent.
- **No CSS selectors in the graph** — the future config writer resolves DOM elements at runtime. Graph says what page/field/value; crawler finds the element. Correct division of labor.
- **No BestRun/tenant-specific values** — structural knowledge only. Do not write specific configured values from the BestRun sandbox into the graph.

---

## What needs to be built — the remaining 5 groups

From `INVOICE-CONFIG-MAP.md`, 7 groups total. Groups 2 (Workflow) and 3 (PO Matching) are done. Remaining:

### Group 1 — Policy & Scope
| Page | Path |
|---|---|
| Policies | `/expense/admin/invoice/PolicyAdmin.asp` |
| Group Configurations | `/expense/admin/invoice/groupConfiguration.asp` |
| Invoice Settings | `/expense/admin/invoice/invoiceSettings.asp` |

### Group 2 (remainder) — Routing & Approval
| Page | Path |
|---|---|
| Routing Configuration | `/expense/admin/invoice/routingConfig.asp` |
| Audit Rules | `/expense/admin/invoice/auditRules.asp` |
| Exceptions | `/expense/admin/invoice/exceptionList.asp` |

*(Workflows already done in the vertical slice)*

### Group 4 — Capture & Vendors
| Page | Path |
|---|---|
| Capture Processing Admin | `/expense/admin/invoice/captureProcessing.asp?featCode=PMT` |
| Vendor Search Admin | `/expense/admin/invoice/vendorSearch.asp` |
| Image Handling | `/expense/admin/invoice/imageHandling.asp` |
| Units Of Measure | `/expense/admin/invoice/unitOfMeasure.asp` |

### Group 5 — Data Structure & Accounting
| Page | Path |
|---|---|
| Expense Types | `/expense/admin/invoice/expenseTypesAdmin.asp` |
| Forms and Fields | `/expense/admin/invoice/formsAndFields.asp?featCode=PMT` |
| Accounting Administration | `/expense/admin/invoice/accountingAdmin.asp` |
| Map Invoice Concept Fields | `/expense/admin/invoice/invoiceConceptFields.asp?prodCode=PMT` |
| Tax Administration | `/expense/admin/invoice/taxAdministrator.asp` |
| Budget Configuration | `/expense/admin/invoice/budgetConfiguration.asp` |
| List Management | `/expense/admin/invoice/listManagement.asp` |
| Company Locations | `/expense/admin/invoice/companyLocations.asp` |

### Group 6 — Compliance / E-Invoicing
| Page | Path |
|---|---|
| Peppol Configuration | `/expense/admin/invoice/peppolSettings.asp` |
| Shipping Configuration | `/expense/admin/invoice/shippingConfig.asp` |
| Localization | `/expense/admin/invoice/localization.asp` |

*(Group 7 / Ops is low-priority — skip unless asked)*

---

## How the build works

The prior slice used a Workflow script with this structure:

1. **Extract** — fan out extraction agents per config cluster, each querying concur-docs-genie for the relevant pages/fields. Use `concur_search_docs` to find articles, `concur_get_doc` to read full text.
2. **Verify** — per-field adversarial verifier re-reads the cited corpus doc and checks: does the field name appear? Are validValues genuinely enumerated (not invented)? Is the sourceQuote actually in the body? Fail-closed: no verdict = field dropped.
3. **Synthesize** — produce ConfigSteps (ordered action sequences) from the verified fields.
4. **Merge** — append new nodes into `output/kg-invoice-config.json`, preserving all prior content.

Prior workflow script (for reference only — do not resume, session cache is cold):  
`/home/i867525/.claude/projects/-mnt-c-Users-I867525/994ac39c-1366-4cd8-8e09-96778b16a018/workflows/scripts/kg-vertical-slice-wf_8b8c374f-20e.js`

---

## Cost optimization — IMPORTANT

The 2-group vertical slice cost ~8.6M tokens. At that rate, 5 remaining groups would be prohibitive in a single run. Apply these levers before starting:

1. **Use a cheaper model for extraction** — extraction is mechanical corpus-reading. Use `haiku` or `sonnet` for extraction agents; reserve higher-tier only for synthesis. Set `model: "haiku"` on extraction `agent()` calls.
2. **Single-vote verify** instead of per-field adversarial fan-out — the fan-out (145 fields × 1 agent each) was the main token multiplier. One verify pass per field is sufficient; drop the redundancy.
3. **Build one group at a time** — complete a group, write to disk, stop. Don't attempt all 5 groups in one run.

---

## Output file

**`output/kg-invoice-config.json`** — the graph artifact. Append new nodes; do not overwrite existing content.

Top-level structure:
```json
{
  "meta": { "version": "...", "status": "...", "lastUpdated": "..." },
  "nodes": {
    "configPages": [...],
    "configFields": [...],
    "configDependencies": [...],
    "configSteps": [...]
  }
}
```

When adding a new group: extend each array. Update `meta.lastUpdated` and set `meta.status = "IN_PROGRESS"` until all groups are complete, then `"COMPLETE"`.

---

## Rules of engagement

- **No BestRun/tenant-specific values in the graph.** Structural knowledge only.
- **No CSS selectors.** The config writer resolves DOM at runtime.
- **sourceQuote required on every field.** Drop fields without corpus grounding.
- **Thin pages stay thin.** If the corpus doesn't cover a page well, flag it — don't invent.
- **Do not validate against the live Concur UI** in this session. Graph is corpus-only. A live spot-check is a separate step Luke will run separately.
- Corporate device: no customer PII, pricing, or confidential deal data in output files.

---

## Load-bearing assumption (unvalidated)

The 2026_08 corpus field names and nav paths may not exactly match what the live Concur admin UI shows. If SAP has let help-docs drift from the real UI, the graph will misdirect the config writer. This has not been tested against the live UI. It is not your concern for this handoff — just note it in your build log if you find obvious mismatches in corpus coverage.

---

## Files to know

| File | Purpose |
|---|---|
| `INVOICE-CONFIG-MAP.md` | The 37-page taxonomy across 7 groups + navigation constraint |
| `output/kg-invoice-config.json` | The graph artifact — read before appending |
| `output/kg-build-log.md` | Build record for the completed vertical slice |
| `RESUME-2026-08-29-KG-2.md` | The most recent state doc (more detail on the vertical slice) |
| `CONFIG-VALUES.md` | BestRun configured values — reference only, do not copy into the graph |

---

## What done looks like

The build is complete when:
- All 5 remaining groups have ConfigPages, ConfigFields (with sourceQuotes), ConfigDependencies, and ConfigSteps in `kg-invoice-config.json`
- `meta.status = "COMPLETE"`
- A brief build log entry is appended to `output/kg-build-log.md` summarizing node counts and any thin/skipped pages
- Thin pages are flagged with `coverage: "thin"` rather than silently omitted

At that point, hand back with a summary of: groups completed, total node counts, any pages that came back thin (corpus had limited coverage), and any surprises.
