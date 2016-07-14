Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "$.Rectangle", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.QuantumCirc", "$.QuantumCircFrame", "$.QuantumCircLayout", "$.QuantumCircCanvas"], ["java.awt.Color", "$.Dimension", "java.awt.image.MemoryImageSource", "java.lang.Double", "java.util.Random", "swingjs.awt.Button", "$.Checkbox", "$.CheckboxMenuItem", "$.Choice", "$.Label", "$.Menu", "$.MenuBar", "$.MenuItem", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "QuantumCircCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.QuantumCircCanvas, []);
this.pg = p;
}, "test.falstad.QuantumCircFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateQuantumCirc (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateQuantumCirc (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "QuantumCircLayout", null, java.awt.LayoutManager);
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
if (Clazz.instanceOf (m, swingjs.awt.Choice)) d.width = barwidth;
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
}, test.falstad, "QuantumCirc", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.QuantumCirc.ogf != null) test.falstad.QuantumCirc.ogf.dispose ();
test.falstad.QuantumCirc.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.QuantumCirc.ogf =  new test.falstad.QuantumCircFrame (null);
test.falstad.QuantumCirc.ogf.init ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.QuantumCirc.ogf == null) {
this.started = true;
test.falstad.QuantumCirc.ogf =  new test.falstad.QuantumCircFrame (this);
test.falstad.QuantumCirc.ogf.init ();
this.repaint ();
}});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.QuantumCirc.ogf == null) s = "Applet is finished.";
 else if (test.falstad.QuantumCirc.ogf.useFrame) test.falstad.QuantumCirc.ogf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.QuantumCirc, "paint", [g]);
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
if (test.falstad.QuantumCirc.ogf != null) test.falstad.QuantumCirc.ogf.dispose ();
test.falstad.QuantumCirc.ogf = null;
this.repaint ();
});
Clazz.defineStatics (c$,
"ogf", null);
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.maxSampleCount = 70;
this.maxDispPhasorsR = 10;
this.maxDispPhasorsTh = 21;
this.sampleCountR = 0;
this.sampleCountTh = 0;
this.modeCountR = 0;
this.modeCountTh = 0;
this.modeCountM = 0;
this.fftTh = null;
this.groundButton = null;
this.blankButton = null;
this.normalizeButton = null;
this.maximizeButton = null;
this.stoppedCheck = null;
this.eCheckItem = null;
this.xCheckItem = null;
this.pCheckItem = null;
this.lCheckItem = null;
this.statesCheckItem = null;
this.expectCheckItem = null;
this.uncertaintyCheckItem = null;
this.probCheckItem = null;
this.probPhaseCheckItem = null;
this.magPhaseCheckItem = null;
this.alwaysNormItem = null;
this.alwaysMaxItem = null;
this.waveFunctionMenu = null;
this.measureEItem = null;
this.measureLItem = null;
this.exitItem = null;
this.mouseChooser = null;
this.colorCheck = null;
this.brightnessBar = null;
this.speedBar = null;
this.forceBar = null;
this.resBar = null;
this.phasorBar = null;
this.pZoomBar = null;
this.pZoomBarValue = 0;
this.viewPotential = null;
this.viewX = null;
this.viewP = null;
this.viewStates = null;
this.viewXMap = null;
this.viewPMap = null;
this.viewStatesMap = null;
this.viewL = null;
this.viewList = null;
this.viewCount = 0;
this.editingFunc = false;
this.dragStop = false;
this.magcoef = null;
this.phasecoef = null;
this.phasecoefcos = null;
this.phasecoefsin = null;
this.phasecoefadj = null;
this.angle1SinTab = null;
this.angle1CosTab = null;
this.angle2SinTab = null;
this.angle2CosTab = null;
this.elevels = null;
this.xformbuf = null;
this.lzspectrum = null;
this.step = 0;
this.func = null;
this.funci = null;
this.pfunc = null;
this.pfunci = null;
this.phaseColors = null;
this.whitePhaseColor = null;
this.grayLevels = null;
this.xpoints = null;
this.ypoints = null;
this.floorValues = null;
this.xStates = null;
this.pStates = null;
this.selectedCoefX = 0;
this.selectedCoefY = 0;
this.selectedGridX = 0;
this.selectedGridY = 0;
this.selectedPaneHandle = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.dragSet = false;
this.dragClear = false;
this.viewZoom = 1;
this.viewZoomDragStart = 0;
this.scaleHeight = 6;
this.viewHeight = -14;
this.viewHeightDragStart = 0;
this.viewDistance = 0;
this.magDragStart = 0;
this.dragging = false;
this.t = 0;
this.pause = 0;
this.scalex = 0;
this.scaley = 0;
this.centerX3d = 0;
this.centerY3d = 0;
this.topz = 3;
this.brightmult = 0;
this.cv = null;
this.applet = null;
this.useFrame = false;
this.showControls = false;
this.main = null;
this.useBufferedImage = false;
this.shown = false;
this.lspacing = 3;
this.lastTime = 0;
this.lastGaussWx = -8;
this.lastGaussWy = -8;
this.finished = false;
if (!Clazz.isClassDefined ("test.falstad.QuantumCircFrame.FFT")) {
test.falstad.QuantumCircFrame.$QuantumCircFrame$FFT$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumCircFrame.PhaseColor")) {
test.falstad.QuantumCircFrame.$QuantumCircFrame$PhaseColor$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumCircFrame.View")) {
test.falstad.QuantumCircFrame.$QuantumCircFrame$View$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "QuantumCircFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "QuantumCirc Series by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.QuantumCircFrame, ["Quantum Circular Box Applet v1.5a"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.QuantumCirc");
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
this.selectedCoefX = this.selectedCoefY = -1;
this.main.setLayout ( new test.falstad.QuantumCircLayout ());
this.cv =  new test.falstad.QuantumCircCanvas (this);
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
m.add (this.pCheckItem = this.getCheckItem ("Linear Momentum"));
m.add (this.lCheckItem = this.getCheckItem ("Angular Momentum"));
m.add (this.statesCheckItem = this.getCheckItem ("State Phasors"));
this.statesCheckItem.setState (true);
m.addSeparator ();
m.add (this.expectCheckItem = this.getCheckItem ("Expectation Values"));
m.add (this.uncertaintyCheckItem = this.getCheckItem ("Uncertainties"));
var m2 = this.waveFunctionMenu =  new swingjs.awt.Menu ("Wave Function");
m.add (m2);
m2.add (this.probCheckItem = this.getCheckItem ("Probability"));
m2.add (this.probPhaseCheckItem = this.getCheckItem ("Probability + Phase"));
m2.add (this.magPhaseCheckItem = this.getCheckItem ("Magnitude + Phase"));
this.magPhaseCheckItem.setState (true);
m =  new swingjs.awt.Menu ("Measure");
mb.add (m);
m.add (this.measureEItem = this.getMenuItem ("Measure Energy"));
m.add (this.measureLItem = this.getMenuItem ("Measure Angular Momentum"));
this.setMenuBar (mb);
m =  new swingjs.awt.Menu ("Options");
mb.add (m);
m.add (this.alwaysNormItem = this.getCheckItem ("Always Normalize"));
m.add (this.alwaysMaxItem = this.getCheckItem ("Always Maximize"));
this.alwaysMaxItem.setState (true);
this.setMenuBar (mb);
this.mouseChooser =  new swingjs.awt.Choice ();
this.mouseChooser.add ("Mouse = Create Gaussian");
this.mouseChooser.add ("Mouse = Gaussian w/ Momentum");
this.mouseChooser.add ("Mouse = Rotate Function");
this.mouseChooser.addItemListener (this);
this.main.add (this.mouseChooser);
this.mouseChooser.select (0);
this.main.add (this.blankButton =  new swingjs.awt.Button ("Clear"));
this.blankButton.addActionListener (this);
this.main.add (this.normalizeButton =  new swingjs.awt.Button ("Normalize"));
this.normalizeButton.addActionListener (this);
this.main.add (this.maximizeButton =  new swingjs.awt.Button ("Maximize"));
this.maximizeButton.addActionListener (this);
this.main.add (this.groundButton =  new swingjs.awt.Button ("Ground State"));
this.groundButton.addActionListener (this);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
this.main.add (this.stoppedCheck);
this.main.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.main.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 105, 1, 1, 300));
this.speedBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 980, 1, 700, 2000));
this.brightnessBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Resolution", 0));
this.main.add (this.resBar =  new swingjs.awt.Scrollbar (0, 16, 1, 2, Clazz.doubleToInt (this.maxSampleCount / 2)));
this.resBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Momentum Zoom", 0));
this.main.add (this.pZoomBar =  new swingjs.awt.Scrollbar (0, 166, 1, 45, 260));
this.pZoomBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Phasor Count", 0));
this.main.add (this.phasorBar =  new swingjs.awt.Scrollbar (0, 10, 1, 5, Clazz.doubleToInt (this.maxSampleCount / 2)));
this.phasorBar.addAdjustmentListener (this);
this.setResolution ();
try {
var param = this.applet.getParameter ("PAUSE");
if (param != null) this.pause = Integer.parseInt (param);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
var i;
var j;
this.phaseColors =  Clazz.newArray (8, 51, null);
for (i = 0; i != 8; i++) for (j = 0; j <= 50; j++) {
var ang = java.lang.Math.atan (j / 50);
this.phaseColors[i][j] = this.genPhaseColor (i, ang);
}

this.whitePhaseColor = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.PhaseColor, this, null, 1, 1, 1);
this.grayLevels =  new Array (256);
for (i = 0; i != 256; i++) this.grayLevels[i] =  new java.awt.Color (i, i, i);

