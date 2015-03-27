Clazz.declarePackage ("jssun.font");
Clazz.load (["jssun.font.EAttribute"], "jssun.font.AttributeValues", ["java.lang.Boolean", "$.Float", "$.InternalError", "$.Number", "$.StringBuilder", "java.util.HashMap", "jsjava.awt.font.TextAttribute", "jsjava.awt.geom.AffineTransform", "$.Point2D", "jssun.font.AttributeMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.defined = 0;
this.nondefault = 0;
this.family = "Default";
this.weight = 1;
this.width = 1;
this.posture = 0;
this.size = 12;
this.tracking = 0;
this.transform = null;
this.foreground = null;
this.background = null;
this.justification = 1;
this.imHighlight = null;
this.font = null;
this.imUnderline = -1;
this.superscript = 0;
this.underline = -1;
this.runDirection = -2;
this.bidiEmbedding = 0;
this.kerning = 0;
this.ligatures = 0;
this.strikethrough = false;
this.swapColors = false;
this.baselineTransform = null;
this.charTransform = null;
Clazz.instantialize (this, arguments);
}, jssun.font, "AttributeValues", null, Cloneable);
Clazz.defineMethod (c$, "getFamily", 
function () {
return this.family;
});
Clazz.defineMethod (c$, "setFamily", 
function (f) {
this.family = f;
this.update (jssun.font.EAttribute.EFAMILY);
}, "~S");
Clazz.defineMethod (c$, "getWeight", 
function () {
return this.weight;
});
Clazz.defineMethod (c$, "setWeight", 
function (f) {
this.weight = f;
this.update (jssun.font.EAttribute.EWEIGHT);
}, "~N");
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "setWidth", 
function (f) {
this.width = f;
this.update (jssun.font.EAttribute.EWIDTH);
}, "~N");
Clazz.defineMethod (c$, "getPosture", 
function () {
return this.posture;
});
Clazz.defineMethod (c$, "setPosture", 
function (f) {
this.posture = f;
this.update (jssun.font.EAttribute.EPOSTURE);
}, "~N");
Clazz.defineMethod (c$, "getSize", 
function () {
return this.size;
});
Clazz.defineMethod (c$, "setSize", 
function (f) {
this.size = f;
this.update (jssun.font.EAttribute.ESIZE);
}, "~N");
Clazz.defineMethod (c$, "getTransform", 
function () {
return this.transform;
});
Clazz.defineMethod (c$, "setTransform", 
function (f) {
this.transform = (f == null || f.isIdentity ()) ? jssun.font.AttributeValues.DEFAULT.transform :  new jsjava.awt.geom.AffineTransform (f);
this.updateDerivedTransforms ();
this.update (jssun.font.EAttribute.ETRANSFORM);
}, "jsjava.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "getSuperscript", 
function () {
return this.superscript;
});
Clazz.defineMethod (c$, "setSuperscript", 
function (f) {
this.superscript = f;
this.update (jssun.font.EAttribute.ESUPERSCRIPT);
}, "~N");
Clazz.defineMethod (c$, "getFont", 
function () {
return this.font;
});
Clazz.defineMethod (c$, "setFont", 
function (f) {
this.font = f;
this.update (jssun.font.EAttribute.EFONT);
}, "jsjava.awt.Font");
Clazz.defineMethod (c$, "getForeground", 
function () {
return this.foreground;
});
Clazz.defineMethod (c$, "setForeground", 
function (f) {
this.foreground = f;
this.update (jssun.font.EAttribute.EFOREGROUND);
}, "jsjava.awt.Paint");
Clazz.defineMethod (c$, "getBackground", 
function () {
return this.background;
});
Clazz.defineMethod (c$, "setBackground", 
function (f) {
this.background = f;
this.update (jssun.font.EAttribute.EBACKGROUND);
}, "jsjava.awt.Paint");
Clazz.defineMethod (c$, "getUnderline", 
function () {
return this.underline;
});
Clazz.defineMethod (c$, "setUnderline", 
function (f) {
this.underline = f;
this.update (jssun.font.EAttribute.EUNDERLINE);
}, "~N");
Clazz.defineMethod (c$, "getStrikethrough", 
function () {
return this.strikethrough;
});
Clazz.defineMethod (c$, "setStrikethrough", 
function (f) {
this.strikethrough = f;
this.update (jssun.font.EAttribute.ESTRIKETHROUGH);
}, "~B");
Clazz.defineMethod (c$, "getRunDirection", 
function () {
return this.runDirection;
});
Clazz.defineMethod (c$, "setRunDirection", 
function (f) {
this.runDirection = f;
this.update (jssun.font.EAttribute.ERUN_DIRECTION);
}, "~N");
Clazz.defineMethod (c$, "getBidiEmbedding", 
function () {
return this.bidiEmbedding;
});
Clazz.defineMethod (c$, "setBidiEmbedding", 
function (f) {
this.bidiEmbedding = f;
this.update (jssun.font.EAttribute.EBIDI_EMBEDDING);
}, "~N");
Clazz.defineMethod (c$, "getJustification", 
function () {
return this.justification;
});
Clazz.defineMethod (c$, "setJustification", 
function (f) {
this.justification = f;
this.update (jssun.font.EAttribute.EJUSTIFICATION);
}, "~N");
Clazz.defineMethod (c$, "getInputMethodHighlight", 
function () {
return this.imHighlight;
});
Clazz.defineMethod (c$, "setInputMethodHighlight", 
function (f) {
this.imHighlight = f;
this.update (jssun.font.EAttribute.EINPUT_METHOD_HIGHLIGHT);
}, "jsjava.text.Annotation");
Clazz.defineMethod (c$, "getInputMethodUnderline", 
function () {
return this.imUnderline;
});
Clazz.defineMethod (c$, "setInputMethodUnderline", 
function (f) {
this.imUnderline = f;
this.update (jssun.font.EAttribute.EINPUT_METHOD_UNDERLINE);
}, "~N");
Clazz.defineMethod (c$, "getSwapColors", 
function () {
return this.swapColors;
});
Clazz.defineMethod (c$, "setSwapColors", 
function (f) {
this.swapColors = f;
this.update (jssun.font.EAttribute.ESWAP_COLORS);
}, "~B");
Clazz.defineMethod (c$, "getKerning", 
function () {
return this.kerning;
});
Clazz.defineMethod (c$, "setKerning", 
function (f) {
this.kerning = f;
this.update (jssun.font.EAttribute.EKERNING);
}, "~N");
Clazz.defineMethod (c$, "getTracking", 
function () {
return this.tracking;
});
Clazz.defineMethod (c$, "setTracking", 
function (f) {
this.tracking = Clazz.floatToByte (f);
this.update (jssun.font.EAttribute.ETRACKING);
}, "~N");
Clazz.defineMethod (c$, "getLigatures", 
function () {
return this.ligatures;
});
Clazz.defineMethod (c$, "setLigatures", 
function (f) {
this.ligatures = f;
this.update (jssun.font.EAttribute.ELIGATURES);
}, "~N");
Clazz.defineMethod (c$, "getBaselineTransform", 
function () {
return this.baselineTransform;
});
Clazz.defineMethod (c$, "getCharTransform", 
function () {
return this.charTransform;
});
c$.getMask = Clazz.defineMethod (c$, "getMask", 
function (att) {
return att.mask;
}, "jssun.font.EAttribute");
c$.getMask = Clazz.defineMethod (c$, "getMask", 
function (atts) {
var mask = 0;
for (var a, $a = 0, $$a = atts; $a < $$a.length && ((a = $$a[$a]) || true); $a++) {
mask |= a.mask;
}
return mask;
}, "~A");
Clazz.defineMethod (c$, "unsetDefault", 
function () {
this.defined &= this.nondefault;
});
Clazz.defineMethod (c$, "defineAll", 
function (mask) {
this.defined |= mask;
if ((this.defined & jssun.font.EAttribute.EBASELINE_TRANSFORM.mask) != 0) {
throw  new InternalError ("can't define derived attribute");
}}, "~N");
Clazz.defineMethod (c$, "allDefined", 
function (mask) {
return (this.defined & mask) == mask;
}, "~N");
Clazz.defineMethod (c$, "anyDefined", 
function (mask) {
return (this.defined & mask) != 0;
}, "~N");
Clazz.defineMethod (c$, "anyNonDefault", 
function (mask) {
return (this.nondefault & mask) != 0;
}, "~N");
Clazz.defineMethod (c$, "isDefined", 
function (a) {
return (this.defined & a.mask) != 0;
}, "jssun.font.EAttribute");
Clazz.defineMethod (c$, "isNonDefault", 
function (a) {
return (this.nondefault & a.mask) != 0;
}, "jssun.font.EAttribute");
Clazz.defineMethod (c$, "setDefault", 
function (a) {
if (a.att == null) {
throw  new InternalError ("can't set default derived attribute: " + a);
}this.i_set (a, jssun.font.AttributeValues.DEFAULT);
this.defined |= a.mask;
this.nondefault &= ~a.mask;
}, "jssun.font.EAttribute");
Clazz.defineMethod (c$, "unset", 
function (a) {
if (a.att == null) {
throw  new InternalError ("can't unset derived attribute: " + a);
}this.i_set (a, jssun.font.AttributeValues.DEFAULT);
this.defined &= ~a.mask;
this.nondefault &= ~a.mask;
}, "jssun.font.EAttribute");
Clazz.defineMethod (c$, "set", 
function (a, src) {
if (a.att == null) {
throw  new InternalError ("can't set derived attribute: " + a);
}if (src == null || src === jssun.font.AttributeValues.DEFAULT) {
this.setDefault (a);
} else {
if ((src.defined & a.mask) != 0) {
this.i_set (a, src);
this.update (a);
}}}, "jssun.font.EAttribute,jssun.font.AttributeValues");
Clazz.defineMethod (c$, "set", 
function (a, o) {
if (a.att == null) {
throw  new InternalError ("can't set derived attribute: " + a);
}if (o != null) {
try {
this.i_set (a, o);
this.update (a);
return;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}this.setDefault (a);
}, "jssun.font.EAttribute,~O");
Clazz.defineMethod (c$, "get", 
function (a) {
if (a.att == null) {
throw  new InternalError ("can't get derived attribute: " + a);
}if ((this.nondefault & a.mask) != 0) {
return this.i_get (a);
}return null;
}, "jssun.font.EAttribute");
Clazz.defineMethod (c$, "merge", 
function (map) {
return this.merge (map, jssun.font.AttributeValues.MASK_ALL);
}, "java.util.Map");
Clazz.defineMethod (c$, "merge", 
function (map, mask) {
if (Clazz.instanceOf (map, jssun.font.AttributeMap) && (map).getValues () != null) {
this.merge ((map).getValues (), mask);
} else if (map != null && !map.isEmpty ()) {
for (var e, $e = map.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var ea = jssun.font.EAttribute.forAttribute (e.getKey ());
if (ea != null && (mask & ea.mask) != 0) {
this.set (ea, e.getValue ());
}}
}return this;
}, "java.util.Map,~N");
Clazz.defineMethod (c$, "merge", 
function (src) {
return this.merge (src, jssun.font.AttributeValues.MASK_ALL);
}, "jssun.font.AttributeValues");
Clazz.defineMethod (c$, "merge", 
function (src, mask) {
var m = mask & src.defined;
for (var ea, $ea = 0, $$ea = jssun.font.EAttribute.atts; $ea < $$ea.length && ((ea = $$ea[$ea]) || true); $ea++) {
if (m == 0) {
break;
}if ((m & ea.mask) != 0) {
m &= ~ea.mask;
this.i_set (ea, src);
this.update (ea);
}}
return this;
}, "jssun.font.AttributeValues,~N");
c$.fromMap = Clazz.defineMethod (c$, "fromMap", 
function (map) {
return jssun.font.AttributeValues.fromMap (map, jssun.font.AttributeValues.MASK_ALL);
}, "java.util.Map");
c$.fromMap = Clazz.defineMethod (c$, "fromMap", 
function (map, mask) {
return  new jssun.font.AttributeValues ().merge (map, mask);
}, "java.util.Map,~N");
Clazz.defineMethod (c$, "toMap", 
function (fill) {
if (fill == null) {
fill =  new java.util.HashMap ();
}for (var m = this.defined, i = 0; m != 0; ++i) {
var ea = jssun.font.EAttribute.atts[i];
if ((m & ea.mask) != 0) {
m &= ~ea.mask;
fill.put (ea.att, this.get (ea));
}}
return fill;
}, "java.util.Map");
c$.is16Hashtable = Clazz.defineMethod (c$, "is16Hashtable", 
function (ht) {
return ht.containsKey ("sun.font.attributevalues.defined_key");
}, "java.util.Hashtable");
c$.fromSerializableHashtable = Clazz.defineMethod (c$, "fromSerializableHashtable", 
function (ht) {
var result =  new jssun.font.AttributeValues ();
if (ht != null && !ht.isEmpty ()) {
for (var e, $e = ht.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var key = e.getKey ();
var val = e.getValue ();
if (key.equals ("sun.font.attributevalues.defined_key")) {
result.defineAll ((val).intValue ());
} else {
try {
var ea = jssun.font.EAttribute.forAttribute (key);
if (ea != null) {
result.set (ea, val);
}} catch (ex) {
if (Clazz.exceptionOf (ex, ClassCastException)) {
} else {
throw ex;
}
}
}}
}return result;
}, "java.util.Hashtable");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.defined << 8 ^ this.nondefault;
});
Clazz.defineMethod (c$, "equals", 
function (rhs) {
try {
return this.equals (rhs);
} catch (e) {
if (Clazz.exceptionOf (e, ClassCastException)) {
} else {
throw e;
}
}
return false;
}, "~O");
Clazz.defineMethod (c$, "equals", 
function (rhs) {
if (rhs == null) return false;
if (rhs === this) return true;
return this.defined == rhs.defined && this.nondefault == rhs.nondefault && this.underline == rhs.underline && this.strikethrough == rhs.strikethrough && this.superscript == rhs.superscript && this.width == rhs.width && this.kerning == rhs.kerning && this.tracking == rhs.tracking && this.ligatures == rhs.ligatures && this.runDirection == rhs.runDirection && this.bidiEmbedding == rhs.bidiEmbedding && this.swapColors == rhs.swapColors && jssun.font.AttributeValues.equals (this.transform, rhs.transform) && jssun.font.AttributeValues.equals (new Float (this.justification), new Float (rhs.justification)) && this.size == rhs.size && this.weight == rhs.weight && this.posture == rhs.posture && jssun.font.AttributeValues.equals (this.family, rhs.family) && jssun.font.AttributeValues.equals (this.font, rhs.font) && this.imUnderline == rhs.imUnderline && jssun.font.AttributeValues.equals (this.imHighlight, rhs.imHighlight);
}, "jssun.font.AttributeValues");
Clazz.defineMethod (c$, "clone", 
function () {
try {
var result = Clazz.superCall (this, jssun.font.AttributeValues, "clone", []);
if (this.transform != null) {
result.transform =  new jsjava.awt.geom.AffineTransform (this.transform);
result.updateDerivedTransforms ();
}return result;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "toString", 
function () {
var b =  new StringBuilder ();
b.append ('{');
for (var m = this.defined, i = 0; m != 0; ++i) {
var ea = jssun.font.EAttribute.atts[i];
if ((m & ea.mask) != 0) {
m &= ~ea.mask;
if (b.length () > 1) {
b.append (", ");
}b.append (ea);
b.append ('=');
switch (ea) {
case jssun.font.EAttribute.EFAMILY:
b.append ('"');
b.append (this.family);
b.append ('"');
break;
case jssun.font.EAttribute.EWEIGHT:
b.append (this.weight);
break;
case jssun.font.EAttribute.EWIDTH:
b.append (this.width);
break;
case jssun.font.EAttribute.EPOSTURE:
b.append (this.posture);
break;
case jssun.font.EAttribute.ESIZE:
b.append (this.size);
break;
case jssun.font.EAttribute.ETRANSFORM:
b.append (this.transform);
break;
case jssun.font.EAttribute.ESUPERSCRIPT:
b.append (this.superscript);
break;
case jssun.font.EAttribute.EFONT:
b.append (this.font);
break;
case jssun.font.EAttribute.EUNDERLINE:
b.append (this.underline);
break;
case jssun.font.EAttribute.ESTRIKETHROUGH:
b.append (this.strikethrough);
break;
case jssun.font.EAttribute.ERUN_DIRECTION:
b.append (this.runDirection);
break;
case jssun.font.EAttribute.EBIDI_EMBEDDING:
b.append (this.bidiEmbedding);
break;
case jssun.font.EAttribute.EJUSTIFICATION:
b.append (this.justification);
break;
case jssun.font.EAttribute.EINPUT_METHOD_HIGHLIGHT:
b.append (this.imHighlight);
break;
case jssun.font.EAttribute.EINPUT_METHOD_UNDERLINE:
b.append (this.imUnderline);
break;
case jssun.font.EAttribute.ESWAP_COLORS:
b.append (this.swapColors);
break;
case jssun.font.EAttribute.EKERNING:
b.append (this.kerning);
break;
case jssun.font.EAttribute.ELIGATURES:
b.append (this.ligatures);
break;
case jssun.font.EAttribute.ETRACKING:
b.append (this.tracking);
break;
default:
throw  new InternalError ();
}
if ((this.nondefault & ea.mask) == 0) {
b.append ('*');
}}}
b.append ("[btx=" + this.baselineTransform + ", ctx=" + this.charTransform + "]");
b.append ('}');
return b.toString ();
});
c$.equals = Clazz.defineMethod (c$, "equals", 
($fz = function (lhs, rhs) {
return lhs == null ? rhs == null : lhs.equals (rhs);
}, $fz.isPrivate = true, $fz), "~O,~O");
Clazz.defineMethod (c$, "update", 
($fz = function (a) {
this.defined |= a.mask;
if (this.i_validate (a)) {
if (this.i_equals (a, jssun.font.AttributeValues.DEFAULT)) {
this.nondefault &= ~a.mask;
} else {
this.nondefault |= a.mask;
}} else {
this.setDefault (a);
}}, $fz.isPrivate = true, $fz), "jssun.font.EAttribute");
Clazz.defineMethod (c$, "i_set", 
($fz = function (a, src) {
switch (a) {
case jssun.font.EAttribute.EFAMILY:
this.family = src.family;
break;
case jssun.font.EAttribute.EWEIGHT:
this.weight = src.weight;
break;
case jssun.font.EAttribute.EWIDTH:
this.width = src.width;
break;
case jssun.font.EAttribute.EPOSTURE:
this.posture = src.posture;
break;
case jssun.font.EAttribute.ESIZE:
this.size = src.size;
break;
case jssun.font.EAttribute.ETRANSFORM:
this.transform = src.transform;
this.updateDerivedTransforms ();
break;
case jssun.font.EAttribute.ESUPERSCRIPT:
this.superscript = src.superscript;
break;
case jssun.font.EAttribute.EFONT:
this.font = src.font;
break;
case jssun.font.EAttribute.EUNDERLINE:
this.underline = src.underline;
break;
case jssun.font.EAttribute.ESTRIKETHROUGH:
this.strikethrough = src.strikethrough;
break;
case jssun.font.EAttribute.ERUN_DIRECTION:
this.runDirection = src.runDirection;
break;
case jssun.font.EAttribute.EBIDI_EMBEDDING:
this.bidiEmbedding = src.bidiEmbedding;
break;
case jssun.font.EAttribute.EJUSTIFICATION:
this.justification = src.justification;
break;
case jssun.font.EAttribute.EINPUT_METHOD_HIGHLIGHT:
this.imHighlight = src.imHighlight;
break;
case jssun.font.EAttribute.EINPUT_METHOD_UNDERLINE:
this.imUnderline = src.imUnderline;
break;
case jssun.font.EAttribute.ESWAP_COLORS:
this.swapColors = src.swapColors;
break;
case jssun.font.EAttribute.EKERNING:
this.kerning = src.kerning;
break;
case jssun.font.EAttribute.ELIGATURES:
this.ligatures = src.ligatures;
break;
case jssun.font.EAttribute.ETRACKING:
this.tracking = src.tracking;
break;
default:
throw  new InternalError ();
}
}, $fz.isPrivate = true, $fz), "jssun.font.EAttribute,jssun.font.AttributeValues");
Clazz.defineMethod (c$, "i_equals", 
($fz = function (a, src) {
switch (a) {
case jssun.font.EAttribute.EFAMILY:
return jssun.font.AttributeValues.equals (this.family, src.family);
case jssun.font.EAttribute.EWEIGHT:
return this.weight == src.weight;
case jssun.font.EAttribute.EWIDTH:
return this.width == src.width;
case jssun.font.EAttribute.EPOSTURE:
return this.posture == src.posture;
case jssun.font.EAttribute.ESIZE:
return this.size == src.size;
case jssun.font.EAttribute.ETRANSFORM:
return jssun.font.AttributeValues.equals (this.transform, src.transform);
case jssun.font.EAttribute.ESUPERSCRIPT:
return this.superscript == src.superscript;
case jssun.font.EAttribute.EFONT:
return jssun.font.AttributeValues.equals (this.font, src.font);
case jssun.font.EAttribute.EUNDERLINE:
return this.underline == src.underline;
case jssun.font.EAttribute.ESTRIKETHROUGH:
return this.strikethrough == src.strikethrough;
case jssun.font.EAttribute.ERUN_DIRECTION:
return this.runDirection == src.runDirection;
case jssun.font.EAttribute.EBIDI_EMBEDDING:
return this.bidiEmbedding == src.bidiEmbedding;
case jssun.font.EAttribute.EJUSTIFICATION:
return this.justification == src.justification;
case jssun.font.EAttribute.EINPUT_METHOD_HIGHLIGHT:
return jssun.font.AttributeValues.equals (this.imHighlight, src.imHighlight);
case jssun.font.EAttribute.EINPUT_METHOD_UNDERLINE:
return this.imUnderline == src.imUnderline;
case jssun.font.EAttribute.ESWAP_COLORS:
return this.swapColors == src.swapColors;
case jssun.font.EAttribute.EKERNING:
return this.kerning == src.kerning;
case jssun.font.EAttribute.ELIGATURES:
return this.ligatures == src.ligatures;
case jssun.font.EAttribute.ETRACKING:
return this.tracking == src.tracking;
default:
throw  new InternalError ();
}
}, $fz.isPrivate = true, $fz), "jssun.font.EAttribute,jssun.font.AttributeValues");
Clazz.defineMethod (c$, "i_set", 
($fz = function (a, o) {
switch (a) {
case jssun.font.EAttribute.EFAMILY:
this.family = (o).trim ();
break;
case jssun.font.EAttribute.EWEIGHT:
this.weight = (o).floatValue ();
break;
case jssun.font.EAttribute.EWIDTH:
this.width = (o).floatValue ();
break;
case jssun.font.EAttribute.EPOSTURE:
this.posture = (o).floatValue ();
break;
case jssun.font.EAttribute.ESIZE:
this.size = (o).floatValue ();
break;
case jssun.font.EAttribute.ESUPERSCRIPT:
this.superscript = (o).intValue ();
break;
case jssun.font.EAttribute.EFONT:
this.font = o;
break;
case jssun.font.EAttribute.EUNDERLINE:
this.underline = (o).intValue ();
break;
case jssun.font.EAttribute.ESTRIKETHROUGH:
this.strikethrough = (o).booleanValue ();
break;
case jssun.font.EAttribute.ERUN_DIRECTION:
{
if (Clazz.instanceOf (o, Boolean)) {
this.runDirection = (jsjava.awt.font.TextAttribute.RUN_DIRECTION_LTR.equals (o) ? 0 : 1);
} else {
this.runDirection = (o).intValue ();
}}break;
case jssun.font.EAttribute.EBIDI_EMBEDDING:
this.bidiEmbedding = (o).intValue ();
break;
case jssun.font.EAttribute.EJUSTIFICATION:
this.justification = (o).floatValue ();
break;
case jssun.font.EAttribute.EINPUT_METHOD_UNDERLINE:
this.imUnderline = (o).intValue ();
break;
case jssun.font.EAttribute.ESWAP_COLORS:
this.swapColors = (o).booleanValue ();
break;
case jssun.font.EAttribute.EKERNING:
this.kerning = (o).intValue ();
break;
case jssun.font.EAttribute.ELIGATURES:
this.ligatures = (o).intValue ();
break;
case jssun.font.EAttribute.ETRACKING:
this.tracking = (o).floatValue ();
break;
default:
throw  new InternalError ();
}
}, $fz.isPrivate = true, $fz), "jssun.font.EAttribute,~O");
Clazz.defineMethod (c$, "i_get", 
($fz = function (a) {
switch (a) {
case jssun.font.EAttribute.EFAMILY:
return this.family;
case jssun.font.EAttribute.EWEIGHT:
return Float.$valueOf (this.weight);
case jssun.font.EAttribute.EWIDTH:
return Float.$valueOf (this.width);
case jssun.font.EAttribute.EPOSTURE:
return Float.$valueOf (this.posture);
case jssun.font.EAttribute.ESIZE:
return Float.$valueOf (this.size);
case jssun.font.EAttribute.ESUPERSCRIPT:
return Integer.$valueOf (this.superscript);
case jssun.font.EAttribute.EFONT:
return this.font;
case jssun.font.EAttribute.EUNDERLINE:
return Integer.$valueOf (this.underline);
case jssun.font.EAttribute.ESTRIKETHROUGH:
return Boolean.$valueOf (this.strikethrough);
case jssun.font.EAttribute.ERUN_DIRECTION:
{
switch (this.runDirection) {
case 0:
return jsjava.awt.font.TextAttribute.RUN_DIRECTION_LTR;
case 1:
return jsjava.awt.font.TextAttribute.RUN_DIRECTION_RTL;
default:
return null;
}
}case jssun.font.EAttribute.EBIDI_EMBEDDING:
return Integer.$valueOf (this.bidiEmbedding);
case jssun.font.EAttribute.EJUSTIFICATION:
return Float.$valueOf (this.justification);
case jssun.font.EAttribute.EINPUT_METHOD_HIGHLIGHT:
return this.imHighlight;
case jssun.font.EAttribute.EINPUT_METHOD_UNDERLINE:
return Integer.$valueOf (this.imUnderline);
case jssun.font.EAttribute.ESWAP_COLORS:
return Boolean.$valueOf (this.swapColors);
case jssun.font.EAttribute.EKERNING:
return Integer.$valueOf (this.kerning);
case jssun.font.EAttribute.ELIGATURES:
return Integer.$valueOf (this.ligatures);
case jssun.font.EAttribute.ETRACKING:
return Float.$valueOf (this.tracking);
default:
throw  new InternalError ();
}
}, $fz.isPrivate = true, $fz), "jssun.font.EAttribute");
Clazz.defineMethod (c$, "i_validate", 
($fz = function (a) {
switch (a) {
case jssun.font.EAttribute.EFAMILY:
if (this.family == null || this.family.length == 0) this.family = jssun.font.AttributeValues.DEFAULT.family;
return true;
case jssun.font.EAttribute.EWEIGHT:
return this.weight > 0 && this.weight < 10;
case jssun.font.EAttribute.EWIDTH:
return this.width >= .5 && this.width < 10;
case jssun.font.EAttribute.EPOSTURE:
return this.posture >= -1 && this.posture <= 1;
case jssun.font.EAttribute.ESIZE:
return this.size >= 0;
case jssun.font.EAttribute.ETRANSFORM:
if (this.transform != null && this.transform.isIdentity ()) this.transform = jssun.font.AttributeValues.DEFAULT.transform;
return true;
case jssun.font.EAttribute.ESUPERSCRIPT:
return this.superscript >= -7 && this.superscript <= 7;
case jssun.font.EAttribute.EFONT:
return true;
case jssun.font.EAttribute.ECHAR_REPLACEMENT:
return true;
case jssun.font.EAttribute.EFOREGROUND:
return true;
case jssun.font.EAttribute.EBACKGROUND:
return true;
case jssun.font.EAttribute.EUNDERLINE:
return this.underline >= -1 && this.underline < 6;
case jssun.font.EAttribute.ESTRIKETHROUGH:
return true;
case jssun.font.EAttribute.ERUN_DIRECTION:
return this.runDirection >= -2 && this.runDirection <= 1;
case jssun.font.EAttribute.EBIDI_EMBEDDING:
return this.bidiEmbedding >= -61 && this.bidiEmbedding < 62;
case jssun.font.EAttribute.EJUSTIFICATION:
this.justification = Math.max (0, Math.min (this.justification, 1));
return true;
case jssun.font.EAttribute.EINPUT_METHOD_HIGHLIGHT:
return true;
case jssun.font.EAttribute.EINPUT_METHOD_UNDERLINE:
return this.imUnderline >= -1 && this.imUnderline < 6;
case jssun.font.EAttribute.ESWAP_COLORS:
return true;
case jssun.font.EAttribute.ENUMERIC_SHAPING:
return true;
case jssun.font.EAttribute.EKERNING:
return this.kerning >= 0 && this.kerning <= 1;
case jssun.font.EAttribute.ELIGATURES:
return this.ligatures >= 0 && this.ligatures <= 1;
case jssun.font.EAttribute.ETRACKING:
return this.tracking >= -1 && this.tracking <= 10;
default:
throw  new InternalError ("unknown attribute: " + a);
}
}, $fz.isPrivate = true, $fz), "jssun.font.EAttribute");
c$.getJustification = Clazz.defineMethod (c$, "getJustification", 
function (map) {
if (map != null) {
if (Clazz.instanceOf (map, jssun.font.AttributeMap) && (map).getValues () != null) {
return (map).getValues ().justification;
}var obj = map.get (jsjava.awt.font.TextAttribute.JUSTIFICATION);
if (obj != null && Clazz.instanceOf (obj, Number)) {
return Math.max (0, Math.min (1, (obj).floatValue ()));
}}return jssun.font.AttributeValues.DEFAULT.justification;
}, "java.util.Map");
Clazz.defineMethod (c$, "applyIMHighlight", 
function () {
return this;
});
c$.getBaselineTransform = Clazz.defineMethod (c$, "getBaselineTransform", 
function (map) {
if (map != null) {
var av = null;
if (Clazz.instanceOf (map, jssun.font.AttributeMap) && (map).getValues () != null) {
av = (map).getValues ();
} else if (map.get (jsjava.awt.font.TextAttribute.TRANSFORM) != null) {
av = jssun.font.AttributeValues.fromMap (map);
}if (av != null) {
return av.baselineTransform;
}}return null;
}, "java.util.Map");
c$.getCharTransform = Clazz.defineMethod (c$, "getCharTransform", 
function (map) {
if (map != null) {
var av = null;
if (Clazz.instanceOf (map, jssun.font.AttributeMap) && (map).getValues () != null) {
av = (map).getValues ();
} else if (map.get (jsjava.awt.font.TextAttribute.TRANSFORM) != null) {
av = jssun.font.AttributeValues.fromMap (map);
}if (av != null) {
return av.charTransform;
}}return null;
}, "java.util.Map");
Clazz.defineMethod (c$, "updateDerivedTransforms", 
function () {
if (this.transform == null) {
this.baselineTransform = null;
this.charTransform = null;
} else {
this.charTransform =  new jsjava.awt.geom.AffineTransform (this.transform);
this.baselineTransform = jssun.font.AttributeValues.extractXRotation (this.charTransform, true);
if (this.charTransform.isIdentity ()) {
this.charTransform = null;
}if (this.baselineTransform.isIdentity ()) {
this.baselineTransform = null;
}}if (this.baselineTransform == null) {
this.nondefault &= ~jssun.font.EAttribute.EBASELINE_TRANSFORM.mask;
} else {
this.nondefault |= jssun.font.EAttribute.EBASELINE_TRANSFORM.mask;
}});
c$.extractXRotation = Clazz.defineMethod (c$, "extractXRotation", 
function (tx, andTranslation) {
return jssun.font.AttributeValues.extractRotation ( new jsjava.awt.geom.Point2D.Double (1, 0), tx, andTranslation);
}, "jsjava.awt.geom.AffineTransform,~B");
c$.extractYRotation = Clazz.defineMethod (c$, "extractYRotation", 
function (tx, andTranslation) {
return jssun.font.AttributeValues.extractRotation ( new jsjava.awt.geom.Point2D.Double (0, 1), tx, andTranslation);
}, "jsjava.awt.geom.AffineTransform,~B");
c$.extractRotation = Clazz.defineMethod (c$, "extractRotation", 
($fz = function (pt, tx, andTranslation) {
tx.deltaTransform (pt, pt);
var rtx = jsjava.awt.geom.AffineTransform.getRotateInstance (pt.x, pt.y);
try {
var rtxi = rtx.createInverse ();
var dx = tx.getTranslateX ();
var dy = tx.getTranslateY ();
tx.preConcatenate (rtxi);
if (andTranslation) {
if (dx != 0 || dy != 0) {
tx.setTransform (tx.getScaleX (), tx.getShearY (), tx.getShearX (), tx.getScaleY (), 0, 0);
rtx.setTransform (rtx.getScaleX (), rtx.getShearY (), rtx.getShearX (), rtx.getScaleY (), dx, dy);
}}} catch (e) {
if (Clazz.exceptionOf (e, jsjava.awt.geom.NoninvertibleTransformException)) {
return null;
} else {
throw e;
}
}
return rtx;
}, $fz.isPrivate = true, $fz), "jsjava.awt.geom.Point2D.Double,jsjava.awt.geom.AffineTransform,~B");
c$.DEFAULT = c$.prototype.DEFAULT =  new jssun.font.AttributeValues ();
c$.MASK_ALL = c$.prototype.MASK_ALL = jssun.font.AttributeValues.getMask (jssun.font.EAttribute.getEnumConstants ());
Clazz.defineStatics (c$,
"DEFINED_KEY", "sun.font.attributevalues.defined_key");
});
