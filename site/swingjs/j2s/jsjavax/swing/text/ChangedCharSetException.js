Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["java.io.IOException"], "jsjavax.swing.text.ChangedCharSetException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.charSetSpec = null;
this.charSetKey = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "ChangedCharSetException", java.io.IOException);
Clazz.makeConstructor (c$, 
function (charSetSpec, charSetKey) {
Clazz.superConstructor (this, jsjavax.swing.text.ChangedCharSetException, []);
this.charSetSpec = charSetSpec;
this.charSetKey = charSetKey;
}, "~S,~B");
Clazz.defineMethod (c$, "getCharSetSpec", 
function () {
return this.charSetSpec;
});
Clazz.defineMethod (c$, "keyEqualsCharSet", 
function () {
return this.charSetKey;
});
});
