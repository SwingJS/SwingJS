Clazz.declarePackage ("jssun.java2d");
Clazz.load (["java.awt.CompositeContext"], "jssun.java2d.SunCompositeContext", ["java.lang.NullPointerException", "java.awt.image.BufferedImage", "$.WritableRaster", "jssun.java2d.loops.CompositeType"], function () {
c$ = Clazz.decorateAsClass (function () {
this.srcCM = null;
this.dstCM = null;
this.composite = null;
this.comptype = null;
Clazz.instantialize (this, arguments);
}, jssun.java2d, "SunCompositeContext", null, java.awt.CompositeContext);
Clazz.makeConstructor (c$, 
function (ac, s, d) {
if (s == null) {
throw  new NullPointerException ("Source color model cannot be null");
}if (d == null) {
throw  new NullPointerException ("Destination color model cannot be null");
}this.srcCM = s;
this.dstCM = d;
this.composite = ac;
this.comptype = jssun.java2d.loops.CompositeType.forAlphaComposite (ac);
}, "java.awt.AlphaComposite,java.awt.image.ColorModel,java.awt.image.ColorModel");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.overrideMethod (c$, "compose", 
function (srcArg, dstIn, dstOut) {
var src;
var w;
var h;
if (dstIn !== dstOut) {
dstOut.setDataElementsRaster (0, 0, dstIn);
}if (Clazz.instanceOf (srcArg, java.awt.image.WritableRaster)) {
src = srcArg;
} else {
src = srcArg.createCompatibleWritableRaster ();
src.setDataElements (0, 0, srcArg);
}w = Math.min (src.getWidth (), dstIn.getWidth ());
h = Math.min (src.getHeight (), dstIn.getHeight ());
var srcImg =  new java.awt.image.BufferedImage (this.srcCM, src, this.srcCM.isAlphaPremultiplied (), null);
var dstImg =  new java.awt.image.BufferedImage (this.dstCM, dstOut, this.dstCM.isAlphaPremultiplied (), null);
}, "java.awt.image.Raster,java.awt.image.Raster,java.awt.image.WritableRaster");
});
