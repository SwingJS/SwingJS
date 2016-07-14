Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "$.Rectangle", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.QuantumOsc3dFrame", "$.QuantumOsc3d", "$.QuantumOsc3dLayout", "$.QuantumOsc3dCanvas"], ["java.awt.Color", "$.Dimension", "java.awt.image.MemoryImageSource", "java.util.Random", "swingjs.awt.Button", "$.Checkbox", "$.CheckboxMenuItem", "$.Choice", "$.Label", "$.Menu", "$.MenuBar", "$.MenuItem", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "QuantumOsc3dCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.QuantumOsc3dCanvas, []);
this.pg = p;
}, "test.falstad.QuantumOsc3dFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateQuantumOsc3d (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateQuantumOsc3d (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "QuantumOsc3dLayout", null, java.awt.LayoutManager);
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
}, test.falstad, "QuantumOsc3d", swingjs.awt.Applet);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.QuantumOsc3d.oc != null) test.falstad.QuantumOsc3d.oc.dispose ();
test.falstad.QuantumOsc3d.oc = null;
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.QuantumOsc3d.oc =  new test.falstad.QuantumOsc3dFrame (null);
test.falstad.QuantumOsc3d.oc.init ();
}, "~A");
Clazz.overrideMethod (c$, "init", 
function () {
test.falstad.QuantumOsc3d.oc =  new test.falstad.QuantumOsc3dFrame (this);
test.falstad.QuantumOsc3d.oc.init ();
});
Clazz.overrideMethod (c$, "destroy", 
function () {
if (test.falstad.QuantumOsc3d.oc != null) test.falstad.QuantumOsc3d.oc.dispose ();
test.falstad.QuantumOsc3d.oc = null;
});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.QuantumOsc3d.oc == null) s = "Applet is finished.";
 else if (test.falstad.QuantumOsc3d.oc.useFrame) test.falstad.QuantumOsc3d.oc.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.QuantumOsc3d, "paint", [g]);
}, "java.awt.Graphics");
Clazz.defineStatics (c$,
"oc", null);
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.gridSizeX = 200;
this.gridSizeY = 200;
this.blankButton = null;
this.normalizeButton = null;
this.maximizeButton = null;
this.memoryImageSourceCheck = null;
this.stoppedCheck = null;
this.colorCheck = null;
this.eCheckItem = null;
this.xCheckItem = null;
this.lCheckItem = null;
this.alwaysNormItem = null;
this.axesItem = null;
this.autoZoomItem = null;
this.animatedZoomItem = null;
this.measureMenu = null;
this.presetsMenu = null;
this.exitItem = null;
this.measureEItem = null;
this.measureLxItem = null;
this.measureLyItem = null;
this.measureLzItem = null;
this.dispGaussItem = null;
this.scaled1GaussItem = null;
this.scaled2GaussItem = null;
this.rotatingGaussItem = null;
this.dispX110Item = null;
this.dispZ110Item = null;
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
this.sampleBar = null;
this.viewPotential = null;
this.viewX = null;
this.viewL = null;
this.viewStates = null;
this.viewList = null;
this.viewCount = 0;
this.orbitals = null;
this.orbCount = 0;
this.phasors = null;
this.phasorCount = 0;
this.states = null;
this.stateCount = 0;
this.rectBasis = null;
this.lxBasis = null;
this.lyBasis = null;
this.basisList = null;
this.basisCount = 0;
this.textBoxes = null;
this.textCount = 0;
this.changingDerivedStates = false;
this.dragZoomStart = 0;
this.zoom = 0;
this.rotmatrix = null;
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
this.phiSector = 0;
this.bestBrightness = 0;
this.userBrightMult = 1;
this.manualScale = false;
this.gray2 = null;
this.fontMetrics = null;
this.main = null;
this.useFrame = false;
this.showControls = false;
this.cv = null;
this.l0Array = null;
this.l1xArray = null;
this.l1yArray = null;
this.l2xArray = null;
this.l2yArray = null;
this.l3xArray = null;
this.l3yArray = null;
this.l4xArray = null;
this.l4yArray = null;
this.rectArrayR = null;
this.rectArrayI = null;
this.shown = false;
this.codeLetter = null;
this.movedGaussian = null;
this.scaledGaussian = null;
this.scaled2Gaussian = null;
this.rotGaussianR = null;
this.rotGaussianI = null;
this.dispX110Array = null;
this.dispZ110Array = null;
this.scaleValue = -1;
this.finished = false;
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.Orbital")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$Orbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.SOrbital")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$SOrbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.MZeroOrbital")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$MZeroOrbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.PairedOrbital")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$PairedOrbital$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.Phasor")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$Phasor$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.State")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$State$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.BasisState")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$BasisState$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.DerivedState")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$DerivedState$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.AlternateBasis")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$AlternateBasis$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.Complex")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$Complex$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.PhaseColor")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$PhaseColor$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.View")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$View$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOsc3dFrame.TextBox")) {
test.falstad.QuantumOsc3dFrame.$QuantumOsc3dFrame$TextBox$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "QuantumOsc3dFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.prepareFields (c$, function () {
this.l0Array = [1, 0];
this.l1xArray = [.5, 0, -0.7071067811865476, 0, .5, 0, 0.7071067811865476, 0, 0, 0, -0.7071067811865476, 0, .5, 0, 0.7071067811865476, 0, .5, 0];
this.l1yArray = [.5, 0, 0, -0.7071067811865476, -0.5, 0, 0, -0.7071067811865476, 0, 0, 0, -0.7071067811865476, .5, 0, 0, 0.7071067811865476, -0.5, 0];
this.l2xArray = [0.25, 0, -0.5, 0, 0.6123724356957945, 0, -0.5, 0, 0.25, 0, -0.5, 0, .5, 0, 0, 0, -0.5, 0, .5, 0, 0.6123724356957945, 0, 0, 0, -0.5, 0, 0, 0, 0.6123724356957945, 0, -0.5, 0, -0.5, 0, 0, 0, .5, 0, .5, 0, 0.25, 0, 0.5, 0, 0.6123724356957945, 0, 0.5, 0, 0.25, 0];
this.l2yArray = [0.25, 0, 0, -0.5, -0.6123724356957945, 0, 0, 0.5, 0.25, 0, -0.5, 0, 0, .5, 0, 0, 0, .5, .5, 0, -0.6123724356957945, 0, 0, 0, -0.5, 0, 0, 0, -0.6123724356957945, 0, -0.5, 0, 0, -0.5, 0, 0, 0, -0.5, .5, 0, 0.25, 0, 0, 0.5, -0.6123724356957945, 0, 0, -0.5, 0.25, 0];
this.l3xArray = [0.125, 0, -0.306186, 0, 0.484123, 0, -0.559017, 0, 0.484123, 0, -0.306186, 0, 0.125, 0, -0.306186, 0, 0.5, 0, -0.395285, 0, 0., 0, 0.395285, 0, -0.5, 0, 0.306186, 0, 0.484123, 0, -0.395285, 0, -0.125, 0, 0.433013, 0, -0.125, 0, -0.395285, 0, 0.4841230, 0, 0.559017, 0, 0., 0, -0.433013, 0, 0., 0, 0.433013, 0, 0., 0, -0.559017, 0, 0.484123, 0, 0.395285, 0, -0.125, 0, -0.433013, 0, -0.125, 0, 0.395285, 0, 0.484123, 0, -0.306186, 0, -0.5, 0, -0.395285, 0, 0., 0, 0.395285, 0, 0.5, 0, 0.306186, 0, 0.125, 0, 0.306186, 0, 0.484123, 0, 0.559017, 0, 0.484123, 0, 0.306186, 0, 0.125, 0];
this.l3yArray = [-0.125, 0, 0, 0.306186, 0.484123, 0, 0, -0.559017, -0.484123, 0, 0, 0.306186, 0.125, 0, 0.306186, 0, 0, -0.5, -0.395285, 0, 0., 0, -0.395285, 0, 0, 0.5, 0.306186, 0, -0.484123, 0, 0, 0.395285, -0.125, 0, 0, 0.433013, 0.125, 0, 0, 0.395285, 0.484123, 0, 0, 0.559017, 0., 0, 0, 0.433013, 0., 0, 0, 0.433013, 0., 0, 0, 0.559017, -0.484123, 0, 0, -0.395285, -0.125, 0, 0, -0.433013, 0.125, 0, 0, -0.395285, 0.484123, 0, 0.306186, 0, 0, 0.5, -0.395285, 0, 0., 0, -0.395285, 0, 0, -0.5, 0.306186, 0, -0.125, 0, 0, -0.306186, 0.484123, 0, 0, 0.559017, -0.484123, 0, 0, -0.306186, 0.125, 0];
this.l4xArray = [0.0625, 0., -0.176777, 0., 0.330719, 0., -0.467707, 0., 0.522913, 0., -0.467707, 0., 0.330719, 0., -0.176777, 0., 0.0625, 0., -0.176777, 0., 0.375, 0., -0.467707, 0., 0.330719, 0., 0., 0., -0.330719, 0., 0.467707, 0., -0.375, 0., 0.176777, 0., 0.330719, 0., -0.467707, 0., 0.25, 0., 0.176777, 0., -0.395285, 0., 0.176777, 0., 0.25, 0., -0.467707, 0., 0.330719, 0., -0.467707, 0., 0.330719, 0., 0.176777, 0., -0.375, 0., 0., 0., 0.375, 0., -0.176777, 0., -0.330719, 0., 0.467707, 0., 0.522913, 0., 0., 0., -0.395285, 0., 0., 0., 0.375, 0., 0., 0., -0.395285, 0., 0., 0., 0.522913, 0., -0.467707, 0., -0.330719, 0., 0.176777, 0., 0.375, 0., 0., 0., -0.375, 0., -0.176777, 0., 0.330719, 0., 0.467707, 0., 0.330719, 0., 0.467707, 0., 0.25, 0., -0.176777, 0., -0.395285, 0., -0.176777, 0., 0.25, 0., 0.467707, 0., 0.330719, 0., -0.176777, 0., -0.375, 0., -0.467707, 0., -0.330719, 0., 0., 0., 0.330719, 0., 0.467707, 0., 0.375, 0., 0.176777, 0., 0.0625, 0., 0.176777, 0., 0.330719, 0., 0.467707, 0., 0.522913, 0., 0.467707, 0., 0.330719, 0., 0.176777, 0., 0.0625, 0.];
this.l4yArray = [0.0625, 0., 0., -0.176777, -0.330719, 0., 0., 0.467707, 0.522913, 0., 0., -0.467707, -0.330719, 0., 0., 0.176777, 0.0625, 0., -0.176777, 0., 0., 0.375, 0.467707, 0., 0., -0.330719, 0., 0., 0., -0.330719, -0.467707, 0., 0., 0.375, 0.176777, 0., 0.330719, 0., 0., -0.467707, -0.25, 0., 0., -0.176777, -0.395285, 0., 0., 0.176777, -0.25, 0., 0., 0.467707, 0.330719, 0., -0.467707, 0., 0., 0.330719, -0.176777, 0., 0., 0.375, 0., 0., 0., 0.375, 0.176777, 0., 0., 0.330719, 0.467707, 0., 0.522913, 0., 0., 0., 0.395285, 0., 0., 0., 0.375, 0., 0., 0., 0.395285, 0., 0., 0., 0.522913, 0., -0.467707, 0., 0., -0.330719, -0.176777, 0., 0., -0.375, 0., 0., 0., -0.375, 0.176777, 0., 0., -0.330719, 0.467707, 0., 0.330719, 0., 0., 0.467707, -0.25, 0., 0., 0.176777, -0.395285, 0., 0., -0.176777, -0.25, 0., 0., -0.467707, 0.330719, 0., -0.176777, 0., 0., -0.375, 0.467707, 0., 0., 0.330719, 0., 0., 0., 0.330719, -0.467707, 0., 0., -0.375, 0.176777, 0., 0.0625, 0., 0., 0.176777, -0.330719, 0., 0., -0.467707, 0.522913, 0., 0., 0.467707, -0.330719, 0., 0., -0.176777, 0.0625, 0.];
this.rectArrayR = [1., 0., 1., 0., -0.57735, 0., 0., 0.816497, 0., 0., 0., -0.774597, 0., 0., 0., 0., 0.632456, 0., 0., 0., 0.447214, 0., 0., -0.755929, 0., 0., 0., 0., 0., 0., 0.478091, 0., 0., 0., 0., 0.707107, 0., -0.707107, 0., 0., 0.707107, 0., -0.707107, 0., -0.316228, 0., 0.316228, 0., 0., 0.632456, 0., -0.632456, 0., 0., 0., 0., -0.46291, 0., 0.46291, 0., 0., 0., 0., 0.534522, 0., -0.534522, 0., 0., 0., -0.57735, 0.5, 0., -0.408248, 0., 0.5, 0., -0.447214, 0., 0., 0.5, 0., -0.547723, 0., 0.5, 0., 0.365148, -0.188982, 0., -0.154303, 0., -0.188982, 0., 0., 0.46291, 0., -0.58554, 0., 0.46291, 0., 0., -0.547723, 0., 0.547723, 0.353553, 0., -0.273861, 0., 0.273861, 0., -0.353553, 0., 0., -0.46291, 0., 0.46291, 0., 0., 0.353553, 0., -0.400892, 0., 0.400892, 0., -0.353553, 0., 0.447214, -0.46291, 0., 0.377964, 0., -0.46291, 0.25, 0., -0.188982, 0., 0.179284, 0., -0.188982, 0., 0.25, 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., -0.57735, -0.5, 0., -0.408248, 0., -0.5, 0., -0.447214, 0., 0., -0.5, 0., -0.547723, 0., -0.5, 0., 0.365148, 0.188982, 0., -0.154303, 0., 0.188982, 0., 0., -0.46291, 0., -0.58554, 0., -0.46291, 0., 0., -0.316228, 0., 0.316228, -0.612372, 0., -0.158114, 0., 0.158114, 0., 0.612372, 0., 0., -0.267261, 0., 0.267261, 0., 0., -0.612372, 0., -0.231455, 0., 0.231455, 0., 0.612372, 0., 0.365148, 0., 0., 0.308607, 0., 0., -0.612372, 0., 0., 0., 0.146385, 0., 0., 0., -0.612372, 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.447214, 0.46291, 0., 0.377964, 0., 0.46291, 0.25, 0., 0.188982, 0., 0.179284, 0., 0.188982, 0., 0.25];
this.rectArrayI = [0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., -0.707107, 0., -0.707107, 0., 0., -0.707107, 0., -0.707107, 0., 0.316228, 0., 0.316228, 0., 0., -0.632456, 0., -0.632456, 0., 0., 0., 0., 0.46291, 0., 0.46291, 0., 0., 0., 0., -0.534522, 0., -0.534522, 0., 0., 0., 0., -0.707107, 0., 0., 0., 0.707107, 0., 0., 0., 0., -0.707107, 0., 0., 0., 0.707107, 0., 0., 0.267261, 0., 0., 0., -0.267261, 0., 0., -0.654654, 0., 0., 0., 0.654654, 0., 0., 0.316228, 0., 0.316228, -0.612372, 0., 0.158114, 0., 0.158114, 0., -0.612372, 0., 0., 0.267261, 0., 0.267261, 0., 0., -0.612372, 0., 0.231455, 0., 0.231455, 0., -0.612372, 0., 0., 0.46291, 0., 0., 0., -0.46291, -0.5, 0., 0.188982, 0., 0., 0., -0.188982, 0., 0.5, 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.547723, 0., 0.547723, 0.353553, 0., 0.273861, 0., 0.273861, 0., 0.353553, 0., 0., 0.46291, 0., 0.46291, 0., 0., 0.353553, 0., 0.400892, 0., 0.400892, 0., 0.353553, 0., 0., 0.46291, 0., 0., 0., -0.46291, 0.5, 0., 0.188982, 0., 0., 0., -0.188982, 0., -0.5, 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.];
this.codeLetter = ["s", "p", "d", "f", "g", "h"];
this.movedGaussian = [.778801, .550695, .275348, .11241, .039743];
this.scaledGaussian = [0.252982, 0.185903, 0.124708, 0.0808198, 0.0514334, 0.0323663, 0.0202127, 0.0125533];
this.scaled2Gaussian = [0.923077, 0.251044, 0.0836194, -0.251044, -0.0682749, -0.0227415, 0.0836194, 0.0227415, 0.00757488];
this.rotGaussianR = [0.75484, 0., -0.150118, 0.400314, 0., -0.079612, 0.150118, 0., 0];
this.rotGaussianI = [0, 0.400314, 0, 0, 0.212299, 0, 0, 0.079612, 0];
this.dispX110Array = [-0.332133, 0.821986, 0.44035, 0.137825, 0];
this.dispZ110Array = [0.778801, 0.550695, 0.275348, 0.11241, 0.039743];
});
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "QuantumOsc3d by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.QuantumOsc3dFrame, ["3-D Quantum Oscillator Viewer"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.QuantumOsc3d");
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
this.gray2 =  new java.awt.Color (127, 127, 127);
var os = System.getProperty ("os.name");
var jv = System.getProperty ("java.version");
var altRender = false;
var res = 100;
if (os.indexOf ("Windows") == 0) {
res = 100;
if (jv.indexOf ("1.1") == 0) altRender = true;
}this.main.setLayout ( new test.falstad.QuantumOsc3dLayout ());
this.cv =  new test.falstad.QuantumOsc3dCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
var mb =  new swingjs.awt.MenuBar ();
var m =  new swingjs.awt.Menu ("File");
mb.add (m);
m.add (this.exitItem = this.getMenuItem ("Exit"));
m =  new swingjs.awt.Menu ("View");
mb.add (m);
m.add (this.eCheckItem = this.getCheckItem ("Energy"));
this.eCheckItem.setState (true);
m.add (this.xCheckItem = this.getCheckItem ("Position"));
this.xCheckItem.setState (true);
this.xCheckItem.disable ();
m.add (this.lCheckItem = this.getCheckItem ("Angular Momentum"));
m.addSeparator ();
m.add (this.colorCheck = this.getCheckItem ("Phase as Color"));
this.colorCheck.setState (true);
this.measureMenu = m =  new swingjs.awt.Menu ("Measure");
mb.add (m);
m.add (this.measureEItem = this.getMenuItem ("Measure Energy"));
m.add (this.measureLxItem = this.getMenuItem ("Measure Lx"));
m.add (this.measureLyItem = this.getMenuItem ("Measure Ly"));
m.add (this.measureLzItem = this.getMenuItem ("Measure Lz"));
this.setMenuBar (mb);
m =  new swingjs.awt.Menu ("Options");
mb.add (m);
this.alwaysNormItem = this.getCheckItem ("Always Normalize");
m.add (this.axesItem = this.getCheckItem ("Show Axes"));
this.axesItem.setState (true);
m.add (this.autoZoomItem = this.getCheckItem ("Auto Scale"));
this.autoZoomItem.setState (true);
m.add (this.animatedZoomItem = this.getCheckItem ("Animated Scaling"));
this.animatedZoomItem.setState (true);
this.presetsMenu = m =  new swingjs.awt.Menu ("Presets");
mb.add (m);
m.add (this.dispGaussItem = this.getMenuItem ("Displaced Gaussian"));
m.add (this.scaled1GaussItem = this.getMenuItem ("Scaled Gaussian 1"));
m.add (this.scaled2GaussItem = this.getMenuItem ("Scaled Gaussian 2"));
m.add (this.rotatingGaussItem = this.getMenuItem ("Rotating Gaussian"));
m.add (this.dispX110Item = this.getMenuItem ("1,0,1 Displaced X"));
m.add (this.dispZ110Item = this.getMenuItem ("1,0,0 Displaced Z"));
this.setMenuBar (mb);
this.viewChooser =  new swingjs.awt.Choice ();
this.viewChooser.add ("Single Wave Functions");
this.viewChooser.add ("Combinations");
this.viewChooser.add ("Rectangular Combos");
this.viewChooser.add ("Multiple Bases (n=1)");
this.viewChooser.add ("Multiple Bases (n=2)");
this.viewChooser.add ("Multiple Bases (n=3)");
this.viewChooser.add ("Multiple Bases (n=4)");
this.viewChooser.addItemListener (this);
this.main.add (this.viewChooser);
var i;
this.nChooser =  new swingjs.awt.Choice ();
for (i = 0; i <= 11; i++) this.nChooser.add ("nr = " + i);

