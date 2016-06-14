Clazz.declarePackage ("jssun.awt");
c$ = Clazz.decorateAsClass (function () {
this.event = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, jssun.awt, "EventQueueItem");
Clazz.makeConstructor (c$, 
function (evt) {
this.event = evt;
}, "java.awt.AWTEvent");
