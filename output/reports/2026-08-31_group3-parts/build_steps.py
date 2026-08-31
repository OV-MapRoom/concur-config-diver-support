# -*- coding: utf-8 -*-
import json

A = "concur-invoice-professional-edition-admin-guides/"
T = "concur-invoice-professional-edition-tools-guides/"

def cs(what, quote, path):
    return u'CORPUS-STATED: %s SOURCE: "%s" — %s' % (what, quote, path)

def inf(what):
    return u'INFERRED: %s' % what

steps = []

# ---------------------------------------------------------------- STEP 1
steps.append({
 "id": "grp3-rule-set-end-to-end-and-bind-to-policy",
 "name": "Stand up a purchase order matching rule set end to end and put it into service on a policy",
 "goal": ("A named PO matching rule set exists, carries both kinds of sub-rule (Life to Date cumulative rules and "
          "Rules-type field-to-field rules) inside a named rules group, and is actually selected by a PO policy so "
          "invoices are evaluated against it. SILENT HALF-WORKS: (a) stop after Copy/Rename/Done and you own a "
          "correctly named clone of whatever rule set you copied - including its default rules - that nothing evaluates; "
          "(b) author the rules but never set PO Matching Ruleset on Policies and the set stays In Use = No forever and "
          "never fires; (c) leave the copied default rules in place and they keep firing alongside the rules you meant to "
          "add, because the corpus tells you to clear them explicitly; (d) once ANY invoice runs against it the set locks "
          "at In Use = Yes and can never be edited again - only copied - so this whole procedure must be finished before "
          "the policy is exposed to live invoices."),
 "pages": ["Purchase Order Matching Rules", "Policies"],
 "fields": [
   "rule_set_name","in_use","copy_button","rename_button","done_button","edit_button","rule_groups_list",
   "edit_rules_button","named_rules_group_name","life_to_date_tab","life_to_date_rule_selection",
   "overage_tolerance","currency_field","exception_message","change_button","new_button","allow_submit_approve",
   "rules_tab","delete_button","level_field","payment_request_field","purchase_order_field","tolerance",
   "value_percentage_radio","add_button","rulesGrid","save_button","associated_policies",
   "Policy Name","Is PO Policy?","PO Matching Ruleset"
 ],
 "sequence": [
  {"order":1,"page":"Purchase Order Matching Rules","action":"open the tool from the left menu and read the In Use column of the rule set you intend to copy from","field":"in_use",
   "rationale": cs(u"Read In Use BEFORE touching anything, because it decides whether the rest of this procedure is even legal on that row: a Yes locks the set permanently and forces the copy route (step grp3-replace-in-use-rule-set). A writer that skips this check will click Edit, get nothing, and misread a hard lock as a flaky control.",
                   u"A rule set with an In Use status of Yes cannot be modified in any way.", A+"access-purchase-order-matching-rules-8407c500.md")
   + u' ROLE GATE, CORPUS-STATED: "Only the Invoice Configuration administrator can access and configure the Purchase Order Matching Rules feature." — ' + T+"required-roles-ef2c2901.md"},

  {"order":2,"page":"Purchase Order Matching Rules","action":"select an existing rule set row to serve as the base","field":"rule_set_name",
   "rationale": cs(u"There is no documented blank-create path on this page: creation IS copying, so a base row must be selected before Copy has anything to act on. Nothing else in the corpus attests a New button for a rule SET (New exists only inside the Exception Message editor).",
                   u"In Purchase Order Matching Rules, select an existing rule set under Rule Set Name, and then click Copy.", A+"step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md")},

  {"order":3,"page":"Purchase Order Matching Rules","action":"click to produce a \"Copy of...\" entry","field":"copy_button",
   "rationale": cs(u"Copy is the container-creating act; every sub-rule authored in orders 6-19 lands inside the set this click produces, so nothing downstream has a home until it happens.",
                   u"The PO matching rule set you create in this step will contain all sub-rule sets you configure in the steps below.", A+"step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md")},

  {"order":4,"page":"Purchase Order Matching Rules","action":"select the \"Copy of...\" row, click Rename, type the name, then press Enter","field":"rename_button",
   "rationale": cs(u"Rename must happen while the copy is still the selected 'Copy of...' row - it is step 2 of a three-step wizard, not later housekeeping. The commit is a KEYSTROKE, not a button: a driver that types the name and clicks away loses it. The name is also the only handle the Policies page has on this set in order 20, so an unnamed copy cannot be bound.",
                   u'Click the "Copy of..." to select it, then click Rename and type a descriptive name for the matching rule set, pressing Enter when you are done.', A+"step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md")
   + u' NAMING CONVENTION, CORPUS-STATED for the first sets you build: "Copy the Default rule set, or your current rule set, and name it Test – Rule Set V1." — ' + A+"test-and-change-match-rule-sets-49f57319.md"},

  {"order":5,"page":"Purchase Order Matching Rules","action":"click to close the create wizard","field":"done_button",
   "rationale": cs(u"Done terminates the Copy > Rename > Done wizard and is distinct from the rule-set Save in order 19; the corpus then hands the sequence explicitly to the rule-authoring steps, which is why this step continues rather than ending here.",
                   u"Continue to Step 2, Step 3, and Step 4 to add additional matching rules to the new PO matching rule.", A+"step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md")},

  {"order":6,"page":"Purchase Order Matching Rules","action":"reselect the newly named rule set and click Edit","field":"edit_button",
   "rationale": cs(u"The create wizard closes on Done and leaves you on the list page, so the set must be re-opened before any rule can be authored. Edit is also the control the In Use gate removes, which is why order 1 comes first.",
                   u"On the Purchase Order Matching Rules page, select the rule set, and then click Edit.", A+"step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md")},

  {"order":7,"page":"Purchase Order Matching Rules","action":"select the Default named rules group","field":"rule_groups_list",
   "rationale": cs(u"Default is a VALUE in this list, not a control, and the corpus states outright that it is the basis of the group you are about to author - pick the wrong group here and the rules in orders 9-18 attach to something the policy will never reach.",
                   u"Select Default, then click Edit Rules (this named rules group is the basis for your new rules group).", A+"step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md")},

  {"order":8,"page":"Purchase Order Matching Rules","action":"click to open the Purchase Order Matching Rule Group rules window","field":"edit_rules_button",
   "rationale": cs(u"This is the window that actually contains the Life to Date and Rules tabs; without it the tabs are not reachable from the rule set.",
                   u"Double-click the rule you want to use, and then, in the Rule Groups list, select a rule group and click Edit Rules.", A+"configure-three-way-matching-c043e5c8.md")
   + u' CONTRADICTION - TAB DEPTH, RECORDED NOT RECONCILED: step-3 skips Edit Rules entirely and places the tab one level up ("In Purchase Order Matching Set, click the Rules tab." — ' + A+'step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md). A driver must probe for the tabs at BOTH depths rather than fail on the first miss.'},

  {"order":9,"page":"Purchase Order Matching Rules","action":"type a descriptive name for the new rule/rules group","field":"named_rules_group_name",
   "rationale": cs(u"Named before any rule type is selected, per the corpus order. The name is the identity the condition-based work in step grp3-condition-based-rule-group later selects against, so an unnamed group cannot be extended.",
                   u"In Purchase Order Matching Rules, type a descriptive name for the new rule in Name.", A+"step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md")
   + u" AMBIGUITY RECORDED: the sentence says 'a descriptive name for the new rule' while the surrounding topic is creating a named rules GROUP; the corpus does not settle which object is named. Do not assume."},

  {"order":10,"page":"Purchase Order Matching Rules","action":"click the Life to Date tab","field":"life_to_date_tab",
   "rationale": cs(u"Life to Date is authored before the Rules tab because the corpus runs its own steps in that order and hands off explicitly at the end.",
                   u"Proceed to Step 3 to add PO to Request fields matching rules.", A+"step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md")
   + inf(u" beyond the hand-off: Life to Date rules compare against the CUMULATIVE sums of all invoices carrying the PO number, while Rules-type rules compare one invoice to one PO - so settling the cumulative envelope first gives the per-invoice rules a ceiling to sit inside. That reading is inferred from the two rule types' own descriptions, not stated as an ordering requirement.")},

  {"order":11,"page":"Purchase Order Matching Rules","action":"select the check box next to each Life to Date rule type to activate","field":"life_to_date_rule_selection",
   "rationale": cs(u"The check box is what makes the tolerance controls exist at all - they are revealed per selection, so a driver that goes looking for a tolerance field before ticking a box will not find one.",
                   u"As you select each check box, options appear that let you refine the tolerance.", A+"step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md")
   + u' The six selectable rule types are enumerated in the canonical Life to Date table ("Click the Life to Date tab, then select the check box next to the rule type to activate using the table below:" — ' + A+"step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md)."},

  {"order":12,"page":"Purchase Order Matching Rules","action":"set the tolerance basis for the selected Life to Date rule (Value, or Percentage)","field":"overage_tolerance",
   "rationale": cs(u"Set immediately after each check box, while its revealed options are on screen; deferring it leaves a rule armed with no stated tolerance.",
                   u"In the Overage Tolerance section, select Value or Percentage.", A+"configure-three-way-matching-c043e5c8.md")
   + u' CONTRADICTION, RECORDED NOT RECONCILED: configure-three-way-matching names this section "Overage Tolerance" with exactly TWO options, while step-2 leaves the section unnamed and offers a THIRD - Value bound to Currency with "- AND -", or Percentage. Probe for both shapes; the corpus does not say which provisioning shows which.'},

  {"order":13,"page":"Purchase Order Matching Rules","action":"if the Value branch is taken, choose the company base currency","field":"currency_field",
   "rationale": cs(u"Only meaningful on the Value branch, and only in the step-2 reading of the tolerance section - which is why it sits after order 12 rather than beside it. Skip it on a Value tolerance and cross-currency invoices are compared against an unstated base.",
                   u"Currency: Choose the base currency your company uses. Conversions for alternate currencies used on incoming invoices will be calculated automatically and applied by the system. This functions as for other rule sets, including audit rules.", A+"step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md")
   + u' OFF-PAGE, DO NOT LOOK FOR A TOGGLE HERE: the exchange rates this relies on are on by default and administered outside Invoice — "Exchange rates that allow currency conversion are on by default. As reference, this feature is accessed using the Expense Admin module." — ' + A+"activate-exchange-rates-for-matching-rule-sets-c51af31c.md"},

  {"order":14,"page":"Purchase Order Matching Rules","action":"(optional) click Change to open the exception message editor","field":"change_button",
   "rationale": cs(u"Change is the only documented door into the message editor; New and Save in orders 15 and 19 are controls INSIDE it, not on the rule window, so clicking them first is a category error.",
                   u"Exception Message: Click Change and add a message by clicking New, or edit an existing message by selecting it and clicking Edit, then click Save.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":15,"page":"Purchase Order Matching Rules","action":"(optional) click New inside the editor and author the exception text","field":"new_button",
   "rationale": cs(u"Authored while the editor is open and committed with the editor's own Save before returning to the rule window. Scope warning that a driver will otherwise get wrong: this New creates a MESSAGE, never a rule set - rule-set creation is Copy > Rename > Done at orders 3-5.",
                   u"Exception Message: Click Change and add a message by clicking New, or edit an existing message by selecting it and clicking Edit, then click Save.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":16,"page":"Purchase Order Matching Rules","action":"(optional) select the check box to let the invoice move despite the exception","field":"allow_submit_approve",
   "rationale": cs(u"Decided on the same pass as the message, because together they define what the triggered rule DOES; leave it clear and every trip of this rule becomes a hard stop rather than a flag, which is a policy decision, not a default to assume.",
                   u"Allow Submit/Approve: Select this check box to allow submission and processing of the invoice even if an exception is triggered.", A+"step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md")
   + u" The corpus documents ONLY the selected state; do not infer the cleared state's label or a paired Yes/No value."},

  {"order":17,"page":"Purchase Order Matching Rules","action":"click the Rules tab","field":"rules_tab",
   "rationale": cs(u"The hand-off from the Life to Date work is explicit, which is what makes this ordering corpus-stated rather than a guess.",
                   u"Proceed to Step 3 to add PO to Request fields matching rules.", A+"step-2-create-the-life-to-date-matching-rule-set-dc296ae6.md")},

  {"order":18,"page":"Purchase Order Matching Rules","action":"select each unwanted default rule row and click Delete","field":"delete_button",
   "rationale": cs(u"Do this BEFORE adding your own rules, not after. The set was born as a copy in order 3, so it arrives carrying the source set's rules; the corpus issues this as an instruction, not a suggestion, and skipping it is the classic silent half-work - your new rules fire correctly and the inherited ones fire too.",
                   u"Be sure to clear the default rule set if you do not intend to use them.", A+"step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md")},

  {"order":19,"page":"Purchase Order Matching Rules","action":"select the rule level","field":"level_field",
   "rationale": cs(u"Level FIRST, because it repopulates the two field pickers below it - set Payment Request or Purchase Order before Level and the selection is discarded when Level changes.",
                   u"As different levels are chosen in Level, different field sets will populate the selections available in Payment Request and Purchase Order.", A+"step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md")
   + u' CONTRADICTION, RECORDED NOT RECONCILED: the enumerating step gives FOUR values ("Select a value from Level (Header, Vendor, Line Item, Line Item - Receipt), so the matching rule operates for the field(s) you want compared." — concur-invoice-professional-edition-admin-guides/step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md) while that same file\'s intro paragraph gives THREE in a different order and omits the receipt level ("Rules-type matching rule sets are based on levels of Vendor, Header, and Line Item, and are applied by the system on a one-to-one basis between the current, incoming invoice and the PO." — concur-invoice-professional-edition-admin-guides/step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md). The receipt level is also spelled with an ASCII hyphen here and an en dash in configure-three-way-matching-c043e5c8.md - match on the visible words, not the dash.'},

  {"order":20,"page":"Purchase Order Matching Rules","action":"select the invoice-side field","field":"payment_request_field",
   "rationale": cs(u"Selected before the PO-side field, because the corpus states the PO list is filtered BY this choice - reverse the two and the PO selection is invalidated.",
                   u"In the Payment Request list, select the request field to match to the same field in the PO.", A+"step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md")},

  {"order":21,"page":"Purchase Order Matching Rules","action":"select the PO-side field to compare against","field":"purchase_order_field",
   "rationale": cs(u"Strictly after order 20; the corpus says so in the step itself. The option catalogue is never published for the general case, so a driver must be handed the pair to select rather than enumerate it.",
                   u"Under Purchase Order, select the PO field to match to the invoice (they will change depending on the field selected in the step above).", A+"step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md")},

  {"order":22,"page":"Purchase Order Matching Rules","action":"choose the tolerance for this rule","field":"tolerance",
   "rationale": cs(u"Marked conditional on the field pair chosen above, so it can only be evaluated after orders 20-21 - a driver that expects an unconditional tolerance control will stall on rules that do not offer one.",
                   u"(Optional depending on field choice) Determine what tolerance you will allow when the rule is triggered using options under Tolerance.", A+"step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md")
   + u' CONTRADICTION, RECORDED NOT RECONCILED: step-3 enumerates FOUR options (None, Within (+/-), Custom, Currency) while configure-three-way-matching-c043e5c8.md gives THREE and then a second choice — "If applicable, in the Tolerance section, select None, Within, or Custom, and then select Value or Percentage."'},

  {"order":23,"page":"Purchase Order Matching Rules","action":"where the second tolerance choice is offered, set the basis","field":"value_percentage_radio",
   "rationale": cs(u"Only exists in the three-way-matching reading of the Tolerance section, and only after a None/Within/Custom choice is made - which is why it is a separate order rather than folded into 22.",
                   u"If applicable, in the Tolerance section, select None, Within, or Custom, and then select Value or Percentage.", A+"configure-three-way-matching-c043e5c8.md")
   + u" Distinct from the Value/Percentage pair in the Overage Tolerance section on the Life to Date tab (order 12); same words, different section, different rule type."},

  {"order":24,"page":"Purchase Order Matching Rules","action":"click Add to commit this rule into the rows","field":"add_button",
   "rationale": cs(u"Nothing entered in orders 19-23 exists as a rule until Add fires; a writer that moves straight to Save loses the in-progress rule silently, because Save commits the rows, not the editor.",
                   u"Click Add to insert this rule into the rows under Rules.", A+"step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md")},

  {"order":25,"page":"Purchase Order Matching Rules","action":"read back the committed rule rows, then repeat orders 19-24 for each further rule","field":"rulesGrid",
   "rationale": cs(u"The rows are the only documented confirmation that Add actually landed, which makes this the verification point of the whole authoring loop.",
                   u"Then, as each rule is added using the Add button, they will appear at the bottom of the Rules window in rows.", A+"step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md")},

  {"order":26,"page":"Purchase Order Matching Rules","action":"click Save to commit the rule set","field":"save_button",
   "rationale": cs(u"Terminal commit of the authoring session; the corpus ends the Rules-type procedure on it.",
                   u"Click Save.", A+"step-3-create-the-po-to-request-fields-matching-rules-64eb1c47.md")},

  {"order":27,"page":"Policies","action":"select the PO policy that should use this rule set","field":"Policy Name",
   "rationale": cs(u"Page switch, and this is the leg that turns a built rule set into a live one - the rule set is bound from Policies, never from the rule set page itself.",
                   u"You select a rule set using the PO Matching Ruleset option in Policies.", A+"access-purchase-order-matching-rules-8407c500.md")
   + inf(u" Scoping limit worth knowing before choosing the policy: a rule set is tied to its policy and the policy's own attributes, so matching cannot be varied per expense type or account code - one policy, one rule set.")},

  {"order":28,"page":"Policies","action":"confirm the policy is flagged as a PO policy","field":"Is PO Policy?",
   "rationale": inf(u"The PO Matching Ruleset control is part of the PO section of a policy, so on a policy that is not yet PO-flagged the field in order 29 will not be present to set. Inferred from the already-built Group 1 step g1-s2-po-and-purchase-request-policy, which establishes that checking Is PO Policy? is what exposes PO Matching Ruleset; this run adds no new evidence for it and does not re-home that field.")},

  {"order":29,"page":"Policies","action":"select the newly built rule set by name","field":"PO Matching Ruleset",
   "rationale": cs(u"LAST, and it is what makes everything above take effect. Until this is set the rule set has no associated policy, In Use stays No, and no invoice is ever evaluated against it. Conversely, the moment invoices start running under this policy the set locks - which is why every edit above had to be finished first.",
                   u"once a match rule set is run against a PO associated invoice a status of In Use is assigned and the rule set is locked: it cannot be edited or deleted from the system.", A+"test-and-change-match-rule-sets-49f57319.md")},

  {"order":30,"page":"Purchase Order Matching Rules","action":"return to the list page and read the Associated Policies column back","field":"associated_policies",
   "rationale": cs(u"The read-back that proves order 29 landed; this column is a display of the Policies selection, not an editable binding, so a driver must never try to write here.",
                   u"Associated Policies: Shows what Invoice PO policy has been configured to include this PO matching rule set.", A+"access-purchase-order-matching-rules-8407c500.md")},
 ]
})

# ---------------------------------------------------------------- STEP 2
steps.append({
 "id": "grp3-three-way-matching-with-receipt-confirmation",
 "name": "Configure three-way matching (invoice to PO to receipt) with receipt confirmation",
 "goal": ("Invoice lines are validated against both the purchase order and the goods receipts, with a Rules-tab "
          "Line Item - Receipt rule, a Life to Date Match against Received Quantity rule, a tolerance, an exception "
          "message, and a receipt confirmation type that tells the invoice owner what to do. SILENT HALF-WORKS: "
          "(a) build the rules before the Quantity Receipt file is imported and every line looks unreceived; "
          "(b) build only one of the two rules and the vendor recommendation of using all three is not met - the "
          "quantity envelope or the per-line check is missing with no error; (c) add the Delivery Slip Number field "
          "AFTER the rules are live and matching silently changes from sequential-by-receipt to DSN-targeted, with no "
          "fallback when no GRN carries the number; (d) configure any confirmation type without Is Receipt Required = Yes "
          "on the PO line and none of it is ever evaluated."),
 "pages": ["Forms and Fields", "Purchase Order Matching Rules", "Audit Rules"],
 "fields": [
   "formType","formsTabList","addFieldsToFormsFieldSelector","addFieldsConfirmButton",
   "rule_set_name","rule_groups_list","edit_rules_button","rules_tab","level_field","payment_request_field",
   "purchase_order_field","tolerance","value_percentage_radio","exception_message","change_button",
   "allow_submit_approve","add_button","life_to_date_tab","life_to_date_rule_selection","overage_tolerance",
   "save_button","edit_confirmation_button","confirmation_type",
   "event","data_object","field_value"
 ],
 "sequence": [
  {"order":1,"page":"Forms and Fields","action":"select the Payment Request Header form type","field":"formType",
   "rationale": cs(u"FIRST, and this is the ordering fact that costs the most if missed: whether the Delivery Slip Number field exists on the header form decides what a Line Item - Receipt rule actually associates against. Add it later and the association logic changes underneath rules that are already live.",
                   u"In the Form Type list, select the Payment Request Header form.", A+"configure-three-way-matching-c043e5c8.md")
   + u' CORPUS-STATED consequence of skipping it entirely: "If the admin does not add the Delivery Slip Number field to the form, Concur Invoice will perform the matching sequentially by receipt." — ' + A+"delivery-slip-number-field-for-three-way-matching-b0d3f1ca.md"},

  {"order":2,"page":"Forms and Fields","action":"select the specific header form to modify, then open Add Fields","field":"formsTabList",
   "rationale": cs(u"The form list is only populated once a form type is chosen, so this cannot precede order 1.",
                   u"Once you have selected a form type, the list of available forms of that type appears (in the figure below, the Employee form)", A+"configure-forms-and-fields-fdb4d086.md")
   if False else inf(u"The form list only populates after a form type is chosen, so this cannot precede order 1; inferred from the already-built Forms and Fields page record for formsTabList, whose own evidence states the list appears once a form type is selected. No new claim is made here.")},

  {"order":3,"page":"Forms and Fields","action":"select the Delivery Slip Number field in the Add Fields to Forms window","field":"addFieldsToFormsFieldSelector",
   "rationale": cs(u"This is the optional leg the three-way matching topic names, and it is a decision with teeth rather than a cosmetic addition.",
                   u"the admin should add the Delivery Slip Number field to the Payment Request Header form in the Forms and Fields tool.", A+"configure-three-way-matching-c043e5c8.md")
   + u' HARD NEGATIVE a driver cannot infer, CORPUS-STATED: once DSN is in play there is NO fallback — "If Concur Invoice does not find a GRN with the same DSN, it will not revert to the sequential association logic but will instead leave the invoice unassociated to the GRNs." — ' + T+"receipt-association-and-three-way-matching-12b976a5.md"},

  {"order":4,"page":"Forms and Fields","action":"click Add Fields to commit the field onto the form","field":"addFieldsConfirmButton",
   "rationale": cs(u"Commits order 3; until this fires the field is selected but not on the form, and the matching behaviour is still the sequential one.",
                   u"Click the Delivery Slip Number field, and then click Add Fields.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":5,"page":"Purchase Order Matching Rules","action":"confirm the Quantity Receipt file has been imported, then double-click the rule set to use","field":"rule_set_name",
   "rationale": cs(u"THE PRECONDITION FOR THE WHOLE STEP: without receipt data there is nothing for a receipt rule to compare against, and the rules will simply never be satisfiable.",
                   u"Before the admin can start to configure three-way matching, the client needs to import the Quantity Receipt file", A+"configure-three-way-matching-c043e5c8.md")
   + u' CONTRADICTION, RECORDED NOT RECONCILED - HOW MANY IMPORT ROUTES EXIST: admin-guides names THREE ("they need to import the Quantity Receipt file, which they can do through an FTP import, through the API, or by entering receipt data using Concur Receiving." — ' + A+'quantity-receipt-import-for-three-way-matching-1fc33cab.md) while the tools-guides twin names only FTP and API. The import itself is a file interface, not an admin page in this graph.'},

  {"order":6,"page":"Purchase Order Matching Rules","action":"select the rule group inside the opened rule set","field":"rule_groups_list",
   "rationale": cs(u"The rules window belongs to a rule GROUP, not to the rule set, so the group must be chosen before the tabs exist.",
                   u"Double-click the rule you want to use, and then, in the Rule Groups list, select a rule group and click Edit Rules.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":7,"page":"Purchase Order Matching Rules","action":"click Edit Rules to open the rule group rules window","field":"edit_rules_button",
   "rationale": cs(u"Opens the named window that holds both tabs used below.",
                   u"in the Rule Groups list, select a rule group and click Edit Rules. The Purchase Order Matching Rule Group rules window appears.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":8,"page":"Purchase Order Matching Rules","action":"work on the Rules tab","field":"rules_tab",
   "rationale": cs(u"The Rules-tab leg is done before the Life to Date leg because the corpus's own procedure runs in that order (Level/field pair/tolerance/Add at its steps 3-7, then the Life to Date tab at its step 8).",
                   u"Click the Life to Date tab, and then select the Match against Received Quantity option.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":9,"page":"Purchase Order Matching Rules","action":"select the receipt level in the Level list","field":"level_field",
   "rationale": cs(u"The receipt level is what turns a two-way match into a three-way one, and it must precede the field pair because it is what populates those lists.",
                   u"In the Level list, select Line Item – Receipt, and then, in the Payment Request and Purchase Order lists, select one of the following options:", A+"configure-three-way-matching-c043e5c8.md")
   + u" LABEL DRIFT, RECORDED: this file writes the value with an EN DASH, step-3 writes it with an ASCII hyphen. Match on words, not punctuation."},

  {"order":10,"page":"Purchase Order Matching Rules","action":"select the invoice-side field of the documented receipt pair","field":"payment_request_field",
   "rationale": cs(u"This is the one place the corpus actually enumerates a Payment Request / Purchase Order pairing, and both members must be set from the same pair - mixing halves produces a rule that compares unrelated fields.",
                   u"Line Quantity and Received Quantity (compares the quantity of the invoice line with the available quantity on the associated receipts)", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":11,"page":"Purchase Order Matching Rules","action":"select the matching PO-side field of the same pair","field":"purchase_order_field",
   "rationale": cs(u"Second half of the enumerated pair; the alternative documented pair checks association rather than quantity.",
                   u"Receipt Associated and Receipt Associated (checks if the line item is associated with a purchase order line but does not have a receipt associated with it)", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":12,"page":"Purchase Order Matching Rules","action":"set the tolerance, then its basis","field":"tolerance",
   "rationale": cs(u"Conditional on the field pair above, so it can only be set after orders 10-11. The two choices are made in one pass here - None/Within/Custom and then Value/Percentage.",
                   u"If applicable, in the Tolerance section, select None, Within, or Custom, and then select Value or Percentage.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":13,"page":"Purchase Order Matching Rules","action":"set the Value or Percentage basis for the tolerance","field":"value_percentage_radio",
   "rationale": cs(u"Follows the None/Within/Custom choice in the same sentence; leaving it unset leaves the tolerance with no stated units.",
                   u"If applicable, in the Tolerance section, select None, Within, or Custom, and then select Value or Percentage.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":14,"page":"Purchase Order Matching Rules","action":"(optional) click Change and author the exception text","field":"change_button",
   "rationale": cs(u"Authored before Add, because Add commits the rule row and the message is part of what that row carries.",
                   u"Exception Message: Click Change and add a message by clicking New, or edit an existing message by selecting it and clicking Edit, then click Save.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":15,"page":"Purchase Order Matching Rules","action":"(optional) record which message the rule will raise","field":"exception_message",
   "rationale": cs(u"The message only surfaces when the rule actually trips, so a rule configured without one fails silently from the user's point of view.",
                   u"The Exception Message option is available on the Rules tab and will only display when the user triggers the configured rule.", A+"refine-the-rules-include-an-exception-message-c174b2b6.md")},

  {"order":16,"page":"Purchase Order Matching Rules","action":"decide whether a tripped rule blocks the invoice","field":"allow_submit_approve",
   "rationale": cs(u"Decided before Add for the same reason as the message: it is part of the rule's behaviour, not a later override. Cleared, every receipt shortfall is a hard stop.",
                   u"Allow Submit/Approve: Select this check box to allow submission and processing of the invoice even if an exception is triggered.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":17,"page":"Purchase Order Matching Rules","action":"click Add to commit the Rules-tab rule","field":"add_button",
   "rationale": cs(u"Commits the receipt-level rule; the corpus places this immediately before the tab switch, so an unclicked Add is lost when order 18 changes tabs.",
                   u"Click Add.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":18,"page":"Purchase Order Matching Rules","action":"click the Life to Date tab","field":"life_to_date_tab",
   "rationale": cs(u"Second half of the three-way configuration; the corpus explicitly recommends running BOTH the Rules-tab receipt rule and the Life to Date received-quantity rule.",
                   u"the admin can select the Line Item – Receipt rule in the Rules tab and the Matched against Received Quantity rule in the Life to Date tab", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":19,"page":"Purchase Order Matching Rules","action":"select the received-quantity rule type","field":"life_to_date_rule_selection",
   "rationale": cs(u"The cumulative counterpart of the per-line rule: it compares total invoiced quantities against total received quantities across every invoice sharing the PO number, which the per-line rule cannot see.",
                   u"Click the Life to Date tab, and then select the Match against Received Quantity option.", A+"configure-three-way-matching-c043e5c8.md")
   + u' LABEL DRIFT, RECORDED: the same file writes "Matched against Received Quantity" in its overview bullet and "Match against Received Quantity" in its procedure and in the canonical table.'},

  {"order":20,"page":"Purchase Order Matching Rules","action":"set the overage tolerance basis","field":"overage_tolerance",
   "rationale": cs(u"Appears only after the check box in order 19 is selected, and governs how far above the received quantity an invoice may go before the exception fires.",
                   u"In the Overage Tolerance section, select Value or Percentage.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":21,"page":"Purchase Order Matching Rules","action":"click Save to commit both legs","field":"save_button",
   "rationale": cs(u"Terminal commit of the three-way configuration; the corpus ends the procedure here, after both tabs are done, not between them.",
                   u"SAP Concur recommends that clients include all other rules that they typically use in any matching situation, such as unit price and vendor.", A+"configure-three-way-matching-c043e5c8.md")
   + u' CARDINALITY CONTRADICTION, RECORDED NOT RECONCILED: this file names two rules and then recommends "all three" ("SAP Concur recommends that clients use all three of these rules for three-way matching."), while the tools-guides twin says three rules are available and recommends using "both" of them.'},

  {"order":22,"page":"Purchase Order Matching Rules","action":"select the rule set or rule condition and click Edit Confirmation","field":"edit_confirmation_button",
   "rationale": cs(u"The receipt confirmation leg comes AFTER the rules exist, because the confirmation type is chosen per rule group / rule condition - there is nothing to attach it to beforehand.",
                   u"Do this by clicking Edit Confirmation to open the Select Confirmation Type window, choosing a confirmation type based on the rule group.", A+"step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md")},

  {"order":23,"page":"Purchase Order Matching Rules","action":"choose the confirmation type in the Select Confirmation Type window","field":"confirmation_type",
   "rationale": cs(u"THE GATE THAT MAKES OR BREAKS THIS ENTIRE LEG, and it is not on this page: the PO line's Is Receipt Required value is set by PO Import, a file interface with no admin UI page in this graph. Set every confirmation type you like - if that value is not Yes, none of it runs for that line.",
                   u"Unless the Receipt Required field is set to Yes, no receipt confirmation logic configured in Concur Invoice will be evaluated for that line.", A+"is-receipt-required-value-on-po-line-item-896466e1.md")
   + u' NOT-YET-BUILT PAGE, LEFT AS AN OPEN LEG: the confirmation type decides WHICH message fires; the message TEXT is authored and localized elsewhere — "This text can be customized from the default text and localized into other languages by clickingAdministration > Invoice > Localization to access this tool." — ' + A+"step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md" + u" (note the missing space after 'clicking' in the source). Localization is not a page in this graph, so no sequence entry is emitted for it and no field name is invented for it."},

  {"order":24,"page":"Audit Rules","action":"(optional) create a companion audit rule on a Payment Request Detail event","field":"event",
   "rationale": cs(u"Explicitly optional and explicitly last - it complements the matching rules rather than replacing them, and the two association fields it needs only appear on the two named events.",
                   u"These rules are Is Purchase Order line Associated and Is Receipt Associated, which will be available when the admin selects the Payment Request Detail Save or the Payment Request Detail Submit events.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":25,"page":"Audit Rules","action":"(optional) build the condition on the association data object","field":"data_object",
   "rationale": cs(u"Condition authoring follows event selection on the already-built Audit Rules page; the event is what makes the association fields selectable at all.",
                   u"The admin can create rules by using the Is Purchase Order line Associated or Is Receipt Associated fields in the Audit Rules tool.", A+"configure-three-way-matching-c043e5c8.md")},

  {"order":26,"page":"Audit Rules","action":"(optional) select Is Purchase Order line Associated or Is Receipt Associated as the compared value","field":"field_value",
   "rationale": cs(u"Named fields, not invented ones - and they belong to the already-built Audit Rules page, never re-homed onto Purchase Order Matching Rules.",
                   u"The admin can create rules by using the Is Purchase Order line Associated or Is Receipt Associated fields in the Audit Rules tool.", A+"configure-three-way-matching-c043e5c8.md")},
 ]
})

# ---------------------------------------------------------------- STEP 3
steps.append({
 "id": "grp3-condition-based-rule-group",
 "name": "Add a condition-based rule group to an existing named rules group (Multiple Matching Rule Sets)",
 "goal": ("One matching rule set carries several named rules groups, with a condition-based group nested under an "
          "existing group so that a different set of tolerances fires for a specific vendor, division, project or spend "
          "type. SILENT HALF-WORKS: (a) configure the conditions but never open Edit Rules on the new condition and you "
          "have a condition that detects something and then does nothing; (b) click Save in the conditions dialog but "
          "never Update after each rule and the rules do not land in the row; (c) attach the confirmation type to the "
          "wrong object - it can be set on the rule SET or on a rule CONDITION, and the two behave differently."),
 "pages": ["Purchase Order Matching Rules"],
 "fields": [
   "rule_set_name","edit_button","rule_groups_list","add_button","group_conditions_dialog","insert_button",
   "save_button","edit_rules_button","update_button","edit_confirmation_button","confirmation_type","in_use"
 ],
 "sequence": [
  {"order":1,"page":"Purchase Order Matching Rules","action":"check the In Use status of the target rule set","field":"in_use",
   "rationale": cs(u"Same gate as every other edit on this page, and it bites hardest here because condition-based groups are usually added to a set that has already been in service. In Use = Yes means this whole procedure is impossible on that row; you must copy it first.",
                   u"A rule set with an In Use status of Yes cannot be modified in any way.", A+"access-purchase-order-matching-rules-8407c500.md")},

  {"order":2,"page":"Purchase Order Matching Rules","action":"select the matching rule set and click Edit","field":"rule_set_name",
   "rationale": cs(u"The corpus opens this procedure exactly here; the condition-based group is added inside an existing set, never created standalone.",
                   u"Select the matching rule set in Purchase Order Matching Rules and then click Edit.", A+"step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md")},

  {"order":3,"page":"Purchase Order Matching Rules","action":"click Edit to open the rule set","field":"edit_button",
   "rationale": cs(u"Opens the set for editing; without it the rule groups list below is not reachable.",
                   u"Select the matching rule set in Purchase Order Matching Rules and then click Edit.", A+"step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md")},

  {"order":4,"page":"Purchase Order Matching Rules","action":"select the named rule group the condition-based group will sit under","field":"rule_groups_list",
   "rationale": cs(u"The parent group must be selected BEFORE Add, because the new group is created 'under' whatever is selected - Add with the wrong parent selected buries the conditions in the wrong branch of the set.",
                   u"Select the named rule group within which the condition-based rule set will be included, then click Add.", A+"step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md")
   + inf(u" Why this matters at all: the corpus describes the result as a set that can run across different PO types, with the conditions deciding which branch applies. Nesting under the wrong parent therefore mis-scopes the rules rather than erroring.")},

  {"order":5,"page":"Purchase Order Matching Rules","action":"click Add to create the condition-based group","field":"add_button",
   "rationale": cs(u"Same label as the Rules-tab Add in the end-to-end step but a different act entirely: here it creates a nested group, there it commits a rule row. A driver must resolve Add by context, not by label.",
                   u"Select the named rule group within which the condition-based rule set will be included, then click Add.", A+"step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md")},

  {"order":6,"page":"Purchase Order Matching Rules","action":"configure the detection conditions in the group conditions dialog","field":"group_conditions_dialog",
   "rationale": cs(u"Conditions are authored before any rule, because they are what the rules will hang off; a rule authored first has no condition to be triggered by.",
                   u"In Purchase Order Matching Rules Group Conditions, configure the conditions that the system will detect and then execute the matching rule set on", A+"step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md")
   + u" This is a NESTED WINDOW of this page with no independent click path - do not treat it as a page."},

  {"order":7,"page":"Purchase Order Matching Rules","action":"click Insert for each additional condition, then Save the dialog","field":"insert_button",
   "rationale": cs(u"Insert is per-condition and Save closes the dialog: Save without Insert loses the pending condition. SAP typo preserved in the source ('any addition conditions').",
                   u"Click Insert to add any addition conditions, and then click Save when you are done.", A+"step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md")},

  {"order":8,"page":"Purchase Order Matching Rules","action":"select the new condition and click Edit Rules","field":"edit_rules_button",
   "rationale": cs(u"THE STEP THAT IS EASIEST TO SKIP AND THE MOST DAMAGING TO SKIP: without it the condition is detected and nothing happens. Edit Rules on the NEW CONDITION - not on the parent group - is what specifies the consequence.",
                   u"Select the new condition, and then click Edit Rules to specify what should happen when the system detects the condition", A+"step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md")},

  {"order":9,"page":"Purchase Order Matching Rules","action":"click Update after each rule to add it to the row","field":"update_button",
   "rationale": cs(u"Update, not Add, is the commit inside the condition-based branch, and it is per-rule: author several rules and click Update once and only the last survives.",
                   u"Add any additional rules, clicking Update after each new rule to add it to the row, then click Save.", A+"step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md")},

  {"order":10,"page":"Purchase Order Matching Rules","action":"click Save to commit the condition-based group","field":"save_button",
   "rationale": cs(u"Terminal commit, explicitly after the last Update in the same sentence.",
                   u"Add any additional rules, clicking Update after each new rule to add it to the row, then click Save.", A+"step-4-add-condition-based-rule-to-a-named-rules-group-db93fb81.md")},

  {"order":11,"page":"Purchase Order Matching Rules","action":"(optional) select the rule set or the rule condition and click Edit Confirmation","field":"edit_confirmation_button",
   "rationale": cs(u"Deliberately after the conditions exist: the corpus binds the confirmation text to the field type chosen when the rule group conditions were created, so doing this before order 6 has nothing to bind to.",
                   u"These are associated with the field type you select when creating the rule group conditions using the Condition Editor.", A+"step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md")},

  {"order":12,"page":"Purchase Order Matching Rules","action":"(optional) choose the confirmation type for this rule group","field":"confirmation_type",
   "rationale": cs(u"Chosen per rule group, which is why it belongs at the end of the condition work rather than at the top of it.",
                   u"Do this by clicking Edit Confirmation to open the Select Confirmation Type window, choosing a confirmation type based on the rule group.", A+"step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md")
   + u' OPEN LEG, NOT EMITTED AS A SEQUENCE ENTRY: changing or localizing the instructional text itself is done on the Localization tool, which is not yet a page in this graph — "This text can be customized from the default text and localized into other languages by clickingAdministration > Invoice > Localization to access this tool." — ' + A+"step-5-change-localize-receipt-confirmation-type-instructional-text-5328a8e1.md"},
 ]
})

# ---------------------------------------------------------------- STEP 4
steps.append({
 "id": "grp3-replace-in-use-rule-set",
 "name": "Change the matching rules on a rule set that has locked at In Use = Yes",
 "goal": ("A live PO policy ends up running amended matching rules even though the rule set it was running is "
          "permanently locked. SILENT HALF-WORKS AND HARD FAILURES: (a) trying to edit the locked set directly - it "
          "cannot be edited OR deleted, ever; (b) editing the copy and stopping there, leaving the policy still bound "
          "to the old locked set, so nothing changes in production while the admin believes it has; (c) taking the "
          "unlock route on a large invoice population - the corpus only calls it feasible when the number of associated "
          "invoices is small."),
 "pages": ["Purchase Order Matching Rules", "Policies"],
 "fields": [
   "rule_set_name","in_use","copy_button","rename_button","done_button","edit_button","save_button",
   "associated_policies","Policy Name","PO Matching Ruleset"
 ],
 "sequence": [
  {"order":1,"page":"Purchase Order Matching Rules","action":"read the In Use column for the rule set that needs changing","field":"in_use",
   "rationale": cs(u"The whole branch turns on this one value. Yes is not a warning, it is a permanent lock on that object.",
                   u"once a match rule set is run against a PO associated invoice a status of In Use is assigned and the rule set is locked: it cannot be edited or deleted from the system.", A+"test-and-change-match-rule-sets-49f57319.md")
   + u' ALTERNATIVE ROUTE, DELIBERATELY NOT EMITTED AS A SEQUENCE ENTRY BECAUSE ITS CONTROL IS NOT ON AN ADMIN PAGE: "A matching rule set with a status of In Use can be unlocked by breaking its association with all invoices it is associated with." — ' + A+'test-and-change-match-rule-sets-49f57319.md; the control lives in the Actions menu of the end-user invoice list ("In the Actions menu, click Change to Non-PO." — ' + T+'change-a-po-based-invoice-policy-to-a-non-po-based-invoice-policy-12786d77.md), and its LABEL IS CONTRADICTED across three topics - "Change to Non-PO", "Change to Non PO Invoice", and the imperative form above. After it succeeds: "Now, the rule set has a status of No and can be edited using the Edit button:"'},

  {"order":2,"page":"Purchase Order Matching Rules","action":"select the locked rule set row","field":"rule_set_name",
   "rationale": cs(u"The locked set is the base to copy from, so it is selected rather than opened - a driver that tries Edit here gets nothing and may misread the lock as a broken control.",
                   u"The administrator is restricted to editing only those PO matching rules that do not have a status of In Use.", A+"edit-purchase-order-matching-rules-604d1e31.md")},

  {"order":3,"page":"Purchase Order Matching Rules","action":"click Copy","field":"copy_button",
   "rationale": cs(u"Copy is the prescribed escape from the lock, and it is first because the whole remedy is a copy-edit-swap, in that order.",
                   u"use the Copy button to create a copy, edit the rule set as needed, then change the PO Matching Ruleset value in Policies to implement the new rules.", A+"access-purchase-order-matching-rules-8407c500.md")},

  {"order":4,"page":"Purchase Order Matching Rules","action":"rename the copy, incrementing the version, and press Enter","field":"rename_button",
   "rationale": cs(u"Naming discipline is load-bearing here rather than cosmetic: because every tested set locks, a tenant accumulates versions, and the corpus prescribes an incrementing convention so the production set can be identified later.",
                   u"Repeat steps 1–3 for any additional changes, incrementing the version name each time.", A+"test-and-change-match-rule-sets-49f57319.md")},

  {"order":5,"page":"Purchase Order Matching Rules","action":"click Done to close the copy wizard","field":"done_button",
   "rationale": cs(u"Closes the Copy > Rename > Done wizard before the copy can be opened for editing; it is not the rule-set Save.",
                   u"3.  Click Done.", A+"step-1-create-the-purchase-order-matching-rule-set-4d3866f3.md")},

  {"order":6,"page":"Purchase Order Matching Rules","action":"select the copy and click Edit, then amend its Life to Date and Rules configuration","field":"edit_button",
   "rationale": cs(u"Edit works on the copy precisely because the copy has never run against an invoice, so its In Use is still No. The amendment itself follows the same two sub-procedures as the end-to-end step.",
                   u"Change the matching rules configuration by following the procedures under Step 2: Create the Life to Date Matching Rule Set and Step 3: Create the PO to Request Fields Matching Rules.", A+"edit-purchase-order-matching-rules-604d1e31.md")},

  {"order":7,"page":"Purchase Order Matching Rules","action":"click Save","field":"save_button",
   "rationale": cs(u"Commits the amended copy before the policy is pointed at it - swap first and the policy briefly runs a half-edited set against live invoices, which would lock it in that state.",
                   u"4.  Click Save.", A+"edit-purchase-order-matching-rules-604d1e31.md")},

  {"order":8,"page":"Policies","action":"open the policy currently bound to the locked rule set","field":"Policy Name",
   "rationale": cs(u"Which policy to open is read off the locked set's own Associated Policies column, so this order depends on order 1 having been read properly.",
                   u"Associated Policies: Shows what Invoice PO policy has been configured to include this PO matching rule set.", A+"access-purchase-order-matching-rules-8407c500.md")},

  {"order":9,"page":"Policies","action":"change the selection to the amended copy","field":"PO Matching Ruleset",
   "rationale": cs(u"THE STEP THAT ACTUALLY CHANGES PRODUCTION. Everything before it is preparation; skip it and the policy keeps running the locked original while the admin believes the fix shipped.",
                   u"use the Copy button to create a copy, edit the rule set as needed, then change the PO Matching Ruleset value in Policies to implement the new rules.", A+"access-purchase-order-matching-rules-8407c500.md")
   + u' The corpus states the same remedy as an ordered test loop: "Make edits, and, when you are finished, apply the rule set to the relevant policy." — ' + A+"test-and-change-match-rule-sets-49f57319.md"},

  {"order":10,"page":"Purchase Order Matching Rules","action":"read Associated Policies back on both rows to confirm the swap","field":"associated_policies",
   "rationale": cs(u"The only documented read-back that the binding moved. It is a display of the Policies selection, never an editable field on this page.",
                   u"You select a rule set using the PO Matching Ruleset option in Policies.", A+"access-purchase-order-matching-rules-8407c500.md")},
 ]
})

# ---------------------------------------------------------------- STEP 5
steps.append({
 "id": "grp3-group-aware-purchase-order-configuration",
 "name": "Configure a group-aware purchase order: numbering, transmittal messaging, branding and printed fields",
 "goal": ("One invoice group's purchase orders are generated with the intended number sequence and transmitted to "
          "vendors with the right company identity, message, sender address, attachments and printed field set. "
          "SILENT HALF-WORKS: (a) configure without first selecting the Group and the settings land on the wrong "
          "configuration - and a group that never gets one silently falls back to the Global Group; (b) set the "
          "Next Sequence casually and you are stuck, because once the system is in use the number can only be moved "
          "further along, never back; (c) pick the printed fields without first setting the Policy list and you have "
          "chosen fields for the wrong policy."),
 "pages": ["Purchase Order Configuration"],
 "fields": [
   "group_selector","po_number_next_sequence","po_number_prefix","po_number_postfix",
   "message_to_include_on_transmitted_purchase_orders","default_email_subject_when_transmitting_purchase_orders",
   "default_email_message_when_transmitting_purchase_orders","company_address","company_branding_logo",
   "default_sender_email","supporting_documents","policy","fields_to_appear_on_purchase_orders",
   "ship_to_without_requestor_name","company_name_without_address"
 ],
 "sequence": [
  {"order":1,"page":"Purchase Order Configuration","action":"select the invoice Group this configuration is for, before creating or editing anything","field":"group_selector",
   "rationale": cs(u"FIRST, and the corpus says so in the plainest possible terms. Every field below is scoped by this choice; set them with the wrong group selected and they land on another subsidiary's transmittals.",
                   u"Each PO configuration you create is based on the Group you select before creating the configuration.", A+"purchase-order-configuration-is-group-aware-b603f04b.md")
   + u' AND THE FAILURE IS SILENT, CORPUS-STATED: "Groups with no PO configuration assigned use the Global Group configuration by default." — concur-invoice-professional-edition-admin-guides/purchase-order-configuration-is-group-aware-b603f04b.md: a group you forget simply inherits, with no error to notice.'
   + u' LOCATION UNATTESTED - REAL GAP, NOT AN OMISSION: the corpus never states WHERE the Group is selected; no Group control is documented on the tool itself. A driver must probe, not assume a picker on this page.'
   + u' ROLE GATE, CORPUS-STATED: "The Purchase Order Configuration tool is available to the Invoice Configuration administrator for setting default information for purchase orders. To view this tool, click Administration > Invoice > Purchase Order Configuration." — ' + A+"use-the-purchase-order-configuration-tool-51009c8c.md"},

  {"order":2,"page":"Purchase Order Configuration","action":"enter the starting PO number in the PO Number Generation section","field":"po_number_next_sequence",
   "rationale": cs(u"Do this before the system is in use, because afterwards it is one-way: the number can only be reset to one further along the sequence. There is also a 9-character limit on the PO number.",
                   u'What you enter in the Next Sequence field will be the starting number, which can be altered once the system is in use only by using a number "further along" the numbering sequence in use', A+"configure-purchase-orders-8128725e.md")
   + u' PLAN THE TEST NUMBERS DELIBERATELY, CORPUS-STATED: "TIP: For testing, plan your sequential number assignment so that, once testing is completed, the starting number sequence for production is what you want." — concur-invoice-professional-edition-admin-guides/configure-purchase-orders-8128725e.md.'
   + inf(u" UNDETERMINED, DO NOT ASSUME: whether the 9-character limit applies to the sequence alone or to prefix + sequence + postfix combined is never stated in this corpus.")},

  {"order":3,"page":"Purchase Order Configuration","action":"set the PO number prefix","field":"po_number_prefix",
   "rationale": cs(u"Set alongside the sequence rather than later, because prefix, sequence and postfix compose one generated number and the 9-character ceiling is stated for the number as a whole.",
                   u"The prefix and postfix of the PO number do not distinguish between uppercase and lowercase.", A+"configure-purchase-orders-8128725e.md")
   + u" LABEL WARNING: the corpus only ever writes this control in lowercase inside a Note ('prefix'), never as an on-screen label - a driver must probe for it rather than match a literal string."},

  {"order":4,"page":"Purchase Order Configuration","action":"set the PO number postfix","field":"po_number_postfix",
   "rationale": cs(u"Same composition reason as order 3, and case-insensitive for the same stated reason. The only content guidance is a convention, not a rule, and no maximum length is documented for the postfix itself.",
                   u"Typically, the Postfix value is the initials of the purchasing agents.", A+"configure-purchase-orders-8128725e.md")},

  {"order":5,"page":"Purchase Order Configuration","action":"enter the instructions that ride on the transmitted PO itself","field":"message_to_include_on_transmitted_purchase_orders",
   "rationale": cs(u"This message is printed on the purchase order, not in the carrying email - conflating it with the two email fields below is the classic mistake, and produces vendor instructions that never reach the document.",
                   u"Enter instructions you want the vendor to note and follow.", A+"configure-purchase-orders-8128725e.md")
   + u' HARD LIMIT, CORPUS-STATED: "This field is limited to 3200 characters." — concur-invoice-professional-edition-admin-guides/configure-purchase-orders-8128725e.md. Do not carry this limit to the email fields.'},

  {"order":6,"page":"Purchase Order Configuration","action":"set the default subject line for PO transmission emails","field":"default_email_subject_when_transmitting_purchase_orders",
   "rationale": cs(u"Governs the carrying email, not the document - the counterpart to order 5.",
                   u"The text entered in the Default Email Subject When Transmitting Purchase Orders field will appear in the subject field of the email sent to the vendor (the admin can customize this field).", A+"configure-purchase-orders-8128725e.md")
   + u' HARD LIMIT, CORPUS-STATED: "This field is limited to 500 characters." — concur-invoice-professional-edition-admin-guides/configure-purchase-orders-8128725e.md. UNENUMERATED: the corpus says a tool tip offers tokens for this field but NEVER lists them; do not import a token catalogue from any other topic.'},

  {"order":7,"page":"Purchase Order Configuration","action":"set the default body text for PO transmission emails","field":"default_email_message_when_transmitting_purchase_orders",
   "rationale": cs(u"This one is a DEFAULT, not a lock - the corpus states it can be changed at review time before transmittal, so a writer should not treat a per-PO deviation as a configuration failure. No character limit is documented for this field; do not carry over the 3200 or 500 figures.",
                   u"The text entered in the Default Email Message When Transmitting Purchase Orders field will appear in the body of the email sent to the vendor (note that this can be changed as you review the PO prior to transmittal):", A+"configure-purchase-orders-8128725e.md")},

  {"order":8,"page":"Purchase Order Configuration","action":"enter the company address that prints on the PO","field":"company_address",
   "rationale": cs(u"Part of the group-varying company identity, so it belongs after the Group is settled in order 1.",
                   u"Enter your company address in the Company Address field.", A+"configure-purchase-orders-8128725e.md")
   + u" FENCE: this is a single free-text address printed on the PO PDF. It is NOT the structured Ship To / Bill To address-book records on the already-built Company Locations page. Do not merge or re-home."},

  {"order":9,"page":"Purchase Order Configuration","action":"click Upload in the Company Branding Logo section","field":"company_branding_logo",
   "rationale": cs(u"Group-scoped and singular, which is exactly why order 1 has to be right first - there is one logo per invoice group and uploading under the wrong group overwrites that group's brand.",
                   u"The logo is group-aware in the same way as the purchase order configuration and clients can only update one company logo per invoice group.", A+"configure-purchase-orders-8128725e.md")
   + u' CONSTRAINTS, CORPUS-STATED: "The image should be 55 pixels high and no more than 200 pixels in length and 100 KB in size." — concur-invoice-professional-edition-admin-guides/configure-purchase-orders-8128725e.md, which also enumerates the accepted formats and the View / Remove controls.'},

  {"order":10,"page":"Purchase Order Configuration","action":"type the desired prefix for the sender address","field":"default_sender_email",
   "rationale": cs(u"Only the prefix is editable; the suffix is fixed. Leaving it BLANK is not a neutral default - it changes the From address to the requestor's own, which SAP explicitly does not recommend because of spam filtering.",
                   u'If the prefix is left blank, the system will use the requestor’s email address as the "From" address.', A+"configure-purchase-orders-8128725e.md")
   + u' SCOPE CONTRADICTION, RECORDED NOT RECONCILED: the same prefix lever is also given to the PO Processor at transmit time — "The processor can change the prefix for the From address but cannot change the suffix of the address" — ' + T+"preview-a-purchase-order-846396e1.md" + u". So the configured value can be overridden downstream by a different role."},

  {"order":11,"page":"Purchase Order Configuration","action":"upload the documents that should ride along with every PO transmittal for this group","field":"supporting_documents",
   "rationale": cs(u"Group-scoped like the logo, so again strictly after order 1. These are additive, not exclusive - they do not replace what the user attaches.",
                   u"These documents apply to all PO transmissions performed by the PO Processor for that Group and are included alongside any documents added by the user.", T+"manage-images-03021850.md")
   + u' CORPUS-STATED effect: "These documents will be included when the supplier receives the PO." — ' + A+"configure-purchase-orders-8128725e.md"},

  {"order":12,"page":"Purchase Order Configuration","action":"select the correct policy in the Policy list","field":"policy",
   "rationale": cs(u"BEFORE the field selection below, and the corpus makes this an explicit instruction rather than an inference. Choose the printed fields with the wrong policy selected and you have configured a different policy's purchase orders.",
                   u"The header and line time fields you select will appear on the purchase order. Ensure that you have selected the correct policy in the Policy list.", A+"configure-purchase-orders-8128725e.md")
   + u" SAP TYPO PRESERVED: the source writes 'line time fields' for 'line item fields'. UNENUMERATED: the corpus never lists which policies appear here. Policy definition itself lives on the already-built Policies page; this is only the selector that scopes the field roster."},

  {"order":13,"page":"Purchase Order Configuration","action":"select the header and line item fields to print on the purchase order","field":"fields_to_appear_on_purchase_orders",
   "rationale": cs(u"Strictly after order 12, per the same sentence. UNENUMERATED, AND THE GAP IS THE FINDING: the selectable header and line-item field roster is never listed anywhere in this corpus, so a driver must read the live list rather than expect a known set.",
                   u"The header and line time fields you select will appear on the purchase order. Ensure that you have selected the correct policy in the Policy list.", A+"configure-purchase-orders-8128725e.md")},

  {"order":14,"page":"Purchase Order Configuration","action":"(optional) select the header field that suppresses the requestor's name from the ship-to address","field":"ship_to_without_requestor_name",
   "rationale": inf(u"Grouped after order 13 because the corpus describes it as a header field, i.e. a member of the same (unenumerated) printed-field roster, given its own explanatory paragraph. The ordering is inferred from that membership, not stated. CORPUS-STATED effect: \"Instead, they can use the Ship To without Requestor Name header field, whereby the requestor’s name is omitted.\" — " + A+"configure-purchase-orders-8128725e.md"
                    + u" LABEL DRIFT, RECORDED: the section heading capitalises 'Without' and the body sentence lowercases it, in the same file. Probe both.")},

  {"order":15,"page":"Purchase Order Configuration","action":"(optional) select the header field that removes the company address from the transmitted PO","field":"company_name_without_address",
   "rationale": inf(u"Same membership and same reasoning as order 14 - a header field within the printed-field roster, so it follows order 13. CORPUS-STATED purpose, for cross-country PO creation: \"Admins can select the Company Name without address header field for users who create purchase orders across countries and want to remove the purchase requester’s company address that is displayed on the transmitted purchase order.\" — " + A+"configure-purchase-orders-8128725e.md"
                    + u" NOTE the interaction a writer should think about before setting it: order 8 fills a company address in precisely so it can print. This field suppresses it.")},
 ]
})

# ---------------------------------------------------------------- STEP 6
steps.append({
 "id": "grp3-use-email-as-bill-to",
 "name": "Make purchase orders carry an email bill-to address instead of a physical one",
 "goal": ("Vendors receiving a transmitted PO see an email bill-to address that tells them where to send the invoice, "
          "instead of the physical address. THE FAILURE MODE IS ENTIRELY SILENT: if any of the three legs is missing "
          "the purchase order simply keeps printing the physical address exactly as before, with no error, no warning "
          "and nothing on the configuration page to indicate the feature is inert."),
 "pages": ["Forms and Fields", "Company Locations", "Purchase Order Configuration"],
 "fields": [
   "formType","formsTabList","addFieldsToFormsFieldSelector","addFieldsConfirmButton",
   "billToTab","newButton","emailAddress","saveButton",
   "policy","fields_to_appear_on_purchase_orders","use_email_as_bill_to"
 ],
 "sequence": [
  {"order":1,"page":"Forms and Fields","action":"select the Purchase Order Header form type","field":"formType",
   "rationale": cs(u"The whole ordering of this step is corpus-stated in one sentence, which makes both form work and address work PRECONDITIONS of the configuration selection, not companions to it: the admin can select the header field only 'provided' both are already done.",
                   u"Provided the admin has added the Use Email as Bill-To field to the Purchase Order Header form in the Forms and Fields tool and entered an email address in the bill-to email address field in the Company Locations tool", A+"configure-purchase-orders-8128725e.md")
   + u" Note the form is the PURCHASE ORDER Header form here, not the Payment Request Header form used by the Delivery Slip Number leg of three-way matching."},

  {"order":2,"page":"Forms and Fields","action":"select the specific PO header form and open Add Fields","field":"formsTabList",
   "rationale": inf(u"The form list only populates after a form type is chosen, so this cannot precede order 1; inferred from the already-built Forms and Fields page record, not from any new claim in this run.")},

  {"order":3,"page":"Forms and Fields","action":"select the Use Email as Bill-To field","field":"addFieldsToFormsFieldSelector",
   "rationale": cs(u"Leg one of the stated precondition. Without the field on the form there is nothing for the configuration selection in order 8 to expose.",
                   u"Provided the admin has added the Use Email as Bill-To field to the Purchase Order Header form in the Forms and Fields tool and entered an email address in the bill-to email address field in the Company Locations tool", A+"configure-purchase-orders-8128725e.md")},

  {"order":4,"page":"Forms and Fields","action":"click Add Fields to commit the field onto the form","field":"addFieldsConfirmButton",
   "rationale": inf(u"Commit for order 3; the field is not on the form until the confirm control fires. Inferred from the already-built Forms and Fields add-fields procedure, whose confirm control is this field.")},

  {"order":5,"page":"Company Locations","action":"open the Bill To tab","field":"billToTab",
   "rationale": cs(u"Leg two, and it must be the Bill To side specifically - a ship-to record carries no bill-to email for the PO to use.",
                   u"Provided the admin has added the Use Email as Bill-To field to the Purchase Order Header form in the Forms and Fields tool and entered an email address in the bill-to email address field in the Company Locations tool", A+"configure-purchase-orders-8128725e.md")},

  {"order":6,"page":"Company Locations","action":"create or open the bill-to location record","field":"newButton",
   "rationale": inf(u"A location record must exist before an email address can be stored on it; inferred from the already-built Company Locations page structure, where the address record is the container for the email field in order 7.")},

  {"order":7,"page":"Company Locations","action":"enter the bill-to email address","field":"emailAddress",
   "rationale": cs(u"This is the value the vendor will actually be told to send the invoice to, so an empty one is exactly the silent-failure case in this step's goal.",
                   u"The bill-to address on the PO PDF that the vendor receives is an email address which notifies the vendor to send the PO to the specified email address.", A+"configure-purchase-orders-8128725e.md")
   + u' CORPUS-STATED variant for capture clients: "Clients who use the capture service can use their capture email address as the bill-to address." — concur-invoice-professional-edition-admin-guides/configure-purchase-orders-8128725e.md.'},

  {"order":8,"page":"Company Locations","action":"click Save to store the address","field":"saveButton",
   "rationale": inf(u"Commit for orders 6-7 on the already-built Company Locations page; an unsaved address is not visible to the purchase order at transmit time.")},

  {"order":9,"page":"Purchase Order Configuration","action":"select the correct policy in the Policy list","field":"policy",
   "rationale": cs(u"Same gate as in the group-aware configuration step: the header field roster is scoped by the selected policy, so selecting the bill-to header field before setting this configures the wrong policy's purchase orders.",
                   u"The header and line time fields you select will appear on the purchase order. Ensure that you have selected the correct policy in the Policy list.", A+"configure-purchase-orders-8128725e.md")},

  {"order":10,"page":"Purchase Order Configuration","action":"select the bill-to header field within the printed field roster","field":"fields_to_appear_on_purchase_orders",
   "rationale": inf(u"The control being set in order 11 is described by the corpus as a 'header field', i.e. a member of this (unenumerated) roster, so it is reached through this control. That containment is inferred from the wording 'header field'; the corpus never enumerates the roster, so a driver must read the live list.")},

  {"order":11,"page":"Purchase Order Configuration","action":"select Use Email as Bill-To","field":"use_email_as_bill_to",
   "rationale": cs(u"LAST, because the sentence that documents it makes it conditional on orders 1-8 having already happened. And the consequence of getting the order wrong is invisible rather than loud.",
                   u"If clients have not configured this feature, the purchase order will use the physical address as it does today.", A+"configure-purchase-orders-8128725e.md")},
 ]
})

out = {"steps": steps}
p = "/tmp/claude-1000/-mnt-c-Users-manci/1c189ac8-e070-426a-be01-c36742d928ed/scratchpad/g3-parts/synth-steps.json"
with open(p,"w",encoding="utf-8") as fh:
    json.dump(out, fh, indent=1, ensure_ascii=False)
print("wrote", p, "steps", len(steps), "entries", sum(len(s['sequence']) for s in steps))
