Clazz.declarePackage ("jssun.swing");
Clazz.load (["javax.swing.plaf.ColorUIResource"], "jssun.swing.PrintColorUIResource", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.printColor = null;
Clazz.instantialize (this, arguments);
}, jssun.swing, "PrintColorUIResource", javax.swing.plaf.ColorUIResource);
Clazz.makeConstructor (c$, 
function (rgb, printColor) {
Clazz.superConstructor (this, jssun.swing.PrintColorUIResource, [rgb]);
this.printColor = printColor;
}, "~N,java.awt.Color");
Clazz.defineMethod (c$, "getPrintColor", 
function () {
return ((this.printColor != null) ? this.printColor : this);
});
});
