Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "swingjs.awt.Applet", "$.Canvas"], ["test.falstad.HistogramCanvas", "$.GasCanvas", "$.Gas", "$.GasLayout"], ["java.awt.Color", "$.Dimension", "java.lang.Double", "java.text.DecimalFormat", "java.util.Random", "$.Vector", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "GasCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.GasCanvas, []);
this.pg = p;
}, "test.falstad.Gas");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateGas (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateGas (g);
}, "java.awt.Graphics");
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "HistogramCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.HistogramCanvas, []);
this.pg = p;
}, "test.falstad.Gas");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (125, 50);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateHistogram (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateHistogram (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "GasLayout", null, java.awt.LayoutManager);
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
var cw = Clazz.doubleToInt (target.size ().width * 2 / 3);
target.getComponent (0).move (0, 0);
target.getComponent (0).resize (cw, target.size ().height - 100);
target.getComponent (1).move (0, target.size ().height - 100);
target.getComponent (1).resize (cw, 100);
var i;
var h = 0;
for (i = 2; i < target.getComponentCount (); i++) {
var m = target.getComponent (i);
if (m.isVisible ()) {
var d = m.getPreferredSize ();
if (Clazz.instanceOf (m, swingjs.awt.Scrollbar)) d.width = target.size ().width - cw;
var c = 0;
if (Clazz.instanceOf (m, swingjs.awt.Label)) {
h += Clazz.doubleToInt (d.height / 3);
c = Clazz.doubleToInt ((target.size ().width - cw - d.width) / 2);
}m.move (cw + c, h);
m.resize (d.width, d.height);
h += d.height;
}}
}, "java.awt.Container");
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.molCount = 0;
this.winSize = null;
this.dbimage = null;
this.heaterSize = 0;
this.pause = 0;
this.random = null;
this.gridWidth = 0;
this.gridHeight = 0;
this.mols = null;
this.grid = null;
this.bigmol = null;
this.resetButton = null;
this.expandButton = null;
this.stoppedCheck = null;
this.heaterCheck = null;
this.energyCheck = null;
this.heaterTempBar = null;
this.gravityBar = null;
this.speedBar = null;
this.molCountBar = null;
this.colorBar = null;
this.setupChooser = null;
this.setupList = null;
this.setup = null;
this.gravity = 0;
this.colorMult = 0;
this.upperBound = 0;
this.topWallPos = 0;
this.topWallVel = 0;
this.areaHeight = 0;
this.heatstate = 0;
this.heaterTemp = 0;
this.heaterMove = 0;
this.wallF = 0;
this.wallFMeasure = 0;
this.heaterColor = null;
this.colors = null;
this.heaterTop = 0;
this.heaterLeft = 0;
this.heaterRight = 0;
this.maxMolCount = 1000;
this.showFormat = null;
this.cv = null;
this.hist_cv = null;
this.secTime = 0;
this.lastTime = 0;
this.t = 0;
this.lastSecT = 0;
this.totalKE = 0;
this.temp = 0;
this.totalV = 0;
this.graphmax = 20;
if (!Clazz.isClassDefined ("test.falstad.Gas.Molecule")) {
test.falstad.Gas.$Gas$Molecule$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.Setup")) {
test.falstad.Gas.$Gas$Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.Setup1Random")) {
test.falstad.Gas.$Gas$Setup1Random$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.Setup1Equal")) {
test.falstad.Gas.$Gas$Setup1Equal$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.Setup1Extreme")) {
test.falstad.Gas.$Gas$Setup1Extreme$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.Setup1Single")) {
test.falstad.Gas.$Gas$Setup1Single$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.Setup1Small")) {
test.falstad.Gas.$Gas$Setup1Small$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.Setup2Random")) {
test.falstad.Gas.$Gas$Setup2Random$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.Setup2Equal")) {
test.falstad.Gas.$Gas$Setup2Equal$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.Setup3Random")) {
test.falstad.Gas.$Gas$Setup3Random$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.Setup3Equal")) {
test.falstad.Gas.$Gas$Setup3Equal$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.SetupBrownian")) {
test.falstad.Gas.$Gas$SetupBrownian$ ();
}
if (!Clazz.isClassDefined ("test.falstad.Gas.SetupExpansion")) {
test.falstad.Gas.$Gas$SetupExpansion$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "Gas", swingjs.awt.Applet, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.ItemListener]);
Clazz.overrideMethod (c$, "getAppletInfo", 
function () {
return "Gas Molecules by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.overrideMethod (c$, "init", 
function () {
this.setupList =  new java.util.Vector ();
var s = Clazz.innerTypeInstance (test.falstad.Gas.Setup1Random, this, null);
while (s != null) {
this.setupList.addElement (s);
s = s.createNext ();
}
this.showFormat = java.text.DecimalFormat.getInstance ();
this.showFormat.setMaximumFractionDigits (3);
var ci = 0;
this.heatstate = 0;
this.colors =  new Array (16);
this.colors[ci++] =  new java.awt.Color (46, 120, 255);
this.colors[ci++] =  new java.awt.Color (79, 140, 254);
this.colors[ci++] =  new java.awt.Color (113, 142, 253);
this.colors[ci++] =  new java.awt.Color (147, 145, 252);
this.colors[ci++] =  new java.awt.Color (181, 105, 178);
this.colors[ci++] =  new java.awt.Color (215, 64, 103);
this.colors[ci++] =  new java.awt.Color (249, 23, 28);
this.colors[ci++] =  new java.awt.Color (250, 101, 44);
this.colors[ci++] =  new java.awt.Color (251, 139, 33);
this.colors[ci++] =  new java.awt.Color (252, 178, 22);
this.colors[ci++] =  new java.awt.Color (253, 216, 11);
this.colors[ci++] =  new java.awt.Color (255, 255, 0);
this.colors[ci++] =  new java.awt.Color (255, 255, 63);
this.colors[ci++] =  new java.awt.Color (255, 255, 127);
this.colors[ci++] =  new java.awt.Color (255, 255, 191);
this.colors[ci++] =  new java.awt.Color (255, 255, 255);
this.gravity = 0;
this.setLayout ( new test.falstad.GasLayout ());
this.cv =  new test.falstad.GasCanvas (this);
this.cv.addComponentListener (this);
this.add (this.cv);
this.hist_cv =  new test.falstad.HistogramCanvas (this);
this.hist_cv.addComponentListener (this);
this.add (this.hist_cv);
this.setupChooser =  new swingjs.awt.Choice ();
var i;
for (i = 0; i != this.setupList.size (); i++) this.setupChooser.add ("Setup: " + (this.setupList.elementAt (i)).getName ());

this.setupChooser.addItemListener (this);
this.add (this.setupChooser);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
this.add (this.stoppedCheck);
this.heaterCheck =  new swingjs.awt.Checkbox ("Heater");
this.heaterCheck.addItemListener (this);
this.add (this.heaterCheck);
this.energyCheck =  new swingjs.awt.Checkbox ("Energy Distribution");
this.energyCheck.addItemListener (this);
this.add (this.energyCheck);
this.add (this.resetButton =  new swingjs.awt.Button ("Reset"));
this.resetButton.addActionListener (this);
this.add (this.expandButton =  new swingjs.awt.Button ("Expand"));
this.expandButton.addActionListener (this);
this.add ( new swingjs.awt.Label ("Simulation Speed", 0));
this.add (this.speedBar =  new swingjs.awt.Scrollbar (0, 50, 1, 0, 100));
this.speedBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Molecule Count", 0));
this.add (this.molCountBar =  new swingjs.awt.Scrollbar (0, 500, 1, 1, 1000));
this.molCountBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Color Scale", 0));
this.add (this.colorBar =  new swingjs.awt.Scrollbar (0, 150, 1, 1, 300));
this.colorBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Heater Temperature", 0));
this.add (this.heaterTempBar =  new swingjs.awt.Scrollbar (0, 35, 1, 0, 100));
this.heaterTempBar.addAdjustmentListener (this);
this.add ( new swingjs.awt.Label ("Gravity", 0));
this.add (this.gravityBar =  new swingjs.awt.Scrollbar (0, 20, 1, 0, 100));
this.gravityBar.addAdjustmentListener (this);
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (this.heaterColor = java.awt.Color.lightGray);
this.hist_cv.setBackground (java.awt.Color.black);
this.hist_cv.setForeground (java.awt.Color.lightGray);
this.random =  new java.util.Random ();
this.pause = 10;
this.adjustColors ();
this.adjustHeaterTemp ();
this.enableItems ();
try {
var param = this.getParameter ("PAUSE");
if (param != null) this.pause = Integer.parseInt (param);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.reinit (true);
this.repaint ();
});
Clazz.defineMethod (c$, "reinit", 
function (newsetup) {
if (this.cv.getSize ().width == 0 || this.gravityBar == null || this.setupChooser == null) return;
System.out.println ("winsize " + this.winSize);
this.bigmol = null;
this.setup = this.setupList.elementAt (this.setupChooser.getSelectedIndex ());
this.gravityBar.setValue (0);
if (newsetup) {
this.speedBar.setValue (20);
this.molCountBar.setValue (500);
this.colorBar.setValue (160);
this.setup.select ();
}this.setup.reinit ();
this.adjustColors ();
}, "~B");
Clazz.defineMethod (c$, "expand", 
function () {
this.topWallPos -= 50;
if (this.topWallPos < 0) this.topWallPos = 0;
this.enableItems ();
});
Clazz.defineMethod (c$, "initMolecules", 
function (speed) {
var d = this.winSize = this.cv.getSize ();
this.molCount = this.molCountBar.getValue ();
this.upperBound = Clazz.doubleToInt (this.winSize.height * (1 - this.setup.getVolume ()) - 1);
this.topWallPos = this.upperBound;
this.areaHeight = this.winSize.height - this.upperBound;
this.mols =  new Array (1000);
this.dbimage = this.createImage (d.width, d.height);
this.gridWidth = Clazz.doubleToInt (d.width / test.falstad.Gas.gridEltWidth) + 1;
this.gridHeight = Clazz.doubleToInt (d.height / test.falstad.Gas.gridEltHeight) + 1;
this.grid =  Clazz.newArray (this.gridWidth, this.gridHeight, null);
var i;
var j;
for (i = 0; i != this.gridWidth; i++) for (j = 0; j != this.gridHeight; j++) {
this.grid[i][j] = Clazz.innerTypeInstance (test.falstad.Gas.Molecule, this, null);
this.grid[i][j].listHead = true;
}

for (i = 0; i != 1000; i++) {
var m = Clazz.innerTypeInstance (test.falstad.Gas.Molecule, this, null);
this.mols[i] = m;
m.x = this.getrand (this.winSize.width * 10) * .1;
m.y = this.getrand (this.areaHeight * 10) * .1 + this.upperBound;
m.dx = (this.getrand (100) / 99.0 - .5);
m.dy = java.lang.Math.sqrt (1 - m.dx * m.dx);
if (this.getrand (10) > 4) m.dy = -m.dy;
if (speed == 2) {
var q = ((i & 2) > 0) ? 3 : .1;
m.dx *= q;
m.dy *= q;
}if (speed == 0) {
var q = this.getrand (101) / 50.;
m.dx *= q;
m.dy *= q;
}if (Double.isNaN (m.dx) || Double.isNaN (m.dy)) System.out.println ("nan1");
this.setColor (m);
if (i < this.molCount) this.gridAdd (m);
}
this.heaterTop = this.winSize.height - 5;
this.heaterSize = Clazz.doubleToInt (this.winSize.width / 4);
this.heaterLeft = Clazz.doubleToInt ((this.winSize.width - this.heaterSize * 3) / 2);
this.heaterRight = Clazz.doubleToInt ((this.winSize.width + this.heaterSize * 3) / 2);
this.enableItems ();
this.cv.repaint ();
this.hist_cv.repaint ();
}, "~N");
Clazz.defineMethod (c$, "setMoleculeTypes", 
function (mult, typeCount) {
var i;
var j;
for (i = 0; i != 1000; i++) {
var m = this.mols[i];
m.r *= mult;
m.mass *= mult * mult;
if (typeCount > 1) {
var n = (i % typeCount);
m.type = n;
if (n == 2) {
m.r *= 3;
m.mass *= 9;
} else if (n == 1) {
m.r *= 2;
m.mass *= 4;
}}this.setColor (m);
}
}, "~N,~N");
Clazz.defineMethod (c$, "updateGas", 
function (realg) {
if (this.winSize == null) return;
var g = this.dbimage.getGraphics ();
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
var j;
var dt = this.speedBar.getValue () / 100.;
if (!this.stoppedCheck.getState ()) {
var sysTime = System.currentTimeMillis ();
if (this.lastTime != 0) {
var inc = (sysTime - this.lastTime);
dt *= inc / 8.;
}if (sysTime - this.secTime >= 1000) {
if (this.t > 0) this.wallF /= this.t - this.lastSecT;
this.wallFMeasure = this.wallF;
this.wallF = 0;
this.secTime = sysTime;
this.lastSecT = this.t;
}this.lastTime = sysTime;
} else this.lastTime = 0;
for (var i = 0; i != this.molCount; i++) {
var m = this.mols[i];
var bounce = false;
var ix = Clazz.doubleToInt (m.x);
var iy = Clazz.doubleToInt (m.y);
j = (this.stoppedCheck.getState ()) ? 5 : 0;
for (; j < 5; j++) {
m.dy += this.gravity * dt;
m.x += m.dx * dt;
m.y += m.dy * dt;
if (Double.isNaN (m.dx) || Double.isNaN (m.dy)) System.out.println ("nan2");
var r = m.r;
if (m.x < r || m.x >= this.winSize.width - r) {
this.wallF += Math.abs (m.dx) * m.mass;
m.dx = -m.dx;
if (m.x < m.r) m.x = m.r;
if (m.x >= this.winSize.width - r) m.x = this.winSize.width - r - 1;
this.setColor (m);
bounce = true;
}if (m.y < this.upperBound + r || m.y >= this.winSize.height - r) {
this.wallF += Math.abs (m.dy) * m.mass;
if (m.y < this.upperBound + r) m.y = this.upperBound + r;
if (m.y >= this.winSize.height - r) m.y = this.winSize.height - r - 1;
if (m.y == this.upperBound + r && m.dy < 0 && false) {
var wallMass = 1000;
var totmass = m.mass + wallMass;
var comdy = (m.mass * m.dy + wallMass * this.topWallVel) / totmass;
var chg = (m.dy - comdy);
m.dy -= 2 * chg;
this.topWallVel += 2 * chg * m.mass / wallMass;
} else m.dy = -m.dy;
this.setColor (m);
bounce = true;
}var nix = Clazz.doubleToInt (m.x);
var niy = Clazz.doubleToInt (m.y);
if (!bounce && nix >= this.heaterLeft && nix <= this.heaterRight && niy >= this.heaterTop - 1 && this.heaterCheck.getState ()) {
var v = java.lang.Math.sqrt (m.dx * m.dx + m.dy * m.dy);
var oldy = m.dy;
var mxv = Math.sqrt (3 * this.heaterTemp / m.mass);
var mix = this.getrand (100) / 99.0;
mix = 0;
var newv = v * mix + mxv * (1 - mix);
m.dx = this.getrand (101) / 50.0 - 1;
m.dy = -Math.sqrt (1 - m.dx * m.dx) * newv;
m.dx *= newv;
if (Double.isNaN (m.dx) || Double.isNaN (m.dy)) System.out.println ("nan3");
this.wallF += (oldy - m.dy) * m.mass;
this.setColor (m);
bounce = true;
m.y = this.heaterTop - 2;
niy = Clazz.doubleToInt (m.y);
}var m2 = (bounce) ? null : this.checkCollision (m);
if (m2 != null) {
if (m.dx == m2.dx && m.dy == m2.dy) {
if (m.dx == 0 && m.dy == 0) continue;
m.dx += .001;
}var sdx = m.dx - m2.dx;
var sx = m.x - m2.x;
var sdy = m.dy - m2.dy;
var sy = m.y - m2.y;
var mindist = m.r + m2.r;
var a = sdx * sdx + sdy * sdy;
var b = 2 * (sx * sdx + sy * sdy);
var c = sx * sx + sy * sy - mindist * mindist;
var t = (-b - java.lang.Math.sqrt (b * b - 4 * a * c)) / a;
var t2 = (-b + java.lang.Math.sqrt (b * b - 4 * a * c)) / a;
if (java.lang.Math.abs (t) > java.lang.Math.abs (t2)) t = t2;
if (Double.isNaN (t)) System.out.print ("nan " + m.dx + " " + m.dy + " " + m2.dx + " " + m2.dy + " " + a + " " + b + " " + c + " " + t + " " + t2 + "\n");
m.x += t * m.dx;
m.y += t * m.dy;
sx = m.x - m2.x;
sy = m.y - m2.y;
var sxynorm = java.lang.Math.sqrt (sx * sx + sy * sy);
var sxn = sx / sxynorm;
var syn = sy / sxynorm;
var totmass = m.mass + m2.mass;
var comdx = (m.mass * m.dx + m2.mass * m2.dx) / totmass;
var comdy = (m.mass * m.dy + m2.mass * m2.dy) / totmass;
var pn = (m.dx - comdx) * sxn + (m.dy - comdy) * syn;
var px = 2 * sxn * pn;
var py = 2 * syn * pn;
m.dx -= px;
m.dy -= py;
if (Double.isNaN (m.dx)) System.out.println ("nan0 " + sxynorm + " " + pn);
var mult = m.mass / m2.mass;
m2.dx += px * mult;
m2.dy += py * mult;
if (t < 0) {
m.x -= t * m.dx;
m.y -= t * m.dy;
}if (m.x < r) m.x = r;
if (m.x >= this.winSize.width - r) m.x = this.winSize.width - r;
if (m.y < this.upperBound + r) m.y = this.upperBound + r;
if (m.y >= this.winSize.height - r) m.y = this.winSize.height - r - 1;
if (Double.isNaN (m.dx) || Double.isNaN (m.dy)) System.out.println ("nan4");
if (Double.isNaN (m2.dx) || Double.isNaN (m2.dy)) System.out.println ("nan5");
this.setColor (m);
this.setColor (m2);
}}
g.setColor (m.color);
g.fillOval (Clazz.doubleToInt (m.x) - m.r, Clazz.doubleToInt (m.y) - m.r, m.r * 2, m.r * 2);
this.gridRemove (m);
this.gridAdd (m);
}
this.t += dt * 5;
this.totalKE = 0;
this.totalV = 0;
for (var i = 0; i != this.molCount; i++) {
var m = this.mols[i];
this.totalKE += m.ke;
this.totalV += m.r * m.r;
}
this.totalV *= 3.141592653589793;
this.temp = this.totalKE / this.molCount;
if (this.topWallVel > .5) this.topWallVel = .5;
this.topWallPos += this.topWallVel * 5;
if (this.topWallPos < 0) {
this.topWallPos = 0;
if (this.topWallVel < 0) this.topWallVel = 0;
}if (this.topWallPos > (Clazz.doubleToInt (this.winSize.height * 4 / 5))) {
this.topWallPos = (Clazz.doubleToInt (this.winSize.height * 4 / 5));
if (this.topWallVel > 0) this.topWallVel = 0;
}this.upperBound = Clazz.doubleToInt (this.topWallPos);
var heatstateint = (Clazz.doubleToInt (this.heatstate));
if (this.heaterCheck.getState ()) {
for (j = 0; j != this.heaterSize; j++, heatstateint++) {
var x = this.heaterLeft + j * 3;
var y = heatstateint & 3;
if ((heatstateint & 4) == 4) y = 4 - y;
g.setColor (this.heaterColor);
g.fillRect (x, this.heaterTop + y, 2, 2);
}
}g.setColor (java.awt.Color.lightGray);
g.drawRect (0, this.upperBound, this.winSize.width - 1, this.winSize.height - 1 - this.upperBound);
g.fillRect (Clazz.doubleToInt (this.winSize.width / 2) - 20, 0, 40, this.upperBound);
realg.drawImage (this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState ()) {
this.heatstate += this.heaterMove;
this.cv.repaint (this.pause);
this.hist_cv.repaint (this.pause);
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "gridAdd", 
function (m) {
var gx = Clazz.doubleToInt (m.x / test.falstad.Gas.gridEltWidth);
var gy = Clazz.doubleToInt (m.y / test.falstad.Gas.gridEltHeight);
var g = this.grid[gx][gy];
m.next = g;
m.prev = g.prev;
g.prev = m;
m.prev.next = m;
}, "test.falstad.Gas.Molecule");
Clazz.defineMethod (c$, "gridRemove", 
function (m) {
m.next.prev = m.prev;
m.prev.next = m.next;
}, "test.falstad.Gas.Molecule");
Clazz.defineMethod (c$, "checkCollision", 
function (m) {
if (this.bigmol != null) {
var q = this.checkCollision (m, this.grid[Clazz.doubleToInt (this.bigmol.x / test.falstad.Gas.gridEltWidth)][Clazz.doubleToInt (this.bigmol.y / test.falstad.Gas.gridEltHeight)]);
if (q != null) return q;
}var gx = Clazz.doubleToInt (m.x / test.falstad.Gas.gridEltWidth);
var gy = Clazz.doubleToInt (m.y / test.falstad.Gas.gridEltHeight);
var i;
var j;
for (i = -1; i <= 1; i++) for (j = -1; j <= 1; j++) {
if (gx + i < 0 || gy + j < 0 || gx + i >= this.gridWidth || gy + j >= this.gridHeight) continue;
var n = this.checkCollision (m, this.grid[gx + i][gy + j]);
if (n != null) return n;
}

return null;
}, "test.falstad.Gas.Molecule");
Clazz.defineMethod (c$, "checkCollision", 
function (m, list) {
var l = list.next;
var count = 0;
for (; !l.listHead; l = l.next) {
if (m === l) continue;
count++;
var mindist = m.r + l.r;
var dx = m.x - l.x;
var dy = m.y - l.y;
if (dx > mindist || dy > mindist || dx < -mindist || dy < -mindist) continue;
var dist = java.lang.Math.sqrt (dx * dx + dy * dy);
if (dist > mindist) continue;
return l;
}
return null;
}, "test.falstad.Gas.Molecule,test.falstad.Gas.Molecule");
Clazz.defineMethod (c$, "setColor", 
function (m) {
m.vel = Math.sqrt (m.dx * m.dx + m.dy * m.dy);
m.ke = .5 * m.mass * m.vel * m.vel;
var col = Clazz.doubleToInt (m.ke * this.colorMult);
var maxcol = this.colors.length - 1;
if (col > maxcol) col = maxcol;
m.color = this.colors[col];
}, "test.falstad.Gas.Molecule");
Clazz.defineMethod (c$, "updateHistogram", 
function (realg) {
if (this.winSize == null) return;
var d = this.hist_cv.size ();
var g = this.dbimage.getGraphics ();
g.setColor (this.hist_cv.getBackground ());
g.fillRect (0, 0, d.width, d.height);
g.setColor (this.hist_cv.getForeground ());
var i;
var slots = Clazz.doubleToInt (d.width / 2);
var graph =  Clazz.newIntArray (slots, 0);
var gi;
var mg = 0;
var gicount = this.setup.getHistogramCount ();
var energy = this.energyCheck.getState ();
for (gi = 0; gi != gicount; gi++) {
var ymin = Clazz.doubleToInt (d.height * gi / gicount);
var ymax = Clazz.doubleToInt (d.height * (gi + 1) / gicount) - 1;
var yheight = ymax - ymin;
var maxke = energy ? 70 : 15;
for (i = 0; i != slots; i++) graph[i] = 0;

var mass = 1;
var mcount = 0;
for (i = 0; i != this.molCount; i++) {
var m = this.mols[i];
if (m.type != gi) continue;
mcount++;
mass = m.mass;
var value = (energy ? m.ke : m.vel);
var r = Clazz.doubleToInt (value * slots / maxke);
if (r >= slots) continue;
graph[r]++;
}
maxke += .5;
var maxcol = this.colors.length - 1;
for (i = 0; i != slots; i++) {
if (graph[i] == 0) continue;
if (graph[i] > mg) mg = graph[i];
var y = ymax - (Clazz.doubleToInt (graph[i] * yheight / this.graphmax));
if (y < ymin) y = ymin;
var value = i * maxke / slots;
if (!energy) value *= mass * value;
var col = Clazz.doubleToInt (value * this.colorMult);
if (col > maxcol) col = maxcol;
g.setColor (this.colors[col]);
g.fillRect (i * 2, y, 2, ymax - y + 1);
}
var ox = -1;
var oy = -1;
g.setColor (java.awt.Color.lightGray);
if (!this.energyCheck.getState ()) {
for (i = 0; i != slots; i++) {
var v = i * maxke / slots;
var dv = maxke / slots;
var distdv = .5 * mcount * (this.maxwellDist (v, mass) + this.maxwellDist (v + dv, mass)) * dv;
var v0 = Clazz.doubleToInt (distdv);
var y = (ymax - (Clazz.doubleToInt (v0 * yheight / this.graphmax)));
if (y < ymin) y = ymin;
var x = i * 2;
if (ox != -1 && !(y == oy && oy == ymax)) g.drawLine (ox, oy, x, y);
ox = x;
oy = y;
}
}}
if (mg > this.graphmax) this.graphmax = mg;
if (mg < Clazz.doubleToInt (this.graphmax / 2) && this.graphmax > 1) this.graphmax /= 2;
var fm = g.getFontMetrics ();
g.setColor (java.awt.Color.white);
var x = Clazz.doubleToInt (this.winSize.width * 2 / 3);
var vadj = 4e-4;
var v = (this.winSize.width - 2) * (this.winSize.height - this.upperBound - 2) * vadj;
g.drawString ("V = " + this.showFormat.format (v), x, fm.getAscent ());
g.drawString ("n = " + this.molCount, x, fm.getAscent () + fm.getHeight ());
var a = 2 * (this.winSize.width + (this.winSize.height - this.upperBound) - 4);
var p = 1e4 * this.wallFMeasure / (3 * a);
g.drawString ("P = " + this.showFormat.format (p), x, fm.getAscent () + 2 * fm.getHeight ());
g.drawString ("kT = " + this.showFormat.format (this.temp), x, fm.getAscent () + 3 * fm.getHeight ());
g.drawString ("PV/nkT = " + this.showFormat.format (p * v / (this.molCount * this.temp)), x, fm.getAscent () + 4 * fm.getHeight ());
g.drawString ("P(V-nb)/nkT = " + this.showFormat.format (p * (v - this.totalV * vadj) / (this.molCount * this.temp)), x, fm.getAscent () + 5 * fm.getHeight ());
realg.drawImage (this.dbimage, 0, 0, this);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "maxwellDist", 
function (v, mass) {
if (this.energyCheck.getState ()) return Math.exp (-v / this.temp) / this.temp;
return (mass / this.temp) * v * Math.exp (-mass * v * v / (2 * this.temp));
}, "~N,~N");
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
this.reinit (false);
this.cv.repaint (100);
this.hist_cv.repaint (100);
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
System.out.println (e);
if (e.getSource () === this.resetButton) {
this.reinit (false);
this.cv.repaint ();
}if (e.getSource () === this.expandButton) {
this.expand ();
this.cv.repaint ();
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.println ((e.getSource ()).getValue ());
if (e.getSource () === this.gravityBar) this.gravity = this.gravityBar.getValue () * (5.0E-5);
if (e.getSource () === this.heaterTempBar) this.adjustHeaterTemp ();
if (e.getSource () === this.molCountBar) this.adjustMolCount ();
if (e.getSource () === this.colorBar) this.adjustColors ();
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "adjustHeaterTemp", 
function () {
this.heaterTemp = (this.heaterTempBar.getValue () * .029111971) * 30 + .01;
this.heaterMove = (this.heaterTempBar.getValue () * .029111971) + .3;
this.heaterMove /= 2;
var value = 1.5 * this.heaterTemp;
var col = Clazz.doubleToInt (value * this.colorMult);
var maxcol = this.colors.length - 1;
if (col > maxcol) col = maxcol;
this.heaterColor = this.colors[col];
System.out.println ("htemp = " + this.heaterTemp);
});
Clazz.defineMethod (c$, "adjustColors", 
function () {
var i;
var c = this.colorBar.getValue () / 150.;
this.colorMult = Math.exp ((c - 1) * 4) * .7;
for (i = 0; i != this.molCount; i++) this.setColor (this.mols[i]);

});
Clazz.defineMethod (c$, "enableItems", 
function () {
this.heaterTempBar.setEnabled (this.heaterCheck.getState ());
this.expandButton.setEnabled (this.topWallPos > 0);
});
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
this.enableItems ();
if (e.getItemSelectable () === this.stoppedCheck) {
this.cv.repaint ();
return;
}if (e.getItemSelectable () === this.setupChooser) this.reinit (true);
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "adjustMolCount", 
function () {
var oldcount = this.molCount;
this.molCount = this.molCountBar.getValue ();
if (this.molCount == oldcount) return;
if (oldcount > this.molCount) {
var i;
for (i = this.molCount; i != oldcount; i++) this.gridRemove (this.mols[i]);

} else {
var i;
for (i = oldcount; i != this.molCount; i++) this.gridAdd (this.mols[i]);

}});
c$.$Gas$Molecule$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.x = 0;
this.y = 0;
this.dx = 0;
this.dy = 0;
this.mass = 0;
this.ke = 0;
this.vel = 0;
this.r = 0;
this.type = 0;
this.color = null;
this.next = null;
this.prev = null;
this.listHead = false;
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "Molecule");
Clazz.makeConstructor (c$, 
function () {
this.r = 2;
this.type = 0;
this.mass = 2;
this.next = this.prev = this;
});
c$ = Clazz.p0p ();
};
c$.$Gas$Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "Setup");
Clazz.defineMethod (c$, "select", 
function () {
});
Clazz.defineMethod (c$, "reinit", 
function () {
});
Clazz.defineMethod (c$, "deselect", 
function () {
});
Clazz.defineMethod (c$, "getHistogramCount", 
function () {
return 1;
});
Clazz.defineMethod (c$, "getVolume", 
function () {
return 1;
});
c$ = Clazz.p0p ();
};
c$.$Gas$Setup1Random$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "Setup1Random", test.falstad.Gas.Setup, null, Clazz.innerTypeInstance (test.falstad.Gas.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "1 Gas, Random Speeds";
});
Clazz.overrideMethod (c$, "reinit", 
function () {
this.b$["test.falstad.Gas"].initMolecules (0);
this.b$["test.falstad.Gas"].setMoleculeTypes (2, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Gas.Setup1Equal, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Gas$Setup1Equal$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "Setup1Equal", test.falstad.Gas.Setup, null, Clazz.innerTypeInstance (test.falstad.Gas.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "1 Gas, Equal Speeds";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Gas"].speedBar.setValue (3);
});
Clazz.overrideMethod (c$, "reinit", 
function () {
this.b$["test.falstad.Gas"].initMolecules (1);
this.b$["test.falstad.Gas"].setMoleculeTypes (2, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Gas.Setup1Extreme, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Gas$Setup1Extreme$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "Setup1Extreme", test.falstad.Gas.Setup, null, Clazz.innerTypeInstance (test.falstad.Gas.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "1 Gas, Extreme Speeds";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Gas"].speedBar.setValue (3);
});
Clazz.overrideMethod (c$, "reinit", 
function () {
this.b$["test.falstad.Gas"].initMolecules (2);
this.b$["test.falstad.Gas"].setMoleculeTypes (2, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Gas.Setup1Single, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Gas$Setup1Single$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "Setup1Single", test.falstad.Gas.Setup, null, Clazz.innerTypeInstance (test.falstad.Gas.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "1 Gas, One Moving Molecule";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Gas"].speedBar.setValue (10);
});
Clazz.overrideMethod (c$, "reinit", 
function () {
this.b$["test.falstad.Gas"].initMolecules (1);
var a;
var b;
for (a = 1; a != 1000; a++) this.b$["test.falstad.Gas"].mols[a].dx = this.b$["test.falstad.Gas"].mols[a].dy = 0;

this.b$["test.falstad.Gas"].mols[0].dx *= Math.sqrt (this.b$["test.falstad.Gas"].molCount);
this.b$["test.falstad.Gas"].mols[0].dy *= Math.sqrt (this.b$["test.falstad.Gas"].molCount);
this.b$["test.falstad.Gas"].setMoleculeTypes (2, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Gas.Setup1Small, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Gas$Setup1Small$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "Setup1Small", test.falstad.Gas.Setup, null, Clazz.innerTypeInstance (test.falstad.Gas.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "1 Gas, Small";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Gas"].colorBar.setValue (215);
this.b$["test.falstad.Gas"].speedBar.setValue (36);
});
Clazz.overrideMethod (c$, "reinit", 
function () {
this.b$["test.falstad.Gas"].initMolecules (0);
this.b$["test.falstad.Gas"].setMoleculeTypes (1, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Gas.Setup2Random, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Gas$Setup2Random$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "Setup2Random", test.falstad.Gas.Setup, null, Clazz.innerTypeInstance (test.falstad.Gas.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "2 Gases, Random Speeds";
});
Clazz.overrideMethod (c$, "reinit", 
function () {
this.b$["test.falstad.Gas"].initMolecules (0);
this.b$["test.falstad.Gas"].setMoleculeTypes (1, 2);
});
Clazz.overrideMethod (c$, "getHistogramCount", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Gas.Setup2Equal, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Gas$Setup2Equal$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "Setup2Equal", test.falstad.Gas.Setup, null, Clazz.innerTypeInstance (test.falstad.Gas.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "2 Gases, Equal Speeds";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Gas"].speedBar.setValue (3);
});
Clazz.overrideMethod (c$, "reinit", 
function () {
this.b$["test.falstad.Gas"].initMolecules (1);
this.b$["test.falstad.Gas"].setMoleculeTypes (1, 2);
});
Clazz.overrideMethod (c$, "getHistogramCount", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Gas.Setup3Random, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Gas$Setup3Random$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "Setup3Random", test.falstad.Gas.Setup, null, Clazz.innerTypeInstance (test.falstad.Gas.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "3 Gases, Random Speeds";
});
Clazz.overrideMethod (c$, "reinit", 
function () {
this.b$["test.falstad.Gas"].initMolecules (0);
this.b$["test.falstad.Gas"].setMoleculeTypes (1, 3);
});
Clazz.overrideMethod (c$, "getHistogramCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Gas.Setup3Equal, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Gas$Setup3Equal$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "Setup3Equal", test.falstad.Gas.Setup, null, Clazz.innerTypeInstance (test.falstad.Gas.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "3 Gases, Equal Speeds";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Gas"].speedBar.setValue (3);
});
Clazz.overrideMethod (c$, "reinit", 
function () {
this.b$["test.falstad.Gas"].initMolecules (1);
this.b$["test.falstad.Gas"].setMoleculeTypes (1, 3);
});
Clazz.overrideMethod (c$, "getHistogramCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Gas.SetupBrownian, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Gas$SetupBrownian$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "SetupBrownian", test.falstad.Gas.Setup, null, Clazz.innerTypeInstance (test.falstad.Gas.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Brownian Motion";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Gas"].speedBar.setValue (70);
this.b$["test.falstad.Gas"].colorBar.setValue (210);
});
Clazz.overrideMethod (c$, "reinit", 
function () {
this.b$["test.falstad.Gas"].initMolecules (0);
this.b$["test.falstad.Gas"].bigmol = this.b$["test.falstad.Gas"].mols[0];
this.b$["test.falstad.Gas"].bigmol.r = 30;
this.b$["test.falstad.Gas"].bigmol.mass = Clazz.doubleToInt (this.b$["test.falstad.Gas"].bigmol.r * this.b$["test.falstad.Gas"].bigmol.r / 2);
this.b$["test.falstad.Gas"].bigmol.dx = this.b$["test.falstad.Gas"].bigmol.dy = 0;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.Gas.SetupExpansion, this, null);
});
c$ = Clazz.p0p ();
};
c$.$Gas$SetupExpansion$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.Gas, "SetupExpansion", test.falstad.Gas.Setup, null, Clazz.innerTypeInstance (test.falstad.Gas.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Free Expansion";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.Gas"].molCountBar.setValue (250);
this.b$["test.falstad.Gas"].speedBar.setValue (45);
this.b$["test.falstad.Gas"].colorBar.setValue (210);
});
Clazz.overrideMethod (c$, "reinit", 
function () {
this.b$["test.falstad.Gas"].initMolecules (0);
this.b$["test.falstad.Gas"].setMoleculeTypes (1, 1);
});
Clazz.overrideMethod (c$, "getVolume", 
function () {
return .5;
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return null;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"defaultPause", 10,
"gridEltWidth", 10,
"gridEltHeight", 10,
"SPEED_RANDOM", 0,
"SPEED_EQUAL", 1,
"SPEED_EXTREME", 2);
});