this.nChooser.addItemListener (this);
this.main.add (this.nChooser);
this.nChooser.select (0);
this.lChooser =  new swingjs.awt.Choice ();
for (i = 0; i <= 10; i++) this.lChooser.add ("l = " + i + ((i < 6) ? " (" + this.codeLetter[i] + ")" : ""));

this.lChooser.addItemListener (this);
this.main.add (this.lChooser);
this.mChooser =  new swingjs.awt.Choice ();
this.mChooser.addItemListener (this);
this.main.add (this.mChooser);
this.sliceChooser =  new swingjs.awt.Choice ();
this.sliceChooser.add ("No Slicing");
this.sliceChooser.add ("Show X Slice");
this.sliceChooser.add ("Show Y Slice");
this.sliceChooser.add ("Show Z Slice");
this.sliceChooser.addItemListener (this);
this.main.add (this.sliceChooser);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Adjust View");
this.modeChooser.add ("Mouse = Rotate X");
this.modeChooser.add ("Mouse = Rotate Y");
this.modeChooser.add ("Mouse = Rotate Z");
this.modeChooser.addItemListener (this);
this.main.add (this.modeChooser);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
this.main.add (this.stoppedCheck);
this.main.add (this.blankButton =  new swingjs.awt.Button ("Clear"));
this.blankButton.addActionListener (this);
this.main.add (this.normalizeButton =  new swingjs.awt.Button ("Normalize"));
this.normalizeButton.addActionListener (this);
this.main.add (this.maximizeButton =  new swingjs.awt.Button ("Maximize"));
this.maximizeButton.addActionListener (this);
this.lChooser.select (3);
this.setLValue ();
this.memoryImageSourceCheck =  new swingjs.awt.Checkbox ("Alternate Rendering", altRender);
this.memoryImageSourceCheck.addItemListener (this);
this.main.add (this.memoryImageSourceCheck);
this.main.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.main.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 20, 1, 1, 200));
this.speedBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 240, 1, 1, 4000));
this.brightnessBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Image Resolution", 0));
this.main.add (this.resolutionBar =  new swingjs.awt.Scrollbar (0, res, 2, 20, 500));
this.resolutionBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Scale", 0));
this.main.add (this.scaleBar =  new swingjs.awt.Scrollbar (0, 75, 1, 5, 1620));
this.scaleBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("http://www.falstad.com", 0));
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
this.phaseColors =  Clazz.newArray (8, 51, null);
for (i = 0; i != 8; i++) for (j = 0; j <= 50; j++) {
var ang = java.lang.Math.atan (j / 50);
this.phaseColors[i][j] = this.genPhaseColor (i, ang);
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
this.random =  new java.util.Random ();
this.reinit ();
this.orbitalChanged ();
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
}this.finished = true;
});
Clazz.defineMethod (c$, "setupStates", 
function () {
this.stateCount = 1452;
var i;
this.states =  new Array (this.stateCount);
var nr = 0;
var l = 0;
var m = 0;
for (i = 0; i != this.stateCount; i++) {
var bs = this.states[i] = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.BasisState, this, null);
bs.elevel = 2 * nr + l + 1.5;
bs.nr = nr;
bs.l = l;
bs.m = m;
bs.n = 2 * nr + l;
if (m < l) m++;
 else {
l++;
if (l <= 10) m = -l;
 else {
nr++;
l = m = 0;
}}}
this.basisList =  new Array (17);
this.basisCount = 0;
this.rectBasis = this.setupRectBasis ();
this.lxBasis = this.initBasis (35, true);
this.setupLBasis (this.lxBasis, 0, 0, true, this.l0Array);
this.setupLBasis (this.lxBasis, 0, 1, true, this.l1xArray);
this.setupLBasis (this.lxBasis, 0, 2, true, this.l2xArray);
this.setupLBasis (this.lxBasis, 0, 3, true, this.l3xArray);
this.setupLBasis (this.lxBasis, 0, 4, true, this.l4xArray);
this.setupLBasis (this.lxBasis, 1, 0, true, this.l0Array);
this.setupLBasis (this.lxBasis, 1, 1, true, this.l1xArray);
this.setupLBasis (this.lxBasis, 1, 2, true, this.l2xArray);
this.setupLBasis (this.lxBasis, 2, 0, true, this.l0Array);
this.lyBasis = this.initBasis (35, true);
this.setupLBasis (this.lyBasis, 0, 0, false, this.l0Array);
this.setupLBasis (this.lyBasis, 0, 1, false, this.l1yArray);
this.setupLBasis (this.lyBasis, 0, 2, false, this.l2yArray);
this.setupLBasis (this.lyBasis, 0, 3, false, this.l3yArray);
this.setupLBasis (this.lyBasis, 0, 4, false, this.l4yArray);
this.setupLBasis (this.lyBasis, 1, 0, false, this.l0Array);
this.setupLBasis (this.lyBasis, 1, 1, false, this.l1yArray);
this.setupLBasis (this.lyBasis, 1, 2, false, this.l2yArray);
this.setupLBasis (this.lyBasis, 2, 0, false, this.l0Array);
});
Clazz.defineMethod (c$, "initBasis", 
function (sct, xAxis) {
var basis = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.AlternateBasis, this, null);
basis.xAxis = xAxis;
basis.altStates =  new Array (sct);
basis.altStateCount = 0;
return basis;
}, "~N,~B");
Clazz.defineMethod (c$, "setupLBasis", 
function (basis, nr, l, xAxis, arr) {
var mtext = (xAxis) ? "mx" : "my";
var i;
var lct = l * 2 + 1;
var ap = 0;
for (i = 0; i != lct; i++) {
var sn = basis.altStateCount++;
var ds = basis.altStates[sn] = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.DerivedState, this, null);
ds.basis = basis;
ds.count = lct;
ds.bstates =  new Array (lct);
ds.coefs =  new Array (lct);
ds.m = i - l;
ds.l = l;
ds.nr = nr;
ds.n = 2 * nr + l;
ds.elevel = 2 * nr + l + 1.5;
var j;
for (j = 0; j != lct; j++) {
ds.bstates[j] = this.getState (nr, l, j - l);
ds.coefs[j] = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Complex, this, null);
}
ds.text = "n = " + ds.n + ", nr = " + nr + ", l = " + l + ", " + mtext + " = " + ds.m;
for (j = 0; j != lct; j++) {
ds.coefs[j].set (arr[ap], arr[ap + 1]);
ap += 2;
}
}
}, "test.falstad.QuantumOsc3dFrame.AlternateBasis,~N,~N,~B,~A");
Clazz.defineMethod (c$, "setupRectBasis", 
function () {
var sct = 35;
var basis = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.AlternateBasis, this, null);
basis.altStates =  new Array (sct);
basis.altStateCount = sct;
var i;
var nx = 0;
var ny = 0;
var nz = 0;
var ap = 0;
for (i = 0; i != sct; i++) {
var n = nx + ny + nz;
var n21 = Clazz.doubleToInt (n / 2) + 1;
var l = ((n & 1) == 0) ? 0 : 1;
var nr = Clazz.doubleToInt (n / 2);
var m = -l;
var ds = basis.altStates[i] = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.DerivedState, this, null);
ds.basis = basis;
ds.count = (l == 0) ? 2 * n21 * n21 - n21 : 2 * n21 * n21 + n21;
ds.bstates =  new Array (sct);
ds.coefs =  new Array (sct);
ds.text = "nx = " + nx + ", ny = " + ny + ", nz = " + nz;
ds.nx = nx;
ds.ny = ny;
ds.nz = nz;
ds.n = n;
ds.elevel = 2 * nr + l + 1.5;
var j;
for (j = 0; j != ds.count; j++) {
ds.bstates[j] = this.getState (nr, l, m);
ds.coefs[j] = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Complex, this, null, this.rectArrayR[ap], this.rectArrayI[ap]);
ap++;
if (m++ == l) {
l += 2;
nr--;
m = -l;
}}
if (i == sct - 1) break;
do {
nz++;
if (nz > 4) {
nz = 0;
nx++;
if (nx > 4) {
nx = 0;
ny++;
}}} while (nx + ny + nz > 4);
}
return basis;
});
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
c = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.PhaseColor, this, null, 1, a2, 0);
break;
case 1:
c = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.PhaseColor, this, null, a3, 1, 0);
break;
case 2:
c = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.PhaseColor, this, null, 0, 1, a2);
break;
case 3:
c = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.PhaseColor, this, null, 0, a3, 1);
break;
case 4:
c = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.PhaseColor, this, null, a2, 0, 1);
break;
case 5:
c = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.PhaseColor, this, null, 1, 0, a3);
break;
}
return c;
}, "~N,~N");
Clazz.defineMethod (c$, "setupSimpson", 
function () {
this.sampleCount = 9;
this.sampleMult =  Clazz.newIntArray (this.sampleCount, 0);
var i;
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
Clazz.defineMethod (c$, "triggerShow", 
function () {
if (!this.shown) this.setVisible (true);
this.shown = true;
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
case 0:
this.nChooser.show ();
this.lChooser.show ();
this.mChooser.show ();
this.modeChooser.hide ();
this.modeChooser.select (0);
this.blankButton.hide ();
this.normalizeButton.hide ();
this.maximizeButton.hide ();
this.alwaysNormItem.disable ();
this.measureMenu.disable ();
break;
default:
this.nChooser.hide ();
this.lChooser.hide ();
this.mChooser.hide ();
this.modeChooser.show ();
this.blankButton.show ();
this.normalizeButton.show ();
this.maximizeButton.show ();
this.alwaysNormItem.enable ();
this.measureMenu.enable ();
break;
}
switch (this.viewChooser.getSelectedIndex ()) {
case 1:
case 2:
this.presetsMenu.enable ();
break;
default:
this.presetsMenu.disable ();
break;
}
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
var y0 = y;
var nr = 0;
var l = 0;
var m = 0;
var sz2;
this.textBoxes =  new Array (10);
switch (this.viewChooser.getSelectedIndex ()) {
case 0:
break;
case 1:
this.phasorCount = 100;
this.phasors =  new Array (this.phasorCount);
sz2 = Clazz.doubleToInt (this.viewStates.width / 25);
if (sz > sz2) sz = sz2;
if (sz < 10) sz = 10;
for (i = 0; i != this.phasorCount; i++) {
var ph = this.phasors[i] = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Phasor, this, null, x, y, sz, sz);
ph.state = this.getState (nr, l, m);
x += sz;
if (++m > l) {
y += Clazz.doubleToInt (sz / 2);
l++;
m = -l;
if (l >= 5) {
x = 0;
y0 += sz;
y = y0;
nr++;
l = m = 0;
}}}
break;
case 2:
sz = Clazz.doubleToInt (this.viewStates.height / 5);
this.phasorCount = this.rectBasis.altStateCount;
this.phasors =  new Array (this.phasorCount);
i = 0;
for (m = 0; m != 5; m++) {
i = this.createRectPhasors (x, y, sz, i, 5 - m);
x += (5 - m) * sz + Clazz.doubleToInt (sz / 2);
}
break;
case 3:
this.phasorCount = 12;
this.phasors =  new Array (this.phasorCount);
i = 0;
i = this.createBasisPhasors (x, y, sz, i, 0, 1);
this.createText ("Lz", x + sz * 3, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.lxBasis, 3, 1);
this.createText ("Lx", x + sz * 3, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.lyBasis, 3, 1);
this.createText ("Ly", x + sz * 3, y, sz);
y += sz;
i = this.createRectPhasorsN (x, y, sz, i, this.rectBasis, 1);
this.createText ("Rect", x + sz * 3, y, sz);
break;
case 4:
this.phasorCount = 24;
this.phasors =  new Array (this.phasorCount);
i = 0;
i = this.createBasisPhasors (x, y, sz, i, 1, 0);
i = this.createBasisPhasors (x + sz * 2, y, sz, i, 0, 2);
this.createText ("Lz", x + sz * 7, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.lxBasis, 1, 25);
i = this.createAltPhasors (x + sz * 2, y, sz, i, this.lxBasis, 5, 4);
this.createText ("Lx", x + sz * 7, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.lyBasis, 1, 25);
i = this.createAltPhasors (x + sz * 2, y, sz, i, this.lyBasis, 5, 4);
this.createText ("Ly", x + sz * 7, y, sz);
y += sz;
i = this.createRectPhasorsN (x, y, sz, i, this.rectBasis, 2);
this.createText ("Rect", x + sz * 7, y, sz);
break;
case 5:
this.phasorCount = 40;
this.phasors =  new Array (this.phasorCount);
i = 0;
i = this.createBasisPhasors (x, y, sz, i, 1, 1);
i = this.createBasisPhasors (x + sz * 4, y, sz, i, 0, 3);
this.createText ("Lz", x + sz * 12, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.lxBasis, 3, 26);
i = this.createAltPhasors (x + sz * 4, y, sz, i, this.lxBasis, 7, 9);
this.createText ("Lx", x + sz * 12, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.lyBasis, 3, 26);
i = this.createAltPhasors (x + sz * 4, y, sz, i, this.lyBasis, 7, 9);
this.createText ("Ly", x + sz * 12, y, sz);
y += sz;
i = this.createRectPhasorsN (x, y, sz, i, this.rectBasis, 3);
this.createText ("Rect", x + sz * 12, y, sz);
break;
case 6:
this.phasorCount = 60;
this.phasors =  new Array (this.phasorCount);
i = 0;
i = this.createBasisPhasors (x, y, sz, i, 2, 0);
i = this.createBasisPhasors (x + sz * 2, y, sz, i, 1, 2);
i = this.createBasisPhasors (x + sz * 8, y, sz, i, 0, 4);
this.createText ("Lz", x + sz * 17, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.lxBasis, 1, 34);
i = this.createAltPhasors (x + sz * 2, y, sz, i, this.lxBasis, 5, 29);
i = this.createAltPhasors (x + sz * 8, y, sz, i, this.lxBasis, 9, 16);
this.createText ("Lx", x + sz * 17, y, sz);
y += sz;
i = this.createAltPhasors (x, y, sz, i, this.lyBasis, 1, 34);
i = this.createAltPhasors (x + sz * 2, y, sz, i, this.lyBasis, 5, 29);
i = this.createAltPhasors (x + sz * 8, y, sz, i, this.lyBasis, 9, 16);
this.createText ("Ly", x + sz * 17, y, sz);
y += sz;
i = this.createRectPhasorsN (x, y, sz, i, this.rectBasis, 4);
this.createText ("Rect", x + sz * 17, y, sz);
break;
}
for (i = 0; i != this.phasorCount; i++) this.phasors[i].state.setBasisActive ();

for (i = 0; i != this.basisCount; i++) {
if (this.basisList[i].active) {
this.basisList[i].convertBasisToDerived ();
this.basisList[i].convertDerivedToBasis ();
}}
if (this.viewChooser.getSelectedIndex () == 1) for (i = 0; i != this.stateCount; i++) if (this.states[i].nr >= 4 || this.states[i].l >= 5) this.states[i].set (0);

this.createOrbitals ();
});
Clazz.defineMethod (c$, "higherStatesPresent", 
function () {
var i;
for (i = 0; i != this.stateCount; i++) if (this.states[i].n > 4 && this.states[i].mag > 0) return true;

return false;
});
Clazz.defineMethod (c$, "setInitialOrbital", 
function () {
if (this.phasorCount == 0) return;
var i;
for (i = 0; i != this.phasorCount; i++) if (this.phasors[i].state.mag > 0) return;

this.doClear ();
this.phasors[0].state.set (1);
this.createOrbitals ();
});
Clazz.defineMethod (c$, "createBasisPhasors", 
function (x, y, sz, i, nr, l) {
var j;
for (j = 0; j != l * 2 + 1; j++) {
var ph = this.phasors[i] = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Phasor, this, null, x, y, sz, sz);
ph.state = this.getState (nr, l, j - l);
x += sz;
i++;
}
return i;
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "createAltPhasors", 
function (x, y, sz, i, basis, ct, offset) {
var j;
for (j = 0; j != ct; j++) {
var ph = this.phasors[i] = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Phasor, this, null, x, y, sz, sz);
ph.state = basis.altStates[j + offset];
x += sz;
i++;
}
return i;
}, "~N,~N,~N,~N,test.falstad.QuantumOsc3dFrame.AlternateBasis,~N,~N");
Clazz.defineMethod (c$, "createRectPhasorsN", 
function (x, y, sz, i, basis, n) {
var j;
for (j = 0; j != basis.altStateCount; j++) {
var ds = basis.altStates[j];
if (ds.nx + ds.ny + ds.nz != n) continue;
var ph = this.phasors[i] = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Phasor, this, null, x, y, sz, sz);
ph.state = basis.altStates[j];
x += sz;
i++;
}
return i;
}, "~N,~N,~N,~N,test.falstad.QuantumOsc3dFrame.AlternateBasis,~N");
Clazz.defineMethod (c$, "createRectPhasors", 
function (x, y, sz, i, nz) {
while (nz > 0) {
i = this.createAltPhasors (x, y, sz, i, this.rectBasis, nz, i);
y += sz;
nz--;
}
return i;
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "createText", 
function (text, x, y, sz) {
var tb = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.TextBox, this, null, x + 10, y, this.winSize.width - x, sz, text);
this.textBoxes[this.textCount++] = tb;
}, "~S,~N,~N,~N");
Clazz.defineMethod (c$, "setupDisplay", 
function () {
if (this.winSize == null) return;
var potsize = (this.viewPotential == null) ? 50 : this.viewPotential.height;
var statesize = (this.viewStates == null) ? 64 : this.viewStates.height;
this.viewX = this.viewPotential = this.viewL = this.viewStates = null;
this.viewList =  new Array (10);
var i = 0;
if (this.eCheckItem.getState ()) this.viewList[i++] = this.viewPotential = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.View, this, null);
if (this.xCheckItem.getState ()) this.viewList[i++] = this.viewX = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.View, this, null);
if (this.lCheckItem.getState ()) this.viewList[i++] = this.viewL = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.View, this, null);
if (this.viewChooser.getSelectedIndex () > 0) this.viewList[i++] = this.viewStates = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.View, this, null);
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
this.pixels =  Clazz.newIntArray (this.viewX.width * this.viewX.height, 0);
for (i = 0; i != this.viewX.width * this.viewX.height; i++) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (this.viewX.width, this.viewX.height, this.pixels, 0, this.viewX.width);
var asize = Clazz.doubleToInt (this.min (this.viewX.width, this.viewX.height) / 3);
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
var r1cos = java.lang.Math.cos (angle1);
var r1sin = java.lang.Math.sin (angle1);
var r2cos = java.lang.Math.cos (angle2);
var r2sin = java.lang.Math.sin (angle2);
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
Clazz.defineMethod (c$, "getNR", 
function () {
return this.nChooser.getSelectedIndex ();
});
Clazz.defineMethod (c$, "getL", 
function () {
return this.lChooser.getSelectedIndex ();
});
Clazz.defineMethod (c$, "getM", 
function () {
return this.mChooser.getSelectedIndex () - this.getL ();
});
Clazz.defineMethod (c$, "setLValue", 
function () {
var l = this.getL ();
var i;
this.mChooser.removeAll ();
for (i = -l; i <= l; i++) this.mChooser.add ("m = " + i);

this.mChooser.select (l);
this.validate ();
});
Clazz.defineMethod (c$, "computeView", 
function (colorMult, normmult) {
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
var br = oo.getBoundRadius (colorMult);
if (br > boundRadius2) boundRadius2 = br;
}
boundRadius2 *= boundRadius2;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var camvx0 = (2 * i / this.gridSizeX - 1) * aratiox;
var camvy0 = -(2 * j / this.gridSizeY - 1) * aratioy;
var camx = rotm[2] * test.falstad.QuantumOsc3dFrame.viewDistance;
var camy = rotm[5] * test.falstad.QuantumOsc3dFrame.viewDistance;
var camz = rotm[8] * test.falstad.QuantumOsc3dFrame.viewDistance;
var camvx = rotm[0] * camvx0 + rotm[1] * camvy0 - rotm[2];
var camvy = rotm[3] * camvx0 + rotm[4] * camvy0 - rotm[5];
var camvz = rotm[6] * camvx0 + rotm[7] * camvy0 - rotm[8];
var camnorm = java.lang.Math.sqrt (camvx0 * camvx0 + camvy0 * camvy0 + 1);
var n;
var simpr = 0;
var simpg = 0;
var simpb = 0;
var a = camvx * camvx + camvy * camvy + camvz * camvz;
var b = 2 * (camvx * camx + camvy * camy + camvz * camz);
var c = camx * camx + camy * camy + camz * camz - boundRadius2;
var discrim = b * b - 4 * a * c;
this.func[i][j][0] = this.func[i][j][1] = this.func[i][j][2] = 0;
if (discrim < 0) {
continue;
}discrim = java.lang.Math.sqrt (discrim);
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
if (t < mint || t > maxt) continue;
mint = maxt = t;
}var tstep = (maxt - mint) / (this.sampleCount - 1);
var pathlen = (maxt - mint) * camnorm;
var maxn = this.sampleCount;
var xx = (camx + camvx * mint) * xmult;
var yy = (camy + camvy * mint) * ymult;
var zz = (camz + camvz * mint) * zmult;
if (slice != 0) {
maxn = 1;
pathlen = 2;
if (xx > xmult || yy > ymult || zz > zmult || xx < -xmult || yy < -ymult || zz < -zmult) continue;
}camvx *= tstep * xmult;
camvy *= tstep * ymult;
camvz *= tstep * zmult;
var dshalf = Clazz.doubleToInt (this.dataSize / 2);
var oi;
for (n = 0; n < maxn; n++) {
var r = java.lang.Math.sqrt (xx * xx + yy * yy + zz * zz);
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
this.func[i][j][0] = simpr;
this.func[i][j][1] = simpg;
this.func[i][j][2] = simpb;
}

}, "~N,~N");
Clazz.defineMethod (c$, "getPhaseColor", 
function (x, y) {
var sector = 0;
var val = 0;
if (x == 0 && y == 0) return this.phaseColors[0][0];
if (y >= 0) {
if (x >= 0) {
if (x >= y) {
sector = 0;
val = y / x;
} else {
sector = 1;
val = 1 - x / y;
}} else {
if (-x <= y) {
sector = 2;
val = -x / y;
} else {
sector = 3;
val = 1 + y / x;
}}} else {
if (x <= 0) {
if (y >= x) {
sector = 4;
val = y / x;
} else {
sector = 5;
val = 1 - x / y;
}} else {
if (-y >= x) {
sector = 6;
val = -x / y;
} else {
sector = 7;
val = 1 + y / x;
}}}return this.phaseColors[sector][Clazz.doubleToInt (val * 50)];
}, "~N,~N");
Clazz.defineMethod (c$, "calcPhiComponent", 
function (x, y) {
this.phiSector = 0;
var val = 0;
if (x == 0 && y == 0) {
this.phiSector = 0;
this.phiIndex = 0;
return;
}if (y >= 0) {
if (x >= 0) {
if (x >= y) {
this.phiSector = 0;
val = y / x;
} else {
this.phiSector = 1;
val = 1 - x / y;
}} else {
if (-x <= y) {
this.phiSector = 2;
val = -x / y;
} else {
this.phiSector = 3;
val = 1 + y / x;
}}} else {
if (x <= 0) {
if (y >= x) {
this.phiSector = 4;
val = y / x;
} else {
this.phiSector = 5;
val = 1 - x / y;
}} else {
if (-y >= x) {
this.phiSector = 6;
val = -x / y;
} else {
this.phiSector = 7;
val = 1 + y / x;
}}}this.phiIndex = Clazz.doubleToInt (val * this.dataSize);
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
var scaleValue = Clazz.doubleToInt (outer * 148);
var oldScaleValue = this.scaleBar.getValue ();
if (oldScaleValue != scaleValue) {
var diff = scaleValue - oldScaleValue;
if (diff < -5 || diff > 5) {
diff /= 3;
if (diff < -50) diff = -50;
if (diff > 50) diff = 50;
}var nv = oldScaleValue + diff;
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
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateQuantumOsc3d", 
function (realg) {
var g = null;
if (this.winSize == null || this.winSize.width == 0) return;
var mis = this.memoryImageSourceCheck.getState ();
g = this.dbimage.getGraphics ();
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
if (this.fontMetrics == null) this.fontMetrics = g.getFontMetrics ();
var allQuiet = false;
var tadd = 0;
if (!this.stoppedCheck.getState ()) {
var val = this.speedBar.getValue ();
tadd = val * (0.00625);
this.t += tadd;
} else allQuiet = true;
var norm = 0;
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
st.rotate (-(st.elevel + 0.0) * tadd);
}norm += st.magSquared ();
}
normmult2 = 1 / norm;
if (norm == 0) normmult2 = 0;
normmult = java.lang.Math.sqrt (normmult2);
var skipBasis = (this.changingDerivedStates) ? (this.selectedState).basis : null;
for (i = 0; i != this.basisCount; i++) {
var basis = this.basisList[i];
if (basis !== skipBasis && basis.active) basis.convertBasisToDerived ();
}
this.setScale ();
this.setBrightness (normmult2);
var sliced = this.sliceChooser.getSelectedIndex () != 0;
this.zoom = (sliced) ? 8 : 16.55;
var colorMult = java.lang.Math.exp (this.brightnessBar.getValue () / 100.);
this.computeView (colorMult, normmult);
var j;
var k;
for (i = 1; i != this.viewCount; i++) {
g.setColor (i == this.selectedPaneHandle ? java.awt.Color.yellow : java.awt.Color.gray);
g.drawLine (0, this.viewList[i].paneY, this.winSize.width, this.viewList[i].paneY);
}
if (this.viewPotential != null) {
var ymult = 10;
g.setColor (java.awt.Color.darkGray);
var floory = this.viewPotential.y + this.viewPotential.height - 1;
for (i = 0; i != 50; i++) {
var e = (i + 1.5);
var y = floory - Clazz.doubleToInt (ymult * e);
if (y >= 0) g.drawLine (0, y, this.winSize.width, y);
}
var xp = this.getScaler ();
g.setColor (java.awt.Color.white);
var ox = -1;
var oy = -1;
var x;
for (x = 0; x != this.winSize.width; x++) {
var xx = (x - Clazz.doubleToInt (this.winSize.width / 2)) * xp;
var dy = .5 * xx * xx;
var y = floory - Clazz.doubleToInt (ymult * dy);
if (y < 0) {
if (ox == -1) continue;
g.drawLine (ox, oy, ox, 0);
ox = -1;
continue;
}if (ox == -1 && x > 0) {
g.drawLine (x, 0, x, y);
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
var y = floory - Clazz.doubleToInt (ymult * expecte);
g.setColor (java.awt.Color.red);
g.drawLine (0, y, this.winSize.width, y);
}if (this.selectedState != null && !this.dragging) {
g.setColor (java.awt.Color.yellow);
var y = floory - Clazz.doubleToInt (ymult * this.selectedState.elevel);
g.drawLine (0, y, this.winSize.width, y);
}}if (this.viewL != null) {
var maxm = 4;
var pad = 3;
var ct = (maxm * 2 + 1) * pad;
var ldata =  Clazz.newDoubleArray (ct, 0);
if (!this.higherStatesPresent ()) {
this.calcLxy (this.lxBasis, ldata, ct, maxm, pad, true, false);
this.drawFunction (g, this.viewL, 0, ldata, ct, pad, false);
this.calcLxy (this.lyBasis, ldata, ct, maxm, pad, false, false);
this.drawFunction (g, this.viewL, 1, ldata, ct, pad, false);
this.calcLz (ldata, ct, maxm, pad, false);
this.drawFunction (g, this.viewL, 2, ldata, ct, pad, false);
}}var winw = this.viewX.width;
var winh = this.viewX.height;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var x = Clazz.doubleToInt (i * winw / this.gridSizeX);
var y = Clazz.doubleToInt (j * winh / this.gridSizeY);
var x2 = Clazz.doubleToInt ((i + 1) * winw / this.gridSizeX);
var y2 = Clazz.doubleToInt ((j + 1) * winh / this.gridSizeY);
var cr = this.func[i][j][0] * colorMult;
var cg = this.func[i][j][1] * colorMult;
var cb = this.func[i][j][2] * colorMult;
if (cr == 0 && cg == 0 && cb == 0) {
var l;
if (mis) for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.viewX.width] = 0xFF000000;


continue;
}var fm = this.max (cr, this.max (cg, cb));
if (fm > 255) {
fm /= 255;
cr /= fm;
cg /= fm;
cb /= fm;
}var colval = 0xFF000000 + ((Clazz.doubleToInt (cr)) << 16) | ((Clazz.doubleToInt (cg)) << 8) | ((Clazz.doubleToInt (cb)));
if (mis) {
var l;
for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.viewX.width] = colval;


} else {
g.setColor ( new java.awt.Color (colval));
g.fillRect (x, y + this.viewX.y, x2 - x, y2 - y);
}}

