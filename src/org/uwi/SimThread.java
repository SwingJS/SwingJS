package org.uwi;

import swingjs.JSThread;

public class SimThread extends JSThread {

	private Boltzmann boltzmann;

	public SimThread(Boltzmann boltzmann) {
		super(null, "BoltzmannThread");
		this.boltzmann = boltzmann;
	}


	public void run() {
		run1(JSThread.INIT);
	}

	// @Override
	protected void run1(int state) {
		while (!interrupted()) {
			try {
				switch (state) {
				case JSThread.INIT:
					boltzmann.sjs_initSimulation();
					state = JSThread.LOOP;
					continue;
				case JSThread.LOOP:
					boolean repainted = boltzmann.sjs_checkRepaint();
					if (!boltzmann.sjs_loopSimulation()) {
						state = JSThread.DONE;
						continue;
					}
					if (repainted && sleepAndReturn(0, state))
						return;
					break;
				case JSThread.DONE:
					boltzmann.sjs_finalizeGraph();
					return;
				}

			} catch (Exception e) {
				state = JSThread.DONE;
			}
		}
		// normal exit
	}

}
