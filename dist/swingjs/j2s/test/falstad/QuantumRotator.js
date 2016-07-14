Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "$.Rectangle", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.QuantumRotatorFrame", "$.QuantumRotatorLayout", "$.QuantumRotator", "$.FFT5", "$.QuantumRotatorCanvas"], ["java.awt.Color", "$.Dimension", "java.awt.image.MemoryImageSource", "java.lang.Double", "java.util.Random", "swingjs.awt.Button", "$.Checkbox", "$.CheckboxMenuItem", "$.Choice", "$.Label", "$.Menu", "$.MenuBar", "$.MenuItem", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "QuantumRotatorCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.QuantumRotatorCanvas, []);
this.pg = p;
}, "test.falstad.QuantumRotatorFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateQuantumRotator (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateQuantumRotator (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "QuantumRotatorLayout", null, java.awt.LayoutManager);
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
var cw = Clazz.doubleToInt (targetw * 7 / 10);
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
}, test.falstad, "QuantumRotator", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.QuantumRotator.ogf != null) test.falstad.QuantumRotator.ogf.dispose ();
test.falstad.QuantumRotator.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.QuantumRotator.ogf =  new test.falstad.QuantumRotatorFrame (null);
test.falstad.QuantumRotator.ogf.init ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.QuantumRotator.ogf == null) {
this.started = true;
test.falstad.QuantumRotator.ogf =  new test.falstad.QuantumRotatorFrame (this);
test.falstad.QuantumRotator.ogf.init ();
this.repaint ();
}});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.QuantumRotator.ogf == null) s = "Applet is finished.";
 else if (test.falstad.QuantumRotator.ogf.useFrame) test.falstad.QuantumRotator.ogf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.QuantumRotator, "paint", [g]);
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
if (test.falstad.QuantumRotator.ogf != null) test.falstad.QuantumRotator.ogf.dispose ();
test.falstad.QuantumRotator.ogf = null;
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
this.alwaysNormItem = null;
this.axesItem = null;
this.exitItem = null;
this.modeChooser = null;
this.speedBar = null;
this.resolutionBar = null;
this.internalResBar = null;
this.brightnessBar = null;
this.phasorBar = null;
this.viewPotential = null;
this.viewX = null;
this.viewL = null;
this.viewStates = null;
this.viewList = null;
this.viewCount = 0;
this.phasors = null;
this.phasorCount = 0;
this.states = null;
this.stateCount = 0;
this.textBoxes = null;
this.textCount = 0;
this.dragZoomStart = 0;
this.zoom = 19.9;
this.rotmatrix = null;
this.viewAxes = null;
this.xpoints = null;
this.ypoints = null;
this.floorValues = null;
this.selectedPaneHandle = 0;
this.phaseColors = null;
this.grayLevels = null;
this.resadj = 0;
this.dragging = false;
this.editingFunc = false;
this.imageSource = null;
this.pixels = null;
this.dataSize = 0;
this.dataSizeTh = 0;
this.dataSizePh = 0;
this.pause = 0;
this.applet = null;
this.selectedState = null;
this.selectedPhasor = null;
this.selection = -1;
this.settingScale = false;
this.magDragStart = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.t = 0;
this.func = null;
this.funci = null;
this.phiIndex = 0;
this.phiSector = 0;
this.bestBrightness = 0;
this.userBrightMult = 1;
this.colorMult = 0;
this.manualScale = false;
this.gray2 = null;
this.fontMetrics = null;
this.useBufferedImage = false;
this.fft = null;
this.cv = null;
this.main = null;
this.showControls = false;
this.useFrame = false;
this.shown = false;
this.lastTime = 0;
this.scaleValue = -1;
if (!Clazz.isClassDefined ("test.falstad.QuantumRotatorFrame.Phasor")) {
test.falstad.QuantumRotatorFrame.$QuantumRotatorFrame$Phasor$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumRotatorFrame.State")) {
test.falstad.QuantumRotatorFrame.$QuantumRotatorFrame$State$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumRotatorFrame.BasisState")) {
test.falstad.QuantumRotatorFrame.$QuantumRotatorFrame$BasisState$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumRotatorFrame.Complex")) {
test.falstad.QuantumRotatorFrame.$QuantumRotatorFrame$Complex$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumRotatorFrame.PhaseColor")) {
test.falstad.QuantumRotatorFrame.$QuantumRotatorFrame$PhaseColor$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumRotatorFrame.View")) {
test.falstad.QuantumRotatorFrame.$QuantumRotatorFrame$View$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumRotatorFrame.TextBox")) {
test.falstad.QuantumRotatorFrame.$QuantumRotatorFrame$TextBox$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "QuantumRotatorFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "QuantumRotator by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.QuantumRotatorFrame, ["Rigid Rotator v1.5b"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.QuantumRotator");
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
var jv = System.getProperty ("java.class.version");
var jvf =  new Double (jv).doubleValue ();
if (jvf >= 48) this.useBufferedImage = true;
this.main.setLayout ( new test.falstad.QuantumRotatorLayout ());
this.cv =  new test.falstad.QuantumRotatorCanvas (this);
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
m.add (this.lCheckItem = this.getCheckItem ("Angular Momentum (Z)"));
m.addSeparator ();
m.add (this.colorCheck = this.getCheckItem ("Phase as Color"));
this.colorCheck.setState (true);
m =  new swingjs.awt.Menu ("Options");
mb.add (m);
this.alwaysNormItem = this.getCheckItem ("Always Normalize");
m.add (this.axesItem = this.getCheckItem ("Show Axes"));
this.axesItem.setState (true);
this.setMenuBar (mb);
var i;
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Adjust View");
this.modeChooser.add ("Mouse = Create Gaussian");
this.modeChooser.add ("Mouse = Gaussian w/ Momentum");
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
this.main.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.main.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 6, 1, 1, 200));
this.speedBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 743, 1, 1, 4000));
this.brightnessBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Image Resolution", 0));
this.main.add (this.resolutionBar =  new swingjs.awt.Scrollbar (0, 150, 2, 20, 500));
this.resolutionBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Phasor Count", 0));
this.main.add (this.phasorBar =  new swingjs.awt.Scrollbar (0, 8, 1, 3, 30));
this.phasorBar.addAdjustmentListener (this);
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

