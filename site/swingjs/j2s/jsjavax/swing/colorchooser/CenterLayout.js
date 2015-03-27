Clazz.declarePackage ("jsjavax.swing.colorchooser");
Clazz.load (["jsjava.awt.LayoutManager"], "jsjavax.swing.colorchooser.CenterLayout", ["jsjava.awt.Dimension"], function () {
c$ = Clazz.declareType (jsjavax.swing.colorchooser, "CenterLayout", null, jsjava.awt.LayoutManager);
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (name, comp) {
}, "~S,jsjava.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (comp) {
}, "jsjava.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (container) {
var c = container.getComponent (0);
if (c != null) {
var size = c.getPreferredSize ();
var insets = container.getInsets ();
size.width += insets.left + insets.right;
size.height += insets.top + insets.bottom;
return size;
} else {
return  new jsjava.awt.Dimension (0, 0);
}}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (cont) {
return this.preferredLayoutSize (cont);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (container) {
try {
var c = container.getComponent (0);
c.setSize (c.getPreferredSize ());
var size = c.getSize ();
var containerSize = container.getSize ();
var containerInsets = container.getInsets ();
containerSize.width -= containerInsets.left + containerInsets.right;
containerSize.height -= containerInsets.top + containerInsets.bottom;
var componentLeft = (Clazz.doubleToInt (containerSize.width / 2)) - (Clazz.doubleToInt (size.width / 2));
var componentTop = (Clazz.doubleToInt (containerSize.height / 2)) - (Clazz.doubleToInt (size.height / 2));
componentLeft += containerInsets.left;
componentTop += containerInsets.top;
c.setBounds (componentLeft, componentTop, size.width, size.height);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "jsjava.awt.Container");
});
