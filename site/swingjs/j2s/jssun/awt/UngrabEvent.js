Clazz.declarePackage ("jssun.awt");
Clazz.load (["jsjava.awt.AWTEvent"], "jssun.awt.UngrabEvent", null, function () {
c$ = Clazz.declareType (jssun.awt, "UngrabEvent", jsjava.awt.AWTEvent);
Clazz.makeConstructor (c$, 
function (source) {
Clazz.superConstructor (this, jssun.awt.UngrabEvent, [source, 1998]);
}, "jsjava.awt.Component");
Clazz.overrideMethod (c$, "toString", 
function () {
return "jssun.awt.UngrabEvent[" + this.getSource () + "]";
});
Clazz.defineStatics (c$,
"UNGRAB_EVENT_ID", 1998);
});
