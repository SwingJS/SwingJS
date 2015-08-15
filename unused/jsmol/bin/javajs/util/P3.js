Clazz.declarePackage ("javajs.util");
Clazz.load (["javajs.util.T3"], "javajs.util.P3", null, function () {
c$ = Clazz.declareType (javajs.util, "P3", javajs.util.T3);
c$.newP = Clazz.defineMethod (c$, "newP", 
function (t) {
var p =  new javajs.util.P3 ();
p.x = t.x;
p.y = t.y;
p.z = t.z;
return p;
}, "javajs.util.T3");
c$.getUnlikely = Clazz.defineMethod (c$, "getUnlikely", 
function () {
return (javajs.util.P3.unlikely == null ? javajs.util.P3.unlikely = javajs.util.P3.new3 (3.141592653589793, 2.718281828459045, (8.539734222673566)) : javajs.util.P3.unlikely);
});
c$.new3 = Clazz.defineMethod (c$, "new3", 
function (x, y, z) {
var p =  new javajs.util.P3 ();
p.x = x;
p.y = y;
p.z = z;
return p;
}, "~N,~N,~N");
Clazz.defineStatics (c$,
"unlikely", null);
});
