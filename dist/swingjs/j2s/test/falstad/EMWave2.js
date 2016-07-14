Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.EMWave2", "$.EMWave2Canvas", "$.EMWave2Layout", "$.EMWave2Frame"], ["java.awt.Color", "$.Dimension", "java.awt.image.MemoryImageSource", "java.lang.Double", "java.util.Random", "$.Vector", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "EMWave2Canvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.EMWave2Canvas, []);
this.pg = p;
}, "test.falstad.EMWave2Frame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateEMWave2 (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateEMWave2 (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "EMWave2Layout", null, java.awt.LayoutManager);
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
var insets = target.insets ();
var targetw = target.size ().width - insets.left - insets.right;
var cw = Clazz.doubleToInt (targetw * 2 / 3);
var targeth = target.size ().height - (insets.top + insets.bottom);
target.getComponent (0).move (insets.left, insets.top);
target.getComponent (0).resize (cw, targeth);
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
}m.move (cw, h);
m.resize (d.width, d.height);
h += d.height;
}}
}, "java.awt.Container");
c$ = Clazz.decorateAsClass (function () {
this.started = false;
Clazz.instantialize (this, arguments);
}, test.falstad, "EMWave2", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.EMWave2.ogf != null) test.falstad.EMWave2.ogf.dispose ();
test.falstad.EMWave2.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.EMWave2.ogf =  new test.falstad.EMWave2Frame (null);
test.falstad.EMWave2.ogf.init ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.EMWave2.ogf == null) {
this.started = true;
test.falstad.EMWave2.ogf =  new test.falstad.EMWave2Frame (this);
test.falstad.EMWave2.ogf.init ();
this.repaint ();
}});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.EMWave2.ogf == null) s = "Applet is finished.";
 else if (test.falstad.EMWave2.ogf.useFrame) test.falstad.EMWave2.ogf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.EMWave2, "paint", [g]);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "componentHidden", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentMoved", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentShown", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentResized", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "destroy", 
function () {
if (test.falstad.EMWave2.ogf != null) test.falstad.EMWave2.ogf.dispose ();
test.falstad.EMWave2.ogf = null;
this.repaint ();
});
Clazz.defineStatics (c$,
"ogf", null);
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.gridSizeX = 0;
this.gridSizeY = 0;
this.gridSizeXY = 0;
this.windowWidth = 50;
this.windowHeight = 50;
this.windowOffsetX = 0;
this.windowOffsetY = 0;
this.clearButton = null;
this.ClearAllButton = null;
this.stoppedCheck = null;
this.modeChooser = null;
this.viewChooser = null;
this.sourceChooser = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.speedBar = null;
this.forceBar = null;
this.resBar = null;
this.brightnessBar = null;
this.lineDensityBar = null;
this.auxBar = null;
this.adjustBar = null;
this.auxLabel = null;
this.adjustLabel = null;
this.forceTimeZero = 0;
this.sourceMult = 0;
this.grid = null;
this.gw = 0;
this.sources = null;
this.dragX = 0;
this.dragY = 0;
this.selectedSource = 0;
this.forceBarValue = 0;
this.dragging = false;
this.dragClear = false;
this.dragSet = false;
this.t = 0;
this.pause = 0;
this.imageSource = null;
this.pixels = null;
this.sourceCount = -1;
this.sourcePlane = false;
this.sourceFreqCount = -1;
this.sourceWaveform = 0;
this.auxFunction = 0;
this.adjustSelectX1 = 0;
this.adjustSelectY1 = 0;
this.adjustSelectX2 = 0;
this.adjustSelectY2 = 0;
this.showControls = false;
this.useFrame = false;
this.cv = null;
this.applet = null;
this.useBufferedImage = false;
this.main = null;
this.shown = false;
this.lastTime = 0;
this.linegrid = null;
this.forceMap = null;
this.forceVecs = null;
this.filterCount = 0;
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.OscSource")) {
test.falstad.EMWave2Frame.$EMWave2Frame$OscSource$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.OscElement")) {
test.falstad.EMWave2Frame.$EMWave2Frame$OscElement$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.SingleSourceSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$SingleSourceSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.DoubleSourceSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$DoubleSourceSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.PlaneWaveSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$PlaneWaveSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.IntersectingPlaneWavesSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$IntersectingPlaneWavesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.SingleWireSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$SingleWireSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.DoubleWireSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$DoubleWireSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.DipoleWireSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$DipoleWireSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MagnetPairSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MagnetPairSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MagnetPairOppSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MagnetPairOppSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MagnetPairStackedSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MagnetPairStackedSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MagnetPairStackedOppSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MagnetPairStackedOppSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.UniformFieldSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$UniformFieldSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.ApertureFieldSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$ApertureFieldSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.SolenoidSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$SolenoidSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.ToroidalSolenoidSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$ToroidalSolenoidSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.CylinderSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$CylinderSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.ThickWireSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$ThickWireSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.HoleInWire1Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$HoleInWire1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.HoleInWire2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$HoleInWire2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.FerromagnetSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$FerromagnetSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.DiamagnetSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$DiamagnetSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MeissnerEffectSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MeissnerEffectSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.HorseshoeSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$HorseshoeSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Horseshoe2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Horseshoe2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MagneticShielding1Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MagneticShielding1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MagneticShielding2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MagneticShielding2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MagneticShielding3Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MagneticShielding3Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MagneticShielding4Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MagneticShielding4Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MagneticCircuit1Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MagneticCircuit1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MagneticCircuit2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MagneticCircuit2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MonopoleAttemptSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MonopoleAttemptSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.QuadrupoleLensSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$QuadrupoleLensSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.HalbachArraySetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$HalbachArraySetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.HalbachArray2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$HalbachArray2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.HalbachArray3Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$HalbachArray3Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.HalbachArray4Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$HalbachArray4Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.DielectricSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$DielectricSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.ConductReflectSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$ConductReflectSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Conduct2ReflectSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Conduct2ReflectSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.SkinEffect1Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$SkinEffect1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.SkinEffect2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$SkinEffect2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.ResonantAbsSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$ResonantAbsSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Dispersion1Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Dispersion1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Dispersion2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Dispersion2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Dispersion3Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Dispersion3Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Dispersion4Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Dispersion4Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.DiffusionSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$DiffusionSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.OscRingSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$OscRingSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.OscRingPairSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$OscRingPairSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.OscRingInductionSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$OscRingInductionSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.WireInductionSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$WireInductionSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.OscRingEddy1Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$OscRingEddy1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.OscRingEddy2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$OscRingEddy2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.WireEddy1Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$WireEddy1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.WireEddy2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$WireEddy2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.OscRingPermSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$OscRingPermSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.SolenoidOscSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$SolenoidOscSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.TransformerSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$TransformerSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.ToroidalSolenoidOscSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$ToroidalSolenoidOscSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.CoaxCableSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$CoaxCableSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.CondInOscFieldSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$CondInOscFieldSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MovingWireSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MovingWireSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MovingWireTubeSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MovingWireTubeSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.MovingMagnetSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$MovingMagnetSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.RotatingMagnet1Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$RotatingMagnet1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.RotatingMagnet2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$RotatingMagnet2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Scattering1Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Scattering1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Scattering2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Scattering2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.BigModeSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$BigModeSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.OneByOneModesSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$OneByOneModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.OneByNModesSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$OneByNModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.NByNModesSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$NByNModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.OneByNModeCombosSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$OneByNModeCombosSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.NByNModeCombosSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$NByNModeCombosSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.TriangleModesSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$TriangleModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.CircleModes1Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$CircleModes1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.CircleModes2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$CircleModes2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Waveguides1Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Waveguides1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Waveguides2Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Waveguides2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Waveguides3Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Waveguides3Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.Waveguides4Setup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$Waveguides4Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.ResonantCavitiesSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$ResonantCavitiesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.SingleSlitSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$SingleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.DoubleSlitSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$DoubleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.TripleSlitSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$TripleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.ObstacleSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$ObstacleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.HalfPlaneSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$HalfPlaneSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave2Frame.LloydsMirrorSetup")) {
test.falstad.EMWave2Frame.$EMWave2Frame$LloydsMirrorSetup$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "EMWave2Frame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "EMWave2 by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.EMWave2Frame, ["TM Electrodynamics Applet v1.4b"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.EMWave2");
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
var jv = System.getProperty ("java.class.version");
var jvf =  new Double (jv).doubleValue ();
if (jvf >= 48) this.useBufferedImage = true;
this.setupList =  new java.util.Vector ();
var s = Clazz.innerTypeInstance (test.falstad.EMWave2Frame.SingleSourceSetup, this, null);
var i = 0;
while (s != null) {
this.setupList.addElement (s);
s = s.createNext ();
if (i++ > 300) {
System.out.print ("setup loop?\n");
return;
}}
var os = System.getProperty ("os.name");
this.sources =  new Array (4);
this.main.setLayout ( new test.falstad.EMWave2Layout ());
this.cv =  new test.falstad.EMWave2Canvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.setupChooser =  new swingjs.awt.Choice ();
for (i = 0; i != this.setupList.size (); i++) this.setupChooser.add ("Setup: " + (this.setupList.elementAt (i)).getName ());

this.setup = this.setupList.elementAt (0);
this.setupChooser.addItemListener (this);
this.main.add (this.setupChooser);
this.sourceChooser =  new swingjs.awt.Choice ();
this.sourceChooser.add ("No Sources");
this.sourceChooser.add ("1 Src, 1 Freq");
this.sourceChooser.add ("1 Src, 2 Freq");
this.sourceChooser.add ("2 Src, 1 Freq");
this.sourceChooser.add ("2 Src, 2 Freq");
this.sourceChooser.add ("3 Src, 1 Freq");
this.sourceChooser.add ("4 Src, 1 Freq");
this.sourceChooser.add ("1 Src, 1 Freq (Packet)");
this.sourceChooser.add ("1 Plane Src, 1 Freq");
this.sourceChooser.add ("1 Plane Src, 2 Freq");
this.sourceChooser.add ("2 Plane Src, 1 Freq");
this.sourceChooser.add ("2 Plane Src, 2 Freq");
this.sourceChooser.add ("1 Plane 1 Freq (Packet)");
this.sourceChooser.select (1);
this.sourceChooser.addItemListener (this);
this.main.add (this.sourceChooser);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Add Perf. Conductor");
this.modeChooser.add ("Mouse = Add Good Conductor");
this.modeChooser.add ("Mouse = Add Fair Conductor");
this.modeChooser.add ("Mouse = Add Current (+)");
this.modeChooser.add ("Mouse = Add Current (-)");
this.modeChooser.add ("Mouse = Add Ferromagnet");
this.modeChooser.add ("Mouse = Add Diamagnet");
this.modeChooser.add ("Mouse = Add Dielectric");
this.modeChooser.add ("Mouse = Add Magnet (Down)");
this.modeChooser.add ("Mouse = Add Magnet (Up)");
this.modeChooser.add ("Mouse = Add Magnet (Left)");
this.modeChooser.add ("Mouse = Add Magnet (Right)");
this.modeChooser.add ("Mouse = Add Resonant Medium");
this.modeChooser.add ("Mouse = Clear");
this.modeChooser.add ("Mouse = Adjust Conductivity");
this.modeChooser.add ("Mouse = Adjust Permeability");
this.modeChooser.add ("Mouse = Adjust Current");
this.modeChooser.add ("Mouse = Adjust Dielectric");
this.modeChooser.add ("Mouse = Adjust Mag Dir");
this.modeChooser.add ("Mouse = Adjust Mag Strength");
this.modeChooser.addItemListener (this);
this.main.add (this.modeChooser);
this.viewChooser =  new swingjs.awt.Choice ();
this.viewChooser.add ("Show Electric Field (E)");
this.viewChooser.add ("Show Magnetic Field (B)");
this.viewChooser.add ("Show B Lines");
this.viewChooser.add ("Show B Strength");
this.viewChooser.add ("Show Current (j)");
this.viewChooser.add ("Show E/B");
this.viewChooser.add ("Show E/B lines");
this.viewChooser.add ("Show E/B/j");
this.viewChooser.add ("Show E/B lines/j");
this.viewChooser.add ("Show Mag. Intensity (H)");
this.viewChooser.add ("Show Magnetization (M)");
this.viewChooser.add ("Show Material Type");
this.viewChooser.add ("Show Vec. Potential");
this.viewChooser.add ("Show Poynting Vector");
this.viewChooser.add ("Show Energy Density");
this.viewChooser.add ("Show Poynting/Energy");
this.viewChooser.add ("Show Force");
this.viewChooser.add ("Show Effective Current");
this.viewChooser.add ("Show Magnetic Charge");
this.viewChooser.add ("Show Curl E");
this.viewChooser.add ("Show Bx");
this.viewChooser.add ("Show By");
this.viewChooser.add ("Show Hx");
this.viewChooser.add ("Show Hy");
this.viewChooser.addItemListener (this);
this.main.add (this.viewChooser);
this.viewChooser.select (7);
this.main.add (this.clearButton =  new swingjs.awt.Button ("Clear Fields"));
this.clearButton.addActionListener (this);
this.main.add (this.ClearAllButton =  new swingjs.awt.Button ("Clear All"));
this.ClearAllButton.addActionListener (this);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
this.main.add (this.stoppedCheck);
this.main.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.main.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 180, 1, 1, 2000));
this.speedBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Resolution", 0));
this.main.add (this.resBar =  new swingjs.awt.Scrollbar (0, 40, 5, 16, 140));
this.resBar.addAdjustmentListener (this);
this.setResolution ();
this.main.add ( new swingjs.awt.Label ("Source Frequency", 0));
this.main.add (this.forceBar =  new swingjs.awt.Scrollbar (0, this.forceBarValue = 10, 1, 1, 40));
this.forceBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 10, 1, 1, 2000));
this.brightnessBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Line Density", 0));
this.main.add (this.lineDensityBar =  new swingjs.awt.Scrollbar (0, 50, 1, 10, 100));
this.lineDensityBar.addAdjustmentListener (this);
this.main.add (this.auxLabel =  new swingjs.awt.Label ("", 0));
this.main.add (this.auxBar =  new swingjs.awt.Scrollbar (0, 1, 1, 1, 40));
this.auxBar.addAdjustmentListener (this);
this.main.add (this.adjustLabel =  new swingjs.awt.Label ("", 0));
this.main.add (this.adjustBar =  new swingjs.awt.Scrollbar (0, 50, 1, 0, 102));
this.adjustBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("http://www.falstad.com"));
try {
var param = this.applet.getParameter ("PAUSE");
if (param != null) this.pause = Integer.parseInt (param);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.random =  new java.util.Random ();
this.reinit ();
this.setup = this.setupList.elementAt (0);
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (java.awt.Color.lightGray);
this.setModeChooser ();
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
this.sourceCount = -1;
this.adjustSelectX1 = -1;
this.grid =  new Array (this.gridSizeXY);
var i;
for (i = 0; i != this.gridSizeXY; i++) this.grid[i] = Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscElement, this, null);

