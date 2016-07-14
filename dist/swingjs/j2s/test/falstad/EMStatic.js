Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas", "$.Frame"], ["test.falstad.EMStatic", "$.EMStaticCanvas", "$.EMStaticFrame", "$.EMStaticLayout"], ["java.awt.Color", "$.Dimension", "$.Point", "java.text.NumberFormat", "java.util.Vector", "swingjs.awt.Button", "$.Checkbox", "$.Choice", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "EMStaticCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.EMStaticCanvas, []);
this.pg = p;
}, "test.falstad.EMStaticFrame");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateEMStatic (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateEMStatic (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "EMStaticLayout", null, java.awt.LayoutManager);
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
var cw = Clazz.doubleToInt (targetw * 2 / 3);
var targeth = target.size ().height - (insets.top + insets.bottom);
target.getComponent (0).setLocation (insets.left, insets.top);
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
}, test.falstad, "EMStatic", swingjs.awt.Applet);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.falstad.EMStatic.ogf != null) test.falstad.EMStatic.ogf.dispose ();
test.falstad.EMStatic.ogf = null;
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.falstad.EMStatic.ogf =  new test.falstad.EMStaticFrame (null);
test.falstad.EMStatic.ogf.init ();
}, "~A");
Clazz.overrideMethod (c$, "init", 
function () {
test.falstad.EMStatic.ogf =  new test.falstad.EMStaticFrame (this);
test.falstad.EMStatic.ogf.init ();
});
Clazz.overrideMethod (c$, "destroy", 
function () {
if (test.falstad.EMStatic.ogf != null) test.falstad.EMStatic.ogf.dispose ();
test.falstad.EMStatic.ogf = null;
});
Clazz.defineMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (test.falstad.EMStatic.ogf == null) s = "Applet is finished.";
 else if (test.falstad.EMStatic.ogf.useFrame) test.falstad.EMStatic.ogf.triggerShow ();
g.drawString (s, 10, 30);
Clazz.superCall (this, test.falstad.EMStatic, "paint", [g]);
}, "java.awt.Graphics");
Clazz.defineStatics (c$,
"ogf", null);
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.gridSizeX = 0;
this.gridSizeY = 0;
this.windowWidth = 50;
this.windowHeight = 50;
this.windowOffsetX = 0;
this.windowOffsetY = 0;
this.chargeRadius = 1;
this.blankButton = null;
this.stoppedCheck = null;
this.currentCheck = null;
this.equipCheck = null;
this.modeChooser = null;
this.viewChooser = null;
this.setupChooser = null;
this.accuracyChooser = null;
this.setupList = null;
this.setup = null;
this.resBar = null;
this.brightnessBar = null;
this.adjustBar = null;
this.equipBar = null;
this.adjustLabel = null;
this.grid = null;
this.solverGrids = null;
this.charges = null;
this.dragX = 0;
this.dragY = 0;
this.selectedCharge = 0;
this.dragging = false;
this.stopCalc = false;
this.dragClear = false;
this.dragSet = false;
this.objDragMap = null;
this.changedCharges = false;
this.changedConductors = false;
this.changedMagField = false;
this.t = 0;
this.pause = 0;
this.chargeCount = 0;
this.adjustSelectX1 = 0;
this.adjustSelectY1 = 0;
this.adjustSelectX2 = 0;
this.adjustSelectY2 = 0;
this.useFrame = false;
this.showControls = false;
this.cv = null;
this.applet = null;
this.main = null;
this.shown = false;
this.calculateNotice = false;
this.solveCurrent = false;
this.floatCap = 0;
this.floatCharge = 0;
this.floatExtCharge = 0;
this.linegrid = null;
this.dragObjX = 0;
this.dragObjY = 0;
this.dragBoundX1 = 0;
this.dragBoundX2 = 0;
this.dragBoundY1 = 0;
this.dragBoundY2 = 0;
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.Charge")) {
test.falstad.EMStaticFrame.$EMStaticFrame$Charge$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.GridElement")) {
test.falstad.EMStaticFrame.$EMStaticFrame$GridElement$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.SolverElement")) {
test.falstad.EMStaticFrame.$EMStaticFrame$SolverElement$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.SolverGrid")) {
test.falstad.EMStaticFrame.$EMStaticFrame$SolverGrid$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.SingleChargeSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$SingleChargeSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.DoubleChargeSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$DoubleChargeSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.DipoleChargeSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$DipoleChargeSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ChargePlaneSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ChargePlaneSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.DipoleUniformSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$DipoleUniformSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.QuadChargeSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$QuadChargeSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ConductingPlanesSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ConductingPlanesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ChargedPlanesSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ChargedPlanesSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ConductingCylinderSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ConductingCylinderSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.GroundedCylinderSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$GroundedCylinderSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.GroundedCylinderUniformSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$GroundedCylinderUniformSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ChargedCylinderSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ChargedCylinderSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ChargedHollowCylinder1Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ChargedHollowCylinder1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ChargedHollowCylinder2Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ChargedHollowCylinder2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.FloatingCylinderSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$FloatingCylinderSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.FloatingCylinder2Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$FloatingCylinder2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ConductingBoxSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ConductingBoxSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.SharpPointSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$SharpPointSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.CornerSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$CornerSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.Angle45Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$Angle45Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.Angle135Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$Angle135Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.DielectricCylinderSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$DielectricCylinderSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.DielectricCylinderFieldSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$DielectricCylinderFieldSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.Dielectric1Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$Dielectric1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.Dielectric2Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$Dielectric2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.DielectricDipoleSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$DielectricDipoleSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.DielecCapSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$DielecCapSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ConductingPlanesGapSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ConductingPlanesGapSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.SlottedConductingPlaneSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$SlottedConductingPlaneSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.Shielding1Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$Shielding1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.Shielding2Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$Shielding2Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.BoxOneSideSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$BoxOneSideSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.QuadrupoleLensSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$QuadrupoleLensSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ConductingWireSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ConductingWireSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ResistorSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ResistorSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.ResistorsParallelSetup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$ResistorsParallelSetup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.Current2D1Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$Current2D1Setup$ ();
}
if (!Clazz.isClassDefined ("test.falstad.EMStaticFrame.Current2D2Setup")) {
test.falstad.EMStaticFrame.$EMStaticFrame$Current2D2Setup$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "EMStaticFrame", swingjs.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "EMStatic by Paul Falstad";
});
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.falstad.EMStaticFrame, ["Electrostatics Applet"]);
this.applet = a;
this.useFrame = true;
this.showControls = true;
}, "test.falstad.EMStatic");
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
var s = Clazz.innerTypeInstance (test.falstad.EMStaticFrame.SingleChargeSetup, this, null);
var i = 0;
while (s != null) {
this.setupList.addElement (s);
s = s.createNext ();
if (i++ == 300) {
System.out.print ("setup loop?\n");
break;
}}
this.charges =  new Array (20);
this.main.setLayout ( new test.falstad.EMStaticLayout ());
this.cv =  new test.falstad.EMStaticCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.main.add (this.cv);
this.setupChooser =  new swingjs.awt.Choice ();
for (i = 0; i != this.setupList.size (); i++) this.setupChooser.add ("Setup: " + (this.setupList.elementAt (i)).getName ());

this.setup = this.setupList.elementAt (0);
this.setupChooser.addItemListener (this);
this.main.add (this.setupChooser);
this.modeChooser =  new swingjs.awt.Choice ();
this.modeChooser.add ("Mouse = Move Object");
this.modeChooser.add ("Mouse = Delete Object");
this.modeChooser.add ("Mouse = Add + Draggable Charge");
this.modeChooser.add ("Mouse = Add - Draggable Charge");
this.modeChooser.add ("Mouse = Clear Square");
this.modeChooser.add ("Mouse = Add Conductor (Gnd)");
this.modeChooser.add ("Mouse = Add + Conductor");
this.modeChooser.add ("Mouse = Add - Conductor");
this.modeChooser.add ("Mouse = Add + Charge Square");
this.modeChooser.add ("Mouse = Add - Charge Square");
this.modeChooser.add ("Mouse = Add Dielectric");
this.modeChooser.add ("Mouse = Make Floater");
this.modeChooser.add ("Mouse = Adjust Conductivity");
this.modeChooser.add ("Mouse = Adjust Dielectric");
this.modeChooser.add ("Mouse = Adjust Potential");
this.modeChooser.add ("Mouse = Adjust Charge");
this.modeChooser.addItemListener (this);
this.modeChooser.select (0);
this.main.add (this.modeChooser);
this.viewChooser =  new swingjs.awt.Choice ();
this.viewChooser.add ("Show Electric Field (E)");
this.viewChooser.add ("Show E lines");
this.viewChooser.add ("Show Potential (Phi)");
this.viewChooser.add ("Show Vector Potential (A)");
this.viewChooser.add ("Show Magnetic Field (B)");
this.viewChooser.add ("Show Current (j)");
this.viewChooser.add ("Show Charge (rho)");
this.viewChooser.add ("Show Displacement (D)");
this.viewChooser.add ("Show Polarization (P)");
this.viewChooser.add ("Show Polarization Charge");
this.viewChooser.add ("Show Material Type");
this.viewChooser.add ("Show rho/j");
this.viewChooser.add ("Show E/rho");
this.viewChooser.add ("Show E lines/rho");
this.viewChooser.add ("Show E/j");
this.viewChooser.add ("Show E lines/j");
this.viewChooser.add ("Show E/rho/j");
this.viewChooser.add ("Show E lines/rho/j");
this.viewChooser.add ("Show E/Phi");
this.viewChooser.add ("Show E lines/Phi");
this.viewChooser.add ("Show E/Phi in conductors");
this.viewChooser.add ("Show E lines/Phi in cond.");
this.viewChooser.add ("Show E/Phi/j");
this.viewChooser.add ("Show E lines/Phi/j");
this.viewChooser.add ("Show B/j");
this.viewChooser.add ("Show E/B/rho/j");
this.viewChooser.add ("Show E lines/B/rho/j");
this.viewChooser.add ("Show Ex");
this.viewChooser.add ("Show Ey");
this.viewChooser.add ("Show Dx");
this.viewChooser.add ("Show Dy");
this.viewChooser.addItemListener (this);
this.main.add (this.viewChooser);
this.viewChooser.select (16);
this.accuracyChooser =  new swingjs.awt.Choice ();
this.accuracyChooser.add ("Low Accuracy");
this.accuracyChooser.add ("Medium Accuracy");
this.accuracyChooser.add ("High Accuracy");
this.accuracyChooser.add ("Highest Accuracy");
this.accuracyChooser.select (1);
this.accuracyChooser.addItemListener (this);
this.main.add (this.accuracyChooser);
this.main.add (this.blankButton =  new swingjs.awt.Button ("Clear All"));
this.blankButton.addActionListener (this);
this.stoppedCheck =  new swingjs.awt.Checkbox ("Stop Calculation");
this.stoppedCheck.addItemListener (this);
this.main.add (this.stoppedCheck);
this.currentCheck =  new swingjs.awt.Checkbox ("Enable Current", false);
this.currentCheck.addItemListener (this);
this.main.add (this.currentCheck);
this.equipCheck =  new swingjs.awt.Checkbox ("Draw Equipotentials", true);
this.equipCheck.addItemListener (this);
this.main.add (this.equipCheck);
this.main.add ( new swingjs.awt.Label ("Resolution", 0));
this.main.add (this.resBar =  new swingjs.awt.Scrollbar (0, 44, 4, 24, 90));
this.resBar.addAdjustmentListener (this);
this.setResolution ();
this.main.add ( new swingjs.awt.Label ("Brightness", 0));
this.main.add (this.brightnessBar =  new swingjs.awt.Scrollbar (0, 10, 1, 1, 2000));
this.brightnessBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("Equipotential Count", 0));
this.main.add (this.equipBar =  new swingjs.awt.Scrollbar (0, 10, 1, 2, 30));
this.equipBar.addAdjustmentListener (this);
this.main.add (this.adjustLabel =  new swingjs.awt.Label ("", 0));
this.main.add (this.adjustBar =  new swingjs.awt.Scrollbar (0, 50, 1, 0, 102));
this.adjustBar.addAdjustmentListener (this);
this.main.add ( new swingjs.awt.Label ("http://www.falstad.com"));
try {
var param = this.applet.getParameter ("PAUSE");
if (param != null) this.pause = Integer.parseInt (param);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.reinit ();
this.setModeChooser ();
this.setup = this.setupList.elementAt (0);
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
this.chargeCount = 0;
this.adjustSelectX1 = -1;
this.grid =  Clazz.newArray (this.gridSizeX, this.gridSizeY, null);
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) this.grid[i][j] = Clazz.innerTypeInstance (test.falstad.EMStaticFrame.GridElement, this, null);


