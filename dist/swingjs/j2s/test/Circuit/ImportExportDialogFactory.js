Clazz.declarePackage ("test.Circuit");
Clazz.load (null, "test.Circuit.ImportExportDialogFactory", ["test.Circuit.ImportExportClipboardDialog", "$.ImportExportFileDialog"], function () {
c$ = Clazz.declareType (test.Circuit, "ImportExportDialogFactory");
c$.Create = Clazz.defineMethod (c$, "Create", 
function (f, type) {
if (f.applet != null) {
return  new test.Circuit.ImportExportClipboardDialog (f, type);
} else {
return  new test.Circuit.ImportExportFileDialog (f, type);
}}, "test.Circuit.CirSim,test.Circuit.ImportExportDialog.Action");
});
