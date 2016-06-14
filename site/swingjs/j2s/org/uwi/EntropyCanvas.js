Clazz.declarePackage ("org.uwi");
Clazz.load (["javax.swing.JPanel"], "org.uwi.EntropyCanvas", ["java.awt.Color", "$.Point"], function () {
c$ = Clazz.decorateAsClass (function () {
this.Entropy = null;
this.EntropyCalc = 0;
this.entCounter = 0;
Clazz.instantialize (this, arguments);
}, org.uwi, "EntropyCanvas", javax.swing.JPanel);
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
g.setColor (java.awt.Color.blue);
var dim = this.getSize ();
var xScale = Clazz.doubleToInt (dim.width / this.EntropyCalc);
var yScale = (dim.height - 20) / (org.uwi.EntropyCanvas.eMax + 10);
var start =  new java.awt.Point ();
start.x = 0;
start.y = dim.height;
for (var i = 0; i < this.entCounter; i++) {
var x = Clazz.doubleToInt (Math.floor (i * xScale));
var y = dim.height - (Clazz.doubleToInt (Math.floor (this.Entropy[i] * yScale)));
g.drawLine (start.x, start.y, x, y);
start.x = x;
start.y = y;
}
}, "java.awt.Graphics");
Clazz.defineStatics (c$,
"eMax", 65000);
});
