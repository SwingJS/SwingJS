Clazz.declarePackage ("jsjava.beans");
Clazz.load (["java.lang.Exception"], "jsjava.beans.PropertyVetoException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.evt = null;
Clazz.instantialize (this, arguments);
}, jsjava.beans, "PropertyVetoException", Exception);
Clazz.makeConstructor (c$, 
function (mess, evt) {
Clazz.superConstructor (this, jsjava.beans.PropertyVetoException, [mess]);
this.evt = evt;
}, "~S,jsjava.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "getPropertyChangeEvent", 
function () {
return this.evt;
});
});
