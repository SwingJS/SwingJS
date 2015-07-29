package swingjs.plaf;

import swingjs.api.DOMNode;

public class JSRadioButtonMenuItemUI extends JSRadioButtonUI {
	
	@Override
	public DOMNode getDOMObject() {
		return getButtonObject("radio");
	}

	@Override
	protected String getPropertyPrefix() {
		return "RadioButtonMenuItem.";
	}


	
}
