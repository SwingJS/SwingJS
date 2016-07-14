Clazz.declarePackage ("swingjs.awt");
Clazz.load (["javax.swing.JFrame"], "swingjs.awt.Frame", null, function () {
c$ = Clazz.declareType (swingjs.awt, "Frame", javax.swing.JFrame);
Clazz.defineMethod (c$, "remove", 
function (i) {
{
this.removeInt(i);
}}, "~N");
Clazz.defineMethod (c$, "setMenuBar", 
function (m) {
this.setJMenuBar (m);
}, "swingjs.awt.MenuBar");
Clazz.defineMethod (c$, "unsetMenuBar", 
function () {
this.setJMenuBar (null);
});
Clazz.defineMethod (c$, "getMenubar", 
function () {
return this.getJMenuBar ();
});
});
