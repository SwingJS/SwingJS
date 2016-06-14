Clazz.declarePackage ("javax.swing.text");
Clazz.load (["java.lang.Exception"], "javax.swing.text.BadLocationException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.offs = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "BadLocationException", Exception);
Clazz.makeConstructor (c$, 
function (s, offs) {
Clazz.superConstructor (this, javax.swing.text.BadLocationException, [s]);
this.offs = offs;
}, "~S,~N");
Clazz.defineMethod (c$, "offsetRequested", 
function () {
return this.offs;
});
});
