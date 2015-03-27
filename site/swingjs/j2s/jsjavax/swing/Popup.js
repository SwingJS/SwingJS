Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.Frame", "jsjavax.swing.JWindow"], "jsjavax.swing.Popup", ["java.lang.IllegalArgumentException", "jsjava.awt.Toolkit", "$.Window", "jsjavax.swing.SwingUtilities", "jssun.awt.SunToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.component = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "Popup");
Clazz.makeConstructor (c$, 
function (owner, contents, x, y) {
this.construct ();
if (contents == null) {
throw  new IllegalArgumentException ("Contents must be non-null");
}this.reset (owner, contents, x, y);
}, "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
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
if (Clazz.instanceOf (component, jsjavax.swing.JWindow)) {
component.hide ();
(component).getContentPane ().removeAll ();
}this.dispose ();
});
Clazz.defineMethod (c$, "dispose", 
function () {
var component = this.getComponent ();
var window = jsjavax.swing.SwingUtilities.getWindowAncestor (component);
if (Clazz.instanceOf (component, jsjavax.swing.JWindow)) {
(component).dispose ();
component = null;
}if (Clazz.instanceOf (window, jsjavax.swing.Popup.DefaultFrame)) {
window.dispose ();
}});
Clazz.defineMethod (c$, "reset", 
function (owner, contents, ownerX, ownerY) {
if (this.getComponent () == null) {
this.component = this.createComponent (owner);
}var c = this.getComponent ();
if (Clazz.instanceOf (c, jsjavax.swing.JWindow)) {
var component = this.getComponent ();
component.setLocation (ownerX, ownerY);
component.getContentPane ().add (contents, "Center");
contents.invalidate ();
if (component.isVisible ()) {
this.pack ();
}}}, "jsjava.awt.Component,jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "pack", 
function () {
var component = this.getComponent ();
if (Clazz.instanceOf (component, jsjava.awt.Window)) {
(component).pack ();
}});
Clazz.defineMethod (c$, "getParentWindow", 
($fz = function (owner) {
var window = null;
if (Clazz.instanceOf (owner, jsjava.awt.Window)) {
window = owner;
} else if (owner != null) {
window = jsjavax.swing.SwingUtilities.getWindowAncestor (owner);
}if (window == null) {
window =  new jsjavax.swing.Popup.DefaultFrame ();
}return window;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component");
Clazz.defineMethod (c$, "createComponent", 
function (owner) {
return  new jsjavax.swing.Popup.HeavyWeightWindow (this.getParentWindow (owner));
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.component;
});
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.Popup, "HeavyWeightWindow", jsjavax.swing.JWindow);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.Popup.HeavyWeightWindow, [a]);
this.setFocusableWindowState (false);
var b = jsjava.awt.Toolkit.getDefaultToolkit ();
if (Clazz.instanceOf (b, jssun.awt.SunToolkit)) {
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
}, "jsjava.awt.Window");
Clazz.overrideMethod (c$, "update", 
function (a) {
this.paint (a);
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "show", 
function () {
this.pack ();
if (this.getWidth () > 0 && this.getHeight () > 0) {
Clazz.superCall (this, jsjavax.swing.Popup.HeavyWeightWindow, "show", []);
}});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.Popup, "DefaultFrame", jsjava.awt.Frame);
c$ = Clazz.p0p ();
});
