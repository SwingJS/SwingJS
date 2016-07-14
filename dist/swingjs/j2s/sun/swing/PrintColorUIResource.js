Clazz.declarePackage ("sun.swing");
Clazz.load (["javax.swing.plaf.ColorUIResource"], "sun.swing.PrintColorUIResource", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.printColor = null;
Clazz.instantialize (this, arguments);
}, sun.swing, "PrintColorUIResource", javax.swing.plaf.ColorUIResource);
Clazz.makeConstructor (c$, 
function (rgb, printColor) {
Clazz.superConstructor (this, sun.swing.PrintColorUIResource, [rgb]);
this.printColor = printColor;
}, "~N,java.awt.Color");
Clazz.defineMethod (c$, "getPrintColor", 
function () {
return ((this.printColor != null) ? this.printColor : this);
});
});
