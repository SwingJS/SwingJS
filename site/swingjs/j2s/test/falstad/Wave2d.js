Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.FFT", "$.Wave2d", "$.Wave2dCanvas", "$.Wave2dFrame", "$.Wave2dLayout"], ["java.awt.Color", "$.Dimension", "java.awt.image.MemoryImageSource", "java.lang.Double", "java.text.NumberFormat", "java.util.Random", "$.Vector", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "Wave2dCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.Wave2dCanvas, []);
this.pg = p;
}, "test.falstad.Wave2dFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateWave2d (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paint", 
function (g) {
this.pg.updateWave2d (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "Wave2dLayout", null, java.awt.LayoutManager);
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
}, test.falstad, "Wave2d", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.Wave2d.ogf != null) test.falstad.Wave2d.ogf.dispose ();
test.falstad.Wave2d.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.Wave2d.ogf =  new test.falstad.Wave2dFrame (null);
test.falstad.Wave2d.ogf.initFrame ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.Wave2d.ogf == null) {
this.started = true;
test.falstad.Wave2d.ogf =  new test.falstad.Wave2dFrame (this);
test.falstad.Wave2d.ogf.initFrame ();
this.repaint ();
}});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.Wave2d.ogf == null) s = "Applet is finished.";
 else if (test.falstad.Wave2d.ogf.useFrame) test.falstad.Wave2d.ogf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.Wave2d, "paint", [g]);
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
if (test.falstad.Wave2d.ogf != null) test.falstad.Wave2d.ogf.dispose ();
test.falstad.Wave2d.ogf = null;
this.repaint ();
});
Clazz.defineStatics (c$,
"ogf", null);
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.windowWidth = 50;
this.windowHeight = 50;
this.wallWidth = 0;
this.stoppedCheck = null;
this.intensityCheck = null;
this.triChromaticCheck = null;
this.symmCheck = null;
this.infoCheck = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.resetTimeButton = null;
this.zoomBar = null;
this.angleBar = null;
this.freqBar = null;
this.resBar = null;
this.speedBar = null;
this.brightnessBar = null;
this.colorMult = 0;
this.wavelength = 0;
this.auxLabels = null;
this.auxBars = null;
this.colorFunc = null;
this.apertureR = null;
this.apertureI = null;
this.dragX = 0;
this.dragY = 0;
this.dragging = false;
this.dragClear = false;
this.dragSet = false;
this.useFrame = false;
this.showControls = false;
this.adjustResolution = true;
this.recompute = false;
this.t = 0;
this.pause = 0;
this.imageSource = null;
this.pixels = null;
this.muString = "u";
this.cv = null;
this.applet = null;
this.useBufferedImage = false;
this.main = null;
this.shown = false;
this.calculateNotice = false;
this.lastTime = 0;
this.resBarValue = -1;
if (!Clazz.isClassDefined ("test.falstad.Wave2dFrame.Setup")) {
test.falstad.Wave2dFrame.$Wave2dFrame$Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Wave2dFrame.SingleSlitSetup")) {
test.falstad.Wave2dFrame.$Wave2dFrame$SingleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Wave2dFrame.DoubleSlitSetup")) {
test.falstad.Wave2dFrame.$Wave2dFrame$DoubleSlitSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Wave2dFrame.GratingSetup")) {
test.falstad.Wave2dFrame.$Wave2dFrame$GratingSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Wave2dFrame.ObstacleSetup")) {
test.falstad.Wave2dFrame.$Wave2dFrame$ObstacleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Wave2dFrame.ZonePlateEvenSetup")) {
test.falstad.Wave2dFrame.$Wave2dFrame$ZonePlateEvenSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Wave2dFrame.ZonePlateOddSetup")) {
test.falstad.Wave2dFrame.$Wave2dFrame$ZonePlateOddSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Wave2dFrame.ZonePlatePhaseSetup")) {
test.falstad.Wave2dFrame.$Wave2dFrame$ZonePlatePhaseSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Wave2dFrame.ZonePlateBlazedSetup")) {
test.falstad.Wave2dFrame.$Wave2dFrame$ZonePlateBlazedSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Wave2dFrame.Hologram1Setup")) {
test.falstad.Wave2dFrame.$Wave2dFrame$Hologram1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Wave2dFrame.Hologram2Setup")) {
test.falstad.Wave2dFrame.$Wave2dFrame$Hologram2Setup$ ();
}
this.bessj0 = 0;
this.bessy0 = 0;
Clazz.instantialize (this, arguments);
}, test.falstad, "Wave2dFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "Wave2d by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.Wave2dFrame, ["Wave2d Applet v1.2c"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
this.adjustResolution = true;
}, "test.falstad.Wave2d");
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
var s = Clazz.innerTypeInstance (test.falstad.Wave2dFrame.SingleSlitSetup, this, null);
while (s != null) {
this.setupList.addElement (s);
s = s.createNext ();
}
var os = System.getProperty ("os.name");
var res = 120;
var jv = System.getProperty ("java.class.version");
var jvf =  new Double (jv).doubleValue ();
if (jvf >= 48) {
this.useBufferedImage = true;
}this.main.setLayout ( new test.falstad.Wave2dLayout ());
this.cv =  new test.falstad.Wave2dCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
if (this.showControls) this.main.add (this.cv);
this.setupChooser =  new swingjs.awt.Choice ();
var i;
for (i = 0; i != this.setupList.size (); i++) this.setupChooser.add ("Setup: " + (this.setupList.elementAt (i)).getName ());

