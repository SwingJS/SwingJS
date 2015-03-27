Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.event.ContainerListener"], "jsjava.awt.event.ContainerAdapter", null, function () {
c$ = Clazz.declareType (jsjava.awt.event, "ContainerAdapter", null, jsjava.awt.event.ContainerListener);
Clazz.overrideMethod (c$, "componentAdded", 
function (e) {
}, "jsjava.awt.event.ContainerEvent");
Clazz.overrideMethod (c$, "componentRemoved", 
function (e) {
}, "jsjava.awt.event.ContainerEvent");
});
