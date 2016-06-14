Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JToggleButton"], "javax.swing.JCheckBox", ["java.lang.Boolean", "javax.swing.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.flat = false;
Clazz.instantialize (this, arguments);
}, javax.swing, "JCheckBox", javax.swing.JToggleButton);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null, false);
});
Clazz.makeConstructor (c$, 
function (icon) {
this.construct (null, icon, false);
}, "javax.swing.Icon");
Clazz.makeConstructor (c$, 
function (icon, selected) {
this.construct (null, icon, selected);
}, "javax.swing.Icon,~B");
Clazz.makeConstructor (c$, 
function (text) {
this.construct (text, null, false);
}, "~S");
Clazz.makeConstructor (c$, 
function (a) {
this.construct ();
this.setAction (a);
}, "javax.swing.Action");
Clazz.makeConstructor (c$, 
function (text, selected) {
this.construct (text, null, selected);
}, "~S,~B");
Clazz.makeConstructor (c$, 
function (text, icon) {
this.construct (text, icon, false);
}, "~S,javax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text, icon, selected) {
Clazz.superConstructor (this, javax.swing.JCheckBox, [text, icon, selected]);
this.setUIProperty ("borderPainted", Boolean.FALSE);
this.setHorizontalAlignment (10);
}, "~S,javax.swing.Icon,~B");
Clazz.defineMethod (c$, "setBorderPaintedFlat", 
function (b) {
var oldValue = this.flat;
this.flat = b;
this.firePropertyChangeBool ("borderPaintedFlat", oldValue, this.flat);
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
this.setUI (javax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "CheckBoxUI";
});
Clazz.overrideMethod (c$, "setIconFromAction", 
function (a) {
}, "javax.swing.Action");
Clazz.defineStatics (c$,
"BORDER_PAINTED_FLAT_CHANGED_PROPERTY", "borderPaintedFlat",
"$$uiClassID", "CheckBoxUI");
});
