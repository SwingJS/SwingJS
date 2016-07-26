package swingjs.plaf;

import jsjava.awt.Dimension;
import jsjavax.swing.JMenuItem;
import swingjs.api.DOMNode;

public class JSRadioButtonMenuItemUI extends JSRadioButtonUI {
	
	public JSRadioButtonMenuItemUI() {
		super();
		hasOuterDiv = false;
	}
	
	@Override
	public DOMNode createDOMNode() {
		return getButtonObject("radio");
	}

	@Override
	protected String getPropertyPrefix() {
		return "RadioButtonMenuItem.";
	}
	
	@Override
	protected void installUIImpl() {
		menuItem = (JMenuItem) c;
		super.installUIImpl();
	}
}
