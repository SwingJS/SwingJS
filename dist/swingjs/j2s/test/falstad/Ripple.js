Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Dialog", "$.Frame"], ["test.falstad.RippleCanvas", "$.RippleLayout", "$.RippleFrame", "$.Ripple"], ["java.awt.Color", "$.Dimension", "$.Point", "java.awt.image.MemoryImageSource", "java.lang.Double", "java.util.Random", "$.StringTokenizer", "$.Vector", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar", "$.TextArea"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "RippleCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.RippleCanvas, []);
this.pg = p;
}, "test.falstad.RippleFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateRipple (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateRipple (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "RippleLayout", null, java.awt.LayoutManager);
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
var insets = target.getInsets ();
var targetw = target.getSize ().width - insets.left - insets.right;
var cw = Clazz.doubleToInt (targetw * 7 / 10);
if (target.getComponentCount () == 1) cw = targetw;
var targeth = target.getSize ().height - (insets.top + insets.bottom);
target.getComponent (0).setLocation (insets.left, insets.top);
target.getComponent (0).setSize (cw, targeth);
var barwidth = targetw - cw;
cw += insets.left;
var i;
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
}, test.falstad, "Ripple", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.Ripple.ogf != null) test.falstad.Ripple.ogf.dispose ();
test.falstad.Ripple.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.Ripple.ogf =  new test.falstad.RippleFrame (null);
test.falstad.Ripple.ogf.initFrame ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.Ripple.ogf == null) {
this.started = true;
test.falstad.Ripple.ogf =  new test.falstad.RippleFrame (this);
test.falstad.Ripple.ogf.initFrame ();
this.repaint ();
}});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.Ripple.ogf == null) s = "Applet is finished.";
 else if (test.falstad.Ripple.ogf.useFrame) test.falstad.Ripple.ogf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.Ripple, "paint", [g]);
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
if (test.falstad.Ripple.ogf != null) test.falstad.Ripple.ogf.dispose ();
test.falstad.Ripple.ogf = null;
this.repaint ();
});
Clazz.defineStatics (c$,
"ogf", null);
c$ = Clazz.decorateAsClass (function () {
this.defaultSpeed = 1;
this.defaultResolution = 110;
this.startupTime = 1000;
this.resolutionCutoff = 55;
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.gridSizeX = 0;
this.gridSizeY = 0;
this.gridSizeXY = 0;
this.gw = 0;
this.windowWidth = 50;
this.windowHeight = 50;
this.windowOffsetX = 0;
this.windowOffsetY = 0;
this.windowBottom = 0;
this.windowRight = 0;
this.main = null;
this.blankButton = null;
this.blankWallsButton = null;
this.borderButton = null;
this.exportButton = null;
this.stoppedCheck = null;
this.fixedEndsCheck = null;
this.view3dCheck = null;
this.modeChooser = null;
this.sourceChooser = null;
this.setupChooser = null;
this.colorChooser = null;
this.setupList = null;
this.setup = null;
this.dampingBar = null;
this.speedBar = null;
this.freqBar = null;
this.resBar = null;
this.brightnessBar = null;
this.auxBar = null;
this.auxLabel = null;
this.dampcoef = 0;
this.freqTimeZero = 0;
this.movingSourcePos = 0;
this.brightMult = 1;
this.func = null;
this.funci = null;
this.damp = null;
this.walls = null;
this.exceptional = null;
this.medium = null;
this.sources = null;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = -1;
this.dragStartY = 0;
this.selectedSource = -1;
this.sourceIndex = 0;
this.freqBarValue = 0;
this.dragging = false;
this.dragClear = false;
this.dragSet = false;
this.useFrame = false;
this.showControls = false;
this.t = 0;
this.imageSource = null;
this.pixels = null;
this.sourceCount = -1;
this.sourcePlane = false;
this.sourceMoving = false;
this.increaseResolution = false;
this.adjustResolution = true;
this.sourceFreqCount = -1;
this.sourceWaveform = 0;
this.auxFunction = 0;
this.startTime = 0;
this.wallColor = null;
this.posColor = null;
this.negColor = null;
this.zeroColor = null;
this.medColor = null;
this.posMedColor = null;
this.negMedColor = null;
this.sourceColor = null;
this.schemeColors = null;
this.timerMethod = null;
this.timerDiv = 0;
this.impDialog = null;
this.cv = null;
this.applet = null;
this.useBufferedImage = false;
this.shown = false;
this.lastTime = 0;
this.lastFrameTime = 0;
this.secTime = 0;
this.frames = 0;
this.steps = 0;
this.framerate = 0;
this.steprate = 0;
this.moveRight = true;
this.moveDown = true;
this.filterCount = 0;
this.realxmx = 0;
this.realxmy = 0;
this.realymz = 0;
this.realzmy = 0;
this.realzmx = 0;
this.realymadd = 0;
this.realzmadd = 0;
this.viewAngle = 3.141592653589793;
this.viewAngleDragStart = 0;
this.viewZoom = .775;
this.viewZoomDragStart = 0;
this.viewAngleCos = -1;
this.viewAngleSin = 0;
this.viewHeight = -38;
this.viewHeightDragStart = 0;
this.scalex = 0;
this.scaley = 0;
this.centerX3d = 0;
this.centerY3d = 0;
this.xpoints = null;
this.ypoints = null;
this.viewDistance = 66;
this.scaleMult = 0;
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.OscSource")) {
test.falstad.RippleFrame.$RippleFrame$OscSource$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ImportDialogLayout")) {
test.falstad.RippleFrame.$RippleFrame$ImportDialogLayout$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ImportDialog")) {
test.falstad.RippleFrame.$RippleFrame$ImportDialog$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.Setup")) {
test.falstad.RippleFrame.$RippleFrame$Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.SingleSourceSetup")) {
test.falstad.RippleFrame.$RippleFrame$SingleSourceSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.DoubleSourceSetup")) {
test.falstad.RippleFrame.$RippleFrame$DoubleSourceSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.QuadrupleSourceSetup")) {
test.falstad.RippleFrame.$RippleFrame$QuadrupleSourceSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.SingleSlitSetup")) {
test.falstad.RippleFrame.$RippleFrame$SingleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.DoubleSlitSetup")) {
test.falstad.RippleFrame.$RippleFrame$DoubleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.TripleSlitSetup")) {
test.falstad.RippleFrame.$RippleFrame$TripleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ObstacleSetup")) {
test.falstad.RippleFrame.$RippleFrame$ObstacleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.HalfPlaneSetup")) {
test.falstad.RippleFrame.$RippleFrame$HalfPlaneSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.DipoleSourceSetup")) {
test.falstad.RippleFrame.$RippleFrame$DipoleSourceSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.LateralQuadrupoleSetup")) {
test.falstad.RippleFrame.$RippleFrame$LateralQuadrupoleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.LinearQuadrupoleSetup")) {
test.falstad.RippleFrame.$RippleFrame$LinearQuadrupoleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.HexapoleSetup")) {
test.falstad.RippleFrame.$RippleFrame$HexapoleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.OctupoleSetup")) {
test.falstad.RippleFrame.$RippleFrame$OctupoleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.Multi12Setup")) {
test.falstad.RippleFrame.$RippleFrame$Multi12Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.PlaneWaveSetup")) {
test.falstad.RippleFrame.$RippleFrame$PlaneWaveSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.IntersectingPlaneWavesSetup")) {
test.falstad.RippleFrame.$RippleFrame$IntersectingPlaneWavesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.PhasedArray1Setup")) {
test.falstad.RippleFrame.$RippleFrame$PhasedArray1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.PhasedArray2Setup")) {
test.falstad.RippleFrame.$RippleFrame$PhasedArray2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.PhasedArray3Setup")) {
test.falstad.RippleFrame.$RippleFrame$PhasedArray3Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.DopplerSetup")) {
test.falstad.RippleFrame.$RippleFrame$DopplerSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.Doppler2Setup")) {
test.falstad.RippleFrame.$RippleFrame$Doppler2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.SonicBoomSetup")) {
test.falstad.RippleFrame.$RippleFrame$SonicBoomSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.BigModeSetup")) {
test.falstad.RippleFrame.$RippleFrame$BigModeSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.OneByOneModesSetup")) {
test.falstad.RippleFrame.$RippleFrame$OneByOneModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.OneByNModesSetup")) {
test.falstad.RippleFrame.$RippleFrame$OneByNModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.NByNModesSetup")) {
test.falstad.RippleFrame.$RippleFrame$NByNModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.OneByNModeCombosSetup")) {
test.falstad.RippleFrame.$RippleFrame$OneByNModeCombosSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.NByNModeCombosSetup")) {
test.falstad.RippleFrame.$RippleFrame$NByNModeCombosSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ZeroByOneModesSetup")) {
test.falstad.RippleFrame.$RippleFrame$ZeroByOneModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ZeroByNModesSetup")) {
test.falstad.RippleFrame.$RippleFrame$ZeroByNModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.NByNAcoModesSetup")) {
test.falstad.RippleFrame.$RippleFrame$NByNAcoModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.CoupledCavitiesSetup")) {
test.falstad.RippleFrame.$RippleFrame$CoupledCavitiesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.BeatsSetup")) {
test.falstad.RippleFrame.$RippleFrame$BeatsSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.SlowMediumSetup")) {
test.falstad.RippleFrame.$RippleFrame$SlowMediumSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.RefractionSetup")) {
test.falstad.RippleFrame.$RippleFrame$RefractionSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.InternalReflectionSetup")) {
test.falstad.RippleFrame.$RippleFrame$InternalReflectionSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.CoatingSetup")) {
test.falstad.RippleFrame.$RippleFrame$CoatingSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ZonePlateEvenSetup")) {
test.falstad.RippleFrame.$RippleFrame$ZonePlateEvenSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ZonePlateOddSetup")) {
test.falstad.RippleFrame.$RippleFrame$ZonePlateOddSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.CircleSetup")) {
test.falstad.RippleFrame.$RippleFrame$CircleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.EllipseSetup")) {
test.falstad.RippleFrame.$RippleFrame$EllipseSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ResonantCavitiesSetup")) {
test.falstad.RippleFrame.$RippleFrame$ResonantCavitiesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ResonantCavities2Setup")) {
test.falstad.RippleFrame.$RippleFrame$ResonantCavities2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.RoomResonanceSetup")) {
test.falstad.RippleFrame.$RippleFrame$RoomResonanceSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.Waveguides1Setup")) {
test.falstad.RippleFrame.$RippleFrame$Waveguides1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.Waveguides2Setup")) {
test.falstad.RippleFrame.$RippleFrame$Waveguides2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.Waveguides3Setup")) {
test.falstad.RippleFrame.$RippleFrame$Waveguides3Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.Waveguides4Setup")) {
test.falstad.RippleFrame.$RippleFrame$Waveguides4Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.Waveguides5Setup")) {
test.falstad.RippleFrame.$RippleFrame$Waveguides5Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ParabolicMirror1Setup")) {
test.falstad.RippleFrame.$RippleFrame$ParabolicMirror1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ParabolicMirror2Setup")) {
test.falstad.RippleFrame.$RippleFrame$ParabolicMirror2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.SoundDuctSetup")) {
test.falstad.RippleFrame.$RippleFrame$SoundDuctSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.BaffledPistonSetup")) {
test.falstad.RippleFrame.$RippleFrame$BaffledPistonSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.LowPassFilter1Setup")) {
test.falstad.RippleFrame.$RippleFrame$LowPassFilter1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.LowPassFilter2Setup")) {
test.falstad.RippleFrame.$RippleFrame$LowPassFilter2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.HighPassFilter1Setup")) {
test.falstad.RippleFrame.$RippleFrame$HighPassFilter1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.HighPassFilter2Setup")) {
test.falstad.RippleFrame.$RippleFrame$HighPassFilter2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.BandStopFilter1Setup")) {
test.falstad.RippleFrame.$RippleFrame$BandStopFilter1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.BandStopFilter2Setup")) {
test.falstad.RippleFrame.$RippleFrame$BandStopFilter2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.BandStopFilter3Setup")) {
test.falstad.RippleFrame.$RippleFrame$BandStopFilter3Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.PlanarConvexLensSetup")) {
test.falstad.RippleFrame.$RippleFrame$PlanarConvexLensSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.BiconvexLensSetup")) {
test.falstad.RippleFrame.$RippleFrame$BiconvexLensSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.PlanarConcaveSetup")) {
test.falstad.RippleFrame.$RippleFrame$PlanarConcaveSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.CircularPrismSetup")) {
test.falstad.RippleFrame.$RippleFrame$CircularPrismSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.RightAnglePrismSetup")) {
test.falstad.RippleFrame.$RippleFrame$RightAnglePrismSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.PorroPrismSetup")) {
test.falstad.RippleFrame.$RippleFrame$PorroPrismSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.ScatteringSetup")) {
test.falstad.RippleFrame.$RippleFrame$ScatteringSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.LloydsMirrorSetup")) {
test.falstad.RippleFrame.$RippleFrame$LloydsMirrorSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.TempGradient1")) {
test.falstad.RippleFrame.$RippleFrame$TempGradient1$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.TempGradient2")) {
test.falstad.RippleFrame.$RippleFrame$TempGradient2$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.TempGradient3")) {
test.falstad.RippleFrame.$RippleFrame$TempGradient3$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.TempGradient4")) {
test.falstad.RippleFrame.$RippleFrame$TempGradient4$ ();
}
if (!Clazz.isClassDefined ("test.falstad.RippleFrame.DispersionSetup")) {
test.falstad.RippleFrame.$RippleFrame$DispersionSetup$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "RippleFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.prepareFields (c$, function () {
this.xpoints =  Clazz.newIntArray (4, 0);
this.ypoints =  Clazz.newIntArray (4, 0);
});
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "Ripple by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.RippleFrame, ["Ripple Tank Applet v1.7f"]);
this.setDefaultCloseOperation (2);
{
this.defaultSpeed = 15; this.defaultResolution = 300;
this.startupTime = 1500; this.resolutionCutoff = 200;
}this.applet = a;
this.useFrame = true;
this.showControls = true;
this.adjustResolution = true;
}, "test.falstad.Ripple");
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
if (this.useFrame) this.main = this;
 else this.main = this.applet;
this.setupList =  new java.util.Vector ();
var s = Clazz.innerTypeInstance (test.falstad.RippleFrame.SingleSourceSetup, this, null);
while (s != null) {
this.setupList.addElement (s);
s = s.createNext ();
}
var os = System.getProperty ("os.name");
var res = this.defaultResolution;
var jv = System.getProperty ("java.class.version");
var jvf =  new Double (jv).doubleValue ();
if (jvf >= 48) this.useBufferedImage = true;
{
}this.sources =  new Array (20);
this.main.setLayout ( new test.falstad.RippleLayout ());
this.cv =  new test.falstad.RippleCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.setupChooser =  new swingjs.awt.Choice ();
var i;
for (i = 0; i != this.setupList.size (); i++) this.setupChooser.add ("Setup: " + (this.setupList.elementAt (i)).getName ());

