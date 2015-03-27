Clazz.declarePackage ("jssun.awt");
Clazz.load (["jsjava.security.PrivilegedAction", "java.lang.StringBuffer", "java.util.Collections", "$.HashMap", "$.IdentityHashMap"], ["jssun.awt.AppContext", "$.MostRecentThreadAppContext", "$.MostRecentKeyValue"], ["java.lang.Thread", "java.util.HashSet", "jsjava.beans.PropertyChangeSupport", "jsjava.security.AccessController"], function () {
c$ = Clazz.decorateAsClass (function () {
this.table = null;
this.threadGroup = null;
this.changeSupport = null;
this.$isDisposed = false;
this.contextClassLoader = null;
this.mostRecentKeyValue = null;
this.shadowMostRecentKeyValue = null;
Clazz.instantialize (this, arguments);
}, jssun.awt, "AppContext");
Clazz.prepareFields (c$, function () {
this.table =  new java.util.HashMap ();
});
c$.getAppContexts = Clazz.defineMethod (c$, "getAppContexts", 
function () {
return  new java.util.HashSet (jssun.awt.AppContext.threadGroup2appContext.values ());
});
Clazz.defineMethod (c$, "isDisposed", 
function () {
return this.$isDisposed;
});
Clazz.makeConstructor (c$, 
function (threadGroup) {
jssun.awt.AppContext.numAppContexts++;
this.threadGroup = threadGroup;
jssun.awt.AppContext.threadGroup2appContext.put (threadGroup, this);
this.contextClassLoader = jsjava.security.AccessController.doPrivileged (((Clazz.isClassDefined ("jssun.awt.AppContext$1") ? 0 : jssun.awt.AppContext.$AppContext$1$ ()), Clazz.innerTypeInstance (jssun.awt.AppContext$1, this, null)));
}, "ThreadGroup");
c$.getAppContext = Clazz.defineMethod (c$, "getAppContext", 
function () {
var currentThread = Thread.currentThread ();
var appContext = null;
var recent = jssun.awt.AppContext.mostRecentThreadAppContext;
if ((recent != null) && (recent.thread === currentThread)) {
appContext = recent.appContext;
} else {
appContext = jsjava.security.AccessController.doPrivileged (((Clazz.isClassDefined ("jssun.awt.AppContext$2") ? 0 : jssun.awt.AppContext.$AppContext$2$ ()), Clazz.innerTypeInstance (jssun.awt.AppContext$2, this, Clazz.cloneFinals ("currentThread", currentThread))));
}return appContext;
});
c$.isMainContext = Clazz.defineMethod (c$, "isMainContext", 
function (ctx) {
return false;
}, "jssun.awt.AppContext");
Clazz.defineMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "get", 
function (key) {
{
var recent = this.mostRecentKeyValue;
if ((recent != null) && (recent.key === key)) {
return recent.value;
}var value = this.table.get (key);
if (this.mostRecentKeyValue == null) {
this.mostRecentKeyValue =  new jssun.awt.MostRecentKeyValue (key, value);
this.shadowMostRecentKeyValue =  new jssun.awt.MostRecentKeyValue (key, value);
} else {
var auxKeyValue = this.mostRecentKeyValue;
this.shadowMostRecentKeyValue.setPair (key, value);
this.mostRecentKeyValue = this.shadowMostRecentKeyValue;
this.shadowMostRecentKeyValue = auxKeyValue;
}return value;
}}, "~O");
Clazz.defineMethod (c$, "put", 
function (key, value) {
{
var recent = this.mostRecentKeyValue;
if ((recent != null) && (recent.key === key)) recent.value = value;
return this.table.put (key, value);
}}, "~O,~O");
Clazz.defineMethod (c$, "remove", 
function (key) {
{
var recent = this.mostRecentKeyValue;
if ((recent != null) && (recent.key === key)) recent.value = null;
return this.table.remove (key);
}}, "~O");
Clazz.defineMethod (c$, "getThreadGroup", 
function () {
return this.threadGroup;
});
Clazz.defineMethod (c$, "getContextClassLoader", 
function () {
return this.contextClassLoader;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[threadGroup=" + this.threadGroup.getName () + "]";
});
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners ();
});
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (propertyName, listener) {
if (listener == null) {
return;
}if (this.changeSupport == null) {
this.changeSupport =  new jsjava.beans.PropertyChangeSupport (this);
}this.changeSupport.addPropertyChangeListener (propertyName, listener);
}, "~S,jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (propertyName, listener) {
if (listener == null || this.changeSupport == null) {
return;
}this.changeSupport.removePropertyChangeListener (propertyName, listener);
}, "~S,jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function (propertyName) {
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners (propertyName);
}, "~S");
c$.$AppContext$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jssun.awt, "AppContext$1", null, jsjava.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return Thread.currentThread ().getContextClassLoader ();
});
c$ = Clazz.p0p ();
};
c$.$AppContext$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jssun.awt, "AppContext$2", null, jsjava.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
var currentThreadGroup = this.f$.currentThread.getThreadGroup ();
var threadGroup = currentThreadGroup;
if (jssun.awt.AppContext.numAppContexts == 0) {
}var context = jssun.awt.AppContext.threadGroup2appContext.get (threadGroup);
while (context == null) {
threadGroup = threadGroup.getParent ();
if (threadGroup == null) {
var securityManager = System.getSecurityManager ();
if (securityManager != null) {
var smThreadGroup = securityManager.getThreadGroup ();
if (smThreadGroup != null) {
return jssun.awt.AppContext.threadGroup2appContext.get (smThreadGroup);
}}return null;
}context = jssun.awt.AppContext.threadGroup2appContext.get (threadGroup);
}
for (var tg = currentThreadGroup; tg !== threadGroup; tg = tg.getParent ()) {
jssun.awt.AppContext.threadGroup2appContext.put (tg, context);
}
jssun.awt.AppContext.mostRecentThreadAppContext =  new jssun.awt.MostRecentThreadAppContext (this.f$.currentThread, context);
return context;
});
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.appContext = null;
this.runnable = null;
Clazz.instantialize (this, arguments);
}, jssun.awt.AppContext, "CreateThreadAction", null, jsjava.security.PrivilegedAction);
Clazz.makeConstructor (c$, 
function (a, b) {
this.appContext = a;
this.runnable = b;
}, "jssun.awt.AppContext,Runnable");
Clazz.overrideMethod (c$, "run", 
function () {
var a =  new Thread (this.appContext.getThreadGroup (), this.runnable);
a.setContextClassLoader (this.appContext.getContextClassLoader ());
a.setPriority (6);
a.setDaemon (true);
return a;
});
c$ = Clazz.p0p ();
c$.EVENT_QUEUE_KEY = c$.prototype.EVENT_QUEUE_KEY =  new StringBuffer ("EventQueue");
c$.threadGroup2appContext = c$.prototype.threadGroup2appContext = java.util.Collections.synchronizedMap ( new java.util.IdentityHashMap ());
Clazz.defineStatics (c$,
"DISPOSED_PROPERTY_NAME", "disposed",
"GUI_DISPOSED", "guidisposed",
"numAppContexts", 0,
"mostRecentThreadAppContext", null);
c$ = Clazz.decorateAsClass (function () {
this.thread = null;
this.appContext = null;
Clazz.instantialize (this, arguments);
}, jssun.awt, "MostRecentThreadAppContext");
Clazz.makeConstructor (c$, 
function (key, value) {
this.thread = key;
this.appContext = value;
}, "Thread,jssun.awt.AppContext");
c$ = Clazz.decorateAsClass (function () {
this.key = null;
this.value = null;
Clazz.instantialize (this, arguments);
}, jssun.awt, "MostRecentKeyValue");
Clazz.makeConstructor (c$, 
function (k, v) {
this.key = k;
this.value = v;
}, "~O,~O");
Clazz.defineMethod (c$, "setPair", 
function (k, v) {
this.key = k;
this.value = v;
}, "~O,~O");
});
