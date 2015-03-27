Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.event.HierarchyBoundsListener"], "jsjava.awt.event.HierarchyBoundsAdapter", null, function () {
c$ = Clazz.declareType (jsjava.awt.event, "HierarchyBoundsAdapter", null, jsjava.awt.event.HierarchyBoundsListener);
Clazz.overrideMethod (c$, "ancestorMoved", 
function (e) {
}, "jsjava.awt.event.HierarchyEvent");
Clazz.overrideMethod (c$, "ancestorResized", 
function (e) {
}, "jsjava.awt.event.HierarchyEvent");
});
