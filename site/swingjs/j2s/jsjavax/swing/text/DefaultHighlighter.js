Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.Highlighter", "$.LayeredHighlighter", "java.util.Vector"], "jsjavax.swing.text.DefaultHighlighter", ["jsjava.awt.Rectangle", "jsjavax.swing.SwingUtilities", "jsjavax.swing.text.LayeredHighlighter.LayerPainter", "jsjavax.swing.text.Position"], function () {
c$ = Clazz.decorateAsClass (function () {
this.highlights = null;
this.component = null;
this.drawsLayeredHighlights = false;
this.safeDamager = null;
if (!Clazz.isClassDefined ("jsjavax.swing.text.DefaultHighlighter.HighlightInfo")) {
jsjavax.swing.text.DefaultHighlighter.$DefaultHighlighter$HighlightInfo$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.DefaultHighlighter.LayeredHighlightInfo")) {
jsjavax.swing.text.DefaultHighlighter.$DefaultHighlighter$LayeredHighlightInfo$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.DefaultHighlighter.SafeDamager")) {
jsjavax.swing.text.DefaultHighlighter.$DefaultHighlighter$SafeDamager$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "DefaultHighlighter", jsjavax.swing.text.LayeredHighlighter);
Clazz.prepareFields (c$, function () {
this.highlights =  new java.util.Vector ();
this.safeDamager = Clazz.innerTypeInstance (jsjavax.swing.text.DefaultHighlighter.SafeDamager, this, null);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultHighlighter, []);
this.drawsLayeredHighlights = true;
});
Clazz.overrideMethod (c$, "paint", 
function (g) {
var len = this.highlights.size ();
for (var i = 0; i < len; i++) {
var info = this.highlights.elementAt (i);
if (!(Clazz.instanceOf (info, jsjavax.swing.text.DefaultHighlighter.LayeredHighlightInfo))) {
var a = this.component.getBounds ();
var insets = this.component.getInsets ();
a.x = insets.left;
a.y = insets.top;
a.width -= insets.left + insets.right;
a.height -= insets.top + insets.bottom;
for (; i < len; i++) {
info = this.highlights.elementAt (i);
if (!(Clazz.instanceOf (info, jsjavax.swing.text.DefaultHighlighter.LayeredHighlightInfo))) {
var p = info.getPainter ();
p.paint (g, info.getStartOffset (), info.getEndOffset (), a, this.component);
}}
}}
}, "jsjava.awt.Graphics");
Clazz.overrideMethod (c$, "install", 
function (c) {
this.component = c;
this.removeAllHighlights ();
}, "jsjavax.swing.text.JTextComponent");
Clazz.overrideMethod (c$, "deinstall", 
function (c) {
this.component = null;
}, "jsjavax.swing.text.JTextComponent");
Clazz.overrideMethod (c$, "addHighlight", 
function (p0, p1, p) {
var doc = this.component.getDocument ();
var i = (this.getDrawsLayeredHighlights () && (Clazz.instanceOf (p, jsjavax.swing.text.LayeredHighlighter.LayerPainter))) ? Clazz.innerTypeInstance (jsjavax.swing.text.DefaultHighlighter.LayeredHighlightInfo, this, null) : Clazz.innerTypeInstance (jsjavax.swing.text.DefaultHighlighter.HighlightInfo, this, null);
i.painter = p;
i.p0 = doc.createPosition (p0);
i.p1 = doc.createPosition (p1);
this.highlights.addElement (i);
this.safeDamageRange (p0, p1);
return i;
}, "~N,~N,jsjavax.swing.text.Highlighter.HighlightPainter");
Clazz.overrideMethod (c$, "removeHighlight", 
function (tag) {
if (Clazz.instanceOf (tag, jsjavax.swing.text.DefaultHighlighter.LayeredHighlightInfo)) {
var lhi = tag;
if (lhi.width > 0 && lhi.height > 0) {
this.component.repaint (lhi.x, lhi.y, lhi.width, lhi.height);
}} else {
var info = tag;
this.safeDamageRange (info.p0, info.p1);
}this.highlights.removeElement (tag);
}, "~O");
Clazz.overrideMethod (c$, "removeAllHighlights", 
function () {
var mapper = this.component.getUI ();
if (this.getDrawsLayeredHighlights ()) {
var len = this.highlights.size ();
if (len != 0) {
var minX = 0;
var minY = 0;
var maxX = 0;
var maxY = 0;
var p0 = -1;
var p1 = -1;
for (var i = 0; i < len; i++) {
var hi = this.highlights.elementAt (i);
if (Clazz.instanceOf (hi, jsjavax.swing.text.DefaultHighlighter.LayeredHighlightInfo)) {
var info = hi;
minX = Math.min (minX, info.x);
minY = Math.min (minY, info.y);
maxX = Math.max (maxX, info.x + info.width);
maxY = Math.max (maxY, info.y + info.height);
} else {
if (p0 == -1) {
p0 = hi.p0.getOffset ();
p1 = hi.p1.getOffset ();
} else {
p0 = Math.min (p0, hi.p0.getOffset ());
p1 = Math.max (p1, hi.p1.getOffset ());
}}}
if (minX != maxX && minY != maxY) {
this.component.repaint (minX, minY, maxX - minX, maxY - minY);
}if (p0 != -1) {
try {
this.safeDamageRange (p0, p1);
} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
} else {
throw e;
}
}
}this.highlights.removeAllElements ();
}} else if (mapper != null) {
var len = this.highlights.size ();
if (len != 0) {
var p0 = 2147483647;
var p1 = 0;
for (var i = 0; i < len; i++) {
var info = this.highlights.elementAt (i);
p0 = Math.min (p0, info.p0.getOffset ());
p1 = Math.max (p1, info.p1.getOffset ());
}
try {
this.safeDamageRange (p0, p1);
} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
} else {
throw e;
}
}
this.highlights.removeAllElements ();
}}});
Clazz.overrideMethod (c$, "changeHighlight", 
function (tag, p0, p1) {
var doc = this.component.getDocument ();
if (Clazz.instanceOf (tag, jsjavax.swing.text.DefaultHighlighter.LayeredHighlightInfo)) {
var lhi = tag;
if (lhi.width > 0 && lhi.height > 0) {
this.component.repaint (lhi.x, lhi.y, lhi.width, lhi.height);
}lhi.width = lhi.height = 0;
lhi.p0 = doc.createPosition (p0);
lhi.p1 = doc.createPosition (p1);
this.safeDamageRange (Math.min (p0, p1), Math.max (p0, p1));
} else {
var info = tag;
var oldP0 = info.p0.getOffset ();
var oldP1 = info.p1.getOffset ();
if (p0 == oldP0) {
this.safeDamageRange (Math.min (oldP1, p1), Math.max (oldP1, p1));
} else if (p1 == oldP1) {
this.safeDamageRange (Math.min (p0, oldP0), Math.max (p0, oldP0));
} else {
this.safeDamageRange (oldP0, oldP1);
this.safeDamageRange (p0, p1);
}info.p0 = doc.createPosition (p0);
info.p1 = doc.createPosition (p1);
}}, "~O,~N,~N");
Clazz.overrideMethod (c$, "getHighlights", 
function () {
var size = this.highlights.size ();
if (size == 0) {
return jsjavax.swing.text.DefaultHighlighter.noHighlights;
}var h =  new Array (size);
this.highlights.copyInto (h);
return h;
});
Clazz.overrideMethod (c$, "paintLayeredHighlights", 
function (g, p0, p1, viewBounds, editor, view) {
for (var counter = this.highlights.size () - 1; counter >= 0; counter--) {
var tag = this.highlights.elementAt (counter);
if (Clazz.instanceOf (tag, jsjavax.swing.text.DefaultHighlighter.LayeredHighlightInfo)) {
var lhi = tag;
var start = lhi.getStartOffset ();
var end = lhi.getEndOffset ();
if ((p0 < start && p1 > start) || (p0 >= start && p0 < end)) {
lhi.paintLayeredHighlights (g, p0, p1, viewBounds, editor, view);
}}}
}, "jsjava.awt.Graphics,~N,~N,jsjava.awt.Shape,jsjavax.swing.text.JTextComponent,jsjavax.swing.text.View");
Clazz.defineMethod (c$, "safeDamageRange", 
($fz = function (p0, p1) {
this.safeDamager.damageRange (p0, p1);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.text.Position,jsjavax.swing.text.Position");
Clazz.defineMethod (c$, "safeDamageRange", 
($fz = function (a0, a1) {
var doc = this.component.getDocument ();
this.safeDamageRange (doc.createPosition (a0), doc.createPosition (a1));
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "setDrawsLayeredHighlights", 
function (newValue) {
this.drawsLayeredHighlights = newValue;
}, "~B");
Clazz.defineMethod (c$, "getDrawsLayeredHighlights", 
function () {
return this.drawsLayeredHighlights;
});
c$.$DefaultHighlighter$HighlightInfo$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.p0 = null;
this.p1 = null;
this.painter = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultHighlighter, "HighlightInfo", null, jsjavax.swing.text.Highlighter.Highlight);
Clazz.overrideMethod (c$, "getStartOffset", 
function () {
return this.p0.getOffset ();
});
Clazz.overrideMethod (c$, "getEndOffset", 
function () {
return this.p1.getOffset ();
});
Clazz.overrideMethod (c$, "getPainter", 
function () {
return this.painter;
});
c$ = Clazz.p0p ();
};
c$.$DefaultHighlighter$LayeredHighlightInfo$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultHighlighter, "LayeredHighlightInfo", jsjavax.swing.text.DefaultHighlighter.HighlightInfo, null, Clazz.innerTypeInstance (jsjavax.swing.text.DefaultHighlighter.HighlightInfo, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "union", 
function (a) {
if (a == null) return;
var b;
if (Clazz.instanceOf (a, jsjava.awt.Rectangle)) {
b = a;
} else {
b = a.getBounds ();
}if (this.width == 0 || this.height == 0) {
this.x = b.x;
this.y = b.y;
this.width = b.width;
this.height = b.height;
} else {
this.width = Math.max (this.x + this.width, b.x + b.width);
this.height = Math.max (this.y + this.height, b.y + b.height);
this.x = Math.min (this.x, b.x);
this.width -= this.x;
this.y = Math.min (this.y, b.y);
this.height -= this.y;
}}, "jsjava.awt.Shape");
Clazz.defineMethod (c$, "paintLayeredHighlights", 
function (a, b, c, d, e, f) {
var g = this.getStartOffset ();
var h = this.getEndOffset ();
b = Math.max (g, b);
c = Math.min (h, c);
this.union ((this.painter).paintLayer (a, b, c, d, e, f));
}, "jsjava.awt.Graphics,~N,~N,jsjava.awt.Shape,jsjavax.swing.text.JTextComponent,jsjavax.swing.text.View");
c$ = Clazz.p0p ();
};
c$.$DefaultHighlighter$SafeDamager$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.p0 = null;
this.p1 = null;
this.lastDoc = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultHighlighter, "SafeDamager", null, Runnable);
Clazz.prepareFields (c$, function () {
this.p0 =  new java.util.Vector (10);
this.p1 =  new java.util.Vector (10);
});
Clazz.overrideMethod (c$, "run", 
function () {
if (this.b$["jsjavax.swing.text.DefaultHighlighter"].component != null) {
var a = this.b$["jsjavax.swing.text.DefaultHighlighter"].component.getUI ();
if (a != null && this.lastDoc === this.b$["jsjavax.swing.text.DefaultHighlighter"].component.getDocument ()) {
var b = this.p0.size ();
for (var c = 0; c < b; c++) {
a.damageRange (this.b$["jsjavax.swing.text.DefaultHighlighter"].component, (this.p0.get (c)).getOffset (), (this.p1.get (c)).getOffset ());
}
}}this.p0.clear ();
this.p1.clear ();
this.lastDoc = null;
});
Clazz.defineMethod (c$, "damageRange", 
function (a, b) {
if (this.b$["jsjavax.swing.text.DefaultHighlighter"].component == null) {
this.p0.clear ();
this.lastDoc = null;
return;
}var c = this.p0.isEmpty ();
var d = this.b$["jsjavax.swing.text.DefaultHighlighter"].component.getDocument ();
if (d !== this.lastDoc) {
if (!this.p0.isEmpty ()) {
this.p0.clear ();
this.p1.clear ();
}this.lastDoc = d;
}this.p0.add (a);
this.p1.add (b);
if (c) {
jsjavax.swing.SwingUtilities.invokeLater (this);
}}, "jsjavax.swing.text.Position,jsjavax.swing.text.Position");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.color = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.DefaultHighlighter, "DefaultHighlightPainter", jsjavax.swing.text.LayeredHighlighter.LayerPainter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultHighlighter.DefaultHighlightPainter, []);
this.color = a;
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "getColor", 
function () {
return this.color;
});
Clazz.overrideMethod (c$, "paint", 
function (a, b, c, d, e) {
var f = d.getBounds ();
try {
var g = e.getUI ();
var h = g.modelToView (e, b);
var i = g.modelToView (e, c);
var j = this.getColor ();
if (j == null) {
a.setColor (e.getSelectionColor ());
} else {
a.setColor (j);
}if (h.y == i.y) {
var k = h.union (i);
a.fillRect (k.x, k.y, k.width, k.height);
} else {
var k = f.x + f.width - h.x;
a.fillRect (h.x, h.y, k, h.height);
if ((h.y + h.height) != i.y) {
a.fillRect (f.x, h.y + h.height, f.width, i.y - (h.y + h.height));
}a.fillRect (f.x, i.y, (i.x - f.x), i.height);
}} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
} else {
throw e;
}
}
}, "jsjava.awt.Graphics,~N,~N,jsjava.awt.Shape,jsjavax.swing.text.JTextComponent");
Clazz.overrideMethod (c$, "paintLayer", 
function (a, b, c, d, e, f) {
var g = this.getColor ();
if (g == null) {
a.setColor (e.getSelectionColor ());
} else {
a.setColor (g);
}var h;
if (b == f.getStartOffset () && c == f.getEndOffset ()) {
if (Clazz.instanceOf (d, jsjava.awt.Rectangle)) {
h = d;
} else {
h = d.getBounds ();
}} else {
try {
var i = f.modelToView (b, jsjavax.swing.text.Position.Bias.Forward, c, jsjavax.swing.text.Position.Bias.Backward, d);
h = (Clazz.instanceOf (i, jsjava.awt.Rectangle)) ? i : i.getBounds ();
} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
h = null;
} else {
throw e;
}
}
}if (h != null) {
h.width = Math.max (h.width, 1);
a.fillRect (h.x, h.y, h.width, h.height);
}return h;
}, "jsjava.awt.Graphics,~N,~N,jsjava.awt.Shape,jsjavax.swing.text.JTextComponent,jsjavax.swing.text.View");
c$ = Clazz.p0p ();
c$.noHighlights = c$.prototype.noHighlights =  new Array (0);
c$.DefaultPainter = c$.prototype.DefaultPainter =  new jsjavax.swing.text.DefaultHighlighter.DefaultHighlightPainter (null);
});
