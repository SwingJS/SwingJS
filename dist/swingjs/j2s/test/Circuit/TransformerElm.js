Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.TransformerElm", ["java.awt.Checkbox", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.inductance = 0;
this.ratio = 0;
this.couplingCoef = 0;
this.ptEnds = null;
this.ptCoil = null;
this.ptCore = null;
this.$current = null;
this.$curcount = null;
this.width = 0;
this.a1 = 0;
this.a2 = 0;
this.a3 = 0;
this.a4 = 0;
this.curSourceValue1 = 0;
this.curSourceValue2 = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "TransformerElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.TransformerElm, [xx, yy]);
this.inductance = 4;
this.ratio = 1;
this.width = 32;
this.noDiagonal = true;
this.couplingCoef = .999;
this.$current =  Clazz.newDoubleArray (2, 0);
this.$curcount =  Clazz.newDoubleArray (2, 0);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.TransformerElm, [xa, ya, xb, yb, f]);
this.width = test.Circuit.CircuitElm.max (32, test.Circuit.CircuitElm.abs (yb - ya));
this.inductance =  new Double (st.nextToken ()).doubleValue ();
this.ratio =  new Double (st.nextToken ()).doubleValue ();
this.$current =  Clazz.newDoubleArray (2, 0);
this.$curcount =  Clazz.newDoubleArray (2, 0);
this.$current[0] =  new Double (st.nextToken ()).doubleValue ();
this.$current[1] =  new Double (st.nextToken ()).doubleValue ();
this.couplingCoef = .999;
try {
this.couplingCoef =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.noDiagonal = true;
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "drag", 
function (xx, yy) {
xx = test.Circuit.CircuitElm.sim.snapGrid (xx);
yy = test.Circuit.CircuitElm.sim.snapGrid (yy);
this.width = test.Circuit.CircuitElm.max (32, test.Circuit.CircuitElm.abs (yy - this.y));
if (xx == this.x) yy = this.y;
this.x2 = xx;
this.y2 = yy;
this.setPoints ();
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'T';
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.TransformerElm, "dump", []) + " " + this.inductance + " " + this.ratio + " " + this.$current[0] + " " + this.$current[1] + " " + this.couplingCoef;
});
Clazz.defineMethod (c$, "isTrapezoidal", 
function () {
return (this.flags & 2) == 0;
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var i;
for (i = 0; i != 4; i++) {
this.setVoltageColor (g, this.volts[i]);
test.Circuit.CircuitElm.drawThickLine (g, this.ptEnds[i], this.ptCoil[i]);
}
for (i = 0; i != 2; i++) {
this.setPowerColor (g, this.$current[i] * (this.volts[i] - this.volts[i + 2]));
this.drawCoil (g, this.dsign * (i == 1 ? -6 : 6), this.ptCoil[i], this.ptCoil[i + 2], this.volts[i], this.volts[i + 2]);
}
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.lightGrayColor);
for (i = 0; i != 2; i++) {
test.Circuit.CircuitElm.drawThickLine (g, this.ptCore[i], this.ptCore[i + 2]);
this.$curcount[i] = this.updateDotCount (this.$current[i], this.$curcount[i]);
}
for (i = 0; i != 2; i++) {
this.drawDots (g, this.ptEnds[i], this.ptCoil[i], this.$curcount[i]);
this.drawDots (g, this.ptCoil[i], this.ptCoil[i + 2], this.$curcount[i]);
this.drawDots (g, this.ptEnds[i + 2], this.ptCoil[i + 2], -this.$curcount[i]);
}
this.drawPosts (g);
this.setBbox (this.ptEnds[0], this.ptEnds[3], 0);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.TransformerElm, "setPoints", []);
this.point2.y = this.point1.y;
this.ptEnds = this.newPointArray (4);
this.ptCoil = this.newPointArray (4);
this.ptCore = this.newPointArray (4);
this.ptEnds[0] = this.point1;
this.ptEnds[1] = this.point2;
this.interpPoint (this.point1, this.point2, this.ptEnds[2], 0, -this.dsign * this.width);
this.interpPoint (this.point1, this.point2, this.ptEnds[3], 1, -this.dsign * this.width);
var ce = .5 - 12 / this.dn;
var cd = .5 - 2 / this.dn;
var i;
for (i = 0; i != 4; i += 2) {
this.interpPoint (this.ptEnds[i], this.ptEnds[i + 1], this.ptCoil[i], ce);
this.interpPoint (this.ptEnds[i], this.ptEnds[i + 1], this.ptCoil[i + 1], 1 - ce);
this.interpPoint (this.ptEnds[i], this.ptEnds[i + 1], this.ptCore[i], cd);
this.interpPoint (this.ptEnds[i], this.ptEnds[i + 1], this.ptCore[i + 1], 1 - cd);
}
});
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return this.ptEnds[n];
}, "~N");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 4;
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.$current[0] = this.$current[1] = this.volts[0] = this.volts[1] = this.volts[2] = this.volts[3] = this.$curcount[0] = this.$curcount[1] = 0;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
var l1 = this.inductance;
var l2 = this.inductance * this.ratio * this.ratio;
var m = this.couplingCoef * Math.sqrt (l1 * l2);
var deti = 1 / (l1 * l2 - m * m);
var ts = this.isTrapezoidal () ? test.Circuit.CircuitElm.sim.timeStep / 2 : test.Circuit.CircuitElm.sim.timeStep;
this.a1 = l2 * deti * ts;
this.a2 = -m * deti * ts;
this.a3 = -m * deti * ts;
this.a4 = l1 * deti * ts;
test.Circuit.CircuitElm.sim.stampConductance (this.nodes[0], this.nodes[2], this.a1);
test.Circuit.CircuitElm.sim.stampVCCurrentSource (this.nodes[0], this.nodes[2], this.nodes[1], this.nodes[3], this.a2);
test.Circuit.CircuitElm.sim.stampVCCurrentSource (this.nodes[1], this.nodes[3], this.nodes[0], this.nodes[2], this.a3);
test.Circuit.CircuitElm.sim.stampConductance (this.nodes[1], this.nodes[3], this.a4);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[1]);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[2]);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[3]);
});
Clazz.overrideMethod (c$, "startIteration", 
function () {
var voltdiff1 = this.volts[0] - this.volts[2];
var voltdiff2 = this.volts[1] - this.volts[3];
if (this.isTrapezoidal ()) {
this.curSourceValue1 = voltdiff1 * this.a1 + voltdiff2 * this.a2 + this.$current[0];
this.curSourceValue2 = voltdiff1 * this.a3 + voltdiff2 * this.a4 + this.$current[1];
} else {
this.curSourceValue1 = this.$current[0];
this.curSourceValue2 = this.$current[1];
}});
Clazz.overrideMethod (c$, "doStep", 
function () {
test.Circuit.CircuitElm.sim.stampCurrentSource (this.nodes[0], this.nodes[2], this.curSourceValue1);
test.Circuit.CircuitElm.sim.stampCurrentSource (this.nodes[1], this.nodes[3], this.curSourceValue2);
});
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
var voltdiff1 = this.volts[0] - this.volts[2];
var voltdiff2 = this.volts[1] - this.volts[3];
this.$current[0] = voltdiff1 * this.a1 + voltdiff2 * this.a2 + this.curSourceValue1;
this.$current[1] = voltdiff1 * this.a3 + voltdiff2 * this.a4 + this.curSourceValue2;
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "transformer";
arr[1] = "L = " + test.Circuit.CircuitElm.getUnitText (this.inductance, "H");
arr[2] = "Ratio = 1:" + this.ratio;
arr[3] = "Vd1 = " + test.Circuit.CircuitElm.getVoltageText (this.volts[0] - this.volts[2]);
arr[4] = "Vd2 = " + test.Circuit.CircuitElm.getVoltageText (this.volts[1] - this.volts[3]);
arr[5] = "I1 = " + test.Circuit.CircuitElm.getCurrentText (this.$current[0]);
arr[6] = "I2 = " + test.Circuit.CircuitElm.getCurrentText (this.$current[1]);
}, "~A");
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
if (this.comparePair (n1, n2, 0, 2)) return true;
if (this.comparePair (n1, n2, 1, 3)) return true;
return false;
}, "~N,~N");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Primary Inductance (H)", this.inductance, .01, 5);
if (n == 1) return  new test.Circuit.EditInfo ("Ratio", this.ratio, 1, 10).setDimensionless ();
if (n == 2) return  new test.Circuit.EditInfo ("Coupling Coefficient", this.couplingCoef, 0, 1).setDimensionless ();
if (n == 3) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Trapezoidal Approximation", this.isTrapezoidal ());
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.inductance = ei.value;
if (n == 1) this.ratio = ei.value;
if (n == 2 && ei.value > 0 && ei.value < 1) this.couplingCoef = ei.value;
if (n == 3) {
if (ei.checkbox.getState ()) this.flags &= -3;
 else this.flags |= 2;
}}, "~N,test.Circuit.EditInfo");
Clazz.defineStatics (c$,
"FLAG_BACK_EULER", 2);
});
