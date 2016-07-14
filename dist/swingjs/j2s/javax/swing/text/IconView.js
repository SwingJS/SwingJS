Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.View"], "javax.swing.text.IconView", ["java.lang.IllegalArgumentException", "javax.swing.text.BadLocationException", "$.Position", "$.StyleConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.c = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "IconView", javax.swing.text.View);
Clazz.makeConstructor (c$, 
function (elem) {
Clazz.superConstructor (this, javax.swing.text.IconView, [elem]);
var attr = elem.getAttributes ();
this.c = javax.swing.text.StyleConstants.getIcon (attr);
}, "javax.swing.text.Element");
Clazz.overrideMethod (c$, "paint", 
function (g, a) {
var alloc = a.getBounds ();
this.c.paintIcon (this.getContainer (), g, alloc.x, alloc.y);
}, "java.awt.Graphics,java.awt.Shape");
Clazz.overrideMethod (c$, "getPreferredSpan", 
function (axis) {
switch (axis) {
case 0:
return this.c.getIconWidth ();
case 1:
return this.c.getIconHeight ();
default:
throw  new IllegalArgumentException ("Invalid axis: " + axis);
}
}, "~N");
Clazz.defineMethod (c$, "getAlignment", 
function (axis) {
switch (axis) {
case 1:
return 1;
default:
return Clazz.superCall (this, javax.swing.text.IconView, "getAlignment", [axis]);
}
}, "~N");
Clazz.defineMethod (c$, "modelToView", 
function (pos, a, b) {
var p0 = this.getStartOffset ();
var p1 = this.getEndOffset ();
if ((pos >= p0) && (pos <= p1)) {
var r = a.getBounds ();
if (pos == p1) {
r.x += r.width;
}r.width = 0;
return r;
}throw  new javax.swing.text.BadLocationException (pos + " not in range " + p0 + "," + p1, pos);
}, "~N,java.awt.Shape,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "viewToModel", 
function (x, y, a, bias) {
var alloc = a;
if (x < alloc.x + (Clazz.doubleToInt (alloc.width / 2))) {
bias[0] = javax.swing.text.Position.Bias.Forward;
return this.getStartOffset ();
}bias[0] = javax.swing.text.Position.Bias.Backward;
return this.getEndOffset ();
}, "~N,~N,java.awt.Shape,~A");
});
