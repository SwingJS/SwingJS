Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JMenuItem"], "jsjavax.swing.JRadioButtonMenuItem", ["jsjavax.swing.JToggleButton"], function () {
c$ = Clazz.declareType (jsjavax.swing, "JRadioButtonMenuItem", jsjavax.swing.JMenuItem);
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
function (text, selected) {
this.construct (text);
this.setSelected (selected);
}, "~S,~B");
Clazz.makeConstructor (c$, 
function (icon, selected) {
this.construct (null, icon, selected);
}, "jsjavax.swing.Icon,~B");
Clazz.makeConstructor (c$, 
function (text, icon, selected) {
Clazz.superConstructor (this, jsjavax.swing.JRadioButtonMenuItem, [text, icon]);
this.setModel ( new jsjavax.swing.JToggleButton.ToggleButtonModel ());
this.setSelected (selected);
this.setFocusable (false);
}, "~S,jsjavax.swing.Icon,~B");
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "RadioButtonMenuItemUI";
});
Clazz.overrideMethod (c$, "shouldUpdateSelectedStateFromAction", 
function () {
return true;
});
Clazz.defineStatics (c$,
"$$uiClassID", "RadioButtonMenuItemUI");
});
