Clazz.declarePackage ("swingjs");
Clazz.load (null, "swingjs.JSGraphicsCompositor", ["java.awt.image.BufferedImage", "$.ByteLookupTable", "sun.awt.image.SunWritableRaster", "swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (swingjs, "JSGraphicsCompositor");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setGraphicsCompositeAlpha", 
function (g, alphaRule) {
var s = null;
switch (alphaRule) {
default:
case 3:
s = "source-over";
break;
case 5:
s = "source-in";
break;
case 7:
s = "source-out";
break;
case 10:
s = "source-atop";
break;
case 12:
s = "xor";
break;
case 4:
s = "destination-over";
break;
case 6:
s = "destination-in";
break;
case 8:
s = "destination-out";
break;
case 11:
s = "destination-atop";
break;
}
{
g.ctx.globalCompositeOperation = s;
}return true;
}, "swingjs.JSGraphics2D,~N");
Clazz.defineMethod (c$, "drawImageOp", 
function (g, img, op, x, y) {
var type = 0;
{
type = op.swingJStype;
}switch (type) {
case 'R':
var rop = op;
var offsets = rop.offsets;
var scaleFactors = rop.scaleFactors;
var canDo = (offsets.length == 4 && offsets[3] == 0);
if (canDo) for (var i = 0; i < 3; i++) if (offsets[i] != 0 || scaleFactors[i] != 1) {
canDo = false;
break;
}
if (canDo) {
g.setAlpha (scaleFactors[3]);
g.drawImage (img, x, y, null);
g.setAlpha (1);
return true;
}break;
case 'L':
break;
case 'A':
break;
case 'C':
break;
}
return false;
}, "swingjs.JSGraphics2D,java.awt.image.BufferedImage,java.awt.image.BufferedImageOp,~N,~N");
Clazz.defineMethod (c$, "filterRaster", 
function (src, dst, op) {
swingjs.JSToolkit.notImplemented (null);
if (dst == null) {
dst = op.createCompatibleDestRaster (src);
}var retRaster = null;
var type = 0;
{
type = op.swingJStype;
}switch (type) {
case 'L':
var table = (op).getTable ();
if (Clazz.instanceOf (table, java.awt.image.ByteLookupTable)) {
var bt = table;
if (this.lookupByteRaster (src, dst, bt.getTable ()) > 0) {
retRaster = dst;
}}break;
case 'A':
var bOp = op;
var matrix =  Clazz.newDoubleArray (6, 0);
bOp.getTransform ().getMatrix (matrix);
if (this.transformRaster (src, dst, matrix, bOp.getInterpolationType ()) > 0) {
retRaster = dst;
}break;
case 'C':
var cOp = op;
if (this.convolveRaster (src, dst, cOp.getKernel (), cOp.getEdgeCondition ()) > 0) {
retRaster = dst;
}break;
default:
break;
}
if (retRaster != null) {
sun.awt.image.SunWritableRaster.markDirty (retRaster);
}return retRaster;
}, "java.awt.image.Raster,java.awt.image.WritableRaster,java.awt.image.RasterOp");
Clazz.defineMethod (c$, "convolveRaster", 
 function (src, dst, kernel, edgeCondition) {
return 0;
}, "java.awt.image.Raster,java.awt.image.WritableRaster,java.awt.image.Kernel,~N");
Clazz.defineMethod (c$, "transformRaster", 
 function (src, dst, matrix, interpolationType) {
return 0;
}, "java.awt.image.Raster,java.awt.image.WritableRaster,~A,~N");
Clazz.defineMethod (c$, "lookupByteRaster", 
 function (src, dst, table) {
return 0;
}, "java.awt.image.Raster,java.awt.image.WritableRaster,~A");
Clazz.defineMethod (c$, "filterImage", 
function (src, dst, op) {
swingjs.JSToolkit.notImplemented (null);
var retBI = null;
var type = 0;
{
type = op.swingJStype;
}switch (type) {
case 'L':
var table = (op).getTable ();
if (table.getOffset () != 0) {
return null;
}if (Clazz.instanceOf (table, java.awt.image.ByteLookupTable)) {
var bt = table;
if (this.lookupByteBI (src, dst, bt.getTable ()) > 0) {
retBI = dst;
}}break;
case 'A':
var bOp = op;
var matrix =  Clazz.newDoubleArray (6, 0);
var xform = bOp.getTransform ();
bOp.getTransform ().getMatrix (matrix);
if (this.transformBI (src, dst, matrix, bOp.getInterpolationType ()) > 0) {
retBI = dst;
}break;
case 'C':
var cOp = op;
if (this.convolveBI (src, dst, cOp.getKernel (), cOp.getEdgeCondition ()) > 0) {
retBI = dst;
}break;
default:
break;
}
return retBI;
}, "java.awt.image.BufferedImage,java.awt.image.BufferedImage,java.awt.image.BufferedImageOp");
Clazz.defineMethod (c$, "convolveBI", 
 function (src, dst, kernel, edgeCondition) {
return 0;
}, "java.awt.image.BufferedImage,java.awt.image.BufferedImage,java.awt.image.Kernel,~N");
Clazz.defineMethod (c$, "transformBI", 
 function (src, dst, matrix, interpolationType) {
return 0;
}, "java.awt.image.BufferedImage,java.awt.image.BufferedImage,~A,~N");
Clazz.defineMethod (c$, "lookupByteBI", 
 function (src, dst, table) {
return 0;
}, "java.awt.image.BufferedImage,java.awt.image.BufferedImage,~A");
Clazz.defineMethod (c$, "createImageNode", 
function (img) {
var imgNode = null;
{
imgNode = img._imgNode;
}if (imgNode == null && Clazz.instanceOf (img, java.awt.image.BufferedImage)) {
{
var canvas = img._canvas;
if (canvas == null) {
img.getGraphics();
canvas = img._canvas;
}
imgNode = canvas;
imgNode.style.width = img.getWidth() + "px";
imgNode.style.height = img.getHeight()	 	+ "px";
}return imgNode;
}return null;
}, "java.awt.Image");
});
