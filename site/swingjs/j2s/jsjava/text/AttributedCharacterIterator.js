Clazz.declarePackage ("jsjava.text");
Clazz.load (["jsjava.text.CharacterIterator", "java.io.InvalidObjectException", "java.util.HashMap"], "jsjava.text.AttributedCharacterIterator", null, function () {
Clazz.declareInterface (jsjava.text, "AttributedCharacterIterator", jsjava.text.CharacterIterator);
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.name = null;
Clazz.instantialize (this, arguments);
}, jsjava.text.AttributedCharacterIterator, "Attribute", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function (a) {
this.name = a;
if (this.getClass () === jsjava.text.AttributedCharacterIterator.Attribute) {
jsjava.text.AttributedCharacterIterator.Attribute.instanceMap.put (a, this);
}}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "(" + this.name + ")";
});
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "readResolve", 
function () {
if (this.getClass () !== jsjava.text.AttributedCharacterIterator.Attribute) {
throw  new java.io.InvalidObjectException ("subclass didn't correctly implement readResolve");
}var a = jsjava.text.AttributedCharacterIterator.Attribute.instanceMap.get (this.getName ());
if (a != null) {
return a;
} else {
throw  new java.io.InvalidObjectException ("unknown attribute name");
}});
c$.instanceMap = c$.prototype.instanceMap =  new java.util.HashMap (7);
c$.LANGUAGE = c$.prototype.LANGUAGE =  new jsjava.text.AttributedCharacterIterator.Attribute ("language");
c$.READING = c$.prototype.READING =  new jsjava.text.AttributedCharacterIterator.Attribute ("reading");
c$.INPUT_METHOD_SEGMENT = c$.prototype.INPUT_METHOD_SEGMENT =  new jsjava.text.AttributedCharacterIterator.Attribute ("input_method_segment");
c$ = Clazz.p0p ();
});
