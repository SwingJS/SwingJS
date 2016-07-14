Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.EMBox", "$.EMBoxCanvas", "$.EMBoxFrame", "$.EMBoxLayout"], ["java.awt.Color", "$.Dimension", "$.Rectangle", "java.awt.image.MemoryImageSource", "java.util.Random", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "EMBoxCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.EMBoxCanvas, []);
this.pg = p;
}, "test.falstad.EMBoxFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateEMBox (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateEMBox (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "EMBoxLayout", null, java.awt.LayoutManager);
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
return  new java.awt.Dimension (500, 550);
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
}, test.falstad, "EMBox", swingjs.awt.Applet);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.EMBox.oc != null) test.falstad.EMBox.oc.dispose ();
test.falstad.EMBox.oc = null;
});
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.EMBox.oc == null) {
this.started = true;
test.falstad.EMBox.oc =  new test.falstad.EMBoxFrame (this);
test.falstad.EMBox.oc.init ();
this.repaint ();
}});
Clazz.overrideMethod (c$, "init", 
function () {
test.falstad.EMBox.oc =  new test.falstad.EMBoxFrame (this);
test.falstad.EMBox.oc.init ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.EMBox.oc =  new test.falstad.EMBoxFrame (null);
test.falstad.EMBox.oc.init ();
}, "~A");
Clazz.overrideMethod (c$, "destroy", 
function () {
if (test.falstad.EMBox.oc != null) test.falstad.EMBox.oc.dispose ();
test.falstad.EMBox.oc = null;
});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.EMBox.oc == null) s = "Applet is finished.";
 else if (test.falstad.EMBox.oc.useFrame) test.falstad.EMBox.oc.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.EMBox, "paint", [g]);
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
this.clearButton = null;
this.resetPartButton = null;
this.memoryImageSourceCheck = null;
this.stoppedCheck = null;
this.stopOscCheck = null;
this.spectrumCheck = null;
this.sidesCheck = null;
this.modeChooser = null;
this.sliceChooser = null;
this.emChooser = null;
this.dispChooser = null;
this.speedBar = null;
this.partSpeedBar = null;
this.resolutionBar = null;
this.vecDensityBar = null;
this.brightnessBar = null;
this.widthBar = null;
this.heightBar = null;
this.partCountBar = null;
this.freqBar = null;
this.dragZoomStart = 0;
this.zoom = 6.5;
this.sliceval = 0;
this.rotmatrix = null;
this.cameraPos = null;
this.selectedMinOmega = 0;
this.selectedMaxOmega = 0;
this.view3d = null;
this.view3d_e = null;
this.view3d_b = null;
this.viewAxes = null;
this.viewSpectrum = null;
this.viewFreq = null;
this.colorMult = 0;
this.vectorSpacing = 16;
this.xpoints = null;
this.ypoints = null;
this.slicerPoints = null;
this.sliceFaces = null;
this.sliceFace = null;
this.particles = null;
this.density = null;
this.spectrum = null;
this.func = null;
this.boxwidth = 2;
this.boxheight = 2;
this.boxdepth = 2;
this.boxGuideMult = 1;
this.dragging = false;
this.selectedSlice = false;
this.imageSource = null;
this.pixels = null;
this.maxTerms = 16;
this.maxModes = 10;
this.maxDispCoefs = 5;
this.maxZDispCoefs = 5;
this.viewDistance = 12;
this.modes = null;
this.modeCount = 0;
this.pause = 0;
this.applet = null;
this.selection = -1;
this.selectedCoefX = -1;
this.selectedCoefY = 0;
this.selectedCoefZ = 0;
this.selectedCoefTEMode = false;
this.sampleMult = null;
this.curfieldno = 0;
this.magDragStart = 0;
this.dragX = 0;
this.dragY = 0;
this.oldDragX = 0;
this.oldDragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.t = 0;
this.sidemap = null;
if (!Clazz.isClassDefined ("test.falstad.EMBoxFrame.DynControl")) {
test.falstad.EMBoxFrame.$EMBoxFrame$DynControl$ ();
}
this.dynControls = null;
this.cv = null;
this.useFrame = false;
this.showControls = false;
this.main = null;
this.shown = false;
this.allQuiet = false;
this.logep2 = 0;
this.rediscount = 0;
this.finished = false;
if (!Clazz.isClassDefined ("test.falstad.EMBoxFrame.Mode")) {
test.falstad.EMBoxFrame.$EMBoxFrame$Mode$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMBoxFrame.ModeData")) {
test.falstad.EMBoxFrame.$EMBoxFrame$ModeData$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMBoxFrame.DrawData")) {
test.falstad.EMBoxFrame.$EMBoxFrame$DrawData$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMBoxFrame.Particle")) {
test.falstad.EMBoxFrame.$EMBoxFrame$Particle$ ();
}
this.boundCheck = false;
this.oldY = null;
this.rk_k1 = null;
this.rk_k2 = null;
this.rk_k3 = null;
this.rk_k4 = null;
this.rk_yn = null;
this.rk_Y = null;
this.rk_Yhalf = null;
this.rk_oldY = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "EMBoxFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.prepareFields (c$, function () {
this.rk_k1 =  Clazz.newDoubleArray (6, 0);
this.rk_k2 =  Clazz.newDoubleArray (6, 0);
this.rk_k3 =  Clazz.newDoubleArray (6, 0);
this.rk_k4 =  Clazz.newDoubleArray (6, 0);
this.rk_yn =  Clazz.newDoubleArray (6, 0);
this.rk_Y =  Clazz.newDoubleArray (6, 0);
this.rk_Yhalf =  Clazz.newDoubleArray (6, 0);
this.rk_oldY =  Clazz.newDoubleArray (6, 0);
});
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "EMBox by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.EMBoxFrame, ["EM Modes Applet"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.EMBox");
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
var os = System.getProperty ("os.name");
var jv = System.getProperty ("java.version");
var altRender = false;
var res = 54;
if (os.indexOf ("Windows") == 0) {
res = 100;
if (jv.indexOf ("1.1") == 0) altRender = true;
}this.main.setLayout ( new test.falstad.EMBoxLayout ());
this.cv =  new test.falstad.EMBoxCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.main.add (this.clearButton =  new swingjs.awt.Button ("Clear"));
this.clearButton.addActionListener (this);
this.main.add (this.resetPartButton =  new swingjs.awt.Button ("Reset Particles"));
this.resetPartButton.addActionListener (this);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stop");
this.stoppedCheck.addItemListener (this);
this.main.add (this.stoppedCheck);
this.stopOscCheck =  new swingjs.awt.Checkbox ("Stop Oscillation");
this.stopOscCheck.addItemListener (this);
this.main.add (this.stopOscCheck);
this.spectrumCheck =  new swingjs.awt.Checkbox ("Show Spectrum");
this.spectrumCheck.addItemListener (this);
this.main.add (this.spectrumCheck);
this.memoryImageSourceCheck =  new swingjs.awt.Checkbox ("Alternate Rendering", altRender);
this.memoryImageSourceCheck.addItemListener (this);
this.main.add (this.memoryImageSourceCheck);
this.sidesCheck =  new swingjs.awt.Checkbox ("Show Sides");
this.sidesCheck.addItemListener (this);
this.main.add (this.sidesCheck);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Adjust Angle");
this.modeChooser.add ("Mouse = Adjust Zoom");
this.modeChooser.addItemListener (this);
this.main.add (this.modeChooser);
this.sliceChooser =  new swingjs.awt.Choice ();
this.sliceChooser.add ("No Slicing");
this.sliceChooser.add ("Show X Slice");
this.sliceChooser.add ("Show Y Slice");
this.sliceChooser.add ("Show Z Slice");
this.sliceChooser.addItemListener (this);
this.main.add (this.sliceChooser);
this.emChooser =  new swingjs.awt.Choice ();
this.emChooser.add ("Show Electric Field");
this.emChooser.add ("Show Magnetic Field");
this.emChooser.add ("Show Both Fields");
this.emChooser.add ("Show Current");
this.emChooser.add ("Show Charge");
this.emChooser.addItemListener (this);
this.main.add (this.emChooser);
this.dispChooser =  new swingjs.awt.Choice ();
this.dispChooser.add ("Show Particles on Field Lines");
this.dispChooser.add ("Show Field Magnitude");
this.dispChooser.add ("Show Field X");
this.dispChooser.add ("Show Field Y");
this.dispChooser.add ("Show Field Z");
this.dispChooser.add ("Show Field (tri-color)");
this.dispChooser.add ("Show Field Vectors");
this.dispChooser.addItemListener (this);
this.main.add (this.dispChooser);
this.dispChooser.select (5);
this.dynControls =  new Array (6);
this.main.add ( new swingjs.awt.Label ("Oscillation Speed", 0));
this.main.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 15, 1, 1, 200));
this.speedBar.addAdjustmentListener (this);
var lab;
this.main.add (lab =  new swingjs.awt.Label ("Number of Particles", 0));
this.main.add (this.partCountBar =  new swingjs.awt.Scrollbar (0, 500, 1, 1, 1000));
this.partCountBar.addAdjustmentListener (this);
this.dynControls[0] = Clazz.innerTypeInstance (test.falstad.EMBoxFrame.DynControl, this, null, this.partCountBar, lab, 0);
this.main.add (lab =  new swingjs.awt.Label ("Particle Speed", 0));
this.main.add (this.partSpeedBar =  new swingjs.awt.Scrollbar (0, 90, 1, 1, 200));
this.partSpeedBar.addAdjustmentListener (this);
this.dynControls[1] = Clazz.innerTypeInstance (test.falstad.EMBoxFrame.DynControl, this, null, this.partSpeedBar, lab, 0);
this.main.add (lab =  new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 28, 1, 1, 200));
this.brightnessBar.addAdjustmentListener (this);
this.dynControls[2] = Clazz.innerTypeInstance (test.falstad.EMBoxFrame.DynControl, this, null, this.brightnessBar, lab, 1, 6);
this.main.add (lab =  new swingjs.awt.Label ("Image Resolution", 0));
this.main.add (this.resolutionBar =  new swingjs.awt.Scrollbar (0, res, 1, 20, 200));
this.resolutionBar.addAdjustmentListener (this);
this.dynControls[3] = Clazz.innerTypeInstance (test.falstad.EMBoxFrame.DynControl, this, null, this.resolutionBar, lab, 1);
this.main.add (lab =  new swingjs.awt.Label ("Vector Density", 0));
this.main.add (this.vecDensityBar =  new swingjs.awt.Scrollbar (0, 10, 1, 2, 64));
this.vecDensityBar.addAdjustmentListener (this);
this.dynControls[4] = Clazz.innerTypeInstance (test.falstad.EMBoxFrame.DynControl, this, null, this.vecDensityBar, lab, 6);
this.main.add ( new swingjs.awt.Label ("Width", 0));
this.main.add (this.widthBar =  new swingjs.awt.Scrollbar (0, 10, 1, 5, 31));
this.widthBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Height", 0));
this.main.add (this.heightBar =  new swingjs.awt.Scrollbar (0, 10, 1, 5, 31));
this.heightBar.addAdjustmentListener (this);
var freqLabel;
this.main.add (freqLabel =  new swingjs.awt.Label ("Driving Frequency", 0));
this.main.add (this.freqBar =  new swingjs.awt.Scrollbar (0, 10, 1, 5, 50));
this.freqBar.addAdjustmentListener (this);
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
if (!test.falstad.EMBoxFrame.waveguide) this.vecDensityBar.setValue (16);
if (test.falstad.EMBoxFrame.waveguide) {
this.boxGuideMult = 3;
this.boxdepth *= this.boxGuideMult;
this.maxZDispCoefs = 2;
this.zoom = 3.25;
this.spectrumCheck.hide ();
} else {
this.freqBar.hide ();
freqLabel.hide ();
}this.modes =  new Array (this.maxModes);
this.addMode (1, 0, 1, true).magcoef = 1;
this.slicerPoints =  Clazz.newIntArray (2, 10, 0);
this.sliceFaces =  Clazz.newDoubleArray (4, 3, 0);
this.rotmatrix =  Clazz.newDoubleArray (9, 0);
this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.rotate (-1.5707963267948966, 0);
this.rotate (-0.7853981633974483, 0.7853981633974483);
this.xpoints =  Clazz.newIntArray (4, 0);
this.ypoints =  Clazz.newIntArray (4, 0);
this.density =  Clazz.newIntArray (4, 4, 4, 0);
var i;
this.sampleMult =  Clazz.newIntArray (15, 0);
for (i = 1; i < 15; i += 2) {
this.sampleMult[i] = 4;
this.sampleMult[i + 1] = 2;
}
this.sampleMult[0] = this.sampleMult[14] = 1;
this.sidemap =  Clazz.newIntArray (6, 3, 0);
for (i = 0; i != 3; i++) {
this.sidemap[i * 2][i] = 1;
this.sidemap[i * 2 + 1][i] = -1;
}
this.random =  new java.util.Random ();
this.particles =  new Array (1000);
for (i = 0; i != 1000; i++) this.particles[i] = Clazz.innerTypeInstance (test.falstad.EMBoxFrame.Particle, this, null);

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
}this.finished = true;
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
this.calcSpectrum ();
this.dbimage = this.createImage (d.width, d.height);
this.setupDisplay ();
var w = this.view3d.width;
if (this.emChooser.getSelectedIndex () == 2) w /= 2;
this.pixels =  Clazz.newIntArray (w * this.view3d.height, 0);
var i;
for (i = 0; i != w * this.view3d.height; i++) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (w, this.view3d.height, this.pixels, 0, w);
this.resetParticles ();
this.setDynamicControls ();
});
Clazz.defineMethod (c$, "getTermWidth", 
function () {
return 8;
});
Clazz.defineMethod (c$, "resetDensityGroups", 
function () {
var i;
var j;
var k;
for (i = 0; i != 4; i++) for (j = 0; j != 4; j++) for (k = 0; k != 4; k++) this.density[i][j][k] = 0;



var slice = this.sliceChooser.getSelectedIndex ();
var sliced = (slice > 0);
var pcount = this.getParticleCount ();
for (i = 0; i != pcount; i++) {
var p = this.particles[i];
if (sliced) p.pos[slice - 1] = this.sliceval;
this.addToDensityGroup (p);
}
for (; i != 1000; i++) {
var p = this.particles[i];
p.lifetime = -100;
}
});
Clazz.defineMethod (c$, "addToDensityGroup", 
function (p) {
var a = Clazz.doubleToInt ((p.pos[0] + 1) / 0.505);
var b = Clazz.doubleToInt ((p.pos[1] + 1) / 0.505);
var c = Clazz.doubleToInt ((p.pos[2] + 1) / 0.505);
var n = 0;
try {
n = ++this.density[a][b][c];
if (n > 1000) System.out.print (a + " " + b + " " + c + " " + this.density[a][b][c] + "\n");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.print (p.pos[0] + " " + p.pos[1] + " " + p.pos[2] + "\n");
e.printStackTrace ();
} else {
throw e;
}
}
return n;
}, "test.falstad.EMBoxFrame.Particle");
Clazz.defineMethod (c$, "removeFromDensityGroup", 
function (p) {
var a = Clazz.doubleToInt ((p.pos[0] + 1) / 0.505);
var b = Clazz.doubleToInt ((p.pos[1] + 1) / 0.505);
var c = Clazz.doubleToInt ((p.pos[2] + 1) / 0.505);
try {
if (--this.density[a][b][c] < 0) System.out.print (a + " " + b + " " + c + " " + this.density[a][b][c] + "\n");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.print (p.pos[0] + " " + p.pos[1] + " " + p.pos[2] + "\n");
e.printStackTrace ();
} else {
throw e;
}
}
}, "test.falstad.EMBoxFrame.Particle");
Clazz.defineMethod (c$, "positionParticle", 
function (p) {
var x;
var y;
var z;
var bestx = 0;
var besty = 0;
var bestz = 0;
var best = 10000;
var randaddx = this.getrand (4);
var randaddy = this.getrand (4);
var randaddz = this.getrand (4);
var gm1 = 3;
for (x = 0; x != 4; x++) for (y = 0; y != 4; y++) for (z = 0; z != 4; z++) {
var ix = (randaddx + x) % 4;
var iy = (randaddy + y) % 4;
var iz = (randaddz + z) % 4;
if (this.sidesCheck.getState () && !(ix == 0 || ix == gm1 || iy == 0 || iy == gm1 || (!test.falstad.EMBoxFrame.waveguide && (iz == 0 || iz == gm1)))) continue;
if (this.density[ix][iy][iz] <= best) {
bestx = ix;
besty = iy;
bestz = iz;
best = this.density[ix][iy][iz];
}}


p.pos[0] = bestx * 0.505 + this.getrand (100) * 0.505 / 100.0 - 1;
p.pos[1] = besty * 0.505 + this.getrand (100) * 0.505 / 100.0 - 1;
p.pos[2] = bestz * 0.505 + this.getrand (100) * 0.505 / 100.0 - 1;
p.lifetime = 500;
if (this.sidesCheck.getState ()) {
var s = 0;
if (bestx == gm1) s = 0;
 else if (bestx == 0) s = 1;
 else if (besty == gm1) s = 2;
 else if (besty == 0) s = 3;
 else if (bestz == gm1) s = 4;
 else s = 5;
if (test.falstad.EMBoxFrame.waveguide && s >= 4) p.lifetime = -1;
p.side = s;
p.pos[Clazz.doubleToInt (p.side / 2)] = this.sidemap[p.side][Clazz.doubleToInt (p.side / 2)];
}}, "test.falstad.EMBoxFrame.Particle");
Clazz.defineMethod (c$, "getParticleCount", 
function () {
return this.partCountBar.getValue ();
});
Clazz.defineMethod (c$, "resetParticles", 
function () {
var pcount = this.getParticleCount ();
var i;
var j;
var k;
for (i = 0; i != pcount; i++) {
var p = this.particles[i];
for (j = 0; j != 3; j++) p.pos[j] = this.getrand (200) / 100.0 - 1;

p.lifetime = i * 2;
if (this.sidesCheck.getState ()) {
p.side = this.getrand (test.falstad.EMBoxFrame.waveguide ? 4 : 6);
p.pos[Clazz.doubleToInt (p.side / 2)] = this.sidemap[p.side][Clazz.doubleToInt (p.side / 2)];
}}
this.resetDensityGroups ();
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
Clazz.defineMethod (c$, "setMaxTerms", 
function () {
this.gridSizeX = this.gridSizeY = (this.resolutionBar.getValue () & -2);
this.maxTerms = this.gridSizeX;
if (this.maxTerms > 100) this.maxTerms = 100;
this.func =  Clazz.newFloatArray (this.gridSizeX, this.gridSizeY, 3, 0);
this.regenData ();
});
Clazz.defineMethod (c$, "regenData", 
function () {
var i;
for (i = 0; i != this.modeCount; i++) this.modes[i].modeDatas[0].data = this.modes[i].modeDatas[1].data = null;

});
Clazz.defineMethod (c$, "setupDisplay", 
function () {
var perColumn = 2;
var perRow = this.maxZDispCoefs;
var freqHeight = this.getTermWidth () * (this.maxDispCoefs + 1) * perColumn;
var spectrumHeight = (this.spectrumCheck.getState ()) ? this.getTermWidth () * 6 : 0;
this.view3d =  new java.awt.Rectangle (0, 0, this.winSize.width, this.winSize.height - freqHeight - spectrumHeight);
this.view3d_e =  new java.awt.Rectangle (this.view3d);
this.view3d_e.width /= 2;
this.view3d_b =  new java.awt.Rectangle (this.view3d);
this.view3d_b.width /= 2;
this.view3d_b.x += this.view3d_b.width;
if (this.spectrumCheck.getState ()) this.viewSpectrum =  new java.awt.Rectangle (0, this.view3d.height, this.winSize.width, spectrumHeight);
 else this.viewSpectrum = null;
this.viewAxes =  new java.awt.Rectangle (this.winSize.width - 100, 0, 100, 100);
this.viewFreq =  new Array (this.maxZDispCoefs * 2);
var i;
var winw = this.getTermWidth () * this.maxDispCoefs;
var winh = winw;
var pad = this.getTermWidth ();
var x = Clazz.doubleToInt ((this.winSize.width - (winw * 4 + pad * 3)) / 2);
for (i = 0; i != this.maxZDispCoefs * 2; i++) this.viewFreq[i] =  new java.awt.Rectangle (x + (i % perRow) * (winw + pad), this.view3d.height + spectrumHeight + (Clazz.doubleToInt (i / perRow)) * (winh + pad), winw, winh);

});
Clazz.defineMethod (c$, "computeFunction", 
function (view, fieldno) {
var i;
var j;
var q = 3.141592653589793 / this.maxTerms;
var cost = java.lang.Math.cos (this.t);
var izoom = 1 / this.zoom;
var rotm = this.rotmatrix;
var boxhalfwidth = this.boxwidth / 2;
var boxhalfheight = this.boxheight / 2;
var boxhalfdepth = this.boxdepth / 2;
var aratio = view.width / view.height;
var disp = this.dispChooser.getSelectedIndex ();
var doSides = this.sidesCheck.getState ();
var fnindex = fieldno;
if (fieldno == 4) {
fnindex = 0;
this.genData (0);
disp = -1;
doSides = true;
} else if (fieldno == 3) {
fnindex = 1;
this.genData (1);
doSides = true;
} else this.genData (fieldno);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var camx0 = 0;
var camz0 = this.viewDistance;
var camvx0 = (2 * i / this.gridSizeX - 1) * izoom;
var camvy0 = -(2 * j / this.gridSizeY - 1) * izoom;
if (aratio < 1) camvy0 /= aratio;
 else camvx0 *= aratio;
var camvz0 = -1;
var camx = rotm[0] * camx0 + rotm[2] * camz0;
var camy = rotm[5] * camz0;
var camz = rotm[6] * camx0 + rotm[8] * camz0;
var camvx = rotm[0] * camvx0 + rotm[1] * camvy0 + rotm[2] * camvz0;
var camvy = rotm[3] * camvx0 + rotm[4] * camvy0 + rotm[5] * camvz0;
var camvz = rotm[6] * camvx0 + rotm[7] * camvy0 + rotm[8] * camvz0;
var camnorm = java.lang.Math.sqrt (camvx * camvx + camvy * camvy + camvz * camvz);
var n;
var simpr = 0;
var simpg = 0;
var simpb = 0;
var nmax = 14;
var tx1 = (-boxhalfwidth - camx) / camvx;
var tx2 = (boxhalfwidth - camx) / camvx;
var ty1 = (-boxhalfheight - camy) / camvy;
var ty2 = (boxhalfheight - camy) / camvy;
var tz1 = (-boxhalfdepth - camz) / camvz;
var tz2 = (boxhalfdepth - camz) / camvz;
var mint = (this.max (this.min (tx1, tx2), this.max (this.min (ty1, ty2), this.min (tz1, tz2))) + .001);
var maxt = (this.min (this.max (tx1, tx2), this.min (this.max (ty1, ty2), this.max (tz1, tz2))) - .001);
if (maxt < mint) {
this.func[i][j][0] = this.func[i][j][1] = this.func[i][j][2] = 0;
continue;
}var tstep = (maxt - mint) / (14);
var pathlen = (maxt - mint) * camnorm;
var xmult = (this.maxTerms / this.boxwidth);
var ymult = (this.maxTerms / this.boxheight);
var zmult = (this.maxTerms / this.boxdepth);
var maxn = 15;
var slice = this.sliceChooser.getSelectedIndex ();
if (slice > 0) {
var tx;
if (slice == 1) tx = (this.sliceval * boxhalfwidth - camx) / camvx;
 else if (slice == 2) tx = (this.sliceval * boxhalfheight - camy) / camvy;
 else tx = (this.sliceval * boxhalfdepth - camz) / camvz;
if (tx < mint || tx > maxt) {
this.func[i][j][0] = this.func[i][j][1] = this.func[i][j][2] = 0;
continue;
}mint = maxt = tx;
pathlen = 2;
maxn = 1;
}if (doSides) {
maxn = 1;
pathlen = 4;
}var fcamx = camx;
var fcamy = camy;
var fcamz = camz;
var fcamvx = camvx;
var fcamvy = camvy;
var fcamvz = camvz;
for (n = 0; n < maxn; n++) {
var t = mint + n * tstep;
var xx = fcamx + fcamvx * t;
var yy = fcamy + fcamvy * t;
var zz = fcamz + fcamvz * t;
var xxi = Clazz.floatToInt ((xx + boxhalfwidth) * xmult);
var yyi = Clazz.floatToInt ((yy + boxhalfheight) * ymult);
var zzi = Clazz.floatToInt ((zz + boxhalfdepth) * zmult);
var mi;
var fx = 0;
var fy = 0;
var fz = 0;
for (mi = 0; mi != this.modeCount; mi++) {
var md = this.modes[mi].modeDatas[fnindex];
var fxymult = md.zmode_xymult[zzi];
var fzmult = md.zmode_zmult[zzi];
fx += md.data[xxi][yyi][0] * fxymult;
fy += md.data[xxi][yyi][1] * fxymult;
fz += md.data[xxi][yyi][2] * fzmult;
}
if (fieldno == 3) {
var sw;
if (xx < -0.99) {
fx = 0;
sw = fy;
fy = -fz;
fz = sw;
} else if (xx > .99) {
fx = 0;
sw = fy;
fy = fz;
fz = -sw;
} else if (yy < -0.99) {
fy = 0;
sw = fx;
fx = fz;
fz = -sw;
} else if (yy > .99) {
fy = 0;
sw = fx;
fx = -fz;
fz = sw;
} else if (zz < -0.99 && !test.falstad.EMBoxFrame.waveguide) {
fz = 0;
sw = fx;
fx = -fy;
fy = sw;
} else if (zz > .99 && !test.falstad.EMBoxFrame.waveguide) {
fz = 0;
sw = fx;
fx = fy;
fy = -sw;
} else fx = fy = fz = 0;
}if (disp == 5) {
fx = java.lang.Math.abs (fx);
fy = java.lang.Math.abs (fy);
fz = java.lang.Math.abs (fz);
simpr += this.sampleMult[n] * fx;
simpg += this.sampleMult[n] * fy;
simpb += this.sampleMult[n] * fz;
continue;
}var f = 0;
switch (disp) {
case 1:
f = java.lang.Math.sqrt (fx * fx + fy * fy + fz * fz);
break;
case 2:
f = fx;
break;
case 3:
f = fy;
break;
case 4:
f = fz;
break;
case -1:
if (xx < -0.99) f = fx;
 else if (xx > .99) f = -fx;
 else if (yy < -0.99) f = fy;
 else if (yy > .99) f = -fy;
 else if (zz < -0.99 && !test.falstad.EMBoxFrame.waveguide) f = fz;
 else if (zz > .99 && !test.falstad.EMBoxFrame.waveguide) f = -fz;
 else f = 0;
break;
}
if (f < 0) {
f = java.lang.Math.abs (f);
simpr += this.sampleMult[n] * f;
} else simpg += this.sampleMult[n] * f;
}
simpr *= pathlen / n;
simpg *= pathlen / n;
simpb *= pathlen / n;
this.func[i][j][0] = simpr;
this.func[i][j][1] = simpg;
this.func[i][j][2] = simpb;
}

}, "java.awt.Rectangle,~N");
Clazz.defineMethod (c$, "sign", 
function (x) {
return x < 0 ? -1 : 1;
}, "~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateEMBox", 
function (realg) {
var g = null;
if (this.winSize == null || this.winSize.width == 0) return;
g = this.dbimage.getGraphics ();
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
this.allQuiet = true;
var disp = this.dispChooser.getSelectedIndex ();
if (!this.stoppedCheck.getState () && !this.stopOscCheck.getState ()) {
var val = this.speedBar.getValue ();
var tadd = val * (0.004);
if (disp == 6 || disp == 0) tadd /= 4;
tadd += val * this.getrand (20) * (2.7279275E-4);
this.t += tadd;
if (this.modeCount > 0) this.allQuiet = false;
}var i;
var j;
var k;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
m.phasecoef = (m.omega * this.t + m.phasecoefadj) % (6.283185307179586);
var phasecoefcos = java.lang.Math.cos (m.phasecoef);
var phasecoefsin = java.lang.Math.sin (m.phasecoef);
m.ephaseshift = (test.falstad.EMBoxFrame.waveguide) ? -m.phasecoef : 0;
m.bphaseshift = (test.falstad.EMBoxFrame.waveguide) ? -m.phasecoef : 0;
m.ephasemult = (test.falstad.EMBoxFrame.waveguide) ? m.magcoef : phasecoefsin * m.magcoef;
m.bphasemult = (test.falstad.EMBoxFrame.waveguide) ? m.magcoef : phasecoefcos * m.magcoef;
this.calcModeMults (m, true);
}
if (this.emChooser.getSelectedIndex () == 2) {
this.doDisplay (this.view3d_b, g, 1);
this.doDisplay (this.view3d_e, g, 0);
} else {
this.doDisplay (this.view3d, g, this.emChooser.getSelectedIndex ());
}g.setColor (java.awt.Color.black);
g.fillRect (0, this.view3d.height, this.winSize.width, this.winSize.height - this.view3d.height);
for (i = 0; i != this.maxZDispCoefs; i++) {
this.drawFrequencies (g, i, false);
this.drawFrequencies (g, i, true);
}
this.map3d (0, 0, 0, this.xpoints, this.ypoints, 0, this.viewAxes);
var defaultColor = (disp == 1 || disp == 0) ? java.awt.Color.white : java.awt.Color.gray;
this.map3d (1, 0, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor (disp == 5 ? java.awt.Color.red : disp == 2 ? java.awt.Color.green : defaultColor);
this.drawArrow (g, "x", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
if (disp == 2) {
this.map3d (-1, 0, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor (java.awt.Color.red);
this.drawArrow (g, null, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}this.map3d (0, 1, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor (disp == 5 ? java.awt.Color.green : disp == 3 ? java.awt.Color.green : defaultColor);
this.drawArrow (g, "y", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
if (disp == 3) {
this.map3d (0, -1, 0, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor (java.awt.Color.red);
this.drawArrow (g, null, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}this.map3d (0, 0, 1, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor (disp == 5 ? java.awt.Color.blue : disp == 4 ? java.awt.Color.green : defaultColor);
this.drawArrow (g, "z", this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
if (disp == 4) {
this.map3d (0, 0, -1, this.xpoints, this.ypoints, 1, this.viewAxes);
g.setColor (java.awt.Color.red);
this.drawArrow (g, null, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}if (this.viewSpectrum != null) {
var selw = (this.selectedCoefX == -1) ? 0 : this.getOmega (this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ);
var selx = Clazz.doubleToInt (selw * 60);
var selmin = Clazz.doubleToInt (this.selectedMinOmega * 60);
var selmax = Clazz.doubleToInt (this.selectedMaxOmega * 60);
var ym = this.viewSpectrum.height - 10;
var y = this.viewSpectrum.y + this.viewSpectrum.height - 5;
for (i = 1; i != this.winSize.width; i++) {
if (this.spectrum[i] == 0) continue;
var h = Clazz.doubleToInt (ym * (.2 + java.lang.Math.log (this.spectrum[i]) / 4));
if (h > ym) h = ym;
g.setColor ((i == selx || (i >= selmin && i < selmax)) ? java.awt.Color.yellow : java.awt.Color.gray);
g.drawLine (i, y, i, y - h);
}
}if (this.selectedCoefX != -1) {
var s = "Selected mode = " + ((this.selectedCoefTEMode) ? "TE (" : "TM (") + this.selectedCoefX + "," + this.selectedCoefY;
if (!test.falstad.EMBoxFrame.waveguide) s += "," + this.selectedCoefZ;
s += ")";
var fm = g.getFontMetrics ();
g.setColor (java.awt.Color.yellow);
var y = this.view3d.y + this.view3d.height - fm.getDescent () - 2;
g.drawString (s, Clazz.doubleToInt ((this.winSize.width - fm.stringWidth (s)) / 2), y);
}realg.drawImage (this.dbimage, 0, 0, this);
if (!this.allQuiet) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "doDisplay", 
function (view, g, fieldno) {
var i;
var j;
var k;
var mis = this.memoryImageSourceCheck.getState ();
this.colorMult = this.brightnessBar.getValue () * 3;
var winw = view.width;
var winh = view.height;
var partDisplay = false;
var slice = this.sliceChooser.getSelectedIndex ();
var sliced = (slice > 0);
this.curfieldno = fieldno;
this.drawCube (g, view, true);
this.cameraPos =  Clazz.newDoubleArray (3, 0);
this.unmap3d (this.cameraPos, Clazz.doubleToInt (view.width / 2), Clazz.doubleToInt (view.height / 2), this.viewDistance, view);
var disp = this.dispChooser.getSelectedIndex ();
if (fieldno == 4) disp = 1;
if (disp == 6) {
var x;
var y;
var z;
var p = this.particles[0];
var dd = Clazz.innerTypeInstance (test.falstad.EMBoxFrame.DrawData, this, null);
dd.mult = this.colorMult / 30.;
dd.g = g;
dd.view = view;
dd.fieldno = fieldno;
dd.realfieldno = fieldno;
if (fieldno == 3) dd.fieldno = 1;
this.vectorSpacing = this.vecDensityBar.getValue ();
this.genData (dd.fieldno);
var slice01 = .5 * this.sliceval + .5;
if (this.sidesCheck.getState ()) {
this.drawVectorsX (0, dd);
this.drawVectorsX (1, dd);
this.drawVectorsY (0, dd);
this.drawVectorsY (1, dd);
if (!test.falstad.EMBoxFrame.waveguide) {
this.drawVectorsZ (0, dd);
this.drawVectorsZ (1, dd);
}} else if (!sliced) {
this.vectorSpacing /= 2;
for (x = 0; x != this.vectorSpacing; x++) {
var xx = x * (1.0 / (this.vectorSpacing - 1));
for (y = 0; y != this.vectorSpacing; y++) {
var yy = y * (1.0 / (this.vectorSpacing - 1));
for (z = 0; z != this.vectorSpacing * this.boxGuideMult; z++) {
var zz = z * (1.0 / (this.vectorSpacing * this.boxGuideMult - 1));
this.drawVector (dd, xx, yy, zz);
}
}
}
} else if (slice == 1) {
this.drawVectorsX (slice01, dd);
} else if (slice == 2) {
this.drawVectorsY (slice01, dd);
} else if (slice == 3) {
this.drawVectorsZ (slice01, dd);
}} else if (disp == 0) {
var pcount = this.getParticleCount ();
var pstart = 0;
pcount /= 2;
var f = (fieldno == 3) ? 1 : fieldno;
pstart = pcount * f;
if (!this.stoppedCheck.getState ()) {
this.moveParticles (pstart, pcount);
this.allQuiet = false;
}g.setColor (java.awt.Color.white);
for (i = pstart; i != pcount + pstart; i++) {
var p = this.particles[i];
var pos = p.pos;
this.map3d (pos[0], pos[1], pos[2], this.xpoints, this.ypoints, 0, view);
if (this.xpoints[0] < 0 || this.xpoints[0] >= this.winSize.width || this.ypoints[0] < 0 || this.ypoints[0] >= this.winSize.height) continue;
g.fillRect (this.xpoints[0], this.ypoints[0] - 1, 2, 2);
}
} else if (this.modeCount > 0) {
this.computeFunction (view, fieldno);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var x = Clazz.doubleToInt (i * winw / this.gridSizeX);
var y = Clazz.doubleToInt (j * winh / this.gridSizeY);
var x2 = Clazz.doubleToInt ((i + 1) * winw / this.gridSizeX);
var y2 = Clazz.doubleToInt ((j + 1) * winh / this.gridSizeY);
var colval = 0xFF000000 + (this.getColorValue (i, j, 0) << 16) | (this.getColorValue (i, j, 1) << 8) | (this.getColorValue (i, j, 2));
if (mis) {
var l;
for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * winw] = colval;


} else {
g.setColor ( new java.awt.Color (colval));
g.fillRect (view.x + x, view.y + y, x2 - x, y2 - y);
}}

if (mis) {
var dbimage2 = this.cv.createImage (this.imageSource);
g.drawImage (dbimage2, view.x, view.y, null);
}}this.drawCube (g, view, false);
}, "java.awt.Rectangle,java.awt.Graphics,~N");
Clazz.defineMethod (c$, "drawVectorsX", 
function (slice01, dd) {
var y;
var z;
for (z = 0; z != this.vectorSpacing * this.boxGuideMult; z++) for (y = 0; y != this.vectorSpacing; y++) {
var xx = slice01;
var yy = y * (1.0 / (this.vectorSpacing - 1));
var zz = z * (1.0 / (this.vectorSpacing * this.boxGuideMult - 1));
this.drawVector (dd, xx, yy, zz);
}

}, "~N,test.falstad.EMBoxFrame.DrawData");
Clazz.defineMethod (c$, "drawVectorsY", 
function (slice01, dd) {
var x;
var z;
for (x = 0; x != this.vectorSpacing; x++) for (z = 0; z != this.vectorSpacing * this.boxGuideMult; z++) {
var xx = x * (1.0 / (this.vectorSpacing - 1));
var yy = slice01;
var zz = z * (1.0 / (this.vectorSpacing * this.boxGuideMult - 1));
this.drawVector (dd, xx, yy, zz);
}

}, "~N,test.falstad.EMBoxFrame.DrawData");
Clazz.defineMethod (c$, "drawVectorsZ", 
function (slice01, dd) {
var x;
var y;
for (x = 0; x != this.vectorSpacing; x++) for (y = 0; y != this.vectorSpacing; y++) {
var xx = x * (1.0 / (this.vectorSpacing - 1));
var yy = y * (1.0 / (this.vectorSpacing - 1));
var zz = slice01;
this.drawVector (dd, xx, yy, zz);
}

}, "~N,test.falstad.EMBoxFrame.DrawData");
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
Clazz.defineMethod (c$, "drawVector", 
function (dd, xx, yy, zz) {
var fieldno = dd.fieldno;
var p = this.particles[0];
var xxi = Clazz.doubleToInt (xx * this.maxTerms);
var yyi = Clazz.doubleToInt (yy * this.maxTerms);
var zzi = Clazz.doubleToInt (zz * this.maxTerms);
if (xxi >= this.maxTerms) xxi = this.maxTerms - 1;
if (yyi >= this.maxTerms) yyi = this.maxTerms - 1;
if (zzi >= this.maxTerms) zzi = this.maxTerms - 1;
var mi;
var dx = 0;
var dy = 0;
var dz = 0;
for (mi = 0; mi != this.modeCount; mi++) {
var md = this.modes[mi].modeDatas[fieldno];
var fxymult = md.zmode_xymult[zzi];
var fzmult = md.zmode_zmult[zzi];
dx += md.data[xxi][yyi][0] * fxymult;
dy += md.data[xxi][yyi][1] * fxymult;
dz += md.data[xxi][yyi][2] * fzmult;
}
if (dd.realfieldno == 3) {
var sw;
if (xx <= .01) {
dx = 0;
sw = dy;
dy = -dz;
dz = sw;
} else if (xx >= .99) {
dx = 0;
sw = dy;
dy = dz;
dz = -sw;
} else if (yy <= .01) {
dy = 0;
sw = dx;
dx = dz;
dz = -sw;
} else if (yy >= .99) {
dy = 0;
sw = dx;
dx = -dz;
dz = sw;
} else if (zz <= .01 && !test.falstad.EMBoxFrame.waveguide) {
dz = 0;
sw = dx;
dx = -dy;
dy = sw;
} else if (zz >= .99 && !test.falstad.EMBoxFrame.waveguide) {
dz = 0;
sw = dx;
dx = dy;
dy = -sw;
} else dx = dy = dz = 0;
}if (dx == 0) dx = .0001;
var dn = java.lang.Math.sqrt (dx * dx + dy * dy + dz * dz);
dx /= dn;
dy /= dn;
dz /= dn;
dn *= dd.mult;
var col;
if (dn > 1) {
if (dn > 2) dn = 2;
dn -= 1;
var val = Clazz.doubleToInt (dn * 255);
col = (-16777216) | (65280) | (val * (0x10001));
} else {
var val = Clazz.doubleToInt (dn * 255);
col = (-16777216) | (val << 8);
}dd.g.setColor ( new java.awt.Color (col));
var sw2 = 1. / (this.vectorSpacing - 1);
xx = xx * 2 - 1;
yy = yy * 2 - 1;
zz = zz * 2 - 1;
this.map3d (xx, yy, zz, this.xpoints, this.ypoints, 0, dd.view);
this.map3d (xx + sw2 * dx * 2 / this.boxwidth, yy + sw2 * dy * 2 / this.boxheight, zz + sw2 * dz / this.boxGuideMult, this.xpoints, this.ypoints, 1, dd.view);
this.drawArrow (dd.g, null, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], 2);
}, "test.falstad.EMBoxFrame.DrawData,~N,~N,~N");
Clazz.defineMethod (c$, "visibleFace", 
function (nx, ny, nz) {
var viewx = this.viewDistance * this.rotmatrix[2];
var viewy = this.viewDistance * this.rotmatrix[5];
var viewz = this.viewDistance * this.rotmatrix[8];
return (nx - viewx) * nx + (ny - viewy) * ny + (nz - viewz) * nz < 0;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "drawCube", 
function (g, view, drawAll) {
var i;
var slice = this.sliceChooser.getSelectedIndex ();
var sp = (drawAll) ? 0 : 8;
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
this.map3d (pts[0], pts[1], pts[2], this.xpoints, this.ypoints, n, view);
}
g.setColor (java.awt.Color.gray);
g.drawPolygon (this.xpoints, this.ypoints, 4);
if (slice != 0 && Clazz.doubleToInt (i / 2) != slice - 1) {
if (this.selectedSlice) g.setColor (java.awt.Color.yellow);
var coord1 = (slice == 1) ? 1 : 0;
var coord2 = (slice == 3) ? 1 : 2;
this.computeFace (i, 0, pts);
pts[slice - 1] = this.sliceval;
this.map3d (pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp, view);
this.computeFace (i, 2, pts);
pts[slice - 1] = this.sliceval;
this.map3d (pts[0], pts[1], pts[2], this.slicerPoints[0], this.slicerPoints[1], sp + 1, view);
g.drawLine (this.slicerPoints[0][sp], this.slicerPoints[1][sp], this.slicerPoints[0][sp + 1], this.slicerPoints[1][sp + 1]);
if (drawAll) {
this.sliceFaces[Clazz.doubleToInt (sp / 2)][0] = nx;
this.sliceFaces[Clazz.doubleToInt (sp / 2)][1] = ny;
this.sliceFaces[Clazz.doubleToInt (sp / 2)][2] = nz;
sp += 2;
}}}
}, "java.awt.Graphics,java.awt.Rectangle,~B");
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
function (x, y, z, xpoints, ypoints, pt, view) {
if (view !== this.viewAxes) {
x *= this.boxwidth / 2;
y *= this.boxheight / 2;
z *= this.boxdepth / 2;
}var rotm = this.rotmatrix;
var realx = x * rotm[0] + y * rotm[3] + z * rotm[6];
var realy = x * rotm[1] + y * rotm[4] + z * rotm[7];
var realz = this.viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
var scalex = view.width * this.zoom / 2;
var scaley = view.height * this.zoom / 2;
var aratio = view.width / view.height;
if (aratio < 1) scaley *= aratio;
 else scalex /= aratio;
xpoints[pt] = view.x + Clazz.doubleToInt (view.width / 2) + Clazz.doubleToInt (scalex * realx / realz);
ypoints[pt] = view.y + Clazz.doubleToInt (view.height / 2) - Clazz.doubleToInt (scaley * realy / realz);
}, "~N,~N,~N,~A,~A,~N,java.awt.Rectangle");
Clazz.defineMethod (c$, "unmap3d", 
function (x3, x, y, z, view) {
var scalex = view.width * this.zoom / 2;
var scaley = view.height * this.zoom / 2;
var aratio = view.width / view.height;
if (aratio < 1) scaley *= aratio;
 else scalex /= aratio;
var realz = this.viewDistance - z;
var realx = (x - (view.x + Clazz.doubleToInt (view.width / 2))) * realz / scalex;
var realy = -(y - (view.y + Clazz.doubleToInt (view.height / 2))) * realz / scaley;
var rotm = this.rotmatrix;
x3[0] = (realx * rotm[0] + realy * rotm[1] + z * rotm[2]) / (this.boxwidth / 2);
x3[1] = (realx * rotm[3] + realy * rotm[4] + z * rotm[5]) / (this.boxheight / 2);
x3[2] = (realx * rotm[6] + realy * rotm[7] + z * rotm[8]) / (this.boxdepth / 2);
}, "~A,~N,~N,~N,java.awt.Rectangle");
Clazz.defineMethod (c$, "unmap3d", 
function (x3, x, y, pn, pp, view) {
var scalex = view.width * this.zoom / 2;
var scaley = view.height * this.zoom / 2;
var aratio = view.width / view.height;
if (aratio < 1) scaley *= aratio;
 else scalex /= aratio;
var vx = (x - (view.x + Clazz.doubleToInt (view.width / 2))) / scalex;
var vy = -(y - (view.y + Clazz.doubleToInt (view.height / 2))) / scaley;
var rotm = this.rotmatrix;
var mvx = (vx * rotm[0] + vy * rotm[1] - rotm[2]);
var mvy = (vx * rotm[3] + vy * rotm[4] - rotm[5]);
var mvz = (vx * rotm[6] + vy * rotm[7] - rotm[8]);
mvx /= this.boxwidth / 2;
mvy /= this.boxheight / 2;
mvz /= this.boxdepth / 2;
var t = ((pp[0] - this.cameraPos[0]) * pn[0] + (pp[1] - this.cameraPos[1]) * pn[1] + (pp[2] - this.cameraPos[2]) * pn[2]) / (pn[0] * mvx + pn[1] * mvy + pn[2] * mvz);
x3[0] = (this.cameraPos[0] + mvx * t);
x3[1] = (this.cameraPos[1] + mvy * t);
x3[2] = (this.cameraPos[2] + mvz * t);
}, "~A,~N,~N,~A,~A,java.awt.Rectangle");
Clazz.defineMethod (c$, "drawFrequencies", 
function (g, z, teMode) {
var view = this.viewFreq[z + ((teMode) ? 0 : this.maxZDispCoefs)];
var termWidth = this.getTermWidth ();
g.setColor (java.awt.Color.white);
var i;
var j;
var x;
var y;
if (!this.legalMode (1, 1, z, teMode)) return;
var starti = (this.legalMode (1, 0, z, teMode)) ? 0 : 1;
for (i = starti; i <= this.maxDispCoefs; i++) {
x = i * termWidth;
var startdraw = (i == 0) ? 1 : starti;
g.drawLine (view.x + startdraw * termWidth, x + view.y, view.x + termWidth * this.maxDispCoefs, x + view.y);
g.drawLine (view.x + x, view.y + startdraw * termWidth, view.x + x, view.y + termWidth * this.maxDispCoefs);
}
var rcol = 0x00010000;
var gcol = 0x00000100;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (m.z != z) continue;
if (m.teMode != teMode) continue;
x = view.x + m.x * termWidth;
y = view.y + m.y * termWidth;
var val = this.logcoef (m.magcoef);
if (val < -255) val = -255;
if (val > 255) val = 255;
if (val < 0) g.setColor ( new java.awt.Color (0xFF000000 + rcol * -val));
 else g.setColor ( new java.awt.Color (0xFF000000 + gcol * val));
g.fillRect (x + 1, y + 1, termWidth - 1, termWidth - 1);
var phx = Clazz.doubleToInt (m.phasecoefadj * termWidth * (0.15915494309189535));
if (phx > 0) {
g.setColor (java.awt.Color.blue);
g.drawLine (x + phx, y + 1, x + phx, y + termWidth);
}}
if (test.falstad.EMBoxFrame.waveguide) {
for (i = 0; i != this.maxDispCoefs; i++) for (j = 0; j != this.maxDispCoefs; j++) {
x = view.x + i * termWidth;
y = view.y + j * termWidth;
if (!this.basicLegalMode (i, j, z, teMode)) continue;
if (!this.legalMode (i, j, z, teMode)) {
g.setColor (java.awt.Color.white);
g.drawLine (x, y + termWidth, x + termWidth, y);
}}

}if (this.selectedCoefX != -1 && !test.falstad.EMBoxFrame.waveguide) {
var selOmega = this.getOmega (this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ);
g.setColor (java.awt.Color.yellow);
for (i = starti; i != this.maxDispCoefs; i++) for (j = starti; j != this.maxDispCoefs; j++) {
x = view.x + i * termWidth;
y = view.y + j * termWidth;
if (this.getOmega (i, j, z) == selOmega) g.drawRect (x, y, termWidth, termWidth);
}

}if (this.selectedMinOmega > 0 && this.selectedMaxOmega > 0) {
g.setColor (java.awt.Color.yellow);
for (i = starti; i != this.maxDispCoefs; i++) for (j = starti; j != this.maxDispCoefs; j++) {
x = view.x + i * termWidth;
y = view.y + j * termWidth;
var w = this.getOmega (i, j, z);
if (w >= this.selectedMinOmega && w < this.selectedMaxOmega) g.drawRect (x, y, termWidth, termWidth);
}

}}, "java.awt.Graphics,~N,~B");
Clazz.defineMethod (c$, "logcoef", 
function (x) {
var ep2 = 0.003;
var sign = (x < 0) ? -1 : 1;
x *= sign;
if (x < ep2) return 0;
if (this.logep2 == 0) this.logep2 = -java.lang.Math.log (2 * ep2);
return Clazz.doubleToInt (255 * sign * (java.lang.Math.log (x + ep2) + this.logep2) / this.logep2);
}, "~N");
Clazz.defineMethod (c$, "getColorValue", 
function (i, j, k) {
var val = Clazz.doubleToInt (this.func[i][j][k] * this.colorMult);
if (val > 255) val = 255;
return val;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "moveParticles", 
function (pstart, pcount) {
var bestd = 0;
var i;
var slice = this.sliceChooser.getSelectedIndex ();
var sliced = (slice > 0);
for (i = pstart; i != pcount + pstart; i++) {
var pt = this.particles[i];
this.removeFromDensityGroup (pt);
this.moveParticle (pt);
var x = pt.pos;
if (x[0] < -1 || x[0] > 1 || x[1] < -1 || x[1] > 1 || x[2] < -1 || x[2] > 1) {
if (!this.sidesCheck.getState ()) pt.lifetime = -1;
 else {
var c;
var ns = -1;
for (c = 0; c != 3; c++) {
if (x[c] < -1) ns = c * 2 + 1;
 else if (x[c] > 1) ns = c * 2;
}
if (ns == pt.side || (test.falstad.EMBoxFrame.waveguide && ns >= 4)) pt.lifetime = -1;
 else {
pt.side = ns;
pt.pos[Clazz.doubleToInt (pt.side / 2)] = this.sidemap[pt.side][Clazz.doubleToInt (pt.side / 2)];
}}}if (pt.lifetime-- < 0) this.positionParticle (pt);
if (sliced) x[slice - 1] = this.sliceval;
var d = this.addToDensityGroup (pt);
if (d > bestd) bestd = d;
}
var maxd = (Clazz.doubleToInt (4 * this.getParticleCount () / (64)));
if (sliced) maxd = Clazz.doubleToInt (2 * this.getParticleCount () / (16));
if (bestd > maxd) this.redistribute (bestd);
}, "~N,~N");
Clazz.defineMethod (c$, "redistribute", 
function (mostd) {
if (mostd < 5) return;
this.rediscount++;
var maxd = (Clazz.doubleToInt (4 * this.getParticleCount () / (64)));
var i;
var pn = 0;
var pcount = this.getParticleCount ();
for (i = this.rediscount % 4; i < pcount; i += 4) {
var p = this.particles[i];
var a = Clazz.doubleToInt ((p.pos[0] + 1) / 0.505);
var b = Clazz.doubleToInt ((p.pos[1] + 1) / 0.505);
var c = Clazz.doubleToInt ((p.pos[2] + 1) / 0.505);
if (this.density[a][b][c] <= maxd) continue;
p.lifetime = -1;
pn++;
}
}, "~N");
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
if (e.getSource () === this.clearButton) {
while (this.modeCount > 0) this.deleteMode (0);

this.cv.repaint ();
}if (e.getSource () === this.resetPartButton) {
this.resetParticles ();
this.cv.repaint ();
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.widthBar || e.getSource () === this.heightBar) this.setWidthHeight ();
if (e.getSource () === this.freqBar) this.setFrequency ();
if (e.getSource () === this.resolutionBar) this.setMaxTerms ();
if (e.getSource () === this.partCountBar) this.resetDensityGroups ();
this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "setWidthHeight", 
function () {
this.boxwidth = this.widthBar.getValue () / 5.;
this.boxheight = this.heightBar.getValue () / 5.;
var i;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
m.omega = this.getOmega (m.x, m.y, m.z);
}
this.setFrequency ();
});
Clazz.defineMethod (c$, "setFrequency", 
function () {
var i;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
m.zwavenum = this.getWaveNum (m.x, m.y);
if (!(m.zwavenum > 0)) this.deleteMode (i--);
}
this.calcSpectrum ();
});
Clazz.defineMethod (c$, "calcSpectrum", 
function () {
var i;
var j;
var k;
if (this.winSize == null) return;
this.spectrum =  Clazz.newIntArray (this.winSize.width, 0);
for (i = 0; i != this.maxDispCoefs; i++) for (j = 0; j != this.maxDispCoefs; j++) for (k = 0; k != this.maxDispCoefs; k++) {
if (!this.legalMode (i, j, k, true) && !this.legalMode (i, j, k, false)) continue;
var w = this.getOmega (i, j, k);
var x = Clazz.doubleToInt (w * 60);
if (x >= this.winSize.width) continue;
this.spectrum[x]++;
}


});
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
if (this.emChooser.getSelectedIndex () == 2) x -= (this.view3d_e.inside (x, y)) ? 0 : this.view3d_b.x;
for (n = 0; n != 8; n += 2) {
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
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.dragging = true;
this.oldDragX = this.dragX;
this.oldDragY = this.dragY;
this.dragX = e.getX ();
this.dragY = e.getY ();
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
if ((e.getModifiers () & 16) != 0) {
if (this.selection != -1) {
this.dragging = true;
}return;
}var x = e.getX ();
var y = e.getY ();
this.oldDragX = this.dragX;
this.oldDragY = this.dragY;
this.dragX = x;
this.dragY = y;
var ss = this.selectedSlice;
this.checkSlice (this.dragX, this.dragY);
if (ss != this.selectedSlice) this.cv.repaint (this.pause);
var oldCoefX = this.selectedCoefX;
var oldCoefY = this.selectedCoefY;
var oldCoefZ = this.selectedCoefZ;
this.selectedCoefX = -1;
this.selectedCoefY = -1;
this.selectedCoefZ = -1;
this.selection = 0;
this.selectedMinOmega = this.selectedMaxOmega = 0;
var i;
if (this.view3d.inside (x, y)) this.selection = 1;
if (this.viewSpectrum != null && this.viewSpectrum.inside (x, y)) {
this.selection = 3;
this.selectedMinOmega = (x - 2) / 60;
this.selectedMaxOmega = (x + 2) / 60;
}for (i = 0; i != this.maxZDispCoefs * 2; i++) {
var vf = this.viewFreq[i];
if (vf.inside (x, y)) {
var termWidth = this.getTermWidth ();
this.selectedCoefX = Clazz.doubleToInt ((x - vf.x) / termWidth);
this.selectedCoefY = Clazz.doubleToInt ((y - vf.y) / termWidth);
this.selectedCoefZ = i % this.maxZDispCoefs;
this.selectedCoefTEMode = (i < this.maxZDispCoefs);
if (this.selectedCoefX >= this.maxDispCoefs) this.selectedCoefX = -1;
if (this.selectedCoefY >= this.maxDispCoefs) this.selectedCoefX = -1;
if (this.selectedCoefX != -1) this.selection = 2;
}}
if (!this.legalMode (this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ, this.selectedCoefTEMode)) this.selectedCoefX = this.selectedCoefY = this.selectedCoefZ = -1;
if (this.selectedCoefX != oldCoefX || this.selectedCoefY != oldCoefY || this.selectedCoefZ != oldCoefZ) this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "legalMode", 
function (x, y, z, h) {
if (test.falstad.EMBoxFrame.waveguide) {
if (z != 1) return false;
if (!(this.getWaveNum (x, y) > 0)) return false;
}return this.basicLegalMode (x, y, z, h);
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "basicLegalMode", 
function (x, y, z, h) {
if (h) return z != 0 && !(x == 0 && y == 0);
 else return x != 0 && y != 0;
}, "~N,~N,~N,~B");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
if (this.selection == 2) this.editMagClick ();
if (e.getClickCount () == 2 && this.selectedCoefX != -1) {
while (this.modeCount > 0) this.deleteMode (0);

this.addMode (this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ, this.selectedCoefTEMode).magcoef = 1;
this.cv.repaint (this.pause);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
if (!this.dragging && this.selection != -1) {
this.selectedCoefX = this.selectedCoefY = this.selectedCoefZ = -1;
this.cv.repaint (this.pause);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.oldDragX = this.dragStartX = e.getX ();
this.oldDragY = this.dragStartY = e.getY ();
this.dragZoomStart = this.zoom;
if (this.selectedCoefX != -1) {
var m = this.findSelectedMode ();
this.magDragStart = m.magcoef;
}this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if (this.dragging) this.cv.repaint ();
this.dragging = false;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (!this.finished) {
return;
}if (e.getItemSelectable () === this.spectrumCheck) this.setupDisplay ();
if (e.getItemSelectable () === this.dispChooser) this.setDynamicControls ();
if (e.getItemSelectable () === this.sliceChooser) this.setDynamicControls ();
if (e.getItemSelectable () === this.emChooser) this.reinit ();
this.cv.repaint (this.pause);
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "setDynamicControls", 
function () {
var em = this.emChooser.getSelectedIndex ();
var dcf = this.dispChooser.getSelectedIndex ();
if (em == 4) {
this.sliceChooser.select (0);
this.sliceChooser.disable ();
this.dispChooser.select (1);
this.dispChooser.disable ();
} else {
if (em == 3 && dcf != 6) {
this.sliceChooser.disable ();
this.sliceChooser.select (0);
} else this.sliceChooser.enable ();
this.dispChooser.enable ();
}if (dcf != 0 && dcf != 6 && this.sliceChooser.getSelectedIndex () == 0) dcf = 1;
if (em == 4 || (em == 3 && dcf != 6)) {
this.sidesCheck.disable ();
this.sidesCheck.setState (true);
} else if (this.sliceChooser.getSelectedIndex () == 0 && (dcf != 0 || em == 3)) {
this.sidesCheck.enable ();
this.sidesCheck.setState ((em == 3) ? true : false);
} else {
this.sidesCheck.disable ();
this.sidesCheck.setState (false);
}dcf = 1 << dcf;
var i;
for (i = 0; this.dynControls[i] != null; i++) {
var dc = this.dynControls[i];
if ((dc.flags & dcf) > 0) {
dc.bar.show ();
dc.label.show ();
} else {
dc.bar.hide ();
dc.label.hide ();
}}
if (this.dispChooser.getSelectedIndex () == 0) {
this.resetPartButton.enable ();
this.stopOscCheck.enable ();
} else {
this.resetPartButton.disable ();
this.stopOscCheck.disable ();
this.stopOscCheck.setState (false);
}if (this.dispChooser.getSelectedIndex () == 0) this.resetParticles ();
this.validate ();
});
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
if (this.applet == null) this.dispose ();
 else this.applet.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.EMBoxFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "edit", 
function (e) {
if (this.selection == 0) return;
var x = e.getX ();
var y = e.getY ();
switch (this.selection) {
case 2:
this.editMag (x, y);
break;
case 1:
this.edit3d (x, y);
break;
}
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "edit3d", 
function (x, y) {
if (this.selectedSlice) {
var x3 =  Clazz.newDoubleArray (3, 0);
var view = this.view3d;
if (this.emChooser.getSelectedIndex () == 2) view = (this.view3d_e.inside (x, y)) ? this.view3d_e : this.view3d_b;
this.unmap3d (x3, this.dragX, this.dragY, this.sliceFace, this.sliceFace, view);
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
this.resetDensityGroups ();
this.cv.repaint (this.pause);
} else if (this.modeChooser.getSelectedIndex () == 0) {
var xo = this.oldDragX - x;
var yo = this.oldDragY - y;
this.rotate (xo / 40., -yo / 40.);
this.cv.repaint (this.pause);
} else if (this.modeChooser.getSelectedIndex () == 1) {
var xo = x - this.dragStartX;
this.zoom = this.dragZoomStart + xo / 20.;
if (this.zoom < .1) this.zoom = .1;
this.cv.repaint (this.pause);
}}, "~N,~N");
Clazz.defineMethod (c$, "editMag", 
function (x, y) {
if (this.selectedCoefX == -1) return;
var coef = (this.dragStartY - y) / 20. + this.magDragStart;
if (coef < -1) coef = -1;
if (coef > 1) coef = 1;
var pcoef = (x - this.dragStartX) / 10.;
if (pcoef < 0) pcoef = 0;
if (pcoef > 6.283185307179586) pcoef = 6.283185307179586;
var m = this.findSelectedMode ();
if (m.magcoef == coef && m.phasecoefadj == pcoef) return;
m.magcoef = coef;
m.phasecoefadj = pcoef;
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "editMagClick", 
function () {
if (this.selectedCoefX == -1) return;
var m = this.findSelectedMode ();
if (this.magDragStart < .5) m.magcoef = 1;
 else m.magcoef = 0;
m.phasecoefadj = 0;
if (m.magcoef == 0) this.deleteMode (m);
this.cv.repaint (this.pause);
});
Clazz.defineMethod (c$, "genData", 
function (fieldno) {
var q = 3.141592653589793 / (this.maxTerms - 1);
var x;
var y;
var z;
var mi;
var fx;
var fy;
var fz;
var showE = (fieldno == 0);
for (mi = 0; mi != this.modeCount; mi++) {
var m = this.modes[mi];
var md = m.modeDatas[fieldno];
if (md.data == null) {
md.zmode_xymult =  Clazz.newFloatArray (this.maxTerms, 0);
md.zmode_zmult =  Clazz.newFloatArray (this.maxTerms, 0);
}this.calcModeMults (m, false);
var qz = (test.falstad.EMBoxFrame.waveguide) ? 2 * q * m.zwavenum : q;
var wgshift = (test.falstad.EMBoxFrame.waveguide) ? 1.5707963267948966 : 0;
for (z = 0; z != this.maxTerms; z++) {
if (showE) {
md.zmode_xymult[z] = (java.lang.Math.sin (z * qz * m.z + m.ephaseshift) * m.ephasemult);
md.zmode_zmult[z] = (java.lang.Math.cos (z * qz * m.z + m.ephaseshift) * m.ephasemult);
} else {
md.zmode_xymult[z] = (java.lang.Math.cos (z * qz * m.z + m.bphaseshift - wgshift) * m.bphasemult);
md.zmode_zmult[z] = (java.lang.Math.sin (z * qz * m.z + m.bphaseshift + wgshift) * m.bphasemult);
}}
if (md.data != null) continue;
md.data =  Clazz.newFloatArray (this.maxTerms, this.maxTerms, 3, 0);
fz = 0;
for (x = 0; x != this.maxTerms; x++) for (y = 0; y != this.maxTerms; y++) {
if (showE) {
fx = java.lang.Math.cos (x * m.x * q) * java.lang.Math.sin (y * m.y * q) * m.exmult;
fy = java.lang.Math.sin (x * m.x * q) * java.lang.Math.cos (y * m.y * q) * m.eymult;
fz = java.lang.Math.sin (x * m.x * q) * java.lang.Math.sin (y * m.y * q) * m.ezmult;
} else {
fx = java.lang.Math.sin (x * m.x * q) * java.lang.Math.cos (y * m.y * q) * m.bxmult;
fy = java.lang.Math.cos (x * m.x * q) * java.lang.Math.sin (y * m.y * q) * m.bymult;
fz = java.lang.Math.cos (x * m.x * q) * java.lang.Math.cos (y * m.y * q) * m.bzmult;
}md.data[x][y][0] = fx;
md.data[x][y][1] = fy;
md.data[x][y][2] = fz;
}

}
}, "~N");
Clazz.defineMethod (c$, "calcModeMults", 
function (m, usephase) {
var a1 = m.x / this.boxwidth;
var a2 = m.y / this.boxheight;
var a3 = (test.falstad.EMBoxFrame.waveguide) ? m.zwavenum : m.z / this.boxdepth;
var gneg = (test.falstad.EMBoxFrame.waveguide) ? -1 : 1;
if (m.teMode) this.calcMults (m, usephase ? m.ephasemult : 1, a2, -a1, 0, usephase ? m.bphasemult : 1, a1 * a3, a2 * a3, -gneg * (a1 * a1 + a2 * a2));
 else this.calcMults (m, usephase ? m.ephasemult : 1, a1 * a3, a2 * a3, -(a1 * a1 + a2 * a2), usephase ? m.bphasemult : 1, a2 * gneg, -gneg * a1, 0);
}, "test.falstad.EMBoxFrame.Mode,~B");
Clazz.defineMethod (c$, "calcMults", 
function (m, emult, ex, ey, ez, bmult, bx, by, bz) {
var enorm = emult / java.lang.Math.sqrt (ex * ex + ey * ey + ez * ez);
m.exmult = ex * enorm;
m.eymult = ey * enorm;
m.ezmult = ez * enorm;
var bnorm = bmult / java.lang.Math.sqrt (bx * bx + by * by + bz * bz);
m.bxmult = bx * bnorm;
m.bymult = by * bnorm;
m.bzmult = bz * bnorm;
}, "test.falstad.EMBoxFrame.Mode,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "calcField", 
function (p, field, pos) {
var mi;
var q = 1.5707963267948966;
var x = pos[0] + 1;
var y = pos[1] + 1;
var z = pos[2] + 1;
field[0] = field[1] = field[2] = 0;
var showE = (this.curfieldno == 0);
var wgshift = (test.falstad.EMBoxFrame.waveguide) ? 1.5707963267948966 : 0;
for (mi = 0; mi != this.modeCount; mi++) {
var m = this.modes[mi];
var qz = (test.falstad.EMBoxFrame.waveguide) ? 2 * q * m.zwavenum : q;
if (showE) {
field[0] += m.exmult * java.lang.Math.cos (x * m.x * q) * java.lang.Math.sin (y * m.y * q) * java.lang.Math.sin (z * m.z * qz + m.ephaseshift);
field[1] += m.eymult * java.lang.Math.sin (x * m.x * q) * java.lang.Math.cos (y * m.y * q) * java.lang.Math.sin (z * m.z * qz + m.ephaseshift);
field[2] += m.ezmult * java.lang.Math.sin (x * m.x * q) * java.lang.Math.sin (y * m.y * q) * java.lang.Math.cos (z * m.z * qz + m.ephaseshift);
} else {
field[0] += m.bxmult * java.lang.Math.sin (x * m.x * q) * java.lang.Math.cos (y * m.y * q) * java.lang.Math.cos (z * m.z * qz + m.bphaseshift - wgshift);
field[1] += m.bymult * java.lang.Math.cos (x * m.x * q) * java.lang.Math.sin (y * m.y * q) * java.lang.Math.cos (z * m.z * qz + m.bphaseshift - wgshift);
field[2] += m.bzmult * java.lang.Math.cos (x * m.x * q) * java.lang.Math.cos (y * m.y * q) * java.lang.Math.sin (z * m.z * qz + m.bphaseshift + wgshift);
}}
if (this.curfieldno == 3) {
var sw;
switch (p.side) {
case 0:
field[0] = 0;
sw = field[1];
field[1] = field[2];
field[2] = -sw;
break;
case 1:
field[0] = 0;
sw = field[1];
field[1] = -field[2];
field[2] = sw;
break;
case 2:
field[1] = 0;
sw = field[0];
field[0] = -field[2];
field[2] = sw;
break;
case 3:
field[1] = 0;
sw = field[0];
field[0] = field[2];
field[2] = -sw;
break;
case 4:
field[2] = 0;
sw = field[0];
field[0] = field[1];
field[1] = -sw;
break;
case 5:
field[2] = 0;
sw = field[0];
field[0] = -field[1];
field[1] = sw;
break;
}
}}, "test.falstad.EMBoxFrame.Particle,~A,~A");
Clazz.defineMethod (c$, "deleteMode", 
function (i) {
for (; i < this.modeCount - 1; i++) {
this.modes[i] = this.modes[i + 1];
}
this.modeCount--;
}, "~N");
Clazz.defineMethod (c$, "deleteMode", 
function (m) {
var i;
for (i = 0; i != this.modeCount; i++) if (this.modes[i] === m) {
this.deleteMode (i);
return;
}
}, "test.falstad.EMBoxFrame.Mode");
Clazz.defineMethod (c$, "addMode", 
function (x, y, z, teMode) {
if (this.modeCount == this.maxModes) {
var i;
var minmag = 1;
var minmagi = 0;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (m.magcoef < minmag) {
minmag = m.magcoef;
minmagi = i;
}}
this.deleteMode (minmagi);
}var m = Clazz.innerTypeInstance (test.falstad.EMBoxFrame.Mode, this, null);
m.x = x;
m.y = y;
m.z = z;
m.teMode = teMode;
m.magcoef = 0;
m.phasecoef = 0;
m.phasecoefadj = 0;
m.omega = this.getOmega (x, y, z);
m.zwavenum = this.getWaveNum (x, y);
m.modeDatas =  new Array (2);
m.modeDatas[0] = Clazz.innerTypeInstance (test.falstad.EMBoxFrame.ModeData, this, null);
m.modeDatas[1] = Clazz.innerTypeInstance (test.falstad.EMBoxFrame.ModeData, this, null);
this.modes[this.modeCount++] = m;
return m;
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "getWaveNum", 
function (x, y) {
if (!test.falstad.EMBoxFrame.waveguide) return 1;
var gammasq = (x * x / (this.boxwidth * this.boxwidth) + y * y / (this.boxheight * this.boxheight));
return java.lang.Math.sqrt (this.freqBar.getValue () * .2 - gammasq);
}, "~N,~N");
Clazz.defineMethod (c$, "getOmega", 
function (x, y, z) {
if (test.falstad.EMBoxFrame.waveguide) return 1;
return java.lang.Math.sqrt (x * x / (this.boxwidth * this.boxwidth) + y * y / (this.boxheight * this.boxheight) + z * z / 4.);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "findSelectedMode", 
function () {
var i;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (this.selectedCoefX == m.x && this.selectedCoefY == m.y && this.selectedCoefZ == m.z && this.selectedCoefTEMode == m.teMode) return m;
}
return this.addMode (this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ, this.selectedCoefTEMode);
});
Clazz.defineMethod (c$, "rk", 
function (p, order, x, Y, stepsize) {
var i;
if (order == 3) {
var fmult = stepsize * .0016 * this.partSpeedBar.getValue ();
for (i = 0; i != order; i++) this.rk_yn[i] = Y[i];

this.calcField (p, this.rk_k1, this.rk_yn);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + 0.5 * fmult * this.rk_k1[i]);

this.calcField (p, this.rk_k2, this.rk_yn);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + 0.5 * fmult * this.rk_k2[i]);

this.calcField (p, this.rk_k3, this.rk_yn);
for (i = 0; i != order; i++) this.rk_yn[i] = (Y[i] + fmult * this.rk_k3[i]);

this.calcField (p, this.rk_k4, this.rk_yn);
for (i = 0; i != order; i++) Y[i] = Y[i] + fmult * (this.rk_k1[i] + 2 * (this.rk_k2[i] + this.rk_k3[i]) + this.rk_k4[i]) / 6;

}}, "test.falstad.EMBoxFrame.Particle,~N,~N,~A,~N");
Clazz.defineMethod (c$, "moveParticle", 
function (p) {
var disp = this.dispChooser.getSelectedIndex ();
var numIter = 0;
var maxh = 1;
var error = 0.0;
var E = .001;
var localError;
var order = 3;
var Y = this.rk_Y;
var Yhalf = this.rk_Yhalf;
this.oldY = this.rk_oldY;
var i;
for (i = 0; i != 3; i++) this.oldY[i] = Y[i] = Yhalf[i] = p.pos[i];

var t = 0;
var h = p.stepsize;
var steps = 0;
var minh = .0001;
while (t >= 0 && t < 1) {
if (t + h > 1) h = 1 - t;
this.boundCheck = false;
this.rk (p, order, 0, Y, h);
this.rk (p, order, 0, Yhalf, h * 0.5);
this.rk (p, order, 0, Yhalf, h * 0.5);
if (this.boundCheck) {
p.pos[0] = -100;
return;
}localError = java.lang.Math.abs (Y[0] - Yhalf[0]) + java.lang.Math.abs (Y[1] - Yhalf[1]) + java.lang.Math.abs (Y[2] - Yhalf[2]);
if (localError > E && h > minh) {
h *= 0.75;
if (h < minh) h = minh;
for (i = 0; i != order; i++) Y[i] = Yhalf[i] = this.oldY[i];

continue;
} else if (localError < (E * 0.5)) {
h *= 1.25;
if (h > maxh) h = maxh;
}for (i = 0; i != order; i++) this.oldY[i] = Yhalf[i] = Y[i];

t += h;
steps++;
}
p.stepsize = h;
for (i = 0; i != 3; i++) p.pos[i] = Y[i];

}, "test.falstad.EMBoxFrame.Particle");
c$.$EMBoxFrame$DynControl$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.bar = null;
this.label = null;
this.flags = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMBoxFrame, "DynControl");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.bar = a;
this.label = b;
this.flags = 1 << c;
}, "swingjs.awt.Scrollbar,swingjs.awt.Label,~N");
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
this.bar = a;
this.label = b;
this.flags = (1 << c) | (1 << d);
}, "swingjs.awt.Scrollbar,swingjs.awt.Label,~N,~N");
c$ = Clazz.p0p ();
};
c$.$EMBoxFrame$Mode$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.x = 0;
this.y = 0;
this.z = 0;
this.teMode = false;
this.magcoef = 0;
this.phasecoef = 0;
this.ephasemult = 0;
this.bphasemult = 0;
this.phasecoefadj = 0;
this.omega = 0;
this.ephaseshift = 0;
this.bphaseshift = 0;
this.zwavenum = 0;
this.exmult = 0;
this.eymult = 0;
this.ezmult = 0;
this.bxmult = 0;
this.bymult = 0;
this.bzmult = 0;
this.modeDatas = null;
Clazz.instantialize (this, arguments);
}, test.falstad.EMBoxFrame, "Mode");
c$ = Clazz.p0p ();
};
c$.$EMBoxFrame$ModeData$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.data = null;
this.zmode_xymult = null;
this.zmode_zmult = null;
Clazz.instantialize (this, arguments);
}, test.falstad.EMBoxFrame, "ModeData");
c$ = Clazz.p0p ();
};
c$.$EMBoxFrame$DrawData$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.g = null;
this.mult = 0;
this.view = null;
this.fieldno = 0;
this.realfieldno = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMBoxFrame, "DrawData");
c$ = Clazz.p0p ();
};
c$.$EMBoxFrame$Particle$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.pos = null;
this.stepsize = null;
this.lifetime = 0;
this.side = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMBoxFrame, "Particle");
Clazz.makeConstructor (c$, 
function () {
this.pos =  Clazz.newDoubleArray (3, 0);
this.stepsize = 1;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"waveguide", false,
"EMCHOICE_E", 0,
"EMCHOICE_B", 1,
"EMCHOICE_EB", 2,
"EMCHOICE_J", 3,
"EMCHOICE_Q", 4,
"DISP_PART", 0,
"DISP_FIELD_MAG", 1,
"DISP_FIELD_X", 2,
"DISP_FIELD_Y", 3,
"DISP_FIELD_Z", 4,
"DISP_FIELD_COL", 5,
"DISP_VECTORS", 6,
"pi", 3.14159265358979323846,
"pi2", 6.283185307179586,
"gridsize", 80,
"densitygroupsize", 0.505,
"densitygridsize", 4,
"maxParticleCount", 1000,
"spectrumSpacing", 60,
"SEL_NONE", 0,
"SEL_3D", 1,
"SEL_MAG", 2,
"SEL_SPECTRUM", 3,
"MODE_ANGLE", 0,
"MODE_ZOOM", 1,
"SLICE_NONE", 0,
"SLICE_X", 1,
"SLICE_Y", 2,
"SLICE_Z", 3,
"sampleCount", 15,
"epsilon", .00001,
"epsilon2", .003);
});
