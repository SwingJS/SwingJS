package awt2swing;

import javax.swing.JMenu;

public class Menu extends JMenu {

	public Menu(String title) {
		super(title);
		title=null;
	}

	public Menu() {
		super();
		String s = null;
	}

}
