Clazz.declarePackage ("jsjava.beans");
Clazz.load (["jsjava.beans.PropertyChangeEvent"], "jsjava.beans.IndexedPropertyChangeEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.index = 0;
Clazz.instantialize (this, arguments);
}, jsjava.beans, "IndexedPropertyChangeEvent", jsjava.beans.PropertyChangeEvent);
Clazz.makeConstructor (c$, 
function (source, propertyName, oldValue, newValue, index) {
Clazz.superConstructor (this, jsjava.beans.IndexedPropertyChangeEvent, [source, propertyName, oldValue, newValue]);
this.index = index;
}, "~O,~S,~O,~O,~N");
Clazz.defineMethod (c$, "getIndex", 
function () {
return this.index;
});
});
