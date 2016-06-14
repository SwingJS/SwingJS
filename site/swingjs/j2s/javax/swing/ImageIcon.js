Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.Icon", "java.lang.StringBuilder"], "javax.swing.ImageIcon", ["java.awt.Toolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.filename = null;
this.location = null;
this.image = null;
this.loadStatus = 0;
this.imageObserver = null;
this.description = null;
this.width = -1;
this.height = -1;
Clazz.instantialize (this, arguments);
}, javax.swing, "ImageIcon", null, javax.swing.Icon);
Clazz.makeConstructor (c$, 
function (filename, description) {
this.image = java.awt.Toolkit.getDefaultToolkit ().getImage (filename);
if (this.image == null) {
return;
}this.filename = filename;
this.description = description;
this.loadImage (this.image);
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (filename) {
this.construct (filename, filename);
}, "~S");
Clazz.makeConstructor (c$, 
function (location, description) {
this.image = java.awt.Toolkit.getDefaultToolkit ().getImage (location);
if (this.image == null) {
return;
}this.location = location;
this.description = description;
this.loadImage (this.image);
}, "java.net.URL,~S");
Clazz.makeConstructor (c$, 
function (location) {
this.construct (location, location.toExternalForm ());
}, "java.net.URL");
Clazz.makeConstructor (c$, 
function (image, description) {
this.construct (image);
this.description = description;
}, "java.awt.Image,~S");
Clazz.makeConstructor (c$, 
function (image) {
this.image = image;
var o = image.getProperty ("comment", this.imageObserver);
if (Clazz.instanceOf (o, String)) {
this.description = o;
}this.loadImage (image);
}, "java.awt.Image");
Clazz.makeConstructor (c$, 
function (imageData, description) {
this.image = java.awt.Toolkit.getDefaultToolkit ().createImage (imageData);
if (this.image == null) {
return;
}this.description = description;
this.loadImage (this.image);
}, "~A,~S");
Clazz.makeConstructor (c$, 
function (imageData) {
this.image = java.awt.Toolkit.getDefaultToolkit ().createImage (imageData);
if (this.image == null) {
return;
}var o = this.image.getProperty ("comment", this.imageObserver);
if (Clazz.instanceOf (o, String)) {
this.description = o;
}this.loadImage (this.image);
}, "~A");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "loadImage", 
function (image) {
this.width = image.getWidth (this.imageObserver);
this.height = image.getHeight (this.imageObserver);
}, "java.awt.Image");
Clazz.defineMethod (c$, "getImageLoadStatus", 
function () {
return this.loadStatus;
});
Clazz.defineMethod (c$, "getImage", 
function () {
return this.image;
});
Clazz.defineMethod (c$, "setImage", 
function (image) {
this.image = image;
this.loadImage (image);
}, "java.awt.Image");
Clazz.defineMethod (c$, "getDescription", 
function () {
return this.description;
});
Clazz.defineMethod (c$, "setDescription", 
function (description) {
this.description = description;
}, "~S");
Clazz.overrideMethod (c$, "paintIcon", 
function (c, g, x, y) {
if (this.imageObserver == null) {
g.drawImage (this.image, x, y, c);
} else {
g.drawImage (this.image, x, y, this.imageObserver);
}}, "java.awt.Component,java.awt.Graphics,~N,~N");
Clazz.overrideMethod (c$, "getIconWidth", 
function () {
return this.width;
});
Clazz.overrideMethod (c$, "getIconHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "setImageObserver", 
function (observer) {
this.imageObserver = observer;
}, "java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "getImageObserver", 
function () {
return this.imageObserver;
});
Clazz.defineMethod (c$, "toString", 
function () {
if (this.description != null) {
return this.description;
}return Clazz.superCall (this, javax.swing.ImageIcon, "toString", []);
});
Clazz.defineStatics (c$,
"mediaTrackerID", 0);
c$.TRACKER_KEY = c$.prototype.TRACKER_KEY =  new StringBuilder ("TRACKER_KEY");
});
