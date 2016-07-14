Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ImportExportDialog"], "test.Circuit.ImportExportFileDialog", ["java.awt.FileDialog", "$.Frame", "java.io.File", "$.FileInputStream", "$.FileOutputStream", "java.nio.channels.FileChannel", "java.nio.charset.Charset"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cframe = null;
this.type = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "ImportExportFileDialog", null, test.Circuit.ImportExportDialog);
Clazz.makeConstructor (c$, 
function (f, type) {
if (test.Circuit.ImportExportFileDialog.directory.equals (".")) {
var file =  new java.io.File ("circuits");
if (file.isDirectory ()) test.Circuit.ImportExportFileDialog.directory = "circuits";
}this.type = type;
this.cframe = f;
}, "test.Circuit.CirSim,test.Circuit.ImportExportDialog.Action");
Clazz.overrideMethod (c$, "setDump", 
function (dump) {
test.Circuit.ImportExportFileDialog.circuitDump = dump;
}, "~S");
Clazz.defineMethod (c$, "getDump", 
function () {
return test.Circuit.ImportExportFileDialog.circuitDump;
});
Clazz.overrideMethod (c$, "execute", 
function () {
var fd =  new java.awt.FileDialog ( new java.awt.Frame (), (this.type === test.Circuit.ImportExportDialog.Action.EXPORT) ? "Save File" : "Open File", (this.type === test.Circuit.ImportExportDialog.Action.EXPORT) ? 1 : 0);
fd.setDirectory (test.Circuit.ImportExportFileDialog.directory);
fd.setVisible (true);
var file = fd.getFile ();
var dir = fd.getDirectory ();
if (dir != null) test.Circuit.ImportExportFileDialog.directory = dir;
if (file == null) return;
System.err.println (dir + java.io.File.separator + file);
if (this.type === test.Circuit.ImportExportDialog.Action.EXPORT) {
try {
test.Circuit.ImportExportFileDialog.writeFile (dir + file);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
} else {
try {
var dump = test.Circuit.ImportExportFileDialog.readFile (dir + file);
test.Circuit.ImportExportFileDialog.circuitDump = dump;
this.cframe.readSetup (test.Circuit.ImportExportFileDialog.circuitDump);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
}});
c$.readFile = Clazz.defineMethod (c$, "readFile", 
 function (path) {
var stream = null;
try {
stream =  new java.io.FileInputStream ( new java.io.File (path));
var fc = stream.getChannel ();
var bb = fc.map (java.nio.channels.FileChannel.MapMode.READ_ONLY, 0, fc.size ());
return java.nio.charset.Charset.forName ("UTF-8").decode (bb).toString ();
} finally {
stream.close ();
}
}, "~S");
c$.writeFile = Clazz.defineMethod (c$, "writeFile", 
 function (path) {
var stream = null;
try {
stream =  new java.io.FileOutputStream ( new java.io.File (path));
var fc = stream.getChannel ();
var bb = java.nio.charset.Charset.forName ("UTF-8").encode (test.Circuit.ImportExportFileDialog.circuitDump);
fc.write (bb);
} finally {
stream.close ();
}
}, "~S");
Clazz.defineStatics (c$,
"circuitDump", null,
"directory", ".");
});
