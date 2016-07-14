Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.GlyphView"], "javax.swing.text.GlyphPainter1", ["java.awt.Rectangle", "$.Toolkit", "javax.swing.text.BadLocationException", "javax.swing.text.ParagraphView.Row", "javax.swing.text.Position", "$.SegmentCache", "$.Utilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.metrics = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "GlyphPainter1", javax.swing.text.GlyphView.GlyphPainter);
Clazz.overrideMethod (c$, "getSpan", 
function (v, p0, p1, e, x) {
this.sync (v);
var text = v.getText (p0, p1);
var justificationData = this.getJustificationData (v);
var width = javax.swing.text.Utilities.getTabbedTextWidth (v, text, this.metrics, Clazz.floatToInt (x), e, p0, justificationData);
javax.swing.text.SegmentCache.releaseSharedSegment (text);
return width;
}, "javax.swing.text.GlyphView,~N,~N,javax.swing.text.TabExpander,~N");
Clazz.overrideMethod (c$, "getHeight", 
function (v) {
this.sync (v);
return this.metrics.getHeight ();
}, "javax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "getAscent", 
function (v) {
this.sync (v);
return this.metrics.getAscent ();
}, "javax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "getDescent", 
function (v) {
this.sync (v);
return this.metrics.getDescent ();
}, "javax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "paint", 
function (v, g, a, p0, p1) {
}, "javax.swing.text.GlyphView,java.awt.Graphics,java.awt.Shape,~N,~N");
Clazz.overrideMethod (c$, "modelToView", 
function (v, pos, bias, a) {
this.sync (v);
var alloc = (Clazz.instanceOf (a, java.awt.Rectangle)) ? a : a.getBounds ();
var p0 = v.getStartOffset ();
var p1 = v.getEndOffset ();
var expander = v.getTabExpander ();
var text;
if (pos == p1) {
return  new java.awt.Rectangle (alloc.x + alloc.width, alloc.y, 0, this.metrics.getHeight ());
}if ((pos >= p0) && (pos <= p1)) {
text = v.getText (p0, pos);
var justificationData = this.getJustificationData (v);
var width = javax.swing.text.Utilities.getTabbedTextWidth (v, text, this.metrics, alloc.x, expander, p0, justificationData);
javax.swing.text.SegmentCache.releaseSharedSegment (text);
return  new java.awt.Rectangle (alloc.x + width, alloc.y, 0, this.metrics.getHeight ());
}throw  new javax.swing.text.BadLocationException ("modelToView - can't convert", p1);
}, "javax.swing.text.GlyphView,~N,javax.swing.text.Position.Bias,java.awt.Shape");
Clazz.overrideMethod (c$, "viewToModel", 
function (v, x, y, a, biasReturn) {
this.sync (v);
var alloc = (Clazz.instanceOf (a, java.awt.Rectangle)) ? a : a.getBounds ();
var p0 = v.getStartOffset ();
var p1 = v.getEndOffset ();
var expander = v.getTabExpander ();
var text = v.getText (p0, p1);
var justificationData = this.getJustificationData (v);
var offs = javax.swing.text.Utilities.getTabbedTextOffset (v, text, this.metrics, alloc.x, Clazz.floatToInt (x), expander, p0, justificationData);
javax.swing.text.SegmentCache.releaseSharedSegment (text);
var retValue = p0 + offs;
if (retValue == p1) {
retValue--;
}biasReturn[0] = javax.swing.text.Position.Bias.Forward;
return retValue;
}, "javax.swing.text.GlyphView,~N,~N,java.awt.Shape,~A");
Clazz.overrideMethod (c$, "getBoundedPosition", 
function (v, p0, x, len) {
this.sync (v);
var expander = v.getTabExpander ();
var s = v.getText (p0, v.getEndOffset ());
var justificationData = this.getJustificationData (v);
var index = javax.swing.text.Utilities.getTabbedTextOffset (v, s, this.metrics, Clazz.floatToInt (x), Clazz.floatToInt (x + len), expander, p0, false, justificationData);
javax.swing.text.SegmentCache.releaseSharedSegment (s);
var p1 = p0 + index;
return p1;
}, "javax.swing.text.GlyphView,~N,~N,~N");
Clazz.defineMethod (c$, "sync", 
function (v) {
var f = v.getFont ();
if ((this.metrics == null) || (!f.equals (this.metrics.getFont ()))) {
var c = v.getContainer ();
this.metrics = (c != null) ? c.getFontMetrics (f) : java.awt.Toolkit.getDefaultToolkit ().getFontMetrics (f);
}}, "javax.swing.text.GlyphView");
Clazz.defineMethod (c$, "getJustificationData", 
 function (v) {
var parent = v.getParent ();
var ret = null;
if (Clazz.instanceOf (parent, javax.swing.text.ParagraphView.Row)) {
var row = (parent);
ret = row.justificationData;
}return ret;
}, "javax.swing.text.GlyphView");
});
