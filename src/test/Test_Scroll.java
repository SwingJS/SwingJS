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
import java.awt.event.MouseWheelEvent;
import java.awt.event.MouseWheelListener;
import java.text.DecimalFormat;

import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollBar;
import javax.swing.JSlider;
import javax.swing.JTextField;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
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
		setSize(label, 80, 50);
		label.setBackground(Color.yellow);
		label.setForeground(Color.BLUE);
		label.setOpaque(true);
		label.setHorizontalAlignment(JLabel.RIGHT);
		label.setVerticalAlignment(JLabel.CENTER);

		final JTextField tf = new JTextField("12.5", 8);
		tf.setBackground(Color.black);
		tf.setForeground(Color.yellow);
		tf.setOpaque(true);
		setSize(tf, 80, 40);
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
		mkSlider(p, tf, JScrollBar.VERTICAL, 20, 200);
		mkSlider(p, tf, JScrollBar.VERTICAL, 20, 200).setInverted(true);
		p.add(label);
		p.add(tf);
		p.add(button);
		mkBar(p, tf, JScrollBar.HORIZONTAL, 100, 20);
		mkSlider(p, tf, JScrollBar.HORIZONTAL, 100, 20);
		mkSlider(p, tf, JScrollBar.HORIZONTAL, 100, 20).setInverted(true);

		repaint();
	}

	JScrollBar mkBar(JPanel p, final JTextField tf, int orient, int x, int y) {
		final JScrollBar bar = new JScrollBar(orient, 500, 10, 300, 1000);
		bar.addAdjustmentListener(new AdjustmentListener() {

			@Override
			public void adjustmentValueChanged(AdjustmentEvent e) {
				tf.setText(df.format(e.getValue() / 100.0));
			}

		});
		bar.addMouseWheelListener(new MouseWheelListener() {
			@Override
			public void mouseWheelMoved(MouseWheelEvent e) {
				int n = e.getWheelRotation();
				bar.setValue(bar.getValue() + n*5);
				//e.consume();
			}
		});
		setSize(bar, x, y);
		bar.setBackground(Color.orange);
		bar.setForeground(Color.green);
		bar.setOpaque(true);
		p.add(bar);
		return bar;
	}

	JSlider mkSlider(JPanel p, final JTextField tf, int orient, int x, int y) {
		final JSlider bar = new JSlider(orient, 300, 1000, 500);
		bar.addChangeListener(new ChangeListener() {
			@Override
			public void stateChanged(ChangeEvent e) {
				tf.setText(df.format(((JSlider) e.getSource()).getValue() / 100.0));
			}
		});
		bar.addMouseWheelListener(new MouseWheelListener() {
			@Override
			public void mouseWheelMoved(MouseWheelEvent e) {
				int n = e.getWheelRotation();
				bar.setValue(bar.getValue() + n*5);
				//e.consume();
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
