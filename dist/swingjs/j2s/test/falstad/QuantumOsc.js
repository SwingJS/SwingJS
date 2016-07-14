Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "$.Rectangle", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.QuantumOscFrame", "$.QuantumOscLayout", "$.QuantumOscCanvas", "$.QuantumOsc"], ["java.awt.Color", "$.Dimension", "java.awt.image.MemoryImageSource", "java.util.Random", "swingjs.awt.Button", "$.Checkbox", "$.CheckboxMenuItem", "$.Choice", "$.Label", "$.Menu", "$.MenuBar", "$.MenuItem", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "QuantumOscCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.QuantumOscCanvas, []);
this.pg = p;
}, "test.falstad.QuantumOscFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateQuantumOsc (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateQuantumOsc (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "QuantumOscLayout", null, java.awt.LayoutManager);
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
c$ = Clazz.declareType (test.falstad, "QuantumOsc", swingjs.awt.Applet);
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.QuantumOsc.mf =  new test.falstad.QuantumOscFrame (null);
test.falstad.QuantumOsc.mf.init ();
}, "~A");
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.QuantumOsc.mf != null) test.falstad.QuantumOsc.mf.dispose ();
test.falstad.QuantumOsc.mf = null;
});
Clazz.overrideMethod (c$, "init", 
function () {
test.falstad.QuantumOsc.mf =  new test.falstad.QuantumOscFrame (this);
test.falstad.QuantumOsc.mf.init ();
});
Clazz.overrideMethod (c$, "destroy", 
function () {
if (test.falstad.QuantumOsc.mf != null) test.falstad.QuantumOsc.mf.dispose ();
test.falstad.QuantumOsc.mf = null;
});
Clazz.defineStatics (c$,
"mf", null);
c$ = Clazz.decorateAsClass (function () {
this.winSize = null;
this.dbimage = null;
this.random = null;
this.sampleCount = 0;
this.groundButton = null;
this.blankButton = null;
this.normalizeButton = null;
this.maximizeButton = null;
this.stoppedCheck = null;
this.memoryImageSourceCheck = null;
this.eCheckItem = null;
this.xCheckItem = null;
this.pCheckItem = null;
this.lCheckItem = null;
this.statesCheckItem = null;
this.lStatesCheckItem = null;
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
this.speedBar = null;
this.forceBar = null;
this.resBar = null;
this.aspectBar = null;
this.brightnessBar = null;
this.viewPotential = null;
this.viewX = null;
this.viewP = null;
this.viewL = null;
this.viewStates = null;
this.viewLStates = null;
this.viewCurrent = null;
this.viewXMap = null;
this.viewPMap = null;
this.viewStatesMap = null;
this.viewLStatesMap = null;
this.viewList = null;
this.viewCount = 0;
this.changingDerivedStates = false;
this.dragStop = false;
this.aspectRatio = 1;
this.hermite = null;
this.data = null;
this.states = null;
this.lzStates = null;
this.lzStateCount = 0;
this.selectedState = null;
this.selectedPhasor = null;
this.lzspectrum = null;
this.step = 0;
this.func = null;
this.funci = null;
this.translateFunc = null;
this.translateFunci = null;
this.pfuncr = null;
this.pfunci = null;
this.phaseColors = null;
this.whitePhaseColor = null;
this.grayLevels = null;
this.xpoints = null;
this.ypoints = null;
this.floorValues = null;
this.selectedGridX = 0;
this.selectedGridY = 0;
this.selectedPaneHandle = 0;
this.selectedGridFunc = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.dragSet = false;
this.dragClear = false;
this.magDragStart = 0;
this.dragging = false;
this.t = 0;
this.alpha = 0;
this.pause = 0;
this.cv = null;
this.applet = null;
this.gray1 = null;
this.gray2 = null;
this.lastTime = 0;
this.lspacing = 3;
this.lastGaussWx = -0.039;
this.lastGaussWy = -0.039;
this.momentumX = 0;
this.momentumY = 0;
this.finished = false;
if (!Clazz.isClassDefined ("test.falstad.QuantumOscFrame.PhaseColor")) {
test.falstad.QuantumOscFrame.$QuantumOscFrame$PhaseColor$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOscFrame.View")) {
test.falstad.QuantumOscFrame.$QuantumOscFrame$View$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOscFrame.Phasor")) {
test.falstad.QuantumOscFrame.$QuantumOscFrame$Phasor$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOscFrame.Complex")) {
test.falstad.QuantumOscFrame.$QuantumOscFrame$Complex$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOscFrame.State")) {
test.falstad.QuantumOscFrame.$QuantumOscFrame$State$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOscFrame.BasisState")) {
test.falstad.QuantumOscFrame.$QuantumOscFrame$BasisState$ ();
}
if (!Clazz.isClassDefined ("test.falstad.QuantumOscFrame.DerivedState")) {
test.falstad.QuantumOscFrame.$QuantumOscFrame$DerivedState$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "QuantumOscFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "QuantumOsc by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.QuantumOscFrame, ["Quantum 2-D Oscillator Applet v1.2a"]);
this.applet = a;
}, "test.falstad.QuantumOsc");
Clazz.defineMethod (c$, "init", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var os = System.getProperty ("os.name");
var jv = System.getProperty ("java.version");
var altRender = false;
if (os.indexOf ("Windows") == 0) {
if (jv.indexOf ("1.1") == 0) altRender = true;
}this.setLayout ( new test.falstad.QuantumOscLayout ());
this.cv =  new test.falstad.QuantumOscCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.add (this.cv);
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
m.add (this.statesCheckItem = this.getCheckItem ("Rectangular States"));
this.statesCheckItem.setState (true);
m.add (this.lStatesCheckItem = this.getCheckItem ("Angular States"));
m.addSeparator ();
m.add (this.expectCheckItem = this.getCheckItem ("Expectation Values"));
this.expectCheckItem.setState (true);
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
this.mouseChooser.add ("Mouse = Translate Function");
this.mouseChooser.add ("Mouse = Scale Function");
this.mouseChooser.addItemListener (this);
this.add (this.mouseChooser);
this.add (this.blankButton =  new swingjs.awt.Button ("Clear"));
this.blankButton.addActionListener (this);
this.add (this.normalizeButton =  new swingjs.awt.Button ("Normalize"));
this.normalizeButton.addActionListener (this);
this.add (this.maximizeButton =  new swingjs.awt.Button ("Maximize"));
this.maximizeButton.addActionListener (this);
this.add (this.groundButton =  new swingjs.awt.Button ("Ground State"));
this.groundButton.addActionListener (this);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
this.add (this.stoppedCheck);
this.memoryImageSourceCheck =  new swingjs.awt.Checkbox ("Alternate Rendering", altRender);
this.memoryImageSourceCheck.addItemListener (this);
this.add (this.memoryImageSourceCheck);
this.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 138, 1, 1, 300));
this.speedBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Brightness", 0));
this.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 1100, 1, 700, 2000));
this.brightnessBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Resolution", 0));
this.add (this.resBar =  new swingjs.awt.Scrollbar (0, 6, 1, 5, 9));
this.resBar.addAdjustmentListener (this);
this.resBar.setBlockIncrement (1);
this.add ( new swingjs.awt.Label ("Aspect Ratio", 0));
this.add (this.aspectBar =  new swingjs.awt.Scrollbar (0, 10, 1, 5, 31));
this.aspectBar.addAdjustmentListener (this);
this.setLoadCount ();
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

this.whitePhaseColor = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.PhaseColor, this, null, 1, 1, 1);
this.grayLevels =  new Array (256);
for (i = 0; i != 256; i++) this.grayLevels[i] =  new java.awt.Color (i, i, i);

