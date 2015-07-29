package swingjs.plaf;

import swingjs.api.DOMNode;
import jsjavax.swing.JLabel;

public class JSLabelUI extends JSComponentUI {

	@Override
	public DOMNode getDOMObject() {
		if (domNode == null)
			textNode = domNode = createDOMObject("label", id);
		vCenter(domNode, 10);
		return setCssFont(DOMNode.setAttr(domNode, "innerHTML",((JLabel) c).getText()), c.getFont());
	}

	@Override
	protected void installJSUI() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub
		
	}

}
