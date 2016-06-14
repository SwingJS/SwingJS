Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.util.EventObject"], "javax.swing.event.HyperlinkEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.type = null;
this.u = null;
this.desc = null;
this.sourceElement = null;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "HyperlinkEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, type, u) {
this.construct (source, type, u, null);
}, "~O,javax.swing.event.HyperlinkEvent.EventType,java.net.URL");
Clazz.makeConstructor (c$, 
function (source, type, u, desc) {
this.construct (source, type, u, desc, null);
}, "~O,javax.swing.event.HyperlinkEvent.EventType,java.net.URL,~S");
Clazz.makeConstructor (c$, 
function (source, type, u, desc, sourceElement) {
Clazz.superConstructor (this, javax.swing.event.HyperlinkEvent, [source]);
this.type = type;
this.u = u;
this.desc = desc;
this.sourceElement = sourceElement;
}, "~O,javax.swing.event.HyperlinkEvent.EventType,java.net.URL,~S,javax.swing.text.Element");
Clazz.defineMethod (c$, "getEventType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "getDescription", 
function () {
return this.desc;
});
Clazz.defineMethod (c$, "getURL", 
function () {
return this.u;
});
Clazz.defineMethod (c$, "getSourceElement", 
function () {
return this.sourceElement;
});
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.typeString = null;
Clazz.instantialize (this, arguments);
}, javax.swing.event.HyperlinkEvent, "EventType");
Clazz.makeConstructor (c$, 
 function (a) {
this.typeString = a;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.typeString;
});
c$.ENTERED = c$.prototype.ENTERED =  new javax.swing.event.HyperlinkEvent.EventType ("ENTERED");
c$.EXITED = c$.prototype.EXITED =  new javax.swing.event.HyperlinkEvent.EventType ("EXITED");
c$.ACTIVATED = c$.prototype.ACTIVATED =  new javax.swing.event.HyperlinkEvent.EventType ("ACTIVATED");
c$ = Clazz.p0p ();
});
