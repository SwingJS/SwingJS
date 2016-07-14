Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.VoltageElm", ["java.awt.Choice", "$.Color", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.waveform = 0;
this.frequency = 0;
this.maxVoltage = 0;
this.freqTimeZero = 0;
this.bias = 0;
this.phaseShift = 0;
this.dutyCycle = 0;
this.circleSize = 17;
Clazz.instantialize (this, arguments);
}, test.Circuit, "VoltageElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy, wf) {
Clazz.superConstructor (this, test.Circuit.VoltageElm, [xx, yy]);
this.waveform = wf;
this.maxVoltage = 5;
this.frequency = 40;
this.dutyCycle = .5;
this.reset ();
}, "~N,~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.VoltageElm, [xa, ya, xb, yb, f]);
this.maxVoltage = 5;
this.frequency = 40;
this.waveform = 0;
this.dutyCycle = .5;
try {
this.waveform =  new Integer (st.nextToken ()).intValue ();
this.frequency =  new Double (st.nextToken ()).doubleValue ();
this.maxVoltage =  new Double (st.nextToken ()).doubleValue ();
this.bias =  new Double (st.nextToken ()).doubleValue ();
this.phaseShift =  new Double (st.nextToken ()).doubleValue ();
this.dutyCycle =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if ((this.flags & 2) != 0) {
this.flags &= -3;
this.phaseShift = 1.5707963267948966;
}this.reset ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'v';
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.VoltageElm, "dump", []) + " " + this.waveform + " " + this.frequency + " " + this.maxVoltage + " " + this.bias + " " + this.phaseShift + " " + this.dutyCycle;
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.freqTimeZero = 0;
this.curcount = 0;
});
Clazz.defineMethod (c$, "triangleFunc", 
function (x) {
if (x < 3.141592653589793) return x * (0.6366197723675814) - 1;
return 1 - (x - 3.141592653589793) * (0.6366197723675814);
}, "~N");
Clazz.overrideMethod (c$, "stamp", 
function () {
if (this.waveform == 0) test.Circuit.CircuitElm.sim.stampVoltageSource (this.nodes[0], this.nodes[1], this.voltSource, this.getVoltage ());
 else test.Circuit.CircuitElm.sim.stampVoltageSource (this.nodes[0], this.nodes[1], this.voltSource);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
if (this.waveform != 0) test.Circuit.CircuitElm.sim.updateVoltageSource (this.nodes[0], this.nodes[1], this.voltSource, this.getVoltage ());
});
Clazz.defineMethod (c$, "getVoltage", 
function () {
var w = 2 * 3.141592653589793 * (test.Circuit.CircuitElm.sim.t - this.freqTimeZero) * this.frequency + this.phaseShift;
switch (this.waveform) {
case 0:
return this.maxVoltage + this.bias;
case 1:
return Math.sin (w) * this.maxVoltage + this.bias;
case 2:
return this.bias + ((w % (6.283185307179586) > (2 * 3.141592653589793 * this.dutyCycle)) ? -this.maxVoltage : this.maxVoltage);
case 3:
return this.bias + this.triangleFunc (w % (6.283185307179586)) * this.maxVoltage;
case 4:
return this.bias + (w % (6.283185307179586)) * (this.maxVoltage / 3.141592653589793) - this.maxVoltage;
case 5:
return ((w % (6.283185307179586)) < 1) ? this.maxVoltage + this.bias : this.bias;
default:
return 0;
}
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.VoltageElm, "setPoints", []);
this.calcLeads ((this.waveform == 0 || this.waveform == 6) ? 8 : 34);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.x, this.y, this.x2, this.y2);
this.draw2Leads (g);
if (this.waveform == 0) {
this.setPowerColor (g, false);
this.setVoltageColor (g, this.volts[0]);
this.interpPoint2 (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2, 0, 10);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
this.setVoltageColor (g, this.volts[1]);
var hs = 16;
this.setBbox (this.point1, this.point2, hs);
this.interpPoint2 (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2, 1, hs);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
} else {
this.setBbox (this.point1, this.point2, 17);
this.interpPoint (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, .5);
this.drawWaveform (g, test.Circuit.CircuitElm.ps1);
}this.updateDotCount ();
if (test.Circuit.CircuitElm.sim.dragElm !== this) {
if (this.waveform == 0) this.drawDots (g, this.point1, this.point2, this.curcount);
 else {
this.drawDots (g, this.point1, this.lead1, this.curcount);
this.drawDots (g, this.point2, this.lead2, -this.curcount);
}}this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "drawWaveform", 
function (g, center) {
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : java.awt.Color.gray);
this.setPowerColor (g, false);
var xc = center.x;
var yc = center.y;
test.Circuit.CircuitElm.drawThickCircle (g, xc, yc, 17);
var wl = 8;
this.adjustBbox (xc - 17, yc - 17, xc + 17, yc + 17);
var xc2;
switch (this.waveform) {
case 0:
{
break;
}case 2:
xc2 = Clazz.doubleToInt (wl * 2 * this.dutyCycle - wl + xc);
xc2 = test.Circuit.CircuitElm.max (xc - wl + 3, test.Circuit.CircuitElm.min (xc + wl - 3, xc2));
test.Circuit.CircuitElm.drawThickLine (g, xc - wl, yc - wl, xc - wl, yc);
test.Circuit.CircuitElm.drawThickLine (g, xc - wl, yc - wl, xc2, yc - wl);
test.Circuit.CircuitElm.drawThickLine (g, xc2, yc - wl, xc2, yc + wl);
test.Circuit.CircuitElm.drawThickLine (g, xc + wl, yc + wl, xc2, yc + wl);
test.Circuit.CircuitElm.drawThickLine (g, xc + wl, yc, xc + wl, yc + wl);
break;
case 5:
yc += Clazz.doubleToInt (wl / 2);
test.Circuit.CircuitElm.drawThickLine (g, xc - wl, yc - wl, xc - wl, yc);
test.Circuit.CircuitElm.drawThickLine (g, xc - wl, yc - wl, xc - Clazz.doubleToInt (wl / 2), yc - wl);
test.Circuit.CircuitElm.drawThickLine (g, xc - Clazz.doubleToInt (wl / 2), yc - wl, xc - Clazz.doubleToInt (wl / 2), yc);
test.Circuit.CircuitElm.drawThickLine (g, xc - Clazz.doubleToInt (wl / 2), yc, xc + wl, yc);
break;
case 4:
test.Circuit.CircuitElm.drawThickLine (g, xc, yc - wl, xc - wl, yc);
test.Circuit.CircuitElm.drawThickLine (g, xc, yc - wl, xc, yc + wl);
test.Circuit.CircuitElm.drawThickLine (g, xc, yc + wl, xc + wl, yc);
break;
case 3:
{
var xl = 5;
test.Circuit.CircuitElm.drawThickLine (g, xc - xl * 2, yc, xc - xl, yc - wl);
test.Circuit.CircuitElm.drawThickLine (g, xc - xl, yc - wl, xc, yc);
test.Circuit.CircuitElm.drawThickLine (g, xc, yc, xc + xl, yc + wl);
test.Circuit.CircuitElm.drawThickLine (g, xc + xl, yc + wl, xc + xl * 2, yc);
break;
}case 1:
{
var i;
var xl = 10;
var ox = -1;
var oy = -1;
for (i = -xl; i <= xl; i++) {
var yy = yc + Clazz.doubleToInt (.95 * Math.sin (i * 3.141592653589793 / xl) * wl);
if (ox != -1) test.Circuit.CircuitElm.drawThickLine (g, ox, oy, xc + i, yy);
ox = xc + i;
oy = yy;
}
break;
}}
if (test.Circuit.CircuitElm.sim.showValuesCheckItem.getState ()) {
var s = test.Circuit.CircuitElm.getShortUnitText (this.frequency, "Hz");
if (this.dx == 0 || this.dy == 0) this.drawValues (g, s, 17);
}}, "java.awt.Graphics,java.awt.Point");
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getPower", 
function () {
return -this.getVoltageDiff () * this.current;
});
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[1] - this.volts[0];
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
switch (this.waveform) {
case 0:
case 6:
arr[0] = "voltage source";
break;
case 1:
arr[0] = "A/C source";
break;
case 2:
arr[0] = "square wave gen";
break;
case 5:
arr[0] = "pulse gen";
break;
case 4:
arr[0] = "sawtooth gen";
break;
case 3:
arr[0] = "triangle gen";
break;
}
arr[1] = "I = " + test.Circuit.CircuitElm.getCurrentText (this.getCurrent ());
arr[2] = ((Clazz.instanceOf (this, test.Circuit.RailElm)) ? "V = " : "Vd = ") + test.Circuit.CircuitElm.getVoltageText (this.getVoltageDiff ());
if (this.waveform != 0 && this.waveform != 6) {
arr[3] = "f = " + test.Circuit.CircuitElm.getUnitText (this.frequency, "Hz");
arr[4] = "Vmax = " + test.Circuit.CircuitElm.getVoltageText (this.maxVoltage);
var i = 5;
if (this.bias != 0) arr[i++] = "Voff = " + test.Circuit.CircuitElm.getVoltageText (this.bias);
 else if (this.frequency > 500) arr[i++] = "wavelength = " + test.Circuit.CircuitElm.getUnitText (2.9979e8 / this.frequency, "m");
arr[i++] = "P = " + test.Circuit.CircuitElm.getUnitText (this.getPower (), "W");
}}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo (this.waveform == 0 ? "Voltage" : "Max Voltage", this.maxVoltage, -20, 20);
if (n == 1) {
var ei =  new test.Circuit.EditInfo ("Waveform", this.waveform, -1, -1);
ei.choice =  new java.awt.Choice ();
ei.choice.add ("D/C");
ei.choice.add ("A/C");
ei.choice.add ("Square Wave");
ei.choice.add ("Triangle");
ei.choice.add ("Sawtooth");
ei.choice.add ("Pulse");
ei.choice.select (this.waveform);
return ei;
}if (this.waveform == 0) return null;
if (n == 2) return  new test.Circuit.EditInfo ("Frequency (Hz)", this.frequency, 4, 500);
if (n == 3) return  new test.Circuit.EditInfo ("DC Offset (V)", this.bias, -20, 20);
if (n == 4) return  new test.Circuit.EditInfo ("Phase Offset (degrees)", this.phaseShift * 180 / 3.141592653589793, -180, 180).setDimensionless ();
if (n == 5 && this.waveform == 2) return  new test.Circuit.EditInfo ("Duty Cycle", this.dutyCycle * 100, 0, 100).setDimensionless ();
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.maxVoltage = ei.value;
if (n == 3) this.bias = ei.value;
if (n == 2) {
var oldfreq = this.frequency;
this.frequency = ei.value;
var maxfreq = 1 / (8 * test.Circuit.CircuitElm.sim.timeStep);
if (this.frequency > maxfreq) this.frequency = maxfreq;
var adj = this.frequency - oldfreq;
this.freqTimeZero = test.Circuit.CircuitElm.sim.t - oldfreq * (test.Circuit.CircuitElm.sim.t - this.freqTimeZero) / this.frequency;
}if (n == 1) {
var ow = this.waveform;
this.waveform = ei.choice.getSelectedIndex ();
if (this.waveform == 0 && ow != 0) {
ei.newDialog = true;
this.bias = 0;
} else if (this.waveform != 0 && ow == 0) {
ei.newDialog = true;
}if ((this.waveform == 2 || ow == 2) && this.waveform != ow) ei.newDialog = true;
this.setPoints ();
}if (n == 4) this.phaseShift = ei.value * 3.141592653589793 / 180;
if (n == 5) this.dutyCycle = ei.value * .01;
}, "~N,test.Circuit.EditInfo");
Clazz.defineStatics (c$,
"FLAG_COS", 2,
"WF_DC", 0,
"WF_AC", 1,
"WF_SQUARE", 2,
"WF_TRIANGLE", 3,
"WF_SAWTOOTH", 4,
"WF_PULSE", 5,
"WF_VAR", 6);
});
