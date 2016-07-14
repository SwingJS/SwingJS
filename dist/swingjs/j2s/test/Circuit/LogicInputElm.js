Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.SwitchElm"], "test.Circuit.LogicInputElm", ["java.awt.Checkbox", "$.Font", "java.lang.Double", "test.Circuit.CircuitElm", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.FLAG_TERNARY = 1;
this.FLAG_NUMERIC = 2;
this.hiV = 0;
this.loV = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "LogicInputElm", test.Circuit.SwitchElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.LogicInputElm, [xx, yy, false]);
this.hiV = 5;
this.loV = 0;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.LogicInputElm, [xa, ya, xb, yb, f, st]);
try {
this.hiV =  new Double (st.nextToken ()).doubleValue ();
this.loV =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.hiV = 5;
this.loV = 0;
} else {
throw e;
}
}
if (this.isTernary ()) this.posCount = 3;
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "isTernary", 
function () {
return (this.flags & 1) != 0;
});
Clazz.defineMethod (c$, "isNumeric", 
function () {
return (this.flags & (3)) != 0;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'L';
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.LogicInputElm, "dump", []) + " " + this.hiV + " " + this.loV;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 1;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.LogicInputElm, "setPoints", []);
this.lead1 = this.interpPoint (this.point1, this.point2, 1 - 12 / this.dn);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var f =  new java.awt.Font ("SansSerif", 1, 20);
g.setFont (f);
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.whiteColor);
var s = this.position == 0 ? "L" : "H";
if (this.isNumeric ()) s = "" + this.position;
this.setBbox (this.point1, this.lead1, 0);
this.drawCenteredText (g, s, this.x2, this.y2, true);
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.lead1);
this.updateDotCount ();
this.drawDots (g, this.point1, this.lead1, this.curcount);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "setCurrent", 
function (vs, c) {
this.current = -c;
}, "~N,~N");
Clazz.overrideMethod (c$, "stamp", 
function () {
var v = (this.position == 0) ? this.loV : this.hiV;
if (this.isTernary ()) v = this.position * 2.5;
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[0], this.voltSource, v);
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[0];
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "logic input";
arr[1] = (this.position == 0) ? "low" : "high";
if (this.isNumeric ()) arr[1] = "" + this.position;
arr[1] += " (" + test.Circuit.CircuitElm.getVoltageText (this.volts[0]) + ")";
arr[2] = "I = " + test.Circuit.CircuitElm.getCurrentText (this.getCurrent ());
}, "~A");
Clazz.overrideMethod (c$, "hasGroundConnection", 
function (n1) {
return true;
}, "~N");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) {
var ei =  new test.Circuit.EditInfo ("", 0, 0, 0);
ei.checkbox =  new java.awt.Checkbox ("Momentary Switch", this.momentary);
return ei;
}if (n == 1) return  new test.Circuit.EditInfo ("High Voltage", this.hiV, 10, -10);
if (n == 2) return  new test.Circuit.EditInfo ("Low Voltage", this.loV, 10, -10);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.momentary = ei.checkbox.getState ();
if (n == 1) this.hiV = ei.value;
if (n == 2) this.loV = ei.value;
}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'i';
});
});
