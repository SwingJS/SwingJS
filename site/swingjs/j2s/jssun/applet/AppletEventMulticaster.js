Clazz.declarePackage ("jssun.applet");
Clazz.load (["jssun.applet.AppletListener"], "jssun.applet.AppletEventMulticaster", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.a = null;
this.b = null;
Clazz.instantialize (this, arguments);
}, jssun.applet, "AppletEventMulticaster", null, jssun.applet.AppletListener);
Clazz.makeConstructor (c$, 
function (a, b) {
this.a = a;
this.b = b;
}, "jssun.applet.AppletListener,jssun.applet.AppletListener");
Clazz.defineMethod (c$, "appletStateChanged", 
function (e) {
this.a.appletStateChanged (e);
this.b.appletStateChanged (e);
}, "jssun.applet.AppletEvent");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jssun.applet.AppletEventMulticaster.addInternal (a, b);
}, "jssun.applet.AppletListener,jssun.applet.AppletListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jssun.applet.AppletEventMulticaster.removeInternal (l, oldl);
}, "jssun.applet.AppletListener,jssun.applet.AppletListener");
c$.addInternal = Clazz.defineMethod (c$, "addInternal", 
($fz = function (a, b) {
if (a == null) return b;
if (b == null) return a;
return  new jssun.applet.AppletEventMulticaster (a, b);
}, $fz.isPrivate = true, $fz), "jssun.applet.AppletListener,jssun.applet.AppletListener");
Clazz.defineMethod (c$, "remove", 
function (oldl) {
if (oldl === this.a) return this.b;
if (oldl === this.b) return this.a;
var a2 = jssun.applet.AppletEventMulticaster.removeInternal (this.a, oldl);
var b2 = jssun.applet.AppletEventMulticaster.removeInternal (this.b, oldl);
if (a2 === this.a && b2 === this.b) {
return this;
}return jssun.applet.AppletEventMulticaster.addInternal (a2, b2);
}, "jssun.applet.AppletListener");
c$.removeInternal = Clazz.defineMethod (c$, "removeInternal", 
($fz = function (l, oldl) {
if (l === oldl || l == null) {
return null;
} else if (Clazz.instanceOf (l, jssun.applet.AppletEventMulticaster)) {
return (l).remove (oldl);
} else {
return l;
}}, $fz.isPrivate = true, $fz), "jssun.applet.AppletListener,jssun.applet.AppletListener");
});
