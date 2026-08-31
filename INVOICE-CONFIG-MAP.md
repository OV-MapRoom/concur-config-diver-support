# INVOICE-CONFIG-MAP.md — Concur Invoice admin configuration taxonomy

**Rebuilt:** 2026-08-31 — the original was lost with the corporate-device working copy.
**Corpus basis:** `concur-corpus` @ `d838939`, SAP version `2026_08`, Professional Edition, crawled 2026-08-29.

> ⚠️ **This is a partial reconstruction.** The original mapped **37 pages across 7 groups**.
> The handoff (`docs/2026-08-31_HANDOFF-KG-BUILD.md`) preserved **22** of them by name and path.
> The remaining ~15 are unrecovered — see [Unrecovered pages](#unrecovered-pages).

## Navigation constraint (load-bearing)

Direct `goto` on an admin URL **bounces via `dcredirect`**. Pages must be reached by *clicking*
in-app. That is why `navPath` (the click sequence) lives on every `ConfigPage` and the URL is
secondary — the URL identifies the page, the navPath reaches it.

## Groups

### Group 1 — Policy & Scope · **IN PROGRESS 2026-08-31**
| Page | Path |
|---|---|
| Policies | `/expense/admin/invoice/PolicyAdmin.asp` |
| Group Configurations | `/expense/admin/invoice/groupConfiguration.asp` |
| Invoice Settings | `/expense/admin/invoice/invoiceSettings.asp` |

### Group 2 — Routing & Approval
| Page | Path | State |
|---|---|---|
| Workflows | *(path not preserved in handoff)* | Built in the lost vertical slice — 13 pages of workflow config |
| Routing Configuration | `/expense/admin/invoice/routingConfig.asp` | Not built |
| Audit Rules | `/expense/admin/invoice/auditRules.asp` | Not built |
| Exceptions | `/expense/admin/invoice/exceptionList.asp` | Not built |

### Group 3 — PO Matching
Built in the lost vertical slice — **11 pages**. Individual page names/paths were not preserved
in the handoff and must be re-derived from the corpus when this group is rebuilt.

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

### Group 7 — Ops
Low priority. Deliberately out of scope unless Luke asks. Page list unrecovered.

## Unrecovered pages

22 of 37 pages are named above (counting Workflows and excluding the 11 unnamed PO-matching
pages, which are known only as a count). The gap:

- The **11 Group 3 / PO Matching** page names and paths
- The **Workflows** page path in Group 2
- All **Group 7 / Ops** pages
- Any page the original map placed outside these groups

These are recoverable two ways: (a) copy the original `INVOICE-CONFIG-MAP.md` off the corporate
device, or (b) re-derive from the corpus during each group's Map phase. (a) is strictly better —
the original encoded a real navigation survey, not a corpus inference.

## Build order

1. **Group 1 — Policy & Scope** ← in progress
2. Group 2 remainder — Routing & Approval
3. Group 4 — Capture & Vendors
4. Group 5 — Data Structure & Accounting *(largest — 8 pages)*
5. Group 6 — Compliance / E-Invoicing
6. Rebuild Group 3 — PO Matching *(lost slice)*
7. Rebuild Group 2 — Workflows *(lost slice)*
8. Group 7 — Ops *(only on request)*

One group per run: complete → write to disk → stop.
