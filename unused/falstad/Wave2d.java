// Wave2d.java (c) 2004 by Paul Falstad, www.falstad.com

import java.io.InputStream;
import java.awt.*;
import java.awt.image.*;
import java.applet.Applet;
import java.util.Vector;
import java.io.File;
import java.util.Random;
import java.util.Arrays;
import java.lang.Math;
import java.text.NumberFormat;
import java.awt.event.*;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

class Wave2dCanvas extends Canvas {
    Wave2dFrame pg;
    Wave2dCanvas(Wave2dFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateWave2d(g);
    }
    public void paint(Graphics g) {
	pg.updateWave2d(g);
    }
};

class Wave2dLayout implements LayoutManager {
    public Wave2dLayout() {}
    public void addLayoutComponent(String name, Component c) {}
    public void removeLayoutComponent(Component c) {}
    public Dimension preferredLayoutSize(Container target) {
	return new Dimension(500, 500);
    }
    public Dimension minimumLayoutSize(Container target) {
	return new Dimension(100,100);
    }
    public void layoutContainer(Container target) {
	Insets insets = target.insets();
	int targetw = target.size().width - insets.left - insets.right;
	int cw = targetw* 7/10;
	int targeth = target.size().height - (insets.top+insets.bottom);
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

public class Wave2d extends Applet implements ComponentListener {
    static Wave2dFrame ogf;
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
        ogf = new Wave2dFrame(null);
        ogf.init();
    }

    void showFrame() {
	if (ogf == null) {
	    started = true;
	    ogf = new Wave2dFrame(this);
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

class Wave2dFrame extends Frame
  implements ComponentListener, ActionListener, AdjustmentListener,
             MouseMotionListener, MouseListener, ItemListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage;
    
    Random random;
    int windowWidth = 50;
    int windowHeight = 50;
    int wallWidth;
    
    public String getAppletInfo() {
	return "Wave2d by Paul Falstad";
    }

    Checkbox stoppedCheck;
    Checkbox intensityCheck;
    Checkbox triChromaticCheck;
    Checkbox symmCheck;
    Checkbox infoCheck;
    Choice setupChooser;
    Vector setupList;
    Setup setup;
    Button resetTimeButton;
    Scrollbar zoomBar;
    Scrollbar angleBar;
    Scrollbar freqBar;
    Scrollbar resBar;
    Scrollbar speedBar;
    Scrollbar brightnessBar;
    double colorMult;
    double wavelength;
    Label auxLabels[];
    Scrollbar auxBars[];
    static final int auxBarCount = 5;
    static final double pi = 3.14159265358979323846;
    static final int apertureHeight = 16;
    float colorFunc[];
    double apertureR[];
    double apertureI[];
    int dragX, dragY;
    boolean dragging;
    boolean dragClear;
    boolean dragSet;
    boolean recompute;
    double t;
    int pause;
    MemoryImageSource imageSource;
    int pixels[];
    String muString = "u";

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    Wave2dCanvas cv;
    Wave2d applet;

    Wave2dFrame(Wave2d a) {
	super("Wave2d Applet v1.2c");
	applet = a;
    }

    boolean useBufferedImage = false;
    
    public void init() {
	setupList = new Vector();
	Setup s = new SingleSlitSetup();
	while (s != null) {
	    setupList.addElement(s);
	    s = s.createNext();
	}
	String os = System.getProperty("os.name");
	int res = 120;
        String jv = System.getProperty("java.class.version");
        double jvf = new Double(jv).doubleValue();
	muString = "u";
        if (jvf >= 48) {
	    muString = "\u03bc";
	    useBufferedImage = true;
	}

	setLayout(new Wave2dLayout());
	cv = new Wave2dCanvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	add(cv);

	setupChooser = new Choice();
	int i;
	for (i = 0; i != setupList.size(); i++)
	    setupChooser.add("Setup: " +
			     ((Setup) setupList.elementAt(i)).getName());
	setup = (Setup) setupList.elementAt(0);
	setupChooser.addItemListener(this);
	add(setupChooser);

	intensityCheck = new Checkbox("Show Intensity", true);
	intensityCheck.addItemListener(this);
	add(intensityCheck);

	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	stoppedCheck.disable();
	add(stoppedCheck);

	triChromaticCheck = new Checkbox("Tri-Chromatic", false);
	triChromaticCheck.addItemListener(this);
	add(triChromaticCheck);

	/*symmCheck = new Checkbox("symm", false);
	symmCheck.addItemListener(this);
	add(symmCheck);*/

	infoCheck = new Checkbox("Show Units", false);
	infoCheck.addItemListener(this);
	add(infoCheck);
	
	add(resetTimeButton = new Button("Reset Time"));
	resetTimeButton.addActionListener(this);
		
	add(new Label("Incidence Angle", Label.CENTER));
	add(angleBar = new Scrollbar(Scrollbar.HORIZONTAL, 90, 1, 10, 170));
	angleBar.addAdjustmentListener(this);

	add(new Label("Speed", Label.CENTER));
	add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 70, 1, 1, 200));
	speedBar.addAdjustmentListener(this);
	speedBar.disable();

	add(new Label("Zoom Out", Label.CENTER));
	add(zoomBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 10, 200));
	zoomBar.addAdjustmentListener(this);

	add(new Label("Resolution", Label.CENTER));
	add(resBar = new Scrollbar(Scrollbar.HORIZONTAL, res, 5, 120, 600));
	resBar.addAdjustmentListener(this);

	add(new Label("Source Frequency", Label.CENTER));
	add(freqBar = new Scrollbar(Scrollbar.HORIZONTAL,
				     120, 1, 1, 236));
	freqBar.addAdjustmentListener(this);

	add(new Label("Brightness", Label.CENTER));
	add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    27, 1, 1, 1000));
	brightnessBar.addAdjustmentListener(this);

	auxLabels = new Label[auxBarCount];
	auxBars   = new Scrollbar[auxBarCount];
	for (i = 0; i != auxBarCount; i++) {
	    add(auxLabels[i] = new Label("Aux " + (i+1), Label.CENTER));
	    add(auxBars[i] = new Scrollbar(Scrollbar.HORIZONTAL,
					   50, 1, 1, 100));
	    auxBars[i].addAdjustmentListener(this);
	}

	add(new Label("http://www.falstad.com"));

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }
	random = new Random();
	setResolution();
	reinit();
	setup = (Setup) setupList.elementAt(0);
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);
	
	resize(750, 600);
	handleResize();
	Dimension x = getSize();
	Dimension screen = getToolkit().getScreenSize();
	setLocation((screen.width  - x.width)/2,
		    (screen.height - x.height)/2);
	show();
    }

    void reinit() {
	doSetup();
    }

    void apertureChanged() {
	clearAperture();
	setup.doAperture();
	recompute = true;
    }
    
    void handleResize() {
        Dimension d = winSize = cv.getSize();
	if (winSize.width == 0)
	    return;
	pixels = null;
	if (useBufferedImage) {
	    try {
		/* simulate the following code using reflection:
		   dbimage = new BufferedImage(d.width, d.height,
		   BufferedImage.TYPE_INT_RGB);
		   DataBuffer db = (DataBuffer)(((BufferedImage)dbimage).
		   getRaster().getDataBuffer());
		   DataBufferInt dbi = (DataBufferInt) db;
		   pixels = dbi.getData();
		*/
		Class biclass = Class.forName("java.awt.image.BufferedImage");
		Class dbiclass = Class.forName("java.awt.image.DataBufferInt");
		Class rasclass = Class.forName("java.awt.image.Raster");
		Constructor cstr = biclass.getConstructor(
		    new Class[] { int.class, int.class, int.class });
		dbimage = (Image) cstr.newInstance(new Object[] {
		    new Integer(d.width), new Integer(d.height),
		    new Integer(BufferedImage.TYPE_INT_RGB)});
		Method m = biclass.getMethod("getRaster", null);
		Object ras = m.invoke(dbimage, null);
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
	    pixels = new int[d.width*d.height];
	    int i;
	    for (i = 0; i != d.width*d.height; i++)
		pixels[i] = 0xFF000000;
	    imageSource = new MemoryImageSource(d.width, d.height, pixels, 0,
						d.width);
	    imageSource.setAnimated(true);
	    imageSource.setFullBufferUpdates(true);
	    dbimage = cv.createImage(imageSource);
	}
    }

    public boolean handleEvent(Event ev) {
        if (ev.id == Event.WINDOW_DESTROY) {
            applet.destroyFrame();
            return true;
        }
        return super.handleEvent(ev);
    }
    
    void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
        g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
    }

    public void paint(Graphics g) {
    }

    boolean calculateNotice;
    long lastTime;
    
    public void updateWave2d(Graphics realg) {
	if (winSize == null || winSize.width == 0) {
	    // this works around some weird bug in IE which causes the
	    // applet to not show up properly sometimes.
	    handleResize();
	    return;
	}

	if (!calculateNotice && recompute) {
	    FontMetrics fm = realg.getFontMetrics();
	    realg.setColor(Color.black);
	    String cs = "Calculating...";
	    realg.fillRect(0, winSize.height-30, 20+fm.stringWidth(cs), 30);
	    realg.setColor(Color.white);
	    realg.drawString(cs, 10, winSize.height-10);
	    cv.repaint(0);
	    calculateNotice = true;
	    return;
	}
	calculateNotice = false;

	double tadd = 0;
	if (!stoppedCheck.getState()) {
	    int val = speedBar.getValue();
	    tadd = Math.exp(val/20.)*(.1/5);
	    long sysTime = System.currentTimeMillis();
	    if (lastTime == 0)
		lastTime = sysTime;
	    tadd *= (sysTime-lastTime)*(1/50.);
	    tadd *= freqBar.getValue() / 34.;
	    t += tadd;
	    lastTime = sysTime;
	} else
	    lastTime = 0;
	double trotr = Math.cos(t);
	double troti = Math.sin(t);
	int i, j;
	
	boolean stopFunc = false;
	if (stoppedCheck.getState())
	    stopFunc = true;
	boolean obstacle = setup instanceof ObstacleSetup;
	double zoom = (zoomBar.getValue()/10.);
	if (recompute) {
	    recompute = false;
	    double fm = (angleBar.getValue()-90) * pi/180;
	    int apStart = -1, apEnd = -1;
	    
	    // find width of area we need results for
	    int compWidth = (int) (zoom*windowWidth);
	    
	    // find width of aperture
	    boolean symm0 = true;
	    boolean symm1 = true;
	    for (i = 0; i != wallWidth; i++) {
		if (apertureR[i] != 0 || apertureI[i] != 0) {
		    if (apertureR[i] != apertureR[wallWidth-1-i] ||
			apertureI[i] != apertureI[wallWidth-1-i])
			symm1 = false;
		    if (i == 0 ||
			apertureR[i] != apertureR[wallWidth-i] ||
			apertureI[i] != apertureI[wallWidth-i])
			symm0 = false;
		    apEnd = i;
		    if (apStart == -1)
			apStart = i;
		}
	    }
	    boolean symmetric = (symm0 || symm1) && !obstacle && fm == 0;
	    if (apStart == -1)
		apStart = apEnd = wallWidth/2;
	    
	    // compute how much wavefront data we need to compute for each line.
	    // -waveEnd, waveEnd = start and end of the wavefront data (where 0 is
	    // the center, directly under the aperture point).  We need enough data
	    // for the right side of the aperture to reach the left side of the
	    // screen, and vice versa.  We assume that the aperture is symmetric.
	    int waveEnd = wallWidth/2+compWidth/2-apStart;
	    
	    // compute how big the FFT arrays have to be.  They must be big enough
	    // to hold the result, plus enough offscreen space so that the waves do
	    // not wrap around to the other side of the screen.  And they must be
	    // a power of 2.
	    int spaceNeeded = apEnd-apStart+1;

	    int symmStop = spaceNeeded/2;
	    if (symmetric)
		compWidth = compWidth/2 + (apEnd-apStart)/2;
	    
	    int sz = 1;
	    while (sz < compWidth + spaceNeeded)
		sz *= 2;
	    /*System.out.println(symm0 + " " + symm1 + " " + symmetric);
	    System.out.println("ap " + apStart + " " + apEnd + " " +
			       "we " + waveEnd + " " +
			       "cw " + compWidth + " " +
			       sz + " " + zoom + " sn " + spaceNeeded);*/
	    int symmReflect = (symm0) ? sz : sz-1;
	    
	    int szm = sz*2-1;
	    float line1[] = new float[sz*2];
	    float line2[] = new float[sz*2];
	    for (i = 0; i != wallWidth; i++)
		if (apertureR[i] != 0 || apertureI[i] != 0) {
		    int ii = (i - wallWidth/2)*2;
		    int i0 = i - wallWidth/2;
		    double a = Math.cos(fm*i0);
		    double b = Math.sin(fm*i0);
		    line2[ii & szm] = (float) (a * apertureR[i] - b * apertureI[i]);
		    line2[(ii+1) & szm] =
			(float) (a * apertureI[i] + b * apertureR[i]);
		}
	    FFT fft = new FFT(sz);
	    fft.transform(line2, false);
	    
	    //System.out.print("computing...");
	    int f = 0;
	    int fstart = triChromaticCheck.getState() ? 0 : 1;
	    int fend   = triChromaticCheck.getState() ? 2 : 1;
	    if (intensityCheck.getState())
		t = 1e8;
	    else
		triChromaticCheck.setState(false);
	    int cfoff = 0;
	    for (f = fstart; f <= fend; f++) {
		double m = freqBar.getValue()/50.;
		if (f == 0)
		    m /= (650/510.); // red, 650 nm (green = 510 nm)
		if (f == 2)
		    m /= (475/510.); // blue, 475 nm
		double m0 = Math.sqrt(m);
		wavelength = 2*pi/m;
		double freq = 1/(2*pi);
		double speed = wavelength * freq;
		
		// if wavelength is smaller than 2 pixels, don't bother trying
		// to draw waves.
		boolean noWaves = wavelength < 2*zoom;

		// if the reset time button gets hit, we have to recompute every
		// frame until the wave this the edges of the screen.
		// 1.23 =~ sqrt(1 + 1/2)
		if (t < resBar.getValue()*zoom*1.23/speed)
		    recompute = true;
		
		for (j = 0; j != windowHeight; j++) {
		    for (i = 0; i != sz*2; i++)
			line1[i] = 0;
		    int jj = j+1;
		    double jz2 = jj*jj*zoom*zoom;
		    int i2;
		    int sz2 = sz*2;
		    
		    // if reset time button was hit, limit wave train
		    double maxdist = t*speed-wavelength/8;

		    for (i = i2 = 0; i <= waveEnd; i++, i2 += 2) {
			double dist1 = Math.sqrt(i*i+jz2);
			double dist2 = dist1*m;
			computeBessel(dist2);
			if (dist1 > maxdist)
			    bessj0 = bessy0 = 0;
			float f1 = (float) (bessj0*m0);
			float f2 = (float) (-bessy0*m0);
			if (i > 0) {
			    line1[sz2-i2] = f1;
			    line1[sz2-i2+1] = f2;
			}
			if (!symmetric || i < spaceNeeded) {
			    line1[i2] = f1;
			    line1[i2+1] = f2;
			}
		    }

		    long t1 = System.currentTimeMillis();
		    fft.transform(line1, false);
		    for (i = 0; i != sz; i++) {
			int ii = i*2;
			float a = line1[ii]*line2[ii] -
			    line1[ii+1]*line2[ii+1];
			float b = line1[ii+1]*line2[ii] +
			    line1[ii]*line2[ii+1];
			line1[ii] = a;
			line1[ii+1] = b;
		    }
		    fft.transform(line1, true);
		    
		    float qmult = 400.f/sz;
		    if (obstacle) {
			float oaddr = (float)(Math.cos(jj*zoom*m)*800/m0);
			float oaddi = -(float)(Math.sin(jj*zoom*m)*800/m0);
			int ww = (int) (windowWidth * zoom);
			for (i = 0; i != ww; i++) {
			    int ii = i-ww/2;
			    float a = (float)Math.cos(fm*ii);
			    float b = (float)Math.sin(fm*ii);
			    float aa = (a * oaddr - b * oaddi) / qmult;
			    float bb = (a * oaddi + b * oaddr) / qmult;
			    line1[szm & (ii*2)  ] = aa-line1[szm & (ii*2)];
			    line1[szm & (ii*2)+1] = bb-line1[szm & (ii*2)+1];
			}
		    }
		    
		    for (i = 0; i != windowWidth; i++) {
			double ir1 = (int) ((i-windowWidth/2  )*zoom);
			double ir2 = (int) ((i-windowWidth/2+1)*zoom);
			int ii1 = (int) ir1;
			int ii2 = (int) ir2;
			int iic = ii2-ii1;
			if (intensityCheck.getState())
			    colorFunc[cfoff] = 0;
			else {
			    colorFunc[cfoff] = 0;
			    colorFunc[cfoff+1] = 0;
			}
			int ii;
			for (ii = ii1; ii <= ii2; ii++) {
			    double q1 = 0;
			    double q2 = 0;
			    if (symmetric && ii >= symmStop) {
				q1 = line1[szm & ((symmReflect-ii)*2)]*qmult;
				q2 = line1[szm & ((symmReflect-ii)*2+1)]*qmult;
			    } else {
				q1 = line1[szm & (ii*2  )]*qmult;
				q2 = line1[szm & (ii*2+1)]*qmult;
			    }
			    double mu = .001;
			    if (ii == ii1)
				mu *= 1-(ir1-ii1);
			    else if (ii == ii2)
				mu *= ir2-ii2;
			    if (intensityCheck.getState())
				colorFunc[cfoff] += (q1*q1+q2*q2) * mu;
			    else if (noWaves) {
				// need to replace q1, q2 with the magnitude, or
				// else the waves average out and cancel when
				// using zoom
				colorFunc[cfoff] += Math.sqrt(q1*q1+q2*q2) * mu;
			    } else {
				colorFunc[cfoff  ] += q1*mu;
				colorFunc[cfoff+1] += q2*mu;
			    }
			}
			if (intensityCheck.getState()) {
			    colorFunc[cfoff++] /= ir2-ir1;
			} else {
			    colorFunc[cfoff++] /= ir2-ir1;
			    colorFunc[cfoff++] /= ir2-ir1;
			}
		    }
		}
	    }
	    //System.out.println("done");
	}

	colorMult = 30*Math.exp(brightnessBar.getValue()/50.-10);
	if (!intensityCheck.getState())
	    colorMult *= 1.5;
	int ix = 0;
	int k, l;
	int height = winSize.height - apertureHeight;
	int cfoff = 0;
	int grncfadd = windowWidth*windowHeight;
	int blucfadd = grncfadd*2;
	double m = freqBar.getValue()/50.;
	wavelength = 2*pi/m;
	boolean noWaves = wavelength < 2*zoom;
	for (j = 0; j != windowHeight; j++) {
	    for (i = 0; i != windowWidth; i++, cfoff++) {
		int x = i*winSize.width/windowWidth;
		int y = j*height/windowHeight + apertureHeight;
		int x2 = (i+1)*winSize.width/windowWidth;
		int y2 = (j+1)*height/windowHeight + apertureHeight;
		int colval = 0;
		if (intensityCheck.getState()) {
		    if (triChromaticCheck.getState())
			colval = 0xFF000000 +
			    (getColorValue(cfoff) << 16) |
			    (getColorValue(cfoff+grncfadd) << 8) |
			    (getColorValue(cfoff+blucfadd));
		    else
			colval = 0xFF000000 +
			    (getColorValue(cfoff) << 8);
		} else {
		    double q1 = colorFunc[cfoff++];
		    double q2 = colorFunc[cfoff];
		    if (noWaves) {
			int qq = (int) (q1*255);
			if (qq > 255)
			    qq = 255;
			colval = 0xFF000000 + qq*0x10100;
		    } else {
			double q = (q1*trotr - q2*troti)*colorMult;
			if (q > 0) {
			    int qq = (int) (q*255);
			    if (qq > 255)
				qq = 255;
			    colval = 0xFF000000 + (qq << 8);
			} else {
			    int qq = (int) (-q*255);
			    if (qq > 255)
				qq = 255;
			    colval = 0xFF000000 + (qq << 16);
			}
		    }
		}
		for (k = x; k < x2; k++)
		    for (l = y; l < y2; l++)
			pixels[k+l*winSize.width] = colval;
	    }
	}

	//System.out.println(zoom + " " + windowWidth + " " + winSize.width);
	for (i = 0; i != windowWidth; i++) {
	    double ir1 = (int) ((i-windowWidth/2  )*zoom);
	    double ir2 = (int) ((i-windowWidth/2+1)*zoom);
	    int ii1 = (int) ir1;
	    int ii2 = (int) ir2;
	    int iic = ii2-ii1;
	    int ii;
	    double funcr = 0, funcb = 0;
	    for (ii = ii1; ii <= ii2; ii++) {
		//System.out.println(i + " " + ii + " " + zoom);
		int ij = ii+wallWidth/2;
		double mu = 1;
		if (ii == ii1)
		    mu *= 1-(ir1-ii1);
		else if (ii == ii2)
		    mu *= ir2-ii2;
		if (ij < 0 || ij >= wallWidth) {
		    funcb += mu;
		    continue;
		}
		funcb += (1-(apertureR[ij]*apertureR[ij] +
			     apertureI[ij]*apertureI[ij]))*mu;
		double ph = Math.atan2(apertureI[ij],
						 apertureR[ij])/pi;
		if (ph < 0)
		    funcr += (2+ph)*mu;
		else
		    funcr += ph*mu;
	    }
	    funcb /= ir2-ir1;
	    funcr /= (ir2-ir1)*2;
	    //System.out.println(i + " " + funcb);
	    if (obstacle)
		funcb = 1-funcb;
	    int valb = (int) (funcb*255);
	    int valr = (int) (funcr*255);
	    if (valb < 0)
		valb = 0;
	    if (valb > 255)
		valb = 255;
	    if (valr < 0)
		valr = 0;
	    if (valb > 255)
		valb = 255;
	    int colval = 0xFF000000 + (valr << 16) | valb;
	    int x = i*winSize.width/windowWidth;
	    int x2 = (i+1)*winSize.width/windowWidth;
	    int y = 0;
	    int y2 = apertureHeight;
	    for (k = x; k < x2; k++)
		for (l = y; l < y2; l++)
		    pixels[k+l*winSize.width] = colval;
	}
	if (imageSource != null)
	    imageSource.newPixels();

	realg.drawImage(dbimage, 0, 0, this);

	if (infoCheck.getState()) {
	    int aw = auxBars[0].getValue();
	    String s1 = setup.getInfo(0);
	    String s2 = setup.getInfo(1);
	    String s3 = "Screen height = " + getLength(zoom*windowHeight);
	    realg.setColor(Color.black);
	    FontMetrics fm = realg.getFontMetrics();
	    int ms = s1 == null ? 0 : fm.stringWidth(s1);
	    ms = s2 == null ? 0 : max(fm.stringWidth(s2), ms);
	    ms = max(fm.stringWidth(s3), ms);
	    int x = 20+ms;
	    int h = s1 == null ? (s2 == null ? 30 : 50) : 70;
	    realg.fillRect(winSize.width-x, winSize.height-h, x, h);
	    realg.setColor(Color.white);
	    if (s1 != null)
		realg.drawString(s1, winSize.width-x+10, winSize.height-50);
	    if (s2 != null)
		realg.drawString(s2, winSize.width-x+10, winSize.height-30);
	    realg.drawString(s3, winSize.width-x+10, winSize.height-10);
	}

	if (!intensityCheck.getState() && !stoppedCheck.getState())
	    cv.repaint(pause);
    }

    int max(int m1, int m2) { return (m1 > m2) ? m1 : m2; }
    
    String getLength(double pix) {
	NumberFormat nf = NumberFormat.getInstance();
	nf.setMaximumFractionDigits(2);
	double l = pix*510/wavelength;
	if (l < 1e3)
	    return nf.format(l) + " nm";
	if (l < 1e6)
	    return nf.format(l*1e-3) + " " + muString + "m";
	if (l < 1e9)
	    return nf.format(l*1e-6) + " mm";
	return nf.format(l*1e-9) + " m";
    }
    
    int getColorValue(int i) {
	int val = (int) (colorFunc[i] * colorMult);
	if (val > 255)
	    val = 255;
	return val;
    }

    int abs(int x) {
	return x < 0 ? -x : x;
    }

    int sign(int x) {
	return (x < 0) ? -1 : (x == 0) ? 0 : 1;
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
	if (e.getSource() == resetTimeButton) {
	    t = 0;
	    recompute = true;
	    cv.repaint();
	}
    }

    public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == resBar && resBar.getValue() != resBarValue)
	    setResolution();
	int i;
	for (i = 0; i != auxBarCount; i++)
	    if (e.getSource() == auxBars[i]) {
		apertureChanged();
		break;
	    }
	if (e.getSource() == zoomBar || e.getSource() == angleBar ||
	    e.getSource() == freqBar)
	    recompute = true;
	setResetTimeButton();
	cv.repaint(pause);
    }

    void setResetTimeButton() {
	// Reset Time button doesn't work well with obstacle or lo freqs
	if (setup instanceof ObstacleSetup || freqBar.getValue() < 8 ||
	    intensityCheck.getState())
	    resetTimeButton.disable();
	else
	    resetTimeButton.enable();
    }
	
    int resBarValue = -1;
    void setResolution() {
	resBarValue = windowWidth = windowHeight = resBar.getValue();
	if ((windowWidth & 1) == 1)
	    windowWidth = windowHeight = resBarValue-1;
	colorFunc = new float[windowWidth*windowHeight*3];
	wallWidth = 512;
	apertureR = new double[wallWidth];
	apertureI = new double[wallWidth];
	System.out.print(windowWidth + " " + windowHeight + "\n");
	apertureChanged();
    }

    void setResolution(int x) {
	resBar.setValue(x);
	setResolution();
    }

    public void mouseDragged(MouseEvent e) {
	dragging = true;
	//edit(e);
	cv.repaint(pause);
    }
    public void mouseMoved(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0)
	    return;
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
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
	//edit(e);
    }
    public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = false;
	dragSet = dragClear = false;
	cv.repaint();
    }
    public void itemStateChanged(ItemEvent e) {
	cv.repaint();
	if (e.getItemSelectable() == symmCheck) {
	    recompute = true;
	}
	if (e.getItemSelectable() == triChromaticCheck ||
	    e.getItemSelectable() == intensityCheck) {
	    setResolution();
	    recompute = true;
	    if (intensityCheck.getState()) {
		stoppedCheck.disable();
		speedBar.disable();
		triChromaticCheck.enable();
	    } else {
		stoppedCheck.enable();
		speedBar.enable();
		triChromaticCheck.disable();
	    }
	    setResetTimeButton();
	    return;
	}
	if (e.getItemSelectable() == setupChooser)
	    doSetup();
    }

    void clearAperture() {
	int i;
	for (i = 0; i != wallWidth; i++)
	    apertureR[i] = apertureI[i] = 0;
    }
    
    void doSetup() {
	t = 1e8;
	int i;
	for (i = 0; i != auxBarCount; i++)
	    auxBars[i].setValue(10);
	freqBar.setValue(120);
	zoomBar.setValue(10);
	angleBar.setValue(90);
	setup = (Setup)
	    setupList.elementAt(setupChooser.getSelectedIndex());
	angleBar.enable();
	setResetTimeButton();
	setup.select();
	apertureChanged();
	for (i = 0; i < setup.getAuxBarCount(); i++) {
	    auxLabels[i].show();
	    auxBars[i].show();
	}
	for (; i < auxBarCount; i++) {
	    auxLabels[i].hide();
	    auxBars[i].hide();
	}
	validate();
    }

    abstract class Setup {
	abstract String getName();
	abstract void select();
	abstract void doAperture();
	abstract Setup createNext();
	String getInfo(int x) { return null; }
	int getAuxBarCount() { return 2; }
    };

    class SingleSlitSetup extends Setup {
	String getName() { return "Single Slit"; }
	void select() {
	    auxLabels[0].setText("Slit Width");
	    brightnessBar.setValue(440);
	}
	int w;
	void doAperture() {
	    int x;
	    w = auxBars[0].getValue();
	    //System.out.println("width = " + w);
	    for (x = 0; x != w; x++)
		apertureR[wallWidth/2 - w/2 + x] = 1;
	}
	int getAuxBarCount() { return 1; }
	String getInfo(int x) {
	    if (x == 1)
		return "Aperture width = " + getLength(w);
	    return null;
	}
	Setup createNext() { return new DoubleSlitSetup(); }
    }
    class DoubleSlitSetup extends Setup {
	String getName() { return "Double Slit"; }
	void select() {
	    auxLabels[0].setText("Slit Width");
	    auxLabels[1].setText("Separation");
	    auxLabels[2].setText("Balance");
	    auxLabels[3].setText("Phase Difference");
	    auxBars[2].setValue(50);
	    auxBars[3].setValue(1);
	    brightnessBar.setValue(380);
	}
	void doAperture() {
	    int x;
	    int w = auxBars[0].getValue();
	    int s = auxBars[1].getValue();
	    double bal2 = auxBars[2].getValue() / 100.;
	    double bal1 = 1-bal2;
	    if (bal1 > bal2) {
		bal2 /= bal1;
		bal1 = 1;
	    } else {
		bal1 /= bal2;
		bal2 = 1;
	    }
	    double ph = (auxBars[3].getValue()-1) * pi / 50.;
	    double a2r = bal2 * Math.cos(ph);
	    double a2i = bal2 * Math.sin(ph);
	    for (x = 0; x != w; x++) {
		apertureR[wallWidth/2 - s - x] = bal1;
		apertureR[wallWidth/2 + s + x] = a2r;
		apertureI[wallWidth/2 + s + x] = a2i;
	    }
	}
	String getInfo(int x) {
	    if (x == 0)
		return "Slit width = " + getLength(auxBars[0].getValue());
	    return "Separation = " + getLength(2*auxBars[1].getValue()-1);
	}
	int getAuxBarCount() { return 4; }
	Setup createNext() { return new GratingSetup(); }
    }
    class GratingSetup extends Setup {
	String getName() { return "Multiple Slits"; }
	void select() {
	    auxLabels[0].setText("Slit Count");
	    auxLabels[1].setText("Slit Width");
	    auxLabels[2].setText("Separation");
	    brightnessBar.setValue(345);
	}
	int getAuxBarCount() { return 3; }
	int w, s;
	void doAperture() {
	    int x;
	    w = auxBars[1].getValue();
	    s = auxBars[2].getValue()+3;
	    if (w > s-1)
		w = s-1;
	    int i;
	    int n = auxBars[0].getValue()/5+1;
	    int sub = 0;
	    while (true) {
		sub = (s*(n-1)+w)/2;
		if (-sub+s*(n-1)+w < wallWidth/2)
		    break;
		n--;
	    }
	    for (x = 0; x != w; x++)
		for (i = 0; i != n; i++)
		    apertureR[wallWidth/2-sub+s*i+x] = 1;
	}
	String getInfo(int x) {
	    if (x == 0)
		return "Slit width = " + getLength(w);
	    return "Separation = " + getLength(s-w);
	}
	Setup createNext() { return new ObstacleSetup(); }
    }
    class ObstacleSetup extends Setup {
	String getName() { return "Obstacle"; }
	void select() {
	    auxLabels[0].setText("Width");
	    // waves with an incidence angle don't work for some reason
	    // with obstacles, so disable them
	    angleBar.disable();
	    angleBar.setValue(90);
	    // don't feel like getting Reset Time to work with Obstacle
	    resetTimeButton.disable();
	    brightnessBar.setValue(310);
	}
	int getAuxBarCount() { return 1; }
	int w;
	void doAperture() {
	    int x;
	    w = (int) (auxBars[0].getValue()*1.5);
	    for (x = 0; x != w; x++)
		apertureR[wallWidth/2-w/2+x] = 1;
	}
	String getInfo(int x) {
	    if (x == 1)
		return "Width = " + getLength(w);
	    return null;
	}
	Setup createNext() { return new ZonePlateEvenSetup(); }
    }
    class ZonePlateEvenSetup extends Setup {
	String getName() { return "Zone Plate (Even)"; }
	int evenOdd = 0;
	boolean phase = false;
	boolean blazed = false;
	void select() {
	    auxLabels[0].setText("Intended Frequency");
	    auxBars[0].setValue(freqBar.getValue() * 100 / 236);
	    auxLabels[1].setText("Focal Length");
	    auxBars[1].setValue(20);
	    auxLabels[2].setText("Plate Width");
	    auxBars[2].setValue(100);
	    brightnessBar.setValue(111);
	}
	int getAuxBarCount() { return 3; }
	void doAperture() {
	    int i;
	    // freqBar ranges from 0 to 4.72, so we match that here
	    double m = auxBars[0].getValue() * .0472;
	    double halfwave = pi/m;
	    int pw = auxBars[2].getValue() * 3;
	    int dy = auxBars[1].getValue()*5;
	    int cx = wallWidth/2;
	    for (i = 1; i != wallWidth; i++) {
		int dx = cx-i;
		if (dx < -pw || dx > pw)
		    continue;
		double dist = Math.sqrt(dx*dx+dy*dy);
		dist = (dist-dy);
		if (blazed) {
		    double ph = dist/halfwave * pi;
		    apertureR[i] = Math.cos(ph);
		    apertureI[i] = Math.sin(ph);
		} else {
		    int zone = (int) (dist / halfwave);
		    apertureR[i] = ((zone & 1) == evenOdd) ? 1 :
			(phase) ? -1 : 0;
		}
	    }
	}
	Setup createNext() { return new ZonePlateOddSetup(); }
    }
    class ZonePlateOddSetup extends ZonePlateEvenSetup {
	ZonePlateOddSetup() { evenOdd = 1; }
	String getName() { return "Zone Plate (Odd)"; }
	Setup createNext() { return new ZonePlatePhaseSetup(); }
    }
    class ZonePlatePhaseSetup extends ZonePlateOddSetup {
	ZonePlatePhaseSetup() { phase = true; }
	String getName() { return "Phase-Reversal Zone Plate"; }
	Setup createNext() { return new ZonePlateBlazedSetup(); }
    }
    class ZonePlateBlazedSetup extends ZonePlateOddSetup {
	ZonePlateBlazedSetup() { blazed = true; }
	String getName() { return "Blazed Zone Plate"; }
	Setup createNext() { return new Hologram1Setup(); }
    }
    class Hologram1Setup extends Setup {
	String getName() { return "Absorption Hologram"; }
	void select() {
	    auxLabels[0].setText("Intended Frequency");
	    auxBars[0].setValue(freqBar.getValue() * 100 / 236);
	    auxLabels[1].setText("X 1");
	    auxLabels[2].setText("Y 1");
	    auxLabels[3].setText("X 2");
	    auxLabels[4].setText("Y 2");
	    auxBars[1].setValue(40);
	    auxBars[2].setValue(15);
	    auxBars[3].setValue(70);
	    auxBars[4].setValue(40);
	    brightnessBar.setValue(285);
	    zoomBar.setValue(15);
	}
	int getAuxBarCount() { return 5; }
	void doAperture() {
	    int i;
	    // freqBar ranges from 0 to 4.72, so we match that here
	    double m = auxBars[0].getValue() * .0472;
	    double halfwave = pi/m;
	    int px1 = auxBars[1].getValue() * 2 - 100;
	    int py1 = auxBars[2].getValue() * 3+5;
	    int px2 = auxBars[3].getValue() * 2 - 100;
	    int py2 = auxBars[4].getValue() * 3+5;
	    int cx = wallWidth/2;
	    int pw = 300;
	    double maxf = 0;
	    double aradd = .75;
	    for (i = 0; i != wallWidth; i++) {
		if (i-cx < -pw || i-cx > pw)
		    continue;
		
		int dx = px1-(i-cx);
		double dist = Math.sqrt(dx*dx+py1*py1);
		computeBessel(dist*m);
		double ar = bessj0, ai = bessy0;
		
		dx = px2-(i-cx);
		dist = Math.sqrt(dx*dx+py2*py2);
		computeBessel(dist*m);
		ar += bessj0;
		ai += bessy0;

		ar += aradd;
		double q = apertureR[i] = Math.sqrt(ar*ar+ai*ai);
		if (q > maxf)
		    maxf = q;
	    }
	    maxf = Math.sqrt(maxf);
	    for (i = 0; i != wallWidth; i++)
		apertureR[i] /= maxf;
	}
	Setup createNext() { return new Hologram2Setup(); }
    }
    class Hologram2Setup extends Setup {
	String getName() { return "Phase Hologram"; }
	void select() {
	    auxLabels[0].setText("Intended Frequency");
	    auxBars[0].setValue(freqBar.getValue() * 100 / 236);
	    auxLabels[1].setText("X 1");
	    auxLabels[2].setText("Y 1");
	    auxLabels[3].setText("X 2");
	    auxLabels[4].setText("Y 2");
	    auxBars[1].setValue(40);
	    auxBars[2].setValue(15);
	    auxBars[3].setValue(70);
	    auxBars[4].setValue(40);
	    brightnessBar.setValue(150);
	    zoomBar.setValue(15);
	}
	int getAuxBarCount() { return 5; }
	void doAperture() {
	    int i;
	    // freqBar ranges from 0 to 4.72, so we match that here
	    double m = auxBars[0].getValue() * .0472;
	    double halfwave = pi/m;
	    int px1 = auxBars[1].getValue() * 2 - 100;
	    int py1 = auxBars[2].getValue() * 3+5;
	    int px2 = auxBars[3].getValue() * 2 - 100;
	    int py2 = auxBars[4].getValue() * 3+5;
	    int cx = wallWidth/2;
	    int pw = 300;
	    double maxf = 0;
	    for (i = 0; i != wallWidth; i++) {
		if (i-cx < -pw || i-cx > pw)
		    continue;
		
		int dx = px1-(i-cx);
		double dist = Math.sqrt(dx*dx+py1*py1);
		computeBessel(dist*m);
		apertureR[i] = bessj0;
		apertureI[i] = bessy0;
		
		dx = px2-(i-cx);
		dist = Math.sqrt(dx*dx+py2*py2);
		computeBessel(dist*m);
		apertureR[i] += bessj0;
		apertureI[i] += bessy0;
		
		double q =
		    apertureR[i]*apertureR[i] +
		    apertureI[i]*apertureI[i];
		if (q > maxf)
		    maxf = q;
	    }
	    maxf = Math.sqrt(maxf);
	    for (i = 0; i != wallWidth; i++) {
		apertureR[i] /= maxf;
		apertureI[i] /= maxf;
	    }
	}
	Setup createNext() { return null; }
    }

    double bessj0, bessy0;
    void computeBessel(double x) {
	double ax = x,z;
	double xx,y,ans,ans1,ans2;

	if (x < 8.0) {
	    y=x*x;
	    ans1=57568490574.0+y*(-13362590354.0+y*(651619640.7
						    +y*(-11214424.18+y*(77392.33017+y*(-184.9052456)))));
	    ans2=57568490411.0+y*(1029532985.0+y*(9494680.718
						  +y*(59272.64853+y*(267.8532712+y*1.0))));
	    bessj0 = ans=ans1/ans2;

	    ans1 = -2957821389.0+y*(7062834065.0+y*(-512359803.6
						    +y*(10879881.29+y*(-86327.92757+y*228.4622733))));
	    ans2=40076544269.0+y*(745249964.8+y*(7189466.438
						 +y*(47447.26470+y*(226.1030244+y*1.0))));
	    bessy0=(ans1/ans2)+0.636619772*bessj0*Math.log(x);
	    
	} else {
	    z=8.0/ax;
	    y=z*z;
	    xx=ax-0.785398164;
	    if (x > 83) {
		ans1 = 1;
		ans2 = -.0156249;
	    } else {
		ans1=1.0+y*(-0.1098628627e-2+y*(0.2734510407e-4
					    +y*(-0.2073370639e-5+y*0.2093887211e-6)));
		ans2 = -0.1562499995e-1+y*(0.1430488765e-3
				+y*(-0.6911147651e-5+y*(0.7621095161e-6
						      -y*0.934935152e-7)));
	    }
	    double sax = Math.sqrt(0.636619772/ax);
	    double cosxx = Math.cos(xx);
	    double sinxx = Math.sin(xx);
	    ans2 *= z;
	    bessj0 = sax * (cosxx*ans1-sinxx*ans2);
	    bessy0 = sax * (sinxx*ans1+cosxx*ans2);
	}
    }

}


