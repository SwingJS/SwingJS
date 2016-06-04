package swingjs.awt;

import javax.swing.JFrame;

public class Frame extends JFrame {

	public Frame(String title) {
		super(title);
	}

	public Frame() {
		super();
	}

	@Override
	public void remove(int i) {
		/**
		 * SwingJ has a somewhat reduced method set; we just use
		 * this interface to add ones we feel we need.
		 * 
		 * @j2sNative
		 * 
		 * this.removeInt(i);
		 * 
		 */
		{
			super.remove(i);
		}
	}
	
	public void setMenuBar(MenuBar m) {
		setJMenuBar(m);
	}

  public void unsetMenuBar() {
  	setJMenuBar(null);
	}


	public MenuBar getMenubar() {
		return (MenuBar) getJMenuBar();
	}

}
