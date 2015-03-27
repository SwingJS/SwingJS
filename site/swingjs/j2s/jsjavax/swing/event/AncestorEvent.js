Clazz.declarePackage ("jsjavax.swing.event");
Clazz.load (["jsjava.awt.AWTEvent"], "jsjavax.swing.event.AncestorEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.ancestor = null;
this.ancestorParent = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.event, "AncestorEvent", jsjava.awt.AWTEvent);
Clazz.makeConstructor (c$, 
function (source, id, ancestor, ancestorParent) {
Clazz.superConstructor (this, jsjavax.swing.event.AncestorEvent, [source, id]);
this.ancestor = ancestor;
this.ancestorParent = ancestorParent;
}, "jsjavax.swing.JComponent,~N,jsjava.awt.Container,jsjava.awt.Container");
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
