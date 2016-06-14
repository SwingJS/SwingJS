Clazz.declarePackage ("javax.swing.plaf");
Clazz.load (["javax.swing.plaf.ComponentUI"], "javax.swing.plaf.PopupMenuUI", ["javax.swing.PopupFactory"], function () {
c$ = Clazz.declareType (javax.swing.plaf, "PopupMenuUI", javax.swing.plaf.ComponentUI);
Clazz.defineMethod (c$, "isPopupTrigger", 
function (e) {
return e.isPopupTrigger ();
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "getPopup", 
function (popup, x, y) {
var popupFactory = javax.swing.PopupFactory.getSharedInstance ();
return popupFactory.getPopup (popup.getInvoker (), popup, x, y);
}, "javax.swing.JPopupMenu,~N,~N");
});
