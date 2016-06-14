Clazz.declarePackage ("javax.swing");
Clazz.load (null, "javax.swing.ActionMap", ["java.util.HashMap", "javax.swing.ArrayTable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.arrayTable = null;
this.parent = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "ActionMap");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setParent", 
function (map) {
this.parent = map;
}, "javax.swing.ActionMap");
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "put", 
function (key, action) {
if (key == null) {
return;
}if (action == null) {
this.remove (key);
} else {
if (this.arrayTable == null) {
this.arrayTable =  new javax.swing.ArrayTable ();
}this.arrayTable.put (key, action);
}}, "~O,javax.swing.Action");
Clazz.defineMethod (c$, "get", 
function (key) {
var value = (this.arrayTable == null) ? null : this.arrayTable.get (key);
if (value == null) {
var parent = this.getParent ();
if (parent != null) {
return parent.get (key);
}}return value;
}, "~O");
Clazz.defineMethod (c$, "remove", 
function (key) {
if (this.arrayTable != null) {
this.arrayTable.remove (key);
}}, "~O");
Clazz.defineMethod (c$, "clear", 
function () {
if (this.arrayTable != null) {
this.arrayTable.clear ();
}});
Clazz.defineMethod (c$, "keys", 
function () {
if (this.arrayTable == null) {
return null;
}return this.arrayTable.getKeys (null);
});
Clazz.defineMethod (c$, "size", 
function () {
if (this.arrayTable == null) {
return 0;
}return this.arrayTable.size ();
});
Clazz.defineMethod (c$, "allKeys", 
function () {
var count = this.size ();
var parent = this.getParent ();
if (count == 0) {
if (parent != null) {
return parent.allKeys ();
}return this.keys ();
}if (parent == null) {
return this.keys ();
}var keys = this.keys ();
var pKeys = parent.allKeys ();
if (pKeys == null) {
return keys;
}if (keys == null) {
return pKeys;
}var keyMap =  new java.util.HashMap ();
var counter;
for (counter = keys.length - 1; counter >= 0; counter--) {
keyMap.put (keys[counter], keys[counter]);
}
for (counter = pKeys.length - 1; counter >= 0; counter--) {
keyMap.put (pKeys[counter], pKeys[counter]);
}
return keyMap.keySet ().toArray ();
});
});
