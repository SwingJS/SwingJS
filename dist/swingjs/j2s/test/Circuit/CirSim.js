Clazz.declarePackage ("test.Circuit");
Clazz.load (["java.awt.Frame", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ItemListener", "$.KeyListener", "$.MouseListener", "$.MouseMotionListener"], "test.Circuit.CirSim", ["java.awt.Button", "$.Checkbox", "$.CheckboxMenuItem", "$.Color", "$.Cursor", "$.Font", "$.Label", "$.Menu", "$.MenuBar", "$.MenuItem", "$.MenuShortcut", "$.PopupMenu", "$.Rectangle", "$.RenderingHints", "$.Scrollbar", "java.awt.event.WindowAdapter", "java.io.ByteArrayOutputStream", "$.File", "$.IOException", "java.lang.Double", "$.Thread", "java.net.URL", "$.URLDecoder", "$.URLEncoder", "java.util.Random", "$.StringTokenizer", "$.Vector", "test.Circuit.CapacitorElm", "$.CircuitCanvas", "$.CircuitElm", "$.CircuitLayout", "$.CircuitNode", "$.CircuitNodeLink", "$.CurrentElm", "$.EditDialog", "$.EditOptions", "$.GraphicElm", "$.GroundElm", "$.ImportExportDialog", "$.ImportExportDialogFactory", "$.InductorElm", "$.RailElm", "$.ResistorElm", "$.RowInfo", "$.Scope", "$.SwitchElm", "$.VoltageElm", "$.WireElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.titleLabel = null;
this.resetButton = null;
this.dumpMatrixButton = null;
this.exportItem = null;
this.exportLinkItem = null;
this.importItem = null;
this.exitItem = null;
this.undoItem = null;
this.redoItem = null;
this.cutItem = null;
this.copyItem = null;
this.pasteItem = null;
this.selectAllItem = null;
this.optionsItem = null;
this.optionsMenu = null;
this.stoppedCheck = null;
this.dotsCheckItem = null;
this.voltsCheckItem = null;
this.powerCheckItem = null;
this.smallGridCheckItem = null;
this.showValuesCheckItem = null;
this.conductanceCheckItem = null;
this.euroResistorCheckItem = null;
this.printableCheckItem = null;
this.conventionCheckItem = null;
this.speedBar = null;
this.currentBar = null;
this.powerLabel = null;
this.powerBar = null;
this.elmMenu = null;
this.elmEditMenuItem = null;
this.elmCutMenuItem = null;
this.elmCopyMenuItem = null;
this.elmDeleteMenuItem = null;
this.elmScopeMenuItem = null;
this.scopeMenu = null;
this.transScopeMenu = null;
this.mainMenu = null;
this.scopeVMenuItem = null;
this.scopeIMenuItem = null;
this.scopeMaxMenuItem = null;
this.scopeMinMenuItem = null;
this.scopeFreqMenuItem = null;
this.scopePowerMenuItem = null;
this.scopeIbMenuItem = null;
this.scopeIcMenuItem = null;
this.scopeIeMenuItem = null;
this.scopeVbeMenuItem = null;
this.scopeVbcMenuItem = null;
this.scopeVceMenuItem = null;
this.scopeVIMenuItem = null;
this.scopeXYMenuItem = null;
this.scopeResistMenuItem = null;
this.scopeVceIcMenuItem = null;
this.scopeSelectYMenuItem = null;
this.addingClass = null;
this.mouseMode = 6;
this.tempMouseMode = 6;
this.mouseModeStr = "Select";
this.dragX = 0;
this.dragY = 0;
this.initDragX = 0;
this.initDragY = 0;
this.selectedSource = 0;
this.selectedArea = null;
this.gridSize = 0;
this.gridMask = 0;
this.gridRound = 0;
this.dragging = false;
this.analyzeFlag = false;
this.dumpMatrix = false;
this.useBufferedImage = false;
this.isMac = false;
this.ctrlMetaKey = null;
this.t = 0;
this.pause = 10;
this.scopeSelected = -1;
this.menuScope = -1;
this.hintType = -1;
this.hintItem1 = 0;
this.hintItem2 = 0;
this.stopMessage = null;
this.timeStep = 0;
this.elmList = null;
this.dragElm = null;
this.menuElm = null;
this.mouseElm = null;
this.stopElm = null;
this.didSwitch = false;
this.mousePost = -1;
this.plotXElm = null;
this.plotYElm = null;
this.draggingPost = 0;
this.heldSwitchElm = null;
this.circuitMatrix = null;
this.circuitRightSide = null;
this.origRightSide = null;
this.origMatrix = null;
this.circuitRowInfo = null;
this.circuitPermute = null;
this.circuitNonLinear = false;
this.voltageSourceCount = 0;
this.circuitMatrixSize = 0;
this.circuitMatrixFullSize = 0;
this.circuitNeedsMap = false;
this.useFrame = false;
this.scopeCount = 0;
this.scopes = null;
this.scopeColCount = null;
this.dumpTypes = null;
this.shortcuts = null;
this.clipboard = null;
this.circuitArea = null;
this.circuitBottom = 0;
this.undoStack = null;
this.redoStack = null;
this.cv = null;
this.applet = null;
this.startCircuit = null;
this.startLabel = null;
this.startCircuitText = null;
this.baseURL = "http://www.falstad.com/circuit/";
this.shown = false;
this.lastTime = 0;
this.lastFrameTime = 0;
this.lastIterTime = 0;
this.secTime = 0;
this.frames = 0;
this.steps = 0;
this.framerate = 0;
this.steprate = 0;
this.nodeList = null;
this.voltageSources = null;
if (!Clazz.isClassDefined ("test.Circuit.CirSim.FindPathInfo")) {
test.Circuit.CirSim.$CirSim$FindPathInfo$ ();
}
this.converged = false;
this.subIterations = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "CirSim", java.awt.Frame, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.ItemListener, java.awt.event.KeyListener]);
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return "Circuit by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.Circuit.CirSim, ["Circuit Simulator v1.6i"]);
this.applet = a;
this.useFrame = false;
}, "test.Circuit.Circuit");
Clazz.defineMethod (c$, "init", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var euroResistor = null;
var useFrameStr = null;
var printable = false;
var convention = true;
test.Circuit.CircuitElm.initClass (this);
try {
this.baseURL = this.applet.getDocumentBase ().getFile ();
var doc = this.applet.getDocumentBase ().toString ();
var $in = doc.indexOf ('#');
if ($in > 0) {
var x = null;
try {
x = doc.substring ($in + 1);
x = java.net.URLDecoder.decode (x);
this.startCircuitText = x;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("can't decode " + x);
e.printStackTrace ();
} else {
throw e;
}
}
}$in = doc.lastIndexOf ('/');
if ($in > 0) this.baseURL = doc.substring (0, $in + 1);
var param = this.applet.getParameter ("PAUSE");
if (param != null) this.pause = Integer.parseInt (param);
this.startCircuit = this.applet.getParameter ("startCircuit");
this.startLabel = this.applet.getParameter ("startLabel");
euroResistor = this.applet.getParameter ("euroResistors");
useFrameStr = this.applet.getParameter ("useFrame");
var x = this.applet.getParameter ("whiteBackground");
if (x != null && x.equalsIgnoreCase ("true")) printable = true;
x = this.applet.getParameter ("conventionalCurrent");
if (x != null && x.equalsIgnoreCase ("true")) convention = false;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
var euro = (euroResistor != null && euroResistor.equalsIgnoreCase ("true"));
this.useFrame = (useFrameStr == null || !useFrameStr.equalsIgnoreCase ("false"));
if (this.useFrame) test.Circuit.CirSim.main = this;
 else test.Circuit.CirSim.main = this.applet;
var os = System.getProperty ("os.name");
this.isMac = (os.indexOf ("Mac ") == 0);
this.ctrlMetaKey = (this.isMac) ? "\u2318" : "Ctrl";
var jv = System.getProperty ("java.class.version");
var jvf =  new Double (jv).doubleValue ();
if (jvf >= 48) {
test.Circuit.CirSim.muString = "\u03bc";
test.Circuit.CirSim.ohmString = "\u03a9";
this.useBufferedImage = true;
}this.dumpTypes =  new Array (300);
this.shortcuts =  new Array (127);
this.dumpTypes[('o').charCodeAt (0)] = test.Circuit.Scope;
this.dumpTypes[('h').charCodeAt (0)] = test.Circuit.Scope;
this.dumpTypes[('$').charCodeAt (0)] = test.Circuit.Scope;
this.dumpTypes[('%').charCodeAt (0)] = test.Circuit.Scope;
this.dumpTypes[('?').charCodeAt (0)] = test.Circuit.Scope;
this.dumpTypes[('B').charCodeAt (0)] = test.Circuit.Scope;
test.Circuit.CirSim.main.setLayout ( new test.Circuit.CircuitLayout ());
this.cv =  new test.Circuit.CircuitCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.cv.addKeyListener (this);
test.Circuit.CirSim.main.add (this.cv);
this.mainMenu =  new java.awt.PopupMenu ();
var mb = null;
if (this.useFrame) mb =  new java.awt.MenuBar ();
var m =  new java.awt.Menu ("File");
if (this.useFrame) mb.add (m);
 else this.mainMenu.add (m);
m.add (this.importItem = this.getMenuItem ("Import"));
m.add (this.exportItem = this.getMenuItem ("Export"));
m.add (this.exportLinkItem = this.getMenuItem ("Export Link"));
m.addSeparator ();
m.add (this.exitItem = this.getMenuItem ("Exit"));
m =  new java.awt.Menu ("Edit");
m.add (this.undoItem = this.getMenuItem ("Undo"));
this.undoItem.setShortcut ( new java.awt.MenuShortcut (90));
m.add (this.redoItem = this.getMenuItem ("Redo"));
this.redoItem.setShortcut ( new java.awt.MenuShortcut (90, true));
m.addSeparator ();
m.add (this.cutItem = this.getMenuItem ("Cut"));
this.cutItem.setShortcut ( new java.awt.MenuShortcut (88));
m.add (this.copyItem = this.getMenuItem ("Copy"));
this.copyItem.setShortcut ( new java.awt.MenuShortcut (67));
m.add (this.pasteItem = this.getMenuItem ("Paste"));
this.pasteItem.setShortcut ( new java.awt.MenuShortcut (86));
this.pasteItem.setEnabled (false);
m.add (this.selectAllItem = this.getMenuItem ("Select All"));
this.selectAllItem.setShortcut ( new java.awt.MenuShortcut (65));
if (this.useFrame) mb.add (m);
 else this.mainMenu.add (m);
m =  new java.awt.Menu ("Scope");
if (this.useFrame) mb.add (m);
 else this.mainMenu.add (m);
m.add (this.getMenuItem ("Stack All", "stackAll"));
m.add (this.getMenuItem ("Unstack All", "unstackAll"));
this.optionsMenu = m =  new java.awt.Menu ("Options");
if (this.useFrame) mb.add (m);
 else this.mainMenu.add (m);
m.add (this.dotsCheckItem = this.getCheckItem ("Show Current"));
this.dotsCheckItem.setState (true);
m.add (this.voltsCheckItem = this.getCheckItem ("Show Voltage"));
this.voltsCheckItem.setState (true);
m.add (this.powerCheckItem = this.getCheckItem ("Show Power"));
m.add (this.showValuesCheckItem = this.getCheckItem ("Show Values"));
this.showValuesCheckItem.setState (true);
m.add (this.smallGridCheckItem = this.getCheckItem ("Small Grid"));
m.add (this.euroResistorCheckItem = this.getCheckItem ("European Resistors"));
this.euroResistorCheckItem.setState (euro);
m.add (this.printableCheckItem = this.getCheckItem ("White Background"));
this.printableCheckItem.setState (printable);
m.add (this.conventionCheckItem = this.getCheckItem ("Conventional Current Motion"));
this.conventionCheckItem.setState (convention);
m.add (this.optionsItem = this.getMenuItem ("Other Options..."));
var circuitsMenu =  new java.awt.Menu ("Circuits");
if (this.useFrame) mb.add (circuitsMenu);
 else this.mainMenu.add (circuitsMenu);
this.mainMenu.add (this.getClassCheckItem ("Add Wire", "WireElm"));
this.mainMenu.add (this.getClassCheckItem ("Add Resistor", "ResistorElm"));
var passMenu =  new java.awt.Menu ("Passive Components");
this.mainMenu.add (passMenu);
passMenu.add (this.getClassCheckItem ("Add Capacitor", "CapacitorElm"));
passMenu.add (this.getClassCheckItem ("Add Inductor", "InductorElm"));
passMenu.add (this.getClassCheckItem ("Add Switch", "SwitchElm"));
passMenu.add (this.getClassCheckItem ("Add Push Switch", "PushSwitchElm"));
passMenu.add (this.getClassCheckItem ("Add SPDT Switch", "Switch2Elm"));
passMenu.add (this.getClassCheckItem ("Add Potentiometer", "PotElm"));
passMenu.add (this.getClassCheckItem ("Add Transformer", "TransformerElm"));
passMenu.add (this.getClassCheckItem ("Add Tapped Transformer", "TappedTransformerElm"));
passMenu.add (this.getClassCheckItem ("Add Transmission Line", "TransLineElm"));
passMenu.add (this.getClassCheckItem ("Add Relay", "RelayElm"));
passMenu.add (this.getClassCheckItem ("Add Memristor", "MemristorElm"));
passMenu.add (this.getClassCheckItem ("Add Spark Gap", "SparkGapElm"));
var inputMenu =  new java.awt.Menu ("Inputs/Outputs");
this.mainMenu.add (inputMenu);
inputMenu.add (this.getClassCheckItem ("Add Ground", "GroundElm"));
inputMenu.add (this.getClassCheckItem ("Add Voltage Source (2-terminal)", "DCVoltageElm"));
inputMenu.add (this.getClassCheckItem ("Add A/C Source (2-terminal)", "ACVoltageElm"));
inputMenu.add (this.getClassCheckItem ("Add Voltage Source (1-terminal)", "RailElm"));
inputMenu.add (this.getClassCheckItem ("Add A/C Source (1-terminal)", "ACRailElm"));
inputMenu.add (this.getClassCheckItem ("Add Square Wave (1-terminal)", "SquareRailElm"));
inputMenu.add (this.getClassCheckItem ("Add Analog Output", "OutputElm"));
inputMenu.add (this.getClassCheckItem ("Add Logic Input", "LogicInputElm"));
inputMenu.add (this.getClassCheckItem ("Add Logic Output", "LogicOutputElm"));
inputMenu.add (this.getClassCheckItem ("Add Clock", "ClockElm"));
inputMenu.add (this.getClassCheckItem ("Add A/C Sweep", "SweepElm"));
inputMenu.add (this.getClassCheckItem ("Add Var. Voltage", "VarRailElm"));
inputMenu.add (this.getClassCheckItem ("Add Antenna", "AntennaElm"));
inputMenu.add (this.getClassCheckItem ("Add AM source", "AMElm"));
inputMenu.add (this.getClassCheckItem ("Add FM source", "FMElm"));
inputMenu.add (this.getClassCheckItem ("Add Current Source", "CurrentElm"));
inputMenu.add (this.getClassCheckItem ("Add LED", "LEDElm"));
inputMenu.add (this.getClassCheckItem ("Add Lamp (beta)", "LampElm"));
inputMenu.add (this.getClassCheckItem ("Add LED Matrix", "LEDMatrixElm"));
var activeMenu =  new java.awt.Menu ("Active Components");
this.mainMenu.add (activeMenu);
activeMenu.add (this.getClassCheckItem ("Add Diode", "DiodeElm"));
activeMenu.add (this.getClassCheckItem ("Add Zener Diode", "ZenerElm"));
activeMenu.add (this.getClassCheckItem ("Add Transistor (bipolar, NPN)", "NTransistorElm"));
activeMenu.add (this.getClassCheckItem ("Add Transistor (bipolar, PNP)", "PTransistorElm"));
activeMenu.add (this.getClassCheckItem ("Add Op Amp (- on top)", "OpAmpElm"));
activeMenu.add (this.getClassCheckItem ("Add Op Amp (+ on top)", "OpAmpSwapElm"));
activeMenu.add (this.getClassCheckItem ("Add MOSFET (n-channel)", "NMosfetElm"));
activeMenu.add (this.getClassCheckItem ("Add MOSFET (p-channel)", "PMosfetElm"));
activeMenu.add (this.getClassCheckItem ("Add JFET (n-channel)", "NJfetElm"));
activeMenu.add (this.getClassCheckItem ("Add JFET (p-channel)", "PJfetElm"));
activeMenu.add (this.getClassCheckItem ("Add Analog Switch (SPST)", "AnalogSwitchElm"));
activeMenu.add (this.getClassCheckItem ("Add Analog Switch (SPDT)", "AnalogSwitch2Elm"));
activeMenu.add (this.getClassCheckItem ("Add Tristate buffer", "TriStateElm"));
activeMenu.add (this.getClassCheckItem ("Add Schmitt Trigger", "SchmittElm"));
activeMenu.add (this.getClassCheckItem ("Add Schmitt Trigger (Inverting)", "InvertingSchmittElm"));
activeMenu.add (this.getClassCheckItem ("Add SCR", "SCRElm"));
activeMenu.add (this.getClassCheckItem ("Add Tunnel Diode", "TunnelDiodeElm"));
activeMenu.add (this.getClassCheckItem ("Add Triode", "TriodeElm"));
activeMenu.add (this.getClassCheckItem ("Add CCII+", "CC2Elm"));
activeMenu.add (this.getClassCheckItem ("Add CCII-", "CC2NegElm"));
var gateMenu =  new java.awt.Menu ("Logic Gates");
this.mainMenu.add (gateMenu);
gateMenu.add (this.getClassCheckItem ("Add Inverter", "InverterElm"));
gateMenu.add (this.getClassCheckItem ("Add NAND Gate", "NandGateElm"));
gateMenu.add (this.getClassCheckItem ("Add NOR Gate", "NorGateElm"));
gateMenu.add (this.getClassCheckItem ("Add AND Gate", "AndGateElm"));
gateMenu.add (this.getClassCheckItem ("Add OR Gate", "OrGateElm"));
gateMenu.add (this.getClassCheckItem ("Add XOR Gate", "XorGateElm"));
var chipMenu =  new java.awt.Menu ("Chips");
this.mainMenu.add (chipMenu);
chipMenu.add (this.getClassCheckItem ("Add D Flip-Flop", "DFlipFlopElm"));
chipMenu.add (this.getClassCheckItem ("Add JK Flip-Flop", "JKFlipFlopElm"));
chipMenu.add (this.getClassCheckItem ("Add T Flip-Flop", "TFlipFlopElm"));
chipMenu.add (this.getClassCheckItem ("Add 7 Segment LED", "SevenSegElm"));
chipMenu.add (this.getClassCheckItem ("Add 7 Segment Decoder", "SevenSegDecoderElm"));
chipMenu.add (this.getClassCheckItem ("Add Multiplexer", "MultiplexerElm"));
chipMenu.add (this.getClassCheckItem ("Add Demultiplexer", "DeMultiplexerElm"));
chipMenu.add (this.getClassCheckItem ("Add SIPO shift register", "SipoShiftElm"));
chipMenu.add (this.getClassCheckItem ("Add PISO shift register", "PisoShiftElm"));
chipMenu.add (this.getClassCheckItem ("Add Phase Comparator", "PhaseCompElm"));
chipMenu.add (this.getClassCheckItem ("Add Counter", "CounterElm"));
chipMenu.add (this.getClassCheckItem ("Add Decade Counter", "DecadeElm"));
chipMenu.add (this.getClassCheckItem ("Add 555 Timer", "TimerElm"));
chipMenu.add (this.getClassCheckItem ("Add DAC", "DACElm"));
chipMenu.add (this.getClassCheckItem ("Add ADC", "ADCElm"));
chipMenu.add (this.getClassCheckItem ("Add Latch", "LatchElm"));
chipMenu.add (this.getClassCheckItem ("Add Sequence generator", "SeqGenElm"));
chipMenu.add (this.getClassCheckItem ("Add VCO", "VCOElm"));
chipMenu.add (this.getClassCheckItem ("Add Full Adder", "FullAdderElm"));
chipMenu.add (this.getClassCheckItem ("Add Half Adder", "HalfAdderElm"));
chipMenu.add (this.getClassCheckItem ("Add Monostable", "MonostableElm"));
var otherMenu =  new java.awt.Menu ("Other");
this.mainMenu.add (otherMenu);
otherMenu.add (this.getClassCheckItem ("Add Text", "TextElm"));
otherMenu.add (this.getClassCheckItem ("Add Box", "BoxElm"));
otherMenu.add (this.getClassCheckItem ("Add Scope Probe", "ProbeElm"));
otherMenu.add (this.getCheckItem ("Drag All (Alt-drag)", "DragAll"));
otherMenu.add (this.getCheckItem (this.isMac ? "Drag Row (Alt-S-drag, S-right)" : "Drag Row (S-right)", "DragRow"));
otherMenu.add (this.getCheckItem (this.isMac ? "Drag Column (Alt-\u2318-drag, \u2318-right)" : "Drag Column (C-right)", "DragColumn"));
otherMenu.add (this.getCheckItem ("Drag Selected", "DragSelected"));
otherMenu.add (this.getCheckItem ("Drag Post (" + this.ctrlMetaKey + "-drag)", "DragPost"));
this.mainMenu.add (this.getCheckItem ("Select/Drag Selected (space or Shift-drag)", "Select"));
test.Circuit.CirSim.main.add (this.mainMenu);
test.Circuit.CirSim.main.add (this.resetButton =  new java.awt.Button ("Reset"));
this.resetButton.addActionListener (this);
this.dumpMatrixButton =  new java.awt.Button ("Dump Matrix");
this.dumpMatrixButton.addActionListener (this);
this.stoppedCheck =  new java.awt.Checkbox ("Stopped");
this.stoppedCheck.addItemListener (this);
test.Circuit.CirSim.main.add (this.stoppedCheck);
test.Circuit.CirSim.main.add ( new java.awt.Label ("Simulation Speed", 1));
test.Circuit.CirSim.main.add (this.speedBar =  new java.awt.Scrollbar (0, 3, 1, 0, 260));
this.speedBar.addAdjustmentListener (this);
test.Circuit.CirSim.main.add ( new java.awt.Label ("Current Speed", 1));
this.currentBar =  new java.awt.Scrollbar (0, 50, 1, 1, 100);
this.currentBar.addAdjustmentListener (this);
test.Circuit.CirSim.main.add (this.currentBar);
test.Circuit.CirSim.main.add (this.powerLabel =  new java.awt.Label ("Power Brightness", 1));
test.Circuit.CirSim.main.add (this.powerBar =  new java.awt.Scrollbar (0, 50, 1, 1, 100));
this.powerBar.addAdjustmentListener (this);
this.powerBar.disable ();
this.powerLabel.disable ();
test.Circuit.CirSim.main.add ( new java.awt.Label ("www.falstad.com"));
if (this.useFrame) test.Circuit.CirSim.main.add ( new java.awt.Label (""));
var f =  new java.awt.Font ("SansSerif", 0, 10);
var l;
l =  new java.awt.Label ("Current Circuit:");
l.setFont (f);
this.titleLabel =  new java.awt.Label ("Label");
this.titleLabel.setFont (f);
if (this.useFrame) {
test.Circuit.CirSim.main.add (l);
test.Circuit.CirSim.main.add (this.titleLabel);
}this.setGrid ();
this.elmList =  new java.util.Vector ();
this.undoStack =  new java.util.Vector ();
this.redoStack =  new java.util.Vector ();
this.scopes =  new Array (20);
this.scopeColCount =  Clazz.newIntArray (20, 0);
this.scopeCount = 0;
this.random =  new java.util.Random ();
this.cv.setBackground (java.awt.Color.black);
this.cv.setForeground (java.awt.Color.lightGray);
this.elmMenu =  new java.awt.PopupMenu ();
this.elmMenu.add (this.elmEditMenuItem = this.getMenuItem ("Edit"));
this.elmMenu.add (this.elmScopeMenuItem = this.getMenuItem ("View in Scope"));
this.elmMenu.add (this.elmCutMenuItem = this.getMenuItem ("Cut"));
this.elmMenu.add (this.elmCopyMenuItem = this.getMenuItem ("Copy"));
this.elmMenu.add (this.elmDeleteMenuItem = this.getMenuItem ("Delete"));
test.Circuit.CirSim.main.add (this.elmMenu);
this.scopeMenu = this.buildScopeMenu (false);
this.transScopeMenu = this.buildScopeMenu (true);
this.getSetupList (circuitsMenu, false);
if (this.useFrame) this.setMenuBar (mb);
if (this.startCircuitText != null) this.readSetup (this.startCircuitText);
 else if (this.stopMessage == null && this.startCircuit != null) this.readSetupFile (this.startCircuit, this.startLabel);
 else this.readSetup (null, 0, false);
if (this.useFrame) {
var screen = this.getToolkit ().getScreenSize ();
this.resize (860, 640);
this.handleResize ();
var x = this.getSize ();
this.setLocation (Clazz.doubleToInt ((screen.width - x.width) / 2), Clazz.doubleToInt ((screen.height - x.height) / 2));
this.show ();
} else {
if (!this.powerCheckItem.getState ()) {
test.Circuit.CirSim.main.remove (this.powerBar);
test.Circuit.CirSim.main.remove (this.powerLabel);
test.Circuit.CirSim.main.validate ();
}this.hide ();
this.handleResize ();
this.applet.validate ();
}this.requestFocus ();
this.addWindowListener (((Clazz.isClassDefined ("test.Circuit.CirSim$1") ? 0 : test.Circuit.CirSim.$CirSim$1$ ()), Clazz.innerTypeInstance (test.Circuit.CirSim$1, this, null)));
});
Clazz.defineMethod (c$, "triggerShow", 
function () {
if (!this.shown) this.show ();
this.shown = true;
});
Clazz.defineMethod (c$, "requestFocus", 
function () {
Clazz.superCall (this, test.Circuit.CirSim, "requestFocus", []);
this.cv.requestFocus ();
});
Clazz.defineMethod (c$, "buildScopeMenu", 
function (t) {
var m =  new java.awt.PopupMenu ();
m.add (this.getMenuItem ("Remove", "remove"));
m.add (this.getMenuItem ("Speed 2x", "speed2"));
m.add (this.getMenuItem ("Speed 1/2x", "speed1/2"));
m.add (this.getMenuItem ("Scale 2x", "scale"));
m.add (this.getMenuItem ("Max Scale", "maxscale"));
m.add (this.getMenuItem ("Stack", "stack"));
m.add (this.getMenuItem ("Unstack", "unstack"));
m.add (this.getMenuItem ("Reset", "reset"));
if (t) {
m.add (this.scopeIbMenuItem = this.getCheckItem ("Show Ib"));
m.add (this.scopeIcMenuItem = this.getCheckItem ("Show Ic"));
m.add (this.scopeIeMenuItem = this.getCheckItem ("Show Ie"));
m.add (this.scopeVbeMenuItem = this.getCheckItem ("Show Vbe"));
m.add (this.scopeVbcMenuItem = this.getCheckItem ("Show Vbc"));
m.add (this.scopeVceMenuItem = this.getCheckItem ("Show Vce"));
m.add (this.scopeVceIcMenuItem = this.getCheckItem ("Show Vce vs Ic"));
} else {
m.add (this.scopeVMenuItem = this.getCheckItem ("Show Voltage"));
m.add (this.scopeIMenuItem = this.getCheckItem ("Show Current"));
m.add (this.scopePowerMenuItem = this.getCheckItem ("Show Power Consumed"));
m.add (this.scopeMaxMenuItem = this.getCheckItem ("Show Peak Value"));
m.add (this.scopeMinMenuItem = this.getCheckItem ("Show Negative Peak Value"));
m.add (this.scopeFreqMenuItem = this.getCheckItem ("Show Frequency"));
m.add (this.scopeVIMenuItem = this.getCheckItem ("Show V vs I"));
m.add (this.scopeXYMenuItem = this.getCheckItem ("Plot X/Y"));
m.add (this.scopeSelectYMenuItem = this.getMenuItem ("Select Y", "selecty"));
m.add (this.scopeResistMenuItem = this.getCheckItem ("Show Resistance"));
}test.Circuit.CirSim.main.add (m);
return m;
}, "~B");
Clazz.defineMethod (c$, "getMenuItem", 
function (s) {
var mi =  new java.awt.MenuItem (s);
mi.addActionListener (this);
return mi;
}, "~S");
Clazz.defineMethod (c$, "getMenuItem", 
function (s, ac) {
var mi =  new java.awt.MenuItem (s);
mi.setActionCommand (ac);
mi.addActionListener (this);
return mi;
}, "~S,~S");
Clazz.defineMethod (c$, "getCheckItem", 
function (s) {
var mi =  new java.awt.CheckboxMenuItem (s);
mi.addItemListener (this);
mi.setActionCommand ("");
return mi;
}, "~S");
Clazz.defineMethod (c$, "getClassCheckItem", 
function (s, t) {
try {
var c = Clazz._4Name ("test.Circuit" + "." + t);
var elm = this.constructElement (c, 0, 0);
this.register (c, elm);
if (elm.needsShortcut ()) {
s += " (" + String.fromCharCode (elm.getShortcut ()) + ")";
}elm.$delete ();
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
ee.printStackTrace ();
} else {
throw ee;
}
}
return this.getCheckItem (s, t);
}, "~S,~S");
Clazz.defineMethod (c$, "getCheckItem", 
function (s, t) {
var mi =  new java.awt.CheckboxMenuItem (s);
mi.addItemListener (this);
mi.setActionCommand (t);
return mi;
}, "~S,~S");
Clazz.defineMethod (c$, "register", 
function (c, elm) {
var t = elm.getDumpType ();
if (t == 0) {
System.out.println ("no dump type: " + c);
return;
}var s = elm.getShortcut ();
if (elm.needsShortcut () && s == 0) {
if (s == 0) {
System.err.println ("no shortcut " + c + " for " + c);
return;
} else if (s <= 32 || s >= 127) {
System.err.println ("invalid shortcut " + c + " for " + c);
return;
}}var dclass = elm.getDumpClass ();
if (this.dumpTypes[t] != null && this.dumpTypes[t] !== dclass) {
System.out.println ("dump type conflict: " + c + " " + this.dumpTypes[t]);
return;
}this.dumpTypes[t] = dclass;
var sclass = elm.getClass ();
if (elm.needsShortcut () && this.shortcuts[s] != null && this.shortcuts[s] !== sclass) {
System.err.println ("shortcut conflict: " + c + " (previously assigned to " + this.shortcuts[s] + ")");
} else {
this.shortcuts[s] = sclass;
}}, "Class,test.Circuit.CircuitElm");
Clazz.defineMethod (c$, "handleResize", 
function () {
this.winSize = this.cv.getSize ();
if (this.winSize.width == 0) return;
this.dbimage = test.Circuit.CirSim.main.createImage (this.winSize.width, this.winSize.height);
var h = Clazz.doubleToInt (this.winSize.height / 5);
this.circuitArea =  new java.awt.Rectangle (0, 0, this.winSize.width, this.winSize.height - h);
var i;
var minx = 1000;
var maxx = 0;
var miny = 1000;
var maxy = 0;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
if (!ce.isCenteredText ()) {
minx = this.min (ce.x, this.min (ce.x2, minx));
maxx = this.max (ce.x, this.max (ce.x2, maxx));
}miny = this.min (ce.y, this.min (ce.y2, miny));
maxy = this.max (ce.y, this.max (ce.y2, maxy));
}
var dx = this.gridMask & (Clazz.doubleToInt ((this.circuitArea.width - (maxx - minx)) / 2) - minx);
var dy = this.gridMask & (Clazz.doubleToInt ((this.circuitArea.height - (maxy - miny)) / 2) - miny);
if (dx + minx < 0) dx = this.gridMask & (-minx);
if (dy + miny < 0) dy = this.gridMask & (-miny);
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.move (dx, dy);
}
this.needAnalyze ();
this.circuitBottom = 0;
});
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (this.applet == null) {
this.dispose ();
System.exit (0);
} else {
this.applet.destroyFrame ();
}});
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
this.destroyFrame ();
return true;
}return Clazz.superCall (this, test.Circuit.CirSim, "handleEvent", [ev]);
}, "java.awt.Event");
Clazz.overrideMethod (c$, "paint", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "updateCircuit", 
function (realg) {
var realMouseElm;
if (this.winSize == null || this.winSize.width == 0) return;
if (this.analyzeFlag) {
this.analyzeCircuit ();
this.analyzeFlag = false;
}if (test.Circuit.CirSim.editDialog != null && Clazz.instanceOf (test.Circuit.CirSim.editDialog.elm, test.Circuit.CircuitElm)) this.mouseElm = (test.Circuit.CirSim.editDialog.elm);
realMouseElm = this.mouseElm;
if (this.mouseElm == null) this.mouseElm = this.stopElm;
this.setupScopes ();
var g = null;
g = this.dbimage.getGraphics ();
g.setRenderingHint (java.awt.RenderingHints.KEY_ANTIALIASING, java.awt.RenderingHints.VALUE_ANTIALIAS_ON);
test.Circuit.CircuitElm.selectColor = java.awt.Color.cyan;
if (this.printableCheckItem.getState ()) {
test.Circuit.CircuitElm.whiteColor = java.awt.Color.black;
test.Circuit.CircuitElm.lightGrayColor = java.awt.Color.black;
g.setColor (java.awt.Color.white);
} else {
test.Circuit.CircuitElm.whiteColor = java.awt.Color.white;
test.Circuit.CircuitElm.lightGrayColor = java.awt.Color.lightGray;
g.setColor (java.awt.Color.black);
}g.fillRect (0, 0, this.winSize.width, this.winSize.height);
if (!this.stoppedCheck.getState ()) {
try {
this.runCircuit ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
this.analyzeFlag = true;
this.cv.repaint ();
return;
} else {
throw e;
}
}
}if (!this.stoppedCheck.getState ()) {
var sysTime = System.currentTimeMillis ();
if (this.lastTime != 0) {
var inc = (sysTime - this.lastTime);
var c = this.currentBar.getValue ();
c = java.lang.Math.exp (c / 3.5 - 14.2);
test.Circuit.CircuitElm.currentMult = 1.7 * inc * c;
if (!this.conventionCheckItem.getState ()) test.Circuit.CircuitElm.currentMult = -test.Circuit.CircuitElm.currentMult;
}if (sysTime - this.secTime >= 1000) {
this.framerate = this.frames;
this.steprate = this.steps;
this.frames = 0;
this.steps = 0;
this.secTime = sysTime;
}this.lastTime = sysTime;
} else this.lastTime = 0;
test.Circuit.CircuitElm.powerMult = Math.exp (this.powerBar.getValue () / 4.762 - 7);
var i;
var oldfont = g.getFont ();
for (i = 0; i != this.elmList.size (); i++) {
if (this.powerCheckItem.getState ()) g.setColor (java.awt.Color.gray);
this.getElm (i).draw (g);
}
if (this.tempMouseMode == 2 || this.tempMouseMode == 3 || this.tempMouseMode == 5 || this.tempMouseMode == 4) for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.drawPost (g, ce.x, ce.y);
ce.drawPost (g, ce.x2, ce.y2);
}
var badnodes = 0;
if (this.nodeList != null) for (i = 0; i != this.nodeList.size (); i++) {
var cn = this.getCircuitNode (i);
if (!cn.internal && cn.links.size () == 1) {
var bb = 0;
var j;
var cnl = cn.links.elementAt (0);
for (j = 0; j != this.elmList.size (); j++) {
var ce = this.getElm (j);
if (Clazz.instanceOf (ce, test.Circuit.GraphicElm)) continue;
if (cnl.elm !== ce && this.getElm (j).boundingBox.contains (cn.x, cn.y)) bb++;
}
if (bb > 0) {
g.setColor (java.awt.Color.red);
g.fillOval (cn.x - 3, cn.y - 3, 7, 7);
badnodes++;
}}}
if (this.dragElm != null && (this.dragElm.x != this.dragElm.x2 || this.dragElm.y != this.dragElm.y2)) this.dragElm.draw (g);
g.setFont (oldfont);
var ct = this.scopeCount;
if (this.stopMessage != null) ct = 0;
for (i = 0; i != ct; i++) this.scopes[i].draw (g);

