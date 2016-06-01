package awt2swing;

import java.awt.Component;
import java.awt.event.AdjustmentListener;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;

import javax.swing.JScrollBar;

import javax.swing.event.ChangeListener;

public class Scrollbar extends JScrollBar {

	public Scrollbar(int direction) {
		super(direction);
	}

	public Scrollbar() {
		super();
	}

	public Scrollbar(int orientation, int value, int extent, int min, int max) {
		super(orientation, value, extent, min, max);
	}
	
	public void addChangeListener(ChangeListener l) {
		addAdjustmentListener((AdjustmentListener) l);
	}

	public void removeChangeListener(ChangeListener l) {
		removeAdjustmentListener((AdjustmentListener) l);
	}
	
	public void setValue(int n) {
		super.setValue(n);
	}
	
	public int getMinimum() {
		return super.getMinimum();
	}

	public int getMaximum() {
		return super.getMaximum();
	}

	public int getValue() {
		return super.getValue();
	}

//	public void addMouseListener(MouseListener c) {
//		//super.addMouseListener(c);
//		
//	}
//	public void addMouseMotionListener(MouseMotionListener c) {
//		//super.addMouseMotionListener(c);
//	}

}
