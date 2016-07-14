Clazz.declarePackage ("org.xml.sax.helpers");
Clazz.load (["org.xml.sax.AttributeList", "java.util.Vector"], "org.xml.sax.helpers.AttributeListImpl", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.names = null;
this.types = null;
this.values = null;
Clazz.instantialize (this, arguments);
}, org.xml.sax.helpers, "AttributeListImpl", null, org.xml.sax.AttributeList);
Clazz.prepareFields (c$, function () {
this.names =  new java.util.Vector ();
this.types =  new java.util.Vector ();
this.values =  new java.util.Vector ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (atts) {
this.setAttributeList (atts);
}, "org.xml.sax.AttributeList");
Clazz.defineMethod (c$, "setAttributeList", 
function (atts) {
var count = atts.getLength ();
this.clear ();
for (var i = 0; i < count; i++) {
this.addAttribute (atts.getName (i), atts.getType (i), atts.getValue (i));
}
}, "org.xml.sax.AttributeList");
Clazz.defineMethod (c$, "addAttribute", 
function (name, type, value) {
this.names.addElement (name);
this.types.addElement (type);
this.values.addElement (value);
}, "~S,~S,~S");
Clazz.defineMethod (c$, "removeAttribute", 
function (name) {
var i = this.names.indexOf (name);
if (i >= 0) {
this.names.removeElementAt (i);
this.types.removeElementAt (i);
this.values.removeElementAt (i);
}}, "~S");
Clazz.defineMethod (c$, "clear", 
function () {
this.names.removeAllElements ();
this.types.removeAllElements ();
this.values.removeAllElements ();
});
Clazz.defineMethod (c$, "getLength", 
function () {
return this.names.size ();
});
Clazz.defineMethod (c$, "getName", 
function (i) {
if (i < 0) {
return null;
}try {
return this.names.elementAt (i);
} catch (e) {
if (Clazz.exceptionOf (e, ArrayIndexOutOfBoundsException)) {
return null;
} else {
throw e;
}
}
}, "~N");
Clazz.defineMethod (c$, "getType", 
function (i) {
if (i < 0) {
return null;
}try {
return this.types.elementAt (i);
} catch (e) {
if (Clazz.exceptionOf (e, ArrayIndexOutOfBoundsException)) {
return null;
} else {
throw e;
}
}
}, "~N");
Clazz.defineMethod (c$, "getValue", 
function (i) {
if (i < 0) {
return null;
}try {
return this.values.elementAt (i);
} catch (e) {
if (Clazz.exceptionOf (e, ArrayIndexOutOfBoundsException)) {
return null;
} else {
throw e;
}
}
}, "~N");
Clazz.defineMethod (c$, "getType", 
function (name) {
return this.getType (this.names.indexOf (name));
}, "~S");
Clazz.defineMethod (c$, "getValue", 
function (name) {
return this.getValue (this.names.indexOf (name));
}, "~S");
});
