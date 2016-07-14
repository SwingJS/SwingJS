Clazz.declarePackage ("org.xml.sax.helpers");
Clazz.load (["java.util.Vector"], "org.xml.sax.helpers.NamespaceSupport", ["java.lang.IllegalStateException", "java.util.EmptyStackException", "$.Hashtable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contexts = null;
this.currentContext = null;
this.contextPos = 0;
this.namespaceDeclUris = false;
if (!Clazz.isClassDefined ("org.xml.sax.helpers.NamespaceSupport.Context")) {
org.xml.sax.helpers.NamespaceSupport.$NamespaceSupport$Context$ ();
}
Clazz.instantialize (this, arguments);
}, org.xml.sax.helpers, "NamespaceSupport");
Clazz.makeConstructor (c$, 
function () {
this.reset ();
});
Clazz.defineMethod (c$, "reset", 
function () {
this.contexts =  new Array (32);
this.namespaceDeclUris = false;
this.contextPos = 0;
this.contexts[this.contextPos] = this.currentContext = Clazz.innerTypeInstance (org.xml.sax.helpers.NamespaceSupport.Context, this, null);
this.currentContext.declarePrefix ("xml", "http://www.w3.org/XML/1998/namespace");
});
Clazz.defineMethod (c$, "pushContext", 
function () {
var max = this.contexts.length;
this.contexts[this.contextPos].declsOK = false;
this.contextPos++;
if (this.contextPos >= max) {
var newContexts =  new Array (max * 2);
System.arraycopy (this.contexts, 0, newContexts, 0, max);
max *= 2;
this.contexts = newContexts;
}this.currentContext = this.contexts[this.contextPos];
if (this.currentContext == null) {
this.contexts[this.contextPos] = this.currentContext = Clazz.innerTypeInstance (org.xml.sax.helpers.NamespaceSupport.Context, this, null);
}if (this.contextPos > 0) {
this.currentContext.setParent (this.contexts[this.contextPos - 1]);
}});
Clazz.defineMethod (c$, "popContext", 
function () {
this.contexts[this.contextPos].clear ();
this.contextPos--;
if (this.contextPos < 0) {
throw  new java.util.EmptyStackException ();
}this.currentContext = this.contexts[this.contextPos];
});
Clazz.defineMethod (c$, "declarePrefix", 
function (prefix, uri) {
if (prefix.equals ("xml") || prefix.equals ("xmlns")) {
return false;
} else {
this.currentContext.declarePrefix (prefix, uri);
return true;
}}, "~S,~S");
Clazz.defineMethod (c$, "processName", 
function (qName, parts, isAttribute) {
var myParts = this.currentContext.processName (qName, isAttribute);
if (myParts == null) {
return null;
} else {
parts[0] = myParts[0];
parts[1] = myParts[1];
parts[2] = myParts[2];
return parts;
}}, "~S,~A,~B");
Clazz.defineMethod (c$, "getURI", 
function (prefix) {
return this.currentContext.getURI (prefix);
}, "~S");
Clazz.defineMethod (c$, "getPrefixes", 
function () {
return this.currentContext.getPrefixes ();
});
Clazz.defineMethod (c$, "getPrefix", 
function (uri) {
return this.currentContext.getPrefix (uri);
}, "~S");
Clazz.defineMethod (c$, "getPrefixes", 
function (uri) {
var prefixes =  new java.util.Vector ();
var allPrefixes = this.getPrefixes ();
while (allPrefixes.hasMoreElements ()) {
var prefix = allPrefixes.nextElement ();
if (uri.equals (this.getURI (prefix))) {
prefixes.addElement (prefix);
}}
return prefixes.elements ();
}, "~S");
Clazz.defineMethod (c$, "getDeclaredPrefixes", 
function () {
return this.currentContext.getDeclaredPrefixes ();
});
Clazz.defineMethod (c$, "setNamespaceDeclUris", 
function (value) {
if (this.contextPos != 0) throw  new IllegalStateException ();
if (value == this.namespaceDeclUris) return;
this.namespaceDeclUris = value;
if (value) this.currentContext.declarePrefix ("xmlns", "http://www.w3.org/xmlns/2000/");
 else {
this.contexts[this.contextPos] = this.currentContext = Clazz.innerTypeInstance (org.xml.sax.helpers.NamespaceSupport.Context, this, null);
this.currentContext.declarePrefix ("xml", "http://www.w3.org/XML/1998/namespace");
}}, "~B");
Clazz.defineMethod (c$, "isNamespaceDeclUris", 
function () {
return this.namespaceDeclUris;
});
c$.$NamespaceSupport$Context$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.prefixTable = null;
this.uriTable = null;
this.elementNameTable = null;
this.attributeNameTable = null;
this.defaultNS = null;
this.declsOK = true;
this.declarations = null;
this.declSeen = false;
this.parent = null;
Clazz.instantialize (this, arguments);
}, org.xml.sax.helpers.NamespaceSupport, "Context");
Clazz.makeConstructor (c$, 
function () {
this.copyTables ();
});
Clazz.defineMethod (c$, "setParent", 
function (a) {
this.parent = a;
this.declarations = null;
this.prefixTable = a.prefixTable;
this.uriTable = a.uriTable;
this.elementNameTable = a.elementNameTable;
this.attributeNameTable = a.attributeNameTable;
this.defaultNS = a.defaultNS;
this.declSeen = false;
this.declsOK = true;
}, "org.xml.sax.helpers.NamespaceSupport.Context");
Clazz.defineMethod (c$, "clear", 
function () {
this.parent = null;
this.prefixTable = null;
this.uriTable = null;
this.elementNameTable = null;
this.attributeNameTable = null;
this.defaultNS = null;
});
Clazz.defineMethod (c$, "declarePrefix", 
function (a, b) {
if (!this.declsOK) throw  new IllegalStateException ("can't declare any more prefixes in this context");
if (!this.declSeen) {
this.copyTables ();
}if (this.declarations == null) {
this.declarations =  new java.util.Vector ();
}a = a.intern ();
b = b.intern ();
if ("".equals (a)) {
if ("".equals (b)) {
this.defaultNS = null;
} else {
this.defaultNS = b;
}} else {
this.prefixTable.put (a, b);
this.uriTable.put (b, a);
}this.declarations.addElement (a);
}, "~S,~S");
Clazz.defineMethod (c$, "processName", 
function (a, b) {
var c;
var d;
this.declsOK = false;
if (b) {
d = this.attributeNameTable;
} else {
d = this.elementNameTable;
}c = d.get (a);
if (c != null) {
return c;
}c =  new Array (3);
c[2] = a.intern ();
var e = a.indexOf (':');
if (e == -1) {
if (b) {
if (a === "xmlns" && this.b$["org.xml.sax.helpers.NamespaceSupport"].namespaceDeclUris) c[0] = "http://www.w3.org/xmlns/2000/";
 else c[0] = "";
} else if (this.defaultNS == null) {
c[0] = "";
} else {
c[0] = this.defaultNS;
}c[1] = c[2];
} else {
var f = a.substring (0, e);
var g = a.substring (e + 1);
var h;
if ("".equals (f)) {
h = this.defaultNS;
} else {
h = this.prefixTable.get (f);
}if (h == null || (!b && "xmlns".equals (f))) {
return null;
}c[0] = h;
c[1] = g.intern ();
}d.put (c[2], c);
return c;
}, "~S,~B");
Clazz.defineMethod (c$, "getURI", 
function (a) {
if ("".equals (a)) {
return this.defaultNS;
} else if (this.prefixTable == null) {
return null;
} else {
return this.prefixTable.get (a);
}}, "~S");
Clazz.defineMethod (c$, "getPrefix", 
function (a) {
if (this.uriTable == null) {
return null;
} else {
return this.uriTable.get (a);
}}, "~S");
Clazz.defineMethod (c$, "getDeclaredPrefixes", 
function () {
if (this.declarations == null) {
return org.xml.sax.helpers.NamespaceSupport.EMPTY_ENUMERATION;
} else {
return this.declarations.elements ();
}});
Clazz.defineMethod (c$, "getPrefixes", 
function () {
if (this.prefixTable == null) {
return org.xml.sax.helpers.NamespaceSupport.EMPTY_ENUMERATION;
} else {
return this.prefixTable.keys ();
}});
Clazz.defineMethod (c$, "copyTables", 
 function () {
if (this.prefixTable != null) {
this.prefixTable = this.prefixTable.clone ();
} else {
this.prefixTable =  new java.util.Hashtable ();
}if (this.uriTable != null) {
this.uriTable = this.uriTable.clone ();
} else {
this.uriTable =  new java.util.Hashtable ();
}this.elementNameTable =  new java.util.Hashtable ();
this.attributeNameTable =  new java.util.Hashtable ();
this.declSeen = true;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"XMLNS", "http://www.w3.org/XML/1998/namespace",
"NSDECL", "http://www.w3.org/xmlns/2000/");
c$.EMPTY_ENUMERATION = c$.prototype.EMPTY_ENUMERATION =  new java.util.Vector ().elements ();
});
