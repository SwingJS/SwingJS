Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.event.ComponentListener"], "jsjava.awt.event.ComponentAdapter", null, function () {
c$ = Clazz.declareType (jsjava.awt.event, "ComponentAdapter", null, jsjava.awt.event.ComponentListener);
Clazz.overrideMethod (c$, "componentResized", 
function (e) {
}, "jsjava.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentMoved", 
function (e) {
}, "jsjava.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentShown", 
function (e) {
}, "jsjava.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentHidden", 
function (e) {
}, "jsjava.awt.event.ComponentEvent");
});
