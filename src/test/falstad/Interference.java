package test.falstad;

//Interference.java (C) 2002 by Paul Falstad, www.falstad.com
//
//Conversion to JavaScriipt by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
//import javax.swing.applet.Applet --> swingjs.awt
//
//import java.awt [Applet, Canvas, Checkbox, Choice, Label, Scrollbar] --> swingjs.awt

import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Insets;
import java.awt.LayoutManager;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.text.NumberFormat;


import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.SourceDataLine;

import swingjs.awt.Applet;
import swingjs.awt.Canvas;
import swingjs.awt.Checkbox;
import swingjs.awt.Frame;
import swingjs.awt.Label;
import swingjs.awt.Scrollbar;


class InterferenceCanvas extends Canvas {
 InterferenceFrame pg;
 InterferenceCanvas(InterferenceFrame p) {
	pg = p;
 }
 public Dimension getPreferredSize() {
	return new Dimension(300,400);
 }
 public void update(Graphics g) {
	pg.updateInterference(g);
 }
 public void paintComponent(Graphics g) {
	pg.updateInterference(g);
 }
};

class InterferenceLayout implements LayoutManager {
 public InterferenceLayout() {}
 public void addLayoutComponent(String name, Component c) {}
 public void removeLayoutComponent(Component c) {}
 public Dimension preferredLayoutSize(Container target) {
	return new Dimension(500, 500);
 }
 public Dimension minimumLayoutSize(Container target) {
	return new Dimension(100,100);
 }
 public void layoutContainer(Container target) {
	int barwidth = 0;
	int i;
	for (i = 1; i < target.getComponentCount(); i++) {
	    Component m = target.getComponent(i);
	    if (m.isVisible()) {
		Dimension d = m.getPreferredSize();
		if (d.width > barwidth)
		    barwidth = d.width;
	    }
	}
	Insets insets = target.insets();
	int targetw = target.size().width - insets.left - insets.right;
	int cw = targetw-barwidth;
	int targeth = target.size().height - (insets.top+insets.bottom);
	target.getComponent(0).move(insets.left, insets.top);
	target.getComponent(0).resize(cw, targeth);
	cw += insets.left;
	int h = insets.top;
	for (i = 1; i < target.getComponentCount(); i++) {
	    Component m = target.getComponent(i);
	    if (m.isVisible()) {
		Dimension d = m.getPreferredSize();
		if (m instanceof Scrollbar)
		    d.width = barwidth;
		if (m instanceof Label) {
		    h += d.height/5;
		    d.width = barwidth;
		}
		m.move(cw, h);
		m.resize(d.width, d.height);
		h += d.height;
	    }
	}
 }
};


public class Interference extends Applet {
 static InterferenceFrame ff;
 void destroyFrame() {
	if (ff != null)
	    ff.dispose();
	ff = null;
 }

 public static void main(String args[]) {
     ff = new InterferenceFrame(null);
     ff.init();
 }

 public void init() {
	ff = new InterferenceFrame(this);
	ff.init();
 }
 public void destroy() {
	if (ff != null)
	    ff.dispose();
	ff = null;
 }
};

