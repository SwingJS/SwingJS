Clazz.declarePackage ("test.Circuit");
Clazz.load (["java.awt.Canvas"], "test.Circuit.CircuitCanvas", ["java.awt.Dimension"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "CircuitCanvas", java.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.Circuit.CircuitCanvas, []);
this.pg = p;
}, "test.Circuit.CirSim");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateCircuit (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paint", 
function (g) {
this.pg.updateCircuit (g);
}, "java.awt.Graphics");
});
