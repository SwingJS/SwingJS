Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.EMWave1Layout", "$.EMWave1", "$.EMWave1Canvas", "$.EMWave1Frame"], ["java.awt.Color", "$.Dimension", "java.awt.image.MemoryImageSource", "java.lang.Double", "java.util.Random", "$.Vector", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "EMWave1Canvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.EMWave1Canvas, []);
this.pg = p;
}, "test.falstad.EMWave1Frame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateEMWave1 (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateEMWave1 (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "EMWave1Layout", null, java.awt.LayoutManager);
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
}, test.falstad, "EMWave1", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.EMWave1.ogf != null) test.falstad.EMWave1.ogf.dispose ();
test.falstad.EMWave1.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.EMWave1.ogf =  new test.falstad.EMWave1Frame (null);
test.falstad.EMWave1.ogf.init ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.EMWave1.ogf == null) {
this.started = true;
test.falstad.EMWave1.ogf =  new test.falstad.EMWave1Frame (this);
test.falstad.EMWave1.ogf.init ();
this.repaint ();
}});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.EMWave1.ogf == null) s = "Applet is finished.";
 else if (test.falstad.EMWave1.ogf.useFrame) test.falstad.EMWave1.ogf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.EMWave1, "paint", [g]);
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
if (test.falstad.EMWave1.ogf != null) test.falstad.EMWave1.ogf.dispose ();
test.falstad.EMWave1.ogf = null;
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
this.EBrightnessBar = null;
this.lineDensityBar = null;
this.auxBar = null;
this.auxLabel = null;
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
this.sourceType = 0;
this.auxFunction = 0;
this.sourcePacket = false;
this.cv = null;
this.applet = null;
this.main = null;
this.useFrame = false;
this.showControls = false;
this.useBufferedImage = false;
this.shown = false;
this.lastTime = 0;
this.linegrid = null;
this.filterCount = 0;
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.OscSource")) {
test.falstad.EMWave1Frame.$EMWave1Frame$OscSource$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.OscElement")) {
test.falstad.EMWave1Frame.$EMWave1Frame$OscElement$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.Setup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.PlaneWaveSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$PlaneWaveSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.IntersectingPlaneWavesSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$IntersectingPlaneWavesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.ConductReflectSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$ConductReflectSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.OscDipoleSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$OscDipoleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.HalfWaveAnt1Setup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$HalfWaveAnt1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.FullWaveAnt1Setup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$FullWaveAnt1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.FullWaveAnt2Setup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$FullWaveAnt2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.OscCurrentLoop")) {
test.falstad.EMWave1Frame.$EMWave1Frame$OscCurrentLoop$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.BigMode01Setup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$BigMode01Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.BigMode10Setup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$BigMode10Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.BigMode1001Setup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$BigMode1001Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.BigMode1001iSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$BigMode1001iSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.BigMode2Setup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$BigMode2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.OneByOneModesSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$OneByOneModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.NByZeroModesSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$NByZeroModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.NByOneModesSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$NByOneModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.NByNModesSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$NByNModesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.ZeroByNModeCombosSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$ZeroByNModeCombosSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.OneByNModeCombosSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$OneByNModeCombosSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.NByNModeCombosSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$NByNModeCombosSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.Waveguides1Setup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$Waveguides1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.CapacitorSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$CapacitorSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.ResonantCavitiesSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$ResonantCavitiesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.SingleSlitSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$SingleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.DoubleSlitSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$DoubleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.TripleSlitSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$TripleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.ObstacleSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$ObstacleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.HalfPlaneSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$HalfPlaneSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMWave1Frame.LloydsMirrorSetup")) {
test.falstad.EMWave1Frame.$EMWave1Frame$LloydsMirrorSetup$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "EMWave1Frame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "EMWave1 by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.EMWave1Frame, ["TE Electrodynamics Applet v1.4a"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.EMWave1");
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
var s = Clazz.innerTypeInstance (test.falstad.EMWave1Frame.PlaneWaveSetup, this, null);
var i = 0;
while (s != null) {
this.setupList.addElement (s);
s = s.createNext ();
if (i++ > 300) {
System.out.print ("setup loop?\n");
return;
}}
var os = System.getProperty ("os.name");
var res = 40;
this.sources =  new Array (4);
this.main.setLayout ( new test.falstad.EMWave1Layout ());
this.cv =  new test.falstad.EMWave1Canvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.setupChooser =  new swingjs.awt.Choice ();
for (i = 0; i != this.setupList.size (); i++) this.setupChooser.add ("Setup: " + (this.setupList.elementAt (i)).getName ());

this.setupChooser.select (4);
this.setup = this.setupList.elementAt (4);
this.setupChooser.addItemListener (this);
this.main.add (this.setupChooser);
this.sourceChooser =  new swingjs.awt.Choice ();
this.sourceChooser.add ("No Sources");
this.sourceChooser.add ("1 Plane Src");
this.sourceChooser.add ("2 Plane Srcs");
this.sourceChooser.add ("1 Plane Src (Packets)");
this.sourceChooser.add ("1 Antenna Src");
this.sourceChooser.add ("2 Antenna Srcs");
this.sourceChooser.add ("1 Loop Src");
this.sourceChooser.add ("1 Loop Src (Packets)");
this.sourceChooser.select (1);
this.sourceChooser.addItemListener (this);
this.main.add (this.sourceChooser);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Add Perf. Conductor");
this.modeChooser.add ("Mouse = Clear");
this.modeChooser.addItemListener (this);
this.main.add (this.modeChooser);
this.viewChooser =  new swingjs.awt.Choice ();
this.viewChooser.add ("Show Electric Field (E)");
this.viewChooser.add ("Show E lines");
this.viewChooser.add ("Show Magnetic Field (B)");
this.viewChooser.add ("Show Charge (rho)");
this.viewChooser.add ("Show Current (j)");
this.viewChooser.add ("Show E/B");
this.viewChooser.add ("Show E lines/B");
this.viewChooser.add ("Show E/B/rho/j");
this.viewChooser.add ("Show E lines/B/rho/j");
this.viewChooser.add ("Show E/rho");
this.viewChooser.add ("Show E lines/rho");
this.viewChooser.add ("Show E/B/j");
this.viewChooser.add ("Show E lines/B/j");
this.viewChooser.add ("Show Poynting Vector");
this.viewChooser.add ("Show Energy Density");
this.viewChooser.add ("Show Poynting/Energy");
this.viewChooser.add ("Show Disp Current");
this.viewChooser.add ("Show Disp + j");
this.viewChooser.add ("Show Disp + j/B");
this.viewChooser.add ("Show dB/dt");
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
this.main.add (this.resBar =  new swingjs.awt.Scrollbar (0, res, 5, 16, 140));
this.resBar.addAdjustmentListener (this);
this.setResolution ();
this.main.add ( new swingjs.awt.Label ("Source Frequency", 0));
this.main.add (this.forceBar =  new swingjs.awt.Scrollbar (0, this.forceBarValue = 10, 1, 1, 40));
this.forceBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 10, 1, 1, 2000));
this.brightnessBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("E Field Brightness", 0));
this.main.add (this.EBrightnessBar =  new swingjs.awt.Scrollbar (0, 100, 1, 1, 800));
this.EBrightnessBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Line Density", 0));
this.main.add (this.lineDensityBar =  new swingjs.awt.Scrollbar (0, 50, 1, 10, 100));
this.lineDensityBar.addAdjustmentListener (this);
this.main.add (this.auxLabel =  new swingjs.awt.Label ("", 0));
this.main.add (this.auxBar =  new swingjs.awt.Scrollbar (0, 1, 1, 1, 40));
this.auxBar.addAdjustmentListener (this);
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
this.grid =  new Array (this.gridSizeXY);
var i;
var j;
for (i = 0; i != this.gridSizeXY; i++) this.grid[i] = Clazz.innerTypeInstance (test.falstad.EMWave1Frame.OscElement, this, null);

