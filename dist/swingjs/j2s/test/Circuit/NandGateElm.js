Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.AndGateElm"], "test.Circuit.NandGateElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "NandGateElm", test.Circuit.AndGateElm);
Clazz.overrideMethod (c$, "isInverting", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getGateName", 
function () {
return "NAND gate";
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 151;
});
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return '@';
});
});
