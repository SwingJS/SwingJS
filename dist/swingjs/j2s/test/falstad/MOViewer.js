Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.Frame", "$.LayoutManager", "$.Rectangle", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas"], ["test.falstad.MOViewer", "$.MOViewerFrame", "$.MOViewerCanvas", "$.MOViewerLayout"], ["java.awt.Color", "$.Dimension", "java.awt.image.MemoryImageSource", "java.io.File", "java.lang.Double", "$.Float", "java.net.URL", "java.util.Random", "$.StringTokenizer", "swingjs.awt.CheckboxMenuItem", "$.Choice", "$.Label", "$.Menu", "$.MenuBar", "$.MenuItem", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "MOViewerCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.MOViewerCanvas, []);
this.pg = p;
}, "test.falstad.MOViewerFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateMOViewer (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paint", 
function (g) {
this.pg.updateMOViewer (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "MOViewerLayout", null, java.awt.LayoutManager);
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
var insets = target.insets ();
var targetw = target.size ().width - insets.left - insets.right;
var cw = targetw - barwidth;
var targeth = target.size ().height - (insets.top + insets.bottom);
target.getComponent (0).move (insets.left, insets.top);
target.getComponent (0).resize (cw, targeth);
cw += insets.left;
var h = insets.top;
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
}, test.falstad, "MOViewer", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.MOViewer.ogf != null) test.falstad.MOViewer.ogf.dispose ();
test.falstad.MOViewer.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.addComponentListener (this);
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.MOViewer.ogf =  new test.falstad.MOViewerFrame (null);
test.falstad.MOViewer.ogf.init ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.MOViewer.ogf == null) {
this.started = true;
test.falstad.MOViewer.ogf =  new test.falstad.MOViewerFrame (this);
test.falstad.MOViewer.ogf.init ();
this.repaint ();
}});
Clazz.overrideMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.MOViewer.ogf == null) s = "Applet is finished.";
 else test.falstad.MOViewer.ogf.show ();
