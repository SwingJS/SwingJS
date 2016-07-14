Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.RelayElm", ["java.awt.Checkbox", "$.Color", "$.Point", "java.lang.Double", "test.Circuit.EditInfo", "$.Inductor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.inductance = 0;
this.ind = null;
this.r_on = 0;
this.r_off = 0;
this.onCurrent = 0;
this.coilPosts = null;
this.coilLeads = null;
this.swposts = null;
this.swpoles = null;
this.ptSwitch = null;
this.lines = null;
this.coilCurrent = 0;
this.switchCurrent = 0;
this.coilCurCount = 0;
this.switchCurCount = 0;
this.d_position = 0;
this.coilR = 0;
this.i_position = 0;
this.poleCount = 0;
this.openhs = 0;
this.nSwitch0 = 0;
this.nSwitch1 = 1;
this.nSwitch2 = 2;
this.nCoil1 = 0;
this.nCoil2 = 0;
this.nCoil3 = 0;
this.FLAG_SWAP_COIL = 1;
this.a1 = 0;
this.a2 = 0;
this.a3 = 0;
this.a4 = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "RelayElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.RelayElm, [xx, yy]);
this.ind =  new test.Circuit.Inductor (test.Circuit.CircuitElm.sim);
this.inductance = .2;
this.ind.setup (this.inductance, 0, 2);
this.noDiagonal = true;
this.onCurrent = .02;
this.r_on = .05;
this.r_off = 1e6;
this.coilR = 20;
this.coilCurrent = this.coilCurCount = 0;
this.poleCount = 1;
this.setupPoles ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.RelayElm, [xa, ya, xb, yb, f]);
this.poleCount =  new Integer (st.nextToken ()).intValue ();
this.inductance =  new Double (st.nextToken ()).doubleValue ();
this.coilCurrent =  new Double (st.nextToken ()).doubleValue ();
this.r_on =  new Double (st.nextToken ()).doubleValue ();
this.r_off =  new Double (st.nextToken ()).doubleValue ();
this.onCurrent =  new Double (st.nextToken ()).doubleValue ();
this.coilR =  new Double (st.nextToken ()).doubleValue ();
this.noDiagonal = true;
this.ind =  new test.Circuit.Inductor (test.Circuit.CircuitElm.sim);
this.ind.setup (this.inductance, this.coilCurrent, 2);
this.setupPoles ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "setupPoles", 
function () {
this.nCoil1 = 3 * this.poleCount;
this.nCoil2 = this.nCoil1 + 1;
this.nCoil3 = this.nCoil1 + 2;
if (this.switchCurrent == null || this.switchCurrent.length != this.poleCount) {
this.switchCurrent =  Clazz.newDoubleArray (this.poleCount, 0);
this.switchCurCount =  Clazz.newDoubleArray (this.poleCount, 0);
}});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 178;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.RelayElm, "dump", []) + " " + this.poleCount + " " + this.inductance + " " + this.coilCurrent + " " + this.r_on + " " + this.r_off + " " + this.onCurrent + " " + this.coilR;
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var i;
var p;
for (i = 0; i != 2; i++) {
this.setVoltageColor (g, this.volts[this.nCoil1 + i]);
test.Circuit.CircuitElm.drawThickLine (g, this.coilLeads[i], this.coilPosts[i]);
}
var x = ((this.flags & 1) != 0) ? 1 : 0;
this.drawCoil (g, this.dsign * 6, this.coilLeads[x], this.coilLeads[1 - x], this.volts[this.nCoil1 + x], this.volts[this.nCoil2 - x]);
g.setColor (java.awt.Color.darkGray);
for (i = 0; i != this.poleCount; i++) {
if (i == 0) this.interpPoint (this.point1, this.point2, this.lines[i * 2], .5, this.openhs * 2 + 5 * this.dsign - i * this.openhs * 3);
 else this.interpPoint (this.point1, this.point2, this.lines[i * 2], .5, Clazz.doubleToInt (this.openhs * (-i * 3 + 3 - .5 + this.d_position)) + 5 * this.dsign);
this.interpPoint (this.point1, this.point2, this.lines[i * 2 + 1], .5, Clazz.doubleToInt (this.openhs * (-i * 3 - .5 + this.d_position)) - 5 * this.dsign);
g.drawLine (this.lines[i * 2].x, this.lines[i * 2].y, this.lines[i * 2 + 1].x, this.lines[i * 2 + 1].y);
}
for (p = 0; p != this.poleCount; p++) {
var po = p * 3;
for (i = 0; i != 3; i++) {
this.setVoltageColor (g, this.volts[0 + po + i]);
test.Circuit.CircuitElm.drawThickLine (g, this.swposts[p][i], this.swpoles[p][i]);
}
this.interpPoint (this.swpoles[p][1], this.swpoles[p][2], this.ptSwitch[p], this.d_position);
g.setColor (java.awt.Color.lightGray);
test.Circuit.CircuitElm.drawThickLine (g, this.swpoles[p][0], this.ptSwitch[p]);
this.switchCurCount[p] = this.updateDotCount (this.switchCurrent[p], this.switchCurCount[p]);
this.drawDots (g, this.swposts[p][0], this.swpoles[p][0], this.switchCurCount[p]);
if (this.i_position != 2) this.drawDots (g, this.swpoles[p][this.i_position + 1], this.swposts[p][this.i_position + 1], this.switchCurCount[p]);
}
this.coilCurCount = this.updateDotCount (this.coilCurrent, this.coilCurCount);
this.drawDots (g, this.coilPosts[0], this.coilLeads[0], this.coilCurCount);
this.drawDots (g, this.coilLeads[0], this.coilLeads[1], this.coilCurCount);
this.drawDots (g, this.coilLeads[1], this.coilPosts[1], this.coilCurCount);
this.drawPosts (g);
this.setBbox (this.coilPosts[0], this.coilLeads[1], 0);
this.adjustBbox (this.swpoles[this.poleCount - 1][0], this.swposts[this.poleCount - 1][1]);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.RelayElm, "setPoints", []);
this.setupPoles ();
this.allocNodes ();
this.openhs = -this.dsign * 16;
this.calcLeads (32);
this.swposts =  Clazz.newArray (this.poleCount, 3, null);
this.swpoles =  Clazz.newArray (this.poleCount, 3, null);
var i;
var j;
for (i = 0; i != this.poleCount; i++) {
for (j = 0; j != 3; j++) {
this.swposts[i][j] =  new java.awt.Point ();
this.swpoles[i][j] =  new java.awt.Point ();
}
this.interpPoint (this.lead1, this.lead2, this.swpoles[i][0], 0, -this.openhs * 3 * i);
this.interpPoint (this.lead1, this.lead2, this.swpoles[i][1], 1, -this.openhs * 3 * i - this.openhs);
this.interpPoint (this.lead1, this.lead2, this.swpoles[i][2], 1, -this.openhs * 3 * i + this.openhs);
this.interpPoint (this.point1, this.point2, this.swposts[i][0], 0, -this.openhs * 3 * i);
this.interpPoint (this.point1, this.point2, this.swposts[i][1], 1, -this.openhs * 3 * i - this.openhs);
this.interpPoint (this.point1, this.point2, this.swposts[i][2], 1, -this.openhs * 3 * i + this.openhs);
}
this.coilPosts = this.newPointArray (2);
this.coilLeads = this.newPointArray (2);
this.ptSwitch = this.newPointArray (this.poleCount);
var x = ((this.flags & 1) != 0) ? 1 : 0;
this.interpPoint (this.point1, this.point2, this.coilPosts[0], x, this.openhs * 2);
this.interpPoint (this.point1, this.point2, this.coilPosts[1], x, this.openhs * 3);
this.interpPoint (this.point1, this.point2, this.coilLeads[0], .5, this.openhs * 2);
this.interpPoint (this.point1, this.point2, this.coilLeads[1], .5, this.openhs * 3);
this.lines = this.newPointArray (this.poleCount * 2);
});
Clazz.overrideMethod (c$, "getPost", 
function (n) {
if (n < 3 * this.poleCount) return this.swposts[Clazz.doubleToInt (n / 3)][n % 3];
return this.coilPosts[n - 3 * this.poleCount];
}, "~N");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 2 + this.poleCount * 3;
});
Clazz.overrideMethod (c$, "getInternalNodeCount", 
function () {
return 1;
});
Clazz.defineMethod (c$, "reset", 
function () {
Clazz.superCall (this, test.Circuit.RelayElm, "reset", []);
this.ind.reset ();
this.coilCurrent = this.coilCurCount = 0;
var i;
for (i = 0; i != this.poleCount; i++) this.switchCurrent[i] = this.switchCurCount[i] = 0;

});
Clazz.overrideMethod (c$, "stamp", 
function () {
this.ind.stamp (this.nodes[this.nCoil1], this.nodes[this.nCoil3]);
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[this.nCoil3], this.nodes[this.nCoil2], this.coilR);
var i;
for (i = 0; i != this.poleCount * 3; i++) test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0 + i]);

});
Clazz.overrideMethod (c$, "startIteration", 
function () {
this.ind.startIteration (this.volts[this.nCoil1] - this.volts[this.nCoil3]);
var magic = 1.3;
var pmult = Math.sqrt (magic + 1);
var p = this.coilCurrent * pmult / this.onCurrent;
this.d_position = Math.abs (p * p) - 1.3;
if (this.d_position < 0) this.d_position = 0;
if (this.d_position > 1) this.d_position = 1;
if (this.d_position < .1) this.i_position = 0;
 else if (this.d_position > .9) this.i_position = 1;
 else this.i_position = 2;
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var voltdiff = this.volts[this.nCoil1] - this.volts[this.nCoil3];
this.ind.doStep (voltdiff);
var p;
for (p = 0; p != this.poleCount * 3; p += 3) {
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0 + p], this.nodes[1 + p], this.i_position == 0 ? this.r_on : this.r_off);
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0 + p], this.nodes[2 + p], this.i_position == 1 ? this.r_on : this.r_off);
}
});
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
var voltdiff = this.volts[this.nCoil1] - this.volts[this.nCoil3];
this.coilCurrent = this.ind.calculateCurrent (voltdiff);
var p;
for (p = 0; p != this.poleCount; p++) {
if (this.i_position == 2) this.switchCurrent[p] = 0;
 else this.switchCurrent[p] = (this.volts[0 + p * 3] - this.volts[1 + p * 3 + this.i_position]) / this.r_on;
}
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = this.i_position == 0 ? "relay (off)" : this.i_position == 1 ? "relay (on)" : "relay";
var i;
var ln = 1;
for (i = 0; i != this.poleCount; i++) arr[ln++] = "I" + (i + 1) + " = " + test.Circuit.CircuitElm.getCurrentDText (this.switchCurrent[i]);

