Clazz.declarePackage ("javajs.util");
c$ = Clazz.declareType (javajs.util, "DebugJS");
c$._ = Clazz.defineMethod (c$, "_", 
function (msg) {
{
if (Clazz._debugging) {
debugger;
}
}}, "~S");
