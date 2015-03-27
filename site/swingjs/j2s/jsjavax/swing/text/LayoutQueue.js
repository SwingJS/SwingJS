Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["java.lang.Thread"], "jsjavax.swing.text.LayoutQueue", ["java.util.Vector", "jssun.awt.AppContext"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tasks = null;
this.worker = null;
if (!Clazz.isClassDefined ("jsjavax.swing.text.LayoutQueue.LayoutThread")) {
jsjavax.swing.text.LayoutQueue.$LayoutQueue$LayoutThread$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "LayoutQueue");
Clazz.makeConstructor (c$, 
function () {
this.tasks =  new java.util.Vector ();
});
c$.getDefaultQueue = Clazz.defineMethod (c$, "getDefaultQueue", 
function () {
var ac = jssun.awt.AppContext.getAppContext ();
{
var defaultQueue = ac.get (jsjavax.swing.text.LayoutQueue.DEFAULT_QUEUE);
if (defaultQueue == null) {
defaultQueue =  new jsjavax.swing.text.LayoutQueue ();
ac.put (jsjavax.swing.text.LayoutQueue.DEFAULT_QUEUE, defaultQueue);
}return defaultQueue;
}});
c$.setDefaultQueue = Clazz.defineMethod (c$, "setDefaultQueue", 
function (q) {
{
jssun.awt.AppContext.getAppContext ().put (jsjavax.swing.text.LayoutQueue.DEFAULT_QUEUE, q);
}}, "jsjavax.swing.text.LayoutQueue");
Clazz.defineMethod (c$, "addTask", 
function (task) {
if (this.worker == null) {
this.worker = Clazz.innerTypeInstance (jsjavax.swing.text.LayoutQueue.LayoutThread, this, null);
this.worker.start ();
}this.tasks.addElement (task);
}, "Runnable");
Clazz.defineMethod (c$, "waitForWork", 
function () {
while (this.tasks.size () == 0) {
try {
this.wait ();
} catch (ie) {
if (Clazz.exceptionOf (ie, InterruptedException)) {
return null;
} else {
throw ie;
}
}
}
var work = this.tasks.firstElement ();
this.tasks.removeElementAt (0);
return work;
});
c$.$LayoutQueue$LayoutThread$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.LayoutQueue, "LayoutThread", Thread);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.LayoutQueue.LayoutThread, ["text-layout"]);
this.setPriority (1);
});
Clazz.overrideMethod (c$, "run", 
function () {
var a;
do {
a = this.b$["jsjavax.swing.text.LayoutQueue"].waitForWork ();
if (a != null) {
a.run ();
}} while (a != null);
});
c$ = Clazz.p0p ();
};
c$.DEFAULT_QUEUE = c$.prototype.DEFAULT_QUEUE =  new JavaObject ();
});
