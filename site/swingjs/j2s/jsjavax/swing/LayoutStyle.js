Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["java.lang.Enum"], "jsjavax.swing.LayoutStyle", ["jsjavax.swing.UIManager", "jssun.awt.AppContext"], function () {
c$ = Clazz.declareType (jsjavax.swing, "LayoutStyle");
c$.setInstance = Clazz.defineMethod (c$, "setInstance", 
function (style) {
{
if (style == null) {
jssun.awt.AppContext.getAppContext ().remove (jsjavax.swing.LayoutStyle);
} else {
jssun.awt.AppContext.getAppContext ().put (jsjavax.swing.LayoutStyle, style);
}}}, "jsjavax.swing.LayoutStyle");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
var style;
{
style = jssun.awt.AppContext.getAppContext ().get (jsjavax.swing.LayoutStyle);
}if (style == null) {
return jsjavax.swing.UIManager.getLookAndFeel ().getLayoutStyle ();
}return style;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.LayoutStyle, "ComponentPlacement", Enum);
Clazz.defineEnumConstant (c$, "RELATED", 0, []);
Clazz.defineEnumConstant (c$, "UNRELATED", 1, []);
Clazz.defineEnumConstant (c$, "INDENT", 2, []);
c$ = Clazz.p0p ();
});
