Clazz.declarePackage ("javax.swing.plaf");
Clazz.load (["javax.swing.Icon", "javax.swing.plaf.UIResource"], "javax.swing.plaf.IconUIResource", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.delegate = null;
Clazz.instantialize (this, arguments);
}, javax.swing.plaf, "IconUIResource", null, [javax.swing.Icon, javax.swing.plaf.UIResource]);
Clazz.makeConstructor (c$, 
function (delegate) {
if (delegate == null) {
throw  new IllegalArgumentException ("null delegate icon argument");
}this.delegate = delegate;
}, "javax.swing.Icon");
Clazz.defineMethod (c$, "paintIcon", 
function (c, g, x, y) {
this.delegate.paintIcon (c, g, x, y);
}, "java.awt.Component,java.awt.Graphics,~N,~N");
Clazz.defineMethod (c$, "getIconWidth", 
function () {
return this.delegate.getIconWidth ();
});
Clazz.defineMethod (c$, "getIconHeight", 
function () {
return this.delegate.getIconHeight ();
});
});
