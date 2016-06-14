Clazz.declarePackage ("java.awt");
Clazz.load (null, "java.awt.GraphicsConfiguration", ["java.lang.IllegalArgumentException", "java.awt.AWTException", "java.awt.image.BufferedImage", "jssun.awt.image.SunVolatileImage"], function () {
c$ = Clazz.declareType (java.awt, "GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "createCompatibleImage", 
function (width, height, transparency) {
if (this.getColorModel ().getTransparency () == transparency) {
return this.createCompatibleImage (width, height);
}var cm = this.getColorModel (transparency);
if (cm == null) {
throw  new IllegalArgumentException ("Unknown transparency: " + transparency);
}var wr = cm.createCompatibleWritableRaster (width, height);
return  new java.awt.image.BufferedImage (cm, wr, cm.isAlphaPremultiplied (), null);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "createCompatibleVolatileImage", 
function (width, height) {
var vi = null;
try {
vi = this.createCompatibleVolatileImage (width, height, null, 1);
} catch (e) {
if (Clazz.exceptionOf (e, java.awt.AWTException)) {
} else {
throw e;
}
}
return vi;
}, "~N,~N");
Clazz.defineMethod (c$, "createCompatibleVolatileImage", 
function (width, height, transparency) {
var vi = null;
try {
vi = this.createCompatibleVolatileImage (width, height, null, transparency);
} catch (e) {
if (Clazz.exceptionOf (e, java.awt.AWTException)) {
} else {
throw e;
}
}
return vi;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "createCompatibleVolatileImage", 
function (width, height, caps, transparency) {
var vi =  new jssun.awt.image.SunVolatileImage (this, width, height, transparency, caps);
if (caps != null && caps.isAccelerated () && !vi.getCapabilities ().isAccelerated ()) {
throw  new java.awt.AWTException ("Supplied image capabilities could not be met by this graphics configuration.");
}return vi;
}, "~N,~N,java.awt.ImageCapabilities,~N");
Clazz.defineMethod (c$, "isTranslucencyCapable", 
function () {
return false;
});
});
