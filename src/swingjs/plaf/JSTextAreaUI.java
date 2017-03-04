package swingjs.plaf;

import java.awt.Event;

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
	protected DOMNode updateDOMNode() {
		if (domNode == null) {
			allowBackground = false;
			domBtn = focusNode = enableNode = textNode = valueNode = domNode = newDOMObject("textarea", id);
			DOMNode.setStyles(domNode, "resize", "none");
			setDataUI(domNode);
			bindJSEvents(domNode, "keydown keypress keyup focusout", Event.KEY_PRESS, false);
			addJQueryFocusCallbacks();
		}
		textListener.checkDocument();
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
	protected Dimension getCSSAdjustment(boolean addingCSS) {
		return (addingCSS ? new Dimension(-5, -12) : new Dimension(0, 0)); 
		// total hack -12 is to see full vertical scrollbar (Boltzmann)
	}

	@Override
	protected String getPropertyPrefix() {
		return "TextArea";
	}
	
}
