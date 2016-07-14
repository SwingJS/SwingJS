Clazz.declarePackage ("javax.sound.sampled");
c$ = Clazz.decorateAsClass (function () {
this.type = null;
Clazz.instantialize (this, arguments);
}, javax.sound.sampled, "Control");
Clazz.makeConstructor (c$, 
function (type) {
this.type = type;
}, "javax.sound.sampled.Control.Type");
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return  String.instantialize (this.getType () + " Control");
});
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.name = null;
Clazz.instantialize (this, arguments);
}, javax.sound.sampled.Control, "Type");
Clazz.makeConstructor (c$, 
function (a) {
this.name = a;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.name;
});
c$ = Clazz.p0p ();
