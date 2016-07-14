Clazz.declarePackage ("swingjs");
Clazz.load (["java.awt.image.BufferedImage"], "swingjs.JSImage", ["JU.Base64", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.typeRequested = 0;
this._imgNode = null;
this.width = 0;
this.height = 0;
Clazz.instantialize (this, arguments);
}, swingjs, "JSImage", java.awt.image.BufferedImage);
Clazz.makeConstructor (c$, 
function (argb, width, height) {
Clazz.superConstructor (this, swingjs.JSImage, [width, height, 2]);
this.width = width;
this.height = height;
this._pix = argb;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "toIntARGB", 
function (imgData) {
var n = Clazz.doubleToInt (imgData.length / 4);
var iData =  Clazz.newIntArray (n, 0);
for (var i = 0, j = 0; i < n; j++) iData[i++] = (imgData[j++] << 16) | (imgData[j++] << 8) | imgData[j++] | 0xFF000000;

return iData;
}, "~A");
Clazz.defineMethod (c$, "getDOMImage", 
function (b, type) {
var dataurl = "data:image/" + type + ";base64," + JU.Base64.getBase64 (b).toString ();
var me = this;
var img = null;
{
img = new Image(this.width, this.height);
//img.onLoad = function() { me.setDOMImage(img); };
img.src = dataurl;
}this.setDOMImage (img);
}, "~A,~S");
Clazz.defineMethod (c$, "setDOMImage", 
function (img) {
var canvas = swingjs.api.DOMNode.createElement ("canvas", "JSImage", []);
var w = this.width;
var h = this.height;
this._imgNode = img;
{
canvas.width = w;
canvas.height = h;
var ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0, w, h);
var data = ctx.getImageData(0, 0, w, h).data;
img._pbuf32 = this.toIntARGB(data);
}}, "swingjs.api.DOMNode");
Clazz.defineMethod (c$, "getHeight", 
function (o) {
return this.height;
}, "java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "getWidth", 
function (o) {
return this.width;
}, "java.awt.image.ImageObserver");
});