this.setupChooser.addItemListener (this);
if (this.showControls) this.main.add (this.setupChooser);
this.sourceChooser =  new swingjs.awt.Choice ();
this.sourceChooser.add ("No Sources");
this.sourceChooser.add ("1 Src, 1 Freq");
this.sourceChooser.add ("1 Src, 2 Freq");
this.sourceChooser.add ("2 Src, 1 Freq");
this.sourceChooser.add ("2 Src, 2 Freq");
this.sourceChooser.add ("3 Src, 1 Freq");
this.sourceChooser.add ("4 Src, 1 Freq");
this.sourceChooser.add ("1 Src, 1 Freq (Square)");
this.sourceChooser.add ("1 Src, 1 Freq (Pulse)");
this.sourceChooser.add ("1 Moving Src");
this.sourceChooser.add ("1 Plane Src, 1 Freq");
this.sourceChooser.add ("1 Plane Src, 2 Freq");
this.sourceChooser.add ("2 Plane Src, 1 Freq");
this.sourceChooser.add ("2 Plane Src, 2 Freq");
this.sourceChooser.add ("1 Plane 1 Freq (Pulse)");
this.sourceChooser.add ("1 Plane 1 Freq w/Phase");
this.sourceChooser.add ("6 Src, 1 Freq");
this.sourceChooser.add ("8 Src, 1 Freq");
this.sourceChooser.add ("10 Src, 1 Freq");
this.sourceChooser.add ("12 Src, 1 Freq");
this.sourceChooser.add ("16 Src, 1 Freq");
this.sourceChooser.add ("20 Src, 1 Freq");
this.sourceChooser.addItemListener (this);
if (this.showControls) this.main.add (this.sourceChooser);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Edit Wave");
this.modeChooser.add ("Mouse = Edit Walls");
this.modeChooser.add ("Mouse = Edit Medium");
this.modeChooser.add ("Mouse = Hold Wave");
this.modeChooser.addItemListener (this);
if (this.showControls) this.main.add (this.modeChooser);
this.colorChooser =  new swingjs.awt.Choice ();
this.colorChooser.addItemListener (this);
if (this.showControls) this.main.add (this.colorChooser);
this.blankButton =  new swingjs.awt.Button ("Clear Waves");
if (this.showControls) this.main.add (this.blankButton);
this.blankButton.addActionListener (this);
this.blankWallsButton =  new swingjs.awt.Button ("Clear Walls");
if (this.showControls) this.main.add (this.blankWallsButton);
this.blankWallsButton.addActionListener (this);
this.borderButton =  new swingjs.awt.Button ("Add Border");
if (this.showControls) this.main.add (this.borderButton);
this.borderButton.addActionListener (this);
this.exportButton =  new swingjs.awt.Button ("Import/Export");
if (this.showControls) this.main.add (this.exportButton);
this.exportButton.addActionListener (this);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
if (this.showControls) this.main.add (this.stoppedCheck);
this.fixedEndsCheck =  new swingjs.awt.Checkbox ("Fixed Edges", true);
this.fixedEndsCheck.addItemListener (this);
if (this.showControls) this.main.add (this.fixedEndsCheck);
this.view3dCheck =  new swingjs.awt.Checkbox ("3-D View");
this.view3dCheck.addItemListener (this);
if (this.showControls) this.main.add (this.view3dCheck);
var l =  new swingjs.awt.Label ("Simulation Speed", 0);
this.speedBar =  new swingjs.awt.Scrollbar (0, this.defaultSpeed, 1, 1, 20);
if (this.showControls) {
this.main.add (l);
this.main.add (this.speedBar);
}this.speedBar.setName (l.getText ());
this.speedBar.addAdjustmentListener (this);
l =  new swingjs.awt.Label ("Resolution", 0);
this.resBar =  new swingjs.awt.Scrollbar (0, res, 5, 5, 400);
this.resBar.setName (l.getText ());
if (this.showControls) {
this.main.add (l);
this.main.add (this.resBar);
}this.resBar.addAdjustmentListener (this);
l =  new swingjs.awt.Label ("Damping", 0);
this.dampingBar =  new swingjs.awt.Scrollbar (0, 10, 1, 2, 100);
this.dampingBar.addAdjustmentListener (this);
this.dampingBar.setName (l.getText ());
if (this.showControls) {
this.main.add (l);
this.main.add (this.dampingBar);
}l =  new swingjs.awt.Label ("Source Frequency", 0);
this.freqBar =  new swingjs.awt.Scrollbar (0, this.freqBarValue = 15, 1, 1, 30);
this.freqBar.addAdjustmentListener (this);
if (this.showControls) {
this.main.add (l);
this.main.add (this.freqBar);
}this.freqBar.setName (l.getText ());
l =  new swingjs.awt.Label ("Brightness", 0);
this.brightnessBar =  new swingjs.awt.Scrollbar (0, 27, 1, 1, 1200);
this.brightnessBar.addAdjustmentListener (this);
if (this.showControls) {
this.main.add (l);
this.main.add (this.brightnessBar);
}this.brightnessBar.setName (l.getText ());
this.auxLabel =  new swingjs.awt.Label ("", 0);
this.auxBar =  new swingjs.awt.Scrollbar (0, 1, 1, 1, 30);
this.auxBar.addAdjustmentListener (this);
if (this.showControls) {
this.main.add (this.auxLabel);
this.main.add (this.auxBar);
}this.auxBar.setName ("aux");
if (this.showControls) this.main.add ( new swingjs.awt.Label ("http://www.falstad.com"));
this.schemeColors =  Clazz.newArray (20, 8, null);
this.modeChooser.select (1);
this.sourceChooser.select (1);
this.setResolution ();
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
}for (i = 0; i != 20; i++) {
param = this.applet.getParameter ("colorScheme" + (i + 1));
if (param == null) break;
this.decodeColorScheme (i, param);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (this.applet != null) e.printStackTrace ();
} else {
throw e;
}
}
if (this.colorChooser.getItemCount () == 0) this.addDefaultColorScheme ();
this.doColor ();
this.random =  new java.util.Random ();
this.setDamping ();
this.setup = this.setupList.elementAt (this.setupChooser.getSelectedIndex ());
this.reinit ();
this.cv.setForeground (java.awt.Color.lightGray);
this.startTime = this.getTimeMillis ();
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
this.cv.repaint ();
}this.main.requestFocus ();
});
Clazz.defineMethod (c$, "reinit", 
function () {
this.reinit (true);
});
Clazz.defineMethod (c$, "reinit", 
function (setup) {
this.sourceCount = -1;
System.out.print ("reinit " + this.gridSizeX + " " + this.gridSizeY + "\n");
this.gridSizeXY = this.gridSizeX * this.gridSizeY;
this.gw = this.gridSizeY;
this.func =  Clazz.newFloatArray (this.gridSizeXY, 0);
this.funci =  Clazz.newFloatArray (this.gridSizeXY, 0);
this.damp =  Clazz.newFloatArray (this.gridSizeXY, 0);
this.exceptional =  Clazz.newBooleanArray (this.gridSizeXY, false);
this.medium =  Clazz.newIntArray (this.gridSizeXY, 0);
this.walls =  Clazz.newBooleanArray (this.gridSizeXY, false);
var i;
var j;
for (i = 0; i != this.gridSizeXY; i++) this.damp[i] = 1;

for (i = 0; i != this.windowOffsetX; i++) for (j = 0; j != this.gridSizeX; j++) this.damp[i + j * this.gw] = this.damp[this.gridSizeX - 1 - i + this.gw * j] = this.damp[j + this.gw * i] = this.damp[j + (this.gridSizeY - 1 - i) * this.gw] = (.999 - (this.windowOffsetX - i) * .002);


if (setup) this.doSetup ();
}, "~B");
Clazz.defineMethod (c$, "triggerShow", 
function () {
if (!this.shown) this.setVisible (true);
this.shown = true;
});
Clazz.defineMethod (c$, "handleResize", 
function () {
var d = this.winSize = this.cv.getSize ();
if (this.winSize.width <= 0 || this.winSize.height <= 0) return;
this.pixels = null;
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
var npix = d.width * d.height;
this.pixels =  Clazz.newIntArray (npix, 0);
var i;
for (i = npix; --i >= 0; ) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (d.width, d.height, this.pixels, 0, d.width);
this.imageSource.setAnimated (true);
this.imageSource.setFullBufferUpdates (true);
this.dbimage = this.cv.createImage (this.imageSource);
}});
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.RippleFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (this.applet == null) this.dispose ();
 else this.applet.destroyFrame ();
});
Clazz.defineMethod (c$, "doBlank", 
function () {
var x;
var y;
for (x = 0; x != this.gridSizeXY; x++) this.func[x] = this.funci[x] = 1e-10;

});
Clazz.defineMethod (c$, "doBlankWalls", 
function () {
var x;
var y;
for (x = 0; x != this.gridSizeXY; x++) {
this.walls[x] = false;
this.medium[x] = 0;
}
this.calcExceptions ();
});
Clazz.defineMethod (c$, "doBorder", 
function () {
var x;
var y;
for (x = 0; x < this.gridSizeX; x++) {
this.setWall (x, this.windowOffsetY);
this.setWall (x, this.windowBottom);
}
for (y = 0; y < this.gridSizeY; y++) {
this.setWall (this.windowOffsetX, y);
this.setWall (this.windowRight, y);
}
this.calcExceptions ();
});
Clazz.defineMethod (c$, "setWall", 
function (x, y) {
this.walls[x + this.gw * y] = true;
}, "~N,~N");
Clazz.defineMethod (c$, "setWall", 
function (x, y, b) {
this.walls[x + this.gw * y] = b;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "setMedium", 
function (x, y, q) {
this.medium[x + this.gw * y] = q;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getTimeMillis", 
function () {
try {
{
return System.currentTimeMillis();
}} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
ee.printStackTrace ();
return 0;
} else {
throw ee;
}
}
});
Clazz.defineMethod (c$, "calcExceptions", 
function () {
var x;
var y;
for (x = 0; x != this.gridSizeX; x++) for (y = 0; y < this.windowOffsetY; y++) {
this.walls[x + this.gw * y] = this.walls[x + this.gw * this.windowOffsetY];
this.walls[x + this.gw * (this.gridSizeY - y - 1)] = this.walls[x + this.gw * (this.gridSizeY - this.windowOffsetY - 1)];
}

for (y = 0; y < this.gridSizeY; y++) for (x = 0; x < this.windowOffsetX; x++) {
this.walls[x + this.gw * y] = this.walls[this.windowOffsetX + this.gw * y];
this.walls[this.gridSizeX - x - 1 + this.gw * y] = this.walls[this.gridSizeX - this.windowOffsetX - 1 + this.gw * y];
}

for (x = 1; x < this.gridSizeX - 1; x++) for (y = 1; y < this.gridSizeY - 1; y++) {
var gi = x + this.gw * y;
this.exceptional[gi] = this.walls[gi - 1] || this.walls[gi + 1] || this.walls[gi - this.gw] || this.walls[gi + this.gw] || this.walls[gi] || this.medium[gi] != this.medium[gi - 1] || this.medium[gi] != this.medium[gi + 1];
if ((x == 1 || x == this.gridSizeX - 2) && this.medium[gi] != this.medium[this.gridSizeX - 1 - x + this.gw * (y + 1)] || this.medium[gi] != this.medium[this.gridSizeX - 1 - x + this.gw * (y - 1)]) this.exceptional[gi] = true;
}

this.exceptional[1 + this.gw] = this.exceptional[this.gridSizeX - 2 + this.gw] = this.exceptional[1 + (this.gridSizeY - 2) * this.gw] = this.exceptional[this.gridSizeX - 2 + (this.gridSizeY - 2) * this.gw] = true;
});
Clazz.defineMethod (c$, "centerString", 
function (g, s, y) {
var fm = g.getFontMetrics ();
g.drawString (s, Clazz.doubleToInt ((this.winSize.width - fm.stringWidth (s)) / 2), y);
}, "java.awt.Graphics,~S,~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateRipple", 
function (realg) {
if (this.winSize == null || this.winSize.width <= 0 || this.winSize.height <= 0) {
this.handleResize ();
return;
}if (this.increaseResolution) {
this.increaseResolution = false;
if (this.resBar.getValue () < 495) {
var res = this.resBar.getValue () + 10;
System.out.println ("increasing resolution to " + res);
this.setResolution (res);
}}var sysTime = this.getTimeMillis ();
var tadd = 0;
if (!this.stoppedCheck.getState ()) {
var val = 5;
tadd = val * .05;
}var i;
var j;
var stopFunc = this.dragging && this.selectedSource == -1 && this.view3dCheck.getState () == false && this.modeChooser.getSelectedIndex () == 0;
if (this.stoppedCheck.getState ()) stopFunc = true;
var iterCount = this.speedBar.getValue ();
if (!stopFunc) {
var iter;
var mxx = this.gridSizeX - 1;
var mxy = this.gridSizeY - 1;
for (iter = 0; iter != iterCount; iter++) {
var jstart;
var jend;
var jinc;
if (this.moveDown) {
jstart = 1;
jend = mxy;
jinc = 1;
this.moveDown = false;
} else {
jstart = mxy - 1;
jend = 0;
jinc = -1;
this.moveDown = true;
}this.moveRight = this.moveDown;
var sinhalfth = 0;
var sinth = 0;
var scaleo = 0;
var curMedium = -1;
for (j = jstart; j != jend; j += jinc) {
var istart;
var iend;
var iinc;
if (this.moveRight) {
iinc = 1;
istart = 1;
iend = mxx;
this.moveRight = false;
} else {
iinc = -1;
istart = mxx - 1;
iend = 0;
this.moveRight = true;
}var gi = j * this.gw + istart;
var giEnd = j * this.gw + iend;
for (; gi != giEnd; gi += iinc) {
var previ = this.func[gi - 1];
var nexti = this.func[gi + 1];
var prevj = this.func[gi - this.gw];
var nextj = this.func[gi + this.gw];
var basis = (nexti + previ + nextj + prevj) * .25;
if (this.exceptional[gi]) {
if (curMedium != this.medium[gi]) {
curMedium = this.medium[gi];
var tadd2 = tadd * (1 - (0.002617801047120419) * curMedium);
sinhalfth = Math.sin (tadd2 / 2);
sinth = (Math.sin (tadd2) * this.dampcoef);
scaleo = (1 - Math.sqrt (4 * sinhalfth * sinhalfth - sinth * sinth));
}if (this.walls[gi]) continue;
var count = 4;
if (this.fixedEndsCheck.getState ()) {
if (this.walls[gi - 1]) previ = 0;
if (this.walls[gi + 1]) nexti = 0;
if (this.walls[gi - this.gw]) prevj = 0;
if (this.walls[gi + this.gw]) nextj = 0;
} else {
if (this.walls[gi - 1]) previ = this.walls[gi + 1] ? this.func[gi] : this.func[gi + 1];
if (this.walls[gi + 1]) nexti = this.walls[gi - 1] ? this.func[gi] : this.func[gi - 1];
if (this.walls[gi - this.gw]) prevj = this.walls[gi + this.gw] ? this.func[gi] : this.func[gi + this.gw];
if (this.walls[gi + this.gw]) nextj = this.walls[gi - this.gw] ? this.func[gi] : this.func[gi - this.gw];
}basis = (nexti + previ + nextj + prevj) * .25;
}var a = 0;
var b = 0;
if (this.damp[gi] == 1) {
a = this.func[gi] - basis;
b = this.funci[gi];
} else {
a = (this.func[gi] - basis) * this.damp[gi];
b = this.funci[gi] * this.damp[gi];
}this.func[gi] = basis + a * scaleo - b * sinth;
this.funci[gi] = b * scaleo + a * sinth;
}
}
this.t += tadd;
if (this.sourceCount > 0) {
var w = this.freqBar.getValue () * (this.t - this.freqTimeZero) * 0.0233333;
var w2 = w;
var skip = false;
switch (this.auxFunction) {
case 2:
w2 = this.auxBar.getValue () * this.t * 0.0233333;
break;
case 1:
w2 = w + (this.auxBar.getValue () - 1) * (0.10833078115826873);
break;
}
var v = 0;
var v2 = 0;
switch (this.sourceWaveform) {
case 0:
v = Math.cos (w);
if (this.sourceCount >= (this.sourcePlane ? 4 : 2)) v2 = Math.cos (w2);
 else if (this.sourceFreqCount == 2) v = (v + Math.cos (w2)) * .5;
break;
case 1:
w %= 6.283185307179586;
v = (w < 3.141592653589793) ? 1 : -1;
break;
case 2:
{
w %= 6.283185307179586;
var pulselen = 0.7853981633974483;
var pulselen2 = this.freqBar.getValue () * .2;
if (pulselen2 < pulselen) pulselen = pulselen2;
v = (w > pulselen) ? 0 : Math.sin (w * 3.141592653589793 / pulselen);
if (w > pulselen * 2) skip = true;
}break;
}
for (j = 0; j != this.sourceCount; j++) {
if ((j % 2) == 0) this.sources[j].v = (v * this.setup.sourceStrength ());
 else this.sources[j].v = (v2 * this.setup.sourceStrength ());
}
if (this.sourcePlane) {
if (!skip) {
for (j = 0; j != Clazz.doubleToInt (this.sourceCount / 2); j++) {
var src1 = this.sources[j * 2];
var src2 = this.sources[j * 2 + 1];
var src3 = this.sources[j];
this.drawPlaneSource (src1.x, src1.y, src2.x, src2.y, src3.v, w);
}
}} else {
if (this.sourceMoving) {
var sy;
this.movingSourcePos += tadd * .02 * this.auxBar.getValue ();
var wm = this.movingSourcePos;
var h = this.windowHeight - 3;
wm %= h * 2;
sy = Clazz.doubleToInt (wm);
if (sy > h) sy = 2 * h - sy;
sy += this.windowOffsetY + 1;
this.sources[0].y = sy;
}for (i = 0; i != this.sourceCount; i++) {
var src = this.sources[i];
this.func[src.x + this.gw * src.y] = src.v;
this.funci[src.x + this.gw * src.y] = 0;
}
}}this.setup.eachFrame ();
this.steps++;
this.filterGrid ();
}
}this.brightMult = Math.exp (this.brightnessBar.getValue () / 100. - 5.);
if (this.view3dCheck.getState ()) this.draw3dView ();
 else this.draw2dView ();
if (this.imageSource != null) this.imageSource.newPixels ();
realg.drawImage (this.dbimage, 0, 0, this);
if (this.dragStartX >= 0 && !this.view3dCheck.getState ()) {
var x = Clazz.doubleToInt (this.dragStartX * this.windowWidth / this.winSize.width);
var y = this.windowHeight - 1 - (Clazz.doubleToInt (this.dragStartY * this.windowHeight / this.winSize.height));
var s = "(" + x + "," + y + ")";
realg.setColor (java.awt.Color.white);
var fm = realg.getFontMetrics ();
var h = 5 + fm.getAscent ();
realg.fillRect (0, this.winSize.height - h, fm.stringWidth (s) + 10, h);
realg.setColor (java.awt.Color.black);
realg.drawString (s, 5, this.winSize.height - 5);
}if (!this.stoppedCheck.getState ()) {
var diff = this.getTimeMillis () - sysTime;
if (this.adjustResolution && diff > 0 && sysTime < this.startTime + this.startupTime && Clazz.doubleToInt (this.windowOffsetX * diff / iterCount) < this.resolutionCutoff) {
this.increaseResolution = true;
this.startTime = sysTime;
} else {
this.adjustResolution = false;
}if (this.dragging && this.selectedSource == -1 && this.modeChooser.getSelectedIndex () == 3) this.editFuncPoint (this.dragX, this.dragY);
this.cv.repaint (0);
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "filterGrid", 
function () {
var x;
var y;
if (this.fixedEndsCheck.getState ()) return;
if (this.sourceCount > 0 && this.freqBarValue > 23) return;
if (this.sourceFreqCount >= 2 && this.auxBar.getValue () > 23) return;
if (++this.filterCount < 10) return;
this.filterCount = 0;
for (y = this.windowOffsetY; y < this.windowBottom; y++) for (x = this.windowOffsetX; x < this.windowRight; x++) {
var gi = x + y * this.gw;
if (this.walls[gi]) continue;
if (this.func[gi - 1] < 0 && this.func[gi] > 0 && this.func[gi + 1] < 0 && !this.walls[gi + 1] && !this.walls[gi - 1]) this.func[gi] = (this.func[gi - 1] + this.func[gi + 1]) / 2;
if (this.func[gi - this.gw] < 0 && this.func[gi] > 0 && this.func[gi + this.gw] < 0 && !this.walls[gi - this.gw] && !this.walls[gi + this.gw]) this.func[gi] = (this.func[gi - this.gw] + this.func[gi + this.gw]) / 2;
if (this.func[gi - 1] > 0 && this.func[gi] < 0 && this.func[gi + 1] > 0 && !this.walls[gi + 1] && !this.walls[gi - 1]) this.func[gi] = (this.func[gi - 1] + this.func[gi + 1]) / 2;
if (this.func[gi - this.gw] > 0 && this.func[gi] < 0 && this.func[gi + this.gw] > 0 && !this.walls[gi - this.gw] && !this.walls[gi + this.gw]) this.func[gi] = (this.func[gi - this.gw] + this.func[gi + this.gw]) / 2;
}

});
Clazz.defineMethod (c$, "plotPixel", 
function (x, y, pix) {
if (x < 0 || x >= this.winSize.width) return;
try {
this.pixels[x + y * this.winSize.width] = pix;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~N,~N,~N");
Clazz.defineMethod (c$, "plotSource", 
function (n, xx, yy) {
var rad = 7;
var j;
var col = (this.sourceColor.getRed () << 16) | (this.sourceColor.getGreen () << 8) | (this.sourceColor.getBlue ()) | 0xFF000000;
if (n == this.selectedSource) col ^= 0xFFFFFF;
for (j = 0; j <= rad; j++) {
var k = Clazz.doubleToInt (Math.sqrt (rad * rad - j * j) + .5);
this.plotPixel (xx + j, yy + k, col);
this.plotPixel (xx + k, yy + j, col);
this.plotPixel (xx + j, yy - k, col);
this.plotPixel (xx - k, yy + j, col);
this.plotPixel (xx - j, yy + k, col);
this.plotPixel (xx + k, yy - j, col);
this.plotPixel (xx - j, yy - k, col);
this.plotPixel (xx - k, yy - j, col);
this.plotPixel (xx, yy + j, col);
this.plotPixel (xx, yy - j, col);
this.plotPixel (xx + j, yy, col);
this.plotPixel (xx - j, yy, col);
}
}, "~N,~N,~N");
Clazz.defineMethod (c$, "draw2dView", 
function () {
var ix = 0;
var i;
var j;
var k;
var l;
for (j = 0; j != this.windowHeight; j++) {
ix = this.winSize.width * (Clazz.doubleToInt (j * this.winSize.height / this.windowHeight));
var j2 = j + this.windowOffsetY;
var gi = j2 * this.gw + this.windowOffsetX;
var y = Clazz.doubleToInt (j * this.winSize.height / this.windowHeight);
var y2 = Clazz.doubleToInt ((j + 1) * this.winSize.height / this.windowHeight);
for (i = 0; i != this.windowWidth; i++, gi++) {
var x = Clazz.doubleToInt (i * this.winSize.width / this.windowWidth);
var x2 = Clazz.doubleToInt ((i + 1) * this.winSize.width / this.windowWidth);
var i2 = i + this.windowOffsetX;
var dy = this.func[gi] * this.brightMult;
if (dy < -1) dy = -1;
if (dy > 1) dy = 1;
var col = 0;
var colR = 0;
var colG = 0;
var colB = 0;
if (this.walls[gi]) {
colR = this.wallColor.getRed ();
colG = this.wallColor.getGreen ();
colB = this.wallColor.getBlue ();
} else if (dy < 0) {
var d1 = -dy;
var d2 = 1 - d1;
var d3 = this.medium[gi] * (0.003921414846476609);
var d4 = 1 - d3;
var a1 = d1 * d4;
var a2 = d2 * d4;
var a3 = d1 * d3;
var a4 = d2 * d3;
colR = Clazz.doubleToInt (this.negColor.getRed () * a1 + this.zeroColor.getRed () * a2 + this.negMedColor.getRed () * a3 + this.medColor.getRed () * a4);
colG = Clazz.doubleToInt (this.negColor.getGreen () * a1 + this.zeroColor.getGreen () * a2 + this.negMedColor.getGreen () * a3 + this.medColor.getGreen () * a4);
colB = Clazz.doubleToInt (this.negColor.getBlue () * a1 + this.zeroColor.getBlue () * a2 + this.negMedColor.getBlue () * a3 + this.medColor.getBlue () * a4);
} else {
var d1 = dy;
var d2 = 1 - dy;
var d3 = this.medium[gi] * (0.003921414846476609);
var d4 = 1 - d3;
var a1 = d1 * d4;
var a2 = d2 * d4;
var a3 = d1 * d3;
var a4 = d2 * d3;
colR = Clazz.doubleToInt (this.posColor.getRed () * a1 + this.zeroColor.getRed () * a2 + this.posMedColor.getRed () * a3 + this.medColor.getRed () * a4);
colG = Clazz.doubleToInt (this.posColor.getGreen () * a1 + this.zeroColor.getGreen () * a2 + this.posMedColor.getGreen () * a3 + this.medColor.getGreen () * a4);
colB = Clazz.doubleToInt (this.posColor.getBlue () * a1 + this.zeroColor.getBlue () * a2 + this.posMedColor.getBlue () * a3 + this.medColor.getBlue () * a4);
}col = (-16777216) | (colR << 16) | (colG << 8) | (colB);
for (k = 0; k != x2 - x; k++, ix++) for (l = 0; l != y2 - y; l++) this.pixels[ix + l * this.winSize.width] = col;


}
}
var intf = Clazz.doubleToInt ((Clazz.doubleToInt (this.gridSizeY / 2) - this.windowOffsetY) * this.winSize.height / this.windowHeight);
for (i = 0; i != this.sourceCount; i++) {
var src = this.sources[i];
var xx = src.getScreenX ();
var yy = src.getScreenY ();
this.plotSource (i, xx, yy);
}
});
Clazz.defineMethod (c$, "map3d", 
function (x, y, z, xpoints, ypoints, pt) {
var realx = this.realxmx * x + this.realxmy * y;
var realy = this.realymz * z + this.realymadd;
var realz = this.realzmx * x + this.realzmy * y + this.realzmadd;
xpoints[pt] = this.centerX3d + Clazz.doubleToInt (realx / realz);
ypoints[pt] = this.centerY3d - Clazz.doubleToInt (realy / realz);
}, "~N,~N,~N,~A,~A,~N");
Clazz.defineMethod (c$, "scaleworld", 
function () {
this.scalex = this.viewZoom * (Clazz.doubleToInt (this.winSize.width / 4)) * 66.0 / 8;
this.scaley = -this.scalex;
var y = Clazz.doubleToInt (this.scaley * this.viewHeight / 66.0);
this.centerX3d = Clazz.doubleToInt (this.winSize.width / 2);
this.centerY3d = Clazz.doubleToInt (this.winSize.height / 2) - y;
this.scaleMult = 16. / (Clazz.doubleToInt (this.windowWidth / 2));
this.realxmx = -this.viewAngleCos * this.scaleMult * this.scalex;
this.realxmy = this.viewAngleSin * this.scaleMult * this.scalex;
this.realymz = -this.brightMult * this.scaley;
this.realzmy = this.viewAngleCos * this.scaleMult;
this.realzmx = this.viewAngleSin * this.scaleMult;
this.realymadd = -this.viewHeight * this.scaley;
this.realzmadd = 66.0;
});
Clazz.defineMethod (c$, "draw3dView", 
function () {
var half = Clazz.doubleToInt (this.gridSizeX / 2);
this.scaleworld ();
var x;
var y;
var xdir;
var xstart;
var xend;
var ydir;
var ystart;
var yend;
var sc = this.windowRight - 1;
if (this.viewAngleCos > 0) {
ystart = sc;
yend = this.windowOffsetY - 1;
ydir = -1;
} else {
ystart = this.windowOffsetY;
yend = sc + 1;
ydir = 1;
}if (this.viewAngleSin < 0) {
xstart = this.windowOffsetX;
xend = sc + 1;
xdir = 1;
} else {
xstart = sc;
xend = this.windowOffsetX - 1;
xdir = -1;
}var xFirst = (this.viewAngleSin * xdir < this.viewAngleCos * ydir);
for (x = this.winSize.width * this.winSize.height; --x >= 0; ) this.pixels[x] = 0xFF000000;

var zval = .1;
var zval2 = zval * zval;
for (x = xstart; x != xend; x += xdir) {
for (y = ystart; y != yend; y += ydir) {
if (!xFirst) x = xstart;
for (; x != xend; x += xdir) {
var gi = x + this.gw * y;
this.map3d (x - half, y - half, this.func[gi], this.xpoints, this.ypoints, 0);
this.map3d (x + 1 - half, y - half, this.func[gi + 1], this.xpoints, this.ypoints, 1);
this.map3d (x - half, y + 1 - half, this.func[gi + this.gw], this.xpoints, this.ypoints, 2);
this.map3d (x + 1 - half, y + 1 - half, this.func[gi + this.gw + 1], this.xpoints, this.ypoints, 3);
var qx = this.func[gi + 1] - this.func[gi];
var qy = this.func[gi + this.gw] - this.func[gi];
var normdot = (qx + qy + zval) * (0.5780346820809249) / Math.sqrt (qx * qx + qy * qy + zval2);
var col = this.computeColor (gi, normdot);
this.fillTriangle (this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], this.xpoints[3], this.ypoints[3], col);
this.fillTriangle (this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2], this.xpoints[3], this.ypoints[3], col);
if (xFirst) break;
}
}
if (!xFirst) break;
}
});
Clazz.defineMethod (c$, "computeColor", 
function (gix, c) {
var h = this.func[gix] * this.brightMult;
if (c < 0) c = 0;
if (c > 1) c = 1;
c = .5 + c * .5;
var redness = (h < 0) ? -h : 0;
var grnness = (h > 0) ? h : 0;
if (redness > 1) redness = 1;
if (grnness > 1) grnness = 1;
if (grnness < 0) grnness = 0;
if (redness < 0) redness = 0;
var grayness = (1 - (redness + grnness)) * c;
var grayness2 = grayness;
if (this.medium[gix] > 0) {
var mm = 1 - (this.medium[gix] * (0.003921414846476609));
grayness2 *= mm;
}var gray = .6;
var ri = Clazz.doubleToInt ((c * redness + gray * grayness2) * 255);
var gi = Clazz.doubleToInt ((c * grnness + gray * grayness2) * 255);
var bi = Clazz.doubleToInt ((gray * grayness) * 255);
return 0xFF000000 | (ri << 16) | (gi << 8) | bi;
}, "~N,~N");
Clazz.defineMethod (c$, "fillTriangle", 
function (x1, y1, x2, y2, x3, y3, col) {
if (x1 > x2) {
if (x2 > x3) {
var ay = this.interp (x1, y1, x3, y3, x2);
this.fillTriangle1 (x3, y3, x2, y2, ay, col);
this.fillTriangle1 (x1, y1, x2, y2, ay, col);
} else if (x1 > x3) {
var ay = this.interp (x1, y1, x2, y2, x3);
this.fillTriangle1 (x2, y2, x3, y3, ay, col);
this.fillTriangle1 (x1, y1, x3, y3, ay, col);
} else {
var ay = this.interp (x3, y3, x2, y2, x1);
this.fillTriangle1 (x2, y2, x1, y1, ay, col);
this.fillTriangle1 (x3, y3, x1, y1, ay, col);
}} else {
if (x1 > x3) {
var ay = this.interp (x2, y2, x3, y3, x1);
this.fillTriangle1 (x3, y3, x1, y1, ay, col);
this.fillTriangle1 (x2, y2, x1, y1, ay, col);
} else if (x2 > x3) {
var ay = this.interp (x2, y2, x1, y1, x3);
this.fillTriangle1 (x1, y1, x3, y3, ay, col);
this.fillTriangle1 (x2, y2, x3, y3, ay, col);
} else {
var ay = this.interp (x3, y3, x1, y1, x2);
this.fillTriangle1 (x1, y1, x2, y2, ay, col);
this.fillTriangle1 (x3, y3, x2, y2, ay, col);
}}}, "~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "interp", 
function (x1, y1, x2, y2, x) {
if (x1 == x2) return y1;
if (x < x1 && x < x2 || x > x1 && x > x2) System.out.print ("interp out of bounds\n");
return Clazz.doubleToInt (y1 + (x - x1) * (y2 - y1) / (x2 - x1));
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "fillTriangle1", 
function (x1, y1, x2, y2, y3, col) {
var dir = (x1 > x2) ? -1 : 1;
var x = x1;
if (x < 0) {
x = 0;
if (x2 < 0) return;
}if (x >= this.winSize.width) {
x = this.winSize.width - 1;
if (x2 >= this.winSize.width) return;
}if (y2 > y3) {
var q = y2;
y2 = y3;
y3 = q;
}while (x != x2 + dir) {
var ya = this.interp (x1, y1, x2, y2, x);
var yb = this.interp (x1, y1, x2, y3, x);
if (ya < 0) ya = 0;
if (yb >= this.winSize.height) yb = this.winSize.height - 1;
for (; ya <= yb; ya++) this.pixels[x + ya * this.winSize.width] = col;

x += dir;
if (x < 0 || x >= this.winSize.width) return;
}
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "abs", 
function (x) {
return x < 0 ? -x : x;
}, "~N");
Clazz.defineMethod (c$, "drawPlaneSource", 
function (x1, y1, x2, y2, v, w) {
if (y1 == y2) {
if (x1 == this.windowOffsetX) x1 = 0;
if (x2 == this.windowOffsetX) x2 = 0;
if (x1 == this.windowOffsetX + this.windowWidth - 1) x1 = this.gridSizeX - 1;
if (x2 == this.windowOffsetX + this.windowWidth - 1) x2 = this.gridSizeX - 1;
}if (x1 == x2) {
if (y1 == this.windowOffsetY) y1 = 0;
if (y2 == this.windowOffsetY) y2 = 0;
if (y1 == this.windowOffsetY + this.windowHeight - 1) y1 = this.gridSizeY - 1;
if (y2 == this.windowOffsetY + this.windowHeight - 1) y2 = this.gridSizeY - 1;
}if (x1 == x2 && y1 == y2) {
this.func[x1 + this.gw * y1] = v;
this.funci[x1 + this.gw * y1] = 0;
} else if (this.abs (y2 - y1) > this.abs (x2 - x1)) {
var sgn = this.sign (y2 - y1);
var x;
var y;
for (y = y1; y != y2 + sgn; y += sgn) {
x = x1 + Clazz.doubleToInt ((x2 - x1) * (y - y1) / (y2 - y1));
var ph = sgn * (y - y1) / (y2 - y1);
var gi = x + this.gw * y;
this.func[gi] = this.setup.calcSourcePhase (ph, v, w);
this.funci[gi] = 0;
}
} else {
var sgn = this.sign (x2 - x1);
var x;
var y;
for (x = x1; x != x2 + sgn; x += sgn) {
y = y1 + Clazz.doubleToInt ((y2 - y1) * (x - x1) / (x2 - x1));
var ph = sgn * (x - x1) / (x2 - x1);
var gi = x + this.gw * y;
this.func[gi] = this.setup.calcSourcePhase (ph, v, w);
this.funci[gi] = 0;
}
}}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "sign", 
function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
}, "~N");
Clazz.defineMethod (c$, "edit", 
function (e) {
if (this.view3dCheck.getState ()) return;
var x = e.getX ();
var y = e.getY ();
if (this.selectedSource != -1) {
x = Clazz.doubleToInt (x * this.windowWidth / this.winSize.width);
y = Clazz.doubleToInt (y * this.windowHeight / this.winSize.height);
if (x >= 0 && y >= 0 && x < this.windowWidth && y < this.windowHeight) {
this.sources[this.selectedSource].x = x + this.windowOffsetX;
this.sources[this.selectedSource].y = y + this.windowOffsetY;
}return;
}if (this.dragX == x && this.dragY == y) this.editFuncPoint (x, y);
 else {
if (this.abs (y - this.dragY) > this.abs (x - this.dragX)) {
var x1 = (y < this.dragY) ? x : this.dragX;
var y1 = (y < this.dragY) ? y : this.dragY;
var x2 = (y > this.dragY) ? x : this.dragX;
var y2 = (y > this.dragY) ? y : this.dragY;
this.dragX = x;
this.dragY = y;
for (y = y1; y <= y2; y++) {
x = x1 + Clazz.doubleToInt ((x2 - x1) * (y - y1) / (y2 - y1));
this.editFuncPoint (x, y);
}
} else {
var x1 = (x < this.dragX) ? x : this.dragX;
var y1 = (x < this.dragX) ? y : this.dragY;
var x2 = (x > this.dragX) ? x : this.dragX;
var y2 = (x > this.dragX) ? y : this.dragY;
this.dragX = x;
this.dragY = y;
for (x = x1; x <= x2; x++) {
y = y1 + Clazz.doubleToInt ((y2 - y1) * (x - x1) / (x2 - x1));
this.editFuncPoint (x, y);
}
}}}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "editFuncPoint", 
function (x, y) {
var xp = Clazz.doubleToInt (x * this.windowWidth / this.winSize.width) + this.windowOffsetX;
var yp = Clazz.doubleToInt (y * this.windowHeight / this.winSize.height) + this.windowOffsetY;
var gi = xp + yp * this.gw;
if (this.modeChooser.getSelectedIndex () == 1) {
if (!this.dragSet && !this.dragClear) {
this.dragClear = this.walls[gi];
this.dragSet = !this.dragClear;
}this.walls[gi] = this.dragSet;
this.calcExceptions ();
this.func[gi] = this.funci[gi] = 0;
} else if (this.modeChooser.getSelectedIndex () == 2) {
if (!this.dragSet && !this.dragClear) {
this.dragClear = this.medium[gi] > 0;
this.dragSet = !this.dragClear;
}this.medium[gi] = (this.dragSet) ? 191 : 0;
this.calcExceptions ();
} else {
if (!this.dragSet && !this.dragClear) {
this.dragClear = this.func[gi] > .1;
this.dragSet = !this.dragClear;
}this.func[gi] = (this.dragSet) ? 1 : -1;
this.funci[gi] = 0;
}this.cv.repaint (0);
}, "~N,~N");
Clazz.defineMethod (c$, "selectSource", 
function (me) {
var x = me.getX ();
var y = me.getY ();
var i;
for (i = 0; i != this.sourceCount; i++) {
var src = this.sources[i];
var sx = src.getScreenX ();
var sy = src.getScreenY ();
var r2 = (sx - x) * (sx - x) + (sy - y) * (sy - y);
if (49 > r2) {
this.selectedSource = i;
return;
}}
this.selectedSource = -1;
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "setDamping", 
function () {
this.dampcoef = 1;
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
if (e.getSource () === this.blankButton) {
this.doBlank ();
this.cv.repaint ();
}if (e.getSource () === this.blankWallsButton) {
this.doBlankWalls ();
this.cv.repaint ();
}if (e.getSource () === this.borderButton) {
this.doBorder ();
this.cv.repaint ();
}if (e.getSource () === this.exportButton) this.doImport ();
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
var src = e.getSource ();
System.out.print (src.getName () + "=" + src.getValue () + "\n");
if (src === this.resBar) {
this.setResolution ();
this.reinit ();
}if (src === this.dampingBar) this.setDamping ();
if (src === this.brightnessBar) this.cv.repaint (0);
if (src === this.freqBar) this.setFreq ();
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "setFreqBar", 
function (x) {
this.freqBar.setValue (x);
this.freqBarValue = x;
this.freqTimeZero = 0;
}, "~N");
Clazz.defineMethod (c$, "setFreq", 
function () {
var oldfreq = this.freqBarValue * 0.0233333;
this.freqBarValue = this.freqBar.getValue ();
var newfreq = this.freqBarValue * 0.0233333;
var adj = newfreq - oldfreq;
this.freqTimeZero = this.t - oldfreq * (this.t - this.freqTimeZero) / newfreq;
});
Clazz.defineMethod (c$, "setResolution", 
function () {
this.windowWidth = this.windowHeight = this.resBar.getValue ();
var border = Clazz.doubleToInt (this.windowWidth / 9);
if (border < 20) border = 20;
this.windowOffsetX = this.windowOffsetY = border;
this.gridSizeX = this.windowWidth + this.windowOffsetX * 2;
this.gridSizeY = this.windowHeight + this.windowOffsetY * 2;
this.windowBottom = this.windowOffsetY + this.windowHeight - 1;
this.windowRight = this.windowOffsetX + this.windowWidth - 1;
});
Clazz.defineMethod (c$, "setResolution", 
function (x) {
this.resBar.setValue (x);
this.setResolution ();
this.reinit ();
}, "~N");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
if (this.view3dCheck.getState ()) {
this.view3dDrag (e);
}if (!this.dragging) this.selectSource (e);
this.dragging = true;
this.edit (e);
this.adjustResolution = false;
this.cv.repaint (0);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
if (this.dragging) return;
var x = e.getX ();
var y = e.getY ();
this.dragStartX = this.dragX = x;
this.dragStartY = this.dragY = y;
this.viewAngleDragStart = this.viewAngle;
this.viewHeightDragStart = this.viewHeight;
this.selectSource (e);
if (this.stoppedCheck.getState ()) this.cv.repaint (0);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "view3dDrag", 
function (e) {
var x = e.getX ();
var y = e.getY ();
this.viewAngle = (this.dragStartX - x) / 40. + this.viewAngleDragStart;
while (this.viewAngle < 0) this.viewAngle += 6.283185307179586;

while (this.viewAngle >= 6.283185307179586) this.viewAngle -= 6.283185307179586;

this.viewAngleCos = Math.cos (this.viewAngle);
this.viewAngleSin = Math.sin (this.viewAngle);
this.viewHeight = (this.dragStartY - y) / 10. + this.viewHeightDragStart;
this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
this.dragStartX = -1;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
this.adjustResolution = false;
this.mouseMoved (e);
if ((e.getModifiers () & 16) == 0) return;
this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.dragging = false;
this.dragSet = this.dragClear = false;
this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (e.getItemSelectable () === this.stoppedCheck) {
this.cv.repaint ();
return;
}if (e.getItemSelectable () === this.sourceChooser) {
if (this.sourceChooser.getSelectedIndex () != this.sourceIndex) this.setSources ();
}if (e.getItemSelectable () === this.setupChooser) this.doSetup ();
if (e.getItemSelectable () === this.colorChooser) this.doColor ();
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "doSetup", 
function () {
this.t = 0;
if (this.resBar.getValue () < 32) this.setResolution (32);
this.doBlank ();
this.doBlankWalls ();
this.sourceCount = -1;
this.sourceChooser.select (1);
this.dampingBar.setValue (10);
this.setFreqBar (5);
this.setBrightness (10);
this.auxBar.setValue (1);
this.fixedEndsCheck.setState (true);
this.setup = this.setupList.elementAt (this.setupChooser.getSelectedIndex ());
this.setup.select ();
this.setup.doSetupSources ();
this.calcExceptions ();
this.setDamping ();
});
Clazz.defineMethod (c$, "setBrightness", 
function (x) {
var m = x / 5.;
m = (Math.log (m) + 5.) * 100;
this.brightnessBar.setValue (Clazz.doubleToInt (m));
}, "~N");
Clazz.defineMethod (c$, "doColor", 
function () {
var cn = this.colorChooser.getSelectedIndex ();
this.wallColor = this.schemeColors[cn][0];
this.posColor = this.schemeColors[cn][1];
this.negColor = this.schemeColors[cn][2];
this.zeroColor = this.schemeColors[cn][3];
this.posMedColor = this.schemeColors[cn][4];
this.negMedColor = this.schemeColors[cn][5];
this.medColor = this.schemeColors[cn][6];
this.sourceColor = this.schemeColors[cn][7];
});
Clazz.defineMethod (c$, "addDefaultColorScheme", 
function () {
var schemes = ["#808080 #00ffff #000000 #008080 #0000ff #000000 #000080 #ffffff", "#808080 #00ff00 #ff0000 #000000 #00ffff #ff00ff #0000ff #0000ff", "#800000 #00ffff #0000ff #000000 #80c8c8 #8080c8 #808080 #ffffff", "#800000 #ffffff #000000 #808080 #0000ff #000000 #000080 #00ff00", "#800000 #ffff00 #0000ff #000000 #ffff80 #8080ff #808080 #ffffff", "#808080 #00ff00 #ff0000 #FFFFFF #00ffff #ff00ff #0000ff #0000ff", "#FF0000 #00FF00 #0000FF #FFFF00 #00FFFF #FF00FF #FFFFFF #000000"];
var i;
for (i = 0; i != 7; i++) this.decodeColorScheme (i, schemes[i]);

});
Clazz.defineMethod (c$, "decodeColorScheme", 
function (cn, s) {
var st =  new java.util.StringTokenizer (s);
while (st.hasMoreTokens ()) {
var i;
for (i = 0; i != 8; i++) this.schemeColors[cn][i] = java.awt.Color.decode (st.nextToken ());

}
this.colorChooser.add ("Color Scheme " + (cn + 1));
}, "~N,~S");
Clazz.defineMethod (c$, "addMedium", 
function () {
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = Clazz.doubleToInt (this.gridSizeY / 2); j != this.gridSizeY; j++) this.medium[i + j * this.gw] = 191;


});
Clazz.defineMethod (c$, "setSources", 
function () {
this.sourceIndex = this.sourceChooser.getSelectedIndex ();
var oldSCount = this.sourceCount;
var oldPlane = this.sourcePlane;
this.sourceFreqCount = 1;
this.sourcePlane = (this.sourceChooser.getSelectedIndex () >= 10 && this.sourceChooser.getSelectedIndex () < 16);
this.sourceMoving = false;
this.sourceWaveform = 0;
this.sourceCount = 1;
var phase = false;
switch (this.sourceChooser.getSelectedIndex ()) {
case 0:
this.sourceCount = 0;
break;
case 2:
this.sourceFreqCount = 2;
break;
case 3:
this.sourceCount = 2;
break;
case 4:
this.sourceCount = 2;
this.sourceFreqCount = 2;
break;
case 5:
this.sourceCount = 3;
break;
case 6:
this.sourceCount = 4;
break;
case 7:
this.sourceWaveform = 1;
break;
case 8:
this.sourceWaveform = 2;
break;
case 9:
this.sourceMoving = true;
break;
case 11:
this.sourceFreqCount = 2;
break;
case 12:
this.sourceCount = 2;
break;
case 13:
this.sourceCount = this.sourceFreqCount = 2;
break;
case 14:
this.sourceWaveform = 2;
break;
case 15:
phase = true;
break;
case 16:
this.sourceCount = 6;
break;
case 17:
this.sourceCount = 8;
break;
case 18:
this.sourceCount = 10;
break;
case 19:
this.sourceCount = 12;
break;
case 20:
this.sourceCount = 16;
break;
case 21:
this.sourceCount = 20;
break;
}
if (this.sourceFreqCount >= 2) {
this.auxFunction = 2;
this.auxBar.setValue (this.freqBar.getValue ());
if (this.sourceCount == 2) this.auxLabel.setText ("Source 2 Frequency");
 else this.auxLabel.setText ("2nd Frequency");
} else if (this.sourceCount == 2 || this.sourceCount >= 4 || phase) {
this.auxFunction = 1;
this.auxBar.setValue (1);
this.auxLabel.setText ("Phase Difference");
} else if (this.sourceMoving) {
this.auxFunction = 3;
this.auxBar.setValue (7);
this.auxLabel.setText ("Source Speed");
} else {
this.auxFunction = 0;
this.auxBar.setVisible (false);
this.auxLabel.setVisible (false);
}if (this.auxFunction != 0) {
this.auxBar.setVisible (true);
this.auxLabel.setVisible (true);
}this.validate ();
if (this.sourcePlane) {
this.sourceCount *= 2;
if (!(oldPlane && oldSCount == this.sourceCount)) {
var x2 = this.windowOffsetX + this.windowWidth - 1;
var y2 = this.windowOffsetY + this.windowHeight - 1;
this.sources[0] = Clazz.innerTypeInstance (test.falstad.RippleFrame.OscSource, this, null, this.windowOffsetX, this.windowOffsetY + 1);
this.sources[1] = Clazz.innerTypeInstance (test.falstad.RippleFrame.OscSource, this, null, x2, this.windowOffsetY + 1);
this.sources[2] = Clazz.innerTypeInstance (test.falstad.RippleFrame.OscSource, this, null, this.windowOffsetX, y2);
this.sources[3] = Clazz.innerTypeInstance (test.falstad.RippleFrame.OscSource, this, null, x2, y2);
}} else if (!(oldSCount == this.sourceCount && !oldPlane)) {
this.sources[0] = Clazz.innerTypeInstance (test.falstad.RippleFrame.OscSource, this, null, Clazz.doubleToInt (this.gridSizeX / 2), this.windowOffsetY + 1);
this.sources[1] = Clazz.innerTypeInstance (test.falstad.RippleFrame.OscSource, this, null, Clazz.doubleToInt (this.gridSizeX / 2), this.gridSizeY - this.windowOffsetY - 2);
this.sources[2] = Clazz.innerTypeInstance (test.falstad.RippleFrame.OscSource, this, null, this.windowOffsetX + 1, Clazz.doubleToInt (this.gridSizeY / 2));
this.sources[3] = Clazz.innerTypeInstance (test.falstad.RippleFrame.OscSource, this, null, this.gridSizeX - this.windowOffsetX - 2, Clazz.doubleToInt (this.gridSizeY / 2));
var i;
for (i = 4; i < this.sourceCount; i++) this.sources[i] = Clazz.innerTypeInstance (test.falstad.RippleFrame.OscSource, this, null, this.windowOffsetX + 1 + i * 2, Clazz.doubleToInt (this.gridSizeY / 2));

}});
Clazz.defineMethod (c$, "doImport", 
function () {
if (this.impDialog != null) {
this.requestFocus ();
this.impDialog.dispose ();
this.impDialog = null;
}var dump = "";
var i;
dump = "$ 0 " + this.resBar.getValue () + " " + this.sourceChooser.getSelectedIndex () + " " + this.colorChooser.getSelectedIndex () + " " + this.fixedEndsCheck.getState () + " " + this.view3dCheck.getState () + " " + this.speedBar.getValue () + " " + this.freqBar.getValue () + " " + this.brightnessBar.getValue () + " " + this.auxBar.getValue () + "\n";
for (i = 0; i != this.sourceCount; i++) {
var src = this.sources[i];
dump += "s " + src.x + " " + src.y + "\n";
}
for (i = 0; i != this.gridSizeXY; ) {
if (i >= this.gridSizeX) {
var istart = i;
for (; i < this.gridSizeXY && this.walls[i] == this.walls[i - this.gridSizeX] && this.medium[i] == this.medium[i - this.gridSizeX]; i++) ;
if (i > istart) {
dump += "l " + (i - istart) + "\n";
continue;
}}var x = this.walls[i];
var m = this.medium[i];
var ct = 0;
for (; i < this.gridSizeXY && this.walls[i] == x && this.medium[i] == m; ct++, i++) ;
dump += (x ? "w " : "c ") + ct + " " + m + "\n";
}
this.impDialog = Clazz.innerTypeInstance (test.falstad.RippleFrame.ImportDialog, this, null, this, dump);
this.impDialog.setVisible (true);
});
Clazz.defineMethod (c$, "readImport", 
function (s) {
var b = s.getBytes ();
var len = s.length;
var p;
var x = 0;
var srci = 0;
this.setupChooser.select (0);
this.setup = this.setupList.elementAt (0);
for (p = 0; p < len; ) {
var l;
var linelen = 0;
for (l = 0; l != len - p; l++) if (b[l + p] == 10 || b[l + p] == 13) {
linelen = l++;
if (l + p < b.length && b[l + p] == 10) l++;
break;
}
var line =  String.instantialize (b, p, linelen);
var st =  new java.util.StringTokenizer (line);
while (st.hasMoreTokens ()) {
var type = st.nextToken ();
var tint = type.charCodeAt (0);
try {
if (tint == 36) {
var flags =  new Integer (st.nextToken ()).intValue ();
this.resBar.setValue ( new Integer (st.nextToken ()).intValue ());
this.setResolution ();
this.reinit (false);
this.sourceChooser.select ( new Integer (st.nextToken ()).intValue ());
this.setSources ();
this.colorChooser.select ( new Integer (st.nextToken ()).intValue ());
this.doColor ();
this.fixedEndsCheck.setState (st.nextToken ().compareTo ("true") == 0);
this.view3dCheck.setState (st.nextToken ().compareTo ("true") == 0);
this.speedBar.setValue ( new Integer (st.nextToken ()).intValue ());
this.freqBar.setValue ( new Integer (st.nextToken ()).intValue ());
this.brightnessBar.setValue ( new Integer (st.nextToken ()).intValue ());
this.auxBar.setValue ( new Integer (st.nextToken ()).intValue ());
break;
}if (tint == 119 || tint == 99) {
var w = (tint == 119);
var ct =  new Integer (st.nextToken ()).intValue ();
var md =  new Integer (st.nextToken ()).intValue ();
for (; ct > 0; ct--, x++) {
this.walls[x] = w;
this.medium[x] = md;
}
break;
}if (tint == 108) {
var ct =  new Integer (st.nextToken ()).intValue ();
for (; ct > 0; ct--, x++) {
this.walls[x] = this.walls[x - this.gridSizeX];
this.medium[x] = this.medium[x - this.gridSizeX];
}
break;
}if (tint == 115) {
var sx =  new Integer (st.nextToken ()).intValue ();
var sy =  new Integer (st.nextToken ()).intValue ();
this.sources[srci].x = sx;
this.sources[srci].y = sy;
srci++;
break;
}System.out.println ("unknown type!");
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
ee.printStackTrace ();
break;
} else {
throw ee;
}
}
break;
}
p += l;
}
this.calcExceptions ();
this.setDamping ();
}, "~S");
Clazz.defineMethod (c$, "setupMode", 
function (x, y, sx, sy, nx, ny) {
var i;
var j;
for (i = 0; i != sx; i++) for (j = 0; j != sy; j++) {
var gi = i + x + this.gw * (j + y);
this.func[gi] = (Math.sin (3.141592653589793 * nx * (i + 1) / (sx + 1)) * Math.sin (3.141592653589793 * ny * (j + 1) / (sy + 1)));
this.funci[gi] = 0;
}

}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setupAcousticMode", 
function (x, y, sx, sy, nx, ny) {
var i;
var j;
if (nx == 0 && ny == 0) return;
for (i = 0; i != sx; i++) for (j = 0; j != sy; j++) {
var gi = i + x + this.gw * (j + y);
this.func[gi] = (Math.cos (3.141592653589793 * nx * i / (sx - 1)) * Math.cos (3.141592653589793 * ny * j / (sy - 1)));
this.funci[gi] = 0;
}

}, "~N,~N,~N,~N,~N,~N");
c$.$RippleFrame$OscSource$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.x = 0;
this.y = 0;
this.v = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "OscSource");
Clazz.makeConstructor (c$, 
function (a, b) {
this.x = a;
this.y = b;
}, "~N,~N");
Clazz.defineMethod (c$, "getScreenX", 
function () {
return Clazz.doubleToInt (((this.x - this.b$["test.falstad.RippleFrame"].windowOffsetX) * this.b$["test.falstad.RippleFrame"].winSize.width + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].winSize.width / 2)) / this.b$["test.falstad.RippleFrame"].windowWidth);
});
Clazz.defineMethod (c$, "getScreenY", 
function () {
return Clazz.doubleToInt (((this.y - this.b$["test.falstad.RippleFrame"].windowOffsetY) * this.b$["test.falstad.RippleFrame"].winSize.height + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].winSize.height / 2)) / this.b$["test.falstad.RippleFrame"].windowHeight);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ImportDialogLayout$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ImportDialogLayout", null, java.awt.LayoutManager);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (a, b) {
}, "~S,java.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (a) {
}, "java.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (a) {
return  new java.awt.Dimension (500, 500);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (a) {
return  new java.awt.Dimension (100, 100);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (a) {
var b = a.getInsets ();
var c = a.getSize ().width - b.left - b.right;
var d = a.getSize ().height - (b.top + b.bottom);
var e;
var f = 300;
if (a.getComponentCount () == 0) return;
var g = a.getComponent (a.getComponentCount () - 1);
var h = g.getPreferredSize ();
a.getComponent (0).setLocation (b.left, b.top);
var i = a.getSize ().width - b.left - b.right;
var j = a.getSize ().height - b.top - b.bottom - h.height;
a.getComponent (0).setSize (i, j);
var k = j + b.top;
var l = 0;
for (e = 1; e < a.getComponentCount (); e++) {
var m = a.getComponent (e);
if (m.isVisible ()) {
var n = m.getPreferredSize ();
m.setLocation (b.left + l, k);
m.setSize (n.width, n.height);
l += n.width;
}}
}, "java.awt.Container");
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ImportDialog$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.rframe = null;
this.importButton = null;
this.clearButton = null;
this.closeButton = null;
this.text = null;
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ImportDialog", swingjs.awt.Dialog, java.awt.event.ActionListener);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, test.falstad.RippleFrame.ImportDialog, [a, (b.length > 0) ? "Export" : "Import", false]);
this.setDefaultCloseOperation (2);
this.rframe = a;
this.setLayout (Clazz.innerTypeInstance (test.falstad.RippleFrame.ImportDialogLayout, this, null));
this.add (this.text =  new swingjs.awt.TextArea (b, 10, 60));
this.add (this.importButton =  new swingjs.awt.Button ("Import"));
this.importButton.addActionListener (this);
this.add (this.clearButton =  new swingjs.awt.Button ("Clear"));
this.clearButton.addActionListener (this);
this.add (this.closeButton =  new swingjs.awt.Button ("Close"));
this.closeButton.addActionListener (this);
this.setSize (400, 300);
var c = (this.b$["test.falstad.RippleFrame"].main === this.rframe ? this.rframe.getLocationOnScreen () :  new java.awt.Point (0, 0));
var d = this.getSize ();
this.setLocation (c.x + Clazz.doubleToInt ((this.b$["test.falstad.RippleFrame"].winSize.width - d.width) / 2), c.y + Clazz.doubleToInt ((this.b$["test.falstad.RippleFrame"].winSize.height - d.height) / 2));
this.setVisible (true);
if (b.length > 0) this.text.selectAll ();
}, "test.falstad.RippleFrame,~S");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b;
var c = a.getSource ();
if (c === this.importButton) {
this.rframe.readImport (this.text.getText ());
this.setVisible (false);
}if (c === this.closeButton) this.setVisible (false);
if (c === this.clearButton) this.text.setText ("");
}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (a) {
if (a.id == 201) {
this.rframe.requestFocus ();
this.setVisible (false);
return true;
}return Clazz.superCall (this, test.falstad.RippleFrame.ImportDialog, "handleEvent", [a]);
}, "java.awt.Event");
c$ = Clazz.p0p ();
};
c$.$RippleFrame$Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "Setup");
Clazz.defineMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].setSources ();
});
Clazz.defineMethod (c$, "deselect", 
function () {
});
Clazz.defineMethod (c$, "sourceStrength", 
function () {
return 1;
});
Clazz.defineMethod (c$, "eachFrame", 
function () {
});
Clazz.defineMethod (c$, "calcSourcePhase", 
function (a, b, c) {
return b;
}, "~N,~N,~N");
c$ = Clazz.p0p ();
};
c$.$RippleFrame$SingleSourceSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "SingleSourceSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Single Source";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].setFreqBar (15);
this.b$["test.falstad.RippleFrame"].setBrightness (27);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.DoubleSourceSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$DoubleSourceSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "DoubleSourceSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Two Sources";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].setFreqBar (15);
this.b$["test.falstad.RippleFrame"].setBrightness (19);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (3);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) - 8;
this.b$["test.falstad.RippleFrame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) + 8;
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.QuadrupleSourceSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$QuadrupleSourceSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "QuadrupleSourceSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Four Sources";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (6);
this.b$["test.falstad.RippleFrame"].setFreqBar (15);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.SingleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$SingleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "SingleSlitSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Single Slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
var c = this.b$["test.falstad.RippleFrame"].windowOffsetY + 8;
for (a = 0; a != this.b$["test.falstad.RippleFrame"].gridSizeX; a++) this.b$["test.falstad.RippleFrame"].setWall (a, c);

for (a = -8; a <= 8; a++) this.b$["test.falstad.RippleFrame"].setWall (b + a, c, false);

this.b$["test.falstad.RippleFrame"].setBrightness (7);
this.b$["test.falstad.RippleFrame"].setFreqBar (25);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.DoubleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$DoubleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "DoubleSlitSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Double Slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
var c = this.b$["test.falstad.RippleFrame"].windowOffsetY + 4;
for (a = 0; a != this.b$["test.falstad.RippleFrame"].gridSizeX; a++) this.b$["test.falstad.RippleFrame"].setWall (a, c);

for (a = 0; a != 3; a++) {
this.b$["test.falstad.RippleFrame"].setWall (b - 5 - a, c, false);
this.b$["test.falstad.RippleFrame"].setWall (b + 5 + a, c, false);
}
this.b$["test.falstad.RippleFrame"].brightnessBar.setValue (488);
this.b$["test.falstad.RippleFrame"].setFreqBar (22);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.TripleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$TripleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "TripleSlitSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Triple Slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
var c = this.b$["test.falstad.RippleFrame"].windowOffsetY + 4;
for (a = 0; a != this.b$["test.falstad.RippleFrame"].gridSizeX; a++) this.b$["test.falstad.RippleFrame"].setWall (a, c);

for (a = -1; a <= 1; a++) {
this.b$["test.falstad.RippleFrame"].setWall (b - 12 + a, c, false);
this.b$["test.falstad.RippleFrame"].setWall (b + a, c, false);
this.b$["test.falstad.RippleFrame"].setWall (b + 12 + a, c, false);
}
this.b$["test.falstad.RippleFrame"].setBrightness (12);
this.b$["test.falstad.RippleFrame"].setFreqBar (22);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.ObstacleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ObstacleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ObstacleSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Obstacle";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
var c = this.b$["test.falstad.RippleFrame"].windowOffsetY + 12;
for (a = -15; a <= 15; a++) this.b$["test.falstad.RippleFrame"].setWall (b + a, c);

this.b$["test.falstad.RippleFrame"].setBrightness (280);
this.b$["test.falstad.RippleFrame"].setFreqBar (20);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.HalfPlaneSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$HalfPlaneSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "HalfPlaneSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Half Plane";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a = this.b$["test.falstad.RippleFrame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 2);
var b;
for (b = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 2); b < this.b$["test.falstad.RippleFrame"].windowWidth; b++) this.b$["test.falstad.RippleFrame"].setWall (this.b$["test.falstad.RippleFrame"].windowOffsetX + b, this.b$["test.falstad.RippleFrame"].windowOffsetY + 3);

this.b$["test.falstad.RippleFrame"].setBrightness (4);
this.b$["test.falstad.RippleFrame"].setFreqBar (25);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.DipoleSourceSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$DipoleSourceSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "DipoleSourceSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dipole Source";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (3);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2);
this.b$["test.falstad.RippleFrame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) - 1;
this.b$["test.falstad.RippleFrame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) + 1;
this.b$["test.falstad.RippleFrame"].auxBar.setValue (29);
this.b$["test.falstad.RippleFrame"].setFreqBar (13);
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].setBrightness (33);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.LateralQuadrupoleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$LateralQuadrupoleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "LateralQuadrupoleSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Lateral Quadrupole";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (6);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].sources[2].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2);
this.b$["test.falstad.RippleFrame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) - 2;
this.b$["test.falstad.RippleFrame"].sources[2].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) + 2;
this.b$["test.falstad.RippleFrame"].sources[1].x = this.b$["test.falstad.RippleFrame"].sources[3].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
this.b$["test.falstad.RippleFrame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) - 2;
this.b$["test.falstad.RippleFrame"].sources[3].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) + 2;
this.b$["test.falstad.RippleFrame"].setFreqBar (13);
this.b$["test.falstad.RippleFrame"].auxBar.setValue (29);
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].setBrightness (33);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.LinearQuadrupoleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$LinearQuadrupoleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "LinearQuadrupoleSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Linear Quadrupole";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (6);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].sources[1].y = this.b$["test.falstad.RippleFrame"].sources[2].y = this.b$["test.falstad.RippleFrame"].sources[3].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2);
this.b$["test.falstad.RippleFrame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) - 3;
this.b$["test.falstad.RippleFrame"].sources[2].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) + 3;
this.b$["test.falstad.RippleFrame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) + 1;
this.b$["test.falstad.RippleFrame"].sources[3].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) - 1;
this.b$["test.falstad.RippleFrame"].auxBar.setValue (29);
this.b$["test.falstad.RippleFrame"].setFreqBar (13);
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].setBrightness (33);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.HexapoleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$HexapoleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "HexapoleSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Hexapole";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (16);
this.b$["test.falstad.RippleFrame"].setSources ();
this.doMultipole (6, 4);
this.b$["test.falstad.RippleFrame"].setFreqBar (22);
this.b$["test.falstad.RippleFrame"].auxBar.setValue (29);
});
Clazz.defineMethod (c$, "doMultipole", 
function (a, b) {
var c;
for (c = 0; c != a; c++) {
var d = Math.round (b * Math.cos (2 * 3.141592653589793 * c / a));
var e = Math.round (b * Math.sin (2 * 3.141592653589793 * c / a));
this.b$["test.falstad.RippleFrame"].sources[c].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) + Clazz.doubleToInt (d);
this.b$["test.falstad.RippleFrame"].sources[c].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) + Clazz.doubleToInt (e);
}
}, "~N,~N");
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].brightnessBar.setValue (648);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.OctupoleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$OctupoleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "OctupoleSetup", test.falstad.RippleFrame.HexapoleSetup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.HexapoleSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Octupole";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (17);
this.b$["test.falstad.RippleFrame"].setSources ();
this.doMultipole (8, 4);
this.b$["test.falstad.RippleFrame"].setFreqBar (22);
this.b$["test.falstad.RippleFrame"].auxBar.setValue (29);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.Multi12Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$Multi12Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "Multi12Setup", test.falstad.RippleFrame.HexapoleSetup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.HexapoleSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "12-Pole";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (19);
this.b$["test.falstad.RippleFrame"].setSources ();
this.doMultipole (12, 6);
this.b$["test.falstad.RippleFrame"].setFreqBar (22);
this.b$["test.falstad.RippleFrame"].auxBar.setValue (29);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.PlaneWaveSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$PlaneWaveSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "PlaneWaveSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Plane Wave";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
this.b$["test.falstad.RippleFrame"].setFreqBar (15);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.IntersectingPlaneWavesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$IntersectingPlaneWavesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "IntersectingPlaneWavesSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Intersecting Planes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].setBrightness (4);
this.b$["test.falstad.RippleFrame"].setFreqBar (17);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (12);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].sources[1].y = this.b$["test.falstad.RippleFrame"].windowOffsetY;
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1;
this.b$["test.falstad.RippleFrame"].sources[2].x = this.b$["test.falstad.RippleFrame"].sources[3].x = this.b$["test.falstad.RippleFrame"].windowOffsetX;
this.b$["test.falstad.RippleFrame"].sources[2].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + 1;
this.b$["test.falstad.RippleFrame"].sources[3].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + this.b$["test.falstad.RippleFrame"].windowHeight - 1;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.PhasedArray1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$PhasedArray1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "PhasedArray1Setup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Phased Array 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].setBrightness (5);
this.b$["test.falstad.RippleFrame"].setFreqBar (17);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (15);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
this.b$["test.falstad.RippleFrame"].sources[0].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) - 12;
this.b$["test.falstad.RippleFrame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) + 12;
this.b$["test.falstad.RippleFrame"].auxBar.setValue (5);
});
Clazz.overrideMethod (c$, "calcSourcePhase", 
function (a, b, c) {
a *= (this.b$["test.falstad.RippleFrame"].auxBar.getValue () - 15) * 3.8 * this.b$["test.falstad.RippleFrame"].freqBar.getValue () * 0.0233333;
return Math.sin (c + a);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.PhasedArray2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$PhasedArray2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "PhasedArray2Setup", test.falstad.RippleFrame.PhasedArray1Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.PhasedArray1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Phased Array 2";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (15);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].sources[1].x = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1;
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + 1;
this.b$["test.falstad.RippleFrame"].sources[1].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + this.b$["test.falstad.RippleFrame"].windowHeight - 2;
this.b$["test.falstad.RippleFrame"].auxBar.setValue (5);
});
Clazz.overrideMethod (c$, "calcSourcePhase", 
function (a, b, c) {
var d = this.b$["test.falstad.RippleFrame"].auxBar.getValue () * 2.5 / 30.;
a -= .5;
a = Math.sqrt (a * a + d * d);
a *= this.b$["test.falstad.RippleFrame"].freqBar.getValue () * 0.0233333 * 108;
return Math.sin (c + a);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.PhasedArray3Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$PhasedArray3Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "PhasedArray3Setup", test.falstad.RippleFrame.PhasedArray2Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.PhasedArray2Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Phased Array 3";
});
Clazz.overrideMethod (c$, "calcSourcePhase", 
function (a, b, c) {
var d = this.b$["test.falstad.RippleFrame"].auxBar.getValue () * 2.5 / 30.;
a -= .5;
a = Math.sqrt (a * a + d * d);
a *= this.b$["test.falstad.RippleFrame"].freqBar.getValue () * 0.0233333 * 108;
return Math.sin (c - a);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.DopplerSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$DopplerSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "DopplerSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Doppler Effect 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (9);
this.b$["test.falstad.RippleFrame"].setFreqBar (13);
this.b$["test.falstad.RippleFrame"].setBrightness (20);
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.Doppler2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$Doppler2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.wall = 0;
this.dir = 0;
this.waiting = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "Doppler2Setup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Doppler Effect 2";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.wall = this.b$["test.falstad.RippleFrame"].gridSizeY / 2.;
this.dir = 1;
this.waiting = 0;
this.b$["test.falstad.RippleFrame"].setFreqBar (13);
this.b$["test.falstad.RippleFrame"].setBrightness (220);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (1);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1;
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + 1;
});
Clazz.overrideMethod (c$, "eachFrame", 
function () {
if (this.waiting > 0) {
this.waiting--;
return;
}var a = Clazz.doubleToInt (this.wall);
this.wall += this.dir * .04;
var b = Clazz.doubleToInt (this.wall);
if (a != b) {
var c;
for (c = this.b$["test.falstad.RippleFrame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 3); c <= this.b$["test.falstad.RippleFrame"].gridSizeX - 1; c++) {
this.b$["test.falstad.RippleFrame"].setWall (c, a, false);
this.b$["test.falstad.RippleFrame"].setWall (c, b);
var d = c + a * this.b$["test.falstad.RippleFrame"].gw;
if (b < a) this.b$["test.falstad.RippleFrame"].func[d] = this.b$["test.falstad.RippleFrame"].funci[d] = 0;
 else if (a > 1) {
this.b$["test.falstad.RippleFrame"].func[d] = this.b$["test.falstad.RippleFrame"].func[d - this.b$["test.falstad.RippleFrame"].gw] / 2;
this.b$["test.falstad.RippleFrame"].funci[d] = this.b$["test.falstad.RippleFrame"].funci[d - this.b$["test.falstad.RippleFrame"].gw] / 2;
}}
var d = Clazz.doubleToInt ((b - this.b$["test.falstad.RippleFrame"].windowOffsetY) / 2) + this.b$["test.falstad.RippleFrame"].windowOffsetY;
for (c = this.b$["test.falstad.RippleFrame"].windowOffsetY; c < d; c++) this.b$["test.falstad.RippleFrame"].setWall (Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2), c);

this.b$["test.falstad.RippleFrame"].setWall (Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2), c, false);
this.b$["test.falstad.RippleFrame"].calcExceptions ();
}if (b == this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 4) || b == this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight * 3 / 4)) {
this.dir = -this.dir;
this.waiting = 1000;
}});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.SonicBoomSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$SonicBoomSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "SonicBoomSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Sonic Boom";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (9);
this.b$["test.falstad.RippleFrame"].setFreqBar (13);
this.b$["test.falstad.RippleFrame"].setBrightness (20);
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].auxBar.setValue (30);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.BigModeSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$BigModeSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "BigModeSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Big 1x1 Mode";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (0);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth * 3 / 4);
var c = this.b$["test.falstad.RippleFrame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 2) - Clazz.doubleToInt (b / 2);
var d = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 2) - Clazz.doubleToInt (b / 2);
for (a = 0; a != b + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (c + a - 1, d - 1);
this.b$["test.falstad.RippleFrame"].setWall (c + a - 1, d + b);
this.b$["test.falstad.RippleFrame"].setWall (c - 1, d + a - 1);
this.b$["test.falstad.RippleFrame"].setWall (c + b, d + a - 1);
}
this.b$["test.falstad.RippleFrame"].setupMode (c, d, b, b, 1, 1);
this.b$["test.falstad.RippleFrame"].dampingBar.setValue (1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.OneByOneModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$OneByOneModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "OneByOneModesSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "1x1 Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 5;
while (c + d < this.b$["test.falstad.RippleFrame"].windowHeight) {
var e = (Clazz.doubleToInt ((c + d) * (this.b$["test.falstad.RippleFrame"].windowWidth - 8) / this.b$["test.falstad.RippleFrame"].windowHeight)) + 6;
var f = c + this.b$["test.falstad.RippleFrame"].windowOffsetY;
var g = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1;
for (a = 0; a != e + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (g + a - 1, f - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + a - 1, f + d);
}
for (b = 0; b != d + 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (g - 1, f + b - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + e, f + b - 1);
}
this.b$["test.falstad.RippleFrame"].setupMode (g, f, e, d, 1, 1);
c += d + 1;
}
this.b$["test.falstad.RippleFrame"].dampingBar.setValue (1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.OneByNModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$OneByNModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "OneByNModesSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "1xN Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 5;
var e = this.b$["test.falstad.RippleFrame"].windowWidth - 2;
var f = 1;
while (c + d < this.b$["test.falstad.RippleFrame"].windowHeight) {
var g = c + this.b$["test.falstad.RippleFrame"].windowOffsetY;
var h = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1;
for (a = 0; a != e + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (h + a - 1, g - 1);
this.b$["test.falstad.RippleFrame"].setWall (h + a - 1, g + d);
}
for (b = 0; b != d + 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (h - 1, g + b - 1);
this.b$["test.falstad.RippleFrame"].setWall (h + e, g + b - 1);
}
this.b$["test.falstad.RippleFrame"].setupMode (h, g, e, d, f, 1);
c += d + 1;
f++;
}
this.b$["test.falstad.RippleFrame"].dampingBar.setValue (1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.NByNModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$NByNModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "NByNModesSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "NxN Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d;
var e;
var f = 3;
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () >= 70) f++;
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () >= 100) f++;
var g = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / f) - 2;
var h = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / f) - 2;
for (d = 1; d <= f; d++) for (e = 1; e <= f; e++) {
var i = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1 + (g + 1) * (e - 1);
var j = this.b$["test.falstad.RippleFrame"].windowOffsetY + 1 + (h + 1) * (d - 1);
for (a = 0; a != h + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (i + a - 1, j - 1);
this.b$["test.falstad.RippleFrame"].setWall (i + a - 1, j + g);
}
for (b = 0; b != g + 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (i - 1, j + b - 1);
this.b$["test.falstad.RippleFrame"].setWall (i + h, j + b - 1);
}
this.b$["test.falstad.RippleFrame"].setupMode (i, j, h, g, d, e);
}

