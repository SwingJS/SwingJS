Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["java.util.concurrent.Delayed", "java.util.concurrent.atomic.AtomicLong"], "jsjavax.swing.TimerQueue", ["java.lang.StringBuilder", "$.Thread", "java.util.concurrent.DelayQueue", "$.TimeUnit", "java.util.concurrent.locks.ReentrantLock", "jsjava.security.AccessController", "$.PrivilegedAction", "jsjavax.swing.SwingUtilities", "jssun.awt.AppContext"], function () {
c$ = Clazz.decorateAsClass (function () {
this.queue = null;
this.running = false;
this.runningLock = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "TimerQueue", null, Runnable);
Clazz.makeConstructor (c$, 
function () {
this.queue =  new java.util.concurrent.DelayQueue ();
this.runningLock =  new java.util.concurrent.locks.ReentrantLock ();
this.startIfNeeded ();
});
c$.sharedInstance = Clazz.defineMethod (c$, "sharedInstance", 
function () {
{
var sharedInst = jsjavax.swing.SwingUtilities.appContextGet (jsjavax.swing.TimerQueue.sharedInstanceKey);
if (sharedInst == null) {
sharedInst =  new jsjavax.swing.TimerQueue ();
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.TimerQueue.sharedInstanceKey, sharedInst);
}return sharedInst;
}});
Clazz.defineMethod (c$, "startIfNeeded", 
function () {
if (!this.running) {
this.runningLock.lock ();
try {
var threadGroup = jssun.awt.AppContext.getAppContext ().getThreadGroup ();
jsjava.security.AccessController.doPrivileged (((Clazz.isClassDefined ("jsjavax.swing.TimerQueue$1") ? 0 : jsjavax.swing.TimerQueue.$TimerQueue$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.TimerQueue$1, this, Clazz.cloneFinals ("threadGroup", threadGroup))));
this.running = true;
} finally {
this.runningLock.unlock ();
}
}});
Clazz.defineMethod (c$, "addTimer", 
function (timer, delayMillis) {
try {
if (!this.containsTimer (timer)) {
this.addTimer ( new jsjavax.swing.TimerQueue.DelayedTimer (timer, java.util.concurrent.TimeUnit.MILLISECONDS.toNanos (delayMillis) + jsjavax.swing.TimerQueue.now ()));
}} finally {
}
}, "jsjavax.swing.Timer,~N");
Clazz.defineMethod (c$, "addTimer", 
($fz = function (delayedTimer) {
var timer = delayedTimer.getTimer ();
try {
timer.delayedTimer = delayedTimer;
this.queue.add (delayedTimer);
} finally {
}
}, $fz.isPrivate = true, $fz), "jsjavax.swing.TimerQueue.DelayedTimer");
Clazz.defineMethod (c$, "removeTimer", 
function (timer) {
try {
if (timer.delayedTimer != null) {
this.queue.remove (timer.delayedTimer);
timer.delayedTimer = null;
}} finally {
}
}, "jsjavax.swing.Timer");
Clazz.defineMethod (c$, "containsTimer", 
function (timer) {
try {
return timer.delayedTimer != null;
} finally {
}
}, "jsjavax.swing.Timer");
Clazz.overrideMethod (c$, "run", 
function () {
this.runningLock.lock ();
try {
while (this.running) {
try {
var timer = this.queue.take ().getTimer ();
try {
var delayedTimer = timer.delayedTimer;
if (delayedTimer != null) {
timer.post ();
timer.delayedTimer = null;
if (timer.isRepeats ()) {
delayedTimer.setTime (jsjavax.swing.TimerQueue.now () + java.util.concurrent.TimeUnit.MILLISECONDS.toNanos (timer.getDelay ()));
this.addTimer (delayedTimer);
}}} catch (ignore) {
if (Clazz.exceptionOf (ignore, SecurityException)) {
} else {
throw ignore;
}
} finally {
}
} catch (ie) {
if (Clazz.exceptionOf (ie, InterruptedException)) {
if (jssun.awt.AppContext.getAppContext ().isDisposed ()) {
break;
}} else {
throw ie;
}
}
}
} catch (td) {
if (Clazz.exceptionOf (td, ThreadDeath)) {
for (var delayedTimer, $delayedTimer = this.queue.iterator (); $delayedTimer.hasNext () && ((delayedTimer = $delayedTimer.next ()) || true);) {
delayedTimer.getTimer ().cancelEvent ();
}
throw td;
} else {
throw td;
}
} finally {
this.running = false;
this.runningLock.unlock ();
}
});
Clazz.defineMethod (c$, "toString", 
function () {
var buf =  new StringBuilder ();
buf.append ("TimerQueue (");
var isFirst = true;
for (var delayedTimer, $delayedTimer = this.queue.iterator (); $delayedTimer.hasNext () && ((delayedTimer = $delayedTimer.next ()) || true);) {
if (!isFirst) {
buf.append (", ");
}buf.append (delayedTimer.getTimer ().toString ());
isFirst = false;
}
buf.append (")");
return buf.toString ();
});
c$.now = Clazz.defineMethod (c$, "now", 
($fz = function () {
return System.nanoTime () - jsjavax.swing.TimerQueue.NANO_ORIGIN;
}, $fz.isPrivate = true, $fz));
c$.$TimerQueue$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "TimerQueue$1", null, jsjava.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
var timerThread =  new Thread (this.f$.threadGroup, this.b$["jsjavax.swing.TimerQueue"], "TimerQueue");
timerThread.setDaemon (true);
timerThread.setPriority (5);
timerThread.start ();
return null;
});
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.sequenceNumber = 0;
this.time = 0;
this.timer = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.TimerQueue, "DelayedTimer", null, java.util.concurrent.Delayed);
Clazz.makeConstructor (c$, 
function (a, b) {
this.timer = a;
this.time = b;
this.sequenceNumber = jsjavax.swing.TimerQueue.DelayedTimer.sequencer.getAndIncrement ();
}, "jsjavax.swing.Timer,~N");
Clazz.defineMethod (c$, "getDelay", 
function (a) {
return a.convert (this.time - jsjavax.swing.TimerQueue.now (), java.util.concurrent.TimeUnit.NANOSECONDS);
}, "java.util.concurrent.TimeUnit");
Clazz.defineMethod (c$, "setTime", 
function (a) {
this.time = a;
}, "~N");
Clazz.defineMethod (c$, "getTimer", 
function () {
return this.timer;
});
Clazz.overrideMethod (c$, "compareTo", 
function (a) {
if (a === this) {
return 0;
}if (Clazz.instanceOf (a, jsjavax.swing.TimerQueue.DelayedTimer)) {
var b = a;
var c = this.time - b.time;
if (c < 0) {
return -1;
} else if (c > 0) {
return 1;
} else if (this.sequenceNumber < b.sequenceNumber) {
return -1;
} else {
return 1;
}}var b = (this.getDelay (java.util.concurrent.TimeUnit.NANOSECONDS) - a.getDelay (java.util.concurrent.TimeUnit.NANOSECONDS));
return (b == 0) ? 0 : ((b < 0) ? -1 : 1);
}, "java.util.concurrent.Delayed");
c$.sequencer = c$.prototype.sequencer =  new java.util.concurrent.atomic.AtomicLong (0);
c$ = Clazz.p0p ();
c$.sharedInstanceKey = c$.prototype.sharedInstanceKey =  new JavaObject ();
c$.classLock = c$.prototype.classLock =  new JavaObject ();
c$.NANO_ORIGIN = c$.prototype.NANO_ORIGIN = System.nanoTime ();
});
