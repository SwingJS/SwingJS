package swingjs.plaf;

import swingjs.api.DOMNode;

public class JSRootPaneUI extends JSLightweightUI {

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
