Clazz.declarePackage ("jsjava.awt.image.renderable");
c$ = Clazz.decorateAsClass (function () {
this.hints = null;
this.usr2dev = null;
this.aoi = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt.image.renderable, "RenderContext", null, Cloneable);
Clazz.makeConstructor (c$, 
function (usr2dev, aoi, hints) {
this.hints = hints;
this.aoi = aoi;
this.usr2dev = usr2dev.clone ();
}, "jsjava.awt.geom.AffineTransform,jsjava.awt.Shape,jsjava.awt.RenderingHints");
Clazz.makeConstructor (c$, 
function (usr2dev) {
this.construct (usr2dev, null, null);
}, "jsjava.awt.geom.AffineTransform");
Clazz.makeConstructor (c$, 
function (usr2dev, hints) {
this.construct (usr2dev, null, hints);
}, "jsjava.awt.geom.AffineTransform,jsjava.awt.RenderingHints");
Clazz.makeConstructor (c$, 
function (usr2dev, aoi) {
this.construct (usr2dev, aoi, null);
}, "jsjava.awt.geom.AffineTransform,jsjava.awt.Shape");
Clazz.defineMethod (c$, "getRenderingHints", 
function () {
return this.hints;
});
Clazz.defineMethod (c$, "setRenderingHints", 
function (hints) {
this.hints = hints;
}, "jsjava.awt.RenderingHints");
Clazz.defineMethod (c$, "setTransform", 
function (newTransform) {
this.usr2dev = newTransform.clone ();
}, "jsjava.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "preConcatenateTransform", 
function (modTransform) {
this.preConcetenateTransform (modTransform);
}, "jsjava.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "preConcetenateTransform", 
function (modTransform) {
this.usr2dev.preConcatenate (modTransform);
}, "jsjava.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "concatenateTransform", 
function (modTransform) {
this.concetenateTransform (modTransform);
}, "jsjava.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "concetenateTransform", 
function (modTransform) {
this.usr2dev.concatenate (modTransform);
}, "jsjava.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "getTransform", 
function () {
return this.usr2dev.clone ();
});
Clazz.defineMethod (c$, "setAreaOfInterest", 
function (newAoi) {
this.aoi = newAoi;
}, "jsjava.awt.Shape");
Clazz.defineMethod (c$, "getAreaOfInterest", 
function () {
return this.aoi;
});
Clazz.overrideMethod (c$, "clone", 
function () {
var newRenderContext =  new jsjava.awt.image.renderable.RenderContext (this.usr2dev, this.aoi, this.hints);
return newRenderContext;
});
