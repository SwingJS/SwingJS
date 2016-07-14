Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "$.Rectangle", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.AtomViewerCanvas", "$.AtomViewerLayout", "$.AtomViewerFrame", "$.AtomViewer"], ["java.awt.Color", "$.Dimension", "java.awt.image.MemoryImageSource", "java.lang.Double", "java.util.Random", "javax.swing.ButtonGroup", "$.JRadioButtonMenuItem", "swingjs.awt.Button", "$.Checkbox", "$.CheckboxMenuItem", "$.Choice", "$.Label", "$.Menu", "$.MenuBar", "$.MenuItem", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "AtomViewerCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.AtomViewerCanvas, []);
this.pg = p;
}, "test.falstad.AtomViewerFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateAtomViewer (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateAtomViewer (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "AtomViewerLayout", null, java.awt.LayoutManager);
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
if (Clazz.instanceOf (m, swingjs.awt.Scrollbar)) d.width = barwidth;
if (Clazz.instanceOf (m, swingjs.awt.Choice) && d.width > barwidth) d.width = barwidth;
if (Clazz.instanceOf (m, swingjs.awt.Label)) {
h += Clazz.doubleToInt (d.height / 5);
d.width = barwidth;
}m.setLocation (cw, h);
m.setSize (d.width, d.height);
h += d.height;
}}
}, "java.awt.Container");
c$ = Clazz.decorateAsClass (function () {
this.started = false;
Clazz.instantialize (this, arguments);
}, test.falstad, "AtomViewer", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.AtomViewer.ogf != null) test.falstad.AtomViewer.ogf.dispose ();
test.falstad.AtomViewer.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.AtomViewer.ogf =  new test.falstad.AtomViewerFrame (null);
test.falstad.AtomViewer.ogf.init ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.AtomViewer.ogf == null) {
this.started = true;
test.falstad.AtomViewer.ogf =  new test.falstad.AtomViewerFrame (this);
test.falstad.AtomViewer.ogf.init ();
this.repaint ();
}});
Clazz.overrideMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.AtomViewer.ogf == null) s = "Applet is finished.";
 else test.falstad.AtomViewer.ogf.setVisible (true);
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
if (test.falstad.AtomViewer.ogf != null) test.falstad.AtomViewer.ogf.dispose ();
test.falstad.AtomViewer.ogf = null;
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
this.stoppedCheck = null;
this.colorCheck = null;
this.eCheckItem = null;
this.xCheckItem = null;
this.lCheckItem = null;
this.l2CheckItem = null;
this.rCheckItem = null;
this.alwaysNormItem = null;
this.cubicItem = null;
this.dimensionsItem = null;
this.axesItem = null;
this.autoZoomItem = null;
this.animatedZoomItem = null;
this.samplesItems = null;
this.samplesNums = null;
this.exitItem = null;
this.modeChooser = null;
this.viewChooser = null;
this.sliceChooser = null;
this.nChooser = null;
this.lChooser = null;
this.mChooser = null;
this.speedBar = null;
this.resolutionBar = null;
this.internalResBar = null;
this.brightnessBar = null;
this.scaleBar = null;
this.viewPotential = null;
this.viewX = null;
this.viewL = null;
this.viewL2 = null;
this.viewStates = null;
this.viewRadial = null;
this.viewList = null;
this.viewCount = 0;
this.orbitals = null;
this.orbCount = 0;
this.phasors = null;
this.phasorCount = 0;
this.states = null;
this.stateCount = 0;
this.realBasis = null;
this.n2l1xBasis = null;
this.n2l1yBasis = null;
this.n3l1xBasis = null;
this.n3l1yBasis = null;
this.n3l2xBasis = null;
this.n3l2yBasis = null;
this.n4l1xBasis = null;
this.n4l1yBasis = null;
this.n4l2xBasis = null;
this.n4l2yBasis = null;
this.n4l3xBasis = null;
this.n4l3yBasis = null;
this.n4l3CubicBasis = null;
this.spHybridBasis = null;
this.sp2HybridBasis = null;
this.sp3HybridBasis = null;
this.basisList = null;
this.basisCount = 0;
this.textBoxes = null;
this.textCount = 0;
this.changingDerivedStates = false;
this.$mouseDown = false;
this.dragZoomStart = 0;
this.lastXRot = 0;
this.lastYRot = 0;
this.colorMult = 0;
this.zoom = 0;
this.rotmatrix = null;
this.viewAxes = null;
this.xpoints = null;
this.ypoints = null;
this.selectedPaneHandle = 0;
this.phaseColors = null;
this.resadj = 0;
this.dragging = false;
this.imageSource = null;
this.pixels = null;
this.sampleCount = 0;
this.dataSize = 0;
this.pause = 0;
this.applet = null;
this.selectedState = null;
this.selectedPhasor = null;
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
this.funcr = 0;
this.funci = 0;
this.phiIndex = 0;
this.bestBrightness = 0;
this.userBrightMult = 1;
this.manualScale = false;
this.gray2 = null;
this.fontMetrics = null;
this.cv = null;
this.useBufferedImage = false;
this.useFrame = false;
this.samplesGroup = null;
this.l1xArray = null;
this.l1yArray = null;
this.l2xArray = null;
this.l2yArray = null;
this.l3xArray = null;
this.l3yArray = null;
this.l3CubicArray = null;
this.spHybridArray = null;
this.sp2HybridArray = null;
this.sp3HybridArray = null;
this.spHybridText = null;
this.sp2HybridText = null;
this.sp3HybridText = null;
this.codeLetter = null;
this.l1RealText = null;
this.l2RealText = null;
this.l3RealText = null;
this.l3CubicRealText = null;
this.lastTime = 0;
this.frameLen = 0;
this.scaleValue = -1;
this.finished = false;
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.Orbital")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$Orbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.SOrbital")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$SOrbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.MZeroOrbital")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$MZeroOrbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.PairedOrbital")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$PairedOrbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.Phasor")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$Phasor$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.Complex")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$Complex$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.State")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$State$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.BasisState")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$BasisState$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.DerivedState")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$DerivedState$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.AlternateBasis")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$AlternateBasis$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.PhaseColor")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$PhaseColor$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.View")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$View$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomViewerFrame.TextBox")) {
test.falstad.AtomViewerFrame.$AtomViewerFrame$TextBox$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "AtomViewerFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.prepareFields (c$, function () {
this.samplesNums = [9, 15, 25, 35, 45, 55];
this.l1xArray = [.5, 0, -0.7071067811865476, 0, .5, 0, 0.7071067811865476, 0, 0, 0, -0.7071067811865476, 0, .5, 0, 0.7071067811865476, 0, .5, 0];
this.l1yArray = [.5, 0, 0, -0.7071067811865476, -0.5, 0, 0, -0.7071067811865476, 0, 0, 0, -0.7071067811865476, .5, 0, 0, 0.7071067811865476, -0.5, 0];
this.l2xArray = [0.25, 0, -0.5, 0, 0.6123724356957945, 0, -0.5, 0, 0.25, 0, -0.5, 0, .5, 0, 0, 0, -0.5, 0, .5, 0, 0.6123724356957945, 0, 0, 0, -0.5, 0, 0, 0, 0.6123724356957945, 0, -0.5, 0, -0.5, 0, 0, 0, .5, 0, .5, 0, 0.25, 0, 0.5, 0, 0.6123724356957945, 0, 0.5, 0, 0.25, 0];
this.l2yArray = [0.25, 0, 0, -0.5, -0.6123724356957945, 0, 0, 0.5, 0.25, 0, -0.5, 0, 0, .5, 0, 0, 0, .5, .5, 0, -0.6123724356957945, 0, 0, 0, -0.5, 0, 0, 0, -0.6123724356957945, 0, -0.5, 0, 0, -0.5, 0, 0, 0, -0.5, .5, 0, 0.25, 0, 0, 0.5, -0.6123724356957945, 0, 0, -0.5, 0.25, 0];
this.l3xArray = [0.125, 0, -0.306186, 0, 0.484123, 0, -0.559017, 0, 0.484123, 0, -0.306186, 0, 0.125, 0, -0.306186, 0, 0.5, 0, -0.395285, 0, 0., 0, 0.395285, 0, -0.5, 0, 0.306186, 0, 0.484123, 0, -0.395285, 0, -0.125, 0, 0.433013, 0, -0.125, 0, -0.395285, 0, 0.4841230, 0, 0.559017, 0, 0., 0, -0.433013, 0, 0., 0, 0.433013, 0, 0., 0, -0.559017, 0, 0.484123, 0, 0.395285, 0, -0.125, 0, -0.433013, 0, -0.125, 0, 0.395285, 0, 0.484123, 0, -0.306186, 0, -0.5, 0, -0.395285, 0, 0., 0, 0.395285, 0, 0.5, 0, 0.306186, 0, 0.125, 0, 0.306186, 0, 0.484123, 0, 0.559017, 0, 0.484123, 0, 0.306186, 0, 0.125, 0];
this.l3yArray = [-0.125, 0, 0, 0.306186, 0.484123, 0, 0, -0.559017, -0.484123, 0, 0, 0.306186, 0.125, 0, 0.306186, 0, 0, -0.5, -0.395285, 0, 0., 0, -0.395285, 0, 0, 0.5, 0.306186, 0, -0.484123, 0, 0, 0.395285, -0.125, 0, 0, 0.433013, 0.125, 0, 0, 0.395285, 0.484123, 0, 0, 0.559017, 0., 0, 0, 0.433013, 0., 0, 0, 0.433013, 0., 0, 0, 0.559017, -0.484123, 0, 0, -0.395285, -0.125, 0, 0, -0.433013, 0.125, 0, 0, -0.395285, 0.484123, 0, 0.306186, 0, 0, 0.5, -0.395285, 0, 0., 0, -0.395285, 0, 0, -0.5, 0.306186, 0, -0.125, 0, 0, -0.306186, 0.484123, 0, 0, 0.559017, -0.484123, 0, 0, -0.306186, 0.125, 0];
this.l3CubicArray = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, .559017, 0, 0, 0, -0.433013, 0, 0, 0, .433013, 0, 0, 0, -0.559017, 0, 0, .559017, 0, 0, 0, .433013, 0, 0, 0, .433013, 0, 0, 0, .559017, 0, 0, 0.7071067811865476, 0, 0, 0, 0, 0, 0, 0, 0.7071067811865476, 0, 0, 0, 0, 0, 0, -0.7071067811865476, 0, 0, 0, 0, 0, 0, 0, 0.7071067811865476, 0, 0, .433013, 0, 0, 0, .559017, 0, 0, 0, -0.559017, 0, 0, 0, -0.433013, 0, 0, .433013, 0, 0, 0, -0.559017, 0, 0, 0, -0.559017, 0, 0, 0, .433013];
this.spHybridArray = [-0.7071067811865476, 0, 0, 0, -0.7071067811865476, 0, 0, 0, -0.7071067811865476, 0, 0, 0, 0.7071067811865476, 0, 0, 0, 0, 0, 0.7071067811865476, 0, 0, 0, -0.7071067811865476, 0, 0, 0, 0, -0.7071067811865476, 0, 0, 0, -0.7071067811865476];
this.sp2HybridArray = [-0.57735, 0, .57735, 0, 0, 0, -0.57735, 0, -0.57735, 0, -0.288675, -0.5, 0, 0, .288675, -0.5, -0.57735, 0, -0.288675, .5, 0, 0, .288675, .5, 0, 0, 0, 0, 1, 0, 0, 0];
this.sp3HybridArray = [-0.5, 0, -0.3535533905932738, 0.3535533905932738, -0.5, 0, 0.3535533905932738, 0.3535533905932738, -0.5, 0, 0.3535533905932738, -0.3535533905932738, -0.5, 0, -0.3535533905932738, -0.3535533905932738, -0.5, 0, 0.3535533905932738, 0.3535533905932738, .5, 0, -0.3535533905932738, 0.3535533905932738, -0.5, 0, -0.3535533905932738, -0.3535533905932738, .5, 0, 0.3535533905932738, -0.3535533905932738];
this.spHybridText = ["2sp (1)", "2sp (2)", "2px", "2py"];
this.sp2HybridText = ["2sp2 (1)", "2sp2 (2)", "2sp2 (3)", "2pz"];
this.sp3HybridText = ["2sp3 (1)", "2sp3 (2)", "2sp3 (3)", "2sp3 (4)"];
this.codeLetter = ["s", "p", "d", "f", "g", "h"];
this.l1RealText = ["pz", "px", "py"];
this.l2RealText = ["dz2", "dxz", "dyz", "d(x2-y2)", "dxy"];
this.l3RealText = ["fz3", "fxz2", "fyz2", "fz(x2-y2)", "fxyz", "fx(x2-3y2)", "fy(3x2-y2)"];
this.l3CubicRealText = ["fz3", "fx3", "fy3", "fz(x2-y2)", "fxyz", "fx(z2-y2)", "fy(z2-x2)"];
});
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "AtomViewer by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.AtomViewerFrame, ["Hydrogenic Atom Viewer v1.5b"]);
this.applet = a;
}, "test.falstad.AtomViewer");
Clazz.defineMethod (c$, "init", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
this.gray2 =  new java.awt.Color (127, 127, 127);
var res = 100;
var jv = System.getProperty ("java.class.version");
var jvf =  new Double (jv).doubleValue ();
if (jvf >= 48) this.useBufferedImage = true;
this.setLayout ( new test.falstad.AtomViewerLayout ());
this.cv =  new test.falstad.AtomViewerCanvas (this);
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
m.add (this.eCheckItem = this.getCheckItem ("Energy"));
this.eCheckItem.setState (true);
this.xCheckItem = this.getCheckItem ("Position");
this.xCheckItem.setState (true);
this.xCheckItem.setEnabled (false);
m.add (this.lCheckItem = this.getCheckItem ("Angular Momentum"));
m.add (this.l2CheckItem = this.getCheckItem ("Angular Momentum^2"));
m.add (this.rCheckItem = this.getCheckItem ("Radial Distribution"));
m.addSeparator ();
m.add (this.colorCheck = this.getCheckItem ("Phase as Color"));
this.colorCheck.setState (true);
m =  new swingjs.awt.Menu ("Options");
mb.add (m);
this.alwaysNormItem = this.getCheckItem ("Always Normalize");
m.add (this.cubicItem = this.getCheckItem ("Show Cubic f Orbitals"));
m.add (this.dimensionsItem = this.getCheckItem ("Show Dimensions"));
m.add (this.axesItem = this.getCheckItem ("Show Axes"));
this.axesItem.setState (true);
m.add (this.autoZoomItem = this.getCheckItem ("Auto Scale"));
this.autoZoomItem.setState (true);
m.add (this.animatedZoomItem = this.getCheckItem ("Animated Scaling"));
this.animatedZoomItem.setState (true);
this.setMenuBar (mb);
m =  new swingjs.awt.Menu ("Samples");
mb.add (m);
this.samplesItems =  new Array (6);
m.add (this.samplesItems[0] = this.getRadioItem ("Samples = 9 (fastest)"));
m.add (this.samplesItems[1] = this.getRadioItem ("Samples = 15 (default)"));
m.add (this.samplesItems[2] = this.getRadioItem ("Samples = 25"));
m.add (this.samplesItems[3] = this.getRadioItem ("Samples = 35"));
m.add (this.samplesItems[4] = this.getRadioItem ("Samples = 45"));
m.add (this.samplesItems[5] = this.getRadioItem ("Samples = 55 (best)"));
this.samplesGroup =  new javax.swing.ButtonGroup ();
for (var i = 0; i < 6; i++) {
this.samplesGroup.add (this.samplesItems[i]);
this.samplesItems[i].setActionCommand ("" + this.samplesNums[i]);
}
this.samplesItems[1].setSelected (true);
this.viewChooser =  new swingjs.awt.Choice ();
this.viewChooser.add ("Real Orbitals (chem.)");
this.viewChooser.add ("Complex Orbitals (phys.)");
this.viewChooser.add ("Real Combinations (n=1-4)");
this.viewChooser.add ("Complex Combos (n=1-4)");
this.viewChooser.add ("Multiple Bases (n=2,l=1)");
this.viewChooser.add ("Multiple Bases (n=3,l=1)");
this.viewChooser.add ("Multiple Bases (n=3,l=2)");
this.viewChooser.add ("Multiple Bases (n=4,l=1)");
this.viewChooser.add ("Multiple Bases (n=4,l=2)");
this.viewChooser.add ("Multiple Bases (n=4,l=3)");
this.viewChooser.add ("Hybrid Bases");
this.viewChooser.addItemListener (this);
this.add (this.viewChooser);
var i;
this.nChooser =  new swingjs.awt.Choice ();
for (i = 1; i <= 16; i++) this.nChooser.add ("n = " + i);

this.nChooser.addItemListener (this);
this.add (this.nChooser);
this.nChooser.select (3);
this.lChooser =  new swingjs.awt.Choice ();
this.lChooser.addItemListener (this);
this.add (this.lChooser);
this.mChooser =  new swingjs.awt.Choice ();
this.mChooser.addItemListener (this);
this.add (this.mChooser);
this.sliceChooser =  new swingjs.awt.Choice ();
this.sliceChooser.add ("No Slicing");
this.sliceChooser.add ("Show X Slice");
this.sliceChooser.add ("Show Y Slice");
this.sliceChooser.add ("Show Z Slice");
this.sliceChooser.addItemListener (this);
this.add (this.sliceChooser);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Adjust View");
this.modeChooser.add ("Mouse = Rotate X");
this.modeChooser.add ("Mouse = Rotate Y");
this.modeChooser.add ("Mouse = Rotate Z");
this.modeChooser.addItemListener (this);
this.add (this.modeChooser);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
this.add (this.stoppedCheck);
this.add (this.blankButton =  new swingjs.awt.Button ("Clear"));
this.blankButton.addActionListener (this);
this.add (this.normalizeButton =  new swingjs.awt.Button ("Normalize"));
this.normalizeButton.addActionListener (this);
this.add (this.maximizeButton =  new swingjs.awt.Button ("Maximize"));
this.maximizeButton.addActionListener (this);
this.setNValue ();
this.lChooser.select (3);
this.setLValue ();
this.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 40, 1, 1, 180));
this.speedBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Brightness", 0));
this.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 240, 1, 1, 4000));
this.brightnessBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Image Resolution", 0));
this.add (this.resolutionBar =  new swingjs.awt.Scrollbar (0, res, 2, 20, 300));
this.resolutionBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Scale", 0));
this.add (this.scaleBar =  new swingjs.awt.Scrollbar (0, 75, 1, 5, 1620));
this.scaleBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("http://www.falstad.com", 0));
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
this.rotate (0, -1.5707963267948966);
this.xpoints =  Clazz.newIntArray (4, 0);
this.ypoints =  Clazz.newIntArray (4, 0);
this.setupSimpson ();
this.setupStates ();
this.orbitalChanged ();
this.random =  new java.util.Random ();
this.reinit ();
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (java.awt.Color.white);
this.setSize (580, 500);
this.handleResize ();
var x = this.getSize ();
var screen = this.getToolkit ().getScreenSize ();
this.setLocation (Clazz.doubleToInt ((screen.width - x.width) / 2), Clazz.doubleToInt ((screen.height - x.height) / 2));
this.setVisible (true);
this.setupMenus ();
this.finished = true;
});
Clazz.defineMethod (c$, "setupStates", 
function () {
var maxn = 16;
this.stateCount = Clazz.doubleToInt (maxn * (maxn + 1) * (2 * maxn + 1) / 6);
var i;
this.states =  new Array (this.stateCount);
var n = 1;
var l = 0;
var m = 0;
for (i = 0; i != this.stateCount; i++) {
var bs = this.states[i] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.BasisState, this, null);
bs.elevel = -1 / (2. * n * n);
bs.n = n;
bs.l = l;
bs.m = m;
if (m < l) m++;
 else {
l++;
if (l < n) m = -l;
 else {
n++;
l = m = 0;
}}}
this.basisList =  new Array (17);
this.basisCount = 0;
this.realBasis = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.AlternateBasis, this, null);
var maxRealN = 4;
var realct = this.realBasis.altStateCount = Clazz.doubleToInt (maxRealN * (maxRealN + 1) * (2 * maxRealN + 1) / 6);
this.realBasis.altStates =  new Array (realct);
n = 1;
l = m = 0;
for (i = 0; i != realct; i++) {
var ds = this.realBasis.altStates[i] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.DerivedState, this, null);
ds.basis = this.realBasis;
if (m == 0) {
ds.count = 1;
ds.bstates =  new Array (1);
ds.bstates[0] = this.getState (n, l, 0);
ds.coefs =  new Array (1);
ds.coefs[0] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null, 1, 0);
} else {
var m0 = m - 1;
var realm = Clazz.doubleToInt (m0 / 2) + 1;
ds.count = 2;
ds.bstates =  new Array (2);
ds.bstates[0] = this.getState (n, l, realm);
ds.bstates[1] = this.getState (n, l, -realm);
ds.coefs =  new Array (2);
var mphase = Math.pow (-1, realm);
if ((m0 & 1) == 0) {
ds.coefs[0] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null, mphase * 0.7071067811865476, 0);
ds.coefs[1] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null, 0.7071067811865476, 0);
} else {
ds.coefs[0] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null, 0, mphase * 0.7071067811865476);
ds.coefs[1] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null, 0, -0.7071067811865476);
}}switch (l) {
case 0:
ds.text = n + "s";
break;
case 1:
ds.text = n + this.l1RealText[m];
break;
case 2:
ds.text = n + this.l2RealText[m];
break;
case 3:
ds.text = n + this.l3RealText[m];
break;
}
if (m < l * 2) m++;
 else {
l++;
if (l < n) m = 0;
 else {
n++;
l = m = 0;
}}}
this.n2l1xBasis = this.setupLBasis (2, 1, true, this.l1xArray);
this.n2l1yBasis = this.setupLBasis (2, 1, false, this.l1yArray);
this.n3l1xBasis = this.setupLBasis (3, 1, true, this.l1xArray);
this.n3l1yBasis = this.setupLBasis (3, 1, false, this.l1yArray);
this.n3l2xBasis = this.setupLBasis (3, 2, true, this.l2xArray);
this.n3l2yBasis = this.setupLBasis (3, 2, false, this.l2yArray);
this.n4l1xBasis = this.setupLBasis (4, 1, true, this.l1xArray);
this.n4l1yBasis = this.setupLBasis (4, 1, false, this.l1yArray);
this.n4l2xBasis = this.setupLBasis (4, 2, true, this.l2xArray);
this.n4l2yBasis = this.setupLBasis (4, 2, false, this.l2yArray);
this.n4l3xBasis = this.setupLBasis (4, 3, true, this.l3xArray);
this.n4l3yBasis = this.setupLBasis (4, 3, false, this.l3yArray);
this.n4l3CubicBasis = this.setupLBasis (4, 3, false, this.l3CubicArray);
this.n4l3CubicBasis.n = 0;
this.spHybridBasis = this.setupHybridBasis (this.spHybridArray, this.spHybridText);
this.sp2HybridBasis = this.setupHybridBasis (this.sp2HybridArray, this.sp2HybridText);
this.sp3HybridBasis = this.setupHybridBasis (this.sp3HybridArray, this.sp3HybridText);
});
Clazz.defineMethod (c$, "setupLBasis", 
function (n, l, xAxis, arr) {
var sct = l * 2 + 1;
var basis = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.AlternateBasis, this, null);
basis.n = n;
basis.l = l;
basis.xAxis = xAxis;
var mtext = (xAxis) ? "mx" : "my";
basis.altStates =  new Array (sct);
basis.altStateCount = sct;
var i;
for (i = 0; i != sct; i++) {
var ds = basis.altStates[i] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.DerivedState, this, null);
ds.basis = basis;
ds.count = sct;
ds.bstates =  new Array (sct);
ds.coefs =  new Array (sct);
ds.m = i - l;
var j;
for (j = 0; j != sct; j++) {
ds.bstates[j] = this.getState (n, l, j - l);
ds.coefs[j] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null);
}
if (arr === this.l3CubicArray) ds.text = "4" + this.l3CubicRealText[i];
 else ds.text = "n = " + n + ", l = " + l + ", " + mtext + " = " + ds.m;
}
var ap = 0;
for (i = 0; i != sct; i++) {
var j;
for (j = 0; j != sct; j++) {
basis.altStates[i].coefs[j].set (arr[ap], arr[ap + 1]);
ap += 2;
}
}
return basis;
}, "~N,~N,~B,~A");
Clazz.defineMethod (c$, "setupHybridBasis", 
function (arr, names) {
var sct = 4;
var basis = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.AlternateBasis, this, null);
basis.altStates =  new Array (sct);
basis.altStateCount = sct;
var i;
for (i = 0; i != sct; i++) {
var ds = basis.altStates[i] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.DerivedState, this, null);
ds.basis = basis;
ds.count = sct;
ds.bstates =  new Array (sct);
ds.coefs =  new Array (sct);
ds.text = names[i];
var j;
ds.bstates[0] = this.getState (2, 0, 0);
ds.coefs[0] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null);
for (j = 0; j != 3; j++) {
ds.bstates[j + 1] = this.getState (2, 1, j - 1);
ds.coefs[j + 1] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null);
}
}
var ap = 0;
for (i = 0; i != sct; i++) {
var j;
for (j = 0; j != sct; j++) {
basis.altStates[i].coefs[j].set (arr[ap], arr[ap + 1]);
ap += 2;
}
}
return basis;
}, "~A,~A");
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
Clazz.defineMethod (c$, "getRadioItem", 
function (s) {
var mi =  new javax.swing.JRadioButtonMenuItem (s);
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
c = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.PhaseColor, this, null, 1, a2, 0);
break;
case 1:
c = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.PhaseColor, this, null, a3, 1, 0);
break;
case 2:
c = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.PhaseColor, this, null, 0, 1, a2);
break;
case 3:
c = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.PhaseColor, this, null, 0, a3, 1);
break;
case 4:
c = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.PhaseColor, this, null, a2, 0, 1);
break;
case 5:
c = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.PhaseColor, this, null, 1, 0, a3);
break;
}
return c;
}, "~N,~N");
Clazz.defineMethod (c$, "setupSimpson", 
function () {
this.sampleCount = Integer.parseInt (this.samplesGroup.getSelection ().getActionCommand ());
System.out.print ("sampleCount = " + this.sampleCount + "\n");
this.sampleMult =  Clazz.newIntArray (this.sampleCount, 0);
for (var i = 1; i < this.sampleCount; i += 2) {
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
Clazz.defineMethod (c$, "setupMenus", 
function () {
switch (this.viewChooser.getSelectedIndex ()) {
case 1:
case 0:
this.nChooser.setVisible (true);
this.lChooser.setVisible (true);
this.mChooser.setVisible (true);
this.modeChooser.setVisible (false);
this.modeChooser.select (0);
this.blankButton.setVisible (false);
this.normalizeButton.setVisible (false);
this.maximizeButton.setVisible (false);
this.alwaysNormItem.setEnabled (false);
break;
default:
this.nChooser.setVisible (false);
this.lChooser.setVisible (false);
this.mChooser.setVisible (false);
this.modeChooser.setVisible (true);
this.blankButton.setVisible (true);
this.normalizeButton.setVisible (true);
this.maximizeButton.setVisible (true);
this.alwaysNormItem.setEnabled (true);
break;
}
if (this.viewChooser.getSelectedIndex () == 0) this.cubicItem.setEnabled (true);
 else this.cubicItem.setEnabled (false);
this.validate ();
});
Clazz.defineMethod (c$, "createPhasors", 
function () {
this.phasorCount = this.textCount = 0;
var i;
for (i = 0; i != this.basisCount; i++) this.basisList[i].active = false;

if (this.viewStates == null) return;
var sz = Clazz.doubleToInt (this.viewStates.height / 4);
var x = 0;
var y = this.viewStates.y;
var n = 1;
var l = 0;
var m = 0;
this.textBoxes =  new Array (10);
switch (this.viewChooser.getSelectedIndex ()) {
case 1:
case 0:
break;
case 2:
case 3:
this.phasorCount = 30;
this.phasors =  new Array (this.phasorCount);
for (i = 0; i != this.phasorCount; i++) {
var ph = this.phasors[i] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Phasor, this, null, x, y, sz, sz);
if (this.viewChooser.getSelectedIndex () == 2) ph.state = this.realBasis.altStates[i];
 else ph.state = this.states[i];
x += sz;
if (++m > l) {
x += sz;
l++;
m = -l;
if (l >= n) {
x = 0;
y += sz;
n++;
l = m = 0;
}}}
break;
case 4:
this.phasorCount = 12;
this.phasors =  new Array (this.phasorCount);
i = 0;
i = this.createBasisPhasors (x, y, sz, i, 2, 1);
this.createText ("Lz", x + sz * 3, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n2l1xBasis, 3, 0);
this.createText ("Lx", x + sz * 3, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n2l1yBasis, 3, 0);
this.createText ("Ly", x + sz * 3, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.realBasis, 3, 2);
this.createText ("Real (pz,px,py)", x + sz * 3, y, sz);
break;
case 5:
this.phasorCount = 12;
this.phasors =  new Array (this.phasorCount);
i = 0;
i = this.createBasisPhasors (x, y, sz, i, 3, 1);
this.createText ("Lz", x + sz * 3, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n3l1xBasis, 3, 0);
this.createText ("Lx", x + sz * 3, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n3l1yBasis, 3, 0);
this.createText ("Ly", x + sz * 3, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.realBasis, 3, 6);
this.createText ("Real (pz,px,py)", x + sz * 3, y, sz);
break;
case 6:
this.phasorCount = 20;
this.phasors =  new Array (this.phasorCount);
i = 0;
i = this.createBasisPhasors (x, y, sz, i, 3, 2);
this.createText ("Lz", x + sz * 5, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n3l2xBasis, 5, 0);
this.createText ("Lx", x + sz * 5, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n3l2yBasis, 5, 0);
this.createText ("Ly", x + sz * 5, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.realBasis, 5, 9);
this.createText ("Real", x + sz * 5, y, sz);
break;
case 7:
this.phasorCount = 12;
this.phasors =  new Array (this.phasorCount);
i = 0;
i = this.createBasisPhasors (x, y, sz, i, 4, 1);
this.createText ("Lz", x + sz * 3, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n4l1xBasis, 3, 0);
this.createText ("Lx", x + sz * 3, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n4l1yBasis, 3, 0);
this.createText ("Ly", x + sz * 3, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.realBasis, 3, 15);
this.createText ("Real (pz,px,py)", x + sz * 3, y, sz);
break;
case 8:
this.phasorCount = 20;
this.phasors =  new Array (this.phasorCount);
i = 0;
i = this.createBasisPhasors (x, y, sz, i, 4, 2);
this.createText ("Lz", x + sz * 5, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n4l2xBasis, 5, 0);
this.createText ("Lx", x + sz * 5, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n4l2yBasis, 5, 0);
this.createText ("Ly", x + sz * 5, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.realBasis, 5, 18);
this.createText ("Real", x + sz * 5, y, sz);
break;
case 9:
this.phasorCount = 35;
this.phasors =  new Array (this.phasorCount);
sz = Clazz.doubleToInt (this.viewStates.height / 5);
i = 0;
i = this.createBasisPhasors (x, y, sz, i, 4, 3);
this.createText ("Lz", x + sz * 7, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n4l3xBasis, 7, 0);
this.createText ("Lx", x + sz * 7, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n4l3yBasis, 7, 0);
this.createText ("Ly", x + sz * 7, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.realBasis, 7, 23);
this.createText ("Real (General)", x + sz * 7, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.n4l3CubicBasis, 7, 0);
this.createText ("Real (Cubic)", x + sz * 7, y, sz);
break;
case 10:
sz = Clazz.doubleToInt (this.viewStates.height / 5);
this.phasorCount = 20;
this.phasors =  new Array (this.phasorCount);
i = 0;
i = this.createAltPhasors (x, y, sz, i, this.spHybridBasis, 4, 0);
this.createText ("sp", x + sz * 4, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.sp2HybridBasis, 4, 0);
this.createText ("sp2", x + sz * 4, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.sp3HybridBasis, 4, 0);
this.createText ("sp3", x + sz * 4, y, sz);
y += sz;
this.phasors[i] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Phasor, this, null, x, y, sz, sz);
this.phasors[i++].state = this.getState (2, 0, 0);
i = this.createBasisPhasors (x + sz, y, sz, i, 2, 1);
this.createText ("Lz", x + sz * 4, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.realBasis, 4, 1);
this.createText ("Real (s,pz,px,py)", x + sz * 4, y, sz);
break;
}
for (i = 0; i != this.phasorCount; i++) this.phasors[i].state.setBasisActive ();

for (i = 0; i != this.basisCount; i++) {
if (this.basisList[i].active) {
this.basisList[i].convertBasisToDerived ();
this.basisList[i].convertDerivedToBasis ();
}}
if (this.viewChooser.getSelectedIndex () == 3) for (i = this.realBasis.altStateCount; i != this.stateCount; i++) this.states[i].set (0);

this.createOrbitals ();
});
Clazz.defineMethod (c$, "higherStatesPresent", 
function () {
var i;
for (i = this.realBasis.altStateCount; i != this.stateCount; i++) if (this.states[i].mag > 0) return true;

return false;
});
Clazz.defineMethod (c$, "setInitialOrbital", 
function () {
if (this.phasorCount == 0) return;
var i;
for (i = 0; i != this.stateCount; i++) if (this.states[i].mag > 0) return;

for (i = 0; i != this.phasorCount; i++) if (Clazz.instanceOf (this.phasors[i].state, test.falstad.AtomViewerFrame.BasisState)) {
this.phasors[i].state.set (1);
this.createOrbitals ();
return;
}
});
Clazz.defineMethod (c$, "createBasisPhasors", 
function (x, y, sz, i, n, l) {
var j;
for (j = 0; j != l * 2 + 1; j++) {
var ph = this.phasors[i] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Phasor, this, null, x, y, sz, sz);
ph.state = this.getState (n, l, j - l);
x += sz;
i++;
}
return i;
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "createAltPhasors", 
function (x, y, sz, i, basis, ct, offset) {
var j;
for (j = 0; j != ct; j++) {
var ph = this.phasors[i] = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Phasor, this, null, x, y, sz, sz);
ph.state = basis.altStates[j + offset];
x += sz;
i++;
}
return i;
}, "~N,~N,~N,~N,test.falstad.AtomViewerFrame.AlternateBasis,~N,~N");
Clazz.defineMethod (c$, "createText", 
function (text, x, y, sz) {
var tb = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.TextBox, this, null, x + 10, y, this.winSize.width - x, sz, text);
this.textBoxes[this.textCount++] = tb;
}, "~S,~N,~N,~N");
Clazz.defineMethod (c$, "setupDisplay", 
function () {
if (this.winSize == null) return;
var potsize = (this.viewPotential == null) ? 50 : this.viewPotential.height;
var statesize = (this.viewStates == null) ? 64 : this.viewStates.height;
this.viewX = this.viewPotential = this.viewRadial = this.viewL = this.viewL2 = this.viewStates = null;
this.viewList =  new Array (10);
var i = 0;
if (this.eCheckItem.getState ()) this.viewList[i++] = this.viewPotential = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.View, this, null);
if (this.xCheckItem.getState ()) this.viewList[i++] = this.viewX = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.View, this, null);
if (this.lCheckItem.getState ()) this.viewList[i++] = this.viewL = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.View, this, null);
if (this.l2CheckItem.getState ()) this.viewList[i++] = this.viewL2 = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.View, this, null);
if (this.rCheckItem.getState ()) this.viewList[i++] = this.viewRadial = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.View, this, null);
if (this.viewChooser.getSelectedIndex () > 1) this.viewList[i++] = this.viewStates = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.View, this, null);
this.viewCount = i;
var sizenum = this.viewCount;
var toth = this.winSize.height;
if (potsize > 0 && this.viewPotential != null) {
sizenum--;
toth -= potsize;
}if (statesize > 0 && this.viewStates != null) {
sizenum--;
toth -= statesize;
}toth -= 4 * 2 * (this.viewCount - 1);
var cury = 0;
for (i = 0; i != this.viewCount; i++) {
var v = this.viewList[i];
var h = (sizenum == 0) ? toth : Clazz.doubleToInt (toth / sizenum);
if (v === this.viewPotential && potsize > 0) h = potsize;
 else if (v === this.viewStates && statesize > 0) h = statesize;
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
var npix = this.viewX.width * this.viewX.height;
this.pixels =  Clazz.newIntArray (npix, 0);
for (i = 0; i != npix; i++) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (this.viewX.width, this.viewX.height, this.pixels, 0, this.viewX.width);
this.imageSource.setAnimated (true);
this.imageSource.setFullBufferUpdates (true);
this.memimage = this.cv.createImage (this.imageSource);
}var asize = Clazz.doubleToInt (this.min (this.viewX.width, this.viewX.height) / 3);
this.viewAxes =  new java.awt.Rectangle (this.viewX.x + this.winSize.width - asize, this.viewX.y, asize, asize);
this.setupMenus ();
this.createPhasors ();
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
System.out.print ("setResolution " + this.dataSize + " " + this.gridSizeX + " " + this.winSize + "\n");
this.resadj = 50. / this.dataSize;
this.precomputeAll ();
});
Clazz.defineMethod (c$, "getN", 
function () {
return this.nChooser.getSelectedIndex () + 1;
});
Clazz.defineMethod (c$, "getL", 
function () {
return this.lChooser.getSelectedIndex ();
});
Clazz.defineMethod (c$, "getM", 
function () {
return this.mChooser.getSelectedIndex () - this.getL ();
});
Clazz.defineMethod (c$, "setNValue", 
function () {
var i;
var n = this.nChooser.getSelectedIndex () + 1;
var l = this.lChooser.getSelectedIndex ();
this.lChooser.removeAllItems ();
for (i = 0; i < n; i++) this.lChooser.add ("l = " + i + ((i < 6) ? " (" + this.codeLetter[i] + ")" : ""));

if (l < n && l >= 0) this.lChooser.select (l);
this.setLValue ();
});
Clazz.defineMethod (c$, "setLValue", 
function () {
var l = this.getL ();
var i;
this.mChooser.removeAllItems ();
if (this.viewChooser.getSelectedIndex () == 0) {
if (l == 0) {
this.mChooser.add (this.getN () + "s");
} else if (l == 1) {
for (i = 0; i != 3; i++) this.mChooser.add (this.getN () + this.l1RealText[i]);

} else if (l == 2) {
for (i = 0; i != 5; i++) this.mChooser.add (this.getN () + this.l2RealText[i]);

} else if (l == 3 && !this.cubicItem.getState ()) {
for (i = 0; i != 7; i++) this.mChooser.add (this.getN () + this.l3RealText[i]);

} else if (l == 3 && this.cubicItem.getState ()) {
for (i = 0; i != 7; i++) this.mChooser.add (this.getN () + this.l3CubicRealText[i]);

} else {
this.mChooser.add ("m = 0");
for (i = 1; i <= l; i++) {
this.mChooser.add ("m = +-" + i + " (+)");
this.mChooser.add ("m = +-" + i + " (-)");
}
}} else {
for (i = -l; i <= l; i++) this.mChooser.add ("m = " + i);

this.mChooser.select (l);
}this.validate ();
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
var boundRadius2 = 0;
for (i = 0; i != this.orbCount; i++) {
var oo = this.orbitals[i];
var br = oo.getBoundRadius (this.colorMult);
if (br > boundRadius2) boundRadius2 = br;
}
boundRadius2 *= boundRadius2;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var camvx0 = (2 * i / this.gridSizeX - 1) * aratiox;
var camvy0 = -(2 * j / this.gridSizeY - 1) * aratioy;
var camx = rotm[2] * test.falstad.AtomViewerFrame.viewDistance;
var camy = rotm[5] * test.falstad.AtomViewerFrame.viewDistance;
var camz = rotm[8] * test.falstad.AtomViewerFrame.viewDistance;
var camvx = rotm[0] * camvx0 + rotm[1] * camvy0 - rotm[2];
var camvy = rotm[3] * camvx0 + rotm[4] * camvy0 - rotm[5];
var camvz = rotm[6] * camvx0 + rotm[7] * camvy0 - rotm[8];
var camnorm = Math.sqrt (camvx0 * camvx0 + camvy0 * camvy0 + 1);
var n;
var simpr = 0;
var simpg = 0;
var simpb = 0;
var a = camvx * camvx + camvy * camvy + camvz * camvz;
var b = 2 * (camvx * camx + camvy * camy + camvz * camz);
var c = camx * camx + camy * camy + camz * camz - boundRadius2;
var discrim = b * b - 4 * a * c;
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
for (; n < maxn; n++) {
var r = Math.sqrt (xx * xx + yy * yy + zz * zz);
var costh = zz / r;
var ri = Clazz.doubleToInt (r);
var costhi = Clazz.doubleToInt (costh * dshalf + dshalf);
var fr = 0;
var fi = 0;
this.calcPhiComponent (xx, yy);
for (oi = 0; oi != this.orbCount; oi++) {
var oo = this.orbitals[oi];
oo.computePoint (ri, costhi);
fr += this.funcr;
fi += this.funci;
}
if (color) {
var fv = fr * fr + fi * fi;
if (fv > 1) System.out.print ("fv = " + fv + "\n");
fv *= this.sampleMult[n];
var col = this.getPhaseColor (fr, fi);
simpr += col.r * fv;
simpg += col.g * fv;
simpb += col.b * fv;
} else {
var fv = (fr * fr + fi * fi) * this.sampleMult[n];
simpr = simpg = (simpb += fv);
}xx += camvx;
yy += camvy;
zz += camvz;
}
simpr *= pathlen / n;
simpg *= pathlen / n;
simpb *= pathlen / n;
this.fillSquare (i, j, simpr, simpg, simpb);
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
if (cr == 0 && cg == 0 && cb == 0) {
var y2l = y2 * this.viewX.width;
for (var k = x; k < x2; k++) for (var d = this.viewX.width, l = y * d; l < y2l; l += d) this.pixels[k + l] = 0xFF000000;


return;
}var fm = this.max (cr, this.max (cg, cb));
if (fm > 255) {
fm /= 255;
cr /= fm;
cg /= fm;
cb /= fm;
}var colval = 0xFF000000 + ((Clazz.floatToInt (cr)) << 16) | ((Clazz.floatToInt (cg)) << 8) | ((Clazz.floatToInt (cb)));
var y2l = y2 * this.viewX.width;
for (var k = x; k < x2; k++) for (var l = y * this.viewX.width; l < y2l; l += this.viewX.width) this.pixels[k + l] = colval;


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
Clazz.defineMethod (c$, "setScale", 
function () {
if (this.manualScale || !this.autoZoomItem.getState ()) return;
var i;
var outer = 0;
for (i = 0; i != this.orbCount; i++) {
var orb = this.orbitals[i];
var r = orb.getScaleRadius ();
if (r > outer) outer = r;
}
var scaleValue = Clazz.doubleToInt (outer * 3.15);
var oldScaleValue = this.scaleBar.getValue ();
if (oldScaleValue != scaleValue) {
var diff = scaleValue - oldScaleValue;
if (diff < -5 || diff > 5) {
diff /= 3;
if (diff < -50) diff = -50;
if (diff > 50) diff = 50;
}var diffd = diff * this.frameLen / 60.;
diff = Clazz.doubleToInt (diffd);
if (diff == 0) diff = (diffd > 0) ? 1 : -1;
var nv = oldScaleValue + diff;
if (nv > scaleValue && diff > 0) nv = scaleValue;
if (nv < scaleValue && diff < 0) nv = scaleValue;
if (!this.animatedZoomItem.getState ()) nv = scaleValue;
this.scaleBar.setValue (nv);
scaleValue = nv;
this.precomputeAll ();
}});
Clazz.defineMethod (c$, "precomputeAll", 
function () {
var i;
for (i = 0; i != this.orbCount; i++) {
var orb = this.orbitals[i];
orb.precompute ();
}
});
Clazz.defineMethod (c$, "sign", 
function (x) {
return x < 0 ? -1 : 1;
}, "~N");
Clazz.defineMethod (c$, "updateAtomViewer", 
function (realg) {
var g = null;
if (this.winSize == null || this.winSize.width == 0) return;
g = this.dbimage.getGraphics ();
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
if (this.fontMetrics == null) this.fontMetrics = g.getFontMetrics ();
var allQuiet = false;
var tadd = 0;
if (!this.stoppedCheck.getState ()) {
var sysTime = System.currentTimeMillis ();
if (this.lastTime != 0) {
var inc = this.frameLen = (sysTime - this.lastTime);
var val = this.speedBar.getValue ();
tadd = Math.exp (val * .04 - 9) * inc;
}this.lastTime = sysTime;
this.t += tadd;
} else {
this.lastTime = 0;
allQuiet = true;
}var norm = 0;
var normmult = 0;
var normmult2 = 0;
if (this.alwaysNormItem.getState ()) this.normalize ();
var i;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
if (st.mag < 0.01) {
st.set (0);
continue;
}if (tadd != 0) {
allQuiet = false;
st.rotate (-(st.elevel + 0.55) * tadd);
}norm += st.magSquared ();
}
normmult2 = 1 / norm;
if (norm == 0) normmult2 = 0;
normmult = Math.sqrt (normmult2);
var skipBasis = (this.changingDerivedStates) ? (this.selectedState).basis : null;
for (i = 0; i != this.basisCount; i++) {
var basis = this.basisList[i];
if (basis !== skipBasis && basis.active) basis.convertBasisToDerived ();
}
this.setScale ();
this.setBrightness (normmult2);
var sliced = this.sliceChooser.getSelectedIndex () != 0;
this.zoom = (sliced) ? 8 : 16.55;
this.colorMult = Math.exp (this.brightnessBar.getValue () / 100.);
this.computeView (normmult);
var j;
var k;
for (i = 1; i != this.viewCount; i++) {
g.setColor (i == this.selectedPaneHandle ? java.awt.Color.yellow : java.awt.Color.gray);
g.drawLine (0, this.viewList[i].paneY, this.winSize.width, this.viewList[i].paneY);
}
if (this.viewPotential != null) {
var ymult = this.viewPotential.height * 1.9;
g.setColor (java.awt.Color.darkGray);
for (i = 1; i != 16; i++) {
var e = -1 / (2. * i * i);
var y = this.viewPotential.y - Clazz.doubleToInt (ymult * e);
g.drawLine (0, y, this.winSize.width, y);
}
var xp = this.getScaler ();
g.setColor (java.awt.Color.white);
var ox = -1;
var oy = -1;
var floory = this.viewPotential.y + this.viewPotential.height - 1;
for (var x = 0, w = this.winSize.width; x != w; x++) {
var xx = (x - Clazz.doubleToInt (w / 2)) * xp;
if (xx < 0) xx = -xx;
if (xx < 1e-3) xx = 1e-3;
var dy = -1 / xx;
var y = this.viewPotential.y - Clazz.doubleToInt (ymult * dy);
if (y > floory) {
if (ox == -1) continue;
g.drawLine (ox, oy, ox, floory);
ox = -1;
continue;
}if (ox == -1 && x > 0) {
g.drawLine (x, floory, x, y);
ox = x;
oy = y;
continue;
}if (ox != -1) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}
if (norm != 0) {
var expecte = 0;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
var prob = st.magSquared () * normmult2;
expecte += prob * st.elevel;
}
var y = this.viewPotential.y - Clazz.doubleToInt (ymult * expecte);
g.setColor (java.awt.Color.red);
g.drawLine (0, y, this.winSize.width, y);
}if (this.selectedState != null && !this.dragging) {
g.setColor (java.awt.Color.yellow);
var y = this.viewPotential.y - Clazz.doubleToInt (ymult * this.selectedState.elevel);
g.drawLine (0, y, this.winSize.width, y);
}}if (this.viewL != null) {
var maxm = 3;
var pad = 3;
var ct = (maxm * 2 + 1) * pad;
var ldata =  Clazz.newDoubleArray (ct, 0);
if (!this.higherStatesPresent ()) {
this.calcLxy (ldata, ct, maxm, pad, true, false);
this.drawFunction (g, this.viewL, 0, ldata, ct, pad, false);
this.calcLxy (ldata, ct, maxm, pad, false, false);
this.drawFunction (g, this.viewL, 1, ldata, ct, pad, false);
}this.calcLz (ldata, ct, maxm, pad, false);
this.drawFunction (g, this.viewL, 2, ldata, ct, pad, false);
}if (this.viewL2 != null) {
var maxm = 3;
var pad = 3;
var ct = (maxm * 2 + 1) * pad;
var ldata =  Clazz.newDoubleArray (ct, 0);
pad = 2;
if (!this.higherStatesPresent ()) {
this.calcLxy (ldata, ct, maxm, pad, true, true);
this.drawFunction (g, this.viewL2, 0, ldata, ct, pad, true);
this.calcLxy (ldata, ct, maxm, pad, false, true);
this.drawFunction (g, this.viewL2, 1, ldata, ct, pad, true);
}this.calcLz (ldata, ct, maxm, pad, true);
this.drawFunction (g, this.viewL2, 2, ldata, ct, pad, true);
}if (this.viewRadial != null && this.orbCount == 1) {
var orb = this.orbitals[0];
var n = orb.n;
var l = orb.l;
norm = orb.radialNorm (n, l);
var ct = this.viewRadial.width * 2;
var ldata =  Clazz.newDoubleArray (ct, 0);
var sr = orb.getScaleRadius () * 3;
var bestCt = ct;
var max = -1;
for (i = 0; i != ct; i++) {
var r = i * sr / ct + 1e-8;
var rho = 2 * r / n;
var rhol = Math.pow (rho, l) * norm;
var dr = this.hypser (l + 1 - n, 2 * l + 2, rho) * rhol * Math.exp (-rho / 2) * norm;
ldata[i] = dr * dr * r * r;
if (ldata[i] > max) max = ldata[i];
if (ldata[i] > max * .01) bestCt = i;
}
var scaleVal = sr * bestCt / ct;
this.drawRadialFunction (g, ldata, bestCt, scaleVal);
}if (this.imageSource != null) this.imageSource.newPixels ();
g.drawImage (this.memimage, this.viewX.x, this.viewX.y, null);
g.setColor (java.awt.Color.white);
if (sliced) this.drawCube (g, false);
if (this.axesItem.getState ()) this.drawAxes (g);
for (i = 0; i != this.textCount; i++) {
var tb = this.textBoxes[i];
var h = Clazz.doubleToInt ((tb.height + this.fontMetrics.getAscent () - this.fontMetrics.getDescent ()) / 2);
g.drawString (tb.text, tb.x, tb.y + h);
}
g.setColor (java.awt.Color.yellow);
if (this.selectedState != null) this.centerString (g, this.selectedState.getText (), this.viewX.y + this.viewX.height - 5);
 else if (this.dimensionsItem.getState ()) {
var xp = this.getScaler ();
var w = this.winSize.width * xp * 52.9463;
this.centerString (g, "Screen width = " + Clazz.doubleToInt (w) + " pm", this.viewX.y + this.viewX.height - 5);
}if (this.$mouseDown) this.lastXRot = this.lastYRot = 0;
 else if (this.lastXRot != 0 || this.lastYRot != 0) {
var ts = this.frameLen / 20.;
this.rotate (this.lastXRot * ts, this.lastYRot * ts);
allQuiet = false;
}if (this.viewStates != null) this.drawPhasors (g, this.viewStates);
realg.drawImage (this.dbimage, 0, 0, this);
if (!allQuiet) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "getScaler", 
function () {
var scalex = this.viewX.width * this.zoom / 2;
var scaley = this.viewX.height * this.zoom / 2;
var aratio = this.viewX.width / this.viewX.height;
if (aratio < 1) scaley *= aratio;
 else scalex /= aratio;
var xp = 2 * scalex / test.falstad.AtomViewerFrame.viewDistance;
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
var viewx = test.falstad.AtomViewerFrame.viewDistance * this.rotmatrix[2];
var viewy = test.falstad.AtomViewerFrame.viewDistance * this.rotmatrix[5];
var viewz = test.falstad.AtomViewerFrame.viewDistance * this.rotmatrix[8];
return (nx - viewx) * nx + (ny - viewy) * ny + (nz - viewz) * nz < 0;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "drawPhasors", 
function (g, v) {
var i;
for (i = 0; i != this.phasorCount; i++) {
var ph = this.phasors[i];
var st = ph.state;
var ss = ph.width;
var ss2 = Clazz.doubleToInt (ss / 2);
var x = ph.x + ss2;
var y = ph.y + ss2;
var yel = (this.selectedState === st);
g.setColor (yel ? java.awt.Color.yellow : st.mag == 0 ? this.gray2 : java.awt.Color.white);
g.drawOval (x - ss2, y - ss2, ss, ss);
var xa = Clazz.doubleToInt (st.re * ss2);
var ya = Clazz.doubleToInt (-st.im * ss2);
g.drawLine (x, y, x + xa, y + ya);
g.drawLine (x + xa - 1, y + ya, x + xa + 1, y + ya);
g.drawLine (x + xa, y + ya - 1, x + xa, y + ya + 1);
}
}, "java.awt.Graphics,test.falstad.AtomViewerFrame.View");
Clazz.defineMethod (c$, "drawFunction", 
function (g, view, pos, fr, count, pad, fromZero) {
var i;
var expectx = 0;
var expectx2 = 0;
var maxsq = 0;
var tot = 0;
var vw = Clazz.doubleToInt (this.winSize.width / 3);
var vw2 = Clazz.doubleToInt (vw * 4 / 5);
var mid_x = (fromZero) ? (Clazz.doubleToInt (vw2 / (count - 1))) : Clazz.doubleToInt (vw2 * (Clazz.doubleToInt (count / 2)) / (count - 1));
var zero = mid_x;
mid_x += vw * pos;
for (i = 0; i != count; i++) {
var x = Clazz.doubleToInt (vw2 * i / (count - 1));
var ii = i;
var dr = fr[ii];
var dy = dr * dr;
if (dy > maxsq) maxsq = dy;
var dev = x - zero;
expectx += dy * dev;
expectx2 += dy * dev * dev;
tot += dy;
}
zero = mid_x;
expectx /= tot;
expectx2 /= tot;
var maxnm = Math.sqrt (maxsq);
var uncert = Math.sqrt (expectx2 - expectx * expectx);
var ox = -1;
var oy = 0;
var bestscale = 1 / maxnm;
view.scale = bestscale;
if (view.scale > 1e8) view.scale = 1e8;
g.setColor (java.awt.Color.gray);
g.drawLine (mid_x, view.y, mid_x, view.y + view.height);
var ymult2 = .90 * view.height;
var mid_y = view.y + Clazz.doubleToInt (view.height / 2) + Clazz.doubleToInt (Clazz.doubleToInt (ymult2) / 2);
var mult = ymult2 * view.scale;
g.setColor (java.awt.Color.white);
ox = -1;
for (i = 0; i != count; i++) {
var x = Clazz.doubleToInt (vw2 * i / (count - 1)) + vw * pos;
var ii = i;
var y = mid_y - Clazz.doubleToInt (mult * fr[ii]);
if ((i % pad) == 1) {
g.setColor (java.awt.Color.gray);
g.drawLine (x, mid_y, x, mid_y + 4);
g.setColor (java.awt.Color.white);
}if (ox != -1) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}
if (maxsq > 0) {
expectx += zero + .5;
g.setColor (java.awt.Color.red);
g.drawLine (Clazz.doubleToInt (expectx), view.y, Clazz.doubleToInt (expectx), view.y + view.height);
}}, "java.awt.Graphics,test.falstad.AtomViewerFrame.View,~N,~A,~N,~N,~B");
Clazz.defineMethod (c$, "drawRadialFunction", 
function (g, fr, count, scaleVal) {
var i;
var view = this.viewRadial;
var maxsq = 0;
var tot = 0;
var vw = this.winSize.width;
var vw2 = vw;
var mid_x = Clazz.doubleToInt (vw / 2);
var zero = mid_x;
for (i = 0; i != count; i++) {
if (fr[i] > maxsq) maxsq = fr[i];
}
var ox = -1;
var oy = 0;
var bestscale = 1 / maxsq;
view.scale = bestscale;
var ymult2 = .90 * view.height;
var mid_y = view.y + Clazz.doubleToInt (view.height / 2) + Clazz.doubleToInt (Clazz.doubleToInt (ymult2) / 2);
var mult = ymult2 * view.scale;
g.setColor (java.awt.Color.white);
ox = -1;
var midi = Clazz.doubleToInt (count / 2);
var a0i = 0;
for (i = 0; i != count; i++) {
var x = mid_x + Clazz.doubleToInt (mid_x * (i - midi) / midi);
var y = mid_y - Clazz.doubleToInt (mult * fr[i]);
var a0 = scaleVal * i / count;
if (a0 >= a0i) {
g.setColor (java.awt.Color.gray);
g.drawLine (x, mid_y, x, mid_y + 4);
g.setColor (java.awt.Color.white);
a0i++;
}if (ox != -1) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}
}, "java.awt.Graphics,~A,~N,~N");
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
var realz = test.falstad.AtomViewerFrame.viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
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
var mx = test.falstad.AtomViewerFrame.viewDistance * rotm[2];
var my = test.falstad.AtomViewerFrame.viewDistance * rotm[5];
var mz = test.falstad.AtomViewerFrame.viewDistance * rotm[8];
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
if (e.getSource () === this.blankButton) this.doClear ();
if (e.getSource () === this.normalizeButton) this.normalize ();
if (e.getSource () === this.maximizeButton) this.maximize ();
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
if (!this.finished) return;
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.scaleBar) {
if (this.scaleBar.getValue () == this.scaleValue) return;
this.scaleValue = this.scaleBar.getValue ();
this.precomputeAll ();
this.manualScale = true;
}if (e.getSource () === this.brightnessBar) {
var mult = Math.exp (this.brightnessBar.getValue () / 100.);
this.userBrightMult = mult / this.bestBrightness;
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
var oldss = this.selectedState;
this.selectedPaneHandle = -1;
this.selection = 0;
this.selectedState = null;
var i;
for (i = 1; i != this.viewCount; i++) {
var dy = y - this.viewList[i].paneY;
if (dy >= -3 && dy <= 3) {
this.selectedPaneHandle = i;
this.selection = 4;
}}
if (this.viewX != null && this.viewX.contains (x, y)) {
this.selection = 2;
this.checkSlice (e.getX (), e.getY ());
} else if (this.viewPotential.contains (x, y)) {
this.selection = 1;
} else if (this.viewStates != null && this.viewStates.contains (x, y)) this.findPhasor (this.viewStates, x, y);
if (oldsph != this.selectedPaneHandle || olds != this.selection || oldss !== this.selectedState) this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "findPhasor", 
function (v, x, y) {
var i;
for (i = 0; i != this.phasorCount; i++) {
if (!this.phasors[i].contains (x, y)) continue;
this.selectedPhasor = this.phasors[i];
this.selectedState = this.selectedPhasor.state;
this.selection = 3;
break;
}
}, "test.falstad.AtomViewerFrame.View,~N,~N");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
if (this.selection == 3) this.editMagClick ();
if (e.getClickCount () == 2 && this.selectedState != null) this.enterSelectedState ();
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "enterSelectedState", 
function () {
var i;
for (i = 0; i != this.stateCount; i++) if (this.states[i] !== this.selectedState) this.states[i].set (0);

this.selectedState.convertBasisToDerived ();
this.selectedState.set (1);
this.selectedState.convertDerivedToBasis ();
this.createOrbitals ();
this.cv.repaint (this.pause);
});
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
if (!this.dragging && this.selection != 0) {
this.selectedPaneHandle = -1;
this.selectedState = null;
this.selectedPhasor = null;
this.selection = 0;
this.cv.repaint (this.pause);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
this.$mouseDown = true;
if ((e.getModifiers () & 16) == 0) return;
this.dragX = this.dragStartX = e.getX ();
this.dragY = this.dragStartY = e.getY ();
this.dragZoomStart = this.zoom;
this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
this.$mouseDown = false;
if (this.dragging) this.cv.repaint ();
this.dragging = this.changingDerivedStates = false;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (!this.finished) {
return;
}var c = e.getItemSelectable ();
if (c === this.cubicItem) {
this.setLValue ();
this.setupDisplay ();
this.orbitalChanged ();
} else if (Clazz.instanceOf (c, javax.swing.JRadioButtonMenuItem)) {
if (e.getStateChange () != 1) return;
this.setupSimpson ();
this.setupDisplay ();
} else if (Clazz.instanceOf (c, swingjs.awt.CheckboxMenuItem)) {
this.setupSimpson ();
this.setupDisplay ();
} else if (c === this.nChooser) {
this.setNValue ();
this.orbitalChanged ();
} else if (c === this.lChooser) {
this.setLValue ();
this.orbitalChanged ();
} else if (c === this.mChooser) {
this.orbitalChanged ();
} else if (c === this.viewChooser) {
this.setLValue ();
this.orbitalChanged ();
this.setupDisplay ();
this.setInitialOrbital ();
}this.cv.repaint (this.pause);
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.AtomViewerFrame, "handleEvent", [ev]);
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
case 3:
this.editMag (x, y);
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
var mode = this.modeChooser.getSelectedIndex ();
if (this.selectedSlice) mode = 5;
if (mode == 0) {
var xo = this.dragX - x;
var yo = this.dragY - y;
this.rotate (this.lastXRot = xo / 40., this.lastYRot = -yo / 40.);
var lr = Math.sqrt (this.lastXRot * this.lastXRot + this.lastYRot * this.lastYRot);
if (lr > .06) {
lr /= .06;
this.lastXRot /= lr;
this.lastYRot /= lr;
}this.cv.repaint (this.pause);
} else if (mode == 1) {
var xo = this.dragX - x + this.dragY - y;
this.rotateXY (xo / 40., true);
} else if (mode == 2) {
var xo = this.dragX - x + this.dragY - y;
this.rotateXY (xo / 40., false);
} else if (mode == 3) {
var xo = this.dragX - x + this.dragY - y;
this.rotateZ (xo / 40.);
} else if (mode == 5) {
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
Clazz.defineMethod (c$, "editMag", 
function (x, y) {
if (this.selectedPhasor == null) return;
var stateSize = this.selectedPhasor.width;
var ss2 = Clazz.doubleToInt (stateSize / 2);
var x0 = this.selectedPhasor.x + ss2;
var y0 = this.selectedPhasor.y + ss2;
x -= x0;
y -= y0;
var mag = Math.sqrt (x * x + y * y) / ss2;
var ang = Math.atan2 (-y, x);
if (mag > 10) mag = 0;
if (mag > 1) mag = 1;
this.selectedState.setMagPhase (mag, ang);
if (Clazz.instanceOf (this.selectedState, test.falstad.AtomViewerFrame.DerivedState)) {
this.selectedState.convertDerivedToBasis ();
this.changingDerivedStates = true;
}this.cv.repaint (this.pause);
this.createOrbitals ();
}, "~N,~N");
Clazz.defineMethod (c$, "editMagClick", 
function () {
if (this.selectedState == null) return;
if (this.magDragStart < .5) this.selectedState.set (1, 0);
 else this.selectedState.set (0);
this.cv.repaint (this.pause);
this.createOrbitals ();
});
Clazz.defineMethod (c$, "calcLxy", 
function (data, count, maxm, pad, xAxis, square) {
var i;
var mid = Clazz.doubleToInt (count / 2);
for (i = 0; i != count; i++) data[i] = 0;

if (square) mid = 1;
for (i = 0; i != this.basisCount; i++) {
var ab = this.basisList[i];
if (ab.n == 0 || ab.xAxis != xAxis) continue;
ab.convertBasisToDerived ();
var j;
for (j = 0; j != ab.altStateCount; j++) {
var ds = ab.altStates[j];
if (square) data[mid + ds.m * ds.m * pad] += ds.magSquared ();
 else data[mid + ds.m * pad] += ds.magSquared ();
}
}
for (i = 0; i != this.stateCount; i++) {
if (this.states[i].l == 0) data[mid] += this.states[i].magSquared ();
}
for (i = 0; i != count; i++) data[i] = Math.sqrt (data[i]);

}, "~A,~N,~N,~N,~B,~B");
Clazz.defineMethod (c$, "calcLz", 
function (data, count, maxm, pad, square) {
var i;
var mid = Clazz.doubleToInt (count / 2);
for (i = 0; i != count; i++) data[i] = 0;

if (square) mid = 1;
for (i = 0; i != this.stateCount; i++) {
var bs = this.states[i];
if (bs.l <= maxm) {
if (square) data[mid + bs.m * bs.m * pad] += bs.magSquared ();
 else data[mid + bs.m * pad] += bs.magSquared ();
}}
for (i = 0; i != count; i++) data[i] = Math.sqrt (data[i]);

}, "~A,~N,~N,~N,~B");
Clazz.defineMethod (c$, "rotateXY", 
function (ang, xAxis) {
var i;
for (i = 0; i != this.basisCount; i++) {
var ab = this.basisList[i];
if (ab.n == 0 || ab.xAxis != xAxis) continue;
ab.convertBasisToDerived ();
var j;
for (j = 0; j != ab.altStateCount; j++) {
var ds = ab.altStates[j];
ds.rotate (ang * ds.m);
}
}
for (i = 0; i != this.stateCount; i++) {
if (this.states[i].l > 0) this.states[i].set (0);
}
for (i = 0; i != this.basisCount; i++) {
var ab = this.basisList[i];
if (ab.n == 0 || ab.xAxis != xAxis) continue;
ab.convertDerivedToBasis (false);
}
this.createOrbitals ();
this.cv.repaint (this.pause);
}, "~N,~B");
Clazz.defineMethod (c$, "rotateZ", 
function (ang) {
var i;
for (i = 0; i != this.stateCount; i++) {
var bs = this.states[i];
bs.rotate (ang * bs.m);
}
this.cv.repaint (this.pause);
}, "~N");
Clazz.defineMethod (c$, "createOrbitals", 
function () {
var i;
var newOrbCount = 0;
var newOrbitals = false;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
if (st.m == 0) {
if (st.mag != 0) {
newOrbCount++;
if (st.orb == null) newOrbitals = true;
} else if (st.orb != null) newOrbitals = true;
} else if (st.m > 0) {
if (st.mag != 0 || this.getState (st.n, st.l, -st.m).mag != 0) {
newOrbCount++;
if (st.orb == null) newOrbitals = true;
} else if (st.orb != null) newOrbitals = true;
}}
if (!newOrbitals) return;
this.orbCount = newOrbCount;
this.orbitals =  new Array (this.orbCount);
var oi = 0;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
if ((st.m == 0 && st.mag != 0) || (st.m > 0 && (st.mag != 0 || this.getState (st.n, st.l, -st.m).mag != 0))) {
if (st.orb == null) {
var orb;
if (st.l == 0) orb = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.SOrbital, this, null, st);
 else if (st.m == 0) orb = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.MZeroOrbital, this, null, st);
 else orb = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.PairedOrbital, this, null, st);
orb.precompute ();
st.orb = orb;
}this.orbitals[oi++] = st.orb;
} else st.orb = null;
}
System.out.println (this.orbCount);
});
Clazz.defineMethod (c$, "doClear", 
function () {
var x;
for (x = 0; x != this.stateCount; x++) this.states[x].set (0);

});
Clazz.defineMethod (c$, "normalize", 
function () {
var norm = 0;
var i;
for (i = 0; i != this.stateCount; i++) norm += this.states[i].magSquared ();

if (norm == 0) return;
var normmult = 1 / Math.sqrt (norm);
for (i = 0; i != this.stateCount; i++) this.states[i].mult (normmult);

this.cv.repaint (this.pause);
});
Clazz.defineMethod (c$, "maximize", 
function () {
var i;
var maxm = 0;
for (i = 0; i != this.stateCount; i++) if (this.states[i].mag > maxm) maxm = this.states[i].mag;

if (maxm == 0) return;
for (i = 0; i != this.stateCount; i++) this.states[i].mult (1 / maxm);

this.cv.repaint (this.pause);
});
Clazz.defineMethod (c$, "orbitalChanged", 
function () {
if (this.viewChooser.getSelectedIndex () > 1) return;
this.doClear ();
if (this.viewChooser.getSelectedIndex () == 0) {
var m = this.mChooser.getSelectedIndex ();
if (m == 0) this.getState (this.getN (), this.getL (), 0).set (1, 0);
 else if (this.getL () == 3 && this.cubicItem.getState ()) {
var i;
for (i = 0; i != 7; i++) {
var ar = m * 14 + i * 2;
this.getState (this.getN (), 3, i - 3).set (this.l3CubicArray[ar], this.l3CubicArray[ar + 1]);
}
} else {
m--;
var realm = Clazz.doubleToInt (m / 2) + 1;
var mphase = Math.pow (-1, realm);
if ((m & 1) == 0) {
this.getState (this.getN (), this.getL (), realm).set (mphase * 0.7071067811865476);
this.getState (this.getN (), this.getL (), -realm).set (0.7071067811865476);
} else {
this.getState (this.getN (), this.getL (), realm).set (0, -mphase * 0.7071067811865476);
this.getState (this.getN (), this.getL (), -realm).set (0, 0.7071067811865476);
}}} else this.getState (this.getN (), this.getL (), this.getM ()).set (1, 0);
this.createOrbitals ();
this.manualScale = false;
});
Clazz.defineMethod (c$, "getState", 
function (n, l, m) {
var pre_n = n - 1;
var pre_n_add = Clazz.doubleToInt (pre_n * (pre_n + 1) * (2 * pre_n + 1) / 6);
var pre_l_add = l * l;
return this.states[pre_n_add + pre_l_add + l + m];
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setBrightness", 
function (normmult) {
var i;
var avg = 0;
var totn = 0;
var minavg = 1e30;
for (i = 0; i != this.orbCount; i++) {
var orb = this.orbitals[i];
var as = orb.getBrightness ();
if (as < minavg) minavg = as;
var st = orb.state;
var n = st.magSquared () * normmult;
if (orb.state.m != 0) n += this.getState (st.n, st.l, -st.m).magSquared () * normmult;
totn += n;
avg += n * as;
}
this.bestBrightness = 113.9 / (Math.sqrt (minavg) * totn);
var mult = this.bestBrightness * this.userBrightMult;
var bvalue = Clazz.doubleToInt (Math.log (mult) * 100.);
this.brightnessBar.setValue (bvalue);
}, "~N");
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
c$.$AtomViewerFrame$Orbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.state = null;
this.n = 0;
this.l = 0;
this.m = 0;
this.reMult = 0;
this.imMult = 0;
this.dataR = null;
this.dataTh = null;
this.dataPhiR = null;
this.dataPhiI = null;
this.dshalf = 0;
this.brightnessCache = 0;
this.distmult = 4;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "Orbital");
Clazz.makeConstructor (c$, 
function (a) {
this.n = a.n;
this.l = a.l;
this.m = a.m;
this.state = a;
}, "test.falstad.AtomViewerFrame.BasisState");
Clazz.defineMethod (c$, "setupFrame", 
function (a) {
this.reMult = (this.state.re * a);
this.imMult = (this.state.im * a);
}, "~N");
Clazz.defineMethod (c$, "getBoundRadius", 
function (a) {
var b;
var c = 1;
var d = (this.m < 0) ? -this.m : this.m;
var e = 1 / this.sphericalNorm (this.l, d);
e *= e;
e *= a;
for (b = 0; b != this.b$["test.falstad.AtomViewerFrame"].dataSize; b++) {
var f = this.dataR[b] * this.dataR[b] * e;
if (f > 32) c = b;
}
return c / (this.b$["test.falstad.AtomViewerFrame"].dataSize / 2.);
}, "~N");
Clazz.defineMethod (c$, "getScaleRadius", 
function () {
var a = -this.n * this.n * 2;
var b = this.l * (this.l + 1) * this.n * this.n;
var c = .5 * (-a + Math.sqrt (a * a - 4 * b));
return c;
});
Clazz.defineMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.dshalf = Clazz.doubleToInt (this.b$["test.falstad.AtomViewerFrame"].dataSize / 2);
var d = this.b$["test.falstad.AtomViewerFrame"].scaleBar.getValue () / 50.;
var e = (this.m < 0) ? -this.m : this.m;
var f = Math.pow (-1, this.m);
var g = this.radialNorm (this.n, this.l) * this.sphericalNorm (this.l, e);
this.dataR =  Clazz.newFloatArray (this.b$["test.falstad.AtomViewerFrame"].dataSize, 0);
for (a = 0; a != this.b$["test.falstad.AtomViewerFrame"].dataSize; a++) {
var h = a * this.b$["test.falstad.AtomViewerFrame"].resadj + .00000001;
var i = 2 * h * d / this.n;
var j = Math.pow (i, this.l) * g;
this.dataR[a] = (this.b$["test.falstad.AtomViewerFrame"].hypser (this.l + 1 - this.n, 2 * this.l + 2, i) * j * Math.exp (-i / 2));
}
if (this.l > 0) {
this.dataTh =  Clazz.newFloatArray (this.b$["test.falstad.AtomViewerFrame"].dataSize + 1, 0);
for (a = 0; a != this.b$["test.falstad.AtomViewerFrame"].dataSize + 1; a++) {
var h = (a - this.dshalf) / this.dshalf;
this.dataTh[a] = (f * this.b$["test.falstad.AtomViewerFrame"].plgndr (this.l, e, h));
}
}if (this.m != 0) {
this.dataPhiR =  Clazz.newFloatArray (8 * (this.b$["test.falstad.AtomViewerFrame"].dataSize + 1), 0);
this.dataPhiI =  Clazz.newFloatArray (8 * (this.b$["test.falstad.AtomViewerFrame"].dataSize + 1), 0);
var h = 0;
for (a = 0; a != 8; a++) for (b = 0; b <= this.b$["test.falstad.AtomViewerFrame"].dataSize; b++, h++) {
var i = a * 3.141592653589793 / 4 + b * (0.7853981633974483) / this.b$["test.falstad.AtomViewerFrame"].dataSize;
this.dataPhiR[h] = Math.cos (i * e);
this.dataPhiI[h] = Math.sin (i * e);
}

}this.brightnessCache = 0;
});
Clazz.defineMethod (c$, "getBrightness", 
function () {
if (this.brightnessCache != 0) return this.brightnessCache;
var a;
var b = 0;
var c = 0;
var d = (this.m < 0) ? -this.m : this.m;
var e = 1 / this.sphericalNorm (this.l, d);
for (a = 0; a != this.b$["test.falstad.AtomViewerFrame"].dataSize; a++) {
var f = this.dataR[a] * e;
f *= f;
b += f * f * a * a;
c += a * a;
}
this.brightnessCache = b / c;
return this.brightnessCache;
});
Clazz.defineMethod (c$, "radialNorm", 
function (a, b) {
var c = this.factorial (a + b);
return Math.sqrt (4. * this.factorial (a + b) / (a * a * a * a * this.factorial (a - b - 1))) / this.factorial (2 * b + 1);
}, "~N,~N");
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
c$.$AtomViewerFrame$SOrbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "SOrbital", test.falstad.AtomViewerFrame.Orbital, null, Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Orbital, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "computePoint", 
function (a, b) {
try {
var c = this.dataR[a];
this.b$["test.falstad.AtomViewerFrame"].funcr = this.reMult * c;
this.b$["test.falstad.AtomViewerFrame"].funci = this.imMult * c;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.b$["test.falstad.AtomViewerFrame"].funcr = this.b$["test.falstad.AtomViewerFrame"].funci = 0;
System.out.println ("bad " + a + " " + b);
} else {
throw e;
}
}
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$AtomViewerFrame$MZeroOrbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "MZeroOrbital", test.falstad.AtomViewerFrame.Orbital, null, Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Orbital, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "computePoint", 
function (a, b) {
try {
var c = this.dataR[a] * this.dataTh[b];
this.b$["test.falstad.AtomViewerFrame"].funcr = c * this.reMult;
this.b$["test.falstad.AtomViewerFrame"].funci = c * this.imMult;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.b$["test.falstad.AtomViewerFrame"].funcr = this.b$["test.falstad.AtomViewerFrame"].funci = 0;
System.out.println ("bad " + a + " " + b);
} else {
throw e;
}
}
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$AtomViewerFrame$PairedOrbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.negstate = null;
this.f1 = 0;
this.f2 = 0;
this.f3 = 0;
this.f4 = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "PairedOrbital", test.falstad.AtomViewerFrame.Orbital, null, Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Orbital, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.AtomViewerFrame.PairedOrbital, [a]);
this.negstate = this.b$["test.falstad.AtomViewerFrame"].getState (a.n, a.l, -a.m);
}, "test.falstad.AtomViewerFrame.BasisState");
Clazz.overrideMethod (c$, "setupFrame", 
function (a) {
var b = this.state.re * a;
var c = this.state.im * a;
var d = this.negstate.re * a;
var e = this.negstate.im * a;
var f = Math.pow (-1, this.m);
b *= f;
c *= f;
this.f1 = (b + d);
this.f2 = (e - c);
this.f3 = (c + e);
this.f4 = (b - d);
}, "~N");
Clazz.overrideMethod (c$, "computePoint", 
function (a, b) {
try {
var c = this.dataR[a] * this.dataTh[b];
var d = this.dataPhiR[this.b$["test.falstad.AtomViewerFrame"].phiIndex];
var e = this.dataPhiI[this.b$["test.falstad.AtomViewerFrame"].phiIndex];
this.b$["test.falstad.AtomViewerFrame"].funcr = c * (this.f1 * d + this.f2 * e);
this.b$["test.falstad.AtomViewerFrame"].funci = c * (this.f3 * d + this.f4 * e);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.b$["test.falstad.AtomViewerFrame"].funcr = this.b$["test.falstad.AtomViewerFrame"].funci = 0;
System.out.println ("bad " + a + " " + b);
} else {
throw e;
}
}
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$AtomViewerFrame$Phasor$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.state = null;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "Phasor", java.awt.Rectangle);
c$ = Clazz.p0p ();
};
c$.$AtomViewerFrame$Complex$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.re = 0;
this.im = 0;
this.mag = 0;
this.phase = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "Complex");
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
}, "test.falstad.AtomViewerFrame.Complex");
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
}, "test.falstad.AtomViewerFrame.Complex");
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
}, "test.falstad.AtomViewerFrame.Complex");
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
c$.$AtomViewerFrame$State$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.elevel = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "State", test.falstad.AtomViewerFrame.Complex, null, Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "convertDerivedToBasis", 
function () {
});
Clazz.defineMethod (c$, "convertBasisToDerived", 
function () {
});
Clazz.defineMethod (c$, "setBasisActive", 
function () {
});
Clazz.defineMethod (c$, "getText", 
function () {
return null;
});
c$ = Clazz.p0p ();
};
c$.$AtomViewerFrame$BasisState$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.n = 0;
this.l = 0;
this.m = 0;
this.orb = null;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "BasisState", test.falstad.AtomViewerFrame.State, null, Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.State, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.AtomViewerFrame.BasisState, []);
});
Clazz.overrideMethod (c$, "getText", 
function () {
return "n = " + this.n + ", l = " + this.l + ", m = " + this.m;
});
c$ = Clazz.p0p ();
};
c$.$AtomViewerFrame$DerivedState$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.count = 0;
this.m = 0;
this.basis = null;
this.text = null;
this.bstates = null;
this.coefs = null;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "DerivedState", test.falstad.AtomViewerFrame.State, null, Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.State, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "convertDerivedToBasis", 
function () {
this.basis.convertDerivedToBasis ();
});
Clazz.overrideMethod (c$, "convertBasisToDerived", 
function () {
this.basis.convertBasisToDerived ();
});
Clazz.overrideMethod (c$, "setBasisActive", 
function () {
this.basis.active = true;
});
Clazz.overrideMethod (c$, "getText", 
function () {
return this.text;
});
c$ = Clazz.p0p ();
};
c$.$AtomViewerFrame$AlternateBasis$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.altStates = null;
this.altStateCount = 0;
this.active = false;
this.n = 0;
this.l = 0;
this.xAxis = false;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "AlternateBasis");
Clazz.makeConstructor (c$, 
function () {
this.b$["test.falstad.AtomViewerFrame"].basisList[this.b$["test.falstad.AtomViewerFrame"].basisCount++] = this;
});
Clazz.defineMethod (c$, "convertDerivedToBasis", 
function () {
this.convertDerivedToBasis (true);
});
Clazz.defineMethod (c$, "convertDerivedToBasis", 
function (a) {
var b;
var c;
if (a) for (b = 0; b != this.b$["test.falstad.AtomViewerFrame"].stateCount; b++) this.b$["test.falstad.AtomViewerFrame"].states[b].set (0);

var d = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null);
for (b = 0; b != this.altStateCount; b++) {
var e = this.altStates[b];
for (c = 0; c != e.count; c++) {
d.set (e.coefs[c]);
d.conjugate ();
d.mult (e);
e.bstates[c].add (d);
}
}
var e = 0;
for (b = 0; b != this.b$["test.falstad.AtomViewerFrame"].stateCount; b++) if (this.b$["test.falstad.AtomViewerFrame"].states[b].mag > e) e = this.b$["test.falstad.AtomViewerFrame"].states[b].mag;

if (e > 1) {
var f = 1 / e;
for (b = 0; b != this.b$["test.falstad.AtomViewerFrame"].stateCount; b++) this.b$["test.falstad.AtomViewerFrame"].states[b].mult (f);

}}, "~B");
Clazz.defineMethod (c$, "convertBasisToDerived", 
function () {
var a;
var b;
var c = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null);
var d = Clazz.innerTypeInstance (test.falstad.AtomViewerFrame.Complex, this, null);
var e = 0;
for (a = 0; a != this.altStateCount; a++) {
var f = this.altStates[a];
c.set (0);
try {
for (b = 0; b != f.count; b++) {
d.set (f.coefs[b]);
d.mult (f.bstates[b]);
c.add (d);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.print ("Exception at " + a + "\n");
} else {
throw e;
}
}
if (c.mag < 0.01) c.set (0);
f.set (c);
if (c.mag > e) e = f.mag;
}
if (e > 1) {
var f = 1 / e;
for (a = 0; a != this.altStateCount; a++) this.altStates[a].mult (f);

}});
c$ = Clazz.p0p ();
};
c$.$AtomViewerFrame$PhaseColor$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.r = 0;
this.g = 0;
this.b = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "PhaseColor");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.r = a;
this.g = b;
this.b = c;
}, "~N,~N,~N");
c$ = Clazz.p0p ();
};
c$.$AtomViewerFrame$View$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.scale = 0;
this.paneY = 0;
this.pixels = null;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "View", java.awt.Rectangle);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.AtomViewerFrame.View, []);
});
c$ = Clazz.p0p ();
};
c$.$AtomViewerFrame$TextBox$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.text = null;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomViewerFrame, "TextBox", java.awt.Rectangle);
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
Clazz.superConstructor (this, test.falstad.AtomViewerFrame.TextBox, [a, b, c, d]);
this.text = e;
}, "~N,~N,~N,~N,~S");
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
"MODE_ROTATE_X", 1,
"MODE_ROTATE_Y", 2,
"MODE_ROTATE_Z", 3,
"MODE_SLICE", 5,
"VIEW_REAL", 0,
"VIEW_COMPLEX", 1,
"VIEW_COMBO_REAL", 2,
"VIEW_COMBO_COMP", 3,
"VIEW_COMBO_N2L1", 4,
"VIEW_COMBO_N3L1", 5,
"VIEW_COMBO_N3L2", 6,
"VIEW_COMBO_N4L1", 7,
"VIEW_COMBO_N4L2", 8,
"VIEW_COMBO_N4L3", 9,
"VIEW_COMBO_HYBRID", 10,
"epsilon", .01,
"panePad", 4,
"phaseColorCount", 50,
"root6by4", .61237243569579452454);
});
