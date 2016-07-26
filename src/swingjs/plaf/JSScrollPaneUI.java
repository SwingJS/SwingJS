package swingjs.plaf;

import jsjava.awt.Dimension;
import jsjava.awt.Rectangle;
import jsjava.beans.PropertyChangeEvent;
import jsjava.beans.PropertyChangeListener;
import jsjavax.swing.JComponent;
import jsjavax.swing.JScrollBar;
import jsjavax.swing.JScrollPane;
import jsjavax.swing.JViewport;
import jsjavax.swing.event.ChangeEvent;
import jsjavax.swing.event.ChangeListener;
import swingjs.api.DOMNode;

public class JSScrollPaneUI extends JSLightweightUI  implements PropertyChangeListener, ChangeListener {

	/*
	 * This first implementation is an attempt to 
	 * reproduce Java's JScrollPane with its associated
	 * separate ViewPort, View, vertical and horizontal JScrollBars.
	 * 
	 * It is only marginally successful and requires that the scrollbars be
	 * implemented as sliders, primarily because it is too difficult to do
	 * actual scrollbars. Or at least that is what I concluded based on 
	 * looking at different browsers. 
	 * 
	 * So now the way it works is that we allow the scrolled component ("view")
	 * to scroll itself. Somewhat less control, but more along the lines of 
	 * letting the browser do its work when possible.
	 * 
	 *  
	 */
	
	private JComponent scrolledComponent;
	private JScrollPane scrollpane;
	private JViewport viewport;
	private JSComponentUI scrolledUI;
	private JSScrollBarUI horizNode;
	private JSScrollBarUI vertNode;
	private JScrollBar vscrollbar;
	private JScrollBar hscrollbar;
	
	@Override
	public DOMNode createDOMNode() {
		isContainer = true;
		if (domNode == null)
			domNode = newDOMObject("div", id);
		return domNode;
	}

	// all are required: 
	
	// children[0]  viewport
	// children[1]  vert scrollbar
	// children[2]  horiz scrollbar
	
	boolean scrollBarUIDisabled = true;

	private boolean setViewPort() {
		// first time through -- could be a view, but not necessarily
		// need to find a listener for this
		hscrollbar = scrollpane.getHorizontalScrollBar();
		hscrollbar.addChangeListener(this);
		hscrollbar.addPropertyChangeListener(this);
		vscrollbar = scrollpane.getVerticalScrollBar();
		vscrollbar.addChangeListener(this);
		vscrollbar.addPropertyChangeListener(this);
		
		horizNode = (JSScrollBarUI) hscrollbar.getUI();
		vertNode = (JSScrollBarUI) vscrollbar.getUI();
		vertNode.iVertScrollBar = true;
		horizNode.scrollPaneUI = vertNode.scrollPaneUI = this;
		viewport = scrollpane.getViewport();
		JComponent sc = (JComponent) viewport.getView();
		// for whatever reason, the component being scrolled 
		// in Java is referred to as the "view". This makes 
		// no sense to me; I am calling it scrolledComponent.
		if (sc == null || sc.ui == null)
			return false;
		if (sc != scrolledComponent) {
			if (scrolledUI != null && scrolledUI.scrollerNode == this)
				scrolledUI.scrollerNode = null;
			scrolledComponent = sc;
			scrolledUI = (JSComponentUI) sc.ui;
			scrolledUI.scrollerNode = this;
			scrollNode = scrolledUI.domNode; // why outer node?
			DOMNode.setSize(scrollNode, c.getWidth(), c.getHeight());
		}
		return true;
	}

	@Override
	protected void installUIImpl() {
		scrollpane = (JScrollPane) c;
		setViewPort();
		viewport.addChangeListener(this);
		viewport.addPropertyChangeListener(this);
	}

	@Override
	protected void uninstallUIImpl() {
		viewport.removeChangeListener(this);
		viewport.removePropertyChangeListener(this);
	  hscrollbar.removePropertyChangeListener(this);
	  vscrollbar.removePropertyChangeListener(this);
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		// from Java
		if (scrolledComponent == null && !setViewPort())
			return;
		if (scrollBarUIDisabled) {
//			if (scrolledComponent.uiClassID == "TextAreaUI") {
			// a problem will occur if the scrollers turn on; the content may be shifted
			// there is discussion of this on StackOverflow. It is possible to correct for it.
			Rectangle r1 = viewport.getBounds();
			Rectangle r2 = scrolledComponent.getBounds();
			if (!r1.equals(r2) && e.getSource() != viewport) // infinite loop if resizing
				scrolledComponent.setBounds(r1);
				DOMNode.setStyles(scrolledUI.domNode, "overflow-x", getScrollBarPolicyCSS(scrollpane.getHorizontalScrollBarPolicy()),
						"overflow-y", getScrollBarPolicyCSS(scrollpane.getHorizontalScrollBarPolicy()));
				DOMNode.setStyles(horizNode.jqSlider, "display", "none");
				DOMNode.setStyles(vertNode.jqSlider, "display", "none");
//			}
			return;
		}
		// isTainted = true;
		float v = vertNode.jSlider.getValue();
		float range = viewport.getHeight() - scrolledComponent.getHeight();
		int pos = Math.min(0, (int) (range * v / 100));
		System.out.println("v=" + v + " range=" + range + " pos=" + pos);
		DOMNode.setStyles(((JSComponentUI) scrolledComponent.ui).domNode, "top",
				pos + "px");
	}


	private String getScrollBarPolicyCSS(int policy) {
		switch  (policy % 10) {
		default:
		case 0: // as needed
			return "auto";
		case 1: // never
			return "none";
		case 2: // always
			return "scroll";
		}
	}

	@Override
	public Dimension getPreferredSize() {
		System.out.println(id + " getpreferredSize");
  	return null;
  }

		

}