this.setup = this.setupList.elementAt (0);
this.setupChooser.addItemListener (this);
if (this.showControls) this.main.add (this.setupChooser);
this.intensityCheck =  new swingjs.awt.Checkbox ("Show Intensity", true);
this.intensityCheck.addItemListener (this);
if (this.showControls) this.main.add (this.intensityCheck);
System.out.println ("Location" + this.intensityCheck.getLocale ());
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
this.stoppedCheck.setEnabled (false);
if (this.showControls) this.main.add (this.stoppedCheck);
this.triChromaticCheck =  new swingjs.awt.Checkbox ("Tri-Chromatic", false);
this.triChromaticCheck.addItemListener (this);
if (this.showControls) this.main.add (this.triChromaticCheck);
this.infoCheck =  new swingjs.awt.Checkbox ("Show Units", false);
this.infoCheck.addItemListener (this);
if (this.showControls) this.main.add (this.infoCheck);
if (this.showControls) this.main.add (this.resetTimeButton =  new swingjs.awt.Button ("Reset Time"));
this.resetTimeButton.addActionListener (this);
if (this.showControls) this.main.add ( new swingjs.awt.Label ("Incidence Angle", 0));
if (this.showControls) this.main.add (this.angleBar =  new swingjs.awt.Scrollbar (0, 90, 1, 10, 170));
this.angleBar.addAdjustmentListener (this);
if (this.showControls) this.main.add ( new swingjs.awt.Label ("Speed", 0));
if (this.showControls) this.main.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 70, 1, 1, 200));
this.speedBar.addAdjustmentListener (this);
this.speedBar.setEnabled (false);
if (this.showControls) this.main.add ( new swingjs.awt.Label ("Zoom Out", 0));
if (this.showControls) this.main.add (this.zoomBar =  new swingjs.awt.Scrollbar (0, 10, 1, 10, 200));
this.zoomBar.addAdjustmentListener (this);
if (this.showControls) this.main.add ( new swingjs.awt.Label ("Resolution", 0));
if (this.showControls) this.main.add (this.resBar =  new swingjs.awt.Scrollbar (0, res, 5, 120, 600));
this.resBar.addAdjustmentListener (this);
if (this.showControls) this.main.add ( new swingjs.awt.Label ("Source Frequency", 0));
if (this.showControls) this.main.add (this.freqBar =  new swingjs.awt.Scrollbar (0, 120, 1, 1, 236));
this.freqBar.addAdjustmentListener (this);
if (this.showControls) this.main.add ( new swingjs.awt.Label ("Brightness", 0));
if (this.showControls) this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 27, 1, 1, 1000));
this.brightnessBar.addAdjustmentListener (this);
this.auxLabels =  new Array (5);
this.auxBars =  new Array (5);
for (i = 0; i != 5; i++) {
if (this.showControls) this.main.add (this.auxLabels[i] =  new swingjs.awt.Label ("Aux " + (i + 1), 0));
if (this.showControls) this.main.add (this.auxBars[i] =  new swingjs.awt.Scrollbar (0, 50, 1, 1, 100));
this.auxBars[i].addAdjustmentListener (this);
}
if (this.showControls) this.main.add ( new swingjs.awt.Label ("http://www.falstad.com"));
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
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (this.applet != null) e.printStackTrace ();
} else {
throw e;
}
}
this.random =  new java.util.Random ();
this.setResolution ();
this.setup = this.setupList.elementAt (this.setupChooser.getSelectedIndex ());
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
}this.requestFocus ();
});
Clazz.defineMethod (c$, "reinit", 
function () {
this.doSetup ();
});
Clazz.defineMethod (c$, "apertureChanged", 
function () {
this.clearAperture ();
this.setup.doAperture ();
this.recompute = true;
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
var n = d.width * d.height;
this.pixels =  Clazz.newIntArray (n, 0);
var i;
for (i = 0; i != n; i++) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (d.width, d.height, this.pixels, 0, d.width);
this.imageSource.setAnimated (true);
this.imageSource.setFullBufferUpdates (true);
this.dbimage = this.cv.createImage (this.imageSource);
}});
Clazz.defineMethod (c$, "processEvent", 
function (ev) {
if (ev.getID () == 201) {
System.exit (0);
}Clazz.superCall (this, test.falstad.Wave2dFrame, "processEvent", [ev]);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "centerString", 
function (g, s, y) {
var fm = g.getFontMetrics ();
g.drawString (s, Clazz.doubleToInt ((this.winSize.width - fm.stringWidth (s)) / 2), y);
}, "java.awt.Graphics,~S,~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateWave2d", 
function (realg) {
if (this.winSize == null || this.winSize.width == 0) {
this.handleResize ();
return;
}if (!this.calculateNotice && this.recompute) {
var fm = realg.getFontMetrics ();
realg.setColor (java.awt.Color.black);
var cs = "Calculating...";
realg.fillRect (0, this.winSize.height - 30, 20 + fm.stringWidth (cs), 30);
realg.setColor (java.awt.Color.white);
realg.drawString (cs, 10, this.winSize.height - 10);
this.cv.repaint (0);
this.calculateNotice = true;
return;
}this.calculateNotice = false;
var tadd = 0;
if (!this.stoppedCheck.getState ()) {
var val = this.speedBar.getValue ();
tadd = Math.exp (val / 20.) * (0.02);
var sysTime = System.currentTimeMillis ();
if (this.lastTime == 0) this.lastTime = sysTime;
tadd *= (sysTime - this.lastTime) * (0.02);
tadd *= this.freqBar.getValue () / 34.;
this.t += tadd;
this.lastTime = sysTime;
} else this.lastTime = 0;
var trotr = Math.cos (this.t);
var troti = Math.sin (this.t);
var i;
var j;
var stopFunc = false;
if (this.stoppedCheck.getState ()) stopFunc = true;
var obstacle = Clazz.instanceOf (this.setup, test.falstad.Wave2dFrame.ObstacleSetup);
var zoom = (this.zoomBar.getValue () / 10.);
if (this.recompute) {
this.recompute = false;
var fm = (this.angleBar.getValue () - 90) * 3.141592653589793 / 180;
var apStart = -1;
var apEnd = -1;
var compWidth = Clazz.doubleToInt (zoom * this.windowWidth);
var symm0 = true;
var symm1 = true;
for (i = 0; i != this.wallWidth; i++) {
if (this.apertureR[i] != 0 || this.apertureI[i] != 0) {
if (this.apertureR[i] != this.apertureR[this.wallWidth - 1 - i] || this.apertureI[i] != this.apertureI[this.wallWidth - 1 - i]) symm1 = false;
if (i == 0 || this.apertureR[i] != this.apertureR[this.wallWidth - i] || this.apertureI[i] != this.apertureI[this.wallWidth - i]) symm0 = false;
apEnd = i;
if (apStart == -1) apStart = i;
}}
var symmetric = (symm0 || symm1) && !obstacle && fm == 0;
if (apStart == -1) apStart = apEnd = Clazz.doubleToInt (this.wallWidth / 2);
var waveEnd = Clazz.doubleToInt (this.wallWidth / 2) + Clazz.doubleToInt (compWidth / 2) - apStart;
var spaceNeeded = apEnd - apStart + 1;
var symmStop = Clazz.doubleToInt (spaceNeeded / 2);
if (symmetric) compWidth = Clazz.doubleToInt (compWidth / 2) + Clazz.doubleToInt ((apEnd - apStart) / 2);
var sz = 1;
while (sz < compWidth + spaceNeeded) sz *= 2;

var symmReflect = (symm0) ? sz : sz - 1;
var szm = sz * 2 - 1;
var line1 =  Clazz.newFloatArray (sz * 2, 0);
var line2 =  Clazz.newFloatArray (sz * 2, 0);
for (i = 0; i != this.wallWidth; i++) if (this.apertureR[i] != 0 || this.apertureI[i] != 0) {
var ii = (i - Clazz.doubleToInt (this.wallWidth / 2)) * 2;
var i0 = i - Clazz.doubleToInt (this.wallWidth / 2);
var a = Math.cos (fm * i0);
var b = Math.sin (fm * i0);
line2[ii & szm] = (a * this.apertureR[i] - b * this.apertureI[i]);
line2[(ii + 1) & szm] = (a * this.apertureI[i] + b * this.apertureR[i]);
}
var fft =  new test.falstad.FFT (sz);
fft.transform (line2, false);
var f = 0;
var fstart = this.triChromaticCheck.getState () ? 0 : 1;
var fend = this.triChromaticCheck.getState () ? 2 : 1;
if (this.intensityCheck.getState ()) this.t = 1e8;
 else this.triChromaticCheck.setState (false);
var cfoff = 0;
for (f = fstart; f <= fend; f++) {
var m = this.freqBar.getValue () / 50.;
if (f == 0) m /= (1.2745098039215685);
if (f == 2) m /= (0.9313725490196079);
var m0 = Math.sqrt (m);
this.wavelength = 6.283185307179586 / m;
var freq = 0.15915494309189535;
var speed = this.wavelength * freq;
var noWaves = this.wavelength < 2 * zoom;
if (this.t < this.resBar.getValue () * zoom * 1.23 / speed) this.recompute = true;
for (j = 0; j != this.windowHeight; j++) {
for (i = 0; i != sz * 2; i++) line1[i] = 0;

var jj = j + 1;
var jz2 = jj * jj * zoom * zoom;
var i2;
var sz2 = sz * 2;
var maxdist = this.t * speed - this.wavelength / 8;
for (i = i2 = 0; i <= waveEnd; i++, i2 += 2) {
var dist1 = Math.sqrt (i * i + jz2);
var dist2 = dist1 * m;
this.computeBessel (dist2);
if (dist1 > maxdist) this.bessj0 = this.bessy0 = 0;
var f1 = (this.bessj0 * m0);
var f2 = (-this.bessy0 * m0);
if (i > 0) {
line1[sz2 - i2] = f1;
line1[sz2 - i2 + 1] = f2;
}if (!symmetric || i < spaceNeeded) {
line1[i2] = f1;
line1[i2 + 1] = f2;
}}
var t1 = System.currentTimeMillis ();
fft.transform (line1, false);
for (i = 0; i != sz; i++) {
var ii = i * 2;
var a = line1[ii] * line2[ii] - line1[ii + 1] * line2[ii + 1];
var b = line1[ii + 1] * line2[ii] + line1[ii] * line2[ii + 1];
line1[ii] = a;
line1[ii + 1] = b;
}
fft.transform (line1, true);
var qmult = 400. / sz;
if (obstacle) {
var oaddr = (Math.cos (jj * zoom * m) * 800 / m0);
var oaddi = -(Math.sin (jj * zoom * m) * 800 / m0);
var ww = Clazz.doubleToInt (this.windowWidth * zoom);
for (i = 0; i != ww; i++) {
var ii = i - Clazz.doubleToInt (ww / 2);
var a = Math.cos (fm * ii);
var b = Math.sin (fm * ii);
var aa = (a * oaddr - b * oaddi) / qmult;
var bb = (a * oaddi + b * oaddr) / qmult;
line1[szm & (ii * 2)] = aa - line1[szm & (ii * 2)];
line1[szm & (ii * 2) + 1] = bb - line1[szm & (ii * 2) + 1];
}
}for (i = 0; i != this.windowWidth; i++) {
var ir1 = Clazz.doubleToInt ((i - Clazz.doubleToInt (this.windowWidth / 2)) * zoom);
var ir2 = Clazz.doubleToInt ((i - Clazz.doubleToInt (this.windowWidth / 2) + 1) * zoom);
var ii1 = Clazz.doubleToInt (ir1);
var ii2 = Clazz.doubleToInt (ir2);
var iic = ii2 - ii1;
if (this.intensityCheck.getState ()) this.colorFunc[cfoff] = 0;
 else {
this.colorFunc[cfoff] = 0;
this.colorFunc[cfoff + 1] = 0;
}var ii;
for (ii = ii1; ii <= ii2; ii++) {
var q1 = 0;
var q2 = 0;
if (symmetric && ii >= symmStop) {
q1 = line1[szm & ((symmReflect - ii) * 2)] * qmult;
q2 = line1[szm & ((symmReflect - ii) * 2 + 1)] * qmult;
} else {
q1 = line1[szm & (ii * 2)] * qmult;
q2 = line1[szm & (ii * 2 + 1)] * qmult;
}var mu = .001;
if (ii == ii1) mu *= 1 - (ir1 - ii1);
 else if (ii == ii2) mu *= ir2 - ii2;
if (this.intensityCheck.getState ()) this.colorFunc[cfoff] += (q1 * q1 + q2 * q2) * mu;
 else if (noWaves) {
this.colorFunc[cfoff] += Math.sqrt (q1 * q1 + q2 * q2) * mu;
} else {
this.colorFunc[cfoff] += q1 * mu;
this.colorFunc[cfoff + 1] += q2 * mu;
}}
if (this.intensityCheck.getState ()) {
this.colorFunc[cfoff++] /= ir2 - ir1;
} else {
this.colorFunc[cfoff++] /= ir2 - ir1;
this.colorFunc[cfoff++] /= ir2 - ir1;
}}
}
}
}this.colorMult = 30 * Math.exp (this.brightnessBar.getValue () / 50. - 10);
if (!this.intensityCheck.getState ()) this.colorMult *= 1.5;
var ix = 0;
var k;
var l;
var height = this.winSize.height - 16;
var cfoff = 0;
var grncfadd = this.windowWidth * this.windowHeight;
var blucfadd = grncfadd * 2;
var m = this.freqBar.getValue () / 50.;
this.wavelength = 6.283185307179586 / m;
var noWaves = this.wavelength < 2 * zoom;
for (j = 0; j != this.windowHeight; j++) {
for (i = 0; i != this.windowWidth; i++, cfoff++) {
var x = Clazz.doubleToInt (i * this.winSize.width / this.windowWidth);
var y = Clazz.doubleToInt (j * height / this.windowHeight) + 16;
var x2 = Clazz.doubleToInt ((i + 1) * this.winSize.width / this.windowWidth);
var y2 = Clazz.doubleToInt ((j + 1) * height / this.windowHeight) + 16;
var colval = 0;
if (this.intensityCheck.getState ()) {
if (this.triChromaticCheck.getState ()) colval = 0xFF000000 + (this.getColorValue (cfoff) << 16) | (this.getColorValue (cfoff + grncfadd) << 8) | (this.getColorValue (cfoff + blucfadd));
 else colval = 0xFF000000 + (this.getColorValue (cfoff) << 8);
} else {
var q1 = this.colorFunc[cfoff++];
var q2 = this.colorFunc[cfoff];
if (noWaves) {
var qq = Clazz.doubleToInt (q1 * 255);
if (qq > 255) qq = 255;
colval = 0xFF000000 + qq * 0x10100;
} else {
var q = (q1 * trotr - q2 * troti) * this.colorMult;
if (q > 0) {
var qq = Clazz.doubleToInt (q * 255);
if (qq > 255) qq = 255;
colval = 0xFF000000 + (qq << 8);
} else {
var qq = Clazz.doubleToInt (-q * 255);
if (qq > 255) qq = 255;
colval = 0xFF000000 + (qq << 16);
}}}for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.winSize.width] = colval;


}
}
for (i = 0; i != this.windowWidth; i++) {
var ir1 = Clazz.doubleToInt ((i - Clazz.doubleToInt (this.windowWidth / 2)) * zoom);
var ir2 = Clazz.doubleToInt ((i - Clazz.doubleToInt (this.windowWidth / 2) + 1) * zoom);
var ii1 = Clazz.doubleToInt (ir1);
var ii2 = Clazz.doubleToInt (ir2);
var iic = ii2 - ii1;
var ii;
var funcr = 0;
var funcb = 0;
for (ii = ii1; ii <= ii2; ii++) {
var ij = ii + Clazz.doubleToInt (this.wallWidth / 2);
var mu = 1;
if (ii == ii1) mu *= 1 - (ir1 - ii1);
 else if (ii == ii2) mu *= ir2 - ii2;
if (ij < 0 || ij >= this.wallWidth) {
funcb += mu;
continue;
}funcb += (1 - (this.apertureR[ij] * this.apertureR[ij] + this.apertureI[ij] * this.apertureI[ij])) * mu;
var ph = Math.atan2 (this.apertureI[ij], this.apertureR[ij]) / 3.141592653589793;
if (ph < 0) funcr += (2 + ph) * mu;
 else funcr += ph * mu;
}
funcb /= ir2 - ir1;
funcr /= (ir2 - ir1) * 2;
if (obstacle) funcb = 1 - funcb;
var valb = Clazz.doubleToInt (funcb * 255);
var valr = Clazz.doubleToInt (funcr * 255);
if (valb < 0) valb = 0;
if (valb > 255) valb = 255;
if (valr < 0) valr = 0;
if (valb > 255) valb = 255;
var colval = 0xFF000000 + (valr << 16) | valb;
var x = Clazz.doubleToInt (i * this.winSize.width / this.windowWidth);
var x2 = Clazz.doubleToInt ((i + 1) * this.winSize.width / this.windowWidth);
var y = 0;
var y2 = 16;
for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.winSize.width] = colval;


}
if (this.imageSource != null) this.imageSource.newPixels ();
realg.drawImage (this.dbimage, 0, 0, this);
if (this.infoCheck.getState ()) {
var aw = this.auxBars[0].getValue ();
var s1 = this.setup.getInfo (0);
var s2 = this.setup.getInfo (1);
var s3 = "Screen height = " + this.getLength (zoom * this.windowHeight);
realg.setColor (java.awt.Color.black);
var fm = realg.getFontMetrics ();
var ms = s1 == null ? 0 : fm.stringWidth (s1);
ms = s2 == null ? 0 : this.max (fm.stringWidth (s2), ms);
ms = this.max (fm.stringWidth (s3), ms);
var x = 20 + ms;
var h = s1 == null ? (s2 == null ? 30 : 50) : 70;
realg.fillRect (this.winSize.width - x, this.winSize.height - h, x, h);
realg.setColor (java.awt.Color.white);
if (s1 != null) realg.drawString (s1, this.winSize.width - x + 10, this.winSize.height - 50);
if (s2 != null) realg.drawString (s2, this.winSize.width - x + 10, this.winSize.height - 30);
realg.drawString (s3, this.winSize.width - x + 10, this.winSize.height - 10);
}if (!this.intensityCheck.getState () && !this.stoppedCheck.getState ()) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "max", 
function (m1, m2) {
return (m1 > m2) ? m1 : m2;
}, "~N,~N");
Clazz.defineMethod (c$, "getLength", 
function (pix) {
var nf = java.text.NumberFormat.getInstance ();
nf.setMaximumFractionDigits (2);
var l = pix * 510 / this.wavelength;
if (l < 1e3) return nf.format (l) + " nm";
if (l < 1e6) return nf.format (l * 1e-3) + " " + this.muString + "m";
if (l < 1e9) return nf.format (l * 1e-6) + " mm";
return nf.format (l * 1e-9) + " m";
}, "~N");
Clazz.defineMethod (c$, "getColorValue", 
function (i) {
var val = Clazz.doubleToInt (this.colorFunc[i] * this.colorMult);
if (val > 255) val = 255;
return val;
}, "~N");
Clazz.defineMethod (c$, "abs", 
function (x) {
return x < 0 ? -x : x;
}, "~N");
Clazz.defineMethod (c$, "sign", 
function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
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
this.cv.repaint (100);
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
if (e.getSource () === this.resetTimeButton) {
this.t = 0;
this.recompute = true;
this.cv.repaint ();
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.resBar && this.resBar.getValue () != this.resBarValue) this.setResolution ();
var i;
for (i = 0; i != 5; i++) if (e.getSource () === this.auxBars[i]) {
this.apertureChanged ();
break;
}
if (e.getSource () === this.zoomBar || e.getSource () === this.angleBar || e.getSource () === this.freqBar) this.recompute = true;
this.setResetTimeButton ();
this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "setResetTimeButton", 
function () {
if (Clazz.instanceOf (this.setup, test.falstad.Wave2dFrame.ObstacleSetup) || this.freqBar.getValue () < 8 || this.intensityCheck.getState ()) this.resetTimeButton.setEnabled (false);
 else this.resetTimeButton.setEnabled (true);
});
Clazz.defineMethod (c$, "setResolution", 
function () {
this.resBarValue = this.windowWidth = this.windowHeight = this.resBar.getValue ();
if ((this.windowWidth & 1) == 1) this.windowWidth = this.windowHeight = this.resBarValue - 1;
this.colorFunc =  Clazz.newFloatArray (this.windowWidth * this.windowHeight * 3, 0);
this.wallWidth = 512;
this.apertureR =  Clazz.newDoubleArray (this.wallWidth, 0);
this.apertureI =  Clazz.newDoubleArray (this.wallWidth, 0);
System.out.print (this.windowWidth + " " + this.windowHeight + "\n");
this.apertureChanged ();
});
Clazz.defineMethod (c$, "setResolution", 
function (x) {
this.resBar.setValue (x);
this.setResolution ();
}, "~N");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.dragging = true;
this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
if ((e.getModifiers () & 16) != 0) return;
var x = e.getX ();
var y = e.getY ();
this.dragX = x;
this.dragY = y;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.dragging = true;
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
this.cv.repaint ();
if (e.getItemSelectable () === this.symmCheck) {
this.recompute = true;
}if (e.getItemSelectable () === this.triChromaticCheck || e.getItemSelectable () === this.intensityCheck) {
this.setResolution ();
this.recompute = true;
if (this.intensityCheck.getState ()) {
this.stoppedCheck.setEnabled (false);
this.speedBar.setEnabled (false);
this.triChromaticCheck.setEnabled (true);
} else {
this.stoppedCheck.setEnabled (true);
this.speedBar.setEnabled (true);
this.triChromaticCheck.setEnabled (false);
}this.setResetTimeButton ();
return;
}if (e.getItemSelectable () === this.setupChooser) this.doSetup ();
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "clearAperture", 
function () {
var i;
for (i = 0; i != this.wallWidth; i++) this.apertureR[i] = this.apertureI[i] = 0;

});
Clazz.defineMethod (c$, "doSetup", 
function () {
this.t = 1e8;
var i;
for (i = 0; i != 5; i++) this.auxBars[i].setValue (10);

this.freqBar.setValue (120);
this.zoomBar.setValue (10);
this.angleBar.setValue (90);
this.setup = this.setupList.elementAt (this.setupChooser.getSelectedIndex ());
this.angleBar.setEnabled (true);
this.setResetTimeButton ();
this.setup.select ();
this.apertureChanged ();
for (i = 0; i < this.setup.getAuxBarCount (); i++) {
this.auxLabels[i].setVisible (true);
this.auxBars[i].setVisible (true);
}
for (; i < 5; i++) {
this.auxLabels[i].setVisible (false);
this.auxBars[i].setVisible (false);
}
this.validate ();
});
Clazz.defineMethod (c$, "computeBessel", 
function (x) {
var ax = x;
var z;
var xx;
var y;
var ans;
var ans1;
var ans2;
if (x < 8.0) {
y = x * x;
ans1 = 57568490574.0 + y * (-1.3362590354E10 + y * (651619640.7 + y * (-1.121442418E7 + y * (77392.33017 + y * (-184.9052456)))));
ans2 = 57568490411.0 + y * (1029532985.0 + y * (9494680.718 + y * (59272.64853 + y * (267.8532712 + y * 1.0))));
this.bessj0 = ans = ans1 / ans2;
ans1 = -2.957821389E9 + y * (7062834065.0 + y * (-5.123598036E8 + y * (10879881.29 + y * (-86327.92757 + y * 228.4622733))));
ans2 = 40076544269.0 + y * (745249964.8 + y * (7189466.438 + y * (47447.26470 + y * (226.1030244 + y * 1.0))));
this.bessy0 = (ans1 / ans2) + 0.636619772 * this.bessj0 * Math.log (x);
} else {
z = 8.0 / ax;
y = z * z;
xx = ax - 0.785398164;
if (x > 83) {
ans1 = 1;
ans2 = -0.0156249;
} else {
ans1 = 1.0 + y * (-0.001098628627 + y * (0.2734510407e-4 + y * (-2.073370639E-6 + y * 0.2093887211e-6)));
ans2 = -0.01562499995 + y * (0.1430488765e-3 + y * (-6.911147651E-6 + y * (0.7621095161e-6 - y * 0.934935152e-7)));
}var sax = Math.sqrt (0.636619772 / ax);
var cosxx = Math.cos (xx);
var sinxx = Math.sin (xx);
ans2 *= z;
this.bessj0 = sax * (cosxx * ans1 - sinxx * ans2);
this.bessy0 = sax * (sinxx * ans1 + cosxx * ans2);
}}, "~N");
c$.$Wave2dFrame$Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Wave2dFrame, "Setup");
Clazz.defineMethod (c$, "getInfo", 
function (a) {
return null;
}, "~N");
Clazz.defineMethod (c$, "getAuxBarCount", 
function () {
return 2;
});
c$ = Clazz.p0p ();
};
c$.$Wave2dFrame$SingleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.w = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.Wave2dFrame, "SingleSlitSetup", test.falstad.Wave2dFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.Wave2dFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Single Slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Wave2dFrame"].auxLabels[0].setText ("Slit Width");
this.b$["test.falstad.Wave2dFrame"].brightnessBar.setValue (440);
});
Clazz.overrideMethod (c$, "doAperture", 
function () {
var a;
this.w = this.b$["test.falstad.Wave2dFrame"].auxBars[0].getValue ();
for (a = 0; a != this.w; a++) this.b$["test.falstad.Wave2dFrame"].apertureR[Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].wallWidth / 2) - Clazz.doubleToInt (this.w / 2) + a] = 1;

});
Clazz.overrideMethod (c$, "getAuxBarCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getInfo", 
function (a) {
if (a == 1) return "Aperture width = " + this.b$["test.falstad.Wave2dFrame"].getLength (this.w);
return null;
}, "~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Wave2dFrame.DoubleSlitSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Wave2dFrame$DoubleSlitSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Wave2dFrame, "DoubleSlitSetup", test.falstad.Wave2dFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.Wave2dFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Double Slit";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Wave2dFrame"].auxLabels[0].setText ("Slit Width");
this.b$["test.falstad.Wave2dFrame"].auxLabels[1].setText ("Separation");
this.b$["test.falstad.Wave2dFrame"].auxLabels[2].setText ("Balance");
this.b$["test.falstad.Wave2dFrame"].auxLabels[3].setText ("Phase Difference");
this.b$["test.falstad.Wave2dFrame"].auxBars[2].setValue (50);
this.b$["test.falstad.Wave2dFrame"].auxBars[3].setValue (1);
this.b$["test.falstad.Wave2dFrame"].brightnessBar.setValue (380);
});
Clazz.overrideMethod (c$, "doAperture", 
function () {
var a;
var b = this.b$["test.falstad.Wave2dFrame"].auxBars[0].getValue ();
var c = this.b$["test.falstad.Wave2dFrame"].auxBars[1].getValue ();
var d = this.b$["test.falstad.Wave2dFrame"].auxBars[2].getValue () / 100.;
var e = 1 - d;
if (e > d) {
d /= e;
e = 1;
} else {
e /= d;
d = 1;
}var f = (this.b$["test.falstad.Wave2dFrame"].auxBars[3].getValue () - 1) * 3.141592653589793 / 50.;
var g = d * Math.cos (f);
var h = d * Math.sin (f);
for (a = 0; a != b; a++) {
this.b$["test.falstad.Wave2dFrame"].apertureR[Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].wallWidth / 2) - c - a] = e;
this.b$["test.falstad.Wave2dFrame"].apertureR[Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].wallWidth / 2) + c + a] = g;
this.b$["test.falstad.Wave2dFrame"].apertureI[Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].wallWidth / 2) + c + a] = h;
}
});
Clazz.overrideMethod (c$, "getInfo", 
function (a) {
if (a == 0) return "Slit width = " + this.b$["test.falstad.Wave2dFrame"].getLength (this.b$["test.falstad.Wave2dFrame"].auxBars[0].getValue ());
return "Separation = " + this.b$["test.falstad.Wave2dFrame"].getLength (2 * this.b$["test.falstad.Wave2dFrame"].auxBars[1].getValue () - 1);
}, "~N");
Clazz.overrideMethod (c$, "getAuxBarCount", 
function () {
return 4;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Wave2dFrame.GratingSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Wave2dFrame$GratingSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.w = 0;
this.s = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.Wave2dFrame, "GratingSetup", test.falstad.Wave2dFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.Wave2dFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Multiple Slits";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Wave2dFrame"].auxLabels[0].setText ("Slit Count");
this.b$["test.falstad.Wave2dFrame"].auxLabels[1].setText ("Slit Width");
this.b$["test.falstad.Wave2dFrame"].auxLabels[2].setText ("Separation");
this.b$["test.falstad.Wave2dFrame"].brightnessBar.setValue (345);
});
Clazz.overrideMethod (c$, "getAuxBarCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "doAperture", 
function () {
var a;
this.w = this.b$["test.falstad.Wave2dFrame"].auxBars[1].getValue ();
this.s = this.b$["test.falstad.Wave2dFrame"].auxBars[2].getValue () + 3;
if (this.w > this.s - 1) this.w = this.s - 1;
var b;
var c = Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].auxBars[0].getValue () / 5) + 1;
var d = 0;
while (true) {
d = Clazz.doubleToInt ((this.s * (c - 1) + this.w) / 2);
if (-d + this.s * (c - 1) + this.w < Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].wallWidth / 2)) break;
c--;
}
for (a = 0; a != this.w; a++) for (b = 0; b != c; b++) this.b$["test.falstad.Wave2dFrame"].apertureR[Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].wallWidth / 2) - d + this.s * b + a] = 1;


});
Clazz.overrideMethod (c$, "getInfo", 
function (a) {
if (a == 0) return "Slit width = " + this.b$["test.falstad.Wave2dFrame"].getLength (this.w);
return "Separation = " + this.b$["test.falstad.Wave2dFrame"].getLength (this.s - this.w);
}, "~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Wave2dFrame.ObstacleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Wave2dFrame$ObstacleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.w = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.Wave2dFrame, "ObstacleSetup", test.falstad.Wave2dFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.Wave2dFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Obstacle";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Wave2dFrame"].auxLabels[0].setText ("Width");
this.b$["test.falstad.Wave2dFrame"].angleBar.setVisible (false);
this.b$["test.falstad.Wave2dFrame"].angleBar.setValue (90);
this.b$["test.falstad.Wave2dFrame"].resetTimeButton.setVisible (false);
this.b$["test.falstad.Wave2dFrame"].brightnessBar.setValue (310);
});
Clazz.overrideMethod (c$, "getAuxBarCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "doAperture", 
function () {
var a;
this.w = Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].auxBars[0].getValue () * 1.5);
for (a = 0; a != this.w; a++) this.b$["test.falstad.Wave2dFrame"].apertureR[Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].wallWidth / 2) - Clazz.doubleToInt (this.w / 2) + a] = 1;

});
Clazz.overrideMethod (c$, "getInfo", 
function (a) {
if (a == 1) return "Width = " + this.b$["test.falstad.Wave2dFrame"].getLength (this.w);
return null;
}, "~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Wave2dFrame.ZonePlateEvenSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Wave2dFrame$ZonePlateEvenSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.evenOdd = 0;
this.phase = false;
this.blazed = false;
Clazz.instantialize (this, arguments);
}, test.falstad.Wave2dFrame, "ZonePlateEvenSetup", test.falstad.Wave2dFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.Wave2dFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Zone Plate (Even)";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Wave2dFrame"].auxLabels[0].setText ("Intended Frequency");
this.b$["test.falstad.Wave2dFrame"].auxBars[0].setValue (Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].freqBar.getValue () * 100 / 236));
this.b$["test.falstad.Wave2dFrame"].auxLabels[1].setText ("Focal Length");
this.b$["test.falstad.Wave2dFrame"].auxBars[1].setValue (20);
this.b$["test.falstad.Wave2dFrame"].auxLabels[2].setText ("Plate Width");
this.b$["test.falstad.Wave2dFrame"].auxBars[2].setValue (100);
this.b$["test.falstad.Wave2dFrame"].brightnessBar.setValue (111);
});
Clazz.overrideMethod (c$, "getAuxBarCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "doAperture", 
function () {
var a;
var b = this.b$["test.falstad.Wave2dFrame"].auxBars[0].getValue () * .0472;
var c = 3.141592653589793 / b;
var d = this.b$["test.falstad.Wave2dFrame"].auxBars[2].getValue () * 3;
var e = this.b$["test.falstad.Wave2dFrame"].auxBars[1].getValue () * 5;
var f = Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].wallWidth / 2);
for (a = 1; a != this.b$["test.falstad.Wave2dFrame"].wallWidth; a++) {
var g = f - a;
if (g < -d || g > d) continue;
var h = Math.sqrt (g * g + e * e);
h = (h - e);
if (this.blazed) {
var i = h / c * 3.141592653589793;
this.b$["test.falstad.Wave2dFrame"].apertureR[a] = Math.cos (i);
this.b$["test.falstad.Wave2dFrame"].apertureI[a] = Math.sin (i);
} else {
var i = Clazz.doubleToInt (h / c);
this.b$["test.falstad.Wave2dFrame"].apertureR[a] = ((i & 1) == this.evenOdd) ? 1 : (this.phase) ? -1 : 0;
}}
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Wave2dFrame.ZonePlateOddSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Wave2dFrame$ZonePlateOddSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Wave2dFrame, "ZonePlateOddSetup", test.falstad.Wave2dFrame.ZonePlateEvenSetup, null, Clazz.innerTypeInstance (test.falstad.Wave2dFrame.ZonePlateEvenSetup, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.Wave2dFrame.ZonePlateOddSetup, []);
this.evenOdd = 1;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "Zone Plate (Odd)";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Wave2dFrame.ZonePlatePhaseSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Wave2dFrame$ZonePlatePhaseSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Wave2dFrame, "ZonePlatePhaseSetup", test.falstad.Wave2dFrame.ZonePlateOddSetup, null, Clazz.innerTypeInstance (test.falstad.Wave2dFrame.ZonePlateOddSetup, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.Wave2dFrame.ZonePlatePhaseSetup, []);
this.phase = true;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "Phase-Reversal Zone Plate";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Wave2dFrame.ZonePlateBlazedSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Wave2dFrame$ZonePlateBlazedSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Wave2dFrame, "ZonePlateBlazedSetup", test.falstad.Wave2dFrame.ZonePlateOddSetup, null, Clazz.innerTypeInstance (test.falstad.Wave2dFrame.ZonePlateOddSetup, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.Wave2dFrame.ZonePlateBlazedSetup, []);
this.blazed = true;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return "Blazed Zone Plate";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Wave2dFrame.Hologram1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Wave2dFrame$Hologram1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Wave2dFrame, "Hologram1Setup", test.falstad.Wave2dFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.Wave2dFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Absorption Hologram";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Wave2dFrame"].auxLabels[0].setText ("Intended Frequency");
this.b$["test.falstad.Wave2dFrame"].auxBars[0].setValue (Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].freqBar.getValue () * 100 / 236));
this.b$["test.falstad.Wave2dFrame"].auxLabels[1].setText ("X 1");
this.b$["test.falstad.Wave2dFrame"].auxLabels[2].setText ("Y 1");
this.b$["test.falstad.Wave2dFrame"].auxLabels[3].setText ("X 2");
this.b$["test.falstad.Wave2dFrame"].auxLabels[4].setText ("Y 2");
this.b$["test.falstad.Wave2dFrame"].auxBars[1].setValue (40);
this.b$["test.falstad.Wave2dFrame"].auxBars[2].setValue (15);
this.b$["test.falstad.Wave2dFrame"].auxBars[3].setValue (70);
this.b$["test.falstad.Wave2dFrame"].auxBars[4].setValue (40);
this.b$["test.falstad.Wave2dFrame"].brightnessBar.setValue (285);
this.b$["test.falstad.Wave2dFrame"].zoomBar.setValue (15);
});
Clazz.overrideMethod (c$, "getAuxBarCount", 
function () {
return 5;
});
Clazz.overrideMethod (c$, "doAperture", 
function () {
var a;
var b = this.b$["test.falstad.Wave2dFrame"].auxBars[0].getValue () * .0472;
var c = 3.141592653589793 / b;
var d = this.b$["test.falstad.Wave2dFrame"].auxBars[1].getValue () * 2 - 100;
var e = this.b$["test.falstad.Wave2dFrame"].auxBars[2].getValue () * 3 + 5;
var f = this.b$["test.falstad.Wave2dFrame"].auxBars[3].getValue () * 2 - 100;
var g = this.b$["test.falstad.Wave2dFrame"].auxBars[4].getValue () * 3 + 5;
var h = Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].wallWidth / 2);
var i = 300;
var j = 0;
var k = .75;
for (a = 0; a != this.b$["test.falstad.Wave2dFrame"].wallWidth; a++) {
if (a - h < -i || a - h > i) continue;
var l = d - (a - h);
var m = Math.sqrt (l * l + e * e);
this.b$["test.falstad.Wave2dFrame"].computeBessel (m * b);
var n = this.b$["test.falstad.Wave2dFrame"].bessj0;
var o = this.b$["test.falstad.Wave2dFrame"].bessy0;
l = f - (a - h);
m = Math.sqrt (l * l + g * g);
this.b$["test.falstad.Wave2dFrame"].computeBessel (m * b);
n += this.b$["test.falstad.Wave2dFrame"].bessj0;
o += this.b$["test.falstad.Wave2dFrame"].bessy0;
n += k;
var p = this.b$["test.falstad.Wave2dFrame"].apertureR[a] = Math.sqrt (n * n + o * o);
if (p > j) j = p;
}
j = Math.sqrt (j);
for (a = 0; a != this.b$["test.falstad.Wave2dFrame"].wallWidth; a++) this.b$["test.falstad.Wave2dFrame"].apertureR[a] /= j;

});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Wave2dFrame.Hologram2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Wave2dFrame$Hologram2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Wave2dFrame, "Hologram2Setup", test.falstad.Wave2dFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.Wave2dFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Phase Hologram";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Wave2dFrame"].auxLabels[0].setText ("Intended Frequency");
this.b$["test.falstad.Wave2dFrame"].auxBars[0].setValue (Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].freqBar.getValue () * 100 / 236));
this.b$["test.falstad.Wave2dFrame"].auxLabels[1].setText ("X 1");
this.b$["test.falstad.Wave2dFrame"].auxLabels[2].setText ("Y 1");
this.b$["test.falstad.Wave2dFrame"].auxLabels[3].setText ("X 2");
this.b$["test.falstad.Wave2dFrame"].auxLabels[4].setText ("Y 2");
this.b$["test.falstad.Wave2dFrame"].auxBars[1].setValue (40);
this.b$["test.falstad.Wave2dFrame"].auxBars[2].setValue (15);
this.b$["test.falstad.Wave2dFrame"].auxBars[3].setValue (70);
this.b$["test.falstad.Wave2dFrame"].auxBars[4].setValue (40);
this.b$["test.falstad.Wave2dFrame"].brightnessBar.setValue (150);
this.b$["test.falstad.Wave2dFrame"].zoomBar.setValue (15);
});
Clazz.overrideMethod (c$, "getAuxBarCount", 
function () {
return 5;
});
Clazz.overrideMethod (c$, "doAperture", 
function () {
var a;
var b = this.b$["test.falstad.Wave2dFrame"].auxBars[0].getValue () * .0472;
var c = 3.141592653589793 / b;
var d = this.b$["test.falstad.Wave2dFrame"].auxBars[1].getValue () * 2 - 100;
var e = this.b$["test.falstad.Wave2dFrame"].auxBars[2].getValue () * 3 + 5;
var f = this.b$["test.falstad.Wave2dFrame"].auxBars[3].getValue () * 2 - 100;
var g = this.b$["test.falstad.Wave2dFrame"].auxBars[4].getValue () * 3 + 5;
var h = Clazz.doubleToInt (this.b$["test.falstad.Wave2dFrame"].wallWidth / 2);
var i = 300;
var j = 0;
for (a = 0; a != this.b$["test.falstad.Wave2dFrame"].wallWidth; a++) {
if (a - h < -i || a - h > i) continue;
var k = d - (a - h);
var l = Math.sqrt (k * k + e * e);
this.b$["test.falstad.Wave2dFrame"].computeBessel (l * b);
this.b$["test.falstad.Wave2dFrame"].apertureR[a] = this.b$["test.falstad.Wave2dFrame"].bessj0;
this.b$["test.falstad.Wave2dFrame"].apertureI[a] = this.b$["test.falstad.Wave2dFrame"].bessy0;
k = f - (a - h);
l = Math.sqrt (k * k + g * g);
this.b$["test.falstad.Wave2dFrame"].computeBessel (l * b);
this.b$["test.falstad.Wave2dFrame"].apertureR[a] += this.b$["test.falstad.Wave2dFrame"].bessj0;
this.b$["test.falstad.Wave2dFrame"].apertureI[a] += this.b$["test.falstad.Wave2dFrame"].bessy0;
var m = this.b$["test.falstad.Wave2dFrame"].apertureR[a] * this.b$["test.falstad.Wave2dFrame"].apertureR[a] + this.b$["test.falstad.Wave2dFrame"].apertureI[a] * this.b$["test.falstad.Wave2dFrame"].apertureI[a];
if (m > j) j = m;
}
j = Math.sqrt (j);
for (a = 0; a != this.b$["test.falstad.Wave2dFrame"].wallWidth; a++) {
this.b$["test.falstad.Wave2dFrame"].apertureR[a] /= j;
this.b$["test.falstad.Wave2dFrame"].apertureI[a] /= j;
}
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return null;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"auxBarCount", 5,
"pi", 3.14159265358979323846,
"apertureHeight", 16);
c$ = Clazz.decorateAsClass (function () {
this.wtabf = null;
this.wtabi = null;
this.size = 0;
Clazz.instantialize (this, arguments);
}, test.falstad, "FFT");
Clazz.makeConstructor (c$, 
function (sz) {
this.size = sz;
if ((this.size & (this.size - 1)) != 0) System.out.println ("size must be power of two!");
this.calcWTable ();
}, "~N");
Clazz.defineMethod (c$, "calcWTable", 
function () {
this.wtabf =  Clazz.newFloatArray (this.size, 0);
this.wtabi =  Clazz.newFloatArray (this.size, 0);
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
