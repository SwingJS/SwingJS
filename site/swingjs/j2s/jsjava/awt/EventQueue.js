Clazz.declarePackage ("jsjava.awt");
Clazz.load (["java.util.logging.Logger"], ["jsjava.awt.EventQueueItem", "$.EventQueue", "$.Queue"], ["java.lang.Error", "java.lang.reflect.InvocationTargetException", "java.util.EmptyStackException", "java.util.logging.Level", "jsjava.awt.ActiveEvent", "$.Component", "jsjava.awt.event.InvocationEvent", "$.MouseEvent", "jsjava.security.PrivilegedAction", "jssun.awt.AppContext", "$.SunToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.queues = null;
this.nextQueue = null;
this.previousQueue = null;
this.mostRecentEventTime = 0;
this.currentEvent = null;
this.waitForID = 0;
this.name = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "EventQueue");
Clazz.prepareFields (c$, function () {
this.queues =  new Array (4);
this.mostRecentEventTime = System.currentTimeMillis ();
this.name = "AWT-EventQueue-" + jsjava.awt.EventQueue.nextThreadNum ();
});
c$.nextThreadNum = Clazz.defineMethod (c$, "nextThreadNum", 
($fz = function () {
return jsjava.awt.EventQueue.threadInitNumber++;
}, $fz.isPrivate = true, $fz));
Clazz.makeConstructor (c$, 
function () {
for (var i = 0; i < 4; i++) {
this.queues[i] =  new jsjava.awt.Queue ();
}
});
Clazz.defineMethod (c$, "postEvent", 
function (theEvent) {
jssun.awt.SunToolkit.flushPendingEvents ();
this.postEventPrivate (theEvent);
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "postEventPrivate", 
function (theEvent) {
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "coalesceMouseEvent", 
($fz = function (e) {
var cache = (e.getSource ()).eventCache;
if (cache == null) {
return false;
}var index = jsjava.awt.EventQueue.eventToCacheIndex (e);
if (index != -1 && cache[index] != null) {
cache[index].event = e;
return true;
}return false;
}, $fz.isPrivate = true, $fz), "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "coalesceOtherEvent", 
($fz = function (e, priority) {
var id = e.getID ();
var source = e.getSource ();
for (var entry = this.queues[priority].head; entry != null; entry = entry.next) {
if (entry.event.getSource () === source && entry.id == id) {
var coalescedEvent = source.coalesceEvents (entry.event, e);
if (coalescedEvent != null) {
entry.event = coalescedEvent;
return true;
}}}
return false;
}, $fz.isPrivate = true, $fz), "jsjava.awt.AWTEvent,~N");
Clazz.defineMethod (c$, "coalesceEvent", 
($fz = function (e, priority) {
if (!(Clazz.instanceOf (e.getSource (), jsjava.awt.Component))) {
return false;
}if ((e.getSource ()).isCoalescingEnabled () && this.coalesceOtherEvent (e, priority)) {
return true;
}if (Clazz.instanceOf (e, jsjava.awt.event.MouseEvent)) {
return this.coalesceMouseEvent (e);
}return false;
}, $fz.isPrivate = true, $fz), "jsjava.awt.AWTEvent,~N");
Clazz.defineMethod (c$, "cacheEQItem", 
($fz = function (entry) {
var index = jsjava.awt.EventQueue.eventToCacheIndex (entry.event);
if (index != -1 && Clazz.instanceOf (entry.event.getSource (), jsjava.awt.Component)) {
var source = entry.event.getSource ();
if (source.eventCache == null) {
source.eventCache =  new Array (5);
}source.eventCache[index] = entry;
}}, $fz.isPrivate = true, $fz), "jsjava.awt.EventQueueItem");
Clazz.defineMethod (c$, "uncacheEQItem", 
($fz = function (entry) {
var index = jsjava.awt.EventQueue.eventToCacheIndex (entry.event);
if (index != -1 && Clazz.instanceOf (entry.event.getSource (), jsjava.awt.Component)) {
var source = entry.event.getSource ();
if (source.eventCache == null) {
return;
}source.eventCache[index] = null;
}}, $fz.isPrivate = true, $fz), "jsjava.awt.EventQueueItem");
c$.eventToCacheIndex = Clazz.defineMethod (c$, "eventToCacheIndex", 
($fz = function (e) {
switch (e.getID ()) {
case 800:
return 0;
case 801:
return 1;
case 503:
return 2;
case 506:
return 3;
default:
return -1;
}
}, $fz.isPrivate = true, $fz), "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "noEvents", 
($fz = function () {
for (var i = 0; i < 4; i++) {
if (this.queues[i].head != null) {
return false;
}}
return true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getNextEvent", 
function () {
do {
jssun.awt.SunToolkit.flushPendingEvents ();
{
for (var i = 3; i >= 0; i--) {
if (this.queues[i].head != null) {
var entry = this.queues[i].head;
this.queues[i].head = entry.next;
if (entry.next == null) {
this.queues[i].tail = null;
}this.uncacheEQItem (entry);
return entry.event;
}}
this.wait ();
}} while (true);
});
Clazz.defineMethod (c$, "getNextEvent", 
function (id) {
do {
jssun.awt.SunToolkit.flushPendingEvents ();
{
for (var i = 0; i < 4; i++) {
for (var entry = this.queues[i].head, prev = null; entry != null; prev = entry, entry = entry.next) {
if (entry.id == id) {
if (prev == null) {
this.queues[i].head = entry.next;
} else {
prev.next = entry.next;
}if (this.queues[i].tail === entry) {
this.queues[i].tail = prev;
}this.uncacheEQItem (entry);
return entry.event;
}}
}
this.waitForID = id;
this.wait ();
this.waitForID = 0;
}} while (true);
}, "~N");
Clazz.defineMethod (c$, "peekEvent", 
function () {
for (var i = 3; i >= 0; i--) {
if (this.queues[i].head != null) {
return this.queues[i].head.event;
}}
return null;
});
Clazz.defineMethod (c$, "peekEvent", 
function (id) {
for (var i = 3; i >= 0; i--) {
var q = this.queues[i].head;
for (; q != null; q = q.next) {
if (q.id == id) {
return q.event;
}}
}
return null;
}, "~N");
Clazz.defineMethod (c$, "dispatchEvent", 
function (event) {
var src = event.getSource ();
var action = ((Clazz.isClassDefined ("jsjava.awt.EventQueue$1") ? 0 : jsjava.awt.EventQueue.$EventQueue$1$ ()), Clazz.innerTypeInstance (jsjava.awt.EventQueue$1, this, Clazz.cloneFinals ("event", event, "src", src)));
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "dispatchEventImpl", 
($fz = function (event, src) {
event.isPosted = true;
if (Clazz.instanceOf (event, jsjava.awt.ActiveEvent)) {
this.setCurrentEventAndMostRecentTimeImpl (event);
(event).dispatch ();
} else if (Clazz.instanceOf (src, jsjava.awt.Component)) {
(src).dispatchEvent (event);
event.dispatched ();
} else {
System.err.println ("unable to dispatch event: " + event);
}}, $fz.isPrivate = true, $fz), "jsjava.awt.AWTEvent,~O");
c$.getMostRecentEventTime = Clazz.defineMethod (c$, "getMostRecentEventTime", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getMostRecentEventTimeEx", 
function () {
return this.mostRecentEventTime;
});
c$.getCurrentEvent = Clazz.defineMethod (c$, "getCurrentEvent", 
function () {
return null;
});
Clazz.defineMethod (c$, "push", 
function (newEventQueue) {
if (jsjava.awt.EventQueue.eventLog.isLoggable (java.util.logging.Level.FINE)) {
jsjava.awt.EventQueue.eventLog.log (java.util.logging.Level.FINE, "EventQueue.push(" + newEventQueue + ")");
}if (this.nextQueue != null) {
this.nextQueue.push (newEventQueue);
return;
}{
while (this.peekEvent () != null) {
try {
newEventQueue.postEventPrivate (this.getNextEvent ());
} catch (ie) {
if (Clazz.exceptionOf (ie, InterruptedException)) {
if (jsjava.awt.EventQueue.eventLog.isLoggable (java.util.logging.Level.FINE)) {
jsjava.awt.EventQueue.eventLog.log (java.util.logging.Level.FINE, "Interrupted push", ie);
}} else {
throw ie;
}
}
}
newEventQueue.previousQueue = this;
}this.nextQueue = newEventQueue;
var appContext = jssun.awt.AppContext.getAppContext ();
if (appContext.get (jssun.awt.AppContext.EVENT_QUEUE_KEY) === this) {
appContext.put (jssun.awt.AppContext.EVENT_QUEUE_KEY, newEventQueue);
}}, "jsjava.awt.EventQueue");
Clazz.defineMethod (c$, "pop", 
function () {
if (jsjava.awt.EventQueue.eventLog.isLoggable (java.util.logging.Level.FINE)) {
jsjava.awt.EventQueue.eventLog.log (java.util.logging.Level.FINE, "EventQueue.pop(" + this + ")");
}var prev = this.previousQueue;
{
{
if (this.nextQueue != null) {
this.nextQueue.pop ();
return;
}if (this.previousQueue == null) {
throw  new java.util.EmptyStackException ();
}this.previousQueue.nextQueue = null;
while (this.peekEvent () != null) {
try {
this.previousQueue.postEventPrivate (this.getNextEvent ());
} catch (ie) {
if (Clazz.exceptionOf (ie, InterruptedException)) {
if (jsjava.awt.EventQueue.eventLog.isLoggable (java.util.logging.Level.FINE)) {
jsjava.awt.EventQueue.eventLog.log (java.util.logging.Level.FINE, "Interrupted pop", ie);
}} else {
throw ie;
}
}
}
var appContext = jssun.awt.AppContext.getAppContext ();
if (appContext.get (jssun.awt.AppContext.EVENT_QUEUE_KEY) === this) {
appContext.put (jssun.awt.AppContext.EVENT_QUEUE_KEY, this.previousQueue);
}this.previousQueue = null;
}}});
c$.isDispatchThread = Clazz.defineMethod (c$, "isDispatchThread", 
function () {
return false;
});
Clazz.defineMethod (c$, "initDispatchThread", 
function () {
});
Clazz.defineMethod (c$, "detachDispatchThread", 
function () {
});
Clazz.defineMethod (c$, "removeSourceEvents", 
function (source, removeAllEvents) {
}, "~O,~B");
c$.setCurrentEventAndMostRecentTime = Clazz.defineMethod (c$, "setCurrentEventAndMostRecentTime", 
function (e) {
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "setCurrentEventAndMostRecentTimeImpl", 
($fz = function (e) {
}, $fz.isPrivate = true, $fz), "jsjava.awt.AWTEvent");
c$.invokeLater = Clazz.defineMethod (c$, "invokeLater", 
function (runnable) {
}, "Runnable");
c$.invokeAndWait = Clazz.defineMethod (c$, "invokeAndWait", 
function (runnable) {
}, "Runnable");
c$.invokeAndWait = Clazz.defineMethod (c$, "invokeAndWait", 
function (source, runnable) {
if (jsjava.awt.EventQueue.isDispatchThread ()) {
throw  new Error ("Cannot call invokeAndWait from the event dispatcher thread");
}if (!Clazz.isClassDefined ("jsjava.awt.EventQueue$1AWTInvocationLock")) {
jsjava.awt.EventQueue.$EventQueue$1AWTInvocationLock$ ();
}
var lock = Clazz.innerTypeInstance (jsjava.awt.EventQueue$1AWTInvocationLock, this, null);
var event =  new jsjava.awt.event.InvocationEvent (source, runnable, lock, true);
var eventThrowable = event.getThrowable ();
if (eventThrowable != null) {
throw  new java.lang.reflect.InvocationTargetException (eventThrowable);
}}, "~O,Runnable");
c$.$EventQueue$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjava.awt, "EventQueue$1", null, jsjava.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["jsjava.awt.EventQueue"].dispatchEventImpl (this.f$.event, this.f$.src);
return null;
});
c$ = Clazz.p0p ();
};
c$.$EventQueue$1AWTInvocationLock$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjava.awt, "EventQueue$1AWTInvocationLock");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"threadInitNumber", 0,
"LOW_PRIORITY", 0,
"NORM_PRIORITY", 1,
"HIGH_PRIORITY", 2,
"ULTIMATE_PRIORITY", 3,
"NUM_PRIORITIES", 4);
c$.eventLog = c$.prototype.eventLog = java.util.logging.Logger.getLogger ("java.awt.event.EventQueue");
Clazz.defineStatics (c$,
"PAINT", 0,
"UPDATE", 1,
"MOVE", 2,
"DRAG", 3,
"PEER", 4,
"CACHE_LENGTH", 5);
c$ = Clazz.decorateAsClass (function () {
this.head = null;
this.tail = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "Queue");
c$ = Clazz.decorateAsClass (function () {
this.event = null;
this.id = 0;
this.next = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "EventQueueItem");
Clazz.makeConstructor (c$, 
function (evt) {
this.event = evt;
this.id = evt.getID ();
}, "jsjava.awt.AWTEvent");
});
