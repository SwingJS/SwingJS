Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.DiffractionFrame", "$.DiffractionLayout", "$.Diffraction", "$.DiffractionCanvas"], ["java.awt.Color", "$.Dimension", "java.awt.image.MemoryImageSource", "java.lang.Double", "java.text.NumberFormat", "java.util.Random", "$.Vector", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.declareType (test.falstad, "DiffractionCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.DiffractionCanvas, []);
test.falstad.DiffractionCanvas.pg = p;
}, "test.falstad.DiffractionFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
test.falstad.DiffractionCanvas.pg.updateDiffraction (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
{
//debugger;
}test.falstad.DiffractionCanvas.pg.updateDiffraction (g);
}, "java.awt.Graphics");
Clazz.defineStatics (c$,
"pg", null);
c$ = Clazz.declareType (test.falstad, "DiffractionLayout", null, java.awt.LayoutManager);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (name, c) {
}, "~S,java.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (c) {
}, "java.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (target) {
return  new java.awt.Dimension (550, 400);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (target) {
return  new java.awt.Dimension (100, 100);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (target) {
var insets = target.insets ();
var targetw = target.size ().width - insets.left - insets.right;
var cw = Clazz.doubleToInt (targetw * 7 / 10);
if (target.getComponentCount () == 1) cw = targetw;
var targeth = target.size ().height - (insets.top + insets.bottom);
target.getComponent (0).move (insets.left, insets.top);
target.getComponent (0).resize (cw, targeth);
var barwidth = targetw - cw;
cw += insets.left;
var h = insets.top;
var i;
for (i = 1; i < target.getComponentCount (); i++) {
var m = target.getComponent (i);
if (m.isVisible ()) {
var d = m.getPreferredSize ();
if (Clazz.instanceOf (m, swingjs.awt.Scrollbar)) d.width = barwidth;
if (Clazz.instanceOf (m, swingjs.awt.Label)) {
h += Clazz.doubleToInt (d.height / 5);
d.width = barwidth;
}m.move (cw, h);
m.resize (d.width, d.height);
h += d.height;
}}
}, "java.awt.Container");
c$ = Clazz.decorateAsClass (function () {
this.started = false;
Clazz.instantialize (this, arguments);
}, test.falstad, "Diffraction", swingjs.awt.Applet);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.Diffraction.mf != null) test.falstad.Diffraction.mf.dispose ();
test.falstad.Diffraction.mf = null;
});
Clazz.overrideMethod (c$, "init", 
function () {
test.falstad.Diffraction.mf =  new test.falstad.DiffractionFrame (this);
test.falstad.Diffraction.mf.init ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.Diffraction.mf =  new test.falstad.DiffractionFrame (null);
test.falstad.Diffraction.mf.init ();
}, "~A");
Clazz.overrideMethod (c$, "destroy", 
function () {
if (test.falstad.Diffraction.mf != null) test.falstad.Diffraction.mf.dispose ();
test.falstad.Diffraction.mf = null;
});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.Diffraction.mf == null) s = "Applet is finished.";
 else if (test.falstad.Diffraction.mf.useFrame) test.falstad.Diffraction.mf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.Diffraction, "paint", [g]);
}, "java.awt.Graphics");
Clazz.defineStatics (c$,
"mf", null);
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.fullWinSize = null;
this.dbimage = null;
this.random = null;
this.gridSizeX = 200;
this.gridSizeY = 200;
this.defaultsButton = null;
this.colorCheck = null;
this.reversedCheck = null;
this.sizeCheck = null;
this.apertureChooser = null;
this.gridBar = null;
this.lengthBar = null;
this.zoomBar = null;
this.brightnessBar = null;
this.colorMult = 0;
this.zbase = 0;
this.func = null;
this.functionChanged = false;
this.dragging = false;
this.imageSource = null;
this.pixels = null;
this.cv = null;
this.apertureList = null;
this.aperture = null;
this.applet = null;
this.main = null;
this.useBufferedImage = false;
this.useFrame = false;
this.showControls = false;
this.shown = false;
this.angleSteps = 0;
this.angleStepsMask = 0;
this.angcos1 = null;
this.angsin1 = null;
this.angcos2 = null;
this.angsin2 = null;
this.angleSteps2 = 0;
this.angleSteps2Mask = 0;
this.accumR = null;
this.accumI = null;
this.apertureArgMult = 0;
this.apertureArgMultRed = 0;
this.apertureArgMultBlue = 0;
this.colorLenMults = null;
this.reversed = false;
this.color = false;
this.selection = -1;
this.zoomFactor = 0;
this.oldZoom = 200;
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.Aperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$Aperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.CircularAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$CircularAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.OneDimensionalAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$OneDimensionalAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.HalfPlaneAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$HalfPlaneAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.SlitAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$SlitAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.DoubleSlitAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$DoubleSlitAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.TripleSlitAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$TripleSlitAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.BlockAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$BlockAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.SquareAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$SquareAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.RectangularAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$RectangularAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.CornerAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$CornerAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.CrossAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$CrossAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.RectanglesAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$RectanglesAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.FrameAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$FrameAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.PlusAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$PlusAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.IntersectingSquaresAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$IntersectingSquaresAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.DoubleCircleAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$DoubleCircleAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.RingAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$RingAperture$ ();
}
if (!Clazz.isClassDefined ("test.falstad.DiffractionFrame.HalfCircleAperture")) {
test.falstad.DiffractionFrame.$DiffractionFrame$HalfCircleAperture$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "DiffractionFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "Diffraction by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.DiffractionFrame, ["Diffraction Applet v1.1a"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.Diffraction");
Clazz.defineMethod (c$, "init", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
try {
if (this.applet != null) {
var param = this.applet.getParameter ("useFrame");
if (param != null && param.equalsIgnoreCase ("false")) this.useFrame = false;
param = this.applet.getParameter ("showControls");
if (param != null && param.equalsIgnoreCase ("false")) this.showControls = false;
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
if (this.useFrame) this.main = this;
 else this.main = this.applet;
this.apertureList =  new java.util.Vector ();
var a = Clazz.innerTypeInstance (test.falstad.DiffractionFrame.CircularAperture, this, null);
while (a != null) {
this.apertureList.addElement (a);
a = a.createNext ();
}
this.main.setLayout ( new test.falstad.DiffractionLayout ());
this.cv =  new test.falstad.DiffractionCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.main.add (this.defaultsButton =  new swingjs.awt.Button ("Set to Defaults"));
this.defaultsButton.addActionListener (this);
this.colorCheck =  new swingjs.awt.Checkbox ("Tri-chromatic");
this.colorCheck.addItemListener (this);
this.main.add (this.colorCheck);
this.reversedCheck =  new swingjs.awt.Checkbox ("Reversed");
this.reversedCheck.addItemListener (this);
this.main.add (this.reversedCheck);
this.sizeCheck =  new swingjs.awt.Checkbox ("Show Dimensions");
this.sizeCheck.addItemListener (this);
this.main.add (this.sizeCheck);
var os = System.getProperty ("os.name");
var jv = System.getProperty ("java.class.version");
var jvf =  new Double (jv).doubleValue ();
if (jvf >= 48) this.useBufferedImage = true;
this.apertureChooser =  new swingjs.awt.Choice ();
var i;
for (i = 0; i != this.apertureList.size (); i++) this.apertureChooser.add ("Aperture: " + (this.apertureList.elementAt (i)).getName ());

this.main.add (this.apertureChooser);
this.aperture = this.apertureList.elementAt (0);
this.apertureChooser.addItemListener (this);
this.main.add ( new swingjs.awt.Label ("Aperture Scale", 0));
this.main.add (this.lengthBar =  new swingjs.awt.Scrollbar (0, 260, 1, 35, 500));
this.lengthBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Zoom", 0));
this.main.add (this.zoomBar =  new swingjs.awt.Scrollbar (0, 200, 1, 30, 400));
this.zoomBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 50, 1, 1, 500));
this.brightnessBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Image Resolution", 0));
this.main.add (this.gridBar =  new swingjs.awt.Scrollbar (0, 250, 2, 10, 600));
this.gridBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("http://www.falstad.com", 0));
this.random =  new java.util.Random ();
this.functionChanged = true;
this.reinit ();
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (java.awt.Color.white);
this.zbase = 1 / java.lang.Math.exp (4);
if (this.useFrame) {
this.setSize (800, 640);
this.handleResize ();
var x = this.getSize ();
var screen = this.getToolkit ().getScreenSize ();
this.setLocation (Clazz.doubleToInt ((screen.width - x.width) / 2), Clazz.doubleToInt ((screen.height - x.height) / 2));
this.setVisible (true);
} else {
this.setVisible (false);
this.handleResize ();
this.applet.validate ();
}});
Clazz.defineMethod (c$, "reinit", 
function () {
this.handleResize ();
});
Clazz.defineMethod (c$, "triggerShow", 
function () {
if (!this.shown) this.setVisible (true);
this.shown = true;
});
Clazz.defineMethod (c$, "handleResize", 
function () {
this.winSize = this.cv.getSize ();
if (this.winSize.width == 0) return;
var d = this.fullWinSize = this.cv.getSize ();
var w = (this.winSize.width > this.winSize.height) ? this.winSize.height : this.winSize.width;
this.winSize.width = this.winSize.height = w;
this.pixels = null;
d = this.winSize;
if (this.useBufferedImage) {
try {
var biclass = Clazz._4Name ("java.awt.image.BufferedImage");
var dbiclass = Clazz._4Name ("java.awt.image.DataBufferInt");
var rasclass = Clazz._4Name ("java.awt.image.Raster");
var cstr = biclass.getConstructor ([Number, Number, Number]);
this.dbimage = cstr.newInstance ([ new Integer (d.width),  new Integer (d.height),  new Integer (1)]);
var m = biclass.getMethod ("getRaster", null);
var ras = m.invoke (this.dbimage, null);
var db = rasclass.getMethod ("getDataBuffer", null).invoke (ras, null);
this.pixels = dbiclass.getMethod ("getData", null).invoke (db, null);
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
System.out.println ("BufferedImage failed");
} else {
throw ee;
}
}
}if (this.pixels == null) {
this.pixels =  Clazz.newIntArray (d.width * d.height, 0);
var i;
for (i = 0; i != d.width * d.height; i++) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (d.width, d.height, this.pixels, 0, d.width);
this.imageSource.setAnimated (true);
this.imageSource.setFullBufferUpdates (true);
this.dbimage = this.cv.createImage (this.imageSource);
}this.imageSource =  new java.awt.image.MemoryImageSource (d.width, d.height, this.pixels, 0, d.width);
});
Clazz.defineMethod (c$, "computeFunction", 
function () {
this.accumR =  Clazz.newIntArray (3, 0);
this.accumI =  Clazz.newIntArray (3, 0);
this.aperture = this.apertureList.elementAt (this.apertureChooser.getSelectedIndex ());
this.gridSizeX = this.gridSizeY = (this.gridBar.getValue () & -2);
if (this.aperture.oneDimensional ()) {
this.gridSizeX *= 2;
this.gridSizeY = 1;
}this.func =  Clazz.newDoubleArray (this.gridSizeX, this.gridSizeY, 3, 0);
var i;
var j;
this.color = this.colorCheck.getState ();
this.angleSteps = (this.gridBar.getValue () >= 195) ? 1024 : 256;
if (this.aperture.oneDimensional ()) this.angleSteps = (this.gridBar.getValue () >= 195) ? 2048 : 1024;
this.angleStepsMask = this.angleSteps - 1;
this.zoomFactor = java.lang.Math.exp (this.zoomBar.getValue () / 50.) * this.zbase;
var baselen = java.lang.Math.exp (this.lengthBar.getValue () / 110.) / this.zoomFactor;
this.angcos1 =  Clazz.newDoubleArray (this.angleSteps, 0);
this.angsin1 =  Clazz.newDoubleArray (this.angleSteps, 0);
for (i = 0; i != this.angleSteps; i++) {
this.angcos1[i] = java.lang.Math.cos (i * 6.283185307179586 / this.angleSteps);
this.angsin1[i] = java.lang.Math.sin (i * 6.283185307179586 / this.angleSteps);
}
this.angleSteps2 = 4096;
this.angleSteps2Mask = this.angleSteps2 - 1;
this.angcos2 =  Clazz.newLongArray (this.angleSteps2, 0);
this.angsin2 =  Clazz.newLongArray (this.angleSteps2, 0);
this.reversed = this.reversedCheck.getState ();
var sign = (this.reversed) ? -1 : 1;
this.colorLenMults =  Clazz.newDoubleArray (3, 0);
for (i = 0; i != this.angleSteps2; i++) {
this.angcos2[i] = Clazz.doubleToLong (java.lang.Math.cos (i * 6.283185307179586 / this.angleSteps2) * 256 * sign);
this.angsin2[i] = Clazz.doubleToLong (java.lang.Math.sin (i * 6.283185307179586 / this.angleSteps2) * 256 * sign);
}
this.colorLenMults[0] = baselen / (1.2745098039215685);
this.colorLenMults[1] = baselen;
this.colorLenMults[2] = baselen / (0.9313725490196079);
this.apertureArgMult = this.angleSteps2 * .25;
this.apertureArgMult *= baselen * baselen;
this.apertureArgMultRed = this.apertureArgMult / (1.6243752402921954);
this.apertureArgMultBlue = this.apertureArgMult / (0.8674548250672818);
this.aperture.compute ();
var maxx = this.aperture.hasXSymmetry () ? Clazz.doubleToInt (this.gridSizeX / 2) : this.gridSizeX;
var maxy = this.aperture.hasYSymmetry () ? Clazz.doubleToInt (this.gridSizeY / 2) : this.gridSizeY;
var mink = (this.color) ? 0 : 1;
var maxk = (this.color) ? 2 : 1;
var k;
if (this.aperture.hasDiagonalSymmetry ()) for (k = mink; k <= maxk; k++) for (i = 0; i != maxx; i++) for (j = 0; j <= i; j++) this.func[j][i][k] = this.func[i][j][k];



if (this.aperture.hasXSymmetry ()) for (k = mink; k <= maxk; k++) for (i = 0; i != maxx; i++) for (j = 0; j != maxy; j++) this.func[this.gridSizeX - 1 - i][j][k] = this.func[i][j][k];



if (this.aperture.hasYSymmetry ()) for (k = mink; k <= maxk; k++) for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != maxy; j++) this.func[i][this.gridSizeX - 1 - j][k] = this.func[i][j][k];



this.functionChanged = false;
});
Clazz.defineMethod (c$, "setFunction", 
function (i, j) {
var mink = 1;
var maxk = 1;
if (this.color) {
mink = 0;
maxk = 2;
}var k;
for (k = mink; k <= maxk; k++) {
var ard = (this.accumR[k]) / (this.angleSteps * 256);
var aid = (this.accumI[k]) / (this.angleSteps * 256);
var mag = ard * ard + aid * aid;
this.func[i][j][k] = mag;
}
}, "~N,~N");
Clazz.defineMethod (c$, "clearAccum", 
function () {
var i;
for (i = 0; i != 3; i++) this.accumR[i] = this.accumI[i] = 0;

});
Clazz.defineMethod (c$, "apertureStart", 
function (r) {
var r2 = r * r;
var arg = (Clazz.doubleToInt (r2 * this.apertureArgMult)) & this.angleSteps2Mask;
this.accumR[1] -= this.angcos2[arg];
this.accumI[1] -= this.angsin2[arg];
if (this.color) {
arg = (Clazz.doubleToInt (r2 * this.apertureArgMultRed)) & this.angleSteps2Mask;
this.accumR[0] -= this.angcos2[arg];
this.accumI[0] -= this.angsin2[arg];
arg = (Clazz.doubleToInt (r2 * this.apertureArgMultBlue)) & this.angleSteps2Mask;
this.accumR[2] -= this.angcos2[arg];
this.accumI[2] -= this.angsin2[arg];
}}, "~N");
Clazz.defineMethod (c$, "apertureStop", 
function (r) {
var r2 = r * r;
var arg = (Clazz.doubleToInt (r2 * this.apertureArgMult)) & this.angleSteps2Mask;
this.accumR[1] += this.angcos2[arg];
this.accumI[1] += this.angsin2[arg];
if (this.color) {
arg = (Clazz.doubleToInt (r2 * this.apertureArgMultRed)) & this.angleSteps2Mask;
this.accumR[0] += this.angcos2[arg];
this.accumI[0] += this.angsin2[arg];
arg = (Clazz.doubleToInt (r2 * this.apertureArgMultBlue)) & this.angleSteps2Mask;
this.accumR[2] += this.angcos2[arg];
this.accumI[2] += this.angsin2[arg];
}}, "~N");
Clazz.defineMethod (c$, "apertureStartOrigin", 
function (x) {
if (this.reversed) x = !x;
if (x) {
this.accumR[1] -= 256 * this.angleSteps;
if (this.color) {
this.accumR[0] -= 256 * this.angleSteps;
this.accumR[2] -= 256 * this.angleSteps;
}}}, "~B");
Clazz.defineMethod (c$, "sign", 
function (x) {
return x < 0 ? -1 : 1;
}, "~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateDiffraction", 
function (realg) {
var hideFunction = this.dragging && this.aperture.hideWhileDragging ();
if (this.functionChanged) {
realg.setColor (this.cv.getBackground ());
var fm = realg.getFontMetrics ();
var cs = "Calculating...";
realg.fillRect (0, this.fullWinSize.height - 30, 20 + fm.stringWidth (cs), 30);
realg.setColor (java.awt.Color.white);
realg.drawString (cs, 10, this.fullWinSize.height - 10);
this.computeFunction ();
}var g = null;
if (this.winSize == null || this.winSize.width == 0) return;
g = this.dbimage.getGraphics ();
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.fullWinSize.width, this.fullWinSize.height);
g.setColor (this.cv.getForeground ());
var i;
var j;
this.colorMult = 70 * java.lang.Math.exp (this.brightnessBar.getValue () / 50.);
if (!hideFunction) {
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var x = Clazz.doubleToInt (i * this.winSize.width / this.gridSizeX);
var y = Clazz.doubleToInt (j * this.winSize.height / this.gridSizeY);
var x2 = Clazz.doubleToInt ((i + 1) * this.winSize.width / this.gridSizeX);
var y2 = Clazz.doubleToInt ((j + 1) * this.winSize.height / this.gridSizeY);
var colval = 0;
if (!this.color) {
var col = this.getColorValue (i, j, 1);
colval = 0xFF000000 | (col * 0X010101);
} else {
colval = 0xFF000000 + (this.getColorValue (i, j, 0) << 16) | (this.getColorValue (i, j, 1) << 8) | (this.getColorValue (i, j, 2));
}var k;
var l;
for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.winSize.width] = colval;


}

}if (this.imageSource != null) this.imageSource.newPixels ();
g.setColor (java.awt.Color.red);
this.aperture.drawGeometricShadow (g);
if (this.sizeCheck.getState ()) {
g.setColor (this.cv.getBackground ());
var fm = realg.getFontMetrics ();
var wl = 510e-9;
var nf = java.text.NumberFormat.getInstance ();
nf.setMaximumFractionDigits (2);
var baselen = java.lang.Math.exp (this.lengthBar.getValue () / 110.) / this.zoomFactor;
var dim = this.aperture.getDimension () * baselen * java.lang.Math.sqrt (wl * 2);
var cs = "width = ";
if (dim > .001) cs += nf.format (dim * 1000) + " mm";
 else if (dim > 1e-6) cs += nf.format (dim * 1e6) + " \u00b5m";
 else cs += nf.format (dim * 1e9) + " nm";
var sw = fm.stringWidth (cs);
if (dim > 0) {
g.fillRect (this.fullWinSize.width - (20 + sw), this.fullWinSize.height - 30, 20 + sw, 30);
g.setColor (java.awt.Color.white);
g.drawString (cs, this.fullWinSize.width - (10 + sw), this.fullWinSize.height - 10);
}}realg.drawImage (this.dbimage, 0, 0, this);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "getColorValue", 
function (i, j, k) {
var val = Clazz.doubleToInt (this.func[i][j][k] * this.colorMult);
if (val > 255) val = 255;
return val;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "doZoom", 
function () {
var z = java.lang.Math.exp (this.zoomBar.getValue () / 50.) * this.zbase;
var oz = java.lang.Math.exp (this.oldZoom / 50.) * this.zbase;
var zoomChange = z / oz;
this.oldZoom = this.zoomBar.getValue ();
this.aperture.rezoom (zoomChange);
});
Clazz.overrideMethod (c$, "componentHidden", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentMoved", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentShown", 
function (e) {
this.cv.repaint ();
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentResized", 
function (e) {
this.handleResize ();
this.cv.repaint (100);
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
if (e.getSource () === this.defaultsButton) {
this.colorCheck.setState (false);
this.reversedCheck.setState (false);
this.lengthBar.setValue (260);
this.gridBar.setValue (90);
this.zoomBar.setValue (this.oldZoom = 200);
this.functionChanged = true;
this.brightnessBar.setValue (this.aperture.defaultBrightness ());
this.aperture.setToDefaults ();
this.cv.repaint ();
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () !== this.brightnessBar) this.functionChanged = true;
if (e.getSource () === this.zoomBar) this.doZoom ();
this.cv.repaint (100);
}, "java.awt.event.AdjustmentEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
if (this.selection != -1) {
this.dragging = true;
if (this.aperture.drag (e.getX (), e.getY ())) this.cv.repaint ();
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
if ((e.getModifiers () & 16) != 0) {
if (this.selection != -1) {
this.dragging = true;
if (this.aperture.drag (e.getX (), e.getY ())) this.cv.repaint ();
}return;
}var sel = this.selection;
this.selection = this.aperture.getSelection (e.getX (), e.getY ());
if (this.selection != sel) this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
if (!this.dragging && this.selection != -1) {
this.selection = -1;
this.cv.repaint ();
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
if (this.selection != -1) {
this.dragging = true;
if (this.aperture.drag (e.getX (), e.getY ())) this.cv.repaint ();
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if (this.dragging) {
this.functionChanged = true;
this.cv.repaint ();
}this.dragging = false;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (e.getSource () !== this.sizeCheck) this.functionChanged = true;
if (e.getSource () === this.apertureChooser) {
{
//debugger;
}this.aperture = this.apertureList.elementAt (this.apertureChooser.getSelectedIndex ());
this.brightnessBar.setValue (this.aperture.defaultBrightness ());
this.zoomBar.setValue (this.oldZoom = 200);
}System.out.println ("requestion repaint for " + this.aperture.getClass ().getName ());
this.cv.repaint (100);
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
if (this.applet == null) this.dispose ();
 else this.applet.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.DiffractionFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "fresnl", 
function (xxa, result) {
var f;
var g;
var cc;
var ss;
var c;
var s;
var t;
var u;
var x;
var x2;
while (true) {
x = java.lang.Math.abs (xxa);
x2 = x * x;
if (x2 < 2.5625) {
t = x2 * x2;
ss = x * x2 * this.polevl (t, test.falstad.DiffractionFrame.sn, 5) / this.p1evl (t, test.falstad.DiffractionFrame.sd, 6);
cc = x * this.polevl (t, test.falstad.DiffractionFrame.cn, 5) / this.polevl (t, test.falstad.DiffractionFrame.cd, 6);
break;
}if (x > 36974.0) {
cc = 0.5;
ss = 0.5;
break;
}x2 = x * x;
t = 3.141592653589793 * x2;
u = 1.0 / (t * t);
t = 1.0 / t;
f = 1.0 - u * this.polevl (u, test.falstad.DiffractionFrame.fn, 9) / this.p1evl (u, test.falstad.DiffractionFrame.fd, 10);
g = t * this.polevl (u, test.falstad.DiffractionFrame.gn, 10) / this.p1evl (u, test.falstad.DiffractionFrame.gd, 11);
t = 1.5707963267948966 * x2;
c = java.lang.Math.cos (t);
s = java.lang.Math.sin (t);
t = 3.141592653589793 * x;
cc = 0.5 + (f * s - g * c) / t;
ss = 0.5 - (f * c + g * s) / t;
break;
}
if (xxa < 0.0) {
cc = -cc;
ss = -ss;
}result[0] = cc;
result[1] = ss;
return (0);
}, "~N,~A");
Clazz.defineMethod (c$, "polevl", 
function (x, coef, N) {
var ans;
var i;
var p = 0;
ans = coef[p++];
i = N;
do ans = ans * x + coef[p++];
 while (--i > 0);
return (ans);
}, "~N,~A,~N");
Clazz.defineMethod (c$, "p1evl", 
function (x, coef, N) {
var ans;
var p = 0;
var i;
ans = x + coef[p++];
i = N - 1;
do ans = ans * x + coef[p++];
 while (--i > 0);
return (ans);
}, "~N,~A,~N");
c$.$DiffractionFrame$Aperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "Aperture");
Clazz.defineMethod (c$, "defaultBrightness", 
function () {
return 50;
});
Clazz.defineMethod (c$, "oneDimensional", 
function () {
return false;
});
Clazz.defineMethod (c$, "hasXSymmetry", 
function () {
return false;
});
Clazz.defineMethod (c$, "hasYSymmetry", 
function () {
return false;
});
Clazz.defineMethod (c$, "hasDiagonalSymmetry", 
function () {
return false;
});
Clazz.defineMethod (c$, "hideWhileDragging", 
function () {
return true;
});
Clazz.defineMethod (c$, "rezoom", 
function (a) {
}, "~N");
Clazz.makeConstructor (c$, 
function () {
this.setToDefaults ();
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$CircularAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.radius = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "CircularAperture", test.falstad.DiffractionFrame.Aperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.Aperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "circle";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.HalfPlaneAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasYSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasDiagonalSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.radius = .25;
});
Clazz.overrideMethod (c$, "rezoom", 
function (a) {
this.radius *= a;
}, "~N");
Clazz.overrideMethod (c$, "compute", 
function () {
var a;
var b;
for (a = 0; a != Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].gridSizeX / 2); a++) {
for (b = 0; b <= a; b++) {
this.b$["test.falstad.DiffractionFrame"].clearAccum ();
var c = (a / this.b$["test.falstad.DiffractionFrame"].gridSizeX) - .5;
var d = (b / this.b$["test.falstad.DiffractionFrame"].gridSizeY) - .5;
var e;
var f = -c;
var g = -d;
var h = f * f + g * g;
var i = this.radius;
var j = h - i * i;
var k = j * 4;
var l = 0;
var m = 6.283185307179586;
if (j <= 0) {
} else {
var n = java.lang.Math.sqrt (h);
var o = f / n;
var p = g / n;
var q = java.lang.Math.atan2 (g - o * i, f + p * i);
var r = java.lang.Math.atan2 (g + o * i, f - p * i);
l = (q < r) ? q : r;
m = (q > r) ? q : r;
if (m - l > 3.141592653589793) {
l = (q > r) ? q : r;
m = (q < r) ? q : r;
m += 6.283185307179586;
}}var n = Clazz.doubleToInt ((l * this.b$["test.falstad.DiffractionFrame"].angleSteps) / 6.283185307179586);
var o = Clazz.doubleToInt ((m * this.b$["test.falstad.DiffractionFrame"].angleSteps) / 6.283185307179586);
while (n < 0) {
n += this.b$["test.falstad.DiffractionFrame"].angleSteps;
o += this.b$["test.falstad.DiffractionFrame"].angleSteps;
}
for (e = n; e < o; e++) {
var p = this.b$["test.falstad.DiffractionFrame"].angcos1[e & this.b$["test.falstad.DiffractionFrame"].angleStepsMask];
var q = this.b$["test.falstad.DiffractionFrame"].angsin1[e & this.b$["test.falstad.DiffractionFrame"].angleStepsMask];
var r = -2 * (p * f + q * g);
var s = r * r - k;
if (s < 0) continue;
s = java.lang.Math.sqrt (s);
var t = .5 * (-r - s);
var u = .5 * (-r + s);
if (t < 0 && u < 0) continue;
if (t > 0) this.b$["test.falstad.DiffractionFrame"].apertureStart (t);
this.b$["test.falstad.DiffractionFrame"].apertureStop (u);
}
this.b$["test.falstad.DiffractionFrame"].apertureStartOrigin (j < 0);
this.b$["test.falstad.DiffractionFrame"].setFunction (a, b);
}
}
});
Clazz.overrideMethod (c$, "drawGeometricShadow", 
function (a) {
if (this.b$["test.falstad.DiffractionFrame"].selection == 1) a.setColor (java.awt.Color.yellow);
var b = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width * this.radius);
a.drawOval (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - b, Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b, b * 2, b * 2);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getSelection", 
function (a, b) {
var c = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - a;
var d = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b;
var e = java.lang.Math.sqrt (c * c + d * d) / this.b$["test.falstad.DiffractionFrame"].winSize.width;
return (java.lang.Math.abs (e - this.radius) < 5. / this.b$["test.falstad.DiffractionFrame"].winSize.width) ? 1 : -1;
}, "~N,~N");
Clazz.overrideMethod (c$, "drag", 
function (a, b) {
var c = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - a;
var d = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b;
var e = java.lang.Math.sqrt (c * c + d * d) / this.b$["test.falstad.DiffractionFrame"].winSize.width;
if (e == this.radius) return false;
this.radius = e;
return true;
}, "~N,~N");
Clazz.overrideMethod (c$, "getDimension", 
function () {
return this.radius * 2;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$OneDimensionalAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.lineLocations = null;
this.lineCount = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "OneDimensionalAperture", test.falstad.DiffractionFrame.Aperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.Aperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "oneDimensional", 
function () {
return true;
});
Clazz.overrideMethod (c$, "compute", 
function () {
var a;
var b;
var c =  Clazz.newDoubleArray (2, 0);
var d = 1;
var e = 1;
if (this.b$["test.falstad.DiffractionFrame"].color) {
d = 0;
e = 2;
}var f;
var g = (this.hasXSymmetry ()) ? Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].gridSizeX / 2) : this.b$["test.falstad.DiffractionFrame"].gridSizeX;
var h = (this.b$["test.falstad.DiffractionFrame"].reversedCheck.getState ()) ? -1 : 0;
if (this.lineCount == 1) h += .5;
for (a = 0; a != g; a++) {
var i = (a / this.b$["test.falstad.DiffractionFrame"].gridSizeX) - .5;
for (f = d; f <= e; f++) {
var j = this.b$["test.falstad.DiffractionFrame"].colorLenMults[f];
var k = h;
var l = h;
var m = 1;
for (b = 0; b != this.lineCount; b++) {
this.b$["test.falstad.DiffractionFrame"].fresnl ((i - this.lineLocations[b]) * j, c);
k += m * c[0];
l += m * c[1];
m = -m;
}
this.b$["test.falstad.DiffractionFrame"].func[a][0][f] = .5 * (k * k + l * l);
}
}
});
Clazz.overrideMethod (c$, "getDimension", 
function () {
return this.lineLocations[this.lineCount - 1] - this.lineLocations[0];
});
Clazz.overrideMethod (c$, "drawGeometricShadow", 
function (a) {
var b;
var c = -1;
if (this.b$["test.falstad.DiffractionFrame"].selection != -1 && this.hasXSymmetry ()) c = this.lineCount - 1 - this.b$["test.falstad.DiffractionFrame"].selection;
for (b = 0; b != this.lineCount; b++) {
var d = Clazz.doubleToInt ((this.lineLocations[b] + .5) * this.b$["test.falstad.DiffractionFrame"].winSize.width);
a.setColor ((this.b$["test.falstad.DiffractionFrame"].selection == b || c == b) ? java.awt.Color.yellow : java.awt.Color.red);
a.drawLine (d, 0, d, this.b$["test.falstad.DiffractionFrame"].winSize.height - 1);
}
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getSelection", 
function (a, b) {
var c = (a) / this.b$["test.falstad.DiffractionFrame"].winSize.width - .5;
var d = 3. / this.b$["test.falstad.DiffractionFrame"].winSize.width;
var e = -1;
var f;
for (f = 0; f != this.lineCount; f++) {
var g = java.lang.Math.abs (this.lineLocations[f] - c);
if (g < d) {
e = f;
d = g;
}}
return e;
}, "~N,~N");
Clazz.overrideMethod (c$, "drag", 
function (a, b) {
var c = (a) / this.b$["test.falstad.DiffractionFrame"].winSize.width - .5;
if (this.b$["test.falstad.DiffractionFrame"].selection > 0 && c <= this.lineLocations[this.b$["test.falstad.DiffractionFrame"].selection - 1]) return false;
if (this.b$["test.falstad.DiffractionFrame"].selection < this.lineCount - 1 && c >= this.lineLocations[this.b$["test.falstad.DiffractionFrame"].selection + 1]) return false;
if (this.hasXSymmetry () && this.b$["test.falstad.DiffractionFrame"].sign (this.lineLocations[this.b$["test.falstad.DiffractionFrame"].selection]) != this.b$["test.falstad.DiffractionFrame"].sign (c)) return false;
this.lineLocations[this.b$["test.falstad.DiffractionFrame"].selection] = c;
if (this.hasXSymmetry ()) {
var d = this.lineCount - 1 - this.b$["test.falstad.DiffractionFrame"].selection;
this.lineLocations[d] = -c;
}this.b$["test.falstad.DiffractionFrame"].functionChanged = true;
return true;
}, "~N,~N");
Clazz.overrideMethod (c$, "hideWhileDragging", 
function () {
return false;
});
Clazz.overrideMethod (c$, "rezoom", 
function (a) {
var b;
for (b = 0; b != this.lineCount; b++) this.lineLocations[b] *= a;

}, "~N");
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$HalfPlaneAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "HalfPlaneAperture", test.falstad.DiffractionFrame.OneDimensionalAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.OneDimensionalAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.lineLocations =  Clazz.newDoubleArray (this.lineCount = 1, 0);
this.lineLocations[0] = 0;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "half plane";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.SlitAperture, this, null);
});
Clazz.overrideMethod (c$, "getDimension", 
function () {
return .5 - this.lineLocations[0];
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$SlitAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "SlitAperture", test.falstad.DiffractionFrame.OneDimensionalAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.OneDimensionalAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.lineLocations =  Clazz.newDoubleArray (this.lineCount = 2, 0);
this.lineLocations[0] = -0.06;
this.lineLocations[1] = .06;
});
Clazz.overrideMethod (c$, "defaultBrightness", 
function () {
return 200;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "slit";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.DoubleSlitAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$DoubleSlitAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "DoubleSlitAperture", test.falstad.DiffractionFrame.OneDimensionalAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.OneDimensionalAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.lineLocations =  Clazz.newDoubleArray (this.lineCount = 4, 0);
this.lineLocations[0] = -0.17;
this.lineLocations[1] = -0.125;
this.lineLocations[2] = 0.125;
this.lineLocations[3] = .17;
});
Clazz.overrideMethod (c$, "defaultBrightness", 
function () {
return 140;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "double slit";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.TripleSlitAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$TripleSlitAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "TripleSlitAperture", test.falstad.DiffractionFrame.OneDimensionalAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.OneDimensionalAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.lineLocations =  Clazz.newDoubleArray (this.lineCount = 6, 0);
this.lineLocations[0] = -0.1533;
this.lineLocations[1] = -0.1133;
this.lineLocations[2] = -0.02;
this.lineLocations[3] = .02;
this.lineLocations[4] = .1133;
this.lineLocations[5] = .1533;
});
Clazz.overrideMethod (c$, "defaultBrightness", 
function () {
return 210;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "triple slit";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.SquareAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$BlockAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.blockCountX = 0;
this.blockCountY = 0;
this.blocks = null;
this.lineXLocations = null;
this.lineYLocations = null;
this.rectCount = 0;
this.rects = null;
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "BlockAperture", test.falstad.DiffractionFrame.Aperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.Aperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "compute", 
function () {
this.setupRects ();
var a;
var b;
var c =  Clazz.newDoubleArray (2, 0);
var d =  Clazz.newDoubleArray (2, 0);
var e =  Clazz.newDoubleArray (2, 0);
var f =  Clazz.newDoubleArray (2, 0);
var g = 1;
var h = 1;
if (this.b$["test.falstad.DiffractionFrame"].color) {
g = 0;
h = 2;
}var i;
var j = (this.b$["test.falstad.DiffractionFrame"].reversedCheck.getState ()) ? -1 : 0;
var k = (this.hasXSymmetry ()) ? Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].gridSizeX / 2) : this.b$["test.falstad.DiffractionFrame"].gridSizeX;
var l = (this.hasYSymmetry ()) ? Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].gridSizeY / 2) : this.b$["test.falstad.DiffractionFrame"].gridSizeY;
for (a = 0; a != k; a++) {
if (this.hasDiagonalSymmetry ()) l = a + 1;
var m = (a / this.b$["test.falstad.DiffractionFrame"].gridSizeX) - .5;
for (b = 0; b != l; b++) {
var n = (b / this.b$["test.falstad.DiffractionFrame"].gridSizeY) - .5;
for (i = g; i <= h; i++) {
var o = this.b$["test.falstad.DiffractionFrame"].colorLenMults[i];
var p = 0;
var q = j;
var r;
for (r = 0; r != this.rectCount; r++) {
this.b$["test.falstad.DiffractionFrame"].fresnl ((this.rects[r][0] - m) * o, c);
this.b$["test.falstad.DiffractionFrame"].fresnl ((this.rects[r][2] - m) * o, d);
this.b$["test.falstad.DiffractionFrame"].fresnl ((this.rects[r][1] - n) * o, e);
this.b$["test.falstad.DiffractionFrame"].fresnl ((this.rects[r][3] - n) * o, f);
var s = c[0] - d[0];
var t = c[1] - d[1];
var u = e[0] - f[0];
var v = e[1] - f[1];
p += this.rects[r][4] * (s * u - t * v);
q += this.rects[r][4] * (s * v + t * u);
}
this.b$["test.falstad.DiffractionFrame"].func[a][b][i] = p * p + q * q;
}
}
}
});
Clazz.overrideMethod (c$, "drawGeometricShadow", 
function (a) {
var b;
var c;
for (b = 1; b < this.blockCountX; b += 2) for (c = 0; c < this.blockCountY; c += 2) {
if (this.blocks[b - 1][c] == this.blocks[b + 1][c]) continue;
var d = Clazz.doubleToInt ((this.lineXLocations[b] + .5) * this.b$["test.falstad.DiffractionFrame"].winSize.width);
var e = 0;
var f = this.b$["test.falstad.DiffractionFrame"].winSize.height;
try {
e = Clazz.doubleToInt ((this.lineYLocations[c - 1] + .5) * this.b$["test.falstad.DiffractionFrame"].winSize.height);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
try {
f = Clazz.doubleToInt ((this.lineYLocations[c + 1] + .5) * this.b$["test.falstad.DiffractionFrame"].winSize.height);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
a.setColor (this.isSelected (b, -1) ? java.awt.Color.yellow : java.awt.Color.red);
a.drawLine (d, e, d, f);
}

for (b = 0; b < this.blockCountX; b += 2) for (c = 1; c < this.blockCountY; c += 2) {
if (this.blocks[b][c - 1] == this.blocks[b][c + 1]) continue;
var d = Clazz.doubleToInt ((this.lineYLocations[c] + .5) * this.b$["test.falstad.DiffractionFrame"].winSize.height);
var e = 0;
var f = this.b$["test.falstad.DiffractionFrame"].winSize.width;
try {
e = Clazz.doubleToInt ((this.lineXLocations[b - 1] + .5) * this.b$["test.falstad.DiffractionFrame"].winSize.width);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
try {
f = Clazz.doubleToInt ((this.lineXLocations[b + 1] + .5) * this.b$["test.falstad.DiffractionFrame"].winSize.width);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
a.setColor (this.isSelected (-1, c) ? java.awt.Color.yellow : java.awt.Color.red);
a.drawLine (e, d, f, d);
}

}, "java.awt.Graphics");
Clazz.defineMethod (c$, "isSelected", 
function (a, b) {
return this.isSelected (a, b, 0);
}, "~N,~N");
Clazz.defineMethod (c$, "isSelected", 
function (a, b, c) {
if (this.b$["test.falstad.DiffractionFrame"].selection == -1) return false;
if (this.b$["test.falstad.DiffractionFrame"].selection == a + 100 || this.b$["test.falstad.DiffractionFrame"].selection == b + 200) return true;
if (this.hasXSymmetry () && c < 1 && this.blockCountX > 3 && this.isSelected (this.blockCountX - 1 - a, b, 1)) return true;
if (this.hasYSymmetry () && c < 2 && this.blockCountY > 3 && this.isSelected (a, this.blockCountY - 1 - b, 2)) return true;
if (this.hasDiagonalSymmetry () && c < 3 && this.isSelected (b, a, 3)) return true;
return false;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "getSelection", 
function (a, b) {
var c = (a) / this.b$["test.falstad.DiffractionFrame"].winSize.width - .5;
var d = (b) / this.b$["test.falstad.DiffractionFrame"].winSize.width - .5;
var e = 3. / this.b$["test.falstad.DiffractionFrame"].winSize.width;
var f = -1;
var g;
for (g = 1; g < this.blockCountX; g += 2) {
var h = java.lang.Math.abs (this.lineXLocations[g] - c);
if (h < e) {
f = 100 + g;
e = h;
}}
for (g = 1; g < this.blockCountY; g += 2) {
var h = java.lang.Math.abs (this.lineYLocations[g] - d);
if (h < e) {
f = 200 + g;
e = h;
}}
return f;
}, "~N,~N");
Clazz.overrideMethod (c$, "drag", 
function (a, b) {
var c = (a) / this.b$["test.falstad.DiffractionFrame"].winSize.width - .5;
var d = (b) / this.b$["test.falstad.DiffractionFrame"].winSize.width - .5;
if (this.b$["test.falstad.DiffractionFrame"].selection >= 200) return this.dragLine (-1, this.b$["test.falstad.DiffractionFrame"].selection - 200, d, 0);
 else return this.dragLine (this.b$["test.falstad.DiffractionFrame"].selection - 100, -1, c, 0);
}, "~N,~N");
Clazz.overrideMethod (c$, "rezoom", 
function (a) {
var b;
for (b = 1; b < this.blockCountX; b += 2) this.lineXLocations[b] *= a;

for (b = 1; b < this.blockCountY; b += 2) this.lineYLocations[b] *= a;

}, "~N");
Clazz.defineMethod (c$, "dragLine", 
function (a, b, c, d) {
if (a != -1) {
if (this.hasXSymmetry () && this.b$["test.falstad.DiffractionFrame"].sign (this.lineXLocations[a]) != this.b$["test.falstad.DiffractionFrame"].sign (c)) return false;
if (a > 1 && c <= this.lineXLocations[a - 2]) return false;
if (a < this.blockCountX - 2 && c >= this.lineXLocations[a + 2]) return false;
}if (b != -1) {
if (this.hasYSymmetry () && this.b$["test.falstad.DiffractionFrame"].sign (this.lineYLocations[b]) != this.b$["test.falstad.DiffractionFrame"].sign (c)) return false;
if (b > 1 && c <= this.lineYLocations[b - 2]) return false;
if (b < this.blockCountY - 2 && c >= this.lineYLocations[b + 2]) return false;
}if (a != -1 && this.hasXSymmetry () && d < 1) this.dragLine (this.blockCountX - 1 - a, b, -c, 1);
if (b != -1 && this.hasYSymmetry () && d < 2) this.dragLine (a, this.blockCountY - 1 - b, -c, 2);
if (this.hasDiagonalSymmetry () && d < 3) this.dragLine (b, a, c, 3);
if (a != -1) this.lineXLocations[a] = c;
if (b != -1) this.lineYLocations[b] = c;
return true;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getDimension", 
function () {
return this.lineXLocations[this.blockCountX - 2] - this.lineXLocations[1];
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$SquareAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "SquareAperture", test.falstad.DiffractionFrame.BlockAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.BlockAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "square";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.RectangularAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasYSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasDiagonalSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
var a = .25;
this.blockCountX = this.blockCountY = 5;
this.blocks =  Clazz.newBooleanArray (this.blockCountX, this.blockCountY, false);
this.blocks[2][2] = true;
this.lineXLocations =  Clazz.newDoubleArray (this.blockCountX, 0);
this.lineYLocations =  Clazz.newDoubleArray (this.blockCountY, 0);
this.lineXLocations[1] = -a;
this.lineXLocations[3] = a;
this.lineYLocations[1] = -a;
this.lineYLocations[3] = a;
});
Clazz.overrideMethod (c$, "setupRects", 
function () {
this.rectCount = 1;
this.rects =  Clazz.newDoubleArray (1, 5, 0);
var a = this.lineXLocations[3];
this.rects[0][0] = -a;
this.rects[0][1] = -a;
this.rects[0][2] = a;
this.rects[0][3] = a;
this.rects[0][4] = .5;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$RectangularAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "RectangularAperture", test.falstad.DiffractionFrame.BlockAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.BlockAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "rectangle";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.CornerAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasYSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.blockCountX = this.blockCountY = 5;
this.blocks =  Clazz.newBooleanArray (this.blockCountX, this.blockCountY, false);
this.blocks[2][2] = true;
this.lineXLocations =  Clazz.newDoubleArray (this.blockCountX, 0);
this.lineYLocations =  Clazz.newDoubleArray (this.blockCountY, 0);
this.lineXLocations[1] = -0.25;
this.lineXLocations[3] = .25;
this.lineYLocations[1] = -0.4;
this.lineYLocations[3] = .4;
});
Clazz.overrideMethod (c$, "setupRects", 
function () {
this.rectCount = 1;
this.rects =  Clazz.newDoubleArray (1, 5, 0);
this.rects[0][0] = this.lineXLocations[1];
this.rects[0][1] = this.lineYLocations[1];
this.rects[0][2] = this.lineXLocations[3];
this.rects[0][3] = this.lineYLocations[3];
this.rects[0][4] = .5;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$CornerAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "CornerAperture", test.falstad.DiffractionFrame.BlockAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.BlockAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "corner";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.CrossAperture, this, null);
});
Clazz.overrideMethod (c$, "hasDiagonalSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.blockCountX = this.blockCountY = 3;
this.blocks =  Clazz.newBooleanArray (this.blockCountX, this.blockCountY, false);
this.blocks[2][2] = true;
this.lineXLocations =  Clazz.newDoubleArray (this.blockCountX, 0);
this.lineYLocations =  Clazz.newDoubleArray (this.blockCountY, 0);
this.lineXLocations[1] = 0;
this.lineYLocations[1] = 0;
});
Clazz.overrideMethod (c$, "setupRects", 
function () {
this.rectCount = 1;
this.rects =  Clazz.newDoubleArray (1, 5, 0);
var a = this.lineXLocations[1];
this.rects[0][0] = a;
this.rects[0][1] = a;
this.rects[0][2] = 1e8;
this.rects[0][3] = 1e8;
this.rects[0][4] = .5;
});
Clazz.overrideMethod (c$, "getDimension", 
function () {
return .5 - this.lineXLocations[1];
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$CrossAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "CrossAperture", test.falstad.DiffractionFrame.BlockAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.BlockAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "cross";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.RectanglesAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasYSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasDiagonalSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
var a = 0.0625;
this.blockCountX = this.blockCountY = 5;
this.blocks =  Clazz.newBooleanArray (this.blockCountX, this.blockCountY, false);
this.blocks[0][2] = this.blocks[2][2] = this.blocks[4][2] = this.blocks[2][0] = this.blocks[2][4] = true;
this.lineXLocations =  Clazz.newDoubleArray (this.blockCountX, 0);
this.lineYLocations =  Clazz.newDoubleArray (this.blockCountY, 0);
this.lineXLocations[1] = -a;
this.lineXLocations[3] = a;
this.lineYLocations[1] = -a;
this.lineYLocations[3] = a;
});
Clazz.overrideMethod (c$, "setupRects", 
function () {
this.rectCount = 3;
this.rects =  Clazz.newDoubleArray (3, 5, 0);
var a = this.lineXLocations[3];
this.rects[0][0] = -a;
this.rects[0][1] = -1.0E8;
this.rects[0][2] = a;
this.rects[0][3] = 1e8;
this.rects[0][4] = .5;
this.rects[1][0] = -1.0E8;
this.rects[1][1] = -a;
this.rects[1][2] = 1e8;
this.rects[1][3] = a;
this.rects[1][4] = .5;
this.rects[2][0] = -a;
this.rects[2][1] = -a;
this.rects[2][2] = a;
this.rects[2][3] = a;
this.rects[2][4] = -0.5;
});
Clazz.overrideMethod (c$, "getDimension", 
function () {
return 1;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$RectanglesAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "RectanglesAperture", test.falstad.DiffractionFrame.BlockAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.BlockAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "2 rectangles";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.FrameAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasYSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.blockCountX = 9;
this.blockCountY = 5;
this.blocks =  Clazz.newBooleanArray (this.blockCountX, this.blockCountY, false);
this.blocks[2][2] = this.blocks[6][2] = true;
this.lineXLocations =  Clazz.newDoubleArray (this.blockCountX, 0);
this.lineYLocations =  Clazz.newDoubleArray (this.blockCountY, 0);
this.lineXLocations[1] = -0.375;
this.lineXLocations[3] = -0.125;
this.lineXLocations[5] = .125;
this.lineXLocations[7] = .375;
this.lineYLocations[1] = -0.25;
this.lineYLocations[3] = .25;
});
Clazz.overrideMethod (c$, "setupRects", 
function () {
this.rectCount = 2;
this.rects =  Clazz.newDoubleArray (2, 5, 0);
var a = this.lineXLocations[1];
this.rects[0][0] = this.lineXLocations[1];
this.rects[0][1] = this.lineYLocations[1];
this.rects[0][2] = this.lineXLocations[3];
this.rects[0][3] = this.lineYLocations[3];
this.rects[0][4] = .5;
this.rects[1][0] = this.lineXLocations[5];
this.rects[1][1] = this.lineYLocations[1];
this.rects[1][2] = this.lineXLocations[7];
this.rects[1][3] = this.lineYLocations[3];
this.rects[1][4] = .5;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$FrameAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "FrameAperture", test.falstad.DiffractionFrame.BlockAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.BlockAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "frame";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.PlusAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasYSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasDiagonalSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.blockCountX = this.blockCountY = 9;
this.blocks =  Clazz.newBooleanArray (this.blockCountX, this.blockCountY, false);
var a;
for (a = 2; a <= 6; a += 2) this.blocks[a][2] = this.blocks[a][6] = this.blocks[2][a] = this.blocks[6][a] = true;

this.lineXLocations =  Clazz.newDoubleArray (this.blockCountX, 0);
this.lineYLocations =  Clazz.newDoubleArray (this.blockCountY, 0);
this.lineXLocations[1] = -0.375;
this.lineXLocations[3] = -0.125;
this.lineXLocations[5] = .125;
this.lineXLocations[7] = .375;
this.lineYLocations[1] = -0.375;
this.lineYLocations[3] = -0.125;
this.lineYLocations[5] = .125;
this.lineYLocations[7] = .375;
});
Clazz.overrideMethod (c$, "setupRects", 
function () {
this.rectCount = 2;
this.rects =  Clazz.newDoubleArray (2, 5, 0);
this.rects[0][0] = this.lineXLocations[1];
this.rects[0][1] = this.lineYLocations[1];
this.rects[0][2] = this.lineXLocations[7];
this.rects[0][3] = this.lineYLocations[7];
this.rects[0][4] = .5;
this.rects[1][0] = this.lineXLocations[3];
this.rects[1][1] = this.lineYLocations[3];
this.rects[1][2] = this.lineXLocations[5];
this.rects[1][3] = this.lineYLocations[5];
this.rects[1][4] = -0.5;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$PlusAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "PlusAperture", test.falstad.DiffractionFrame.BlockAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.BlockAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "plus";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.IntersectingSquaresAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasYSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasDiagonalSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.blockCountX = this.blockCountY = 9;
this.blocks =  Clazz.newBooleanArray (this.blockCountX, this.blockCountY, false);
var a;
for (a = 2; a <= 6; a += 2) this.blocks[a][4] = this.blocks[4][a] = true;

this.lineXLocations =  Clazz.newDoubleArray (this.blockCountX, 0);
this.lineYLocations =  Clazz.newDoubleArray (this.blockCountY, 0);
this.lineXLocations[1] = -0.375;
this.lineXLocations[3] = -0.125;
this.lineXLocations[5] = .125;
this.lineXLocations[7] = .375;
this.lineYLocations[1] = -0.375;
this.lineYLocations[3] = -0.125;
this.lineYLocations[5] = .125;
this.lineYLocations[7] = .375;
});
Clazz.overrideMethod (c$, "setupRects", 
function () {
this.rectCount = 3;
this.rects =  Clazz.newDoubleArray (3, 5, 0);
this.rects[0][0] = this.lineXLocations[1];
this.rects[0][1] = this.lineYLocations[3];
this.rects[0][2] = this.lineXLocations[7];
this.rects[0][3] = this.lineYLocations[5];
this.rects[0][4] = .5;
this.rects[1][0] = this.lineXLocations[3];
this.rects[1][1] = this.lineYLocations[1];
this.rects[1][2] = this.lineXLocations[5];
this.rects[1][3] = this.lineYLocations[7];
this.rects[1][4] = .5;
this.rects[2][0] = this.lineXLocations[3];
this.rects[2][1] = this.lineYLocations[3];
this.rects[2][2] = this.lineXLocations[5];
this.rects[2][3] = this.lineYLocations[5];
this.rects[2][4] = -0.5;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$IntersectingSquaresAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "IntersectingSquaresAperture", test.falstad.DiffractionFrame.BlockAperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.BlockAperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "2 squares";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.DoubleCircleAperture, this, null);
});
Clazz.overrideMethod (c$, "hasDiagonalSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.blockCountX = this.blockCountY = 9;
this.blocks =  Clazz.newBooleanArray (this.blockCountX, this.blockCountY, false);
var a;
for (a = 2; a <= 6; a += 2) this.blocks[a][4] = this.blocks[4][a] = true;

this.blocks[2][2] = this.blocks[6][6] = true;
this.lineXLocations =  Clazz.newDoubleArray (this.blockCountX, 0);
this.lineYLocations =  Clazz.newDoubleArray (this.blockCountY, 0);
this.lineXLocations[1] = -0.375;
this.lineXLocations[3] = -0.125;
this.lineXLocations[5] = .125;
this.lineXLocations[7] = .375;
this.lineYLocations[1] = -0.375;
this.lineYLocations[3] = -0.125;
this.lineYLocations[5] = .125;
this.lineYLocations[7] = .375;
});
Clazz.overrideMethod (c$, "setupRects", 
function () {
this.rectCount = 3;
this.rects =  Clazz.newDoubleArray (3, 5, 0);
this.rects[0][0] = this.lineXLocations[1];
this.rects[0][1] = this.lineYLocations[1];
this.rects[0][2] = this.lineXLocations[5];
this.rects[0][3] = this.lineYLocations[5];
this.rects[0][4] = .5;
this.rects[1][0] = this.lineXLocations[3];
this.rects[1][1] = this.lineYLocations[3];
this.rects[1][2] = this.lineXLocations[7];
this.rects[1][3] = this.lineYLocations[7];
this.rects[1][4] = .5;
this.rects[2][0] = this.lineXLocations[3];
this.rects[2][1] = this.lineYLocations[3];
this.rects[2][2] = this.lineXLocations[5];
this.rects[2][3] = this.lineYLocations[5];
this.rects[2][4] = -0.5;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$DoubleCircleAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.radius = 0;
this.offset = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "DoubleCircleAperture", test.falstad.DiffractionFrame.Aperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.Aperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "2 circles";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.RingAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasYSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.radius = .3;
this.offset = .25;
});
Clazz.overrideMethod (c$, "getDimension", 
function () {
return (this.radius + this.offset) * 2;
});
Clazz.overrideMethod (c$, "compute", 
function () {
var a;
var b;
var c =  Clazz.newDoubleArray (4, 0);
var d = this.offset;
var e = 0;
var f = (this.offset < this.radius);
if (f) {
e = java.lang.Math.sqrt (this.radius * this.radius - this.offset * this.offset);
var g = this.radius - 2 * this.offset;
if (g > 0) d = this.offset + g;
}for (a = 0; a != Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].gridSizeX / 2); a++) {
for (b = 0; b != Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].gridSizeY / 2); b++) {
this.b$["test.falstad.DiffractionFrame"].clearAccum ();
var g = (a / this.b$["test.falstad.DiffractionFrame"].gridSizeX) - .5;
var h = (b / this.b$["test.falstad.DiffractionFrame"].gridSizeY) - .5;
var i;
var j = -g + this.offset;
var k = -g - this.offset;
var l = -h;
var m = j * j + l * l;
var n = k * k + l * l;
var o = this.radius * this.radius;
var p = m - o;
var q = n - o;
var r = p * 4;
var s = q * 4;
var t = 0;
var u = 6.283185307179586;
var v = Clazz.doubleToInt ((t * this.b$["test.falstad.DiffractionFrame"].angleSteps) / 6.283185307179586);
var w = Clazz.doubleToInt ((u * this.b$["test.falstad.DiffractionFrame"].angleSteps) / 6.283185307179586);
while (v < 0) {
v += this.b$["test.falstad.DiffractionFrame"].angleSteps;
w += this.b$["test.falstad.DiffractionFrame"].angleSteps;
}
var x = p < 0 || q < 0;
this.b$["test.falstad.DiffractionFrame"].apertureStartOrigin (x);
for (i = v; i < w; i++) {
var y = this.b$["test.falstad.DiffractionFrame"].angcos1[i & this.b$["test.falstad.DiffractionFrame"].angleStepsMask];
var z = this.b$["test.falstad.DiffractionFrame"].angsin1[i & this.b$["test.falstad.DiffractionFrame"].angleStepsMask];
var A = -2 * (y * j + z * l);
var B = -2 * (y * k + z * l);
var C = A * A - r;
var D = B * B - s;
if (C < 0 && D < 0) continue;
var E = 0;
if (C >= 0) {
C = java.lang.Math.sqrt (C);
c[E++] = .5 * (-A - C);
c[E++] = .5 * (-A + C);
}if (D >= 0) {
D = java.lang.Math.sqrt (D);
c[E++] = .5 * (-B - D);
c[E++] = .5 * (-B + D);
}var F;
var G;
for (F = 1; F < E; F++) {
var H = c[F];
G = F;
while (c[G - 1] > H) {
c[G] = c[G - 1];
G--;
if (G <= 0) break;
}
c[G] = H;
}
var H = x;
for (F = 0; F != E; F++) {
var I = c[F];
if (I < 0) continue;
var J = g + y * I;
var K = h + z * I;
if (f && J > -d && J < d && K > -e && K < e) {
var L = K * K;
if ((J - this.offset) * (J - this.offset) + L < o || (J + this.offset) * (J + this.offset) + L < o) continue;
}if (!H) {
this.b$["test.falstad.DiffractionFrame"].apertureStart (c[F]);
H = true;
} else {
this.b$["test.falstad.DiffractionFrame"].apertureStop (c[F]);
H = false;
}}
}
this.b$["test.falstad.DiffractionFrame"].setFunction (a, b);
}
}
});
Clazz.overrideMethod (c$, "drawGeometricShadow", 
function (a) {
var b = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width * this.radius);
var c = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width * this.offset);
if (this.b$["test.falstad.DiffractionFrame"].selection != -1) {
a.setColor (this.b$["test.falstad.DiffractionFrame"].selection == 0 ? java.awt.Color.yellow : java.awt.Color.red);
var d = 5;
a.fillOval (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - c - d, Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - d, d * 2, d * 2);
a.fillOval (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) + c - d, Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - d, d * 2, d * 2);
}a.setColor (this.b$["test.falstad.DiffractionFrame"].selection > 0 ? java.awt.Color.yellow : java.awt.Color.red);
var d = 0;
if (this.offset < this.radius) d = Clazz.doubleToInt (java.lang.Math.acos (this.offset / this.radius) * (57.29577951308232));
a.drawArc (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - b - c, Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b, b * 2, b * 2, d, 360 - 2 * d);
a.drawArc (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - b + c, Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b, b * 2, b * 2, 180 + d, 360 - 2 * d);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getSelection", 
function (a, b) {
var c = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width * this.offset);
var d = (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - c) - a;
var e = (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) + c) - a;
var f = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b;
var g = java.lang.Math.sqrt (d * d + f * f) / this.b$["test.falstad.DiffractionFrame"].winSize.width;
if (java.lang.Math.abs (g - this.radius) < 5. / this.b$["test.falstad.DiffractionFrame"].winSize.width) return 1;
if (g < 5. / this.b$["test.falstad.DiffractionFrame"].winSize.width) return 0;
g = java.lang.Math.sqrt (e * e + f * f) / this.b$["test.falstad.DiffractionFrame"].winSize.width;
if (java.lang.Math.abs (g - this.radius) < 5. / this.b$["test.falstad.DiffractionFrame"].winSize.width) return 2;
if (g < 5. / this.b$["test.falstad.DiffractionFrame"].winSize.width) return 0;
return -1;
}, "~N,~N");
Clazz.overrideMethod (c$, "drag", 
function (a, b) {
if (this.b$["test.falstad.DiffractionFrame"].selection == 0) {
var c = (a) / this.b$["test.falstad.DiffractionFrame"].winSize.width - .5;
var d = java.lang.Math.abs (c);
if (d == this.offset) return false;
this.offset = d;
return true;
}var c = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width * this.offset);
var d = (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - c) - a;
var e = (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) + c) - a;
var f = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b;
var g;
if (this.b$["test.falstad.DiffractionFrame"].selection == 2) g = e * e;
 else g = d * d;
