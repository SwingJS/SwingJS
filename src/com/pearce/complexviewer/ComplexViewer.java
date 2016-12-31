package com.pearce.complexviewer;

//web_Ready
//web_AppletName= ComplexViewer
//web_Description= A viewer of mappings in the complex plane.
//web_JavaVersion= http://www.math.ttu.edu/~pearce/complex/complexviewer.html
//web_AppletImage= complexviewer.png
//web_Category= Mathematics
//web_Date= $Date$
//web_Features= graphics, AWT-to-Swing


/*

	class ComplexViewer (Applet)

	Authors: 
		Keith Orpen, Math department, University of British Columbia.
		Porting, interface, and extensions by Djun Kim, Mathematics UBC.

	Revisions:
	November, 1995
		- First version -  Keith Orpen
	December, 1995
		- Ported to Beta API, cosine and Exp functions added,
		  user interface improved. - Djun Kim
	March, 1996
		- Added Double buffering, cleaned up code. - Djun Kim

	Copyright (c)1995 Keith Orpen.  Extensions copyright (c)1995 Djun Kim.
	The authors reserve all rights.	  

	December 1999
		- Corrected sin function.  Added polar coordinates.  Added rect/polar option.  
		Added adjustable grid sizing. Added adjustable scaling. - Kent Pearce 
		(Texas Tech University)
		
	May 2000
		- Changed function selection controls to a Choice box allow expanded
		function selections - Kent Pearce

	Oct 2016
		- Converted to SwingJS.  - Paul Falstad
*/

import java.awt.Image;
import java.awt.Graphics;
import a2s.Button;
import a2s.Canvas;
import a2s.Choice;
import a2s.Frame;
import a2s.Label;
import a2s.Scrollbar;
import a2s.TextArea;
import a2s.Dialog;
import javax.swing.ButtonGroup;
import javax.swing.JRadioButton;

import a2s.Applet;

import java.awt.Adjustable;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Insets;
import a2s.Panel;
import java.awt.CheckboxGroup;
import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.LayoutManager;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.InputEvent;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.image.BufferedImage;
import java.awt.image.MemoryImageSource;


public class ComplexViewer extends Applet {


	public Image hiddenimagebuffer;
	public Graphics hiddengraphics;

	public void init() {
		setLayout(new BorderLayout());
		ViewPanel vp = new ViewPanel(this);

		add("Center", vp);	 
		add("North", new ControlsTop(vp));
		add("South", new ControlsBase(vp));	 

		resize(600, 450); // PF added

		hiddenimagebuffer = createImage(this.size().width, this.size().height);
		hiddengraphics = hiddenimagebuffer.getGraphics();

		repaint();
	}


	public boolean handleEvent(Event e) {
		switch (e.id) {
		case Event.WINDOW_DESTROY:
			System.exit(0);
			return true;
		default:
			return false;
		}
	}


	public static void main(String args[]) {
		Frame f = new Frame("ComplexViewer");
		ComplexViewer view = new ComplexViewer();
		view.init();
		view.start();
		f.add("Center", view);
		f.show();
	}

}


//
// *****************************************************************************
//


class ViewPanel extends Panel implements MouseMotionListener, MouseListener {

	ComplexViewer parent;

	public static final int Identity = 0;
	public static final int Square = 1;
	public static final int Cube = 2;
	public static final int Cardiod = 3;
	public static final int Sin = 4;
	public static final int Cos = 5;
	public static final int Exp = 6;
	public static final int Invert = 7;
	public static final int Poisson = 8;
	public static final int Convex = 9;
	public static final int Koebe = 10;
	public static final int Airfoil = 11;
	private int functionG = Sin;
	private int functionF = Identity;
	 
	public static final int Rect = 0;
	public static final int Polar = 1;
	private int coordtype = Rect;

	public static final int Small = 0;
	public static final int Large = 2;
	public int scalevalue;

	public static final int Smaller = 0;
	public static final int Larger = 2;
	public int grid;

