package swingjs.plaf;

import jsjava.awt.Dimension;
import jsjava.beans.PropertyChangeEvent;
import jsjava.beans.PropertyChangeListener;
import jsjavax.swing.JComponent;
import jsjavax.swing.JScrollBar;
import jsjavax.swing.JScrollPane;
import jsjavax.swing.JViewport;
import jsjavax.swing.event.ChangeEvent;
import jsjavax.swing.event.ChangeListener;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;

public class JSScrollPaneUI extends JSLightweightUI  implements PropertyChangeListener, ChangeListener {

	private JComponent scrolledComponent;
	private JScrollPane scrollpane;
	private JViewport viewport;
	private JSComponentUI scrolledUI;
	private JScrollBar horizBar;
	private JScrollBar vertBar;
	private JSScrollBarUI horizNode;
	private JSScrollBarUI vertNode;
	private boolean horizIsSet;
	private boolean vertIsSet;
	
	@Override
	public DOMNode createDOMNode() {
		isContainer = true;
		if (domNode == null)
			domNode = createDOMObject("div", id);
		scrollNode = scrolledUI.getOuterNode();
		DOMNode.setSize(scrollNode, c.getWidth(), c.getHeight());
		return domNode;
	}

	private void setViewPort() {
		if (viewport != null && scrolledComponent != null)
			return;
		scrollpane = (JScrollPane) c;
		viewport = scrollpane.getViewport();
		if (viewport == null)
			return;
		System.out.println("JSScrollPaneUI v=" + viewport);
		JComponent sc = null;
		try {
			sc = (JComponent) viewport.getComponent(0);
		} catch (Exception e) {
			// unusable
		}
		if (sc != null && sc != scrolledComponent) {
			scrolledComponent = sc;
			scrolledUI = JSToolkit.getUI(sc, false);
			scrolledUI.scrollerNode = this;
		}
	}

	@Override
	protected void installJSUI() {
		setViewPort();
		if (viewport != null) {
			viewport.addChangeListener(this);
			viewport.addPropertyChangeListener(this);
		}
	  scrollpane.addPropertyChangeListener(this);
	}

	@Override
	protected void uninstallJSUI() {
		if (viewport != null) {
			viewport.removeChangeListener(this);
			viewport.removePropertyChangeListener(this);
		}
	  scrollpane.removePropertyChangeListener(this);
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		Object src = e.getSource();
		System.out.println(id + " propertyChange " + prop + "  " + src);
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		if (!horizIsSet) {
			horizIsSet = true;
			horizBar = scrollpane.getHorizontalScrollBar();
			if (horizBar != null) {
				horizNode = (JSScrollBarUI) horizBar.getUI();
				horizBar.addChangeListener(this);
				horizBar.addPropertyChangeListener(this);
				// DOMNode.setStyles(horizNode.domNode, "width", viewport.getWidth() +
				// "px");
			}
		}
		if (!vertIsSet) {
			vertIsSet = true;
			vertBar = scrollpane.getVerticalScrollBar();
			if (vertBar != null) {
				vertNode = (JSScrollBarUI) vertBar.getUI();
				vertBar.addChangeListener(this);
				vertBar.addPropertyChangeListener(this);
				// DOMNode.setStyles(vertNode.domNode, "height", viewport.getHeight() +
				// "px");
			}
		}
		System.out.println(id + " stateChange ");
	}

	@Override
	public void notifyPropertyChanged(String prop) {
		System.out.println(id + " notifyPropertyChanged " + prop);
		notifyPropChangeCUI(prop);
	}
	

	@Override
	public Dimension getPreferredSize() {
  	return null;
  }

		

}
