Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "$.Rectangle", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.JSThread", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.CircOscCanvas", "$.CircOscFrame", "$.CircOsc", "$.CircOscLayout"], ["java.awt.Color", "$.Dimension", "java.awt.image.MemoryImageSource", "java.lang.Double", "java.util.Random", "javax.sound.sampled.AudioFormat", "$.AudioSystem", "$.DataLine", "$.SourceDataLine", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "CircOscCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.CircOscCanvas, []);
this.pg = p;
}, "test.falstad.CircOscFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateCircOsc (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateCircOsc (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "CircOscLayout", null, java.awt.LayoutManager);
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
this.security = false;
Clazz.instantialize (this, arguments);
}, test.falstad, "CircOsc", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.CircOsc.ogf != null) test.falstad.CircOsc.ogf.dispose ();
test.falstad.CircOsc.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.CircOsc.ogf =  new test.falstad.CircOscFrame (null);
test.falstad.CircOsc.ogf.init ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.CircOsc.ogf == null) {
this.started = true;
try {
test.falstad.CircOsc.ogf =  new test.falstad.CircOscFrame (this);
test.falstad.CircOsc.ogf.init ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
test.falstad.CircOsc.ogf = null;
this.security = true;
this.repaint ();
} else {
throw e;
}
}
this.repaint ();
}});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (this.security) s = "Security exception, use nosound version";
 else if (!this.started) s = "Applet is starting.";
 else if (test.falstad.CircOsc.ogf == null) s = "Applet is finished.";
 else if (test.falstad.CircOsc.ogf.useFrame) test.falstad.CircOsc.ogf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.CircOsc, "paint", [g]);
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
if (test.falstad.CircOsc.ogf != null) test.falstad.CircOsc.ogf.dispose ();
test.falstad.CircOsc.ogf = null;
this.repaint ();
});
Clazz.defineStatics (c$,
"ogf", null);
c$ = Clazz.decorateAsClass (function () {
this.winSize = null;
this.dbimage = null;
this.random = null;
this.maxSampleCount = 70;
this.sampleCountR = 0;
this.sampleCountTh = 0;
this.modeCountR = 0;
this.modeCountTh = 0;
this.maxDispRModes = 5;
this.maxDispThModes = 5;
this.fftTh = null;
this.sineButton = null;
this.blankButton = null;
this.stoppedCheck = null;
this.soundCheck = null;
this.freqCheck = null;
this.modeChooser = null;
this.displayChooser = null;
this.display2Chooser = null;
this.colorCheck = null;
this.dampingBar = null;
this.brightnessBar = null;
this.speedBar = null;
this.forceBar = null;
this.resBar = null;
this.baseFreqBar = null;
this.phasorBar = null;
this.view3d = null;
this.view2d = null;
this.viewFreq = null;
this.editingFunc = false;
this.dragStop = false;
this.cosTable = null;
this.sinTable = null;
this.magcoef = null;
this.dampcoef = null;
this.phasecoef = null;
this.phasecoefcos = null;
this.phasecoefadj = null;
this.xformbuf = null;
this.omega = null;
this.step = 0;
this.func = null;
this.funci = null;
this.xpoints = null;
this.ypoints = null;
this.modeFuncsR = null;
this.modeFuncsTh = null;
this.selectedCoefX = 0;
this.selectedCoefY = 0;
this.selectedGridX = 0;
this.selectedGridY = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.dragSet = false;
this.dragClear = false;
this.viewAngle = 0;
this.viewAngleDragStart = 0;
this.viewZoom = 1;
this.viewZoomDragStart = 0;
this.scaleHeight = 6;
this.viewAngleCos = 1;
this.viewAngleSin = 0;
this.viewHeight = -14;
this.viewHeightDragStart = 0;
this.viewDistance = 0;
this.magDragStart = 0;
this.dragging = false;
this.needPlay = false;
this.t = 0;
this.pause = 0;
this.scalex = 0;
this.scaley = 0;
this.centerX3d = 0;
this.centerY3d = 0;
this.topz = 3;
this.main = null;
this.showControls = false;
this.useFrame = false;
if (!Clazz.isClassDefined ("test.falstad.CircOscFrame.View")) {
test.falstad.CircOscFrame.$CircOscFrame$View$ ();
}
this.cv = null;
this.applet = null;
this.java2 = false;
this.shown = false;
this.displayOrder = null;
this.lastTime = 0;
this.logep2 = 0;
this.finished = false;
if (!Clazz.isClassDefined ("test.falstad.CircOscFrame.FFT")) {
test.falstad.CircOscFrame.$CircOscFrame$FFT$ ();
}
this.sndmax = 0;
this.fftPlay = null;
if (!Clazz.isClassDefined ("test.falstad.CircOscFrame.WriteThread")) {
test.falstad.CircOscFrame.$CircOscFrame$WriteThread$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "CircOscFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.prepareFields (c$, function () {
this.xpoints =  Clazz.newIntArray (4, 0);
this.ypoints =  Clazz.newIntArray (4, 0);
});
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "CircOsc Series by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.CircOscFrame, ["Circular Membrane Applet v1.6b"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.CircOsc");
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
if (jvf >= 48) this.java2 = true;
this.selectedCoefX = this.selectedCoefY = -1;
this.main.setLayout ( new test.falstad.CircOscLayout ());
this.cv =  new test.falstad.CircOscCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.main.add (this.sineButton =  new swingjs.awt.Button ("Fundamental"));
this.sineButton.addActionListener (this);
this.main.add (this.blankButton =  new swingjs.awt.Button ("Clear"));
this.blankButton.addActionListener (this);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
this.main.add (this.stoppedCheck);
this.freqCheck =  new swingjs.awt.Checkbox ("Show Frequencies", true);
this.freqCheck.addItemListener (this);
this.main.add (this.freqCheck);
this.colorCheck =  new swingjs.awt.Checkbox ("Color", true);
this.colorCheck.addItemListener (this);
this.main.add (this.colorCheck);
this.soundCheck =  new swingjs.awt.Checkbox ("Sound", false);
this.soundCheck.addItemListener (this);
if (this.java2) this.main.add (this.soundCheck);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Poke membrane");
this.modeChooser.add ("Mouse = Strike membrane");
this.modeChooser.add ("Mouse = Adjust view angle");
this.modeChooser.add ("Mouse = Adjust view zoom");
this.modeChooser.addItemListener (this);
this.main.add (this.modeChooser);
this.modeChooser.select (2);
this.displayChooser =  new swingjs.awt.Choice ();
this.displayChooser.add ("Display 3d+2d");
this.displayChooser.add ("Display 3d only");
this.displayChooser.add ("Display 2d only");
this.displayChooser.addItemListener (this);
this.main.add (this.displayChooser);
this.displayChooser.select (1);
this.display2Chooser =  new swingjs.awt.Choice ();
this.display2Chooser.add ("3d view = Solid");
this.display2Chooser.add ("3d view = Wireframe");
this.display2Chooser.add ("3d view = Wireframe theta");
this.display2Chooser.add ("3d view = Wireframe r");
this.display2Chooser.addItemListener (this);
this.main.add (this.display2Chooser);
this.main.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.main.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 105, 1, 1, 250));
this.speedBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Damping", 0));
this.main.add (this.dampingBar =  new swingjs.awt.Scrollbar (0, 0, 5, 0, 100));
this.dampingBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 10, 1, 0, 100));
this.brightnessBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Resolution", 0));
this.main.add (this.resBar =  new swingjs.awt.Scrollbar (0, 16, 1, 2, Clazz.doubleToInt (this.maxSampleCount / 2)));
this.resBar.addAdjustmentListener (this);
if (this.java2) this.main.add ( new swingjs.awt.Label ("Base Frequency", 0));
this.baseFreqBar =  new swingjs.awt.Scrollbar (0, 84, 12, 49, 127);
if (this.java2) this.main.add (this.baseFreqBar);
this.baseFreqBar.addAdjustmentListener (this);
this.baseFreqBar.disable ();
this.main.add ( new swingjs.awt.Label ("Freq Display Count", 0));
this.main.add (this.phasorBar =  new swingjs.awt.Scrollbar (0, 10, 1, 5, 66));
this.phasorBar.addAdjustmentListener (this);
this.setResolution ();
this.setMaxDispModes ();
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
this.setDamping ();
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
Clazz.defineMethod (c$, "reinit", 
function () {
this.doSine ();
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
this.view3d = this.view2d = this.viewFreq = null;
this.displayOrder = null;
switch (this.displayChooser.getSelectedIndex ()) {
case 1:
if (!this.freqCheck.getState ()) this.view3d = Clazz.innerTypeInstance (test.falstad.CircOscFrame.View, this, null, this.winSize);
 else {
this.view3d = Clazz.innerTypeInstance (test.falstad.CircOscFrame.View, this, null, 0, 0, this.winSize.width, Clazz.doubleToInt (this.winSize.height / 2));
this.viewFreq = Clazz.innerTypeInstance (test.falstad.CircOscFrame.View, this, null, 0, Clazz.doubleToInt (this.winSize.height / 2), this.winSize.width, Clazz.doubleToInt (this.winSize.height / 2));
}break;
case 2:
if (!this.freqCheck.getState ()) this.view2d = Clazz.innerTypeInstance (test.falstad.CircOscFrame.View, this, null, this.winSize);
 else {
this.view2d = Clazz.innerTypeInstance (test.falstad.CircOscFrame.View, this, null, 0, 0, this.winSize.width, Clazz.doubleToInt (this.winSize.height / 2));
this.viewFreq = Clazz.innerTypeInstance (test.falstad.CircOscFrame.View, this, null, 0, Clazz.doubleToInt (this.winSize.height / 2), this.winSize.width, Clazz.doubleToInt (this.winSize.height / 2));
}break;
case 0:
default:
if (!this.freqCheck.getState ()) {
this.view3d = Clazz.innerTypeInstance (test.falstad.CircOscFrame.View, this, null, 0, 0, this.winSize.width, Clazz.doubleToInt (this.winSize.height / 2));
this.view2d = Clazz.innerTypeInstance (test.falstad.CircOscFrame.View, this, null, 0, Clazz.doubleToInt (this.winSize.height / 2), this.winSize.width, Clazz.doubleToInt (this.winSize.height / 2));
} else {
this.view3d = Clazz.innerTypeInstance (test.falstad.CircOscFrame.View, this, null, 0, 0, Clazz.doubleToInt (this.winSize.width / 2), Clazz.doubleToInt (this.winSize.height / 2));
this.view2d = Clazz.innerTypeInstance (test.falstad.CircOscFrame.View, this, null, Clazz.doubleToInt (this.winSize.width / 2), 0, Clazz.doubleToInt (this.winSize.width / 2), Clazz.doubleToInt (this.winSize.height / 2));
this.viewFreq = Clazz.innerTypeInstance (test.falstad.CircOscFrame.View, this, null, 0, Clazz.doubleToInt (this.winSize.height / 2), this.winSize.width, Clazz.doubleToInt (this.winSize.height / 2));
}break;
}
if (this.viewFreq != null) {
var tw = this.getTermWidth ();
var h = tw * (this.maxDispRModes + 1);
var pad = this.viewFreq.height - h;
if (pad > 0) {
this.viewFreq.y += pad;
this.viewFreq.height -= pad;
if (this.view3d != null) this.view3d.height += pad;
if (this.view2d != null) this.view2d.height += pad;
}var w = tw * (this.maxDispThModes + 1);
pad = Clazz.doubleToInt ((this.viewFreq.width - w) / 2);
if (pad > 0) this.viewFreq.x += pad;
}if (this.view2d != null) {
var dim = (this.view2d.width < this.view2d.height) ? this.view2d.width : this.view2d.height;
this.view2d.x += Clazz.doubleToInt ((this.view2d.width - dim) / 2);
this.view2d.y += Clazz.doubleToInt ((this.view2d.height - dim) / 2);
this.view2d.width = dim;
this.view2d.height = dim;
this.setupRaster (this.view2d);
this.brightnessBar.enable ();
} else this.brightnessBar.disable ();
if (this.view3d != null) this.setupRaster (this.view3d);
});
Clazz.defineMethod (c$, "setupRaster", 
function (v) {
v.pixels = null;
if (this.java2) {
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
}}, "test.falstad.CircOscFrame.View");
Clazz.defineMethod (c$, "doSine", 
function () {
this.doBlank ();
this.magcoef[0][0] = 1;
this.t = 0;
this.doPlay ();
});
Clazz.defineMethod (c$, "doPluck", 
function (val) {
val *= 5;
var i;
var j;
var x;
var y;
var b = java.lang.Math.sqrt (this.selectedGridX * this.selectedGridX + this.selectedGridY * this.selectedGridY);
if (b >= 1) return;
var imagex = 1e8;
var imagey = 0;
var imageb = 1e8;
if (b > 0) {
imageb = (b == 0) ? 1e8 : 1 / b;
imagex = this.selectedGridX * imageb / b;
imagey = this.selectedGridY * imageb / b;
}var subout = java.lang.Math.log (1 - b) - java.lang.Math.log (imageb - 1);
var fudge = .0001;
var mulout = val / (java.lang.Math.log (fudge) - java.lang.Math.log (imageb + fudge) - subout);
for (x = 0; x != this.sampleCountR; x++) for (y = 0; y != this.sampleCountTh; y++) {
var th = y * 2 * 3.141592653589793 / this.sampleCountTh - this.viewAngle;
var xx = -java.lang.Math.cos (th) * x / this.sampleCountR;
var yy = -java.lang.Math.sin (th) * x / this.sampleCountR;
var xx1 = xx - this.selectedGridX;
var xx2 = xx - imagex;
var yy1 = yy - this.selectedGridY;
var yy2 = yy - imagey;
var r1 = java.lang.Math.sqrt (yy1 * yy1 + xx1 * xx1);
var r2 = java.lang.Math.sqrt (yy2 * yy2 + xx2 * xx2);
var rfunc = (java.lang.Math.log (r1 + fudge) - java.lang.Math.log (r2 + fudge) - subout) * mulout;
this.func[y][x] = rfunc;
}

this.transform ();
this.cv.repaint (this.pause);
}, "~N");
Clazz.defineMethod (c$, "transform", 
function () {
this.t = 0;
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.magcoef[i][j] = this.phasecoef[i][j] = 0;


var r;
var th;
for (r = 0; r <= this.sampleCountR; r++) {
for (th = 0; th != this.sampleCountTh * 2; th++) this.xformbuf[th] = 0;

for (th = 0; th != this.sampleCountTh; th++) this.xformbuf[th * 2] = this.func[th][r] * r;

this.fftTh.transform (this.xformbuf);
for (j = 0; j != this.modeCountR; j++) {
this.magcoef[0][j] += this.modeFuncsR[j][r] * this.xformbuf[0];
this.phasecoef[0][j] += this.modeFuncsR[j][r] * this.modeFuncsR[j][r] * r * this.sampleCountTh;
}
var wc = this.sampleCountTh * 2;
var wm = wc - 1;
for (i = 1; i < this.modeCountTh; i += 2) {
for (j = 0; j != this.modeCountR; j++) {
var ii = i + 1;
var i2 = Clazz.doubleToInt (i / 2);
this.magcoef[i][j] += this.modeFuncsTh[i2][j][r] * .5 * (this.xformbuf[ii] + this.xformbuf[wm & (-ii)]);
this.magcoef[i + 1][j] += this.modeFuncsTh[i2][j][r] * .5 * (this.xformbuf[ii + 1] - this.xformbuf[wm & (-ii + 1)]);
this.phasecoef[i][j] += this.modeFuncsTh[i2][j][r] * this.modeFuncsTh[i2][j][r] * r * this.sampleCountTh * .5;
this.phasecoef[i + 1][j] = this.phasecoef[i][j];
}
}
}
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) {
this.magcoef[i][j] /= this.phasecoef[i][j];
this.phasecoefadj[i][j] = 0;
this.phasecoef[0][j] = 0;
}

this.needPlay = true;
});
Clazz.defineMethod (c$, "doStrike", 
function (val) {
val *= 10;
var i;
var j;
var x;
var y;
var striker = .2;
for (x = 0; x != this.sampleCountR; x++) {
for (y = 0; y != this.sampleCountTh; y++) {
var th = y * 2 * 3.141592653589793 / this.sampleCountTh - this.viewAngle;
var xx = -java.lang.Math.cos (th) * x / this.sampleCountR - this.selectedGridX;
var yy = -java.lang.Math.sin (th) * x / this.sampleCountR - this.selectedGridY;
var r = java.lang.Math.sqrt (yy * yy + xx * xx);
var rfunc = 0;
if (r < striker) rfunc = val * (striker - r);
this.func[y][x] = rfunc;
}
}
this.transform ();
this.cv.repaint (this.pause);
}, "~N");
Clazz.defineMethod (c$, "doBlank", 
function () {
this.handleResize ();
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
Clazz.defineMethod (c$, "updateCircOsc", 
function (realg) {
if (this.winSize == null || this.winSize.width == 0 || this.dbimage == null) return;
var g = this.dbimage.getGraphics ();
var allQuiet = true;
var tadd = 0;
if (!this.stoppedCheck.getState ()) {
var val = this.speedBar.getValue ();
tadd = java.lang.Math.exp (val / 20.) * (0.002);
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
var x;
var y;
var i;
var j;
if (this.dragStop) {
this.t = 0;
this.lastTime = 0;
}for (i = 0; i != this.modeCountTh; i++) {
for (j = 0; j != this.modeCountR; j++) {
if (this.magcoef[i][j] < 1.0E-5 && this.magcoef[i][j] > -1.0E-5) {
this.magcoef[i][j] = this.phasecoef[i][j] = this.phasecoefadj[i][j] = 0;
continue;
}this.magcoef[i][j] *= Math.exp (this.dampcoef[i][j] * tadd);
this.phasecoef[i][j] = (this.omega[i][j] * this.t + this.phasecoefadj[i][j]) % (6.283185307179586);
this.phasecoefcos[i][j] = java.lang.Math.cos (this.phasecoef[i][j]);
}
}
this.genFunc ();
var brightmult = this.brightnessBar.getValue () / 10.;
var half = Clazz.doubleToInt (this.sampleCountTh / 2);
if (this.view3d != null) {
this.scaleworld ();
for (x = 0; x != this.sampleCountTh + 1; x++) {
var th = 2 * 3.141592653589793 * (x - half) / this.sampleCountTh;
;this.cosTable[x] = Math.cos (th);
this.sinTable[x] = Math.sin (th);
}
if (this.display2Chooser.getSelectedIndex () == 0) {
var pixels = this.view3d.pixels;
for (x = 0; x != this.view3d.width * this.view3d.height; x++) pixels[x] = 0xFF000000;

if (this.displayOrder == null) this.displayOrder = this.getDisplayOrder ();
var sc2 = this.sampleCountR * this.sampleCountTh;
for (i = 0; i != sc2; i++) {
var de = this.displayOrder[i];
x = de % this.sampleCountTh;
y = Clazz.doubleToInt (de / this.sampleCountTh);
this.map3d (x, y, this.func[x][y], this.xpoints, this.ypoints, 0);
this.map3d (x + 1, y, this.func[x + 1][y], this.xpoints, this.ypoints, 1);
this.map3d (x, y + 1, this.func[x][y + 1], this.xpoints, this.ypoints, 2);
this.map3d (x + 1, y + 1, this.func[x + 1][y + 1], this.xpoints, this.ypoints, 3);
var qx = this.func[x + 1][y] - this.func[x][y];
var qy = this.func[x][y + 1] - this.func[x][y];
var normdot = (qx + qy + 1) * (0.5780346820809249) / java.lang.Math.sqrt (qx * qx + qy * qy + 1);
var col = this.computeColor (x, y, normdot);
this.fillTriangle (this.view3d, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], this.xpoints[3], this.ypoints[3], col);
this.fillTriangle (this.view3d, this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2], this.xpoints[3], this.ypoints[3], col);
}
if (this.view3d.imageSource != null) this.view3d.imageSource.newPixels ();
g.drawImage (this.view3d.memimage, this.view3d.x, this.view3d.y, null);
} else {
var needX = (this.display2Chooser.getSelectedIndex () != 3);
var needY = (this.display2Chooser.getSelectedIndex () != 2);
if (this.displayOrder == null) this.displayOrder = this.getDisplayOrder ();
var sc2 = this.sampleCountR * this.sampleCountTh;
for (i = 0; i != sc2; i++) {
var de = this.displayOrder[i];
x = de % this.sampleCountTh;
y = Clazz.doubleToInt (de / this.sampleCountTh);
g.setColor ( new java.awt.Color (this.computeColor (x, y, 0)));
this.map3d (x, y, this.func[x][y], this.xpoints, this.ypoints, 0);
if (x < this.sampleCountTh && needX) {
this.map3d (x + 1, y, this.func[x + 1][y], this.xpoints, this.ypoints, 1);
g.drawLine (this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}if (y < this.sampleCountR && needY) {
this.map3d (x, y + 1, this.func[x][y + 1], this.xpoints, this.ypoints, 2);
g.drawLine (this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2]);
}}
}}if (this.view2d != null) {
var rcol = 0x00010000;
var gcol = 0x00000100;
var cx = Clazz.doubleToInt (this.view2d.width / 2);
var cy = Clazz.doubleToInt (this.view2d.height / 2);
var cr = Clazz.doubleToInt (this.view2d.width / 2);
for (x = 0; x != this.sampleCountTh; x++) {
var th2 = 2 * 3.141592653589793 * (x + 1) / this.sampleCountTh - this.viewAngle + .001;
this.cosTable[x] = Math.cos (th2);
this.sinTable[x] = Math.sin (th2);
}
for (y = 0; y != this.sampleCountR; y++) {
var r1 = Clazz.doubleToInt (-cr * y / this.sampleCountR);
var r2 = Clazz.doubleToInt (-cr * (y + 1) / this.sampleCountR);
var th1 = -this.viewAngle;
var costh1 = Math.cos (th1);
var sinth1 = Math.sin (th1);
this.xpoints[0] = Clazz.doubleToInt (cx + r1 * costh1);
this.ypoints[0] = Clazz.doubleToInt (cy - r1 * sinth1);
this.xpoints[3] = Clazz.doubleToInt (cx + r2 * costh1);
this.ypoints[3] = Clazz.doubleToInt (cy - r2 * sinth1);
for (x = 0; x != this.sampleCountTh; x++) {
var val;
val = Clazz.doubleToInt (255 * brightmult * this.func[x][y]);
if (val < -255) val = -255;
if (val > 255) val = 255;
var col = 0;
if (val < 0) col = 0xFF000000 + rcol * -val;
 else col = 0xFF000000 + gcol * val;
var costh2 = this.cosTable[x];
var sinth2 = this.sinTable[x];
this.xpoints[1] = Clazz.doubleToInt (cx + r1 * costh2);
this.ypoints[1] = Clazz.doubleToInt (cy - r1 * sinth2);
this.xpoints[2] = Clazz.doubleToInt (cx + r2 * costh2);
this.ypoints[2] = Clazz.doubleToInt (cy - r2 * sinth2);
this.fillTriangle (this.view2d, this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], this.xpoints[2], this.ypoints[2], col);
this.fillTriangle (this.view2d, this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2], this.xpoints[3], this.ypoints[3], col);
this.xpoints[0] = this.xpoints[1];
this.ypoints[0] = this.ypoints[1];
this.xpoints[3] = this.xpoints[2];
this.ypoints[3] = this.ypoints[2];
}
}
if (this.view2d.imageSource != null) this.view2d.imageSource.newPixels ();
g.drawImage (this.view2d.memimage, this.view2d.x, this.view2d.y, null);
g.setColor (java.awt.Color.white);
g.drawOval (this.view2d.x, this.view2d.y, this.view2d.width, this.view2d.height);
}if (this.viewFreq != null) {
var termWidth = this.getTermWidth ();
g.setColor (java.awt.Color.white);
for (i = 0; i <= this.maxDispRModes; i++) {
x = i * termWidth;
g.drawLine (this.viewFreq.x, x + this.viewFreq.y, this.viewFreq.x + termWidth * this.maxDispThModes, x + this.viewFreq.y);
}
for (i = 0; i <= this.maxDispThModes; i++) {
x = i * termWidth;
g.drawLine (this.viewFreq.x + x, this.viewFreq.y, this.viewFreq.x + x, this.viewFreq.y + termWidth * this.maxDispRModes);
}
var rcol = 0x00010000;
var gcol = 0x00000100;
for (i = 0; i != this.maxDispThModes; i++) for (j = 0; j != this.maxDispRModes; j++) {
x = this.viewFreq.x + i * termWidth;
y = this.viewFreq.y + j * termWidth;
var val = this.logcoef (this.magcoef[i][j]);
if (val < -255) val = -255;
if (val > 255) val = 255;
if (val < 0) g.setColor ( new java.awt.Color (0xFF000000 + rcol * -val));
 else g.setColor ( new java.awt.Color (0xFF000000 + gcol * val));
g.fillRect (x + 1, y + 1, termWidth - 1, termWidth - 1);
var phx = Clazz.doubleToInt (this.phasecoefadj[i][j] * termWidth * (0.15915494309189535));
if (phx > 0) {
g.setColor (java.awt.Color.blue);
g.drawLine (x + phx, y + 1, x + phx, y + termWidth);
}if (this.selectedCoefX != -1 && this.omega[this.selectedCoefX][this.selectedCoefY] == this.omega[i][j]) {
g.setColor (java.awt.Color.yellow);
g.drawRect (x, y, termWidth, termWidth);
}}

}realg.drawImage (this.dbimage, 0, 0, this);
if (this.dragStop) allQuiet = true;
if (!this.stoppedCheck.getState () && !allQuiet) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "computeColor", 
function (x, y, c) {
var h = this.func[x][y];
if (!this.colorCheck.getState ()) {
h = 0;
if (this.display2Chooser.getSelectedIndex () != 0) return 0xFFFFFFFF;
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
var ri = Clazz.doubleToInt ((c * redness + gray * grayness) * 255);
var gi = Clazz.doubleToInt ((c * grnness + gray * grayness) * 255);
var bi = Clazz.doubleToInt ((gray * grayness) * 255);
return 0xFF000000 | (ri << 16) | (gi << 8) | bi;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "genFunc", 
function () {
var i;
var j;
var th;
var r;
var wc = this.sampleCountTh * 2;
var wm = wc - 1;
for (r = 0; r <= this.sampleCountR; r++) {
for (i = 0; i != wc; i++) this.xformbuf[i] = 0;

var d0 = 0;
for (j = 0; j != this.modeCountR; j++) d0 += this.modeFuncsR[j][r] * this.magcoef[0][j] * this.phasecoefcos[0][j];

this.xformbuf[0] = d0;
for (i = 1; i < this.modeCountTh; i += 2) {
var dc = 0;
var ds = 0;
var ii = Clazz.doubleToInt ((i + 1) / 2);
var i2 = Clazz.doubleToInt (i / 2);
for (j = 0; j != this.modeCountR; j++) {
dc += this.modeFuncsTh[i2][j][r] * this.magcoef[i][j] * this.phasecoefcos[i][j];
ds += this.modeFuncsTh[i2][j][r] * this.magcoef[i + 1][j] * this.phasecoefcos[i + 1][j];
}
this.xformbuf[ii * 2] = .5 * dc;
this.xformbuf[wm & (wc - ii * 2)] = .5 * dc;
this.xformbuf[ii * 2 + 1] = -0.5 * ds;
this.xformbuf[wm & (wc - ii * 2 + 1)] = .5 * ds;
}
this.fftTh.transform (this.xformbuf);
for (i = 0; i != this.sampleCountTh; i++) this.func[i][r] = this.xformbuf[i * 2];

this.func[this.sampleCountTh][r] = this.func[0][r];
}
});
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
}}}, "test.falstad.CircOscFrame.View,~N,~N,~N,~N,~N,~N,~N");
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
}, "test.falstad.CircOscFrame.View,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "logcoef", 
function (x) {
var ep2 = 0.003;
var sign = (x < 0) ? -1 : 1;
x *= sign;
if (x < ep2) return 0;
if (this.logep2 == 0) this.logep2 = -java.lang.Math.log (2 * ep2);
return Clazz.doubleToInt (255 * sign * (java.lang.Math.log (x + ep2) + this.logep2) / this.logep2);
}, "~N");
Clazz.defineMethod (c$, "map3d", 
function (th, r, z, xpoints, ypoints, pt) {
z *= -this.scaleHeight;
r *= 16. / this.sampleCountR;
var x = r * this.cosTable[th];
var y = r * this.sinTable[th];
var realx = x * this.viewAngleCos + y * this.viewAngleSin;
var realy = z - this.viewHeight;
var realz = y * this.viewAngleCos - x * this.viewAngleSin + this.viewDistance;
xpoints[pt] = this.centerX3d + Clazz.doubleToInt (this.scalex * realx / realz);
ypoints[pt] = this.centerY3d - Clazz.doubleToInt (this.scaley * realy / realz);
}, "~N,~N,~N,~A,~A,~N");
Clazz.defineMethod (c$, "scaleworld", 
function () {
this.scalex = this.viewZoom * (Clazz.doubleToInt (this.view3d.width / 4)) * this.viewDistance / 9.;
this.scaley = -this.scalex;
var y = Clazz.doubleToInt (this.scaley * this.viewHeight / this.viewDistance);
this.centerX3d = this.view3d.x + Clazz.doubleToInt (this.view3d.width / 2);
this.centerY3d = this.view3d.y + Clazz.doubleToInt (this.view3d.height / 2) - y;
});
Clazz.defineMethod (c$, "getTermWidth", 
function () {
var termWidth1 = Clazz.doubleToInt (this.viewFreq.width / this.maxDispThModes);
var termWidth2 = Clazz.doubleToInt (this.viewFreq.height / this.maxDispRModes);
return (termWidth1 < termWidth2) ? termWidth1 : termWidth2;
});
Clazz.defineMethod (c$, "getDisplayOrder", 
function () {
var sc2 = this.sampleCountTh * this.sampleCountR;
var disp =  Clazz.newIntArray (sc2, 0);
var dispz =  Clazz.newDoubleArray (sc2, 0);
var i;
for (i = 0; i != sc2; i++) {
disp[i] = i;
var x = i % this.sampleCountTh;
var y = Clazz.doubleToInt (i / this.sampleCountTh);
var th = 2 * this.step * x;
var xd = y * java.lang.Math.cos (th);
var yd = y * java.lang.Math.sin (th);
dispz[i] = yd * this.viewAngleCos - xd * this.viewAngleSin;
}
this.qsort (disp, dispz, 0, sc2 - 1);
return disp;
});
Clazz.defineMethod (c$, "qsort", 
function (disp, dispz, lo0, hi0) {
var lo = lo0;
var hi = hi0;
if (hi0 > lo0) {
var part = Clazz.doubleToInt ((lo0 + hi0) / 2);
var z = dispz[disp[part]];
while (lo <= hi) {
while ((lo < hi0) && dispz[disp[lo]] < z) ++lo;

while ((hi > lo0) && dispz[disp[hi]] > z) --hi;

if (lo <= hi) {
var swap = disp[lo];
disp[lo] = disp[hi];
disp[hi] = swap;
++lo;
--hi;
}}
if (lo0 < hi) this.qsort (disp, dispz, lo0, hi);
if (lo < hi0) this.qsort (disp, dispz, lo, hi0);
}}, "~A,~A,~N,~N");
Clazz.defineMethod (c$, "edit", 
function (e) {
if (this.selection == 0) return;
var x = e.getX ();
var y = e.getY ();
switch (this.selection) {
case 3:
this.editMag (x, y);
break;
case 2:
this.editFunc2D (x, y);
break;
case 1:
this.editFunc3D (x, y);
break;
}
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "editMag", 
function (x, y) {
if (this.selectedCoefX == -1) return;
var coef = (this.dragStartY - y) / 20. + this.magDragStart;
if (coef < -1) coef = -1;
if (coef > 1) coef = 1;
var pcoef = (x - this.dragStartX) / 10.;
if (pcoef < 0) pcoef = 0;
if (pcoef > 6.283185307179586) pcoef = 6.283185307179586;
if (this.magcoef[this.selectedCoefX][this.selectedCoefY] == coef && this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] == pcoef) return;
this.magcoef[this.selectedCoefX][this.selectedCoefY] = coef;
this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] = pcoef;
this.cv.repaint (this.pause);
this.needPlay = true;
}, "~N,~N");
Clazz.defineMethod (c$, "sign", 
function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
}, "~N");
Clazz.defineMethod (c$, "abs", 
function (x) {
return x < 0 ? -x : x;
}, "~N");
Clazz.defineMethod (c$, "editMagClick", 
function () {
if (this.selectedCoefX == -1) return;
if (this.magDragStart < .5) this.magcoef[this.selectedCoefX][this.selectedCoefY] = 1;
 else this.magcoef[this.selectedCoefX][this.selectedCoefY] = 0;
this.phasecoefadj[this.selectedCoefX][this.selectedCoefY] = 0;
this.cv.repaint (this.pause);
this.doPlay ();
});
Clazz.defineMethod (c$, "editFunc2D", 
function (x, y) {
this.findGridPoint2D (x, y);
this.editingFunc = this.dragStop = true;
if (this.modeChooser.getSelectedIndex () == 1) this.doStrike (1);
 else this.doPluck (1);
}, "~N,~N");
Clazz.defineMethod (c$, "editFunc3D", 
function (x, y) {
if (this.modeChooser.getSelectedIndex () == 2) {
this.viewAngle = (this.dragStartX - x) / 40. + this.viewAngleDragStart;
while (this.viewAngle < 0) this.viewAngle += 6.283185307179586;

while (this.viewAngle >= 6.283185307179586) this.viewAngle -= 6.283185307179586;

this.viewAngleCos = java.lang.Math.cos (this.viewAngle);
this.viewAngleSin = java.lang.Math.sin (this.viewAngle);
this.viewHeight = (this.dragStartY - y) / 10. + this.viewHeightDragStart;
this.displayOrder = null;
this.cv.repaint (this.pause);
return;
}if (this.modeChooser.getSelectedIndex () == 3) {
this.viewZoom = (x - this.dragStartX) / 40. + this.viewZoomDragStart;
if (this.viewZoom < .1) this.viewZoom = .1;
this.cv.repaint (this.pause);
return;
}var v = 1 + (this.dragStartY - y) / 40.;
if (v < -1) v = -1;
if (v > 1) v = 1;
this.editingFunc = this.dragStop = true;
if (this.modeChooser.getSelectedIndex () == 0) {
this.doPluck (v);
return;
}this.doStrike (v);
}, "~N,~N");
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
if (e.getSource () === this.sineButton) {
;this.cv.repaint ();
}if (e.getSource () === this.blankButton) {
this.doBlank ();
this.cv.repaint ();
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.dampingBar || e.getSource () === this.speedBar) this.setDamping ();
if (e.getSource () === this.resBar || e.getSource () === this.phasorBar) {
if (this.resBar.getValue () != this.modeCountR) this.setResolution ();
this.setMaxDispModes ();
this.setupDisplay ();
}this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "setMaxDispModes", 
function () {
this.maxDispRModes = this.phasorBar.getValue ();
this.maxDispThModes = this.maxDispRModes * 2 + 1;
if (this.maxDispRModes > this.modeCountR) this.maxDispRModes = this.modeCountR;
if (this.maxDispThModes > this.modeCountTh) this.maxDispThModes = this.modeCountTh;
});
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.CircOscFrame, "handleEvent", [ev]);
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
this.sampleCountTh *= 2;
this.cosTable =  Clazz.newDoubleArray (this.sampleCountTh + 1, 0);
this.sinTable =  Clazz.newDoubleArray (this.sampleCountTh + 1, 0);
this.fftTh = Clazz.innerTypeInstance (test.falstad.CircOscFrame.FFT, this, null, this.sampleCountTh);
var oldmagcoef = this.magcoef;
this.magcoef =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
this.phasecoef =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
this.phasecoefcos =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
this.phasecoefadj =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
this.xformbuf =  Clazz.newDoubleArray (this.sampleCountTh * 2, 0);
this.func =  Clazz.newDoubleArray (this.sampleCountTh + 1, this.sampleCountR + 1, 0);
this.funci =  Clazz.newDoubleArray (this.sampleCountTh + 1, this.sampleCountR + 1, 0);
System.out.print ("grid: " + this.sampleCountTh + " " + this.sampleCountR + " " + this.sampleCountTh * this.sampleCountR + " " + this.modeCountTh + " " + this.modeCountR + "\n");
this.scaleHeight = 6;
this.step = 3.141592653589793 / this.sampleCountTh;
this.viewDistance = 50;
this.displayOrder = null;
var m;
var n;
this.omega =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
var angstep = this.step * 2;
for (m = 0; m != this.modeCountTh; m++) for (n = 0; n != this.modeCountR; n++) {
var realm = Clazz.doubleToInt ((m + 1) / 2);
this.omega[m][n] = this.zeroj (realm, n + 1) / this.sampleCountR;
}

