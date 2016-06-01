package awt2swing;

import javax.swing.JCheckBoxMenuItem;

public class CheckboxMenuItem extends JCheckBoxMenuItem {

	public CheckboxMenuItem(String string) {
		super(string);
	}

	public CheckboxMenuItem() {
	}

	public CheckboxMenuItem(String string, boolean b) {
		super(string, b);
	}

	public boolean getState() {
		return isSelected();
	}
	
	
	public void setState(boolean tf) {
		setSelected(tf);
	}


}
