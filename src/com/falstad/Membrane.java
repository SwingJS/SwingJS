package com.falstad;

// Membrane.java (C) 2001 by Paul Falstad, www.falstad.com

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
import java.awt.Rectangle;
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
import java.awt.image.MemoryImageSource;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Random;

import swingjs.awt.Applet;
import swingjs.awt.Button;
import swingjs.awt.Canvas;
import swingjs.awt.Checkbox;
import swingjs.awt.Choice;
import swingjs.awt.Frame;
import swingjs.awt.Label;
import swingjs.awt.Scrollbar;

class MembraneCanvas extends Canvas {
	MembraneFrame pg;

	MembraneCanvas(MembraneFrame p) {
		pg = p;
	}

	public Dimension getPreferredSize() {
		return new Dimension(300, 400);
	}

	public void update(Graphics g) {
		pg.updateMembrane(g);
	}

	public void paintComponent(Graphics g) {
		pg.updateMembrane(g);
	}
};

class MembraneLayout implements LayoutManager {
	public MembraneLayout() {
	}

	public void addLayoutComponent(String name, Component c) {
	}

	public void removeLayoutComponent(Component c) {
	}

	public Dimension preferredLayoutSize(Container target) {
		return new Dimension(500, 500);
	}

	public Dimension minimumLayoutSize(Container target) {
		return new Dimension(100, 100);
	}

	public void layoutContainer(Container target) {
		Insets insets = target.insets();
		int targetw = target.size().width - insets.left - insets.right;
		int cw = targetw * 7 / 10;
		int targeth = target.size().height - (insets.top + insets.bottom);
		target.getComponent(0).move(insets.left, insets.top);
		target.getComponent(0).resize(cw, targeth);
		int barwidth = targetw - cw;
		cw += insets.left;
		int i;
		int h = insets.top;
		for (i = 1; i < target.getComponentCount(); i++) {
			Component m = target.getComponent(i);
			if (m.isVisible()) {
				Dimension d = m.getPreferredSize();
				if (m instanceof Scrollbar)
					d.width = barwidth;
				if (m instanceof Choice)
					d.width = barwidth;
				if (m instanceof Label) {
					h += d.height / 5;
					d.width = barwidth;
				}
				m.move(cw, h);
				m.resize(d.width, d.height);
				h += d.height;
			}
		}
	}
};

public class Membrane extends Applet implements ComponentListener {
	MembraneFrame ogf;

	void destroyFrame() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
	}

	boolean started = false;

	public void init() {
		//addComponentListener(this);
		showFrame();
	}

	void showFrame() {
		if (ogf == null) {
			started = true;
			try {
				ogf = new MembraneFrame(this);
				ogf.init();
			} catch (Exception e) {
				e.printStackTrace();
				ogf = null;
				security = true;
				repaint();
			}
			repaint();
		}
	}

	boolean security = false;

	public void paint(Graphics g) {
		super.paint(g);
		String s = "Applet is open in a separate window.";
		if (security)
			s = "Security exception, use nosound version";
		else if (!started)
			s = "Applet is starting.";
		else if (ogf == null)
			s = "Applet is finished.";
		else
			ogf.show();
		g.drawString(s, 10, 30);
	}

	public void componentHidden(ComponentEvent e) {
	}

	public void componentMoved(ComponentEvent e) {
	}

	public void componentShown(ComponentEvent e) {
		showFrame();
	}

	public void componentResized(ComponentEvent e) {
	}

	public void destroy() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
	}
};

