Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.AnalogSwitchElm"], "test.Circuit.AnalogSwitch2Elm", ["test.Circuit.CircuitElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.openhs = 16;
this.swposts = null;
this.swpoles = null;
this.ctlPoint = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "AnalogSwitch2Elm", test.Circuit.AnalogSwitchElm);
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.AnalogSwitch2Elm, "setPoints", []);
this.calcLeads (32);
this.swposts = this.newPointArray (2);
this.swpoles = this.newPointArray (2);
this.interpPoint2 (this.lead1, this.lead2, this.swpoles[0], this.swpoles[1], 1, 16);
this.interpPoint2 (this.point1, this.point2, this.swposts[0], this.swposts[1], 1, 16);
this.ctlPoint = this.interpPoint (this.point1, this.point2, .5, 16);
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 4;
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.point1, this.point2, 16);
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.lead1);
this.setVoltageColor (g, this.volts[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.swpoles[0], this.swposts[0]);
this.setVoltageColor (g, this.volts[2]);
test.Circuit.CircuitElm.drawThickLine (g, this.swpoles[1], this.swposts[1]);
g.setColor (test.Circuit.CircuitElm.lightGrayColor);
var position = (this.open) ? 1 : 0;
test.Circuit.CircuitElm.drawThickLine (g, this.lead1, this.swpoles[position]);
this.updateDotCount ();
this.drawDots (g, this.point1, this.lead1, this.curcount);
this.drawDots (g, this.swpoles[position], this.swposts[position], this.curcount);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return (n == 0) ? this.point1 : (n == 3) ? this.ctlPoint : this.swposts[n - 1];
}, "~N");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 160;
});
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
if (this.open) this.current = (this.volts[0] - this.volts[2]) / this.r_on;
 else this.current = (this.volts[0] - this.volts[1]) / this.r_on;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[2]);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
this.open = (this.volts[3] < 2.5);
if ((this.flags & 1) != 0) this.open = !this.open;
if (this.open) {
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[2], this.r_on);
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[1], this.r_off);
} else {
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[1], this.r_on);
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[2], this.r_off);
}});
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
if (n1 == 3 || n2 == 3) return false;
return true;
}, "~N,~N");
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "analog switch (SPDT)";
arr[1] = "I = " + test.Circuit.CircuitElm.getCurrentDText (this.getCurrent ());
}, "~A");
});