this.doSetup ();
});
Clazz.defineMethod (c$, "setDamping", 
function () {
var i;
var j;
for (i = 0; i != this.gridSizeXY; i++) this.grid[i].damp = 1;

for (i = 0; i != this.windowOffsetX; i++) for (j = 0; j != this.gridSizeX; j++) {
var da = Math.exp (-(this.windowOffsetX - i) * .0022);
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
}return Clazz.superCall (this, test.falstad.EMWave1Frame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "doClear", 
function () {
var x;
var y;
for (x = 0; x != this.gridSizeXY; x++) this.grid[x].az = this.grid[x].dazdt = 0;

this.t = 0;
this.doFilter ();
});
Clazz.defineMethod (c$, "doClearAll", 
function () {
var x;
var y;
for (x = 0; x != this.gridSizeXY; x++) {
this.grid[x].jx = this.grid[x].jy = 0;
this.grid[x].az = this.grid[x].dazdt = 0;
this.grid[x].boundary = false;
this.grid[x].gray = false;
this.grid[x].conductor = false;
this.grid[x].col = 0;
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
this.grid[x + y * this.gw].conductor = this.grid[x + this.windowOffsetY * this.gw].conductor;
this.grid[x + this.gw * (this.gridSizeY - y - 1)].conductor = this.grid[x + this.gw * (this.gridSizeY - this.windowOffsetY - 1)].conductor;
}

for (y = 0; y < this.gridSizeY; y++) for (x = 0; x < this.windowOffsetX; x++) {
this.grid[x + this.gw * y].conductor = this.grid[this.windowOffsetX + this.gw * y].conductor;
this.grid[this.gridSizeX - x - 1 + this.gw * y].conductor = this.grid[this.gridSizeX - this.windowOffsetX - 1 + this.gw * y].conductor;
}

for (x = 1; x < this.gridSizeX - 1; x++) for (y = 1; y < this.gridSizeY - 1; y++) {
var gi = x + this.gw * y;
var oe = this.grid[gi];
var cond = oe.conductor;
var e1 = this.grid[gi - 1];
var e2 = this.grid[gi + 1];
var e3 = this.grid[gi - this.gw];
var e4 = this.grid[gi + this.gw];
oe.gray = oe.conductor;
if (e1.conductor != cond || e2.conductor != cond || e3.conductor != cond || e4.conductor != cond) {
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
Clazz.defineMethod (c$, "updateEMWave1", 
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
var tadd2 = tadd * tadd;
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
var o;
for (j = 1; j != mxy; j++) {
var gi = j * this.gw + 1;
var giEnd = gi + mxx - 1;
oe = this.grid[gi - 1];
oee = this.grid[gi];
for (; gi != giEnd; gi++) {
oew = oe;
oe = oee;
oee = this.grid[gi + 1];
if (oe.conductor) continue;
oen = this.grid[gi - this.gw];
oes = this.grid[gi + this.gw];
if (oe.boundary) {
var az = oe.az;
previ = oew.az - az;
if (oew.conductor) previ = (oee.conductor) ? 0 : oee.az - az;
nexti = oee.az - az;
if (oee.conductor) nexti = (oew.conductor) ? 0 : oew.az - az;
prevj = oen.az - az;
if (oen.conductor) prevj = (oes.conductor) ? 0 : oes.az - az;
nextj = oes.az - az;
if (oes.conductor) nextj = (oen.conductor) ? 0 : oen.az - az;
basis = (nexti + previ + nextj + prevj) * .25;
var jj = oes.jx - oen.jx + oew.jy - oee.jy;
a = basis + jj;
} else {
previ = oew.az;
nexti = oee.az;
prevj = oen.az;
nextj = oes.az;
basis = (nexti + previ + nextj + prevj) * .25;
a = oes.jx - oen.jx + oew.jy - oee.jy - (oe.az - basis);
}o = oe.dazdt;
oe.dazdt = (oe.dazdt * oe.damp) + a * forcecoef;
oe.dazdt2 = oe.dazdt - o;
}
}
for (j = 1; j != mxy; j++) {
var gi = j * this.gw + 1;
var giEnd = gi - 1 + mxx;
for (; gi != giEnd; gi++) {
oe = this.grid[gi];
oe.az += oe.dazdt * tadd2;
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
var col = 0xFFFFFFFF;
if (this.sourceType == 2 && (i % 2) == 0) col = 0xFFFFFF00;
this.plotSource (i, xx, yy, col);
}
if (this.imageSource != null) this.imageSource.newPixels ();
realg.drawImage (this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState ()) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
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
function (n, xx, yy, col) {
var rad = 7;
var j;
if (n == this.selectedSource) col ^= 0x00808080;
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
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "renderGrid", 
function () {
var mult = this.brightnessBar.getValue () / 50.0;
var emult = this.EBrightnessBar.getValue () / 100.0;
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
var showLines = false;
viewScalar = viewScalarCond = viewVector = viewVectorCond = -1;
switch (v) {
case 3:
case 2:
case 19:
case 14:
viewScalar = viewScalarCond = v;
break;
case 0:
case 4:
case 13:
case 16:
case 17:
viewVector = viewVectorCond = v;
break;
case 18:
viewVector = viewVectorCond = 17;
viewScalar = 2;
break;
case 1:
showLines = true;
break;
case 5:
viewScalar = viewScalarCond = 2;
viewVector = viewVectorCond = 0;
break;
case 6:
viewScalar = viewScalarCond = 2;
showLines = true;
break;
case 9:
viewScalar = viewScalarCond = 3;
viewVector = viewVectorCond = 0;
break;
case 10:
viewScalar = viewScalarCond = 3;
showLines = true;
break;
case 11:
viewScalar = viewScalarCond = 2;
viewVector = 0;
viewVectorCond = 4;
break;
case 12:
viewScalar = viewScalarCond = 2;
viewVector = 0;
viewVectorCond = 4;
showLines = true;
break;
case 8:
viewScalar = 2;
viewScalarCond = 3;
viewVectorCond = 4;
showLines = true;
break;
case 7:
viewScalar = 2;
viewScalarCond = 3;
viewVector = 0;
viewVectorCond = 4;
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
if (oe.gray || oe.jx != 0 || oe.jy != 0) {
col_r = col_g = col_b = 64;
vv = viewVectorCond;
vs = viewScalarCond;
}if (vs != -1) {
var dy = 0;
switch (vs) {
case 2:
dy = oe.az * .2;
break;
case 19:
dy = oe.dazdt;
break;
case 3:
dy = 0;
if (oe.conductor) {
if (!this.grid[gi + this.gw].conductor) dy = this.getEField (this.grid[gi + this.gw], this.grid[gi + this.gw - 1], this.grid[gi + this.gw + 1]);
if (!this.grid[gi - this.gw].conductor) dy += this.getEField (this.grid[gi - this.gw], this.grid[gi - this.gw + 1], this.grid[gi - this.gw - 1]);
if (!this.grid[gi + 1].conductor) dy += this.getEField (this.grid[gi + 1], this.grid[gi + this.gw + 1], this.grid[gi - this.gw + 1]);
if (!this.grid[gi - 1].conductor) dy += this.getEField (this.grid[gi - 1], this.grid[gi - this.gw - 1], this.grid[gi + this.gw - 1]);
dy *= .6;
}break;
case 14:
{
var dx = this.getEField (oe, this.grid[gi + this.gw], this.grid[gi - this.gw]);
dy = this.getEField (oe, this.grid[gi - 1], this.grid[gi + 1]);
dy = .4 * (Math.sqrt (dx * dx + dy * dy) * 3 + oe.az * oe.az * .05);
break;
}}
dy *= mult;
if (dy < -1) dy = -1;
if (dy > 1) dy = 1;
if (vs == 3) {
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
var mm;
var jmult = .2;
switch (vv) {
case 0:
dx = this.getEField (oe, this.grid[gi + this.gw], this.grid[gi - this.gw]) * emult;
dy = this.getEField (oe, this.grid[gi - 1], this.grid[gi + 1]) * emult;
break;
case 16:
case 17:
dx = this.getdEdt (oe, this.grid[gi + this.gw], this.grid[gi - this.gw]) * 100;
dy = this.getdEdt (oe, this.grid[gi - 1], this.grid[gi + 1]) * 100;
if (vv == 16) break;
case 4:
if (oe.conductor) {
if (!this.grid[gi + this.gw].conductor) dx += -this.grid[gi + this.gw].az * 0.2;
if (!this.grid[gi - this.gw].conductor) dx += this.grid[gi - this.gw].az * 0.2;
if (!this.grid[gi + 1].conductor) dy += this.grid[gi + 1].az * 0.2;
if (!this.grid[gi - 1].conductor) dy += -this.grid[gi - 1].az * 0.2;
} else {
dx += oe.jx * 0.2;
dy += oe.jy * 0.2;
}break;
case 13:
mm = 3.6 * oe.az;
dy = -mm * this.getEField (oe, this.grid[gi - this.gw], this.grid[gi + this.gw]);
dx = mm * this.getEField (oe, this.grid[gi + 1], this.grid[gi - 1]);
break;
}
var dn = Math.sqrt (dx * dx + dy * dy);
if (dn > 0) {
dx /= dn;
dy /= dn;
}dn *= mult;
if (vv == 4) {
if (dn > 1) {
if (dn > 2) dn = 2;
dn -= 1;
col_r = col_g = 255;
col_b = col_b + Clazz.doubleToInt (dn * (255 - col_b));
} else {
col_r = col_r + Clazz.doubleToInt (dn * (255 - col_r));
col_g = col_g + Clazz.doubleToInt (dn * (255 - col_g));
}} else {
if (dn > 1) {
if (dn > 2) dn = 2;
dn -= 1;
col_g = 255;
col_r = col_r + Clazz.doubleToInt (dn * (255 - col_r));
col_b = col_b + Clazz.doubleToInt (dn * (255 - col_b));
} else col_g = col_g + Clazz.doubleToInt (dn * (255 - col_g));
}col = (-16777216) | (col_r << 16) | (col_g << 8) | col_b;
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
Clazz.defineMethod (c$, "getEField", 
function (ge, gp, gn) {
if (ge.conductor) return 0;
if (gp.conductor) return .66 * (ge.dazdt - gn.dazdt);
if (gn.conductor) return .66 * (gp.dazdt - ge.dazdt);
return .33 * (-gn.dazdt + gp.dazdt);
}, "test.falstad.EMWave1Frame.OscElement,test.falstad.EMWave1Frame.OscElement,test.falstad.EMWave1Frame.OscElement");
Clazz.defineMethod (c$, "getdEdt", 
function (ge, gp, gn) {
if (ge.conductor) return 0;
if (gp.conductor) return 2 * (ge.dazdt2 - gn.dazdt2);
if (gn.conductor) return 2 * (gp.dazdt2 - ge.dazdt2);
return -gn.dazdt2 + gp.dazdt2;
}, "test.falstad.EMWave1Frame.OscElement,test.falstad.EMWave1Frame.OscElement,test.falstad.EMWave1Frame.OscElement");
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
var skip = false;
var au = this.auxBar.getValue () - 1;
if (au > 38) au = 38;
w2 = w + au * (0.08267349088394192);
var v = 0;
var v2 = 0;
if (!this.sourcePacket) {
v = Math.sin (w);
if (this.sourceCount >= 2) v2 = Math.sin (w2);
} else {
w %= 6.283185307179586;
var adjw = w / (0.01166665 * this.forceBar.getValue ());
adjw -= 10;
v = Math.exp (-0.01 * adjw * adjw) * Math.sin (adjw * .2);
if (adjw < 0) this.doFilter ();
}if (clear) v = v2 = 0;
this.sources[0].v = this.sources[2].v = (2 * v * this.sourceMult);
this.sources[1].v = this.sources[3].v = (2 * v2 * this.sourceMult);
if (this.sourceType == 1) {
for (j = 0; j != Clazz.doubleToInt (this.sourceCount / 2); j++) {
var src1 = this.sources[j * 2];
var src2 = this.sources[j * 2 + 1];
var src3 = this.sources[j];
this.drawPlaneSource (src1.x, src1.y, src2.x, src2.y, src3.v * .1);
}
} else if (this.sourceType == 2) {
for (j = 0; j != Clazz.doubleToInt (this.sourceCount / 2); j++) {
var src1 = this.sources[j * 2];
var src2 = this.sources[j * 2 + 1];
var src3 = this.sources[j];
this.drawAntennaSource (src1.x, src1.y, src2.x, src2.y, src3.v * .1);
}
} else if (this.sourceType == 3) {
var x1 = this.min (this.sources[0].x, this.sources[1].x);
var x2 = this.max (this.sources[0].x, this.sources[1].x);
var y1 = this.min (this.sources[0].y, this.sources[1].y);
var y2 = this.max (this.sources[0].y, this.sources[1].y);
var ix;
var iy;
var vx;
var vy;
vx = vy = this.sources[0].v * .1;
if (x1 == x2) vx = 0;
if (y1 == y2) vy = 0;
for (ix = x1 + 1; ix < x2; ix++) {
this.grid[ix + this.gw * y1].jx = vx;
this.grid[ix + this.gw * y2].jx = -vx;
}
this.grid[x1 + this.gw * y1].jx = .5 * vx;
this.grid[x2 + this.gw * y1].jx = .5 * vx;
this.grid[x1 + this.gw * y2].jx = -0.5 * vx;
this.grid[x2 + this.gw * y2].jx = -0.5 * vx;
for (iy = y1 + 1; iy < y2; iy++) {
this.grid[x1 + this.gw * iy].jy = -vy;
this.grid[x2 + this.gw * iy].jy = vy;
}
this.grid[x1 + this.gw * y1].jy = -0.5 * vy;
this.grid[x1 + this.gw * y2].jy = -0.5 * vy;
this.grid[x2 + this.gw * y1].jy = .5 * vy;
this.grid[x2 + this.gw * y2].jy = .5 * vy;
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
}var len = Math.sqrt ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
var xmult = (x2 - x1) / len;
var ymult = (y2 - y1) / len;
if (x1 == x2 && y1 == y2) {
} else if (this.abs (y2 - y1) > this.abs (x2 - x1)) {
var sgn = this.sign (y2 - y1);
var x;
var y;
for (y = y1; y != y2 + sgn; y += sgn) {
x = x1 + Clazz.doubleToInt ((x2 - x1) * (y - y1) / (y2 - y1));
this.grid[x + y * this.gw].jx = v * xmult;
this.grid[x + y * this.gw].jy = v * ymult;
}
} else {
var sgn = this.sign (x2 - x1);
var x;
var y;
for (x = x1; x != x2 + sgn; x += sgn) {
y = y1 + Clazz.doubleToInt ((y2 - y1) * (x - x1) / (x2 - x1));
this.grid[x + y * this.gw].jx = v * xmult;
this.grid[x + y * this.gw].jy = v * ymult;
}
}}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawAntennaSource", 
function (x1, y1, x2, y2, v) {
var k = this.forceBar.getValue () * .0224;
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
}var len = Math.sqrt ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
var ph = 0;
var xmult = (x2 - x1) / len;
var ymult = (y2 - y1) / len;
if (x1 == x2 && y1 == y2) {
} else if (this.abs (y2 - y1) > this.abs (x2 - x1)) {
var sgn = this.sign (y2 - y1);
var x;
var y;
for (y = y1; y != y2 + sgn; y += sgn) {
x = x1 + Clazz.doubleToInt ((x2 - x1) * (y - y1) / (y2 - y1));
var q = Math.sin ((ph + (y - y1) / ymult) * k) * v;
this.grid[x + y * this.gw].jx = q * xmult;
this.grid[x + y * this.gw].jy = q * ymult;
}
} else {
var sgn = this.sign (x2 - x1);
var x;
var y;
for (x = x1; x != x2 + sgn; x += sgn) {
y = y1 + Clazz.doubleToInt ((y2 - y1) * (x - x1) / (x2 - x1));
var q = Math.sin ((ph + (x - x1) / xmult) * k) * v;
this.grid[x + y * this.gw].jx = q * xmult;
this.grid[x + y * this.gw].jy = q * ymult;
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
var mult = this.brightnessBar.getValue () * this.EBrightnessBar.getValue () / 5000.0;
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
if (oe.gray || oe.jx != 0 || oe.jy != 0) {
x = 0;
continue;
}var dx = this.getEField (oe, this.grid[gi + this.gw], this.grid[gi - this.gw]);
var dy = this.getEField (oe, this.grid[gi - 1], this.grid[gi + 1]);
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
Clazz.defineMethod (c$, "filterGrid", 
function () {
if ((this.filterCount++ & 3) != 0) return;
if (this.filterCount > 200) return;
var mult1 = (this.forceBar.getValue () > 7 && this.sourceCount > 0 && !this.sourcePacket) ? 40 : 8;
var mult2 = 4 + mult1;
var x;
var y;
for (y = 1; y < this.gridSizeY - 1; y++) for (x = 1; x < this.gridSizeX - 1; x++) {
var gi = x + y * this.gw;
var oe = this.grid[gi];
if (oe.jx != 0 || oe.jy != 0 || oe.boundary || oe.conductor) continue;
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
this.dragClear = oe.conductor || oe.jx != 0 || oe.jy != 0;
this.dragSet = !this.dragClear;
}oe.conductor = false;
if (this.dragClear) return;
switch (this.modeChooser.getSelectedIndex ()) {
case 0:
this.addConductor (xp, yp, 1);
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
if (this.resBar.getValue () == this.windowWidth) return;
this.setResolution ();
this.reinit ();
this.cv.repaint (this.pause);
}if (e.getSource () === this.brightnessBar || e.getSource () === this.EBrightnessBar || e.getSource () === this.lineDensityBar) this.cv.repaint (this.pause);
if (e.getSource () === this.lineDensityBar) this.linegrid = null;
if (e.getSource () === this.forceBar) this.setForce ();
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
this.windowOffsetX = this.windowOffsetY = 30;
this.gridSizeX = this.windowWidth + this.windowOffsetX * 2;
this.gridSizeY = this.windowHeight + this.windowOffsetY * 2;
this.gridSizeXY = this.gridSizeX * this.gridSizeY;
this.gw = this.gridSizeX;
this.linegrid = null;
});
Clazz.defineMethod (c$, "setResolution", 
function (x) {
this.resBar.setValue (x);
this.setResolution ();
this.reinit ();
}, "~N");
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
});
Clazz.defineMethod (c$, "doSetup", 
function () {
this.t = 0;
this.doClearAll ();
this.sourceCount = -1;
this.filterCount = 0;
this.sourceChooser.select (0);
this.setForceBar (10);
this.brightnessBar.setValue (100);
this.EBrightnessBar.setValue (100);
this.auxBar.setValue (1);
this.setup = this.setupList.elementAt (this.setupChooser.getSelectedIndex ());
this.setup.select ();
this.setup.doSetupSources ();
this.calcBoundaries ();
this.setDamping ();
});
Clazz.defineMethod (c$, "addMedium", 
function () {
});
Clazz.defineMethod (c$, "addCondMedium", 
function (cv) {
this.conductFillRect (0, Clazz.doubleToInt (this.gridSizeY / 2), this.gridSizeX - 1, this.gridSizeY - 1, cv);
}, "~N");
Clazz.defineMethod (c$, "setSources", 
function () {
if (this.sourceCount > 0) this.doSources (1, true);
this.sourceMult = 1;
var oldSCount = this.sourceCount;
this.sourceCount = 0;
this.sourceType = 1;
this.sourcePacket = false;
switch (this.sourceChooser.getSelectedIndex ()) {
case 0:
this.sourceCount = 0;
break;
case 1:
this.sourceCount = 1;
break;
case 2:
this.sourceCount = 2;
break;
case 3:
this.sourceCount = 1;
this.sourcePacket = true;
break;
case 4:
this.sourceCount = 1;
this.sourceType = 2;
break;
case 5:
this.sourceCount = 2;
this.sourceType = 2;
break;
case 6:
this.sourceCount = 1;
this.sourceType = 3;
break;
case 7:
this.sourceCount = 1;
this.sourceType = 3;
this.sourcePacket = true;
}
if (this.sourceCount == 2) {
this.auxBar.setValue (1);
this.auxLabel.setText ("Phase Difference");
this.auxBar.show ();
this.auxLabel.show ();
} else {
this.auxBar.hide ();
this.auxLabel.hide ();
}this.validate ();
this.sourceCount *= 2;
if (oldSCount != this.sourceCount) {
var x2 = this.windowOffsetX + this.windowWidth - 1;
var y2 = this.windowOffsetY + this.windowHeight - 1;
this.sources[0] = Clazz.innerTypeInstance (test.falstad.EMWave1Frame.OscSource, this, null, this.windowOffsetX, this.windowOffsetY);
this.sources[1] = Clazz.innerTypeInstance (test.falstad.EMWave1Frame.OscSource, this, null, x2, this.windowOffsetY);
this.sources[2] = Clazz.innerTypeInstance (test.falstad.EMWave1Frame.OscSource, this, null, this.windowOffsetX, y2);
this.sources[3] = Clazz.innerTypeInstance (test.falstad.EMWave1Frame.OscSource, this, null, x2, y2);
}});
Clazz.defineMethod (c$, "setupMode", 
function (x, y, sx, sy, nx, ny) {
var i;
var j;
for (i = 0; i < sx; i++) for (j = 0; j < sy; j++) {
this.grid[i + x + this.gw * (j + y)].az = 2 * (Math.cos (3.141592653589793 * nx * i / (sx - 1)) * Math.cos (3.141592653589793 * ny * j / (sy - 1)));
this.grid[i + x + this.gw * (j + y)].dazdt = 0;
}

this.noFilter ();
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addMode", 
function (x, y, sx, sy, nx, ny) {
var i;
var j;
for (i = 0; i < sx; i++) for (j = 0; j < sy; j++) {
this.grid[i + x + this.gw * (j + y)].az += 2 * (Math.cos (3.141592653589793 * nx * i / (sx - 1)) * Math.cos (3.141592653589793 * ny * j / (sy - 1)));
}

this.noFilter ();
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addModeI", 
function (x, y, sx, sy, nx, ny) {
var i;
var j;
var mult = 3.141592653589793 * 4 * Math.sqrt (nx * nx / ((sx - 1) * (sx - 1)) + ny * ny / ((sy - 1) * (sy - 1)));
for (i = 0; i < sx; i++) for (j = 0; j < sy; j++) {
this.grid[i + x + this.gw * (j + y)].dazdt += mult * (Math.cos (3.141592653589793 * nx * i / (sx - 1)) * Math.cos (3.141592653589793 * ny * j / (sy - 1)));
}

this.noFilter ();
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "findMode", 
function (x1, y1, x2, y2) {
var iter;
var delta = 0;
var iic = 1000;
for (iter = 0; iter != iic; iter++) {
var i;
var j;
var ct = 0;
for (i = x1; i <= x2; i++) for (j = y1; j <= y2; j++) {
var gi = i + j * this.gw;
var oew = this.grid[gi - 1];
var oee = this.grid[gi + 1];
var oen = this.grid[gi - this.gw];
var oes = this.grid[gi + this.gw];
var oe = this.grid[gi];
if (oe.conductor) continue;
if (oe.col != 0) {
oe.dazdt = oe.az;
continue;
}var az = oe.az;
var previ = oew.az;
if (oew.conductor) previ = (oee.conductor) ? az : oee.az;
var nexti = oee.az;
if (oee.conductor) nexti = (oew.conductor) ? az : oew.az;
var prevj = oen.az;
if (oen.conductor) prevj = (oes.conductor) ? az : oes.az;
var nextj = oes.az;
if (oes.conductor) nextj = (oen.conductor) ? az : oen.az;
oe.dazdt = .125 * (nexti + previ + nextj + prevj + 4 * az);
delta += Math.abs (oe.dazdt - az);
ct++;
}

delta /= ct;
for (i = x1; i <= x2; i++) for (j = y1; j <= y2; j++) {
var oe = this.grid[i + j * this.gw];
oe.az = oe.dazdt;
oe.dazdt = 0;
}

}
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "addConductor", 
function (x, y, cv) {
var oe = this.grid[x + this.gw * y];
oe.conductor = (cv == 0) ? false : true;
if (cv == 1) oe.az = oe.dazdt = 0;
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
c$.$EMWave1Frame$OscSource$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.x = 0;
this.y = 0;
this.v = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "OscSource");
Clazz.makeConstructor (c$, 
function (a, b) {
this.x = a;
this.y = b;
}, "~N,~N");
Clazz.defineMethod (c$, "getScreenX", 
function () {
return Clazz.doubleToInt (((this.x - this.b$["test.falstad.EMWave1Frame"].windowOffsetX) * this.b$["test.falstad.EMWave1Frame"].winSize.width + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].winSize.width / 2)) / this.b$["test.falstad.EMWave1Frame"].windowWidth);
});
Clazz.defineMethod (c$, "getScreenY", 
function () {
return Clazz.doubleToInt (((this.y - this.b$["test.falstad.EMWave1Frame"].windowOffsetY) * this.b$["test.falstad.EMWave1Frame"].winSize.height + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].winSize.height / 2)) / this.b$["test.falstad.EMWave1Frame"].windowHeight);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$OscElement$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.conductor = false;
this.jx = 0;
this.jy = 0;
this.damp = 0;
this.az = 0;
this.dazdt = 0;
this.dazdt2 = 0;
this.col = 0;
this.boundary = false;
this.gray = false;
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "OscElement");
Clazz.defineMethod (c$, "getType", 
function () {
if (this.conductor) return 1;
 else if (this.jx != 0 || this.jy != 0) return 2;
return 0;
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "Setup");
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
this.b$["test.falstad.EMWave1Frame"].setSources ();
});
Clazz.makeConstructor (c$, 
function () {
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$PlaneWaveSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "PlaneWaveSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Plane Wave";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (1);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (225);
this.b$["test.falstad.EMWave1Frame"].setForceBar (30);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.IntersectingPlaneWavesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$IntersectingPlaneWavesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "IntersectingPlaneWavesSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Intersecting Planes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (126);
this.b$["test.falstad.EMWave1Frame"].setForceBar (34);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (2);
this.b$["test.falstad.EMWave1Frame"].setSources ();
this.b$["test.falstad.EMWave1Frame"].sources[0].y = this.b$["test.falstad.EMWave1Frame"].sources[1].y = this.b$["test.falstad.EMWave1Frame"].windowOffsetY;
this.b$["test.falstad.EMWave1Frame"].sources[0].x = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + 1;
this.b$["test.falstad.EMWave1Frame"].sources[2].x = this.b$["test.falstad.EMWave1Frame"].sources[3].x = this.b$["test.falstad.EMWave1Frame"].windowOffsetX;
this.b$["test.falstad.EMWave1Frame"].sources[2].y = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 1;
this.b$["test.falstad.EMWave1Frame"].sources[3].y = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + this.b$["test.falstad.EMWave1Frame"].windowHeight - 1;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.ConductReflectSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$ConductReflectSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "ConductReflectSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Reflection At Conductor";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (7);
this.b$["test.falstad.EMWave1Frame"].addCondMedium (1);
this.b$["test.falstad.EMWave1Frame"].setForceBar (4);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (1600);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave1Frame"].setSources ();
this.b$["test.falstad.EMWave1Frame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2) - 1;
this.b$["test.falstad.EMWave1Frame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2) + 1;
this.b$["test.falstad.EMWave1Frame"].sources[0].y = this.b$["test.falstad.EMWave1Frame"].windowOffsetY;
this.b$["test.falstad.EMWave1Frame"].sources[1].y = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 2;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.OscDipoleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$OscDipoleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "OscDipoleSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Oscillating Dipole";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].setForceBar (10);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (1066);
this.b$["test.falstad.EMWave1Frame"].EBrightnessBar.setValue (300);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (1);
this.b$["test.falstad.EMWave1Frame"].setSources ();
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave1Frame"].sources[0].x = this.b$["test.falstad.EMWave1Frame"].sources[1].x = a;
this.b$["test.falstad.EMWave1Frame"].sources[0].y = b - 1;
this.b$["test.falstad.EMWave1Frame"].sources[1].y = b + 1;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.HalfWaveAnt1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$HalfWaveAnt1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "HalfWaveAnt1Setup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Half Wave Antenna";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].setForceBar (10);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (390);
this.b$["test.falstad.EMWave1Frame"].EBrightnessBar.setValue (350);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (4);
this.b$["test.falstad.EMWave1Frame"].setSources ();
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave1Frame"].sources[0].x = this.b$["test.falstad.EMWave1Frame"].sources[1].x = a;
this.b$["test.falstad.EMWave1Frame"].sources[0].y = b + 7;
this.b$["test.falstad.EMWave1Frame"].sources[1].y = b - 7;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.FullWaveAnt1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$FullWaveAnt1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "FullWaveAnt1Setup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Full Wave Ant (End-Driven)";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].setForceBar (25);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (390);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (4);
this.b$["test.falstad.EMWave1Frame"].setSources ();
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave1Frame"].sources[0].x = this.b$["test.falstad.EMWave1Frame"].sources[1].x = a;
this.b$["test.falstad.EMWave1Frame"].sources[0].y = b + 6;
this.b$["test.falstad.EMWave1Frame"].sources[1].y = b - 5;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.FullWaveAnt2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$FullWaveAnt2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "FullWaveAnt2Setup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Full Wave Ant (Center-Driven)";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].setForceBar (25);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (390);
});
Clazz.overrideMethod (c$, "doSetupSources", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (5);
this.b$["test.falstad.EMWave1Frame"].setSources ();
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeY / 2);
this.b$["test.falstad.EMWave1Frame"].sources[0].x = this.b$["test.falstad.EMWave1Frame"].sources[1].x = a;
this.b$["test.falstad.EMWave1Frame"].sources[2].x = this.b$["test.falstad.EMWave1Frame"].sources[3].x = a;
this.b$["test.falstad.EMWave1Frame"].sources[0].y = b + 1;
this.b$["test.falstad.EMWave1Frame"].sources[1].y = b + 6;
this.b$["test.falstad.EMWave1Frame"].sources[2].y = b;
this.b$["test.falstad.EMWave1Frame"].sources[3].y = b - 5;
this.b$["test.falstad.EMWave1Frame"].auxBar.setValue (40);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.OscCurrentLoop, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$OscCurrentLoop$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "OscCurrentLoop", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Current Loop";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (6);
this.b$["test.falstad.EMWave1Frame"].setSources ();
this.b$["test.falstad.EMWave1Frame"].sources[0].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2) - 1;
this.b$["test.falstad.EMWave1Frame"].sources[0].y = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeY / 2) - 1;
this.b$["test.falstad.EMWave1Frame"].sources[1].x = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2) + 1;
this.b$["test.falstad.EMWave1Frame"].sources[1].y = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeY / 2) + 1;
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (270);
this.b$["test.falstad.EMWave1Frame"].setForceBar (34);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.BigMode01Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$BigMode01Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "BigMode01Setup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Big TE01 Mode";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth * 3 / 4);
var c = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth / 2) - Clazz.doubleToInt (b / 2);
var d = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowHeight / 2) - Clazz.doubleToInt (b / 2);
for (a = 1; a != 4; a++) this.b$["test.falstad.EMWave1Frame"].conductDrawRect (c - a, d - a, c + b + a - 1, d + b + a - 1, 1);

this.b$["test.falstad.EMWave1Frame"].setupMode (c, d, b, b, 0, 1);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (200);
this.b$["test.falstad.EMWave1Frame"].EBrightnessBar.setValue (400);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.BigMode10Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$BigMode10Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "BigMode10Setup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Big TE10 Mode";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth * 3 / 4);
var c = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth / 2) - Clazz.doubleToInt (b / 2);
var d = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowHeight / 2) - Clazz.doubleToInt (b / 2);
for (a = 1; a != 4; a++) this.b$["test.falstad.EMWave1Frame"].conductDrawRect (c - a, d - a, c + b + a - 1, d + b + a - 1, 1);

this.b$["test.falstad.EMWave1Frame"].setupMode (c, d, b, b, 1, 0);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (200);
this.b$["test.falstad.EMWave1Frame"].EBrightnessBar.setValue (400);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.BigMode1001Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$BigMode1001Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "BigMode1001Setup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Big TE10+TE01 Mode";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth * 3 / 4);
var c = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth / 2) - Clazz.doubleToInt (b / 2);
var d = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowHeight / 2) - Clazz.doubleToInt (b / 2);
for (a = 1; a != 4; a++) this.b$["test.falstad.EMWave1Frame"].conductDrawRect (c - a, d - a, c + b + a - 1, d + b + a - 1, 1);

