package a2s;

import java.awt.AWTEvent;
import java.awt.Button;
import java.awt.Choice;
import java.awt.Component;
import java.awt.Dialog;
import java.awt.Event;
import java.awt.Frame;
import java.awt.LayoutManager;
import java.awt.List;
import java.awt.MenuItem;
import java.awt.Point;
import java.awt.TextComponent;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.ComponentEvent;
import java.awt.event.FocusEvent;
import java.awt.event.InputEvent;
import java.awt.event.ItemEvent;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.event.WindowEvent;

import javax.swing.AbstractButton;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JPanel;

import jsjavax.swing.SwingUtilities;

public class Panel extends JPanel implements ActionListener {

	public Panel(LayoutManager layout) {
		super(layout);
	}

	public Panel() {
		super();
	}   
	
	
	public Component add(Component comp) {
		super.add(comp);
		if (comp instanceof AbstractButton) {
			((AbstractButton) comp).addActionListener(this);
		} else 		if (comp instanceof TextField) {
			((TextField) comp).addActionListener(this);
		}else		if (comp instanceof JComboBox) {
			((JComboBox) comp).addActionListener(this);
		}
  return comp;
}

	
	@Override
	public void actionPerformed(final ActionEvent e) {
	new A2SEvent(this, e).run();
	}
	
 	
//	public void addMouseListener(MouseListener c) {
//		//super.addMouseListener(c);
//		
//	}
//	public void addMouseMotionListener(MouseMotionListener c) {
//		//super.addMouseMotionListener(c);
//	}
}