var h = java.lang.Math.sqrt (g + f * f) / this.b$["test.falstad.DiffractionFrame"].winSize.width;
if (h == this.radius) return false;
this.radius = h;
return true;
}, "~N,~N");
Clazz.overrideMethod (c$, "rezoom", 
function (a) {
this.radius *= a;
this.offset *= a;
}, "~N");
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$RingAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.radius1 = 0;
this.radius2 = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "RingAperture", test.falstad.DiffractionFrame.Aperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.Aperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "ring";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.DiffractionFrame.HalfCircleAperture, this, null);
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasYSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasDiagonalSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.radius1 = .15;
this.radius2 = .25;
});
Clazz.overrideMethod (c$, "rezoom", 
function (a) {
this.radius1 *= a;
this.radius2 *= a;
}, "~N");
Clazz.overrideMethod (c$, "compute", 
function () {
var a;
var b;
for (a = 0; a != Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].gridSizeX / 2); a++) {
for (b = 0; b <= a; b++) {
this.b$["test.falstad.DiffractionFrame"].clearAccum ();
var c = (a / this.b$["test.falstad.DiffractionFrame"].gridSizeX) - .5;
var d = (b / this.b$["test.falstad.DiffractionFrame"].gridSizeY) - .5;
var e;
var f = -c;
var g = -d;
var h = f * f + g * g;
var i = this.radius2;
var j = h - i * i;
var k = j * 4;
var l = h - this.radius1 * this.radius1;
var m = l * 4;
var n = 0;
if (j <= 0) {
} else {
var o = java.lang.Math.atan2 (g, f);
n = Clazz.doubleToInt ((o * this.b$["test.falstad.DiffractionFrame"].angleSteps) / 6.283185307179586);
}var o = 1;
for (e = n; e != n + this.b$["test.falstad.DiffractionFrame"].angleSteps; e += o) {
var p = this.b$["test.falstad.DiffractionFrame"].angcos1[e & this.b$["test.falstad.DiffractionFrame"].angleStepsMask];
var q = this.b$["test.falstad.DiffractionFrame"].angsin1[e & this.b$["test.falstad.DiffractionFrame"].angleStepsMask];
var r = -2 * (p * f + q * g);
var s = r * r - k;
var t = r * r - m;
if (s < 0 && t < 0) {
if (o == -1) break;
o = -1;
e = n;
continue;
}var u = java.lang.Math.sqrt (t);
var v = .5 * (-r - u);
var w = .5 * (-r + u);
u = java.lang.Math.sqrt (s);
var x = .5 * (-r - u);
var y = .5 * (-r + u);
if (x > 0) this.b$["test.falstad.DiffractionFrame"].apertureStart (x);
if (v > 0) this.b$["test.falstad.DiffractionFrame"].apertureStop (v);
if (w > 0) this.b$["test.falstad.DiffractionFrame"].apertureStart (w);
if (y > 0) this.b$["test.falstad.DiffractionFrame"].apertureStop (y);
}
this.b$["test.falstad.DiffractionFrame"].apertureStartOrigin (j < 0 && l >= 0);
this.b$["test.falstad.DiffractionFrame"].setFunction (a, b);
}
}
});
Clazz.overrideMethod (c$, "drawGeometricShadow", 
function (a) {
if (this.b$["test.falstad.DiffractionFrame"].selection == 1) a.setColor (java.awt.Color.yellow);
var b = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width * this.radius1);
a.drawOval (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - b, Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b, b * 2, b * 2);
a.setColor (java.awt.Color.red);
if (this.b$["test.falstad.DiffractionFrame"].selection == 2) a.setColor (java.awt.Color.yellow);
b = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width * this.radius2);
a.drawOval (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - b, Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b, b * 2, b * 2);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getSelection", 
function (a, b) {
var c = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - a;
var d = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b;
var e = java.lang.Math.sqrt (c * c + d * d) / this.b$["test.falstad.DiffractionFrame"].winSize.width;
return (java.lang.Math.abs (e - this.radius1) < 5. / this.b$["test.falstad.DiffractionFrame"].winSize.width) ? 1 : (java.lang.Math.abs (e - this.radius2) < 5. / this.b$["test.falstad.DiffractionFrame"].winSize.width) ? 2 : -1;
}, "~N,~N");
Clazz.overrideMethod (c$, "drag", 
function (a, b) {
var c = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - a;
var d = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b;
var e = java.lang.Math.sqrt (c * c + d * d) / this.b$["test.falstad.DiffractionFrame"].winSize.width;
if (this.b$["test.falstad.DiffractionFrame"].selection == 1) {
if (e == this.radius1 || e >= this.radius2) return false;
this.radius1 = e;
} else {
if (e == this.radius2 || e <= this.radius1) return false;
this.radius2 = e;
}return true;
}, "~N,~N");
Clazz.overrideMethod (c$, "getDimension", 
function () {
return this.radius2 * 2;
});
c$ = Clazz.p0p ();
};
c$.$DiffractionFrame$HalfCircleAperture$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.radius = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.DiffractionFrame, "HalfCircleAperture", test.falstad.DiffractionFrame.Aperture, null, Clazz.innerTypeInstance (test.falstad.DiffractionFrame.Aperture, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "half circle";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return null;
});
Clazz.overrideMethod (c$, "hasXSymmetry", 
function () {
return false;
});
Clazz.overrideMethod (c$, "hasYSymmetry", 
function () {
return true;
});
Clazz.overrideMethod (c$, "hasDiagonalSymmetry", 
function () {
return false;
});
Clazz.overrideMethod (c$, "setToDefaults", 
function () {
this.radius = .25;
});
Clazz.overrideMethod (c$, "rezoom", 
function (a) {
this.radius *= a;
}, "~N");
Clazz.overrideMethod (c$, "compute", 
function () {
var a;
var b;
for (a = 0; a != this.b$["test.falstad.DiffractionFrame"].gridSizeX; a++) {
for (b = 0; b != Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].gridSizeY / 2); b++) {
this.b$["test.falstad.DiffractionFrame"].clearAccum ();
var c = ((a + .25) / this.b$["test.falstad.DiffractionFrame"].gridSizeX) - .5;
var d = (b / this.b$["test.falstad.DiffractionFrame"].gridSizeY) - .5;
var e;
var f = -c;
var g = -d;
var h = f * f + g * g;
var i = this.radius;
var j = h - i * i;
var k = j * 4;
var l = 0;
if (j <= 0) {
} else {
var m = java.lang.Math.atan2 (g, f);
l = Clazz.doubleToInt ((m * this.b$["test.falstad.DiffractionFrame"].angleSteps) / 6.283185307179586);
}var m = 1;
for (e = l; e != l + this.b$["test.falstad.DiffractionFrame"].angleSteps; e += m) {
var n = this.b$["test.falstad.DiffractionFrame"].angcos1[e & this.b$["test.falstad.DiffractionFrame"].angleStepsMask];
var o = this.b$["test.falstad.DiffractionFrame"].angsin1[e & this.b$["test.falstad.DiffractionFrame"].angleStepsMask];
var p = -2 * (n * f + o * g);
var q = p * p - k;
if (q < 0) {
if (m == -1) break;
m = -1;
e = l;
continue;
}var r = -c / n;
q = java.lang.Math.sqrt (q);
var s = .5 * (-p - q);
var t = .5 * (-p + q);
if (c + s * n < 0) s = r;
if (c + t * n < 0) {
t = r;
if (s == r) {
if (m == -1) break;
m = -1;
e = l;
continue;
}}if (s < 0 && t < 0) continue;
if (s > 0) this.b$["test.falstad.DiffractionFrame"].apertureStart (s);
this.b$["test.falstad.DiffractionFrame"].apertureStop (t);
}
this.b$["test.falstad.DiffractionFrame"].apertureStartOrigin (j < 0 && c >= 0);
this.b$["test.falstad.DiffractionFrame"].setFunction (a, b);
}
}
});
Clazz.overrideMethod (c$, "drawGeometricShadow", 
function (a) {
if (this.b$["test.falstad.DiffractionFrame"].selection == 1) a.setColor (java.awt.Color.yellow);
var b = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width * this.radius);
a.drawArc (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - b, Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b, b * 2, b * 2, -90, 180);
a.drawLine (Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2), Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b, Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2), Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) + b);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getSelection", 
function (a, b) {
if (a < 0) return -1;
var c = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - a;
var d = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b;
var e = java.lang.Math.sqrt (c * c + d * d) / this.b$["test.falstad.DiffractionFrame"].winSize.width;
return (java.lang.Math.abs (e - this.radius) < 5. / this.b$["test.falstad.DiffractionFrame"].winSize.width) ? 1 : -1;
}, "~N,~N");
Clazz.overrideMethod (c$, "drag", 
function (a, b) {
var c = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.width / 2) - a;
var d = Clazz.doubleToInt (this.b$["test.falstad.DiffractionFrame"].winSize.height / 2) - b;
var e = java.lang.Math.sqrt (c * c + d * d) / this.b$["test.falstad.DiffractionFrame"].winSize.width;
if (e == this.radius) return false;
this.radius = e;
return true;
}, "~N,~N");
Clazz.overrideMethod (c$, "getDimension", 
function () {
return this.radius * 2;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"pi", 3.14159265358979323846,
"pi2", 6.283185307179586,
"fixedPoint", 256,
"sn", [-2991.8191940101983, 7.08840045257738576863E5, -6.297414862058625E7, 2.54890880573376359104E9, -4.429795180596978E10, 3.18016297876567817986E11],
"sd", [2.81376268889994315696E2, 4.55847810806532581675E4, 5.17343888770096400730E6, 4.19320245898111231129E8, 2.24411795645340920940E10, 6.07366389490084639049E11],
"cn", [-4.9884311457357354E-8, 9.50428062829859605134E-6, -6.451914356839651E-4, 1.88843319396703850064E-2, -0.20552590095501388, 9.99999999999999998822E-1],
"cd", [3.99982968972495980367E-12, 9.15439215774657478799E-10, 1.25001862479598821474E-7, 1.22262789024179030997E-5, 8.68029542941784300606E-4, 4.12142090722199792936E-2, 1.00000000000000000118E0],
"fn", [4.21543555043677546506E-1, 1.43407919780758885261E-1, 1.15220955073585758835E-2, 3.45017939782574027900E-4, 4.63613749287867322088E-6, 3.05568983790257605827E-8, 1.02304514164907233465E-10, 1.72010743268161828879E-13, 1.34283276233062758925E-16, 3.76329711269987889006E-20],
"fd", [7.51586398353378947175E-1, 1.16888925859191382142E-1, 6.44051526508858611005E-3, 1.55934409164153020873E-4, 1.84627567348930545870E-6, 1.12699224763999035261E-8, 3.60140029589371370404E-11, 5.88754533621578410010E-14, 4.52001434074129701496E-17, 1.25443237090011264384E-20],
"gn", [5.04442073643383265887E-1, 1.97102833525523411709E-1, 1.87648584092575249293E-2, 6.84079380915393090172E-4, 1.15138826111884280931E-5, 9.82852443688422223854E-8, 4.45344415861750144738E-10, 1.08268041139020870318E-12, 1.37555460633261799868E-15, 8.36354435630677421531E-19, 1.86958710162783235106E-22],
"gd", [1.47495759925128324529E0, 3.37748989120019970451E-1, 2.53603741420338795122E-2, 8.14679107184306179049E-4, 1.27545075667729118702E-5, 1.04314589657571990585E-7, 4.60680728146520428211E-10, 1.10273215066240270757E-12, 1.38796531259578871258E-15, 8.39158816283118707363E-19, 1.86958710162783236342E-22],
"PI", 3.141592653589793,
"PIBYTWO", 1.5707963267948966);
});
