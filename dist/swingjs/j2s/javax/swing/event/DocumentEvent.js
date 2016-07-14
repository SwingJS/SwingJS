Clazz.declarePackage ("javax.swing.event");
Clazz.declareInterface (javax.swing.event, "DocumentEvent");
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.typeString = null;
Clazz.instantialize (this, arguments);
}, javax.swing.event.DocumentEvent, "EventType");
Clazz.makeConstructor (c$, 
 function (a) {
this.typeString = a;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.typeString;
});
c$.INSERT = c$.prototype.INSERT =  new javax.swing.event.DocumentEvent.EventType ("INSERT");
c$.REMOVE = c$.prototype.REMOVE =  new javax.swing.event.DocumentEvent.EventType ("REMOVE");
c$.CHANGE = c$.prototype.CHANGE =  new javax.swing.event.DocumentEvent.EventType ("CHANGE");
c$ = Clazz.p0p ();
Clazz.declareInterface (javax.swing.event.DocumentEvent, "ElementChange");
