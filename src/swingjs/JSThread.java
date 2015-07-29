package swingjs;

import java.awt.Toolkit;
import java.awt.event.InvocationEvent;
import swingjs.api.JSFunction;

/**
 * A class that takes care of simple threading. There are three states: INIT, LOOP, and DONE.
 * These states are passed into run1
 * 
 * 
 * @author Bob Hanson
 * 
 */
public abstract class JSThread extends Thread implements JSFunction {

	public static final int INIT = 0;
	public static final int LOOP = 1;
	public static final int DONE = 2;

	protected boolean isJS;
	
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

		/**
		 * @j2sNative
		 * 
		 *            swingjs.JSToolkit.setTimeout(this, 1, 0);
		 * 
		 */
		{
			super.start();
		}

	}

	/**
	 * a generic method that loops until done, or in JavaScript, will reenter and
	 * continue at the appropriate spot. Example given here
	 * 
	 * @param state
	 */
	protected abstract void run1(int state);

	
	// protected void run1(int state) {
	// try {
	// while (true)
	// switch (state) {
	// case INIT:
	// // once-through stuff here
	// state = LOOP;
	// break;
	// case LOOP:
	// if (isInterrupted()) {
	// state = DONE;
	// } else {
	// // put the loop code here
	// };
	// dispatchAndReturn(state);
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

	/**
	 * 
	 * @param r
	 * @param state
	 * @return true if we should interrupt (i.e. JavaScript)
	 * @throws InterruptedException
	 */
	protected boolean sleepAndReturn(final int delay, final int state)
			throws InterruptedException {
		if (!isJS) {
			sleep(delay);
			return false;
		}

		// in JavaScript, we need to do this through the system event queue,
		// which in JSToolkit takes care of all the "thread" handling.

		final JSThread me = this;
		Runnable r = new Runnable() {
			@Override
			public void run() {
				me.run1(state);
			}
		};
		/**
		 * @j2sNative
		 * 
		 *            setTimeout(
		 *              function() {java.awt.Toolkit.getDefaultToolkit().getSystemEventQueue().postEvent(new java.awt.event.InvocationEvent(me, r))}, 
		 *              delay
		 *             );
		 * 
		 */
		{
			// for reference only
			Toolkit.getDefaultToolkit().getSystemEventQueue()
					.postEvent(new InvocationEvent(me, r));
		}
		return true;
	}

}
