Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.util.EventObject"], "javax.swing.event.ListSelectionEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.firstIndex = 0;
this.lastIndex = 0;
this.isAdjusting = false;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "ListSelectionEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, firstIndex, lastIndex, isAdjusting) {
Clazz.superConstructor (this, javax.swing.event.ListSelectionEvent, [source]);
this.firstIndex = firstIndex;
this.lastIndex = lastIndex;
this.isAdjusting = isAdjusting;
}, "~O,~N,~N,~B");
Clazz.defineMethod (c$, "getFirstIndex", 
function () {
return this.firstIndex;
});
Clazz.defineMethod (c$, "getLastIndex", 
function () {
return this.lastIndex;
});
Clazz.defineMethod (c$, "getValueIsAdjusting", 
function () {
return this.isAdjusting;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var properties = " source=" + this.getSource () + " firstIndex= " + this.firstIndex + " lastIndex= " + this.lastIndex + " isAdjusting= " + this.isAdjusting + " ";
return this.getClass ().getName () + "[" + properties + "]";
});
});
