Clazz.declarePackage ("jssun.awt");
Clazz.load (["jsjava.awt.AWTEvent", "$.ActiveEvent"], "jssun.awt.ModalityEvent", ["java.lang.Error"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listener = null;
Clazz.instantialize (this, arguments);
}, jssun.awt, "ModalityEvent", jsjava.awt.AWTEvent, jsjava.awt.ActiveEvent);
Clazz.makeConstructor (c$, 
function (source, listener, id) {
Clazz.superConstructor (this, jssun.awt.ModalityEvent, [source, id]);
this.listener = listener;
}, "~O,jssun.awt.ModalityListener,~N");
Clazz.overrideMethod (c$, "dispatch", 
function () {
switch (this.getID ()) {
case 1300:
this.listener.modalityPushed (this);
break;
case 1301:
this.listener.modalityPopped (this);
break;
default:
throw  new Error ("Invalid event id.");
}
});
Clazz.defineStatics (c$,
"MODALITY_PUSHED", 1300,
"MODALITY_POPPED", 1301);
});
