Clazz.declarePackage ("jsjava.awt");
Clazz.load (null, "jsjava.awt.GridBagLayoutInfo", ["jsjava.awt.Component"], function () {
c$ = Clazz.decorateAsClass (function () {
this.width = 0;
this.height = 0;
this.startx = 0;
this.starty = 0;
this.minWidth = null;
this.minHeight = null;
this.weightX = null;
this.weightY = null;
this.$hasBaseline = false;
this.baselineType = null;
this.maxAscent = null;
this.maxDescent = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "GridBagLayoutInfo");
Clazz.makeConstructor (c$, 
function (width, height) {
this.width = width;
this.height = height;
}, "~N,~N");
Clazz.defineMethod (c$, "hasConstantDescent", 
function (row) {
return ((this.baselineType[row] & (1 << jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_DESCENT.ordinal ())) != 0);
}, "~N");
Clazz.defineMethod (c$, "hasBaseline", 
function (row) {
return (this.$hasBaseline && this.baselineType[row] != 0);
}, "~N");
});
