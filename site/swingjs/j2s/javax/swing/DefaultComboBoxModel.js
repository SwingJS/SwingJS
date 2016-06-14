Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.AbstractListModel", "$.MutableComboBoxModel"], "javax.swing.DefaultComboBoxModel", ["java.util.Vector"], function () {
c$ = Clazz.decorateAsClass (function () {
this.objects = null;
this.selectedObject = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "DefaultComboBoxModel", javax.swing.AbstractListModel, javax.swing.MutableComboBoxModel);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.DefaultComboBoxModel, []);
this.objects =  new java.util.Vector ();
});
Clazz.makeConstructor (c$, 
function (items) {
Clazz.superConstructor (this, javax.swing.DefaultComboBoxModel, []);
this.objects =  new java.util.Vector ();
this.objects.ensureCapacity (items.length);
var i;
var c;
for (i = 0, c = items.length; i < c; i++) this.objects.addElement (items[i]);

if (this.getSize () > 0) {
this.selectedObject = this.getElementAt (0);
}}, "~A");
Clazz.makeConstructor (c$, 
function (v) {
Clazz.superConstructor (this, javax.swing.DefaultComboBoxModel, []);
this.objects = v;
if (this.getSize () > 0) {
this.selectedObject = this.getElementAt (0);
}}, "java.util.Vector");
Clazz.overrideMethod (c$, "setSelectedItem", 
function (anObject) {
if ((this.selectedObject != null && !this.selectedObject.equals (anObject)) || this.selectedObject == null && anObject != null) {
this.selectedObject = anObject;
this.fireContentsChanged (this, -1, -1);
}}, "~O");
Clazz.overrideMethod (c$, "getSelectedItem", 
function () {
return this.selectedObject;
});
Clazz.overrideMethod (c$, "getSize", 
function () {
return this.objects.size ();
});
Clazz.overrideMethod (c$, "getElementAt", 
function (index) {
if (index >= 0 && index < this.objects.size ()) return this.objects.elementAt (index);
 else return null;
}, "~N");
Clazz.defineMethod (c$, "getIndexOf", 
function (anObject) {
return this.objects.indexOf (anObject);
}, "~O");
Clazz.overrideMethod (c$, "addElement", 
function (anObject) {
this.objects.addElement (anObject);
this.fireIntervalAdded (this, this.objects.size () - 1, this.objects.size () - 1);
if (this.objects.size () == 1 && this.selectedObject == null && anObject != null) {
this.setSelectedItem (anObject);
}}, "~O");
Clazz.overrideMethod (c$, "insertElementAt", 
function (anObject, index) {
this.objects.insertElementAt (anObject, index);
this.fireIntervalAdded (this, index, index);
}, "~O,~N");
Clazz.overrideMethod (c$, "removeElementAt", 
function (index) {
if (this.getElementAt (index) === this.selectedObject) {
if (index == 0) {
this.setSelectedItem (this.getSize () == 1 ? null : this.getElementAt (index + 1));
} else {
this.setSelectedItem (this.getElementAt (index - 1));
}}this.objects.removeElementAt (index);
this.fireIntervalRemoved (this, index, index);
}, "~N");
Clazz.overrideMethod (c$, "removeElement", 
function (anObject) {
var index = this.objects.indexOf (anObject);
if (index != -1) {
this.removeElementAt (index);
}}, "~O");
Clazz.defineMethod (c$, "removeAllElements", 
function () {
if (this.objects.size () > 0) {
var firstIndex = 0;
var lastIndex = this.objects.size () - 1;
this.objects.removeAllElements ();
this.selectedObject = null;
this.fireIntervalRemoved (this, firstIndex, lastIndex);
} else {
this.selectedObject = null;
}});
});
