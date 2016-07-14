Clazz.declarePackage ("swingjs.api");
Clazz.load (null, "swingjs.api.DOMNode", ["swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (swingjs.api, "DOMNode");
c$.createElement = Clazz.defineMethod (c$, "createElement", 
function (key, id, attrs) {
var obj = null;
{
obj = document.createElement(key);
obj.id = id;
}return swingjs.api.DOMNode.setAttrs (obj, attrs);
}, "~S,~S,~A");
c$.getParent = Clazz.defineMethod (c$, "getParent", 
function (obj) {
{
return obj.parentNode;
}}, "swingjs.api.DOMNode");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (obj) {
if (obj == null) return null;
{
try {
var p = obj.parentNode;
p.removeNode(obj);
$(body).remove(obj);
} catch(e) {
};
return p;
}}, "swingjs.api.DOMNode");
c$.getAttr = Clazz.defineMethod (c$, "getAttr", 
function (obj, attr) {
{
if (obj)return obj[attr];
}}, "swingjs.api.DOMNode,~S");
Clazz.defineMethod (c$, "getStyle", 
function (style) {
{
if (obj)return obj.style[style];
}}, "~S");
c$.setAttr = Clazz.defineMethod (c$, "setAttr", 
function (obj, attr, val) {
{
obj[attr] = (val == "TRUE" ? true : val);
}return obj;
}, "swingjs.api.DOMNode,~S,~O");
c$.setAttrs = Clazz.defineMethod (c$, "setAttrs", 
function (obj, attr) {
{
for (var i = 0; i < attr.length;) {
obj[attr[i++]] = attr[i++]; }
}return obj;
}, "swingjs.api.DOMNode,~A");
c$.setStyles = Clazz.defineMethod (c$, "setStyles", 
function (obj, attr) {
{
for (var i = 0; i < attr.length;) {
obj.style[attr[i++]] = attr[i++]; }
}return obj;
}, "swingjs.api.DOMNode,~A");
c$.setSize = Clazz.defineMethod (c$, "setSize", 
function (obj, width, height) {
return swingjs.api.DOMNode.setStyles (obj, ["width", width + "px", "height", height + "px"]);
}, "swingjs.api.DOMNode,~N,~N");
c$.setPositionAbsolute = Clazz.defineMethod (c$, "setPositionAbsolute", 
function (domBtn, top, left) {
if (top >= 0) swingjs.api.DOMNode.setStyles (domBtn, ["top", top + "px"]);
if (top >= 0) swingjs.api.DOMNode.setStyles (domBtn, ["left", left + "px"]);
return swingjs.api.DOMNode.setStyles (domBtn, ["position", "absolute"]);
}, "swingjs.api.DOMNode,~N,~N");
c$.firstChild = Clazz.defineMethod (c$, "firstChild", 
function (domNode) {
{
return domNode.firstChild;
}}, "swingjs.api.DOMNode");
c$.addJqueryHandledEvent = Clazz.defineMethod (c$, "addJqueryHandledEvent", 
function (me, node, event) {
var f = null;
{
f = function(ev) {me.handleJSEvent(node, -1, ev)};
}swingjs.JSToolkit.getJQuery ().$ (node).on (event, f);
}, "swingjs.plaf.JSComponentUI,swingjs.api.DOMNode,~S");
c$.setZ = Clazz.defineMethod (c$, "setZ", 
function (node, z) {
return swingjs.api.DOMNode.setStyles (node, ["z-index", "" + z]);
}, "swingjs.api.DOMNode,~N");
c$.playWav = Clazz.defineMethod (c$, "playWav", 
function (filePath) {
swingjs.api.DOMNode.setAttrs (swingjs.api.DOMNode.createElement ("audio", "jsaudio", []), ["controls", "true", "src", filePath]).play ();
}, "~S");
});
