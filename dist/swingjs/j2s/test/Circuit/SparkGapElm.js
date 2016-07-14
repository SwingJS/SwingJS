Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.SparkGapElm", ["java.lang.Double", "test.Circuit.CirSim", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resistance = 0;
this.onresistance = 0;
this.offresistance = 0;
this.breakdown = 0;
this.holdcurrent = 0;
this.state = false;
this.arrow1 = null;
this.arrow2 = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "SparkGapElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.SparkGapElm, [xx, yy]);
this.offresistance = 1e9;
this.onresistance = 1e3;
this.breakdown = 1e3;
this.holdcurrent = 0.001;
this.state = false;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.SparkGapElm, [xa, ya, xb, yb, f]);
this.onresistance =  new Double (st.nextToken ()).doubleValue ();
this.offresistance =  new Double (st.nextToken ()).doubleValue ();
this.breakdown =  new Double (st.nextToken ()).doubleValue ();
this.holdcurrent =  new Double (st.nextToken ()).doubleValue ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 187;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.SparkGapElm, "dump", []) + " " + this.onresistance + " " + this.offresistance + " " + this.breakdown + " " + this.holdcurrent;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.SparkGapElm, "setPoints", []);
var dist = 16;
var alen = 8;
this.calcLeads (dist + alen);
var p1 = this.interpPoint (this.point1, this.point2, (this.dn - alen) / (2 * this.dn));
this.arrow1 = this.calcArrow (this.point1, p1, alen, alen);
p1 = this.interpPoint (this.point1, this.point2, (this.dn + alen) / (2 * this.dn));
this.arrow2 = this.calcArrow (this.point2, p1, alen, alen);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var i;
var v1 = this.volts[0];
var v2 = this.volts[1];
this.setBbox (this.point1, this.point2, 8);
this.draw2Leads (g);
this.setPowerColor (g, true);
this.setVoltageColor (g, this.volts[0]);
g.fillPolygon (this.arrow1);
this.setVoltageColor (g, this.volts[1]);
g.fillPolygon (this.arrow2);
if (this.state) this.doDots (g);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
var vd = this.volts[0] - this.volts[1];
this.current = vd / this.resistance;
});
Clazz.defineMethod (c$, "reset", 
function () {
Clazz.superCall (this, test.Circuit.SparkGapElm, "reset", []);
this.state = false;
});
Clazz.overrideMethod (c$, "startIteration", 
function () {
if (Math.abs (this.current) < this.holdcurrent) this.state = false;
var vd = this.volts[0] - this.volts[1];
if (Math.abs (vd) > this.breakdown) this.state = true;
});
Clazz.overrideMethod (c$, "doStep", 
function () {
this.resistance = (this.state) ? this.onresistance : this.offresistance;
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[1], this.resistance);
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "spark gap";
this.getBasicInfo (arr);
arr[3] = this.state ? "on" : "off";
arr[4] = "Ron = " + test.Circuit.CircuitElm.getUnitText (this.onresistance, test.Circuit.CirSim.ohmString);
arr[5] = "Roff = " + test.Circuit.CircuitElm.getUnitText (this.offresistance, test.Circuit.CirSim.ohmString);
arr[6] = "Vbreakdown = " + test.Circuit.CircuitElm.getUnitText (this.breakdown, "V");
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("On resistance (ohms)", this.onresistance, 0, 0);
if (n == 1) return  new test.Circuit.EditInfo ("Off resistance (ohms)", this.offresistance, 0, 0);
if (n == 2) return  new test.Circuit.EditInfo ("Breakdown voltage", this.breakdown, 0, 0);
if (n == 3) return  new test.Circuit.EditInfo ("Holding current (A)", this.holdcurrent, 0, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (ei.value > 0 && n == 0) this.onresistance = ei.value;
if (ei.value > 0 && n == 1) this.offresistance = ei.value;
if (ei.value > 0 && n == 2) this.breakdown = ei.value;
if (ei.value > 0 && n == 3) this.holdcurrent = ei.value;
}, "~N,test.Circuit.EditInfo");
});
