Clazz.declarePackage ("javax.swing");
Clazz.load (null, "javax.swing.UIManager", ["java.util.ArrayList", "java.util.Locale", "javax.swing.RepaintManager", "$.SwingPaintEventDispatcher", "$.SwingUtilities", "sun.awt.PaintEventDispatcher", "swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (javax.swing, "UIManager");
c$.getLookAndFeelDefaults = Clazz.defineMethod (c$, "getLookAndFeelDefaults", 
function () {
return javax.swing.UIManager.uid;
});
c$.getInstalledLookAndFeels = Clazz.defineMethod (c$, "getInstalledLookAndFeels", 
function () {
return javax.swing.UIManager.installedLAFs;
});
c$.setInstalledLookAndFeels = Clazz.defineMethod (c$, "setInstalledLookAndFeels", 
function (infos) {
swingjs.JSToolkit.notImplemented (null);
}, "~A");
c$.installLookAndFeel = Clazz.defineMethod (c$, "installLookAndFeel", 
function (info) {
swingjs.JSToolkit.notImplemented (null);
}, "javax.swing.UIManager.LookAndFeelInfo");
c$.installLookAndFeel = Clazz.defineMethod (c$, "installLookAndFeel", 
function (name, className) {
swingjs.JSToolkit.notImplemented (null);
}, "~S,~S");
c$.getLookAndFeel = Clazz.defineMethod (c$, "getLookAndFeel", 
function () {
return (javax.swing.UIManager.laf == null ? (javax.swing.UIManager.laf = swingjs.JSToolkit.getInstance ("swingjs.plaf.HTML5LookAndFeel")) : javax.swing.UIManager.laf);
});
c$.setLookAndFeel = Clazz.defineMethod (c$, "setLookAndFeel", 
function (newLookAndFeel) {
}, "javax.swing.LookAndFeel");
c$.setLookAndFeel = Clazz.defineMethod (c$, "setLookAndFeel", 
function (className) {
var lnfClass = javax.swing.SwingUtilities.loadSystemClass (className);
javax.swing.UIManager.setLookAndFeel ((lnfClass.newInstance ()));
}, "~S");
c$.getSystemLookAndFeelClassName = Clazz.defineMethod (c$, "getSystemLookAndFeelClassName", 
function () {
return javax.swing.UIManager.getCrossPlatformLookAndFeelClassName ();
});
c$.getCrossPlatformLookAndFeelClassName = Clazz.defineMethod (c$, "getCrossPlatformLookAndFeelClassName", 
function () {
return "swingjs.plaf.HTML5LookAndFeel";
});
c$.getDefaults = Clazz.defineMethod (c$, "getDefaults", 
function () {
javax.swing.UIManager.maybeInitialize ();
return javax.swing.UIManager.uid;
});
c$.getFont = Clazz.defineMethod (c$, "getFont", 
function (key) {
return javax.swing.UIManager.getDefaults ().getFont (key);
}, "~O");
c$.getFont = Clazz.defineMethod (c$, "getFont", 
function (key, l) {
return javax.swing.UIManager.getDefaults ().getFont (key, l);
}, "~O,java.util.Locale");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (key) {
return javax.swing.UIManager.getDefaults ().getColor (key);
}, "~O");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (key, l) {
return javax.swing.UIManager.getDefaults ().getColor (key, l);
}, "~O,java.util.Locale");
c$.getIcon = Clazz.defineMethod (c$, "getIcon", 
function (key) {
return javax.swing.UIManager.getDefaults ().getIcon (key);
}, "~O");
c$.getIcon = Clazz.defineMethod (c$, "getIcon", 
function (key, l) {
return javax.swing.UIManager.getDefaults ().getIcon (key, l);
}, "~O,java.util.Locale");
c$.getBorder = Clazz.defineMethod (c$, "getBorder", 
function (key) {
return javax.swing.UIManager.getDefaults ().getBorder (key);
}, "~O");
c$.getBorder = Clazz.defineMethod (c$, "getBorder", 
function (key, l) {
return javax.swing.UIManager.getDefaults ().getBorder (key, l);
}, "~O,java.util.Locale");
c$.getString = Clazz.defineMethod (c$, "getString", 
function (key) {
return javax.swing.UIManager.getDefaults ().getString (key);
}, "~O");
c$.getString = Clazz.defineMethod (c$, "getString", 
function (key, l) {
return javax.swing.UIManager.getDefaults ().getString (key, l);
}, "~O,java.util.Locale");
c$.getString = Clazz.defineMethod (c$, "getString", 
function (key, c) {
var l = (c == null) ? java.util.Locale.getDefault () : c.getLocale ();
return javax.swing.UIManager.getString (key, l);
}, "~O,java.awt.Component");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
function (key) {
return javax.swing.UIManager.getDefaults ().getInt (key);
}, "~O");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
function (key, l) {
return javax.swing.UIManager.getDefaults ().getInt (key, l);
}, "~O,java.util.Locale");
c$.getBoolean = Clazz.defineMethod (c$, "getBoolean", 
function (key) {
return javax.swing.UIManager.getDefaults ().getBoolean (key);
}, "~O");
c$.getBoolean = Clazz.defineMethod (c$, "getBoolean", 
function (key, l) {
return javax.swing.UIManager.getDefaults ().getBoolean (key, l);
}, "~O,java.util.Locale");
c$.getInsets = Clazz.defineMethod (c$, "getInsets", 
function (key) {
return javax.swing.UIManager.getDefaults ().getInsets (key);
}, "~O");
c$.getInsets = Clazz.defineMethod (c$, "getInsets", 
function (key, l) {
return javax.swing.UIManager.getDefaults ().getInsets (key, l);
}, "~O,java.util.Locale");
c$.getDimension = Clazz.defineMethod (c$, "getDimension", 
function (key) {
return javax.swing.UIManager.getDefaults ().getDimension (key);
}, "~O");
c$.getDimension = Clazz.defineMethod (c$, "getDimension", 
function (key, l) {
return javax.swing.UIManager.getDefaults ().getDimension (key, l);
}, "~O,java.util.Locale");
c$.get = Clazz.defineMethod (c$, "get", 
function (key) {
return javax.swing.UIManager.getDefaults ().get (key);
}, "~O");
c$.get = Clazz.defineMethod (c$, "get", 
function (key, l) {
return javax.swing.UIManager.getDefaults ().get (key, l);
}, "~O,java.util.Locale");
c$.put = Clazz.defineMethod (c$, "put", 
function (key, value) {
return javax.swing.UIManager.getDefaults ().put (key, value);
}, "~O,~O");
c$.getUI = Clazz.defineMethod (c$, "getUI", 
function (target) {
javax.swing.UIManager.maybeInitialize ();
var ui = javax.swing.UIManager.getDefaults ().getUI (target);
if (ui == null) System.out.println ("SwingJS interface has not been implemented for " + target.getClass ().getName ());
return ui;
}, "java.awt.Component");
c$.addPropertyChangeListener = Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (listener) {
}, "java.beans.PropertyChangeListener");
c$.removePropertyChangeListener = Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (listener) {
}, "java.beans.PropertyChangeListener");
c$.getPropertyChangeListeners = Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
return  new Array (0);
});
c$.maybeInitialize = Clazz.defineMethod (c$, "maybeInitialize", 
 function () {
if (javax.swing.UIManager.uid == null) {
javax.swing.UIManager.uid = swingjs.JSToolkit.getLookAndFeelDefaults ();
javax.swing.UIManager.initialize ();
}});
c$.initialize = Clazz.defineMethod (c$, "initialize", 
 function () {
if (javax.swing.RepaintManager.HANDLE_TOP_LEVEL_PAINT) {
sun.awt.PaintEventDispatcher.setPaintEventDispatcher ( new javax.swing.SwingPaintEventDispatcher ());
}});
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.className = null;
Clazz.instantialize (this, arguments);
}, javax.swing.UIManager, "LookAndFeelInfo");
Clazz.makeConstructor (c$, 
function (a, b) {
this.name = a;
this.className = b;
}, "~S,~S");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getClassName", 
function () {
return this.className;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[" + this.getName () + " " + this.getClassName () + "]";
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"installedLAFs", null);
{
var iLAFs =  new java.util.ArrayList (4);
iLAFs.add ( new javax.swing.UIManager.LookAndFeelInfo ("HTML5", "swingjs.plaf.HTML5LookAndFeel"));
javax.swing.UIManager.installedLAFs = iLAFs.toArray ( new Array (iLAFs.size ()));
}Clazz.defineStatics (c$,
"laf", null,
"uid", null);
});
