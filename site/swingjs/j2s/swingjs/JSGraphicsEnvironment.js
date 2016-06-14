Clazz.declarePackage ("swingjs");
Clazz.load (["java.awt.GraphicsEnvironment"], "swingjs.JSGraphicsEnvironment", ["swingjs.JSGraphics2D", "$.JSToolkit", "swingjs.api.DOMNode"], function () {
c$ = Clazz.declareType (swingjs, "JSGraphicsEnvironment", java.awt.GraphicsEnvironment);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.JSGraphicsEnvironment, []);
System.out.println ("JSGraphicsEnvironment initialized");
});
Clazz.overrideMethod (c$, "createGraphics", 
function (img) {
return this.createGraphicsSized (img, img.getWidth (), img.getHeight ());
}, "java.awt.image.BufferedImage");
Clazz.defineMethod (c$, "createGraphicsSized", 
function (img, width, height) {
var g = null;
{
g = img._g;
}if (g == null) {
var canvas = swingjs.api.DOMNode.createElement ("canvas", "img" + System.currentTimeMillis ());
{
canvas.width = width;
canvas.height = height;
img._canvas = canvas;
}g =  new swingjs.JSGraphics2D (canvas);
{
img._g = g;
}}return g;
}, "~O,~N,~N");
Clazz.overrideMethod (c$, "getAllFonts", 
function () {
return null;
});
Clazz.defineMethod (c$, "getAvailableFontFamilyNames", 
function () {
return null;
});
Clazz.defineMethod (c$, "getAvailableFontFamilyNames", 
function (l) {
return null;
}, "java.util.Locale");
Clazz.overrideMethod (c$, "getDefaultScreenDevice", 
function () {
if (swingjs.JSGraphicsEnvironment.device == null) swingjs.JSGraphicsEnvironment.device = swingjs.JSToolkit.getInstance ("swingjs.JSScreenDevice");
return swingjs.JSGraphicsEnvironment.device;
});
Clazz.defineStatics (c$,
"device", null);
});
