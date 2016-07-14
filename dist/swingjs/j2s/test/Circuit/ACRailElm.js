Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.RailElm"], "test.Circuit.ACRailElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "ACRailElm", test.Circuit.RailElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.ACRailElm, [xx, yy, 1]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.RailElm;
});
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 0;
});
});