this.random =  new java.util.Random ();
this.reinit ();
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (java.awt.Color.lightGray);
this.resize (800, 700);
this.show ();
this.handleResize ();
this.finished = true;
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
c = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.PhaseColor, this, null, 1, a2, 0);
break;
case 1:
c = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.PhaseColor, this, null, a3, 1, 0);
break;
case 2:
c = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.PhaseColor, this, null, 0, 1, a2);
break;
case 3:
c = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.PhaseColor, this, null, 0, a3, 1);
break;
case 4:
c = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.PhaseColor, this, null, a2, 0, 1);
break;
case 5:
c = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.PhaseColor, this, null, 1, 0, a3);
break;
}
return c;
}, "~N,~N");
Clazz.defineMethod (c$, "reinit", 
function () {
this.momentumX = 0;
this.momentumY = .490873;
this.selectedGridX = Clazz.doubleToInt (this.sampleCount * 22 / 32);
this.selectedGridY = Clazz.doubleToInt (this.sampleCount / 2);
this.drawXGaussP ();
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
this.viewX = this.viewPotential = this.viewP = this.viewL = this.viewStates = this.viewLStates = null;
this.viewList =  new Array (10);
var i = 0;
if (this.eCheckItem.getState ()) this.viewList[i++] = this.viewPotential = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.View, this, null);
if (this.xCheckItem.getState ()) this.viewList[i++] = this.viewX = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.View, this, null);
if (this.pCheckItem.getState ()) this.viewList[i++] = this.viewP = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.View, this, null);
if (this.lCheckItem.getState () && this.aspectRatio == 1) this.viewList[i++] = this.viewL = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.View, this, null);
if (this.statesCheckItem.getState ()) this.viewList[i++] = this.viewStates = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.View, this, null);
if (this.lStatesCheckItem.getState () && this.aspectRatio == 1) this.viewList[i++] = this.viewLStates = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.View, this, null);
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
this.viewXMap = this.viewPMap = null;
this.viewStatesMap = null;
this.viewLStatesMap = null;
if (this.viewStates != null) {
this.viewStatesMap = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.View, this, null, this.viewStates);
this.viewStatesMap.x = Clazz.doubleToInt ((this.winSize.width - this.viewStatesMap.height) / 2);
this.viewStatesMap.width -= this.viewStatesMap.x * 2;
}if (this.viewLStates != null) {
this.viewLStatesMap = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.View, this, null, this.viewLStates);
this.viewLStatesMap.x = Clazz.doubleToInt ((this.winSize.width - this.viewLStatesMap.height) / 2);
this.viewLStatesMap.width -= this.viewLStatesMap.x * 2;
}if (this.viewX != null) {
this.viewXMap = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.View, this, null, this.viewX);
this.processMap (this.viewXMap, this.aspectRatio);
}if (this.viewP != null) {
this.viewPMap = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.View, this, null, this.viewP);
this.processMap (this.viewPMap, 1 / this.aspectRatio);
}if (this.viewL != null) {
var v = this.viewL;
v.mid_y = v.y + Clazz.doubleToInt (v.height / 2);
v.ymult = .90 * v.height / 2;
v.lower_y = Clazz.doubleToInt (v.mid_y + v.ymult);
v.ymult2 = v.ymult * 2;
}this.floorValues = null;
var i;
var j;
if (this.viewStatesMap != null) {
var termWidth = Clazz.doubleToInt (this.viewStatesMap.height / 10);
this.viewStatesMap.phasorCount = 100;
var phasors = this.viewStatesMap.phasors =  new Array (this.viewStatesMap.phasorCount);
var pn = 0;
for (i = 1; i <= 10; i++) for (j = 1; j <= 10; j++) {
var x = this.viewStatesMap.x + (i - 1) * termWidth;
var y = this.viewStatesMap.y + (j - 1) * termWidth;
var ph = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.Phasor, this, null, x, y, termWidth, termWidth);
ph.state = this.states[i - 1][j - 1];
phasors[pn++] = ph;
}

}if (this.viewLStatesMap != null) {
var termWidth = Clazz.doubleToInt (this.viewLStatesMap.height / 10);
var ct = this.viewLStatesMap.phasorCount = 55;
var phasors = this.viewLStatesMap.phasors =  new Array (ct);
var pn = 0;
for (i = 1; i <= 10; i++) for (j = 1; j <= i; j++) {
var y = this.viewLStatesMap.y + (i - 1) * termWidth;
var x = this.viewLStatesMap.x + (j - 1) * termWidth - Clazz.doubleToInt ((i - 1) * termWidth / 2) + Clazz.doubleToInt (this.viewLStatesMap.width / 2);
var ph = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.Phasor, this, null, x, y, termWidth, termWidth);
ph.state = this.lzStates[pn];
phasors[pn++] = ph;
}

}});
Clazz.defineMethod (c$, "processMap", 
function (v, ar) {
var a = v.width / v.height;
var w;
var h;
if (ar > a) {
w = v.width - 2;
h = Clazz.doubleToInt (w / ar);
} else {
h = v.height - 2;
w = Clazz.doubleToInt (h * ar);
}v.x += Clazz.doubleToInt ((v.width - w) / 2) + 1;
v.y += Clazz.doubleToInt ((v.height - h) / 2) + 1;
v.width = w;
v.height = h;
if (this.memoryImageSourceCheck.getState ()) {
v.pixels =  Clazz.newIntArray (v.width * v.height, 0);
var i;
for (i = 0; i != v.width * v.height; i++) v.pixels[i] = 0xFF000000;

v.imageSource =  new java.awt.image.MemoryImageSource (v.width, v.height, v.pixels, 0, v.width);
}}, "test.falstad.QuantumOscFrame.View,~N");
Clazz.defineMethod (c$, "min", 
function (x, y) {
return (x < y) ? x : y;
}, "~N,~N");
Clazz.defineMethod (c$, "doGround", 
function () {
var x;
var y;
for (x = 0; x != 14; x++) for (y = 0; y != 14; y++) this.states[x][y].set (0);


this.states[0][0].set (1, 0);
});
Clazz.defineMethod (c$, "doBlank", 
function () {
var x;
var y;
for (x = 0; x <= this.sampleCount; x++) for (y = 0; y <= this.sampleCount; y++) this.func[x][y] = 0;


this.transform (true);
});
Clazz.defineMethod (c$, "normalize", 
function () {
var norm = 0;
var i;
var j;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) norm += this.states[i][j].magSquared ();


if (norm == 0) return;
var normmult = 1 / java.lang.Math.sqrt (norm);
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) this.states[i][j].mult (normmult);


this.cv.repaint (this.pause);
});
Clazz.defineMethod (c$, "maximize", 
function () {
var i;
var j;
var maxm = 0;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) if (this.states[i][j].mag > maxm) maxm = this.states[i][j].mag;


if (maxm == 0) return;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) this.states[i][j].mult (1 / maxm);


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
for (i = 0; i < 14; i++) for (j = 0; j < 14; j++) {
var m = this.states[i][j].magSquared ();
n -= m;
if (n < 0) {
picki = i;
pickj = j;
i = j = 14;
break;
}}

if (picki == -1) return;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
var st = this.states[i][j];
if (st.elevel != this.states[picki][pickj].elevel) st.set (0);
}

