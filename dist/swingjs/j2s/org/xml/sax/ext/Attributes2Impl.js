Clazz.declarePackage ("org.xml.sax.ext");
Clazz.load (["org.xml.sax.ext.Attributes2", "org.xml.sax.helpers.AttributesImpl"], "org.xml.sax.ext.Attributes2Impl", ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.declared = null;
this.specified = null;
Clazz.instantialize (this, arguments);
}, org.xml.sax.ext, "Attributes2Impl", org.xml.sax.helpers.AttributesImpl, org.xml.sax.ext.Attributes2);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.xml.sax.ext.Attributes2Impl, []);
});
Clazz.defineMethod (c$, "isDeclared", 
function (index) {
if (index < 0 || index >= this.getLength ()) throw  new ArrayIndexOutOfBoundsException ("No attribute at index: " + index);
return this.declared[index];
}, "~N");
Clazz.defineMethod (c$, "isDeclared", 
function (uri, localName) {
var index = this.getIndex (uri, localName);
if (index < 0) throw  new IllegalArgumentException ("No such attribute: local=" + localName + ", namespace=" + uri);
return this.declared[index];
}, "~S,~S");
Clazz.defineMethod (c$, "isDeclared", 
function (qName) {
var index = this.getIndex (qName);
if (index < 0) throw  new IllegalArgumentException ("No such attribute: " + qName);
return this.declared[index];
}, "~S");
Clazz.defineMethod (c$, "isSpecified", 
function (index) {
if (index < 0 || index >= this.getLength ()) throw  new ArrayIndexOutOfBoundsException ("No attribute at index: " + index);
return this.specified[index];
}, "~N");
Clazz.defineMethod (c$, "isSpecified", 
function (uri, localName) {
var index = this.getIndex (uri, localName);
if (index < 0) throw  new IllegalArgumentException ("No such attribute: local=" + localName + ", namespace=" + uri);
return this.specified[index];
}, "~S,~S");
Clazz.defineMethod (c$, "isSpecified", 
function (qName) {
var index = this.getIndex (qName);
if (index < 0) throw  new IllegalArgumentException ("No such attribute: " + qName);
return this.specified[index];
}, "~S");
Clazz.defineMethod (c$, "setAttributes", 
function (atts) {
var length = atts.getLength ();
Clazz.superCall (this, org.xml.sax.ext.Attributes2Impl, "setAttributes", [atts]);
this.declared =  Clazz.newBooleanArray (length, false);
this.specified =  Clazz.newBooleanArray (length, false);
if (Clazz.instanceOf (atts, org.xml.sax.ext.Attributes2)) {
var a2 = atts;
for (var i = 0; i < length; i++) {
this.declared[i] = a2.isDeclared (i);
this.specified[i] = a2.isSpecified (i);
}
} else {
for (var i = 0; i < length; i++) {
this.declared[i] = !"CDATA".equals (atts.getType (i));
this.specified[i] = true;
}
}}, "org.xml.sax.Attributes");
Clazz.defineMethod (c$, "addAttribute", 
function (uri, localName, qName, type, value) {
Clazz.superCall (this, org.xml.sax.ext.Attributes2Impl, "addAttribute", [uri, localName, qName, type, value]);
var length = this.getLength ();
if (length < this.specified.length) {
var newFlags;
newFlags =  Clazz.newBooleanArray (length, false);
System.arraycopy (this.declared, 0, newFlags, 0, this.declared.length);
this.declared = newFlags;
newFlags =  Clazz.newBooleanArray (length, false);
System.arraycopy (this.specified, 0, newFlags, 0, this.specified.length);
this.specified = newFlags;
}this.specified[length - 1] = true;
this.declared[length - 1] = !"CDATA".equals (type);
}, "~S,~S,~S,~S,~S");
Clazz.defineMethod (c$, "removeAttribute", 
function (index) {
var origMax = this.getLength () - 1;
Clazz.superCall (this, org.xml.sax.ext.Attributes2Impl, "removeAttribute", [index]);
if (index != origMax) {
System.arraycopy (this.declared, index + 1, this.declared, index, origMax - index);
System.arraycopy (this.specified, index + 1, this.specified, index, origMax - index);
}}, "~N");
Clazz.defineMethod (c$, "setDeclared", 
function (index, value) {
if (index < 0 || index >= this.getLength ()) throw  new ArrayIndexOutOfBoundsException ("No attribute at index: " + index);
this.declared[index] = value;
}, "~N,~B");
Clazz.defineMethod (c$, "setSpecified", 
function (index, value) {
if (index < 0 || index >= this.getLength ()) throw  new ArrayIndexOutOfBoundsException ("No attribute at index: " + index);
this.specified[index] = value;
}, "~N,~B");
});
