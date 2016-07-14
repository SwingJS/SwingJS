Clazz.declarePackage ("java.lang");
Clazz.load (["java.lang.Enum"], "java.lang.Thread", ["java.lang.Exception", "$.IllegalArgumentException", "$.IllegalThreadStateException", "$.NoSuchMethodError", "$.NullPointerException", "$.ThreadDeath", "java.util.HashMap", "java.lang.ThreadGroup", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.priority = 5;
this.daemon = false;
this.target = null;
this.group = null;
this.tid = 0;
this.threadStatus = 0;
this.parkBlocker = null;
this.stopBeforeStart = false;
this.throwableFromStop = null;
this.me = null;
this.uncaughtExceptionHandler = null;
this.$interrupted = false;
this.stopped = false;
Clazz.instantialize (this, arguments);
}, java.lang, "Thread", null, Runnable);
c$.nextThreadNum = Clazz.defineMethod (c$, "nextThreadNum", 
 function () {
return java.lang.Thread.threadInitNumber++;
});
c$.nextThreadID = Clazz.defineMethod (c$, "nextThreadID", 
 function () {
return ++java.lang.Thread.threadSeqNumber;
});
c$.currentThread = Clazz.defineMethod (c$, "currentThread", 
function () {
if (java.lang.Thread.thisThread == null) {
java.lang.Thread.thisThread =  new java.lang.Thread ("master");
java.lang.Thread.thisThread.setPriority (5);
}return java.lang.Thread.thisThread;
});
c$.yield = Clazz.defineMethod (c$, "yield", 
function () {
});
c$.sleep = Clazz.defineMethod (c$, "sleep", 
function (millis) {
}, "~N");
c$.sleep = Clazz.defineMethod (c$, "sleep", 
function (millis, nanos) {
if (millis < 0) {
throw  new IllegalArgumentException ("timeout value is negative");
}if (nanos < 0 || nanos > 999999) {
throw  new IllegalArgumentException ("nanosecond timeout value out of range");
}if (nanos >= 500000 || (nanos != 0 && millis == 0)) {
millis++;
}java.lang.Thread.sleep (millis);
}, "~N,~N");
Clazz.defineMethod (c$, "init", 
 function (g, target, name, stackSize) {
this.init (g, target, name, stackSize, null);
}, "java.lang.ThreadGroup,Runnable,~S,~N");
Clazz.defineMethod (c$, "init", 
 function (g, target, name, stackSize, acc) {
var parent = (java.lang.Thread.thisThread == null ? null : java.lang.Thread.thisThread);
if (g == null) {
if (g == null && parent != null) {
g = parent.getThreadGroup ();
}}if (g == null) {
g = this.newThreadGroup (null, name);
parent = this;
}g.checkAccess ();
g.addUnstarted ();
this.group = g;
this.priority = parent.getPriority ();
this.name = name;
this.target = target;
this.setPriority (this.priority);
this.tid = java.lang.Thread.nextThreadID ();
this.me = this;
}, "java.lang.ThreadGroup,Runnable,~S,~N,~O");
Clazz.defineMethod (c$, "newThreadGroup", 
function (group, name) {
return  new java.lang.ThreadGroup (group, name);
}, "java.lang.ThreadGroup,~S");
Clazz.makeConstructor (c$, 
function () {
this.init (null, null, "Thread-" + java.lang.Thread.nextThreadNum (), 0);
});
Clazz.makeConstructor (c$, 
function (target) {
this.init (null, target, "Thread-" + java.lang.Thread.nextThreadNum (), 0);
}, "Runnable");
Clazz.makeConstructor (c$, 
function (group, target) {
this.init (group, target, "Thread-" + java.lang.Thread.nextThreadNum (), 0);
}, "java.lang.ThreadGroup,Runnable");
Clazz.makeConstructor (c$, 
function (name) {
this.init (null, null, name, 0);
}, "~S");
Clazz.makeConstructor (c$, 
function (group, name) {
this.init (group, null, name, 0);
}, "java.lang.ThreadGroup,~S");
Clazz.makeConstructor (c$, 
function (target, name) {
this.init (null, target, name, 0);
}, "Runnable,~S");
Clazz.makeConstructor (c$, 
function (group, target, name) {
this.init (group, target, name, 0);
}, "java.lang.ThreadGroup,Runnable,~S");
Clazz.makeConstructor (c$, 
function (group, target, name, stackSize) {
this.init (group, target, name, stackSize);
}, "java.lang.ThreadGroup,Runnable,~S,~N");
Clazz.defineMethod (c$, "start", 
function () {
if (this.threadStatus != 0 || this !== this.me) throw  new IllegalThreadStateException ();
this.group.add (this);
this.start0 ();
if (this.stopBeforeStart) {
this.stop0 (this.throwableFromStop);
}});
Clazz.defineMethod (c$, "start0", 
 function () {
});
Clazz.defineMethod (c$, "run", 
function () {
if (this.target != null) {
this.target.run ();
}});
Clazz.defineMethod (c$, "stop", 
function () {
if ((this.threadStatus != 0) && !this.isAlive ()) {
return;
}this.stop1 ( new ThreadDeath ());
});
Clazz.defineMethod (c$, "stop", 
function (obj) {
this.stop1 (obj);
}, "Throwable");
Clazz.defineMethod (c$, "stop1", 
 function (th) {
if (this.threadStatus != 0) {
this.resume ();
this.stop0 (th);
} else {
if (th == null) {
throw  new NullPointerException ();
}this.stopBeforeStart = true;
this.throwableFromStop = th;
}}, "Throwable");
Clazz.defineMethod (c$, "interrupt", 
function () {
this.interrupt0 ();
});
c$.interrupted = Clazz.defineMethod (c$, "interrupted", 
function () {
return java.lang.Thread.currentThread ().isInterruptedB (true);
});
Clazz.defineMethod (c$, "isInterrupted", 
function () {
return this.isInterruptedB (false);
});
Clazz.defineMethod (c$, "isInterruptedB", 
 function (clearInterrupted) {
var wasInt = this.$interrupted;
if (clearInterrupted) this.$interrupted = false;
return wasInt;
}, "~B");
Clazz.defineMethod (c$, "destroy", 
function () {
throw  new NoSuchMethodError ();
});
Clazz.defineMethod (c$, "isAlive", 
function () {
return true;
});
Clazz.defineMethod (c$, "suspend", 
function () {
this.checkAccess ();
this.suspend0 ();
});
Clazz.defineMethod (c$, "resume", 
function () {
this.checkAccess ();
this.resume0 ();
});
Clazz.defineMethod (c$, "setPriority", 
function (newPriority) {
var g;
this.checkAccess ();
if (newPriority > 10 || newPriority < 1) {
throw  new IllegalArgumentException ();
}if ((g = this.getThreadGroup ()) != null) {
if (newPriority > g.getMaxPriority ()) {
newPriority = g.getMaxPriority ();
}this.setPriority0 (this.priority = newPriority);
}}, "~N");
Clazz.defineMethod (c$, "getPriority", 
function () {
return this.priority;
});
Clazz.defineMethod (c$, "setName", 
function (name) {
this.checkAccess ();
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getThreadGroup", 
function () {
return this.group;
});
c$.activeCount = Clazz.defineMethod (c$, "activeCount", 
function () {
return java.lang.Thread.currentThread ().getThreadGroup ().activeCount ();
});
c$.enumerate = Clazz.defineMethod (c$, "enumerate", 
function (tarray) {
return java.lang.Thread.currentThread ().getThreadGroup ().enumerate (tarray);
}, "~A");
Clazz.defineMethod (c$, "countStackFrames", 
function () {
return 0;
});
Clazz.defineMethod (c$, "join", 
function (millis) {
var base = System.currentTimeMillis ();
var now = 0;
if (millis < 0) {
throw  new IllegalArgumentException ("timeout value is negative");
}swingjs.JSToolkit.warn ("Cannot wait in Thread");
if (millis == 0) {
while (this.isAlive ()) {
this.wait (0);
}
} else {
while (this.isAlive ()) {
var delay = millis - now;
if (delay <= 0) {
break;
}this.wait (delay);
now = System.currentTimeMillis () - base;
}
}}, "~N");
Clazz.defineMethod (c$, "join", 
function (millis, nanos) {
if (millis < 0) {
throw  new IllegalArgumentException ("timeout value is negative");
}if (nanos < 0 || nanos > 999999) {
throw  new IllegalArgumentException ("nanosecond timeout value out of range");
}if (nanos >= 500000 || (nanos != 0 && millis == 0)) {
millis++;
}this.join (millis);
}, "~N,~N");
Clazz.defineMethod (c$, "join", 
function () {
this.join (0);
});
c$.dumpStack = Clazz.defineMethod (c$, "dumpStack", 
function () {
 new Exception ("Stack trace").printStackTrace ();
});
Clazz.defineMethod (c$, "setDaemon", 
function (on) {
this.checkAccess ();
if (this.isAlive ()) {
throw  new IllegalThreadStateException ();
}this.daemon = on;
}, "~B");
Clazz.defineMethod (c$, "isDaemon", 
function () {
return this.daemon;
});
Clazz.defineMethod (c$, "checkAccess", 
function () {
});
Clazz.overrideMethod (c$, "toString", 
function () {
var group = this.getThreadGroup ();
if (group != null) {
return "Thread[" + this.getName () + "," + this.getPriority () + "," + group.getName () + "]";
} else {
return "Thread[" + this.getName () + "," + this.getPriority () + "," + "" + "]";
}});
Clazz.defineMethod (c$, "getContextClassLoader", 
function () {
return null;
});
Clazz.defineMethod (c$, "setContextClassLoader", 
function (cl) {
}, "ClassLoader");
c$.holdsLock = Clazz.defineMethod (c$, "holdsLock", 
function (obj) {
return false;
}, "~O");
Clazz.defineMethod (c$, "getStackTrace", 
function () {
return ( new Exception ()).getStackTrace ();
});
c$.getAllStackTraces = Clazz.defineMethod (c$, "getAllStackTraces", 
function () {
var threads = java.lang.Thread.getThreads ();
var traces = java.lang.Thread.dumpThreads (threads);
var m =  new java.util.HashMap (threads.length);
for (var i = 0; i < threads.length; i++) {
var stackTrace = traces[i];
if (stackTrace != null) {
m.put (threads[i], stackTrace);
}}
return m;
});
c$.dumpThreads = Clazz.defineMethod (c$, "dumpThreads", 
 function (threads) {
return null;
}, "~A");
c$.getThreads = Clazz.defineMethod (c$, "getThreads", 
 function () {
return null;
});
Clazz.defineMethod (c$, "getId", 
function () {
return this.tid;
});
Clazz.defineMethod (c$, "getState", 
function () {
switch (this.threadStatus) {
case 0:
return java.lang.Thread.State.NEW;
case 1:
return java.lang.Thread.State.RUNNABLE;
case 2:
default:
return java.lang.Thread.State.TERMINATED;
case 3:
return java.lang.Thread.State.TIMED_WAITING;
case 4:
return java.lang.Thread.State.WAITING;
}
});
c$.setDefaultUncaughtExceptionHandler = Clazz.defineMethod (c$, "setDefaultUncaughtExceptionHandler", 
function (eh) {
java.lang.Thread.defaultUncaughtExceptionHandler = eh;
}, "java.lang.Thread.UncaughtExceptionHandler");
c$.getDefaultUncaughtExceptionHandler = Clazz.defineMethod (c$, "getDefaultUncaughtExceptionHandler", 
function () {
return java.lang.Thread.defaultUncaughtExceptionHandler;
});
Clazz.defineMethod (c$, "getUncaughtExceptionHandler", 
function () {
return this.uncaughtExceptionHandler != null ? this.uncaughtExceptionHandler : this.group;
});
Clazz.defineMethod (c$, "setUncaughtExceptionHandler", 
function (eh) {
this.checkAccess ();
this.uncaughtExceptionHandler = eh;
}, "java.lang.Thread.UncaughtExceptionHandler");
Clazz.defineMethod (c$, "setPriority0", 
 function (newPriority) {
}, "~N");
Clazz.defineMethod (c$, "stop0", 
 function (o) {
this.stopped = true;
}, "~O");
Clazz.defineMethod (c$, "suspend0", 
 function () {
});
Clazz.defineMethod (c$, "resume0", 
 function () {
});
Clazz.defineMethod (c$, "interrupt0", 
 function () {
this.$interrupted = true;
});
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (java.lang.Thread, "State", Enum);
Clazz.defineEnumConstant (c$, "NEW", 0, []);
Clazz.defineEnumConstant (c$, "RUNNABLE", 1, []);
Clazz.defineEnumConstant (c$, "BLOCKED", 2, []);
Clazz.defineEnumConstant (c$, "WAITING", 3, []);
Clazz.defineEnumConstant (c$, "TIMED_WAITING", 4, []);
Clazz.defineEnumConstant (c$, "TERMINATED", 5, []);
c$ = Clazz.p0p ();
Clazz.declareInterface (java.lang.Thread, "UncaughtExceptionHandler");
Clazz.defineStatics (c$,
"threadInitNumber", 0,
"threadSeqNumber", 0,
"thisThread", null,
"MIN_PRIORITY", 1,
"NORM_PRIORITY", 5,
"MAX_PRIORITY", 10,
"defaultUncaughtExceptionHandler", null);
});
