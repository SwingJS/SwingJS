Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame", "java.awt.Color"], ["test.falstad.BarWaves", "$.BarWavesFrame"], ["java.awt.Dimension", "java.util.Random", "$.Vector", "sun.audio.AudioData", "$.AudioDataStream", "$.AudioPlayer", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.started = false;
Clazz.instantialize (this, arguments);
}, test.falstad, "BarWaves", swingjs.awt.Applet);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.BarWaves.mf != null) test.falstad.BarWaves.mf.dispose ();
test.falstad.BarWaves.mf = null;
});
Clazz.overrideMethod (c$, "start", 
function () {
test.falstad.BarWaves.mf =  new test.falstad.BarWavesFrame (this);
test.falstad.BarWaves.mf.init ();
test.falstad.BarWaves.mf.handleResize ();
System.out.println ("init");
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.BarWaves.mf =  new test.falstad.BarWavesFrame (null);
test.falstad.BarWaves.mf.init ();
}, "~A");
Clazz.overrideMethod (c$, "destroy", 
function () {
if (test.falstad.BarWaves.mf != null) test.falstad.BarWaves.mf.dispose ();
test.falstad.BarWaves.mf = null;
});
Clazz.defineMethod (c$, "paint", 
function (g) {
System.out.println (test.falstad.BarWaves.mf.cv.getSize ());
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.BarWaves.mf == null) s = "Applet is finished.";
 else if (test.falstad.BarWaves.mf.useFrame) test.falstad.BarWaves.mf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.BarWaves, "paint", [g]);
}, "java.awt.Graphics");
Clazz.defineStatics (c$,
"mf", null);
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.maxTerms = 50;
this.modeCount = 0;
this.maxMaxTerms = 90;
this.sampleCount = 0;
this.modeTable = null;
this.modeNorms = null;
this.sineButton = null;
this.blankButton = null;
this.stoppedCheck = null;
this.soundCheck = null;
this.modeChooser = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.displayChooser = null;
this.dampingBar = null;
this.speedBar = null;
this.loadBar = null;
this.baseFreqBar = null;
this.stiffnessBar = null;
this.magcoef = null;
this.dampcoef = null;
this.phasecoef = null;
this.phasecoefcos = null;
this.phasecoefadj = null;
this.omega = null;
this.step = 0;
this.func = null;
this.funci = null;
this.thickness = null;
this.xpoints = null;
this.ypoints = null;
this.selectedCoef = 0;
this.magnitudesY = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.dragging = false;
this.t = 0;
this.pause = 0;
this.gray1 = null;
this.gray2 = null;
this.main = null;
this.useFrame = false;
this.showControls = false;
this.cv = null;
this.applet = null;
this.shown = false;
this.logep2 = 0;
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.Setup")) {
test.falstad.BarWavesFrame.$BarWavesFrame$Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.FreeBarSetup")) {
test.falstad.BarWavesFrame.$BarWavesFrame$FreeBarSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.HingedBarSetup")) {
test.falstad.BarWavesFrame.$BarWavesFrame$HingedBarSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.ClampedBarSetup")) {
test.falstad.BarWavesFrame.$BarWavesFrame$ClampedBarSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.ClampedFreeBarSetup")) {
test.falstad.BarWavesFrame.$BarWavesFrame$ClampedFreeBarSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.HingedClampedBarSetup")) {
test.falstad.BarWavesFrame.$BarWavesFrame$HingedClampedBarSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.StringSetup")) {
test.falstad.BarWavesFrame.$BarWavesFrame$StringSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.String1FreeSetup")) {
test.falstad.BarWavesFrame.$BarWavesFrame$String1FreeSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.String2FreeSetup")) {
test.falstad.BarWavesFrame.$BarWavesFrame$String2FreeSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.StiffStringSetup")) {
test.falstad.BarWavesFrame.$BarWavesFrame$StiffStringSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.StiffStringClampedSetup")) {
test.falstad.BarWavesFrame.$BarWavesFrame$StiffStringClampedSetup$ ();
}
this.sndmin = 0;
this.sndmax = 0;
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.BarWavesCanvas")) {
test.falstad.BarWavesFrame.$BarWavesFrame$BarWavesCanvas$ ();
}
if (!Clazz.isClassDefined ("test.falstad.BarWavesFrame.BarWavesLayout")) {
test.falstad.BarWavesFrame.$BarWavesFrame$BarWavesLayout$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "BarWavesFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.prepareFields (c$, function () {
this.gray1 =  new java.awt.Color (76, 76, 76);
this.gray2 =  new java.awt.Color (127, 127, 127);
});
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "BarWaves by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.BarWavesFrame, ["Bar Waves Applet"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.BarWaves");
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
this.setupList =  new java.util.Vector ();
var s = Clazz.innerTypeInstance (test.falstad.BarWavesFrame.FreeBarSetup, this, null);
while (s != null) {
this.setupList.addElement (s);
s = s.createNext ();
}
this.selectedCoef = -1;
this.main.setLayout (Clazz.innerTypeInstance (test.falstad.BarWavesFrame.BarWavesLayout, this, null));
this.cv = Clazz.innerTypeInstance (test.falstad.BarWavesFrame.BarWavesCanvas, this, null, this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.setupChooser =  new swingjs.awt.Choice ();
var i;
for (i = 0; i != this.setupList.size (); i++) this.setupChooser.add ("Setup: " + (this.setupList.elementAt (i)).getName ());

this.setup = this.setupList.elementAt (0);
this.setupChooser.addItemListener (this);
this.main.add (this.setupChooser);
this.main.add (this.sineButton =  new swingjs.awt.Button ("Fundamental"));
this.sineButton.addActionListener (this);
this.main.add (this.blankButton =  new swingjs.awt.Button ("Clear"));
this.blankButton.addActionListener (this);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
this.main.add (this.stoppedCheck);
this.soundCheck =  new swingjs.awt.Checkbox ("Sound", false);
this.soundCheck.addItemListener (this);
this.main.add (this.soundCheck);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Shape bar");
this.modeChooser.add ("Mouse = Apply static force");
this.modeChooser.addItemListener (this);
this.main.add (this.modeChooser);
this.displayChooser =  new swingjs.awt.Choice ();
this.displayChooser.add ("Display Phases");
this.displayChooser.add ("Display Phase Cosines");
this.displayChooser.add ("Display Modes");
this.displayChooser.addItemListener (this);
this.main.add (this.displayChooser);
this.main.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.main.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 166, 1, 24, 300));
this.speedBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Damping", 0));
this.main.add (this.dampingBar =  new swingjs.awt.Scrollbar (0, 10, 1, 0, 400));
this.dampingBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Resolution", 0));
this.main.add (this.loadBar =  new swingjs.awt.Scrollbar (0, this.maxTerms, 1, 40, this.maxMaxTerms));
this.loadBar.addAdjustmentListener (this);
this.setLoadCount ();
this.main.add ( new swingjs.awt.Label ("Base Frequency", 0));
this.main.add (this.baseFreqBar =  new swingjs.awt.Scrollbar (0, 105, 12, 30, 168));
this.baseFreqBar.addAdjustmentListener (this);
this.baseFreqBar.disable ();
this.main.add ( new swingjs.awt.Label ("String Stiffness", 0));
this.main.add (this.stiffnessBar =  new swingjs.awt.Scrollbar (0, 10, 1, 0, 100));
this.stiffnessBar.addAdjustmentListener (this);
this.stiffnessBar.disable ();
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
this.func =  Clazz.newDoubleArray (this.maxMaxTerms + 1, 0);
this.funci =  Clazz.newDoubleArray (this.maxMaxTerms + 1, 0);
this.xpoints =  Clazz.newIntArray (4, 0);
this.ypoints =  Clazz.newIntArray (4, 0);
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
this.doFundamental ();
});
Clazz.defineMethod (c$, "triggerShow", 
function () {
if (!this.shown) this.setVisible (true);
this.shown = true;
});
Clazz.defineMethod (c$, "handleResize", 
function () {
var d = this.winSize = this.cv.getSize ();
System.out.println (d);
if (this.winSize.width == 0) return;
this.dbimage = this.cv.createImage (d.width, d.height);
});
Clazz.defineMethod (c$, "doFundamental", 
function () {
this.doBlank ();
this.magcoef[0] = 1;
if (this.soundCheck.getState ()) this.doPlay ();
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
for (y = 0; y != this.modeCount; y++) {
var a = 0;
var b = 0;
for (x = 1; x != this.sampleCount; x++) {
a += this.modeTable[x][y] * this.func[x];
b -= this.modeTable[x][y] * this.funci[x];
}
a /= this.modeNorms[y];
b /= this.omega[y] * this.modeNorms[y];
if (a < 1.0E-7 && a > -1.0E-7) a = 0;
if (b < 1.0E-7 && b > -1.0E-7) b = 0;
if (novel) b = 0;
var r = java.lang.Math.sqrt (a * a + b * b);
this.magcoef[y] = r;
var ph2 = java.lang.Math.atan2 (b, a);
this.phasecoefadj[y] = ph2;
this.phasecoef[y] = ph2;
}
}, "~B");
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
Clazz.defineMethod (c$, "updateBarWaves", 
function (realg) {
if (this.winSize == null || this.winSize.width == 0 || this.dbimage == null) return;
var g = this.dbimage.getGraphics ();
var allQuiet = true;
if (!this.stoppedCheck.getState ()) {
var val = this.speedBar.getValue () - 100;
var tadd = java.lang.Math.exp (val / 20.) * (0.002);
tadd *= 1 + this.getrand (300) * (.00191171);
this.t += tadd;
}g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
var i;
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
var sampStart = (this.setup.leftBoundary () == 1) ? 1 : 0;
var sampEnd = this.sampleCount - ((this.setup.rightBoundary () == 1) ? 1 : 0);
if (this.dragging && this.selection == 1) {
g.setColor (java.awt.Color.cyan);
allQuiet = true;
for (i = sampStart; i <= sampEnd; i++) {
var x = Clazz.doubleToInt (this.winSize.width * i / this.sampleCount);
var y = midy - Clazz.doubleToInt (ymult * this.func[i]);
this.drawBarPiece (g, x, y, i, sampStart);
}
}if (!this.stoppedCheck.getState () && !this.dragging) {
for (i = 0; i != this.modeCount; i++) this.magcoef[i] *= this.dampcoef[i];

}var magcoefdisp = this.magcoef;
var phasecoefdisp = this.phasecoef;
var phasecoefcosdisp = this.phasecoefcos;
if (!(this.dragging && this.selection == 1)) {
g.setColor (java.awt.Color.white);
var j;
for (j = 0; j != this.modeCount; j++) {
if (this.magcoef[j] < 1.0E-7 && this.magcoef[j] > -1.0E-7) {
this.magcoef[j] = this.phasecoef[j] = this.phasecoefadj[j] = 0;
continue;
}allQuiet = false;
this.phasecoef[j] = (this.omega[j] * this.t + this.phasecoefadj[j]) % (6.283185307179586);
if (this.phasecoef[j] > 3.141592653589793) this.phasecoef[j] -= 6.283185307179586;
 else if (this.phasecoef[j] < -3.141592653589793) this.phasecoef[j] += 6.283185307179586;
this.phasecoefcos[j] = java.lang.Math.cos (this.phasecoef[j]);
}
for (i = sampStart; i <= sampEnd; i++) {
var x = Clazz.doubleToInt (this.winSize.width * i / this.sampleCount);
var dy = 0;
for (j = 0; j != this.modeCount; j++) dy += magcoefdisp[j] * this.modeTable[i][j] * phasecoefcosdisp[j];

this.func[i] = dy;
var y = midy - Clazz.doubleToInt (ymult * dy);
this.drawBarPiece (g, x, y, i, sampStart);
}
if (this.setup.getThickness () == 0) {
if (this.setup.leftBoundary () == 1) this.drawPin (g, 1, midy, ymult);
if (this.setup.rightBoundary () == 1) this.drawPin (g, this.sampleCount - 1, midy, ymult);
}}if (this.selectedCoef != -1 && !this.dragging && (magcoefdisp[this.selectedCoef] > .04 || magcoefdisp[this.selectedCoef] < -0.04)) {
g.setColor (java.awt.Color.yellow);
ymult *= magcoefdisp[this.selectedCoef];
for (i = sampStart; i <= sampEnd; i++) {
var x = Clazz.doubleToInt (this.winSize.width * i / this.sampleCount);
var dy = this.modeTable[i][this.selectedCoef] * phasecoefcosdisp[this.selectedCoef];
var y = midy - Clazz.doubleToInt (ymult * dy);
this.drawBarPiece (g, x, y, i, sampStart);
}
}if (this.selectedCoef != -1) {
var f = this.getFreq (this.selectedCoef);
g.setColor (java.awt.Color.yellow);
this.centerString (g, f + " Hz", panelHeight);
} else if (this.soundCheck.getState ()) {
var f = this.getFreq (0);
g.setColor (java.awt.Color.white);
this.centerString (g, "Fundamental = " + f + " Hz", panelHeight);
}var termWidth = this.getTermWidth ();
ymult = .6 * halfPanel;
g.setColor (java.awt.Color.white);
if (this.displayChooser.getSelectedIndex () == 0 || this.displayChooser.getSelectedIndex () == 1) this.magnitudesY = panelHeight;
 else this.magnitudesY = panelHeight * 2;
midy = this.magnitudesY + (Clazz.doubleToInt (panelHeight / 2)) + Clazz.doubleToInt (Clazz.doubleToInt (ymult) / 2);
g.setColor (this.gray2);
g.drawLine (0, midy, this.winSize.width, midy);
g.setColor (this.gray1);
g.drawLine (0, midy - Clazz.doubleToInt (ymult), this.winSize.width, midy - Clazz.doubleToInt (ymult));
g.drawLine (0, midy + Clazz.doubleToInt (ymult), this.winSize.width, midy + Clazz.doubleToInt (ymult));
g.drawLine (0, midy - Clazz.doubleToInt (Clazz.doubleToInt (ymult) / 4), this.winSize.width, midy - Clazz.doubleToInt (Clazz.doubleToInt (ymult) / 4));
g.drawLine (0, midy + Clazz.doubleToInt (Clazz.doubleToInt (ymult) / 4), this.winSize.width, midy + Clazz.doubleToInt (Clazz.doubleToInt (ymult) / 4));
var dotSize = termWidth - 3;
if (dotSize < 3) dotSize = 3;
for (i = 0; i != this.modeCount; i++) {
var t = termWidth * i + Clazz.doubleToInt (termWidth / 2);
var y = midy - Clazz.doubleToInt (this.logcoef (magcoefdisp[i]) * ymult);
g.setColor (i == this.selectedCoef ? java.awt.Color.yellow : java.awt.Color.white);
g.drawLine (t, midy, t, y);
g.fillOval (t - Clazz.doubleToInt (dotSize / 2), y - Clazz.doubleToInt (dotSize / 2), dotSize, dotSize);
}
if (this.displayChooser.getSelectedIndex () == 0 || this.displayChooser.getSelectedIndex () == 1) {
g.setColor (java.awt.Color.white);
var cosines = this.displayChooser.getSelectedIndex () == 1;
ymult = .75 * halfPanel;
midy = (Clazz.doubleToInt ((panelHeight * 5) / 2));
for (i = -2; i <= 2; i++) {
if (cosines && (i == 1 || i == -1)) continue;
g.setColor ((i == 0) ? this.gray2 : this.gray1);
g.drawLine (0, midy + Clazz.doubleToInt ((i * Clazz.doubleToInt (ymult)) / 2), this.winSize.width, midy + Clazz.doubleToInt ((i * Clazz.doubleToInt (ymult)) / 2));
}
if (!cosines) ymult /= 3.141592653589793;
for (i = 0; i != this.modeCount; i++) {
var t = termWidth * i + Clazz.doubleToInt (termWidth / 2);
var ph = (cosines) ? phasecoefcosdisp[i] : phasecoefdisp[i];
if (this.magcoef[i] > -7.5E-4 && magcoefdisp[i] < 7.5E-4) ph = 0;
var y = midy - Clazz.doubleToInt (ph * ymult);
g.setColor (i == this.selectedCoef ? java.awt.Color.yellow : java.awt.Color.white);
g.drawLine (t, midy, t, y);
g.fillOval (t - Clazz.doubleToInt (dotSize / 2), y - Clazz.doubleToInt (dotSize / 2), dotSize, dotSize);
}
} else if (this.displayChooser.getSelectedIndex () == 2) {
var sqw = Clazz.doubleToInt ((this.winSize.width - 25) / 3);
var sqh = Clazz.doubleToInt (sqw / 3.141592653589793);
var topY = panelHeight;
var leftX = 0;
var ox;
var oy = -1;
for (i = 0; i != this.modeCount; i++) {
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
for (j = sampStart; j <= sampEnd; j++) {
var x = leftX + Clazz.doubleToInt (sqw * j / this.sampleCount);
var dy = this.modeTable[j][i] * phasecoefcosdisp[i];
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
Clazz.defineMethod (c$, "drawPin", 
function (g, pos, midy, ymult) {
var x = Clazz.doubleToInt (this.winSize.width * pos / this.sampleCount);
g.setColor (this.gray2);
g.drawLine (x, Clazz.doubleToInt (midy - ymult), x, Clazz.doubleToInt (midy + ymult));
g.setColor (java.awt.Color.white);
g.fillOval (x - 2, midy - Clazz.doubleToInt (this.func[pos] * ymult) - 2, 5, 5);
}, "java.awt.Graphics,~N,~N,~N");
Clazz.defineMethod (c$, "getTermWidth", 
function () {
var termWidth = Clazz.doubleToInt (this.winSize.width / this.modeCount);
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
for (k = 0; k != this.modeCount; k++) dy += this.magcoef[k] * this.modeTable[j][k] * java.lang.Math.sin (this.phasecoef[k]) * this.omega[k];

this.funci[j] = -dy;
}
});
Clazz.defineMethod (c$, "drawBarPiece", 
function (g, x, y, i, sampStart) {
var thick = this.setup.getThickness ();
this.xpoints[0] = this.xpoints[3];
this.ypoints[0] = this.ypoints[3];
this.xpoints[1] = this.xpoints[2];
this.ypoints[1] = this.ypoints[2];
this.xpoints[2] = x;
this.ypoints[2] = y - thick;
this.xpoints[3] = x;
this.ypoints[3] = y + thick;
if (i != sampStart) {
if (thick == 0) g.drawLine (this.xpoints[0], this.ypoints[0], this.xpoints[2], this.ypoints[2]);
 else g.fillPolygon (this.xpoints, this.ypoints, 4);
}}, "java.awt.Graphics,~N,~N,~N,~N");
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
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "editFunc", 
function (x, y) {
if (this.modeChooser.getSelectedIndex () == 1) {
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
Clazz.defineMethod (c$, "logcoef", 
function (x) {
if (x >= .25 || x <= -0.25) return x;
x *= 4;
var ep2 = 0.003;
var sign = (x < 0) ? -1 : 1;
x *= sign;
if (x < ep2) return 0;
if (this.logep2 == 0) this.logep2 = -java.lang.Math.log (2 * ep2);
return .25 * sign * (java.lang.Math.log (x + ep2) + this.logep2) / this.logep2;
}, "~N");
Clazz.defineMethod (c$, "unlogcoef", 
function (x) {
if (x >= .25 || x <= -0.25) return x;
var ep2 = 0.003;
var sign = (x < 0) ? -1 : 1;
return .25 * sign * (java.lang.Math.exp (4 * x * sign * this.logep2 - this.logep2) - ep2);
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
if (this.modeChooser.getSelectedIndex () == 2) {
this.thickness[lox] = (midy < y) ? (y - midy) * 2 : (midy - y) * 2;
if (this.thickness[lox] == 0) this.thickness[lox] = 1;
} else {
this.func[lox] = val;
this.funci[lox] = 0;
}}
this.func[this.sampleCount] = this.func[0];
this.cv.repaint (this.pause);
if (this.soundCheck.getState () == false) this.transform (false);
}, "~N,~N");
Clazz.defineMethod (c$, "editFuncForce", 
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
var q =  Clazz.newDoubleArray (this.modeCount, 0);
var i;
var j;
for (i = 0; i != this.modeCount; i++) q[i] = this.modeTable[ax][i] / (this.omega[i] * this.omega[i] * this.modeNorms[i]);

for (i = 0; i != this.sampleCount; i++) {
var dy = 0;
for (j = 0; j != this.modeCount; j++) dy += q[j] * this.modeTable[i][j];

this.func[i] = dy;
}
var mult = val / this.func[ax];
for (i = 0; i <= this.sampleCount; i++) {
this.func[i] *= mult;
this.funci[i] = 0;
}
this.cv.repaint (this.pause);
if (this.soundCheck.getState () == false) this.transform (true);
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
this.doFundamental ();
this.cv.repaint ();
}if (e.getSource () === this.blankButton) {
this.doBlank ();
this.cv.repaint ();
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
if (e.getSource () === this.dampingBar || e.getSource () === this.speedBar) this.setDamping ();
if (e.getSource () === this.loadBar) this.setLoadCount ();
if (e.getSource () === this.stiffnessBar) this.genModes ();
this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
if (this.applet == null) this.dispose ();
 else this.applet.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.BarWavesFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "setLoadCount", 
function () {
this.setup = this.setupList.elementAt (this.setupChooser.getSelectedIndex ());
this.sampleCount = this.maxTerms = this.loadBar.getValue ();
this.step = 3.141592653589793 / this.sampleCount;
var x;
var y;
this.thickness =  Clazz.newIntArray (this.sampleCount + 1, 0);
var i;
for (i = 0; i <= this.sampleCount; i++) this.thickness[i] = 5;

this.genModes ();
this.setDamping ();
});
Clazz.defineMethod (c$, "setDamping", 
function () {
var i;
this.dampcoef =  Clazz.newDoubleArray (this.modeCount, 0);
var tadd = java.lang.Math.exp ((this.speedBar.getValue () - 100) / 20.) * (0.002);
for (i = 0; i != this.modeCount; i++) {
var damper = java.lang.Math.exp (Clazz.doubleToInt (this.dampingBar.getValue () / 40) - 3) * 30;
if (this.dampingBar.getValue () <= 2) damper = 0;
var damp2 = this.omega[i] * java.lang.Math.sqrt (java.lang.Math.sqrt (1 + damper * damper / (this.omega[i] * this.omega[i])) - 1);
this.dampcoef[i] = java.lang.Math.exp (-damp2 * tadd * .004);
}
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
this.selectedCoef = Clazz.doubleToInt (x / termWidth);
if (this.selectedCoef >= this.modeCount) this.selectedCoef = -1;
if (this.selectedCoef != -1) this.selection = 2;
}if (this.selectedCoef != oldCoef) this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
if (e.getClickCount () == 2 && this.selectedCoef != -1) {
var i;
for (i = 0; i != this.modeCount; i++) if (this.selectedCoef != i) this.magcoef[i] = 0;

this.magcoef[this.selectedCoef] = 1;
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
if (this.dragging && this.selection == 1) {
if (this.modeChooser.getSelectedIndex () == 2) this.genModes ();
 else {
this.transform (false);
if (this.soundCheck.getState ()) this.doPlay ();
}}if (this.dragging && this.selection == 2 && this.soundCheck.getState ()) this.doPlay ();
this.dragging = false;
this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (e.getItemSelectable () === this.stoppedCheck) {
this.cv.repaint (this.pause);
return;
}if (e.getItemSelectable () === this.soundCheck) {
if (this.soundCheck.getState ()) {
this.speedBar.setValue (250);
this.dampingBar.setValue (170);
this.baseFreqBar.enable ();
this.setDamping ();
this.doPlay ();
} else this.baseFreqBar.disable ();
}if (e.getItemSelectable () === this.displayChooser) this.cv.repaint (this.pause);
if (e.getItemSelectable () === this.setupChooser) {
this.setLoadCount ();
if (Clazz.instanceOf (this.setup, test.falstad.BarWavesFrame.StiffStringSetup)) this.stiffnessBar.enable ();
 else this.stiffnessBar.disable ();
}}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "dodiff", 
function (matrix, r, i, n, mult) {
if (i < 1 && this.setup.leftBoundary () == 0) return;
if (i > this.sampleCount - 1 && this.setup.rightBoundary () == 0) return;
if (n == 2 && !(Clazz.instanceOf (this.setup, test.falstad.BarWavesFrame.StringSetup))) {
if (i <= 1 && this.setup.leftBoundary () == 1) return;
if (i >= this.sampleCount - 1 && this.setup.rightBoundary () == 1) return;
}if (n > 0) {
this.dodiff (matrix, r, i - 1, n - 2, -mult);
this.dodiff (matrix, r, i + 1, n - 2, -mult);
this.dodiff (matrix, r, i, n - 2, mult * 2);
return;
}if (i >= 1 && i <= this.sampleCount - 1) matrix[r][i] += mult;
}, "~A,~N,~N,~N,~N");
Clazz.defineMethod (c$, "genModes", 
function () {
var n = this.sampleCount - 1;
var matrix =  Clazz.newDoubleArray (n + 1, n + 1, 0);
var d =  Clazz.newDoubleArray (n + 1, 0);
var e =  Clazz.newDoubleArray (n + 1, 0);
var i;
var j;
for (i = 1; i <= n; i++) this.setup.doMatrixStep (matrix, i, n);

if (Clazz.instanceOf (this.setup, test.falstad.BarWavesFrame.StringSetup)) {
if (this.setup.leftBoundary () == 1) matrix[1][1]--;
if (this.setup.rightBoundary () == 1) matrix[n][n]--;
}this.tred2 (matrix, n, d, e);
this.tqli (d, e, n, matrix);
this.modeCount = this.sampleCount - 1;
this.omega =  Clazz.newDoubleArray (this.modeCount, 0);
var omegamap =  Clazz.newIntArray (this.sampleCount, 0);
for (i = j = 0; i != n; i++) {
if (d[i + 1] < 1e-8) {
this.modeCount--;
continue;
}this.omega[j] = java.lang.Math.sqrt (d[i + 1]);
omegamap[j] = i;
j++;
}
var si;
var sj;
for (si = 1; si < this.modeCount; si++) {
var v = this.omega[si];
var vm = omegamap[si];
sj = si;
while (this.omega[sj - 1] > v) {
this.omega[sj] = this.omega[sj - 1];
omegamap[sj] = omegamap[sj - 1];
sj--;
if (sj <= 0) break;
}
this.omega[sj] = v;
omegamap[sj] = vm;
}
this.modeTable =  Clazz.newDoubleArray (this.sampleCount + 1, this.modeCount, 0);
this.modeNorms =  Clazz.newDoubleArray (this.modeCount, 0);
for (i = 0; i != this.modeCount; i++) {
var om = omegamap[i] + 1;
var maxf = 0;
for (j = 0; j != this.sampleCount; j++) {
this.modeTable[j][i] = matrix[j][om];
if (this.modeTable[j][i] > maxf) maxf = this.modeTable[j][i];
if (-this.modeTable[j][i] > maxf) maxf = -this.modeTable[j][i];
}
this.modeNorms[i] = 1 / (maxf * maxf);
for (j = 0; j != this.sampleCount; j++) this.modeTable[j][i] /= maxf;

}
var mult = 1 / this.omega[0];
for (i = 0; i != this.modeCount; i++) this.omega[i] *= mult;

});
Clazz.defineMethod (c$, "tred2", 
function (a, n, d, e) {
var l;
var k;
var j;
var i;
var scale;
var hh;
var h;
var g;
var f;
for (i = n; i >= 2; i--) {
l = i - 1;
h = scale = 0.0;
if (l > 1) {
for (k = 1; k <= l; k++) scale += java.lang.Math.abs (a[i][k]);

if (scale == 0.0) e[i] = a[i][l];
 else {
for (k = 1; k <= l; k++) {
a[i][k] /= scale;
h += a[i][k] * a[i][k];
}
f = a[i][l];
g = (f >= 0.0 ? -java.lang.Math.sqrt (h) : java.lang.Math.sqrt (h));
e[i] = scale * g;
h -= f * g;
a[i][l] = f - g;
f = 0.0;
for (j = 1; j <= l; j++) {
a[j][i] = a[i][j] / h;
g = 0.0;
for (k = 1; k <= j; k++) g += a[j][k] * a[i][k];

for (k = j + 1; k <= l; k++) g += a[k][j] * a[i][k];

e[j] = g / h;
f += e[j] * a[i][j];
}
hh = f / (h + h);
for (j = 1; j <= l; j++) {
f = a[i][j];
e[j] = g = e[j] - hh * f;
for (k = 1; k <= j; k++) a[j][k] -= (f * e[k] + g * a[i][k]);

}
}} else e[i] = a[i][l];
d[i] = h;
}
d[1] = 0.0;
e[1] = 0.0;
for (i = 1; i <= n; i++) {
l = i - 1;
if (d[i] != 0) {
for (j = 1; j <= l; j++) {
g = 0.0;
for (k = 1; k <= l; k++) g += a[i][k] * a[k][j];

for (k = 1; k <= l; k++) a[k][j] -= g * a[k][i];

}
}d[i] = a[i][i];
a[i][i] = 1.0;
for (j = 1; j <= l; j++) a[j][i] = a[i][j] = 0.0;

}
}, "~A,~N,~A,~A");
Clazz.defineMethod (c$, "tqli", 
function (d, e, n, z) {
var m;
var l;
var iter;
var i;
var k;
var s;
var r;
var p;
var g;
var f;
var dd;
var c;
var b;
for (i = 2; i <= n; i++) e[i - 1] = e[i];

e[n] = 0.0;
for (l = 1; l <= n; l++) {
iter = 0;
do {
for (m = l; m <= n - 1; m++) {
dd = java.lang.Math.abs (d[m]) + java.lang.Math.abs (d[m + 1]);
if ((java.lang.Math.abs (e[m]) + dd) == dd) break;
}
if (m != l) {
if (iter++ == 30) System.out.print ("Too many iterations in tqli\n");
g = (d[l + 1] - d[l]) / (2.0 * e[l]);
r = this.pythag (g, 1.0);
g = d[m] - d[l] + e[l] / (g + this.SIGN (r, g));
s = c = 1.0;
p = 0.0;
for (i = m - 1; i >= l; i--) {
f = s * e[i];
b = c * e[i];
e[i + 1] = (r = this.pythag (f, g));
if (r == 0.0) {
d[i + 1] -= p;
e[m] = 0.0;
break;
}s = f / r;
c = g / r;
g = d[i + 1] - p;
r = (d[i] - g) * s + 2.0 * c * b;
d[i + 1] = g + (p = s * r);
g = c * r - b;
for (k = 1; k <= n; k++) {
f = z[k][i + 1];
z[k][i + 1] = s * z[k][i] + c * f;
z[k][i] = c * z[k][i] - s * f;
}
}
if (r == 0.0 && i >= l) continue;
d[l] -= p;
e[l] = g;
e[m] = 0.0;
}} while (m != l);
}
}, "~A,~A,~N,~A");
Clazz.defineMethod (c$, "SIGN", 
function (a, b) {
return b >= 0 ? java.lang.Math.abs (a) : -java.lang.Math.abs (a);
}, "~N,~N");
Clazz.defineMethod (c$, "SQR", 
function (a) {
return a * a;
}, "~N");
Clazz.defineMethod (c$, "pythag", 
function (a, b) {
var absa;
var absb;
absa = java.lang.Math.abs (a);
absb = java.lang.Math.abs (b);
if (absa > absb) return absa * java.lang.Math.sqrt (1.0 + this.SQR (absb / absa));
 else return (absb == 0.0 ? 0.0 : absb * java.lang.Math.sqrt (1.0 + this.SQR (absa / absb)));
}, "~N,~N");
Clazz.defineMethod (c$, "getFreq", 
function (n) {
var stepsize = java.lang.Math.log (2) / 12;
var freq = java.lang.Math.exp (this.baseFreqBar.getValue () * stepsize);
return Clazz.doubleToInt (freq * this.omega[n]);
}, "~N");
Clazz.defineMethod (c$, "doPlay", 
function () {
var rate = 8000;
var sampcount = 8000;
var b =  Clazz.newByteArray (8000, 0);
var stepsize = java.lang.Math.log (2) / 12;
var freq = java.lang.Math.exp (this.baseFreqBar.getValue () * stepsize);
var n = 2 * 3.141592653589793 * freq / 8000;
n /= this.omega[0];
var maxomega = 3.141592653589793 / n;
var m = this.modeCount;
while (m > 0 && this.omega[m - 1] > maxomega) m--;

if (m == 0) return;
var m0 = 0;
var minomega = 125.66370614359172 / (8000 * n);
while (m0 < m && this.omega[m0] < minomega) m0++;

if (m0 == m) return;
var failed;
var i;
var sampWindow = 200;
var offset = 0;
var lastscale = 1000;
var mag =  Clazz.newDoubleArray (this.modeCount, 0);
for (i = 0; i != this.modeCount; i++) mag[i] = this.magcoef[i];

do {
failed = false;
var mn = (-this.sndmin > this.sndmax) ? -this.sndmin : this.sndmax;
if (mn < .02) mn = .02;
var scale = 126 / mn;
if (scale > lastscale) scale = lastscale;
this.sndmin = this.sndmax = 0;
for (i = 0; i != sampWindow; i++) {
var dy = 0;
var j;
var ii = i + offset;
for (j = m0; j != m; j++) dy += mag[j] * java.lang.Math.sin (ii * n * this.omega[j]) * scale;

if (dy < this.sndmin) this.sndmin = dy;
if (dy > this.sndmax) this.sndmax = dy;
if (dy < -127 || dy > 127) failed = true;
 else {
b[ii] = test.falstad.BarWavesFrame.to_ulaw[128 + Clazz.doubleToInt (dy)];
}}
this.sndmin /= scale;
this.sndmax /= scale;
if (failed) continue;
offset += sampWindow;
for (i = 0; i != this.modeCount; i++) mag[i] *= this.dampcoef[i];

if (offset >= 8000) break;
} while (true);
var ads =  new sun.audio.AudioDataStream ( new sun.audio.AudioData (b));
sun.audio.AudioPlayer.player.start (ads);
this.cv.repaint ();
});
c$.$BarWavesFrame$Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "Setup");
Clazz.defineMethod (c$, "getThickness", 
function () {
return 3;
});
Clazz.defineMethod (c$, "doMatrixStep", 
function (a, b, c) {
this.b$["test.falstad.BarWavesFrame"].dodiff (a, b, b, 4, 1);
}, "~A,~N,~N");
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$FreeBarSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "FreeBarSetup", test.falstad.BarWavesFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.BarWavesFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "bar, free";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.BarWavesFrame.HingedBarSetup, this, null);
});
Clazz.overrideMethod (c$, "leftBoundary", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "rightBoundary", 
function () {
return 1;
});
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$HingedBarSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "HingedBarSetup", test.falstad.BarWavesFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.BarWavesFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "bar, hinged";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.BarWavesFrame.ClampedBarSetup, this, null);
});
Clazz.overrideMethod (c$, "leftBoundary", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "rightBoundary", 
function () {
return 0;
});
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$ClampedBarSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "ClampedBarSetup", test.falstad.BarWavesFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.BarWavesFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "bar, clamped";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.BarWavesFrame.ClampedFreeBarSetup, this, null);
});
Clazz.overrideMethod (c$, "leftBoundary", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "rightBoundary", 
function () {
return 2;
});
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$ClampedFreeBarSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "ClampedFreeBarSetup", test.falstad.BarWavesFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.BarWavesFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "bar, clamped/free";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.BarWavesFrame.HingedClampedBarSetup, this, null);
});
Clazz.overrideMethod (c$, "leftBoundary", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "rightBoundary", 
function () {
return 1;
});
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$HingedClampedBarSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "HingedClampedBarSetup", test.falstad.BarWavesFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.BarWavesFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "bar, hinged/clamped";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.BarWavesFrame.StringSetup, this, null);
});
Clazz.overrideMethod (c$, "leftBoundary", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "rightBoundary", 
function () {
return 2;
});
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$StringSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "StringSetup", test.falstad.BarWavesFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.BarWavesFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "string, pinned";
});
Clazz.overrideMethod (c$, "doMatrixStep", 
function (a, b, c) {
this.b$["test.falstad.BarWavesFrame"].dodiff (a, b, b, 2, 1);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.BarWavesFrame.String1FreeSetup, this, null);
});
Clazz.overrideMethod (c$, "leftBoundary", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "rightBoundary", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getThickness", 
function () {
return 0;
});
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$String1FreeSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "String1FreeSetup", test.falstad.BarWavesFrame.StringSetup, null, Clazz.innerTypeInstance (test.falstad.BarWavesFrame.StringSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "string, pinned/free";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.BarWavesFrame.String2FreeSetup, this, null);
});
Clazz.overrideMethod (c$, "rightBoundary", 
function () {
return 1;
});
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$String2FreeSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "String2FreeSetup", test.falstad.BarWavesFrame.String1FreeSetup, null, Clazz.innerTypeInstance (test.falstad.BarWavesFrame.String1FreeSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "string, free/free";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.BarWavesFrame.StiffStringSetup, this, null);
});
Clazz.overrideMethod (c$, "leftBoundary", 
function () {
return 1;
});
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$StiffStringSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "StiffStringSetup", test.falstad.BarWavesFrame.StringSetup, null, Clazz.innerTypeInstance (test.falstad.BarWavesFrame.StringSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "stiff string, pinned";
});
Clazz.overrideMethod (c$, "doMatrixStep", 
function (a, b, c) {
this.b$["test.falstad.BarWavesFrame"].dodiff (a, b, b, 2, 1);
var d = this.b$["test.falstad.BarWavesFrame"].stiffnessBar.getValue () * .1;
this.b$["test.falstad.BarWavesFrame"].dodiff (a, b, b, 4, d);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.BarWavesFrame.StiffStringClampedSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$StiffStringClampedSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "StiffStringClampedSetup", test.falstad.BarWavesFrame.StiffStringSetup, null, Clazz.innerTypeInstance (test.falstad.BarWavesFrame.StiffStringSetup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "stiff string, clamped";
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return null;
});
Clazz.overrideMethod (c$, "leftBoundary", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "rightBoundary", 
function () {
return 2;
});
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$BarWavesCanvas$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "BarWavesCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.BarWavesFrame.BarWavesCanvas, []);
this.pg = a;
}, "test.falstad.BarWavesFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "paintComponent", 
function (a) {
this.pg.updateBarWaves (a);
}, "java.awt.Graphics");
c$ = Clazz.p0p ();
};
c$.$BarWavesFrame$BarWavesLayout$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.BarWavesFrame, "BarWavesLayout", null, java.awt.LayoutManager);
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
"epsilon", .0000001,
"epsilon2", .003,
"pi", 3.14159265358979323846,
"SEL_NONE", 0,
"SEL_FUNC", 1,
"SEL_MAG", 2,
"MODE_SHAPE", 0,
"MODE_FORCE", 1,
"MODE_THICKNESS", 2,
"DISP_PHASE", 0,
"DISP_PHASECOS", 1,
"DISP_MODES", 2,
"BOUND_HINGED", 0,
"BOUND_FREE", 1,
"BOUND_CLAMPED", 2,
"to_ulaw", [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30, 30, 31, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 49, 51, 53, 55, 57, 59, 61, 63, 66, 70, 74, 78, 84, 92, 104, 254, 231, 219, 211, 205, 201, 197, 193, 190, 188, 186, 184, 182, 180, 178, 176, 175, 174, 173, 172, 171, 170, 169, 168, 167, 166, 165, 164, 163, 162, 161, 160, 159, 159, 158, 158, 157, 157, 156, 156, 155, 155, 154, 154, 153, 153, 152, 152, 151, 151, 150, 150, 149, 149, 148, 148, 147, 147, 146, 146, 145, 145, 144, 144, 143, 143, 143, 143, 142, 142, 142, 142, 141, 141, 141, 141, 140, 140, 140, 140, 139, 139, 139, 139, 138, 138, 138, 138, 137, 137, 137, 137, 136, 136, 136, 136, 135, 135, 135, 135, 134, 134, 134, 134, 133, 133, 133, 133, 132, 132, 132, 132, 131, 131, 131, 131, 130, 130, 130, 130, 129, 129, 129, 129, 128, 128, 128, 128]);
});
