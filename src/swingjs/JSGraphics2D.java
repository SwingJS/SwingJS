package swingjs;

import java.util.Hashtable;
import java.util.Map;
import java.util.Map.Entry;

import javajs.J2SIgnoreImport;
import jsjava.awt.AlphaComposite;
import jsjava.awt.BasicStroke;
import jsjava.awt.Color;
import jsjava.awt.Composite;
import jsjava.awt.Font;
import jsjava.awt.FontMetrics;
import jsjava.awt.Graphics;
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
import jsjava.awt.geom.Path2D;
import jsjava.awt.geom.PathIterator;
import jsjava.awt.image.BufferedImage;
import jsjava.awt.image.BufferedImageOp;
import jsjava.awt.image.ImageObserver;
import jsjava.awt.image.RenderedImage;
import jsjava.awt.image.renderable.RenderableImage;
import jsjava.text.AttributedCharacterIterator;
import jssun.java2d.SunGraphics2D;
import swingjs.api.DOMNode;
import swingjs.api.HTML5Canvas;
import swingjs.api.HTML5CanvasContext2D;

/**
 * generic 2D drawing methods -- JavaScript version
 * 
 * guessing a lot here -- just getting something out; converted from JSpecView
 * 
 * but see sun.java2d.SunGraphics2D.java for insight into the issues of full
 * implementation
 * 
 * @author Bob Hanson hansonr@stolaf.edu
 */

@J2SIgnoreImport(jsjava.awt.AlphaComposite.class)
public class JSGraphics2D extends SunGraphics2D implements Cloneable {

	private boolean backgroundPainted;
	
  public int constrainX;
  public int constrainY;

  private int width;
	private int height;
	private HTML5Canvas canvas;

	private HTML5CanvasContext2D ctx;
	private GraphicsConfiguration gc;

	private BasicStroke currentStroke;
	private Shape currentClip;
	
	private AlphaComposite currentComposite;
	private int initialState;
	
  //public int strokeState;
  //public int transformState;
  //public int clipState;

  //public Color foregroundColor;
	boolean isShifted;// private, but only JavaScript
	private Font font;

	//private Color currentColor;

	public JSGraphics2D(Object canvas) { // this must be Object, because we are passing an actual HTML5 canvas
		hints = new RenderingHints(new Hashtable());
		this.canvas = (HTML5Canvas) canvas;
		ctx = this.canvas.getContext("2d");
		transform = new AffineTransform();
		setStroke(new BasicStroke());	
		/**
		 * @j2sNative
		 * 
		 *            this.gc = SwingJS;
		 *            this.width = canvas.width;
		 *            this.height = canvas.height;
		 * 
		 */
		{
		}
	}

	/**
	 * the SwingJS object
	 */
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

	@Override
	public void drawOval(int left, int top, int width, int height) {
		if (width == height)
			doCirc(left, top, width, false);
		else
			doArc(left, top, width, height, 0, 360, false);
	}

	@Override
	public void fillOval(int left, int top, int width, int height) {
		if (width == height)
			doCirc(left, top, width, true);
		else
			doArc(left, top, width, height, 0, 360, true);
	}

	@Override
	public void drawArc(int x, int y, int width, int height, int startAngle,
			int arcAngle) {
		doArc(x, y, width, height, startAngle, arcAngle, false);
	}

	@Override
	public void fillArc(int centerX, int centerY, int width, int height, int startAngle,
			int arcAngle) {
		doArc(centerX, centerY, width, height, startAngle, arcAngle, true);
	}

	private void doCirc(int left, int top, int diameter, boolean fill) {
		double r = diameter / 2f;
		ctx.beginPath();
		ctx.arc(left + r, top + r, r, 0, 2 * Math.PI, false);
		ctx.closePath();
		if (fill)
			ctx.fill();
		else
			ctx.stroke();
	}

	private void doArc(double x, double y, double width, double height, double startAngle,
			double arcAngle, boolean fill) {
//		boolean doClose = (arcAngle - startAngle == 360);
		ctx.save();
		{
		    if (arcAngle < 0) {
			startAngle += arcAngle;
			arcAngle = -arcAngle;
		    }
		ctx.translate(x, y);
		ctx.scale(width / 2, height / 2);
		ctx.beginPath();
		ctx.arc(1, 1, 1, toRad (360 - startAngle), toRad (360 - arcAngle - startAngle), true);
		if (fill)
		    ctx.lineTo(1, 1);
		}
		ctx.restore();
		if (fill)
			ctx.fill();
		else
			ctx.stroke();
	}

