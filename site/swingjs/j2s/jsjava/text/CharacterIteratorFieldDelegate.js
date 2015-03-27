Clazz.declarePackage ("jsjava.text");
Clazz.load (["jsjava.text.Format"], "jsjava.text.CharacterIteratorFieldDelegate", ["java.util.ArrayList", "jsjava.text.AttributedString"], function () {
c$ = Clazz.decorateAsClass (function () {
this.attributedStrings = null;
this.size = 0;
Clazz.instantialize (this, arguments);
}, jsjava.text, "CharacterIteratorFieldDelegate", null, jsjava.text.Format.FieldDelegate);
Clazz.makeConstructor (c$, 
function () {
this.attributedStrings =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "formatted", 
function (attr, value, start, end, buffer) {
if (start != end) {
if (start < this.size) {
var index = this.size;
var asIndex = this.attributedStrings.size () - 1;
while (start < index) {
var as = this.attributedStrings.get (asIndex--);
var newIndex = index - as.length ();
var aStart = Math.max (0, start - newIndex);
as.addAttribute (attr, value, aStart, Math.min (end - start, as.length () - aStart) + aStart);
index = newIndex;
}
}if (this.size < start) {
this.attributedStrings.add ( new jsjava.text.AttributedString (buffer.substring (this.size, start)));
this.size = start;
}if (this.size < end) {
var aStart = Math.max (start, this.size);
var string =  new jsjava.text.AttributedString (buffer.substring (aStart, end));
string.addAttribute (attr, value);
this.attributedStrings.add (string);
this.size = end;
}}}, "jsjava.text.Format.Field,~O,~N,~N,StringBuffer");
Clazz.defineMethod (c$, "formatted", 
function (fieldID, attr, value, start, end, buffer) {
this.formatted (attr, value, start, end, buffer);
}, "~N,jsjava.text.Format.Field,~O,~N,~N,StringBuffer");
Clazz.defineMethod (c$, "getIterator", 
function (string) {
if (string.length > this.size) {
this.attributedStrings.add ( new jsjava.text.AttributedString (string.substring (this.size)));
this.size = string.length;
}var iCount = this.attributedStrings.size ();
var iterators =  new Array (iCount);
for (var counter = 0; counter < iCount; counter++) {
iterators[counter] = (this.attributedStrings.get (counter)).getIterator ();
}
return  new jsjava.text.AttributedString (iterators).getIterator ();
}, "~S");
});