if (mis) {
var dbimage2 = this.cv.createImage (this.imageSource);
g.drawImage (dbimage2, this.viewX.x, this.viewX.y, null);
}g.setColor (java.awt.Color.white);
if (sliced) this.drawCube (g, false);
if (this.axesItem.getState ()) this.drawAxes (g);
for (i = 0; i != this.textCount; i++) {
var tb = this.textBoxes[i];
var h = Clazz.doubleToInt ((tb.height + this.fontMetrics.getAscent () - this.fontMetrics.getDescent ()) / 2);
g.drawString (tb.text, tb.x, tb.y + h);
}
g.setColor (java.awt.Color.yellow);
if (this.selectedState != null) this.centerString (g, this.selectedState.getText (), this.viewX.y + this.viewX.height - 5);
if (this.viewStates != null) this.drawPhasors (g, this.viewStates);
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
var xp = 2 * scalex / test.falstad.QuantumOsc3dFrame.viewDistance;
var mult = this.scaleBar.getValue () / 2500.;
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
var viewx = test.falstad.QuantumOsc3dFrame.viewDistance * this.rotmatrix[2];
var viewy = test.falstad.QuantumOsc3dFrame.viewDistance * this.rotmatrix[5];
var viewz = test.falstad.QuantumOsc3dFrame.viewDistance * this.rotmatrix[8];
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
var yel = (this.selectedState != null && this.selectedState.elevel == st.elevel);
if (this.viewChooser.getSelectedIndex () >= 3) yel = (this.selectedState === st);
g.setColor (yel ? java.awt.Color.yellow : st.mag == 0 ? this.gray2 : java.awt.Color.white);
g.drawOval (x - ss2, y - ss2, ss, ss);
var xa = Clazz.doubleToInt (st.re * ss2);
var ya = Clazz.doubleToInt (-st.im * ss2);
g.drawLine (x, y, x + xa, y + ya);
g.fillOval (x + xa - 1, y + ya - 1, 3, 3);
}
}, "java.awt.Graphics,test.falstad.QuantumOsc3dFrame.View");
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
var maxnm = java.lang.Math.sqrt (maxsq);
var uncert = java.lang.Math.sqrt (expectx2 - expectx * expectx);
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
}}, "java.awt.Graphics,test.falstad.QuantumOsc3dFrame.View,~N,~A,~N,~N,~B");
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
var l = java.lang.Math.sqrt ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
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
var realz = test.falstad.QuantumOsc3dFrame.viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
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
var mx = test.falstad.QuantumOsc3dFrame.viewDistance * rotm[2];
var my = test.falstad.QuantumOsc3dFrame.viewDistance * rotm[5];
var mz = test.falstad.QuantumOsc3dFrame.viewDistance * rotm[8];
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
if (e.getSource () === this.dispGaussItem) this.doDispGaussian ();
if (e.getSource () === this.scaled1GaussItem) this.doScaled1Gaussian ();
if (e.getSource () === this.scaled2GaussItem) this.doScaled2Gaussian ();
if (e.getSource () === this.rotatingGaussItem) this.doRotatingGaussian ();
if (e.getSource () === this.dispX110Item) this.doDispX110 ();
if (e.getSource () === this.dispZ110Item) this.doDispZ110 ();
if (e.getSource () === this.measureEItem) this.measureE ();
if (e.getSource () === this.measureLxItem) this.measureL (0);
if (e.getSource () === this.measureLyItem) this.measureL (1);
if (e.getSource () === this.measureLzItem) this.measureL (2);
}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "doDispGaussian", 
function () {
this.doClear ();
var i;
this.rectBasis.convertBasisToDerived ();
for (i = 0; i != 5; i++) this.rectBasis.altStates[i].set (this.movedGaussian[i], 0);

this.rectBasis.convertDerivedToBasis ();
this.createOrbitals ();
});
Clazz.defineMethod (c$, "doScaled1Gaussian", 
function () {
this.doClear ();
var i;
for (i = 0; i != 8; i++) this.getState (i, 0, 0).set (this.scaledGaussian[i]);

this.createOrbitals ();
});
Clazz.defineMethod (c$, "doScaled2Gaussian", 
function () {
this.doClear ();
var i;
for (i = 0; i != this.rectBasis.altStateCount; i++) {
var ds = this.rectBasis.altStates[i];
ds.set (0);
if ((ds.nx & 1) > 0 || ds.ny > 0 || (ds.nz & 1) > 0) continue;
var s = (Clazz.doubleToInt (ds.nx / 2)) * 3 + Clazz.doubleToInt (ds.nz / 2);
ds.set (this.scaled2Gaussian[s]);
}
this.rectBasis.convertDerivedToBasis ();
this.createOrbitals ();
});
Clazz.defineMethod (c$, "doRotatingGaussian", 
function () {
this.doClear ();
var i;
for (i = 0; i != this.rectBasis.altStateCount; i++) {
var ds = this.rectBasis.altStates[i];
ds.set (0);
var s = ds.nx * 3 + ds.nz;
if (ds.ny > 0 || ds.nx > 2 || ds.nz > 2) continue;
ds.set (this.rotGaussianR[s], this.rotGaussianI[s]);
}
this.rectBasis.convertDerivedToBasis ();
this.createOrbitals ();
});
Clazz.defineMethod (c$, "doDispX110", 
function () {
this.doClear ();
var i;
for (i = 0; i != this.rectBasis.altStateCount; i++) {
var ds = this.rectBasis.altStates[i];
ds.set (0);
if (ds.nz != 1 || ds.ny != 0) continue;
ds.set (this.dispX110Array[ds.nx]);
}
this.rectBasis.convertDerivedToBasis ();
this.createOrbitals ();
});
Clazz.defineMethod (c$, "doDispZ110", 
function () {
this.doClear ();
var i;
for (i = 0; i != this.rectBasis.altStateCount; i++) {
var ds = this.rectBasis.altStates[i];
ds.set (0);
if (ds.nx != 1 || ds.ny != 0) continue;
ds.set (this.dispZ110Array[ds.nz]);
}
this.rectBasis.convertDerivedToBasis ();
this.createOrbitals ();
});
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
if (!this.finished) {
return;
}System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.scaleBar) {
if (this.scaleBar.getValue () == this.scaleValue) return;
this.scaleValue = this.scaleBar.getValue ();
this.precomputeAll ();
this.manualScale = true;
}if (e.getSource () === this.brightnessBar) {
var mult = java.lang.Math.exp (this.brightnessBar.getValue () / 100.);
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
if (xa == xb) d = java.lang.Math.abs (x - xa);
 else {
var b = (yb - ya) / (xb - xa);
var a = ya - b * xa;
var d1 = y - (a + b * x);
if (d1 < 0) d1 = -d1;
d = d1 / java.lang.Math.sqrt (1 + b * b);
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
if (this.viewX != null && this.viewX.inside (x, y)) {
this.selection = 2;
this.checkSlice (e.getX (), e.getY ());
} else if (this.viewPotential.contains (x, y)) {
this.selection = 1;
} else if (this.viewStates != null && this.viewStates.inside (x, y)) this.findPhasor (this.viewStates, x, y);
if (oldsph != this.selectedPaneHandle || olds != this.selection || oldss !== this.selectedState) this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "findPhasor", 
function (v, x, y) {
var i;
for (i = 0; i != this.phasorCount; i++) {
if (!this.phasors[i].inside (x, y)) continue;
this.selectedPhasor = this.phasors[i];
this.selectedState = this.selectedPhasor.state;
this.selection = 3;
break;
}
}, "test.falstad.QuantumOsc3dFrame.View,~N,~N");
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
if (!this.finished) {
return;
}if (Clazz.instanceOf (e.getItemSelectable (), swingjs.awt.CheckboxMenuItem)) {
this.setupDisplay ();
this.cv.repaint (this.pause);
return;
}if (e.getItemSelectable () === this.nChooser) {
this.orbitalChanged ();
} else if (e.getItemSelectable () === this.lChooser) {
this.setLValue ();
this.orbitalChanged ();
} else if (e.getItemSelectable () === this.mChooser) {
this.orbitalChanged ();
} else if (e.getItemSelectable () === this.viewChooser) {
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
}return Clazz.superCall (this, test.falstad.QuantumOsc3dFrame, "handleEvent", [ev]);
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
this.rotate (xo / 40., -yo / 40.);
this.cv.repaint (this.pause);
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
var mag = java.lang.Math.sqrt (x * x + y * y) / ss2;
var ang = java.lang.Math.atan2 (-y, x);
if (mag > 10) mag = 0;
if (mag > 1) mag = 1;
this.selectedState.setMagPhase (mag, ang);
if (Clazz.instanceOf (this.selectedState, test.falstad.QuantumOsc3dFrame.DerivedState)) {
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
function (ab, data, count, maxm, pad, xAxis, square) {
var i;
var mid = Clazz.doubleToInt (count / 2);
for (i = 0; i != count; i++) data[i] = 0;

if (square) mid = 1;
ab.convertBasisToDerived ();
var j;
var qq = 0;
for (j = 0; j != ab.altStateCount; j++) {
var ds = ab.altStates[j];
if (square) data[mid + ds.m * ds.m * pad] += ds.magSquared ();
 else data[mid + ds.m * pad] += ds.magSquared ();
}
for (i = 0; i != count; i++) data[i] = java.lang.Math.sqrt (data[i]);

}, "test.falstad.QuantumOsc3dFrame.AlternateBasis,~A,~N,~N,~N,~B,~B");
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
for (i = 0; i != count; i++) data[i] = java.lang.Math.sqrt (data[i]);

}, "~A,~N,~N,~N,~B");
Clazz.defineMethod (c$, "rotateXY", 
function (ang, xAxis) {
var ab = (xAxis) ? this.lxBasis : this.lyBasis;
ab.convertBasisToDerived ();
var j;
for (j = 0; j != ab.altStateCount; j++) {
var ds = ab.altStates[j];
ds.rotate (ang * ds.m);
}
ab.convertDerivedToBasis ();
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
if (st.mag != 0 || this.getState (st.nr, st.l, -st.m).mag != 0) {
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
if ((st.m == 0 && st.mag != 0) || (st.m > 0 && (st.mag != 0 || this.getState (st.nr, st.l, -st.m).mag != 0))) {
if (st.orb == null) {
var orb;
if (st.l == 0) orb = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.SOrbital, this, null, st);
 else if (st.m == 0) orb = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.MZeroOrbital, this, null, st);
 else orb = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.PairedOrbital, this, null, st);
orb.precompute ();
st.orb = orb;
}this.orbitals[oi++] = st.orb;
} else st.orb = null;
}
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
var normmult = 1 / java.lang.Math.sqrt (norm);
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
Clazz.defineMethod (c$, "measureE", 
function () {
this.normalize ();
var n = this.random.nextDouble ();
var i = 0;
var picki = -1;
for (i = 0; i != this.stateCount; i++) {
var m = this.states[i].magSquared ();
n -= m;
if (n < 0) {
picki = i;
i = this.stateCount;
break;
}}
if (picki == -1) return;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
if (st.elevel != this.states[picki].elevel) st.set (0);
}
this.normalize ();
});
Clazz.defineMethod (c$, "measureL", 
function (axis) {
if (this.higherStatesPresent ()) return;
var maxm = 4;
var pad = 3;
var ct = (maxm * 2 + 1) * pad;
var ldata =  Clazz.newDoubleArray (ct, 0);
var mid = Clazz.doubleToInt (ct / 2);
this.normalize ();
var ab = null;
switch (axis) {
case 0:
this.calcLxy (ab = this.lxBasis, ldata, ct, maxm, pad, true, false);
break;
case 1:
this.calcLxy (ab = this.lyBasis, ldata, ct, maxm, pad, false, false);
break;
case 2:
this.calcLz (ldata, ct, maxm, pad, false);
break;
}
var n = this.random.nextDouble ();
var i = 0;
var pickm = -100;
for (i = -maxm; i <= maxm; i++) {
var m = ldata[mid + i * pad];
m *= m;
n -= m;
if (n < 0) {
pickm = i;
i = maxm;
break;
}}
if (pickm == -100) return;
switch (axis) {
case 2:
for (i = 0; i != this.stateCount; i++) {
var bs = this.states[i];
if (bs.m != pickm) bs.set (0);
}
break;
default:
for (i = 0; i != ab.altStateCount; i++) {
var ds = ab.altStates[i];
if (ds.m != pickm) ds.set (0);
}
ab.convertDerivedToBasis ();
}
this.maximize ();
this.createOrbitals ();
}, "~N");
Clazz.defineMethod (c$, "orbitalChanged", 
function () {
if (this.viewChooser.getSelectedIndex () > 0) return;
this.doClear ();
this.getState (this.getNR (), this.getL (), this.getM ()).set (1, 0);
this.createOrbitals ();
this.manualScale = false;
});
Clazz.defineMethod (c$, "getState", 
function (nr, l, m) {
var pre_n_add = nr * (11) * (11);
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
if (orb.state.m != 0) n += this.getState (st.nr, st.l, -st.m).magSquared () * normmult;
totn += n;
avg += n * as;
}
this.bestBrightness = 113.9 / (java.lang.Math.sqrt (minavg) * totn);
var mult = this.bestBrightness * this.userBrightMult;
var bvalue = Clazz.doubleToInt (java.lang.Math.log (mult) * 100.);
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
if (m < 0 || m > l || java.lang.Math.abs (x) > 1.0) {
System.out.print ("bad arguments in plgndr\n");
}pmm = 1.0;
if (m > 0) {
somx2 = java.lang.Math.sqrt ((1.0 - x) * (1.0 + x));
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
c$.$QuantumOsc3dFrame$Orbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.state = null;
this.n = 0;
this.nr = 0;
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
}, test.falstad.QuantumOsc3dFrame, "Orbital");
Clazz.makeConstructor (c$, 
function (a) {
this.nr = a.nr;
this.l = a.l;
this.m = a.m;
this.n = this.nr * 2 + this.l;
this.state = a;
}, "test.falstad.QuantumOsc3dFrame.BasisState");
Clazz.defineMethod (c$, "setupFrame", 
function (a) {
this.reMult = this.state.re * a;
this.imMult = this.state.im * a;
}, "~N");
Clazz.defineMethod (c$, "getBoundRadius", 
function (a) {
var b;
var c = 1;
var d = (this.m < 0) ? -this.m : this.m;
var e = 1 / this.sphericalNorm (this.l, d);
e *= e;
e *= a;
for (b = 0; b != this.b$["test.falstad.QuantumOsc3dFrame"].dataSize; b++) {
var f = this.dataR[b] * this.dataR[b] * e;
if (f > 32) c = b;
}
return c / (this.b$["test.falstad.QuantumOsc3dFrame"].dataSize / 2.);
}, "~N");
Clazz.defineMethod (c$, "getScaleRadius", 
function () {
return java.lang.Math.sqrt (2 * (this.n + 1.5));
});
Clazz.defineMethod (c$, "precompute", 
function () {
var a;
var b;
var c;
this.dshalf = Clazz.doubleToInt (this.b$["test.falstad.QuantumOsc3dFrame"].dataSize / 2);
var d = this.b$["test.falstad.QuantumOsc3dFrame"].scaleBar.getValue () / 2500.;
var e = (this.m < 0) ? -this.m : this.m;
var f = java.lang.Math.pow (-1, this.m);
var g = this.radialNorm (this.nr, this.l) * this.sphericalNorm (this.l, e);
this.dataR =  Clazz.newDoubleArray (this.b$["test.falstad.QuantumOsc3dFrame"].dataSize, 0);
for (a = 0; a != this.b$["test.falstad.QuantumOsc3dFrame"].dataSize; a++) {
var h = a * this.b$["test.falstad.QuantumOsc3dFrame"].resadj * d + .00000001;
var i = java.lang.Math.pow (h, this.l) * g;
this.dataR[a] = java.lang.Math.exp (-h * h / 2) * i * this.b$["test.falstad.QuantumOsc3dFrame"].hypser (-this.nr, this.l + 1.5, h * h);
}
if (this.l > 0) {
this.dataTh =  Clazz.newDoubleArray (this.b$["test.falstad.QuantumOsc3dFrame"].dataSize + 1, 0);
for (a = 0; a != this.b$["test.falstad.QuantumOsc3dFrame"].dataSize + 1; a++) {
var h = (a - this.dshalf) / this.dshalf;
this.dataTh[a] = f * this.b$["test.falstad.QuantumOsc3dFrame"].plgndr (this.l, e, h);
}
}if (this.m != 0) {
this.dataPhiR =  Clazz.newDoubleArray (8, this.b$["test.falstad.QuantumOsc3dFrame"].dataSize + 1, 0);
this.dataPhiI =  Clazz.newDoubleArray (8, this.b$["test.falstad.QuantumOsc3dFrame"].dataSize + 1, 0);
for (a = 0; a != 8; a++) for (b = 0; b <= this.b$["test.falstad.QuantumOsc3dFrame"].dataSize; b++) {
var h = a * 3.141592653589793 / 4 + b * (0.7853981633974483) / this.b$["test.falstad.QuantumOsc3dFrame"].dataSize;
this.dataPhiR[a][b] = java.lang.Math.cos (h * e);
this.dataPhiI[a][b] = java.lang.Math.sin (h * e);
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
for (a = 0; a != this.b$["test.falstad.QuantumOsc3dFrame"].dataSize; a++) {
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
return java.lang.Math.sqrt (2 * this.factorial (a) / this.fracfactorial (b + a + .5)) * this.pochhammer (b + 1.5, a) / this.factorial (a);
}, "~N,~N");
Clazz.defineMethod (c$, "sphericalNorm", 
function (a, b) {
return java.lang.Math.sqrt ((2 * a + 1) * this.factorial (a - b) / (4 * 3.141592653589793 * this.factorial (a + b)));
}, "~N,~N");
Clazz.defineMethod (c$, "factorial", 
function (a) {
var b = 1;
while (a > 1) b *= a--;

return b;
}, "~N");
Clazz.defineMethod (c$, "fracfactorial", 
function (a) {
var b = java.lang.Math.sqrt (3.141592653589793);
while (a > 0) b *= a--;

return b;
}, "~N");
Clazz.defineMethod (c$, "pochhammer", 
function (a, b) {
var c = 1;
for (; b > 0; b--) {
c *= a;
a += 1;
}
return c;
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$QuantumOsc3dFrame$SOrbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOsc3dFrame, "SOrbital", test.falstad.QuantumOsc3dFrame.Orbital, null, Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Orbital, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "computePoint", 
function (a, b) {
try {
var c = this.dataR[a];
this.b$["test.falstad.QuantumOsc3dFrame"].funcr = this.reMult * c;
this.b$["test.falstad.QuantumOsc3dFrame"].funci = this.imMult * c;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.b$["test.falstad.QuantumOsc3dFrame"].funcr = this.b$["test.falstad.QuantumOsc3dFrame"].funci = 0;
System.out.println ("bad " + a + " " + b);
} else {
throw e;
}
}
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$QuantumOsc3dFrame$MZeroOrbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOsc3dFrame, "MZeroOrbital", test.falstad.QuantumOsc3dFrame.Orbital, null, Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Orbital, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "computePoint", 
function (a, b) {
try {
var c = this.dataR[a] * this.dataTh[b];
this.b$["test.falstad.QuantumOsc3dFrame"].funcr = c * this.reMult;
this.b$["test.falstad.QuantumOsc3dFrame"].funci = c * this.imMult;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.b$["test.falstad.QuantumOsc3dFrame"].funcr = this.b$["test.falstad.QuantumOsc3dFrame"].funci = 0;
System.out.println ("bad " + a + " " + b);
} else {
throw e;
}
}
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$QuantumOsc3dFrame$PairedOrbital$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.negstate = null;
this.f1 = 0;
this.f2 = 0;
this.f3 = 0;
this.f4 = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOsc3dFrame, "PairedOrbital", test.falstad.QuantumOsc3dFrame.Orbital, null, Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Orbital, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.QuantumOsc3dFrame.PairedOrbital, [a]);
this.negstate = this.b$["test.falstad.QuantumOsc3dFrame"].getState (a.nr, a.l, -a.m);
}, "test.falstad.QuantumOsc3dFrame.BasisState");
Clazz.overrideMethod (c$, "setupFrame", 
function (a) {
var b = this.state.re * a;
var c = this.state.im * a;
var d = this.negstate.re * a;
var e = this.negstate.im * a;
var f = java.lang.Math.pow (-1, this.m);
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
var d = this.dataPhiR[this.b$["test.falstad.QuantumOsc3dFrame"].phiSector][this.b$["test.falstad.QuantumOsc3dFrame"].phiIndex];
var e = this.dataPhiI[this.b$["test.falstad.QuantumOsc3dFrame"].phiSector][this.b$["test.falstad.QuantumOsc3dFrame"].phiIndex];
this.b$["test.falstad.QuantumOsc3dFrame"].funcr = c * (this.f1 * d + this.f2 * e);
this.b$["test.falstad.QuantumOsc3dFrame"].funci = c * (this.f3 * d + this.f4 * e);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.b$["test.falstad.QuantumOsc3dFrame"].funcr = this.b$["test.falstad.QuantumOsc3dFrame"].funci = 0;
System.out.println ("bad " + a + " " + b);
} else {
throw e;
}
}
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$QuantumOsc3dFrame$Phasor$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.state = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOsc3dFrame, "Phasor", java.awt.Rectangle);
c$ = Clazz.p0p ();
};
c$.$QuantumOsc3dFrame$State$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.elevel = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOsc3dFrame, "State", test.falstad.QuantumOsc3dFrame.Complex, null, Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Complex, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "convertDerivedToBasis", 
function () {
});
Clazz.defineMethod (c$, "convertBasisToDerived", 
function () {
});
Clazz.defineMethod (c$, "setBasisActive", 
function () {
});
c$ = Clazz.p0p ();
};
c$.$QuantumOsc3dFrame$BasisState$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.nr = 0;
this.l = 0;
this.m = 0;
this.n = 0;
this.orb = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOsc3dFrame, "BasisState", test.falstad.QuantumOsc3dFrame.State, null, Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.State, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getText", 
function () {
return "n = " + this.n + ", nr = " + this.nr + ", l = " + this.l + ", m = " + this.m;
});
c$ = Clazz.p0p ();
};
c$.$QuantumOsc3dFrame$DerivedState$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.count = 0;
this.m = 0;
this.l = 0;
this.nr = 0;
this.n = 0;
this.nx = 0;
this.ny = 0;
this.nz = 0;
this.basis = null;
this.text = null;
this.bstates = null;
this.coefs = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOsc3dFrame, "DerivedState", test.falstad.QuantumOsc3dFrame.State, null, Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.State, this, null, Clazz.inheritArgs));
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
c$.$QuantumOsc3dFrame$AlternateBasis$ = function () {
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
}, test.falstad.QuantumOsc3dFrame, "AlternateBasis");
Clazz.makeConstructor (c$, 
function () {
this.b$["test.falstad.QuantumOsc3dFrame"].basisList[this.b$["test.falstad.QuantumOsc3dFrame"].basisCount++] = this;
});
Clazz.defineMethod (c$, "convertDerivedToBasis", 
function () {
this.convertDerivedToBasis (true);
});
Clazz.defineMethod (c$, "convertDerivedToBasis", 
function (a) {
var b;
var c;
if (a) for (b = 0; b != this.b$["test.falstad.QuantumOsc3dFrame"].stateCount; b++) this.b$["test.falstad.QuantumOsc3dFrame"].states[b].set (0);

var d = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Complex, this, null);
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
for (b = 0; b != this.b$["test.falstad.QuantumOsc3dFrame"].stateCount; b++) if (this.b$["test.falstad.QuantumOsc3dFrame"].states[b].mag > e) e = this.b$["test.falstad.QuantumOsc3dFrame"].states[b].mag;

if (e > 1) {
var f = 1 / e;
for (b = 0; b != this.b$["test.falstad.QuantumOsc3dFrame"].stateCount; b++) this.b$["test.falstad.QuantumOsc3dFrame"].states[b].mult (f);

}}, "~B");
Clazz.defineMethod (c$, "convertBasisToDerived", 
function () {
var a;
var b;
var c = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Complex, this, null);
var d = Clazz.innerTypeInstance (test.falstad.QuantumOsc3dFrame.Complex, this, null);
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
c$.$QuantumOsc3dFrame$Complex$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.re = 0;
this.im = 0;
this.mag = 0;
this.phase = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOsc3dFrame, "Complex");
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
}, "test.falstad.QuantumOsc3dFrame.Complex");
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
}, "test.falstad.QuantumOsc3dFrame.Complex");
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
}, "test.falstad.QuantumOsc3dFrame.Complex");
Clazz.defineMethod (c$, "setMagPhase", 
function () {
this.mag = java.lang.Math.sqrt (this.re * this.re + this.im * this.im);
this.phase = java.lang.Math.atan2 (this.im, this.re);
});
Clazz.defineMethod (c$, "setMagPhase", 
function (a, b) {
this.mag = a;
this.phase = b;
this.re = a * java.lang.Math.cos (b);
this.im = a * java.lang.Math.sin (b);
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
c$.$QuantumOsc3dFrame$PhaseColor$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.r = 0;
this.g = 0;
this.b = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOsc3dFrame, "PhaseColor");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.r = a;
this.g = b;
this.b = c;
}, "~N,~N,~N");
c$ = Clazz.p0p ();
};
c$.$QuantumOsc3dFrame$View$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.scale = 0;
this.paneY = 0;
this.pixels = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOsc3dFrame, "View", java.awt.Rectangle);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.QuantumOsc3dFrame.View, []);
});
c$ = Clazz.p0p ();
};
c$.$QuantumOsc3dFrame$TextBox$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.text = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOsc3dFrame, "TextBox", java.awt.Rectangle);
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
Clazz.superConstructor (this, test.falstad.QuantumOsc3dFrame.TextBox, [a, b, c, d]);
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
"baseEnergy", 0,
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
"VIEW_COMPLEX", 0,
"VIEW_COMBO_COMP", 1,
"VIEW_COMBO_RECT", 2,
"VIEW_COMBO_N1", 3,
"VIEW_COMBO_N2", 4,
"VIEW_COMBO_N3", 5,
"VIEW_COMBO_N4", 6,
"epsilon", .01,
"panePad", 4,
"phaseColorCount", 50,
"maxnr", 11,
"maxl", 10,
"root6by4", .61237243569579452454);
});
