Clazz.declarePackage ("sun.swing");
Clazz.load (null, "sun.swing.DefaultLookup", ["java.lang.Boolean", "$.Number", "$.Thread", "java.awt.Color", "$.Insets", "javax.swing.Icon", "$.UIManager", "javax.swing.border.Border", "sun.awt.AppContext"], function () {
c$ = Clazz.declareType (sun.swing, "DefaultLookup");
c$.setDefaultLookup = Clazz.defineMethod (c$, "setDefaultLookup", 
function (lookup) {
{
if (!sun.swing.DefaultLookup.isLookupSet && lookup == null) {
return;
} else if (lookup == null) {
lookup =  new sun.swing.DefaultLookup ();
}sun.swing.DefaultLookup.isLookupSet = true;
sun.awt.AppContext.getAppContext ().put (sun.swing.DefaultLookup.DEFAULT_LOOKUP_KEY, lookup);
sun.swing.DefaultLookup.currentDefaultThread = Thread.currentThread ();
sun.swing.DefaultLookup.currentDefaultLookup = lookup;
}}, "sun.swing.DefaultLookup");
c$.get = Clazz.defineMethod (c$, "get", 
function (c, ui, key) {
var lookupSet;
{
lookupSet = sun.swing.DefaultLookup.isLookupSet;
}if (!lookupSet) {
return javax.swing.UIManager.get (key, c.getLocale ());
}var thisThread = Thread.currentThread ();
var lookup;
{
if (thisThread === sun.swing.DefaultLookup.currentDefaultThread) {
lookup = sun.swing.DefaultLookup.currentDefaultLookup;
} else {
lookup = sun.awt.AppContext.getAppContext ().get (sun.swing.DefaultLookup.DEFAULT_LOOKUP_KEY);
if (lookup == null) {
lookup =  new sun.swing.DefaultLookup ();
sun.awt.AppContext.getAppContext ().put (sun.swing.DefaultLookup.DEFAULT_LOOKUP_KEY, lookup);
}sun.swing.DefaultLookup.currentDefaultThread = thisThread;
sun.swing.DefaultLookup.currentDefaultLookup = lookup;
}}return lookup.getDefault (c, ui, key);
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
function (c, ui, key, defaultValue) {
var iValue = sun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, Number))) {
return defaultValue;
}return (iValue).intValue ();
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S,~N");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
function (c, ui, key) {
return sun.swing.DefaultLookup.getInt (c, ui, key, -1);
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S");
c$.getInsets = Clazz.defineMethod (c$, "getInsets", 
function (c, ui, key, defaultValue) {
var iValue = sun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, java.awt.Insets))) {
return defaultValue;
}return iValue;
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S,java.awt.Insets");
c$.getInsets = Clazz.defineMethod (c$, "getInsets", 
function (c, ui, key) {
return sun.swing.DefaultLookup.getInsets (c, ui, key, null);
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S");
c$.getBoolean = Clazz.defineMethod (c$, "getBoolean", 
function (c, ui, key, defaultValue) {
var iValue = sun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, Boolean))) {
return defaultValue;
}return (iValue).booleanValue ();
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S,~B");
c$.getBoolean = Clazz.defineMethod (c$, "getBoolean", 
function (c, ui, key) {
return sun.swing.DefaultLookup.getBoolean (c, ui, key, false);
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (c, ui, key, defaultValue) {
var iValue = sun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, java.awt.Color))) {
return defaultValue;
}return iValue;
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S,java.awt.Color");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (c, ui, key) {
return sun.swing.DefaultLookup.getColor (c, ui, key, null);
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S");
c$.getIcon = Clazz.defineMethod (c$, "getIcon", 
function (c, ui, key, defaultValue) {
var iValue = sun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, javax.swing.Icon))) {
return defaultValue;
}return iValue;
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S,javax.swing.Icon");
c$.getIcon = Clazz.defineMethod (c$, "getIcon", 
function (c, ui, key) {
return sun.swing.DefaultLookup.getIcon (c, ui, key, null);
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S");
c$.getBorder = Clazz.defineMethod (c$, "getBorder", 
function (c, ui, key, defaultValue) {
var iValue = sun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, javax.swing.border.Border))) {
return defaultValue;
}return iValue;
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S,javax.swing.border.Border");
c$.getBorder = Clazz.defineMethod (c$, "getBorder", 
function (c, ui, key) {
return sun.swing.DefaultLookup.getBorder (c, ui, key, null);
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S");
Clazz.defineMethod (c$, "getDefault", 
function (c, ui, key) {
return javax.swing.UIManager.get (key, c.getLocale ());
}, "javax.swing.JComponent,javax.swing.plaf.ComponentUI,~S");
c$.DEFAULT_LOOKUP_KEY = c$.prototype.DEFAULT_LOOKUP_KEY =  new Clazz._O ();
Clazz.defineStatics (c$,
"currentDefaultThread", null,
"currentDefaultLookup", null,
"isLookupSet", false);
});
