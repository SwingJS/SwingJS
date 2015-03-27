Clazz.declarePackage ("jsjavax.swing");
Clazz.load (null, "jsjavax.swing.LookAndFeel", ["jsjavax.swing.JPasswordField", "$.KeyStroke", "$.UIManager", "jsjavax.swing.plaf.ComponentInputMapUIResource", "$.InputMapUIResource", "$.UIResource", "jssun.swing.DefaultLayoutStyle", "$.SwingUtilities2"], function () {
c$ = Clazz.declareType (jsjavax.swing, "LookAndFeel");
c$.installColors = Clazz.defineMethod (c$, "installColors", 
function (c, defaultBgName, defaultFgName) {
var bg = c.getBackground ();
if (bg == null || Clazz.instanceOf (bg, jsjavax.swing.plaf.UIResource)) {
c.setBackground (jsjavax.swing.UIManager.getColor (defaultBgName));
}var fg = c.getForeground ();
if (fg == null || Clazz.instanceOf (fg, jsjavax.swing.plaf.UIResource)) {
c.setForeground (jsjavax.swing.UIManager.getColor (defaultFgName));
}}, "jsjavax.swing.JComponent,~S,~S");
c$.installColorsAndFont = Clazz.defineMethod (c$, "installColorsAndFont", 
function (c, defaultBgName, defaultFgName, defaultFontName) {
var f = c.getFont ();
if (f == null || Clazz.instanceOf (f, jsjavax.swing.plaf.UIResource)) {
c.setFont (jsjavax.swing.UIManager.getFont (defaultFontName));
}jsjavax.swing.LookAndFeel.installColors (c, defaultBgName, defaultFgName);
}, "jsjavax.swing.JComponent,~S,~S,~S");
c$.installBorder = Clazz.defineMethod (c$, "installBorder", 
function (c, defaultBorderName) {
var b = c.getBorder ();
if (b == null || Clazz.instanceOf (b, jsjavax.swing.plaf.UIResource)) {
c.setBorder (jsjavax.swing.UIManager.getBorder (defaultBorderName));
}}, "jsjavax.swing.JComponent,~S");
c$.uninstallBorder = Clazz.defineMethod (c$, "uninstallBorder", 
function (c) {
if (Clazz.instanceOf (c.getBorder (), jsjavax.swing.plaf.UIResource)) {
c.setBorder (null);
}}, "jsjavax.swing.JComponent");
c$.installProperty = Clazz.defineMethod (c$, "installProperty", 
function (c, propertyName, propertyValue) {
if (Clazz.instanceOf (c, jsjavax.swing.JPasswordField)) {
if (!(c).customSetUIProperty (propertyName, propertyValue)) {
c.setUIProperty (propertyName, propertyValue);
}} else {
c.setUIProperty (propertyName, propertyValue);
}}, "jsjavax.swing.JComponent,~S,~O");
c$.makeInputMap = Clazz.defineMethod (c$, "makeInputMap", 
function (keys) {
var retMap =  new jsjavax.swing.plaf.InputMapUIResource ();
jsjavax.swing.LookAndFeel.loadKeyBindings (retMap, keys);
return retMap;
}, "~A");
c$.makeComponentInputMap = Clazz.defineMethod (c$, "makeComponentInputMap", 
function (c, keys) {
var retMap =  new jsjavax.swing.plaf.ComponentInputMapUIResource (c);
jsjavax.swing.LookAndFeel.loadKeyBindings (retMap, keys);
return retMap;
}, "jsjavax.swing.JComponent,~A");
c$.loadKeyBindings = Clazz.defineMethod (c$, "loadKeyBindings", 
function (retMap, keys) {
if (keys != null) {
for (var counter = 0, maxCounter = keys.length; counter < maxCounter; counter++) {
var keyStrokeO = keys[counter++];
var ks = (Clazz.instanceOf (keyStrokeO, jsjavax.swing.KeyStroke)) ? keyStrokeO : jsjavax.swing.KeyStroke.getKeyStroke (keyStrokeO);
retMap.put (ks, keys[counter]);
}
}}, "jsjavax.swing.InputMap,~A");
c$.makeIcon = Clazz.defineMethod (c$, "makeIcon", 
function (baseClass, gifFile) {
return jssun.swing.SwingUtilities2.makeIcon (baseClass, baseClass, gifFile);
}, "Class,~S");
Clazz.defineMethod (c$, "getLayoutStyle", 
function () {
return jssun.swing.DefaultLayoutStyle.getInstance ();
});
Clazz.defineMethod (c$, "provideErrorFeedback", 
function (component) {
}, "jsjava.awt.Component");
c$.getDesktopPropertyValue = Clazz.defineMethod (c$, "getDesktopPropertyValue", 
function (systemPropertyName, fallbackValue) {
return fallbackValue;
}, "~S,~O");
Clazz.defineMethod (c$, "getDisabledIcon", 
function (component, icon) {
return null;
}, "jsjavax.swing.JComponent,jsjavax.swing.Icon");
Clazz.defineMethod (c$, "getDisabledSelectedIcon", 
function (component, icon) {
return this.getDisabledIcon (component, icon);
}, "jsjavax.swing.JComponent,jsjavax.swing.Icon");
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
