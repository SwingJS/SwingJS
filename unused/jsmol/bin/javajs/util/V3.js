Clazz.declarePackage ("javajs.util");
Clazz.load (["javajs.util.T3"], "javajs.util.V3", null, function () {
c$ = Clazz.declareType (javajs.util, "V3", javajs.util.T3);
Clazz.makeConstructor (c$, 
function () {
});
c$.newV = Clazz.defineMethod (c$, "newV", 
function (t) {
return javajs.util.V3.new3 (t.x, t.y, t.z);
}, "javajs.util.T3");
c$.newVsub = Clazz.defineMethod (c$, "newVsub", 
function (t1, t2) {
return javajs.util.V3.new3 (t1.x - t2.x, t1.y - t2.y, t1.z - t2.z);
}, "javajs.util.T3,javajs.util.T3");
c$.new3 = Clazz.defineMethod (c$, "new3", 
function (x, y, z) {
var v =  new javajs.util.V3 ();
v.x = x;
v.y = y;
v.z = z;
return v;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "angle", 
function (v1) {
var xx = this.y * v1.z - this.z * v1.y;
var yy = this.z * v1.x - this.x * v1.z;
var zz = this.x * v1.y - this.y * v1.x;
var cross = Math.sqrt (xx * xx + yy * yy + zz * zz);
return Math.abs (Math.atan2 (cross, this.dot (v1)));
}, "javajs.util.V3");
});
