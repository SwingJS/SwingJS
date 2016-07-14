Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.InterferenceCanvas", "$.Interference", "$.InterferenceFrame", "$.InterferenceLayout"], ["java.awt.Color", "$.Dimension", "java.lang.Thread", "java.text.NumberFormat", "javax.sound.sampled.AudioFormat", "$.AudioSystem", "$.DataLine", "$.SourceDataLine", "swingjs.awt.Checkbox", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "InterferenceCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.InterferenceCanvas, []);
this.pg = p;
}, "test.falstad.InterferenceFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateInterference (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateInterference (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "InterferenceLayout", null, java.awt.LayoutManager);
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
}, test.falstad, "Interference", swingjs.awt.Applet);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.Interference.ff != null) test.falstad.Interference.ff.dispose ();
test.falstad.Interference.ff = null;
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.Interference.ff =  new test.falstad.InterferenceFrame (null);
test.falstad.Interference.ff.init ();
}, "~A");
Clazz.overrideMethod (c$, "init", 
function () {
test.falstad.Interference.ff =  new test.falstad.InterferenceFrame (this);
test.falstad.Interference.ff.init ();
});
Clazz.overrideMethod (c$, "destroy", 
function () {
if (test.falstad.Interference.ff != null) test.falstad.Interference.ff.dispose ();
test.falstad.Interference.ff = null;
});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.Interference.ff == null) s = "Applet is finished.";
 else if (test.falstad.Interference.ff.useFrame) test.falstad.Interference.ff.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.Interference, "paint", [g]);
}, "java.awt.Graphics");
Clazz.defineStatics (c$,
"ff", null);
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.applet = null;
this.soundCheck = null;
this.stereoCheck = null;
this.metricCheck = null;
this.freqBar = null;
this.phaseBar = null;
this.brightnessBar = null;
this.speakerSepBar = null;
this.scaleBar = null;
this.balanceBar = null;
this.dragX = 0;
this.dragY = 0;
this.measureX = 0;
this.measureY = 0;
this.dragging = false;
this.java2present = false;
this.cv = null;
this.nf = null;
this.main = null;
this.showControls = false;
this.useFrame = false;
this.shown = false;
this.bufferSize = 8192;
this.precalcSize = 16384;
this.line = null;
this.lineBuffer = null;
this.playSampleCount = 0;
this.blockAdder = 0;
this.gridSize = 100;
Clazz.instantialize (this, arguments);
}, test.falstad, "InterferenceFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.ItemListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, Runnable]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "Interference by Paul Falstad";
});
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.InterferenceFrame, ["Interference Applet"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.Interference");
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
this.nf = java.text.NumberFormat.getInstance ();
this.nf.setMaximumFractionDigits (1);
this.java2present = true;
if (System.getProperty ("java.version").indexOf ("1.1") == 0) this.java2present = false;
this.main.setLayout ( new test.falstad.InterferenceLayout ());
this.cv =  new test.falstad.InterferenceCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.main.add (this.soundCheck =  new swingjs.awt.Checkbox ("Sound"));
this.soundCheck.addItemListener (this);
this.main.add (this.stereoCheck =  new swingjs.awt.Checkbox ("Stereo"));
this.stereoCheck.addItemListener (this);
this.main.add (this.metricCheck =  new swingjs.awt.Checkbox ("Metric Units", true));
this.metricCheck.addItemListener (this);
this.main.add ( new swingjs.awt.Label ("Speaker Separation", 0));
this.main.add (this.speakerSepBar =  new swingjs.awt.Scrollbar (0, 68, 1, 1, 600));
this.speakerSepBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Playing Frequency", 0));
this.main.add (this.freqBar =  new swingjs.awt.Scrollbar (0, 750, 1, 0, 1100));
this.freqBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Phase Difference", 0));
this.main.add (this.phaseBar =  new swingjs.awt.Scrollbar (0, 50, 1, 0, 100));
this.phaseBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Balance", 0));
this.main.add (this.balanceBar =  new swingjs.awt.Scrollbar (0, 50, 1, 0, 100));
this.balanceBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 280, 1, 1, 1000));
this.brightnessBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("View Scale", 0));
this.main.add (this.scaleBar =  new swingjs.awt.Scrollbar (0, 200, 1, 100, 1000));
this.scaleBar.addAdjustmentListener (this);
this.balanceBar.disable ();
this.phaseBar.disable ();
this.main.add ( new swingjs.awt.Label ("http://www.falstad.com", 0));
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
});
Clazz.defineMethod (c$, "getFreq", 
function () {
return Clazz.doubleToInt (27.5 * java.lang.Math.exp (this.freqBar.getValue () * .004158883084));
});
Clazz.defineMethod (c$, "doPlay", 
function () {
if (!this.soundCheck.getState ()) return;
var rate = 44100;
this.playSampleCount = 8192;
var i;
var b =  Clazz.newByteArray (16384, 0);
var mult = 126;
var k = this.getFreq () * 2 * 3.141592653589793 / 44100;
var pd = Clazz.doubleToInt (44100 / this.getFreq ());
var phase = this.phaseBar.getValue () * 2 * 3.141592653589793 / 100.;
var multR = this.balanceBar.getValue () / 100.;
var cycles = Clazz.doubleToInt (8192 * k / (6.283185307179586));
this.blockAdder = 2 * Clazz.doubleToInt (cycles * 2 * 3.141592653589793 / k);
if (!this.stereoCheck.getState ()) {
phase = 0;
multR = .5;
}var multL = 1 - multR;
var multMax = (multL < multR) ? multR : multL;
multL /= multMax;
multR /= multMax;
for (i = 0; i != this.playSampleCount; i++) {
var q1 = multL * java.lang.Math.sin (i * k);
var q2 = multR * java.lang.Math.sin (i * k - phase);
b[i * 2] = Clazz.doubleToByte (q1 * mult);
b[i * 2 + 1] = Clazz.doubleToByte (q2 * mult);
}
var format =  new javax.sound.sampled.AudioFormat (44100, 8, 2, true, false);
var info =  new javax.sound.sampled.DataLine.Info (javax.sound.sampled.SourceDataLine, format);
if (this.line == null) {
try {
this.line = javax.sound.sampled.AudioSystem.getLine (info);
this.line.open (format, 8192);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.line.start ();
}this.lineBuffer = b;
this.start ();
this.cv.repaint ();
});
Clazz.defineMethod (c$, "centerString", 
function (g, s, y) {
var fm = g.getFontMetrics ();
g.setColor (java.awt.Color.black);
var w = fm.stringWidth (s);
g.fillRect (Clazz.doubleToInt ((this.winSize.width - 8 - w) / 2), y - fm.getAscent (), w + 8, fm.getAscent () + fm.getDescent ());
g.setColor (java.awt.Color.white);
g.drawString (s, Clazz.doubleToInt ((this.winSize.width - w) / 2), y);
}, "java.awt.Graphics,~S,~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateInterference", 
function (realg) {
if (!this.java2present) {
this.centerString (realg, "Need java2 for this applet.", 100);
return;
}var g = this.dbimage.getGraphics ();
if (this.winSize == null || this.winSize.width == 0) return;
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
var x;
var y;
var k = this.getFreq () * 2 * 3.141592653589793 / 34500.;
var mult = this.brightnessBar.getValue () / 100.;
var phase = this.phaseBar.getValue () * 2 * 3.141592653589793 / 100.;
var speakerSep = this.speakerSepBar.getValue ();
var scale = this.scaleBar.getValue ();
var scaler = scale / 100;
var multR = this.balanceBar.getValue () / 100.;
if (!this.stereoCheck.getState ()) {
multR = .5;
phase = 0;
}var multL = 1 - multR;
for (x = 0; x != 100; x++) for (y = 0; y != 100; y++) {
var x1 = Clazz.doubleToInt (x * this.winSize.width / 100);
var y1 = Clazz.doubleToInt (y * this.winSize.height / 100);
var x2 = Clazz.doubleToInt ((x + 1) * this.winSize.width / 100);
var y2 = Clazz.doubleToInt ((y + 1) * this.winSize.height / 100);
var xx = (x - 50) * scaler;
var yy = y * scaler;
var xx1 = xx + speakerSep / 2.;
var r1 = java.lang.Math.sqrt (xx1 * xx1 + yy * yy);
var xx2 = xx - speakerSep / 2.;
var r2 = java.lang.Math.sqrt (xx2 * xx2 + yy * yy);
var r1s = multL / r1;
var r2s = multR / r2;
r1 *= k;
r2 *= k;
var q1 = r1s * java.lang.Math.sin (r1) + r2s * java.lang.Math.sin (r2 + phase);
var q2 = r1s * java.lang.Math.cos (r1) + r2s * java.lang.Math.cos (r2 + phase);
var q = (q1 * q1 + q2 * q2);
q = java.lang.Math.log (q) / mult + 5;
if (q > 2) q = 2;
if (q < 0) q = 0;
var col = 0;
if (r1s > .1 || r2s > .1) col = 0xFF0000FF;
 else if (q < 1) {
var val = Clazz.doubleToInt (q * 255);
col = (-16777216) | (val << 8);
} else {
var val = Clazz.doubleToInt ((q - 1) * 255);
col = (-16777216) | (65280) | (val * 0x10001);
}g.setColor ( new java.awt.Color (col));
g.fillRect (x1, y1, x2 - x1, y2 - y1);
}

var f = this.getFreq ();
g.setColor (java.awt.Color.white);
this.centerString (g, "Frequency = " + this.getFreq () + " Hz", this.winSize.height - 100);
this.centerString (g, "Wavelength = " + this.convertUnits (Clazz.doubleToInt (34500 / this.getFreq ())), this.winSize.height - 80);
this.centerString (g, "Speaker separation = " + this.convertUnits (speakerSep), this.winSize.height - 60);
this.centerString (g, "Phase difference = " + Clazz.doubleToInt (phase * 180 / 3.141592653589793) + "\u00b0", this.winSize.height - 40);
if (this.dragging) {
g.setColor (java.awt.Color.blue);
g.drawLine (this.dragX, this.dragY, this.measureX, this.measureY);
var xdist = this.measureX - this.dragX;
var ydist = this.measureY - this.dragY;
var xx = xdist * scaler * 100 / this.winSize.width;
var yy = ydist * scaler * 100 / this.winSize.height;
var cm = Clazz.doubleToInt (java.lang.Math.sqrt (xx * xx + yy * yy));
g.setColor (java.awt.Color.white);
this.centerString (g, "Path length = " + this.convertUnits (cm), this.winSize.height - 20);
}realg.drawImage (this.dbimage, 0, 0, this);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "convertUnits", 
function (x) {
if (this.metricCheck.getState ()) return x + " cm";
return this.nf.format (x / 2.54) + "\"";
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
}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
if (e.getSource () === this.freqBar || e.getSource () === this.phaseBar || e.getSource () === this.balanceBar) this.doPlay ();
this.cv.repaint ();
}, "java.awt.event.AdjustmentEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.dragging = true;
this.measureX = e.getX ();
this.measureY = e.getY ();
this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
if ((e.getModifiers () & 16) != 0) return;
this.cv.repaint ();
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
this.measureX = this.dragX = e.getX ();
this.measureY = this.dragY = e.getY ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.dragging = false;
this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (e.getItemSelectable () === this.soundCheck || e.getItemSelectable () === this.stereoCheck) {
this.doPlay ();
if (!this.stereoCheck.getState ()) {
this.balanceBar.disable ();
this.phaseBar.disable ();
} else {
this.balanceBar.enable ();
this.phaseBar.enable ();
}}this.cv.repaint ();
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame ();
this.soundCheck.setState (false);
return true;
}return Clazz.superCall (this, test.falstad.InterferenceFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "start", 
function () {
if (this.engine == null) {
this.engine =  new Thread (this);
this.engine.start ();
}});
Clazz.defineMethod (c$, "stop", 
function () {
if (this.engine != null && this.engine.isAlive ()) {
this.engine.stop ();
}this.engine = null;
});
Clazz.overrideMethod (c$, "run", 
function () {
try {
var offset = 0;
while (true) {
if (!this.soundCheck.getState ()) break;
var q =  Clazz.newByteArray (8192, 0);
var i;
var len = (8192 + offset > this.blockAdder) ? this.blockAdder - offset : 8192;
for (i = 0; i != len; i++) q[i] = this.lineBuffer[i + offset];

this.line.write (q, 0, len);
offset += len;
if (offset >= this.blockAdder) offset = 0;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
this.engine = null;
});
Clazz.defineStatics (c$,
"pi", 3.14159265358979323846);
});
