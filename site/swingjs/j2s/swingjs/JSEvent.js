Clazz.declarePackage ("swingjs");
Clazz.load (["java.awt.event.InvocationEvent"], "swingjs.JSEvent", null, function () {
c$ = Clazz.declareType (swingjs, "JSEvent", java.awt.event.InvocationEvent);
Clazz.makeConstructor (c$, 
function (t, r) {
Clazz.superConstructor (this, swingjs.JSEvent, [t, 1201, r, null, false]);
}, "swingjs.JSThread,Runnable");
});