this.b$["test.falstad.EMWave1Frame"].setupMode (c, d, b, b, 1, 0);
this.b$["test.falstad.EMWave1Frame"].addMode (c, d, b, b, 0, 1);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (200);
this.b$["test.falstad.EMWave1Frame"].EBrightnessBar.setValue (250);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.BigMode1001iSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$BigMode1001iSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "BigMode1001iSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Big TE10+TE01i Mode";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth * 3 / 4);
var c = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth / 2) - Clazz.doubleToInt (b / 2);
var d = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowHeight / 2) - Clazz.doubleToInt (b / 2);
for (a = 1; a != 4; a++) this.b$["test.falstad.EMWave1Frame"].conductDrawRect (c - a, d - a, c + b + a - 1, d + b + a - 1, 1);

this.b$["test.falstad.EMWave1Frame"].setupMode (c, d, b, b, 1, 0);
this.b$["test.falstad.EMWave1Frame"].addModeI (c, d, b, b, 0, 1);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (200);
this.b$["test.falstad.EMWave1Frame"].EBrightnessBar.setValue (250);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.BigMode2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$BigMode2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "BigMode2Setup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Big TE11 Mode";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth * 3 / 4);
var c = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth / 2) - Clazz.doubleToInt (b / 2);
var d = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowHeight / 2) - Clazz.doubleToInt (b / 2);
for (a = 1; a != 4; a++) this.b$["test.falstad.EMWave1Frame"].conductDrawRect (c - a, d - a, c + b + a - 1, d + b + a - 1, 1);

