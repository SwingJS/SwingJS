Clazz.declarePackage ("sun.misc");
Clazz.load (["java.util.Enumeration"], ["sun.misc.FIFOQueueEnumerator", "$.Queue", "$.LIFOQueueEnumerator", "$.QueueElement"], ["java.util.NoSuchElementException", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.length = 0;
this.head = null;
this.tail = null;
Clazz.instantialize (this, arguments);
}, sun.misc, "Queue");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "enqueue", 
function (obj) {
var newElt =  new sun.misc.QueueElement (obj);
if (this.head == null) {
this.head = newElt;
this.tail = newElt;
this.length = 1;
} else {
newElt.next = this.head;
this.head.prev = newElt;
this.head = newElt;
this.length++;
}this.notify ();
}, "~O");
Clazz.defineMethod (c$, "dequeue", 
function () {
return this.dequeue (0);
});
Clazz.defineMethod (c$, "dequeue", 
function (timeOut) {
while (this.tail == null) {
swingjs.JSToolkit.warn ("Cannot wait in Queue.java");
this.wait (timeOut);
}
var elt = this.tail;
this.tail = elt.prev;
if (this.tail == null) {
this.head = null;
} else {
this.tail.next = null;
}this.length--;
return elt.obj;
}, "~N");
Clazz.defineMethod (c$, "isEmpty", 
function () {
return (this.tail == null);
});
Clazz.defineMethod (c$, "elements", 
function () {
return  new sun.misc.LIFOQueueEnumerator (this);
});
Clazz.defineMethod (c$, "reverseElements", 
function () {
return  new sun.misc.FIFOQueueEnumerator (this);
});
Clazz.defineMethod (c$, "dump", 
function (msg) {
System.err.println (">> " + msg);
System.err.println ("[" + this.length + " elt(s); head = " + (this.head == null ? "null" : (this.head.obj) + "") + " tail = " + (this.tail == null ? "null" : (this.tail.obj) + ""));
var cursor = this.head;
var last = null;
while (cursor != null) {
System.err.println ("  " + cursor);
last = cursor;
cursor = cursor.next;
}
if (last !== this.tail) {
System.err.println ("  tail != last: " + this.tail + ", " + last);
}System.err.println ("]");
}, "~S");
c$ = Clazz.decorateAsClass (function () {
this.queue = null;
this.cursor = null;
Clazz.instantialize (this, arguments);
}, sun.misc, "FIFOQueueEnumerator", null, java.util.Enumeration);
Clazz.makeConstructor (c$, 
function (q) {
this.queue = q;
this.cursor = q.tail;
}, "sun.misc.Queue");
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return (this.cursor != null);
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
{
if (this.cursor != null) {
var result = this.cursor;
this.cursor = this.cursor.prev;
return result.obj;
}}throw  new java.util.NoSuchElementException ("FIFOQueueEnumerator");
});
c$ = Clazz.decorateAsClass (function () {
this.queue = null;
this.cursor = null;
Clazz.instantialize (this, arguments);
}, sun.misc, "LIFOQueueEnumerator", null, java.util.Enumeration);
Clazz.makeConstructor (c$, 
function (q) {
this.queue = q;
this.cursor = q.head;
}, "sun.misc.Queue");
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return (this.cursor != null);
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
{
if (this.cursor != null) {
var result = this.cursor;
this.cursor = this.cursor.next;
return result.obj;
}}throw  new java.util.NoSuchElementException ("LIFOQueueEnumerator");
});
c$ = Clazz.decorateAsClass (function () {
this.next = null;
this.prev = null;
this.obj = null;
Clazz.instantialize (this, arguments);
}, sun.misc, "QueueElement");
Clazz.makeConstructor (c$, 
function (obj) {
this.obj = obj;
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return "QueueElement[obj=" + this.obj + (this.prev == null ? " null" : " prev") + (this.next == null ? " null" : " next") + "]";
});
});
