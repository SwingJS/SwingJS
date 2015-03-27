Clazz.declarePackage ("jsjava.awt");
Clazz.load (["jssun.awt.SunGraphicsCallback"], "jsjava.awt.GraphicsCallback", null, function () {
c$ = Clazz.declareType (jsjava.awt, "GraphicsCallback", jssun.awt.SunGraphicsCallback);
Clazz.pu$h ();
c$ = Clazz.declareType (jsjava.awt.GraphicsCallback, "PaintCallback", jsjava.awt.GraphicsCallback);
Clazz.makeConstructor (c$, 
($fz = function () {
Clazz.superConstructor (this, jsjava.awt.GraphicsCallback.PaintCallback, []);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "run", 
function (a, b) {
a.paint (b);
}, "jsjava.awt.Component,jsjava.awt.Graphics");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return jsjava.awt.GraphicsCallback.PaintCallback.instance;
});
c$.instance = c$.prototype.instance =  new jsjava.awt.GraphicsCallback.PaintCallback ();
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjava.awt.GraphicsCallback, "PaintAllCallback", jsjava.awt.GraphicsCallback);
Clazz.makeConstructor (c$, 
($fz = function () {
Clazz.superConstructor (this, jsjava.awt.GraphicsCallback.PaintAllCallback, []);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "run", 
function (a, b) {
a.paintAll (b);
}, "jsjava.awt.Component,jsjava.awt.Graphics");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return jsjava.awt.GraphicsCallback.PaintAllCallback.instance;
});
c$.instance = c$.prototype.instance =  new jsjava.awt.GraphicsCallback.PaintAllCallback ();
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjava.awt.GraphicsCallback, "PaintHeavyweightComponentsCallback", jsjava.awt.GraphicsCallback);
Clazz.makeConstructor (c$, 
($fz = function () {
Clazz.superConstructor (this, jsjava.awt.GraphicsCallback.PaintHeavyweightComponentsCallback, []);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "run", 
function (a, b) {
if (a.isLightweight ()) {
a.paintHeavyweightComponents (b);
} else {
a.paintAll (b);
}}, "jsjava.awt.Component,jsjava.awt.Graphics");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return jsjava.awt.GraphicsCallback.PaintHeavyweightComponentsCallback.instance;
});
c$.instance = c$.prototype.instance =  new jsjava.awt.GraphicsCallback.PaintHeavyweightComponentsCallback ();
c$ = Clazz.p0p ();
});
