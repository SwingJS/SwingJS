Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.ButtonModel", "jsjavax.swing.event.EventListenerList"], "jsjavax.swing.DefaultButtonModel", ["jsjava.awt.EventQueue", "jsjava.awt.event.ActionEvent", "$.ActionListener", "$.InputEvent", "$.ItemEvent", "$.ItemListener", "jsjavax.swing.UIManager", "jsjavax.swing.event.ChangeEvent", "$.ChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.stateMask = 0;
this.actionCommand = null;
this.group = null;
this.mnemonic = 0;
this.changeEvent = null;
this.listenerList = null;
this.menuItem = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "DefaultButtonModel", null, jsjavax.swing.ButtonModel);
Clazz.prepareFields (c$, function () {
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function () {
this.stateMask = 0;
this.setEnabled (true);
});
Clazz.overrideMethod (c$, "setActionCommand", 
function (actionCommand) {
this.actionCommand = actionCommand;
}, "~S");
Clazz.overrideMethod (c$, "getActionCommand", 
function () {
return this.actionCommand;
});
Clazz.overrideMethod (c$, "isArmed", 
function () {
return (this.stateMask & 1) != 0;
});
Clazz.overrideMethod (c$, "isSelected", 
function () {
return (this.stateMask & 2) != 0;
});
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return (this.stateMask & 8) != 0;
});
Clazz.overrideMethod (c$, "isPressed", 
function () {
return (this.stateMask & 4) != 0;
});
Clazz.overrideMethod (c$, "isRollover", 
function () {
return (this.stateMask & 16) != 0;
});
Clazz.overrideMethod (c$, "setArmed", 
function (b) {
if (this.isMenuItem () && jsjavax.swing.UIManager.getBoolean ("MenuItem.disabledAreNavigable")) {
if ((this.isArmed () == b)) {
return;
}} else {
if ((this.isArmed () == b) || !this.isEnabled ()) {
return;
}}if (b) {
this.stateMask |= 1;
} else {
this.stateMask &= -2;
}this.fireStateChanged ();
}, "~B");
Clazz.overrideMethod (c$, "setEnabled", 
function (b) {
if (this.isEnabled () == b) {
return;
}if (b) {
this.stateMask |= 8;
} else {
this.stateMask &= -9;
this.stateMask &= -2;
this.stateMask &= -5;
}this.fireStateChanged ();
}, "~B");
Clazz.overrideMethod (c$, "setSelected", 
function (b) {
if (this.isSelected () == b) {
return;
}if (b) {
this.stateMask |= 2;
} else {
this.stateMask &= -3;
}this.fireItemStateChanged ( new jsjava.awt.event.ItemEvent (this, 701, this, b ? 1 : 2));
this.fireStateChanged ();
}, "~B");
Clazz.overrideMethod (c$, "setPressed", 
function (b) {
if ((this.isPressed () == b) || !this.isEnabled ()) {
return;
}if (b) {
this.stateMask |= 4;
} else {
this.stateMask &= -5;
}if (!this.isPressed () && this.isArmed ()) {
var modifiers = 0;
var currentEvent = jsjava.awt.EventQueue.getCurrentEvent ();
if (Clazz.instanceOf (currentEvent, jsjava.awt.event.InputEvent)) {
modifiers = (currentEvent).getModifiers ();
} else if (Clazz.instanceOf (currentEvent, jsjava.awt.event.ActionEvent)) {
modifiers = (currentEvent).getModifiers ();
}this.fireActionPerformed ( new jsjava.awt.event.ActionEvent (this, 1001, this.getActionCommand (), jsjava.awt.EventQueue.getMostRecentEventTime (), modifiers));
}this.fireStateChanged ();
}, "~B");
Clazz.overrideMethod (c$, "setRollover", 
function (b) {
if ((this.isRollover () == b) || !this.isEnabled ()) {
return;
}if (b) {
this.stateMask |= 16;
} else {
this.stateMask &= -17;
}this.fireStateChanged ();
}, "~B");
Clazz.overrideMethod (c$, "setMnemonic", 
function (key) {
this.mnemonic = key;
this.fireStateChanged ();
}, "~N");
Clazz.overrideMethod (c$, "getMnemonic", 
function () {
return this.mnemonic;
});
Clazz.overrideMethod (c$, "addChangeListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.ChangeListener, l);
}, "jsjavax.swing.event.ChangeListener");
Clazz.overrideMethod (c$, "removeChangeListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.ChangeListener, l);
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
if (this.changeEvent == null) this.changeEvent =  new jsjavax.swing.event.ChangeEvent (this);
(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
Clazz.overrideMethod (c$, "addActionListener", 
function (l) {
this.listenerList.add (jsjava.awt.event.ActionListener, l);
}, "jsjava.awt.event.ActionListener");
Clazz.overrideMethod (c$, "removeActionListener", 
function (l) {
this.listenerList.remove (jsjava.awt.event.ActionListener, l);
}, "jsjava.awt.event.ActionListener");
Clazz.defineMethod (c$, "getActionListeners", 
function () {
return this.listenerList.getListeners (jsjava.awt.event.ActionListener);
});
Clazz.defineMethod (c$, "fireActionPerformed", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjava.awt.event.ActionListener) {
(listeners[i + 1]).actionPerformed (e);
}}
}, "jsjava.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "addItemListener", 
function (l) {
this.listenerList.add (jsjava.awt.event.ItemListener, l);
}, "jsjava.awt.event.ItemListener");
Clazz.overrideMethod (c$, "removeItemListener", 
function (l) {
this.listenerList.remove (jsjava.awt.event.ItemListener, l);
}, "jsjava.awt.event.ItemListener");
Clazz.defineMethod (c$, "getItemListeners", 
function () {
return this.listenerList.getListeners (jsjava.awt.event.ItemListener);
});
Clazz.defineMethod (c$, "fireItemStateChanged", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjava.awt.event.ItemListener) {
(listeners[i + 1]).itemStateChanged (e);
}}
}, "jsjava.awt.event.ItemEvent");
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
Clazz.overrideMethod (c$, "getSelectedObjects", 
function () {
return null;
});
Clazz.overrideMethod (c$, "setGroup", 
function (group) {
this.group = group;
}, "jsjavax.swing.ButtonGroup");
Clazz.defineMethod (c$, "getGroup", 
function () {
return this.group;
});
Clazz.defineMethod (c$, "isMenuItem", 
function () {
return this.menuItem;
});
Clazz.defineMethod (c$, "setMenuItem", 
function (menuItem) {
this.menuItem = menuItem;
}, "~B");
Clazz.defineStatics (c$,
"ARMED", 1,
"SELECTED", 2,
"PRESSED", 4,
"ENABLED", 8,
"ROLLOVER", 16);
});
