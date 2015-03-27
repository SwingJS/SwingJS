Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JTextField"], "jsjavax.swing.JPasswordField", ["jsjavax.swing.text.Segment"], function () {
c$ = Clazz.decorateAsClass (function () {
this.echoChar = '\0';
this.echoCharSet = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JPasswordField", jsjavax.swing.JTextField);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null, 0);
});
Clazz.makeConstructor (c$, 
function (text) {
this.construct (null, text, 0);
}, "~S");
Clazz.makeConstructor (c$, 
function (columns) {
this.construct (null, null, columns);
}, "~N");
Clazz.makeConstructor (c$, 
function (text, columns) {
this.construct (null, text, columns);
}, "~S,~N");
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "PasswordFieldUI";
});
Clazz.defineMethod (c$, "updateUI", 
function () {
if (!this.echoCharSet) {
this.echoChar = '*';
}Clazz.superCall (this, jsjavax.swing.JPasswordField, "updateUI", []);
});
Clazz.defineMethod (c$, "getEchoChar", 
function () {
return this.echoChar;
});
Clazz.defineMethod (c$, "setEchoChar", 
function (c) {
this.echoChar = c;
this.echoCharSet = true;
this.repaint ();
this.revalidate ();
}, "~S");
Clazz.defineMethod (c$, "echoCharIsSet", 
function () {
return this.echoChar.charCodeAt (0) != 0;
});
Clazz.overrideMethod (c$, "cut", 
function () {
});
Clazz.overrideMethod (c$, "copy", 
function () {
});
Clazz.defineMethod (c$, "getPassword", 
function () {
var doc = this.getDocument ();
var txt =  new jsjavax.swing.text.Segment ();
try {
doc.getText (0, doc.getLength (), txt);
} catch (e) {
if (Clazz.exceptionOf (e, jsjavax.swing.text.BadLocationException)) {
return null;
} else {
throw e;
}
}
var retValue =  Clazz.newCharArray (txt.count, '\0');
System.arraycopy (txt.array, txt.offset, retValue, 0, txt.count);
return retValue;
});
Clazz.defineMethod (c$, "paramString", 
function () {
return Clazz.superCall (this, jsjavax.swing.JPasswordField, "paramString", []) + ",echoChar=" + this.echoChar;
});
Clazz.defineMethod (c$, "customSetUIProperty", 
function (propertyName, value) {
if (propertyName === "echoChar") {
if (!this.echoCharSet) {
this.setEchoChar ((value).charValue ());
this.echoCharSet = false;
}return true;
}return false;
}, "~S,~O");
Clazz.defineStatics (c$,
"$$uiClassID", "PasswordFieldUI");
});
