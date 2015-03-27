Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.GlyphView"], "jsjavax.swing.text.GlyphPainter1", ["jsjava.awt.Rectangle", "$.Toolkit", "jsjavax.swing.text.BadLocationException", "jsjavax.swing.text.ParagraphView.Row", "jsjavax.swing.text.Position", "$.SegmentCache", "$.Utilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.metrics = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "GlyphPainter1", jsjavax.swing.text.GlyphView.GlyphPainter);
Clazz.overrideMethod (c$, "getSpan", 
function (v, p0, p1, e, x) {
this.sync (v);
var text = v.getText (p0, p1);
var justificationData = this.getJustificationData (v);
var width = jsjavax.swing.text.Utilities.getTabbedTextWidth (v, text, this.metrics, Clazz.floatToInt (x), e, p0, justificationData);
jsjavax.swing.text.SegmentCache.releaseSharedSegment (text);
return width;
}, "jsjavax.swing.text.GlyphView,~N,~N,jsjavax.swing.text.TabExpander,~N");
Clazz.overrideMethod (c$, "getHeight", 
function (v) {
this.sync (v);
return this.metrics.getHeight ();
}, "jsjavax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "getAscent", 
function (v) {
this.sync (v);
return this.metrics.getAscent ();
}, "jsjavax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "getDescent", 
function (v) {
this.sync (v);
return this.metrics.getDescent ();
}, "jsjavax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "paint", 
function (v, g, a, p0, p1) {
}, "jsjavax.swing.text.GlyphView,jsjava.awt.Graphics,jsjava.awt.Shape,~N,~N");
Clazz.overrideMethod (c$, "modelToView", 
function (v, pos, bias, a) {
this.sync (v);
var alloc = (Clazz.instanceOf (a, jsjava.awt.Rectangle)) ? a : a.getBounds ();
var p0 = v.getStartOffset ();
var p1 = v.getEndOffset ();
var expander = v.getTabExpander ();
var text;
if (pos == p1) {
return  new jsjava.awt.Rectangle (alloc.x + alloc.width, alloc.y, 0, this.metrics.getHeight ());
}if ((pos >= p0) && (pos <= p1)) {
text = v.getText (p0, pos);
var justificationData = this.getJustificationData (v);
var width = jsjavax.swing.text.Utilities.getTabbedTextWidth (v, text, this.metrics, alloc.x, expander, p0, justificationData);
jsjavax.swing.text.SegmentCache.releaseSharedSegment (text);
return  new jsjava.awt.Rectangle (alloc.x + width, alloc.y, 0, this.metrics.getHeight ());
}throw  new jsjavax.swing.text.BadLocationException ("modelToView - can't convert", p1);
}, "jsjavax.swing.text.GlyphView,~N,jsjavax.swing.text.Position.Bias,jsjava.awt.Shape");
Clazz.overrideMethod (c$, "viewToModel", 
function (v, x, y, a, biasReturn) {
this.sync (v);
var alloc = (Clazz.instanceOf (a, jsjava.awt.Rectangle)) ? a : a.getBounds ();
var p0 = v.getStartOffset ();
var p1 = v.getEndOffset ();
var expander = v.getTabExpander ();
var text = v.getText (p0, p1);
var justificationData = this.getJustificationData (v);
var offs = jsjavax.swing.text.Utilities.getTabbedTextOffset (v, text, this.metrics, alloc.x, Clazz.floatToInt (x), expander, p0, justificationData);
jsjavax.swing.text.SegmentCache.releaseSharedSegment (text);
var retValue = p0 + offs;
if (retValue == p1) {
retValue--;
}biasReturn[0] = jsjavax.swing.text.Position.Bias.Forward;
return retValue;
}, "jsjavax.swing.text.GlyphView,~N,~N,jsjava.awt.Shape,~A");
Clazz.overrideMethod (c$, "getBoundedPosition", 
function (v, p0, x, len) {
this.sync (v);
var expander = v.getTabExpander ();
var s = v.getText (p0, v.getEndOffset ());
var justificationData = this.getJustificationData (v);
var index = jsjavax.swing.text.Utilities.getTabbedTextOffset (v, s, this.metrics, Clazz.floatToInt (x), Clazz.floatToInt (x + len), expander, p0, false, justificationData);
jsjavax.swing.text.SegmentCache.releaseSharedSegment (s);
var p1 = p0 + index;
return p1;
}, "jsjavax.swing.text.GlyphView,~N,~N,~N");
Clazz.defineMethod (c$, "sync", 
function (v) {
var f = v.getFont ();
if ((this.metrics == null) || (!f.equals (this.metrics.getFont ()))) {
var c = v.getContainer ();
this.metrics = (c != null) ? c.getFontMetrics (f) : jsjava.awt.Toolkit.getDefaultToolkit ().getFontMetrics (f);
}}, "jsjavax.swing.text.GlyphView");
Clazz.defineMethod (c$, "getJustificationData", 
($fz = function (v) {
var parent = v.getParent ();
var ret = null;
if (Clazz.instanceOf (parent, jsjavax.swing.text.ParagraphView.Row)) {
var row = (parent);
ret = row.justificationData;
}return ret;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.text.GlyphView");
});
