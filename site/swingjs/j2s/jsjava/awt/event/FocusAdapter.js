Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.event.FocusListener"], "jsjava.awt.event.FocusAdapter", null, function () {
c$ = Clazz.declareType (jsjava.awt.event, "FocusAdapter", null, jsjava.awt.event.FocusListener);
Clazz.overrideMethod (c$, "focusGained", 
function (e) {
}, "jsjava.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (e) {
}, "jsjava.awt.event.FocusEvent");
});
