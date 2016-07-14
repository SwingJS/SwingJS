Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.VoltageElm"], "test.Circuit.ACVoltageElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "ACVoltageElm", test.Circuit.VoltageElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.ACVoltageElm, [xx, yy, 1]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.VoltageElm;
});
});
