Clazz.declarePackage ("sun.java2d");
Clazz.load (["java.awt.Graphics2D"], "sun.java2d.SunGraphics2D", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.transformState = 0;
this.foregroundColor = null;
this.backgroundColor = null;
this.$transform = null;
this.transX = 0;
this.transY = 0;
this.hints = null;
Clazz.instantialize (this, arguments);
}, sun.java2d, "SunGraphics2D", java.awt.Graphics2D);
Clazz.overrideMethod (c$, "clone", 
function () {
return this.clone0 ();
});
Clazz.defineMethod (c$, "clone0", 
function () {
return null;
});
Clazz.defineStatics (c$,
"TRANSFORM_GENERIC", 4,
"TRANSFORM_TRANSLATESCALE", 3,
"TRANSFORM_ANY_TRANSLATE", 2,
"TRANSFORM_INT_TRANSLATE", 1,
"TRANSFORM_ISIDENT", 0);
});
