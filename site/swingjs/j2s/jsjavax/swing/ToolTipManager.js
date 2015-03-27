Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.event.ActionListener", "$.KeyAdapter", "$.MouseAdapter", "$.MouseMotionAdapter", "$.MouseMotionListener"], "jsjavax.swing.ToolTipManager", ["jsjava.awt.Frame", "$.Point", "$.Rectangle", "$.Toolkit", "jsjava.awt.event.FocusAdapter", "jsjavax.swing.JApplet", "$.JDialog", "$.JFrame", "$.JWindow", "$.PopupFactory", "$.SwingUtilities", "$.Timer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.enterTimer = null;
this.exitTimer = null;
this.insideTimer = null;
this.toolTipText = null;
this.preferredLocation = null;
this.insideComponent = null;
this.mouseEvent = null;
this.showImmediately = false;
this.tipWindow = null;
this.window = null;
this.tip = null;
this.popupRect = null;
this.popupFrameRect = null;
this.enabled = true;
this.tipShowing = false;
this.focusChangeListener = null;
this.moveBeforeEnterListener = null;
this.accessibilityKeyListener = null;
this.lightWeightPopupEnabled = true;
this.heavyWeightPopupEnabled = false;
if (!Clazz.isClassDefined ("jsjavax.swing.ToolTipManager.insideTimerAction")) {
jsjavax.swing.ToolTipManager.$ToolTipManager$insideTimerAction$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.ToolTipManager.outsideTimerAction")) {
jsjavax.swing.ToolTipManager.$ToolTipManager$outsideTimerAction$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.ToolTipManager.stillInsideTimerAction")) {
jsjavax.swing.ToolTipManager.$ToolTipManager$stillInsideTimerAction$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.ToolTipManager.MoveBeforeEnterListener")) {
jsjavax.swing.ToolTipManager.$ToolTipManager$MoveBeforeEnterListener$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.ToolTipManager.AccessibilityKeyListener")) {
jsjavax.swing.ToolTipManager.$ToolTipManager$AccessibilityKeyListener$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "ToolTipManager", jsjava.awt.event.MouseAdapter, jsjava.awt.event.MouseMotionListener);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.ToolTipManager, []);
this.enterTimer =  new jsjavax.swing.Timer (750, Clazz.innerTypeInstance (jsjavax.swing.ToolTipManager.insideTimerAction, this, null));
this.enterTimer.setRepeats (false);
this.exitTimer =  new jsjavax.swing.Timer (500, Clazz.innerTypeInstance (jsjavax.swing.ToolTipManager.outsideTimerAction, this, null));
this.exitTimer.setRepeats (false);
this.insideTimer =  new jsjavax.swing.Timer (4000, Clazz.innerTypeInstance (jsjavax.swing.ToolTipManager.stillInsideTimerAction, this, null));
this.insideTimer.setRepeats (false);
this.moveBeforeEnterListener = Clazz.innerTypeInstance (jsjavax.swing.ToolTipManager.MoveBeforeEnterListener, this, null);
this.accessibilityKeyListener = Clazz.innerTypeInstance (jsjavax.swing.ToolTipManager.AccessibilityKeyListener, this, null);
});
Clazz.defineMethod (c$, "setEnabled", 
function (flag) {
this.enabled = flag;
if (!flag) {
this.hideTipWindow ();
}}, "~B");
Clazz.defineMethod (c$, "isEnabled", 
function () {
return this.enabled;
});
Clazz.defineMethod (c$, "setLightWeightPopupEnabled", 
function (aFlag) {
this.lightWeightPopupEnabled = aFlag;
}, "~B");
Clazz.defineMethod (c$, "isLightWeightPopupEnabled", 
function () {
return this.lightWeightPopupEnabled;
});
Clazz.defineMethod (c$, "setInitialDelay", 
function (milliseconds) {
this.enterTimer.setInitialDelay (milliseconds);
}, "~N");
Clazz.defineMethod (c$, "getInitialDelay", 
function () {
return this.enterTimer.getInitialDelay ();
});
Clazz.defineMethod (c$, "setDismissDelay", 
function (milliseconds) {
this.insideTimer.setInitialDelay (milliseconds);
}, "~N");
Clazz.defineMethod (c$, "getDismissDelay", 
function () {
return this.insideTimer.getInitialDelay ();
});
Clazz.defineMethod (c$, "setReshowDelay", 
function (milliseconds) {
this.exitTimer.setInitialDelay (milliseconds);
}, "~N");
Clazz.defineMethod (c$, "getReshowDelay", 
function () {
return this.exitTimer.getInitialDelay ();
});
Clazz.defineMethod (c$, "showTipWindow", 
function () {
if (this.insideComponent == null || !this.insideComponent.isShowing ()) return;
if (this.enabled) {
var size;
var screenLocation = this.insideComponent.getLocationOnScreen ();
var location =  new jsjava.awt.Point ();
var gc;
gc = this.insideComponent.getGraphicsConfiguration ();
var sBounds = gc.getBounds ();
var screenInsets = jsjava.awt.Toolkit.getDefaultToolkit ().getScreenInsets (gc);
sBounds.x += screenInsets.left;
sBounds.y += screenInsets.top;
sBounds.width -= (screenInsets.left + screenInsets.right);
sBounds.height -= (screenInsets.top + screenInsets.bottom);
var leftToRight = jsjavax.swing.SwingUtilities.isLeftToRight (this.insideComponent);
this.hideTipWindow ();
this.tip = this.insideComponent.createToolTip ();
this.tip.setTipText (this.toolTipText);
size = this.tip.getPreferredSize ();
if (this.preferredLocation != null) {
location.x = screenLocation.x + this.preferredLocation.x;
location.y = screenLocation.y + this.preferredLocation.y;
if (!leftToRight) {
location.x -= size.width;
}} else {
location.x = screenLocation.x + this.mouseEvent.getX ();
location.y = screenLocation.y + this.mouseEvent.getY () + 20;
if (!leftToRight) {
if (location.x - size.width >= 0) {
location.x -= size.width;
}}}if (this.popupRect == null) {
this.popupRect =  new jsjava.awt.Rectangle ();
}this.popupRect.setBounds (location.x, location.y, size.width, size.height);
if (location.x < sBounds.x) {
location.x = sBounds.x;
} else if (location.x - sBounds.x + size.width > sBounds.width) {
location.x = sBounds.x + Math.max (0, sBounds.width - size.width);
}if (location.y < sBounds.y) {
location.y = sBounds.y;
} else if (location.y - sBounds.y + size.height > sBounds.height) {
location.y = sBounds.y + Math.max (0, sBounds.height - size.height);
}var popupFactory = jsjavax.swing.PopupFactory.getSharedInstance ();
if (this.lightWeightPopupEnabled) {
var y = this.getPopupFitHeight (this.popupRect, this.insideComponent);
var x = this.getPopupFitWidth (this.popupRect, this.insideComponent);
if (x > 0 || y > 0) {
popupFactory.setPopupType (1);
} else {
popupFactory.setPopupType (0);
}} else {
popupFactory.setPopupType (1);
}this.tipWindow = popupFactory.getPopup (this.insideComponent, this.tip, location.x, location.y);
popupFactory.setPopupType (0);
this.tipWindow.show ();
var componentWindow = jsjavax.swing.SwingUtilities.windowForComponent (this.insideComponent);
this.window = jsjavax.swing.SwingUtilities.windowForComponent (this.tip);
if (this.window != null && this.window !== componentWindow) {
this.window.addMouseListener (this);
} else {
this.window = null;
}this.insideTimer.start ();
this.tipShowing = true;
}});
Clazz.defineMethod (c$, "hideTipWindow", 
function () {
if (this.tipWindow != null) {
if (this.window != null) {
this.window.removeMouseListener (this);
this.window = null;
}this.tipWindow.hide ();
this.tipWindow = null;
this.tipShowing = false;
this.tip = null;
this.insideTimer.stop ();
}});
c$.sharedInstance = Clazz.defineMethod (c$, "sharedInstance", 
function () {
var value = jsjavax.swing.SwingUtilities.appContextGet (jsjavax.swing.ToolTipManager.TOOL_TIP_MANAGER_KEY);
if (Clazz.instanceOf (value, jsjavax.swing.ToolTipManager)) {
return value;
}var manager =  new jsjavax.swing.ToolTipManager ();
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.ToolTipManager.TOOL_TIP_MANAGER_KEY, manager);
return manager;
});
Clazz.defineMethod (c$, "registerComponent", 
function (component) {
component.removeMouseListener (this);
component.addMouseListener (this);
component.removeMouseMotionListener (this.moveBeforeEnterListener);
component.addMouseMotionListener (this.moveBeforeEnterListener);
component.removeKeyListener (this.accessibilityKeyListener);
component.addKeyListener (this.accessibilityKeyListener);
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "unregisterComponent", 
function (component) {
component.removeMouseListener (this);
component.removeMouseMotionListener (this.moveBeforeEnterListener);
component.removeKeyListener (this.accessibilityKeyListener);
}, "jsjavax.swing.JComponent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (event) {
this.initiateToolTip (event);
}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "initiateToolTip", 
($fz = function (event) {
if (event.getSource () === this.window) {
return;
}var component = event.getSource ();
component.removeMouseMotionListener (this.moveBeforeEnterListener);
this.exitTimer.stop ();
var location = event.getPoint ();
if (location.x < 0 || location.x >= component.getWidth () || location.y < 0 || location.y >= component.getHeight ()) {
return;
}if (this.insideComponent != null) {
this.enterTimer.stop ();
}component.removeMouseMotionListener (this);
component.addMouseMotionListener (this);
var sameComponent = (this.insideComponent === component);
this.insideComponent = component;
if (this.tipWindow != null) {
this.mouseEvent = event;
if (this.showImmediately) {
var newToolTipText = component.getToolTipText (event);
var newPreferredLocation = component.getToolTipLocation (event);
var sameLoc = (this.preferredLocation != null) ? this.preferredLocation.equals (newPreferredLocation) : (newPreferredLocation == null);
if (!sameComponent || !this.toolTipText.equals (newToolTipText) || !sameLoc) {
this.toolTipText = newToolTipText;
this.preferredLocation = newPreferredLocation;
this.showTipWindow ();
}} else {
this.enterTimer.start ();
}}}, $fz.isPrivate = true, $fz), "jsjava.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (event) {
var shouldHide = true;
if (this.insideComponent == null) {
}if (this.window != null && event.getSource () === this.window) {
var insideComponentWindow = this.insideComponent.getTopLevelAncestor ();
if (insideComponentWindow != null) {
var location = event.getPoint ();
jsjavax.swing.SwingUtilities.convertPointToScreen (location, this.window);
location.x -= insideComponentWindow.getX ();
location.y -= insideComponentWindow.getY ();
location = jsjavax.swing.SwingUtilities.convertPoint (null, location, this.insideComponent);
if (location.x >= 0 && location.x < this.insideComponent.getWidth () && location.y >= 0 && location.y < this.insideComponent.getHeight ()) {
shouldHide = false;
} else {
shouldHide = true;
}}} else if (event.getSource () === this.insideComponent && this.tipWindow != null) {
var win = jsjavax.swing.SwingUtilities.getWindowAncestor (this.insideComponent);
if (win != null) {
var location = jsjavax.swing.SwingUtilities.convertPoint (this.insideComponent, event.getPoint (), win);
var bounds = this.insideComponent.getTopLevelAncestor ().getBounds ();
location.x += bounds.x;
location.y += bounds.y;
var loc =  new jsjava.awt.Point (0, 0);
jsjavax.swing.SwingUtilities.convertPointToScreen (loc, this.tip);
bounds.x = loc.x;
bounds.y = loc.y;
bounds.width = this.tip.getWidth ();
bounds.height = this.tip.getHeight ();
if (location.x >= bounds.x && location.x < (bounds.x + bounds.width) && location.y >= bounds.y && location.y < (bounds.y + bounds.height)) {
shouldHide = false;
} else {
shouldHide = true;
}}}if (shouldHide) {
this.enterTimer.stop ();
if (this.insideComponent != null) {
this.insideComponent.removeMouseMotionListener (this);
}this.insideComponent = null;
this.toolTipText = null;
this.mouseEvent = null;
this.hideTipWindow ();
this.exitTimer.restart ();
}}, "jsjava.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (event) {
this.hideTipWindow ();
this.enterTimer.stop ();
this.showImmediately = false;
this.insideComponent = null;
this.mouseEvent = null;
}, "jsjava.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (event) {
}, "jsjava.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (event) {
if (this.tipShowing) {
this.checkForTipChange (event);
} else if (this.showImmediately) {
var component = event.getSource ();
this.toolTipText = component.getToolTipText (event);
if (this.toolTipText != null) {
this.preferredLocation = component.getToolTipLocation (event);
this.mouseEvent = event;
this.insideComponent = component;
this.exitTimer.stop ();
this.showTipWindow ();
}} else {
this.insideComponent = event.getSource ();
this.mouseEvent = event;
this.toolTipText = null;
this.enterTimer.restart ();
}}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "checkForTipChange", 
($fz = function (event) {
var component = event.getSource ();
var newText = component.getToolTipText (event);
var newPreferredLocation = component.getToolTipLocation (event);
if (newText != null || newPreferredLocation != null) {
this.mouseEvent = event;
if (((newText != null && newText.equals (this.toolTipText)) || newText == null) && ((newPreferredLocation != null && newPreferredLocation.equals (this.preferredLocation)) || newPreferredLocation == null)) {
if (this.tipWindow != null) {
this.insideTimer.restart ();
} else {
this.enterTimer.restart ();
}} else {
this.toolTipText = newText;
this.preferredLocation = newPreferredLocation;
if (this.showImmediately) {
this.hideTipWindow ();
this.showTipWindow ();
this.exitTimer.stop ();
} else {
this.enterTimer.restart ();
}}} else {
this.toolTipText = null;
this.preferredLocation = null;
this.mouseEvent = null;
this.insideComponent = null;
this.hideTipWindow ();
this.enterTimer.stop ();
this.exitTimer.restart ();
}}, $fz.isPrivate = true, $fz), "jsjava.awt.event.MouseEvent");
c$.frameForComponent = Clazz.defineMethod (c$, "frameForComponent", 
function (component) {
while (!(Clazz.instanceOf (component, jsjava.awt.Frame))) {
component = component.getParent ();
}
return component;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "createFocusChangeListener", 
($fz = function () {
return ((Clazz.isClassDefined ("jsjavax.swing.ToolTipManager$1") ? 0 : jsjavax.swing.ToolTipManager.$ToolTipManager$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.ToolTipManager$1, this, null));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getPopupFitWidth", 
($fz = function (popupRectInScreen, invoker) {
if (invoker != null) {
var parent;
for (parent = invoker.getParent (); parent != null; parent = parent.getParent ()) {
if (Clazz.instanceOf (parent, jsjavax.swing.JFrame) || Clazz.instanceOf (parent, jsjavax.swing.JDialog) || Clazz.instanceOf (parent, jsjavax.swing.JWindow)) {
return this.getWidthAdjust (parent.getBounds (), popupRectInScreen);
} else if (Clazz.instanceOf (parent, jsjavax.swing.JApplet)) {
if (this.popupFrameRect == null) {
this.popupFrameRect =  new jsjava.awt.Rectangle ();
}var p = parent.getLocationOnScreen ();
this.popupFrameRect.setBounds (p.x, p.y, parent.getBounds ().width, parent.getBounds ().height);
return this.getWidthAdjust (this.popupFrameRect, popupRectInScreen);
}}
}return 0;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Rectangle,jsjava.awt.Component");
Clazz.defineMethod (c$, "getPopupFitHeight", 
($fz = function (popupRectInScreen, invoker) {
if (invoker != null) {
var parent;
for (parent = invoker.getParent (); parent != null; parent = parent.getParent ()) {
if (Clazz.instanceOf (parent, jsjavax.swing.JFrame) || Clazz.instanceOf (parent, jsjavax.swing.JDialog) || Clazz.instanceOf (parent, jsjavax.swing.JWindow)) {
return this.getHeightAdjust (parent.getBounds (), popupRectInScreen);
} else if (Clazz.instanceOf (parent, jsjavax.swing.JApplet)) {
if (this.popupFrameRect == null) {
this.popupFrameRect =  new jsjava.awt.Rectangle ();
}var p = parent.getLocationOnScreen ();
this.popupFrameRect.setBounds (p.x, p.y, parent.getBounds ().width, parent.getBounds ().height);
return this.getHeightAdjust (this.popupFrameRect, popupRectInScreen);
}}
}return 0;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Rectangle,jsjava.awt.Component");
Clazz.defineMethod (c$, "getHeightAdjust", 
($fz = function (a, b) {
if (b.y >= a.y && (b.y + b.height) <= (a.y + a.height)) return 0;
 else return (((b.y + b.height) - (a.y + a.height)) + 5);
}, $fz.isPrivate = true, $fz), "jsjava.awt.Rectangle,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "getWidthAdjust", 
($fz = function (a, b) {
if (b.x >= a.x && (b.x + b.width) <= (a.x + a.width)) {
return 0;
} else {
return (((b.x + b.width) - (a.x + a.width)) + 5);
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Rectangle,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "show", 
($fz = function (source) {
if (this.tipWindow != null) {
this.hideTipWindow ();
this.insideComponent = null;
} else {
this.hideTipWindow ();
this.enterTimer.stop ();
this.exitTimer.stop ();
this.insideTimer.stop ();
this.insideComponent = source;
if (this.insideComponent != null) {
this.toolTipText = this.insideComponent.getToolTipText ();
this.preferredLocation =  new jsjava.awt.Point (10, this.insideComponent.getHeight () + 10);
this.showTipWindow ();
if (this.focusChangeListener == null) {
this.focusChangeListener = this.createFocusChangeListener ();
}this.insideComponent.addFocusListener (this.focusChangeListener);
}}}, $fz.isPrivate = true, $fz), "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "hide", 
($fz = function (source) {
this.hideTipWindow ();
source.removeFocusListener (this.focusChangeListener);
this.preferredLocation = null;
this.insideComponent = null;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.JComponent");
c$.$ToolTipManager$insideTimerAction$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.ToolTipManager, "insideTimerAction", null, jsjava.awt.event.ActionListener);
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
if (this.b$["jsjavax.swing.ToolTipManager"].insideComponent != null && this.b$["jsjavax.swing.ToolTipManager"].insideComponent.isShowing ()) {
if (this.b$["jsjavax.swing.ToolTipManager"].toolTipText == null && this.b$["jsjavax.swing.ToolTipManager"].mouseEvent != null) {
this.b$["jsjavax.swing.ToolTipManager"].toolTipText = this.b$["jsjavax.swing.ToolTipManager"].insideComponent.getToolTipText (this.b$["jsjavax.swing.ToolTipManager"].mouseEvent);
this.b$["jsjavax.swing.ToolTipManager"].preferredLocation = this.b$["jsjavax.swing.ToolTipManager"].insideComponent.getToolTipLocation (this.b$["jsjavax.swing.ToolTipManager"].mouseEvent);
}if (this.b$["jsjavax.swing.ToolTipManager"].toolTipText != null) {
this.b$["jsjavax.swing.ToolTipManager"].showImmediately = true;
this.b$["jsjavax.swing.ToolTipManager"].showTipWindow ();
} else {
this.b$["jsjavax.swing.ToolTipManager"].insideComponent = null;
this.b$["jsjavax.swing.ToolTipManager"].toolTipText = null;
this.b$["jsjavax.swing.ToolTipManager"].preferredLocation = null;
this.b$["jsjavax.swing.ToolTipManager"].mouseEvent = null;
this.b$["jsjavax.swing.ToolTipManager"].hideTipWindow ();
}}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
c$.$ToolTipManager$outsideTimerAction$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.ToolTipManager, "outsideTimerAction", null, jsjava.awt.event.ActionListener);
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
this.b$["jsjavax.swing.ToolTipManager"].showImmediately = false;
}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
c$.$ToolTipManager$stillInsideTimerAction$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.ToolTipManager, "stillInsideTimerAction", null, jsjava.awt.event.ActionListener);
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
this.b$["jsjavax.swing.ToolTipManager"].hideTipWindow ();
this.b$["jsjavax.swing.ToolTipManager"].enterTimer.stop ();
this.b$["jsjavax.swing.ToolTipManager"].showImmediately = false;
this.b$["jsjavax.swing.ToolTipManager"].insideComponent = null;
this.b$["jsjavax.swing.ToolTipManager"].mouseEvent = null;
}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
c$.$ToolTipManager$MoveBeforeEnterListener$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.ToolTipManager, "MoveBeforeEnterListener", jsjava.awt.event.MouseMotionAdapter);
Clazz.overrideMethod (c$, "mouseMoved", 
function (a) {
this.b$["jsjavax.swing.ToolTipManager"].initiateToolTip (a);
}, "jsjava.awt.event.MouseEvent");
c$ = Clazz.p0p ();
};
c$.$ToolTipManager$AccessibilityKeyListener$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.ToolTipManager, "AccessibilityKeyListener", jsjava.awt.event.KeyAdapter);
Clazz.overrideMethod (c$, "keyPressed", 
function (a) {
if (!a.isConsumed ()) {
var b = a.getComponent ();
if (a.getKeyCode () == 27) {
if (this.b$["jsjavax.swing.ToolTipManager"].tipWindow != null) {
this.b$["jsjavax.swing.ToolTipManager"].hide (b);
a.consume ();
}} else if (a.getKeyCode () == 112 && a.getModifiers () == 2) {
this.b$["jsjavax.swing.ToolTipManager"].show (b);
a.consume ();
}}}, "jsjava.awt.event.KeyEvent");
c$ = Clazz.p0p ();
};
c$.$ToolTipManager$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "ToolTipManager$1", jsjava.awt.event.FocusAdapter);
Clazz.overrideMethod (c$, "focusLost", 
function (evt) {
this.b$["jsjavax.swing.ToolTipManager"].hideTipWindow ();
this.b$["jsjavax.swing.ToolTipManager"].insideComponent = null;
var c = evt.getSource ();
c.removeFocusListener (this.b$["jsjavax.swing.ToolTipManager"].focusChangeListener);
}, "jsjava.awt.event.FocusEvent");
c$ = Clazz.p0p ();
};
c$.TOOL_TIP_MANAGER_KEY = c$.prototype.TOOL_TIP_MANAGER_KEY =  new JavaObject ();
});
