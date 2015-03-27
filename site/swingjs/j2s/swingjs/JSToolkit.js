Clazz.declarePackage ("swingjs");
Clazz.load (["jsjava.awt.Toolkit"], "swingjs.JSToolkit", ["jsjava.awt.Dimension"], function () {
c$ = Clazz.declareType (swingjs, "JSToolkit", jsjava.awt.Toolkit);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.JSToolkit, []);
System.out.println ("JSToolkit initialized");
});
Clazz.overrideMethod (c$, "getScreenSize", 
function () {
var d =  new jsjava.awt.Dimension (0, 0);
{
d.setSize(Jmol.$(window).width, Jmol.$(window).height));
return d;
}});
Clazz.overrideMethod (c$, "getScreenResolution", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getColorModel", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getFontList", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font) {
return null;
}, "jsjava.awt.Font");
Clazz.overrideMethod (c$, "sync", 
function () {
});
Clazz.defineMethod (c$, "getImage", 
function (filename) {
return this.getImageObj (filename);
}, "~S");
Clazz.defineMethod (c$, "getImage", 
function (url) {
return this.getImageObj (url);
}, "java.net.URL");
Clazz.defineMethod (c$, "getImageObj", 
($fz = function (nameOrURL) {
return null;
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "createImage", 
function (filename) {
return null;
}, "~S");
Clazz.defineMethod (c$, "createImage", 
function (url) {
return null;
}, "java.net.URL");
Clazz.overrideMethod (c$, "prepareImage", 
function (image, width, height, observer) {
return false;
}, "jsjava.awt.Image,~N,~N,jsjava.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "checkImage", 
function (image, width, height, observer) {
return 0;
}, "jsjava.awt.Image,~N,~N,jsjava.awt.image.ImageObserver");
Clazz.defineMethod (c$, "createImage", 
function (producer) {
return null;
}, "jsjava.awt.image.ImageProducer");
Clazz.defineMethod (c$, "createImage", 
function (imagedata, imageoffset, imagelength) {
return null;
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "getSystemEventQueueImpl", 
function () {
return null;
});
Clazz.overrideMethod (c$, "isModalityTypeSupported", 
function (modalityType) {
return false;
}, "jsjava.awt.Dialog.ModalityType");
Clazz.overrideMethod (c$, "isModalExclusionTypeSupported", 
function (modalExclusionType) {
return false;
}, "jsjava.awt.Dialog.ModalExclusionType");
});
