Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.AWTKeyStroke"], "javax.swing.KeyStroke", null, function () {
c$ = Clazz.declareType (javax.swing, "KeyStroke", java.awt.AWTKeyStroke);
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (keyChar) {
{
java.awt.AWTKeyStroke.registerSubclass (javax.swing.KeyStroke);
return java.awt.AWTKeyStroke.getAWTKeyStroke (keyChar);
}}, "~S");
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (keyChar, onKeyRelease) {
return  new javax.swing.KeyStroke (keyChar, 0, 0, onKeyRelease);
}, "~S,~B");
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (keyChar, modifiers) {
{
java.awt.AWTKeyStroke.registerSubclass (javax.swing.KeyStroke);
return java.awt.AWTKeyStroke.getAWTKeyStroke (keyChar, modifiers);
}}, "Character,~N");
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (keyCode, modifiers, onKeyRelease) {
{
java.awt.AWTKeyStroke.registerSubclass (javax.swing.KeyStroke);
return java.awt.AWTKeyStroke.getAWTKeyStroke (keyCode, modifiers, onKeyRelease);
}}, "~N,~N,~B");
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (keyCode, modifiers) {
{
java.awt.AWTKeyStroke.registerSubclass (javax.swing.KeyStroke);
return java.awt.AWTKeyStroke.getAWTKeyStroke (keyCode, modifiers);
}}, "~N,~N");
c$.getKeyStrokeForEvent = Clazz.defineMethod (c$, "getKeyStrokeForEvent", 
function (anEvent) {
{
java.awt.AWTKeyStroke.registerSubclass (javax.swing.KeyStroke);
return java.awt.AWTKeyStroke.getAWTKeyStrokeForEvent (anEvent);
}}, "java.awt.event.KeyEvent");
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (s) {
if (s == null || s.length == 0) {
return null;
}{
java.awt.AWTKeyStroke.registerSubclass (javax.swing.KeyStroke);
try {
return java.awt.AWTKeyStroke.getAWTKeyStroke (s);
} catch (e) {
if (Clazz.exceptionOf (e, IllegalArgumentException)) {
return null;
} else {
throw e;
}
}
}}, "~S");
});
