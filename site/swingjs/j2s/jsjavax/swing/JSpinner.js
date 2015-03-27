Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.LayoutManager", "jsjava.beans.PropertyChangeListener", "jsjavax.swing.Action", "$.JComponent", "$.JFormattedTextField", "$.JPanel", "jsjavax.swing.event.ChangeListener", "jsjavax.swing.text.DocumentFilter", "$.NumberFormatter"], "jsjavax.swing.JSpinner", ["java.lang.IllegalArgumentException", "jsjava.awt.Dimension", "jsjava.text.DecimalFormat", "jsjavax.swing.SpinnerListModel", "$.SpinnerNumberModel", "$.UIManager", "jsjavax.swing.event.ChangeEvent", "jsjavax.swing.text.DefaultFormatterFactory"], function () {
c$ = Clazz.decorateAsClass (function () {
this.model = null;
this.editor = null;
this.modelListener = null;
this.changeEvent = null;
this.editorExplicitlySet = false;
if (!Clazz.isClassDefined ("jsjavax.swing.JSpinner.ModelListener")) {
jsjavax.swing.JSpinner.$JSpinner$ModelListener$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JSpinner", jsjavax.swing.JComponent);
Clazz.makeConstructor (c$, 
function (model) {
Clazz.superConstructor (this, jsjavax.swing.JSpinner, []);
this.model = model;
this.editor = this.createEditor (model);
this.setUIProperty ("opaque", new Boolean (true));
this.updateUI ();
}, "jsjavax.swing.SpinnerModel");
Clazz.makeConstructor (c$, 
function () {
this.construct ( new jsjavax.swing.SpinnerNumberModel ());
});
Clazz.defineMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "SpinnerUI";
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
this.invalidate ();
});
Clazz.defineMethod (c$, "createEditor", 
function (model) {
if (Clazz.instanceOf (model, jsjavax.swing.SpinnerListModel)) {
return  new jsjavax.swing.JSpinner.ListEditor (this);
} else if (Clazz.instanceOf (model, jsjavax.swing.SpinnerNumberModel)) {
return  new jsjavax.swing.JSpinner.NumberEditor (this);
} else {
return  new jsjavax.swing.JSpinner.DefaultEditor (this);
}}, "jsjavax.swing.SpinnerModel");
Clazz.defineMethod (c$, "setModel", 
function (model) {
if (model == null) {
throw  new IllegalArgumentException ("null model");
}if (!model.equals (this.model)) {
var oldModel = this.model;
this.model = model;
if (this.modelListener != null) {
oldModel.removeChangeListener (this.modelListener);
this.model.addChangeListener (this.modelListener);
}this.firePropertyChange ("model", oldModel, model);
if (!this.editorExplicitlySet) {
this.setEditor (this.createEditor (model));
this.editorExplicitlySet = false;
}this.repaint ();
this.revalidate ();
}}, "jsjavax.swing.SpinnerModel");
Clazz.defineMethod (c$, "getModel", 
function () {
return this.model;
});
Clazz.defineMethod (c$, "getValue", 
function () {
return this.getModel ().getValue ();
});
Clazz.defineMethod (c$, "setValue", 
function (value) {
this.getModel ().setValue (value);
}, "~O");
Clazz.defineMethod (c$, "getNextValue", 
function () {
return this.getModel ().getNextValue ();
});
Clazz.defineMethod (c$, "addChangeListener", 
function (listener) {
if (this.modelListener == null) {
this.modelListener = Clazz.innerTypeInstance (jsjavax.swing.JSpinner.ModelListener, this, null);
this.getModel ().addChangeListener (this.modelListener);
}this.listenerList.add (jsjavax.swing.event.ChangeListener, listener);
}, "jsjavax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "removeChangeListener", 
function (listener) {
this.listenerList.remove (jsjavax.swing.event.ChangeListener, listener);
}, "jsjavax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.ChangeListener);
});
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.ChangeListener) {
if (this.changeEvent == null) {
this.changeEvent =  new jsjavax.swing.event.ChangeEvent (this);
}(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "getPreviousValue", 
function () {
return this.getModel ().getPreviousValue ();
});
Clazz.defineMethod (c$, "setEditor", 
function (editor) {
if (editor == null) {
throw  new IllegalArgumentException ("null editor");
}if (!editor.equals (this.editor)) {
var oldEditor = this.editor;
this.editor = editor;
if (Clazz.instanceOf (oldEditor, jsjavax.swing.JSpinner.DefaultEditor)) {
(oldEditor).dismiss (this);
}this.editorExplicitlySet = true;
this.firePropertyChange ("editor", oldEditor, editor);
this.revalidate ();
this.repaint ();
}}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "getEditor", 
function () {
return this.editor;
});
Clazz.defineMethod (c$, "commitEdit", 
function () {
var editor = this.getEditor ();
if (Clazz.instanceOf (editor, jsjavax.swing.JSpinner.DefaultEditor)) {
(editor).commitEdit ();
}});
c$.$JSpinner$ModelListener$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JSpinner, "ModelListener", null, jsjavax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
this.b$["jsjavax.swing.JSpinner"].fireStateChanged ();
}, "jsjavax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JSpinner, "DefaultEditor", jsjavax.swing.JPanel, [jsjavax.swing.event.ChangeListener, jsjava.beans.PropertyChangeListener, jsjava.awt.LayoutManager]);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.JSpinner.DefaultEditor, [null]);
var b =  new jsjavax.swing.JFormattedTextField ();
b.setName ("Spinner.formattedTextField");
b.setValue (a.getValue ());
b.addPropertyChangeListener (this);
b.setEditable (false);
b.setInheritsPopupMenu (true);
var c = a.getToolTipText ();
if (c != null) {
b.setToolTipText (c);
}this.add (b);
this.setLayout (this);
a.addChangeListener (this);
var d = b.getActionMap ();
if (d != null) {
d.put ("increment", jsjavax.swing.JSpinner.DISABLED_ACTION);
d.put ("decrement", jsjavax.swing.JSpinner.DISABLED_ACTION);
}}, "jsjavax.swing.JSpinner");
Clazz.defineMethod (c$, "dismiss", 
function (a) {
a.removeChangeListener (this);
}, "jsjavax.swing.JSpinner");
Clazz.defineMethod (c$, "getSpinner", 
function () {
for (var a = this; a != null; a = a.getParent ()) {
if (Clazz.instanceOf (a, jsjavax.swing.JSpinner)) {
return a;
}}
return null;
});
Clazz.defineMethod (c$, "getTextField", 
function () {
return this.getComponent (0);
});
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
var b = (a.getSource ());
this.getTextField ().setValue (b.getValue ());
}, "jsjavax.swing.event.ChangeEvent");
Clazz.overrideMethod (c$, "propertyChange", 
function (a) {
var b = this.getSpinner ();
if (b == null) {
return;
}var c = a.getSource ();
var d = a.getPropertyName ();
if ((Clazz.instanceOf (c, jsjavax.swing.JFormattedTextField)) && "value".equals (d)) {
var e = b.getValue ();
try {
b.setValue (this.getTextField ().getValue ());
} catch (iae) {
if (Clazz.exceptionOf (iae, IllegalArgumentException)) {
try {
(c).setValue (e);
} catch (iae2) {
if (Clazz.exceptionOf (iae2, IllegalArgumentException)) {
} else {
throw iae2;
}
}
} else {
throw iae;
}
}
}}, "jsjava.beans.PropertyChangeEvent");
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (a, b) {
}, "~S,jsjava.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (a) {
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "insetSize", 
($fz = function (a) {
var b = a.getInsets ();
var c = b.left + b.right;
var d = b.top + b.bottom;
return  new jsjava.awt.Dimension (c, d);
}, $fz.isPrivate = true, $fz), "jsjava.awt.Container");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (a) {
var b = this.insetSize (a);
if (a.getComponentCount () > 0) {
var c = this.getComponent (0).getPreferredSize ();
b.width += c.width;
b.height += c.height;
}return b;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (a) {
var b = this.insetSize (a);
if (a.getComponentCount () > 0) {
var c = this.getComponent (0).getMinimumSize ();
b.width += c.width;
b.height += c.height;
}return b;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (a) {
if (a.getComponentCount () > 0) {
var b = a.getInsets ();
var c = a.getWidth () - (b.left + b.right);
var d = a.getHeight () - (b.top + b.bottom);
this.getComponent (0).setBounds (b.left, b.top, c, d);
}}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "commitEdit", 
function () {
});
Clazz.defineMethod (c$, "getBaseline", 
function (a, b) {
Clazz.superCall (this, jsjavax.swing.JSpinner.DefaultEditor, "getBaseline", [a, b]);
var c = this.getInsets ();
a = a - c.left - c.right;
b = b - c.top - c.bottom;
var d = this.getComponent (0).getBaseline (a, b);
if (d >= 0) {
return d + c.top;
}return -1;
}, "~N,~N");
Clazz.overrideMethod (c$, "getBaselineResizeBehavior", 
function () {
return this.getComponent (0).getBaselineResizeBehavior ();
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.model = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JSpinner, "NumberEditorFormatter", jsjavax.swing.text.NumberFormatter);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.JSpinner.NumberEditorFormatter, [b]);
this.model = a;
this.setValueClass (a.getValue ().getClass ());
}, "jsjavax.swing.SpinnerNumberModel,jsjava.text.NumberFormat");
Clazz.overrideMethod (c$, "setMinimum", 
function (a) {
this.model.setMinimum (a);
}, "Comparable");
Clazz.overrideMethod (c$, "getMinimum", 
function () {
return this.model.getMinimum ();
});
Clazz.overrideMethod (c$, "setMaximum", 
function (a) {
this.model.setMaximum (a);
}, "Comparable");
Clazz.overrideMethod (c$, "getMaximum", 
function () {
return this.model.getMaximum ();
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JSpinner, "NumberEditor", jsjavax.swing.JSpinner.DefaultEditor);
c$.getDefaultPattern = Clazz.defineMethod (c$, "getDefaultPattern", 
($fz = function (a) {
return null;
}, $fz.isPrivate = true, $fz), "java.util.Locale");
Clazz.makeConstructor (c$, 
function (a) {
this.construct (a, jsjavax.swing.JSpinner.NumberEditor.getDefaultPattern (a.getLocale ()));
}, "jsjavax.swing.JSpinner");
Clazz.makeConstructor (c$, 
function (a, b) {
this.construct (a,  new jsjava.text.DecimalFormat (b));
}, "jsjavax.swing.JSpinner,~S");
Clazz.makeConstructor (c$, 
($fz = function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.JSpinner.NumberEditor, [a]);
if (!(Clazz.instanceOf (a.getModel (), jsjavax.swing.SpinnerNumberModel))) {
throw  new IllegalArgumentException ("model not a SpinnerNumberModel");
}var c = a.getModel ();
var d =  new jsjavax.swing.JSpinner.NumberEditorFormatter (c, b);
var e =  new jsjavax.swing.text.DefaultFormatterFactory (d);
var f = this.getTextField ();
f.setEditable (true);
f.setFormatterFactory (e);
f.setHorizontalAlignment (4);
try {
var g = d.valueToString (c.getMinimum ());
var h = d.valueToString (c.getMaximum ());
f.setColumns (Math.max (g.length, h.length));
} catch (e) {
if (Clazz.exceptionOf (e, jsjava.text.ParseException)) {
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "jsjavax.swing.JSpinner,jsjava.text.DecimalFormat");
Clazz.defineMethod (c$, "getFormat", 
function () {
return ((this.getTextField ().getFormatter ())).getFormat ();
});
Clazz.defineMethod (c$, "getModel", 
function () {
return (this.getSpinner ().getModel ());
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("jsjavax.swing.JSpinner.ListEditor.ListFormatter")) {
jsjavax.swing.JSpinner.ListEditor.$JSpinner$ListEditor$ListFormatter$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JSpinner, "ListEditor", jsjavax.swing.JSpinner.DefaultEditor);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.JSpinner.ListEditor, [a]);
if (!(Clazz.instanceOf (a.getModel (), jsjavax.swing.SpinnerListModel))) {
throw  new IllegalArgumentException ("model not a SpinnerListModel");
}this.getTextField ().setEditable (true);
this.getTextField ().setFormatterFactory ( new jsjavax.swing.text.DefaultFormatterFactory (Clazz.innerTypeInstance (jsjavax.swing.JSpinner.ListEditor.ListFormatter, this, null)));
}, "jsjavax.swing.JSpinner");
Clazz.defineMethod (c$, "getModel", 
function () {
return (this.getSpinner ().getModel ());
});
c$.$JSpinner$ListEditor$ListFormatter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.filter = null;
if (!Clazz.isClassDefined ("jsjavax.swing.JSpinner.ListEditor.ListFormatter.Filter")) {
jsjavax.swing.JSpinner.ListEditor.ListFormatter.$JSpinner$ListEditor$ListFormatter$Filter$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JSpinner.ListEditor, "ListFormatter", jsjavax.swing.JFormattedTextField.AbstractFormatter);
Clazz.overrideMethod (c$, "valueToString", 
function (a) {
if (a == null) {
return "";
}return a.toString ();
}, "~O");
Clazz.overrideMethod (c$, "stringToValue", 
function (a) {
return a;
}, "~S");
Clazz.overrideMethod (c$, "getDocumentFilter", 
function () {
if (this.filter == null) {
this.filter = Clazz.innerTypeInstance (jsjavax.swing.JSpinner.ListEditor.ListFormatter.Filter, this, null);
}return this.filter;
});
c$.$JSpinner$ListEditor$ListFormatter$Filter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JSpinner.ListEditor.ListFormatter, "Filter", jsjavax.swing.text.DocumentFilter);
Clazz.defineMethod (c$, "replace", 
function (a, b, c, d, e) {
if (d != null && (b + c) == a.getDocument ().getLength ()) {
var f = this.b$["jsjavax.swing.JSpinner.ListEditor"].getModel ().findNextMatch (a.getDocument ().getText (0, b) + d);
var g = (f != null) ? f.toString () : null;
if (g != null) {
a.remove (0, b + c);
a.insertString (0, g, null);
this.b$["jsjavax.swing.JSpinner.ListEditor.ListFormatter"].getFormattedTextField ().select (b + d.length, g.length);
return;
}}Clazz.superCall (this, jsjavax.swing.JSpinner.ListEditor.ListFormatter.Filter, "replace", [a, b, c, d, e]);
}, "jsjavax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "insertString", 
function (a, b, c, d) {
this.replace (a, b, 0, c, d);
}, "jsjavax.swing.text.DocumentFilter.FilterBypass,~N,~S,jsjavax.swing.text.AttributeSet");
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JSpinner, "DisabledAction", null, jsjavax.swing.Action);
Clazz.overrideMethod (c$, "getValue", 
function (a) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "putValue", 
function (a, b) {
}, "~S,~O");
Clazz.overrideMethod (c$, "setEnabled", 
function (a) {
}, "~B");
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return false;
});
Clazz.overrideMethod (c$, "addPropertyChangeListener", 
function (a) {
}, "jsjava.beans.PropertyChangeListener");
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (a) {
}, "jsjava.beans.PropertyChangeListener");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"$uiClassID", "SpinnerUI");
c$.DISABLED_ACTION = c$.prototype.DISABLED_ACTION =  new jsjavax.swing.JSpinner.DisabledAction ();
});
