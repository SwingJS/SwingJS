Clazz.declarePackage ("javajs.util");
Clazz.load (null, "javajs.util.XmlUtil", ["javajs.util.PT"], function () {
c$ = Clazz.declareType (javajs.util, "XmlUtil");
Clazz.makeConstructor (c$, 
function () {
});
c$.openDocument = Clazz.defineMethod (c$, "openDocument", 
function (data) {
data.append ("<?xml version=\"1.0\"?>\n");
}, "javajs.util.SB");
c$.openTag = Clazz.defineMethod (c$, "openTag", 
function (sb, name) {
sb.append ("<").append (name).append (">\n");
}, "javajs.util.SB,~S");
c$.openTagAttr = Clazz.defineMethod (c$, "openTagAttr", 
function (sb, name, attributes) {
javajs.util.XmlUtil.appendTagAll (sb, name, attributes, null, false, false);
sb.append ("\n");
}, "javajs.util.SB,~S,~A");
c$.closeTag = Clazz.defineMethod (c$, "closeTag", 
function (sb, name) {
sb.append ("</").append (name).append (">\n");
}, "javajs.util.SB,~S");
c$.appendTagAll = Clazz.defineMethod (c$, "appendTagAll", 
function (sb, name, attributes, data, isCdata, doClose) {
var closer = ">";
if (name.endsWith ("/")) {
name = name.substring (0, name.length - 1);
if (data == null) {
closer = "/>\n";
doClose = false;
}}sb.append ("<").append (name);
if (attributes != null) for (var i = 0; i < attributes.length; i++) {
var o = attributes[i];
if (o == null) continue;
if (Clazz.instanceOf (o, Array)) for (var j = 0; j < (o).length; j += 2) javajs.util.XmlUtil.appendAttrib (sb, (o)[j], (o)[j + 1]);

 else javajs.util.XmlUtil.appendAttrib (sb, o, attributes[++i]);
}
sb.append (closer);
if (data != null) {
if (isCdata) data = javajs.util.XmlUtil.wrapCdata (data);
sb.appendO (data);
}if (doClose) javajs.util.XmlUtil.closeTag (sb, name);
}, "javajs.util.SB,~S,~A,~O,~B,~B");
c$.wrapCdata = Clazz.defineMethod (c$, "wrapCdata", 
function (data) {
var s = "" + data;
return (s.indexOf ("&") < 0 && s.indexOf ("<") < 0 ? (s.startsWith ("\n") ? "" : "\n") + s : "<![CDATA[" + javajs.util.PT.rep (s, "]]>", "]]]]><![CDATA[>") + "]]>");
}, "~O");
c$.unwrapCdata = Clazz.defineMethod (c$, "unwrapCdata", 
function (s) {
return (s.startsWith ("<![CDATA[") && s.endsWith ("]]>") ? javajs.util.PT.rep (s.substring (9, s.length - 3), "]]]]><![CDATA[>", "]]>") : s);
}, "~S");
c$.appendTagObj = Clazz.defineMethod (c$, "appendTagObj", 
function (sb, name, attributes, data) {
javajs.util.XmlUtil.appendTagAll (sb, name, attributes, data, false, true);
}, "javajs.util.SB,~S,~A,~O");
c$.appendTag = Clazz.defineMethod (c$, "appendTag", 
function (sb, name, data) {
if (Clazz.instanceOf (data, Array)) javajs.util.XmlUtil.appendTagAll (sb, name, data, null, false, true);
 else javajs.util.XmlUtil.appendTagAll (sb, name, null, data, false, true);
}, "javajs.util.SB,~S,~O");
c$.appendCdata = Clazz.defineMethod (c$, "appendCdata", 
function (sb, name, attributes, data) {
javajs.util.XmlUtil.appendTagAll (sb, name, attributes, data, true, true);
}, "javajs.util.SB,~S,~A,~S");
c$.appendAttrib = Clazz.defineMethod (c$, "appendAttrib", 
function (sb, name, value) {
if (value == null) return;
sb.append (" ").appendO (name).append ("=\"").appendO (value).append ("\"");
}, "javajs.util.SB,~O,~O");
});
