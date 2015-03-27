Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["java.lang.Exception"], "jsjavax.swing.text.BadLocationException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.offs = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "BadLocationException", Exception);
Clazz.makeConstructor (c$, 
function (s, offs) {
Clazz.superConstructor (this, jsjavax.swing.text.BadLocationException, [s]);
this.offs = offs;
}, "~S,~N");
Clazz.defineMethod (c$, "offsetRequested", 
function () {
return this.offs;
});
});
