Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.GlyphView"], "jsjavax.swing.text.GlyphPainter2", null, function () {
c$ = Clazz.declareType (jsjavax.swing.text, "GlyphPainter2", jsjavax.swing.text.GlyphView.GlyphPainter);
Clazz.overrideMethod (c$, "getSpan", 
function (v, p0, p1, e, x) {
return 0;
}, "jsjavax.swing.text.GlyphView,~N,~N,jsjavax.swing.text.TabExpander,~N");
Clazz.overrideMethod (c$, "getHeight", 
function (v) {
return 0;
}, "jsjavax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "getAscent", 
function (v) {
return 0;
}, "jsjavax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "getDescent", 
function (v) {
return 0;
}, "jsjavax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "paint", 
function (v, g, a, p0, p1) {
}, "jsjavax.swing.text.GlyphView,jsjava.awt.Graphics,jsjava.awt.Shape,~N,~N");
Clazz.overrideMethod (c$, "modelToView", 
function (v, pos, bias, a) {
return null;
}, "jsjavax.swing.text.GlyphView,~N,jsjavax.swing.text.Position.Bias,jsjava.awt.Shape");
Clazz.overrideMethod (c$, "viewToModel", 
function (v, x, y, a, biasReturn) {
return 0;
}, "jsjavax.swing.text.GlyphView,~N,~N,jsjava.awt.Shape,~A");
Clazz.overrideMethod (c$, "getBoundedPosition", 
function (v, p0, x, len) {
return 0;
}, "jsjavax.swing.text.GlyphView,~N,~N,~N");
});
