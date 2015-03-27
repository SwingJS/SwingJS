Clazz.declarePackage ("jsjava.awt");
Clazz.load (["jsjava.awt.Container", "java.util.Vector", "jsjava.awt.Color"], ["jsjava.awt.Window", "$.FocusManager"], ["java.lang.IllegalArgumentException", "java.util.ArrayList", "$.Arrays", "$.Locale", "$.ResourceBundle", "jsjava.applet.Applet", "jsjava.awt.AWTEventMulticaster", "$.BorderLayout", "$.ComponentOrientation", "$.Cursor", "$.EventQueue", "$.GraphicsEnvironment", "$.Point", "$.Toolkit", "jsjava.awt.event.WindowEvent", "$.WindowFocusListener", "$.WindowListener", "$.WindowStateListener", "jsjavax.swing.JComponent", "$.RootPaneContainer", "jssun.awt.AppContext"], function () {
c$ = Clazz.decorateAsClass (function () {
this.warningString = null;
this.icons = null;
this.temporaryLostComponent = null;
this.syncLWRequests = false;
this.beforeFirstShow = true;
this.state = 0;
this.alwaysOnTop = false;
this.ownedWindowList = null;
this.showWithParent = false;
this.modalBlocker = null;
this.modalExclusionType = null;
this.windowListener = null;
this.windowStateListener = null;
this.windowFocusListener = null;
this.focusableWindowState = true;
this.isInShow = false;
this.opacity = 1.0;
this.shape = null;
this.isTrayIconWindow = false;
this.opaque = true;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "Window", jsjava.awt.Container);
Clazz.prepareFields (c$, function () {
this.ownedWindowList =  new java.util.Vector ();
});
Clazz.makeConstructor (c$, 
function (gc) {
Clazz.superConstructor (this, jsjava.awt.Window, []);
this.init (gc);
}, "jsjava.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "init", 
($fz = function (gc) {
{
gc = SwingController.graphicsConfiguration;
}this.syncLWRequests = jsjava.awt.Window.systemSyncLWRequests;
this.addToWindowList ();
this.cursor = jsjava.awt.Cursor.getPredefinedCursor (0);
this.visible = false;
this.graphicsConfig = gc;
this.setLayout ( new jsjava.awt.BorderLayout ());
var screenBounds = this.graphicsConfig.getBounds ();
var screenInsets = this.getToolkit ().getScreenInsets (this.graphicsConfig);
var x = this.getX () + screenBounds.x + screenInsets.left;
var y = this.getY () + screenBounds.y + screenInsets.top;
if (x != this.x || y != this.y) {
this.setLocation (x, y);
}this.modalExclusionType = jsjava.awt.Dialog.ModalExclusionType.NO_EXCLUDE;
}, $fz.isPrivate = true, $fz), "jsjava.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjava.awt.Window, []);
this.init (null);
});
Clazz.makeConstructor (c$, 
function (owner) {
Clazz.superConstructor (this, jsjava.awt.Window, []);
{
owner && owner.valueOf && owner.valueOf() == null && (owner =
null);
}this.init (owner == null ? null : owner.getGraphicsConfiguration ());
this.ownedInit (owner);
}, "jsjava.awt.Frame");
Clazz.makeConstructor (c$, 
function (owner) {
Clazz.superConstructor (this, jsjava.awt.Window, []);
{
owner && owner.valueOf && owner.valueOf() == null && (owner =
null);
}this.init (owner == null ? null : owner.getGraphicsConfiguration ());
this.ownedInit (owner);
}, "jsjava.awt.Window");
Clazz.makeConstructor (c$, 
function (owner, gc) {
this.construct (gc);
this.ownedInit (owner);
}, "jsjava.awt.Window,jsjava.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "ownedInit", 
($fz = function (owner) {
this.parent = owner;
if (owner != null) {
owner.addOwnedWindow (this);
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Window");
Clazz.overrideMethod (c$, "constructComponentName", 
function () {
{
return "win" + jsjava.awt.Window.nameCounter++;
}});
Clazz.defineMethod (c$, "getIconImages", 
function () {
var icons = this.icons;
if (icons == null || icons.size () == 0) {
return  new java.util.ArrayList ();
}return  new java.util.ArrayList (icons);
});
Clazz.defineMethod (c$, "setIconImages", 
function (icons) {
this.icons = (icons == null) ?  new java.util.ArrayList () :  new java.util.ArrayList (icons);
this.firePropertyChange ("iconImage", null, null);
}, "java.util.List");
Clazz.defineMethod (c$, "setIconImage", 
function (image) {
var imageList =  new java.util.ArrayList ();
if (image != null) {
imageList.add (image);
}this.setIconImages (imageList);
}, "jsjava.awt.Image");
Clazz.overrideMethod (c$, "addNotify", 
function () {
});
Clazz.defineMethod (c$, "pack", 
function () {
var parent = this.parent;
if (this.beforeFirstShow) {
this.isPacked = true;
}this.validate ();
});
Clazz.defineMethod (c$, "setMinimumSize", 
function (minimumSize) {
{
Clazz.superCall (this, jsjava.awt.Window, "setMinimumSize", [minimumSize]);
var size = this.getSize ();
if (this.isMinimumSizeSet ()) {
if (size.width < minimumSize.width || size.height < minimumSize.height) {
var nw = Math.max (this.width, minimumSize.width);
var nh = Math.max (this.height, minimumSize.height);
this.setSize (nw, nh);
}}}}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "reshape", 
function (x, y, width, height) {
if (this.isMinimumSizeSet ()) {
var minSize = this.getMinimumSize ();
if (width < minSize.width) {
width = minSize.width;
}if (height < minSize.height) {
height = minSize.height;
}}Clazz.superCall (this, jsjava.awt.Window, "reshape", [x, y, width, height]);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setClientSize", 
function (w, h) {
{
this.setBounds (this.x, this.y, w, h);
}}, "~N,~N");
c$.closeSplashScreen = Clazz.defineMethod (c$, "closeSplashScreen", 
function () {
});
Clazz.defineMethod (c$, "show", 
function () {
this.validate ();
this.isInShow = true;
if (this.visible) {
this.toFront ();
} else {
this.beforeFirstShow = false;
jsjava.awt.Window.closeSplashScreen ();
Clazz.superCall (this, jsjava.awt.Window, "show", []);
for (var i = 0; i < this.ownedWindowList.size (); i++) {
var child = this.ownedWindowList.elementAt (i);
if ((child != null) && child.showWithParent) {
child.show ();
child.showWithParent = false;
}}
if (!this.isModalBlocked ()) {
this.updateChildrenBlocking ();
} else {
this.modalBlocker.toFront_NoClientCode ();
}if (Clazz.instanceOf (this, jsjava.awt.Frame) || Clazz.instanceOf (this, jsjava.awt.Dialog)) {
jsjava.awt.Window.updateChildFocusableWindowState (this);
}}this.isInShow = false;
if ((this.state & 1) == 0) {
this.postWindowEvent (200);
this.state |= 1;
}});
c$.updateChildFocusableWindowState = Clazz.defineMethod (c$, "updateChildFocusableWindowState", 
function (w) {
for (var i = 0; i < w.ownedWindowList.size (); i++) {
var child = w.ownedWindowList.elementAt (i);
if (child != null) {
jsjava.awt.Window.updateChildFocusableWindowState (child);
}}
}, "jsjava.awt.Window");
Clazz.defineMethod (c$, "postWindowEvent", 
function (id) {
if (this.windowListener != null || (this.eventMask & 64) != 0 || jsjava.awt.Toolkit.enabledOnToolkit (64)) {
var e =  new jsjava.awt.event.WindowEvent (this, id);
jsjava.awt.Toolkit.getEventQueue ().postEvent (e);
}}, "~N");
Clazz.defineMethod (c$, "hide", 
function () {
{
for (var i = 0; i < this.ownedWindowList.size (); i++) {
var child = this.ownedWindowList.elementAt (i);
if ((child != null) && child.visible) {
child.hide ();
child.showWithParent = true;
}}
}Clazz.superCall (this, jsjava.awt.Window, "hide", []);
});
Clazz.overrideMethod (c$, "clearMostRecentFocusOwnerOnHide", 
function () {
});
Clazz.defineMethod (c$, "dispose", 
function () {
this.doDispose ();
});
Clazz.defineMethod (c$, "disposeImpl", 
function () {
this.dispose ();
});
Clazz.defineMethod (c$, "doDispose", 
function () {
if (!Clazz.isClassDefined ("jsjava.awt.Window$1DisposeAction")) {
jsjava.awt.Window.$Window$1DisposeAction$ ();
}
var action = Clazz.innerTypeInstance (jsjava.awt.Window$1DisposeAction, this, null);
if (jsjava.awt.EventQueue.isDispatchThread ()) {
action.run ();
} else {
try {
jsjava.awt.EventQueue.invokeAndWait (this, action);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, InterruptedException)) {
var e = e$$;
{
System.err.println ("Disposal was interrupted:");
e.printStackTrace ();
}
} else if (Clazz.exceptionOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
System.err.println ("Exception during disposal:");
e.printStackTrace ();
}
} else {
throw e$$;
}
}
}this.postWindowEvent (202);
});
Clazz.overrideMethod (c$, "adjustListeningChildrenOnParent", 
function (mask, num) {
}, "~N,~N");
Clazz.overrideMethod (c$, "adjustDecendantsOnParent", 
function (num) {
}, "~N");
Clazz.defineMethod (c$, "toFront", 
function () {
this.toFront_NoClientCode ();
});
Clazz.defineMethod (c$, "toFront_NoClientCode", 
function () {
if (this.visible) {
}});
Clazz.defineMethod (c$, "toBack", 
function () {
this.toBack_NoClientCode ();
});
Clazz.defineMethod (c$, "toBack_NoClientCode", 
function () {
if (this.isAlwaysOnTop ()) {
try {
this.setAlwaysOnTop (false);
} catch (e) {
if (Clazz.exceptionOf (e, SecurityException)) {
} else {
throw e;
}
}
}if (this.visible) {
}});
Clazz.overrideMethod (c$, "getToolkit", 
function () {
return jsjava.awt.Toolkit.getDefaultToolkit ();
});
Clazz.defineMethod (c$, "getWarningString", 
function () {
return this.warningString;
});
Clazz.overrideMethod (c$, "getLocale", 
function () {
if (this.locale == null) {
return java.util.Locale.getDefault ();
}return this.locale;
});
Clazz.defineMethod (c$, "setCursor", 
function (cursor) {
if (cursor == null) {
cursor = jsjava.awt.Cursor.getPredefinedCursor (0);
}Clazz.superCall (this, jsjava.awt.Window, "setCursor", [cursor]);
}, "jsjava.awt.Cursor");
Clazz.defineMethod (c$, "getOwner", 
function () {
return this.getOwner_NoClientCode ();
});
Clazz.defineMethod (c$, "getOwner_NoClientCode", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "getOwnedWindows", 
function () {
return this.getOwnedWindows_NoClientCode ();
});
Clazz.defineMethod (c$, "getOwnedWindows_NoClientCode", 
function () {
var realCopy;
{
var fullSize = this.ownedWindowList.size ();
var realSize = 0;
var fullCopy =  new Array (fullSize);
for (var i = 0; i < fullSize; i++) {
fullCopy[realSize] = this.ownedWindowList.elementAt (i);
if (fullCopy[realSize] != null) {
realSize++;
}}
if (fullSize != realSize) {
realCopy = java.util.Arrays.copyOf (fullCopy, realSize);
} else {
realCopy = fullCopy;
}}return realCopy;
});
Clazz.defineMethod (c$, "isModalBlocked", 
function () {
return this.modalBlocker != null;
});
Clazz.defineMethod (c$, "setModalBlocked", 
function (blocker, blocked, peerCall) {
}, "jsjava.awt.Dialog,~B,~B");
Clazz.defineMethod (c$, "getModalBlocker", 
function () {
return this.modalBlocker;
});
c$.getAllWindows = Clazz.defineMethod (c$, "getAllWindows", 
function () {
{
var v =  new java.util.ArrayList ();
v.addAll (jsjava.awt.Window.allWindows);
return v;
}});
c$.getAllUnblockedWindows = Clazz.defineMethod (c$, "getAllUnblockedWindows", 
function () {
{
var unblocked =  new java.util.ArrayList ();
for (var i = 0; i < jsjava.awt.Window.allWindows.size (); i++) {
var w = jsjava.awt.Window.allWindows.get (i);
if (!w.isModalBlocked ()) {
unblocked.add (w);
}}
return unblocked;
}});
c$.getWindows = Clazz.defineMethod (c$, "getWindows", 
($fz = function (appContext) {
{
var realCopy;
var windowList = appContext.get (jsjava.awt.Window);
if (windowList != null) {
var fullSize = windowList.size ();
var realSize = 0;
var fullCopy =  new Array (fullSize);
for (var i = 0; i < fullSize; i++) {
var w = windowList.get (i);
if (w != null) {
fullCopy[realSize++] = w;
}}
if (fullSize != realSize) {
realCopy = java.util.Arrays.copyOf (fullCopy, realSize);
} else {
realCopy = fullCopy;
}} else {
realCopy =  new Array (0);
}return realCopy;
}}, $fz.isPrivate = true, $fz), "jssun.awt.AppContext");
c$.getWindows = Clazz.defineMethod (c$, "getWindows", 
function () {
return jsjava.awt.Window.getWindows (jssun.awt.AppContext.getAppContext ());
});
c$.getOwnerlessWindows = Clazz.defineMethod (c$, "getOwnerlessWindows", 
function () {
var allWindows = jsjava.awt.Window.getWindows ();
var ownerlessCount = 0;
for (var w, $w = 0, $$w = allWindows; $w < $$w.length && ((w = $$w[$w]) || true); $w++) {
if (w.getOwner () == null) {
ownerlessCount++;
}}
var ownerless =  new Array (ownerlessCount);
var c = 0;
for (var w, $w = 0, $$w = allWindows; $w < $$w.length && ((w = $$w[$w]) || true); $w++) {
if (w.getOwner () == null) {
ownerless[c++] = w;
}}
return ownerless;
});
Clazz.defineMethod (c$, "getDocumentRoot", 
function () {
{
var w = this;
while (w.getOwner () != null) {
w = w.getOwner ();
}
return w;
}});
Clazz.defineMethod (c$, "setModalExclusionType", 
function (exclusionType) {
if (exclusionType == null) {
exclusionType = jsjava.awt.Dialog.ModalExclusionType.NO_EXCLUDE;
}if (!jsjava.awt.Toolkit.getDefaultToolkit ().isModalExclusionTypeSupported (exclusionType)) {
exclusionType = jsjava.awt.Dialog.ModalExclusionType.NO_EXCLUDE;
}if (this.modalExclusionType === exclusionType) {
return;
}this.modalExclusionType = exclusionType;
}, "jsjava.awt.Dialog.ModalExclusionType");
Clazz.defineMethod (c$, "getModalExclusionType", 
function () {
return this.modalExclusionType;
});
Clazz.defineMethod (c$, "isModalExcluded", 
function (exclusionType) {
if ((this.modalExclusionType != null) && this.modalExclusionType.compareTo (exclusionType) >= 0) {
return true;
}var owner = this.getOwner_NoClientCode ();
return (owner != null) && owner.isModalExcluded (exclusionType);
}, "jsjava.awt.Dialog.ModalExclusionType");
Clazz.defineMethod (c$, "updateChildrenBlocking", 
function () {
});
Clazz.defineMethod (c$, "addWindowListener", 
function (l) {
if (l == null) {
return;
}this.newEventsOnly = true;
this.windowListener = jsjava.awt.AWTEventMulticaster.add (this.windowListener, l);
}, "jsjava.awt.event.WindowListener");
Clazz.defineMethod (c$, "addWindowStateListener", 
function (l) {
if (l == null) {
return;
}this.windowStateListener = jsjava.awt.AWTEventMulticaster.add (this.windowStateListener, l);
this.newEventsOnly = true;
}, "jsjava.awt.event.WindowStateListener");
Clazz.defineMethod (c$, "addWindowFocusListener", 
function (l) {
if (l == null) {
return;
}this.windowFocusListener = jsjava.awt.AWTEventMulticaster.add (this.windowFocusListener, l);
this.newEventsOnly = true;
}, "jsjava.awt.event.WindowFocusListener");
Clazz.defineMethod (c$, "removeWindowListener", 
function (l) {
if (l == null) {
return;
}this.windowListener = jsjava.awt.AWTEventMulticaster.remove (this.windowListener, l);
}, "jsjava.awt.event.WindowListener");
Clazz.defineMethod (c$, "removeWindowStateListener", 
function (l) {
if (l == null) {
return;
}this.windowStateListener = jsjava.awt.AWTEventMulticaster.remove (this.windowStateListener, l);
}, "jsjava.awt.event.WindowStateListener");
Clazz.defineMethod (c$, "removeWindowFocusListener", 
function (l) {
if (l == null) {
return;
}this.windowFocusListener = jsjava.awt.AWTEventMulticaster.remove (this.windowFocusListener, l);
}, "jsjava.awt.event.WindowFocusListener");
Clazz.defineMethod (c$, "getWindowListeners", 
function () {
return (this.getListeners (jsjava.awt.event.WindowListener));
});
Clazz.defineMethod (c$, "getWindowFocusListeners", 
function () {
return (this.getListeners (jsjava.awt.event.WindowFocusListener));
});
Clazz.defineMethod (c$, "getWindowStateListeners", 
function () {
return (this.getListeners (jsjava.awt.event.WindowStateListener));
});
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
var l = null;
if (listenerType === jsjava.awt.event.WindowFocusListener) {
l = this.windowFocusListener;
} else if (listenerType === jsjava.awt.event.WindowStateListener) {
l = this.windowStateListener;
} else if (listenerType === jsjava.awt.event.WindowListener) {
l = this.windowListener;
} else {
return Clazz.superCall (this, jsjava.awt.Window, "getListeners", [listenerType]);
}return jsjava.awt.AWTEventMulticaster.getListeners (l, listenerType);
}, "Class");
Clazz.defineMethod (c$, "eventEnabled", 
function (e) {
switch (e.id) {
case 200:
case 201:
case 202:
case 203:
case 204:
case 205:
case 206:
if ((this.eventMask & 64) != 0 || this.windowListener != null) {
return true;
}return false;
case 207:
case 208:
if ((this.eventMask & 524288) != 0 || this.windowFocusListener != null) {
return true;
}return false;
case 209:
if ((this.eventMask & 262144) != 0 || this.windowStateListener != null) {
return true;
}return false;
default:
break;
}
return Clazz.superCall (this, jsjava.awt.Window, "eventEnabled", [e]);
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "processEvent", 
function (e) {
if (Clazz.instanceOf (e, jsjava.awt.event.WindowEvent)) {
switch (e.getID ()) {
case 200:
case 201:
case 202:
case 203:
case 204:
case 205:
case 206:
this.processWindowEvent (e);
break;
case 207:
case 208:
this.processWindowFocusEvent (e);
break;
case 209:
this.processWindowStateEvent (e);
default:
break;
}
return;
}Clazz.superCall (this, jsjava.awt.Window, "processEvent", [e]);
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "processWindowEvent", 
function (e) {
var listener = this.windowListener;
if (listener != null) {
switch (e.getID ()) {
case 200:
listener.windowOpened (e);
break;
case 201:
listener.windowClosing (e);
break;
case 202:
listener.windowClosed (e);
break;
case 203:
listener.windowIconified (e);
break;
case 204:
listener.windowDeiconified (e);
break;
case 205:
listener.windowActivated (e);
break;
case 206:
listener.windowDeactivated (e);
break;
default:
break;
}
}}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "processWindowFocusEvent", 
function (e) {
var listener = this.windowFocusListener;
if (listener != null) {
switch (e.getID ()) {
case 207:
listener.windowGainedFocus (e);
break;
case 208:
listener.windowLostFocus (e);
break;
default:
break;
}
}}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "processWindowStateEvent", 
function (e) {
var listener = this.windowStateListener;
if (listener != null) {
switch (e.getID ()) {
case 209:
listener.windowStateChanged (e);
break;
default:
break;
}
}}, "jsjava.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "preProcessKeyEvent", 
function (e) {
}, "jsjava.awt.event.KeyEvent");
Clazz.overrideMethod (c$, "postProcessKeyEvent", 
function (e) {
}, "jsjava.awt.event.KeyEvent");
Clazz.defineMethod (c$, "setAlwaysOnTop", 
function (alwaysOnTop) {
var oldAlwaysOnTop;
{
oldAlwaysOnTop = this.alwaysOnTop;
this.alwaysOnTop = alwaysOnTop;
}if (oldAlwaysOnTop != alwaysOnTop) {
if (this.isAlwaysOnTopSupported ()) {
}this.firePropertyChange ("alwaysOnTop", oldAlwaysOnTop, alwaysOnTop);
}}, "~B");
Clazz.defineMethod (c$, "isAlwaysOnTopSupported", 
function () {
return jsjava.awt.Toolkit.getDefaultToolkit ().isAlwaysOnTopSupported ();
});
Clazz.defineMethod (c$, "isAlwaysOnTop", 
function () {
return this.alwaysOnTop;
});
Clazz.defineMethod (c$, "isActive", 
function () {
return false;
});
Clazz.defineMethod (c$, "isFocused", 
function () {
{
return false;
}});
Clazz.overrideMethod (c$, "getFocusTraversalKeys", 
function (id) {
return null;
}, "~N");
Clazz.defineMethod (c$, "setFocusCycleRoot", 
function (focusCycleRoot) {
}, "~B");
Clazz.defineMethod (c$, "isFocusCycleRoot", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getFocusCycleRootAncestor", 
function () {
return null;
});
Clazz.defineMethod (c$, "isFocusableWindow", 
function () {
if (!this.getFocusableWindowState ()) {
return false;
}if (Clazz.instanceOf (this, jsjava.awt.Frame) || Clazz.instanceOf (this, jsjava.awt.Dialog)) {
return true;
}for (var owner = this.getOwner (); owner != null; owner = owner.getOwner ()) {
if (Clazz.instanceOf (owner, jsjava.awt.Frame) || Clazz.instanceOf (owner, jsjava.awt.Dialog)) {
return owner.isShowing ();
}}
return false;
});
Clazz.defineMethod (c$, "getFocusableWindowState", 
function () {
return this.focusableWindowState;
});
Clazz.defineMethod (c$, "setFocusableWindowState", 
function (focusableWindowState) {
var oldFocusableWindowState;
{
oldFocusableWindowState = this.focusableWindowState;
this.focusableWindowState = focusableWindowState;
}this.firePropertyChange ("focusableWindowState", oldFocusableWindowState, focusableWindowState);
if (oldFocusableWindowState && !focusableWindowState && this.isFocused ()) {
for (var owner = this.getOwner (); owner != null; owner = owner.getOwner ()) {
}
}}, "~B");
Clazz.defineMethod (c$, "dispatchEventImpl", 
function (e) {
if (e.getID () == 101) {
this.invalidate ();
this.validate ();
}Clazz.superCall (this, jsjava.awt.Window, "dispatchEventImpl", [e]);
}, "jsjava.awt.AWTEvent");
Clazz.overrideMethod (c$, "postEvent", 
function (e) {
if (this.handleEvent (e)) {
e.consume ();
return true;
}return false;
}, "jsjava.awt.Event");
Clazz.defineMethod (c$, "isShowing", 
function () {
return this.visible;
});
Clazz.defineMethod (c$, "applyResourceBundle", 
function (rb) {
this.applyComponentOrientation (jsjava.awt.ComponentOrientation.getOrientation (rb));
}, "java.util.ResourceBundle");
Clazz.defineMethod (c$, "applyResourceBundle", 
function (rbName) {
this.applyResourceBundle (java.util.ResourceBundle.getBundle (rbName));
}, "~S");
Clazz.defineMethod (c$, "addOwnedWindow", 
function (weakWindow) {
if (weakWindow != null) {
{
if (!this.ownedWindowList.contains (weakWindow)) {
this.ownedWindowList.addElement (weakWindow);
}}}}, "jsjava.awt.Window");
Clazz.defineMethod (c$, "removeOwnedWindow", 
function (weakWindow) {
if (weakWindow != null) {
this.ownedWindowList.removeElement (weakWindow);
}}, "java.lang.ref.WeakReference");
Clazz.defineMethod (c$, "connectOwnedWindow", 
function (child) {
child.parent = this;
this.addOwnedWindow (child);
}, "jsjava.awt.Window");
Clazz.defineMethod (c$, "addToWindowList", 
($fz = function () {
var windowList = this.appContext.get (jsjava.awt.Window);
if (windowList == null) {
windowList =  new java.util.Vector ();
this.appContext.put (jsjava.awt.Window, windowList);
}windowList.add (this);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getGraphicsConfiguration", 
function () {
{
return SwingController.graphicsConfiguration;
}});
Clazz.overrideMethod (c$, "resetGC", 
function () {
});
Clazz.defineMethod (c$, "setLocationRelativeTo", 
function (c) {
var root = null;
if (c != null) {
if (Clazz.instanceOf (c, jsjava.awt.Window) || Clazz.instanceOf (c, jsjava.applet.Applet)) {
root = c;
} else {
var parent;
for (parent = c.getParent (); parent != null; parent = parent.getParent ()) {
if (Clazz.instanceOf (parent, jsjava.awt.Window) || Clazz.instanceOf (parent, jsjava.applet.Applet)) {
root = parent;
break;
}}
}}if ((c != null && !c.isShowing ()) || root == null || !root.isShowing ()) {
var paneSize = this.getSize ();
var centerPoint = jsjava.awt.GraphicsEnvironment.getLocalGraphicsEnvironment ().getCenterPoint ();
this.setLocation (centerPoint.x - Clazz.doubleToInt (paneSize.width / 2), centerPoint.y - Clazz.doubleToInt (paneSize.height / 2));
} else {
var invokerSize = c.getSize ();
var invokerScreenLocation = c.getLocationOnScreen ();
var windowBounds = this.getBounds ();
var dx = invokerScreenLocation.x + ((invokerSize.width - windowBounds.width) >> 1);
var dy = invokerScreenLocation.y + ((invokerSize.height - windowBounds.height) >> 1);
var ss = root.getGraphicsConfiguration ().getBounds ();
if (dy + windowBounds.height > ss.y + ss.height) {
dy = ss.y + ss.height - windowBounds.height;
if (invokerScreenLocation.x - ss.x + Clazz.doubleToInt (invokerSize.width / 2) < Clazz.doubleToInt (ss.width / 2)) {
dx = invokerScreenLocation.x + invokerSize.width;
} else {
dx = invokerScreenLocation.x - windowBounds.width;
}}if (dx + windowBounds.width > ss.x + ss.width) {
dx = ss.x + ss.width - windowBounds.width;
}if (dx < ss.x) dx = ss.x;
if (dy < ss.y) dy = ss.y;
this.setLocation (dx, dy);
}}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "deliverMouseWheelToAncestor", 
function (e) {
}, "jsjava.awt.event.MouseWheelEvent");
Clazz.overrideMethod (c$, "dispatchMouseWheelToAncestor", 
function (e) {
return false;
}, "jsjava.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "getTemporaryLostComponent", 
function () {
return this.temporaryLostComponent;
});
Clazz.defineMethod (c$, "setTemporaryLostComponent", 
function (component) {
var previousComp = this.temporaryLostComponent;
if (component == null || component.canBeFocusOwner ()) {
this.temporaryLostComponent = component;
} else {
this.temporaryLostComponent = null;
}return previousComp;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "canContainFocusOwner", 
function (focusOwnerCandidate) {
return Clazz.superCall (this, jsjava.awt.Window, "canContainFocusOwner", [focusOwnerCandidate]) && this.isFocusableWindow ();
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "setBounds", 
function (r) {
this.setBounds (r.x, r.y, r.width, r.height);
}, "jsjava.awt.Rectangle");
Clazz.overrideMethod (c$, "isRecursivelyVisible", 
function () {
return this.visible;
});
Clazz.defineMethod (c$, "getOpacity", 
function () {
{
return this.opacity;
}});
Clazz.defineMethod (c$, "setOpacity", 
function (opacity) {
{
if (opacity < 0.0 || opacity > 1.0) {
throw  new IllegalArgumentException ("The value of opacity should be in the range [0.0f .. 1.0f].");
}this.opacity = opacity;
}}, "~N");
Clazz.defineMethod (c$, "getShape", 
function () {
{
return this.shape;
}});
Clazz.defineMethod (c$, "setShape", 
function (shape) {
{
this.shape = shape;
}}, "jsjava.awt.Shape");
Clazz.defineMethod (c$, "setOpaque", 
function (opaque) {
{
var gc = this.getGraphicsConfiguration ();
jsjava.awt.Window.setLayersOpaque (this, opaque);
this.opaque = opaque;
}}, "~B");
c$.setLayersOpaque = Clazz.defineMethod (c$, "setLayersOpaque", 
($fz = function (component, isOpaque) {
if (Clazz.instanceOf (component, jsjavax.swing.RootPaneContainer)) {
var rpc = component;
var root = rpc.getRootPane ();
var lp = root.getLayeredPane ();
var c = root.getContentPane ();
var content = (Clazz.instanceOf (c, jsjavax.swing.JComponent)) ? c : null;
var gp = (Clazz.instanceOf (rpc.getGlassPane (), jsjavax.swing.JComponent)) ? rpc.getGlassPane () : null;
if (gp != null) {
gp.setDoubleBuffered (isOpaque);
}lp.setOpaque (isOpaque);
root.setOpaque (isOpaque);
root.setDoubleBuffered (isOpaque);
if (content != null) {
content.setOpaque (isOpaque);
content.setDoubleBuffered (isOpaque);
var numChildren = content.getComponentCount ();
if (numChildren > 0) {
var child = content.getComponent (0);
if (Clazz.instanceOf (child, jsjavax.swing.RootPaneContainer)) {
jsjava.awt.Window.setLayersOpaque (child, isOpaque);
}}}}var bg = component.getBackground ();
var hasTransparentBg = jsjava.awt.Window.TRANSPARENT_BACKGROUND_COLOR.equals (bg);
var container = null;
if (Clazz.instanceOf (component, jsjava.awt.Container)) {
container = component;
}if (isOpaque) {
if (hasTransparentBg) {
var newColor = null;
if (container != null && container.preserveBackgroundColor != null) {
newColor = container.preserveBackgroundColor;
} else {
newColor =  new jsjava.awt.Color (255, 255, 255);
}component.setBackground (newColor);
}} else {
if (!hasTransparentBg && container != null) {
container.preserveBackgroundColor = bg;
}component.setBackground (jsjava.awt.Window.TRANSPARENT_BACKGROUND_COLOR);
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,~B");
Clazz.overrideMethod (c$, "getContainer", 
function () {
return null;
});
Clazz.overrideMethod (c$, "mixOnReshaping", 
function () {
});
Clazz.overrideMethod (c$, "getLocationOnWindow", 
function () {
return  new jsjava.awt.Point (0, 0);
});
c$.$Window$1DisposeAction$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjava.awt, "Window$1DisposeAction", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
var a;
{
a =  new Array (this.b$["jsjava.awt.Window"].ownedWindowList.size ());
this.b$["jsjava.awt.Window"].ownedWindowList.copyInto (a);
}for (var b = 0; b < a.length; b++) {
var c = (((a[b])).get ());
if (c != null) {
c.disposeImpl ();
}}
this.b$["jsjava.awt.Window"].hide ();
this.b$["jsjava.awt.Window"].beforeFirstShow = true;
this.b$["jsjava.awt.Window"].removeNotify ();
this.b$["jsjava.awt.Window"].clearCurrentFocusCycleRootOnHide ();
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"systemSyncLWRequests", false,
"OPENED", 0x01,
"base", "win",
"nameCounter", 0,
"allWindows", null);
c$.TRANSPARENT_BACKGROUND_COLOR = c$.prototype.TRANSPARENT_BACKGROUND_COLOR =  new jsjava.awt.Color (0, 0, 0, 0);
c$ = Clazz.decorateAsClass (function () {
this.focusRoot = null;
this.focusOwner = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "FocusManager");
});
