Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSTextFieldUI"], "swingjs.plaf.JSFormattedTextFieldUI", ["swingjs.api.DOMNode"], function () {
c$ = Clazz.declareType (swingjs.plaf, "JSFormattedTextFieldUI", swingjs.plaf.JSTextFieldUI);
Clazz.overrideMethod (c$, "setProp", 
function (obj, prop, val) {
if (prop === "value" && val.length >= 2) {
if (val.charCodeAt (0) == 164) val = "$" + val.substring (1);
 else if (val.charAt (0) == '-' && val.charCodeAt (1) == 164) val = "($" + val.substring (2) + ")";
}return swingjs.api.DOMNode.setAttr (obj, prop, val);
}, "swingjs.api.DOMNode,~S,~S");
});
