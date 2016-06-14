package swingjs.plaf;

import jsjavax.swing.JRootPane;
import jsjavax.swing.JWindow;
import jsjavax.swing.plaf.WindowUI;
import swingjs.api.DOMNode;

public class JSRootPaneUI extends JSLightweightUI {

	private JRootPane root;

	public JSRootPaneUI() {
		isContainer = true;
		setDoc();
	}

	@Override
	public DOMNode createDOMNode() {
		root = (JRootPane) c;
		if (domNode == null) {
			domNode = createDOMObject("div", id);
			outerNode = wrap("div", id, domNode);
			if (root.isAppletRoot) {
				// this is the main content pane for the embedded applet.
				swingjs.JSToolkit.getHTML5Applet(c)._getContentLayer()
						.appendChild(outerNode);
			} else {
				JWindow parent = (JWindow) c.getParent();
				JSComponentUI parentUI = (JSComponentUI) (Object) parent.getUI();
				DOMNode.add(parentUI.domNode, outerNode);
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
