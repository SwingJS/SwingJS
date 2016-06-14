Clazz.declarePackage ("test.ultrastudio");
Clazz.load (["javax.swing.JApplet"], "test.ultrastudio.PrismApplet", ["java.awt.BorderLayout", "javax.swing.BorderFactory", "$.JSlider", "javax.swing.event.ChangeListener", "test.ultrastudio.Namer", "$.Prism"], function () {
c$ = Clazz.decorateAsClass (function () {
this.angle = null;
this.density = null;
this.bAngle = null;
this.bDensity = null;
this.prism = null;
Clazz.instantialize (this, arguments);
}, test.ultrastudio, "PrismApplet", javax.swing.JApplet);
Clazz.overrideMethod (c$, "init", 
function () {
this.setLayout ( new java.awt.BorderLayout ());
this.angle =  new javax.swing.JSlider ();
this.angle.setMaximum (180);
this.angle.setMajorTickSpacing (30);
this.angle.setMinorTickSpacing (5);
this.angle.setMaximum (90);
this.angle.setMinimum (0);
this.angle.setValue (45);
this.bAngle = javax.swing.BorderFactory.createTitledBorder ("Incidence angle");
this.angle.setBorder (this.bAngle);
this.angle.setPaintTicks (true);
this.angle.setPaintLabels (true);
this.add (this.angle, "South");
this.density =  new javax.swing.JSlider ();
this.density.setMinimum (1000);
this.density.setMaximum (2000);
this.density.setMinorTickSpacing (20);
this.density.setMajorTickSpacing (100);
this.bDensity = javax.swing.BorderFactory.createTitledBorder ("Refraction coefficient ");
this.density.setBorder (this.bDensity);
this.add (this.density, "North");
this.density.setValue (1600);
this.density.addChangeListener (((Clazz.isClassDefined ("test.ultrastudio.PrismApplet$1") ? 0 : test.ultrastudio.PrismApplet.$PrismApplet$1$ ()), Clazz.innerTypeInstance (test.ultrastudio.PrismApplet$1, this, null)));
this.prism =  new test.ultrastudio.Prism ();
this.add (this.prism, "Center");
this.prism.setRayEntry (this.angle.getValue ());
this.angle.addChangeListener (((Clazz.isClassDefined ("test.ultrastudio.PrismApplet$2") ? 0 : test.ultrastudio.PrismApplet.$PrismApplet$2$ ()), Clazz.innerTypeInstance (test.ultrastudio.PrismApplet$2, this, null)));
});
Clazz.defineMethod (c$, "updateLabels", 
 function () {
var a1 = this.angle.getValue ();
var nn = test.ultrastudio.Namer.name (this.prism.n);
if (nn.length > 0) nn = ", " + nn;
this.bDensity.setTitle (String.format ("Refraction %.3f" + nn, [new Double (this.prism.n)]));
this.bAngle.setTitle (String.format ("Incidence %d, bending %.2f", [new Integer (a1), new Double (Math.toDegrees (this.prism.dev (Math.toRadians (a1))))]));
this.angle.repaint ();
this.density.repaint ();
});
c$.$PrismApplet$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (test.ultrastudio, "PrismApplet$1", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
var n = this.b$["test.ultrastudio.PrismApplet"].density.getValue () * 0.001;
this.b$["test.ultrastudio.PrismApplet"].prism.setDensity (n);
this.b$["test.ultrastudio.PrismApplet"].updateLabels ();
}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
c$.$PrismApplet$2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (test.ultrastudio, "PrismApplet$2", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
this.b$["test.ultrastudio.PrismApplet"].prism.setRayEntry (this.b$["test.ultrastudio.PrismApplet"].angle.getValue ());
this.b$["test.ultrastudio.PrismApplet"].updateLabels ();
}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
});