	private double toRad(double a) {
		return a * (Math.PI / 180);
	}

	@Override
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
		if (doFill) {
			ctx.fill();
		} else {
			ctx.lineTo(axPoints[0], ayPoints[0]);
			ctx.stroke();
		}
	}

	@Override
	public void drawRect(int x, int y, int width, int height) {
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.stroke();
	}

	public void background(Color bgcolor) {
		backgroundColor = bgcolor;
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
		clearRect(0, 0, width, height);
	}

	@Override
	public void fillPolygon(int[] ayPoints, int[] axPoints, int nPoints) {
		doPoly(ayPoints, axPoints, nPoints, true);
	}

	@Override
	public void fillRect(int x, int y, int width, int height) {
		backgroundPainted = true;
		ctx.fillRect(x, y, width, height);
	}

	@Override
	public void setFont(Font font) {
		// this equality check speeds mark/reset significantly
		if (font == this.font)
			return;
		this.font = font;
		if (font != null)
			HTML5CanvasContext2D.setFont(ctx, JSToolkit.getCanvasFont(font));		
	}

	public void setStrokeBold(boolean tf) {
		setLineWidth(tf ? 2. : 1.);
	}

	private void setLineWidth(double d) {
		HTML5CanvasContext2D.setLineWidth(ctx, d);
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
	public void clip(Shape s) {
		doShape(s);
		currentClip = s;
		ctx.clip();
	}

	@Override
	public void draw(Shape s) {
		doShape(s);
		ctx.stroke();
	}

	private int doShape(Shape s) {
		ctx.beginPath();
		double[] pts = new double[6];
		PathIterator pi = s.getPathIterator(null);
		while (!pi.isDone()) {
			switch (pi.currentSegment(pts)) {
			case PathIterator.SEG_MOVETO:
				ctx.moveTo(pts[0], pts[1]);
				break;
			case PathIterator.SEG_LINETO:
				ctx.lineTo(pts[0], pts[1]);
				break;
			case PathIterator.SEG_QUADTO:
				ctx.quadraticCurveTo(pts[0], pts[1], pts[2], pts[3]);
				break;
			case PathIterator.SEG_CUBICTO:
				ctx.bezierCurveTo(pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]);
				break;
			case PathIterator.SEG_CLOSE:
				ctx.closePath();
				break;
			}
			pi.next();
		}
		return pi.getWindingRule();
		// then fill or stroke or clip
	}

	@Override
	public void fill(Shape s) {
		if (doShape(s) == Path2D.WIND_EVEN_ODD)
		/**
		 * @j2sNative
		 * 
		 *            this.ctx.fill("evenodd");
		 */
		{
		} else
			ctx.fill();
	}

	@Override
	public boolean drawImage(Image img, int x, int y, ImageObserver observer) {
	  return drawImagePriv(img, x, y, observer);
	}

	@Override
	public boolean drawImage(Image img, int x, int y, int width, int height,
			ImageObserver observer) {
		backgroundPainted = true;
		if (img != null) {
			DOMNode imgNode = getImageNode(img);
			if (imgNode != null)
				ctx.drawImage(imgNode, x, y, width, height);
			if (observer != null)
				observe(img, observer, imgNode != null);
		}
		return true;
	}

	private DOMNode getImageNode(Image img) {
		backgroundPainted = true;
		DOMNode imgNode = DOMNode.getImageNode(img);
		return (imgNode == null ? JSToolkit.getCompositor().createImageNode(img) : imgNode);
	}

	private void observe(Image img, ImageObserver observer, boolean isOK) {
		observer.imageUpdate(img, (isOK ? 0 : ImageObserver.ABORT	| ImageObserver.ERROR), -1, -1, -1, -1);
	}

	@Override
	public boolean drawImage(Image img, int x, int y, Color bgcolor,
			ImageObserver observer) {
		backgroundPainted = true;
		JSToolkit.notImplemented(null);
		return drawImage(img, x, y, observer);
	}

	@Override
	public boolean drawImage(Image img, int x, int y, int width, int height,
			Color bgcolor, ImageObserver observer) {
		backgroundPainted = true;
		JSToolkit.notImplemented(null);
		return drawImage(img, x, y, width, height, observer);
	}

	@SuppressWarnings("unused")
	@Override
	public boolean drawImage(Image img, int dx1, int dy1, int dx2, int dy2,
			int sx1, int sy1, int sx2, int sy2, ImageObserver observer) {
		backgroundPainted = true;
		if (img != null) {
			byte[] bytes = null;
		  DOMNode imgNode = getImageNode(img);
		  if (imgNode != null)
					HTML5CanvasContext2D.stretchImage(ctx, imgNode, sx1, sy1, sx2 - sx1, sy2
							- sy1, dx1, dy1, dx2 - dx1, dy2 - dy1);				
			if (observer != null)
				observe(img, observer, imgNode != null);
		}
		return true;
	}

	@Override
	public boolean drawImage(Image img, int dx1, int dy1, int dx2, int dy2,
			int sx1, int sy1, int sx2, int sy2, Color bgcolor, ImageObserver observer) {
		JSToolkit.notImplemented(null);
		return drawImage(img, dx1, dy1, dx2, dy2, sx1, sy1, sx2, sy2, observer);
	}

	@Override
	public boolean drawImage(Image img, AffineTransform xform, ImageObserver obs) {
		return drawImageXT(img, xform, obs);
	}

	@Override
	public void drawRenderedImage(RenderedImage img, AffineTransform xform) {
		drawImageXT((Image) img, xform, null);
	}

	@Override
	public void drawRenderableImage(RenderableImage img, AffineTransform xform) {
		drawImageXT((Image) img, xform, null);
	}

	private boolean drawImageXT(Image img, AffineTransform xform,
			ImageObserver obs) {
		ctx.save();
		transformCTX(xform);
		boolean ret = drawImagePriv(img, 0, 0, obs);
		ctx.restore();
		return ret;
	}

	@SuppressWarnings("unused")
	public boolean drawImagePriv(Image img, int x, int y, ImageObserver observer) {
		backgroundPainted = true;
		if (img != null) {
			int[] pixels = null;
			boolean isRGB = false; // usually RGBA 
			/**
			 * @j2sNative
			 * 
			 * pixels = img._pix;
			 * isRGB = (img.imageType == 1);
			 *
			 */
			{
				
			}
			DOMNode imgNode = null;
			int width = ((BufferedImage)img).getRaster().getWidth();
			int height = ((BufferedImage)img).getRaster().getHeight();
			if (pixels == null) {
				if ((imgNode = getImageNode(img)) != null)
					ctx.drawImage(imgNode, x, y, width, height);
			} else {
				Object imageData = HTML5CanvasContext2D.getImageData(ctx, x, y, width, height);
				int[] buf8 = HTML5CanvasContext2D.getBuf8(imageData);
				for (int pt = 0, i = 0, n = Math.min(buf8.length/4, pixels.length); i < n; i++) {
					int argb = pixels[i];
					buf8[pt++] = (argb >> 16) & 0xFF;
					buf8[pt++] = (argb >> 8) & 0xFF;
					buf8[pt++] = argb & 0xFF;
					buf8[pt++] = (isRGB ? 0xFF : (argb >> 24) & 0xFF);
				}
				HTML5CanvasContext2D.putImageData(ctx, imageData, x, y);				
			}
			if (observer != null)
				observe(img, observer, imgNode != null);
		}
		return true;
	}

	@Override
	public boolean hit(Rectangle rect, Shape s, boolean onStroke) {
		JSToolkit.notImplemented(null);
		return false;
	}

	@Override
	public Stroke getStroke() {
		return currentStroke;
	}

	@SuppressWarnings("unused")
	@Override
	public void setStroke(Stroke s) {
		if (!(s instanceof BasicStroke))
			return;
		BasicStroke b = currentStroke = (BasicStroke) s;
		float[] dash = b.getDashArray();
		int[] idash = new int[dash == null ? 0 : dash.length];
		for (int i = idash.length; --i >= 0;)
			idash[i] = (int) dash[i];
		ctx.setLineDash(idash);
		setLineWidth(b.getLineWidth());
		String lineCap, lineJoin;
		float miterLimit = -1;
		switch (b.getEndCap()) {
		case BasicStroke.CAP_BUTT:
			lineCap = "butt";
			break;
		case BasicStroke.CAP_SQUARE:
			lineCap = "square";
			break;
		case BasicStroke.CAP_ROUND:
		default:
			lineCap = "round";
		}
		switch (b.getLineJoin()) {
		case BasicStroke.JOIN_BEVEL:
			lineJoin = "bevel";
			break;
		case BasicStroke.JOIN_MITER:
			lineJoin = "miter";
			miterLimit = b.getMiterLimit();
			break;
		case BasicStroke.JOIN_ROUND:
			lineJoin = "round";
		}
		/**
		 * @j2sNative
		 * 
		 *            this.ctx.lineCap = lineCap; this.ctx.lineJoin = lineJoin; if
		 *            (miterLimit >= 0) this.ctx.miterLimit = miterLimit;
		 */
		{
		}
		// SwingJS TODO more here
	}

	@Override
	public void setRenderingHint(Key hintKey, Object hintValue) {
		hints.put(hintKey, hintValue);
	}

	@Override
	public Object getRenderingHint(Key hintKey) {
		return hints.get(hintKey);
	}

	@Override
	public void setRenderingHints(Map<?, ?> hints) {
		this.hints = new RenderingHints((Map<Key, ?>) hints);
	}

	@Override
	public void addRenderingHints(Map<?, ?> hints) {
		for (Entry<?, ?> e : hints.entrySet())
			this.hints.put(e.getKey(), e.getValue());
	}

	@Override
	public RenderingHints getRenderingHints() {
		return hints;
	}

	@Override
	public void setBackground(Color color) {
		background(color);
	}

	@Override
	public Color getBackground() {
		return backgroundColor;
	}

	@Override
	public Color getColor() {
		return foregroundColor;
	}

	@Override
	public void setColor(Color c) {
		foregroundColor = c;
		setGraphicsColor(c);
	}

	@Override
	public void setPaint(Paint paint) {
		setColor((Color) paint);
	}

	@Override
	public Font getFont() {
		if (font == null)
			font = new Font("Arial", Font.PLAIN, 12);
		return font;
	}

	@Override
	public FontMetrics getFontMetrics() {
		return getFont().getFontMetrics();
	}

	@Override
	public FontMetrics getFontMetrics(Font f) {
		return f.getFontMetrics();
	}

	@Override
	public void clipRect(int x, int y, int width, int height) {
		// SwingJS -- this is not quite right. Should ADD this to the clipping
		// region
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		setCurrentClip(x, y, width, height);
		ctx.clip();
	}

	@Override
	public void setClip(int x, int y, int width, int height) {
		// clipping is disabled because for general component painting
		// because it consumes so much processing.
		// it is presumed that the user will clip when desired
		/**
		 * @j2sNative
		 *  
		 *  if (arguments.length == 1) { this.setClip1(x); return; }
		 */
		{}
		setCurrentClip(x, y, width, height);

		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.clip();
	}

	private void setCurrentClip(int x, int y, int width, int height) {
		Rectangle r = (currentClip instanceof Rectangle ? (Rectangle) currentClip : null);
		if (r == null || r.x != x || r.y != y || r.width != width || r.height != height)
			currentClip = new Rectangle(x, y, width, height);
	}

	@Override
	public void setClip(Shape clip) {
		setClip1(clip);
	}

	public void setClip1(Shape clip) {
		currentClip = clip;
		ctx.beginPath();
		doShape(clip);
		ctx.clip();
	}

	@Override
	public void clearRect(int x, int y, int width, int height) {
		ctx.clearRect(x, y, width, height);
		setGraphicsColor(backgroundColor == null ? Color.WHITE : backgroundColor);
		fillRect(x, y, width, height);
		setGraphicsColor(foregroundColor);
	}

	private void setGraphicsColor(Color c) {
		if (c == null)
			return; // this was the case with a JRootPanel graphic call
		HTML5CanvasContext2D.setColor(ctx, JSToolkit.getCSSColor(c));
	}

	@Override
	public void drawPolyline(int[] xPoints, int[] yPoints, int nPoints) {
		if (nPoints < 2)
			return;
		ctx.moveTo(xPoints[0], yPoints[0]);
		for (int i = 1; i < nPoints; i++) {
			ctx.lineTo(xPoints[i], yPoints[i]);
		}
		ctx.stroke();
	}

	@Override
	public void copyArea(int x, int y, int width, int height, int dx, int dy) {
		JSToolkit.notImplemented(null);
	}

	@Override
	public void drawRoundRect(int x, int y, int width, int height, int arcWidth,
			int arcHeight) {
		JSToolkit.notImplemented(null);
		drawRect(x, y, width, height);
	}

	@Override
	public void fillRoundRect(int x, int y, int width, int height, int arcWidth,
			int arcHeight) {
		JSToolkit.notImplemented(null);
		fillRect(x, y, width, height);
	}

	@Override
	public Shape getClip() {
		return currentClip == null ? getClipBoundsImpl() : currentClip;
	}

	@Override
	public void drawString(String s, int x, int y) {
		ctx.fillText(s, x, y);
	}

	public void drawStringUnique(String s, int x, int y) {
		ctx.fillText(s, x, y);
	}

	@Override
	public void drawStringTrans(String str, float x, float y) {
		// apply affine transformation first
		JSToolkit.notImplemented(null);
	}

	@Override
	public void drawString(AttributedCharacterIterator iterator, int x, int y) {
		JSToolkit.notImplemented(null);
	}

	@Override
	public void drawStringAttrTrans(AttributedCharacterIterator iterator,
			float x, float y) {
		JSToolkit.notImplemented(null);
	}

	@Override
	public void translateTrans(double tx, double ty) {
		JSToolkit.notImplemented(null);
	}

	@Override
	public void shear(double shx, double shy) {
		JSToolkit.notImplemented(null);
	}

	@Override
	public void translate(int x, int y) {
		ctx.translate(x, y);
		transform.translate(x, y);
	}
	
	@Override
	public void rotate(double radians) {
		ctx.rotate(radians);
		transform.rotate(radians);
	}

	@Override
	public void rotate(double theta, double x, double y) {
		ctx.translate(x, y);
		ctx.rotate(theta);
		ctx.translate(-x, -y);
		transform.rotate(theta, x, y);
	}

	@Override
	public void scale(double sx, double sy) {
		ctx.scale(sx, sy);
		transform.scale(sx, sy);
	}

	/**
	 * concatenates the given transform matrix to the current transform
	 * 
	 */
	@Override
	public void	 transform(AffineTransform t) {
		transformCTX(t);
	  transform.concatenate(t);
	}

	private void transformCTX(AffineTransform t) {
		/**
		 * @j2sNative
		 * 
		 * this.ctx.transform (t.m00, t.m10, t.m01, t.m11, t.m02, t.m12);
		 */
		{}
	}

	/**
	 * sets the transform matrix to the given one
	 */
	@Override
	public void setTransform(AffineTransform t) {
			/**
			 * @j2sNative
			 * 
			 *            this.ctx.setTransform (t.m00, t.m10, t.m01, t.m11, t.m02,
			 *            t.m12);
			 *            
			 *            this.$transform.setTransformImpl(t);
			 *            
			 */
			{
				transform.setTransform(t);
			}
	}

  /**
   * Returns a copy of the current transform
   */
	@Override
	public AffineTransform getTransform() {
  	return (AffineTransform) transform.clone();
	}

