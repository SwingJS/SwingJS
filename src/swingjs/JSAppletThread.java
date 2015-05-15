package swingjs;

import jsjavax.swing.SwingUtilities;

public class JSAppletThread extends JSThread {

	private JSAppletPanel ap;

	public JSAppletThread(JSAppletPanel ap, ThreadGroup group, String name) {
		super(group, name);
		this.ap = ap;
	}

	@Override
	public void run1(int mode) {
		mode = ap.run1(mode);
		if (mode != DONE)
			dispatchAndReturn(null, mode);
	}
	
	/**
	 * dispatch applet threads on the main EventQueue
	 */
	protected void dispatchAndReturn(Runnable r, int mode) {
		final int m = mode;
		SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				run1(m);
			}
		});
	}

}
