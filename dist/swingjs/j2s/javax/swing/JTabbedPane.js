Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent", "$.SwingConstants", "javax.swing.event.ChangeListener"], "javax.swing.JTabbedPane", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "JU.Lst", "java.awt.Point", "javax.swing.DefaultSingleSelectionModel", "$.Icon", "$.SwingUtilities", "$.UIManager", "javax.swing.event.ChangeEvent", "javax.swing.plaf.UIResource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tabPlacement = 1;
this.tabLayoutPolicy = 0;
this.model = null;
this.haveRegistered = false;
this.changeListener = null;
this.pages = null;
this.visComp = null;
this.changeEvent = null;
if (!Clazz.isClassDefined ("javax.swing.JTabbedPane.ModelListener")) {
javax.swing.JTabbedPane.$JTabbedPane$ModelListener$ ();
}
if (!Clazz.isClassDefined ("javax.swing.JTabbedPane.Page")) {
javax.swing.JTabbedPane.$JTabbedPane$Page$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JTabbedPane", javax.swing.JComponent, javax.swing.SwingConstants);
Clazz.makeConstructor (c$, 
function () {
this.construct (1, 0);
});
Clazz.makeConstructor (c$, 
function (tabPlacement) {
this.construct (tabPlacement, 0);
}, "~N");
Clazz.makeConstructor (c$, 
function (tabPlacement, tabLayoutPolicy) {
Clazz.superConstructor (this, javax.swing.JTabbedPane, []);
this.setTabPlacement (tabPlacement);
this.setTabLayoutPolicy (tabLayoutPolicy);
this.pages =  new JU.Lst ();
this.setModel ( new javax.swing.DefaultSingleSelectionModel ());
this.uiClassID = "TabbedPaneUI";
this.updateUI ();
}, "~N,~N");
Clazz.defineMethod (c$, "setUI", 
function (ui) {
Clazz.superCall (this, javax.swing.JTabbedPane, "setUI", [ui]);
for (var i = 0; i < this.getTabCount (); i++) {
var icon = this.pages.get (i).disabledIcon;
if (Clazz.instanceOf (icon, javax.swing.plaf.UIResource)) {
this.setDisabledIconAt (i, null);
}}
}, "javax.swing.plaf.TabbedPaneUI");
Clazz.defineMethod (c$, "createChangeListener", 
function () {
return Clazz.innerTypeInstance (javax.swing.JTabbedPane.ModelListener, this, null);
});
Clazz.defineMethod (c$, "addChangeListener", 
function (l) {
this.listenerList.add (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "removeChangeListener", 
function (l) {
this.listenerList.remove (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.ChangeListener);
});
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var selIndex = this.getSelectedIndex ();
if (selIndex < 0) {
if (this.visComp != null && this.visComp.isVisible ()) {
this.visComp.setVisible (false);
}this.visComp = null;
} else {
var newComp = this.getComponentAt (selIndex);
if (newComp != null && newComp !== this.visComp) {
if (this.visComp != null) {
if (this.visComp.isVisible ()) {
this.visComp.setVisible (false);
}}if (!newComp.isVisible ()) {
newComp.setVisible (true);
}this.visComp = newComp;
}}var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.ChangeListener) {
if (this.changeEvent == null) this.changeEvent =  new javax.swing.event.ChangeEvent (this);
(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "getModel", 
function () {
return this.model;
});
Clazz.defineMethod (c$, "setModel", 
function (model) {
var oldModel = this.getModel ();
if (oldModel != null) {
oldModel.removeChangeListener (this.changeListener);
this.changeListener = null;
}this.model = model;
if (model != null) {
this.changeListener = this.createChangeListener ();
model.addChangeListener (this.changeListener);
}this.firePropertyChangeObject ("model", oldModel, model);
this.repaint ();
}, "javax.swing.SingleSelectionModel");
Clazz.defineMethod (c$, "getTabPlacement", 
function () {
return this.tabPlacement;
});
Clazz.defineMethod (c$, "setTabPlacement", 
function (tabPlacement) {
if (tabPlacement != 1 && tabPlacement != 2 && tabPlacement != 3 && tabPlacement != 4) {
throw  new IllegalArgumentException ("illegal tab placement: must be TOP, BOTTOM, LEFT, or RIGHT");
}if (this.tabPlacement != tabPlacement) {
var oldValue = this.tabPlacement;
this.tabPlacement = tabPlacement;
this.firePropertyChangeInt ("tabPlacement", oldValue, tabPlacement);
this.revalidate ();
this.repaint ();
}}, "~N");
Clazz.defineMethod (c$, "getTabLayoutPolicy", 
function () {
return this.tabLayoutPolicy;
});
Clazz.defineMethod (c$, "setTabLayoutPolicy", 
function (tabLayoutPolicy) {
if (tabLayoutPolicy != 0 && tabLayoutPolicy != 1) {
throw  new IllegalArgumentException ("illegal tab layout policy: must be WRAP_TAB_LAYOUT or SCROLL_TAB_LAYOUT");
}if (this.tabLayoutPolicy != tabLayoutPolicy) {
var oldValue = this.tabLayoutPolicy;
this.tabLayoutPolicy = tabLayoutPolicy;
this.firePropertyChangeInt ("tabLayoutPolicy", oldValue, tabLayoutPolicy);
this.revalidate ();
this.repaint ();
}}, "~N");
Clazz.defineMethod (c$, "getSelectedIndex", 
function () {
return this.model.getSelectedIndex ();
});
Clazz.defineMethod (c$, "setSelectedIndex", 
function (index) {
if (index != -1) {
this.checkIndex (index);
}this.setSelectedIndexImpl (index, true);
}, "~N");
Clazz.defineMethod (c$, "setSelectedIndexImpl", 
 function (index, doAccessibleChanges) {
this.model.setSelectedIndex (index);
}, "~N,~B");
Clazz.defineMethod (c$, "getSelectedComponent", 
function () {
var index = this.getSelectedIndex ();
if (index == -1) {
return null;
}return this.getComponentAt (index);
});
Clazz.defineMethod (c$, "setSelectedComponent", 
function (c) {
var index = this.indexOfComponent (c);
if (index != -1) {
this.setSelectedIndex (index);
} else {
throw  new IllegalArgumentException ("component not found in tabbed pane");
}}, "java.awt.Component");
Clazz.defineMethod (c$, "insertTab", 
function (title, icon, component, tip, index) {
var newIndex = index;
var removeIndex = this.indexOfComponent (component);
if (component != null && removeIndex != -1) {
this.removeTabAt (removeIndex);
if (newIndex > removeIndex) {
newIndex--;
}}var selectedIndex = this.getSelectedIndex ();
this.pages.add (newIndex, Clazz.innerTypeInstance (javax.swing.JTabbedPane.Page, this, null, this, title != null ? title : "", icon, null, component, tip));
if (component != null) {
this.addImplSAEM (component, null, -1);
component.setVisible (false);
} else {
this.firePropertyChangeInt ("indexForNullComponent", -1, index);
}if (this.pages.size () == 1) {
this.setSelectedIndex (0);
}if (selectedIndex >= newIndex) {
this.setSelectedIndexImpl (selectedIndex + 1, false);
}this.revalidate ();
this.repaint ();
}, "~S,javax.swing.Icon,java.awt.Component,~S,~N");
Clazz.defineMethod (c$, "addTab", 
function (title, icon, component, tip) {
this.insertTab (title, icon, component, tip, this.pages.size ());
}, "~S,javax.swing.Icon,java.awt.Component,~S");
Clazz.defineMethod (c$, "addTab", 
function (title, icon, component) {
this.insertTab (title, icon, component, null, this.pages.size ());
}, "~S,javax.swing.Icon,java.awt.Component");
Clazz.defineMethod (c$, "addTab", 
function (title, component) {
this.insertTab (title, null, component, null, this.pages.size ());
}, "~S,java.awt.Component");
Clazz.defineMethod (c$, "add", 
function (component) {
if (!(Clazz.instanceOf (component, javax.swing.plaf.UIResource))) {
this.addTab (component.getName (), component);
} else {
Clazz.superCall (this, javax.swing.JTabbedPane, "add", [component]);
}return component;
}, "java.awt.Component");
Clazz.defineMethod (c$, "add", 
function (title, component) {
if (!(Clazz.instanceOf (component, javax.swing.plaf.UIResource))) {
this.addTab (title, component);
} else {
Clazz.superCall (this, javax.swing.JTabbedPane, "add", [title, component]);
}return component;
}, "~S,java.awt.Component");
Clazz.defineMethod (c$, "add", 
function (component, index) {
if (!(Clazz.instanceOf (component, javax.swing.plaf.UIResource))) {
this.insertTab (component.getName (), null, component, null, index == -1 ? this.getTabCount () : index);
} else {
Clazz.superCall (this, javax.swing.JTabbedPane, "add", [component, index]);
}return component;
}, "java.awt.Component,~N");
Clazz.defineMethod (c$, "add", 
function (component, constraints) {
if (!(Clazz.instanceOf (component, javax.swing.plaf.UIResource))) {
if (Clazz.instanceOf (constraints, String)) {
this.addTab (constraints, component);
} else if (Clazz.instanceOf (constraints, javax.swing.Icon)) {
this.addTab (null, constraints, component);
} else {
this.add (component);
}} else {
Clazz.superCall (this, javax.swing.JTabbedPane, "add", [component, constraints]);
}}, "java.awt.Component,~O");
Clazz.defineMethod (c$, "add", 
function (component, constraints, index) {
if (!(Clazz.instanceOf (component, javax.swing.plaf.UIResource))) {
var icon = Clazz.instanceOf (constraints, javax.swing.Icon) ? constraints : null;
var title = Clazz.instanceOf (constraints, String) ? constraints : null;
this.insertTab (title, icon, component, null, index == -1 ? this.getTabCount () : index);
} else {
this.addImpl (component, constraints, index);
}return component;
}, "java.awt.Component,~O,~N");
Clazz.defineMethod (c$, "removeTabAt", 
function (index) {
this.checkIndex (index);
var component = this.getComponentAt (index);
var selected = this.getSelectedIndex ();
if (component === this.visComp) {
this.visComp = null;
}this.setTabComponentAt (index, null);
this.pages.removeItemAt (index);
this.putClientProperty ("__index_to_remove__",  new Integer (index));
if (selected > index) {
this.setSelectedIndexImpl (selected - 1, false);
} else if (selected >= this.getTabCount ()) {
this.setSelectedIndexImpl (selected - 1, false);
} else if (index == selected) {
this.fireStateChanged ();
}if (component != null) {
var components = this.getComponents ();
for (var i = components.length; --i >= 0; ) {
if (components[i] === component) {
Clazz.superCall (this, javax.swing.JTabbedPane, "remove", [i]);
component.setVisible (true);
break;
}}
}this.revalidate ();
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "remove", 
function (component) {
var index = this.indexOfComponent (component);
if (index != -1) {
this.removeTabAt (index);
} else {
var children = this.getComponents ();
for (var i = 0; i < children.length; i++) {
if (component === children[i]) {
Clazz.superCall (this, javax.swing.JTabbedPane, "remove", [i]);
break;
}}
}}, "java.awt.Component");
Clazz.defineMethod (c$, "remove", 
function (index) {
this.removeTabAt (index);
}, "~N");
Clazz.overrideMethod (c$, "removeAll", 
function () {
this.setSelectedIndexImpl (-1, true);
var tabCount = this.getTabCount ();
while (tabCount-- > 0) {
this.removeTabAt (tabCount);
}
});
Clazz.defineMethod (c$, "getTabCount", 
function () {
return this.pages.size ();
});
Clazz.defineMethod (c$, "getTabRunCount", 
function () {
if (this.ui != null) {
return (this.ui).getTabRunCount (this);
}return 0;
});
Clazz.defineMethod (c$, "getTitleAt", 
function (index) {
return this.pages.get (index).title;
}, "~N");
Clazz.defineMethod (c$, "getIconAt", 
function (index) {
return this.pages.get (index).icon;
}, "~N");
Clazz.defineMethod (c$, "getDisabledIconAt", 
function (index) {
var page = this.pages.get (index);
if (page.disabledIcon == null) {
page.disabledIcon = javax.swing.UIManager.getLookAndFeel ().getDisabledIcon (this, page.icon);
}return page.disabledIcon;
}, "~N");
Clazz.defineMethod (c$, "getToolTipTextAt", 
function (index) {
return this.pages.get (index).tip;
}, "~N");
Clazz.defineMethod (c$, "getBackgroundAt", 
function (index) {
return this.pages.get (index).getBackground ();
}, "~N");
Clazz.defineMethod (c$, "getForegroundAt", 
function (index) {
return this.pages.get (index).getForeground ();
}, "~N");
Clazz.defineMethod (c$, "isEnabledAt", 
function (index) {
return this.pages.get (index).isEnabled ();
}, "~N");
Clazz.defineMethod (c$, "getComponentAt", 
function (index) {
return this.pages.get (index).component;
}, "~N");
Clazz.defineMethod (c$, "getMnemonicAt", 
function (tabIndex) {
this.checkIndex (tabIndex);
var page = this.pages.get (tabIndex);
return page.getMnemonic ();
}, "~N");
Clazz.defineMethod (c$, "getDisplayedMnemonicIndexAt", 
function (tabIndex) {
this.checkIndex (tabIndex);
var page = this.pages.get (tabIndex);
return page.getDisplayedMnemonicIndex ();
}, "~N");
Clazz.defineMethod (c$, "getBoundsAt", 
function (index) {
this.checkIndex (index);
if (this.ui != null) {
return (this.ui).getTabBounds (this, index);
}return null;
}, "~N");
Clazz.defineMethod (c$, "setTitleAt", 
function (index, title) {
var page = this.pages.get (index);
var oldTitle = page.title;
page.title = title;
if (oldTitle !== title) {
this.firePropertyChangeInt ("indexForTitle", -1, index);
}page.updateDisplayedMnemonicIndex ();
if (title == null || oldTitle == null || !title.equals (oldTitle)) {
this.revalidate ();
this.repaint ();
}}, "~N,~S");
Clazz.defineMethod (c$, "setIconAt", 
function (index, icon) {
var page = this.pages.get (index);
var oldIcon = page.icon;
if (icon !== oldIcon) {
page.icon = icon;
if (Clazz.instanceOf (page.disabledIcon, javax.swing.plaf.UIResource)) {
page.disabledIcon = null;
}this.revalidate ();
this.repaint ();
}}, "~N,javax.swing.Icon");
Clazz.defineMethod (c$, "setDisabledIconAt", 
function (index, disabledIcon) {
var oldIcon = this.pages.get (index).disabledIcon;
this.pages.get (index).disabledIcon = disabledIcon;
if (disabledIcon !== oldIcon && !this.isEnabledAt (index)) {
this.revalidate ();
this.repaint ();
}}, "~N,javax.swing.Icon");
Clazz.defineMethod (c$, "setToolTipTextAt", 
function (index, toolTipText) {
this.pages.get (index).tip = toolTipText;
}, "~N,~S");
Clazz.defineMethod (c$, "setBackgroundAt", 
function (index, background) {
var oldBg = this.pages.get (index).background;
this.pages.get (index).setBackground (background);
if (background == null || oldBg == null || !background.equals (oldBg)) {
var tabBounds = this.getBoundsAt (index);
if (tabBounds != null) {
this.repaint (tabBounds);
}}}, "~N,java.awt.Color");
Clazz.defineMethod (c$, "setForegroundAt", 
function (index, foreground) {
var oldFg = this.pages.get (index).foreground;
this.pages.get (index).setForeground (foreground);
if (foreground == null || oldFg == null || !foreground.equals (oldFg)) {
var tabBounds = this.getBoundsAt (index);
if (tabBounds != null) {
this.repaint (tabBounds);
}}}, "~N,java.awt.Color");
Clazz.defineMethod (c$, "setEnabledAt", 
function (index, enabled) {
var oldEnabled = this.pages.get (index).isEnabled ();
this.pages.get (index).setEnabled (enabled);
if (enabled != oldEnabled) {
this.revalidate ();
this.repaint ();
}}, "~N,~B");
Clazz.defineMethod (c$, "setComponentAt", 
function (index, component) {
var page = this.pages.get (index);
if (component !== page.component) {
if (page.component != null) {
{
var count = this.getComponentCount ();
var children = this.getComponents ();
for (var i = 0; i < count; i++) {
if (children[i] === page.component) {
Clazz.superCall (this, javax.swing.JTabbedPane, "remove", [i]);
}}
}}page.component = component;
var selectedPage = (this.getSelectedIndex () == index);
if (selectedPage) {
this.visComp = component;
}if (component != null) {
component.setVisible (selectedPage);
this.addImplSAEM (component, null, -1);
} else {
this.repaint ();
}this.revalidate ();
}}, "~N,java.awt.Component");
Clazz.defineMethod (c$, "setDisplayedMnemonicIndexAt", 
function (tabIndex, mnemonicIndex) {
this.checkIndex (tabIndex);
var page = this.pages.get (tabIndex);
page.setDisplayedMnemonicIndex (mnemonicIndex);
}, "~N,~N");
Clazz.defineMethod (c$, "setMnemonicAt", 
function (tabIndex, mnemonic) {
this.checkIndex (tabIndex);
var page = this.pages.get (tabIndex);
page.setMnemonic (mnemonic);
this.firePropertyChangeObject ("mnemonicAt", null, null);
}, "~N,~N");
Clazz.defineMethod (c$, "indexOfTab", 
function (title) {
for (var i = 0; i < this.getTabCount (); i++) {
if (this.getTitleAt (i).equals (title == null ? "" : title)) {
return i;
}}
return -1;
}, "~S");
Clazz.defineMethod (c$, "indexOfTab", 
function (icon) {
for (var i = 0; i < this.getTabCount (); i++) {
var tabIcon = this.getIconAt (i);
if ((tabIcon != null && tabIcon.equals (icon)) || (tabIcon == null && tabIcon === icon)) {
return i;
}}
return -1;
}, "javax.swing.Icon");
Clazz.defineMethod (c$, "indexOfComponent", 
function (component) {
for (var i = 0; i < this.getTabCount (); i++) {
var c = this.getComponentAt (i);
if ((c != null && c.equals (component)) || (c == null && c === component)) {
return i;
}}
return -1;
}, "java.awt.Component");
Clazz.defineMethod (c$, "indexAtLocation", 
function (x, y) {
if (this.ui != null) {
return (this.ui).tabForCoordinate (this, x, y);
}return -1;
}, "~N,~N");
Clazz.defineMethod (c$, "getToolTipText", 
function (event) {
if (this.ui != null) {
var index = (this.ui).tabForCoordinate (this, event.getX (), event.getY ());
if (index != -1) {
return this.pages.get (index).tip;
}}return Clazz.superCall (this, javax.swing.JTabbedPane, "getToolTipText", [event]);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "checkIndex", 
 function (index) {
if (index < 0 || index >= this.pages.size ()) {
throw  new IndexOutOfBoundsException ("Index: " + index + ", Tab count: " + this.pages.size ());
}}, "~N");
Clazz.defineMethod (c$, "paramString", 
function () {
var tabPlacementString;
if (this.tabPlacement == 1) {
tabPlacementString = "TOP";
} else if (this.tabPlacement == 3) {
tabPlacementString = "BOTTOM";
} else if (this.tabPlacement == 2) {
tabPlacementString = "LEFT";
} else if (this.tabPlacement == 4) {
tabPlacementString = "RIGHT";
} else tabPlacementString = "";
var haveRegisteredString = (this.haveRegistered ? "true" : "false");
return Clazz.superCall (this, javax.swing.JTabbedPane, "paramString", []) + ",haveRegistered=" + haveRegisteredString + ",tabPlacement=" + tabPlacementString;
});
Clazz.defineMethod (c$, "setTabComponentAt", 
function (index, component) {
if (component != null && this.indexOfComponent (component) != -1) {
throw  new IllegalArgumentException ("Component is already added to this JTabbedPane");
}var oldValue = this.getTabComponentAt (index);
if (component !== oldValue) {
var tabComponentIndex = this.indexOfTabComponent (component);
if (tabComponentIndex != -1) {
this.setTabComponentAt (tabComponentIndex, null);
}this.pages.get (index).tabComponent = component;
this.firePropertyChangeInt ("indexForTabComponent", -1, index);
}}, "~N,java.awt.Component");
Clazz.defineMethod (c$, "getTabComponentAt", 
function (index) {
return this.pages.get (index).tabComponent;
}, "~N");
Clazz.defineMethod (c$, "indexOfTabComponent", 
function (tabComponent) {
for (var i = 0; i < this.getTabCount (); i++) {
var c = this.getTabComponentAt (i);
if (c === tabComponent) {
return i;
}}
return -1;
}, "java.awt.Component");
c$.$JTabbedPane$ModelListener$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.JTabbedPane, "ModelListener", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
this.b$["javax.swing.JTabbedPane"].fireStateChanged ();
}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
c$.$JTabbedPane$Page$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.title = null;
this.background = null;
this.foreground = null;
this.icon = null;
this.disabledIcon = null;
this.parent = null;
this.component = null;
this.tip = null;
this.enabled = true;
this.mnemonic = -1;
this.mnemonicIndex = -1;
this.tabComponent = null;
Clazz.instantialize (this, arguments);
}, javax.swing.JTabbedPane, "Page");
Clazz.makeConstructor (c$, 
function (a, b, c, d, e, f) {
this.title = b;
this.icon = c;
this.disabledIcon = d;
this.parent = a;
this.component = e;
this.tip = f;
}, "javax.swing.JTabbedPane,~S,javax.swing.Icon,javax.swing.Icon,java.awt.Component,~S");
Clazz.defineMethod (c$, "setMnemonic", 
function (a) {
this.mnemonic = a;
this.updateDisplayedMnemonicIndex ();
}, "~N");
Clazz.defineMethod (c$, "getMnemonic", 
function () {
return this.mnemonic;
});
Clazz.defineMethod (c$, "setDisplayedMnemonicIndex", 
function (a) {
if (this.mnemonicIndex != a) {
if (a != -1 && (this.title == null || a < 0 || a >= this.title.length)) {
throw  new IllegalArgumentException ("Invalid mnemonic index: " + a);
}this.mnemonicIndex = a;
this.b$["javax.swing.JTabbedPane"].firePropertyChangeObject ("displayedMnemonicIndexAt", null, null);
}}, "~N");
Clazz.defineMethod (c$, "getDisplayedMnemonicIndex", 
function () {
return this.mnemonicIndex;
});
Clazz.defineMethod (c$, "updateDisplayedMnemonicIndex", 
function () {
this.setDisplayedMnemonicIndex (javax.swing.SwingUtilities.findDisplayedMnemonicIndex (this.title, this.mnemonic));
});
Clazz.defineMethod (c$, "getBackground", 
function () {
return this.background != null ? this.background : this.parent.getBackground ();
});
Clazz.defineMethod (c$, "setBackground", 
function (a) {
this.background = a;
}, "java.awt.Color");
Clazz.defineMethod (c$, "getForeground", 
function () {
return this.foreground != null ? this.foreground : this.parent.getForeground ();
});
Clazz.defineMethod (c$, "setForeground", 
function (a) {
this.foreground = a;
}, "java.awt.Color");
Clazz.defineMethod (c$, "isEnabled", 
function () {
return this.enabled;
});
Clazz.defineMethod (c$, "setEnabled", 
function (a) {
this.enabled = a;
}, "~B");
Clazz.defineMethod (c$, "isVisible", 
function () {
return this.parent.isVisible ();
});
Clazz.defineMethod (c$, "setVisible", 
function (a) {
this.parent.setVisible (a);
}, "~B");
Clazz.defineMethod (c$, "isShowing", 
function () {
return this.parent.isShowing ();
});
Clazz.defineMethod (c$, "contains", 
function (a) {
var b = this.getBounds ();
return b.contains (a);
}, "java.awt.Point");
Clazz.defineMethod (c$, "getLocationOnScreen", 
function () {
var a = this.parent.getLocationOnScreen ();
var b = this.getLocation ();
b.translate (a.x, a.y);
return b;
});
Clazz.defineMethod (c$, "getLocation", 
function () {
var a = this.getBounds ();
return  new java.awt.Point (a.x, a.y);
});
Clazz.defineMethod (c$, "getBounds", 
function () {
return (this.parent.getUI ()).getTabBounds (this.parent, this.parent.indexOfTab (this.title));
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"WRAP_TAB_LAYOUT", 0,
"SCROLL_TAB_LAYOUT", 1);
});
