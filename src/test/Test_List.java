package test;

//web_Ready
//web_AppletName= MyTest1
//web_Description= A test
//web_JavaVersion= http://www.dmitry
//web_AppletImage= dddd
//web_Category= test
//web_Date= $Date$
//web_Features= graphics, AWT-to-Swing

import javax.swing.JApplet;

import test.oracle.SplitPaneDemo2;
//import java.text.NumberFormat;
//import a2s.Canvas;
//import a2s.Panel;
//import javax.swing.JButton;
//import javax.swing.JScrollBar;

public class Test_List extends JApplet {

	@Override
	public void init() {
		test.oracle.ListDemo.createAndShowGUI();
	}

}
