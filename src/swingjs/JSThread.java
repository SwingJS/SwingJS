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

import jsjava.lang.Thread;
import jsjava.lang.ThreadGroup;

/**
 * A class that takes care of simple threading.
 * 
 * @author RM
 *
 */
public class JSThread extends Thread {

	protected static final int INIT = 0;
	protected static final int LOOP = 1;
	protected static final int DONE = 2;

	protected boolean isJS;
	protected boolean doDispatch = true;

	public JSThread(ThreadGroup group, String name, boolean isJS) {
		super(group, name);
		this.isJS = isJS;
	}

	public void run() {
		run1(INIT);
	}
	
  @SuppressWarnings("unused")
	@Override
  public synchronized void start() {
    if (!isJS) {
      super.start();
      return;
    }
		Object f = null;
		Object me = this;
		/**
		 * @j2sNative
		 * 
		 * f = function() { me.run(); };
		 * 
		 */
		{}
		JSToolkit.setTimeout(f);
  }

	/**
	 * a generic method that loops until done,
	 * or in JavaScript, will reenter and continue
	 * at the appropriate spot
	 * 
	 * @param mode
	 */
	protected void run1(int mode) {
		try {
			while (true)
				switch (mode) {
				case INIT:
					// once-through stuff here
					mode = LOOP;
					break;
				case LOOP:
					if (!doDispatch) {
						mode = DONE;
					} else {
						Runnable r = new Runnable(){ 
							public void run(){
								// put the loop code here
							}
						};
						dispatchAndReturn(r);
						if (isJS)
							return;
					}
					break;
			  // add more cases as needed
				case DONE:
					// finish up here
					if (!doDispatch)
						return;
					// or here
					break;
				}
		} finally {
			// stuff here to be executed after each loop in JS or at the end in Java
		}
	}

	@SuppressWarnings("unused")
	protected void dispatchAndReturn(Runnable r) {
		if (!isJS) {
			r.run();
			return;
		}
		Object f = null;
		int mode = LOOP;
		Object me = this;
		/**
		 * @j2sNative
		 * 
		 * f = function() { r.run();me.run1(mode) };
		 * 
		 */
		{}
		JSToolkit.setTimeout(f);
	}


}
