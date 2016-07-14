Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["java.beans.PropertyChangeListener", "swingjs.plaf.JSLightweightUI"], "swingjs.plaf.JSComboBoxUI", ["JU.PT", "javax.swing.LookAndFeel", "swingjs.api.DOMNode", "swingjs.plaf.JSComponentUI"], function () {
c$ = Clazz.declareType (swingjs.plaf, "JSComboBoxUI", swingjs.plaf.JSLightweightUI, java.beans.PropertyChangeListener);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSComboBoxUI, []);
this.isContainer = true;
this.setDoc ();
});
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
if (this.domNode == null) this.domNode = this.focusNode = this.createDOMObject ("select", this.id, []);
this.populateList ();
var b = this.c;
b.addPropertyChangeListener (this);
this.setDataUI (this.domNode);
swingjs.api.DOMNode.addJqueryHandledEvent (this, this.domNode, "change");
swingjs.api.DOMNode.setStyles (this.domNode, ["z-index", "" + (this.getZIndex (null) + 5)]);
this.setFocusable ();
return this.domNode;
});
Clazz.overrideMethod (c$, "handleJSEvent", 
function (target, eventType, jQueryEvent) {
switch (eventType) {
case -1:
var index = JU.PT.parseInt ("" + swingjs.api.DOMNode.getAttr (this.domNode, "selectedIndex"));
(this.c).setSelectedIndex (index);
break;
}
return true;
}, "~O,~N,~O");
Clazz.defineMethod (c$, "populateList", 
 function () {
this.$ (this.domNode).empty ();
var b = this.c;
var n = b.getItemCount ();
var iselect = b.getSelectedIndex ();
for (var i = 0; i < n; i++) {
var item = b.getItemAt (i).toString ();
var option = swingjs.api.DOMNode.createElement ("option", this.id + "_" + (++swingjs.plaf.JSComponentUI.incr), []);
swingjs.api.DOMNode.setAttr (option, "innerHTML", item);
if (i == iselect) swingjs.api.DOMNode.setAttr (option, "selected", "true");
this.domNode.appendChild (option);
}
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
javax.swing.LookAndFeel.installColorsAndFont (this.jc, "ComboBox.background", "ComboBox.foreground", "ComboBox.font");
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
Clazz.overrideMethod (c$, "propertyChange", 
function (evt) {
System.out.println ("JSComboBoxUI " + evt);
}, "java.beans.PropertyChangeEvent");
Clazz.overrideMethod (c$, "contains", 
function (c, x, y) {
return false;
}, "javax.swing.JComponent,~N,~N");
Clazz.defineMethod (c$, "setPopupVisible", 
function (c, v) {
}, "javax.swing.JComboBox,~B");
Clazz.defineMethod (c$, "isPopupVisible", 
function (c) {
return false;
}, "javax.swing.JComboBox");
Clazz.defineMethod (c$, "isFocusTraversable", 
function (c) {
return true;
}, "javax.swing.JComboBox");
});
