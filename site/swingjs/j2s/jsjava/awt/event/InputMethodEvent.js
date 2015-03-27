Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.AWTEvent"], "jsjava.awt.event.InputMethodEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.text = null;
this.committedCharacterCount = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt.event, "InputMethodEvent", jsjava.awt.AWTEvent);
Clazz.defineMethod (c$, "getText", 
function () {
return this.text;
});
Clazz.defineMethod (c$, "getCommittedCharacterCount", 
function () {
return this.committedCharacterCount;
});
Clazz.defineStatics (c$,
"INPUT_METHOD_FIRST", 1100,
"INPUT_METHOD_TEXT_CHANGED", 1100,
"CARET_POSITION_CHANGED", 1101,
"INPUT_METHOD_LAST", 1101);
});
