Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.OrGateElm"], "test.Circuit.NorGateElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "NorGateElm", test.Circuit.OrGateElm);
Clazz.overrideMethod (c$, "getGateName", 
function () {
return "NOR gate";
});
Clazz.overrideMethod (c$, "isInverting", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 153;
});
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return '#';
});
});
