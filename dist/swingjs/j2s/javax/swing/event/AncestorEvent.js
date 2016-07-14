Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.awt.AWTEvent"], "javax.swing.event.AncestorEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.ancestor = null;
this.ancestorParent = null;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "AncestorEvent", java.awt.AWTEvent);
Clazz.makeConstructor (c$, 
function (source, id, ancestor, ancestorParent) {
Clazz.superConstructor (this, javax.swing.event.AncestorEvent, [source, id]);
this.ancestor = ancestor;
this.ancestorParent = ancestorParent;
}, "javax.swing.JComponent,~N,java.awt.Container,java.awt.Container");
Clazz.defineMethod (c$, "getAncestor", 
function () {
return this.ancestor;
});
Clazz.defineMethod (c$, "getAncestorParent", 
function () {
return this.ancestorParent;
});
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.getSource ();
});
Clazz.defineStatics (c$,
"ANCESTOR_ADDED", 1,
"ANCESTOR_REMOVED", 2,
"ANCESTOR_MOVED", 3);
});
