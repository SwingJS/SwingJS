Clazz.declarePackage ("test.Circuit");
c$ = Clazz.decorateAsClass (function () {
this.nodes = null;
this.flags = 0;
this.sim = null;
this.inductance = 0;
this.compResistance = 0;
this.current = 0;
this.curSourceValue = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "Inductor");
Clazz.makeConstructor (c$, 
function (s) {
this.sim = s;
this.nodes =  Clazz.newIntArray (2, 0);
}, "test.Circuit.CirSim");
Clazz.defineMethod (c$, "setup", 
function (ic, cr, f) {
this.inductance = ic;
this.current = cr;
this.flags = f;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "isTrapezoidal", 
function () {
return (this.flags & 2) == 0;
});
Clazz.defineMethod (c$, "reset", 
function () {
this.current = 0;
});
Clazz.defineMethod (c$, "stamp", 
function (n0, n1) {
this.nodes[0] = n0;
this.nodes[1] = n1;
if (this.isTrapezoidal ()) this.compResistance = 2 * this.inductance / this.sim.timeStep;
 else this.compResistance = this.inductance / this.sim.timeStep;
this.sim.stampResistor (this.nodes[0], this.nodes[1], this.compResistance);
this.sim.stampRightSide (this.nodes[0]);
this.sim.stampRightSide (this.nodes[1]);
}, "~N,~N");
Clazz.defineMethod (c$, "nonLinear", 
function () {
return false;
});
Clazz.defineMethod (c$, "startIteration", 
function (voltdiff) {
if (this.isTrapezoidal ()) this.curSourceValue = voltdiff / this.compResistance + this.current;
 else this.curSourceValue = this.current;
}, "~N");
Clazz.defineMethod (c$, "calculateCurrent", 
function (voltdiff) {
if (this.compResistance > 0) this.current = voltdiff / this.compResistance + this.curSourceValue;
return this.current;
}, "~N");
Clazz.defineMethod (c$, "doStep", 
function (voltdiff) {
this.sim.stampCurrentSource (this.nodes[0], this.nodes[1], this.curSourceValue);
}, "~N");
Clazz.defineStatics (c$,
"FLAG_BACK_EULER", 2);
