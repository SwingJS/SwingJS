/* Copyright (c) 2002-2012 The University of the West Indies
 *
 * Contact: robert.lancashire@uwimona.edu.jm
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */

// CHANGES to 'JSVPanel.java'
// University of the West Indies, Mona Campus
//
// 25-06-2007 rjl - bug in ReversePlot for non-continuous spectra fixed
//                - previously, one point less than npoints was displayed
// 25-06-2007 cw  - show/hide/close modified
// 10-02-2009 cw  - adjust for non zero baseline in North South plots
// 24-08-2010 rjl - check coord output is not Internationalised and uses decimal point not comma
// 31-10-2010 rjl - bug fix for drawZoomBox suggested by Tim te Beek
// 01-11-2010 rjl - bug fix for drawZoomBox
// 05-11-2010 rjl - colour the drawZoomBox area suggested by Valery Tkachenko
// 23-07-2011 jak - Added feature to draw the x scale, y scale, x units and y units
//					independently of each other. Added independent controls for the font,
//					title font, title bold, and integral plot color.
// 24-09-2011 jak - Altered drawGraph to fix bug related to reversed highlights. Added code to
//					draw integration ratio annotations
// 03-06-2012 rmh - Full overhaul; code simplification; added support for Jcamp 6 nD spectra

package swingjs;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import swingjs.api.HTML5Canvas;
import swingjs.api.HTMLCanvasContext2D;

import jsjava.awt.Color;
import jsjava.awt.Font;
import jsjava.awt.FontMetrics;
import jsjava.awt.Graphics;
import jsjava.awt.Graphics2D;
import jsjava.awt.GraphicsConfiguration;
import jsjava.awt.Image;
import jsjava.awt.Paint;
import jsjava.awt.Rectangle;
import jsjava.awt.RenderingHints;
import jsjava.awt.RenderingHints.Key;
import jsjava.awt.Shape;
import jsjava.awt.Stroke;
import jsjava.awt.font.FontRenderContext;
import jsjava.awt.geom.AffineTransform;
import jsjava.awt.image.BufferedImage;
import jsjava.awt.image.BufferedImageOp;
import jsjava.awt.image.ImageObserver;
import jsjava.awt.image.RenderedImage;
import jsjava.awt.image.renderable.RenderableImage;
import jsjava.text.AttributedCharacterIterator;



/**
 * generic 2D drawing methods -- JavaScript version
 * 
 * guessing a lot here -- just getting something out; 
 * converted from JSpecView
 * 
 * @author Bob Hanson hansonr@stolaf.edu
 */

public class JSGraphics2D extends Graphics2D  {

	private int windowWidth;
	private int windowHeight;
	private HTML5Canvas canvas;

  public JSGraphics2D(Object canvas) {
  	this.canvas = (HTML5Canvas) canvas;
  	
  	ctx = this.canvas.getContext("2d");
  	/**
  	 * @j2sNative
  	 * 
  	 * this.gc = SwingJS;
  	 *
  	 */
  	{}
	}

  private HTMLCanvasContext2D ctx;
  private GraphicsConfiguration gc;
  
	@Override
	public GraphicsConfiguration getDeviceConfiguration() {
		return gc;
	}

	@Override
	public void drawLine(int x0, int y0, int x1, int y1) {
		boolean inPath = this.inPath;
		if (!inPath)
			ctx.beginPath();
		ctx.moveTo(x0, y0);
		ctx.lineTo(x1, y1);
		if (!inPath)
			ctx.stroke();
	}

	public void drawCircle(int x, int y, int diameter) {
		drawArc(x, y, diameter, diameter, 0, 360);		
	}

	@Override
	public void fillArc(int x, int y, int width, int height, int startAngle,
			int arcAngle) {
		doArc(x, y, width, height, startAngle, arcAngle, true);
	}

