Clazz.declarePackage ("jsjava.text");
Clazz.load (["jsjava.text.AttributedCharacterIterator"], "jsjava.text.Format", ["java.lang.StringBuffer", "jsjava.text.AttributedString", "$.FieldPosition", "$.ParseException", "$.ParsePosition"], function () {
c$ = Clazz.declareType (jsjava.text, "Format", null, [java.io.Serializable, Cloneable]);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "format", 
function (obj) {
return this.format (obj,  new StringBuffer (),  new jsjava.text.FieldPosition (0)).toString ();
}, "~O");
Clazz.defineMethod (c$, "formatToCharacterIterator", 
function (obj) {
return this.createAttributedCharacterIterator (this.format (obj));
}, "~O");
Clazz.defineMethod (c$, "parseObject", 
function (source) {
var pos =  new jsjava.text.ParsePosition (0);
var result = this.parseObject (source, pos);
if (pos.index == 0) {
throw  new jsjava.text.ParseException ("Format.parseObject(String) failed", pos.errorIndex);
}return result;
}, "~S");
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, jsjava.text.Format, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
return null;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "createAttributedCharacterIterator", 
function (s) {
var as =  new jsjava.text.AttributedString (s);
return as.getIterator ();
}, "~S");
Clazz.defineMethod (c$, "createAttributedCharacterIterator", 
function (iterators) {
var as =  new jsjava.text.AttributedString (iterators);
return as.getIterator ();
}, "~A");
Clazz.defineMethod (c$, "createAttributedCharacterIterator", 
function (string, key, value) {
var as =  new jsjava.text.AttributedString (string);
as.addAttribute (key, value);
return as.getIterator ();
}, "~S,jsjava.text.AttributedCharacterIterator.Attribute,~O");
Clazz.defineMethod (c$, "createAttributedCharacterIterator", 
function (iterator, key, value) {
var as =  new jsjava.text.AttributedString (iterator);
as.addAttribute (key, value);
return as.getIterator ();
}, "jsjava.text.AttributedCharacterIterator,jsjava.text.AttributedCharacterIterator.Attribute,~O");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjava.text.Format, "Field", jsjava.text.AttributedCharacterIterator.Attribute);
c$ = Clazz.p0p ();
Clazz.declareInterface (jsjava.text.Format, "FieldDelegate");
});
