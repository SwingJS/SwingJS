Clazz.declarePackage ("swingjs");
Clazz.load (["java.awt.image.ImageConsumer"], "swingjs.JSImagekit", ["JU.AU", "swingjs.JSImage", "$.JSToolkit", "swingjs.api.Interface"], function () {
c$ = Clazz.decorateAsClass (function () {
this.width = 0;
this.height = 0;
this.props = null;
this.colorModel = null;
this.hints = 0;
this.x = 0;
this.y = 0;
this.off = 0;
this.scansize = 0;
this.pixels = null;
this.jsimage = null;
this.pixelBytes = null;
Clazz.instantialize (this, arguments);
}, swingjs, "JSImagekit", null, java.awt.image.ImageConsumer);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "createImageFromBytes", 
function (data, imageoffset, imagelength) {
return swingjs.JSImagekit.createImageFromBytesStatic (data, imageoffset, imagelength);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "imageComplete", 
function (status) {
this.jsimage =  new swingjs.JSImage (this.pixels, this.width, this.height);
}, "~N");
Clazz.defineMethod (c$, "getCreatedImage", 
function () {
return this.jsimage;
});
Clazz.overrideMethod (c$, "setDimensions", 
function (width, height) {
this.width = width;
this.height = height;
}, "~N,~N");
Clazz.overrideMethod (c$, "setProperties", 
function (props) {
this.props = props;
}, "java.util.Hashtable");
Clazz.overrideMethod (c$, "setColorModel", 
function (model) {
this.colorModel = model;
}, "java.awt.image.ColorModel");
Clazz.overrideMethod (c$, "setHints", 
function (hintflags) {
this.hints = hintflags;
}, "~N");
Clazz.defineMethod (c$, "setPixels", 
function (x, y, w, h, model, pixels, off, scansize) {
this.colorModel = model;
this.width = w;
this.height = h;
this.x = x;
this.y = y;
this.off = off;
this.scansize = scansize;
var isBytes = JU.AU.isAB (pixels);
{
if (isBytes) {this.pixelBytes = pixels} else {this.pixels = pixels};
}if (isBytes) swingjs.JSToolkit.notImplemented ("byte-based image pixels");
}, "~N,~N,~N,~N,java.awt.image.ColorModel,~A,~N,~N");
c$.createImageFromBytesStatic = Clazz.defineMethod (c$, "createImageFromBytesStatic", 
 function (data, imageoffset, imagelength) {
var w = 0;
var h = 0;
var argb = null;
var b = null;
var type = null;
if (data == null) {
w = imageoffset;
h = imagelength;
} else {
if (imagelength < 0) imagelength = data.length;
var n = imagelength - imageoffset;
System.arraycopy (data, imageoffset, b =  Clazz.newByteArray (n, 0), 0, n);
if (b.length < 54) return null;
switch (swingjs.JSImagekit.getSourceType (b)) {
case 3:
var ie = swingjs.api.Interface.getInstance ("javajs.img.BMPDecoder", true);
var o = ie.decodeWindowsBMP (b);
if (o == null || o[0] == null) return null;
w = (o[1]).intValue ();
h = (o[2]).intValue ();
argb = o[0];
break;
case 1:
var pt = 2;
while (true) {
switch (swingjs.JSImagekit.getInt (b, pt)) {
case 49407:
case 49919:
h = swingjs.JSImagekit.getIntRev (b, pt + 5);
w = swingjs.JSImagekit.getIntRev (b, pt + 7);
pt = 0;
break;
}
if (pt == 0) break;
pt += 2 + swingjs.JSImagekit.getIntRev (b, pt + 2);
}
type = "jpeg";
break;
case 0:
w = swingjs.JSImagekit.getLong (b, 16);
h = swingjs.JSImagekit.getLong (b, 20);
type = "png";
break;
case 2:
w = swingjs.JSImagekit.getInt (b, 6);
h = swingjs.JSImagekit.getInt (b, 8);
type = "gif";
break;
case -1:
System.out.println ("JSImagekit: Unknown image type: " + b[0] + " " + b[1] + " " + b[2] + " " + b[3]);
data = null;
break;
}
}if (w == 0 || h == 0) return null;
var jsimage =  new swingjs.JSImage (argb, w, h);
if (data != null && argb == null) jsimage.getDOMImage (b, type);
return jsimage;
}, "~A,~N,~N");
c$.getLong = Clazz.defineMethod (c$, "getLong", 
 function (b, pt) {
return ((b[pt] & 0xFF) << 24) + ((b[pt + 1] & 0xFF) << 16) + ((b[pt + 2] & 0xFF) << 8) + (b[pt + 3] & 0xFF);
}, "~A,~N");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
 function (b, pt) {
return (b[pt] & 0xFF) + ((b[pt + 1] & 0xFF) << 8);
}, "~A,~N");
c$.getIntRev = Clazz.defineMethod (c$, "getIntRev", 
 function (b, pt) {
return ((b[pt] & 0xFF) << 8) + (b[pt + 1] & 0xFF);
}, "~A,~N");
c$.getSourceType = Clazz.defineMethod (c$, "getSourceType", 
 function (b) {
return ((b[0] & 0xFF) == 0x89 && b[1] == 80 && b[2] == 78 && b[3] == 71 ? 0 : (b[0] & 0xFF) == 0xFF && (b[1] & 0xFF) == 0xD8 ? 1 : b[0] == 71 && b[1] == 73 && b[2] == 70 ? 2 : b[0] == 66 && b[1] == 77 ? 3 : -1);
}, "~A");
Clazz.defineStatics (c$,
"UNK", -1,
"PNG", 0,
"JPG", 1,
"GIF", 2,
"BMP", 3,
"JPG_SOF0", 0xC0FF,
"JPG_SOF2", 0xC2FF);
});
