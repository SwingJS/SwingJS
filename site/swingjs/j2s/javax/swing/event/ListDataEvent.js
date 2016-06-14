Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.util.EventObject"], "javax.swing.event.ListDataEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.type = 0;
this.index0 = 0;
this.index1 = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "ListDataEvent", java.util.EventObject);
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "getIndex0", 
function () {
return this.index0;
});
Clazz.defineMethod (c$, "getIndex1", 
function () {
return this.index1;
});
Clazz.makeConstructor (c$, 
function (source, type, index0, index1) {
Clazz.superConstructor (this, javax.swing.event.ListDataEvent, [source]);
this.type = type;
this.index0 = Math.min (index0, index1);
this.index1 = Math.max (index0, index1);
}, "~O,~N,~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[type=" + this.type + ",index0=" + this.index0 + ",index1=" + this.index1 + "]";
});
Clazz.defineStatics (c$,
"CONTENTS_CHANGED", 0,
"INTERVAL_ADDED", 1,
"INTERVAL_REMOVED", 2);
});
