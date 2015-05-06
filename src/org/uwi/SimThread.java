package org.uwi;

import jsjava.lang.ThreadGroup;
import swingjs.JSThread;

public class SimThread extends Thread {

	private Boltzmann boltzmann;

//	public SimThread(ThreadGroup group, String name, boolean isJS) {
//		super(group, name, isJS);
//	}

	static boolean isJS;

	
	static {
		/**
		 * @j2sNative
		 * 
		 *            isJS = true;
		 */
		{
		}

	}
	
	public SimThread(Boltzmann boltzmann) {
		super("BoltzmannThread");
//		super(null, "BoltzmannThread", isJS);
		this.boltzmann = boltzmann;
	}


	public void run() {
		run1(JSThread.INIT);
	}

	// @Override
	protected void run1(int state) {
		while (true) {
			try {
				switch (state) {
				case JSThread.INIT:
					boltzmann.sjs_initSimulation();
					state = JSThread.LOOP;
					//$FALL-THROUGH$
				case JSThread.LOOP:
					boolean repainted = boltzmann.sjs_checkRepaint();
					if (boltzmann.sjs_loopSimulation()) {
						if (!repainted)
							continue;
						break;
					}
					state = JSThread.DONE;
					//$FALL-THROUGH$
				case JSThread.DONE:
					boltzmann.sjs_finalizeGraph();
					return;
				}
				sleep(1);
			} catch (Exception e) {
				state = JSThread.DONE;
			}
		}
	}

}