if (this.alwaysNormItem.getState ()) this.normalize ();
 else this.maximize ();
});
Clazz.defineMethod (c$, "transform", 
function (novel) {
this.t = 0;
var x;
var y;
var i;
var j;
for (x = 0; x != 14; x++) for (y = 0; y != 14; y++) {
var st = this.states[x][y];
var nx = st.nx;
var ny = st.ny;
var a = 0;
var b = 0;
for (i = 0; i != this.sampleCount; i++) for (j = 0; j != this.sampleCount; j++) {
var q = this.hermite[nx][i] * this.hermite[ny][j];
a += q * this.func[i][j];
b += q * this.funci[i][j];
}

if (a < 0.01 && a > -0.01) a = 0;
if (b < 0.01 && b > -0.01) b = 0;
if (novel) b = 0;
st.set (a, b);
}

this.cv.repaint (this.pause);
if (this.alwaysNormItem.getState ()) this.normalize ();
 else if (this.alwaysMaxItem.getState ()) this.maximize ();
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
Clazz.defineMethod (c$, "updateQuantumOsc", 
function (realg) {
if (this.winSize == null || this.winSize.width == 0) {
this.handleResize ();
return;
}var g = this.dbimage.getGraphics ();
var allQuiet = true;
var tadd = 0;
if (!this.stoppedCheck.getState () && !this.dragging) {
var val = this.speedBar.getValue ();
tadd = Math.exp (val / 20.) * (0.02);
var sysTime = System.currentTimeMillis ();
if (this.lastTime == 0) this.lastTime = sysTime;
tadd *= (sysTime - this.lastTime) * (0.002);
this.t += tadd;
this.lastTime = sysTime;
allQuiet = false;
} else this.lastTime = 0;
if (this.gray1 == null) {
this.gray1 =  new java.awt.Color (76, 76, 76);
this.gray2 =  new java.awt.Color (127, 127, 127);
}g.setColor (this.cv.getBackground ());
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
this.xpoints =  Clazz.newIntArray (3, 0);
this.xpoints =  Clazz.newIntArray (3, 0);
if (this.dragStop) this.t = 0;
var norm = 0;
var normmult = 0;
var normmult2 = 0;
for (i = 0; i != 14; i++) {
for (j = 0; j != 14; j++) {
var st = this.states[i][j];
if (st.mag < 0.01) {
st.set (0);
continue;
}allQuiet = false;
st.rotate (-st.elevel * tadd);
norm += st.magSquared ();
}
}
normmult2 = 1 / norm;
if (norm == 0) normmult2 = 0;
normmult = java.lang.Math.sqrt (normmult2);
if (!this.changingDerivedStates) this.convertBasisToDerived ();
this.genFunc (normmult);
var brightmult = java.lang.Math.exp (this.brightnessBar.getValue () / 200. - 5);
if (norm == 0) normmult = normmult2 = 0;
if (this.dragStop) allQuiet = true;
var half = Clazz.doubleToInt (this.sampleCount / 2);
if (this.viewPotential != null) {
var floory = this.viewPotential.y + this.viewPotential.height - 5;
var ymult = 100;
if (this.floorValues == null) this.floorValues =  Clazz.newIntArray (floory + 1, 0);
for (i = 0; i <= floory; i++) this.floorValues[i] = 0;

for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
var st = this.states[i][j];
var dy = st.elevel;
var m = st.magSquared ();
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
var oy = -1;
var xmult = this.alpha * this.sampleCount;
var omegax = (this.states[1][0].elevel - this.states[0][0].elevel) * .5;
if (this.aspectRatio != 1) {
var omegay = (this.states[0][1].elevel - this.states[0][0].elevel) * .5;
g.setColor (this.gray1);
for (i = 0; i != this.winSize.width; i++) {
var xx = ((i - Clazz.doubleToInt (this.winSize.width / 2)) / this.viewXMap.width) * xmult;
var dy = xx * xx * omegay;
y = floory - Clazz.doubleToInt (ymult * dy);
if (i > 0) g.drawLine (i - 1, oy, i, y);
oy = y;
}
}g.setColor (java.awt.Color.white);
for (i = 0; i != this.winSize.width; i++) {
var xx = ((i - Clazz.doubleToInt (this.winSize.width / 2)) / this.viewXMap.width) * xmult;
var dy = xx * xx * omegax;
y = floory - Clazz.doubleToInt (ymult * dy);
if (i > 0) g.drawLine (i - 1, oy, i, y);
oy = y;
}
if (norm != 0 && (this.expectCheckItem.getState () || this.uncertaintyCheckItem.getState ())) {
var expecte = 0;
var expecte2 = 0;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
var st = this.states[i][j];
var prob = st.magSquared () * normmult2;
expecte += prob * st.elevel;
expecte2 += prob * st.elevel * st.elevel;
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
y = floory - Clazz.doubleToInt (ymult * (expecte + .0001));
g.setColor (java.awt.Color.red);
g.drawLine (0, y, this.winSize.width, y);
}}if (this.selectedState != null && !this.dragging) {
g.setColor (java.awt.Color.yellow);
y = floory - Clazz.doubleToInt (ymult * this.selectedState.elevel);
g.drawLine (0, y, this.winSize.width, y);
}}if (this.viewXMap != null) this.updateMapView (g, this.viewXMap, this.func, this.funci, this.sampleCount, brightmult);
if (this.viewPMap != null) {
var pres = this.sampleCount * 2;
for (x = 0; x != this.sampleCount * this.sampleCount * 8; x++) this.data[x] = 0;

var ymult = pres * 2;
var nn =  Clazz.newIntArray (2, 0);
nn[0] = nn[1] = pres;
var mask = pres - 1;
var s2 = this.sampleCount;
var poff = Clazz.doubleToInt ((pres - this.sampleCount) / 2);
for (x = 0; x != this.sampleCount; x++) for (y = 0; y != this.sampleCount; y++) {
var o = ((x + poff + s2) & mask) * 2 + ((y + poff + s2) & mask) * ymult;
this.data[o] = this.func[x][y];
this.data[o + 1] = this.funci[x][y];
}

this.ndfft (this.data, nn, 2, 1);
var m = 1. / (this.sampleCount * 2);
var s0 = 32;
var p0 = Clazz.doubleToInt ((pres - s0 + 2) / 2);
if (this.pfuncr == null) {
this.pfuncr =  Clazz.newDoubleArray (s0 + 1, s0 + 1, 0);
this.pfunci =  Clazz.newDoubleArray (s0 + 1, s0 + 1, 0);
}for (x = 0; x <= s0; x++) for (y = 0; y <= s0; y++) {
var o = ((s0 - 1 - x + p0 + s2) & mask) * 2 + ((s0 - 1 - y + p0 + s2) & mask) * ymult;
this.pfuncr[x][y] = this.data[o] * m;
this.pfunci[x][y] = this.data[o + 1] * m;
}

this.updateMapView (g, this.viewPMap, this.pfuncr, this.pfunci, s0, brightmult);
} else {
this.pfuncr = this.pfunci = null;
}if (this.viewL != null) {
var lzcount = 87;
this.calcLSpectrum ();
for (i = 0; i != lzcount; i++) this.lzspectrum[i] = java.lang.Math.sqrt (this.lzspectrum[i]);

this.drawFunction (g, this.viewL, this.lzspectrum, null, lzcount, 0);
}if (this.viewStatesMap != null) {
this.drawPhasors (g, this.viewStatesMap);
g.setColor (java.awt.Color.white);
var termWidth = this.getTermWidth ();
if (this.viewStatesMap.x > Clazz.doubleToInt (termWidth * 3 / 2) && this.aspectRatio == 1) {
x = this.winSize.width - termWidth;
y = this.viewStatesMap.y + Clazz.doubleToInt (this.viewStatesMap.height / 2);
var omega = this.states[0][0].elevel;
var tcos = java.lang.Math.cos (-omega * this.t + 1.5707963267948966);
var tsin = java.lang.Math.sin (-omega * this.t + 1.5707963267948966);
var ss2 = Clazz.doubleToInt (termWidth / 2);
var xa = Clazz.doubleToInt (tcos * ss2);
var ya = Clazz.doubleToInt (-tsin * ss2);
g.drawOval (x - ss2, y - ss2, termWidth, termWidth);
g.drawLine (x, y, x + xa, y + ya);
g.fillOval (x + xa - 1, y + ya - 1, 3, 3);
}}if (this.viewLStatesMap != null) this.drawPhasors (g, this.viewLStatesMap);
if (this.selectedState != null && this.viewXMap != null) {
g.setColor (java.awt.Color.yellow);
if (Clazz.instanceOf (this.selectedState, test.falstad.QuantumOscFrame.BasisState)) this.drawSelectedBasisState (g);
 else this.drawSelectedLzState (g);
}if (Clazz.instanceOf (this.selectedState, test.falstad.QuantumOscFrame.DerivedState) && this.viewL != null) {
g.setColor (java.awt.Color.yellow);
var lzcount = 87;
var m = (this.selectedState).lz * 3 + Clazz.doubleToInt (lzcount / 2);
x = Clazz.doubleToInt (this.viewL.width * m / (lzcount - 1));
g.drawLine (x, this.viewL.y, x, this.viewL.y + this.viewL.height);
}realg.drawImage (this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState () && !allQuiet) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "drawSelectedBasisState", 
function (g) {
var bst = this.selectedState;
var nx = bst.nx;
var ny = bst.ny;
var i;
var cross = 0;
var s0 = 0;
var xs =  Clazz.newIntArray (nx + 2, 0);
var maxed = false;
var thresh = .02;
for (i = 0; i != this.sampleCount; i++) {
var draw = false;
if (java.lang.Math.abs (this.hermite[nx][i]) > .1) maxed = true;
if (java.lang.Math.abs (this.hermite[nx][i]) > thresh) {
if (cross == 0) draw = true;
} else if (maxed && cross == nx + 1) draw = true;
if (draw || this.hermite[nx][i] * s0 < 0) {
var x = this.viewXMap.x + Clazz.doubleToInt (this.viewXMap.width * i / (this.sampleCount + 1));
xs[cross] = x;
s0 = this.hermite[nx][i];
cross++;
maxed = false;
}}
if (cross <= nx + 1) xs[cross++] = this.viewXMap.x + this.viewXMap.width;
cross = 0;
s0 = 0;
var ys =  Clazz.newIntArray (ny + 2, 0);
maxed = false;
for (i = 0; i != this.sampleCount; i++) {
var draw = false;
if (java.lang.Math.abs (this.hermite[ny][i]) > .1) maxed = true;
if (java.lang.Math.abs (this.hermite[ny][i]) > thresh) {
if (cross == 0) draw = true;
} else if (cross == ny + 1 && maxed) draw = true;
if (draw || this.hermite[ny][i] * s0 < 0) {
var y = this.viewXMap.y + Clazz.doubleToInt (this.viewXMap.height * i / (this.sampleCount + 1));
ys[cross] = y;
s0 = this.hermite[ny][i];
cross++;
maxed = false;
}}
if (cross <= ny + 1) ys[cross] = this.viewXMap.y + this.viewXMap.height;
var j;
for (i = 0; i <= nx; i++) for (j = 0; j <= ny; j++) {
var x1 = xs[i];
var x0 = xs[i + 1] - xs[i];
var y1 = ys[j];
var y0 = ys[j + 1] - ys[j];
g.drawOval (x1 + Clazz.doubleToInt (x0 * 10 / 100), y1 + Clazz.doubleToInt (y0 * 10 / 100), Clazz.doubleToInt (x0 * 80 / 100), Clazz.doubleToInt (y0 * 80 / 100));
}

this.centerString (g, "nx = " + nx + ", ny = " + ny, this.viewX.y + this.viewX.height - 10);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "drawSelectedLzState", 
function (g) {
var ds = this.selectedState;
this.centerString (g, "n = " + (ds.bstates[0].nx + ds.bstates[0].ny) + ", m = " + ds.lz, this.viewX.y + this.viewX.height - 10);
var e = ds.elevel;
var xx = java.lang.Math.sqrt (e * 2) / 1.7888;
var x = Clazz.doubleToInt ((.5 - xx) * this.viewXMap.width);
if (x < 0) return;
g.drawOval (this.viewXMap.x + x, this.viewXMap.y + x, this.viewXMap.width - x * 2, this.viewXMap.width - x * 2);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "drawPhasors", 
function (g, v) {
var i;
for (i = 0; i != v.phasorCount; i++) {
var ph = v.phasors[i];
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
g.fillOval (x + xa - 1, y + ya - 1, 3, 3);
}
}, "java.awt.Graphics,test.falstad.QuantumOscFrame.View");
Clazz.defineMethod (c$, "updateMapView", 
function (g, vmap, arrayr, arrayi, res, brightmult) {
var selectMag = 0;
g.setColor (java.awt.Color.white);
g.drawRect (vmap.x - 1, vmap.y - 1, vmap.width + 2, vmap.height + 2);
var maxsq = 0;
var expectx = 0;
var expectx2 = 0;
var expecty = 0;
var expecty2 = 0;
var tot = 0;
var zero = Clazz.doubleToInt (res / 2);
var x;
var y;
for (y = 0; y <= res; y++) {
for (x = 0; x <= res; x++) {
var dr = arrayr[x][y];
var di = arrayi[x][y];
var dy = dr * dr + di * di;
if (dy > maxsq) maxsq = dy;
var dev = x - zero;
expectx += dy * dev;
expectx2 += dy * dev * dev;
dev = y - zero;
expecty += dy * dev;
expecty2 += dy * dev * dev;
tot += dy;
}
}
expectx /= tot;
expectx2 /= tot;
expecty /= tot;
expecty2 /= tot;
var maxnm = java.lang.Math.sqrt (maxsq);
var uncertx = java.lang.Math.sqrt (expectx2 - expectx * expectx);
var uncerty = java.lang.Math.sqrt (expecty2 - expecty * expecty);
var bestscale = 0;
if (this.probCheckItem.getState () || this.probPhaseCheckItem.getState ()) bestscale = 1 / maxsq;
 else bestscale = 1 / maxnm;
vmap.scale *= 1.1;
vmap.scale = bestscale;
if (vmap.scale > 1e8) vmap.scale = 1e8;
var res1 = res + 1;
var mis = this.memoryImageSourceCheck.getState ();
for (y = 0; y <= res; y++) {
for (x = 0; x <= res; x++) {
var fr = arrayr[x][y];
var fi = arrayi[x][y];
var fv = (fr * fr + fi * fi);
if (this.magPhaseCheckItem.getState ()) fv = java.lang.Math.sqrt (fv);
fv *= 255 * vmap.scale * brightmult;
var c = this.getPhaseColor (fr, fi);
if (fv > 255) fv = 255;
var cr = Clazz.doubleToInt (c.r * fv);
var cg = Clazz.doubleToInt (c.g * fv);
var cb = Clazz.doubleToInt (c.b * fv);
var col = (-16777216) | (cr << 16) | (cg << 8) | cb;
var x1 = Clazz.doubleToInt (x * vmap.width / res1);
var y1 = Clazz.doubleToInt (y * vmap.height / res1);
var x2 = Clazz.doubleToInt ((x + 1) * vmap.width / res1);
var y2 = Clazz.doubleToInt ((y + 1) * vmap.height / res1);
if (mis) {
var ix = x1 + y1 * vmap.width;
var k;
var l;
for (k = 0; k != x2 - x1; k++, ix++) for (l = 0; l != y2 - y1; l++) vmap.pixels[ix + l * vmap.width] = col;


} else {
g.setColor ( new java.awt.Color (col));
g.fillRect (x1 + vmap.x, y1 + vmap.y, x2 - x1, y2 - y1);
}}
}
if (mis) {
g.drawImage (this.cv.createImage (vmap.imageSource), vmap.x, vmap.y, null);
}if (this.uncertaintyCheckItem.getState () && tot > 0) {
g.setColor (java.awt.Color.blue);
var xx1 = Clazz.doubleToInt (vmap.width * (expectx + zero - uncertx + .5) / res1 + vmap.x);
var xx2 = Clazz.doubleToInt (vmap.width * (expectx + zero + uncertx + .5) / res1 + vmap.x);
var yy1 = Clazz.doubleToInt (vmap.height * (expecty + zero - uncerty + .5) / res1 + vmap.y);
var yy2 = Clazz.doubleToInt (vmap.height * (expecty + zero + uncerty + .5) / res1 + vmap.y);
g.drawRect (xx1, yy1, xx2 - xx1, yy2 - yy1);
}if (this.expectCheckItem.getState () && tot > 0) {
g.setColor (java.awt.Color.red);
var xx = Clazz.doubleToInt (vmap.width * (expectx + zero + .5) / res1 + vmap.x);
g.drawLine (xx, vmap.y, xx, vmap.y + vmap.height);
var yy = Clazz.doubleToInt (vmap.height * (expecty + zero + .5) / res1 + vmap.y);
g.drawLine (vmap.x, yy, vmap.x + vmap.width, yy);
}}, "java.awt.Graphics,test.falstad.QuantumOscFrame.View,~A,~A,~N,~N");
Clazz.defineMethod (c$, "calcLSpectrum", 
function () {
var lzcount = 87;
if (this.lzspectrum == null) this.lzspectrum =  Clazz.newDoubleArray (lzcount, 0);
var i;
var j;
for (i = 0; i != lzcount; i++) this.lzspectrum[i] = 0;

var lc = (Clazz.doubleToInt (lzcount / 2));
for (i = 0; i != this.lzStateCount; i++) {
var ds = this.lzStates[i];
var m = lc + 3 * ds.lz;
this.lzspectrum[m] += ds.magSquared ();
}
});
Clazz.defineMethod (c$, "measureL", 
function () {
if (this.aspectRatio != 1) return;
this.normalize ();
this.convertBasisToDerived ();
this.calcLSpectrum ();
var n = this.random.nextDouble ();
var i = 0;
var picki = -1;
var lzcount = 87;
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
for (i = 0; i != this.lzStateCount; i++) {
var ds = this.lzStates[i];
var m = lc + 3 * ds.lz;
if (m != picki) ds.set (0);
}
this.convertDerivedToBasis ();
if (this.alwaysNormItem.getState ()) this.normalize ();
 else this.maximize ();
});
Clazz.defineMethod (c$, "genFunc", 
function (normmult) {
var x;
var y;
var i;
var j;
for (x = 0; x <= this.sampleCount; x++) for (y = 0; y <= this.sampleCount; y++) {
var dr = 0;
var di = 0;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
var st = this.states[i][j];
var q = this.hermite[st.nx][x] * this.hermite[st.ny][y];
dr += q * st.re;
di += q * st.im;
}

this.func[x][y] = dr * normmult;
this.funci[x][y] = di * normmult;
}

}, "~N");
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
var termWidth = Clazz.doubleToInt (this.viewStatesMap.height / 10);
return termWidth;
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
case 4:
this.editMag (x, y);
break;
case 1:
this.findStateByEnergy (y);
this.enterSelectedState ();
break;
case 2:
this.editX (x, y);
break;
case 3:
this.editP (x, y);
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
if (Clazz.instanceOf (this.selectedState, test.falstad.QuantumOscFrame.DerivedState)) {
this.convertDerivedToBasis ();
this.changingDerivedStates = true;
}if (this.alwaysNormItem.getState ()) this.normalize ();
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "convertDerivedToBasis", 
function () {
var i;
var j;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) this.states[i][j].set (0);


var c = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.Complex, this, null);
for (i = 0; i != this.lzStateCount; i++) {
var ds = this.lzStates[i];
for (j = 0; j != ds.count; j++) {
c.set (ds.coefs[j]);
c.conjugate ();
c.mult (ds);
ds.bstates[j].add (c);
}
}
var maxm = 0;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) if (this.states[i][j].mag > maxm) maxm = this.states[i][j].mag;


if (maxm > 1) {
var mult = 1 / maxm;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) this.states[i][j].mult (mult);


}});
Clazz.defineMethod (c$, "convertBasisToDerived", 
function () {
var i;
var j;
var c1 = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.Complex, this, null);
var c2 = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.Complex, this, null);
var maxm = 0;
for (i = 0; i != this.lzStateCount; i++) {
var ds = this.lzStates[i];
c1.set (0);
try {
for (j = 0; j != ds.count; j++) {
c2.set (ds.coefs[j]);
c2.mult (ds.bstates[j]);
c1.add (c2);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.print ("Exception at " + i + "\n");
} else {
throw e;
}
}
if (c1.mag < 0.01) c1.set (0);
ds.set (c1);
if (c1.mag > maxm) maxm = ds.mag;
}
if (maxm > 1) {
var mult = 1 / maxm;
for (i = 0; i != this.lzStateCount; i++) this.lzStates[i].mult (mult);

}});
Clazz.defineMethod (c$, "editMagClick", 
function () {
if (this.selectedState == null) return;
if (this.magDragStart < .5) this.selectedState.set (1, 0);
 else this.selectedState.set (0);
this.cv.repaint (this.pause);
});
Clazz.defineMethod (c$, "editX", 
function (x, y) {
var oldgx = this.selectedGridX;
var oldgy = this.selectedGridY;
switch (this.mouseChooser.getSelectedIndex ()) {
case 0:
this.editXGauss (x, y);
return;
case 1:
this.editXGaussP (x, y);
return;
case 3:
this.editXTranslate (x, y);
return;
case 4:
this.editXScale (x, y);
return;
case 2:
this.editXRotate (x, y);
return;
}
this.findGridPoint2D (this.viewXMap, x, y);
var x1 = oldgx;
var y1 = oldgy;
var x2 = this.selectedGridX;
var y2 = this.selectedGridY;
if (x1 == x2 && y1 == y2) {
this.editFuncPoint (x2, y2, 1);
} else if (this.abs (y2 - y1) > this.abs (x2 - x1)) {
var sgn = this.sign (y2 - y1);
for (y = y1; y != y2 + sgn; y += sgn) {
x = x1 + Clazz.doubleToInt ((x2 - x1) * (y - y1) / (y2 - y1));
this.editFuncPoint (x, y, 1);
}
} else {
var sgn = this.sign (x2 - x1);
for (x = x1; x != x2 + sgn; x += sgn) {
y = y1 + Clazz.doubleToInt ((y2 - y1) * (x - x1) / (x2 - x1));
this.editFuncPoint (x, y, 1);
}
}this.transform (false);
}, "~N,~N");
Clazz.defineMethod (c$, "editP", 
function (x, y) {
var oldgx = this.selectedGridX;
var oldgy = this.selectedGridY;
switch (this.mouseChooser.getSelectedIndex ()) {
case 0:
this.editPGauss (x, y);
return;
}
}, "~N,~N");
Clazz.defineMethod (c$, "sign", 
function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
}, "~N");
Clazz.defineMethod (c$, "abs", 
function (x) {
return x < 0 ? -x : x;
}, "~N");
Clazz.defineMethod (c$, "editFuncPoint", 
function (x, y, v) {
if (!this.dragSet && !this.dragClear) {
this.dragClear = this.func[x][y] > .1;
this.dragSet = !this.dragClear;
}this.func[x][y] = (this.dragSet) ? v : 0;
this.dragStop = true;
this.cv.repaint (this.pause);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "editXTranslate", 
function (x, y) {
var offx = Clazz.doubleToInt ((x - this.dragX) * this.sampleCount / this.viewXMap.width);
var offy = Clazz.doubleToInt ((y - this.dragY) * this.sampleCount / this.viewXMap.height);
var i;
var j;
for (i = 0; i != this.sampleCount; i++) for (j = 0; j != this.sampleCount; j++) {
if (i - offx < 0 || j - offy < 0 || i - offx >= this.sampleCount || j - offy >= this.sampleCount) continue;
this.func[i][j] = this.translateFunc[i - offx][j - offy];
this.funci[i][j] = this.translateFunci[i - offx][j - offy];
}

this.transform (false);
}, "~N,~N");
Clazz.defineMethod (c$, "editXScale", 
function (x, y) {
var i;
var j;
var cx = this.viewXMap.x + Clazz.doubleToInt (this.viewXMap.width / 2);
var cy = this.viewXMap.y + Clazz.doubleToInt (this.viewXMap.height / 2);
var scalex = (this.dragX - cx) / (x - cx);
var scaley = (this.dragY - cy) / (y - cy);
var hx = Clazz.doubleToInt (this.sampleCount / 2);
var hy = Clazz.doubleToInt (this.sampleCount / 2);
for (i = 0; i != this.sampleCount; i++) for (j = 0; j != this.sampleCount; j++) {
var i1 = Clazz.doubleToInt ((i - hx) * scalex + hx + .5);
var j1 = Clazz.doubleToInt ((j - hy) * scaley + hy + .5);
if (i1 < 0 || j1 < 0 || i1 >= this.sampleCount || j1 >= this.sampleCount) this.func[i][j] = this.funci[i][j] = 0;
 else {
this.func[i][j] = this.translateFunc[i1][j1];
this.funci[i][j] = this.translateFunci[i1][j1];
}}

this.transform (false);
}, "~N,~N");
Clazz.defineMethod (c$, "editXRotate", 
function (x, y) {
if (this.aspectRatio != 1) return;
var cx = this.viewXMap.x + Clazz.doubleToInt (this.viewXMap.width / 2);
var cy = this.viewXMap.y + Clazz.doubleToInt (this.viewXMap.height / 2);
var angle1 = java.lang.Math.atan2 (-(this.dragY - cy), this.dragX - cx);
var angle2 = java.lang.Math.atan2 (-(y - cy), x - cx);
var ad = angle2 - angle1;
var i;
var j;
for (i = 0; i != this.lzStateCount; i++) {
var ds = this.lzStates[i];
ds.rotate (-ad * ds.lz);
}
this.convertDerivedToBasis ();
this.changingDerivedStates = true;
this.dragX = x;
this.dragY = y;
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "editXGauss", 
function (x, y) {
var i;
var j;
var gx = x - this.dragX;
var gy = y - this.dragY;
var wx = 1 / (this.abs (gx) + .0001);
var wy = 1 / (this.abs (gy) + .0001);
wx = -wx * wx * 10;
wy = -wy * wy * 10;
var rm = 32. / this.sampleCount;
rm *= rm;
this.lastGaussWx = wx;
this.lastGaussWy = wy;
wx *= this.aspectRatio * this.aspectRatio;
if (wx < -0.25) wx = -0.25;
if (wy < -0.25) wy = -0.25;
for (i = 0; i != this.sampleCount; i++) for (j = 0; j != this.sampleCount; j++) {
var x1 = i - this.selectedGridX;
var y1 = j - this.selectedGridY;
this.func[i][j] = java.lang.Math.exp (rm * (wx * x1 * x1 + wy * y1 * y1));
}

this.transform (true);
}, "~N,~N");
Clazz.defineMethod (c$, "editXGaussP", 
function (x, y) {
this.getMomentumCoords (this.viewXMap, x - this.dragX + this.viewXMap.x + Clazz.doubleToInt (this.viewXMap.width / 2), y - this.dragY + this.viewXMap.y + Clazz.doubleToInt (this.viewXMap.height / 2));
this.drawXGaussP ();
}, "~N,~N");
Clazz.defineMethod (c$, "drawXGaussP", 
function () {
var i;
var j;
var wx = this.lastGaussWx;
var wy = this.lastGaussWy;
wx *= this.aspectRatio * this.aspectRatio;
if (wx < -0.25) wx = -0.25;
if (wy < -0.25) wy = -0.25;
var rm = 32. / this.sampleCount;
rm *= rm;
for (i = 0; i <= this.sampleCount; i++) for (j = 0; j <= this.sampleCount; j++) {
var x1 = i - this.selectedGridX;
var y1 = j - this.selectedGridY;
var n = java.lang.Math.exp (rm * (wx * x1 * x1 + wy * y1 * y1));
var cx = java.lang.Math.cos (this.momentumX * x1);
var cy = java.lang.Math.cos (this.momentumY * y1);
var sx = java.lang.Math.sin (this.momentumX * x1);
var sy = java.lang.Math.sin (this.momentumY * y1);
this.func[i][j] = n * (cx * cy - sx * sy);
this.funci[i][j] = n * (cx * sy + cy * sx);
}

this.transform (false);
});
Clazz.defineMethod (c$, "getMomentumCoords", 
function (v, x, y) {
var pres = this.sampleCount * 2;
var s0 = 32;
var p0 = Clazz.doubleToInt ((pres - s0 + 2) / 2);
this.momentumX = ((Clazz.doubleToInt ((x - v.x - 1) * s0 / (v.width - 2))) - Clazz.doubleToInt (s0 / 2)) * 3.141592653589793 / this.sampleCount;
this.momentumY = ((Clazz.doubleToInt ((y - v.y - 1) * s0 / (v.height - 2))) - Clazz.doubleToInt (s0 / 2)) * 3.141592653589793 / this.sampleCount;
if (this.momentumX > 3.141592653589793) this.momentumX = 3.141592653589793;
if (this.momentumY > 3.141592653589793) this.momentumY = 3.141592653589793;
if (this.momentumX < -3.141592653589793) this.momentumX = -3.141592653589793;
if (this.momentumY < -3.141592653589793) this.momentumY = -3.141592653589793;
}, "test.falstad.QuantumOscFrame.View,~N,~N");
Clazz.defineMethod (c$, "editPGauss", 
function (x, y) {
var i;
var j;
var gx = x - this.dragX;
var gy = y - this.dragY;
var wx = this.aspectRatio / (this.abs (gx) + .0001);
var wy = 1 / (this.abs (gy) + .0001);
wx = -wx * wx * 10;
wy = -wy * wy * 10;
if (wx < -0.25) wx = -0.25;
if (wy < -0.25) wy = -0.25;
var rm = 32. / this.sampleCount;
rm *= rm;
this.getMomentumCoords (this.viewPMap, this.dragX, this.dragY);
for (i = 0; i <= this.sampleCount; i++) for (j = 0; j <= this.sampleCount; j++) {
var x1 = i - Clazz.doubleToInt (this.sampleCount / 2);
var y1 = j - Clazz.doubleToInt (this.sampleCount / 2);
var n = java.lang.Math.exp (rm * (wx * x1 * x1 + wy * y1 * y1));
var cx = java.lang.Math.cos (this.momentumX * x1);
var cy = java.lang.Math.cos (this.momentumY * y1);
var sx = java.lang.Math.sin (this.momentumX * x1);
var sy = java.lang.Math.sin (this.momentumY * y1);
this.func[i][j] = n * (cx * cy - sx * sy);
this.funci[i][j] = n * (cx * sy + cy * sx);
}

this.transform (false);
}, "~N,~N");
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
}}}, "java.awt.Graphics,test.falstad.QuantumOscFrame.View,~A,~A,~N,~N");
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
if (e.getSource () === this.resBar) this.setLoadCount ();
if (e.getSource () === this.aspectBar) {
this.setLoadCount ();
if (this.aspectRatio == 1) {
this.measureLItem.enable ();
this.lCheckItem.enable ();
this.lStatesCheckItem.enable ();
} else {
this.measureLItem.disable ();
this.lCheckItem.disable ();
this.lStatesCheckItem.disable ();
}}this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.QuantumOscFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (this.applet == null) this.dispose ();
 else this.applet.destroyFrame ();
});
Clazz.defineMethod (c$, "setLoadCount", 
function () {
var q = this.resBar.getValue ();
this.sampleCount = 1;
while (q-- > 0) this.sampleCount *= 2;

if (this.sampleCount < 8) this.sampleCount = 8;
System.out.print ("sampleCount = " + this.sampleCount + "\n");
this.states =  Clazz.newArray (14, 14, null);
this.aspectRatio = this.aspectBar.getValue () / 10.;
var i;
var j;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
this.states[i][j] = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.BasisState, this, null);
var nx = i;
var ny = j;
this.states[i][j].nx = nx;
this.states[i][j].ny = ny;
this.states[i][j].elevel = (.5 + nx) / (this.aspectRatio * this.aspectRatio) + .5 + ny;
}