	public static final int Medium = 1;

	private float scale = 0.015f;
	private int gridspace = 4;
	private int gridlines = 3;									/* lines on either side of the center */
	private int gridsize  = 2 * gridlines + 1;
	private int gridcircles = 3;								/* circles around the center */
	private int gridrays = (int) 2 * (Math.round((gridcircles + 1)/2 + 1));
	private float x1 = 1.0f + gridlines*gridspace;		/* coords of domain grid */
	private float y1 = 1.0f + gridlines*gridspace;	/* coords of domain grid */

	ViewPanel(ComplexViewer target) {
		this.parent = target;

		// added for SwingJS - PF
		addMouseMotionListener(this);
		addMouseListener(this);		
	}


	public void init() {
		resize(500, 450);
	}


	public void start() {
	}


	public void stop() {
	}


	public void destroy() {
	}


	public void setfunctionG(int functionG) {
		switch (functionG) {
			case Identity:
			case Square:
			case Cube:
			case Cardiod:
			case Sin: 
			case Cos:
			case Exp:
			case Invert:
			case Poisson:
			case Convex:
			case Koebe:
			case Airfoil:
				this.functionG = functionG;
				repaint();
				break;
			default:
				throw new IllegalArgumentException();
		}	
	}


	public void setfunctionF(int functionF) {
		switch (functionF) {
			case Identity:
			case Square:
			case Cube:
			case Exp:
			case Invert:
				this.functionF = functionF;
				repaint();
				break;
			default:
				throw new IllegalArgumentException();
		}	
	}


	public void setCoordType(int coordtype) {
		switch (coordtype) {
			case Rect: 
			case Polar:
				this.coordtype = coordtype;
				repaint();
				break;
			default:
				throw new IllegalArgumentException();
		}	
	}


	 public void setScaleValue(int scalevalue) {
	 	float gtemp;
		float sf = 0.75f; 
		int gtemp2;

		switch (scalevalue) {
			case Small:
				scale = sf*scale;
				x1 = (x1/sf + (1.0f-1.0f/sf)*size().width/2);
				y1 = (y1/sf + (1.0f-1.0f/sf)*size().height/2);
				gridspace = (int) Math.round(gridspace/sf);
				this.scalevalue = Medium;
				repaint();
				break;
			case Large:
				scale = scale/sf;
				x1 = (x1*sf + (1.0f-1.0f*sf)*size().width/2);
				y1 = (y1*sf + (1.0f-1.0f*sf)*size().height/2);
				gridspace = (int) Math.round(gridspace*sf);
				this.scalevalue = Medium;
				repaint();
				break;
			default:
				throw new IllegalArgumentException();
		}	
	}


	public void setGridSize(int grid) {
		switch (grid) {
			case Smaller:
				gridlines = gridlines - 1;
				if (gridlines==0) {
					gridlines = 1;
				}
				gridcircles = gridcircles - 1;
				if (gridcircles==0) {
					gridcircles = 1;
				}
				gridsize  = 2 * gridlines + 1;
				gridrays = (int) 2 * (Math.round((gridcircles + 1)/2 + 1));
				this.grid = Medium;
				repaint();
				break;
			case Larger:
				gridlines = gridlines + 1;
				gridcircles = gridcircles + 1;
				gridsize  = 2 * gridlines + 1;
				gridrays = (int) 2 * (Math.round((gridcircles + 1)/2 + 1));
				this.grid = Medium;
				repaint();
				break;
			default:
				throw new IllegalArgumentException();
		}	
	}