g.drawString (s, 10, 30);
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
if (test.falstad.MOViewer.ogf != null) test.falstad.MOViewer.ogf.dispose ();
test.falstad.MOViewer.ogf = null;
this.repaint ();
});
Clazz.defineStatics (c$,
"ogf", null);
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.memimage = null;
this.random = null;
this.gridSizeX = 200;
this.gridSizeY = 200;
this.blankButton = null;
this.normalizeButton = null;
this.maximizeButton = null;
this.memoryImageSourceCheck = null;
this.colorCheck = null;
this.eCheckItem = null;
this.eSepCheckItem = null;
this.xCheckItem = null;
this.alwaysNormItem = null;
this.nuclearItem = null;
this.showAtomsItem = null;
this.dimensionsItem = null;
this.axesItem = null;
this.exitItem = null;
this.sliceChooser = null;
this.stateChooser = null;
this.sampleChooser = null;
this.samplesItems = null;
this.samplesNums = null;
this.resolutionBar = null;
this.internalResBar = null;
this.brightnessBar = null;
this.scaleBar = null;
this.sampleBar = null;
this.separationBar = null;
this.viewPotential = null;
this.viewPotentialSep = null;
this.viewX = null;
this.viewList = null;
this.viewCount = 0;
this.stateNum = 0;
this.orbitals = null;
this.orbCount = 0;
this.orbListLeft = null;
this.orbListRight = null;
this.orbListCenter = null;
this.orbCountOffset = 0;
this.orbCountCenter = 0;
this.evalues = null;
this.basisCount = 0;
this.changingDerivedStates = false;
this.dragZoomStart = 0;
this.zoom = 0;
this.rotmatrix = null;
this.sep2 = 0;
this.colorMult = 0;
this.viewAxes = null;
this.xpoints = null;
this.ypoints = null;
this.selectedPaneHandle = 0;
this.func = null;
this.phaseColors = null;
this.resadj = 0;
this.dragging = false;
this.imageSource = null;
this.pixels = null;
this.sampleCount = 0;
this.dataSize = 0;
this.modes = null;
this.pause = 0;
this.applet = null;
this.selection = -1;
this.slicerPoints = null;
this.sliceFaces = null;
this.sliceFace = null;
this.sliceFaceCount = 0;
this.sliceval = 0;
this.sampleMult = null;
this.selectedSlice = false;
this.settingScale = false;
this.magDragStart = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.t = 0;
this.phiIndex = 0;
this.manualScale = false;
this.gray2 = null;
this.fontMetrics = null;
this.cv = null;
this.useBufferedImage = false;
this.precount = 0;
this.scaleValue = -1;
this.sepValue = -1;
if (!Clazz.isClassDefined ("test.falstad.MOViewerFrame.Orbital")) {
test.falstad.MOViewerFrame.$MOViewerFrame$Orbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.MOViewerFrame.SOrbital")) {
test.falstad.MOViewerFrame.$MOViewerFrame$SOrbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.MOViewerFrame.MZeroOrbital")) {
test.falstad.MOViewerFrame.$MOViewerFrame$MZeroOrbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.MOViewerFrame.ReImOrbital")) {
test.falstad.MOViewerFrame.$MOViewerFrame$ReImOrbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.MOViewerFrame.Complex")) {
test.falstad.MOViewerFrame.$MOViewerFrame$Complex$ ();
}
if (!Clazz.isClassDefined ("test.falstad.MOViewerFrame.PhaseColor")) {
test.falstad.MOViewerFrame.$MOViewerFrame$PhaseColor$ ();
}
if (!Clazz.isClassDefined ("test.falstad.MOViewerFrame.View")) {
test.falstad.MOViewerFrame.$MOViewerFrame$View$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "MOViewerFrame", java.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.prepareFields (c$, function () {
this.samplesNums = [9, 15, 25, 35, 45, 55];
});
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "MOViewer by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.MOViewerFrame, ["Molecular Orbital Viewer v1.5a"]);
this.applet = a;
}, "test.falstad.MOViewer");
Clazz.defineMethod (c$, "init", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
this.gray2 =  new java.awt.Color (127, 127, 127);
var jv = System.getProperty ("java.class.version");
var jvf =  new Double (jv).doubleValue ();
if (jvf >= 48) this.useBufferedImage = true;
var res = 68;
this.setLayout ( new test.falstad.MOViewerLayout ());
this.cv =  new test.falstad.MOViewerCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.add (this.cv);
var mb =  new swingjs.awt.MenuBar ();
var m =  new swingjs.awt.Menu ("File");
mb.add (m);
m.add (this.exitItem = this.getMenuItem ("Exit"));
m =  new swingjs.awt.Menu ("View");
mb.add (m);
m.add (this.eSepCheckItem = this.getCheckItem ("Energy"));
this.eSepCheckItem.setState (true);
m.add (this.xCheckItem = this.getCheckItem ("Position"));
this.xCheckItem.setState (true);
this.xCheckItem.disable ();
m.addSeparator ();
m.add (this.colorCheck = this.getCheckItem ("Phase as Color"));
this.colorCheck.setState (true);
m =  new swingjs.awt.Menu ("Options");
mb.add (m);
m.add (this.nuclearItem = this.getCheckItem ("Include Nuclear E"));
this.nuclearItem.setState (true);
m.add (this.showAtomsItem = this.getCheckItem ("Show Nuclei"));
this.showAtomsItem.setState (true);
m.add (this.dimensionsItem = this.getCheckItem ("Show Dimensions"));
m.add (this.axesItem = this.getCheckItem ("Show Axes"));
this.axesItem.setState (true);
this.setMenuBar (mb);
m =  new swingjs.awt.Menu ("Samples");
mb.add (m);
this.samplesItems =  new Array (6);
m.add (this.samplesItems[0] = this.getCheckItem ("Samples = 9 (fastest)"));
m.add (this.samplesItems[1] = this.getCheckItem ("Samples = 15 (default)"));
m.add (this.samplesItems[2] = this.getCheckItem ("Samples = 25"));
m.add (this.samplesItems[3] = this.getCheckItem ("Samples = 35"));
m.add (this.samplesItems[4] = this.getCheckItem ("Samples = 45"));
m.add (this.samplesItems[5] = this.getCheckItem ("Samples = 55 (best)"));
this.samplesItems[1].setState (true);
var i;
this.stateChooser =  new swingjs.awt.Choice ();
this.stateChooser.add ("sigma g 1s");
this.stateChooser.add ("sigma*u 1s");
this.stateChooser.add ("pi u 2px");
this.stateChooser.add ("pi u 2py");
this.stateChooser.add ("sigma g 2s");
this.stateChooser.add ("sigma g 2pz");
this.stateChooser.add ("sigma*u 2s");
this.stateChooser.add ("pi*g 2px");
this.stateChooser.add ("pi*g 2py");
this.stateChooser.add ("sigma*u 2pz");
this.stateChooser.addItemListener (this);
this.add (this.stateChooser);
this.sliceChooser =  new swingjs.awt.Choice ();
this.sliceChooser.add ("No Slicing");
this.sliceChooser.add ("Show X Slice");
this.sliceChooser.add ("Show Y Slice");
this.sliceChooser.add ("Show Z Slice");
this.sliceChooser.addItemListener (this);
this.add (this.sliceChooser);
this.add ( new swingjs.awt.Label ("Brightness", 0));
this.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 1385, 1, 1000, 1800));
this.brightnessBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Image Resolution", 0));
this.add (this.resolutionBar =  new swingjs.awt.Scrollbar (0, res, 2, 20, 200));
this.resolutionBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Scale", 0));
this.add (this.scaleBar =  new swingjs.awt.Scrollbar (0, 24, 1, 5, 52));
this.scaleBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Separation", 0));
this.add (this.separationBar =  new swingjs.awt.Scrollbar (0, 12, 1, 0, 21));
this.separationBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("http://www.falstad.com"));
try {
var param = this.applet.getParameter ("PAUSE");
if (param != null) this.pause = Integer.parseInt (param);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
var j;
this.phaseColors =  new Array (400);
for (i = 0; i != 8; i++) for (j = 0; j != 50; j++) {
var ang = Math.atan (j / 50);
this.phaseColors[i * 50 + j] = this.genPhaseColor (i, ang);
}

this.slicerPoints =  Clazz.newIntArray (2, 10, 0);
this.sliceFaces =  Clazz.newDoubleArray (4, 3, 0);
this.rotmatrix =  Clazz.newDoubleArray (9, 0);
this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.rotate (-1.5707963267948966, 0);
this.rotate (0, 1.5707963267948966);
this.xpoints =  Clazz.newIntArray (4, 0);
this.ypoints =  Clazz.newIntArray (4, 0);
this.setupSimpson ();
this.random =  new java.util.Random ();
this.readModes ();
this.getEnergyValues ();
this.createOrbitals ();
this.reinit ();
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (java.awt.Color.white);
this.resize (550, 530);
this.handleResize ();
var x = this.getSize ();
var screen = this.getToolkit ().getScreenSize ();
this.setLocation (Clazz.doubleToInt ((screen.width - x.width) / 2), Clazz.doubleToInt ((screen.height - x.height) / 2));
this.show ();
});
Clazz.defineMethod (c$, "setMenuBar", 
 function (mb) {
}, "swingjs.awt.MenuBar");
Clazz.defineMethod (c$, "getMenuItem", 
function (s) {
var mi =  new swingjs.awt.MenuItem (s);
mi.addActionListener (this);
return mi;
}, "~S");
Clazz.defineMethod (c$, "getCheckItem", 
function (s) {
var mi =  new swingjs.awt.CheckboxMenuItem (s);
mi.addItemListener (this);
return mi;
}, "~S");
Clazz.defineMethod (c$, "genPhaseColor", 
function (sec, ang) {
ang += sec * 3.141592653589793 / 4;
ang *= 0.954929658551372;
var hsec = Clazz.doubleToInt (ang);
var a2 = ang % 1;
var a3 = 1. - a2;
var c = null;
switch (hsec) {
case 6:
case 0:
c = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.PhaseColor, this, null, 1, a2, 0);
break;
case 1:
c = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.PhaseColor, this, null, a3, 1, 0);
break;
case 2:
c = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.PhaseColor, this, null, 0, 1, a2);
break;
case 3:
c = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.PhaseColor, this, null, 0, a3, 1);
break;
case 4:
c = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.PhaseColor, this, null, a2, 0, 1);
break;
case 5:
c = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.PhaseColor, this, null, 1, 0, a3);
break;
}
return c;
}, "~N,~N");
Clazz.defineMethod (c$, "setupSimpson", 
function () {
this.sampleCount = 15;
var i;
for (i = 0; i != this.samplesNums.length; i++) {
if (this.samplesItems[i].getState ()) this.sampleCount = this.samplesNums[i];
}
this.sampleMult =  Clazz.newIntArray (this.sampleCount, 0);
for (i = 1; i < this.sampleCount; i += 2) {
this.sampleMult[i] = 4;
this.sampleMult[i + 1] = 2;
}
this.sampleMult[0] = this.sampleMult[this.sampleCount - 1] = 1;
});
Clazz.defineMethod (c$, "handleResize", 
function () {
this.reinit ();
});
Clazz.defineMethod (c$, "reinit", 
function () {
this.setResolution ();
var d = this.winSize = this.cv.getSize ();
if (this.winSize.width == 0) return;
this.dbimage = this.createImage (d.width, d.height);
this.setupDisplay ();
});
Clazz.defineMethod (c$, "setupDisplay", 
function () {
if (this.winSize == null) return;
var potsize = (this.viewPotentialSep == null) ? 100 : this.viewPotentialSep.height;
this.viewX = this.viewPotential = this.viewPotentialSep = null;
this.viewList =  new Array (10);
var i = 0;
if (this.eSepCheckItem.getState ()) this.viewList[i++] = this.viewPotentialSep = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.View, this, null);
if (this.xCheckItem.getState ()) this.viewList[i++] = this.viewX = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.View, this, null);
this.viewCount = i;
var sizenum = this.viewCount;
var toth = this.winSize.height;
if (potsize > 0 && this.viewPotentialSep != null) {
sizenum--;
toth -= potsize;
}toth -= 4 * 2 * (this.viewCount - 1);
var cury = 0;
for (i = 0; i != this.viewCount; i++) {
var v = this.viewList[i];
var h = (sizenum == 0) ? toth : Clazz.doubleToInt (toth / sizenum);
if (v === this.viewPotentialSep && potsize > 0) h = potsize;
v.paneY = cury;
if (cury > 0) cury += 4;
v.x = 0;
v.width = this.winSize.width;
v.y = cury;
v.height = h;
cury += h + 4;
}
this.setSubViews ();
});
Clazz.defineMethod (c$, "setSubViews", 
function () {
var i;
this.pixels = null;
if (this.useBufferedImage) {
try {
var biclass = Clazz._4Name ("java.awt.image.BufferedImage");
var dbiclass = Clazz._4Name ("java.awt.image.DataBufferInt");
var rasclass = Clazz._4Name ("java.awt.image.Raster");
var cstr = biclass.getConstructor ([Number, Number, Number]);
this.memimage = cstr.newInstance ([ new Integer (this.viewX.width),  new Integer (this.viewX.height),  new Integer (1)]);
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
this.pixels =  Clazz.newIntArray (this.viewX.width * this.viewX.height, 0);
for (i = 0; i != this.viewX.width * this.viewX.height; i++) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (this.viewX.width, this.viewX.height, this.pixels, 0, this.viewX.width);
this.imageSource.setAnimated (true);
this.imageSource.setFullBufferUpdates (true);
this.memimage = this.cv.createImage (this.imageSource);
}var asize = Clazz.doubleToInt (this.min (this.viewX.width, this.viewX.height) / 3);
this.viewAxes =  new java.awt.Rectangle (this.viewX.x + this.winSize.width - asize, this.viewX.y, asize, asize);
});
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
Clazz.defineMethod (c$, "setResolution", 
function () {
var og = this.gridSizeX;
this.gridSizeX = this.gridSizeY = (this.resolutionBar.getValue () & -2);
if (og == this.gridSizeX) return;
this.dataSize = this.gridSizeX * 4;
System.out.print ("setResolution " + this.dataSize + " " + this.gridSizeX + "\n");
this.resadj = 50. / this.dataSize;
this.precomputeAll ();
this.func =  Clazz.newDoubleArray (this.gridSizeX, this.gridSizeY, 3, 0);
});
Clazz.defineMethod (c$, "computeView", 
function (normmult) {
var i;
var j;
var q = 3.14159265 / this.dataSize;
var color = this.colorCheck.getState ();
for (i = 0; i != this.orbCount; i++) this.orbitals[i].setupFrame (normmult);

var izoom = 1 / this.zoom;
var rotm = this.rotmatrix;
var aratio = this.viewX.width / this.viewX.height;
var xmult = this.dataSize / 2.;
var ymult = this.dataSize / 2.;
var zmult = this.dataSize / 2.;
var aratiox = izoom;
var aratioy = izoom;
if (aratio < 1) aratioy /= aratio;
 else aratiox *= aratio;
var slice = this.sliceChooser.getSelectedIndex ();
var boundRadius2 = 1.22;
boundRadius2 *= boundRadius2;
var scalemult = this.scaleBar.getValue () / 50.;
var sep = this.sep2 * .5 / (zmult * scalemult * this.resadj);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var camvx0 = (2 * i / this.gridSizeX - 1) * aratiox;
var camvy0 = -(2 * j / this.gridSizeY - 1) * aratioy;
var camx = rotm[2] * test.falstad.MOViewerFrame.viewDistance;
var camy = rotm[5] * test.falstad.MOViewerFrame.viewDistance;
var camz = rotm[8] * test.falstad.MOViewerFrame.viewDistance;
var camvx = rotm[0] * camvx0 + rotm[1] * camvy0 - rotm[2];
var camvy = rotm[3] * camvx0 + rotm[4] * camvy0 - rotm[5];
var camvz = rotm[6] * camvx0 + rotm[7] * camvy0 - rotm[8];
var camnorm = Math.sqrt (camvx0 * camvx0 + camvy0 * camvy0 + 1);
var n;
var simpr = 0;
var simpg = 0;
var a = camvx * camvx + camvy * camvy + camvz * camvz;
var b = 2 * (camvx * camx + camvy * camy + camvz * camz);
var c = camx * camx + camy * camy + camz * camz - boundRadius2;
var discrim = b * b - 4 * a * c;
this.func[i][j][0] = this.func[i][j][1] = this.func[i][j][2] = 0;
if (discrim < 0) {
this.fillSquare (i, j, 0, 0, 0);
continue;
}discrim = Math.sqrt (discrim);
var mint = (-b - discrim) / (2 * a);
var maxt = (-b + discrim) / (2 * a);
if (slice != 0) {
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
var maxn = this.sampleCount - 1;
n = 1;
var xx = (camx + camvx * mint) * xmult;
var yy = (camy + camvy * mint) * ymult;
var zz = (camz + camvz * mint) * zmult;
if (slice != 0) {
maxn = 1;
n = 0;
pathlen = 2;
if (xx > xmult || yy > ymult || zz > zmult || xx < -xmult || yy < -ymult || zz < -zmult) {
this.fillSquare (i, j, 0, 0, 0);
continue;
}}camvx *= tstep * xmult;
camvy *= tstep * ymult;
camvz *= tstep * zmult;
var dshalf = Clazz.doubleToInt (this.dataSize / 2);
var oi;
var msep = sep * zmult;
for (; n < maxn; n++) {
var xy2 = xx * xx + yy * yy;
var zz1 = zz + msep;
var r = Math.sqrt (xy2 + zz1 * zz1);
var costh = zz1 / r;
var ri = Clazz.doubleToInt (r);
var costhi = Clazz.doubleToInt (costh * dshalf + dshalf);
var fr = 0;
this.calcPhiComponent (xx, yy);
for (oi = 0; oi != this.orbCountOffset; oi++) {
var oo = this.orbListLeft[oi];
fr += oo.computePoint (ri, costhi);
}
var zz2 = zz - msep;
r = Math.sqrt (xy2 + zz2 * zz2);
costh = zz2 / r;
ri = Clazz.doubleToInt (r);
costhi = Clazz.doubleToInt (costh * dshalf + dshalf);
for (oi = 0; oi != this.orbCountOffset; oi++) {
var oo = this.orbListRight[oi];
fr += oo.computePoint (ri, costhi);
}
if (this.orbCountCenter != 0) {
r = Math.sqrt (xy2 + zz * zz);
costh = zz / r;
ri = Clazz.doubleToInt (r);
costhi = Clazz.doubleToInt (costh * dshalf + dshalf);
for (oi = 0; oi != this.orbCountCenter; oi++) {
var oo = this.orbListCenter[oi];
fr += oo.computePoint (ri, costhi);
}
}var fv = fr * fr * this.sampleMult[n];
if (color) {
if (fr > 0) simpr += fv;
 else simpg += fv;
} else {
simpr = (simpg += fv);
}xx += camvx;
yy += camvy;
zz += camvz;
}
simpr *= pathlen / n;
simpg *= pathlen / n;
this.fillSquare (i, j, simpr, simpg, simpg);
}

}, "~N");
Clazz.defineMethod (c$, "fillSquare", 
function (i, j, cr, cg, cb) {
var winw = this.viewX.width;
var winh = this.viewX.height;
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
var y2l = y2 * this.viewX.width;
for (k = x; k < x2; k++) for (l = y * this.viewX.width; l < y2l; l += this.viewX.width) this.pixels[k + l] = 0xFF000000;


return;
}var fm = this.max (cr, this.max (cg, cb));
if (fm > 255) {
fm /= 255;
cr /= fm;
cg /= fm;
cb /= fm;
}var colval = 0xFF000000 + ((Clazz.floatToInt (cr)) << 16) | ((Clazz.floatToInt (cg)) << 8) | ((Clazz.floatToInt (cb)));
var y2l = y2 * this.viewX.width;
for (k = x; k < x2; k++) for (l = y * this.viewX.width; l < y2l; l += this.viewX.width) this.pixels[k + l] = colval;


}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getPhaseColor", 
function (x, y) {
var val = 0;
if (x == 0 && y == 0) return this.phaseColors[0];
var offset = 0;
if (y >= 0) {
if (x >= 0) {
if (x >= y) {
offset = 0;
val = y / x;
} else {
offset = 50;
val = 1 - x / y;
}} else {
if (-x <= y) {
offset = 100;
val = -x / y;
} else {
offset = 150;
val = 1 + y / x;
}}} else {
if (x <= 0) {
if (y >= x) {
offset = 200;
val = y / x;
} else {
offset = 250;
val = 1 - x / y;
}} else {
if (-y >= x) {
offset = 300;
val = -x / y;
} else {
offset = 350;
val = 1 + y / x;
}}}return this.phaseColors[offset + Clazz.doubleToInt (val * (49))];
}, "~N,~N");
Clazz.defineMethod (c$, "calcPhiComponent", 
function (x, y) {
var phiSector = 0;
var val = 0;
if (x == 0 && y == 0) {
this.phiIndex = 0;
return;
}if (y >= 0) {
if (x >= 0) {
if (x >= y) {
phiSector = 0;
val = y / x;
} else {
phiSector = 1;
val = 1 - x / y;
}} else {
if (-x <= y) {
phiSector = 2;
val = -x / y;
} else {
phiSector = 3;
val = 1 + y / x;
}}} else {
if (x <= 0) {
if (y >= x) {
phiSector = 4;
val = y / x;
} else {
phiSector = 5;
val = 1 - x / y;
}} else {
if (-y >= x) {
phiSector = 6;
val = -x / y;
} else {
phiSector = 7;
val = 1 + y / x;
}}}this.phiIndex = (phiSector * (this.dataSize + 1)) + Clazz.doubleToInt (val * this.dataSize);
}, "~N,~N");
Clazz.defineMethod (c$, "getCodeBase", 
function () {
try {
if (this.applet != null) return this.applet.getCodeBase ();
var f =  new java.io.File (".");
return  new java.net.URL ("file:" + f.getCanonicalPath () + "/");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
return null;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "readModes", 
function () {
try {
var url =  new java.net.URL (this.getCodeBase () + "states.txt");
var o = url.getContent ();
var fis = o;
var b =  Clazz.newByteArray (42000, 0);
var off = 0;
while (true) {
var n = fis.read (b, off, 2048);
if (n <= 0) break;
off += n;
}
var len = off;
var p;
var mm = 0;
this.modes =  Clazz.newFloatArray (10101, 0);
for (p = 0; p < len; ) {
var l;
for (l = 0; l != len - p; l++) if (b[l + p] == 10) {
l++;
break;
}
var line =  String.instantialize (b, p, l - 1);
var st =  new java.util.StringTokenizer (line);
while (st.hasMoreTokens ()) this.modes[mm++] =  new Float (st.nextToken ()).floatValue ();

p += l;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "precomputeAll", 
function () {
var i;
for (i = 0; i != this.orbCount; i++) {
var orb = this.orbitals[i];
orb.precompute ();
}
this.sep2 = this.separationBar.getValue () / 2.;
if (this.sep2 < 0) this.sep2 = 0;
if (this.sep2 > 10) this.sep2 = 10;
var ma = 0;
for (; ; ma++) {
if (this.modes[ma] == 99999) break;
if (this.modes[ma] == 99000 + this.sep2) break;
}
if (this.modes[ma] == 99999) return;
ma++;
this.stateNum = 0;
this.orbitals[4].setReal ();
this.orbitals[5].setReal ();
this.orbitals[9].setReal ();
switch (this.stateChooser.getSelectedIndex ()) {
case 0:
this.stateNum = 0;
break;
case 1:
this.stateNum = 1;
break;
case 2:
this.stateNum = 2;
break;
case 3:
this.stateNum = 2;
this.orbitals[4].setIm ();
this.orbitals[5].setIm ();
this.orbitals[9].setIm ();
break;
case 4:
this.stateNum = 3;
break;
case 5:
this.stateNum = 4;
break;
case 6:
this.stateNum = 5;
break;
case 7:
this.stateNum = 6;
break;
case 8:
this.stateNum = 6;
this.orbitals[4].setIm ();
this.orbitals[5].setIm ();
this.orbitals[9].setIm ();
break;
case 9:
this.stateNum = 7;
break;
}
for (i = 0; i != this.orbCount; i++) this.orbitals[i].used = false;

while (this.modes[ma] < 99000 && this.modes[ma] != this.stateNum) ma += 59;

if (this.modes[ma] >= 99000) return;
ma++;
this.sep2 = this.modes[ma++];
var sgn = 1;
if (this.sep2 < 0) {
this.sep2 = -this.sep2;
sgn = -1;
}ma++;
this.precount = 0;
this.orbitals[0].precomputeR (1, 1, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR (1, 1, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR (1.5, 1, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR (1.5, 1, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR (2, 1, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR (2, 1, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR (.4, 1, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR (.4, 1, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR (.7, 1, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR (.7, 1, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR (1, 2, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR (1, 2, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR (1.5, 2, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR (1.5, 2, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR (2, 2, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR (2, 2, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR (.4, 2, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR (.4, 2, sgn * this.modes[ma++]);
this.orbitals[0].precomputeR (.7, 2, sgn * this.modes[ma++]);
this.orbitals[1].precomputeR (.7, 2, sgn * this.modes[ma++]);
this.orbitals[4].precomputeR (1, 2, sgn * this.modes[ma++]);
this.orbitals[5].precomputeR (1, 2, sgn * this.modes[ma++]);
this.orbitals[4].precomputeR (1.5, 2, sgn * this.modes[ma++]);
this.orbitals[5].precomputeR (1.5, 2, sgn * this.modes[ma++]);
this.orbitals[4].precomputeR (2, 2, sgn * this.modes[ma++]);
this.orbitals[5].precomputeR (2, 2, sgn * this.modes[ma++]);
this.orbitals[4].precomputeR (.4, 2, sgn * this.modes[ma++]);
this.orbitals[5].precomputeR (.4, 2, sgn * this.modes[ma++]);
this.orbitals[4].precomputeR (.7, 2, sgn * this.modes[ma++]);
this.orbitals[5].precomputeR (.7, 2, sgn * this.modes[ma++]);
this.orbitals[2].precomputeR (1, 2, sgn * this.modes[ma++]);
this.orbitals[3].precomputeR (1, 2, sgn * this.modes[ma++]);
this.orbitals[2].precomputeR (1.5, 2, sgn * this.modes[ma++]);
this.orbitals[3].precomputeR (1.5, 2, sgn * this.modes[ma++]);
this.orbitals[2].precomputeR (2, 2, sgn * this.modes[ma++]);
this.orbitals[3].precomputeR (2, 2, sgn * this.modes[ma++]);
this.orbitals[2].precomputeR (.4, 2, sgn * this.modes[ma++]);
this.orbitals[3].precomputeR (.4, 2, sgn * this.modes[ma++]);
this.orbitals[2].precomputeR (.7, 2, sgn * this.modes[ma++]);
this.orbitals[3].precomputeR (.7, 2, sgn * this.modes[ma++]);
this.orbitals[6].precomputeR (1.5, 1, sgn * this.modes[ma++]);
this.orbitals[6].precomputeR (2, 1, sgn * this.modes[ma++]);
this.orbitals[6].precomputeR (1.5, 2, sgn * this.modes[ma++]);
this.orbitals[6].precomputeR (2, 2, sgn * this.modes[ma++]);
this.orbitals[7].precomputeR (1.5, 2, sgn * this.modes[ma++]);
this.orbitals[7].precomputeR (2, 2, sgn * this.modes[ma++]);
this.orbitals[7].precomputeR (1.5, 3, sgn * this.modes[ma++]);
this.orbitals[7].precomputeR (2, 3, sgn * this.modes[ma++]);
this.orbitals[8].precomputeR (1.5, 3, sgn * this.modes[ma++]);
this.orbitals[8].precomputeR (2, 3, sgn * this.modes[ma++]);
this.orbitals[9].precomputeR (1.5, 3, -sgn * this.modes[ma++]);
this.orbitals[9].precomputeR (2, 3, -sgn * this.modes[ma++]);
this.orbitals[7].precomputeR (1.5, 4, sgn * this.modes[ma++]);
this.orbitals[7].precomputeR (2, 4, sgn * this.modes[ma++]);
this.orbitals[10].precomputeR (1.5, 4, sgn * this.modes[ma++]);
this.orbitals[10].precomputeR (2, 4, sgn * this.modes[ma++]);
this.orbCountOffset = this.orbCountCenter = 0;
this.orbListLeft =  new Array (3);
this.orbListRight =  new Array (3);
this.orbListCenter =  new Array (5);
for (i = 0; i != 6; i += 2) {
if (this.orbitals[i].used) {
this.orbListLeft[this.orbCountOffset] = this.orbitals[i];
this.orbListRight[this.orbCountOffset] = this.orbitals[i + 1];
this.orbCountOffset++;
}}
for (i = 6; i != 11; i++) {
if (this.orbitals[i].used) {
this.orbListCenter[this.orbCountCenter] = this.orbitals[i];
this.orbCountCenter++;
}}
});
Clazz.defineMethod (c$, "getEnergyValues", 
function () {
var ma = 0;
this.evalues =  Clazz.newDoubleArray (21, 8, 0);
while (this.modes[ma] != 99999) {
var s = Clazz.floatToInt ((this.modes[ma] - 99000) * 2);
ma++;
while (this.modes[ma] < 99000) {
this.evalues[s][Clazz.floatToInt (this.modes[ma])] = this.modes[ma + 2];
ma += 59;
}
}
});
Clazz.defineMethod (c$, "sign", 
function (x) {
return x < 0 ? -1 : 1;
}, "~N");
Clazz.overrideMethod (c$, "paint", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateMOViewer", 
function (realg) {
var g = null;
if (this.winSize == null || this.winSize.width == 0) return;
g = this.dbimage.getGraphics ();
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
if (this.fontMetrics == null) this.fontMetrics = g.getFontMetrics ();
var sliced = this.sliceChooser.getSelectedIndex () != 0;
this.zoom = (sliced) ? 8 : 16.55;
this.colorMult = Math.exp (this.brightnessBar.getValue () / 100. - 2);
this.computeView (1);
var i;
var j;
var k;
for (i = 1; i != this.viewCount; i++) {
g.setColor (i == this.selectedPaneHandle ? java.awt.Color.yellow : java.awt.Color.gray);
g.drawLine (0, this.viewList[i].paneY, this.winSize.width, this.viewList[i].paneY);
}
if (this.viewPotential != null) {
var sno = Clazz.doubleToInt (this.sep2 - 1);
var ymult = this.viewPotential.height * 1.9;
g.setColor (java.awt.Color.darkGray);
var floory = this.viewPotential.y + Clazz.doubleToInt (this.viewPotential.height / 2);
for (i = 0; i != 21; i++) {
var e = this.evalues[sno][i];
var y = floory - Clazz.doubleToInt (ymult * e);
g.drawLine (0, y, this.winSize.width, y);
}
var xp = this.getScaler ();
}if (this.viewPotentialSep != null) {
var floory = this.viewPotentialSep.y + Clazz.doubleToInt (this.viewPotentialSep.height / 2);
var ymult = this.viewPotentialSep.height;
if (this.nuclearItem.getState ()) {
ymult *= .7;
} else {
ymult *= .5;
floory = this.viewPotentialSep.y;
}for (i = 0; i != 8; i++) this.drawEnergyLine (g, i, floory, ymult);

this.drawEnergyLine (g, this.stateNum, floory, ymult);
g.setColor (java.awt.Color.yellow);
var xx = Clazz.doubleToInt (this.sep2 * this.winSize.width / 10);
g.drawLine (xx, this.viewPotentialSep.y, xx, this.viewPotentialSep.y + this.viewPotentialSep.height - 1);
}if (this.imageSource != null) this.imageSource.newPixels ();
g.drawImage (this.memimage, this.viewX.x, this.viewX.y, null);
if (this.showAtomsItem.getState ()) {
var scalemult = this.scaleBar.getValue () / 50.;
var zmult = this.dataSize / 2.;
var sep = this.sep2 * .5 / (zmult * scalemult * this.resadj);
g.setColor (java.awt.Color.yellow);
this.map3d (0, 0, sep, this.xpoints, this.ypoints, 0, this.viewX);
g.drawOval (this.xpoints[0] - 2, this.ypoints[0] - 2, 4, 4);
this.map3d (0, 0, -sep, this.xpoints, this.ypoints, 0, this.viewX);
g.drawOval (this.xpoints[0] - 2, this.ypoints[0] - 2, 4, 4);
}g.setColor (java.awt.Color.white);
if (sliced) this.drawCube (g, false);
if (this.axesItem.getState ()) this.drawAxes (g);
g.setColor (java.awt.Color.yellow);
if (this.dimensionsItem.getState ()) {
var w = this.sep2 * 52.9463;
this.centerString (g, "Separation = " + Clazz.doubleToInt (w) + " pm (" + this.sep2 + " a0)", this.viewX.y + this.viewX.height - 5);
}realg.drawImage (this.dbimage, 0, 0, this);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "drawEnergyLine", 
function (g, i, floory, ymult) {
var ox = -1;
var oy = -1;
g.setColor (this.stateNum == i ? java.awt.Color.yellow : java.awt.Color.darkGray);
var j;
for (j = 0; j != 21; j++) {
var xx = Clazz.doubleToInt (j * this.winSize.width / 20);
var ne = 0;
if (this.nuclearItem.getState ()) ne = (j == 0) ? 10 : 1 / (j * .5);
var yy = floory - Clazz.doubleToInt (ymult * (this.evalues[j][i] + ne));
if (ox != -1) g.drawLine (ox, oy, xx, yy);
ox = xx;
oy = yy;
}
}, "java.awt.Graphics,~N,~N,~N");
Clazz.defineMethod (c$, "getScaler", 
function () {
var scalex = this.viewX.width * this.zoom / 2;
var scaley = this.viewX.height * this.zoom / 2;
var aratio = this.viewX.width / this.viewX.height;
if (aratio < 1) scaley *= aratio;
 else scalex /= aratio;
var xp = 2 * scalex / test.falstad.MOViewerFrame.viewDistance;
var mult = this.scaleBar.getValue () / 50.;
xp /= 50 * mult;
xp = 1 / xp;
return xp;
});
Clazz.defineMethod (c$, "centerString", 
function (g, str, ypos) {
g.drawString (str, Clazz.doubleToInt ((this.winSize.width - this.fontMetrics.stringWidth (str)) / 2), ypos);
}, "java.awt.Graphics,~S,~N");
Clazz.defineMethod (c$, "visibleFace", 
function (nx, ny, nz) {
var viewx = test.falstad.MOViewerFrame.viewDistance * this.rotmatrix[2];
var viewy = test.falstad.MOViewerFrame.viewDistance * this.rotmatrix[5];
var viewz = test.falstad.MOViewerFrame.viewDistance * this.rotmatrix[8];
return (nx - viewx) * nx + (ny - viewy) * ny + (nz - viewz) * nz < 0;
}, "~N,~N,~N");
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
this.map3d (pts[0], pts[1], pts[2], this.xpoints, this.ypoints, n, this.viewX);
}
g.setColor (java.awt.Color.gray);
g.drawPolygon (this.xpoints, this.ypoints, 4);
if (slice != 0 && Clazz.doubleToInt (i / 2) != slice - 1) {
if (this.selectedSlice) g.setColor (java.awt.Color.yellow);
var coord1 = (slice == 1) ? 1 : 0;
var coord2 = (slice == 3) ? 1 : 2;
this.computeFace (i, 0, pts);
pts[slice - 1] = this.sliceval;
this.map3d (pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp, this.viewX);
this.computeFace (i, 2, pts);
pts[slice - 1] = this.sliceval;
this.map3d (pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp + 1, this.viewX);
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
Clazz.defineMethod (c$, "drawAxes", 
function (g) {
g.setColor (java.awt.Color.white);
var d = .5;
this.map3d (0, 0, 0, this.xpoints, this.ypoints, 0, this.viewAxes);
this.map3d (d, 0, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow (g, "x", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
this.map3d (0, d, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow (g, "y", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
this.map3d (0, 0, d, this.xpoints, this.ypoints, 1, this.viewAxes);
this.drawArrow (g, "z", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "drawArrow", 
function (g, text, x1, y1, x2, y2) {
this.drawArrow (g, text, x1, y1, x2, y2, 5);
}, "java.awt.Graphics,~S,~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawArrow", 
function (g, text, x1, y1, x2, y2, as) {
g.drawLine (x1, y1, x2, y2);
var l = Math.sqrt ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
if (l > Clazz.doubleToInt (as / 2)) {
var hatx = (x2 - x1) / l;
var haty = (y2 - y1) / l;
g.drawLine (x2, y2, Clazz.doubleToInt (haty * as - hatx * as + x2), Clazz.doubleToInt (-hatx * as - haty * as + y2));
g.drawLine (x2, y2, Clazz.doubleToInt (-haty * as - hatx * as + x2), Clazz.doubleToInt (hatx * as - haty * as + y2));
if (text != null) g.drawString (text, Clazz.doubleToInt (x2 + hatx * 10), Clazz.doubleToInt (y2 + haty * 10));
}}, "java.awt.Graphics,~S,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "map3d", 
function (x, y, z, xpoints, ypoints, pt, v) {
var rotm = this.rotmatrix;
var realx = x * rotm[0] + y * rotm[3] + z * rotm[6];
var realy = x * rotm[1] + y * rotm[4] + z * rotm[7];
var realz = test.falstad.MOViewerFrame.viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
var scalex = v.width * this.zoom / 2;
var scaley = v.height * this.zoom / 2;
var aratio = v.width / v.height;
if (aratio < 1) scaley *= aratio;
 else scalex /= aratio;
xpoints[pt] = v.x + Clazz.doubleToInt (v.width / 2) + Clazz.doubleToInt (scalex * realx / realz);
ypoints[pt] = v.y + Clazz.doubleToInt (v.height / 2) - Clazz.doubleToInt (scaley * realy / realz);
}, "~N,~N,~N,~A,~A,~N,java.awt.Rectangle");
Clazz.defineMethod (c$, "unmap3d", 
function (x3, x, y, pn, pp) {
var scalex = this.viewX.width * this.zoom / 2;
var scaley = this.viewX.height * this.zoom / 2;
var aratio = this.viewX.width / this.viewX.height;
if (aratio < 1) scaley *= aratio;
 else scalex /= aratio;
var vx = (x - (this.viewX.x + Clazz.doubleToInt (this.viewX.width / 2))) / scalex;
var vy = -(y - (this.viewX.y + Clazz.doubleToInt (this.viewX.height / 2))) / scaley;
var rotm = this.rotmatrix;
var mx = test.falstad.MOViewerFrame.viewDistance * rotm[2];
var my = test.falstad.MOViewerFrame.viewDistance * rotm[5];
var mz = test.falstad.MOViewerFrame.viewDistance * rotm[8];
var mvx = (vx * rotm[0] + vy * rotm[1] - rotm[2]);
var mvy = (vx * rotm[3] + vy * rotm[4] - rotm[5]);
var mvz = (vx * rotm[6] + vy * rotm[7] - rotm[8]);
var t = ((pp[0] - mx) * pn[0] + (pp[1] - my) * pn[1] + (pp[2] - mz) * pn[2]) / (pn[0] * mvx + pn[1] * mvy + pn[2] * mvz);
x3[0] = mx + mvx * t;
x3[1] = my + mvy * t;
x3[2] = mz + mvz * t;
}, "~A,~N,~N,~A,~A");
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
if (e.getSource () === this.exitItem) {
this.applet.destroyFrame ();
return;
}this.cv.repaint ();
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.scaleBar) {
if (this.scaleBar.getValue () == this.scaleValue) return;
this.scaleValue = this.scaleBar.getValue ();
this.precomputeAll ();
this.manualScale = true;
}if (e.getSource () === this.separationBar) {
if (this.separationBar.getValue () == this.sepValue) return;
this.sepValue = this.separationBar.getValue ();
this.precomputeAll ();
}if (e.getSource () === this.resolutionBar) this.setResolution ();
this.setupSimpson ();
this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.dragging = true;
this.changingDerivedStates = false;
this.edit (e);
this.dragX = e.getX ();
this.dragY = e.getY ();
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
if (this.dragging) return;
var x = e.getX ();
var y = e.getY ();
this.dragX = x;
this.dragY = y;
var oldsph = this.selectedPaneHandle;
var olds = this.selection;
var oldss = this.selectedSlice;
this.selectedPaneHandle = -1;
this.selection = 0;
var i;
for (i = 1; i != this.viewCount; i++) {
var dy = y - this.viewList[i].paneY;
if (dy >= -3 && dy <= 3) {
this.selectedPaneHandle = i;
this.selection = 4;
}}
if (this.viewX != null && this.viewX.inside (x, y)) {
this.selection = 2;
this.checkSlice (e.getX (), e.getY ());
} else if (this.viewPotential != null && this.viewPotential.contains (x, y)) {
this.selection = 1;
}if (oldsph != this.selectedPaneHandle || olds != this.selection || oldss != this.selectedSlice) this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
if (!this.dragging && this.selection != 0) {
this.selectedPaneHandle = -1;
this.selection = 0;
this.cv.repaint (this.pause);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.dragX = this.dragStartX = e.getX ();
this.dragY = this.dragStartY = e.getY ();
this.dragZoomStart = this.zoom;
this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if (this.dragging) this.cv.repaint ();
this.dragging = this.changingDerivedStates = false;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (Clazz.instanceOf (e.getItemSelectable (), swingjs.awt.CheckboxMenuItem)) {
var i;
for (i = 0; i != this.samplesNums.length; i++) if (this.samplesItems[i] === e.getItemSelectable ()) break;

if (i != this.samplesNums.length) {
var j;
for (j = 0; j != this.samplesNums.length; j++) this.samplesItems[j].setState (i == j);

this.setupSimpson ();
}this.setupDisplay ();
this.cv.repaint (this.pause);
return;
}if (e.getItemSelectable () === this.stateChooser) this.precomputeAll ();
this.cv.repaint (this.pause);
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.MOViewerFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (this.applet == null) this.dispose ();
 else this.applet.destroyFrame ();
});
Clazz.defineMethod (c$, "edit", 
function (e) {
if (this.selection == 0) return;
var x = e.getX ();
var y = e.getY ();
switch (this.selection) {
case 4:
this.editHandle (y);
break;
case 1:
break;
case 2:
this.editX (x, y);
break;
}
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "editHandle", 
function (y) {
var dy = y - this.viewList[this.selectedPaneHandle].paneY;
var upper = this.viewList[this.selectedPaneHandle - 1];
var lower = this.viewList[this.selectedPaneHandle];
var minheight = 10;
if (upper.height + dy < minheight || lower.height - dy < minheight) return;
upper.height += dy;
lower.height -= dy;
lower.y += dy;
lower.paneY += dy;
this.cv.repaint (this.pause);
this.setSubViews ();
}, "~N");
Clazz.defineMethod (c$, "editX", 
function (x, y) {
var mode = 0;
if (this.selectedSlice) mode = 1;
if (mode == 0) {
var xo = this.dragX - x;
var yo = this.dragY - y;
this.rotate (xo / 40., -yo / 40.);
this.cv.repaint (this.pause);
} else if (mode == 1) {
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
Clazz.defineMethod (c$, "createOrbitals", 
function () {
if (this.orbCount == 11) return;
this.orbCount = 11;
this.orbitals =  new Array (this.orbCount);
this.orbitals[0] = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.SOrbital, this, null);
this.orbitals[1] = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.SOrbital, this, null);
this.orbitals[2] = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.MZeroOrbital, this, null, 1);
this.orbitals[3] = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.MZeroOrbital, this, null, 1);
this.orbitals[4] = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.ReImOrbital, this, null, 1);
this.orbitals[5] = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.ReImOrbital, this, null, 1);
this.orbitals[6] = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.SOrbital, this, null);
this.orbitals[7] = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.MZeroOrbital, this, null, 1);
this.orbitals[8] = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.MZeroOrbital, this, null, 2);
this.orbitals[9] = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.ReImOrbital, this, null, 2);
this.orbitals[10] = Clazz.innerTypeInstance (test.falstad.MOViewerFrame.MZeroOrbital, this, null, 3);
});
Clazz.defineMethod (c$, "plgndr", 
function (l, m, x) {
var fact;
var pll = 0;
var pmm;
var pmmp1;
var somx2;
var i;
var ll;
if (m < 0 || m > l || Math.abs (x) > 1.0) {
System.out.print ("bad arguments in plgndr\n");
}pmm = 1.0;
if (m > 0) {
somx2 = Math.sqrt ((1.0 - x) * (1.0 + x));
fact = 1.0;
for (i = 1; i <= m; i++) {
pmm *= -fact * somx2;
fact += 2.0;
}
}if (l == m) return pmm;
 else {
pmmp1 = x * (2 * m + 1) * pmm;
if (l == (m + 1)) return pmmp1;
 else {
for (ll = (m + 2); ll <= l; ll++) {
pll = (x * (2 * ll - 1) * pmmp1 - (ll + m - 1) * pmm) / (ll - m);
pmm = pmmp1;
pmmp1 = pll;
}
return pll;
}}}, "~N,~N,~N");
Clazz.defineMethod (c$, "hypser", 
function (a, c, z) {
var n;
var fac = 1;
var result = 1;
for (n = 1; n <= 1000; n++) {
fac *= a * z / (n * c);
if (fac == 0) return result;
result += fac;
a++;
c++;
}
System.out.print ("convergence failure in hypser\n");
return 0;
}, "~N,~N,~N");
c$.$MOViewerFrame$Orbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.l = 0;
this.m = 0;
this.reMult = 0;
this.imMult = 0;
this.used = false;
this.dataR = null;
this.dataTh = null;
this.dataPhiR = null;
this.dataPhiI = null;
this.dshalf = 0;
this.brightnessCache = 0;
this.distmult = 4;
Clazz.instantialize (this, arguments);
}, test.falstad.MOViewerFrame, "Orbital");
Clazz.defineMethod (c$, "setupFrame", 
function (a) {
this.reMult = 1;
this.imMult = 0;
}, "~N");
Clazz.defineMethod (c$, "setReal", 
function () {
});
Clazz.defineMethod (c$, "setIm", 
function () {
});
Clazz.defineMethod (c$, "getBoundRadius", 
function (a) {
var b;
var c = 1;
var d = (this.m < 0) ? -this.m : this.m;
var e = 1 / this.sphericalNorm (this.l, d);
e *= e;
e *= a;
for (b = 0; b != this.b$["test.falstad.MOViewerFrame"].dataSize; b++) {
var f = this.dataR[b] * this.dataR[b] * e;
if (f > 32) c = b;
}
return c / (this.b$["test.falstad.MOViewerFrame"].dataSize / 2.);
}, "~N");
Clazz.defineMethod (c$, "getScaleRadius", 
function () {
var a = 1;
var b = -a * a * 2;
var c = this.l * (this.l + 1) * a * a;
var d = .5 * (-b + Math.sqrt (b * b - 4 * c));
return d;
});
Clazz.defineMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.dshalf = Clazz.doubleToInt (this.b$["test.falstad.MOViewerFrame"].dataSize / 2);
var d = this.b$["test.falstad.MOViewerFrame"].scaleBar.getValue () / 50.;
var e = (this.m < 0) ? -this.m : this.m;
var f = Math.pow (-1, this.m);
this.dataR =  Clazz.newFloatArray (this.b$["test.falstad.MOViewerFrame"].dataSize, 0);
if (this.l > 0) {
this.dataTh =  Clazz.newFloatArray (this.b$["test.falstad.MOViewerFrame"].dataSize + 1, 0);
for (a = 0; a != this.b$["test.falstad.MOViewerFrame"].dataSize + 1; a++) {
var g = (a - this.dshalf) / this.dshalf;
this.dataTh[a] = (f * this.b$["test.falstad.MOViewerFrame"].plgndr (this.l, e, g));
}
}if (this.m != 0) {
this.dataPhiR =  Clazz.newFloatArray (8 * (this.b$["test.falstad.MOViewerFrame"].dataSize + 1), 0);
this.dataPhiI =  Clazz.newFloatArray (8 * (this.b$["test.falstad.MOViewerFrame"].dataSize + 1), 0);
var g = 0;
for (a = 0; a != 8; a++) for (b = 0; b <= this.b$["test.falstad.MOViewerFrame"].dataSize; b++, g++) {
var h = a * 3.141592653589793 / 4 + b * (0.7853981633974483) / this.b$["test.falstad.MOViewerFrame"].dataSize;
this.dataPhiR[g] = Math.cos (h * e);
this.dataPhiI[g] = Math.sin (h * e);
}

}this.brightnessCache = 0;
});
Clazz.defineMethod (c$, "precomputeR", 
function (a, b, c) {
if (Math.abs (c) < .06) {
this.b$["test.falstad.MOViewerFrame"].precount++;
return;
}this.used = true;
this.b$["test.falstad.MOViewerFrame"].precount++;
var d;
var e;
var f;
this.dshalf = Clazz.doubleToInt (this.b$["test.falstad.MOViewerFrame"].dataSize / 2);
var g = this.b$["test.falstad.MOViewerFrame"].scaleBar.getValue () / 50.;
var h = (this.m < 0) ? -this.m : this.m;
var i = this.radialNorm (b, this.l, a) * this.sphericalNorm (this.l, h) * c;
for (d = 0; d != this.b$["test.falstad.MOViewerFrame"].dataSize; d++) {
var j = d * this.b$["test.falstad.MOViewerFrame"].resadj + .00000001;
var k = 2 * a * j * g / b;
var l = Math.pow (k, this.l) * i;
this.dataR[d] += (this.b$["test.falstad.MOViewerFrame"].hypser (this.l + 1 - b, 2 * this.l + 2, k) * l * Math.exp (-k / 2));
}
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getBrightness", 
function () {
if (this.brightnessCache != 0) return this.brightnessCache;
var a;
var b = 0;
var c = 0;
var d = (this.m < 0) ? -this.m : this.m;
var e = 1 / this.sphericalNorm (this.l, d);
for (a = 0; a != this.b$["test.falstad.MOViewerFrame"].dataSize; a++) {
var f = this.dataR[a] * e;
f *= f;
b += f * f * a * a;
c += a * a;
}
this.brightnessCache = b / c;
return this.brightnessCache;
});
Clazz.defineMethod (c$, "radialNorm", 
function (a, b, c) {
var d = this.factorial (a + b);
return Math.sqrt (4. * c * c * c * this.factorial (a + b) / (a * a * a * a * this.factorial (a - b - 1))) / this.factorial (2 * b + 1);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "sphericalNorm", 
function (a, b) {
return Math.sqrt ((2 * a + 1) * this.factorial (a - b) / (4 * 3.141592653589793 * this.factorial (a + b)));
}, "~N,~N");
Clazz.defineMethod (c$, "factorial", 
function (a) {
var b = 1;
while (a > 1) b *= a--;

return b;
}, "~N");
c$ = Clazz.p0p ();
};
c$.$MOViewerFrame$SOrbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.MOViewerFrame, "SOrbital", test.falstad.MOViewerFrame.Orbital, null, Clazz.innerTypeInstance (test.falstad.MOViewerFrame.Orbital, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "computePoint", 
function (a, b) {
try {
var c = (a < this.b$["test.falstad.MOViewerFrame"].dataSize) ? this.dataR[a] : 0;
return this.reMult * c;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return 0;
} else {
throw e;
}
}
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$MOViewerFrame$MZeroOrbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.MOViewerFrame, "MZeroOrbital", test.falstad.MOViewerFrame.Orbital, null, Clazz.innerTypeInstance (test.falstad.MOViewerFrame.Orbital, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.MOViewerFrame.MZeroOrbital, []);
this.l = a;
}, "~N");
Clazz.overrideMethod (c$, "computePoint", 
function (a, b) {
try {
var c = (a < this.b$["test.falstad.MOViewerFrame"].dataSize) ? this.dataR[a] * this.dataTh[b] : 0;
return c * this.reMult;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return 0;
} else {
throw e;
}
}
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$MOViewerFrame$ReImOrbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.dataPhi = null;
Clazz.instantialize (this, arguments);
}, test.falstad.MOViewerFrame, "ReImOrbital", test.falstad.MOViewerFrame.Orbital, null, Clazz.innerTypeInstance (test.falstad.MOViewerFrame.Orbital, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.MOViewerFrame.ReImOrbital, []);
this.l = a;
this.m = 1;
}, "~N");
Clazz.overrideMethod (c$, "setReal", 
function () {
this.dataPhi = this.dataPhiR;
});
Clazz.overrideMethod (c$, "setIm", 
function () {
this.dataPhi = this.dataPhiI;
});
Clazz.overrideMethod (c$, "computePoint", 
function (a, b) {
try {
var c = this.dataPhi[this.b$["test.falstad.MOViewerFrame"].phiIndex];
return (a < this.b$["test.falstad.MOViewerFrame"].dataSize) ? this.dataR[a] * this.dataTh[b] * c * 1.4142135 : 0;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return 0;
} else {
throw e;
}
}
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$MOViewerFrame$Complex$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.re = 0;
this.im = 0;
this.mag = 0;
this.phase = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.MOViewerFrame, "Complex");
Clazz.makeConstructor (c$, 
function () {
this.re = this.im = this.mag = this.phase = 0;
});
Clazz.makeConstructor (c$, 
function (a, b) {
this.set (a, b);
}, "~N,~N");
Clazz.defineMethod (c$, "magSquared", 
function () {
return this.mag * this.mag;
});
Clazz.defineMethod (c$, "set", 
function (a, b) {
this.re = a;
this.im = b;
this.setMagPhase ();
}, "~N,~N");
Clazz.defineMethod (c$, "set", 
function (a) {
this.re = a;
this.im = 0;
this.setMagPhase ();
}, "~N");
Clazz.defineMethod (c$, "set", 
function (a) {
this.re = a.re;
this.im = a.im;
this.mag = a.mag;
this.phase = a.phase;
}, "test.falstad.MOViewerFrame.Complex");
Clazz.defineMethod (c$, "add", 
function (a) {
this.re += a;
this.setMagPhase ();
}, "~N");
Clazz.defineMethod (c$, "add", 
function (a, b) {
this.re += a;
this.im += b;
this.setMagPhase ();
}, "~N,~N");
Clazz.defineMethod (c$, "add", 
function (a) {
this.re += a.re;
this.im += a.im;
this.setMagPhase ();
}, "test.falstad.MOViewerFrame.Complex");
Clazz.defineMethod (c$, "square", 
function () {
this.set (this.re * this.re - this.im * this.im, 2 * this.re * this.im);
});
Clazz.defineMethod (c$, "mult", 
function (a, b) {
this.set (this.re * a - this.im * b, this.re * b + this.im * a);
}, "~N,~N");
Clazz.defineMethod (c$, "mult", 
function (a) {
this.re *= a;
this.im *= a;
this.mag *= a;
}, "~N");
Clazz.defineMethod (c$, "mult", 
function (a) {
this.mult (a.re, a.im);
}, "test.falstad.MOViewerFrame.Complex");
Clazz.defineMethod (c$, "setMagPhase", 
function () {
this.mag = Math.sqrt (this.re * this.re + this.im * this.im);
this.phase = Math.atan2 (this.im, this.re);
});
Clazz.defineMethod (c$, "setMagPhase", 
function (a, b) {
this.mag = a;
this.phase = b;
this.re = a * Math.cos (b);
this.im = a * Math.sin (b);
}, "~N,~N");
Clazz.defineMethod (c$, "rotate", 
function (a) {
this.setMagPhase (this.mag, (this.phase + a) % (6.283185307179586));
}, "~N");
Clazz.defineMethod (c$, "conjugate", 
function () {
this.im = -this.im;
this.phase = -this.phase;
});
c$ = Clazz.p0p ();
};
c$.$MOViewerFrame$PhaseColor$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.r = 0;
this.g = 0;
this.b = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.MOViewerFrame, "PhaseColor");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.r = a;
this.g = b;
this.b = c;
}, "~N,~N,~N");
c$ = Clazz.p0p ();
};
c$.$MOViewerFrame$View$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.scale = 0;
this.paneY = 0;
this.pixels = null;
Clazz.instantialize (this, arguments);
}, test.falstad.MOViewerFrame, "View", java.awt.Rectangle);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.MOViewerFrame.View, []);
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
"root2", 1.41421356237309504880,
"root2inv", .70710678118654752440,
"baseEnergy", .55,
"maxModes", 10,
"maxDispCoefs", 8,
"viewDistance", 12,
"SEL_NONE", 0,
"SEL_POTENTIAL", 1,
"SEL_X", 2,
"SEL_STATES", 3,
"SEL_HANDLE", 4,
"MODE_ANGLE", 0,
"MODE_SLICE", 1,
"epsilon", .01,
"panePad", 4,
"phaseColorCount", 50);
});
