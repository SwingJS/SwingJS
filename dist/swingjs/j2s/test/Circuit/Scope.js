Clazz.declarePackage ("test.Circuit");
Clazz.load (null, "test.Circuit.Scope", ["java.awt.Rectangle", "java.awt.image.MemoryImageSource", "java.lang.Double", "test.Circuit.CircuitElm", "$.LogicOutputElm", "$.MemristorElm", "$.OutputElm", "$.ProbeElm", "$.TransistorElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.FLAG_YELM = 32;
this.minV = null;
this.maxV = null;
this.minMaxV = null;
this.minI = null;
this.maxI = null;
this.minMaxI = null;
this.scopePointCount = 128;
this.ptr = 0;
this.ctr = 0;
this.speed = 0;
this.position = 0;
this.value = 0;
this.ivalue = 0;
this.text = null;
this.rect = null;
this.showI = false;
this.showV = false;
this.$showMax = false;
this.$showMin = false;
this.$showFreq = false;
this.lockScale = false;
this.plot2d = false;
this.plotXY = false;
this.elm = null;
this.xElm = null;
this.yElm = null;
this.imageSource = null;
this.image = null;
this.pixels = null;
this.draw_ox = 0;
this.draw_oy = 0;
this.dpixels = null;
this.sim = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "Scope");
Clazz.makeConstructor (c$, 
function (s) {
this.rect =  new java.awt.Rectangle ();
this.reset ();
this.sim = s;
}, "test.Circuit.CirSim");
Clazz.defineMethod (c$, "showCurrent", 
function (b) {
this.showI = b;
this.value = this.ivalue = 0;
}, "~B");
Clazz.defineMethod (c$, "showVoltage", 
function (b) {
this.showV = b;
this.value = this.ivalue = 0;
}, "~B");
Clazz.defineMethod (c$, "showMax", 
function (b) {
this.$showMax = b;
}, "~B");
Clazz.defineMethod (c$, "showMin", 
function (b) {
this.$showMin = b;
}, "~B");
Clazz.defineMethod (c$, "showFreq", 
function (b) {
this.$showFreq = b;
}, "~B");
Clazz.defineMethod (c$, "setLockScale", 
function (b) {
this.lockScale = b;
}, "~B");
Clazz.defineMethod (c$, "resetGraph", 
function () {
this.scopePointCount = 1;
while (this.scopePointCount <= this.rect.width) this.scopePointCount *= 2;

this.minV =  Clazz.newDoubleArray (this.scopePointCount, 0);
this.maxV =  Clazz.newDoubleArray (this.scopePointCount, 0);
this.minI =  Clazz.newDoubleArray (this.scopePointCount, 0);
this.maxI =  Clazz.newDoubleArray (this.scopePointCount, 0);
this.ptr = this.ctr = 0;
this.allocImage ();
});
Clazz.defineMethod (c$, "active", 
function () {
return this.elm != null;
});
Clazz.defineMethod (c$, "reset", 
function () {
this.resetGraph ();
this.minMaxV = 5;
this.minMaxI = .1;
this.speed = 64;
this.showI = this.showV = this.$showMax = true;
this.$showFreq = this.lockScale = this.$showMin = false;
this.plot2d = false;
if (this.elm != null && (Clazz.instanceOf (this.elm, test.Circuit.OutputElm) || Clazz.instanceOf (this.elm, test.Circuit.LogicOutputElm) || Clazz.instanceOf (this.elm, test.Circuit.ProbeElm))) this.showI = false;
this.value = this.ivalue = 0;
if (Clazz.instanceOf (this.elm, test.Circuit.TransistorElm)) this.value = 6;
});
Clazz.defineMethod (c$, "setRect", 
function (r) {
this.rect = r;
this.resetGraph ();
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.rect.width;
});
Clazz.defineMethod (c$, "rightEdge", 
function () {
return this.rect.x + this.rect.width;
});
Clazz.defineMethod (c$, "setElm", 
function (ce) {
this.elm = ce;
this.reset ();
}, "test.Circuit.CircuitElm");
Clazz.defineMethod (c$, "timeStep", 
function () {
if (this.elm == null) return;
var v = this.elm.getScopeValue (this.value);
if (v < this.minV[this.ptr]) this.minV[this.ptr] = v;
if (v > this.maxV[this.ptr]) this.maxV[this.ptr] = v;
var i = 0;
if (this.value == 0 || this.ivalue != 0) {
i = (this.ivalue == 0) ? this.elm.getCurrent () : this.elm.getScopeValue (this.ivalue);
if (i < this.minI[this.ptr]) this.minI[this.ptr] = i;
if (i > this.maxI[this.ptr]) this.maxI[this.ptr] = i;
}if (this.plot2d && this.dpixels != null) {
var newscale = false;
while (v > this.minMaxV || v < -this.minMaxV) {
this.minMaxV *= 2;
newscale = true;
}
var yval = i;
if (this.plotXY) yval = (this.yElm == null) ? 0 : this.yElm.getVoltageDiff ();
while (yval > this.minMaxI || yval < -this.minMaxI) {
this.minMaxI *= 2;
newscale = true;
}
if (newscale) this.clear2dView ();
var xa = v / this.minMaxV;
var ya = yval / this.minMaxI;
var x = Clazz.doubleToInt (this.rect.width * (1 + xa) * .499);
var y = Clazz.doubleToInt (this.rect.height * (1 - ya) * .499);
this.drawTo (x, y);
} else {
this.ctr++;
if (this.ctr >= this.speed) {
this.ptr = (this.ptr + 1) & (this.scopePointCount - 1);
this.minV[this.ptr] = this.maxV[this.ptr] = v;
this.minI[this.ptr] = this.maxI[this.ptr] = i;
this.ctr = 0;
}}});
Clazz.defineMethod (c$, "drawTo", 
function (x2, y2) {
if (this.draw_ox == -1) {
this.draw_ox = x2;
this.draw_oy = y2;
}if (this.draw_ox == x2 && this.draw_oy == y2) {
this.dpixels[x2 + this.rect.width * y2] = 1;
} else if (test.Circuit.CircuitElm.abs (y2 - this.draw_oy) > test.Circuit.CircuitElm.abs (x2 - this.draw_ox)) {
var sgn = test.Circuit.CircuitElm.sign (y2 - this.draw_oy);
var x;
var y;
for (y = this.draw_oy; y != y2 + sgn; y += sgn) {
x = this.draw_ox + Clazz.doubleToInt ((x2 - this.draw_ox) * (y - this.draw_oy) / (y2 - this.draw_oy));
this.dpixels[x + this.rect.width * y] = 1;
}
} else {
var sgn = test.Circuit.CircuitElm.sign (x2 - this.draw_ox);
var x;
var y;
for (x = this.draw_ox; x != x2 + sgn; x += sgn) {
y = this.draw_oy + Clazz.doubleToInt ((y2 - this.draw_oy) * (x - this.draw_ox) / (x2 - this.draw_ox));
this.dpixels[x + this.rect.width * y] = 1;
}
}this.draw_ox = x2;
this.draw_oy = y2;
}, "~N,~N");
Clazz.defineMethod (c$, "clear2dView", 
function () {
var i;
for (i = 0; i != this.dpixels.length; i++) this.dpixels[i] = 0;

this.draw_ox = this.draw_oy = -1;
});
Clazz.defineMethod (c$, "adjustScale", 
function (x) {
this.minMaxV *= x;
this.minMaxI *= x;
}, "~N");
Clazz.defineMethod (c$, "draw2d", 
function (g) {
var i;
if (this.pixels == null || this.dpixels == null) return;
var col = (this.sim.printableCheckItem.getState ()) ? 0xFFFFFFFF : 0;
for (i = 0; i != this.pixels.length; i++) this.pixels[i] = col;

for (i = 0; i != this.rect.width; i++) this.pixels[i + this.rect.width * (Clazz.doubleToInt (this.rect.height / 2))] = 0xFF00FF00;

var ycol = (this.plotXY) ? 0xFF00FF00 : 0xFFFFFF00;
for (i = 0; i != this.rect.height; i++) this.pixels[Clazz.doubleToInt (this.rect.width / 2) + this.rect.width * i] = ycol;

for (i = 0; i != this.pixels.length; i++) {
var q = Clazz.floatToInt (255 * this.dpixels[i]);
if (q > 0) this.pixels[i] = 0xFF000000 | (0x10101 * q);
this.dpixels[i] *= .997;
}
g.drawImage (this.image, this.rect.x, this.rect.y, null);
g.setColor (test.Circuit.CircuitElm.whiteColor);
g.fillOval (this.rect.x + this.draw_ox - 2, this.rect.y + this.draw_oy - 2, 5, 5);
var yt = this.rect.y + 10;
var x = this.rect.x;
if (this.text != null && this.rect.y + this.rect.height > yt + 5) {
g.drawString (this.text, x, yt);
yt += 15;
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "draw", 
function (g) {
if (this.elm == null) return;
if (this.plot2d) {
this.draw2d (g);
return;
}if (this.pixels == null) return;
var i;
var col = (this.sim.printableCheckItem.getState ()) ? 0xFFFFFFFF : 0;
for (i = 0; i != this.pixels.length; i++) this.pixels[i] = col;

var x = 0;
var maxy = Clazz.doubleToInt ((this.rect.height - 1) / 2);
var y = maxy;
var gotI = false;
var gotV = false;
var minRange = 4;
var realMaxV = -1.0E8;
var realMaxI = -1.0E8;
var realMinV = 1e8;
var realMinI = 1e8;
var curColor = 0xFFFFFF00;
var voltColor = (this.value > 0) ? 0xFFFFFFFF : 0xFF00FF00;
if (this.sim.scopeSelected == -1 && this.elm === this.sim.mouseElm) curColor = voltColor = 0xFF00FFFF;
var ipa = this.ptr + this.scopePointCount - this.rect.width;
for (i = 0; i != this.rect.width; i++) {
var ip = (i + ipa) & (this.scopePointCount - 1);
while (this.maxV[ip] > this.minMaxV) this.minMaxV *= 2;

while (this.minV[ip] < -this.minMaxV) this.minMaxV *= 2;

while (this.maxI[ip] > this.minMaxI) this.minMaxI *= 2;

while (this.minI[ip] < -this.minMaxI) this.minMaxI *= 2;

}
var gridStep = 1e-8;
var gridMax = (this.showI ? this.minMaxI : this.minMaxV);
while (gridStep * 100 < gridMax) gridStep *= 10;

if (maxy * gridStep / gridMax < .3) gridStep = 0;
var ll;
var sublines = (maxy * gridStep / gridMax > 3);
for (ll = -100; ll <= 100; ll++) {
if (ll != 0 && ((this.showI && this.showV) || gridStep == 0)) continue;
var yl = maxy - Clazz.doubleToInt (maxy * ll * gridStep / gridMax);
if (yl < 0 || yl >= this.rect.height - 1) continue;
col = ll == 0 ? 0xFF909090 : 0xFF404040;
if (ll % 10 != 0) {
col = 0xFF101010;
if (!sublines) continue;
}for (i = 0; i != this.rect.width; i++) this.pixels[i + yl * this.rect.width] = col;

}
gridStep = 1e-15;
var ts = this.sim.timeStep * this.speed;
while (gridStep < ts * 5) gridStep *= 10;

var tstart = this.sim.t - this.sim.timeStep * this.speed * this.rect.width;
var tx = this.sim.t - (this.sim.t % gridStep);
var first = 1;
for (ll = 0; ; ll++) {
var tl = tx - gridStep * ll;
var gx = Clazz.doubleToInt ((tl - tstart) / ts);
if (gx < 0) break;
if (gx >= this.rect.width) continue;
if (tl < 0) continue;
col = 0xFF202020;
first = 0;
if (((tl + gridStep / 4) % (gridStep * 10)) < gridStep) {
col = 0xFF909090;
if (((tl + gridStep / 4) % (gridStep * 100)) < gridStep) col = 0xFF4040D0;
}for (i = 0; i < this.pixels.length; i += this.rect.width) this.pixels[i + gx] = col;

}
if (this.value == 0 && this.showI) {
var ox = -1;
var oy = -1;
var j;
for (i = 0; i != this.rect.width; i++) {
var ip = (i + ipa) & (this.scopePointCount - 1);
var miniy = Clazz.doubleToInt ((maxy / this.minMaxI) * this.minI[ip]);
var maxiy = Clazz.doubleToInt ((maxy / this.minMaxI) * this.maxI[ip]);
if (this.maxI[ip] > realMaxI) realMaxI = this.maxI[ip];
if (this.minI[ip] < realMinI) realMinI = this.minI[ip];
if (miniy <= maxy) {
if (miniy < -minRange || maxiy > minRange) gotI = true;
if (ox != -1) {
if (miniy == oy && maxiy == oy) continue;
for (j = ox; j != x + i; j++) this.pixels[j + this.rect.width * (y - oy)] = curColor;

ox = oy = -1;
}if (miniy == maxiy) {
ox = x + i;
oy = miniy;
continue;
}for (j = miniy; j <= maxiy; j++) this.pixels[x + i + this.rect.width * (y - j)] = curColor;

}}
if (ox != -1) for (j = ox; j != x + i; j++) this.pixels[j + this.rect.width * (y - oy)] = curColor;

}if (this.value != 0 || this.showV) {
var ox = -1;
var oy = -1;
var j;
for (i = 0; i != this.rect.width; i++) {
var ip = (i + ipa) & (this.scopePointCount - 1);
var minvy = Clazz.doubleToInt ((maxy / this.minMaxV) * this.minV[ip]);
var maxvy = Clazz.doubleToInt ((maxy / this.minMaxV) * this.maxV[ip]);
if (this.maxV[ip] > realMaxV) realMaxV = this.maxV[ip];
if (this.minV[ip] < realMinV) realMinV = this.minV[ip];
if ((this.value != 0 || this.showV) && minvy <= maxy) {
if (minvy < -minRange || maxvy > minRange) gotV = true;
if (ox != -1) {
if (minvy == oy && maxvy == oy) continue;
for (j = ox; j != x + i; j++) this.pixels[j + this.rect.width * (y - oy)] = voltColor;

ox = oy = -1;
}if (minvy == maxvy) {
ox = x + i;
oy = minvy;
continue;
}for (j = minvy; j <= maxvy; j++) this.pixels[x + i + this.rect.width * (y - j)] = voltColor;

}}
if (ox != -1) for (j = ox; j != x + i; j++) this.pixels[j + this.rect.width * (y - oy)] = voltColor;

}var freq = 0;
if (this.$showFreq) {
var avg = 0;
for (i = 0; i != this.rect.width; i++) {
var ip = (i + ipa) & (this.scopePointCount - 1);
avg += this.minV[ip] + this.maxV[ip];
}
avg /= i * 2;
var state = 0;
var thresh = avg * .05;
var oi = 0;
var avperiod = 0;
var periodct = -1;
var avperiod2 = 0;
for (i = 0; i != this.rect.width; i++) {
var ip = (i + ipa) & (this.scopePointCount - 1);
var q = this.maxV[ip] - avg;
var os = state;
if (q < thresh) state = 1;
 else if (q > -thresh) state = 2;
if (state == 2 && os == 1) {
var pd = i - oi;
oi = i;
if (pd < 12) continue;
if (periodct >= 0) {
avperiod += pd;
avperiod2 += pd * pd;
}periodct++;
}}
avperiod /= periodct;
avperiod2 /= periodct;
var periodstd = Math.sqrt (avperiod2 - avperiod * avperiod);
freq = 1 / (avperiod * this.sim.timeStep * this.speed);
if (periodct < 1 || periodstd > 2) freq = 0;
}g.drawImage (this.image, this.rect.x, this.rect.y, null);
g.setColor (test.Circuit.CircuitElm.whiteColor);
var yt = this.rect.y + 10;
x += this.rect.x;
if (this.$showMax) {
if (this.value != 0) g.drawString (this.elm.getUnitText (realMaxV, this.elm.getScopeUnits (this.value)), x, yt);
 else if (this.showV) g.drawString (this.elm.getVoltageText (realMaxV), x, yt);
 else if (this.showI) g.drawString (this.elm.getCurrentText (realMaxI), x, yt);
yt += 15;
}if (this.$showMin) {
var ym = this.rect.y + this.rect.height - 5;
if (this.value != 0) g.drawString (this.elm.getUnitText (realMinV, this.elm.getScopeUnits (this.value)), x, ym);
 else if (this.showV) g.drawString (this.elm.getVoltageText (realMinV), x, ym);
 else if (this.showI) g.drawString (this.elm.getCurrentText (realMinI), x, ym);
}if (this.text != null && this.rect.y + this.rect.height > yt + 5) {
g.drawString (this.text, x, yt);
yt += 15;
}if (this.$showFreq && freq != 0 && this.rect.y + this.rect.height > yt + 5) g.drawString (this.elm.getUnitText (freq, "Hz"), x, yt);
if (this.ptr > 5 && !this.lockScale) {
if (!gotI && this.minMaxI > 1e-4) this.minMaxI /= 2;
if (!gotV && this.minMaxV > 1e-4) this.minMaxV /= 2;
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "speedUp", 
function () {
if (this.speed > 1) {
this.speed /= 2;
this.resetGraph ();
}});
Clazz.defineMethod (c$, "slowDown", 
function () {
this.speed *= 2;
this.resetGraph ();
});
Clazz.defineMethod (c$, "getMenu", 
function () {
if (this.elm == null) return null;
if (Clazz.instanceOf (this.elm, test.Circuit.TransistorElm)) {
this.sim.scopeIbMenuItem.setState (this.value == 1);
this.sim.scopeIcMenuItem.setState (this.value == 2);
this.sim.scopeIeMenuItem.setState (this.value == 3);
this.sim.scopeVbeMenuItem.setState (this.value == 4);
this.sim.scopeVbcMenuItem.setState (this.value == 5);
this.sim.scopeVceMenuItem.setState (this.value == 6 && this.ivalue != 2);
this.sim.scopeVceIcMenuItem.setState (this.value == 6 && this.ivalue == 2);
return this.sim.transScopeMenu;
} else {
this.sim.scopeVMenuItem.setState (this.showV && this.value == 0);
this.sim.scopeIMenuItem.setState (this.showI && this.value == 0);
this.sim.scopeMaxMenuItem.setState (this.$showMax);
this.sim.scopeMinMenuItem.setState (this.$showMin);
this.sim.scopeFreqMenuItem.setState (this.$showFreq);
this.sim.scopePowerMenuItem.setState (this.value == 1);
this.sim.scopeVIMenuItem.setState (this.plot2d && !this.plotXY);
this.sim.scopeXYMenuItem.setState (this.plotXY);
this.sim.scopeSelectYMenuItem.setEnabled (this.plotXY);
this.sim.scopeResistMenuItem.setState (this.value == 2);
this.sim.scopeResistMenuItem.setEnabled (Clazz.instanceOf (this.elm, test.Circuit.MemristorElm));
return this.sim.scopeMenu;
}});
Clazz.defineMethod (c$, "setValue", 
function (x) {
this.reset ();
this.value = x;
}, "~N");
Clazz.defineMethod (c$, "dump", 
function () {
if (this.elm == null) return null;
var flags = (this.showI ? 1 : 0) | (this.showV ? 2 : 0) | (this.$showMax ? 0 : 4) | (this.$showFreq ? 8 : 0) | (this.lockScale ? 16 : 0) | (this.plot2d ? 64 : 0) | (this.plotXY ? 128 : 0) | (this.$showMin ? 256 : 0);
flags |= 32;
var eno = this.sim.locateElm (this.elm);
if (eno < 0) return null;
var yno = this.yElm == null ? -1 : this.sim.locateElm (this.yElm);
var x = "o " + eno + " " + this.speed + " " + this.value + " " + flags + " " + this.minMaxV + " " + this.minMaxI + " " + this.position + " " + yno;
if (this.text != null) x += " " + this.text;
return x;
});
Clazz.defineMethod (c$, "undump", 
function (st) {
this.reset ();
var e =  new Integer (st.nextToken ()).intValue ();
if (e == -1) return;
this.elm = this.sim.getElm (e);
this.speed =  new Integer (st.nextToken ()).intValue ();
this.value =  new Integer (st.nextToken ()).intValue ();
var flags =  new Integer (st.nextToken ()).intValue ();
this.minMaxV =  new Double (st.nextToken ()).doubleValue ();
this.minMaxI =  new Double (st.nextToken ()).doubleValue ();
if (this.minMaxV == 0) this.minMaxV = .5;
if (this.minMaxI == 0) this.minMaxI = 1;
this.text = null;
this.yElm = null;
try {
this.position =  new Integer (st.nextToken ()).intValue ();
var ye = -1;
if ((flags & 32) != 0) {
ye =  new Integer (st.nextToken ()).intValue ();
if (ye != -1) this.yElm = this.sim.getElm (ye);
}while (st.hasMoreTokens ()) {
if (this.text == null) this.text = st.nextToken ();
 else this.text += " " + st.nextToken ();
}
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
} else {
throw ee;
}
}
this.showI = (flags & 1) != 0;
this.showV = (flags & 2) != 0;
this.$showMax = (flags & 4) == 0;
this.$showFreq = (flags & 8) != 0;
this.lockScale = (flags & 16) != 0;
this.plot2d = (flags & 64) != 0;
this.plotXY = (flags & 128) != 0;
this.$showMin = (flags & 256) != 0;
}, "java.util.StringTokenizer");
Clazz.defineMethod (c$, "allocImage", 
function () {
this.pixels = null;
var w = this.rect.width;
var h = this.rect.height;
if (w == 0 || h == 0) return;
if (this.sim.useBufferedImage) {
try {
var biclass = Clazz._4Name ("java.awt.image.BufferedImage");
var dbiclass = Clazz._4Name ("java.awt.image.DataBufferInt");
var rasclass = Clazz._4Name ("java.awt.image.Raster");
var cstr = biclass.getConstructor ([Number, Number, Number]);
this.image = cstr.newInstance ([ new Integer (w),  new Integer (h),  new Integer (1)]);
var m = biclass.getMethod ("getRaster", []);
var ras = m.invoke (this.image, []);
var db = rasclass.getMethod ("getDataBuffer", []).invoke (ras, []);
this.pixels = dbiclass.getMethod ("getData", []).invoke (db, []);
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
System.out.println ("BufferedImage failed");
} else {
throw ee;
}
}
}if (this.pixels == null) {
this.pixels =  Clazz.newIntArray (w * h, 0);
var i;
for (i = 0; i != w * h; i++) this.pixels[i] = 0xFF000000;

this.imageSource =  new java.awt.image.MemoryImageSource (w, h, this.pixels, 0, w);
this.imageSource.setAnimated (true);
this.imageSource.setFullBufferUpdates (true);
this.image = this.sim.cv.createImage (this.imageSource);
}this.dpixels =  Clazz.newFloatArray (w * h, 0);
this.draw_ox = this.draw_oy = -1;
});
Clazz.defineMethod (c$, "handleMenu", 
function (e, mi) {
if (mi === this.sim.scopeVMenuItem) this.showVoltage (this.sim.scopeVMenuItem.getState ());
if (mi === this.sim.scopeIMenuItem) this.showCurrent (this.sim.scopeIMenuItem.getState ());
if (mi === this.sim.scopeMaxMenuItem) this.showMax (this.sim.scopeMaxMenuItem.getState ());
if (mi === this.sim.scopeMinMenuItem) this.showMin (this.sim.scopeMinMenuItem.getState ());
if (mi === this.sim.scopeFreqMenuItem) this.showFreq (this.sim.scopeFreqMenuItem.getState ());
if (mi === this.sim.scopePowerMenuItem) this.setValue (1);
if (mi === this.sim.scopeIbMenuItem) this.setValue (1);
if (mi === this.sim.scopeIcMenuItem) this.setValue (2);
if (mi === this.sim.scopeIeMenuItem) this.setValue (3);
if (mi === this.sim.scopeVbeMenuItem) this.setValue (4);
if (mi === this.sim.scopeVbcMenuItem) this.setValue (5);
if (mi === this.sim.scopeVceMenuItem) this.setValue (6);
if (mi === this.sim.scopeVceIcMenuItem) {
this.plot2d = true;
this.plotXY = false;
this.value = 6;
this.ivalue = 2;
this.resetGraph ();
}if (mi === this.sim.scopeVIMenuItem) {
this.plot2d = this.sim.scopeVIMenuItem.getState ();
this.plotXY = false;
this.resetGraph ();
}if (mi === this.sim.scopeXYMenuItem) {
this.plotXY = this.plot2d = this.sim.scopeXYMenuItem.getState ();
if (this.yElm == null) this.selectY ();
this.resetGraph ();
}if (mi === this.sim.scopeResistMenuItem) this.setValue (2);
}, "java.awt.event.ItemEvent,~O");
Clazz.defineMethod (c$, "select", 
function () {
this.sim.mouseElm = this.elm;
if (this.plotXY) {
this.sim.plotXElm = this.elm;
this.sim.plotYElm = this.yElm;
}});
Clazz.defineMethod (c$, "selectY", 
function () {
var e = this.yElm == null ? -1 : this.sim.locateElm (this.yElm);
var firstE = e;
while (true) {
for (e++; e < this.sim.elmList.size (); e++) {
var ce = this.sim.getElm (e);
if ((Clazz.instanceOf (ce, test.Circuit.OutputElm) || Clazz.instanceOf (ce, test.Circuit.ProbeElm)) && ce !== this.elm) {
this.yElm = ce;
return;
}}
if (firstE == -1) return;
e = firstE = -1;
}
});
Clazz.defineStatics (c$,
"VAL_POWER", 1,
"VAL_IB", 1,
"VAL_IC", 2,
"VAL_IE", 3,
"VAL_VBE", 4,
"VAL_VBC", 5,
"VAL_VCE", 6,
"VAL_R", 2);
});
