Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.ActionPropertyChangeListener", "$.SwingConstants", "javax.swing.event.ChangeListener", "javax.swing.text.JTextComponent", "$.TextAction"], "javax.swing.JTextField", ["java.lang.Boolean", "$.IllegalArgumentException", "java.awt.EventQueue", "java.awt.event.ActionEvent", "$.ActionListener", "$.InputEvent", "javax.swing.AbstractAction", "$.JViewport", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$action = null;
this.actionPropertyChangeListener = null;
this.horizontalAlignment = 10;
this.columns = 0;
this.columnWidth = 0;
this.command = null;
if (!Clazz.isClassDefined ("javax.swing.JTextField.ScrollRepainter")) {
javax.swing.JTextField.$JTextField$ScrollRepainter$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JTextField", javax.swing.text.JTextComponent, javax.swing.SwingConstants);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null, 0);
});
Clazz.makeConstructor (c$, 
function (text) {
this.construct (null, text, 0);
}, "~S");
Clazz.makeConstructor (c$, 
function (columns) {
this.construct (null, null, columns);
}, "~N");
Clazz.makeConstructor (c$, 
function (text, columns) {
this.construct (null, text, columns);
}, "~S,~N");
Clazz.makeConstructor (c$, 
function (doc, text, columns) {
Clazz.superConstructor (this, javax.swing.JTextField, ["TextFieldUI"]);
if (columns < 0) {
throw  new IllegalArgumentException ("columns less than zero.");
}this.columns = columns;
if (doc == null) {
doc = this.createDefaultModel ();
}this.setDocument (doc);
if (text != null) {
this.setText (text);
}}, "javax.swing.text.Document,~S,~N");
Clazz.defineMethod (c$, "setDocument", 
function (doc) {
if (doc != null) {
doc.putProperty ("filterNewlines", Boolean.TRUE);
}Clazz.superCall (this, javax.swing.JTextField, "setDocument", [doc]);
}, "javax.swing.text.Document");
Clazz.overrideMethod (c$, "isValidateRoot", 
function () {
var parent = this.getParent ();
if (Clazz.instanceOf (parent, javax.swing.JViewport)) {
return false;
}return true;
});
Clazz.defineMethod (c$, "getHorizontalAlignment", 
function () {
return this.horizontalAlignment;
});
Clazz.defineMethod (c$, "setHorizontalAlignment", 
function (alignment) {
if (alignment == this.horizontalAlignment) return;
var oldValue = this.horizontalAlignment;
if ((alignment == 2) || (alignment == 0) || (alignment == 4) || (alignment == 10) || (alignment == 11)) {
this.horizontalAlignment = alignment;
} else {
throw  new IllegalArgumentException ("horizontalAlignment");
}this.firePropertyChangeInt ("horizontalAlignment", oldValue, this.horizontalAlignment);
this.invalidate ();
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "createDefaultModel", 
function () {
return swingjs.JSToolkit.getPlainDocument (this);
});
Clazz.defineMethod (c$, "getColumns", 
function () {
return this.columns;
});
Clazz.defineMethod (c$, "setColumns", 
function (columns) {
var oldVal = this.columns;
if (columns < 0) {
throw  new IllegalArgumentException ("columns less than zero.");
}if (columns != oldVal) {
this.columns = columns;
this.invalidate ();
}}, "~N");
Clazz.defineMethod (c$, "getColumnWidth", 
function () {
if (this.columnWidth == 0) {
var metrics = this.getFontMetrics (this.getFont ());
this.columnWidth = metrics.charWidth ('m');
}return this.columnWidth;
});
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return this.getPrefSizeJTF ();
});
Clazz.defineMethod (c$, "getPrefSizeJTF", 
function () {
var size = this.getPrefSizeJComp ();
if (this.columns != 0) {
var insets = this.getInsets ();
size.width = this.columns * this.getColumnWidth () + insets.left + insets.right;
}return size;
});
Clazz.defineMethod (c$, "setFont", 
function (f) {
Clazz.superCall (this, javax.swing.JTextField, "setFont", [f]);
this.columnWidth = 0;
}, "java.awt.Font");
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
Clazz.defineMethod (c$, "fireActionPerformed", 
function () {
var listeners = this.listenerList.getListenerList ();
var modifiers = 0;
var currentEvent = java.awt.EventQueue.getCurrentEvent ();
if (Clazz.instanceOf (currentEvent, java.awt.event.InputEvent)) {
modifiers = (currentEvent).getModifiers ();
} else if (Clazz.instanceOf (currentEvent, java.awt.event.ActionEvent)) {
modifiers = (currentEvent).getModifiers ();
}var e =  new java.awt.event.ActionEvent (this, 1001, (this.command != null) ? this.command : this.getText (), java.awt.EventQueue.getMostRecentEventTime (), modifiers);
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === java.awt.event.ActionListener) {
(listeners[i + 1]).actionPerformed (e);
}}
});
Clazz.defineMethod (c$, "setActionCommand", 
function (command) {
this.command = command;
}, "~S");
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
Clazz.defineMethod (c$, "actionPropertyChanged", 
function (action, propertyName) {
if (propertyName === "ActionCommandKey") {
this.setActionCommandFromAction (action);
} else if (propertyName === "enabled") {
javax.swing.AbstractAction.setEnabledFromAction (this, action);
} else if (propertyName === "ShortDescription") {
javax.swing.AbstractAction.setToolTipTextFromAction (this, action);
}}, "javax.swing.Action,~S");
Clazz.defineMethod (c$, "setActionCommandFromAction", 
 function (action) {
this.setActionCommand ((action == null) ? null : action.getValue ("ActionCommandKey"));
}, "javax.swing.Action");
Clazz.defineMethod (c$, "createActionPropertyChangeListener", 
function (a) {
return  new javax.swing.JTextField.TextFieldActionPropertyChangeListener (this, a);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "getActions", 
function () {
return javax.swing.text.TextAction.augmentList (Clazz.superCall (this, javax.swing.JTextField, "getActions", []), javax.swing.JTextField.defaultActions);
});
Clazz.defineMethod (c$, "postActionEvent", 
function () {
this.fireActionPerformed ();
});
Clazz.defineMethod (c$, "hasActionListener", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === java.awt.event.ActionListener) {
return true;
}}
return false;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var horizontalAlignmentString;
if (this.horizontalAlignment == 2) {
horizontalAlignmentString = "LEFT";
} else if (this.horizontalAlignment == 0) {
horizontalAlignmentString = "CENTER";
} else if (this.horizontalAlignment == 4) {
horizontalAlignmentString = "RIGHT";
} else if (this.horizontalAlignment == 10) {
horizontalAlignmentString = "LEADING";
} else if (this.horizontalAlignment == 11) {
horizontalAlignmentString = "TRAILING";
} else horizontalAlignmentString = "";
var commandString = (this.command != null ? this.command : "");
return Clazz.superCall (this, javax.swing.JTextField, "paramString", []) + ",columns=" + this.columns + ",columnWidth=" + this.columnWidth + ",command=" + commandString + ",horizontalAlignment=" + horizontalAlignmentString;
});
c$.$JTextField$ScrollRepainter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.JTextField, "ScrollRepainter", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
this.b$["javax.swing.JTextField"].repaint ();
}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JTextField, "TextFieldActionPropertyChangeListener", javax.swing.ActionPropertyChangeListener);
Clazz.overrideMethod (c$, "actionPropertyChanged", 
function (a, b, c) {
if (javax.swing.AbstractAction.shouldReconfigure (c)) {
a.configurePropertiesFromAction (b);
} else {
a.actionPropertyChanged (b, c.getPropertyName ());
}}, "javax.swing.JTextField,javax.swing.Action,java.beans.PropertyChangeEvent");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JTextField, "NotifyAction", javax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JTextField.NotifyAction, ["notify-field-accept"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getFocusedComponent ();
if (Clazz.instanceOf (b, javax.swing.JTextField)) {
var c = b;
c.postActionEvent ();
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "isEnabled", 
function () {
var a = this.getFocusedComponent ();
if (Clazz.instanceOf (a, javax.swing.JTextField)) {
return (a).hasActionListener ();
}return false;
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"notifyAction", "notify-field-accept");
c$.defaultActions = c$.prototype.defaultActions = [ new javax.swing.JTextField.NotifyAction ()];
});