this.random =  new java.util.Random ();
this.reinit ();
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (java.awt.Color.lightGray);
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
c = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.PhaseColor, this, null, 1, a2, 0);
break;
case 1:
c = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.PhaseColor, this, null, a3, 1, 0);
break;
case 2:
c = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.PhaseColor, this, null, 0, 1, a2);
break;
case 3:
c = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.PhaseColor, this, null, 0, a3, 1);
break;
case 4:
c = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.PhaseColor, this, null, a2, 0, 1);
break;
case 5:
c = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.PhaseColor, this, null, 1, 0, a3);
break;
}
return c;
}, "~N,~N");
Clazz.defineMethod (c$, "reinit", 
function () {
this.doBlank ();
this.magcoef[1][0] = 1;
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
this.dbimage = this.createImage (d.width, d.height);
this.setupDisplay ();
});
Clazz.defineMethod (c$, "setupDisplay", 
function () {
if (this.winSize == null) return;
var potsize = (this.viewPotential == null) ? 50 : this.viewPotential.height;
var statesize = (this.viewStates == null) ? 150 : this.viewStates.height;
this.viewX = this.viewL = this.viewP = this.viewPotential = this.viewStates = null;
this.viewList =  new Array (10);
var i = 0;
if (this.eCheckItem.getState ()) this.viewList[i++] = this.viewPotential = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.View, this, null);
if (this.xCheckItem.getState ()) this.viewList[i++] = this.viewX = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.View, this, null);
if (this.pCheckItem.getState ()) this.viewList[i++] = this.viewP = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.View, this, null);
if (this.lCheckItem.getState ()) this.viewList[i++] = this.viewL = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.View, this, null);
if (this.statesCheckItem.getState ()) this.viewList[i++] = this.viewStates = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.View, this, null);
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
var h = Clazz.doubleToInt (toth / sizenum);
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
this.viewXMap = null;
this.viewStatesMap = null;
if (this.viewStates != null) {
this.viewStatesMap = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.View, this, null, this.viewStates);
var a = this.viewStates.width / this.viewStates.height;
var a2 = this.modeCountTh / this.modeCountR;
var w;
var h;
if (a2 > a) w = this.viewStates.width - 2;
 else w = Clazz.doubleToInt ((this.viewStates.height - 2) * a2);