arr[ln++] = "coil I = " + test.Circuit.CircuitElm.getCurrentDText (this.coilCurrent);
arr[ln++] = "coil Vd = " + test.Circuit.CircuitElm.getVoltageDText (this.volts[this.nCoil1] - this.volts[this.nCoil2]);
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Inductance (H)", this.inductance, 0, 0);
if (n == 1) return  new test.Circuit.EditInfo ("On Resistance (ohms)", this.r_on, 0, 0);
if (n == 2) return  new test.Circuit.EditInfo ("Off Resistance (ohms)", this.r_off, 0, 0);
if (n == 3) return  new test.Circuit.EditInfo ("On Current (A)", this.onCurrent, 0, 0);
if (n == 4) return  new test.Circuit.EditInfo ("Number of Poles", this.poleCount, 1, 4).setDimensionless ();
if (n == 5) return  new test.Circuit.EditInfo ("Coil Resistance (ohms)", this.coilR, 0, 0);
if (n == 6) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Swap Coil Direction", (this.flags & 1) != 0);
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0 && ei.value > 0) {
this.inductance = ei.value;
this.ind.setup (this.inductance, this.coilCurrent, 2);
}if (n == 1 && ei.value > 0) this.r_on = ei.value;
if (n == 2 && ei.value > 0) this.r_off = ei.value;
if (n == 3 && ei.value > 0) this.onCurrent = ei.value;
if (n == 4 && ei.value >= 1) {
this.poleCount = Clazz.doubleToInt (ei.value);
this.setPoints ();
}if (n == 5 && ei.value > 0) this.coilR = ei.value;
if (n == 6) {
if (ei.checkbox.getState ()) this.flags |= 1;
 else this.flags &= -2;
this.setPoints ();
}}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
return (Clazz.doubleToInt (n1 / 3) == Clazz.doubleToInt (n2 / 3));
}, "~N,~N");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'R';
});
});
