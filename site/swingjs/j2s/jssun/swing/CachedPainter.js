Clazz.declarePackage ("jssun.swing");
Clazz.load (["java.util.HashMap"], "jssun.swing.CachedPainter", ["java.awt.image.BufferedImage", "$.VolatileImage", "jssun.swing.ImageCache"], function () {
c$ = Clazz.declareType (jssun.swing, "CachedPainter");
c$.getCache = Clazz.defineMethod (c$, "getCache", 
 function (key) {
{
var cache = jssun.swing.CachedPainter.cacheMap.get (key);
if (cache == null) {
cache =  new jssun.swing.ImageCache (1);
jssun.swing.CachedPainter.cacheMap.put (key, cache);
}return cache;
}}, "~O");
Clazz.makeConstructor (c$, 
function (cacheCount) {
jssun.swing.CachedPainter.getCache (this.getClass ()).setMaxCount (cacheCount);
}, "~N");
Clazz.defineMethod (c$, "paint", 
function (c, g, x, y, w, h, args) {
if (w <= 0 || h <= 0) {
return;
}if (c != null) {
this.paint0 (c, g, x, y, w, h, args);
} else {
this.paint0 (c, g, x, y, w, h, args);
}}, "java.awt.Component,java.awt.Graphics,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "paint0", 
 function (c, g, x, y, w, h, args) {
var key = this.getClass ();
var config = this.getGraphicsConfiguration (c);
var cache = jssun.swing.CachedPainter.getCache (key);
var image = cache.getImage (key, config, w, h, args);
var attempts = 0;
do {
var draw = false;
if (Clazz.instanceOf (image, java.awt.image.VolatileImage)) {
switch ((image).validate (config)) {
case 2:
(image).flush ();
image = null;
break;
case 1:
draw = true;
break;
}
}if (image == null) {
image = this.createImage (c, w, h, config, args);
cache.setImage (key, config, w, h, args, image);
draw = true;
}if (draw) {
var g2 = image.getGraphics ();
this.paintToImage (c, image, g2, w, h, args);
g2.dispose ();
}this.paintImage (c, g, x, y, w, h, image, args);
} while ((Clazz.instanceOf (image, java.awt.image.VolatileImage)) && (image).contentsLost () && ++attempts < 3);
}, "java.awt.Component,java.awt.Graphics,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "paintImage", 
function (c, g, x, y, w, h, image, args) {
g.drawImage (image, x, y, null);
}, "java.awt.Component,java.awt.Graphics,~N,~N,~N,~N,java.awt.Image,~A");
Clazz.defineMethod (c$, "createImage", 
function (c, w, h, config, args) {
if (config == null) {
return  new java.awt.image.BufferedImage (w, h, 1);
}return config.createCompatibleVolatileImage (w, h);
}, "java.awt.Component,~N,~N,java.awt.GraphicsConfiguration,~A");
Clazz.defineMethod (c$, "flush", 
function () {
{
jssun.swing.CachedPainter.getCache (this.getClass ()).flush ();
}});
Clazz.defineMethod (c$, "getGraphicsConfiguration", 
 function (c) {
if (c == null) {
return null;
}return c.getGraphicsConfiguration ();
}, "java.awt.Component");
c$.cacheMap = c$.prototype.cacheMap =  new java.util.HashMap ();
});
