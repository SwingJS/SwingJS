package swingjs.plaf;

import jsjavax.swing.JMenuItem;

public class JSRadioButtonMenuItemUI extends JSRadioButtonUI {
	
	public JSRadioButtonMenuItemUI() {
		super();
		isMenuItem = true;
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
