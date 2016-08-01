package swingjs.plaf;


import jsjava.awt.Dimension;
import jsjavax.swing.JMenuItem;
import swingjs.api.DOMNode;

public class JSMenuItemUI extends JSButtonUI {

	@Override
	protected DOMNode updateDOMNode() {
		if (domNode == null) {
			hasOuterDiv  = false;
		  domNode = createItem("_item", null);
		}
		return domNode;
	}

	@Override
	protected int getContainerHeight() {
		return height = 25;
	}

	@Override
	protected Dimension getCSSAdjustment() {
		return new Dimension(5, 0);
	}
	
	@Override
	protected void installUIImpl() {
		menuItem = (JMenuItem) c;
		super.installUIImpl();
	}

}
