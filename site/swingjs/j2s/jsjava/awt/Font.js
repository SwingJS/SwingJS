Clazz.declarePackage ("jsjava.awt");
Clazz.load (null, "jsjava.awt.Font", ["java.util.Locale", "jsjava.awt.font.TextAttribute", "jsjava.awt.geom.AffineTransform"], function () {
c$ = Clazz.decorateAsClass (function () {
this.family = null;
this.name = null;
this.style = 0;
this.size = 0;
this.pointSize = 0;
this.$hasLayoutAttributes = false;
this.nonIdentityTx = false;
this.hash = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "Font");
Clazz.makeConstructor (c$, 
function (name, style, size) {
this.name = (name != null) ? name : "Default";
this.style = (style & -4) == 0 ? style : 0;
this.size = size;
this.pointSize = size;
}, "~S,~N,~N");
Clazz.makeConstructor (c$, 
($fz = function (name, style, sizePts) {
this.name = (name != null) ? name : "Default";
this.style = (style & -4) == 0 ? style : 0;
this.size = Clazz.doubleToInt (sizePts + 0.5);
this.pointSize = sizePts;
}, $fz.isPrivate = true, $fz), "~S,~N,~N");
Clazz.makeConstructor (c$, 
function (font) {
this.name = font.name;
this.style = font.style;
this.size = font.size;
this.pointSize = font.pointSize;
}, "jsjava.awt.Font");
Clazz.defineMethod (c$, "getTransform", 
function () {
return  new jsjava.awt.geom.AffineTransform ();
});
Clazz.defineMethod (c$, "getFamily", 
function () {
return this.family;
});
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getFontName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getStyle", 
function () {
return this.style;
});
Clazz.defineMethod (c$, "getSize", 
function () {
return this.size;
});
Clazz.defineMethod (c$, "getSize2D", 
function () {
return this.pointSize;
});
Clazz.defineMethod (c$, "isPlain", 
function () {
return this.style == 0;
});
Clazz.defineMethod (c$, "isBold", 
function () {
return (this.style & 1) != 0;
});
Clazz.defineMethod (c$, "isItalic", 
function () {
return (this.style & 2) != 0;
});
Clazz.defineMethod (c$, "isTransformed", 
function () {
return this.nonIdentityTx;
});
Clazz.defineMethod (c$, "hasLayoutAttributes", 
function () {
return this.$hasLayoutAttributes;
});
c$.getFont = Clazz.defineMethod (c$, "getFont", 
function (nm) {
return jsjava.awt.Font.getFont (nm, null);
}, "~S");
c$.decode = Clazz.defineMethod (c$, "decode", 
function (str) {
var fontName = str;
var styleName = "";
var fontSize = 12;
var fontStyle = 0;
if (str == null) {
return  new jsjava.awt.Font ("Dialog", fontStyle, fontSize);
}var lastHyphen = str.lastIndexOf ('-');
var lastSpace = str.lastIndexOf (' ');
var sepChar = (lastHyphen > lastSpace) ? '-' : ' ';
var sizeIndex = str.lastIndexOf (sepChar);
var styleIndex = str.lastIndexOf (sepChar, sizeIndex - 1);
var strlen = str.length;
if (sizeIndex > 0 && sizeIndex + 1 < strlen) {
try {
fontSize = Integer.$valueOf (str.substring (sizeIndex + 1)).intValue ();
if (fontSize <= 0) {
fontSize = 12;
}} catch (e) {
if (Clazz.exceptionOf (e, NumberFormatException)) {
styleIndex = sizeIndex;
sizeIndex = strlen;
if (str.charAt (sizeIndex - 1) == sepChar) {
sizeIndex--;
}} else {
throw e;
}
}
}if (styleIndex >= 0 && styleIndex + 1 < strlen) {
styleName = str.substring (styleIndex + 1, sizeIndex);
styleName = styleName.toLowerCase (java.util.Locale.ENGLISH);
if (styleName.equals ("bolditalic")) {
fontStyle = 3;
} else if (styleName.equals ("italic")) {
fontStyle = 2;
} else if (styleName.equals ("bold")) {
fontStyle = 1;
} else if (styleName.equals ("plain")) {
fontStyle = 0;
} else {
styleIndex = sizeIndex;
if (str.charAt (styleIndex - 1) == sepChar) {
styleIndex--;
}}fontName = str.substring (0, styleIndex);
} else {
var fontEnd = strlen;
if (styleIndex > 0) {
fontEnd = styleIndex;
} else if (sizeIndex > 0) {
fontEnd = sizeIndex;
}if (fontEnd > 0 && str.charAt (fontEnd - 1) == sepChar) {
fontEnd--;
}fontName = str.substring (0, fontEnd);
}return  new jsjava.awt.Font (fontName, fontStyle, fontSize);
}, "~S");
c$.getFont = Clazz.defineMethod (c$, "getFont", 
function (nm, font) {
var str = null;
try {
str = System.getProperty (nm);
} catch (e) {
if (Clazz.exceptionOf (e, SecurityException)) {
} else {
throw e;
}
}
if (str == null) {
return font;
}return jsjava.awt.Font.decode (str);
}, "~S,jsjava.awt.Font");
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.hash == 0) {
this.hash = this.name.hashCode () ^ this.style ^ this.size;
}return this.hash;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return true;
}if (obj != null) {
try {
var font = obj;
if (this.size == font.size && this.style == font.style && this.nonIdentityTx == font.nonIdentityTx && this.$hasLayoutAttributes == font.$hasLayoutAttributes && this.pointSize == font.pointSize && this.name.equals (font.name)) {
return true;
}} catch (e) {
if (Clazz.exceptionOf (e, ClassCastException)) {
} else {
throw e;
}
}
}return false;
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
var strStyle;
if (this.isBold ()) {
strStyle = this.isItalic () ? "bolditalic" : "bold";
} else {
strStyle = this.isItalic () ? "italic" : "plain";
}return this.getClass ().getName () + "[family=" + this.getFamily () + ",name=" + this.name + ",style=" + strStyle + ",size=" + this.size + "]";
});
Clazz.defineMethod (c$, "getAvailableAttributes", 
function () {
var attributes =  Clazz.newArray (-1, [jsjava.awt.font.TextAttribute.FAMILY, jsjava.awt.font.TextAttribute.WEIGHT, jsjava.awt.font.TextAttribute.WIDTH, jsjava.awt.font.TextAttribute.SIZE, jsjava.awt.font.TextAttribute.UNDERLINE, jsjava.awt.font.TextAttribute.STRIKETHROUGH]);
return attributes;
});
Clazz.defineMethod (c$, "deriveFont", 
function (style, size) {
return  new jsjava.awt.Font (this.name, style, size);
}, "~N,~N");
Clazz.defineMethod (c$, "deriveFont", 
function (size) {
return  new jsjava.awt.Font (this.name, this.style, size);
}, "~N");
Clazz.defineMethod (c$, "deriveFont", 
function (style) {
return  new jsjava.awt.Font (this.name, style, this.size);
}, "~N");
Clazz.defineMethod (c$, "hasUniformLineMetrics", 
function () {
return false;
});
Clazz.overrideMethod (c$, "finalize", 
function () {
});
Clazz.defineStatics (c$,
"DIALOG", "Dialog",
"DIALOG_INPUT", "DialogInput",
"SANS_SERIF", "SansSerif",
"SERIF", "Serif",
"MONOSPACED", "Monospaced",
"PLAIN", 0,
"BOLD", 1,
"ITALIC", 2,
"ROMAN_BASELINE", 0,
"CENTER_BASELINE", 1,
"HANGING_BASELINE", 2,
"TRUETYPE_FONT", 0,
"TYPE1_FONT", 1,
"LAYOUT_LEFT_TO_RIGHT", 0,
"LAYOUT_RIGHT_TO_LEFT", 1,
"LAYOUT_NO_START_CONTEXT", 2,
"LAYOUT_NO_LIMIT_CONTEXT", 4);
});
