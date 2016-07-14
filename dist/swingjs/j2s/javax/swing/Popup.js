Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.Frame", "javax.swing.JWindow"], "javax.swing.Popup", ["java.lang.IllegalArgumentException", "java.awt.Toolkit", "$.Window", "javax.swing.SwingUtilities", "sun.awt.SunToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.component = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "Popup");
Clazz.makeConstructor (c$, 
function (owner, contents, x, y) {
this.construct ();
if (contents == null) {
throw  new IllegalArgumentException ("Contents must be non-null");
}this.reset (owner, contents, x, y);
}, "java.awt.Component,java.awt.Component,~N,~N");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "show", 
function () {
var component = this.getComponent ();
if (component != null) {
component.show ();
}});
Clazz.defineMethod (c$, "hide", 
function () {
var component = this.getComponent ();
if (Clazz.instanceOf (component, javax.swing.JWindow)) {
component.hide ();
(component).getContentPane ().removeAll ();
}this.dispose ();
});
Clazz.defineMethod (c$, "dispose", 
function () {
var component = this.getComponent ();
var window = javax.swing.SwingUtilities.getWindowAncestor (component);
if (Clazz.instanceOf (component, javax.swing.JWindow)) {
(component).dispose ();
component = null;
}if (Clazz.instanceOf (window, javax.swing.Popup.DefaultFrame)) {
window.dispose ();
}});
Clazz.defineMethod (c$, "reset", 
function (owner, contents, ownerX, ownerY) {
if (this.getComponent () == null) {
this.component = this.createComponent (owner);
}var c = this.getComponent ();
if (Clazz.instanceOf (c, javax.swing.JWindow)) {
var component = this.getComponent ();
component.setLocation (ownerX, ownerY);
component.getContentPane ().add (contents, "Center");
contents.invalidate ();
if (component.isVisible ()) {
this.pack ();
}}}, "java.awt.Component,java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "pack", 
function () {
var component = this.getComponent ();
if (Clazz.instanceOf (component, java.awt.Window)) {
(component).pack ();
}});
Clazz.defineMethod (c$, "getParentWindow", 
 function (owner) {
var window = null;
if (Clazz.instanceOf (owner, java.awt.Window)) {
window = owner;
} else if (owner != null) {
window = javax.swing.SwingUtilities.getWindowAncestor (owner);
}if (window == null) {
window =  new javax.swing.Popup.DefaultFrame ();
}return window;
}, "java.awt.Component");
Clazz.defineMethod (c$, "createComponent", 
function (owner) {
return  new javax.swing.Popup.HeavyWeightWindow (this.getParentWindow (owner));
}, "java.awt.Component");
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.component;
});
c$.isDefaultFrame = Clazz.defineMethod (c$, "isDefaultFrame", 
function (window) {
return Clazz.instanceOf (window, javax.swing.Popup.DefaultFrame);
}, "~O");
c$.isHeavyWeight = Clazz.defineMethod (c$, "isHeavyWeight", 
function (window) {
return Clazz.instanceOf (window, javax.swing.Popup.HeavyWeightWindow);
}, "java.awt.Container");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.Popup, "HeavyWeightWindow", javax.swing.JWindow);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.Popup.HeavyWeightWindow, [a]);
this.setFocusableWindowState (false);
var b = java.awt.Toolkit.getDefaultToolkit ();
if (Clazz.instanceOf (b, sun.awt.SunToolkit)) {
(b).setOverrideRedirect (this);
}this.getRootPane ().setUseTrueDoubleBuffering (false);
try {
this.setAlwaysOnTop (true);
} catch (se) {
if (Clazz.exceptionOf (se, SecurityException)) {
} else {
throw se;
}
}
}, "java.awt.Window");
Clazz.overrideMethod (c$, "update", 
function (a) {
this.paint (a);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "show", 
function () {
this.pack ();
if (this.getWidth () > 0 && this.getHeight () > 0) {
Clazz.superCall (this, javax.swing.Popup.HeavyWeightWindow, "show", []);
}});
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.Popup, "DefaultFrame", java.awt.Frame);
c$ = Clazz.p0p ();
});
