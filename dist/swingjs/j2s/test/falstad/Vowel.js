Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "$.Rectangle", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "java.lang.Thread", "swingjs.awt.Applet", "$.Canvas", "$.Dialog", "$.Frame"], ["test.falstad.VowelCanvas", "$.VowelLayout", "$.Vowel", "$.VowelFrame"], ["java.awt.Color", "$.Dimension", "java.lang.Double", "java.text.DecimalFormat", "java.util.Random", "$.StringTokenizer", "javax.sound.sampled.AudioFormat", "$.AudioSystem", "$.DataLine", "$.LineUnavailableException", "$.SourceDataLine", "swingjs.awt.Button", "$.Checkbox", "$.CheckboxMenuItem", "$.Choice", "$.Label", "$.Menu", "$.MenuBar", "$.MenuItem", "$.Scrollbar", "$.TextArea"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "VowelCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.VowelCanvas, []);
this.pg = p;
}, "test.falstad.VowelFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateVowel (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateVowel (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "VowelLayout", null, java.awt.LayoutManager);
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
}, test.falstad, "Vowel", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.Vowel.ogf != null) test.falstad.Vowel.ogf.dispose ();
test.falstad.Vowel.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.Vowel.ogf =  new test.falstad.VowelFrame (null);
test.falstad.Vowel.ogf.init ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.Vowel.ogf == null) {
this.started = true;
try {
test.falstad.Vowel.ogf =  new test.falstad.VowelFrame (this);
test.falstad.Vowel.ogf.init ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
test.falstad.Vowel.ogf = null;
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
 else if (test.falstad.Vowel.ogf == null) s = "Applet is finished.";
 else if (test.falstad.Vowel.ogf.useFrame) test.falstad.Vowel.ogf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.Vowel, "paint", [g]);
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
if (test.falstad.Vowel.ogf != null) test.falstad.Vowel.ogf.dispose ();
test.falstad.Vowel.ogf = null;
this.repaint ();
});
Clazz.defineStatics (c$,
"ogf", null);
c$ = Clazz.decorateAsClass (function () {
this.winSize = null;
this.dbimage = null;
this.respView = null;
this.impulseView = null;
this.phaseView = null;
this.pipeView = null;
this.stepView = null;
this.spectrumView = null;
this.waveformView = null;
this.poleInfoView = null;
this.polesView = null;
this.random = null;
this.maxSampleCount = 70;
this.sampleCountR = 0;
this.sampleCountTh = 0;
this.modeCountR = 0;
this.modeCountTh = 0;
this.maxDispRModes = 5;
this.maxDispThModes = 5;
this.soundCheck = null;
this.displayCheck = null;
this.compressCheck = null;
this.attenuationCheck = null;
this.envelopeCheck = null;
this.exportButton = null;
this.impDialog = null;
this.freqCheckItem = null;
this.phaseCheckItem = null;
this.spectrumCheckItem = null;
this.impulseCheckItem = null;
this.stepCheckItem = null;
this.waveformCheckItem = null;
this.logFreqCheckItem = null;
this.linRespCheckItem = null;
this.allWaveformCheckItem = null;
this.ferrisCheckItem = null;
this.exitItem = null;
this.filterChooser = null;
this.selection = 0;
this.SELECT_RESPONSE = 1;
this.SELECT_SPECTRUM = 2;
this.SELECT_PIPE = 3;
this.filterSelection = 0;
this.inputChooser = null;
this.windowChooser = null;
this.rateChooser = null;
this.auxBars = null;
this.auxLabels = null;
this.inputLabel = null;
this.inputBar = null;
this.kaiserLabel = null;
this.kaiserBar = null;
this.editingFunc = false;
this.dragStop = false;
this.inputW = 0;
this.step = 0;
this.waveGain = 1.52587890625E-5;
this.outputGain = 1;
this.sampleRate = 0;
this.xpoints = null;
this.ypoints = null;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.mouseX = 0;
this.mouseY = 0;
this.selectedPole = 0;
this.selectedZero = 0;
this.lastPoleCount = 2;
this.lastZeroCount = 2;
this.dragSet = false;
this.dragClear = false;
this.dragging = false;
this.unstable = false;
this.pipeRadius = null;
this.pipeLen = 0;
this.t = 0;
this.pause = 0;
this.playThread = null;
this.curFilter = null;
this.filterType = null;
this.spectrumBuf = null;
this.spectrumFFT = null;
this.wformInfo = null;
this.phaseColors = null;
this.filterChanged = false;
this.main = null;
this.useFrame = false;
this.showControls = false;
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.View")) {
test.falstad.VowelFrame.$VowelFrame$View$ ();
}
this.cv = null;
this.applet = null;
this.showFormat = null;
this.java2 = false;
this.mp3List = null;
this.mp3Error = null;
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.PhaseColor")) {
test.falstad.VowelFrame.$VowelFrame$PhaseColor$ ();
}
this.shown = false;
this.lastTime = 0;
this.minlog = 0;
this.logrange = 0;
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.FFT")) {
test.falstad.VowelFrame.$VowelFrame$FFT$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.Waveform")) {
test.falstad.VowelFrame.$VowelFrame$Waveform$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.NoiseWaveform")) {
test.falstad.VowelFrame.$VowelFrame$NoiseWaveform$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.PeriodicNoiseWaveform")) {
test.falstad.VowelFrame.$VowelFrame$PeriodicNoiseWaveform$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.SineWaveform")) {
test.falstad.VowelFrame.$VowelFrame$SineWaveform$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.TriangleWaveform")) {
test.falstad.VowelFrame.$VowelFrame$TriangleWaveform$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.SawtoothWaveform")) {
test.falstad.VowelFrame.$VowelFrame$SawtoothWaveform$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.VocalWaveform")) {
test.falstad.VowelFrame.$VowelFrame$VocalWaveform$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.SquareWaveform")) {
test.falstad.VowelFrame.$VowelFrame$SquareWaveform$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.SweepWaveform")) {
test.falstad.VowelFrame.$VowelFrame$SweepWaveform$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.ImpulseWaveform")) {
test.falstad.VowelFrame.$VowelFrame$ImpulseWaveform$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.PlayThread")) {
test.falstad.VowelFrame.$VowelFrame$PlayThread$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.Complex")) {
test.falstad.VowelFrame.$VowelFrame$Complex$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.Filter")) {
test.falstad.VowelFrame.$VowelFrame$Filter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.DirectFilter")) {
test.falstad.VowelFrame.$VowelFrame$DirectFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.CascadeFilter")) {
test.falstad.VowelFrame.$VowelFrame$CascadeFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.FilterType")) {
test.falstad.VowelFrame.$VowelFrame$FilterType$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.FIRFilterType")) {
test.falstad.VowelFrame.$VowelFrame$FIRFilterType$ ();
}
this.uresp = null;
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.PipeFIRFilter")) {
test.falstad.VowelFrame.$VowelFrame$PipeFIRFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.IBarVowelFilter")) {
test.falstad.VowelFrame.$VowelFrame$IBarVowelFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.IVowelFilter")) {
test.falstad.VowelFrame.$VowelFrame$IVowelFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.EVowelFilter")) {
test.falstad.VowelFrame.$VowelFrame$EVowelFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.OpenTubeFilter")) {
test.falstad.VowelFrame.$VowelFrame$OpenTubeFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.CustomFilter")) {
test.falstad.VowelFrame.$VowelFrame$CustomFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.AVowelFilter")) {
test.falstad.VowelFrame.$VowelFrame$AVowelFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.AVowelFilterSimple")) {
test.falstad.VowelFrame.$VowelFrame$AVowelFilterSimple$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.AEVowelFilterSimple")) {
test.falstad.VowelFrame.$VowelFrame$AEVowelFilterSimple$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.OVowelFilter")) {
test.falstad.VowelFrame.$VowelFrame$OVowelFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.UVowelFilter")) {
test.falstad.VowelFrame.$VowelFrame$UVowelFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.YVowelFilterSimple")) {
test.falstad.VowelFrame.$VowelFrame$YVowelFilterSimple$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.IVowelFilterSimple")) {
test.falstad.VowelFrame.$VowelFrame$IVowelFilterSimple$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.UrVowelFilterSimple")) {
test.falstad.VowelFrame.$VowelFrame$UrVowelFilterSimple$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.IhVowelFilterSimple")) {
test.falstad.VowelFrame.$VowelFrame$IhVowelFilterSimple$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.OoVowelFilterSimple")) {
test.falstad.VowelFrame.$VowelFrame$OoVowelFilterSimple$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.NoFilter")) {
test.falstad.VowelFrame.$VowelFrame$NoFilter$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.ImportDialogLayout")) {
test.falstad.VowelFrame.$VowelFrame$ImportDialogLayout$ ();
}
if (!Clazz.isClassDefined ("test.falstad.VowelFrame.ImportDialog")) {
test.falstad.VowelFrame.$VowelFrame$ImportDialog$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "VowelFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.prepareFields (c$, function () {
this.xpoints =  Clazz.newIntArray (4, 0);
this.ypoints =  Clazz.newIntArray (4, 0);
});
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "Vowel Series by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.VowelFrame, ["Vowel Applet v1.0"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.Vowel");
Clazz.defineMethod (c$, "init", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
this.mp3List =  new Array (20);
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
var j;
var pc8 = 50;
this.phaseColors =  new Array (400);
var i;
for (i = 0; i != 8; i++) for (j = 0; j != pc8; j++) {
var ang = Math.atan (j / pc8);
this.phaseColors[i * pc8 + j] = this.genPhaseColor (i, ang);
}

this.pipeRadius =  Clazz.newDoubleArray (200, 0);
for (i = 0; i != 10; i++) this.pipeRadius[i] = 2.828427;

for (; i != 20; i++) this.pipeRadius[i] = 1;

this.main.setLayout ( new test.falstad.VowelLayout ());
this.cv =  new test.falstad.VowelCanvas (this);
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
m.add (this.freqCheckItem = this.getCheckItem ("Frequency Response", true));
this.phaseCheckItem = this.getCheckItem ("Phase Response", false);
m.add (this.spectrumCheckItem = this.getCheckItem ("Spectrum", true));
m.add (this.waveformCheckItem = this.getCheckItem ("Waveform", false));
m.add (this.impulseCheckItem = this.getCheckItem ("Impulse Response", false));
m.add (this.stepCheckItem = this.getCheckItem ("Step Response", false));
m.addSeparator ();
m.add (this.logFreqCheckItem = this.getCheckItem ("Log Frequency Scale", false));
m.add (this.allWaveformCheckItem = this.getCheckItem ("Show Entire Waveform", false));
m.add (this.ferrisCheckItem = this.getCheckItem ("Ferris Plot", false));
m.add (this.linRespCheckItem = this.getCheckItem ("Linear Response Scale", false));
this.setMenuBar (mb);
this.soundCheck =  new swingjs.awt.Checkbox ("Sound On");
if (this.java2) this.soundCheck.setState (true);
 else this.soundCheck.disable ();
this.soundCheck.addItemListener (this);
this.main.add (this.soundCheck);
this.displayCheck =  new swingjs.awt.Checkbox ("Stop Display");
this.displayCheck.addItemListener (this);
this.compressCheck =  new swingjs.awt.Checkbox ("Compress");
this.compressCheck.setState (true);
this.compressCheck.addItemListener (this);
this.attenuationCheck =  new swingjs.awt.Checkbox ("Attenuation");
this.attenuationCheck.setState (true);
this.attenuationCheck.addItemListener (this);
this.main.add (this.attenuationCheck);
this.envelopeCheck =  new swingjs.awt.Checkbox ("Envelope");
this.envelopeCheck.setState (true);
this.envelopeCheck.addItemListener (this);
this.main.add (this.envelopeCheck);
this.exportButton =  new swingjs.awt.Button ("Import/Export");
this.main.add (this.exportButton);
this.exportButton.addActionListener (this);
this.main.add (this.inputChooser =  new swingjs.awt.Choice ());
this.inputChooser.add ("Input = Noise");
this.inputChooser.add ("Input = Vocal");
this.inputChooser.add ("Input = Sawtooth");
this.inputChooser.add ("Input = Periodic Noise");
this.inputChooser.add ("Input = Triangle Wave");
this.inputChooser.add ("Input = Square Wave");
this.inputChooser.add ("Input = Sine Wave");
this.inputChooser.add ("Input = Sweep");
this.inputChooser.add ("Input = Impulses");
for (i = 0; this.mp3List[i] != null; i++) this.inputChooser.add ("Input = " + this.mp3List[i]);

this.inputChooser.select (1);
this.inputChooser.addItemListener (this);
this.main.add (this.filterChooser =  new swingjs.awt.Choice ());
this.filterChooser.add ("Filter = ah");
this.filterChooser.add ("Filter = oh");
this.filterChooser.add ("Filter = oo");
this.filterChooser.add ("Filter = ee");
this.filterChooser.add ("Filter = eh");
this.filterChooser.add ("Filter = barred-I (Russian vowel)");
this.filterChooser.add ("Filter = ah (simple)");
this.filterChooser.add ("Filter = ee (simple)");
this.filterChooser.add ("Filter = a as in bad (simple)");
this.filterChooser.add ("Filter = ih (simple)");
this.filterChooser.add ("Filter = oo (simple)");
this.filterChooser.add ("Filter = French u (simple)");
this.filterChooser.add ("Filter = open tube");
this.filterChooser.add ("Filter = custom");
this.filterChooser.add ("Filter = none");
this.filterChooser.addItemListener (this);
this.filterSelection = -1;
this.windowChooser =  new swingjs.awt.Choice ();
this.windowChooser.add ("Window = Rectangular");
this.windowChooser.add ("Window = Hamming");
this.windowChooser.add ("Window = Hann");
this.windowChooser.add ("Window = Blackman");
this.windowChooser.add ("Window = Kaiser");
this.windowChooser.add ("Window = Bartlett");
this.windowChooser.add ("Window = Welch");
this.windowChooser.addItemListener (this);
this.main.add (this.rateChooser =  new swingjs.awt.Choice ());
this.rateChooser.add ("Sampling Rate = 8000");
this.rateChooser.add ("Sampling Rate = 11025");
this.rateChooser.add ("Sampling Rate = 16000");
this.rateChooser.add ("Sampling Rate = 22050");
this.rateChooser.select (1);
this.sampleRate = 11025;
this.rateChooser.addItemListener (this);
this.auxLabels =  new Array (5);
this.auxBars =  new Array (5);
for (i = 0; i != 5; i++) {
this.main.add (this.auxLabels[i] =  new swingjs.awt.Label ("", 0));
this.main.add (this.auxBars[i] =  new swingjs.awt.Scrollbar (0, 25, 1, 1, 999));
this.auxBars[i].addAdjustmentListener (this);
}
this.main.add (this.inputLabel =  new swingjs.awt.Label ("Input Frequency", 0));
this.main.add (this.inputBar =  new swingjs.awt.Scrollbar (0, 400, 1, 1, 999));
this.inputBar.addAdjustmentListener (this);
this.main.add (this.kaiserLabel =  new swingjs.awt.Label ("Kaiser Parameter", 0));
this.main.add (this.kaiserBar =  new swingjs.awt.Scrollbar (0, 500, 1, 1, 999));
this.kaiserBar.addAdjustmentListener (this);
this.random =  new java.util.Random ();
this.setInputLabel ();
this.reinit ();
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (java.awt.Color.lightGray);
this.showFormat = java.text.DecimalFormat.getInstance ();
this.showFormat.setMaximumFractionDigits (2);
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
this.setupFilter ();
this.setInputW ();
});
Clazz.defineMethod (c$, "getMenuItem", 
function (s) {
var mi =  new swingjs.awt.MenuItem (s);
mi.addActionListener (this);
return mi;
}, "~S");
Clazz.defineMethod (c$, "getCheckItem", 
function (s, b) {
var mi =  new swingjs.awt.CheckboxMenuItem (s);
mi.setState (b);
mi.addItemListener (this);
return mi;
}, "~S,~B");
Clazz.defineMethod (c$, "getPower2", 
function (n) {
var o = 2;
while (o < n) o *= 2;

return o;
}, "~N");
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
c = Clazz.innerTypeInstance (test.falstad.VowelFrame.PhaseColor, this, null, 1, a2, 0);
break;
case 1:
c = Clazz.innerTypeInstance (test.falstad.VowelFrame.PhaseColor, this, null, a3, 1, 0);
break;
case 2:
c = Clazz.innerTypeInstance (test.falstad.VowelFrame.PhaseColor, this, null, 0, 1, a2);
break;
case 3:
c = Clazz.innerTypeInstance (test.falstad.VowelFrame.PhaseColor, this, null, 0, a3, 1);
break;
case 4:
c = Clazz.innerTypeInstance (test.falstad.VowelFrame.PhaseColor, this, null, a2, 0, 1);
break;
case 5:
c = Clazz.innerTypeInstance (test.falstad.VowelFrame.PhaseColor, this, null, 1, 0, a3);
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
var d = this.winSize = this.cv.getSize ();
if (this.winSize.width == 0) return;
var ct = 1;
this.respView = this.spectrumView = this.impulseView = this.phaseView = this.stepView = this.waveformView = this.pipeView = null;
if (this.freqCheckItem.getState ()) ct++;
if (this.phaseCheckItem.getState ()) ct++;
if (this.spectrumCheckItem.getState ()) ct++;
if (this.waveformCheckItem.getState ()) ct++;
if (this.impulseCheckItem.getState ()) ct++;
if (this.stepCheckItem.getState ()) ct++;
ct++;
var dh3 = Clazz.doubleToInt (d.height / ct);
this.dbimage = this.createImage (d.width, d.height);
var bd = 15;
var i = 0;
if (this.freqCheckItem.getState ()) this.respView = this.getView (i++, ct);
if (this.phaseCheckItem.getState ()) this.phaseView = this.getView (i++, ct);
if (this.spectrumCheckItem.getState ()) this.spectrumView = this.getView (i++, ct);
if (this.waveformCheckItem.getState ()) this.waveformView = this.getView (i++, ct);
if (this.impulseCheckItem.getState ()) this.impulseView = this.getView (i++, ct);
if (this.stepCheckItem.getState ()) this.stepView = this.getView (i++, ct);
this.pipeView = this.getView (i++, ct);
this.poleInfoView = this.getView (i++, ct);
if (this.poleInfoView.height > 200) this.poleInfoView.height = 200;
this.polesView = Clazz.innerTypeInstance (test.falstad.VowelFrame.View, this, null, this.poleInfoView.x, this.poleInfoView.y, this.poleInfoView.height, this.poleInfoView.height);
});
Clazz.defineMethod (c$, "getView", 
function (i, ct) {
var dh3 = Clazz.doubleToInt (this.winSize.height / ct);
var bd = 5;
var tpad = 15;
return Clazz.innerTypeInstance (test.falstad.VowelFrame.View, this, null, bd, bd + i * dh3 + tpad, this.winSize.width - bd * 2, dh3 - bd * 2 - tpad);
}, "~N,~N");
Clazz.defineMethod (c$, "centerString", 
function (g, s, y) {
var fm = g.getFontMetrics ();
g.drawString (s, Clazz.doubleToInt ((this.winSize.width - fm.stringWidth (s)) / 2), y);
}, "java.awt.Graphics,~S,~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateVowel", 
function (realg) {
var g = this.dbimage.getGraphics ();
if (this.winSize == null || this.winSize.width == 0 || this.dbimage == null) return;
var sysTime = System.currentTimeMillis ();
if (this.lastTime == 0) this.lastTime = sysTime;
this.t += (sysTime - this.lastTime) * .008;
this.lastTime = sysTime;
if (this.curFilter == null) {
var f = this.filterType.genFilter ();
this.curFilter = f;
if (this.playThread != null) this.playThread.setFilter (f);
this.filterChanged = true;
this.unstable = false;
}if (this.playThread == null && !this.unstable && this.soundCheck.getState ()) {
this.playThread = Clazz.innerTypeInstance (test.falstad.VowelFrame.PlayThread, this, null);
this.playThread.start ();
}if (this.displayCheck.getState ()) return;
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
var minf = 40. / this.sampleRate;
this.minlog = Math.log (minf);
this.logrange = Math.log (.5) - this.minlog;
var cc = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
var i;
if (this.respView != null) {
this.respView.drawLabel (g, "Frequency Response");
g.setColor (java.awt.Color.darkGray);
g.fillRect (this.respView.x, this.respView.y, this.respView.width, this.respView.height);
g.setColor (java.awt.Color.black);
var ym = .069;
for (i = 0; ; i += 2) {
var q = ym * i;
if (q > 1) break;
var y = this.respView.y + Clazz.doubleToInt (q * this.respView.height);
g.drawLine (this.respView.x, y, this.respView.right, y);
}
for (i = 1; ; i++) {
var ll = this.logrange - i * Math.log (2);
var x = 0;
if (this.logFreqCheckItem.getState ()) x = Clazz.doubleToInt (ll * this.respView.width / this.logrange);
 else x = Clazz.doubleToInt (this.respView.width / (1 << i));
if (x <= 0) break;
x += this.respView.x;
g.drawLine (x, this.respView.y, x, this.respView.bottom);
}
g.setColor (java.awt.Color.white);
var ox = -1;
var oy = -1;
var ox2 = -1;
var oy2 = -1;
for (i = 0; i != this.respView.width; i++) {
var w = 0;
if (!this.logFreqCheckItem.getState ()) w = 3.141592653589793 * i / (this.respView.width);
 else {
var f = Math.exp (this.minlog + i * this.logrange / this.respView.width);
w = 2 * 3.141592653589793 * f;
}this.filterType.getResponse (w, cc);
var bw = cc.magSquared ();
var val = -ym * Math.log (bw * bw) / 2.302585092994046;
if (this.linRespCheckItem.getState ()) val = 1 - cc.mag;
var x = i + this.respView.x;
if (val > 1) {
if (ox != -1) g.drawLine (ox, oy, ox, this.respView.bottom);
ox = -1;
} else {
var y = this.respView.y + Clazz.doubleToInt (this.respView.height * val);
if (ox != -1) g.drawLine (ox, oy, x, y);
 else if (x > this.respView.x) g.drawLine (x, this.respView.bottom, x, y);
ox = x;
oy = y;
}}
}g.setColor (java.awt.Color.white);
if (this.phaseView != null) {
this.phaseView.drawLabel (g, "Phase Response");
g.setColor (java.awt.Color.darkGray);
g.fillRect (this.phaseView.x, this.phaseView.y, this.phaseView.width, this.phaseView.height);
g.setColor (java.awt.Color.black);
for (i = 0; i < 5; i++) {
var q = i * .25;
var y = this.phaseView.y + Clazz.doubleToInt (q * this.phaseView.height);
g.drawLine (this.phaseView.x, y, this.phaseView.right, y);
}
for (i = 1; ; i++) {
var ll = this.logrange - i * Math.log (2);
var x = 0;
if (this.logFreqCheckItem.getState ()) x = Clazz.doubleToInt (ll * this.phaseView.width / this.logrange);
 else x = Clazz.doubleToInt (this.phaseView.width / (1 << i));
if (x <= 0) break;
x += this.phaseView.x;
g.drawLine (x, this.phaseView.y, x, this.phaseView.bottom);
}
g.setColor (java.awt.Color.white);
var ox = -1;
var oy = -1;
for (i = 0; i != this.phaseView.width; i++) {
var w = 0;
if (!this.logFreqCheckItem.getState ()) w = 3.141592653589793 * i / (this.phaseView.width);
 else {
var f = Math.exp (this.minlog + i * this.logrange / this.phaseView.width);
w = 2 * 3.141592653589793 * f;
}this.filterType.getResponse (w, cc);
var val = .5 - cc.phase / (6.283185307179586);
var y = this.phaseView.y + Clazz.doubleToInt (this.phaseView.height * val);
var x = i + this.phaseView.x;
if (ox != -1) g.drawLine (ox, oy, x, y);
 else if (x > this.phaseView.x) g.drawLine (x, this.phaseView.bottom, x, y);
ox = x;
oy = y;
}
}if (this.pipeView != null && Clazz.instanceOf (this.filterType, test.falstad.VowelFrame.PipeFIRFilter)) {
this.pipeView.drawLabel (g, "Cross Section");
g.setColor (java.awt.Color.darkGray);
g.fillRect (this.pipeView.x, this.pipeView.y, this.pipeView.width, this.pipeView.height);
g.setColor (java.awt.Color.black);
this.pipeView.mult = 0.14285714285714285;
for (i = 0; i != 10; i++) {
var y1 = this.pipeView.y + this.pipeView.height * (.5 - i * this.pipeView.mult);
if (y1 < this.pipeView.y) break;
g.drawLine (0, Clazz.doubleToInt (y1), this.winSize.width - 1, Clazz.doubleToInt (y1));
var y2 = this.pipeView.y + this.pipeView.height * (.5 + i * this.pipeView.mult);
g.drawLine (0, Clazz.doubleToInt (y2), this.winSize.width - 1, Clazz.doubleToInt (y2));
}
for (i = 0; i * .01 <= this.pipeLen; i++) {
var xi = this.pipeView.x + Clazz.doubleToInt (this.pipeView.width * i * .01 / this.pipeLen);
g.drawLine (xi, this.pipeView.y, xi, this.pipeView.y + this.pipeView.height);
}
var f = 0;
var k = 0;
var wave = null;
g.setColor (java.awt.Color.white);
if ((this.respView != null && this.respView.contains (this.mouseX, this.mouseY)) || (this.spectrumView != null && this.spectrumView.contains (this.mouseX, this.mouseY))) {
f = this.getFreqFromX (this.mouseX, this.respView);
f *= this.sampleRate;
wave =  new Array (this.pipeRadius.length + 1);
this.calcWave (f, wave);
k = 2 * 3.141592653589793 * f / 35396.0;
k *= this.pipeLen * 100 / this.pipeRadius.length;
}for (i = 0; i != this.pipeRadius.length; i++) {
if (f > 0) {
wave[i].rotate (this.t);
var wv = wave[i].re / 2.;
var c = Clazz.doubleToInt (128 + 127 * wv);
if (c < 0) c = 0;
if (c > 255) c = 255;
g.setColor ( new java.awt.Color (c, c, c));
}var x1 = Clazz.doubleToInt (this.pipeView.width * i / this.pipeRadius.length) + this.pipeView.x;
var x2 = Clazz.doubleToInt (this.pipeView.width * (i + 1) / this.pipeRadius.length) + this.pipeView.x;
var y1 = this.pipeView.y + Clazz.doubleToInt (this.pipeView.height * (.5 - this.pipeRadius[i] * this.pipeView.mult));
var y2 = this.pipeView.y + Clazz.doubleToInt (this.pipeView.height * (.5 + this.pipeRadius[i] * this.pipeView.mult));
g.fillRect (x1, y1, x2 - x1, y2 - y1);
}
}var polect = this.filterType.getPoleCount ();
var zeroct = this.filterType.getZeroCount ();
var infoX = 10;
var ph = 0;
var pw = 0;
var cx = 0;
var cy = 0;
if (this.poleInfoView != null && (polect > 0 || zeroct > 0 || this.ferrisCheckItem.getState ())) {
ph = Clazz.doubleToInt (this.polesView.height / 2);
pw = ph;
cx = this.polesView.x + pw;
cy = this.polesView.y + ph;
infoX = cx + pw + 10;
if (!this.ferrisCheckItem.getState ()) {
g.setColor (java.awt.Color.white);
var fm = g.getFontMetrics ();
var s = "Poles/Zeros";
g.drawString (s, cx - Clazz.doubleToInt (fm.stringWidth (s) / 2), this.polesView.y - 5);
g.drawOval (cx - pw, cy - ph, pw * 2, ph * 2);
g.drawLine (cx, cy - ph, cx, cy + ph);
g.drawLine (cx - ph, cy, cx + ph, cy);
var c1 = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
for (i = 0; i != polect; i++) {
this.filterType.getPole (i, c1);
g.setColor (i == this.selectedPole ? java.awt.Color.yellow : java.awt.Color.white);
var c1x = cx + Clazz.doubleToInt (pw * c1.re);
var c1y = cy - Clazz.doubleToInt (ph * c1.im);
g.drawLine (c1x - 3, c1y - 3, c1x + 3, c1y + 3);
g.drawLine (c1x - 3, c1y + 3, c1x + 3, c1y - 3);
}
for (i = 0; i != zeroct; i++) {
this.filterType.getZero (i, c1);
g.setColor (i == this.selectedZero ? java.awt.Color.yellow : java.awt.Color.white);
var c1x = cx + Clazz.doubleToInt (pw * c1.re);
var c1y = cy - Clazz.doubleToInt (ph * c1.im);
g.drawOval (c1x - 3, c1y - 3, 6, 6);
}
}}if (this.poleInfoView != null) {
g.setColor (java.awt.Color.white);
var info =  new Array (10);
this.filterType.getInfo (info);
for (i = 0; i != 10; i++) if (info[i] == null) break;

if (this.wformInfo.needsFrequency ()) info[i++] = "Input Freq = " + Clazz.doubleToInt (this.inputW * this.sampleRate / (6.283185307179586)) + " Hz";
for (i = 0; i != 10; i++) {
if (info[i] == null) break;
g.drawString (info[i], infoX, this.poleInfoView.y + 5 + 20 * i);
}
if ((this.respView != null && this.respView.contains (this.mouseX, this.mouseY)) || (this.spectrumView != null && this.spectrumView.contains (this.mouseX, this.mouseY))) {
var f = this.getFreqFromX (this.mouseX, this.respView);
if (f >= 0) {
var fw = 2 * 3.141592653589793 * f;
f *= this.sampleRate;
g.setColor (java.awt.Color.yellow);
var s = "f = " + Clazz.doubleToInt (f);
if (this.respView.contains (this.mouseX, this.mouseY)) {
this.filterType.getResponse (fw, cc);
var bw = cc.magSquared ();
bw = Math.log (bw * bw) / (4.605170185988092);
s += " Hz, " + this.showFormat.format (10 * bw) + " dB, \u03bb = ";
s += this.showFormat.format (35396.0 / f) + " cm";
}g.drawString (s, infoX, this.poleInfoView.y + 5 + 20 * i);
if (ph > 0) {
var x = cx + Clazz.doubleToInt (pw * Math.cos (fw));
var y = cy - Clazz.doubleToInt (pw * Math.sin (fw));
if (this.ferrisCheckItem.getState ()) {
g.setColor (java.awt.Color.black);
g.fillOval (x - 3, y - 3, 7, 7);
}g.setColor (java.awt.Color.yellow);
g.fillOval (x - 2, y - 2, 5, 5);
}}}}if (this.impulseView != null) {
this.impulseView.drawLabel (g, "Impulse Response");
g.setColor (java.awt.Color.darkGray);
g.fillRect (this.impulseView.x, this.impulseView.y, this.impulseView.width, this.impulseView.height);
g.setColor (java.awt.Color.black);
g.drawLine (this.impulseView.x, this.impulseView.y + Clazz.doubleToInt (this.impulseView.height / 2), this.impulseView.x + this.impulseView.width - 1, this.impulseView.y + Clazz.doubleToInt (this.impulseView.height / 2));
g.setColor (java.awt.Color.white);
var offset = this.curFilter.getImpulseOffset ();
var impBuf = this.curFilter.getImpulseResponse (offset);
var len = this.curFilter.getImpulseLen (offset, impBuf);
var ox = -1;
var oy = -1;
var mult = .5 / this.max (impBuf);
var flen = (len < 50) ? 50 : len;
if (len < flen && flen < impBuf.length - offset) len = flen;
for (i = 0; i != len; i++) {
var k = offset + i;
var q = impBuf[k] * mult;
var y = this.impulseView.y + Clazz.doubleToInt (this.impulseView.height * (.5 - q));
var x = this.impulseView.x + Clazz.doubleToInt (this.impulseView.width * i / flen);
if (len < 100) {
g.drawLine (x, this.impulseView.y + Clazz.doubleToInt (this.impulseView.height / 2), x, y);
g.fillOval (x - 2, y - 2, 5, 5);
} else {
if (ox != -1) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}}
}if (this.stepView != null) {
this.stepView.drawLabel (g, "Step Response");
g.setColor (java.awt.Color.darkGray);
g.fillRect (this.stepView.x, this.stepView.y, this.stepView.width, this.stepView.height);
g.setColor (java.awt.Color.black);
g.drawLine (this.stepView.x, this.stepView.y + Clazz.doubleToInt (this.stepView.height / 2), this.stepView.x + this.stepView.width - 1, this.stepView.y + Clazz.doubleToInt (this.stepView.height / 2));
g.setColor (java.awt.Color.white);
var offset = this.curFilter.getStepOffset ();
var impBuf = this.curFilter.getStepResponse (offset);
var len = this.curFilter.getStepLen (offset, impBuf);
var ox = -1;
var oy = -1;
var mult = .5 / this.max (impBuf);
var flen = (len < 50) ? 50 : len;
if (len < flen && flen < impBuf.length - offset) len = flen;
for (i = 0; i != len; i++) {
var k = offset + i;
var q = impBuf[k] * mult;
var y = this.stepView.y + Clazz.doubleToInt (this.stepView.height * (.5 - q));
var x = this.stepView.x + Clazz.doubleToInt (this.stepView.width * i / flen);
if (len < 100) {
g.drawLine (x, this.stepView.y + Clazz.doubleToInt (this.stepView.height / 2), x, y);
g.fillOval (x - 2, y - 2, 5, 5);
} else {
if (ox != -1) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}}
}if (this.playThread != null) {
var splen = this.playThread.spectrumLen;
if (this.spectrumBuf == null || this.spectrumBuf.length != splen * 2) this.spectrumBuf =  Clazz.newDoubleArray (splen * 2, 0);
var off = this.playThread.spectrumOffset;
var i2;
var mask = this.playThread.fbufmask;
for (i = i2 = 0; i != splen; i++, i2 += 2) {
var o = mask & (off + i);
this.spectrumBuf[i2] = this.playThread.fbufLo[o] + this.playThread.fbufRo[o];
this.spectrumBuf[i2 + 1] = 0;
}
} else this.spectrumBuf = null;
if (this.waveformView != null && this.spectrumBuf != null) {
this.waveformView.drawLabel (g, "Waveform");
g.setColor (java.awt.Color.darkGray);
g.fillRect (this.waveformView.x, this.waveformView.y, this.waveformView.width, this.waveformView.height);
g.setColor (java.awt.Color.black);
g.drawLine (this.waveformView.x, this.waveformView.y + Clazz.doubleToInt (this.waveformView.height / 2), this.waveformView.x + this.waveformView.width - 1, this.waveformView.y + Clazz.doubleToInt (this.waveformView.height / 2));
g.setColor (java.awt.Color.white);
var ox = -1;
var oy = -1;
if (this.waveGain < .1) this.waveGain = .1;
var max = 0;
for (i = 0; i != this.spectrumBuf.length; i += 2) {
if (this.spectrumBuf[i] > max) max = this.spectrumBuf[i];
if (this.spectrumBuf[i] < -max) max = -this.spectrumBuf[i];
}
if (this.waveGain > 1 / max) this.waveGain = 1 / max;
 else if (this.waveGain * 1.05 < 1 / max) this.waveGain *= 1.05;
var mult = .5 * this.waveGain;
var nb = this.waveformView.width;
if (nb > this.spectrumBuf.length || this.allWaveformCheckItem.getState ()) nb = this.spectrumBuf.length;
for (i = 0; i < nb; i += 2) {
var bf = .5 - this.spectrumBuf[i] * mult;
var ya = Clazz.doubleToInt (this.waveformView.height * bf);
if (ya > this.waveformView.height) {
ox = -1;
continue;
}var y = this.waveformView.y + ya;
var x = this.waveformView.x + Clazz.doubleToInt (i * this.waveformView.width / nb);
if (ox != -1) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}
}if (this.spectrumView != null && this.spectrumBuf != null) {
this.spectrumView.drawLabel (g, "Spectrum");
g.setColor (java.awt.Color.darkGray);
g.fillRect (this.spectrumView.x, this.spectrumView.y, this.spectrumView.width, this.spectrumView.height);
g.setColor (java.awt.Color.black);
var ym = .138;
for (i = 0; ; i++) {
var q = ym * i;
if (q > 1) break;
var y = this.spectrumView.y + Clazz.doubleToInt (q * this.spectrumView.height);
g.drawLine (this.spectrumView.x, y, this.spectrumView.x + this.spectrumView.width, y);
}
for (i = 1; ; i++) {
var ll = this.logrange - i * Math.log (2);
var x = 0;
if (this.logFreqCheckItem.getState ()) x = Clazz.doubleToInt (ll * this.spectrumView.width / this.logrange);
 else x = Clazz.doubleToInt (this.spectrumView.width / (1 << i));
if (x <= 0) break;
x += this.spectrumView.x;
g.drawLine (x, this.spectrumView.y, x, this.spectrumView.bottom);
}
g.setColor (java.awt.Color.white);
var isub = Clazz.doubleToInt (this.spectrumBuf.length / 2);
var cosmult = 6.283185307179586 / (this.spectrumBuf.length - 2);
for (i = 0; i != this.spectrumBuf.length; i += 2) {
var ht = .54 - .46 * Math.cos (i * cosmult);
this.spectrumBuf[i] *= ht;
}
if (this.spectrumFFT == null || this.spectrumFFT.size != Clazz.doubleToInt (this.spectrumBuf.length / 2)) this.spectrumFFT = Clazz.innerTypeInstance (test.falstad.VowelFrame.FFT, this, null, Clazz.doubleToInt (this.spectrumBuf.length / 2));
this.spectrumFFT.transform (this.spectrumBuf, false);
var logmult = this.spectrumView.width / Math.log (Clazz.doubleToInt (this.spectrumBuf.length / 2) + 1);
var ox = -1;
var oy = -1;
var bufmult = 1. / (Clazz.doubleToInt (this.spectrumBuf.length / 2));
bufmult /= 65536;
bufmult *= bufmult;
var specArray =  Clazz.newDoubleArray (this.spectrumView.width, 0);
if (this.logFreqCheckItem.getState ()) {
for (i = 0; i != Clazz.doubleToInt (this.spectrumBuf.length / 2); i += 2) {
var f = i / this.spectrumBuf.length;
var ix = Clazz.doubleToInt (specArray.length * (Math.log (f) - this.minlog) / this.logrange);
if (ix < 0) continue;
specArray[ix] += this.spectrumBuf[i] * this.spectrumBuf[i] + this.spectrumBuf[i + 1] * this.spectrumBuf[i + 1];
}
} else {
for (i = 0; i != Clazz.doubleToInt (this.spectrumBuf.length / 2); i += 2) {
var ix = Clazz.doubleToInt (specArray.length * i * 2 / this.spectrumBuf.length);
specArray[ix] += this.spectrumBuf[i] * this.spectrumBuf[i] + this.spectrumBuf[i + 1] * this.spectrumBuf[i + 1];
}
}var maxi = specArray.length;
for (i = 0; i != this.spectrumView.width; i++) {
var bf = specArray[i] * bufmult;
bf = -ym * Math.log (bf) / 2.302585092994046;
var ya = Clazz.doubleToInt (this.spectrumView.height * bf);
if (ya > this.spectrumView.height) continue;
var y = this.spectrumView.y + ya;
var x = this.spectrumView.x + Clazz.doubleToInt (i * this.spectrumView.width / maxi);
g.drawLine (x, y, x, this.spectrumView.y + this.spectrumView.height - 1);
}
}if (this.spectrumView != null && !this.java2) {
g.setColor (java.awt.Color.white);
this.centerString (g, "Need java 2 for sound", this.spectrumView.y + Clazz.doubleToInt (this.spectrumView.height / 2));
}if (this.unstable) {
g.setColor (java.awt.Color.red);
this.centerString (g, "Filter is unstable", Clazz.doubleToInt (this.winSize.height / 2));
}if (this.mp3Error != null) {
g.setColor (java.awt.Color.red);
this.centerString (g, this.mp3Error, Clazz.doubleToInt (this.winSize.height / 2) + 20);
}if (this.respView != null && this.respView.contains (this.mouseX, this.mouseY)) {
g.setColor (java.awt.Color.yellow);
g.drawLine (this.mouseX, this.respView.y, this.mouseX, this.respView.y + this.respView.height - 1);
}if (this.spectrumView != null && this.spectrumView.contains (this.mouseX, this.mouseY)) {
g.setColor (java.awt.Color.yellow);
g.drawLine (this.mouseX, this.spectrumView.y, this.mouseX, this.spectrumView.y + this.spectrumView.height - 1);
}this.filterChanged = false;
realg.drawImage (this.dbimage, 0, 0, this);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "calcWave", 
function (f, wave) {
var ll =  Clazz.newIntArray (this.pipeRadius.length + 1, 0);
var i;
for (i = 0; i != ll.length; i++) ll[i] = i;

var resp =  Clazz.newDoubleArray (2, 0);
this.genPipeResponse (this.pipeRadius, f * 2, ll, resp, wave);
var m = 1 / wave[0].mag;
for (i = 0; i != wave.length; i++) wave[i].mult (m);

}, "~N,~A");
Clazz.defineMethod (c$, "setCutoff", 
function (f) {
}, "~N");
Clazz.defineMethod (c$, "countPoints", 
function (buf, offset) {
var len = buf.length;
var max = 0;
var i;
var result = 0;
var last = 123;
for (i = offset; i < len; i++) {
var qa = Math.abs (buf[i]);
if (qa > max) max = qa;
if (Math.abs (qa - last) > max * .003) {
result = i - offset + 1;
}last = qa;
}
return result;
}, "~A,~N");
Clazz.defineMethod (c$, "max", 
function (buf) {
var i;
var max = 0;
for (i = 0; i != buf.length; i++) {
var qa = Math.abs (buf[i]);
if (qa > max) max = qa;
}
return max;
}, "~A");
Clazz.defineMethod (c$, "getFreqFromX", 
function (x, v) {
var f = .5 * (x - v.x) / v.width;
if (f <= 0 || f >= .5) return -1;
if (this.logFreqCheckItem.getState ()) return Math.exp (this.minlog + 2 * f * this.logrange);
return f;
}, "~N,test.falstad.VowelFrame.View");
Clazz.defineMethod (c$, "setupFilter", 
function () {
var filt = this.filterChooser.getSelectedIndex ();
switch (filt) {
case 0:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.AVowelFilter, this, null);
break;
case 1:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.OVowelFilter, this, null);
break;
case 2:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.UVowelFilter, this, null);
break;
case 3:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.IVowelFilter, this, null);
break;
case 4:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.EVowelFilter, this, null);
break;
case 5:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.IBarVowelFilter, this, null);
break;
case 6:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.AVowelFilterSimple, this, null);
break;
case 7:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.IVowelFilterSimple, this, null);
break;
case 8:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.AEVowelFilterSimple, this, null);
break;
case 9:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.IhVowelFilterSimple, this, null);
break;
case 10:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.OoVowelFilterSimple, this, null);
break;
case 11:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.YVowelFilterSimple, this, null);
break;
case 12:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.OpenTubeFilter, this, null);
break;
case 13:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.CustomFilter, this, null);
break;
case 14:
this.filterType = Clazz.innerTypeInstance (test.falstad.VowelFrame.NoFilter, this, null);
break;
}
if (this.filterSelection != filt) {
this.filterSelection = filt;
var i;
for (i = 0; i != this.auxBars.length; i++) this.auxBars[i].setMaximum (999);

var ax = this.filterType.select ();
for (i = 0; i != ax; i++) {
this.auxLabels[i].show ();
this.auxBars[i].show ();
}
for (i = ax; i != this.auxBars.length; i++) {
this.auxLabels[i].hide ();
this.auxBars[i].hide ();
}
if (this.filterType.needsWindow ()) {
this.windowChooser.show ();
this.setWindow ();
} else {
this.windowChooser.hide ();
this.setWindow ();
}this.validate ();
}this.filterType.setup ();
this.curFilter = null;
});
Clazz.defineMethod (c$, "setInputLabel", 
function () {
this.wformInfo = this.getWaveformObject ();
var inText = this.wformInfo.getInputText ();
if (inText == null) {
this.inputLabel.hide ();
this.inputBar.hide ();
} else {
this.inputLabel.setText (inText);
this.inputLabel.show ();
this.inputBar.show ();
}this.validate ();
});
Clazz.defineMethod (c$, "getWaveformObject", 
function () {
var wform;
var ic = this.inputChooser.getSelectedIndex ();
switch (ic) {
case 0:
wform = Clazz.innerTypeInstance (test.falstad.VowelFrame.NoiseWaveform, this, null);
break;
case 1:
wform = Clazz.innerTypeInstance (test.falstad.VowelFrame.VocalWaveform, this, null);
break;
case 2:
wform = Clazz.innerTypeInstance (test.falstad.VowelFrame.SawtoothWaveform, this, null);
break;
case 3:
wform = Clazz.innerTypeInstance (test.falstad.VowelFrame.PeriodicNoiseWaveform, this, null);
break;
case 4:
wform = Clazz.innerTypeInstance (test.falstad.VowelFrame.TriangleWaveform, this, null);
break;
case 5:
wform = Clazz.innerTypeInstance (test.falstad.VowelFrame.SquareWaveform, this, null);
break;
case 6:
wform = Clazz.innerTypeInstance (test.falstad.VowelFrame.SineWaveform, this, null);
break;
case 7:
wform = Clazz.innerTypeInstance (test.falstad.VowelFrame.SweepWaveform, this, null);
break;
case 8:
wform = Clazz.innerTypeInstance (test.falstad.VowelFrame.ImpulseWaveform, this, null);
break;
default:
wform = Clazz.innerTypeInstance (test.falstad.VowelFrame.NoiseWaveform, this, null);
break;
}
return wform;
});
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
this.destroyFrame ();
return;
}if (e.getSource () === this.exportButton) this.doImport ();
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
if ((e.getSource ()) !== this.inputBar) this.setupFilter ();
System.out.print ((e.getSource ()).getValue () + "\n");
if ((e.getSource ()) === this.inputBar) this.setInputW ();
this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "setInputW", 
function () {
this.inputW = 3.141592653589793 * this.inputBar.getValue () / 1000.;
this.inputW /= 20;
});
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.VowelFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (this.playThread != null) this.playThread.requestShutdown ();
if (this.applet == null) this.dispose ();
 else this.applet.destroyFrame ();
});
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.mouseX = e.getX ();
this.mouseY = e.getY ();
this.edit (e);
this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
this.dragX = this.mouseX = e.getX ();
this.dragY = this.mouseY = e.getY ();
this.cv.repaint (this.pause);
if (this.respView != null && this.respView.contains (e.getX (), e.getY ())) this.selection = 1;
if (this.spectrumView != null && this.spectrumView.contains (e.getX (), e.getY ())) this.selection = 2;
if (this.pipeView != null && this.pipeView.contains (e.getX (), e.getY ())) this.selection = 3;
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "selectPoleZero", 
function (x, y) {
this.selectedPole = this.selectedZero = -1;
var i;
var ph = Clazz.doubleToInt (this.polesView.height / 2);
var pw = ph;
var cx = this.polesView.x + pw;
var cy = this.polesView.y + ph;
var c1 = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
var polect = this.filterType.getPoleCount ();
var zeroct = this.filterType.getZeroCount ();
var bestdist = 10000;
for (i = 0; i != polect; i++) {
this.filterType.getPole (i, c1);
var c1x = cx + Clazz.doubleToInt (pw * c1.re);
var c1y = cy - Clazz.doubleToInt (ph * c1.im);
var dist = this.distanceSq (c1x, c1y, x, y);
if (dist <= bestdist) {
bestdist = dist;
this.selectedPole = i;
this.selectedZero = -1;
}}
for (i = 0; i != zeroct; i++) {
this.filterType.getZero (i, c1);
var c1x = cx + Clazz.doubleToInt (pw * c1.re);
var c1y = cy - Clazz.doubleToInt (ph * c1.im);
var dist = this.distanceSq (c1x, c1y, x, y);
if (dist < bestdist) {
bestdist = dist;
this.selectedPole = -1;
this.selectedZero = i;
}}
}, "~N,~N");
Clazz.defineMethod (c$, "distanceSq", 
function (x1, y1, x2, y2) {
return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}, "~N,~N,~N,~N");
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
this.mouseMoved (e);
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "edit", 
function (e) {
if (this.selection == 2) {
if (!this.wformInfo.needsFrequency ()) return;
var f = this.getFreqFromX (e.getX (), this.spectrumView);
if (f < 0) return;
this.inputW = 2 * 3.141592653589793 * f;
this.inputBar.setValue (Clazz.doubleToInt (2000 * f));
}if (this.selection == 3) {
this.filterChooser.select (13);
this.editPipe (e);
}}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "editPipe", 
function (e) {
var x = e.getX ();
var y = e.getY ();
if (this.dragX == x) {
this.editPipePoint (x, y);
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
this.editPipePoint (x, y);
}
}this.setupFilter ();
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "editPipePoint", 
function (x, y) {
var xx = Clazz.doubleToInt ((x - this.pipeView.x) * this.pipeRadius.length / this.pipeView.width);
if (xx < 0 || xx >= this.pipeRadius.length) return;
var yy = (y - this.pipeView.y) / this.pipeView.height;
yy = (.5 - yy) / this.pipeView.mult;
this.pipeRadius[xx] = Math.abs (yy);
}, "~N,~N");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
this.filterChanged = true;
if (e.getSource () === this.displayCheck) {
this.cv.repaint (this.pause);
return;
}if (e.getSource () === this.inputChooser) {
if (this.playThread != null) this.playThread.requestShutdown ();
this.setInputLabel ();
}if ((e.getSource ()) === this.rateChooser) {
if (this.playThread != null) this.playThread.requestShutdown ();
this.inputW *= this.sampleRate;
switch (this.rateChooser.getSelectedIndex ()) {
case 0:
this.sampleRate = 8000;
break;
case 1:
this.sampleRate = 11025;
break;
case 2:
this.sampleRate = 16000;
break;
case 3:
this.sampleRate = 22050;
break;
case 4:
this.sampleRate = 32000;
break;
case 5:
this.sampleRate = 44100;
break;
}
this.inputW /= this.sampleRate;
}if ((e.getSource ()) === this.windowChooser) this.setWindow ();
if (Clazz.instanceOf (e.getSource (), swingjs.awt.CheckboxMenuItem)) this.handleResize ();
 else this.setupFilter ();