this.doSetup ();
});
Clazz.defineMethod (c$, "setDamping", 
function () {
var i;
var j;
for (i = 0; i != this.gridSizeXY; i++) {
this.grid[i].damp = 1;
if (this.grid[i].medium > 0) this.grid[i].damp = .99;
}
for (i = 0; i != this.windowOffsetX; i++) for (j = 0; j != this.gridSizeX; j++) {
var da = Math.exp (-(this.windowOffsetX - i) * .002);
this.grid[i + j * this.gw].damp = this.grid[this.gridSizeX - 1 - i + this.gw * j].damp = this.grid[j + i * this.gw].damp = this.grid[j + this.gw * (this.gridSizeY - 1 - i)].damp = da;
}

});
Clazz.defineMethod (c$, "triggerShow", 
function () {
if (!this.shown) this.setVisible (true);
this.shown = true;
});
Clazz.defineMethod (c$, "handleResize", 
function () {
var d = this.winSize = this.cv.getSize ();
if (this.winSize.width == 0) return;
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
this.pixels =  Clazz.newIntArray (d.width * d.height, 0);
var i;
for (i = 0; i != d.width * d.height; i++) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (d.width, d.height, this.pixels, 0, d.width);
this.imageSource.setAnimated (true);
this.imageSource.setFullBufferUpdates (true);
this.dbimage = this.cv.createImage (this.imageSource);
}});
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.EMWave2Frame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "doClear", 
function () {
var x;
var y;
for (x = 0; x < this.gridSizeXY; x++) {
this.grid[x].az = this.grid[x].dazdt = 1e-10;
this.grid[x].epos = 0;
if (this.grid[x].resonant) this.grid[x].jz = 0;
}
this.t = 0;
this.doFilter ();
});
Clazz.defineMethod (c$, "doClearAll", 
function () {
var x;
var y;
for (x = 0; x < this.gridSizeXY; x++) {
var oe = this.grid[x];
oe.jz = 0;
oe.az = oe.dazdt = 1e-10;
oe.boundary = false;
oe.gray = false;
oe.resonant = false;
oe.conductivity = 0;
oe.perm = 1;
oe.medium = 0;
oe.mx = oe.my = 0;
oe.epos = 0;
}
this.setDamping ();
this.sourceChooser.select (0);
this.setSources ();
});
Clazz.defineMethod (c$, "calcBoundaries", 
function () {
var x;
var y;
var bound = 0;
for (x = 0; x < this.gridSizeX; x++) for (y = 0; y < this.windowOffsetY; y++) {
this.grid[x + this.gw * y].conductivity = this.grid[x + this.gw * this.windowOffsetY].conductivity;
this.grid[x + this.gw * (this.gridSizeY - y - 1)].conductivity = this.grid[x + this.gw * (this.gridSizeY - this.windowOffsetY - 1)].conductivity;
}

for (y = 0; y < this.gridSizeY; y++) for (x = 0; x < this.windowOffsetX; x++) {
this.grid[x + this.gw * y].conductivity = this.grid[this.windowOffsetX + this.gw * y].conductivity;
this.grid[this.gridSizeX - x - 1 + this.gw * y].conductivity = this.grid[this.gridSizeX - this.windowOffsetX - 1 + this.gw * y].conductivity;
}

for (x = 1; x < this.gridSizeX - 1; x++) for (y = 1; y < this.gridSizeY - 1; y++) {
var gi = x + this.gw * y;
var oe = this.grid[gi];
var perm = oe.perm;
var medium = oe.medium;
var mx = oe.mx;
var my = oe.my;
var e1 = this.grid[gi - 1];
var e2 = this.grid[gi + 1];
var e3 = this.grid[gi - this.gw];
var e4 = this.grid[gi + this.gw];
oe.gray = (oe.conductivity > 0 || oe.medium != 0 || oe.perm != 1 || oe.mx != 0 || oe.my != 0 || oe.resonant);
if (e1.perm != perm || e2.perm != perm || e3.perm != perm || e4.perm != perm || e1.medium != medium || e2.medium != medium || e3.medium != medium || e4.medium != medium || e1.mx != mx || e2.mx != mx || e3.mx != mx || e4.mx != mx || e1.my != my || e2.my != my || e3.my != my || e4.my != my || oe.resonant) {
oe.boundary = true;
bound++;
} else oe.boundary = false;
}

});
Clazz.defineMethod (c$, "getPanelHeight", 
function () {
return Clazz.doubleToInt (this.winSize.height / 3);
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
Clazz.defineMethod (c$, "updateEMWave2", 
function (realg) {
if (this.winSize == null || this.winSize.width == 0) {
this.handleResize ();
return;
}var tadd = 0;
if (!this.stoppedCheck.getState ()) {
var val = 5;
tadd = val * .05;
}var i;
var j;
var stopFunc = this.dragging;
if (this.stoppedCheck.getState ()) stopFunc = true;
var speedValue = this.speedBar.getValue () / 2.;
if (stopFunc) this.lastTime = 0;
 else {
if (this.lastTime == 0) this.lastTime = System.currentTimeMillis ();
if (speedValue * (System.currentTimeMillis () - this.lastTime) < 1000) stopFunc = true;
}if (!stopFunc) {
var iter;
var mxx = this.gridSizeX - 1;
var mxy = this.gridSizeY - 1;
for (iter = 1; ; iter++) {
this.doSources (tadd, false);
this.setup.doStep ();
var sinhalfth = 0;
var sinth = 0;
var scaleo = 0;
var tadd2 = tadd;
var forcecoef = 1;
var curMedium = 0;
var oew;
var oee;
var oen;
var oes;
var oe;
var previ;
var nexti;
var prevj;
var nextj;
var basis;
var a;
var b;
System.out.println ("forcecoef " + forcecoef + " tadd2 " + (tadd * tadd));
for (j = 1; j != mxy; j++) {
var gi = j * this.gw + 1;
var giEnd = gi + mxx - 1;
oe = this.grid[gi - 1];
oee = this.grid[gi];
for (; gi != giEnd; gi++) {
oew = oe;
oe = oee;
oee = this.grid[gi + 1];
oen = this.grid[gi - this.gw];
oes = this.grid[gi + this.gw];
if (oe.conductivity > 0) oe.jz = 0;
if (oe.boundary) {
if (oe.resonant) {
oe.jz = oe.jz * .999 + -oe.dazdt * .001 - oe.epos * .02;
oe.epos += oe.jz * .2;
}if (curMedium != oe.medium) {
curMedium = oe.medium;
forcecoef = (1 - (0.002617801047120419) * curMedium);
forcecoef *= forcecoef;
}var az = oe.az;
previ = (oew.az - az) / oew.perm;
nexti = (oee.az - az) / oee.perm;
prevj = (oen.az - az) / oen.perm;
nextj = (oes.az - az) / oes.perm;
basis = (nexti + previ + nextj + prevj) * .25;
var jz = oew.my - oee.my + oes.mx - oen.mx + oe.jz;
a = oe.perm * basis + jz;
} else {
previ = oew.az;
nexti = oee.az;
prevj = oen.az;
nextj = oes.az;
basis = (nexti + previ + nextj + prevj) * .25;
a = oe.jz - (oe.az - basis);
}oe.dazdt = (oe.dazdt * oe.damp) + a * forcecoef;
}
}
tadd2 = tadd * tadd;
for (j = 1; j != mxy; j++) {
var gi = j * this.gw + 1;
var giEnd = gi - 1 + mxx;
for (; gi != giEnd; gi++) {
oe = this.grid[gi];
if (oe.conductivity > 0) {
a = -oe.dazdt * oe.conductivity;
oe.jz = a;
oe.dazdt += a;
}oe.az += oe.dazdt * tadd2;
}
}
this.t += tadd;
this.filterGrid ();
var tm = System.currentTimeMillis ();
if (tm - this.lastTime > 200 || iter * 1000 >= speedValue * (tm - this.lastTime)) {
this.lastTime = tm;
break;
}}
}this.renderGrid ();
var intf = Clazz.doubleToInt ((Clazz.doubleToInt (this.gridSizeY / 2) - this.windowOffsetY) * this.winSize.height / this.windowHeight);
for (i = 0; i < this.sourceCount; i++) {
var src = this.sources[i];
var xx = src.getScreenX ();
var yy = src.getScreenY ();
this.plotSource (i, xx, yy);
}
if (this.adjustSelectX1 != -1) {
var c = this.getrand (255);
var col = 0x010100 * c + 0xFF000000;
var lx1 = (Clazz.doubleToInt (this.adjustSelectX1 * this.winSize.width / this.windowWidth));
var ly1 = (Clazz.doubleToInt (this.adjustSelectY1 * this.winSize.height / this.windowHeight));
var lx2 = (Clazz.doubleToInt ((this.adjustSelectX2 + 1) * this.winSize.width / this.windowWidth));
var ly2 = (Clazz.doubleToInt ((this.adjustSelectY2 + 1) * this.winSize.height / this.windowHeight));
this.plotRect (lx1, ly1, lx2 - 1, ly2 - 1, col);
}if (this.imageSource != null) this.imageSource.newPixels ();
realg.drawImage (this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState ()) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "plotRect", 
function (x1, y1, x2, y2, col) {
var i;
for (i = x1; i <= x2; i++) {
this.plotPixel (i, y1, col);
this.plotPixel (i, y2, col);
}
for (i = y1; i <= y2; i++) {
this.plotPixel (x1, i, col);
this.plotPixel (x2, i, col);
}
}, "~N,~N,~N,~N,~N");
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
var col = (n == this.selectedSource) ? 0xFF00FFFF : 0xFFFFFFFF;
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
Clazz.defineMethod (c$, "renderGrid", 
function () {
var mult = this.brightnessBar.getValue () / 50.0;
var emult = 1;
var ix = 0;
var i;
var j;
var k;
var l;
var viewScalar;
var viewVector;
var viewScalarCond;
var viewVectorCond;
var v = this.viewChooser.getSelectedIndex ();
if (v == 16) this.calcForce ();
var showLines = false;
viewScalar = viewScalarCond = viewVector = viewVectorCond = -1;
switch (v) {
case 0:
case 12:
case 4:
case 20:
case 21:
case 22:
case 23:
case 17:
case 18:
case 11:
case 3:
case 14:
viewScalar = viewScalarCond = v;
break;
case 1:
case 13:
case 9:
case 10:
case 19:
viewVector = viewVectorCond = v;
break;
case 2:
showLines = true;
break;
case 16:
viewScalar = viewScalarCond = 0;
viewVector = viewVectorCond = 16;
break;
case 5:
viewScalar = viewScalarCond = 0;
viewVector = viewVectorCond = 1;
emult = .3;
break;
case 7:
viewScalar = 0;
viewScalarCond = 4;
viewVector = viewVectorCond = 1;
emult = .3;
break;
case 6:
viewScalar = viewScalarCond = 0;
showLines = true;
emult = .3;
break;
case 8:
viewScalar = 0;
viewScalarCond = 4;
showLines = true;
emult = .3;
break;
case 15:
viewScalar = viewScalarCond = 14;
viewVector = viewVectorCond = 13;
break;
}
for (j = 0; j != this.windowHeight; j++) {
ix = this.winSize.width * (Clazz.doubleToInt (j * this.winSize.height / this.windowHeight));
var gi = (j + this.windowOffsetY) * this.gw + this.windowOffsetX;
for (i = 0; i != this.windowWidth; i++, gi++) {
var x = Clazz.doubleToInt (i * this.winSize.width / this.windowWidth);
var y = Clazz.doubleToInt (j * this.winSize.height / this.windowHeight);
var x2 = Clazz.doubleToInt ((i + 1) * this.winSize.width / this.windowWidth);
var y2 = Clazz.doubleToInt ((j + 1) * this.winSize.height / this.windowHeight);
var i2 = i + this.windowOffsetX;
var j2 = j + this.windowOffsetY;
var vs = viewScalar;
var vv = viewVector;
var col_r = 0;
var col_g = 0;
var col_b = 0;
var oe = this.grid[gi];
if (oe.gray || oe.jz != 0) {
col_r = col_g = col_b = 64;
if (oe.conductivity > 0 || (oe.jz != 0 && !oe.resonant)) {
vv = viewVectorCond;
vs = viewScalarCond;
}}if (vs != -1) {
var dy = 0;
switch (vs) {
case 0:
dy = -oe.dazdt * emult;
break;
case 12:
dy = oe.az * .2;
break;
case 4:
dy = oe.jz;
break;
case 20:
dy = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
break;
case 21:
dy = -(this.grid[gi + 1].az - this.grid[gi - 1].az);
break;
case 22:
dy = ((this.grid[gi - this.gw].az - this.grid[gi + this.gw].az) / oe.perm - oe.mx * 12.0);
break;
case 23:
dy = -((this.grid[gi + 1].az - this.grid[gi - 1].az) / oe.perm - oe.my * 12.0);
break;
case 17:
dy = this.getMagY (gi - 1) - this.getMagY (gi + 1) + this.getMagX (gi + this.gw) - this.getMagX (gi - this.gw);
break;
case 18:
dy = this.grid[gi - 1].mx - this.grid[gi + 1].mx + this.grid[gi - this.gw].my - this.grid[gi + this.gw].my;
break;
case 3:
{
var dx = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
dy = this.grid[gi + 1].az - this.grid[gi - 1].az;
dy = Math.sqrt (dx * dx + dy * dy);
break;
}case 14:
{
var n = 1 / (1 - oe.medium * 0.5 / 191);
var dielec = n * n;
var dx = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
dy = this.grid[gi + 1].az - this.grid[gi - 1].az;
dy = .4 * ((dx * dx + dy * dy) / oe.perm + oe.dazdt * oe.dazdt * dielec);
break;
}}
dy *= mult;
if (dy < -1) dy = -1;
if (dy > 1) dy = 1;
if (vs == 11) {
var dr = 0;
var dg = 0;
var db = 0;
if (oe.resonant) {
dr = 1;
dg = .75;
db = .5;
} else if (oe.perm < 1) {
dr = 1 - oe.perm;
} else if (oe.perm > 1) {
dg = (oe.perm - 1) / 30;
} else if (oe.mx != 0 || oe.my != 0) {
dr = .53;
dg = .27;
db = .63;
} else if (oe.medium > 0) {
dr = oe.medium / 191;
dg = dr * .5;
} else if (oe.conductivity > 0) {
dg = db = oe.conductivity;
if (oe.conductivity == 1) dr = 1;
} else if (oe.jz > 0) {
dr = dg = oe.jz * mult;
} else if (oe.jz < 0) {
db = -oe.jz * mult;
}dr = this.clamp (dr);
dg = this.clamp (dg);
db = this.clamp (db);
col_r = col_r + Clazz.doubleToInt (dr * (255 - col_r));
col_g = col_g + Clazz.doubleToInt (dg * (255 - col_g));
col_b = col_b + Clazz.doubleToInt (db * (255 - col_b));
} else if (vs == 4 || vs == 17 || vs == 14) {
if (dy < 0) col_b = col_b + Clazz.doubleToInt (-dy * (255 - col_b));
 else {
col_r = col_r + Clazz.doubleToInt (dy * (255 - col_r));
col_g = col_g + Clazz.doubleToInt (dy * (255 - col_g));
}} else {
if (dy < 0) col_r = col_r + Clazz.doubleToInt (-dy * (255 - col_r));
 else col_g = col_g + Clazz.doubleToInt (dy * (255 - col_g));
}}var col = (-16777216) | (col_r << 16) | (col_g << 8) | col_b;
for (k = 0; k != x2 - x; k++, ix++) for (l = 0; l != y2 - y; l++) this.pixels[ix + l * this.winSize.width] = col;


oe.col = col;
if (vv != -1) {
var dx = 0;
var dy = 0;
switch (vv) {
case 1:
dx = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
dy = this.grid[gi + 1].az - this.grid[gi - 1].az;
break;
case 9:
dx = (this.grid[gi - this.gw].az - this.grid[gi + this.gw].az) / oe.perm - 12.0 * oe.mx;
dy = (this.grid[gi + 1].az - this.grid[gi - 1].az) / oe.perm - 12.0 * oe.my;
break;
case 10:
{
var mm = 1 - 1 / oe.perm;
dx = (this.grid[gi - this.gw].az - this.grid[gi + this.gw].az) * mm + oe.mx;
dy = (this.grid[gi + 1].az - this.grid[gi - 1].az) * mm + oe.my;
}break;
case 13:
dy = 5 * oe.dazdt * (this.grid[gi - this.gw].az - this.grid[gi + this.gw].az) / oe.perm;
dx = -5 * oe.dazdt * (this.grid[gi + 1].az - this.grid[gi - 1].az) / oe.perm;
break;
case 16:
dx = this.forceVecs[this.forceMap[i2][j2]][0];
dy = this.forceVecs[this.forceMap[i2][j2]][1];
break;
case 19:
dx = -5 * (this.grid[gi - this.gw].dazdt - this.grid[gi + this.gw].dazdt);
dy = -5 * (this.grid[gi + 1].dazdt - this.grid[gi - 1].dazdt);
break;
}
var dn = Math.sqrt (dx * dx + dy * dy);
if (dn > 0) {
dx /= dn;
dy /= dn;
}dn *= mult;
if (dn > 1) {
if (dn > 2) dn = 2;
dn -= 1;
col_g = 255;
col_r = col_r + Clazz.doubleToInt (dn * (255 - col_r));
col_b = col_b + Clazz.doubleToInt (dn * (255 - col_b));
} else col_g = col_g + Clazz.doubleToInt (dn * (255 - col_g));
col = (-16777216) | (col_r << 16) | (col_g << 8) | col_b;
var sw2 = Clazz.doubleToInt ((x2 - x) / 2);
var sh2 = Clazz.doubleToInt ((y2 - y) / 2);
var x1 = x + sw2 - Clazz.doubleToInt (sw2 * dx);
var y1 = y + sh2 - Clazz.doubleToInt (sh2 * dy);
x2 = x + sw2 + Clazz.doubleToInt (sw2 * dx);
y2 = y + sh2 + Clazz.doubleToInt (sh2 * dy);
this.drawLine (x1, y1, x2, y2, col);
var as = 3;
this.drawLine (x2, y2, Clazz.doubleToInt (dy * as - dx * as + x2), Clazz.doubleToInt (-dx * as - dy * as + y2), col);
this.drawLine (x2, y2, Clazz.doubleToInt (-dy * as - dx * as + x2), Clazz.doubleToInt (dx * as - dy * as + y2), col);
}}
}
if (showLines) {
this.renderLines ();
this.lineDensityBar.enable ();
} else {
this.lineDensityBar.disable ();
}});
Clazz.defineMethod (c$, "drawLine", 
function (x1, y1, x2, y2, col) {
if (x1 < 0) x1 = 0;
if (y1 < 0) y1 = 0;
if (x2 < 0) x2 = 0;
if (y2 < 0) y2 = 0;
if (x1 >= this.winSize.width - 1) x1 = this.winSize.width - 1;
if (y1 >= this.winSize.height - 1) y1 = this.winSize.height - 1;
if (x2 >= this.winSize.width - 1) x2 = this.winSize.width - 1;
if (y2 >= this.winSize.height - 1) y2 = this.winSize.height - 1;
var dx = this.abs (x2 - x1);
var dy = this.abs (y2 - y1);
if (dx > dy) {
if (x1 > x2) {
var q;
q = x1;
x1 = x2;
x2 = q;
q = y1;
y1 = y2;
y2 = q;
}var x;
for (x = x1; x <= x2; x++) this.pixels[x + (y1 + Clazz.doubleToInt ((y2 - y1) * (x - x1) / dx)) * this.winSize.width] = col;

} else if (dy > 0) {
if (y1 > y2) {
var q;
q = x1;
x1 = x2;
x2 = q;
q = y1;
y1 = y2;
y2 = q;
}var y;
for (y = y1; y <= y2; y++) this.pixels[x1 + Clazz.doubleToInt ((x2 - x1) * (y - y1) / dy) + y * this.winSize.width] = col;

}}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getMagX", 
function (gi) {
var oe = this.grid[gi];
var mm = 1 - 1 / oe.perm;
return (this.grid[gi - this.gw].az - this.grid[gi + this.gw].az) * mm + oe.mx;
}, "~N");
Clazz.defineMethod (c$, "getMagY", 
function (gi) {
var oe = this.grid[gi];
var mm = 1 - 1 / oe.perm;
return (this.grid[gi + 1].az - this.grid[gi - 1].az) * mm + oe.my;
}, "~N");
Clazz.defineMethod (c$, "clamp", 
function (x) {
return (x < 0) ? 0 : (x > 1) ? 1 : x;
}, "~N");
Clazz.defineMethod (c$, "doSources", 
function (tadd, clear) {
var i;
var j;
if (this.sourceCount == 0) return;
var w = this.forceBar.getValue () * (this.t - this.forceTimeZero) * 0.01166665;
var w2 = w;
switch (this.auxFunction) {
case 2:
w2 = this.auxBar.getValue () * this.t * 0.01166665;
break;
case 1:
{
var au = this.auxBar.getValue () - 1;
if (au > 38) au = 38;
w2 = w + au * (0.08267349088394192);
break;
}}
var v = 0;
var v2 = 0;
switch (this.sourceWaveform) {
case 0:
v = Math.sin (w);
if (this.sourceCount >= 2) v2 = Math.sin (w2);
 else if (this.sourceFreqCount == 2) v = (v + Math.sin (w2)) * .5;
break;
case 1:
{
w %= 6.283185307179586;
var adjw = w / (0.01166665 * this.forceBar.getValue ());
adjw -= 10;
v = Math.exp (-0.01 * adjw * adjw) * Math.sin (adjw * .2);
if (adjw < 0) this.doFilter ();
}break;
}
if (clear) v = v2 = 0;
this.sources[0].v = this.sources[2].v = (2 * v * this.sourceMult);
this.sources[1].v = this.sources[3].v = (2 * v2 * this.sourceMult);
if (this.sourcePlane) {
for (j = 0; j != Clazz.doubleToInt (this.sourceCount / 2); j++) {
var src1 = this.sources[j * 2];
var src2 = this.sources[j * 2 + 1];
var src3 = this.sources[j];
this.drawPlaneSource (src1.x, src1.y, src2.x, src2.y, src3.v * .1);
}
} else {
for (i = 0; i != this.sourceCount; i++) {
var src = this.sources[i];
var oe = this.grid[src.x + this.gw * src.y];
oe.jz = src.v;
}
}}, "~N,~B");
Clazz.defineMethod (c$, "abs", 
function (x) {
return x < 0 ? -x : x;
}, "~N");
Clazz.defineMethod (c$, "drawPlaneSource", 
function (x1, y1, x2, y2, v) {
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
this.grid[x1 + this.gw * y1].jz = v;
} else if (this.abs (y2 - y1) > this.abs (x2 - x1)) {
var sgn = this.sign (y2 - y1);
var x;
var y;
for (y = y1; y != y2 + sgn; y += sgn) {
x = x1 + Clazz.doubleToInt ((x2 - x1) * (y - y1) / (y2 - y1));
this.grid[x + this.gw * y].jz = v;
}
} else {
var sgn = this.sign (x2 - x1);
var x;
var y;
for (x = x1; x != x2 + sgn; x += sgn) {
y = y1 + Clazz.doubleToInt ((y2 - y1) * (x - x1) / (x2 - x1));
this.grid[x + this.gw * y].jz = v;
}
}}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "sign", 
function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
}, "~N");
Clazz.defineMethod (c$, "renderLines", 
function () {
var x = 0;
var y = 0;
var lineGridSize = this.lineDensityBar.getValue ();
var lineGridSize2 = lineGridSize * lineGridSize;
if (this.linegrid == null) this.linegrid =  Clazz.newByteArray (lineGridSize2, 0);
var lspacing = lineGridSize / this.windowWidth;
var startx = -1;
var starty = 0;
var linemax = 0;
var mult = this.brightnessBar.getValue () / 50.0;
var doArrow = false;
var dir = 1;
var olddn = -1;
var oldcol = -1;
var gridsearchx = 0;
var gridsearchy = 0;
var i;
var j;
for (i = 0; i != lineGridSize2; i++) this.linegrid[i] = 0;

var oldcgx = -1;
var oldcgy = -1;
while (true) {
if (linemax-- == 0 || x == 0) {
if (dir == 1) {
var gi = gridsearchx + lineGridSize * gridsearchy;
while (true) {
if (this.linegrid[gi] == 0) break;
if (++gridsearchx == lineGridSize) {
if (++gridsearchy == lineGridSize) break;
gridsearchx = 0;
}gi++;
}
if (gridsearchx == lineGridSize && gridsearchy == lineGridSize) break;
startx = gridsearchx / lspacing;
starty = gridsearchy / lspacing;
}x = startx + .48 / lspacing;
y = starty + .48 / lspacing;
linemax = 40;
dir = -dir;
oldcgx = oldcgy = -1;
}if (x < 0 || y < 0 || x >= this.windowWidth || y >= this.windowHeight) {
x = 0;
continue;
}var cgx = Clazz.doubleToInt (x * lspacing);
var cgy = Clazz.doubleToInt (y * lspacing);
doArrow = true;
if (cgx != oldcgx || cgy != oldcgy) {
var lg = ++this.linegrid[cgx + lineGridSize * cgy];
if (lg > 2) {
x = 0;
continue;
}oldcgx = cgx;
oldcgy = cgy;
} else doArrow = false;
var xi = this.windowOffsetX + Clazz.doubleToInt (x);
var yi = this.windowOffsetY + Clazz.doubleToInt (y);
var gi = xi + this.gw * yi;
var oe = this.grid[gi];
var dx = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
var dy = this.grid[gi + 1].az - this.grid[gi - 1].az;
var dn = Math.sqrt (dx * dx + dy * dy);
if (dn == 0) {
x = 0;
continue;
}dx /= dn;
dy /= dn;
var oldx = x;
var oldy = y;
x += .5 * dx * dir;
y += .5 * dy * dir;
dn *= mult;
var col = this.grid[gi].col;
if (dn != olddn || col != oldcol) {
var col_r = (col >> 16) & 255;
var col_g = (col >> 8) & 255;
var col_b = col & 255;
if (dn > 1) {
if (dn > 2) dn = 2;
dn -= 1;
col_g = 255;
col_r = col_r + Clazz.doubleToInt (dn * (255 - col_r));
col_b = col_b + Clazz.doubleToInt (dn * (255 - col_b));
} else col_g = col_g + Clazz.doubleToInt (dn * (255 - col_g));
col = (-16777216) | (col_r << 16) | (col_g << 8) | col_b;
olddn = dn;
oldcol = col;
}var lx1 = Clazz.doubleToInt (oldx * this.winSize.width / this.windowWidth);
var ly1 = Clazz.doubleToInt (oldy * this.winSize.height / this.windowHeight);
var lx2 = Clazz.doubleToInt (x * this.winSize.width / this.windowWidth);
var ly2 = Clazz.doubleToInt (y * this.winSize.height / this.windowHeight);
this.drawLine (lx1, ly1, lx2, ly2, col);
if (doArrow && this.linegrid[cgx + lineGridSize * cgy] == 1) {
if ((cgx & 3) == 0 && (cgy & 3) == 0) {
var as = 5;
this.drawLine (lx2, ly2, Clazz.doubleToInt (dy * as - dx * as + lx2), Clazz.doubleToInt (-dx * as - dy * as + ly2), col);
this.drawLine (lx2, ly2, Clazz.doubleToInt (-dy * as - dx * as + lx2), Clazz.doubleToInt (dx * as - dy * as + ly2), col);
}}}
});
Clazz.defineMethod (c$, "calcForce", 
function () {
var x;
var y;
this.forceMap =  Clazz.newByteArray (this.gridSizeX, this.gridSizeY, 0);
this.forceVecs =  Clazz.newDoubleArray (256, 2, 0);
var magno = 1;
for (x = this.windowOffsetX; x != this.windowWidth + this.windowOffsetX; x++) for (y = this.windowOffsetY; y != this.windowHeight + this.windowOffsetY; y++) {
if (this.forceMap[x][y] != 0 || !this.grid[x + this.gw * y].feelsForce ()) continue;
this.forceVecs[magno][0] = this.forceVecs[magno][1] = 0;
this.forceSearch (x, y, magno++);
}

});
Clazz.defineMethod (c$, "forceSearch", 
function (x, y, magno) {
if (this.forceMap[x][y] != 0) return;
if (x < this.windowOffsetX || y < this.windowOffsetY || x >= this.windowOffsetX + this.windowWidth || y >= this.windowOffsetY + this.windowHeight) return;
var gi = x + y * this.gw;
var mc = this.getMagX (gi - 1) - this.getMagX (gi + 1) + this.getMagY (gi - this.gw) - this.getMagY (gi + this.gw);
var bx = this.grid[gi - this.gw].az - this.grid[gi + this.gw].az;
var by = this.grid[gi + 1].az - this.grid[gi - 1].az;
this.forceVecs[magno][0] += mc * bx + this.grid[gi].jz * by;
this.forceVecs[magno][1] += mc * by - this.grid[gi].jz * bx;
if (this.grid[gi].feelsForce ()) {
this.forceMap[x][y] = magno;
this.forceSearch (x - 1, y, magno);
this.forceSearch (x + 1, y, magno);
this.forceSearch (x, y - 1, magno);
this.forceSearch (x, y + 1, magno);
}}, "~N,~N,~N");
Clazz.defineMethod (c$, "filterGrid", 
function () {
if ((this.filterCount++ & 3) != 0) return;
if (this.filterCount > 200) return;
var mult1 = (this.forceBar.getValue () > 7 && this.sourceCount > 0 && this.sourceWaveform == 0) ? 40 : 8;
var mult2 = 4 + mult1;
var x;
var y;
for (y = 1; y < this.gridSizeY - 1; y++) for (x = 1; x < this.gridSizeX - 1; x++) {
var gi = x + y * this.gw;
var oe = this.grid[gi];
if (oe.jz != 0 || oe.conductivity > 0) continue;
if (oe.perm != this.grid[gi - 1].perm || oe.perm != this.grid[gi + 1].perm || oe.perm != this.grid[gi - this.gw].perm || oe.perm != this.grid[gi + this.gw].perm) continue;
var jz = this.grid[gi - 1].my - this.grid[gi + 1].my + this.grid[gi + this.gw].mx - this.grid[gi - this.gw].mx;
if (jz != 0) continue;
oe.az = (oe.az * mult1 + this.grid[gi - 1].az + this.grid[gi + 1].az + this.grid[gi - this.gw].az + this.grid[gi + this.gw].az) / mult2;
}

});
Clazz.defineMethod (c$, "noFilter", 
function () {
this.filterCount = 200;
});
Clazz.defineMethod (c$, "doFilter", 
function () {
this.filterCount %= 4;
});
Clazz.defineMethod (c$, "edit", 
function (e) {
var x = e.getX ();
var y = e.getY ();
if (this.selectedSource != -1) {
this.doSources (1, true);
x = Clazz.doubleToInt (x * this.windowWidth / this.winSize.width);
y = Clazz.doubleToInt (y * this.windowHeight / this.winSize.height);
var s = this.sources[this.selectedSource];
if (x >= 0 && y >= 0 && x < this.windowWidth && y < this.windowHeight) {
var ox = s.x;
var oy = s.y;
s.x = x + this.windowOffsetX;
s.y = y + this.windowOffsetY;
this.cv.repaint (this.pause);
}return;
}if (this.modeChooser.getSelectedIndex () >= 14) {
var xp = Clazz.doubleToInt (x * this.windowWidth / this.winSize.width);
var yp = Clazz.doubleToInt (y * this.windowHeight / this.winSize.height);
if (this.adjustSelectX1 == -1) {
this.adjustSelectX1 = this.adjustSelectX2 = xp;
this.adjustSelectY1 = this.adjustSelectY2 = yp;
this.adjustBar.enable ();
return;
}this.adjustSelectX1 = this.max (0, this.min (xp, this.adjustSelectX1));
this.adjustSelectX2 = this.min (this.windowWidth - 1, this.max (xp, this.adjustSelectX2));
this.adjustSelectY1 = this.max (0, this.min (yp, this.adjustSelectY1));
this.adjustSelectY2 = this.min (this.windowHeight - 1, this.max (yp, this.adjustSelectY2));
this.adjustBar.enable ();
return;
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
}}this.calcBoundaries ();
this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "min", 
function (a, b) {
return (a < b) ? a : b;
}, "~N,~N");
Clazz.defineMethod (c$, "max", 
function (a, b) {
return (a > b) ? a : b;
}, "~N,~N");
Clazz.defineMethod (c$, "editFuncPoint", 
function (x, y) {
var xp = Clazz.doubleToInt (x * this.windowWidth / this.winSize.width);
var yp = Clazz.doubleToInt (y * this.windowHeight / this.winSize.height);
if (xp < 0 || xp >= this.windowWidth || yp < 0 || yp >= this.windowHeight) return;
xp += this.windowOffsetX;
yp += this.windowOffsetY;
var oe = this.grid[xp + this.gw * yp];
this.doFilter ();
if (!this.dragSet && !this.dragClear) {
this.dragClear = oe.conductivity != 0 || oe.medium != 0 || oe.mx != 0 || oe.my != 0 || oe.perm != 1 || oe.jz != 0 || oe.resonant;
this.dragSet = !this.dragClear;
}oe.conductivity = 0;
oe.medium = 0;
oe.mx = oe.my = 0;
oe.perm = 1;
oe.jz = 0;
oe.resonant = false;
if (this.dragClear) return;
switch (this.modeChooser.getSelectedIndex ()) {
case 3:
oe.jz = 1;
break;
case 4:
oe.jz = -1;
break;
case 5:
this.addPerm (xp, yp, 5);
break;
case 6:
this.addPerm (xp, yp, .5);
break;
case 7:
oe.medium = 191;
break;
case 8:
oe.my = 1;
break;
case 9:
oe.my = -1;
break;
case 10:
oe.mx = -1;
break;
case 11:
oe.mx = 1;
break;
case 0:
this.addConductor (xp, yp, 1);
break;
case 1:
this.addConductor (xp, yp, .9);
break;
case 2:
this.addConductor (xp, yp, .5);
break;
case 12:
oe.resonant = true;
break;
}
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
if (e.getSource () === this.clearButton) {
this.doClear ();
this.cv.repaint ();
}if (e.getSource () === this.ClearAllButton) {
this.doClearAll ();
this.cv.repaint ();
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.resBar) {
this.setResolution ();
this.reinit ();
this.cv.repaint (this.pause);
}if (e.getSource () === this.brightnessBar) this.cv.repaint (this.pause);
if (e.getSource () === this.lineDensityBar) {
this.cv.repaint (this.pause);
this.linegrid = null;
}if (e.getSource () === this.forceBar) this.setForce ();
if (e.getSource () === this.adjustBar) this.doAdjust ();
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "setForceBar", 
function (x) {
this.forceBar.setValue (x);
this.forceBarValue = x;
this.forceTimeZero = 0;
}, "~N");
Clazz.defineMethod (c$, "setForce", 
function () {
var oldfreq = this.forceBarValue * 0.01166665;
this.forceBarValue = this.forceBar.getValue ();
var newfreq = this.forceBarValue * 0.01166665;
var adj = newfreq - oldfreq;
this.forceTimeZero = this.t - oldfreq * (this.t - this.forceTimeZero) / newfreq;
});
Clazz.defineMethod (c$, "setResolution", 
function () {
this.windowWidth = this.windowHeight = this.resBar.getValue ();
this.windowOffsetX = this.windowOffsetY = 20;
this.gridSizeX = this.windowWidth + this.windowOffsetX * 2;
this.gridSizeY = this.windowHeight + this.windowOffsetY * 2;
this.gridSizeXY = this.gridSizeX * this.gridSizeY;
this.gw = this.gridSizeX;
System.out.println ("gridsize " + this.gridSizeX + " window " + this.windowWidth);
this.linegrid = null;
});
Clazz.defineMethod (c$, "setResolution", 
function (x) {
this.resBar.setValue (x);
this.setResolution ();
this.reinit ();
}, "~N");
Clazz.defineMethod (c$, "doAdjust", 
function () {
if (this.adjustSelectX1 == -1) return;
var vali = this.adjustBar.getValue ();
if (vali < 1) vali = 1;
if (vali > 99) vali = 100;
if (this.modeChooser.getSelectedIndex () == 15 && vali < 3) vali = 3;
var val = vali / 100.;
var x;
var y;
for (y = this.adjustSelectY1; y <= this.adjustSelectY2; y++) for (x = this.adjustSelectX1; x <= this.adjustSelectX2; x++) {
var oe = this.grid[x + this.windowOffsetX + this.gw * (y + this.windowOffsetY)];
switch (this.modeChooser.getSelectedIndex ()) {
case 14:
if (oe.getType () == 1) oe.conductivity = val;
break;
case 15:
if (oe.getType () == 3) oe.perm = vali / 2.;
break;
case 16:
if (oe.getType () == 5) oe.jz = (oe.jz < 0) ? -val : val;
break;
case 17:
if (oe.getType () == 6) oe.medium = Clazz.floatToInt (val * 191);
break;
case 18:
if (oe.getType () == 4) {
var m = Math.sqrt (oe.mx * oe.mx + oe.my * oe.my);
oe.mx = (Math.cos (val * 2 * 3.141592653589793) * m);
oe.my = -(Math.sin (val * 2 * 3.141592653589793) * m);
}break;
case 19:
if (oe.getType () == 4) {
var mult = (val / Math.sqrt (oe.mx * oe.mx + oe.my * oe.my));
oe.mx *= mult;
oe.my *= mult;
}break;
}
}

this.calcBoundaries ();
});
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
if (!this.dragging) this.selectSource (e);
this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
if ((e.getModifiers () & 16) != 0) return;
var x = e.getX ();
var y = e.getY ();
this.dragX = x;
this.dragY = y;
this.selectSource (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
this.selectedSource = -1;
this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.adjustSelectX1 = -1;
this.adjustBar.disable ();
var x = e.getX ();
var y = e.getY ();
this.dragX = x;
this.dragY = y;
if (!this.dragging) this.selectSource (e);
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
this.cv.repaint (this.pause);
if (e.getItemSelectable () === this.stoppedCheck) return;
if (e.getItemSelectable () === this.sourceChooser) {
this.setSources ();
this.doFilter ();
}if (e.getItemSelectable () === this.setupChooser) this.doSetup ();
if (e.getItemSelectable () === this.modeChooser) this.setModeChooser ();
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "setModeChooser", 
function () {
if (this.modeChooser.getSelectedIndex () < 14) {
this.adjustLabel.hide ();
this.adjustBar.hide ();
this.validate ();
this.adjustSelectX1 = -1;
return;
}switch (this.modeChooser.getSelectedIndex ()) {
case 14:
this.adjustLabel.setText ("Conductivity");
break;
case 15:
this.adjustLabel.setText ("Permeability");
break;
case 16:
this.adjustLabel.setText ("Current");
break;
case 17:
this.adjustLabel.setText ("Dielectric Constant");
break;
case 18:
this.adjustLabel.setText ("Direction");
break;
case 19:
this.adjustLabel.setText ("Strength");
break;
}
this.adjustLabel.show ();
this.adjustBar.show ();
if (this.adjustSelectX1 == -1) this.adjustBar.disable ();
 else this.adjustBar.enable ();
this.validate ();
});
Clazz.defineMethod (c$, "doSetup", 
function () {
this.t = 0;
this.doClearAll ();
this.sourceCount = -1;
this.filterCount = 0;
this.sourceChooser.select (1);
this.setForceBar (10);
this.brightnessBar.setValue (100);
this.auxBar.setValue (1);
this.setup = this.setupList.elementAt (this.setupChooser.getSelectedIndex ());
this.setup.select ();
this.setup.doSetupSources ();
this.calcBoundaries ();
this.setDamping ();
});
Clazz.defineMethod (c$, "addMedium", 
function () {
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = Clazz.doubleToInt (this.gridSizeY / 2); j != this.gridSizeY; j++) this.grid[i + this.gw * j].medium = 191;


});
Clazz.defineMethod (c$, "addCondMedium", 
function (cv) {
this.conductFillRect (0, Clazz.doubleToInt (this.gridSizeY / 2), this.gridSizeX - 1, this.gridSizeY - 1, cv);
}, "~N");
Clazz.defineMethod (c$, "addResMedium", 
function () {
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = Clazz.doubleToInt (this.gridSizeY / 2); j != this.gridSizeY; j++) this.grid[i + this.gw * j].resonant = true;


});
Clazz.defineMethod (c$, "addUniformField", 
function () {
var v = 2 / this.windowHeight;
var y;
for (y = 0; y != this.gridSizeY; y++) {
this.grid[this.windowOffsetX + this.gw * y].jz = v;
this.grid[this.windowOffsetX + this.windowWidth - 1 + this.gw * y].jz = -v;
}
});
Clazz.defineMethod (c$, "addSolenoid", 
function (x1, y1, x2, y2, v) {
var i;
for (i = y1; i <= y2; i++) {
this.grid[x1 + this.gw * i].jz = v;
this.grid[x2 + this.gw * i].jz = -v;
}
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addMagnet", 
function (x1, y1, x2, y2, v) {
var i;
var j;
for (i = y1; i <= y2; i++) for (j = x1; j <= x2; j++) this.grid[j + this.gw * i].my = v;


}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addMagnet", 
function (x1, y1, x2, y2, vx, vy) {
var i;
var j;
for (i = y1; i <= y2; i++) for (j = x1; j <= x2; j++) {
this.grid[j + this.gw * i].mx = vx;
this.grid[j + this.gw * i].my = vy;
}

}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setSources", 
function () {
if (this.sourceCount > 0) this.doSources (1, true);
this.sourceMult = 1;
var oldSCount = this.sourceCount;
var oldPlane = this.sourcePlane;
this.sourceFreqCount = 1;
this.sourcePlane = (this.sourceChooser.getSelectedIndex () >= 8);
this.sourceWaveform = 0;
this.sourceCount = 1;
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
case 9:
this.sourceFreqCount = 2;
break;
case 10:
this.sourceCount = 2;
break;
case 11:
this.sourceCount = this.sourceFreqCount = 2;
break;
case 12:
this.sourceWaveform = 1;
break;
}
if (this.sourceFreqCount >= 2) {
this.auxFunction = 2;
this.auxBar.setValue (this.forceBar.getValue ());
if (this.sourceCount == 2) this.auxLabel.setText ("Source 2 Frequency");
 else this.auxLabel.setText ("2nd Frequency");
} else if (this.sourceCount == 2 || this.sourceCount == 4) {
this.auxFunction = 1;
this.auxBar.setValue (1);
this.auxLabel.setText ("Phase Difference");
} else {
this.auxFunction = 0;
this.auxBar.hide ();
this.auxLabel.hide ();
}if (this.auxFunction != 0) {
this.auxBar.show ();
this.auxLabel.show ();
}this.validate ();
if (this.sourcePlane) {
this.sourceCount *= 2;
if (!(oldPlane && oldSCount == this.sourceCount)) {
var x2 = this.windowOffsetX + this.windowWidth - 1;
var y2 = this.windowOffsetY + this.windowHeight - 1;
this.sources[0] = Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscSource, this, null, this.windowOffsetX, this.windowOffsetY);
this.sources[1] = Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscSource, this, null, x2, this.windowOffsetY);
this.sources[2] = Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscSource, this, null, this.windowOffsetX, y2);
this.sources[3] = Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscSource, this, null, x2, y2);
}} else if (!(oldSCount == this.sourceCount && !oldPlane)) {
this.sources[0] = Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscSource, this, null, Clazz.doubleToInt (this.gridSizeX / 2), this.windowOffsetY + 1);
this.sources[1] = Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscSource, this, null, Clazz.doubleToInt (this.gridSizeX / 2), this.gridSizeY - this.windowOffsetY - 2);
this.sources[2] = Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscSource, this, null, this.windowOffsetX + 1, Clazz.doubleToInt (this.gridSizeY / 2));
this.sources[3] = Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscSource, this, null, this.gridSizeX - this.windowOffsetX - 2, Clazz.doubleToInt (this.gridSizeY / 2));
}});
Clazz.defineMethod (c$, "setupMode", 
function (x, y, sx, sy, nx, ny) {
var i;
var j;
for (i = 0; i != sx; i++) for (j = 0; j != sy; j++) {
this.grid[i + x + this.gw * (j + y)].az = 2 * (Math.sin (3.141592653589793 * nx * (i + 1) / (sx + 1)) * Math.sin (3.141592653589793 * ny * (j + 1) / (sy + 1)));
this.grid[i + x + this.gw * (j + y)].dazdt = 0;
}

this.noFilter ();
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "zeroj", 
function (m_order, n_zero) {
var beta = (n_zero + 0.5 * m_order - 0.25) * (3.141592654);
var mu = 4 * m_order * m_order;
var beta8 = 8 * beta;
var z = beta - (mu - 1) / beta8 - 4 * (mu - 1) * (7 * mu - 31) / (3 * beta8 * beta8 * beta8);
var jj =  Clazz.newDoubleArray (m_order + 3, 0);
var i;
var deriv;
for (i = 1; i <= 5; i++) {
this.bess (m_order + 1, z, jj);
deriv = -jj[m_order + 2] + m_order / z * jj[m_order + 1];
z -= jj[m_order + 1] / deriv;
}
return (z);
}, "~N,~N");
Clazz.defineMethod (c$, "bess", 
function (m_max, x, jj) {
var maxmx = (m_max > x) ? m_max : (Clazz.doubleToInt (x));
var m_top = 2 * ((Clazz.doubleToInt ((maxmx + 15) / 2) + 1));
var j =  Clazz.newDoubleArray (m_top + 2, 0);
j[m_top + 1] = 0.0;
j[m_top] = 1.0;
var tinyNumber = 1e-16;
var m;
for (m = m_top - 2; m >= 0; m--) j[m + 1] = 2 * (m + 1) / (x + tinyNumber) * j[m + 2] - j[m + 3];

var norm = j[1];
for (m = 2; m <= m_top; m += 2) norm += 2 * j[m + 1];

for (m = 0; m <= m_max; m++) jj[m + 1] = j[m + 1] / norm;

}, "~N,~N,~A");
Clazz.defineMethod (c$, "addThickWire", 
function (cx, cy, r, j) {
var res = 4;
cx *= res;
cy *= res;
r *= res;
j /= (res * res);
var x;
var y;
for (x = -r; x <= r; x++) {
var yd = Clazz.doubleToInt (Math.sqrt (r * r - x * x));
for (y = -yd; y <= yd; y++) this.grid[Clazz.doubleToInt ((x + cx) / res) + this.gw * (Clazz.doubleToInt ((y + cy) / res))].jz += j;

}
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "addWireCircle", 
function (cx, cy, r, j, deg1, deg2) {
var res = 4;
r *= res;
j /= (res * res);
var th;
for (th = deg1; th != deg2; th++) {
var x = cx + Clazz.doubleToInt (Math.cos (th * 3.141592653589793 / 180) * r / res);
var y = cy - Clazz.doubleToInt (Math.sin (th * 3.141592653589793 / 180) * r / res);
this.grid[x + this.gw * y].jz += j;
}
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addConductor", 
function (x, y, cv) {
var oe = this.grid[x + this.gw * y];
oe.conductivity = cv;
if (cv == 1) oe.az = oe.dazdt = 0;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "addPerm", 
function (x, y, pm) {
var oe = this.grid[x + this.gw * y];
oe.perm = pm;
oe.conductivity = (pm == 1) ? 0 : .5;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "conductFillRect", 
function (x, y, x2, y2, cv) {
var i;
var j;
for (i = x; i <= x2; i++) for (j = y; j <= y2; j++) this.addConductor (i, j, cv);


}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "conductDrawRect", 
function (x, y, x2, y2, cvd) {
var i;
var cv = cvd;
for (i = x; i <= x2; i++) {
this.addConductor (i, y, cv);
this.addConductor (i, y2, cv);
}
for (i = y; i <= y2; i++) {
this.addConductor (x, i, cv);
this.addConductor (x2, i, cv);
}
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "permDrawRect", 
function (x, y, x2, y2, pm) {
var i;
for (i = x; i <= x2; i++) {
this.addPerm (i, y, pm);
this.addPerm (i, y2, pm);
}
for (i = y; i <= y2; i++) {
this.addPerm (x, i, pm);
this.addPerm (x2, i, pm);
}
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "permFillRect", 
function (x, y, x2, y2, pm) {
var i;
var j;
for (i = x; i <= x2; i++) for (j = y; j <= y2; j++) this.addPerm (i, j, pm);


}, "~N,~N,~N,~N,~N");
c$.$EMWave2Frame$OscSource$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.x = 0;
this.y = 0;
this.v = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "OscSource");
Clazz.makeConstructor (c$, 
function (a, b) {
this.x = a;
this.y = b;
}, "~N,~N");
Clazz.defineMethod (c$, "getScreenX", 
function () {
return Clazz.doubleToInt (((this.x - this.b$["test.falstad.EMWave2Frame"].windowOffsetX) * this.b$["test.falstad.EMWave2Frame"].winSize.width + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].winSize.width / 2)) / this.b$["test.falstad.EMWave2Frame"].windowWidth);
});
Clazz.defineMethod (c$, "getScreenY", 
function () {
return Clazz.doubleToInt (((this.y - this.b$["test.falstad.EMWave2Frame"].windowOffsetY) * this.b$["test.falstad.EMWave2Frame"].winSize.height + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].winSize.height / 2)) / this.b$["test.falstad.EMWave2Frame"].windowHeight);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$OscElement$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.perm = 0;
this.conductivity = 0;
this.mx = 0;
this.my = 0;
this.jz = 0;
this.epos = 0;
this.damp = 0;
this.az = 0;
this.dazdt = 0;
this.medium = 0;
this.col = 0;
this.boundary = false;
this.gray = false;
this.resonant = false;
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "OscElement");
Clazz.defineMethod (c$, "getType", 
function () {
if (this.perm < 1) return 2;
 else if (this.perm > 1) return 3;
 else if (this.mx != 0 || this.my != 0) return 4;
 else if (this.medium > 0) return 6;
 else if (this.conductivity > 0) return 1;
 else if (this.jz != 0) return 5;
return 0;
});
Clazz.defineMethod (c$, "feelsForce", 
function () {
var a = this.getType ();
return (a != 0 && a != 6);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Setup");
Clazz.defineMethod (c$, "select", 
function () {
});
Clazz.defineMethod (c$, "deselect", 
function () {
});
Clazz.defineMethod (c$, "valueChanged", 
function (a) {
}, "swingjs.awt.Scrollbar");
Clazz.defineMethod (c$, "doStep", 
function () {
});
Clazz.defineMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave2Frame"].setSources ();
});
Clazz.makeConstructor (c$, 
function () {
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$SingleSourceSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "SingleSourceSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Single Source";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].setForceBar (30);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.DoubleSourceSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$DoubleSourceSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "DoubleSourceSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Two Sources";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].setForceBar (30);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (3);
this.b$["test.falstad.EMWave2Frame"].setSources ();
this.b$["test.falstad.EMWave2Frame"].sources[0].y = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 8;
this.b$["test.falstad.EMWave2Frame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 8;
this.b$["test.falstad.EMWave2Frame"].sources[0].x = this.b$["test.falstad.EMWave2Frame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.PlaneWaveSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$PlaneWaveSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "PlaneWaveSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Plane Wave";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (8);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (225);
this.b$["test.falstad.EMWave2Frame"].setForceBar (30);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.IntersectingPlaneWavesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$IntersectingPlaneWavesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "IntersectingPlaneWavesSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Intersecting Planes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (70);
this.b$["test.falstad.EMWave2Frame"].setForceBar (34);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (10);
this.b$["test.falstad.EMWave2Frame"].setSources ();
this.b$["test.falstad.EMWave2Frame"].sources[0].y = this.b$["test.falstad.EMWave2Frame"].sources[1].y = this.b$["test.falstad.EMWave2Frame"].windowOffsetY;
this.b$["test.falstad.EMWave2Frame"].sources[0].x = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 1;
this.b$["test.falstad.EMWave2Frame"].sources[2].x = this.b$["test.falstad.EMWave2Frame"].sources[3].x = this.b$["test.falstad.EMWave2Frame"].windowOffsetX;
this.b$["test.falstad.EMWave2Frame"].sources[2].y = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 1;
this.b$["test.falstad.EMWave2Frame"].sources[3].y = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight - 1;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.SingleWireSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$SingleWireSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "SingleWireSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Single Wire";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2))].jz = 1;
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (200);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.DoubleWireSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$DoubleWireSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "DoubleWireSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Wire Pair";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 3)].jz = 1;
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 3)].jz = 1;
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (200);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.DipoleWireSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$DipoleWireSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "DipoleWireSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dipole Wire Pair";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 3)].jz = 1;
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 3)].jz = -1;
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (200);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MagnetPairSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MagnetPairSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MagnetPairSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Magnet Pair";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].addMagnet (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 4) - 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 4) + 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, -0.2);
this.b$["test.falstad.EMWave2Frame"].addMagnet (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 4) - 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 4) + 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, -0.2);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MagnetPairOppSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MagnetPairOppSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MagnetPairOppSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Magnet Pair, Opp";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].addMagnet (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 4) - 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 4) + 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, -0.2);
this.b$["test.falstad.EMWave2Frame"].addMagnet (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 4) - 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 4) + 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, .2);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MagnetPairStackedSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MagnetPairStackedSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MagnetPairStackedSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Magnet Pair Stacked";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].addMagnet (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 10, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 5, -0.2);
this.b$["test.falstad.EMWave2Frame"].addMagnet (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 5, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 10, -0.2);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MagnetPairStackedOppSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MagnetPairStackedOppSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MagnetPairStackedOppSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Magnet Pair Stacked Opp";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].addMagnet (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 10, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 5, .2);
this.b$["test.falstad.EMWave2Frame"].addMagnet (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 5, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 10, -0.2);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.UniformFieldSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$UniformFieldSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "UniformFieldSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Uniform Field";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].addUniformField ();
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (225);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ApertureFieldSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$ApertureFieldSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "ApertureFieldSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Field Near Aperture";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a = 2 / this.b$["test.falstad.EMWave2Frame"].windowHeight;
var b;
for (b = 0; b != this.b$["test.falstad.EMWave2Frame"].gridSizeY; b++) this.b$["test.falstad.EMWave2Frame"].grid[this.b$["test.falstad.EMWave2Frame"].windowOffsetX + this.b$["test.falstad.EMWave2Frame"].gw * b].jz = a;