class InterferenceFrame extends Frame
implements ComponentListener, ActionListener, ItemListener,
	     AdjustmentListener,
          MouseMotionListener, MouseListener, Runnable {
 
 Thread engine = null;

 Dimension winSize;
 Image dbimage;
 
 public String getAppletInfo() {
	return "Interference by Paul Falstad";
 }

 InterferenceFrame(Interference a) {
	super("Interference Applet");
	applet = a;
 }
 Interference applet;
 Checkbox soundCheck;
 Checkbox stereoCheck;
 Checkbox metricCheck;
 Scrollbar freqBar;
 Scrollbar phaseBar;
 Scrollbar brightnessBar;
 Scrollbar speakerSepBar;
 Scrollbar scaleBar;
 Scrollbar balanceBar;
 static final double pi = 3.14159265358979323846;
 int dragX, dragY, measureX, measureY;
 boolean dragging;
 boolean java2present;

 InterferenceCanvas cv;
 NumberFormat nf;

 public void init() {
	nf = NumberFormat.getInstance();
	nf.setMaximumFractionDigits(1);

	java2present = true;
	if (System.getProperty("java.version").indexOf("1.1") == 0)
	    java2present = false;
	setLayout(new InterferenceLayout());
	cv = new InterferenceCanvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	add(cv);

	add(soundCheck = new Checkbox("Sound"));
	soundCheck.addItemListener(this);

	add(stereoCheck = new Checkbox("Stereo"));
	stereoCheck.addItemListener(this);

	add(metricCheck = new Checkbox("Metric Units", true));
	metricCheck.addItemListener(this);

	add(new Label("Speaker Separation", Label.CENTER));
	add(speakerSepBar = new Scrollbar(Scrollbar.HORIZONTAL, 68, 1, 1, 600));
	speakerSepBar.addAdjustmentListener(this);

	add(new Label("Playing Frequency", Label.CENTER));
	add(freqBar = new Scrollbar(Scrollbar.HORIZONTAL, 750, 1, 0, 1100));
	freqBar.addAdjustmentListener(this);

	add(new Label("Phase Difference", Label.CENTER));
	add(phaseBar = new Scrollbar(Scrollbar.HORIZONTAL, 50, 1, 0, 100));
	phaseBar.addAdjustmentListener(this);

	add(new Label("Balance", Label.CENTER));
	add(balanceBar = new Scrollbar(Scrollbar.HORIZONTAL, 50, 1, 0, 100));
	balanceBar.addAdjustmentListener(this);

	add(new Label("Brightness", Label.CENTER));
	add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 280,
					  1, 1, 1000));
	brightnessBar.addAdjustmentListener(this);

	add(new Label("View Scale", Label.CENTER));
	add(scaleBar = new Scrollbar(Scrollbar.HORIZONTAL, 200, 1, 100, 1000));
	scaleBar.addAdjustmentListener(this);
	balanceBar.disable();
	phaseBar.disable();
	add(new Label("http://www.falstad.com", Label.CENTER));
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);
	resize(550, 415);
	handleResize();
	show();
 }

 void reinit() {
 }
 
 void handleResize() {
     Dimension d = winSize = cv.getSize();
	if (winSize.width == 0)
	    return;
	dbimage = createImage(d.width, d.height);
 }

 int getFreq() {
	return (int) (27.5*java.lang.Math.exp(freqBar.getValue()*.004158883084));
 }

 void doPlay() {
	if (!soundCheck.getState())
	    return;
	final int rate = 44100;
	playSampleCount = precalcSize/2;

	int i;
	byte b[] = new byte[precalcSize];
	double mult = 126;
	double k = getFreq()*2*pi/rate;
	int pd = rate/getFreq();
	double phase = phaseBar.getValue() * 2*pi/100.;
	double multR = balanceBar.getValue()/100.;
	int cycles = (int) (precalcSize/2 *k / (2*pi));
	blockAdder = 2*(int) (cycles*2*pi/k);
	if (!stereoCheck.getState()) {
	    phase = 0;
	    multR = .5;
	}
	double multL = 1-multR;
	double multMax = (multL < multR) ? multR : multL;
	multL /= multMax;
	multR /= multMax;
	for (i = 0; i != playSampleCount; i++) {
	    double q1 = multL*java.lang.Math.sin(i*k);
	    double q2 = multR*java.lang.Math.sin(i*k-phase);
	    b[i*2] = (byte) (q1*mult);
	    b[i*2+1] = (byte) (q2*mult);
	}
	//System.out.print(b[0] + " " + b[2] + " " + b[blockAdder-2] + " " + b[blockAdder] + " " + b[blockAdder+2] + "\n");
	//System.out.print(cycles + " " + blockAdder + "\n");
	AudioFormat format = new AudioFormat(rate, 8, 2, true, false);
	DataLine.Info info = new DataLine.Info(SourceDataLine.class, format);
	if (line == null) {
	    try {
		line = (SourceDataLine) AudioSystem.getLine(info);
		line.open(format, bufferSize);
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	    line.start();
	}
	lineBuffer = b;
	start();
	cv.repaint();
 }

 final int bufferSize = 8192;
 final int precalcSize = 16384;
 SourceDataLine line = null;
 byte lineBuffer[];
 int playSampleCount;
 int blockAdder;
 
 void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
	g.setColor(Color.black);
	int w = fm.stringWidth(s);
	g.fillRect((winSize.width-8-w)/2, y-fm.getAscent(),
		   w+8, fm.getAscent()+fm.getDescent());
	g.setColor(Color.white);
     g.drawString(s, (winSize.width-w)/2, y);
 }

 public void paintComponent(Graphics g) {
	cv.repaint();
 }

 final int gridSize = 100;

 public void updateInterference(Graphics realg) {
	if (!java2present) {
	    centerString(realg, "Need java2 for this applet.", 100);
	    return;
	}
	Graphics g = dbimage.getGraphics();
	if (winSize == null || winSize.width == 0)
	    return;
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());

	int x, y;
	double k = getFreq()*2*pi/34500.;
	double mult = brightnessBar.getValue()/100.;
	double phase = phaseBar.getValue() * 2*pi/100.;
	//System.out.print(k + " " + phase + "\n");
	int speakerSep = speakerSepBar.getValue();
	int scale = scaleBar.getValue();
	double scaler = scale/(double) gridSize;
	double multR = balanceBar.getValue()/100.;
	if (!stereoCheck.getState()) {
	    multR = .5;
	    phase = 0;
	}
	double multL = 1-multR;
	for (x = 0; x != gridSize; x++)
	    for (y = 0; y != gridSize; y++) {
		int x1 = x*winSize.width/gridSize;
		int y1 = y*winSize.height/gridSize;
		int x2 = (x+1)*winSize.width/gridSize;
		int y2 = (y+1)*winSize.height/gridSize;
		double xx = (x-gridSize/2)*scaler;
		double yy = y*scaler;
		double xx1 = xx+speakerSep/2.;
		double r1 = java.lang.Math.sqrt(xx1*xx1+yy*yy);
		double xx2 = xx-speakerSep/2.;
		double r2 = java.lang.Math.sqrt(xx2*xx2+yy*yy);
		double r1s = multL/r1;
		double r2s = multR/r2;
		r1 *= k;
		r2 *= k;
		double q1 = r1s*java.lang.Math.sin(r1)+
		    r2s*java.lang.Math.sin(r2+phase);
		double q2 = r1s*java.lang.Math.cos(r1)+
		    r2s*java.lang.Math.cos(r2+phase);
		double q = (q1*q1+q2*q2);
		q = java.lang.Math.log(q)/mult+5;
		if (q > 2)
		    q = 2;
		if (q < 0)
		    q = 0;
		int col = 0;
		if (r1s > .1 || r2s > .1)
		    col = 0xFF0000FF;
		else if (q < 1) {
		    int val = (int) (q * 255);
		    col = (255<<24) | (val<<8);
		} else {
		    int val = (int) ((q-1) * 255);
		    col = (255<<24) | (255<<8) | (val * 0x10001);
		}
		g.setColor(new Color(col));
		g.fillRect(x1, y1, x2-x1, y2-y1);
	    }
	int f = getFreq();
	g.setColor(Color.white);
	centerString(g, "Frequency = " + getFreq() + " Hz", winSize.height-100);
	centerString(g, "Wavelength = " + convertUnits(34500/getFreq()),
		     winSize.height-80);
	centerString(g, "Speaker separation = " + convertUnits(speakerSep),
		     winSize.height-60);
	centerString(g, "Phase difference = " + (int) (phase*180/pi) + "\u00b0",
		     winSize.height-40);
	if (dragging) {
	    g.setColor(Color.blue);
	    g.drawLine(dragX, dragY, measureX, measureY);
	    int xdist = measureX-dragX;
	    int ydist = measureY-dragY;
	    double xx = xdist*scaler*gridSize/winSize.width;
	    double yy = ydist*scaler*gridSize/winSize.height;
	    int cm = (int) java.lang.Math.sqrt(xx*xx+yy*yy);
	    g.setColor(Color.white);
	    centerString(g, "Path length = " + convertUnits(cm), winSize.height-20);
	}

	realg.drawImage(dbimage, 0, 0, this);
 }

 String convertUnits(int x) {
	if (metricCheck.getState())
	    return x + " cm";
	return nf.format(x/2.54) + "\"";
 }

 public void componentHidden(ComponentEvent e){}
 public void componentMoved(ComponentEvent e){}
 public void componentShown(ComponentEvent e) {
	cv.repaint();
 }

 public void componentResized(ComponentEvent e) {
	handleResize();
	cv.repaint(100);
 }
 public void actionPerformed(ActionEvent e) {
 }
 public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == freqBar || e.getSource() == phaseBar ||
	    e.getSource() == balanceBar)
	    doPlay();
	cv.repaint();
 }
 public void mouseDragged(MouseEvent e) {
	dragging = true;
	measureX = e.getX();
	measureY = e.getY();
	cv.repaint();
 }
 public void mouseMoved(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0)
	    return;
	cv.repaint();
 }
 public void mouseClicked(MouseEvent e) {
 }
 public void mouseEntered(MouseEvent e) {
 }
 public void mouseExited(MouseEvent e) {
 }
 public void mousePressed(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = true;
	measureX = dragX = e.getX();
	measureY = dragY = e.getY();
 }

 public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = false;
	cv.repaint();
 }

 public void itemStateChanged(ItemEvent e) {
	if (e.getItemSelectable() == soundCheck || e.getItemSelectable() ==
	    stereoCheck) {
	    doPlay();
	    if (!stereoCheck.getState()) {
		balanceBar.disable();
		phaseBar.disable();
	    } else {
		balanceBar.enable();
		phaseBar.enable();
	    }
	}
	cv.repaint();
 }

 public boolean handleEvent(Event ev) {
     if (ev.id == Event.WINDOW_DESTROY) {
         applet.destroyFrame();
	    soundCheck.setState(false);
         return true;
     }
     return super.handleEvent(ev);
 }

 public void start() {
	if (engine == null) {
	    engine = new Thread(this);
	    engine.start();
	}
 }

 public void stop() {
	if (engine != null && engine.isAlive()) {
	    engine.stop();
	}
	engine = null;
 }

 public void run() {
	try {
	    int offset = 0;
	    while (true) {
		if (!soundCheck.getState())
		    break;
		byte q[] = new byte[bufferSize];
		int i;
		int len = (bufferSize+offset > blockAdder)
		    ? blockAdder-offset : bufferSize;
		for (i = 0; i != len; i++)
		    q[i] = lineBuffer[i+offset];
		line.write(q, 0, len);
		offset += len;
		if (offset >= blockAdder)
		    offset = 0;
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	}
	engine = null;
 }
}
