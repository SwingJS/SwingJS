Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.ModeBoxCanvas", "$.ModeBoxFrame", "$.ModeBoxLayout", "$.ModeBox"], ["java.awt.Color", "$.Dimension", "$.Rectangle", "java.awt.image.MemoryImageSource", "java.util.Random", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "ModeBoxCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.ModeBoxCanvas, []);
this.pg = p;
}, "test.falstad.ModeBoxFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateModeBox (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateModeBox (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "ModeBoxLayout", null, java.awt.LayoutManager);
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
target.getComponent (0).setLocation (insets.left, insets.top);
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
}m.setLocation (cw, h);
m.resize (d.width, d.height);
h += d.height;
}}
}, "java.awt.Container");
c$ = Clazz.decorateAsClass (function () {
this.started = false;
Clazz.instantialize (this, arguments);
}, test.falstad, "ModeBox", swingjs.awt.Applet);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.ModeBox.oc != null) test.falstad.ModeBox.oc.dispose ();
test.falstad.ModeBox.oc = null;
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.ModeBox.oc =  new test.falstad.ModeBoxFrame (null);
test.falstad.ModeBox.oc.init ();
}, "~A");
Clazz.overrideMethod (c$, "init", 
function () {
test.falstad.ModeBox.oc =  new test.falstad.ModeBoxFrame (this);
test.falstad.ModeBox.oc.init ();
this.repaint ();
});
Clazz.overrideMethod (c$, "destroy", 
function () {
if (test.falstad.ModeBox.oc != null) test.falstad.ModeBox.oc.dispose ();
test.falstad.ModeBox.oc = null;
});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.ModeBox.oc == null) s = "Applet is finished.";
 else if (test.falstad.ModeBox.oc.useFrame) test.falstad.ModeBox.oc.triggerShow ();
this.started = true;
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.ModeBox, "paint", [g]);
}, "java.awt.Graphics");
Clazz.defineStatics (c$,
"oc", null);
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.gridSizeX = 200;
this.gridSizeY = 200;
this.useFrame = true;
this.clearButton = null;
this.memoryImageSourceCheck = null;
this.stoppedCheck = null;
this.spectrumCheck = null;
this.modeChooser = null;
this.speedBar = null;
this.resolutionBar = null;
this.brightnessBar = null;
this.widthBar = null;
this.heightBar = null;
this.dragZoomStart = 0;
this.zoom = 6.5;
this.rotmatrix = null;
this.selectedMinOmega = 0;
this.selectedMaxOmega = 0;
this.view3d = null;
this.viewSpectrum = null;
this.viewFreq = null;
this.colorMult = 0;
this.xpoints = null;
this.ypoints = null;
this.spectrum = null;
this.func = null;
this.data = null;
this.boxwidth = 2;
this.boxheight = 2;
this.dragging = false;
this.imageSource = null;
this.pixels = null;
this.maxTerms = 16;
this.modes = null;
this.modeCount = 0;
this.pause = 0;
this.applet = null;
this.selection = -1;
this.selectedCoefX = -1;
this.selectedCoefY = 0;
this.selectedCoefZ = 0;
this.sampleMult = null;
this.magDragStart = 0;
this.dragX = 0;
this.dragY = 0;
this.oldDragX = 0;
this.oldDragY = 0;
this.dragStartX = 0;
this.dragStartY = 0;
this.t = 0;
this.cv = null;
this.main = null;
this.shown = false;
this.logep2 = 0;
if (!Clazz.isClassDefined ("test.falstad.ModeBoxFrame.Mode")) {
test.falstad.ModeBoxFrame.$ModeBoxFrame$Mode$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "ModeBoxFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "ModeBox by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.ModeBoxFrame, ["Box Modes Applet"]);
this.applet = a;
}, "test.falstad.ModeBox");
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
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
if (this.useFrame) this.main = this;
 else this.main = this.applet;
