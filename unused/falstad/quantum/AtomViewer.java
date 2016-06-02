// AtomViewer.java (c) 2002 by Paul Falstad, www.falstad.com.
// Rendering algorithm in this applet is based on the description of
// the algorithm used in Atom in a Box by Dean Dauger (www.dauger.com).
// We raytrace through a 3-d dataset, sampling a number of points and
// integrating over them using Simpson's rule.

import java.io.InputStream;
import java.awt.*;
import java.awt.image.ImageProducer;
import java.applet.Applet;
import java.applet.AudioClip;
import java.util.Vector;
import java.util.Hashtable;
import java.util.Enumeration;
import java.io.File;
import java.util.Random;
import java.awt.image.*;
import java.lang.Math;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.awt.event.*;

class AtomViewerCanvas extends Canvas {
    AtomViewerFrame pg;
    AtomViewerCanvas(AtomViewerFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateAtomViewer(g);
    }
    public void paint(Graphics g) {
	pg.updateAtomViewer(g);
    }
};

class AtomViewerLayout implements LayoutManager {
    public AtomViewerLayout() {}
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
		if (m instanceof Choice && d.width > barwidth)
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

public class AtomViewer extends Applet implements ComponentListener {
    static AtomViewerFrame ogf;
    void destroyFrame() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
	repaint();
    }
    boolean started = false;
    public void init() {
	addComponentListener(this);
    }
    
    public static void main(String args[]) {
        ogf = new AtomViewerFrame(null);
        ogf.init();
    }

    void showFrame() {
	if (ogf == null) {
	    started = true;
	    ogf = new AtomViewerFrame(this);
	    ogf.init();
	    repaint();
	}
    }
    
    public void paint(Graphics g) {
	String s = "Applet is open in a separate window.";
	if (!started)
	    s = "Applet is starting.";
	else if (ogf == null)
	    s = "Applet is finished.";
	else
	    ogf.show();
	g.drawString(s, 10, 30);
    }
    
    public void componentHidden(ComponentEvent e){}
    public void componentMoved(ComponentEvent e){}
    public void componentShown(ComponentEvent e) { showFrame(); }
    public void componentResized(ComponentEvent e) {}
    
    public void destroy() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
	repaint();
    }
};

