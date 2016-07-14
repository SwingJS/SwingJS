Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JTextField", "javax.swing.event.DocumentListener", "javax.swing.text.TextAction"], "javax.swing.JFormattedTextField", ["java.lang.Boolean", "$.IllegalArgumentException", "$.Number", "java.util.Date", "java.text.DateFormat", "$.DecimalFormat", "$.Format", "$.NumberFormat", "javax.swing.ActionMap", "javax.swing.plaf.UIResource", "javax.swing.text.DateFormatter", "$.DefaultFormatter", "$.DefaultFormatterFactory", "$.DocumentFilter", "$.InternationalFormatter", "$.JSMinimalAbstractDocument", "$.NumberFormatter", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.factory = null;
this.format = null;
this.value = null;
this.editValid = false;
this.focusLostBehavior = 0;
this.edited = false;
this.documentListener = null;
this.textFormatterActionMap = null;
this.focusLostHandler = null;
if (!Clazz.isClassDefined ("javax.swing.JFormattedTextField.FocusLostHandler")) {
javax.swing.JFormattedTextField.$JFormattedTextField$FocusLostHandler$ ();
}
if (!Clazz.isClassDefined ("javax.swing.JFormattedTextField.DocumentHandler")) {
javax.swing.JFormattedTextField.$JFormattedTextField$DocumentHandler$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JFormattedTextField", javax.swing.JTextField);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JFormattedTextField, [null, null, 0]);
this.uiClassID = "FormattedTextFieldUI";
this.updateUI ();
this.enableEvents (4);
this.setFocusLostBehavior (1);
});
Clazz.makeConstructor (c$, 
function (value) {
this.construct ();
this.setValue (value);
}, "~O");
Clazz.makeConstructor (c$, 
function (format) {
this.construct ();
this.setFormatterFactory (this.getDefaultFormatterFactory (format));
}, "java.text.Format");
Clazz.makeConstructor (c$, 
function (formatter) {
this.construct ( new javax.swing.text.DefaultFormatterFactory (formatter));
}, "javax.swing.JFormattedTextField.AbstractFormatter");
Clazz.makeConstructor (c$, 
function (factory) {
this.construct ();
this.setFormatterFactory (factory);
}, "javax.swing.JFormattedTextField.AbstractFormatterFactory");
Clazz.makeConstructor (c$, 
function (factory, currentValue) {
this.construct (currentValue);
this.setFormatterFactory (factory);
}, "javax.swing.JFormattedTextField.AbstractFormatterFactory,~O");
Clazz.defineMethod (c$, "setFocusLostBehavior", 
function (behavior) {
if (behavior != 0 && behavior != 1 && behavior != 3 && behavior != 2) {
throw  new IllegalArgumentException ("setFocusLostBehavior must be one of: JFormattedTextField.COMMIT, JFormattedTextField.COMMIT_OR_REVERT, JFormattedTextField.PERSIST or JFormattedTextField.REVERT");
}this.focusLostBehavior = behavior;
}, "~N");
Clazz.defineMethod (c$, "getFocusLostBehavior", 
function () {
return this.focusLostBehavior;
});
Clazz.defineMethod (c$, "setFormatterFactory", 
function (tf) {
var oldFactory = this.factory = tf;
this.firePropertyChangeObject ("formatterFactory", oldFactory, tf);
this.setValue (this.getValue (), true, false);
}, "javax.swing.JFormattedTextField.AbstractFormatterFactory");
Clazz.defineMethod (c$, "getFormatterFactory", 
function () {
return this.factory;
});
Clazz.defineMethod (c$, "setFormatter", 
function (format) {
var oldFormat = this.format;
if (oldFormat != null) {
oldFormat.uninstall ();
}this.setEditValid (true);
this.format = format;
if (format != null) {
format.install (this);
}this.setEdited (false);
this.firePropertyChangeObject ("textFormatter", oldFormat, format);
}, "javax.swing.JFormattedTextField.AbstractFormatter");
Clazz.defineMethod (c$, "getFormatter", 
function () {
return this.format;
});
Clazz.defineMethod (c$, "setValue", 
function (value) {
if (value != null && this.getFormatterFactory () == null) {
this.setFormatterFactory (this.getDefaultFormatterFactory (value));
}this.setValue (value, true, true);
}, "~O");
Clazz.defineMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "commitEdit", 
function () {
var format = this.getFormatter ();
if (format != null) {
this.setValue (format.stringToValue (this.getText ()), false, true);
}});
Clazz.defineMethod (c$, "setEditValid", 
 function (isValid) {
if (isValid != this.editValid) {
this.editValid = isValid;
this.firePropertyChangeObject ("editValid", Boolean.$valueOf (!isValid), Boolean.$valueOf (isValid));
}}, "~B");
Clazz.defineMethod (c$, "isEditValid", 
function () {
return this.editValid;
});
Clazz.defineMethod (c$, "invalidEdit", 
function () {
});
Clazz.defineMethod (c$, "processFocusEvent", 
function (e) {
Clazz.superCall (this, javax.swing.JFormattedTextField, "processFocusEvent", [e]);
if (e.isTemporary ()) {
return;
}if (this.isEdited () && e.getID () == 1005) {
if (this.focusLostHandler == null) {
this.focusLostHandler = Clazz.innerTypeInstance (javax.swing.JFormattedTextField.FocusLostHandler, this, null);
}this.focusLostHandler.run ();
} else if (!this.isEdited ()) {
this.setValue (this.getValue (), true, true);
}}, "java.awt.event.FocusEvent");
Clazz.defineMethod (c$, "getActions", 
function () {
return javax.swing.text.TextAction.augmentList (Clazz.superCall (this, javax.swing.JFormattedTextField, "getActions", []), javax.swing.JFormattedTextField.$defaultActions);
});
Clazz.defineMethod (c$, "setDocument", 
function (doc) {
if (this.documentListener != null && this.getDocument () != null) {
this.getDocument ().removeDocumentListener (this.documentListener);
}Clazz.superCall (this, javax.swing.JFormattedTextField, "setDocument", [doc]);
if (this.documentListener == null) {
this.documentListener = Clazz.innerTypeInstance (javax.swing.JFormattedTextField.DocumentHandler, this, null);
}doc.addDocumentListener (this.documentListener);
}, "javax.swing.text.Document");
Clazz.defineMethod (c$, "setFormatterActions", 
 function (actions) {
if (actions == null) {
if (this.textFormatterActionMap != null) {
this.textFormatterActionMap.clear ();
}} else {
if (this.textFormatterActionMap == null) {
var map = this.getActionMap ();
this.textFormatterActionMap =  new javax.swing.ActionMap ();
while (map != null) {
var parent = map.getParent ();
if (Clazz.instanceOf (parent, javax.swing.plaf.UIResource) || parent == null) {
map.setParent (this.textFormatterActionMap);
this.textFormatterActionMap.setParent (parent);
break;
}map = parent;
}
}for (var counter = actions.length - 1; counter >= 0; counter--) {
var key = actions[counter].getValue ("Name");
if (key != null) {
this.textFormatterActionMap.put (key, actions[counter]);
}}
}}, "~A");
Clazz.defineMethod (c$, "setValue", 
 function (value, createFormat, firePC) {
var oldValue = this.value;
this.value = value;
if (createFormat) {
var factory = this.getFormatterFactory ();
var atf;
if (factory != null) {
atf = factory.getFormatter (this);
} else {
atf = null;
}this.setFormatter (atf);
} else {
this.setEditValid (true);
}this.setEdited (false);
if (firePC) {
this.firePropertyChangeObject ("value", oldValue, value);
}}, "~O,~B,~B");
Clazz.defineMethod (c$, "setEdited", 
 function (edited) {
this.edited = edited;
}, "~B");
Clazz.defineMethod (c$, "isEdited", 
 function () {
return this.edited;
});
Clazz.defineMethod (c$, "getDefaultFormatterFactory", 
 function (type) {
if (Clazz.instanceOf (type, java.text.DateFormat)) {
swingjs.JSToolkit.notImplemented (null);
return null;
}if (Clazz.instanceOf (type, java.text.NumberFormat)) {
return  new javax.swing.text.DefaultFormatterFactory ( new javax.swing.text.NumberFormatter (type));
}if (Clazz.instanceOf (type, java.text.Format)) {
return  new javax.swing.text.DefaultFormatterFactory ( new javax.swing.text.InternationalFormatter (type));
}if (Clazz.instanceOf (type, java.util.Date)) {
return  new javax.swing.text.DefaultFormatterFactory ( new javax.swing.text.DateFormatter ());
}if (Clazz.instanceOf (type, Number)) {
var displayFormatter =  new javax.swing.text.NumberFormatter ();
(displayFormatter).setValueClass (type.getClass ());
var editFormatter =  new javax.swing.text.NumberFormatter ( new java.text.DecimalFormat ("#.#"));
(editFormatter).setValueClass (type.getClass ());
return  new javax.swing.text.DefaultFormatterFactory (displayFormatter, displayFormatter, editFormatter);
}return  new javax.swing.text.DefaultFormatterFactory ( new javax.swing.text.DefaultFormatter ());
}, "~O");
c$.$JFormattedTextField$FocusLostHandler$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.JFormattedTextField, "FocusLostHandler", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
var a = this.b$["javax.swing.JFormattedTextField"].getFocusLostBehavior ();
if (a == 0 || a == 1) {
try {
this.b$["javax.swing.JFormattedTextField"].commitEdit ();
this.b$["javax.swing.JFormattedTextField"].setValue (this.b$["javax.swing.JFormattedTextField"].getValue (), true, true);
} catch (pe) {
if (Clazz.exceptionOf (pe, java.text.ParseException)) {
if (a == 1) {
this.b$["javax.swing.JFormattedTextField"].setValue (this.b$["javax.swing.JFormattedTextField"].getValue (), true, true);
}} else {
throw pe;
}
}
} else if (a == 2) {
this.b$["javax.swing.JFormattedTextField"].setValue (this.b$["javax.swing.JFormattedTextField"].getValue (), true, true);
}});
c$ = Clazz.p0p ();
};
c$.$JFormattedTextField$DocumentHandler$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.JFormattedTextField, "DocumentHandler", null, javax.swing.event.DocumentListener);
Clazz.overrideMethod (c$, "insertUpdate", 
function (a) {
this.b$["javax.swing.JFormattedTextField"].setEdited (true);
}, "javax.swing.event.DocumentEvent");
Clazz.overrideMethod (c$, "removeUpdate", 
function (a) {
this.b$["javax.swing.JFormattedTextField"].setEdited (true);
}, "javax.swing.event.DocumentEvent");
Clazz.overrideMethod (c$, "changedUpdate", 
function (a) {
}, "javax.swing.event.DocumentEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JFormattedTextField, "AbstractFormatterFactory");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.ftf = null;
Clazz.instantialize (this, arguments);
}, javax.swing.JFormattedTextField, "AbstractFormatter");
Clazz.defineMethod (c$, "install", 
function (a) {
if (this.ftf != null) {
this.uninstall ();
}this.ftf = a;
if (a != null) {
try {
a.setText (this.valueToString (a.getValue ()));
} catch (pe) {
if (Clazz.exceptionOf (pe, java.text.ParseException)) {
a.setText ("");
this.setEditValid (false);
} else {
throw pe;
}
}
this.installDocumentFilter (this.getDocumentFilter ());
a.setFormatterActions (this.getActions ());
}}, "javax.swing.JFormattedTextField");
Clazz.defineMethod (c$, "uninstall", 
function () {
if (this.ftf != null) {
this.installDocumentFilter (null);
this.ftf.setFormatterActions (null);
}});
Clazz.defineMethod (c$, "getFormattedTextField", 
function () {
return this.ftf;
});
Clazz.defineMethod (c$, "invalidEdit", 
function () {
var a = this.getFormattedTextField ();
if (a != null) {
a.invalidEdit ();
}});
Clazz.defineMethod (c$, "setEditValid", 
function (a) {
var b = this.getFormattedTextField ();
if (b != null) {
b.setEditValid (a);
}}, "~B");
Clazz.defineMethod (c$, "getActions", 
function () {
return null;
});
Clazz.defineMethod (c$, "getDocumentFilter", 
function () {
return null;
});
Clazz.defineMethod (c$, "getNavigationFilter", 
function () {
return null;
});
Clazz.defineMethod (c$, "clone", 
function () {
var a = Clazz.superCall (this, javax.swing.JFormattedTextField.AbstractFormatter, "clone", []);
a.ftf = null;
return a;
});
Clazz.defineMethod (c$, "installDocumentFilter", 
 function (a) {
var b = this.getFormattedTextField ();
if (b != null) {
var c = b.getDocument ();
if (Clazz.instanceOf (c, javax.swing.text.JSMinimalAbstractDocument)) {
(c).setDocumentFilter (a);
}c.putProperty (javax.swing.text.DocumentFilter, null);
}}, "javax.swing.text.DocumentFilter");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JFormattedTextField, "CommitAction", javax.swing.JTextField.NotifyAction);
Clazz.defineMethod (c$, "actionPerformed", 
function (a) {
var b = this.getFocusedComponent ();
if (Clazz.instanceOf (b, javax.swing.JFormattedTextField)) {
try {
(b).commitEdit ();
} catch (pe) {
if (Clazz.exceptionOf (pe, java.text.ParseException)) {
(b).invalidEdit ();
return;
} else {
throw pe;
}
}
}Clazz.superCall (this, javax.swing.JFormattedTextField.CommitAction, "actionPerformed", [a]);
}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "isEnabled", 
function () {
var a = this.getFocusedComponent ();
if (Clazz.instanceOf (a, javax.swing.JFormattedTextField)) {
var b = a;
if (!b.isEdited ()) {
return false;
}return true;
}return Clazz.superCall (this, javax.swing.JFormattedTextField.CommitAction, "isEnabled", []);
});
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JFormattedTextField, "CancelAction", javax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JFormattedTextField.CancelAction, ["reset-field-edit"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getFocusedComponent ();
if (Clazz.instanceOf (b, javax.swing.JFormattedTextField)) {
var c = b;
c.setValue (c.getValue ());
}}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "isEnabled", 
function () {
var a = this.getFocusedComponent ();
if (Clazz.instanceOf (a, javax.swing.JFormattedTextField)) {
var b = a;
if (!b.isEdited ()) {
return false;
}return true;
}return Clazz.superCall (this, javax.swing.JFormattedTextField.CancelAction, "isEnabled", []);
});
c$ = Clazz.p0p ();
c$.$defaultActions = c$.prototype.$defaultActions = [ new javax.swing.JFormattedTextField.CommitAction (),  new javax.swing.JFormattedTextField.CancelAction ()];
Clazz.defineStatics (c$,
"COMMIT", 0,
"COMMIT_OR_REVERT", 1,
"REVERT", 2,
"PERSIST", 3);
});