this.b$["test.falstad.EMWave1Frame"].setupMode (c, d, b, b, 1, 1);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (200);
this.b$["test.falstad.EMWave1Frame"].EBrightnessBar.setValue (300);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.OneByOneModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$OneByOneModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "OneByOneModesSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TE10 Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 5;
while (c + d < this.b$["test.falstad.EMWave1Frame"].windowHeight) {
var e = (Clazz.doubleToInt ((c + d) * (this.b$["test.falstad.EMWave1Frame"].windowWidth - 8) / this.b$["test.falstad.EMWave1Frame"].windowHeight)) + 6;
var f = c + this.b$["test.falstad.EMWave1Frame"].windowOffsetY;
var g = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + 1;
this.b$["test.falstad.EMWave1Frame"].conductDrawRect (g - 1, f - 1, g + e, f + d, 1);
this.b$["test.falstad.EMWave1Frame"].setupMode (g, f, e, d, 1, 0);
c += d + 2;
}
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (250);
this.b$["test.falstad.EMWave1Frame"].EBrightnessBar.setValue (300);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.NByZeroModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$NByZeroModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "NByZeroModesSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TEn0 Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 6;
var e = this.b$["test.falstad.EMWave1Frame"].windowWidth - 2;
var f = 1;
while (c + d < this.b$["test.falstad.EMWave1Frame"].windowHeight) {
var g = c + this.b$["test.falstad.EMWave1Frame"].windowOffsetY;
var h = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + 1;
this.b$["test.falstad.EMWave1Frame"].conductDrawRect (h - 1, g - 1, h + e, g + d, 1);
this.b$["test.falstad.EMWave1Frame"].setupMode (h, g, e, d, f, 0);
c += d + 2;
f++;
}
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (200);
this.b$["test.falstad.EMWave1Frame"].EBrightnessBar.setValue (128);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.NByOneModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$NByOneModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "NByOneModesSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TEn1 Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 10;
var e = this.b$["test.falstad.EMWave1Frame"].windowWidth - 2;
var f = 1;
while (c + d < this.b$["test.falstad.EMWave1Frame"].windowHeight) {
var g = c + this.b$["test.falstad.EMWave1Frame"].windowOffsetY;
var h = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + 1;
this.b$["test.falstad.EMWave1Frame"].conductDrawRect (h - 1, g - 1, h + e, g + d, 1);
this.b$["test.falstad.EMWave1Frame"].setupMode (h, g, e, d, f, 1);
c += d + 2;
f++;
}
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (150);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.NByNModesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$NByNModesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "NByNModesSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TEnn Modes";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d;
var e;
var f = 3;
if (this.b$["test.falstad.EMWave1Frame"].resBar.getValue () >= 70) f++;
if (this.b$["test.falstad.EMWave1Frame"].resBar.getValue () >= 100) f++;
var g = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowHeight / f) - 2;
var h = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth / f) - 2;
for (d = 1; d <= f; d++) for (e = 1; e <= f; e++) {
if (d == 1 && e == 1) continue;
var i = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + 1 + (g + 2) * (e - 1);
var j = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 1 + (h + 2) * (d - 1);
this.b$["test.falstad.EMWave1Frame"].conductDrawRect (i - 1, j - 1, i + h, j + g, 1);
this.b$["test.falstad.EMWave1Frame"].setupMode (i, j, h, g, d - 1, e - 1);
}

