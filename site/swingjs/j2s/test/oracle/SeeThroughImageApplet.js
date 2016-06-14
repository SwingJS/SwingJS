Clazz.declarePackage ("test.oracle");
Clazz.load (["javax.swing.JApplet", "$.JPanel"], ["test.oracle.SeeThroughImageApplet", "$.SeeThroughComponent"], ["java.awt.Color", "$.Dimension", "$.Font", "java.awt.event.WindowAdapter", "java.awt.image.BufferedImage", "$.RescaleOp", "java.io.File", "java.net.URL", "javax.imageio.ImageIO", "javax.swing.JFrame", "$.JSlider", "javax.swing.event.ChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bi = null;
this.scales = null;
this.offsets = null;
this.rop = null;
Clazz.instantialize (this, arguments);
}, test.oracle, "SeeThroughComponent", javax.swing.JPanel);
Clazz.prepareFields (c$, function () {
this.scales = [1, 1, 1, 0.5];
this.offsets =  Clazz.newFloatArray (4, 0);
});
Clazz.makeConstructor (c$, 
function (imageSrc) {
Clazz.superConstructor (this, test.oracle.SeeThroughComponent, []);
try {
var img = javax.imageio.ImageIO.read (imageSrc);
var w = img.getWidth (null);
var h = img.getHeight (null);
this.bi =  new java.awt.image.BufferedImage (w, h, 2);
var g = this.bi.getGraphics ();
g.drawImage (img, 0, 0, null);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
System.out.println ("Image could not be read");
} else {
throw e;
}
}
this.setOpacity (0.5);
}, "java.net.URL");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (this.bi.getWidth (null), this.bi.getHeight (null));
});
Clazz.defineMethod (c$, "setOpacity", 
function (opacity) {
this.scales[3] = opacity;
this.rop =  new java.awt.image.RescaleOp (this.scales, this.offsets, null);
}, "~N");
Clazz.overrideMethod (c$, "paint", 
function (g) {
var g2d = g;
g2d.setColor (java.awt.Color.white);
g2d.fillRect (0, 0, this.getWidth (), this.getHeight ());
g2d.setColor (java.awt.Color.black);
g2d.setFont ( new java.awt.Font ("Dialog", 1, 24));
g2d.drawString ("JavaScript is cool!", 5, 80);
g2d.drawImage (this.bi, this.rop, 0, 0);
}, "java.awt.Graphics");
c$ = Clazz.decorateAsClass (function () {
this.imageSrc = null;
Clazz.instantialize (this, arguments);
}, test.oracle, "SeeThroughImageApplet", javax.swing.JApplet);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.oracle.SeeThroughImageApplet, []);
});
Clazz.makeConstructor (c$, 
function (imageSrc) {
Clazz.superConstructor (this, test.oracle.SeeThroughImageApplet, []);
this.imageSrc = imageSrc;
}, "java.net.URL");
Clazz.overrideMethod (c$, "init", 
function () {
try {
this.imageSrc = this.pathTo (test.oracle.SeeThroughImageApplet.imageFileName);
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
} else {
throw e;
}
}
this.buildUI ();
});
Clazz.defineMethod (c$, "buildUI", 
function () {
var st =  new test.oracle.SeeThroughComponent (this.imageSrc);
this.add ("Center", st);
try {
var opacitySlider =  new javax.swing.JSlider (0, 100);
opacitySlider.addChangeListener (((Clazz.isClassDefined ("test.oracle.SeeThroughImageApplet$1") ? 0 : test.oracle.SeeThroughImageApplet.$SeeThroughImageApplet$1$ ()), Clazz.innerTypeInstance (test.oracle.SeeThroughImageApplet$1, this, Clazz.cloneFinals ("st", st))));
var size = st.getPreferredSize ();
var sliderSize = opacitySlider.getPreferredSize ();
this.resize (size.width, size.height + sliderSize.height);
this.add ("South", opacitySlider);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
});
c$.main = Clazz.defineMethod (c$, "main", 
function (s) {
var f =  new javax.swing.JFrame ("See Through Image");
f.addWindowListener (((Clazz.isClassDefined ("test.oracle.SeeThroughImageApplet$2") ? 0 : test.oracle.SeeThroughImageApplet.$SeeThroughImageApplet$2$ ()), Clazz.innerTypeInstance (test.oracle.SeeThroughImageApplet$2, this, null)));
var imageSrc = null;
try {
imageSrc = (( new java.io.File (test.oracle.SeeThroughImageApplet.imageFileName)).toURI ()).toURL ();
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
} else {
throw e;
}
}
var sta =  new test.oracle.SeeThroughImageApplet (imageSrc);
sta.buildUI ();
f.add ("Center", sta);
f.pack ();
f.setVisible (true);
}, "~A");
Clazz.defineMethod (c$, "pathTo", 
 function (file) {
var path = this.getDocumentBase ().toString ();
var pt = path.indexOf ("/bin/");
if (pt > 0) path = path.substring (0, pt) + "/html/" + path.substring (pt + 5);
path = path.substring (0, path.lastIndexOf ("/") + 1) + file;
if (path.startsWith ("/")) path = "file://" + path;
return  new java.net.URL (path);
}, "~S");
c$.$SeeThroughImageApplet$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (test.oracle, "SeeThroughImageApplet$1", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
var slider = e.getSource ();
this.f$.st.setOpacity (slider.getValue () / 100);
this.f$.st.repaint ();
}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
c$.$SeeThroughImageApplet$2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (test.oracle, "SeeThroughImageApplet$2", java.awt.event.WindowAdapter);
Clazz.overrideMethod (c$, "windowClosing", 
function (e) {
System.exit (0);
}, "java.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"imageFileName", "examples/duke_skateboard.jpg");
});
