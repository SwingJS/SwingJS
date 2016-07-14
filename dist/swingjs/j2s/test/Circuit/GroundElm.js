Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.GroundElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "GroundElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.GroundElm, [xa, ya, xb, yb, f]);
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'g';
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setVoltageColor (g, 0);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.point2);
var i;
for (i = 0; i != 3; i++) {
var a = 10 - i * 4;
var b = i * 5;
this.interpPoint2 (this.point1, this.point2, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2, 1 + b / this.dn, a);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
}
this.doDots (g);
this.interpPoint (this.point1, this.point2, test.Circuit.CircuitElm.ps2, 1 + 11. / this.dn);
this.setBbox (this.point1, test.Circuit.CircuitElm.ps2, 11);
this.drawPost (g, this.x, this.y, this.nodes[0]);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "setCurrent", 
function (x, c) {
this.current = -c;
}, "~N,~N");
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[0], this.voltSource, 0);
});
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "ground";
arr[1] = "I = " + test.Circuit.CircuitElm.getCurrentText (this.getCurrent ());
}, "~A");
Clazz.overrideMethod (c$, "hasGroundConnection", 
function (n1) {
return true;
}, "~N");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'g';
});
});
