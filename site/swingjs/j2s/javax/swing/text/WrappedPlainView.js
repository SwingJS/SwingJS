Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.BoxView", "$.TabExpander", "$.View"], "javax.swing.text.WrappedPlainView", ["java.lang.IllegalArgumentException", "javax.swing.text.BadLocationException", "$.LayeredHighlighter", "$.Position", "$.Segment", "$.SegmentCache", "$.StateInvariantError", "$.Utilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.metrics = null;
this.lineBuffer = null;
this.widthChanging = false;
this.tabBase = 0;
this.tabSize = 0;
this.wordWrap = false;
this.sel0 = 0;
this.sel1 = 0;
this.unselected = null;
this.selected = null;
if (!Clazz.isClassDefined ("javax.swing.text.WrappedPlainView.WrappedLine")) {
javax.swing.text.WrappedPlainView.$WrappedPlainView$WrappedLine$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.text, "WrappedPlainView", javax.swing.text.BoxView, javax.swing.text.TabExpander);
Clazz.makeConstructor (c$, 
function (elem) {
this.construct (elem, false);
}, "javax.swing.text.Element");
Clazz.makeConstructor (c$, 
function (elem, wordWrap) {
Clazz.superConstructor (this, javax.swing.text.WrappedPlainView, [elem, 1]);
this.wordWrap = wordWrap;
}, "javax.swing.text.Element,~B");
Clazz.defineMethod (c$, "getTabSize", 
function () {
var i = this.getDocument ().getProperty ("tabSize");
var size = (i != null) ? i.intValue () : 8;
return size;
});
Clazz.defineMethod (c$, "drawLine", 
function (p0, p1, g, x, y) {
var lineMap = this.getElement ();
var line = lineMap.getElement (lineMap.getElementIndex (p0));
var elem;
try {
if (line.isLeaf ()) {
this.drawText (line, p0, p1, g, x, y);
} else {
var idx = line.getElementIndex (p0);
var lastIdx = line.getElementIndex (p1);
for (; idx <= lastIdx; idx++) {
elem = line.getElement (idx);
var start = Math.max (elem.getStartOffset (), p0);
var end = Math.min (elem.getEndOffset (), p1);
x = this.drawText (elem, start, end, g, x, y);
}
}} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
throw  new javax.swing.text.StateInvariantError ("Can't render: " + p0 + "," + p1);
} else {
throw e;
}
}
}, "~N,~N,java.awt.Graphics,~N,~N");
Clazz.defineMethod (c$, "drawText", 
 function (elem, p0, p1, g, x, y) {
return x;
}, "javax.swing.text.Element,~N,~N,java.awt.Graphics,~N,~N");
Clazz.defineMethod (c$, "getLineBuffer", 
function () {
if (this.lineBuffer == null) {
this.lineBuffer =  new javax.swing.text.Segment ();
}return this.lineBuffer;
});
Clazz.defineMethod (c$, "calculateBreakPosition", 
function (p0, p1) {
var p;
var segment = javax.swing.text.SegmentCache.getSharedSegment ();
this.loadText (segment, p0, p1);
var currentWidth = this.getWidth ();
if (currentWidth == 2147483647) {
currentWidth = Clazz.floatToInt (this.getDefaultSpan (0));
}if (this.wordWrap) {
p = p0 + javax.swing.text.Utilities.getBreakLocation (segment, this.metrics, this.tabBase, this.tabBase + currentWidth, this, p0);
} else {
p = p0 + javax.swing.text.Utilities.getTabbedTextOffset (segment, this.metrics, this.tabBase, this.tabBase + currentWidth, this, p0, false);
}javax.swing.text.SegmentCache.releaseSharedSegment (segment);
return p;
}, "~N,~N");
Clazz.overrideMethod (c$, "loadChildren", 
function (f) {
var e = this.getElement ();
var n = e.getElementCount ();
if (n > 0) {
var added =  new Array (n);
for (var i = 0; i < n; i++) {
added[i] = Clazz.innerTypeInstance (javax.swing.text.WrappedPlainView.WrappedLine, this, null, e.getElement (i));
}
this.replace (0, 0, added);
}}, "javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "updateChildren", 
function (e, a) {
var elem = this.getElement ();
var ec = e.getChange (elem);
if (ec != null) {
var removedElems = ec.getChildrenRemoved ();
var addedElems = ec.getChildrenAdded ();
var added =  new Array (addedElems.length);
for (var i = 0; i < addedElems.length; i++) {
added[i] = Clazz.innerTypeInstance (javax.swing.text.WrappedPlainView.WrappedLine, this, null, addedElems[i]);
}
this.replace (ec.getIndex (), removedElems.length, added);
if (a != null) {
this.preferenceChanged (null, true, true);
this.getContainer ().repaint ();
}}this.updateMetrics ();
}, "javax.swing.event.DocumentEvent,java.awt.Shape");
Clazz.defineMethod (c$, "loadText", 
function (segment, p0, p1) {
try {
var doc = this.getDocument ();
doc.getText (p0, p1 - p0, segment);
} catch (bl) {
if (Clazz.exceptionOf (bl, javax.swing.text.BadLocationException)) {
throw  new javax.swing.text.StateInvariantError ("Can't get line text");
} else {
throw bl;
}
}
}, "javax.swing.text.Segment,~N,~N");
Clazz.defineMethod (c$, "updateMetrics", 
function () {
var host = this.getContainer ();
var f = host.getFont ();
this.metrics = host.getFontMetrics (f);
this.tabSize = this.getTabSize () * this.metrics.charWidth ('m');
});
Clazz.defineMethod (c$, "getDefaultSpan", 
 function (axis) {
var host = this.getContainer ();
var parent = null;
if (host != null) {
parent = host.getParent ();
}switch (axis) {
case 0:
var defaultWidth = 80 * this.metrics.charWidth ('M');
var parentWidth = 0;
if (parent != null) {
parentWidth = parent.getWidth ();
}if (defaultWidth > parentWidth) {
return parentWidth;
}return defaultWidth;
case 1:
var defaultHeight = 24 * this.metrics.getHeight ();
var parentHeight = 0;
if (parent != null) {
parentHeight = parent.getHeight ();
}if (defaultHeight > parentHeight) {
return parentHeight;
}return defaultHeight;
default:
throw  new IllegalArgumentException ("Invalid axis: " + axis);
}
}, "~N");
Clazz.overrideMethod (c$, "nextTabStop", 
function (x, tabOffset) {
if (this.tabSize == 0) return x;
var ntabs = Clazz.doubleToInt ((Clazz.floatToInt (x) - this.tabBase) / this.tabSize);
return this.tabBase + ((ntabs + 1) * this.tabSize);
}, "~N,~N");
Clazz.defineMethod (c$, "paint", 
function (g, a) {
var alloc = a;
this.tabBase = alloc.x;
var host = this.getContainer ();
this.sel0 = host.getSelectionStart ();
this.sel1 = host.getSelectionEnd ();
this.unselected = (host.isEnabled ()) ? host.getForeground () : host.getDisabledTextColor ();
var c = host.getCaret ();
this.selected = c.isSelectionVisible () && host.getHighlighter () != null ? host.getSelectedTextColor () : this.unselected;
g.setFont (host.getFont ());
Clazz.superCall (this, javax.swing.text.WrappedPlainView, "paint", [g, a]);
}, "java.awt.Graphics,java.awt.Shape");
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
this.updateMetrics ();
if (Clazz.floatToInt (width) != this.getWidth ()) {
this.preferenceChanged (null, true, true);
this.widthChanging = true;
}Clazz.superCall (this, javax.swing.text.WrappedPlainView, "setSize", [width, height]);
this.widthChanging = false;
}, "~N,~N");
Clazz.defineMethod (c$, "getPreferredSpan", 
function (axis) {
this.updateMetrics ();
return Clazz.superCall (this, javax.swing.text.WrappedPlainView, "getPreferredSpan", [axis]);
}, "~N");
Clazz.defineMethod (c$, "getMinimumSpan", 
function (axis) {
this.updateMetrics ();
return Clazz.superCall (this, javax.swing.text.WrappedPlainView, "getMinimumSpan", [axis]);
}, "~N");
Clazz.defineMethod (c$, "getMaximumSpan", 
function (axis) {
this.updateMetrics ();
return Clazz.superCall (this, javax.swing.text.WrappedPlainView, "getMaximumSpan", [axis]);
}, "~N");
Clazz.defineMethod (c$, "insertUpdate", 
function (e, a, f) {
this.updateChildren (e, a);
var alloc = ((a != null) && this.isAllocationValid ()) ? this.getInsideAllocation (a) : null;
var pos = e.getOffset ();
var v = this.getViewAtPosition (pos, alloc);
if (v != null) {
v.insertUpdate (e, alloc, f);
}}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "removeUpdate", 
function (e, a, f) {
this.updateChildren (e, a);
var alloc = ((a != null) && this.isAllocationValid ()) ? this.getInsideAllocation (a) : null;
var pos = e.getOffset ();
var v = this.getViewAtPosition (pos, alloc);
if (v != null) {
v.removeUpdate (e, alloc, f);
}}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.overrideMethod (c$, "changedUpdate", 
function (e, a, f) {
this.updateChildren (e, a);
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
c$.$WrappedPlainView$WrappedLine$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.lineCount = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.text.WrappedPlainView, "WrappedLine", javax.swing.text.View);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.text.WrappedPlainView.WrappedLine, [a]);
this.lineCount = -1;
}, "javax.swing.text.Element");
Clazz.overrideMethod (c$, "getPreferredSpan", 
function (a) {
switch (a) {
case 0:
var b = this.b$["javax.swing.text.WrappedPlainView"].getWidth ();
if (b == 2147483647) {
b = this.b$["javax.swing.text.WrappedPlainView"].getDefaultSpan (a);
}return b;
case 1:
if (this.getDocument ().getLength () > 0) {
if ((this.lineCount < 0) || this.b$["javax.swing.text.WrappedPlainView"].widthChanging) {
this.breakLines (this.getStartOffset ());
}return this.lineCount * this.b$["javax.swing.text.WrappedPlainView"].metrics.getHeight ();
} else {
return this.b$["javax.swing.text.WrappedPlainView"].getDefaultSpan (a);
}default:
throw  new IllegalArgumentException ("Invalid axis: " + a);
}
}, "~N");
Clazz.overrideMethod (c$, "paint", 
function (a, b) {
var c = b;
var d = c.y + this.b$["javax.swing.text.WrappedPlainView"].metrics.getAscent ();
var e = c.x;
var f = this.getContainer ();
var g = f.getHighlighter ();
var h = (Clazz.instanceOf (g, javax.swing.text.LayeredHighlighter)) ? g : null;
var i = this.getStartOffset ();
var j = this.getEndOffset ();
var k = i;
var l = this.getLineEnds ();
for (var m = 0; m < this.lineCount; m++) {
var n = (l == null) ? j : i + l[m];
if (h != null) {
var o = (n == j) ? (n - 1) : n;
h.paintLayeredHighlights (a, k, o, b, f, this);
}this.b$["javax.swing.text.WrappedPlainView"].drawLine (k, n, a, e, d);
k = n;
d += this.b$["javax.swing.text.WrappedPlainView"].metrics.getHeight ();
}
}, "java.awt.Graphics,java.awt.Shape");
Clazz.defineMethod (c$, "modelToView", 
function (a, b, c) {
var d = b.getBounds ();
d.height = this.b$["javax.swing.text.WrappedPlainView"].metrics.getHeight ();
d.width = 1;
var e = this.getStartOffset ();
if (a < e || a > this.getEndOffset ()) {
throw  new javax.swing.text.BadLocationException ("Position out of range", a);
}var f = (c === javax.swing.text.Position.Bias.Forward) ? a : Math.max (e, a - 1);
var g = 0;
var h = this.getLineEnds ();
if (h != null) {
g = this.findLine (f - e);
if (g > 0) {
e += h[g - 1];
}d.y += d.height * g;
}if (a > e) {
var i = javax.swing.text.SegmentCache.getSharedSegment ();
this.b$["javax.swing.text.WrappedPlainView"].loadText (i, e, a);
d.x += javax.swing.text.Utilities.getTabbedTextWidth (i, this.b$["javax.swing.text.WrappedPlainView"].metrics, d.x, this.b$["javax.swing.text.WrappedPlainView"], e);
javax.swing.text.SegmentCache.releaseSharedSegment (i);
}return d;
}, "~N,java.awt.Shape,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "viewToModel", 
function (a, b, c, d) {
d[0] = javax.swing.text.Position.Bias.Forward;
var e = c;
var f = Clazz.floatToInt (a);
var g = Clazz.floatToInt (b);
if (g < e.y) {
return this.getStartOffset ();
} else if (g > e.y + e.height) {
return this.getEndOffset () - 1;
} else {
e.height = this.b$["javax.swing.text.WrappedPlainView"].metrics.getHeight ();
var h = (e.height > 0 ? Clazz.doubleToInt ((g - e.y) / e.height) : this.lineCount - 1);
if (h >= this.lineCount) {
return this.getEndOffset () - 1;
} else {
var i = this.getStartOffset ();
var j;
if (this.lineCount == 1) {
j = this.getEndOffset ();
} else {
var k = this.getLineEnds ();
j = i + k[h];
if (h > 0) {
i += k[h - 1];
}}if (f < e.x) {
return i;
} else if (f > e.x + e.width) {
return j - 1;
} else {
var k = javax.swing.text.SegmentCache.getSharedSegment ();
this.b$["javax.swing.text.WrappedPlainView"].loadText (k, i, j);
var l = javax.swing.text.Utilities.getTabbedTextOffset (k, this.b$["javax.swing.text.WrappedPlainView"].metrics, e.x, f, this.b$["javax.swing.text.WrappedPlainView"], i);
javax.swing.text.SegmentCache.releaseSharedSegment (k);
return Math.min (i + l, j - 1);
}}}}, "~N,~N,java.awt.Shape,~A");
Clazz.overrideMethod (c$, "insertUpdate", 
function (a, b, c) {
this.update (a, b);
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.overrideMethod (c$, "removeUpdate", 
function (a, b, c) {
this.update (a, b);
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "update", 
 function (a, b) {
var c = this.lineCount;
this.breakLines (a.getOffset ());
if (c != this.lineCount) {
this.b$["javax.swing.text.WrappedPlainView"].preferenceChanged (this, false, true);
this.getContainer ().repaint ();
} else if (b != null) {
var d = this.getContainer ();
var e = b;
d.repaint (e.x, e.y, e.width, e.height);
}}, "javax.swing.event.DocumentEvent,java.awt.Shape");
Clazz.defineMethod (c$, "getLineEnds", 
function () {
return null;
});
Clazz.defineMethod (c$, "breakLines", 
function (a) {
var b = null;
return b;
}, "~N");
Clazz.defineMethod (c$, "findLine", 
 function (a) {
return 0;
}, "~N");
Clazz.defineMethod (c$, "findLine", 
 function (a, b, c, d) {
if (d - c <= 1) {
return d;
} else {
var e = Clazz.doubleToInt ((d + c) / 2);
return (b < a[e]) ? this.findLine (a, b, c, e) : this.findLine (a, b, e, d);
}}, "~A,~N,~N,~N");
c$ = Clazz.p0p ();
};
});