class AtomViewerFrame extends Frame
  implements ComponentListener, ActionListener, AdjustmentListener,
             MouseMotionListener, MouseListener, ItemListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage, memimage;
    
    Random random;
    int gridSizeX = 200;
    int gridSizeY = 200;
    
    public String getAppletInfo() {
	return "AtomViewer by Paul Falstad";
    }

    Button blankButton;
    Button normalizeButton;
    Button maximizeButton;
    Checkbox stoppedCheck;
    CheckboxMenuItem colorCheck;
    CheckboxMenuItem eCheckItem;
    CheckboxMenuItem xCheckItem;
    CheckboxMenuItem lCheckItem;
    CheckboxMenuItem l2CheckItem;
    CheckboxMenuItem rCheckItem;
    CheckboxMenuItem alwaysNormItem;
    CheckboxMenuItem cubicItem;
    CheckboxMenuItem dimensionsItem;
    CheckboxMenuItem axesItem;
    CheckboxMenuItem autoZoomItem;
    CheckboxMenuItem animatedZoomItem;
    CheckboxMenuItem samplesItems[];
    int samplesNums[] = { 9, 15, 25, 35, 45, 55 };
    MenuItem exitItem;
    Choice modeChooser;
    Choice viewChooser;
    Choice sliceChooser, nChooser, lChooser, mChooser;
    static final int SLICE_NONE = 0;
    static final int SLICE_X = 1;
    static final int SLICE_Y = 2;
    static final int SLICE_Z = 3;
    Scrollbar speedBar;
    Scrollbar resolutionBar;
    Scrollbar internalResBar;
    Scrollbar brightnessBar;
    Scrollbar scaleBar;
    //Scrollbar sampleBar;
    View viewPotential, viewX, viewL, viewL2, viewStates, viewRadial;
    View viewList[];
    int viewCount;
    Orbital orbitals[];
    int orbCount;
    Phasor phasors[];
    int phasorCount;
    BasisState states[];
    int stateCount;
    AlternateBasis realBasis,
	n2l1xBasis, n2l1yBasis,
	n3l1xBasis, n3l1yBasis, n3l2xBasis, n3l2yBasis,
	n4l1xBasis, n4l1yBasis, n4l2xBasis, n4l2yBasis,
	n4l3xBasis, n4l3yBasis, n4l3CubicBasis,
	spHybridBasis, sp2HybridBasis, sp3HybridBasis;
    AlternateBasis basisList[];
    int basisCount;
    TextBox textBoxes[];
    int textCount;
    boolean changingDerivedStates;
    boolean mouseDown;
    double dragZoomStart, lastXRot, lastYRot, colorMult;
    double zoom; // was 10
    double rotmatrix[];
    Rectangle viewAxes;
    static final double pi = 3.14159265358979323846;
    static final double pi2 = pi*2;
    static final double root2 = 1.41421356237309504880;
    static final double root2inv = .70710678118654752440;
    static final double baseEnergy = .55;
    int xpoints[];
    int ypoints[];
    int selectedPaneHandle;
    PhaseColor phaseColors[];
    double resadj;
    boolean dragging = false;
    MemoryImageSource imageSource;
    int pixels[];
    int sampleCount;
    int dataSize;
    static int maxModes = 10;
    static int maxDispCoefs = 8;
    static int viewDistance = 12;
    int pause;
    AtomViewer applet;
    State selectedState;
    Phasor selectedPhasor;
    int selection = -1;
    static final int SEL_NONE = 0;
    static final int SEL_POTENTIAL = 1;
    static final int SEL_X = 2;
    static final int SEL_STATES = 3;
    static final int SEL_HANDLE = 4;
    static final int MODE_ANGLE = 0;
    static final int MODE_ROTATE_X = 1;
    static final int MODE_ROTATE_Y = 2;
    static final int MODE_ROTATE_Z = 3;
    static final int MODE_SLICE = 5;
    static final int VIEW_REAL = 0;
    static final int VIEW_COMPLEX = 1;
    static final int VIEW_COMBO_REAL = 2;
    static final int VIEW_COMBO_COMP = 3;
    static final int VIEW_COMBO_N2L1 = 4;
    static final int VIEW_COMBO_N3L1 = 5;
    static final int VIEW_COMBO_N3L2 = 6;
    static final int VIEW_COMBO_N4L1 = 7;
    static final int VIEW_COMBO_N4L2 = 8;
    static final int VIEW_COMBO_N4L3 = 9;
    static final int VIEW_COMBO_HYBRID = 10;
    int slicerPoints[][];
    double sliceFaces[][];
    double sliceFace[];
    int sliceFaceCount;
    double sliceval = 0;
    int sampleMult[];
    boolean selectedSlice;
    boolean settingScale;
    double magDragStart;
    int dragX, dragY, dragStartX, dragStartY;
    double t = 0;
    public static final double epsilon = .01;
    static final int panePad = 4;
    static final int phaseColorCount = 50;
    float funcr, funci;
    int phiIndex;
    double bestBrightness, userBrightMult = 1;
    boolean manualScale;
    Color gray2;
    FontMetrics fontMetrics;

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    AtomViewerCanvas cv;

    AtomViewerFrame(AtomViewer a) {
	super("Hydrogenic Atom Viewer v1.5b");
	applet = a;
    }

    boolean useBufferedImage = false;
    
    public void init() {
	gray2 = new Color(127, 127, 127);

	int res = 100;
        String jv = System.getProperty("java.class.version");
        double jvf = new Double(jv).doubleValue();
        if (jvf >= 48)
	    useBufferedImage = true;

	setLayout(new AtomViewerLayout());
	cv = new AtomViewerCanvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	add(cv);

	MenuBar mb = new MenuBar();
	Menu m = new Menu("File");
	mb.add(m);
	m.add(exitItem = getMenuItem("Exit"));
	m = new Menu("View");
	mb.add(m);
	m.add(eCheckItem = getCheckItem("Energy"));
	eCheckItem.setState(true);
	m.add(xCheckItem = getCheckItem("Position"));
	xCheckItem.setState(true);
	xCheckItem.disable();
	m.add(lCheckItem = getCheckItem("Angular Momentum"));
	m.add(l2CheckItem = getCheckItem("Angular Momentum^2"));
	m.add(rCheckItem = getCheckItem("Radial Distribution"));
	m.addSeparator();
	m.add(colorCheck = getCheckItem("Phase as Color"));
	colorCheck.setState(true);

	m = new Menu("Options");
	mb.add(m);
	alwaysNormItem = getCheckItem("Always Normalize");
	m.add(cubicItem = getCheckItem("Show Cubic f Orbitals"));
	m.add(dimensionsItem = getCheckItem("Show Dimensions"));
	m.add(axesItem = getCheckItem("Show Axes"));
	axesItem.setState(true);
	m.add(autoZoomItem = getCheckItem("Auto Scale"));
	autoZoomItem.setState(true);
	m.add(animatedZoomItem = getCheckItem("Animated Scaling"));
	animatedZoomItem.setState(true);
	setMenuBar(mb);

	m = new Menu("Samples");
	mb.add(m);
	samplesItems = new CheckboxMenuItem[6];
	m.add(samplesItems[0] = getCheckItem("Samples = 9 (fastest)"));
	m.add(samplesItems[1] = getCheckItem("Samples = 15 (default)"));
	m.add(samplesItems[2] = getCheckItem("Samples = 25"));
	m.add(samplesItems[3] = getCheckItem("Samples = 35"));
	m.add(samplesItems[4] = getCheckItem("Samples = 45"));
	m.add(samplesItems[5] = getCheckItem("Samples = 55 (best)"));
	samplesItems[1].setState(true);
	
	viewChooser = new Choice();
	viewChooser.add("Real Orbitals (chem.)");
	viewChooser.add("Complex Orbitals (phys.)");
	viewChooser.add("Real Combinations (n=1-4)");
	viewChooser.add("Complex Combos (n=1-4)");
	viewChooser.add("Multiple Bases (n=2,l=1)");
	viewChooser.add("Multiple Bases (n=3,l=1)");
	viewChooser.add("Multiple Bases (n=3,l=2)");
	viewChooser.add("Multiple Bases (n=4,l=1)");
	viewChooser.add("Multiple Bases (n=4,l=2)");
	viewChooser.add("Multiple Bases (n=4,l=3)");
	viewChooser.add("Hybrid Bases");
	viewChooser.addItemListener(this);
	add(viewChooser);
	
	int i;
	nChooser = new Choice();
	for (i = 1; i <= 16; i++)
	    nChooser.add("n = " + i);
	nChooser.addItemListener(this);
	add(nChooser);
	nChooser.select(3);
	
	lChooser = new Choice();
	lChooser.addItemListener(this);
	add(lChooser);
	
	mChooser = new Choice();
	mChooser.addItemListener(this);
	add(mChooser);
	
	sliceChooser = new Choice();
	sliceChooser.add("No Slicing");
	sliceChooser.add("Show X Slice");
	sliceChooser.add("Show Y Slice");
	sliceChooser.add("Show Z Slice");
	sliceChooser.addItemListener(this);
	add(sliceChooser);

	modeChooser = new Choice();
	modeChooser.add("Mouse = Adjust View");
	modeChooser.add("Mouse = Rotate X");
	modeChooser.add("Mouse = Rotate Y");
	modeChooser.add("Mouse = Rotate Z");
	modeChooser.addItemListener(this);
	add(modeChooser);
	
	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	add(stoppedCheck);

	add(blankButton = new Button("Clear"));
	blankButton.addActionListener(this);
	add(normalizeButton = new Button("Normalize"));
	normalizeButton.addActionListener(this);
	add(maximizeButton = new Button("Maximize"));
	maximizeButton.addActionListener(this);

	setNValue();
	lChooser.select(3);
	setLValue();

	add(new Label("Simulation Speed", Label.CENTER));
	add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 40, 1, 1, 180));
	speedBar.addAdjustmentListener(this);

	add(new Label("Brightness", Label.CENTER));
	add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 240,
					  1, 1, 4000));
	brightnessBar.addAdjustmentListener(this);

	add(new Label("Image Resolution", Label.CENTER));
	add(resolutionBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, res, 2, 20, 300));
	resolutionBar.addAdjustmentListener(this);

	/*add(new Label("Internal Resolution", Label.CENTER));
	add(internalResBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, res, 2, 20, 200));
	    internalResBar.addAdjustmentListener(this);*/

	add(new Label("Scale", Label.CENTER));
	add(scaleBar = new Scrollbar(Scrollbar.HORIZONTAL, 75, 1, 5, 1620));
	scaleBar.addAdjustmentListener(this);

	/*add(new Label("Samples", Label.CENTER));
	add(sampleBar = new Scrollbar(Scrollbar.HORIZONTAL, 7, 1, 0, 20));
	sampleBar.addAdjustmentListener(this);*/

	add(new Label("http://www.falstad.com", Label.CENTER));

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }

	int j;
	phaseColors = new PhaseColor[8*phaseColorCount];
	for (i = 0; i != 8; i++)
	    for (j = 0; j != phaseColorCount; j++) {
		double ang = Math.atan(j/(double) phaseColorCount);
		phaseColors[i*phaseColorCount+j] = genPhaseColor(i, ang);
	    }
	
	slicerPoints = new int[2][5*2];
	sliceFaces = new double[4][3];

	rotmatrix = new double[9];
	rotmatrix[0] = rotmatrix[4] = rotmatrix[8] = 1;
	rotate(0, -pi/2);
	xpoints = new int[4];
	ypoints = new int[4];

	setupSimpson();
	setupStates();

	orbitalChanged();

	random = new Random();
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.white);
	resize(580, 500);
	handleResize();
	Dimension x = getSize();
	Dimension screen = getToolkit().getScreenSize();
	setLocation((screen.width  - x.width)/2,
		    (screen.height - x.height)/2);
	show();
    }

    void setupStates() {
	int maxn = 16;
	stateCount = maxn*(maxn+1)*(2*maxn+1)/6;
	int i;
	states = new BasisState[stateCount];
	int n = 1;
	int l = 0;
	int m = 0;
	for (i = 0; i != stateCount; i++) {
	    BasisState bs = states[i] = new BasisState();
	    bs.elevel = -1/(2.*n*n);
	    bs.n = n;
	    bs.l = l;
	    bs.m = m;
	    if (m < l)
		m++;
	    else {
		l++;
		if (l < n)
		    m = -l;
		else {
		    n++;
		    l = m = 0;
		}
	    }
	}

	basisList = new AlternateBasis[17];
	basisCount = 0;
	realBasis = new AlternateBasis();
	int maxRealN = 4;
	int realct = 
	    realBasis.altStateCount = maxRealN*(maxRealN+1)*(2*maxRealN+1)/6;
	realBasis.altStates = new DerivedState[realct];
	n = 1;
	l = m = 0;
	for (i = 0; i != realct; i++) {
	    DerivedState ds = realBasis.altStates[i] = new DerivedState();
	    ds.basis = realBasis;
	    if (m == 0) {
		ds.count = 1;
		ds.bstates = new BasisState[1];
		ds.bstates[0] = getState(n, l, 0);
		ds.coefs = new Complex[1];
		ds.coefs[0] = new Complex(1, 0);
	    } else {
		int m0 = m-1;
		int realm = m0/2+1;
		ds.count = 2;
		ds.bstates = new BasisState[2];
		ds.bstates[0] = getState(n, l,  realm);
		ds.bstates[1] = getState(n, l, -realm);
		ds.coefs = new Complex[2];
		double mphase = Math.pow(-1, realm);
		if ((m0 & 1) == 0) {
		    ds.coefs[0] = new Complex(mphase*root2inv, 0);
		    ds.coefs[1] = new Complex(root2inv, 0);
		} else {
		    ds.coefs[0] = new Complex(0, mphase*root2inv);
		    ds.coefs[1] = new Complex(0, -root2inv);
		}
	    }
	    switch (l) {
	    case 0: ds.text = n + "s"; break;
	    case 1: ds.text = n + l1RealText[m]; break;
	    case 2: ds.text = n + l2RealText[m]; break;
	    case 3: ds.text = n + l3RealText[m]; break;
	    }
	    if (m < l*2)
		m++;
	    else {
		l++;
		if (l < n)
		    m = 0;
		else {
		    n++;
		    l = m = 0;
		}
	    }
	}

	n2l1xBasis = setupLBasis(2, 1, true, l1xArray);
	n2l1yBasis = setupLBasis(2, 1, false, l1yArray);
	n3l1xBasis = setupLBasis(3, 1, true, l1xArray);
	n3l1yBasis = setupLBasis(3, 1, false, l1yArray);
	n3l2xBasis = setupLBasis(3, 2, true, l2xArray);
	n3l2yBasis = setupLBasis(3, 2, false, l2yArray);
	n4l1xBasis = setupLBasis(4, 1, true, l1xArray);
	n4l1yBasis = setupLBasis(4, 1, false, l1yArray);
	n4l2xBasis = setupLBasis(4, 2, true, l2xArray);
	n4l2yBasis = setupLBasis(4, 2, false, l2yArray);
	n4l3xBasis = setupLBasis(4, 3, true, l3xArray);
	n4l3yBasis = setupLBasis(4, 3, false, l3yArray);
	n4l3CubicBasis = setupLBasis(4, 3, false, l3CubicArray);
	n4l3CubicBasis.n = 0;
	spHybridBasis = setupHybridBasis(spHybridArray, spHybridText);
	sp2HybridBasis = setupHybridBasis(sp2HybridArray, sp2HybridText);
	sp3HybridBasis = setupHybridBasis(sp3HybridArray, sp3HybridText);
    }

    AlternateBasis setupLBasis(int n, int l, boolean xAxis, double arr[]) {
	int sct = l*2+1;
	AlternateBasis basis = new AlternateBasis();
	basis.n = n;
	basis.l = l;
	basis.xAxis = xAxis;
	String mtext = (xAxis) ? "mx" : "my";
	basis.altStates = new DerivedState[sct];
	basis.altStateCount = sct;
	int i;
	for (i = 0; i != sct; i++) {
	    DerivedState ds = basis.altStates[i] = new DerivedState();
	    ds.basis = basis;
	    ds.count = sct;
	    ds.bstates = new BasisState[sct];
	    ds.coefs = new Complex[sct];
	    ds.m = i-l;
	    int j;
	    for (j = 0; j != sct; j++) {
		ds.bstates[j] = getState(n, l, j-l);
		ds.coefs[j] = new Complex();
	    }
	    if (arr == l3CubicArray)
		ds.text = "4" + l3CubicRealText[i];
	    else
		ds.text = "n = " + n + ", l = " + l + ", " +
		    mtext + " = " + ds.m;
	}
	int ap = 0;
	for (i = 0; i != sct; i++) {
	    int j;
	    for (j = 0; j != sct; j++) {
		basis.altStates[i].coefs[j].set(arr[ap], arr[ap+1]);
		ap += 2;
	    }
	}
	return basis;
    }

    AlternateBasis setupHybridBasis(double arr[], String names[]) {
	int sct = 4;
	AlternateBasis basis = new AlternateBasis();
	basis.altStates = new DerivedState[sct];
	basis.altStateCount = sct;
	int i;
	for (i = 0; i != sct; i++) {
	    DerivedState ds = basis.altStates[i] = new DerivedState();
	    ds.basis = basis;
	    ds.count = sct;
	    ds.bstates = new BasisState[sct];
	    ds.coefs = new Complex[sct];
	    ds.text = names[i];
	    int j;
	    ds.bstates[0] = getState(2, 0, 0);
	    ds.coefs[0] = new Complex();
	    for (j = 0; j != 3; j++) {
		ds.bstates[j+1] = getState(2, 1, j-1);
		ds.coefs[j+1] = new Complex();
	    }
	}
	int ap = 0;
	for (i = 0; i != sct; i++) {
	    int j;
	    for (j = 0; j != sct; j++) {
		basis.altStates[i].coefs[j].set(arr[ap], arr[ap+1]);
		ap += 2;
	    }
	}
	return basis;
    }

    // Lx and Ly eigenvectors for various values of l, expressed in
    // terms of Lz eigenvectors
    double l1xArray[] = { .5, 0, -root2inv, 0, .5, 0, root2inv, 0, 0, 0,
			  -root2inv, 0, .5, 0, root2inv, 0, .5, 0 };
    double l1yArray[] = { .5, 0, 0, -root2inv, -.5, 0, 0, -root2inv,
			  0, 0, 0, -root2inv, .5, 0, 0, root2inv, -.5, 0 };
    static final double root6by4 = .61237243569579452454;
    double l2xArray[] = {
	1/4., 0, -1/2., 0, root6by4, 0, -1/2., 0, 1/4., 0,
	-.5, 0, .5, 0, 0, 0, -.5, 0, .5, 0,
	root6by4, 0, 0, 0, -.5, 0, 0, 0, root6by4, 0,
	-.5, 0, -.5, 0, 0, 0, .5, 0, .5, 0,
	1/4., 0, 1/2., 0, root6by4, 0, 1/2., 0, 1/4., 0
    };
    double l2yArray[] = {
	1/4., 0, 0, -1/2., -root6by4, 0, 0, 1/2., 1/4., 0,
	-.5,  0, 0, .5, 0, 0, 0,      .5,       .5, 0,
	-root6by4, 0, 0, 0, -.5, 0, 0, 0, -root6by4, 0,
	-.5, 0, 0, -.5, 0, 0, 0, -.5, .5, 0,
	1/4., 0, 0,  1/2., -root6by4, 0, 0, -1/2., 1/4., 0
    };
    double l3xArray[] = {
	0.125,0, -0.306186,0, 0.484123,0, -0.559017,0,
	  0.484123,0, -0.306186,0, 0.125,0,
	-0.306186,0, 0.5,0, -0.395285,0, 0.,0,
	  0.395285,0, -0.5,0, 0.306186,0,
	0.484123,0, -0.395285,0, -0.125,0, 0.433013,0,
	  -0.125,0, -0.395285,0, 0.4841230,0,
	0.559017,0, 0.,0, -0.433013,0, 0.,0, 
	  0.433013,0, 0.,0, -0.559017,0,
	0.484123,0, 0.395285,0, -0.125,0, -0.433013,0,
	  -0.125,0, 0.395285,0, 0.484123,0,
	-0.306186,0, -0.5,0, -0.395285,0, 0.,0,
	  0.395285,0, 0.5,0, 0.306186,0,
	0.125,0, 0.306186,0, 0.484123,0, 0.559017,0,
	  0.484123,0, 0.306186,0, 0.125,0
    };
    double l3yArray[] = {
	-0.125,0, 0,0.306186, 0.484123,0, 0,-0.559017,
	  -0.484123,0, 0,0.306186, 0.125,0,
	0.306186,0, 0,-0.5, -0.395285,0, 0.,0,
	  -0.395285,0, 0,0.5, 0.306186,0,
	-0.484123,0, 0,0.395285, -0.125,0, 0,0.433013,
	  0.125,0, 0,0.395285, 0.484123,0,
	0,0.559017, 0.,0, 0,0.433013, 0.,0,
	  0,0.433013, 0.,0, 0,0.559017,
	-0.484123,0, 0,-0.395285, -0.125,0, 0,-0.433013,
	  0.125,0, 0,-0.395285, 0.484123,0,
	0.306186,0, 0,+0.5, -0.395285,0, 0.,0, -0.395285,0,
	  0,-0.5, 0.306186,0,
	-0.125,0, 0,-0.306186, 0.484123,0, 0,+0.559017,
	  -0.484123,0, 0,-0.306186, 0.125,0
    };
    double l3CubicArray[] = {
	0,0, 0,0, 0,0, 1,0, 0,0, 0,0, 0,0,
	.559017,0, 0,0, -.433013,0, 0,0, .433013,0, 0,0, -.559017,0,
	0,.559017, 0,0, 0,.433013, 0,0, 0,.433013, 0,0, 0,.559017,
	0,0, root2inv,0, 0,0, 0,0, 0,0, root2inv,0, 0,0,
	0,0, 0,-root2inv, 0,0, 0,0, 0,0, 0,root2inv, 0,0,
	.433013,0, 0,0, .559017,0, 0,0, -.559017,0, 0,0, -.433013,0,
	0,.433013, 0,0, 0,-.559017, 0,0, 0,-.559017, 0,0, 0,.433013
    };

    double spHybridArray[] = {
	-root2inv, 0,  0, 0,  -root2inv, 0,  0, 0,
	-root2inv, 0,  0, 0,  root2inv, 0,  0, 0,
	0, 0,  root2inv, 0,  0, 0,  -root2inv, 0,
	0, 0,  0, -root2inv,  0, 0,  0, -root2inv,
    };
    double sp2HybridArray[] = {
	-.57735, 0,  .57735, 0,   0, 0,  -.57735, 0,
	-.57735, 0,  -.288675, -.5,  0, 0,  .288675, -.5,
	-.57735, 0,  -.288675, .5,  0, 0,  .288675, .5,
	0, 0,  0, 0,  1, 0,  0, 0
    };
    // px = (m=-1 - m=1) *root2inv
    // py = (i m=-1 + i m=1) * root2inv
    double sp3HybridArray[] = {
	-.5, 0,  -root2inv/2, root2inv/2,  -.5, 0,  root2inv/2, root2inv/2,
	-.5, 0,  root2inv/2, -root2inv/2,  -.5, 0,  -root2inv/2, -root2inv/2,
	-.5, 0,  root2inv/2, root2inv/2,  .5, 0,  -root2inv/2, root2inv/2,
	-.5, 0,  -root2inv/2, -root2inv/2,  .5, 0,  root2inv/2, -root2inv/2,
    };
    String spHybridText[] = { "2sp (1)", "2sp (2)", "2px", "2py" };
    String sp2HybridText[] = { "2sp2 (1)", "2sp2 (2)", "2sp2 (3)", "2pz" };
    String sp3HybridText[] = { "2sp3 (1)", "2sp3 (2)", "2sp3 (3)", "2sp3 (4)" };

    MenuItem getMenuItem(String s) {
	MenuItem mi = new MenuItem(s);
	mi.addActionListener(this);
	return mi;
    }

    CheckboxMenuItem getCheckItem(String s) {
	CheckboxMenuItem mi = new CheckboxMenuItem(s);
	mi.addItemListener(this);
	return mi;
    }

    PhaseColor genPhaseColor(int sec, double ang) {
	// convert to 0 .. 2*pi angle
	ang += sec*pi/4;
	// convert to 0 .. 6
	ang *= 3/pi;
	int hsec = (int) ang;
	double a2 = ang % 1;
	double a3 = 1.-a2;
	PhaseColor c = null;
	switch (hsec) {
	case 6:
	case 0: c = new PhaseColor(1, a2, 0); break;
	case 1: c = new PhaseColor(a3, 1, 0); break;
	case 2: c = new PhaseColor(0, 1, a2); break;
	case 3: c = new PhaseColor(0, a3, 1); break;
	case 4: c = new PhaseColor(a2, 0, 1); break;
	case 5: c = new PhaseColor(1, 0, a3); break;
	}
	return c;
    }

    void setupSimpson() {
	sampleCount = 15;
	//sampleCount = sampleBar.getValue()*2+1;
	int i;
	for (i = 0; i != samplesNums.length; i++) {
	    if (samplesItems[i].getState())
		sampleCount = samplesNums[i];
	}
	System.out.print("sampleCount = " + sampleCount + "\n");

	// generate table of sample multipliers for efficient Simpson's rule
	sampleMult = new int[sampleCount];
	for (i = 1; i < sampleCount; i += 2) {
	    sampleMult[i  ] = 4;
	    sampleMult[i+1] = 2;
	}
	sampleMult[0] = sampleMult[sampleCount-1] = 1;
    }

    void handleResize() {
	reinit();
    }

    void reinit() {
	setResolution();
        Dimension d = winSize = cv.getSize();
	if (winSize.width == 0)
	    return;
	dbimage = createImage(d.width, d.height);
	setupDisplay();
    }

    void setupMenus() {
	switch (viewChooser.getSelectedIndex()) {
	case VIEW_COMPLEX:
	case VIEW_REAL:
	    nChooser.show();
	    lChooser.show();
	    mChooser.show();
	    modeChooser.hide();
	    modeChooser.select(MODE_ANGLE);
	    blankButton.hide();
	    normalizeButton.hide();
	    maximizeButton.hide();
	    alwaysNormItem.disable();
	    break;
	default:
	    nChooser.hide();
	    lChooser.hide();
	    mChooser.hide();
	    modeChooser.show();
	    blankButton.show();
	    normalizeButton.show();
	    maximizeButton.show();
	    alwaysNormItem.enable();
	    break;
	}
	if (viewChooser.getSelectedIndex() == VIEW_REAL)
	    cubicItem.enable();
	else
	    cubicItem.disable();
	validate();
    }

    void createPhasors() {
	phasorCount = textCount = 0;
	int i;
	for (i = 0; i != basisCount; i++)
	    basisList[i].active = false;

	if (viewStates == null)
	    return;
	
	int sz = viewStates.height/4;
	int x = 0;
	int y = viewStates.y;
	int n = 1, l = 0, m = 0;
	textBoxes = new TextBox[10];

	switch (viewChooser.getSelectedIndex()) {
	case VIEW_COMPLEX:
	case VIEW_REAL:
	    break;
	case VIEW_COMBO_REAL:
	case VIEW_COMBO_COMP:
	    phasorCount = 30;
	    phasors = new Phasor[phasorCount];
	    for (i = 0; i != phasorCount; i++) {
		Phasor ph = phasors[i] = new Phasor(x, y, sz, sz);
		if (viewChooser.getSelectedIndex() == VIEW_COMBO_REAL)
		    ph.state = realBasis.altStates[i];
		else
		    ph.state = states[i];
		x += sz;
		if (++m > l) {
		    x += sz;
		    l++;
		    m = -l;
		    if (l >= n) {
			x = 0;
			y += sz;
			n++;
			l = m = 0;
		    }
		}
	    }
	    break;
	case VIEW_COMBO_N2L1:
	    phasorCount = 12;
	    phasors = new Phasor[phasorCount];
	    i = 0;
	    i = createBasisPhasors(x, y, sz, i, 2, 1);
	    createText("Lz", x+sz*3, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n2l1xBasis, 3, 0);
	    createText("Lx", x+sz*3, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n2l1yBasis, 3, 0);
	    createText("Ly", x+sz*3, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, realBasis, 3, 2);
	    createText("Real (pz,px,py)", x+sz*3, y, sz);
	    break;
	case VIEW_COMBO_N3L1:
	    phasorCount = 12;
	    phasors = new Phasor[phasorCount];
	    i = 0;
	    i = createBasisPhasors(x, y, sz, i, 3, 1);
	    createText("Lz", x+sz*3, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n3l1xBasis, 3, 0);
	    createText("Lx", x+sz*3, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n3l1yBasis, 3, 0);
	    createText("Ly", x+sz*3, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, realBasis, 3, 6);
	    createText("Real (pz,px,py)", x+sz*3, y, sz);
	    break;
	case VIEW_COMBO_N3L2:
	    phasorCount = 20;
	    phasors = new Phasor[phasorCount];
	    i = 0;
	    i = createBasisPhasors(x, y, sz, i, 3, 2);
	    createText("Lz", x+sz*5, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n3l2xBasis, 5, 0);
	    createText("Lx", x+sz*5, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n3l2yBasis, 5, 0);
	    createText("Ly", x+sz*5, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, realBasis, 5, 9);
	    createText("Real", x+sz*5, y, sz);
	    break;
	case VIEW_COMBO_N4L1:
	    phasorCount = 12;
	    phasors = new Phasor[phasorCount];
	    i = 0;
	    i = createBasisPhasors(x, y, sz, i, 4, 1);
	    createText("Lz", x+sz*3, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n4l1xBasis, 3, 0);
	    createText("Lx", x+sz*3, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n4l1yBasis, 3, 0);
	    createText("Ly", x+sz*3, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, realBasis, 3, 15);
	    createText("Real (pz,px,py)", x+sz*3, y, sz);
	    break;
	case VIEW_COMBO_N4L2:
	    phasorCount = 20;
	    phasors = new Phasor[phasorCount];
	    i = 0;
	    i = createBasisPhasors(x, y, sz, i, 4, 2);
	    createText("Lz", x+sz*5, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n4l2xBasis, 5, 0);
	    createText("Lx", x+sz*5, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n4l2yBasis, 5, 0);
	    createText("Ly", x+sz*5, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, realBasis, 5, 18);
	    createText("Real", x+sz*5, y, sz);
	    break;
	case VIEW_COMBO_N4L3:
	    phasorCount = 35;
	    phasors = new Phasor[phasorCount];
	    sz = viewStates.height/5;
	    i = 0;
	    i = createBasisPhasors(x, y, sz, i, 4, 3);
	    createText("Lz", x+sz*7, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n4l3xBasis, 7, 0);
	    createText("Lx", x+sz*7, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n4l3yBasis, 7, 0);
	    createText("Ly", x+sz*7, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, realBasis, 7, 23);
	    createText("Real (General)", x+sz*7, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, n4l3CubicBasis, 7, 0);
	    createText("Real (Cubic)", x+sz*7, y, sz);
	    break;
	case VIEW_COMBO_HYBRID:
	    sz = viewStates.height/5;
	    phasorCount = 20;
	    phasors = new Phasor[phasorCount];
	    i = 0;
	    i = createAltPhasors(x, y, sz, i, spHybridBasis, 4, 0);
	    createText("sp", x+sz*4, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, sp2HybridBasis, 4, 0);
	    createText("sp2", x+sz*4, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, sp3HybridBasis, 4, 0);
	    createText("sp3", x+sz*4, y, sz);
	    y += sz;
	    phasors[i] = new Phasor(x, y, sz, sz);
	    phasors[i++].state = getState(2, 0, 0);
	    i = createBasisPhasors(x+sz, y, sz, i, 2, 1);
	    createText("Lz", x+sz*4, y, sz);
	    y += sz;
	    i = createAltPhasors(x, y, sz, i, realBasis, 4, 1);
	    createText("Real (s,pz,px,py)", x+sz*4, y, sz);
	    break;
	}
	for (i = 0; i != phasorCount; i++)
	    phasors[i].state.setBasisActive();
	for (i = 0; i != basisCount; i++) {
	    if (basisList[i].active) {
		// this clears out any states which do not have phasors present
		basisList[i].convertBasisToDerived();
		basisList[i].convertDerivedToBasis();
	    }
	}

	// and if we're viewing Complex Combos, we need an extra step
	// to clear out any states with n>4.  All other views are handled
	// by the previous loop.
	if (viewChooser.getSelectedIndex() == VIEW_COMBO_COMP)
	    for (i = realBasis.altStateCount; i != stateCount; i++)
		states[i].set(0);

	// in case the states changed
	createOrbitals();
    }

    boolean higherStatesPresent() {
	int i;
	for (i = realBasis.altStateCount; i != stateCount; i++)
	    if (states[i].mag > 0)
		return true;
	return false;
    }

    void setInitialOrbital() {
	if (phasorCount == 0)
	    return;
	int i;
	for (i = 0; i != stateCount; i++)
	    if (states[i].mag > 0)
		return;

	// no states active, so pick a phasor (a basis phasor, for speed)
	// and select it.
	for (i = 0; i != phasorCount; i++)
	    if (phasors[i].state instanceof BasisState) {
		phasors[i].state.set(1);
		createOrbitals();
		return;
	    }
    }

    int createBasisPhasors(int x, int y, int sz, int i, int n, int l) {
	int j;
	for (j = 0; j != l*2+1; j++) {
	    Phasor ph = phasors[i] = new Phasor(x, y, sz, sz);
	    ph.state = getState(n, l, j-l);
	    x += sz;
	    i++;
	}
	return i;
    }

    int createAltPhasors(int x, int y, int sz, int i, AlternateBasis basis,
			 int ct, int offset) {
	int j;
	for (j = 0; j != ct; j++) {
	    Phasor ph = phasors[i] = new Phasor(x, y, sz, sz);
	    ph.state = basis.altStates[j+offset];
	    x += sz;
	    i++;
	}
	return i;
    }
    
    void createText(String text, int x, int y, int sz) {
	TextBox tb = new TextBox(x+10, y, winSize.width-x, sz, text);
	textBoxes[textCount++] = tb;
    }

    void setupDisplay() {
	if (winSize == null)
	    return;
	int potsize = (viewPotential == null) ? 50 : viewPotential.height;
	int statesize = (viewStates == null) ? 64 : viewStates.height;
	viewX = viewPotential = viewRadial = viewL =
	    viewL2 = viewStates = null;
	viewList = new View[10];
	int i = 0;
	if (eCheckItem.getState())
	    viewList[i++] = viewPotential = new View();
	if (xCheckItem.getState())
	    viewList[i++] = viewX = new View();
	if (lCheckItem.getState())
	    viewList[i++] = viewL = new View();
	if (l2CheckItem.getState())
	    viewList[i++] = viewL2 = new View();
	if (rCheckItem.getState())
	    viewList[i++] = viewRadial = new View();
	if (viewChooser.getSelectedIndex() > VIEW_COMPLEX)
	    viewList[i++] = viewStates = new View();
	viewCount = i;
	int sizenum = viewCount;
	int toth = winSize.height;

	// preserve size of potential and state panes if possible
	if (potsize > 0 && viewPotential != null) {
	    sizenum--;
	    toth -= potsize;
	}
	if (statesize > 0 && viewStates != null) {
	    sizenum--;
	    toth -= statesize;
	}
	toth -= panePad*2*(viewCount-1);
	int cury = 0;
	for (i = 0; i != viewCount; i++) {
	    View v = viewList[i];
	    int h = (sizenum == 0) ? toth : toth/sizenum;
	    if (v == viewPotential && potsize > 0)
		h = potsize;
	    else if (v == viewStates && statesize > 0)
		h = statesize;
	    v.paneY = cury;
	    if (cury > 0)
		cury += panePad;
	    v.x = 0;
	    v.width = winSize.width;
	    v.y = cury;
	    v.height = h;
	    cury += h+panePad;
	}
	setSubViews();
    }

    void setSubViews() {
	int i;
	pixels = null;
	if (useBufferedImage) {
	    try {
		/* simulate the following code using reflection:
		   dbimage = new BufferedImage(d.width, d.height,
		   BufferedImage.TYPE_INT_RGB);
		   DataBuffer db = (DataBuffer)(((BufferedImage)memimage).
		   getRaster().getDataBuffer());
		   DataBufferInt dbi = (DataBufferInt) db;
		   pixels = dbi.getData();
		*/
		Class biclass = Class.forName("java.awt.image.BufferedImage");
		Class dbiclass = Class.forName("java.awt.image.DataBufferInt");
		Class rasclass = Class.forName("java.awt.image.Raster");
		Constructor cstr = biclass.getConstructor(
		    new Class[] { int.class, int.class, int.class });
		memimage = (Image) cstr.newInstance(new Object[] {
		    new Integer(viewX.width), new Integer(viewX.height),
		    new Integer(1)}); // BufferedImage.TYPE_INT_RGB)});
		Method m = biclass.getMethod("getRaster", null);
		Object ras = m.invoke(memimage, null);
		Object db = rasclass.getMethod("getDataBuffer", null).
		    invoke(ras, null);
		pixels = (int[])
		    dbiclass.getMethod("getData", null).invoke(db, null);
	    } catch (Exception ee) {
		// ee.printStackTrace();
		System.out.println("BufferedImage failed");
	    }
	}
	if (pixels == null) {
	    pixels = new int[viewX.width*viewX.height];
	    for (i = 0; i != viewX.width*viewX.height; i++)
		pixels[i] = 0xFF000000;
	    imageSource = new MemoryImageSource(viewX.width, viewX.height,
						pixels, 0, viewX.width);
	    imageSource.setAnimated(true);
	    imageSource.setFullBufferUpdates(true);
	    memimage = cv.createImage(imageSource);
	}
	int asize = (int) (min(viewX.width, viewX.height)/3);
	viewAxes = new Rectangle(viewX.x+winSize.width-asize, viewX.y,
				 asize, asize);

	setupMenus();
	createPhasors();
    }

    int getTermWidth() {
	return 8;
    }

    // multiply rotation matrix by rotations through angle1 and angle2
    void rotate(double angle1, double angle2) {
	double r1cos = Math.cos(angle1);
	double r1sin = Math.sin(angle1);
	double r2cos = Math.cos(angle2);
	double r2sin = Math.sin(angle2);
	double rotm2[] = new double[9];

	// angle1 is angle about y axis, angle2 is angle about x axis
	rotm2[0] = r1cos;
	rotm2[1] = -r1sin*r2sin;
	rotm2[2] = r2cos*r1sin;

	rotm2[3] = 0;
	rotm2[4] = r2cos;
	rotm2[5] = r2sin;

	rotm2[6] = -r1sin;
	rotm2[7] = -r1cos*r2sin;
	rotm2[8] = r1cos*r2cos;

	double rotm1[] = rotmatrix;
	rotmatrix = new double[9];

	int i, j, k;
	for (j = 0; j != 3; j++)
	    for (i = 0; i != 3; i++) {
		double v = 0;
		for (k = 0; k != 3; k++)
		    v += rotm1[k+j*3]*rotm2[i+k*3];
		rotmatrix[i+j*3] = v;
	    }
    }

    double max(double a, double b) { return a > b ? a : b; }
    double min(double a, double b) { return a < b ? a : b; }

    void setResolution() {
	int og = gridSizeX;
	gridSizeX = gridSizeY = (resolutionBar.getValue() & ~1);
	if (og == gridSizeX)
	    return;
	dataSize = gridSizeX*4; // (internalResBar.getValue() & ~1);
	System.out.print("setResolution " + dataSize + " " +
			 gridSizeX + " " + winSize + "\n");
	// was 50
	resadj = 50./dataSize;
	precomputeAll();
    }

    int getN() { return nChooser.getSelectedIndex() + 1; }
    int getL() { return lChooser.getSelectedIndex(); }
    int getM() { return mChooser.getSelectedIndex() - getL(); }

    String codeLetter[] = {
	"s", "p", "d", "f", "g", "h"
    };

    void setNValue() {
	int i;
	int n = nChooser.getSelectedIndex()+1;
	int l = lChooser.getSelectedIndex();
	lChooser.removeAll();
	for (i = 0; i < n; i++)
	    lChooser.add("l = " + i +
			 ((i < 6) ? " (" + codeLetter[i] + ")" : ""));
	if (l < n && l >= 0)
	    lChooser.select(l);
	setLValue();
    }

    void setLValue() {
	int l = getL();
	int i;
	mChooser.removeAll();
	if (viewChooser.getSelectedIndex() == VIEW_REAL) {
	    if (l == 0)
		mChooser.add(getN() + "s");
	    else if (l == 1) {
		for (i = 0; i != 3; i++)
		    mChooser.add(getN() + l1RealText[i]);
	    } else if (l == 2) {
		for (i = 0; i != 5; i++)
		    mChooser.add(getN() + l2RealText[i]);
	    } else if (l == 3 && !cubicItem.getState()) {
		for (i = 0; i != 7; i++)
		    mChooser.add(getN() + l3RealText[i]);
	    } else if (l == 3 && cubicItem.getState()) {
		for (i = 0; i != 7; i++)
		    mChooser.add(getN() + l3CubicRealText[i]);
	    } else {
		mChooser.add("m = 0");
		for (i = 1; i <= l; i++) {
		    mChooser.add("m = +-" + i + " (+)");
		    mChooser.add("m = +-" + i + " (-)");
		}
	    }
	} else {
	    for (i = -l; i <= l; i++)
		mChooser.add("m = " + i);
	    mChooser.select(l);
	}
	validate();
    }

    String l1RealText[] = { "pz", "px", "py" };
    String l2RealText[] = { "dz2", "dxz", "dyz", "d(x2-y2)", "dxy" };
    String l3RealText[] = { "fz3", "fxz2", "fyz2", "fz(x2-y2)",
			    "fxyz", "fx(x2-3y2)", "fy(3x2-y2)" };
    String l3CubicRealText[] = { "fz3", "fx3", "fy3", "fz(x2-y2)",
				 "fxyz", "fx(z2-y2)", "fy(z2-x2)" };

    // compute 2-d view by raytracing through a 3-d dataset
    void computeView(double normmult) {
	int i, j;
	double q = 3.14159265/dataSize;
	boolean color = colorCheck.getState();
	for (i = 0; i != orbCount; i++)
	    orbitals[i].setupFrame(normmult);
	double izoom = 1/zoom;
	double rotm[] = rotmatrix;
	double aratio = viewX.width/(double) viewX.height;
	double xmult = dataSize/2.;
	double ymult = dataSize/2.;
	double zmult = dataSize/2.;
	double aratiox = izoom, aratioy = izoom;
	// preserve aspect ratio no matter what window dimensions
	if (aratio < 1)
	    aratioy /= aratio;
	else
	    aratiox *= aratio;
	int slice = sliceChooser.getSelectedIndex();
	double boundRadius2 = 0;
	for (i = 0; i != orbCount; i++) {
	    Orbital oo = orbitals[i];
	    double br = oo.getBoundRadius(colorMult);
	    if (br > boundRadius2)
		boundRadius2 = br;
	}
	boundRadius2 *= boundRadius2;
	for (i = 0; i != gridSizeX; i++)
	    for (j = 0; j != gridSizeY; j++) {
		// calculate camera direction
		double camvx0 = (2*i/(double) gridSizeX - 1)*aratiox;
		double camvy0 = -(2*j/(double) gridSizeY - 1)*aratioy;
		// rotate camera with rotation matrix
		double camx  = rotm[2]*viewDistance;
		double camy  = rotm[5]*viewDistance;
		double camz  = rotm[8]*viewDistance;
		double camvx = rotm[0]*camvx0+rotm[1]*camvy0-rotm[2];
		double camvy = rotm[3]*camvx0+rotm[4]*camvy0-rotm[5];
		double camvz = rotm[6]*camvx0+rotm[7]*camvy0-rotm[8];
		double camnorm =
		    Math.sqrt(camvx0*camvx0+camvy0*camvy0+1);
		int n;
		float simpr = 0;
		float simpg = 0;
		float simpb = 0;
		// calculate intersections with bounding sphere
		double a = camvx*camvx+camvy*camvy+camvz*camvz;
		double b = 2*(camvx*camx+camvy*camy+camvz*camz);
		double c = camx*camx+camy*camy+camz*camz-boundRadius2;
		double discrim = b*b-4*a*c;
		if (discrim < 0) {
		    // doesn't hit it
		    fillSquare(i, j, 0, 0, 0);
		    continue;
		}
		discrim = Math.sqrt(discrim);
		double mint = (-b-discrim)/(2*a);
		double maxt = (-b+discrim)/(2*a);
		if (slice != SLICE_NONE) {
		    double t = -100;
		    switch (slice) {
		    case SLICE_X: t = (sliceval-camx)/camvx; break;
		    case SLICE_Y: t = (sliceval-camy)/camvy; break;
		    case SLICE_Z: t = (sliceval-camz)/camvz; break;
		    }
		    if (t < mint || t > maxt) {
			fillSquare(i, j, 0, 0, 0);
			continue;
		    }
		    mint = maxt = t;
		}
		// sample evenly along intersecting portion
		double tstep = (maxt-mint)/(sampleCount-1);
		double pathlen = (maxt-mint)*camnorm;
		int maxn = sampleCount-1;
		n = 1;
		double xx = (camx + camvx * mint) * xmult;
		double yy = (camy + camvy * mint) * ymult;
		double zz = (camz + camvz * mint) * zmult;
		if (slice != SLICE_NONE) {
		    maxn = 1;
		    n = 0;
		    pathlen = 2;
		    if (xx >  xmult || yy >  ymult || zz >  zmult ||
			xx < -xmult || yy < -ymult || zz < -zmult) {
			fillSquare(i, j, 0, 0, 0);
			continue;
		    }
		}
		camvx *= tstep*xmult;
		camvy *= tstep*ymult;
		camvz *= tstep*zmult;
		int dshalf = dataSize/2;
		int oi;
		for (; n < maxn; n++) {
		    // find grid element that contains sampled point
		    double r = Math.sqrt(xx*xx+yy*yy+zz*zz);
		    double costh = zz/r;
		    int ri = (int) r;
		    int costhi = (int) (costh*dshalf+dshalf);
		    float fr = 0, fi = 0;
		    calcPhiComponent(xx, yy);
		    for (oi = 0; oi != orbCount; oi++) {
			Orbital oo = orbitals[oi];
			oo.computePoint(ri, costhi);
			fr += funcr;
			fi += funci;
		    }
		    if (color) {
			float fv = fr*fr+fi*fi;
			if (fv > 1)
			    System.out.print("fv = " + fv + "\n");
			fv *= sampleMult[n];
			PhaseColor col = getPhaseColor(fr, fi);
			simpr += col.r * fv;
			simpg += col.g * fv;
			simpb += col.b * fv;
		    } else {
			float fv = (fr*fr+fi*fi) * sampleMult[n];
			simpr = simpg = (simpb += fv);
		    }
		    xx += camvx;
		    yy += camvy;
		    zz += camvz;
		}
		simpr *= pathlen/n;
		simpg *= pathlen/n;
		simpb *= pathlen/n;
		fillSquare(i, j, simpr, simpg, simpb);
	    }
    }

    void fillSquare(int i, int j, float cr, float cg, float cb) {
	int winw = viewX.width;
	int winh = viewX.height;
	int x = i*winw/gridSizeX;
	int y = j*winh/gridSizeY;
	int x2 = (i+1)*winw/gridSizeX;
	int y2 = (j+1)*winh/gridSizeY;
	cr *= colorMult;
	cg *= colorMult;
	cb *= colorMult;
	int k, l;
	if (cr == 0 && cg == 0 && cb == 0) {
	    int y2l = y2*viewX.width;
	    for (k = x; k < x2; k++)
		for (l = y*viewX.width; l < y2l; l += viewX.width)
		    pixels[k+l] = 0xFF000000;
	    return;
	}
	double fm = max(cr, max(cg, cb));
	if (fm > 255) {
	    fm /= 255;
	    cr /= fm;
	    cg /= fm;
	    cb /= fm;
	}
	int colval = 0xFF000000 +
	    (((int) cr) << 16) |
	    (((int) cg) << 8) |
	    (((int) cb));
	int y2l = y2*viewX.width;
	for (k = x; k < x2; k++)
	    for (l = y*viewX.width; l < y2l; l += viewX.width)
		pixels[k+l] = colval;
    }
    
    PhaseColor getPhaseColor(double x, double y) {
	double val = 0;
	if (x == 0 && y == 0)
	    return phaseColors[0];
	int offset = 0;
	if (y >= 0) {
	    if (x >= 0) {
		if (x >= y) {
		    offset = 0;
		    val = y/x;
		} else {
		    offset = phaseColorCount;
		    val = 1-x/y;
		}
	    } else {
		if (-x <= y) {
		    offset = 2*phaseColorCount;
		    val = -x/y;
		} else {
		    offset = 3*phaseColorCount;
		    val = 1+y/x;
		}
	    }
	} else {
	    if (x <= 0) {
		if (y >= x) {
		    offset = 4*phaseColorCount;
		    val = y/x;
		} else {
		    offset = 5*phaseColorCount;
		    val = 1-x/y;
		}
	    } else {
		if (-y >= x) {
		    offset = 6*phaseColorCount;
		    val = -x/y;
		} else {
		    offset = 7*phaseColorCount;
		    val = 1+y/x;
		}
	    }
	}
	return phaseColors[offset+(int) (val*(phaseColorCount-1))];
    }
    
    void calcPhiComponent(double x, double y) {
	int phiSector = 0;
	double val = 0;
	if (x == 0 && y == 0) {
	    phiIndex = 0;
	    return;
	}
	if (y >= 0) {
	    if (x >= 0) {
		if (x >= y) {
		    phiSector = 0;
		    val = y/x;
		} else {
		    phiSector = 1;
		    val = 1-x/y;
		}
	    } else {
		if (-x <= y) {
		    phiSector = 2;
		    val = -x/y;
		} else {
		    phiSector = 3;
		    val = 1+y/x;
		}
	    }
	} else {
	    if (x <= 0) {
		if (y >= x) {
		    phiSector = 4;
		    val = y/x;
		} else {
		    phiSector = 5;
		    val = 1-x/y;
		}
	    } else {
		if (-y >= x) {
		    phiSector = 6;
		    val = -x/y;
		} else {
		    phiSector = 7;
		    val = 1+y/x;
		}
	    }
	}
	phiIndex = (phiSector*(dataSize+1))+(int) (val*dataSize);
    }

    void setScale() {
	if (manualScale || !autoZoomItem.getState())
	    return;
	int i;
	double outer = 0;
	for (i = 0; i != orbCount; i++) {
	    Orbital orb = orbitals[i];
	    double r = orb.getScaleRadius();
	    if (r > outer)
		outer = r;
	}
	// 3.15 is fudge factor determined by trial and error
	int scaleValue = (int) (outer*3.15);
	int oldScaleValue = scaleBar.getValue();
	
	if (oldScaleValue != scaleValue) {
	    int diff = scaleValue - oldScaleValue;
	    if (diff < -5 || diff > 5) {
		diff /= 3;
		if (diff < -50)
		    diff = -50;
		if (diff > 50)
		    diff = 50;
	    }
	    double diffd = diff * frameLen / 60.;
	    diff = (int) diffd;
	    if (diff == 0)
		diff = (diffd > 0) ? 1 : -1;
	    int nv = oldScaleValue+diff;
	    if (nv > scaleValue && diff > 0)
		nv = scaleValue;
	    if (nv < scaleValue && diff < 0)
		nv = scaleValue;
	    if (!animatedZoomItem.getState())
		nv = scaleValue;
	    scaleBar.setValue(nv);
	    scaleValue = nv;
	    precomputeAll();
	}
    }

    void precomputeAll() {
	int i;
	for (i = 0; i != orbCount; i++) {
	    Orbital orb = orbitals[i];
	    orb.precompute();
	}
    }

    int sign(double x) {
	return x < 0 ? -1 : 1;
    }

    public void paint(Graphics g) {
	cv.repaint();
    }

    long lastTime;
    int frameLen;
    
    public void updateAtomViewer(Graphics realg) {
	Graphics g = null;
	if (winSize == null || winSize.width == 0)
	    return;
	g = dbimage.getGraphics();
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());
	if (fontMetrics == null)
	    fontMetrics = g.getFontMetrics();

	boolean allQuiet = false;
	double tadd = 0;
	if (!stoppedCheck.getState()) {
	    long sysTime = System.currentTimeMillis();
	    if (lastTime != 0) {
		int inc = frameLen = (int) (sysTime-lastTime);
		int val = speedBar.getValue();
		tadd = Math.exp(val*.04 - 9)*inc;
	    }
	    lastTime = sysTime;
	    t += tadd;
	} else {
	    lastTime = 0;
	    allQuiet = true;
	}
	
	double norm = 0;
	double normmult = 0, normmult2 = 0;

	if (alwaysNormItem.getState())
	    normalize();

	// update phases
	int i;
	for (i = 0; i != stateCount; i++) {
	    State st = states[i];
	    if (st.mag < epsilon) {
		st.set(0);
		continue;
	    }
	    if (tadd != 0) {
		allQuiet = false;
		st.rotate(-(st.elevel+baseEnergy)*tadd);
	    }
	    norm += st.magSquared();
	}
	normmult2 = 1/norm;
	if (norm == 0)
	    normmult2 = 0;
	normmult = Math.sqrt(normmult2);
	AlternateBasis skipBasis = (changingDerivedStates) ?
	    ((DerivedState) selectedState).basis : null;
	for (i = 0; i != basisCount; i++) {
	    AlternateBasis basis = basisList[i];
	    if (basis != skipBasis && basis.active)
		basis.convertBasisToDerived();
	}

	setScale();
	setBrightness(normmult2);
	boolean sliced = sliceChooser.getSelectedIndex() != SLICE_NONE;
	zoom = (sliced) ? 8 : 16.55;
	colorMult = Math.exp(brightnessBar.getValue()/100.);
	//System.out.println(colorMult);
	computeView(normmult);
	int j, k;

	for (i = 1; i != viewCount; i++) {
	    g.setColor(i == selectedPaneHandle ? Color.yellow : Color.gray);
	    g.drawLine(0, viewList[i].paneY,
		       winSize.width, viewList[i].paneY);
	}

	if (viewPotential != null) {
	    double ymult = viewPotential.height * 1.9;
	    g.setColor(Color.darkGray);
	    for (i = 1; i != 16; i++) {
		double e = -1/(2.*i*i);
		int y = viewPotential.y - (int) (ymult * e);
		g.drawLine(0, y, winSize.width, y);
	    }

	    double xp = getScaler();
	    
	    g.setColor(Color.white);
	    int ox = -1, oy = -1;
	    int x;
	    int floory = viewPotential.y + viewPotential.height - 1;
	    for (x = 0; x != winSize.width; x++) {
		double xx = (x-winSize.width/2)*xp;
		if (xx < 0)
		    xx = -xx;
		if (xx < 1e-3)
		    xx = 1e-3;
		double dy = -1/xx;
		int y = viewPotential.y - (int) (ymult * dy);
		if (y > floory) {
		    if (ox == -1)
			continue;
		    g.drawLine(ox, oy, ox, floory);
		    ox = -1;
		    continue;
		}
		if (ox == -1 && x > 0) {
		    g.drawLine(x, floory, x, y);
		    ox = x;
		    oy = y;
		    continue;
		}
		if (ox != -1)
		    g.drawLine(ox, oy, x, y);
		ox = x;
		oy = y;
	    }

	    // calculate expectation value of E
	    if (norm != 0) {
		double expecte = 0;
		for (i = 0; i != stateCount; i++) {
		    State st = states[i];
		    double prob = st.magSquared()*normmult2;
		    expecte += prob*st.elevel;
		}
		int y = viewPotential.y - (int) (ymult * expecte);
		g.setColor(Color.red);
		g.drawLine(0, y, winSize.width, y);
	    }
	    
	    if (selectedState != null && !dragging) {
		g.setColor(Color.yellow);
		int y = viewPotential.y - (int) (ymult * selectedState.elevel);
		g.drawLine(0, y, winSize.width, y);
	    }
	}

	if (viewL != null) {
	    int maxm = 3;
	    int pad = 3;
	    int ct = (maxm*2+1)*pad;
	    double ldata[] = new double[ct];

	    if (!higherStatesPresent()) {
		calcLxy(ldata, ct, maxm, pad, true, false);
		drawFunction(g, viewL, 0, ldata, ct, pad, false);
		calcLxy(ldata, ct, maxm, pad, false, false);
		drawFunction(g, viewL, 1, ldata, ct, pad, false);
	    }
	    calcLz(ldata, ct, maxm, pad, false);
	    drawFunction(g, viewL, 2, ldata, ct, pad, false);
	}

	if (viewL2 != null) {
	    int maxm = 3;
	    int pad = 3;
	    int ct = (maxm*2+1)*pad;
	    double ldata[] = new double[ct];
	    pad = 2;

	    if (!higherStatesPresent()) {
		calcLxy(ldata, ct, maxm, pad, true, true);
		drawFunction(g, viewL2, 0, ldata, ct, pad, true);
		calcLxy(ldata, ct, maxm, pad, false, true);
		drawFunction(g, viewL2, 1, ldata, ct, pad, true);
	    }
	    calcLz(ldata, ct, maxm, pad, true);
	    drawFunction(g, viewL2, 2, ldata, ct, pad, true);
	}

	if (viewRadial != null && orbCount == 1) {
	    Orbital orb = orbitals[0];
	    int n = orb.n;
	    int l = orb.l;
	    norm = orb.radialNorm(n, l);
	    int ct = viewRadial.width*2;
	    double ldata[] = new double[ct];
	    double sr = orb.getScaleRadius()*3;
	    int bestCt = ct;
	    double max = -1;
	    for (i = 0; i != ct; i++) {
		double r = i*sr/ct + 1e-8;
		double rho = 2*r/n;
		double rhol = Math.pow(rho, l)*norm;
		double dr = hypser(l+1-n, 2*l+2, rho)*rhol*Math.exp(-rho/2)*norm;
		ldata[i] = dr*dr*r*r;
		if (ldata[i] > max) max = ldata[i];
		if (ldata[i] > max*.01)
		    bestCt = i;
	    }
	    double scaleVal = sr*bestCt/(double) ct;
	    drawRadialFunction(g, ldata, bestCt, scaleVal);
	}
	
	if (imageSource != null)
	    imageSource.newPixels();
	g.drawImage(memimage, viewX.x, viewX.y, null);
	g.setColor(Color.white);
	if (sliced)
	    drawCube(g, false);
	if (axesItem.getState())
	    drawAxes(g);
	for (i = 0; i != textCount; i++) {
	    TextBox tb = textBoxes[i];
	    int h = (tb.height + fontMetrics.getAscent() -
		     fontMetrics.getDescent())/2;
	    g.drawString(tb.text, tb.x, tb.y + h);
	}
	g.setColor(Color.yellow);
	if (selectedState != null)
	    centerString(g, selectedState.getText(),
			 viewX.y+viewX.height-5);
	else if (dimensionsItem.getState()) {
	    double xp = getScaler();
	    double w = winSize.width*xp * 52.9463;
	    centerString(g, "Screen width = " + (int)w + " pm",
			 viewX.y+viewX.height-5);
	}
	if (mouseDown)
	    lastXRot = lastYRot = 0;
	else if (lastXRot != 0 || lastYRot != 0) {
	    double ts = frameLen / 20.;
	    rotate(lastXRot*ts, lastYRot*ts);
	    allQuiet = false;
	}
	
	if (viewStates != null)
	    drawPhasors(g, viewStates);

	realg.drawImage(dbimage, 0, 0, this);
	if (!allQuiet)
	    cv.repaint(pause);
    }

    double getScaler() {
	// XXX don't duplicate this
	double scalex = viewX.width*zoom/2;
	double scaley = viewX.height*zoom/2;
	double aratio = viewX.width/(double) viewX.height;
	// preserve aspect ratio regardless of window dimensions
	if (aratio < 1)
	    scaley *= aratio;
	else
	    scalex /= aratio;
	double xp = 2*scalex/viewDistance;
	double mult = scaleBar.getValue() / 50.;
	xp /= 50*mult;
	xp = 1/xp;
	return xp;
    }

    public void centerString(Graphics g, String str, int ypos) {
	g.drawString(str, (winSize.width-fontMetrics.stringWidth(str))/2, ypos);
    }

    // see if the face containing (nx, ny, nz) is visible.
    boolean visibleFace(int nx, int ny, int nz) {
	double viewx = viewDistance*rotmatrix[2];
	double viewy = viewDistance*rotmatrix[5];
	double viewz = viewDistance*rotmatrix[8];
	return (nx-viewx)*nx+(ny-viewy)*ny+(nz-viewz)*nz < 0;
    }

    void drawPhasors(Graphics g, View v) {
	int i;
	for (i = 0; i != phasorCount; i++) {
	    Phasor ph = phasors[i];
	    State st = ph.state;
	    int ss = ph.width;
	    int ss2 = ss/2;
	    int x = ph.x + ss2;
	    int y = ph.y + ss2;
	    boolean yel = (selectedState == st);
	    g.setColor(yel ? Color.yellow :
		       st.mag == 0 ? gray2 : Color.white);
	    g.drawOval(x-ss2, y-ss2, ss, ss);
	    int xa = (int) (st.re*ss2);
	    int ya = (int) (-st.im*ss2);
	    g.drawLine(x, y, x+xa, y+ya);
	    g.drawLine(x+xa-1, y+ya, x+xa+1, y+ya);
	    g.drawLine(x+xa, y+ya-1, x+xa, y+ya+1);
	    //g.fillOval(x+xa-1, y+ya-1, 3, 3);
	}
    }

    void drawFunction(Graphics g, View view, int pos,
		      double fr[], int count, int pad, boolean fromZero) {
	int i;
	
	double expectx = 0;
	double expectx2 = 0;
	double maxsq = 0;
	double tot = 0;
	int vw = winSize.width/3;
	int vw2 = vw*4/5;
	int mid_x = (fromZero) ? (vw2/(count-1)) : vw2 * (count/2) / (count-1);
	int zero = mid_x;
	mid_x += vw*pos;
	for (i = 0; i != count; i++) {
	    int x = vw2 * i / (count-1);
	    int ii = i;
	    double dr = fr[ii];
	    double dy = dr*dr;
	    if (dy > maxsq)
		maxsq = dy;
	    int dev = x-zero;
	    expectx += dy*dev;
	    expectx2 += dy*dev*dev;
	    tot += dy;
	}
	zero = mid_x;
	expectx /= tot;
	expectx2 /= tot;
	double maxnm = Math.sqrt(maxsq);
	double uncert = Math.sqrt(expectx2-expectx*expectx);
	int ox = -1, oy = 0;
	double bestscale = 1/maxnm;
	view.scale = bestscale;
	if (view.scale > 1e8)
	    view.scale = 1e8;
	g.setColor(Color.gray);
	g.drawLine(mid_x, view.y, mid_x, view.y+view.height);

	double ymult2 = .90*view.height;
	int mid_y = view.y+view.height/2+(int) ymult2/2;
	double mult = ymult2*view.scale;
	g.setColor(Color.white);
	ox = -1;
	for (i = 0; i != count; i++) {
	    int x = vw2 * i / (count-1) + vw*pos;
	    int ii = i;
	    int y = mid_y - (int) (mult * fr[ii]);
	    if ((i % pad) == 1) {
		g.setColor(Color.gray);
		g.drawLine(x, mid_y, x, mid_y+4);
		g.setColor(Color.white);
	    }
	    if (ox != -1)
		g.drawLine(ox, oy, x, y);
	    ox = x;
	    oy = y;
	}

	if (maxsq > 0) {
	    expectx += zero + .5;
	    g.setColor(Color.red);
	    g.drawLine((int) expectx, view.y,
		       (int) expectx, view.y+view.height);
	}
    }

    void drawRadialFunction(Graphics g, double fr[], int count,
			    double scaleVal) {
	int i;

	View view = viewRadial;
	double maxsq = 0;
	double tot = 0;
	int vw = winSize.width;
	int vw2 = vw;
	int mid_x = vw/2;
	int zero = mid_x;
	for (i = 0; i != count; i++) {
	    if (fr[i] > maxsq)
		maxsq = fr[i];
	}
	int ox = -1, oy = 0;
	double bestscale = 1/maxsq;
	view.scale = bestscale;

	double ymult2 = .90*view.height;
	int mid_y = view.y+view.height/2+(int) ymult2/2;
	double mult = ymult2*view.scale;
	g.setColor(Color.white);
	ox = -1;
	int midi = count/2;
	int a0i = 0;
	for (i = 0; i != count; i++) {
	    int x = mid_x + mid_x*(i-midi)/midi;
	    int y = mid_y - (int) (mult * fr[i]);
	    double a0 = scaleVal*i/count;
	    if (a0 >= a0i) {
		g.setColor(Color.gray);
		g.drawLine(x, mid_y, x, mid_y+4);
		g.setColor(Color.white);
		a0i++;
	    }
	    if (ox != -1)
		g.drawLine(ox, oy, x, y);
	    ox = x;
	    oy = y;
	}
    }


    // draw the cube containing the particles.  if drawAll is false then
    // we just draw faces that are facing the camera.  This routine draws
    // each edge twice which is unnecessary, but easier.
    void drawCube(Graphics g, boolean drawAll) {
	int i;
	int slice = sliceChooser.getSelectedIndex();
	int sp = 0;
	for (i = 0; i != 6; i++) {
	    // calculate normal of ith face
	    int nx = (i == 0) ? -1 : (i == 1) ? 1 : 0;
	    int ny = (i == 2) ? -1 : (i == 3) ? 1 : 0;
	    int nz = (i == 4) ? -1 : (i == 5) ? 1 : 0;
	    // if face is not facing camera, don't draw it
	    if (!drawAll && !visibleFace(nx, ny, nz))
		continue;
	    double pts[];
	    pts = new double[3];
	    int n;
	    for (n = 0; n != 4; n++) {
		computeFace(i, n, pts);
		map3d(pts[0], pts[1], pts[2], xpoints, ypoints, n, viewX);
	    }
	    g.setColor(Color.gray);
	    g.drawPolygon(xpoints, ypoints, 4);
	    if (slice != SLICE_NONE && i/2 != slice-SLICE_X) {
		if (selectedSlice)
		    g.setColor(Color.yellow);
		int coord1 = (slice == SLICE_X) ? 1 : 0;
		int coord2 = (slice == SLICE_Z) ? 1 : 2;
		computeFace(i, 0, pts);
		pts[slice-SLICE_X] = sliceval;
		map3d(pts[0], pts[1], pts[2],
		      slicerPoints[0], slicerPoints[1], sp, viewX);
		computeFace(i, 2, pts);
		pts[slice-SLICE_X] = sliceval;
		map3d(pts[0], pts[1], pts[2],
		      slicerPoints[0], slicerPoints[1], sp+1, viewX);
		g.drawLine(slicerPoints[0][sp  ], slicerPoints[1][sp],
			   slicerPoints[0][sp+1], slicerPoints[1][sp+1]);
		sliceFaces[sp/2][0] = nx;
		sliceFaces[sp/2][1] = ny;
		sliceFaces[sp/2][2] = nz;
		sp += 2;
	    }
	}
	sliceFaceCount = sp;
    }

    // generate the nth vertex of the bth cube face
    void computeFace(int b, int n, double pts[]) {
	// One of the 3 coordinates (determined by a) is constant.
	// When b=0, x=-1; b=1, x=+1; b=2, y=-1; b=3, y=+1; etc
	int a = b >> 1;
	pts[a] = ((b & 1) == 0) ? -1 : 1;

	// fill in the other 2 coordinates with one of the following
	// (depending on n): -1,-1; +1,-1; +1,+1; -1,+1
	int i;
	for (i = 0; i != 3; i++) {
	    if (i == a) continue;
	    pts[i] = (((n>>1)^(n&1)) == 0) ? -1 : 1;
	    n >>= 1;
	}
    }

    void drawAxes(Graphics g) {
	g.setColor(Color.white);
	double d = .5;
	map3d(0, 0, 0, xpoints, ypoints, 0, viewAxes);
	map3d(d, 0, 0, xpoints, ypoints, 1, viewAxes);
	drawArrow(g, "x", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	map3d(0, d, 0, xpoints, ypoints, 1, viewAxes);
	drawArrow(g, "y", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	map3d(0, 0, d, xpoints, ypoints, 1, viewAxes);
	drawArrow(g, "z", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
    }

    void drawArrow(Graphics g, String text, int x1, int y1, int x2, int y2) {
	drawArrow(g, text, x1, y1, x2, y2, 5);
    }

    void drawArrow(Graphics g, String text,
		   int x1, int y1, int x2, int y2, int as) {
	g.drawLine(x1, y1, x2, y2);
	double l = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	if (l > as/2) {  // was as
	    double hatx = (x2-x1)/l;
	    double haty = (y2-y1)/l;
	    g.drawLine(x2, y2,
		       (int) (haty*as-hatx*as+x2),
		       (int) (-hatx*as-haty*as+y2));
	    g.drawLine(x2, y2,
		       (int) (-haty*as-hatx*as+x2),
		       (int) (hatx*as-haty*as+y2));
	    if (text != null)
		g.drawString(text, (int) (x2+hatx*10), (int) (y2+haty*10));
	}
    }

    // map 3-d point (x,y,z) to screen, storing coordinates
    // in xpoints[pt],ypoints[pt]
    void map3d(double x, double y, double z,
	       int xpoints[], int ypoints[], int pt, Rectangle v) {
	double rotm[] = rotmatrix;
	double realx =               x*rotm[0] + y*rotm[3] + z*rotm[6];
	double realy =               x*rotm[1] + y*rotm[4] + z*rotm[7];
	double realz = viewDistance-(x*rotm[2] + y*rotm[5] + z*rotm[8]);
	double scalex = v.width*zoom/2;
	double scaley = v.height*zoom/2;
	double aratio = v.width/(double) v.height;
	// preserve aspect ratio regardless of window dimensions
	if (aratio < 1)
	    scaley *= aratio;
	else
	    scalex /= aratio;
	xpoints[pt] = v.x + v.width /2 + (int) (scalex*realx/realz);
	ypoints[pt] = v.y + v.height/2 - (int) (scaley*realy/realz);
    }

    // map point on screen to 3-d coordinates assuming it lies on a given plane
    void unmap3d(double x3[], int x, int y, double pn[], double pp[]) {
	// first, find all points which map to (x,y) on the screen.
	// this is a line.
	double scalex = viewX.width*zoom/2;
	double scaley = viewX.height*zoom/2;

	double aratio = viewX.width/(double) viewX.height;
	// preserve aspect ratio regardless of window dimensions
	if (aratio < 1)
	    scaley *= aratio;
	else
	    scalex /= aratio;

	double vx =  (x-(viewX.x+viewX.width/2))/scalex;
	double vy = -(y-(viewX.y+viewX.height/2))/scaley;
	// vz = -1
	
	// map the line vector to object space
	double rotm[] = rotmatrix;
	double mx  = viewDistance*rotm[2];
	double my  = viewDistance*rotm[5];
	double mz  = viewDistance*rotm[8];
	double mvx = (vx*rotm[0] + vy*rotm[1] - rotm[2]);
	double mvy = (vx*rotm[3] + vy*rotm[4] - rotm[5]);
	double mvz = (vx*rotm[6] + vy*rotm[7] - rotm[8]);
	
	// calculate the intersection between the line and the given plane
	double t = ((pp[0]-mx)*pn[0] +
		    (pp[1]-my)*pn[1] +
		    (pp[2]-mz)*pn[2]) /
	    (pn[0]*mvx+pn[1]*mvy+pn[2]*mvz);

	x3[0] = mx+mvx*t;
	x3[1] = my+mvy*t;
	x3[2] = mz+mvz*t;
    }

    public void componentHidden(ComponentEvent e){}
    public void componentMoved(ComponentEvent e){}
    public void componentShown(ComponentEvent e) {
	cv.repaint();
    }

    public void componentResized(ComponentEvent e) {
	handleResize();
	cv.repaint(pause);
    }
    public void actionPerformed(ActionEvent e) {
	if (e.getSource() == exitItem) {
	    applet.destroyFrame();
	    return;
	}
	cv.repaint();
	if (e.getSource() == blankButton)
	    doClear();
	if (e.getSource() == normalizeButton)
	    normalize();
	if (e.getSource() == maximizeButton)
	    maximize();
    }

    int scaleValue = -1;

    public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == scaleBar) {
	    if (scaleBar.getValue() == scaleValue)
		return;
	    scaleValue = scaleBar.getValue();
	    precomputeAll();
	    manualScale = true;
	}
	if (e.getSource() == brightnessBar) {
	    double mult = Math.exp(brightnessBar.getValue()/100.);
	    userBrightMult = mult/bestBrightness;
	}
	if (e.getSource() == resolutionBar)
	    setResolution();
	setupSimpson();
	cv.repaint(pause);
    }

    public void mouseDragged(MouseEvent e) {
	dragging = true;
	changingDerivedStates = false;
	edit(e);
	dragX = e.getX(); dragY = e.getY();
    }

    boolean csInRange(int x, int xa, int xb) {
	if (xa < xb)
	    return x >= xa-5 && x <= xb+5;
	return x >= xb-5 && x <= xa+5;
    }

    void checkSlice(int x, int y) {
	if (sliceChooser.getSelectedIndex() == SLICE_NONE) {
	    selectedSlice = false;
	    return;
	}
	int n;
	selectedSlice = false;
	for (n = 0; n != sliceFaceCount; n += 2) {
	    int xa = slicerPoints[0][n];
	    int xb = slicerPoints[0][n+1];
	    int ya = slicerPoints[1][n];
	    int yb = slicerPoints[1][n+1];
	    if (!csInRange(x, xa, xb) || !csInRange(y, ya, yb))
		continue;

	    double d;
	    if (xa == xb)
		d = Math.abs(x-xa);
	    else {
		// write line as y=a+bx
		double b = (yb-ya)/(double) (xb-xa);
		double a = ya-b*xa;
		
		// solve for distance
		double d1 = y-(a+b*x);
		if (d1 < 0)
		    d1 = -d1;
		d = d1/Math.sqrt(1+b*b);
	    }
	    if (d < 6) {
		selectedSlice = true;
		sliceFace = sliceFaces[n/2];
		break;
	    }
	}
    }

    public void mouseMoved(MouseEvent e) {
	if (dragging)
	    return;
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
	int oldsph = selectedPaneHandle;
	int olds = selection;
	State oldss = selectedState;
	selectedPaneHandle = -1;
	selection = 0;
	selectedState = null;
	int i;
	for (i = 1; i != viewCount; i++) {
	    int dy = y-viewList[i].paneY;
	    if (dy >= -3 && dy <= 3) {
		selectedPaneHandle = i;
		selection = SEL_HANDLE;
	    }
	}
	if (viewX != null && viewX.inside(x, y)) {
	    selection = SEL_X;
	    checkSlice(e.getX(), e.getY());
	} else if (viewPotential.contains(x, y)) {
	    selection = SEL_POTENTIAL;
	    //findStateByEnergy(y);
	} else if (viewStates != null && viewStates.inside(x, y))
	    findPhasor(viewStates, x, y);
	if (oldsph != selectedPaneHandle || olds != selection ||
	    oldss != selectedState)
	    cv.repaint(pause);
    }

    void findPhasor(View v, int x, int y) {
	int i;
	for (i = 0; i != phasorCount; i++) {
	    if (!phasors[i].inside(x, y))
		continue;
	    selectedPhasor = phasors[i];
	    selectedState = selectedPhasor.state;
	    selection = SEL_STATES;
	    break;
	}
    }

    public void mouseClicked(MouseEvent e) {
	if (selection == SEL_STATES)
	    editMagClick();
	if (e.getClickCount() == 2 && selectedState != null)
	    enterSelectedState();
    }

    void enterSelectedState() {
	int i;
	for (i = 0; i != stateCount; i++)
	    if (states[i] != selectedState)
		states[i].set(0);
	selectedState.convertBasisToDerived();
	selectedState.set(1);
	selectedState.convertDerivedToBasis();
	createOrbitals();
	cv.repaint(pause);
    }

    public void mouseEntered(MouseEvent e) {
    }
    public void mouseExited(MouseEvent e) {
	if (!dragging && selection != 0) {
	    selectedPaneHandle = -1;
	    selectedState = null;
	    selectedPhasor = null;
	    selection = 0;
	    cv.repaint(pause);
	}
    }
    public void mousePressed(MouseEvent e) {
	mouseDown = true;
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragX = dragStartX = e.getX();
	dragY = dragStartY = e.getY();
	dragZoomStart = zoom;
	dragging = true;
	edit(e);
    }
    public void mouseReleased(MouseEvent e) {
	mouseDown = false;
	if (dragging)
	    cv.repaint();
	dragging = changingDerivedStates = false;
    }
    public void itemStateChanged(ItemEvent e) {
	if (e.getItemSelectable() == cubicItem) {
	    setLValue();
	    setupDisplay();
	    orbitalChanged();
	    cv.repaint(pause);
	    return;
	}
	if (e.getItemSelectable() instanceof CheckboxMenuItem) {
	    int i;
	    for (i = 0; i != samplesNums.length; i++)
		if (samplesItems[i] == e.getItemSelectable())
		    break;
	    if (i != samplesNums.length) {
		int j;
		for (j = 0; j != samplesNums.length; j++)
		    samplesItems[j].setState(i == j);
		setupSimpson();
	    }
	    setupDisplay();
	    cv.repaint(pause);
	    return;
	}
	if (e.getItemSelectable() == nChooser) {
	    setNValue();
	    orbitalChanged();
	} else if (e.getItemSelectable() == lChooser) {
	    setLValue();
	    orbitalChanged();
	} else if (e.getItemSelectable() == mChooser) {
	    orbitalChanged();
	} else if (e.getItemSelectable() == viewChooser) {
	    setLValue();
	    orbitalChanged();
	    setupDisplay();
	    setInitialOrbital();
	} else if (e.getItemSelectable() == cubicItem) {
	    setLValue();
	    orbitalChanged();
	}
	cv.repaint(pause);
    }
    public boolean handleEvent(Event ev) {
        if (ev.id == Event.WINDOW_DESTROY) {
            destroyFrame();
            return true;
        }
        return super.handleEvent(ev);
    }

    void destroyFrame() {
        if (applet == null)
            dispose();
        else
            applet.destroyFrame();
    }

    void edit(MouseEvent e) {
	if (selection == SEL_NONE)
	    return;
	int x = e.getX();
	int y = e.getY();
	switch (selection) {
	case SEL_HANDLE:  editHandle(y);   break;
	case SEL_STATES:  editMag(x, y);   break;
	case SEL_POTENTIAL:  break;
	case SEL_X:       editX(x, y);  break;
	}
    }

    void editHandle(int y) {
	int dy = y-viewList[selectedPaneHandle].paneY;
	View upper = viewList[selectedPaneHandle-1];
	View lower = viewList[selectedPaneHandle];
	int minheight = 10;
	if (upper.height+dy < minheight || lower.height-dy < minheight)
	    return;
	upper.height += dy;
	lower.height -= dy;
	lower.y += dy;
	lower.paneY += dy;
	cv.repaint(pause);
	setSubViews();
    }

    void editX(int x, int y) {
	int mode = modeChooser.getSelectedIndex();
	if (selectedSlice)
	    mode = MODE_SLICE;
	if (mode == MODE_ANGLE) {
	    int xo = dragX-x;
	    int yo = dragY-y;
	    rotate(lastXRot = xo/40., lastYRot = -yo/40.);
	    double lr = Math.sqrt(lastXRot*lastXRot + lastYRot*lastYRot);
	    if (lr > .06) {
		lr /= .06;
		lastXRot /= lr;
		lastYRot /= lr;
	    }
	    cv.repaint(pause);
	} else if (mode == MODE_ROTATE_X) {
	    int xo = dragX-x + dragY-y;
	    rotateXY(xo/40., true);
	} else if (mode == MODE_ROTATE_Y) {
	    int xo = dragX-x + dragY-y;
	    rotateXY(xo/40., false);
	} else if (mode == MODE_ROTATE_Z) {
	    int xo = dragX-x + dragY-y;
	    rotateZ(xo/40.);
	} else if (mode == MODE_SLICE) {
	    double x3[] = new double[3];
	    unmap3d(x3, x, y, sliceFace, sliceFace);
	    switch (sliceChooser.getSelectedIndex()) {
	    case SLICE_X: sliceval = x3[0]; break;
	    case SLICE_Y: sliceval = x3[1]; break;
	    case SLICE_Z: sliceval = x3[2]; break;
	    }
	    if (sliceval < -.99)
		sliceval = -.99;
	    if (sliceval > .99)
		sliceval = .99;
	    cv.repaint(pause);
	}
    }

    void editMag(int x, int y) {
	if (selectedPhasor == null)
	    return;
	int stateSize = selectedPhasor.width;
	int ss2 = stateSize/2;
	int x0 = selectedPhasor.x + ss2;
	int y0 = selectedPhasor.y + ss2;
	x -= x0;
	y -= y0;
	double mag = Math.sqrt(x*x+y*y)/ss2;
	double ang = Math.atan2(-y, x);
	if (mag > 10)
	    mag = 0;
	if (mag > 1)
	    mag = 1;
	selectedState.setMagPhase(mag, ang);

	if (selectedState instanceof DerivedState) {
	    selectedState.convertDerivedToBasis();
	    changingDerivedStates = true;
	}

	cv.repaint(pause);
	createOrbitals();
    }

    void editMagClick() {
	if (selectedState == null)
	    return;
	if (magDragStart < .5)
	    selectedState.set(1, 0);
	else
	    selectedState.set(0);
	cv.repaint(pause);
	createOrbitals();
    }

    void calcLxy(double data[], int count, int maxm, int pad, boolean xAxis,
		 boolean square) {
	int i;
	int mid = count/2;
	for (i = 0; i != count; i++)
	    data[i] = 0;

	if (square)
	    mid = 1;
	for (i = 0; i != basisCount; i++) {
	    // find all alternate basis objects which contain
	    // L eigenstates corresponding to the axis we want
	    AlternateBasis ab = basisList[i];
	    if (ab.n == 0 || ab.xAxis != xAxis)
		continue;

	    // convert to the basis
	    ab.convertBasisToDerived();

	    int j;
	    for (j = 0; j != ab.altStateCount; j++) {
		DerivedState ds = ab.altStates[j];
		if (square)
		    data[mid+ds.m*ds.m*pad] += ds.magSquared();
		else
		    data[mid+ds.m*pad] += ds.magSquared();
	    }
	}
	// include s states
	for (i = 0; i != stateCount; i++) {
	    if (states[i].l == 0)
		data[mid] += states[i].magSquared();
	}
	for (i = 0; i != count; i++)
	    data[i] = Math.sqrt(data[i]);
    }

    void calcLz(double data[], int count, int maxm, int pad, boolean square) {
	int i;
	int mid = count/2;
	for (i = 0; i != count; i++)
	    data[i] = 0;
	if (square)
	    mid = 1;
	for (i = 0; i != stateCount; i++) {
	    BasisState bs = states[i];
	    if (bs.l <= maxm) {
		if (square)
		    data[mid+bs.m*bs.m*pad] += bs.magSquared();
		else
		    data[mid+bs.m*pad] += bs.magSquared();
	    }
	}
	for (i = 0; i != count; i++)
	    data[i] = Math.sqrt(data[i]);
    }

    void rotateXY(double ang, boolean xAxis) {
	int i;
	for (i = 0; i != basisCount; i++) {
	    // find all alternate basis objects which contain
	    // L eigenstates corresponding to the axis we want
	    AlternateBasis ab = basisList[i];
	    if (ab.n == 0 || ab.xAxis != xAxis)
		continue;

	    // convert to the basis
	    ab.convertBasisToDerived();

	    // rotate all the states in the basis around the axis
	    int j;
	    for (j = 0; j != ab.altStateCount; j++) {
		DerivedState ds = ab.altStates[j];
		ds.rotate(ang*ds.m);
	    }
	}

	// clear out all states which are not spherically symmetric
	for (i = 0; i != stateCount; i++) {
	    if (states[i].l > 0)
		states[i].set(0);
	}

	// convert back to the Lz basis
	for (i = 0; i != basisCount; i++) {
	    AlternateBasis ab = basisList[i];
	    if (ab.n == 0 || ab.xAxis != xAxis)
		continue;
	    ab.convertDerivedToBasis(false);
	}

	createOrbitals();
	cv.repaint(pause);
    }

    void rotateZ(double ang) {
	int i;
	for (i = 0; i != stateCount; i++) {
	    BasisState bs = states[i];
	    bs.rotate(ang*bs.m);
	}
	cv.repaint(pause);
    }

    void createOrbitals() {
	int i;
	int newOrbCount = 0;
	boolean newOrbitals = false;
	for (i = 0; i != stateCount; i++) {
	    BasisState st = states[i];
	    if (st.m == 0) {
		if (st.mag != 0) {
		    newOrbCount++;
		    if (st.orb == null)
			newOrbitals = true;
		} else if (st.orb != null)
		    newOrbitals = true;
	    } else if (st.m > 0) {
		if (st.mag != 0 || getState(st.n, st.l, -st.m).mag != 0) {
		    newOrbCount++;
		    if (st.orb == null)
			newOrbitals = true;
		} else if (st.orb != null)
		    newOrbitals = true;
	    }
	}
	if (!newOrbitals)
	    return;
	orbCount = newOrbCount;
	orbitals = new Orbital[orbCount];
	int oi = 0;
	for (i = 0; i != stateCount; i++) {
	    BasisState st = states[i];
	    if ((st.m == 0 && st.mag != 0) ||
		(st.m > 0 && (st.mag != 0 ||
			      getState(st.n, st.l, -st.m).mag != 0))) {
		if (st.orb == null) {
		    Orbital orb;
		    if (st.l == 0)
			orb = new SOrbital(st);
		    else if (st.m == 0)
			orb = new MZeroOrbital(st);
		    else
			orb = new PairedOrbital(st);
		    orb.precompute();
		    st.orb = orb;
		}
		orbitals[oi++] = st.orb;
	    } else
		st.orb = null;
	}
	System.out.println(orbCount);
    }

    void doClear() {
	int x;
	for (x = 0; x != stateCount; x++)
	    states[x].set(0);
    }

    void normalize() {
	double norm = 0;
	int i;
	for (i = 0; i != stateCount; i++)
	    norm += states[i].magSquared();
	if (norm == 0)
	    return;
	double normmult = 1/Math.sqrt(norm);
	for (i = 0; i != stateCount; i++)
	    states[i].mult(normmult);
	cv.repaint(pause);
    }

    void maximize() {
	int i;
	double maxm = 0;
	for (i = 0; i != stateCount; i++)
	    if (states[i].mag > maxm)
		maxm = states[i].mag;
	if (maxm == 0)
	    return;
	for (i = 0; i != stateCount; i++)
	    states[i].mult(1/maxm);
	cv.repaint(pause);
    }

    // this is when we are in single-orbital mode, and the user selects
    // a different one
    void orbitalChanged() {
	if (viewChooser.getSelectedIndex() > VIEW_COMPLEX)
	    return;
	doClear();
	if (viewChooser.getSelectedIndex() == VIEW_REAL) {
	    int m = mChooser.getSelectedIndex();
	    if (m == 0)
		getState(getN(), getL(), 0).set(1, 0);
	    else if (getL() == 3 && cubicItem.getState()) {
		int i;
		for (i = 0; i != 7; i++) {
		    int ar = m*14+i*2;
		    getState(getN(), 3, i-3).set(l3CubicArray[ar],
						 l3CubicArray[ar+1]);
		}
	    } else {
		m--;
		int realm = m/2+1;
		double mphase = Math.pow(-1, realm);
		if ((m & 1) == 0) {
		    getState(getN(), getL(),  realm).set(mphase*root2inv);
		    getState(getN(), getL(), -realm).set(root2inv);
		} else {
		    getState(getN(), getL(),  realm).set(0, -mphase*root2inv);
		    getState(getN(), getL(), -realm).set(0, root2inv);
		}
	    }
	} else
	    getState(getN(), getL(), getM()).set(1, 0);
	createOrbitals();
	manualScale = false;
    }

    BasisState getState(int n, int l, int m) {
	int pre_n = n-1;
	int pre_n_add = pre_n*(pre_n+1)*(2*pre_n+1)/6;
	int pre_l_add = l*l;
	return states[pre_n_add+pre_l_add+l+m];
    }

    void setBrightness(double normmult) {
	int i;
	double avg = 0;
	double totn = 0;
	double minavg = 1e30;
	for (i = 0; i != orbCount; i++) {
	    Orbital orb = orbitals[i];
	    double as = orb.getBrightness();
	    if (as < minavg)
		minavg = as;
	    BasisState st = orb.state;
	    double n = st.magSquared()*normmult;
	    if (orb.state.m != 0)
		n += getState(st.n, st.l, -st.m).magSquared()*normmult;
	    totn += n;
	    avg += n*as;
	}
	bestBrightness = 113.9/(Math.sqrt(minavg)*totn);
	double mult = bestBrightness * userBrightMult;
	int bvalue = (int) (Math.log(mult)*100.);
	brightnessBar.setValue(bvalue);
    }

    abstract class Orbital {
	BasisState state;
	int n, l, m;
	float reMult, imMult;
	Orbital(BasisState bs) {
	    n = bs.n; l = bs.l; m = bs.m;
	    state = bs;
	}
	void setupFrame(double mult) {
	    reMult = (float) (state.re*mult);
	    imMult = (float) (state.im*mult);
	}
	float dataR[], dataTh[], dataPhiR[], dataPhiI[];
	int dshalf;
	double brightnessCache;
	double getBoundRadius(double bright) {
	    int i;
	    int outer = 1;

	    /*
	    double maxThData = 0;
	    if (l == 0)
		maxThData = 1;
	    else {
		for (i = 0; i != dataSize; i++) {
		    if (dataTh[i] > maxThData)
			maxThData = dataTh[i];
		    if (dataTh[i] < -maxThData)
			maxThData = -dataTh[i];
		}
		}*/

	    // we need to divide the spherical harmonic norm out of
	    // dataR[] to get just the radial function.  (The spherical
	    // norm gets multiplied into dataR[] for efficiency.)
	    int mpos = (m < 0) ? -m : m;
	    double norm1 = 1/sphericalNorm(l, mpos);
	    //norm1 *= maxThData;
	    norm1 *= norm1;
	    norm1 *= bright;

	    for (i = 0; i != dataSize; i++) { // XXX
		double v = dataR[i]*dataR[i]*norm1;
		if (v > 32)
		    outer = i;
	    }
	    //System.out.println(maxThData + " " + outer);
	    return outer / (dataSize/2.);
	}

	double getScaleRadius() {
	    // set scale by solving equation Veff(r) = E, assuming m=0
	    // Veff(r) = -1/r + l(l+1)/2, E = 1/2n^2
	    double b0 = -n*n*2;
	    double c0 = l*(l+1)*n*n;
	    double r0 = .5*(-b0+Math.sqrt(b0*b0-4*c0));
	    return r0;
	}

	final int distmult = 4;
	void precompute() {
	    int x, y, z;
	    dshalf = dataSize/2;
	    double mult = scaleBar.getValue() / 50.;

	    int mpos = (m < 0) ? -m : m;
	    double lgcorrect = Math.pow(-1, m);
	    double norm = radialNorm(n, l)*sphericalNorm(l, mpos);

	    dataR = new float[dataSize];
	    for (x = 0; x != dataSize; x++) {
		double r = x*resadj + .00000001;
		double rho = 2*r*mult/n;
		double rhol = Math.pow(rho, l)*norm;
		dataR[x] = (float) (hypser(l+1-n, 2*l+2, rho)*rhol*
				    Math.exp(-rho/2));
	    }

	    if (l > 0) {
		dataTh = new float[dataSize+1];
		for (x = 0; x != dataSize+1; x++) {
		    double th = (x-dshalf)/(double) dshalf;
		    // we multiply in lgcorrect because plgndr() uses a
		    // different sign convention than Bransden
		    dataTh[x] = (float) (lgcorrect*plgndr(l, mpos, th));
		}
	    }

	    if (m != 0) {
		dataPhiR = new float[8*(dataSize+1)];
		dataPhiI = new float[8*(dataSize+1)];
		int ix = 0;
		for (x = 0; x != 8; x++)
		    for (y = 0; y <= dataSize; y++, ix++) {
			double phi = x*pi/4 + y*(pi/4)/dataSize;
			dataPhiR[ix] = (float) Math.cos(phi*mpos);
			dataPhiI[ix] = (float) Math.sin(phi*mpos);
		    }
	    }

	    brightnessCache = 0;
	}

	double getBrightness() {
	    if (brightnessCache != 0)
		return brightnessCache;
	    int x;
	    double avgsq = 0;
	    double vol = 0;

	    // we need to divide the spherical harmonic norm out of
	    // dataR[] to get just the radial function.  (The spherical
	    // norm gets multiplied into dataR[] for efficiency.)
	    int mpos = (m < 0) ? -m : m;
	    double norm1 = 1/sphericalNorm(l, mpos);

	    for (x = 0; x != dataSize; x++) {
		double val = dataR[x]*norm1;
		val *= val;
		avgsq += val*val*x*x;
		vol += x*x;
	    }

	    brightnessCache = avgsq / vol;
	    return brightnessCache;
	}

	double radialNorm(int n, int l) {
	    double a0 = factorial(n+l);
	    return Math.sqrt(4.*factorial(n+l)/
				       (n*n*n*n*factorial(n-l-1)))/
		factorial(2*l+1);
	}

	double sphericalNorm(int l, int m) {
	    return Math.sqrt((2*l+1)*factorial(l-m)/
				       (4*pi*factorial(l+m)));
	}

	double factorial(int f) {
	    double res = 1;
	    while (f > 1)
		res *= f--;
	    return res;
	}

	abstract void computePoint(int r, int costh);
    };

    class SOrbital extends Orbital {
	SOrbital(BasisState bs) {
	    super(bs);
	}
	void computePoint(int r, int costh) {
	    try {
		float v = dataR[r];
		funcr = reMult*v;
		funci = imMult*v;
	    } catch (Exception e) {
		funcr = funci = 0;
		System.out.println("bad " + r + " " + costh);
	    }
	}
    };

    class MZeroOrbital extends Orbital {
	MZeroOrbital(BasisState bs) {
	    super(bs);
	}
	void computePoint(int r, int costh) {
	    try {
		float v = dataR[r]*dataTh[costh];
		funcr = v*reMult;
		funci = v*imMult;
	    } catch (Exception e) {
		funcr = funci = 0;
		System.out.println("bad " + r + " " + costh);
	    }
	}
    };

    class PairedOrbital extends Orbital {
	BasisState negstate;

	PairedOrbital(BasisState bs) {
	    super(bs);
	    negstate = getState(bs.n, bs.l, -bs.m);
	}

	float f1, f2, f3, f4;

	void setupFrame(double mult) {
	    double a = state.re*mult;
	    double b = state.im*mult;
	    double c = negstate.re*mult;
	    double d = negstate.im*mult;
	    double mphase = Math.pow(-1, m);
	    a *= mphase;
	    b *= mphase;
	    f1 = (float) (a+c);
	    f2 = (float) (d-b);
	    f3 = (float) (b+d);
	    f4 = (float) (a-c);
	}

	void computePoint(int r, int costh) {
	    try {
		float q = dataR[r]*dataTh[costh];
		float phiValR = dataPhiR[phiIndex];
		float phiValI = dataPhiI[phiIndex];
		funcr = q*(f1*phiValR + f2*phiValI);
		funci = q*(f3*phiValR + f4*phiValI);
	    } catch (Exception e) {
		funcr = funci = 0;
		System.out.println("bad " + r + " " + costh);
	    }
	}
    };

    class Phasor extends Rectangle {
	Phasor(int x, int y, int a, int b) {
	    super(x, y, a, b);
	}
	State state;
    }

    abstract class State extends Complex {
	double elevel;
	void convertDerivedToBasis() {}
	void convertBasisToDerived() {}
	void setBasisActive() {}
	abstract String getText();
    }

    class BasisState extends State {
	int n, l, m;
	Orbital orb;
	String getText() {
	    return "n = " + n + ", l = " + l + ", m = " + m;
	}
    }

    class DerivedState extends State {
	int count, m;
	AlternateBasis basis;
	String text;
	BasisState bstates[];
	Complex coefs[];
	void convertDerivedToBasis() { basis.convertDerivedToBasis(); }
	void convertBasisToDerived() { basis.convertBasisToDerived(); }
	void setBasisActive() { basis.active = true; }
	String getText() { return text; }
    }

    class AlternateBasis {
	DerivedState altStates[];
	int altStateCount;
	boolean active;
	int n, l;
	boolean xAxis;

	AlternateBasis() {
	    basisList[basisCount++] = this;
	}
	void convertDerivedToBasis() { convertDerivedToBasis(true); }
	void convertDerivedToBasis(boolean clear) {
	    int i, j;
	    if (clear)
		for (i = 0; i != stateCount; i++)
		    states[i].set(0);
	    Complex c = new Complex();
	    for (i = 0; i != altStateCount; i++) {
		DerivedState ds = altStates[i];
		for (j = 0; j != ds.count; j++) {
		    c.set(ds.coefs[j]);
		    c.conjugate();
		    c.mult(ds);
		    ds.bstates[j].add(c);
		}
	    }
	    double maxm = 0;
	    for (i = 0; i != stateCount; i++)
		if (states[i].mag > maxm)
		    maxm = states[i].mag;
	    if (maxm > 1) {
		double mult = 1/maxm;
		for (i = 0; i != stateCount; i++)
		    states[i].mult(mult);
	    }
	}
	
	void convertBasisToDerived() {
	    int i, j;
	    Complex c1 = new Complex();
	    Complex c2 = new Complex();
	    double maxm = 0;
	    for (i = 0; i != altStateCount; i++) {
		DerivedState ds = altStates[i];
		c1.set(0);
		try {
		    for (j = 0; j != ds.count; j++) {
			c2.set(ds.coefs[j]);
			c2.mult(ds.bstates[j]);
			c1.add(c2);
		    }
		} catch (Exception e) {
		    System.out.print("Exception at " + i + "\n");
		}
		if (c1.mag < epsilon)
		    c1.set(0);
		ds.set(c1);
		if (c1.mag > maxm)
		    maxm = ds.mag;
	    }
	    if (maxm > 1) {
		double mult = 1/maxm;
		for (i = 0; i != altStateCount; i++)
		    altStates[i].mult(mult);
	    }
	}
    }

    class Complex {
	public double re, im, mag, phase;
	Complex() { re = im = mag = phase = 0; }
	Complex(double r, double i) {
	    set(r, i);
	}
	double magSquared() { return mag*mag; }
	void set(double aa, double bb) {
	    re = aa; im = bb;
	    setMagPhase();
	}
	void set(double aa) {
	    re = aa; im = 0;
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
	    re += r; im += i;
	    setMagPhase();
	}
	void add(Complex c) {
	    re += c.re;
	    im += c.im;
	    setMagPhase();
	}
	void square() {
	    set(re*re-im*im, 2*re*im);
	}
	void mult(double c, double d) {
	    set(re*c-im*d, re*d+im*c);
	}
	void mult(double c) {
	    re *= c; im *= c;
	    mag *= c;
	}
	void mult(Complex c) {
	    mult(c.re, c.im);
	}
	void setMagPhase() {
	    mag = Math.sqrt(re*re+im*im);
	    phase = Math.atan2(im, re);
	}
	void setMagPhase(double m, double ph) {
	    mag = m;
	    phase = ph;
	    re = m*Math.cos(ph);
	    im = m*Math.sin(ph);
	}
	void rotate(double a) {
	    setMagPhase(mag, (phase+a) % (2*pi));
	}
	void conjugate() {
	    im = -im;
	    phase = -phase;
	}
    };

    class PhaseColor {
	public double r, g, b;
	PhaseColor(double rr, double gg, double bb) {
	    r = rr; g = gg; b = bb;
	}
    }

    double plgndr(int l,int m,double x) {
	double fact,pll = 0,pmm,pmmp1,somx2;
	int i,ll;

	if (m < 0 || m > l || Math.abs(x) > 1.0) {
	    System.out.print("bad arguments in plgndr\n");
	}
	pmm=1.0;
	if (m > 0) {
	    somx2=Math.sqrt((1.0-x)*(1.0+x));
	    fact=1.0;
	    for (i=1;i<=m;i++) {
		pmm *= -fact*somx2;
		fact += 2.0;
	    }
	}
	if (l == m)
	    return pmm;
	else {
	    pmmp1=x*(2*m+1)*pmm;
	    if (l == (m+1))
		return pmmp1;
	    else {
		for (ll=(m+2);ll<=l;ll++) {
		    pll=(x*(2*ll-1)*pmmp1-(ll+m-1)*pmm)/(ll-m);
		    pmm=pmmp1;
		    pmmp1=pll;
		}
		return pll;
	    }
	}
    }

    double hypser(int a, int c, double z) {
	int n;
	double fac = 1;
	double result = 1;
	for (n=1;n<=1000;n++) {
	    fac *= a*z/((double) n*c);
	    //System.out.print("fac " + n + " " + fac + " " + z + "\n");
	    if (fac == 0)
		return result;
	    result += fac;
	    a++;
	    c++;
	}
	System.out.print("convergence failure in hypser\n");
	return 0;
    }


    class View extends Rectangle {
	View() { }
	View(View v) { super(v); }
	double scale;
	int paneY;
	int pixels[];
    }

    class TextBox extends Rectangle {
	TextBox(int x, int y, int a, int b, String s) {
	    super(x, y, a, b);
	    text = s;
	}
	String text;
    }
}