this.func =  Clazz.newDoubleArray (this.sampleCount + 1, this.sampleCount + 1, 0);
this.funci =  Clazz.newDoubleArray (this.sampleCount + 1, this.sampleCount + 1, 0);
this.pfuncr = this.pfunci = null;
this.step = 3.141592653589793 / this.sampleCount;
this.data =  Clazz.newDoubleArray (this.sampleCount * this.sampleCount * 2 * 4, 0);
var mult = .04 / this.states[0][0].elevel;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) this.states[i][j].elevel *= mult;


this.hermite =  Clazz.newDoubleArray (15, this.sampleCount + 1, 0);
var xp =  Clazz.newDoubleArray (14, 0);
this.alpha = 9.6 / this.sampleCount;
for (i = 0; i <= this.sampleCount; i++) {
var x = this.alpha * (i - Clazz.doubleToInt (this.sampleCount / 2));
var e = java.lang.Math.exp (-x * x * .5);
xp[1] = x;
for (j = 2; j != 14; j++) xp[j] = xp[j - 1] * x;

this.hermite[0][i] = e;
this.hermite[1][i] = 2 * x * e;
this.hermite[2][i] = (4 * x * x - 2) * e;
this.hermite[3][i] = (8 * xp[3] - 12 * x) * e;
this.hermite[4][i] = (16 * xp[4] - 48 * x * x + 12) * e;
this.hermite[5][i] = (32 * xp[5] - 160 * xp[3] + 120 * x) * e;
this.hermite[6][i] = (-120 + 720 * x * x - 480 * xp[4] + 64 * xp[6]) * e;
this.hermite[7][i] = (-1680 * x + 3360 * xp[3] - 1344 * xp[5] + 128 * xp[7]) * e;
this.hermite[8][i] = (1680 - 13440 * x * x + 13440 * xp[4] - 3584 * xp[6] + 256 * xp[8]) * e;
this.hermite[9][i] = (30240 * x - 80640 * xp[3] + 48384 * xp[5] - 9216 * xp[7] + 512 * xp[9]) * e;
this.hermite[10][i] = (-30240 + 302400 * xp[2] - 403200 * xp[4] + 161280 * xp[6] - 23040 * xp[8] + 1024 * xp[10]) * e;
this.hermite[11][i] = (-665280 * x + 2217600 * xp[3] - 1774080 * xp[5] + 506880 * xp[7] - 56320 * xp[9] + 2048 * xp[11]) * e;
this.hermite[12][i] = (665280 - 7983360 * xp[2] + 13305600 * xp[4] - 7096320 * xp[6] + 1520640 * xp[8] - 135168 * xp[10] + 4096 * xp[12]) * e;
this.hermite[13][i] = (17297280 * x - 69189120 * xp[3] + 69189120 * xp[5] - 26357760 * xp[7] + 4392960 * xp[9] - 319488 * xp[11] + 8192 * xp[13]) * e;
}
for (i = 0; i != 14; i++) {
var dy = 0;
for (j = 0; j <= this.sampleCount; j++) dy += this.hermite[i][j] * this.hermite[i][j];

dy = java.lang.Math.sqrt (dy);
if (dy > 0) {
for (j = 0; j <= this.sampleCount; j++) this.hermite[i][j] /= dy;

}}
var m;
var n;
this.lzStateCount = 105;
this.lzStates =  new Array (this.lzStateCount);
var x =  new Array (1);
x[0] = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.Complex, this, null, 1, 0);
this.setLzState (0, 0, x);
this.calcLzStates (x, 0, 0);
this.setupDisplay ();
});
Clazz.defineMethod (c$, "setLzState", 
function (d, g, coefs) {
var st = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.DerivedState, this, null);
var n = 1 + d + g;
var pos = Clazz.doubleToInt ((n * (n - 1)) / 2) + d;
var m = d - g;
this.lzStates[pos] = st;
st.count = n;
st.bstates =  new Array (n);
st.coefs = coefs;
var i;
for (i = 1; i <= n; i++) st.bstates[i - 1] = this.states[i - 1][n - i];

st.lz = m;
st.elevel = this.states[n - 1][0].elevel;
}, "~N,~N,~A");
Clazz.defineMethod (c$, "calcLzStates", 
function (arr0, d, g) {
var n = 2 + d + g;
if (n > 14) return;
this.calcLzStatesD (arr0, d + 1, g);
var arr1 =  new Array (n);
var j;
var c2 = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.Complex, this, null);
for (j = 0; j != n; j++) {
var c = arr1[j] = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.Complex, this, null);
if (j > 0) {
c.set (arr0[j - 1]);
c.mult (java.lang.Math.sqrt (j));
} else c.set (0);
if (j < n - 1) {
c2.set (arr0[j]);
c2.mult (0, -java.lang.Math.sqrt (n - j - 1));
} else c2.set (0);
c.add (c2);
c.mult (1 / java.lang.Math.sqrt (2 * (g + 1)));
}
this.setLzState (d, g + 1, arr1);
this.calcLzStates (arr1, d, g + 1);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "calcLzStatesD", 
function (arr0, d, g) {
var n = 1 + d + g;
if (n > 14) return;
var arr1 =  new Array (n);
var i;
var j;
var c2 = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.Complex, this, null);
for (j = 0; j != n; j++) {
var c = arr1[j] = Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.Complex, this, null);
if (j > 0) {
c.set (arr0[j - 1]);
c.mult (java.lang.Math.sqrt (j));
} else c.set (0);
if (j < n - 1) {
c2.set (arr0[j]);
c2.mult (0, java.lang.Math.sqrt (n - j - 1));
} else c2.set (0);
c.add (c2);
c.mult (1 / java.lang.Math.sqrt (2 * d));
}
this.setLzState (d, g, arr1);
this.calcLzStatesD (arr1, d + 1, g);
}, "~A,~N,~N");
Clazz.defineMethod (c$, "findGridPoint2D", 
function (v, mx, my) {
var res1 = this.sampleCount + 1;
this.selectedGridX = Clazz.doubleToInt ((mx - v.x) * res1 / v.width);
this.selectedGridY = Clazz.doubleToInt ((my - v.y) * res1 / v.height);
var f = 1;
if (this.selectedGridX < f) this.selectedGridX = f;
if (this.selectedGridY < f) this.selectedGridY = f;
if (this.selectedGridX > this.sampleCount - f) this.selectedGridX = this.sampleCount - f;
if (this.selectedGridY > this.sampleCount - f) this.selectedGridY = this.sampleCount - f;
this.selectedGridFunc = this.func[this.selectedGridX][this.selectedGridY];
}, "test.falstad.QuantumOscFrame.View,~N,~N");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.dragging = true;
this.changingDerivedStates = false;
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
var oldSelectedState = this.selectedState;
this.selectedState = null;
this.selectedPhasor = null;
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
 else if (this.viewPMap != null && this.viewPMap.inside (x, y)) this.selection = 3;
 else if (this.viewPotential != null && this.viewPotential.contains (x, y)) {
this.selection = 1;
this.findStateByEnergy (y);
} else if (this.viewStatesMap != null && this.viewStatesMap.inside (x, y)) this.findPhasor (this.viewStatesMap, x, y);
 else if (this.viewLStatesMap != null && this.viewLStatesMap.inside (x, y)) this.findPhasor (this.viewLStatesMap, x, y);
