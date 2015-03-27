Clazz.declarePackage ("jsjavax.swing");
c$ = Clazz.declareType (jsjavax.swing, "InputVerifier");
Clazz.defineMethod (c$, "shouldYieldFocus", 
function (input) {
return this.verify (input);
}, "jsjavax.swing.JComponent");