g.setColor (test.Circuit.CircuitElm.whiteColor);
if (this.stopMessage != null) {
g.drawString (this.stopMessage, 10, this.circuitArea.height);
} else {
if (this.circuitBottom == 0) this.calcCircuitBottom ();
var info =  new Array (10);
if (this.mouseElm != null) {
if (this.mousePost == -1) this.mouseElm.getInfo (info);
 else info[0] = "V = " + test.Circuit.CircuitElm.getUnitText (this.mouseElm.getPostVoltage (this.mousePost), "V");
} else {
test.Circuit.CircuitElm.showFormat.setMinimumFractionDigits (2);
info[0] = "t = " + test.Circuit.CircuitElm.getUnitText (this.t, "s");
test.Circuit.CircuitElm.showFormat.setMinimumFractionDigits (0);
}if (this.hintType != -1) {
for (i = 0; info[i] != null; i++) ;
var s = this.getHint ();
if (s == null) this.hintType = -1;
 else info[i] = s;
}var x = 0;
if (ct != 0) x = this.scopes[ct - 1].rightEdge () + 20;
x = this.max (x, Clazz.doubleToInt (this.winSize.width * 2 / 3));
for (i = 0; info[i] != null; i++) ;
if (badnodes > 0) info[i++] = badnodes + ((badnodes == 1) ? " bad connection" : " bad connections");
var ybase = this.winSize.height - 15 * i - 5;
ybase = this.min (ybase, this.circuitArea.height);
ybase = this.max (ybase, this.circuitBottom);
for (i = 0; info[i] != null; i++) g.drawString (info[i], x, ybase + 15 * (i + 1));

}if (this.selectedArea != null) {
g.setColor (test.Circuit.CircuitElm.selectColor);
g.drawRect (this.selectedArea.x, this.selectedArea.y, this.selectedArea.width, this.selectedArea.height);
}this.mouseElm = realMouseElm;
this.frames++;
realg.drawImage (this.dbimage, 0, 0, this);
if (!this.stoppedCheck.getState () && this.circuitMatrix != null) {
var delay = 20 - (System.currentTimeMillis () - this.lastFrameTime);
if (delay > 0) {
try {
Thread.sleep (delay);
} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
} else {
throw e;
}
}
}this.cv.repaint (0);
}this.lastFrameTime = this.lastTime;
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setupScopes", 
function () {
var i;
var pos = -1;
for (i = 0; i < this.scopeCount; i++) {
if (this.locateElm (this.scopes[i].elm) < 0) this.scopes[i].setElm (null);
if (this.scopes[i].elm == null) {
var j;
for (j = i; j != this.scopeCount; j++) this.scopes[j] = this.scopes[j + 1];

this.scopeCount--;
i--;
continue;
}if (this.scopes[i].position > pos + 1) this.scopes[i].position = pos + 1;
pos = this.scopes[i].position;
}
while (this.scopeCount > 0 && this.scopes[this.scopeCount - 1].elm == null) this.scopeCount--;

var h = this.winSize.height - this.circuitArea.height;
pos = 0;
for (i = 0; i != this.scopeCount; i++) this.scopeColCount[i] = 0;

for (i = 0; i != this.scopeCount; i++) {
pos = this.max (this.scopes[i].position, pos);
this.scopeColCount[this.scopes[i].position]++;
}
var colct = pos + 1;
var iw = 120;
if (colct <= 2) iw = Clazz.doubleToInt (iw * 3 / 2);
var w = Clazz.doubleToInt ((this.winSize.width - iw) / colct);
var marg = 10;
if (w < marg * 2) w = marg * 2;
pos = -1;
var colh = 0;
var row = 0;
var speed = 0;
for (i = 0; i != this.scopeCount; i++) {
var s = this.scopes[i];
if (s.position > pos) {
pos = s.position;
colh = Clazz.doubleToInt (h / this.scopeColCount[pos]);
row = 0;
speed = s.speed;
}if (s.speed != speed) {
s.speed = speed;
s.resetGraph ();
}var r =  new java.awt.Rectangle (pos * w, this.winSize.height - h + colh * row, w - marg, colh);
row++;
if (!r.equals (s.rect)) s.setRect (r);
}
});
Clazz.defineMethod (c$, "getHint", 
function () {
var c1 = this.getElm (this.hintItem1);
var c2 = this.getElm (this.hintItem2);
if (c1 == null || c2 == null) return null;
if (this.hintType == 1) {
if (!(Clazz.instanceOf (c1, test.Circuit.InductorElm))) return null;
if (!(Clazz.instanceOf (c2, test.Circuit.CapacitorElm))) return null;
var ie = c1;
var ce = c2;
return "res.f = " + test.Circuit.CircuitElm.getUnitText (1 / (2 * 3.141592653589793 * Math.sqrt (ie.inductance * ce.capacitance)), "Hz");
}if (this.hintType == 2) {
if (!(Clazz.instanceOf (c1, test.Circuit.ResistorElm))) return null;
if (!(Clazz.instanceOf (c2, test.Circuit.CapacitorElm))) return null;
var re = c1;
var ce = c2;
return "RC = " + test.Circuit.CircuitElm.getUnitText (re.resistance * ce.capacitance, "s");
}if (this.hintType == 3) {
if (!(Clazz.instanceOf (c1, test.Circuit.ResistorElm))) return null;
if (!(Clazz.instanceOf (c2, test.Circuit.CapacitorElm))) return null;
var re = c1;
var ce = c2;
return "f.3db = " + test.Circuit.CircuitElm.getUnitText (1 / (2 * 3.141592653589793 * re.resistance * ce.capacitance), "Hz");
}if (this.hintType == 5) {
if (!(Clazz.instanceOf (c1, test.Circuit.ResistorElm))) return null;
if (!(Clazz.instanceOf (c2, test.Circuit.InductorElm))) return null;
var re = c1;
var ie = c2;
return "f.3db = " + test.Circuit.CircuitElm.getUnitText (re.resistance / (2 * 3.141592653589793 * ie.inductance), "Hz");
}if (this.hintType == 4) {
if (!(Clazz.instanceOf (c1, test.Circuit.ResistorElm))) return null;
if (!(Clazz.instanceOf (c2, test.Circuit.CapacitorElm))) return null;
var re = c1;
var ce = c2;
return "fc = " + test.Circuit.CircuitElm.getUnitText (1 / (2 * 3.141592653589793 * re.resistance * ce.capacitance), "Hz");
}return null;
});
Clazz.defineMethod (c$, "toggleSwitch", 
function (n) {
var i;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
if (Clazz.instanceOf (ce, test.Circuit.SwitchElm)) {
n--;
if (n == 0) {
(ce).toggle ();
this.analyzeFlag = true;
this.cv.repaint ();
return;
}}}
}, "~N");
Clazz.defineMethod (c$, "needAnalyze", 
function () {
this.analyzeFlag = true;
this.cv.repaint ();
});
Clazz.defineMethod (c$, "getCircuitNode", 
function (n) {
if (n >= this.nodeList.size ()) return null;
return this.nodeList.elementAt (n);
}, "~N");
Clazz.defineMethod (c$, "getElm", 
function (n) {
if (n >= this.elmList.size ()) return null;
return this.elmList.elementAt (n);
}, "~N");
Clazz.defineMethod (c$, "analyzeCircuit", 
function () {
this.calcCircuitBottom ();
if (this.elmList.isEmpty ()) return;
this.stopMessage = null;
this.stopElm = null;
var i;
var j;
var vscount = 0;
this.nodeList =  new java.util.Vector ();
var gotGround = false;
var gotRail = false;
var volt = null;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
if (Clazz.instanceOf (ce, test.Circuit.GroundElm)) {
gotGround = true;
break;
}if (Clazz.instanceOf (ce, test.Circuit.RailElm)) gotRail = true;
if (volt == null && Clazz.instanceOf (ce, test.Circuit.VoltageElm)) volt = ce;
}
if (!gotGround && volt != null && !gotRail) {
var cn =  new test.Circuit.CircuitNode ();
var pt = volt.getPost (0);
cn.x = pt.x;
cn.y = pt.y;
this.nodeList.addElement (cn);
} else {
var cn =  new test.Circuit.CircuitNode ();
cn.x = cn.y = -1;
this.nodeList.addElement (cn);
}for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
var inodes = ce.getInternalNodeCount ();
var ivs = ce.getVoltageSourceCount ();
var posts = ce.getPostCount ();
for (j = 0; j != posts; j++) {
var pt = ce.getPost (j);
var k;
for (k = 0; k != this.nodeList.size (); k++) {
var cn = this.getCircuitNode (k);
if (pt.x == cn.x && pt.y == cn.y) break;
}
if (k == this.nodeList.size ()) {
var cn =  new test.Circuit.CircuitNode ();
cn.x = pt.x;
cn.y = pt.y;
var cnl =  new test.Circuit.CircuitNodeLink ();
cnl.num = j;
cnl.elm = ce;
cn.links.addElement (cnl);
ce.setNode (j, this.nodeList.size ());
this.nodeList.addElement (cn);
} else {
var cnl =  new test.Circuit.CircuitNodeLink ();
cnl.num = j;
cnl.elm = ce;
this.getCircuitNode (k).links.addElement (cnl);
ce.setNode (j, k);
if (k == 0) ce.setNodeVoltage (j, 0);
}}
for (j = 0; j != inodes; j++) {
var cn =  new test.Circuit.CircuitNode ();
cn.x = cn.y = -1;
cn.internal = true;
var cnl =  new test.Circuit.CircuitNodeLink ();
cnl.num = j + posts;
cnl.elm = ce;
cn.links.addElement (cnl);
ce.setNode (cnl.num, this.nodeList.size ());
this.nodeList.addElement (cn);
}
vscount += ivs;
}
this.voltageSources =  new Array (vscount);
vscount = 0;
this.circuitNonLinear = false;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
if (ce.nonLinear ()) this.circuitNonLinear = true;
var ivs = ce.getVoltageSourceCount ();
for (j = 0; j != ivs; j++) {
this.voltageSources[vscount] = ce;
ce.setVoltageSource (j, vscount++);
}
}
this.voltageSourceCount = vscount;
var matrixSize = this.nodeList.size () - 1 + vscount;
this.circuitMatrix =  Clazz.newDoubleArray (matrixSize, matrixSize, 0);
this.circuitRightSide =  Clazz.newDoubleArray (matrixSize, 0);
this.origMatrix =  Clazz.newDoubleArray (matrixSize, matrixSize, 0);
this.origRightSide =  Clazz.newDoubleArray (matrixSize, 0);
this.circuitMatrixSize = this.circuitMatrixFullSize = matrixSize;
this.circuitRowInfo =  new Array (matrixSize);
this.circuitPermute =  Clazz.newIntArray (matrixSize, 0);
var vs = 0;
for (i = 0; i != matrixSize; i++) this.circuitRowInfo[i] =  new test.Circuit.RowInfo ();

