Clazz.declarePackage ("test.oracle");
Clazz.load (["javax.swing.JApplet", "$.JPanel"], ["test.oracle.JumbledImageApplet", "$.JumbledImage"], ["java.awt.Dimension", "java.awt.event.ActionListener", "$.WindowAdapter", "java.io.File", "java.net.URL", "java.util.Random", "javax.imageio.ImageIO", "javax.swing.JButton", "$.JFrame"], function () {
c$ = Clazz.decorateAsClass (function () {
this.numlocs = 2;
this.numcells = 0;
this.cells = null;
this.bi = null;
this.w = 0;
this.h = 0;
this.cw = 0;
this.ch = 0;
Clazz.instantialize (this, arguments);
}, test.oracle, "JumbledImage", javax.swing.JPanel);
Clazz.prepareFields (c$, function () {
this.numcells = this.numlocs * this.numlocs;
});
Clazz.makeConstructor (c$, 
function (imageSrc) {
Clazz.superConstructor (this, test.oracle.JumbledImage, []);
try {
this.bi = javax.imageio.ImageIO.read (imageSrc);
this.w = this.bi.getWidth (null);
this.h = this.bi.getHeight (null);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
System.out.println ("Image could not be read");
} else {
throw e;
}
}
this.cw = Clazz.doubleToInt (this.w / this.numlocs);
this.ch = Clazz.doubleToInt (this.h / this.numlocs);
this.cells =  Clazz.newIntArray (this.numcells, 0);
for (var i = 0; i < this.numcells; i++) {
this.cells[i] = i;
}
}, "java.net.URL");
Clazz.defineMethod (c$, "jumble", 
function () {
var rand =  new java.util.Random ();
var ri;
for (var i = 0; i < this.numcells; i++) {
while ((ri = rand.nextInt (this.numlocs)) == i) ;
var tmp = this.cells[i];
this.cells[i] = this.cells[ri];
this.cells[ri] = tmp;
}
});
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (this.w, this.h);
});
Clazz.overrideMethod (c$, "paint", 
function (g) {
var dx;
var dy;
for (var x = 0; x < this.numlocs; x++) {
var sx = x * this.cw;
for (var y = 0; y < this.numlocs; y++) {
var sy = y * this.ch;
var cell = this.cells[x * this.numlocs + y];
dx = (Clazz.doubleToInt (cell / this.numlocs)) * this.cw;
dy = (cell % this.numlocs) * this.ch;
g.drawImage (this.bi, dx, dy, dx + this.cw, dy + this.ch, sx, sy, sx + this.cw, sy + this.ch, null);
}
}
}, "java.awt.Graphics");
c$ = Clazz.decorateAsClass (function () {
this.imageSrc = null;
this.jumbledImage = null;
Clazz.instantialize (this, arguments);
}, test.oracle, "JumbledImageApplet", javax.swing.JApplet);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.oracle.JumbledImageApplet, []);
});
Clazz.makeConstructor (c$, 
function (imageSrc) {
Clazz.superConstructor (this, test.oracle.JumbledImageApplet, []);
this.imageSrc = imageSrc;
}, "java.net.URL");
Clazz.overrideMethod (c$, "init", 
function () {
try {
this.imageSrc = this.pathTo (test.oracle.JumbledImageApplet.imageFileName);
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
var ji =  new test.oracle.JumbledImage (this.imageSrc);
this.add ("Center", ji);
var jumbleButton =  new javax.swing.JButton ("Jumble");
jumbleButton.addActionListener (((Clazz.isClassDefined ("test.oracle.JumbledImageApplet$1") ? 0 : test.oracle.JumbledImageApplet.$JumbledImageApplet$1$ ()), Clazz.innerTypeInstance (test.oracle.JumbledImageApplet$1, this, Clazz.cloneFinals ("ji", ji))));
var jumbleSize = ji.getPreferredSize ();
this.resize (jumbleSize.width, jumbleSize.height + 40);
this.add ("South", jumbleButton);
});
c$.main = Clazz.defineMethod (c$, "main", 
function (s) {
var f =  new javax.swing.JFrame ("Jumbled Image");
f.addWindowListener (((Clazz.isClassDefined ("test.oracle.JumbledImageApplet$2") ? 0 : test.oracle.JumbledImageApplet.$JumbledImageApplet$2$ ()), Clazz.innerTypeInstance (test.oracle.JumbledImageApplet$2, this, null)));
var imageSrc = null;
try {
imageSrc = (( new java.io.File (test.oracle.JumbledImageApplet.imageFileName)).toURI ()).toURL ();
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
} else {
throw e;
}
}
var jumbler =  new test.oracle.JumbledImageApplet (imageSrc);
jumbler.buildUI ();
f.add ("Center", jumbler);
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
c$.$JumbledImageApplet$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (test.oracle, "JumbledImageApplet$1", null, java.awt.event.ActionListener);
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
var b = e.getSource ();
this.f$.ji.jumble ();
this.f$.ji.repaint ();
}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
c$.$JumbledImageApplet$2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (test.oracle, "JumbledImageApplet$2", java.awt.event.WindowAdapter);
Clazz.overrideMethod (c$, "windowClosing", 
function (e) {
System.exit (0);
}, "java.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"imageFileName", "examples/duke_skateboard.jpg");
});
