Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.MosfetElm"], "test.Circuit.JfetElm", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.gatePoly = null;
this.$arrowPoly = null;
this.gatePt = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "JfetElm", test.Circuit.MosfetElm);
Clazz.makeConstructor (c$, 
function (xx, yy, pnpflag) {
Clazz.superConstructor (this, test.Circuit.JfetElm, [xx, yy, pnpflag]);
this.noDiagonal = true;
}, "~N,~N,~B");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.JfetElm, [xa, ya, xb, yb, f, st]);
this.noDiagonal = true;
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.point1, this.point2, 16);
this.setVoltageColor (g, this.volts[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.src[0], this.src[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.src[1], this.src[2]);
this.setVoltageColor (g, this.volts[2]);
test.Circuit.CircuitElm.drawThickLine (g, this.drn[0], this.drn[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.drn[1], this.drn[2]);
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.gatePt);
g.fillPolygon (this.$arrowPoly);
this.setPowerColor (g, true);
g.fillPolygon (this.gatePoly);
this.curcount = this.updateDotCount (-this.ids, this.curcount);
if (this.curcount != 0) {
this.drawDots (g, this.src[0], this.src[1], this.curcount);
this.drawDots (g, this.src[1], this.src[2], this.curcount + 8);
this.drawDots (g, this.drn[0], this.drn[1], -this.curcount);
this.drawDots (g, this.drn[1], this.drn[2], -(this.curcount + 8));
}this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.JfetElm, "setPoints", []);
var hs2 = 16 * this.dsign;
this.src = this.newPointArray (3);
this.drn = this.newPointArray (3);
this.interpPoint2 (this.point1, this.point2, this.src[0], this.drn[0], 1, hs2);
this.interpPoint2 (this.point1, this.point2, this.src[1], this.drn[1], 1, Clazz.doubleToInt (hs2 / 2));
this.interpPoint2 (this.point1, this.point2, this.src[2], this.drn[2], 1 - 10 / this.dn, Clazz.doubleToInt (hs2 / 2));
this.gatePt = this.interpPoint (this.point1, this.point2, 1 - 14 / this.dn);
var ra = this.newPointArray (4);
this.interpPoint2 (this.point1, this.point2, ra[0], ra[1], 1 - 13 / this.dn, 16);
this.interpPoint2 (this.point1, this.point2, ra[2], ra[3], 1 - 10 / this.dn, 16);
this.gatePoly = this.createPolygon (ra[0], ra[1], ra[3], ra[2]);
if (this.pnp == -1) {
var x = this.interpPoint (this.gatePt, this.point1, 18 / this.dn);
this.$arrowPoly = this.calcArrow (this.gatePt, x, 8, 3);
} else this.$arrowPoly = this.calcArrow (this.point1, this.gatePt, 8, 3);
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'j';
});
Clazz.overrideMethod (c$, "getDefaultThreshold", 
function () {
return -4;
});
Clazz.overrideMethod (c$, "getBeta", 
function () {
return .00125;
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
this.getFetInfo (arr, "JFET");
}, "~A");
});
