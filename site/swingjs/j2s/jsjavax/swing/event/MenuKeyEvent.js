Clazz.declarePackage ("jsjavax.swing.event");
Clazz.load (["jsjava.awt.event.KeyEvent"], "jsjavax.swing.event.MenuKeyEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.path = null;
this.manager = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.event, "MenuKeyEvent", jsjava.awt.event.KeyEvent);
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, keyCode, keyChar, p, m) {
Clazz.superConstructor (this, jsjavax.swing.event.MenuKeyEvent, [source, id, when, modifiers, keyCode, keyChar]);
this.path = p;
this.manager = m;
}, "jsjava.awt.Component,~N,~N,~N,~N,~S,~A,jsjavax.swing.MenuSelectionManager");
Clazz.defineMethod (c$, "getPath", 
function () {
return this.path;
});
Clazz.defineMethod (c$, "getMenuSelectionManager", 
function () {
return this.manager;
});
});
