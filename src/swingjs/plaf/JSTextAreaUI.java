package swingjs.plaf;

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
	public DOMNode getDOMObject() {
		if (domNode == null) {
			updateHandler.checkDocument();
			domBtn = focusNode = enableNode = textNode = domNode = createDOMObject("textarea", id);
			bindMouse(domNode);
			bindKeys(domNode);
			setFocusable();
		}
		setCssFont(
				DOMNode.setAttr(domNode, "innerHTML", getComponentText()),
				c.getFont());
		if (!editable)
			DOMNode.setAttr(domNode, "readOnly", "true");
		return domNode;
	}

}