	/* REAL part of the complex function G */
	private double g_re( double re, double im )  {
		double gw, denom;
		double huge = 200.0d;
		switch (functionG) {
			case Identity:
				return re;
			case Square:
				gw = re*re - im*im;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Cube:
				gw = re*re*re - 3.0d*re*im*im;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Cardiod:
				gw = re + (re*re - im*im)/2.0d;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Sin:
				gw = Math.sin( re ) * (Math.exp( im ) + Math.exp( -im ) )/2.0d;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Cos:
				gw = Math.cos( re ) * (Math.exp( im ) + Math.exp( -im ) )/2.0d;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Exp:
				gw = Math.exp( re ) * Math.cos( im );
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Invert:
				denom = re*re + im*im;
				gw = re/denom;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Poisson:
				denom = 1.0d - 2.0d*re + re*re + im*im;
				gw = (1 - (re*re + im*im))/denom;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Convex:
				denom = (1.0d - re)*(1.0d - re) + im*im;
				gw = (re - re*re - im*im)/denom;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Koebe:
				denom = (1.0d - re)*(1.0d - re) + im*im;
				gw = (re + (-2.0d +re)*(re*re + im*im))/(denom*denom);
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Airfoil:
				denom = re*re + im*im;
				gw = re + re/denom;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			default:
				throw new IllegalArgumentException();
		}
	}


	/* IMAGINARY part of the complex function G */
	private double g_im( double re, double im )  {
		double gw, denom;
		double huge = 200.0d;
		switch (functionG) {
			case Identity:
				return im;
			case Square:
				gw = 2.0d*re*im;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Cube:
				gw = 3.0d*re*re*im - im*im*im;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Cardiod:
				gw = im + re*im;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Sin:
				gw = Math.cos( re ) * (Math.exp( im ) - Math.exp( -im ) )/2.0d;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Cos:
				gw = Math.sin( re ) * -(Math.exp( im ) - Math.exp( -im ) )/2.0d;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Exp:
				gw = (Math.exp( re ) * (Math.sin( im )));
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Invert:
				denom = re*re + im*im;
				gw = -im/denom;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Poisson:
				denom = 1.0d - 2.0d*re + re*re + im*im;
				gw = (2.0d*im)/denom;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Convex:
				denom = (1.0d - re)*(1.0d- re) + im*im;
				gw = im/denom;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Koebe:
				denom = (1.0d - re)*(1.0d - re) + im*im;
				gw = (im - (im)*(re*re + im*im))/(denom*denom);
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			case Airfoil:
				denom = re*re + im*im;
				gw = im - im/denom;
				if (Math.abs(gw) > huge) {
					gw = gw*huge/Math.abs(gw);
				}
				return gw;
			default:
				throw new IllegalArgumentException();
		}
	}


	/* REAL part of the complex function F */
	private double f_re( double re, double im )  {
		double fz, denom;
		double huge = 200.0d;
		switch (functionF) {
			case Identity:
				return re;
			case Square:
				fz = re*re - im*im;
				return fz;
			case Cube:
				fz = re*re*re - 3.0d*re*im*im;
				return fz;
			case Cardiod:
				fz = re + (re*re - im*im)/2.0d;
				return fz;
			case Sin:
				fz = Math.sin( re ) * (Math.exp( im ) + Math.exp( -im ) )/2.0d;
				return fz;
			case Cos:
				fz = Math.cos( re ) * (Math.exp( im ) + Math.exp( -im ) )/2.0d;
				return fz;
			case Exp:
				fz = Math.exp( re ) * Math.cos( im );
				if (Math.abs(fz) > huge) {
					fz = fz*huge/Math.abs(fz);
				}
				return fz;
			case Invert:
				denom = re*re + im*im;
				fz = re/denom;
				return fz;
			case Poisson:
				denom = 1.0d - 2.0d*re + re*re + im*im;
				fz = (1 - (re*re + im*im))/denom;
			case Convex:
				denom = (1.0d - re)*(1.0d - re) + im*im;
				fz = (re - re*re - im*im)/denom;
				return fz;
			case Koebe:
				denom = (1.0d - re)*(1.0d - re) + im*im;
				fz = (re + (-2.0d +re)*(re*re + im*im))/(denom*denom);
				if (Math.abs(fz) > huge) {
					fz = fz*huge/Math.abs(fz);
				}
				return fz;
			case Airfoil:
				denom = re*re + im*im;
				fz = re + re/denom;
				return fz;
			default:
				throw new IllegalArgumentException();
		}
	}


