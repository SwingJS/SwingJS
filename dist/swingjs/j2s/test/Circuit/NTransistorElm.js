Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.TransistorElm"], "test.Circuit.NTransistorElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "NTransistorElm", test.Circuit.TransistorElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.NTransistorElm, [xx, yy, false]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.TransistorElm;
});
});
