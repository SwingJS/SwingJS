Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.SwitchElm"], "test.Circuit.Switch2Elm", ["java.awt.Checkbox", "test.Circuit.CircuitElm", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.link = 0;
this.openhs = 16;
this.swposts = null;
this.swpoles = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "Switch2Elm", test.Circuit.SwitchElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.Switch2Elm, [xx, yy, false]);
this.noDiagonal = true;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xx, yy, mm) {
Clazz.superConstructor (this, test.Circuit.Switch2Elm, [xx, yy, mm]);
this.noDiagonal = true;
}, "~N,~N,~B");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.Switch2Elm, [xa, ya, xb, yb, f, st]);
this.link =  new Integer (st.nextToken ()).intValue ();
this.noDiagonal = true;
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'S';
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.Switch2Elm, "dump", []) + " " + this.link;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.Switch2Elm, "setPoints", []);
this.calcLeads (32);
this.swposts = this.newPointArray (2);
this.swpoles = this.newPointArray (3);
this.interpPoint2 (this.lead1, this.lead2, this.swpoles[0], this.swpoles[1], 1, 16);
this.swpoles[2] = this.lead2;
this.interpPoint2 (this.point1, this.point2, this.swposts[0], this.swposts[1], 1, 16);
this.posCount = this.hasCenterOff () ? 3 : 2;
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
if (!this.needsHighlight ()) g.setColor (test.Circuit.CircuitElm.whiteColor);
test.Circuit.CircuitElm.drawThickLine (g, this.lead1, this.swpoles[this.position]);
this.updateDotCount ();
this.drawDots (g, this.point1, this.lead1, this.curcount);
if (this.position != 2) this.drawDots (g, this.swpoles[this.position], this.swposts[this.position], this.curcount);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return (n == 0) ? this.point1 : this.swposts[n - 1];
}, "~N");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
if (this.position == 2) this.current = 0;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
if (this.position == 2) return;
test.Circuit.CircuitElm.sim.stampVoltageSource (this.nodes[0], this.nodes[this.position + 1], this.voltSource, 0);
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return (this.position == 2) ? 0 : 1;
});
Clazz.defineMethod (c$, "toggle", 
function () {
Clazz.superCall (this, test.Circuit.Switch2Elm, "toggle", []);
if (this.link != 0) {
var i;
for (i = 0; i != test.Circuit.CircuitElm.sim.elmList.size (); i++) {
var o = test.Circuit.CircuitElm.sim.elmList.elementAt (i);
if (Clazz.instanceOf (o, test.Circuit.Switch2Elm)) {
var s2 = o;
if (s2.link == this.link) s2.position = this.position;
}}
}});
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
if (this.position == 2) return false;
return this.comparePair (n1, n2, 0, 1 + this.position);
}, "~N,~N");
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = (this.link == 0) ? "switch (SPDT)" : "switch (DPDT)";
arr[1] = "I = " + test.Circuit.CircuitElm.getCurrentDText (this.getCurrent ());
}, "~A");
Clazz.defineMethod (c$, "getEditInfo", 
function (n) {
if (n == 1) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Center Off", this.hasCenterOff ());
return ei;
}return Clazz.superCall (this, test.Circuit.Switch2Elm, "getEditInfo", [n]);
}, "~N");
Clazz.defineMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 1) {
this.flags &= -2;
if (ei.checkbox.getState ()) this.flags |= 1;
if (this.hasCenterOff ()) this.momentary = false;
this.setPoints ();
} else Clazz.superCall (this, test.Circuit.Switch2Elm, "setEditValue", [n, ei]);
}, "~N,test.Circuit.EditInfo");
Clazz.defineMethod (c$, "hasCenterOff", 
function () {
return (this.flags & 1) != 0;
});
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'S';
});
Clazz.defineStatics (c$,
"FLAG_CENTER_OFF", 1);
});
