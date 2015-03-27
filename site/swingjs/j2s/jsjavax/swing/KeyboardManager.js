Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["java.util.Hashtable"], "jsjavax.swing.KeyboardManager", ["java.lang.Thread", "java.util.Vector", "jsjava.applet.Applet", "jsjava.awt.Window", "jsjavax.swing.JComponent", "$.JMenuBar", "$.KeyStroke"], function () {
c$ = Clazz.decorateAsClass (function () {
this.containerMap = null;
this.componentKeyStrokeMap = null;
if (!Clazz.isClassDefined ("jsjavax.swing.KeyboardManager.ComponentKeyStrokePair")) {
jsjavax.swing.KeyboardManager.$KeyboardManager$ComponentKeyStrokePair$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "KeyboardManager");
Clazz.prepareFields (c$, function () {
this.containerMap =  new java.util.Hashtable ();
this.componentKeyStrokeMap =  new java.util.Hashtable ();
});
c$.getCurrentManager = Clazz.defineMethod (c$, "getCurrentManager", 
function () {
return jsjavax.swing.KeyboardManager.currentManager;
});
c$.setCurrentManager = Clazz.defineMethod (c$, "setCurrentManager", 
function (km) {
jsjavax.swing.KeyboardManager.currentManager = km;
}, "jsjavax.swing.KeyboardManager");
Clazz.defineMethod (c$, "registerKeyStroke", 
function (k, c) {
var topContainer = jsjavax.swing.KeyboardManager.getTopAncestor (c);
if (topContainer == null) {
return;
}var keyMap = this.containerMap.get (topContainer);
if (keyMap == null) {
keyMap = this.registerNewTopContainer (topContainer);
}var tmp = keyMap.get (k);
if (tmp == null) {
keyMap.put (k, c);
} else if (Clazz.instanceOf (tmp, java.util.Vector)) {
var v = tmp;
if (!v.contains (c)) {
v.addElement (c);
}} else if (Clazz.instanceOf (tmp, jsjavax.swing.JComponent)) {
if (tmp !== c) {
var v =  new java.util.Vector ();
v.addElement (tmp);
v.addElement (c);
keyMap.put (k, v);
}} else {
System.out.println ("Unexpected condition in registerKeyStroke");
Thread.dumpStack ();
}this.componentKeyStrokeMap.put (Clazz.innerTypeInstance (jsjavax.swing.KeyboardManager.ComponentKeyStrokePair, this, null, c, k), topContainer);
}, "jsjavax.swing.KeyStroke,jsjavax.swing.JComponent");
c$.getTopAncestor = Clazz.defineMethod (c$, "getTopAncestor", 
($fz = function (c) {
for (var p = c.getParent (); p != null; p = p.getParent ()) {
if (Clazz.instanceOf (p, jsjava.awt.Window) && (p).isFocusableWindow () || Clazz.instanceOf (p, jsjava.applet.Applet)) {
return p;
}}
return null;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "unregisterKeyStroke", 
function (ks, c) {
var ckp = Clazz.innerTypeInstance (jsjavax.swing.KeyboardManager.ComponentKeyStrokePair, this, null, c, ks);
var topContainer = this.componentKeyStrokeMap.get (ckp);
if (topContainer == null) {
return;
}var keyMap = this.containerMap.get (topContainer);
if (keyMap == null) {
Thread.dumpStack ();
return;
}var tmp = keyMap.get (ks);
if (tmp == null) {
Thread.dumpStack ();
return;
}if (Clazz.instanceOf (tmp, jsjavax.swing.JComponent) && tmp === c) {
keyMap.remove (ks);
} else if (Clazz.instanceOf (tmp, java.util.Vector)) {
var v = tmp;
v.removeElement (c);
if (v.isEmpty ()) {
keyMap.remove (ks);
}}if (keyMap.isEmpty ()) {
this.containerMap.remove (topContainer);
}this.componentKeyStrokeMap.remove (ckp);
}, "jsjavax.swing.KeyStroke,jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "fireKeyboardAction", 
function (e, pressed, topAncestor) {
if (e.isConsumed ()) {
System.out.println ("Aquired pre-used event!");
Thread.dumpStack ();
}var ks;
if (e.getID () == 400) {
ks = jsjavax.swing.KeyStroke.getKeyStroke (e.getKeyChar ());
} else {
ks = jsjavax.swing.KeyStroke.getKeyStroke (e.getKeyCode (), e.getModifiers (), !pressed);
}var keyMap = this.containerMap.get (topAncestor);
if (keyMap != null) {
var tmp = keyMap.get (ks);
if (tmp == null) {
} else if (Clazz.instanceOf (tmp, jsjavax.swing.JComponent)) {
var c = tmp;
if (c.isShowing () && c.isEnabled ()) {
this.fireBinding (c, ks, e, pressed);
}} else if (Clazz.instanceOf (tmp, java.util.Vector)) {
var v = tmp;
for (var counter = v.size () - 1; counter >= 0; counter--) {
var c = v.elementAt (counter);
if (c.isShowing () && c.isEnabled ()) {
this.fireBinding (c, ks, e, pressed);
if (e.isConsumed ()) return true;
}}
} else {
System.out.println ("Unexpected condition in fireKeyboardAction " + tmp);
Thread.dumpStack ();
}}if (e.isConsumed ()) {
return true;
}if (keyMap != null) {
var v = keyMap.get (jsjavax.swing.JMenuBar);
if (v != null) {
var iter = v.elements ();
while (iter.hasMoreElements ()) {
var mb = iter.nextElement ();
if (mb.isShowing () && mb.isEnabled ()) {
this.fireBinding (mb, ks, e, pressed);
if (e.isConsumed ()) {
return true;
}}}
}}return e.isConsumed ();
}, "jsjava.awt.event.KeyEvent,~B,jsjava.awt.Container");
Clazz.defineMethod (c$, "fireBinding", 
function (c, ks, e, pressed) {
if (c.processKeyBinding (ks, e, 2, pressed)) {
e.consume ();
}}, "jsjavax.swing.JComponent,jsjavax.swing.KeyStroke,jsjava.awt.event.KeyEvent,~B");
Clazz.defineMethod (c$, "registerMenuBar", 
function (mb) {
var top = jsjavax.swing.KeyboardManager.getTopAncestor (mb);
if (top == null) {
return;
}var keyMap = this.containerMap.get (top);
if (keyMap == null) {
keyMap = this.registerNewTopContainer (top);
}var menuBars = keyMap.get (jsjavax.swing.JMenuBar);
if (menuBars == null) {
menuBars =  new java.util.Vector ();
keyMap.put (jsjavax.swing.JMenuBar, menuBars);
}if (!menuBars.contains (mb)) {
menuBars.addElement (mb);
}}, "jsjavax.swing.JMenuBar");
Clazz.defineMethod (c$, "unregisterMenuBar", 
function (mb) {
var topContainer = jsjavax.swing.KeyboardManager.getTopAncestor (mb);
if (topContainer == null) {
return;
}var keyMap = this.containerMap.get (topContainer);
if (keyMap != null) {
var v = keyMap.get (jsjavax.swing.JMenuBar);
if (v != null) {
v.removeElement (mb);
if (v.isEmpty ()) {
keyMap.remove (jsjavax.swing.JMenuBar);
if (keyMap.isEmpty ()) {
this.containerMap.remove (topContainer);
}}}}}, "jsjavax.swing.JMenuBar");
Clazz.defineMethod (c$, "registerNewTopContainer", 
function (topContainer) {
var keyMap =  new java.util.Hashtable ();
this.containerMap.put (topContainer, keyMap);
return keyMap;
}, "jsjava.awt.Container");
c$.$KeyboardManager$ComponentKeyStrokePair$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.component = null;
this.keyStroke = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.KeyboardManager, "ComponentKeyStrokePair");
Clazz.makeConstructor (c$, 
function (a, b) {
this.component = a;
this.keyStroke = b;
}, "~O,~O");
Clazz.defineMethod (c$, "equals", 
function (a) {
if (!(Clazz.instanceOf (a, jsjavax.swing.KeyboardManager.ComponentKeyStrokePair))) {
return false;
}var b = a;
return ((this.component.equals (b.component)) && (this.keyStroke.equals (b.keyStroke)));
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
return this.component.hashCode () * this.keyStroke.hashCode ();
});
c$ = Clazz.p0p ();
};
c$.currentManager = c$.prototype.currentManager =  new jsjavax.swing.KeyboardManager ();
});
