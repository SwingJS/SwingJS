Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JToggleButton"], "jsjavax.swing.JCheckBox", ["java.lang.Boolean", "jsjavax.swing.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.flat = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JCheckBox", jsjavax.swing.JToggleButton);
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
function (a) {
this.construct ();
this.setAction (a);
}, "jsjavax.swing.Action");
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
Clazz.superConstructor (this, jsjavax.swing.JCheckBox, [text, icon, selected]);
this.setUIProperty ("borderPainted", Boolean.FALSE);
this.setHorizontalAlignment (10);
}, "~S,jsjavax.swing.Icon,~B");
Clazz.defineMethod (c$, "setBorderPaintedFlat", 
function (b) {
var oldValue = this.flat;
this.flat = b;
this.firePropertyChange ("borderPaintedFlat", oldValue, this.flat);
if (b != oldValue) {
this.revalidate ();
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "isBorderPaintedFlat", 
function () {
return this.flat;
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "CheckBoxUI";
});
Clazz.overrideMethod (c$, "setIconFromAction", 
function (a) {
}, "jsjavax.swing.Action");
Clazz.defineStatics (c$,
"BORDER_PAINTED_FLAT_CHANGED_PROPERTY", "borderPaintedFlat",
"$$uiClassID", "CheckBoxUI");
});
