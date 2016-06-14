Clazz.declarePackage ("swingjs");
Clazz.load (["jssun.awt.SunToolkit"], "swingjs.JSToolkit", ["java.io.BufferedInputStream", "$.ByteArrayInputStream", "$.InputStream", "java.lang.Boolean", "$.Thread", "java.util.Hashtable", "JU.AU", "$.Rdr", "$.SB", "java.awt.Dimension", "java.awt.image.ColorModel", "javax.swing.UIManager", "jssun.awt.AppContext", "swingjs.JSComponentPeer", "swingjs.api.Interface"], function () {
c$ = Clazz.decorateAsClass (function () {
this.imageKit = null;
Clazz.instantialize (this, arguments);
}, swingjs, "JSToolkit", jssun.awt.SunToolkit);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.JSToolkit);
System.out.println ("JSToolkit initialized");
});
c$.warn = Clazz.defineMethod (c$, "warn", 
function (msg) {
swingjs.JSToolkit.alert (msg);
}, "~S");
c$.alert = Clazz.defineMethod (c$, "alert", 
function (object) {
{
console.log("[JSToolkit] " + object);
alert("[JSToolkit] " + object);
}}, "~O");
c$.log = Clazz.defineMethod (c$, "log", 
function (msg) {
{
System.out.println(msg);
console.log(msg);
}}, "~S");
c$.confirm = Clazz.defineMethod (c$, "confirm", 
function (msg) {
{
return confirm(msg);
}}, "~S");
c$.prompt = Clazz.defineMethod (c$, "prompt", 
function (msg, defaultRet) {
{
return confirm(msg, defaultRet);
}}, "~S,~S");
c$.getPostEventQueue = Clazz.defineMethod (c$, "getPostEventQueue", 
function (isPost) {
return (isPost ? jssun.awt.AppContext.getAppContext ().get ("PostEventQueue") : jssun.awt.AppContext.getAppContext ().get (jssun.awt.AppContext.EVENT_QUEUE_KEY));
}, "~B");
Clazz.overrideMethod (c$, "getScreenSize", 
function () {
var jq = swingjs.JSToolkit.getJQuery ();
var w = 0;
var h = 0;
{
w = jq.$(window).width();
h = jq.$(window).height();
}return  new java.awt.Dimension (w, h);
});
Clazz.overrideMethod (c$, "getScreenResolution", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getColorModel", 
function () {
return java.awt.image.ColorModel.getRGBdefault ();
});
Clazz.overrideMethod (c$, "getFontList", 
function () {
var hardwiredFontList = ["SansSerif", "SansSerif", "Serif", "Monospaced", "DialogInput"];
return hardwiredFontList;
});
Clazz.overrideMethod (c$, "sync", 
function () {
});
Clazz.overrideMethod (c$, "isModalExclusionTypeSupported", 
function (modalExclusionType) {
return true;
}, "java.awt.Dialog.ModalExclusionType");
Clazz.overrideMethod (c$, "isModalityTypeSupported", 
function (modalityType) {
return false;
}, "java.awt.Dialog.ModalityType");
Clazz.overrideMethod (c$, "isTraySupported", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getScreenWidth", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getScreenHeight", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "grab", 
function (w) {
}, "java.awt.Window");
Clazz.overrideMethod (c$, "ungrab", 
function (w) {
}, "java.awt.Window");
c$.getPropertyObject = Clazz.defineMethod (c$, "getPropertyObject", 
function (t, key, def) {
return def;
}, "~O,~S,~O");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (className) {
return swingjs.api.Interface.getInstance (className, false);
}, "~S");
c$.getGraphicsConfiguration = Clazz.defineMethod (c$, "getGraphicsConfiguration", 
function () {
return (swingjs.JSToolkit.gc == null ? swingjs.JSToolkit.gc = swingjs.JSToolkit.getInstance ("swingjs.JSGraphicsConfiguration") : swingjs.JSToolkit.gc);
});
c$.isFocused = Clazz.defineMethod (c$, "isFocused", 
function (window) {
return false;
}, "java.awt.Window");
c$.getCSSFont = Clazz.defineMethod (c$, "getCSSFont", 
function (font) {
var css = "";
if (font.isItalic ()) css += "font-style:italic;";
if (font.isBold ()) css += "font-weight:bold;";
css += "font-size:" + font.getSize () + "px;";
css += "font-family:" + font.getFamily () + ";";
return css;
}, "java.awt.Font");
c$.getStringWidth = Clazz.defineMethod (c$, "getStringWidth", 
function (context, font, text) {
var fontInfo = swingjs.JSToolkit.getCanvasFont (font);
if (context == null) context = swingjs.JSToolkit.getDefaultCanvasContext2d ();
var w = 0;
{
context.font = fontInfo;
w = Math.ceil(context.measureText(text).width);
}return w;
}, "swingjs.api.HTML5CanvasContext2D,java.awt.Font,~S");
c$.getDefaultCanvasContext2d = Clazz.defineMethod (c$, "getDefaultCanvasContext2d", 
function () {
{
if (this.defaultContext == null) this.defaultContext =
document.createElement( 'canvas' ).getContext('2d');
}return swingjs.JSToolkit.defaultContext;
});
c$.getCanvasFont = Clazz.defineMethod (c$, "getCanvasFont", 
function (font) {
var strStyle = "";
if (font.isItalic ()) strStyle += "italic ";
if (font.isBold ()) strStyle += "bold ";
return strStyle + font.getSize () + "px " + font.getFamily ();
}, "java.awt.Font");
c$.getFontFamily = Clazz.defineMethod (c$, "getFontFamily", 
function (font) {
return font.getName ();
}, "java.awt.Font");
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font) {
var fm = font.getFontMetrics ();
if (fm == null) {
fm = swingjs.JSToolkit.getInstance ("swingjs.JSFontMetrics");
(fm).setFont (font);
font.setFontMetrics (fm);
}return fm;
}, "java.awt.Font");
c$.getCSSColor = Clazz.defineMethod (c$, "getCSSColor", 
function (c) {
var s = "000000" + Integer.toHexString (c.getRGB () & 0xFFFFFF);
return "#" + s.substring (s.length - 6);
}, "java.awt.Color");
c$.notImplemented = Clazz.defineMethod (c$, "notImplemented", 
function (msg) {
var s = null;
if (swingjs.JSToolkit.mapNotImpl == null) swingjs.JSToolkit.mapNotImpl =  new java.util.Hashtable ();
{
s = arguments.callee.caller; s = s.__CLASS_NAME__ ||
s.claxxOwner.__CLASS_NAME__; s += "." +
arguments.callee.caller.exName;
}if (swingjs.JSToolkit.mapNotImpl.containsKey (s)) return;
swingjs.JSToolkit.mapNotImpl.put (s, Boolean.TRUE);
System.out.println (s + " has not been implemented in SwingJS. " + (msg === "" ? "" : (msg == null ? "" : msg) + swingjs.JSToolkit.getStackTrace (-5)));
}, "~S");
c$.getStackTrace = Clazz.defineMethod (c$, "getStackTrace", 
function () {
{
return Clazz.getStackTrace();
}});
c$.getStackTrace = Clazz.defineMethod (c$, "getStackTrace", 
function (n) {
{
return Clazz.getStackTrace(n);
}}, "~N");
c$.getLookAndFeelDefaults = Clazz.defineMethod (c$, "getLookAndFeelDefaults", 
function () {
if (swingjs.JSToolkit.uid == null) swingjs.JSToolkit.uid = javax.swing.UIManager.getLookAndFeel ().getDefaults ();
return swingjs.JSToolkit.uid;
});
c$.getComponentUI = Clazz.defineMethod (c$, "getComponentUI", 
function (target) {
var s;
var c = swingjs.api.Interface.getInstance ("swingjs.plaf.JS" + (target).getUIClassID (), true);
if (c != null) c.set (target);
return c;
}, "javax.swing.JComponent");
c$.getSwingDivId = Clazz.defineMethod (c$, "getSwingDivId", 
function () {
return Thread.currentThread ().getName () + "_swingdiv";
});
c$.getJQuery = Clazz.defineMethod (c$, "getJQuery", 
function () {
{
if (!window.jQuery) alert(
"jQuery is required for SwingJS, but window.jQuery is not defined."
); jQuery.$ || (jQuery.$ = jQuery); return(jQuery);
}});
c$.getJavaResource = Clazz.defineMethod (c$, "getJavaResource", 
function (resourceName, isJavaPath) {
System.out.println ("JSToolkit getting Java resource " + resourceName);
{
return SwingJS.getJavaResource(resourceName, isJavaPath);
}}, "~S,~B");
c$.dispatchSystemEvent = Clazz.defineMethod (c$, "dispatchSystemEvent", 
function (runnable) {
var f = null;
{
System.out.println("JST dispatchSystemEvent " +
runnable.run.toString()); f =
function(_JSToolkit_dispatchSystemEvent) {
System.out.println("JST running " +
runnable.run.toString());runnable.run()};
}swingjs.JSToolkit.dispatch (f, 0, 0);
}, "Runnable");
c$.dispatchEvent = Clazz.defineMethod (c$, "dispatchEvent", 
function (event, src, andWait) {
var f = null;
var id = ++swingjs.JSToolkit.dispatchID;
{
f = function()
{
if
(src == null) event.dispatch(); else src.dispatchEvent(event);
};
}if (andWait) swingjs.JSToolkit.invokeAndWait (f, id);
 else swingjs.JSToolkit.dispatch (f, 0, id);
}, "java.awt.AWTEvent,~O,~B");
c$.dispatch = Clazz.defineMethod (c$, "dispatch", 
function (f, msDelay, id) {
{
var thread = java.lang.Thread.thisThread;
var thread0 = thread;
var id0 = SwingJS.eventID || 0;
setTimeout(function(_JSToolkit_setTimeout) {
SwingJS.eventID = id;
java.lang.Thread.thisThread = thread;
try {
if (f.run)
f.run();
else
f();
} catch (e) {
var s = "JSToolkit.dispatch(" + id +"): " + e + (e.getStackTrace ? e.getStackTrace() : e.stack ? "\n" + e.stack : "");
System.out.println(s);
alert(s)}
SwingJS.eventID = id0;
java.lang.Thread.thisThread = thread0;
}, msDelay);
}}, "~O,~N,~N");
c$.invokeAndWait = Clazz.defineMethod (c$, "invokeAndWait", 
 function (f, id) {
{
var thread = java.lang.Thread.thisThread;
var thread0 = thread;
(function(_JSToolkit_setTimeout) {
var id0 = SwingJS.eventID || 0;
System.out.println("runNow " + id); SwingJS.eventID = id;
java.lang.Thread.thisThread = thread;
if (f.run)
f.run();
else
f();
SwingJS.eventID = id0;
java.lang.Thread.thisThread = thread0;
})();
}}, "swingjs.api.JSFunction,~N");
c$.isDispatchThread = Clazz.defineMethod (c$, "isDispatchThread", 
function () {
{
return (!!SwingJS.eventID);
}});
c$.checkClassMethod = Clazz.defineMethod (c$, "checkClassMethod", 
function (component, fname, signature) {
{
return component[fname] && component[fname][signature];
}}, "java.awt.Component,~S,~S");
c$.readyCallback = Clazz.defineMethod (c$, "readyCallback", 
function (aname, fname, a, me) {
{
Jmol._readyCallback(aname, fname, true,a, me);
}}, "~S,~S,~O,~O");
c$.forceRepaint = Clazz.defineMethod (c$, "forceRepaint", 
function (c) {
}, "java.awt.Component");
c$.getHTML5Applet = Clazz.defineMethod (c$, "getHTML5Applet", 
function (c) {
return (c.getAppContext ().getThreadGroup ()).getHtmlApplet ();
}, "javax.swing.JComponent");
c$.taintUI = Clazz.defineMethod (c$, "taintUI", 
function (c) {
{
c.getUI && c.getUI() && c.getUI().setTainted();
}}, "java.awt.Component");
Clazz.overrideMethod (c$, "createComponent", 
function (target) {
var peer = swingjs.JSToolkit.getUI (target, true);
if (peer == null) peer =  new swingjs.JSComponentPeer (target);
System.out.println ("JSToolkit creating Peer for " + target.getClass ().getName () + ": " + peer.getClass ().getName ());
return peer;
}, "java.awt.Component");
c$.getPlainDocument = Clazz.defineMethod (c$, "getPlainDocument", 
function (c) {
return swingjs.JSToolkit.getInstance ("swingjs.JSPlainDocument");
}, "javax.swing.JComponent");
c$.getClassName = Clazz.defineMethod (c$, "getClassName", 
function (c) {
{
return c.__CLASS_NAME__;
}}, "~O");
c$.getSignedStreamBytes = Clazz.defineMethod (c$, "getSignedStreamBytes", 
function (bis) {
try {
return JU.AU.ensureSignedBytes (JU.Rdr.getStreamAsBytes (bis, null));
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}, "java.io.BufferedInputStream");
c$.getFileContents = Clazz.defineMethod (c$, "getFileContents", 
function (uri) {
{
return Jmol._getFileData(uri);
}}, "~S");
Clazz.defineMethod (c$, "getFileAsBytes", 
function (filename) {
var data = swingjs.JSToolkit.getFileContents (filename);
var b = null;
if (JU.AU.isAB (data)) b = data;
 else if (Clazz.instanceOf (data, String)) b = (data).getBytes ();
 else if (Clazz.instanceOf (data, JU.SB)) b = JU.Rdr.getBytesFromSB (data);
 else if (Clazz.instanceOf (data, java.io.InputStream)) try {
b = JU.Rdr.getLimitedStreamBytes (data, -1);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return JU.AU.ensureSignedBytes (b);
}, "~S");
Clazz.defineMethod (c$, "getImagekit", 
 function () {
return (this.imageKit == null ? this.imageKit = swingjs.api.Interface.getInstance ("swingjs.JSImagekit", false) : this.imageKit);
});
Clazz.defineMethod (c$, "createImage", 
function (producer) {
var kit = swingjs.api.Interface.getInstance ("swingjs.JSImagekit", false);
producer.startProduction (kit);
return kit.getCreatedImage ();
}, "java.awt.image.ImageProducer");
Clazz.defineMethod (c$, "createImage", 
function (filename) {
return this.getImagekit ().createImageFromBytes (swingjs.JSToolkit.getSignedStreamBytes ( new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (this.getFileAsBytes (filename)))), 0, -1);
}, "~S");
Clazz.defineMethod (c$, "createImage", 
function (url) {
try {
return this.getImagekit ().createImageFromBytes (swingjs.JSToolkit.getSignedStreamBytes ( new java.io.BufferedInputStream (url.openStream ())), 0, -1);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}, "java.net.URL");
Clazz.defineMethod (c$, "createImage", 
function (data, imageoffset, imagelength) {
return this.getImagekit ().createImageFromBytes (data, imageoffset, imagelength);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "checkImage", 
function (image, width, height, observer) {
return 63;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "prepareImage", 
function (image, width, height, observer) {
return true;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
c$.hasFocus = Clazz.defineMethod (c$, "hasFocus", 
function (c) {
var ui = swingjs.JSToolkit.getUI (c, false);
return (ui != null && ui.hasFocus ());
}, "java.awt.Component");
c$.getUI = Clazz.defineMethod (c$, "getUI", 
function (c, isQuiet) {
var ui = null;
{
ui = c.getUI && c.getUI();
}if (ui == null) {
var s = "[JSToolkit] Component " + c.getClass ().getName () + " has no cooresponding JSComponentUI.";
System.out.println (s);
}return ui;
}, "java.awt.Component,~B");
c$.requestFocus = Clazz.defineMethod (c$, "requestFocus", 
function (c) {
var ui = swingjs.JSToolkit.getUI (c, false);
if (ui == null || !ui.isFocusable ()) return false;
var r = ((Clazz.isClassDefined ("swingjs.JSToolkit$1") ? 0 : swingjs.JSToolkit.$JSToolkit$1$ ()), Clazz.innerTypeInstance (swingjs.JSToolkit$1, this, Clazz.cloneFinals ("ui", ui)));
swingjs.JSToolkit.dispatch (r, 50, 0);
return true;
}, "java.awt.Component");
c$.getCompositor = Clazz.defineMethod (c$, "getCompositor", 
function () {
return (swingjs.JSToolkit.compositor == null ? swingjs.JSToolkit.compositor = swingjs.api.Interface.getInstance ("swingjs.JSGraphicsCompositor", false) : swingjs.JSToolkit.compositor);
});
c$.setGraphicsCompositeAlpha = Clazz.defineMethod (c$, "setGraphicsCompositeAlpha", 
function (g, rule) {
return swingjs.JSToolkit.getCompositor ().setGraphicsCompositeAlpha (g, rule);
}, "swingjs.JSGraphics2D,~N");
c$.drawImageOp = Clazz.defineMethod (c$, "drawImageOp", 
function (g, img, op, x, y) {
return swingjs.JSToolkit.getCompositor ().drawImageOp (g, img, op, x, y);
}, "swingjs.JSGraphics2D,java.awt.image.BufferedImage,java.awt.image.BufferedImageOp,~N,~N");
c$.filterRaster = Clazz.defineMethod (c$, "filterRaster", 
function (src, dst, op) {
return swingjs.JSToolkit.getCompositor ().filterRaster (src, dst, op);
}, "java.awt.image.Raster,java.awt.image.WritableRaster,java.awt.image.RasterOp");
c$.filterImage = Clazz.defineMethod (c$, "filterImage", 
function (src, dst, op) {
return swingjs.JSToolkit.getCompositor ().filterImage (src, dst, op);
}, "java.awt.image.BufferedImage,java.awt.image.BufferedImage,java.awt.image.BufferedImageOp");
c$.getZIndex = Clazz.defineMethod (c$, "getZIndex", 
function (ui, what) {
{
if (what) return getHTML5Applet(ui.c)._z[what];
var c = ui.domNode; var z;
while (c && !(z = c.style["z-index"])) {
c = c.parentNode;
}
return z || 100000;
}}, "swingjs.plaf.JSComponentUI,~S");
Clazz.overrideMethod (c$, "createFrame", 
function (target) {
return this.createWindowPeer (target, true);
}, "java.awt.Frame");
Clazz.overrideMethod (c$, "createWindow", 
function (target) {
return this.createWindowPeer (target, false);
}, "java.awt.Window");
Clazz.defineMethod (c$, "createWindowPeer", 
 function (target, isFrame) {
return (swingjs.JSToolkit.getInstance ("swingjs.plaf.JSWindowUI")).setFrame (target, true);
}, "java.awt.Window,~B");
Clazz.overrideMethod (c$, "createDialog", 
function (target) {
return (swingjs.JSToolkit.getInstance ("swingjs.plaf.JSDialogUI")).setFrame (target, true);
}, "java.awt.Dialog");
c$.$JSToolkit$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (swingjs, "JSToolkit$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.ui.requestFocus (null, false, false, 0, null);
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"gc", null,
"defaultContext", null,
"mapNotImpl", null,
"uid", null,
"dispatchID", 0,
"compositor", null);
});
