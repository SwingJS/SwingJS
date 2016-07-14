package swingjs.plaf;

//import jsjava.awt.FontMetrics;
import jsjava.awt.Dimension;
import jsjavax.swing.AbstractButton;
import jsjavax.swing.JMenuItem;
import jsjavax.swing.LookAndFeel;
import jsjavax.swing.UIManager;
import jsjavax.swing.plaf.UIResource;
import swingjs.api.DOMNode;
/**
 * SWingJS implementation of stateful user interface for buttons. 
 * Modeled after javax.swing.plaf.basic.BasicButtonUI.java (commented out below).
 * 
 * @author Bob Hanson
 *
 */
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