this.solverGrids =  new Array (16);
for (i = 0; i != 16; i++) this.solverGrids[i] = Clazz.innerTypeInstance (test.falstad.EMStaticFrame.SolverGrid, this, null);

this.doSetup ();
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
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.applet.destroyFrame ();
return true;
}return Clazz.superCall (this, test.falstad.EMStaticFrame, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.defineMethod (c$, "doBlank", 
function () {
var x;
var y;
for (x = 0; x < this.gridSizeX; x++) for (y = 0; y < this.gridSizeY; y++) this.grid[x][y].clear ();


this.chargeCount = 0;
this.floatCharge = 0;
this.changedCharges = this.changedConductors = true;
});
Clazz.defineMethod (c$, "doDielec", 
function (d) {
var x;
var y;
for (x = 0; x < this.gridSizeX; x++) for (y = Clazz.doubleToInt (this.gridSizeY / 2); y < this.gridSizeY; y++) {
this.grid[x][y].dielec = d;
}

this.changedConductors = true;
}, "~N");
Clazz.defineMethod (c$, "addUniformField", 
function () {
this.conductFillRect (0, this.windowOffsetY, this.gridSizeX - 1, this.windowOffsetY, 1, 1);
var y = this.windowOffsetY + this.windowHeight - 1;
this.conductFillRect (0, y, this.gridSizeX - 1, y, -1, 1);
});
Clazz.defineMethod (c$, "calcExceptions", 
function () {
var x;
var y;
for (x = 0; x < this.gridSizeX; x++) for (y = 0; y < this.windowOffsetY; y++) {
this.copyConductor (x, y, x, this.windowOffsetY);
this.copyConductor (x, this.gridSizeY - y - 1, x, this.windowOffsetY + this.windowHeight - 1);
}

for (y = 0; y < this.gridSizeY; y++) for (x = 0; x < this.windowOffsetX; x++) {
this.copyConductor (x, y, this.windowOffsetX, y);
this.copyConductor (this.gridSizeX - x - 1, y, this.windowOffsetX + this.windowWidth - 1, y);
}

for (x = 1; x != this.gridSizeX - 1; x++) for (y = 1; y != this.gridSizeY - 1; y++) {
var e1 = this.grid[x][y - 1];
var e2 = this.grid[x][y + 1];
var e3 = this.grid[x - 1][y];
var e4 = this.grid[x + 1][y];
var e0 = this.grid[x][y];
e0.boundary = (e1.dielec != e0.dielec || e2.dielec != e0.dielec || e3.dielec != e0.dielec || e4.dielec != e0.dielec || e1.conductor != e0.conductor || e2.conductor != e0.conductor || e3.conductor != e0.conductor || e4.conductor != e0.conductor);
}

});
Clazz.defineMethod (c$, "copyConductor", 
function (x1, y1, x2, y2) {
this.grid[x1][y1].conductor = this.grid[x2][y2].conductor;
this.grid[x1][y1].floater = this.grid[x2][y2].floater;
this.grid[x1][y1].conductivity = this.grid[x2][y2].conductivity;
if (this.grid[x1][y1].conductor) this.grid[x1][y1].pot = this.grid[x2][y2].pot;
}, "~N,~N,~N,~N");
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
Clazz.defineMethod (c$, "updateEMStatic", 
function (realg) {
if (this.winSize == null || this.winSize.width == 0) return;
var g = null;
g = this.dbimage.getGraphics ();
if (!this.calculateNotice && !this.stoppedCheck.getState () && !this.stopCalc && (this.changedConductors || this.changedCharges)) {
var fm = g.getFontMetrics ();
g.setColor (java.awt.Color.black);
var cs = "Calculating...";
g.fillRect (0, this.winSize.height - 30, 20 + fm.stringWidth (cs), 30);
g.setColor (java.awt.Color.white);
g.drawString (cs, 10, this.winSize.height - 10);
this.cv.repaint (0);
this.calculateNotice = true;
realg.drawImage (this.dbimage, 0, 0, this);
return;
}this.calculateNotice = false;
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
var i;
var j;
var mult = this.brightnessBar.getValue () / 5.0;
var ix = 0;
var k;
var l;
var viewScalar;
var viewVector;
var viewScalarCond;
var viewVectorCond;
viewScalar = viewScalarCond = viewVector = viewVectorCond = -1;
var v = this.viewChooser.getSelectedIndex ();
var showLines = false;
var conductLines = false;
var needA = false;
switch (v) {
case 2:
case 6:
case 9:
case 10:
viewScalar = viewScalarCond = v;
break;
case 4:
case 29:
case 30:
case 27:
case 28:
viewScalar = viewScalarCond = v;
needA = true;
break;
case 0:
case 7:
case 8:
case 5:
viewVector = viewVectorCond = v;
break;
case 3:
viewVector = viewVectorCond = v;
needA = true;
break;
case 14:
viewVector = 0;
viewVectorCond = 5;
break;
case 15:
viewVectorCond = 5;
showLines = true;
break;
case 1:
showLines = conductLines = true;
break;
case 11:
viewScalar = viewScalarCond = 6;
viewVector = viewVectorCond = 5;
break;
case 12:
viewScalar = viewScalarCond = 6;
viewVector = viewVectorCond = 0;
break;
case 13:
viewScalar = viewScalarCond = 6;
showLines = conductLines = true;
break;
case 26:
viewScalar = 4;
viewScalarCond = 6;
viewVectorCond = 5;
showLines = true;
needA = true;
break;
case 18:
viewScalar = viewScalarCond = 2;
viewVector = viewVectorCond = 0;
break;
case 19:
viewScalar = viewScalarCond = 2;
showLines = conductLines = true;
break;
case 22:
viewScalar = viewScalarCond = 2;
viewVector = 0;
viewVectorCond = 5;
break;
case 23:
viewScalar = viewScalarCond = 2;
viewVectorCond = 5;
showLines = true;
break;
case 20:
viewScalar = -1;
viewScalarCond = 2;
viewVector = 0;
break;
case 21:
viewScalar = -1;
viewScalarCond = 2;
showLines = true;
break;
case 16:
viewScalar = viewScalarCond = 6;
viewVector = 0;
viewVectorCond = 5;
break;
case 17:
viewScalar = viewScalarCond = 6;
viewVectorCond = 5;
showLines = true;
break;
case 24:
viewScalar = viewScalarCond = 4;
viewVector = viewVectorCond = 5;
needA = true;
break;
case 25:
viewScalar = 4;
viewScalarCond = 6;
viewVector = 0;
viewVectorCond = 5;
needA = true;
break;
}
this.doCalc (needA);
if (this.stopCalc) {
viewVector = viewVectorCond = viewScalar = -1;
if (viewScalarCond != 2) viewScalarCond = -1;
}for (j = 0; j != this.windowHeight; j++) {
ix = this.winSize.width * (Clazz.doubleToInt (j * this.winSize.height / this.windowHeight));
for (i = 0; i != this.windowWidth; i++) {
var x = Clazz.doubleToInt (i * this.winSize.width / this.windowWidth);
var y = Clazz.doubleToInt (j * this.winSize.height / this.windowHeight);
var x2 = Clazz.doubleToInt ((i + 1) * this.winSize.width / this.windowWidth);
var y2 = Clazz.doubleToInt ((j + 1) * this.winSize.height / this.windowHeight);
var i2 = i + this.windowOffsetX;
var j2 = j + this.windowOffsetY;
var vs = viewScalar;
var vv = viewVector;
var col_r = 0;
var col_g = 0;
var col_b = 0;
var ge = this.grid[i2][j2];
if (ge.conductor || ge.dielec != 1 || ge.charge != 0) {
col_r = col_g = col_b = 64;
if (this.objDragMap != null) {
try {
if (this.objDragMap[i2 - this.dragObjX][j2 - this.dragObjY]) {
col_r = col_g = col_b = 128;
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}if (ge.conductor) {
vv = viewVectorCond;
vs = viewScalarCond;
}}if (vs != -1) {
var dy = 0;
switch (vs) {
case 2:
dy = ge.pot * .2 * mult;
break;
case 6:
dy = .4 * this.getCharge (i2, j2) * mult;
break;
case 27:
dy = this.getEField (ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2]) * mult;
break;
case 28:
dy = this.getEField (ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1]) * mult;
break;
case 29:
dy = this.getDField (ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2], 0) * mult;
break;
case 30:
dy = this.getDField (ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1], 0) * mult;
break;
case 4:
var daydx = this.grid[i2 - 1][j2].ay - this.grid[i2 + 1][j2].ay;
var daxdy = this.grid[i2][j2 + 1].ax - this.grid[i2][j2 - 1].ax;
dy = (daydx + daxdy) * mult;
break;
case 9:
dy = (this.getPCharge (ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2]) + this.getPCharge (ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1])) * .4 * mult;
vs = 6;
break;
}
if (dy < -1) dy = -1;
if (dy > 1) dy = 1;
if (vs == 10) {
var dr = 0;
var dg = 0;
var db = 0;
if (ge.conductor) {
if (ge.floater > 0) dr = db = 1;
 else dg = db = ge.conductivity;
} else if (ge.dielec != 1) {
dr = ge.dielec / 10;
dg = dr * .5;
} else if (ge.charge != 0) {
dy = ge.charge * mult;
if (dy < 0) col_b = col_b + Clazz.doubleToInt (-dy * (255 - col_b));
 else {
col_r = col_r + Clazz.doubleToInt (dy * (255 - col_r));
col_g = col_g + Clazz.doubleToInt (dy * (255 - col_g));
}}col_r = col_r + Clazz.doubleToInt (this.clamp (dr) * (255 - col_r));
col_g = col_g + Clazz.doubleToInt (this.clamp (dg) * (255 - col_g));
col_b = col_b + Clazz.doubleToInt (this.clamp (db) * (255 - col_b));
} else if (vs == 6) {
if (dy < 0) col_b = col_b + Clazz.doubleToInt (-dy * (255 - col_b));
 else {
col_r = col_r + Clazz.doubleToInt (dy * (255 - col_r));
col_g = col_g + Clazz.doubleToInt (dy * (255 - col_g));
}} else {
if (dy < 0) col_r = col_r + Clazz.doubleToInt (-dy * (255 - col_r));
 else col_g = col_g + Clazz.doubleToInt (dy * (255 - col_g));
}}var col = (-16777216) | (col_r << 16) | (col_g << 8) | col_b;
g.setColor ( new java.awt.Color (col));
g.fillRect (x, y, x2 - x, y2 - y);
ge.col = col;
if (vv != -1) {
var dx = 0;
var dy = 0;
switch (vv) {
case 0:
if (!ge.boundary) {
dx = -this.grid[i2 + 1][j2].pot + this.grid[i2 - 1][j2].pot;
dy = -this.grid[i2][j2 + 1].pot + this.grid[i2][j2 - 1].pot;
} else {
dx = this.getEField (ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2]);
dy = this.getEField (ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1]);
}break;
case 7:
dx = this.getDField (ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2], 0);
dy = this.getDField (ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1], 0);
break;
case 8:
dx = this.getDField (ge, this.grid[i2 - 1][j2], this.grid[i2 + 1][j2], 1);
dy = this.getDField (ge, this.grid[i2][j2 - 1], this.grid[i2][j2 + 1], 1);
break;
case 5:
dx = ge.jx;
dy = ge.jy;
break;
case 3:
dx = ge.ax * .3;
dy = ge.ay * .3;
break;
}
var dn = java.lang.Math.sqrt (dx * dx + dy * dy);
if (dn > 0) {
dx /= dn;
dy /= dn;
}dn *= mult;
if (vv == 5) {
if (dn > 1) {
if (dn > 2) dn = 2;
dn -= 1;
col_r = col_g = 255;
col_b = col_b + Clazz.doubleToInt (dn * (255 - col_b));
} else {
col_r = col_r + Clazz.doubleToInt (dn * (255 - col_r));
col_g = col_g + Clazz.doubleToInt (dn * (255 - col_g));
}} else {
if (dn > 1) {
if (dn > 2) dn = 2;
dn -= 1;
col_g = 255;
col_r = col_r + Clazz.doubleToInt (dn * (255 - col_r));
col_b = col_b + Clazz.doubleToInt (dn * (255 - col_b));
} else col_g = col_g + Clazz.doubleToInt (dn * (255 - col_g));
}col = (-16777216) | (col_r << 16) | (col_g << 8) | col_b;
var sw2 = Clazz.doubleToInt ((x2 - x) / 2);
var sh2 = Clazz.doubleToInt ((y2 - y) / 2);
g.setColor ( new java.awt.Color (col));
var x1 = x + sw2 - Clazz.doubleToInt (sw2 * dx);
var y1 = y + sh2 - Clazz.doubleToInt (sh2 * dy);
x2 = x + sw2 + Clazz.doubleToInt (sw2 * dx);
y2 = y + sh2 + Clazz.doubleToInt (sh2 * dy);
g.drawLine (x1, y1, x2, y2);
var as = 3;
g.drawLine (x2, y2, Clazz.doubleToInt (dy * as - dx * as + x2), Clazz.doubleToInt (-dx * as - dy * as + y2));
g.drawLine (x2, y2, Clazz.doubleToInt (-dy * as - dx * as + x2), Clazz.doubleToInt (dx * as - dy * as + y2));
}}
}
if (!this.stopCalc) {
if (showLines) this.renderLines (g, conductLines);
if (this.equipCheck.getState ()) this.renderEquips (g);
}this.chargeRadius = Clazz.doubleToInt (this.winSize.width * 5 / (this.windowWidth * 4));
for (i = 0; i < this.chargeCount; i++) {
var src = this.charges[i];
var xx = src.getScreenX ();
var yy = src.getScreenY ();
var rad = this.chargeRadius;
var dy = src.v * mult * .4;
if (dy < 0) {
var b = Clazz.doubleToInt (-dy * (191)) + 64;
if (b > 255) b = 255;
g.setColor ( new java.awt.Color (64, 64, b));
} else {
var r = Clazz.doubleToInt (dy * (191)) + 64;
if (r > 255) r = 255;
g.setColor ( new java.awt.Color (r, r, 64));
}g.fillOval (xx - rad, yy - rad, rad * 2, rad * 2);
if (i == this.selectedCharge) {
g.setColor (java.awt.Color.white);
g.drawOval (xx - rad, yy - rad, rad * 2, rad * 2);
}g.setColor (java.awt.Color.black);
g.drawLine (xx - Clazz.doubleToInt (rad / 2), yy, xx + Clazz.doubleToInt (rad / 2), yy);
if (src.v > 0) g.drawLine (xx, yy - Clazz.doubleToInt (rad / 2), xx, yy + Clazz.doubleToInt (rad / 2));
}
if (this.adjustSelectX1 != -1) {
g.setColor (java.awt.Color.cyan);
var lx1 = (Clazz.doubleToInt (this.adjustSelectX1 * this.winSize.width / this.windowWidth));
var ly1 = (Clazz.doubleToInt (this.adjustSelectY1 * this.winSize.height / this.windowHeight));
var lx2 = (Clazz.doubleToInt ((this.adjustSelectX2 + 1) * this.winSize.width / this.windowWidth));
var ly2 = (Clazz.doubleToInt ((this.adjustSelectY2 + 1) * this.winSize.height / this.windowHeight));
g.drawRect (lx1, ly1, lx2 - lx1 - 1, ly2 - ly1 - 1);
}if (this.objDragMap != null) {
var nf = java.text.NumberFormat.getInstance ();
nf.setMaximumFractionDigits (3);
var fm = g.getFontMetrics ();
g.setColor (java.awt.Color.black);
var cs = "Q = " + nf.format (this.getSelObjCharge ());
g.fillRect (0, this.winSize.height - 30, 20 + fm.stringWidth (cs), 30);
g.setColor (java.awt.Color.white);
g.drawString (cs, 10, this.winSize.height - 10);
}realg.drawImage (this.dbimage, 0, 0, this);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "clamp", 
function (x) {
return (x < 0) ? 0 : (x > 1) ? 1 : x;
}, "~N");
Clazz.defineMethod (c$, "doCalc", 
function (needA) {
if (this.stoppedCheck.getState () || this.stopCalc) {
if (this.changedConductors || this.changedCharges) {
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
ge.jx = ge.jy = ge.ax = ge.ay = 0;
if (!ge.conductor) ge.pot = 0;
}

}return;
}var hasPath = false;
if (this.changedConductors) {
this.calcExceptions ();
hasPath = this.findCurrentPath ();
}var sg =  Clazz.newArray (this.gridSizeX, this.gridSizeY, null);
var i;
var j;
if (hasPath) {
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j] = Clazz.innerTypeInstance (test.falstad.EMStaticFrame.SolverElement, this, null);
se.charge = 0;
se.boundary = true;
if (ge.currentPath) {
se.pot = (j == 0) ? 1 : (j == this.gridSizeY - 1) ? -1 : 0;
se.conductor = (j == 0 || j == this.gridSizeY - 1);
se.ignore = false;
se.dielec = ge.conductivity;
} else {
se.ignore = true;
se.dielec = 0;
se.pot = 0;
}}

