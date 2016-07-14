Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JMenuItem"], "javax.swing.JRadioButtonMenuItem", ["javax.swing.JToggleButton"], function () {
c$ = Clazz.declareType (javax.swing, "JRadioButtonMenuItem", javax.swing.JMenuItem);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null, false);
});
Clazz.makeConstructor (c$, 
function (icon) {
this.construct (null, icon, false);
}, "javax.swing.Icon");
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
function (text, icon) {
this.construct (text, icon, false);
}, "~S,javax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text, selected) {
this.construct (text);
this.setSelected (selected);
}, "~S,~B");
Clazz.makeConstructor (c$, 
function (icon, selected) {
this.construct (null, icon, selected);
}, "javax.swing.Icon,~B");
Clazz.makeConstructor (c$, 
function (text, icon, selected) {
Clazz.superConstructor (this, javax.swing.JRadioButtonMenuItem, [text, icon, "RadioButtonMenuItemUI"]);
this.setModel ( new javax.swing.JToggleButton.ToggleButtonModel ());
this.setSelected (selected);
this.setFocusable (false);
}, "~S,javax.swing.Icon,~B");
Clazz.overrideMethod (c$, "shouldUpdateSelectedStateFromAction", 
function () {
return true;
});
});
