Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.AWTKeyStroke"], "jsjavax.swing.KeyStroke", null, function () {
c$ = Clazz.declareType (jsjavax.swing, "KeyStroke", jsjava.awt.AWTKeyStroke);
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (keyChar) {
{
jsjava.awt.AWTKeyStroke.registerSubclass (jsjavax.swing.KeyStroke);
return jsjava.awt.AWTKeyStroke.getAWTKeyStroke (keyChar);
}}, "~S");
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (keyChar, onKeyRelease) {
return  new jsjavax.swing.KeyStroke (keyChar, 0, 0, onKeyRelease);
}, "~S,~B");
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (keyChar, modifiers) {
{
jsjava.awt.AWTKeyStroke.registerSubclass (jsjavax.swing.KeyStroke);
return jsjava.awt.AWTKeyStroke.getAWTKeyStroke (keyChar, modifiers);
}}, "Character,~N");
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (keyCode, modifiers, onKeyRelease) {
{
jsjava.awt.AWTKeyStroke.registerSubclass (jsjavax.swing.KeyStroke);
return jsjava.awt.AWTKeyStroke.getAWTKeyStroke (keyCode, modifiers, onKeyRelease);
}}, "~N,~N,~B");
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (keyCode, modifiers) {
{
jsjava.awt.AWTKeyStroke.registerSubclass (jsjavax.swing.KeyStroke);
return jsjava.awt.AWTKeyStroke.getAWTKeyStroke (keyCode, modifiers);
}}, "~N,~N");
c$.getKeyStrokeForEvent = Clazz.defineMethod (c$, "getKeyStrokeForEvent", 
function (anEvent) {
{
jsjava.awt.AWTKeyStroke.registerSubclass (jsjavax.swing.KeyStroke);
return jsjava.awt.AWTKeyStroke.getAWTKeyStrokeForEvent (anEvent);
}}, "jsjava.awt.event.KeyEvent");
c$.getKeyStroke = Clazz.defineMethod (c$, "getKeyStroke", 
function (s) {
if (s == null || s.length == 0) {
return null;
}{
jsjava.awt.AWTKeyStroke.registerSubclass (jsjavax.swing.KeyStroke);
try {
return jsjava.awt.AWTKeyStroke.getAWTKeyStroke (s);
} catch (e) {
if (Clazz.exceptionOf (e, IllegalArgumentException)) {
return null;
} else {
throw e;
}
}
}}, "~S");
});
