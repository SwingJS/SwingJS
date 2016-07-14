Clazz.declarePackage ("test.Circuit");
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.text = null;
this.value = 0;
this.minval = 0;
this.maxval = 0;
this.textf = null;
this.bar = null;
this.choice = null;
this.checkbox = null;
this.newDialog = false;
this.forceLargeM = false;
this.dimensionless = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "EditInfo");
Clazz.makeConstructor (c$, 
function (n, val, mn, mx) {
this.name = n;
this.value = val;
if (mn == 0 && mx == 0 && val > 0) {
this.minval = 1e10;
while (this.minval > val / 100) this.minval /= 10.;

this.maxval = this.minval * 1000;
} else {
this.minval = mn;
this.maxval = mx;
}this.forceLargeM = this.name.indexOf ("(ohms)") > 0 || this.name.indexOf ("(Hz)") > 0;
this.dimensionless = false;
}, "~S,~N,~N,~N");
Clazz.defineMethod (c$, "setDimensionless", 
function () {
this.dimensionless = true;
return this;
});
