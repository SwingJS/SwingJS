Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["java.beans.PropertyChangeListener", "javax.swing.event.ChangeListener", "swingjs.plaf.JSLightweightUI"], "swingjs.plaf.JSScrollPaneUI", ["swingjs.JSToolkit", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.scrolledComponent = null;
this.scrollpane = null;
this.viewport = null;
this.scrolledUI = null;
this.horizBar = null;
this.vertBar = null;
this.horizNode = null;
this.vertNode = null;
this.horizIsSet = false;
this.vertIsSet = false;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSScrollPaneUI", swingjs.plaf.JSLightweightUI, [java.beans.PropertyChangeListener, javax.swing.event.ChangeListener]);
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
this.isContainer = true;
if (this.domNode == null) this.domNode = this.createDOMObject ("div", this.id, []);
return this.domNode;
});
Clazz.defineMethod (c$, "setViewPort", 
 function () {
if (this.viewport != null && this.scrolledComponent != null) return;
this.scrollpane = this.c;
this.viewport = this.scrollpane.getViewport ();
if (this.viewport == null) return;
System.out.println ("JSScrollPaneUI v=" + this.viewport);
var sc = null;
try {
sc = this.viewport.getComponent (0);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (sc != null && sc !== this.scrolledComponent) {
this.scrolledComponent = sc;
this.scrolledUI = swingjs.JSToolkit.getUI (sc, false);
this.scrollNode = this.scrolledUI.getOuterNode ();
swingjs.api.DOMNode.setSize (this.scrollNode, this.c.getWidth (), this.c.getHeight ());
this.scrolledUI.scrollerNode = this;
}});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
this.setViewPort ();
if (this.viewport != null) {
this.viewport.addChangeListener (this);
this.viewport.addPropertyChangeListener (this);
}this.scrollpane.addPropertyChangeListener (this);
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
if (this.viewport != null) {
this.viewport.removeChangeListener (this);
this.viewport.removePropertyChangeListener (this);
}this.scrollpane.removePropertyChangeListener (this);
});
Clazz.overrideMethod (c$, "propertyChange", 
function (e) {
var prop = e.getPropertyName ();
var src = e.getSource ();
System.out.println (this.id + " propertyChange " + prop + "  " + src);
}, "java.beans.PropertyChangeEvent");
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
if (!this.horizIsSet) {
this.horizIsSet = true;
this.horizBar = this.scrollpane.getHorizontalScrollBar ();
if (this.horizBar != null) {
this.horizNode = this.horizBar.getUI ();
this.horizBar.addChangeListener (this);
this.horizBar.addPropertyChangeListener (this);
}}if (!this.vertIsSet) {
this.vertIsSet = true;
this.vertBar = this.scrollpane.getVerticalScrollBar ();
if (this.vertBar != null) {
this.vertNode = this.vertBar.getUI ();
this.vertBar.addChangeListener (this);
this.vertBar.addPropertyChangeListener (this);
}}System.out.println (this.id + " stateChange ");
}, "javax.swing.event.ChangeEvent");
Clazz.overrideMethod (c$, "notifyPropertyChanged", 
function (prop) {
System.out.println (this.id + " notifyPropertyChanged " + prop);
this.notifyPropChangeCUI (prop);
}, "~S");
});
