Clazz.declarePackage ("swingjs");
Clazz.load (["javax.swing.event.DocumentEvent"], "swingjs.JSDocumentEvent", ["swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.off = 0;
this.len = 0;
this.type = null;
this.doc = null;
Clazz.instantialize (this, arguments);
}, swingjs, "JSDocumentEvent", null, javax.swing.event.DocumentEvent);
Clazz.makeConstructor (c$, 
function (doc, offs, len, eventType) {
this.off = offs;
this.len = len;
this.type = eventType;
this.doc = doc;
}, "swingjs.JSAbstractDocument,~N,~N,javax.swing.event.DocumentEvent.EventType");
Clazz.overrideMethod (c$, "getOffset", 
function () {
return this.off;
});
Clazz.overrideMethod (c$, "getLength", 
function () {
return this.len;
});
Clazz.overrideMethod (c$, "getDocument", 
function () {
return this.doc;
});
Clazz.overrideMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.overrideMethod (c$, "getChange", 
function (elem) {
swingjs.JSToolkit.notImplemented ("");
return null;
}, "javax.swing.text.Element");
});
