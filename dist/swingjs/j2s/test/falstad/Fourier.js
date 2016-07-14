Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "$.Rectangle", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "java.lang.Thread", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.Fourier", "$.FourierFrame", "$.FFT3", "$.FourierCanvas", "$.FourierLayout"], ["java.awt.Color", "$.Dimension", "$.Font", "java.lang.Boolean", "$.Double", "$.Float", "java.text.DecimalFormat", "java.util.Hashtable", "$.Random", "$.StringTokenizer", "swingjs.awt.Button", "$.Checkbox", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "FourierCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.FourierCanvas, []);
this.pg = p;
}, "test.falstad.FourierFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateFourier (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateFourier (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "FourierLayout", null, java.awt.LayoutManager);
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
}, test.falstad, "Fourier", swingjs.awt.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.Fourier.ogf != null) test.falstad.Fourier.ogf.dispose ();
test.falstad.Fourier.ogf = null;
this.repaint ();
});
Clazz.overrideMethod (c$, "init", 
function () {
this.showFrame ();
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.Fourier.ogf =  new test.falstad.FourierFrame (null);
test.falstad.Fourier.ogf.init ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (test.falstad.Fourier.ogf == null) {
this.started = true;
test.falstad.Fourier.ogf =  new test.falstad.FourierFrame (this);
test.falstad.Fourier.ogf.init ();
this.repaint ();
}});
Clazz.overrideMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.Fourier.ogf == null) s = "Applet is finished.";
 else if (test.falstad.Fourier.ogf.useFrame) test.falstad.Fourier.ogf.triggerShow ();
