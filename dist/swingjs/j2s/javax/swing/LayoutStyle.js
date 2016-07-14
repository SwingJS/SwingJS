Clazz.declarePackage ("javax.swing");
Clazz.load (["java.lang.Enum"], "javax.swing.LayoutStyle", ["javax.swing.UIManager", "sun.awt.AppContext"], function () {
c$ = Clazz.declareType (javax.swing, "LayoutStyle");
c$.setInstance = Clazz.defineMethod (c$, "setInstance", 
function (style) {
{
if (style == null) {
sun.awt.AppContext.getAppContext ().remove (javax.swing.LayoutStyle);
} else {
sun.awt.AppContext.getAppContext ().put (javax.swing.LayoutStyle, style);
}}}, "javax.swing.LayoutStyle");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
var style;
{
style = sun.awt.AppContext.getAppContext ().get (javax.swing.LayoutStyle);
}if (style == null) {
return javax.swing.UIManager.getLookAndFeel ().getLayoutStyle ();
}return style;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.LayoutStyle, "ComponentPlacement", Enum);
Clazz.defineEnumConstant (c$, "RELATED", 0, []);
Clazz.defineEnumConstant (c$, "UNRELATED", 1, []);
Clazz.defineEnumConstant (c$, "INDENT", 2, []);
c$ = Clazz.p0p ();
});
