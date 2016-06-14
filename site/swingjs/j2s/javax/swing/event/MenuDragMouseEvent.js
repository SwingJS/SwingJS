Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.awt.event.MouseEvent"], "javax.swing.event.MenuDragMouseEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.path = null;
this.manager = null;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "MenuDragMouseEvent", java.awt.event.MouseEvent);
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, clickCount, popupTrigger, p, m) {
Clazz.superConstructor (this, javax.swing.event.MenuDragMouseEvent, [source, id, when, modifiers, x, y, clickCount, popupTrigger]);
this.path = p;
this.manager = m;
}, "java.awt.Component,~N,~N,~N,~N,~N,~N,~B,~A,javax.swing.MenuSelectionManager");
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, xAbs, yAbs, clickCount, popupTrigger, p, m) {
Clazz.superConstructor (this, javax.swing.event.MenuDragMouseEvent, [source, id, when, modifiers, x, y, xAbs, yAbs, clickCount, popupTrigger, 0]);
this.path = p;
this.manager = m;
}, "java.awt.Component,~N,~N,~N,~N,~N,~N,~N,~N,~B,~A,javax.swing.MenuSelectionManager");
Clazz.defineMethod (c$, "getPath", 
function () {
return this.path;
});
Clazz.defineMethod (c$, "getMenuSelectionManager", 
function () {
return this.manager;
});
});