this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (300);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.ZeroByNModeCombosSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$ZeroByNModeCombosSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "ZeroByNModeCombosSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TEn0 Mode Combos";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 8;
var e = this.b$["test.falstad.EMWave1Frame"].windowWidth - 2;
while (c + d < this.b$["test.falstad.EMWave1Frame"].windowHeight) {
var f = this.b$["test.falstad.EMWave1Frame"].getrand (8) + 1;
var g;
do g = this.b$["test.falstad.EMWave1Frame"].getrand (8) + 1;
 while (f == g);
var h = c + this.b$["test.falstad.EMWave1Frame"].windowOffsetY;
var i = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + 1;
this.b$["test.falstad.EMWave1Frame"].conductDrawRect (i - 1, h - 1, i + e, h + d, 1);
var j = (Clazz.instanceOf (this, test.falstad.EMWave1Frame.ZeroByNModeCombosSetup)) ? 0 : 1;
for (a = 0; a != e; a++) for (b = 0; b != d; b++) {
this.b$["test.falstad.EMWave1Frame"].grid[a + i + this.b$["test.falstad.EMWave1Frame"].gw * (b + h)].az = 2 * (Math.cos (f * 3.141592653589793 * a / (e - 1)) * Math.cos (3.141592653589793 * j * b / (d - 1)) * .5 + Math.cos (g * 3.141592653589793 * a / (e - 1)) * Math.cos (3.141592653589793 * j * b / (d - 1)) * .5);
this.b$["test.falstad.EMWave1Frame"].grid[a + i + this.b$["test.falstad.EMWave1Frame"].gw * (b + h)].dazdt = 0;
}

c += d + 2;
}
this.b$["test.falstad.EMWave1Frame"].noFilter ();
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (310);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.OneByNModeCombosSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$OneByNModeCombosSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "OneByNModeCombosSetup", test.falstad.EMWave1Frame.ZeroByNModeCombosSetup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.ZeroByNModeCombosSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TEn1 Mode Combos";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.NByNModeCombosSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$NByNModeCombosSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "NByNModeCombosSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "TEnn Mode Combos";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b;
var c = 1;
var d = 2;
if (this.b$["test.falstad.EMWave1Frame"].resBar.getValue () >= 70) d++;
if (this.b$["test.falstad.EMWave1Frame"].resBar.getValue () >= 100) d++;
var e = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowHeight / d) - 2;
var f = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth / d) - 2;
var g;
var h;
for (g = 1; g <= d; g++) for (h = 1; h <= d; h++) {
var i = this.b$["test.falstad.EMWave1Frame"].getrand (4);
var j = this.b$["test.falstad.EMWave1Frame"].getrand (4) + 1;
var k;
var l;
do {
k = this.b$["test.falstad.EMWave1Frame"].getrand (4) + 1;
l = this.b$["test.falstad.EMWave1Frame"].getrand (4);
} while (i == k && j == l);
var m = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + 1 + (e + 2) * (g - 1);
var n = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 1 + (f + 2) * (h - 1);
this.b$["test.falstad.EMWave1Frame"].conductDrawRect (m - 1, n - 1, m + f, n + e, 1);
for (a = 0; a != f; a++) for (b = 0; b != e; b++) {
this.b$["test.falstad.EMWave1Frame"].grid[a + m + this.b$["test.falstad.EMWave1Frame"].gw * (b + n)].az = 2 * (Math.cos (i * 3.141592653589793 * a / (f - 1)) * Math.cos (j * 3.141592653589793 * b / (e - 1)) * .5 + Math.cos (k * 3.141592653589793 * a / (f - 1)) * Math.cos (l * 3.141592653589793 * b / (e - 1)) * .5);
this.b$["test.falstad.EMWave1Frame"].grid[a + m + this.b$["test.falstad.EMWave1Frame"].gw * (b + n)].dazdt = 0;
}

}