this.cv.repaint (this.pause);
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "setWindow", 
function () {
if (this.windowChooser.getSelectedIndex () == test.falstad.VowelFrame.WINDOW_KAISER && this.filterType.needsWindow ()) {
this.kaiserLabel.show ();
this.kaiserBar.show ();
} else {
this.kaiserLabel.hide ();
this.kaiserBar.hide ();
}this.validate ();
});
Clazz.defineMethod (c$, "setSampleRate", 
function (r) {
var x = 0;
switch (r) {
case 8000:
x = 0;
break;
case 11025:
x = 1;
break;
case 16000:
x = 2;
break;
case 22050:
x = 3;
break;
case 32000:
x = 4;
break;
case 44100:
x = 5;
break;
}
this.rateChooser.select (x);
this.sampleRate = r;
}, "~N");
Clazz.defineMethod (c$, "getOmegaText", 
function (wc) {
return (Clazz.doubleToInt (wc * this.sampleRate / (6.283185307179586))) + " Hz";
}, "~N");
Clazz.defineMethod (c$, "bessi0", 
function (x) {
var ax;
var ans;
var y;
if ((ax = Math.abs (x)) < 3.75) {
y = x / 3.75;
y *= y;
ans = 1.0 + y * (3.5156229 + y * (3.0899424 + y * (1.2067492 + y * (0.2659732 + y * (0.360768e-1 + y * 0.45813e-2)))));
} else {
y = 3.75 / ax;
ans = (Math.exp (ax) / Math.sqrt (ax)) * (0.39894228 + y * (0.1328592e-1 + y * (0.225319e-2 + y * (-0.00157565 + y * (0.916281e-2 + y * (-0.02057706 + y * (0.2635537e-1 + y * (-0.01647633 + y * 0.392377e-2))))))));
}return ans;
}, "~N");
Clazz.defineMethod (c$, "genPipeResponse", 
function (rad, maxf, lens, resp, wave) {
var n = 1 + rad.length;
var wi;
var zair = 40.3;
var dim = this.pipeLen;
dim /= lens[lens.length - 1];
dim *= 100;
var z =  Clazz.newDoubleArray (n + 1, 0);
z[0] = 200;
var i;
for (i = 0; i != rad.length; i++) z[i + 1] = zair / (3.141592653589793 * rad[i] * rad[i]);

var cond =  Clazz.newArray (n * 2, 4, null);
var rs =  new Array (n * 2);
for (wi = 1; wi != resp.length; wi++) {
var f = maxf * wi / resp.length;
var w = f * 2 * 3.141592653589793;
var k = w / 35396.0;
z[rad.length + 1] = zair * k * k / (12.566370614359172);
z[rad.length + 1] = z[rad.length] / 4;
for (i = 0; i != n; i++) {
var ii = i * 2;
var x = lens[i] * dim;
var i2 = ii + 1;
var alpha = (i == n - 1) ? 0 : .007 * Math.sqrt (1 / (rad[i] * rad[i])) * (.5 + f / 4000.);
if (!this.attenuationCheck.getState ()) alpha = 0;
cond[ii][0] = this.iexp (-k * x, -alpha * x, 1);
cond[ii][1] = this.iexp (k * x, alpha * x, 1);
cond[ii][2] = this.iexp (-k * x, -alpha * x, -1);
cond[ii][3] = this.iexp (k * x, alpha * x, -1);
cond[i2][0] = this.iexp (-k * x, -alpha * x, 1 / z[i]);
cond[i2][1] = this.iexp (k * x, alpha * x, -1 / z[i]);
cond[i2][2] = this.iexp (-k * x, -alpha * x, -1 / z[i + 1]);
cond[i2][3] = this.iexp (k * x, alpha * x, 1 / z[i + 1]);
}
var f100 = f / 100;
var envelope = this.envelopeCheck.getState () ? f100 / (1 + f100 * f100) : 1;
resp[wi] = this.solve (cond, n * 2, wave) * envelope;
}
resp[0] = resp[1];
}, "~A,~N,~A,~A,~A");
Clazz.defineMethod (c$, "solve", 
function (m, n, wave) {
var i;
var s0 = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null, 1, 0);
var s1 = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null, 0, 0);
var det = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
var rs0 = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
var rs1 = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
for (i = n - 2; i >= 0; i -= 2) {
rs0.set (0);
rs0.addMult (-1, m[i][2], s0);
rs0.addMult (-1, m[i][3], s1);
rs1.set (0);
rs1.addMult (-1, m[i + 1][2], s0);
rs1.addMult (-1, m[i + 1][3], s1);
det.set (0);
det.addMult (1, m[i][0], m[i + 1][1]);
det.addMult (-1, m[i][1], m[i + 1][0]);
s0.set (0);
s0.addMult (-1, m[i][1], rs1);
s0.addMult (1, m[i + 1][1], rs0);
s0.divide (det);
s1.set (0);
s1.addMult (1, m[i][0], rs1);
s1.addMult (-1, m[i + 1][0], rs0);
s1.divide (det);
if (wave != null) {
var cx = wave[Clazz.doubleToInt (i / 2)] = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null, s0);
cx.mult (m[i][0]);
var cy = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null, s1);
cy.mult (m[i][1]);
cx.add (cy);
}}
return 1 / s1.mag;
}, "~A,~N,~A");
Clazz.defineMethod (c$, "iexp", 
function (x, alpha, mul) {
var a = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
a.setMagPhase (Math.exp (alpha), x);
a.mult (mul);
return a;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "doImport", 
function () {
if (this.impDialog != null) {
this.requestFocus ();
this.impDialog.setVisible (false);
this.impDialog = null;
}var dump = "";
var i;
dump = "$ 0 " + this.pipeLen + " " + this.pipeRadius.length + "\n";
for (i = 0; i != this.pipeRadius.length; i++) dump += "p " + this.pipeRadius[i] + "\n";

this.impDialog = Clazz.innerTypeInstance (test.falstad.VowelFrame.ImportDialog, this, null, this, dump);
this.impDialog.show ();
});
Clazz.defineMethod (c$, "readImport", 
function (s) {
var b = s.getBytes ();
var len = s.length;
var p;
var x = 0;
var srci = 0;
var pi = 0;
this.filterChooser.select (13);
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
this.pipeLen =  new Double (st.nextToken ()).doubleValue ();
var radlen =  new Integer (st.nextToken ()).intValue ();
break;
}if (tint == 112) {
this.pipeRadius[pi++] =  new Double (st.nextToken ()).doubleValue ();
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
this.setupFilter ();
}, "~S");
c$.$VowelFrame$View$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.mult = 0;
this.right = 0;
this.bottom = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "View", java.awt.Rectangle);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, test.falstad.VowelFrame.View, [a, b, c, d]);
this.right = a + c - 1;
this.bottom = b + d - 1;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawLabel", 
function (a, b) {
a.setColor (java.awt.Color.white);
this.b$["test.falstad.VowelFrame"].centerString (a, b, this.y - 5);
}, "java.awt.Graphics,~S");
c$ = Clazz.p0p ();
};
c$.$VowelFrame$PhaseColor$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.r = 0;
this.g = 0;
this.b = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "PhaseColor");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.r = a;
this.g = b;
this.b = c;
}, "~N,~N,~N");
c$ = Clazz.p0p ();
};
c$.$VowelFrame$FFT$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.wtabf = null;
this.wtabi = null;
this.size = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "FFT");
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
if (e >= 8) {
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
}for (j = 16; j <= e; j <<= 1) {
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
c$.$VowelFrame$Waveform$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.buffer = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "Waveform");
Clazz.defineMethod (c$, "start", 
function () {
return true;
});
Clazz.defineMethod (c$, "getChannels", 
function () {
return 2;
});
Clazz.defineMethod (c$, "getBuffer", 
function () {
this.buffer =  Clazz.newShortArray (this.b$["test.falstad.VowelFrame"].getPower2 (Clazz.doubleToInt (this.b$["test.falstad.VowelFrame"].sampleRate / 12)) * this.getChannels (), 0);
});
Clazz.defineMethod (c$, "getInputText", 
function () {
return "Input Frequency";
});
Clazz.defineMethod (c$, "needsFrequency", 
function () {
return true;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$NoiseWaveform$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "NoiseWaveform", test.falstad.VowelFrame.Waveform, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.Waveform, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "start", 
function () {
this.getBuffer ();
return true;
});
Clazz.overrideMethod (c$, "getData", 
function () {
var a;
for (a = 0; a != this.buffer.length; a++) this.buffer[a] = this.b$["test.falstad.VowelFrame"].random.nextInt ();

return this.buffer.length;
});
Clazz.overrideMethod (c$, "getInputText", 
function () {
return null;
});
Clazz.overrideMethod (c$, "needsFrequency", 
function () {
return false;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$PeriodicNoiseWaveform$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.smbuf = null;
this.ix = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "PeriodicNoiseWaveform", test.falstad.VowelFrame.Waveform, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.Waveform, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getChannels", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "start", 
function () {
this.getBuffer ();
this.smbuf =  Clazz.newShortArray (1, 0);
this.ix = 0;
return true;
});
Clazz.overrideMethod (c$, "getData", 
function () {
var a = Clazz.doubleToInt (6.283185307179586 / this.b$["test.falstad.VowelFrame"].inputW);
if (a != this.smbuf.length) {
this.smbuf =  Clazz.newShortArray (a, 0);
var b;
for (b = 0; b != a; b++) this.smbuf[b] = this.b$["test.falstad.VowelFrame"].random.nextInt ();

}var b;
for (b = 0; b != this.buffer.length; b++, this.ix++) {
if (this.ix >= a) this.ix = 0;
this.buffer[b] = this.smbuf[this.ix];
}
return this.buffer.length;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$SineWaveform$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ix = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "SineWaveform", test.falstad.VowelFrame.Waveform, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.Waveform, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getChannels", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "start", 
function () {
this.getBuffer ();
this.ix = 0;
return true;
});
Clazz.overrideMethod (c$, "getData", 
function () {
var a;
for (a = 0; a != this.buffer.length; a++) {
this.ix++;
this.buffer[a] = Clazz.doubleToShort (Math.sin (this.ix * this.b$["test.falstad.VowelFrame"].inputW) * 32000);
}
return this.buffer.length;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$TriangleWaveform$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ix = 0;
this.smbuf = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "TriangleWaveform", test.falstad.VowelFrame.Waveform, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.Waveform, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getChannels", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "start", 
function () {
this.getBuffer ();
this.ix = 0;
this.smbuf =  Clazz.newShortArray (1, 0);
return true;
});
Clazz.overrideMethod (c$, "getData", 
function () {
var a;
var b = Clazz.doubleToInt (6.283185307179586 / this.b$["test.falstad.VowelFrame"].inputW);
if (b != this.smbuf.length) {
this.smbuf =  Clazz.newShortArray (b, 0);
var c = b / 2.;
for (a = 0; a < c; a++) this.smbuf[a] = Clazz.doubleToShort (a / c * 64000 - 32000);

for (; a != b; a++) this.smbuf[a] = Clazz.doubleToShort ((2 - a / c) * 64000 - 32000);

}for (a = 0; a != this.buffer.length; a++, this.ix++) {
if (this.ix >= b) this.ix = 0;
this.buffer[a] = this.smbuf[this.ix];
}
return this.buffer.length;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$SawtoothWaveform$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ix = 0;
this.smbuf = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "SawtoothWaveform", test.falstad.VowelFrame.Waveform, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.Waveform, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getChannels", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "start", 
function () {
this.getBuffer ();
this.ix = 0;
this.smbuf =  Clazz.newShortArray (1, 0);
return true;
});
Clazz.overrideMethod (c$, "getData", 
function () {
var a;
var b = Clazz.doubleToInt (6.283185307179586 / this.b$["test.falstad.VowelFrame"].inputW);
if (b != this.smbuf.length) {
this.smbuf =  Clazz.newShortArray (b, 0);
var c = b / 2.;
for (a = 0; a != b; a++) this.smbuf[a] = Clazz.doubleToShort ((a / c - 1) * 32000);

}for (a = 0; a != this.buffer.length; a++, this.ix++) {
if (this.ix >= b) this.ix = 0;
this.buffer[a] = this.smbuf[this.ix];
}
return this.buffer.length;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$VocalWaveform$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ix = 0;
this.period = 0;
this.p2 = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "VocalWaveform", test.falstad.VowelFrame.Waveform, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.Waveform, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getChannels", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "start", 
function () {
this.getBuffer ();
this.ix = 0;
return true;
});
Clazz.overrideMethod (c$, "getData", 
function () {
var a;
for (a = 0; a != this.buffer.length; a++, this.ix++) {
if (this.ix >= this.period) {
this.ix = 0;
this.period = Clazz.doubleToInt (6.283185307179586 / this.b$["test.falstad.VowelFrame"].inputW);
this.period += this.b$["test.falstad.VowelFrame"].getrand (3) - 1;
this.p2 = Clazz.doubleToInt (this.period / 2);
}this.buffer[a] = Clazz.doubleToShort ((this.ix / this.p2 - 1) * 32000);
}
return this.buffer.length;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$SquareWaveform$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ix = 0;
this.omega = 0;
this.smbuf = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "SquareWaveform", test.falstad.VowelFrame.Waveform, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.Waveform, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getChannels", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "start", 
function () {
this.getBuffer ();
this.ix = 0;
this.smbuf =  Clazz.newShortArray (1, 0);
return true;
});
Clazz.overrideMethod (c$, "getData", 
function () {
var a;
var b = Clazz.doubleToInt (6.283185307179586 / this.b$["test.falstad.VowelFrame"].inputW);
if (b != this.smbuf.length) {
this.smbuf =  Clazz.newShortArray (b, 0);
for (a = 0; a != Clazz.doubleToInt (b / 2); a++) this.smbuf[a] = 32000;

if ((b & 1) > 0) this.smbuf[a++] = 0;
for (; a != b; a++) this.smbuf[a] = -32000;

}for (a = 0; a != this.buffer.length; a++, this.ix++) {
if (this.ix >= b) this.ix = 0;
this.buffer[a] = this.smbuf[this.ix];
}
return this.buffer.length;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$SweepWaveform$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ix = 0;
this.omega = 0;
this.nextOmega = 0;
this.t = 0;
this.startOmega = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "SweepWaveform", test.falstad.VowelFrame.Waveform, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.Waveform, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getChannels", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "start", 
function () {
this.getBuffer ();
this.ix = 0;
this.startOmega = this.nextOmega = this.omega = 251.32741228718345 / this.b$["test.falstad.VowelFrame"].sampleRate;
this.t = 0;
return true;
});
Clazz.overrideMethod (c$, "getData", 
function () {
var a;
var b = 1;
var c = 0;
var d = 1 / (.66 * this.b$["test.falstad.VowelFrame"].sampleRate);
var e = Clazz.doubleToInt (1 / (this.b$["test.falstad.VowelFrame"].sampleRate * 16));
if (this.b$["test.falstad.VowelFrame"].logFreqCheckItem.getState ()) b = Math.pow (6.283185307179586 / this.startOmega, 2 * (e + (d - e) * this.b$["test.falstad.VowelFrame"].inputBar.getValue () / 1000.));
 else c = (6.283185307179586 - this.startOmega) * (e + (d - e) * this.b$["test.falstad.VowelFrame"].inputBar.getValue () / 1000.);
for (a = 0; a != this.buffer.length; a++) {
this.ix++;
this.t += this.omega;
if (this.t > 6.283185307179586) {
this.t -= 6.283185307179586;
this.omega = this.nextOmega;
if (this.nextOmega > 3.141592653589793) this.omega = this.nextOmega = this.startOmega;
}this.buffer[a] = Clazz.doubleToShort (Math.sin (this.t) * 32000);
this.nextOmega = this.nextOmega * b + c;
}
return this.buffer.length;
});
Clazz.overrideMethod (c$, "getInputText", 
function () {
return "Sweep Speed";
});
Clazz.overrideMethod (c$, "needsFrequency", 
function () {
return false;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$ImpulseWaveform$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ix = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "ImpulseWaveform", test.falstad.VowelFrame.Waveform, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.Waveform, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getChannels", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "start", 
function () {
this.getBuffer ();
this.ix = 0;
return true;
});
Clazz.overrideMethod (c$, "getData", 
function () {
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.VowelFrame"].inputBar.getValue () / 51) + 1;
var c = Clazz.doubleToInt (10000 / b);
for (a = 0; a != this.buffer.length; a++) {
var d = 0;
if (this.ix % c == 0) d = 32767;
this.ix++;
this.buffer[a] = d;
}
return this.buffer.length;
});
Clazz.overrideMethod (c$, "getInputText", 
function () {
return "Impulse Frequency";
});
Clazz.overrideMethod (c$, "needsFrequency", 
function () {
return false;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$PlayThread$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.line = null;
this.wform = null;
this.shutdownRequested = false;
this.stereo = false;
this.filt = null;
this.newFilter = null;
this.fbufLi = null;
this.fbufRi = null;
this.fbufLo = null;
this.fbufRo = null;
this.stateL = null;
this.stateR = null;
this.fbufmask = 0;
this.fbufsize = 0;
this.spectrumOffset = 0;
this.spectrumLen = 0;
this.inbp = 0;
this.outbp = 0;
this.spectCt = 0;
this.impulseBuf = null;
this.convolveBuf = null;
this.convBufPtr = 0;
this.convFFT = null;
this.ob = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "PlayThread", Thread);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.VowelFrame.PlayThread, []);
this.shutdownRequested = false;
});
Clazz.defineMethod (c$, "requestShutdown", 
function () {
this.shutdownRequested = true;
});
Clazz.defineMethod (c$, "setFilter", 
function (a) {
this.newFilter = a;
}, "test.falstad.VowelFrame.Filter");
Clazz.defineMethod (c$, "openLine", 
function () {
try {
this.stereo = (this.wform.getChannels () == 2);
var a =  new javax.sound.sampled.AudioFormat (this.b$["test.falstad.VowelFrame"].sampleRate, 16, 2, true, false);
var b =  new javax.sound.sampled.DataLine.Info (javax.sound.sampled.SourceDataLine, a);
if (!javax.sound.sampled.AudioSystem.isLineSupported (b)) {
throw  new javax.sound.sampled.LineUnavailableException ("sorry, the sound format cannot be played");
}this.line = javax.sound.sampled.AudioSystem.getLine (b);
this.line.open (a, this.b$["test.falstad.VowelFrame"].getPower2 (Clazz.doubleToInt (this.b$["test.falstad.VowelFrame"].sampleRate / 4)));
this.line.start ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "run", 
function () {
try {
this.doRun ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.line.close ();
this.b$["test.falstad.VowelFrame"].cv.repaint ();
this.b$["test.falstad.VowelFrame"].playThread = null;
});
Clazz.defineMethod (c$, "doRun", 
function () {
this.b$["test.falstad.VowelFrame"].rateChooser.enable ();
this.wform = this.b$["test.falstad.VowelFrame"].getWaveformObject ();
this.b$["test.falstad.VowelFrame"].mp3Error = null;
this.b$["test.falstad.VowelFrame"].unstable = false;
if (!this.wform.start ()) {
this.b$["test.falstad.VowelFrame"].cv.repaint ();
try {
Thread.sleep (1000);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return;
}this.fbufsize = 32768;
this.fbufmask = this.fbufsize - 1;
this.fbufLi =  Clazz.newDoubleArray (this.fbufsize, 0);
this.fbufRi =  Clazz.newDoubleArray (this.fbufsize, 0);
this.fbufLo =  Clazz.newDoubleArray (this.fbufsize, 0);
this.fbufRo =  Clazz.newDoubleArray (this.fbufsize, 0);
this.openLine ();
this.inbp = this.outbp = this.spectCt = 0;
var a = (this.stereo) ? 2 : 1;
this.b$["test.falstad.VowelFrame"].outputGain = 1;
this.newFilter = this.filt = this.b$["test.falstad.VowelFrame"].curFilter;
this.spectrumLen = this.b$["test.falstad.VowelFrame"].getPower2 (Clazz.doubleToInt (this.b$["test.falstad.VowelFrame"].sampleRate / 12));
var b = 0;
var c = true;
var d = false;
this.ob =  Clazz.newByteArray (16384, 0);
var e = 0;
while (!this.shutdownRequested && this.b$["test.falstad.VowelFrame"].soundCheck.getState () && (this.b$["test.falstad.VowelFrame"].applet == null || test.falstad.Vowel.ogf != null)) {
if (this.newFilter != null) {
b = 0;
c = true;
if (Clazz.instanceOf (this.wform, test.falstad.VowelFrame.SweepWaveform) || Clazz.instanceOf (this.wform, test.falstad.VowelFrame.SineWaveform)) c = false;
this.b$["test.falstad.VowelFrame"].outputGain = 1;
if (this.filt == null || this.filt.getLength () != this.newFilter.getLength ()) this.convBufPtr = this.inbp = this.outbp = this.spectCt = 0;
this.filt = this.newFilter;
this.newFilter = null;
this.impulseBuf = null;
d = this.filt.useConvolve ();
this.stateL = this.filt.createState ();
this.stateR = this.filt.createState ();
}var f = this.wform.getData ();
if (f == 0) break;
var g = this.wform.buffer;
var h;
var i = this.inbp;
for (h = 0; h < f; h += a) {
this.fbufLi[i] = g[h];
i = (i + 1) & this.fbufmask;
}
i = this.inbp;
if (this.stereo) {
for (h = 0; h < f; h += 2) {
this.fbufRi[i] = g[h + 1];
i = (i + 1) & this.fbufmask;
}
} else {
for (h = 0; h < f; h++) {
this.fbufRi[i] = this.fbufLi[i];
i = (i + 1) & this.fbufmask;
}
}var j = Clazz.doubleToInt (f / a);
if (d) this.doConvolveFilter (j, c);
 else {
this.doFilter (j);
if (this.b$["test.falstad.VowelFrame"].unstable) break;
var k = j * 4;
this.doOutput (k, c);
}if (this.b$["test.falstad.VowelFrame"].unstable) break;
if (this.spectCt >= this.spectrumLen) {
this.spectrumOffset = (this.outbp - this.spectrumLen) & this.fbufmask;
this.spectCt -= this.spectrumLen;
this.b$["test.falstad.VowelFrame"].cv.repaint ();
}b += j;
if (c && b >= this.b$["test.falstad.VowelFrame"].sampleRate) {
b = 0;
c = false;
}}
if (this.shutdownRequested || this.b$["test.falstad.VowelFrame"].unstable || !this.b$["test.falstad.VowelFrame"].soundCheck.getState ()) this.line.flush ();
 else this.line.drain ();
this.b$["test.falstad.VowelFrame"].cv.repaint ();
});
Clazz.defineMethod (c$, "doFilter", 
function (a) {
this.filt.run (this.fbufLi, this.fbufLo, this.inbp, this.fbufmask, a, this.stateL);
this.filt.run (this.fbufRi, this.fbufRo, this.inbp, this.fbufmask, a, this.stateR);
this.inbp = (this.inbp + a) & this.fbufmask;
var b = this.fbufLo[(this.inbp - 1) & this.fbufmask];
if (Double.isNaN (b) || Double.isInfinite (b)) this.b$["test.falstad.VowelFrame"].unstable = true;
}, "~N");
Clazz.defineMethod (c$, "doConvolveFilter", 
function (a, b) {
var c;
var d = this.inbp;
var e;
var f = (this.filt).aList;
var g = this.b$["test.falstad.VowelFrame"].getPower2 (512 + f.length * 2);
if (this.convolveBuf == null || this.convolveBuf.length != g) this.convolveBuf =  Clazz.newDoubleArray (g, 0);
if (this.impulseBuf == null) {
this.impulseBuf =  Clazz.newDoubleArray (g, 0);
for (c = 0; c != f.length; c++) this.impulseBuf[c * 2] = f[c];

this.convFFT = Clazz.innerTypeInstance (test.falstad.VowelFrame.FFT, this, null, Clazz.doubleToInt (this.convolveBuf.length / 2));
this.convFFT.transform (this.impulseBuf, false);
}var h = this.convBufPtr;
var i = this.convolveBuf.length + 2 - 2 * f.length;
for (c = 0; c != a; c++, d++) {
e = d & this.fbufmask;
this.convolveBuf[h] = this.fbufLi[e];
this.convolveBuf[h + 1] = this.fbufRi[e];
h += 2;
if (h == i) {
this.convFFT.transform (this.convolveBuf, false);
var j = 2. / g;
var k;
for (k = 0; k != g; k += 2) {
var l = this.convolveBuf[k] * this.impulseBuf[k] - this.convolveBuf[k + 1] * this.impulseBuf[k + 1];
var m = this.convolveBuf[k] * this.impulseBuf[k + 1] + this.convolveBuf[k + 1] * this.impulseBuf[k];
this.convolveBuf[k] = l * j;
this.convolveBuf[k + 1] = m * j;
}
this.convFFT.transform (this.convolveBuf, true);
var l = this.outbp;
var m;
var n = g - i;
for (k = 0; k != n; k += 2, l++) {
m = l & this.fbufmask;
this.fbufLo[m] += this.convolveBuf[k];
this.fbufRo[m] += this.convolveBuf[k + 1];
}
for (; k != g; k += 2, l++) {
m = l & this.fbufmask;
this.fbufLo[m] = this.convolveBuf[k];
this.fbufRo[m] = this.convolveBuf[k + 1];
}
h = 0;
this.doOutput (i * 2, b);
for (k = 0; k != g; k++) this.convolveBuf[k] = 0;

}}
this.inbp = d & this.fbufmask;
this.convBufPtr = h;
}, "~N,~B");
Clazz.defineMethod (c$, "doOutput", 
function (a, b) {
if (this.ob.length < a) this.ob =  Clazz.newByteArray (a, 0);
var c;
var d;
var e;
while (true) {
var f = 0;
d = this.outbp;
for (e = 0; e < a; e += 4) {
c = Clazz.doubleToInt (this.fbufLo[d] * this.b$["test.falstad.VowelFrame"].outputGain);
if (c > f) f = c;
if (c < -f) f = -c;
this.ob[e + 1] = (c >> 8);
this.ob[e] = c;
d = (d + 1) & this.fbufmask;
}
d = this.outbp;
for (e = 2; e < a; e += 4) {
c = Clazz.doubleToInt (this.fbufRo[d] * this.b$["test.falstad.VowelFrame"].outputGain);
if (c > f) f = c;
if (c < -f) f = -c;
this.ob[e + 1] = (c >> 8);
this.ob[e] = c;
d = (d + 1) & this.fbufmask;
}
if (f > 32767) {
this.b$["test.falstad.VowelFrame"].outputGain *= 30000. / f;
if (this.b$["test.falstad.VowelFrame"].outputGain < 1e-8 || Double.isInfinite (this.b$["test.falstad.VowelFrame"].outputGain)) {
this.b$["test.falstad.VowelFrame"].unstable = true;
break;
}continue;
} else if (b && f < 24000) {
if (f == 0) {
if (this.b$["test.falstad.VowelFrame"].outputGain == 1) break;
this.b$["test.falstad.VowelFrame"].outputGain = 1;
} else this.b$["test.falstad.VowelFrame"].outputGain *= 30000. / f;
continue;
}break;
}
if (this.b$["test.falstad.VowelFrame"].unstable) return;
var f = this.outbp;
this.outbp = d;
this.line.write (this.ob, 0, a);
this.spectCt += Clazz.doubleToInt (a / 4);
}, "~N,~B");
c$ = Clazz.p0p ();
};
c$.$VowelFrame$Complex$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.re = 0;
this.im = 0;
this.mag = 0;
this.phase = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "Complex");
Clazz.makeConstructor (c$, 
function () {
this.re = this.im = this.mag = this.phase = 0;
});
Clazz.makeConstructor (c$, 
function (a, b) {
this.set (a, b);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (a) {
this.set (a.re, a.im);
}, "test.falstad.VowelFrame.Complex");
Clazz.defineMethod (c$, "magSquared", 
function () {
return this.mag * this.mag;
});
Clazz.defineMethod (c$, "asString", 
function () {
return this.re + "+" + this.im + "i";
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
}, "test.falstad.VowelFrame.Complex");
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
}, "test.falstad.VowelFrame.Complex");
Clazz.defineMethod (c$, "subtract", 
function (a) {
this.re -= a.re;
this.im -= a.im;
this.setMagPhase ();
}, "test.falstad.VowelFrame.Complex");
Clazz.defineMethod (c$, "addMult", 
function (a, b) {
this.re += b.re * a;
this.im += b.im * a;
this.setMagPhase ();
}, "~N,test.falstad.VowelFrame.Complex");
Clazz.defineMethod (c$, "addMult", 
function (a, b, c) {
this.re += a * (b.re * c.re - b.im * c.im);
this.im += a * (b.re * c.im + b.im * c.re);
this.setMagPhase ();
}, "~N,test.falstad.VowelFrame.Complex,test.falstad.VowelFrame.Complex");
Clazz.defineMethod (c$, "square", 
function () {
this.set (this.re * this.re - this.im * this.im, 2 * this.re * this.im);
});
Clazz.defineMethod (c$, "sqrt", 
function () {
this.setMagPhase (Math.sqrt (this.mag), this.phase * .5);
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
}, "test.falstad.VowelFrame.Complex");
Clazz.defineMethod (c$, "setMagPhase", 
function () {
this.mag = Math.sqrt (this.re * this.re + this.im * this.im);
this.phase = Math.atan2 (this.im, this.re);
});
Clazz.defineMethod (c$, "setMagPhase", 
function (a, b) {
this.mag = a;
this.phase = b;
this.re = a * Math.cos (b);
this.im = a * Math.sin (b);
}, "~N,~N");
Clazz.defineMethod (c$, "recip", 
function () {
var a = this.re * this.re + this.im * this.im;
this.set (this.re / a, -this.im / a);
});
Clazz.defineMethod (c$, "divide", 
function (a) {
var b = a.re * a.re + a.im * a.im;
this.mult (a.re / b, -a.im / b);
}, "test.falstad.VowelFrame.Complex");
Clazz.defineMethod (c$, "rotate", 
function (a) {
this.setMagPhase (this.mag, (this.phase + a) % (6.283185307179586));
}, "~N");
Clazz.defineMethod (c$, "conjugate", 
function () {
this.im = -this.im;
this.phase = -this.phase;
});
Clazz.defineMethod (c$, "pow", 
function (a) {
var b = java.lang.Math.atan2 (this.im, this.re);
this.phase *= a;
var c = java.lang.Math.pow (this.re * this.re + this.im * this.im, a * .5);
this.setMagPhase (c, this.phase);
}, "~N");
c$ = Clazz.p0p ();
};
c$.$VowelFrame$Filter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "Filter");
Clazz.defineMethod (c$, "useConvolve", 
function () {
return false;
});
Clazz.defineMethod (c$, "getImpulseResponse", 
function (a) {
var b = 1000;
var c =  Clazz.newDoubleArray (a + b, 0);
var d =  Clazz.newDoubleArray (a + b, 0);
c[a] = 1;
var e = this.createState ();
this.run (c, d, a, -1, b, e);
return d;
}, "~N");
Clazz.defineMethod (c$, "getStepResponse", 
function (a) {
var b = 1000;
var c =  Clazz.newDoubleArray (a + b, 0);
var d =  Clazz.newDoubleArray (a + b, 0);
var e;
for (e = a; e != c.length; e++) c[e] = 1;

var f = this.createState ();
this.run (c, d, a, -1, b, f);
return d;
}, "~N");
Clazz.defineMethod (c$, "getImpulseLen", 
function (a, b) {
return this.b$["test.falstad.VowelFrame"].countPoints (b, a);
}, "~N,~A");
Clazz.defineMethod (c$, "getStepLen", 
function (a, b) {
return this.b$["test.falstad.VowelFrame"].countPoints (b, a);
}, "~N,~A");
Clazz.defineMethod (c$, "createState", 
function () {
return null;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$DirectFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.aList = null;
this.bList = null;
this.nList = null;
this.czn = null;
this.top = null;
this.bottom = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "DirectFilter", test.falstad.VowelFrame.Filter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.Filter, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.VowelFrame.DirectFilter, []);
this.aList = [1];
this.bList = null;
this.nList = [0];
});
Clazz.overrideMethod (c$, "getLength", 
function () {
return this.aList.length;
});
Clazz.overrideMethod (c$, "useConvolve", 
function () {
return this.bList == null && this.aList.length > 25;
});
Clazz.defineMethod (c$, "dump", 
function () {
System.out.print ("a ");
this.dump (this.aList);
if (this.bList != null) {
System.out.print ("b ");
this.dump (this.bList);
}});
Clazz.defineMethod (c$, "dump", 
function (a) {
var b;
for (b = 0; b != a.length; b++) System.out.print (a[b] + " ");

System.out.println ("");
}, "~A");
Clazz.overrideMethod (c$, "evalTransfer", 
function (a) {
if (this.czn == null) {
this.czn = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
this.top = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
this.bottom = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
}var b;
var c;
this.czn.set (1);
this.top.set (0);
this.bottom.set (0);
var d = 0;
for (b = 0; b != this.aList.length; b++) {
var e = this.nList[b];
while (d < e) {
if (d + 3 < e) {
this.czn.set (a);
this.czn.pow (-e);
d = e;
break;
}this.czn.divide (a);
d++;
}
this.top.addMult (this.aList[b], this.czn);
if (this.bList != null) this.bottom.addMult (this.bList[b], this.czn);
}
if (this.bList != null) this.top.divide (this.bottom);
a.set (this.top);
}, "test.falstad.VowelFrame.Complex");
Clazz.overrideMethod (c$, "run", 
function (a, b, c, d, e, f) {
var g;
var h = c;
var i;
var j = 0;
var k;
for (k = 0; k != e; k++) {
h = c + k;
i = h & d;
j = a[i] * this.aList[0];
if (this.bList == null) {
for (g = 1; g < this.aList.length; g++) {
var l = (h - this.nList[g]) & d;
j += a[l] * this.aList[g];
}
} else {
for (g = 1; g < this.aList.length; g++) {
var l = (h - this.nList[g]) & d;
j += a[l] * this.aList[g] - b[l] * this.bList[g];
}
}b[i] = j;
}
}, "~A,~A,~N,~N,~N,~A");
Clazz.defineMethod (c$, "isSimpleAList", 
function () {
if (this.bList != null) return false;
return this.nList[this.nList.length - 1] == this.nList.length - 1;
});
Clazz.overrideMethod (c$, "getImpulseOffset", 
function () {
if (this.isSimpleAList ()) return 0;
return this.getStepOffset ();
});
Clazz.overrideMethod (c$, "getStepOffset", 
function () {
var a;
var b = 0;
for (a = 0; a != this.aList.length; a++) if (this.nList[a] > b) b = this.nList[a];

return b;
});
Clazz.defineMethod (c$, "getImpulseResponse", 
function (a) {
if (this.isSimpleAList ()) return this.aList;
return Clazz.superCall (this, test.falstad.VowelFrame.DirectFilter, "getImpulseResponse", [a]);
}, "~N");
Clazz.overrideMethod (c$, "getImpulseLen", 
function (a, b) {
if (this.isSimpleAList ()) return this.aList.length;
return this.b$["test.falstad.VowelFrame"].countPoints (b, a);
}, "~N,~A");
c$ = Clazz.p0p ();
};
c$.$VowelFrame$CascadeFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.a1 = null;
this.a2 = null;
this.b0 = null;
this.b1 = null;
this.b2 = null;
this.size = 0;
this.cm2 = null;
this.cm1 = null;
this.top = null;
this.bottom = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "CascadeFilter", test.falstad.VowelFrame.Filter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.Filter, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.VowelFrame.CascadeFilter, []);
this.size = a;
this.a1 =  Clazz.newDoubleArray (a, 0);
this.a2 =  Clazz.newDoubleArray (a, 0);
this.b0 =  Clazz.newDoubleArray (a, 0);
this.b1 =  Clazz.newDoubleArray (a, 0);
this.b2 =  Clazz.newDoubleArray (a, 0);
var b;
for (b = 0; b != a; b++) this.b0[b] = 1;

}, "~N");
Clazz.overrideMethod (c$, "createState", 
function () {
return  Clazz.newDoubleArray (this.size * 3, 0);
});
Clazz.defineMethod (c$, "setAStage", 
function (a, b) {
var c;
for (c = 0; c != this.size; c++) {
if (this.a1[c] == 0 && this.a2[c] == 0) {
this.a1[c] = a;
this.a2[c] = b;
return;
}if (this.a2[c] == 0 && b == 0) {
this.a2[c] = -this.a1[c] * a;
this.a1[c] += a;
return;
}}
System.out.println ("setAStage failed");
}, "~N,~N");
Clazz.defineMethod (c$, "setBStage", 
function (a, b, c) {
var d;
for (d = 0; d != this.size; d++) {
if (this.b1[d] == 0 && this.b2[d] == 0) {
this.b0[d] = a;
this.b1[d] = b;
this.b2[d] = c;
return;
}if (this.b2[d] == 0 && c == 0) {
this.b2[d] = this.b1[d] * b;
this.b1[d] = this.b1[d] * a + this.b0[d] * b;
this.b0[d] *= a;
return;
}}
System.out.println ("setBStage failed");
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "run", 
function (a, b, c, d, e, f) {
var g;
var h;
var i;
var j;
var k = 0;
var l;
var m;
var n;
for (i = 0; i != e; i++) {
g = c + i;
h = g & d;
k = a[h];
for (j = 0; j != this.size; j++) {
var o = j * 3;
l = f[o + 2] = f[o + 1];
m = f[o + 1] = f[o];
n = f[o] = k + this.a1[j] * m + this.a2[j] * l;
k = this.b0[j] * n + this.b1[j] * m + this.b2[j] * l;
}
b[h] = k;
}
}, "~A,~A,~N,~N,~N,~A");
Clazz.overrideMethod (c$, "evalTransfer", 
function (a) {
if (this.cm1 == null) {
this.cm1 = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
this.cm2 = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
this.top = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
this.bottom = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
}var b;
this.cm1.set (a);
this.cm1.recip ();
this.cm2.set (this.cm1);
this.cm2.square ();
a.set (1);
for (b = 0; b != this.size; b++) {
this.top.set (this.b0[b]);
this.top.addMult (this.b1[b], this.cm1);
this.top.addMult (this.b2[b], this.cm2);
this.bottom.set (1);
this.bottom.addMult (-this.a1[b], this.cm1);
this.bottom.addMult (-this.a2[b], this.cm2);
a.mult (this.top);
a.divide (this.bottom);
}
}, "test.falstad.VowelFrame.Complex");
Clazz.overrideMethod (c$, "getImpulseOffset", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getStepOffset", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getLength", 
function () {
return 1;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$FilterType$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "FilterType");
Clazz.defineMethod (c$, "select", 
function () {
return 0;
});
Clazz.defineMethod (c$, "setup", 
function () {
});
Clazz.defineMethod (c$, "getPoleCount", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getZeroCount", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getPole", 
function (a, b) {
b.set (0);
}, "~N,test.falstad.VowelFrame.Complex");
Clazz.defineMethod (c$, "getZero", 
function (a, b) {
b.set (0);
}, "~N,test.falstad.VowelFrame.Complex");
Clazz.defineMethod (c$, "getInfo", 
function (a) {
}, "~A");
Clazz.defineMethod (c$, "needsWindow", 
function () {
return false;
});
Clazz.defineMethod (c$, "setCutoff", 
function (a) {
this.b$["test.falstad.VowelFrame"].auxBars[0].setValue (Clazz.doubleToInt (2000 * a));
}, "~N");
c$ = Clazz.p0p ();
};
c$.$VowelFrame$FIRFilterType$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.response = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "FIRFilterType", test.falstad.VowelFrame.FilterType, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.FilterType, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getResponse", 
function (a, b) {
if (this.response == null) {
b.set (0);
return;
}var c = Clazz.doubleToInt (this.response.length * a / (6.283185307179586));
c &= -2;
if (c < 0) c = 0;
if (c >= this.response.length) c = this.response.length - 2;
b.set (this.response[c], this.response[c + 1]);
}, "~N,test.falstad.VowelFrame.Complex");
Clazz.defineMethod (c$, "getWindow", 
function (a, b) {
if (b == 1) return 1;
var c = 2 * 3.141592653589793 * a / (b - 1);
var d = Clazz.doubleToInt (b / 2);
switch (this.b$["test.falstad.VowelFrame"].windowChooser.getSelectedIndex ()) {
case 0:
return 1;
case 1:
return .54 - .46 * Math.cos (c);
case 2:
return .5 - .5 * Math.cos (c);
case 3:
return .42 - .5 * Math.cos (c) + .08 * Math.cos (2 * c);
case 4:
{
var e = this.b$["test.falstad.VowelFrame"].kaiserBar.getValue () * 3.141592653589793 / 120.;
var f = (2 * a / b) - 1;
return this.b$["test.falstad.VowelFrame"].bessi0 (e * Math.sqrt (1 - f * f));
}case 5:
return (a < d) ? a / d : 2 - a / d;
case 6:
{
var e = (a - d) / d;
return 1 - e * e;
}}
return 0;
}, "~N,~N");
Clazz.defineMethod (c$, "setResponse", 
function (a) {
this.setResponse (a, 0);
}, "test.falstad.VowelFrame.DirectFilter");
Clazz.defineMethod (c$, "setResponse", 
function (a, b) {
this.response =  Clazz.newDoubleArray (8192, 0);
var c;
if (a.nList.length != a.aList.length) {
a.nList =  Clazz.newIntArray (a.aList.length, 0);
for (c = 0; c != a.aList.length; c++) a.nList[c] = c;

}for (c = 0; c != a.aList.length; c++) this.response[a.nList[c] * 2] = a.aList[c];

Clazz.innerTypeInstance (test.falstad.VowelFrame.FFT, this, null, Clazz.doubleToInt (this.response.length / 2)).transform (this.response, false);
var d = 0;
var e;
var f = Clazz.innerTypeInstance (test.falstad.VowelFrame.Complex, this, null);
for (e = 0; e != this.response.length; e += 2) {
f.set (this.response[e], this.response[e + 1]);
f.rotate (-b * 2 * 3.141592653589793 * e / this.response.length);
var g = f.magSquared ();
if (d < g) d = g;
this.response[e] = f.re;
this.response[e + 1] = f.im;
}
d = Math.sqrt (d);
for (e = 0; e != this.response.length; e++) this.response[e] /= d;

for (e = 0; e != a.aList.length; e++) a.aList[e] /= d;

}, "test.falstad.VowelFrame.DirectFilter,~N");
c$ = Clazz.p0p ();
};
c$.$VowelFrame$PipeFIRFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "PipeFIRFilter", test.falstad.VowelFrame.FIRFilterType, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.FIRFilterType, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.VowelFrame"].auxLabels[0].setText ("Total Length");
this.b$["test.falstad.VowelFrame"].auxBars[0].setValue (176);
this.b$["test.falstad.VowelFrame"].auxBars[0].setMaximum (1000);
return 1;
});
Clazz.defineMethod (c$, "compressedPipeResponse", 
function (a, b) {
var c;
var d;
var e = -1;
for (c = d = 0; c != a.length; c++) {
if (a[c] != e) d++;
e = a[c];
}
var f =  Clazz.newDoubleArray (d, 0);
var g =  Clazz.newIntArray (d + 1, 0);
e = -1;
g[0] = 0;
for (c = d = 0; c != a.length; c++) {
if (a[c] != e) e = f[d++] = a[c];
g[d] = c;
}
this.b$["test.falstad.VowelFrame"].genPipeResponse (f, Clazz.doubleToInt (this.b$["test.falstad.VowelFrame"].sampleRate / 2), g, b, null);
}, "~A,~A");
Clazz.overrideMethod (c$, "genFilter", 
function () {
var a = 16;
var b = 256;
while (a < b) a *= 2;

var c =  Clazz.newDoubleArray (a, 0);
this.b$["test.falstad.VowelFrame"].pipeLen = this.b$["test.falstad.VowelFrame"].auxBars[0].getValue () / 1000.;
if (this.b$["test.falstad.VowelFrame"].compressCheck.getState ()) this.compressedPipeResponse (this.b$["test.falstad.VowelFrame"].pipeRadius, c);
 else {
var d =  Clazz.newIntArray (this.b$["test.falstad.VowelFrame"].pipeRadius.length + 1, 0);
var e;
for (e = 0; e != d.length; e++) d[e] = e;

this.b$["test.falstad.VowelFrame"].genPipeResponse (this.b$["test.falstad.VowelFrame"].pipeRadius, Clazz.doubleToInt (this.b$["test.falstad.VowelFrame"].sampleRate / 2), d, c, null);
}var d = c.length * 4;
var e =  Clazz.newDoubleArray (d, 0);
var f;
var g = Clazz.doubleToInt (d / 2);
var h = Clazz.doubleToInt (g / 2);
for (f = 0; f != h; f++) {
var i = c[f] / g;
e[f * 2] = i;
if (f > 0) e[d - f * 2] = i;
}
Clazz.innerTypeInstance (test.falstad.VowelFrame.FFT, this, null, g).transform (e, true);
var i = Clazz.innerTypeInstance (test.falstad.VowelFrame.DirectFilter, this, null);
i.aList =  Clazz.newDoubleArray (b, 0);
i.nList =  Clazz.newIntArray (b, 0);
for (f = 0; f != b; f++) {
var j = (f - Clazz.doubleToInt (b / 2)) * 2;
i.aList[f] = e[j & (d - 1)] * this.getWindow (f, b);
i.nList[f] = f;
}
this.setResponse (i, Clazz.doubleToInt (b / 2));
return i;
});
Clazz.overrideMethod (c$, "getInfo", 
function (a) {
a[0] = "Length: " + this.b$["test.falstad.VowelFrame"].auxBars[0].getValue () + " mm";
}, "~A");
Clazz.defineMethod (c$, "areaToRadius", 
function (a) {
return Math.sqrt (a / 3.141592653589793);
}, "~N");
Clazz.overrideMethod (c$, "needsWindow", 
function () {
return true;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$IBarVowelFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.data = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "IBarVowelFilter", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.prepareFields (c$, function () {
this.data = [6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.42857, 2.83929, 2.73214, 3.13393, 3.29464, 3.45536, 3.45536, 4.58036, 5.49107, 6.45536, 6.96429, 7.33929, 7.66071, 7.84821, 8.03571, 8.19643, 8.30357, 8.38393, 8.41071, 8.38393, 8.35714, 8.25, 8.14286, 8.14286, 7.98214, 7.82143, 7.58036, 7.3125, 6.75, 6.02679, 5.22321, 4.6875, 4.28571, 3.96429, 3.66964, 3.40179, 3.13393, 2.91964, 2.75893, 2.625, 2.625, 2.51786, 2.4375, 2.35714, 2.27679, 2.19643, 2.11607, 2.0625, 2.00893, 1.95536, 1.875, 1.79464, 1.71429, 1.66071, 1.60714, 1.52679, 1.52679, 1.47321, 1.41964, 1.36607, 1.3125, 1.25893, 1.20536, 1.15179, 1.125, 1.09821, 1.07143, 1.04464, 1.04464, 1.01786, 1.01786, 1.01786, 1.01786, 1.01786, 1.04464, 1.09821, 1.15179, 1.17857, 1.23214, 1.28571, 1.39286, 1.47321, 1.60714, 1.76786, 1.95536, 2.16964, 2.35714, 2.46429, 2.51786, 2.35714, 2.35714, 2.0625, 1.79464, 1.71429, 1.79464, 2.86607, 3.375, 3.85714, 4.125, 4.33929, 4.55357, 4.76786, 4.92857, 5.11607, 5.30357, 5.46429, 5.46429, 5.59821, 5.75893, 5.89286, 6.10714, 6.26786, 6.42857, 6.61607, 6.75, 6.96429, 7.125, 7.25893, 7.47321, 7.6875, 7.875, 8.08929, 8.33036, 8.33036, 8.625, 8.83929, 9.13393, 9.375, 9.58929, 9.80357, 10.0179, 10.1786, 10.3125, 10.4196, 10.5, 10.6071, 10.6607, 10.7143, 10.7679, 10.8482, 10.8482, 10.875, 10.9018, 10.9286, 10.9821, 10.9821, 11.0089, 11.0089, 11.0357, 11.0357, 11.0625, 11.0357, 11.0625, 11.0625, 11.0625, 11.0625, 11.0625, 11.0625, 11.0893, 11.0893, 11.0893, 11.0893, 11.0625, 11.0625, 11.1161, 11.0893, 11.0625, 11.0625, 11.0625, 10.9018, 3.58929, 3.375, 3.21429, 3.21429, 3.13393, 3.08036, 3.05357, 3.02679, 3.02679, 3.02679, 3, 3.02679, 3.02679, 3, 3, 3, 2.97321, 2.94643, 2.97321];
});
Clazz.defineMethod (c$, "select", 
function () {
var a = Clazz.superCall (this, test.falstad.VowelFrame.IBarVowelFilter, "select", []);
var b;
for (b = 0; b != this.b$["test.falstad.VowelFrame"].pipeRadius.length; b++) this.b$["test.falstad.VowelFrame"].pipeRadius[this.b$["test.falstad.VowelFrame"].pipeRadius.length - 1 - b] = this.areaToRadius (this.data[b]);

this.b$["test.falstad.VowelFrame"].auxBars[a - 1].setValue (190);
return a;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$IVowelFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.data = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "IVowelFilter", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.prepareFields (c$, function () {
this.data = [8.74254, 8.74254, 7.71642, 7.18284, 6.64925, 5.99254, 4.96642, 4.63806, 4.55597, 4.43284, 4.02239, 2.95522, 2.87313, 2.83209, 2.83209, 2.83209, 2.83209, 2.79104, 2.25746, 1.76493, 1.76493, 1.76493, 1.68284, 1.64179, 1.60075, 1.5597, 1.47761, 1.35448, 1.31343, 1.1903, 1.10821, 1.10821, 1.02612, 0.985075, 0.94403, 0.86194, 0.779851, 0.738806, 0.656716, 0.656716, 0.656716, 0.656716, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.615672, 0.615672, 0.615672, 0.615672, 0.574627, 0.574627, 0.574627, 0.574627, 0.615672, 0.656716, 0.615672, 0.615672, 0.656716, 0.697761, 0.697761, 0.697761, 0.697761, 0.738806, 0.779851, 0.779851, 0.820896, 0.779851, 0.779851, 0.902985, 0.902985, 0.985075, 1.10821, 1.23134, 1.39552, 1.51866, 1.72388, 1.84701, 2.05224, 2.17537, 2.42164, 2.66791, 2.87313, 3.20149, 3.5709, 3.65299, 4.06343, 4.39179, 4.72015, 5.37687, 5.66418, 6.15672, 6.85448, 7.01866, 7.34701, 7.4291, 7.55224, 7.71642, 7.79851, 7.79851, 7.75746, 7.71642, 7.59328, 7.47015, 7.30597, 7.22388, 7.34701, 7.79851, 9.11194, 10.0149, 10.2612, 10.5075, 10.8358, 10.8769, 10.9179, 10.959, 11, 11.041, 11, 11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11, 10.959, 10.9179, 10.8358, 10.7948, 10.7127, 10.6306, 10.5075, 10.4664, 10.3433, 10.2612, 10.1381, 10.056, 10.056, 9.85075, 9.72761, 9.64552, 9.52239, 9.39925, 9.35821, 9.27612, 9.19403, 9.11194, 9.02985, 8.94776, 8.86567, 8.78358, 8.74254, 8.66045, 8.66045, 8.53731, 8.45522, 8.37313, 8.33209, 8.29104, 8.25, 8.20896, 8.20896, 8.20896, 8.16791, 8.16791, 8.12687, 8.08582, 8.04478, 7.83955, 2.87313, 2.62687, 2.54478, 2.54478, 2.46269, 2.42164, 2.46269, 2.46269, 2.46269, 2.54478, 2.58582, 2.66791, 2.66791, 2.75, 2.79104, 2.83209, 2.87313, 2.91418, 2.99627, 3.03731];
});
Clazz.defineMethod (c$, "select", 
function () {
var a = Clazz.superCall (this, test.falstad.VowelFrame.IVowelFilter, "select", []);
var b;
for (b = 0; b != this.b$["test.falstad.VowelFrame"].pipeRadius.length; b++) this.b$["test.falstad.VowelFrame"].pipeRadius[this.b$["test.falstad.VowelFrame"].pipeRadius.length - 1 - b] = this.areaToRadius (this.data[b]);

this.b$["test.falstad.VowelFrame"].auxBars[a - 1].setValue (170);
return a;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$EVowelFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.data = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "EVowelFilter", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.prepareFields (c$, function () {
this.data = [10.2, 10.2, 10.2, 9.31174, 8.98785, 8.70445, 8.54251, 8.34008, 7.85425, 5.91093, 5.34413, 5.26316, 5.18219, 5.06073, 4.97976, 4.93927, 4.93927, 4.97976, 5.06073, 5.10121, 5.10121, 5.06073, 5.06073, 4.89879, 4.69636, 4.49393, 4.21053, 4.0081, 3.80567, 3.64372, 3.48178, 3.15789, 2.99595, 2.67206, 2.46964, 2.38866, 2.26721, 2.14575, 2.14575, 2.10526, 2.10526, 2.18623, 2.18623, 2.30769, 2.34818, 2.42915, 2.46964, 2.55061, 2.63158, 2.67206, 2.75304, 2.83401, 2.95547, 2.99595, 3.07692, 3.19838, 3.23887, 3.23887, 3.36032, 3.4413, 3.56275, 3.56275, 3.64372, 3.64372, 3.7247, 3.80567, 3.84615, 3.92713, 4.0081, 4.04858, 4.12955, 4.17004, 4.21053, 4.33198, 4.41296, 4.49393, 4.49393, 4.5749, 4.65587, 4.69636, 4.77733, 4.8583, 4.89879, 5.06073, 5.26316, 5.30364, 5.4251, 5.66802, 5.78947, 6.03239, 6.11336, 6.31579, 6.51822, 6.63968, 6.80162, 6.92308, 7.12551, 7.24696, 7.36842, 7.40891, 7.40891, 7.40891, 7.32794, 7.20648, 7.04453, 6.80162, 6.72065, 6.80162, 6.92308, 7.32794, 7.85425, 8.25911, 8.8664, 9.06883, 9.4332, 9.55466, 9.67611, 9.79757, 9.79757, 9.87854, 9.91903, 9.95951, 9.95951, 10, 9.95951, 9.95951, 9.95951, 9.95951, 9.91903, 9.87854, 9.83806, 9.79757, 9.75709, 9.67611, 9.63563, 9.55466, 9.47368, 9.39271, 9.35223, 9.23077, 9.19028, 9.1498, 8.98785, 8.82591, 8.70445, 8.66397, 8.54251, 8.34008, 8.13765, 7.93522, 7.85425, 7.69231, 7.65182, 7.53036, 7.36842, 7.16599, 7.08502, 6.96356, 6.84211, 6.72065, 6.43725, 6.35628, 6.23482, 6.19433, 6.07287, 6.03239, 5.9919, 5.9919, 5.95142, 5.91093, 5.95142, 5.91093, 5.91093, 5.95142, 5.95142, 5.95142, 5.54656, 1.53846, 1.417, 1.417, 1.417, 1.417, 1.417, 1.45749, 1.53846, 1.61943, 1.61943, 1.65992, 1.78138, 1.78138, 1.94332, 2.06478, 2.14575, 2.22672, 2.30769, 2.38866, 2.51012, 2.59109, 2.63158, 2.75304];
});
Clazz.defineMethod (c$, "select", 
function () {
var a = Clazz.superCall (this, test.falstad.VowelFrame.EVowelFilter, "select", []);
var b;
for (b = 0; b != this.b$["test.falstad.VowelFrame"].pipeRadius.length; b++) this.b$["test.falstad.VowelFrame"].pipeRadius[this.b$["test.falstad.VowelFrame"].pipeRadius.length - 1 - b] = this.areaToRadius (this.data[b]);

this.b$["test.falstad.VowelFrame"].auxBars[a - 1].setValue (170);
return a;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$OpenTubeFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "OpenTubeFilter", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "select", 
function () {
var a = Clazz.superCall (this, test.falstad.VowelFrame.OpenTubeFilter, "select", []);
var b;
for (b = 0; b != this.b$["test.falstad.VowelFrame"].pipeRadius.length; b++) this.b$["test.falstad.VowelFrame"].pipeRadius[b] = this.areaToRadius (6.5);

return a;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$CustomFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "CustomFilter", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "select", 
function () {
var a = Clazz.superCall (this, test.falstad.VowelFrame.CustomFilter, "select", []);
this.b$["test.falstad.VowelFrame"].auxBars[0].setValue (Clazz.doubleToInt (this.b$["test.falstad.VowelFrame"].pipeLen * 1000));
return a;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$AVowelFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.data = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "AVowelFilter", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.prepareFields (c$, function () {
this.data = [6.08276, 6.08276, 6.08276, 6.08276, 6.08276, 6.05379, 5.93793, 5.59034, 5.18483, 5.01103, 4.92414, 4.89517, 4.86621, 4.86621, 4.86621, 4.86621, 4.86621, 4.89517, 4.9531, 5.04, 5.18483, 5.38759, 5.67724, 5.93793, 6.14069, 6.31448, 6.48828, 6.6331, 6.74897, 6.89379, 7.00966, 7.09655, 7.24138, 7.35724, 7.44414, 7.53103, 7.6469, 7.73379, 7.79172, 7.87862, 7.93655, 7.96552, 8.02345, 8.05241, 8.11034, 8.13931, 8.19724, 8.19724, 8.25517, 8.28414, 8.34207, 8.37103, 8.37103, 8.4, 8.42897, 8.4, 8.4, 8.4, 8.34207, 8.3131, 8.28414, 8.22621, 8.16828, 8.13931, 8.05241, 7.99448, 7.93655, 7.84966, 7.79172, 7.70483, 7.6469, 7.50207, 7.38621, 7.27034, 7.12552, 6.98069, 6.89379, 6.77793, 6.60414, 6.43034, 6.25655, 6.08276, 5.93793, 5.73517, 5.56138, 5.38759, 5.21379, 5.09793, 4.89517, 4.69241, 4.54759, 4.31586, 4.02621, 3.82345, 3.64966, 3.36, 3.09931, 2.86759, 2.54897, 2.17241, 1.85379, 1.73793, 1.68, 1.73793, 1.96966, 2.11448, 2.57793, 2.75172, 2.95448, 3.07034, 3.04138, 3.04138, 2.98345, 2.89655, 2.78069, 2.66483, 2.52, 2.37517, 2.28828, 2.17241, 2.02759, 1.96966, 1.88276, 1.79586, 1.68, 1.65103, 1.53517, 1.47724, 1.39034, 1.30345, 1.21655, 1.12966, 1.04276, 1.04276, 0.984828, 0.955862, 0.926897, 0.926897, 0.868966, 0.868966, 0.811034, 0.811034, 0.724138, 0.782069, 0.811034, 0.84, 0.811034, 0.868966, 0.868966, 0.84, 0.897931, 0.926897, 0.926897, 0.984828, 1.04276, 1.07172, 1.15862, 1.24552, 1.30345, 1.36138, 1.50621, 1.5931, 1.7669, 1.82483, 2.02759, 2.17241, 2.4331, 2.54897, 2.80966, 3.04138, 3.36, 3.50483, 3.67862, 3.85241, 4.02621, 4.08414, 4.05517, 3.99724, 3.09931, 1.44828, 1.36138, 1.33241, 1.36138, 1.36138, 1.44828, 1.47724, 1.53517, 1.56414, 1.65103, 1.73793, 1.82483, 1.91172, 1.99862, 2.11448, 2.17241, 2.25931, 2.37517, 2.46207, 2.54897, 2.63586];
});
Clazz.defineMethod (c$, "select", 
function () {
var a = Clazz.superCall (this, test.falstad.VowelFrame.AVowelFilter, "select", []);
this.b$["test.falstad.VowelFrame"].auxBars[a - 1].setValue (190);
this.b$["test.falstad.VowelFrame"].auxLabels[a].setText ("Pharynx Width");
this.b$["test.falstad.VowelFrame"].auxBars[a].setValue (100);
this.b$["test.falstad.VowelFrame"].auxBars[a].setMaximum (200);
this.b$["test.falstad.VowelFrame"].auxLabels[a + 1].setText ("Mouth Width");
this.b$["test.falstad.VowelFrame"].auxBars[a + 1].setValue (100);
this.b$["test.falstad.VowelFrame"].auxBars[a + 1].setMaximum (200);
return a + 2;
});
Clazz.defineMethod (c$, "genFilter", 
function () {
var a;
var b = this.b$["test.falstad.VowelFrame"].auxBars[1].getValue () / 100.;
var c = this.b$["test.falstad.VowelFrame"].auxBars[2].getValue () / 100.;
for (a = 0; a != 100; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[this.b$["test.falstad.VowelFrame"].pipeRadius.length - 1 - a] = this.areaToRadius (this.data[a]) * c;

for (; a != this.b$["test.falstad.VowelFrame"].pipeRadius.length; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[this.b$["test.falstad.VowelFrame"].pipeRadius.length - 1 - a] = this.areaToRadius (this.data[a]) * b;

return Clazz.superCall (this, test.falstad.VowelFrame.AVowelFilter, "genFilter", []);
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$AVowelFilterSimple$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "AVowelFilterSimple", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.VowelFrame.AVowelFilterSimple, "select", []);
this.b$["test.falstad.VowelFrame"].auxLabels[1].setText ("1st Section Length");
this.b$["test.falstad.VowelFrame"].auxBars[1].setValue (Clazz.doubleToInt (109.09090909090908));
this.b$["test.falstad.VowelFrame"].auxBars[1].setMaximum (200);
return 2;
});
Clazz.defineMethod (c$, "genFilter", 
function () {
var a;
for (a = 0; a < this.b$["test.falstad.VowelFrame"].auxBars[1].getValue (); a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (1);

for (; a != this.b$["test.falstad.VowelFrame"].pipeRadius.length; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (8);

return Clazz.superCall (this, test.falstad.VowelFrame.AVowelFilterSimple, "genFilter", []);
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$AEVowelFilterSimple$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "AEVowelFilterSimple", test.falstad.VowelFrame.AVowelFilterSimple, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.AVowelFilterSimple, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.VowelFrame.AEVowelFilterSimple, "select", []);
this.b$["test.falstad.VowelFrame"].auxBars[1].setValue (66);
return 2;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$OVowelFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.data = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "OVowelFilter", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.prepareFields (c$, function () {
this.data = [3.8, 3.8, 3.8, 3.86077, 3.53659, 3.4187, 3.35976, 3.30081, 3.30081, 3.24187, 3.33028, 3.38923, 3.59553, 3.89024, 4.15549, 4.30285, 4.56809, 4.8628, 5.03963, 6.07114, 7.39736, 8.4878, 9.75508, 10.6687, 11.1402, 11.8476, 12.6138, 13.3506, 13.4685, 13.7632, 13.9695, 14.1169, 14.2053, 14.3526, 14.4116, 14.5, 14.5, 14.5, 14.5, 14.4411, 14.3526, 14.2348, 13.999, 13.2033, 12.4959, 11.9949, 11.5528, 11.1697, 10.9929, 10.6982, 10.4329, 10.2856, 10.0793, 9.93191, 9.78455, 9.60772, 9.46037, 9.25407, 9.13618, 8.98882, 8.87093, 8.72358, 8.57622, 8.42886, 8.2815, 8.10467, 7.92785, 7.78049, 7.63313, 7.54472, 7.33841, 7.22053, 7.10264, 6.98476, 6.80793, 6.6311, 6.4248, 6.30691, 6.18902, 6.04167, 5.89431, 5.77642, 5.59959, 5.42276, 5.33435, 5.18699, 5.06911, 4.95122, 4.83333, 4.68598, 4.56809, 4.4502, 4.33232, 4.21443, 4.06707, 3.89024, 3.74289, 3.50711, 3.38923, 3.15346, 3.03557, 2.77033, 2.44614, 2.21037, 1.91565, 1.76829, 1.73882, 1.79776, 2.18089, 2.74085, 2.88821, 2.91768, 2.91768, 2.82927, 2.74085, 2.41667, 2.18089, 1.85671, 1.70935, 1.47358, 1.35569, 1.26728, 1.2378, 1.20833, 1.17886, 1.17886, 1.14939, 1.17886, 1.14939, 1.14939, 1.17886, 1.14939, 1.17886, 1.17886, 1.17886, 1.17886, 1.17886, 1.17886, 1.20833, 1.20833, 1.2378, 1.26728, 1.29675, 1.35569, 1.38516, 1.47358, 1.50305, 1.56199, 1.62093, 1.70935, 1.79776, 1.85671, 1.94512, 2.06301, 2.06301, 2.18089, 2.26931, 2.3872, 2.50508, 2.5935, 2.74085, 2.88821, 3.06504, 3.24187, 3.38923, 3.56606, 3.74289, 3.97866, 4.09654, 4.21443, 4.36179, 4.59756, 4.74492, 4.89228, 5.06911, 5.18699, 5.27541, 5.48171, 5.54065, 5.57012, 5.54065, 5.09858, 2.56402, 1.88618, 1.70935, 1.73882, 1.70935, 1.73882, 1.76829, 1.79776, 1.82724, 1.85671, 1.94512, 2.00407, 2.06301, 2.15142, 2.23984, 2.29878, 2.35772, 2.53455];
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.VowelFrame.OVowelFilter, "select", []);
var a;
for (a = 0; a != this.b$["test.falstad.VowelFrame"].pipeRadius.length; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[this.b$["test.falstad.VowelFrame"].pipeRadius.length - 1 - a] = this.areaToRadius (this.data[a]);

this.b$["test.falstad.VowelFrame"].auxBars[1].setValue (190);
return 2;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$UVowelFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.data = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "UVowelFilter", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.prepareFields (c$, function () {
this.data = [0.975787, 1.57385, 0.94431, 0.661017, 0.535109, 0.440678, 0.440678, 0.377724, 0.346247, 0.31477, 0.346247, 0.409201, 0.472155, 0.62954, 0.849879, 1.07022, 1.32203, 1.66828, 2.14044, 2.48668, 2.83293, 3.1477, 3.52542, 3.93462, 4.31235, 5.50847, 7.77482, 9.8523, 10.6392, 11.1429, 11.4262, 11.7409, 12.0872, 12.276, 12.4649, 12.5908, 12.6852, 12.7797, 12.8426, 12.8741, 12.9685, 13.0315, 13.063, 13.063, 13.063, 13.063, 13, 12.937, 12.8741, 12.6538, 12.3705, 12.0872, 11.4576, 10.6077, 9.75787, 9.19128, 8.78208, 8.49879, 8.05811, 7.77482, 7.49153, 7.23971, 6.95642, 6.67312, 6.42131, 6.23245, 5.94915, 5.69734, 5.50847, 5.31961, 5.13075, 4.75303, 4.62712, 4.40678, 4.12349, 3.93462, 3.80872, 3.65133, 3.36804, 3.21065, 3.08475, 2.92736, 2.83293, 2.70702, 2.61259, 2.54964, 2.45521, 2.42373, 2.39225, 2.3293, 2.3293, 2.29782, 2.29782, 2.3293, 2.3293, 2.3293, 2.3293, 2.29782, 2.26634, 2.20339, 2.10896, 1.95157, 1.79419, 1.47942, 1.29056, 1.29056, 1.44794, 2.046, 2.42373, 2.58111, 2.64407, 2.64407, 2.54964, 2.42373, 2.29782, 2.14044, 1.95157, 1.85714, 1.76271, 1.66828, 1.57385, 1.47942, 1.41646, 1.35351, 1.29056, 1.29056, 1.25908, 1.2276, 1.2276, 1.2276, 1.25908, 1.32203, 1.32203, 1.35351, 1.38499, 1.47942, 1.5109, 1.57385, 1.66828, 1.79419, 1.88862, 2.01453, 2.17191, 2.39225, 2.58111, 2.86441, 3.1477, 3.52542, 3.99758, 4.46973, 4.97337, 5.50847, 5.98063, 6.32688, 6.76755, 7.08232, 7.36562, 7.64891, 7.90073, 8.15254, 8.3414, 8.43584, 8.56174, 8.65617, 8.75061, 8.81356, 8.87651, 8.97094, 9.00242, 9.0339, 9.06538, 9.09685, 9.12833, 9.12833, 9.15981, 9.15981, 9.15981, 9.15981, 9.15981, 9.12833, 7.49153, 3.1477, 2.76998, 2.61259, 2.54964, 2.51816, 2.51816, 2.54964, 2.58111, 2.61259, 2.67554, 2.70702, 2.7385, 2.80145, 2.86441, 2.92736, 2.95884, 2.99031, 3.05327, 3.08475];
});
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.VowelFrame.UVowelFilter, "select", []);
var a;
for (a = 0; a != this.b$["test.falstad.VowelFrame"].pipeRadius.length; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[this.b$["test.falstad.VowelFrame"].pipeRadius.length - 1 - a] = this.areaToRadius (this.data[a]);

this.b$["test.falstad.VowelFrame"].auxBars[1].setValue (190);
return 2;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$YVowelFilterSimple$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "YVowelFilterSimple", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.VowelFrame.YVowelFilterSimple, "select", []);
this.b$["test.falstad.VowelFrame"].auxLabels[1].setText ("1st Section Length");
this.b$["test.falstad.VowelFrame"].auxBars[1].setValue (100);
this.b$["test.falstad.VowelFrame"].auxBars[1].setMaximum (200);
return 2;
});
Clazz.defineMethod (c$, "genFilter", 
function () {
var a;
for (a = 0; a < this.b$["test.falstad.VowelFrame"].auxBars[1].getValue (); a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (8);

for (; a != this.b$["test.falstad.VowelFrame"].pipeRadius.length; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (1);

return Clazz.superCall (this, test.falstad.VowelFrame.YVowelFilterSimple, "genFilter", []);
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$IVowelFilterSimple$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "IVowelFilterSimple", test.falstad.VowelFrame.YVowelFilterSimple, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.YVowelFilterSimple, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.VowelFrame.IVowelFilterSimple, "select", []);
this.b$["test.falstad.VowelFrame"].auxBars[0].setValue (145);
this.b$["test.falstad.VowelFrame"].auxBars[1].setValue (Clazz.doubleToInt (120.0));
return 2;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$UrVowelFilterSimple$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "UrVowelFilterSimple", test.falstad.VowelFrame.YVowelFilterSimple, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.YVowelFilterSimple, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.VowelFrame.UrVowelFilterSimple, "select", []);
this.b$["test.falstad.VowelFrame"].auxBars[1].setValue (177);
return 2;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$IhVowelFilterSimple$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "IhVowelFilterSimple", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.VowelFrame.IhVowelFilterSimple, "select", []);
this.b$["test.falstad.VowelFrame"].auxBars[0].setValue (160);
return 1;
});
Clazz.defineMethod (c$, "genFilter", 
function () {
var a;
for (a = 0; a < 37; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (1);

for (; a < 112; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (7);

for (; a != this.b$["test.falstad.VowelFrame"].pipeRadius.length; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (1);

return Clazz.superCall (this, test.falstad.VowelFrame.IhVowelFilterSimple, "genFilter", []);
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$OoVowelFilterSimple$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "OoVowelFilterSimple", test.falstad.VowelFrame.PipeFIRFilter, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.PipeFIRFilter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "select", 
function () {
Clazz.superCall (this, test.falstad.VowelFrame.OoVowelFilterSimple, "select", []);
this.b$["test.falstad.VowelFrame"].auxBars[0].setValue (180);
return 1;
});
Clazz.defineMethod (c$, "genFilter", 
function () {
var a;
for (a = 0; a < 33; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (1);

for (; a < 88; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (7);

for (; a < 122; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (1);

for (; a < 177; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (7);

for (; a != this.b$["test.falstad.VowelFrame"].pipeRadius.length; a++) this.b$["test.falstad.VowelFrame"].pipeRadius[a] = this.areaToRadius (1);

return Clazz.superCall (this, test.falstad.VowelFrame.OoVowelFilterSimple, "genFilter", []);
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$NoFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "NoFilter", test.falstad.VowelFrame.FilterType, null, Clazz.innerTypeInstance (test.falstad.VowelFrame.FilterType, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getResponse", 
function (a, b) {
b.set (1);
}, "~N,test.falstad.VowelFrame.Complex");
Clazz.overrideMethod (c$, "genFilter", 
function () {
var a = Clazz.innerTypeInstance (test.falstad.VowelFrame.DirectFilter, this, null);
a.aList =  Clazz.newDoubleArray (1, 0);
a.aList[0] = 1;
return a;
});
c$ = Clazz.p0p ();
};
c$.$VowelFrame$ImportDialogLayout$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "ImportDialogLayout", null, java.awt.LayoutManager);
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
var b = a.insets ();
var c = a.size ().width - b.left - b.right;
var d = a.size ().height - (b.top + b.bottom);
var e;
var f = 300;
if (a.getComponentCount () == 0) return;
var g = a.getComponent (a.getComponentCount () - 1);
var h = g.getPreferredSize ();
a.getComponent (0).move (b.left, b.top);
var i = a.size ().width - b.left - b.right;
var j = a.size ().height - b.top - b.bottom - h.height;
a.getComponent (0).resize (i, j);
var k = j + b.top;
var l = 0;
for (e = 1; e < a.getComponentCount (); e++) {
var m = a.getComponent (e);
if (m.isVisible ()) {
var n = m.getPreferredSize ();
m.move (b.left + l, k);
m.resize (n.width, n.height);
l += n.width;
}}
}, "java.awt.Container");
c$ = Clazz.p0p ();
};
c$.$VowelFrame$ImportDialog$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.rframe = null;
this.importButton = null;
this.clearButton = null;
this.closeButton = null;
this.text = null;
Clazz.instantialize (this, arguments);
}, test.falstad.VowelFrame, "ImportDialog", swingjs.awt.Dialog, java.awt.event.ActionListener);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, test.falstad.VowelFrame.ImportDialog, [a, (b.length > 0) ? "Export" : "Import", false]);
this.rframe = a;
this.setLayout (Clazz.innerTypeInstance (test.falstad.VowelFrame.ImportDialogLayout, this, null));
this.add (this.text =  new swingjs.awt.TextArea (b, 10, 60));
this.add (this.importButton =  new swingjs.awt.Button ("Import"));
this.importButton.addActionListener (this);
this.add (this.clearButton =  new swingjs.awt.Button ("Clear"));
this.clearButton.addActionListener (this);
this.add (this.closeButton =  new swingjs.awt.Button ("Close"));
this.closeButton.addActionListener (this);
var c = this.rframe.getLocationOnScreen ();
this.resize (400, 300);
var d = this.getSize ();
this.setLocation (c.x + Clazz.doubleToInt ((this.b$["test.falstad.VowelFrame"].winSize.width - d.width) / 2), c.y + Clazz.doubleToInt ((this.b$["test.falstad.VowelFrame"].winSize.height - d.height) / 2));
this.show ();
if (b.length > 0) this.text.selectAll ();
}, "test.falstad.VowelFrame,~S");
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
}return Clazz.superCall (this, test.falstad.VowelFrame.ImportDialog, "handleEvent", [a]);
}, "java.awt.Event");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"epsilon", .00001,
"epsilon2", .003,
"log10", 2.30258509299404568401,
"WINDOW_KAISER", 4,
"soundSpeed", 35396,
"pi", 3.14159265358979323846,
"phaseColorCount", 400);
});