this.solveCurrent = true;
this.doSolve (sg, 0, this.gridSizeX);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
if (ge.currentPath && i > 0 && i < this.gridSizeX - 1 && j > 0 && j < this.gridSizeY - 1) {
ge.pot = se.pot;
var d1 = (this.grid[i - 1][j].currentPath) ? sg[i - 1][j].pot : ge.pot;
var d2 = (this.grid[i + 1][j].currentPath) ? sg[i + 1][j].pot : ge.pot;
var d3 = (this.grid[i][j - 1].currentPath) ? sg[i][j - 1].pot : ge.pot;
var d4 = (this.grid[i][j + 1].currentPath) ? sg[i][j + 1].pot : ge.pot;
ge.jx = (d1 - ge.pot) * (this.grid[i - 1][j].conductivity) + (ge.pot - d2) * ge.conductivity;
ge.jy = (d3 - ge.pot) * (this.grid[i][j - 1].conductivity) + (ge.pot - d4) * ge.conductivity;
} else {
ge.jx = ge.jy = 0;
if (ge.conductor) ge.pot = 0;
}}

this.changedMagField = this.changedConductors = true;
} else if (this.changedConductors) {
this.changedMagField = false;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
ge.ax = ge.ay = ge.jx = ge.jy = 0;
}

}if (this.changedConductors || this.changedCharges) {
var floater = false;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j] = Clazz.innerTypeInstance (test.falstad.EMStaticFrame.SolverElement, this, null);
se.dielec = ge.dielec;
if (ge.conductor) {
ge.charge = 0;
if (ge.floater > 0) {
ge.pot = 0;
floater = true;
}if (i < this.gridSizeX - 1 && !this.grid[i + 1][j].conductor) se.dielec = this.grid[i + 1][j].dielec;
 else if (j < this.gridSizeY - 1 && !this.grid[i][j + 1].conductor) se.dielec = this.grid[i][j + 1].dielec;
}se.charge = ge.charge;
se.ignore = false;
se.pot = ge.pot;
se.conductor = ge.conductor;
se.boundary = ge.boundary;
}

this.solveCurrent = false;
this.doSolve (sg, 0, this.gridSizeX);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
ge.pot = se.pot;
}

if (floater) this.doFloater (sg);
 else this.floatCharge = 0;
}if (this.changedMagField && needA) {
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j] = Clazz.innerTypeInstance (test.falstad.EMStaticFrame.SolverElement, this, null);
se.charge = ge.jx * .01;
se.dielec = 1;
}

this.doSolve (sg, 0, this.gridSizeX);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
ge.ax = se.pot;
se.charge = ge.jy * .01;
se.pot = 0;
}

this.doSolve (sg, 0, this.gridSizeX);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
ge.ay = se.pot;
}

this.changedMagField = false;
}this.changedConductors = this.changedCharges = false;
}, "~B");
Clazz.defineMethod (c$, "checkAdjConductor", 
function (x, y, adj) {
if (adj.x == -2) return;
if (this.grid[x][y].conductor && this.grid[x][y].floater == 0) {
if (adj.x >= 0 && this.grid[x][y].pot != this.grid[adj.x][adj.y].pot) {
adj.x = -2;
} else {
adj.x = x;
adj.y = y;
}}}, "~N,~N,java.awt.Point");
Clazz.defineMethod (c$, "doFloater", 
function (sg) {
var i;
var j;
this.floatExtCharge = 0;
var fp1 = 0;
var adj =  new java.awt.Point (-1, 0);
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
if (ge.floater > 0) {
fp1 = ge.pot;
this.floatExtCharge += this.getCharge (i, j);
this.checkAdjConductor (i + 1, j, adj);
this.checkAdjConductor (i - 1, j, adj);
this.checkAdjConductor (i, j + 1, adj);
this.checkAdjConductor (i, j - 1, adj);
}}

var adjPot = 0;
var isAdj = false;
if (adj.x == -2) System.out.print ("two floating potentials!\n");
 else if (adj.x != -1) {
isAdj = true;
adjPot = this.grid[adj.x][adj.y].pot;
}if (this.changedConductors) {
var fp = 0;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
se.pot = (ge.conductor && ge.floater > 0) ? 1 : 0;
se.charge = 0;
}

this.solveCurrent = false;
this.doSolve (sg, 0, this.gridSizeX);
this.floatCap = 0;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
var se = sg[i][j];
var pot = ge.floatPot = se.pot;
if (ge.floater > 0) {
fp = pot;
if (!this.grid[i + 1][j].conductor) this.floatCap -= sg[i + 1][j].pot - pot;
if (!this.grid[i - 1][j].conductor) this.floatCap -= sg[i - 1][j].pot - pot;
if (!this.grid[i][j + 1].conductor) this.floatCap -= sg[i][j + 1].pot - pot;
if (!this.grid[i][j - 1].conductor) this.floatCap -= sg[i][j - 1].pot - pot;
}}

}var mult = 0;
if (isAdj) mult = adjPot;
 else mult = (this.floatCharge - this.floatExtCharge) / this.floatCap;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
ge.pot += ge.floatPot * mult;
}

if (isAdj) {
var charge2 = 0;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) {
var ge = this.grid[i][j];
if (ge.floater > 0) charge2 += this.getCharge (i, j);
}

