Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.AnalogSwitchElm", ["java.awt.Checkbox", "$.Point", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.FLAG_INVERT = 1;
this.resistance = 0;
this.r_on = 0;
this.r_off = 0;
this.open = false;
this.ps = null;
this.point3 = null;
this.lead3 = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "AnalogSwitchElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.AnalogSwitchElm, [xx, yy]);
this.r_on = 20;
this.r_off = 1e10;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.AnalogSwitchElm, [xa, ya, xb, yb, f]);
this.r_on = 20;
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
return Clazz.superCall (this, test.Circuit.AnalogSwitchElm, "dump", []) + " " + this.r_on + " " + this.r_off;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 159;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.AnalogSwitchElm, "setPoints", []);
this.calcLeads (32);
this.ps =  new java.awt.Point ();
var openhs = 16;
this.point3 = this.interpPoint (this.point1, this.point2, .5, -openhs);
this.lead3 = this.interpPoint (this.point1, this.point2, .5, Clazz.doubleToInt (-openhs / 2));
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var openhs = 16;
var hs = (this.open) ? openhs : 0;
this.setBbox (this.point1, this.point2, openhs);
this.draw2Leads (g);
g.setColor (test.Circuit.CircuitElm.lightGrayColor);
this.interpPoint (this.lead1, this.lead2, this.ps, 1, hs);
test.Circuit.CircuitElm.drawThickLine (g, this.lead1, this.ps);
this.setVoltageColor (g, this.volts[2]);
test.Circuit.CircuitElm.drawThickLine (g, this.point3, this.lead3);
if (!this.open) this.doDots (g);
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
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
this.open = (this.volts[2] < 2.5);
if ((this.flags & 1) != 0) this.open = !this.open;
this.resistance = (this.open) ? this.r_off : this.r_on;
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[1], this.resistance);
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
return 3;
});
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.point2 : this.point3;
}, "~N");
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "analog switch";
arr[1] = this.open ? "open" : "closed";
arr[2] = "Vd = " + test.Circuit.CircuitElm.getVoltageDText (this.getVoltageDiff ());
arr[3] = "I = " + test.Circuit.CircuitElm.getCurrentDText (this.getCurrent ());
arr[4] = "Vc = " + test.Circuit.CircuitElm.getVoltageText (this.volts[2]);
}, "~A");
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
if (n1 == 2 || n2 == 2) return false;
return true;
}, "~N,~N");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Normally closed", (this.flags & 1) != 0);
return ei;
}if (n == 1) return  new test.Circuit.EditInfo ("On Resistance (ohms)", this.r_on, 0, 0);
if (n == 2) return  new test.Circuit.EditInfo ("Off Resistance (ohms)", this.r_off, 0, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.flags = (ei.checkbox.getState ()) ? (this.flags | 1) : (this.flags & -2);
if (n == 1 && ei.value > 0) this.r_on = ei.value;
if (n == 2 && ei.value > 0) this.r_off = ei.value;
}, "~N,test.Circuit.EditInfo");
});
