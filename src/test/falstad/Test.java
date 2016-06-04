// AtomViewer.java (c) 2002 by Paul Falstad, www.falstad.com.
// Rendering algorithm in this applet is based on the description of
// the algorithm used in Atom in a Box by Dean Dauger (www.dauger.com).
// We raytrace through a 3-d dataset, sampling a number of points and
// integrating over them using Simpson's rule.

package test.falstad;

// Conversion to JavaScript by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
// Changes include:
//
// import javax.swing.applet.Applet --> swingjs.awt
// 
// import java.awt.[Button, Canvas, Checkbox, CheckboxMenuItem, Choice, Frame, Label, Scrollbar, Menu, MenuBar, MenuItem] --> swingjs.awt
//
// Applet.show does not trigger componentShown(e); showFrame() moved to AtomViewer.init()
// 
// AtomViewerFrame.init() changed to AtomViewerFrame.initA
//
// note: In JavaScript System.getProperty("java.class.version") is null, so useBufferedImage is false
//
// added else statement at the end of layoutContainer to set components visibility to true
//
// removed paint(Graphics g) entirely, allowing menubar to display
//
// in both setLValue() and setNValue() changed removeAll to removeAllItems
//
// deprecated method .insets --> .getInsets
// deprecated method .size --> .getSize
// deprecated method .resize --> .setSize
// deprecated method .move --> .setLocation
// deprecated method .show --> .setVisible(true)
// deprecated method .hide --> .setVisible(false)
// deprecated method .enable --> .setEnabled(true)
// deprecated method .disable --> .setEnabled(false)
// deprecated method .inside --> .contains
// deprecated method .handleEvent --> .processEvent

import swingjs.awt.Applet;


public class Test extends Applet {

	@Override
	public void init() {
    new AtomFrame(this);
	}

}


class AtomFrame {

// note: the following does not work, because "test" holds the applet object, but
//       it is also the root directory of this package, 
//       and "BasisState" is test.falstad.BasisState.
//       But then we will be looking for "test.falstad" where "test" is the local variable, not the package.
//
//  thus, it is important to not use a variable name that is a root directory -- swingjs, org, java, etc.
//  at least, not in a the same method that also refers to that root directory.	
//	
//	AtomFrame(Test test) {
//		BasisState x = new BasisState();
//		x.set(3);
//		System.out.println("testing " + x.getText());
//	}
//
	
	AtomFrame(Test test) {
		BasisState x = new BasisState();
		x.set(3);
		System.out.println("testing " + x.getText());
	}

	class Complex {
		public double re, im, mag, phase;

		Complex() {
			re = im = mag = phase = 0;
		}

		Complex(double r, double i) {
			set(r, i);
		}

		double magSquared() {
			return mag * mag;
		}

		void set(double aa, double bb) {
			re = aa;
			im = bb;
			setMagPhase();
		}

		void set(double aa) {
			re = aa;
			im = 0;
			setMagPhase();
		}

		void set(Complex c) {
			re = c.re;
			im = c.im;
			mag = c.mag;
			phase = c.phase;
		}

		void add(double r) {
			re += r;
			setMagPhase();
		}

		void add(double r, double i) {
			re += r;
			im += i;
			setMagPhase();
		}

		void add(Complex c) {
			re += c.re;
			im += c.im;
			setMagPhase();
		}

		void square() {
			set(re * re - im * im, 2 * re * im);
		}

		void mult(double c, double d) {
			set(re * c - im * d, re * d + im * c);
		}

		void mult(double c) {
			re *= c;
			im *= c;
			mag *= c;
		}

		void mult(Complex c) {
			mult(c.re, c.im);
		}

		void setMagPhase() {
			mag = Math.sqrt(re * re + im * im);
			phase = Math.atan2(im, re);
		}

		void setMagPhase(double m, double ph) {
			mag = m;
			phase = ph;
			re = m * Math.cos(ph);
			im = m * Math.sin(ph);
		}

		void rotate(double a) {
			setMagPhase(mag, (phase + a) % (2 * Math.PI));
		}

		void conjugate() {
			im = -im;
			phase = -phase;
		}
	}

	abstract class State extends Complex {
		double elevel;

		void convertDerivedToBasis() {
		}

		void convertBasisToDerived() {
		}

		void setBasisActive() {
		}

		abstract String getText();
		
	}

	class BasisState extends State {
		int n, l, m;

		String getText() {
			return "n = " + n + ", l = " + l + ", m = " + m;
		}
		
	}


}

