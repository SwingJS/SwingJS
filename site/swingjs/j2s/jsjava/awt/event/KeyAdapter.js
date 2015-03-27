Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.event.KeyListener"], "jsjava.awt.event.KeyAdapter", null, function () {
c$ = Clazz.declareType (jsjava.awt.event, "KeyAdapter", null, jsjava.awt.event.KeyListener);
Clazz.overrideMethod (c$, "keyTyped", 
function (e) {
}, "jsjava.awt.event.KeyEvent");
Clazz.overrideMethod (c$, "keyPressed", 
function (e) {
}, "jsjava.awt.event.KeyEvent");
Clazz.overrideMethod (c$, "keyReleased", 
function (e) {
}, "jsjava.awt.event.KeyEvent");
});
