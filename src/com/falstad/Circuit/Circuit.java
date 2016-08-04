package com.falstad.Circuit;

// Circuit.java (c) 2005,2008 by Paul Falstad, www.falstad.com


// see CirSim.java for JavaScript implementation notes.


//web_Ready
//web_AppletName= Circuit
//web_Description= An electronic circuit simulator.  When the applet starts up you will see an animated schematic of a simple LRC circuit. The green color indicates positive voltage.  The gray color indicates ground.  A red color indicates negative voltage.  The moving yellow dots indicate current.
//web_JavaSource= http://www.falstad.com/circuit/
//web_Location= com.falstad.Circuit.Circuit
//web_AppletImage= images/circuit.png
//web_Category= Physics
//web_Date= $Date: 2016-07-15 16:53:09 -0500 (Fri, 15 Jul 2016) $


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
		showFrame();
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
		super.paint(g); // paints background
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
