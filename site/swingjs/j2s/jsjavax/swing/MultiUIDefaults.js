Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["java.lang.Enum", "java.util.Enumeration", "jsjavax.swing.UIDefaults"], "jsjavax.swing.MultiUIDefaults", ["java.lang.StringBuffer", "java.util.HashSet"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tables = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "MultiUIDefaults", jsjavax.swing.UIDefaults);
Clazz.makeConstructor (c$, 
function (defaults) {
Clazz.superConstructor (this, jsjavax.swing.MultiUIDefaults);
this.tables = defaults;
}, "~A");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.MultiUIDefaults);
this.tables =  new Array (0);
});
Clazz.defineMethod (c$, "get", 
function (key) {
var value = Clazz.superCall (this, jsjavax.swing.MultiUIDefaults, "get", [key]);
if (value != null) {
return value;
}for (var i = 0; i < this.tables.length; i++) {
var table = this.tables[i];
value = (table != null) ? table.get (key) : null;
if (value != null) {
return value;
}}
return null;
}, "~O");
Clazz.defineMethod (c$, "get", 
function (key, l) {
var value = Clazz.superCall (this, jsjavax.swing.MultiUIDefaults, "get", [key, l]);
if (value != null) {
return value;
}for (var i = 0; i < this.tables.length; i++) {
var table = this.tables[i];
value = (table != null) ? table.get (key, l) : null;
if (value != null) {
return value;
}}
return null;
}, "~O,java.util.Locale");
Clazz.overrideMethod (c$, "size", 
function () {
return this.entrySet ().size ();
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.size () == 0;
});
Clazz.overrideMethod (c$, "keys", 
function () {
return  new jsjavax.swing.MultiUIDefaults.MultiUIDefaultsEnumerator (jsjavax.swing.MultiUIDefaults.MultiUIDefaultsEnumerator.Type.KEYS, this.entrySet ());
});
Clazz.overrideMethod (c$, "elements", 
function () {
return  new jsjavax.swing.MultiUIDefaults.MultiUIDefaultsEnumerator (jsjavax.swing.MultiUIDefaults.MultiUIDefaultsEnumerator.Type.ELEMENTS, this.entrySet ());
});
Clazz.defineMethod (c$, "entrySet", 
function () {
var set =  new java.util.HashSet ();
for (var i = this.tables.length - 1; i >= 0; i--) {
if (this.tables[i] != null) {
set.addAll (this.tables[i].entrySet ());
}}
set.addAll (Clazz.superCall (this, jsjavax.swing.MultiUIDefaults, "entrySet", []));
return set;
});
Clazz.defineMethod (c$, "getUIError", 
function (msg) {
if (this.tables.length > 0) {
this.tables[0].getUIError (msg);
} else {
Clazz.superCall (this, jsjavax.swing.MultiUIDefaults, "getUIError", [msg]);
}}, "~S");
Clazz.defineMethod (c$, "remove", 
function (key) {
var value = null;
for (var i = this.tables.length - 1; i >= 0; i--) {
if (this.tables[i] != null) {
var v = this.tables[i].remove (key);
if (v != null) {
value = v;
}}}
var v = Clazz.superCall (this, jsjavax.swing.MultiUIDefaults, "remove", [key]);
if (v != null) {
value = v;
}return value;
}, "~O");
Clazz.defineMethod (c$, "clear", 
function () {
Clazz.superCall (this, jsjavax.swing.MultiUIDefaults, "clear", []);
for (var i = 0; i < this.tables.length; i++) {
var table = this.tables[i];
if (table != null) {
table.clear ();
}}
});
Clazz.overrideMethod (c$, "toString", 
function () {
var buf =  new StringBuffer ();
buf.append ("{");
var keys = this.keys ();
while (keys.hasMoreElements ()) {
var key = keys.nextElement ();
buf.append (key + "=" + this.get (key) + ", ");
}
var length = buf.length ();
if (length > 1) {
buf.$delete (length - 2, length);
}buf.append ("}");
return buf.toString ();
});
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.iterator = null;
this.type = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.MultiUIDefaults, "MultiUIDefaultsEnumerator", null, java.util.Enumeration);
Clazz.makeConstructor (c$, 
function (a, b) {
this.type = a;
this.iterator = b.iterator ();
}, "jsjavax.swing.MultiUIDefaults.MultiUIDefaultsEnumerator.Type,java.util.Set");
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return this.iterator.hasNext ();
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
switch (this.type) {
case jsjavax.swing.MultiUIDefaults.MultiUIDefaultsEnumerator.Type.KEYS:
return this.iterator.next ().getKey ();
case jsjavax.swing.MultiUIDefaults.MultiUIDefaultsEnumerator.Type.ELEMENTS:
return this.iterator.next ().getValue ();
default:
return null;
}
});
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.MultiUIDefaults.MultiUIDefaultsEnumerator, "Type", Enum);
Clazz.defineEnumConstant (c$, "KEYS", 0, []);
Clazz.defineEnumConstant (c$, "ELEMENTS", 1, []);
c$ = Clazz.p0p ();
c$ = Clazz.p0p ();
});