class MembraneFrame extends Frame implements ComponentListener, ActionListener,
		AdjustmentListener, MouseMotionListener, MouseListener, ItemListener {

	Thread engine = null;

	Dimension winSize;
	Image dbimage;

	Random random;
	int maxTerms, maxDispTerms = 10;
	int sampleCount;
	public static final double epsilon = .00001;
	public static final double epsilon2 = .003;

	public String getAppletInfo() {
		return "Membrane by Paul Falstad";
	}

	Button sineButton;
	Button blankButton;
	Checkbox stoppedCheck;
	Checkbox freqCheck;
	Checkbox fixedCheck;
	Checkbox colorCheck;
	Choice modeChooser;
	Choice displayChooser;
	Choice display2Chooser;
	Scrollbar dampingBar;
	Scrollbar brightnessBar;
	Scrollbar speedBar;
	Scrollbar forceBar;
	Scrollbar resBar;
	Scrollbar phasorBar;
	Scrollbar aspectBar;
	View view3d;
	View view2d;
	Rectangle viewFreq;
	boolean showMode;
	boolean editingFunc;
	boolean dragStop;
	int cell2dWidth;
	int cell2dHeight;
	double aspectRatio = 1;
	double magcoef[][];
	double dampcoef[][];
	double phasecoef[][];
	double phasecoefcos[][];
	double phasecoefadj[][];
	double modephasecos;
	double omega[][];
	double data[];
	static final double pi = 3.14159265358979323846;
	double step;
	double func[][];
	double funci[][];
	int xpoints[];
	int ypoints[];
	int selectedCoefX, selectedCoefY;
	int selectedGridX, selectedGridY;
	double selectedGridFunc;
	static final int SEL_NONE = 0;
	static final int SEL_FUNC_3D = 1;
	static final int SEL_FUNC_2D = 2;
	static final int SEL_MAG = 3;
	static final int MODE_PLUCK = 0;
	static final int MODE_STRIKE = 1;
	static final int MODE_SHAPE = 2;
	static final int MODE_VIEW_ROTATE = 3;
	static final int MODE_VIEW_ZOOM = 4;
	static final int MODE_SHOW_MODE = 5;
	static final int DISP_3D_2D = 0;
	static final int DISP_3D = 1;
	static final int DISP_2D = 2;
	static final int DISP2_SOLID = 0;
	static final int DISP2_WIRE_XY = 1;
	static final int DISP2_WIRE_X = 2;
	static final int DISP2_WIRE_Y = 3;
	static final int COLOR_HEIGHT = 0;
	static final int COLOR_VEL = 1;
	static final int COLOR_NONE = 2;
	int selection;
	int dragX, dragY;
	int dragStartX, dragStartY;
	boolean dragSet, dragClear;
	double viewAngle, viewAngleDragStart;
	double viewZoom = 1.6, viewZoomDragStart;
	double viewAngleCos = 1, viewAngleSin = 0;
	double viewHeight = -14, viewHeightDragStart;
	double viewDistance;
	double magDragStart;
	boolean view2dSwap;
	boolean view2dReflectX;
	boolean view2dReflectY;
	boolean dragging;
	boolean needPlay;
	double t;
	int pause;
	double scalex, scaley;
	int centerX3d;
	int centerY3d;
	double topz = 3;

	int getrand(int x) {
		int q = random.nextInt();
		if (q < 0)
			q = -q;
		return q % x;
	}

	MembraneCanvas cv;
	Membrane applet;

	MembraneFrame(Membrane a) {
		super("Oscillating Membrane Applet v1.5");
		applet = a;
	}

	boolean useBufferedImage = false;

	public void init() {
		xpoints = new int[4];
		ypoints = new int[4];
		String jv = System.getProperty("java.class.version");
		double jvf = new Double(jv).doubleValue();
		if (jvf >= 48)
			useBufferedImage = true;

		selectedCoefX = selectedCoefY = -1;
		setLayout(new MembraneLayout());
		cv = new MembraneCanvas(this);
		cv.addComponentListener(this);
		cv.addMouseMotionListener(this);
		cv.addMouseListener(this);
		add(cv);
		add(sineButton = new Button("Fundamental"));
		sineButton.addActionListener(this);
		add(blankButton = new Button("Clear"));
		blankButton.addActionListener(this);

		stoppedCheck = new Checkbox("Stopped");
		stoppedCheck.addItemListener(this);
		add(stoppedCheck);

		freqCheck = new Checkbox("Show Frequencies", true);
		freqCheck.addItemListener(this);
		add(freqCheck);

		fixedCheck = new Checkbox("Fixed Edges", true);
		fixedCheck.addItemListener(this);
		add(fixedCheck);

		/*
		 * forceCheck = new Checkbox("Driving Force", false);
		 * forceCheck.addItemListener(this); add(forceCheck);
		 */

		colorCheck = new Checkbox("Color", true);
		colorCheck.addItemListener(this);
		add(colorCheck);

		modeChooser = new Choice();
		modeChooser.add("Mouse = Poke membrane");
		modeChooser.add("Mouse = Strike membrane");
		modeChooser.add("Mouse = Shape membrane");
		modeChooser.add("Mouse = Adjust view angle");
		modeChooser.add("Mouse = Adjust view zoom");
		modeChooser.add("Mouse = Show mode");
		modeChooser.addItemListener(this);
		add(modeChooser);

		displayChooser = new Choice();
		displayChooser.add("Display 3d+2d");
		displayChooser.add("Display 3d only");
		displayChooser.add("Display 2d only");
		displayChooser.addItemListener(this);
		add(displayChooser);
		displayChooser.select(DISP_3D);

		display2Chooser = new Choice();
		display2Chooser.add("3d view = Solid");
		display2Chooser.add("3d view = Wireframe x,y");
		display2Chooser.add("3d view = Wireframe x");
		display2Chooser.add("3d view = Wireframe y");
		display2Chooser.addItemListener(this);
		add(display2Chooser);

		add(new Label("Simulation Speed", Label.CENTER));
		add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 100, 1, 1, 250));
		speedBar.addAdjustmentListener(this);

		add(new Label("Damping", Label.CENTER));
		add(dampingBar = new Scrollbar(Scrollbar.HORIZONTAL, 0, 5, 0, 100));
		dampingBar.addAdjustmentListener(this);

		add(new Label("Brightness", Label.CENTER));
		add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 0, 150));
		brightnessBar.addAdjustmentListener(this);

		add(new Label("Resolution", Label.CENTER));
		add(resBar = new Scrollbar(Scrollbar.HORIZONTAL, 5, 1, 3, 8));
		resBar.addAdjustmentListener(this);

		add(new Label("Aspect Ratio", Label.CENTER));
		add(aspectBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 5, 31));
		aspectBar.addAdjustmentListener(this);

		add(new Label("Freq Display Count", Label.CENTER));
		add(phasorBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 5, 128));
		phasorBar.addAdjustmentListener(this);

		setResolution();

		try {
			String param = applet.getParameter("PAUSE");
			if (param != null)
				pause = Integer.parseInt(param);
		} catch (Exception e) {
		}

		random = new Random();
		setDamping();
		reinit();
		cv.setBackground(Color.black);
		cv.setForeground(Color.lightGray);

		resize(640, 640);
		pack();
		handleResize();
		Dimension x = getSize();
		Dimension screen = getToolkit().getScreenSize();
		setLocation((screen.width - x.width) / 2, (screen.height - x.height) / 2);
		show();
	}

	void reinit() {
		doSine();
	}

	void handleResize() {
		Dimension d = winSize = cv.getSize();
		if (winSize.width == 0)
			return;
		dbimage = createImage(d.width, d.height);
		setupDisplay();
	}

	void setupDisplay() {
		view3d = view2d = null;
		viewFreq = null;
		if (winSize == null)
			return;
		switch (displayChooser.getSelectedIndex()) {
		case DISP_3D:
			if (!freqCheck.getState())
				view3d = new View(winSize);
			else {
				view3d = new View(0, 0, winSize.width, winSize.height / 2);
				viewFreq = new View(0, winSize.height / 2, winSize.width,
						winSize.height / 2);
			}
			break;
		case DISP_2D:
			if (!freqCheck.getState())
				view2d = new View(winSize);
			else {
				view2d = new View(0, 0, winSize.width, winSize.height / 2);
				viewFreq = new View(0, winSize.height / 2, winSize.width,
						winSize.height / 2);
			}
			break;
		case DISP_3D_2D:
		default:
			if (!freqCheck.getState()) {
				view3d = new View(0, 0, winSize.width, winSize.height / 2);
				view2d = new View(0, winSize.height / 2, winSize.width,
						winSize.height / 2);
			} else {
				view3d = new View(0, 0, winSize.width / 2, winSize.height / 2);
				view2d = new View(winSize.width / 2, 0, winSize.width / 2,
						winSize.height / 2);
				viewFreq = new View(0, winSize.height / 2, winSize.width,
						winSize.height / 2);
			}
			break;
		}
		if (viewFreq != null) {
			viewFreq.x = (winSize.width - viewFreq.height) / 2;
			viewFreq.width -= viewFreq.x * 2;
		}
		if (view3d != null)
			setupRaster(view3d);
		if (view2d != null) {
			cell2dWidth = view2d.width / (sampleCount + 1);
			cell2dHeight = view2d.height / (sampleCount + 1);
			double ar = (view2dSwap) ? 1 / aspectRatio : aspectRatio;
			if (cell2dWidth > cell2dHeight * ar)
				cell2dWidth = (int) (cell2dHeight * ar);
			if (cell2dHeight > cell2dWidth / ar)
				cell2dHeight = (int) (cell2dWidth / ar);
			int neww = (cell2dWidth * (sampleCount + 1));
			int newh = (cell2dHeight * (sampleCount + 1));
			view2d.x += (view2d.width - neww) / 2;
			view2d.y += (view2d.height - newh) / 2;
			view2d.width = neww;
			view2d.height = newh;
			brightnessBar.enable();
			setupRaster(view2d);
		} else
			brightnessBar.disable();
	}

	void setupRaster(View v) {
		v.pixels = null;
		if (useBufferedImage) {
			try {
				/*
				 * simulate the following code using reflection: dbimage = new
				 * BufferedImage(d.width, d.height, BufferedImage.TYPE_INT_RGB);
				 * DataBuffer db = (DataBuffer)(((BufferedImage)memimage).
				 * getRaster().getDataBuffer()); DataBufferInt dbi = (DataBufferInt) db;
				 * pixels = dbi.getData();
				 */
				Class biclass = Class.forName("java.awt.image.BufferedImage");
				Class dbiclass = Class.forName("java.awt.image.DataBufferInt");
				Class rasclass = Class.forName("java.awt.image.Raster");
				Constructor cstr = biclass.getConstructor(new Class[] { int.class,
						int.class, int.class });
				v.memimage = (Image) cstr.newInstance(new Object[] {
						new Integer(v.width), new Integer(v.height), new Integer(1) }); // BufferedImage.TYPE_INT_RGB)});
				Method m = biclass.getMethod("getRaster", null);
				Object ras = m.invoke(v.memimage, null);
				Object db = rasclass.getMethod("getDataBuffer", null).invoke(ras, null);
				v.pixels = (int[]) dbiclass.getMethod("getData", null).invoke(db, null);
			} catch (Exception ee) {
				// ee.printStackTrace();
				System.out.println("BufferedImage failed");
			}
		}
		if (v.pixels == null) {
			v.pixels = new int[v.width * v.height];
			int i;
			for (i = 0; i != v.width * v.height; i++)
				v.pixels[i] = 0xFF000000;
			v.imageSource = new MemoryImageSource(v.width, v.height, v.pixels, 0,
					v.width);
			v.imageSource.setAnimated(true);
			v.imageSource.setFullBufferUpdates(true);
			v.memimage = cv.createImage(v.imageSource);
		}
	}

	// do fundamental
	void doSine() {
		int x, y;
		for (x = 0; x != sampleCount; x++)
			for (y = 0; y != sampleCount; y++)
				magcoef[x][y] = 0;
		if (fixedCheck.getState())
			magcoef[1][1] = 1;
		else if (omega[0][1] < omega[1][0])
			magcoef[0][1] = 1;
		else
			magcoef[1][0] = 1;
		doPlay();
	}

	void doBlank() {
		int x, y;
		for (x = 0; x <= sampleCount; x++)
			for (y = 0; y <= sampleCount; y++)
				func[x][y] = 0;
		transform(true);
	}

	// given a membrane shape (func[][]), calculate the frequencies.
	// Unless novel is true, we also preserve the imaginary parts
	// (funci[][]) which is the same as preserving the velocity of the
	// membrane (funci is not quite the velocity but all the velocity
	// information is contained in it).
	void transform(boolean novel) {
		t = 0;
		int nn[] = new int[2];
		nn[0] = nn[1] = maxTerms * 2;
		int x, y;
		int ymult = maxTerms * 4;
		int mx = maxTerms * 2;
		double sign = (fixedCheck.getState()) ? -1 : 1;
		for (x = 0; x != maxTerms * maxTerms * 8; x++)
			data[x] = 0;
		for (x = 0; x <= sampleCount; x++)
			for (y = 0; y <= sampleCount; y++) {
				double fi = (novel) ? 0 : funci[x][y];
				// copy func[x][y] to data array
				data[x * 2 + y * ymult] = func[x][y];
				data[x * 2 + y * ymult + 1] = fi;
				// copy func[x][y] to (x,-y), (-x,-y), (x,-y)
				if (x > 0) {
					data[(mx - x) * 2 + y * ymult] = sign * func[x][y];
					data[(mx - x) * 2 + y * ymult + 1] = sign * fi;
					if (y > 0) {
						data[(mx - x) * 2 + (mx - y) * ymult] = func[x][y];
						data[(mx - x) * 2 + (mx - y) * ymult + 1] = fi;
					}
				}
				if (y > 0) {
					data[x * 2 + (mx - y) * ymult] = sign * func[x][y];
					data[x * 2 + (mx - y) * ymult + 1] = sign * fi;
				}
			}
		ndfft(data, nn, 2, 1);
		double norm = -4. / (mx * mx);

		// copy frequency info
		for (x = 0; x != maxTerms; x++) {
			for (y = 0; y != maxTerms; y++) {
				double a = data[x * 2 + y * ymult] * norm;
				double b = data[x * 2 + y * ymult + 1] * norm;
				if (a < epsilon && a > -epsilon)
					a = 0;
				if (b < epsilon && b > -epsilon)
					b = 0;
				if (novel)
					b = 0;
				sign = 1;
				if (a < 0) {
					a = -a;
					b = -b;
					sign = -1;
				}
				// convert complex coefficient to magnitude and phase
				double r = java.lang.Math.sqrt(a * a + b * b);
				magcoef[x][y] = r * sign;
				double ph2 = java.lang.Math.atan2(b, a);
				phasecoefadj[x][y] = ph2;
				phasecoef[x][y] = ph2;
			}
		}
		needPlay = true;
	}

	int getPanelHeight() {
		return winSize.height / 3;
	}

	void centerString(Graphics g, String s, int y) {
		FontMetrics fm = g.getFontMetrics();
		g.drawString(s, (winSize.width - fm.stringWidth(s)) / 2, y);
	}

	public void paint(Graphics g) {
		cv.repaint();
		super.paint(g);
	}

	long lastTime;

	public void updateMembrane(Graphics realg) {
		if (dbimage == null)
			return;
		Graphics g = dbimage.getGraphics();
		if (winSize == null || winSize.width == 0 || winSize.height == 0)
			return;
		boolean allQuiet = true;
		double tadd = 0;
		if (!stoppedCheck.getState()) {
			int val = speedBar.getValue();
			tadd = java.lang.Math.exp(val / 20.) * (.1 / 50);
			long sysTime = System.currentTimeMillis();
			if (lastTime == 0)
				lastTime = sysTime;
			tadd *= (sysTime - lastTime) * (1 / 170.);
			t += tadd;
			lastTime = sysTime;
			allQuiet = false;
		} else
			lastTime = 0;
		Color gray1 = new Color(76, 76, 76);
		Color gray2 = new Color(127, 127, 127);
		g.setColor(cv.getBackground());
		g.fillRect(0, 0, winSize.width, winSize.height);
		g.setColor(cv.getForeground());

		int x, y;
		int i, j;
		if (dragStop) {
			t = 0;
			lastTime = 0;
		}
		if (!editingFunc) {
			// update phases
			for (i = 0; i != maxTerms; i++) {
				for (j = 0; j != maxTerms; j++) {
					if (magcoef[i][j] < epsilon && magcoef[i][j] > -epsilon) {
						magcoef[i][j] = phasecoef[i][j] = phasecoefadj[i][j] = 0;
						continue;
					}
					magcoef[i][j] *= Math.exp(dampcoef[i][j] * tadd);
					allQuiet = false;
					phasecoef[i][j] = (omega[i][j] * t + phasecoefadj[i][j]) % (2 * pi);
					phasecoefcos[i][j] = java.lang.Math.cos(phasecoef[i][j]);
				}
			}
			genFunc(false);
		}
		double brightmult = brightnessBar.getValue() / 10.;
		if (dragStop)
			allQuiet = true;
		if (showMode) {
			allQuiet = false;
			modephasecos = java.lang.Math.cos(omega[selectedCoefX][selectedCoefY] * t
					+ phasecoefadj[selectedCoefX][selectedCoefY]);
			if (magcoef[selectedCoefX][selectedCoefY] < 0)
				modephasecos = -modephasecos;
		}
		// System.out.print(xdir + " " + ydir + " " + xFirst + " " +
		// viewAngleSin + " " + viewAngleCos+ "\n");
		if (view3d != null)
			draw3dView(g);
		if (view2d != null) {
			int rcol = 0x00010000;
			int gcol = (showMode) ? 0x00010100 : 0x00000100;
			double selectMag = 0;
			// rotate 2-d view so that it matches 3-d view as close as possible
			if (viewAngle < .25 * pi || viewAngle >= 1.75 * pi) {
				view2dSwap = view2dReflectX = false;
				view2dReflectY = true;
			} else if (viewAngle >= pi / 4 && viewAngle < .75 * pi) {
				view2dSwap = true;
				view2dReflectX = view2dReflectY = false;
			} else if (viewAngle >= .75 * pi && viewAngle < 1.25 * pi) {
				view2dSwap = false;
				view2dReflectX = true;
				view2dReflectY = false;
			} else {
				view2dSwap = true;
				view2dReflectX = true;
				view2dReflectY = true;
			}
			int sx, sy;
			g.setColor(Color.white);
			g.drawRect(view2d.x - 1, view2d.y - 1, view2d.width + 2,
					view2d.height + 2);
			int pixels[] = view2d.pixels;
			for (y = 0; y <= maxTerms; y++) {
				for (x = 0; x <= maxTerms; x++) {
					int val;
					val = (showMode) ? (int) (255 * brightmult
							* getMode(selectedCoefX, selectedCoefY, x, y) * modephasecos)
							: (int) (255 * brightmult * func[x][y]);
					if (val < -255)
						val = -255;
					if (val > 255)
						val = 255;
					int col = 0;
					if (val < 0)
						col = 0xFF000000 + rcol * -val;
					else
						col = 0xFF000000 + gcol * val;
					if (view2dSwap) {
						sx = y;
						sy = x;
					} else {
						sx = x;
						sy = y;
					}
					if (view2dReflectX)
						sx = maxTerms - sx;
					if (view2dReflectY)
						sy = maxTerms - sy;
					int k, l = 0;
					int kmax = cell2dWidth * (sx + 1);
					int l0 = cell2dHeight * sy * view2d.width;
					int lmax = l0 + cell2dHeight * view2d.width;
					for (k = cell2dWidth * sx; k != kmax; k++)
						for (l = l0; l != lmax; l += view2d.width)
							pixels[k + l] = col;
				}
			}
			if (view2d.imageSource != null)
				view2d.imageSource.newPixels();
			g.drawImage(view2d.memimage, view2d.x, view2d.y, null);
		}

		if (viewFreq != null) {
			// draw frequency grid
			int termWidth = getTermWidth();
			g.setColor(Color.white);
			int starti = (fixedCheck.getState()) ? 1 : 0;
			for (i = starti; i <= maxDispTerms; i++) {
				x = i * termWidth;
				g.drawLine(viewFreq.x + starti * termWidth, x + viewFreq.y, viewFreq.x
						+ termWidth * maxDispTerms, x + viewFreq.y);
				g.drawLine(viewFreq.x + x, viewFreq.y + starti * termWidth, viewFreq.x
						+ x, viewFreq.y + termWidth * maxDispTerms);
			}
			int rcol = 0x00010000;
			int gcol = 0x00000100;
			for (i = starti; i != maxDispTerms; i++)
				for (j = starti; j != maxDispTerms; j++) {
					x = viewFreq.x + i * termWidth;
					y = viewFreq.y + j * termWidth;
					int val = logcoef(magcoef[i][j]);
					if (val < -255)
						val = -255;
					if (val > 255)
						val = 255;
					if (val < 0)
						g.setColor(new Color(0xFF000000 + rcol * -val));
					else
						g.setColor(new Color(0xFF000000 + gcol * val));
					g.fillRect(x + 1, y + 1, termWidth - 1, termWidth - 1);
					int phx = (int) (phasecoefadj[i][j] * termWidth * (1 / (pi * 2)));
					if (phx > 0) {
						// show phase line
						g.setColor(Color.blue);
						g.drawLine(x + phx, y + 1, x + phx, y + termWidth);
					}
					// draw yellow square around degenerate modes
					if (selectedCoefX != -1
							&& omega[selectedCoefX][selectedCoefY] == omega[i][j]) {
						g.setColor(Color.yellow);
						g.drawRect(x, y, termWidth, termWidth);
					}
				}
		}

		/*
		 * g.setColor(Color.white); g.drawString("frametime = " +
		 * (System.currentTimeMillis()-lastTime), 50, 50);
		 */
		realg.drawImage(dbimage, 0, 0, this);
		if (!stoppedCheck.getState() && !allQuiet)
			cv.repaint(pause);
	}

	int shadowBufferTop[], shadowBufferBottom[], shadowBufferTop2[],
			shadowBufferBottom2[];

	void draw3dView(Graphics g) {
		int half = sampleCount / 2;
		scaleworld();
		int x, y;
		int xdir, xstart, xend;
		int ydir, ystart, yend;
		int sc = (display2Chooser.getSelectedIndex() == DISP2_SOLID) ? sampleCount - 1
				: sampleCount;

		// figure out what order to render the grid elements so that
		// the ones in front are rendered first.
		if (viewAngleCos < 0) {
			ystart = sc;
			yend = -1;
			ydir = -1;
		} else {
			ystart = 0;
			yend = sc + 1;
			ydir = 1;
		}
		if (viewAngleSin < 0) {
			xstart = 0;
			xend = sc + 1;
			xdir = 1;
		} else {
			xstart = sc;
			xend = -1;
			xdir = -1;
		}
		boolean xFirst = (-viewAngleSin * xdir > viewAngleCos * ydir);
		if (display2Chooser.getSelectedIndex() == DISP2_SOLID) {
			shadowBufferBottom = new int[view3d.width];
			shadowBufferTop = new int[view3d.width];
			shadowBufferBottom2 = new int[view3d.width];
			shadowBufferTop2 = new int[view3d.width];
			for (x = 0; x != view3d.width; x++) {
				shadowBufferBottom[x] = shadowBufferBottom2[x] = 0;
				shadowBufferTop[x] = shadowBufferTop2[x] = view3d.height - 1;
			}
			int pixels[] = view3d.pixels;
			for (x = 0; x != view3d.width * view3d.height; x++)
				pixels[x] = 0xFF000000;
			/*
			 * double zval = 2.0/sampleCount; System.out.println(zval); if
			 * (sampleCount == 128) zval = .1;
			 */
			double zval = .1;
			double zval2 = zval * zval;

			for (x = xstart; x != xend; x += xdir) {
				for (y = ystart; y != yend; y += ydir) {
					if (!xFirst)
						x = xstart;
					for (; x != xend; x += xdir) {
						map3d(x - half, y - half, func[x][y], xpoints, ypoints, 0);
						map3d(x + 1 - half, y - half, func[x + 1][y], xpoints, ypoints, 1);
						map3d(x - half, y + 1 - half, func[x][y + 1], xpoints, ypoints, 2);
						map3d(x + 1 - half, y + 1 - half, func[x + 1][y + 1], xpoints,
								ypoints, 3);
						double qx = func[x + 1][y] - func[x][y];
						double qy = func[x][y + 1] - func[x][y];
						// calculate lighting
						double normdot = (qx + qy + zval) * (1 / 1.73)
								/ Math.sqrt(qx * qx + qy * qy + zval2);
						int col = computeColor(x, y, normdot);
						fillTriangle(xpoints[0], ypoints[0], xpoints[1], ypoints[1],
								xpoints[3], ypoints[3], col);
						fillTriangle(xpoints[0], ypoints[0], xpoints[2], ypoints[2],
								xpoints[3], ypoints[3], col);
						if (xFirst)
							break;
					}
					if (!xFirst) {
						int i;
						for (i = 0; i != view3d.width; i++) {
							shadowBufferTop[i] = shadowBufferTop2[i];
							shadowBufferBottom[i] = shadowBufferBottom2[i];
						}
					}
				}
				if (!xFirst)
					break;
				int i;
				for (i = 0; i != view3d.width; i++) {
					shadowBufferTop[i] = shadowBufferTop2[i];
					shadowBufferBottom[i] = shadowBufferBottom2[i];
				}
			}
			if (view3d.imageSource != null)
				view3d.imageSource.newPixels();
			g.drawImage(view3d.memimage, view3d.x, view3d.y, null);
		} else {
			// wireframe
			boolean needX = (display2Chooser.getSelectedIndex() != DISP2_WIRE_Y);
			boolean needY = (display2Chooser.getSelectedIndex() != DISP2_WIRE_X);
			for (x = xstart; x != xend; x += xdir) {
				for (y = ystart; y != yend; y += ydir) {
					if (!xFirst)
						x = xstart;
					for (; x != xend; x += xdir) {
						g.setColor(new Color(computeColor(x, y, 0)));
						map3d(x - half, y - half, func[x][y], xpoints, ypoints, 0);
						if (x < sampleCount && needX) {
							map3d(x + 1 - half, y - half, func[x + 1][y], xpoints, ypoints, 1);
							g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
						}
						if (y < sampleCount && needY) {
							map3d(x - half, y + 1 - half, func[x][y + 1], xpoints, ypoints, 2);
							g.drawLine(xpoints[0], ypoints[0], xpoints[2], ypoints[2]);
						}
						if (xFirst)
							break;
					}
				}
				if (!xFirst)
					break;
			}
		}
	}

	int computeColor(int x, int y, double c) {
		double h = func[x][y];
		if (!colorCheck.getState() && !showMode) {
			h = 0;
			if (display2Chooser.getSelectedIndex() != DISP2_SOLID)
				return 0xFFFFFFFF;
		}
		if (c < 0)
			c = 0;
		if (c > 1)
			c = 1;
		c = .5 + c * .5;
		double redness = (h < 0) ? -h : 0;
		double grnness = (h > 0) ? h : 0;
		if (showMode) {
			double v = getMode(selectedCoefX, selectedCoefY, x, y) * modephasecos;
			if (v > 0)
				redness = grnness = v;
			else {
				redness = -v;
				grnness = 0;
			}
		}
		if (redness > 1)
			redness = 1;
		if (grnness > 1)
			grnness = 1;
		if (grnness < 0)
			grnness = 0;
		if (redness < 0)
			redness = 0;
		double grayness = (1 - (redness + grnness)) * c;
		if (showMode)
			grayness = (1 - redness) * c;
		double gray = .6;
		int ri = (int) ((c * redness + gray * grayness) * 255);
		int gi = (int) ((c * grnness + gray * grayness) * 255);
		int bi = (int) ((gray * grayness) * 255);
		return 0xFF000000 | (ri << 16) | (gi << 8) | bi;
	}

	void fillTriangle(int x1, int y1, int x2, int y2, int x3, int y3, int col) {
		if (x1 > x2) {
			if (x2 > x3) {
				// x1 > x2 > x3
				int ay = interp(x1, y1, x3, y3, x2);
				fillTriangle1(x3, y3, x2, y2, ay, col);
				fillTriangle1(x1, y1, x2, y2, ay, col);
			} else if (x1 > x3) {
				// x1 > x3 > x2
				int ay = interp(x1, y1, x2, y2, x3);
				fillTriangle1(x2, y2, x3, y3, ay, col);
				fillTriangle1(x1, y1, x3, y3, ay, col);
			} else {
				// x3 > x1 > x2
				int ay = interp(x3, y3, x2, y2, x1);
				fillTriangle1(x2, y2, x1, y1, ay, col);
				fillTriangle1(x3, y3, x1, y1, ay, col);
			}
		} else {
			if (x1 > x3) {
				// x2 > x1 > x3
				int ay = interp(x2, y2, x3, y3, x1);
				fillTriangle1(x3, y3, x1, y1, ay, col);
				fillTriangle1(x2, y2, x1, y1, ay, col);
			} else if (x2 > x3) {
				// x2 > x3 > x1
				int ay = interp(x2, y2, x1, y1, x3);
				fillTriangle1(x1, y1, x3, y3, ay, col);
				fillTriangle1(x2, y2, x3, y3, ay, col);
			} else {
				// x3 > x2 > x1
				int ay = interp(x3, y3, x1, y1, x2);
				fillTriangle1(x1, y1, x2, y2, ay, col);
				fillTriangle1(x3, y3, x2, y2, ay, col);
			}
		}
	}

	int interp(int x1, int y1, int x2, int y2, int x) {
		if (x1 == x2)
			return y1;
		if (x < x1 && x < x2 || x > x1 && x > x2)
			System.out.print("interp out of bounds\n");
		return (int) (y1 + ((double) x - x1) * (y2 - y1) / (x2 - x1));
	}

	void fillTriangle1(int x1, int y1, int x2, int y2, int y3, int col) {
		// x2 == x3
		int dir = (x1 > x2) ? -1 : 1;
		int x = x1;
		if (x < 0) {
			x = 0;
			if (x2 < 0)
				return;
		}
		if (x >= view3d.width) {
			x = view3d.width - 1;
			if (x2 >= view3d.width)
				return;
		}
		if (y2 > y3) {
			int q = y2;
			y2 = y3;
			y3 = q;
		}
		// y2 < y3
		while (x != x2 + dir) {
			// XXX this could be speeded up
			int ya = interp(x1, y1, x2, y2, x);
			int yb = interp(x1, y1, x2, y3, x);
			if (ya < 0)
				ya = 0;
			if (yb >= view3d.height)
				yb = view3d.height - 1;

			if (shadowBufferTop2[x] > ya)
				shadowBufferTop2[x] = ya;
			if (shadowBufferBottom2[x] < yb)
				shadowBufferBottom2[x] = yb;

			int sb1 = shadowBufferTop[x];
			int sb2 = shadowBufferBottom[x];
			if (!(ya >= sb1 && yb <= sb2)) {
				for (; ya <= yb; ya++) {
					if (ya < sb1 || ya > sb2)
						view3d.pixels[x + ya * view3d.width] = col;
				}
			}
			x += dir;
			if (x < 0 || x >= view3d.width)
				return;
		}
	}

	void genFunc(boolean fixed) {
		int nn[] = new int[2];
		nn[0] = nn[1] = maxTerms * 2;
		int x, y;
		int ymult = maxTerms * 4;
		int mx = maxTerms * 2;
		double sign = (fixed || fixedCheck.getState()) ? -1 : 1;
		for (x = 0; x != maxTerms * maxTerms * 8; x++)
			data[x] = 0;
		for (x = 0; x != sampleCount; x++)
			for (y = 0; y != sampleCount; y++) {
				double c = phasecoefcos[x][y];
				double s = java.lang.Math.sin(phasecoef[x][y]);
				//
				// use these formulas to generate mode functions using
				// inverse fft:
				//
				// cos(xn) -> (exp(ixn)+exp(-ixn))/2
				// cos(xn)cos(yn) -> .25*(exp(ixn)exp(iyn))
				// +exp(-ixn)exp(-iyn)+exp(-ixn)exp(iyn)+exp(ixn)exp(-iyn)
				// sin(xn) -> (exp(ixn)-exp(-ixn))/2i
				// sin(xn)sin(yn) -> -.25*(exp(ixn)exp(iyn)
				// +exp(-ixn)exp(-iyn)-exp(-ixn)exp(iyn)-exp(ixn)exp(-iyn)
				//
				double a = -.25 * magcoef[x][y];
				double b = 0;
				double ap = a * c - b * s;
				double bp = b * c + a * s;
				data[x * 2 + y * ymult] = ap;
				data[x * 2 + y * ymult + 1] = bp;
				if (x > 0) {
					data[(mx - x) * 2 + y * ymult] = sign * ap;
					data[(mx - x) * 2 + y * ymult + 1] = sign * bp;
					if (y > 0) {
						data[(mx - x) * 2 + (mx - y) * ymult] = ap;
						data[(mx - x) * 2 + (mx - y) * ymult + 1] = bp;
					}
				}
				if (y > 0) {
					data[x * 2 + (mx - y) * ymult] = sign * ap;
					data[x * 2 + (mx - y) * ymult + 1] = sign * bp;
				}
			}
		ndfft(data, nn, 2, -1);
		for (x = 0; x <= sampleCount; x++)
			for (y = 0; y <= sampleCount; y++) {
				func[x][y] = data[x * 2 + y * ymult];
				funci[x][y] = data[x * 2 + y * ymult + 1];
			}
	}

	double logep2 = 0;

	int logcoef(double x) {
		double ep2 = epsilon2;
		int sign = (x < 0) ? -1 : 1;
		x *= sign;
		if (x < ep2)
			return 0;
		if (logep2 == 0)
			logep2 = -java.lang.Math.log(2 * ep2);
		return (int) (255 * sign * (java.lang.Math.log(x + ep2) + logep2) / logep2);
	}

	double realxmx, realxmy, realymz, realzmy, realzmx, realymadd, realzmadd;

	void map3d(double x, double y, double z, int xpoints[], int ypoints[], int pt) {
		/*
		 * x *= aspectRatio; z *= -4; x *= 16./sampleCount; y *= 16./sampleCount;
		 * double realx = x*viewAngleCos + y*viewAngleSin; // range: [-10,10] double
		 * realy = z-viewHeight; double realz = y*viewAngleCos - x*viewAngleSin +
		 * viewDistance;
		 */
		double realx = realxmx * x + realxmy * y;
		double realy = realymz * z + realymadd;
		double realz = realzmx * x + realzmy * y + realzmadd;
		xpoints[pt] = centerX3d + (int) (realx / realz);
		ypoints[pt] = centerY3d - (int) (realy / realz);
	}

	double scaleMult;

	void scaleworld() {
		scalex = viewZoom * (view3d.width / 4) * viewDistance / 8;
		scaley = -scalex;
		int y = (int) (scaley * viewHeight / viewDistance);
		/*
		 * centerX3d = view3d.x + view3d.width/2; centerY3d = view3d.y +
		 * view3d.height/2 - y;
		 */
		centerX3d = view3d.width / 2;
		centerY3d = view3d.height / 2 - y;
		scaleMult = 16. / sampleCount;
		realxmx = viewAngleCos * aspectRatio * scaleMult * scalex;
		realxmy = viewAngleSin * scaleMult * scalex;
		realymz = -4 * scaley;
		realzmy = viewAngleCos * scaleMult;
		realzmx = -viewAngleSin * aspectRatio * scaleMult;
		realymadd = -viewHeight * scaley;
		realzmadd = viewDistance;
	}

	void adjustZoom() {
		viewZoom = 5;
		double ar = (aspectRatio > 1) ? aspectRatio : 1;
		while (true) {
			scaleworld();
			double q = Math.abs(ar * scaleMult * scalex * sampleCount
					/ (realzmadd * 2));
			if (q < winSize.width * 45 / 100)
				break;
			viewZoom -= .2;
		}
	}

	int getTermWidth() {
		int termWidth = viewFreq.height / maxDispTerms;
		return termWidth;
	}

	void edit(MouseEvent e) {
		if (selection == SEL_NONE)
			return;
		int x = e.getX();
		int y = e.getY();
		switch (selection) {
		case SEL_MAG:
			editMag(x, y);
			break;
		case SEL_FUNC_2D:
			editFunc2D(x, y);
			break;
		case SEL_FUNC_3D:
			editFunc3D(x, y);
			break;
		}
	}

	void editMag(int x, int y) {
		if (selectedCoefX == -1)
			return;
		if (modeChooser.getSelectedIndex() == MODE_SHOW_MODE) {
			showMode = true;
			cv.repaint(pause);
			return;
		}
		double coef = (dragStartY - y) / 20. + magDragStart;
		if (coef < -1)
			coef = -1;
		if (coef > 1)
			coef = 1;
		double pcoef = (x - dragStartX) / 10.;
		if (pcoef < 0)
			pcoef = 0;
		if (pcoef > 2 * pi)
			pcoef = 2 * pi;
		if (magcoef[selectedCoefX][selectedCoefY] == coef
				&& phasecoefadj[selectedCoefX][selectedCoefY] == pcoef)
			return;
		magcoef[selectedCoefX][selectedCoefY] = coef;
		phasecoefadj[selectedCoefX][selectedCoefY] = pcoef;
		cv.repaint(pause);
		needPlay = true;
	}

	void editMagClick() {
		if (selectedCoefX == -1)
			return;
		if (modeChooser.getSelectedIndex() == MODE_SHOW_MODE)
			return;
		if (magDragStart < .5)
			magcoef[selectedCoefX][selectedCoefY] = 1;
		else
			magcoef[selectedCoefX][selectedCoefY] = 0;
		phasecoefadj[selectedCoefX][selectedCoefY] = 0;
		cv.repaint(pause);
		doPlay();
	}

	void editFunc2D(int x, int y) {
		int oldgx = selectedGridX;
		int oldgy = selectedGridY;
		findGridPoint2D(x, y);
		if (modeChooser.getSelectedIndex() == MODE_PLUCK) {
			editFuncPluck(selectedGridX, selectedGridY, 1);
			return;
		}
		if (modeChooser.getSelectedIndex() == MODE_STRIKE) {
			editFuncStrike(selectedGridX, selectedGridY, 1);
			return;
		}
		int x1 = oldgx;
		int y1 = oldgy;
		int x2 = selectedGridX;
		int y2 = selectedGridY;
		// need to draw a line from x1,y1 to x2,y2
		if (x1 == x2 && y1 == y2) {
			editFuncPoint(x2, y2, 1);
		} else if (abs(y2 - y1) > abs(x2 - x1)) {
			// y difference is greater, so we step along y's
			// from min to max y and calculate x for each step
			int sgn = sign(y2 - y1);
			for (y = y1; y != y2 + sgn; y += sgn) {
				x = x1 + (x2 - x1) * (y - y1) / (y2 - y1);
				editFuncPoint(x, y, 1);
			}
		} else {
			// x difference is greater, so we step along x's
			// from min to max x and calculate y for each step
			int sgn = sign(x2 - x1);
			for (x = x1; x != x2 + sgn; x += sgn) {
				y = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
				editFuncPoint(x, y, 1);
			}
		}
		transform(false);
	}

	int sign(int x) {
		return (x < 0) ? -1 : (x == 0) ? 0 : 1;
	}

	int abs(int x) {
		return x < 0 ? -x : x;
	}

	void editFunc3D(int x, int y) {
		if (modeChooser.getSelectedIndex() == MODE_VIEW_ROTATE) {
			viewAngle = (dragStartX - x) / 40. + viewAngleDragStart;
			while (viewAngle < 0)
				viewAngle += 2 * pi;
			while (viewAngle >= 2 * pi)
				viewAngle -= 2 * pi;
			viewAngleCos = java.lang.Math.cos(viewAngle);
			viewAngleSin = java.lang.Math.sin(viewAngle);
			viewHeight = (dragStartY - y) / 10. + viewHeightDragStart;
			setupDisplay();
			cv.repaint(pause);
			return;
		}
		if (modeChooser.getSelectedIndex() == MODE_VIEW_ZOOM) {
			viewZoom = (x - dragStartX) / 40. + viewZoomDragStart;
			if (viewZoom < .1)
				viewZoom = .1;
			cv.repaint(pause);
			return;
		}
		if (selectedGridX == -1)
			return;
		double v = selectedGridFunc + (dragStartY - y) / 40.;
		if (v < -1)
			v = -1;
		if (v > 1)
			v = 1;
		if (modeChooser.getSelectedIndex() == MODE_PLUCK) {
			editFuncPluck(selectedGridX, selectedGridY, v);
			return;
		}
		if (modeChooser.getSelectedIndex() == MODE_STRIKE) {
			editFuncStrike(selectedGridX, selectedGridY, v);
			return;
		}
		editFuncPoint(selectedGridX, selectedGridY, v);
		transform(false);
	}

	void editFuncPoint(int x, int y, double v) {
		if (!dragSet && !dragClear) {
			dragClear = func[x][y] > .1;
			dragSet = !dragClear;
		}
		func[x][y] = (dragSet) ? v : 0;
		dragStop = editingFunc = true;
		cv.repaint(pause);
	}

	void editFuncPluck(int gx, int gy, double v) {
		int x, y, m, n;
		double w = 0;
		for (x = 0; x != maxTerms; x++)
			magcoef[x][0] = magcoef[0][x] = 0;
		if (gx == 0)
			gx = 1;
		if (gy == 0)
			gy = 1;
		if (gx == maxTerms)
			gx = maxTerms - 1;
		if (gy == maxTerms)
			gy = maxTerms - 1;
		for (x = 1; x != maxTerms; x++)
			for (y = 1; y != maxTerms; y++) {
				// use Green's function for a rectangle (assumes a
				// sine basis, so if the edges are not fixed we have
				// to correct it below)
				magcoef[x][y] = java.lang.Math.sin(step * x * gx)
						* java.lang.Math.sin(step * y * gy)
						/ (x * x * maxTerms * maxTerms + y * y * maxTerms * maxTerms
								* aspectRatio * aspectRatio);
				phasecoefadj[x][y] = 0;
				phasecoefcos[x][y] = 1;
				phasecoef[x][y] = 0;
				// normalize so that point at gx,gy = v
				w += magcoef[x][y] * java.lang.Math.sin(step * x * gx)
						* java.lang.Math.sin(step * y * gy);
			}
		double mult = v / w;
		for (x = 1; x != maxTerms; x++)
			for (y = 1; y != maxTerms; y++)
				magcoef[x][y] *= mult;
		dragStop = true;
		if (!fixedCheck.getState()) {
			// hack to get plucking to work easily with non-fixed edges.
			// Just call getFunc() forcing the fixed-edge basis and then
			// transform it back to the non-fixed-edge basis.
			genFunc(true);
			transform(true);
		}
		needPlay = true;
		cv.repaint(pause);
	}

	void editFuncStrike(int gx, int gy, double v) {
		int x, y, m, n;
		dragStop = true;
		if (gx == 0)
			gx = 1;
		if (gy == 0)
			gy = 1;
		if (gx == maxTerms)
			gx = maxTerms - 1;
		if (gy == maxTerms)
			gy = maxTerms - 1;
		double striker = 3;
		for (x = 0; x <= maxTerms; x++)
			for (y = 0; y <= maxTerms; y++) {
				funci[x][y] = 0;
				double xx = (x - gx) * aspectRatio;
				int yy = y - gy;
				double r = Math.sqrt(xx * xx + yy * yy);
				double rfunc = 0;
				if (r < striker)
					rfunc = v * (striker - r);
				func[x][y] = rfunc;
			}
		transform(true);
		cv.repaint(pause);
	}

	public void componentHidden(ComponentEvent e) {
	}

	public void componentMoved(ComponentEvent e) {
	}

	public void componentShown(ComponentEvent e) {
		cv.repaint(pause);
	}

	public void componentResized(ComponentEvent e) {
		handleResize();
		cv.repaint(pause);
	}

	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == sineButton) {
			doSine();
			cv.repaint();
		}
		if (e.getSource() == blankButton) {
			doBlank();
			cv.repaint();
		}
	}

	public void adjustmentValueChanged(AdjustmentEvent e) {
		System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
		if (e.getSource() == dampingBar || e.getSource() == speedBar)
			setDamping();
		if (e.getSource() == resBar)
			setResolution();
		if (e.getSource() == aspectBar) {
			setResolution();
			adjustZoom();
		}
		maxDispTerms = phasorBar.getValue();
		if (maxDispTerms > maxTerms)
			maxDispTerms = maxTerms;
		cv.repaint(pause);
	}

	public boolean handleEvent(Event ev) {
		if (ev.id == Event.WINDOW_DESTROY) {
			applet.destroyFrame();
			return true;
		}
		return super.handleEvent(ev);
	}

	void setResolution() {
		int q = resBar.getValue();
		sampleCount = 1;
		while (q-- > 0)
			sampleCount *= 2;
		if (sampleCount > 128)
			sampleCount = 128;
		if (sampleCount < 8)
			sampleCount = 8;
		int oldMaxTerms = maxTerms;
		maxTerms = sampleCount;
		System.out.println("samplecount = " + sampleCount);
		step = pi / sampleCount;
		aspectRatio = aspectBar.getValue() / 10.;
		/*
		 * viewDistance = 50+((aspectRatio > 1) ? aspectRatio*sampleCount/2 :
		 * sampleCount/2);
		 */
		viewDistance = 66;
		int i, j;

		double oldmagcoef[][] = magcoef;
		magcoef = new double[maxTerms][maxTerms];
		phasecoef = new double[maxTerms][maxTerms];
		phasecoefcos = new double[maxTerms][maxTerms];
		phasecoefadj = new double[maxTerms][maxTerms];
		func = new double[maxTerms + 1][maxTerms + 1];
		funci = new double[maxTerms + 1][maxTerms + 1];

		data = new double[maxTerms * maxTerms * 2 * 4];
		omega = new double[maxTerms][maxTerms];
		for (i = 0; i != maxTerms; i++)
			for (j = 0; j != maxTerms; j++)
				omega[i][j] = java.lang.Math.sqrt(i * i / (aspectRatio * aspectRatio)
						+ j * j);
		double mult = 1 / omega[1][1];
		for (i = 0; i != maxTerms; i++)
			for (j = 0; j != maxTerms; j++)
				omega[i][j] *= mult;
		if (oldmagcoef != null) {
			for (i = 0; i != oldMaxTerms && i != maxTerms; i++)
				for (j = 0; j != oldMaxTerms && j != maxTerms; j++)
					magcoef[i][j] = oldmagcoef[i][j];
		}
		setDamping();
		setupDisplay();
	}

	double getMode(int i, int j, int x, int y) {
		if (fixedCheck.getState())
			return java.lang.Math.sin(step * x * i)
					* java.lang.Math.sin(step * y * j);
		else
			return java.lang.Math.cos(step * x * i)
					* java.lang.Math.cos(step * y * j);
	}

	void setDamping() {
		int i, j;
		dampcoef = new double[maxTerms][maxTerms];
		for (i = 0; i != maxTerms; i++) {
			for (j = 0; j != maxTerms; j++) {
				if (i == 0 && j == 0)
					continue;
				double damper = dampingBar.getValue() / 40.;
				damper = java.lang.Math.exp(damper) - 1;
				double damp2 = omega[i][j]
						* java.lang.Math.sqrt(java.lang.Math.sqrt(1 + damper * damper
								/ (omega[i][j] * omega[i][j])) - 1);
				dampcoef[i][j] = -damp2 * .003;
			}
		}
	}

	void findGridPoint2D(int mx, int my) {
		selectedGridX = (mx - view2d.x) / cell2dWidth;
		selectedGridY = (my - view2d.y) / cell2dHeight;
		int f = fixedCheck.getState() ? 1 : 0;
		if (selectedGridX < f)
			selectedGridX = f;
		if (selectedGridY < f)
			selectedGridY = f;
		if (selectedGridX > sampleCount - f)
			selectedGridX = sampleCount - f;
		if (selectedGridY > sampleCount - f)
			selectedGridY = sampleCount - f;
		if (view2dSwap) {
			int q = selectedGridX;
			selectedGridX = selectedGridY;
			selectedGridY = q;
		}
		if (view2dReflectX)
			selectedGridX = maxTerms - selectedGridX;
		if (view2dReflectY)
			selectedGridY = maxTerms - selectedGridY;
		selectedGridFunc = func[selectedGridX][selectedGridY];
	}

	void findGridPoint3D(int mx, int my) {
		int x, y;
		int half = sampleCount / 2;
		int bestr = 3600;
		selectedGridX = selectedGridY = -1;
		for (y = 1; y < sampleCount; y++)
			for (x = 1; x < sampleCount; x++) {
				map3d(x - half, y - half, func[x][y], xpoints, ypoints, 0);
				int rx = (xpoints[0] + view3d.x - mx);
				int ry = (ypoints[0] + view3d.y - my);
				int r = rx * rx + ry * ry;
				if (r < bestr) {
					bestr = r;
					selectedGridX = x;
					selectedGridY = y;
				}
			}
		if (selectedGridX != -1)
			selectedGridFunc = func[selectedGridX][selectedGridY];
	}

	public void mouseDragged(MouseEvent e) {
		dragging = true;
		edit(e);
	}

	public void mouseMoved(MouseEvent e) {
		if (dragging)
			return;
		int x = e.getX();
		int y = e.getY();
		dragX = x;
		dragY = y;
		int panelHeight = getPanelHeight();
		int oldCoefX = selectedCoefX;
		int oldCoefY = selectedCoefY;
		selectedCoefX = -1;
		selectedCoefY = -1;
		selection = 0;
		if (view2d != null && view2d.inside(x, y))
			selection = SEL_FUNC_2D;
		else if (view3d != null && view3d.inside(x, y)) {
			selection = SEL_FUNC_3D;
			findGridPoint3D(x, y);
		} else if (viewFreq != null && viewFreq.inside(x, y)) {
			int termWidth = getTermWidth();
			selectedCoefX = (x - viewFreq.x) / termWidth;
			selectedCoefY = (y - viewFreq.y) / termWidth;
			if (selectedCoefX >= maxDispTerms)
				selectedCoefX = selectedCoefY = -1;
			if (selectedCoefY >= maxDispTerms)
				selectedCoefX = selectedCoefY = -1;
			if (selectedCoefX == 0 && fixedCheck.getState())
				selectedCoefX = 1;
			if (selectedCoefY == 0 && fixedCheck.getState())
				selectedCoefY = 1;
			if (selectedCoefX != -1 && selectedCoefY != -1)
				selection = SEL_MAG;
		}
		if (selectedCoefX != oldCoefX || selectedCoefY != oldCoefY)
			cv.repaint(pause);
	}

	public void mouseClicked(MouseEvent e) {
		if (selection == SEL_MAG)
			editMagClick();
		if (e.getClickCount() == 2 && selectedCoefX != -1) {
			int i, j;
			for (i = 0; i != maxTerms; i++)
				for (j = 0; j != maxTerms; j++)
					if (selectedCoefX != i || selectedCoefY != j)
						magcoef[i][j] = 0;
			magcoef[selectedCoefX][selectedCoefY] = 1;
			cv.repaint(pause);
		}
	}

	public void mouseEntered(MouseEvent e) {
	}

	public void mouseExited(MouseEvent e) {
		if (!dragging && selectedCoefX != -1) {
			selectedCoefX = selectedCoefY = -1;
			cv.repaint(pause);
		}
	}

	public void mousePressed(MouseEvent e) {
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
			return;
		mouseMoved(e);
		if (selection == SEL_FUNC_2D)
			findGridPoint2D(e.getX(), e.getY());
		dragStartX = e.getX();
		dragStartY = e.getY();
		if (selectedCoefX != -1)
			magDragStart = magcoef[selectedCoefX][selectedCoefY];
		viewAngleDragStart = viewAngle;
		viewHeightDragStart = viewHeight;
		viewZoomDragStart = viewZoom;
		needPlay = false;
		dragging = true;
		edit(e);
	}

	public void mouseReleased(MouseEvent e) {
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
			return;
		if (needPlay)
			doPlay();
		dragging = editingFunc = dragStop = showMode = false;
		dragSet = dragClear = false;
		mouseMoved(e);
		cv.repaint(pause);
	}

	public void itemStateChanged(ItemEvent e) {
		if (e.getItemSelectable() == stoppedCheck) {
			cv.repaint(pause);
			return;
		}
		if (e.getItemSelectable() == displayChooser
				|| e.getItemSelectable() == freqCheck) {
			setupDisplay();
			cv.repaint(pause);
		}
		if (e.getItemSelectable() == display2Chooser
				|| e.getItemSelectable() == colorCheck)
			cv.repaint(pause);
		if (e.getItemSelectable() == fixedCheck) {
			if (fixedCheck.getState() == true) {
				int i;
				for (i = 0; i != sampleCount; i++)
					magcoef[i][0] = magcoef[0][i] = 0;
			}
			transform(true);
			cv.repaint(pause);
		}
	}

	// n-dimensional discrete FFT from Numerical Recipes
	void ndfft(double data[], int nn[], int ndim, int isign) {
		int ntot = 1;
		int nprev = 1;
		int idim;
		double i2pi = isign * 2 * pi;

		for (idim = 0; idim < ndim; idim++)
			ntot *= nn[idim];

		for (idim = 0; idim < ndim; idim++) {

			int n = nn[idim];
			int nrem = ntot / (n * nprev);
			int ip1 = 2 * nprev;
			int ip2 = ip1 * n;
			int ip3 = ip2 * nrem;
			int i2rev = 0;
			int i2;
			int ifp1;

			/*
			 * Bit reversal stuff.
			 */

			for (i2 = 0; i2 < ip2; i2 += ip1) {

				int ibit;

				if (i2 < i2rev) {

					int i1;

					for (i1 = i2; i1 < i2 + ip1; i1 += 2) {

						int i3;

						for (i3 = i1; i3 < ip3; i3 += ip2) {

							int i3rev = i2rev + i3 - i2;
							double tempr = data[i3];
							double tempi = data[i3 + 1];

							data[i3] = data[i3rev];
							data[i3 + 1] = data[i3rev + 1];
							data[i3rev] = tempr;
							data[i3rev + 1] = tempi;

						}

					}

				}

				ibit = ip2 / 2;
				while ((ibit > ip1) && (i2rev > ibit - 1)) {

					i2rev -= ibit;
					ibit /= 2;

				}

				i2rev += ibit;

			}

			/*
			 * Danielson-Lanczos stuff.
			 */

			ifp1 = ip1;
			while (ifp1 < ip2) {

				int ifp2 = 2 * ifp1;
				double theta = i2pi / ((double) ifp2 / ip1);
				double wpr;
				double wpi;
				double wr = 1.0;
				double wi = 0.0;
				int i3;

				wpr = java.lang.Math.sin(0.5 * theta);
				wpr *= wpr * -2.0;
				wpi = java.lang.Math.sin(theta);

				for (i3 = 0; i3 < ifp1; i3 += ip1) {

					int i1;
					double wtemp;

					for (i1 = i3; i1 < i3 + ip1; i1 += 2) {

						for (i2 = i1; i2 < ip3; i2 += ifp2) {

							int i21 = i2 + 1;
							int k2 = i2 + ifp1;
							int k21 = k2 + 1;
							double tempr = (wr * data[k2]) - (wi * data[k21]);
							double tempi = (wr * data[k21]) + (wi * data[k2]);

							data[k2] = data[i2] - tempr;
							data[k21] = data[i21] - tempi;

							data[i2] += tempr;
							data[i21] += tempi;

						}

					}

					wtemp = wr;
					wr += (wr * wpr) - (wi * wpi);
					wi += (wi * wpr) + (wtemp * wpi);

				}
				ifp1 = ifp2;

			}
			nprev *= n;

		}

	}

	void doPlay() {
	}

	class View extends Rectangle {
		View(Dimension r) {
			super(r);
		}

		View(int a, int b, int c, int d) {
			super(a, b, c, d);
		}

		int pixels[];
		MemoryImageSource imageSource;
		Image memimage;
	}
};
