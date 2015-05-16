/*
 * Copyright (c) 1994, 2010, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package swingjs;

import jsjava.awt.EventQueue;
import jsjava.awt.Toolkit;
import jsjava.awt.event.InvocationEvent;
import swingjs.api.JSFunction;

/**
 * A class that takes care of simple threading.
 * 
 * @author RM
 * 
 */
public abstract class JSThread extends Thread implements JSFunction {

	public static final int INIT = 0;
	public static final int LOOP = 1;
	public static final int DONE = 2;

	protected boolean isJS;
	protected boolean doDispatch = true;
	protected int msDelay;

	public JSThread(ThreadGroup group, String name) {
		super(group, name);
		/**
		 * @j2sNative
		 * 
		 * this.isJS = true;
		 */
		{}
	}

	public void run() {
		run1(INIT);
	}

	@Override
	public synchronized void start() {
		if (!isJS) {
			super.start();
			return;
		}
		JSToolkit.setTimeout(this, msDelay, 0);
	}

	/**
	 * set the delay time between run1 calls
	 * 
	 * @param ms
	 */
	public void setDelayMillis(int ms) {
		msDelay = ms;
	}

	/**
	 * a generic method that loops until done, or in JavaScript, will reenter and
	 * continue at the appropriate spot. Example given here
	 * 
	 * @param mode
	 */
	protected abstract void run1(int state);

	
	// protected void run1(int mode) {
	// try {
	// while (true)
	// switch (mode) {
	// case INIT:
	// // once-through stuff here
	// mode = LOOP;
	// break;
	// case LOOP:
	// if (!doDispatch || isInterrupted()) {
	// mode = DONE;
	// } else {
	// Runnable r = new Runnable() {
	// public void run() {
	// // put the loop code here
	// }
	// };
	// dispatchAndReturn(r);
	// if (isJS)
	// return;
	// }
	// break;
	// // add more cases as needed
	// case DONE:
	// // finish up here
	// if (isInterrupted())
	// return;
	// // or here
	// break;
	// }
	// } finally {
	// // stuff here to be executed after each loop in JS or at the end in Java
	// }
	// }

	@SuppressWarnings("unused")
	protected void dispatchAndReturn(Runnable r, int mode) {
		if (!isJS) {
			if (r != null)
				r.run();
			try {
				sleep(msDelay);
			} catch (InterruptedException e) {
				// ignore
			}
			return;
		}
		if (r != null) {
			EventQueue.invokeLater(r);
		}
		final JSFunction f = null;
		JSThread me = this;
		/**
		 * @j2sNative
		 * 
		 *            f = function() {me.run1(mode)};
		 * 
		 */
		{
		}
		r = new Runnable() {

			@Override
			public void run() {
				notifyMe(f);
			}

			private void notifyMe(JSFunction f) {
				/**
				 * @j2sNative
				 * 
				 *            f();
				 * 
				 */
				{
				}
			}
		};
		// need msDelay
		Toolkit.getEventQueue().postEvent(new JSEvent(this, r));

	}

}