	/* IMAGINARY part of the complex function F */
	private double f_im( double re, double im )  {
		double fz, denom;
		double huge = 200.0d;
		switch (functionF) {
			case Identity:
				return im;
			case Square:
				fz = 2.0d*re*im;
				return fz;
			case Cube:
				fz = 3.0d*re*re*im - im*im*im;
				return fz;
			case Cardiod:
				fz = im + re*im;
				return fz;
			case Sin:
				fz = Math.cos( re ) * (Math.exp( im ) - Math.exp( -im ) )/2.0d;
				return fz;
			case Cos:
				fz = Math.sin( re ) * -(Math.exp( im ) - Math.exp( -im ) )/2.0d;
				return fz;
			case Exp:
				fz = (Math.exp( re ) * (Math.sin( im )));
				if (Math.abs(fz) > huge) {
					fz = fz*huge/Math.abs(fz);
				}
				return fz;
			case Invert:
				denom = re*re + im*im;
				fz = -im/denom;
				return fz;
			case Poisson:
				denom = 1.0d - 2.0d*re + re*re + im*im;
				fz = (2.0d*im)/denom;
				return fz;
			case Convex:
				denom = (1.0d - re)*(1.0d- re) + im*im;
				fz = im/denom;
				return fz;
			case Koebe:
				denom = (1.0d - re)*(1.0d - re) + im*im;
				fz = (im - (im)*(re*re + im*im))/(denom*denom);
				if (Math.abs(fz) > huge) {
					fz = fz*huge/Math.abs(fz);
				}
				return fz;
			case Airfoil:
				denom = re*re + im*im;
				fz = im - im/denom;
				return fz;
			default:
				throw new IllegalArgumentException();
		}
	}


	private long pointValue_x( float x, float y )  {
		return Math.round( g_re ( f_re( (x-size().width/2)*scale, (y-size().height/2)*scale ),
										  f_im( (x-size().width/2)*scale, (y-size().height/2)*scale ) ) /scale+size().width/2);
	}


	private long pointValue_y( float x, float y )  {
		return Math.round( g_im ( f_re( (x-size().width/2)*scale, (y-size().height/2)*scale ),
										  f_im( (x-size().width/2)*scale, (y-size().height/2)*scale ) ) /scale+size().height/2);
	}
	 

