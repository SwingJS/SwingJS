Clazz.declarePackage ("javax.swing");
Clazz.load (["java.util.Vector"], "javax.swing.ButtonGroup", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.buttons = null;
this.selection = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "ButtonGroup");
Clazz.prepareFields (c$, function () {
this.buttons =  new java.util.Vector ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "add", 
function (b) {
if (b == null) {
return;
}this.buttons.addElement (b);
if (b.isSelected ()) {
if (this.selection == null) {
this.selection = b.getModel ();
} else {
b.setSelected (false);
}}b.getModel ().setGroup (this);
}, "javax.swing.AbstractButton");
Clazz.defineMethod (c$, "remove", 
function (b) {
if (b == null) {
return;
}this.buttons.removeElement (b);
if (b.getModel () === this.selection) {
this.selection = null;
}b.getModel ().setGroup (null);
}, "javax.swing.AbstractButton");
Clazz.defineMethod (c$, "clearSelection", 
function () {
if (this.selection != null) {
var oldSelection = this.selection;
this.selection = null;
oldSelection.setSelected (false);
}});
Clazz.defineMethod (c$, "getElements", 
function () {
return this.buttons.elements ();
});
Clazz.defineMethod (c$, "getSelection", 
function () {
return this.selection;
});
Clazz.defineMethod (c$, "setSelected", 
function (m, b) {
if (b && m != null && m !== this.selection) {
var oldSelection = this.selection;
this.selection = m;
if (oldSelection != null) {
oldSelection.setSelected (false);
}m.setSelected (true);
}}, "javax.swing.ButtonModel,~B");
Clazz.defineMethod (c$, "isSelected", 
function (m) {
return (m === this.selection);
}, "javax.swing.ButtonModel");
Clazz.defineMethod (c$, "getButtonCount", 
function () {
if (this.buttons == null) {
return 0;
} else {
return this.buttons.size ();
}});
});