	@Override
	public void drawArc(int x, int y, int width, int height, int startAngle,
			int arcAngle) {
		doArc(x, y, width, height, startAngle, arcAngle, false);
	}


	private void doArc(int x, int y, int width, int height, int startAngle,
			int arcAngle, boolean fill) {
		// width
		boolean isCircle = (arcAngle - startAngle == 360);
		ctx.save();
		ctx.translate(x, y);
		ctx.scale(width / height, height);
		ctx.beginPath();
		if (fill) {
				// do something here to fill this arc
		}
		ctx.arc(0.5, 0.5, 0.5, toRad(startAngle), toRad(arcAngle), false);
		if (isCircle)
			ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}

	private double toRad(int a) {
		return a * Math.PI / 180;
	}

	public void drawPolygon(int[] ayPoints, int[] axPoints, int nPoints) {
		doPoly(ayPoints, axPoints, nPoints, false);
	}

	/**
	 * @param axPoints
	 * @param ayPoints
	 * @param nPoints
	 * @param doFill
	 */
	private void doPoly(int[] axPoints, int[] ayPoints, int nPoints,
			boolean doFill) {
		ctx.beginPath();
		ctx.moveTo(axPoints[0], ayPoints[0]);
		for (int i = 1; i < nPoints; i++)
			ctx.lineTo(axPoints[i], ayPoints[i]);
		if (doFill)
			ctx.fill();
		else
			ctx.stroke();
	}

	public void drawRect(int x, int y, int width,
			int height) {
		  ctx.beginPath();
      ctx.rect(x ,y, width, height);
      ctx.stroke();
	}

	@Override
	public void drawString(String s, int x, int y) {
	  ctx.fillText(s,x,y);
}

	@Override
	public void drawStringTrans(String str, float x, float y) {
		// apply affine transformation first
	}

	@Override
	public void drawString(AttributedCharacterIterator iterator, int x, int y) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void drawStringAttrTrans(AttributedCharacterIterator iterator, float x, float y) {
		// TODO Auto-generated method stub
		
	}


	boolean isShifted;// private, but only JavaScript
	
	public void background(Color bgcolor) {
		if (bgcolor == null) {
			/*
			 * 
			 * reduce antialiasing, thank you,
			 * http://www.rgraph.net/docs/howto-get-crisp-lines-with-no-antialias.html
			 */
			if (!isShifted)
				ctx.translate(-0.5, -0.5);
			isShifted = true;
			return;
		}
		ctx.clearRect(0, 0, windowWidth, windowHeight);
		setGraphicsColor(bgcolor);
		fillRect(0, 0, windowWidth, windowHeight);
	}

	public void fillCircle(int x, int y, int diameter) {
		double r = diameter/2f;
		 		ctx.beginPath();
		    ctx.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
		    ctx.fill();
	}

	public void fillPolygon(int[] ayPoints, int[] axPoints, int nPoints) {
		doPoly(ayPoints, axPoints, nPoints, true);
	}

	public void fillRect(int x, int y, int width, int height) {
		 ctx.fillRect(x, y, width, height);
	}

	public void setGraphicsColor(Color c) {
		String s = toCSSString(c);
		ctx._setFillStyle(s);
		ctx._strokeStyle(s);
	}

	private String toCSSString(Color c) {
		// TODO Auto-generated method stub
		return null;
	}

	public void setFont(Font font) {
		String s = getInfo(font);
		int pt = s.indexOf(" ");
		s = s.substring(0, pt) + "px" + s.substring(pt);
		ctx._setFont(s);
	}

	private String getInfo(Font font) {
		return font.getSize() + " " + font.getFamily() + " " + font.getSwingjsStyleName();
	}

	public void setStrokeBold(boolean tf) {
		  ctx._setLineWidth(tf ? 2. : 1.);
	}

	public void setWindowParameters(int width, int height) {
		windowWidth = width;
		windowHeight = height;
	}


	public boolean canDoLineTo() {
		return true;
	}

	boolean inPath;
	
