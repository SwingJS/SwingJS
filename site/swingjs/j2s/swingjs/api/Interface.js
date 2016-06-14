Clazz.declarePackage ("swingjs.api");
c$ = Clazz.declareType (swingjs.api, "Interface");
c$.getInstanceWithParams = Clazz.defineMethod (c$, "getInstanceWithParams", 
function (name, classes, params) {
try {
var cl = Clazz._4Name (name);
return cl.getConstructor (classes).newInstance (params);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "~S,~A,~A");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (name, isQuiet) {
try {
{
Clazz._isQuiet = isQuiet;
}if (!isQuiet) System.out.println ("swingjs.api.Interface creating instance of " + name);
var x = Clazz._4Name (name);
{
Clazz._isQuiet = false;
}return (x == null ? null : x.newInstance ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("Interface.java Error creating instance for " + name + ": \n" + e);
return null;
} else {
throw e;
}
}
}, "~S,~B");
