Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.TransistorElm"], "test.Circuit.PTransistorElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "PTransistorElm", test.Circuit.TransistorElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.PTransistorElm, [xx, yy, true]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.TransistorElm;
});
});