var jj =  Clazz.newDoubleArray (this.modeCountTh + 1, 0);
var x;
var y;
this.modeFuncsR =  Clazz.newFloatArray (this.modeCountR, this.sampleCountR + 1, 0);
this.modeFuncsTh =  Clazz.newFloatArray (Clazz.doubleToInt (this.modeCountTh / 2), this.modeCountR, this.sampleCountR + 1, 0);
System.out.print ("calc modes...\n");
for (n = 0; n != this.modeCountR; n++) {
var max = 0;
for (y = 0; y <= this.sampleCountR; y++) {
if (y == 0) jj[1] = 1;
 else this.bess (0, y * this.omega[0][n], jj);
var q = this.modeFuncsR[n][y] = jj[1];
if (q > max) max = q;
if (q < -max) max = -q;
}
for (y = 0; y <= this.sampleCountR; y++) this.modeFuncsR[n][y] /= max;

}
var m2;
for (m2 = 0; m2 != Clazz.doubleToInt (this.modeCountTh / 2); m2++) {
m = m2 * 2 + 1;
var realm = m2 + 1;
for (n = 0; n != this.modeCountR; n++) {
var max = 0;
for (y = 0; y <= this.sampleCountR; y++) {
if (y == 0) jj[realm + 1] = (realm == 0) ? 1 : 0;
 else this.bess (realm, y * this.omega[m][n], jj);
var q = this.modeFuncsTh[m2][n][y] = jj[realm + 1];
if (q > max) max = q;
if (q < -max) max = -q;
}
for (y = 0; y <= this.sampleCountR; y++) this.modeFuncsTh[m2][n][y] /= max;

}
}
var mult = 1 / this.omega[0][0];
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) this.omega[i][j] *= mult;


