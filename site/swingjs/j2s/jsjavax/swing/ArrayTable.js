Clazz.declarePackage ("jsjavax.swing");
Clazz.load (null, "jsjavax.swing.ArrayTable", ["java.util.Hashtable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.table = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "ArrayTable", null, Cloneable);
Clazz.defineMethod (c$, "put", 
function (key, value) {
if (this.table == null) {
this.table =  Clazz.newArray (-1, [key, value]);
} else {
var size = this.size ();
if (size < 8) {
if (this.containsKey (key)) {
var tmp = this.table;
for (var i = 0; i < tmp.length - 1; i += 2) {
if (tmp[i].equals (key)) {
tmp[i + 1] = value;
break;
}}
} else {
var array = this.table;
var i = array.length;
var tmp =  new Array (i + 2);
System.arraycopy (array, 0, tmp, 0, i);
tmp[i] = key;
tmp[i + 1] = value;
this.table = tmp;
}} else {
if ((size == 8) && this.isArray ()) {
this.grow ();
}(this.table).put (key, value);
}}}, "~O,~O");
Clazz.defineMethod (c$, "get", 
function (key) {
var value = null;
if (this.table != null) {
if (this.isArray ()) {
var array = this.table;
for (var i = 0; i < array.length - 1; i += 2) {
if (array[i].equals (key)) {
value = array[i + 1];
break;
}}
} else {
value = (this.table).get (key);
}}return value;
}, "~O");
Clazz.defineMethod (c$, "size", 
function () {
var size;
if (this.table == null) return 0;
if (this.isArray ()) {
size = Clazz.doubleToInt ((this.table).length / 2);
} else {
size = (this.table).size ();
}return size;
});
Clazz.defineMethod (c$, "containsKey", 
function (key) {
var contains = false;
if (this.table != null) {
if (this.isArray ()) {
var array = this.table;
for (var i = 0; i < array.length - 1; i += 2) {
if (array[i].equals (key)) {
contains = true;
break;
}}
} else {
contains = (this.table).containsKey (key);
}}return contains;
}, "~O");
Clazz.defineMethod (c$, "remove", 
function (key) {
var value = null;
if (key == null) {
return null;
}if (this.table != null) {
if (this.isArray ()) {
var index = -1;
var array = this.table;
for (var i = array.length - 2; i >= 0; i -= 2) {
if (array[i].equals (key)) {
index = i;
value = array[i + 1];
break;
}}
if (index != -1) {
var tmp =  new Array (array.length - 2);
System.arraycopy (array, 0, tmp, 0, index);
if (index < tmp.length) System.arraycopy (array, index + 2, tmp, index, tmp.length - index);
this.table = (tmp.length == 0) ? null : tmp;
}} else {
value = (this.table).remove (key);
}if (this.size () == 7 && !this.isArray ()) {
this.shrink ();
}}return value;
}, "~O");
Clazz.defineMethod (c$, "clear", 
function () {
this.table = null;
});
Clazz.overrideMethod (c$, "clone", 
function () {
var newArrayTable =  new jsjavax.swing.ArrayTable ();
if (this.isArray ()) {
var array = this.table;
for (var i = 0; i < array.length - 1; i += 2) {
newArrayTable.put (array[i], array[i + 1]);
}
} else {
var tmp = this.table;
var keys = tmp.keys ();
while (keys.hasMoreElements ()) {
var o = keys.nextElement ();
newArrayTable.put (o, tmp.get (o));
}
}return newArrayTable;
});
Clazz.defineMethod (c$, "getKeys", 
function (keys) {
if (this.table == null) {
return null;
}if (this.isArray ()) {
var array = this.table;
if (keys == null) {
keys =  new Array (Clazz.doubleToInt (array.length / 2));
}for (var i = 0, index = 0; i < array.length - 1; i += 2, index++) {
keys[index] = array[i];
}
} else {
var tmp = this.table;
var enum_ = tmp.keys ();
var counter = tmp.size ();
if (keys == null) {
keys =  new Array (counter);
}while (counter > 0) {
keys[--counter] = enum_.nextElement ();
}
}return keys;
}, "~A");
Clazz.defineMethod (c$, "isArray", 
($fz = function () {
return (Clazz.instanceOf (this.table, Array));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "grow", 
($fz = function () {
var array = this.table;
var tmp =  new java.util.Hashtable (Clazz.doubleToInt (array.length / 2));
for (var i = 0; i < array.length; i += 2) {
tmp.put (array[i], array[i + 1]);
}
this.table = tmp;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "shrink", 
($fz = function () {
var tmp = this.table;
var array =  new Array (tmp.size () * 2);
var keys = tmp.keys ();
var j = 0;
while (keys.hasMoreElements ()) {
var o = keys.nextElement ();
array[j] = o;
array[j + 1] = tmp.get (o);
j += 2;
}
this.table = array;
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"ARRAY_BOUNDARY", 8);
});
