package swingjs.plaf;

import jsjavax.swing.JRootPane;
import swingjs.api.DOMNode;

public class JSRootPaneUI extends JSLightweightUI {

	private JRootPane root;

	public JSRootPaneUI() {
		isContainer = true;
		setDoc();
	}

	@Override
	public DOMNode getDOMObject() {
		root = (JRootPane) c;
		if (domNode == null) {
			domNode = createDOMObject("div", id);
			outerNode = wrap("div", id, domNode);
			if (root.isAppletRoot) {
				// this is the main content pane for the embedded applet.
				swingjs.JSToolkit.getHTML5Applet(c)._getContentLayer()
						.appendChild(outerNode);
			}
		}
		return domNode;
	}

	@Override
	protected void installJSUI() {
	}

	@Override
	protected void uninstallJSUI() {
	}
}