	public void doStroke(boolean isBegin) {
		inPath = isBegin;
		  if (isBegin) {
		  	 ctx.beginPath();
		  } else {
		    ctx.stroke();
		  }
	}

	public void lineTo(int x2, int y2) {
		 ctx.lineTo(x2, y2);	
	}

	@Override
	public void draw(Shape s) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void fill(Shape s) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean drawImage(Image img, AffineTransform xform, ImageObserver obs) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void drawImage(BufferedImage img, BufferedImageOp op, int x, int y) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void drawRenderedImage(RenderedImage img, AffineTransform xform) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void drawRenderableImage(RenderableImage img, AffineTransform xform) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean hit(Rectangle rect, Shape s, boolean onStroke) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setPaint(Paint paint) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setStroke(Stroke s) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setRenderingHint(Key hintKey, Object hintValue) {
		// TODO Auto-generated method stub
		
	}

	private RenderingHints hints = new RenderingHints(new HashMap());
	
	@Override
	public Object getRenderingHint(Key hintKey) {
		return hints.get(hintKey);
	}

	@Override
	public void setRenderingHints(Map<?, ?> hints) {
		this.hints = new RenderingHints((Map<Key, ?>)hints);
	}

	@Override
	public void addRenderingHints(Map<?, ?> hints) {
		for (Entry<?, ?> e  : hints.entrySet())
			this.hints.put(e.getKey(), e.getValue());	
	}

	@Override
	public RenderingHints getRenderingHints() {
		return hints;
	}

	@Override
	public void translate(int x, int y) {
		ctx.translate(x, y);
	}

	@Override
	public void translateTrans(double tx, double ty) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void rotate(double theta) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void rotate(double theta, double x, double y) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void scale(double sx, double sy) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void shear(double shx, double shy) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void transform(AffineTransform Tx) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setTransform(AffineTransform Tx) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public AffineTransform getTransform() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Paint getPaint() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setBackground(Color color) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Color getBackground() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Stroke getStroke() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void clip(Shape s) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public FontRenderContext getFontRenderContext() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Graphics createSwingJS() {
		ctx.save();
		return this;// just testing here. It's supposed to be a clone, but...
	}

	@Override
	public void dispose() {
		// we don't really dispose of this, as create doesn't really create a clone
		ctx.restore();
	}

	@Override
	public Color getColor() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setColor(Color c) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setPaintMode() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setXORMode(Color c1) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Font getFont() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FontMetrics getFontMetrics(Font f) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Rectangle getClipBounds() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void clipRect(int x, int y, int width, int height) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setClip(int x, int y, int width, int height) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Shape getClip() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setClip(Shape clip) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void copyArea(int x, int y, int width, int height, int dx, int dy) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void clearRect(int x, int y, int width, int height) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void drawRoundRect(int x, int y, int width, int height, int arcWidth,
			int arcHeight) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void fillRoundRect(int x, int y, int width, int height, int arcWidth,
			int arcHeight) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void drawOval(int x, int y, int width, int height) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void fillOval(int x, int y, int width, int height) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void drawPolyline(int[] xPoints, int[] yPoints, int nPoints) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean drawImage(Image img, int x, int y, ImageObserver observer) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean drawImage(Image img, int x, int y, int width, int height,
			ImageObserver observer) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean drawImage(Image img, int x, int y, Color bgcolor,
			ImageObserver observer) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean drawImage(Image img, int x, int y, int width, int height,
			Color bgcolor, ImageObserver observer) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean drawImage(Image img, int dx1, int dy1, int dx2, int dy2,
			int sx1, int sy1, int sx2, int sy2, ImageObserver observer) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean drawImage(Image img, int dx1, int dy1, int dx2, int dy2,
			int sx1, int sy1, int sx2, int sy2, Color bgcolor, ImageObserver observer) {
		// TODO Auto-generated method stub
		return false;
	}

}
