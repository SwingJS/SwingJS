Clazz.declarePackage ("jssun.misc");
Clazz.load (null, "jssun.misc.Ref", ["java.lang.ref.SoftReference"], function () {
c$ = Clazz.decorateAsClass (function () {
this.soft = null;
Clazz.instantialize (this, arguments);
}, jssun.misc, "Ref");
Clazz.defineMethod (c$, "get", 
function () {
var t = this.check ();
if (t == null) {
t = this.reconstitute ();
this.setThing (t);
}return t;
});
Clazz.defineMethod (c$, "flush", 
function () {
var s = this.soft;
if (s != null) s.clear ();
this.soft = null;
});
Clazz.defineMethod (c$, "setThing", 
function (thing) {
this.flush ();
this.soft =  new java.lang.ref.SoftReference (thing);
}, "~O");
Clazz.defineMethod (c$, "check", 
function () {
var s = this.soft;
if (s == null) return null;
return s.get ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (thing) {
this.setThing (thing);
}, "~O");
});
