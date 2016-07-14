Clazz.declarePackage ("test.Circuit");
c$ = Clazz.decorateAsClass (function () {
this.nodes = null;
this.sim = null;
this.leakage = 1e-14;
this.vt = 0;
this.vdcoef = 0;
this.fwdrop = 0;
this.zvoltage = 0;
this.zoffset = 0;
this.lastvoltdiff = 0;
this.vcrit = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "Diode");
Clazz.makeConstructor (c$, 
function (s) {
this.sim = s;
this.nodes =  Clazz.newIntArray (2, 0);
}, "test.Circuit.CirSim");
Clazz.defineMethod (c$, "setup", 
function (fw, zv) {
this.fwdrop = fw;
this.zvoltage = zv;
this.vdcoef = Math.log (1 / this.leakage + 1) / this.fwdrop;
this.vt = 1 / this.vdcoef;
this.vcrit = this.vt * Math.log (this.vt / (Math.sqrt (2) * this.leakage));
if (this.zvoltage == 0) this.zoffset = 0;
 else {
var i = -0.005;
this.zoffset = this.zvoltage - Math.log (-(1 + i / this.leakage)) / this.vdcoef;
}}, "~N,~N");
Clazz.defineMethod (c$, "reset", 
function () {
this.lastvoltdiff = 0;
});
Clazz.defineMethod (c$, "limitStep", 
function (vnew, vold) {
var arg;
var oo = vnew;
if (vnew > this.vcrit && Math.abs (vnew - vold) > (this.vt + this.vt)) {
if (vold > 0) {
arg = 1 + (vnew - vold) / this.vt;
if (arg > 0) {
vnew = vold + this.vt * Math.log (arg);
var v0 = Math.log (1e-6 / this.leakage) * this.vt;
vnew = Math.max (v0, vnew);
} else {
vnew = this.vcrit;
}} else {
vnew = this.vt * Math.log (vnew / this.vt);
}this.sim.converged = false;
} else if (vnew < 0 && this.zoffset != 0) {
vnew = -vnew - this.zoffset;
vold = -vold - this.zoffset;
if (vnew > this.vcrit && Math.abs (vnew - vold) > (this.vt + this.vt)) {
if (vold > 0) {
arg = 1 + (vnew - vold) / this.vt;
if (arg > 0) {
vnew = vold + this.vt * Math.log (arg);
var v0 = Math.log (1e-6 / this.leakage) * this.vt;
vnew = Math.max (v0, vnew);
} else {
vnew = this.vcrit;
}} else {
vnew = this.vt * Math.log (vnew / this.vt);
}this.sim.converged = false;
}vnew = -(vnew + this.zoffset);
}return vnew;
}, "~N,~N");
Clazz.defineMethod (c$, "stamp", 
function (n0, n1) {
this.nodes[0] = n0;
this.nodes[1] = n1;
this.sim.stampNonLinear (this.nodes[0]);
this.sim.stampNonLinear (this.nodes[1]);
}, "~N,~N");
Clazz.defineMethod (c$, "doStep", 
function (voltdiff) {
if (Math.abs (voltdiff - this.lastvoltdiff) > .01) this.sim.converged = false;
voltdiff = this.limitStep (voltdiff, this.lastvoltdiff);
this.lastvoltdiff = voltdiff;
if (voltdiff >= 0 || this.zvoltage == 0) {
var eval = Math.exp (voltdiff * this.vdcoef);
if (voltdiff < 0) eval = 1;
var geq = this.vdcoef * this.leakage * eval;
var nc = (eval - 1) * this.leakage - geq * voltdiff;
this.sim.stampConductance (this.nodes[0], this.nodes[1], geq);
this.sim.stampCurrentSource (this.nodes[0], this.nodes[1], nc);
} else {
var geq = this.leakage * this.vdcoef * (Math.exp (voltdiff * this.vdcoef) + Math.exp ((-voltdiff - this.zoffset) * this.vdcoef));
var nc = this.leakage * (Math.exp (voltdiff * this.vdcoef) - Math.exp ((-voltdiff - this.zoffset) * this.vdcoef) - 1) + geq * (-voltdiff);
this.sim.stampConductance (this.nodes[0], this.nodes[1], geq);
this.sim.stampCurrentSource (this.nodes[0], this.nodes[1], nc);
}}, "~N");
Clazz.defineMethod (c$, "calculateCurrent", 
function (voltdiff) {
if (voltdiff >= 0 || this.zvoltage == 0) return this.leakage * (Math.exp (voltdiff * this.vdcoef) - 1);
return this.leakage * (Math.exp (voltdiff * this.vdcoef) - Math.exp ((-voltdiff - this.zoffset) * this.vdcoef) - 1);
}, "~N");
