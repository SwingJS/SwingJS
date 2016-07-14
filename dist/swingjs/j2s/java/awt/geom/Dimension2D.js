Clazz.declarePackage ("java.awt.geom");
Clazz.load (null, "java.awt.geom.Dimension2D", ["java.lang.InternalError"], function () {
c$ = Clazz.declareType (java.awt.geom, "Dimension2D", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setSize", 
function (d) {
this.setSize (d.getWidth (), d.getHeight ());
}, "java.awt.geom.Dimension2D");
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, java.awt.geom.Dimension2D, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
});