//  /**
//   * Returns the current Transform ignoring the "constrain"
//   * rectangle.
//   */
//  public AffineTransform cloneTransform() {
//  	return (AffineTransform) transform.clone();
//  }
//
	@Override
	public Paint getPaint() {
		return getColor();
	}

	@Override
	public FontRenderContext getFontRenderContext() {
		return font.getFontMetrics().getFontRenderContext();
	}

	@Override
	public void setPaintMode() {
		JSToolkit.notImplemented(null);
	}

	@Override
	public void setXORMode(Color c1) {
		JSToolkit.notImplemented(null);
	}

	@SuppressWarnings("unused")
	@Override
	public Rectangle getClipBounds() {
		Rectangle r = null;
		/**
		 * @j2sNative
		 * 
		 *            if (arguments.length == 1) r = arguments[0];
		 */
		{
		}
		Rectangle clipRect = getClipBoundsImpl();
		if (r == null) {
			r = clipRect;
		} else {
			r.x = clipRect.x;
			r.y = clipRect.y;
			r.width = clipRect.width;
			r.height = clipRect.height;
		}
		return r;
	}

	private Rectangle getClipBoundsImpl() {
		if (currentClip == null) {
			currentClip = new Rectangle(0, 0, width, height);
		}
		return currentClip.getBounds();
	}

	
	
	@Override
	public void setComposite(Composite comp) {
		// this equality check speeds mark/reset significantly
		if (comp == this.currentComposite)
			return;
		// alpha composite only here
		int newRule = 0;
		boolean isValid = (comp == null || currentComposite == null ||
				(comp instanceof AlphaComposite)
				   && (newRule = ((AlphaComposite) comp).getRule()) != currentComposite.getRule());
		if (isValid && JSToolkit.setGraphicsCompositeAlpha(this, newRule)) {
			currentComposite = (AlphaComposite) comp;
		}
		setAlpha(comp == null ? 1 : ((AlphaComposite) comp).getAlpha());
	}

	public Composite getComposite() {
		return currentComposite;
	}
	
	@Override
	public void drawImage(BufferedImage img, BufferedImageOp op, int x, int y) {
		JSToolkit.drawImageOp(this, img, op, x, y);
	}

	public void setAlpha(float f) {
		/**
		 * @j2sNative
		 *
		 * this.ctx.globalAlpha = f;
		 */
		{}		
	}

	public HTML5Canvas getCanvas() {
		return canvas;
	}

	/**
	 * used to determine if it is likely that the background was painted
	 * 
	 * @return background taint count
	 */
	public boolean isBackgroundPainted() {
		return backgroundPainted;
	}
	
	/////////////// saving of the state ////////////////
	
	private final static int SAVE_ALPHA = 0;
	private final static int SAVE_COMPOSITE = 1;
	private final static int SAVE_STROKE = 2;
	private final static int SAVE_TRANSFORM = 3;
	private final static int SAVE_FONT = 4;
	private final static int SAVE_CLIP = 5;
	private final static int SAVE_BACKGROUND_PAINTED = 6;
	private final static int SAVE_MAX = 7;
	

	/**
	 * creates a save object to extend the capabilities of context2d.save()
	 * that brings that into line with Java's graphics2d .create()
	 * 
	 * in development -- we need to identify all differences
	 * 
	 * 
	 * @return the length of the ctx._aSaved array after the push
	 */
	public int mark() {
		ctx.save();
		Object[] map = new Object[SAVE_MAX];
		
		float alpha = 0;
		/**
		 * @j2sNative
		 * 
		 * alpha = this.ctx.globalAlpha;
		 * 
		 */
		{}
		map[SAVE_ALPHA] = Float.valueOf(alpha);
		map[SAVE_COMPOSITE] = currentComposite;
		map[SAVE_STROKE] = currentStroke;
		map[SAVE_TRANSFORM] = transform;
		map[SAVE_FONT] = font;
		map[SAVE_CLIP] = currentClip;
		map[SAVE_BACKGROUND_PAINTED] = (backgroundPainted ? Boolean.TRUE : Boolean.FALSE);
		backgroundPainted = false;
		return HTML5CanvasContext2D.push(ctx, map);
	}

	/**
	 * try to equate g.dispose() with ctx.restore().
	 * @param n0
	 */
	public void reset(int n0) {
		if (n0 < 1)
			n0 = 1;
		while (HTML5CanvasContext2D.getSavedLevel(ctx) >= n0) {
			Object[] map = HTML5CanvasContext2D.pop(ctx);
			setComposite((Composite) map[SAVE_COMPOSITE]);
			Float alpha = (Float) map[SAVE_ALPHA];
			if (alpha != null)
				setAlpha(alpha.floatValue());
			setStroke((Stroke) map[SAVE_STROKE]);
			setTransform((AffineTransform) map[SAVE_TRANSFORM]);
			setFont((Font) map[SAVE_FONT]);
			currentClip = (Shape) map[SAVE_CLIP];
			backgroundPainted = ((Boolean) map[SAVE_BACKGROUND_PAINTED]).booleanValue();
			ctx.restore();
		}
	}

	@Override
	public Graphics create() {
		return (Graphics) clone();
	}

	@Override
	public Object clone() {
		int n = mark();
		JSGraphics2D g = null;
		/**
		 * avoid super call to Object.clone();
		 * 
		 * @j2sNative
		 * 
		 *            g = Clazz.clone(this);
		 * 
		 */
		{
			g = this; // not passed on to JavaScript
		}
		g.transform = new AffineTransform(transform);
		if (hints != null) {
			g.hints = (RenderingHints) hints.clone();
		}
		/*
		 * FontInfos are re-used, so must be cloned too, if they are valid, and be
		 * nulled out if invalid. The implied trade-off is that there is more to be
		 * gained from re-using these objects than is lost by having to clone them
		 * when the SG2D is cloned.
		 */
		// if (this.fontInfo != null) {
		// if (this.validFontInfo) {
		// g.fontInfo = (FontInfo)this.fontInfo.clone();
		// } else {
		// g.fontInfo = null;
		// }
		// }
		// if (this.glyphVectorFontInfo != null) {
		// g.glyphVectorFontInfo =
		// (FontInfo)this.glyphVectorFontInfo.clone();
		// g.glyphVectorFRC = this.glyphVectorFRC;
		// }
		// g.invalidatePipe();
		g.setStroke((BasicStroke) currentStroke.clone());
		g.initialState = n;
		return g;
	}

	@Override
	public void dispose() {
		reset(initialState);
	}


}
