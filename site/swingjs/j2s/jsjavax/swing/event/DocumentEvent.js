Clazz.declarePackage ("jsjavax.swing.event");
Clazz.declareInterface (jsjavax.swing.event, "DocumentEvent");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.typeString = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.event.DocumentEvent, "EventType");
Clazz.makeConstructor (c$, 
($fz = function (a) {
this.typeString = a;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.typeString;
});
c$.INSERT = c$.prototype.INSERT =  new jsjavax.swing.event.DocumentEvent.EventType ("INSERT");
c$.REMOVE = c$.prototype.REMOVE =  new jsjavax.swing.event.DocumentEvent.EventType ("REMOVE");
c$.CHANGE = c$.prototype.CHANGE =  new jsjavax.swing.event.DocumentEvent.EventType ("CHANGE");
c$ = Clazz.p0p ();
Clazz.declareInterface (jsjavax.swing.event.DocumentEvent, "ElementChange");