if (this.selectedState !== oldSelectedState) this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "findPhasor", 
function (v, x, y) {
var i;
for (i = 0; i != v.phasorCount; i++) {
if (!v.phasors[i].inside (x, y)) continue;
this.selectedPhasor = v.phasors[i];
this.selectedState = this.selectedPhasor.state;
this.selection = 4;
break;
}
}, "test.falstad.QuantumOscFrame.View,~N,~N");
Clazz.defineMethod (c$, "findStateByEnergy", 
function (y) {
var i;
var j;
var floory = this.viewPotential.y + this.viewPotential.height - 5;
var ymult = 100;
var dist = 100;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) {
var yy = floory - Clazz.doubleToInt (ymult * this.states[i][j].elevel);
var d = java.lang.Math.abs (y - yy);
if (d < dist) {
dist = d;
this.selectedState = this.states[i][j];
}}

}, "~N");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
if (this.selection == 4) this.editMagClick ();
if (e.getClickCount () == 2 && this.selectedState != null) this.enterSelectedState ();
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "enterSelectedState", 
function () {
var i;
var j;
for (i = 0; i != 14; i++) for (j = 0; j != 14; j++) if (this.states[i][j] !== this.selectedState) this.states[i][j].set (0);


this.convertBasisToDerived ();
this.selectedState.set (1);
if (Clazz.instanceOf (this.selectedState, test.falstad.QuantumOscFrame.DerivedState)) this.convertDerivedToBasis ();
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
if (this.selection == 2) this.findGridPoint2D (this.viewXMap, e.getX (), e.getY ());
 else if (this.selection == 3) this.findGridPoint2D (this.viewPMap, e.getX (), e.getY ());
if (this.selection == 2 && (this.mouseChooser.getSelectedIndex () == 3 || this.mouseChooser.getSelectedIndex () == 4)) this.saveTranslateData ();
this.dragStartX = e.getX ();
this.dragStartY = e.getY ();
if (this.selectedState != null) this.magDragStart = this.selectedState.mag;
this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "saveTranslateData", 
function () {
this.translateFunc = this.func;
this.translateFunci = this.funci;
this.func =  Clazz.newDoubleArray (this.sampleCount + 1, this.sampleCount + 1, 0);
this.funci =  Clazz.newDoubleArray (this.sampleCount + 1, this.sampleCount + 1, 0);
});
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.dragging = this.dragStop = this.changingDerivedStates = false;
this.dragSet = this.dragClear = false;
this.translateFunc = this.translateFunci = null;
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
}if (Clazz.instanceOf (e.getItemSelectable (), swingjs.awt.CheckboxMenuItem) || e.getItemSelectable () === this.memoryImageSourceCheck) {
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
Clazz.defineMethod (c$, "ndfft", 
function (data, nn, ndim, isign) {
var ntot = 1;
var nprev = 1;
var idim;
var i2pi = isign * 2 * 3.141592653589793;
for (idim = 0; idim < ndim; idim++) ntot *= nn[idim];

for (idim = 0; idim < ndim; idim++) {
var n = nn[idim];
var nrem = Clazz.doubleToInt (ntot / (n * nprev));
var ip1 = 2 * nprev;
var ip2 = ip1 * n;
var ip3 = ip2 * nrem;
var i2rev = 0;
var i2;
var ifp1;
for (i2 = 0; i2 < ip2; i2 += ip1) {
var ibit;
if (i2 < i2rev) {
var i1;
for (i1 = i2; i1 < i2 + ip1; i1 += 2) {
var i3;
for (i3 = i1; i3 < ip3; i3 += ip2) {
var i3rev = i2rev + i3 - i2;
var tempr = data[i3];
var tempi = data[i3 + 1];
data[i3] = data[i3rev];
data[i3 + 1] = data[i3rev + 1];
data[i3rev] = tempr;
data[i3rev + 1] = tempi;
}
}
}ibit = Clazz.doubleToInt (ip2 / 2);
while ((ibit > ip1) && (i2rev > ibit - 1)) {
i2rev -= ibit;
ibit /= 2;
}
i2rev += ibit;
}
ifp1 = ip1;
while (ifp1 < ip2) {
var ifp2 = 2 * ifp1;
var theta = i2pi / (ifp2 / ip1);
var wpr;
var wpi;
var wr = 1.0;
var wi = 0.0;
var i3;
wpr = java.lang.Math.sin (0.5 * theta);
wpr *= wpr * -2.0;
wpi = java.lang.Math.sin (theta);
for (i3 = 0; i3 < ifp1; i3 += ip1) {
var i1;
var wtemp;
for (i1 = i3; i1 < i3 + ip1; i1 += 2) {
for (i2 = i1; i2 < ip3; i2 += ifp2) {
var i21 = i2 + 1;
var k2 = i2 + ifp1;
var k21 = k2 + 1;
var tempr = (wr * data[k2]) - (wi * data[k21]);
var tempi = (wr * data[k21]) + (wi * data[k2]);
data[k2] = data[i2] - tempr;
data[k21] = data[i21] - tempi;
data[i2] += tempr;
data[i21] += tempi;
}
}
wtemp = wr;
wr += (wr * wpr) - (wi * wpi);
wi += (wi * wpr) + (wtemp * wpi);
}
ifp1 = ifp2;
}
nprev *= n;
}
}, "~A,~A,~N,~N");
c$.$QuantumOscFrame$PhaseColor$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.r = 0;
this.g = 0;
this.b = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOscFrame, "PhaseColor");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.r = a;
this.g = b;
this.b = c;
}, "~N,~N,~N");
c$ = Clazz.p0p ();
};
c$.$QuantumOscFrame$View$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.paneY = 0;
this.imageSource = null;
this.pixels = null;
this.phasorCount = 0;
this.phasors = null;
this.ymult = 0;
this.ymult2 = 0;
this.scale = 0;
this.mid_y = 0;
this.lower_y = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOscFrame, "View", java.awt.Rectangle);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.falstad.QuantumOscFrame.View, []);
});
c$ = Clazz.p0p ();
};
c$.$QuantumOscFrame$Phasor$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.state = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOscFrame, "Phasor", java.awt.Rectangle);
c$ = Clazz.p0p ();
};
c$.$QuantumOscFrame$Complex$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.re = 0;
this.im = 0;
this.mag = 0;
this.phase = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOscFrame, "Complex");
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
}, "test.falstad.QuantumOscFrame.Complex");
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
}, "test.falstad.QuantumOscFrame.Complex");
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
}, "test.falstad.QuantumOscFrame.Complex");
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
c$.$QuantumOscFrame$State$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.elevel = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOscFrame, "State", test.falstad.QuantumOscFrame.Complex, null, Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.Complex, this, null, Clazz.inheritArgs));
c$ = Clazz.p0p ();
};
c$.$QuantumOscFrame$BasisState$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.nx = 0;
this.ny = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOscFrame, "BasisState", test.falstad.QuantumOscFrame.State, null, Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.State, this, null, Clazz.inheritArgs));
c$ = Clazz.p0p ();
};
c$.$QuantumOscFrame$DerivedState$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.count = 0;
this.lz = 0;
this.bstates = null;
this.coefs = null;
Clazz.instantialize (this, arguments);
}, test.falstad.QuantumOscFrame, "DerivedState", test.falstad.QuantumOscFrame.State, null, Clazz.innerTypeInstance (test.falstad.QuantumOscFrame.State, this, null, Clazz.inheritArgs));
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"stateCount", 14,
"maxDispTerms", 10,
"epsilon", .01,
"panePad", 4,
"pi", 3.14159265358979323846,
"phaseColorCount", 50,
"SEL_NONE", 0,
"SEL_POTENTIAL", 1,
"SEL_X", 2,
"SEL_P", 3,
"SEL_STATES", 4,
"SEL_HANDLE", 5,
"MOUSE_GAUSS", 0,
"MOUSE_GAUSSP", 1,
"MOUSE_ROTATE", 2,
"MOUSE_TRANSLATE", 3,
"MOUSE_SCALE", 4);
});
