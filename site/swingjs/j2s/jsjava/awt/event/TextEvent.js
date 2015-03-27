Clazz.declarePackage ("jsjava.awt.event");
Clazz.load (["jsjava.awt.AWTEvent"], "jsjava.awt.event.TextEvent", null, function () {
c$ = Clazz.declareType (jsjava.awt.event, "TextEvent", jsjava.awt.AWTEvent);
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 900:
typeStr = "TEXT_VALUE_CHANGED";
break;
default:
typeStr = "unknown type";
}
return typeStr;
});
Clazz.defineStatics (c$,
"TEXT_FIRST", 900,
"TEXT_LAST", 900,
"TEXT_VALUE_CHANGED", 900);
});