this.b$["test.falstad.RippleFrame"].dampingBar.setValue (1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.OneByNModeCombosSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$OneByNModeCombosSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "OneByNModeCombosSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "1xN Mode Combos";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 5;
var e = this.b$["test.falstad.RippleFrame"].windowWidth - 2;
while (c + d < this.b$["test.falstad.RippleFrame"].windowHeight) {
var f = this.b$["test.falstad.RippleFrame"].getrand (12) + 1;
var g;
do g = this.b$["test.falstad.RippleFrame"].getrand (12) + 1;
 while (f == g);
var h = c + this.b$["test.falstad.RippleFrame"].windowOffsetY;
var i = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1;
for (a = 0; a != e + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (i + a - 1, h - 1);
this.b$["test.falstad.RippleFrame"].setWall (i + a - 1, h + d);
}
for (b = 0; b != d + 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (i - 1, h + b - 1);
this.b$["test.falstad.RippleFrame"].setWall (i + e, h + b - 1);
}
for (a = 0; a != e; a++) for (b = 0; b != d; b++) {
var j = a + i + this.b$["test.falstad.RippleFrame"].gw * (b + h);
this.b$["test.falstad.RippleFrame"].func[j] = (Math.sin (f * 3.141592653589793 * (a + 1) / (e + 1)) * Math.sin (3.141592653589793 * (b + 1) / (d + 1)) * .5 + Math.sin (g * 3.141592653589793 * (a + 1) / (e + 1)) * Math.sin (3.141592653589793 * (b + 1) / (d + 1)) * .5);
this.b$["test.falstad.RippleFrame"].funci[j] = 0;
}

c += d + 1;
}
this.b$["test.falstad.RippleFrame"].dampingBar.setValue (1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.NByNModeCombosSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$NByNModeCombosSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "NByNModeCombosSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "NxN Mode Combos";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 3;
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () >= 70) d++;
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () >= 100) d++;
var e = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / d) - 2;
var f = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / d) - 2;
var g;
var h;
for (g = 1; g <= d; g++) for (h = 1; h <= d; h++) {
var i = this.b$["test.falstad.RippleFrame"].getrand (4) + 1;
var j = this.b$["test.falstad.RippleFrame"].getrand (4) + 1;
var k;
var l;
do {
k = this.b$["test.falstad.RippleFrame"].getrand (4) + 1;
l = this.b$["test.falstad.RippleFrame"].getrand (4) + 1;
} while (i == k && j == l);
var m = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1 + (e + 1) * (g - 1);
var n = this.b$["test.falstad.RippleFrame"].windowOffsetY + 1 + (f + 1) * (h - 1);
for (a = 0; a != f + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (m + a - 1, n - 1);
this.b$["test.falstad.RippleFrame"].setWall (m + a - 1, n + e);
}
for (b = 0; b != e + 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (m - 1, n + b - 1);
this.b$["test.falstad.RippleFrame"].setWall (m + f, n + b - 1);
}
for (a = 0; a != f; a++) for (b = 0; b != e; b++) {
var o = a + m + this.b$["test.falstad.RippleFrame"].gw * (b + n);
this.b$["test.falstad.RippleFrame"].func[o] = (Math.sin (i * 3.141592653589793 * (a + 1) / (f + 1)) * Math.sin (j * 3.141592653589793 * (b + 1) / (e + 1)) * .5 + Math.sin (k * 3.141592653589793 * (a + 1) / (f + 1)) * Math.sin (l * 3.141592653589793 * (b + 1) / (e + 1)) * .5);
this.b$["test.falstad.RippleFrame"].funci[o] = 0;
}

}

