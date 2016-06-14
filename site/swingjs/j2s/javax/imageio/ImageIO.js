Clazz.declarePackage ("javax.imageio");
Clazz.load (["java.lang.Boolean"], "javax.imageio.ImageIO", ["java.awt.Toolkit", "java.io.BufferedInputStream", "javax.imageio.stream.ImageInputStream", "swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (javax.imageio, "ImageIO");
c$.setUseCache = Clazz.defineMethod (c$, "setUseCache", 
function (useCache) {
}, "~B");
c$.getUseCache = Clazz.defineMethod (c$, "getUseCache", 
function () {
return false;
});
c$.setCacheDirectory = Clazz.defineMethod (c$, "setCacheDirectory", 
function (cacheDirectory) {
}, "java.io.File");
c$.getCacheDirectory = Clazz.defineMethod (c$, "getCacheDirectory", 
function () {
return null;
});
c$.getReaderFormatNames = Clazz.defineMethod (c$, "getReaderFormatNames", 
function () {
return javax.imageio.ImageIO.readerFormatNames;
});
c$.getReaderMIMETypes = Clazz.defineMethod (c$, "getReaderMIMETypes", 
function () {
return javax.imageio.ImageIO.readerTypes;
});
c$.getReaderFileSuffixes = Clazz.defineMethod (c$, "getReaderFileSuffixes", 
function () {
return javax.imageio.ImageIO.readerSuffixes;
});
c$.read = Clazz.defineMethod (c$, "read", 
function (input) {
return javax.imageio.ImageIO.read (javax.imageio.ImageIO.createImageInputStream (input));
}, "java.io.InputStream");
c$.createImageInputStream = Clazz.defineMethod (c$, "createImageInputStream", 
 function (input) {
var data = swingjs.JSToolkit.getSignedStreamBytes ( new java.io.BufferedInputStream (input));
return  new javax.imageio.stream.ImageInputStream (data);
}, "java.io.InputStream");
c$.read = Clazz.defineMethod (c$, "read", 
function (input) {
return javax.imageio.ImageIO.read (javax.imageio.ImageIO.createImageInputStream (input.openStream ()));
}, "java.net.URL");
c$.read = Clazz.defineMethod (c$, "read", 
function (stream) {
return java.awt.Toolkit.getDefaultToolkit ().createImage (stream.getBuf ());
}, "javax.imageio.stream.ImageInputStream");
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.useCache = false;
this.hasPermission = null;
Clazz.instantialize (this, arguments);
}, javax.imageio.ImageIO, "CacheInfo");
Clazz.prepareFields (c$, function () {
this.hasPermission = Boolean.TRUE;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getUseCache", 
function () {
return this.useCache;
});
Clazz.defineMethod (c$, "setUseCache", 
function (a) {
this.useCache = a;
}, "~B");
Clazz.defineMethod (c$, "getCacheDirectory", 
function () {
return null;
});
Clazz.defineMethod (c$, "setCacheDirectory", 
function (a) {
swingjs.JSToolkit.notImplemented (null);
}, "java.io.File");
Clazz.defineMethod (c$, "getHasPermission", 
function () {
return this.hasPermission;
});
Clazz.defineMethod (c$, "setHasPermission", 
function (a) {
this.hasPermission = a;
}, "Boolean");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"PNG", 0,
"JPG", 1,
"GIF", 2,
"BMP", 3,
"readerTypes", ["image/png", "image/jpeg", "image/x-png", "image/vnd.wap.wbmp", "image/gif", "image/bmp"]);
c$.readerMap = c$.prototype.readerMap = [javax.imageio.ImageIO.PNG, javax.imageio.ImageIO.JPG, javax.imageio.ImageIO.PNG, javax.imageio.ImageIO.BMP, javax.imageio.ImageIO.GIF, javax.imageio.ImageIO.BMP];
Clazz.defineStatics (c$,
"readerFormatNames", ["jpg", "BMP", "bmp", "JPG", "wbmp", "jpeg", "png", "PNG", "JPEG", "WBMP", "GIF", "gif"],
"readerSuffixes", ["jpg", "bmp", "jpeg", "wbmp", "png", "gif"]);
});
