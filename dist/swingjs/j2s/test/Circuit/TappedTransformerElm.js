Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.TappedTransformerElm", ["java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.inductance = 0;
this.ratio = 0;
this.ptEnds = null;
this.ptCoil = null;
this.ptCore = null;
this.$current = null;
this.$curcount = null;
this.a = null;
this.curSourceValue = null;
this.voltdiff = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "TappedTransformerElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.TappedTransformerElm, [xx, yy]);
this.inductance = 4;
this.ratio = 1;
this.noDiagonal = true;
this.$current =  Clazz.newDoubleArray (4, 0);
this.$curcount =  Clazz.newDoubleArray (4, 0);
this.voltdiff =  Clazz.newDoubleArray (3, 0);
this.curSourceValue =  Clazz.newDoubleArray (3, 0);
this.a =  Clazz.newDoubleArray (9, 0);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.TappedTransformerElm, [xa, ya, xb, yb, f]);
this.inductance =  new Double (st.nextToken ()).doubleValue ();
this.ratio =  new Double (st.nextToken ()).doubleValue ();
this.$current =  Clazz.newDoubleArray (4, 0);
this.$curcount =  Clazz.newDoubleArray (4, 0);
this.$current[0] =  new Double (st.nextToken ()).doubleValue ();
this.$current[1] =  new Double (st.nextToken ()).doubleValue ();
try {
this.$current[2] =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.voltdiff =  Clazz.newDoubleArray (3, 0);
this.curSourceValue =  Clazz.newDoubleArray (3, 0);
this.noDiagonal = true;
this.a =  Clazz.newDoubleArray (9, 0);
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 169;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.TappedTransformerElm, "dump", []) + " " + this.inductance + " " + this.ratio + " " + this.$current[0] + " " + this.$current[1] + " " + this.$current[2];
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var i;
for (i = 0; i != 5; i++) {
this.setVoltageColor (g, this.volts[i]);
test.Circuit.CircuitElm.drawThickLine (g, this.ptEnds[i], this.ptCoil[i]);
}
for (i = 0; i != 4; i++) {
if (i == 1) continue;
this.setPowerColor (g, this.$current[i] * (this.volts[i] - this.volts[i + 1]));
this.drawCoil (g, i > 1 ? -6 : 6, this.ptCoil[i], this.ptCoil[i + 1], this.volts[i], this.volts[i + 1]);
}
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.lightGrayColor);
for (i = 0; i != 4; i += 2) {
test.Circuit.CircuitElm.drawThickLine (g, this.ptCore[i], this.ptCore[i + 1]);
}
this.$current[3] = this.$current[1] - this.$current[2];
for (i = 0; i != 4; i++) this.$curcount[i] = this.updateDotCount (this.$current[i], this.$curcount[i]);

this.drawDots (g, this.ptEnds[0], this.ptCoil[0], this.$curcount[0]);
this.drawDots (g, this.ptCoil[0], this.ptCoil[1], this.$curcount[0]);
this.drawDots (g, this.ptCoil[1], this.ptEnds[1], this.$curcount[0]);
this.drawDots (g, this.ptEnds[2], this.ptCoil[2], this.$curcount[1]);
this.drawDots (g, this.ptCoil[2], this.ptCoil[3], this.$curcount[1]);
this.drawDots (g, this.ptCoil[3], this.ptEnds[3], this.$curcount[3]);
this.drawDots (g, this.ptCoil[3], this.ptCoil[4], this.$curcount[2]);
this.drawDots (g, this.ptCoil[4], this.ptEnds[4], this.$curcount[2]);
this.drawPosts (g);
this.setBbox (this.ptEnds[0], this.ptEnds[4], 0);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.TappedTransformerElm, "setPoints", []);
var hs = 32;
this.ptEnds = this.newPointArray (5);
this.ptCoil = this.newPointArray (5);
this.ptCore = this.newPointArray (4);
this.ptEnds[0] = this.point1;
this.ptEnds[2] = this.point2;
this.interpPoint (this.point1, this.point2, this.ptEnds[1], 0, -hs * 2);
this.interpPoint (this.point1, this.point2, this.ptEnds[3], 1, -hs);
this.interpPoint (this.point1, this.point2, this.ptEnds[4], 1, -hs * 2);
var ce = .5 - 12 / this.dn;
var cd = .5 - 2 / this.dn;
var i;
this.interpPoint (this.ptEnds[0], this.ptEnds[2], this.ptCoil[0], ce);
this.interpPoint (this.ptEnds[0], this.ptEnds[2], this.ptCoil[1], ce, -hs * 2);
this.interpPoint (this.ptEnds[0], this.ptEnds[2], this.ptCoil[2], 1 - ce);
this.interpPoint (this.ptEnds[0], this.ptEnds[2], this.ptCoil[3], 1 - ce, -hs);
this.interpPoint (this.ptEnds[0], this.ptEnds[2], this.ptCoil[4], 1 - ce, -hs * 2);
for (i = 0; i != 2; i++) {
var b = -hs * i * 2;
this.interpPoint (this.ptEnds[0], this.ptEnds[2], this.ptCore[i], cd, b);
this.interpPoint (this.ptEnds[0], this.ptEnds[2], this.ptCore[i + 2], 1 - cd, b);
}
});
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return this.ptEnds[n];
}, "~N");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 5;
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.$current[0] = this.$current[1] = this.volts[0] = this.volts[1] = this.volts[2] = this.volts[3] = this.$curcount[0] = this.$curcount[1] = 0;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
var l1 = this.inductance;
var l2 = this.inductance * this.ratio * this.ratio / 4;
var cc = .99;
this.a[0] = (1 + cc) / (l1 * (1 + cc - 2 * cc * cc));
this.a[1] = this.a[2] = this.a[3] = this.a[6] = 2 * cc / ((2 * cc * cc - cc - 1) * this.inductance * this.ratio);
this.a[4] = this.a[8] = -4 * (1 + cc) / ((2 * cc * cc - cc - 1) * l1 * this.ratio * this.ratio);
this.a[5] = this.a[7] = 4 * cc / ((2 * cc * cc - cc - 1) * l1 * this.ratio * this.ratio);
var i;
for (i = 0; i != 9; i++) this.a[i] *= test.Circuit.CircuitElm.sim.timeStep / 2;

