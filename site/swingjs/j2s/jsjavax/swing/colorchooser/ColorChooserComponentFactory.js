Clazz.declarePackage ("jsjavax.swing.colorchooser");
Clazz.load (null, "jsjavax.swing.colorchooser.ColorChooserComponentFactory", ["jsjavax.swing.colorchooser.DefaultPreviewPanel", "$.DefaultRGBChooserPanel"], function () {
c$ = Clazz.declareType (jsjavax.swing.colorchooser, "ColorChooserComponentFactory");
c$.getDefaultChooserPanels = Clazz.defineMethod (c$, "getDefaultChooserPanels", 
function () {
var choosers =  Clazz.newArray (-1, [ new jsjavax.swing.colorchooser.DefaultRGBChooserPanel ()]);
return choosers;
});
c$.getPreviewPanel = Clazz.defineMethod (c$, "getPreviewPanel", 
function () {
return  new jsjavax.swing.colorchooser.DefaultPreviewPanel ();
});
});
