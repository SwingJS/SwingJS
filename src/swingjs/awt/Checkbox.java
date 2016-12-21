package swingjs.awt;

import javax.swing.JCheckBox;
import javax.swing.ButtonGroup;
import javax.swing.JRadioButton;

public class Checkbox extends JCheckBox {

	public Checkbox(String string) {
		super(string, false);
	}

	public Checkbox(String string, boolean b) {
		super(string, b);
	}

	// added to (slightly) simplify converting code that uses Checkbox radio buttons
	public static JRadioButton newRadioButton(String string, ButtonGroup bg, boolean b) {
		JRadioButton rb = new JRadioButton(string, b);
		bg.add(rb);
		return rb;
	}

	public Checkbox() {
		super();
	}

	public boolean getState() {
		return isSelected();
	}

	public void setState(boolean b) {
		setSelected(b);
	}

}
