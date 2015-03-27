Clazz.declarePackage ("jsjavax.swing.event");
Clazz.load (["java.util.EventObject"], "jsjavax.swing.event.HyperlinkEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.type = null;
this.u = null;
this.desc = null;
this.sourceElement = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.event, "HyperlinkEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, type, u) {
this.construct (source, type, u, null);
}, "~O,jsjavax.swing.event.HyperlinkEvent.EventType,java.net.URL");
Clazz.makeConstructor (c$, 
function (source, type, u, desc) {
this.construct (source, type, u, desc, null);
}, "~O,jsjavax.swing.event.HyperlinkEvent.EventType,java.net.URL,~S");
Clazz.makeConstructor (c$, 
function (source, type, u, desc, sourceElement) {
Clazz.superConstructor (this, jsjavax.swing.event.HyperlinkEvent, [source]);
this.type = type;
this.u = u;
this.desc = desc;
this.sourceElement = sourceElement;
}, "~O,jsjavax.swing.event.HyperlinkEvent.EventType,java.net.URL,~S,jsjavax.swing.text.Element");
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
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.typeString = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.event.HyperlinkEvent, "EventType");
Clazz.makeConstructor (c$, 
($fz = function (a) {
this.typeString = a;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.typeString;
});
c$.ENTERED = c$.prototype.ENTERED =  new jsjavax.swing.event.HyperlinkEvent.EventType ("ENTERED");
c$.EXITED = c$.prototype.EXITED =  new jsjavax.swing.event.HyperlinkEvent.EventType ("EXITED");
c$.ACTIVATED = c$.prototype.ACTIVATED =  new jsjavax.swing.event.HyperlinkEvent.EventType ("ACTIVATED");
c$ = Clazz.p0p ();
});
