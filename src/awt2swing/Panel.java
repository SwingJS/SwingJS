package awt2swing;

import java.awt.LayoutManager;

import javax.swing.JPanel;

public class Panel extends JPanel {

	public Panel(LayoutManager layout) {
		super(layout);
	}

	public void setName(String name) {
		System.out.println(name);
		super.setName(name);

	}
	public Panel() {
		super();
	}
	
//	public void addMouseListener(MouseListener c) {
//		//super.addMouseListener(c);
//		
//	}
//	public void addMouseMotionListener(MouseMotionListener c) {
//		//super.addMouseMotionListener(c);
//	}
}
