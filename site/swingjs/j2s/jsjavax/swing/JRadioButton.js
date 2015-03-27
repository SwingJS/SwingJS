Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JToggleButton"], "jsjavax.swing.JRadioButton", ["jsjavax.swing.UIManager"], function () {
c$ = Clazz.declareType (jsjavax.swing, "JRadioButton", jsjavax.swing.JToggleButton);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null, false);
});
Clazz.makeConstructor (c$, 
function (icon) {
this.construct (null, icon, false);
}, "jsjavax.swing.Icon");
Clazz.makeConstructor (c$, 
function (a) {
this.construct ();
this.setAction (a);
}, "jsjavax.swing.Action");
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
function (text, icon) {
this.construct (text, icon, false);
}, "~S,jsjavax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text, icon, selected) {
Clazz.superConstructor (this, jsjavax.swing.JRadioButton, [text, icon, selected]);
this.setBorderPainted (false);
this.setHorizontalAlignment (10);
}, "~S,jsjavax.swing.Icon,~B");
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "RadioButtonUI";
});
Clazz.overrideMethod (c$, "setIconFromAction", 
function (a) {
}, "jsjavax.swing.Action");
Clazz.defineStatics (c$,
"$$uiClassID", "RadioButtonUI");
});
