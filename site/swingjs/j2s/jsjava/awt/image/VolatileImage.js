Clazz.declarePackage ("jsjava.awt.image");
Clazz.load (["jsjava.awt.Image", "$.Transparency"], "jsjava.awt.image.VolatileImage", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.transparency = 3;
Clazz.instantialize (this, arguments);
}, jsjava.awt.image, "VolatileImage", jsjava.awt.Image, jsjava.awt.Transparency);
Clazz.overrideMethod (c$, "getSource", 
function () {
return this.getSnapshot ().getSource ();
});
Clazz.overrideMethod (c$, "getGraphics", 
function () {
return this.createGraphics ();
});
Clazz.overrideMethod (c$, "getTransparency", 
function () {
return this.transparency;
});
Clazz.defineStatics (c$,
"IMAGE_OK", 0,
"IMAGE_RESTORED", 1,
"IMAGE_INCOMPATIBLE", 2);
});
