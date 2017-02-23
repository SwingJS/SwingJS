package test;

//web_Ready
//web_AppletName= MyTest1
//web_Description= A test
//web_JavaVersion= http://www.dmitry
//web_AppletImage= dddd
//web_Category= test
//web_Date= $Date$
//web_Features= graphics, AWT-to-Swing

import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.text.DecimalFormat;

import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollBar;
import javax.swing.JTextField;
//import java.text.NumberFormat;
//import a2s.Canvas;
//import a2s.Panel;
//import javax.swing.JButton;
//import javax.swing.JScrollBar;

public class Test_Scroll extends JApplet {
	
	
	static DecimalFormat df = new DecimalFormat("0.00");
	
	boolean preferred = true;

	
	
	void setSize(JComponent c, int x, int y) {
		if (preferred)
			c.setPreferredSize(new Dimension(x, y));
		else
			c.setSize(x, y);
	}

	@Override
	public void init() {

		final JLabel label = new JLabel("hello");
		// label.setBounds(0, 60, 200, 60);
		setSize(label, 80, 20);
		label.setBackground(Color.yellow);
		label.setForeground(Color.BLUE);
		label.setOpaque(true);
		label.setHorizontalAlignment(JLabel.LEFT);
		label.setVerticalAlignment(JLabel.CENTER);

		final JTextField tf = new JTextField("12.5", 8);
		tf.setBackground(Color.black);
		tf.setForeground(Color.yellow);
		tf.setOpaque(true);
		setSize(tf, 80, 20);
		tf.addActionListener(new java.awt.event.ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				label.setBackground(Color.white);
				;
				label.setText(tf.getText());
				repaint();
			}
		});
		final JButton button = new JButton("test");
		setSize(button, 80, 20);
		button.setBackground(Color.orange);
		button.addActionListener(new java.awt.event.ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				label.setBackground(Color.green);
				tf.setBackground(Color.black);
				label.setText("Hello");
				repaint();
			}
		});

		JPanel p = new JPanel();
		// p.setLayout(new GridLayout(2, 2, 2, 2));
		getContentPane().add(p);

		mkBar(p, tf, JScrollBar.VERTICAL, 20, 200);
		p.add(label);
		p.add(tf);
		p.add(button);
		mkBar(p, tf, JScrollBar.HORIZONTAL, 300, 20);

		repaint();
	}

	JScrollBar mkBar(JPanel p, final JTextField tf, int orient, int x, int y) {
		JScrollBar bar = new JScrollBar(orient, 500, 10, 0, 1000);
		bar.addAdjustmentListener(new AdjustmentListener() {

			@Override
			public void adjustmentValueChanged(AdjustmentEvent e) {
				tf.setText(df.format(e.getValue() / 100.0));
			}
			
		});
		setSize(bar, x, y);
		bar.setBackground(Color.orange);
		bar.setForeground(Color.green);
		bar.setOpaque(true);
		p.add(bar);
		return bar;
	}

}
