Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.Editable"], "test.Circuit.EditOptions", ["test.Circuit.CircuitElm", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.sim = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "EditOptions", null, test.Circuit.Editable);
Clazz.makeConstructor (c$, 
function (s) {
this.sim = s;
}, "test.Circuit.CirSim");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Time step size (s)", this.sim.timeStep, 0, 0);
if (n == 1) return  new test.Circuit.EditInfo ("Range for voltage color (V)", test.Circuit.CircuitElm.voltageRange, 0, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0 && ei.value > 0) this.sim.timeStep = ei.value;
if (n == 1 && ei.value > 0) test.Circuit.CircuitElm.voltageRange = ei.value;
}, "~N,test.Circuit.EditInfo");
});
