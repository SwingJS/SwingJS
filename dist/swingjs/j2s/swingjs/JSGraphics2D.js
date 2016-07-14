Clazz.declarePackage ("swingjs");
Clazz.load (["sun.java2d.SunGraphics2D"], "swingjs.JSGraphics2D", ["java.util.HashMap", "java.awt.BasicStroke", "$.Font", "$.Rectangle", "$.RenderingHints", "$.Toolkit", "java.awt.geom.AffineTransform", "swingjs.JSToolkit", "swingjs.api.HTML5CanvasContext2D"], function () {
c$ = Clazz.decorateAsClass (function () {
this.backgroundTaintCount = 0;
this.constrainX = 0;
this.constrainY = 0;
this.windowWidth = 0;
this.windowHeight = 0;
this.canvas = null;
this.ctx = null;
this.gc = null;
this.currentStroke = null;
this.currentClip = null;
this.currentComposite = null;
this.initialState = 0;
this.isShifted = false;
this.font = null;
this.inPath = false;
Clazz.instantialize (this, arguments);
}, swingjs, "JSGraphics2D", sun.java2d.SunGraphics2D, Cloneable);
Clazz.makeConstructor (c$, 
function (canvas) {
Clazz.superConstructor (this, swingjs.JSGraphics2D, []);
this.hints =  new java.awt.RenderingHints ( new java.util.HashMap ());
this.canvas = canvas;
this.ctx = this.canvas.getContext ("2d");
this.$transform =  new java.awt.geom.AffineTransform ();
this.setStroke ( new java.awt.BasicStroke ());
{
this.gc = SwingJS;
}}, "~O");
Clazz.overrideMethod (c$, "getDeviceConfiguration", 
function () {
return this.gc;
});
Clazz.overrideMethod (c$, "drawLine", 
function (x0, y0, x1, y1) {
var inPath = this.inPath;
if (!inPath) this.ctx.beginPath ();
this.ctx.moveTo (x0, y0);
this.ctx.lineTo (x1, y1);
if (!inPath) this.ctx.stroke ();
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawOval", 
function (left, top, width, height) {
if (width == height) this.doCirc (left, top, width, false);
 else this.doArc (left + width / 2, top + height / 2, width, height, 0, 360, false);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillOval", 
function (left, top, width, height) {
if (width == height) this.doCirc (left, top, width, true);
 else this.doArc (left + width / 2, top + height / 2, width, height, 0, 360, true);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawArc", 
function (centerX, centerY, width, height, startAngle, arcAngle) {
this.doArc (centerX, centerY, width, height, startAngle, arcAngle, false);
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillArc", 
function (centerX, centerY, width, height, startAngle, arcAngle) {
this.doArc (centerX, centerY, width, height, startAngle, arcAngle, true);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "doCirc", 
 function (left, top, diameter, fill) {
var r = diameter / 2;
this.ctx.beginPath ();
this.ctx.arc (left + r, top + r, r, 0, 6.283185307179586);
this.ctx.closePath ();
if (fill) this.ctx.fill ();
 else this.ctx.stroke ();
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "doArc", 
 function (centerX, centerY, width, height, startAngle, arcAngle, fill) {
var doClose = (arcAngle - startAngle == 360);
this.ctx.save ();
{
this.ctx.translate (centerX, centerY);
this.ctx.scale (width / height, 1);
this.ctx.beginPath ();
this.ctx.arc (0, 0, height / 2, this.toRad (startAngle), this.toRad (arcAngle));
}this.ctx.restore ();
if (doClose) this.ctx.closePath ();
if (fill) this.ctx.fill ();
 else this.ctx.stroke ();
}, "~N,~N,~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "toRad", 
 function (a) {
return a * (0.017453292519943295);
}, "~N");
Clazz.defineMethod (c$, "drawPolygon", 
function (ayPoints, axPoints, nPoints) {
this.doPoly (ayPoints, axPoints, nPoints, false);
}, "~A,~A,~N");
Clazz.defineMethod (c$, "doPoly", 
 function (axPoints, ayPoints, nPoints, doFill) {
this.ctx.beginPath ();
this.ctx.moveTo (axPoints[0], ayPoints[0]);
for (var i = 1; i < nPoints; i++) this.ctx.lineTo (axPoints[i], ayPoints[i]);

if (doFill) this.ctx.fill ();
 else this.ctx.stroke ();
}, "~A,~A,~N,~B");
Clazz.overrideMethod (c$, "drawRect", 
function (x, y, width, height) {
this.ctx.beginPath ();
this.ctx.rect (x, y, width, height);
this.ctx.stroke ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "background", 
function (bgcolor) {
this.backgroundTaintCount++;
this.backgroundColor = bgcolor;
if (bgcolor == null) {
if (!this.isShifted) this.ctx.translate (-0.5, -0.5);
this.isShifted = true;
return;
}this.ctx.clearRect (0, 0, this.windowWidth, this.windowHeight);
this.setGraphicsColor (bgcolor);
this.fillRect (0, 0, this.windowWidth, this.windowHeight);
}, "java.awt.Color");
Clazz.defineMethod (c$, "fillPolygon", 
function (ayPoints, axPoints, nPoints) {
this.doPoly (ayPoints, axPoints, nPoints, true);
}, "~A,~A,~N");
Clazz.overrideMethod (c$, "fillRect", 
function (x, y, width, height) {
this.backgroundTaintCount++;
this.ctx.fillRect (x, y, width, height);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setGraphicsColor", 
function (c) {
swingjs.api.HTML5CanvasContext2D.setColor (this.ctx, swingjs.JSToolkit.getCSSColor (c));
}, "java.awt.Color");
Clazz.overrideMethod (c$, "setFont", 
function (font) {
if (font === this.font) return;
this.font = font;
if (font != null) swingjs.api.HTML5CanvasContext2D.setFont (this.ctx, swingjs.JSToolkit.getCanvasFont (font));
}, "java.awt.Font");
Clazz.defineMethod (c$, "setStrokeBold", 
function (tf) {
this.setLineWidth (tf ? 2. : 1.);
}, "~B");
Clazz.defineMethod (c$, "setLineWidth", 
 function (d) {
swingjs.api.HTML5CanvasContext2D.setLineWidth (this.ctx, d);
}, "~N");
Clazz.defineMethod (c$, "setWindowParameters", 
function (width, height) {
this.windowWidth = width;
this.windowHeight = height;
}, "~N,~N");
Clazz.defineMethod (c$, "canDoLineTo", 
function () {
return true;
});
Clazz.defineMethod (c$, "doStroke", 
function (isBegin) {
this.inPath = isBegin;
if (isBegin) {
this.ctx.beginPath ();
} else {
this.ctx.stroke ();
}}, "~B");
Clazz.defineMethod (c$, "lineTo", 
function (x2, y2) {
this.ctx.lineTo (x2, y2);
}, "~N,~N");
Clazz.overrideMethod (c$, "clip", 
function (s) {
this.doShape (s);
this.ctx.clip ();
}, "java.awt.Shape");
Clazz.overrideMethod (c$, "draw", 
function (s) {
this.doShape (s);
this.ctx.stroke ();
}, "java.awt.Shape");
Clazz.defineMethod (c$, "doShape", 
 function (s) {
this.ctx.beginPath ();
var pts =  Clazz.newDoubleArray (6, 0);
var pi = s.getPathIterator (null);
while (!pi.isDone ()) {
switch (pi.currentSegment (pts)) {
case 0:
this.ctx.moveTo (pts[0], pts[1]);
break;
case 1:
this.ctx.lineTo (pts[0], pts[1]);
break;
case 2:
this.ctx.quadraticCurveTo (pts[0], pts[1], pts[2], pts[3]);
break;
case 3:
this.ctx.bezeierCurveTo (pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]);
break;
case 4:
this.ctx.closePath ();
break;
}
pi.next ();
}
return pi.getWindingRule ();
}, "java.awt.Shape");
Clazz.overrideMethod (c$, "fill", 
function (s) {
if (this.doShape (s) == 0) {
this.ctx.fill("evenodd");
} else this.ctx.fill ();
}, "java.awt.Shape");
Clazz.defineMethod (c$, "observe", 
 function (img, observer, isOK) {
observer.imageUpdate (img, (isOK ? 0 : 192), -1, -1, -1, -1);
}, "java.awt.Image,java.awt.image.ImageObserver,~B");
Clazz.defineMethod (c$, "drawImage", 
function (img, x, y, observer) {
this.backgroundTaintCount++;
if (img != null) {
var pixels = null;
{
pixels = img._pix;
}var imgNode = null;
var width = img.getWidth (observer);
var height = img.getHeight (observer);
if (pixels == null) {
if ((imgNode = this.getImageNode (img)) != null) this.ctx.drawImage (imgNode, x, y, width, height);
} else {
var imageData = swingjs.api.HTML5CanvasContext2D.getImageData (this.ctx, x, y, width, height);
var buf8 = swingjs.api.HTML5CanvasContext2D.getBuf8 (imageData);
for (var pt = 0, i = 0, n = Math.min (Clazz.doubleToInt (buf8.length / 4), pixels.length); i < n; i++) {
var argb = pixels[i];
buf8[pt++] = (argb >> 16) & 0xFF;
buf8[pt++] = (argb >> 8) & 0xFF;
buf8[pt++] = argb & 0xFF;
buf8[pt++] = (argb >> 24) & 0xFF;
}
swingjs.api.HTML5CanvasContext2D.putImageData (this.ctx, imageData, x, y);
}if (observer != null) this.observe (img, observer, imgNode != null);
}return true;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "drawImage", 
function (img, x, y, width, height, observer) {
this.backgroundTaintCount++;
if (img != null) {
var imgNode = this.getImageNode (img);
if (imgNode != null) this.ctx.drawImage (imgNode, x, y, width, height);
if (observer != null) this.observe (img, observer, imgNode != null);
}return true;
}, "java.awt.Image,~N,~N,~N,~N,java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "drawImage", 
function (img, x, y, bgcolor, observer) {
this.backgroundTaintCount++;
swingjs.JSToolkit.notImplemented (null);
return this.drawImage (img, x, y, observer);
}, "java.awt.Image,~N,~N,java.awt.Color,java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "drawImage", 
function (img, x, y, width, height, bgcolor, observer) {
this.backgroundTaintCount++;
swingjs.JSToolkit.notImplemented (null);
return this.drawImage (img, x, y, width, height, observer);
}, "java.awt.Image,~N,~N,~N,~N,java.awt.Color,java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "drawImage", 
function (img, dx1, dy1, dx2, dy2, sx1, sy1, sx2, sy2, observer) {
this.backgroundTaintCount++;
if (img != null) {
var bytes = null;
var imgNode = this.getImageNode (img);
if (imgNode != null) swingjs.api.HTML5CanvasContext2D.stretchImage (this.ctx, imgNode, sx1, sy1, sx2 - sx1, sy2 - sy1, dx1, dy1, dx2 - dx1, dy2 - dy1);
if (observer != null) this.observe (img, observer, imgNode != null);
}return true;
}, "java.awt.Image,~N,~N,~N,~N,~N,~N,~N,~N,java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "getImageNode", 
 function (img) {
this.backgroundTaintCount++;
var imgNode = null;
{
imgNode = img._imgNode || img._canvas;
}return (imgNode == null ? swingjs.JSToolkit.getCompositor ().createImageNode (img) : imgNode);
}, "java.awt.Image");
Clazz.defineMethod (c$, "drawImage", 
function (img, dx1, dy1, dx2, dy2, sx1, sy1, sx2, sy2, bgcolor, observer) {
this.backgroundTaintCount++;
swingjs.JSToolkit.notImplemented (null);
return this.drawImage (img, dx1, dy1, dx2, dy2, sx1, sy1, sx2, sy2, observer);
}, "java.awt.Image,~N,~N,~N,~N,~N,~N,~N,~N,java.awt.Color,java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "drawImage", 
function (img, xform, obs) {
this.backgroundTaintCount++;
swingjs.JSToolkit.notImplemented (null);
return false;
}, "java.awt.Image,java.awt.geom.AffineTransform,java.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "drawRenderedImage", 
function (img, xform) {
this.backgroundTaintCount++;
swingjs.JSToolkit.notImplemented (null);
}, "java.awt.image.RenderedImage,java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "drawRenderableImage", 
function (img, xform) {
this.backgroundTaintCount++;
swingjs.JSToolkit.notImplemented (null);
}, "java.awt.image.renderable.RenderableImage,java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "hit", 
function (rect, s, onStroke) {
swingjs.JSToolkit.notImplemented (null);
return false;
}, "java.awt.Rectangle,java.awt.Shape,~B");
Clazz.overrideMethod (c$, "setPaint", 
function (paint) {
swingjs.JSToolkit.notImplemented (null);
}, "java.awt.Paint");
Clazz.overrideMethod (c$, "getStroke", 
function () {
return this.currentStroke;
});
Clazz.overrideMethod (c$, "setStroke", 
function (s) {
if (!(Clazz.instanceOf (s, java.awt.BasicStroke))) return;
var b = this.currentStroke = s;
var dash = b.getDashArray ();
var idash =  Clazz.newIntArray (dash == null ? 0 : dash.length, 0);
for (var i = idash.length; --i >= 0; ) idash[i] = Clazz.floatToInt (dash[i]);

this.ctx.setLineDash (idash);
this.setLineWidth (b.getLineWidth ());
var lineCap;
var lineJoin;
var miterLimit = -1;
switch (b.getEndCap ()) {
case 0:
lineCap = "butt";
break;
case 2:
lineCap = "square";
break;
case 1:
default:
lineCap = "round";
}
switch (b.getLineJoin ()) {
case 2:
lineJoin = "bevel";
break;
case 0:
lineJoin = "miter";
miterLimit = b.getMiterLimit ();
break;
case 1:
lineJoin = "round";
}
{
this.ctx.lineCap = lineCap; this.ctx.lineJoin = lineJoin; if
(miterLimit >= 0) this.ctx.miterLimit = miterLimit;
}}, "java.awt.Stroke");
Clazz.overrideMethod (c$, "setRenderingHint", 
function (hintKey, hintValue) {
this.hints.put (hintKey, hintValue);
}, "java.awt.RenderingHints.Key,~O");
Clazz.overrideMethod (c$, "getRenderingHint", 
function (hintKey) {
return this.hints.get (hintKey);
}, "java.awt.RenderingHints.Key");
Clazz.overrideMethod (c$, "setRenderingHints", 
function (hints) {
this.hints =  new java.awt.RenderingHints (hints);
}, "java.util.Map");
Clazz.overrideMethod (c$, "addRenderingHints", 
function (hints) {
for (var e, $e = hints.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) this.hints.put (e.getKey (), e.getValue ());

}, "java.util.Map");
Clazz.overrideMethod (c$, "getRenderingHints", 
function () {
return this.hints;
});
Clazz.overrideMethod (c$, "setBackground", 
function (color) {
this.background (color);
}, "java.awt.Color");
Clazz.overrideMethod (c$, "getBackground", 
function () {
return this.backgroundColor;
});
Clazz.overrideMethod (c$, "getColor", 
function () {
return this.foregroundColor;
});
Clazz.overrideMethod (c$, "setColor", 
function (c) {
this.foregroundColor = c;
this.setGraphicsColor (c);
}, "java.awt.Color");
Clazz.overrideMethod (c$, "getFont", 
function () {
if (this.font == null) this.font =  new java.awt.Font ("Arial", 0, 12);
return this.font;
});
Clazz.defineMethod (c$, "getFontMetrics", 
function () {
return java.awt.Toolkit.getDefaultToolkit ().getFontMetrics (this.getFont ());
});
Clazz.defineMethod (c$, "getFontMetrics", 
function (f) {
return java.awt.Toolkit.getDefaultToolkit ().getFontMetrics (f);
}, "java.awt.Font");
Clazz.overrideMethod (c$, "clipRect", 
function (x, y, width, height) {
this.ctx.beginPath ();
this.ctx.rect (x, y, width, height);
this.currentClip =  new java.awt.Rectangle (x, y, width, height);
this.ctx.clip ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setClip", 
function (x, y, width, height) {
this.currentClip =  new java.awt.Rectangle (x, y, width, height);
{
if (arguments.length == 1) { setClip1(x); return; }
}this.ctx.beginPath ();
this.ctx.rect (x, y, width, height);
this.currentClip =  new java.awt.Rectangle (x, y, width, height);
this.ctx.clip ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setClip1", 
function (clip) {
this.ctx.beginPath ();
this.doShape (clip);
this.ctx.clip ();
}, "java.awt.Shape");
Clazz.overrideMethod (c$, "clearRect", 
function (x, y, width, height) {
this.ctx.clearRect (x, y, width, height);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawPolyline", 
function (xPoints, yPoints, nPoints) {
if (nPoints < 2) return;
this.ctx.moveTo (xPoints[0], yPoints[0]);
for (var i = 1; i < nPoints; i++) {
this.ctx.lineTo (xPoints[i], yPoints[i]);
}
}, "~A,~A,~N");
Clazz.overrideMethod (c$, "copyArea", 
function (x, y, width, height, dx, dy) {
swingjs.JSToolkit.notImplemented (null);
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawRoundRect", 
function (x, y, width, height, arcWidth, arcHeight) {
swingjs.JSToolkit.notImplemented (null);
this.drawRect (x, y, width, height);
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "fillRoundRect", 
function (x, y, width, height, arcWidth, arcHeight) {
swingjs.JSToolkit.notImplemented (null);
this.fillRect (x, y, width, height);
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getClip", 
function () {
swingjs.JSToolkit.notImplemented (null);
return null;
});
Clazz.defineMethod (c$, "drawString", 
function (s, x, y) {
this.ctx.fillText (s, x, y);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "drawStringUnique", 
function (s, x, y) {
this.ctx.fillText (s, x, y);
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "drawStringTrans", 
function (str, x, y) {
swingjs.JSToolkit.notImplemented (null);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "drawString", 
function (iterator, x, y) {
swingjs.JSToolkit.notImplemented (null);
}, "java.text.AttributedCharacterIterator,~N,~N");
Clazz.overrideMethod (c$, "drawStringAttrTrans", 
function (iterator, x, y) {
swingjs.JSToolkit.notImplemented (null);
}, "java.text.AttributedCharacterIterator,~N,~N");
Clazz.overrideMethod (c$, "translateTrans", 
function (tx, ty) {
swingjs.JSToolkit.notImplemented (null);
}, "~N,~N");
Clazz.overrideMethod (c$, "shear", 
function (shx, shy) {
swingjs.JSToolkit.notImplemented (null);
}, "~N,~N");
Clazz.defineMethod (c$, "translate", 
function (x, y) {
this.ctx.translate (x, y);
this.$transform.translate (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "rotate", 
function (radians) {
this.ctx.rotate (radians);
this.$transform.rotate (radians);
}, "~N");
Clazz.defineMethod (c$, "rotate", 
function (theta, x, y) {
this.ctx.translate (x, y);
this.ctx.rotate (theta);
this.ctx.translate (-x, -y);
this.$transform.rotate (theta, x, y);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "scale", 
function (sx, sy) {
this.ctx.scale (sx, sy);
this.$transform.scale (sx, sy);
}, "~N,~N");
Clazz.overrideMethod (c$, "transform", 
function (xform) {
swingjs.JSToolkit.notImplemented (null);
}, "java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "setTransform", 
function (Tx) {
swingjs.JSToolkit.notImplemented (null);
}, "java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "getTransform", 
function () {
return this.$transform;
});
Clazz.defineMethod (c$, "cloneTransform", 
function () {
return this.$transform.clone ();
});
Clazz.overrideMethod (c$, "getPaint", 
function () {
swingjs.JSToolkit.notImplemented (null);
return null;
});
Clazz.overrideMethod (c$, "getFontRenderContext", 
function () {
swingjs.JSToolkit.notImplemented (null);
return null;
});
Clazz.overrideMethod (c$, "setPaintMode", 
function () {
swingjs.JSToolkit.notImplemented (null);
});
Clazz.overrideMethod (c$, "setXORMode", 
function (c1) {
swingjs.JSToolkit.notImplemented (null);
}, "java.awt.Color");
Clazz.defineMethod (c$, "getClipBounds", 
function () {
var r = null;
{
if (arguments.length == 1) r = arguments[0];
}var clipRect = this.getClipBoundsImpl ();
if (r == null) {
r = clipRect;
} else {
r.x = clipRect.x;
r.y = clipRect.y;
r.width = clipRect.width;
r.height = clipRect.height;
}return r;
});
Clazz.defineMethod (c$, "getClipBoundsImpl", 
 function () {
if (this.currentClip == null) {
this.currentClip =  new java.awt.Rectangle (0, 0, this.windowWidth, this.windowHeight);
}return this.currentClip;
});
Clazz.overrideMethod (c$, "setComposite", 
function (comp) {
if (comp === this.currentComposite) return;
var newRule = 0;
var isValid = (comp == null || this.currentComposite == null || (Clazz.instanceOf (comp, java.awt.AlphaComposite)) && (newRule = (comp).getRule ()) != this.currentComposite.getRule ());
if (isValid && swingjs.JSToolkit.setGraphicsCompositeAlpha (this, newRule)) this.currentComposite = comp;
}, "java.awt.Composite");
Clazz.defineMethod (c$, "drawImage", 
function (img, op, x, y) {
swingjs.JSToolkit.drawImageOp (this, img, op, x, y);
}, "java.awt.image.BufferedImage,java.awt.image.BufferedImageOp,~N,~N");
Clazz.defineMethod (c$, "setAlpha", 
function (f) {
{
this.ctx.globalAlpha = f;
}}, "~N");
Clazz.defineMethod (c$, "getCanvas", 
function () {
return this.canvas;
});
Clazz.defineMethod (c$, "getBackgroundCount", 
function () {
var c = this.backgroundTaintCount;
this.backgroundTaintCount = 0;
return c;
});
Clazz.defineMethod (c$, "mark", 
function () {
this.ctx.save ();
var map =  new java.util.HashMap ();
map.put ("composite", this.currentComposite);
map.put ("stroke", this.currentStroke);
map.put ("transform", this.$transform);
map.put ("font", this.font);
return swingjs.api.HTML5CanvasContext2D.push (this.ctx, map);
});
Clazz.defineMethod (c$, "reset", 
function (n0) {
if (n0 < 1) n0 = 1;
while (swingjs.api.HTML5CanvasContext2D.getSavedLevel (this.ctx) >= n0) {
var map = swingjs.api.HTML5CanvasContext2D.pop (this.ctx);
this.setComposite (map.get ("composite"));
this.setStroke (map.get ("stroke"));
this.setTransform (map.get ("transform"));
this.setFont (map.get ("font"));
this.ctx.restore ();
}
}, "~N");
Clazz.defineMethod (c$, "create", 
function () {
return this.clone ();
});
Clazz.overrideMethod (c$, "clone", 
function () {
var n = this.mark ();
var g = null;
{
g = Clazz.clone(this);
}g.$transform =  new java.awt.geom.AffineTransform (this.$transform);
if (this.hints != null) {
g.hints = this.hints.clone ();
}g.setStroke (this.currentStroke.clone ());
g.initialState = n;
return g;
});
Clazz.overrideMethod (c$, "dispose", 
function () {
this.reset (this.initialState);
});
});
