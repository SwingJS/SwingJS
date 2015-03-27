Clazz.declarePackage ("jsjava.awt.image");
Clazz.load (["jsjava.awt.Image"], "jsjava.awt.image.BufferedImage", ["java.awt.Image", "java.lang.IllegalArgumentException", "$.NullPointerException", "jsjava.awt.GraphicsEnvironment", "jsjava.awt.image.ColorModel", "$.DirectColorModel"], function () {
c$ = Clazz.decorateAsClass (function () {
this.imageType = 0;
this.colorModel = null;
this.properties = null;
this.$isAlphaPremultiplied = false;
Clazz.instantialize (this, arguments);
}, jsjava.awt.image, "BufferedImage", jsjava.awt.Image);
Clazz.makeConstructor (c$, 
function (width, height, imageType) {
Clazz.superConstructor (this, jsjava.awt.image.BufferedImage, []);
switch (imageType) {
case 1:
{
this.colorModel =  new jsjava.awt.image.DirectColorModel (24, 0x00ff0000, 0x0000ff00, 0x000000ff, 0x0);
}break;
case 2:
{
this.colorModel = jsjava.awt.image.ColorModel.getRGBdefault ();
}break;
default:
throw  new IllegalArgumentException ("Unknown image type " + imageType);
}
this.imageType = imageType;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getType", 
function () {
return this.imageType;
});
Clazz.defineMethod (c$, "getColorModel", 
function () {
return this.colorModel;
});
Clazz.defineMethod (c$, "getRGB", 
function (x, y) {
return 0;
}, "~N,~N");
Clazz.defineMethod (c$, "getRGB", 
function (startX, startY, w, h, rgbArray, offset, scansize) {
return rgbArray;
}, "~N,~N,~N,~N,~A,~N,~N");
Clazz.defineMethod (c$, "setRGB", 
function (x, y, rgb) {
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setRGB", 
function (startX, startY, w, h, rgbArray, offset, scansize) {
}, "~N,~N,~N,~N,~A,~N,~N");
Clazz.defineMethod (c$, "getWidth", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getWidth", 
function (observer) {
return 0;
}, "jsjava.awt.image.ImageObserver");
Clazz.defineMethod (c$, "getHeight", 
function (observer) {
return 0;
}, "jsjava.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "getSource", 
function () {
return null;
});
Clazz.defineMethod (c$, "getProperty", 
function (name, observer) {
return this.getProperty (name);
}, "~S,jsjava.awt.image.ImageObserver");
Clazz.defineMethod (c$, "getProperty", 
function (name) {
if (name == null) {
throw  new NullPointerException ("null property name is not allowed");
}if (this.properties == null) {
return java.awt.Image.UndefinedProperty;
}var o = this.properties.get (name);
if (o == null) {
o = java.awt.Image.UndefinedProperty;
}return o;
}, "~S");
Clazz.overrideMethod (c$, "getGraphics", 
function () {
return this.createGraphics ();
});
Clazz.defineMethod (c$, "createGraphics", 
function () {
var env = jsjava.awt.GraphicsEnvironment.getLocalGraphicsEnvironment ();
return env.createGraphics (this);
});
Clazz.defineMethod (c$, "getSubimage", 
function (x, y, w, h) {
return null;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "isAlphaPremultiplied", 
function () {
return false;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return  String.instantialize ("BufferedImage@" + Integer.toHexString (this.hashCode ()) + ": type = " + this.imageType);
});
Clazz.defineMethod (c$, "getSources", 
function () {
return null;
});
Clazz.defineMethod (c$, "getPropertyNames", 
function () {
return null;
});
Clazz.defineMethod (c$, "getMinX", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getMinY", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getNumXTiles", 
function () {
return 1;
});
Clazz.defineMethod (c$, "getNumYTiles", 
function () {
return 1;
});
Clazz.defineMethod (c$, "getMinTileX", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getMinTileY", 
function () {
return 0;
});
Clazz.defineStatics (c$,
"TYPE_CUSTOM", 0,
"TYPE_INT_RGB", 1,
"TYPE_INT_ARGB", 2);
});
