Clazz.declarePackage ("javax.swing.plaf");
Clazz.load (["javax.swing.border.BevelBorder", "$.Border", "$.CompoundBorder", "$.EmptyBorder", "$.EtchedBorder", "$.LineBorder", "$.MatteBorder", "$.TitledBorder", "javax.swing.plaf.UIResource"], "javax.swing.plaf.BorderUIResource", ["java.lang.IllegalArgumentException", "java.awt.Color"], function () {
c$ = Clazz.decorateAsClass (function () {
this.delegate = null;
Clazz.instantialize (this, arguments);
}, javax.swing.plaf, "BorderUIResource", null, [javax.swing.border.Border, javax.swing.plaf.UIResource]);
c$.getEtchedBorderUIResource = Clazz.defineMethod (c$, "getEtchedBorderUIResource", 
function () {
if (javax.swing.plaf.BorderUIResource.etched == null) {
javax.swing.plaf.BorderUIResource.etched =  new javax.swing.plaf.BorderUIResource.EtchedBorderUIResource ();
}return javax.swing.plaf.BorderUIResource.etched;
});
c$.getLoweredBevelBorderUIResource = Clazz.defineMethod (c$, "getLoweredBevelBorderUIResource", 
function () {
if (javax.swing.plaf.BorderUIResource.loweredBevel == null) {
javax.swing.plaf.BorderUIResource.loweredBevel =  new javax.swing.plaf.BorderUIResource.BevelBorderUIResource (1);
}return javax.swing.plaf.BorderUIResource.loweredBevel;
});
c$.getRaisedBevelBorderUIResource = Clazz.defineMethod (c$, "getRaisedBevelBorderUIResource", 
function () {
if (javax.swing.plaf.BorderUIResource.raisedBevel == null) {
javax.swing.plaf.BorderUIResource.raisedBevel =  new javax.swing.plaf.BorderUIResource.BevelBorderUIResource (0);
}return javax.swing.plaf.BorderUIResource.raisedBevel;
});
c$.getBlackLineBorderUIResource = Clazz.defineMethod (c$, "getBlackLineBorderUIResource", 
function () {
if (javax.swing.plaf.BorderUIResource.blackLine == null) {
javax.swing.plaf.BorderUIResource.blackLine =  new javax.swing.plaf.BorderUIResource.LineBorderUIResource (java.awt.Color.black);
}return javax.swing.plaf.BorderUIResource.blackLine;
});
Clazz.makeConstructor (c$, 
function (delegate) {
if (delegate == null) {
throw  new IllegalArgumentException ("null border delegate argument");
}this.delegate = delegate;
}, "javax.swing.border.Border");
Clazz.defineMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
this.delegate.paintBorder (c, g, x, y, width, height);
}, "java.awt.Component,java.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return this.delegate.getBorderInsets (c);
}, "java.awt.Component");
Clazz.defineMethod (c$, "isBorderOpaque", 
function () {
return this.delegate.isBorderOpaque ();
});
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.plaf.BorderUIResource, "CompoundBorderUIResource", javax.swing.border.CompoundBorder, javax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.plaf.BorderUIResource, "EmptyBorderUIResource", javax.swing.border.EmptyBorder, javax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.plaf.BorderUIResource, "LineBorderUIResource", javax.swing.border.LineBorder, javax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.plaf.BorderUIResource, "BevelBorderUIResource", javax.swing.border.BevelBorder, javax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.plaf.BorderUIResource, "EtchedBorderUIResource", javax.swing.border.EtchedBorder, javax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.plaf.BorderUIResource, "MatteBorderUIResource", javax.swing.border.MatteBorder, javax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.plaf.BorderUIResource, "TitledBorderUIResource", javax.swing.border.TitledBorder, javax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"etched", null,
"loweredBevel", null,
"raisedBevel", null,
"blackLine", null);
});