this.grayLevels =  new Array (256);
for (i = 0; i != 256; i++) this.grayLevels[i] =  new java.awt.Color (i, i, i);

this.rotmatrix =  Clazz.newDoubleArray (9, 0);
this.setView ();
this.xpoints =  Clazz.newIntArray (4, 0);
this.ypoints =  Clazz.newIntArray (4, 0);
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
this.setupStates ();
} else {
this.setVisible (false);
this.handleResize ();
this.applet.validate ();
}});
Clazz.defineMethod (c$, "setView", 
function () {
var i;
for (i = 0; i != 9; i++) this.rotmatrix[i] = 0;

this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.rotate (0, -1.5707963267948966);
});
Clazz.defineMethod (c$, "setupStates", 
function () {
this.stateCount = 1024;
var i;
this.states =  new Array (this.stateCount);
var l = 0;
var m = 0;
var dshalf = Clazz.doubleToInt (this.dataSize / 2);
for (i = 0; i != this.stateCount; i++) {
var bs = this.states[i] = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.BasisState, this, null);
bs.elevel = l * (l + 1);
bs.l = l;
bs.m = m;
var mpos = (m < 0) ? -m : m;
var lgcorrect = java.lang.Math.pow (-1, m);
var norm = this.sphericalNorm (l, mpos);
var dataTh = bs.plm =  Clazz.newDoubleArray (this.dataSizeTh, 0);
var mphase = java.lang.Math.pow (-1, m);
lgcorrect *= mphase * norm;
var x;
for (x = 0; x != this.dataSizeTh; x++) {
var th = x * 3.141592653589793 / (this.dataSizeTh - 1);
dataTh[x] = lgcorrect * this.plgndr (l, mpos, java.lang.Math.cos (th));
}
if (m < l) m++;
 else {
l++;
m = -l;
}}
this.states[13].set (1);
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
c = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.PhaseColor, this, null, 1, a2, 0);
break;
case 1:
c = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.PhaseColor, this, null, a3, 1, 0);
break;
case 2:
c = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.PhaseColor, this, null, 0, 1, a2);
break;
case 3:
c = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.PhaseColor, this, null, 0, a3, 1);
break;
case 4:
c = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.PhaseColor, this, null, a2, 0, 1);
break;
case 5:
c = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.PhaseColor, this, null, 1, 0, a3);
break;
}
return c;
}, "~N,~N");
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
this.setResolution ();
var d = this.winSize = this.cv.getSize ();
if (this.winSize.width == 0) return;
this.dbimage = this.createImage (d.width, d.height);
this.setupDisplay ();
});
Clazz.defineMethod (c$, "createPhasors", 
function () {
this.phasorCount = this.textCount = 0;
var i;
if (this.viewStates == null) return;
var sz = Clazz.doubleToInt (this.viewStates.height / this.phasorBar.getValue ());
if (sz < 7) sz = 7;
var x = Clazz.doubleToInt (this.viewStates.width / 2);
var y = this.viewStates.y;
var n = 1;
var l = 0;
var m = 0;
this.textBoxes =  new Array (10);
this.phasorCount = this.phasorBar.getValue ();
this.phasorCount *= this.phasorCount;
this.phasors =  new Array (this.phasorCount);
for (i = 0; i != this.phasorCount; i++) {
var ph = this.phasors[i] = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.Phasor, this, null, x, y, sz, sz);
ph.state = this.states[i];
x += sz;
if (++m > l) {
x -= sz * (2 * l + 2);
y += sz;
l++;
m = -l;
}}
});
Clazz.defineMethod (c$, "setInitialOrbital", 
function () {
if (this.phasorCount == 0) return;
var i;
for (i = 0; i != this.stateCount; i++) if (this.states[i].mag > 0) return;

for (i = 0; i != this.phasorCount; i++) if (Clazz.instanceOf (this.phasors[i].state, test.falstad.QuantumRotatorFrame.BasisState)) {
this.phasors[i].state.set (1);
return;
}
});
Clazz.defineMethod (c$, "createBasisPhasors", 
function (x, y, sz, i, n, l) {
var j;
for (j = 0; j != l * 2 + 1; j++) {
var ph = this.phasors[i] = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.Phasor, this, null, x, y, sz, sz);
ph.state = this.getState (n, l, j - l);
x += sz;
i++;
}
return i;
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "createText", 
function (text, x, y, sz) {
var tb = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.TextBox, this, null, x + 10, y, this.winSize.width - x, sz, text);
this.textBoxes[this.textCount++] = tb;
}, "~S,~N,~N,~N");
Clazz.defineMethod (c$, "setupDisplay", 
function () {
if (this.winSize == null) return;
var potsize = (this.viewPotential == null) ? 50 : this.viewPotential.height;
var statesize = (this.viewStates == null) ? 96 : this.viewStates.height;
this.viewX = this.viewPotential = this.viewL = this.viewStates = null;
this.viewList =  new Array (10);
var i = 0;
if (this.eCheckItem.getState ()) this.viewList[i++] = this.viewPotential = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.View, this, null);
if (this.xCheckItem.getState ()) this.viewList[i++] = this.viewX = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.View, this, null);
if (this.lCheckItem.getState ()) this.viewList[i++] = this.viewL = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.View, this, null);
this.viewList[i++] = this.viewStates = Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.View, this, null);
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
this.pixels =  Clazz.newIntArray (this.viewX.width * this.viewX.height, 0);
for (i = 0; i != this.viewX.width * this.viewX.height; i++) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (this.viewX.width, this.viewX.height, this.pixels, 0, this.viewX.width);
this.imageSource.setAnimated (true);
this.imageSource.setFullBufferUpdates (true);
this.memimage = this.cv.createImage (this.imageSource);
}var asize = Clazz.doubleToInt (this.min (this.viewX.width, this.viewX.height) / 4);
this.viewAxes =  new java.awt.Rectangle (this.viewX.x + this.winSize.width - asize, this.viewX.y, asize, asize);
this.floorValues = null;
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
this.dataSize = 128;
this.dataSizePh = this.dataSize;
this.dataSizeTh = this.dataSize + 1;
this.func =  Clazz.newDoubleArray (this.dataSizeTh, this.dataSizePh, 0);
this.funci =  Clazz.newDoubleArray (this.dataSizeTh, this.dataSizePh, 0);
System.out.print ("setResolution " + this.dataSize + " " + this.gridSizeX + "\n");
this.fft =  new test.falstad.FFT5 (this.dataSizePh);
this.resadj = 50. / this.dataSize;
});
Clazz.defineMethod (c$, "computeView", 
function (normmult) {
var i;
var j;
var q = 3.14159265 / this.dataSize;
var color = this.colorCheck.getState ();
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
var boundRadius2 = .5;
boundRadius2 *= boundRadius2;
var phiMask = this.dataSizePh - 1;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var camvx0 = (2 * i / this.gridSizeX - 1) * aratiox;
var camvy0 = -(2 * j / this.gridSizeY - 1) * aratioy;
var camx = rotm[2] * test.falstad.QuantumRotatorFrame.viewDistance;
var camy = rotm[5] * test.falstad.QuantumRotatorFrame.viewDistance;
var camz = rotm[8] * test.falstad.QuantumRotatorFrame.viewDistance;
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
if (discrim < 0) {
if (color) {
var xx = 40. / this.colorMult;
this.fillSquare (i, j, xx, xx, xx);
} else {
this.fillSquare (i, j, 0, 0, 64. / this.colorMult);
}continue;
}discrim = java.lang.Math.sqrt (discrim);
var mint = (-b - discrim) / (2 * a);
var xx = (camx + camvx * mint) * xmult;
var yy = (camy + camvy * mint) * ymult;
var zz = (camz + camvz * mint) * zmult;
var dshalf = Clazz.doubleToInt (this.dataSizeTh / 2);
var r = xmult * .5;
var costh = zz / r;
var th = java.lang.Math.acos (costh);
var th0 = th / 3.141592653589793 * (this.dataSizeTh - 1);
var thi = Clazz.doubleToInt (th0);
var thw = th0 - thi;
var phi = this.calcPhiComponent (xx, yy);
var phii = Clazz.doubleToInt (phi);
var phiw = phi - phii;
var phi1 = (phii + 1) & phiMask;
var fr = this.func[thi][phii] * (1 - thw) * (1 - phiw) + this.func[thi + 1][phii] * thw * (1 - phiw) + this.func[thi][phi1] * (1 - thw) * phiw + this.func[thi + 1][phi1] * thw * phiw;
var fi = this.funci[thi][phii] * (1 - thw) * (1 - phiw) + this.funci[thi + 1][phii] * thw * (1 - phiw) + this.funci[thi][phi1] * (1 - thw) * phiw + this.funci[thi + 1][phi1] * thw * phiw;
if (color) {
var fv = fr * fr + fi * fi;
var col = this.getPhaseColor (fr, fi);
simpr = col.r * fv;
simpg = col.g * fv;
simpb = col.b * fv;
} else {
var fv = (fr * fr + fi * fi);
simpr = simpg = simpb = fv;
}this.fillSquare (i, j, simpr, simpg, simpb);
}

}, "~N");
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
var sectorMult = Clazz.doubleToInt (this.dataSizePh / 8);
var phiSector = 0;
var val = 0;
if (x == 0 && y == 0) return 0;
if (y >= 0) {
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
}}}return (phiSector + val) * sectorMult;
}, "~N,~N");
Clazz.defineMethod (c$, "genFunc", 
function (normmult) {
var i;
var j;
var th;
var ph;
var wc = this.dataSizePh * 2;
var wm = wc - 1;
var xformbuf =  Clazz.newDoubleArray (wc, 0);
for (th = 0; th != this.dataSizeTh; th++) {
for (i = 0; i != wc; i++) xformbuf[i] = 0;

for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
var ii = wm & (-st.m * 2);
xformbuf[ii] += st.re * st.plm[th];
xformbuf[ii + 1] += st.im * st.plm[th];
}
this.fft.transform (xformbuf, true);
for (i = 0; i != this.dataSizePh; i++) {
this.func[th][i] = xformbuf[i * 2] * normmult;
this.funci[th][i] = xformbuf[i * 2 + 1] * normmult;
}
}
}, "~N");
Clazz.defineMethod (c$, "transform", 
function () {
var wc = this.dataSizePh * 2;
var wm = wc - 1;
var i;
for (i = 0; i != this.stateCount; i++) this.states[i].set (0);

this.t = 0;
var th;
var xformbuf =  Clazz.newDoubleArray (wc, 0);
for (th = 0; th != this.dataSizeTh; th++) {
var mult = java.lang.Math.sin (th * 3.141592653589793 / (this.dataSizeTh - 1));
for (i = 0; i != this.dataSizePh; i++) {
xformbuf[i * 2] = this.func[th][i];
xformbuf[i * 2 + 1] = this.funci[th][i];
}
this.fft.transform (xformbuf, false);
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
var ii = wm & (-st.m * 2);
st.quickAdd (xformbuf[ii] * st.plm[th] * mult, xformbuf[ii + 1] * st.plm[th] * mult);
}
}
for (i = 0; i != this.stateCount; i++) this.states[i].setMagPhase ();

this.maximize ();
});
Clazz.defineMethod (c$, "sign", 
function (x) {
return x < 0 ? -1 : 1;
}, "~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateQuantumRotator", 
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
var val = this.speedBar.getValue ();
var sysTime = System.currentTimeMillis ();
if (this.lastTime != 0) tadd = val * (6.25E-6) * (sysTime - this.lastTime);
this.lastTime = sysTime;
this.t += tadd;
} else {
this.lastTime = 0;
allQuiet = true;
}var norm = 0;
var normmult = 0;
var normmult2 = 0;
if (this.alwaysNormItem.getState ()) this.normalize ();
var i;
if (!this.editingFunc && tadd != 0) {
allQuiet = false;
for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
if (st.mag < 0.01) {
st.set (0);
continue;
}st.rotate (-(st.elevel + 0.0) * tadd);
}
}for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
norm += st.magSquared ();
}
normmult2 = 1 / norm;
if (norm == 0) normmult2 = 0;
normmult = java.lang.Math.sqrt (normmult2);
this.genFunc (normmult);
this.colorMult = java.lang.Math.exp (this.brightnessBar.getValue () / 100.);
this.computeView (normmult);
var j;
var k;
for (i = 1; i != this.viewCount; i++) {
g.setColor (i == this.selectedPaneHandle ? java.awt.Color.yellow : java.awt.Color.gray);
g.drawLine (0, this.viewList[i].paneY, this.winSize.width, this.viewList[i].paneY);
}
if (this.viewPotential != null) {
var ymult = .2;
g.setColor (java.awt.Color.darkGray);
var floory = this.viewPotential.y + this.viewPotential.height - 1;
if (this.floorValues == null) this.floorValues =  Clazz.newIntArray (floory + 1, 0);
for (i = 0; i <= floory; i++) this.floorValues[i] = 0;

for (i = 0; i != this.stateCount; i++) {
var st = this.states[i];
var dy = st.elevel;
var m = st.magSquared ();
var mc = Clazz.doubleToInt ((224) * m) + 1;
var y;
y = floory - Clazz.doubleToInt (ymult * dy);
if (y >= 0 && y <= floory) this.floorValues[y] += mc;
}
for (i = 0; i <= floory; i++) {
if (this.floorValues[i] == 0) continue;
var mc = this.floorValues[i] + 32;
if (mc > 255) mc = 255;
g.setColor (this.grayLevels[mc]);
g.drawLine (0, i, this.winSize.width, i);
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
var maxm = 32;
var pad = 3;
var ct = (maxm * 2 + 1) * pad;
var ldata =  Clazz.newDoubleArray (ct, 0);
this.calcLz (ldata, ct, maxm, pad, false);
this.drawFunction (g, this.viewL, ldata, ct, pad, false);
}if (this.imageSource != null) this.imageSource.newPixels ();
g.drawImage (this.memimage, this.viewX.x, this.viewX.y, null);
g.setColor (java.awt.Color.white);
if (this.axesItem.getState ()) this.drawAxes (g);
for (i = 0; i != this.textCount; i++) {
var tb = this.textBoxes[i];
var h = Clazz.doubleToInt ((tb.height + this.fontMetrics.getAscent () - this.fontMetrics.getDescent ()) / 2);
g.drawString (tb.text, tb.x, tb.y + h);
}
g.setColor (java.awt.Color.yellow);
if (this.selectedState != null) this.centerString (g, this.selectedState.getText (), this.viewX.y + this.viewX.height - 5);
if (this.viewStates != null) {
this.drawPhasors (g, this.viewStates);
g.setColor (java.awt.Color.white);
var termWidth = this.phasors[0].width;
var x = this.winSize.width - Clazz.doubleToInt (termWidth / 2);
var y = this.viewStates.y + Clazz.doubleToInt (termWidth / 2);
var omega = 2;
var tcos = java.lang.Math.cos (-omega * this.t + 1.5707963267948966);
var tsin = java.lang.Math.sin (-omega * this.t + 1.5707963267948966);
var ss2 = Clazz.doubleToInt (termWidth / 2);
var xa = Clazz.doubleToInt (tcos * ss2);
var ya = Clazz.doubleToInt (-tsin * ss2);
g.drawOval (x - ss2, y - ss2, termWidth, termWidth);
g.drawLine (x, y, x + xa, y + ya);
g.drawLine (x + xa, y + ya - 1, x + xa, y + ya + 1);
g.drawLine (x + xa - 1, y + ya, x + xa + 1, y + ya);
}realg.drawImage (this.dbimage, 0, 0, this);
if (!allQuiet) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
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
}var colval = 0xFF000000 + ((Clazz.doubleToInt (cr)) << 16) | ((Clazz.doubleToInt (cg)) << 8) | ((Clazz.doubleToInt (cb)));
var y2l = y2 * this.viewX.width;
for (k = x; k < x2; k++) for (l = y * this.viewX.width; l < y2l; l += this.viewX.width) this.pixels[k + l] = colval;


}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "centerString", 
function (g, str, ypos) {
g.drawString (str, Clazz.doubleToInt ((this.winSize.width - this.fontMetrics.stringWidth (str)) / 2), ypos);
}, "java.awt.Graphics,~S,~N");
Clazz.defineMethod (c$, "visibleFace", 
function (nx, ny, nz) {
var viewx = test.falstad.QuantumRotatorFrame.viewDistance * this.rotmatrix[2];
var viewy = test.falstad.QuantumRotatorFrame.viewDistance * this.rotmatrix[5];
var viewz = test.falstad.QuantumRotatorFrame.viewDistance * this.rotmatrix[8];
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
g.setColor (yel ? java.awt.Color.yellow : st.mag == 0 ? this.gray2 : java.awt.Color.white);
g.drawOval (x - ss2, y - ss2, ss, ss);
var xa = Clazz.doubleToInt (st.re * ss2);
var ya = Clazz.doubleToInt (-st.im * ss2);
g.drawLine (x, y, x + xa, y + ya);
g.drawLine (x + xa, y + ya - 1, x + xa, y + ya + 1);
g.drawLine (x + xa - 1, y + ya, x + xa + 1, y + ya);
}
}, "java.awt.Graphics,test.falstad.QuantumRotatorFrame.View");
Clazz.defineMethod (c$, "drawFunction", 
function (g, view, fr, count, pad, fromZero) {
var i;
var expectx = 0;
var expectx2 = 0;
var maxsq = 0;
var tot = 0;
var vw = this.winSize.width;
var vw2 = vw;
var mid_x = (fromZero) ? (Clazz.doubleToInt (vw2 / (count - 1))) : Clazz.doubleToInt (vw2 * (Clazz.doubleToInt (count / 2)) / (count - 1));
var zero = mid_x;
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
var x = Clazz.doubleToInt (vw2 * i / (count - 1));
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
}}, "java.awt.Graphics,test.falstad.QuantumRotatorFrame.View,~A,~N,~N,~B");
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
var realz = test.falstad.QuantumRotatorFrame.viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
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
var mx = test.falstad.QuantumRotatorFrame.viewDistance * rotm[2];
var my = test.falstad.QuantumRotatorFrame.viewDistance * rotm[5];
var mz = test.falstad.QuantumRotatorFrame.viewDistance * rotm[8];
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
Clazz.defineMethod (c$, "doGauss", 
function (xx, yy, mom) {
var i;
var j;
var dshalf = Clazz.doubleToInt (this.dataSizeTh / 2);
if (xx < 0) xx = 0;
if (yy < 0) yy = 0;
var gx = Clazz.doubleToInt (500 / (xx + 5));
var gy = Clazz.doubleToInt (500 / (yy + 5));
var gm = mom / 3.;
if (gm > 24) gm = 24;
if (gm < -24) gm = -24;
for (i = 0; i != this.dataSizeTh; i++) {
var th = i * 3.141592653589793 / (this.dataSizeTh - 1);
var z = java.lang.Math.cos (th);
var sinth = java.lang.Math.sin (th);
for (j = 0; j != this.dataSizePh; j++) {
var ph = j * 2 * 3.141592653589793 / this.dataSizePh;
var x = java.lang.Math.cos (ph) * sinth;
var y = java.lang.Math.sin (ph) * sinth;
var d1 = java.lang.Math.exp (-gx * ((y + 1) * (y + 1) + x * x) - gy * z * z);
this.func[i][j] = d1 * java.lang.Math.cos ((ph - 4.71238898038469) * gm);
this.funci[i][j] = d1 * java.lang.Math.sin ((ph - 4.71238898038469) * gm);
}
}
this.transform ();
this.editingFunc = true;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.phasorBar) this.setupDisplay ();
if (e.getSource () === this.brightnessBar) {
var mult = java.lang.Math.exp (this.brightnessBar.getValue () / 100.);
this.userBrightMult = mult / this.bestBrightness;
}if (e.getSource () === this.resolutionBar) this.setResolution ();
this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.dragging = true;
this.edit (e);
this.dragX = e.getX ();
this.dragY = e.getY ();
}, "java.awt.event.MouseEvent");
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
} else if (this.viewPotential != null && this.viewPotential.contains (x, y)) {
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
}, "test.falstad.QuantumRotatorFrame.View,~N,~N");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
if (this.selection == 3) this.editMagClick ();
if (e.getClickCount () == 2 && this.selectedState != null) this.enterSelectedState ();
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "enterSelectedState", 
function () {
var i;
for (i = 0; i != this.stateCount; i++) if (this.states[i] !== this.selectedState) this.states[i].set (0);

this.selectedState.set (1);
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
this.dragging = this.editingFunc = false;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (Clazz.instanceOf (e.getItemSelectable (), swingjs.awt.CheckboxMenuItem)) {
this.setupDisplay ();
this.cv.repaint (this.pause);
return;
}this.cv.repaint (this.pause);
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.QuantumRotatorFrame, "handleEvent", [ev]);
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
if (mode == 0) {
var xo = this.dragX - x;
var yo = this.dragY - y;
this.rotate (xo / 40., -yo / 40.);
this.cv.repaint (this.pause);
} else if (mode == 1) {
this.doGauss (x - this.dragStartX, y - this.dragStartY, 0);
this.setView ();
this.cv.repaint ();
} else if (mode == 2) {
var xx = x - this.dragStartX;
var yy = y - this.dragStartY;
this.doGauss (yy, yy, xx);
this.setView ();
this.cv.repaint ();
} else if (mode == 3) {
var xo = this.dragX - this.dragStartX;
this.zoom = this.dragZoomStart + xo / 20.;
if (this.zoom < .1) this.zoom = .1;
System.out.println (this.zoom);
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
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "editMagClick", 
function () {
if (this.selectedState == null) return;
if (this.magDragStart < .5) this.selectedState.set (1, 0);
 else this.selectedState.set (0);
this.cv.repaint (this.pause);
});
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
for (i = 0; i != this.stateCount; i++) {
this.states[i].mult (1 / maxm);
if (this.states[i].mag < 0.01) this.states[i].set (0);
}
this.cv.repaint (this.pause);
});
Clazz.defineMethod (c$, "getState", 
function (n, l, m) {
var pre_n = n - 1;
var pre_n_add = Clazz.doubleToInt (pre_n * (pre_n + 1) * (2 * pre_n + 1) / 6);
var pre_l_add = l * l;
return this.states[pre_n_add + pre_l_add + l + m];
}, "~N,~N,~N");
Clazz.defineMethod (c$, "radialNorm", 
function (n, l) {
var a0 = this.factorial (n + l);
return java.lang.Math.sqrt (4. * this.factorial (n + l) / (n * n * n * n * this.factorial (n - l - 1))) / this.factorial (2 * l + 1);
}, "~N,~N");
Clazz.defineMethod (c$, "sphericalNorm", 
function (l, m) {
return java.lang.Math.sqrt ((2 * l + 1) * this.factorial (l - m) / (4 * 3.141592653589793 * this.factorial (l + m)));
}, "~N,~N");
Clazz.defineMethod (c$, "factorial", 
function (f) {
var res = 1;
while (f > 1) res *= f--;

return res;
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
c$.$QuantumRotatorFrame$Phasor$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.state = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumRotatorFrame, "Phasor", java.awt.Rectangle);
c$ = Clazz.p0p ();
};
c$.$QuantumRotatorFrame$State$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.elevel = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumRotatorFrame, "State", test.falstad.QuantumRotatorFrame.Complex, null, Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.Complex, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "setBasisActive", 
function () {
});
c$ = Clazz.p0p ();
};
c$.$QuantumRotatorFrame$BasisState$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.l = 0;
this.m = 0;
this.plm = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumRotatorFrame, "BasisState", test.falstad.QuantumRotatorFrame.State, null, Clazz.innerTypeInstance (test.falstad.QuantumRotatorFrame.State, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getText", 
function () {
return "l = " + this.l + ", m = " + this.m;
});
c$ = Clazz.p0p ();
};
c$.$QuantumRotatorFrame$Complex$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.re = 0;
this.im = 0;
this.mag = 0;
this.phase = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumRotatorFrame, "Complex");
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
}, "test.falstad.QuantumRotatorFrame.Complex");
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
}, "test.falstad.QuantumRotatorFrame.Complex");
Clazz.defineMethod (c$, "quickAdd", 
function (a, b) {
this.re += a;
this.im += b;
}, "~N,~N");
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
}, "test.falstad.QuantumRotatorFrame.Complex");
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
c$.$QuantumRotatorFrame$PhaseColor$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.r = 0;
this.g = 0;
this.b = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumRotatorFrame, "PhaseColor");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.r = a;
this.g = b;
this.b = c;
}, "~N,~N,~N");
c$ = Clazz.p0p ();
};
c$.$QuantumRotatorFrame$View$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.scale = 0;
this.paneY = 0;
this.pixels = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumRotatorFrame, "View", java.awt.Rectangle);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.QuantumRotatorFrame.View, []);
});
c$ = Clazz.p0p ();
};
c$.$QuantumRotatorFrame$TextBox$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.text = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumRotatorFrame, "TextBox", java.awt.Rectangle);
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
Clazz.superConstructor (this, test.falstad.QuantumRotatorFrame.TextBox, [a, b, c, d]);
this.text = e;
}, "~N,~N,~N,~N,~S");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
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
"MODE_GAUSS", 1,
"MODE_GAUSSP", 2,
"MODE_ZOOM", 3,
"epsilon", .01,
"panePad", 4,
"phaseColorCount", 50);
c$ = Clazz.decorateAsClass (function () {
this.wtabf = null;
this.wtabi = null;
this.size = 0;
Clazz.instantialize (this, arguments);
}, test.falstad, "FFT5");
Clazz.makeConstructor (c$, 
function (sz) {
this.size = sz;
if ((this.size & (this.size - 1)) != 0) System.out.println ("size must be power of two!");
this.calcWTable ();
}, "~N");
Clazz.defineMethod (c$, "calcWTable", 
function () {
this.wtabf =  Clazz.newDoubleArray (this.size, 0);
this.wtabi =  Clazz.newDoubleArray (this.size, 0);
var i;
for (i = 0; i != this.size; i += 2) {
var pi = 3.1415926535;
var th = pi * i / this.size;
this.wtabf[i] = Math.cos (th);
this.wtabf[i + 1] = Math.sin (th);
this.wtabi[i] = this.wtabf[i];
this.wtabi[i + 1] = -this.wtabf[i + 1];
}
});
Clazz.defineMethod (c$, "transform", 
function (data, inv) {
var i;
var j = 0;
var size2 = this.size * 2;
if ((this.size & (this.size - 1)) != 0) System.out.println ("size must be power of two!");
var q;
var bit;
for (i = 0; i != size2; i += 2) {
if (i > j) {
q = data[i];
data[i] = data[j];
data[j] = q;
q = data[i + 1];
data[i + 1] = data[j + 1];
data[j + 1] = q;
}bit = this.size;
while ((bit & j) != 0) {
j &= ~bit;
bit >>= 1;
}
j |= bit;
}
var tabskip = this.size << 1;
var wtab = (inv) ? this.wtabi : this.wtabf;
var skip1;
var skip2;
var ix;
var j2;
var wr;
var wi;
var d1r;
var d1i;
var d2r;
var d2i;
var d2wr;
var d2wi;
for (i = 0; i != size2; i += 4) {
d1r = data[i];
d1i = data[i + 1];
d2r = data[i + 2];
d2i = data[i + 3];
data[i] = d1r + d2r;
data[i + 1] = d1i + d2i;
data[i + 2] = d1r - d2r;
data[i + 3] = d1i - d2i;
}
tabskip >>= 1;
var imult = (inv) ? -1 : 1;
for (i = 0; i != size2; i += 8) {
d1r = data[i];
d1i = data[i + 1];
d2r = data[i + 4];
d2i = data[i + 5];
data[i] = d1r + d2r;
data[i + 1] = d1i + d2i;
data[i + 4] = d1r - d2r;
data[i + 5] = d1i - d2i;
d1r = data[i + 2];
d1i = data[i + 3];
d2r = data[i + 6] * imult;
d2i = data[i + 7] * imult;
data[i + 2] = d1r - d2i;
data[i + 3] = d1i + d2r;
data[i + 6] = d1r + d2i;
data[i + 7] = d1i - d2r;
}
tabskip >>= 1;
for (skip1 = 16; skip1 <= size2; skip1 <<= 1) {
skip2 = skip1 >> 1;
tabskip >>= 1;
for (i = 0; i != 1000; i++) ;
for (i = 0; i < size2; i += skip1) {
ix = 0;
for (j = i; j != i + skip2; j += 2, ix += tabskip) {
wr = wtab[ix];
wi = wtab[ix + 1];
d1r = data[j];
d1i = data[j + 1];
j2 = j + skip2;
d2r = data[j2];
d2i = data[j2 + 1];
d2wr = d2r * wr - d2i * wi;
d2wi = d2r * wi + d2i * wr;
data[j] = d1r + d2wr;
data[j + 1] = d1i + d2wi;
data[j2] = d1r - d2wr;
data[j2 + 1] = d1i - d2wi;
}
}
}
}, "~A,~B");
});
