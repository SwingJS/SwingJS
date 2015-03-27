Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.FieldView"], "jsjavax.swing.text.PasswordView", ["jsjava.awt.Rectangle", "jsjavax.swing.JPasswordField", "jsjavax.swing.text.Position"], function () {
c$ = Clazz.declareType (jsjavax.swing.text, "PasswordView", jsjavax.swing.text.FieldView);
Clazz.defineMethod (c$, "modelToView", 
function (pos, a, b) {
var c = this.getContainer ();
if (Clazz.instanceOf (c, jsjavax.swing.JPasswordField)) {
var f = c;
if (!f.echoCharIsSet ()) {
return Clazz.superCall (this, jsjavax.swing.text.PasswordView, "modelToView", [pos, a, b]);
}var echoChar = f.getEchoChar ();
var m = f.getFontMetrics (f.getFont ());
var alloc = this.adjustAllocation (a).getBounds ();
var dx = (pos - this.getStartOffset ()) * m.charWidth (echoChar);
alloc.x += dx;
alloc.width = 1;
return alloc;
}return null;
}, "~N,jsjava.awt.Shape,jsjavax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "viewToModel", 
function (fx, fy, a, bias) {
bias[0] = jsjavax.swing.text.Position.Bias.Forward;
var n = 0;
var c = this.getContainer ();
if (Clazz.instanceOf (c, jsjavax.swing.JPasswordField)) {
var f = c;
if (!f.echoCharIsSet ()) {
return Clazz.superCall (this, jsjavax.swing.text.PasswordView, "viewToModel", [fx, fy, a, bias]);
}var echoChar = f.getEchoChar ();
var charWidth = f.getFontMetrics (f.getFont ()).charWidth (echoChar);
a = this.adjustAllocation (a);
var alloc = (Clazz.instanceOf (a, jsjava.awt.Rectangle)) ? a : a.getBounds ();
n = (charWidth > 0 ? Clazz.doubleToInt ((Clazz.floatToInt (fx) - alloc.x) / charWidth) : 2147483647);
if (n < 0) {
n = 0;
} else if (n > (this.getStartOffset () + this.getDocument ().getLength ())) {
n = this.getDocument ().getLength () - this.getStartOffset ();
}}return this.getStartOffset () + n;
}, "~N,~N,jsjava.awt.Shape,~A");
Clazz.defineMethod (c$, "getPreferredSpan", 
function (axis) {
switch (axis) {
case 0:
var c = this.getContainer ();
if (Clazz.instanceOf (c, jsjavax.swing.JPasswordField)) {
var f = c;
if (f.echoCharIsSet ()) {
var echoChar = f.getEchoChar ();
var m = f.getFontMetrics (f.getFont ());
return m.charWidth (echoChar) * this.getDocument ().getLength ();
}}}
return Clazz.superCall (this, jsjavax.swing.text.PasswordView, "getPreferredSpan", [axis]);
}, "~N");
Clazz.defineStatics (c$,
"ONE",  Clazz.newCharArray (1, '\0'));
});
