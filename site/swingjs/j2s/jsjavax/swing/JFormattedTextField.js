Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JTextField", "jsjavax.swing.event.DocumentListener", "jsjavax.swing.text.TextAction"], "jsjavax.swing.JFormattedTextField", ["java.lang.Boolean", "$.IllegalArgumentException", "$.Number", "java.util.Date", "jsjava.text.DecimalFormat", "$.Format", "$.NumberFormat", "jsjavax.swing.ActionMap", "$.UIManager", "jsjavax.swing.plaf.UIResource", "jsjavax.swing.text.AbstractDocument", "$.DateFormatter", "$.DefaultFormatter", "$.DefaultFormatterFactory", "$.DocumentFilter", "$.InternationalFormatter", "$.NumberFormatter"], function () {
c$ = Clazz.decorateAsClass (function () {
this.factory = null;
this.format = null;
this.value = null;
this.editValid = false;
this.focusLostBehavior = 0;
this.edited = false;
this.documentListener = null;
this.textFormatterActionMap = null;
if (!Clazz.isClassDefined ("jsjavax.swing.JFormattedTextField.DocumentHandler")) {
jsjavax.swing.JFormattedTextField.$JFormattedTextField$DocumentHandler$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JFormattedTextField", jsjavax.swing.JTextField);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.JFormattedTextField);
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
}, "jsjava.text.Format");
Clazz.makeConstructor (c$, 
function (formatter) {
this.construct ( new jsjavax.swing.text.DefaultFormatterFactory (formatter));
}, "jsjavax.swing.JFormattedTextField.AbstractFormatter");
Clazz.makeConstructor (c$, 
function (factory) {
this.construct ();
this.setFormatterFactory (factory);
}, "jsjavax.swing.JFormattedTextField.AbstractFormatterFactory");
Clazz.makeConstructor (c$, 
function (factory, currentValue) {
this.construct (currentValue);
this.setFormatterFactory (factory);
}, "jsjavax.swing.JFormattedTextField.AbstractFormatterFactory,~O");
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
var oldFactory = this.factory;
this.factory = tf;
this.firePropertyChange ("formatterFactory", oldFactory, tf);
this.setValue (this.getValue (), true, false);
}, "jsjavax.swing.JFormattedTextField.AbstractFormatterFactory");
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
this.firePropertyChange ("textFormatter", oldFormat, format);
}, "jsjavax.swing.JFormattedTextField.AbstractFormatter");
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
($fz = function (isValid) {
if (isValid != this.editValid) {
this.editValid = isValid;
this.firePropertyChange ("editValid", Boolean.$valueOf (!isValid), Boolean.$valueOf (isValid));
}}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "isEditValid", 
function () {
return this.editValid;
});
Clazz.defineMethod (c$, "invalidEdit", 
function () {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this);
});
Clazz.defineMethod (c$, "processFocusEvent", 
function (e) {
Clazz.superCall (this, jsjavax.swing.JFormattedTextField, "processFocusEvent", [e]);
if (e.isTemporary ()) {
return;
}if (this.isEdited () && e.getID () == 1005) {
} else if (!this.isEdited ()) {
this.setValue (this.getValue (), true, true);
}}, "jsjava.awt.event.FocusEvent");
Clazz.defineMethod (c$, "getActions", 
function () {
return jsjavax.swing.text.TextAction.augmentList (Clazz.superCall (this, jsjavax.swing.JFormattedTextField, "getActions", []), jsjavax.swing.JFormattedTextField.$defaultActions);
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "FormattedTextFieldUI";
});
Clazz.defineMethod (c$, "setDocument", 
function (doc) {
if (this.documentListener != null && this.getDocument () != null) {
this.getDocument ().removeDocumentListener (this.documentListener);
}Clazz.superCall (this, jsjavax.swing.JFormattedTextField, "setDocument", [doc]);
if (this.documentListener == null) {
this.documentListener = Clazz.innerTypeInstance (jsjavax.swing.JFormattedTextField.DocumentHandler, this, null);
}doc.addDocumentListener (this.documentListener);
}, "jsjavax.swing.text.Document");
Clazz.defineMethod (c$, "setFormatterActions", 
($fz = function (actions) {
if (actions == null) {
if (this.textFormatterActionMap != null) {
this.textFormatterActionMap.clear ();
}} else {
if (this.textFormatterActionMap == null) {
var map = this.getActionMap ();
this.textFormatterActionMap =  new jsjavax.swing.ActionMap ();
while (map != null) {
var parent = map.getParent ();
if (Clazz.instanceOf (parent, jsjavax.swing.plaf.UIResource) || parent == null) {
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
}}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "setValue", 
($fz = function (value, createFormat, firePC) {
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
this.firePropertyChange ("value", oldValue, value);
}}, $fz.isPrivate = true, $fz), "~O,~B,~B");
Clazz.defineMethod (c$, "setEdited", 
($fz = function (edited) {
this.edited = edited;
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "isEdited", 
($fz = function () {
return this.edited;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getDefaultFormatterFactory", 
($fz = function (type) {
if (Clazz.instanceOf (type, jsjava.text.NumberFormat)) {
return  new jsjavax.swing.text.DefaultFormatterFactory ( new jsjavax.swing.text.NumberFormatter (type));
}if (Clazz.instanceOf (type, jsjava.text.Format)) {
return  new jsjavax.swing.text.DefaultFormatterFactory ( new jsjavax.swing.text.InternationalFormatter (type));
}if (Clazz.instanceOf (type, java.util.Date)) {
return  new jsjavax.swing.text.DefaultFormatterFactory ( new jsjavax.swing.text.DateFormatter ());
}if (Clazz.instanceOf (type, Number)) {
var displayFormatter =  new jsjavax.swing.text.NumberFormatter ();
(displayFormatter).setValueClass (type.getClass ());
var editFormatter =  new jsjavax.swing.text.NumberFormatter ( new jsjava.text.DecimalFormat ("#.#"));
(editFormatter).setValueClass (type.getClass ());
return  new jsjavax.swing.text.DefaultFormatterFactory (displayFormatter, displayFormatter, editFormatter);
}return  new jsjavax.swing.text.DefaultFormatterFactory ( new jsjavax.swing.text.DefaultFormatter ());
}, $fz.isPrivate = true, $fz), "~O");
c$.$JFormattedTextField$DocumentHandler$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JFormattedTextField, "DocumentHandler", null, jsjavax.swing.event.DocumentListener);
Clazz.overrideMethod (c$, "insertUpdate", 
function (a) {
this.b$["jsjavax.swing.JFormattedTextField"].setEdited (true);
}, "jsjavax.swing.event.DocumentEvent");
Clazz.overrideMethod (c$, "removeUpdate", 
function (a) {
this.b$["jsjavax.swing.JFormattedTextField"].setEdited (true);
}, "jsjavax.swing.event.DocumentEvent");
Clazz.overrideMethod (c$, "changedUpdate", 
function (a) {
}, "jsjavax.swing.event.DocumentEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JFormattedTextField, "AbstractFormatterFactory");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.ftf = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JFormattedTextField, "AbstractFormatter");
Clazz.defineMethod (c$, "install", 
function (a) {
if (this.ftf != null) {
this.uninstall ();
}this.ftf = a;
if (a != null) {
try {
a.setText (this.valueToString (a.getValue ()));
} catch (pe) {
if (Clazz.exceptionOf (pe, jsjava.text.ParseException)) {
a.setText ("");
this.setEditValid (false);
} else {
throw pe;
}
}
this.installDocumentFilter (this.getDocumentFilter ());
a.setFormatterActions (this.getActions ());
}}, "jsjavax.swing.JFormattedTextField");
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
var a = Clazz.superCall (this, jsjavax.swing.JFormattedTextField.AbstractFormatter, "clone", []);
a.ftf = null;
return a;
});
Clazz.defineMethod (c$, "installDocumentFilter", 
($fz = function (a) {
var b = this.getFormattedTextField ();
if (b != null) {
var c = b.getDocument ();
if (Clazz.instanceOf (c, jsjavax.swing.text.AbstractDocument)) {
(c).setDocumentFilter (a);
}c.putProperty (jsjavax.swing.text.DocumentFilter, null);
}}, $fz.isPrivate = true, $fz), "jsjavax.swing.text.DocumentFilter");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JFormattedTextField, "CommitAction", jsjavax.swing.JTextField.NotifyAction);
Clazz.defineMethod (c$, "actionPerformed", 
function (a) {
var b = this.getFocusedComponent ();
if (Clazz.instanceOf (b, jsjavax.swing.JFormattedTextField)) {
try {
(b).commitEdit ();
} catch (pe) {
if (Clazz.exceptionOf (pe, jsjava.text.ParseException)) {
(b).invalidEdit ();
return;
} else {
throw pe;
}
}
}Clazz.superCall (this, jsjavax.swing.JFormattedTextField.CommitAction, "actionPerformed", [a]);
}, "jsjava.awt.event.ActionEvent");
Clazz.defineMethod (c$, "isEnabled", 
function () {
var a = this.getFocusedComponent ();
if (Clazz.instanceOf (a, jsjavax.swing.JFormattedTextField)) {
var b = a;
if (!b.isEdited ()) {
return false;
}return true;
}return Clazz.superCall (this, jsjavax.swing.JFormattedTextField.CommitAction, "isEnabled", []);
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JFormattedTextField, "CancelAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.JFormattedTextField.CancelAction, ["reset-field-edit"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getFocusedComponent ();
if (Clazz.instanceOf (b, jsjavax.swing.JFormattedTextField)) {
var c = b;
c.setValue (c.getValue ());
}}, "jsjava.awt.event.ActionEvent");
Clazz.defineMethod (c$, "isEnabled", 
function () {
var a = this.getFocusedComponent ();
if (Clazz.instanceOf (a, jsjavax.swing.JFormattedTextField)) {
var b = a;
if (!b.isEdited ()) {
return false;
}return true;
}return Clazz.superCall (this, jsjavax.swing.JFormattedTextField.CancelAction, "isEnabled", []);
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"$$uiClassID", "FormattedTextFieldUI");
c$.$defaultActions = c$.prototype.$defaultActions =  Clazz.newArray (-1, [ new jsjavax.swing.JFormattedTextField.CommitAction (),  new jsjavax.swing.JFormattedTextField.CancelAction ()]);
Clazz.defineStatics (c$,
"COMMIT", 0,
"COMMIT_OR_REVERT", 1,
"REVERT", 2,
"PERSIST", 3);
});
