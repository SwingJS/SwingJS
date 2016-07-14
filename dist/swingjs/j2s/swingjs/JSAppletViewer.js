Clazz.declarePackage ("swingjs");
Clazz.load (["java.applet.AppletContext", "$.AppletStub", "swingjs.JSFrameViewer", "swingjs.api.JSInterface", "JU.Lst", "java.awt.Dimension"], "swingjs.JSAppletViewer", ["java.lang.InstantiationException", "java.net.URL", "java.awt.Font", "$.Insets", "$.Toolkit", "java.lang.Thread", "javax.swing.JApplet", "sun.applet.AppletEvent", "$.AppletEventMulticaster", "swingjs.JSAppletThread", "$.JSThreadGroup", "$.JSToolkit", "$.JSUtil", "swingjs.api.Interface"], function () {
c$ = Clazz.decorateAsClass (function () {
this.params = null;
this.maximumSize = 2147483647;
this.appletCodeBase = null;
this.appletIdiomaBase = null;
this.appletDocumentBase = null;
this.appletName = null;
this.syncId = null;
this.testAsync = false;
this.async = false;
this.strJavaVersion = null;
this.strJavaVendor = null;
this.graphicsConfig = null;
this.threadGroup = null;
this.myThread = null;
this.haveFrames = false;
this.defaultAppletSize = null;
this.currentAppletSize = null;
this.nextStatus = 0;
this.status = 0;
this.listeners = null;
this.allWindows = null;
this.sharedOwnerFrame = null;
this.htmlName = null;
this.appContext = null;
Clazz.instantialize (this, arguments);
}, swingjs, "JSAppletViewer", swingjs.JSFrameViewer, [java.applet.AppletStub, java.applet.AppletContext, swingjs.api.JSInterface]);
Clazz.prepareFields (c$, function () {
this.defaultAppletSize =  new java.awt.Dimension (10, 10);
this.currentAppletSize =  new java.awt.Dimension (10, 10);
this.allWindows =  new JU.Lst ();
});
Clazz.defineMethod (c$, "addWindow", 
function (window) {
this.allWindows.removeObj (window);
this.allWindows.addLast (window);
}, "java.awt.Window");
Clazz.makeConstructor (c$, 
function (params) {
Clazz.superConstructor (this, swingjs.JSAppletViewer, []);
this.isApplet = true;
this.appletViewer = this;
this.set (params);
}, "java.util.Hashtable");
Clazz.defineMethod (c$, "set", 
 function (params) {
this.isApplet = true;
System.out.println ("JSAppletViewer initializing");
this.params = params;
this.htmlName = swingjs.JSUtil.split ("" + this.getParameter ("name"), "_object")[0];
this.appletName = swingjs.JSUtil.split (this.htmlName + "_", "_")[0];
this.syncId = this.getParameter ("syncId");
this.fullName = this.htmlName + "__" + this.syncId + "__";
params.put ("fullName", this.fullName);
var o = params.get ("codePath");
if (o == null) o = "../java/";
this.appletCodeBase = o.toString ();
this.appletIdiomaBase = this.appletCodeBase.substring (0, this.appletCodeBase.lastIndexOf ("/", this.appletCodeBase.length - 2) + 1) + "idioma";
o = params.get ("documentBase");
this.appletDocumentBase = (o == null ? "" : o.toString ());
if (params.containsKey ("maximumSize")) Math.max ((params.get ("maximumSize")).intValue (), 100);
this.async = (this.testAsync || params.containsKey ("async"));
var pt = this.htmlName.indexOf ("_object");
var applet = swingjs.JSToolkit.J2S._findApplet (this.htmlName);
var javaver = swingjs.JSToolkit.J2S._getJavaVersion ();
this.html5Applet = applet;
this.strJavaVersion = javaver;
this.strJavaVendor = "Java2Script/Java 1.6 (HTML5)";
this.display = params.get ("display");
this.threadGroup =  new swingjs.JSThreadGroup (this.appletName);
this.myThread =  new swingjs.JSAppletThread (this, this.threadGroup, this.appletName);
(this.threadGroup).setHtmlApplet (this.html5Applet);
swingjs.JSToolkit.J2S._setAppletThread (this.appletName, this.myThread);
java.lang.Thread, java.lang.Thread.thisThread = (this.myThread);
this.appContext = swingjs.JSToolkit.createNewAppContext ();
java.awt.Toolkit.getDefaultToolkit ();
try {
java.net.URL.setURLStreamHandlerFactory (swingjs.api.Interface.getInstance ("JU.AjaxURLStreamHandlerFactory", false));
} catch (e) {
}
System.out.println ("JSAppletViewer initialized");
this.insets =  new java.awt.Insets (0, 0, 0, 0);
}, "java.util.Hashtable");
Clazz.defineMethod (c$, "start", 
function () {
if (this.status == 0) this.myThread.start ();
 else this.showStatus ("already started");
});
Clazz.defineMethod (c$, "addAppletListener", 
function (l) {
this.listeners = sun.applet.AppletEventMulticaster.add (this.listeners, l);
}, "sun.applet.AppletListener");
Clazz.defineMethod (c$, "removeAppletListener", 
function (l) {
this.listeners = sun.applet.AppletEventMulticaster.remove (this.listeners, l);
}, "sun.applet.AppletListener");
Clazz.defineMethod (c$, "dispatchAppletEvent", 
function (id, argument) {
if (this.listeners != null) {
var evt =  new sun.applet.AppletEvent (this, id, argument);
this.listeners.appletStateChanged (evt);
}}, "~N,~O");
Clazz.defineMethod (c$, "getCode", 
 function () {
return this.getParameter ("code");
});
Clazz.overrideMethod (c$, "isActive", 
function () {
return true;
});
Clazz.overrideMethod (c$, "appletResize", 
function (width, height) {
var currentSize =  new java.awt.Dimension (this.currentAppletSize.width, this.currentAppletSize.height);
this.currentAppletSize.width = width;
this.currentAppletSize.height = height;
this.japplet.setBounds (0, 0, this.getWidth (), this.getHeight ());
this.japplet.getRootPane ().setBounds (0, 0, this.getWidth (), this.getHeight ());
this.japplet.getContentPane ().setBounds (0, 0, this.getWidth (), this.getHeight ());
(this.japplet.getContentPane ()).revalidate ();
this.dispatchAppletEvent (51234, currentSize);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDocumentBase", 
function () {
try {
return  new java.net.URL (this.params.get ("documentBase"));
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "getCodeBase", 
function () {
try {
return  new java.net.URL (this.params.get ("codePath"));
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "getParameter", 
function (name) {
var s = this.params.get (name);
System.out.println ("get parameter: " + name + " = " + s);
return (s == null ? null : "" + s);
}, "~S");
Clazz.overrideMethod (c$, "getAppletContext", 
function () {
return this;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.html5Applet._getHeight ();
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.html5Applet._getWidth ();
});
Clazz.defineMethod (c$, "setBounds", 
function (x, y, width, height) {
this.japplet.reshape (x, y, width, height);
this.currentAppletSize.width = width;
this.currentAppletSize.height = height;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getImage", 
function (url) {
return null;
}, "java.net.URL");
Clazz.overrideMethod (c$, "getApplet", 
function (name) {
var applet = null;
{
applet = Jmol._applets[name]; applet && (applet =
applet._applet);
}return applet;
}, "~S");
Clazz.overrideMethod (c$, "getApplets", 
function () {
return null;
});
Clazz.defineMethod (c$, "showDocument", 
function (url) {
{
window.open(url.toString());
}}, "java.net.URL");
Clazz.defineMethod (c$, "showDocument", 
function (url, target) {
{
window.open(url.toString(), target);
}}, "java.net.URL,~S");
Clazz.defineMethod (c$, "showStatus", 
function (status) {
swingjs.JSToolkit.log (status);
{
Clazz._LoaderProgressMonitor.showStatus(status, true);
}}, "~S");
Clazz.defineMethod (c$, "showAppletStatus", 
 function (status) {
this.getAppletContext ().showStatus (this.htmlName + " " + status);
}, "~S");
Clazz.defineMethod (c$, "showAppletException", 
 function (t) {
{
this.showAppletStatus("error " + (t.getMessage ?
t.getMessage() : t)); t.printStackTrace &&
t.printStackTrace();
}}, "Throwable");
Clazz.defineMethod (c$, "run1", 
function (mode) {
var ok = false;
switch (mode) {
case 0:
this.currentAppletSize.width = this.defaultAppletSize.width = this.getWidth ();
this.currentAppletSize.height = this.defaultAppletSize.height = this.getHeight ();
this.nextStatus = 1;
ok = true;
break;
case 1:
switch (this.nextStatus) {
case 1:
if (this.status != 0) {
this.showAppletStatus ("notdisposed");
this.status = 7;
break;
}System.out.println ("JSAppletViewer runloader");
this.runLoader ();
this.nextStatus = 2;
ok = true;
break;
case 2:
if (this.status != 1 && this.status != 5) {
this.showAppletStatus ("notloaded");
break;
}System.out.println ("JSAppletViewer init");
this.japplet.setFont ( new java.awt.Font ("Dialog", 0, 12));
this.japplet.resize (this.defaultAppletSize);
this.japplet.init ();
this.japplet.validate ();
this.status = 2;
this.showAppletStatus ("initialized");
this.nextStatus = 3;
ok = true;
break;
case 3:
if (this.status != 2 && this.status != 4) {
this.showAppletStatus ("notstarted");
this.status = 7;
break;
}this.japplet.getRootPane ().addNotify ();
System.out.println ("JSAppletViewer start" + this.currentAppletSize);
this.japplet.resize (this.currentAppletSize);
this.japplet.start ();
this.status = 3;
this.showAppletStatus ("started");
this.nextStatus = 35;
ok = true;
break;
case 35:
swingjs.JSToolkit.readyCallback (this.appletName, this.fullName, this.applet, this);
break;
case 4:
if (this.status == 3) {
this.status = 4;
this.japplet.setVisible (false);
this.japplet.stop ();
this.showAppletStatus ("stopped");
} else {
this.showAppletStatus ("notstopped");
this.status = 7;
}break;
case 5:
if (this.status == 4 || this.status == 2) {
this.status = 5;
this.japplet.destroy ();
this.showAppletStatus ("destroyed");
} else {
this.showAppletStatus ("notdestroyed");
this.status = 7;
}break;
case 75:
if (this.status == 5 || this.status == 1) {
this.showAppletStatus ("notdisposed");
this.status = 7;
} else {
this.status = 0;
this.applet = null;
this.showAppletStatus ("disposed");
}break;
case 6:
break;
default:
System.out.println ("unrecognized JSAppletViewer status: " + this.nextStatus);
break;
}
break;
default:
System.out.println ("unrecognized JSAppletThread mode: " + mode);
break;
}
return (ok ? 1 : 2);
}, "~N");
Clazz.defineMethod (c$, "runLoader", 
 function () {
this.dispatchAppletEvent (51235, null);
this.status = 1;
var code = this.getCode ();
try {
if (code == null) {
System.err.println ("runloader.err-- \"code\" must be specified.");
throw  new InstantiationException ("\"code\" must be specified.");
}this.top = this.applet = this.japplet = swingjs.JSToolkit.getInstance (code);
if (this.applet == null) {
System.out.println (code + " could not be launched");
this.status = 7;
} else if (!(Clazz.instanceOf (this.applet, javax.swing.JApplet))) {
System.out.println (code + " is not a JApplet!?");
this.status = 7;
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, InstantiationException)) {
var e = e$$;
{
this.status = 7;
this.showAppletException (e);
return;
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
this.status = 7;
this.showAppletException (e);
return;
}
} else if (Clazz.exceptionOf (e$$, ThreadDeath)) {
var e = e$$;
{
this.status = 7;
this.showAppletStatus ("death");
return;
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var e = e$$;
{
this.status = 7;
this.showAppletException (e);
return;
}
} else {
throw e$$;
}
} finally {
this.dispatchAppletEvent (51236, null);
}
if (this.applet != null) {
this.japplet.setStub (this);
this.japplet.setVisible (false);
this.japplet.setDispatcher ();
this.japplet.setVisible (true);
this.showAppletStatus ("loaded");
}});
Clazz.defineMethod (c$, "newFrameViewer", 
function (forceNew) {
return (this.haveFrames || forceNew ?  new swingjs.JSFrameViewer () : null);
}, "~B");
Clazz.overrideMethod (c$, "paint", 
function (g) {
g = this.setGraphics (g, 0, 0);
this.applet.paint (g);
}, "java.awt.Graphics");
Clazz.defineStatics (c$,
"APPLET_UNINITIALIZED", 0,
"APPLET_LOAD", 1,
"APPLET_INIT", 2,
"APPLET_START", 3,
"APPLET_READY", 35,
"APPLET_STOP", 4,
"APPLET_DESTROY", 5,
"APPLET_QUIT", 6,
"APPLET_ERROR", 7,
"APPLET_DISPOSE", 75,
"APPLET_RESIZE", 51234,
"APPLET_LOADING", 51235,
"APPLET_LOADING_COMPLETED", 51236);
});