this.b$["test.falstad.RippleFrame"].dampingBar.setValue (1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.ZeroByOneModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ZeroByOneModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ZeroByOneModesSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "0x1 Acoustic Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
this.b$["test.falstad.RippleFrame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 5;
while (c + d < this.b$["test.falstad.RippleFrame"].windowHeight) {
var e = (Clazz.doubleToInt ((c + d) * (this.b$["test.falstad.RippleFrame"].windowWidth - 8) / this.b$["test.falstad.RippleFrame"].windowHeight)) + 6;
var f = c + this.b$["test.falstad.RippleFrame"].windowOffsetY;
var g = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1;
for (a = 0; a != e + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (g + a - 1, f - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + a - 1, f + d);
}
for (b = 0; b != d + 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (g - 1, f + b - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + e, f + b - 1);
}
this.b$["test.falstad.RippleFrame"].setupAcousticMode (g, f, e, d, 1, 0);
c += d + 1;
}
this.b$["test.falstad.RippleFrame"].dampingBar.setValue (1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.ZeroByNModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ZeroByNModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ZeroByNModesSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "0xN Acoustic Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
this.b$["test.falstad.RippleFrame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 5;
var e = this.b$["test.falstad.RippleFrame"].windowWidth - 2;
var f = 1;
while (c + d < this.b$["test.falstad.RippleFrame"].windowHeight) {
var g = c + this.b$["test.falstad.RippleFrame"].windowOffsetY;
var h = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1;
for (a = 0; a != e + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (h + a - 1, g - 1);
this.b$["test.falstad.RippleFrame"].setWall (h + a - 1, g + d);
}
for (b = 0; b != d + 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (h - 1, g + b - 1);
this.b$["test.falstad.RippleFrame"].setWall (h + e, g + b - 1);
}
this.b$["test.falstad.RippleFrame"].setupAcousticMode (h, g, e, d, f, 0);
c += d + 1;
f++;
}
this.b$["test.falstad.RippleFrame"].dampingBar.setValue (1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.NByNAcoModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$NByNAcoModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "NByNAcoModesSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "NxN Acoustic Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
this.b$["test.falstad.RippleFrame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d;
var e;
var f = 2;
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () >= 70) f++;
var g = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / (f + 1)) - 2;
var h = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / (f + 1)) - 2;
for (d = 0; d <= f; d++) for (e = 0; e <= f; e++) {
var i = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1 + (g + 1) * (e);
var j = this.b$["test.falstad.RippleFrame"].windowOffsetY + 1 + (h + 1) * (d);
for (a = 0; a != h + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (i + a - 1, j - 1);
this.b$["test.falstad.RippleFrame"].setWall (i + a - 1, j + g);
}
for (b = 0; b != g + 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (i - 1, j + b - 1);
this.b$["test.falstad.RippleFrame"].setWall (i + h, j + b - 1);
}
this.b$["test.falstad.RippleFrame"].setupAcousticMode (i, j, h, g, d, e);
}

this.b$["test.falstad.RippleFrame"].dampingBar.setValue (1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.CoupledCavitiesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$CoupledCavitiesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "CoupledCavitiesSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Coupled Cavities";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
this.b$["test.falstad.RippleFrame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 5;
while (c + d < this.b$["test.falstad.RippleFrame"].windowHeight) {
var e = 35;
var f = c + this.b$["test.falstad.RippleFrame"].windowOffsetY;
var g = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1;
for (a = 0; a != e + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (g + a - 1, f - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + a - 1, f + d);
}
for (b = 0; b != d + 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (g - 1, f + b - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + e, f + b - 1);
}
for (b = 0; b != 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (g + Clazz.doubleToInt (e / 2), f + b);
this.b$["test.falstad.RippleFrame"].setWall (g + Clazz.doubleToInt (e / 2), f + 4 - b);
}
this.b$["test.falstad.RippleFrame"].setupAcousticMode (g, f, Clazz.doubleToInt (e / 2), d, 1, 0);
c += d + 3;
}
this.b$["test.falstad.RippleFrame"].dampingBar.setValue (1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.BeatsSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$BeatsSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "BeatsSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Beats";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (4);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].auxBar.setValue (24);
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2);
this.b$["test.falstad.RippleFrame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) - 2;
this.b$["test.falstad.RippleFrame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) + 2;
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].setBrightness (25);
this.b$["test.falstad.RippleFrame"].setFreqBar (18);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.SlowMediumSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$SlowMediumSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "SlowMediumSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Slow Medium";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].addMedium ();
this.b$["test.falstad.RippleFrame"].setFreqBar (10);
this.b$["test.falstad.RippleFrame"].setBrightness (33);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.RefractionSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$RefractionSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "RefractionSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Refraction";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (14);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].windowOffsetX;
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 4);
this.b$["test.falstad.RippleFrame"].sources[1].x = this.b$["test.falstad.RippleFrame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 3);
this.b$["test.falstad.RippleFrame"].sources[1].y = this.b$["test.falstad.RippleFrame"].windowOffsetY;
this.b$["test.falstad.RippleFrame"].addMedium ();
this.b$["test.falstad.RippleFrame"].setFreqBar (1);
this.b$["test.falstad.RippleFrame"].setBrightness (33);
});
Clazz.overrideMethod (c$, "select", 
function () {
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.InternalReflectionSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$InternalReflectionSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "InternalReflectionSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Internal Reflection";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (14);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].windowOffsetX;
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight * 2 / 3);
this.b$["test.falstad.RippleFrame"].sources[1].x = this.b$["test.falstad.RippleFrame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 3);
this.b$["test.falstad.RippleFrame"].sources[1].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + this.b$["test.falstad.RippleFrame"].windowHeight - 1;
this.b$["test.falstad.RippleFrame"].addMedium ();
this.b$["test.falstad.RippleFrame"].setFreqBar (1);
this.b$["test.falstad.RippleFrame"].setBrightness (33);
});
Clazz.overrideMethod (c$, "select", 
function () {
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.CoatingSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$CoatingSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "CoatingSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Anti-Reflective Coating";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (1);
this.b$["test.falstad.RippleFrame"].addMedium ();
var a;
var b;
var c = Math.sqrt (0.5);
var d = Math.sqrt (c);
var e = Clazz.doubleToInt ((1 - c) * 191 / 0.5);
for (a = 0; a != this.b$["test.falstad.RippleFrame"].gridSizeX; a++) for (b = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) - 4; b != Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2); b++) this.b$["test.falstad.RippleFrame"].medium[a + b * this.b$["test.falstad.RippleFrame"].gw] = e;


