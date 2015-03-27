Clazz.declarePackage ("jsjavax.swing.event");
Clazz.load (["jsjava.awt.event.MouseEvent"], "jsjavax.swing.event.MenuDragMouseEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.path = null;
this.manager = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.event, "MenuDragMouseEvent", jsjava.awt.event.MouseEvent);
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, clickCount, popupTrigger, p, m) {
Clazz.superConstructor (this, jsjavax.swing.event.MenuDragMouseEvent, [source, id, when, modifiers, x, y, clickCount, popupTrigger]);
this.path = p;
this.manager = m;
}, "jsjava.awt.Component,~N,~N,~N,~N,~N,~N,~B,~A,jsjavax.swing.MenuSelectionManager");
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, xAbs, yAbs, clickCount, popupTrigger, p, m) {
Clazz.superConstructor (this, jsjavax.swing.event.MenuDragMouseEvent, [source, id, when, modifiers, x, y, xAbs, yAbs, clickCount, popupTrigger, 0]);
this.path = p;
this.manager = m;
}, "jsjava.awt.Component,~N,~N,~N,~N,~N,~N,~N,~N,~B,~A,jsjavax.swing.MenuSelectionManager");
Clazz.defineMethod (c$, "getPath", 
function () {
return this.path;
});
Clazz.defineMethod (c$, "getMenuSelectionManager", 
function () {
return this.manager;
});
});