var c = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 6);
var d = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 6);
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (c, this.b$["test.falstad.EMWave2Frame"].windowOffsetY, c, this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight - 1, 1);
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (c, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 6, c, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 6, 0);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (740);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.SolenoidSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$SolenoidSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "SolenoidSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Solenoid";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 3);
var b = 2. / a;
var c = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave2Frame"].addSolenoid (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 3, c - a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 3, c + a, b);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ToroidalSolenoidSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$ToroidalSolenoidSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "ToroidalSolenoidSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Toroidal Solenoid";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].addWireCircle (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 3), -0.08333333333333333, 0, 360);
this.b$["test.falstad.EMWave2Frame"].addWireCircle (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 6), 0.08333333333333333, 0, 360);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (400);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.CylinderSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$CylinderSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "CylinderSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Sphere";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a = 4;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) * a;
var c = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) * a;
var d = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 5) * a;
var e = -1.0 / (d * d);
var f;
var g;
for (f = -d; f <= d; f++) {
var h = Clazz.doubleToInt (Math.sqrt (d * d - f * f));
for (g = -h; g <= h; g++) this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt ((f + b) / a) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt ((g + c) / a))].my += e;

}
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (450);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ThickWireSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$ThickWireSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "ThickWireSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Thick Wire";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 4);
this.b$["test.falstad.EMWave2Frame"].addThickWire (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), a, 1. / (a * a));
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.HoleInWire1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$HoleInWire1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "HoleInWire1Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Hole In Wire 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 3);
var b = 1. / (a * a);
b = (Clazz.doubleToInt (b * 1024)) / 1024.;
if (b == 0) b = 9.765625E-4;
this.b$["test.falstad.EMWave2Frame"].addThickWire (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), a, b);
this.b$["test.falstad.EMWave2Frame"].addThickWire (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), Clazz.doubleToInt (a * 2 / 3), -b);
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (450);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.HoleInWire2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$HoleInWire2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "HoleInWire2Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Hole In Wire 2";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 3);
var b = 1. / (a * a);
b = (Clazz.doubleToInt (b * 1024)) / 1024.;
if (b == 0) b = 9.765625E-4;
this.b$["test.falstad.EMWave2Frame"].addThickWire (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), a, b);
this.b$["test.falstad.EMWave2Frame"].addThickWire (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + Clazz.doubleToInt (a / 4), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), Clazz.doubleToInt (a / 2), -b);
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (450);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.FerromagnetSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$FerromagnetSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "FerromagnetSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Ferromagnet";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].addSolenoid (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, .4);
var a = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 3;
var b = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + this.b$["test.falstad.EMWave2Frame"].windowWidth - 4;
this.b$["test.falstad.EMWave2Frame"].permFillRect (a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 4, b, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 8, 5);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (200);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.DiamagnetSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$DiamagnetSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "DiamagnetSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Diamagnet";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].addSolenoid (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, .4);
var a = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 3;
var b = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + this.b$["test.falstad.EMWave2Frame"].windowWidth - 4;
this.b$["test.falstad.EMWave2Frame"].permFillRect (a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 4, b, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 8, .5);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (200);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MeissnerEffectSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MeissnerEffectSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MeissnerEffectSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Meissner Effect";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].addSolenoid (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, .4);
var a = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 3;
var b = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + this.b$["test.falstad.EMWave2Frame"].windowWidth - 4;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 4, b, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 8, 1);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (200);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.HorseshoeSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$HorseshoeSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "HorseshoeSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Horseshoe Magnet";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 3);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 6);
this.b$["test.falstad.EMWave2Frame"].addWireCircle (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), a, -0.08333333333333333, 0, 180);
this.b$["test.falstad.EMWave2Frame"].addWireCircle (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), b, 0.08333333333333333, 0, 180);
var c;
for (c = 0; c != b; c++) {
var d;
for (d = -a; d <= a; d++) this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + d + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + c)].jz = this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + d + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + c - 1)].jz;

}
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (400);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Horseshoe2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Horseshoe2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Horseshoe2Setup", test.falstad.EMWave2Frame.HorseshoeSetup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.HorseshoeSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Horseshoe + Load";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.EMWave2Frame.Horseshoe2Setup, "select", []);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 3);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 6);
this.b$["test.falstad.EMWave2Frame"].permFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - a - 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + b, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + a + 3, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + b * 2, 5);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (225);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MagneticShielding1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MagneticShielding1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MagneticShielding1Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Magnetic Shielding 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b;
this.b$["test.falstad.EMWave2Frame"].addSolenoid (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, .4);
var c = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 3;
var d = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + this.b$["test.falstad.EMWave2Frame"].windowWidth - 4;
this.b$["test.falstad.EMWave2Frame"].permDrawRect (c, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 4, d, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 5, 10);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MagneticShielding2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MagneticShielding2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MagneticShielding2Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Magnetic Shielding 2";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b;
this.b$["test.falstad.EMWave2Frame"].addSolenoid (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, .4);
for (a = 6; a <= 8; a++) this.b$["test.falstad.EMWave2Frame"].permDrawRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + a, 10);

});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MagneticShielding3Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MagneticShielding3Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MagneticShielding3Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Magnetic Shielding 3";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave2Frame"].addSolenoid (a - 1, b - 1, a + 1, b + 1, 4);
var c;
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (340);
for (c = 0; c != 360; c += 3) {
var d = 4.9;
var e = a + Clazz.doubleToInt (Math.cos (c * 3.141592653589793 / 180) * d);
var f = b - Clazz.doubleToInt (Math.sin (c * 3.141592653589793 / 180) * d);
this.b$["test.falstad.EMWave2Frame"].addPerm (e, f, 5);
var g = 5.9;
e = a + Clazz.doubleToInt (Math.cos (c * 3.141592653589793 / 180) * g);
f = b - Clazz.doubleToInt (Math.sin (c * 3.141592653589793 / 180) * g);
this.b$["test.falstad.EMWave2Frame"].addPerm (e, f, 5);
}
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MagneticShielding4Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MagneticShielding4Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MagneticShielding4Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Magnetic Shielding 4";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
for (a = 6; a <= 8; a++) this.b$["test.falstad.EMWave2Frame"].permDrawRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + a, 10);