this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (370);
this.b$["test.falstad.EMWave1Frame"].noFilter ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Waveguides1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$Waveguides1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "Waveguides1Setup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Waveguides";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (1);
var a;
var b;
var c = 1;
var d = 5;
var e = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 1;
while (c + d < this.b$["test.falstad.EMWave1Frame"].windowWidth) {
var f = c + this.b$["test.falstad.EMWave1Frame"].windowOffsetX;
this.b$["test.falstad.EMWave1Frame"].conductDrawRect (f - 1, e - 1, f - 1, this.b$["test.falstad.EMWave1Frame"].gridSizeY - 1, 1);
this.b$["test.falstad.EMWave1Frame"].conductDrawRect (f + d, e - 1, f + d, this.b$["test.falstad.EMWave1Frame"].gridSizeY - 1, 1);
d += 2;
c += d;
}
this.b$["test.falstad.EMWave1Frame"].conductDrawRect (c - 1 + this.b$["test.falstad.EMWave1Frame"].windowOffsetX, e, this.b$["test.falstad.EMWave1Frame"].gridSizeX - 1, e, 1);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (215);
this.b$["test.falstad.EMWave1Frame"].setForceBar (28);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.CapacitorSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$CapacitorSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "CapacitorSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Capacitor";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (0);
var a;
var b = (this.b$["test.falstad.EMWave1Frame"].windowWidth > 45) ? 45 : this.b$["test.falstad.EMWave1Frame"].windowWidth;
var c = Clazz.doubleToInt (b * 3 / 4);
var d = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth / 2);
var e = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowHeight / 2);
var f = d - Clazz.doubleToInt (c / 2);
var g = e - Clazz.doubleToInt (c / 2);
for (a = 1; a != 4; a++) this.b$["test.falstad.EMWave1Frame"].conductDrawRect (f - a, g - a, f + c + a - 1, g + c + a - 1, 1);

