Clazz.declarePackage ("swingjs.api");
c$ = Clazz.declareType (swingjs.api, "HTML5CanvasContext2D");
c$.getBuf8 = Clazz.defineMethod (c$, "getBuf8", 
function (imageData) {
{
return imageData.data
}}, "~O");
c$.putImageData = Clazz.defineMethod (c$, "putImageData", 
function (ctx, imageData, x, y) {
{
ctx.putImageData(imageData, x, y);
}}, "swingjs.api.HTML5CanvasContext2D,~O,~N,~N");
c$.push = Clazz.defineMethod (c$, "push", 
function (ctx, map) {
{
(ctx._aSaved || (ctx._aSaved = [])).push(map);
return ctx._aSaved.length;
}}, "swingjs.api.HTML5CanvasContext2D,java.util.Map");
c$.pop = Clazz.defineMethod (c$, "pop", 
function (ctx) {
{
return (ctx._aSaved && ctx._aSaved.length > 0 ? ctx._aSaved.pop() : null);
}return null;
}, "swingjs.api.HTML5CanvasContext2D");
c$.getSavedLevel = Clazz.defineMethod (c$, "getSavedLevel", 
function (ctx) {
{
return (ctx._aSaved ? ctx._aSaved.length : 0);
}}, "swingjs.api.HTML5CanvasContext2D");
c$.stretchImage = Clazz.defineMethod (c$, "stretchImage", 
function (ctx, img, sx, sy, swidth, sheight, dx, dy, dwidth, dheight) {
{
ctx.drawImage(img, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);
}}, "swingjs.api.HTML5CanvasContext2D,swingjs.api.DOMNode,~N,~N,~N,~N,~N,~N,~N,~N");
c$.getImageData = Clazz.defineMethod (c$, "getImageData", 
function (ctx, x, y, width, height) {
{
return ctx.getImageData(x, y, width, height);
}}, "swingjs.api.HTML5CanvasContext2D,~N,~N,~N,~N");
c$.setLineWidth = Clazz.defineMethod (c$, "setLineWidth", 
function (ctx, d) {
{
ctx.lineWidth = d;
}}, "swingjs.api.HTML5CanvasContext2D,~N");
c$.setFont = Clazz.defineMethod (c$, "setFont", 
function (ctx, canvasFont) {
{
ctx.font = s;
}}, "swingjs.api.HTML5CanvasContext2D,~S");
c$.setColor = Clazz.defineMethod (c$, "setColor", 
function (ctx, s) {
{
ctx.fillStyle = ctx.strokeStyle = s;
}}, "swingjs.api.HTML5CanvasContext2D,~S");
