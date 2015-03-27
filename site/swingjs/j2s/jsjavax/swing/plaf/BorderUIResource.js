Clazz.declarePackage ("jsjavax.swing.plaf");
Clazz.load (["jsjavax.swing.border.BevelBorder", "$.Border", "$.CompoundBorder", "$.EmptyBorder", "$.EtchedBorder", "$.LineBorder", "$.MatteBorder", "$.TitledBorder", "jsjavax.swing.plaf.UIResource"], "jsjavax.swing.plaf.BorderUIResource", ["java.lang.IllegalArgumentException", "jsjava.awt.Color"], function () {
c$ = Clazz.decorateAsClass (function () {
this.delegate = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.plaf, "BorderUIResource", null, [jsjavax.swing.border.Border, jsjavax.swing.plaf.UIResource]);
c$.getEtchedBorderUIResource = Clazz.defineMethod (c$, "getEtchedBorderUIResource", 
function () {
if (jsjavax.swing.plaf.BorderUIResource.etched == null) {
jsjavax.swing.plaf.BorderUIResource.etched =  new jsjavax.swing.plaf.BorderUIResource.EtchedBorderUIResource ();
}return jsjavax.swing.plaf.BorderUIResource.etched;
});
c$.getLoweredBevelBorderUIResource = Clazz.defineMethod (c$, "getLoweredBevelBorderUIResource", 
function () {
if (jsjavax.swing.plaf.BorderUIResource.loweredBevel == null) {
jsjavax.swing.plaf.BorderUIResource.loweredBevel =  new jsjavax.swing.plaf.BorderUIResource.BevelBorderUIResource (1);
}return jsjavax.swing.plaf.BorderUIResource.loweredBevel;
});
c$.getRaisedBevelBorderUIResource = Clazz.defineMethod (c$, "getRaisedBevelBorderUIResource", 
function () {
if (jsjavax.swing.plaf.BorderUIResource.raisedBevel == null) {
jsjavax.swing.plaf.BorderUIResource.raisedBevel =  new jsjavax.swing.plaf.BorderUIResource.BevelBorderUIResource (0);
}return jsjavax.swing.plaf.BorderUIResource.raisedBevel;
});
c$.getBlackLineBorderUIResource = Clazz.defineMethod (c$, "getBlackLineBorderUIResource", 
function () {
if (jsjavax.swing.plaf.BorderUIResource.blackLine == null) {
jsjavax.swing.plaf.BorderUIResource.blackLine =  new jsjavax.swing.plaf.BorderUIResource.LineBorderUIResource (jsjava.awt.Color.black);
}return jsjavax.swing.plaf.BorderUIResource.blackLine;
});
Clazz.makeConstructor (c$, 
function (delegate) {
if (delegate == null) {
throw  new IllegalArgumentException ("null border delegate argument");
}this.delegate = delegate;
}, "jsjavax.swing.border.Border");
Clazz.defineMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
this.delegate.paintBorder (c, g, x, y, width, height);
}, "jsjava.awt.Component,jsjava.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return this.delegate.getBorderInsets (c);
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "isBorderOpaque", 
function () {
return this.delegate.isBorderOpaque ();
});
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.plaf.BorderUIResource, "CompoundBorderUIResource", jsjavax.swing.border.CompoundBorder, jsjavax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.plaf.BorderUIResource, "EmptyBorderUIResource", jsjavax.swing.border.EmptyBorder, jsjavax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.plaf.BorderUIResource, "LineBorderUIResource", jsjavax.swing.border.LineBorder, jsjavax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.plaf.BorderUIResource, "BevelBorderUIResource", jsjavax.swing.border.BevelBorder, jsjavax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.plaf.BorderUIResource, "EtchedBorderUIResource", jsjavax.swing.border.EtchedBorder, jsjavax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.plaf.BorderUIResource, "MatteBorderUIResource", jsjavax.swing.border.MatteBorder, jsjavax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.plaf.BorderUIResource, "TitledBorderUIResource", jsjavax.swing.border.TitledBorder, jsjavax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"etched", null,
"loweredBevel", null,
"raisedBevel", null,
"blackLine", null);
});
