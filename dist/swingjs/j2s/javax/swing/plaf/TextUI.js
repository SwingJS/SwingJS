Clazz.declarePackage ("javax.swing.plaf");
Clazz.load (["javax.swing.plaf.ComponentUI"], "javax.swing.plaf.TextUI", null, function () {
c$ = Clazz.declareType (javax.swing.plaf, "TextUI", javax.swing.plaf.ComponentUI);
Clazz.defineMethod (c$, "getToolTipText", 
function (t, pt) {
return null;
}, "javax.swing.text.JTextComponent,java.awt.Point");
});
