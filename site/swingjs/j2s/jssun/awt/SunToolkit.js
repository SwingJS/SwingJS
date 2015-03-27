Clazz.declarePackage ("jssun.awt");
Clazz.load (["java.lang.RuntimeException", "jsjava.awt.Toolkit", "jssun.awt.ComponentFactory", "$.WindowClosingListener", "$.WindowClosingSupport", "java.util.Collections", "$.WeakHashMap", "java.util.concurrent.locks.ReentrantLock", "jssun.misc.SoftCache"], ["jssun.awt.EventQueueItem", "$.PostEventQueue", "$.SunToolkit"], ["java.lang.Error", "$.NullPointerException", "$.Thread", "java.lang.reflect.InvocationTargetException", "java.util.concurrent.TimeUnit", "jsjava.awt.Component", "$.Dimension", "$.EventQueue", "$.Panel", "$.Window", "jssun.awt.AWTAccessor", "$.AppContext", "$.PeerEvent", "jssun.awt.image.URLImageSource", "jssun.font.FontDesignMetrics"], function () {
c$ = Clazz.decorateAsClass (function () {
this.windowClosingListener = null;
Clazz.instantialize (this, arguments);
}, jssun.awt, "SunToolkit", jsjava.awt.Toolkit, [jssun.awt.WindowClosingSupport, jssun.awt.WindowClosingListener, jssun.awt.ComponentFactory]);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jssun.awt.SunToolkit, []);
var threadGroup = null;
var tgName = System.getProperty ("awt.threadgroup", "");
if (tgName.length != 0) {
try {
var ctor = Class.forName (tgName).getConstructor ( Clazz.newArray (-1, [String]));
threadGroup = ctor.newInstance ( Clazz.newArray (-1, ["AWT-ThreadGroup"]));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.err.println ("Failed loading " + tgName + ": " + e);
} else {
throw e;
}
}
}var initEQ = ((Clazz.isClassDefined ("jssun.awt.SunToolkit$1") ? 0 : jssun.awt.SunToolkit.$SunToolkit$1$ ()), Clazz.innerTypeInstance (jssun.awt.SunToolkit$1, this, null));
if (threadGroup != null) {
var eqInitThread =  new Thread (threadGroup, initEQ, "EventQueue-Init");
eqInitThread.start ();
try {
eqInitThread.join ();
} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
e.printStackTrace ();
} else {
throw e;
}
}
} else {
initEQ.run ();
}});
Clazz.defineMethod (c$, "useBufferPerWindow", 
function () {
return false;
});
c$.awtLock = Clazz.defineMethod (c$, "awtLock", 
function () {
jssun.awt.SunToolkit.AWT_LOCK.lock ();
});
c$.awtTryLock = Clazz.defineMethod (c$, "awtTryLock", 
function () {
return jssun.awt.SunToolkit.AWT_LOCK.tryLock ();
});
c$.awtUnlock = Clazz.defineMethod (c$, "awtUnlock", 
function () {
jssun.awt.SunToolkit.AWT_LOCK.unlock ();
});
c$.awtLockWait = Clazz.defineMethod (c$, "awtLockWait", 
function () {
jssun.awt.SunToolkit.AWT_LOCK_COND.await ();
});
c$.awtLockWait = Clazz.defineMethod (c$, "awtLockWait", 
function (timeout) {
jssun.awt.SunToolkit.AWT_LOCK_COND.await (timeout, java.util.concurrent.TimeUnit.MILLISECONDS);
}, "~N");
c$.awtLockNotify = Clazz.defineMethod (c$, "awtLockNotify", 
function () {
jssun.awt.SunToolkit.AWT_LOCK_COND.signal ();
});
c$.awtLockNotifyAll = Clazz.defineMethod (c$, "awtLockNotifyAll", 
function () {
jssun.awt.SunToolkit.AWT_LOCK_COND.signalAll ();
});
c$.isAWTLockHeldByCurrentThread = Clazz.defineMethod (c$, "isAWTLockHeldByCurrentThread", 
function () {
return jssun.awt.SunToolkit.AWT_LOCK.isHeldByCurrentThread ();
});
c$.createNewAppContext = Clazz.defineMethod (c$, "createNewAppContext", 
function () {
var threadGroup = Thread.currentThread ().getThreadGroup ();
return jssun.awt.SunToolkit.createNewAppContext (threadGroup);
});
c$.createNewAppContext = Clazz.defineMethod (c$, "createNewAppContext", 
function (threadGroup) {
var eventQueue;
var eqName = System.getProperty ("AWT.EventQueueClass", "jsjava.awt.EventQueue");
try {
eventQueue = Class.forName (eqName).newInstance ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.err.println ("Failed loading " + eqName + ": " + e);
eventQueue =  new jsjava.awt.EventQueue ();
} else {
throw e;
}
}
var appContext =  new jssun.awt.AppContext (threadGroup);
appContext.put (jssun.awt.AppContext.EVENT_QUEUE_KEY, eventQueue);
var postEventQueue =  new jssun.awt.PostEventQueue (eventQueue);
appContext.put ("PostEventQueue", postEventQueue);
return appContext;
}, "ThreadGroup");
c$.wakeupEventQueue = Clazz.defineMethod (c$, "wakeupEventQueue", 
function (q, isShutdown) {
}, "jsjava.awt.EventQueue,~B");
c$.targetToPeer = Clazz.defineMethod (c$, "targetToPeer", 
function (target) {
return null;
}, "~O");
c$.targetCreatedPeer = Clazz.defineMethod (c$, "targetCreatedPeer", 
function (target, peer) {
if (target != null && peer != null) {
}}, "~O,~O");
c$.targetDisposedPeer = Clazz.defineMethod (c$, "targetDisposedPeer", 
function (target, peer) {
if (target != null && peer != null) {
}}, "~O,~O");
c$.getAppContext = Clazz.defineMethod (c$, "getAppContext", 
($fz = function (target) {
if (Clazz.instanceOf (target, jsjava.awt.Component)) {
return jssun.awt.AWTAccessor.getComponentAccessor ().getAppContext (target);
} else {
return null;
}}, $fz.isPrivate = true, $fz), "~O");
c$.targetToAppContext = Clazz.defineMethod (c$, "targetToAppContext", 
function (target) {
if (target == null) {
return null;
}var context = jssun.awt.SunToolkit.getAppContext (target);
if (context == null) {
context = jssun.awt.SunToolkit.appContextMap.get (target);
}return context;
}, "~O");
c$.setLWRequestStatus = Clazz.defineMethod (c$, "setLWRequestStatus", 
function (changed, status) {
jssun.awt.AWTAccessor.getWindowAccessor ().setLWRequestStatus (changed, status);
}, "jsjava.awt.Window,~B");
c$.checkAndSetPolicy = Clazz.defineMethod (c$, "checkAndSetPolicy", 
function (cont, isSwingCont) {
}, "jsjava.awt.Container,~B");
c$.insertTargetMapping = Clazz.defineMethod (c$, "insertTargetMapping", 
function (target, appContext) {
}, "~O,jssun.awt.AppContext");
c$.postEvent = Clazz.defineMethod (c$, "postEvent", 
function (appContext, event) {
if (event == null) {
throw  new NullPointerException ();
}var postEventQueue = appContext.get ("PostEventQueue");
if (postEventQueue != null) {
postEventQueue.postEvent (event);
}}, "jssun.awt.AppContext,jsjava.awt.AWTEvent");
c$.postPriorityEvent = Clazz.defineMethod (c$, "postPriorityEvent", 
function (e) {
var pe =  new jssun.awt.PeerEvent (jsjava.awt.Toolkit.getDefaultToolkit (), ((Clazz.isClassDefined ("jssun.awt.SunToolkit$2") ? 0 : jssun.awt.SunToolkit.$SunToolkit$2$ ()), Clazz.innerTypeInstance (jssun.awt.SunToolkit$2, this, Clazz.cloneFinals ("e", e))), 2);
jssun.awt.SunToolkit.postEvent (jssun.awt.SunToolkit.targetToAppContext (e.getSource ()), pe);
}, "jsjava.awt.AWTEvent");
c$.flushPendingEvents = Clazz.defineMethod (c$, "flushPendingEvents", 
function () {
var appContext = jssun.awt.AppContext.getAppContext ();
var postEventQueue = appContext.get ("PostEventQueue");
if (postEventQueue != null) {
postEventQueue.flush ();
}});
c$.isPostEventQueueEmpty = Clazz.defineMethod (c$, "isPostEventQueueEmpty", 
function () {
var appContext = jssun.awt.AppContext.getAppContext ();
var postEventQueue = appContext.get ("PostEventQueue");
if (postEventQueue != null) {
return postEventQueue.noEvents ();
} else {
return true;
}});
c$.executeOnEventHandlerThread = Clazz.defineMethod (c$, "executeOnEventHandlerThread", 
function (target, runnable) {
jssun.awt.SunToolkit.executeOnEventHandlerThread ( new jssun.awt.PeerEvent (target, runnable, 1));
}, "~O,Runnable");
c$.executeOnEventHandlerThread = Clazz.defineMethod (c$, "executeOnEventHandlerThread", 
function (target, runnable, when) {
jssun.awt.SunToolkit.executeOnEventHandlerThread (((Clazz.isClassDefined ("jssun.awt.SunToolkit$3") ? 0 : jssun.awt.SunToolkit.$SunToolkit$3$ ()), Clazz.innerTypeInstance (jssun.awt.SunToolkit$3, this, Clazz.cloneFinals ("when", when), target, runnable, 1)));
}, "~O,Runnable,~N");
c$.executeOnEventHandlerThread = Clazz.defineMethod (c$, "executeOnEventHandlerThread", 
function (peerEvent) {
jssun.awt.SunToolkit.postEvent (jssun.awt.SunToolkit.targetToAppContext (peerEvent.getSource ()), peerEvent);
}, "jssun.awt.PeerEvent");
c$.invokeLaterOnAppContext = Clazz.defineMethod (c$, "invokeLaterOnAppContext", 
function (appContext, dispatcher) {
jssun.awt.SunToolkit.postEvent (appContext,  new jssun.awt.PeerEvent (jsjava.awt.Toolkit.getDefaultToolkit (), dispatcher, 1));
}, "jssun.awt.AppContext,Runnable");
c$.executeOnEDTAndWait = Clazz.defineMethod (c$, "executeOnEDTAndWait", 
function (target, runnable) {
if (jsjava.awt.EventQueue.isDispatchThread ()) {
throw  new Error ("Cannot call executeOnEDTAndWait from any event dispatcher thread");
}if (!Clazz.isClassDefined ("jssun.awt.SunToolkit$1AWTInvocationLock")) {
jssun.awt.SunToolkit.$SunToolkit$1AWTInvocationLock$ ();
}
var lock = Clazz.innerTypeInstance (jssun.awt.SunToolkit$1AWTInvocationLock, this, null);
var event =  new jssun.awt.PeerEvent (target, runnable, lock, true, 1);
{
jssun.awt.SunToolkit.executeOnEventHandlerThread (event);
lock.wait ();
}var eventThrowable = event.getThrowable ();
if (eventThrowable != null) {
throw  new java.lang.reflect.InvocationTargetException (eventThrowable);
}}, "~O,Runnable");
c$.isDispatchThreadForAppContext = Clazz.defineMethod (c$, "isDispatchThreadForAppContext", 
function (target) {
var appContext = jssun.awt.SunToolkit.targetToAppContext (target);
var eq = appContext.get (jssun.awt.AppContext.EVENT_QUEUE_KEY);
var next = jssun.awt.AWTAccessor.getEventQueueAccessor ().getNextQueue (eq);
while (next != null) {
eq = next;
next = jssun.awt.AWTAccessor.getEventQueueAccessor ().getNextQueue (eq);
}
return (Thread.currentThread () === jssun.awt.AWTAccessor.getEventQueueAccessor ().getDispatchThread (eq));
}, "~O");
Clazz.overrideMethod (c$, "getScreenSize", 
function () {
return  new jsjava.awt.Dimension (this.getScreenWidth (), this.getScreenHeight ());
});
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font) {
return jssun.font.FontDesignMetrics.getMetrics (font);
}, "jsjava.awt.Font");
Clazz.overrideMethod (c$, "getFontList", 
function () {
var hardwiredFontList =  Clazz.newArray (-1, ["Dialog", "SansSerif", "Serif", "Monospaced", "DialogInput"]);
return hardwiredFontList;
});
Clazz.defineMethod (c$, "disableBackgroundErase", 
function (component) {
this.disableBackgroundEraseImpl (component);
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "disableBackgroundEraseImpl", 
($fz = function (component) {
jssun.awt.AWTAccessor.getComponentAccessor ().setBackgroundEraseDisabled (component, true);
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component");
c$.getSunAwtNoerasebackground = Clazz.defineMethod (c$, "getSunAwtNoerasebackground", 
function () {
return false;
});
c$.getSunAwtErasebackgroundonresize = Clazz.defineMethod (c$, "getSunAwtErasebackgroundonresize", 
function () {
return true;
});
Clazz.defineMethod (c$, "setOverrideRedirect", 
function (target) {
}, "jsjava.awt.Window");
c$.getImageFromHash = Clazz.defineMethod (c$, "getImageFromHash", 
function (tk, url) {
var img = jssun.awt.SunToolkit.imgCache.get (url);
if (img == null) {
try {
img = tk.createImage ( new jssun.awt.image.URLImageSource (url));
jssun.awt.SunToolkit.imgCache.put (url, img);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}return img;
}, "jsjava.awt.Toolkit,java.net.URL");
c$.getImageFromHash = Clazz.defineMethod (c$, "getImageFromHash", 
function (tk, filename) {
var security = System.getSecurityManager ();
if (security != null) {
security.checkRead (filename);
}var img = jssun.awt.SunToolkit.imgCache.get (filename);
if (img == null) {
try {
jssun.awt.SunToolkit.imgCache.put (filename, img);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}return img;
}, "jsjava.awt.Toolkit,~S");
Clazz.defineMethod (c$, "getImage", 
function (filename) {
return jssun.awt.SunToolkit.getImageFromHash (this, filename);
}, "~S");
Clazz.defineMethod (c$, "getImage", 
function (url) {
return jssun.awt.SunToolkit.getImageFromHash (this, url);
}, "java.net.URL");
Clazz.defineMethod (c$, "createImage", 
function (filename) {
var security = System.getSecurityManager ();
if (security != null) {
security.checkRead (filename);
}return null;
}, "~S");
Clazz.defineMethod (c$, "createImage", 
function (url) {
return this.createImage ( new jssun.awt.image.URLImageSource (url));
}, "java.net.URL");
Clazz.defineMethod (c$, "createImage", 
function (data, offset, length) {
return null;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "createImage", 
function (producer) {
return null;
}, "jsjava.awt.image.ImageProducer");
Clazz.overrideMethod (c$, "checkImage", 
function (img, w, h, o) {
return 0;
}, "jsjava.awt.Image,~N,~N,jsjava.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "prepareImage", 
function (img, w, h, o) {
if (w == 0 || h == 0) {
return true;
}return true;
}, "jsjava.awt.Image,~N,~N,jsjava.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "getSystemEventQueueImpl", 
function () {
return jssun.awt.SunToolkit.getSystemEventQueueImplPP ();
});
c$.getSystemEventQueueImplPP = Clazz.defineMethod (c$, "getSystemEventQueueImplPP", 
function () {
return jssun.awt.SunToolkit.getSystemEventQueueImplPP (jssun.awt.AppContext.getAppContext ());
});
c$.getSystemEventQueueImplPP = Clazz.defineMethod (c$, "getSystemEventQueueImplPP", 
function (appContext) {
var theEventQueue = appContext.get (jssun.awt.AppContext.EVENT_QUEUE_KEY);
return theEventQueue;
}, "jssun.awt.AppContext");
c$.getNativeContainer = Clazz.defineMethod (c$, "getNativeContainer", 
function (c) {
return jsjava.awt.Toolkit.getNativeContainer (c);
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "enableInputMethodsForTextComponent", 
function () {
return false;
});
c$.getStartupLocale = Clazz.defineMethod (c$, "getStartupLocale", 
function () {
if (jssun.awt.SunToolkit.startupLocale == null) {
{
}}return jssun.awt.SunToolkit.startupLocale;
});
Clazz.defineMethod (c$, "getDefaultKeyboardLocale", 
function () {
return jssun.awt.SunToolkit.getStartupLocale ();
});
c$.setDataTransfererClassName = Clazz.defineMethod (c$, "setDataTransfererClassName", 
function (className) {
jssun.awt.SunToolkit.dataTransfererClassName = className;
}, "~S");
c$.getDataTransfererClassName = Clazz.defineMethod (c$, "getDataTransfererClassName", 
function () {
if (jssun.awt.SunToolkit.dataTransfererClassName == null) {
jsjava.awt.Toolkit.getDefaultToolkit ();
}return jssun.awt.SunToolkit.dataTransfererClassName;
});
Clazz.overrideMethod (c$, "getWindowClosingListener", 
function () {
return this.windowClosingListener;
});
Clazz.overrideMethod (c$, "setWindowClosingListener", 
function (wcl) {
this.windowClosingListener = wcl;
}, "jssun.awt.WindowClosingListener");
Clazz.defineMethod (c$, "windowClosingNotify", 
function (event) {
if (this.windowClosingListener != null) {
return this.windowClosingListener.windowClosingNotify (event);
} else {
return null;
}}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowClosingDelivered", 
function (event) {
if (this.windowClosingListener != null) {
return this.windowClosingListener.windowClosingDelivered (event);
} else {
return null;
}}, "jsjava.awt.event.WindowEvent");
c$.isLightweightOrUnknown = Clazz.defineMethod (c$, "isLightweightOrUnknown", 
function (comp) {
if (comp.isLightweight () || !(Clazz.instanceOf (jsjava.awt.Toolkit.getDefaultToolkit (), jssun.awt.SunToolkit))) {
return true;
}return !(Clazz.instanceOf (comp, jsjava.awt.Panel) || Clazz.instanceOf (comp, jsjava.awt.Window));
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getDesktopAAHints", 
function () {
return null;
});
c$.getContainingWindow = Clazz.defineMethod (c$, "getContainingWindow", 
function (comp) {
while (comp != null && !(Clazz.instanceOf (comp, jsjava.awt.Window))) {
comp = comp.getParent ();
}
return comp;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "isNativeGTKAvailable", 
function () {
return false;
});
Clazz.defineMethod (c$, "isWindowOpacitySupported", 
function () {
return false;
});
Clazz.defineMethod (c$, "isWindowShapingSupported", 
function () {
return false;
});
Clazz.defineMethod (c$, "isWindowTranslucencySupported", 
function () {
return false;
});
Clazz.defineMethod (c$, "isTranslucencyCapable", 
function (gc) {
return false;
}, "jsjava.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "needUpdateWindow", 
function () {
return false;
});
c$.$SunToolkit$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jssun.awt, "SunToolkit$1", null, Runnable);
Clazz.defineMethod (c$, "run", 
function () {
var eventQueue;
var eqName = System.getProperty ("AWT.EventQueueClass", "jsjava.awt.EventQueue");
try {
eventQueue = Class.forName (eqName).newInstance ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
System.err.println ("Failed loading " + eqName + ": " + e);
eventQueue =  new jsjava.awt.EventQueue ();
} else {
throw e;
}
}
var appContext = jssun.awt.AppContext.getAppContext ();
appContext.put (jssun.awt.AppContext.EVENT_QUEUE_KEY, eventQueue);
var postEventQueue =  new jssun.awt.PostEventQueue (eventQueue);
appContext.put ("PostEventQueue", postEventQueue);
});
c$ = Clazz.p0p ();
};
c$.$SunToolkit$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jssun.awt, "SunToolkit$2", null, Runnable);
Clazz.defineMethod (c$, "run", 
function () {
jssun.awt.AWTAccessor.getAWTEventAccessor ().setPosted (this.f$.e);
(this.f$.e.getSource ()).dispatchEvent (this.f$.e);
});
c$ = Clazz.p0p ();
};
c$.$SunToolkit$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jssun.awt, "SunToolkit$3", jssun.awt.PeerEvent);
Clazz.overrideMethod (c$, "getWhen", 
function () {
return this.f$.when;
});
c$ = Clazz.p0p ();
};
c$.$SunToolkit$1AWTInvocationLock$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jssun.awt, "SunToolkit$1AWTInvocationLock");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.declareType (jssun.awt.SunToolkit, "OperationTimedOut", RuntimeException);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jssun.awt.SunToolkit.OperationTimedOut, []);
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jssun.awt.SunToolkit, "InfiniteLoop", RuntimeException);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jssun.awt.SunToolkit, "IllegalThreadException", RuntimeException);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jssun.awt.SunToolkit.IllegalThreadException, []);
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"GRAB_EVENT_MASK", 0x80000000,
"POST_EVENT_QUEUE_KEY", "PostEventQueue");
c$.AWT_LOCK = c$.prototype.AWT_LOCK =  new java.util.concurrent.locks.ReentrantLock ();
c$.AWT_LOCK_COND = c$.prototype.AWT_LOCK_COND = jssun.awt.SunToolkit.AWT_LOCK.newCondition ();
c$.appContextMap = c$.prototype.appContextMap = java.util.Collections.synchronizedMap ( new java.util.WeakHashMap ());
c$.imgCache = c$.prototype.imgCache =  new jssun.misc.SoftCache ();
Clazz.defineStatics (c$,
"startupLocale", null,
"dataTransfererClassName", null,
"DEFAULT_WAIT_TIME", 10000,
"DESKTOPFONTHINTS", "awt.font.desktophints");
c$ = Clazz.decorateAsClass (function () {
this.queueHead = null;
this.queueTail = null;
this.eventQueue = null;
Clazz.instantialize (this, arguments);
}, jssun.awt, "PostEventQueue");
Clazz.makeConstructor (c$, 
function (eq) {
this.eventQueue = eq;
}, "jsjava.awt.EventQueue");
Clazz.defineMethod (c$, "noEvents", 
function () {
return this.queueHead == null;
});
Clazz.defineMethod (c$, "flush", 
function () {
if (this.queueHead != null) {
var tempQueue;
{
tempQueue = this.queueHead;
this.queueHead = this.queueTail = null;
while (tempQueue != null) {
this.eventQueue.postEvent (tempQueue.event);
tempQueue = tempQueue.next;
}
}}});
Clazz.defineMethod (c$, "postEvent", 
function (event) {
var item =  new jssun.awt.EventQueueItem (event);
{
if (this.queueHead == null) {
this.queueHead = this.queueTail = item;
} else {
this.queueTail.next = item;
this.queueTail = item;
}}}, "jsjava.awt.AWTEvent");
c$ = Clazz.decorateAsClass (function () {
this.event = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, jssun.awt, "EventQueueItem");
Clazz.makeConstructor (c$, 
function (evt) {
this.event = evt;
}, "jsjava.awt.AWTEvent");
});
