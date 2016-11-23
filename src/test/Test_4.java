package test;

import java.awt.AWTEvent;
import java.awt.BasicStroke;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Stroke;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.TextEvent;
import java.awt.event.TextListener;

import javax.swing.AbstractButton;
import javax.swing.ButtonGroup;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JTextField;
import javax.swing.JComponent;
import javax.swing.event.CaretEvent;
import javax.swing.event.CaretListener;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;

import swingjs.JSToolkit;

import java.awt.event.MouseMotionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Enumeration;


/**
 * To run test_4 in JavaScript, 
 * @author RM
 *
 */
public class Test_4 extends Test_5 {

	public String b = "test_4 b";
	public String a = "test_4 a";

	{
		System.out.println("whooah " + this.getClass().getName());
	}

	public String c = "test_4 c";
	public String[] d = { "3", "4" };

	public Test_4(int i) {
		super(i);
		System.out.println("test4.construct " + i);
	}

	public Test_4(float j, float k) {
		this(new Float(j));
		System.out.println("Test4 floatj,k done");
	}

	public Test_4(Number n) {
		super(n.intValue());		
		System.out.println("Test4 Number n done");
	}
	
	
	public Test_4(String s) {
		super(0);
		System.out.println("test4.construct " + s);
		myfunc(s);
		myfunc3();
		super.myfunc("from test4 " + s);
		
		myfunc(new Float(3));
		
		
		Test_6 x = new Test_6() {
			String zz = "zz";
			String[] xx0 = { "x1", "x2" };
			{
				String yy = "y";
				String[] xx = { "x1", "x2" };
				{
//error					System.out.println("whooah " + this.getClass().getName() + " xx0[0]=" + xx0[0]);
				}
			}
			public void x_1() {
				System.out.println("x_1 in x zz=" + zz);
			}
		};
		
    JButton btn = new JButton( "test" ) {
      {
      	// this block will throw an error in JavaScript because in the
      	// Luna j2s compiler, it is being duplicated. PhET build removes these extra blocks
      	
        setFont(new Font("SansSerif", Font.ITALIC, 10));
        addActionListener(new ActionListener() {
            public void actionPerformed( ActionEvent event ) {
            	System.out.println("action");
            }
        });
      }
    };

		x.x_1();
	}

	protected void myfunc(Number x) {
		System.out.println("test4.myfunct Number " + x);
	}

	protected void myfunc(String s) {
		System.out.println("test4.myfunc " + s);
		myfunc2(s);
	}

	protected void myfunc2(String s) {
		System.out.println("test4.myfunc2 " + s);
	}

	protected void myfunc3() {
		System.out.println("test4.myfunc3 this2 == this? " + (this2 == this)
				+ this2.equals(this));
		System.out.println("test4.myfunc3 this2.a=" + this2.a);
		System.out.println("test4.myfunc3 this.a=" + this.a);
	}

	public static void main(String[] args) {
		Test_4 t4 = new Test_4("main");
		System.out.println("after construction");
		t4.myfunc3();
		new Test_4(3.4f, 3.5f);
	}
}