Clazz.declarePackage ("java.util");
Clazz.load (null, "java.util.EventObject", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.source = null;
Clazz.instantialize (this, arguments);
}, java.util, "EventObject");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (source) {
if (source == null) throw  new IllegalArgumentException ("null source");
this.source = source;
}, "~O");
Clazz.defineMethod (c$, "getSource", 
function () {
return this.source;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[source=" + this.source + "]";
});
});