if (oldmagcoef != null) {
for (i = 0; i != oldCountTh && i != this.modeCountTh; i++) for (j = 0; j != oldCountR && j != this.modeCountR; j++) this.magcoef[i][j] = oldmagcoef[i][j];


}this.setDamping ();
System.out.print ("calc modes...done\n");
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
Clazz.defineMethod (c$, "setDamping", 
function () {
var i;
var j;
this.dampcoef =  Clazz.newDoubleArray (this.modeCountTh, this.modeCountR, 0);
for (i = 0; i != this.modeCountTh; i++) {
for (j = 0; j != this.modeCountR; j++) {
var damper = this.dampingBar.getValue () / 40.;
damper = java.lang.Math.exp (damper) - 1;
var damp2 = this.omega[i][j] * java.lang.Math.sqrt (java.lang.Math.sqrt (1 + damper * damper / (this.omega[i][j] * this.omega[i][j])) - 1);
this.dampcoef[i][j] = -damp2 * .002;
}
}
});
Clazz.defineMethod (c$, "findGridPoint2D", 
function (mx, my) {
var cx = this.view2d.x + Clazz.doubleToInt (this.view2d.width / 2);
var cy = this.view2d.y + Clazz.doubleToInt (this.view2d.height / 2);
var cr = Clazz.doubleToInt (this.view2d.width / 2);
this.selectedGridX = (mx - cx) / cr;
this.selectedGridY = -(my - cy) / cr;
var r = java.lang.Math.sqrt (this.selectedGridX * this.selectedGridX + this.selectedGridY * this.selectedGridY);
if (r > 1) {
this.selectedGridX /= r;
this.selectedGridY /= r;
}}, "~N,~N");
Clazz.defineMethod (c$, "findGridPoint3D", 
function (mx, my) {
var x;
var y;
var bestr = 3600;
this.selectedGridX = this.selectedGridY = 0;
for (y = 0; y <= this.sampleCountR; y++) for (x = 0; x <= this.sampleCountTh; x++) {
this.map3d (x, y, this.func[x][y], this.xpoints, this.ypoints, 0);
var rx = (this.xpoints[0] - mx);
var ry = (this.ypoints[0] - my);
var r = rx * rx + ry * ry;
if (r < bestr) {
bestr = r;
var th = (x + Clazz.doubleToInt (this.sampleCountTh / 2)) * 2 * 3.141592653589793 / this.sampleCountTh - this.viewAngle;
this.selectedGridX = y * java.lang.Math.cos (th) / this.sampleCountR;
this.selectedGridY = y * java.lang.Math.sin (th) / this.sampleCountR;
}}

}, "~N,~N");
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
this.selection = 0;
if (this.view2d != null && this.view2d.inside (x, y)) this.selection = 2;
 else if (this.view3d != null && this.view3d.inside (x, y)) this.selection = 1;
 else if (this.viewFreq != null && this.viewFreq.inside (x, y)) {
var termWidth = this.getTermWidth ();
this.selectedCoefX = Clazz.doubleToInt ((x - this.viewFreq.x) / termWidth);
this.selectedCoefY = Clazz.doubleToInt ((y - this.viewFreq.y) / termWidth);
if (this.selectedCoefX >= this.modeCountTh) this.selectedCoefX = this.selectedCoefY = -1;
if (this.selectedCoefY >= this.modeCountR) this.selectedCoefX = this.selectedCoefY = -1;
if (this.selectedCoefX != -1 && this.selectedCoefY != -1) this.selection = 3;
}if (this.selectedCoefX != oldCoefX || this.selectedCoefY != oldCoefY) this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
if (this.selection == 3) this.editMagClick ();
if (e.getClickCount () == 2 && this.selectedCoefX != -1) {
var i;
var j;
for (i = 0; i != this.modeCountTh; i++) for (j = 0; j != this.modeCountR; j++) if (this.selectedCoefX != i || this.selectedCoefY != j) this.magcoef[i][j] = 0;


this.magcoef[this.selectedCoefX][this.selectedCoefY] = 1;
this.cv.repaint (this.pause);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
if (!this.dragging && this.selectedCoefX != -1) {
this.selectedCoefX = this.selectedCoefY = -1;
this.cv.repaint (this.pause);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
this.mouseMoved (e);
if ((e.getModifiers () & 16) == 0) return;
if (this.selection == 1) this.findGridPoint3D (e.getX (), e.getY ());
this.dragStartX = e.getX ();
this.dragStartY = e.getY ();
if (this.selectedCoefX != -1) this.magDragStart = this.magcoef[this.selectedCoefX][this.selectedCoefY];
this.viewAngleDragStart = this.viewAngle;
this.viewHeightDragStart = this.viewHeight;
this.viewZoomDragStart = this.viewZoom;
this.dragging = true;
this.needPlay = false;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
if (this.needPlay) this.doPlay ();
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
}if (e.getItemSelectable () === this.displayChooser || e.getItemSelectable () === this.freqCheck) {
this.setupDisplay ();
this.cv.repaint (this.pause);
}if (e.getItemSelectable () === this.display2Chooser || e.getItemSelectable () === this.colorCheck) this.cv.repaint (this.pause);
if (e.getItemSelectable () === this.soundCheck) {
if (this.soundCheck.getState ()) {
this.speedBar.setValue (250);
this.dampingBar.setValue (40);
this.setDamping ();
this.baseFreqBar.enable ();
this.doPlay ();
} else this.baseFreqBar.disable ();
}}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "getFreq", 
function (n) {
var stepsize = java.lang.Math.log (2) / 12;
var freq = java.lang.Math.exp (this.baseFreqBar.getValue () * stepsize);
return 0;
}, "~N");
Clazz.defineMethod (c$, "doPlay", 
function () {
if (!this.soundCheck.getState ()) return;
var rate = 22050;
var playSampleCount = 32768;
var b =  Clazz.newByteArray (32768, 0);
var stepsize = Math.log (2) / 12;
var mx = .2;
var nmult = 2.849517146113191E-4;
var freq = Math.exp (this.baseFreqBar.getValue () * stepsize);
var n = freq * nmult;
var maxomega = 3.141592653589793 / n;
var failed;
var sndmax = 1e-8;
var i;
var j;
var k;
var playfunc =  Clazz.newDoubleArray (65536, 0);
for (j = 0; j < this.modeCountTh; j += 2) for (k = 0; k != this.modeCountR; k++) {
var f = this.omega[j][k] * freq;
if (f < 20 || f > 11025) continue;
var dfreq = (Clazz.doubleToInt (f * 32768 / 22050)) * 2;
if (dfreq >= 65536) break;
var mag = this.magcoef[j][k];
if (j > 0) {
var mag2 = this.magcoef[j - 1][k];
mag = Math.sqrt (mag * mag + mag2 * mag2);
}playfunc[dfreq + 1] += mag;
}

if (this.fftPlay == null) this.fftPlay = Clazz.innerTypeInstance (test.falstad.CircOscFrame.FFT, this, null, 32768);
this.fftPlay.transform (playfunc);
var damper = this.dampingBar.getValue () * 1e-5;
damper = java.lang.Math.exp (damper) - 1;
for (i = 0; i != 32768; i++) {
playfunc[i * 2] *= Math.exp (-damper * i);
var dy = playfunc[i * 2];
if (dy > sndmax) sndmax = dy;
if (dy < -sndmax) sndmax = -dy;
}
if (sndmax < .01) return;
var mult = 127 / sndmax;
for (i = 0; i != 32768; i++) b[i] = Clazz.doubleToByte (playfunc[i * 2] * mult);

try {
var format =  new javax.sound.sampled.AudioFormat (22050, 8, 1, true, true);
var info =  new javax.sound.sampled.DataLine.Info (javax.sound.sampled.SourceDataLine, format);
var line = javax.sound.sampled.AudioSystem.getLine (info);
line.open (format, 32768);
line.start ();
Clazz.innerTypeInstance (test.falstad.CircOscFrame.WriteThread, this, null, null, line, b, 32768).start ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.cv.repaint ();
});
c$.$CircOscFrame$View$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.pixels = null;
this.imageSource = null;
this.memimage = null;
Clazz.instantialize (this, arguments);
}, test.falstad.CircOscFrame, "View", java.awt.Rectangle);
c$ = Clazz.p0p ();
};
c$.$CircOscFrame$FFT$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.wtab = null;
this.size = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.CircOscFrame, "FFT");
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
c$.$CircOscFrame$WriteThread$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.line = null;
this.m = null;
this.b = null;
this.count = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.CircOscFrame, "WriteThread", swingjs.JSThread);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, test.falstad.CircOscFrame.WriteThread, []);
this.line = b;
this.b = c;
this.count = d;
this.m = a;
}, "java.lang.reflect.Method,javax.sound.sampled.SourceDataLine,~A,~N");
Clazz.overrideMethod (c$, "myInit", 
function () {
try {
this.line.write (this.b, 0, this.count);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
return false;
});
Clazz.overrideMethod (c$, "isLooping", 
function () {
return false;
});
Clazz.overrideMethod (c$, "myLoop", 
function () {
return false;
});
Clazz.overrideMethod (c$, "whenDone", 
function () {
});
Clazz.overrideMethod (c$, "getDelayMillis", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "onException", 
function (a) {
}, "Exception");
Clazz.overrideMethod (c$, "doFinally", 
function () {
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"epsilon", .00001,
"epsilon2", .003,
"pi", 3.14159265358979323846,
"SEL_NONE", 0,
"SEL_FUNC_3D", 1,
"SEL_FUNC_2D", 2,
"SEL_MAG", 3,
"MODE_PLUCK", 0,
"MODE_STRIKE", 1,
"MODE_VIEW_ROTATE", 2,
"MODE_VIEW_ZOOM", 3,
"DISP_3D_2D", 0,
"DISP_3D", 1,
"DISP_2D", 2,
"DISP2_SOLID", 0,
"DISP2_WIRE_XY", 1,
"DISP2_WIRE_X", 2,
"DISP2_WIRE_Y", 3,
"COLOR_HEIGHT", 0,
"COLOR_VEL", 1,
"COLOR_NONE", 2);
});