this.circuitNeedsMap = false;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.stamp ();
}
var closure =  Clazz.newBooleanArray (this.nodeList.size (), false);
var tempclosure =  Clazz.newBooleanArray (this.nodeList.size (), false);
var changed = true;
closure[0] = true;
while (changed) {
changed = false;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
for (j = 0; j < ce.getPostCount (); j++) {
if (!closure[ce.getNode (j)]) {
if (ce.hasGroundConnection (j)) closure[ce.getNode (j)] = changed = true;
continue;
}var k;
for (k = 0; k != ce.getPostCount (); k++) {
if (j == k) continue;
var kn = ce.getNode (k);
if (ce.getConnection (j, k) && !closure[kn]) {
closure[kn] = true;
changed = true;
}}
}
}
if (changed) continue;
for (i = 0; i != this.nodeList.size (); i++) if (!closure[i] && !this.getCircuitNode (i).internal) {
System.out.println ("node " + i + " unconnected");
this.stampResistor (0, i, 1e8);
closure[i] = true;
changed = true;
break;
}
}
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
if (Clazz.instanceOf (ce, test.Circuit.InductorElm)) {
var fpi = Clazz.innerTypeInstance (test.Circuit.CirSim.FindPathInfo, this, null, 1, ce, ce.getNode (1));
if (!fpi.findPath (ce.getNode (0), 5) && !fpi.findPath (ce.getNode (0))) {
System.out.println (ce + " no path");
ce.reset ();
}}if (Clazz.instanceOf (ce, test.Circuit.CurrentElm)) {
var fpi = Clazz.innerTypeInstance (test.Circuit.CirSim.FindPathInfo, this, null, 1, ce, ce.getNode (1));
if (!fpi.findPath (ce.getNode (0))) {
this.stop ("No path for current source!", ce);
return;
}}if ((Clazz.instanceOf (ce, test.Circuit.VoltageElm) && ce.getPostCount () == 2) || Clazz.instanceOf (ce, test.Circuit.WireElm)) {
var fpi = Clazz.innerTypeInstance (test.Circuit.CirSim.FindPathInfo, this, null, 2, ce, ce.getNode (1));
if (fpi.findPath (ce.getNode (0))) {
this.stop ("Voltage source/wire loop with no resistance!", ce);
return;
}}if (Clazz.instanceOf (ce, test.Circuit.CapacitorElm)) {
var fpi = Clazz.innerTypeInstance (test.Circuit.CirSim.FindPathInfo, this, null, 3, ce, ce.getNode (1));
if (fpi.findPath (ce.getNode (0))) {
System.out.println (ce + " shorted");
ce.reset ();
} else {
fpi = Clazz.innerTypeInstance (test.Circuit.CirSim.FindPathInfo, this, null, 4, ce, ce.getNode (1));
if (fpi.findPath (ce.getNode (0))) {
this.stop ("Capacitor loop with no resistance!", ce);
return;
}}}}
for (i = 0; i != matrixSize; i++) {
var qm = -1;
var qp = -1;
var qv = 0;
var re = this.circuitRowInfo[i];
if (re.lsChanges || re.dropRow || re.rsChanges) continue;
var rsadd = 0;
for (j = 0; j != matrixSize; j++) {
var q = this.circuitMatrix[i][j];
if (this.circuitRowInfo[j].type == 1) {
rsadd -= this.circuitRowInfo[j].value * q;
continue;
}if (q == 0) continue;
if (qp == -1) {
qp = j;
qv = q;
continue;
}if (qm == -1 && q == -qv) {
qm = j;
continue;
}break;
}
if (j == matrixSize) {
if (qp == -1) {
this.stop ("Matrix error", null);
return;
}var elt = this.circuitRowInfo[qp];
if (qm == -1) {
var k;
for (k = 0; elt.type == 2 && k < 100; k++) {
qp = elt.nodeEq;
elt = this.circuitRowInfo[qp];
}
if (elt.type == 2) {
elt.type = 0;
continue;
}if (elt.type != 0) {
System.out.println ("type already " + elt.type + " for " + qp + "!");
continue;
}elt.type = 1;
elt.value = (this.circuitRightSide[i] + rsadd) / qv;
this.circuitRowInfo[i].dropRow = true;
i = -1;
} else if (this.circuitRightSide[i] + rsadd == 0) {
if (elt.type != 0) {
var qq = qm;
qm = qp;
qp = qq;
elt = this.circuitRowInfo[qp];
if (elt.type != 0) {
System.out.println ("swap failed");
continue;
}}elt.type = 2;
elt.nodeEq = qm;
this.circuitRowInfo[i].dropRow = true;
}}}
var nn = 0;
for (i = 0; i != matrixSize; i++) {
var elt = this.circuitRowInfo[i];
if (elt.type == 0) {
elt.mapCol = nn++;
continue;
}if (elt.type == 2) {
var e2 = null;
for (j = 0; j != 100; j++) {
e2 = this.circuitRowInfo[elt.nodeEq];
if (e2.type != 2) break;
if (i == e2.nodeEq) break;
elt.nodeEq = e2.nodeEq;
}
}if (elt.type == 1) elt.mapCol = -1;
}
for (i = 0; i != matrixSize; i++) {
var elt = this.circuitRowInfo[i];
if (elt.type == 2) {
var e2 = this.circuitRowInfo[elt.nodeEq];
if (e2.type == 1) {
elt.type = e2.type;
elt.value = e2.value;
elt.mapCol = -1;
} else {
elt.mapCol = e2.mapCol;
}}}
var newsize = nn;
var newmatx =  Clazz.newDoubleArray (newsize, newsize, 0);
var newrs =  Clazz.newDoubleArray (newsize, 0);
var ii = 0;
for (i = 0; i != matrixSize; i++) {
var rri = this.circuitRowInfo[i];
if (rri.dropRow) {
rri.mapRow = -1;
continue;
}newrs[ii] = this.circuitRightSide[i];
rri.mapRow = ii;
for (j = 0; j != matrixSize; j++) {
var ri = this.circuitRowInfo[j];
if (ri.type == 1) newrs[ii] -= ri.value * this.circuitMatrix[i][j];
 else newmatx[ii][ri.mapCol] += this.circuitMatrix[i][j];
}
ii++;
}
this.circuitMatrix = newmatx;
this.circuitRightSide = newrs;
matrixSize = this.circuitMatrixSize = newsize;
for (i = 0; i != matrixSize; i++) this.origRightSide[i] = this.circuitRightSide[i];

