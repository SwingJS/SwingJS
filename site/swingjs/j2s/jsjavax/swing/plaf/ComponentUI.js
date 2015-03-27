Clazz.declarePackage ("jsjavax.swing.plaf");
Clazz.load (null, "jsjavax.swing.plaf.ComponentUI", ["java.lang.Error", "$.IllegalArgumentException", "$.NullPointerException", "jsjava.awt.Component"], function () {
c$ = Clazz.declareType (jsjavax.swing.plaf, "ComponentUI");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "installUI", 
function (c) {
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "uninstallUI", 
function (c) {
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "paint", 
function (g, c) {
}, "jsjava.awt.Graphics,jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "update", 
function (g, c) {
if (c.isOpaque ()) {
g.setColor (c.getBackground ());
g.fillRect (0, 0, c.getWidth (), c.getHeight ());
}this.paint (g, c);
}, "jsjava.awt.Graphics,jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "getPreferredSize", 
function (c) {
return null;
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "getMinimumSize", 
function (c) {
return this.getPreferredSize (c);
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "getMaximumSize", 
function (c) {
return this.getPreferredSize (c);
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "contains", 
function (c, x, y) {
return c.inside (x, y);
}, "jsjavax.swing.JComponent,~N,~N");
c$.createUI = Clazz.defineMethod (c$, "createUI", 
function (c) {
throw  new Error ("ComponentUI.createUI not implemented.");
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "getBaseline", 
function (c, width, height) {
if (c == null) {
throw  new NullPointerException ("Component must be non-null");
}if (width < 0 || height < 0) {
throw  new IllegalArgumentException ("Width and height must be >= 0");
}return -1;
}, "jsjavax.swing.JComponent,~N,~N");
Clazz.defineMethod (c$, "getBaselineResizeBehavior", 
function (c) {
if (c == null) {
throw  new NullPointerException ("Component must be non-null");
}return jsjava.awt.Component.BaselineResizeBehavior.OTHER;
}, "jsjavax.swing.JComponent");
});
