Clazz.declarePackage ("sun.java2d.loops");
Clazz.load (null, "sun.java2d.loops.CompositeType", ["java.lang.InternalError"], function () {
c$ = Clazz.decorateAsClass (function () {
this.uniqueID = 0;
this.desc = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, sun.java2d.loops, "CompositeType");
Clazz.defineMethod (c$, "deriveSubType", 
function (desc) {
return  new sun.java2d.loops.CompositeType (this, desc);
}, "~S");
c$.forAlphaComposite = Clazz.defineMethod (c$, "forAlphaComposite", 
function (ac) {
switch (ac.getRule ()) {
case 1:
return sun.java2d.loops.CompositeType.Clear;
case 2:
if (ac.getAlpha () >= 1.0) {
return sun.java2d.loops.CompositeType.SrcNoEa;
} else {
return sun.java2d.loops.CompositeType.Src;
}case 9:
return sun.java2d.loops.CompositeType.Dst;
case 3:
if (ac.getAlpha () >= 1.0) {
return sun.java2d.loops.CompositeType.SrcOverNoEa;
} else {
return sun.java2d.loops.CompositeType.SrcOver;
}case 4:
return sun.java2d.loops.CompositeType.DstOver;
case 5:
return sun.java2d.loops.CompositeType.SrcIn;
case 6:
return sun.java2d.loops.CompositeType.DstIn;
case 7:
return sun.java2d.loops.CompositeType.SrcOut;
case 8:
return sun.java2d.loops.CompositeType.DstOut;
case 10:
return sun.java2d.loops.CompositeType.SrcAtop;
case 11:
return sun.java2d.loops.CompositeType.DstAtop;
case 12:
return sun.java2d.loops.CompositeType.AlphaXor;
default:
throw  new InternalError ("Unrecognized alpha rule");
}
}, "java.awt.AlphaComposite");
Clazz.makeConstructor (c$, 
 function (parent, desc) {
this.next = parent;
this.desc = desc;
this.uniqueID = sun.java2d.loops.CompositeType.makeUniqueID ();
}, "sun.java2d.loops.CompositeType,~S");
c$.makeUniqueID = Clazz.defineMethod (c$, "makeUniqueID", 
 function () {
if (sun.java2d.loops.CompositeType.unusedUID > 255) {
throw  new InternalError ("composite type id overflow");
}return sun.java2d.loops.CompositeType.unusedUID++;
});
Clazz.defineMethod (c$, "getUniqueID", 
function () {
return this.uniqueID;
});
Clazz.defineMethod (c$, "getDescriptor", 
function () {
return this.desc;
});
Clazz.defineMethod (c$, "getSuperType", 
function () {
return this.next;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.desc.hashCode ();
});
Clazz.defineMethod (c$, "isDerivedFrom", 
function (other) {
var comptype = this;
do {
if (comptype.desc === other.desc) {
return true;
}comptype = comptype.next;
} while (comptype != null);
return false;
}, "sun.java2d.loops.CompositeType");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (Clazz.instanceOf (o, sun.java2d.loops.CompositeType)) {
return ((o).uniqueID == this.uniqueID);
}return false;
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.desc;
});
Clazz.defineStatics (c$,
"DESC_ANY", "Any CompositeContext",
"DESC_XOR", "XOR mode",
"DESC_CLEAR", "Porter-Duff Clear",
"DESC_SRC", "Porter-Duff Src",
"DESC_DST", "Porter-Duff Dst",
"DESC_SRC_OVER", "Porter-Duff Src Over Dst",
"DESC_DST_OVER", "Porter-Duff Dst Over Src",
"DESC_SRC_IN", "Porter-Duff Src In Dst",
"DESC_DST_IN", "Porter-Duff Dst In Src",
"DESC_SRC_OUT", "Porter-Duff Src HeldOutBy Dst",
"DESC_DST_OUT", "Porter-Duff Dst HeldOutBy Src",
"DESC_SRC_ATOP", "Porter-Duff Src Atop Dst",
"DESC_DST_ATOP", "Porter-Duff Dst Atop Src",
"DESC_ALPHA_XOR", "Porter-Duff Xor",
"DESC_SRC_NO_EA", "Porter-Duff Src, No Extra Alpha",
"DESC_SRC_OVER_NO_EA", "Porter-Duff SrcOverDst, No Extra Alpha",
"DESC_ANY_ALPHA", "Any AlphaComposite Rule");
c$.Any = c$.prototype.Any =  new sun.java2d.loops.CompositeType (null, "Any CompositeContext");
c$.General = c$.prototype.General = sun.java2d.loops.CompositeType.Any;
c$.AnyAlpha = c$.prototype.AnyAlpha = sun.java2d.loops.CompositeType.General.deriveSubType ("Any AlphaComposite Rule");
c$.Xor = c$.prototype.Xor = sun.java2d.loops.CompositeType.General.deriveSubType ("XOR mode");
c$.Clear = c$.prototype.Clear = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Clear");
c$.Src = c$.prototype.Src = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Src");
c$.Dst = c$.prototype.Dst = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Dst");
c$.SrcOver = c$.prototype.SrcOver = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Src Over Dst");
c$.DstOver = c$.prototype.DstOver = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Dst Over Src");
c$.SrcIn = c$.prototype.SrcIn = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Src In Dst");
c$.DstIn = c$.prototype.DstIn = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Dst In Src");
c$.SrcOut = c$.prototype.SrcOut = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Src HeldOutBy Dst");
c$.DstOut = c$.prototype.DstOut = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Dst HeldOutBy Src");
c$.SrcAtop = c$.prototype.SrcAtop = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Src Atop Dst");
c$.DstAtop = c$.prototype.DstAtop = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Dst Atop Src");
c$.AlphaXor = c$.prototype.AlphaXor = sun.java2d.loops.CompositeType.AnyAlpha.deriveSubType ("Porter-Duff Xor");
c$.SrcNoEa = c$.prototype.SrcNoEa = sun.java2d.loops.CompositeType.Src.deriveSubType ("Porter-Duff Src, No Extra Alpha");
c$.SrcOverNoEa = c$.prototype.SrcOverNoEa = sun.java2d.loops.CompositeType.SrcOver.deriveSubType ("Porter-Duff SrcOverDst, No Extra Alpha");
Clazz.defineStatics (c$,
"unusedUID", 1);
});