this.b$["test.falstad.RippleFrame"].setFreqBar (6);
this.b$["test.falstad.RippleFrame"].setBrightness (28);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.ZonePlateEvenSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ZonePlateEvenSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.zoneq = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ZonePlateEvenSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.RippleFrame.ZonePlateEvenSetup, []);
this.zoneq = 1;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "Zone Plate (Even)";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
this.b$["test.falstad.RippleFrame"].setSources ();
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () < 42) this.b$["test.falstad.RippleFrame"].setResolution (42);
var a;
var b = 30;
this.b$["test.falstad.RippleFrame"].setFreqBar (b);
var c = 25. / (Clazz.doubleToInt (b * 2 / 5));
var d = this.b$["test.falstad.RippleFrame"].sources[0].y + 1;
var e = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 2) - d;
var f = e * e;
var g = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
for (a = 0; a != this.b$["test.falstad.RippleFrame"].windowWidth; a++) {
var h = this.b$["test.falstad.RippleFrame"].windowOffsetX + a;
var i = g - h;
var j = Math.sqrt (i * i + e * e);
j = (j - e);
var k = Clazz.doubleToInt (j / c);
this.b$["test.falstad.RippleFrame"].setWall (h, d, ((k & 1) == this.zoneq));
this.b$["test.falstad.RippleFrame"].setWall (this.b$["test.falstad.RippleFrame"].windowOffsetX, d);
this.b$["test.falstad.RippleFrame"].setWall (this.b$["test.falstad.RippleFrame"].windowOffsetX + this.b$["test.falstad.RippleFrame"].windowWidth - 1, d);
}
this.b$["test.falstad.RippleFrame"].setBrightness (this.zoneq == 1 ? 4 : 7);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.ZonePlateOddSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ZonePlateOddSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ZonePlateOddSetup", test.falstad.RippleFrame.ZonePlateEvenSetup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.ZonePlateEvenSetup, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.RippleFrame.ZonePlateOddSetup, []);
this.zoneq = 0;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "Zone Plate (Odd)";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.CircleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$CircleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.circle = false;
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "CircleSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.RippleFrame.CircleSetup, []);
this.circle = true;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "Circle";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 2) - 2;
var c = b * b;
var d = c / 2;
if (this.circle) d = c;
var e = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 2) + this.b$["test.falstad.RippleFrame"].windowOffsetX;
var f = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 2) + this.b$["test.falstad.RippleFrame"].windowOffsetY;
var g = -1;
for (a = 0; a <= b; a++) {
var h = Math.sqrt ((1 - a * a / c) * d);
var i = Clazz.doubleToInt (h + 1.5);
if (a == b) i = 0;
if (g == -1) g = i;
for (; g >= i; g--) {
this.b$["test.falstad.RippleFrame"].setWall (e + a, f + g);
this.b$["test.falstad.RippleFrame"].setWall (e - a, f + g);
this.b$["test.falstad.RippleFrame"].setWall (e + a, f - g);
this.b$["test.falstad.RippleFrame"].setWall (e - a, f - g);
}
g = i;
}
var h = Clazz.doubleToInt (Math.sqrt (c - d));
this.b$["test.falstad.RippleFrame"].sourceChooser.select (8);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = e - h;
this.b$["test.falstad.RippleFrame"].sources[0].y = f;
this.b$["test.falstad.RippleFrame"].setFreqBar (1);
this.b$["test.falstad.RippleFrame"].setBrightness (16);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.EllipseSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$EllipseSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "EllipseSetup", test.falstad.RippleFrame.CircleSetup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.CircleSetup, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.RippleFrame.EllipseSetup, []);
this.circle = false;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "Ellipse";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.ResonantCavitiesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ResonantCavitiesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ResonantCavitiesSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Resonant Cavities 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b;
var c = 1;
var d = 5;
var e = this.b$["test.falstad.RippleFrame"].windowOffsetY + 11;
while (c + d < this.b$["test.falstad.RippleFrame"].windowWidth) {
var f = (Clazz.doubleToInt ((c + d) * (this.b$["test.falstad.RippleFrame"].windowHeight - 18) / this.b$["test.falstad.RippleFrame"].windowWidth)) + 6;
var g = c + this.b$["test.falstad.RippleFrame"].windowOffsetX;
for (a = 0; a != f + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (g - 1, e + a - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + d, e + a - 1);
}
for (b = 0; b != d + 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (g + b - 1, e - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + b - 1, e + f);
}
this.b$["test.falstad.RippleFrame"].setWall (g + Clazz.doubleToInt (d / 2), e - 1, false);
c += d + 1;
}
for (; c < this.b$["test.falstad.RippleFrame"].windowWidth; c++) this.b$["test.falstad.RippleFrame"].setWall (c + this.b$["test.falstad.RippleFrame"].windowOffsetX, e - 1);

