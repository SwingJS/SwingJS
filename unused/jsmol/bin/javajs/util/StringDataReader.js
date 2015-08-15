Clazz.declarePackage ("javajs.util");
Clazz.load (["javajs.util.DataReader"], "javajs.util.StringDataReader", ["java.io.StringReader"], function () {
c$ = Clazz.declareType (javajs.util, "StringDataReader", javajs.util.DataReader);
Clazz.makeConstructor (c$, 
function (data) {
Clazz.superConstructor (this, javajs.util.StringDataReader, [ new java.io.StringReader (data)]);
}, "~S");
Clazz.overrideMethod (c$, "setData", 
function (data) {
return  new javajs.util.StringDataReader (data);
}, "~O");
});
