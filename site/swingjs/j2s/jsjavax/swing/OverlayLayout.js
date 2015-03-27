Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.LayoutManager2"], "jsjavax.swing.OverlayLayout", ["jsjava.awt.AWTError", "$.Dimension", "jsjavax.swing.SizeRequirements"], function () {
c$ = Clazz.decorateAsClass (function () {
this.target = null;
this.xChildren = null;
this.yChildren = null;
this.xTotal = null;
this.yTotal = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "OverlayLayout", null, jsjava.awt.LayoutManager2);
Clazz.makeConstructor (c$, 
function (target) {
this.target = target;
}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "getTarget", 
function () {
return this.target;
});
Clazz.overrideMethod (c$, "invalidateLayout", 
function (target) {
this.checkContainer (target);
this.xChildren = null;
this.yChildren = null;
this.xTotal = null;
this.yTotal = null;
}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (name, comp) {
this.invalidateLayout (comp.getParent ());
}, "~S,jsjava.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (comp) {
this.invalidateLayout (comp.getParent ());
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (comp, constraints) {
this.invalidateLayout (comp.getParent ());
}, "jsjava.awt.Component,~O");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (target) {
this.checkContainer (target);
this.checkRequests ();
var size =  new jsjava.awt.Dimension (this.xTotal.preferred, this.yTotal.preferred);
var insets = target.getInsets ();
size.width += insets.left + insets.right;
size.height += insets.top + insets.bottom;
return size;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (target) {
this.checkContainer (target);
this.checkRequests ();
var size =  new jsjava.awt.Dimension (this.xTotal.minimum, this.yTotal.minimum);
var insets = target.getInsets ();
size.width += insets.left + insets.right;
size.height += insets.top + insets.bottom;
return size;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "maximumLayoutSize", 
function (target) {
this.checkContainer (target);
this.checkRequests ();
var size =  new jsjava.awt.Dimension (this.xTotal.maximum, this.yTotal.maximum);
var insets = target.getInsets ();
size.width += insets.left + insets.right;
size.height += insets.top + insets.bottom;
return size;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentX", 
function (target) {
this.checkContainer (target);
this.checkRequests ();
return this.xTotal.alignment;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentY", 
function (target) {
this.checkContainer (target);
this.checkRequests ();
return this.yTotal.alignment;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (target) {
this.checkContainer (target);
this.checkRequests ();
var nChildren = target.getComponentCount ();
var xOffsets =  Clazz.newIntArray (nChildren, 0);
var xSpans =  Clazz.newIntArray (nChildren, 0);
var yOffsets =  Clazz.newIntArray (nChildren, 0);
var ySpans =  Clazz.newIntArray (nChildren, 0);
var alloc = target.getSize ();
var $in = target.getInsets ();
alloc.width -= $in.left + $in.right;
alloc.height -= $in.top + $in.bottom;
jsjavax.swing.SizeRequirements.calculateAlignedPositions (alloc.width, this.xTotal, this.xChildren, xOffsets, xSpans);
jsjavax.swing.SizeRequirements.calculateAlignedPositions (alloc.height, this.yTotal, this.yChildren, yOffsets, ySpans);
for (var i = 0; i < nChildren; i++) {
var c = target.getComponent (i);
c.setBounds ($in.left + xOffsets[i], $in.top + yOffsets[i], xSpans[i], ySpans[i]);
}
}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "checkContainer", 
function (target) {
if (this.target !== target) {
throw  new jsjava.awt.AWTError ("OverlayLayout can't be shared");
}}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "checkRequests", 
function () {
if (this.xChildren == null || this.yChildren == null) {
var n = this.target.getComponentCount ();
this.xChildren =  new Array (n);
this.yChildren =  new Array (n);
for (var i = 0; i < n; i++) {
var c = this.target.getComponent (i);
var min = c.getMinimumSize ();
var typ = c.getPreferredSize ();
var max = c.getMaximumSize ();
this.xChildren[i] =  new jsjavax.swing.SizeRequirements (min.width, typ.width, max.width, c.getAlignmentX ());
this.yChildren[i] =  new jsjavax.swing.SizeRequirements (min.height, typ.height, max.height, c.getAlignmentY ());
}
this.xTotal = jsjavax.swing.SizeRequirements.getAlignedSizeRequirements (this.xChildren);
this.yTotal = jsjavax.swing.SizeRequirements.getAlignedSizeRequirements (this.yChildren);
}});
});
