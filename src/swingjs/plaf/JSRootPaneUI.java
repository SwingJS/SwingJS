package swingjs.plaf;

import swingjs.api.DOMNode;

public class JSRootPaneUI extends JSLightweightUI {

	public JSRootPaneUI() {
		isContainer = true;
		setDoc();
	}

	@Override
	public DOMNode getDOMObject() {
		if (domNode == null)
			domNode = createDOMObject("div", id);
		return domNode;
	}

	@Override
	protected void installJSUI() {
	}

	@Override
	protected void uninstallJSUI() {
	}
}
