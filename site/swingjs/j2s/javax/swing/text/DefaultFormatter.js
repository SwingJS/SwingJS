Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.JFormattedTextField", "javax.swing.text.DocumentFilter", "$.NavigationFilter"], "javax.swing.text.DefaultFormatter", ["javax.swing.text.Position", "$.Utilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.allowsInvalid = false;
this.overwriteMode = false;
this.commitOnEdit = false;
this.valueClass = null;
this.navigationFilter = null;
this.documentFilter = null;
this.replaceHolder = null;
if (!Clazz.isClassDefined ("javax.swing.text.DefaultFormatter.DefaultNavigationFilter")) {
javax.swing.text.DefaultFormatter.$DefaultFormatter$DefaultNavigationFilter$ ();
}
if (!Clazz.isClassDefined ("javax.swing.text.DefaultFormatter.DefaultDocumentFilter")) {
javax.swing.text.DefaultFormatter.$DefaultFormatter$DefaultDocumentFilter$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.text, "DefaultFormatter", javax.swing.JFormattedTextField.AbstractFormatter, Cloneable);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.text.DefaultFormatter, []);
this.overwriteMode = true;
this.allowsInvalid = true;
});
Clazz.defineMethod (c$, "install", 
function (ftf) {
Clazz.superCall (this, javax.swing.text.DefaultFormatter, "install", [ftf]);
this.positionCursorAtInitialLocation ();
}, "javax.swing.JFormattedTextField");
Clazz.defineMethod (c$, "setCommitsOnValidEdit", 
function (commit) {
this.commitOnEdit = commit;
}, "~B");
Clazz.defineMethod (c$, "getCommitsOnValidEdit", 
function () {
return this.commitOnEdit;
});
Clazz.defineMethod (c$, "setOverwriteMode", 
function (overwriteMode) {
this.overwriteMode = overwriteMode;
}, "~B");
Clazz.defineMethod (c$, "getOverwriteMode", 
function () {
return this.overwriteMode;
});
Clazz.defineMethod (c$, "setAllowsInvalid", 
function (allowsInvalid) {
this.allowsInvalid = allowsInvalid;
}, "~B");
Clazz.defineMethod (c$, "getAllowsInvalid", 
function () {
return this.allowsInvalid;
});
Clazz.defineMethod (c$, "setValueClass", 
function (valueClass) {
this.valueClass = valueClass;
}, "Class");
Clazz.defineMethod (c$, "getValueClass", 
function () {
return this.valueClass;
});
Clazz.overrideMethod (c$, "stringToValue", 
function (string) {
var vc = this.getValueClass ();
var ftf = this.getFormattedTextField ();
if (vc == null && ftf != null) {
var value = ftf.getValue ();
if (value != null) {
vc = value.getClass ();
}}return string;
}, "~S");
Clazz.overrideMethod (c$, "valueToString", 
function (value) {
if (value == null) {
return "";
}return value.toString ();
}, "~O");
Clazz.overrideMethod (c$, "getDocumentFilter", 
function () {
if (this.documentFilter == null) {
this.documentFilter = Clazz.innerTypeInstance (javax.swing.text.DefaultFormatter.DefaultDocumentFilter, this, null);
}return this.documentFilter;
});
Clazz.overrideMethod (c$, "getNavigationFilter", 
function () {
if (this.navigationFilter == null) {
this.navigationFilter = Clazz.innerTypeInstance (javax.swing.text.DefaultFormatter.DefaultNavigationFilter, this, null);
}return this.navigationFilter;
});
Clazz.defineMethod (c$, "clone", 
function () {
var formatter = Clazz.superCall (this, javax.swing.text.DefaultFormatter, "clone", []);
formatter.navigationFilter = null;
formatter.documentFilter = null;
formatter.replaceHolder = null;
return formatter;
});
Clazz.defineMethod (c$, "positionCursorAtInitialLocation", 
function () {
var ftf = this.getFormattedTextField ();
if (ftf != null) {
ftf.setCaretPosition (this.getInitialVisualPosition ());
}});
Clazz.defineMethod (c$, "getInitialVisualPosition", 
function () {
return this.getNextNavigatableChar (0, 1);
});
Clazz.defineMethod (c$, "isNavigatable", 
function (offset) {
return true;
}, "~N");
Clazz.defineMethod (c$, "isLegalInsertText", 
function (text) {
return true;
}, "~S");
Clazz.defineMethod (c$, "getNextNavigatableChar", 
 function (offset, direction) {
var max = this.getFormattedTextField ().getDocument ().getLength ();
while (offset >= 0 && offset < max) {
if (this.isNavigatable (offset)) {
return offset;
}offset += direction;
}
return offset;
}, "~N,~N");
Clazz.defineMethod (c$, "getReplaceString", 
function (offset, deleteLength, replaceString) {
var string = this.getFormattedTextField ().getText ();
var result;
result = string.substring (0, offset);
if (replaceString != null) {
result += replaceString;
}if (offset + deleteLength < string.length) {
result += string.substring (offset + deleteLength);
}return result;
}, "~N,~N,~S");
Clazz.defineMethod (c$, "isValidEdit", 
function (rh) {
if (!this.getAllowsInvalid ()) {
var newString = this.getReplaceString (rh.offset, rh.length, rh.text);
try {
rh.value = this.stringToValue (newString);
return true;
} catch (pe) {
if (Clazz.exceptionOf (pe, java.text.ParseException)) {
return false;
} else {
throw pe;
}
}
}return true;
}, "javax.swing.text.DefaultFormatter.ReplaceHolder");
Clazz.defineMethod (c$, "commitEdit", 
function () {
var ftf = this.getFormattedTextField ();
});
Clazz.defineMethod (c$, "updateValue", 
function () {
this.updateValue (null);
});
Clazz.defineMethod (c$, "updateValue", 
function (value) {
try {
if (value == null) {
var string = this.getFormattedTextField ().getText ();
value = this.stringToValue (string);
}if (this.getCommitsOnValidEdit ()) {
this.commitEdit ();
}this.setEditValid (true);
} catch (pe) {
if (Clazz.exceptionOf (pe, java.text.ParseException)) {
this.setEditValid (false);
} else {
throw pe;
}
}
}, "~O");
Clazz.defineMethod (c$, "getNextCursorPosition", 
function (offset, direction) {
var newOffset = this.getNextNavigatableChar (offset, direction);
var max = this.getFormattedTextField ().getDocument ().getLength ();
if (!this.getAllowsInvalid ()) {
if (direction == -1 && offset == newOffset) {
newOffset = this.getNextNavigatableChar (newOffset, 1);
if (newOffset >= max) {
newOffset = offset;
}} else if (direction == 1 && newOffset >= max) {
newOffset = this.getNextNavigatableChar (max - 1, -1);
if (newOffset < max) {
newOffset++;
}}}return newOffset;
}, "~N,~N");
Clazz.defineMethod (c$, "repositionCursor", 
function (offset, direction) {
this.getFormattedTextField ().getCaret ().setDot (this.getNextCursorPosition (offset, direction));
}, "~N,~N");
Clazz.defineMethod (c$, "getNextVisualPositionFrom", 
function (text, pos, bias, direction, biasRet) {
var value = text.getUI ().getNextVisualPositionFrom (text, pos, bias, direction, biasRet);
if (value == -1) {
return -1;
}if (!this.getAllowsInvalid () && (direction == 3 || direction == 7)) {
var last = -1;
while (!this.isNavigatable (value) && value != last) {
last = value;
value = text.getUI ().getNextVisualPositionFrom (text, value, bias, direction, biasRet);
}
var max = this.getFormattedTextField ().getDocument ().getLength ();
if (last == value || value == max) {
if (value == 0) {
biasRet[0] = javax.swing.text.Position.Bias.Forward;
value = this.getInitialVisualPosition ();
}if (value >= max && max > 0) {
biasRet[0] = javax.swing.text.Position.Bias.Forward;
value = this.getNextNavigatableChar (max - 1, -1) + 1;
}}}return value;
}, "javax.swing.text.JTextComponent,~N,javax.swing.text.Position.Bias,~N,~A");
Clazz.defineMethod (c$, "canReplace", 
function (rh) {
return this.isValidEdit (rh);
}, "javax.swing.text.DefaultFormatter.ReplaceHolder");
Clazz.defineMethod (c$, "replace", 
function (fb, offset, length, text, attrs) {
var rh = this.getReplaceHolder (fb, offset, length, text, attrs);
this.replace (rh);
}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,javax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "replace", 
function (rh) {
var valid = true;
var direction = 1;
if (rh.length > 0 && (rh.text == null || rh.text.length == 0) && (this.getFormattedTextField ().getSelectionStart () != rh.offset || rh.length > 1)) {
direction = -1;
}if (this.getOverwriteMode () && rh.text != null) {
rh.length = Math.min (Math.max (rh.length, rh.text.length), rh.fb.getDocument ().getLength () - rh.offset);
}if ((rh.text != null && !this.isLegalInsertText (rh.text)) || !this.canReplace (rh) || (rh.length == 0 && (rh.text == null || rh.text.length == 0))) {
valid = false;
}if (valid) {
var cursor = rh.cursorPosition;
rh.fb.replace (rh.offset, rh.length, rh.text, rh.attrs);
if (cursor == -1) {
cursor = rh.offset;
if (direction == 1 && rh.text != null) {
cursor = rh.offset + rh.text.length;
}}this.updateValue (rh.value);
this.repositionCursor (cursor, direction);
return true;
} else {
this.invalidEdit ();
}return false;
}, "javax.swing.text.DefaultFormatter.ReplaceHolder");
Clazz.defineMethod (c$, "setDot", 
function (fb, dot, bias) {
fb.setDot (dot, bias);
}, "javax.swing.text.NavigationFilter.FilterBypass,~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "moveDot", 
function (fb, dot, bias) {
fb.moveDot (dot, bias);
}, "javax.swing.text.NavigationFilter.FilterBypass,~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "getReplaceHolder", 
function (fb, offset, length, text, attrs) {
if (this.replaceHolder == null) {
this.replaceHolder =  new javax.swing.text.DefaultFormatter.ReplaceHolder ();
}this.replaceHolder.reset (fb, offset, length, text, attrs);
return this.replaceHolder;
}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,javax.swing.text.AttributeSet");
c$.$DefaultFormatter$DefaultNavigationFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.text.DefaultFormatter, "DefaultNavigationFilter", javax.swing.text.NavigationFilter);
Clazz.overrideMethod (c$, "setDot", 
function (a, b, c) {
var d = this.b$["javax.swing.text.DefaultFormatter"].getFormattedTextField ();
if (d.composedTextExists ()) {
a.setDot (b, c);
} else {
this.b$["javax.swing.text.DefaultFormatter"].setDot (a, b, c);
}}, "javax.swing.text.NavigationFilter.FilterBypass,~N,javax.swing.text.Position.Bias");
Clazz.overrideMethod (c$, "moveDot", 
function (a, b, c) {
var d = this.b$["javax.swing.text.DefaultFormatter"].getFormattedTextField ();
if (d.composedTextExists ()) {
a.moveDot (b, c);
} else {
this.b$["javax.swing.text.DefaultFormatter"].moveDot (a, b, c);
}}, "javax.swing.text.NavigationFilter.FilterBypass,~N,javax.swing.text.Position.Bias");
Clazz.overrideMethod (c$, "getNextVisualPositionFrom", 
function (a, b, c, d, e) {
if (a.composedTextExists ()) {
return a.getUI ().getNextVisualPositionFrom (a, b, c, d, e);
} else {
return this.b$["javax.swing.text.DefaultFormatter"].getNextVisualPositionFrom (a, b, c, d, e);
}}, "javax.swing.text.JTextComponent,~N,javax.swing.text.Position.Bias,~N,~A");
c$ = Clazz.p0p ();
};
c$.$DefaultFormatter$DefaultDocumentFilter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.text.DefaultFormatter, "DefaultDocumentFilter", javax.swing.text.DocumentFilter);
Clazz.overrideMethod (c$, "remove", 
function (a, b, c) {
var d = this.b$["javax.swing.text.DefaultFormatter"].getFormattedTextField ();
if (d.composedTextExists ()) {
a.remove (b, c);
} else {
this.b$["javax.swing.text.DefaultFormatter"].replace (a, b, c, null, null);
}}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~N");
Clazz.overrideMethod (c$, "insertString", 
function (a, b, c, d) {
var e = this.b$["javax.swing.text.DefaultFormatter"].getFormattedTextField ();
if (e.composedTextExists () || javax.swing.text.Utilities.isComposedTextAttributeDefined (d)) {
a.insertString (b, c, d);
} else {
this.b$["javax.swing.text.DefaultFormatter"].replace (a, b, 0, c, d);
}}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~S,javax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "replace", 
function (a, b, c, d, e) {
var f = this.b$["javax.swing.text.DefaultFormatter"].getFormattedTextField ();
if (f.composedTextExists () || javax.swing.text.Utilities.isComposedTextAttributeDefined (e)) {
a.replace (b, c, d, e);
} else {
this.b$["javax.swing.text.DefaultFormatter"].replace (a, b, c, d, e);
}}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,javax.swing.text.AttributeSet");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.fb = null;
this.offset = 0;
this.length = 0;
this.text = null;
this.attrs = null;
this.value = null;
this.cursorPosition = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.text.DefaultFormatter, "ReplaceHolder");
Clazz.defineMethod (c$, "reset", 
function (a, b, c, d, e) {
this.fb = a;
this.offset = b;
this.length = c;
this.text = d;
this.attrs = e;
this.value = null;
this.cursorPosition = -1;
}, "javax.swing.text.DocumentFilter.FilterBypass,~N,~N,~S,javax.swing.text.AttributeSet");
c$ = Clazz.p0p ();
});
