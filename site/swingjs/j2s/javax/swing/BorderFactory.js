Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.border.BevelBorder", "$.EmptyBorder", "$.EtchedBorder"], "javax.swing.BorderFactory", ["java.lang.IllegalArgumentException", "javax.swing.border.CompoundBorder", "$.LineBorder", "$.MatteBorder", "$.TitledBorder"], function () {
c$ = Clazz.declareType (javax.swing, "BorderFactory");
c$.createLineBorder = Clazz.defineMethod (c$, "createLineBorder", 
function (color) {
return  new javax.swing.border.LineBorder (color, 1);
}, "java.awt.Color");
c$.createLineBorder = Clazz.defineMethod (c$, "createLineBorder", 
function (color, thickness) {
return  new javax.swing.border.LineBorder (color, thickness);
}, "java.awt.Color,~N");
c$.createRaisedBevelBorder = Clazz.defineMethod (c$, "createRaisedBevelBorder", 
function () {
return javax.swing.BorderFactory.createSharedBevel (0);
});
c$.createLoweredBevelBorder = Clazz.defineMethod (c$, "createLoweredBevelBorder", 
function () {
return javax.swing.BorderFactory.createSharedBevel (1);
});
c$.createBevelBorder = Clazz.defineMethod (c$, "createBevelBorder", 
function (type) {
return javax.swing.BorderFactory.createSharedBevel (type);
}, "~N");
c$.createBevelBorder = Clazz.defineMethod (c$, "createBevelBorder", 
function (type, highlight, shadow) {
return  new javax.swing.border.BevelBorder (type, highlight, shadow);
}, "~N,java.awt.Color,java.awt.Color");
c$.createBevelBorder = Clazz.defineMethod (c$, "createBevelBorder", 
function (type, highlightOuter, highlightInner, shadowOuter, shadowInner) {
return  new javax.swing.border.BevelBorder (type, highlightOuter, highlightInner, shadowOuter, shadowInner);
}, "~N,java.awt.Color,java.awt.Color,java.awt.Color,java.awt.Color");
c$.createSharedBevel = Clazz.defineMethod (c$, "createSharedBevel", 
function (type) {
if (type == 0) {
return javax.swing.BorderFactory.sharedRaisedBevel;
} else if (type == 1) {
return javax.swing.BorderFactory.sharedLoweredBevel;
}return null;
}, "~N");
c$.createEtchedBorder = Clazz.defineMethod (c$, "createEtchedBorder", 
function () {
return javax.swing.BorderFactory.sharedEtchedBorder;
});
c$.createEtchedBorder = Clazz.defineMethod (c$, "createEtchedBorder", 
function (highlight, shadow) {
return  new javax.swing.border.EtchedBorder (highlight, shadow);
}, "java.awt.Color,java.awt.Color");
c$.createEtchedBorder = Clazz.defineMethod (c$, "createEtchedBorder", 
function (type) {
switch (type) {
case 0:
if (javax.swing.BorderFactory.sharedRaisedEtchedBorder == null) {
javax.swing.BorderFactory.sharedRaisedEtchedBorder =  new javax.swing.border.EtchedBorder (0);
}return javax.swing.BorderFactory.sharedRaisedEtchedBorder;
case 1:
return javax.swing.BorderFactory.sharedEtchedBorder;
default:
throw  new IllegalArgumentException ("type must be one of EtchedBorder.RAISED or EtchedBorder.LOWERED");
}
}, "~N");
c$.createEtchedBorder = Clazz.defineMethod (c$, "createEtchedBorder", 
function (type, highlight, shadow) {
return  new javax.swing.border.EtchedBorder (type, highlight, shadow);
}, "~N,java.awt.Color,java.awt.Color");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (title) {
return  new javax.swing.border.TitledBorder (title);
}, "~S");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (border) {
return  new javax.swing.border.TitledBorder (border);
}, "javax.swing.border.Border");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (border, title) {
return  new javax.swing.border.TitledBorder (border, title);
}, "javax.swing.border.Border,~S");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (border, title, titleJustification, titlePosition) {
return  new javax.swing.border.TitledBorder (border, title, titleJustification, titlePosition);
}, "javax.swing.border.Border,~S,~N,~N");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (border, title, titleJustification, titlePosition, titleFont) {
return  new javax.swing.border.TitledBorder (border, title, titleJustification, titlePosition, titleFont);
}, "javax.swing.border.Border,~S,~N,~N,java.awt.Font");
c$.createTitledBorder = Clazz.defineMethod (c$, "createTitledBorder", 
function (border, title, titleJustification, titlePosition, titleFont, titleColor) {
return  new javax.swing.border.TitledBorder (border, title, titleJustification, titlePosition, titleFont, titleColor);
}, "javax.swing.border.Border,~S,~N,~N,java.awt.Font,java.awt.Color");
c$.createEmptyBorder = Clazz.defineMethod (c$, "createEmptyBorder", 
function () {
return javax.swing.BorderFactory.emptyBorder;
});
c$.createEmptyBorder = Clazz.defineMethod (c$, "createEmptyBorder", 
function (top, left, bottom, right) {
return  new javax.swing.border.EmptyBorder (top, left, bottom, right);
}, "~N,~N,~N,~N");
c$.createCompoundBorder = Clazz.defineMethod (c$, "createCompoundBorder", 
function () {
return  new javax.swing.border.CompoundBorder ();
});
c$.createCompoundBorder = Clazz.defineMethod (c$, "createCompoundBorder", 
function (outsideBorder, insideBorder) {
return  new javax.swing.border.CompoundBorder (outsideBorder, insideBorder);
}, "javax.swing.border.Border,javax.swing.border.Border");
c$.createMatteBorder = Clazz.defineMethod (c$, "createMatteBorder", 
function (top, left, bottom, right, color) {
return  new javax.swing.border.MatteBorder (top, left, bottom, right, color);
}, "~N,~N,~N,~N,java.awt.Color");
c$.createMatteBorder = Clazz.defineMethod (c$, "createMatteBorder", 
function (top, left, bottom, right, tileIcon) {
return  new javax.swing.border.MatteBorder (top, left, bottom, right, tileIcon);
}, "~N,~N,~N,~N,javax.swing.Icon");
c$.sharedRaisedBevel = c$.prototype.sharedRaisedBevel =  new javax.swing.border.BevelBorder (0);
c$.sharedLoweredBevel = c$.prototype.sharedLoweredBevel =  new javax.swing.border.BevelBorder (1);
c$.sharedEtchedBorder = c$.prototype.sharedEtchedBorder =  new javax.swing.border.EtchedBorder ();
Clazz.defineStatics (c$,
"sharedRaisedEtchedBorder", null);
c$.emptyBorder = c$.prototype.emptyBorder =  new javax.swing.border.EmptyBorder (0, 0, 0, 0);
});
