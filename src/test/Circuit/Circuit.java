package test.Circuit;

// Circuit.java (c) 2005,2008 by Paul Falstad, www.falstad.com

import java.awt.Graphics;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import swingjs.awt.Applet;

public class Circuit extends Applet implements ComponentListener {
	static CirSim ogf;
	boolean finished = false;

	void destroyFrame() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
		finished = true;
	}

	boolean started = false;

	public void init() {
		addComponentListener(this);
	}

	public static void main(String args[]) {
		ogf = new CirSim(null);
		ogf.init();
	}

	public void showFrame() {
		if (finished) {
			repaint();
			return;
		}
		if (ogf == null) {
			started = true;
			ogf = new CirSim(this);
			ogf.init();
		}
		ogf.setVisible(true);
		repaint();
	}

	public void hideFrame() {
		if (finished)
			return;
		ogf.setVisible(false);
		repaint();
	}

	public void toggleSwitch(int x) {
		ogf.toggleSwitch(x);
	}

	public void paint(Graphics g) {
		String s = "Applet is open in a separate window.";
		if (ogf != null && !ogf.isVisible())
			s = "Applet window is hidden.";
		if (!started)
			s = "Applet is starting.";
		else if (ogf == null || finished)
			s = "Applet is finished.";
		else if (ogf != null && ogf.useFrame)
			ogf.triggerShow();
		g.drawString(s, 10, 30);
	}

	public void componentHidden(ComponentEvent e) {
	}

	public void componentMoved(ComponentEvent e) {
	}

	public void componentShown(ComponentEvent e) {
		showFrame();
	}

	public void componentResized(ComponentEvent e) {
		if (ogf != null)
			ogf.componentResized(e);
	}

	public void destroy() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
	}
};
