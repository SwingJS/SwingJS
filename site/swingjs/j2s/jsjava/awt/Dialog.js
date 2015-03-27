Clazz.declarePackage ("jsjava.awt");
Clazz.load (["java.lang.Enum", "jsjava.awt.Window"], "jsjava.awt.Dialog", ["java.lang.IllegalArgumentException", "jsjava.awt.Frame", "$.IllegalComponentStateException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resizable = true;
this.undecorated = false;
this.modal = false;
this.modalityType = null;
this.title = null;
this.isInHide = false;
this.isInDispose = false;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "Dialog", jsjava.awt.Window);
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, "", false);
}, "jsjava.awt.Frame");
Clazz.makeConstructor (c$, 
function (owner, modal) {
this.construct (owner, "", modal);
}, "jsjava.awt.Frame,~B");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, false);
}, "jsjava.awt.Frame,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modal) {
this.construct (owner, title, modal ? jsjava.awt.Dialog.DEFAULT_MODALITY_TYPE : jsjava.awt.Dialog.ModalityType.MODELESS);
}, "jsjava.awt.Frame,~S,~B");
Clazz.makeConstructor (c$, 
function (owner, title, modal, gc) {
this.construct (owner, title, modal ? jsjava.awt.Dialog.DEFAULT_MODALITY_TYPE : jsjava.awt.Dialog.ModalityType.MODELESS, gc);
}, "jsjava.awt.Frame,~S,~B,jsjava.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, "", false);
}, "jsjava.awt.Dialog");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, false);
}, "jsjava.awt.Dialog,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modal) {
this.construct (owner, title, modal ? jsjava.awt.Dialog.DEFAULT_MODALITY_TYPE : jsjava.awt.Dialog.ModalityType.MODELESS);
}, "jsjava.awt.Dialog,~S,~B");
Clazz.makeConstructor (c$, 
function (owner, title, modal, gc) {
this.construct (owner, title, modal ? jsjava.awt.Dialog.DEFAULT_MODALITY_TYPE : jsjava.awt.Dialog.ModalityType.MODELESS, gc);
}, "jsjava.awt.Dialog,~S,~B,jsjava.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, null, jsjava.awt.Dialog.ModalityType.MODELESS);
}, "jsjava.awt.Window");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, jsjava.awt.Dialog.ModalityType.MODELESS);
}, "jsjava.awt.Window,~S");
Clazz.makeConstructor (c$, 
function (owner, modalityType) {
this.construct (owner, null, modalityType);
}, "jsjava.awt.Window,jsjava.awt.Dialog.ModalityType");
Clazz.makeConstructor (c$, 
function (owner, title, modalityType) {
Clazz.superConstructor (this, jsjava.awt.Dialog, [owner]);
if ((owner != null) && !(Clazz.instanceOf (owner, jsjava.awt.Frame)) && !(Clazz.instanceOf (owner, jsjava.awt.Dialog))) {
throw  new IllegalArgumentException ("Wrong parent window");
}this.title = title;
this.setModalityType (modalityType);
}, "jsjava.awt.Window,~S,jsjava.awt.Dialog.ModalityType");
Clazz.makeConstructor (c$, 
function (owner, title, modalityType, gc) {
Clazz.superConstructor (this, jsjava.awt.Dialog, [owner, gc]);
if ((owner != null) && !(Clazz.instanceOf (owner, jsjava.awt.Frame)) && !(Clazz.instanceOf (owner, jsjava.awt.Dialog))) {
throw  new IllegalArgumentException ("wrong owner window");
}this.title = title;
this.setModalityType (modalityType);
}, "jsjava.awt.Window,~S,jsjava.awt.Dialog.ModalityType,jsjava.awt.GraphicsConfiguration");
Clazz.overrideMethod (c$, "constructComponentName", 
function () {
{
return "dialog" + jsjava.awt.Dialog.$nameCounter++;
}});
Clazz.defineMethod (c$, "addNotify", 
function () {
{
if (this.parent != null) {
this.parent.addNotify ();
}Clazz.superCall (this, jsjava.awt.Dialog, "addNotify", []);
}});
Clazz.defineMethod (c$, "isModal", 
function () {
return this.isModal_NoClientCode ();
});
Clazz.defineMethod (c$, "isModal_NoClientCode", 
function () {
return this.modalityType !== jsjava.awt.Dialog.ModalityType.MODELESS;
});
Clazz.defineMethod (c$, "setModal", 
function (modal) {
this.modal = modal;
this.setModalityType (modal ? jsjava.awt.Dialog.DEFAULT_MODALITY_TYPE : jsjava.awt.Dialog.ModalityType.MODELESS);
}, "~B");
Clazz.defineMethod (c$, "getModalityType", 
function () {
return this.modalityType;
});
Clazz.defineMethod (c$, "setModalityType", 
function (type) {
if (type == null) {
type = jsjava.awt.Dialog.ModalityType.MODELESS;
}if (this.modalityType === type) {
return;
}this.checkModalityPermission (type);
this.modalityType = type;
this.modal = (this.modalityType !== jsjava.awt.Dialog.ModalityType.MODELESS);
}, "jsjava.awt.Dialog.ModalityType");
Clazz.defineMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz.defineMethod (c$, "setTitle", 
function (title) {
var oldTitle = this.title;
{
this.title = title;
}this.firePropertyChange ("title", oldTitle, title);
}, "~S");
Clazz.defineMethod (c$, "show", 
function () {
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
($fz = function () {
this.isInHide = true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hideAndDisposeHandler", 
($fz = function () {
this.isInHide = false;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hide", 
function () {
this.hideAndDisposePreHandler ();
Clazz.superCall (this, jsjava.awt.Dialog, "hide", []);
if (!this.isInDispose) {
this.hideAndDisposeHandler ();
}});
Clazz.defineMethod (c$, "doDispose", 
function () {
this.isInDispose = true;
Clazz.superCall (this, jsjava.awt.Dialog, "doDispose", []);
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
}if (testvalid) {
this.invalidateIfValid ();
}}, "~B");
Clazz.defineMethod (c$, "setUndecorated", 
function (undecorated) {
{
if (this.isDisplayable ()) {
throw  new jsjava.awt.IllegalComponentStateException ("The dialog is displayable.");
}this.undecorated = undecorated;
}}, "~B");
Clazz.defineMethod (c$, "isUndecorated", 
function () {
return this.undecorated;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var str = Clazz.superCall (this, jsjava.awt.Dialog, "paramString", []) + "," + this.modalityType;
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
}if ((Clazz.instanceOf (w, jsjava.awt.Dialog)) && (w).isInHide) {
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
case jsjava.awt.Dialog.ModalityType.MODELESS:
return false;
case jsjava.awt.Dialog.ModalityType.DOCUMENT_MODAL:
if (w.isModalExcluded (jsjava.awt.Dialog.ModalExclusionType.APPLICATION_EXCLUDE)) {
var c = this;
while ((c != null) && (c !== w)) {
c = c.getParent_NoClientCode ();
}
return c === w;
} else {
return this.getDocumentRoot () === w.getDocumentRoot ();
}case jsjava.awt.Dialog.ModalityType.APPLICATION_MODAL:
return !w.isModalExcluded (jsjava.awt.Dialog.ModalExclusionType.APPLICATION_EXCLUDE) && (this.appContext === w.appContext);
case jsjava.awt.Dialog.ModalityType.TOOLKIT_MODAL:
return !w.isModalExcluded (jsjava.awt.Dialog.ModalExclusionType.TOOLKIT_EXCLUDE);
}
return false;
}, "jsjava.awt.Window");
Clazz.defineMethod (c$, "checkModalityPermission", 
($fz = function (mt) {
}, $fz.isPrivate = true, $fz), "jsjava.awt.Dialog.ModalityType");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjava.awt.Dialog, "ModalityType", Enum);
Clazz.defineEnumConstant (c$, "MODELESS", 0, []);
Clazz.defineEnumConstant (c$, "DOCUMENT_MODAL", 1, []);
Clazz.defineEnumConstant (c$, "APPLICATION_MODAL", 2, []);
Clazz.defineEnumConstant (c$, "TOOLKIT_MODAL", 3, []);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjava.awt.Dialog, "ModalExclusionType", Enum);
Clazz.defineEnumConstant (c$, "NO_EXCLUDE", 0, []);
Clazz.defineEnumConstant (c$, "APPLICATION_EXCLUDE", 1, []);
Clazz.defineEnumConstant (c$, "TOOLKIT_EXCLUDE", 2, []);
c$ = Clazz.p0p ();
c$.DEFAULT_MODALITY_TYPE = c$.prototype.DEFAULT_MODALITY_TYPE = jsjava.awt.Dialog.ModalityType.APPLICATION_MODAL;
Clazz.defineStatics (c$,
"$base", "dialog",
"$nameCounter", 0);
});
