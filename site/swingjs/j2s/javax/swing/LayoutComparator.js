Clazz.declarePackage ("javax.swing");
Clazz.load (null, "javax.swing.LayoutComparator", ["java.lang.ClassCastException", "java.util.LinkedList", "java.awt.Window"], function () {
c$ = Clazz.decorateAsClass (function () {
this.horizontal = true;
this.leftToRight = true;
Clazz.instantialize (this, arguments);
}, javax.swing, "LayoutComparator", null, [java.util.Comparator, java.io.Serializable]);
Clazz.defineMethod (c$, "setComponentOrientation", 
function (orientation) {
this.horizontal = orientation.isHorizontal ();
this.leftToRight = orientation.isLeftToRight ();
}, "java.awt.ComponentOrientation");
Clazz.overrideMethod (c$, "compare", 
function (o1, o2) {
var a = o1;
var b = o2;
if (a === b) {
return 0;
}if (a.getParent () !== b.getParent ()) {
var aAncestory;
var bAncestory;
for (aAncestory =  new java.util.LinkedList (); a != null; a = a.getParent ()) {
aAncestory.add (a);
if (Clazz.instanceOf (a, java.awt.Window)) {
break;
}}
if (a == null) {
throw  new ClassCastException ();
}for (bAncestory =  new java.util.LinkedList (); b != null; b = b.getParent ()) {
bAncestory.add (b);
if (Clazz.instanceOf (b, java.awt.Window)) {
break;
}}
if (b == null) {
throw  new ClassCastException ();
}for (var aIter = aAncestory.listIterator (aAncestory.size ()), bIter = bAncestory.listIterator (bAncestory.size ()); ; ) {
if (aIter.hasPrevious ()) {
a = aIter.previous ();
} else {
return -1;
}if (bIter.hasPrevious ()) {
b = bIter.previous ();
} else {
return 1;
}if (a !== b) {
break;
}}
}var ax = a.getX ();
var ay = a.getY ();
var bx = b.getX ();
var by = b.getY ();
var zOrder = a.getParent ().getComponentZOrder (a) - b.getParent ().getComponentZOrder (b);
if (this.horizontal) {
if (this.leftToRight) {
if (Math.abs (ay - by) < 10) {
return (ax < bx) ? -1 : ((ax > bx) ? 1 : zOrder);
} else {
return (ay < by) ? -1 : 1;
}} else {
if (Math.abs (ay - by) < 10) {
return (ax > bx) ? -1 : ((ax < bx) ? 1 : zOrder);
} else {
return (ay < by) ? -1 : 1;
}}} else {
if (this.leftToRight) {
if (Math.abs (ax - bx) < 10) {
return (ay < by) ? -1 : ((ay > by) ? 1 : zOrder);
} else {
return (ax < bx) ? -1 : 1;
}} else {
if (Math.abs (ax - bx) < 10) {
return (ay < by) ? -1 : ((ay > by) ? 1 : zOrder);
} else {
return (ax > bx) ? -1 : 1;
}}}}, "~O,~O");
Clazz.defineStatics (c$,
"ROW_TOLERANCE", 10);
});
