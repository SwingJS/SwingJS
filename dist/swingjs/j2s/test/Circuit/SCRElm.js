Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.SCRElm", ["java.lang.Double", "test.Circuit.Diode", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.anode = 0;
this.cnode = 1;
this.gnode = 2;
this.inode = 3;
this.diode = null;
this.ia = 0;
this.ic = 0;
this.ig = 0;
this.curcount_a = 0;
this.curcount_c = 0;
this.curcount_g = 0;
this.lastvac = 0;
this.lastvag = 0;
this.cresistance = 0;
this.triggerI = 0;
this.holdingI = 0;
this.hs = 8;
this.poly = null;
this.cathode = null;
this.gate = null;
this.aresistance = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "SCRElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.SCRElm, [xx, yy]);
this.setDefaults ();
this.setup ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.SCRElm, [xa, ya, xb, yb, f]);
this.setDefaults ();
try {
this.lastvac =  new Double (st.nextToken ()).doubleValue ();
this.lastvag =  new Double (st.nextToken ()).doubleValue ();
this.volts[0] = 0;
this.volts[1] = -this.lastvac;
this.volts[2] = -this.lastvag;
this.triggerI =  new Double (st.nextToken ()).doubleValue ();
this.holdingI =  new Double (st.nextToken ()).doubleValue ();
this.cresistance =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.setup ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "setDefaults", 
function () {
this.cresistance = 50;
this.holdingI = .0082;
this.triggerI = .01;
});
Clazz.defineMethod (c$, "setup", 
function () {
this.diode =  new test.Circuit.Diode (test.Circuit.CircuitElm.sim);
this.diode.setup (.8, 0);
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.volts[0] = this.volts[1] = this.volts[2] = 0;
this.diode.reset ();
this.lastvag = this.lastvac = this.curcount_a = this.curcount_c = this.curcount_g = 0;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 177;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.SCRElm, "dump", []) + " " + (this.volts[0] - this.volts[1]) + " " + (this.volts[0] - this.volts[2]) + " " + this.triggerI + " " + this.holdingI + " " + this.cresistance;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.SCRElm, "setPoints", []);
var dir = 0;
if (test.Circuit.CircuitElm.abs (this.dx) > test.Circuit.CircuitElm.abs (this.dy)) {
dir = -test.Circuit.CircuitElm.sign (this.dx) * test.Circuit.CircuitElm.sign (this.dy);
this.point2.y = this.point1.y;
} else {
dir = test.Circuit.CircuitElm.sign (this.dy) * test.Circuit.CircuitElm.sign (this.dx);
this.point2.x = this.point1.x;
}if (dir == 0) dir = 1;
this.calcLeads (16);
this.cathode = this.newPointArray (2);
var pa = this.newPointArray (2);
this.interpPoint2 (this.lead1, this.lead2, pa[0], pa[1], 0, 8);
this.interpPoint2 (this.lead1, this.lead2, this.cathode[0], this.cathode[1], 1, 8);
this.poly = this.createPolygon (pa[0], pa[1], this.lead2);
this.gate = this.newPointArray (2);
var leadlen = (this.dn - 16) / 2;
var gatelen = test.Circuit.CircuitElm.sim.gridSize;
gatelen += leadlen % test.Circuit.CircuitElm.sim.gridSize;
if (leadlen < gatelen) {
this.x2 = this.x;
this.y2 = this.y;
return;
}this.interpPoint (this.lead2, this.point2, this.gate[0], gatelen / leadlen, gatelen * dir);
this.interpPoint (this.lead2, this.point2, this.gate[1], gatelen / leadlen, test.Circuit.CircuitElm.sim.gridSize * 2 * dir);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.point1, this.point2, 8);
this.adjustBbox (this.gate[0], this.gate[1]);
var v1 = this.volts[0];
var v2 = this.volts[1];
this.draw2Leads (g);
this.setPowerColor (g, true);
this.setVoltageColor (g, v1);
g.fillPolygon (this.poly);
this.setVoltageColor (g, v2);
test.Circuit.CircuitElm.drawThickLine (g, this.cathode[0], this.cathode[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.lead2, this.gate[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.gate[0], this.gate[1]);
this.curcount_a = this.updateDotCount (this.ia, this.curcount_a);
this.curcount_c = this.updateDotCount (this.ic, this.curcount_c);
this.curcount_g = this.updateDotCount (this.ig, this.curcount_g);
if (test.Circuit.CircuitElm.sim.dragElm !== this) {
this.drawDots (g, this.point1, this.lead2, this.curcount_a);
this.drawDots (g, this.point2, this.lead2, this.curcount_c);
this.drawDots (g, this.gate[1], this.gate[0], this.curcount_g);
this.drawDots (g, this.gate[0], this.lead2, this.curcount_g + test.Circuit.CircuitElm.distance (this.gate[1], this.gate[0]));
}this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.point2 : this.gate[1];
}, "~N");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "getInternalNodeCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getPower", 
function () {
return (this.volts[0] - this.volts[2]) * this.ia + (this.volts[1] - this.volts[2]) * this.ic;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[2]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[3]);
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[2], this.nodes[1], this.cresistance);
this.diode.stamp (this.nodes[3], this.nodes[2]);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var vac = this.volts[0] - this.volts[1];
var vag = this.volts[0] - this.volts[2];
if (Math.abs (vac - this.lastvac) > .01 || Math.abs (vag - this.lastvag) > .01) test.Circuit.CircuitElm.sim.converged = false;
this.lastvac = vac;
this.lastvag = vag;
this.diode.doStep (this.volts[3] - this.volts[2]);
var icmult = 1 / this.triggerI;
var iamult = 1 / this.holdingI - icmult;
this.aresistance = (-icmult * this.ic + this.ia * iamult > 1) ? .0105 : 10e5;
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[3], this.aresistance);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "SCR";
var vac = this.volts[0] - this.volts[1];
var vag = this.volts[0] - this.volts[2];
var vgc = this.volts[2] - this.volts[1];
arr[1] = "Ia = " + test.Circuit.CircuitElm.getCurrentText (this.ia);
arr[2] = "Ig = " + test.Circuit.CircuitElm.getCurrentText (this.ig);
arr[3] = "Vac = " + test.Circuit.CircuitElm.getVoltageText (vac);
arr[4] = "Vag = " + test.Circuit.CircuitElm.getVoltageText (vag);
arr[5] = "Vgc = " + test.Circuit.CircuitElm.getVoltageText (vgc);
}, "~A");
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
this.ic = (this.volts[1] - this.volts[2]) / this.cresistance;
this.ia = (this.volts[0] - this.volts[3]) / this.aresistance;
this.ig = -this.ic - this.ia;
});
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Trigger Current (A)", this.triggerI, 0, 0);
if (n == 1) return  new test.Circuit.EditInfo ("Holding Current (A)", this.holdingI, 0, 0);
if (n == 2) return  new test.Circuit.EditInfo ("Gate-Cathode Resistance (ohms)", this.cresistance, 0, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0 && ei.value > 0) this.triggerI = ei.value;
if (n == 1 && ei.value > 0) this.holdingI = ei.value;
if (n == 2 && ei.value > 0) this.cresistance = ei.value;
}, "~N,test.Circuit.EditInfo");
});
