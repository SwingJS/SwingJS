Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.ListSelectionModel", "java.util.BitSet", "jsjavax.swing.event.EventListenerList"], "jsjavax.swing.DefaultListSelectionModel", ["java.lang.IllegalArgumentException", "jsjavax.swing.event.ListSelectionEvent", "$.ListSelectionListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.selectionMode = 2;
this.minIndex = 2147483647;
this.maxIndex = -1;
this.anchorIndex = -1;
this.leadIndex = -1;
this.firstAdjustedIndex = 2147483647;
this.lastAdjustedIndex = -1;
this.isAdjusting = false;
this.firstChangedIndex = 2147483647;
this.lastChangedIndex = -1;
this.value = null;
this.listenerList = null;
this.leadAnchorNotificationEnabled = true;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "DefaultListSelectionModel", null, [jsjavax.swing.ListSelectionModel, Cloneable]);
Clazz.prepareFields (c$, function () {
this.value =  new java.util.BitSet (32);
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
});
Clazz.overrideMethod (c$, "getMinSelectionIndex", 
function () {
return this.isSelectionEmpty () ? -1 : this.minIndex;
});
Clazz.overrideMethod (c$, "getMaxSelectionIndex", 
function () {
return this.maxIndex;
});
Clazz.overrideMethod (c$, "getValueIsAdjusting", 
function () {
return this.isAdjusting;
});
Clazz.overrideMethod (c$, "getSelectionMode", 
function () {
return this.selectionMode;
});
Clazz.overrideMethod (c$, "setSelectionMode", 
function (selectionMode) {
switch (selectionMode) {
case 0:
case 1:
case 2:
this.selectionMode = selectionMode;
break;
default:
throw  new IllegalArgumentException ("invalid selectionMode");
}
}, "~N");
Clazz.overrideMethod (c$, "isSelectedIndex", 
function (index) {
return ((index < this.minIndex) || (index > this.maxIndex)) ? false : this.value.get (index);
}, "~N");
Clazz.overrideMethod (c$, "isSelectionEmpty", 
function () {
return (this.minIndex > this.maxIndex);
});
Clazz.overrideMethod (c$, "addListSelectionListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.ListSelectionListener, l);
}, "jsjavax.swing.event.ListSelectionListener");
Clazz.overrideMethod (c$, "removeListSelectionListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.ListSelectionListener, l);
}, "jsjavax.swing.event.ListSelectionListener");
Clazz.defineMethod (c$, "getListSelectionListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.ListSelectionListener);
});
Clazz.defineMethod (c$, "fireValueChanged", 
function (isAdjusting) {
if (this.lastChangedIndex == -1) {
return;
}var oldFirstChangedIndex = this.firstChangedIndex;
var oldLastChangedIndex = this.lastChangedIndex;
this.firstChangedIndex = 2147483647;
this.lastChangedIndex = -1;
this.fireValueChanged (oldFirstChangedIndex, oldLastChangedIndex, isAdjusting);
}, "~B");
Clazz.defineMethod (c$, "fireValueChanged", 
function (firstIndex, lastIndex) {
this.fireValueChanged (firstIndex, lastIndex, this.getValueIsAdjusting ());
}, "~N,~N");
Clazz.defineMethod (c$, "fireValueChanged", 
function (firstIndex, lastIndex, isAdjusting) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.ListSelectionListener) {
if (e == null) {
e =  new jsjavax.swing.event.ListSelectionEvent (this, firstIndex, lastIndex, isAdjusting);
}(listeners[i + 1]).valueChanged (e);
}}
}, "~N,~N,~B");
Clazz.defineMethod (c$, "fireValueChanged", 
($fz = function () {
if (this.lastAdjustedIndex == -1) {
return;
}if (this.getValueIsAdjusting ()) {
this.firstChangedIndex = Math.min (this.firstChangedIndex, this.firstAdjustedIndex);
this.lastChangedIndex = Math.max (this.lastChangedIndex, this.lastAdjustedIndex);
}var oldFirstAdjustedIndex = this.firstAdjustedIndex;
var oldLastAdjustedIndex = this.lastAdjustedIndex;
this.firstAdjustedIndex = 2147483647;
this.lastAdjustedIndex = -1;
this.fireValueChanged (oldFirstAdjustedIndex, oldLastAdjustedIndex);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
Clazz.defineMethod (c$, "markAsDirty", 
($fz = function (r) {
this.firstAdjustedIndex = Math.min (this.firstAdjustedIndex, r);
this.lastAdjustedIndex = Math.max (this.lastAdjustedIndex, r);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "set", 
($fz = function (r) {
if (this.value.get (r)) {
return;
}this.value.set (r);
this.markAsDirty (r);
this.minIndex = Math.min (this.minIndex, r);
this.maxIndex = Math.max (this.maxIndex, r);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "clear", 
($fz = function (r) {
if (!this.value.get (r)) {
return;
}this.value.clear (r);
this.markAsDirty (r);
if (r == this.minIndex) {
for (this.minIndex = this.minIndex + 1; this.minIndex <= this.maxIndex; this.minIndex++) {
if (this.value.get (this.minIndex)) {
break;
}}
}if (r == this.maxIndex) {
for (this.maxIndex = this.maxIndex - 1; this.minIndex <= this.maxIndex; this.maxIndex--) {
if (this.value.get (this.maxIndex)) {
break;
}}
}if (this.isSelectionEmpty ()) {
this.minIndex = 2147483647;
this.maxIndex = -1;
}}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "setLeadAnchorNotificationEnabled", 
function (flag) {
this.leadAnchorNotificationEnabled = flag;
}, "~B");
Clazz.defineMethod (c$, "isLeadAnchorNotificationEnabled", 
function () {
return this.leadAnchorNotificationEnabled;
});
Clazz.defineMethod (c$, "updateLeadAnchorIndices", 
($fz = function (anchorIndex, leadIndex) {
if (this.leadAnchorNotificationEnabled) {
if (this.anchorIndex != anchorIndex) {
if (this.anchorIndex != -1) {
this.markAsDirty (this.anchorIndex);
}this.markAsDirty (anchorIndex);
}if (this.leadIndex != leadIndex) {
if (this.leadIndex != -1) {
this.markAsDirty (this.leadIndex);
}this.markAsDirty (leadIndex);
}}this.anchorIndex = anchorIndex;
this.leadIndex = leadIndex;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "contains", 
($fz = function (a, b, i) {
return (i >= a) && (i <= b);
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "changeSelection", 
($fz = function (clearMin, clearMax, setMin, setMax, clearFirst) {
for (var i = Math.min (setMin, clearMin); i <= Math.max (setMax, clearMax); i++) {
var shouldClear = this.contains (clearMin, clearMax, i);
var shouldSet = this.contains (setMin, setMax, i);
if (shouldSet && shouldClear) {
if (clearFirst) {
shouldClear = false;
} else {
shouldSet = false;
}}if (shouldSet) {
this.set (i);
}if (shouldClear) {
this.clear (i);
}}
this.fireValueChanged ();
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "changeSelection", 
($fz = function (clearMin, clearMax, setMin, setMax) {
this.changeSelection (clearMin, clearMax, setMin, setMax, true);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "clearSelection", 
function () {
this.removeSelectionIntervalImpl (this.minIndex, this.maxIndex, false);
});
Clazz.overrideMethod (c$, "setSelectionInterval", 
function (index0, index1) {
if (index0 == -1 || index1 == -1) {
return;
}if (this.getSelectionMode () == 0) {
index0 = index1;
}this.updateLeadAnchorIndices (index0, index1);
var clearMin = this.minIndex;
var clearMax = this.maxIndex;
var setMin = Math.min (index0, index1);
var setMax = Math.max (index0, index1);
this.changeSelection (clearMin, clearMax, setMin, setMax);
}, "~N,~N");
Clazz.overrideMethod (c$, "addSelectionInterval", 
function (index0, index1) {
if (index0 == -1 || index1 == -1) {
return;
}if (this.getSelectionMode () == 0) {
this.setSelectionInterval (index0, index1);
return;
}this.updateLeadAnchorIndices (index0, index1);
var clearMin = 2147483647;
var clearMax = -1;
var setMin = Math.min (index0, index1);
var setMax = Math.max (index0, index1);
if (this.getSelectionMode () == 1 && (setMax < this.minIndex - 1 || setMin > this.maxIndex + 1)) {
this.setSelectionInterval (index0, index1);
return;
}this.changeSelection (clearMin, clearMax, setMin, setMax);
}, "~N,~N");
Clazz.overrideMethod (c$, "removeSelectionInterval", 
function (index0, index1) {
this.removeSelectionIntervalImpl (index0, index1, true);
}, "~N,~N");
Clazz.defineMethod (c$, "removeSelectionIntervalImpl", 
($fz = function (index0, index1, changeLeadAnchor) {
if (index0 == -1 || index1 == -1) {
return;
}if (changeLeadAnchor) {
this.updateLeadAnchorIndices (index0, index1);
}var clearMin = Math.min (index0, index1);
var clearMax = Math.max (index0, index1);
var setMin = 2147483647;
var setMax = -1;
if (this.getSelectionMode () != 2 && clearMin > this.minIndex && clearMax < this.maxIndex) {
clearMax = this.maxIndex;
}this.changeSelection (clearMin, clearMax, setMin, setMax);
}, $fz.isPrivate = true, $fz), "~N,~N,~B");
Clazz.defineMethod (c$, "setState", 
($fz = function (index, state) {
if (state) {
this.set (index);
} else {
this.clear (index);
}}, $fz.isPrivate = true, $fz), "~N,~B");
Clazz.overrideMethod (c$, "insertIndexInterval", 
function (index, length, before) {
var insMinIndex = (before) ? index : index + 1;
var insMaxIndex = (insMinIndex + length) - 1;
for (var i = this.maxIndex; i >= insMinIndex; i--) {
this.setState (i + length, this.value.get (i));
}
var setInsertedValues = ((this.getSelectionMode () == 0) ? false : this.value.get (index));
for (var i = insMinIndex; i <= insMaxIndex; i++) {
this.setState (i, setInsertedValues);
}
var leadIndex = this.leadIndex;
if (leadIndex > index || (before && leadIndex == index)) {
leadIndex = this.leadIndex + length;
}var anchorIndex = this.anchorIndex;
if (anchorIndex > index || (before && anchorIndex == index)) {
anchorIndex = this.anchorIndex + length;
}if (leadIndex != this.leadIndex || anchorIndex != this.anchorIndex) {
this.updateLeadAnchorIndices (anchorIndex, leadIndex);
}this.fireValueChanged ();
}, "~N,~N,~B");
Clazz.overrideMethod (c$, "removeIndexInterval", 
function (index0, index1) {
var rmMinIndex = Math.min (index0, index1);
var rmMaxIndex = Math.max (index0, index1);
var gapLength = (rmMaxIndex - rmMinIndex) + 1;
for (var i = rmMinIndex; i <= this.maxIndex; i++) {
this.setState (i, this.value.get (i + gapLength));
}
var leadIndex = this.leadIndex;
if (leadIndex == 0 && rmMinIndex == 0) {
} else if (leadIndex > rmMaxIndex) {
leadIndex = this.leadIndex - gapLength;
} else if (leadIndex >= rmMinIndex) {
leadIndex = rmMinIndex - 1;
}var anchorIndex = this.anchorIndex;
if (anchorIndex == 0 && rmMinIndex == 0) {
} else if (anchorIndex > rmMaxIndex) {
anchorIndex = this.anchorIndex - gapLength;
} else if (anchorIndex >= rmMinIndex) {
anchorIndex = rmMinIndex - 1;
}if (leadIndex != this.leadIndex || anchorIndex != this.anchorIndex) {
this.updateLeadAnchorIndices (anchorIndex, leadIndex);
}this.fireValueChanged ();
}, "~N,~N");
Clazz.overrideMethod (c$, "setValueIsAdjusting", 
function (isAdjusting) {
if (isAdjusting != this.isAdjusting) {
this.isAdjusting = isAdjusting;
this.fireValueChanged (isAdjusting);
}}, "~B");
Clazz.overrideMethod (c$, "toString", 
function () {
var s = ((this.getValueIsAdjusting ()) ? "~" : "=") + this.value.toString ();
return this.getClass ().getName () + " " + Integer.toString (this.hashCode ()) + " " + s;
});
Clazz.defineMethod (c$, "clone", 
function () {
var clone = Clazz.superCall (this, jsjavax.swing.DefaultListSelectionModel, "clone", []);
clone.value = this.value.clone ();
clone.listenerList =  new jsjavax.swing.event.EventListenerList ();
return clone;
});
Clazz.overrideMethod (c$, "getAnchorSelectionIndex", 
function () {
return this.anchorIndex;
});
Clazz.overrideMethod (c$, "getLeadSelectionIndex", 
function () {
return this.leadIndex;
});
Clazz.overrideMethod (c$, "setAnchorSelectionIndex", 
function (anchorIndex) {
this.updateLeadAnchorIndices (anchorIndex, this.leadIndex);
this.fireValueChanged ();
}, "~N");
Clazz.defineMethod (c$, "moveLeadSelectionIndex", 
function (leadIndex) {
if (leadIndex == -1) {
if (this.anchorIndex != -1) {
return;
}}this.updateLeadAnchorIndices (this.anchorIndex, leadIndex);
this.fireValueChanged ();
}, "~N");
Clazz.overrideMethod (c$, "setLeadSelectionIndex", 
function (leadIndex) {
var anchorIndex = this.anchorIndex;
if (leadIndex == -1) {
if (anchorIndex == -1) {
this.updateLeadAnchorIndices (anchorIndex, leadIndex);
this.fireValueChanged ();
}return;
} else if (anchorIndex == -1) {
return;
}if (this.leadIndex == -1) {
this.leadIndex = leadIndex;
}var shouldSelect = this.value.get (this.anchorIndex);
if (this.getSelectionMode () == 0) {
anchorIndex = leadIndex;
shouldSelect = true;
}var oldMin = Math.min (this.anchorIndex, this.leadIndex);
var oldMax = Math.max (this.anchorIndex, this.leadIndex);
var newMin = Math.min (anchorIndex, leadIndex);
var newMax = Math.max (anchorIndex, leadIndex);
this.updateLeadAnchorIndices (anchorIndex, leadIndex);
if (shouldSelect) {
this.changeSelection (oldMin, oldMax, newMin, newMax);
} else {
this.changeSelection (newMin, newMax, oldMin, oldMax, false);
}}, "~N");
Clazz.defineStatics (c$,
"MIN", -1,
"MAX", 2147483647);
});