this.floatCharge = charge2;
}}, "~A");
Clazz.defineMethod (c$, "doSolve", 
function (g1, step, size) {
var i;
var j;
var size1 = size - 1;
if (size > 3) {
var size2 = Clazz.doubleToInt (size / 2) + 1;
var g2 = this.solverGrids[step].grid;
if (g2 == null) g2 = this.solverGrids[step].grid =  Clazz.newArray (size2, size2, null);
for (i = 0; i != size2; i++) for (j = 0; j != size2; j++) {
var i2 = i * 2;
var j2 = j * 2;
if (i2 >= size) i2 = size1;
if (j2 >= size) j2 = size1;
if (g2[i][j] == null) g2[i][j] = Clazz.innerTypeInstance (test.falstad.EMStaticFrame.SolverElement, this, null);
var c = g1[i2][j2].charge;
var d = g1[i2][j2].dielec;
var b = g1[i2][j2].boundary;
var ig = (g1[i2][j2].ignore) ? 1 : 0;
var sq = 1;
if (i2 < size1) {
c += g1[i2 + 1][j2].charge;
d += g1[i2 + 1][j2].dielec;
b = new Boolean (b | g1[i2 + 1][j2].boundary).valueOf ();
ig += (g1[i2 + 1][j2].ignore) ? 1 : 0;
sq++;
if (j2 < size1) {
c += g1[i2 + 1][j2 + 1].charge;
d += g1[i2 + 1][j2 + 1].dielec;
b = new Boolean (b | g1[i2 + 1][j2 + 1].boundary).valueOf ();
ig += (g1[i2 + 1][j2 + 1].ignore) ? 1 : 0;
sq++;
}}if (j2 < size1) {
c += g1[i2][j2 + 1].charge;
d += g1[i2][j2 + 1].dielec;
b = new Boolean (b | g1[i2][j2 + 1].boundary).valueOf ();
ig += (g1[i2][j2 + 1].ignore) ? 1 : 0;
sq++;
}g2[i][j].charge = c;
g2[i][j].dielec = d / sq;
g2[i][j].boundary = b;
g2[i][j].ignore = (ig == sq) ? true : false;
if (this.solveCurrent) g2[i][j].dielec = (ig == sq) ? 0 : d / (4 - ig);
var cc = 0;
var cpot = 0;
if (g1[i2][j2].conductor) {
cc++;
cpot += g1[i2][j2].pot;
}if (i2 < size1 && g1[i2 + 1][j2].conductor) {
cc++;
cpot += g1[i2 + 1][j2].pot;
}if (j2 < size1 && g1[i2][j2 + 1].conductor) {
cc++;
cpot += g1[i2][j2 + 1].pot;
}if (i2 < size1 && j2 < size1 && g1[i2 + 1][j2 + 1].conductor) {
cc++;
cpot += g1[i2 + 1][j2 + 1].pot;
}if (cc > 0 && g2[i][j].charge == 0) {
g2[i][j].conductor = true;
g2[i][j].pot = cpot / cc;
} else {
g2[i][j].conductor = false;
g2[i][j].pot = 0;
}}

this.doSolve (g2, step + 1, size2);
for (i = 1; i != size1; i++) for (j = 1; j != size1; j++) {
if (!g1[i][j].conductor) g1[i][j].pot = g2[Clazz.doubleToInt (i / 2)][Clazz.doubleToInt (j / 2)].pot;
}

}var iters = 0;
var tol = 0;
var maxiter = 200;
switch (this.accuracyChooser.getSelectedIndex ()) {
case 0:
tol = 1.5000000000000001E-4;
break;
case 1:
tol = 7.500000000000001E-5;
break;
case 2:
tol = 15e-6;
maxiter = 400;
break;
case 3:
tol = 1e-7;
if (step == 0) maxiter = 20000;
 else maxiter = 1000;
break;
}
var err = 0;
if (step > 1) {
if (maxiter < 400) maxiter = 400;
tol /= 5;
}if (step == 0 && maxiter < 1000) tol /= 2;
while (true) {
err = 0;
for (i = 1; i != size1; i++) for (j = 1; j != size1; j++) {
var ge = g1[i][j];
if (ge.conductor || ge.ignore) continue;
var previ;
var nexti;
var prevj;
var nextj;
var np;
if (ge.boundary) {
previ = g1[i - 1][j].pot * g1[i - 1][j].dielec;
nexti = g1[i + 1][j].pot * g1[i][j].dielec;
prevj = g1[i][j - 1].pot * g1[i][j - 1].dielec;
nextj = g1[i][j + 1].pot * g1[i][j].dielec;
var div = (g1[i - 1][j].dielec + g1[i][j].dielec + g1[i][j - 1].dielec + g1[i][j].dielec);
if (this.solveCurrent) {
if (g1[i - 1][j].ignore) {
previ = 0;
div -= g1[i - 1][j].dielec;
}if (g1[i + 1][j].ignore) {
nexti = 0;
div -= g1[i][j].dielec;
}if (g1[i][j - 1].ignore) {
prevj = 0;
div -= g1[i][j - 1].dielec;
}if (g1[i][j + 1].ignore) {
nextj = 0;
div -= g1[i][j].dielec;
}}np = (nexti + previ + nextj + prevj) / div + ge.charge / ge.dielec;
} else {
previ = g1[i - 1][j].pot;
nexti = g1[i + 1][j].pot;
prevj = g1[i][j - 1].pot;
nextj = g1[i][j + 1].pot;
np = (nexti + previ + nextj + prevj) * .25 + ge.charge / ge.dielec;
}err += (np > ge.pot) ? np - ge.pot : ge.pot - np;
ge.pot = np;
}

iters++;
if (err / (size * size) < tol || iters == maxiter) break;
}
}, "~A,~N,~N");
Clazz.defineMethod (c$, "findCurrentPath", 
function () {
if (!this.currentCheck.getState ()) return false;
var i;
var j;
for (j = 0; j != this.gridSizeY; j++) {
for (i = 0; i != this.gridSizeX; i++) {
var ge = this.grid[i][j];
ge.currentPath = false;
}
}
var returnVal = this.currentPathSearch (0, 1);
returnVal = new Boolean (returnVal | this.currentPathSearch (this.gridSizeY - 1, -1)).valueOf ();
return returnVal;
});
Clazz.defineMethod (c$, "currentPathSearch", 
function (y, pot) {
var i;
var stack = null;
for (i = 0; i != this.gridSizeX; i++) if (this.grid[i][y].conductor) {
if (stack == null) stack =  new java.util.Vector ();
stack.addElement ( new java.awt.Point (i, y));
}
if (stack == null) return false;
var returnVal = false;
while (stack.size () > 0) {
var x = stack.elementAt (stack.size () - 1);
stack.removeElementAt (stack.size () - 1);
var ge = this.grid[x.x][x.y];
if (!ge.conductor || ge.currentPath) continue;
ge.currentPath = true;
ge.pot = pot;
if (x.x > 0) stack.addElement ( new java.awt.Point (x.x - 1, x.y));
if (x.y > 0) stack.addElement ( new java.awt.Point (x.x, x.y - 1));
 else if (y != 0) returnVal = true;
if (x.x < this.gridSizeX - 1) stack.addElement ( new java.awt.Point (x.x + 1, x.y));
if (x.y < this.gridSizeY - 1) stack.addElement ( new java.awt.Point (x.x, x.y + 1));
 else if (y == 0) returnVal = true;
}
return returnVal;
}, "~N,~N");
Clazz.defineMethod (c$, "getCharge", 
function (x, y) {
var ge = this.grid[x][y];
var scale = 3.72;
if (!ge.conductor) return ge.charge * 3.72;
var c = ge.charge * 3.72;
c -= (this.grid[x + 1][y].pot - ge.pot) * (this.grid[x + 1][y].dielec);
c -= (this.grid[x - 1][y].pot - ge.pot) * (this.grid[x - 1][y].dielec);
c -= (this.grid[x][y + 1].pot - ge.pot) * (this.grid[x][y + 1].dielec);
c -= (this.grid[x][y - 1].pot - ge.pot) * (this.grid[x][y - 1].dielec);
return c;
}, "~N,~N");
Clazz.defineMethod (c$, "getEField", 
function (ge, gp, gn) {
if (ge.conductor && !gn.conductor && !gp.conductor) return -gn.pot + gp.pot;
if (ge.dielec != gp.dielec || ge.conductor != gp.conductor) return 2 * (ge.pot - gn.pot);
if (ge.conductor != gn.conductor) return 2 * (gp.pot - ge.pot);
return -gn.pot + gp.pot;
}, "test.falstad.EMStaticFrame.GridElement,test.falstad.EMStaticFrame.GridElement,test.falstad.EMStaticFrame.GridElement");
Clazz.defineMethod (c$, "getDField", 
function (ge, gp, gn, p) {
if (ge.conductor && !gn.conductor && !gp.conductor) return (ge.pot - gn.pot) * (ge.dielec - p) + (gp.pot - ge.pot) * (gp.dielec - p);
if (ge.dielec != gp.dielec || ge.conductor != gp.conductor) return 2 * (ge.pot - gn.pot) * (ge.dielec - p);
if (ge.conductor != gn.conductor) return 2 * (gp.pot - ge.pot) * (gp.dielec - p);
return (ge.pot - gn.pot) * (ge.dielec - p) + (gp.pot - ge.pot) * (gp.dielec - p);
}, "test.falstad.EMStaticFrame.GridElement,test.falstad.EMStaticFrame.GridElement,test.falstad.EMStaticFrame.GridElement,~N");
Clazz.defineMethod (c$, "getPCharge", 
function (ge, gp, gn) {
if (ge.dielec == gp.dielec) return 0;
return (ge.dielec - 1) * (gn.pot - ge.pot) - (gp.dielec - 1) * (ge.pot - gp.pot);
}, "test.falstad.EMStaticFrame.GridElement,test.falstad.EMStaticFrame.GridElement,test.falstad.EMStaticFrame.GridElement");
Clazz.defineMethod (c$, "abs", 
function (x) {
return x < 0 ? -x : x;
}, "~N");
Clazz.defineMethod (c$, "sign", 
function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
}, "~N");
Clazz.defineMethod (c$, "renderLines", 
function (g, inConduct) {
var x = 0;
var y = 0;
g.setColor (java.awt.Color.white);
var lspacing = 1.5;
var cgridw = Clazz.doubleToInt (this.windowWidth * 1.5);
var cgridh = Clazz.doubleToInt (this.windowHeight * 1.5);
if (this.linegrid == null) this.linegrid =  Clazz.newByteArray (cgridw + 1, cgridh + 1, 0);
var startx = -1;
var starty = 0;
var linemax = 0;
var mult = this.brightnessBar.getValue () / 5.0;
var doArrow = false;
var dir = 1;
var olddn = -1;
var oldcol = -1;
var gridsearchx = 0;
var gridsearchy = 0;
var i;
var j;
for (i = 0; i != cgridw; i++) for (j = 0; j != cgridh; j++) this.linegrid[i][j] = 0;


while (true) {
if (linemax-- == 0 || x == 0) {
if (dir == 1) {
while (true) {
if (this.linegrid[gridsearchx][gridsearchy] == 0) break;
if (++gridsearchx == cgridw) {
if (++gridsearchy == cgridh) break;
gridsearchx = 0;
}}
if (gridsearchx == cgridw && gridsearchy == cgridh) break;
startx = gridsearchx / 1.5;
starty = gridsearchy / 1.5;
}x = startx + 0.3333333333333333;
y = starty + 0.3333333333333333;
linemax = 40;
doArrow = (dir == -1);
dir = -dir;
}if (x < 0 || y < 0 || x >= this.windowWidth || y >= this.windowHeight) {
x = 0;
continue;
}var cgx = Clazz.doubleToInt (x * 1.5);
var cgy = Clazz.doubleToInt (y * 1.5);
if (++this.linegrid[cgx][cgy] > 2) {
x = 0;
continue;
}if (this.linegrid[cgx][cgy] == 1) doArrow = true;
var xi = this.windowOffsetX + Clazz.doubleToInt (x);
var yi = this.windowOffsetY + Clazz.doubleToInt (y);
var ge = this.grid[xi][yi];
if (!inConduct && ge.conductor) {
x = 0;
continue;
}var dx;
var dy;
if (!ge.boundary) {
dx = -this.grid[xi + 1][yi].pot + this.grid[xi - 1][yi].pot;
dy = -this.grid[xi][yi + 1].pot + this.grid[xi][yi - 1].pot;
} else {
dx = this.getEField (ge, this.grid[xi - 1][yi], this.grid[xi + 1][yi]);
dy = this.getEField (ge, this.grid[xi][yi - 1], this.grid[xi][yi + 1]);
}var dn = java.lang.Math.sqrt (dx * dx + dy * dy);
if (dn == 0) {
x = 0;
continue;
}dx /= dn;
dy /= dn;
var oldx = x;
var oldy = y;
x += .5 * dx * dir;
y += .5 * dy * dir;
dn *= mult;
var col = this.grid[xi][yi].col;
if (dn != olddn || col != oldcol) {
var col_r = (col >> 16) & 255;
var col_g = (col >> 8) & 255;
var col_b = col & 255;
if (dn > 1) {
if (dn > 2) dn = 2;
dn -= 1;
col_g = 255;
col_r = col_r + Clazz.doubleToInt (dn * (255 - col_r));
col_b = col_b + Clazz.doubleToInt (dn * (255 - col_b));
} else col_g = col_g + Clazz.doubleToInt (dn * (255 - col_g));
col = (-16777216) | (col_r << 16) | (col_g << 8) | col_b;
g.setColor ( new java.awt.Color (col));
olddn = dn;
oldcol = col;
}var lx1 = Clazz.doubleToInt (oldx * this.winSize.width / this.windowWidth);
var ly1 = Clazz.doubleToInt (oldy * this.winSize.height / this.windowHeight);
var lx2 = Clazz.doubleToInt (x * this.winSize.width / this.windowWidth);
var ly2 = Clazz.doubleToInt (y * this.winSize.height / this.windowHeight);
g.drawLine (lx1, ly1, lx2, ly2);
if (doArrow) {
doArrow = false;
if ((cgx & 3) == 0 && (cgy & 3) == 0) {
var as = 5;
g.drawLine (lx2, ly2, Clazz.doubleToInt (dy * as - dx * as + lx2), Clazz.doubleToInt (-dx * as - dy * as + ly2));
g.drawLine (lx2, ly2, Clazz.doubleToInt (-dy * as - dx * as + lx2), Clazz.doubleToInt (dx * as - dy * as + ly2));
}}}
}, "java.awt.Graphics,~B");
Clazz.defineMethod (c$, "renderEquips", 
function (g) {
var x;
var y;
g.setColor (java.awt.Color.lightGray);
for (x = 0; x != this.windowWidth; x++) for (y = 0; y != this.windowHeight; y++) {
this.tryEdge (g, x, y, x + 1, y, x, y + 1, x + 1, y + 1);
this.tryEdge (g, x, y, x + 1, y, x, y, x, y + 1);
this.tryEdge (g, x, y, x + 1, y, x + 1, y, x + 1, y + 1);
this.tryEdge (g, x, y, x, y + 1, x + 1, y, x + 1, y + 1);
this.tryEdge (g, x, y, x, y + 1, x, y + 1, x + 1, y + 1);
this.tryEdge (g, x + 1, y, x + 1, y + 1, x, y + 1, x + 1, y + 1);
}

}, "java.awt.Graphics");
Clazz.defineMethod (c$, "interpPoint", 
function (ep1, ep2, x1, y1, x2, y2, pval, pos) {
var interp2 = (pval - ep1.pot) / (ep2.pot - ep1.pot);
var interp1 = 1 - interp2;
pos.x = Clazz.doubleToInt ((x1 + .5) * this.winSize.width * interp1 / this.windowWidth + (x2 + .5) * this.winSize.width * interp2 / this.windowWidth);
pos.y = Clazz.doubleToInt ((y1 + .5) * this.winSize.height * interp1 / this.windowHeight + (y2 + .5) * this.winSize.height * interp2 / this.windowHeight);
}, "test.falstad.EMStaticFrame.GridElement,test.falstad.EMStaticFrame.GridElement,~N,~N,~N,~N,~N,java.awt.Point");
Clazz.defineMethod (c$, "spanning", 
function (ep1, ep2, pval) {
if (ep1.pot == ep2.pot) return false;
return !((ep1.pot < pval && ep2.pot < pval) || (ep1.pot > pval && ep2.pot > pval));
}, "test.falstad.EMStaticFrame.GridElement,test.falstad.EMStaticFrame.GridElement,~N");
Clazz.defineMethod (c$, "tryEdge", 
function (g, x1, y1, x2, y2, x3, y3, x4, y4) {
var i;
var emult = this.equipBar.getValue () * .1;
var mult = 1 / (this.brightnessBar.getValue () * emult * .1);
var ep1 = this.grid[x1 + this.windowOffsetX][y1 + this.windowOffsetY];
var ep2 = this.grid[x2 + this.windowOffsetX][y2 + this.windowOffsetY];
var ep3 = this.grid[x3 + this.windowOffsetX][y3 + this.windowOffsetY];
var ep4 = this.grid[x4 + this.windowOffsetX][y4 + this.windowOffsetY];
var pmin = this.min (this.min (ep1.pot, ep2.pot), this.min (ep3.pot, ep4.pot));
var pmax = this.max (this.max (ep1.pot, ep2.pot), this.max (ep3.pot, ep4.pot));
var imin = Clazz.doubleToInt (pmin / mult);
var imax = Clazz.doubleToInt (pmax / mult);
for (i = imin; i <= imax; i++) {
var pval = i * mult;
if (!(this.spanning (ep1, ep2, pval) && this.spanning (ep3, ep4, pval))) continue;
var pa =  new java.awt.Point ();
var pb =  new java.awt.Point ();
this.interpPoint (ep1, ep2, x1, y1, x2, y2, pval, pa);
this.interpPoint (ep3, ep4, x3, y3, x4, y4, pval, pb);
g.drawLine (pa.x, pa.y, pb.x, pb.y);
}
}, "java.awt.Graphics,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "dragCharge", 
function (x, y) {
var s = this.charges[this.selectedCharge];
if (!(x >= 0 && y >= 0 && x < this.windowWidth && y < this.windowHeight)) return;
x += this.windowOffsetX;
y += this.windowOffsetY;
if (x == s.x && y == s.y) return;
if (!this.legalChargePos (x, y, this.selectedCharge)) return;
var ox = s.x;
var oy = s.y;
this.grid[ox][oy].charge = 0;
s.x = x;
s.y = y;
var ge = this.grid[s.x][s.y];
ge.charge = s.v;
this.changedCharges = true;
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "emptySquare", 
function (x, y) {
if (this.grid[x][y].conductor) return false;
if (this.grid[x][y].charge != 0) return false;
return true;
}, "~N,~N");
Clazz.defineMethod (c$, "getSelObjCharge", 
function () {
var x;
var y;
var c = 0;
for (x = 0; x != this.gridSizeX; x++) for (y = 0; y != this.gridSizeY; y++) {
if (this.objDragMap[x][y]) c += this.getCharge (x + this.dragObjX, y + this.dragObjY);
}

return c;
});
Clazz.defineMethod (c$, "min", 
function (a, b) {
return (a < b) ? a : b;
}, "~N,~N");
Clazz.defineMethod (c$, "max", 
function (a, b) {
return (a > b) ? a : b;
}, "~N,~N");
Clazz.defineMethod (c$, "min", 
function (a, b) {
return (a < b) ? a : b;
}, "~N,~N");
Clazz.defineMethod (c$, "max", 
function (a, b) {
return (a > b) ? a : b;
}, "~N,~N");
Clazz.defineMethod (c$, "edit", 
function (e) {
var x = e.getX ();
var y = e.getY ();
if (this.selectedCharge != -1) {
x = Clazz.doubleToInt (x * this.windowWidth / this.winSize.width);
y = Clazz.doubleToInt (y * this.windowHeight / this.winSize.height);
this.dragCharge (x, y);
return;
}switch (this.modeChooser.getSelectedIndex ()) {
case 2:
case 3:
case 0:
case 11:
return;
}
if (this.modeChooser.getSelectedIndex () >= 12) {
var xp = Clazz.doubleToInt (x * this.windowWidth / this.winSize.width);
var yp = Clazz.doubleToInt (y * this.windowHeight / this.winSize.height);
if (this.adjustSelectX1 == -1) {
this.adjustSelectX1 = this.adjustSelectX2 = xp;
this.adjustSelectY1 = this.adjustSelectY2 = yp;
this.adjustBar.enable ();
return;
}this.adjustSelectX1 = this.max (0, this.min (xp, this.adjustSelectX1));
this.adjustSelectX2 = this.min (this.windowWidth - 1, this.max (xp, this.adjustSelectX2));
this.adjustSelectY1 = this.max (0, this.min (yp, this.adjustSelectY1));
this.adjustSelectY2 = this.min (this.windowHeight - 1, this.max (yp, this.adjustSelectY2));
this.adjustBar.enable ();
this.cv.repaint (this.pause);
return;
}if (this.dragX == x && this.dragY == y) this.editFuncPoint (x, y);
 else {
if (this.abs (y - this.dragY) > this.abs (x - this.dragX)) {
var x1 = (y < this.dragY) ? x : this.dragX;
var y1 = (y < this.dragY) ? y : this.dragY;
var x2 = (y > this.dragY) ? x : this.dragX;
var y2 = (y > this.dragY) ? y : this.dragY;
this.dragX = x;
this.dragY = y;
for (y = y1; y <= y2; y++) {
x = x1 + Clazz.doubleToInt ((x2 - x1) * (y - y1) / (y2 - y1));
this.editFuncPoint (x, y);
}
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
}}}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "clearFloaters", 
function () {
var i;
var j;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) this.grid[i][j].floater = 0;


this.changedConductors = true;
});
Clazz.defineMethod (c$, "editFuncPoint", 
function (x, y) {
var xp = Clazz.doubleToInt (x * this.windowWidth / this.winSize.width) + this.windowOffsetX;
var yp = Clazz.doubleToInt (y * this.windowHeight / this.winSize.height) + this.windowOffsetY;
var ge = this.grid[xp][yp];
if (!this.dragSet && !this.dragClear) {
this.dragClear = (ge.conductor || ge.charge != 0 || ge.dielec != 1);
this.dragSet = !this.dragClear;
}if (ge.conductor && ge.floater > 0) this.clearFloaters ();
ge.conductor = false;
ge.jx = ge.jy = ge.charge = 0;
ge.dielec = 1;
this.stopCalc = true;
switch (this.modeChooser.getSelectedIndex ()) {
case 4:
this.dragClear = true;
this.dragSet = false;
break;
case 5:
if (this.dragSet) this.addConductor (xp, yp, 0);
break;
case 6:
if (this.dragSet) this.addConductor (xp, yp, 1);
break;
case 7:
if (this.dragSet) this.addConductor (xp, yp, -1);
break;
case 10:
if (this.dragSet) ge.dielec = 2;
break;
case 8:
if (this.dragSet) ge.charge = 0.5;
break;
case 9:
if (this.dragSet) ge.charge = -0.5;
break;
}
this.changedCharges = this.changedConductors = true;
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "addCharge", 
function (x, y, amt) {
if (this.chargeCount == 20) return;
if (!this.legalChargePos (x, y, -1)) return;
this.charges[this.chargeCount++] = Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Charge, this, null, x, y, amt);
this.grid[x][y].charge = amt;
this.changedCharges = true;
this.cv.repaint (this.pause);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "deleteCharge", 
function (num) {
var c = this.charges[num];
this.grid[c.x][c.y].charge = 0;
for (; num < this.chargeCount; num++) this.charges[num] = this.charges[num + 1];

this.chargeCount--;
this.changedCharges = true;
this.selectedCharge = -1;
this.cv.repaint (this.pause);
}, "~N");
Clazz.defineMethod (c$, "legalChargePos", 
function (x, y, orig) {
var s = (orig == -1) ? null : this.charges[orig];
var i;
var j;
for (i = -1; i <= 1; i++) for (j = -1; j <= 1; j++) {
if (s != null && s.x == x + i && s.y == y + j) continue;
if (!this.emptySquare (x + i, y + j)) return false;
}

for (i = 0; i != this.chargeCount; i++) {
if (i == orig) continue;
var s2 = this.charges[i];
if (this.abs (s2.x - x) <= 2 && this.abs (s2.y - y) <= 2) return false;
}
return true;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "selectCharge", 
function (me) {
var x = me.getX ();
var y = me.getY ();
var i;
var sc = this.selectedCharge;
this.selectedCharge = -1;
for (i = 0; i != this.chargeCount; i++) {
var src = this.charges[i];
var sx = src.getScreenX ();
var sy = src.getScreenY ();
var r2 = (sx - x) * (sx - x) + (sy - y) * (sy - y);
if (this.chargeRadius * this.chargeRadius > r2) {
this.selectedCharge = i;
break;
}}
if (sc != this.selectedCharge) this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "matchElement", 
function (ge1, ge2) {
if (ge1.conductor && ge2.conductor && (ge1.pot == ge2.pot || this.currentCheck.getState ()) && ge1.floater == ge2.floater && ge1.conductivity == ge2.conductivity) return true;
if (ge1.charge != 0 && ge1.charge == ge2.charge) return true;
if (ge1.dielec != 1 && ge1.dielec == ge2.dielec) return true;
return false;
}, "test.falstad.EMStaticFrame.GridElement,test.falstad.EMStaticFrame.GridElement");
Clazz.defineMethod (c$, "selectObject", 
function (xo, yo) {
this.dragObjX = this.dragObjY = 0;
var xp = Clazz.doubleToInt (xo * this.windowWidth / this.winSize.width) + this.windowOffsetX;
var yp = Clazz.doubleToInt (yo * this.windowHeight / this.winSize.height) + this.windowOffsetY;
var oldSel1 = this.objDragMap != null;
var oldSel2 = oldSel1 && this.objDragMap[xp][yp];
var ge1 = this.grid[xp][yp];
if (!(ge1.conductor || ge1.dielec != 1 || ge1.charge != 0)) {
this.objDragMap = null;
if (oldSel1) this.cv.repaint (this.pause);
return;
}if (this.objDragMap != null && this.objDragMap[xp][yp]) return;
this.objDragMap =  Clazz.newBooleanArray (this.gridSizeX, this.gridSizeY, false);
var stack =  new java.util.Vector ();
stack.addElement ( new java.awt.Point (xp, yp));
while (stack.size () > 0) {
var x = stack.elementAt (stack.size () - 1);
stack.removeElementAt (stack.size () - 1);
if (this.objDragMap[x.x][x.y]) continue;
var ge = this.grid[x.x][x.y];
if (!this.matchElement (ge, ge1)) continue;
if (x.x == this.windowOffsetX || x.x == this.windowOffsetX + this.windowWidth - 1 || x.y == this.windowOffsetY || x.y == this.windowOffsetY + this.windowHeight - 1) {
this.objDragMap = null;
if (oldSel1) this.cv.repaint (this.pause);
return;
}this.objDragMap[x.x][x.y] = true;
stack.addElement ( new java.awt.Point (x.x - 1, x.y));
stack.addElement ( new java.awt.Point (x.x, x.y - 1));
stack.addElement ( new java.awt.Point (x.x + 1, x.y));
stack.addElement ( new java.awt.Point (x.x, x.y + 1));
}
this.dragBoundX1 = 1000;
this.dragBoundY1 = 1000;
this.dragBoundX2 = 0;
this.dragBoundY2 = 0;
var xi;
var yi;
for (xi = 0; xi != this.gridSizeX; xi++) for (yi = 0; yi != this.gridSizeY; yi++) {
if (!this.objDragMap[xi][yi]) continue;
if (xi < this.dragBoundX1) this.dragBoundX1 = xi;
if (yi < this.dragBoundY1) this.dragBoundY1 = yi;
if (xi > this.dragBoundX2) this.dragBoundX2 = xi;
if (yi > this.dragBoundY2) this.dragBoundY2 = yi;
}

if (!oldSel2) this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "dragObject", 
function (xe, ye) {
var xp2 = Clazz.doubleToInt (xe * this.windowWidth / this.winSize.width) + this.windowOffsetX;
var yp2 = Clazz.doubleToInt (ye * this.windowHeight / this.winSize.height) + this.windowOffsetY;
var xp1 = Clazz.doubleToInt (this.dragX * this.windowWidth / this.winSize.width) + this.windowOffsetX;
var yp1 = Clazz.doubleToInt (this.dragY * this.windowHeight / this.winSize.height) + this.windowOffsetY;
var dx = xp2 - xp1;
var dy = yp2 - yp1;
if (dx == this.dragObjX && dy == this.dragObjY) return;
var xi;
var yi;
if (!this.tryDrag (dx, dy)) {
for (; ; ) {
if (dx != this.dragObjX) {
dx = (dx > this.dragObjX) ? dx - 1 : dx + 1;
if (this.tryDrag (dx, dy)) break;
}if (dy != this.dragObjY) {
dy = (dy > this.dragObjY) ? dy - 1 : dy + 1;
if (this.tryDrag (dx, dy)) break;
}if (dx == this.dragObjX && dy == this.dragObjY) return;
}
}var template = null;
for (xi = this.dragBoundX1; xi <= this.dragBoundX2; xi++) for (yi = this.dragBoundY1; yi <= this.dragBoundY2; yi++) {
var xi1 = xi + this.dragObjX;
var yi1 = yi + this.dragObjY;
if (this.objDragMap[xi][yi]) {
var ge = this.grid[xi1][yi1];
template = ge.copy ();
ge.clear ();
}}

for (xi = this.dragBoundX1; xi <= this.dragBoundX2; xi++) for (yi = this.dragBoundY1; yi <= this.dragBoundY2; yi++) {
var xi2 = xi + dx;
var yi2 = yi + dy;
if (this.objDragMap[xi][yi]) {
var ge = this.grid[xi2][yi2];
ge.set (template);
}}

this.dragObjX = dx;
this.dragObjY = dy;
this.changedConductors = true;
this.cv.repaint (this.pause);
}, "~N,~N");
Clazz.defineMethod (c$, "tryDrag", 
function (dx, dy) {
var xi;
var yi;
if (this.dragBoundX1 + dx <= this.windowOffsetX || this.dragBoundY1 + dy <= this.windowOffsetY || this.dragBoundX2 + dx >= this.windowOffsetX + this.windowWidth - 1 || this.dragBoundY2 + dy >= this.windowOffsetY + this.windowHeight - 1) return false;
for (xi = this.dragBoundX1; xi <= this.dragBoundX2; xi++) for (yi = this.dragBoundY1; yi <= this.dragBoundY2; yi++) {
var xi1 = xi + dx - this.dragObjX;
var yi1 = yi + dy - this.dragObjY;
var xi2 = xi + dx;
var yi2 = yi + dy;
try {
if (!this.objDragMap[xi1][yi1] && this.objDragMap[xi][yi] && (this.grid[xi2][yi2].conductor || this.grid[xi2][yi2].dielec != 1 || this.grid[xi2][yi2].charge != 0)) return false;
if (this.objDragMap[xi][yi]) {
var i;
for (i = 0; i != this.chargeCount; i++) {
var s = this.charges[i];
if (this.abs (s.x - xi2) <= 1 && this.abs (s.y - yi2) <= 1) return false;
}
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
}

return true;
}, "~N,~N");
Clazz.defineMethod (c$, "deleteObject", 
function (xp, yp) {
var stack =  new java.util.Vector ();
stack.addElement ( new java.awt.Point (xp, yp));
var ge1 = this.grid[xp][yp].copy ();
while (stack.size () > 0) {
var x = stack.elementAt (stack.size () - 1);
stack.removeElementAt (stack.size () - 1);
if (x.x < 0 || x.x >= this.gridSizeX || x.y < 0 || x.y >= this.gridSizeY) continue;
var ge = this.grid[x.x][x.y];
if (!this.matchElement (ge, ge1)) continue;
ge.clear ();
stack.addElement ( new java.awt.Point (x.x - 1, x.y));
stack.addElement ( new java.awt.Point (x.x, x.y - 1));
stack.addElement ( new java.awt.Point (x.x + 1, x.y));
stack.addElement ( new java.awt.Point (x.x, x.y + 1));
}
this.changedConductors = true;
this.cv.repaint (this.pause);
}, "~N,~N");
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
if (e.getSource () === this.blankButton) {
this.doBlank ();
this.cv.repaint (this.pause);
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
this.cv.repaint (this.pause);
if (e.getSource () === this.resBar) {
this.setResolution ();
this.reinit ();
}if (e.getSource () === this.adjustBar) this.doAdjust ();
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "setResolution", 
function () {
this.windowWidth = this.windowHeight = this.resBar.getValue () + 1;
this.windowOffsetX = this.windowOffsetY = 20;
this.gridSizeX = this.windowWidth + this.windowOffsetX * 2;
this.gridSizeY = this.windowHeight + this.windowOffsetY * 2;
this.linegrid = null;
});
Clazz.defineMethod (c$, "setResolution", 
function (x) {
this.resBar.setValue (x);
this.setResolution ();
this.reinit ();
}, "~N");
Clazz.defineMethod (c$, "doAdjust", 
function () {
if (this.adjustSelectX1 == -1) return;
var vali = this.adjustBar.getValue ();
if (vali < 1) vali = 1;
if (vali > 99) vali = 100;
var val = vali / 100.;
var x;
var y;
var create = true;
for (y = this.adjustSelectY1; y <= this.adjustSelectY2; y++) for (x = this.adjustSelectX1; x <= this.adjustSelectX2; x++) {
var oe = this.grid[x + this.windowOffsetX][y + this.windowOffsetY];
if (oe.conductor || oe.dielec != 1) create = false;
}

var adjustFloat = false;
var pot = 0;
for (y = this.adjustSelectY1; y <= this.adjustSelectY2; y++) for (x = this.adjustSelectX1; x <= this.adjustSelectX2; x++) {
var oe = this.grid[x + this.windowOffsetX][y + this.windowOffsetY];
switch (this.modeChooser.getSelectedIndex ()) {
case 12:
if (oe.conductor) oe.conductivity = val;
this.changedConductors = true;
break;
case 13:
if (oe.dielec != 1 || create) oe.dielec = (vali - 1) / 10. + 1.1;
this.changedConductors = true;
break;
case 15:
if (vali <= 1) val = 0;
if (vali == 50) val = .51;
if (oe.charge != 0) oe.charge = val * 2 - 1;
this.changedConductors = true;
break;
case 14:
if (vali <= 1) val = 0;
pot = val * 2 - 1;
if (create) this.addConductor (x + this.windowOffsetX, y + this.windowOffsetY);
if (oe.conductor) {
if (oe.floater > 0) adjustFloat = true;
 else {
oe.pot = pot;
this.changedConductors = true;
}}break;
}
}

if (adjustFloat) {
this.floatCharge = this.floatExtCharge + this.floatCap * pot;
this.changedCharges = true;
}this.cv.repaint (this.pause);
if (this.modeChooser.getSelectedIndex () == 15) {
var i;
for (i = 0; i != this.chargeCount; i++) {
var src = this.charges[i];
src.v = this.grid[src.x][src.y].charge;
}
}});
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.dragging = true;
if (this.objDragMap != null && this.modeChooser.getSelectedIndex () == 0) this.dragObject (e.getX (), e.getY ());
 else this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
if ((e.getModifiers () & 16) != 0) return;
var x = e.getX ();
var y = e.getY ();
this.dragX = x;
this.dragY = y;
var panelHeight = this.getPanelHeight ();
this.selectCharge (e);
var md = this.modeChooser.getSelectedIndex ();
if ((md == 0 || md == 1 || md == 11) && this.selectedCharge == -1) this.selectObject (x, y);
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
this.adjustSelectX1 = -1;
this.adjustBar.disable ();
var xp = Clazz.doubleToInt (e.getX () * this.windowWidth / this.winSize.width) + this.windowOffsetX;
var yp = Clazz.doubleToInt (e.getY () * this.windowHeight / this.winSize.height) + this.windowOffsetY;
switch (this.modeChooser.getSelectedIndex ()) {
case 2:
if (this.selectedCharge == -1) this.addCharge (xp, yp, 0.5);
break;
case 3:
if (this.selectedCharge == -1) this.addCharge (xp, yp, -0.5);
break;
case 0:
this.dragging = true;
break;
case 11:
if (this.objDragMap != null) {
this.clearFloaters ();
var i;
var j;
var ch = 0;
for (i = 0; i != this.gridSizeX; i++) for (j = 0; j != this.gridSizeY; j++) if (this.objDragMap[i][j]) {
this.grid[i][j].floater = 1;
ch += this.getCharge (i, j);
}

this.floatCharge = ch;
this.changedConductors = true;
this.cv.repaint (this.pause);
}break;
case 1:
if (this.selectedCharge != -1) this.deleteCharge (this.selectedCharge);
 else this.deleteObject (xp, yp);
break;
default:
this.dragging = true;
this.edit (e);
break;
}
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.dragging = this.dragSet = this.dragClear = this.stopCalc = false;
if (this.objDragMap != null) {
this.objDragMap = null;
this.selectObject (e.getX (), e.getY ());
}this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
this.cv.repaint (this.pause);
if (e.getItemSelectable () === this.setupChooser) this.doSetup ();
if (e.getItemSelectable () === this.modeChooser) this.setModeChooser ();
if (e.getItemSelectable () === this.accuracyChooser || e.getItemSelectable () === this.currentCheck) this.changedConductors = true;
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "setModeChooser", 
function () {
if (this.modeChooser.getSelectedIndex () < 12) {
this.adjustLabel.hide ();
this.adjustBar.hide ();
this.validate ();
this.adjustSelectX1 = -1;
return;
}switch (this.modeChooser.getSelectedIndex ()) {
case 12:
this.adjustLabel.setText ("Conductivity");
break;
case 13:
this.adjustLabel.setText ("Dielectric Constant");
break;
case 14:
this.adjustLabel.setText ("Potential");
break;
case 15:
this.adjustLabel.setText ("Charge");
break;
}
this.adjustLabel.show ();
this.adjustBar.show ();
if (this.adjustSelectX1 == -1) this.adjustBar.disable ();
 else this.adjustBar.enable ();
this.validate ();
});
Clazz.defineMethod (c$, "doSetup", 
function () {
this.t = 0;
this.doBlank ();
this.currentCheck.setState (false);
this.brightnessBar.setValue (90);
this.modeChooser.select (0);
this.setModeChooser ();
this.setup = this.setupList.elementAt (this.setupChooser.getSelectedIndex ());
this.setup.select ();
});
Clazz.defineMethod (c$, "doCylinder", 
function (p, floater) {
var x = Clazz.doubleToInt (this.gridSizeX / 2);
var y = Clazz.doubleToInt (this.gridSizeY / 2);
var r = 8;
var n;
for (n = -r + 1; n < r; n++) {
var a = Clazz.doubleToInt (java.lang.Math.sqrt (r * r - n * n - .01));
var a2;
for (a2 = -a; a2 != a; a2++) {
this.addConductor (x + n, y + a2, p);
this.grid[x + n][y + a2].floater = floater;
}
}
}, "~N,~N");
Clazz.defineMethod (c$, "doCylinderCharge", 
function (p, r, xo) {
var x = Clazz.doubleToInt (this.gridSizeX / 2);
var y = Clazz.doubleToInt (this.gridSizeY / 2);
var n;
for (n = -r + 1; n < r; n++) {
var a = Clazz.doubleToInt (java.lang.Math.sqrt (r * r - n * n - .01));
var a2;
for (a2 = -a; a2 != a; a2++) this.grid[x + n + xo][y + a2].charge += p;

}
}, "~N,~N,~N");
Clazz.defineMethod (c$, "doDielecCylinder", 
function () {
var x = Clazz.doubleToInt (this.gridSizeX / 2);
var y = Clazz.doubleToInt (this.gridSizeY / 2);
var r = 8;
var n;
for (n = -r + 1; n < r; n++) {
var a = Clazz.doubleToInt (java.lang.Math.sqrt (r * r - n * n - .01));
var a2;
for (a2 = -a; a2 != a; a2++) this.grid[x + n][y + a2].dielec = 5;

}
});
Clazz.defineMethod (c$, "addConductor", 
function (x, y) {
this.addConductor (x, y, 0, 1);
}, "~N,~N");
Clazz.defineMethod (c$, "addConductor", 
function (x, y, p) {
this.addConductor (x, y, p, 1);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "addConductor", 
function (x, y, p, cv) {
var ge = this.grid[x][y];
ge.conductor = true;
ge.pot = p;
ge.conductivity = cv;
ge.floater = 0;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "conductFillRect", 
function (x, y, x2, y2, p, cv) {
var i;
var j;
for (i = x; i <= x2; i++) for (j = y; j <= y2; j++) this.addConductor (i, j, p, cv);


}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "conductDrawRect", 
function (x, y, x2, y2, p, cv) {
var i;
var j;
for (i = x; i <= x2; i++) {
this.addConductor (i, y, p, cv);
this.addConductor (i, y2, p, cv);
}
for (j = y; j <= y2; j++) {
this.addConductor (x, j, p, cv);
this.addConductor (x2, j, p, cv);
}
}, "~N,~N,~N,~N,~N,~N");
c$.$EMStaticFrame$Charge$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.x = 0;
this.y = 0;
this.v = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "Charge");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.x = a;
this.y = b;
this.v = c;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getScreenX", 
function () {
return Clazz.doubleToInt (((this.x - this.b$["test.falstad.EMStaticFrame"].windowOffsetX) * this.b$["test.falstad.EMStaticFrame"].winSize.width + Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].winSize.width / 2)) / this.b$["test.falstad.EMStaticFrame"].windowWidth);
});
Clazz.defineMethod (c$, "getScreenY", 
function () {
return Clazz.doubleToInt (((this.y - this.b$["test.falstad.EMStaticFrame"].windowOffsetY) * this.b$["test.falstad.EMStaticFrame"].winSize.height + Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].winSize.height / 2)) / this.b$["test.falstad.EMStaticFrame"].windowHeight);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$GridElement$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.pot = 0;
this.jx = 0;
this.jy = 0;
this.ax = 0;
this.ay = 0;
this.dielec = 0;
this.conductivity = 0;
this.charge = 0;
this.floatPot = 0;
this.col = 0;
this.conductor = false;
this.boundary = false;
this.currentPath = false;
this.floater = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "GridElement");
Clazz.defineMethod (c$, "clear", 
function () {
this.pot = this.charge = 0;
this.dielec = this.conductivity = 1;
this.conductor = false;
this.floater = 0;
});
Clazz.defineMethod (c$, "copy", 
function () {
var a = Clazz.innerTypeInstance (test.falstad.EMStaticFrame.GridElement, this, null);
a.pot = this.pot;
a.dielec = this.dielec;
a.conductivity = this.conductivity;
a.conductor = this.conductor;
a.charge = this.charge;
a.floater = this.floater;
return a;
});
Clazz.defineMethod (c$, "set", 
function (a) {
this.pot = a.pot;
this.dielec = a.dielec;
this.conductivity = a.conductivity;
this.conductor = a.conductor;
this.charge = a.charge;
this.floater = a.floater;
}, "test.falstad.EMStaticFrame.GridElement");
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$SolverElement$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.charge = 0;
this.dielec = 0;
this.pot = 0;
this.conductor = false;
this.boundary = false;
this.ignore = false;
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "SolverElement");
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$SolverGrid$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.grid = null;
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "SolverGrid");
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "Setup");
Clazz.defineMethod (c$, "select", 
function () {
});
Clazz.defineMethod (c$, "deselect", 
function () {
});
Clazz.defineMethod (c$, "valueChanged", 
function (a) {
}, "swingjs.awt.Scrollbar");
Clazz.defineMethod (c$, "doStep", 
function () {
});
Clazz.makeConstructor (c$, 
function () {
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$SingleChargeSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "SingleChargeSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Single Charge";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
this.b$["test.falstad.EMStaticFrame"].addCharge (a, b, 0.5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.DoubleChargeSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$DoubleChargeSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "DoubleChargeSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Double Charge";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
this.b$["test.falstad.EMStaticFrame"].addCharge (a, b - 6, 0.5);
this.b$["test.falstad.EMStaticFrame"].addCharge (a, b + 6, 0.5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.DipoleChargeSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$DipoleChargeSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "DipoleChargeSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dipole Charge";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
this.b$["test.falstad.EMStaticFrame"].addCharge (a, b - 5, 0.5);
this.b$["test.falstad.EMStaticFrame"].addCharge (a, b + 5, -0.5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ChargePlaneSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ChargePlaneSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ChargePlaneSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Charge + Plane";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
this.b$["test.falstad.EMStaticFrame"].addCharge (a, b - 5, 0.5);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (this.b$["test.falstad.EMStaticFrame"].windowOffsetX + 1, b, this.b$["test.falstad.EMStaticFrame"].windowOffsetX + this.b$["test.falstad.EMStaticFrame"].windowWidth - 2, b + 2, 0, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.DipoleUniformSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$DipoleUniformSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "DipoleUniformSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dipole + Uniform";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
this.b$["test.falstad.EMStaticFrame"].addCharge (a, b - 4, 0.5);
this.b$["test.falstad.EMStaticFrame"].addCharge (a, b + 4, -0.5);
this.b$["test.falstad.EMStaticFrame"].addUniformField ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.QuadChargeSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$QuadChargeSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "QuadChargeSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Quadrupole Charge";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
this.b$["test.falstad.EMStaticFrame"].addCharge (a + 4, b - 4, 0.5);
this.b$["test.falstad.EMStaticFrame"].addCharge (a + 4, b + 4, -0.5);
this.b$["test.falstad.EMStaticFrame"].addCharge (a - 4, b - 4, -0.5);
this.b$["test.falstad.EMStaticFrame"].addCharge (a - 4, b + 4, 0.5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ConductingPlanesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ConductingPlanesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ConductingPlanesSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Conducting Planes";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
var c = 4;
var d = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth * 2 / 6);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - d, b - c - 2, a + d, b - c, 1, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - d, b + c, a + d, b + c + 2, -1, 1);
this.b$["test.falstad.EMStaticFrame"].brightnessBar.setValue (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ChargedPlanesSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ChargedPlanesSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ChargedPlanesSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Charged Planes";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
var c = 4;
var d = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth * 2 / 6);
var e;
var f;
var g = 1. / (d * 3);
for (f = 0; f != 3; f++) for (e = -d; e <= d; e++) {
this.b$["test.falstad.EMStaticFrame"].grid[a + e][b - c - f].charge = g;
this.b$["test.falstad.EMStaticFrame"].grid[a + e][b + c + f].charge = -g;
}

this.b$["test.falstad.EMStaticFrame"].brightnessBar.setValue (35);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ConductingCylinderSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ConductingCylinderSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ConductingCylinderSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Conducting Cylinder";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doCylinder (1, 0);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.GroundedCylinderSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$GroundedCylinderSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "GroundedCylinderSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Grounded Cyl + Charge";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doCylinder (0, 0);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
var c = 7;
this.b$["test.falstad.EMStaticFrame"].addCharge (a, b + c * 2, 0.5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.GroundedCylinderUniformSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$GroundedCylinderUniformSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "GroundedCylinderUniformSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Grounded Cyl + Field";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doCylinder (0, 0);
this.b$["test.falstad.EMStaticFrame"].addUniformField ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ChargedCylinderSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ChargedCylinderSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ChargedCylinderSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Charged Cylinder";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doCylinderCharge (.005, 10, 0);
this.b$["test.falstad.EMStaticFrame"].brightnessBar.setValue (50);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ChargedHollowCylinder1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ChargedHollowCylinder1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ChargedHollowCylinder1Setup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Charged Hollow Cyl 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doCylinderCharge (.005, 10, 0);
this.b$["test.falstad.EMStaticFrame"].doCylinderCharge (-0.005, 5, 0);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ChargedHollowCylinder2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ChargedHollowCylinder2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ChargedHollowCylinder2Setup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Charged Hollow Cyl 2";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doCylinderCharge (.005, 10, 0);
this.b$["test.falstad.EMStaticFrame"].doCylinderCharge (-0.005, 5, 2);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.FloatingCylinderSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$FloatingCylinderSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "FloatingCylinderSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Floating Cyl + Charge";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doCylinder (1, 1);
this.b$["test.falstad.EMStaticFrame"].addCharge (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + 7, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + 7, 0.5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.FloatingCylinder2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$FloatingCylinder2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "FloatingCylinder2Setup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Floating Cyl + Plates";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doCylinder (1, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 3), this.b$["test.falstad.EMStaticFrame"].windowOffsetY, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 3), this.b$["test.falstad.EMStaticFrame"].windowOffsetY + 2, 1, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 3), this.b$["test.falstad.EMStaticFrame"].windowOffsetY + this.b$["test.falstad.EMStaticFrame"].windowHeight - 3, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 3), this.b$["test.falstad.EMStaticFrame"].windowOffsetY + this.b$["test.falstad.EMStaticFrame"].windowHeight - 1, -1, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ConductingBoxSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ConductingBoxSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ConductingBoxSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Conducting Box";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 5);
for (a = b - 2; a <= b; a++) this.b$["test.falstad.EMStaticFrame"].conductDrawRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + a, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + a, 1, 1);

});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.SharpPointSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$SharpPointSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "SharpPointSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Sharp Point";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + 1, this.b$["test.falstad.EMStaticFrame"].gridSizeY - 1, 1, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.CornerSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$CornerSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "CornerSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Corner";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + 1, this.b$["test.falstad.EMStaticFrame"].gridSizeY - 1, 1, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - 1, this.b$["test.falstad.EMStaticFrame"].gridSizeX - 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + 1, 1, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Angle45Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$Angle45Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "Angle45Setup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "45 Degrees";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b = 4;
for (a = -1; a != Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 2) + b * 2; a++) this.b$["test.falstad.EMStaticFrame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + a - b - 2, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + b - a, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + a - b + 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + b - a, 1, 1);

this.b$["test.falstad.EMStaticFrame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - b, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - 1 + b, this.b$["test.falstad.EMStaticFrame"].gridSizeX - 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + 1 + b, 1, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Angle135Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$Angle135Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "Angle135Setup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "135 Degrees";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b = 0;
for (a = -1; a != Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 2) + 2; a++) this.b$["test.falstad.EMStaticFrame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + a - b - 2, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + b - a, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + a - b + 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + b - a, 1, 1);

this.b$["test.falstad.EMStaticFrame"].conductFillRect (0, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - 1 + b, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - b, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + 1 + b, 1, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.DielectricCylinderSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$DielectricCylinderSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "DielectricCylinderSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dielectric Cylinder";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doDielecCylinder ();
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
var c = 8;
this.b$["test.falstad.EMStaticFrame"].addCharge (a + Clazz.doubleToInt (c * 3 / 2), b + Clazz.doubleToInt (c * 3 / 2), 0.5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.DielectricCylinderFieldSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$DielectricCylinderFieldSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "DielectricCylinderFieldSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dielectric Cyl + Field";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doDielecCylinder ();
this.b$["test.falstad.EMStaticFrame"].addUniformField ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Dielectric1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$Dielectric1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "Dielectric1Setup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dielectric 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doDielec (6);
this.b$["test.falstad.EMStaticFrame"].addCharge (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - 5, 0.5);
this.b$["test.falstad.EMStaticFrame"].brightnessBar.setValue (250);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Dielectric2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$Dielectric2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "Dielectric2Setup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dielectric 2";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doDielec (6);
this.b$["test.falstad.EMStaticFrame"].addCharge (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + 5, 0.5);
this.b$["test.falstad.EMStaticFrame"].brightnessBar.setValue (250);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.DielectricDipoleSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$DielectricDipoleSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "DielectricDipoleSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dielectric + Dipole";
});
Clazz.overrideMethod (c$, "select", 
function () {
this.b$["test.falstad.EMStaticFrame"].doDielec (3);
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
this.b$["test.falstad.EMStaticFrame"].addCharge (a + 8, b - 4, 0.5);
this.b$["test.falstad.EMStaticFrame"].addCharge (a - 8, b + 4, -0.5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.DielecCapSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$DielecCapSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "DielecCapSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Dielectric Capacitor";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
var c = 2;
var d = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - d, b - c - 2, a + d, b - c, 1, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - d, b + c, a + d, b + c + 2, -1, 1);
var e;
var f;
for (e = -d + 2; e <= d - 2; e++) for (f = -c + 1; f < c; f++) this.b$["test.falstad.EMStaticFrame"].grid[a + e][b + f].dielec = 5;


this.b$["test.falstad.EMStaticFrame"].brightnessBar.setValue (12);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ConductingPlanesGapSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ConductingPlanesGapSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ConductingPlanesGapSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Conducting Planes w/ Gap";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
var b = 4;
this.b$["test.falstad.EMStaticFrame"].conductFillRect (0, a - 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - b - 1, a + 1, 1, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + b, a - 1, this.b$["test.falstad.EMStaticFrame"].gridSizeX - 1, a + 1, -1, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.SlottedConductingPlaneSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$SlottedConductingPlaneSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "SlottedConductingPlaneSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Slotted Conducting Plane";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
var b = 4;
this.b$["test.falstad.EMStaticFrame"].conductFillRect (0, a - 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - b - 1, a + 1, 0, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + b, a - 1, this.b$["test.falstad.EMStaticFrame"].gridSizeX - 1, a + 1, 0, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (0, this.b$["test.falstad.EMStaticFrame"].windowOffsetY, this.b$["test.falstad.EMStaticFrame"].gridSizeX - 1, this.b$["test.falstad.EMStaticFrame"].windowOffsetY, 1, 1);
this.b$["test.falstad.EMStaticFrame"].brightnessBar.setValue (960);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Shielding1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$Shielding1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "Shielding1Setup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Shielding 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
for (a = 6; a <= 8; a++) this.b$["test.falstad.EMStaticFrame"].conductDrawRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + a, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + a, 0, 1);

this.b$["test.falstad.EMStaticFrame"].addUniformField ();
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Shielding2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$Shielding2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "Shielding2Setup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Shielding 2";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4);
var c = b + 2;
for (a = b; a <= c; a++) this.b$["test.falstad.EMStaticFrame"].conductDrawRect (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - a, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) + a, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + a, 0, 1);

this.b$["test.falstad.EMStaticFrame"].addCharge (Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2), Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2), 0.5);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.BoxOneSideSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$BoxOneSideSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "BoxOneSideSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Box w/ One Live Side";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4);
var c = b + 2;
var d = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var e = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
for (a = b; a <= c; a++) {
this.b$["test.falstad.EMStaticFrame"].conductDrawRect (d - a, e - a, d + a, e + a, 0, 1);
this.b$["test.falstad.EMStaticFrame"].grid[d - b + 1][e - a].conductor = false;
this.b$["test.falstad.EMStaticFrame"].grid[d + b - 1][e - a].conductor = false;
}
this.b$["test.falstad.EMStaticFrame"].conductFillRect (d - b + 2, e - c, d + b - 2, e - b, 1, 1);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.QuadrupoleLensSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$QuadrupoleLensSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "QuadrupoleLensSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Quadrupole Lens";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a;
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2) - 1;
var c = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4);
var d = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var e = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
for (a = -b; a <= b; a++) {
var f = Clazz.doubleToInt (java.lang.Math.sqrt (a * a + c * c));
var g;
for (g = f; g <= b; g++) {
this.b$["test.falstad.EMStaticFrame"].addConductor (d + a, e + g, -1);
this.b$["test.falstad.EMStaticFrame"].addConductor (d + a, e - g, -1);
this.b$["test.falstad.EMStaticFrame"].addConductor (d + g, e + a, 1);
this.b$["test.falstad.EMStaticFrame"].addConductor (d - g, e + a, 1);
}
}
this.b$["test.falstad.EMStaticFrame"].brightnessBar.setValue (24);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ConductingWireSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ConductingWireSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ConductingWireSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Wire w/ Current";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = 8;
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - Clazz.doubleToInt (b / 2), 0, a + Clazz.doubleToInt (b / 2), this.b$["test.falstad.EMStaticFrame"].gridSizeY - 1, 0, 1);
this.b$["test.falstad.EMStaticFrame"].currentCheck.setState (true);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ResistorSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ResistorSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ResistorSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Resistor";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = 8;
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - Clazz.doubleToInt (b / 2), 0, a + Clazz.doubleToInt (b / 2), Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - 6, 0, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - Clazz.doubleToInt (b / 2), Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + 6, a + Clazz.doubleToInt (b / 2), this.b$["test.falstad.EMStaticFrame"].gridSizeY - 1, 0, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - Clazz.doubleToInt (b / 2) + 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - 5, a + Clazz.doubleToInt (b / 2) - 1, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + 5, 0, .1);
this.b$["test.falstad.EMStaticFrame"].currentCheck.setState (true);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.ResistorsParallelSetup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$ResistorsParallelSetup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "ResistorsParallelSetup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Resistors in Parallel";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = 8;
var c;
var d;
var e = Clazz.doubleToInt (b / 2);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - e, 0, a + e, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - e - 1, 0, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - e, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + e + 1, a + e, this.b$["test.falstad.EMStaticFrame"].gridSizeY - 1, 0, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4), Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - b, a + Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4), Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - e - 1, 0, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4), Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + e + 1, a + Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4), Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + b, 0, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4), Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - e, a - Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4) + 4, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + e, 0, .6);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a + Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4) - 4, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - e, a + Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4), Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + e, 0, .1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - 2, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - e, a + 2, Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + e, 0, .04);
this.b$["test.falstad.EMStaticFrame"].currentCheck.setState (true);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Current2D1Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$Current2D1Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "Current2D1Setup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Current in 2D 1";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2);
var c = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 3);
var d;
var e;
var f = 4;
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - c, b - c, a + c, b + c, 0, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a - c, 0, a - c + f, b, 0, 1);
this.b$["test.falstad.EMStaticFrame"].conductFillRect (a + c - f, 0, a + c, this.b$["test.falstad.EMStaticFrame"].gridSizeY - 1, 0, 1);
for (d = -3; d <= 3; d++) for (e = -3; e <= 3; e++) this.b$["test.falstad.EMStaticFrame"].grid[a + d][b + e].conductor = false;


