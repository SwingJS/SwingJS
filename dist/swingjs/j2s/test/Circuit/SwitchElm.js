Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.SwitchElm", ["java.awt.Checkbox", "$.Point", "java.lang.Boolean", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.momentary = false;
this.position = 0;
this.posCount = 0;
this.ps = null;
this.$ps2 = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "SwitchElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.SwitchElm, [xx, yy]);
this.momentary = false;
this.position = 0;
this.posCount = 2;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xx, yy, mm) {
Clazz.superConstructor (this, test.Circuit.SwitchElm, [xx, yy]);
this.position = (mm) ? 1 : 0;
this.momentary = mm;
this.posCount = 2;
}, "~N,~N,~B");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.SwitchElm, [xa, ya, xb, yb, f]);
var str = st.nextToken ();
if (str.compareTo ("true") == 0) this.position = (Clazz.instanceOf (this, test.Circuit.LogicInputElm)) ? 0 : 1;
 else if (str.compareTo ("false") == 0) this.position = (Clazz.instanceOf (this, test.Circuit.LogicInputElm)) ? 1 : 0;
 else this.position =  new Integer (str).intValue ();
this.momentary =  new Boolean (st.nextToken ()).booleanValue ();
this.posCount = 2;
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 's';
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.SwitchElm, "dump", []) + " " + this.position + " " + this.momentary;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.SwitchElm, "setPoints", []);
this.calcLeads (32);
this.ps =  new java.awt.Point ();
this.$ps2 =  new java.awt.Point ();
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var openhs = 16;
var hs1 = (this.position == 1) ? 0 : 2;
var hs2 = (this.position == 1) ? openhs : 2;
this.setBbox (this.point1, this.point2, openhs);
this.draw2Leads (g);
if (this.position == 0) this.doDots (g);
if (!this.needsHighlight ()) g.setColor (test.Circuit.CircuitElm.whiteColor);
this.interpPoint (this.lead1, this.lead2, this.ps, 0, hs1);
this.interpPoint (this.lead1, this.lead2, this.$ps2, 1, hs2);
test.Circuit.CircuitElm.drawThickLine (g, this.ps, this.$ps2);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
if (this.position == 1) this.current = 0;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
if (this.position == 0) test.Circuit.CircuitElm.sim.stampVoltageSource (this.nodes[0], this.nodes[1], this.voltSource, 0);
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return (this.position == 1) ? 0 : 1;
});
Clazz.defineMethod (c$, "mouseUp", 
function () {
if (this.momentary) this.toggle ();
});
Clazz.defineMethod (c$, "toggle", 
function () {
this.position++;
if (this.position >= this.posCount) this.position = 0;
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = (this.momentary) ? "push switch (SPST)" : "switch (SPST)";
if (this.position == 1) {
arr[1] = "open";
arr[2] = "Vd = " + test.Circuit.CircuitElm.getVoltageDText (this.getVoltageDiff ());
} else {
arr[1] = "closed";
arr[2] = "V = " + test.Circuit.CircuitElm.getVoltageText (this.volts[0]);
arr[3] = "I = " + test.Circuit.CircuitElm.getCurrentDText (this.getCurrent ());
}}, "~A");
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
return this.position == 0;
}, "~N,~N");
Clazz.overrideMethod (c$, "isWire", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Momentary Switch", this.momentary);
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.momentary = ei.checkbox.getState ();
}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 's';
});
});
