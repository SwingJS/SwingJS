Clazz.declarePackage ("test.Circuit");
Clazz.load (["java.awt.Dialog", "java.awt.event.ActionListener", "test.Circuit.ImportExportDialog"], "test.Circuit.ImportExportClipboardDialog", ["java.awt.Button", "$.TextArea", "test.Circuit.CirSim", "$.ImportExportDialogLayout"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cframe = null;
this.importButton = null;
this.closeButton = null;
this.text = null;
this.$type = null;
this.clipboard = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "ImportExportClipboardDialog", java.awt.Dialog, [test.Circuit.ImportExportDialog, java.awt.event.ActionListener]);
Clazz.makeConstructor (c$, 
function (f, type) {
Clazz.superConstructor (this, test.Circuit.ImportExportClipboardDialog, [f, (type === test.Circuit.ImportExportDialog.Action.EXPORT) ? "Export" : "Import", false]);
this.cframe = f;
this.setLayout ( new test.Circuit.ImportExportDialogLayout ());
this.add (this.text =  new java.awt.TextArea ("", 10, 60, 0));
this.importButton =  new java.awt.Button ("Import");
this.$type = type;
this.add (this.importButton);
this.importButton.addActionListener (this);
this.add (this.closeButton =  new java.awt.Button ("Close"));
this.closeButton.addActionListener (this);
var x = test.Circuit.CirSim.main.getLocationOnScreen ();
this.resize (400, 300);
var d = this.getSize ();
this.setLocation (x.x + Clazz.doubleToInt ((this.cframe.winSize.width - d.width) / 2), x.y + Clazz.doubleToInt ((this.cframe.winSize.height - d.height) / 2));
}, "test.Circuit.CirSim,test.Circuit.ImportExportDialog.Action");
Clazz.overrideMethod (c$, "setDump", 
function (dump) {
this.text.setText (dump);
}, "~S");
Clazz.overrideMethod (c$, "execute", 
function () {
if (this.$type === test.Circuit.ImportExportDialog.Action.EXPORT) this.text.selectAll ();
this.setVisible (true);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
var i;
var src = e.getSource ();
if (src === this.importButton) {
{
this.cframe.readSetup (this.text.getText ());
}}if (src === this.closeButton) this.setVisible (false);
}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (ev) {
if (ev.id == 201) {
test.Circuit.CirSim.main.requestFocus ();
this.setVisible (false);
test.Circuit.CirSim.impDialog = null;
return true;
}return Clazz.superCall (this, test.Circuit.ImportExportClipboardDialog, "handleEvent", [ev]);
}, "java.awt.Event");
});
