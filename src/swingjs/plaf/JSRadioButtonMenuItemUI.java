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
		menuItem = (JMenuItem) c;
		return getButtonObject("radio");
	}

	@Override
	protected String getPropertyPrefix() {
		return "RadioButtonMenuItem.";
	}

}
