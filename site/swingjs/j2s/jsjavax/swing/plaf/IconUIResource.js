Clazz.declarePackage ("jsjavax.swing.plaf");
Clazz.load (["jsjavax.swing.Icon", "jsjavax.swing.plaf.UIResource"], "jsjavax.swing.plaf.IconUIResource", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.delegate = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.plaf, "IconUIResource", null, [jsjavax.swing.Icon, jsjavax.swing.plaf.UIResource]);
Clazz.makeConstructor (c$, 
function (delegate) {
if (delegate == null) {
throw  new IllegalArgumentException ("null delegate icon argument");
}this.delegate = delegate;
}, "jsjavax.swing.Icon");
Clazz.defineMethod (c$, "paintIcon", 
function (c, g, x, y) {
this.delegate.paintIcon (c, g, x, y);
}, "jsjava.awt.Component,jsjava.awt.Graphics,~N,~N");
Clazz.defineMethod (c$, "getIconWidth", 
function () {
return this.delegate.getIconWidth ();
});
Clazz.defineMethod (c$, "getIconHeight", 
function () {
return this.delegate.getIconHeight ();
});
});
