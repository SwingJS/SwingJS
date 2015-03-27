Clazz.declarePackage ("jsjava.awt");
Clazz.load (["jsjava.awt.Paint"], "jsjava.awt.Color", ["java.lang.IllegalArgumentException", "jsjava.awt.ColorPaintContext"], function () {
c$ = Clazz.decorateAsClass (function () {
this.value = 0;
this.frgbvalue = null;
this.falpha = 0.0;
this.context = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "Color", null, jsjava.awt.Paint);
c$.testColorValueRange = Clazz.defineMethod (c$, "testColorValueRange", 
($fz = function (r, g, b, a) {
var rangeError = false;
var badComponentString = "";
if (a < 0 || a > 255) {
rangeError = true;
badComponentString = badComponentString + " Alpha";
}if (r < 0 || r > 255) {
rangeError = true;
badComponentString = badComponentString + " Red";
}if (g < 0 || g > 255) {
rangeError = true;
badComponentString = badComponentString + " Green";
}if (b < 0 || b > 255) {
rangeError = true;
badComponentString = badComponentString + " Blue";
}if (rangeError == true) {
throw  new IllegalArgumentException ("Color parameter outside of expected range:" + badComponentString);
}}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function () {
{
var a = arguments;
switch(a.length) {
case 0:
break;
case 2:
if (a[1]) {
this.value = a[0];
break;
}
case 1:
this.value = 0xff000000 | a[0];
break;
case 3:
this.setColor4(a[0], a[1], a[2], 255);
break;
case 4:
this.setColor4(a[0], a[1], a[2], a[3]);
break;
}
return this;
}});
Clazz.defineMethod (c$, "setColor4", 
($fz = function (r, g, b, a) {
this.value = ((a & 0xFF) << 24) | ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | ((b & 0xFF) << 0);
jsjava.awt.Color.testColorValueRange (r, g, b, a);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setFloat", 
($fz = function (r, g, b, f) {
this.setColor4 (Clazz.doubleToInt (r * 255 + 0.5), Clazz.doubleToInt (g * 255 + 0.5), Clazz.doubleToInt (b * 255 + 0.5), Clazz.doubleToInt (f * 255 + 0.5));
this.frgbvalue =  Clazz.newFloatArray (3, 0);
this.frgbvalue[0] = r;
this.frgbvalue[1] = g;
this.frgbvalue[2] = b;
this.falpha = f;
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
c$.getColorF4 = Clazz.defineMethod (c$, "getColorF4", 
function (r, g, b, a) {
var c =  new jsjava.awt.Color ();
c.setFloat (r, g, b, a);
return c;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getRed", 
function () {
return (this.getRGB () >> 16) & 0xFF;
});
Clazz.defineMethod (c$, "getGreen", 
function () {
return (this.getRGB () >> 8) & 0xFF;
});
Clazz.defineMethod (c$, "getBlue", 
function () {
return (this.getRGB () >> 0) & 0xFF;
});
Clazz.defineMethod (c$, "getAlpha", 
function () {
return (this.getRGB () >> 24) & 0xff;
});
Clazz.defineMethod (c$, "getRGB", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "brighter", 
function () {
var r = this.getRed ();
var g = this.getGreen ();
var b = this.getBlue ();
var i = Clazz.doubleToInt (3.333333333333333);
if (r == 0 && g == 0 && b == 0) {
return  new jsjava.awt.Color (i, i, i);
}if (r > 0 && r < i) r = i;
if (g > 0 && g < i) g = i;
if (b > 0 && b < i) b = i;
return  new jsjava.awt.Color (Math.min (Clazz.doubleToInt (r / 0.7), 255), Math.min (Clazz.doubleToInt (g / 0.7), 255), Math.min (Clazz.doubleToInt (b / 0.7), 255));
});
Clazz.defineMethod (c$, "darker", 
function () {
return  new jsjava.awt.Color (Math.max (Clazz.doubleToInt (this.getRed () * 0.7), 0), Math.max (Clazz.doubleToInt (this.getGreen () * 0.7), 0), Math.max (Clazz.doubleToInt (this.getBlue () * 0.7), 0));
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.value;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
return Clazz.instanceOf (obj, jsjava.awt.Color) && (obj).getRGB () == this.getRGB ();
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[r=" + this.getRed () + ",g=" + this.getGreen () + ",b=" + this.getBlue () + "]";
});
c$.decode = Clazz.defineMethod (c$, "decode", 
function (nm) {
var intval = Integer.decode (nm);
var i = intval.intValue ();
return  new jsjava.awt.Color ((i >> 16) & 0xFF, (i >> 8) & 0xFF, i & 0xFF);
}, "~S");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (nm) {
return jsjava.awt.Color.getColor (nm, null);
}, "~S");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (nm, v) {
var intval = Integer.getInteger (nm);
if (intval == null) {
return v;
}var i = intval.intValue ();
return  new jsjava.awt.Color ((i >> 16) & 0xFF, (i >> 8) & 0xFF, i & 0xFF);
}, "~S,jsjava.awt.Color");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (nm, v) {
var intval = Integer.getInteger (nm);
var i = (intval != null) ? intval.intValue () : v;
return  new jsjava.awt.Color ((i >> 16) & 0xFF, (i >> 8) & 0xFF, (i >> 0) & 0xFF);
}, "~S,~N");
c$.HSBtoRGB = Clazz.defineMethod (c$, "HSBtoRGB", 
function (hue, saturation, brightness) {
var r = 0;
var g = 0;
var b = 0;
if (saturation == 0) {
r = g = b = Clazz.floatToInt (brightness * 255.0 + 0.5);
} else {
var h = (hue - Math.floor (hue)) * 6.0;
var f = h - java.lang.Math.floor (h);
var p = brightness * (1.0 - saturation);
var q = brightness * (1.0 - saturation * f);
var t = brightness * (1.0 - (saturation * (1.0 - f)));
switch (Clazz.floatToInt (h)) {
case 0:
r = Clazz.floatToInt (brightness * 255.0 + 0.5);
g = Clazz.floatToInt (t * 255.0 + 0.5);
b = Clazz.floatToInt (p * 255.0 + 0.5);
break;
case 1:
r = Clazz.floatToInt (q * 255.0 + 0.5);
g = Clazz.floatToInt (brightness * 255.0 + 0.5);
b = Clazz.floatToInt (p * 255.0 + 0.5);
break;
case 2:
r = Clazz.floatToInt (p * 255.0 + 0.5);
g = Clazz.floatToInt (brightness * 255.0 + 0.5);
b = Clazz.floatToInt (t * 255.0 + 0.5);
break;
case 3:
r = Clazz.floatToInt (p * 255.0 + 0.5);
g = Clazz.floatToInt (q * 255.0 + 0.5);
b = Clazz.floatToInt (brightness * 255.0 + 0.5);
break;
case 4:
r = Clazz.floatToInt (t * 255.0 + 0.5);
g = Clazz.floatToInt (p * 255.0 + 0.5);
b = Clazz.floatToInt (brightness * 255.0 + 0.5);
break;
case 5:
r = Clazz.floatToInt (brightness * 255.0 + 0.5);
g = Clazz.floatToInt (p * 255.0 + 0.5);
b = Clazz.floatToInt (q * 255.0 + 0.5);
break;
}
}return 0xff000000 | (r << 16) | (g << 8) | (b << 0);
}, "~N,~N,~N");
c$.RGBtoHSB = Clazz.defineMethod (c$, "RGBtoHSB", 
function (r, g, b, hsbvals) {
var hue;
var saturation;
var brightness;
if (hsbvals == null) {
hsbvals =  Clazz.newFloatArray (3, 0);
}var cmax = (r > g) ? r : g;
if (b > cmax) cmax = b;
var cmin = (r < g) ? r : g;
if (b < cmin) cmin = b;
brightness = (cmax) / 255.0;
if (cmax != 0) saturation = ((cmax - cmin)) / (cmax);
 else saturation = 0;
if (saturation == 0) hue = 0;
 else {
var redc = ((cmax - r)) / ((cmax - cmin));
var greenc = ((cmax - g)) / ((cmax - cmin));
var bluec = ((cmax - b)) / ((cmax - cmin));
if (r == cmax) hue = bluec - greenc;
 else if (g == cmax) hue = 2.0 + redc - bluec;
 else hue = 4.0 + greenc - redc;
hue = hue / 6.0;
if (hue < 0) hue = hue + 1.0;
}hsbvals[0] = hue;
hsbvals[1] = saturation;
hsbvals[2] = brightness;
return hsbvals;
}, "~N,~N,~N,~A");
c$.getHSBColor = Clazz.defineMethod (c$, "getHSBColor", 
function (h, s, b) {
return  new jsjava.awt.Color (jsjava.awt.Color.HSBtoRGB (h, s, b));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getRGBComponents", 
function (compArray) {
var f;
if (compArray == null) {
f =  Clazz.newFloatArray (4, 0);
} else {
f = compArray;
}if (this.frgbvalue == null) {
f[0] = (this.getRed ()) / 255;
f[1] = (this.getGreen ()) / 255;
f[2] = (this.getBlue ()) / 255;
f[3] = (this.getAlpha ()) / 255;
} else {
f[0] = this.frgbvalue[0];
f[1] = this.frgbvalue[1];
f[2] = this.frgbvalue[2];
f[3] = this.falpha;
}return f;
}, "~A");
Clazz.defineMethod (c$, "getRGBColorComponents", 
function (compArray) {
var f;
if (compArray == null) {
f =  Clazz.newFloatArray (3, 0);
} else {
f = compArray;
}if (this.frgbvalue == null) {
f[0] = (this.getRed ()) / 255;
f[1] = (this.getGreen ()) / 255;
f[2] = (this.getBlue ()) / 255;
} else {
f[0] = this.frgbvalue[0];
f[1] = this.frgbvalue[1];
f[2] = this.frgbvalue[2];
}return f;
}, "~A");
Clazz.overrideMethod (c$, "createContext", 
function (cm, r, r2d, xform, hints) {
if (this.context == null || this.context.getRGB () != this.getRGB ()) {
this.context =  new jsjava.awt.ColorPaintContext (this.getRGB (), cm);
}return this.context;
}, "jsjava.awt.image.ColorModel,jsjava.awt.Rectangle,jsjava.awt.geom.Rectangle2D,jsjava.awt.geom.AffineTransform,jsjava.awt.RenderingHints");
Clazz.overrideMethod (c$, "getTransparency", 
function () {
var alpha = this.getAlpha ();
if (alpha == 0xff) {
return 1;
} else if (alpha == 0) {
return 2;
} else {
return 3;
}});
c$.white = c$.prototype.white =  new jsjava.awt.Color (255, 255, 255);
c$.WHITE = c$.prototype.WHITE = jsjava.awt.Color.white;
c$.lightGray = c$.prototype.lightGray =  new jsjava.awt.Color (192, 192, 192);
c$.LIGHT_GRAY = c$.prototype.LIGHT_GRAY = jsjava.awt.Color.lightGray;
c$.gray = c$.prototype.gray =  new jsjava.awt.Color (128, 128, 128);
c$.GRAY = c$.prototype.GRAY = jsjava.awt.Color.gray;
c$.darkGray = c$.prototype.darkGray =  new jsjava.awt.Color (64, 64, 64);
c$.DARK_GRAY = c$.prototype.DARK_GRAY = jsjava.awt.Color.darkGray;
c$.black = c$.prototype.black =  new jsjava.awt.Color (0, 0, 0);
c$.BLACK = c$.prototype.BLACK = jsjava.awt.Color.black;
c$.red = c$.prototype.red =  new jsjava.awt.Color (255, 0, 0);
c$.RED = c$.prototype.RED = jsjava.awt.Color.red;
c$.pink = c$.prototype.pink =  new jsjava.awt.Color (255, 175, 175);
c$.PINK = c$.prototype.PINK = jsjava.awt.Color.pink;
c$.orange = c$.prototype.orange =  new jsjava.awt.Color (255, 200, 0);
c$.ORANGE = c$.prototype.ORANGE = jsjava.awt.Color.orange;
c$.yellow = c$.prototype.yellow =  new jsjava.awt.Color (255, 255, 0);
c$.YELLOW = c$.prototype.YELLOW = jsjava.awt.Color.yellow;
c$.green = c$.prototype.green =  new jsjava.awt.Color (0, 255, 0);
c$.GREEN = c$.prototype.GREEN = jsjava.awt.Color.green;
c$.magenta = c$.prototype.magenta =  new jsjava.awt.Color (255, 0, 255);
c$.MAGENTA = c$.prototype.MAGENTA = jsjava.awt.Color.magenta;
c$.cyan = c$.prototype.cyan =  new jsjava.awt.Color (0, 255, 255);
c$.CYAN = c$.prototype.CYAN = jsjava.awt.Color.cyan;
c$.blue = c$.prototype.blue =  new jsjava.awt.Color (0, 0, 255);
c$.BLUE = c$.prototype.BLUE = jsjava.awt.Color.blue;
Clazz.defineStatics (c$,
"FACTOR", 0.7);
});
