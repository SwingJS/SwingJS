Clazz.declarePackage ("javax.swing");
c$ = Clazz.declareType (javax.swing, "InputVerifier");
Clazz.defineMethod (c$, "shouldYieldFocus", 
function (input) {
return this.verify (input);
}, "javax.swing.JComponent");
