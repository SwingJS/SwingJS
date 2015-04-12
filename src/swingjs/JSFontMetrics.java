package swingjs;

import jsjava.awt.Font;
import jsjava.awt.FontMetrics;

public class JSFontMetrics extends FontMetrics {
	
	public JSFontMetrics() {
		super(null);
	}
	
	public void setFont(Font f) {
	  font = f;
	}

  /**
   * Determines the <em>standard leading</em> of the
   * <code>Font</code> described by this <code>FontMetrics</code>
   * object.  The standard leading, or
   * interline spacing, is the logical amount of space to be reserved
   * between the descent of one line of text and the ascent of the next
   * line. The height metric is calculated to include this extra space.
   * @return    the standard leading of the <code>Font</code>.
   * @see   #getHeight()
   * @see   #getAscent()
   * @see   #getDescent()
   */
  public int getLeading() {
      return font.getSize() / 20 + 1;
  }

  /**
   * Determines the <em>font ascent</em> of the <code>Font</code>
   * described by this <code>FontMetrics</code> object. The font ascent
   * is the distance from the font's baseline to the top of most
   * alphanumeric characters. Some characters in the <code>Font</code>
   * might extend above the font ascent line.
   * @return     the font ascent of the <code>Font</code>.
   * @see        #getMaxAscent()
   */
  public int getAscent() {
      return font.getSize();
  }

  /**
   * Determines the <em>font descent</em> of the <code>Font</code>
   * described by this
   * <code>FontMetrics</code> object. The font descent is the distance
   * from the font's baseline to the bottom of most alphanumeric
   * characters with descenders. Some characters in the
   * <code>Font</code> might extend
   * below the font descent line.
   * @return     the font descent of the <code>Font</code>.
   * @see        #getMaxDescent()
   */
  public int getDescent() {
      return font.getSize() / 4 + 1;
  }

}
