Clazz.declarePackage ("java.awt");
Clazz.load (["java.lang.Enum", "java.awt.Window"], "java.awt.Dialog", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "java.awt.Frame", "$.IllegalComponentStateException", "$.Toolkit", "java.awt.event.ComponentEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resizable = true;
this.undecorated = false;
this.initialized = false;
this.modal = false;
this.modalityType = null;
this.title = null;
this.isInHide = false;
this.isInDispose = false;
Clazz.instantialize (this, arguments);
}, java.awt, "Dialog", java.awt.Window);
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, "", false);
}, "java.awt.Frame");
Clazz.makeConstructor (c$, 
function (owner, modal) {
this.construct (owner, "", modal);
}, "java.awt.Frame,~B");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, false);
}, "java.awt.Frame,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modal) {
this.construct (owner, title, modal ? java.awt.Dialog.DEFAULT_MODALITY_TYPE : java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Frame,~S,~B");
Clazz.makeConstructor (c$, 
function (owner, title, modal, gc) {
this.construct (owner, title, modal ? java.awt.Dialog.DEFAULT_MODALITY_TYPE : java.awt.Dialog.ModalityType.MODELESS, gc);
}, "java.awt.Frame,~S,~B,java.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, "", false);
}, "java.awt.Dialog");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, false);
}, "java.awt.Dialog,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modal) {
this.construct (owner, title, modal ? java.awt.Dialog.DEFAULT_MODALITY_TYPE : java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Dialog,~S,~B");
Clazz.makeConstructor (c$, 
function (owner, title, modal, gc) {
this.construct (owner, title, modal ? java.awt.Dialog.DEFAULT_MODALITY_TYPE : java.awt.Dialog.ModalityType.MODELESS, gc);
}, "java.awt.Dialog,~S,~B,java.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, null, java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Window");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Window,~S");
Clazz.makeConstructor (c$, 
function (owner, modalityType) {
this.construct (owner, null, modalityType);
}, "java.awt.Window,java.awt.Dialog.ModalityType");
Clazz.makeConstructor (c$, 
function (owner, title, modalityType) {
Clazz.superConstructor (this, java.awt.Dialog, [owner]);
if ((owner != null) && !(Clazz.instanceOf (owner, java.awt.Frame)) && !(Clazz.instanceOf (owner, java.awt.Dialog))) {
throw  new IllegalArgumentException ("Wrong parent window");
}this.title = title;
this.setModalityType (modalityType);
this.initialized = true;
}, "java.awt.Window,~S,java.awt.Dialog.ModalityType");
Clazz.makeConstructor (c$, 
function (owner, title, modalityType, gc) {
Clazz.superConstructor (this, java.awt.Dialog, [owner, gc]);
if ((owner != null) && !(Clazz.instanceOf (owner, java.awt.Frame)) && !(Clazz.instanceOf (owner, java.awt.Dialog))) {
throw  new IllegalArgumentException ("wrong owner window");
}this.title = title;
this.setModalityType (modalityType);
this.initialized = true;
}, "java.awt.Window,~S,java.awt.Dialog.ModalityType,java.awt.GraphicsConfiguration");
Clazz.overrideMethod (c$, "constructComponentName", 
function () {
return "dialog" + java.awt.Dialog.$nameCounter++;
});
Clazz.defineMethod (c$, "addNotify", 
function () {
{
if (this.parent != null) {
this.parent.addNotify ();
}if (this.peer == null) {
this.peer = this.getToolkit ().createDialog (this);
}Clazz.superCall (this, java.awt.Dialog, "addNotify", []);
}});
Clazz.defineMethod (c$, "isModal", 
function () {
return this.isModal_NoClientCode ();
});
Clazz.defineMethod (c$, "isModal_NoClientCode", 
function () {
return this.modalityType !== java.awt.Dialog.ModalityType.MODELESS;
});
Clazz.defineMethod (c$, "setModal", 
function (modal) {
this.modal = modal;
this.setModalityType (modal ? java.awt.Dialog.DEFAULT_MODALITY_TYPE : java.awt.Dialog.ModalityType.MODELESS);
}, "~B");
Clazz.defineMethod (c$, "getModalityType", 
function () {
return this.modalityType;
});
Clazz.defineMethod (c$, "setModalityType", 
function (type) {
if (type == null) {
type = java.awt.Dialog.ModalityType.MODELESS;
}if (!java.awt.Toolkit.getDefaultToolkit ().isModalityTypeSupported (type)) {
type = java.awt.Dialog.ModalityType.MODELESS;
}if (this.modalityType === type) {
return;
}this.checkModalityPermission (type);
this.modalityType = type;
this.modal = (this.modalityType !== java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Dialog.ModalityType");
Clazz.defineMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz.defineMethod (c$, "setTitle", 
function (title) {
var oldTitle = this.title;
{
this.title = title;
var peer = this.peer;
if (peer != null) {
peer.setTitle (title);
}}this.firePropertyChangeObject ("title", oldTitle, title);
}, "~S");
Clazz.defineMethod (c$, "conditionalShow", 
 function (toFocus, time) {
var retval;
java.awt.Window.closeSplashScreen ();
this.validate ();
if (this.visible) {
this.toFront ();
retval = false;
} else {
retval = true;
this.showSAEM ();
for (var i = 0; i < this.ownedWindowList.size (); i++) {
var child = this.ownedWindowList.elementAt (i);
if ((child != null) && child.showWithParent) {
child.show ();
child.showWithParent = false;
}}
java.awt.Window.updateChildFocusableWindowState (this);
this.createHierarchyEvents (1400, this, this.parent, 4, java.awt.Toolkit.enabledOnToolkit (32768));
if (this.componentListener != null || (this.eventMask & 1) != 0 || java.awt.Toolkit.enabledOnToolkit (1)) {
var e =  new java.awt.event.ComponentEvent (this, 102);
java.awt.Toolkit.getEventQueue ().postEvent (e);
}}if (retval && (this.state & 1) == 0) {
this.postWindowEvent (200);
this.state |= 1;
}return retval;
}, "java.awt.Component,Long");
Clazz.defineMethod (c$, "show", 
function () {
if (!this.initialized) {
throw  new IllegalStateException ("The dialog component has not been initialized properly");
}this.beforeFirstShow = false;
this.conditionalShow (null, null);
});
Clazz.defineMethod (c$, "modalityPushed", 
function () {
});
Clazz.defineMethod (c$, "modalityPopped", 
function () {
});
Clazz.defineMethod (c$, "interruptBlocking", 
function () {
if (this.isModal ()) {
this.disposeImpl ();
} else if (this.windowClosingException != null) {
this.windowClosingException.fillInStackTrace ();
this.windowClosingException.printStackTrace ();
this.windowClosingException = null;
}});
Clazz.defineMethod (c$, "hideAndDisposePreHandler", 
 function () {
this.isInHide = true;
});
Clazz.defineMethod (c$, "hideAndDisposeHandler", 
 function () {
this.isInHide = false;
});
Clazz.defineMethod (c$, "hide", 
function () {
this.hideAndDisposePreHandler ();
Clazz.superCall (this, java.awt.Dialog, "hide", []);
if (!this.isInDispose) {
this.hideAndDisposeHandler ();
}});
Clazz.defineMethod (c$, "doDispose", 
function () {
this.isInDispose = true;
Clazz.superCall (this, java.awt.Dialog, "doDispose", []);
this.hideAndDisposeHandler ();
this.isInDispose = false;
});
Clazz.defineMethod (c$, "isResizable", 
function () {
return this.resizable;
});
Clazz.defineMethod (c$, "setResizable", 
function (resizable) {
var testvalid = false;
{
this.resizable = resizable;
var peer = this.peer;
if (peer != null) {
peer.setResizable (resizable);
testvalid = true;
}}if (testvalid) {
this.invalidateIfValid ();
}}, "~B");
Clazz.defineMethod (c$, "setUndecorated", 
function (undecorated) {
{
if (this.isDisplayable ()) {
throw  new java.awt.IllegalComponentStateException ("The dialog is displayable.");
}this.undecorated = undecorated;
}}, "~B");
Clazz.defineMethod (c$, "isUndecorated", 
function () {
return this.undecorated;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var str = Clazz.superCall (this, java.awt.Dialog, "paramString", []) + "," + this.modalityType;
if (this.title != null) {
str += ",title=" + this.title;
}return str;
});
Clazz.defineMethod (c$, "modalShow", 
function () {
});
Clazz.defineMethod (c$, "modalHide", 
function () {
});
Clazz.defineMethod (c$, "shouldBlock", 
function (w) {
if (!this.isVisible_NoClientCode () || (!w.isVisible_NoClientCode () && !w.isInShow) || this.isInHide || (w === this) || !this.isModal_NoClientCode ()) {
return false;
}if ((Clazz.instanceOf (w, java.awt.Dialog)) && (w).isInHide) {
return false;
}var blockerToCheck = this;
while (blockerToCheck != null) {
var c = w;
while ((c != null) && (c !== blockerToCheck)) {
c = c.getParent_NoClientCode ();
}
if (c === blockerToCheck) {
return false;
}blockerToCheck = blockerToCheck.getModalBlocker ();
}
switch (this.modalityType) {
case java.awt.Dialog.ModalityType.MODELESS:
return false;
case java.awt.Dialog.ModalityType.DOCUMENT_MODAL:
if (w.isModalExcluded (java.awt.Dialog.ModalExclusionType.APPLICATION_EXCLUDE)) {
var c = this;
while ((c != null) && (c !== w)) {
c = c.getParent_NoClientCode ();
}
return c === w;
} else {
return this.getDocumentRoot () === w.getDocumentRoot ();
}case java.awt.Dialog.ModalityType.APPLICATION_MODAL:
return !w.isModalExcluded (java.awt.Dialog.ModalExclusionType.APPLICATION_EXCLUDE) && (this.appContext === w.appContext);
case java.awt.Dialog.ModalityType.TOOLKIT_MODAL:
return !w.isModalExcluded (java.awt.Dialog.ModalExclusionType.TOOLKIT_EXCLUDE);
}
return false;
}, "java.awt.Window");
Clazz.defineMethod (c$, "checkModalityPermission", 
 function (mt) {
}, "java.awt.Dialog.ModalityType");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (java.awt.Dialog, "ModalityType", Enum);
Clazz.defineEnumConstant (c$, "MODELESS", 0, []);
Clazz.defineEnumConstant (c$, "DOCUMENT_MODAL", 1, []);
Clazz.defineEnumConstant (c$, "APPLICATION_MODAL", 2, []);
Clazz.defineEnumConstant (c$, "TOOLKIT_MODAL", 3, []);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (java.awt.Dialog, "ModalExclusionType", Enum);
Clazz.defineEnumConstant (c$, "NO_EXCLUDE", 0, []);
Clazz.defineEnumConstant (c$, "APPLICATION_EXCLUDE", 1, []);
Clazz.defineEnumConstant (c$, "TOOLKIT_EXCLUDE", 2, []);
c$ = Clazz.p0p ();
c$.DEFAULT_MODALITY_TYPE = c$.prototype.DEFAULT_MODALITY_TYPE = java.awt.Dialog.ModalityType.APPLICATION_MODAL;
Clazz.defineStatics (c$,
"$base", "dialog",
"$nameCounter", 0);
});
