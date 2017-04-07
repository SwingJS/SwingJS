package test;

/*
        Handle Action Events for AWT Button Example
        This java example shows how to handle action event of AWT Button by implementing
        ActionListener interface.
 */

import java.awt.FlowLayout;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import a2s.Applet;
import a2s.Button;

/*
<applet code="HandleActionEventExample" width=200 height=200>
</applet>
 */

// SwingJS changes for Java:
// 1. rename class and add package
// 2. switch to a2s.Applet, a2s.Button
// 3. add FlowLayout
// 4. add super.paint(g);


public class Test_Action extends Applet implements ActionListener {

	String actionMessage = "";

	@Override
	public void init() {
		// create Buttons
		setLayout(new FlowLayout());
		Button Button1 = new Button("Ok");
		Button Button2 = new Button("Cancel");

		// add Buttons
		add(Button1);
		add(Button2);

		// set action listeners for buttons
		Button1.addActionListener(this);
		Button2.addActionListener(this);
	}

	@Override
	public void paint(Graphics g) {
		super.paint(g);
		g.drawString(actionMessage, 10, 50);
	}

	@Override
	public void actionPerformed(ActionEvent ae) {

		/*
		 * Get the action command using String getActionCommand() method.
		 */

		String action = ae.getActionCommand();

		if (action.equals("Ok"))
			actionMessage = "Ok Button Pressed";
		else if (action.equals("Cancel"))
			actionMessage = "Cancel Button Pressed";

		repaint();
	}
}
