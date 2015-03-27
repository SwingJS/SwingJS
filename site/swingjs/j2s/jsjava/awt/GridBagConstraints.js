Clazz.declarePackage ("jsjava.awt");
Clazz.load (null, "jsjava.awt.GridBagConstraints", ["java.lang.InternalError", "jsjava.awt.Insets"], function () {
c$ = Clazz.decorateAsClass (function () {
this.gridx = 0;
this.gridy = 0;
this.gridwidth = 0;
this.gridheight = 0;
this.weightx = 0;
this.weighty = 0;
this.anchor = 0;
this.fill = 0;
this.insets = null;
this.ipadx = 0;
this.ipady = 0;
this.tempX = 0;
this.tempY = 0;
this.tempWidth = 0;
this.tempHeight = 0;
this.minWidth = 0;
this.minHeight = 0;
this.ascent = 0;
this.descent = 0;
this.baselineResizeBehavior = null;
this.centerPadding = 0;
this.centerOffset = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "GridBagConstraints", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
this.gridx = -1;
this.gridy = -1;
this.gridwidth = 1;
this.gridheight = 1;
this.weightx = 0;
this.weighty = 0;
this.anchor = 10;
this.fill = 0;
this.insets =  new jsjava.awt.Insets (0, 0, 0, 0);
this.ipadx = 0;
this.ipady = 0;
});
Clazz.makeConstructor (c$, 
function (gridx, gridy, gridwidth, gridheight, weightx, weighty, anchor, fill, insets, ipadx, ipady) {
this.gridx = gridx;
this.gridy = gridy;
this.gridwidth = gridwidth;
this.gridheight = gridheight;
this.fill = fill;
this.ipadx = ipadx;
this.ipady = ipady;
this.insets = insets;
this.anchor = anchor;
this.weightx = weightx;
this.weighty = weighty;
}, "~N,~N,~N,~N,~N,~N,~N,~N,jsjava.awt.Insets,~N,~N");
Clazz.defineMethod (c$, "clone", 
function () {
try {
var c = Clazz.superCall (this, jsjava.awt.GridBagConstraints, "clone", []);
c.insets = this.insets.clone ();
return c;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "isVerticallyResizable", 
function () {
return (this.fill == 1 || this.fill == 3);
});
Clazz.defineStatics (c$,
"RELATIVE", -1,
"REMAINDER", 0,
"NONE", 0,
"BOTH", 1,
"HORIZONTAL", 2,
"VERTICAL", 3,
"CENTER", 10,
"NORTH", 11,
"NORTHEAST", 12,
"EAST", 13,
"SOUTHEAST", 14,
"SOUTH", 15,
"SOUTHWEST", 16,
"WEST", 17,
"NORTHWEST", 18,
"PAGE_START", 19,
"PAGE_END", 20,
"LINE_START", 21,
"LINE_END", 22,
"FIRST_LINE_START", 23,
"FIRST_LINE_END", 24,
"LAST_LINE_START", 25,
"LAST_LINE_END", 26,
"BASELINE", 0x100,
"BASELINE_LEADING", 0x200,
"BASELINE_TRAILING", 0x300,
"ABOVE_BASELINE", 0x400,
"ABOVE_BASELINE_LEADING", 0x500,
"ABOVE_BASELINE_TRAILING", 0x600,
"BELOW_BASELINE", 0x700,
"BELOW_BASELINE_LEADING", 0x800,
"BELOW_BASELINE_TRAILING", 0x900);
});
