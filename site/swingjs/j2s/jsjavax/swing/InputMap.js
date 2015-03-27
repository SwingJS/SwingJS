Clazz.declarePackage ("jsjavax.swing");
Clazz.load (null, "jsjavax.swing.InputMap", ["java.util.HashMap", "jsjavax.swing.ArrayTable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.arrayTable = null;
this.parent = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "InputMap");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setParent", 
function (map) {
this.parent = map;
}, "jsjavax.swing.InputMap");
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "put", 
function (keyStroke, actionMapKey) {
if (keyStroke == null) {
return;
}if (actionMapKey == null) {
this.remove (keyStroke);
} else {
if (this.arrayTable == null) {
this.arrayTable =  new jsjavax.swing.ArrayTable ();
}this.arrayTable.put (keyStroke, actionMapKey);
}}, "jsjavax.swing.KeyStroke,~O");
Clazz.defineMethod (c$, "get", 
function (keyStroke) {
if (this.arrayTable == null) {
var parent = this.getParent ();
if (parent != null) {
return parent.get (keyStroke);
}return null;
}var value = this.arrayTable.get (keyStroke);
if (value == null) {
var parent = this.getParent ();
if (parent != null) {
return parent.get (keyStroke);
}}return value;
}, "jsjavax.swing.KeyStroke");
Clazz.defineMethod (c$, "remove", 
function (key) {
if (this.arrayTable != null) {
this.arrayTable.remove (key);
}}, "jsjavax.swing.KeyStroke");
Clazz.defineMethod (c$, "clear", 
function () {
if (this.arrayTable != null) {
this.arrayTable.clear ();
}});
Clazz.defineMethod (c$, "keys", 
function () {
if (this.arrayTable == null) {
return null;
}var keys =  new Array (this.arrayTable.size ());
this.arrayTable.getKeys (keys);
return keys;
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
var allKeys =  new Array (keyMap.size ());
return keyMap.keySet ().toArray (allKeys);
});
});