this.b$["test.falstad.EMWave1Frame"].setupMode (f, g, c, c, 1, 0);
this.b$["test.falstad.EMWave1Frame"].conductFillRect (f, g, f + c, g + 4, 1);
this.b$["test.falstad.EMWave1Frame"].conductFillRect (f, g + c - 4, f + c, g + c - 1, 1);
var h = 4;
this.b$["test.falstad.EMWave1Frame"].conductFillRect (d - 2, g, d + 2, e - h, 1);
this.b$["test.falstad.EMWave1Frame"].conductFillRect (d - 2, e + h, d + 2, g + c, 1);
this.b$["test.falstad.EMWave1Frame"].conductFillRect (d - 5, e - (h + 1), d + 5, e - (h - 1), 1);
this.b$["test.falstad.EMWave1Frame"].conductFillRect (d - 5, e + (h - 1), d + 5, e + (h + 1), 1);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (700);
this.b$["test.falstad.EMWave1Frame"].EBrightnessBar.setValue (200);
this.b$["test.falstad.EMWave1Frame"].findMode (f, g, f + c, g + c);
this.b$["test.falstad.EMWave1Frame"].noFilter ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.ResonantCavitiesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$ResonantCavitiesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "ResonantCavitiesSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Resonant Cavities";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (1);
var a;
var b;
var c = 1;
var d = 3;
var e = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 11;
while (c + d < this.b$["test.falstad.EMWave1Frame"].windowWidth) {
var f = (Clazz.doubleToInt ((c + d) * (this.b$["test.falstad.EMWave1Frame"].windowHeight - 18) / this.b$["test.falstad.EMWave1Frame"].windowWidth)) + 6;
var g = c + this.b$["test.falstad.EMWave1Frame"].windowOffsetX;
for (a = 0; a != f + 2; a++) this.b$["test.falstad.EMWave1Frame"].grid[g - 1 + this.b$["test.falstad.EMWave1Frame"].gw * (e + a - 1)].conductor = this.b$["test.falstad.EMWave1Frame"].grid[g + d + this.b$["test.falstad.EMWave1Frame"].gw * (e + a - 1)].conductor = true;

for (b = 0; b != d + 2; b++) this.b$["test.falstad.EMWave1Frame"].grid[g + b - 1 + this.b$["test.falstad.EMWave1Frame"].gw * (e - 1)].conductor = this.b$["test.falstad.EMWave1Frame"].grid[g + b - 1 + this.b$["test.falstad.EMWave1Frame"].gw * (e + f)].conductor = true;

this.b$["test.falstad.EMWave1Frame"].grid[g + Clazz.doubleToInt (d / 2) + this.b$["test.falstad.EMWave1Frame"].gw * (e - 1)].conductor = false;
c += d + 2;
}
c--;
for (; c < this.b$["test.falstad.EMWave1Frame"].windowWidth; c++) this.b$["test.falstad.EMWave1Frame"].grid[c + this.b$["test.falstad.EMWave1Frame"].windowOffsetX + this.b$["test.falstad.EMWave1Frame"].gw * (e - 1)].conductor = true;

