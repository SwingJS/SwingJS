Clazz.declarePackage ("jssun.swing");
Clazz.load (["java.util.ArrayList"], "jssun.swing.BakedArrayList", null, function () {
c$ = Clazz.decorateAsClass (function () {
this._hashCode = 0;
Clazz.instantialize (this, arguments);
}, jssun.swing, "BakedArrayList", java.util.ArrayList);
Clazz.makeConstructor (c$, 
function (data) {
this.construct (data.size ());
for (var counter = 0, max = data.size (); counter < max; counter++) {
this.add (data.get (counter));
}
this.cacheHashCode ();
}, "java.util.List");
Clazz.defineMethod (c$, "cacheHashCode", 
function () {
this._hashCode = 1;
for (var counter = this.size () - 1; counter >= 0; counter--) {
this._hashCode = 31 * this._hashCode + this.get (counter).hashCode ();
}
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this._hashCode;
});
Clazz.overrideMethod (c$, "equals", 
function (o) {
var list = o;
var size = this.size ();
if (list.size () != size) {
return false;
}while (size-- > 0) {
if (!this.get (size).equals (list.get (size))) {
return false;
}}
return true;
}, "~O");
});
