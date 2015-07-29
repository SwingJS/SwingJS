package swingjs.plaf;

import swingjs.api.DOMNode;

/**
 * Pluggable look and feel interface for JRootPane.
 * 
 * @author Scott Violet
 * @since 1.3
 */
public class JSRootPaneUI extends JSComponentUI {

	public JSRootPaneUI() {
		isContainer = true;
		setDoc();
	}

	@Override
	public DOMNode getDOMObject() {
		return null;
	}

	@Override
	protected void installJSUI() {
	}

	@Override
	protected void uninstallJSUI() {
	}
}
