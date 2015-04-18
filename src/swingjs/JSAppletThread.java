package swingjs;

import jsjava.lang.ThreadGroup;

public class JSAppletThread extends JSThread {

	private JSAppletPanel ap;

	public JSAppletThread(JSAppletPanel ap, ThreadGroup group, String name) {
		super(group, name, true);
		this.ap = ap;
	}

	@Override
	public void run1(int mode) {
		if (ap.run1(mode)) {
			dispatchAndReturn(null);
		}
	}
}
