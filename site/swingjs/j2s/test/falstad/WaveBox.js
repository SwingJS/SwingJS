Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.WaveBoxCanvas", "$.WaveBoxLayout", "$.WaveBoxFrame", "$.WaveBox"], ["java.awt.Color", "$.Dimension", "$.Rectangle", "java.awt.image.MemoryImageSource", "java.lang.Double", "java.util.Random", "$.Vector", "swingjs.awt.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "WaveBoxCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.WaveBoxCanvas, []);
this.pg = p;
}, "test.falstad.WaveBoxFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateWaveBox (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paint", 
function (g) {
this.pg.updateWaveBox (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "WaveBoxLayout", null, java.awt.LayoutManager);
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
return  new java.awt.Dimension (500, 500);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (target) {
return  new java.awt.Dimension (100, 100);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (target) {
var barwidth = 0;
var i;
for (i = 1; i < target.getComponentCount (); i++) {
var m = target.getComponent (i);
if (m.isVisible ()) {
var d = m.getPreferredSize ();
if (d.width > barwidth) barwidth = d.width;
}}
var insets = target.getInsets ();
var targetw = target.getSize ().width - insets.left - insets.right;
var cw = targetw - barwidth;
var targeth = target.getSize ().height - (insets.top + insets.bottom);
target.getComponent (0).setLocation (insets.left, insets.top);
target.getComponent (0).setSize (cw, targeth);
cw += insets.left;
var h = insets.top;
for (i = 1; i < target.getComponentCount (); i++) {
var m = target.getComponent (i);
if (m.isVisible ()) {
var d = m.getPreferredSize ();
if (d.width >= 0 && d.height >= 0) {
if (Clazz.instanceOf (m, swingjs.awt.Scrollbar)) d.width = barwidth;
if (Clazz.instanceOf (m, swingjs.awt.Label)) {
h += Clazz.doubleToInt (d.height / 5);
d.width = barwidth;
}m.setLocation (cw, h);
m.setSize (d.width, d.height);
h += d.height;
}}}
}, "java.awt.Container");
c$ = Clazz.decorateAsClass (function () {
this.started = false;
Clazz.instantialize (this, arguments);
}, test.falstad, "WaveBox", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.WaveBox.ogf != null) test.falstad.WaveBox.ogf.dispose ();
test.falstad.WaveBox.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
{
}test.falstad.WaveBox.ogf =  new test.falstad.WaveBoxFrame (null);
test.falstad.WaveBox.ogf.initFrame ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.WaveBox.ogf == null) {
this.started = true;
test.falstad.WaveBox.ogf =  new test.falstad.WaveBoxFrame (this);
test.falstad.WaveBox.ogf.initFrame ();
this.repaint ();
}});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.WaveBox.ogf == null) s = "Applet is finished.";
 else if (test.falstad.WaveBox.ogf.useFrame) test.falstad.WaveBox.ogf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.WaveBox, "paint", [g]);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "componentHidden", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentMoved", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentShown", 
