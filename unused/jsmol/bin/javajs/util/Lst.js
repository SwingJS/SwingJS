Clazz.declarePackage ("javajs.util");
Clazz.load (["java.util.ArrayList"], "javajs.util.Lst", null, function () {
c$ = Clazz.declareType (javajs.util, "Lst", java.util.ArrayList);
Clazz.defineMethod (c$, "addLast", 
function (v) {
{
return this.add1(v);
}}, "~O");
Clazz.defineMethod (c$, "removeObj", 
function (v) {
{
return this.removeObject(v);
}}, "~O");
});
