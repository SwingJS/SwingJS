Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.DiacElm", ["java.awt.Point", "java.lang.Double", "test.Circuit.CirSim", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.onresistance = 0;
this.offresistance = 0;
this.breakdown = 0;
this.holdcurrent = 0;
this.state = false;
this.ps3 = null;
this.ps4 = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "DiacElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.DiacElm, [xx, yy]);
this.offresistance = 1e9;
this.onresistance = 1e3;
this.breakdown = 1e3;
this.holdcurrent = 0.001;
this.state = false;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.DiacElm, [xa, ya, xb, yb, f]);
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
return 203;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.DiacElm, "dump", []) + " " + this.onresistance + " " + this.offresistance + " " + this.breakdown + " " + this.holdcurrent;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.DiacElm, "setPoints", []);
this.calcLeads (32);
this.ps3 =  new java.awt.Point ();
this.ps4 =  new java.awt.Point ();
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var i;
var v1 = this.volts[0];
var v2 = this.volts[1];
this.setBbox (this.point1, this.point2, 6);
this.draw2Leads (g);
this.setPowerColor (g, true);
this.doDots (g);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
var vd = this.volts[0] - this.volts[1];
if (this.state) this.current = vd / this.onresistance;
 else this.current = vd / this.offresistance;
});
Clazz.overrideMethod (c$, "startIteration", 
function () {
var vd = this.volts[0] - this.volts[1];
if (Math.abs (this.current) < this.holdcurrent) this.state = false;
if (Math.abs (vd) > this.breakdown) this.state = true;
});
Clazz.overrideMethod (c$, "doStep", 
function () {
if (this.state) test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[1], this.onresistance);
 else test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[1], this.offresistance);
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
arr[6] = "Vbrkdn = " + test.Circuit.CircuitElm.getUnitText (this.breakdown, "V");
arr[7] = "Ihold = " + test.Circuit.CircuitElm.getUnitText (this.holdcurrent, "A");
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("On resistance (ohms)", this.onresistance, 0, 0);
if (n == 1) return  new test.Circuit.EditInfo ("Off resistance (ohms)", this.offresistance, 0, 0);
if (n == 2) return  new test.Circuit.EditInfo ("Breakdown voltage (volts)", this.breakdown, 0, 0);
if (n == 3) return  new test.Circuit.EditInfo ("Hold current (amps)", this.holdcurrent, 0, 0);
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
