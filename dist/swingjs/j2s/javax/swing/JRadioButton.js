Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JToggleButton"], "javax.swing.JRadioButton", null, function () {
c$ = Clazz.declareType (javax.swing, "JRadioButton", javax.swing.JToggleButton);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null, false);
});
Clazz.makeConstructor (c$, 
function (icon) {
this.construct (null, icon, false);
}, "javax.swing.Icon");
Clazz.makeConstructor (c$, 
function (a) {
this.construct ();
this.setAction (a);
}, "javax.swing.Action");
Clazz.makeConstructor (c$, 
function (icon, selected) {
this.construct (null, icon, selected);
}, "javax.swing.Icon,~B");
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
}, "~S,javax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text, icon, selected) {
Clazz.superConstructor (this, javax.swing.JRadioButton, [text, icon, selected, "RadioButtonUI"]);
this.setBorderPainted (false);
this.setHorizontalAlignment (10);
}, "~S,javax.swing.Icon,~B");
Clazz.overrideMethod (c$, "setIconFromAction", 
function (a) {
}, "javax.swing.Action");
});
