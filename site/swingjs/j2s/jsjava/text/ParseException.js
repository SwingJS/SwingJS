Clazz.declarePackage ("jsjava.text");
Clazz.load (["java.lang.Exception"], "jsjava.text.ParseException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.errorOffset = 0;
Clazz.instantialize (this, arguments);
}, jsjava.text, "ParseException", Exception);
Clazz.makeConstructor (c$, 
function (s, errorOffset) {
Clazz.superConstructor (this, jsjava.text.ParseException, [s]);
this.errorOffset = errorOffset;
}, "~S,~N");
Clazz.defineMethod (c$, "getErrorOffset", 
function () {
return this.errorOffset;
});
});
