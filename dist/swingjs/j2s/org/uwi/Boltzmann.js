Clazz.declarePackage ("org.uwi");
Clazz.load (["java.awt.event.ActionListener", "$.MouseAdapter", "javax.swing.JApplet", "$.JTextArea", "java.awt.Color", "JU.SB", "javax.swing.BorderFactory", "$.JButton", "$.JLabel", "$.JPanel", "$.JScrollPane", "$.JTextField", "org.uwi.BoltzCanvas", "$.EntropyCanvas"], "org.uwi.Boltzmann", ["java.awt.Dimension", "$.FlowLayout", "$.GridBagConstraints", "$.GridBagLayout", "$.Insets", "java.text.DecimalFormat", "org.uwi.SimThread"], function () {
c$ = Clazz.decorateAsClass (function () {
this.BoltzSimGraph = null;
this.DispBoltz = null;
this.EntropyGraph = null;
this.DispEntropy = null;
this.lineBorder1 = null;
this.lineBorder2 = null;
this.UserInput = null;
this.lQuanta = null;
this.lParticles = null;
this.lCollisions = null;
this.tEnergy = null;
this.tParticles = null;
this.tCollisions = null;
this.bStartSim = null;
this.DispResults = null;
this.ShowText = null;
this.initialEnergy = 0;
this.curMaxEnergy = 0;
this.maxParticles = 0;
this.maxCollisions = 0;
this.particleEnergy = null;
this.EntropyCalcs = 0;
this.start_pressed = false;
if (!Clazz.isClassDefined ("org.uwi.Boltzmann.SymAction")) {
org.uwi.Boltzmann.$Boltzmann$SymAction$ ();
}
if (!Clazz.isClassDefined ("org.uwi.Boltzmann.LevelInfoArea")) {
org.uwi.Boltzmann.$Boltzmann$LevelInfoArea$ ();
}
this.simThread = null;
if (!Clazz.isClassDefined ("org.uwi.Boltzmann.SymMouse")) {
org.uwi.Boltzmann.$Boltzmann$SymMouse$ ();
}
this.particle1 = 0;
this.particle2 = 0;
this.e1 = 0;
this.e2 = 0;
this.collisionEnergy = 0;
this.numOfCollisions = 0;
this.displayFactor = 0;
this.entropyFactor = 0;
Clazz.instantialize (this, arguments);
}, org.uwi, "Boltzmann", javax.swing.JApplet);
Clazz.prepareFields (c$, function () {
this.BoltzSimGraph =  new javax.swing.JPanel ();
this.DispBoltz =  new org.uwi.BoltzCanvas (this);
this.EntropyGraph =  new javax.swing.JPanel ();
this.DispEntropy =  new org.uwi.EntropyCanvas ();
this.lineBorder1 = javax.swing.BorderFactory.createLineBorder (java.awt.Color.black);
this.lineBorder2 = javax.swing.BorderFactory.createLineBorder (java.awt.Color.black);
this.UserInput =  new javax.swing.JPanel ();
this.lQuanta =  new javax.swing.JLabel ();
this.lParticles =  new javax.swing.JLabel ();
this.lCollisions =  new javax.swing.JLabel ();
this.tEnergy =  new javax.swing.JTextField ();
this.tParticles =  new javax.swing.JTextField ();
this.tCollisions =  new javax.swing.JTextField ();
this.bStartSim =  new javax.swing.JButton ();
this.DispResults =  new javax.swing.JScrollPane ();
this.ShowText = Clazz.innerTypeInstance (org.uwi.Boltzmann.LevelInfoArea, this, null);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.uwi.Boltzmann, []);
this.setName ("Boltzmann");
});
Clazz.overrideMethod (c$, "init", 
function () {
this.getContentPane ().setLayout (null);
this.setSize (562, 391);
this.BoltzSimGraph.setBorder (this.lineBorder2);
this.BoltzSimGraph.setLayout ( new java.awt.FlowLayout (1, 5, 5));
this.getContentPane ().add (this.BoltzSimGraph);
this.BoltzSimGraph.setBackground (java.awt.Color.white);
this.BoltzSimGraph.setBounds (0, 0, 384, 300);
this.BoltzSimGraph.add (this.DispBoltz);
this.DispBoltz.setPreferredSize ( new java.awt.Dimension (380, 294));
this.DispBoltz.setBounds (2, 6, 380, 294);
this.EntropyGraph.setBorder (this.lineBorder1);
this.EntropyGraph.setLayout ( new java.awt.FlowLayout (1, 5, 5));
this.getContentPane ().add (this.EntropyGraph);
this.EntropyGraph.setBackground (java.awt.Color.white);
this.EntropyGraph.setBounds (384, 0, 180, 156);
this.EntropyGraph.add (this.DispEntropy);
this.DispEntropy.setPreferredSize ( new java.awt.Dimension (178, 150));
this.DispEntropy.setBounds (1, 6, 178, 150);
this.UserInput.setLayout ( new java.awt.GridBagLayout ());
this.getContentPane ().add (this.UserInput);
this.UserInput.setBackground (java.awt.Color.yellow);
this.UserInput.setBounds (0, 300, 384, 96);
this.lQuanta.setText ("Initial Energy");
this.UserInput.add (this.lQuanta,  new java.awt.GridBagConstraints (0, 0, 1, 1, 1.0, 1.0, 10, 0,  new java.awt.Insets (0, 0, 0, 0), 0, 0));
this.lQuanta.setBounds (15, 6, 97, 15);
this.lParticles.setText ("No. of Particles");
this.UserInput.add (this.lParticles,  new java.awt.GridBagConstraints (1, 0, 1, 1, 1.0, 0.0, 10, 0,  new java.awt.Insets (0, 0, 0, 0), 0, 0));
this.lParticles.setBounds (149, 6, 86, 15);
this.lCollisions.setText ("No. of Collisions");
this.UserInput.add (this.lCollisions,  new java.awt.GridBagConstraints (2, 0, 1, 1, 1.0, 0.0, 10, 0,  new java.awt.Insets (0, 0, 0, 0), 0, 0));
this.lCollisions.setBounds (275, 6, 90, 15);
this.tEnergy.setAutoscrolls (false);
this.tEnergy.setColumns (10);
this.tEnergy.setNextFocusableComponent (this.tParticles);
this.UserInput.add (this.tEnergy,  new java.awt.GridBagConstraints (0, 1, 1, 1, 1.0, 1.0, 10, 0,  new java.awt.Insets (0, 0, 0, 0), 0, 0));
this.tEnergy.setBounds (9, 33, 110, 19);
this.tParticles.setAutoscrolls (false);
this.tParticles.setColumns (10);
this.tParticles.setNextFocusableComponent (this.tCollisions);
this.UserInput.add (this.tParticles,  new java.awt.GridBagConstraints (1, 1, 1, 1, 1.0, 1.0, 10, 0,  new java.awt.Insets (0, 0, 0, 0), 0, 0));
this.tParticles.setBounds (137, 33, 110, 19);
this.tCollisions.setAutoscrolls (false);
this.tCollisions.setColumns (10);
this.tCollisions.setNextFocusableComponent (this.bStartSim);
this.UserInput.add (this.tCollisions,  new java.awt.GridBagConstraints (2, 1, 1, 1, 1.0, 1.0, 10, 0,  new java.awt.Insets (0, 0, 0, 0), 0, 0));
this.tCollisions.setBounds (265, 33, 110, 19);
this.bStartSim.setText ("Start");
this.bStartSim.setActionCommand ("Start");
this.bStartSim.setNextFocusableComponent (this.tEnergy);
this.UserInput.add (this.bStartSim,  new java.awt.GridBagConstraints (1, 2, 1, 1, 1.0, 1.0, 10, 0,  new java.awt.Insets (0, 0, 0, 0), 0, 0));
this.bStartSim.setBackground (java.awt.Color.green);
this.bStartSim.setBounds (160, 64, 63, 25);
this.DispResults.setHorizontalScrollBarPolicy (31);
this.DispResults.setVerticalScrollBarPolicy (22);
this.DispResults.setOpaque (true);
this.getContentPane ().add (this.DispResults);
this.DispResults.setBounds (384, 156, 180, 240);
this.ShowText.setRows (10000);
this.ShowText.setDisabledTextColor ( new java.awt.Color (153, 153, 153));
this.DispResults.getViewport ().add (this.ShowText);
this.ShowText.setBounds (0, 0, 162, 150000);
var lSymAction = Clazz.innerTypeInstance (org.uwi.Boltzmann.SymAction, this, null);
this.bStartSim.addActionListener (lSymAction);
this.tEnergy.addActionListener (lSymAction);
this.tParticles.addActionListener (lSymAction);
this.tCollisions.addActionListener (lSymAction);
var aSymMouse = Clazz.innerTypeInstance (org.uwi.Boltzmann.SymMouse, this, null);
this.ShowText.addMouseListener (aSymMouse);
this.setBackground (java.awt.Color.white);
this.maxParticles = 10000;
this.maxCollisions = 60000;
this.initialEnergy = 250;
this.EntropyCalcs = 50;
this.tEnergy.setText (Integer.toString (this.initialEnergy));
this.tParticles.setText (Integer.toString (this.maxParticles));
this.tCollisions.setText (Integer.toString (this.maxCollisions));
this.initEnvironment ();
});
Clazz.defineMethod (c$, "bStartSim_actionPerformed", 
function (event) {
if (!this.initEnvironment ()) return;
if (this.simThread != null) this.simThread.interrupt ();
this.simThread =  new org.uwi.SimThread (this);
this.simThread.start ();
}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "initEnvironment", 
function () {
try {
var tmp = (Integer.parseInt (this.tCollisions.getText ().trim ()));
if (tmp >= 0) this.maxCollisions = tmp;
tmp = (Integer.parseInt (this.tEnergy.getText ().trim ()));
if (tmp > 0) this.initialEnergy = tmp;
tmp = (Integer.parseInt (this.tParticles.getText ().trim ()));
if (tmp >= 0) this.maxParticles = tmp;
} catch (e) {
if (Clazz.exceptionOf (e, NumberFormatException)) {
return false;
} else {
throw e;
}
}
this.DispBoltz.maxEnergy = 20 * this.initialEnergy;
this.particleEnergy =  Clazz.newIntArray (this.maxParticles, 0);
this.DispBoltz.energyLevels =  Clazz.newIntArray (this.DispBoltz.maxEnergy + 1, 0);
this.curMaxEnergy = this.initialEnergy;
this.DispEntropy.Entropy =  Clazz.newDoubleArray (this.EntropyCalcs + 1, 0);
this.DispEntropy.EntropyCalc = this.EntropyCalcs;
this.DispEntropy.entCounter = 0;
for (var i = 0; i < this.maxParticles; i++) {
this.particleEnergy[i] = this.initialEnergy;
}
for (var i = 0; i <= this.DispBoltz.maxEnergy; i++) {
this.DispBoltz.energyLevels[i] = 0;
}
for (var i = 0; i < this.EntropyCalcs; i++) {
this.DispEntropy.Entropy[i] = 0;
}
this.DispBoltz.energyLevels[this.initialEnergy] = this.maxParticles;
return true;
});
Clazz.defineMethod (c$, "calcEntropy", 
function (x) {
var i;
this.DispEntropy.Entropy[x] = this.maxParticles * Math.log (this.maxParticles);
for (i = 0; i <= this.curMaxEnergy; i++) if (this.DispBoltz.energyLevels[i] > 0) this.DispEntropy.Entropy[x] = this.DispEntropy.Entropy[x] - (this.DispBoltz.energyLevels[i] * Math.log (this.DispBoltz.energyLevels[i]));

}, "~N");
Clazz.defineMethod (c$, "ShowText_mouseReleased", 
function (event) {
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "sjs_initSimulation", 
function () {
this.numOfCollisions = this.maxCollisions;
this.entropyFactor = Clazz.doubleToInt (Math.ceil (Clazz.doubleToInt (this.maxCollisions / this.EntropyCalcs)));
{
this.displayFactor = 100;
}});
Clazz.defineMethod (c$, "sjs_loopSimulation", 
function () {
this.particle1 = Clazz.doubleToInt ((this.maxParticles - 1) * Math.random ());
this.particle2 = Clazz.doubleToInt ((this.maxParticles - 1) * Math.random ());
while (this.particle1 == this.particle2) {
this.particle2 = Clazz.doubleToInt ((this.maxParticles - 1) * Math.random ());
}
if (this.particleEnergy[this.particle1] < this.particleEnergy[this.particle2]) {
var temp = this.particleEnergy[this.particle1];
this.particleEnergy[this.particle1] = this.particleEnergy[this.particle2];
this.particleEnergy[this.particle2] = temp;
}this.e1 = this.particleEnergy[this.particle1];
this.e2 = this.particleEnergy[this.particle2];
this.collisionEnergy = Clazz.doubleToInt (Math.ceil (this.e1 * Math.random ()));
this.particleEnergy[this.particle1] = this.e1 - this.collisionEnergy;
this.particleEnergy[this.particle2] = this.e2 + this.collisionEnergy;
this.DispBoltz.energyLevels[this.e1] = this.DispBoltz.energyLevels[this.e1] - 1;
this.DispBoltz.energyLevels[this.e2] = this.DispBoltz.energyLevels[this.e2] - 1;
this.e1 = this.particleEnergy[this.particle1];
this.e2 = this.particleEnergy[this.particle2];
this.DispBoltz.energyLevels[this.e1] = this.DispBoltz.energyLevels[this.e1] + 1;
this.DispBoltz.energyLevels[this.e2] = this.DispBoltz.energyLevels[this.e2] + 1;
if (this.e1 < this.e2) this.e1 = this.e2;
if (this.e1 > this.curMaxEnergy) this.curMaxEnergy = this.e1;
this.DispBoltz.maxEnergy = this.curMaxEnergy;
return (--this.numOfCollisions > 0);
});
Clazz.defineMethod (c$, "sjs_finalizeGraph", 
function () {
for (var i = this.curMaxEnergy; i > 0; i--) {
if (this.DispBoltz.energyLevels[i] < 1) this.curMaxEnergy--;
 else break;
}
this.showTheText ();
});
Clazz.defineMethod (c$, "showTheText", 
 function () {
this.ShowText.levelInfo.setLength (0);
this.ShowText.appendLine ("Init. Energy   = " + this.initialEnergy);
this.ShowText.appendLine ("No. particles  = " + this.maxParticles);
this.ShowText.appendLine ("No. collisions = " + this.maxCollisions);
this.ShowText.appendLine ("-------------");
for (var i = 1; i <= this.curMaxEnergy; i++) this.ShowText.appendLine ("EL " + i + "= " + this.DispBoltz.energyLevels[i]);

this.ShowText.appendLine ("-------------");
var df =  new java.text.DecimalFormat ("0.00");
for (var i = 0; i < this.EntropyCalcs; i++) this.ShowText.appendLine ("WL " + i + "= " + df.format (this.DispEntropy.Entropy[i]));

this.ShowText.setRows (this.curMaxEnergy + this.EntropyCalcs + 2);
this.ShowText.setText (this.ShowText.levelInfo.toString ());
this.repaint ();
});
Clazz.defineMethod (c$, "sjs_checkRepaint", 
function () {
if ((this.numOfCollisions % this.entropyFactor) == 0) {
this.calcEntropy (this.DispEntropy.entCounter++);
this.DispEntropy.invalidate ();
}if ((this.numOfCollisions % this.displayFactor) != 1) return false;
this.repaint ();
return true;
});
c$.$Boltzmann$SymAction$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.uwi.Boltzmann, "SymAction", null, java.awt.event.ActionListener);
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = a.getSource ();
this.b$["org.uwi.Boltzmann"].initEnvironment ();
if (b === this.b$["org.uwi.Boltzmann"].bStartSim) this.b$["org.uwi.Boltzmann"].bStartSim_actionPerformed (a);
this.b$["org.uwi.Boltzmann"].ShowText.levelInfo.setLength (0);
}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
c$.$Boltzmann$LevelInfoArea$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.levelInfo = null;
Clazz.instantialize (this, arguments);
}, org.uwi.Boltzmann, "LevelInfoArea", javax.swing.JTextArea);
Clazz.prepareFields (c$, function () {
this.levelInfo =  new JU.SB ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.uwi.Boltzmann.LevelInfoArea);
this.levelInfo.setLength (0);
});
Clazz.defineMethod (c$, "appendLine", 
function (a) {
this.levelInfo.append (a).append ("\n");
}, "~S");
c$ = Clazz.p0p ();
};
c$.$Boltzmann$SymMouse$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.uwi.Boltzmann, "SymMouse", java.awt.event.MouseAdapter);
Clazz.overrideMethod (c$, "mouseReleased", 
function (a) {
var b = a.getSource ();
if (b === this.b$["org.uwi.Boltzmann"].ShowText) this.b$["org.uwi.Boltzmann"].ShowText_mouseReleased (a);
}, "java.awt.event.MouseEvent");
c$ = Clazz.p0p ();
};
});
