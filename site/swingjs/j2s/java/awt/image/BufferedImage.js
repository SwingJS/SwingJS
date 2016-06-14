Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.Image", "$.Transparency"], "java.awt.image.BufferedImage", ["java.awt.Image", "java.lang.IllegalArgumentException", "$.NullPointerException", "java.util.Hashtable", "java.awt.GraphicsEnvironment", "$.Point", "$.Rectangle", "java.awt.image.ColorModel", "$.DirectColorModel", "$.Raster", "jssun.awt.image.OffScreenImageSource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.imageType = 0;
this.colorModel = null;
this.raster = null;
this.osis = null;
this.properties = null;
this.$isAlphaPremultiplied = false;
Clazz.instantialize (this, arguments);
}, java.awt.image, "BufferedImage", java.awt.Image, java.awt.Transparency);
Clazz.makeConstructor (c$, 
function (width, height, imageType) {
Clazz.superConstructor (this, java.awt.image.BufferedImage, []);
switch (imageType) {
case 1:
{
this.colorModel =  new java.awt.image.DirectColorModel (24, 0x00ff0000, 0x0000ff00, 0x000000ff, 0x0);
this.raster = this.colorModel.createCompatibleWritableRaster (width, height);
}break;
case 2:
{
this.colorModel = java.awt.image.ColorModel.getRGBdefault ();
this.raster = this.colorModel.createCompatibleWritableRaster (width, height);
}break;
default:
throw  new IllegalArgumentException ("Unknown image type " + imageType);
}
this.imageType = imageType;
}, "~N,~N,~N");
Clazz.makeConstructor (c$, 
function (cm, raster, isRasterPremultiplied, properties) {
Clazz.superConstructor (this, java.awt.image.BufferedImage, []);
if ((raster.minX != 0) || (raster.minY != 0)) {
throw  new IllegalArgumentException ("Raster " + raster + " has minX or minY not equal to zero: " + raster.minX + " " + raster.minY);
}this.colorModel = cm;
this.raster = raster;
this.properties = properties;
var cs;
cs = cm.getColorSpace ();
}, "java.awt.image.ColorModel,java.awt.image.WritableRaster,~B,java.util.Hashtable");
Clazz.defineMethod (c$, "getType", 
function () {
return this.imageType;
});
Clazz.defineMethod (c$, "getColorModel", 
function () {
return this.colorModel;
});
Clazz.defineMethod (c$, "getRaster", 
function () {
return this.raster;
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
return this.raster.getWidth ();
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.raster.getHeight ();
});
Clazz.defineMethod (c$, "getWidth", 
function (observer) {
return this.raster.getWidth ();
}, "java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "getHeight", 
function (observer) {
return this.raster.getHeight ();
}, "java.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "getSource", 
function () {
if (this.osis == null) {
if (this.properties == null) {
this.properties =  new java.util.Hashtable ();
}this.osis =  new jssun.awt.image.OffScreenImageSource (this, this.properties);
}return this.osis;
});
Clazz.defineMethod (c$, "getProperty", 
function (name, observer) {
return this.getProperty (name);
}, "~S,java.awt.image.ImageObserver");
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
var env = java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment ();
return env.createGraphics (this);
});
Clazz.defineMethod (c$, "getSubimage", 
function (x, y, w, h) {
return  new java.awt.image.BufferedImage (this.colorModel, this.raster.createWritableChild (x, y, w, h, 0, 0, null), this.colorModel.isAlphaPremultiplied (), this.properties);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "isAlphaPremultiplied", 
function () {
return false;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return  String.instantialize ("BufferedImage@" + Integer.toHexString (this.hashCode ()) + ": type = " + this.imageType + " " + this.colorModel + " " + this.raster);
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
return this.raster.getMinX ();
});
Clazz.defineMethod (c$, "getMinY", 
function () {
return this.raster.getMinY ();
});
Clazz.defineMethod (c$, "getSampleModel", 
function () {
return this.raster.getSampleModel ();
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
Clazz.defineMethod (c$, "getTileWidth", 
function () {
return this.raster.getWidth ();
});
Clazz.defineMethod (c$, "getTileHeight", 
function () {
return this.raster.getHeight ();
});
Clazz.defineMethod (c$, "getTileGridXOffset", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getTileGridYOffset", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getTile", 
function (tileX, tileY) {
return this.raster;
}, "~N,~N");
Clazz.defineMethod (c$, "getData", 
function () {
var width = this.raster.getWidth ();
var height = this.raster.getHeight ();
var startX = this.raster.getMinX ();
var startY = this.raster.getMinY ();
var wr = java.awt.image.Raster.createWritableRaster (this.raster.getSampleModel (),  new java.awt.Point (this.raster.getSampleModelTranslateX (), this.raster.getSampleModelTranslateY ()));
var tdata = null;
for (var i = startY; i < startY + height; i++) {
tdata = this.raster.getDataElements (startX, i, width, 1, tdata);
wr.setDataElements (startX, i, width, 1, tdata);
}
return wr;
});
Clazz.defineMethod (c$, "getData", 
function (rect) {
var sm = this.raster.getSampleModel ();
var nsm = sm.createCompatibleSampleModel (rect.width, rect.height);
var wr = java.awt.image.Raster.createWritableRaster (nsm, rect.getLocation ());
var width = rect.width;
var height = rect.height;
var startX = rect.x;
var startY = rect.y;
var tdata = null;
for (var i = startY; i < startY + height; i++) {
tdata = this.raster.getDataElements (startX, i, width, 1, tdata);
wr.setDataElements (startX, i, width, 1, tdata);
}
return wr;
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "copyData", 
function (outRaster) {
if (outRaster == null) {
return this.getData ();
}var width = outRaster.getWidth ();
var height = outRaster.getHeight ();
var startX = outRaster.getMinX ();
var startY = outRaster.getMinY ();
var tdata = null;
for (var i = startY; i < startY + height; i++) {
tdata = this.raster.getDataElements (startX, i, width, 1, tdata);
outRaster.setDataElements (startX, i, width, 1, tdata);
}
return outRaster;
}, "java.awt.image.WritableRaster");
Clazz.defineMethod (c$, "setData", 
function (r) {
var width = r.getWidth ();
var height = r.getHeight ();
var startX = r.getMinX ();
var startY = r.getMinY ();
var tdata = null;
var rclip =  new java.awt.Rectangle (startX, startY, width, height);
var bclip =  new java.awt.Rectangle (0, 0, this.raster.width, this.raster.height);
var intersect = rclip.intersection (bclip);
if (intersect.isEmpty ()) {
return;
}width = intersect.width;
height = intersect.height;
startX = intersect.x;
startY = intersect.y;
for (var i = startY; i < startY + height; i++) {
tdata = r.getPixels (startX, i, width, 1, tdata);
this.raster.setPixels (startX, i, width, 1, tdata);
}
}, "java.awt.image.Raster");
Clazz.overrideMethod (c$, "getTransparency", 
function () {
return this.colorModel.getTransparency ();
});
Clazz.defineStatics (c$,
"TYPE_CUSTOM", 0,
"TYPE_INT_RGB", 1,
"TYPE_INT_ARGB", 2);
});
