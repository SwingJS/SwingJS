Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.event.MouseMotionListener"], "jsjava.awt.event.MouseMotionAdapter", null, function () {
c$ = Clazz.declareType (jsjava.awt.event, "MouseMotionAdapter", null, jsjava.awt.event.MouseMotionListener);
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
}, "jsjava.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
}, "jsjava.awt.event.MouseEvent");
});
