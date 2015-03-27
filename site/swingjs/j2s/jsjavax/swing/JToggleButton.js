Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.AbstractButton", "$.DefaultButtonModel"], "jsjavax.swing.JToggleButton", ["jsjava.awt.EventQueue", "jsjava.awt.event.ActionEvent", "$.InputEvent", "$.ItemEvent", "jsjavax.swing.UIManager"], function () {
c$ = Clazz.declareType (jsjavax.swing, "JToggleButton", jsjavax.swing.AbstractButton);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null, false);
});
Clazz.makeConstructor (c$, 
function (icon) {
this.construct (null, icon, false);
}, "jsjavax.swing.Icon");
Clazz.makeConstructor (c$, 
function (icon, selected) {
this.construct (null, icon, selected);
}, "jsjavax.swing.Icon,~B");
Clazz.makeConstructor (c$, 
function (text) {
this.construct (text, null, false);
}, "~S");
Clazz.makeConstructor (c$, 
function (text, selected) {
this.construct (text, null, selected);
}, "~S,~B");
Clazz.makeConstructor (c$, 
function (a) {
this.construct ();
this.setAction (a);
}, "jsjavax.swing.Action");
Clazz.makeConstructor (c$, 
function (text, icon) {
this.construct (text, icon, false);
}, "~S,jsjavax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text, icon, selected) {
Clazz.superConstructor (this, jsjavax.swing.JToggleButton, []);
this.setModel ( new jsjavax.swing.JToggleButton.ToggleButtonModel ());
this.model.setSelected (selected);
this.init (text, icon);
}, "~S,jsjavax.swing.Icon,~B");
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "ToggleButtonUI";
});
Clazz.overrideMethod (c$, "shouldUpdateSelectedStateFromAction", 
function () {
return true;
});
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JToggleButton, "ToggleButtonModel", jsjavax.swing.DefaultButtonModel);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.JToggleButton.ToggleButtonModel, []);
});
Clazz.overrideMethod (c$, "isSelected", 
function () {
return (this.stateMask & 2) != 0;
});
Clazz.overrideMethod (c$, "setSelected", 
function (a) {
var b = this.getGroup ();
if (b != null) {
b.setSelected (this, a);
a = b.isSelected (this);
}if (this.isSelected () == a) {
return;
}if (a) {
this.stateMask |= 2;
} else {
this.stateMask &= -3;
}this.fireStateChanged ();
this.fireItemStateChanged ( new jsjava.awt.event.ItemEvent (this, 701, this, this.isSelected () ? 1 : 2));
}, "~B");
Clazz.overrideMethod (c$, "setPressed", 
function (a) {
if ((this.isPressed () == a) || !this.isEnabled ()) {
return;
}if (a == false && this.isArmed ()) {
this.setSelected (!this.isSelected ());
}if (a) {
this.stateMask |= 4;
} else {
this.stateMask &= -5;
}this.fireStateChanged ();
if (!this.isPressed () && this.isArmed ()) {
var b = 0;
var c = jsjava.awt.EventQueue.getCurrentEvent ();
if (Clazz.instanceOf (c, jsjava.awt.event.InputEvent)) {
b = (c).getModifiers ();
} else if (Clazz.instanceOf (c, jsjava.awt.event.ActionEvent)) {
b = (c).getModifiers ();
}this.fireActionPerformed ( new jsjava.awt.event.ActionEvent (this, 1001, this.getActionCommand (), jsjava.awt.EventQueue.getMostRecentEventTime (), b));
}}, "~B");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"$uiClassID", "ToggleButtonUI");
});