this.b$["test.falstad.RippleFrame"].setBrightness (30);
this.b$["test.falstad.RippleFrame"].setFreqBar (15);
});
Clazz.overrideMethod (c$, "sourceStrength", 
function () {
return .1;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.ResonantCavities2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ResonantCavities2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ResonantCavities2Setup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Resonant Cavities 2";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b;
var c = 1;
var d = 5;
var e = this.b$["test.falstad.RippleFrame"].windowOffsetY + 11;
var f = 5;
while (c + d < this.b$["test.falstad.RippleFrame"].windowWidth) {
var g = c + this.b$["test.falstad.RippleFrame"].windowOffsetX;
for (a = 0; a != f + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (g - 1, e + a - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + d, e + a - 1);
}
for (b = 0; b != d + 2; b++) this.b$["test.falstad.RippleFrame"].setWall (g + b - 1, e + f);

c += d + 1;
f++;
}
for (; c < this.b$["test.falstad.RippleFrame"].windowWidth; c++) this.b$["test.falstad.RippleFrame"].setWall (c + this.b$["test.falstad.RippleFrame"].windowOffsetX, e - 1);

this.b$["test.falstad.RippleFrame"].setBrightness (30);
this.b$["test.falstad.RippleFrame"].setFreqBar (16);
});
Clazz.overrideMethod (c$, "sourceStrength", 
function () {
return .03;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.RoomResonanceSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$RoomResonanceSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "RoomResonanceSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Room Resonance";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (6);
this.b$["test.falstad.RippleFrame"].setSources ();
var a;
var b;
var c;
var d;
var e = 17;
var f = 17;
for (c = 1; c <= 2; c++) for (d = 1; d <= 2; d++) {
var g = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1 + (e + 1) * (d - 1);
var h = this.b$["test.falstad.RippleFrame"].windowOffsetY + 1 + (f + 1) * (c - 1);
for (a = 0; a != f + 2; a++) {
this.b$["test.falstad.RippleFrame"].setWall (g + a - 1, h - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + a - 1, h + e);
}
for (b = 0; b != e + 2; b++) {
this.b$["test.falstad.RippleFrame"].setWall (g - 1, h + b - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + f, h + b - 1);
}
}

this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].sources[2].x = this.b$["test.falstad.RippleFrame"].windowOffsetX + 2;
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].sources[1].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + 2;
this.b$["test.falstad.RippleFrame"].sources[1].x = this.b$["test.falstad.RippleFrame"].sources[3].x = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1 + f + Clazz.doubleToInt ((f + 1) / 2);
this.b$["test.falstad.RippleFrame"].sources[2].y = this.b$["test.falstad.RippleFrame"].sources[3].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + 1 + e + Clazz.doubleToInt ((e + 1) / 2);
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
this.b$["test.falstad.RippleFrame"].dampingBar.setValue (10);
this.b$["test.falstad.RippleFrame"].setBrightness (3);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.Waveguides1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$Waveguides1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "Waveguides1Setup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Waveguides 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b;
var c = 1;
var d = 3;
var e = this.b$["test.falstad.RippleFrame"].windowOffsetY + 3;
var f = this.b$["test.falstad.RippleFrame"].windowHeight - 2;
while (c + d < this.b$["test.falstad.RippleFrame"].windowWidth) {
var g = c + this.b$["test.falstad.RippleFrame"].windowOffsetX;
for (a = 0; a != f; a++) {
this.b$["test.falstad.RippleFrame"].setWall (g - 1, e + a - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + d, e + a - 1);
}
d++;
c += d;
}
for (; c < this.b$["test.falstad.RippleFrame"].windowWidth; c++) this.b$["test.falstad.RippleFrame"].setWall (c + this.b$["test.falstad.RippleFrame"].windowOffsetX, e - 1);

