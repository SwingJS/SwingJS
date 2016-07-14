Clazz.declarePackage ("test.ultrastudio");
Clazz.load (["javax.swing.JComponent", "java.awt.BasicStroke", "$.Point"], "test.ultrastudio.Prism", ["java.awt.Color", "java.lang.Double"], function () {
c$ = Clazz.decorateAsClass (function () {
this.A = null;
this.AH = null;
this.B1 = null;
this.B2 = null;
this.E = null;
this.O = null;
this.h = 0;
this.l = 0;
this.rayEntry = 0;
this.n = 1.6;
this.rayStroke = null;
this.simpleStroke = null;
Clazz.instantialize (this, arguments);
}, test.ultrastudio, "Prism", javax.swing.JComponent);
Clazz.prepareFields (c$, function () {
this.A =  new java.awt.Point ();
this.AH =  new java.awt.Point ();
this.B1 =  new java.awt.Point ();
this.B2 =  new java.awt.Point ();
this.E =  new java.awt.Point ();
this.O =  new java.awt.Point ();
this.rayStroke =  new java.awt.BasicStroke (3);
});
Clazz.defineMethod (c$, "dev", 
function (a1) {
return a1 + this.a2 (a1) - test.ultrastudio.Prism.AA;
}, "~N");
Clazz.defineMethod (c$, "a2", 
function (a1) {
var v = Math.asin (this.n * Math.sin (test.ultrastudio.Prism.AA - Math.asin (Math.sin (a1) / this.n)));
return v;
}, "~N");
Clazz.defineMethod (c$, "beta1", 
function (a1) {
return Math.asin (Math.sin (a1) / this.n);
}, "~N");
Clazz.defineMethod (c$, "delta1", 
function (a1) {
return a1 - this.beta1 (a1);
}, "~N");
Clazz.defineMethod (c$, "setRayEntry", 
function (rayEntry) {
this.rayEntry = rayEntry;
this.repaint ();
}, "~N");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.ultrastudio.Prism, []);
this.setOpaque (true);
});
Clazz.overrideMethod (c$, "paintComponent", 
function (gg) {
var g = gg;
this.simpleStroke = g.getStroke ();
g.setColor (java.awt.Color.WHITE);
var width = this.getWidth ();
var height = this.getHeight ();
g.fillRect (0, 0, width, height);
this.A.x = Clazz.doubleToInt (width / 2);
this.A.y = 0;
this.h = height;
this.AH.x = this.A.x;
this.AH.y = this.h;
this.l = Clazz.doubleToInt (this.h * test.ultrastudio.Prism.TAN_30);
this.B1.x = this.AH.x - this.l;
this.B2.x = this.AH.x + this.l;
this.B1.y = this.B2.y = this.h;
this.E.x = Clazz.doubleToInt ((this.B1.x + this.A.x) / 2);
this.E.y = Clazz.doubleToInt ((this.B1.y + this.A.y) / 2);
this.O.x = Clazz.doubleToInt ((this.B2.x + this.A.x) / 2);
this.O.y = Clazz.doubleToInt ((this.B2.y + this.A.y) / 2);
var ex = [this.B1.x, this.A.x, this.B2.x];
var ey = [this.B1.y, this.A.y, this.B2.y];
g.setColor ( new java.awt.Color (255, 255, Clazz.doubleToInt (255 * (2.0 - this.n))));
g.fillPolygon (ex, ey, 3);
g.setColor (java.awt.Color.YELLOW.darker ());
g.setStroke (this.rayStroke);
g.drawPolygon (ex, ey, 3);
g.setStroke (this.simpleStroke);
g.setColor (java.awt.Color.GREEN);
this.line (g, this.E, this.B2);
var ggg = g.create ();
ggg.setStroke (this.rayStroke);
ggg.rotate (Math.toRadians (-this.rayEntry) + test.ultrastudio.Prism.AA / 2, this.E.x, this.E.y);
ggg.setColor (java.awt.Color.RED);
ggg.drawLine (this.E.x, this.E.y, this.E.x - 100, this.E.y);
ggg.setStroke (this.simpleStroke);
ggg.setColor (java.awt.Color.ORANGE);
ggg.drawLine (this.E.x, this.E.y, this.E.x + 100 + width, this.E.y);
var a1 = Math.toRadians (this.rayEntry);
var dev = this.delta1 (a1);
var a2 = this.a2 (a1);
var t1 = 1.5707963267948966 - this.beta1 (a1);
var t2 = 1.5707963267948966 - (test.ultrastudio.Prism.AA - this.beta1 (a1));
var ab = this.E.distance (this.A);
var ad = Math.sin (t1) * ab / Math.sin (t2);
this.O.x = this.A.x + Clazz.doubleToInt (ad * Math.sin (test.ultrastudio.Prism.AA / 2));
this.O.y = this.A.y + Clazz.doubleToInt (ad * Math.cos (test.ultrastudio.Prism.AA / 2));
ggg.dispose ();
ggg = g.create ();
ggg.setColor (java.awt.Color.RED);
if (!Double.isNaN (a2)) {
ggg.rotate (a2 - test.ultrastudio.Prism.AA / 2, this.O.x, this.O.y);
ggg.drawLine (this.O.x, this.O.y, this.O.x - 200, this.O.y);
}ggg.dispose ();
ggg = g.create ();
ggg.setColor (java.awt.Color.RED);
ggg.setStroke (this.rayStroke);
this.line (ggg, this.E, this.O);
if (!Double.isNaN (a2)) {
ggg.rotate (a2 - test.ultrastudio.Prism.AA / 2, this.O.x, this.O.y);
ggg.drawLine (this.O.x, this.O.y, this.O.x + 100, this.O.y);
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "line", 
 function (g, a, b) {
g.drawLine (a.x, a.y, b.x, b.y);
}, "java.awt.Graphics2D,java.awt.Point,java.awt.Point");
Clazz.defineMethod (c$, "setDensity", 
function (n2) {
this.n = n2;
this.repaint ();
}, "~N");
c$.TAN_30 = c$.prototype.TAN_30 = Math.tan (Math.toRadians (30));
c$.AA = c$.prototype.AA = Math.toRadians (60);
});