g.drawString (s, 10, 30);
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
if (test.falstad.Fourier.ogf != null) test.falstad.Fourier.ogf.dispose ();
test.falstad.Fourier.ogf = null;
this.repaint ();
});
Clazz.defineStatics (c$,
"ogf", null);
c$ = Clazz.decorateAsClass (function () {
this.playThread = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.rate = 22050;
this.playSampleCount = 16384;
this.applet = null;
this.showFormat = null;
this.useFrame = false;
this.main = null;
this.sineButton = null;
this.cosineButton = null;
this.rectButton = null;
this.fullRectButton = null;
this.triangleButton = null;
this.sawtoothButton = null;
this.squareButton = null;
this.noiseButton = null;
this.blankButton = null;
this.phaseButton = null;
this.clipButton = null;
this.resampleButton = null;
this.quantizeButton = null;
this.highPassButton = null;
this.magPhaseCheck = null;
this.soundCheck = null;
this.logCheck = null;
this.termBar = null;
this.freqBar = null;
this.magcoef = null;
this.phasecoef = null;
this.mutes = null;
this.solos = null;
this.hasSolo = null;
this.func = null;
this.maxTerms = 160;
this.selectedCoef = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.quantizeCount = 0;
this.resampleCount = 0;
this.dragging = false;
this.freqAdjusted = false;
this.viewFunc = null;
this.viewMag = null;
this.viewPhase = null;
this.viewMutes = null;
this.viewSolos = null;
this.fft = null;
if (!Clazz.isClassDefined ("test.falstad.FourierFrame.View")) {
test.falstad.FourierFrame.$FourierFrame$View$ ();
}
this.cv = null;
this.java2 = false;
this.showTable = null;
this.shown = false;
this.origFunc = null;
this.dfreq0 = 0;
this.finished = false;
if (!Clazz.isClassDefined ("test.falstad.FourierFrame.PlayThread")) {
test.falstad.FourierFrame.$FourierFrame$PlayThread$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "FourierFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "Fourier Series by Paul Falstad";
});
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.FourierFrame, ["Fourier Series Applet v1.6d"]);
this.applet = a;
this.useFrame = true;
}, "test.falstad.Fourier");
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.defineMethod (c$, "mustShow", 
function (s) {
return this.showTable == null || this.showTable.containsKey (s);
}, "~S");
Clazz.defineMethod (c$, "doButton", 
function (s) {
var b =  new swingjs.awt.Button (s);
if (this.mustShow (s)) this.main.add (b);
b.addActionListener (this);
return b;
}, "~S");
Clazz.defineMethod (c$, "doCheckbox", 
function (s) {
var b =  new swingjs.awt.Checkbox (s);
if (this.mustShow (s)) this.main.add (b);
try {
var param = this.applet.getParameter (s);
if (param != null && param.equalsIgnoreCase ("true")) b.setState (true);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
b.addItemListener (this);
return b;
}, "~S");
Clazz.defineMethod (c$, "init", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var jv = System.getProperty ("java.class.version");
var jvf =  new Double (jv).doubleValue ();
if (jvf >= 48) this.java2 = true;
var state = "";
try {
var param = this.applet.getParameter ("useFrame");
if (param != null && param.equalsIgnoreCase ("false")) this.useFrame = false;
var show = this.applet.getParameter ("show");
if (show != null) {
this.showTable =  new java.util.Hashtable (10);
var st =  new java.util.StringTokenizer (show, ",");
while (st.hasMoreTokens ()) {
var s = st.nextToken ();
this.showTable.put (s, "");
}
this.showTable.put ("Sound", "");
}state = this.applet.getParameter ("state");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
if (this.useFrame) this.main = this;
 else this.main = this.applet;
this.selectedCoef = -1;
this.magcoef =  Clazz.newDoubleArray (this.maxTerms, 0);
this.phasecoef =  Clazz.newDoubleArray (this.maxTerms, 0);
this.mutes =  Clazz.newBooleanArray (this.maxTerms, false);
this.solos =  Clazz.newBooleanArray (this.maxTerms, false);
this.func =  Clazz.newDoubleArray (1025, 0);
this.random =  new java.util.Random ();
this.fft =  new test.falstad.FFT3 (1024);
this.main.setLayout ( new test.falstad.FourierLayout ());
this.cv =  new test.falstad.FourierCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.sineButton = this.doButton ("Sine");
this.cosineButton = this.doButton ("Cosine");
this.triangleButton = this.doButton ("Triangle");
this.sawtoothButton = this.doButton ("Sawtooth");
this.squareButton = this.doButton ("Square");
this.noiseButton = this.doButton ("Noise");
this.phaseButton = this.doButton ("Phase Shift");
this.clipButton = this.doButton ("Clip");
this.resampleButton = this.doButton ("Resample");
this.quantizeButton = this.doButton ("Quantize");
this.rectButton = this.doButton ("Rectify");
this.fullRectButton = this.doButton ("Full Rectify");
this.highPassButton = this.doButton ("High-Pass Filter");
this.blankButton = this.doButton ("Clear");
this.soundCheck = this.doCheckbox ("Sound");
if (!this.java2) this.remove (this.soundCheck);
this.magPhaseCheck = this.doCheckbox ("Mag/Phase View");
this.logCheck = this.doCheckbox ("Log View");
this.logCheck.disable ();
if (this.mustShow ("Terms")) this.main.add ( new swingjs.awt.Label ("Number of Terms", 0));
this.termBar =  new swingjs.awt.Scrollbar (0, 50, 1, 1, this.maxTerms);
this.termBar.addAdjustmentListener (this);
if (this.mustShow ("Terms")) this.main.add (this.termBar);
if (this.java2) this.main.add ( new swingjs.awt.Label ("Playing Frequency", 0));
this.freqBar =  new swingjs.awt.Scrollbar (0, 251, 1, -100, 500);
this.freqBar.addAdjustmentListener (this);
if (this.java2) this.main.add (this.freqBar);
this.main.add ( new swingjs.awt.Label ("http://www.falstad.com"));
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (java.awt.Color.lightGray);
this.showFormat = java.text.DecimalFormat.getInstance ();
this.showFormat.setMaximumFractionDigits (5);
if (!this.finished) {
return;
}if (state.equalsIgnoreCase ("square")) this.doSquare ();
 else if (state.equalsIgnoreCase ("sine")) this.doSine ();
 else if (state.equalsIgnoreCase ("triangle")) this.doTriangle ();
 else if (state.equalsIgnoreCase ("noise")) this.doNoise ();
 else if (state.equalsIgnoreCase ("quant")) {
this.doSine ();
this.doQuantize ();
} else if (state.equalsIgnoreCase ("resample")) {
this.doSine ();
this.doResample ();
} else if (state.equalsIgnoreCase ("clip")) {
this.doSine ();
this.doClip ();
} else if (state.equalsIgnoreCase ("rect")) {
this.doSine ();
this.doRect ();
} else if (state.equalsIgnoreCase ("fullrect")) {
this.doSine ();
this.doFullRect ();
} else if (state.equalsIgnoreCase ("fullsaw")) {
this.doSawtooth ();
this.doFullRect ();
} else if (state.equalsIgnoreCase ("beats")) this.doBeats ();
 else if (state.equalsIgnoreCase ("loudsoft")) this.doLoudSoft ();
 else this.doSawtooth ();
if (this.useFrame) {
this.resize (800, 640);
this.handleResize ();
var x = this.getSize ();
var screen = this.getToolkit ().getScreenSize ();
this.setLocation (Clazz.doubleToInt ((screen.width - x.width) / 2), Clazz.doubleToInt ((screen.height - x.height) / 2));
this.show ();
} else {
this.hide ();
this.handleResize ();
this.applet.validate ();
}this.main.requestFocus ();
this.finished = true;
});
Clazz.defineMethod (c$, "handleResize", 
function () {
var d = this.winSize = this.cv.getSize ();
if (this.winSize.width == 0) return;
this.dbimage = this.cv.createImage (d.width, d.height);
var margin = 20;
var pheight = Clazz.doubleToInt ((d.height - margin * 2) / 3);
this.viewFunc = Clazz.innerTypeInstance (test.falstad.FourierFrame.View, this, null, 0, 0, d.width, pheight);
var y = pheight + margin * 2;
this.viewMag = Clazz.innerTypeInstance (test.falstad.FourierFrame.View, this, null, 0, y, d.width, pheight);
if (this.magPhaseCheck.getState ()) {
this.viewMag.ymult *= 1.6;
this.viewMag.midy += Clazz.doubleToInt (Clazz.doubleToInt (this.viewMag.ymult) / 2);
this.logCheck.enable ();
} else {
this.logCheck.disable ();
this.logCheck.setState (false);
}y += pheight;
this.viewPhase = Clazz.innerTypeInstance (test.falstad.FourierFrame.View, this, null, 0, y, d.width, pheight);
var pmy = this.viewPhase.midy + Clazz.doubleToInt (this.viewPhase.ymult) + 10;
var h = Clazz.doubleToInt ((d.height - pmy) / 2);
this.viewMutes = Clazz.innerTypeInstance (test.falstad.FourierFrame.View, this, null, 0, pmy, d.width, h);
this.viewSolos = Clazz.innerTypeInstance (test.falstad.FourierFrame.View, this, null, 0, pmy + h, d.width, h);
});
Clazz.defineMethod (c$, "triggerShow", 
function () {
if (!this.shown) this.show ();
this.shown = true;
});
Clazz.defineMethod (c$, "doBeats", 
function () {
var x;
for (x = 0; x != 1024; x++) {
var q = (x - 512) * 0.006135923151542565;
this.func[x] = .5 * (Math.cos (q * 20) + Math.cos (q * 21));
}
this.func[1024] = this.func[0];
this.transform ();
this.freqBar.setValue (-100);
});
Clazz.defineMethod (c$, "doLoudSoft", 
function () {
var x;
for (x = 0; x != 1024; x++) {
var q = (x - 512) * 0.006135923151542565;
this.func[x] = Math.cos (q) + .05 * Math.cos (q * 10);
}
this.func[1024] = this.func[0];
this.transform ();
});
Clazz.defineMethod (c$, "doSawtooth", 
function () {
var x;
for (x = 0; x != 1024; x++) this.func[x] = (x - 512) / 512.0;

this.func[1024] = this.func[0];
this.transform ();
});
Clazz.defineMethod (c$, "doTriangle", 
function () {
var x;
for (x = 0; x != 512; x++) {
this.func[x] = (x * 2 - 512) / 512.0;
this.func[x + 512] = ((512 - x) * 2 - 512) / 512.0;
}
this.func[1024] = this.func[0];
this.transform ();
});
Clazz.defineMethod (c$, "doSine", 
function () {
var x;
for (x = 0; x != 1024; x++) {
this.func[x] = Math.sin ((x - 512) * 0.006135923151542565);
}
this.func[1024] = this.func[0];
this.transform ();
});
Clazz.defineMethod (c$, "doCosine", 
function () {
var x;
for (x = 0; x != 1024; x++) {
this.func[x] = Math.cos ((x - 512) * 0.006135923151542565);
}
this.func[1024] = this.func[0];
this.transform ();
});
Clazz.defineMethod (c$, "doRect", 
function () {
var x;
for (x = 0; x != 1024; x++) if (this.func[x] < 0) this.func[x] = 0;

this.func[1024] = this.func[0];
this.transform ();
});
Clazz.defineMethod (c$, "doFullRect", 
function () {
var x;
for (x = 0; x != 1024; x++) if (this.func[x] < 0) this.func[x] = -this.func[x];

this.func[1024] = this.func[0];
this.transform ();
});
Clazz.defineMethod (c$, "doHighPass", 
function () {
var i;
var terms = this.termBar.getValue ();
for (i = 0; i != terms; i++) if (this.magcoef[i] != 0) {
this.magcoef[i] = 0;
break;
}
this.doSetFunc ();
});
Clazz.defineMethod (c$, "doSquare", 
function () {
var x;
for (x = 0; x != 512; x++) {
this.func[x] = -1;
this.func[x + 512] = 1;
}
this.func[1024] = this.func[0];
this.transform ();
});
Clazz.defineMethod (c$, "doNoise", 
function () {
var x;
var blockSize = 3;
for (x = 0; x != Clazz.doubleToInt (1024 / blockSize); x++) {
var q = Math.random () * 2 - 1;
var i;
for (i = 0; i != blockSize; i++) this.func[x * blockSize + i] = q;

}
this.func[1024] = this.func[0];
this.transform ();
});
Clazz.defineMethod (c$, "doPhaseShift", 
function () {
var i;
var sh = 51;
var copyf =  Clazz.newDoubleArray (sh, 0);
for (i = 0; i != sh; i++) copyf[i] = this.func[i];

for (i = 0; i != 1024 - sh; i++) this.func[i] = this.func[i + sh];

for (i = 0; i != sh; i++) this.func[1024 - sh + i] = copyf[i];

this.func[1024] = this.func[0];
this.transform ();
});
Clazz.defineMethod (c$, "doBlank", 
function () {
var x;
for (x = 0; x <= 1024; x++) this.func[x] = 0;

for (x = 0; x != this.termBar.getValue (); x++) this.mutes[x] = this.solos[x] = false;

this.transform ();
});
Clazz.defineMethod (c$, "doSetFunc", 
function () {
var i;
var data =  Clazz.newDoubleArray (2048, 0);
var terms = this.termBar.getValue ();
for (i = 0; i != terms; i++) {
var sgn = (i & 1) == 1 ? -1 : 1;
data[i * 2] = sgn * this.magcoef[i] * Math.cos (this.phasecoef[i]);
data[i * 2 + 1] = -sgn * this.magcoef[i] * Math.sin (this.phasecoef[i]);
}
this.fft.transform (data, true);
for (i = 0; i != 1024; i++) this.func[i] = data[i * 2];

this.func[1024] = this.func[0];
this.updateSound ();
});
Clazz.defineMethod (c$, "updateSound", 
function () {
if (this.playThread != null) this.playThread.soundChanged ();
});
Clazz.defineMethod (c$, "doClip", 
function () {
var x;
var mult = 1.2;
for (x = 0; x != 1024; x++) {
this.func[x] *= mult;
if (this.func[x] > 1) this.func[x] = 1;
if (this.func[x] < -1) this.func[x] = -1;
}
this.func[1024] = this.func[0];
this.transform ();
});
Clazz.defineMethod (c$, "doResample", 
function () {
var x;
var i;
if (this.resampleCount == 0) this.resampleCount = 32;
if (this.resampleCount == 1024) return;
for (x = 0; x != 1024; x += this.resampleCount) {
for (i = 1; i != this.resampleCount; i++) this.func[x + i] = this.func[x];

}
this.func[1024] = this.func[0];
this.transform ();
this.resampleCount *= 2;
});
Clazz.defineMethod (c$, "doQuantize", 
function () {
var x;
if (this.quantizeCount == 0) {
this.quantizeCount = 8;
this.origFunc =  Clazz.newDoubleArray (1024, 0);
System.arraycopy (this.func, 0, this.origFunc, 0, 1024);
}for (x = 0; x != 1024; x++) {
this.func[x] = Math.round (this.origFunc[x] * this.quantizeCount) / this.quantizeCount;
}
this.func[1024] = this.func[0];
this.transform ();
this.quantizeCount /= 2;
});
Clazz.defineMethod (c$, "getFreq", 
function () {
var freq = 27.5 * Math.exp (this.freqBar.getValue () * .004158883084 * 2);
this.dfreq0 = (Clazz.doubleToInt (freq * 16384 / 22050)) * 2;
return 22050 * this.dfreq0 / (32768.0);
});
Clazz.defineMethod (c$, "transform", 
function () {
var x;
var y;
var data =  Clazz.newDoubleArray (2048, 0);
var i;
for (i = 0; i != 1024; i++) data[i * 2] = this.func[i];

this.fft.transform (data, false);
var epsilon = .00001;
var mult = 0.001953125;
for (y = 0; y != this.maxTerms; y++) {
var acoef = data[y * 2] * mult;
var bcoef = -data[y * 2 + 1] * mult;
if ((y & 1) == 1) acoef = -acoef;
 else bcoef = -bcoef;
if (acoef < epsilon && acoef > -epsilon) acoef = 0;
if (bcoef < epsilon && bcoef > -epsilon) bcoef = 0;
if (y == 0) {
this.magcoef[0] = acoef / 2;
this.phasecoef[0] = 0;
} else {
this.magcoef[y] = Math.sqrt (acoef * acoef + bcoef * bcoef);
this.phasecoef[y] = Math.atan2 (-bcoef, acoef);
}}
this.updateSound ();
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
Clazz.defineMethod (c$, "updateFourier", 
function (realg) {
if (this.winSize == null || this.winSize.width == 0 || this.dbimage == null) return;
var g = this.dbimage.getGraphics ();
var gray1 =  new java.awt.Color (76, 76, 76);
var gray2 =  new java.awt.Color (127, 127, 127);
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
var i;
var ox = -1;
var oy = -1;
var midy = this.viewFunc.midy;
var periodWidth = this.viewFunc.periodWidth;
var ymult = this.viewFunc.ymult;
for (i = -1; i <= 1; i++) {
g.setColor ((i == 0) ? gray2 : gray1);
g.drawLine (0, midy + (i * Clazz.doubleToInt (ymult)), this.winSize.width, midy + (i * Clazz.doubleToInt (ymult)));
}
for (i = 2; i <= 4; i++) {
g.setColor ((i == 3) ? gray2 : gray1);
g.drawLine (Clazz.doubleToInt (periodWidth * i / 2), midy - Clazz.doubleToInt (ymult), Clazz.doubleToInt (periodWidth * i / 2), midy + Clazz.doubleToInt (ymult));
}
g.setColor (java.awt.Color.white);
if (!(this.dragging && this.selection != 1)) {
for (i = 0; i != 1025; i++) {
var x = Clazz.doubleToInt (periodWidth * i / 1024);
var y = midy - Clazz.doubleToInt (ymult * this.func[i]);
if (ox != -1) {
g.drawLine (ox, oy, x, y);
g.drawLine (ox + periodWidth, oy, x + periodWidth, y);
g.drawLine (ox + periodWidth * 2, oy, x + periodWidth * 2, y);
}ox = x;
oy = y;
}
}var terms = this.termBar.getValue ();
if (!(this.dragging && this.selection == 1)) {
g.setColor (java.awt.Color.red);
ox = -1;
for (i = 0; i != 1025; i++) {
var x = Clazz.doubleToInt (periodWidth * i / 1024);
var j;
var dy = 0;
for (j = 0; j != terms; j++) {
dy += this.magcoef[j] * Math.cos (0.006135923151542565 * (i - 512) * j + this.phasecoef[j]);
}
var y = midy - Clazz.doubleToInt (ymult * dy);
if (ox != -1) {
g.drawLine (ox, oy, x, y);
g.drawLine (ox + periodWidth, oy, x + periodWidth, y);
g.drawLine (ox + periodWidth * 2, oy, x + periodWidth * 2, y);
}ox = x;
oy = y;
}
}var texty = this.viewFunc.height + 10;
if (this.selectedCoef != -1) {
g.setColor (java.awt.Color.yellow);
ox = -1;
var phase = this.phasecoef[this.selectedCoef];
var x;
var n = this.selectedCoef * 2 * 3.141592653589793 / periodWidth;
var dx = Clazz.doubleToInt (periodWidth / 2);
var mag = this.magcoef[this.selectedCoef];
if (!this.magPhaseCheck.getState ()) {
if (this.selection == 2) {
mag *= -Math.sin (phase);
phase = -1.5707963267948966;
} else {
mag *= Math.cos (phase);
phase = 0;
}}ymult *= mag;
if (!this.dragging) {
for (i = 0; i != 1025; i++) {
x = Clazz.doubleToInt (periodWidth * i / 1024);
var dy = Math.cos (0.006135923151542565 * (i - 512) * this.selectedCoef + phase);
var y = midy - Clazz.doubleToInt (ymult * dy);
if (ox != -1) {
g.drawLine (ox, oy, x, y);
g.drawLine (ox + periodWidth, oy, x + periodWidth, y);
g.drawLine (ox + periodWidth * 2, oy, x + periodWidth * 2, y);
}ox = x;
oy = y;
}
}if (this.selectedCoef > 0 && this.java2) {
var f = Clazz.doubleToInt (this.getFreq () * this.selectedCoef);
this.centerString (g, f + ((f > 11025) ? " Hz (filtered)" : " Hz"), texty);
}if (this.selectedCoef != -1) {
var harm;
if (this.selectedCoef == 0) harm = this.showFormat.format (mag) + "";
 else {
var func = "cos";
if (!this.magPhaseCheck.getState () && this.selection == 2) func = "sin";
if (this.selectedCoef == 1) harm = this.showFormat.format (mag) + " " + func + "(x";
 else harm = this.showFormat.format (mag) + " " + func + "(" + this.selectedCoef + "x";
if (!this.magPhaseCheck.getState () || phase == 0) harm += ")";
 else {
harm += (phase < 0) ? " - " : " + ";
harm += this.showFormat.format (Math.abs (phase)) + ")";
}if (this.logCheck.getState ()) {
this.showFormat.setMaximumFractionDigits (2);
harm += "   (" + this.showFormat.format (20 * Math.log (mag) / Math.log (10)) + " dB)";
this.showFormat.setMaximumFractionDigits (5);
}}this.centerString (g, harm, texty + 15);
}}if (this.selectedCoef == -1 && this.freqAdjusted && this.java2) {
var f = Clazz.doubleToInt (this.getFreq ());
g.setColor (java.awt.Color.yellow);
this.centerString (g, f + " Hz", texty);
}this.freqAdjusted = false;
var termWidth = this.getTermWidth ();
ymult = this.viewMag.ymult;
midy = this.viewMag.midy;
g.setColor (java.awt.Color.white);
if (this.magPhaseCheck.getState ()) {
this.centerString (g, "Magnitudes", this.viewMag.labely);
this.centerString (g, "Phases", this.viewPhase.labely);
g.setColor (gray2);
g.drawLine (0, midy, this.winSize.width, midy);
g.setColor (gray1);
g.drawLine (0, midy - Clazz.doubleToInt (ymult), this.winSize.width, midy - Clazz.doubleToInt (ymult));
var dotSize = termWidth - 3;
for (i = 0; i != terms; i++) {
var t = termWidth * i + Clazz.doubleToInt (termWidth / 2);
var y = midy - Clazz.doubleToInt (this.showMag (i) * ymult);
g.setColor (i == this.selectedCoef ? java.awt.Color.yellow : java.awt.Color.white);
g.drawLine (t, midy, t, y);
g.fillOval (t - Clazz.doubleToInt (dotSize / 2), y - Clazz.doubleToInt (dotSize / 2), dotSize, dotSize);
}
ymult = this.viewPhase.ymult;
midy = this.viewPhase.midy;
for (i = -2; i <= 2; i++) {
g.setColor ((i == 0) ? gray2 : gray1);
g.drawLine (0, midy + Clazz.doubleToInt ((i * Clazz.doubleToInt (ymult)) / 2), this.winSize.width, midy + Clazz.doubleToInt ((i * Clazz.doubleToInt (ymult)) / 2));
}
ymult /= 3.141592653589793;
for (i = 0; i != terms; i++) {
var t = termWidth * i + Clazz.doubleToInt (termWidth / 2);
var y = midy - Clazz.doubleToInt (this.phasecoef[i] * ymult);
g.setColor (i == this.selectedCoef ? java.awt.Color.yellow : java.awt.Color.white);
g.drawLine (t, midy, t, y);
g.fillOval (t - Clazz.doubleToInt (dotSize / 2), y - Clazz.doubleToInt (dotSize / 2), dotSize, dotSize);
}
} else {
this.centerString (g, "Sines", this.viewMag.labely);
this.centerString (g, "Cosines", this.viewPhase.labely);
g.setColor (gray2);
g.drawLine (0, midy, this.winSize.width, midy);
g.setColor (gray1);
g.drawLine (0, midy - Clazz.doubleToInt (ymult), this.winSize.width, midy - Clazz.doubleToInt (ymult));
g.drawLine (0, midy + Clazz.doubleToInt (ymult), this.winSize.width, midy + Clazz.doubleToInt (ymult));
var dotSize = termWidth - 3;
for (i = 1; i != terms; i++) {
var t = termWidth * i + Clazz.doubleToInt (termWidth / 2);
var y = midy + Clazz.doubleToInt (this.magcoef[i] * Math.sin (this.phasecoef[i]) * ymult);
g.setColor (i == this.selectedCoef ? java.awt.Color.yellow : java.awt.Color.white);
g.drawLine (t, midy, t, y);
g.fillOval (t - Clazz.doubleToInt (dotSize / 2), y - Clazz.doubleToInt (dotSize / 2), dotSize, dotSize);
}
ymult = this.viewPhase.ymult;
midy = this.viewPhase.midy;
for (i = -2; i <= 2; i += 2) {
g.setColor ((i == 0) ? gray2 : gray1);
g.drawLine (0, midy + Clazz.doubleToInt ((i * Clazz.doubleToInt (ymult)) / 2), this.winSize.width, midy + Clazz.doubleToInt ((i * Clazz.doubleToInt (ymult)) / 2));
}
for (i = 0; i != terms; i++) {
var t = termWidth * i + Clazz.doubleToInt (termWidth / 2);
var y = midy - Clazz.doubleToInt (this.magcoef[i] * Math.cos (this.phasecoef[i]) * ymult);
g.setColor (i == this.selectedCoef ? java.awt.Color.yellow : java.awt.Color.white);
g.drawLine (t, midy, t, y);
g.fillOval (t - Clazz.doubleToInt (dotSize / 2), y - Clazz.doubleToInt (dotSize / 2), dotSize, dotSize);
}
}var basef = this.getFreq ();
if (this.viewMutes.height > 8) {
var f =  new java.awt.Font ("SansSerif", 0, this.viewMutes.height);
g.setFont (f);
var fm = g.getFontMetrics ();
for (i = 1; i != terms; i++) {
if (basef * i > 11025) break;
var t = termWidth * i + Clazz.doubleToInt (termWidth / 2);
var y = this.viewMutes.y + fm.getAscent ();
g.setColor (i == this.selectedCoef ? java.awt.Color.yellow : java.awt.Color.white);
if (this.hasSolo && !this.solos[i]) g.setColor (java.awt.Color.gray);
var pm = "-";
if (this.mutes[i]) pm = "M";
var w = fm.stringWidth (pm);
g.drawString (pm, t - Clazz.doubleToInt (w / 2), y);
y = this.viewSolos.y + fm.getAscent ();
pm = "-";
if (this.solos[i]) pm = "S";
w = fm.stringWidth (pm);
g.drawString (pm, t - Clazz.doubleToInt (w / 2), y);
}
}realg.drawImage (this.dbimage, 0, 0, this);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "showMag", 
function (n) {
var m = this.magcoef[n];
if (!this.logCheck.getState () || n == 0) return m;
m = Math.log (m) / 6. + 1;
return (m < 0) ? 0 : m;
}, "~N");
Clazz.defineMethod (c$, "getMagValue", 
function (m) {
if (!this.logCheck.getState ()) return m;
if (m == 0) return 0;
return Math.exp (6 * (m - 1));
}, "~N");
Clazz.defineMethod (c$, "getTermWidth", 
function () {
var terms = this.termBar.getValue ();
var termWidth = Clazz.doubleToInt (this.winSize.width / terms);
var maxTermWidth = Clazz.doubleToInt (this.winSize.width / 30);
if (termWidth > maxTermWidth) termWidth = maxTermWidth;
if (termWidth > 12) termWidth = 12;
termWidth &= -2;
return termWidth;
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
case 3:
this.editPhase (x, y);
break;
case 4:
this.editMutes (e, x, y);
break;
case 5:
this.editSolos (e, x, y);
break;
}
this.quantizeCount = this.resampleCount = 0;
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "editMag", 
function (x, y) {
if (this.selectedCoef == -1) return;
var ymult = this.viewMag.ymult;
var midy = this.viewMag.midy;
var coef = -(y - midy) / ymult;
if (this.magPhaseCheck.getState ()) {
if (this.selectedCoef > 0) {
if (coef < 0) coef = 0;
coef = this.getMagValue (coef);
} else if (coef < -1) coef = -1;
if (coef > 1) coef = 1;
if (this.magcoef[this.selectedCoef] == coef) return;
this.magcoef[this.selectedCoef] = coef;
} else {
var c = this.selectedCoef;
if (c == 0) return;
var m2 = this.magcoef[c] * Math.cos (this.phasecoef[c]);
if (coef > 1) coef = 1;
if (coef < -1) coef = -1;
var m1 = coef;
this.magcoef[c] = Math.sqrt (m1 * m1 + m2 * m2);
this.phasecoef[c] = Math.atan2 (-m1, m2);
}this.updateSound ();
this.cv.repaint ();
}, "~N,~N");
Clazz.defineMethod (c$, "editFunc", 
function (x, y) {
if (this.dragX == x) {
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
Clazz.defineMethod (c$, "editFuncPoint", 
function (x, y) {
var midy = this.viewFunc.midy;
var periodWidth = this.viewFunc.periodWidth;
var ymult = this.viewFunc.ymult;
var lox = Clazz.doubleToInt ((x % periodWidth) * 1024 / periodWidth);
var hix = (Clazz.doubleToInt (((x % periodWidth) + 1) * 1024 / periodWidth)) - 1;
var val = (midy - y) / ymult;
if (val > 1) val = 1;
if (val < -1) val = -1;
for (; lox <= hix; lox++) this.func[lox] = val;

this.func[1024] = this.func[0];
this.cv.repaint ();
}, "~N,~N");
Clazz.defineMethod (c$, "editPhase", 
function (x, y) {
if (this.selectedCoef == -1) return;
var ymult = this.viewPhase.ymult;
var midy = this.viewPhase.midy;
var coef = -(y - midy) / ymult;
if (this.magPhaseCheck.getState ()) {
coef *= 3.141592653589793;
if (coef < -3.141592653589793) coef = -3.141592653589793;
if (coef > 3.141592653589793) coef = 3.141592653589793;
if (this.phasecoef[this.selectedCoef] == coef) return;
this.phasecoef[this.selectedCoef] = coef;
} else {
var c = this.selectedCoef;
var m1 = -this.magcoef[c] * Math.sin (this.phasecoef[c]);
if (coef > 1) coef = 1;
if (coef < -1) coef = -1;
var m2 = coef;
this.magcoef[c] = Math.sqrt (m1 * m1 + m2 * m2);
this.phasecoef[c] = Math.atan2 (-m1, m2);
this.updateSound ();
}this.cv.repaint ();
}, "~N,~N");
Clazz.defineMethod (c$, "editMutes", 
function (e, x, y) {
if (e.getID () != 501) return;
if (this.selectedCoef == -1) return;
this.mutes[this.selectedCoef] = !this.mutes[this.selectedCoef];
this.cv.repaint ();
}, "java.awt.event.MouseEvent,~N,~N");
Clazz.defineMethod (c$, "editSolos", 
function (e, x, y) {
if (e.getID () != 501) return;
if (this.selectedCoef == -1) return;
this.solos[this.selectedCoef] = !this.solos[this.selectedCoef];
var terms = this.termBar.getValue ();
this.hasSolo = false;
var i;
for (i = 0; i != terms; i++) if (this.solos[i]) {
this.hasSolo = true;
break;
}
this.cv.repaint ();
}, "java.awt.event.MouseEvent,~N,~N");
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
this.pressButton (e.getSource ());
}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "pressButton", 
function (b) {
if (b === this.triangleButton) {
this.doTriangle ();
this.cv.repaint ();
}if (b === this.sineButton) {
this.doSine ();
this.cv.repaint ();
}if (b === this.cosineButton) {
this.doCosine ();
this.cv.repaint ();
}if (b === this.rectButton) {
this.doRect ();
this.cv.repaint ();
}if (b === this.fullRectButton) {
this.doFullRect ();
this.cv.repaint ();
}if (b === this.squareButton) {
this.doSquare ();
this.cv.repaint ();
}if (b === this.highPassButton) {
this.doHighPass ();
this.cv.repaint ();
}if (b === this.noiseButton) {
this.doNoise ();
this.cv.repaint ();
}if (b === this.phaseButton) {
this.doPhaseShift ();
this.cv.repaint ();
}if (b === this.blankButton) {
this.doBlank ();
this.cv.repaint ();
}if (b === this.sawtoothButton) {
this.doSawtooth ();
this.cv.repaint ();
}if (b === this.clipButton) {
this.doClip ();
this.cv.repaint ();
}if (b === this.quantizeButton) {
this.doQuantize ();
this.cv.repaint ();
} else this.quantizeCount = 0;
if (b === this.resampleButton) {
this.doResample ();
this.cv.repaint ();
} else this.resampleCount = 0;
}, "~O");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (e.getSource () === this.soundCheck && this.soundCheck.getState () && this.playThread == null) {
this.playThread = Clazz.innerTypeInstance (test.falstad.FourierFrame.PlayThread, this, null);
this.playThread.start ();
}if (e.getSource () === this.magPhaseCheck) this.handleResize ();
this.cv.repaint ();
}, "java.awt.event.ItemEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.termBar) {
this.updateSound ();
this.cv.repaint ();
}if (e.getSource () === this.freqBar) {
this.freqAdjusted = true;
this.updateSound ();
this.cv.repaint ();
}}, "java.awt.event.AdjustmentEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
var x = e.getX ();
var y = e.getY ();
this.dragX = x;
this.dragY = y;
var oldCoef = this.selectedCoef;
this.selectedCoef = -1;
this.selection = 0;
var oldsel = this.selection;
if (this.viewFunc.contains (x, y)) this.selection = 1;
 else {
var termWidth = this.getTermWidth ();
this.selectedCoef = Clazz.doubleToInt (x / termWidth);
if (this.selectedCoef > this.termBar.getValue ()) this.selectedCoef = -1;
if (this.selectedCoef != -1) {
if (this.viewMag.contains (x, y)) this.selection = 2;
 else if (this.viewMutes.contains (x, y)) this.selection = 4;
 else if (this.viewSolos.contains (x, y)) this.selection = 5;
 else if (this.viewPhase.contains (x, y)) this.selection = 3;
}}if (this.selectedCoef != oldCoef || oldsel != this.selection) this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
if (e.getClickCount () == 2 && this.selectedCoef != -1 && this.selection != 4 && this.selection != 5) {
var i;
for (i = 0; i != this.termBar.getValue (); i++) {
this.phasecoef[i] = 0;
if (this.selectedCoef != i) this.magcoef[i] = 0;
}
this.magcoef[this.selectedCoef] = 1;
if (!this.magPhaseCheck.getState ()) this.phasecoef[this.selectedCoef] = (this.selection == 2) ? -1.5707963267948966 : 0;
this.doSetFunc ();
this.cv.repaint ();
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
this.mouseMoved (e);
if ((e.getModifiers () & 4) != 0 && this.selectedCoef != -1) {
this.termBar.setValue (this.selectedCoef + 1);
this.cv.repaint ();
}if ((e.getModifiers () & 16) == 0) return;
this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.dragging = false;
if (this.selection == 1) this.transform ();
 else if (this.selection != 0) this.doSetFunc ();
this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
if (this.applet == null) this.dispose ();
 else this.applet.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.FourierFrame, "handleEvent", [ev]);
}, "java.awt.Event");
c$.$FourierFrame$View$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.midy = 0;
this.labely = 0;
this.ymult = 0;
this.periodWidth = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.FourierFrame, "View", java.awt.Rectangle);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, test.falstad.FourierFrame.View, [a, b, c, d]);
this.midy = b + Clazz.doubleToInt (d / 2);
this.ymult = .6 * d / 2;
this.periodWidth = Clazz.doubleToInt (c / 3);
this.labely = this.midy - 5 - Clazz.doubleToInt (d * 3 / 8);
}, "~N,~N,~N,~N");
c$ = Clazz.p0p ();
};
c$.$FourierFrame$PlayThread$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.changed = false;
Clazz.instantialize (this, arguments);
}, test.falstad.FourierFrame, "PlayThread", Thread);
Clazz.defineMethod (c$, "soundChanged", 
function () {
this.changed = true;
});
Clazz.overrideMethod (c$, "run", 
function () {
var a;
var b = null;
try {
var c = Clazz._4Name ("javax.sound.sampled.AudioFormat");
var d = c.getConstructor ([Number, Number, Number, Boolean, Boolean]);
var e = d.newInstance ([ new Float (22050),  new Integer (16),  new Integer (1),  new Boolean (true),  new Boolean (true)]);
var f = Clazz._4Name ("javax.sound.sampled.DataLine$Info");
var g = Clazz._4Name ("javax.sound.sampled.SourceDataLine");
d = f.getConstructor ([Class, c]);
var h = d.newInstance ([g, e]);
var i = Clazz._4Name ("javax.sound.sampled.AudioSystem");
var j = Clazz._4Name ("javax.sound.sampled.Line$Info");
var k = i.getMethod ("getLine", [j]);
a = k.invoke (null, [h]);
var l = g.getMethod ("open", [c, Number]);
l.invoke (a, [e,  new Integer (4096)]);
var m = g.getMethod ("start", null);
m.invoke (a, null);
var n =  Clazz.newByteArray (1, 0);
b = g.getMethod ("write", [n.getClass (), Number, Number]);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
this.b$["test.falstad.FourierFrame"].playThread = null;
return;
} else {
throw e;
}
}
var c =  new test.falstad.FFT3 (16384);
var d = null;
var e = null;
var f = 0;
while (this.b$["test.falstad.FourierFrame"].soundCheck.getState () && test.falstad.Fourier.ogf != null) {
if (d == null || this.changed) {
d =  Clazz.newDoubleArray (32768, 0);
var g;
var h = this.b$["test.falstad.FourierFrame"].termBar.getValue ();
var i = 2 * 3.141592653589793 * this.b$["test.falstad.FourierFrame"].getFreq () / 22050;
var j = .2;
this.changed = false;
for (g = 1; g != h; g++) {
if (this.b$["test.falstad.FourierFrame"].hasSolo && !this.b$["test.falstad.FourierFrame"].solos[g]) continue;
if (this.b$["test.falstad.FourierFrame"].mutes[g]) continue;
var k = this.b$["test.falstad.FourierFrame"].dfreq0 * g;
if (k >= 16384) break;
var l = (g & 1) == 1 ? -1 : 1;
d[k] = l * this.b$["test.falstad.FourierFrame"].magcoef[g] * Math.cos (this.b$["test.falstad.FourierFrame"].phasecoef[g]);
d[k + 1] = -l * this.b$["test.falstad.FourierFrame"].magcoef[g] * Math.sin (this.b$["test.falstad.FourierFrame"].phasecoef[g]);
}
c.transform (d, true);
for (g = 0; g != 16384; g++) {
var k = d[g * 2];
if (k > j) j = k;
if (k < -j) j = -k;
}
e =  Clazz.newByteArray (32768, 0);
var k = 32767 / j;
for (g = 0; g != 16384; g++) {
var l = Clazz.doubleToShort (d[g * 2] * k);
e[g * 2] = (Clazz.doubleToInt (l / 256));
e[g * 2 + 1] = (l & 255);
}
}try {
var g = 4096;
if (f >= e.length) f = 0;
b.invoke (a, [e,  new Integer (f),  new Integer (g)]);
f += g;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
break;
} else {
throw e;
}
}
}
this.b$["test.falstad.FourierFrame"].playThread = null;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"sampleCount", 1024,
"halfSampleCount", 512,
"halfSampleCountFloat", 512,
"pi", 3.14159265358979323846,
"step", 0.006135923151542565,
"SEL_NONE", 0,
"SEL_FUNC", 1,
"SEL_MAG", 2,
"SEL_PHASE", 3,
"SEL_MUTES", 4,
"SEL_SOLOS", 5);
c$ = Clazz.decorateAsClass (function () {
this.wtabf = null;
this.wtabi = null;
this.size = 0;
Clazz.instantialize (this, arguments);
}, test.falstad, "FFT3");
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