this.viewStatesMap.x += Clazz.doubleToInt ((this.viewStatesMap.width - w) / 2) + 1;
this.viewStatesMap.width = w;
}if (this.viewX != null) {
this.viewXMap = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.View, this, null, this.viewX);
this.processMap (this.viewXMap);
}if (this.viewP != null) {
this.viewPMap = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.View, this, null, this.viewP);
this.processMap (this.viewPMap);
}if (this.viewL != null) {
var v = this.viewL;
v.mid_y = v.y + Clazz.doubleToInt (v.height / 2);
v.ymult = .90 * v.height / 2;
v.lower_y = Clazz.doubleToInt (v.mid_y + v.ymult);
v.ymult2 = v.ymult * 2;
}this.floorValues = null;
});
Clazz.defineMethod (c$, "processMap", 
function (v) {
var a = v.width / v.height;
var w;
var h;
if (1 > a) w = h = v.width - 2;
 else w = h = v.height - 2;
v.x += Clazz.doubleToInt ((v.width - w) / 2) + 1;
v.y += Clazz.doubleToInt ((v.height - h) / 2) + 1;
v.width = w;
v.height = h;
if (this.useBufferedImage) {
try {
var biclass = Clazz._4Name ("java.awt.image.BufferedImage");
var dbiclass = Clazz._4Name ("java.awt.image.DataBufferInt");
var rasclass = Clazz._4Name ("java.awt.image.Raster");
var cstr = biclass.getConstructor ([Number, Number, Number]);
v.memimage = cstr.newInstance ([ new Integer (v.width),  new Integer (v.height),  new Integer (1)]);
var m = biclass.getMethod ("getRaster", null);
var ras = m.invoke (v.memimage, null);
var db = rasclass.getMethod ("getDataBuffer", null).invoke (ras, null);
v.pixels = dbiclass.getMethod ("getData", null).invoke (db, null);
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
System.out.println ("BufferedImage failed");
} else {
throw ee;
}
}
}if (v.pixels == null) {
v.pixels =  Clazz.newIntArray (v.width * v.height, 0);
var i;
for (i = 0; i != v.width * v.height; i++) v.pixels[i] = 0xFF000000;

v.imageSource =  new java.awt.image.MemoryImageSource (v.width, v.height, v.pixels, 0, v.width);
v.imageSource.setAnimated (true);
v.imageSource.setFullBufferUpdates (true);
v.memimage = this.cv.createImage (v.imageSource);
}}, "test.falstad.QuantumCircFrame.View");
Clazz.defineMethod (c$, "min", 
function (x, y) {
return (x < y) ? x : y;
}, "~N,~N");
Clazz.defineMethod (c$, "doGround", 
function () {
this.doBlank ();
this.magcoef[0][0] = 1;
this.t = 0;
});
Clazz.defineMethod (c$, "normalize", 
function () {
var norm = 0;
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) norm += this.magcoef[i][j] * this.magcoef[i][j];


if (norm == 0) return;
var normmult = 1 / java.lang.Math.sqrt (norm);
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.magcoef[i][j] *= normmult;


this.cv.repaint (this.pause);
});
Clazz.defineMethod (c$, "maximize", 
function () {
var i;
var j;
var maxm = 0;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) if (java.lang.Math.abs (this.magcoef[i][j]) > maxm) maxm = java.lang.Math.abs (this.magcoef[i][j]);


if (maxm == 0) return;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.magcoef[i][j] *= 1 / maxm;


this.cv.repaint (this.pause);
});
Clazz.defineMethod (c$, "measureE", 
function () {
this.normalize ();
var n = this.random.nextDouble ();
var i = 0;
var j = 0;
var picki = -1;
var pickj = -1;
for (i = 0; i < this.modeCountTh; i++) for (j = 0; j < this.modeCountR; j++) {
var m = this.magcoef[i][j] * this.magcoef[i][j];
n -= m;
if (n < 0) {
picki = i;
pickj = j;
i = j = 10000;
break;
}}

if (picki == -1) return;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) if (this.elevels[i][j] != this.elevels[picki][pickj]) this.magcoef[i][j] = 0;


if (this.alwaysNormItem.getState ()) this.normalize ();
 else this.maximize ();
});
Clazz.defineMethod (c$, "calcLSpectrum", 
function () {
var lzcount = this.modeCountTh * 3;
if (this.lzspectrum == null) this.lzspectrum =  Clazz.newDoubleArray (lzcount, 0);
var i;
var j;
for (i = 0; i != lzcount; i++) this.lzspectrum[i] = 0;

var lc = (Clazz.doubleToInt (lzcount / 2));
for (i = 0; i != this.modeCountTh; i++) {
var m = ((i % 2) == 0) ? (Clazz.doubleToInt (i / 2) * 3 + lc) : (lc - Clazz.doubleToInt (3 * (i + 1) / 2));
for (j = 0; j != this.modeCountR; j++) this.lzspectrum[m] += this.magcoef[i][j] * this.magcoef[i][j];

}
});
Clazz.defineMethod (c$, "measureL", 
function () {
this.normalize ();
this.calcLSpectrum ();
var n = this.random.nextDouble ();
var i = 0;
var picki = -1;
var lzcount = this.modeCountTh * 3;
for (i = 0; i != lzcount; i++) {
var m = this.lzspectrum[i];
n -= m;
if (n < 0) {
picki = i;
i = lzcount;
break;
}}
if (picki == -1) return;
var lc = (Clazz.doubleToInt (lzcount / 2));
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
var m = ((i % 2) == 0) ? (Clazz.doubleToInt (i / 2) * 3 + lc) : (lc - Clazz.doubleToInt (3 * (i + 1) / 2));
if (m != picki) this.magcoef[i][j] = 0;
}

if (this.alwaysNormItem.getState ()) this.normalize ();
 else this.maximize ();
});
Clazz.defineMethod (c$, "doBlank", 
function () {
var x;
var y;
for (x = 0; x != this.modeCountTh; x++) for (y = 0; y != this.modeCountR; y++) this.magcoef[x][y] = 0;


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
Clazz.defineMethod (c$, "updateQuantumCirc", 
function (realg) {
if (this.winSize == null || this.winSize.width == 0) {
this.handleResize ();
return;
}var g = this.dbimage.getGraphics ();
if (this.winSize == null || this.winSize.width == 0 || this.dbimage == null) return;
var allQuiet = true;
if (!this.stoppedCheck.getState () && !this.dragging) {
var val = this.speedBar.getValue ();
var tadd = java.lang.Math.exp (val / 20.) * (0.02);
var sysTime = System.currentTimeMillis ();
if (this.lastTime == 0) this.lastTime = sysTime;
tadd *= (sysTime - this.lastTime) * (0.0058823529411764705);
this.t += tadd;
this.lastTime = sysTime;
allQuiet = false;
} else this.lastTime = 0;
var gray1 =  new java.awt.Color (76, 76, 76);
var gray2 =  new java.awt.Color (127, 127, 127);
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
var i;
var j;
for (i = 1; i != this.viewCount; i++) {
g.setColor (i == this.selectedPaneHandle ? java.awt.Color.yellow : java.awt.Color.gray);
g.drawLine (0, this.viewList[i].paneY, this.winSize.width, this.viewList[i].paneY);
}
var x;
var y;
if (this.dragStop) this.t = 0;
var norm = 0;
var normmult = 0;
var normmult2 = 0;
if (!this.editingFunc) {
for (i = 0; i != this.modeCountTh; i++) {
for (j = 0; j != this.modeCountR; j++) {
if (this.magcoef[i][j] < 1.0E-5 && this.magcoef[i][j] > -1.0E-5) {
this.magcoef[i][j] = this.phasecoef[i][j] = this.phasecoefadj[i][j] = 0;
continue;
}allQuiet = false;
this.phasecoef[i][j] = (-this.elevels[i][j] * this.t + this.phasecoefadj[i][j]) % (6.283185307179586);
this.phasecoefcos[i][j] = java.lang.Math.cos (this.phasecoef[i][j]);
this.phasecoefsin[i][j] = java.lang.Math.sin (this.phasecoef[i][j]);
norm += this.magcoef[i][j] * this.magcoef[i][j];
}
}
normmult2 = 1 / norm;
if (norm == 0) normmult2 = 0;
normmult = java.lang.Math.sqrt (normmult2);
this.genFunc (normmult, true);
}this.brightmult = java.lang.Math.exp (this.brightnessBar.getValue () / 200. - 5);
if (norm == 0) normmult = normmult2 = 0;
var half = Clazz.doubleToInt (this.sampleCountTh / 2);
this.xpoints =  Clazz.newIntArray (4, 0);
this.ypoints =  Clazz.newIntArray (4, 0);
if (this.viewPotential != null) {
var floory = this.viewPotential.y + this.viewPotential.height - 5;
var ymult = 200;
if (this.floorValues == null) this.floorValues =  Clazz.newIntArray (floory + 1, 0);
for (i = 0; i <= floory; i++) this.floorValues[i] = 0;

for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
var dy = this.elevels[i][j];
var m = this.magcoef[i][j] * this.magcoef[i][j];
var mc = Clazz.doubleToInt ((224) * m) + 1;
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
g.setColor (java.awt.Color.white);
g.drawLine (this.viewXMap.x, 0, this.viewXMap.x, floory);
var x0 = this.viewXMap.x + this.viewXMap.width;
g.drawLine (x0, 0, x0, floory);
g.drawLine (this.viewXMap.x, floory, x0, floory);
if (norm != 0 && (this.expectCheckItem.getState () || this.uncertaintyCheckItem.getState ())) {
var expecte = 0;
var expecte2 = 0;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
var prob = this.magcoef[i][j] * this.magcoef[i][j] * normmult2;
expecte += prob * this.elevels[i][j];
expecte2 += prob * this.elevels[i][j] * this.elevels[i][j];
}

var uncert = java.lang.Math.sqrt (expecte2 - expecte * expecte);
if (this.uncertaintyCheckItem.getState ()) {
if (!(uncert >= 0)) uncert = 0;
g.setColor (java.awt.Color.blue);
y = floory - Clazz.doubleToInt (ymult * (expecte + uncert));
g.drawLine (0, y, this.winSize.width, y);
y = floory - Clazz.doubleToInt (ymult * (expecte - uncert));
if (expecte - uncert >= 0) g.drawLine (0, y, this.winSize.width, y);
}if (this.expectCheckItem.getState ()) {
y = floory - Clazz.doubleToInt (ymult * expecte);
g.setColor (java.awt.Color.red);
g.drawLine (0, y, this.winSize.width, y);
}}if (this.selectedCoefX != -1 && !this.dragging) {
g.setColor (java.awt.Color.yellow);
y = floory - Clazz.doubleToInt (ymult * this.elevels[this.selectedCoefX][this.selectedCoefY]);
g.drawLine (0, y, this.winSize.width, y);
}}if (this.viewX != null) this.drawRadial (g, this.viewXMap, this.func, this.funci);
if (this.viewP != null) {
this.genFunc (normmult, false);
this.drawRadial (g, this.viewPMap, this.pfunc, this.pfunci);
}if (this.viewL != null) {
var lzcount = this.modeCountTh * 3;
this.calcLSpectrum ();
for (i = 0; i != lzcount; i++) this.lzspectrum[i] = java.lang.Math.sqrt (this.lzspectrum[i]);

this.drawFunction (g, this.viewL, this.lzspectrum, null, lzcount, 0);
}if (this.viewStatesMap != null) {
var termWidth = this.getTermWidth ();
var stateSize = termWidth;
var ss2 = Clazz.doubleToInt (termWidth / 2);
for (i = 0; i < this.modeCountTh && i < this.maxDispPhasorsTh; i++) for (j = 0; j < this.modeCountR && j < this.maxDispPhasorsR; j++) {
x = this.viewStatesMap.x + i * termWidth + ss2;
y = this.viewStatesMap.y + j * termWidth + ss2;
var yel = (this.selectedCoefX != -1 && this.elevels[this.selectedCoefX][this.selectedCoefY] == this.elevels[i][j]);
g.setColor (yel ? java.awt.Color.yellow : (this.magcoef[i][j] == 0) ? gray2 : java.awt.Color.white);
g.drawOval (x - ss2, y - ss2, stateSize, stateSize);
var xa = Clazz.doubleToInt (this.magcoef[i][j] * this.phasecoefcos[i][j] * ss2);
var ya = Clazz.doubleToInt (-this.magcoef[i][j] * this.phasecoefsin[i][j] * ss2);
g.drawLine (x, y, x + xa, y + ya);
g.drawLine (x + xa - 1, y + ya, x + xa + 1, y + ya);
g.drawLine (x + xa, y + ya - 1, x + xa, y + ya + 1);
}

g.setColor (java.awt.Color.white);
}if (this.selectedCoefX != -1) {
g.setColor (java.awt.Color.yellow);
var m = Clazz.doubleToInt ((this.selectedCoefX + 1) / 2);
if ((this.selectedCoefX & 1) != 0) m = -m;
if (this.viewStatesMap != null && this.viewX != null) this.centerString (g, "nr = " + this.selectedCoefY + ", m = " + m, this.viewX.y + this.viewX.height - 10);
if (this.viewL != null) {
var lzcount = this.modeCountTh * 3;
var mx = m * 3 + Clazz.doubleToInt (lzcount / 2);
x = Clazz.doubleToInt (this.viewL.width * mx / (lzcount - 1));
g.drawLine (x, this.viewL.y, x, this.viewL.y + this.viewL.height);
}}realg.drawImage (this.dbimage, 0, 0, this);
if (this.dragStop) allQuiet = true;
if (!this.stoppedCheck.getState () && !allQuiet) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "drawRadial", 
function (g, view, fr, fi) {
var rcol = 0x00010000;
var gcol = 0x00000100;
var cx = Clazz.doubleToInt (view.width / 2);
var cy = Clazz.doubleToInt (view.height / 2);
var cr = Clazz.doubleToInt (view.width / 2);
var x;
var y;
var mx = 0;
var expectx = 0;
var expectx2 = 0;
var expecty = 0;
var expecty2 = 0;
var tot = 0;
for (y = 0; y <= this.sampleCountR; y++) {
for (x = 0; x != this.sampleCountTh; x++) {
var ar = fr[x][y];
var ai = fi[x][y];
var fv = (ar * ar + ai * ai);
var xv = y * this.angle1CosTab[x];
var yv = y * this.angle1SinTab[x];
expectx += fv * y * xv;
expecty += fv * y * yv;
expectx2 += fv * y * xv * xv;
expecty2 += fv * y * yv * yv;
tot += fv * y;
if (this.magPhaseCheckItem.getState ()) fv = java.lang.Math.sqrt (fv);
if (fv > mx) mx = fv;
}
}
expectx /= tot;
expecty /= tot;
expectx2 /= tot;
expecty2 /= tot;
var mult = 255 * this.brightmult / mx;
var rscale = -cr / this.sampleCountR;
for (y = 0; y != this.sampleCountR; y++) {
var r1 = rscale * y;
var r2 = rscale * (y + 1);
this.xpoints[0] = Clazz.doubleToInt (cx + r1);
this.ypoints[0] = cy;
this.xpoints[3] = Clazz.doubleToInt (cx + r2);
this.ypoints[3] = cy;
for (x = 0; x != this.sampleCountTh; x++) {
var ar = fr[x][y];
var ai = fi[x][y];
var fv = (ar * ar + ai * ai);
if (this.magPhaseCheckItem.getState ()) fv = java.lang.Math.sqrt (fv);
fv *= mult;
var c = this.getPhaseColor (ar, ai);
if (fv > 255) fv = 255;
var clr = Clazz.doubleToInt (c.r * fv);
var clg = Clazz.doubleToInt (c.g * fv);
var clb = Clazz.doubleToInt (c.b * fv);
var col = (-16777216) | (clr << 16) | (clg << 8) | clb;
g.setColor ( new java.awt.Color (col));
this.xpoints[1] = Clazz.doubleToInt (cx + r1 * this.angle2CosTab[x]);
this.ypoints[1] = Clazz.doubleToInt (cy - r1 * this.angle2SinTab[x]);
this.xpoints[2] = Clazz.doubleToInt (cx + r2 * this.angle2CosTab[x]);
this.ypoints[2] = Clazz.doubleToInt (cy - r2 * this.angle2SinTab[x]);
this.fillTriangle (view, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], this.xpoints[2], this.ypoints[2], col);
this.fillTriangle (view, this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2], this.xpoints[3], this.ypoints[3], col);
this.xpoints[0] = this.xpoints[1];
this.ypoints[0] = this.ypoints[1];
this.xpoints[3] = this.xpoints[2];
this.ypoints[3] = this.ypoints[2];
}
}
if (view.imageSource != null) view.imageSource.newPixels ();
g.drawImage (view.memimage, view.x, view.y, null);
cx += view.x;
cy += view.y;
if (this.expectCheckItem.getState ()) {
x = Clazz.doubleToInt (cx + expectx * rscale);
y = Clazz.doubleToInt (cy - expecty * rscale);
g.setColor (java.awt.Color.red);
g.drawLine (x, view.y, x, view.y + view.height);
g.drawLine (view.x, y, view.x + view.width, y);
}if (this.uncertaintyCheckItem.getState ()) {
var uncertx = java.lang.Math.sqrt (expectx2 - expectx * expectx);
var uncerty = java.lang.Math.sqrt (expecty2 - expecty * expecty);
var xx1 = Clazz.doubleToInt (cx + (expectx + uncertx) * rscale);
var xx2 = Clazz.doubleToInt (cx + (expectx - uncertx) * rscale);
var yy1 = Clazz.doubleToInt (cy - (expecty - uncerty) * rscale);
var yy2 = Clazz.doubleToInt (cy - (expecty + uncerty) * rscale);
g.setColor (java.awt.Color.blue);
g.drawRect (xx1, yy1, xx2 - xx1, yy2 - yy1);
}g.setColor (java.awt.Color.white);
g.drawOval (view.x, view.y, view.width, view.height);
}, "java.awt.Graphics,test.falstad.QuantumCircFrame.View,~A,~A");
Clazz.defineMethod (c$, "fillTriangle", 
function (view, x1, y1, x2, y2, x3, y3, col) {
if (x1 > x2) {
if (x2 > x3) {
var ay = this.interp (x1, y1, x3, y3, x2);
this.fillTriangle1 (view, x3, y3, x2, y2, ay, col);
this.fillTriangle1 (view, x1, y1, x2, y2, ay, col);
} else if (x1 > x3) {
var ay = this.interp (x1, y1, x2, y2, x3);
this.fillTriangle1 (view, x2, y2, x3, y3, ay, col);
this.fillTriangle1 (view, x1, y1, x3, y3, ay, col);
} else {
var ay = this.interp (x3, y3, x2, y2, x1);
this.fillTriangle1 (view, x2, y2, x1, y1, ay, col);
this.fillTriangle1 (view, x3, y3, x1, y1, ay, col);
}} else {
if (x1 > x3) {
var ay = this.interp (x2, y2, x3, y3, x1);
this.fillTriangle1 (view, x3, y3, x1, y1, ay, col);
this.fillTriangle1 (view, x2, y2, x1, y1, ay, col);
} else if (x2 > x3) {
var ay = this.interp (x2, y2, x1, y1, x3);
this.fillTriangle1 (view, x1, y1, x3, y3, ay, col);
this.fillTriangle1 (view, x2, y2, x3, y3, ay, col);
} else {
var ay = this.interp (x3, y3, x1, y1, x2);
this.fillTriangle1 (view, x1, y1, x2, y2, ay, col);
this.fillTriangle1 (view, x3, y3, x2, y2, ay, col);
}}}, "test.falstad.QuantumCircFrame.View,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "interp", 
function (x1, y1, x2, y2, x) {
if (x1 == x2) return y1;
if (x < x1 && x < x2 || x > x1 && x > x2) System.out.print ("interp out of bounds\n");
return Clazz.doubleToInt (y1 + (x - x1) * (y2 - y1) / (x2 - x1));
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "fillTriangle1", 
function (v, x1, y1, x2, y2, y3, col) {
var dir = (x1 > x2) ? -1 : 1;
var x = x1;
if (x < 0) {
x = 0;
if (x2 < 0) return;
}if (x >= v.width) {
x = v.width - 1;
if (x2 >= v.width) return;
}if (y2 > y3) {
var q = y2;
y2 = y3;
y3 = q;
}while (x != x2 + dir) {
var ya = this.interp (x1, y1, x2, y2, x);
var yb = this.interp (x1, y1, x2, y3, x);
if (ya < 0) ya = 0;
if (yb >= v.height) yb = v.height - 1;
var p1 = x + ya * v.width;
var p2 = x + yb * v.width;
for (; p1 <= p2; p1 += v.width) v.pixels[p1] = col;

x += dir;
if (x < 0 || x >= v.width) return;
}
}, "test.falstad.QuantumCircFrame.View,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawFunction", 
function (g, view, fr, fi, count, offset) {
var i;
var expectx = 0;
var expectx2 = 0;
var maxsq = 0;
var tot = 0;
var zero = Clazz.doubleToInt (this.winSize.width / 2);
for (i = 0; i != count; i++) {
var x = Clazz.doubleToInt (this.winSize.width * i / (count - 1));
var ii = i + offset;
var dr = fr[ii];
var di = (fi == null) ? 0 : fi[ii];
var dy = dr * dr + di * di;
if (dy > maxsq) maxsq = dy;
var dev = x - zero;
expectx += dy * dev;
expectx2 += dy * dev * dev;
tot += dy;
}
expectx /= tot;
expectx2 /= tot;
var maxnm = java.lang.Math.sqrt (maxsq);
var uncert = java.lang.Math.sqrt (expectx2 - expectx * expectx);
var ox = -1;
var oy = 0;
var bestscale = 0;
if (fi != null && (this.probCheckItem.getState () || this.probPhaseCheckItem.getState ())) bestscale = 1 / maxsq;
 else bestscale = 1 / maxnm;
view.scale = bestscale;
if (view.scale > 1e8) view.scale = 1e8;
g.setColor (java.awt.Color.gray);
var mid_x = Clazz.doubleToInt (this.winSize.width * (Clazz.doubleToInt (count / 2)) / (count - 1));
g.drawLine (mid_x, view.y, mid_x, view.y + view.height);
var mid_y = view.lower_y;
var mult = view.ymult2 * view.scale;
if (fi != null) {
g.setColor (java.awt.Color.blue);
for (i = 0; i != count; i++) {
var x = Clazz.doubleToInt (this.winSize.width * i / (count - 1));
var ii = i + offset;
var y = mid_y - Clazz.doubleToInt (mult * fi[ii]);
if (ox != -1) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}
}g.setColor (java.awt.Color.white);
ox = -1;
for (i = 0; i != count; i++) {
var x = Clazz.doubleToInt (this.winSize.width * i / (count - 1));
var ii = i + offset;
var y = mid_y - Clazz.doubleToInt (mult * fr[ii]);
if (ox != -1) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}
if (maxsq > 0) {
expectx += zero;
if (this.uncertaintyCheckItem.getState ()) {
g.setColor (java.awt.Color.blue);
g.drawLine (Clazz.doubleToInt (expectx - uncert), view.y, Clazz.doubleToInt (expectx - uncert), view.y + view.height);
g.drawLine (Clazz.doubleToInt (expectx + uncert), view.y, Clazz.doubleToInt (expectx + uncert), view.y + view.height);
}if (this.expectCheckItem.getState ()) {
g.setColor (java.awt.Color.red);
g.drawLine (Clazz.doubleToInt (expectx), view.y, Clazz.doubleToInt (expectx), view.y + view.height);
}}}, "java.awt.Graphics,test.falstad.QuantumCircFrame.View,~A,~A,~N,~N");
Clazz.defineMethod (c$, "computeColor", 
function (x, y, c) {
var h = this.func[x][y];
if (!this.colorCheck.getState ()) {
h = 0;
}if (c < 0) c = 0;
if (c > 1) c = 1;
c = .5 + c * .5;
var redness = (h < 0) ? -h : 0;
var grnness = (h > 0) ? h : 0;
if (redness > 1) redness = 1;
if (grnness > 1) grnness = 1;
if (grnness < 0) grnness = 0;
if (redness < 0) redness = 0;
var grayness = (1 - (redness + grnness)) * c;
var gray = .6;
return  new java.awt.Color (Clazz.doubleToInt ((c * redness + gray * grayness) * 255), Clazz.doubleToInt ((c * grnness + gray * grayness) * 255), Clazz.doubleToInt ((gray * grayness) * 255));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "genFunc", 
function (normmult, do_x) {
var i;
var j;
var th;
var r;
var wc = this.sampleCountTh * 2;
var wm = wc - 1;
var states = (do_x) ? this.xStates : this.pStates;
var outr = (do_x) ? this.func : this.pfunc;
var outi = (do_x) ? this.funci : this.pfunci;
for (r = 0; r <= this.sampleCountR; r++) {
for (i = 0; i != wc; i++) this.xformbuf[i] = 0;

var d0r = 0;
var d0i = 0;
for (j = 0; j != this.modeCountR; j++) {
d0r += states[0][j][r] * this.magcoef[0][j] * this.phasecoefcos[0][j];
d0i += states[0][j][r] * this.magcoef[0][j] * this.phasecoefsin[0][j];
}
this.xformbuf[0] = d0r;
this.xformbuf[1] = d0i;
for (i = 1; i < this.modeCountTh; i += 2) {
var d1r = 0;
var d2r = 0;
var d1i = 0;
var d2i = 0;
var ii = Clazz.doubleToInt ((i + 1) / 2);
for (j = 0; j != this.modeCountR; j++) {
d1r += states[ii][j][r] * this.magcoef[i][j] * this.phasecoefcos[i][j];
d1i += states[ii][j][r] * this.magcoef[i][j] * this.phasecoefsin[i][j];
d2r += states[ii][j][r] * this.magcoef[i + 1][j] * this.phasecoefcos[i + 1][j];
d2i += states[ii][j][r] * this.magcoef[i + 1][j] * this.phasecoefsin[i + 1][j];
}
if (!do_x) {
var adj = 1.5707963267948966 * ii;
var acos = java.lang.Math.cos (adj);
var asin = java.lang.Math.sin (adj);
var q1 = d1r;
var q2 = d1i;
d1r = q1 * acos + q2 * asin;
d1i = -q1 * asin + q2 * acos;
q1 = d2r;
q2 = d2i;
d2r = q1 * acos + q2 * asin;
d2i = -q1 * asin + q2 * acos;
}this.xformbuf[ii * 2] = d2r;
this.xformbuf[ii * 2 + 1] = d2i;
this.xformbuf[wm & (wc - ii * 2)] = d1r;
this.xformbuf[wm & (wc - ii * 2 + 1)] = d1i;
}
this.fftTh.transform (this.xformbuf);
for (i = 0; i != this.sampleCountTh; i++) {
outr[i][r] = this.xformbuf[i * 2] * normmult;
outi[i][r] = this.xformbuf[i * 2 + 1] * normmult;
}
outr[this.sampleCountTh][r] = outr[0][r];
outi[this.sampleCountTh][r] = outi[0][r];
}
}, "~N,~B");
Clazz.defineMethod (c$, "getPhaseColor", 
function (x, y) {
var sector = 0;
var val = 0;
if (this.probCheckItem.getState ()) return this.whitePhaseColor;
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
Clazz.defineMethod (c$, "getTermWidth", 
function () {
var termWidth1 = Clazz.doubleToInt (this.viewStatesMap.width / this.min (this.modeCountTh, this.maxDispPhasorsTh));
var termWidth2 = Clazz.doubleToInt (this.viewStatesMap.height / this.min (this.modeCountR, this.maxDispPhasorsR));
return (termWidth1 < termWidth2) ? termWidth1 : termWidth2;
});
Clazz.defineMethod (c$, "edit", 
function (e) {
if (this.selection == 0) return;
var x = e.getX ();
var y = e.getY ();
switch (this.selection) {
case 5:
this.editHandle (y);
break;
case 3:
this.editMag (x, y);
break;
case 1:
this.findStateByEnergy (y);
this.enterSelectedState ();
break;
case 2:
this.editX (x, y);
break;
case 4:
this.editL (x, y);
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
Clazz.defineMethod (c$, "editMag", 
function (x, y) {
if (this.selectedCoefX == -1) return;
var stateSize = this.getTermWidth ();
var ss2 = Clazz.doubleToInt (stateSize / 2);
var x0 = stateSize * this.selectedCoefX + ss2 + this.viewStatesMap.x;
var y0 = stateSize * this.selectedCoefY + ss2 + this.viewStatesMap.y;
x -= x0;
y -= y0;
var mag = java.lang.Math.sqrt (x * x + y * y) / ss2;
var ang = java.lang.Math.atan2 (-y, x);
var ang0 = (-this.elevels[this.selectedCoefX][this.selectedCoefY] * this.t) % (6.283185307179586);
if (mag > 10) mag = 0;
if (mag > 1) mag = 1;
this.magcoef[this.selectedCoefX][this.selectedCoefY] = mag;
this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] = (ang - ang0) % (6.283185307179586);
if (this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] > 3.141592653589793) this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] -= 6.283185307179586;
if (this.alwaysNormItem.getState ()) this.normalize ();
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "editMagClick", 
function () {
if (this.selectedCoefX == -1) return;
if (this.magDragStart < .5) this.magcoef[this.selectedCoefX][this.selectedCoefY] = 1;
 else this.magcoef[this.selectedCoefX][this.selectedCoefY] = 0;
this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] = 0;
this.cv.repaint (this.pause);
});
Clazz.defineMethod (c$, "editX", 
function (x, y) {
switch (this.mouseChooser.getSelectedIndex ()) {
case 0:
this.editXGauss (x, y);
return;
case 1:
this.editXGaussP (x, y);
return;
case 2:
this.editRotate (x, y);
return;
}
}, "~N,~N");
Clazz.defineMethod (c$, "editL", 
function (x, y) {
var xi = Clazz.doubleToInt (x * this.modeCountTh / this.winSize.width);
var m = xi - Clazz.doubleToInt (this.modeCountTh / 2);
var r;
var th;
for (r = 0; r <= this.sampleCountR; r++) for (th = 0; th <= this.sampleCountTh; th++) {
if (r == 0 && m != 0) this.func[th][0] = this.funci[th][0] = 0;
 else {
var thr = th * 2 * 3.141592653589793 / this.sampleCountTh;
this.func[th][r] = java.lang.Math.cos (thr * m);
this.funci[th][r] = java.lang.Math.sin (thr * m);
}}

this.transform ();
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "editXGauss", 
function (x, y) {
var i;
var j;
var gx = x - this.dragX + 8;
var gy = y - this.dragY + 8;
var wx = 1 / (this.abs (gx) + .0001);
var wy = 1 / (this.abs (gy) + .0001);
wx = -wx * wx * 2000;
wy = -wy * wy * 2000;
this.lastGaussWx = wx;
this.lastGaussWy = wy;
for (x = 0; x != this.sampleCountR; x++) {
for (y = 0; y != this.sampleCountTh; y++) {
var th = y * 2 * 3.141592653589793 / this.sampleCountTh;
var xx = -java.lang.Math.cos (th) * x / this.sampleCountR - this.selectedGridX;
var yy = -java.lang.Math.sin (th) * x / this.sampleCountR - this.selectedGridY;
var rfunc = java.lang.Math.exp (wx * xx * xx + wy * yy * yy);
this.func[y][x] = rfunc;
this.funci[y][x] = 0;
}
}
this.transform ();
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "editXGaussP", 
function (x, y) {
var i;
var j;
var wx = this.lastGaussWx;
var wy = this.lastGaussWy;
var momentumX = (x - this.dragX) * .1;
var momentumY = -(y - this.dragY) * .1;
for (x = 0; x != this.sampleCountR; x++) {
for (y = 0; y != this.sampleCountTh; y++) {
var th = y * 2 * 3.141592653589793 / this.sampleCountTh;
var xx = -java.lang.Math.cos (th) * x / this.sampleCountR - this.selectedGridX;
var yy = -java.lang.Math.sin (th) * x / this.sampleCountR - this.selectedGridY;
var cx = java.lang.Math.cos (momentumX * xx);
var cy = java.lang.Math.cos (momentumY * yy);
var sx = java.lang.Math.sin (momentumX * xx);
var sy = java.lang.Math.sin (momentumY * yy);
var rfunc = java.lang.Math.exp (wx * xx * xx + wy * yy * yy);
this.func[y][x] = rfunc * (cx * cy - sx * sy);
this.funci[y][x] = rfunc * (cx * sy + cy * sx);
}
}
this.transform ();
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "editRotate", 
function (x, y) {
var cx = this.viewXMap.x + Clazz.doubleToInt (this.viewXMap.width / 2);
var cy = this.viewXMap.y + Clazz.doubleToInt (this.viewXMap.height / 2);
var angle1 = java.lang.Math.atan2 (-(this.dragY - cy), this.dragX - cx);
var angle2 = java.lang.Math.atan2 (-(y - cy), x - cx);
var ad = angle2 - angle1;
var i;
var j;
for (i = 1; i < this.modeCountTh; i++) for (j = 0; j < this.modeCountR; j++) {
var m = Clazz.doubleToInt ((i + 1) / 2);
if ((i % 2) == 0) m = -m;
this.phasecoefadj[i][j] += ad * m;
}

this.dragX = x;
this.dragY = y;
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "transform", 
function () {
this.t = 0;
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.phasecoefcos[i][j] = this.phasecoefsin[i][j] = 0;


var r;
var th;
for (r = 0; r <= this.sampleCountR; r++) {
for (th = 0; th != this.sampleCountTh * 2; th++) this.xformbuf[th] = 0;

for (th = 0; th != this.sampleCountTh; th++) {
this.xformbuf[th * 2] = this.func[th][r] * r;
this.xformbuf[th * 2 + 1] = this.funci[th][r] * r;
}
this.fftTh.transform (this.xformbuf);
for (j = 0; j != this.modeCountR; j++) {
this.phasecoefcos[0][j] += this.xStates[0][j][r] * this.xformbuf[0];
this.phasecoefsin[0][j] += this.xStates[0][j][r] * this.xformbuf[1];
}
var wc = this.sampleCountTh * 2;
var wm = wc - 1;
for (i = 1; i < this.modeCountTh; i += 2) {
for (j = 0; j != this.modeCountR; j++) {
var ii = i + 1;
var m = Clazz.doubleToInt (ii / 2);
this.phasecoefcos[i][j] += this.xStates[m][j][r] * this.xformbuf[ii];
this.phasecoefsin[i][j] += this.xStates[m][j][r] * this.xformbuf[ii + 1];
this.phasecoefcos[i + 1][j] += this.xStates[m][j][r] * this.xformbuf[wm & -ii];
this.phasecoefsin[i + 1][j] += this.xStates[m][j][r] * this.xformbuf[wm & (-ii + 1)];
}
}
}
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
var a = this.phasecoefcos[i][j];
var b = this.phasecoefsin[i][j];
if (a < 1.0E-5 && a > -1.0E-5) a = 0;
if (b < 1.0E-5 && b > -1.0E-5) b = 0;
this.magcoef[i][j] = java.lang.Math.sqrt (a * a + b * b);
this.phasecoefadj[i][j] = java.lang.Math.atan2 (b, a);
}

if (this.alwaysNormItem.getState ()) this.normalize ();
 else if (this.alwaysMaxItem.getState ()) this.maximize ();
});
Clazz.defineMethod (c$, "sign", 
function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
}, "~N");
Clazz.defineMethod (c$, "abs", 
function (x) {
return x < 0 ? -x : x;
}, "~N");
Clazz.overrideMethod (c$, "componentHidden", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentMoved", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentShown", 
function (e) {
this.cv.repaint (this.pause);
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
if (e.getSource () === this.groundButton) this.doGround ();
if (e.getSource () === this.blankButton) this.doBlank ();
if (e.getSource () === this.normalizeButton) this.normalize ();
if (e.getSource () === this.maximizeButton) this.maximize ();
if (e.getSource () === this.measureEItem) this.measureE ();
if (e.getSource () === this.measureLItem) this.measureL ();
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.resBar) {
if (this.resBar.getValue () != this.modeCountR) this.setResolution ();
}if (e.getSource () === this.pZoomBar) this.calcPStates ();
if (e.getSource () === this.phasorBar) {
this.maxDispPhasorsR = this.phasorBar.getValue ();
this.maxDispPhasorsTh = this.maxDispPhasorsR * 2 + 1;
}this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.QuantumCircFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "setResolution", 
function () {
var oldCountTh = this.modeCountTh;
var oldCountR = this.modeCountR;
this.modeCountR = this.sampleCountR = this.resBar.getValue ();
this.sampleCountR *= 4;
var sth = this.resBar.getValue () * 2;
this.sampleCountTh = 1;
while (this.sampleCountTh < sth) this.sampleCountTh *= 2;

this.modeCountTh = this.sampleCountTh + 1;
this.modeCountM = Clazz.doubleToInt (this.sampleCountTh / 2) + 1;
this.sampleCountTh *= 2;
this.fftTh = Clazz.innerTypeInstance (test.falstad.QuantumCircFrame.FFT, this, null, this.sampleCountTh);
var oldmagcoef = this.magcoef;
this.magcoef =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
this.phasecoef =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
this.phasecoefcos =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
this.phasecoefsin =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
this.phasecoefadj =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
this.xformbuf =  Clazz.newDoubleArray (this.sampleCountTh * 2, 0);
this.func =  Clazz.newDoubleArray (this.sampleCountTh + 1, this.sampleCountR + 1, 0);
this.funci =  Clazz.newDoubleArray (this.sampleCountTh + 1, this.sampleCountR + 1, 0);
this.pfunc =  Clazz.newDoubleArray (this.sampleCountTh + 1, this.sampleCountR + 1, 0);
this.pfunci =  Clazz.newDoubleArray (this.sampleCountTh + 1, this.sampleCountR + 1, 0);
this.lzspectrum = null;
System.out.print ("grid: " + this.sampleCountTh + " " + this.sampleCountR + " " + this.sampleCountTh * this.sampleCountR + "\n");
this.scaleHeight = 6;
this.step = 3.141592653589793 / this.sampleCountTh;
this.viewDistance = 50;
var m;
var n;
this.elevels =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
var angstep = this.step * 2;
System.out.print ("calc omegas...\n");
for (m = 0; m != this.modeCountTh; m++) for (n = 0; n != this.modeCountR; n++) {
var realm = Clazz.doubleToInt ((m + 1) / 2);
this.elevels[m][n] = this.zeroj (realm, n + 1) / this.sampleCountR;
}

System.out.print ("calc omegas...done\n");
var jj =  Clazz.newDoubleArray (this.modeCountM + 1, 0);
var x;
var y;
this.xStates =  Clazz.newDoubleArray (this.modeCountM, this.modeCountR, this.sampleCountR + 1, 0);
System.out.print ("calc modes...\n");
for (m = 0; m != this.modeCountM; m++) {
for (n = 0; n != this.modeCountR; n++) {
var max = 0;
var nm = 0;
for (y = 0; y <= this.sampleCountR; y++) {
if (y == 0) jj[m + 1] = (m == 0) ? 1 : 0;
 else this.bess (m, y * this.elevels[m * 2][n], jj);
var q = this.xStates[m][n][y] = jj[m + 1];
if (q > max) max = q;
if (q < -max) max = -q;
nm += q * q * y;
}
nm = java.lang.Math.sqrt (nm);
for (y = 0; y <= this.sampleCountR; y++) this.xStates[m][n][y] /= nm;

}
}
var mult = .01 / (this.elevels[0][0] * this.elevels[0][0]);
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.elevels[i][j] *= this.elevels[i][j] * mult;


System.out.print ("calc modes...done\n");
if (oldmagcoef != null) {
for (i = 0; i != oldCountTh && i != this.modeCountTh; i++) for (j = 0; j != oldCountR && j != this.modeCountR; j++) this.magcoef[i][j] = oldmagcoef[i][j];


}this.pZoomBarValue = -1;
this.calcPStates ();
this.angle1SinTab =  Clazz.newDoubleArray (this.sampleCountTh + 1, 0);
this.angle1CosTab =  Clazz.newDoubleArray (this.sampleCountTh + 1, 0);
this.angle2SinTab =  Clazz.newDoubleArray (this.sampleCountTh + 1, 0);
this.angle2CosTab =  Clazz.newDoubleArray (this.sampleCountTh + 1, 0);
for (i = 0; i <= this.sampleCountTh; i++) {
var th1 = 2 * 3.141592653589793 * i / this.sampleCountTh;
var th2 = 2 * 3.141592653589793 * (i + 1) / this.sampleCountTh + .001;
this.angle1SinTab[i] = java.lang.Math.sin (th1);
this.angle1CosTab[i] = java.lang.Math.cos (th1);
this.angle2SinTab[i] = java.lang.Math.sin (th2);
this.angle2CosTab[i] = java.lang.Math.cos (th2);
}
});
Clazz.defineMethod (c$, "calcPStates", 
function () {
if (this.pZoomBar.getValue () == this.pZoomBarValue) return;
this.pZoomBarValue = this.pZoomBar.getValue ();
var pmult = this.pZoomBar.getValue () / (5. * this.sampleCountR);
var jj =  Clazz.newDoubleArray (this.modeCountM + 1, 0);
var jz =  Clazz.newDoubleArray (this.modeCountM + 1, 0);
var i;
var j;
var x;
var y;
var realm;
System.out.print ("calc pstates\n");
this.pStates =  Clazz.newDoubleArray (this.modeCountM, this.modeCountR, this.sampleCountR + 1, 0);
for (realm = 0; realm != this.modeCountM; realm++) {
var bessm = (realm == 0) ? 1 : realm;
for (j = 0; j != this.modeCountR; j++) {
var z0 = this.zeroj (realm, j + 1);
this.bess (bessm, z0, jz);
jz[0] = -jz[2];
for (x = 0; x != this.sampleCountR; x++) {
var x0 = pmult * x;
if (x == 0) {
if (realm == 0) {
jj[1] = 1;
jj[0] = 0;
} else {
jj[realm + 1] = 0;
jj[realm] = (realm == 1) ? 1 : 0;
}} else {
this.bess (bessm, x0, jj);
jj[0] = -jj[2];
}this.pStates[realm][j][x] = (z0 * jz[realm] * jj[realm + 1]) / (x0 * x0 - z0 * z0);
}
}
}
System.out.print ("calc pstates, done\n");
});
Clazz.defineMethod (c$, "zeroj", 
function (m_order, n_zero) {
if (m_order >= 48 && n_zero == 1) {
switch (m_order) {
case 48:
return 55.0283;
case 49:
return 56.0729;
case 50:
return 57.1169;
case 51:
return 58.1603;
case 52:
return 59.2032;
case 53:
return 60.2456;
case 54:
return 61.2875;
case 55:
return 62.3288;
case 56:
return 63.3697;
case 57:
return 64.4102;
case 58:
return 65.4501;
case 59:
return 66.4897;
case 60:
return 67.5288;
case 61:
return 68.5675;
case 62:
return 69.6058;
case 63:
return 70.6437;
case 64:
return 71.6812;
}
}if (m_order >= 62 && n_zero == 2) {
switch (m_order) {
case 62:
return 75.6376;
case 63:
return 76.7021;
case 64:
return 77.7659;
}
}var beta = (n_zero + 0.5 * m_order - 0.25) * (3.141592654);
var mu = 4 * m_order * m_order;
var beta8 = 8 * beta;
var beta82 = beta8 * beta8;
var beta84 = beta82 * beta82;
var z = beta - (mu - 1) / beta8 - 4 * (mu - 1) * (7 * mu - 31) / (3 * beta82 * beta8);
z -= 32 * (mu - 1) * (83 * mu * mu - 982 * mu + 3779) / (15 * beta84 * beta8);
z -= 64 * (mu - 1) * (6949 * mu * mu * mu - 153855 * mu * mu + 1585743 * mu - 6277237) / (105 * beta84 * beta82 * beta8);
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
Clazz.defineMethod (c$, "findGridPoint2D", 
function (v, mx, my) {
var cx = v.x + Clazz.doubleToInt (v.width / 2);
var cy = v.y + Clazz.doubleToInt (v.height / 2);
var cr = Clazz.doubleToInt (v.width / 2);
this.selectedGridX = (mx - cx) / cr;
this.selectedGridY = -(my - cy) / cr;
var r = java.lang.Math.sqrt (this.selectedGridX * this.selectedGridX + this.selectedGridY * this.selectedGridY);
if (r > 1) {
this.selectedGridX /= r;
this.selectedGridY /= r;
}}, "test.falstad.QuantumCircFrame.View,~N,~N");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
if (this.dragging) return;
var x = e.getX ();
var y = e.getY ();
this.dragX = x;
this.dragY = y;
var panelHeight = this.getPanelHeight ();
var oldCoefX = this.selectedCoefX;
var oldCoefY = this.selectedCoefY;
this.selectedCoefX = -1;
this.selectedCoefY = -1;
this.selectedPaneHandle = -1;
this.selection = 0;
var i;
for (i = 1; i != this.viewCount; i++) {
var dy = y - this.viewList[i].paneY;
if (dy >= -3 && dy <= 3) {
this.selectedPaneHandle = i;
this.selection = 5;
}}
if (this.viewXMap != null && this.viewXMap.inside (x, y)) this.selection = 2;
 else if (this.viewPotential != null && this.viewPotential.contains (x, y)) {
this.selection = 1;
this.findStateByEnergy (y);
} else if (this.viewStatesMap != null && this.viewStatesMap.inside (x, y)) {
var termWidth = this.getTermWidth ();
this.selectedCoefX = Clazz.doubleToInt ((x - this.viewStatesMap.x) / termWidth);
this.selectedCoefY = Clazz.doubleToInt ((y - this.viewStatesMap.y) / termWidth);
if (this.selectedCoefX >= this.modeCountTh || this.selectedCoefX >= this.maxDispPhasorsTh) this.selectedCoefX = this.selectedCoefY = -1;
if (this.selectedCoefY >= this.modeCountR || this.selectedCoefY >= this.maxDispPhasorsR) this.selectedCoefX = this.selectedCoefY = -1;
if (this.selectedCoefX < 0 || this.selectedCoefY < 0) this.selectedCoefX = this.selectedCoefY = -1;
if (this.selectedCoefX != -1 && this.selectedCoefY != -1) this.selection = 3;
} else if (this.viewL != null && this.viewL.contains (x, y)) this.selection = 4;
if (this.selectedCoefX != oldCoefX || this.selectedCoefY != oldCoefY) this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "findStateByEnergy", 
function (y) {
var i;
var j;
var floory = this.viewPotential.y + this.viewPotential.height - 5;
var ymult = 200;
var dist = 100;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
var yy = floory - Clazz.doubleToInt (ymult * this.elevels[i][j]);
var d = java.lang.Math.abs (y - yy);
if (d < dist) {
dist = d;
this.selectedCoefX = i;
this.selectedCoefY = j;
}}

}, "~N");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
if (this.selection == 3) this.editMagClick ();
if (e.getClickCount () == 2 && this.selectedCoefX != -1) this.enterSelectedState ();
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "enterSelectedState", 
function () {
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) if (this.selectedCoefX != i || this.selectedCoefY != j) this.magcoef[i][j] = 0;


this.magcoef[this.selectedCoefX][this.selectedCoefY] = 1;
this.cv.repaint (this.pause);
});
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
if (!this.dragging) {
if (this.selectedCoefX != -1) {
this.selectedCoefX = this.selectedCoefY = -1;
this.cv.repaint (this.pause);
}if (this.selectedPaneHandle != -1) {
this.selectedPaneHandle = -1;
this.cv.repaint (this.pause);
}}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.mouseMoved (e);
if (this.selection == 2) this.findGridPoint2D (this.viewXMap, e.getX (), e.getY ());
this.dragStartX = e.getX ();
this.dragStartY = e.getY ();
if (this.selectedCoefX != -1) this.magDragStart = this.magcoef[this.selectedCoefX][this.selectedCoefY];
this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.dragging = this.editingFunc = this.dragStop = false;
this.dragSet = this.dragClear = false;
this.mouseMoved (e);
this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (!this.finished) {
return;
}if (e.getItemSelectable () === this.stoppedCheck) {
this.cv.repaint (this.pause);
return;
}if (e.getItemSelectable () === this.xCheckItem || e.getItemSelectable () === this.pCheckItem || e.getItemSelectable () === this.lCheckItem || e.getItemSelectable () === this.eCheckItem || e.getItemSelectable () === this.statesCheckItem) {
this.handleResize ();
this.cv.repaint (this.pause);
}if (e.getItemSelectable () === this.alwaysNormItem && this.alwaysNormItem.getState ()) {
this.normalize ();
this.alwaysMaxItem.setState (false);
this.cv.repaint (this.pause);
}if (e.getItemSelectable () === this.alwaysMaxItem && this.alwaysMaxItem.getState ()) {
this.maximize ();
this.alwaysNormItem.setState (false);
this.cv.repaint (this.pause);
}var i;
for (i = 0; i != this.waveFunctionMenu.countItems (); i++) if (e.getItemSelectable () === this.waveFunctionMenu.getItem (i)) {
var j;
(this.waveFunctionMenu.getItem (i)).setState (true);
for (j = 0; j != this.waveFunctionMenu.countItems (); j++) if (i != j) (this.waveFunctionMenu.getItem (j)).setState (false);

}
}, "java.awt.event.ItemEvent");
c$.$QuantumCircFrame$FFT$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.wtab = null;
this.size = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumCircFrame, "FFT");
Clazz.makeConstructor (c$, 
function (a) {
this.size = a;
if ((this.size & (this.size - 1)) != 0) System.out.println ("size must be power of two!");
this.calcWTable ();
}, "~N");
Clazz.defineMethod (c$, "calcWTable", 
function () {
this.wtab =  Clazz.newDoubleArray (this.size, 0);
var a;
for (a = 0; a != this.size; a += 2) {
var b = 3.141592653589793 * a / this.size;
this.wtab[a] = Math.cos (b);
this.wtab[a + 1] = Math.sin (b);
}
});
Clazz.defineMethod (c$, "transform", 
function (a) {
var b;
var c = 0;
var d = this.size * 2;
for (b = 0; b != d; b += 2) {
if (b > c) {
var e = a[b];
a[b] = a[c];
a[c] = e;
e = a[b + 1];
a[b + 1] = a[c + 1];
a[c + 1] = e;
}var e = this.size;
while ((e & c) != 0) {
c &= ~e;
e >>= 1;
}
c |= e;
}
var e = d;
var f;
for (f = 4; f <= d; f <<= 1) {
var g = f >> 1;
e >>= 1;
for (b = 0; b < d; b += f) {
var h = 0;
for (c = b; c != b + g; c += 2, h += e) {
var i = this.wtab[h];
var j = this.wtab[h + 1];
var k = a[c];
var l = a[c + 1];
var m = c + g;
var n = a[m];
var o = a[m + 1];
var p = n * i - o * j;
var q = n * j + o * i;
a[c] = k + p;
a[c + 1] = l + q;
a[m] = k - p;
a[m + 1] = l - q;
}
;}
}
}, "~A");
c$ = Clazz.p0p ();
};
c$.$QuantumCircFrame$PhaseColor$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.r = 0;
this.g = 0;
this.b = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumCircFrame, "PhaseColor");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.r = a;
this.g = b;
this.b = c;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getColor", 
function () {
return  new java.awt.Color (Clazz.doubleToInt (this.r * 255), Clazz.doubleToInt (this.g * 255), Clazz.doubleToInt (this.b * 255));
});
c$ = Clazz.p0p ();
};
c$.$QuantumCircFrame$View$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ymult = 0;
this.ymult2 = 0;
this.scale = 0;
this.mid_y = 0;
this.lower_y = 0;
this.paneY = 0;
this.imageSource = null;
this.memimage = null;
this.pixels = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumCircFrame, "View", java.awt.Rectangle);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.QuantumCircFrame.View, []);
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"epsilon", .00001,
"epsilon2", .003,
"panePad", 4,
"pi", 3.14159265358979323846,
"phaseColorCount", 50,
"SEL_NONE", 0,
"SEL_POTENTIAL", 1,
"SEL_X", 2,
"SEL_STATES", 3,
"SEL_L", 4,
"SEL_HANDLE", 5,
"MOUSE_GAUSS", 0,
"MOUSE_GAUSSP", 1,
"MOUSE_ROTATE", 2);
});
