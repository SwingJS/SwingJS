package swingjs.plaf;

import jsjava.awt.Dimension;
import swingjs.api.DOMNode;

public class JSRootPaneUI extends JSLightweightUI {

	public JSRootPaneUI() {
		isContainer = true;
		setDoc();
	}

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			domNode = newDOMObject("div", id);
		}
		return domNode;
	}

	@Override
	protected void installJSUI() {
	}

	@Override
	protected void uninstallJSUI() {
	}

	@Override
	public Dimension getPreferredSize() {
  	return null;
  }


}
