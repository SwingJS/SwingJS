Clazz.declarePackage ("swingjs");
Clazz.load (["java.awt.GraphicsConfiguration"], "swingjs.JSGraphicsConfiguration", ["java.awt.GraphicsEnvironment", "$.Rectangle", "java.awt.geom.AffineTransform", "java.awt.image.BufferedImage", "$.ColorModel", "swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (swingjs, "JSGraphicsConfiguration", java.awt.GraphicsConfiguration);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.JSGraphicsConfiguration, []);
System.out.println ("JSGraphicsConfiguration initialized");
});
Clazz.overrideMethod (c$, "getDevice", 
function () {
return java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment ().getDefaultScreenDevice ();
});
Clazz.defineMethod (c$, "createCompatibleImage", 
function (width, height) {
var cm = this.getColorModel ();
var wr = cm.createCompatibleWritableRaster (width, height);
return  new java.awt.image.BufferedImage (cm, wr, false, null);
}, "~N,~N");
Clazz.defineMethod (c$, "getColorModel", 
function () {
return java.awt.image.ColorModel.getRGBdefault ();
});
Clazz.defineMethod (c$, "getColorModel", 
function (transparency) {
return java.awt.image.ColorModel.getRGBdefault ();
}, "~N");
Clazz.overrideMethod (c$, "getDefaultTransform", 
function () {
return  new java.awt.geom.AffineTransform ();
});
Clazz.overrideMethod (c$, "getNormalizingTransform", 
function () {
return  new java.awt.geom.AffineTransform ();
});
Clazz.overrideMethod (c$, "getBounds", 
function () {
var doc = null;
{
doc = document;
}var d = swingjs.JSToolkit.getJQuery ().$ (doc);
return  new java.awt.Rectangle (d.width (), d.height ());
});
});