this.b$["test.falstad.EMWave2Frame"].addUniformField ();
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (250);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MagneticCircuit1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MagneticCircuit1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MagneticCircuit1Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Magnetic Circuit 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
for (a = 6; a <= 9; a++) {
this.b$["test.falstad.EMWave2Frame"].permDrawRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + a, 10);
}
this.b$["test.falstad.EMWave2Frame"].addSolenoid (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 5, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 1, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 10, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 1, .2);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MagneticCircuit2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MagneticCircuit2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MagneticCircuit2Setup", test.falstad.EMWave2Frame.MagneticCircuit1Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MagneticCircuit1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Magnetic Circuit 2";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.EMWave2Frame.MagneticCircuit2Setup, "select", []);
this.b$["test.falstad.EMWave2Frame"].permFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 9, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 1, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 6, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 1, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MonopoleAttemptSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MonopoleAttemptSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MonopoleAttemptSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Monopole Attempt";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 5);
var b;
var c = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
var d = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2);
var e;
for (e = 0; e != 3; e++) {
for (b = -a + 1; b < a; b++) {
this.b$["test.falstad.EMWave2Frame"].grid[c - a + this.b$["test.falstad.EMWave2Frame"].gw * (d + b)].mx = -1;
this.b$["test.falstad.EMWave2Frame"].grid[c + a + this.b$["test.falstad.EMWave2Frame"].gw * (d + b)].mx = 1;
this.b$["test.falstad.EMWave2Frame"].grid[c + b + this.b$["test.falstad.EMWave2Frame"].gw * (d - a)].my = -1;
this.b$["test.falstad.EMWave2Frame"].grid[c + b + this.b$["test.falstad.EMWave2Frame"].gw * (d + a)].my = 1;
}
a++;
}
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.QuadrupoleLensSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$QuadrupoleLensSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "QuadrupoleLensSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Quadrupole Lens";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 1;
var c = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 4);
var d = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
var e = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2);
var f = 1 / c;
for (a = -b; a <= b; a++) {
var g = Clazz.doubleToInt (Math.sqrt (a * a + c * c));
var h;
for (h = g; h <= b; h++) {
this.b$["test.falstad.EMWave2Frame"].grid[d + a + this.b$["test.falstad.EMWave2Frame"].gw * (e + h)].my = -f;
this.b$["test.falstad.EMWave2Frame"].grid[d + a + this.b$["test.falstad.EMWave2Frame"].gw * (e - h)].my = f;
this.b$["test.falstad.EMWave2Frame"].grid[d + h + this.b$["test.falstad.EMWave2Frame"].gw * (e + a)].mx = f;
this.b$["test.falstad.EMWave2Frame"].grid[d - h + this.b$["test.falstad.EMWave2Frame"].gw * (e + a)].mx = -f;
}
}
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.HalbachArraySetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$HalbachArraySetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "HalbachArraySetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Halbach Array";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (80);
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a = 5;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - Clazz.doubleToInt (a / 2);
var c = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + Clazz.doubleToInt (a / 2);
var d = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - Clazz.doubleToInt (a / 2) - 2 * a;
var e = a - 1;
this.b$["test.falstad.EMWave2Frame"].addMagnet (d, b, d + e, c, -0.2, 0);
d += a;
this.b$["test.falstad.EMWave2Frame"].addMagnet (d, b, d + e, c, 0, -0.2);
d += a;
this.b$["test.falstad.EMWave2Frame"].addMagnet (d, b, d + e, c, .2, 0);
d += a;
this.b$["test.falstad.EMWave2Frame"].addMagnet (d, b, d + e, c, 0, .2);
d += a;
this.b$["test.falstad.EMWave2Frame"].addMagnet (d, b, d + e, c, -0.2, 0);
d += a;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.HalbachArray2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$HalbachArray2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "HalbachArray2Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Halbach Array (long)";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (80);
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a = 3;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 1;
var c = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 1;
var d = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + Clazz.doubleToInt ((this.b$["test.falstad.EMWave2Frame"].windowWidth - Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / a) * a) / 2);
var e = a - 1;
var f;
var g = -0.2;
var h = 0;
for (f = 0; f != Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / a); f++) {
this.b$["test.falstad.EMWave2Frame"].addMagnet (d, b, d + e, c, g, h);
d += a;
var i = g;
g = -h;
h = i;
}
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.HalbachArray3Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$HalbachArray3Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "HalbachArray3Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Halbach Array (dipole)";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (47);
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 3);
var c = Clazz.doubleToInt (b / 2);
var d;
var e;
for (d = -b; d <= b; d++) for (e = -b; e <= b; e++) {
var f = Math.sqrt (d * d + e * e);
if (f > b + .9 || f < c) continue;
var g = Math.atan2 (e, d) * 180 / 3.141592653589793 + 22.5 + 45;
if (g < 0) g += 360;
var h = Clazz.doubleToInt (g / 45);
var i = ((h & 2) == 0) ? .2 : -0.2;
var j = 0;
var k = 0;
if ((h & 1) == 0) j = i;
 else k = i;
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + d + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + e)].mx = j;
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + d + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + e)].my = k;
}

});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.HalbachArray4Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$HalbachArray4Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "HalbachArray4Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Halbach Array (quadrupole)";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (255);
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 3);
var c = Clazz.doubleToInt (b * 2 / 3);
var d;
var e;
for (d = -b; d <= b; d++) for (e = -b; e <= b; e++) {
var f = Math.sqrt (d * d + e * e);
if (f > b + .9 || f < c) continue;
var g = Math.atan2 (e, d) * 180 / 3.141592653589793 + 11.25;
if (g < 0) g += 360;
var h = Clazz.doubleToInt (g / 22.5);
var i = -1.5707963267948966 + (4.71238898038469) * h / 4.;
var j = Math.cos (i);
var k = Math.sin (i);
var l = -0.06;
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + d + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + e)].mx = j * l;
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + d + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + e)].my = k * l;
}

});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.DielectricSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$DielectricSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "DielectricSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dielectric";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (7);
this.b$["test.falstad.EMWave2Frame"].addMedium ();
this.b$["test.falstad.EMWave2Frame"].setForceBar (4);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (1000);
this.b$["test.falstad.EMWave2Frame"].noFilter ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ConductReflectSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$ConductReflectSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "ConductReflectSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Fair Conductor Reflection";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (7);
this.b$["test.falstad.EMWave2Frame"].addCondMedium (.5);
this.b$["test.falstad.EMWave2Frame"].setForceBar (4);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (800);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Conduct2ReflectSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Conduct2ReflectSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Conduct2ReflectSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Poor Conductor Reflection";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (7);
this.b$["test.falstad.EMWave2Frame"].addCondMedium (.1);
this.b$["test.falstad.EMWave2Frame"].setForceBar (4);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (800);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.SkinEffect1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$SkinEffect1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "SkinEffect1Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Skin Effect 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (1);
this.b$["test.falstad.EMWave2Frame"].addCondMedium (.33);
this.b$["test.falstad.EMWave2Frame"].setForceBar (6);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (800);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.SkinEffect2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$SkinEffect2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "SkinEffect2Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Skin Effect 2";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (1);
this.b$["test.falstad.EMWave2Frame"].addCondMedium (.33);
this.b$["test.falstad.EMWave2Frame"].setForceBar (40);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (800);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ResonantAbsSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$ResonantAbsSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "ResonantAbsSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Resonant Absorption";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].addResMedium ();
this.b$["test.falstad.EMWave2Frame"].setForceBar (23);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (200);
this.b$["test.falstad.EMWave2Frame"].noFilter ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Dispersion1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Dispersion1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Dispersion1Setup", test.falstad.EMWave2Frame.ResonantAbsSetup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ResonantAbsSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dispersion 1";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.EMWave2Frame.Dispersion1Setup, "select", []);
this.b$["test.falstad.EMWave2Frame"].setForceBar (14);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Dispersion2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Dispersion2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Dispersion2Setup", test.falstad.EMWave2Frame.ResonantAbsSetup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ResonantAbsSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dispersion 2";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.EMWave2Frame.Dispersion2Setup, "select", []);
this.b$["test.falstad.EMWave2Frame"].setForceBar (21);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Dispersion3Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Dispersion3Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Dispersion3Setup", test.falstad.EMWave2Frame.ResonantAbsSetup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ResonantAbsSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dispersion 3";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.EMWave2Frame.Dispersion3Setup, "select", []);
this.b$["test.falstad.EMWave2Frame"].setForceBar (25);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Dispersion4Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Dispersion4Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Dispersion4Setup", test.falstad.EMWave2Frame.ResonantAbsSetup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ResonantAbsSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dispersion 4";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.EMWave2Frame.Dispersion4Setup, "select", []);
this.b$["test.falstad.EMWave2Frame"].setForceBar (39);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.DiffusionSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$DiffusionSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "DiffusionSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Magnetic Diffusion";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (1, 1, this.b$["test.falstad.EMWave2Frame"].gridSizeX - 2, this.b$["test.falstad.EMWave2Frame"].gridSizeY - 2, .2);
this.b$["test.falstad.EMWave2Frame"].addConductor (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), 0);
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2))].jz = 1;
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (800);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscRingSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$OscRingSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "OscRingSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Oscillating Ring";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (3);
this.b$["test.falstad.EMWave2Frame"].setSources ();
this.b$["test.falstad.EMWave2Frame"].sources[0].y = this.b$["test.falstad.EMWave2Frame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave2Frame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 4;
this.b$["test.falstad.EMWave2Frame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 4;
this.b$["test.falstad.EMWave2Frame"].auxBar.setValue (40);
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].setForceBar (26);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (86);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscRingPairSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$OscRingPairSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "OscRingPairSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Oscillating Ring Pair";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (6);
this.b$["test.falstad.EMWave2Frame"].setSources ();
this.b$["test.falstad.EMWave2Frame"].sources[0].y = this.b$["test.falstad.EMWave2Frame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2;
this.b$["test.falstad.EMWave2Frame"].sources[2].y = this.b$["test.falstad.EMWave2Frame"].sources[3].y = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2;
this.b$["test.falstad.EMWave2Frame"].sources[0].x = this.b$["test.falstad.EMWave2Frame"].sources[3].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 2;
this.b$["test.falstad.EMWave2Frame"].sources[1].x = this.b$["test.falstad.EMWave2Frame"].sources[2].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 2;
this.b$["test.falstad.EMWave2Frame"].auxBar.setValue (40);
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].setForceBar (26);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (86);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscRingInductionSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$OscRingInductionSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "OscRingInductionSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Ring Induction";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (3);
this.b$["test.falstad.EMWave2Frame"].setSources ();
this.b$["test.falstad.EMWave2Frame"].sources[0].y = this.b$["test.falstad.EMWave2Frame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2;
this.b$["test.falstad.EMWave2Frame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 4;
this.b$["test.falstad.EMWave2Frame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 4;
this.b$["test.falstad.EMWave2Frame"].auxBar.setValue (40);
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].setForceBar (12);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (140);
this.b$["test.falstad.EMWave2Frame"].addConductor (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 4, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, .5);
this.b$["test.falstad.EMWave2Frame"].addConductor (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 4, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, .5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.WireInductionSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$WireInductionSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "WireInductionSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Wire Induction";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave2Frame"].setForceBar (12);
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (1);
this.b$["test.falstad.EMWave2Frame"].setSources ();
this.b$["test.falstad.EMWave2Frame"].sources[0].y = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 2;
this.b$["test.falstad.EMWave2Frame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (140);
this.b$["test.falstad.EMWave2Frame"].addConductor (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 2, .5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscRingEddy1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$OscRingEddy1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "OscRingEddy1Setup", test.falstad.EMWave2Frame.OscRingSetup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscRingSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Ring + Fair Conductor";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (280);
this.b$["test.falstad.EMWave2Frame"].setForceBar (3);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (0, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 3, this.b$["test.falstad.EMWave2Frame"].gridSizeX - 1, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 5, .5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscRingEddy2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$OscRingEddy2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "OscRingEddy2Setup", test.falstad.EMWave2Frame.OscRingSetup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscRingSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Ring + Poor Conductor";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (280);
this.b$["test.falstad.EMWave2Frame"].setForceBar (3);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (0, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 3, this.b$["test.falstad.EMWave2Frame"].gridSizeX - 1, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 5, .1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.WireEddy1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$WireEddy1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "WireEddy1Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Wire + Fair Conductor";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave2Frame"].setForceBar (3);
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (1);
this.b$["test.falstad.EMWave2Frame"].setSources ();
this.b$["test.falstad.EMWave2Frame"].sources[0].y = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave2Frame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (280);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (0, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 3, this.b$["test.falstad.EMWave2Frame"].gridSizeX - 1, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 5, .5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.WireEddy2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$WireEddy2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "WireEddy2Setup", test.falstad.EMWave2Frame.WireEddy1Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.WireEddy1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Wire + Poor Conductor";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (280);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (0, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 3, this.b$["test.falstad.EMWave2Frame"].gridSizeX - 1, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 5, .1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OscRingPermSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$OscRingPermSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "OscRingPermSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Rings + Ferromagnet";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (3);
this.b$["test.falstad.EMWave2Frame"].setSources ();
this.b$["test.falstad.EMWave2Frame"].sources[0].y = this.b$["test.falstad.EMWave2Frame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave2Frame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 4;
this.b$["test.falstad.EMWave2Frame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 4;
this.b$["test.falstad.EMWave2Frame"].auxBar.setValue (40);
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].setForceBar (6);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (94);
this.b$["test.falstad.EMWave2Frame"].addConductor (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 4, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 10, .5);
this.b$["test.falstad.EMWave2Frame"].addConductor (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 4, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 10, .5);
this.b$["test.falstad.EMWave2Frame"].addConductor (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 4, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 10, .5);
this.b$["test.falstad.EMWave2Frame"].addConductor (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 4, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 10, .5);
this.b$["test.falstad.EMWave2Frame"].permFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 1, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 2, this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight - 1, 50);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 2, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 1, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 2, this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight - 1, .05);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.SolenoidOscSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$SolenoidOscSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "SolenoidOscSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Osc. Solenoid";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (10);
this.b$["test.falstad.EMWave2Frame"].setSources ();
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 3);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave2Frame"].sources[0].x = this.b$["test.falstad.EMWave2Frame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 3;
this.b$["test.falstad.EMWave2Frame"].sources[2].x = this.b$["test.falstad.EMWave2Frame"].sources[3].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 3;
this.b$["test.falstad.EMWave2Frame"].sources[0].y = this.b$["test.falstad.EMWave2Frame"].sources[2].y = b - a;
this.b$["test.falstad.EMWave2Frame"].sources[1].y = this.b$["test.falstad.EMWave2Frame"].sources[3].y = b + a;
this.b$["test.falstad.EMWave2Frame"].auxBar.setValue (40);
this.b$["test.falstad.EMWave2Frame"].setForceBar (9);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.TransformerSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$TransformerSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "TransformerSetup", test.falstad.EMWave2Frame.SolenoidOscSetup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.SolenoidOscSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Transformer";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.EMWave2Frame.TransformerSetup, "select", []);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 3);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 5, b - a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 5, b + a, .9);
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 5, b - a, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 5, b + a, .9);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (340);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ToroidalSolenoidOscSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$ToroidalSolenoidOscSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "ToroidalSolenoidOscSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Osc Toroidal Solenoid";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].setSources ();
this.b$["test.falstad.EMWave2Frame"].sources[0].x = this.b$["test.falstad.EMWave2Frame"].windowOffsetX;
this.b$["test.falstad.EMWave2Frame"].sources[0].y = this.b$["test.falstad.EMWave2Frame"].windowOffsetY;
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (300);
this.b$["test.falstad.EMWave2Frame"].setForceBar (8);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var a = this.b$["test.falstad.EMWave2Frame"].grid[this.b$["test.falstad.EMWave2Frame"].windowOffsetX + this.b$["test.falstad.EMWave2Frame"].gw * this.b$["test.falstad.EMWave2Frame"].windowOffsetY].jz * 30;
var b;
var c;
for (b = 0; b != this.b$["test.falstad.EMWave2Frame"].windowWidth; b++) for (c = 0; c != this.b$["test.falstad.EMWave2Frame"].windowHeight; c++) this.b$["test.falstad.EMWave2Frame"].grid[b + this.b$["test.falstad.EMWave2Frame"].windowOffsetX + this.b$["test.falstad.EMWave2Frame"].gw * (c + this.b$["test.falstad.EMWave2Frame"].windowOffsetY)].jz = 0;


this.b$["test.falstad.EMWave2Frame"].addWireCircle (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 3), -a / 360., 0, 360);
this.b$["test.falstad.EMWave2Frame"].addWireCircle (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 6), a / 360., 0, 360);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.CoaxCableSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$CoaxCableSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "CoaxCableSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Coaxial Cable";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].setSources ();
this.b$["test.falstad.EMWave2Frame"].sources[0].x = this.b$["test.falstad.EMWave2Frame"].windowOffsetX;
this.b$["test.falstad.EMWave2Frame"].sources[0].y = this.b$["test.falstad.EMWave2Frame"].windowOffsetY;
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (300);
this.b$["test.falstad.EMWave2Frame"].setForceBar (8);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var a = this.b$["test.falstad.EMWave2Frame"].grid[this.b$["test.falstad.EMWave2Frame"].windowOffsetX + this.b$["test.falstad.EMWave2Frame"].gw * this.b$["test.falstad.EMWave2Frame"].windowOffsetY].jz * 30;
var b;
var c;
for (b = 0; b != this.b$["test.falstad.EMWave2Frame"].windowWidth; b++) for (c = 0; c != this.b$["test.falstad.EMWave2Frame"].windowHeight; c++) this.b$["test.falstad.EMWave2Frame"].grid[b + this.b$["test.falstad.EMWave2Frame"].windowOffsetX + this.b$["test.falstad.EMWave2Frame"].gw * (c + this.b$["test.falstad.EMWave2Frame"].windowOffsetY)].jz = 0;


var d = 3;
this.b$["test.falstad.EMWave2Frame"].addWireCircle (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2), d, -a / 360., 0, 360);
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2))].jz = a / 16;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.CondInOscFieldSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$CondInOscFieldSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "CondInOscFieldSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Cond. in Osc. Field";
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (10);
this.b$["test.falstad.EMWave2Frame"].setSources ();
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 3);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave2Frame"].sources[0].x = this.b$["test.falstad.EMWave2Frame"].sources[1].x = this.b$["test.falstad.EMWave2Frame"].windowOffsetX;
this.b$["test.falstad.EMWave2Frame"].sources[2].x = this.b$["test.falstad.EMWave2Frame"].sources[3].x = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + this.b$["test.falstad.EMWave2Frame"].windowWidth - 1;
this.b$["test.falstad.EMWave2Frame"].sources[0].y = this.b$["test.falstad.EMWave2Frame"].sources[2].y = 0;
this.b$["test.falstad.EMWave2Frame"].sources[1].y = this.b$["test.falstad.EMWave2Frame"].sources[3].y = this.b$["test.falstad.EMWave2Frame"].gridSizeY - 1;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 4, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 4, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 4, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 4, .4);
this.b$["test.falstad.EMWave2Frame"].setForceBar (2);
this.b$["test.falstad.EMWave2Frame"].auxBar.setValue (40);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MovingWireSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MovingWireSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.y = 0;
this.dir = 0;
this.delay = 0;
this.stopDelay = 0;
this.filtstep = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MovingWireSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Moving Wire";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.y = this.b$["test.falstad.EMWave2Frame"].windowOffsetY;
this.dir = 1;
this.delay = 0;
this.stopDelay = 200;
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (200);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
if (this.delay > 0) {
this.delay--;
this.filt ();
return;
}var a = Clazz.doubleToInt (this.y);
var b;
for (b = 0; b != 2; b++) {
var c = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + b + this.b$["test.falstad.EMWave2Frame"].gw * a;
this.b$["test.falstad.EMWave2Frame"].grid[c].jz = 0;
this.b$["test.falstad.EMWave2Frame"].grid[c + this.b$["test.falstad.EMWave2Frame"].gw].jz = 0;
this.b$["test.falstad.EMWave2Frame"].grid[c + this.b$["test.falstad.EMWave2Frame"].gw + this.b$["test.falstad.EMWave2Frame"].gw].jz = 0;
}
this.y += this.dir * .06;
var c = Clazz.doubleToInt (this.y);
if (a != c) {
if (c == Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2)) this.delay = this.stopDelay;
if (c == this.b$["test.falstad.EMWave2Frame"].windowOffsetY || c == this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight - 3) {
this.dir = -this.dir;
this.delay = this.stopDelay;
}}a = c;
var d = (this.y - a);
for (b = 0; b != 2; b++) {
var e = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + b + this.b$["test.falstad.EMWave2Frame"].gw * a;
this.b$["test.falstad.EMWave2Frame"].grid[e].jz = (1 - d) * .25;
this.b$["test.falstad.EMWave2Frame"].grid[e + this.b$["test.falstad.EMWave2Frame"].gw].jz = .25;
this.b$["test.falstad.EMWave2Frame"].grid[e + this.b$["test.falstad.EMWave2Frame"].gw + this.b$["test.falstad.EMWave2Frame"].gw].jz = d * .25;
}
this.filt ();
this.b$["test.falstad.EMWave2Frame"].calcBoundaries ();
});
Clazz.defineMethod (c$, "filt", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.y);
var c;
var d;
var e = 10;
for (d = b - e; d <= b + e; d++) for (c = a - e; c <= a + e; c++) {
var f = c + d * this.b$["test.falstad.EMWave2Frame"].gw;
var g = this.b$["test.falstad.EMWave2Frame"].grid[f];
if (g.jz != 0 || g.conductivity > 0) continue;
var h = Math.sqrt ((d - b) * (d - b) + (c - a) * (c - a));
var i = 8 + h;
var j = 4 + i;
g.az = (g.az * i + this.b$["test.falstad.EMWave2Frame"].grid[f - 1].az + this.b$["test.falstad.EMWave2Frame"].grid[f + 1].az + this.b$["test.falstad.EMWave2Frame"].grid[f - this.b$["test.falstad.EMWave2Frame"].gw].az + this.b$["test.falstad.EMWave2Frame"].grid[f + this.b$["test.falstad.EMWave2Frame"].gw].az) / j;
}

});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MovingWireTubeSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MovingWireTubeSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MovingWireTubeSetup", test.falstad.EMWave2Frame.MovingWireSetup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MovingWireSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Moving Wire in Tube";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.EMWave2Frame.MovingWireTubeSetup, "select", []);
var a = 4;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - a, this.b$["test.falstad.EMWave2Frame"].windowOffsetY, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - a, this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight, .6);
a++;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + a, this.b$["test.falstad.EMWave2Frame"].windowOffsetY, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + a, this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight, .6);
this.stopDelay = 500;
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (500);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.MovingMagnetSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$MovingMagnetSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.y = 0;
this.dir = 0;
this.delay = 0;
this.filtstep = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "MovingMagnetSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Moving Magnet in Tube";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a = 5;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - a, this.b$["test.falstad.EMWave2Frame"].windowOffsetY, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - a, this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight, .6);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + a, this.b$["test.falstad.EMWave2Frame"].windowOffsetY, Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + a, this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight, .6);
this.y = this.b$["test.falstad.EMWave2Frame"].windowOffsetY;
this.dir = 1;
this.delay = 0;
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (250);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
if (this.delay > 0) {
this.delay--;
this.filt ();
return;
}var a = Clazz.doubleToInt (this.y);
var b;
var c;
for (b = -3; b <= 3; b++) {
for (c = 0; c <= 2; c++) this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + b + this.b$["test.falstad.EMWave2Frame"].gw * (a + c)].my = 0;

}
this.y += this.dir * .06;
var d = Clazz.doubleToInt (this.y);
if (a != d) {
if (d == Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2)) this.delay = 500;
if (d == this.b$["test.falstad.EMWave2Frame"].windowOffsetY || d == this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight - 3) {
this.dir = -this.dir;
this.delay = 500;
}}a = d;
var e = (this.y - a);
for (b = -3; b <= 3; b++) {
var f = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + b + this.b$["test.falstad.EMWave2Frame"].gw * a;
this.b$["test.falstad.EMWave2Frame"].grid[f].my = -(1 - e);
this.b$["test.falstad.EMWave2Frame"].grid[f + this.b$["test.falstad.EMWave2Frame"].gw].my = -1;
this.b$["test.falstad.EMWave2Frame"].grid[f + this.b$["test.falstad.EMWave2Frame"].gw + this.b$["test.falstad.EMWave2Frame"].gw].my = -e;
}
this.b$["test.falstad.EMWave2Frame"].calcBoundaries ();
this.filt ();
});
Clazz.defineMethod (c$, "filt", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.y);
var c;
var d;
var e = 12;
var f = 8;
var g = 4 + f;
for (d = b - e; d <= b + e; d++) for (c = a - e; c <= a + e; c++) {
var h = c + this.b$["test.falstad.EMWave2Frame"].gw * d;
var i = this.b$["test.falstad.EMWave2Frame"].grid[h];
if (i.jz != 0 || i.conductivity > 0) continue;
var j = this.b$["test.falstad.EMWave2Frame"].grid[h - 1].my - this.b$["test.falstad.EMWave2Frame"].grid[h + 1].my + this.b$["test.falstad.EMWave2Frame"].grid[h + this.b$["test.falstad.EMWave2Frame"].gw].mx - this.b$["test.falstad.EMWave2Frame"].grid[h - this.b$["test.falstad.EMWave2Frame"].gw].mx;
if (j != 0) continue;
i.az = (i.az * f + this.b$["test.falstad.EMWave2Frame"].grid[h - 1].az + this.b$["test.falstad.EMWave2Frame"].grid[h + 1].az + this.b$["test.falstad.EMWave2Frame"].grid[h - this.b$["test.falstad.EMWave2Frame"].gw].az + this.b$["test.falstad.EMWave2Frame"].grid[h + this.b$["test.falstad.EMWave2Frame"].gw].az) / g;
}

});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.RotatingMagnet1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$RotatingMagnet1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.mt = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "RotatingMagnet1Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Rotating Magnet 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2))].mx = 1;
this.b$["test.falstad.EMWave2Frame"].calcBoundaries ();
this.b$["test.falstad.EMWave2Frame"].setForceBar (10);
this.mt = 0;
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (500);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
this.mt += this.b$["test.falstad.EMWave2Frame"].forceBar.getValue () * .003;
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2))].mx = Math.cos (this.mt);
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2))].my = -Math.sin (this.mt);
this.b$["test.falstad.EMWave2Frame"].doFilter ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.RotatingMagnet2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$RotatingMagnet2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "RotatingMagnet2Setup", test.falstad.EMWave2Frame.RotatingMagnet1Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.RotatingMagnet1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Rotating Magnet 2";
});
Clazz.overrideMethod (c$, "doStep", 
function () {
this.mt += this.b$["test.falstad.EMWave2Frame"].forceBar.getValue () * .003;
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2))].mx = Math.cos (this.mt);
this.b$["test.falstad.EMWave2Frame"].grid[Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + this.b$["test.falstad.EMWave2Frame"].gw * (Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2))].my = -Math.abs (Math.sin (this.mt));
this.b$["test.falstad.EMWave2Frame"].doFilter ();
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (500);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Scattering1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Scattering1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ctr = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Scattering1Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Scattering 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (8);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (100);
this.b$["test.falstad.EMWave2Frame"].setForceBar (23);
var a;
var b;
for (a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) - 1; a <= Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2) + 1; a++) for (b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) - 1; b <= Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeY / 2) + 1; b++) this.b$["test.falstad.EMWave2Frame"].grid[a + this.b$["test.falstad.EMWave2Frame"].gw * b].resonant = true;


});
Clazz.overrideMethod (c$, "doStep", 
function () {
this.ctr++;
if (this.ctr >= 600 && this.ctr <= 700) {
var a = (this.ctr - 600) * .01;
this.b$["test.falstad.EMWave2Frame"].sourceMult = 1 - a;
} else if (this.ctr >= 1100) {
var a = (this.ctr - 1100) * .01;
this.b$["test.falstad.EMWave2Frame"].sourceMult = a;
if (this.ctr == 1200) this.ctr = 0;
}});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Scattering2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Scattering2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.$ctr = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Scattering2Setup", test.falstad.EMWave2Frame.Scattering1Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Scattering1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Scattering 2";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.EMWave2Frame.Scattering2Setup, "select", []);
this.b$["test.falstad.EMWave2Frame"].setForceBar (16);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.BigModeSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$BigModeSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "BigModeSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Big TM11 Mode";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth * 3 / 4);
var c = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 2) - Clazz.doubleToInt (b / 2);
var d = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 2) - Clazz.doubleToInt (b / 2);
for (a = 1; a != 4; a++) this.b$["test.falstad.EMWave2Frame"].conductDrawRect (c - a, d - a, c + b + a - 1, d + b + a - 1, 1);

