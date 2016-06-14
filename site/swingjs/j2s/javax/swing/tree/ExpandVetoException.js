Clazz.declarePackage ("javax.swing.tree");
Clazz.load (["java.lang.Exception"], "javax.swing.tree.ExpandVetoException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.event = null;
Clazz.instantialize (this, arguments);
}, javax.swing.tree, "ExpandVetoException", Exception);
Clazz.makeConstructor (c$, 
function (event) {
this.construct (event, null);
}, "javax.swing.event.TreeExpansionEvent");
Clazz.makeConstructor (c$, 
function (event, message) {
Clazz.superConstructor (this, javax.swing.tree.ExpandVetoException, [message]);
this.event = event;
}, "javax.swing.event.TreeExpansionEvent,~S");
});
