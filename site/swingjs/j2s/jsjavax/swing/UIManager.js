Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.MultiUIDefaults"], "jsjavax.swing.UIManager", ["java.util.ArrayList", "$.Locale", "jsjavax.swing.SwingUtilities", "jsjavax.swing.event.SwingPropertyChangeSupport", "jssun.swing.SwingUtilities2"], function () {
c$ = Clazz.declareType (jsjavax.swing, "UIManager");
c$.getLAFState = Clazz.defineMethod (c$, "getLAFState", 
($fz = function () {
var rv = jsjavax.swing.SwingUtilities.appContextGet (jssun.swing.SwingUtilities2.LAF_STATE_KEY);
if (rv == null) {
{
rv = jsjavax.swing.SwingUtilities.appContextGet (jssun.swing.SwingUtilities2.LAF_STATE_KEY);
if (rv == null) {
jsjavax.swing.SwingUtilities.appContextPut (jssun.swing.SwingUtilities2.LAF_STATE_KEY, (rv =  new jsjavax.swing.UIManager.LAFState ()));
}}}return rv;
}, $fz.isPrivate = true, $fz));
c$.getInstalledLookAndFeels = Clazz.defineMethod (c$, "getInstalledLookAndFeels", 
function () {
jsjavax.swing.UIManager.maybeInitialize ();
var ilafs = jsjavax.swing.UIManager.getLAFState ().installedLAFs;
if (ilafs == null) {
ilafs = jsjavax.swing.UIManager.installedLAFs;
}var rv =  new Array (ilafs.length);
System.arraycopy (ilafs, 0, rv, 0, ilafs.length);
return rv;
});
c$.setInstalledLookAndFeels = Clazz.defineMethod (c$, "setInstalledLookAndFeels", 
function (infos) {
jsjavax.swing.UIManager.maybeInitialize ();
var newInfos =  new Array (infos.length);
System.arraycopy (infos, 0, newInfos, 0, infos.length);
jsjavax.swing.UIManager.getLAFState ().installedLAFs = newInfos;
}, "~A");
c$.installLookAndFeel = Clazz.defineMethod (c$, "installLookAndFeel", 
function (info) {
var infos = jsjavax.swing.UIManager.getInstalledLookAndFeels ();
var newInfos =  new Array (infos.length + 1);
System.arraycopy (infos, 0, newInfos, 0, infos.length);
newInfos[infos.length] = info;
jsjavax.swing.UIManager.setInstalledLookAndFeels (newInfos);
}, "jsjavax.swing.UIManager.LookAndFeelInfo");
c$.installLookAndFeel = Clazz.defineMethod (c$, "installLookAndFeel", 
function (name, className) {
jsjavax.swing.UIManager.installLookAndFeel ( new jsjavax.swing.UIManager.LookAndFeelInfo (name, className));
}, "~S,~S");
c$.getLookAndFeel = Clazz.defineMethod (c$, "getLookAndFeel", 
function () {
jsjavax.swing.UIManager.maybeInitialize ();
return jsjavax.swing.UIManager.getLAFState ().lookAndFeel;
});
c$.setLookAndFeel = Clazz.defineMethod (c$, "setLookAndFeel", 
function (newLookAndFeel) {
}, "jsjavax.swing.LookAndFeel");
c$.setLookAndFeel = Clazz.defineMethod (c$, "setLookAndFeel", 
function (className) {
var lnfClass = jsjavax.swing.SwingUtilities.loadSystemClass (className);
jsjavax.swing.UIManager.setLookAndFeel ((lnfClass.newInstance ()));
}, "~S");
c$.getSystemLookAndFeelClassName = Clazz.defineMethod (c$, "getSystemLookAndFeelClassName", 
function () {
return jsjavax.swing.UIManager.getCrossPlatformLookAndFeelClassName ();
});
c$.getCrossPlatformLookAndFeelClassName = Clazz.defineMethod (c$, "getCrossPlatformLookAndFeelClassName", 
function () {
return "jsjavax.swing.plaf.basic.BasicLookAndFeel";
});
c$.getDefaults = Clazz.defineMethod (c$, "getDefaults", 
function () {
jsjavax.swing.UIManager.maybeInitialize ();
return jsjavax.swing.UIManager.getLAFState ().multiUIDefaults;
});
c$.getFont = Clazz.defineMethod (c$, "getFont", 
function (key) {
return jsjavax.swing.UIManager.getDefaults ().getFont (key);
}, "~O");
c$.getFont = Clazz.defineMethod (c$, "getFont", 
function (key, l) {
return jsjavax.swing.UIManager.getDefaults ().getFont (key, l);
}, "~O,java.util.Locale");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (key) {
return jsjavax.swing.UIManager.getDefaults ().getColor (key);
}, "~O");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (key, l) {
return jsjavax.swing.UIManager.getDefaults ().getColor (key, l);
}, "~O,java.util.Locale");
c$.getIcon = Clazz.defineMethod (c$, "getIcon", 
function (key) {
return jsjavax.swing.UIManager.getDefaults ().getIcon (key);
}, "~O");
c$.getIcon = Clazz.defineMethod (c$, "getIcon", 
function (key, l) {
return jsjavax.swing.UIManager.getDefaults ().getIcon (key, l);
}, "~O,java.util.Locale");
c$.getBorder = Clazz.defineMethod (c$, "getBorder", 
function (key) {
return jsjavax.swing.UIManager.getDefaults ().getBorder (key);
}, "~O");
c$.getBorder = Clazz.defineMethod (c$, "getBorder", 
function (key, l) {
return jsjavax.swing.UIManager.getDefaults ().getBorder (key, l);
}, "~O,java.util.Locale");
c$.getString = Clazz.defineMethod (c$, "getString", 
function (key) {
return jsjavax.swing.UIManager.getDefaults ().getString (key);
}, "~O");
c$.getString = Clazz.defineMethod (c$, "getString", 
function (key, l) {
return jsjavax.swing.UIManager.getDefaults ().getString (key, l);
}, "~O,java.util.Locale");
c$.getString = Clazz.defineMethod (c$, "getString", 
function (key, c) {
var l = (c == null) ? java.util.Locale.getDefault () : c.getLocale ();
return jsjavax.swing.UIManager.getString (key, l);
}, "~O,jsjava.awt.Component");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
function (key) {
return jsjavax.swing.UIManager.getDefaults ().getInt (key);
}, "~O");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
function (key, l) {
return jsjavax.swing.UIManager.getDefaults ().getInt (key, l);
}, "~O,java.util.Locale");
c$.getBoolean = Clazz.defineMethod (c$, "getBoolean", 
function (key) {
return jsjavax.swing.UIManager.getDefaults ().getBoolean (key);
}, "~O");
c$.getBoolean = Clazz.defineMethod (c$, "getBoolean", 
function (key, l) {
return jsjavax.swing.UIManager.getDefaults ().getBoolean (key, l);
}, "~O,java.util.Locale");
c$.getInsets = Clazz.defineMethod (c$, "getInsets", 
function (key) {
return jsjavax.swing.UIManager.getDefaults ().getInsets (key);
}, "~O");
c$.getInsets = Clazz.defineMethod (c$, "getInsets", 
function (key, l) {
return jsjavax.swing.UIManager.getDefaults ().getInsets (key, l);
}, "~O,java.util.Locale");
c$.getDimension = Clazz.defineMethod (c$, "getDimension", 
function (key) {
return jsjavax.swing.UIManager.getDefaults ().getDimension (key);
}, "~O");
c$.getDimension = Clazz.defineMethod (c$, "getDimension", 
function (key, l) {
return jsjavax.swing.UIManager.getDefaults ().getDimension (key, l);
}, "~O,java.util.Locale");
c$.get = Clazz.defineMethod (c$, "get", 
function (key) {
return jsjavax.swing.UIManager.getDefaults ().get (key);
}, "~O");
c$.get = Clazz.defineMethod (c$, "get", 
function (key, l) {
return jsjavax.swing.UIManager.getDefaults ().get (key, l);
}, "~O,java.util.Locale");
c$.put = Clazz.defineMethod (c$, "put", 
function (key, value) {
return jsjavax.swing.UIManager.getDefaults ().put (key, value);
}, "~O,~O");
c$.getUI = Clazz.defineMethod (c$, "getUI", 
function (target) {
return null;
}, "jsjavax.swing.JComponent");
c$.addPropertyChangeListener = Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (listener) {
{
jsjavax.swing.UIManager.getLAFState ().getPropertyChangeSupport (true).addPropertyChangeListener (listener);
}}, "jsjava.beans.PropertyChangeListener");
c$.removePropertyChangeListener = Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (listener) {
{
jsjavax.swing.UIManager.getLAFState ().getPropertyChangeSupport (true).removePropertyChangeListener (listener);
}}, "jsjava.beans.PropertyChangeListener");
c$.getPropertyChangeListeners = Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
{
return jsjavax.swing.UIManager.getLAFState ().getPropertyChangeSupport (true).getPropertyChangeListeners ();
}});
c$.maybeInitialize = Clazz.defineMethod (c$, "maybeInitialize", 
($fz = function () {
{
if (!jsjavax.swing.UIManager.getLAFState ().initialized) {
jsjavax.swing.UIManager.getLAFState ().initialized = true;
jsjavax.swing.UIManager.initialize ();
}}}, $fz.isPrivate = true, $fz));
c$.initialize = Clazz.defineMethod (c$, "initialize", 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.tables = null;
this.initialized = false;
this.multiUIDefaults = null;
this.lookAndFeel = null;
this.changeSupport = null;
this.installedLAFs = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.UIManager, "LAFState");
Clazz.prepareFields (c$, function () {
this.tables =  new Array (2);
this.multiUIDefaults =  new jsjavax.swing.MultiUIDefaults (this.tables);
});
Clazz.defineMethod (c$, "getPropertyChangeSupport", 
function (a) {
if (a && this.changeSupport == null) {
this.changeSupport =  new jsjavax.swing.event.SwingPropertyChangeSupport (jsjavax.swing.UIManager);
}return this.changeSupport;
}, "~B");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.className = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.UIManager, "LookAndFeelInfo");
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
c$.classLock = c$.prototype.classLock =  new JavaObject ();
Clazz.defineStatics (c$,
"installedLAFs", null);
{
var iLAFs =  new java.util.ArrayList (4);
iLAFs.add ( new jsjavax.swing.UIManager.LookAndFeelInfo ("Metal", "jsjavax.swing.plaf.metal.MetalLookAndFeel"));
iLAFs.add ( new jsjavax.swing.UIManager.LookAndFeelInfo ("Nimbus", "com.sun.java.swing.plaf.nimbus.NimbusLookAndFeel"));
iLAFs.add ( new jsjavax.swing.UIManager.LookAndFeelInfo ("CDE/Motif", "com.sun.java.swing.plaf.motif.MotifLookAndFeel"));
jsjavax.swing.UIManager.installedLAFs = iLAFs.toArray ( new Array (iLAFs.size ()));
}});
