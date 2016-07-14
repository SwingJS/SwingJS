Clazz.declarePackage ("javax.swing");
Clazz.load (["java.util.Hashtable"], "javax.swing.KeyboardManager", ["java.lang.Thread", "java.util.Vector", "java.applet.Applet", "java.awt.Window", "javax.swing.JComponent", "$.JMenuBar", "$.KeyStroke"], function () {
c$ = Clazz.decorateAsClass (function () {
this.containerMap = null;
this.componentKeyStrokeMap = null;
if (!Clazz.isClassDefined ("javax.swing.KeyboardManager.ComponentKeyStrokePair")) {
javax.swing.KeyboardManager.$KeyboardManager$ComponentKeyStrokePair$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "KeyboardManager");
Clazz.prepareFields (c$, function () {
this.containerMap =  new java.util.Hashtable ();
this.componentKeyStrokeMap =  new java.util.Hashtable ();
});
c$.getCurrentManager = Clazz.defineMethod (c$, "getCurrentManager", 
function () {
return javax.swing.KeyboardManager.currentManager;
});
c$.setCurrentManager = Clazz.defineMethod (c$, "setCurrentManager", 
function (km) {
javax.swing.KeyboardManager.currentManager = km;
}, "javax.swing.KeyboardManager");
Clazz.defineMethod (c$, "registerKeyStroke", 
function (k, c) {
var topContainer = javax.swing.KeyboardManager.getTopAncestor (c);
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
}} else if (Clazz.instanceOf (tmp, javax.swing.JComponent)) {
if (tmp !== c) {
var v =  new java.util.Vector ();
v.addElement (tmp);
v.addElement (c);
keyMap.put (k, v);
}} else {
System.out.println ("Unexpected condition in registerKeyStroke");
Thread.dumpStack ();
}this.componentKeyStrokeMap.put (Clazz.innerTypeInstance (javax.swing.KeyboardManager.ComponentKeyStrokePair, this, null, c, k), topContainer);
}, "javax.swing.KeyStroke,javax.swing.JComponent");
c$.getTopAncestor = Clazz.defineMethod (c$, "getTopAncestor", 
 function (c) {
for (var p = c.getParent (); p != null; p = p.getParent ()) {
if (Clazz.instanceOf (p, java.awt.Window) && (p).isFocusableWindow () || Clazz.instanceOf (p, java.applet.Applet)) {
return p;
}}
return null;
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "unregisterKeyStroke", 
function (ks, c) {
var ckp = Clazz.innerTypeInstance (javax.swing.KeyboardManager.ComponentKeyStrokePair, this, null, c, ks);
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
}if (Clazz.instanceOf (tmp, javax.swing.JComponent) && tmp === c) {
keyMap.remove (ks);
} else if (Clazz.instanceOf (tmp, java.util.Vector)) {
var v = tmp;
v.removeElement (c);
if (v.isEmpty ()) {
keyMap.remove (ks);
}}if (keyMap.isEmpty ()) {
this.containerMap.remove (topContainer);
}this.componentKeyStrokeMap.remove (ckp);
}, "javax.swing.KeyStroke,javax.swing.JComponent");
Clazz.defineMethod (c$, "fireKeyboardAction", 
function (e, pressed, topAncestor) {
if (e.isConsumed ()) {
System.out.println ("Aquired pre-used event!");
Thread.dumpStack ();
}var ks;
if (e.getID () == 400) {
ks = javax.swing.KeyStroke.getKeyStroke (e.getKeyChar ());
} else {
ks = javax.swing.KeyStroke.getKeyStroke (e.getKeyCode (), e.getModifiers (), !pressed);
}var keyMap = this.containerMap.get (topAncestor);
if (keyMap != null) {
var tmp = keyMap.get (ks);
if (tmp == null) {
} else if (Clazz.instanceOf (tmp, javax.swing.JComponent)) {
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
var v = keyMap.get (javax.swing.JMenuBar);
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
}, "java.awt.event.KeyEvent,~B,java.awt.Container");
Clazz.defineMethod (c$, "fireBinding", 
function (c, ks, e, pressed) {
if (c.processKeyBinding (ks, e, 2, pressed)) {
e.consume ();
}}, "javax.swing.JComponent,javax.swing.KeyStroke,java.awt.event.KeyEvent,~B");
Clazz.defineMethod (c$, "registerMenuBar", 
function (mb) {
var top = javax.swing.KeyboardManager.getTopAncestor (mb);
if (top == null) {
return;
}var keyMap = this.containerMap.get (top);
if (keyMap == null) {
keyMap = this.registerNewTopContainer (top);
}var menuBars = keyMap.get (javax.swing.JMenuBar);
if (menuBars == null) {
menuBars =  new java.util.Vector ();
keyMap.put (javax.swing.JMenuBar, menuBars);
}if (!menuBars.contains (mb)) {
menuBars.addElement (mb);
}}, "javax.swing.JMenuBar");
Clazz.defineMethod (c$, "unregisterMenuBar", 
function (mb) {
var topContainer = javax.swing.KeyboardManager.getTopAncestor (mb);
if (topContainer == null) {
return;
}var keyMap = this.containerMap.get (topContainer);
if (keyMap != null) {
var v = keyMap.get (javax.swing.JMenuBar);
if (v != null) {
v.removeElement (mb);
if (v.isEmpty ()) {
keyMap.remove (javax.swing.JMenuBar);
if (keyMap.isEmpty ()) {
this.containerMap.remove (topContainer);
}}}}}, "javax.swing.JMenuBar");
Clazz.defineMethod (c$, "registerNewTopContainer", 
function (topContainer) {
var keyMap =  new java.util.Hashtable ();
this.containerMap.put (topContainer, keyMap);
return keyMap;
}, "java.awt.Container");
c$.$KeyboardManager$ComponentKeyStrokePair$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.component = null;
this.keyStroke = null;
Clazz.instantialize (this, arguments);
}, javax.swing.KeyboardManager, "ComponentKeyStrokePair");
Clazz.makeConstructor (c$, 
function (a, b) {
this.component = a;
this.keyStroke = b;
}, "~O,~O");
Clazz.defineMethod (c$, "equals", 
function (a) {
if (!(Clazz.instanceOf (a, javax.swing.KeyboardManager.ComponentKeyStrokePair))) {
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
c$.currentManager = c$.prototype.currentManager =  new javax.swing.KeyboardManager ();
});
