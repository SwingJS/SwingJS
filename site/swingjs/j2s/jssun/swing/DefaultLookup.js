Clazz.declarePackage ("jssun.swing");
Clazz.load (null, "jssun.swing.DefaultLookup", ["java.lang.Boolean", "$.Number", "$.Thread", "jsjava.awt.Color", "$.Insets", "jsjavax.swing.Icon", "$.UIManager", "jsjavax.swing.border.Border", "jssun.awt.AppContext"], function () {
c$ = Clazz.declareType (jssun.swing, "DefaultLookup");
c$.setDefaultLookup = Clazz.defineMethod (c$, "setDefaultLookup", 
function (lookup) {
{
if (!jssun.swing.DefaultLookup.isLookupSet && lookup == null) {
return;
} else if (lookup == null) {
lookup =  new jssun.swing.DefaultLookup ();
}jssun.swing.DefaultLookup.isLookupSet = true;
jssun.awt.AppContext.getAppContext ().put (jssun.swing.DefaultLookup.DEFAULT_LOOKUP_KEY, lookup);
jssun.swing.DefaultLookup.currentDefaultThread = Thread.currentThread ();
jssun.swing.DefaultLookup.currentDefaultLookup = lookup;
}}, "jssun.swing.DefaultLookup");
c$.get = Clazz.defineMethod (c$, "get", 
function (c, ui, key) {
var lookupSet;
{
lookupSet = jssun.swing.DefaultLookup.isLookupSet;
}if (!lookupSet) {
return jsjavax.swing.UIManager.get (key, c.getLocale ());
}var thisThread = Thread.currentThread ();
var lookup;
{
if (thisThread === jssun.swing.DefaultLookup.currentDefaultThread) {
lookup = jssun.swing.DefaultLookup.currentDefaultLookup;
} else {
lookup = jssun.awt.AppContext.getAppContext ().get (jssun.swing.DefaultLookup.DEFAULT_LOOKUP_KEY);
if (lookup == null) {
lookup =  new jssun.swing.DefaultLookup ();
jssun.awt.AppContext.getAppContext ().put (jssun.swing.DefaultLookup.DEFAULT_LOOKUP_KEY, lookup);
}jssun.swing.DefaultLookup.currentDefaultThread = thisThread;
jssun.swing.DefaultLookup.currentDefaultLookup = lookup;
}}return lookup.getDefault (c, ui, key);
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
function (c, ui, key, defaultValue) {
var iValue = jssun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, Number))) {
return defaultValue;
}return (iValue).intValue ();
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S,~N");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
function (c, ui, key) {
return jssun.swing.DefaultLookup.getInt (c, ui, key, -1);
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S");
c$.getInsets = Clazz.defineMethod (c$, "getInsets", 
function (c, ui, key, defaultValue) {
var iValue = jssun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, jsjava.awt.Insets))) {
return defaultValue;
}return iValue;
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S,jsjava.awt.Insets");
c$.getInsets = Clazz.defineMethod (c$, "getInsets", 
function (c, ui, key) {
return jssun.swing.DefaultLookup.getInsets (c, ui, key, null);
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S");
c$.getBoolean = Clazz.defineMethod (c$, "getBoolean", 
function (c, ui, key, defaultValue) {
var iValue = jssun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, Boolean))) {
return defaultValue;
}return (iValue).booleanValue ();
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S,~B");
c$.getBoolean = Clazz.defineMethod (c$, "getBoolean", 
function (c, ui, key) {
return jssun.swing.DefaultLookup.getBoolean (c, ui, key, false);
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (c, ui, key, defaultValue) {
var iValue = jssun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, jsjava.awt.Color))) {
return defaultValue;
}return iValue;
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S,jsjava.awt.Color");
c$.getColor = Clazz.defineMethod (c$, "getColor", 
function (c, ui, key) {
return jssun.swing.DefaultLookup.getColor (c, ui, key, null);
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S");
c$.getIcon = Clazz.defineMethod (c$, "getIcon", 
function (c, ui, key, defaultValue) {
var iValue = jssun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, jsjavax.swing.Icon))) {
return defaultValue;
}return iValue;
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S,jsjavax.swing.Icon");
c$.getIcon = Clazz.defineMethod (c$, "getIcon", 
function (c, ui, key) {
return jssun.swing.DefaultLookup.getIcon (c, ui, key, null);
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S");
c$.getBorder = Clazz.defineMethod (c$, "getBorder", 
function (c, ui, key, defaultValue) {
var iValue = jssun.swing.DefaultLookup.get (c, ui, key);
if (iValue == null || !(Clazz.instanceOf (iValue, jsjavax.swing.border.Border))) {
return defaultValue;
}return iValue;
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S,jsjavax.swing.border.Border");
c$.getBorder = Clazz.defineMethod (c$, "getBorder", 
function (c, ui, key) {
return jssun.swing.DefaultLookup.getBorder (c, ui, key, null);
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S");
Clazz.defineMethod (c$, "getDefault", 
function (c, ui, key) {
return jsjavax.swing.UIManager.get (key, c.getLocale ());
}, "jsjavax.swing.JComponent,jsjavax.swing.plaf.ComponentUI,~S");
c$.DEFAULT_LOOKUP_KEY = c$.prototype.DEFAULT_LOOKUP_KEY =  new JavaObject ();
Clazz.defineStatics (c$,
"currentDefaultThread", null,
"currentDefaultLookup", null,
"isLookupSet", false);
});
