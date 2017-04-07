package test.temp.Film;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.MediaTracker;
import java.awt.Toolkit;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.InputStream;
import java.util.Vector;

import a2s.Applet;
import a2s.Label;
import a2s.Panel;
import a2s.Scrollbar;

public class Film extends Applet implements AdjustmentListener, Runnable {
	int BUTTONSIZE = 23;
	Panel Scrbar, Buttns;
	Scrollbar sbar, speedbar;
	Dimension AppGr;
	Image Bild[] = new Image[1000];
	Image Play, Pause, Rev, Loop_on, Loop_off;
	int BildNr, leftoffset;
	boolean PLAY = false;
	int BilderAnz = 1, speed;
	String loop = new String();
	Label SpeedLab;

	MediaTracker ladekontrolle = new MediaTracker(this);

	Thread ZeitThread = null;

	@Override
	public void init() {
		MouAdapt MouAd = new MouAdapt();
		String BildName;

		AppGr = getSize();
		setBackground(Color.white);
		setFont(new Font("Helvetica", Font.PLAIN, 12));
		setLayout(null);

		leftoffset = (AppGr.width - 11 * BUTTONSIZE / 2) / 2;

		BildNr = 0;
		BilderAnz = 0;
		try {
			speed = Integer.parseInt(getParameter("Speed"));
		} catch (Exception e) {
			speed = 900;
		}
		if ((speed < 0) || (speed > 1000))
			speed = 900;

		try {
			if ((loop = getParameter("Loop")) == null)
				loop = "on";
		} catch (Exception e) {
		}
		if ((!loop.equals("on")) && (!loop.equals("off")))
			loop = "on";

		for (int i = 1;; ++i) {
			try {
				if ((BildName = getParameter("Bild" + i)) == null)
					break;
				Bild[i - 1] = getImage(BildName);
			} catch (Exception e) {
				break;
			}
			++BilderAnz;
		}

		Scrbar = new Panel();
		Buttns = new Panel();
		Scrbar.setBackground(Color.white);
		Buttns.setBackground(Color.white);

		SpeedLab = new Label("Speed");
		SpeedLab.setFont(new Font("Helvetica", Font.PLAIN, 8));
		SpeedLab.setBounds(0, 1, 30, 10);

		Scrbar.setBounds(0, AppGr.height - BUTTONSIZE - 50, AppGr.width, 25);
		Buttns.setBounds(leftoffset + 9 * BUTTONSIZE / 2 - 1, AppGr.height
				- BUTTONSIZE - 11, BUTTONSIZE + 2, BUTTONSIZE + 2);

		Scrbar.setLayout(null);
		Buttns.setLayout(null);

		for (int i = 0; i < BilderAnz; ++i) {
			ladekontrolle.addImage(Bild[i], 1);
			try {
				ladekontrolle.waitForID(1);
			} catch (InterruptedException e) {
			}
		}
		sbar = new Scrollbar(Scrollbar.HORIZONTAL, 0, 1, 0, BilderAnz + 10);
		sbar.setBounds(AppGr.width / 6, 5, AppGr.width * 2 / 3, 15);
		sbar.addAdjustmentListener(this);

		speedbar = new Scrollbar(Scrollbar.HORIZONTAL, 0, 1, 0, 1001);
		speedbar.setBounds(1, 14, BUTTONSIZE, 10);
		speedbar.setUnitIncrement(10);
		speedbar.addAdjustmentListener(this);
		speedbar.setValue(speed);

		Play = getImage_jar("PlayBtn.jpg");
		Pause = getImage_jar("PauseBtn.jpg");
		Rev = getImage_jar("RevBtn.jpg");
		Loop_on = getImage_jar("LoopOn.jpg");
		Loop_off = getImage_jar("LoopOff.jpg");

		this.addMouseListener(MouAd);

		Scrbar.add(sbar);
		Buttns.add(SpeedLab);
		Buttns.add(speedbar);

		add(Scrbar);
		add(Buttns);

		repaint();
	} // Ende: init()

	private Image getImage(String filename) {
		try {
			return javax.imageio.ImageIO.read(new java.net.URL(getCodeBase(),
					filename));
		} catch (Exception e) {
			return null;
		}
	}

	private Image getImage_jar(String filename) {
		Image retImage = null;
		try {
			InputStream in = getClass().getResourceAsStream(filename);
			Vector byteVector = new Vector();
			for (int i = in.read(); i > -1; i = in.read()) {
				byteVector.addElement(new Integer(i));
			}
			byte buffer[] = new byte[byteVector.size()];
			for (int i = 0; byteVector.size() > 0; ++i) {
				buffer[i] = (byte) ((Integer) byteVector.elementAt(0)).intValue();
				byteVector.removeElementAt(0);
			}
			Toolkit toolkit = Toolkit.getDefaultToolkit();
			retImage = toolkit.createImage(buffer);
		} catch (Exception e) {
			e.printStackTrace();
		}
		ladekontrolle.addImage(retImage, 1);
		try {
			ladekontrolle.waitForID(1);
		} catch (InterruptedException e) {
		}
		return retImage;
	}

