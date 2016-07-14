Clazz.declarePackage ("sun.util.resources");
Clazz.load (["java.util.ResourceBundle"], "sun.util.resources.OpenListResourceBundle", ["java.lang.NullPointerException", "java.util.HashMap", "sun.util.ResourceBundleEnumeration"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lookup = null;
Clazz.instantialize (this, arguments);
}, sun.util.resources, "OpenListResourceBundle", java.util.ResourceBundle);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, sun.util.resources.OpenListResourceBundle, []);
});
Clazz.overrideMethod (c$, "handleGetObject", 
function (key) {
if (key == null) {
throw  new NullPointerException ();
}this.loadLookupTablesIfNecessary ();
return this.lookup.get (key);
}, "~S");
Clazz.defineMethod (c$, "getKeys", 
function () {
var parent = this.parent;
return  new sun.util.ResourceBundleEnumeration (this.handleGetKeys (), (parent != null) ? parent.getKeys () : null);
});
Clazz.defineMethod (c$, "handleGetKeys", 
function () {
this.loadLookupTablesIfNecessary ();
return this.lookup.keySet ();
});
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "loadLookupTablesIfNecessary", 
function () {
if (this.lookup == null) {
this.loadLookup ();
}});
Clazz.defineMethod (c$, "loadLookup", 
 function () {
if (this.lookup != null) return;
var contents = this.getContents ();
var temp = this.createMap (contents.length);
for (var i = 0; i < contents.length; ++i) {
var key = contents[i][0];
var value = contents[i][1];
if (key == null || value == null) {
throw  new NullPointerException ();
}temp.put (key, value);
}
this.lookup = temp;
});
Clazz.defineMethod (c$, "createMap", 
function (size) {
return  new java.util.HashMap (size);
}, "~N");
});
