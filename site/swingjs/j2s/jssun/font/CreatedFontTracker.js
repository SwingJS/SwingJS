Clazz.declarePackage ("jssun.font");
Clazz.load (["java.util.HashMap"], "jssun.font.CreatedFontTracker", ["java.lang.Runtime", "$.Thread", "java.util.concurrent.Semaphore", "$.TimeUnit", "jsjava.security.AccessController", "$.PrivilegedAction", "jssun.awt.AppContext"], function () {
c$ = Clazz.decorateAsClass (function () {
this.numBytes = 0;
Clazz.instantialize (this, arguments);
}, jssun.font, "CreatedFontTracker");
c$.getTracker = Clazz.defineMethod (c$, "getTracker", 
function () {
if (jssun.font.CreatedFontTracker.tracker == null) {
jssun.font.CreatedFontTracker.tracker =  new jssun.font.CreatedFontTracker ();
}return jssun.font.CreatedFontTracker.tracker;
});
Clazz.makeConstructor (c$, 
($fz = function () {
this.numBytes = 0;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getNumBytes", 
function () {
return this.numBytes;
});
Clazz.defineMethod (c$, "addBytes", 
function (sz) {
this.numBytes += sz;
}, "~N");
Clazz.defineMethod (c$, "subBytes", 
function (sz) {
this.numBytes -= sz;
}, "~N");
c$.getCS = Clazz.defineMethod (c$, "getCS", 
($fz = function () {
var appContext = jssun.awt.AppContext.getAppContext ();
var cs = appContext.get (jssun.font.CreatedFontTracker);
if (cs == null) {
cs =  new java.util.concurrent.Semaphore (5, true);
appContext.put (jssun.font.CreatedFontTracker, cs);
}return cs;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "acquirePermit", 
function () {
return jssun.font.CreatedFontTracker.getCS ().tryAcquire (120, java.util.concurrent.TimeUnit.SECONDS);
});
Clazz.defineMethod (c$, "releasePermit", 
function () {
jssun.font.CreatedFontTracker.getCS ().release ();
});
Clazz.defineMethod (c$, "add", 
function (file) {
jssun.font.CreatedFontTracker.TempFileDeletionHook.add (file);
}, "java.io.File");
Clazz.defineMethod (c$, "set", 
function (file, os) {
jssun.font.CreatedFontTracker.TempFileDeletionHook.set (file, os);
}, "java.io.File,java.io.OutputStream");
Clazz.defineMethod (c$, "remove", 
function (file) {
jssun.font.CreatedFontTracker.TempFileDeletionHook.remove (file);
}, "java.io.File");
Clazz.pu$h ();
c$ = Clazz.declareType (jssun.font.CreatedFontTracker, "TempFileDeletionHook");
c$.init = Clazz.defineMethod (c$, "init", 
function () {
if (jssun.font.CreatedFontTracker.TempFileDeletionHook.t == null) {
jsjava.security.AccessController.doPrivileged (((Clazz.isClassDefined ("jssun.font.CreatedFontTracker$TempFileDeletionHook$1") ? 0 : jssun.font.CreatedFontTracker.TempFileDeletionHook.$CreatedFontTracker$TempFileDeletionHook$1$ ()), Clazz.innerTypeInstance (jssun.font.CreatedFontTracker$TempFileDeletionHook$1, this, null)));
}});
c$.add = Clazz.defineMethod (c$, "add", 
function (a) {
jssun.font.CreatedFontTracker.TempFileDeletionHook.init ();
jssun.font.CreatedFontTracker.TempFileDeletionHook.files.put (a, null);
}, "java.io.File");
c$.set = Clazz.defineMethod (c$, "set", 
function (a, b) {
jssun.font.CreatedFontTracker.TempFileDeletionHook.files.put (a, b);
}, "java.io.File,java.io.OutputStream");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (a) {
jssun.font.CreatedFontTracker.TempFileDeletionHook.files.remove (a);
}, "java.io.File");
c$.runHooks = Clazz.defineMethod (c$, "runHooks", 
function () {
if (jssun.font.CreatedFontTracker.TempFileDeletionHook.files.isEmpty ()) {
return;
}for (var entry, $entry = jssun.font.CreatedFontTracker.TempFileDeletionHook.files.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
try {
if (entry.getValue () != null) {
entry.getValue ().close ();
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
entry.getKey ().$delete ();
}
});
c$.$CreatedFontTracker$TempFileDeletionHook$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jssun.font, "CreatedFontTracker$TempFileDeletionHook$1", null, jsjava.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
var a = Thread.currentThread ().getThreadGroup ();
for (var b = a; b != null; a = b, b = a.getParent ()) ;
jssun.font.CreatedFontTracker.TempFileDeletionHook.t =  new Thread (a, ((Clazz.isClassDefined ("jssun.font.CreatedFontTracker$TempFileDeletionHook$1$1") ? 0 : jssun.font.CreatedFontTracker.$CreatedFontTracker$TempFileDeletionHook$1$1$ ()), Clazz.innerTypeInstance (jssun.font.CreatedFontTracker$TempFileDeletionHook$1$1, this, null)));
jssun.font.CreatedFontTracker.TempFileDeletionHook.t.setContextClassLoader (null);
Runtime.getRuntime ().addShutdownHook (jssun.font.CreatedFontTracker.TempFileDeletionHook.t);
return null;
});
c$ = Clazz.p0p ();
};
c$.$CreatedFontTracker$TempFileDeletionHook$1$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jssun.font, "CreatedFontTracker$TempFileDeletionHook$1$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
jssun.font.CreatedFontTracker.TempFileDeletionHook.runHooks ();
});
c$ = Clazz.p0p ();
};
c$.files = c$.prototype.files =  new java.util.HashMap ();
Clazz.defineStatics (c$,
"t", null);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"MAX_FILE_SIZE", 33554432,
"MAX_TOTAL_BYTES", 335544320,
"tracker", null);
});
