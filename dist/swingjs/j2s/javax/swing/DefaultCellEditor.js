Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.event.ActionListener", "$.ItemListener", "javax.swing.AbstractCellEditor", "javax.swing.table.TableCellEditor", "javax.swing.tree.TreeCellEditor"], "javax.swing.DefaultCellEditor", ["java.lang.Boolean", "java.awt.event.ActionEvent", "$.MouseEvent", "javax.swing.JCheckBox", "$.JComponent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.editorComponent = null;
this.delegate = null;
this.clickCountToStart = 1;
if (!Clazz.isClassDefined ("javax.swing.DefaultCellEditor.EditorDelegate")) {
javax.swing.DefaultCellEditor.$DefaultCellEditor$EditorDelegate$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "DefaultCellEditor", javax.swing.AbstractCellEditor, [javax.swing.table.TableCellEditor, javax.swing.tree.TreeCellEditor]);
Clazz.makeConstructor (c$, 
function (textField) {
Clazz.superConstructor (this, javax.swing.DefaultCellEditor, []);
this.editorComponent = textField;
this.clickCountToStart = 2;
this.delegate = ((Clazz.isClassDefined ("javax.swing.DefaultCellEditor$1") ? 0 : javax.swing.DefaultCellEditor.$DefaultCellEditor$1$ ()), Clazz.innerTypeInstance (javax.swing.DefaultCellEditor$1, this, Clazz.cloneFinals ("textField", textField)));
textField.addActionListener (this.delegate);
}, "javax.swing.JTextField");
Clazz.makeConstructor (c$, 
function (checkBox) {
Clazz.superConstructor (this, javax.swing.DefaultCellEditor, []);
this.editorComponent = checkBox;
this.delegate = ((Clazz.isClassDefined ("javax.swing.DefaultCellEditor$2") ? 0 : javax.swing.DefaultCellEditor.$DefaultCellEditor$2$ ()), Clazz.innerTypeInstance (javax.swing.DefaultCellEditor$2, this, Clazz.cloneFinals ("checkBox", checkBox)));
checkBox.addActionListener (this.delegate);
checkBox.setRequestFocusEnabled (false);
}, "javax.swing.JCheckBox");
Clazz.makeConstructor (c$, 
function (comboBox) {
Clazz.superConstructor (this, javax.swing.DefaultCellEditor, []);
this.editorComponent = comboBox;
comboBox.putClientProperty ("JComboBox.isTableCellEditor", Boolean.TRUE);
this.delegate = ((Clazz.isClassDefined ("javax.swing.DefaultCellEditor$3") ? 0 : javax.swing.DefaultCellEditor.$DefaultCellEditor$3$ ()), Clazz.innerTypeInstance (javax.swing.DefaultCellEditor$3, this, Clazz.cloneFinals ("comboBox", comboBox)));
comboBox.addActionListener (this.delegate);
}, "javax.swing.JComboBox");
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.editorComponent;
});
Clazz.defineMethod (c$, "setClickCountToStart", 
function (count) {
this.clickCountToStart = count;
}, "~N");
Clazz.defineMethod (c$, "getClickCountToStart", 
function () {
return this.clickCountToStart;
});
Clazz.overrideMethod (c$, "getCellEditorValue", 
function () {
return this.delegate.getCellEditorValue ();
});
Clazz.overrideMethod (c$, "isCellEditable", 
function (anEvent) {
return this.delegate.isCellEditable (anEvent);
}, "java.util.EventObject");
Clazz.overrideMethod (c$, "shouldSelectCell", 
function (anEvent) {
return this.delegate.shouldSelectCell (anEvent);
}, "java.util.EventObject");
Clazz.overrideMethod (c$, "stopCellEditing", 
function () {
return this.delegate.stopCellEditing ();
});
Clazz.overrideMethod (c$, "cancelCellEditing", 
function () {
this.delegate.cancelCellEditing ();
});
Clazz.overrideMethod (c$, "getTreeCellEditorComponent", 
function (tree, value, isSelected, expanded, leaf, row) {
var stringValue = tree.convertValueToText (value, isSelected, expanded, leaf, row, false);
this.delegate.setValue (stringValue);
return this.editorComponent;
}, "javax.swing.JTree,~O,~B,~B,~B,~N");
Clazz.overrideMethod (c$, "getTableCellEditorComponent", 
function (table, value, isSelected, row, column) {
this.delegate.setValue (value);
if (Clazz.instanceOf (this.editorComponent, javax.swing.JCheckBox)) {
var renderer = table.getCellRenderer (row, column);
var c = renderer.getTableCellRendererComponent (table, value, isSelected, true, row, column);
if (c != null) {
this.editorComponent.setOpaque (true);
this.editorComponent.setBackground (c.getBackground ());
if (Clazz.instanceOf (c, javax.swing.JComponent)) {
this.editorComponent.setBorder ((c).getBorder ());
}} else {
this.editorComponent.setOpaque (false);
}}return this.editorComponent;
}, "javax.swing.JTable,~O,~B,~N,~N");
c$.$DefaultCellEditor$EditorDelegate$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.value = null;
Clazz.instantialize (this, arguments);
}, javax.swing.DefaultCellEditor, "EditorDelegate", null, [java.awt.event.ActionListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getCellEditorValue", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "setValue", 
function (a) {
this.value = a;
}, "~O");
Clazz.defineMethod (c$, "isCellEditable", 
function (a) {
if (Clazz.instanceOf (a, java.awt.event.MouseEvent)) {
return (a).getClickCount () >= this.b$["javax.swing.DefaultCellEditor"].clickCountToStart;
}return true;
}, "java.util.EventObject");
Clazz.defineMethod (c$, "shouldSelectCell", 
function (a) {
return true;
}, "java.util.EventObject");
Clazz.defineMethod (c$, "startCellEditing", 
function (a) {
return true;
}, "java.util.EventObject");
Clazz.defineMethod (c$, "stopCellEditing", 
function () {
this.b$["javax.swing.DefaultCellEditor"].fireEditingStopped ();
return true;
});
Clazz.defineMethod (c$, "cancelCellEditing", 
function () {
this.b$["javax.swing.DefaultCellEditor"].fireEditingCanceled ();
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
this.b$["javax.swing.DefaultCellEditor"].stopCellEditing ();
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (a) {
this.b$["javax.swing.DefaultCellEditor"].stopCellEditing ();
}, "java.awt.event.ItemEvent");
c$ = Clazz.p0p ();
};
c$.$DefaultCellEditor$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "DefaultCellEditor$1", javax.swing.DefaultCellEditor.EditorDelegate);
Clazz.defineMethod (c$, "setValue", 
function (value) {
this.f$.textField.setText ((value != null) ? value.toString () : "");
}, "~O");
Clazz.defineMethod (c$, "getCellEditorValue", 
function () {
return this.f$.textField.getText ();
});
c$ = Clazz.p0p ();
};
c$.$DefaultCellEditor$2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "DefaultCellEditor$2", javax.swing.DefaultCellEditor.EditorDelegate);
Clazz.defineMethod (c$, "setValue", 
function (value) {
var selected = false;
if (Clazz.instanceOf (value, Boolean)) {
selected = (value).booleanValue ();
} else if (Clazz.instanceOf (value, String)) {
selected = value.equals ("true");
}this.f$.checkBox.setSelected (selected);
}, "~O");
Clazz.defineMethod (c$, "getCellEditorValue", 
function () {
return Boolean.$valueOf (this.f$.checkBox.isSelected ());
});
c$ = Clazz.p0p ();
};
c$.$DefaultCellEditor$3$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "DefaultCellEditor$3", javax.swing.DefaultCellEditor.EditorDelegate);
Clazz.defineMethod (c$, "setValue", 
function (value) {
this.f$.comboBox.setSelectedItem (value);
}, "~O");
Clazz.defineMethod (c$, "getCellEditorValue", 
function () {
return this.f$.comboBox.getSelectedItem ();
});
Clazz.defineMethod (c$, "shouldSelectCell", 
function (anEvent) {
if (Clazz.instanceOf (anEvent, java.awt.event.MouseEvent)) {
var e = anEvent;
return e.getID () != 506;
}return true;
}, "java.util.EventObject");
Clazz.defineMethod (c$, "stopCellEditing", 
function () {
if (this.f$.comboBox.isEditable ()) {
this.f$.comboBox.actionPerformed ( new java.awt.event.ActionEvent (this.b$["javax.swing.DefaultCellEditor"], 0, ""));
}return Clazz.superCall (this, javax.swing.DefaultCellEditor$3, "stopCellEditing", []);
});
c$ = Clazz.p0p ();
};
});