test.Circuit.CircuitElm.sim.stampConductance (this.nodes[0], this.nodes[1], this.a[0]);
test.Circuit.CircuitElm.sim.stampVCCurrentSource (this.nodes[0], this.nodes[1], this.nodes[2], this.nodes[3], this.a[1]);
test.Circuit.CircuitElm.sim.stampVCCurrentSource (this.nodes[0], this.nodes[1], this.nodes[3], this.nodes[4], this.a[2]);
test.Circuit.CircuitElm.sim.stampVCCurrentSource (this.nodes[2], this.nodes[3], this.nodes[0], this.nodes[1], this.a[3]);
test.Circuit.CircuitElm.sim.stampConductance (this.nodes[2], this.nodes[3], this.a[4]);
test.Circuit.CircuitElm.sim.stampVCCurrentSource (this.nodes[2], this.nodes[3], this.nodes[3], this.nodes[4], this.a[5]);
test.Circuit.CircuitElm.sim.stampVCCurrentSource (this.nodes[3], this.nodes[4], this.nodes[0], this.nodes[1], this.a[6]);
test.Circuit.CircuitElm.sim.stampVCCurrentSource (this.nodes[3], this.nodes[4], this.nodes[2], this.nodes[3], this.a[7]);
test.Circuit.CircuitElm.sim.stampConductance (this.nodes[3], this.nodes[4], this.a[8]);
for (i = 0; i != 5; i++) test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[i]);

});
Clazz.overrideMethod (c$, "startIteration", 
function () {
this.voltdiff[0] = this.volts[0] - this.volts[1];
this.voltdiff[1] = this.volts[2] - this.volts[3];
this.voltdiff[2] = this.volts[3] - this.volts[4];
var i;
var j;
for (i = 0; i != 3; i++) {
this.curSourceValue[i] = this.$current[i];
for (j = 0; j != 3; j++) this.curSourceValue[i] += this.a[i * 3 + j] * this.voltdiff[j];

}
});
Clazz.overrideMethod (c$, "doStep", 
function () {
test.Circuit.CircuitElm.sim.stampCurrentSource (this.nodes[0], this.nodes[1], this.curSourceValue[0]);
test.Circuit.CircuitElm.sim.stampCurrentSource (this.nodes[2], this.nodes[3], this.curSourceValue[1]);
test.Circuit.CircuitElm.sim.stampCurrentSource (this.nodes[3], this.nodes[4], this.curSourceValue[2]);
});
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
this.voltdiff[0] = this.volts[0] - this.volts[1];
this.voltdiff[1] = this.volts[2] - this.volts[3];
this.voltdiff[2] = this.volts[3] - this.volts[4];
var i;
var j;
for (i = 0; i != 3; i++) {
this.$current[i] = this.curSourceValue[i];
for (j = 0; j != 3; j++) this.$current[i] += this.a[i * 3 + j] * this.voltdiff[j];

}
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "transformer";
arr[1] = "L = " + test.Circuit.CircuitElm.getUnitText (this.inductance, "H");
arr[2] = "Ratio = " + this.ratio;
arr[3] = "Vd1 = " + test.Circuit.CircuitElm.getVoltageText (this.volts[0] - this.volts[2]);
arr[4] = "Vd2 = " + test.Circuit.CircuitElm.getVoltageText (this.volts[1] - this.volts[3]);
}, "~A");
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
if (this.comparePair (n1, n2, 0, 1)) return true;
if (this.comparePair (n1, n2, 2, 3)) return true;
if (this.comparePair (n1, n2, 3, 4)) return true;
if (this.comparePair (n1, n2, 2, 4)) return true;
return false;
}, "~N,~N");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Primary Inductance (H)", this.inductance, .01, 5);
if (n == 1) return  new test.Circuit.EditInfo ("Ratio", this.ratio, 1, 10).setDimensionless ();
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.inductance = ei.value;
if (n == 1) this.ratio = ei.value;
}, "~N,test.Circuit.EditInfo");
});