	@Override
	public void paint(Graphics gc) {
		super.paint(gc);
		if (BilderAnz > 0)
			gc.drawImage(Bild[BildNr],
					(AppGr.width - Bild[BildNr].getWidth(this)) / 2, (AppGr.height
							- BUTTONSIZE - 50 - Bild[BildNr].getHeight(this)) / 2,
					Bild[BildNr].getWidth(this), Bild[BildNr].getHeight(this), this);
		else
			gc.drawString("Kein Bild geladen!", (AppGr.width - 100) / 2,
					(AppGr.height - BUTTONSIZE - 38) / 2);
		if (PLAY)
			gc.drawImage(Pause, leftoffset, AppGr.height - BUTTONSIZE - 10,
					BUTTONSIZE, BUTTONSIZE, this);
		else
			gc.drawImage(Play, leftoffset, AppGr.height - BUTTONSIZE - 10,
					BUTTONSIZE, BUTTONSIZE, this);
		gc.drawImage(Rev, leftoffset + 3 * BUTTONSIZE / 2, AppGr.height
				- BUTTONSIZE - 10, BUTTONSIZE, BUTTONSIZE, this);
		if (loop.equals("on"))
			gc.drawImage(Loop_on, leftoffset + 3 * BUTTONSIZE, AppGr.height
					- BUTTONSIZE - 10, BUTTONSIZE, BUTTONSIZE, this);
		else
			gc.drawImage(Loop_off, leftoffset + 3 * BUTTONSIZE, AppGr.height
					- BUTTONSIZE - 10, BUTTONSIZE, BUTTONSIZE, this);
	}

	@Override
	public void update(Graphics gc) {
		if (BilderAnz > 0)
			gc.drawImage(Bild[BildNr],
					(AppGr.width - Bild[BildNr].getWidth(this)) / 2, (AppGr.height
							- BUTTONSIZE - 50 - Bild[BildNr].getHeight(this)) / 2,
					Bild[BildNr].getWidth(this), Bild[BildNr].getHeight(this), this);
		else
			gc.drawString("Kein Bild geladen!", (AppGr.width - 100) / 2,
					(AppGr.height - BUTTONSIZE - 38) / 2);
		if (PLAY)
			gc.drawImage(Pause, leftoffset, AppGr.height - BUTTONSIZE - 10,
					BUTTONSIZE, BUTTONSIZE, this);
		else
			gc.drawImage(Play, leftoffset, AppGr.height - BUTTONSIZE - 10,
					BUTTONSIZE, BUTTONSIZE, this);
		gc.drawImage(Rev, leftoffset + 3 * BUTTONSIZE / 2, AppGr.height
				- BUTTONSIZE - 10, BUTTONSIZE, BUTTONSIZE, this);
		if (loop.equals("on"))
			gc.drawImage(Loop_on, leftoffset + 3 * BUTTONSIZE, AppGr.height
					- BUTTONSIZE - 10, BUTTONSIZE, BUTTONSIZE, this);
		else
			gc.drawImage(Loop_off, leftoffset + 3 * BUTTONSIZE, AppGr.height
					- BUTTONSIZE - 10, BUTTONSIZE, BUTTONSIZE, this);
	}

	@Override
	public void adjustmentValueChanged(AdjustmentEvent ae) {
		BildNr = sbar.getValue();

		speed = speedbar.getValue();

		repaint();
	}

	@Override
	public void run() {
		long time;

		while (ZeitThread == Thread.currentThread()) {
			time = System.currentTimeMillis();
			if (PLAY) {
				if (BildNr < BilderAnz - 1)
					++BildNr;
				else {
					if (loop.equals("on"))
						BildNr = 0;
					else
						PLAY = false;
				}
				sbar.setValue(BildNr);
				repaint();
			}
			try {
				Thread.sleep(Math.max(0,
						1000 - speed + time - System.currentTimeMillis()));
			} catch (InterruptedException e) {
			}
		} // while
	}

	@Override
	public void start() {
		if (ZeitThread == null) {
			ZeitThread = new Thread(this);
			ZeitThread.start();
		}

	}

	@Override
	public void stop() {
		ZeitThread = null;
	}

	class MouAdapt extends MouseAdapter {
		@Override
		public void mousePressed(MouseEvent me) {
			if ((me.getX() >= leftoffset) && (me.getX() <= leftoffset + BUTTONSIZE)
					&& (me.getY() >= AppGr.height - BUTTONSIZE - 10)
					&& (me.getY() <= AppGr.height - 10)) {
				if (PLAY)
					PLAY = false;
				else {
					if ((loop.equals("off")) && (BildNr == BilderAnz - 1)) {
						BildNr = 0;
						sbar.setValue(0);
					}
					PLAY = true;
				}
				repaint();
			}

			if ((me.getX() >= leftoffset + 3 * BUTTONSIZE / 2)
					&& (me.getX() <= leftoffset + 5 * BUTTONSIZE / 2)
					&& (me.getY() >= AppGr.height - BUTTONSIZE - 10)
					&& (me.getY() <= AppGr.height - 10)) {
				BildNr = 0;
				sbar.setValue(0);

				repaint();
			}

			if ((me.getX() >= leftoffset + 3 * BUTTONSIZE)
					&& (me.getX() <= leftoffset + 4 * BUTTONSIZE)
					&& (me.getY() >= AppGr.height - BUTTONSIZE - 10)
					&& (me.getY() <= AppGr.height - 10)) {
				if (loop.equals("on"))
					loop = "off";
				else
					loop = "on";

				repaint();
			}
		}
	}

} // Ende: class Film
