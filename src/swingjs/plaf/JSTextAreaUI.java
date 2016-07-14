package swingjs.plaf;

import jsjava.awt.Dimension;
import jsjava.awt.Insets;
import jsjavax.swing.text.JTextComponent;
import swingjs.api.DOMNode;

/**
 * SWingJS implementation of stateful user interface for buttons. 
 * Modeled after javax.swing.plaf.basic.BasicButtonUI.java (commented out below).
 * 
 * @author Bob Hanson
 *
 */
public class JSTextAreaUI extends JSTextUI {

	/**
	 * the radio or check-box or simple button
	 * 
	 */
	protected DOMNode domBtn;

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			updateHandler.checkDocument();
			domBtn = focusNode = enableNode = textNode = domNode = createDOMObject("textarea", id);
			DOMNode.setStyles(domNode, "resize", "none");
			setDataUI(domNode);
			if (((JTextComponent) c).isEditable()) {
				bindKeys(domNode);
				setFocusable();
			}
		}
		setCssFont(
				DOMNode.setAttr(domNode, "innerHTML", getComponentText()),
				c.getFont());
		if (!editable)
			DOMNode.setAttr(domNode, "readOnly", "true");
		return domNode;
	}

	private Insets myInsets = new Insets(0, 0, 5, 5); 
	@Override
	public Insets getInsets() {
		return myInsets;
	}
	
	@Override
	protected Dimension getCSSDimension(int w, int h) {
		return new Dimension(w - 5, h - 5);
	}
	
}
