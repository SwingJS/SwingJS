Clazz.declarePackage ("swingjs.api");
c$ = Clazz.declareType (swingjs.api, "DOMNode");
c$.createElement = Clazz.defineMethod (c$, "createElement", 
function (key, id) {
var obj = null;
{
obj = document.createElement(key);
obj.id = id;
}return obj;
}, "~S,~S");
c$.getParent = Clazz.defineMethod (c$, "getParent", 
function (obj) {
{
return obj.parentNode;
}}, "swingjs.api.DOMNode");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (obj) {
{
try {
var p = obj.parentNode;
p.removeNode(obj);
} catch(e) {};
return p;
}}, "swingjs.api.DOMNode");
c$.add = Clazz.defineMethod (c$, "add", 
function (parent, child) {
{
parent && parent.appendChild(child);
}}, "swingjs.api.DOMNode,swingjs.api.DOMNode");
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
c$.setStyles = Clazz.defineMethod (c$, "setStyles", 
function (obj, attr) {
{
for (var i = 0; i < attr.length;) {
//System.out.println(["DOMNode.setStyles ",attr[i],attr[i+1]])
;
obj.style[attr[i++]] = attr[i++]; }
}return obj;
}, "swingjs.api.DOMNode,~A");
c$.setSize = Clazz.defineMethod (c$, "setSize", 
function (obj, width, height) {
return swingjs.api.DOMNode.setStyles (obj, ["width", width + "px", "height", height + "px"]);
}, "swingjs.api.DOMNode,~N,~N");
c$.setPositionAbsolute = Clazz.defineMethod (c$, "setPositionAbsolute", 
function (domBtn) {
return swingjs.api.DOMNode.setStyles (domBtn, ["position", "absolute"]);
}, "swingjs.api.DOMNode");
c$.firstChild = Clazz.defineMethod (c$, "firstChild", 
function (domNode) {
{
return domNode.firstChild;
}}, "swingjs.api.DOMNode");
