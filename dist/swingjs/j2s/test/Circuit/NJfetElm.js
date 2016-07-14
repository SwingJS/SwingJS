Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.JfetElm"], ["test.Circuit.PJfetElm", "$.NJfetElm"], null, function () {
c$ = Clazz.declareType (test.Circuit, "NJfetElm", test.Circuit.JfetElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.NJfetElm, [xx, yy, false]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.JfetElm;
});
c$ = Clazz.declareType (test.Circuit, "PJfetElm", test.Circuit.JfetElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.PJfetElm, [xx, yy, true]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.JfetElm;
});
});
