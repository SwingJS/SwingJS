package swingjs.plaf;

//import jsjava.awt.FontMetrics;
import java.awt.event.KeyEvent;

import jsjava.awt.Dimension;
import jsjava.awt.event.ActionEvent;
import jsjavax.swing.Action;
import jsjavax.swing.JTextField;
import jsjavax.swing.text.JTextComponent;
import swingjs.api.DOMNode;

/**
 * A minimal implementation of a test field ui/peer
 * 
 * @author Bob Hanson
 *
 */
public class JSTextFieldUI extends JSTextUI {

	protected String inputType = "text";

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			textListener.checkDocument();
			focusNode = enableNode = valueNode = domNode = DOMNode
					.setStyles(newDOMObject("input", id, "type", inputType),
							"padding", "0px 1px");
			vCenter(domNode, -10);
			setDataUI(domNode);
			if (((JTextComponent) c).isEditable()) {
				bindKeys(domNode);
				setFocusable();
			}
		}
		setCssFont(setProp(domNode, "value", getComponentText()),
				c.getFont());
		if (!editable)
			DOMNode.setAttr(domNode, "readOnly", "true");
		return domNode;
	}

	@Override
	protected Dimension getCSSAdjustment() {
		return new Dimension(0, -2);
	}
	
	@Override
	boolean handleEnter(int eventType) {
		if (eventType == KeyEvent.KEY_PRESSED) {
			Action a = getActionMap().get(JTextField.notifyAction);
			if (a != null)
				a.actionPerformed(new ActionEvent(c, ActionEvent.ACTION_PERFORMED, JTextField.notifyAction, System.currentTimeMillis(), 0));
		}
		return true;
	}


}
