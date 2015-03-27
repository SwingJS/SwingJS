Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.InputMap"], "jsjavax.swing.ComponentInputMap", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.component = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "ComponentInputMap", jsjavax.swing.InputMap);
Clazz.makeConstructor (c$, 
function (component) {
Clazz.superConstructor (this, jsjavax.swing.ComponentInputMap, []);
this.component = component;
if (component == null) {
throw  new IllegalArgumentException ("ComponentInputMaps must be associated with a non-null JComponent");
}}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "setParent", 
function (map) {
if (this.getParent () === map) {
return;
}if (map != null && (!(Clazz.instanceOf (map, jsjavax.swing.ComponentInputMap)) || (map).getComponent () !== this.getComponent ())) {
throw  new IllegalArgumentException ("ComponentInputMaps must have a parent ComponentInputMap associated with the same component");
}Clazz.superCall (this, jsjavax.swing.ComponentInputMap, "setParent", [map]);
this.getComponent ().componentInputMapChanged (this);
}, "jsjavax.swing.InputMap");
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.component;
});
Clazz.defineMethod (c$, "put", 
function (keyStroke, actionMapKey) {
Clazz.superCall (this, jsjavax.swing.ComponentInputMap, "put", [keyStroke, actionMapKey]);
if (this.getComponent () != null) {
this.getComponent ().componentInputMapChanged (this);
}}, "jsjavax.swing.KeyStroke,~O");
Clazz.defineMethod (c$, "remove", 
function (key) {
Clazz.superCall (this, jsjavax.swing.ComponentInputMap, "remove", [key]);
if (this.getComponent () != null) {
this.getComponent ().componentInputMapChanged (this);
}}, "jsjavax.swing.KeyStroke");
Clazz.defineMethod (c$, "clear", 
function () {
var oldSize = this.size ();
Clazz.superCall (this, jsjavax.swing.ComponentInputMap, "clear", []);
if (oldSize > 0 && this.getComponent () != null) {
this.getComponent ().componentInputMapChanged (this);
}});
});
