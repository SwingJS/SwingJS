Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.GlyphView", "$.TabableView"], "javax.swing.text.LabelView", ["java.awt.Toolkit", "javax.swing.text.StateInvariantError", "$.StyleConstants", "$.StyledDocument"], function () {
c$ = Clazz.decorateAsClass (function () {
this.font = null;
this.fg = null;
this.bg = null;
this.underline = false;
this.strike = false;
this.superscript = false;
this.subscript = false;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "LabelView", javax.swing.text.GlyphView, javax.swing.text.TabableView);
Clazz.defineMethod (c$, "sync", 
function () {
if (this.font == null) {
this.setPropertiesFromAttributes ();
}});
Clazz.defineMethod (c$, "setUnderline", 
function (u) {
this.underline = u;
}, "~B");
Clazz.defineMethod (c$, "setStrikeThrough", 
function (s) {
this.strike = s;
}, "~B");
Clazz.defineMethod (c$, "setSuperscript", 
function (s) {
this.superscript = s;
}, "~B");
Clazz.defineMethod (c$, "setSubscript", 
function (s) {
this.subscript = s;
}, "~B");
Clazz.defineMethod (c$, "setBackground", 
function (bg) {
this.bg = bg;
}, "java.awt.Color");
Clazz.defineMethod (c$, "setPropertiesFromAttributes", 
function () {
var attr = this.getAttributes ();
if (attr != null) {
var d = this.getDocument ();
if (Clazz.instanceOf (d, javax.swing.text.StyledDocument)) {
var doc = d;
this.font = doc.getFont (attr);
this.fg = doc.getForeground (attr);
if (attr.isDefined (javax.swing.text.StyleConstants.Background)) {
this.bg = doc.getBackground (attr);
} else {
this.bg = null;
}this.setUnderline (javax.swing.text.StyleConstants.isUnderline (attr));
this.setStrikeThrough (javax.swing.text.StyleConstants.isStrikeThrough (attr));
this.setSuperscript (javax.swing.text.StyleConstants.isSuperscript (attr));
this.setSubscript (javax.swing.text.StyleConstants.isSubscript (attr));
} else {
throw  new javax.swing.text.StateInvariantError ("LabelView needs StyledDocument");
}}});
Clazz.defineMethod (c$, "getFontMetrics", 
function () {
this.sync ();
var c = this.getContainer ();
return (c != null) ? c.getFontMetrics (this.font) : java.awt.Toolkit.getDefaultToolkit ().getFontMetrics (this.font);
});
Clazz.overrideMethod (c$, "getBackground", 
function () {
this.sync ();
return this.bg;
});
Clazz.overrideMethod (c$, "getForeground", 
function () {
this.sync ();
return this.fg;
});
Clazz.overrideMethod (c$, "getFont", 
function () {
this.sync ();
return this.font;
});
Clazz.overrideMethod (c$, "isUnderline", 
function () {
this.sync ();
return this.underline;
});
Clazz.overrideMethod (c$, "isStrikeThrough", 
function () {
this.sync ();
return this.strike;
});
Clazz.overrideMethod (c$, "isSubscript", 
function () {
this.sync ();
return this.subscript;
});
Clazz.overrideMethod (c$, "isSuperscript", 
function () {
this.sync ();
return this.superscript;
});
Clazz.defineMethod (c$, "changedUpdate", 
function (e, a, f) {
this.font = null;
Clazz.superCall (this, javax.swing.text.LabelView, "changedUpdate", [e, a, f]);
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
});
