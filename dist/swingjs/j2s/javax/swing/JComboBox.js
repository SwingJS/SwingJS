Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.ItemSelectable", "java.awt.event.ActionListener", "javax.swing.ActionPropertyChangeListener", "$.JComponent", "javax.swing.event.ListDataListener", "javax.swing.JPopupMenu"], "javax.swing.JComboBox", ["java.lang.IllegalArgumentException", "$.RuntimeException", "java.awt.Component", "$.EventQueue", "java.awt.event.ActionEvent", "$.InputEvent", "$.ItemEvent", "$.ItemListener", "javax.swing.AbstractAction", "$.DefaultComboBoxModel", "$.MutableComboBoxModel", "$.SwingUtilities", "javax.swing.event.AncestorListener", "$.PopupMenuEvent", "$.PopupMenuListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dataModel = null;
this.renderer = null;
this.editor = null;
this.maximumRowCount = 8;
this.$isEditable = false;
this.keySelectionManager = null;
this.actionCommand = "comboBoxChanged";
this.lightWeightPopupEnabled = false;
this.selectedItemReminder = null;
this.prototypeDisplayValue = null;
this.firingActionEvent = false;
this.selectingItem = false;
this.$action = null;
this.actionPropertyChangeListener = null;
if (!Clazz.isClassDefined ("javax.swing.JComboBox.DefaultKeySelectionManager")) {
javax.swing.JComboBox.$JComboBox$DefaultKeySelectionManager$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JComboBox", javax.swing.JComponent, [java.awt.ItemSelectable, javax.swing.event.ListDataListener, java.awt.event.ActionListener]);
Clazz.prepareFields (c$, function () {
this.lightWeightPopupEnabled = javax.swing.JPopupMenu.getDefaultLightWeightPopupEnabled ();
});
Clazz.makeConstructor (c$, 
function (aModel) {
Clazz.superConstructor (this, javax.swing.JComboBox);
this.setModel (aModel);
this.initComboBox ();
}, "javax.swing.ComboBoxModel");
Clazz.makeConstructor (c$, 
function (items) {
Clazz.superConstructor (this, javax.swing.JComboBox);
this.setModel ( new javax.swing.DefaultComboBoxModel (items));
this.initComboBox ();
}, "~A");
Clazz.makeConstructor (c$, 
function (items) {
Clazz.superConstructor (this, javax.swing.JComboBox);
this.setModel ( new javax.swing.DefaultComboBoxModel (items));
this.initComboBox ();
}, "java.util.Vector");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JComboBox);
this.setModel ( new javax.swing.DefaultComboBoxModel ());
this.initComboBox ();
});
Clazz.defineMethod (c$, "initComboBox", 
 function () {
this.installAncestorListener ();
this.uiClassID = "ComboBoxUI";
this.setUIProperty ("opaque", new Boolean (true));
this.updateUI ();
});
Clazz.defineMethod (c$, "installAncestorListener", 
function () {
this.addAncestorListener (((Clazz.isClassDefined ("javax.swing.JComboBox$1") ? 0 : javax.swing.JComboBox.$JComboBox$1$ ()), Clazz.innerTypeInstance (javax.swing.JComboBox$1, this, null)));
});
Clazz.defineMethod (c$, "updateUI", 
function () {
Clazz.superCall (this, javax.swing.JComboBox, "updateUI", []);
var renderer = this.getRenderer ();
if (Clazz.instanceOf (renderer, java.awt.Component)) {
javax.swing.SwingUtilities.updateComponentTreeUI (renderer);
}});
Clazz.defineMethod (c$, "setModel", 
function (aModel) {
var oldModel = this.dataModel;
if (oldModel != null) {
oldModel.removeListDataListener (this);
}this.dataModel = aModel;
this.dataModel.addListDataListener (this);
this.selectedItemReminder = this.dataModel.getSelectedItem ();
this.firePropertyChangeObject ("model", oldModel, this.dataModel);
}, "javax.swing.ComboBoxModel");
Clazz.defineMethod (c$, "getModel", 
function () {
return this.dataModel;
});
Clazz.defineMethod (c$, "setLightWeightPopupEnabled", 
function (aFlag) {
var oldFlag = this.lightWeightPopupEnabled;
this.lightWeightPopupEnabled = aFlag;
this.firePropertyChangeBool ("lightWeightPopupEnabled", oldFlag, this.lightWeightPopupEnabled);
}, "~B");
Clazz.defineMethod (c$, "isLightWeightPopupEnabled", 
function () {
return this.lightWeightPopupEnabled;
});
Clazz.defineMethod (c$, "setEditable", 
function (aFlag) {
var oldFlag = this.$isEditable;
this.$isEditable = aFlag;
this.firePropertyChangeBool ("editable", oldFlag, this.$isEditable);
}, "~B");
Clazz.defineMethod (c$, "isEditable", 
function () {
return this.$isEditable;
});
Clazz.defineMethod (c$, "setMaximumRowCount", 
function (count) {
var oldCount = this.maximumRowCount;
this.maximumRowCount = count;
this.firePropertyChangeInt ("maximumRowCount", oldCount, this.maximumRowCount);
}, "~N");
Clazz.defineMethod (c$, "getMaximumRowCount", 
function () {
return this.maximumRowCount;
});
Clazz.defineMethod (c$, "setRenderer", 
function (aRenderer) {
var oldRenderer = this.renderer;
this.renderer = aRenderer;
this.firePropertyChangeObject ("renderer", oldRenderer, this.renderer);
this.invalidate ();
}, "javax.swing.ListCellRenderer");
Clazz.defineMethod (c$, "getRenderer", 
function () {
return this.renderer;
});
Clazz.defineMethod (c$, "setEditor", 
function (anEditor) {
var oldEditor = this.editor;
if (this.editor != null) {
this.editor.removeActionListener (this);
}this.editor = anEditor;
if (this.editor != null) {
this.editor.addActionListener (this);
}this.firePropertyChangeObject ("editor", oldEditor, this.editor);
}, "javax.swing.ComboBoxEditor");
Clazz.defineMethod (c$, "getEditor", 
function () {
return this.editor;
});
Clazz.defineMethod (c$, "setSelectedItem", 
function (anObject) {
var oldSelection = this.selectedItemReminder;
var objectToSelect = anObject;
if (oldSelection == null || !oldSelection.equals (anObject)) {
if (anObject != null && !this.isEditable ()) {
var found = false;
for (var i = 0; i < this.dataModel.getSize (); i++) {
var element = this.dataModel.getElementAt (i);
if (anObject.equals (element)) {
found = true;
objectToSelect = element;
break;
}}
if (!found) {
return;
}}this.selectingItem = true;
this.dataModel.setSelectedItem (objectToSelect);
this.selectingItem = false;
if (this.selectedItemReminder !== this.dataModel.getSelectedItem ()) {
this.selectedItemChanged ();
}}this.fireActionEvent ();
}, "~O");
Clazz.defineMethod (c$, "getSelectedItem", 
function () {
return this.dataModel.getSelectedItem ();
});
Clazz.defineMethod (c$, "setSelectedIndex", 
function (anIndex) {
var size = this.dataModel.getSize ();
if (anIndex == -1) {
this.setSelectedItem (null);
} else if (anIndex < -1 || anIndex >= size) {
throw  new IllegalArgumentException ("setSelectedIndex: " + anIndex + " out of bounds");
} else {
this.setSelectedItem (this.dataModel.getElementAt (anIndex));
}}, "~N");
Clazz.defineMethod (c$, "getSelectedIndex", 
function () {
var sObject = this.dataModel.getSelectedItem ();
var i;
var c;
var obj;
for (i = 0, c = this.dataModel.getSize (); i < c; i++) {
obj = this.dataModel.getElementAt (i);
if (obj != null && obj.equals (sObject)) return i;
}
return -1;
});
Clazz.defineMethod (c$, "getPrototypeDisplayValue", 
function () {
return this.prototypeDisplayValue;
});
Clazz.defineMethod (c$, "setPrototypeDisplayValue", 
function (prototypeDisplayValue) {
var oldValue = this.prototypeDisplayValue;
this.prototypeDisplayValue = prototypeDisplayValue;
this.firePropertyChangeObject ("prototypeDisplayValue", oldValue, prototypeDisplayValue);
}, "~O");
Clazz.defineMethod (c$, "addItem", 
function (anObject) {
this.checkMutableComboBoxModel ();
(this.dataModel).addElement (anObject);
}, "~O");
Clazz.defineMethod (c$, "insertItemAt", 
function (anObject, index) {
this.checkMutableComboBoxModel ();
(this.dataModel).insertElementAt (anObject, index);
}, "~O,~N");
Clazz.defineMethod (c$, "removeItem", 
function (anObject) {
this.checkMutableComboBoxModel ();
(this.dataModel).removeElement (anObject);
}, "~O");
Clazz.defineMethod (c$, "removeItemAt", 
function (anIndex) {
this.checkMutableComboBoxModel ();
(this.dataModel).removeElementAt (anIndex);
}, "~N");
Clazz.defineMethod (c$, "removeAllItems", 
function () {
this.checkMutableComboBoxModel ();
var model = this.dataModel;
var size = model.getSize ();
if (Clazz.instanceOf (model, javax.swing.DefaultComboBoxModel)) {
(model).removeAllElements ();
} else {
for (var i = 0; i < size; ++i) {
var element = model.getElementAt (0);
model.removeElement (element);
}
}this.selectedItemReminder = null;
if (this.isEditable ()) {
this.editor.setItem (null);
}});
Clazz.defineMethod (c$, "checkMutableComboBoxModel", 
function () {
if (!(Clazz.instanceOf (this.dataModel, javax.swing.MutableComboBoxModel))) throw  new RuntimeException ("Cannot use this method with a non-Mutable data model.");
});
Clazz.defineMethod (c$, "showPopup", 
function () {
this.setPopupVisible (true);
});
Clazz.defineMethod (c$, "hidePopup", 
function () {
this.setPopupVisible (false);
});
Clazz.defineMethod (c$, "setPopupVisible", 
function (v) {
(this.getUI ()).setPopupVisible (this, v);
}, "~B");
Clazz.defineMethod (c$, "isPopupVisible", 
function () {
return (this.getUI ()).isPopupVisible (this);
});
Clazz.overrideMethod (c$, "addItemListener", 
function (aListener) {
this.listenerList.add (java.awt.event.ItemListener, aListener);
}, "java.awt.event.ItemListener");
Clazz.overrideMethod (c$, "removeItemListener", 
function (aListener) {
this.listenerList.remove (java.awt.event.ItemListener, aListener);
}, "java.awt.event.ItemListener");
Clazz.defineMethod (c$, "getItemListeners", 
function () {
return this.listenerList.getListeners (java.awt.event.ItemListener);
});
Clazz.defineMethod (c$, "addActionListener", 
function (l) {
this.listenerList.add (java.awt.event.ActionListener, l);
}, "java.awt.event.ActionListener");
Clazz.defineMethod (c$, "removeActionListener", 
function (l) {
if ((l != null) && (this.getAction () === l)) {
this.setAction (null);
} else {
this.listenerList.remove (java.awt.event.ActionListener, l);
}}, "java.awt.event.ActionListener");
Clazz.defineMethod (c$, "getActionListeners", 
function () {
return this.listenerList.getListeners (java.awt.event.ActionListener);
});
Clazz.defineMethod (c$, "addPopupMenuListener", 
function (l) {
this.listenerList.add (javax.swing.event.PopupMenuListener, l);
}, "javax.swing.event.PopupMenuListener");
Clazz.defineMethod (c$, "removePopupMenuListener", 
function (l) {
this.listenerList.remove (javax.swing.event.PopupMenuListener, l);
}, "javax.swing.event.PopupMenuListener");
Clazz.defineMethod (c$, "getPopupMenuListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.PopupMenuListener);
});
Clazz.defineMethod (c$, "firePopupMenuWillBecomeVisible", 
function () {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.PopupMenuListener) {
if (e == null) e =  new javax.swing.event.PopupMenuEvent (this);
(listeners[i + 1]).popupMenuWillBecomeVisible (e);
}}
});
Clazz.defineMethod (c$, "firePopupMenuWillBecomeInvisible", 
function () {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.PopupMenuListener) {
if (e == null) e =  new javax.swing.event.PopupMenuEvent (this);
(listeners[i + 1]).popupMenuWillBecomeInvisible (e);
}}
});
Clazz.defineMethod (c$, "firePopupMenuCanceled", 
function () {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.PopupMenuListener) {
if (e == null) e =  new javax.swing.event.PopupMenuEvent (this);
(listeners[i + 1]).popupMenuCanceled (e);
}}
});
Clazz.defineMethod (c$, "setActionCommand", 
function (aCommand) {
this.actionCommand = aCommand;
}, "~S");
Clazz.defineMethod (c$, "getActionCommand", 
function () {
return this.actionCommand;
});
Clazz.defineMethod (c$, "setAction", 
function (a) {
var oldValue = this.getAction ();
if (this.$action == null || !this.$action.equals (a)) {
this.$action = a;
if (oldValue != null) {
this.removeActionListener (oldValue);
oldValue.removePropertyChangeListener (this.actionPropertyChangeListener);
this.actionPropertyChangeListener = null;
}this.configurePropertiesFromAction (this.$action);
if (this.$action != null) {
if (!this.isListener (java.awt.event.ActionListener, this.$action)) {
this.addActionListener (this.$action);
}this.actionPropertyChangeListener = this.createActionPropertyChangeListener (this.$action);
this.$action.addPropertyChangeListener (this.actionPropertyChangeListener);
}this.firePropertyChangeObject ("action", oldValue, this.$action);
}}, "javax.swing.Action");
Clazz.defineMethod (c$, "isListener", 
 function (c, a) {
var isListener = false;
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === c && listeners[i + 1] === a) {
isListener = true;
}}
return isListener;
}, "Class,java.awt.event.ActionListener");
Clazz.defineMethod (c$, "getAction", 
function () {
return this.$action;
});
Clazz.defineMethod (c$, "configurePropertiesFromAction", 
function (a) {
javax.swing.AbstractAction.setEnabledFromAction (this, a);
javax.swing.AbstractAction.setToolTipTextFromAction (this, a);
this.setActionCommandFromAction (a);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "createActionPropertyChangeListener", 
function (a) {
return  new javax.swing.JComboBox.ComboBoxActionPropertyChangeListener (this, a);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "actionPropertyChanged", 
function (action, propertyName) {
if (propertyName === "ActionCommandKey") {
this.setActionCommandFromAction (action);
} else if (propertyName === "enabled") {
javax.swing.AbstractAction.setEnabledFromAction (this, action);
} else if ("ShortDescription" === propertyName) {
javax.swing.AbstractAction.setToolTipTextFromAction (this, action);
}}, "javax.swing.Action,~S");
Clazz.defineMethod (c$, "setActionCommandFromAction", 
 function (a) {
this.setActionCommand ((a != null) ? a.getValue ("ActionCommandKey") : null);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "fireItemStateChanged", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === java.awt.event.ItemListener) {
(listeners[i + 1]).itemStateChanged (e);
}}
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "fireActionEvent", 
function () {
if (!this.firingActionEvent) {
this.firingActionEvent = true;
var e = null;
var listeners = this.listenerList.getListenerList ();
var mostRecentEventTime = java.awt.EventQueue.getMostRecentEventTime ();
var modifiers = 0;
var currentEvent = java.awt.EventQueue.getCurrentEvent ();
if (Clazz.instanceOf (currentEvent, java.awt.event.InputEvent)) {
modifiers = (currentEvent).getModifiers ();
} else if (Clazz.instanceOf (currentEvent, java.awt.event.ActionEvent)) {
modifiers = (currentEvent).getModifiers ();
}for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === java.awt.event.ActionListener) {
if (e == null) e =  new java.awt.event.ActionEvent (this, 1001, this.getActionCommand (), mostRecentEventTime, modifiers);
(listeners[i + 1]).actionPerformed (e);
}}
this.firingActionEvent = false;
}});
Clazz.defineMethod (c$, "selectedItemChanged", 
function () {
if (this.selectedItemReminder != null) {
this.fireItemStateChanged ( new java.awt.event.ItemEvent (this, 701, this.selectedItemReminder, 2));
}this.selectedItemReminder = this.dataModel.getSelectedItem ();
if (this.selectedItemReminder != null) {
this.fireItemStateChanged ( new java.awt.event.ItemEvent (this, 701, this.selectedItemReminder, 1));
}});
Clazz.overrideMethod (c$, "getSelectedObjects", 
function () {
var selectedObject = this.getSelectedItem ();
if (selectedObject == null) return  new Array (0);
 else {
var result =  new Array (1);
result[0] = selectedObject;
return result;
}});
Clazz.defineMethod (c$, "actionPerformed", 
function (e) {
var newItem = this.getEditor ().getItem ();
this.setPopupVisible (false);
this.getModel ().setSelectedItem (newItem);
var oldCommand = this.getActionCommand ();
this.setActionCommand ("comboBoxEdited");
this.fireActionEvent ();
this.setActionCommand (oldCommand);
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "contentsChanged", 
function (e) {
var oldSelection = this.selectedItemReminder;
var newSelection = this.dataModel.getSelectedItem ();
if (oldSelection == null || !oldSelection.equals (newSelection)) {
this.selectedItemChanged ();
if (!this.selectingItem) {
this.fireActionEvent ();
}}}, "javax.swing.event.ListDataEvent");
Clazz.overrideMethod (c$, "intervalAdded", 
function (e) {
if (this.selectedItemReminder !== this.dataModel.getSelectedItem ()) {
this.selectedItemChanged ();
}}, "javax.swing.event.ListDataEvent");
Clazz.overrideMethod (c$, "intervalRemoved", 
function (e) {
this.contentsChanged (e);
}, "javax.swing.event.ListDataEvent");
Clazz.defineMethod (c$, "selectWithKeyChar", 
function (keyChar) {
var index;
if (this.keySelectionManager == null) this.keySelectionManager = this.createDefaultKeySelectionManager ();
index = this.keySelectionManager.selectionForKey (keyChar, this.getModel ());
if (index != -1) {
this.setSelectedIndex (index);
return true;
} else return false;
}, "~S");
Clazz.defineMethod (c$, "setEnabled", 
function (b) {
Clazz.superCall (this, javax.swing.JComboBox, "setEnabled", [b]);
this.firePropertyChangeBool ("enabled", !this.isEnabled (), this.isEnabled ());
}, "~B");
Clazz.defineMethod (c$, "configureEditor", 
function (anEditor, anItem) {
anEditor.setItem (anItem);
}, "javax.swing.ComboBoxEditor,~O");
Clazz.defineMethod (c$, "processKeyEvent", 
function (e) {
if (e.getKeyCode () == 9) {
this.hidePopup ();
}Clazz.superCall (this, javax.swing.JComboBox, "processKeyEvent", [e]);
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "setKeySelectionManager", 
function (aManager) {
this.keySelectionManager = aManager;
}, "javax.swing.JComboBox.KeySelectionManager");
Clazz.defineMethod (c$, "getKeySelectionManager", 
function () {
return this.keySelectionManager;
});
Clazz.defineMethod (c$, "getItemCount", 
function () {
return this.dataModel.getSize ();
});
Clazz.defineMethod (c$, "getItemAt", 
function (index) {
return this.dataModel.getElementAt (index);
}, "~N");
Clazz.defineMethod (c$, "createDefaultKeySelectionManager", 
function () {
return Clazz.innerTypeInstance (javax.swing.JComboBox.DefaultKeySelectionManager, this, null);
});
Clazz.defineMethod (c$, "paramString", 
function () {
var selectedItemReminderString = (this.selectedItemReminder != null ? this.selectedItemReminder.toString () : "");
var isEditableString = (this.$isEditable ? "true" : "false");
var lightWeightPopupEnabledString = (this.lightWeightPopupEnabled ? "true" : "false");
return Clazz.superCall (this, javax.swing.JComboBox, "paramString", []) + ",isEditable=" + isEditableString + ",lightWeightPopupEnabled=" + lightWeightPopupEnabledString + ",maximumRowCount=" + this.maximumRowCount + ",selectedItemReminder=" + selectedItemReminderString;
});
c$.$JComboBox$DefaultKeySelectionManager$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.JComboBox, "DefaultKeySelectionManager", null, javax.swing.JComboBox.KeySelectionManager);
Clazz.overrideMethod (c$, "selectionForKey", 
function (a, b) {
var c;
var d;
var e = -1;
var f = b.getSelectedItem ();
var g;
var h;
if (f != null) {
for (c = 0, d = b.getSize (); c < d; c++) {
if (f === b.getElementAt (c)) {
e = c;
break;
}}
}h = ("" + a).toLowerCase ();
a = h.charAt (0);
for (c = ++e, d = b.getSize (); c < d; c++) {
var i = b.getElementAt (c);
if (i != null && i.toString () != null) {
g = i.toString ().toLowerCase ();
if (g.length > 0 && g.charAt (0) == a) return c;
}}
for (c = 0; c < e; c++) {
var i = b.getElementAt (c);
if (i != null && i.toString () != null) {
g = i.toString ().toLowerCase ();
if (g.length > 0 && g.charAt (0) == a) return c;
}}
return -1;
}, "~S,javax.swing.ComboBoxModel");
c$ = Clazz.p0p ();
};
c$.$JComboBox$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JComboBox$1", null, javax.swing.event.AncestorListener);
Clazz.overrideMethod (c$, "ancestorAdded", 
function (event) {
this.b$["javax.swing.JComboBox"].hidePopup ();
}, "javax.swing.event.AncestorEvent");
Clazz.overrideMethod (c$, "ancestorRemoved", 
function (event) {
this.b$["javax.swing.JComboBox"].hidePopup ();
}, "javax.swing.event.AncestorEvent");
Clazz.overrideMethod (c$, "ancestorMoved", 
function (event) {
if (event.getSource () !== this.b$["javax.swing.JComboBox"]) this.b$["javax.swing.JComboBox"].hidePopup ();
}, "javax.swing.event.AncestorEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JComboBox, "ComboBoxActionPropertyChangeListener", javax.swing.ActionPropertyChangeListener);
Clazz.overrideMethod (c$, "actionPropertyChanged", 
function (a, b, c) {
if (javax.swing.AbstractAction.shouldReconfigure (c)) {
a.configurePropertiesFromAction (b);
} else {
a.actionPropertyChanged (b, c.getPropertyName ());
}}, "javax.swing.JComboBox,javax.swing.Action,java.beans.PropertyChangeEvent");
c$ = Clazz.p0p ();
Clazz.declareInterface (javax.swing.JComboBox, "KeySelectionManager");
});
