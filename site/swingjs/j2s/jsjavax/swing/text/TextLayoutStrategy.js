Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjava.text.AttributedCharacterIterator", "jsjavax.swing.text.FlowView", "$.Segment"], "jsjavax.swing.text.TextLayoutStrategy", ["java.lang.Boolean", "$.IllegalArgumentException", "java.util.HashSet", "$.Hashtable", "jsjava.awt.font.TextAttribute", "jsjavax.swing.text.AbstractDocument", "$.GlyphView", "$.Position", "$.StyleConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.text = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "TextLayoutStrategy", jsjavax.swing.text.FlowView.FlowStrategy);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.TextLayoutStrategy, []);
this.text =  new jsjavax.swing.text.TextLayoutStrategy.AttributedSegment ();
});
Clazz.defineMethod (c$, "insertUpdate", 
function (fv, e, alloc) {
this.sync (fv);
Clazz.superCall (this, jsjavax.swing.text.TextLayoutStrategy, "insertUpdate", [fv, e, alloc]);
}, "jsjavax.swing.text.FlowView,jsjavax.swing.event.DocumentEvent,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "removeUpdate", 
function (fv, e, alloc) {
this.sync (fv);
Clazz.superCall (this, jsjavax.swing.text.TextLayoutStrategy, "removeUpdate", [fv, e, alloc]);
}, "jsjavax.swing.text.FlowView,jsjavax.swing.event.DocumentEvent,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "changedUpdate", 
function (fv, e, alloc) {
this.sync (fv);
Clazz.superCall (this, jsjavax.swing.text.TextLayoutStrategy, "changedUpdate", [fv, e, alloc]);
}, "jsjavax.swing.text.FlowView,jsjavax.swing.event.DocumentEvent,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "layoutRow", 
function (fv, rowIndex, p0) {
var p1 = Clazz.superCall (this, jsjavax.swing.text.TextLayoutStrategy, "layoutRow", [fv, rowIndex, p0]);
var row = fv.getView (rowIndex);
var doc = fv.getDocument ();
var i18nFlag = doc.getProperty ("i18n");
if ((i18nFlag != null) && i18nFlag.equals (Boolean.TRUE)) {
var n = row.getViewCount ();
if (n > 1) {
var d = fv.getDocument ();
var bidiRoot = d.getBidiRootElement ();
var levels =  Clazz.newByteArray (n, 0);
var reorder =  new Array (n);
for (var i = 0; i < n; i++) {
var v = row.getView (i);
var bidiIndex = bidiRoot.getElementIndex (v.getStartOffset ());
var bidiElem = bidiRoot.getElement (bidiIndex);
levels[i] = jsjavax.swing.text.StyleConstants.getBidiLevel (bidiElem.getAttributes ());
reorder[i] = v;
}
row.replace (0, n, reorder);
}}return p1;
}, "jsjavax.swing.text.FlowView,~N,~N");
Clazz.overrideMethod (c$, "adjustRow", 
function (fv, rowIndex, desiredSpan, x) {
}, "jsjavax.swing.text.FlowView,~N,~N,~N");
Clazz.overrideMethod (c$, "createView", 
function (fv, startOffset, spanLeft, rowIndex) {
var lv = this.getLogicalView (fv);
var row = fv.getView (rowIndex);
var requireNextWord = (this.viewBuffer.size () == 0) ? false : true;
var childIndex = lv.getViewIndex (startOffset, jsjavax.swing.text.Position.Bias.Forward);
var v = lv.getView (childIndex);
var endOffset = this.getLimitingOffset (v, startOffset, spanLeft, requireNextWord);
if (endOffset == startOffset) {
return null;
}var frag;
if ((startOffset == v.getStartOffset ()) && (endOffset == v.getEndOffset ())) {
frag = v;
} else {
frag = v.createFragment (startOffset, endOffset);
}return frag;
}, "jsjavax.swing.text.FlowView,~N,~N,~N");
Clazz.defineMethod (c$, "getLimitingOffset", 
function (v, startOffset, spanLeft, requireNextWord) {
var endOffset = v.getEndOffset ();
var doc = v.getDocument ();
if (Clazz.instanceOf (doc, jsjavax.swing.text.AbstractDocument)) {
var d = doc;
var bidiRoot = d.getBidiRootElement ();
if (bidiRoot.getElementCount () > 1) {
var bidiIndex = bidiRoot.getElementIndex (startOffset);
var bidiElem = bidiRoot.getElement (bidiIndex);
endOffset = Math.min (bidiElem.getEndOffset (), endOffset);
}}if (Clazz.instanceOf (v, jsjavax.swing.text.GlyphView)) {
var s = (v).getText (startOffset, endOffset);
var ch = s.first ();
if (ch == '\t') {
endOffset = startOffset + 1;
} else {
for (ch = s.next (); ch != '\uffff'; ch = s.next ()) {
if (ch == '\t') {
endOffset = startOffset + s.getIndex () - s.getBeginIndex ();
break;
}}
}}var limitIndex = this.text.toIteratorIndex (endOffset);
var pos = this.text.toModelPosition (limitIndex);
return pos;
}, "jsjavax.swing.text.View,~N,~N,~B");
Clazz.defineMethod (c$, "sync", 
function (fv) {
}, "jsjavax.swing.text.FlowView");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.v = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.TextLayoutStrategy, "AttributedSegment", jsjavax.swing.text.Segment, jsjava.text.AttributedCharacterIterator);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.TextLayoutStrategy.AttributedSegment, []);
});
Clazz.defineMethod (c$, "getView", 
function () {
return this.v;
});
Clazz.defineMethod (c$, "setView", 
function (a) {
this.v = a;
var b = a.getDocument ();
var c = a.getStartOffset ();
var d = a.getEndOffset ();
try {
b.getText (c, d - c, this);
} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
throw  new IllegalArgumentException ("Invalid view");
} else {
throw bl;
}
}
this.first ();
}, "jsjavax.swing.text.View");
Clazz.defineMethod (c$, "getFontBoundary", 
function (a, b) {
var c = this.v.getView (a);
var d = this.getFont (a);
for (a += b; (a >= 0) && (a < this.v.getViewCount ()); a += b) {
var e = this.getFont (a);
if (e !== d) {
break;
}c = this.v.getView (a);
}
return (b < 0) ? c.getStartOffset () : c.getEndOffset ();
}, "~N,~N");
Clazz.defineMethod (c$, "getFont", 
function (a) {
var b = this.v.getView (a);
if (Clazz.instanceOf (b, jsjavax.swing.text.GlyphView)) {
return (b).getFont ();
}return null;
}, "~N");
Clazz.defineMethod (c$, "toModelPosition", 
function (a) {
return this.v.getStartOffset () + (a - this.getBeginIndex ());
}, "~N");
Clazz.defineMethod (c$, "toIteratorIndex", 
function (a) {
return a - this.v.getStartOffset () + this.getBeginIndex ();
}, "~N");
Clazz.defineMethod (c$, "getRunStart", 
function () {
var a = this.toModelPosition (this.getIndex ());
var b = this.v.getViewIndex (a, jsjavax.swing.text.Position.Bias.Forward);
var c = this.v.getView (b);
return this.toIteratorIndex (c.getStartOffset ());
});
Clazz.defineMethod (c$, "getRunStart", 
function (a) {
if (Clazz.instanceOf (a, jsjava.awt.font.TextAttribute)) {
var b = this.toModelPosition (this.getIndex ());
var c = this.v.getViewIndex (b, jsjavax.swing.text.Position.Bias.Forward);
if (a === jsjava.awt.font.TextAttribute.FONT) {
return this.toIteratorIndex (this.getFontBoundary (c, -1));
}}return this.getBeginIndex ();
}, "jsjava.text.AttributedCharacterIterator.Attribute");
Clazz.defineMethod (c$, "getRunStart", 
function (a) {
var b = this.getBeginIndex ();
var c = a.toArray ();
for (var d = 0; d < c.length; d++) {
var e = c[d];
b = Math.max (this.getRunStart (e), b);
}
return Math.min (this.getIndex (), b);
}, "java.util.Set");
Clazz.defineMethod (c$, "getRunLimit", 
function () {
var a = this.toModelPosition (this.getIndex ());
var b = this.v.getViewIndex (a, jsjavax.swing.text.Position.Bias.Forward);
var c = this.v.getView (b);
return this.toIteratorIndex (c.getEndOffset ());
});
Clazz.defineMethod (c$, "getRunLimit", 
function (a) {
if (Clazz.instanceOf (a, jsjava.awt.font.TextAttribute)) {
var b = this.toModelPosition (this.getIndex ());
var c = this.v.getViewIndex (b, jsjavax.swing.text.Position.Bias.Forward);
if (a === jsjava.awt.font.TextAttribute.FONT) {
return this.toIteratorIndex (this.getFontBoundary (c, 1));
}}return this.getEndIndex ();
}, "jsjava.text.AttributedCharacterIterator.Attribute");
Clazz.defineMethod (c$, "getRunLimit", 
function (a) {
var b = this.getEndIndex ();
var c = a.toArray ();
for (var d = 0; d < c.length; d++) {
var e = c[d];
b = Math.min (this.getRunLimit (e), b);
}
return Math.max (this.getIndex (), b);
}, "java.util.Set");
Clazz.overrideMethod (c$, "getAttributes", 
function () {
var a = jsjavax.swing.text.TextLayoutStrategy.AttributedSegment.keys.toArray ();
var b =  new java.util.Hashtable ();
for (var c = 0; c < a.length; c++) {
var d = a[c];
var e = this.getAttribute (d);
if (e != null) {
b.put (d, e);
}}
return b;
});
Clazz.overrideMethod (c$, "getAttribute", 
function (a) {
var b = this.toModelPosition (this.getIndex ());
var c = this.v.getViewIndex (b, jsjavax.swing.text.Position.Bias.Forward);
if (a === jsjava.awt.font.TextAttribute.FONT) {
return this.getFont (c);
} else if (a === jsjava.awt.font.TextAttribute.RUN_DIRECTION) {
return this.v.getDocument ().getProperty (jsjava.awt.font.TextAttribute.RUN_DIRECTION);
}return null;
}, "jsjava.text.AttributedCharacterIterator.Attribute");
Clazz.overrideMethod (c$, "getAllAttributeKeys", 
function () {
return jsjavax.swing.text.TextLayoutStrategy.AttributedSegment.keys;
});
Clazz.defineStatics (c$,
"keys", null);
{
jsjavax.swing.text.TextLayoutStrategy.AttributedSegment.keys =  new java.util.HashSet ();
jsjavax.swing.text.TextLayoutStrategy.AttributedSegment.keys.add (jsjava.awt.font.TextAttribute.FONT);
jsjavax.swing.text.TextLayoutStrategy.AttributedSegment.keys.add (jsjava.awt.font.TextAttribute.RUN_DIRECTION);
}c$ = Clazz.p0p ();
});
