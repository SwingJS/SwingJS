Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent", "$.SwingConstants"], "javax.swing.JSeparator", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.orientation = 0;
Clazz.instantialize (this, arguments);
}, javax.swing, "JSeparator", javax.swing.JComponent, javax.swing.SwingConstants);
Clazz.makeConstructor (c$, 
function () {
this.construct (0);
});
Clazz.makeConstructor (c$, 
function (orientation) {
this.construct (orientation, "SeparatorUI");
}, "~N");
Clazz.makeConstructor (c$, 
function (orientation, sid) {
Clazz.superConstructor (this, javax.swing.JSeparator, []);
this.checkOrientation (orientation);
this.orientation = orientation;
this.setFocusable (false);
this.uiClassID = sid;
this.updateUI ();
}, "~N,~S");
Clazz.defineMethod (c$, "getOrientation", 
function () {
return this.orientation;
});
Clazz.defineMethod (c$, "setOrientation", 
function (orientation) {
if (this.orientation == orientation) {
return;
}var oldValue = this.orientation;
this.checkOrientation (orientation);
this.orientation = orientation;
this.firePropertyChangeInt ("orientation", oldValue, orientation);
this.revalidate ();
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "checkOrientation", 
 function (orientation) {
switch (orientation) {
case 1:
case 0:
break;
default:
throw  new IllegalArgumentException ("orientation must be one of: VERTICAL, HORIZONTAL");
}
}, "~N");
Clazz.defineMethod (c$, "paramString", 
function () {
var orientationString = (this.orientation == 0 ? "HORIZONTAL" : "VERTICAL");
return Clazz.superCall (this, javax.swing.JSeparator, "paramString", []) + ",orientation=" + orientationString;
});
});
