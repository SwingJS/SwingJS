Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.JSThread", "swingjs.awt.Applet", "$.Canvas", "$.Frame", "java.awt.Color"], ["test.falstad.StringWave", "$.StringWaveFrame"], ["java.awt.Dimension", "java.lang.Double", "java.util.Random", "javax.sound.sampled.AudioFormat", "$.AudioSystem", "$.DataLine", "$.SourceDataLine", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.started = false;
Clazz.instantialize (this, arguments);
}, test.falstad, "StringWave", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.StringWave.ogf != null) test.falstad.StringWave.ogf.dispose ();
test.falstad.StringWave.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.StringWave.ogf =  new test.falstad.StringWaveFrame (null);
test.falstad.StringWave.ogf.init ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.StringWave.ogf == null) {
this.started = true;
test.falstad.StringWave.ogf =  new test.falstad.StringWaveFrame (this);
test.falstad.StringWave.ogf.init ();
this.repaint ();
}});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.StringWave.ogf == null) s = "Applet is finished.";
 else if (test.falstad.StringWave.ogf.useFrame) test.falstad.StringWave.ogf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.StringWave, "paint", [g]);
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
if (test.falstad.StringWave.ogf != null) test.falstad.StringWave.ogf.dispose ();
test.falstad.StringWave.ogf = null;
this.repaint ();
});
Clazz.defineStatics (c$,
"ogf", null);
c$ = Clazz.decorateAsClass (function () {
this.isJava = true;
this.playThread = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.maxTerms = 60;
this.maxMaxTerms = 160;
this.sampleCount = 0;
this.sinTable = null;
this.sineButton = null;
this.triangleButton = null;
this.blankButton = null;
this.resonanceButton = null;
this.stoppedCheck = null;
this.forceCheck = null;
this.soundCheck = null;
this.touchCheck = null;
this.backwardsCheck = null;
this.logCheck = null;
this.modeChooser = null;
this.displayChooser = null;
this.dampingBar = null;
this.speedBar = null;
this.forceBar = null;
this.loadBar = null;
this.tensionBar = null;
this.magcoef = null;
this.dampcoef = 0;
this.phasecoef = null;
this.phasecoefcos = null;
this.phasecoefadj = null;
this.forcebasiscoef = null;
this.omega = null;
this.step = 0;
this.func = null;
this.funci = null;
this.selectedCoef = 0;
this.magnitudesY = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.dragging = false;
this.bowing = false;
this.bowCaught = false;
this.forceApplied = false;
this.t = 0;
this.forceMag = 0;
this.pause = 0;
this.forceBarValue = 0;
this.forceTimeZero = 0;
this.tensionBarValue = 0;
this.gray1 = null;
this.gray2 = null;
this.useFrame = false;
this.showControls = false;
this.cv = null;
this.applet = null;
this.java2 = false;
this.main = null;
this.shown = false;
this.lastTime = 0;
this.logep2 = 0;
if (!Clazz.isClassDefined ("test.falstad.StringWaveFrame.PlayThread")) {
test.falstad.StringWaveFrame.$StringWaveFrame$PlayThread$ ();
}
if (!Clazz.isClassDefined ("test.falstad.StringWaveFrame.FFT")) {
test.falstad.StringWaveFrame.$StringWaveFrame$FFT$ ();
}
if (!Clazz.isClassDefined ("test.falstad.StringWaveFrame.StringWaveCanvas")) {
test.falstad.StringWaveFrame.$StringWaveFrame$StringWaveCanvas$ ();
}
if (!Clazz.isClassDefined ("test.falstad.StringWaveFrame.StringWaveLayout")) {
test.falstad.StringWaveFrame.$StringWaveFrame$StringWaveLayout$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "StringWaveFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.prepareFields (c$, function () {
this.gray1 =  new java.awt.Color (76, 76, 76);
this.gray2 =  new java.awt.Color (127, 127, 127);
});
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "StringWave Series by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.StringWaveFrame, ["Loaded String Applet v1.5a"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
{
isJava = false;
}}, "test.falstad.StringWave");
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
this.selectedCoef = -1;
this.main.setLayout (Clazz.innerTypeInstance (test.falstad.StringWaveFrame.StringWaveLayout, this, null));
this.cv = Clazz.innerTypeInstance (test.falstad.StringWaveFrame.StringWaveCanvas, this, null, this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.main.add (this.sineButton =  new swingjs.awt.Button ("Fundamental"));
this.sineButton.addActionListener (this);
this.main.add (this.triangleButton =  new swingjs.awt.Button ("Center Pluck"));
this.triangleButton.addActionListener (this);
this.main.add (this.blankButton =  new swingjs.awt.Button ("Clear"));
this.blankButton.addActionListener (this);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
this.main.add (this.stoppedCheck);
this.forceCheck =  new swingjs.awt.Checkbox ("Driving Force", false);
this.forceCheck.addItemListener (this);
this.main.add (this.forceCheck);
this.soundCheck =  new swingjs.awt.Checkbox ("Sound", false);
this.soundCheck.addItemListener (this);
if (this.java2) this.main.add (this.soundCheck);
this.touchCheck =  new swingjs.awt.Checkbox ("Touched in Center", false);
this.touchCheck.addItemListener (this);
this.backwardsCheck =  new swingjs.awt.Checkbox ("Run Backwards", false);
this.backwardsCheck.addItemListener (this);
this.logCheck =  new swingjs.awt.Checkbox ("Log View", false);
this.logCheck.addItemListener (this);
this.main.add (this.logCheck);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Pluck string");
this.modeChooser.add ("Mouse = Shape string");
this.modeChooser.addItemListener (this);
this.main.add (this.modeChooser);
this.displayChooser =  new swingjs.awt.Choice ();
this.displayChooser.add ("Display Phases");
this.displayChooser.add ("Display Left+Right");
this.displayChooser.add ("Display Phase Cosines");
this.displayChooser.add ("Display Phasors");
this.displayChooser.add ("Display Modes");
this.displayChooser.addItemListener (this);
this.main.add (this.displayChooser);
this.main.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.main.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 85, 1, 1, 200));
this.speedBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Damping", 0));
this.main.add (this.dampingBar =  new swingjs.awt.Scrollbar (0, 10, 1, 0, 400));
this.dampingBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Force Frequency", 0));
this.forceBarValue = 5;
this.main.add (this.forceBar =  new swingjs.awt.Scrollbar (0, this.forceBarValue, 1, 1, 30));
this.forceBar.addAdjustmentListener (this);
this.main.add (this.resonanceButton =  new swingjs.awt.Button ("Resonance Freq"));
this.resonanceButton.addActionListener (this);
this.main.add ( new swingjs.awt.Label ("Number of Loads", 0));
this.main.add (this.loadBar =  new swingjs.awt.Scrollbar (0, this.maxTerms, 1, 2, this.maxMaxTerms));
this.loadBar.addAdjustmentListener (this);
this.setLoadCount ();
this.tensionBarValue = 16;
this.main.add ( new swingjs.awt.Label ("Tension", 0));
this.main.add (this.tensionBar =  new swingjs.awt.Scrollbar (0, this.tensionBarValue, 1, 1, 100));
this.tensionBar.addAdjustmentListener (this);
try {
var param = this.applet.getParameter ("PAUSE");
if (param != null) this.pause = Integer.parseInt (param);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.magcoef =  Clazz.newDoubleArray (this.maxMaxTerms, 0);
this.phasecoef =  Clazz.newDoubleArray (this.maxMaxTerms, 0);
this.phasecoefcos =  Clazz.newDoubleArray (this.maxMaxTerms, 0);
this.phasecoefadj =  Clazz.newDoubleArray (this.maxMaxTerms, 0);
this.forcebasiscoef =  Clazz.newDoubleArray (this.maxMaxTerms, 0);
this.func =  Clazz.newDoubleArray (this.maxMaxTerms + 1, 0);
this.funci =  Clazz.newDoubleArray (this.maxMaxTerms + 1, 0);
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
}});
Clazz.defineMethod (c$, "reinit", 
function () {
this.doSine ();
});
Clazz.defineMethod (c$, "handleResize", 
function () {
var d = this.winSize = this.cv.getSize ();
if (this.winSize.width == 0) return;
this.dbimage = this.createImage (d.width, d.height);
});
Clazz.defineMethod (c$, "triggerShow", 
function () {
if (!this.shown) this.setVisible (true);
this.shown = true;
});
Clazz.defineMethod (c$, "doSine", 
function () {
var x;
for (x = 0; x != this.sampleCount; x++) {
this.func[x] = java.lang.Math.sin (x * this.step);
}
this.func[this.sampleCount] = this.func[0];
this.transform (true);
});
Clazz.defineMethod (c$, "doTriangle", 
function () {
var x;
for (x = 0; x <= Clazz.doubleToInt (this.sampleCount / 2); x++) this.func[this.sampleCount - x] = this.func[x] = 2.0 * x / this.sampleCount;

this.func[this.sampleCount] = this.func[0];
this.transform (true);
});
Clazz.defineMethod (c$, "doBlank", 
function () {
var x;
for (x = 0; x <= this.sampleCount; x++) this.func[x] = 0;

this.transform (true);
});
Clazz.defineMethod (c$, "transform", 
function (novel) {
var x;
var y;
this.t = 0;
for (y = 1; y != this.maxTerms; y++) {
var a = 0;
var b = 0;
for (x = 1; x != this.sampleCount; x++) {
a += this.sinTable[x][y] * this.func[x];
b -= this.sinTable[x][y] * this.funci[x];
}
a *= 2.0 / this.sampleCount;
b *= 2.0 / (this.sampleCount * this.omega[y]);
if (a < 1.0E-5 && a > -1.0E-5) a = 0;
if (b < 1.0E-5 && b > -1.0E-5) b = 0;
if (novel) b = 0;
var r = java.lang.Math.sqrt (a * a + b * b);
this.magcoef[y] = r;
var ph2 = java.lang.Math.atan2 (b, a);
this.phasecoefadj[y] = ph2;
this.phasecoef[y] = ph2;
}
this.updateSound ();
}, "~B");
Clazz.defineMethod (c$, "updateSound", 
function () {
if (this.playThread != null) this.playThread.soundChanged ();
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
Clazz.defineMethod (c$, "updateStringWave", 
function (realg) {
if (this.winSize == null || this.winSize.width == 0) return;
var g = this.dbimage.getGraphics ();
var allQuiet = true;
var dampmult = 1;
if (!this.stoppedCheck.getState ()) {
if (this.bowing) {
this.doBow ();
allQuiet = false;
}var val = this.speedBar.getValue ();
if (this.forceCheck.getState ()) {
this.doForce ();
allQuiet = false;
} else this.forceMag = 0;
var sysTime = System.currentTimeMillis ();
var tadd = 0;
if (this.lastTime != 0) tadd = java.lang.Math.exp (val / 20.) * (6.666666666666667E-5) * (sysTime - this.lastTime);
if (this.backwardsCheck.getState ()) this.t -= tadd;
 else this.t += tadd;
this.lastTime = sysTime;
dampmult = Math.exp (this.dampcoef * tadd);
} else this.lastTime = 0;
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
var i;
var ox = -1;
var oy = -1;
var panelHeight = this.getPanelHeight ();
var midy = Clazz.doubleToInt (panelHeight / 2);
var halfPanel = Clazz.doubleToInt (panelHeight / 2);
var ymult = .75 * halfPanel;
for (i = -1; i <= 1; i++) {
g.setColor ((i == 0) ? this.gray2 : this.gray1);
g.drawLine (0, midy + (i * Clazz.doubleToInt (ymult)), this.winSize.width, midy + (i * Clazz.doubleToInt (ymult)));
}
g.setColor (this.gray2);
g.drawLine (Clazz.doubleToInt (this.winSize.width / 2), midy - Clazz.doubleToInt (ymult), Clazz.doubleToInt (this.winSize.width / 2), midy + Clazz.doubleToInt (ymult));
if (this.dragging && this.selection == 1) {
g.setColor (java.awt.Color.cyan);
allQuiet = true;
for (i = 0; i != this.sampleCount + 1; i++) {
var x = Clazz.doubleToInt (this.winSize.width * i / this.sampleCount);
var y = midy - Clazz.doubleToInt (ymult * this.func[i]);
if (ox != -1) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}
}if (!this.stoppedCheck.getState ()) {
if (this.touchCheck.getState ()) this.doTouch ();
for (i = 1; i != this.maxTerms; i++) this.magcoef[i] *= dampmult;

}var magcoefdisp = this.magcoef;
var phasecoefdisp = this.phasecoef;
var phasecoefcosdisp = this.phasecoefcos;
if (this.dragging && this.selection == 1) {
this.lastTime = 0;
} else {
g.setColor (java.awt.Color.white);
ox = -1;
var j;
for (j = 1; j != this.maxTerms; j++) {
if (this.magcoef[j] < 1.0E-5 && this.magcoef[j] > -1.0E-5) {
this.magcoef[j] = this.phasecoef[j] = this.phasecoefadj[j] = 0;
continue;
}allQuiet = false;
this.phasecoef[j] = (this.omega[j] * this.t + this.phasecoefadj[j]) % (6.283185307179586);
if (this.phasecoef[j] > 3.141592653589793) this.phasecoef[j] -= 6.283185307179586;
 else if (this.phasecoef[j] < -3.141592653589793) this.phasecoef[j] += 6.283185307179586;
this.phasecoefcos[j] = java.lang.Math.cos (this.phasecoef[j]);
}
if (this.forceApplied) {
allQuiet = false;
magcoefdisp =  Clazz.newDoubleArray (this.maxTerms, 0);
phasecoefdisp =  Clazz.newDoubleArray (this.maxTerms, 0);
phasecoefcosdisp =  Clazz.newDoubleArray (this.maxTerms, 0);
for (i = 1; i < this.maxTerms; i++) {
var ph = this.phasecoef[i];
var a = this.magcoef[i] * this.phasecoefcos[i];
var b = this.magcoef[i] * java.lang.Math.sin (ph);
a += this.forcebasiscoef[i];
var r = java.lang.Math.sqrt (a * a + b * b);
magcoefdisp[i] = r;
var ph2 = java.lang.Math.atan2 (b, a);
phasecoefdisp[i] += ph2;
phasecoefcosdisp[i] = (r > 0) ? a / r : 0;
}
}var dotSize = (this.sampleCount < 40) ? 5 : 0;
var funcDotSize = dotSize;
var forcePos = (this.forceMag == 0) ? -1 : Clazz.doubleToInt (this.sampleCount / 2);
for (i = 0; i != this.sampleCount + 1; i++) {
var x = Clazz.doubleToInt (this.winSize.width * i / this.sampleCount);
var dy = 0;
for (j = 1; j != this.maxTerms; j++) dy += magcoefdisp[j] * this.sinTable[i][j] * phasecoefcosdisp[j];

this.func[i] = dy;
var y = midy - Clazz.doubleToInt (ymult * dy);
if (ox != -1) g.drawLine (ox, oy, x, y);
if (dotSize > 0 && i != 0 && i != this.sampleCount) g.fillOval (x - Clazz.doubleToInt (dotSize / 2), y - Clazz.doubleToInt (dotSize / 2), dotSize, dotSize);
if (i == forcePos) {
var yl = Clazz.doubleToInt (ymult * this.forceMag * 8);
if (yl > 7 || yl < -7) {
var y2 = y - yl;
var forcedir = (this.forceMag < 0) ? -1 : 1;
g.drawLine (x, y, x, y2);
g.drawLine (x, y2, x + 5, y2 + 5 * forcedir);
g.drawLine (x, y2, x - 5, y2 + 5 * forcedir);
}}ox = x;
oy = y;
}
}if (this.selectedCoef != -1 && !this.dragging && (magcoefdisp[this.selectedCoef] > .04 || magcoefdisp[this.selectedCoef] < -0.04)) {
g.setColor (java.awt.Color.yellow);
ox = -1;
ymult *= magcoefdisp[this.selectedCoef];
for (i = 0; i != this.sampleCount + 1; i++) {
var x = Clazz.doubleToInt (this.winSize.width * i / this.sampleCount);
var dy = this.sinTable[i][this.selectedCoef] * phasecoefcosdisp[this.selectedCoef];
var y = midy - Clazz.doubleToInt (ymult * dy);
if (ox != -1) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}
}var termWidth = this.getTermWidth ();
ymult = .6 * halfPanel;
g.setColor (java.awt.Color.white);
if (this.displayChooser.getSelectedIndex () == 0 || this.displayChooser.getSelectedIndex () == 2) this.magnitudesY = panelHeight;
 else this.magnitudesY = panelHeight * 2;
midy = this.magnitudesY + (Clazz.doubleToInt (panelHeight / 2)) + Clazz.doubleToInt (Clazz.doubleToInt (ymult) / 2);
this.centerString (g, "Harmonics: Magnitudes", this.magnitudesY + Clazz.doubleToInt (panelHeight * .16));
g.setColor (this.gray2);
g.drawLine (0, midy, this.winSize.width, midy);
g.setColor (this.gray1);
g.drawLine (0, midy - Clazz.doubleToInt (ymult), this.winSize.width, midy - Clazz.doubleToInt (ymult));
g.drawLine (0, midy + Clazz.doubleToInt (ymult), this.winSize.width, midy + Clazz.doubleToInt (ymult));
var dotSize = termWidth - 3;
if (dotSize < 3) dotSize = 3;
if (dotSize > 9) dotSize = 9;
for (i = 1; i != this.maxTerms; i++) {
var t = termWidth * (i - 1) + Clazz.doubleToInt (termWidth / 2);
var y = midy - Clazz.doubleToInt (this.logcoef (magcoefdisp[i]) * ymult);
g.setColor (i == this.selectedCoef ? java.awt.Color.yellow : java.awt.Color.white);
g.drawLine (t, midy, t, y);
g.fillOval (t - Clazz.doubleToInt (dotSize / 2), y - Clazz.doubleToInt (dotSize / 2), dotSize, dotSize);
}
if (this.displayChooser.getSelectedIndex () == 0 || this.displayChooser.getSelectedIndex () == 2) {
g.setColor (java.awt.Color.white);
var cosines = this.displayChooser.getSelectedIndex () == 2;
this.centerString (g, cosines ? "Harmonics: Phase Cosines" : "Harmonics: Phases", Clazz.doubleToInt (panelHeight * 2.10));
ymult = .75 * halfPanel;
midy = (Clazz.doubleToInt ((panelHeight * 5) / 2));
for (i = -2; i <= 2; i++) {
if (cosines && (i == 1 || i == -1)) continue;
g.setColor ((i == 0) ? this.gray2 : this.gray1);
g.drawLine (0, midy + Clazz.doubleToInt ((i * Clazz.doubleToInt (ymult)) / 2), this.winSize.width, midy + Clazz.doubleToInt ((i * Clazz.doubleToInt (ymult)) / 2));
}
if (!cosines) ymult /= 3.141592653589793;
for (i = 1; i != this.maxTerms; i++) {
var t = termWidth * (i - 1) + Clazz.doubleToInt (termWidth / 2);
var ph = (cosines) ? phasecoefcosdisp[i] : phasecoefdisp[i];
if (this.magcoef[i] > -7.5E-4 && magcoefdisp[i] < 7.5E-4) ph = 0;
var y = midy - Clazz.doubleToInt (ph * ymult);
g.setColor (i == this.selectedCoef ? java.awt.Color.yellow : java.awt.Color.white);
g.drawLine (t, midy, t, y);
g.fillOval (t - Clazz.doubleToInt (dotSize / 2), y - Clazz.doubleToInt (dotSize / 2), dotSize, dotSize);
}
} else if (this.displayChooser.getSelectedIndex () == 1) {
midy = panelHeight + Clazz.doubleToInt (panelHeight / 2);
halfPanel = Clazz.doubleToInt (panelHeight / 2);
ymult = .75 * halfPanel;
for (i = -1; i <= 1; i++) {
g.setColor ((i == 0) ? this.gray2 : this.gray1);
g.drawLine (0, midy + (i * Clazz.doubleToInt (ymult)), this.winSize.width, midy + (i * Clazz.doubleToInt (ymult)));
}
g.setColor (this.gray2);
g.drawLine (Clazz.doubleToInt (this.winSize.width / 2), midy - Clazz.doubleToInt (ymult), Clazz.doubleToInt (this.winSize.width / 2), midy + Clazz.doubleToInt (ymult));
ox = -1;
var oy2 = -1;
var subsamples = 4;
for (i = 0; i != this.sampleCount * subsamples + 1; i++) {
var x = Clazz.doubleToInt (this.winSize.width * i / (subsamples * this.sampleCount));
var dy1 = 0;
var dy2 = 0;
var j;
var stepi = this.step * i / subsamples;
for (j = 1; j != this.maxTerms; j++) {
if (magcoefdisp[j] == 0) continue;
var stepij = stepi * j;
var dp = magcoefdisp[j] * .5;
var phase = phasecoefdisp[j];
dy1 += dp * java.lang.Math.sin (stepij + phase);
dy2 += dp * java.lang.Math.sin (stepij - phase);
}
var y1 = midy - Clazz.doubleToInt (ymult * dy1);
var y2 = midy - Clazz.doubleToInt (ymult * dy2);
if (ox != -1) {
g.setColor (java.awt.Color.cyan);
g.drawLine (ox, oy, x, y1);
g.setColor (java.awt.Color.green);
g.drawLine (ox, oy2, x, y2);
}ox = x;
oy = y1;
oy2 = y2;
}
} else if (this.displayChooser.getSelectedIndex () == 3) {
var sqw = Clazz.doubleToInt ((this.winSize.width - 25) / 3);
var sqh = sqw;
var y = panelHeight + Clazz.doubleToInt ((panelHeight - sqh) / 2);
dotSize = 5;
for (i = 1; i <= 3; i++) {
g.setColor (this.gray2);
var leftX = (sqw + 10) * (i - 1);
var centerX = leftX + Clazz.doubleToInt (sqw / 2);
var centerY = y + Clazz.doubleToInt (sqh / 2);
g.drawLine (leftX, centerY, leftX + sqw, centerY);
g.drawLine (centerX, y, centerX, y + sqh);
g.setColor (this.gray1);
g.drawOval (centerX - Clazz.doubleToInt (sqw / 2), centerY - Clazz.doubleToInt (sqh / 2), sqw, sqh);
g.setColor (i == this.selectedCoef ? java.awt.Color.yellow : java.awt.Color.white);
g.drawRect (leftX, y, sqw, sqh);
var getFx = (this.forceApplied || this.forceCheck.getState ());
var ax = Clazz.doubleToInt (phasecoefcosdisp[i] * magcoefdisp[i] * sqw * .5);
var ay = Clazz.doubleToInt (java.lang.Math.sin (phasecoefdisp[i]) * magcoefdisp[i] * sqh * .5);
var fx = (getFx) ? (Clazz.doubleToInt (this.forcebasiscoef[i] * sqw * .5)) : 0;
g.drawLine (centerX + fx, centerY, centerX + ax, centerY - ay);
g.fillOval (centerX + ax - Clazz.doubleToInt (dotSize / 2), centerY - ay - Clazz.doubleToInt (dotSize / 2), dotSize, dotSize);
}
} else if (this.displayChooser.getSelectedIndex () == 4) {
var sqw = Clazz.doubleToInt ((this.winSize.width - 25) / 3);
var sqh = Clazz.doubleToInt (sqw / 3.141592653589793);
var topY = panelHeight;
var leftX = 0;
for (i = 1; i < this.sampleCount; i++) {
if (!(magcoefdisp[i] > .06 || magcoefdisp[i] < -0.06)) continue;
g.setColor (this.gray2);
var centerX = leftX + Clazz.doubleToInt (sqw / 2);
var centerY = topY + Clazz.doubleToInt (sqh / 2);
g.drawLine (leftX, centerY, leftX + sqw, centerY);
g.drawLine (centerX, topY, centerX, topY + sqh);
g.setColor (i == this.selectedCoef ? java.awt.Color.yellow : java.awt.Color.white);
g.drawRect (leftX, topY, sqw, sqh);
ox = -1;
ymult = sqh * .5 * magcoefdisp[i];
var j;
for (j = 0; j != this.sampleCount + 1; j++) {
var x = leftX + Clazz.doubleToInt (sqw * j / this.sampleCount);
var dy = this.sinTable[j][i] * phasecoefcosdisp[i];
var y = centerY - Clazz.doubleToInt (ymult * dy);
if (ox != -1) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}
leftX += sqw + 10;
if (leftX + sqw > this.winSize.width) {
leftX = 0;
topY += sqh + 10;
if (topY + sqh > panelHeight * 2) break;
}}
}realg.drawImage (this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState () && !allQuiet) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "getTermWidth", 
function () {
var termWidth = Clazz.doubleToInt (this.winSize.width / this.maxTerms);
if (termWidth < 2) termWidth = 2;
var maxTermWidth = Clazz.doubleToInt (this.winSize.width / 30);
if (termWidth > maxTermWidth) termWidth = maxTermWidth;
termWidth &= -2;
return termWidth;
});
Clazz.defineMethod (c$, "getVelocities", 
function () {
var k;
var j;
for (j = 0; j != this.sampleCount; j++) {
var dy = 0;
for (k = 0; k != this.sampleCount; k++) dy += this.magcoef[k] * this.sinTable[j][k] * java.lang.Math.sin (this.phasecoef[k]) * this.omega[k];

this.funci[j] = -dy;
}
});
Clazz.defineMethod (c$, "setForce", 
function () {
var oldfreq = this.forceBarValue * this.omega[1] / 20.0;
this.forceBarValue = this.forceBar.getValue ();
var newfreq = this.forceBarValue * this.omega[1] / 20.0;
var adj = newfreq - oldfreq;
this.forceTimeZero = this.t - oldfreq * (this.t - this.forceTimeZero) / newfreq;
});
Clazz.defineMethod (c$, "doForce", 
function () {
var freq = this.forceBar.getValue () * this.omega[1] / 20.0;
this.forceMag = java.lang.Math.cos ((this.t - this.forceTimeZero) * freq) * .06;
if (this.forceBar.getValue () == 1) this.forceMag *= 2;
this.applyForce (Clazz.doubleToInt (this.maxTerms / 2), this.forceMag);
});
Clazz.defineMethod (c$, "doTouch", 
function () {
var x = Clazz.doubleToInt (this.sampleCount / 2);
var lim = .1;
var val = this.func[x];
var force = 0;
if (val > lim) force = -(val - lim);
 else if (val < -lim) force = -(val + lim);
 else return;
var y;
for (y = 1; y != this.maxTerms; y++) {
var coef = 0;
for (var j = 1; j != this.sampleCount; j++) {
var f = (j <= x) ? force * j / x : force * (this.sampleCount - j) / (this.sampleCount - x);
coef += this.sinTable[j][y] * f;
}
coef *= 2.0 / this.sampleCount;
var ph = this.phasecoefadj[y] + this.omega[y] * this.t;
var a = this.magcoef[y] * java.lang.Math.cos (ph);
var b = this.magcoef[y] * java.lang.Math.sin (ph);
a += coef;
var r = java.lang.Math.sqrt (a * a + b * b);
this.magcoef[y] = r;
var ph2 = java.lang.Math.atan2 (b, a);
this.phasecoefadj[y] += ph2 - ph;
}
});
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
this.editFunc (x, y);
break;
}
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "editMag", 
function (x, y) {
if (this.selectedCoef == -1) return;
var panelHeight = this.getPanelHeight ();
var ymult = .6 * panelHeight / 2;
var midy = this.magnitudesY + (Clazz.doubleToInt (panelHeight / 2)) + Clazz.doubleToInt (Clazz.doubleToInt (ymult) / 2);
var coef = -(y - midy) / ymult;
coef = this.unlogcoef (coef);
if (coef < -1) coef = -1;
if (coef > 1) coef = 1;
if (this.magcoef[this.selectedCoef] == coef) return;
this.magcoef[this.selectedCoef] = coef;
this.updateSound ();
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "editFunc", 
function (x, y) {
if (this.modeChooser.getSelectedIndex () == 0) {
this.editFuncPluck (x, y);
return;
}if (this.modeChooser.getSelectedIndex () == 997) {
this.editFuncTouch (x, y);
return;
}if (this.modeChooser.getSelectedIndex () == 999) {
this.editFuncBow (x, y);
return;
}if (this.modeChooser.getSelectedIndex () == 998) {
this.forceCheck.setState (false);
this.editFuncForce (x, y);
return;
}if (this.dragX == x) {
this.editFuncPoint (x, y);
this.dragY = y;
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
}}, "~N,~N");
Clazz.defineMethod (c$, "editFuncTouch", 
function (xx, yy) {
this.dragging = false;
var panelHeight = this.getPanelHeight ();
var midy = Clazz.doubleToInt (panelHeight / 2);
var halfPanel = Clazz.doubleToInt (panelHeight / 2);
var periodWidth = this.winSize.width;
var ymult = .75 * halfPanel;
var x = Clazz.doubleToInt (xx * this.sampleCount / periodWidth);
var val = (midy - yy) / ymult;
if (val > 1) val = 1;
if (val < -1) val = -1;
if (x < 1 || x >= this.sampleCount) return;
var y;
for (y = 1; y != this.maxTerms; y++) {
var coef1 = this.sinTable[x][y];
if (coef1 < 0) coef1 = -coef1;
var coef = this.magcoef[y] * coef1;
if (coef < 0) coef = -coef;
var f = .02;
if (coef < f) continue;
var sign = (this.magcoef[y] < 0) ? -1 : 1;
this.magcoef[y] = sign * f / coef1;
}
}, "~N,~N");
Clazz.defineMethod (c$, "editFuncForce", 
function (xx, yy) {
this.dragging = false;
var panelHeight = this.getPanelHeight ();
var midy = Clazz.doubleToInt (panelHeight / 2);
var halfPanel = Clazz.doubleToInt (panelHeight / 2);
var periodWidth = this.winSize.width;
var ymult = .75 * halfPanel;
var x = Clazz.doubleToInt (xx * this.sampleCount / periodWidth);
if (x < 1 || x >= this.sampleCount) return;
var val = (midy - yy) / ymult;
if (val > 1) val = 1;
if (val < -1) val = -1;
this.soundCheck.setState (false);
this.applyForce (x, val);
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "applyForce", 
function (x, val) {
var y;
for (y = 1; y != this.maxTerms; y++) {
var coef = 0;
for (var j = 1; j != this.sampleCount; j++) {
var f = (j <= x) ? val * j / x : val * (this.sampleCount - j) / (this.sampleCount - x);
coef += this.sinTable[j][y] * f;
}
coef *= 2.0 / this.sampleCount;
var ph = this.phasecoefadj[y] + this.omega[y] * this.t;
var a = this.magcoef[y] * this.phasecoefcos[y];
var b = this.magcoef[y] * java.lang.Math.sin (ph);
if (this.forceApplied) a += this.forcebasiscoef[y];
a -= coef;
var r = java.lang.Math.sqrt (a * a + b * b);
if (r > 2) r = 2;
this.magcoef[y] = r;
var ph2 = java.lang.Math.atan2 (b, a);
this.phasecoefadj[y] += ph2 - ph;
this.forcebasiscoef[y] = coef;
}
this.forceApplied = true;
}, "~N,~N");
Clazz.defineMethod (c$, "forceAppliedOff", 
function () {
if (!this.forceApplied) return;
this.forceApplied = false;
for (var i = 1; i < this.maxTerms; i++) {
var ph = this.phasecoefadj[i] + this.omega[i] * this.t;
var a = this.magcoef[i] * java.lang.Math.cos (ph);
var b = this.magcoef[i] * java.lang.Math.sin (ph);
a += this.forcebasiscoef[i];
var r = java.lang.Math.sqrt (a * a + b * b);
this.magcoef[i] = r;
var ph2 = java.lang.Math.atan2 (b, a);
this.phasecoefadj[i] += ph2 - ph;
}
});
Clazz.defineMethod (c$, "editFuncBow", 
function (xx, yy) {
this.dragging = false;
this.bowing = true;
this.dragX = xx;
this.dragY = yy;
this.bowCaught = true;
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "doBow", 
function () {
if (!this.bowCaught) return;
var panelHeight = this.getPanelHeight ();
var midy = Clazz.doubleToInt (panelHeight / 2);
var halfPanel = Clazz.doubleToInt (panelHeight / 2);
var periodWidth = this.winSize.width;
var ymult = .75 * halfPanel;
var x = Clazz.doubleToInt (this.dragX * this.sampleCount / periodWidth);
var val = (midy - this.dragY) / ymult;
if (val < 0) val = -val;
var bowvel = .4;
if (this.bowCaught && this.func[x] > val) {
this.bowCaught = false;
this.forceAppliedOff ();
return;
}var p = this.func[x] + bowvel;
this.applyForce (x, p);
});
Clazz.defineMethod (c$, "logcoef", 
function (x) {
if (!this.logCheck.getState ()) return x;
if (x == 0) return x;
var sign = (x < 0) ? -1 : 1;
var lg = Math.log (x * sign);
lg = 1 + lg * .1;
if (lg < 0) return 0;
return sign * lg;
}, "~N");
Clazz.defineMethod (c$, "unlogcoef", 
function (x) {
if (!this.logCheck.getState ()) return x;
if (x == 0) return x;
var sign = (x < 0) ? -1 : 1;
var ex = Math.exp ((x * sign - 1) * 10);
return ex * sign;
}, "~N");
Clazz.defineMethod (c$, "editFuncPoint", 
function (x, y) {
var panelHeight = this.getPanelHeight ();
var midy = Clazz.doubleToInt (panelHeight / 2);
var halfPanel = Clazz.doubleToInt (panelHeight / 2);
var periodWidth = this.winSize.width;
var ymult = .75 * halfPanel;
var lox = Clazz.doubleToInt (x * this.sampleCount / periodWidth);
var hix = Clazz.doubleToInt (((x + 1) * this.sampleCount - 1) / periodWidth);
var val = (midy - y) / ymult;
if (val > 1) val = 1;
if (val < -1) val = -1;
if (lox < 1) lox = 1;
if (hix >= this.sampleCount) hix = this.sampleCount - 1;
for (; lox <= hix; lox++) {
this.func[lox] = val;
this.funci[lox] = 0;
}
this.func[this.sampleCount] = this.func[0];
this.cv.repaint (this.pause);
if (this.soundCheck.getState () == false) this.transform (false);
}, "~N,~N");
Clazz.defineMethod (c$, "editFuncPluck", 
function (x, y) {
var panelHeight = this.getPanelHeight ();
var midy = Clazz.doubleToInt (panelHeight / 2);
var halfPanel = Clazz.doubleToInt (panelHeight / 2);
var periodWidth = this.winSize.width;
var ymult = .75 * halfPanel;
var ax = Clazz.doubleToInt (x * this.sampleCount / periodWidth);
var val = (midy - y) / ymult;
if (val > 1) val = 1;
if (val < -1) val = -1;
if (ax < 1 || ax >= this.sampleCount) return;
var i;
for (i = 0; i <= ax; i++) this.func[i] = val * i / ax;

var bx = this.sampleCount - ax;
for (i = ax + 1; i < this.sampleCount; i++) this.func[i] = val * (this.sampleCount - i) / bx;

for (i = 0; i <= this.sampleCount; i++) this.funci[i] = 0;

this.func[this.sampleCount] = this.func[0];
this.cv.repaint (this.pause);
if (this.soundCheck.getState () == false) this.transform (false);
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
if (e.getSource () === this.triangleButton) {
this.doTriangle ();
this.cv.repaint ();
}if (e.getSource () === this.sineButton) {
this.doSine ();
this.cv.repaint ();
}if (e.getSource () === this.blankButton) {
this.doBlank ();
this.cv.repaint ();
}if (e.getSource () === this.resonanceButton) {
this.forceBar.setValue (20);
this.setForce ();
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.dampingBar || e.getSource () === this.speedBar) this.setDamping ();
if (e.getSource () === this.loadBar) {
this.setLoadCount ();
this.updateSound ();
}if (e.getSource () === this.forceBar) this.setForce ();
if (e.getSource () === this.tensionBar) {
this.setTension ();
this.updateSound ();
}this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.StringWaveFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "setTension", 
function () {
var oldTension = this.tensionBarValue;
this.tensionBarValue = this.tensionBar.getValue ();
var mult = java.lang.Math.sqrt (oldTension / this.tensionBarValue);
var roottens = java.lang.Math.sqrt (this.tensionBarValue);
for (var i = 1; i != this.maxTerms; i++) {
this.magcoef[i] *= mult;
var oldomegat = this.omega[i] * this.t;
this.omega[i] = 5 * roottens * java.lang.Math.sin (i * (3.14159265 / (2 * (this.maxTerms + 1))));
var newomegat = this.omega[i] * this.t;
this.phasecoefadj[i] = (this.phasecoefadj[i] + oldomegat - newomegat) % (6.283185307179586);
}
});
Clazz.defineMethod (c$, "setLoadCount", 
function () {
this.sampleCount = this.maxTerms = this.loadBar.getValue ();
this.step = 3.141592653589793 / this.sampleCount;
var x;
var y;
this.sinTable =  Clazz.newDoubleArray (this.sampleCount + 1, this.maxTerms, 0);
for (y = 1; y != this.maxTerms; y++) for (x = 0; x != this.sampleCount + 1; x++) this.sinTable[x][y] = java.lang.Math.sin (this.step * x * y);


this.omega =  Clazz.newDoubleArray (this.maxTerms, 0);
var i;
for (i = 1; i != this.maxTerms; i++) this.omega[i] = java.lang.Math.sin (i * (3.14159265 / (2 * (this.maxTerms + 1))));

var mult = 1 / this.omega[1];
for (i = 1; i != this.maxTerms; i++) this.omega[i] *= mult;

this.setDamping ();
});
Clazz.defineMethod (c$, "setDamping", 
function () {
var i;
var damper = java.lang.Math.exp (Clazz.doubleToInt (this.dampingBar.getValue () / 40) - 8);
if (this.dampingBar.getValue () <= 2) damper = 0;
this.dampcoef = -damper;
});
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
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
var panelHeight = this.getPanelHeight ();
var oldCoef = this.selectedCoef;
this.selectedCoef = -1;
this.selection = 0;
if (y < panelHeight) this.selection = 1;
if (y >= this.magnitudesY && y < this.magnitudesY + panelHeight) {
var termWidth = this.getTermWidth ();
this.selectedCoef = Clazz.doubleToInt (x / termWidth) + 1;
if (this.selectedCoef >= this.maxTerms) this.selectedCoef = -1;
if (this.selectedCoef != -1) this.selection = 2;
}if (this.selectedCoef != oldCoef) this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
if (e.getClickCount () == 2 && this.selectedCoef != -1) {
var i;
for (i = 1; i != this.maxTerms; i++) if (this.selectedCoef != i) this.magcoef[i] = 0;

this.magcoef[this.selectedCoef] = 1;
this.updateSound ();
this.cv.repaint (this.pause);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
if (!this.dragging && this.selectedCoef != -1) {
this.selectedCoef = -1;
this.cv.repaint (this.pause);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
if (this.selection == 1) this.getVelocities ();
this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
if (this.forceApplied || this.bowing) {
this.bowing = this.bowCaught = false;
this.forceAppliedOff ();
} else if (this.dragging && this.selection == 1) this.transform (false);
this.dragging = false;
this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (e.getItemSelectable () === this.stoppedCheck) {
this.cv.repaint (this.pause);
return;
}if (e.getItemSelectable () === this.forceCheck) {
this.forceTimeZero = this.t;
this.cv.repaint (this.pause);
this.forceAppliedOff ();
this.soundCheck.setState (false);
return;
}if (e.getItemSelectable () === this.soundCheck && this.soundCheck.getState () && this.playThread == null) {
this.playThread = Clazz.innerTypeInstance (test.falstad.StringWaveFrame.PlayThread, this, null);
this.speedBar.setValue (150);
this.dampingBar.setValue (100);
this.setDamping ();
{
this.playThread.run();
}}if (e.getItemSelectable () === this.displayChooser) this.cv.repaint (this.pause);
}, "java.awt.event.ItemEvent");
c$.$StringWaveFrame$PlayThread$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.changed = false;
this.rate = 22050;
this.write = null;
this.line = null;
this.playFFT = null;
this.playfunc = null;
this.b = null;
this.offset = 0;
this.dampCount = 0;
this.playSampleCount = 0;
this.mx = 0;
this.failed = false;
Clazz.instantialize (this, arguments);
}, test.falstad.StringWaveFrame, "PlayThread", swingjs.JSThread);
Clazz.defineMethod (c$, "soundChanged", 
function () {
this.changed = true;
});
Clazz.overrideMethod (c$, "myInit", 
function () {
try {
var a =  new javax.sound.sampled.AudioFormat (22050, 16, 1, true, true);
var b =  new javax.sound.sampled.DataLine.Info (javax.sound.sampled.SourceDataLine, a);
this.line = javax.sound.sampled.AudioSystem.getLine (b);
this.line.open (a, 4096);
this.line.start ();
var c =  Clazz.newByteArray (1, 0);
this.write = this.line.getClass ().getMethod ("write", [c.getClass (), Number, Number]);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
return false;
} else {
throw e;
}
}
this.playSampleCount = 16384;
this.playFFT = Clazz.innerTypeInstance (test.falstad.StringWaveFrame.FFT, this, null, this.playSampleCount);
this.b =  Clazz.newByteArray (4096, 0);
this.offset = 0;
this.dampCount = 0;
return true;
});
Clazz.overrideMethod (c$, "isLooping", 
function () {
return !this.failed && this.b$["test.falstad.StringWaveFrame"].soundCheck.getState () && test.falstad.StringWave.ogf != null;
});
Clazz.overrideMethod (c$, "myLoop", 
function () {
var a = this.b$["test.falstad.StringWaveFrame"].dampcoef * 1e-2;
if (this.playfunc == null || this.changed) {
this.line.flush ();
this.playfunc =  Clazz.newDoubleArray (this.playSampleCount * 2, 0);
var b;
var c = 2 * 3.141592653589793 * 20.0 * java.lang.Math.sqrt (this.b$["test.falstad.StringWaveFrame"].tensionBarValue);
c /= this.b$["test.falstad.StringWaveFrame"].omega[1];
this.changed = false;
this.mx = .2;
for (b = 1; b != this.b$["test.falstad.StringWaveFrame"].maxTerms; b++) {
var d = Clazz.doubleToInt (c * this.b$["test.falstad.StringWaveFrame"].omega[b]);
if (d >= this.playSampleCount) break;
this.playfunc[d] = this.b$["test.falstad.StringWaveFrame"].magcoef[b];
}
this.playFFT.transform (this.playfunc, true);
for (b = 0; b != this.playSampleCount; b++) {
var d = this.playfunc[b * 2] * Math.exp (a * b);
if (d > this.mx) this.mx = d;
if (d < -this.mx) this.mx = -d;
}
this.dampCount = this.offset = 0;
}var b = 32767 / this.mx;
var c = Clazz.doubleToInt (this.b.length / 2);
var d;
for (d = 0; d != c; d++) {
var e = this.playfunc[(d + this.offset) * 2] * b * Math.exp (a * this.dampCount++);
var f = Clazz.doubleToShort (e);
this.b[d * 2] = (Clazz.doubleToInt (f / 256));
this.b[d * 2 + 1] = (f & 255);
}
this.offset += c;
if (this.offset == Clazz.doubleToInt (this.playfunc.length / 2)) this.offset = 0;
try {
this.line.write (this.b, 0, this.b.length);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
this.failed = true;
return false;
} else {
throw e;
}
}
return true;
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
c$.$StringWaveFrame$FFT$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.wtabf = null;
this.wtabi = null;
this.size = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.StringWaveFrame, "FFT");
Clazz.makeConstructor (c$, 
function (a) {
this.size = a;
if ((this.size & (this.size - 1)) != 0) System.out.println ("size must be power of two!");
this.calcWTable ();
}, "~N");
Clazz.defineMethod (c$, "calcWTable", 
function () {
this.wtabf =  Clazz.newDoubleArray (this.size, 0);
this.wtabi =  Clazz.newDoubleArray (this.size, 0);
var a;
for (a = 0; a != this.size; a += 2) {
var b = 3.1415926535;
var c = b * a / this.size;
this.wtabf[a] = Math.cos (c);
this.wtabf[a + 1] = Math.sin (c);
this.wtabi[a] = this.wtabf[a];
this.wtabi[a + 1] = -this.wtabf[a + 1];
}
});
Clazz.defineMethod (c$, "transform", 
function (a, b) {
var c;
var d = 0;
var e = this.size * 2;
if ((this.size & (this.size - 1)) != 0) System.out.println ("size must be power of two!");
var f;
var g;
for (c = 0; c != e; c += 2) {
if (c > d) {
f = a[c];
a[c] = a[d];
a[d] = f;
f = a[c + 1];
a[c + 1] = a[d + 1];
a[d + 1] = f;
}g = this.size;
while ((g & d) != 0) {
d &= ~g;
g >>= 1;
}
d |= g;
}
var h = this.size << 1;
var i = (b) ? this.wtabi : this.wtabf;
var j;
var k;
var l;
var m;
var n;
var o;
var p;
var q;
var r;
var s;
var t;
var u;
for (c = 0; c != e; c += 4) {
p = a[c];
q = a[c + 1];
r = a[c + 2];
s = a[c + 3];
a[c] = p + r;
a[c + 1] = q + s;
a[c + 2] = p - r;
a[c + 3] = q - s;
}
h >>= 1;
var v = (b) ? -1 : 1;
for (c = 0; c != e; c += 8) {
p = a[c];
q = a[c + 1];
r = a[c + 4];
s = a[c + 5];
a[c] = p + r;
a[c + 1] = q + s;
a[c + 4] = p - r;
a[c + 5] = q - s;
p = a[c + 2];
q = a[c + 3];
r = a[c + 6] * v;
s = a[c + 7] * v;
a[c + 2] = p - s;
a[c + 3] = q + r;
a[c + 6] = p + s;
a[c + 7] = q - r;
}
h >>= 1;
for (j = 16; j <= e; j <<= 1) {
k = j >> 1;
h >>= 1;
for (c = 0; c != 1000; c++) ;
for (c = 0; c < e; c += j) {
l = 0;
for (d = c; d != c + k; d += 2, l += h) {
n = i[l];
o = i[l + 1];
p = a[d];
q = a[d + 1];
m = d + k;
r = a[m];
s = a[m + 1];
t = r * n - s * o;
u = r * o + s * n;
a[d] = p + t;
a[d + 1] = q + u;
a[m] = p - t;
a[m + 1] = q - u;
}
}
}
}, "~A,~B");
c$ = Clazz.p0p ();
};
c$.$StringWaveFrame$StringWaveCanvas$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad.StringWaveFrame, "StringWaveCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.StringWaveFrame.StringWaveCanvas, []);
this.pg = a;
}, "test.falstad.StringWaveFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (a) {
this.pg.updateStringWave (a);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (a) {
this.pg.updateStringWave (a);
}, "java.awt.Graphics");
c$ = Clazz.p0p ();
};
c$.$StringWaveFrame$StringWaveLayout$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.StringWaveFrame, "StringWaveLayout", null, java.awt.LayoutManager);
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
var b = 0;
var c;
for (c = 1; c < a.getComponentCount (); c++) {
var d = a.getComponent (c);
if (d.isVisible ()) {
var e = d.getPreferredSize ();
if (e.width > b) b = e.width;
}}
var d = a.insets ();
var e = a.size ().width - d.left - d.right;
var f = e - b;
var g = a.size ().height - (d.top + d.bottom);
a.getComponent (0).move (d.left, d.top);
a.getComponent (0).resize (f, g);
f += d.left;
var h = d.top;
for (c = 1; c < a.getComponentCount (); c++) {
var i = a.getComponent (c);
if (i.isVisible ()) {
var j = i.getPreferredSize ();
if (Clazz.instanceOf (i, swingjs.awt.Scrollbar)) j.width = b;
if (Clazz.instanceOf (i, swingjs.awt.Label)) {
h += Clazz.doubleToInt (j.height / 5);
j.width = b;
}i.move (f, h);
i.resize (j.width, j.height);
h += j.height;
}}
}, "java.awt.Container");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"epsilon", .00001,
"epsilon2", .003,
"pi", 3.14159265358979323846,
"SEL_NONE", 0,
"SEL_FUNC", 1,
"SEL_MAG", 2,
"MODE_PLUCK", 0,
"MODE_SHAPE", 1,
"MODE_TOUCH", 997,
"MODE_FORCE", 998,
"MODE_BOW", 999,
"DISP_PHASE", 0,
"DISP_LEFTRIGHT", 1,
"DISP_PHASECOS", 2,
"DISP_PHASORS", 3,
"DISP_MODES", 4);
});
