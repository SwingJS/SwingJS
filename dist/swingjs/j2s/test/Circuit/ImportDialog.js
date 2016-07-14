Clazz.declarePackage ("test.Circuit");
Clazz.load (["java.awt.Dialog", "java.awt.event.ActionListener"], "test.Circuit.ImportDialog", ["java.awt.Button", "$.TextArea", "test.Circuit.CirSim", "$.ImportDialogLayout"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cframe = null;
this.importButton = null;
this.closeButton = null;
this.text = null;
this.isURL = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "ImportDialog", java.awt.Dialog, java.awt.event.ActionListener);
Clazz.makeConstructor (c$, 
function (f, str, url) {
Clazz.superConstructor (this, test.Circuit.ImportDialog, [f, (str.length > 0) ? "Export" : "Import", false]);
this.isURL = url;
this.cframe = f;
this.setLayout ( new test.Circuit.ImportDialogLayout ());
this.add (this.text =  new java.awt.TextArea (str, 10, 60, 0));
this.importButton =  new java.awt.Button ("Import");
if (!this.isURL) this.add (this.importButton);
this.importButton.addActionListener (this);
this.add (this.closeButton =  new java.awt.Button ("Close"));
this.closeButton.addActionListener (this);
var x = test.Circuit.CirSim.main.getLocationOnScreen ();
this.resize (400, 300);
var d = this.getSize ();
this.setLocation (x.x + Clazz.doubleToInt ((this.cframe.winSize.width - d.width) / 2), x.y + Clazz.doubleToInt ((this.cframe.winSize.height - d.height) / 2));
this.show ();
if (str.length > 0) this.text.selectAll ();
}, "test.Circuit.CirSim,~S,~B");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
var i;
var src = e.getSource ();
if (src === this.importButton) {
this.cframe.readSetup (this.text.getText ());
this.setVisible (false);
}if (src === this.closeButton) this.setVisible (false);
}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
test.Circuit.CirSim.main.requestFocus ();
this.setVisible (false);
test.Circuit.CirSim.impDialog = null;
return true;
}return Clazz.superCall (this, test.Circuit.ImportDialog, "handleEvent", [ev]);
}, "java.awt.Event");
});
