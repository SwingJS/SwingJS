package swingjs.plaf;

import jsjava.awt.Component;
import jsjavax.swing.JComponent;
import jsjavax.swing.JScrollPane;
import jsjavax.swing.JViewport;

import swingjs.JSToolkit;
import swingjs.api.DOMNode;

public class JSScrollPaneUI extends LightweightUI {

	private JComponent scrolledComponent;
	private JScrollPane scrollpane;
	private JViewport viewport;
	private JSComponentUI scrolledUI;
	
	@Override
	public DOMNode getDOMObject() {
		isContainer = true;
		scrollpane = (JScrollPane) c;
		if (domNode == null) {
			domNode = createDOMObject("div", id);
		}
		JViewport v = scrollpane.getViewport();
		
		if (v != null) {
			viewport = v;
			System.out.println("JSScrollPaneUI v=" + v);
			JComponent sc = null;
			try {
				sc = (JComponent) v.getComponent(0);
			} catch (Exception e) {
				// unusable 
			}
			if (sc != null && sc != scrolledComponent) {
				scrolledComponent = sc;
				scrolledUI = JSToolkit.getUI(sc, false);
				scrollNode = scrolledUI.getOuterNode();
				DOMNode.setSize(scrollNode, c.getWidth(), c.getHeight());
				scrolledUI.scrollerNode = this;
				components = new Component[] { scrolledComponent };
			}
		}
		return domNode;
	}

	@Override
	protected void installJSUI() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub
		
	}

}
