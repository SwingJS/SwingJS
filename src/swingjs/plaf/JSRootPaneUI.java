package swingjs.plaf;

import swingjs.api.DOMNode;

public class JSRootPaneUI extends LightweightUI {

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
