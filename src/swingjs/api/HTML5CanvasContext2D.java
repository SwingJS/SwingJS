package swingjs.api;

import jsjava.awt.Stroke;


public abstract class HTML5CanvasContext2D {

	public abstract void beginPath();

	public abstract void moveTo(double x0, double y0);

	public abstract void lineTo(double x1, double y1);

	public abstract void stroke();

	public abstract void save();

	public abstract void scale(double f, double g);

	public abstract void arc(double x, double y, double width, double startAngle, double  endAngle, boolean fill);

	public abstract void closePath();

	public abstract void restore();

	public abstract void translate(double x, double y);

	public abstract void fill();

	public abstract void rect(double x, double y, double width, double height);

	public abstract void fillText(String s, double x, double y);

	public abstract void _setLineWidth(double d);

	public abstract void _setFont(String s);

	public abstract void _setFillStyle(String s);

	public abstract void _setStrokeStyle(String s);

	public abstract void fillRect(double x, double y, double width, double height);

	public abstract void clearRect(int i, int j, int windowWidth, int windowHeight);

	public abstract void setLineDash(int[] dash);

	public abstract void clip();

	public abstract void quadraticCurveTo(double d, double e, double f, double g);

	public abstract void bezeierCurveTo(double d, double e, double f, double g, double h, double i);

	public abstract void drawImage(DOMNode img, int x, int y, int width, int height);

	/**
	 * Static because there is no "stretchImage" function for Context2d.
	 * @param ctx
	 * @param img
	 * @param sx
	 * @param sy
	 * @param swidth
	 * @param sheight
	 * @param dx
	 * @param dy
	 * @param dwidth
	 * @param dheight
	 */
	public static void stretchImage(HTML5CanvasContext2D ctx, DOMNode img, int sx,
			int sy, int swidth, int sheight, int dx, int dy, int dwidth, int dheight) {
		/**
		 * @j2sNative
		 * 
		 * 		ctx.drawImage(img, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);
		 * 
		 */
		{}
	}

	public static Object getImageData(HTML5CanvasContext2D ctx, int width, int height) {
		/**
		 * @j2sNative
		 * 
		 *   return ctx.getImageData(0, 0, width, height);
		 */
		{
			return null;
		}
	}
	

	public static int[] getBuf8(Object imageData) {
		/**
		 * @j2sNative
		 * 
		 *   return imageData.data
		 */
		{
			return null;
		}
	}

	public static void putImageData(HTML5CanvasContext2D ctx, Object imageData, int x, int y) {
		/**
		 * @j2sNative
		 * 
		 *   ctx.putImageData(imageData, x, y);
		 */
		{
		}
	}

	public void saveStroke(Stroke s) {
		/**
		 * @j2sNative
		 * 
		 *   ctx.currentStroke = s;
		 */
		{
		}
	}

	public Stroke getSavedStroke() {
		/**
		 * @j2sNative
		 * 
		 *   return ctx.currentStroke;
		 */
		{
			return null;
		}
	}

}
