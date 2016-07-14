Clazz.declarePackage ("javax.swing.colorchooser");
Clazz.load (null, "javax.swing.colorchooser.ColorChooserComponentFactory", ["javax.swing.colorchooser.DefaultPreviewPanel", "$.DefaultRGBChooserPanel"], function () {
c$ = Clazz.declareType (javax.swing.colorchooser, "ColorChooserComponentFactory");
c$.getDefaultChooserPanels = Clazz.defineMethod (c$, "getDefaultChooserPanels", 
function () {
var choosers = [ new javax.swing.colorchooser.DefaultRGBChooserPanel ()];
return choosers;
});
c$.getPreviewPanel = Clazz.defineMethod (c$, "getPreviewPanel", 
function () {
return  new javax.swing.colorchooser.DefaultPreviewPanel ();
});
});
