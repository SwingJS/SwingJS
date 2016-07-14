Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.OpAmpElm"], "test.Circuit.OpAmpSwapElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "OpAmpSwapElm", test.Circuit.OpAmpElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.OpAmpSwapElm, [xx, yy]);
this.flags |= 1;
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.OpAmpElm;
});
});
