Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.MosfetElm"], "test.Circuit.NMosfetElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "NMosfetElm", test.Circuit.MosfetElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.NMosfetElm, [xx, yy, false]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.MosfetElm;
});
});