this.b$["test.falstad.EMWave2Frame"].setupMode (c, d, b, b, 1, 1);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (200);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OneByOneModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$OneByOneModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "OneByOneModesSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TM11 Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 5;
while (c + d < this.b$["test.falstad.EMWave2Frame"].windowHeight) {
var e = (Clazz.doubleToInt ((c + d) * (this.b$["test.falstad.EMWave2Frame"].windowWidth - 8) / this.b$["test.falstad.EMWave2Frame"].windowHeight)) + 6;
var f = c + this.b$["test.falstad.EMWave2Frame"].windowOffsetY;
var g = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 1;
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (g - 1, f - 1, g + e, f + d, 1);
this.b$["test.falstad.EMWave2Frame"].setupMode (g, f, e, d, 1, 1);
c += d + 2;
}
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OneByNModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$OneByNModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "OneByNModesSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TMn1 Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 8;
var e = this.b$["test.falstad.EMWave2Frame"].windowWidth - 2;
var f = 1;
while (c + d < this.b$["test.falstad.EMWave2Frame"].windowHeight) {
var g = c + this.b$["test.falstad.EMWave2Frame"].windowOffsetY;
var h = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 1;
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (h - 1, g - 1, h + e, g + d, 1);
this.b$["test.falstad.EMWave2Frame"].setupMode (h, g, e, d, f, 1);
c += d + 2;
f++;
}
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.NByNModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$NByNModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "NByNModesSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TMnn Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d;
var e;
var f = 3;
if (this.b$["test.falstad.EMWave2Frame"].resBar.getValue () >= 70) f++;
if (this.b$["test.falstad.EMWave2Frame"].resBar.getValue () >= 100) f++;
var g = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / f) - 2;
var h = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / f) - 2;
for (d = 1; d <= f; d++) for (e = 1; e <= f; e++) {
var i = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 1 + (g + 2) * (e - 1);
var j = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 1 + (h + 2) * (d - 1);
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (i - 1, j - 1, i + h, j + g, 1);
this.b$["test.falstad.EMWave2Frame"].setupMode (i, j, h, g, d, e);
}

});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.OneByNModeCombosSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$OneByNModeCombosSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "OneByNModeCombosSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TMn1 Mode Combos";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 8;
var e = this.b$["test.falstad.EMWave2Frame"].windowWidth - 2;
while (c + d < this.b$["test.falstad.EMWave2Frame"].windowHeight) {
var f = this.b$["test.falstad.EMWave2Frame"].getrand (8) + 1;
var g;
do g = this.b$["test.falstad.EMWave2Frame"].getrand (8) + 1;
 while (f == g);
var h = c + this.b$["test.falstad.EMWave2Frame"].windowOffsetY;
var i = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 1;
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (i - 1, h - 1, i + e, h + d, 1);
for (a = 0; a != e; a++) for (b = 0; b != d; b++) {
this.b$["test.falstad.EMWave2Frame"].grid[a + i + this.b$["test.falstad.EMWave2Frame"].gw * (b + h)].az = 2 * (Math.sin (f * 3.141592653589793 * (a + 1) / (e + 1)) * Math.sin (3.141592653589793 * (b + 1) / (d + 1)) * .5 + Math.sin (g * 3.141592653589793 * (a + 1) / (e + 1)) * Math.sin (3.141592653589793 * (b + 1) / (d + 1)) * .5);
this.b$["test.falstad.EMWave2Frame"].grid[a + i + this.b$["test.falstad.EMWave2Frame"].gw * (b + h)].dazdt = 0;
}

c += d + 2;
}
this.b$["test.falstad.EMWave2Frame"].noFilter ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.NByNModeCombosSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$NByNModeCombosSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "NByNModeCombosSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TMnn Mode Combos";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 2;
if (this.b$["test.falstad.EMWave2Frame"].resBar.getValue () >= 70) d++;
if (this.b$["test.falstad.EMWave2Frame"].resBar.getValue () >= 100) d++;
var e = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / d) - 2;
var f = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / d) - 2;
var g;
var h;
for (g = 1; g <= d; g++) for (h = 1; h <= d; h++) {
var i = this.b$["test.falstad.EMWave2Frame"].getrand (4) + 1;
var j = this.b$["test.falstad.EMWave2Frame"].getrand (4) + 1;
var k;
var l;
do {
k = this.b$["test.falstad.EMWave2Frame"].getrand (4) + 1;
l = this.b$["test.falstad.EMWave2Frame"].getrand (4) + 1;
} while (i == k && j == l);
var m = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 1 + (e + 2) * (g - 1);
var n = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 1 + (f + 2) * (h - 1);
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (m - 1, n - 1, m + f, n + e, 1);
for (a = 0; a != f; a++) for (b = 0; b != e; b++) {
this.b$["test.falstad.EMWave2Frame"].grid[a + m + this.b$["test.falstad.EMWave2Frame"].gw * (b + n)].az = 2 * (Math.sin (i * 3.141592653589793 * (a + 1) / (f + 1)) * Math.sin (j * 3.141592653589793 * (b + 1) / (e + 1)) * .5 + Math.sin (k * 3.141592653589793 * (a + 1) / (f + 1)) * Math.sin (l * 3.141592653589793 * (b + 1) / (e + 1)) * .5);
this.b$["test.falstad.EMWave2Frame"].grid[a + m + this.b$["test.falstad.EMWave2Frame"].gw * (b + n)].dazdt = 0;
}

}

