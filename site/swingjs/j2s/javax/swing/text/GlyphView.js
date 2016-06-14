Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.TabableView", "$.View"], "javax.swing.text.GlyphView", ["java.lang.Boolean", "$.Character", "$.IllegalArgumentException", "java.util.BitSet", "java.awt.Rectangle", "javax.swing.text.AbstractDocument", "$.JTextComponent", "$.Position", "$.SegmentCache", "$.StateInvariantError", "$.StyleConstants", "$.StyledDocument"], function () {
c$ = Clazz.decorateAsClass (function () {
this.offset = 0;
this.length = 0;
this.impliedCR = false;
this.skipWidth = false;
this.expander = null;
this.x = 0;
this.painter = null;
this.justificationInfo = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "GlyphView", javax.swing.text.View, [javax.swing.text.TabableView, Cloneable]);
Clazz.makeConstructor (c$, 
function (elem) {
Clazz.superConstructor (this, javax.swing.text.GlyphView, [elem]);
this.offset = 0;
this.length = 0;
var parent = elem.getParentElement ();
var attr = elem.getAttributes ();
this.impliedCR = (attr != null && attr.getAttribute ("CR") != null && parent != null && parent.getElementCount () > 1);
this.skipWidth = elem.getName ().equals ("br");
}, "javax.swing.text.Element");
Clazz.defineMethod (c$, "clone", 
function () {
var o;
try {
o = Clazz.superCall (this, javax.swing.text.GlyphView, "clone", []);
} catch (cnse) {
if (Clazz.exceptionOf (cnse, CloneNotSupportedException)) {
o = null;
} else {
throw cnse;
}
}
return o;
});
Clazz.defineMethod (c$, "getGlyphPainter", 
function () {
return this.painter;
});
Clazz.defineMethod (c$, "setGlyphPainter", 
function (p) {
this.painter = p;
}, "javax.swing.text.GlyphView.GlyphPainter");
Clazz.defineMethod (c$, "getText", 
function (p0, p1) {
var text = javax.swing.text.SegmentCache.getSharedSegment ();
try {
var doc = this.getDocument ();
doc.getText (p0, p1 - p0, text);
} catch (bl) {
if (Clazz.exceptionOf (bl, javax.swing.text.BadLocationException)) {
throw  new javax.swing.text.StateInvariantError ("GlyphView: Stale view: " + bl);
} else {
throw bl;
}
}
return text;
}, "~N,~N");
Clazz.defineMethod (c$, "getBackground", 
function () {
var doc = this.getDocument ();
if (Clazz.instanceOf (doc, javax.swing.text.StyledDocument)) {
var attr = this.getAttributes ();
if (attr.isDefined (javax.swing.text.StyleConstants.Background)) {
return (doc).getBackground (attr);
}}return null;
});
Clazz.defineMethod (c$, "getForeground", 
function () {
var doc = this.getDocument ();
if (Clazz.instanceOf (doc, javax.swing.text.StyledDocument)) {
var attr = this.getAttributes ();
return (doc).getForeground (attr);
}var c = this.getContainer ();
if (c != null) {
return c.getForeground ();
}return null;
});
Clazz.defineMethod (c$, "getFont", 
function () {
var doc = this.getDocument ();
if (Clazz.instanceOf (doc, javax.swing.text.StyledDocument)) {
var attr = this.getAttributes ();
return (doc).getFont (attr);
}var c = this.getContainer ();
if (c != null) {
return c.getFont ();
}return null;
});
Clazz.defineMethod (c$, "isUnderline", 
function () {
var attr = this.getAttributes ();
return javax.swing.text.StyleConstants.isUnderline (attr);
});
Clazz.defineMethod (c$, "isStrikeThrough", 
function () {
var attr = this.getAttributes ();
return javax.swing.text.StyleConstants.isStrikeThrough (attr);
});
Clazz.defineMethod (c$, "isSubscript", 
function () {
var attr = this.getAttributes ();
return javax.swing.text.StyleConstants.isSubscript (attr);
});
Clazz.defineMethod (c$, "isSuperscript", 
function () {
var attr = this.getAttributes ();
return javax.swing.text.StyleConstants.isSuperscript (attr);
});
Clazz.defineMethod (c$, "getTabExpander", 
function () {
return this.expander;
});
Clazz.defineMethod (c$, "checkPainter", 
function () {
if (this.painter == null) {
if (javax.swing.text.GlyphView.defaultPainter == null) {
var classname = "javax.swing.text.GlyphPainter1";
try {
var c;
var loader = this.getClass ().getClassLoader ();
if (loader != null) {
c = loader.loadClass (classname);
} else {
c = Clazz._4Name (classname);
}var o = c.newInstance ();
if (Clazz.instanceOf (o, javax.swing.text.GlyphView.GlyphPainter)) {
javax.swing.text.GlyphView.defaultPainter = o;
}} catch (e) {
throw  new javax.swing.text.StateInvariantError ("GlyphView: Can't load glyph painter: " + classname);
}
}this.setGlyphPainter (javax.swing.text.GlyphView.defaultPainter.getPainter (this, this.getStartOffset (), this.getEndOffset ()));
}});
Clazz.overrideMethod (c$, "getTabbedSpan", 
function (x, e) {
this.checkPainter ();
var old = this.expander;
this.expander = e;
if (this.expander !== old) {
this.preferenceChanged (null, true, false);
}this.x = Clazz.floatToInt (x);
var p0 = this.getStartOffset ();
var p1 = this.getEndOffset ();
var width = this.painter.getSpan (this, p0, p1, this.expander, x);
return width;
}, "~N,javax.swing.text.TabExpander");
Clazz.overrideMethod (c$, "getPartialSpan", 
function (p0, p1) {
this.checkPainter ();
var width = this.painter.getSpan (this, p0, p1, this.expander, this.x);
return width;
}, "~N,~N");
Clazz.overrideMethod (c$, "getStartOffset", 
function () {
var e = this.getElement ();
return (this.length > 0) ? e.getStartOffset () + this.offset : e.getStartOffset ();
});
Clazz.defineMethod (c$, "getEndOffset", 
function () {
var e = this.getElement ();
return (this.length > 0) ? e.getStartOffset () + this.offset + this.length : e.getEndOffset ();
});
Clazz.overrideMethod (c$, "paint", 
function (g, a) {
}, "java.awt.Graphics,java.awt.Shape");
Clazz.defineMethod (c$, "paintTextUsingColor", 
function (g, a, c, p0, p1) {
g.setColor (c);
this.painter.paint (this, g, a, p0, p1);
var underline = this.isUnderline ();
var strike = this.isStrikeThrough ();
if (underline || strike) {
var alloc = (Clazz.instanceOf (a, java.awt.Rectangle)) ? a : a.getBounds ();
var parent = this.getParent ();
if ((parent != null) && (parent.getEndOffset () == p1)) {
var s = this.getText (p0, p1);
while (Character.isWhitespace (s.last ())) {
p1 -= 1;
s.count -= 1;
}
javax.swing.text.SegmentCache.releaseSharedSegment (s);
}var x0 = alloc.x;
var p = this.getStartOffset ();
if (p != p0) {
x0 += Clazz.floatToInt (this.painter.getSpan (this, p, p0, this.getTabExpander (), x0));
}var x1 = x0 + Clazz.floatToInt (this.painter.getSpan (this, p0, p1, this.getTabExpander (), x0));
var y = alloc.y + alloc.height - Clazz.floatToInt (this.painter.getDescent (this));
if (underline) {
var yTmp = y + 1;
g.drawLine (x0, yTmp, x1, yTmp);
}if (strike) {
var yTmp = y - Clazz.floatToInt (this.painter.getAscent (this) * 0.3);
g.drawLine (x0, yTmp, x1, yTmp);
}}}, "java.awt.Graphics,java.awt.Shape,java.awt.Color,~N,~N");
Clazz.overrideMethod (c$, "getPreferredSpan", 
function (axis) {
if (this.impliedCR) {
return 0;
}this.checkPainter ();
var p0 = this.getStartOffset ();
var p1 = this.getEndOffset ();
switch (axis) {
case 0:
if (this.skipWidth) {
return 0;
}return this.painter.getSpan (this, p0, p1, this.expander, this.x);
case 1:
var h = this.painter.getHeight (this);
if (this.isSuperscript ()) {
h += h / 3;
}return h;
default:
throw  new IllegalArgumentException ("Invalid axis: " + axis);
}
}, "~N");
Clazz.defineMethod (c$, "getAlignment", 
function (axis) {
this.checkPainter ();
if (axis == 1) {
var sup = this.isSuperscript ();
var sub = this.isSubscript ();
var h = this.painter.getHeight (this);
var d = this.painter.getDescent (this);
var a = this.painter.getAscent (this);
var align;
if (sup) {
align = 1.0;
} else if (sub) {
align = (h > 0) ? (h - (d + (a / 2))) / h : 0;
} else {
align = (h > 0) ? (h - d) / h : 0;
}return align;
}return Clazz.superCall (this, javax.swing.text.GlyphView, "getAlignment", [axis]);
}, "~N");
Clazz.defineMethod (c$, "modelToView", 
function (pos, a, b) {
this.checkPainter ();
return this.painter.modelToView (this, pos, b, a);
}, "~N,java.awt.Shape,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "viewToModel", 
function (x, y, a, biasReturn) {
this.checkPainter ();
return this.painter.viewToModel (this, x, y, a, biasReturn);
}, "~N,~N,java.awt.Shape,~A");
Clazz.defineMethod (c$, "getBreakWeight", 
function (axis, pos, len) {
if (axis == 0) {
this.checkPainter ();
var p0 = this.getStartOffset ();
var p1 = this.painter.getBoundedPosition (this, p0, pos, len);
if (p1 == p0) {
return 0;
}if (this.getBreakSpot (p0, p1) != -1) {
return 2000;
}if (p1 == this.getEndOffset ()) {
return 1000;
} else {
return 999;
}}return Clazz.superCall (this, javax.swing.text.GlyphView, "getBreakWeight", [axis, pos, len]);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "breakView", 
function (axis, p0, pos, len) {
if (axis == 0) {
this.checkPainter ();
var p1 = this.painter.getBoundedPosition (this, p0, pos, len);
var breakSpot = this.getBreakSpot (p0, p1);
if (breakSpot != -1) {
p1 = breakSpot;
}if (p0 == this.getStartOffset () && p1 == this.getEndOffset ()) {
return this;
}var v = this.createFragment (p0, p1);
v.x = Clazz.floatToInt (pos);
return v;
}return this;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBreakSpot", 
 function (p0, p1) {
var doc = this.getDocument ();
if (doc != null && Boolean.TRUE.equals (doc.getProperty (javax.swing.text.AbstractDocument.MultiByteProperty))) {
return this.getBreakSpotUseBreakIterator (p0, p1);
}return this.getBreakSpotUseWhitespace (p0, p1);
}, "~N,~N");
Clazz.defineMethod (c$, "getBreakSpotUseWhitespace", 
 function (p0, p1) {
var s = this.getText (p0, p1);
for (var ch = s.last (); ch != '\uffff'; ch = s.previous ()) {
if (Character.isWhitespace (ch)) {
javax.swing.text.SegmentCache.releaseSharedSegment (s);
return s.getIndex () - s.getBeginIndex () + 1 + p0;
}}
javax.swing.text.SegmentCache.releaseSharedSegment (s);
return -1;
}, "~N,~N");
Clazz.defineMethod (c$, "getBreakSpotUseBreakIterator", 
 function (p0, p1) {
return 0;
}, "~N,~N");
Clazz.overrideMethod (c$, "createFragment", 
function (p0, p1) {
this.checkPainter ();
var elem = this.getElement ();
var v = this.clone ();
v.offset = p0 - elem.getStartOffset ();
v.length = p1 - p0;
v.painter = this.painter.getPainter (v, p0, p1);
v.justificationInfo = null;
return v;
}, "~N,~N");
Clazz.overrideMethod (c$, "getNextVisualPositionFrom", 
function (pos, b, a, direction, biasRet) {
return this.painter.getNextVisualPositionFrom (this, pos, b, a, direction, biasRet);
}, "~N,javax.swing.text.Position.Bias,java.awt.Shape,~N,~A");
Clazz.overrideMethod (c$, "insertUpdate", 
function (e, a, f) {
this.justificationInfo = null;
this.syncCR ();
this.preferenceChanged (null, true, false);
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.overrideMethod (c$, "removeUpdate", 
function (e, a, f) {
this.justificationInfo = null;
this.syncCR ();
this.preferenceChanged (null, true, false);
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.overrideMethod (c$, "changedUpdate", 
function (e, a, f) {
this.syncCR ();
this.preferenceChanged (null, true, true);
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "syncCR", 
 function () {
if (this.impliedCR) {
var parent = this.getElement ().getParentElement ();
this.impliedCR = (parent != null && parent.getElementCount () > 1);
}});
Clazz.defineMethod (c$, "getJustificationInfo", 
function (rowStartOffset) {
if (this.justificationInfo != null) {
return this.justificationInfo;
}var TRAILING = 0;
var CONTENT = 1;
var SPACES = 2;
var startOffset = this.getStartOffset ();
var endOffset = this.getEndOffset ();
var segment = this.getText (startOffset, endOffset);
var txtOffset = segment.offset;
var txtEnd = segment.offset + segment.count - 1;
var startContentPosition = txtEnd + 1;
var endContentPosition = txtOffset - 1;
var trailingSpaces = 0;
var contentSpaces = 0;
var leadingSpaces = 0;
var hasTab = false;
var spaceMap =  new java.util.BitSet (endOffset - startOffset + 1);
for (var i = txtEnd, state = 0; i >= txtOffset; i--) {
if (' ' == segment.array[i]) {
spaceMap.set (i - txtOffset);
if (state == 0) {
trailingSpaces++;
} else if (state == 1) {
state = 2;
leadingSpaces = 1;
} else if (state == 2) {
leadingSpaces++;
}} else if ('\t' == segment.array[i]) {
hasTab = true;
break;
} else {
if (state == 0) {
if ('\n' != segment.array[i] && '\r' != segment.array[i]) {
state = 1;
endContentPosition = i;
}} else if (state == 1) {
} else if (state == 2) {
contentSpaces += leadingSpaces;
leadingSpaces = 0;
}startContentPosition = i;
}}
javax.swing.text.SegmentCache.releaseSharedSegment (segment);
var startJustifiableContent = -1;
if (startContentPosition < txtEnd) {
startJustifiableContent = startContentPosition - txtOffset;
}var endJustifiableContent = -1;
if (endContentPosition > txtOffset) {
endJustifiableContent = endContentPosition - txtOffset;
}this.justificationInfo =  new javax.swing.text.GlyphView.JustificationInfo (startJustifiableContent, endJustifiableContent, leadingSpaces, contentSpaces, trailingSpaces, hasTab, spaceMap);
return this.justificationInfo;
}, "~N");
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.start = 0;
this.end = 0;
this.leadingSpaces = 0;
this.contentSpaces = 0;
this.trailingSpaces = 0;
this.hasTab = false;
this.spaceMap = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.GlyphView, "JustificationInfo");
Clazz.makeConstructor (c$, 
function (a, b, c, d, e, f, g) {
this.start = a;
this.end = b;
this.leadingSpaces = c;
this.contentSpaces = d;
this.trailingSpaces = e;
this.hasTab = f;
this.spaceMap = g;
}, "~N,~N,~N,~N,~N,~B,java.util.BitSet");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.GlyphView, "GlyphPainter");
Clazz.defineMethod (c$, "getPainter", 
function (a, b, c) {
return this;
}, "javax.swing.text.GlyphView,~N,~N");
Clazz.defineMethod (c$, "getNextVisualPositionFrom", 
function (a, b, c, d, e, f) {
var g = a.getStartOffset ();
var h = a.getEndOffset ();
switch (e) {
case 1:
case 5:
if (b != -1) {
return -1;
}var i = a.getContainer ();
if (Clazz.instanceOf (i, javax.swing.text.JTextComponent)) {
var j = (i).getCaret ();
var k;
k = (j != null) ? j.getMagicCaretPosition () : null;
if (k == null) {
f[0] = javax.swing.text.Position.Bias.Forward;
return g;
}var l = a.viewToModel (k.x, 0, d, f);
return l;
}break;
case 3:
if (g == a.getDocument ().getLength ()) {
if (b == -1) {
f[0] = javax.swing.text.Position.Bias.Forward;
return g;
}return -1;
}if (b == -1) {
f[0] = javax.swing.text.Position.Bias.Forward;
return g;
}if (b == h) {
return -1;
}if (++b == h) {
return -1;
} else {
f[0] = javax.swing.text.Position.Bias.Forward;
}return b;
case 7:
if (g == a.getDocument ().getLength ()) {
if (b == -1) {
f[0] = javax.swing.text.Position.Bias.Forward;
return g;
}return -1;
}if (b == -1) {
f[0] = javax.swing.text.Position.Bias.Forward;
return h - 1;
}if (b == g) {
return -1;
}f[0] = javax.swing.text.Position.Bias.Forward;
return (b - 1);
default:
throw  new IllegalArgumentException ("Bad direction: " + e);
}
return b;
}, "javax.swing.text.GlyphView,~N,javax.swing.text.Position.Bias,java.awt.Shape,~N,~A");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"IMPLIED_CR", "CR",
"defaultPainter", null);
});