	// switched to paintComponent for SwingJS - PF
	public void paintComponent(Graphics g) {
	    super.paintComponent(g);
		int x, y, r;
		int min_x, max_x, min_y, max_y;
		double pi = 3.141592653589793;
		int x2[][] = new int[gridsize][gridsize];
		int y2[][] = new int[gridsize][gridsize];
		int x3[][] = new int[gridcircles+1][gridcircles*gridrays];
		int y3[][] = new int[gridcircles+1][gridcircles*gridrays];

		int unitlen = Math.round(1/scale);
		int max_r = gridspace * gridcircles;

		int x1i, y1i;

		x1i = (int) Math.round(x1); 
		y1i = (int) Math.round(y1);

		min_x = (x1i - gridspace * gridlines);
		max_x = (x1i + gridspace * gridlines);
		min_y = (y1i - gridspace * gridlines);
		max_y = (y1i + gridspace * gridlines);

		parent.hiddengraphics.setColor(Color.white);
		parent.hiddengraphics.fillRect(0,0,size().width,size().height);
		parent.hiddengraphics.setColor(Color.black);
		parent.hiddengraphics.drawRect(0,0,size().width-1,size().height-1);
		parent.hiddengraphics.drawArc(size().width/2-unitlen, size().height/2-unitlen, 
		unitlen*2, unitlen*2, 0, 360);
		parent.hiddengraphics.drawLine(size().width/2, 0, size().width/2, size().height-1);
		parent.hiddengraphics.drawLine(0, size().height/2, size().width-1, size().height/2);

		if (coordtype==Rect) {
			// Draw the source grid
			parent.hiddengraphics.setColor(Color.red);
			for (int i = -gridlines; i <= gridlines; i++)  {
				x = (x1i + i * gridspace);
				parent.hiddengraphics.drawLine( x, min_y, x, max_y );
			}

			for (int i = -gridlines; i <= gridlines; i++)  {
				y = (y1i + i * gridspace);
				parent.hiddengraphics.drawLine( min_x, y, max_x, y );
			}

			// Draw the target (mapped) grid
			for (int i = 0; i < gridsize; i++)  {
				x = (x1i + (i - gridlines) * gridspace);
				for (int j = 0; j < gridsize; j++)  {
					y = (y1i + (j - gridlines) * gridspace);
					x2[i][j] = (int) pointValue_x( x, y );
					y2[i][j] = (int) pointValue_y( x, y );
		 		}
			}

			parent.hiddengraphics.setColor(Color.blue);
			for (int i = 0; i < gridsize; i++)  {
				for (int j = 1; j < gridsize; j++)  {
					parent.hiddengraphics.drawLine( x2[i][j-1], y2[i][j-1], x2[i][j], y2[i][j] );
					parent.hiddengraphics.drawLine( x2[j-1][i], y2[j-1][i], x2[j][i], y2[j][i] );
		 		}
			}
		}
	
		else {
			// Draw the source grid
			parent.hiddengraphics.setColor(Color.red);
			for (int i = 0; i <= gridrays; i++)  {
				x = (int) Math.round(x1 + max_r*Math.cos(2*pi*i/gridrays));
				y = (int) Math.round(y1 + max_r*Math.sin(2*pi*i/gridrays));
				parent.hiddengraphics.drawLine( x1i, y1i, x, y );
			}

			for (int i = 1; i <= gridcircles; i++)  {
				r = i * gridspace;
				parent.hiddengraphics.drawArc(x1i - r, y1i - r, 2*r, 2*r, 0, 360);
			}


			// Calculate the target (mapped) grid
			x3[0][0] = (int) pointValue_x( x1, y1 );
			y3[0][0] = (int) pointValue_y( x1, y1 );
			for (int j = 1; j < gridrays; j++) {
				x3[0][j] = x3[0][0];
			 	y3[0][j] = y3[0][0];
			}
			for (int i = 1; i <= gridcircles; i++)  {
				r = i * gridspace;
		 		for (int j = 0; j < i*gridrays; j++)  {
					x = (int) Math.round(x1 + r*Math.cos(2*pi*j/(i*gridrays)));
					y = (int) Math.round(y1 + r*Math.sin(2*pi*j/(i*gridrays)));
					x3[i][j] = (int) pointValue_x( x, y );
					y3[i][j] = (int) pointValue_y( x, y );
		 		}
			}


			// Draw the target (mapped) grid
			parent.hiddengraphics.setColor(Color.blue);
			for (int j = 0; j < gridrays; j++)  {
				for (int i = 0; i < gridcircles; i++)  {
					parent.hiddengraphics.drawLine( x3[i][i*j], y3[i][i*j], x3[i+1][(i+1)*j], y3[i+1][(i+1)*j] );
		 		}
			}
			for (int i = 1; i <= gridcircles; i++)  {
				for (int j = 0; j < i*gridrays-1; j++)  {
					parent.hiddengraphics.drawLine( x3[i][j], y3[i][j], x3[i][j+1], y3[i][j+1] );
		 		}
			 	parent.hiddengraphics.drawLine( x3[i][i*gridrays-1], y3[i][i*gridrays-1], x3[i][0], y3[i][0] );
			}
		}


		g.drawImage(parent.hiddenimagebuffer, 0,0, this);
	}


	public void update(Graphics g) {
		paint(g);
	}


	// switched mouseDown/mouseDrag to mousePressed/mouseDragged for SwingJS - PF
	public void mousePressed(MouseEvent me) {
	    int x = me.getX();
	    int y = me.getY();
	    
		if (inside(x,y)) {
			x1 = (float) x;
			y1 = (float) y;
			repaint();
		}
	}


