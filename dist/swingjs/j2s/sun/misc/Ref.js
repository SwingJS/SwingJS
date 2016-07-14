Clazz.declarePackage ("sun.misc");
c$ = Clazz.decorateAsClass (function () {
this.soft = null;
Clazz.instantialize (this, arguments);
}, sun.misc, "Ref");
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
});
Clazz.defineMethod (c$, "setThing", 
function (thing) {
this.flush ();
this.soft = thing;
}, "~O");
Clazz.defineMethod (c$, "check", 
function () {
return this.soft;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (thing) {
this.setThing (thing);
}, "~O");
