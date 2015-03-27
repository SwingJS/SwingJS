Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.ActionPropertyChangeListener", "$.SwingConstants", "jsjavax.swing.event.ChangeListener", "jsjavax.swing.text.JTextComponent", "$.TextAction"], "jsjavax.swing.JTextField", ["java.lang.Boolean", "$.IllegalArgumentException", "jsjava.awt.EventQueue", "jsjava.awt.event.ActionEvent", "$.ActionListener", "$.InputEvent", "jsjavax.swing.AbstractAction", "$.DefaultBoundedRangeModel", "$.JViewport", "jsjavax.swing.text.PlainDocument"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$action = null;
this.actionPropertyChangeListener = null;
this.visibility = null;
this.horizontalAlignment = 10;
this.columns = 0;
this.columnWidth = 0;
this.command = null;
if (!Clazz.isClassDefined ("jsjavax.swing.JTextField.ScrollRepainter")) {
jsjavax.swing.JTextField.$JTextField$ScrollRepainter$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JTextField", jsjavax.swing.text.JTextComponent, jsjavax.swing.SwingConstants);
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
Clazz.superConstructor (this, jsjavax.swing.JTextField, []);
if (columns < 0) {
throw  new IllegalArgumentException ("columns less than zero.");
}this.visibility =  new jsjavax.swing.DefaultBoundedRangeModel ();
this.visibility.addChangeListener (Clazz.innerTypeInstance (jsjavax.swing.JTextField.ScrollRepainter, this, null));
this.columns = columns;
if (doc == null) {
doc = this.createDefaultModel ();
}this.setDocument (doc);
if (text != null) {
this.setText (text);
}}, "jsjavax.swing.text.Document,~S,~N");
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "TextFieldUI";
});
Clazz.defineMethod (c$, "setDocument", 
function (doc) {
if (doc != null) {
doc.putProperty ("filterNewlines", Boolean.TRUE);
}Clazz.superCall (this, jsjavax.swing.JTextField, "setDocument", [doc]);
}, "jsjavax.swing.text.Document");
Clazz.overrideMethod (c$, "isValidateRoot", 
function () {
var parent = this.getParent ();
if (Clazz.instanceOf (parent, jsjavax.swing.JViewport)) {
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
}this.firePropertyChange ("horizontalAlignment", oldValue, this.horizontalAlignment);
this.invalidate ();
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "createDefaultModel", 
function () {
return  new jsjavax.swing.text.PlainDocument ();
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
Clazz.defineMethod (c$, "getPreferredSize", 
function () {
var size = Clazz.superCall (this, jsjavax.swing.JTextField, "getPreferredSize", []);
if (this.columns != 0) {
var insets = this.getInsets ();
size.width = this.columns * this.getColumnWidth () + insets.left + insets.right;
}return size;
});
Clazz.defineMethod (c$, "setFont", 
function (f) {
Clazz.superCall (this, jsjavax.swing.JTextField, "setFont", [f]);
this.columnWidth = 0;
}, "jsjava.awt.Font");
Clazz.defineMethod (c$, "addActionListener", 
function (l) {
this.listenerList.add (jsjava.awt.event.ActionListener, l);
}, "jsjava.awt.event.ActionListener");
Clazz.defineMethod (c$, "removeActionListener", 
function (l) {
if ((l != null) && (this.getAction () === l)) {
this.setAction (null);
} else {
this.listenerList.remove (jsjava.awt.event.ActionListener, l);
}}, "jsjava.awt.event.ActionListener");
Clazz.defineMethod (c$, "getActionListeners", 
function () {
return this.listenerList.getListeners (jsjava.awt.event.ActionListener);
});
Clazz.defineMethod (c$, "fireActionPerformed", 
function () {
var listeners = this.listenerList.getListenerList ();
var modifiers = 0;
var currentEvent = jsjava.awt.EventQueue.getCurrentEvent ();
if (Clazz.instanceOf (currentEvent, jsjava.awt.event.InputEvent)) {
modifiers = (currentEvent).getModifiers ();
} else if (Clazz.instanceOf (currentEvent, jsjava.awt.event.ActionEvent)) {
modifiers = (currentEvent).getModifiers ();
}var e =  new jsjava.awt.event.ActionEvent (this, 1001, (this.command != null) ? this.command : this.getText (), jsjava.awt.EventQueue.getMostRecentEventTime (), modifiers);
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjava.awt.event.ActionListener) {
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
if (!this.isListener (jsjava.awt.event.ActionListener, this.$action)) {
this.addActionListener (this.$action);
}this.actionPropertyChangeListener = this.createActionPropertyChangeListener (this.$action);
this.$action.addPropertyChangeListener (this.actionPropertyChangeListener);
}this.firePropertyChange ("action", oldValue, this.$action);
}}, "jsjavax.swing.Action");
Clazz.defineMethod (c$, "isListener", 
($fz = function (c, a) {
var isListener = false;
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === c && listeners[i + 1] === a) {
isListener = true;
}}
return isListener;
}, $fz.isPrivate = true, $fz), "Class,jsjava.awt.event.ActionListener");
Clazz.defineMethod (c$, "getAction", 
function () {
return this.$action;
});
Clazz.defineMethod (c$, "configurePropertiesFromAction", 
function (a) {
jsjavax.swing.AbstractAction.setEnabledFromAction (this, a);
jsjavax.swing.AbstractAction.setToolTipTextFromAction (this, a);
this.setActionCommandFromAction (a);
}, "jsjavax.swing.Action");
Clazz.defineMethod (c$, "actionPropertyChanged", 
function (action, propertyName) {
if (propertyName === "ActionCommandKey") {
this.setActionCommandFromAction (action);
} else if (propertyName === "enabled") {
jsjavax.swing.AbstractAction.setEnabledFromAction (this, action);
} else if (propertyName === "ShortDescription") {
jsjavax.swing.AbstractAction.setToolTipTextFromAction (this, action);
}}, "jsjavax.swing.Action,~S");
Clazz.defineMethod (c$, "setActionCommandFromAction", 
($fz = function (action) {
this.setActionCommand ((action == null) ? null : action.getValue ("ActionCommandKey"));
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Action");
Clazz.defineMethod (c$, "createActionPropertyChangeListener", 
function (a) {
return  new jsjavax.swing.JTextField.TextFieldActionPropertyChangeListener (this, a);
}, "jsjavax.swing.Action");
Clazz.defineMethod (c$, "getActions", 
function () {
return jsjavax.swing.text.TextAction.augmentList (Clazz.superCall (this, jsjavax.swing.JTextField, "getActions", []), jsjavax.swing.JTextField.defaultActions);
});
Clazz.defineMethod (c$, "postActionEvent", 
function () {
this.fireActionPerformed ();
});
Clazz.defineMethod (c$, "getHorizontalVisibility", 
function () {
return this.visibility;
});
Clazz.defineMethod (c$, "getScrollOffset", 
function () {
return this.visibility.getValue ();
});
Clazz.defineMethod (c$, "setScrollOffset", 
function (scrollOffset) {
this.visibility.setValue (scrollOffset);
}, "~N");
Clazz.overrideMethod (c$, "scrollRectToVisible", 
function (r) {
var i = this.getInsets ();
var x0 = r.x + this.visibility.getValue () - i.left;
var x1 = x0 + r.width;
if (x0 < this.visibility.getValue ()) {
this.visibility.setValue (x0);
} else if (x1 > this.visibility.getValue () + this.visibility.getExtent ()) {
this.visibility.setValue (x1 - this.visibility.getExtent ());
}}, "jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "hasActionListener", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjava.awt.event.ActionListener) {
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
return Clazz.superCall (this, jsjavax.swing.JTextField, "paramString", []) + ",columns=" + this.columns + ",columnWidth=" + this.columnWidth + ",command=" + commandString + ",horizontalAlignment=" + horizontalAlignmentString;
});
c$.$JTextField$ScrollRepainter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JTextField, "ScrollRepainter", null, jsjavax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
this.b$["jsjavax.swing.JTextField"].repaint ();
}, "jsjavax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JTextField, "TextFieldActionPropertyChangeListener", jsjavax.swing.ActionPropertyChangeListener);
Clazz.overrideMethod (c$, "actionPropertyChanged", 
function (a, b, c) {
if (jsjavax.swing.AbstractAction.shouldReconfigure (c)) {
a.configurePropertiesFromAction (b);
} else {
a.actionPropertyChanged (b, c.getPropertyName ());
}}, "jsjavax.swing.JTextField,jsjavax.swing.Action,jsjava.beans.PropertyChangeEvent");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JTextField, "NotifyAction", jsjavax.swing.text.TextAction);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.JTextField.NotifyAction, ["notify-field-accept"]);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = this.getFocusedComponent ();
if (Clazz.instanceOf (b, jsjavax.swing.JTextField)) {
var c = b;
c.postActionEvent ();
}}, "jsjava.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "isEnabled", 
function () {
var a = this.getFocusedComponent ();
if (Clazz.instanceOf (a, jsjavax.swing.JTextField)) {
return (a).hasActionListener ();
}return false;
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"notifyAction", "notify-field-accept");
c$.defaultActions = c$.prototype.defaultActions =  Clazz.newArray (-1, [ new jsjavax.swing.JTextField.NotifyAction ()]);
Clazz.defineStatics (c$,
"$uiClassID", "TextFieldUI");
});
