# Email Reminders — independently-derived page finding (Luke's instruction, 2026-08-31)

Held to inject into the Workflows recon findings IF the six sweeps miss it.
All evidence below is grep -F verifiable against the cited file. Corpus frozen; read-only.

## Verdict: admin-page, HIGH confidence. Currently claimed by NO group.

### 1. Own left-menu click path (not a tab on another page)
file: concur-invoice-professional-edition-admin-guides/access-email-reminders-96f3ca18.md
quote: "From the Invoice Processing Admin navigation menu, choose Email Reminders."
quote: "The Email Reminders page appears."
-> terminates at a PAGE, reached from the Invoice Processing Admin middle nav node.

### 2. Own "tool" topic, same shape as workflows-tool-8b3b4dbe.md
file: concur-invoice-professional-edition-admin-guides/email-reminders-tool-8b2c8a11.md
quote: "The Email Reminders tool in Concur Invoice is used to configure and manage email reminders at the group level."

### 3. Own DISTINCT role gate — the Forms-and-Fields discriminator
file: concur-invoice-professional-edition-admin-guides/email-reminders-tool-8b2c8a11.md
quote: "The Email Reminders tool is visible if you have the Invoice Configuration administrator (Restricted) role."
-> "(Restricted)" is a different gate from the Workflows tool's Global/Group Invoice Configuration
   administrator. A distinct role gate is exactly what made Forms and Fields TWO pages rather than one.

### 4. It is ONE page with TWO tabs (Audit Rules precedent — do NOT split)
file: concur-invoice-professional-edition-admin-guides/configuration-process-8b2c271f.md
quote: "On the Rules tab of the Email Reminders page, create any specific email rules for the reminder or use one of the default rules."
quote: "On the Email Reminders tab of the Email Reminders page, create a new configuration."
-> Rules tab + Email Reminders tab, both explicitly "of the Email Reminders page".

### 5. Own ordered configuration process (feeds ConfigSteps)
file: concur-invoice-professional-edition-admin-guides/configuration-process-8b2c271f.md
4 steps: create rules -> create configuration (assign groups) -> schedule -> (optional) localize.
Step 3 is a SUPPORT-GATED action, not an admin control:
quote: "Scheduling email reminders is done in the Import/Extract Administrator tool and is performed by SAP Concur staff."
quote: "Scheduling requires you to submit a service request to SAP Concur support."
-> the graph already carries an unresolved endpoint "Administration > Import/Extract Administrator".

### 6. Richness — 14 files, ~30 KB, all admin-guides
   10163  create-email-reminders-604c4a46.md      <- largest file in this cluster
    3979  create-reminder-rules-b0a7fac5.md
    3921  email-reminders-8b2caa99.md
    1324  scheduling-email-reminders-8b2ceaea.md
    1323  localizing-email-reminder-text-8b2cc1b0.md
    1317  delete-reminder-rules-ab4f8d33.md
    1236  edit-email-reminders-2a2638ad.md
    1175  delete-email-reminders-8f693700.md
    1151  configuring-email-reminders-8b2c3cca.md
    1145  edit-reminder-rules-8f2edae9.md
    1096  email-reminders-tool-8b2c8a11.md
    1066  copy-email-reminders-cb75f9fd.md
    1025  access-email-reminders-96f3ca18.md
     999  copy-reminder-rules-9350776e.md
Plus context topics that mention it: before-you-begin-448d2513.md, configuration-process-8b2c271f.md,
overview-8b2c769e.md, best-practices-when-localizing-subject-and-email-message-fields-48515f40.md,
work-with-the-steps-page-fab249d1.md, workflow-667cee21.md.
TWO OBJECT TYPES, full CRUD on each: "email reminders" (create/edit/copy/delete) and
"reminder rules" (create/edit/copy/delete). That is a two-tab page, not a settings section.

### 7. Domain question the recon must answer, NOT assume
Is it a WORKFLOWS-group page, or a real page belonging to no built group?
It is referenced from workflow-667cee21.md and work-with-the-steps-page-fab249d1.md, and it fires
on rule violation rather than on an approval step. Feature Hierarchies was left UNCLAIMED by the
Group 3 recon on exactly this reasoning and the Workflows handoff calls that outcome unacceptable
a second time. Whatever the domain verdict, Email Reminders must not end this run unclaimed.

### 8. Boundary — do NOT collapse into the Workflows page's Email Notifications tab
They are different surfaces:
  Email Notifications = a TAB inside the Workflows page
    file: access-email-notifications-9f806b0b.md
    quote: "To access the Email Notifications tab:"      (Administration > Invoice > Workflows > Email Notifications tab)
    quote: "View and manage workflow emails on the Email Notifications tab in the Workflows tool."
           (accessing-and-managing-email-notifications-8b3d94c0.md)
  Email Reminders  = its OWN page off the Invoice Processing Admin menu, different role gate.
Collapsing these would be the Forms-and-Fields error; splitting Email Notifications out as its own
page would be the Audit-Rules error. Both traps are live in this one cluster.
