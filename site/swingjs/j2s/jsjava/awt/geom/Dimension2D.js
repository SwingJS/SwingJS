Clazz.declarePackage ("jsjava.awt.geom");
Clazz.load (null, "jsjava.awt.geom.Dimension2D", ["java.lang.InternalError"], function () {
c$ = Clazz.declareType (jsjava.awt.geom, "Dimension2D", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setSize", 
function (d) {
this.setSize (d.getWidth (), d.getHeight ());
}, "jsjava.awt.geom.Dimension2D");
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, jsjava.awt.geom.Dimension2D, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
});
