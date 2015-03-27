Clazz.declarePackage ("jsjava.text");
Clazz.load (["jsjava.text.Format"], "jsjava.text.FieldPosition", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.field = 0;
this.endIndex = 0;
this.beginIndex = 0;
this.attribute = null;
if (!Clazz.isClassDefined ("jsjava.text.FieldPosition.Delegate")) {
jsjava.text.FieldPosition.$FieldPosition$Delegate$ ();
}
Clazz.instantialize (this, arguments);
}, jsjava.text, "FieldPosition");
Clazz.makeConstructor (c$, 
function (field) {
this.field = field;
}, "~N");
Clazz.makeConstructor (c$, 
function (attribute) {
this.construct (attribute, -1);
}, "jsjava.text.Format.Field");
Clazz.makeConstructor (c$, 
function (attribute, fieldID) {
this.attribute = attribute;
this.field = fieldID;
}, "jsjava.text.Format.Field,~N");
Clazz.defineMethod (c$, "getFieldAttribute", 
function () {
return this.attribute;
});
Clazz.defineMethod (c$, "getField", 
function () {
return this.field;
});
Clazz.defineMethod (c$, "getBeginIndex", 
function () {
return this.beginIndex;
});
Clazz.defineMethod (c$, "getEndIndex", 
function () {
return this.endIndex;
});
Clazz.defineMethod (c$, "setBeginIndex", 
function (bi) {
this.beginIndex = bi;
}, "~N");
Clazz.defineMethod (c$, "setEndIndex", 
function (ei) {
this.endIndex = ei;
}, "~N");
Clazz.defineMethod (c$, "getFieldDelegate", 
function () {
return Clazz.innerTypeInstance (jsjava.text.FieldPosition.Delegate, this, null);
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj == null) return false;
if (!(Clazz.instanceOf (obj, jsjava.text.FieldPosition))) return false;
var other = obj;
if (this.attribute == null) {
if (other.attribute != null) {
return false;
}} else if (!this.attribute.equals (other.attribute)) {
return false;
}return (this.beginIndex == other.beginIndex && this.endIndex == other.endIndex && this.field == other.field);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return (this.field << 24) | (this.beginIndex << 16) | this.endIndex;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[field=" + this.field + ",attribute=" + this.attribute + ",beginIndex=" + this.beginIndex + ",endIndex=" + this.endIndex + ']';
});
Clazz.defineMethod (c$, "matchesField", 
($fz = function (attribute) {
if (this.attribute != null) {
return this.attribute.equals (attribute);
}return false;
}, $fz.isPrivate = true, $fz), "jsjava.text.Format.Field");
Clazz.defineMethod (c$, "matchesField", 
($fz = function (attribute, field) {
if (this.attribute != null) {
return this.attribute.equals (attribute);
}return (field == this.field);
}, $fz.isPrivate = true, $fz), "jsjava.text.Format.Field,~N");
c$.$FieldPosition$Delegate$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.encounteredField = false;
Clazz.instantialize (this, arguments);
}, jsjava.text.FieldPosition, "Delegate", null, jsjava.text.Format.FieldDelegate);
Clazz.defineMethod (c$, "formatted", 
function (a, b, c, d, e) {
if (!this.encounteredField && this.b$["jsjava.text.FieldPosition"].matchesField (a)) {
this.b$["jsjava.text.FieldPosition"].setBeginIndex (c);
this.b$["jsjava.text.FieldPosition"].setEndIndex (d);
this.encounteredField = (c != d);
}}, "jsjava.text.Format.Field,~O,~N,~N,StringBuffer");
Clazz.defineMethod (c$, "formatted", 
function (a, b, c, d, e, f) {
if (!this.encounteredField && this.b$["jsjava.text.FieldPosition"].matchesField (b, a)) {
this.b$["jsjava.text.FieldPosition"].setBeginIndex (d);
this.b$["jsjava.text.FieldPosition"].setEndIndex (e);
this.encounteredField = (d != e);
}}, "~N,jsjava.text.Format.Field,~O,~N,~N,StringBuffer");
c$ = Clazz.p0p ();
};
});
