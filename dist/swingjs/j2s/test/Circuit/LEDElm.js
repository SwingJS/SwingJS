Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.DiodeElm"], "test.Circuit.LEDElm", ["java.awt.Color", "java.lang.Double", "test.Circuit.CircuitElm", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.colorR = 0;
this.colorG = 0;
this.colorB = 0;
this.ledLead1 = null;
this.ledLead2 = null;
this.ledCenter = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "LEDElm", test.Circuit.DiodeElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.LEDElm, [xx, yy]);
this.fwdrop = 2.1024259;
this.setup ();
this.colorR = 1;
this.colorG = this.colorB = 0;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.LEDElm, [xa, ya, xb, yb, f, st]);
if ((f & 1) == 0) this.fwdrop = 2.1024259;
this.setup ();
this.colorR =  new Double (st.nextToken ()).doubleValue ();
this.colorG =  new Double (st.nextToken ()).doubleValue ();
this.colorB =  new Double (st.nextToken ()).doubleValue ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 162;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.LEDElm, "dump", []) + " " + this.colorR + " " + this.colorG + " " + this.colorB;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.LEDElm, "setPoints", []);
var cr = 12;
this.ledLead1 = this.interpPoint (this.point1, this.point2, .5 - cr / this.dn);
this.ledLead2 = this.interpPoint (this.point1, this.point2, .5 + cr / this.dn);
this.ledCenter = this.interpPoint (this.point1, this.point2, .5);
});
Clazz.defineMethod (c$, "draw", 
function (g) {
if (this.needsHighlight () || this === test.Circuit.CircuitElm.sim.dragElm) {
Clazz.superCall (this, test.Circuit.LEDElm, "draw", [g]);
return;
}this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.ledLead1);
this.setVoltageColor (g, this.volts[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.ledLead2, this.point2);
g.setColor (java.awt.Color.gray);
var cr = 12;
test.Circuit.CircuitElm.drawThickCircle (g, this.ledCenter.x, this.ledCenter.y, cr);
cr -= 4;
var w = 255 * this.current / .01;
if (w > 255) w = 255;
var cc =  new java.awt.Color (Clazz.doubleToInt (this.colorR * w), Clazz.doubleToInt (this.colorG * w), Clazz.doubleToInt (this.colorB * w));
g.setColor (cc);
g.fillOval (this.ledCenter.x - cr, this.ledCenter.y - cr, cr * 2, cr * 2);
this.setBbox (this.point1, this.point2, cr);
this.updateDotCount ();
this.drawDots (g, this.point1, this.ledLead1, this.curcount);
this.drawDots (g, this.point2, this.ledLead2, -this.curcount);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "getInfo", 
function (arr) {
Clazz.superCall (this, test.Circuit.LEDElm, "getInfo", [arr]);
arr[0] = "LED";
}, "~A");
Clazz.defineMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return Clazz.superCall (this, test.Circuit.LEDElm, "getEditInfo", [n]);
if (n == 1) return  new test.Circuit.EditInfo ("Red Value (0-1)", this.colorR, 0, 1).setDimensionless ();
if (n == 2) return  new test.Circuit.EditInfo ("Green Value (0-1)", this.colorG, 0, 1).setDimensionless ();
if (n == 3) return  new test.Circuit.EditInfo ("Blue Value (0-1)", this.colorB, 0, 1).setDimensionless ();
return null;
}, "~N");
Clazz.defineMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) Clazz.superCall (this, test.Circuit.LEDElm, "setEditValue", [0, ei]);
if (n == 1) this.colorR = ei.value;
if (n == 2) this.colorG = ei.value;
if (n == 3) this.colorB = ei.value;
}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'l';
});
});