	public void mouseDragged(MouseEvent me) {
	    int x = me.getX();
	    int y = me.getY();

		if (inside(x,y)) {
			x1 = (float) x;
			y1 = (float) y;
			repaint();
		}
	}


	@Override
	public void mouseClicked(MouseEvent e) {
	    // TODO Auto-generated method stub
	    
	}


	@Override
	public void mouseReleased(MouseEvent e) {
	    // TODO Auto-generated method stub
	    
	}


	@Override
	public void mouseEntered(MouseEvent e) {
	    // TODO Auto-generated method stub
	    
	}


	@Override
	public void mouseExited(MouseEvent e) {
	    // TODO Auto-generated method stub
	    
	}


	@Override
	public void mouseMoved(MouseEvent e) {
	    // TODO Auto-generated method stub
	    
	}
}


//
// *****************************************************************************
//


class ControlsTop extends Panel implements ActionListener {

	ViewPanel target;

	String st_Identity_label = "Identity";
	String st_Square_label = "Square";
	String st_Cube_label = "Cube";
	String st_Cardiod_label = "Cardiod";
	String st_Sin_label = "Sin";
	String st_Cos_label = "Cos";
	String st_Exp_label = "Exp";
	String st_Invert_label = "Invert";
	String st_Poisson_label = "Poisson";
	String st_Convex_label = "Convex";
	String st_Koebe_label = "Koebe";
	String st_Airfoil_label = "Airfoil";  

	JRadioButton cb_rect;  
	JRadioButton cb_polar;
	String st_rect_label = "Rect";
	String st_polar_label = "Polar";


	public ControlsTop (ViewPanel target) {
		this.target = target;
		setLayout(new FlowLayout(FlowLayout.CENTER));
		setBackground(Color.lightGray);

		add(new Label("g(w) =", Label.RIGHT));
		Choice gw = new Choice();
		gw.addItem("Identity");
		gw.addItem("Square");
		gw.addItem("Cube");
		gw.addItem("Cardiod");
		gw.addItem("Sin");
		gw.addItem("Cos");
		gw.addItem("Exp");
		gw.addItem("Invert");
		gw.addItem("Poisson");
		gw.addItem("Convex");
		gw.addItem("Koebe");
		gw.addItem("Airfoil");
		gw.addItemListener(itemgw);
		gw.select(4);
		add(gw);
		
		add(new Label("f(z) =", Label.RIGHT));
		Choice fz = new Choice();
		fz.addItem("Identity");
		fz.addItem("Square");
		fz.addItem("Cube");
		fz.addItem("Exp");
		fz.addItem("Invert");
		fz.addItemListener(itemfz);
		fz.select(0);
		add(fz);
		
		add(new Label("Grid Type:", Label.RIGHT));

		// changed CheckboxGroup/Checkboxes to ButtonGroup/JRadioButtons for SwingJS.  PF
		ButtonGroup coordtype_group = new ButtonGroup();
		add(cb_rect = new JRadioButton(st_rect_label, true));
		add(cb_polar = new JRadioButton(st_polar_label, false));
		cb_rect.addActionListener(this);
		cb_polar.addActionListener(this);
		cb_rect.setActionCommand(st_rect_label);
		cb_polar.setActionCommand(st_polar_label);
		coordtype_group.add(cb_rect);
		coordtype_group.add(cb_polar);

	}

