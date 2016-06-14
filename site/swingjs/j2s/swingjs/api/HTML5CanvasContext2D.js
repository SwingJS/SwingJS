Clazz.declarePackage ("swingjs.api");
c$ = Clazz.declareType (swingjs.api, "HTML5CanvasContext2D");
c$.stretchImage = Clazz.defineMethod (c$, "stretchImage", 
function (ctx, img, sx, sy, swidth, sheight, dx, dy, dwidth, dheight) {
{
ctx.drawImage(img, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);
}}, "swingjs.api.HTML5CanvasContext2D,swingjs.api.DOMNode,~N,~N,~N,~N,~N,~N,~N,~N");
c$.getImageData = Clazz.defineMethod (c$, "getImageData", 
function (ctx, width, height) {
{
return ctx.getImageData(0, 0, width, height);
}}, "swingjs.api.HTML5CanvasContext2D,~N,~N");
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
