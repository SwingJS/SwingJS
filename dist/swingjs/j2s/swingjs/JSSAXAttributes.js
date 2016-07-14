Clazz.declarePackage ("swingjs");
Clazz.load (["org.xml.sax.AttributeList", "org.xml.sax.ext.Attributes2"], "swingjs.JSSAXAttributes", ["java.util.Hashtable", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nodes = null;
this.nameMap = null;
Clazz.instantialize (this, arguments);
}, swingjs, "JSSAXAttributes", null, [org.xml.sax.ext.Attributes2, org.xml.sax.AttributeList]);
Clazz.defineMethod (c$, "createNameMap", 
 function () {
this.nameMap =  new java.util.Hashtable ();
for (var i = this.nodes.length; --i >= 0; ) {
var ii = Integer.$valueOf (i);
this.nameMap.put (swingjs.JSSAXAttributes.getFullName (this.getURI (i), this.getLocalName (i), null), ii);
this.nameMap.put (this.getQName (i), ii);
}
});
Clazz.makeConstructor (c$, 
function (node) {
this.nodes = swingjs.api.DOMNode.getAttr (node, "attributes");
}, "swingjs.api.DOMNode");
Clazz.overrideMethod (c$, "getLength", 
function () {
return this.nodes.length;
});
Clazz.defineMethod (c$, "getAttr", 
 function (index, key) {
if (index < 0 || index >= this.nodes.length) return null;
var s = swingjs.api.DOMNode.getAttr (this.nodes[index], key);
return (s == null ? "" : s);
}, "~N,~S");
Clazz.overrideMethod (c$, "getURI", 
function (index) {
return this.getAttr (index, "nameSpaceURI");
}, "~N");
Clazz.overrideMethod (c$, "getLocalName", 
function (index) {
return this.getAttr (index, "localName");
}, "~N");
Clazz.overrideMethod (c$, "getQName", 
function (index) {
return this.getAttr (index, "nodeName");
}, "~N");
Clazz.defineMethod (c$, "getType", 
function (index) {
return "CDATA";
}, "~N");
Clazz.defineMethod (c$, "getValue", 
function (index) {
return this.getAttr (index, "value");
}, "~N");
Clazz.defineMethod (c$, "getIndex", 
function (uri, localName) {
return this.getIndex2 (uri, localName);
}, "~S,~S");
Clazz.defineMethod (c$, "getIndex2", 
function (uri, localName) {
if (this.nameMap == null) this.createNameMap ();
var ii = this.nameMap.get (swingjs.JSSAXAttributes.getFullName (uri, localName, null));
return (ii == null ? -1 : ii.intValue ());
}, "~S,~S");
Clazz.defineMethod (c$, "getIndex", 
function (qName) {
return this.getIndex1 (qName);
}, "~S");
Clazz.defineMethod (c$, "getIndex1", 
function (qName) {
if (this.nameMap == null) this.createNameMap ();
var ii = this.nameMap.get (qName);
return (ii == null ? -1 : ii.intValue ());
}, "~S");
Clazz.defineMethod (c$, "getType", 
function (uri, localName) {
var i = this.getIndex2 (uri, localName);
return (i < 0 ? null : this.getType (i));
}, "~S,~S");
Clazz.defineMethod (c$, "getType", 
function (qName) {
var i = this.getIndex (qName);
return (i < 0 ? null : this.getType (i));
}, "~S");
Clazz.defineMethod (c$, "getValue", 
function (uri, localName) {
var i = this.getIndex2 (uri, localName);
return (i < 0 ? null : this.getType (i));
}, "~S,~S");
Clazz.defineMethod (c$, "getValue", 
function (qName) {
var i = this.getIndex (qName);
return (i < 0 ? null : this.getValue (i));
}, "~S");
Clazz.overrideMethod (c$, "getName", 
function (i) {
return this.getAttr (i, "name");
}, "~N");
Clazz.defineMethod (c$, "isDeclared", 
function (index) {
return false;
}, "~N");
Clazz.defineMethod (c$, "isDeclared", 
function (qName) {
return false;
}, "~S");
Clazz.defineMethod (c$, "isDeclared", 
function (uri, localName) {
return false;
}, "~S,~S");
Clazz.defineMethod (c$, "isSpecified", 
function (index) {
return false;
}, "~N");
Clazz.defineMethod (c$, "isSpecified", 
function (uri, localName) {
return false;
}, "~S,~S");
Clazz.defineMethod (c$, "isSpecified", 
function (qName) {
return false;
}, "~S");
c$.getFullName = Clazz.defineMethod (c$, "getFullName", 
function (uri, localName, qName) {
return (uri == null || uri.length == 0 ? "" : uri + "#") + (qName == null || qName.length == 0 || qName.equals (localName) ? localName : qName);
}, "~S,~S,~S");
});
