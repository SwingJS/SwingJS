Clazz.declarePackage ("swingjs.awt");
Clazz.load (["javax.swing.JLabel"], "swingjs.awt.Label", null, function () {
c$ = Clazz.declareType (swingjs.awt, "Label", javax.swing.JLabel);
Clazz.defineMethod (c$, "setAlignment", 
function (alignment) {
this.setAlignmentX (alignment);
}, "~N");
});
