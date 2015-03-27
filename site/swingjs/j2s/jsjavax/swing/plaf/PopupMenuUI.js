Clazz.declarePackage ("jsjavax.swing.plaf");
Clazz.load (["jsjavax.swing.plaf.ComponentUI"], "jsjavax.swing.plaf.PopupMenuUI", ["jsjavax.swing.PopupFactory"], function () {
c$ = Clazz.declareType (jsjavax.swing.plaf, "PopupMenuUI", jsjavax.swing.plaf.ComponentUI);
Clazz.defineMethod (c$, "isPopupTrigger", 
function (e) {
return e.isPopupTrigger ();
}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "getPopup", 
function (popup, x, y) {
var popupFactory = jsjavax.swing.PopupFactory.getSharedInstance ();
return popupFactory.getPopup (popup.getInvoker (), popup, x, y);
}, "jsjavax.swing.JPopupMenu,~N,~N");
});