this.b$["test.falstad.RippleFrame"].setBrightness (6);
this.b$["test.falstad.RippleFrame"].setFreqBar (14);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.Waveguides2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$Waveguides2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "Waveguides2Setup", test.falstad.RippleFrame.Waveguides1Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Waveguides1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Waveguides 2";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.RippleFrame.Waveguides2Setup, "select", []);
this.b$["test.falstad.RippleFrame"].setFreqBar (8);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.Waveguides3Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$Waveguides3Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "Waveguides3Setup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Waveguides 3";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b;
var c = 1;
var d = 8;
var e = this.b$["test.falstad.RippleFrame"].windowOffsetY + 3;
var f = this.b$["test.falstad.RippleFrame"].windowHeight - 2;
for (c = 1; c < this.b$["test.falstad.RippleFrame"].windowWidth; c++) this.b$["test.falstad.RippleFrame"].setWall (c + this.b$["test.falstad.RippleFrame"].windowOffsetX, e - 1);

c = 1;
b = 0;
while (c + d < this.b$["test.falstad.RippleFrame"].windowWidth && b < d) {
var g = c + this.b$["test.falstad.RippleFrame"].windowOffsetX;
for (a = 0; a != f; a++) {
this.b$["test.falstad.RippleFrame"].setWall (g - 1, e + a - 1);
this.b$["test.falstad.RippleFrame"].setWall (g + d, e + a - 1);
}
this.b$["test.falstad.RippleFrame"].setWall (g + b++, e - 1, false);
c += d + 1;
}
this.b$["test.falstad.RippleFrame"].setBrightness (89);
this.b$["test.falstad.RippleFrame"].setFreqBar (16);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.Waveguides4Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$Waveguides4Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "Waveguides4Setup", test.falstad.RippleFrame.Waveguides3Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Waveguides3Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Waveguides 4";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.RippleFrame.Waveguides4Setup, "select", []);
this.b$["test.falstad.RippleFrame"].setBrightness (29);
this.b$["test.falstad.RippleFrame"].setFreqBar (20);
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.Waveguides5Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$Waveguides5Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "Waveguides5Setup", test.falstad.RippleFrame.Waveguides3Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Waveguides3Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Waveguides 5";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b = 1;
var c = 8;
var d = this.b$["test.falstad.RippleFrame"].windowOffsetY + 2;
var e = this.b$["test.falstad.RippleFrame"].windowHeight - 1;
b = 1;
while (b + c < this.b$["test.falstad.RippleFrame"].windowWidth) {
var f = b + this.b$["test.falstad.RippleFrame"].windowOffsetX;
for (a = 0; a != e; a++) {
this.b$["test.falstad.RippleFrame"].setWall (f - 1, d + a - 1);
this.b$["test.falstad.RippleFrame"].setWall (f + c, d + a - 1);
}
b += c + 1;
}
this.b$["test.falstad.RippleFrame"].setBrightness (9);
this.b$["test.falstad.RippleFrame"].setFreqBar (22);
});
Clazz.overrideMethod (c$, "eachFrame", 
function () {
var a = this.b$["test.falstad.RippleFrame"].windowOffsetY + 1;
var b = 8;
var c = 1;
var d = 1;
while (c + b < this.b$["test.falstad.RippleFrame"].windowWidth) {
var e = c + this.b$["test.falstad.RippleFrame"].windowOffsetX;
var f;
var g = 1;
var h = 1;
switch (d) {
case 1:
g = h = 1;
break;
case 2:
g = h = 2;
break;
case 3:
g = 1;
h = 2;
break;
case 4:
g = h = 3;
break;
case 5:
g = 1;
h = 3;
break;
case 6:
g = 2;
h = 3;
break;
default:
g = h = 0;
break;
}
for (f = 0; f != b; f++) this.b$["test.falstad.RippleFrame"].func[e + f + this.b$["test.falstad.RippleFrame"].gw * a] *= .5 * (Math.sin (3.141592653589793 * g * (f + 1) / (b + 1)) + Math.sin (3.141592653589793 * h * (f + 1) / (b + 1)));

c += b + 1;
d++;
}
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.ParabolicMirror1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ParabolicMirror1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ParabolicMirror1Setup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Parabolic Mirror 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () < 50) this.b$["test.falstad.RippleFrame"].setResolution (50);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 2) + this.b$["test.falstad.RippleFrame"].windowOffsetX;
var c = 0;
var d = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 2);
var e = this.b$["test.falstad.RippleFrame"].windowHeight + this.b$["test.falstad.RippleFrame"].windowOffsetY - 2;
var f = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 2) - 2;
var g = f * f * .5 / d;
if (g > 20) g = 20;
for (a = 0; a <= d; a++) {
var h = Math.sqrt (2 * g * a);
var i = Clazz.doubleToInt (h + 1.5);
for (; c <= i; c++) {
this.b$["test.falstad.RippleFrame"].setWall (b - c, e - a);
this.b$["test.falstad.RippleFrame"].setWall (b + c, e - a);
}
c = i;
}
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = b;
this.b$["test.falstad.RippleFrame"].sources[0].y = Clazz.doubleToInt (e - 1 - g / 2);
this.b$["test.falstad.RippleFrame"].setBrightness (18);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.ParabolicMirror2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ParabolicMirror2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ParabolicMirror2Setup", test.falstad.RippleFrame.ParabolicMirror1Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.ParabolicMirror1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Parabolic Mirror 2";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
this.b$["test.falstad.RippleFrame"].brightnessBar.setValue (370);
this.b$["test.falstad.RippleFrame"].setFreqBar (15);
this.b$["test.falstad.RippleFrame"].setSources ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.SoundDuctSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$SoundDuctSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "SoundDuctSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Sound Duct";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (8);
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
var a;
var b = this.b$["test.falstad.RippleFrame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 2);
for (a = 0; a != this.b$["test.falstad.RippleFrame"].windowHeight - 12; a++) {
this.b$["test.falstad.RippleFrame"].setWall (b - 3, a + this.b$["test.falstad.RippleFrame"].windowOffsetY + 6);
this.b$["test.falstad.RippleFrame"].setWall (b + 3, a + this.b$["test.falstad.RippleFrame"].windowOffsetY + 6);
}
this.b$["test.falstad.RippleFrame"].setFreqBar (1);
this.b$["test.falstad.RippleFrame"].setBrightness (60);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.BaffledPistonSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$BaffledPistonSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "BaffledPistonSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Baffled Piston";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
var a;
for (a = 0; a != this.b$["test.falstad.RippleFrame"].gridSizeY; a++) this.b$["test.falstad.RippleFrame"].setWall (this.b$["test.falstad.RippleFrame"].windowOffsetX + 2, a);

for (a = 0; a <= 11; a++) {
this.b$["test.falstad.RippleFrame"].setWall (this.b$["test.falstad.RippleFrame"].windowOffsetX, a + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) - 5);
if (a != 0 && a != 11) this.b$["test.falstad.RippleFrame"].setWall (this.b$["test.falstad.RippleFrame"].windowOffsetX + 2, a + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) - 5, false);
}
this.b$["test.falstad.RippleFrame"].setWall (this.b$["test.falstad.RippleFrame"].windowOffsetX + 1, Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) - 5);
this.b$["test.falstad.RippleFrame"].setWall (this.b$["test.falstad.RippleFrame"].windowOffsetX + 1, Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) + 6);
this.b$["test.falstad.RippleFrame"].setFreqBar (24);
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].sources[1].x = this.b$["test.falstad.RippleFrame"].windowOffsetX + 1;
this.b$["test.falstad.RippleFrame"].sources[0].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) - 4;
this.b$["test.falstad.RippleFrame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) + 5;
this.b$["test.falstad.RippleFrame"].setBrightness (18);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.LowPassFilter1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$LowPassFilter1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "LowPassFilter1Setup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Low-Pass Filter 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () < 43) this.b$["test.falstad.RippleFrame"].setResolution (43);
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
var a;
var b;
for (a = 0; a != this.b$["test.falstad.RippleFrame"].windowWidth; a++) this.b$["test.falstad.RippleFrame"].setWall (a + this.b$["test.falstad.RippleFrame"].windowOffsetX, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9);

var c = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
for (a = 1; a <= 4; a++) for (b = -7; b <= 7; b++) this.b$["test.falstad.RippleFrame"].setWall (c + b, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 * a);


for (a = 0; a <= 4; a++) for (b = -4; b <= 4; b++) this.b$["test.falstad.RippleFrame"].setWall (c + b, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 * a, false);


for (a = 0; a != 27; a++) {
this.b$["test.falstad.RippleFrame"].setWall (c + 7, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 + a);
this.b$["test.falstad.RippleFrame"].setWall (c - 7, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 + a);
}
this.b$["test.falstad.RippleFrame"].setBrightness (38);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.LowPassFilter2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$LowPassFilter2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "LowPassFilter2Setup", test.falstad.RippleFrame.LowPassFilter1Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.LowPassFilter1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Low-Pass Filter 2";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.RippleFrame.LowPassFilter2Setup, "select", []);
this.b$["test.falstad.RippleFrame"].setFreqBar (17);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.HighPassFilter1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$HighPassFilter1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "HighPassFilter1Setup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "High-Pass Filter 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () < 43) this.b$["test.falstad.RippleFrame"].setResolution (43);
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
var a;
var b;
for (a = 0; a != this.b$["test.falstad.RippleFrame"].windowWidth; a++) for (b = 0; b <= 25; b += 5) this.b$["test.falstad.RippleFrame"].setWall (a + this.b$["test.falstad.RippleFrame"].windowOffsetX, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 + b);


var c = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
for (a = 0; a <= 25; a += 5) for (b = -4; b <= 4; b++) this.b$["test.falstad.RippleFrame"].setWall (c + b, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 + a, false);


