Clazz.declarePackage ("org.xml.sax.helpers");
Clazz.load (["org.xml.sax.Attributes"], "org.xml.sax.helpers.AttributesImpl", ["java.lang.ArrayIndexOutOfBoundsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.length = 0;
this.data = null;
Clazz.instantialize (this, arguments);
}, org.xml.sax.helpers, "AttributesImpl", null, org.xml.sax.Attributes);
Clazz.makeConstructor (c$, 
function () {
this.length = 0;
this.data = null;
});
Clazz.makeConstructor (c$, 
function (atts) {
this.setAttributes (atts);
}, "org.xml.sax.Attributes");
Clazz.defineMethod (c$, "getLength", 
function () {
return this.length;
});
Clazz.defineMethod (c$, "getURI", 
function (index) {
if (index >= 0 && index < this.length) {
return this.data[index * 5];
} else {
return null;
}}, "~N");
Clazz.defineMethod (c$, "getLocalName", 
function (index) {
if (index >= 0 && index < this.length) {
return this.data[index * 5 + 1];
} else {
return null;
}}, "~N");
Clazz.defineMethod (c$, "getQName", 
function (index) {
if (index >= 0 && index < this.length) {
return this.data[index * 5 + 2];
} else {
return null;
}}, "~N");
Clazz.defineMethod (c$, "getType", 
function (index) {
if (index >= 0 && index < this.length) {
return this.data[index * 5 + 3];
} else {
return null;
}}, "~N");
Clazz.defineMethod (c$, "getValue", 
function (index) {
if (index >= 0 && index < this.length) {
return this.data[index * 5 + 4];
} else {
return null;
}}, "~N");
Clazz.defineMethod (c$, "getIndex", 
function (uri, localName) {
var max = this.length * 5;
for (var i = 0; i < max; i += 5) {
if (this.data[i].equals (uri) && this.data[i + 1].equals (localName)) {
return Clazz.doubleToInt (i / 5);
}}
return -1;
}, "~S,~S");
Clazz.defineMethod (c$, "getIndex", 
function (qName) {
var max = this.length * 5;
for (var i = 0; i < max; i += 5) {
if (this.data[i + 2].equals (qName)) {
return Clazz.doubleToInt (i / 5);
}}
return -1;
}, "~S");
Clazz.defineMethod (c$, "getType", 
function (uri, localName) {
var max = this.length * 5;
for (var i = 0; i < max; i += 5) {
if (this.data[i].equals (uri) && this.data[i + 1].equals (localName)) {
return this.data[i + 3];
}}
return null;
}, "~S,~S");
Clazz.defineMethod (c$, "getType", 
function (qName) {
var max = this.length * 5;
for (var i = 0; i < max; i += 5) {
if (this.data[i + 2].equals (qName)) {
return this.data[i + 3];
}}
return null;
}, "~S");
Clazz.defineMethod (c$, "getValue", 
function (uri, localName) {
var max = this.length * 5;
for (var i = 0; i < max; i += 5) {
if (this.data[i].equals (uri) && this.data[i + 1].equals (localName)) {
return this.data[i + 4];
}}
return null;
}, "~S,~S");
Clazz.defineMethod (c$, "getValue", 
function (qName) {
var max = this.length * 5;
for (var i = 0; i < max; i += 5) {
if (this.data[i + 2].equals (qName)) {
return this.data[i + 4];
}}
return null;
}, "~S");
Clazz.defineMethod (c$, "clear", 
function () {
if (this.data != null) {
for (var i = 0; i < (this.length * 5); i++) this.data[i] = null;

}this.length = 0;
});
Clazz.defineMethod (c$, "setAttributes", 
function (atts) {
this.clear ();
this.length = atts.getLength ();
if (this.length > 0) {
this.data =  new Array (this.length * 5);
for (var i = 0; i < this.length; i++) {
this.data[i * 5] = atts.getURI (i);
this.data[i * 5 + 1] = atts.getLocalName (i);
this.data[i * 5 + 2] = atts.getQName (i);
this.data[i * 5 + 3] = atts.getType (i);
this.data[i * 5 + 4] = atts.getValue (i);
}
}}, "org.xml.sax.Attributes");
Clazz.defineMethod (c$, "addAttribute", 
function (uri, localName, qName, type, value) {
this.ensureCapacity (this.length + 1);
this.data[this.length * 5] = uri;
this.data[this.length * 5 + 1] = localName;
this.data[this.length * 5 + 2] = qName;
this.data[this.length * 5 + 3] = type;
this.data[this.length * 5 + 4] = value;
this.length++;
}, "~S,~S,~S,~S,~S");
Clazz.defineMethod (c$, "setAttribute", 
function (index, uri, localName, qName, type, value) {
if (index >= 0 && index < this.length) {
this.data[index * 5] = uri;
this.data[index * 5 + 1] = localName;
this.data[index * 5 + 2] = qName;
this.data[index * 5 + 3] = type;
this.data[index * 5 + 4] = value;
} else {
this.badIndex (index);
}}, "~N,~S,~S,~S,~S,~S");
Clazz.defineMethod (c$, "removeAttribute", 
function (index) {
if (index >= 0 && index < this.length) {
if (index < this.length - 1) {
System.arraycopy (this.data, (index + 1) * 5, this.data, index * 5, (this.length - index - 1) * 5);
}index = (this.length - 1) * 5;
this.data[index++] = null;
this.data[index++] = null;
this.data[index++] = null;
this.data[index++] = null;
this.data[index] = null;
this.length--;
} else {
this.badIndex (index);
}}, "~N");
Clazz.defineMethod (c$, "setURI", 
function (index, uri) {
if (index >= 0 && index < this.length) {
this.data[index * 5] = uri;
} else {
this.badIndex (index);
}}, "~N,~S");
Clazz.defineMethod (c$, "setLocalName", 
function (index, localName) {
if (index >= 0 && index < this.length) {
this.data[index * 5 + 1] = localName;
} else {
this.badIndex (index);
}}, "~N,~S");
Clazz.defineMethod (c$, "setQName", 
function (index, qName) {
if (index >= 0 && index < this.length) {
this.data[index * 5 + 2] = qName;
} else {
this.badIndex (index);
}}, "~N,~S");
Clazz.defineMethod (c$, "setType", 
function (index, type) {
if (index >= 0 && index < this.length) {
this.data[index * 5 + 3] = type;
} else {
this.badIndex (index);
}}, "~N,~S");
Clazz.defineMethod (c$, "setValue", 
function (index, value) {
if (index >= 0 && index < this.length) {
this.data[index * 5 + 4] = value;
} else {
this.badIndex (index);
}}, "~N,~S");
Clazz.defineMethod (c$, "ensureCapacity", 
 function (n) {
if (n <= 0) {
return;
}var max;
if (this.data == null || this.data.length == 0) {
max = 25;
} else if (this.data.length >= n * 5) {
return;
} else {
max = this.data.length;
}while (max < n * 5) {
max *= 2;
}
var newData =  new Array (max);
if (this.length > 0) {
System.arraycopy (this.data, 0, newData, 0, this.length * 5);
}this.data = newData;
}, "~N");
Clazz.defineMethod (c$, "badIndex", 
 function (index) {
var msg = "Attempt to modify attribute at illegal index: " + index;
throw  new ArrayIndexOutOfBoundsException (msg);
}, "~N");
});
