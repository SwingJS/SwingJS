Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["java.io.FilterInputStream", "java.lang.Thread", "jsjavax.swing.text.CompositeView", "$.DefaultEditorKit", "$.JTextComponent", "$.ParagraphView", "$.ViewFactory", "java.lang.Error", "java.util.HashMap", "jsjavax.swing.JTextArea"], "jsjavax.swing.JEditorPane", ["java.io.BufferedInputStream", "$.DataOutputStream", "$.IOException", "$.InputStreamReader", "$.StringReader", "java.lang.Boolean", "$.RuntimeException", "java.net.HttpURLConnection", "$.URL", "java.util.Hashtable", "jsjava.awt.Dimension", "$.Rectangle", "jsjavax.swing.JViewport", "$.SwingUtilities", "$.UIManager", "jsjavax.swing.event.HyperlinkListener", "jsjavax.swing.text.AbstractDocument", "$.BoxView", "$.StyledEditorKit", "$.WrappedPlainView"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("jsjavax.swing.JEditorPane.PageLoader")) {
jsjavax.swing.JEditorPane.$JEditorPane$PageLoader$ ();
}
this.loading = null;
this.kit = null;
this.isUserSetEditorKit = false;
this.pageProperties = null;
this.typeHandlers = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JEditorPane", jsjavax.swing.text.JTextComponent);
Clazz.makeConstructor (c$, 
function (initialPage) {
this.construct ();
this.setPage (initialPage);
}, "java.net.URL");
Clazz.makeConstructor (c$, 
function (url) {
this.construct ();
this.setPage (url);
}, "~S");
Clazz.makeConstructor (c$, 
function (type, text) {
this.construct ();
this.setContentType (type);
this.setText (text);
}, "~S,~S");
Clazz.defineMethod (c$, "addHyperlinkListener", 
function (listener) {
this.listenerList.add (jsjavax.swing.event.HyperlinkListener, listener);
}, "jsjavax.swing.event.HyperlinkListener");
Clazz.defineMethod (c$, "removeHyperlinkListener", 
function (listener) {
this.listenerList.remove (jsjavax.swing.event.HyperlinkListener, listener);
}, "jsjavax.swing.event.HyperlinkListener");
Clazz.defineMethod (c$, "getHyperlinkListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.HyperlinkListener);
});
Clazz.defineMethod (c$, "fireHyperlinkUpdate", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.HyperlinkListener) {
(listeners[i + 1]).hyperlinkUpdate (e);
}}
}, "jsjavax.swing.event.HyperlinkEvent");
Clazz.defineMethod (c$, "setPage", 
function (page) {
if (page == null) {
throw  new java.io.IOException ("invalid url");
}var loaded = this.getPage ();
if (!page.equals (loaded) && page.getRef () == null) {
this.scrollRectToVisible ( new jsjava.awt.Rectangle (0, 0, 1, 1));
}var reloaded = false;
var postData = this.getPostData ();
if ((loaded == null) || !loaded.sameFile (page) || (postData != null)) {
var p = this.getAsynchronousLoadPriority (this.getDocument ());
if ((postData == null) || (p < 0)) {
var $in = this.getStream (page);
if (this.kit != null) {
var doc = this.initializeModel (this.kit, page);
{
if (this.loading != null) {
this.loading.cancel ();
this.loading = null;
}}p = this.getAsynchronousLoadPriority (doc);
if (p >= 0) {
this.setDocument (doc);
{
this.loading =  new jsjavax.swing.JEditorPane.PageStream ($in);
var pl = Clazz.innerTypeInstance (jsjavax.swing.JEditorPane.PageLoader, this, null, doc, this.loading, p, loaded, page);
pl.start ();
}return;
}this.read ($in, doc);
this.setDocument (doc);
reloaded = true;
}} else {
var pl = Clazz.innerTypeInstance (jsjavax.swing.JEditorPane.PageLoader, this, null, null, null, p, loaded, page);
pl.start ();
return;
}}var reference = page.getRef ();
if (reference != null) {
if (!reloaded) {
this.scrollToReference (reference);
} else {
jsjavax.swing.SwingUtilities.invokeLater (((Clazz.isClassDefined ("jsjavax.swing.JEditorPane$1") ? 0 : jsjavax.swing.JEditorPane.$JEditorPane$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.JEditorPane$1, this, Clazz.cloneFinals ("reference", reference))));
}this.getDocument ().putProperty ("stream", page);
}this.firePropertyChange ("page", loaded, page);
}, "java.net.URL");
Clazz.defineMethod (c$, "initializeModel", 
($fz = function (kit, page) {
var doc = kit.createDefaultDocument ();
if (this.pageProperties != null) {
for (var e = this.pageProperties.keys (); e.hasMoreElements (); ) {
var key = e.nextElement ();
doc.putProperty (key, this.pageProperties.get (key));
}
this.pageProperties.clear ();
}if (doc.getProperty ("stream") == null) {
doc.putProperty ("stream", page);
}return doc;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.text.EditorKit,java.net.URL");
Clazz.defineMethod (c$, "getAsynchronousLoadPriority", 
($fz = function (doc) {
return (Clazz.instanceOf (doc, jsjavax.swing.text.AbstractDocument) ? (doc).getAsynchronousLoadPriority () : -1);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.text.Document");
Clazz.defineMethod (c$, "read", 
function ($in, desc) {
var charset = this.getClientProperty ("charset");
var r = (charset != null) ?  new java.io.InputStreamReader ($in, charset) :  new java.io.InputStreamReader ($in);
Clazz.superCall (this, jsjavax.swing.JEditorPane, "read", [r, desc]);
}, "java.io.InputStream,~O");
Clazz.defineMethod (c$, "read", 
function ($in, doc) {
if (!Boolean.TRUE.equals (doc.getProperty ("IgnoreCharsetDirective"))) {
var READ_LIMIT = 10240;
$in =  new java.io.BufferedInputStream ($in, 10240);
$in.mark (10240);
}try {
var charset = this.getClientProperty ("charset");
var r = (charset != null) ?  new java.io.InputStreamReader ($in, charset) :  new java.io.InputStreamReader ($in);
this.kit.read (r, doc, 0);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, jsjavax.swing.text.BadLocationException)) {
var e = e$$;
{
throw  new java.io.IOException (e.getMessage ());
}
} else if (Clazz.exceptionOf (e$$, jsjavax.swing.text.ChangedCharSetException)) {
var changedCharSetException = e$$;
{
var charSetSpec = changedCharSetException.getCharSetSpec ();
if (changedCharSetException.keyEqualsCharSet ()) {
this.putClientProperty ("charset", charSetSpec);
} else {
this.setCharsetFromContentTypeParameters (charSetSpec);
}try {
$in.reset ();
} catch (exception) {
if (Clazz.exceptionOf (exception, java.io.IOException)) {
$in.close ();
var url = doc.getProperty ("stream");
if (url != null) {
var conn = url.openConnection ();
$in = conn.getInputStream ();
} else {
throw changedCharSetException;
}} else {
throw exception;
}
}
try {
doc.remove (0, doc.getLength ());
} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
} else {
throw e;
}
}
doc.putProperty ("IgnoreCharsetDirective", Boolean.$valueOf (true));
this.read ($in, doc);
}
} else {
throw e$$;
}
}
}, "java.io.InputStream,jsjavax.swing.text.Document");
Clazz.defineMethod (c$, "getStream", 
function (page) {
var conn = page.openConnection ();
if (Clazz.instanceOf (conn, java.net.HttpURLConnection)) {
var hconn = conn;
hconn.setInstanceFollowRedirects (false);
var postData = this.getPostData ();
if (postData != null) {
this.handlePostData (hconn, postData);
}var response = hconn.getResponseCode ();
var redirect = (response >= 300 && response <= 399);
if (redirect) {
var loc = conn.getHeaderField ("Location");
if (loc.startsWith ("http", 0)) {
page =  new java.net.URL (loc);
} else {
page =  new java.net.URL (page, loc);
}return this.getStream (page);
}}if (jsjavax.swing.SwingUtilities.isEventDispatchThread ()) {
this.handleConnectionProperties (conn);
} else {
try {
jsjavax.swing.SwingUtilities.invokeAndWait (((Clazz.isClassDefined ("jsjavax.swing.JEditorPane$2") ? 0 : jsjavax.swing.JEditorPane.$JEditorPane$2$ ()), Clazz.innerTypeInstance (jsjavax.swing.JEditorPane$2, this, Clazz.cloneFinals ("conn", conn))));
} catch (e$$) {
if (Clazz.exceptionOf (e$$, InterruptedException)) {
var e = e$$;
{
throw  new RuntimeException (e);
}
} else if (Clazz.exceptionOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
throw  new RuntimeException (e);
}
} else {
throw e$$;
}
}
}return conn.getInputStream ();
}, "java.net.URL");
Clazz.defineMethod (c$, "handleConnectionProperties", 
($fz = function (conn) {
if (this.pageProperties == null) {
this.pageProperties =  new java.util.Hashtable ();
}var type = conn.getContentType ();
if (type != null) {
this.setContentType (type);
this.pageProperties.put ("content-type", type);
}this.pageProperties.put ("stream", conn.getURL ());
var enc = conn.getContentEncoding ();
if (enc != null) {
this.pageProperties.put ("content-encoding", enc);
}}, $fz.isPrivate = true, $fz), "java.net.URLConnection");
Clazz.defineMethod (c$, "getPostData", 
($fz = function () {
return this.getDocument ().getProperty ("jsjavax.swing.JEditorPane.postdata");
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "handlePostData", 
($fz = function (conn, postData) {
conn.setDoOutput (true);
var os = null;
try {
conn.setRequestProperty ("Content-Type", "application/x-www-form-urlencoded");
os =  new java.io.DataOutputStream (conn.getOutputStream ());
os.writeBytes (postData);
} finally {
if (os != null) {
os.close ();
}}
}, $fz.isPrivate = true, $fz), "java.net.HttpURLConnection,~O");
Clazz.defineMethod (c$, "scrollToReference", 
function (reference) {
}, "~S");
Clazz.defineMethod (c$, "getPage", 
function () {
return this.getDocument ().getProperty ("stream");
});
Clazz.defineMethod (c$, "setPage", 
function (url) {
if (url == null) {
throw  new java.io.IOException ("invalid url");
}var page =  new java.net.URL (url);
this.setPage (page);
}, "~S");
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "EditorPaneUI";
});
Clazz.defineMethod (c$, "createDefaultEditorKit", 
function () {
return  new jsjavax.swing.JEditorPane.PlainEditorKit ();
});
Clazz.defineMethod (c$, "getEditorKit", 
function () {
if (this.kit == null) {
this.kit = this.createDefaultEditorKit ();
this.isUserSetEditorKit = false;
}return this.kit;
});
Clazz.defineMethod (c$, "getContentType", 
function () {
return (this.kit != null) ? this.kit.getContentType () : null;
});
Clazz.defineMethod (c$, "setContentType", 
function (type) {
var parm = type.indexOf (";");
if (parm > -1) {
var paramList = type.substring (parm);
type = type.substring (0, parm).trim ();
if (type.toLowerCase ().startsWith ("text/")) {
this.setCharsetFromContentTypeParameters (paramList);
}}if ((this.kit == null) || (!type.equals (this.kit.getContentType ())) || !this.isUserSetEditorKit) {
var k = this.getEditorKitForContentType (type);
if (k != null && k !== this.kit) {
this.setEditorKit (k);
this.isUserSetEditorKit = false;
}}}, "~S");
Clazz.defineMethod (c$, "setCharsetFromContentTypeParameters", 
($fz = function (paramlist) {
var charset = null;
try {
var semi = paramlist.indexOf (';');
if (semi > -1 && semi < paramlist.length - 1) {
paramlist = paramlist.substring (semi + 1);
}if (paramlist.length > 0) {
var hdrParser =  new jsjavax.swing.JEditorPane.HeaderParser (paramlist);
charset = hdrParser.findValue ("charset");
if (charset != null) {
this.putClientProperty ("charset", charset);
}}} catch (e$$) {
if (Clazz.exceptionOf (e$$, IndexOutOfBoundsException)) {
var e = e$$;
{
}
} else if (Clazz.exceptionOf (e$$, NullPointerException)) {
var e = e$$;
{
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
System.err.println ("JEditorPane.getCharsetFromContentTypeParameters failed on: " + paramlist);
e.printStackTrace ();
}
} else {
throw e$$;
}
}
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "setEditorKit", 
function (kit) {
var old = this.kit;
this.isUserSetEditorKit = true;
if (old != null) {
old.deinstall (this);
}this.kit = kit;
if (this.kit != null) {
this.kit.install (this);
this.setDocument (this.kit.createDefaultDocument ());
}this.firePropertyChange ("editorKit", old, kit);
}, "jsjavax.swing.text.EditorKit");
Clazz.defineMethod (c$, "getEditorKitForContentType", 
function (type) {
if (this.typeHandlers == null) {
this.typeHandlers =  new java.util.Hashtable (3);
}var k = this.typeHandlers.get (type);
if (k == null) {
k = jsjavax.swing.JEditorPane.createEditorKitForContentType (type);
if (k != null) {
this.setEditorKitForContentType (type, k);
}}if (k == null) {
k = this.createDefaultEditorKit ();
}return k;
}, "~S");
Clazz.defineMethod (c$, "setEditorKitForContentType", 
function (type, k) {
if (this.typeHandlers == null) {
this.typeHandlers =  new java.util.Hashtable (3);
}this.typeHandlers.put (type, k);
}, "~S,jsjavax.swing.text.EditorKit");
Clazz.defineMethod (c$, "replaceSelection", 
function (content) {
if (!this.isEditable ()) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this);
return;
}var kit = this.getEditorKit ();
if (Clazz.instanceOf (kit, jsjavax.swing.text.StyledEditorKit)) {
try {
var doc = this.getDocument ();
var caret = this.getCaret ();
var p0 = Math.min (caret.getDot (), caret.getMark ());
var p1 = Math.max (caret.getDot (), caret.getMark ());
if (Clazz.instanceOf (doc, jsjavax.swing.text.AbstractDocument)) {
(doc).replace (p0, p1 - p0, content, (kit).getInputAttributes ());
} else {
if (p0 != p1) {
doc.remove (p0, p1 - p0);
}if (content != null && content.length > 0) {
doc.insertString (p0, content, (kit).getInputAttributes ());
}}} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this);
} else {
throw e;
}
}
} else {
Clazz.superCall (this, jsjavax.swing.JEditorPane, "replaceSelection", [content]);
}}, "~S");
c$.createEditorKitForContentType = Clazz.defineMethod (c$, "createEditorKitForContentType", 
function (type) {
var k = null;
var kitRegistry = jsjavax.swing.JEditorPane.getKitRegisty ();
k = kitRegistry.get (type);
if (k == null) {
var classname = jsjavax.swing.JEditorPane.getKitTypeRegistry ().get (type);
var loader = jsjavax.swing.JEditorPane.getKitLoaderRegistry ().get (type);
try {
var c;
if (loader != null) {
c = loader.loadClass (classname);
} else {
c = Class.forName (classname, true, Thread.currentThread ().getContextClassLoader ());
}k = c.newInstance ();
kitRegistry.put (type, k);
} catch (e) {
k = null;
}
}if (k != null) {
return k.clone ();
}return null;
}, "~S");
c$.registerEditorKitForContentType = Clazz.defineMethod (c$, "registerEditorKitForContentType", 
function (type, classname) {
jsjavax.swing.JEditorPane.registerEditorKitForContentType (type, classname, Thread.currentThread ().getContextClassLoader ());
}, "~S,~S");
c$.registerEditorKitForContentType = Clazz.defineMethod (c$, "registerEditorKitForContentType", 
function (type, classname, loader) {
jsjavax.swing.JEditorPane.getKitTypeRegistry ().put (type, classname);
jsjavax.swing.JEditorPane.getKitLoaderRegistry ().put (type, loader);
jsjavax.swing.JEditorPane.getKitRegisty ().remove (type);
}, "~S,~S,ClassLoader");
c$.getEditorKitClassNameForContentType = Clazz.defineMethod (c$, "getEditorKitClassNameForContentType", 
function (type) {
return jsjavax.swing.JEditorPane.getKitTypeRegistry ().get (type);
}, "~S");
c$.getKitTypeRegistry = Clazz.defineMethod (c$, "getKitTypeRegistry", 
($fz = function () {
jsjavax.swing.JEditorPane.loadDefaultKitsIfNecessary ();
return jsjavax.swing.SwingUtilities.appContextGet (jsjavax.swing.JEditorPane.kitTypeRegistryKey);
}, $fz.isPrivate = true, $fz));
c$.getKitLoaderRegistry = Clazz.defineMethod (c$, "getKitLoaderRegistry", 
($fz = function () {
jsjavax.swing.JEditorPane.loadDefaultKitsIfNecessary ();
return jsjavax.swing.SwingUtilities.appContextGet (jsjavax.swing.JEditorPane.kitLoaderRegistryKey);
}, $fz.isPrivate = true, $fz));
c$.getKitRegisty = Clazz.defineMethod (c$, "getKitRegisty", 
($fz = function () {
var ht = jsjavax.swing.SwingUtilities.appContextGet (jsjavax.swing.JEditorPane.kitRegistryKey);
if (ht == null) {
ht =  new java.util.Hashtable (3);
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.JEditorPane.kitRegistryKey, ht);
}return ht;
}, $fz.isPrivate = true, $fz));
c$.loadDefaultKitsIfNecessary = Clazz.defineMethod (c$, "loadDefaultKitsIfNecessary", 
($fz = function () {
if (jsjavax.swing.SwingUtilities.appContextGet (jsjavax.swing.JEditorPane.kitTypeRegistryKey) == null) {
{
if (jsjavax.swing.JEditorPane.defaultEditorKitMap.size () == 0) {
jsjavax.swing.JEditorPane.defaultEditorKitMap.put ("text/plain", "jsjavax.swing.JEditorPane$PlainEditorKit");
jsjavax.swing.JEditorPane.defaultEditorKitMap.put ("text/html", "jsjavax.swing.text.html.HTMLEditorKit");
jsjavax.swing.JEditorPane.defaultEditorKitMap.put ("text/rtf", "jsjavax.swing.text.rtf.RTFEditorKit");
jsjavax.swing.JEditorPane.defaultEditorKitMap.put ("application/rtf", "jsjavax.swing.text.rtf.RTFEditorKit");
}}var ht =  new java.util.Hashtable ();
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.JEditorPane.kitTypeRegistryKey, ht);
ht =  new java.util.Hashtable ();
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.JEditorPane.kitLoaderRegistryKey, ht);
for (var key, $key = jsjavax.swing.JEditorPane.defaultEditorKitMap.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
jsjavax.swing.JEditorPane.registerEditorKitForContentType (key, jsjavax.swing.JEditorPane.defaultEditorKitMap.get (key));
}
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getPreferredSize", 
function () {
var d = Clazz.superCall (this, jsjavax.swing.JEditorPane, "getPreferredSize", []);
if (Clazz.instanceOf (this.getParent (), jsjavax.swing.JViewport)) {
var port = this.getParent ();
var ui = this.getUI ();
var prefWidth = d.width;
var prefHeight = d.height;
if (!this.getScrollableTracksViewportWidth ()) {
var w = port.getWidth ();
var min = ui.getMinimumSize (this);
if (w != 0 && w < min.width) {
prefWidth = min.width;
}}if (!this.getScrollableTracksViewportHeight ()) {
var h = port.getHeight ();
var min = ui.getMinimumSize (this);
if (h != 0 && h < min.height) {
prefHeight = min.height;
}}if (prefWidth != d.width || prefHeight != d.height) {
d =  new jsjava.awt.Dimension (prefWidth, prefHeight);
}}return d;
});
Clazz.overrideMethod (c$, "setText", 
function (t) {
try {
var doc = this.getDocument ();
doc.remove (0, doc.getLength ());
if (t == null || t.equals ("")) {
return;
}var r =  new java.io.StringReader (t);
var kit = this.getEditorKit ();
kit.read (r, doc, 0);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var ioe = e$$;
{
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this);
}
} else if (Clazz.exceptionOf (e$$, jsjavax.swing.text.BadLocationException)) {
var ble = e$$;
{
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this);
}
} else {
throw e$$;
}
}
}, "~S");
Clazz.defineMethod (c$, "getText", 
function () {
var doc = this.getDocument ();
try {
return doc.getText (0, doc.getLength ());
} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "getScrollableTracksViewportWidth", 
function () {
if (Clazz.instanceOf (this.getParent (), jsjavax.swing.JViewport)) {
var port = this.getParent ();
var ui = this.getUI ();
var w = port.getWidth ();
var min = ui.getMinimumSize (this);
var max = ui.getMaximumSize (this);
if ((w >= min.width) && (w <= max.width)) {
return true;
}}return false;
});
Clazz.overrideMethod (c$, "getScrollableTracksViewportHeight", 
function () {
if (Clazz.instanceOf (this.getParent (), jsjavax.swing.JViewport)) {
var port = this.getParent ();
var ui = this.getUI ();
var h = port.getHeight ();
var min = ui.getMinimumSize (this);
if (h >= min.height) {
var max = ui.getMaximumSize (this);
if (h <= max.height) {
return true;
}}}return false;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var kitString = (this.kit != null ? this.kit.toString () : "");
var typeHandlersString = (this.typeHandlers != null ? this.typeHandlers.toString () : "");
return Clazz.superCall (this, jsjavax.swing.JEditorPane, "paramString", []) + ",kit=" + kitString + ",typeHandlers=" + typeHandlersString;
});
c$.$JEditorPane$PageLoader$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.pageLoaded = false;
this.$in = null;
this.old = null;
this.page = null;
this.doc = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JEditorPane, "PageLoader", Thread);
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
Clazz.superConstructor (this, jsjavax.swing.JEditorPane.PageLoader, []);
this.setPriority (c);
this.$in = b;
this.old = d;
this.page = e;
this.doc = a;
}, "jsjavax.swing.text.Document,java.io.InputStream,~N,java.net.URL,java.net.URL");
Clazz.overrideMethod (c$, "run", 
function () {
try {
if (this.$in == null) {
this.$in = this.b$["jsjavax.swing.JEditorPane"].getStream (this.page);
if (this.b$["jsjavax.swing.JEditorPane"].kit == null) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this.b$["jsjavax.swing.JEditorPane"]);
return;
}{
this.$in = this.b$["jsjavax.swing.JEditorPane"].loading =  new jsjavax.swing.JEditorPane.PageStream (this.$in);
}}if (this.doc == null) {
try {
jsjavax.swing.SwingUtilities.invokeAndWait (((Clazz.isClassDefined ("jsjavax.swing.JEditorPane$PageLoader$2") ? 0 : jsjavax.swing.JEditorPane.PageLoader.$JEditorPane$PageLoader$2$ ()), Clazz.innerTypeInstance (jsjavax.swing.JEditorPane$PageLoader$2, this, null)));
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.lang.reflect.InvocationTargetException)) {
var ex = e$$;
{
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this.b$["jsjavax.swing.JEditorPane"]);
return;
}
} else if (Clazz.exceptionOf (e$$, InterruptedException)) {
var ex = e$$;
{
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this.b$["jsjavax.swing.JEditorPane"]);
return;
}
} else {
throw e$$;
}
}
}this.b$["jsjavax.swing.JEditorPane"].read (this.$in, this.doc);
var a = this.doc.getProperty ("stream");
var b = a.getRef ();
if (b != null) {
var c = ((Clazz.isClassDefined ("jsjavax.swing.JEditorPane$PageLoader$3") ? 0 : jsjavax.swing.JEditorPane.PageLoader.$JEditorPane$PageLoader$3$ ()), Clazz.innerTypeInstance (jsjavax.swing.JEditorPane$PageLoader$3, this, null));
jsjavax.swing.SwingUtilities.invokeLater (c);
}this.pageLoaded = true;
} catch (ioe) {
if (Clazz.exceptionOf (ioe, java.io.IOException)) {
jsjavax.swing.UIManager.getLookAndFeel ().provideErrorFeedback (this.b$["jsjavax.swing.JEditorPane"]);
} else {
throw ioe;
}
} finally {
{
this.b$["jsjavax.swing.JEditorPane"].loading = null;
}jsjavax.swing.SwingUtilities.invokeLater (((Clazz.isClassDefined ("jsjavax.swing.JEditorPane$PageLoader$1") ? 0 : jsjavax.swing.JEditorPane.PageLoader.$JEditorPane$PageLoader$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.JEditorPane$PageLoader$1, this, null)));
}
});
c$.$JEditorPane$PageLoader$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JEditorPane$PageLoader$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["jsjavax.swing.JEditorPane.PageLoader"].doc = this.b$["jsjavax.swing.JEditorPane"].initializeModel (this.b$["jsjavax.swing.JEditorPane"].kit, this.b$["jsjavax.swing.JEditorPane.PageLoader"].page);
this.b$["jsjavax.swing.JEditorPane"].setDocument (this.b$["jsjavax.swing.JEditorPane.PageLoader"].doc);
});
c$ = Clazz.p0p ();
};
c$.$JEditorPane$PageLoader$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JEditorPane$PageLoader$3", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
var a = this.b$["jsjavax.swing.JEditorPane"].getDocument ().getProperty ("stream");
var b = a.getRef ();
this.b$["jsjavax.swing.JEditorPane"].scrollToReference (b);
});
c$ = Clazz.p0p ();
};
c$.$JEditorPane$PageLoader$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JEditorPane$PageLoader$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
if (this.b$["jsjavax.swing.JEditorPane.PageLoader"].pageLoaded) {
this.b$["jsjavax.swing.JEditorPane"].firePropertyChange ("page", this.b$["jsjavax.swing.JEditorPane.PageLoader"].old, this.b$["jsjavax.swing.JEditorPane.PageLoader"].page);
}});
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
};
c$.$JEditorPane$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JEditorPane$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["jsjavax.swing.JEditorPane"].scrollToReference (this.f$.reference);
});
c$ = Clazz.p0p ();
};
c$.$JEditorPane$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JEditorPane$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["jsjavax.swing.JEditorPane"].handleConnectionProperties (this.f$.conn);
});
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.canceled = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JEditorPane, "PageStream", java.io.FilterInputStream);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.JEditorPane.PageStream, [a]);
this.canceled = false;
}, "java.io.InputStream");
Clazz.defineMethod (c$, "cancel", 
function () {
this.canceled = true;
});
Clazz.defineMethod (c$, "checkCanceled", 
function () {
if (this.canceled) {
throw  new java.io.IOException ("page canceled");
}});
Clazz.defineMethod (c$, "read", 
function () {
this.checkCanceled ();
return Clazz.superCall (this, jsjavax.swing.JEditorPane.PageStream, "read", []);
});
Clazz.defineMethod (c$, "skip", 
function (a) {
this.checkCanceled ();
return Clazz.superCall (this, jsjavax.swing.JEditorPane.PageStream, "skip", [a]);
}, "~N");
Clazz.defineMethod (c$, "available", 
function () {
this.checkCanceled ();
return Clazz.superCall (this, jsjavax.swing.JEditorPane.PageStream, "available", []);
});
Clazz.defineMethod (c$, "reset", 
function () {
this.checkCanceled ();
Clazz.superCall (this, jsjavax.swing.JEditorPane.PageStream, "reset", []);
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JEditorPane, "PlainEditorKit", jsjavax.swing.text.DefaultEditorKit, jsjavax.swing.text.ViewFactory);
Clazz.overrideMethod (c$, "getViewFactory", 
function () {
return this;
});
Clazz.overrideMethod (c$, "create", 
function (a) {
var b = a.getDocument ();
var c = b.getProperty ("i18n");
if ((c != null) && c.equals (Boolean.TRUE)) {
return this.createI18N (a);
} else {
return  new jsjavax.swing.text.WrappedPlainView (a);
}}, "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "createI18N", 
function (a) {
var b = a.getName ();
if (b != null) {
if (b.equals ("content")) {
return  new jsjavax.swing.JEditorPane.PlainEditorKit.PlainParagraph (a);
} else if (b.equals ("paragraph")) {
return  new jsjavax.swing.text.BoxView (a, 1);
}}return null;
}, "jsjavax.swing.text.Element");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JEditorPane.PlainEditorKit, "PlainParagraph", jsjavax.swing.text.ParagraphView);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.JEditorPane.PlainEditorKit.PlainParagraph, [a]);
this.layoutPool =  new jsjavax.swing.JEditorPane.PlainEditorKit.PlainParagraph.LogicalView (a);
this.layoutPool.setParent (this);
}, "jsjavax.swing.text.Element");
Clazz.overrideMethod (c$, "setPropertiesFromAttributes", 
function () {
var a = this.getContainer ();
if ((a != null) && (!a.getComponentOrientation ().isLeftToRight ())) {
this.setJustification (2);
} else {
this.setJustification (0);
}});
Clazz.defineMethod (c$, "getFlowSpan", 
function (a) {
var b = this.getContainer ();
if (Clazz.instanceOf (b, jsjavax.swing.JTextArea)) {
var c = b;
if (!c.getLineWrap ()) {
return 2147483647;
}}return Clazz.superCall (this, jsjavax.swing.JEditorPane.PlainEditorKit.PlainParagraph, "getFlowSpan", [a]);
}, "~N");
Clazz.defineMethod (c$, "calculateMinorAxisRequirements", 
function (a, b) {
var c = Clazz.superCall (this, jsjavax.swing.JEditorPane.PlainEditorKit.PlainParagraph, "calculateMinorAxisRequirements", [a, b]);
var d = this.getContainer ();
if (Clazz.instanceOf (d, jsjavax.swing.JTextArea)) {
var e = d;
if (!e.getLineWrap ()) {
c.minimum = c.preferred;
}}return c;
}, "~N,jsjavax.swing.SizeRequirements");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JEditorPane.PlainEditorKit.PlainParagraph, "LogicalView", jsjavax.swing.text.CompositeView);
Clazz.overrideMethod (c$, "getViewIndexAtPosition", 
function (a) {
var b = this.getElement ();
if (b.getElementCount () > 0) {
return b.getElementIndex (a);
}return 0;
}, "~N");
Clazz.overrideMethod (c$, "updateChildren", 
function (a, b, c) {
return false;
}, "jsjavax.swing.event.DocumentEvent.ElementChange,jsjavax.swing.event.DocumentEvent,jsjavax.swing.text.ViewFactory");
Clazz.overrideMethod (c$, "loadChildren", 
function (a) {
}, "jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "getPreferredSpan", 
function (a) {
if (this.getViewCount () != 1) throw  new Error ("One child view is assumed.");
var b = this.getView (0);
return b.getPreferredSpan (a);
}, "~N");
Clazz.defineMethod (c$, "forwardUpdateToView", 
function (a, b, c, d) {
a.setParent (this);
Clazz.superCall (this, jsjavax.swing.JEditorPane.PlainEditorKit.PlainParagraph.LogicalView, "forwardUpdateToView", [a, b, c, d]);
}, "jsjavax.swing.text.View,jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape,jsjavax.swing.text.ViewFactory");
Clazz.overrideMethod (c$, "paint", 
function (a, b) {
}, "jsjava.awt.Graphics,jsjava.awt.Shape");
Clazz.overrideMethod (c$, "isBefore", 
function (a, b, c) {
return false;
}, "~N,~N,jsjava.awt.Rectangle");
Clazz.overrideMethod (c$, "isAfter", 
function (a, b, c) {
return false;
}, "~N,~N,jsjava.awt.Rectangle");
Clazz.overrideMethod (c$, "getViewAtPoint", 
function (a, b, c) {
return null;
}, "~N,~N,jsjava.awt.Rectangle");
Clazz.overrideMethod (c$, "childAllocation", 
function (a, b) {
}, "~N,jsjava.awt.Rectangle");
c$ = Clazz.p0p ();
c$ = Clazz.p0p ();
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.raw = null;
this.tab = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JEditorPane, "HeaderParser");
Clazz.makeConstructor (c$, 
function (a) {
this.raw = a;
this.tab =  Clazz.newArray (10, 2, null);
this.parse ();
}, "~S");
Clazz.defineMethod (c$, "parse", 
($fz = function () {
if (this.raw != null) {
this.raw = this.raw.trim ();
var a = this.raw.toCharArray ();
var b = 0;
var c = 0;
var d = 0;
var e = true;
var f = false;
var g = a.length;
while (c < g) {
var h = a[c];
if (h == '=') {
this.tab[d][0] =  String.instantialize (a, b, c - b).toLowerCase ();
e = false;
c++;
b = c;
} else if (h == '\"') {
if (f) {
this.tab[d++][1] =  String.instantialize (a, b, c - b);
f = false;
do {
c++;
} while (c < g && (a[c] == ' ' || a[c] == ','));
e = true;
b = c;
} else {
f = true;
c++;
b = c;
}} else if (h == ' ' || h == ',') {
if (f) {
c++;
continue;
} else if (e) {
this.tab[d++][0] = ( String.instantialize (a, b, c - b)).toLowerCase ();
} else {
this.tab[d++][1] = ( String.instantialize (a, b, c - b));
}while (c < g && (a[c] == ' ' || a[c] == ',')) {
c++;
}
e = true;
b = c;
} else {
c++;
}}
if (--c > b) {
if (!e) {
if (a[c] == '\"') {
this.tab[d++][1] = ( String.instantialize (a, b, c - b));
} else {
this.tab[d++][1] = ( String.instantialize (a, b, c - b + 1));
}} else {
this.tab[d][0] = ( String.instantialize (a, b, c - b + 1)).toLowerCase ();
}} else if (c == b) {
if (!e) {
if (a[c] == '\"') {
this.tab[d++][1] = String.valueOf (a[c - 1]);
} else {
this.tab[d++][1] = String.valueOf (a[c]);
}} else {
this.tab[d][0] = String.valueOf (a[c]).toLowerCase ();
}}}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "findKey", 
function (a) {
if (a < 0 || a > 10) return null;
return this.tab[a][0];
}, "~N");
Clazz.defineMethod (c$, "findValue", 
function (a) {
if (a < 0 || a > 10) return null;
return this.tab[a][1];
}, "~N");
Clazz.defineMethod (c$, "findValue", 
function (a) {
return this.findValue (a, null);
}, "~S");
Clazz.defineMethod (c$, "findValue", 
function (a, b) {
if (a == null) return b;
a = a.toLowerCase ();
for (var c = 0; c < 10; ++c) {
if (this.tab[c][0] == null) {
return b;
} else if (a.equals (this.tab[c][0])) {
return this.tab[c][1];
}}
return b;
}, "~S,~S");
Clazz.defineMethod (c$, "findInt", 
function (a, b) {
try {
return Integer.parseInt (this.findValue (a, String.valueOf (b)));
} catch (t) {
return b;
}
}, "~S,~N");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"PostDataProperty", "jsjavax.swing.JEditorPane.postdata");
c$.kitRegistryKey = c$.prototype.kitRegistryKey =  new JavaObject ();
c$.kitTypeRegistryKey = c$.prototype.kitTypeRegistryKey =  new JavaObject ();
c$.kitLoaderRegistryKey = c$.prototype.kitLoaderRegistryKey =  new JavaObject ();
Clazz.defineStatics (c$,
"$uiClassID", "EditorPaneUI",
"W3C_LENGTH_UNITS", "JEditorPane.w3cLengthUnits",
"HONOR_DISPLAY_PROPERTIES", "JEditorPane.honorDisplayProperties");
c$.defaultEditorKitMap = c$.prototype.defaultEditorKitMap =  new java.util.HashMap (0);
});
