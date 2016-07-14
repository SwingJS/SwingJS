Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.MosfetElm"], "test.Circuit.PMosfetElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "PMosfetElm", test.Circuit.MosfetElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.PMosfetElm, [xx, yy, true]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.MosfetElm;
});
});
