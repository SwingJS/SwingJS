package test;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.swing.JApplet;
import javax.swing.JTextArea;

public class Test_Print extends JApplet {
	
  int ipt;

	@Override
	public void init() {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		pw.println("testing 1");
		pw.println("testing 2");
		pw.println("testing 3");
		pw.close();
		JTextArea ja = new JTextArea(30,60);
		ja.setText(sw.toString());
		add(ja);		
	}

} 