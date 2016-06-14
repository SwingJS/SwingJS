Clazz.declarePackage ("jssun.awt.image");
Clazz.load (["java.awt.image.VolatileImage"], "jssun.awt.image.SunVolatileImage", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.graphicsConfig = null;
this.width = 0;
this.height = 0;
this.caps = null;
Clazz.instantialize (this, arguments);
}, jssun.awt.image, "SunVolatileImage", java.awt.image.VolatileImage);
Clazz.makeConstructor (c$, 
function (graphicsConfig, width, height, transparency, caps) {
Clazz.superConstructor (this, jssun.awt.image.SunVolatileImage, []);
this.graphicsConfig = graphicsConfig;
this.width = width;
this.height = height;
this.transparency = transparency;
this.caps = caps;
}, "java.awt.GraphicsConfiguration,~N,~N,~N,java.awt.ImageCapabilities");
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "getGraphicsConfig", 
function () {
return this.graphicsConfig;
});
Clazz.overrideMethod (c$, "getSnapshot", 
function () {
return null;
});
Clazz.overrideMethod (c$, "createGraphics", 
function () {
return null;
});
Clazz.overrideMethod (c$, "validate", 
function (gc) {
return 0;
}, "java.awt.GraphicsConfiguration");
Clazz.overrideMethod (c$, "contentsLost", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getCapabilities", 
function () {
return this.caps;
});
Clazz.defineMethod (c$, "getWidth", 
function (observer) {
return 0;
}, "java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "getHeight", 
function (observer) {
return 0;
}, "java.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "getProperty", 
function (name, observer) {
return null;
}, "~S,java.awt.image.ImageObserver");
});
