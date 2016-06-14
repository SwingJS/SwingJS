Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.LayoutManager", "java.beans.PropertyChangeListener", "javax.swing.Action", "$.JComponent", "$.JFormattedTextField", "$.JPanel", "javax.swing.event.ChangeListener", "javax.swing.text.DocumentFilter", "$.NumberFormatter"], "javax.swing.JSpinner", ["java.lang.IllegalArgumentException", "java.awt.Dimension", "java.text.DecimalFormat", "javax.swing.SpinnerListModel", "$.SpinnerNumberModel", "$.UIManager", "javax.swing.event.ChangeEvent", "javax.swing.text.DefaultFormatterFactory"], function () {
c$ = Clazz.decorateAsClass (function () {
this.model = null;
this.editor = null;
this.modelListener = null;
this.changeEvent = null;
this.editorExplicitlySet = false;
if (!Clazz.isClassDefined ("javax.swing.JSpinner.ModelListener")) {
javax.swing.JSpinner.$JSpinner$ModelListener$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JSpinner", javax.swing.JComponent);
Clazz.makeConstructor (c$, 
function (model) {
Clazz.superConstructor (this, javax.swing.JSpinner, []);
this.model = model;
this.editor = this.createEditor (model);
this.setUIProperty ("opaque", new Boolean (true));
this.updateUI ();
}, "javax.swing.SpinnerModel");
Clazz.makeConstructor (c$, 
function () {
this.construct ( new javax.swing.SpinnerNumberModel ());
});
Clazz.overrideMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "SpinnerUI";
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (javax.swing.UIManager.getUI (this));
this.invalidate ();
});
Clazz.defineMethod (c$, "createEditor", 
function (model) {
if (Clazz.instanceOf (model, javax.swing.SpinnerListModel)) {
return  new javax.swing.JSpinner.ListEditor (this);
} else if (Clazz.instanceOf (model, javax.swing.SpinnerNumberModel)) {
return  new javax.swing.JSpinner.NumberEditor (this);
} else {
return  new javax.swing.JSpinner.DefaultEditor (this);
}}, "javax.swing.SpinnerModel");
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
}this.firePropertyChangeObject ("model", oldModel, model);
if (!this.editorExplicitlySet) {
this.setEditor (this.createEditor (model));
this.editorExplicitlySet = false;
}this.repaint ();
this.revalidate ();
}}, "javax.swing.SpinnerModel");
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
this.modelListener = Clazz.innerTypeInstance (javax.swing.JSpinner.ModelListener, this, null);
this.getModel ().addChangeListener (this.modelListener);
}this.listenerList.add (javax.swing.event.ChangeListener, listener);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "removeChangeListener", 
function (listener) {
this.listenerList.remove (javax.swing.event.ChangeListener, listener);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.ChangeListener);
});
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.ChangeListener) {
if (this.changeEvent == null) {
this.changeEvent =  new javax.swing.event.ChangeEvent (this);
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
if (Clazz.instanceOf (oldEditor, javax.swing.JSpinner.DefaultEditor)) {
(oldEditor).dismiss (this);
}this.editorExplicitlySet = true;
this.firePropertyChangeObject ("editor", oldEditor, editor);
this.revalidate ();
this.repaint ();
}}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "getEditor", 
function () {
return this.editor;
});
Clazz.defineMethod (c$, "commitEdit", 
function () {
var editor = this.getEditor ();
if (Clazz.instanceOf (editor, javax.swing.JSpinner.DefaultEditor)) {
(editor).commitEdit ();
}});
c$.$JSpinner$ModelListener$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.JSpinner, "ModelListener", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
this.b$["javax.swing.JSpinner"].fireStateChanged ();
}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JSpinner, "DefaultEditor", javax.swing.JPanel, [javax.swing.event.ChangeListener, java.beans.PropertyChangeListener, java.awt.LayoutManager]);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.JSpinner.DefaultEditor, [null]);
var b =  new javax.swing.JFormattedTextField ();
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
d.put ("increment", javax.swing.JSpinner.DISABLED_ACTION);
d.put ("decrement", javax.swing.JSpinner.DISABLED_ACTION);
}}, "javax.swing.JSpinner");
Clazz.defineMethod (c$, "dismiss", 
function (a) {
a.removeChangeListener (this);
}, "javax.swing.JSpinner");
Clazz.defineMethod (c$, "getSpinner", 
function () {
for (var a = this; a != null; a = a.getParent ()) {
if (Clazz.instanceOf (a, javax.swing.JSpinner)) {
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
}, "javax.swing.event.ChangeEvent");
Clazz.overrideMethod (c$, "propertyChange", 
function (a) {
var b = this.getSpinner ();
if (b == null) {
return;
}var c = a.getSource ();
var d = a.getPropertyName ();
if ((Clazz.instanceOf (c, javax.swing.JFormattedTextField)) && "value".equals (d)) {
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
}}, "java.beans.PropertyChangeEvent");
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (a, b) {
}, "~S,java.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (a) {
}, "java.awt.Component");
Clazz.defineMethod (c$, "insetSize", 
 function (a) {
var b = a.getInsets ();
var c = b.left + b.right;
var d = b.top + b.bottom;
return  new java.awt.Dimension (c, d);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (a) {
var b = this.insetSize (a);
if (a.getComponentCount () > 0) {
var c = this.getComponent (0).getPreferredSize ();
b.width += c.width;
b.height += c.height;
}return b;
}, "java.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (a) {
var b = this.insetSize (a);
if (a.getComponentCount () > 0) {
var c = this.getComponent (0).getMinimumSize ();
b.width += c.width;
b.height += c.height;
}return b;
}, "java.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (a) {
if (a.getComponentCount () > 0) {
var b = a.getInsets ();
var c = a.getWidth () - (b.left + b.right);
var d = a.getHeight () - (b.top + b.bottom);
this.getComponent (0).setBounds (b.left, b.top, c, d);
}}, "java.awt.Container");
Clazz.defineMethod (c$, "commitEdit", 
function () {
});
Clazz.defineMethod (c$, "getBaseline", 
function (a, b) {
Clazz.superCall (this, javax.swing.JSpinner.DefaultEditor, "getBaseline", [a, b]);
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
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.model = null;
Clazz.instantialize (this, arguments);
}, javax.swing.JSpinner, "NumberEditorFormatter", javax.swing.text.NumberFormatter);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, javax.swing.JSpinner.NumberEditorFormatter, [b]);
this.model = a;
this.setValueClass (a.getValue ().getClass ());
}, "javax.swing.SpinnerNumberModel,java.text.NumberFormat");
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
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JSpinner, "NumberEditor", javax.swing.JSpinner.DefaultEditor);
c$.getDefaultPattern = Clazz.defineMethod (c$, "getDefaultPattern", 
 function (a) {
return null;
}, "java.util.Locale");
Clazz.makeConstructor (c$, 
function (a) {
this.construct (a, javax.swing.JSpinner.NumberEditor.getDefaultPattern (a.getLocale ()));
}, "javax.swing.JSpinner");
Clazz.makeConstructor (c$, 
function (a, b) {
this.construct (a,  new java.text.DecimalFormat (b));
}, "javax.swing.JSpinner,~S");
Clazz.makeConstructor (c$, 
 function (a, b) {
Clazz.superConstructor (this, javax.swing.JSpinner.NumberEditor, [a]);
if (!(Clazz.instanceOf (a.getModel (), javax.swing.SpinnerNumberModel))) {
throw  new IllegalArgumentException ("model not a SpinnerNumberModel");
}var c = a.getModel ();
var d =  new javax.swing.JSpinner.NumberEditorFormatter (c, b);
var e =  new javax.swing.text.DefaultFormatterFactory (d);
var f = this.getTextField ();
f.setEditable (true);
f.setFormatterFactory (e);
f.setHorizontalAlignment (4);
try {
var g = d.valueToString (c.getMinimum ());
var h = d.valueToString (c.getMaximum ());
f.setColumns (Math.max (g.length, h.length));
} catch (e) {
if (Clazz.exceptionOf (e, java.text.ParseException)) {
} else {
throw e;
}
}
}, "javax.swing.JSpinner,java.text.DecimalFormat");
Clazz.defineMethod (c$, "getFormat", 
function () {
return ((this.getTextField ().getFormatter ())).getFormat ();
});
Clazz.defineMethod (c$, "getModel", 
function () {
return (this.getSpinner ().getModel ());
});
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("javax.swing.JSpinner.ListEditor.ListFormatter")) {
javax.swing.JSpinner.ListEditor.$JSpinner$ListEditor$ListFormatter$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.JSpinner, "ListEditor", javax.swing.JSpinner.DefaultEditor);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.JSpinner.ListEditor, [a]);
if (!(Clazz.instanceOf (a.getModel (), javax.swing.SpinnerListModel))) {
throw  new IllegalArgumentException ("model not a SpinnerListModel");
}this.getTextField ().setEditable (true);
this.getTextField ().setFormatterFactory ( new javax.swing.text.DefaultFormatterFactory (Clazz.innerTypeInstance (javax.swing.JSpinner.ListEditor.ListFormatter, this, null)));
}, "javax.swing.JSpinner");
Clazz.defineMethod (c$, "getModel", 
function () {
return (this.getSpinner ().getModel ());
});
c$.$JSpinner$ListEditor$ListFormatter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.filter = null;
if (!Clazz.isClassDefined ("javax.swing.JSpinner.ListEditor.ListFormatter.Filter")) {
javax.swing.JSpinner.ListEditor.ListFormatter.$JSpinner$ListEditor$ListFormatter$Filter$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.JSpinner.ListEditor, "ListFormatter", javax.swing.JFormattedTextField.AbstractFormatter);
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
this.filter = Clazz.innerTypeInstance (javax.swing.JSpinner.ListEditor.ListFormatter.Filter, this, null);
}return this.filter;
});
c$.$JSpinner$ListEditor$ListFormatter$Filter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.JSpinner.ListEditor.ListFormatter, "Filter", javax.swing.text.DocumentFilter);
Clazz.defineMethod (c$, "replace", 
function (a, b, c, d, e) {
if (d != null && (b + c) == a.getDocument ().getLength ()) {
var f = this.b$["javax.swing.JSpinner.ListEditor"].getModel ().findNextMatch (a.getDocument ().getText (0, b) + d);
var g = (f != null) ? f.toString () : null;
if (g != null) {
a.remove (0, b + c);
a.insertString (0, g, null);
this.b$["javax.swing.JSpinner.ListEditor.ListFormatter"].getFormattedTextField ().select (b + d.length, g.length);
return;
}}Clazz.superCall (this, javax.swing.JSpinner.ListEditor.ListFormatter.Filter, "replace", [a, b, c, d, e]);
}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,javax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "insertString", 
function (a, b, c, d) {
this.replace (a, b, 0, c, d);
}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~S,javax.swing.text.AttributeSet");
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JSpinner, "DisabledAction", null, javax.swing.Action);
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
}, "java.beans.PropertyChangeListener");
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (a) {
}, "java.beans.PropertyChangeListener");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"$uiClassID", "SpinnerUI");
c$.DISABLED_ACTION = c$.prototype.DISABLED_ACTION =  new javax.swing.JSpinner.DisabledAction ();
});
