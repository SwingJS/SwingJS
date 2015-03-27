Clazz.declarePackage ("javajs.util");
Clazz.load (["javajs.util.T3i"], "javajs.util.P3i", null, function () {
c$ = Clazz.declareType (javajs.util, "P3i", javajs.util.T3i);
c$.new3 = Clazz.defineMethod (c$, "new3", 
function (x, y, z) {
var pt =  new javajs.util.P3i ();
pt.x = x;
pt.y = y;
pt.z = z;
return pt;
}, "~N,~N,~N");
});
