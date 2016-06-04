package swingjs.plaf;

import swingjs.api.DOMNode;

/**
 * CheckboxUI implementation for BasicCheckboxUI
 * 
 * 
 */
public class JSCheckBoxUI extends JSRadioButtonUI {

	//TODO: it is possible to click just to the right of the check box and have the effect in 
	//      without actually changing the checkbox. 
	@Override
	public DOMNode getDOMObject() {
		return getButtonObject("checkBox");
	}

	@Override
	protected String getPropertyPrefix() {
		return "CheckBox.";
	}

}