function (e) {
this.showFrame ();
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentResized", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "destroy", 
function () {
if (test.falstad.WaveBox.ogf != null) test.falstad.WaveBox.ogf.dispose ();
test.falstad.WaveBox.ogf = null;
this.repaint ();
});
Clazz.defineStatics (c$,
"ogf", null);
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.memimage = null;
this.imageSource = null;
this.random = null;
this.gridSizeX = 200;
this.gridSizeY = 200;
this.finished = null;
this.useFrame = false;
this.showControls = false;
this.adjustResolution = true;
this.stoppedCheck = null;
this.intensityCheck = null;
this.sidesCheck = null;
this.modeChooser = null;
this.sliceChooser = null;
this.speedBar = null;
this.resolutionBar = null;
this.brightnessBar = null;
this.freqBar = null;
this.aux1Bar = null;
this.aux2Bar = null;
this.aux3Bar = null;
this.sampleBar = null;
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.AuxBar")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$AuxBar$ ();
}
this.auxBars = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.dragZoomStart = 0;
this.zoom = 7.5;
this.rotmatrix = null;
this.view3d = null;
this.colorMult = 0;
this.xpoints = null;
this.ypoints = null;
this.spectrum = null;
this.func = null;
this.boxwidth = 2;
this.boxheight = 2;
this.resadj = 0;
this.dragging = false;
this.pixels = null;
this.maxTerms = 16;
this.pause = 0;
this.selection = -1;
this.slicerPoints = null;
this.sliceFaces = null;
this.sliceFace = null;
this.sliceFaceCount = 0;
this.sliceval = 0;
this.sampleCount = 15;
this.sampleMult = null;
this.selectedSlice = false;
this.needsPrecompute = false;
this.magDragStart = 0;
this.cost1 = 0;
this.cost2 = 0;
this.sint1 = 0;
this.sint2 = 0;
this.dragX = 0;
this.dragY = 0;
this.oldDragX = 0;
this.oldDragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.t = 0;
this.cv = null;
this.applet = null;
this.useBufferedImage = false;
this.main = null;
this.shown = false;
this.lastTime = 0;
this.logep2 = 0;
this.resBarValue = 0;
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.Setup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.SingleSourceSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$SingleSourceSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.PinholeSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$PinholeSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.TwoSourcesSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$TwoSourcesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.DipoleSourceSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$DipoleSourceSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.LateralQuadrupoleSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$LateralQuadrupoleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.LinearQuadrupoleSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$LinearQuadrupoleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.TwoPinholesSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$TwoPinholesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.SingleLineSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$SingleLineSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.SingleSlitSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$SingleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.DoubleLineSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$DoubleLineSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.DoubleSlitSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$DoubleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.TripleSlitSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$TripleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.PlaneWaveSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$PlaneWaveSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.WaveBoxFrame.TwoPlaneWavesSetup")) {
test.falstad.WaveBoxFrame.$WaveBoxFrame$TwoPlaneWavesSetup$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "WaveBoxFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "WaveBox by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.WaveBoxFrame, ["3D Wave Applet v1.5a"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.WaveBox");
Clazz.defineMethod (c$, "initFrame", 
function () {
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
if (this.useFrame) {
this.main = this;
} else this.main = this.applet;
this.setupList =  new java.util.Vector ();
var s = Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.SingleSourceSetup, this, null);
while (s != null) {
this.setupList.addElement (s);
s = s.createNext ();
}
var jv = System.getProperty ("java.class.version");
var jvf =  new Double (jv).doubleValue ();
if (jvf >= 48) this.useBufferedImage = true;
this.main.setLayout ( new test.falstad.WaveBoxLayout ());
this.cv =  new test.falstad.WaveBoxCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
if (this.showControls) this.main.add (this.cv);
if (this.showControls) this.main.add ( new swingjs.awt.Label ("Setup:", 0));
this.setupChooser =  new swingjs.awt.Choice ();
var i;
for (i = 0; i != this.setupList.size (); i++) this.setupChooser.add ((this.setupList.elementAt (i)).getName ());

if (this.showControls) this.main.add (this.setupChooser);
this.setupChooser.addItemListener (this);
this.setup = this.setupList.elementAt (2);
this.setupChooser.select (2);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
if (this.showControls) this.main.add (this.stoppedCheck);
this.intensityCheck =  new swingjs.awt.Checkbox ("Show Intensity");
this.intensityCheck.addItemListener (this);
if (this.showControls) this.main.add (this.intensityCheck);
this.sidesCheck =  new swingjs.awt.Checkbox ("Show Sides");
this.sidesCheck.addItemListener (this);
if (this.showControls) this.main.add (this.sidesCheck);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Adjust Angle");
this.modeChooser.add ("Mouse = Adjust Zoom");
this.modeChooser.addItemListener (this);
if (this.showControls) this.main.add (this.modeChooser);
this.sliceChooser =  new swingjs.awt.Choice ();
this.sliceChooser.add ("No Slicing");
this.sliceChooser.add ("Show X Slice");
this.sliceChooser.add ("Show Y Slice");
this.sliceChooser.add ("Show Z Slice");
this.sliceChooser.addItemListener (this);
if (this.showControls) this.main.add (this.sliceChooser);
if (this.showControls) {
this.main.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.main.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 15, 1, 1, 200));
}this.speedBar.addAdjustmentListener (this);
if (this.showControls) {
this.main.add ( new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 240, 1, 1, 2000));
}this.brightnessBar.addAdjustmentListener (this);
if (this.showControls) {
this.main.add ( new swingjs.awt.Label ("Image Resolution", 0));
this.main.add (this.resolutionBar =  new swingjs.awt.Scrollbar (0, 100, 2, 20, 240));
}this.resolutionBar.addAdjustmentListener (this);
if (this.showControls) {
this.main.add ( new swingjs.awt.Label ("Frequency", 0));
this.main.add (this.freqBar =  new swingjs.awt.Scrollbar (0, 24, 1, 5, 60));
}this.freqBar.addAdjustmentListener (this);
var lb;
this.auxBars =  new Array (3);
lb =  new swingjs.awt.Label ("Aux 1", 0);
if (this.showControls) {
this.main.add (lb);
this.main.add (this.aux1Bar =  new swingjs.awt.Scrollbar (0, 10, 1, 0, 100));
}this.aux1Bar.addAdjustmentListener (this);
this.auxBars[0] = Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.AuxBar, this, null, lb, this.aux1Bar);
lb =  new swingjs.awt.Label ("Aux 2", 0);
if (this.showControls) {
this.main.add (lb);
this.main.add (this.aux2Bar =  new swingjs.awt.Scrollbar (0, 0, 1, 0, 100));
}this.aux2Bar.addAdjustmentListener (this);
this.auxBars[1] = Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.AuxBar, this, null, lb, this.aux2Bar);
if (this.showControls) {
this.main.add (lb =  new swingjs.awt.Label ("Aux 3", 0));
this.main.add (this.aux3Bar =  new swingjs.awt.Scrollbar (0, 0, 1, 0, 100));
}this.aux3Bar.addAdjustmentListener (this);
this.auxBars[2] = Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.AuxBar, this, null, lb, this.aux3Bar);
this.hideBars ();
this.main.add ( new swingjs.awt.Label ("http://www.falstad.com", 0));
try {
var param;
param = this.applet.getParameter ("setup");
if (param != null) this.setupChooser.select (Integer.parseInt (param));
param = this.applet.getParameter ("setupClass");
if (param != null) {
for (i = 0; i != this.setupList.size (); i++) {
if (this.setupList.elementAt (i).getClass ().getName ().equalsIgnoreCase ("RippleFrame$" + param)) break;
}
if (i != this.setupList.size ()) this.setupChooser.select (i);
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (this.applet != null) e.printStackTrace ();
} else {
throw e;
}
}
this.slicerPoints =  Clazz.newIntArray (2, 10, 0);
this.sliceFaces =  Clazz.newDoubleArray (4, 3, 0);
this.rotmatrix =  Clazz.newDoubleArray (9, 0);
this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.xpoints =  Clazz.newIntArray (4, 0);
this.ypoints =  Clazz.newIntArray (4, 0);
this.setupSimpson ();
this.setup.select ();
this.random =  new java.util.Random ();
this.reinit ();
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (java.awt.Color.white);
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
}this.main.requestFocus ();
});
Clazz.defineMethod (c$, "setupSimpson", 
function () {
this.sampleCount = 23;
this.sampleMult =  Clazz.newIntArray (this.sampleCount, 0);
var i;
for (i = 1; i < this.sampleCount; i += 2) {
this.sampleMult[i] = 4;
this.sampleMult[i + 1] = 2;
}
this.sampleMult[0] = this.sampleMult[this.sampleCount - 1] = 1;
});
Clazz.defineMethod (c$, "triggerShow", 
function () {
if (!this.shown) this.setVisible (true);
this.shown = true;
});
Clazz.defineMethod (c$, "handleResize", 
function () {
this.reinit ();
});
Clazz.defineMethod (c$, "reinit", 
function () {
this.setMaxTerms ();
var d = this.winSize = this.cv.getSize ();
if (this.winSize.width == 0) return;
this.dbimage = this.createImage (d.width, d.height);
this.setupDisplay ();
this.pixels = null;
if (this.useBufferedImage) {
try {
var biclass = Clazz._4Name ("java.awt.image.BufferedImage");
var dbiclass = Clazz._4Name ("java.awt.image.DataBufferInt");
var rasclass = Clazz._4Name ("java.awt.image.Raster");
var cstr = biclass.getConstructor ([Number, Number, Number]);
this.memimage = cstr.newInstance ([ new Integer (this.view3d.width),  new Integer (this.view3d.height),  new Integer (1)]);
var m = biclass.getMethod ("getRaster", null);
var ras = m.invoke (this.memimage, null);
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
this.pixels =  Clazz.newIntArray (this.view3d.width * this.view3d.height, 0);
var i;
for (i = 0; i != this.view3d.width * this.view3d.height; i++) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (this.view3d.width, this.view3d.height, this.pixels, 0, this.view3d.width);
this.imageSource.setAnimated (true);
this.imageSource.setFullBufferUpdates (true);
this.memimage = this.cv.createImage (this.imageSource);
}});
Clazz.defineMethod (c$, "getTermWidth", 
function () {
return 8;
});
Clazz.defineMethod (c$, "rotate", 
function (angle1, angle2) {
var r1cos = Math.cos (angle1);
var r1sin = Math.sin (angle1);
var r2cos = Math.cos (angle2);
var r2sin = Math.sin (angle2);
var rotm2 =  Clazz.newDoubleArray (9, 0);
rotm2[0] = r1cos;
rotm2[1] = -r1sin * r2sin;
rotm2[2] = r2cos * r1sin;
rotm2[3] = 0;
rotm2[4] = r2cos;
rotm2[5] = r2sin;
rotm2[6] = -r1sin;
rotm2[7] = -r1cos * r2sin;
rotm2[8] = r1cos * r2cos;
var rotm1 = this.rotmatrix;
this.rotmatrix =  Clazz.newDoubleArray (9, 0);
var i;
var j;
var k;
for (j = 0; j != 3; j++) for (i = 0; i != 3; i++) {
var v = 0;
for (k = 0; k != 3; k++) v += rotm1[k + j * 3] * rotm2[i + k * 3];

this.rotmatrix[i + j * 3] = v;
}

}, "~N,~N");
Clazz.defineMethod (c$, "max", 
function (a, b) {
return a > b ? a : b;
}, "~N,~N");
Clazz.defineMethod (c$, "min", 
function (a, b) {
return a < b ? a : b;
}, "~N,~N");
Clazz.defineMethod (c$, "setMaxTerms", 
function () {
this.gridSizeX = this.gridSizeY = (this.resolutionBar.getValue () & -2);
this.maxTerms = this.gridSizeX;
this.resadj = 50. / this.maxTerms;
this.needsPrecompute = true;
});
Clazz.defineMethod (c$, "setupBar", 
function (n, text, val) {
this.auxBars[n].label.setText (text);
this.auxBars[n].label.setVisible (true);
this.auxBars[n].bar.setValue (val);
this.auxBars[n].bar.setVisible (true);
}, "~N,~S,~N");
Clazz.defineMethod (c$, "setupDisplay", 
function () {
this.view3d =  new java.awt.Rectangle (0, 0, this.winSize.width, this.winSize.height);
});
Clazz.defineMethod (c$, "computeFunction", 
function () {
var i;
var j;
var q = 3.14159265 / this.maxTerms;
this.cost1 = Math.cos (this.t);
this.sint1 = Math.sin (this.t);
this.cost2 = Math.cos (this.t + this.setup.getPhaseShift ());
this.sint2 = Math.sin (this.t + this.setup.getPhaseShift ());
var shiftcos = Math.cos (this.setup.getPhaseShift ());
var shiftsin = Math.sin (this.setup.getPhaseShift ());
var izoom = 1 / this.zoom;
var rotm = this.rotmatrix;
var boxhalfwidth = this.boxwidth / 2;
var boxhalfheight = this.boxheight / 2;
var aratio = this.view3d.width / this.view3d.height;
var xmult = this.maxTerms / this.boxwidth;
var ymult = this.maxTerms / this.boxheight;
var zmult = this.maxTerms / 2.;
var intensity = this.intensityCheck.getState ();
var aratiox = izoom;
var aratioy = izoom;
if (aratio < 1) aratioy /= aratio;
 else aratiox *= aratio;
var slice = this.sliceChooser.getSelectedIndex ();
if (this.sidesCheck.getState ()) slice = 0;
var bmult = (intensity) ? 20 : 1;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var camvx0 = (2 * i / this.gridSizeX - 1) * aratiox;
var camvy0 = (2 * j / this.gridSizeY - 1) * aratioy;
var camx = rotm[2] * test.falstad.WaveBoxFrame.viewDistance;
var camy = rotm[5] * test.falstad.WaveBoxFrame.viewDistance;
var camz = rotm[8] * test.falstad.WaveBoxFrame.viewDistance;
var camvx = rotm[0] * camvx0 + rotm[1] * camvy0 - rotm[2];
var camvy = rotm[3] * camvx0 + rotm[4] * camvy0 - rotm[5];
var camvz = rotm[6] * camvx0 + rotm[7] * camvy0 - rotm[8];
var camnorm = Math.sqrt (camvx0 * camvx0 + camvy0 * camvy0 + 1);
var n;
var simpr = 0;
var simpg = 0;
var tx1 = (-boxhalfwidth - camx) / camvx;
var tx2 = (boxhalfwidth - camx) / camvx;
var ty1 = (-boxhalfheight - camy) / camvy;
var ty2 = (boxhalfheight - camy) / camvy;
var tz1 = (-1 - camz) / camvz;
var tz2 = (1 - camz) / camvz;
var mint = this.max (this.min (tx1, tx2), this.max (this.min (ty1, ty2), this.min (tz1, tz2))) + .001;
var maxt = this.min (this.max (tx1, tx2), this.min (this.max (ty1, ty2), this.max (tz1, tz2))) - .001;
if (maxt < mint) {
this.fillSquare (i, j, 0, 0, 0);
continue;
}if (slice != 0) {
var t = -100;
switch (slice) {
case 1:
t = (this.sliceval - camx) / camvx;
break;
case 2:
t = (this.sliceval - camy) / camvy;
break;
case 3:
t = (this.sliceval - camz) / camvz;
break;
}
if (t < mint || t > maxt) {
this.fillSquare (i, j, 0, 0, 0);
continue;
}mint = maxt = t;
}var tstep = (maxt - mint) / (this.sampleCount - 1);
var pathlen = (maxt - mint) * camnorm;
var maxn = this.sampleCount;
if (this.sidesCheck.getState ()) {
maxn = 1;
pathlen = 5;
} else if (slice != 0) {
maxn = 1;
pathlen = 2;
}var xx = (camx + camvx * mint + boxhalfwidth) * xmult;
var yy = (camy + camvy * mint + boxhalfheight) * ymult;
var zz = (camz + camvz * mint + 1) * zmult;
camvx *= tstep * xmult;
camvy *= tstep * ymult;
camvz *= tstep * zmult;
for (n = 0; n < maxn; n++) {
var xxi = Clazz.doubleToInt (xx);
var yyi = Clazz.doubleToInt (yy);
var zzi = Clazz.doubleToInt (zz);
var f = 0;
if (intensity) {
this.cost1 = 1;
this.sint1 = 0;
this.cost2 = shiftcos;
this.sint2 = shiftsin;
var a = this.setup.computePoint (xxi, yyi, zzi);
this.cost1 = 0;
this.sint1 = 1;
this.cost2 = -shiftsin;
this.sint2 = shiftcos;
var b = this.setup.computePoint (xxi, yyi, zzi);
f = a * a + b * b;
} else f = this.setup.computePoint (xxi, yyi, zzi);
if (f < 0) {
simpr -= this.sampleMult[n] * f;
} else simpg += this.sampleMult[n] * f;
xx += camvx;
yy += camvy;
zz += camvz;
}
simpr *= pathlen / n;
simpg *= pathlen / n;
this.fillSquare (i, j, simpr * bmult, simpg * bmult, 0);
}

});
Clazz.defineMethod (c$, "sign", 
function (x) {
return x < 0 ? -1 : 1;
}, "~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateWaveBox", 
function (realg) {
var g = null;
if (this.winSize == null || this.winSize.width == 0) return;
g = this.dbimage.getGraphics ();
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
var allQuiet = false;
if (!this.stoppedCheck.getState ()) {
var sysTime = System.currentTimeMillis ();
var tadd = 0;
if (this.lastTime != 0) {
var val = this.speedBar.getValue ();
tadd = val * (sysTime - this.lastTime) * .0003;
this.t += tadd;
}this.lastTime = sysTime;
} else {
this.lastTime = 0;
allQuiet = true;
}if (this.intensityCheck.getState ()) allQuiet = true;
this.colorMult = this.brightnessBar.getValue () * 5;
if (this.needsPrecompute) {
this.setup.precompute ();
this.needsPrecompute = false;
}this.computeFunction ();
var i;
var j;
var k;
var sliced = this.sliceChooser.getSelectedIndex () != 0;
if (this.imageSource != null) this.imageSource.newPixels ();
g.drawImage (this.memimage, this.view3d.x, this.view3d.y, null);
g.setColor (java.awt.Color.white);
this.drawCube (g, false);
realg.drawImage (this.dbimage, 0, 0, this);
if (!allQuiet) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "visibleFace", 
function (nx, ny, nz) {
var viewx = test.falstad.WaveBoxFrame.viewDistance * this.rotmatrix[2];
var viewy = test.falstad.WaveBoxFrame.viewDistance * this.rotmatrix[5];
var viewz = test.falstad.WaveBoxFrame.viewDistance * this.rotmatrix[8];
return (nx - viewx) * nx + (ny - viewy) * ny + (nz - viewz) * nz < 0;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "fillSquare", 
function (i, j, cr, cg, cb) {
var winw = this.view3d.width;
var winh = this.view3d.height;
var x = Clazz.doubleToInt (i * winw / this.gridSizeX);
var y = Clazz.doubleToInt (j * winh / this.gridSizeY);
var x2 = Clazz.doubleToInt ((i + 1) * winw / this.gridSizeX);
var y2 = Clazz.doubleToInt ((j + 1) * winh / this.gridSizeY);
cr *= this.colorMult;
cg *= this.colorMult;
cb *= this.colorMult;
var k;
var l;
if (cr == 0 && cg == 0 && cb == 0) {
var y2l = y2 * this.view3d.width;
for (k = x; k < x2; k++) for (l = y * this.view3d.width; l < y2l; l += this.view3d.width) this.pixels[k + l] = 0xFF000000;


return;
}var fm = this.max (cr, this.max (cg, cb));
if (fm > 255) {
fm /= 255;
cr /= fm;
cg /= fm;
cb /= fm;
}var colval = 0xFF000000 + ((Clazz.doubleToInt (cr)) << 16) | ((Clazz.doubleToInt (cg)) << 8) | ((Clazz.doubleToInt (cb)));
var y2l = y2 * this.view3d.width;
for (k = x; k < x2; k++) for (l = y * this.view3d.width; l < y2l; l += this.view3d.width) this.pixels[k + l] = colval;


}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawCube", 
function (g, drawAll) {
var i;
var slice = this.sliceChooser.getSelectedIndex ();
var sp = 0;
for (i = 0; i != 6; i++) {
var nx = (i == 0) ? -1 : (i == 1) ? 1 : 0;
var ny = (i == 2) ? -1 : (i == 3) ? 1 : 0;
var nz = (i == 4) ? -1 : (i == 5) ? 1 : 0;
if (!drawAll && !this.visibleFace (nx, ny, nz)) continue;
var pts;
pts =  Clazz.newDoubleArray (3, 0);
var n;
for (n = 0; n != 4; n++) {
this.computeFace (i, n, pts);
this.map3d (pts[0], pts[1], pts[2], this.xpoints, this.ypoints, n);
}
g.setColor (java.awt.Color.gray);
g.drawPolygon (this.xpoints, this.ypoints, 4);
if (slice != 0 && Clazz.doubleToInt (i / 2) != slice - 1) {
if (this.selectedSlice) g.setColor (java.awt.Color.yellow);
var coord1 = (slice == 1) ? 1 : 0;
var coord2 = (slice == 3) ? 1 : 2;
this.computeFace (i, 0, pts);
pts[slice - 1] = this.sliceval;
this.map3d (pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp);
this.computeFace (i, 2, pts);
pts[slice - 1] = this.sliceval;
this.map3d (pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp + 1);
g.drawLine (this.slicerPoints[0][sp], this.slicerPoints[1][sp], this.slicerPoints[0][sp + 1], this.slicerPoints[1][sp + 1]);
this.sliceFaces[Clazz.doubleToInt (sp / 2)][0] = nx;
this.sliceFaces[Clazz.doubleToInt (sp / 2)][1] = ny;
this.sliceFaces[Clazz.doubleToInt (sp / 2)][2] = nz;
sp += 2;
}}
this.sliceFaceCount = sp;
}, "java.awt.Graphics,~B");
Clazz.defineMethod (c$, "computeFace", 
function (b, n, pts) {
var a = b >> 1;
pts[a] = ((b & 1) == 0) ? -1 : 1;
var i;
for (i = 0; i != 3; i++) {
if (i == a) continue;
pts[i] = (((n >> 1) ^ (n & 1)) == 0) ? -1 : 1;
n >>= 1;
}
}, "~N,~N,~A");
Clazz.defineMethod (c$, "map3d", 
function (x, y, z, xpoints, ypoints, pt) {
x *= this.boxwidth / 2;
y *= this.boxheight / 2;
var rotm = this.rotmatrix;
var realx = x * rotm[0] + y * rotm[3] + z * rotm[6];
var realy = x * rotm[1] + y * rotm[4] + z * rotm[7];
var realz = test.falstad.WaveBoxFrame.viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
var scalex = this.view3d.width * this.zoom / 2;
var scaley = this.view3d.height * this.zoom / 2;
var aratio = this.view3d.width / this.view3d.height;
if (aratio < 1) scaley *= aratio;
 else scalex /= aratio;
xpoints[pt] = Clazz.doubleToInt (this.view3d.width / 2) + Clazz.doubleToInt (scalex * realx / realz);
ypoints[pt] = Clazz.doubleToInt (this.view3d.height / 2) + Clazz.doubleToInt (scaley * realy / realz);
}, "~N,~N,~N,~A,~A,~N");
Clazz.defineMethod (c$, "unmap3d", 
function (x3, x, y, pn, pp) {
var scalex = this.view3d.width * this.zoom / 2;
var scaley = this.view3d.height * this.zoom / 2;
var aratio = this.view3d.width / this.view3d.height;
if (aratio < 1) scaley *= aratio;
 else scalex /= aratio;
var vx = (x - (Clazz.doubleToInt (this.view3d.width / 2))) / scalex;
var vy = (y - (Clazz.doubleToInt (this.view3d.height / 2))) / scaley;
var rotm = this.rotmatrix;
var mx = test.falstad.WaveBoxFrame.viewDistance * rotm[2];
var my = test.falstad.WaveBoxFrame.viewDistance * rotm[5];
var mz = test.falstad.WaveBoxFrame.viewDistance * rotm[8];
var mvx = (vx * rotm[0] + vy * rotm[1] - rotm[2]);
var mvy = (vx * rotm[3] + vy * rotm[4] - rotm[5]);
var mvz = (vx * rotm[6] + vy * rotm[7] - rotm[8]);
var t = ((pp[0] - mx) * pn[0] + (pp[1] - my) * pn[1] + (pp[2] - mz) * pn[2]) / (pn[0] * mvx + pn[1] * mvy + pn[2] * mvz);
x3[0] = mx + mvx * t;
x3[1] = my + mvy * t;
x3[2] = mz + mvz * t;
}, "~A,~N,~N,~A,~A");
Clazz.defineMethod (c$, "logcoef", 
function (x) {
var ep2 = 0.003;
var sign = (x < 0) ? -1 : 1;
x *= sign;
if (x < ep2) return 0;
if (this.logep2 == 0) this.logep2 = -Math.log (2 * ep2);
return Clazz.doubleToInt (255 * sign * (Math.log (x + ep2) + this.logep2) / this.logep2);
}, "~N");
Clazz.defineMethod (c$, "getColorValue", 
function (i, j, k) {
var val = Clazz.doubleToInt (this.func[i][j][k] * this.colorMult);
if (val > 255) val = 255;
return val;
}, "~N,~N,~N");
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
this.cv.repaint (this.pause);
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.freqBar || e.getSource () === this.aux1Bar || e.getSource () === this.aux2Bar || e.getSource () === this.aux3Bar) this.needsPrecompute = true;
if (e.getSource () === this.resolutionBar && this.resolutionBar.getValue () != this.resBarValue) {
this.setMaxTerms ();
this.resBarValue = this.resolutionBar.getValue ();
}this.setupSimpson ();
this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.dragging = true;
this.oldDragX = this.dragX;
this.oldDragY = this.dragY;
this.dragX = e.getX ();
this.dragY = e.getY ();
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "csInRange", 
function (x, xa, xb) {
if (xa < xb) return x >= xa - 5 && x <= xb + 5;
return x >= xb - 5 && x <= xa + 5;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "checkSlice", 
function (x, y) {
if (this.sliceChooser.getSelectedIndex () == 0) {
this.selectedSlice = false;
return;
}var n;
this.selectedSlice = false;
for (n = 0; n != this.sliceFaceCount; n += 2) {
var xa = this.slicerPoints[0][n];
var xb = this.slicerPoints[0][n + 1];
var ya = this.slicerPoints[1][n];
var yb = this.slicerPoints[1][n + 1];
if (!this.csInRange (x, xa, xb) || !this.csInRange (y, ya, yb)) continue;
var d;
if (xa == xb) d = Math.abs (x - xa);
 else {
var b = (yb - ya) / (xb - xa);
var a = ya - b * xa;
var d1 = y - (a + b * x);
if (d1 < 0) d1 = -d1;
d = d1 / Math.sqrt (1 + b * b);
}if (d < 6) {
this.selectedSlice = true;
this.sliceFace = this.sliceFaces[Clazz.doubleToInt (n / 2)];
break;
}}
}, "~N,~N");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
this.checkSlice (e.getX (), e.getY ());
if ((e.getModifiers () & 16) != 0) {
if (this.selection != -1) {
this.dragging = true;
}return;
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.oldDragX = this.dragStartX = e.getX ();
this.oldDragY = this.dragStartY = e.getY ();
this.dragZoomStart = this.zoom;
this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if (this.dragging) this.cv.repaint ();
this.dragging = false;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (e.getItemSelectable () === this.setupChooser) {
if (this.sliceChooser == null) return;
this.sliceChooser.select (0);
this.setup.deselect ();
this.setup = this.setupList.elementAt (this.setupChooser.getSelectedIndex ());
this.hideBars ();
this.setup.select ();
this.setup.precompute ();
this.validate ();
}this.cv.repaint (this.pause);
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "hideBars", 
function () {
var i;
for (i = 0; i != 3; i++) {
this.auxBars[i].label.setVisible (false);
this.auxBars[i].bar.setVisible (false);
}
});
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.WaveBoxFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "edit", 
function (e) {
if (this.selection == 0) return;
var x = e.getX ();
var y = e.getY ();
this.edit3d (x, y);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "edit3d", 
function (x, y) {
var mode = this.modeChooser.getSelectedIndex ();
if (this.selectedSlice) mode = 2;
if (mode == 0) {
var xo = this.oldDragX - x;
var yo = this.oldDragY - y;
this.rotate (xo / 40., yo / 40.);
this.cv.repaint (this.pause);
} else if (mode == 1) {
var xo = x - this.dragStartX;
this.zoom = this.dragZoomStart + xo / 20.;
if (this.zoom < .1) this.zoom = .1;
this.cv.repaint (this.pause);
} else if (mode == 2) {
var x3 =  Clazz.newDoubleArray (3, 0);
this.unmap3d (x3, x, y, this.sliceFace, this.sliceFace);
switch (this.sliceChooser.getSelectedIndex ()) {
case 1:
this.sliceval = x3[0];
break;
case 2:
this.sliceval = x3[1];
break;
case 3:
this.sliceval = x3[2];
break;
}
if (this.sliceval < -0.99) this.sliceval = -0.99;
if (this.sliceval > .99) this.sliceval = .99;
this.cv.repaint (this.pause);
}}, "~N,~N");
Clazz.defineMethod (c$, "bessj0", 
function (x) {
var ax = x;
var z;
var xx;
var y;
var ans;
var ans1;
var ans2;
if (x < 8.0) {
y = x * x;
ans1 = 57568490574.0 + y * (-1.3362590354E10 + y * (651619640.7 + y * (-1.121442418E7 + y * (77392.33017 + y * (-184.9052456)))));
ans2 = 57568490411.0 + y * (1029532985.0 + y * (9494680.718 + y * (59272.64853 + y * (267.8532712 + y * 1.0))));
ans = ans1 / ans2;
} else {
z = 8.0 / ax;
y = z * z;
xx = ax - 0.785398164;
ans1 = 1.0 + y * (-0.001098628627 + y * (0.2734510407e-4 + y * (-2.073370639E-6 + y * 0.2093887211e-6)));
ans2 = -0.01562499995 + y * (0.1430488765e-3 + y * (-6.911147651E-6 + y * (0.7621095161e-6 - y * 0.934935152e-7)));
ans = Math.sqrt (0.636619772 / ax) * (Math.cos (xx) * ans1 - z * Math.sin (xx) * ans2);
}return ans;
}, "~N");
Clazz.defineMethod (c$, "bessy0", 
function (x) {
var z;
var xx;
var y;
var ans;
var ans1;
var ans2;
if (x < 8.0) {
y = x * x;
ans1 = -2.957821389E9 + y * (7062834065.0 + y * (-5.123598036E8 + y * (10879881.29 + y * (-86327.92757 + y * 228.4622733))));
ans2 = 40076544269.0 + y * (745249964.8 + y * (7189466.438 + y * (47447.26470 + y * (226.1030244 + y * 1.0))));
ans = (ans1 / ans2) + 0.636619772 * this.bessj0 (x) * Math.log (x);
} else {
z = 8.0 / x;
y = z * z;
xx = x - 0.785398164;
ans1 = 1.0 + y * (-0.001098628627 + y * (0.2734510407e-4 + y * (-2.073370639E-6 + y * 0.2093887211e-6)));
ans2 = -0.01562499995 + y * (0.1430488765e-3 + y * (-6.911147651E-6 + y * (0.7621095161e-6 + y * (-9.34945152E-8))));
ans = Math.sqrt (0.636619772 / x) * (Math.sin (xx) * ans1 + z * Math.cos (xx) * ans2);
}return ans;
}, "~N");
c$.$WaveBoxFrame$AuxBar$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.bar = null;
this.label = null;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "AuxBar");
Clazz.makeConstructor (c$, 
function (a, b) {
this.label = a;
this.bar = b;
}, "swingjs.awt.Label,swingjs.awt.Scrollbar");
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "Setup");
Clazz.defineMethod (c$, "select", 
function () {
});
Clazz.defineMethod (c$, "precompute", 
function () {
});
Clazz.defineMethod (c$, "deselect", 
function () {
});
Clazz.defineMethod (c$, "getPhaseShift", 
function () {
return 0;
});
Clazz.makeConstructor (c$, 
function () {
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$SingleSourceSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.dataxy = null;
this.datadzr = null;
this.datadzi = null;
this.mxhalf = 0;
this.mxlast = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "SingleSourceSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "point source";
});
Clazz.overrideMethod (c$, "select", 
function () {
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mxhalf = Clazz.doubleToInt (this.b$["test.falstad.WaveBoxFrame"].maxTerms / 2);
var d = 0;
var e = this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
this.dataxy =  Clazz.newIntArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
var f = 4;
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) for (b = 0; b != this.b$["test.falstad.WaveBoxFrame"].maxTerms; b++) {
var g = a - this.mxhalf;
var h = b - this.mxhalf;
this.dataxy[a][b] = Clazz.doubleToInt (f * Math.sqrt (g * g + h * h) + .5);
if (this.dataxy[a][b] > d) d = this.dataxy[a][b];
}

this.datadzr =  Clazz.newDoubleArray (d + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.datadzi =  Clazz.newDoubleArray (d + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) for (b = 0; b <= d; b++) {
var g = a - this.mxhalf;
var h = Math.sqrt (Clazz.doubleToInt (b * b / (f * f)) + g * g) * this.b$["test.falstad.WaveBoxFrame"].resadj + .00000001;
this.datadzr[b][a] = Math.cos (h * e) / h;
this.datadzi[b][a] = -Math.sin (h * e) / h;
}

});
Clazz.overrideMethod (c$, "deselect", 
function () {
this.dataxy = null;
this.datadzr = this.datadzi = null;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
var d = this.dataxy[a][b];
return this.datadzr[d][c] * this.b$["test.falstad.WaveBoxFrame"].cost1 - this.datadzi[d][c] * this.b$["test.falstad.WaveBoxFrame"].sint1;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.PinholeSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$PinholeSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.dataxy = null;
this.datadzr = null;
this.datadzi = null;
this.mxhalf = 0;
this.mxlast = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "PinholeSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "pinhole";
});
Clazz.overrideMethod (c$, "select", 
function () {
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mxhalf = Clazz.doubleToInt (this.b$["test.falstad.WaveBoxFrame"].maxTerms / 2);
var d = 0;
var e = this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
this.dataxy =  Clazz.newIntArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
var f = 4;
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) for (b = 0; b != this.b$["test.falstad.WaveBoxFrame"].maxTerms; b++) {
var g = a - this.mxhalf;
var h = b - this.mxhalf;
this.dataxy[a][b] = Clazz.doubleToInt (f * Math.sqrt (g * g + h * h) + .5);
if (this.dataxy[a][b] > d) d = this.dataxy[a][b];
}

this.datadzr =  Clazz.newDoubleArray (d + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.datadzi =  Clazz.newDoubleArray (d + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) for (b = 0; b <= d; b++) {
var g = Math.sqrt (Clazz.doubleToInt (b * b / (f * f)) + a * a) * this.b$["test.falstad.WaveBoxFrame"].resadj + .00000001;
this.datadzr[b][a] = Math.cos (g * e) / g;
this.datadzi[b][a] = -Math.sin (g * e) / g;
}

});
Clazz.overrideMethod (c$, "deselect", 
function () {
this.dataxy = null;
this.datadzr = this.datadzi = null;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
var d = this.dataxy[a][b];
return this.datadzr[d][c] * this.b$["test.falstad.WaveBoxFrame"].cost1 - this.datadzi[d][c] * this.b$["test.falstad.WaveBoxFrame"].sint1;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.TwoSourcesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$TwoSourcesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.dataxy = null;
this.datadzr = null;
this.datadzi = null;
this.w1mult = null;
this.w2mult = null;
this.mxhalf = 0;
this.mxlast = 0;
this.dipole = false;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "TwoSourcesSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "2 point sources";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.WaveBoxFrame"].setupBar (0, "Source Separation", 30);
this.b$["test.falstad.WaveBoxFrame"].setupBar (1, "Phase Difference", 0);
this.b$["test.falstad.WaveBoxFrame"].setupBar (2, "Balance", 50);
this.dipole = false;
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mxhalf = Clazz.doubleToInt (this.b$["test.falstad.WaveBoxFrame"].maxTerms / 2);
this.dataxy =  Clazz.newIntArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
var d = this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
var e = 4;
var f = this.b$["test.falstad.WaveBoxFrame"].aux1Bar.getValue () / 3. / this.b$["test.falstad.WaveBoxFrame"].resadj;
var g = 0;
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) {
var h = a - this.mxhalf + f + .001;
for (b = 0; b != this.b$["test.falstad.WaveBoxFrame"].maxTerms; b++) {
var i = b - this.mxhalf + .001;
this.dataxy[a][b] = Clazz.doubleToInt (e * Math.sqrt (h * h + i * i) + .5);
if (this.dataxy[a][b] > g) g = this.dataxy[a][b];
}
}
this.datadzr =  Clazz.newDoubleArray (g + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.datadzi =  Clazz.newDoubleArray (g + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
for (c = 0; c != this.b$["test.falstad.WaveBoxFrame"].maxTerms; c++) for (b = 0; b <= g; b++) {
var h = c - this.mxhalf;
var i = Math.sqrt (Clazz.doubleToInt (b * b / (e * e)) + h * h) * this.b$["test.falstad.WaveBoxFrame"].resadj + .0000001;
this.datadzr[b][c] = Math.cos (i * d) / i;
this.datadzi[b][c] = -Math.sin (i * d) / i;
}

this.w1mult = (this.dipole) ? .5 : this.b$["test.falstad.WaveBoxFrame"].aux3Bar.getValue () / 100.;
this.w2mult = 1 - this.w1mult;
});
Clazz.overrideMethod (c$, "getPhaseShift", 
function () {
return (this.dipole) ? 3.141592653589793 : this.b$["test.falstad.WaveBoxFrame"].aux2Bar.getValue () * 3.141592653589793 / 50.;
});
Clazz.overrideMethod (c$, "deselect", 
function () {
this.dataxy = null;
this.datadzr = this.datadzi = null;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
var d = this.dataxy[a][b];
var e = this.dataxy[this.b$["test.falstad.WaveBoxFrame"].maxTerms - 1 - a][b];
return this.w1mult * (this.datadzr[d][c] * this.b$["test.falstad.WaveBoxFrame"].cost1 - this.datadzi[d][c] * this.b$["test.falstad.WaveBoxFrame"].sint1) + this.w2mult * (this.datadzr[e][c] * this.b$["test.falstad.WaveBoxFrame"].cost2 - this.datadzi[e][c] * this.b$["test.falstad.WaveBoxFrame"].sint2);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.DipoleSourceSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$DipoleSourceSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "DipoleSourceSetup", test.falstad.WaveBoxFrame.TwoSourcesSetup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.TwoSourcesSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "dipole source";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.WaveBoxFrame"].setupBar (0, "Source Separation", 8);
this.dipole = true;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.LateralQuadrupoleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$LateralQuadrupoleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.dataxy = null;
this.datadzr = null;
this.datadzi = null;
this.w1mult = null;
this.mxhalf = 0;
this.mxlast = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "LateralQuadrupoleSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "lateral quadrupole";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.WaveBoxFrame"].setupBar (0, "Source Separation", 20);
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mxhalf = Clazz.doubleToInt (this.b$["test.falstad.WaveBoxFrame"].maxTerms / 2);
this.dataxy =  Clazz.newIntArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
var d = this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
var e = 4;
var f = this.b$["test.falstad.WaveBoxFrame"].aux1Bar.getValue () / 3. / this.b$["test.falstad.WaveBoxFrame"].resadj;
var g = 0;
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) {
var h = a - this.mxhalf + f + .001;
for (b = 0; b != this.b$["test.falstad.WaveBoxFrame"].maxTerms; b++) {
var i = b - this.mxhalf + .001;
this.dataxy[a][b] = Clazz.doubleToInt (e * Math.sqrt (h * h + i * i) + .5);
if (this.dataxy[a][b] > g) g = this.dataxy[a][b];
}
}
this.datadzr =  Clazz.newDoubleArray (g + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.datadzi =  Clazz.newDoubleArray (g + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
for (c = 0; c != this.b$["test.falstad.WaveBoxFrame"].maxTerms; c++) for (b = 0; b <= g; b++) {
var h = c - this.mxhalf;
var i = Math.sqrt (Clazz.doubleToInt (b * b / (e * e)) + h * h) * this.b$["test.falstad.WaveBoxFrame"].resadj + .0000001;
this.datadzr[b][c] = .25 * Math.cos (i * d) / i;
this.datadzi[b][c] = -0.25 * Math.sin (i * d) / i;
}

});
Clazz.overrideMethod (c$, "deselect", 
function () {
this.dataxy = null;
this.datadzr = this.datadzi = null;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
var d = this.dataxy[a][b];
var e = this.dataxy[this.b$["test.falstad.WaveBoxFrame"].maxTerms - 1 - a][b];
var f = this.dataxy[b][a];
var g = this.dataxy[this.b$["test.falstad.WaveBoxFrame"].maxTerms - 1 - b][a];
return (this.datadzr[d][c] + this.datadzr[e][c] - this.datadzr[f][c] - this.datadzr[g][c]) * this.b$["test.falstad.WaveBoxFrame"].cost1 - (this.datadzi[d][c] + this.datadzi[e][c] - this.datadzi[f][c] - this.datadzi[g][c]) * this.b$["test.falstad.WaveBoxFrame"].sint1;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.LinearQuadrupoleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$LinearQuadrupoleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.dataxy1 = null;
this.dataxy2 = null;
this.datadzr = null;
this.datadzi = null;
this.mxhalf = 0;
this.mxlast = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "LinearQuadrupoleSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "linear quadrupole";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.WaveBoxFrame"].setupBar (0, "Source Separation", 20);
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mxhalf = Clazz.doubleToInt (this.b$["test.falstad.WaveBoxFrame"].maxTerms / 2);
var d = this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
this.dataxy1 =  Clazz.newIntArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.dataxy2 =  Clazz.newIntArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
var e = 4;
var f = this.b$["test.falstad.WaveBoxFrame"].aux1Bar.getValue () / 3. / this.b$["test.falstad.WaveBoxFrame"].resadj;
var g = 0;
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) {
var h = a - this.mxhalf + f + .001;
var i = a - this.mxhalf + f / 2 + .001;
for (b = 0; b != this.b$["test.falstad.WaveBoxFrame"].maxTerms; b++) {
var j = b - this.mxhalf + .001;
this.dataxy1[a][b] = Clazz.doubleToInt (e * Math.sqrt (h * h + j * j) + .5);
this.dataxy2[a][b] = Clazz.doubleToInt (e * Math.sqrt (i * i + j * j) + .5);
if (this.dataxy1[a][b] > g) g = this.dataxy1[a][b];
if (this.dataxy2[a][b] > g) g = this.dataxy2[a][b];
}
}
this.datadzr =  Clazz.newDoubleArray (g + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.datadzi =  Clazz.newDoubleArray (g + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
for (c = 0; c != this.b$["test.falstad.WaveBoxFrame"].maxTerms; c++) for (b = 0; b <= g; b++) {
var h = c - this.mxhalf;
var i = Math.sqrt (Clazz.doubleToInt (b * b / (e * e)) + h * h) * this.b$["test.falstad.WaveBoxFrame"].resadj + .0000001;
this.datadzr[b][c] = .25 * Math.cos (i * d) / i;
this.datadzi[b][c] = -0.25 * Math.sin (i * d) / i;
}

});
Clazz.overrideMethod (c$, "deselect", 
function () {
this.dataxy1 = this.dataxy2 = null;
this.datadzr = this.datadzi = null;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
var d = this.dataxy1[a][b];
var e = this.dataxy2[a][b];
var f = this.dataxy1[this.b$["test.falstad.WaveBoxFrame"].maxTerms - 1 - a][b];
var g = this.dataxy2[this.b$["test.falstad.WaveBoxFrame"].maxTerms - 1 - a][b];
return (this.datadzr[d][c] - this.datadzr[e][c] + this.datadzr[f][c] - this.datadzr[g][c]) * this.b$["test.falstad.WaveBoxFrame"].cost1 - (this.datadzi[d][c] - this.datadzi[e][c] + this.datadzi[f][c] - this.datadzi[g][c]) * this.b$["test.falstad.WaveBoxFrame"].sint1;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.TwoPinholesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$TwoPinholesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.dataxy = null;
this.datadzr = null;
this.datadzi = null;
this.w1mult = null;
this.w2mult = null;
this.mxhalf = 0;
this.mxlast = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "TwoPinholesSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "2 pinholes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.WaveBoxFrame"].setupBar (0, "Source Separation", 30);
this.b$["test.falstad.WaveBoxFrame"].setupBar (1, "Phase Difference", 0);
this.b$["test.falstad.WaveBoxFrame"].setupBar (2, "Balance", 50);
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mxhalf = Clazz.doubleToInt (this.b$["test.falstad.WaveBoxFrame"].maxTerms / 2);
this.dataxy =  Clazz.newIntArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
var d = this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
var e = 4;
var f = this.b$["test.falstad.WaveBoxFrame"].aux1Bar.getValue () / 3. / this.b$["test.falstad.WaveBoxFrame"].resadj;
var g = 0;
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) {
var h = a - this.mxhalf + f + .001;
for (b = 0; b != this.b$["test.falstad.WaveBoxFrame"].maxTerms; b++) {
this.dataxy[a][b] = Clazz.doubleToInt (e * Math.sqrt (h * h + b * b) + .5);
if (this.dataxy[a][b] > g) g = this.dataxy[a][b];
}
}
this.datadzr =  Clazz.newDoubleArray (g + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.datadzi =  Clazz.newDoubleArray (g + 1, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
for (c = 0; c != this.b$["test.falstad.WaveBoxFrame"].maxTerms; c++) for (b = 0; b <= g; b++) {
var h = c - this.mxhalf;
var i = Math.sqrt (Clazz.doubleToInt (b * b / (e * e)) + h * h) * this.b$["test.falstad.WaveBoxFrame"].resadj + .0000001;
this.datadzr[b][c] = Math.cos (i * d) / i;
this.datadzi[b][c] = -Math.sin (i * d) / i;
}

this.w1mult = this.b$["test.falstad.WaveBoxFrame"].aux3Bar.getValue () / 100.;
this.w2mult = 1 - this.w1mult;
});
Clazz.overrideMethod (c$, "getPhaseShift", 
function () {
return this.b$["test.falstad.WaveBoxFrame"].aux2Bar.getValue () * 3.141592653589793 / 50.;
});
Clazz.overrideMethod (c$, "deselect", 
function () {
this.dataxy = null;
this.datadzr = this.datadzi = null;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
var d = this.dataxy[a][b];
var e = this.dataxy[this.b$["test.falstad.WaveBoxFrame"].maxTerms - 1 - a][b];
return this.w1mult * (this.datadzr[d][c] * this.b$["test.falstad.WaveBoxFrame"].cost1 - this.datadzi[d][c] * this.b$["test.falstad.WaveBoxFrame"].sint1) + this.w2mult * (this.datadzr[e][c] * this.b$["test.falstad.WaveBoxFrame"].cost2 - this.datadzi[e][c] * this.b$["test.falstad.WaveBoxFrame"].sint2);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.SingleLineSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$SingleLineSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.datar = null;
this.datai = null;
this.mxhalf = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "SingleLineSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "single line source";
});
Clazz.overrideMethod (c$, "select", 
function () {
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mxhalf = Clazz.doubleToInt (this.b$["test.falstad.WaveBoxFrame"].maxTerms / 2);
this.datar =  Clazz.newDoubleArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.datai =  Clazz.newDoubleArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
var d = this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) {
var e = a - this.mxhalf + .001;
for (b = 0; b != this.b$["test.falstad.WaveBoxFrame"].maxTerms; b++) {
var f = b - this.mxhalf + .001;
var g = Math.sqrt (e * e + f * f) * this.b$["test.falstad.WaveBoxFrame"].resadj;
this.datar[a][b] = .25 * this.b$["test.falstad.WaveBoxFrame"].bessj0 (g * d);
this.datai[a][b] = -0.25 * this.b$["test.falstad.WaveBoxFrame"].bessy0 (g * d);
}
}
});
Clazz.overrideMethod (c$, "deselect", 
function () {
this.datar = this.datai = null;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
return this.datar[a][b] * this.b$["test.falstad.WaveBoxFrame"].cost1 - this.datai[a][b] * this.b$["test.falstad.WaveBoxFrame"].sint1;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.SingleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$SingleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.datar = null;
this.datai = null;
this.mxhalf = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "SingleSlitSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "single slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mxhalf = Clazz.doubleToInt (this.b$["test.falstad.WaveBoxFrame"].maxTerms / 2);
this.datar =  Clazz.newDoubleArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.datai =  Clazz.newDoubleArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
var d = this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) {
var e = a - this.mxhalf + .001;
for (b = 0; b != this.b$["test.falstad.WaveBoxFrame"].maxTerms; b++) {
var f = Math.sqrt (e * e + b * b) * this.b$["test.falstad.WaveBoxFrame"].resadj;
this.datar[a][b] = .25 * this.b$["test.falstad.WaveBoxFrame"].bessj0 (f * d);
this.datai[a][b] = -0.25 * this.b$["test.falstad.WaveBoxFrame"].bessy0 (f * d);
}
}
});
Clazz.overrideMethod (c$, "deselect", 
function () {
this.datar = this.datai = null;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
return this.datar[a][b] * this.b$["test.falstad.WaveBoxFrame"].cost1 - this.datai[a][b] * this.b$["test.falstad.WaveBoxFrame"].sint1;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.DoubleLineSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$DoubleLineSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.datar = null;
this.datai = null;
this.mxhalf = 0;
this.mxlast = 0;
this.w1mult = 0;
this.w2mult = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "DoubleLineSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "2 line sources";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.WaveBoxFrame"].setupBar (0, "Source Separation", 30);
this.b$["test.falstad.WaveBoxFrame"].setupBar (1, "Phase Difference", 0);
this.b$["test.falstad.WaveBoxFrame"].setupBar (2, "Balance", 50);
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mxhalf = Clazz.doubleToInt (this.b$["test.falstad.WaveBoxFrame"].maxTerms / 2);
this.mxlast = this.b$["test.falstad.WaveBoxFrame"].maxTerms - 1;
this.datar =  Clazz.newDoubleArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.datai =  Clazz.newDoubleArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
var d = this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
var e = this.b$["test.falstad.WaveBoxFrame"].aux1Bar.getValue () / 3. / this.b$["test.falstad.WaveBoxFrame"].resadj;
this.w1mult = this.b$["test.falstad.WaveBoxFrame"].aux3Bar.getValue () / 100.;
this.w2mult = 1 - this.w1mult;
this.w1mult *= .25;
this.w2mult *= .25;
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) {
var f = a - this.mxhalf - e + .001;
for (b = 0; b != this.b$["test.falstad.WaveBoxFrame"].maxTerms; b++) {
var g = b - this.mxhalf + .001;
var h = Math.sqrt (f * f + g * g) * this.b$["test.falstad.WaveBoxFrame"].resadj;
this.datar[a][b] = this.b$["test.falstad.WaveBoxFrame"].bessj0 (h * d);
this.datai[a][b] = -this.b$["test.falstad.WaveBoxFrame"].bessy0 (h * d);
}
}
});
Clazz.overrideMethod (c$, "getPhaseShift", 
function () {
return this.b$["test.falstad.WaveBoxFrame"].aux2Bar.getValue () * 3.141592653589793 / 50.;
});
Clazz.overrideMethod (c$, "deselect", 
function () {
this.datar = this.datai = null;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
var d = this.mxlast - a;
return this.w1mult * (this.datar[a][b] * this.b$["test.falstad.WaveBoxFrame"].cost1 - this.datai[a][b] * this.b$["test.falstad.WaveBoxFrame"].sint1) + this.w2mult * (this.datar[d][b] * this.b$["test.falstad.WaveBoxFrame"].cost2 - this.datai[d][b] * this.b$["test.falstad.WaveBoxFrame"].sint2);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.DoubleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$DoubleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.datar = null;
this.datai = null;
this.mxhalf = 0;
this.mxlast = 0;
this.w1mult = 0;
this.w2mult = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "DoubleSlitSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "double slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.WaveBoxFrame"].setupBar (0, "Slit Separation", 30);
this.b$["test.falstad.WaveBoxFrame"].setupBar (1, "Phase Difference", 0);
this.b$["test.falstad.WaveBoxFrame"].setupBar (2, "Balance", 50);
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mxhalf = Clazz.doubleToInt (this.b$["test.falstad.WaveBoxFrame"].maxTerms / 2);
this.mxlast = this.b$["test.falstad.WaveBoxFrame"].maxTerms - 1;
this.datar =  Clazz.newDoubleArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.datai =  Clazz.newDoubleArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
var d = this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
var e = this.b$["test.falstad.WaveBoxFrame"].aux1Bar.getValue () / 3. / this.b$["test.falstad.WaveBoxFrame"].resadj;
this.w1mult = this.b$["test.falstad.WaveBoxFrame"].aux3Bar.getValue () / 100.;
this.w2mult = 1 - this.w1mult;
this.w1mult *= .25;
this.w2mult *= .25;
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) {
var f = a - this.mxhalf - e + .001;
for (b = 0; b != this.b$["test.falstad.WaveBoxFrame"].maxTerms; b++) {
var g = Math.sqrt (f * f + b * b) * this.b$["test.falstad.WaveBoxFrame"].resadj;
this.datar[a][b] = this.b$["test.falstad.WaveBoxFrame"].bessj0 (g * d);
this.datai[a][b] = -this.b$["test.falstad.WaveBoxFrame"].bessy0 (g * d);
}
}
});
Clazz.overrideMethod (c$, "getPhaseShift", 
function () {
return this.b$["test.falstad.WaveBoxFrame"].aux2Bar.getValue () * 3.141592653589793 / 50.;
});
Clazz.overrideMethod (c$, "deselect", 
function () {
this.datar = this.datai = null;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
var d = this.mxlast - a;
return this.w1mult * (this.datar[a][b] * this.b$["test.falstad.WaveBoxFrame"].cost1 - this.datai[a][b] * this.b$["test.falstad.WaveBoxFrame"].sint1) + this.w2mult * (this.datar[d][b] * this.b$["test.falstad.WaveBoxFrame"].cost2 - this.datai[d][b] * this.b$["test.falstad.WaveBoxFrame"].sint2);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.TripleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$TripleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.datar = null;
this.datai = null;
this.mxhalf = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "TripleSlitSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "triple slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.WaveBoxFrame"].setupBar (0, "Slit Separation", 30);
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mxhalf = Clazz.doubleToInt (this.b$["test.falstad.WaveBoxFrame"].maxTerms / 2);
this.datar =  Clazz.newDoubleArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
this.datai =  Clazz.newDoubleArray (this.b$["test.falstad.WaveBoxFrame"].maxTerms, this.b$["test.falstad.WaveBoxFrame"].maxTerms, 0);
var d = this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
var e = this.b$["test.falstad.WaveBoxFrame"].aux1Bar.getValue () / 3. / this.b$["test.falstad.WaveBoxFrame"].resadj;
var f = 0.08333333333333333;
for (a = 0; a != this.b$["test.falstad.WaveBoxFrame"].maxTerms; a++) {
var g = a - this.mxhalf - e + .001;
var h = a - this.mxhalf + e + .001;
var i = a - this.mxhalf + .001;
for (b = 0; b != this.b$["test.falstad.WaveBoxFrame"].maxTerms; b++) {
var j = Math.sqrt (g * g + b * b) * this.b$["test.falstad.WaveBoxFrame"].resadj;
var k = Math.sqrt (h * h + b * b) * this.b$["test.falstad.WaveBoxFrame"].resadj;
var l = Math.sqrt (i * i + b * b) * this.b$["test.falstad.WaveBoxFrame"].resadj;
this.datar[a][b] = f * (this.b$["test.falstad.WaveBoxFrame"].bessj0 (j * d) + this.b$["test.falstad.WaveBoxFrame"].bessj0 (k * d) + this.b$["test.falstad.WaveBoxFrame"].bessj0 (l * d));
this.datai[a][b] = -f * (this.b$["test.falstad.WaveBoxFrame"].bessy0 (j * d) + this.b$["test.falstad.WaveBoxFrame"].bessy0 (k * d) + this.b$["test.falstad.WaveBoxFrame"].bessy0 (l * d));
}
}
});
Clazz.overrideMethod (c$, "deselect", 
function () {
this.datar = this.datai = null;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
return this.datar[a][b] * this.b$["test.falstad.WaveBoxFrame"].cost1 - this.datai[a][b] * this.b$["test.falstad.WaveBoxFrame"].sint1;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.PlaneWaveSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$PlaneWaveSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.mult = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "PlaneWaveSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "plane wave";
});
Clazz.overrideMethod (c$, "select", 
function () {
});
Clazz.overrideMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.mult = this.b$["test.falstad.WaveBoxFrame"].resadj * this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
});
Clazz.overrideMethod (c$, "deselect", 
function () {
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
return .05 * (Math.cos (a * this.mult) * this.b$["test.falstad.WaveBoxFrame"].cost1 + Math.sin (a * this.mult) * this.b$["test.falstad.WaveBoxFrame"].sint1);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.TwoPlaneWavesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$WaveBoxFrame$TwoPlaneWavesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.datar = null;
this.datai = null;
this.noz = false;
this.k2x = 0;
this.k2y = 0;
this.k2z = 0;
this.mult = 0;
this.w1mult = 0;
this.w2mult = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.WaveBoxFrame, "TwoPlaneWavesSetup", test.falstad.WaveBoxFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.WaveBoxFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "2 plane waves";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.WaveBoxFrame"].setupBar (0, "Source 1 Theta", 25);
this.b$["test.falstad.WaveBoxFrame"].setupBar (1, "Source 1 Phi", 0);
this.b$["test.falstad.WaveBoxFrame"].setupBar (2, "Balance", 50);
});
Clazz.overrideMethod (c$, "precompute", 
function () {
this.mult = this.b$["test.falstad.WaveBoxFrame"].resadj * this.b$["test.falstad.WaveBoxFrame"].freqBar.getValue () / 50.;
var a = this.b$["test.falstad.WaveBoxFrame"].aux1Bar.getValue () * 3.141592653589793 / 50;
var b = this.b$["test.falstad.WaveBoxFrame"].aux2Bar.getValue () * 3.141592653589793 / 50;
this.w1mult = this.b$["test.falstad.WaveBoxFrame"].aux3Bar.getValue () / 100.;
this.w2mult = 1 - this.w1mult;
this.w1mult *= .05;
this.w2mult *= .05;
var c = Math.cos (a);
var d = Math.sin (a);
var e = Math.cos (b);
var f = Math.sin (b);
this.k2x = e * c * this.mult;
this.k2y = -e * d * this.mult;
this.k2z = -f * this.mult;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b, c) {
var d = a * this.mult;
var e = a * this.k2x + b * this.k2y + c * this.k2z;
return this.w1mult * (Math.cos (d) * this.b$["test.falstad.WaveBoxFrame"].cost1 + Math.sin (d) * this.b$["test.falstad.WaveBoxFrame"].sint1) + this.w2mult * (Math.cos (e) * this.b$["test.falstad.WaveBoxFrame"].cost2 + Math.sin (e) * this.b$["test.falstad.WaveBoxFrame"].sint2);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return null;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"SLICE_NONE", 0,
"SLICE_X", 1,
"SLICE_Y", 2,
"SLICE_Z", 3,
"pi", 3.14159265358979323846,
"pi2", 6.283185307179586,
"spectrumSpacing", 50,
"maxModes", 10,
"maxDispCoefs", 8,
"viewDistance", 12,
"SEL_NONE", 0,
"SEL_3D", 1,
"SEL_MAG", 2,
"SEL_SPECTRUM", 3,
"MODE_ANGLE", 0,
"MODE_ZOOM", 1,
"MODE_SLICE", 2,
"epsilon", .00001,
"epsilon2", .003);
});
