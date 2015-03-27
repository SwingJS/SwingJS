Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.event.MouseListener", "$.MouseMotionListener", "$.MouseWheelListener"], "jsjava.awt.event.MouseAdapter", null, function () {
c$ = Clazz.declareType (jsjava.awt.event, "MouseAdapter", null, [jsjava.awt.event.MouseListener, jsjava.awt.event.MouseWheelListener, jsjava.awt.event.MouseMotionListener]);
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
}, "jsjava.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
}, "jsjava.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
}, "jsjava.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "jsjava.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
}, "jsjava.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseWheelMoved", 
function (e) {
}, "jsjava.awt.event.MouseWheelEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
}, "jsjava.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
}, "jsjava.awt.event.MouseEvent");
});
