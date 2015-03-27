Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["java.util.EventListenerProxy", "jsjava.awt.event.AWTEventListener"], "jsjava.awt.event.AWTEventListenerProxy", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.eventMask = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt.event, "AWTEventListenerProxy", java.util.EventListenerProxy, jsjava.awt.event.AWTEventListener);
Clazz.makeConstructor (c$, 
function (eventMask, listener) {
Clazz.superConstructor (this, jsjava.awt.event.AWTEventListenerProxy, [listener]);
this.eventMask = eventMask;
}, "~N,jsjava.awt.event.AWTEventListener");
Clazz.defineMethod (c$, "eventDispatched", 
function (evt) {
(this.getListener ()).eventDispatched (evt);
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "getEventMask", 
function () {
return this.eventMask;
});
});
