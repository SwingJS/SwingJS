package swingjs;

import jsjava.awt.Frame;
import jsjavax.swing.SwingUtilities;

/**
 * 
 * JSAppletThread maintains connection with the originating HTML5Applet, regardless of
 * the class. So one can retrieve the graphics context, for example, using
 * 
 * Thread.getCurrentThread().viewer.getGraphics()
 * 
 * a JDialog or JFrame can retrieve the current graphics.  
 * 
 * @author Bob Hanson
 *
 */
public class JSAppletThread extends JSThread {

	public JSAppletViewer appletViewer;

	public JSAppletThread(JSAppletViewer ap, ThreadGroup group, String name) {
		super(group, name);
		appletViewer = ap;
	}

	@Override
	public void run1(int mode) {
		mode = appletViewer.run1(mode);
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
