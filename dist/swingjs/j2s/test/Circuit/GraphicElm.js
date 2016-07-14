Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.GraphicElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "GraphicElm", test.Circuit.CircuitElm);
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 0;
});
});
