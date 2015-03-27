Clazz.declarePackage ("jsjava.awt");
Clazz.load (["jsjava.awt.font.FontRenderContext"], "jsjava.awt.FontMetrics", ["java.lang.Character"], function () {
c$ = Clazz.decorateAsClass (function () {
this.font = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "FontMetrics");
Clazz.makeConstructor (c$, 
function (font) {
this.font = font;
}, "jsjava.awt.Font");
Clazz.defineMethod (c$, "getFont", 
function () {
return this.font;
});
Clazz.defineMethod (c$, "getFontRenderContext", 
function () {
return jsjava.awt.FontMetrics.DEFAULT_FRC;
});
Clazz.defineMethod (c$, "getLeading", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getAscent", 
function () {
return this.font.getSize ();
});
Clazz.defineMethod (c$, "getDescent", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.getLeading () + this.getAscent () + this.getDescent ();
});
Clazz.defineMethod (c$, "getMaxAscent", 
function () {
return this.getAscent ();
});
Clazz.defineMethod (c$, "getMaxDescent", 
function () {
return this.getDescent ();
});
Clazz.defineMethod (c$, "getMaxDecent", 
function () {
return this.getMaxDescent ();
});
Clazz.defineMethod (c$, "getMaxAdvance", 
function () {
return -1;
});
Clazz.defineMethod (c$, "charWidth", 
function (codePoint) {
if (!Character.isValidCodePoint (codePoint)) {
codePoint = 0xffff;
}if (codePoint < 256) {
return this.getWidths ()[codePoint];
} else {
var buffer =  Clazz.newCharArray (2, '\0');
var len = Character.toChars (codePoint, buffer, 0);
return this.charsWidth (buffer, 0, len);
}}, "~N");
Clazz.defineMethod (c$, "charWidth", 
function (ch) {
if (ch.charCodeAt (0) < 256) {
return this.getWidths ()[ch.charCodeAt (0)];
}var data =  Clazz.newCharArray (-1, [ch]);
return this.charsWidth (data, 0, 1);
}, "~S");
Clazz.defineMethod (c$, "stringWidth", 
function (str) {
var len = str.length;
var data =  Clazz.newCharArray (len, '\0');
str.getChars (0, len, data, 0);
return this.charsWidth (data, 0, len);
}, "~S");
Clazz.defineMethod (c$, "charsWidth", 
function (data, off, len) {
return this.stringWidth ( String.instantialize (data, off, len));
}, "~A,~N,~N");
Clazz.defineMethod (c$, "bytesWidth", 
function (data, off, len) {
return this.stringWidth ( String.instantialize (data, 0, off, len));
}, "~A,~N,~N");
Clazz.defineMethod (c$, "getWidths", 
function () {
var widths =  Clazz.newIntArray (256, 0);
for (var ch = String.fromCharCode (0); ch.charCodeAt (0) < 256; ch = String.fromCharCode (ch.charCodeAt (0) + 1)) {
widths[ch.charCodeAt (0)] = this.charWidth (ch);
}
return widths;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[font=" + this.getFont () + "ascent=" + this.getAscent () + ", descent=" + this.getDescent () + ", height=" + this.getHeight () + "]";
});
c$.DEFAULT_FRC = c$.prototype.DEFAULT_FRC =  new jsjava.awt.font.FontRenderContext (null, false, false);
});
