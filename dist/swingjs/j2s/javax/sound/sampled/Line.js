Clazz.declarePackage ("javax.sound.sampled");
Clazz.declareInterface (javax.sound.sampled, "Line");
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.lineClass = null;
Clazz.instantialize (this, arguments);
}, javax.sound.sampled.Line, "Info");
Clazz.makeConstructor (c$, 
function (a) {
if (a == null) {
this.lineClass = javax.sound.sampled.Line;
} else {
this.lineClass = a;
}}, "Class");
Clazz.defineMethod (c$, "getLineClass", 
function () {
return this.lineClass;
});
Clazz.defineMethod (c$, "matches", 
function (a) {
if (!(this.getClass ().isInstance (a))) {
return false;
}if (!(this.getLineClass ().isAssignableFrom (a.getLineClass ()))) {
return false;
}return true;
}, "javax.sound.sampled.Line.Info");
Clazz.overrideMethod (c$, "toString", 
function () {
var a = "javax.sound.sampled.";
var b =  String.instantialize (this.getLineClass ().toString ());
var c;
var d = b.indexOf (a);
if (d != -1) {
c = b.substring (0, d) + b.substring ((d + a.length), b.length);
} else {
c = b;
}return c;
});
c$ = Clazz.p0p ();
