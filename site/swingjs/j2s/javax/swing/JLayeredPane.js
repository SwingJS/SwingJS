Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent"], "javax.swing.JLayeredPane", ["java.util.ArrayList", "$.Hashtable", "java.awt.Color", "javax.swing.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.componentToLayer = null;
this.optimizedDrawingPossible = true;
Clazz.instantialize (this, arguments);
}, javax.swing, "JLayeredPane", javax.swing.JComponent);
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (javax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "LayeredPaneUI";
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JLayeredPane, []);
this.setLayout (null);
this.updateUI ();
});
Clazz.defineMethod (c$, "validateOptimizedDrawing", 
 function () {
var layeredComponentFound = false;
{
var layer = null;
for (var c, $c = 0, $$c = this.getComponents (); $c < $$c.length && ((c = $$c[$c]) || true); $c++) {
layer = null;
if ((Clazz.instanceOf (c, javax.swing.JComponent) && (layer = (c).getClientProperty ("layeredContainerLayer")) != null)) {
if (layer != null && layer.equals (javax.swing.JLayeredPane.FRAME_CONTENT_LAYER)) continue;
layeredComponentFound = true;
break;
}}
}if (layeredComponentFound) this.optimizedDrawingPossible = false;
 else this.optimizedDrawingPossible = true;
});
Clazz.overrideMethod (c$, "addImpl", 
function (comp, constraints, index) {
var layer = javax.swing.JLayeredPane.DEFAULT_LAYER.intValue ();
var pos;
if (Clazz.instanceOf (constraints, Integer)) {
layer = (constraints).intValue ();
this.setLayer (comp, layer);
} else layer = this.getLayer (comp);
pos = this.insertIndexForLayer (layer, index);
this.addImplSAEM (comp, constraints, pos);
comp.validate ();
comp.repaint ();
this.validateOptimizedDrawing ();
return comp;
}, "java.awt.Component,~O,~N");
Clazz.defineMethod (c$, "remove", 
function (index) {
var c = this.getComponent (index);
Clazz.superCall (this, javax.swing.JLayeredPane, "remove", [index]);
if (c != null && !(Clazz.instanceOf (c, javax.swing.JComponent))) {
this.getComponentToLayer ().remove (c);
}this.validateOptimizedDrawing ();
}, "~N");
Clazz.defineMethod (c$, "removeAll", 
function () {
var children = this.getComponents ();
var cToL = this.getComponentToLayer ();
for (var counter = children.length - 1; counter >= 0; counter--) {
var c = children[counter];
if (c != null && !(Clazz.instanceOf (c, javax.swing.JComponent))) {
cToL.remove (c);
}}
Clazz.superCall (this, javax.swing.JLayeredPane, "removeAll", []);
});
Clazz.overrideMethod (c$, "isOptimizedDrawingEnabled", 
function () {
return this.optimizedDrawingPossible;
});
c$.putLayer = Clazz.defineMethod (c$, "putLayer", 
function (c, layer) {
var layerObj;
layerObj =  new Integer (layer);
c.putClientProperty ("layeredContainerLayer", layerObj);
}, "javax.swing.JComponent,~N");
c$.getLayer = Clazz.defineMethod (c$, "getLayer", 
function (c) {
var i;
if ((i = c.getClientProperty ("layeredContainerLayer")) != null) return i.intValue ();
return javax.swing.JLayeredPane.DEFAULT_LAYER.intValue ();
}, "javax.swing.JComponent");
c$.getLayeredPaneAbove = Clazz.defineMethod (c$, "getLayeredPaneAbove", 
function (c) {
if (c == null) return null;
var parent = c.getParent ();
while (parent != null && !(Clazz.instanceOf (parent, javax.swing.JLayeredPane))) parent = parent.getParent ();

return parent;
}, "java.awt.Component");
Clazz.defineMethod (c$, "setLayer", 
function (c, layer) {
this.setLayer (c, layer, -1);
}, "java.awt.Component,~N");
Clazz.defineMethod (c$, "setLayer", 
function (c, layer, position) {
var layerObj;
layerObj = this.getObjectForLayer (layer);
if (layer == this.getLayer (c) && position == this.getPosition (c)) {
this.repaint (c.getBounds ());
return;
}if (Clazz.instanceOf (c, javax.swing.JComponent)) (c).putClientProperty ("layeredContainerLayer", layerObj);
 else this.getComponentToLayer ().put (c, layerObj);
if (c.getParent () == null || c.getParent () !== this) {
this.repaint (c.getBounds ());
return;
}var index = this.insertIndexForLayer (c, layer, position);
this.setComponentZOrder (c, index);
this.repaint (c.getBounds ());
}, "java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getLayer", 
function (c) {
var i;
if (Clazz.instanceOf (c, javax.swing.JComponent)) i = (c).getClientProperty ("layeredContainerLayer");
 else i = this.getComponentToLayer ().get (c);
if (i == null) return javax.swing.JLayeredPane.DEFAULT_LAYER.intValue ();
return i.intValue ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "getIndexOf", 
function (c) {
var i;
var count;
count = this.getComponentCount ();
for (i = 0; i < count; i++) {
if (c === this.getComponent (i)) return i;
}
return -1;
}, "java.awt.Component");
Clazz.defineMethod (c$, "moveToFront", 
function (c) {
this.setPosition (c, 0);
}, "java.awt.Component");
Clazz.defineMethod (c$, "moveToBack", 
function (c) {
this.setPosition (c, -1);
}, "java.awt.Component");
Clazz.defineMethod (c$, "setPosition", 
function (c, position) {
this.setLayer (c, this.getLayer (c), position);
}, "java.awt.Component,~N");
Clazz.defineMethod (c$, "getPosition", 
function (c) {
var i;
var count;
var startLayer;
var curLayer;
var startLocation;
var pos = 0;
count = this.getComponentCount ();
startLocation = this.getIndexOf (c);
if (startLocation == -1) return -1;
startLayer = this.getLayer (c);
for (i = startLocation - 1; i >= 0; i--) {
curLayer = this.getLayer (this.getComponent (i));
if (curLayer == startLayer) pos++;
 else return pos;
}
return pos;
}, "java.awt.Component");
Clazz.defineMethod (c$, "highestLayer", 
function () {
if (this.getComponentCount () > 0) return this.getLayer (this.getComponent (0));
return 0;
});
Clazz.defineMethod (c$, "lowestLayer", 
function () {
var count = this.getComponentCount ();
if (count > 0) return this.getLayer (this.getComponent (count - 1));
return 0;
});
Clazz.defineMethod (c$, "getComponentCountInLayer", 
function (layer) {
var i;
var count;
var curLayer;
var layerCount = 0;
count = this.getComponentCount ();
for (i = 0; i < count; i++) {
curLayer = this.getLayer (this.getComponent (i));
if (curLayer == layer) {
layerCount++;
} else if (layerCount > 0 || curLayer < layer) {
break;
}}
return layerCount;
}, "~N");
Clazz.defineMethod (c$, "getComponentsInLayer", 
function (layer) {
var i;
var count;
var curLayer;
var layerCount = 0;
var results;
results =  new Array (this.getComponentCountInLayer (layer));
count = this.getComponentCount ();
for (i = 0; i < count; i++) {
curLayer = this.getLayer (this.getComponent (i));
if (curLayer == layer) {
results[layerCount++] = this.getComponent (i);
} else if (layerCount > 0 || curLayer < layer) {
break;
}}
return results;
}, "~N");
Clazz.defineMethod (c$, "paint", 
function (g) {
if (this.isOpaque ()) {
var r = g.getClipBounds ();
var c = this.getBackground ();
if (c == null) c = java.awt.Color.lightGray;
g.setColor (c);
if (r != null) {
g.fillRect (r.x, r.y, r.width, r.height);
} else {
g.fillRect (0, 0, this.getWidth (), this.getHeight ());
}}Clazz.superCall (this, javax.swing.JLayeredPane, "paint", [g]);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "getComponentToLayer", 
function () {
if (this.componentToLayer == null) this.componentToLayer =  new java.util.Hashtable (4);
return this.componentToLayer;
});
Clazz.defineMethod (c$, "getObjectForLayer", 
function (layer) {
var layerObj;
switch (layer) {
case 0:
layerObj = javax.swing.JLayeredPane.DEFAULT_LAYER;
break;
case 100:
layerObj = javax.swing.JLayeredPane.PALETTE_LAYER;
break;
case 200:
layerObj = javax.swing.JLayeredPane.MODAL_LAYER;
break;
case 300:
layerObj = javax.swing.JLayeredPane.POPUP_LAYER;
break;
case 400:
layerObj = javax.swing.JLayeredPane.DRAG_LAYER;
break;
default:
layerObj =  new Integer (layer);
}
return layerObj;
}, "~N");
Clazz.defineMethod (c$, "insertIndexForLayer", 
function (layer, position) {
return this.insertIndexForLayer (null, layer, position);
}, "~N,~N");
Clazz.defineMethod (c$, "insertIndexForLayer", 
 function (comp, layer, position) {
var i;
var count;
var curLayer;
var layerStart = -1;
var layerEnd = -1;
var componentCount = this.getComponentCount ();
var compList =  new java.util.ArrayList (componentCount);
for (var index = 0; index < componentCount; index++) {
if (this.getComponent (index) !== comp) {
compList.add (this.getComponent (index));
}}
count = compList.size ();
for (i = 0; i < count; i++) {
curLayer = this.getLayer (compList.get (i));
if (layerStart == -1 && curLayer == layer) {
layerStart = i;
}if (curLayer < layer) {
if (i == 0) {
layerStart = 0;
layerEnd = 0;
} else {
layerEnd = i;
}break;
}}
if (layerStart == -1 && layerEnd == -1) return count;
if (layerStart != -1 && layerEnd == -1) layerEnd = count;
if (layerEnd != -1 && layerStart == -1) layerStart = layerEnd;
if (position == -1) return layerEnd;
if (position > -1 && layerStart + position <= layerEnd) return layerStart + position;
return layerEnd;
}, "java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "paramString", 
function () {
var optimizedDrawingPossibleString = (this.optimizedDrawingPossible ? "true" : "false");
return Clazz.superCall (this, javax.swing.JLayeredPane, "paramString", []) + ",optimizedDrawingPossible=" + optimizedDrawingPossibleString;
});
c$.DEFAULT_LAYER = c$.prototype.DEFAULT_LAYER =  new Integer (0);
c$.PALETTE_LAYER = c$.prototype.PALETTE_LAYER =  new Integer (100);
c$.MODAL_LAYER = c$.prototype.MODAL_LAYER =  new Integer (200);
c$.POPUP_LAYER = c$.prototype.POPUP_LAYER =  new Integer (300);
c$.DRAG_LAYER = c$.prototype.DRAG_LAYER =  new Integer (400);
c$.FRAME_CONTENT_LAYER = c$.prototype.FRAME_CONTENT_LAYER =  new Integer (-30000);
Clazz.defineStatics (c$,
"LAYER_PROPERTY", "layeredContainerLayer",
"$uiClassID", "LayeredPaneUI");
});
