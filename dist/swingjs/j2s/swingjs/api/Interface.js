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
var x = null;
{
Clazz._isQuiet = isQuiet;
}try {
if (!isQuiet) System.out.println ("swingjs.api.Interface creating instance of " + name);
var y = Clazz._4Name (name);
if (y != null) x = y.newInstance ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("Swingjs.api.Interface Error creating instance for " + name + ": \n" + e);
} else {
throw e;
}
} finally {
{
Clazz._isQuiet = false;
}}
return x;
}, "~S,~B");
