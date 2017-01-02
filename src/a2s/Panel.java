package a2s;

import java.awt.Component;
import java.awt.LayoutManager;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.AbstractButton;
import javax.swing.JComboBox;
import javax.swing.JPanel;

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
