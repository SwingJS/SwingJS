Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.AttributeSet", "$.MutableAttributeSet", "java.util.Hashtable"], "jsjavax.swing.text.SimpleAttributeSet", ["java.util.Enumeration", "$.NoSuchElementException", "jsjavax.swing.text.StyleConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.table = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "SimpleAttributeSet", null, [jsjavax.swing.text.MutableAttributeSet, Cloneable]);
Clazz.prepareFields (c$, function () {
this.table =  new java.util.Hashtable (3);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (source) {
this.addAttributes (source);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.table.isEmpty ();
});
Clazz.defineMethod (c$, "getAttributeCount", 
function () {
return this.table.size ();
});
Clazz.overrideMethod (c$, "isDefined", 
function (attrName) {
return this.table.containsKey (attrName);
}, "~O");
Clazz.overrideMethod (c$, "isEqual", 
function (attr) {
return ((this.getAttributeCount () == attr.getAttributeCount ()) && this.containsAttributes (attr));
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "copyAttributes", 
function () {
return this.clone ();
});
Clazz.defineMethod (c$, "getAttributeNames", 
function () {
return this.table.keys ();
});
Clazz.defineMethod (c$, "getAttribute", 
function (name) {
var value = this.table.get (name);
if (value == null) {
var parent = this.getResolveParent ();
if (parent != null) {
value = parent.getAttribute (name);
}}return value;
}, "~O");
Clazz.overrideMethod (c$, "containsAttribute", 
function (name, value) {
return value.equals (this.getAttribute (name));
}, "~O,~O");
Clazz.overrideMethod (c$, "containsAttributes", 
function (attributes) {
var result = true;
var names = attributes.getAttributeNames ();
while (result && names.hasMoreElements ()) {
var name = names.nextElement ();
result = attributes.getAttribute (name).equals (this.getAttribute (name));
}
return result;
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "addAttribute", 
function (name, value) {
this.table.put (name, value);
}, "~O,~O");
Clazz.overrideMethod (c$, "addAttributes", 
function (attributes) {
var names = attributes.getAttributeNames ();
while (names.hasMoreElements ()) {
var name = names.nextElement ();
this.addAttribute (name, attributes.getAttribute (name));
}
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "removeAttribute", 
function (name) {
this.table.remove (name);
}, "~O");
Clazz.defineMethod (c$, "removeAttributes", 
function (names) {
while (names.hasMoreElements ()) this.removeAttribute (names.nextElement ());

}, "java.util.Enumeration");
Clazz.defineMethod (c$, "removeAttributes", 
function (attributes) {
if (attributes === this) {
this.table.clear ();
} else {
var names = attributes.getAttributeNames ();
while (names.hasMoreElements ()) {
var name = names.nextElement ();
var value = attributes.getAttribute (name);
if (value.equals (this.getAttribute (name))) this.removeAttribute (name);
}
}}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "getResolveParent", 
function () {
return this.table.get (jsjavax.swing.text.StyleConstants.ResolveAttribute);
});
Clazz.overrideMethod (c$, "setResolveParent", 
function (parent) {
this.addAttribute (jsjavax.swing.text.StyleConstants.ResolveAttribute, parent);
}, "jsjavax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "clone", 
function () {
var attr;
try {
attr = Clazz.superCall (this, jsjavax.swing.text.SimpleAttributeSet, "clone", []);
attr.table = this.table.clone ();
} catch (cnse) {
if (Clazz.exceptionOf (cnse, CloneNotSupportedException)) {
attr = null;
} else {
throw cnse;
}
}
return attr;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.table.hashCode ();
});
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (this === obj) {
return true;
}if (Clazz.instanceOf (obj, jsjavax.swing.text.AttributeSet)) {
var attrs = obj;
return this.isEqual (attrs);
}return false;
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
var s = "";
var names = this.getAttributeNames ();
while (names.hasMoreElements ()) {
var key = names.nextElement ();
var value = this.getAttribute (key);
if (Clazz.instanceOf (value, jsjavax.swing.text.AttributeSet)) {
s = s + key + "=**AttributeSet** ";
} else {
s = s + key + "=" + value + " ";
}}
return s;
});
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.text.SimpleAttributeSet, "EmptyAttributeSet", null, jsjavax.swing.text.AttributeSet);
Clazz.defineMethod (c$, "getAttributeCount", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "isDefined", 
function (a) {
return false;
}, "~O");
Clazz.overrideMethod (c$, "isEqual", 
function (a) {
return (a.getAttributeCount () == 0);
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "copyAttributes", 
function () {
return this;
});
Clazz.overrideMethod (c$, "getAttribute", 
function (a) {
return null;
}, "~O");
Clazz.overrideMethod (c$, "getAttributeNames", 
function () {
return ((Clazz.isClassDefined ("jsjavax.swing.text.SimpleAttributeSet$EmptyAttributeSet$1") ? 0 : jsjavax.swing.text.SimpleAttributeSet.EmptyAttributeSet.$SimpleAttributeSet$EmptyAttributeSet$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.text.SimpleAttributeSet$EmptyAttributeSet$1, this, null));
});
Clazz.overrideMethod (c$, "containsAttribute", 
function (a, b) {
return false;
}, "~O,~O");
Clazz.overrideMethod (c$, "containsAttributes", 
function (a) {
return (a.getAttributeCount () == 0);
}, "jsjavax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "getResolveParent", 
function () {
return null;
});
Clazz.overrideMethod (c$, "equals", 
function (a) {
if (this === a) {
return true;
}return ((Clazz.instanceOf (a, jsjavax.swing.text.AttributeSet)) && ((a).getAttributeCount () == 0));
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return 0;
});
c$.$SimpleAttributeSet$EmptyAttributeSet$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing.text, "SimpleAttributeSet$EmptyAttributeSet$1", null, java.util.Enumeration);
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return false;
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
throw  new java.util.NoSuchElementException ();
});
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
c$.EMPTY = c$.prototype.EMPTY =  new jsjavax.swing.text.SimpleAttributeSet.EmptyAttributeSet ();
});
