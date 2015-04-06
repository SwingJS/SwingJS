package swingjs.test;

//import jsjava.awt.Font;
//import jsjava.awt.FontMetrics;
//import jsjava.awt.Graphics;

//import jsjavax.swing.JFrame;
//import jsjavax.swing.JLabel;
//import jsjavax.swing.JPanel;
//import jsjavax.swing.JWindow;

import java.util.AbstractMap;
import java.util.HashMap;

import jsjava.awt.Toolkit;

public class BugTest extends HashMap {

	private void test(AbstractMap a) {
		System.out.println(a + " is an AbstractMap");
	}

	private void test(Object ja) {
		System.out.println(ja + " is an Object");
	}

	private String name;

	public static void main(String[] args) {

		BugTest t = new BugTest();
		t.name = "test";

		t.test(t);
		t.test((Object) t);

		int[] a2 = new int[2];
		int[][] a20 = new int[2][];
		int[][] a23 = new int[2][3];

		printit(2, 3, 4, 5);
		Toolkit tk = Toolkit.getDefaultToolkit();

		System.out.println(tk.toString());

		// JPanel ca = new JPanel();
		// JWindow jp = new JWindow();
		// JLabel jl = new JLabel();
		// jp.pack();
		// Font f = new Font("SansSerif", Font.BOLD, 10);
		// Graphics g = jp.getGraphics();
		// FontMetrics fm = g.getFontMetrics(f);
		// float w = fm.stringWidth("hello");
		// System.out.println(w + " " + jl.getGraphics() + " " + g);

		// int[] a = new int[] {1,2,3,343};
		// int[][] b = new int[][] {new int[]{4,5},new int[]{5,6}};
		// int[][] c = new int[3][4];
		// float[][] d = new float[][] {new float[]{4,5},new float[]{5,6}};
		// float[][][] e = new float[][][] {new float[][] {new float[]{4,5},new
		// float[]{5,6}}};
		// String[] sa = new String[] {"a","b","c","d"};
		// String[][] sb = new String[][] {new String[]{"a","b","c","d"},new
		// String[]{"a","b","c","d"}};
		// String[][] sc = new String[3][4];
		// String[][] sd = new String[][] {new String[]{"a","b","c","d"},new
		// String[]{"a","b","c","d"}};
		System.out.println(args);
	}

	static void printit(int... t) {
		for (int i = 0; i < t.length; i++)
			System.out.println(t[i]);
	}
}