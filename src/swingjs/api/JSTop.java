package swingjs.api;

import jsjava.awt.Component;
import jsjava.awt.Dimension;
import jsjava.awt.Graphics;

public interface JSTop {

	void paint(Graphics g);

	void resize(int width, int height);

	void resize(Dimension defaultAppletSize);

	void setBounds(int i, int j, int width, int height);

	Component getRootPane();

	Component getContentPane();

	void setVisible(boolean b);

	boolean isVisible();

	int getWidth();

	int getHeight();

	
	// something that has a root pane

}
