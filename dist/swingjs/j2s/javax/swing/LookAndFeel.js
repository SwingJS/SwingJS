Clazz.declarePackage ("javax.swing");
Clazz.load (null, "javax.swing.LookAndFeel", ["javax.swing.JPasswordField", "$.UIManager", "javax.swing.plaf.UIResource", "sun.swing.DefaultLayoutStyle", "swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (javax.swing, "LookAndFeel");
c$.installColors = Clazz.defineMethod (c$, "installColors", 
function (c, defaultBgName, defaultFgName) {
var bg = c.getBackground ();
if (bg == null || Clazz.instanceOf (bg, javax.swing.plaf.UIResource)) c.setBackground (javax.swing.UIManager.getColor (defaultBgName));
var fg = c.getForeground ();
if (fg == null || Clazz.instanceOf (fg, javax.swing.plaf.UIResource)) c.setForeground (javax.swing.UIManager.getColor (defaultFgName));
}, "javax.swing.JComponent,~S,~S");
c$.installColorsAndFont = Clazz.defineMethod (c$, "installColorsAndFont", 
function (c, defaultBgName, defaultFgName, defaultFontName) {
var f = c.getFont ();
if (f == null || Clazz.instanceOf (f, javax.swing.plaf.UIResource)) {
c.setFont (javax.swing.UIManager.getFont (defaultFontName));
}if (defaultBgName != null) javax.swing.LookAndFeel.installColors (c, defaultBgName, defaultFgName);
}, "javax.swing.JComponent,~S,~S,~S");
c$.installBorder = Clazz.defineMethod (c$, "installBorder", 
function (c, defaultBorderName) {
swingjs.JSToolkit.notImplemented (null);
}, "javax.swing.JComponent,~S");
c$.uninstallBorder = Clazz.defineMethod (c$, "uninstallBorder", 
function (c) {
swingjs.JSToolkit.notImplemented (null);
}, "javax.swing.JComponent");
c$.installProperty = Clazz.defineMethod (c$, "installProperty", 
function (c, propertyName, propertyValue) {
if (Clazz.instanceOf (c, javax.swing.JPasswordField)) {
if (!(c).customSetUIProperty (propertyName, propertyValue)) {
c.setUIProperty (propertyName, propertyValue);
}} else {
c.setUIProperty (propertyName, propertyValue);
}}, "javax.swing.JComponent,~S,~O");
c$.makeKeyBindings = Clazz.defineMethod (c$, "makeKeyBindings", 
function (keyBindingList) {
swingjs.JSToolkit.notImplemented (null);
return null;
}, "~A");
c$.makeInputMap = Clazz.defineMethod (c$, "makeInputMap", 
function (keys) {
swingjs.JSToolkit.notImplemented (null);
return null;
}, "~A");
c$.makeComponentInputMap = Clazz.defineMethod (c$, "makeComponentInputMap", 
function (c, keys) {
swingjs.JSToolkit.notImplemented (null);
return null;
}, "javax.swing.JComponent,~A");
c$.loadKeyBindings = Clazz.defineMethod (c$, "loadKeyBindings", 
function (retMap, keys) {
swingjs.JSToolkit.notImplemented (null);
}, "javax.swing.InputMap,~A");
c$.makeIcon = Clazz.defineMethod (c$, "makeIcon", 
function (baseClass, gifFile) {
swingjs.JSToolkit.notImplemented (null);
return null;
}, "Class,~S");
Clazz.defineMethod (c$, "getLayoutStyle", 
function () {
return sun.swing.DefaultLayoutStyle.getInstance ();
});
Clazz.defineMethod (c$, "provideErrorFeedback", 
function (component) {
swingjs.JSToolkit.notImplemented (null);
}, "java.awt.Component");
c$.getDesktopPropertyValue = Clazz.defineMethod (c$, "getDesktopPropertyValue", 
function (systemPropertyName, fallbackValue) {
swingjs.JSToolkit.notImplemented (null);
return fallbackValue;
}, "~S,~O");
Clazz.defineMethod (c$, "getDisabledIcon", 
function (component, icon) {
swingjs.JSToolkit.notImplemented (null);
return null;
}, "javax.swing.JComponent,javax.swing.Icon");
Clazz.defineMethod (c$, "getDisabledSelectedIcon", 
function (component, icon) {
return this.getDisabledIcon (component, icon);
}, "javax.swing.JComponent,javax.swing.Icon");
Clazz.defineMethod (c$, "getSupportsWindowDecorations", 
function () {
return false;
});
Clazz.defineMethod (c$, "initialize", 
function () {
});
Clazz.defineMethod (c$, "uninitialize", 
function () {
});
Clazz.defineMethod (c$, "getDefaults", 
function () {
return null;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "[" + this.getDescription () + " - " + this.getClass ().getName () + "]";
});
});