for (i = 0; i != matrixSize; i++) for (j = 0; j != matrixSize; j++) this.origMatrix[i][j] = this.circuitMatrix[i][j];


this.circuitNeedsMap = true;
if (!this.circuitNonLinear) {
if (!this.lu_factor (this.circuitMatrix, this.circuitMatrixSize, this.circuitPermute)) {
this.stop ("Singular matrix!", null);
return;
}}});
Clazz.defineMethod (c$, "calcCircuitBottom", 
function () {
var i;
this.circuitBottom = 0;
for (i = 0; i != this.elmList.size (); i++) {
var rect = this.getElm (i).boundingBox;
var bottom = rect.height + rect.y;
if (bottom > this.circuitBottom) this.circuitBottom = bottom;
}
});
Clazz.defineMethod (c$, "stop", 
function (s, ce) {
this.stopMessage = s;
this.circuitMatrix = null;
this.stopElm = ce;
this.stoppedCheck.setState (true);
this.analyzeFlag = false;
this.cv.repaint ();
}, "~S,test.Circuit.CircuitElm");
Clazz.defineMethod (c$, "stampVCVS", 
function (n1, n2, coef, vs) {
var vn = this.nodeList.size () + vs;
this.stampMatrix (vn, n1, coef);
this.stampMatrix (vn, n2, -coef);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "stampVoltageSource", 
function (n1, n2, vs, v) {
var vn = this.nodeList.size () + vs;
this.stampMatrix (vn, n1, -1);
this.stampMatrix (vn, n2, 1);
this.stampRightSide (vn, v);
this.stampMatrix (n1, vn, 1);
this.stampMatrix (n2, vn, -1);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "stampVoltageSource", 
function (n1, n2, vs) {
var vn = this.nodeList.size () + vs;
this.stampMatrix (vn, n1, -1);
this.stampMatrix (vn, n2, 1);
this.stampRightSide (vn);
this.stampMatrix (n1, vn, 1);
this.stampMatrix (n2, vn, -1);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "updateVoltageSource", 
function (n1, n2, vs, v) {
var vn = this.nodeList.size () + vs;
this.stampRightSide (vn, v);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "stampResistor", 
function (n1, n2, r) {
var r0 = 1 / r;
if (Double.isNaN (r0) || Double.isInfinite (r0)) {
System.out.print ("bad resistance " + r + " " + r0 + "\n");
var a = 0;
a /= a;
}this.stampMatrix (n1, n1, r0);
this.stampMatrix (n2, n2, r0);
this.stampMatrix (n1, n2, -r0);
this.stampMatrix (n2, n1, -r0);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "stampConductance", 
function (n1, n2, r0) {
this.stampMatrix (n1, n1, r0);
this.stampMatrix (n2, n2, r0);
this.stampMatrix (n1, n2, -r0);
this.stampMatrix (n2, n1, -r0);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "stampVCCurrentSource", 
function (cn1, cn2, vn1, vn2, g) {
this.stampMatrix (cn1, vn1, g);
this.stampMatrix (cn2, vn2, g);
this.stampMatrix (cn1, vn2, -g);
this.stampMatrix (cn2, vn1, -g);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "stampCurrentSource", 
function (n1, n2, i) {
this.stampRightSide (n1, -i);
this.stampRightSide (n2, i);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "stampCCCS", 
function (n1, n2, vs, gain) {
var vn = this.nodeList.size () + vs;
this.stampMatrix (n1, vn, gain);
this.stampMatrix (n2, vn, -gain);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "stampMatrix", 
function (i, j, x) {
if (i > 0 && j > 0) {
if (this.circuitNeedsMap) {
i = this.circuitRowInfo[i - 1].mapRow;
var ri = this.circuitRowInfo[j - 1];
if (ri.type == 1) {
this.circuitRightSide[i] -= x * ri.value;
return;
}j = ri.mapCol;
} else {
i--;
j--;
}this.circuitMatrix[i][j] += x;
}}, "~N,~N,~N");
Clazz.defineMethod (c$, "stampRightSide", 
function (i, x) {
if (i > 0) {
if (this.circuitNeedsMap) {
i = this.circuitRowInfo[i - 1].mapRow;
} else i--;
this.circuitRightSide[i] += x;
}}, "~N,~N");
Clazz.defineMethod (c$, "stampRightSide", 
function (i) {
if (i > 0) this.circuitRowInfo[i - 1].rsChanges = true;
}, "~N");
Clazz.defineMethod (c$, "stampNonLinear", 
function (i) {
if (i > 0) this.circuitRowInfo[i - 1].lsChanges = true;
}, "~N");
Clazz.defineMethod (c$, "getIterCount", 
function () {
if (this.speedBar.getValue () == 0) return 0;
return .1 * Math.exp ((this.speedBar.getValue () - 61) / 24.);
});
Clazz.defineMethod (c$, "runCircuit", 
function () {
if (this.circuitMatrix == null || this.elmList.size () == 0) {
this.circuitMatrix = null;
return;
}var iter;
var debugprint = this.dumpMatrix;
this.dumpMatrix = false;
var steprate = Clazz.doubleToLong (160 * this.getIterCount ());
var tm = System.currentTimeMillis ();
var lit = this.lastIterTime;
if (1000 >= steprate * (tm - this.lastIterTime)) return;
for (iter = 1; ; iter++) {
var i;
var j;
var k;
var subiter;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.startIteration ();
}
this.steps++;
var subiterCount = 5000;
for (subiter = 0; subiter != 5000; subiter++) {
this.converged = true;
this.subIterations = subiter;
for (i = 0; i != this.circuitMatrixSize; i++) this.circuitRightSide[i] = this.origRightSide[i];

if (this.circuitNonLinear) {
for (i = 0; i != this.circuitMatrixSize; i++) for (j = 0; j != this.circuitMatrixSize; j++) this.circuitMatrix[i][j] = this.origMatrix[i][j];


}for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.doStep ();
}
if (this.stopMessage != null) return;
var printit = debugprint;
debugprint = false;
for (j = 0; j != this.circuitMatrixSize; j++) {
for (i = 0; i != this.circuitMatrixSize; i++) {
var x = this.circuitMatrix[i][j];
if (Double.isNaN (x) || Double.isInfinite (x)) {
this.stop ("nan/infinite matrix!", null);
return;
}}
}
if (printit) {
for (j = 0; j != this.circuitMatrixSize; j++) {
for (i = 0; i != this.circuitMatrixSize; i++) System.out.print (this.circuitMatrix[j][i] + ",");

System.out.print ("  " + this.circuitRightSide[j] + "\n");
}
System.out.print ("\n");
}if (this.circuitNonLinear) {
if (this.converged && subiter > 0) break;
if (!this.lu_factor (this.circuitMatrix, this.circuitMatrixSize, this.circuitPermute)) {
this.stop ("Singular matrix!", null);
return;
}}this.lu_solve (this.circuitMatrix, this.circuitMatrixSize, this.circuitPermute, this.circuitRightSide);
for (j = 0; j != this.circuitMatrixFullSize; j++) {
var ri = this.circuitRowInfo[j];
var res = 0;
if (ri.type == 1) res = ri.value;
 else res = this.circuitRightSide[ri.mapCol];
if (Double.isNaN (res)) {
this.converged = false;
break;
}if (j < this.nodeList.size () - 1) {
var cn = this.getCircuitNode (j + 1);
for (k = 0; k != cn.links.size (); k++) {
var cnl = cn.links.elementAt (k);
cnl.elm.setNodeVoltage (cnl.num, res);
}
} else {
var ji = j - (this.nodeList.size () - 1);
this.voltageSources[ji].setCurrent (ji, res);
}}
if (!this.circuitNonLinear) break;
}
if (subiter > 5) System.out.print ("converged after " + subiter + " iterations\n");
if (subiter == 5000) {
this.stop ("Convergence failed!", null);
break;
}this.t += this.timeStep;
for (i = 0; i != this.scopeCount; i++) this.scopes[i].timeStep ();

tm = System.currentTimeMillis ();
lit = tm;
if (iter * 1000 >= steprate * (tm - this.lastIterTime) || (tm - this.lastFrameTime > 500)) break;
}
this.lastIterTime = lit;
});
Clazz.defineMethod (c$, "min", 
function (a, b) {
return (a < b) ? a : b;
}, "~N,~N");
Clazz.defineMethod (c$, "max", 
function (a, b) {
return (a > b) ? a : b;
}, "~N,~N");
Clazz.defineMethod (c$, "editFuncPoint", 
function (x, y) {
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
var ac = e.getActionCommand ();
if (e.getSource () === this.resetButton) {
var i;
this.dbimage = test.Circuit.CirSim.main.createImage (this.winSize.width, this.winSize.height);
for (i = 0; i != this.elmList.size (); i++) this.getElm (i).reset ();

for (i = 0; i != this.scopeCount; i++) this.scopes[i].resetGraph ();

this.analyzeFlag = true;
this.t = 0;
this.stoppedCheck.setState (false);
this.cv.repaint ();
}if (e.getSource () === this.dumpMatrixButton) this.dumpMatrix = true;
if (e.getSource () === this.exportItem) this.doExport (false);
if (e.getSource () === this.optionsItem) this.doEdit ( new test.Circuit.EditOptions (this));
if (e.getSource () === this.importItem) this.doImport ();
if (e.getSource () === this.exportLinkItem) this.doExport (true);
if (e.getSource () === this.undoItem) this.doUndo ();
if (e.getSource () === this.redoItem) this.doRedo ();
if (ac.compareTo ("Cut") == 0) {
if (e.getSource () !== this.elmCutMenuItem) this.menuElm = null;
this.doCut ();
}if (ac.compareTo ("Copy") == 0) {
if (e.getSource () !== this.elmCopyMenuItem) this.menuElm = null;
this.doCopy ();
}if (ac.compareTo ("Paste") == 0) this.doPaste ();
if (e.getSource () === this.selectAllItem) this.doSelectAll ();
if (e.getSource () === this.exitItem) {
this.destroyFrame ();
return;
}if (ac.compareTo ("stackAll") == 0) this.stackAll ();
if (ac.compareTo ("unstackAll") == 0) this.unstackAll ();
if (e.getSource () === this.elmEditMenuItem) this.doEdit (this.menuElm);
if (ac.compareTo ("Delete") == 0) {
if (e.getSource () !== this.elmDeleteMenuItem) this.menuElm = null;
this.doDelete ();
}if (e.getSource () === this.elmScopeMenuItem && this.menuElm != null) {
var i;
for (i = 0; i != this.scopeCount; i++) if (this.scopes[i].elm == null) break;

if (i == this.scopeCount) {
if (this.scopeCount == this.scopes.length) return;
this.scopeCount++;
this.scopes[i] =  new test.Circuit.Scope (this);
this.scopes[i].position = i;
this.handleResize ();
}this.scopes[i].setElm (this.menuElm);
}if (this.menuScope != -1) {
if (ac.compareTo ("remove") == 0) this.scopes[this.menuScope].setElm (null);
if (ac.compareTo ("speed2") == 0) this.scopes[this.menuScope].speedUp ();
if (ac.compareTo ("speed1/2") == 0) this.scopes[this.menuScope].slowDown ();
if (ac.compareTo ("scale") == 0) this.scopes[this.menuScope].adjustScale (.5);
if (ac.compareTo ("maxscale") == 0) this.scopes[this.menuScope].adjustScale (1e-50);
if (ac.compareTo ("stack") == 0) this.stackScope (this.menuScope);
if (ac.compareTo ("unstack") == 0) this.unstackScope (this.menuScope);
if (ac.compareTo ("selecty") == 0) this.scopes[this.menuScope].selectY ();
if (ac.compareTo ("reset") == 0) this.scopes[this.menuScope].resetGraph ();
this.cv.repaint ();
}if (ac.indexOf ("setup ") == 0) {
this.pushUndo ();
this.readSetupFile (ac.substring (6), (e.getSource ()).getLabel ());
}}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "stackScope", 
function (s) {
if (s == 0) {
if (this.scopeCount < 2) return;
s = 1;
}if (this.scopes[s].position == this.scopes[s - 1].position) return;
this.scopes[s].position = this.scopes[s - 1].position;
for (s++; s < this.scopeCount; s++) this.scopes[s].position--;

}, "~N");
Clazz.defineMethod (c$, "unstackScope", 
function (s) {
if (s == 0) {
if (this.scopeCount < 2) return;
s = 1;
}if (this.scopes[s].position != this.scopes[s - 1].position) return;
for (; s < this.scopeCount; s++) this.scopes[s].position++;

}, "~N");
Clazz.defineMethod (c$, "stackAll", 
function () {
var i;
for (i = 0; i != this.scopeCount; i++) {
this.scopes[i].position = 0;
this.scopes[i].$showMax = this.scopes[i].$showMin = false;
}
});
Clazz.defineMethod (c$, "unstackAll", 
function () {
var i;
for (i = 0; i != this.scopeCount; i++) {
this.scopes[i].position = i;
this.scopes[i].$showMax = true;
}
});
Clazz.defineMethod (c$, "doEdit", 
function (eable) {
this.clearSelection ();
this.pushUndo ();
if (test.Circuit.CirSim.editDialog != null) {
this.requestFocus ();
test.Circuit.CirSim.editDialog.setVisible (false);
test.Circuit.CirSim.editDialog = null;
}test.Circuit.CirSim.editDialog =  new test.Circuit.EditDialog (eable, this);
test.Circuit.CirSim.editDialog.show ();
}, "test.Circuit.Editable");
Clazz.defineMethod (c$, "doImport", 
function () {
if (test.Circuit.CirSim.impDialog == null) test.Circuit.CirSim.impDialog = test.Circuit.ImportExportDialogFactory.Create (this, test.Circuit.ImportExportDialog.Action.IMPORT);
this.pushUndo ();
test.Circuit.CirSim.impDialog.execute ();
});
Clazz.defineMethod (c$, "doExport", 
function (url) {
var dump = this.dumpCircuit ();
if (url) dump = this.baseURL + "#" + java.net.URLEncoder.encode (dump);
if (test.Circuit.CirSim.expDialog == null) {
test.Circuit.CirSim.expDialog = test.Circuit.ImportExportDialogFactory.Create (this, test.Circuit.ImportExportDialog.Action.EXPORT);
}test.Circuit.CirSim.expDialog.setDump (dump);
test.Circuit.CirSim.expDialog.execute ();
}, "~B");
Clazz.defineMethod (c$, "dumpCircuit", 
function () {
var i;
var f = (this.dotsCheckItem.getState ()) ? 1 : 0;
f |= (this.smallGridCheckItem.getState ()) ? 2 : 0;
f |= (this.voltsCheckItem.getState ()) ? 0 : 4;
f |= (this.powerCheckItem.getState ()) ? 8 : 0;
f |= (this.showValuesCheckItem.getState ()) ? 0 : 16;
var dump = "$ " + f + " " + this.timeStep + " " + this.getIterCount () + " " + this.currentBar.getValue () + " " + test.Circuit.CircuitElm.voltageRange + " " + this.powerBar.getValue () + "\n";
for (i = 0; i != this.elmList.size (); i++) dump += this.getElm (i).dump () + "\n";

for (i = 0; i != this.scopeCount; i++) {
var d = this.scopes[i].dump ();
if (d != null) dump += d + "\n";
}
if (this.hintType != -1) dump += "h " + this.hintType + " " + this.hintItem1 + " " + this.hintItem2 + "\n";
return dump;
});
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
System.out.print ((e.getSource ()).getValue () + "\n");
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "readUrlData", 
function (url) {
var o = url.getContent ();
var fis = o;
var ba =  new java.io.ByteArrayOutputStream (fis.available ());
var blen = 1024;
var b =  Clazz.newByteArray (blen, 0);
while (true) {
var len = fis.read (b);
if (len <= 0) break;
ba.write (b, 0, len);
}
return ba;
}, "java.net.URL");
Clazz.defineMethod (c$, "getCodeBase", 
function () {
try {
if (this.applet != null) {
var base = this.applet.getCodeBase ();
if (base.toString ().indexOf ("/bin/") >= 0) base =  new java.net.URL ("http://www.falstad.com/circuit-java/");
return base;
}var f =  new java.io.File (".");
return  new java.net.URL ("file:" + f.getCanonicalPath () + "/");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
return null;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "getSetupList", 
function (menu, retry) {
var stack =  new Array (6);
var stackptr = 0;
stack[stackptr++] = menu;
try {
var ba = null;
try {
var url =  new java.net.URL (this.getCodeBase () + "setuplist.txt");
ba = this.readUrlData (url);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
var url = this.getClass ().getClassLoader ().getResource ("setuplist.txt");
ba = this.readUrlData (url);
} else {
throw e;
}
}
var b = ba.toByteArray ();
var len = ba.size ();
var p;
if (len == 0 || b[0] != 35) {
this.getSetupList (menu, true);
return;
}for (p = 0; p < len; ) {
var l;
for (l = 0; l != len - p; l++) if (b[l + p] == 10) {
l++;
break;
}
var line =  String.instantialize (b, p, l - 1);
if (line.charAt (0) == '#') ; else if (line.charAt (0) == '+') {
var n =  new java.awt.Menu (line.substring (1));
menu.add (n);
menu = stack[stackptr++] = n;
} else if (line.charAt (0) == '-') {
menu = stack[--stackptr - 1];
} else {
var i = line.indexOf (' ');
if (i > 0) {
var title = line.substring (i + 1);
var first = false;
if (line.charAt (0) == '>') first = true;
var file = line.substring (first ? 1 : 0, i);
menu.add (this.getMenuItem (title, "setup " + file));
if (first && this.startCircuit == null) {
this.startCircuit = file;
this.startLabel = title;
}}}p += l;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
this.stop ("Can't read setuplist.txt!", null);
} else {
throw e;
}
}
}, "java.awt.Menu,~B");
Clazz.defineMethod (c$, "readSetup", 
function (text) {
this.readSetup (text, false);
}, "~S");
Clazz.defineMethod (c$, "readSetup", 
function (text, retain) {
this.readSetup (text.getBytes (), text.length, retain);
this.titleLabel.setText ("untitled");
}, "~S,~B");
Clazz.defineMethod (c$, "readSetupFile", 
function (str, title) {
this.t = 0;
System.out.println (str);
try {
var url =  new java.net.URL (this.getCodeBase () + "circuits/" + str);
var ba = this.readUrlData (url);
this.readSetup (ba.toByteArray (), ba.size (), false);
} catch (e1) {
if (Clazz.exceptionOf (e1, Exception)) {
try {
var url = this.getClass ().getClassLoader ().getResource ("circuits/" + str);
var ba = this.readUrlData (url);
this.readSetup (ba.toByteArray (), ba.size (), false);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
this.stop ("Unable to read " + str + "!", null);
} else {
throw e;
}
}
} else {
throw e1;
}
}
this.titleLabel.setText (title);
}, "~S,~S");
Clazz.defineMethod (c$, "readSetup", 
function (b, len, retain) {
var i;
if (!retain) {
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.$delete ();
}
this.elmList.removeAllElements ();
this.hintType = -1;
this.timeStep = 5e-6;
this.dotsCheckItem.setState (false);
this.smallGridCheckItem.setState (false);
this.powerCheckItem.setState (false);
this.voltsCheckItem.setState (true);
this.showValuesCheckItem.setState (true);
this.setGrid ();
this.speedBar.setValue (117);
this.currentBar.setValue (50);
this.powerBar.setValue (50);
test.Circuit.CircuitElm.voltageRange = 5;
this.scopeCount = 0;
}this.cv.repaint ();
var p;
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
if (tint == 111) {
var sc =  new test.Circuit.Scope (this);
sc.position = this.scopeCount;
sc.undump (st);
this.scopes[this.scopeCount++] = sc;
break;
}if (tint == 104) {
this.readHint (st);
break;
}if (tint == 36) {
this.readOptions (st);
break;
}if (tint == 37 || tint == 63 || tint == 66) {
break;
}if (tint >= 48 && tint <= 57) tint =  new Integer (type).intValue ();
var x1 =  new Integer (st.nextToken ()).intValue ();
var y1 =  new Integer (st.nextToken ()).intValue ();
var x2 =  new Integer (st.nextToken ()).intValue ();
var y2 =  new Integer (st.nextToken ()).intValue ();
var f =  new Integer (st.nextToken ()).intValue ();
var ce = null;
var cls = this.dumpTypes[tint];
if (cls == null) {
System.out.println ("unrecognized dump type: " + type);
break;
}var carr =  new Array (6);
carr[0] = carr[1] = carr[2] = carr[3] = carr[4] = Number;
carr[5] = java.util.StringTokenizer;
var cstr = null;
cstr = cls.getConstructor (carr);
var oarr =  new Array (6);
oarr[0] =  new Integer (x1);
oarr[1] =  new Integer (y1);
oarr[2] =  new Integer (x2);
oarr[3] =  new Integer (y2);
oarr[4] =  new Integer (f);
oarr[5] = st;
ce = cstr.newInstance (oarr);
ce.setPoints ();
this.elmList.addElement (ce);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.lang.reflect.InvocationTargetException)) {
var ee = e$$;
{
ee.getTargetException ().printStackTrace ();
break;
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var ee = e$$;
{
ee.printStackTrace ();
break;
}
} else {
throw e$$;
}
}
break;
}
p += l;
}
this.enableItems ();
if (!retain) this.handleResize ();
this.needAnalyze ();
}, "~A,~N,~B");
Clazz.defineMethod (c$, "readHint", 
function (st) {
this.hintType =  new Integer (st.nextToken ()).intValue ();
this.hintItem1 =  new Integer (st.nextToken ()).intValue ();
this.hintItem2 =  new Integer (st.nextToken ()).intValue ();
}, "java.util.StringTokenizer");
Clazz.defineMethod (c$, "readOptions", 
function (st) {
var flags =  new Integer (st.nextToken ()).intValue ();
this.dotsCheckItem.setState ((flags & 1) != 0);
this.smallGridCheckItem.setState ((flags & 2) != 0);
this.voltsCheckItem.setState ((flags & 4) == 0);
this.powerCheckItem.setState ((flags & 8) == 8);
this.showValuesCheckItem.setState ((flags & 16) == 0);
this.timeStep =  new Double (st.nextToken ()).doubleValue ();
var sp =  new Double (st.nextToken ()).doubleValue ();
var sp2 = Clazz.doubleToInt (Math.log (10 * sp) * 24 + 61.5);
this.speedBar.setValue (sp2);
this.currentBar.setValue ( new Integer (st.nextToken ()).intValue ());
test.Circuit.CircuitElm.voltageRange =  new Double (st.nextToken ()).doubleValue ();
try {
this.powerBar.setValue ( new Integer (st.nextToken ()).intValue ());
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.setGrid ();
}, "java.util.StringTokenizer");
Clazz.defineMethod (c$, "snapGrid", 
function (x) {
return (x + this.gridRound) & this.gridMask;
}, "~N");
Clazz.defineMethod (c$, "doSwitch", 
function (x, y) {
if (this.mouseElm == null || !(Clazz.instanceOf (this.mouseElm, test.Circuit.SwitchElm))) return false;
var se = this.mouseElm;
se.toggle ();
if (se.momentary) this.heldSwitchElm = se;
this.needAnalyze ();
return true;
}, "~N,~N");
Clazz.defineMethod (c$, "locateElm", 
function (elm) {
var i;
for (i = 0; i != this.elmList.size (); i++) if (elm === this.elmList.elementAt (i)) return i;

return -1;
}, "test.Circuit.CircuitElm");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
if ((e.getModifiers () & 4) != 0) {
var ex = e.getModifiersEx ();
if ((ex & (960)) == 0) return;
}if (!this.circuitArea.contains (e.getX (), e.getY ())) return;
if (this.dragElm != null) this.dragElm.drag (e.getX (), e.getY ());
var success = true;
switch (this.tempMouseMode) {
case 1:
this.dragAll (this.snapGrid (e.getX ()), this.snapGrid (e.getY ()));
break;
case 2:
this.dragRow (this.snapGrid (e.getX ()), this.snapGrid (e.getY ()));
break;
case 3:
this.dragColumn (this.snapGrid (e.getX ()), this.snapGrid (e.getY ()));
break;
case 5:
if (this.mouseElm != null) this.dragPost (this.snapGrid (e.getX ()), this.snapGrid (e.getY ()));
break;
case 6:
if (this.mouseElm == null) this.selectArea (e.getX (), e.getY ());
 else {
this.tempMouseMode = 4;
success = this.dragSelected (e.getX (), e.getY ());
}break;
case 4:
success = this.dragSelected (e.getX (), e.getY ());
break;
}
this.dragging = true;
if (success) {
if (this.tempMouseMode == 4 && Clazz.instanceOf (this.mouseElm, test.Circuit.GraphicElm)) {
this.dragX = e.getX ();
this.dragY = e.getY ();
} else {
this.dragX = this.snapGrid (e.getX ());
this.dragY = this.snapGrid (e.getY ());
}}this.cv.repaint (this.pause);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "dragAll", 
function (x, y) {
var dx = x - this.dragX;
var dy = y - this.dragY;
if (dx == 0 && dy == 0) return;
var i;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.move (dx, dy);
}
this.removeZeroLengthElements ();
}, "~N,~N");
Clazz.defineMethod (c$, "dragRow", 
function (x, y) {
var dy = y - this.dragY;
if (dy == 0) return;
var i;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
if (ce.y == this.dragY) ce.movePoint (0, 0, dy);
if (ce.y2 == this.dragY) ce.movePoint (1, 0, dy);
}
this.removeZeroLengthElements ();
}, "~N,~N");
Clazz.defineMethod (c$, "dragColumn", 
function (x, y) {
var dx = x - this.dragX;
if (dx == 0) return;
var i;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
if (ce.x == this.dragX) ce.movePoint (0, dx, 0);
if (ce.x2 == this.dragX) ce.movePoint (1, dx, 0);
}
this.removeZeroLengthElements ();
}, "~N,~N");
Clazz.defineMethod (c$, "dragSelected", 
function (x, y) {
var me = false;
if (this.mouseElm != null && !this.mouseElm.isSelected ()) this.mouseElm.setSelected (me = true);
var i;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
if (ce.isSelected () && !(Clazz.instanceOf (ce, test.Circuit.GraphicElm))) break;
}
if (i != this.elmList.size ()) {
x = this.snapGrid (x);
y = this.snapGrid (y);
}var dx = x - this.dragX;
var dy = y - this.dragY;
if (dx == 0 && dy == 0) {
if (me) this.mouseElm.setSelected (false);
return false;
}var allowed = true;
for (i = 0; allowed && i != this.elmList.size (); i++) {
var ce = this.getElm (i);
if (ce.isSelected () && !ce.allowMove (dx, dy)) allowed = false;
}
if (allowed) {
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
if (ce.isSelected ()) ce.move (dx, dy);
}
this.needAnalyze ();
}if (me) this.mouseElm.setSelected (false);
return allowed;
}, "~N,~N");
Clazz.defineMethod (c$, "dragPost", 
function (x, y) {
if (this.draggingPost == -1) {
this.draggingPost = (this.distanceSq (this.mouseElm.x, this.mouseElm.y, x, y) > this.distanceSq (this.mouseElm.x2, this.mouseElm.y2, x, y)) ? 1 : 0;
}var dx = x - this.dragX;
var dy = y - this.dragY;
if (dx == 0 && dy == 0) return;
this.mouseElm.movePoint (this.draggingPost, dx, dy);
this.needAnalyze ();
}, "~N,~N");
Clazz.defineMethod (c$, "selectArea", 
function (x, y) {
var x1 = this.min (x, this.initDragX);
var x2 = this.max (x, this.initDragX);
var y1 = this.min (y, this.initDragY);
var y2 = this.max (y, this.initDragY);
this.selectedArea =  new java.awt.Rectangle (x1, y1, x2 - x1, y2 - y1);
var i;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.selectRect (this.selectedArea);
}
}, "~N,~N");
Clazz.defineMethod (c$, "setSelectedElm", 
function (cs) {
var i;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.setSelected (ce === cs);
}
this.mouseElm = cs;
}, "test.Circuit.CircuitElm");
Clazz.defineMethod (c$, "removeZeroLengthElements", 
function () {
var i;
var changed = false;
for (i = this.elmList.size () - 1; i >= 0; i--) {
var ce = this.getElm (i);
if (ce.x == ce.x2 && ce.y == ce.y2) {
this.elmList.removeElementAt (i);
ce.$delete ();
changed = true;
}}
this.needAnalyze ();
});
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
if ((e.getModifiers () & 16) != 0) return;
var x = e.getX ();
var y = e.getY ();
this.dragX = this.snapGrid (x);
this.dragY = this.snapGrid (y);
this.draggingPost = -1;
var i;
var origMouse = this.mouseElm;
this.mouseElm = null;
this.mousePost = -1;
this.plotXElm = this.plotYElm = null;
var bestDist = 100000;
var bestArea = 100000;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
if (ce.boundingBox.contains (x, y)) {
var j;
var area = ce.boundingBox.width * ce.boundingBox.height;
var jn = ce.getPostCount ();
if (jn > 2) jn = 2;
for (j = 0; j != jn; j++) {
var pt = ce.getPost (j);
var dist = this.distanceSq (x, y, pt.x, pt.y);
if (dist <= bestDist && area <= bestArea) {
bestDist = dist;
bestArea = area;
this.mouseElm = ce;
}}
if (ce.getPostCount () == 0) this.mouseElm = ce;
}}
this.scopeSelected = -1;
if (this.mouseElm == null) {
for (i = 0; i != this.scopeCount; i++) {
var s = this.scopes[i];
if (s.rect.contains (x, y)) {
s.select ();
this.scopeSelected = i;
}}
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
var j;
var jn = ce.getPostCount ();
for (j = 0; j != jn; j++) {
var pt = ce.getPost (j);
var dist = this.distanceSq (x, y, pt.x, pt.y);
if (this.distanceSq (pt.x, pt.y, x, y) < 26) {
this.mouseElm = ce;
this.mousePost = j;
break;
}}
}
} else {
this.mousePost = -1;
for (i = 0; i != this.mouseElm.getPostCount (); i++) {
var pt = this.mouseElm.getPost (i);
if (this.distanceSq (pt.x, pt.y, x, y) < 26) this.mousePost = i;
}
}if (this.mouseElm !== origMouse) this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "distanceSq", 
function (x1, y1, x2, y2) {
x2 -= x1;
y2 -= y1;
return x2 * x2 + y2 * y2;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
if (e.getClickCount () == 2 && !this.didSwitch) this.doEditMenu (e);
if ((e.getModifiers () & 16) != 0) {
if (this.mouseMode == 6 || this.mouseMode == 4) this.clearSelection ();
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
this.scopeSelected = -1;
this.mouseElm = this.plotXElm = this.plotYElm = null;
this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
this.didSwitch = false;
System.out.println (e.getModifiers ());
var ex = e.getModifiersEx ();
if ((ex & (320)) == 0 && e.isPopupTrigger ()) {
this.doPopupMenu (e);
return;
}if ((e.getModifiers () & 16) != 0) {
this.tempMouseMode = this.mouseMode;
if ((ex & 512) != 0 && (ex & 256) != 0) this.tempMouseMode = 3;
 else if ((ex & 512) != 0 && (ex & 64) != 0) this.tempMouseMode = 2;
 else if ((ex & 64) != 0) this.tempMouseMode = 6;
 else if ((ex & 512) != 0) this.tempMouseMode = 1;
 else if ((ex & (384)) != 0) this.tempMouseMode = 5;
} else if ((e.getModifiers () & 4) != 0) {
if ((ex & 64) != 0) this.tempMouseMode = 2;
 else if ((ex & (384)) != 0) this.tempMouseMode = 3;
 else return;
}if (this.tempMouseMode != 6 && this.tempMouseMode != 4) this.clearSelection ();
if (this.doSwitch (e.getX (), e.getY ())) {
this.didSwitch = true;
return;
}this.pushUndo ();
this.initDragX = e.getX ();
this.initDragY = e.getY ();
this.dragging = true;
if (this.tempMouseMode != 0 || this.addingClass == null) return;
var x0 = this.snapGrid (e.getX ());
var y0 = this.snapGrid (e.getY ());
if (!this.circuitArea.contains (x0, y0)) return;
this.dragElm = this.constructElement (this.addingClass, x0, y0);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "constructElement", 
function (c, x0, y0) {
var carr =  new Array (2);
carr[0] = carr[1] = Number;
var cstr = null;
try {
cstr = c.getConstructor (carr);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, NoSuchMethodException)) {
var ee = e$$;
{
System.out.println ("caught NoSuchMethodException " + c);
return null;
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var ee = e$$;
{
ee.printStackTrace ();
return null;
}
} else {
throw e$$;
}
}
var oarr =  new Array (2);
oarr[0] =  new Integer (x0);
oarr[1] =  new Integer (y0);
try {
return cstr.newInstance (oarr);
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
ee.printStackTrace ();
} else {
throw ee;
}
}
return null;
}, "Class,~N,~N");
Clazz.defineMethod (c$, "doEditMenu", 
function (e) {
if (this.mouseElm != null) this.doEdit (this.mouseElm);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "doPopupMenu", 
function (e) {
this.menuElm = this.mouseElm;
this.menuScope = -1;
if (this.scopeSelected != -1) {
var m = this.scopes[this.scopeSelected].getMenu ();
this.menuScope = this.scopeSelected;
if (m != null) m.show (e.getComponent (), e.getX (), e.getY ());
} else if (this.mouseElm != null) {
this.elmEditMenuItem.setEnabled (this.mouseElm.getEditInfo (0) != null);
this.elmScopeMenuItem.setEnabled (this.mouseElm.canViewInScope ());
this.elmMenu.show (e.getComponent (), e.getX (), e.getY ());
} else {
this.doMainMenuChecks (this.mainMenu);
this.mainMenu.show (e.getComponent (), e.getX (), e.getY ());
}}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "doMainMenuChecks", 
function (m) {
var i;
if (m === this.optionsMenu) return;
for (i = 0; i != m.getItemCount (); i++) {
var mc = m.getItem (i);
if (Clazz.instanceOf (mc, java.awt.Menu)) this.doMainMenuChecks (mc);
if (Clazz.instanceOf (mc, java.awt.CheckboxMenuItem)) {
var cmi = mc;
cmi.setState (this.mouseModeStr.compareTo (cmi.getActionCommand ()) == 0);
}}
}, "java.awt.Menu");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
var ex = e.getModifiersEx ();
if ((ex & (448)) == 0 && e.isPopupTrigger ()) {
this.doPopupMenu (e);
return;
}this.tempMouseMode = this.mouseMode;
this.selectedArea = null;
this.dragging = false;
var circuitChanged = false;
if (this.heldSwitchElm != null) {
this.heldSwitchElm.mouseUp ();
this.heldSwitchElm = null;
circuitChanged = true;
}if (this.dragElm != null) {
if (this.dragElm.x == this.dragElm.x2 && this.dragElm.y == this.dragElm.y2) this.dragElm.$delete ();
 else {
this.elmList.addElement (this.dragElm);
circuitChanged = true;
}this.dragElm = null;
}if (circuitChanged) this.needAnalyze ();
if (this.dragElm != null) this.dragElm.$delete ();
this.dragElm = null;
this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "enableItems", 
function () {
if (this.powerCheckItem.getState ()) {
this.powerBar.enable ();
this.powerLabel.enable ();
} else {
this.powerBar.disable ();
this.powerLabel.disable ();
}this.enableUndoRedo ();
});
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
this.cv.repaint (this.pause);
var mi = e.getItemSelectable ();
if (mi === this.stoppedCheck) return;
if (mi === this.smallGridCheckItem) this.setGrid ();
if (mi === this.powerCheckItem) {
if (this.powerCheckItem.getState ()) this.voltsCheckItem.setState (false);
 else this.voltsCheckItem.setState (true);
}if (mi === this.voltsCheckItem && this.voltsCheckItem.getState ()) this.powerCheckItem.setState (false);
this.enableItems ();
if (this.menuScope != -1) {
var sc = this.scopes[this.menuScope];
sc.handleMenu (e, mi);
}if (Clazz.instanceOf (mi, java.awt.CheckboxMenuItem)) {
var mmi = mi;
var prevMouseMode = this.mouseMode;
this.setMouseMode (0);
var s = mmi.getActionCommand ();
if (s.length > 0) this.mouseModeStr = s;
if (s.compareTo ("DragAll") == 0) this.setMouseMode (1);
 else if (s.compareTo ("DragRow") == 0) this.setMouseMode (2);
 else if (s.compareTo ("DragColumn") == 0) this.setMouseMode (3);
 else if (s.compareTo ("DragSelected") == 0) this.setMouseMode (4);
 else if (s.compareTo ("DragPost") == 0) this.setMouseMode (5);
 else if (s.compareTo ("Select") == 0) this.setMouseMode (6);
 else if (s.length > 0) {
try {
this.addingClass = Clazz._4Name (s);
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
ee.printStackTrace ();
} else {
throw ee;
}
}
} else this.setMouseMode (prevMouseMode);
this.tempMouseMode = this.mouseMode;
}}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "setGrid", 
function () {
this.gridSize = (this.smallGridCheckItem.getState ()) ? 8 : 16;
this.gridMask = ~(this.gridSize - 1);
this.gridRound = Clazz.doubleToInt (this.gridSize / 2) - 1;
});
Clazz.defineMethod (c$, "pushUndo", 
function () {
this.redoStack.removeAllElements ();
var s = this.dumpCircuit ();
if (this.undoStack.size () > 0 && s.compareTo (this.undoStack.lastElement ()) == 0) return;
this.undoStack.add (s);
this.enableUndoRedo ();
});
Clazz.defineMethod (c$, "doUndo", 
function () {
if (this.undoStack.size () == 0) return;
this.redoStack.add (this.dumpCircuit ());
var s = this.undoStack.remove (this.undoStack.size () - 1);
this.readSetup (s);
this.enableUndoRedo ();
});
Clazz.defineMethod (c$, "doRedo", 
function () {
if (this.redoStack.size () == 0) return;
this.undoStack.add (this.dumpCircuit ());
var s = this.redoStack.remove (this.redoStack.size () - 1);
this.readSetup (s);
this.enableUndoRedo ();
});
Clazz.defineMethod (c$, "enableUndoRedo", 
function () {
this.redoItem.setEnabled (this.redoStack.size () > 0);
this.undoItem.setEnabled (this.undoStack.size () > 0);
});
Clazz.defineMethod (c$, "setMouseMode", 
function (mode) {
this.mouseMode = mode;
if (mode == 0) this.cv.setCursor ( new java.awt.Cursor (1));
 else this.cv.setCursor ( new java.awt.Cursor (0));
}, "~N");
Clazz.defineMethod (c$, "setMenuSelection", 
function () {
if (this.menuElm != null) {
if (this.menuElm.selected) return;
this.clearSelection ();
this.menuElm.setSelected (true);
}});
Clazz.defineMethod (c$, "doCut", 
function () {
var i;
this.pushUndo ();
this.setMenuSelection ();
this.clipboard = "";
for (i = this.elmList.size () - 1; i >= 0; i--) {
var ce = this.getElm (i);
if (ce.isSelected ()) {
this.clipboard += ce.dump () + "\n";
ce.$delete ();
this.elmList.removeElementAt (i);
}}
this.enablePaste ();
this.needAnalyze ();
});
Clazz.defineMethod (c$, "doDelete", 
function () {
var i;
this.pushUndo ();
this.setMenuSelection ();
var hasDeleted = false;
for (i = this.elmList.size () - 1; i >= 0; i--) {
var ce = this.getElm (i);
if (ce.isSelected ()) {
ce.$delete ();
this.elmList.removeElementAt (i);
hasDeleted = true;
}}
if (!hasDeleted) {
for (i = this.elmList.size () - 1; i >= 0; i--) {
var ce = this.getElm (i);
if (ce === this.mouseElm) {
ce.$delete ();
this.elmList.removeElementAt (i);
hasDeleted = true;
this.mouseElm = null;
break;
}}
}if (hasDeleted) this.needAnalyze ();
});
Clazz.defineMethod (c$, "doCopy", 
function () {
var i;
this.clipboard = "";
this.setMenuSelection ();
for (i = this.elmList.size () - 1; i >= 0; i--) {
var ce = this.getElm (i);
if (ce.isSelected ()) this.clipboard += ce.dump () + "\n";
}
this.enablePaste ();
});
Clazz.defineMethod (c$, "enablePaste", 
function () {
this.pasteItem.setEnabled (this.clipboard.length > 0);
});
Clazz.defineMethod (c$, "doPaste", 
function () {
this.pushUndo ();
this.clearSelection ();
var i;
var oldbb = null;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
var bb = ce.getBoundingBox ();
if (oldbb != null) oldbb = oldbb.union (bb);
 else oldbb = bb;
}
var oldsz = this.elmList.size ();
this.readSetup (this.clipboard, true);
var newbb = null;
for (i = oldsz; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.setSelected (true);
var bb = ce.getBoundingBox ();
if (newbb != null) newbb = newbb.union (bb);
 else newbb = bb;
}
if (oldbb != null && newbb != null && oldbb.intersects (newbb)) {
var dx = 0;
var dy = 0;
var spacew = this.circuitArea.width - oldbb.width - newbb.width;
var spaceh = this.circuitArea.height - oldbb.height - newbb.height;
if (spacew > spaceh) dx = this.snapGrid (oldbb.x + oldbb.width - newbb.x + this.gridSize);
 else dy = this.snapGrid (oldbb.y + oldbb.height - newbb.y + this.gridSize);
for (i = oldsz; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.move (dx, dy);
}
this.handleResize ();
}this.needAnalyze ();
});
Clazz.defineMethod (c$, "clearSelection", 
function () {
var i;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.setSelected (false);
}
});
Clazz.defineMethod (c$, "doSelectAll", 
function () {
var i;
for (i = 0; i != this.elmList.size (); i++) {
var ce = this.getElm (i);
ce.setSelected (true);
}
});
Clazz.overrideMethod (c$, "keyPressed", 
function (e) {
}, "java.awt.event.KeyEvent");
Clazz.overrideMethod (c$, "keyReleased", 
function (e) {
}, "java.awt.event.KeyEvent");
Clazz.overrideMethod (c$, "keyTyped", 
function (e) {
if ((e.getKeyChar ()).charCodeAt (0) == 127) {
this.doDelete ();
return;
}if (e.getKeyChar () > ' ' && (e.getKeyChar ()).charCodeAt (0) < 127) {
var c = this.shortcuts[e.getKeyChar ().charCodeAt (0)];
if (c == null) return;
var elm = null;
elm = this.constructElement (c, 0, 0);
if (elm == null) return;
this.setMouseMode (0);
this.mouseModeStr = c.getName ();
this.addingClass = c;
}if (e.getKeyChar () == ' ' || (e.getKeyChar ()).charCodeAt (0) == 27) {
this.setMouseMode (6);
this.mouseModeStr = "Select";
}this.tempMouseMode = this.mouseMode;
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "lu_factor", 
function (a, n, ipvt) {
var scaleFactors;
var i;
var j;
var k;
scaleFactors =  Clazz.newDoubleArray (n, 0);
for (i = 0; i != n; i++) {
var largest = 0;
for (j = 0; j != n; j++) {
var x = Math.abs (a[i][j]);
if (x > largest) largest = x;
}
if (largest == 0) return false;
scaleFactors[i] = 1.0 / largest;
}
for (j = 0; j != n; j++) {
for (i = 0; i != j; i++) {
var q = a[i][j];
for (k = 0; k != i; k++) q -= a[i][k] * a[k][j];

a[i][j] = q;
}
var largest = 0;
var largestRow = -1;
for (i = j; i != n; i++) {
var q = a[i][j];
for (k = 0; k != j; k++) q -= a[i][k] * a[k][j];

a[i][j] = q;
var x = Math.abs (q);
if (x >= largest) {
largest = x;
largestRow = i;
}}
if (j != largestRow) {
var x;
for (k = 0; k != n; k++) {
x = a[largestRow][k];
a[largestRow][k] = a[j][k];
a[j][k] = x;
}
scaleFactors[largestRow] = scaleFactors[j];
}ipvt[j] = largestRow;
if (a[j][j] == 0.0) {
System.out.println ("avoided zero");
a[j][j] = 1e-18;
}if (j != n - 1) {
var mult = 1.0 / a[j][j];
for (i = j + 1; i != n; i++) a[i][j] *= mult;

}}
return true;
}, "~A,~N,~A");
Clazz.defineMethod (c$, "lu_solve", 
function (a, n, ipvt, b) {
var i;
for (i = 0; i != n; i++) {
var row = ipvt[i];
var swap = b[row];
b[row] = b[i];
b[i] = swap;
if (swap != 0) break;
}
var bi = i++;
for (; i < n; i++) {
var row = ipvt[i];
var j;
var tot = b[row];
b[row] = b[i];
for (j = bi; j < i; j++) tot -= a[i][j] * b[j];

b[i] = tot;
}
for (i = n - 1; i >= 0; i--) {
var tot = b[i];
var j;
for (j = i + 1; j != n; j++) tot -= a[i][j] * b[j];

b[i] = tot / a[i][i];
}
}, "~A,~N,~A,~A");
c$.$CirSim$FindPathInfo$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.used = null;
this.dest = 0;
this.firstElm = null;
this.type = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit.CirSim, "FindPathInfo");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.dest = c;
this.type = a;
this.firstElm = b;
this.used =  Clazz.newBooleanArray (this.b$["test.Circuit.CirSim"].nodeList.size (), false);
}, "~N,test.Circuit.CircuitElm,~N");
Clazz.defineMethod (c$, "findPath", 
function (a) {
return this.findPath (a, -1);
}, "~N");
Clazz.defineMethod (c$, "findPath", 
function (a, b) {
if (a == this.dest) return true;
if (b-- == 0) return false;
if (this.used[a]) {
return false;
}this.used[a] = true;
var c;
for (c = 0; c != this.b$["test.Circuit.CirSim"].elmList.size (); c++) {
var d = this.b$["test.Circuit.CirSim"].getElm (c);
if (d === this.firstElm) continue;
if (this.type == 1) {
if (Clazz.instanceOf (d, test.Circuit.CurrentElm)) continue;
}if (this.type == 2) {
if (!(d.isWire () || Clazz.instanceOf (d, test.Circuit.VoltageElm))) continue;
}if (this.type == 3 && !d.isWire ()) continue;
if (this.type == 4) {
if (!(d.isWire () || Clazz.instanceOf (d, test.Circuit.CapacitorElm) || Clazz.instanceOf (d, test.Circuit.VoltageElm))) continue;
}if (a == 0) {
var e;
for (e = 0; e != d.getPostCount (); e++) if (d.hasGroundConnection (e) && this.findPath (d.getNode (e), b)) {
this.used[a] = false;
return true;
}
}var e;
for (e = 0; e != d.getPostCount (); e++) {
if (d.getNode (e) == a) break;
}
if (e == d.getPostCount ()) continue;
if (d.hasGroundConnection (e) && this.findPath (0, b)) {
this.used[a] = false;
return true;
}if (this.type == 1 && Clazz.instanceOf (d, test.Circuit.InductorElm)) {
var f = d.getCurrent ();
if (e == 0) f = -f;
if (Math.abs (f - this.firstElm.getCurrent ()) > 1e-10) continue;
}var f;
for (f = 0; f != d.getPostCount (); f++) {
if (e == f) continue;
if (d.getConnection (e, f) && this.findPath (d.getNode (f), b)) {
this.used[a] = false;
return true;
}}
}
this.used[a] = false;
return false;
}, "~N,~N");
Clazz.defineStatics (c$,
"INDUCT", 1,
"VOLTAGE", 2,
"SHORT", 3,
"CAP_V", 4);
c$ = Clazz.p0p ();
};
c$.$CirSim$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (test.Circuit, "CirSim$1", java.awt.event.WindowAdapter);
Clazz.overrideMethod (c$, "windowClosing", 
function (we) {
this.b$["test.Circuit.CirSim"].destroyFrame ();
}, "java.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"sourceRadius", 7,
"freqMult", 25.1327412,
"main", null,
"pi", 3.14159265358979323846,
"MODE_ADD_ELM", 0,
"MODE_DRAG_ALL", 1,
"MODE_DRAG_ROW", 2,
"MODE_DRAG_COLUMN", 3,
"MODE_DRAG_SELECTED", 4,
"MODE_DRAG_POST", 5,
"MODE_SELECT", 6,
"infoWidth", 120,
"HINT_LC", 1,
"HINT_RC", 2,
"HINT_3DB_C", 3,
"HINT_TWINT", 4,
"HINT_3DB_L", 5,
"BASE_PACKAGE", "test.Circuit",
"editDialog", null,
"impDialog", null,
"expDialog", null,
"muString", "u",
"ohmString", "ohm",
"resct", 6);
});