  	ItemListener itemgw = new ItemListener () {

		public void itemStateChanged(ItemEvent itemgw) {
			if (itemgw.getItem().equals(st_Identity_label)) {
				target.setfunctionG(ViewPanel.Identity);
			} 
			else if (itemgw.getItem().equals(st_Square_label)) {
				target.setfunctionG(ViewPanel.Square);
			}
			else if (itemgw.getItem().equals(st_Cube_label)) {
				target.setfunctionG(ViewPanel.Cube);
			}
			else if (itemgw.getItem().equals(st_Cardiod_label)) {
				target.setfunctionG(ViewPanel.Cardiod);
			}
			else if (itemgw.getItem().equals(st_Sin_label)) {
				target.setfunctionG(ViewPanel.Sin);
			}
			else if (itemgw.getItem().equals(st_Cos_label)) {
				target.setfunctionG(ViewPanel.Cos);
			}
			else if (itemgw.getItem().equals(st_Exp_label)) {
				target.setfunctionG(ViewPanel.Exp);
			}
			else if (itemgw.getItem().equals(st_Invert_label)) {
				target.setfunctionG(ViewPanel.Invert);
			}
			else if (itemgw.getItem().equals(st_Poisson_label)) {
				target.setfunctionG(ViewPanel.Poisson);
			}
			else if (itemgw.getItem().equals(st_Convex_label)) {
				target.setfunctionG(ViewPanel.Convex);
			}
			else if (itemgw.getItem().equals(st_Koebe_label)) {
				target.setfunctionG(ViewPanel.Koebe);
			}
			else if (itemgw.getItem().equals(st_Airfoil_label)) {
				target.setfunctionG(ViewPanel.Airfoil);
			}
		}
	
	 };  

  	ItemListener itemfz = new ItemListener () {

		public void itemStateChanged(ItemEvent itemfz) {
			if (itemfz.getItem().equals(st_Identity_label)) {
				target.setfunctionF(ViewPanel.Identity);
			} 
			else if (itemfz.getItem().equals(st_Square_label)) {
				target.setfunctionF(ViewPanel.Square);
			}
			else if (itemfz.getItem().equals(st_Cube_label)) {
				target.setfunctionF(ViewPanel.Cube);
			}
			else if (itemfz.getItem().equals(st_Exp_label)) {
				target.setfunctionF(ViewPanel.Exp);
			}
			else if (itemfz.getItem().equals(st_Invert_label)) {
				target.setfunctionF(ViewPanel.Invert);
			}
		}
	
	 };  


	// changed action to actionPerformed for SwingJS.  -PF
	public void actionPerformed(ActionEvent e) {
			String cbox = e.getActionCommand();
		 	if (cbox.equals(st_rect_label)) {
				target.setCoordType(ViewPanel.Rect);
			}
			else if (cbox.equals(st_polar_label)) {
				target.setCoordType(ViewPanel.Polar);
			} 	  
	}
}


//
// *****************************************************************************
//


class ControlsBase extends Panel {

	ViewPanel target;

	public ControlsBase (ViewPanel target) {
		this.target = target;
		setLayout(new FlowLayout(FlowLayout.CENTER));
		setBackground(Color.lightGray);

		add(new Label("Grid Size:", Label.RIGHT));

		Button gs1 = new Button("-");
		add(gs1);
		gs1.addActionListener(gsless);

		Button gs2 = new Button("+");
		add(gs2);
		gs2.addActionListener(gsmore);

		add(new Label("      Zoom:", Label.RIGHT));

		Button sg1 = new Button("+");
		add(sg1);
		sg1.addActionListener(sgin);

		Button sg2 = new Button("-");
		add(sg2);
		sg2.addActionListener(sgout);

		add(new Label("     ", Label.RIGHT));


	}


  	ActionListener gsless = new ActionListener () {

		public void actionPerformed(ActionEvent gsless) {
			target.setGridSize(ViewPanel.Smaller);
		}

	};

  	ActionListener gsmore = new ActionListener () {

		public void actionPerformed(ActionEvent gsmore) {
			target.setGridSize(ViewPanel.Larger);
		}

	};

  	ActionListener sgin = new ActionListener () {

		public void actionPerformed(ActionEvent sgin) {
			target.setScaleValue(ViewPanel.Small);
		}

	};

  	ActionListener sgout = new ActionListener () {

		public void actionPerformed(ActionEvent sgout) {
			target.setScaleValue(ViewPanel.Large);
		}

	};


}