this.b$["test.falstad.RippleFrame"].setBrightness (62);
this.b$["test.falstad.RippleFrame"].setFreqBar (17);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.HighPassFilter2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$HighPassFilter2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "HighPassFilter2Setup", test.falstad.RippleFrame.HighPassFilter1Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.HighPassFilter1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "High-Pass Filter 2";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.RippleFrame.HighPassFilter2Setup, "select", []);
this.b$["test.falstad.RippleFrame"].setFreqBar (7);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.BandStopFilter1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$BandStopFilter1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "BandStopFilter1Setup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Band-Stop Filter 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () < 43) this.b$["test.falstad.RippleFrame"].setResolution (43);
this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
var a;
var b;
var c;
for (a = 0; a != this.b$["test.falstad.RippleFrame"].windowWidth; a++) this.b$["test.falstad.RippleFrame"].setWall (a + this.b$["test.falstad.RippleFrame"].windowOffsetX, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9);

var d = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
for (a = 1; a <= 2; a++) for (b = -11; b <= 11; b++) {
if (b > -5 && b < 5) continue;
this.b$["test.falstad.RippleFrame"].setWall (d + b, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 + 9 * a);
}

for (a = 0; a <= 1; a++) for (b = -4; b <= 4; b++) this.b$["test.falstad.RippleFrame"].setWall (d + b, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 + a * 26, false);


for (a = 0; a <= 18; a++) {
this.b$["test.falstad.RippleFrame"].setWall (d + 11, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 + a);
this.b$["test.falstad.RippleFrame"].setWall (d - 11, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 + a);
}
for (a = 0; a != 3; a++) for (b = 0; b != 3; b++) for (c = 9; c <= 18; c += 9) {
this.b$["test.falstad.RippleFrame"].setWall (d + 5 + a, this.b$["test.falstad.RippleFrame"].windowOffsetY + c + b);
this.b$["test.falstad.RippleFrame"].setWall (d + 5 + a, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 + c - b);
this.b$["test.falstad.RippleFrame"].setWall (d - 5 - a, this.b$["test.falstad.RippleFrame"].windowOffsetY + c + b);
this.b$["test.falstad.RippleFrame"].setWall (d - 5 - a, this.b$["test.falstad.RippleFrame"].windowOffsetY + 9 + c - b);
}


this.b$["test.falstad.RippleFrame"].setBrightness (38);
this.b$["test.falstad.RippleFrame"].setFreqBar (2);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.BandStopFilter2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$BandStopFilter2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "BandStopFilter2Setup", test.falstad.RippleFrame.BandStopFilter1Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.BandStopFilter1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Band-Stop Filter 2";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.RippleFrame.BandStopFilter2Setup, "select", []);
this.b$["test.falstad.RippleFrame"].setFreqBar (10);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.BandStopFilter3Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$BandStopFilter3Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "BandStopFilter3Setup", test.falstad.RippleFrame.BandStopFilter1Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.BandStopFilter1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Band-Stop Filter 3";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.RippleFrame.BandStopFilter3Setup, "select", []);
this.b$["test.falstad.RippleFrame"].setFreqBar (4);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.PlanarConvexLensSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$PlanarConvexLensSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "PlanarConvexLensSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Planar Convex Lens";
});
Clazz.overrideMethod (c$, "select", 
function () {
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () < 42) this.b$["test.falstad.RippleFrame"].setResolution (42);
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b;
var c = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
var d = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 8) + this.b$["test.falstad.RippleFrame"].windowOffsetY;
var e = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 3) - 2;
var f = 5;
var g = (.75 * this.b$["test.falstad.RippleFrame"].windowHeight) * .5;
var h = g - f;
var i = g * g;
if (e > g) e = Clazz.doubleToInt (g);
for (a = 0; a <= e; a++) {
var j = 2 + Clazz.doubleToInt (Math.sqrt (i - a * a) - h + .5);
for (; j >= 0; j--) {
this.b$["test.falstad.RippleFrame"].setMedium (c + a, d + j, 95);
this.b$["test.falstad.RippleFrame"].setMedium (c - a, d + j, 95);
}
}
this.b$["test.falstad.RippleFrame"].setFreqBar (19);
this.b$["test.falstad.RippleFrame"].setBrightness (6);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.BiconvexLensSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$BiconvexLensSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "BiconvexLensSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Biconvex Lens";
});
Clazz.overrideMethod (c$, "select", 
function () {
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () < 50) this.b$["test.falstad.RippleFrame"].setResolution (50);
this.b$["test.falstad.RippleFrame"].setSources ();
var a;
var b;
var c = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
var d = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2);
var e = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 3) - 2;
var f = 10;
var g = (.75 * .5 * this.b$["test.falstad.RippleFrame"].windowHeight) * .5;
var h = g - f;
var i = g * g;
if (e > g) e = Clazz.doubleToInt (g);
for (a = 0; a <= e; a++) {
var j = 1 + Clazz.doubleToInt (Math.sqrt (i - a * a) - h + .5);
for (; j >= 0; j--) {
this.b$["test.falstad.RippleFrame"].setMedium (c + a, d + j, 95);
this.b$["test.falstad.RippleFrame"].setMedium (c - a, d + j, 95);
this.b$["test.falstad.RippleFrame"].setMedium (c + a, d - j, 95);
this.b$["test.falstad.RippleFrame"].setMedium (c - a, d - j, 95);
}
}
this.b$["test.falstad.RippleFrame"].setFreqBar (19);
this.b$["test.falstad.RippleFrame"].setBrightness (66);
this.b$["test.falstad.RippleFrame"].sources[0].y = d - (2 + 2 * Clazz.doubleToInt (g));
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.PlanarConcaveSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$PlanarConcaveSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "PlanarConcaveSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Planar Concave Lens";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b;
var c = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
var d = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 8) + this.b$["test.falstad.RippleFrame"].windowOffsetY;
var e = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 5);
var f = 5;
var g = (.25 * this.b$["test.falstad.RippleFrame"].windowHeight) * .5;
var h = g - f;
var i = g * g;
if (e > g) e = Clazz.doubleToInt (g);
for (a = 0; a <= e; a++) {
var j = f + 2 - Clazz.doubleToInt (Math.sqrt (i - a * a) - h + .5);
for (; j >= 0; j--) {
this.b$["test.falstad.RippleFrame"].setMedium (c + a, d + j, 95);
this.b$["test.falstad.RippleFrame"].setMedium (c - a, d + j, 95);
}
}
for (a = 0; a != this.b$["test.falstad.RippleFrame"].windowWidth; a++) if (this.b$["test.falstad.RippleFrame"].medium[this.b$["test.falstad.RippleFrame"].windowOffsetX + a + this.b$["test.falstad.RippleFrame"].gw * d] == 0) this.b$["test.falstad.RippleFrame"].setWall (this.b$["test.falstad.RippleFrame"].windowOffsetX + a, d);

this.b$["test.falstad.RippleFrame"].setFreqBar (19);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.CircularPrismSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$CircularPrismSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "CircularPrismSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Circular Prism";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b;
var c = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
var d = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2);
var e = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 3) - 2;
var f = e;
var g = (e * e + f * f) / (2. * f);
var h = g - f;
var i = g * g;
for (a = 0; a < e; a++) {
var j = Clazz.doubleToInt (Math.sqrt (i - a * a) - h + .5);
for (; j >= 0; j--) {
this.b$["test.falstad.RippleFrame"].setMedium (c + a, d + j, 191);
this.b$["test.falstad.RippleFrame"].setMedium (c - a, d + j, 191);
this.b$["test.falstad.RippleFrame"].setMedium (c + a, d - j, 191);
this.b$["test.falstad.RippleFrame"].setMedium (c - a, d - j, 191);
}
}
for (a = 0; a != this.b$["test.falstad.RippleFrame"].windowWidth; a++) if (this.b$["test.falstad.RippleFrame"].medium[this.b$["test.falstad.RippleFrame"].windowOffsetX + a + this.b$["test.falstad.RippleFrame"].gw * d] == 0) this.b$["test.falstad.RippleFrame"].setWall (this.b$["test.falstad.RippleFrame"].windowOffsetX + a, d);

this.b$["test.falstad.RippleFrame"].setFreqBar (9);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.RightAnglePrismSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$RightAnglePrismSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "RightAnglePrismSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Right-Angle Prism";
});
Clazz.overrideMethod (c$, "select", 
function () {
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () < 42) this.b$["test.falstad.RippleFrame"].setResolution (42);
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
var a;
var b;
var c = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
var d = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2);
var e = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 4);
var f = e;
for (a = -e; a < e; a++) for (b = -f; b <= a; b++) this.b$["test.falstad.RippleFrame"].setMedium (c + a, d + b, 191);


for (a = 0; a != this.b$["test.falstad.RippleFrame"].windowWidth; a++) if (this.b$["test.falstad.RippleFrame"].medium[this.b$["test.falstad.RippleFrame"].windowOffsetX + a + this.b$["test.falstad.RippleFrame"].gw * (d - f)] == 0) this.b$["test.falstad.RippleFrame"].setWall (this.b$["test.falstad.RippleFrame"].windowOffsetX + a, d - f);

this.b$["test.falstad.RippleFrame"].setFreqBar (11);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.PorroPrismSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$PorroPrismSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "PorroPrismSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Porro Prism";
});
Clazz.overrideMethod (c$, "select", 
function () {
if (this.b$["test.falstad.RippleFrame"].resBar.getValue () < 42) this.b$["test.falstad.RippleFrame"].setResolution (42);
this.b$["test.falstad.RippleFrame"].sourceChooser.select (10);
this.b$["test.falstad.RippleFrame"].setSources ();
var a;
var b;
var c = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
this.b$["test.falstad.RippleFrame"].sources[1].x = c - 1;
var d = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowWidth / 2);
var e = d;
var f = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2) - Clazz.doubleToInt (e / 2);
for (a = -d; a < d; a++) {
var g = e + 1 - ((a < 0) ? -a : a);
for (b = 0; b <= g; b++) this.b$["test.falstad.RippleFrame"].setMedium (c + a, f + b, 191);

}
for (a = 0; a != f; a++) if (this.b$["test.falstad.RippleFrame"].medium[c + this.b$["test.falstad.RippleFrame"].gw * (a + this.b$["test.falstad.RippleFrame"].windowOffsetY)] == 0) this.b$["test.falstad.RippleFrame"].setWall (c, a + this.b$["test.falstad.RippleFrame"].windowOffsetY);

this.b$["test.falstad.RippleFrame"].setFreqBar (11);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.ScatteringSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$ScatteringSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "ScatteringSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Scattering";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (14);
var a = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2);
this.b$["test.falstad.RippleFrame"].setWall (a, b);
this.b$["test.falstad.RippleFrame"].setFreqBar (1);
this.b$["test.falstad.RippleFrame"].dampingBar.setValue (40);
this.b$["test.falstad.RippleFrame"].setBrightness (52);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.LloydsMirrorSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$LloydsMirrorSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "LloydsMirrorSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Lloyd's Mirror";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].windowOffsetX;
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight * 3 / 4);
this.b$["test.falstad.RippleFrame"].setBrightness (75);
this.b$["test.falstad.RippleFrame"].setFreqBar (23);
var a;
for (a = 0; a != this.b$["test.falstad.RippleFrame"].windowWidth; a++) this.b$["test.falstad.RippleFrame"].setWall (a + this.b$["test.falstad.RippleFrame"].windowOffsetX, this.b$["test.falstad.RippleFrame"].windowOffsetY + this.b$["test.falstad.RippleFrame"].windowHeight - 1);

});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.TempGradient1, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$TempGradient1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "TempGradient1", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Temperature Gradient 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b;
var c = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 2);
var d = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight * 3 / 4);
var e = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight * 7 / 8);
for (b = 0; b != this.b$["test.falstad.RippleFrame"].gridSizeY; b++) {
var f;
if (b < c) f = 0;
 else if (b > d) f = 191;
 else f = Clazz.doubleToInt (191 * (b - c) / (d - c));
for (a = 0; a != this.b$["test.falstad.RippleFrame"].gridSizeX; a++) this.b$["test.falstad.RippleFrame"].setMedium (a, b, f);

}
for (a = e; a < this.b$["test.falstad.RippleFrame"].windowOffsetY + this.b$["test.falstad.RippleFrame"].windowHeight; a++) this.b$["test.falstad.RippleFrame"].setWall (Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2), a);

this.b$["test.falstad.RippleFrame"].setBrightness (33);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].windowOffsetX + 2;
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + this.b$["test.falstad.RippleFrame"].windowHeight - 2;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.TempGradient2, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$TempGradient2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "TempGradient2", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Temperature Gradient 2";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b;
var c = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 2) - Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 8);
var d = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 2) + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 8);
for (b = 0; b != this.b$["test.falstad.RippleFrame"].gridSizeY; b++) {
var e;
if (b < c) e = 191;
 else if (b > d) e = 0;
 else e = Clazz.doubleToInt (191 * (d - b) / (d - c));
for (a = 0; a != this.b$["test.falstad.RippleFrame"].gridSizeX; a++) this.b$["test.falstad.RippleFrame"].setMedium (a, b, e);

}
this.b$["test.falstad.RippleFrame"].setBrightness (31);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].windowOffsetX + 2;
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 4);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.TempGradient3, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$TempGradient3$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "TempGradient3", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Temperature Gradient 3";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b;
var c = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 2) - Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 5);
var d = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 2) + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 5);
var e = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2);
for (b = 0; b != this.b$["test.falstad.RippleFrame"].gridSizeY; b++) {
var f;
if (b < c || b > d) f = 191;
 else if (b > e) f = Clazz.doubleToInt (191 * (b - e) / (d - e));
 else f = Clazz.doubleToInt (191 * (e - b) / (e - c));
for (a = 0; a != this.b$["test.falstad.RippleFrame"].gridSizeX; a++) this.b$["test.falstad.RippleFrame"].setMedium (a, b, f);

}
this.b$["test.falstad.RippleFrame"].setBrightness (31);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = this.b$["test.falstad.RippleFrame"].windowOffsetX + 2;
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 4);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.TempGradient4, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$TempGradient4$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "TempGradient4", test.falstad.RippleFrame.TempGradient3, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.TempGradient3, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Temperature Gradient 4";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b;
var c = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 2) - Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 5);
var d = this.b$["test.falstad.RippleFrame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 2) + Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].windowHeight / 5);
var e = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeY / 2);
for (b = 0; b != this.b$["test.falstad.RippleFrame"].gridSizeY; b++) {
var f;
if (b < c || b > d) f = 0;
 else if (b > e) f = Clazz.doubleToInt (191 * (d - b) / (d - e));
 else f = Clazz.doubleToInt (191 * (b - c) / (e - c));
for (a = 0; a != this.b$["test.falstad.RippleFrame"].gridSizeX; a++) this.b$["test.falstad.RippleFrame"].setMedium (a, b, f);

}
this.b$["test.falstad.RippleFrame"].setBrightness (31);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.RippleFrame.DispersionSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$RippleFrame$DispersionSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.RippleFrame, "DispersionSetup", test.falstad.RippleFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.RippleFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dispersion";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.RippleFrame"].sourceChooser.select (4);
var a;
var b;
for (a = 0; a != this.b$["test.falstad.RippleFrame"].gridSizeY; a++) this.b$["test.falstad.RippleFrame"].setWall (Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2), a);

for (a = 0; a != this.b$["test.falstad.RippleFrame"].gridSizeX; a++) for (b = 0; b != this.b$["test.falstad.RippleFrame"].gridSizeY; b++) this.b$["test.falstad.RippleFrame"].setMedium (a, b, 63);


this.b$["test.falstad.RippleFrame"].fixedEndsCheck.setState (false);
this.b$["test.falstad.RippleFrame"].setBrightness (16);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.RippleFrame"].setSources ();
this.b$["test.falstad.RippleFrame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) - 2;
this.b$["test.falstad.RippleFrame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.RippleFrame"].gridSizeX / 2) + 2;
this.b$["test.falstad.RippleFrame"].sources[0].y = this.b$["test.falstad.RippleFrame"].sources[1].y = this.b$["test.falstad.RippleFrame"].windowOffsetY + 1;
this.b$["test.falstad.RippleFrame"].setFreqBar (7);
this.b$["test.falstad.RippleFrame"].auxBar.setValue (30);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return null;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"sourceRadius", 7,
"freqMult", .0233333,
"pi", 3.14159265358979323846,
"MODE_SETFUNC", 0,
"MODE_WALLS", 1,
"MODE_MEDIUM", 2,
"MODE_FUNCHOLD", 3,
"mediumMax", 191,
"mediumMaxIndex", .5,
"SWF_SIN", 0,
"SWF_SQUARE", 1,
"SWF_PULSE", 2,
"AUX_NONE", 0,
"AUX_PHASE", 1,
"AUX_FREQ", 2,
"AUX_SPEED", 3,
"SRC_NONE", 0,
"SRC_1S1F", 1,
"SRC_2S1F", 3,
"SRC_2S2F", 4,
"SRC_4S1F", 6,
"SRC_1S1F_PULSE", 8,
"SRC_1S1F_MOVING", 9,
"SRC_1S1F_PLANE", 10,
"SRC_2S1F_PLANE", 12,
"SRC_1S1F_PLANE_PULSE", 14,
"SRC_1S1F_PLANE_PHASE", 15,
"SRC_6S1F", 16,
"SRC_8S1F", 17,
"SRC_10S1F", 18,
"SRC_12S1F", 19,
"SRC_16S1F", 20,
"SRC_20S1F", 21);
});
