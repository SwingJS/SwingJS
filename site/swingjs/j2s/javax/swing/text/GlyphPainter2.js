Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.GlyphView"], "javax.swing.text.GlyphPainter2", null, function () {
c$ = Clazz.declareType (javax.swing.text, "GlyphPainter2", javax.swing.text.GlyphView.GlyphPainter);
Clazz.overrideMethod (c$, "getSpan", 
function (v, p0, p1, e, x) {
return 0;
}, "javax.swing.text.GlyphView,~N,~N,javax.swing.text.TabExpander,~N");
Clazz.overrideMethod (c$, "getHeight", 
function (v) {
return 0;
}, "javax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "getAscent", 
function (v) {
return 0;
}, "javax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "getDescent", 
function (v) {
return 0;
}, "javax.swing.text.GlyphView");
Clazz.overrideMethod (c$, "paint", 
function (v, g, a, p0, p1) {
}, "javax.swing.text.GlyphView,java.awt.Graphics,java.awt.Shape,~N,~N");
Clazz.overrideMethod (c$, "modelToView", 
function (v, pos, bias, a) {
return null;
}, "javax.swing.text.GlyphView,~N,javax.swing.text.Position.Bias,java.awt.Shape");
Clazz.overrideMethod (c$, "viewToModel", 
function (v, x, y, a, biasReturn) {
return 0;
}, "javax.swing.text.GlyphView,~N,~N,java.awt.Shape,~A");
Clazz.overrideMethod (c$, "getBoundedPosition", 
function (v, p0, x, len) {
return 0;
}, "javax.swing.text.GlyphView,~N,~N,~N");
});
