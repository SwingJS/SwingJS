Clazz.declarePackage ("jsjavax.swing.tree");
Clazz.load (["java.lang.Exception"], "jsjavax.swing.tree.ExpandVetoException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.event = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.tree, "ExpandVetoException", Exception);
Clazz.makeConstructor (c$, 
function (event) {
this.construct (event, null);
}, "jsjavax.swing.event.TreeExpansionEvent");
Clazz.makeConstructor (c$, 
function (event, message) {
Clazz.superConstructor (this, jsjavax.swing.tree.ExpandVetoException, [message]);
this.event = event;
}, "jsjavax.swing.event.TreeExpansionEvent,~S");
});
