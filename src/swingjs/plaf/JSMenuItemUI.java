package swingjs.plaf;


import jsjava.awt.Dimension;
import jsjavax.swing.JMenuItem;
import swingjs.api.DOMNode;

public class JSMenuItemUI extends JSButtonUI {

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			menuItem = (JMenuItem) c;
		  domNode = createItem("_item", null);
			hasOuterDiv  = false;
		}
		return domNode;
	}

	@Override
	protected int getContainerHeight() {
		return height = 25;
	}

	@Override
	protected Dimension getCSSDimension(int w, int h) {
		return new Dimension(w + 5, h);
	}
	


}
