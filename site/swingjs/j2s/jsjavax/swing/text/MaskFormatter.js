Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.DefaultFormatter"], "jsjavax.swing.text.MaskFormatter", ["java.lang.Character", "$.StringBuffer", "java.util.ArrayList", "jsjava.text.ParseException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mask = null;
this.maskChars = null;
this.validCharacters = null;
this.invalidCharacters = null;
this.placeholderString = null;
this.placeholder = '\0';
this.containsLiteralChars = false;
if (!Clazz.isClassDefined ("jsjavax.swing.text.MaskFormatter.MaskCharacter")) {
jsjavax.swing.text.MaskFormatter.$MaskFormatter$MaskCharacter$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.MaskFormatter.LiteralCharacter")) {
jsjavax.swing.text.MaskFormatter.$MaskFormatter$LiteralCharacter$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.MaskFormatter.DigitMaskCharacter")) {
jsjavax.swing.text.MaskFormatter.$MaskFormatter$DigitMaskCharacter$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.MaskFormatter.UpperCaseCharacter")) {
jsjavax.swing.text.MaskFormatter.$MaskFormatter$UpperCaseCharacter$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.MaskFormatter.LowerCaseCharacter")) {
jsjavax.swing.text.MaskFormatter.$MaskFormatter$LowerCaseCharacter$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.MaskFormatter.AlphaNumericCharacter")) {
jsjavax.swing.text.MaskFormatter.$MaskFormatter$AlphaNumericCharacter$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.MaskFormatter.CharCharacter")) {
jsjavax.swing.text.MaskFormatter.$MaskFormatter$CharCharacter$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.MaskFormatter.HexCharacter")) {
jsjavax.swing.text.MaskFormatter.$MaskFormatter$HexCharacter$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "MaskFormatter", jsjavax.swing.text.DefaultFormatter);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.MaskFormatter, []);
this.setAllowsInvalid (false);
this.containsLiteralChars = true;
this.maskChars = jsjavax.swing.text.MaskFormatter.EmptyMaskChars;
this.placeholder = ' ';
});
Clazz.makeConstructor (c$, 
function (mask) {
this.construct ();
this.setMask (mask);
}, "~S");
Clazz.defineMethod (c$, "setMask", 
function (mask) {
this.mask = mask;
this.updateInternalMask ();
}, "~S");
Clazz.defineMethod (c$, "getMask", 
function () {
return this.mask;
});
Clazz.defineMethod (c$, "setValidCharacters", 
function (validCharacters) {
this.validCharacters = validCharacters;
}, "~S");
Clazz.defineMethod (c$, "getValidCharacters", 
function () {
return this.validCharacters;
});
Clazz.defineMethod (c$, "setInvalidCharacters", 
function (invalidCharacters) {
this.invalidCharacters = invalidCharacters;
}, "~S");
Clazz.defineMethod (c$, "getInvalidCharacters", 
function () {
return this.invalidCharacters;
});
Clazz.defineMethod (c$, "setPlaceholder", 
function (placeholder) {
this.placeholderString = placeholder;
}, "~S");
Clazz.defineMethod (c$, "getPlaceholder", 
function () {
return this.placeholderString;
});
Clazz.defineMethod (c$, "setPlaceholderCharacter", 
function (placeholder) {
this.placeholder = placeholder;
}, "~S");
Clazz.defineMethod (c$, "getPlaceholderCharacter", 
function () {
return this.placeholder;
});
Clazz.defineMethod (c$, "setValueContainsLiteralCharacters", 
function (containsLiteralChars) {
this.containsLiteralChars = containsLiteralChars;
}, "~B");
Clazz.defineMethod (c$, "getValueContainsLiteralCharacters", 
function () {
return this.containsLiteralChars;
});
Clazz.defineMethod (c$, "stringToValue", 
function (value) {
return this.stringToValue (value, true);
}, "~S");
Clazz.overrideMethod (c$, "valueToString", 
function (value) {
var sValue = (value == null) ? "" : value.toString ();
var result =  new StringBuffer ();
var placeholder = this.getPlaceholder ();
var valueCounter =  Clazz.newIntArray (-1, [0]);
this.append (result, sValue, valueCounter, placeholder, this.maskChars);
return result.toString ();
}, "~O");
Clazz.defineMethod (c$, "install", 
function (ftf) {
Clazz.superCall (this, jsjavax.swing.text.MaskFormatter, "install", [ftf]);
if (ftf != null) {
var value = ftf.getValue ();
try {
this.stringToValue (this.valueToString (value));
} catch (pe) {
if (Clazz.exceptionOf (pe, jsjava.text.ParseException)) {
this.setEditValid (false);
} else {
throw pe;
}
}
}}, "jsjavax.swing.JFormattedTextField");
Clazz.defineMethod (c$, "stringToValue", 
($fz = function (value, completeMatch) {
var errorOffset = -1;
if ((errorOffset = this.getInvalidOffset (value, completeMatch)) == -1) {
if (!this.getValueContainsLiteralCharacters ()) {
value = this.stripLiteralChars (value);
}return Clazz.superCall (this, jsjavax.swing.text.MaskFormatter, "stringToValue", [value]);
}throw  new jsjava.text.ParseException ("stringToValue passed invalid value", errorOffset);
}, $fz.isPrivate = true, $fz), "~S,~B");
Clazz.defineMethod (c$, "getInvalidOffset", 
($fz = function (string, completeMatch) {
var iLength = string.length;
if (iLength != this.getMaxLength ()) {
return iLength;
}for (var counter = 0, max = string.length; counter < max; counter++) {
var aChar = string.charAt (counter);
if (!this.isValidCharacter (counter, aChar) && (completeMatch || !this.isPlaceholder (counter, aChar))) {
return counter;
}}
return -1;
}, $fz.isPrivate = true, $fz), "~S,~B");
Clazz.defineMethod (c$, "append", 
($fz = function (result, value, index, placeholder, mask) {
for (var counter = 0, maxCounter = mask.length; counter < maxCounter; counter++) {
mask[counter].append (result, value, index, placeholder);
}
}, $fz.isPrivate = true, $fz), "StringBuffer,~S,~A,~S,~A");
Clazz.defineMethod (c$, "updateInternalMask", 
($fz = function () {
var mask = this.getMask ();
var fixed =  new java.util.ArrayList ();
var temp = fixed;
if (mask != null) {
for (var counter = 0, maxCounter = mask.length; counter < maxCounter; counter++) {
var maskChar = mask.charAt (counter);
switch (maskChar) {
case '#':
temp.add (Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.DigitMaskCharacter, this, null));
break;
case '\'':
if (++counter < maxCounter) {
maskChar = mask.charAt (counter);
temp.add (Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.LiteralCharacter, this, null, maskChar));
}break;
case 'U':
temp.add (Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.UpperCaseCharacter, this, null));
break;
case 'L':
temp.add (Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.LowerCaseCharacter, this, null));
break;
case 'A':
temp.add (Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.AlphaNumericCharacter, this, null));
break;
case '?':
temp.add (Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.CharCharacter, this, null));
break;
case '*':
temp.add (Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.MaskCharacter, this, null));
break;
case 'H':
temp.add (Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.HexCharacter, this, null));
break;
default:
temp.add (Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.LiteralCharacter, this, null, maskChar));
break;
}
}
}if (fixed.size () == 0) {
this.maskChars = jsjavax.swing.text.MaskFormatter.EmptyMaskChars;
} else {
this.maskChars =  new Array (fixed.size ());
fixed.toArray (this.maskChars);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getMaskCharacter", 
($fz = function (index) {
if (index >= this.maskChars.length) {
return null;
}return this.maskChars[index];
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "isPlaceholder", 
($fz = function (index, aChar) {
return (this.getPlaceholderCharacter () == aChar);
}, $fz.isPrivate = true, $fz), "~N,~S");
Clazz.defineMethod (c$, "isValidCharacter", 
($fz = function (index, aChar) {
return this.getMaskCharacter (index).isValidCharacter (aChar);
}, $fz.isPrivate = true, $fz), "~N,~S");
Clazz.defineMethod (c$, "isLiteral", 
($fz = function (index) {
return this.getMaskCharacter (index).isLiteral ();
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getMaxLength", 
($fz = function () {
return this.maskChars.length;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getLiteral", 
($fz = function (index) {
return this.getMaskCharacter (index).getChar (String.fromCharCode (0));
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getCharacter", 
($fz = function (index, aChar) {
return this.getMaskCharacter (index).getChar (aChar);
}, $fz.isPrivate = true, $fz), "~N,~S");
Clazz.defineMethod (c$, "stripLiteralChars", 
($fz = function (string) {
var sb = null;
var last = 0;
for (var counter = 0, max = string.length; counter < max; counter++) {
if (this.isLiteral (counter)) {
if (sb == null) {
sb =  new StringBuffer ();
if (counter > 0) {
sb.append (string.substring (0, counter));
}last = counter + 1;
} else if (last != counter) {
sb.append (string.substring (last, counter));
}last = counter + 1;
}}
if (sb == null) {
return string;
} else if (last != string.length) {
sb.append (string.substring (last));
}return sb.toString ();
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "isNavigatable", 
function (offset) {
if (!this.getAllowsInvalid ()) {
return (offset < this.getMaxLength () && !this.isLiteral (offset));
}return true;
}, "~N");
Clazz.overrideMethod (c$, "isValidEdit", 
function (rh) {
if (!this.getAllowsInvalid ()) {
var newString = this.getReplaceString (rh.offset, rh.length, rh.text);
try {
rh.value = this.stringToValue (newString, false);
return true;
} catch (pe) {
if (Clazz.exceptionOf (pe, jsjava.text.ParseException)) {
return false;
} else {
throw pe;
}
}
}return true;
}, "jsjavax.swing.text.DefaultFormatter.ReplaceHolder");
Clazz.defineMethod (c$, "canReplace", 
function (rh) {
if (!this.getAllowsInvalid ()) {
var replace = null;
var text = rh.text;
var tl = (text != null) ? text.length : 0;
if (tl == 0 && rh.length == 1 && this.getFormattedTextField ().getSelectionStart () != rh.offset) {
while (rh.offset > 0 && this.isLiteral (rh.offset)) {
rh.offset--;
}
}var max = Math.min (this.getMaxLength () - rh.offset, Math.max (tl, rh.length));
for (var counter = 0, textIndex = 0; counter < max; counter++) {
if (textIndex < tl && this.isValidCharacter (rh.offset + counter, text.charAt (textIndex))) {
var aChar = text.charAt (textIndex);
if (aChar != this.getCharacter (rh.offset + counter, aChar)) {
if (replace == null) {
replace =  new StringBuffer ();
if (textIndex > 0) {
replace.append (text.substring (0, textIndex));
}}}if (replace != null) {
replace.append (this.getCharacter (rh.offset + counter, aChar));
}textIndex++;
} else if (this.isLiteral (rh.offset + counter)) {
if (replace != null) {
replace.append (this.getLiteral (rh.offset + counter));
if (textIndex < tl) {
max = Math.min (max + 1, this.getMaxLength () - rh.offset);
}} else if (textIndex > 0) {
replace =  new StringBuffer (max);
replace.append (text.substring (0, textIndex));
replace.append (this.getLiteral (rh.offset + counter));
if (textIndex < tl) {
max = Math.min (max + 1, this.getMaxLength () - rh.offset);
} else if (rh.cursorPosition == -1) {
rh.cursorPosition = rh.offset + counter;
}} else {
rh.offset++;
rh.length--;
counter--;
max--;
}} else if (textIndex >= tl) {
if (replace == null) {
replace =  new StringBuffer ();
if (text != null) {
replace.append (text);
}}replace.append (this.getPlaceholderCharacter ());
if (tl > 0 && rh.cursorPosition == -1) {
rh.cursorPosition = rh.offset + counter;
}} else {
return false;
}}
if (replace != null) {
rh.text = replace.toString ();
} else if (text != null && rh.offset + tl > this.getMaxLength ()) {
rh.text = text.substring (0, this.getMaxLength () - rh.offset);
}if (this.getOverwriteMode () && rh.text != null) {
rh.length = rh.text.length;
}}return Clazz.superCall (this, jsjavax.swing.text.MaskFormatter, "canReplace", [rh]);
}, "jsjavax.swing.text.DefaultFormatter.ReplaceHolder");
c$.$MaskFormatter$MaskCharacter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.MaskFormatter, "MaskCharacter");
Clazz.defineMethod (c$, "isLiteral", 
function () {
return false;
});
Clazz.defineMethod (c$, "isValidCharacter", 
function (a) {
if (this.isLiteral ()) {
return (this.getChar (a) == a);
}a = this.getChar (a);
var b = this.b$["jsjavax.swing.text.MaskFormatter"].getValidCharacters ();
if (b != null && b.indexOf (a) == -1) {
return false;
}b = this.b$["jsjavax.swing.text.MaskFormatter"].getInvalidCharacters ();
if (b != null && b.indexOf (a) != -1) {
return false;
}return true;
}, "~S");
Clazz.defineMethod (c$, "getChar", 
function (a) {
return a;
}, "~S");
Clazz.defineMethod (c$, "append", 
function (a, b, c, d) {
var e = c[0] < b.length;
var f = e ? b.charAt (c[0]) : 0;
if (this.isLiteral ()) {
a.append (this.getChar (f));
if (this.b$["jsjavax.swing.text.MaskFormatter"].getValueContainsLiteralCharacters ()) {
if (e && f != this.getChar (f)) {
throw  new jsjava.text.ParseException ("Invalid character: " + f, c[0]);
}c[0] = c[0] + 1;
}} else if (c[0] >= b.length) {
if (d != null && c[0] < d.length) {
a.append (d.charAt (c[0]));
} else {
a.append (this.b$["jsjavax.swing.text.MaskFormatter"].getPlaceholderCharacter ());
}c[0] = c[0] + 1;
} else if (this.isValidCharacter (f)) {
a.append (this.getChar (f));
c[0] = c[0] + 1;
} else {
throw  new jsjava.text.ParseException ("Invalid character: " + f, c[0]);
}}, "StringBuffer,~S,~A,~S");
c$ = Clazz.p0p ();
};
c$.$MaskFormatter$LiteralCharacter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.fixedChar = '\0';
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.MaskFormatter, "LiteralCharacter", jsjavax.swing.text.MaskFormatter.MaskCharacter, null, Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.MaskCharacter, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.text.MaskFormatter.LiteralCharacter, []);
this.fixedChar = a;
}, "~S");
Clazz.overrideMethod (c$, "isLiteral", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getChar", 
function (a) {
return this.fixedChar;
}, "~S");
c$ = Clazz.p0p ();
};
c$.$MaskFormatter$DigitMaskCharacter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.MaskFormatter, "DigitMaskCharacter", jsjavax.swing.text.MaskFormatter.MaskCharacter, null, Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.MaskCharacter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "isValidCharacter", 
function (a) {
return (Character.isDigit (a) && Clazz.superCall (this, jsjavax.swing.text.MaskFormatter.DigitMaskCharacter, "isValidCharacter", [a]));
}, "~S");
c$ = Clazz.p0p ();
};
c$.$MaskFormatter$UpperCaseCharacter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.MaskFormatter, "UpperCaseCharacter", jsjavax.swing.text.MaskFormatter.MaskCharacter, null, Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.MaskCharacter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "isValidCharacter", 
function (a) {
return (Character.isLetter (a) && Clazz.superCall (this, jsjavax.swing.text.MaskFormatter.UpperCaseCharacter, "isValidCharacter", [a]));
}, "~S");
Clazz.overrideMethod (c$, "getChar", 
function (a) {
return Character.toUpperCase (a);
}, "~S");
c$ = Clazz.p0p ();
};
c$.$MaskFormatter$LowerCaseCharacter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.MaskFormatter, "LowerCaseCharacter", jsjavax.swing.text.MaskFormatter.MaskCharacter, null, Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.MaskCharacter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "isValidCharacter", 
function (a) {
return (Character.isLetter (a) && Clazz.superCall (this, jsjavax.swing.text.MaskFormatter.LowerCaseCharacter, "isValidCharacter", [a]));
}, "~S");
Clazz.overrideMethod (c$, "getChar", 
function (a) {
return Character.toLowerCase (a);
}, "~S");
c$ = Clazz.p0p ();
};
c$.$MaskFormatter$AlphaNumericCharacter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.MaskFormatter, "AlphaNumericCharacter", jsjavax.swing.text.MaskFormatter.MaskCharacter, null, Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.MaskCharacter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "isValidCharacter", 
function (a) {
return (Character.isLetterOrDigit (a) && Clazz.superCall (this, jsjavax.swing.text.MaskFormatter.AlphaNumericCharacter, "isValidCharacter", [a]));
}, "~S");
c$ = Clazz.p0p ();
};
c$.$MaskFormatter$CharCharacter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.MaskFormatter, "CharCharacter", jsjavax.swing.text.MaskFormatter.MaskCharacter, null, Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.MaskCharacter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "isValidCharacter", 
function (a) {
return (Character.isLetter (a) && Clazz.superCall (this, jsjavax.swing.text.MaskFormatter.CharCharacter, "isValidCharacter", [a]));
}, "~S");
c$ = Clazz.p0p ();
};
c$.$MaskFormatter$HexCharacter$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.MaskFormatter, "HexCharacter", jsjavax.swing.text.MaskFormatter.MaskCharacter, null, Clazz.innerTypeInstance (jsjavax.swing.text.MaskFormatter.MaskCharacter, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "isValidCharacter", 
function (a) {
return ((a == '0' || a == '1' || a == '2' || a == '3' || a == '4' || a == '5' || a == '6' || a == '7' || a == '8' || a == '9' || a == 'a' || a == 'A' || a == 'b' || a == 'B' || a == 'c' || a == 'C' || a == 'd' || a == 'D' || a == 'e' || a == 'E' || a == 'f' || a == 'F') && Clazz.superCall (this, jsjavax.swing.text.MaskFormatter.HexCharacter, "isValidCharacter", [a]));
}, "~S");
Clazz.overrideMethod (c$, "getChar", 
function (a) {
if (Character.isDigit (a)) {
return a;
}return Character.toUpperCase (a);
}, "~S");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"DIGIT_KEY", '#',
"LITERAL_KEY", '\'',
"UPPERCASE_KEY", 'U',
"LOWERCASE_KEY", 'L',
"ALPHA_NUMERIC_KEY", 'A',
"CHARACTER_KEY", '?',
"ANYTHING_KEY", '*',
"HEX_KEY", 'H');
c$.EmptyMaskChars = c$.prototype.EmptyMaskChars =  new Array (0);
});
