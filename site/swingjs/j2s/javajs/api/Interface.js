Clazz.declarePackage ("javajs.api");
c$ = Clazz.declareType (javajs.api, "Interface");
c$.getInterface = Clazz.defineMethod (c$, "getInterface", 
function (name) {
try {
var x = Class.forName (name);
return (x == null ? null : x.newInstance ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("Interface.java Error creating instance for " + name + ": \n" + e);
return null;
} else {
throw e;
}
}
}, "~S");
