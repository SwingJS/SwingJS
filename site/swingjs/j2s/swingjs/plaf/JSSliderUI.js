Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["java.beans.PropertyChangeListener", "javax.swing.event.ChangeListener", "swingjs.plaf.JSLightweightUI", "swingjs.jquery.JQueryUI"], "swingjs.plaf.JSSliderUI", ["java.awt.Dimension", "swingjs.JSToolkit", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.jSlider = null;
this.min = 0;
this.max = 0;
this.val = 0;
this.orientation = null;
this.jqSlider = null;
this.z0 = -2147483648;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSSliderUI", swingjs.plaf.JSLightweightUI, [java.beans.PropertyChangeListener, javax.swing.event.ChangeListener]);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSSliderUI, []);
this.needPreferred = true;
this.setDoc ();
});
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
var js = this.jSlider = this.c;
var isNew = (this.domNode == null);
if (isNew) {
this.domNode = this.wrap ("div", this.id + "_wrap", [this.jqSlider = swingjs.api.DOMNode.createElement ("div", this.id)]);
this.$ (this.domNode).addClass ("swingjs");
this.orientation = (js.getOrientation () == 1 ? "vertical" : "horizontal");
this.min = js.getMinimum ();
this.max = js.getMaximum ();
this.val = js.getValue ();
{
var me = this;
me.$(me.jqSlider).slider({
orientation: me.orientation,
range: false,
min: me.min,
max: me.max,
value: me.val,
change: function( event, handle ) {
me.jqueryCallback(event, handle);
},
slide: function( event, handle ) {
me.jqueryCallback(event, handle);
}
});
}}this.setZ (isNew);
return this.domNode;
});
Clazz.defineMethod (c$, "setZ", 
 function (isNew) {
var z = swingjs.JSToolkit.getZIndex (this, null);
if (z == this.z0) return;
this.z0 = z;
System.out.println ("JSSliderUI setting z to " + z);
var sliderTrack = null;
var sliderHandle = null;
{
sliderTrack = this.domNode.firstChild;
sliderHandle = sliderTrack.firstChild;
sliderTrack.style["z-index"] = z++;
sliderHandle.style["z-index"] = z++;
}if (isNew) {
this.$ (sliderHandle).addClass ("swingjs-ui");
this.$ (sliderTrack).addClass ("swingjs-ui");
}}, "~B");
Clazz.defineMethod (c$, "jqueryCallback", 
function (event, ui) {
var value = 0;
{
value = ui.value;
}this.jSlider.setValue (this.val = value);
}, "~O,swingjs.api.DOMNode");
Clazz.overrideMethod (c$, "setHTMLSize", 
function (obj, addCSS) {
return (this.orientation === "horizontal" ?  new java.awt.Dimension (100, 20) :  new java.awt.Dimension (20, 100));
}, "swingjs.api.DOMNode,~B");
Clazz.overrideMethod (c$, "installJSUI", 
function () {
this.jSlider.addChangeListener (this);
this.jSlider.addPropertyChangeListener (this);
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
this.jSlider.removeChangeListener (this);
this.jSlider.removePropertyChangeListener (this);
});
Clazz.overrideMethod (c$, "propertyChange", 
function (e) {
var prop = e.getPropertyName ();
System.out.println (this.id + " propertyChange " + prop);
if (prop === "ancestor") this.setZ (false);
}, "java.beans.PropertyChangeEvent");
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
var v;
if ((v = this.jSlider.getMinimum ()) != this.min) this.setSliderAttr ("min", this.min = v);
if ((v = this.jSlider.getMaximum ()) != this.max) this.setSliderAttr ("max", this.max = v);
if ((v = this.jSlider.getValue ()) != this.val) this.setSliderAttr ("value", this.val = v);
this.setZ (false);
}, "javax.swing.event.ChangeEvent");
Clazz.defineMethod (c$, "setSliderAttr", 
 function (key, val) {
System.out.println (this.id + " setting " + key + " = " + val);
{
var a = {};
a[key]= val;
this.$(this.jqSlider).slider(a);
}}, "~S,~N");
{
swingjs.JSToolkit.getJavaResource ("swingjs/jquery/jquery-ui-slider.css", true);
swingjs.JSToolkit.getJavaResource ("swingjs/jquery/jquery-ui-slider.js", true);
}});