this.b$["test.falstad.EMStaticFrame"].currentCheck.setState (true);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Current2D2Setup, this, null);
});
c$ = Clazz.p0p ();
};
c$.$EMStaticFrame$Current2D2Setup$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.falstad.EMStaticFrame, "Current2D2Setup", test.falstad.EMStaticFrame.Setup, null, Clazz.innerTypeInstance (test.falstad.EMStaticFrame.Setup, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getName", 
function () {
return "Current in 2D 2";
});
Clazz.overrideMethod (c$, "select", 
function () {
var a = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeX / 2);
var b = 8;
var c;
var d;
for (c = 0; c != b; c++) for (d = 0; d != this.b$["test.falstad.EMStaticFrame"].gridSizeY; d++) this.b$["test.falstad.EMStaticFrame"].addConductor (a + c - Clazz.doubleToInt (b / 2), d);


for (c = Clazz.doubleToInt (-this.b$["test.falstad.EMStaticFrame"].windowWidth / 4); c < Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].windowWidth / 4); c++) for (d = Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) - b; d <= Clazz.doubleToInt (this.b$["test.falstad.EMStaticFrame"].gridSizeY / 2) + b; d++) this.b$["test.falstad.EMStaticFrame"].addConductor (a + c, d);


this.b$["test.falstad.EMStaticFrame"].currentCheck.setState (true);
});
Clazz.overrideMethod (c$, "createNext", 
function () {
return null;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"chargeAmt", .5,
"chargeMax", 20,
"MODE_MOVE", 0,
"MODE_DELETE", 1,
"MODE_FQPLUS", 2,
"MODE_FQMINUS", 3,
"MODE_CLEAR", 4,
"MODE_CONDUCTOR", 5,
"MODE_CPLUS", 6,
"MODE_CMINUS", 7,
"MODE_QPLUS", 8,
"MODE_QMINUS", 9,
"MODE_DIELEC", 10,
"MODE_FLOAT", 11,
"MODE_ADJUST", 12,
"MODE_ADJ_CONDUCT", 12,
"MODE_ADJ_DIELEC", 13,
"MODE_ADJ_POT", 14,
"MODE_ADJ_CHARGE", 15,
"VIEW_E", 0,
"VIEW_E_LINES", 1,
"VIEW_POT", 2,
"VIEW_A", 3,
"VIEW_B", 4,
"VIEW_J", 5,
"VIEW_Q", 6,
"VIEW_D", 7,
"VIEW_P", 8,
"VIEW_P_CHARGE", 9,
"VIEW_TYPE", 10,
"VIEW_Q_J", 11,
"VIEW_E_Q", 12,
"VIEW_E_LINES_Q", 13,
"VIEW_E_J", 14,
"VIEW_E_LINES_J", 15,
"VIEW_E_Q_J", 16,
"VIEW_E_LINES_Q_J", 17,
"VIEW_E_POT", 18,
"VIEW_E_LINES_POT", 19,
"VIEW_E_POT_COND", 20,
"VIEW_E_LINES_POT_COND", 21,
"VIEW_E_POT_J", 22,
"VIEW_E_LINES_POT_J", 23,
"VIEW_B_J", 24,
"VIEW_E_B_Q_J", 25,
"VIEW_E_LINES_B_Q_J", 26,
"VIEW_EX", 27,
"VIEW_EY", 28,
"VIEW_DX", 29,
"VIEW_DY", 30,
"VIEW_NONE", -1);
});
