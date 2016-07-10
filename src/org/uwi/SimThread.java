package org.uwi;

import swingjs.JSThread;

public class SimThread extends JSThread {

	private Boltzmann boltzmann;
	private boolean repainted;

	public SimThread(Boltzmann boltzmann) {
		super(null, "BoltzmannThread");
		this.boltzmann = boltzmann;
	}

	@Override
	protected boolean myInit() {
		boltzmann.sjs_initSimulation();
		return true;
	}


	@Override
	protected boolean isLooping() {
		repainted = boltzmann.sjs_checkRepaint();
		return boltzmann.sjs_loopSimulation();
	}

	@Override
	protected boolean myLoop() {
		return repainted;
	}

	@Override
	protected void whenDone() {
		boltzmann.sjs_finalizeGraph();
	}

	@Override
	protected int getDelayMillis() {
		return 0;
	}

	@Override
	protected void onException(Exception e) {
		System.out.println(e.getMessage());
	}

	@Override
	protected void doFinally() {		
	}

}
