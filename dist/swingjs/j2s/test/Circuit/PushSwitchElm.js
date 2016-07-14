Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.SwitchElm"], "test.Circuit.PushSwitchElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "PushSwitchElm", test.Circuit.SwitchElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.PushSwitchElm, [xx, yy, true]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.SwitchElm;
});
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 0;
});
});
