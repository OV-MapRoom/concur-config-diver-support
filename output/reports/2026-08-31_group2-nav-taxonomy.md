# Group 2 — Routing & Approval: Navigation Taxonomy

## 1. Routing Configuration

**Click path (verbatim):**
> "1. Click Administration  Invoice. 2. Click Routing Configuration. The Hierarchy Mapping List page appears with a list of hierarchy mappings imported for display."
— `concur-invoice-professional-edition-tools-guides/access-the-routing-configuration-page-be1f9063.md`

**Structure:** Not one page — two screens under the same menu entry:
> "Routing Configuration is divided into two areas, the import function used to import the hierarchical data, and the view function that provides search options and displays the imported hierarchical mappings. - Hierarchy Mapping List... - Import Hierarchy Mappings..."
— `concur-invoice-professional-edition-tools-guides/the-routing-configuration-screens-12358d75.md`

**Names/aliases found:** "Routing Configuration" (menu label, page title `routing-configuration-8b511516.md`), landing screen is called "Hierarchy Mapping List," second screen "Import Hierarchy Mappings." Also referenced as "Routing Configuration Hierarchy" (`routing-configuration-hierarchy-8b45d8d3.md`) — a conceptual/behavior doc for the same feature, not a different page.

**Role:** No page-specific role doc exists; falls under the shared "Required Roles" list:
> "Invoice Configuration administrator (Unrestricted): To use Invoice Admin tools, such as Capture Processing Admin, Routing Configuration and Forms & Fields"
— `concur-invoice-professional-edition-admin-guides/required-roles-3ddb8d70.md` (also `.../tools-guides/required-roles-69c1016a.md`)

**Coverage:** Solid — dedicated access doc, screen-inventory doc, hierarchy-behavior doc, plus a separate Hierarchy Mappings Import User Guide referenced inline.

---

## 2. Audit Rules

**Click path (two variants, both verbatim, both land on the same page):**
> "1. Select Administration > Invoice. ... 2. Select Audit Rules (left menu). The Audit Rules page appears."
— `concur-invoice-professional-edition-admin-guides/access-custom-audit-d8c64dd4.md` and `access-custom-audit-70726665.md`

**Structure — one page, three tabs**, confirmed by three separate "Access" topics all starting identically then diverging at step 3:
- Custom: page opens directly on Audit Rules (`access-custom-audit-*.md`)
- Validation: "...2. Select Audit Rules (left menu)... 3. Select Validation." — `access-validation-rules-5f8dbf9e.md`
- Random: "...2. Select Audit Rules (left menu)... 3. Select the Random tab." — `access-random-audit-da5f6693.md`

**Names/aliases found:** page title is "Audit Rules" everywhere, but the corpus also files one topic as **"Audit Rules (Validation Rules)"** (`audit-rules-validation-rules-8b2a0123.md`) — i.e. Validation is treated as a sub-brand of Audit Rules, not a separate top-level page. "Custom Audit Rules" and "Random Audit Rules" are the tab-level names (`custom-audit-rules-8b296b2d.md`, `configure-random-audit-rules-64e474c5.md`).

**Notable scope creep — PO events:** a 2026 addition puts Purchase Order audit events into the same tool:
> "These new PO-related events are available in Administration > Invoice > Audit Rules when creating the audit rule."
— `concur-invoice-professional-edition-admin-guides/audit-rules-257356ed.md`
Also a VAT-specific audit-rule topic (`audit-rules-48161b7e.md`) hangs off the same page name — same page, different use-case doc, not a new page.

**Role:** No dedicated role doc; same "Invoice Configuration administrator (Unrestricted)" umbrella applies (no file names a stricter role specifically for Audit Rules).

**Coverage:** Deep — three "Access" topics, three "Add a rule" topics, copy/configure (new UI vs legacy UI) variants, additional-samples doc. Well covered, but fragmented across many small topic files rather than one consolidated reference.

---

## 3. Exceptions

**Finding: Exceptions is a standalone admin page**, not merely a byproduct area inside another tool — but it exists specifically to feed the other two:

**Click path (verbatim):**
> "1. Select Administration  Invoice. 2. Under the Invoice Processing Admin menu, choose Exceptions. The Exceptions page appears."
— `concur-invoice-professional-edition-admin-guides/access-exceptions-90e45318.md`

**Purpose/relationship to Group 2 siblings (verbatim):**
> "All exceptions created in the Exceptions page appear as options for the Audit Rules tool and Workflows tool when creating rules."
— same file

**Names/aliases found:** "Exceptions" (page name, consistent — no drift found). Roles differentiate by scope:
> "The Global Configuration administrator can view, edit, or delete any exception that exists within the system."
— `access-exceptions-90e45318.md`
> "If you are a Group Invoice Configuration Administrator, you cannot delete exceptions that you have not created. Only Global Invoice Configuration Administrators can delete or modify all exceptions."
— `delete-exceptions-aa2889cc.md`

**Text-matching trap confirmed:** a same-named-sounding but unrelated feature exists — **"Configuring: Exception Email Address and Instruction Text Options"** (`configuring-exception-email-address-and-instruction-text-options-0813a643.md`) is a *Capture Processing* setting (Other Settings tab) for routing unprocessable supplier emails, NOT the Exceptions admin page. Do not conflate the two when searching "exception."

**Related but distinct concept:** "Audit Trail and Exceptions" (`audit-trail-and-exceptions-8e06ceb3.md`) documents runtime *clearing* of exceptions by the Invoice Processor role on an invoice — this is the operational/processor-facing side, not the admin config page.

**Coverage:** Good — Access/Add/Delete admin topics exist plus the cross-tool relationship is explicitly documented, but role guidance is scattered (Global vs Group distinction only surfaces in the Delete topic, not in Access or Add).

---

## Summary Table

| Page | Click path root | Page/tab name(s) in 2026_08 docs | Admin role | Coverage |
|---|---|---|---|---|
| Routing Configuration | Administration > Invoice > Routing Configuration | "Routing Configuration" → Hierarchy Mapping List / Import Hierarchy Mappings tabs | Invoice Configuration administrator (Unrestricted) | Solid, multi-doc |
| Audit Rules | Administration > Invoice > Audit Rules (left menu) | "Audit Rules" (page) with Custom / Validation ("Audit Rules (Validation Rules)") / Random tabs; PO events and VAT rules folded into same page | Invoice Configuration administrator (Unrestricted) — no stricter role found | Deep but fragmented across many topic files |
| Exceptions | Administration > Invoice > Invoice Processing Admin menu > Exceptions | "Exceptions" (stable name); feeds Audit Rules tool and Workflows tool as a shared code list | Global Invoice Configuration Administrator (full) vs Group Invoice Configuration Administrator (own-created only, no delete of others') | Good; role split only documented in Delete topic; watch for false-positive match on the unrelated Capture Processing "Exception Email Address" setting |

**High-value findings for the taxonomy build:**
1. Exceptions is confirmed a standalone page, but it is architecturally a shared dependency of both Audit Rules and Workflows — model it as a hub feeding two consumers, not a sibling leaf.
2. Audit Rules absorbed new scope in 2026 (PO transmit/save-blocking events) without a page rename or new URL — same page, expanded event catalog.
3. "Validation Rules" is filed under the alias "Audit Rules (Validation Rules)" — confirm your taxonomy doesn't create a false separate node for Validation; it's a tab.
4. No page in this group has a role doc more specific than the shared "Invoice Configuration administrator (Unrestricted)" — role granularity (Global vs Group) only appears for Exceptions, and only on the Delete action.