Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.security.AccessController", "jsjavax.swing.event.EventListenerList"], "jsjavax.swing.Timer", ["java.lang.IllegalArgumentException", "$.SecurityException", "jsjava.awt.event.ActionEvent", "$.ActionListener", "jsjava.security.PrivilegedAction", "jsjavax.swing.SwingUtilities", "$.TimerQueue"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listenerList = null;
this.$notify = false;
this.initialDelay = 0;
this.delay = 0;
this.repeats = true;
this.coalesce = true;
this.doPostEvent = null;
this.acc = null;
this.delayedTimer = null;
this.actionCommand = null;
if (!Clazz.isClassDefined ("jsjavax.swing.Timer.DoPostEvent")) {
jsjavax.swing.Timer.$Timer$DoPostEvent$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "Timer");
Clazz.prepareFields (c$, function () {
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
this.acc = jsjava.security.AccessController.getContext ();
});
Clazz.defineMethod (c$, "getAccessControlContext", 
function () {
if (this.acc == null) {
throw  new SecurityException ("Timer is missing AccessControlContext");
}return this.acc;
});
Clazz.makeConstructor (c$, 
function (delay, listener) {
this.delay = delay;
this.initialDelay = delay;
this.doPostEvent = Clazz.innerTypeInstance (jsjavax.swing.Timer.DoPostEvent, this, null);
if (listener != null) {
this.addActionListener (listener);
}}, "~N,jsjava.awt.event.ActionListener");
Clazz.defineMethod (c$, "addActionListener", 
function (listener) {
this.listenerList.add (jsjava.awt.event.ActionListener, listener);
}, "jsjava.awt.event.ActionListener");
Clazz.defineMethod (c$, "removeActionListener", 
function (listener) {
this.listenerList.remove (jsjava.awt.event.ActionListener, listener);
}, "jsjava.awt.event.ActionListener");
Clazz.defineMethod (c$, "getActionListeners", 
function () {
return this.listenerList.getListeners (jsjava.awt.event.ActionListener);
});
Clazz.defineMethod (c$, "fireActionPerformed", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjava.awt.event.ActionListener) {
(listeners[i + 1]).actionPerformed (e);
}}
}, "jsjava.awt.event.ActionEvent");
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
Clazz.defineMethod (c$, "timerQueue", 
($fz = function () {
return jsjavax.swing.TimerQueue.sharedInstance ();
}, $fz.isPrivate = true, $fz));
c$.setLogTimers = Clazz.defineMethod (c$, "setLogTimers", 
function (flag) {
jsjavax.swing.Timer.logTimers = flag;
}, "~B");
c$.getLogTimers = Clazz.defineMethod (c$, "getLogTimers", 
function () {
return jsjavax.swing.Timer.logTimers;
});
Clazz.defineMethod (c$, "setDelay", 
function (delay) {
if (delay < 0) {
throw  new IllegalArgumentException ("Invalid delay: " + delay);
} else {
this.delay = delay;
}}, "~N");
Clazz.defineMethod (c$, "getDelay", 
function () {
return this.delay;
});
Clazz.defineMethod (c$, "setInitialDelay", 
function (initialDelay) {
if (initialDelay < 0) {
throw  new IllegalArgumentException ("Invalid initial delay: " + initialDelay);
} else {
this.initialDelay = initialDelay;
}}, "~N");
Clazz.defineMethod (c$, "getInitialDelay", 
function () {
return this.initialDelay;
});
Clazz.defineMethod (c$, "setRepeats", 
function (flag) {
this.repeats = flag;
}, "~B");
Clazz.defineMethod (c$, "isRepeats", 
function () {
return this.repeats;
});
Clazz.defineMethod (c$, "setCoalesce", 
function (flag) {
var old = this.coalesce;
this.coalesce = flag;
if (!old && this.coalesce) {
this.cancelEvent ();
}}, "~B");
Clazz.defineMethod (c$, "isCoalesce", 
function () {
return this.coalesce;
});
Clazz.defineMethod (c$, "setActionCommand", 
function (command) {
this.actionCommand = command;
}, "~S");
Clazz.defineMethod (c$, "getActionCommand", 
function () {
return this.actionCommand;
});
Clazz.defineMethod (c$, "start", 
function () {
this.timerQueue ().addTimer (this, this.getInitialDelay ());
});
Clazz.defineMethod (c$, "isRunning", 
function () {
return this.timerQueue ().containsTimer (this);
});
Clazz.defineMethod (c$, "stop", 
function () {
this.cancelEvent ();
this.timerQueue ().removeTimer (this);
});
Clazz.defineMethod (c$, "restart", 
function () {
this.stop ();
this.start ();
});
Clazz.defineMethod (c$, "cancelEvent", 
function () {
this.$notify = (false);
});
Clazz.defineMethod (c$, "post", 
function () {
this.$notify = true;
if (!this.$notify || !this.coalesce) {
jsjava.security.AccessController.doPrivileged (((Clazz.isClassDefined ("jsjavax.swing.Timer$1") ? 0 : jsjavax.swing.Timer.$Timer$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.Timer$1, this, null)), this.getAccessControlContext ());
}});
c$.$Timer$DoPostEvent$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.Timer, "DoPostEvent", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
if (jsjavax.swing.Timer.logTimers) {
System.out.println ("Timer ringing: " + this.b$["jsjavax.swing.Timer"]);
}if (this.b$["jsjavax.swing.Timer"].$notify) {
this.b$["jsjavax.swing.Timer"].fireActionPerformed ( new jsjava.awt.event.ActionEvent (this.b$["jsjavax.swing.Timer"], 0, this.b$["jsjavax.swing.Timer"].getActionCommand (), System.currentTimeMillis (), 0));
if (this.b$["jsjavax.swing.Timer"].coalesce) {
this.b$["jsjavax.swing.Timer"].cancelEvent ();
}}});
Clazz.defineMethod (c$, "getTimer", 
function () {
return this.b$["jsjavax.swing.Timer"];
});
c$ = Clazz.p0p ();
};
c$.$Timer$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "Timer$1", null, jsjava.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
jsjavax.swing.SwingUtilities.invokeLater (this.b$["jsjavax.swing.Timer"].doPostEvent);
return null;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"logTimers", false);
});
