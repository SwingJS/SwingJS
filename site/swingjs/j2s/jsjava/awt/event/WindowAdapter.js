Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.event.WindowFocusListener", "$.WindowListener", "$.WindowStateListener"], "jsjava.awt.event.WindowAdapter", null, function () {
c$ = Clazz.declareType (jsjava.awt.event, "WindowAdapter", null, [jsjava.awt.event.WindowListener, jsjava.awt.event.WindowStateListener, jsjava.awt.event.WindowFocusListener]);
Clazz.overrideMethod (c$, "windowOpened", 
function (e) {
}, "jsjava.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowClosing", 
function (e) {
}, "jsjava.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowClosed", 
function (e) {
}, "jsjava.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowIconified", 
function (e) {
}, "jsjava.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowDeiconified", 
function (e) {
}, "jsjava.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowActivated", 
function (e) {
}, "jsjava.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowDeactivated", 
function (e) {
}, "jsjava.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowStateChanged", 
function (e) {
}, "jsjava.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowGainedFocus", 
function (e) {
}, "jsjava.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowLostFocus", 
function (e) {
}, "jsjava.awt.event.WindowEvent");
});
