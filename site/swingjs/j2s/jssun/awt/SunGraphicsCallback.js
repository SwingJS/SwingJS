Clazz.declarePackage ("jssun.awt");
Clazz.load (null, "jssun.awt.SunGraphicsCallback", ["jsjava.awt.Container", "$.Graphics2D", "jssun.awt.ConstrainableGraphics", "$.Graphics2Delegate"], function () {
c$ = Clazz.declareType (jssun.awt, "SunGraphicsCallback");
Clazz.defineMethod (c$, "constrainGraphics", 
function (g, bounds) {
if (Clazz.instanceOf (g, jssun.awt.ConstrainableGraphics)) {
(g).constrain (bounds.x, bounds.y, bounds.width, bounds.height);
} else {
g.translate (bounds.x, bounds.y);
}g.clipRect (0, 0, bounds.width, bounds.height);
}, "jsjava.awt.Graphics,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "runOneComponent", 
function (comp, bounds, g, clip, weightFlags) {
if (comp == null || !comp.isLightweight () || !comp.isVisible ()) {
return;
}var lightweight = comp.isLightweight ();
if ((lightweight && (weightFlags & 2) == 0) || (!lightweight && (weightFlags & 1) == 0)) {
return;
}if (bounds == null) {
bounds = comp.getBounds ();
}if (clip == null || clip.intersects (bounds)) {
var cg = g.create ();
try {
this.constrainGraphics (cg, bounds);
cg.setFont (comp.getFont ());
cg.setColor (comp.getForeground ());
if (Clazz.instanceOf (cg, jsjava.awt.Graphics2D)) {
(cg).setBackground (comp.getBackground ());
} else if (Clazz.instanceOf (cg, jssun.awt.Graphics2Delegate)) {
(cg).setBackground (comp.getBackground ());
}this.run (comp, cg);
} finally {
cg.dispose ();
}
}}, "jsjava.awt.Component,jsjava.awt.Rectangle,jsjava.awt.Graphics,jsjava.awt.Shape,~N");
Clazz.defineMethod (c$, "runComponents", 
function (comps, g, weightFlags) {
var ncomponents = comps.length;
var clip = g.getClip ();
if ((weightFlags & 4) != 0) {
for (var i = ncomponents - 1; i >= 0; i--) {
this.runOneComponent (comps[i], null, g, clip, 2);
}
for (var i = ncomponents - 1; i >= 0; i--) {
this.runOneComponent (comps[i], null, g, clip, 1);
}
} else {
for (var i = ncomponents - 1; i >= 0; i--) {
this.runOneComponent (comps[i], null, g, clip, weightFlags);
}
}}, "~A,jsjava.awt.Graphics,~N");
Clazz.pu$h ();
c$ = Clazz.declareType (jssun.awt.SunGraphicsCallback, "PaintHeavyweightComponentsCallback", jssun.awt.SunGraphicsCallback);
Clazz.makeConstructor (c$, 
($fz = function () {
Clazz.superConstructor (this, jssun.awt.SunGraphicsCallback.PaintHeavyweightComponentsCallback, []);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "run", 
function (a, b) {
if (!a.isLightweight ()) {
a.paintAll (b);
} else if (Clazz.instanceOf (a, jsjava.awt.Container)) {
this.runComponents ((a).getComponents (), b, 3);
}}, "jsjava.awt.Component,jsjava.awt.Graphics");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return jssun.awt.SunGraphicsCallback.PaintHeavyweightComponentsCallback.instance;
});
c$.instance = c$.prototype.instance =  new jssun.awt.SunGraphicsCallback.PaintHeavyweightComponentsCallback ();
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"HEAVYWEIGHTS", 0x1,
"LIGHTWEIGHTS", 0x2,
"TWO_PASSES", 0x4);
});
