Clazz.declarePackage ("org.uwi");
Clazz.load (["javax.swing.JPanel"], "org.uwi.BoltzCanvas", ["java.awt.Color", "$.Point", "$.Rectangle"], function () {
c$ = Clazz.decorateAsClass (function () {
this.maxEnergy = 0;
this.energyLevels = null;
this.xFactor = 0;
this.boltzmann = null;
Clazz.instantialize (this, arguments);
}, org.uwi, "BoltzCanvas", javax.swing.JPanel);
Clazz.makeConstructor (c$, 
function (boltzmann) {
Clazz.superConstructor (this, org.uwi.BoltzCanvas);
this.boltzmann = boltzmann;
}, "org.uwi.Boltzmann");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
g.setColor (this.getForeground ());
g.setPaintMode ();
this.displayBoltz (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "displayBoltz", 
function (g) {
var i;
org.uwi.BoltzCanvas.nPaint++;
var r = this.getBounds ();
g.setColor (java.awt.Color.black);
g.drawString ("A Boltzmann Simulation (" + (this.boltzmann.ShowText.levelInfo.length () == 0 ? (this.boltzmann.maxCollisions - this.boltzmann.numOfCollisions) : this.boltzmann.maxCollisions) + ")", r.x + 110, r.y + 10);
g.drawString ("E", r.x + 5, r.y + 145);
g.drawString ("No. of Particles", r.x + 110, r.y + 286);
var graphRec =  new java.awt.Rectangle (r.x + 20, r.y + 20, r.width - 40, r.height - 40);
g.clearRect (graphRec.x - 1, graphRec.y - 1, graphRec.width + 3, graphRec.height + 2);
g.drawRect (graphRec.x - 2, graphRec.y - 2, graphRec.width + 4, graphRec.height + 3);
var bottomRight =  new java.awt.Point (graphRec.x + graphRec.width, graphRec.y + graphRec.height);
for (i = this.maxEnergy; i > 0; i--) {
if (this.energyLevels[i] >= 1) break;
this.maxEnergy--;
}
this.xFactor = 0;
for (i = 1; i <= (this.maxEnergy); i++) {
if (this.energyLevels[i] > this.xFactor) {
this.xFactor = this.energyLevels[i];
if (i == this.maxEnergy) this.maxEnergy = 2 * this.maxEnergy;
}}
var xScale = (graphRec.width) / this.xFactor;
var yScale = (graphRec.height) / (this.maxEnergy + 1);
g.setColor (java.awt.Color.red);
var curY = 0;
for (i = 0; i <= this.maxEnergy; i++) {
curY = (bottomRight.y - 1) - (Clazz.doubleToInt (yScale * (i + 1)));
if (this.energyLevels[i] > 0) {
var isMax = (this.energyLevels[i] == this.xFactor);
if (isMax) g.setColor (java.awt.Color.BLUE);
g.drawLine (graphRec.x, curY, graphRec.x + (Clazz.doubleToInt (xScale * this.energyLevels[i])), curY);
if (isMax) g.setColor (java.awt.Color.RED);
}}
}, "java.awt.Graphics");
Clazz.defineStatics (c$,
"nPaint", 0);
});
