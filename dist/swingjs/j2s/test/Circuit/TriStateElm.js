Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.TriStateElm", ["java.awt.Point", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resistance = 0;
this.r_on = 0;
this.r_off = 0;
this.open = false;
this.ps = null;
this.point3 = null;
this.point4 = null;
this.lead3 = null;
this.gatePoly = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "TriStateElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.TriStateElm, [xx, yy]);
this.r_on = 0.1;
this.r_off = 1e10;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.TriStateElm, [xa, ya, xb, yb, f]);
this.r_on = 0.1;
this.r_off = 1e10;
try {
this.r_on =  new Double (st.nextToken ()).doubleValue ();
this.r_off =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.TriStateElm, "dump", []) + " " + this.r_on + " " + this.r_off;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 180;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.TriStateElm, "setPoints", []);
this.calcLeads (32);
this.ps =  new java.awt.Point ();
var hs = 16;
var ww = 16;
if (ww > this.dn / 2) ww = Clazz.doubleToInt (this.dn / 2);
var triPoints = this.newPointArray (3);
this.interpPoint2 (this.lead1, this.lead2, triPoints[0], triPoints[1], 0, hs + 2);
triPoints[2] = this.interpPoint (this.point1, this.point2, .5 + (ww - 2) / this.dn);
this.gatePoly = this.createPolygon (triPoints);
this.point3 = this.interpPoint (this.point1, this.point2, .5, -hs);
this.point4 = this.interpPoint (this.point1, this.point2, .5, 0);
this.lead3 = this.interpPoint (this.point1, this.point2, .5, Clazz.doubleToInt (-hs / 2));
});
Clazz.overrideMethod (c$, "drawPosts", 
function (g) {
var i;
for (i = 0; i != 3; i++) {
var p = this.getPost (i);
this.drawPost (g, p.x, p.y, this.nodes[i]);
}
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "draw", 
function (g) {
var hs = 16;
this.setBbox (this.point1, this.point2, hs);
this.draw2Leads (g);
g.setColor (test.Circuit.CircuitElm.lightGrayColor);
test.Circuit.CircuitElm.drawThickPolygon (g, this.gatePoly);
this.setVoltageColor (g, this.volts[2]);
test.Circuit.CircuitElm.drawThickLine (g, this.point3, this.lead3);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
this.current = (this.volts[0] - this.volts[1]) / this.resistance;
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[3], this.voltSource);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[3]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
this.open = (this.volts[2] < 2.5);
this.resistance = (this.open) ? this.r_off : this.r_on;
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[3], this.nodes[1], this.resistance);
test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[3], this.voltSource, this.volts[0] > 2.5 ? 5 : 0);
});
Clazz.overrideMethod (c$, "drag", 
function (xx, yy) {
xx = test.Circuit.CircuitElm.sim.snapGrid (xx);
yy = test.Circuit.CircuitElm.sim.snapGrid (yy);
if (test.Circuit.CircuitElm.abs (this.x - xx) < test.Circuit.CircuitElm.abs (this.y - yy)) xx = this.x;
 else yy = this.y;
var q1 = test.Circuit.CircuitElm.abs (this.x - xx) + test.Circuit.CircuitElm.abs (this.y - yy);
var q2 = (Clazz.doubleToInt (q1 / 2)) % test.Circuit.CircuitElm.sim.gridSize;
if (q2 != 0) return;
this.x2 = xx;
this.y2 = yy;
this.setPoints ();
}, "~N,~N");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 4;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getPost", 
function (n) {
if (this.point4 == null) System.out.print ("Hello\n");
return (n == 0) ? this.point1 : (n == 1) ? this.point2 : (n == 2) ? this.point3 : this.point4;
}, "~N");
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "tri-state buffer";
arr[1] = this.open ? "open" : "closed";
arr[2] = "Vd = " + test.Circuit.CircuitElm.getVoltageDText (this.getVoltageDiff ());
arr[3] = "I = " + test.Circuit.CircuitElm.getCurrentDText (this.getCurrent ());
arr[4] = "Vc = " + test.Circuit.CircuitElm.getVoltageText (this.volts[2]);
}, "~A");
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
if ((n1 == 1 && n2 == 3) || (n1 == 3 && n2 == 1)) return true;
return false;
}, "~N,~N");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("On Resistance (ohms)", this.r_on, 0, 0);
if (n == 1) return  new test.Circuit.EditInfo ("Off Resistance (ohms)", this.r_off, 0, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0 && ei.value > 0) this.r_on = ei.value;
if (n == 1 && ei.value > 0) this.r_off = ei.value;
}, "~N,test.Circuit.EditInfo");
});
