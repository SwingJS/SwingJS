Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.LayoutManager2"], "jsjavax.swing.BoxLayout", ["jsjava.awt.AWTError", "$.Dimension", "jsjavax.swing.SizeRequirements"], function () {
c$ = Clazz.decorateAsClass (function () {
this.axis = 0;
this.target = null;
this.xChildren = null;
this.yChildren = null;
this.xTotal = null;
this.yTotal = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "BoxLayout", null, jsjava.awt.LayoutManager2);
Clazz.makeConstructor (c$, 
function (target, axis) {
if (axis != 0 && axis != 1 && axis != 2 && axis != 3) {
throw  new jsjava.awt.AWTError ("Invalid axis");
}this.axis = axis;
this.target = target;
}, "jsjava.awt.Container,~N");
Clazz.defineMethod (c$, "getTarget", 
function () {
return this.target;
});
Clazz.defineMethod (c$, "getAxis", 
function () {
return this.axis;
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
var size;
{
this.checkContainer (target);
this.checkRequests ();
size =  new jsjava.awt.Dimension (this.xTotal.preferred, this.yTotal.preferred);
}var insets = target.getInsets ();
size.width = Math.min (size.width + insets.left + insets.right, 2147483647);
size.height = Math.min (size.height + insets.top + insets.bottom, 2147483647);
return size;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (target) {
var size;
{
this.checkContainer (target);
this.checkRequests ();
size =  new jsjava.awt.Dimension (this.xTotal.minimum, this.yTotal.minimum);
}var insets = target.getInsets ();
size.width = Math.min (size.width + insets.left + insets.right, 2147483647);
size.height = Math.min (size.height + insets.top + insets.bottom, 2147483647);
return size;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "maximumLayoutSize", 
function (target) {
var size;
{
this.checkContainer (target);
this.checkRequests ();
size =  new jsjava.awt.Dimension (this.xTotal.maximum, this.yTotal.maximum);
}var insets = target.getInsets ();
size.width = Math.min (size.width + insets.left + insets.right, 2147483647);
size.height = Math.min (size.height + insets.top + insets.bottom, 2147483647);
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
var nChildren = target.getComponentCount ();
var xOffsets =  Clazz.newIntArray (nChildren, 0);
var xSpans =  Clazz.newIntArray (nChildren, 0);
var yOffsets =  Clazz.newIntArray (nChildren, 0);
var ySpans =  Clazz.newIntArray (nChildren, 0);
var alloc = target.getSize ();
var $in = target.getInsets ();
alloc.width -= $in.left + $in.right;
alloc.height -= $in.top + $in.bottom;
var o = target.getComponentOrientation ();
var absoluteAxis = this.resolveAxis (this.axis, o);
var ltr = (absoluteAxis != this.axis) ? o.isLeftToRight () : true;
{
this.checkRequests ();
if (absoluteAxis == 0) {
jsjavax.swing.SizeRequirements.calculateTiledPositions (alloc.width, this.xTotal, this.xChildren, xOffsets, xSpans, ltr);
jsjavax.swing.SizeRequirements.calculateAlignedPositions (alloc.height, this.yTotal, this.yChildren, yOffsets, ySpans);
} else {
jsjavax.swing.SizeRequirements.calculateAlignedPositions (alloc.width, this.xTotal, this.xChildren, xOffsets, xSpans, ltr);
jsjavax.swing.SizeRequirements.calculateTiledPositions (alloc.height, this.yTotal, this.yChildren, yOffsets, ySpans);
}}for (var i = 0; i < nChildren; i++) {
var c = target.getComponent (i);
c.setBounds (Math.min ($in.left + xOffsets[i], 2147483647), Math.min ($in.top + yOffsets[i], 2147483647), xSpans[i], ySpans[i]);
}
}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "checkContainer", 
function (target) {
if (this.target !== target) {
throw  new jsjava.awt.AWTError ("BoxLayout can't be shared");
}}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "checkRequests", 
function () {
if (this.xChildren == null || this.yChildren == null) {
var n = this.target.getComponentCount ();
this.xChildren =  new Array (n);
this.yChildren =  new Array (n);
for (var i = 0; i < n; i++) {
var c = this.target.getComponent (i);
if (!c.isVisible ()) {
this.xChildren[i] =  new jsjavax.swing.SizeRequirements (0, 0, 0, c.getAlignmentX ());
this.yChildren[i] =  new jsjavax.swing.SizeRequirements (0, 0, 0, c.getAlignmentY ());
continue;
}var min = c.getMinimumSize ();
var typ = c.getPreferredSize ();
var max = c.getMaximumSize ();
this.xChildren[i] =  new jsjavax.swing.SizeRequirements (min.width, typ.width, max.width, c.getAlignmentX ());
this.yChildren[i] =  new jsjavax.swing.SizeRequirements (min.height, typ.height, max.height, c.getAlignmentY ());
}
var absoluteAxis = this.resolveAxis (this.axis, this.target.getComponentOrientation ());
if (absoluteAxis == 0) {
this.xTotal = jsjavax.swing.SizeRequirements.getTiledSizeRequirements (this.xChildren);
this.yTotal = jsjavax.swing.SizeRequirements.getAlignedSizeRequirements (this.yChildren);
} else {
this.xTotal = jsjavax.swing.SizeRequirements.getAlignedSizeRequirements (this.xChildren);
this.yTotal = jsjavax.swing.SizeRequirements.getTiledSizeRequirements (this.yChildren);
}}});
Clazz.defineMethod (c$, "resolveAxis", 
($fz = function (axis, o) {
var absoluteAxis;
if (axis == 2) {
absoluteAxis = o.isHorizontal () ? 0 : 1;
} else if (axis == 3) {
absoluteAxis = o.isHorizontal () ? 1 : 0;
} else {
absoluteAxis = axis;
}return absoluteAxis;
}, $fz.isPrivate = true, $fz), "~N,jsjava.awt.ComponentOrientation");
Clazz.defineStatics (c$,
"X_AXIS", 0,
"Y_AXIS", 1,
"LINE_AXIS", 2,
"PAGE_AXIS", 3);
});
