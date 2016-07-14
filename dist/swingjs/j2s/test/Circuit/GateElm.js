Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.GateElm", ["java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.FLAG_SMALL = 1;
this.inputCount = 2;
this.lastOutput = false;
this.gsize = 0;
this.gwidth = 0;
this.gwidth2 = 0;
this.gheight = 0;
this.hs2 = 0;
this.inPosts = null;
this.inGates = null;
this.ww = 0;
this.gatePoly = null;
this.pcircle = null;
this.linePoints = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "GateElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.GateElm, [xx, yy]);
this.noDiagonal = true;
this.inputCount = 2;
this.setSize (test.Circuit.CircuitElm.sim.smallGridCheckItem.getState () ? 1 : 2);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.GateElm, [xa, ya, xb, yb, f]);
this.inputCount =  new Integer (st.nextToken ()).intValue ();
this.lastOutput =  new Double (st.nextToken ()).doubleValue () > 2.5;
this.noDiagonal = true;
this.setSize ((f & 1) != 0 ? 1 : 2);
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "isInverting", 
function () {
return false;
});
Clazz.defineMethod (c$, "setSize", 
function (s) {
this.gsize = s;
this.gwidth = 7 * s;
this.gwidth2 = 14 * s;
this.gheight = 8 * s;
this.flags = (s == 1) ? 1 : 0;
}, "~N");
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.GateElm, "dump", []) + " " + this.inputCount + " " + this.volts[this.inputCount];
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.GateElm, "setPoints", []);
if (this.dn > 150 && this === test.Circuit.CircuitElm.sim.dragElm) this.setSize (2);
var hs = this.gheight;
var i;
this.ww = this.gwidth2;
if (this.ww > this.dn / 2) this.ww = Clazz.doubleToInt (this.dn / 2);
if (this.isInverting () && this.ww + 8 > this.dn / 2) this.ww = Clazz.doubleToInt (this.dn / 2 - 8);
this.calcLeads (this.ww * 2);
this.inPosts =  new Array (this.inputCount);
this.inGates =  new Array (this.inputCount);
this.allocNodes ();
var i0 = Clazz.doubleToInt (-this.inputCount / 2);
for (i = 0; i != this.inputCount; i++, i0++) {
if (i0 == 0 && (this.inputCount & 1) == 0) i0++;
this.inPosts[i] = this.interpPoint (this.point1, this.point2, 0, hs * i0);
this.inGates[i] = this.interpPoint (this.lead1, this.lead2, 0, hs * i0);
this.volts[i] = ( new Boolean (this.lastOutput ^ this.isInverting ()).valueOf ()) ? 5 : 0;
}
this.hs2 = this.gwidth * (Clazz.doubleToInt (this.inputCount / 2) + 1);
this.setBbox (this.point1, this.point2, this.hs2);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var i;
for (i = 0; i != this.inputCount; i++) {
this.setVoltageColor (g, this.volts[i]);
test.Circuit.CircuitElm.drawThickLine (g, this.inPosts[i], this.inGates[i]);
}
this.setVoltageColor (g, this.volts[this.inputCount]);
test.Circuit.CircuitElm.drawThickLine (g, this.lead2, this.point2);
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.lightGrayColor);
test.Circuit.CircuitElm.drawThickPolygon (g, this.gatePoly);
if (this.linePoints != null) for (i = 0; i != this.linePoints.length - 1; i++) test.Circuit.CircuitElm.drawThickLine (g, this.linePoints[i], this.linePoints[i + 1]);

if (this.isInverting ()) test.Circuit.CircuitElm.drawThickCircle (g, this.pcircle.x, this.pcircle.y, 3);
this.curcount = this.updateDotCount (this.current, this.curcount);
this.drawDots (g, this.lead2, this.point2, this.curcount);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return this.inputCount + 1;
});
Clazz.overrideMethod (c$, "getPost", 
function (n) {
if (n == this.inputCount) return this.point2;
return this.inPosts[n];
}, "~N");
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = this.getGateName ();
arr[1] = "Vout = " + test.Circuit.CircuitElm.getVoltageText (this.volts[this.inputCount]);
arr[2] = "Iout = " + test.Circuit.CircuitElm.getCurrentText (this.getCurrent ());
}, "~A");
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[this.inputCount], this.voltSource);
});
Clazz.defineMethod (c$, "getInput", 
function (x) {
return this.volts[x] > 2.5;
}, "~N");
Clazz.overrideMethod (c$, "doStep", 
function () {
var i;
var f = this.calcFunction ();
if (this.isInverting ()) f = !f;
this.lastOutput = f;
var res = f ? 5 : 0;
test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[this.inputCount], this.voltSource, res);
});
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("# of Inputs", this.inputCount, 1, 8).setDimensionless ();
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
this.inputCount = Clazz.doubleToInt (ei.value);
this.setPoints ();
}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
return false;
}, "~N,~N");
Clazz.overrideMethod (c$, "hasGroundConnection", 
function (n1) {
return (n1 == this.inputCount);
}, "~N");
});
