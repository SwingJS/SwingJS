package swingjs.plaf;

import swingjs.api.DOMNode;
import jsjava.awt.Dimension;
import jsjava.beans.PropertyChangeEvent;
import jsjavax.swing.event.ChangeEvent;

public class JSScrollBarUI extends JSSliderUI {
	// not a perfect solution
	// TODO -- tie in setHorizontal/setVertical

	

	private boolean isInvisible;

	public JSScrollBarUI() {
		super();
		isScrollBar = true;
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		super.propertyChange(e);
		System.out.println(id + " propertyChange " + dumpEvent(e));
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		super.stateChanged(e);
		System.out.println(id + " stateChange " + dumpEvent(e));
	}


	@Override
	public Dimension getPreferredSize() {
		// thin because we are implementing jquery slider here
		int wh = (scrollPaneUI == null ? 15 : scrollPaneUI.scrollBarUIDisabled ? 0 : 15);
		// just used for width or height, but not both. I think.... 
		return new Dimension(wh, wh);
	}
	
	@Override
	public void setVisible(boolean b) {
		isInvisible = (scrollPaneUI != null && scrollPaneUI.scrollBarUIDisabled);
		b &= !isInvisible;
		DOMNode.setStyles(getOuterNode(), "display", b ? "block" : "none");
		DOMNode.setStyles(jqSlider, "display", b ? "block" : "none");
	}	
}



