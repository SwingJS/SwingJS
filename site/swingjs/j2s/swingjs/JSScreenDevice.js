Clazz.declarePackage ("swingjs");
Clazz.load (["java.awt.GraphicsDevice"], "swingjs.JSScreenDevice", ["swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (swingjs, "JSScreenDevice", java.awt.GraphicsDevice);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.JSScreenDevice, []);
System.out.println ("JSScreenDevice initialized");
});
Clazz.overrideMethod (c$, "getType", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getIDstring", 
function () {
return "swingjs.JSScreenDevice";
});
Clazz.overrideMethod (c$, "getConfigurations", 
function () {
return [swingjs.JSToolkit.getGraphicsConfiguration ()];
});
Clazz.overrideMethod (c$, "getDefaultConfiguration", 
function () {
return swingjs.JSToolkit.getGraphicsConfiguration ();
});
});