this.b$["test.falstad.EMWave2Frame"].noFilter ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.TriangleModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$TriangleModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "TriangleModesSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Triangle Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b;
for (a = 0; a != 2; a++) for (b = 0; b != 2; b++) {
var c = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth * a / 2) + 1;
var d = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight * b / 2) + 1;
var e = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 2) - 2;
var f = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 2) - 2;
var g;
for (g = 0; g != e; g++) this.b$["test.falstad.EMWave2Frame"].conductDrawRect (c + g + 1, d + g, c + e, d + g, 1);

this.b$["test.falstad.EMWave2Frame"].conductDrawRect (c - 1, d - 1, c + e, d + f, 1);
var h = 0;
var i = 0;
switch (b * 2 + a) {
case 0:
h = 1;
i = 2;
break;
case 1:
h = 1;
i = 3;
break;
case 2:
h = 2;
i = 3;
break;
case 3:
h = 1;
i = 4;
break;
}
var j;
var k;
for (k = 0; k != f; k++) {
for (j = 0; j <= k; j++) this.b$["test.falstad.EMWave2Frame"].grid[c + j + this.b$["test.falstad.EMWave2Frame"].gw * (d + k)].az = (Math.sin (h * 3.141592653589793 * (j + 1) / (e + 2)) * Math.sin (i * 3.141592653589793 * (k + 2) / (f + 2)) - Math.sin (i * 3.141592653589793 * (j + 1) / (e + 2)) * Math.sin (h * 3.141592653589793 * (k + 2) / (f + 2)));

this.b$["test.falstad.EMWave2Frame"].grid[c + j + this.b$["test.falstad.EMWave2Frame"].gw * (d + k)].dazdt = 0;
}
}

