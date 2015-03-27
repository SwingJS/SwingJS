Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.border.BevelBorder", "$.EmptyBorder", "$.EtchedBorder"], "jsjavax.swing.BorderFactory", ["java.lang.IllegalArgumentException", "jsjavax.swing.border.CompoundBorder", "$.LineBorder", "$.MatteBorder", "$.TitledBorder"], function () {
c$ = Clazz.declareType (jsjavax.swing, "BorderFactory");
c$.createLineBorder = Clazz.defineMethod (c$, "createLineBorder", 
function (color) {
return  new jsjavax.swing.border.LineBorder (color, 1);
}, "jsjava.awt.Color");
c$.createLineBorder = Clazz.defineMethod (c$, "createLineBorder", 
function (color, thickness) {
return  new jsjavax.swing.border.LineBorder (color, thickness);
}, "jsjava.awt.Color,~N");
c$.createRaisedBevelBorder = Clazz.defineMethod (c$, "createRaisedBevelBorder", 
function () {
return jsjavax.swing.BorderFactory.createSharedBevel (0);
});
c$.createLoweredBevelBorder = Clazz.defineMethod (c$, "createLoweredBevelBorder", 
function () {
return jsjavax.swing.BorderFactory.createSharedBevel (1);
});
c$.createBevelBorder = Clazz.defineMethod (c$, "createBevelBorder", 
function (type) {
return jsjavax.swing.BorderFactory.createSharedBevel (type);
}, "~N");
c$.createBevelBorder = Clazz.defineMethod (c$, "createBevelBorder", 
function (type, highlight, shadow) {
return  new jsjavax.swing.border.BevelBorder (type, highlight, shadow);
}, "~N,jsjava.awt.Color,jsjava.awt.Color");
c$.createBevelBorder = Clazz.defineMethod (c$, "createBevelBorder", 
function (type, highlightOuter, highlightInner, shadowOuter, shadowInner) {
return  new jsjavax.swing.border.BevelBorder (type, highlightOuter, highlightInner, shadowOuter, shadowInner);
}, "~N,jsjava.awt.Color,jsjava.awt.Color,jsjava.awt.Color,jsjava.awt.Color");
c$.createSharedBevel = Clazz.defineMethod (c$, "createSharedBevel", 
function (type) {
if (type == 0) {
return jsjavax.swing.BorderFactory.sharedRaisedBevel;
} else if (type == 1) {
return jsjavax.swing.BorderFactory.sharedLoweredBevel;
}return null;
}, "~N");
c$.createEtchedBorder = Clazz.defineMethod (c$, "createEtchedBorder", 
function () {
return jsjavax.swing.BorderFactory.sharedEtchedBorder;
});
c$.createEtchedBorder = Clazz.defineMethod (c$, "createEtchedBorder", 
function (highlight, shadow) {
return  new jsjavax.swing.border.EtchedBorder (highlight, shadow);
}, "jsjava.awt.Color,jsjava.awt.Color");
c$.createEtchedBorder = Clazz.defineMethod (c$, "createEtchedBorder", 
function (type) {
switch (type) {
case 0:
if (jsjavax.swing.BorderFactory.sharedRaisedEtchedBorder == null) {
jsjavax.swing.BorderFactory.sharedRaisedEtchedBorder =  new jsjavax.swing.border.EtchedBorder (0);
}return jsjavax.swing.BorderFactory.sharedRaisedEtchedBorder;
case 1:
return jsjavax.swing.BorderFactory.sharedEtchedBorder;
default:
throw  new IllegalArgumentException ("type must be one of EtchedBorder.RAISED or EtchedBorder.LOWERED");
}
}, "~N");
c$.createEtchedBorder = Clazz.defineMethod (c$, "createEtchedBorder", 
function (type, highlight, shadow) {
return  new jsjavax.swing.border.EtchedBorder (type, highlight, shadow);
}, "~N,jsjava.awt.Color,jsjava.awt.Color");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (title) {
return  new jsjavax.swing.border.TitledBorder (title);
}, "~S");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (border) {
return  new jsjavax.swing.border.TitledBorder (border);
}, "jsjavax.swing.border.Border");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (border, title) {
return  new jsjavax.swing.border.TitledBorder (border, title);
}, "jsjavax.swing.border.Border,~S");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (border, title, titleJustification, titlePosition) {
return  new jsjavax.swing.border.TitledBorder (border, title, titleJustification, titlePosition);
}, "jsjavax.swing.border.Border,~S,~N,~N");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (border, title, titleJustification, titlePosition, titleFont) {
return  new jsjavax.swing.border.TitledBorder (border, title, titleJustification, titlePosition, titleFont);
}, "jsjavax.swing.border.Border,~S,~N,~N,jsjava.awt.Font");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (border, title, titleJustification, titlePosition, titleFont, titleColor) {
return  new jsjavax.swing.border.TitledBorder (border, title, titleJustification, titlePosition, titleFont, titleColor);
}, "jsjavax.swing.border.Border,~S,~N,~N,jsjava.awt.Font,jsjava.awt.Color");
c$.createEmptyBorder = Clazz.defineMethod (c$, "createEmptyBorder", 
function () {
return jsjavax.swing.BorderFactory.emptyBorder;
});
c$.createEmptyBorder = Clazz.defineMethod (c$, "createEmptyBorder", 
function (top, left, bottom, right) {
return  new jsjavax.swing.border.EmptyBorder (top, left, bottom, right);
}, "~N,~N,~N,~N");
c$.createCompoundBorder = Clazz.defineMethod (c$, "createCompoundBorder", 
function () {
return  new jsjavax.swing.border.CompoundBorder ();
});
c$.createCompoundBorder = Clazz.defineMethod (c$, "createCompoundBorder", 
function (outsideBorder, insideBorder) {
return  new jsjavax.swing.border.CompoundBorder (outsideBorder, insideBorder);
}, "jsjavax.swing.border.Border,jsjavax.swing.border.Border");
c$.createMatteBorder = Clazz.defineMethod (c$, "createMatteBorder", 
function (top, left, bottom, right, color) {
return  new jsjavax.swing.border.MatteBorder (top, left, bottom, right, color);
}, "~N,~N,~N,~N,jsjava.awt.Color");
c$.createMatteBorder = Clazz.defineMethod (c$, "createMatteBorder", 
function (top, left, bottom, right, tileIcon) {
return  new jsjavax.swing.border.MatteBorder (top, left, bottom, right, tileIcon);
}, "~N,~N,~N,~N,jsjavax.swing.Icon");
c$.sharedRaisedBevel = c$.prototype.sharedRaisedBevel =  new jsjavax.swing.border.BevelBorder (0);
c$.sharedLoweredBevel = c$.prototype.sharedLoweredBevel =  new jsjavax.swing.border.BevelBorder (1);
c$.sharedEtchedBorder = c$.prototype.sharedEtchedBorder =  new jsjavax.swing.border.EtchedBorder ();
Clazz.defineStatics (c$,
"sharedRaisedEtchedBorder", null);
c$.emptyBorder = c$.prototype.emptyBorder =  new jsjavax.swing.border.EmptyBorder (0, 0, 0, 0);
});
