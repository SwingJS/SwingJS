Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.VoltageElm"], "test.Circuit.DCVoltageElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "DCVoltageElm", test.Circuit.VoltageElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.DCVoltageElm, [xx, yy, 0]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.VoltageElm;
});
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'v';
});
});
