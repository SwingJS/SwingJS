Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.RailElm"], "test.Circuit.ClockElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "ClockElm", test.Circuit.RailElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.ClockElm, [xx, yy, 2]);
this.maxVoltage = 2.5;
this.bias = 2.5;
this.frequency = 100;
this.flags |= 1;
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
