package swingjs.plaf;

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


	
}
