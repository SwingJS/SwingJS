Clazz.declarePackage ("sun.swing");
Clazz.load (["javax.swing.Action"], "sun.swing.UIAction", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
Clazz.instantialize (this, arguments);
}, sun.swing, "UIAction", null, javax.swing.Action);
Clazz.makeConstructor (c$, 
function (name) {
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.overrideMethod (c$, "getValue", 
function (key) {
if (key === "Name") {
return this.name;
}return null;
}, "~S");
Clazz.overrideMethod (c$, "putValue", 
function (key, value) {
}, "~S,~O");
Clazz.overrideMethod (c$, "setEnabled", 
function (b) {
}, "~B");
Clazz.defineMethod (c$, "isEnabled", 
function () {
return this.isEnabled (null);
});
Clazz.defineMethod (c$, "isEnabled", 
function (sender) {
return true;
}, "~O");
Clazz.overrideMethod (c$, "addPropertyChangeListener", 
function (listener) {
}, "java.beans.PropertyChangeListener");
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (listener) {
}, "java.beans.PropertyChangeListener");
});
