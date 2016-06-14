Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.awt.event.KeyEvent"], "javax.swing.event.MenuKeyEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.path = null;
this.manager = null;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "MenuKeyEvent", java.awt.event.KeyEvent);
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, keyCode, keyChar, p, m) {
Clazz.superConstructor (this, javax.swing.event.MenuKeyEvent, [source, id, when, modifiers, keyCode, keyChar]);
this.path = p;
this.manager = m;
}, "java.awt.Component,~N,~N,~N,~N,~S,~A,javax.swing.MenuSelectionManager");
Clazz.defineMethod (c$, "getPath", 
function () {
return this.path;
});
Clazz.defineMethod (c$, "getMenuSelectionManager", 
function () {
return this.manager;
});
});
