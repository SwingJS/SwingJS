Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JMenuItem", "$.SwingConstants"], "jsjavax.swing.JCheckBoxMenuItem", ["jsjavax.swing.JToggleButton"], function () {
c$ = Clazz.declareType (jsjavax.swing, "JCheckBoxMenuItem", jsjavax.swing.JMenuItem, jsjavax.swing.SwingConstants);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null, false);
});
Clazz.makeConstructor (c$, 
function (icon) {
this.construct (null, icon, false);
}, "jsjavax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text) {
this.construct (text, null, false);
}, "~S");
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
function (text, b) {
this.construct (text, null, b);
}, "~S,~B");
Clazz.makeConstructor (c$, 
function (text, icon, b) {
Clazz.superConstructor (this, jsjavax.swing.JCheckBoxMenuItem, [text, icon]);
this.setModel ( new jsjavax.swing.JToggleButton.ToggleButtonModel ());
this.setSelected (b);
this.setFocusable (false);
}, "~S,jsjavax.swing.Icon,~B");
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "CheckBoxMenuItemUI";
});
Clazz.defineMethod (c$, "getState", 
function () {
return this.isSelected ();
});
Clazz.defineMethod (c$, "setState", 
function (b) {
this.setSelected (b);
}, "~B");
Clazz.overrideMethod (c$, "getSelectedObjects", 
function () {
if (this.isSelected () == false) return null;
var selectedObjects =  new Array (1);
selectedObjects[0] = this.getText ();
return selectedObjects;
});
Clazz.overrideMethod (c$, "shouldUpdateSelectedStateFromAction", 
function () {
return true;
});
Clazz.defineStatics (c$,
"$$uiClassID", "CheckBoxMenuItemUI");
});
