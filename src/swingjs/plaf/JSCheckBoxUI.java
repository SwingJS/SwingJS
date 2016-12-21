package swingjs.plaf;

import swingjs.api.DOMNode;

/**
 * CheckboxUI implementation for BasicCheckboxUI
 * 
 * 
 */
public class JSCheckBoxUI extends JSRadioButtonUI {

	@Override
	protected DOMNode updateDOMNode() {
		return updateButton("checkBox");
	}

	@Override
	protected String getPropertyPrefix() {
		return "CheckBox.";
	}

}
