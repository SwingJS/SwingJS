Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.AWTEvent"], "jsjava.awt.event.ActionEvent", ["jsjava.awt.event.KeyEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.actionCommand = null;
this.when = 0;
this.modifiers = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt.event, "ActionEvent", jsjava.awt.AWTEvent);
Clazz.makeConstructor (c$, 
function (source, id, command) {
this.construct (source, id, command, 0);
}, "~O,~N,~S");
Clazz.makeConstructor (c$, 
function (source, id, command, modifiers) {
this.construct (source, id, command, 0, modifiers);
}, "~O,~N,~S,~N");
Clazz.makeConstructor (c$, 
function (source, id, command, when, modifiers) {
Clazz.superConstructor (this, jsjava.awt.event.ActionEvent, [source, id]);
this.actionCommand = command;
this.when = when;
this.modifiers = modifiers;
}, "~O,~N,~S,~N,~N");
Clazz.defineMethod (c$, "getActionCommand", 
function () {
return this.actionCommand;
});
Clazz.defineMethod (c$, "getWhen", 
function () {
return this.when;
});
Clazz.defineMethod (c$, "getModifiers", 
function () {
return this.modifiers;
});
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 1001:
typeStr = "ACTION_PERFORMED";
break;
default:
typeStr = "unknown type";
}
return typeStr + ",cmd=" + this.actionCommand + ",when=" + this.when + ",modifiers=" + jsjava.awt.event.KeyEvent.getKeyModifiersText (this.modifiers);
});
Clazz.defineStatics (c$,
"SHIFT_MASK", 1,
"CTRL_MASK", 2,
"META_MASK", 4,
"ALT_MASK", 8,
"ACTION_FIRST", 1001,
"ACTION_LAST", 1001,
"ACTION_PERFORMED", 1001);
});
