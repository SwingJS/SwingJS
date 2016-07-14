Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.OrGateElm"], "test.Circuit.XorGateElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "XorGateElm", test.Circuit.OrGateElm);
Clazz.overrideMethod (c$, "getGateName", 
function () {
return "XOR gate";
});
Clazz.overrideMethod (c$, "calcFunction", 
function () {
var i;
var f = false;
for (i = 0; i != this.inputCount; i++) f = new Boolean (f ^ this.getInput (i)).valueOf ();

return f;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 154;
});
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return '4';
});
});
