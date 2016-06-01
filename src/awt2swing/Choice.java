package awt2swing;

import javax.swing.JComboBox;


public class Choice extends JComboBox {

	public void select(Object key) {
		setSelectedItem(key);
	}

}