this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (114);
this.b$["test.falstad.EMWave2Frame"].noFilter ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.CircleModes1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$CircleModes1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "CircleModes1Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Circular Modes 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a;
var b;
for (a = 0; a != 2; a++) for (b = 0; b != 2; b++) {
var c = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth * a / 2) + 1;
var d = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight * b / 2);
var e = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 2) - 2;
var f = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight / 2) - 2;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (c - 1, d - 1, c + e + 1, d + f + 1, 1);
var g;
var h = Clazz.doubleToInt (e / 2);
var i =  Clazz.newDoubleArray (3, 0);
var j = this.b$["test.falstad.EMWave2Frame"].zeroj (a, b + 1) / h;
var k = 1;
switch (b * 2 + a) {
case 1:
k = 1.6666666666666667;
break;
case 2:
k = 2;
break;
case 3:
k = 8.333333333333334;
break;
}
for (g = -h; g <= h; g++) {
var l = Clazz.doubleToInt (Math.sqrt (h * h - g * g - .00001));
this.b$["test.falstad.EMWave2Frame"].conductFillRect (c + h + g, d + h - l, c + h + g, d + h + l, 0);
var m;
for (m = -l; m <= l; m++) {
var n = Math.sqrt (g * g + m * m);
var o = n * j;
var p = (a == 0) ? 1 : m / n;
if (n == 0) p = (a == 0) ? 1 : 0;
this.b$["test.falstad.EMWave2Frame"].bess (a, o, i);
this.b$["test.falstad.EMWave2Frame"].grid[c + h + g + this.b$["test.falstad.EMWave2Frame"].gw * (d + h + m)].az = i[a + 1] * p * k;
}
}
}

