Clazz.declarePackage ("jssun.awt");
c$ = Clazz.declareType (jssun.awt, "AWTAccessor");
c$.setWindowAccessor = Clazz.defineMethod (c$, "setWindowAccessor", 
function (wa) {
jssun.awt.AWTAccessor.windowAccessor = wa;
}, "jssun.awt.AWTAccessor.WindowAccessor");
c$.getWindowAccessor = Clazz.defineMethod (c$, "getWindowAccessor", 
function () {
return jssun.awt.AWTAccessor.windowAccessor;
});
c$.setComponentAccessor = Clazz.defineMethod (c$, "setComponentAccessor", 
function (ca) {
jssun.awt.AWTAccessor.componentAccessor = ca;
}, "jssun.awt.AWTAccessor.ComponentAccessor");
c$.getComponentAccessor = Clazz.defineMethod (c$, "getComponentAccessor", 
function () {
return jssun.awt.AWTAccessor.componentAccessor;
});
c$.setAWTEventAccessor = Clazz.defineMethod (c$, "setAWTEventAccessor", 
function (aea) {
jssun.awt.AWTAccessor.awtEventAccessor = aea;
}, "jssun.awt.AWTAccessor.AWTEventAccessor");
c$.getAWTEventAccessor = Clazz.defineMethod (c$, "getAWTEventAccessor", 
function () {
return jssun.awt.AWTAccessor.awtEventAccessor;
});
c$.setEventQueueAccessor = Clazz.defineMethod (c$, "setEventQueueAccessor", 
function (eqa) {
jssun.awt.AWTAccessor.eventQueueAccessor = eqa;
}, "jssun.awt.AWTAccessor.EventQueueAccessor");
c$.getEventQueueAccessor = Clazz.defineMethod (c$, "getEventQueueAccessor", 
function () {
return jssun.awt.AWTAccessor.eventQueueAccessor;
});
Clazz.declareInterface (jssun.awt.AWTAccessor, "WindowAccessor");
Clazz.declareInterface (jssun.awt.AWTAccessor, "ComponentAccessor");
Clazz.declareInterface (jssun.awt.AWTAccessor, "KeyboardFocusManagerAccessor");
Clazz.declareInterface (jssun.awt.AWTAccessor, "AWTEventAccessor");
Clazz.declareInterface (jssun.awt.AWTAccessor, "EventQueueAccessor");
Clazz.declareInterface (jssun.awt.AWTAccessor, "CursorAccessor");
Clazz.declareInterface (jssun.awt.AWTAccessor, "ClientPropertyKeyAccessor");
Clazz.defineStatics (c$,
"componentAccessor", null,
"windowAccessor", null,
"awtEventAccessor", null,
"eventQueueAccessor", null);
