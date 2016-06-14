Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.util.EventObject"], "javax.swing.event.TreeExpansionEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.path = null;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "TreeExpansionEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, path) {
Clazz.superConstructor (this, javax.swing.event.TreeExpansionEvent, [source]);
this.path = path;
}, "~O,javax.swing.tree.TreePath");
Clazz.defineMethod (c$, "getPath", 
function () {
return this.path;
});
});
