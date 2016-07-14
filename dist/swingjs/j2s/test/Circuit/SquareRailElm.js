Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.RailElm"], "test.Circuit.SquareRailElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "SquareRailElm", test.Circuit.RailElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.SquareRailElm, [xx, yy, 2]);
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
