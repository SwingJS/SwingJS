package a2s;

import java.awt.Component;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;

import javax.swing.JApplet;
import javax.swing.JPanel;

@SuppressWarnings("serial")
public class Applet extends JApplet implements AdjustmentListener, ActionListener, KeyListener, MouseListener, MouseMotionListener {

	// Note: applet.paint(g) needs to include super.paint(g), or buttons will not
	// show.

	public void init() {
    addMouseListener(this);
	  addMouseMotionListener(this);
		setContentPane(new JPanel() {
			public void paintComponent(Graphics g) {
				super.paintComponent(g);
				//System.out.println("init " + this.getSize());
				try {
				if (this.getWidth() > 0)
					paintMe(g);
				} catch (Throwable e) {
					System.out.println(e);
					e.printStackTrace();
					/**
					 * @j2sNative
					 * 
					 * debugger;
					 */
					{}
				}
			}
		});
	}

	protected void paintMe(Graphics g) {
		// TODO Auto-generated method stub
	}

	public Component add(Component comp) {
		super.add(comp);
		return A2SEvent.addComponent(this, comp);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		new A2SEvent(this, e).run();
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		new A2SEvent(this, e).run();		
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		new A2SEvent(this, e).run();
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		new A2SEvent(this, e).run();
	}

	@Override
	public void mousePressed(MouseEvent e) {
		new A2SEvent(this, e).run();
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		new A2SEvent(this, e).run();
	}

	@Override
	public void mouseExited(MouseEvent e) {
		new A2SEvent(this, e).run();
	}

	@Override
	public void keyTyped(KeyEvent e) {
		new A2SEvent(this, e).run();	
	}

	@Override
	public void keyPressed(KeyEvent e) {
		new A2SEvent(this, e).run();	
	}

	@Override
	public void keyReleased(KeyEvent e) {
		new A2SEvent(this, e).run();	
	}

	@Override
	public void adjustmentValueChanged(AdjustmentEvent e) {
		new A2SEvent(this, e).run();		
	}

}