class FFT {
    float wtabf[];
    float wtabi[];
    int size;
    FFT(int sz) {
	size = sz;
	if ((size & (size-1)) != 0)
	    System.out.println("size must be power of two!");
	calcWTable();
    }
    
    void calcWTable() {
	// calculate table of powers of w
	wtabf = new float[size];
	wtabi = new float[size];
	int i;
	for (i = 0; i != size; i += 2) {
	    double pi = 3.1415926535;
	    double th = pi*i/size;
	    wtabf[i  ] = (float)Math.cos(th);
	    wtabf[i+1] = (float)Math.sin(th);
	    wtabi[i  ] = wtabf[i];
	    wtabi[i+1] = -wtabf[i+1];
	}
    }
    
    void transform(float data[], boolean inv) {
	int i;
	int j = 0;
	int size2 = size*2;

	if ((size & (size-1)) != 0)
	    System.out.println("size must be power of two!");
	
	// bit-reversal
	float q;
	int bit;
	for (i = 0; i != size2; i += 2) {
	    if (i > j) {
		q = data[i]; data[i] = data[j]; data[j] = q;
		q = data[i+1]; data[i+1] = data[j+1]; data[j+1] = q;
	    }
	    // increment j by one, from the left side (bit-reversed)
	    bit = size;
	    while ((bit & j) != 0) {
		j &= ~bit;
		bit >>= 1;
	    }
	    j |= bit;
	}

	// amount to skip through w table
	int tabskip = size << 1;
	float wtab[] = (inv) ? wtabi : wtabf;
	
	int skip1, skip2, ix, j2;
	float wr, wi, d1r, d1i, d2r, d2i, d2wr, d2wi;
	
	// unroll the first iteration of the main loop
	for (i = 0; i != size2; i += 4) {
	    d1r = data[i];
	    d1i = data[i+1];
	    d2r = data[i+2];
	    d2i = data[i+3];
	    data[i  ] = d1r+d2r;
	    data[i+1] = d1i+d2i;
	    data[i+2] = d1r-d2r;
	    data[i+3] = d1i-d2i;
	}
	tabskip >>= 1;
	
	// unroll the second iteration of the main loop
	int imult = (inv) ? -1 : 1;
	for (i = 0; i != size2; i += 8) {
	    d1r = data[i];
	    d1i = data[i+1];
	    d2r = data[i+4];
	    d2i = data[i+5];
	    data[i  ] = d1r+d2r;
	    data[i+1] = d1i+d2i;
	    data[i+4] = d1r-d2r;
	    data[i+5] = d1i-d2i;
	    d1r = data[i+2];
	    d1i = data[i+3];
	    d2r = data[i+6]*imult;
	    d2i = data[i+7]*imult;
	    data[i+2] = d1r-d2i;
	    data[i+3] = d1i+d2r;
	    data[i+6] = d1r+d2i;
	    data[i+7] = d1i-d2r;
	}
	tabskip >>= 1;
	
	for (skip1 = 16; skip1 <= size2; skip1 <<= 1) {
	    // skip2 = length of subarrays we are combining
	    // skip1 = length of subarray after combination
	    skip2 = skip1 >> 1;
	    tabskip >>= 1;
	    for (i = 0; i != 1000; i++);
	    // for each subarray
	    for (i = 0; i < size2; i += skip1) {
		ix = 0;
		// for each pair of complex numbers (one in each subarray)
		for (j = i; j != i+skip2; j += 2, ix += tabskip) {
		    wr = wtab[ix];
		    wi = wtab[ix+1];
		    d1r = data[j];
		    d1i = data[j+1];
		    j2 = j+skip2;
		    d2r = data[j2];
		    d2i = data[j2+1];
		    d2wr = d2r*wr - d2i*wi;
		    d2wi = d2r*wi + d2i*wr;
		    data[j]    = d1r+d2wr;
		    data[j+1]  = d1i+d2wi;
		    data[j2  ] = d1r-d2wr;
		    data[j2+1] = d1i-d2wi;
		}
	    }
	}
    }
}
