Clazz.declarePackage ("java.text");
c$ = Clazz.decorateAsClass (function () {
this.value = null;
Clazz.instantialize (this, arguments);
}, java.text, "Annotation");
Clazz.makeConstructor (c$, 
function (value) {
this.value = value;
}, "~O");
Clazz.defineMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[value=" + this.value + "]";
});
