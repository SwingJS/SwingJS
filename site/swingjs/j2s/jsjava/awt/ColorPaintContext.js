Clazz.declarePackage ("jsjava.awt");
Clazz.load (["jsjava.awt.PaintContext"], "jsjava.awt.ColorPaintContext", ["jsjava.awt.image.ColorModel"], function () {
c$ = Clazz.decorateAsClass (function () {
this.color = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "ColorPaintContext", null, jsjava.awt.PaintContext);
Clazz.makeConstructor (c$, 
function (color, cm) {
this.color = color;
}, "~N,jsjava.awt.image.ColorModel");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "getRGB", 
function () {
return this.color;
});
Clazz.overrideMethod (c$, "getColorModel", 
function () {
return jsjava.awt.image.ColorModel.getRGBdefault ();
});
});
