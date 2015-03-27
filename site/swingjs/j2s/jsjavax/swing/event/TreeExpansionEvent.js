Clazz.declarePackage ("jsjavax.swing.event");
Clazz.load (["java.util.EventObject"], "jsjavax.swing.event.TreeExpansionEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.path = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.event, "TreeExpansionEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, path) {
Clazz.superConstructor (this, jsjavax.swing.event.TreeExpansionEvent, [source]);
this.path = path;
}, "~O,jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "getPath", 
function () {
return this.path;
});
});
