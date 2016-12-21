package swingjs.plaf;

import jsjavax.swing.JMenuItem;

public class JSCheckBoxMenuItemUI extends JSCheckBoxUI {

	public JSCheckBoxMenuItemUI() {
		super();
		isMenuItem = true;
	}
	
	@Override
	protected String getPropertyPrefix() {
		return "CheckBoxMenuItem.";
	}

	@Override
	protected void installUIImpl() {
		menuItem = (JMenuItem) c;
		super.installUIImpl();
	}
}
