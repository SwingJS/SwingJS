Clazz.declarePackage ("javajs.util");
Clazz.load (["javajs.util.T4"], "javajs.util.P4", null, function () {
c$ = Clazz.declareType (javajs.util, "P4", javajs.util.T4);
c$.new4 = Clazz.defineMethod (c$, "new4", 
function (x, y, z, w) {
var pt =  new javajs.util.P4 ();
pt.set4 (x, y, z, w);
return pt;
}, "~N,~N,~N,~N");
c$.newPt = Clazz.defineMethod (c$, "newPt", 
function (value) {
var pt =  new javajs.util.P4 ();
pt.set4 (value.x, value.y, value.z, value.w);
return pt;
}, "javajs.util.P4");
Clazz.defineMethod (c$, "distance4", 
function (p1) {
var dx = this.x - p1.x;
var dy = this.y - p1.y;
var dz = this.z - p1.z;
var dw = this.w - p1.w;
return Math.sqrt (dx * dx + dy * dy + dz * dz + dw * dw);
}, "javajs.util.P4");
});