var os = System.getProperty ("os.name");
var jv = System.getProperty ("java.version");
var altRender = true;
var res = 32;
if (os.indexOf ("Windows") == 0) {
res = 48;
if (jv.indexOf ("1.1") == 0) altRender = true;
}res = 120;
this.main.setLayout ( new test.falstad.ModeBoxLayout ());
this.cv =  new test.falstad.ModeBoxCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.main.add (this.clearButton =  new swingjs.awt.Button ("Clear"));
this.clearButton.addActionListener (this);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
this.main.add (this.stoppedCheck);
this.spectrumCheck =  new swingjs.awt.Checkbox ("Show Spectrum");
this.spectrumCheck.addItemListener (this);
this.main.add (this.spectrumCheck);
this.memoryImageSourceCheck =  new swingjs.awt.Checkbox ("Alternate Rendering", altRender);
this.memoryImageSourceCheck.addItemListener (this);
this.main.add (this.memoryImageSourceCheck);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Adjust Angle");
this.modeChooser.add ("Mouse = Adjust Zoom");
this.modeChooser.addItemListener (this);
this.main.add (this.modeChooser);
this.main.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.main.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 40, 1, 1, 200));
this.speedBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 28, 1, 1, 200));
this.brightnessBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Image Resolution", 0));
this.main.add (this.resolutionBar =  new swingjs.awt.Scrollbar (0, res, 2, 20, 300));
this.resolutionBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Width", 0));
this.main.add (this.widthBar =  new swingjs.awt.Scrollbar (0, 10, 1, 5, 31));
this.widthBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Height", 0));
this.main.add (this.heightBar =  new swingjs.awt.Scrollbar (0, 10, 1, 5, 31));
this.heightBar.addAdjustmentListener (this);
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
this.modes =  new Array (test.falstad.ModeBoxFrame.maxModes);
this.addMode (1, 0, 0).magcoef = 1;
this.rotmatrix =  Clazz.newDoubleArray (9, 0);
this.rotmatrix[0] = this.rotmatrix[4] = this.rotmatrix[8] = 1;
this.xpoints =  Clazz.newIntArray (2, 0);
this.ypoints =  Clazz.newIntArray (2, 0);
var i;
this.sampleMult =  Clazz.newIntArray (15, 0);
for (i = 1; i < 15; i += 2) {
this.sampleMult[i] = 4;
this.sampleMult[i + 1] = 2;
}
this.sampleMult[0] = this.sampleMult[14] = 1;
this.random =  new java.util.Random ();
this.reinit ();
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (java.awt.Color.white);
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
}this.requestFocus ();
});
Clazz.defineMethod (c$, "handleResize", 
function () {
this.reinit ();
});
Clazz.defineMethod (c$, "triggerShow", 
function () {
if (!this.shown) this.setVisible (true);
this.shown = true;
});
Clazz.defineMethod (c$, "reinit", 
function () {
this.setMaxTerms ();
var d = this.winSize = this.cv.getSize ();
if (d.width == 0 || d.height == 0) return;
this.calcSpectrum ();
this.dbimage = this.cv.createImage (d.width, d.height);
this.setupDisplay ();
this.pixels =  Clazz.newIntArray (this.view3d.width * this.view3d.height, 0);
var i;
for (i = 0; i != this.view3d.width * this.view3d.height; i++) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (this.view3d.width, this.view3d.height, this.pixels, 0, this.view3d.width);
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
Clazz.defineMethod (c$, "setMaxTerms", 
function () {
this.gridSizeX = this.gridSizeY = (this.resolutionBar.getValue () & -2);
this.maxTerms = this.gridSizeX;
if (this.maxTerms > 100) this.maxTerms = 100;
this.data =  Clazz.newDoubleArray (this.maxTerms, this.maxTerms, this.maxTerms, 0);
this.func =  Clazz.newDoubleArray (this.gridSizeX, this.gridSizeY, 2, 0);
});
Clazz.defineMethod (c$, "setupDisplay", 
function () {
var perColumn = 2;
var perRow = 4;
var freqHeight = this.getTermWidth () * (test.falstad.ModeBoxFrame.maxDispCoefs + 1) * perColumn;
var spectrumHeight = (this.spectrumCheck.getState ()) ? this.getTermWidth () * 6 : 0;
this.view3d =  new java.awt.Rectangle (0, 0, this.winSize.width, this.winSize.height - freqHeight - spectrumHeight);
if (this.spectrumCheck.getState ()) this.viewSpectrum =  new java.awt.Rectangle (0, this.view3d.height, this.winSize.width, spectrumHeight);
 else this.viewSpectrum = null;
this.viewFreq =  new Array (test.falstad.ModeBoxFrame.maxDispCoefs);
var i;
var winw = this.getTermWidth () * test.falstad.ModeBoxFrame.maxDispCoefs;
var winh = winw;
var pad = this.getTermWidth ();
var x = Clazz.doubleToInt ((this.winSize.width - (winw * 4 + pad * 3)) / 2);
for (i = 0; i != test.falstad.ModeBoxFrame.maxDispCoefs; i++) this.viewFreq[i] =  new java.awt.Rectangle (x + (i % perRow) * (winw + pad), this.view3d.height + spectrumHeight + (Clazz.doubleToInt (i / perRow)) * (winh + pad), winw, winh);

});
Clazz.defineMethod (c$, "computeFunction", 
function () {
var i;
var j;
this.genData (false);
var q = 3.14159265 / this.maxTerms;
var cost = java.lang.Math.cos (this.t);
var izoom = 1 / this.zoom;
var rotm = this.rotmatrix;
var boxhalfwidth = this.boxwidth / 2;
var boxhalfheight = this.boxheight / 2;
var aratio = this.view3d.width / this.view3d.height;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var camx0 = 0;
var camz0 = test.falstad.ModeBoxFrame.viewDistance;
var camvx0 = (2 * i / this.gridSizeX - 1) * izoom;
var camvy0 = (2 * j / this.gridSizeY - 1) * izoom;
if (aratio < 1) camvy0 /= aratio;
 else camvx0 *= aratio;
var camvz0 = -1;
var camx = rotm[0] * camx0 + rotm[2] * camz0;
var camy = rotm[5] * camz0;
var camz = rotm[6] * camx0 + rotm[8] * camz0;
var camvx = rotm[0] * camvx0 + rotm[1] * camvy0 + rotm[2] * camvz0;
var camvy = rotm[3] * camvx0 + rotm[4] * camvy0 + rotm[5] * camvz0;
var camvz = rotm[6] * camvx0 + rotm[7] * camvy0 + rotm[8] * camvz0;
var camnorm = java.lang.Math.sqrt (camvx * camvx + camvy * camvy + camvz * camvz);
var n;
var simpr = 0;
var simpg = 0;
var nmax = 14;
var tx1 = (-boxhalfwidth - camx) / camvx;
var tx2 = (boxhalfwidth - camx) / camvx;
var ty1 = (-boxhalfheight - camy) / camvy;
var ty2 = (boxhalfheight - camy) / camvy;
var tz1 = (-1 - camz) / camvz;
var tz2 = (1 - camz) / camvz;
var mint = this.max (this.min (tx1, tx2), this.max (this.min (ty1, ty2), this.min (tz1, tz2))) + .001;
var maxt = this.min (this.max (tx1, tx2), this.min (this.max (ty1, ty2), this.max (tz1, tz2))) - .001;
if (maxt < mint) {
this.func[i][j][0] = this.func[i][j][1] = 0;
continue;
}var tstep = (maxt - mint) / (14);
var pathlen = (maxt - mint) * camnorm;
var xmult = this.maxTerms / this.boxwidth;
var ymult = this.maxTerms / this.boxheight;
var zmult = this.maxTerms / 2.;
for (n = 0; n < 15; n++) {
var t = mint + n * tstep;
var xx = camx + camvx * t;
var yy = camy + camvy * t;
var zz = camz + camvz * t;
var xxi = Clazz.doubleToInt ((xx + boxhalfwidth) * xmult);
var yyi = Clazz.doubleToInt ((yy + boxhalfheight) * ymult);
var zzi = Clazz.doubleToInt ((zz + 1) * zmult);
var f = this.data[xxi][yyi][zzi];
if (f < 0) {
f = java.lang.Math.abs (f);
simpr += this.sampleMult[n] * f;
} else simpg += this.sampleMult[n] * f;
}
simpr *= pathlen / n;
simpg *= pathlen / n;
this.func[i][j][0] = simpr;
this.func[i][j][1] = simpg;
}

});
Clazz.defineMethod (c$, "sign", 
function (x) {
return x < 0 ? -1 : 1;
}, "~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateModeBox", 
function (realg) {
var g = null;
if (this.winSize == null || this.winSize.width == 0 || this.winSize.height == 0) return;
var mis = this.memoryImageSourceCheck.getState ();
g = this.dbimage.getGraphics ();
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (this.cv.getForeground ());
var allQuiet = true;
if (!this.stoppedCheck.getState ()) {
var val = this.speedBar.getValue ();
var tadd = val * (0.00625);
this.t += tadd;
if (this.modeCount > 0) allQuiet = false;
}var i;
var j;
var k;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
m.phasecoef = (m.omega * this.t + m.phasecoefadj) % (6.283185307179586);
m.phasecoefcos = java.lang.Math.cos (m.phasecoef);
m.phasemult = m.phasecoefcos * m.magcoef;
}
if (this.modeCount != 0) this.computeFunction ();
this.colorMult = this.brightnessBar.getValue () * 3;
var winw = this.view3d.width;
var winh = this.view3d.height;
if (this.modeCount > 0) {
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var x = Clazz.doubleToInt (i * winw / this.gridSizeX);
var y = Clazz.doubleToInt (j * winh / this.gridSizeY);
var x2 = Clazz.doubleToInt ((i + 1) * winw / this.gridSizeX);
var y2 = Clazz.doubleToInt ((j + 1) * winh / this.gridSizeY);
var colval = 0xFF000000 + (this.getColorValue (i, j, 0) << 16) | (this.getColorValue (i, j, 1) << 8);
if (mis) {
var l;
for (k = x; k < x2; k++) for (l = y; l < y2; l++) this.pixels[k + l * this.view3d.width] = colval;


} else {
g.setColor ( new java.awt.Color (colval));
g.fillRect (x, y, x2 - x, y2 - y);
}}

if (mis) {
var dbimage2 = this.cv.createImage (this.imageSource);
g.drawImage (dbimage2, 0, 0, null);
}}g.setColor (java.awt.Color.white);
for (i = 0; i != 8; i++) {
var sign1 = ((i & 1) == 0) ? -1 : 1;
var sign2 = ((i & 2) == 0) ? -1 : 1;
var sign3 = ((i & 4) == 0) ? -1 : 1;
if (sign1 == -1 && (this.visibleFace (0, sign2, 0) || this.visibleFace (0, 0, sign3))) {
this.map3d (-1, sign2, sign3, this.xpoints, this.ypoints, 0);
this.map3d (1, sign2, sign3, this.xpoints, this.ypoints, 1);
g.drawLine (this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}if (sign2 == -1 && (this.visibleFace (sign1, 0, 0) || this.visibleFace (0, 0, sign3))) {
this.map3d (sign1, -1, sign3, this.xpoints, this.ypoints, 0);
this.map3d (sign1, 1, sign3, this.xpoints, this.ypoints, 1);
g.drawLine (this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}if (sign3 == -1 && (this.visibleFace (sign1, 0, 0) || this.visibleFace (0, sign2, 0))) {
this.map3d (sign1, sign2, -1, this.xpoints, this.ypoints, 0);
this.map3d (sign1, sign2, 1, this.xpoints, this.ypoints, 1);
g.drawLine (this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
}}
g.setColor (java.awt.Color.black);
g.fillRect (0, this.view3d.height, this.winSize.width, this.winSize.height - this.view3d.height);
for (i = 0; i != test.falstad.ModeBoxFrame.maxDispCoefs; i++) this.drawFrequencies (g, i);

if (this.viewSpectrum != null) {
var selw = (this.selectedCoefX == -1) ? 0 : this.getOmega (this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ);
var selx = Clazz.doubleToInt (selw * 50);
var selmin = Clazz.doubleToInt (this.selectedMinOmega * 50);
var selmax = Clazz.doubleToInt (this.selectedMaxOmega * 50);
var ym = this.viewSpectrum.height - 10;
var y = this.viewSpectrum.y + this.viewSpectrum.height - 5;
for (i = 1; i != this.winSize.width; i++) {
if (this.spectrum[i] == 0) continue;
var h = Clazz.doubleToInt (ym * (.2 + java.lang.Math.log (this.spectrum[i]) / 4));
if (h > ym) h = ym;
g.setColor ((i == selx || (i >= selmin && i < selmax)) ? java.awt.Color.yellow : java.awt.Color.gray);
g.drawLine (i, y, i, y - h);
}
}if (this.selectedCoefX != -1) {
var s = "Selected mode = (" + this.selectedCoefX + "," + this.selectedCoefY + "," + this.selectedCoefZ + ")";
var fm = g.getFontMetrics ();
g.setColor (java.awt.Color.yellow);
var y = this.view3d.y + this.view3d.height - fm.getDescent () - 2;
g.drawString (s, Clazz.doubleToInt ((this.winSize.width - fm.stringWidth (s)) / 2), y);
}realg.drawImage (this.dbimage, 0, 0, this);
if (!allQuiet) this.cv.repaint (this.pause);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "visibleFace", 
function (nx, ny, nz) {
var viewx = test.falstad.ModeBoxFrame.viewDistance * this.rotmatrix[2];
var viewy = test.falstad.ModeBoxFrame.viewDistance * this.rotmatrix[5];
var viewz = test.falstad.ModeBoxFrame.viewDistance * this.rotmatrix[8];
return (nx - viewx) * nx + (ny - viewy) * ny + (nz - viewz) * nz < 0;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "map3d", 
function (x, y, z, xpoints, ypoints, pt) {
x *= this.boxwidth / 2;
y *= this.boxheight / 2;
var rotm = this.rotmatrix;
var realx = x * rotm[0] + y * rotm[3] + z * rotm[6];
var realy = x * rotm[1] + y * rotm[4] + z * rotm[7];
var realz = test.falstad.ModeBoxFrame.viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
var scalex = this.view3d.width * this.zoom / 2;
var scaley = this.view3d.height * this.zoom / 2;
var aratio = this.view3d.width / this.view3d.height;
if (aratio < 1) scaley *= aratio;
 else scalex /= aratio;
xpoints[pt] = Clazz.doubleToInt (this.view3d.width / 2) + Clazz.doubleToInt (scalex * realx / realz);
ypoints[pt] = Clazz.doubleToInt (this.view3d.height / 2) + Clazz.doubleToInt (scaley * realy / realz);
}, "~N,~N,~N,~A,~A,~N");
Clazz.defineMethod (c$, "drawFrequencies", 
function (g, z) {
var view = this.viewFreq[z];
var termWidth = this.getTermWidth ();
g.setColor (java.awt.Color.white);
var starti = 0;
var i;
var j;
var x;
var y;
for (i = starti; i <= test.falstad.ModeBoxFrame.maxDispCoefs; i++) {
x = i * termWidth;
g.drawLine (view.x + starti * termWidth, x + view.y, view.x + termWidth * test.falstad.ModeBoxFrame.maxDispCoefs, x + view.y);
g.drawLine (view.x + x, view.y + starti * termWidth, view.x + x, view.y + termWidth * test.falstad.ModeBoxFrame.maxDispCoefs);
}
var rcol = 0x00010000;
var gcol = 0x00000100;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (m.z != z) continue;
x = view.x + m.x * termWidth;
y = view.y + m.y * termWidth;
var val = this.logcoef (m.magcoef);
if (val < -255) val = -255;
if (val > 255) val = 255;
if (val < 0) g.setColor ( new java.awt.Color (0xFF000000 + rcol * -val));
 else g.setColor ( new java.awt.Color (0xFF000000 + gcol * val));
g.fillRect (x + 1, y + 1, termWidth - 1, termWidth - 1);
var phx = Clazz.doubleToInt (m.phasecoefadj * termWidth * (0.15915494309189535));
if (phx > 0) {
g.setColor (java.awt.Color.blue);
g.drawLine (x + phx, y + 1, x + phx, y + termWidth);
}}
if (this.selectedCoefX != -1) {
var selOmega = this.getOmega (this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ);
g.setColor (java.awt.Color.yellow);
for (i = starti; i != test.falstad.ModeBoxFrame.maxDispCoefs; i++) for (j = starti; j != test.falstad.ModeBoxFrame.maxDispCoefs; j++) {
x = view.x + i * termWidth;
y = view.y + j * termWidth;
if (this.getOmega (i, j, z) == selOmega) g.drawRect (x, y, termWidth, termWidth);
}

}if (this.selectedMinOmega > 0 && this.selectedMaxOmega > 0) {
g.setColor (java.awt.Color.yellow);
for (i = starti; i != test.falstad.ModeBoxFrame.maxDispCoefs; i++) for (j = starti; j != test.falstad.ModeBoxFrame.maxDispCoefs; j++) {
x = view.x + i * termWidth;
y = view.y + j * termWidth;
var w = this.getOmega (i, j, z);
if (w >= this.selectedMinOmega && w < this.selectedMaxOmega) g.drawRect (x, y, termWidth, termWidth);
}

}}, "java.awt.Graphics,~N");
Clazz.defineMethod (c$, "logcoef", 
function (x) {
var ep2 = 0.003;
var sign = (x < 0) ? -1 : 1;
x *= sign;
if (x < ep2) return 0;
if (this.logep2 == 0) this.logep2 = -java.lang.Math.log (2 * ep2);
return Clazz.doubleToInt (255 * sign * (java.lang.Math.log (x + ep2) + this.logep2) / this.logep2);
}, "~N");
Clazz.defineMethod (c$, "getColorValue", 
function (i, j, k) {
var val = Clazz.doubleToInt (this.func[i][j][k] * this.colorMult);
if (val > 255) val = 255;
return val;
}, "~N,~N,~N");
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
if (e.getSource () === this.clearButton) {
while (this.modeCount > 0) this.deleteMode (0);

this.cv.repaint ();
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
if (e.getSource () === this.widthBar || e.getSource () === this.heightBar) this.setWidthHeight ();
if (e.getSource () === this.resolutionBar) this.setMaxTerms ();
this.cv.repaint (this.pause);
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "setWidthHeight", 
function () {
this.boxwidth = this.widthBar.getValue () / 5.;
this.boxheight = this.heightBar.getValue () / 5.;
var i;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
m.omega = this.getOmega (m.x, m.y, m.z);
}
this.calcSpectrum ();
});
Clazz.defineMethod (c$, "calcSpectrum", 
function () {
var i;
var j;
var k;
if (this.winSize == null) return;
this.spectrum =  Clazz.newIntArray (this.winSize.width, 0);
for (i = 0; i != test.falstad.ModeBoxFrame.maxDispCoefs; i++) for (j = 0; j != test.falstad.ModeBoxFrame.maxDispCoefs; j++) for (k = 0; k != test.falstad.ModeBoxFrame.maxDispCoefs; k++) {
var w = this.getOmega (i, j, k);
var x = Clazz.doubleToInt (w * 50);
if (x >= this.winSize.width) continue;
this.spectrum[x]++;
}


});
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.dragging = true;
this.oldDragX = this.dragX;
this.oldDragY = this.dragY;
this.dragX = e.getX ();
this.dragY = e.getY ();
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
if ((e.getModifiers () & 16) != 0) {
if (this.selection != -1) {
this.dragging = true;
}return;
}var x = e.getX ();
var y = e.getY ();
this.oldDragX = this.dragX;
this.oldDragY = this.dragY;
this.dragX = x;
this.dragY = y;
var oldCoefX = this.selectedCoefX;
var oldCoefY = this.selectedCoefY;
var oldCoefZ = this.selectedCoefZ;
this.selectedCoefX = -1;
this.selectedCoefY = -1;
this.selectedCoefZ = -1;
this.selection = 0;
this.selectedMinOmega = this.selectedMaxOmega = 0;
var i;
if (this.view3d.inside (x, y)) this.selection = 1;
if (this.viewSpectrum != null && this.viewSpectrum.inside (x, y)) {
this.selection = 3;
this.selectedMinOmega = (x - 2) / 50;
this.selectedMaxOmega = (x + 2) / 50;
}for (i = 0; i != test.falstad.ModeBoxFrame.maxDispCoefs; i++) {
var vf = this.viewFreq[i];
if (vf.inside (x, y)) {
var termWidth = this.getTermWidth ();
this.selectedCoefX = Clazz.doubleToInt ((x - vf.x) / termWidth);
this.selectedCoefY = Clazz.doubleToInt ((y - vf.y) / termWidth);
this.selectedCoefZ = i;
if (this.selectedCoefX >= test.falstad.ModeBoxFrame.maxDispCoefs) this.selectedCoefX = -1;
if (this.selectedCoefY >= test.falstad.ModeBoxFrame.maxDispCoefs) this.selectedCoefX = -1;
if (this.selectedCoefX != -1) this.selection = 2;
}}
if (this.selectedCoefX != oldCoefX || this.selectedCoefY != oldCoefY || this.selectedCoefZ != oldCoefZ) this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
if (this.selection == 2) this.editMagClick ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
if (!this.dragging && this.selection != -1) {
this.selectedCoefX = this.selectedCoefY = this.selectedCoefZ = -1;
this.cv.repaint (this.pause);
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.oldDragX = this.dragStartX = e.getX ();
this.oldDragY = this.dragStartY = e.getY ();
this.dragZoomStart = this.zoom;
if (this.selectedCoefX != -1) {
var m = this.findSelectedMode ();
this.magDragStart = m.magcoef;
}this.dragging = true;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if (this.dragging) this.cv.repaint ();
this.dragging = false;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (e.getItemSelectable () === this.spectrumCheck) this.setupDisplay ();
this.cv.repaint (this.pause);
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
if (this.applet == null) this.dispose ();
 else this.applet.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.ModeBoxFrame, "handleEvent", [ev]);
}, "java.awt.Event");
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
this.edit3d (x, y);
break;
}
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "edit3d", 
function (x, y) {
if (this.modeChooser.getSelectedIndex () == 0) {
var xo = this.oldDragX - x;
var yo = this.oldDragY - y;
this.rotate (xo / 40., yo / 40.);
this.cv.repaint (this.pause);
} else if (this.modeChooser.getSelectedIndex () == 1) {
var xo = x - this.dragStartX;
this.zoom = this.dragZoomStart + xo / 20.;
if (this.zoom < .1) this.zoom = .1;
this.cv.repaint (this.pause);
}}, "~N,~N");
Clazz.defineMethod (c$, "editMag", 
function (x, y) {
if (this.selectedCoefX == -1) return;
var coef = (this.dragStartY - y) / 20. + this.magDragStart;
if (coef < -1) coef = -1;
if (coef > 1) coef = 1;
var pcoef = (x - this.dragStartX) / 10.;
if (pcoef < 0) pcoef = 0;
if (pcoef > 6.283185307179586) pcoef = 6.283185307179586;
var m = this.findSelectedMode ();
if (m.magcoef == coef && m.phasecoefadj == pcoef) return;
m.magcoef = coef;
m.phasecoefadj = pcoef;
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "editMagClick", 
function () {
if (this.selectedCoefX == -1) return;
var m = this.findSelectedMode ();
if (this.magDragStart < .5) m.magcoef = 1;
 else m.magcoef = 0;
m.phasecoefadj = 0;
if (m.magcoef == 0) this.deleteMode (m);
this.cv.repaint (this.pause);
});
Clazz.defineMethod (c$, "genData", 
function (fixed) {
var q = 3.14159265 / this.maxTerms;
var x;
var y;
var z;
var mi;
for (mi = 0; mi != this.modeCount; mi++) {
var m = this.modes[mi];
if (m.tableSize != this.maxTerms) {
m.xtable =  Clazz.newDoubleArray (this.maxTerms, 0);
m.ytable =  Clazz.newDoubleArray (this.maxTerms, 0);
m.ztable =  Clazz.newDoubleArray (this.maxTerms, 0);
m.tableSize = this.maxTerms;
}for (x = 0; x != this.maxTerms; x++) {
m.xtable[x] = java.lang.Math.cos (x * m.x * q) * m.phasemult;
m.ytable[x] = java.lang.Math.cos (x * m.y * q);
m.ztable[x] = java.lang.Math.cos (x * m.z * q);
}
if (mi == 0) for (x = 0; x != this.maxTerms; x++) for (y = 0; y != this.maxTerms; y++) for (z = 0; z != this.maxTerms; z++) this.data[x][y][z] = m.xtable[x] * m.ytable[y] * m.ztable[z];



 else for (x = 0; x != this.maxTerms; x++) for (y = 0; y != this.maxTerms; y++) for (z = 0; z != this.maxTerms; z++) this.data[x][y][z] += m.xtable[x] * m.ytable[y] * m.ztable[z];



}
}, "~B");
Clazz.defineMethod (c$, "deleteMode", 
function (i) {
for (; i < this.modeCount - 1; i++) {
this.modes[i] = this.modes[i + 1];
}
this.modeCount--;
}, "~N");
Clazz.defineMethod (c$, "deleteMode", 
function (m) {
var i;
for (i = 0; i != this.modeCount; i++) if (this.modes[i] === m) {
this.deleteMode (i);
return;
}
}, "test.falstad.ModeBoxFrame.Mode");
Clazz.defineMethod (c$, "addMode", 
function (x, y, z) {
if (this.modeCount == test.falstad.ModeBoxFrame.maxModes) {
var i;
var minmag = 1;
var minmagi = 0;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (m.magcoef < minmag) {
minmag = m.magcoef;
minmagi = i;
}}
this.deleteMode (minmagi);
}var m = Clazz.innerTypeInstance (test.falstad.ModeBoxFrame.Mode, this, null);
m.x = x;
m.y = y;
m.z = z;
m.magcoef = 0;
m.phasecoef = 0;
m.phasecoefcos = 1;
m.phasecoefadj = 0;
m.omega = this.getOmega (x, y, z);
this.modes[this.modeCount++] = m;
return m;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getOmega", 
function (x, y, z) {
return java.lang.Math.sqrt (x * x / (this.boxwidth * this.boxwidth) + y * y / (this.boxheight * this.boxheight) + z * z / 4.);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "findSelectedMode", 
function () {
var i;
for (i = 0; i != this.modeCount; i++) {
var m = this.modes[i];
if (this.selectedCoefX == m.x && this.selectedCoefY == m.y && this.selectedCoefZ == m.z) return m;
}
return this.addMode (this.selectedCoefX, this.selectedCoefY, this.selectedCoefZ);
});
c$.$ModeBoxFrame$Mode$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.x = 0;
this.y = 0;
this.z = 0;
this.magcoef = 0;
this.phasecoef = 0;
this.phasecoefcos = 0;
this.phasemult = 0;
this.phasecoefadj = 0;
this.omega = 0;
this.tableSize = 0;
this.xtable = null;
this.ytable = null;
this.ztable = null;
Clazz.instantialize (this, arguments);
}, test.falstad.ModeBoxFrame, "Mode");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"pi", 3.14159265358979323846,
"pi2", 6.283185307179586,
"spectrumSpacing", 50,
"maxModes", 10,
"maxDispCoefs", 8,
"viewDistance", 12,
"SEL_NONE", 0,
"SEL_3D", 1,
"SEL_MAG", 2,
"SEL_SPECTRUM", 3,
"MODE_ANGLE", 0,
"MODE_ZOOM", 1,
"sampleCount", 15,
"epsilon", .00001,
"epsilon2", .003);
});