this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (120);
this.b$["test.falstad.EMWave1Frame"].setForceBar (15);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.SingleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$SingleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "SingleSlitSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Single Slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (1);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2);
var b = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 4;
this.b$["test.falstad.EMWave1Frame"].conductFillRect (0, b, this.b$["test.falstad.EMWave1Frame"].gridSizeX - 1, b + 2, 1);
this.b$["test.falstad.EMWave1Frame"].conductFillRect (a - 7, b, a + 7, b + 2, 0);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (275);
this.b$["test.falstad.EMWave1Frame"].setForceBar (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.DoubleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$DoubleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "DoubleSlitSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Double Slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (1);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2);
var b = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 4;
this.b$["test.falstad.EMWave1Frame"].conductFillRect (0, b, this.b$["test.falstad.EMWave1Frame"].gridSizeX - 1, b + 2, 1);
this.b$["test.falstad.EMWave1Frame"].conductFillRect (a - 7, b, a - 5, b + 2, 0);
this.b$["test.falstad.EMWave1Frame"].conductFillRect (a + 5, b, a + 7, b + 2, 0);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (366);
this.b$["test.falstad.EMWave1Frame"].setForceBar (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.TripleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$TripleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "TripleSlitSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Triple Slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (1);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2);
var b = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 4;
this.b$["test.falstad.EMWave1Frame"].conductFillRect (0, b, this.b$["test.falstad.EMWave1Frame"].gridSizeX - 1, b + 2, 1);
this.b$["test.falstad.EMWave1Frame"].conductFillRect (a - 13, b, a - 11, b + 2, 0);
this.b$["test.falstad.EMWave1Frame"].conductFillRect (a - 1, b, a + 1, b + 2, 0);
this.b$["test.falstad.EMWave1Frame"].conductFillRect (a + 11, b, a + 13, b + 2, 0);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (310);
this.b$["test.falstad.EMWave1Frame"].setForceBar (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.ObstacleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$ObstacleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "ObstacleSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Obstacle";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (1);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].gridSizeX / 2);
var b = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 6;
this.b$["test.falstad.EMWave1Frame"].conductFillRect (a - 7, b, a + 7, b + 2, 1);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (400);
this.b$["test.falstad.EMWave1Frame"].setForceBar (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.HalfPlaneSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$HalfPlaneSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "HalfPlaneSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Half Plane";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (1);
var a = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth / 2);
var b;
this.b$["test.falstad.EMWave1Frame"].conductFillRect (this.b$["test.falstad.EMWave1Frame"].windowOffsetX + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowWidth * 2 / 3), this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 3, this.b$["test.falstad.EMWave1Frame"].windowOffsetY + this.b$["test.falstad.EMWave1Frame"].windowWidth - 1, this.b$["test.falstad.EMWave1Frame"].windowOffsetY + 5, 1);
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (250);
this.b$["test.falstad.EMWave1Frame"].setForceBar (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMWave1Frame.LloydsMirrorSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMWave1Frame$LloydsMirrorSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMWave1Frame, "LloydsMirrorSetup", test.falstad.EMWave1Frame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMWave1Frame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Lloyd's Mirror";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMWave1Frame"].sourceChooser.select (6);
this.b$["test.falstad.EMWave1Frame"].setSources ();
this.b$["test.falstad.EMWave1Frame"].sources[0].x = this.b$["test.falstad.EMWave1Frame"].windowOffsetX;
this.b$["test.falstad.EMWave1Frame"].sources[0].y = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowHeight * 3 / 4) - 1;
this.b$["test.falstad.EMWave1Frame"].sources[1].x = this.b$["test.falstad.EMWave1Frame"].windowOffsetX + 2;
this.b$["test.falstad.EMWave1Frame"].sources[1].y = this.b$["test.falstad.EMWave1Frame"].windowOffsetY + Clazz.doubleToInt (this.b$["test.falstad.EMWave1Frame"].windowHeight * 3 / 4) + 1;
this.b$["test.falstad.EMWave1Frame"].brightnessBar.setValue (250);
this.b$["test.falstad.EMWave1Frame"].setForceBar (40);
this.b$["test.falstad.EMWave1Frame"].conductDrawRect (0, this.b$["test.falstad.EMWave1Frame"].windowOffsetY + this.b$["test.falstad.EMWave1Frame"].windowHeight - 1, this.b$["test.falstad.EMWave1Frame"].gridSizeX - 1, this.b$["test.falstad.EMWave1Frame"].windowOffsetY + this.b$["test.falstad.EMWave1Frame"].windowHeight - 1, 1);
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
"MODE_M_POS", 1,
"MODE_M_NEG", 2,
"MODE_CLEAR", 3,
"VIEW_E", 0,
"VIEW_E_LINES", 1,
"VIEW_B", 2,
"VIEW_Q", 3,
"VIEW_J", 4,
"VIEW_E_B", 5,
"VIEW_E_LINES_B", 6,
"VIEW_E_B_Q_J", 7,
"VIEW_E_LINES_B_Q_J", 8,
"VIEW_E_Q", 9,
"VIEW_E_LINES_Q", 10,
"VIEW_E_B_J", 11,
"VIEW_E_LINES_B_J", 12,
"VIEW_POYNTING", 13,
"VIEW_ENERGY", 14,
"VIEW_POYNTING_ENERGY", 15,
"VIEW_DISP_CUR", 16,
"VIEW_DISP_J", 17,
"VIEW_DISP_J_B", 18,
"VIEW_DB_DT", 19,
"VIEW_NONE", -1,
"TYPE_CONDUCTOR", 1,
"TYPE_CURRENT", 2,
"TYPE_NONE", 0,
"SRC_NONE", 0,
"SRC_1PLANE", 1,
"SRC_2PLANE", 2,
"SRC_1PLANE_PACKET", 3,
"SRC_1ANTENNA", 4,
"SRC_2ANTENNA", 5,
"SRC_1LOOP", 6,
"SRC_1LOOP_PACKET", 7,
"SRC_PLANE", 1,
"SRC_ANTENNA", 2,
"SRC_LOOP", 3);
});