this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (200);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.CircleModes2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$CircleModes2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "CircleModes2Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Circular Modes 2";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (0);
var a = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 1;
var b = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 1;
var c = this.b$["test.falstad.EMWave2Frame"].windowWidth - 2;
var d = this.b$["test.falstad.EMWave2Frame"].windowHeight - 2;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (a - 1, b - 1, a + c + 1, b + d + 1, 1);
var e;
var f = Clazz.doubleToInt (c / 2);
var g =  Clazz.newDoubleArray (3, 0);
var h = this.b$["test.falstad.EMWave2Frame"].zeroj (1, 1) / f;
var i = 2 * f / 16.;
for (e = -f; e <= f; e++) {
var j = Clazz.doubleToInt (Math.sqrt (f * f - e * e - .00001));
this.b$["test.falstad.EMWave2Frame"].conductFillRect (a + f + e, b + f - j, a + f + e, b + f + j, 0);
var k;
for (k = -j; k <= j; k++) {
var l = Math.sqrt (e * e + k * k);
var m = l * h;
var n = k / l;
var o = e / l;
if (l == 0) n = o = 0;
this.b$["test.falstad.EMWave2Frame"].bess (1, m, g);
this.b$["test.falstad.EMWave2Frame"].grid[a + f + e + this.b$["test.falstad.EMWave2Frame"].gw * (b + f + k)].az = g[2] * n * i;
this.b$["test.falstad.EMWave2Frame"].grid[a + f + e + this.b$["test.falstad.EMWave2Frame"].gw * (b + f + k)].dazdt = g[2] * o;
}
}
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (200);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Waveguides1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Waveguides1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Waveguides1Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Waveguides 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (8);
var a;
var b;
var c = 1;
var d = 5;
var e = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 2;
while (c + d < this.b$["test.falstad.EMWave2Frame"].windowWidth) {
var f = c + this.b$["test.falstad.EMWave2Frame"].windowOffsetX;
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (f - 1, e - 1, f - 1, this.b$["test.falstad.EMWave2Frame"].gridSizeY - 1, 1);
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (f + d, e - 1, f + d, this.b$["test.falstad.EMWave2Frame"].gridSizeY - 1, 1);
d += 2;
c += d;
}
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (c - 1 + this.b$["test.falstad.EMWave2Frame"].windowOffsetX, e - 1, this.b$["test.falstad.EMWave2Frame"].gridSizeX - 1, e - 1, 1);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (140);
this.b$["test.falstad.EMWave2Frame"].setForceBar (28);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Waveguides2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Waveguides2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Waveguides2Setup", test.falstad.EMWave2Frame.Waveguides1Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Waveguides1Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Waveguides 2";
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.EMWave2Frame.Waveguides2Setup, "select", []);
this.b$["test.falstad.EMWave2Frame"].setForceBar (17);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Waveguides3Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Waveguides3Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Waveguides3Setup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Waveguides 3";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (8);
var a;
var b;
var c = 1;
var d = 8;
var e = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 2;
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (this.b$["test.falstad.EMWave2Frame"].windowOffsetX + 1, e - 1, this.b$["test.falstad.EMWave2Frame"].windowOffsetX + this.b$["test.falstad.EMWave2Frame"].windowWidth - 1, e - 1, 1);
c = 1;
b = 0;
while (c + d < this.b$["test.falstad.EMWave2Frame"].windowWidth && b < d) {
var f = c + this.b$["test.falstad.EMWave2Frame"].windowOffsetX;
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (f - 1, e - 1, f - 1, this.b$["test.falstad.EMWave2Frame"].gridSizeY - 1, 1);
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (f + d, e - 1, f + d, this.b$["test.falstad.EMWave2Frame"].gridSizeY - 1, 1);
this.b$["test.falstad.EMWave2Frame"].addConductor (f + b++, e - 1, 0);
c += d + 2;
if (this.b$["test.falstad.EMWave2Frame"].resBar.getValue () == 32 && b == 2) b++;
}
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (1000);
this.b$["test.falstad.EMWave2Frame"].setForceBar (32);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Waveguides4Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$Waveguides4Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "Waveguides4Setup", test.falstad.EMWave2Frame.Waveguides3Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Waveguides3Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Waveguides 4";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (8);
var a;
var b = 1;
var c = 9;
var d = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 2;
var e = this.b$["test.falstad.EMWave2Frame"].windowHeight - 1;
b = 1;
while (b + c < this.b$["test.falstad.EMWave2Frame"].windowWidth) {
var f = b + this.b$["test.falstad.EMWave2Frame"].windowOffsetX;
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (f - 1, d - 1, f - 1, d + e - 2, 1);
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (f + c, d - 1, f + c, d + e - 2, 1);
b += c + 2;
}
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (480);
this.b$["test.falstad.EMWave2Frame"].setForceBar (40);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var a = this.b$["test.falstad.EMWave2Frame"].windowOffsetY;
var b = 9;
var c = 1;
var d = 1;
while (c + b < this.b$["test.falstad.EMWave2Frame"].windowWidth) {
var e = c + this.b$["test.falstad.EMWave2Frame"].windowOffsetX;
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
g = h = 3;
break;
case 4:
g = 1;
h = 2;
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
for (f = 0; f != b; f++) {
this.b$["test.falstad.EMWave2Frame"].grid[e + f + this.b$["test.falstad.EMWave2Frame"].gw * a].az = this.b$["test.falstad.EMWave2Frame"].grid[e + f + this.b$["test.falstad.EMWave2Frame"].gw * a].jz * (Math.sin (3.141592653589793 * g * (f + 1) / (b + 1)) + Math.sin (3.141592653589793 * h * (f + 1) / (b + 1)));
this.b$["test.falstad.EMWave2Frame"].grid[e + f + this.b$["test.falstad.EMWave2Frame"].gw * a].jz = 0;
}
c += b + 2;
d++;
}
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ResonantCavitiesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$ResonantCavitiesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "ResonantCavitiesSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Resonant Cavities";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (8);
var a;
var b;
var c = 1;
var d = 5;
var e = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 11;
while (c + d < this.b$["test.falstad.EMWave2Frame"].windowWidth) {
var f = (Clazz.doubleToInt ((c + d) * (this.b$["test.falstad.EMWave2Frame"].windowHeight - 18) / this.b$["test.falstad.EMWave2Frame"].windowWidth)) + 6;
var g = c + this.b$["test.falstad.EMWave2Frame"].windowOffsetX;
for (a = 0; a != f + 2; a++) {
this.b$["test.falstad.EMWave2Frame"].addConductor (g - 1, e + a - 1, 1);
this.b$["test.falstad.EMWave2Frame"].addConductor (g + d, e + a - 1, 1);
}
for (b = 0; b != d + 2; b++) {
this.b$["test.falstad.EMWave2Frame"].addConductor (g + b - 1, e - 1, 1);
this.b$["test.falstad.EMWave2Frame"].addConductor (g + b - 1, e + f, 1);
}
this.b$["test.falstad.EMWave2Frame"].addConductor (g + Clazz.doubleToInt (d / 2), e - 1, 0);
c += d + 2;
}
c--;
for (; c < this.b$["test.falstad.EMWave2Frame"].windowWidth; c++) this.b$["test.falstad.EMWave2Frame"].addConductor (c + this.b$["test.falstad.EMWave2Frame"].windowOffsetX, e - 1, 1);

this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (300);
this.b$["test.falstad.EMWave2Frame"].setForceBar (38);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.SingleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$SingleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "SingleSlitSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Single Slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (8);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
var b = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 4;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (0, b, this.b$["test.falstad.EMWave2Frame"].gridSizeX - 1, b + 2, 1);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (a - 7, b, a + 7, b + 2, 0);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (275);
this.b$["test.falstad.EMWave2Frame"].setForceBar (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.DoubleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$DoubleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "DoubleSlitSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Double Slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (8);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
var b = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 4;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (0, b, this.b$["test.falstad.EMWave2Frame"].gridSizeX - 1, b + 2, 1);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (a - 7, b, a - 5, b + 2, 0);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (a + 5, b, a + 7, b + 2, 0);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (366);
this.b$["test.falstad.EMWave2Frame"].setForceBar (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.TripleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$TripleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "TripleSlitSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Triple Slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (8);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
var b = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 4;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (0, b, this.b$["test.falstad.EMWave2Frame"].gridSizeX - 1, b + 2, 1);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (a - 13, b, a - 11, b + 2, 0);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (a - 1, b, a + 1, b + 2, 0);
this.b$["test.falstad.EMWave2Frame"].conductFillRect (a + 11, b, a + 13, b + 2, 0);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (310);
this.b$["test.falstad.EMWave2Frame"].setForceBar (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.ObstacleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$ObstacleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "ObstacleSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Obstacle";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (8);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].gridSizeX / 2);
var b = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 6;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (a - 7, b, a + 7, b + 2, 1);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (400);
this.b$["test.falstad.EMWave2Frame"].setForceBar (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.HalfPlaneSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$HalfPlaneSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "HalfPlaneSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Half Plane";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].sourceChooser.select (8);
var a = this.b$["test.falstad.EMWave2Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth / 2);
var b;
this.b$["test.falstad.EMWave2Frame"].conductFillRect (this.b$["test.falstad.EMWave2Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowWidth * 2 / 3), this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 3, this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowWidth - 1, this.b$["test.falstad.EMWave2Frame"].windowOffsetY + 5, 1);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (150);
this.b$["test.falstad.EMWave2Frame"].setForceBar (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave2Frame.LloydsMirrorSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave2Frame$LloydsMirrorSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave2Frame, "LloydsMirrorSetup", test.falstad.EMWave2Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave2Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Lloyd's Mirror";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave2Frame"].setSources ();
this.b$["test.falstad.EMWave2Frame"].sources[0].x = this.b$["test.falstad.EMWave2Frame"].windowOffsetX;
this.b$["test.falstad.EMWave2Frame"].sources[0].y = this.b$["test.falstad.EMWave2Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave2Frame"].windowHeight * 3 / 4);
this.b$["test.falstad.EMWave2Frame"].brightnessBar.setValue (120);
this.b$["test.falstad.EMWave2Frame"].setForceBar (40);
this.b$["test.falstad.EMWave2Frame"].conductDrawRect (0, this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight - 1, this.b$["test.falstad.EMWave2Frame"].gridSizeX - 1, this.b$["test.falstad.EMWave2Frame"].windowOffsetY + this.b$["test.falstad.EMWave2Frame"].windowHeight - 1, 1);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return null;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"sourceRadius", 7,
"freqMult", 0.01166665,
"pi", 3.14159265358979323846,
"MODE_PERF_CONDUCTOR", 0,
"MODE_GOOD_CONDUCTOR", 1,
"MODE_FAIR_CONDUCTOR", 2,
"MODE_J_POS", 3,
"MODE_J_NEG", 4,
"MODE_FERROMAG", 5,
"MODE_DIAMAG", 6,
"MODE_MEDIUM", 7,
"MODE_M_DOWN", 8,
"MODE_M_UP", 9,
"MODE_M_LEFT", 10,
"MODE_M_RIGHT", 11,
"MODE_RESONANT", 12,
"MODE_CLEAR", 13,
"MODE_ADJUST", 14,
"MODE_ADJ_CONDUCT", 14,
"MODE_ADJ_PERM", 15,
"MODE_ADJ_J", 16,
"MODE_ADJ_MEDIUM", 17,
"MODE_ADJ_MAG_DIR", 18,
"MODE_ADJ_MAG_STR", 19,
"VIEW_E", 0,
"VIEW_B", 1,
"VIEW_B_LINES", 2,
"VIEW_B_STRENGTH", 3,
"VIEW_J", 4,
"VIEW_E_B", 5,
"VIEW_E_B_LINES", 6,
"VIEW_E_B_J", 7,
"VIEW_E_B_LINES_J", 8,
"VIEW_H", 9,
"VIEW_M", 10,
"VIEW_TYPE", 11,
"VIEW_A", 12,
"VIEW_POYNTING", 13,
"VIEW_ENERGY", 14,
"VIEW_POYNTING_ENERGY", 15,
"VIEW_FORCE", 16,
"VIEW_EFF_CUR", 17,
"VIEW_MAG_CHARGE", 18,
"VIEW_CURL_E", 19,
"VIEW_BX", 20,
"VIEW_BY", 21,
"VIEW_HX", 22,
"VIEW_HY", 23,
"VIEW_NONE", -1,
"TYPE_CONDUCTOR", 1,
"TYPE_DIAMAGNET", 2,
"TYPE_FERROMAGNET", 3,
"TYPE_MAGNET", 4,
"TYPE_CURRENT", 5,
"TYPE_MEDIUM", 6,
"TYPE_NONE", 0,
"mhmult", 12,
"mediumMax", 191,
"mediumMaxIndex", .5,
"SWF_SIN", 0,
"SWF_PACKET", 1,
"AUX_NONE", 0,
"AUX_PHASE", 1,
"AUX_FREQ", 2,
"AUX_SPEED", 3,
"SRC_NONE", 0,
"SRC_1S1F", 1,
"SRC_2S1F", 3,
"SRC_2S2F", 4,
"SRC_4S1F", 6,
"SRC_1S1F_PACKET", 7,
"SRC_1S1F_PLANE", 8,
"SRC_2S1F_PLANE", 10,
"SRC_1S1F_PLANE_PACKET", 12);
});
