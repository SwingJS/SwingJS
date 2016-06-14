Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["javax.swing.plaf.ActionMapUIResource"], "swingjs.plaf.LazyActionMap", ["javax.swing.SwingUtilities", "$.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this._loader = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "LazyActionMap", javax.swing.plaf.ActionMapUIResource);
c$.installLazyActionMap = Clazz.defineMethod (c$, "installLazyActionMap", 
function (c, loaderClass, defaultsKey) {
var map = javax.swing.UIManager.get (defaultsKey);
if (map == null) {
map =  new swingjs.plaf.LazyActionMap (loaderClass);
}javax.swing.SwingUtilities.replaceUIActionMap (c, map);
}, "javax.swing.JComponent,Class,~S");
c$.getActionMap = Clazz.defineMethod (c$, "getActionMap", 
function (loaderClass, defaultsKey) {
var map = javax.swing.UIManager.get (defaultsKey);
if (map == null) {
map =  new swingjs.plaf.LazyActionMap (loaderClass);
}return map;
}, "Class,~S");
Clazz.makeConstructor (c$, 
 function (loader) {
Clazz.superConstructor (this, swingjs.plaf.LazyActionMap, []);
this._loader = loader;
}, "Class");
Clazz.defineMethod (c$, "put", 
function (action) {
this.put (action.getValue ("Name"), action);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "put", 
function (key, action) {
this.loadIfNecessary ();
Clazz.superCall (this, swingjs.plaf.LazyActionMap, "put", [key, action]);
}, "~O,javax.swing.Action");
Clazz.defineMethod (c$, "get", 
function (key) {
this.loadIfNecessary ();
return Clazz.superCall (this, swingjs.plaf.LazyActionMap, "get", [key]);
}, "~O");
Clazz.defineMethod (c$, "remove", 
function (key) {
this.loadIfNecessary ();
Clazz.superCall (this, swingjs.plaf.LazyActionMap, "remove", [key]);
}, "~O");
Clazz.defineMethod (c$, "clear", 
function () {
this.loadIfNecessary ();
Clazz.superCall (this, swingjs.plaf.LazyActionMap, "clear", []);
});
Clazz.defineMethod (c$, "keys", 
function () {
this.loadIfNecessary ();
return Clazz.superCall (this, swingjs.plaf.LazyActionMap, "keys", []);
});
Clazz.defineMethod (c$, "size", 
function () {
this.loadIfNecessary ();
return Clazz.superCall (this, swingjs.plaf.LazyActionMap, "size", []);
});
Clazz.defineMethod (c$, "allKeys", 
function () {
this.loadIfNecessary ();
return Clazz.superCall (this, swingjs.plaf.LazyActionMap, "allKeys", []);
});
Clazz.defineMethod (c$, "setParent", 
function (map) {
this.loadIfNecessary ();
Clazz.superCall (this, swingjs.plaf.LazyActionMap, "setParent", [map]);
}, "javax.swing.ActionMap");
Clazz.defineMethod (c$, "loadIfNecessary", 
 function () {
if (this._loader != null) {
{
this._loader.loadActionMap(this);
this._loader = null;
}}});
});
