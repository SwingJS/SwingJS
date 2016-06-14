Clazz.declarePackage ("javax.swing");
Clazz.load (["java.io.FilterInputStream"], "javax.swing.ProgressMonitorInputStream", ["java.io.InterruptedIOException", "javax.swing.ProgressMonitor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.monitor = null;
this.nread = 0;
this.size = 0;
Clazz.instantialize (this, arguments);
}, javax.swing, "ProgressMonitorInputStream", java.io.FilterInputStream);
Clazz.makeConstructor (c$, 
function (parentComponent, message, $in) {
Clazz.superConstructor (this, javax.swing.ProgressMonitorInputStream, [$in]);
try {
this.size = $in.available ();
} catch (ioe) {
if (Clazz.exceptionOf (ioe, java.io.IOException)) {
this.size = 0;
} else {
throw ioe;
}
}
this.monitor =  new javax.swing.ProgressMonitor (parentComponent, message, null, 0, this.size);
}, "java.awt.Component,~O,java.io.InputStream");
Clazz.defineMethod (c$, "getProgressMonitor", 
function () {
return this.monitor;
});
Clazz.defineMethod (c$, "read", 
function () {
var c = this.$in.read ();
if (c >= 0) this.monitor.setProgress (++this.nread);
if (this.monitor.isCanceled ()) {
var exc =  new java.io.InterruptedIOException ("progress");
exc.bytesTransferred = this.nread;
throw exc;
}return c;
});
Clazz.defineMethod (c$, "read", 
function (b) {
var nr = this.$in.read (b);
if (nr > 0) this.monitor.setProgress (this.nread += nr);
if (this.monitor.isCanceled ()) {
var exc =  new java.io.InterruptedIOException ("progress");
exc.bytesTransferred = this.nread;
throw exc;
}return nr;
}, "~A");
Clazz.defineMethod (c$, "read", 
function (b, off, len) {
var nr = this.$in.read (b, off, len);
if (nr > 0) this.monitor.setProgress (this.nread += nr);
if (this.monitor.isCanceled ()) {
var exc =  new java.io.InterruptedIOException ("progress");
exc.bytesTransferred = this.nread;
throw exc;
}return nr;
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "skip", 
function (n) {
var nr = this.$in.skip (n);
if (nr > 0) this.monitor.setProgress (this.nread += nr);
return nr;
}, "~N");
Clazz.overrideMethod (c$, "close", 
function () {
this.$in.close ();
this.monitor.close ();
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.$in.reset ();
this.nread = this.size - this.$in.available ();
this.monitor.setProgress (this.nread);
});
});
