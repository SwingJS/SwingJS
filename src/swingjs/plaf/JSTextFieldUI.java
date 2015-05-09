package swingjs.plaf;

//import jsjava.awt.FontMetrics;
import jsjava.awt.event.MouseMotionListener;
import jsjavax.swing.text.JTextComponent;
import swingjs.api.DOMNode;

/**
 * SWingJS implementation of stateful user interface for buttons. 
 * Modeled after javax.swing.plaf.basic.BasicButtonUI.java (commented out below).
 * 
 * @author RM
 *
 */
public class JSTextFieldUI extends JSTextUI {

	/**
	 * the radio or check-box or simple button
	 * 
	 */
	protected DOMNode domBtn;

	@Override
	public DOMNode getDOMObject() {
		if (domNode == null) {
			domBtn = enableNode = valueNode = domNode = createDOMObject("input", id,
					"type", "text");
			bindMouse(domNode);
		}
		setCssFont(DOMNode.setAttr(domNode, "value", ((JTextComponent) c).getText()),
				c.getFont());
		return domNode;
	}


	// from BasicButtonUI
	
//	protected void installKeyboardActions(JTextComponent b) {
//		JSTextListener listener = getTextListener(b);
//		if (listener != null) {
//			listener.installKeyboardActions(b);
//		}
//	}
//	
//  protected void uninstallKeyboardActions(JTextComponent b) {
//      JSTextListener listener = getTextListener(b);
//      if(listener != null) {
//          listener.uninstallKeyboardActions(b);
//      }
//  }
//
  // SwingJS -- this is interesting, as it summarizes everything we will need
  // to implement, ultimately. SwingUtilities.layoutCompoundLabel
  // details what we are going to have to do somewhere. 
  
//	private String layout(JTextComponent b, FontMetrics fm, int width, int height) {
//		Insets i = b.getInsets();
//		viewRect.x = i.left;
//		viewRect.y = i.top;
//		viewRect.width = width - (i.right + viewRect.x);
//		viewRect.height = height - (i.bottom + viewRect.y);
//
//		textRect.x = textRect.y = textRect.width = textRect.height = 0;
//		iconRect.x = iconRect.y = iconRect.width = iconRect.height = 0;
//
//		// layout the text and icon
//		return SwingUtilities.layoutCompoundLabel(b, fm, b.getText(), b.getIcon(),
//				b.getVerticalAlignment(), b.getHorizontalAlignment(),
//				b.getVerticalTextPosition(), b.getHorizontalTextPosition(), viewRect,
//				iconRect, textRect, b.getText() == null ? 0 : b.getIconTextGap());
//		return null;
//	}

//
//	@Override
//	protected String getPropertyPrefix() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//
//  // Visual constants
//  // NOTE: This is not used or set any where. Were we allowed to remove
//  // fields, this would be removed.
//  protected int defaultTextIconGap;
//
//  // Amount to offset text, the value of this comes from
//  // defaultTextShiftOffset once setTextShiftOffset has been invoked.
//  private int shiftOffset = 0;
//  // Value that is set in shiftOffset once setTextShiftOffset has been
//  // invoked. The value of this comes from the defaults table.
//  protected int defaultTextShiftOffset;
//
//  private final static String propertyPrefix = "Button" + ".";
//  
//  private static final Object BASIC_BUTTON_UI_KEY = new Object();
//
//  // ********************************
//  //          Create PLAF
//  // ********************************
//  public static ComponentUI createUI(JComponent c) {
//      AppContext appContext = AppContext.getAppContext();
//      BasicButtonUI buttonUI = 
//              (BasicButtonUI) appContext.get(BASIC_BUTTON_UI_KEY);
//      if (buttonUI == null) {
//          buttonUI = new BasicButtonUI();
//          appContext.put(BASIC_BUTTON_UI_KEY, buttonUI);
//      }
//      return buttonUI;
//  }
//
//  protected String getPropertyPrefix() {
//      return propertyPrefix;
//  }
//
//
//  // ********************************
//  //          Install PLAF
//  // ********************************
//  public void installUI(JComponent c) {
//      installDefaults((JTextComponent) c);
//      installListeners((JTextComponent) c);
//      installKeyboardActions((JTextComponent) c);
//      BasicHTML.updateRenderer(c, ((JTextComponent) c).getText());
//  }
//
//  protected void installDefaults(JTextComponent b) {
//      // load shared instance defaults
//      String pp = getPropertyPrefix();
//
//      defaultTextShiftOffset = UIManager.getInt(pp + "textShiftOffset");
//
//      // set the following defaults on the button
//      if (b.isContentAreaFilled()) {
//          LookAndFeel.installProperty(b, "opaque", Boolean.TRUE);
//      } else {
//          LookAndFeel.installProperty(b, "opaque", Boolean.FALSE);
//      }
//
//      if(b.getMargin() == null || (b.getMargin() instanceof UIResource)) {
//          b.setMargin(UIManager.getInsets(pp + "margin"));
//      }
//
//      LookAndFeel.installColorsAndFont(b, pp + "background",
//                                       pp + "foreground", pp + "font");
//      LookAndFeel.installBorder(b, pp + "border");
//
//      Object rollover = UIManager.get(pp + "rollover");
//      if (rollover != null) {
//          LookAndFeel.installProperty(b, "rolloverEnabled", rollover);
//      }
//
//      LookAndFeel.installProperty(b, "iconTextGap", new Integer(4));
//  }
//
//  protected void installListeners(JTextComponent b) {
//      JSButtonListener listener = createButtonListener(b);
//      if(listener != null) {
//          b.addMouseListener(listener);
//          b.addMouseMotionListener(listener);
//          b.addFocusListener(listener);
//          b.addPropertyChangeListener(listener);
//          b.addChangeListener(listener);
//      }
//  }
//
//  protected void installKeyboardActions(JTextComponent b){
//      JSButtonListener listener = getButtonListener(b);
//
//      if(listener != null) {
//          listener.installKeyboardActions(b);
//      }
//  }
//
//
//  // ********************************
//  //         Uninstall PLAF
//  // ********************************
//  public void uninstallUI(JComponent c) {
//      uninstallKeyboardActions((JTextComponent) c);
//      uninstallListeners((JTextComponent) c);
//      uninstallDefaults((JTextComponent) c);
//      BasicHTML.updateRenderer(c, "");
//  }
//
//  protected void uninstallKeyboardActions(JTextComponent b) {
//      JSButtonListener listener = getButtonListener(b);
//      if(listener != null) {
//          listener.uninstallKeyboardActions(b);
//      }
//  }
//
//  protected void uninstallListeners(JTextComponent b) {
//      JSButtonListener listener = getButtonListener(b);
//      if(listener != null) {
//          b.removeMouseListener(listener);
//          b.removeMouseMotionListener(listener);
//          b.removeFocusListener(listener);
//          b.removeChangeListener(listener);
//          b.removePropertyChangeListener(listener);
//      }
//  }
//
//  protected void uninstallDefaults(JTextComponent b) {
//      LookAndFeel.uninstallBorder(b);
//  }
//
//  // ********************************
//  //        Create Listeners
//  // ********************************
//  protected JSButtonListener createButtonListener(JTextComponent b) {
//      return new JSButtonListener(b);
//  }
//
//  public int getDefaultTextIconGap(JTextComponent b) {
//      return defaultTextIconGap;
//  }
//
//  /* These rectangles/insets are allocated once for all
//   * ButtonUI.paint() calls.  Re-using rectangles rather than
//   * allocating them in each paint call substantially reduced the time
//   * it took paint to run.  Obviously, this method can't be re-entered.
//   */
//  private static Rectangle viewRect = new Rectangle();
//  private static Rectangle textRect = new Rectangle();
//  private static Rectangle iconRect = new Rectangle();
//
//  // ********************************
//  //          Paint Methods
//  // ********************************
//
//  public void paint(Graphics g, JComponent c)
//  {
//      JTextComponent b = (JTextComponent) c;
//      ButtonModel model = b.getModel();
//
//      String text = layout(b, SwingUtilities2.getFontMetrics(b, g),
//             b.getWidth(), b.getHeight());
//
//      clearTextShiftOffset();
//
//      // perform UI specific press action, e.g. Windows L&F shifts text
//      if (model.isArmed() && model.isPressed()) {
//          paintButtonPressed(g,b);
//      }
//
//      // Paint the Icon
//      if(b.getIcon() != null) {
//          paintIcon(g,c,iconRect);
//      }
//
//      if (text != null && !text.equals("")){
//          View v = (View) c.getClientProperty(BasicHTML.propertyKey);
//          if (v != null) {
//              v.paint(g, textRect);
//          } else {
//              paintText(g, b, textRect, text);
//          }
//      }
//
//      if (b.isFocusPainted() && b.hasFocus()) {
//          // paint UI specific focus
//          paintFocus(g,b,viewRect,textRect,iconRect);
//      }
//  }
//
//  protected void paintIcon(Graphics g, JComponent c, Rectangle iconRect){
//          JTextComponent b = (JTextComponent) c;
//          ButtonModel model = b.getModel();
//          Icon icon = b.getIcon();
//          Icon tmpIcon = null;
//
//          if(icon == null) {
//             return;
//          }
//
//          Icon selectedIcon = null;
//
//          /* the fallback icon should be based on the selected state */
//          if (model.isSelected()) {
//              selectedIcon = (Icon) b.getSelectedIcon();
//              if (selectedIcon != null) {
//                  icon = selectedIcon;
//              }
//          }
//
//          if(!model.isEnabled()) {
//              if(model.isSelected()) {
//                 tmpIcon = (Icon) b.getDisabledSelectedIcon();
//                 if (tmpIcon == null) {
//                     tmpIcon = selectedIcon;
//                 }
//              }
//
//              if (tmpIcon == null) {
//                  tmpIcon = (Icon) b.getDisabledIcon();
//              }
//          } else if(model.isPressed() && model.isArmed()) {
//              tmpIcon = (Icon) b.getPressedIcon();
//              if(tmpIcon != null) {
//                  // revert back to 0 offset
//                  clearTextShiftOffset();
//              }
//          } else if(b.isRolloverEnabled() && model.isRollover()) {
//              if(model.isSelected()) {
//                 tmpIcon = (Icon) b.getRolloverSelectedIcon();
//                 if (tmpIcon == null) {
//                     tmpIcon = selectedIcon;
//                 }
//              }
//
//              if (tmpIcon == null) {
//                  tmpIcon = (Icon) b.getRolloverIcon();
//              }
//          }
//
//          if(tmpIcon != null) {
//              icon = tmpIcon;
//          }
//
//          if(model.isPressed() && model.isArmed()) {
//              icon.paintIcon(c, g, iconRect.x + getTextShiftOffset(),
//                      iconRect.y + getTextShiftOffset());
//          } else {
//              icon.paintIcon(c, g, iconRect.x, iconRect.y);
//          }
//
//  }
//
//  /**
//   * As of Java 2 platform v 1.4 this method should not be used or overriden.
//   * Use the paintText method which takes the JTextComponent argument.
//   */
//  protected void paintText(Graphics g, JComponent c, Rectangle textRect, String text) {
//      JTextComponent b = (JTextComponent) c;
//      ButtonModel model = b.getModel();
//      FontMetrics fm = SwingUtilities2.getFontMetrics(c, g);
//      int mnemonicIndex = b.getDisplayedMnemonicIndex();
//
//      /* Draw the Text */
//      if(model.isEnabled()) {
//          /*** paint the text normally */
//          g.setColor(b.getForeground());
//          SwingUtilities2.drawStringUnderlineCharAt(c, g,text, mnemonicIndex,
//                                        textRect.x + getTextShiftOffset(),
//                                        textRect.y + fm.getAscent() + getTextShiftOffset());
//      }
//      else {
//          /*** paint the text disabled ***/
//          g.setColor(b.getBackground().brighter());
//          SwingUtilities2.drawStringUnderlineCharAt(c, g,text, mnemonicIndex,
//                                        textRect.x, textRect.y + fm.getAscent());
//          g.setColor(b.getBackground().darker());
//          SwingUtilities2.drawStringUnderlineCharAt(c, g,text, mnemonicIndex,
//                                        textRect.x - 1, textRect.y + fm.getAscent() - 1);
//      }
//  }
//
//  /**
//   * Method which renders the text of the current button.
//   * <p>
//   * @param g Graphics context
//   * @param b Current button to render
//   * @param textRect Bounding rectangle to render the text.
//   * @param text String to render
//   * @since 1.4
//   */
//  protected void paintText(Graphics g, JTextComponent b, Rectangle textRect, String text) {
//      paintText(g, (JComponent)b, textRect, text);
//  }
//
//  // Method signature defined here overriden in subclasses.
//  // Perhaps this class should be abstract?
//  protected void paintFocus(Graphics g, JTextComponent b,
//                            Rectangle viewRect, Rectangle textRect, Rectangle iconRect){
//  }
//
//
//
//  protected void paintButtonPressed(Graphics g, JTextComponent b){
//  }
//
//  protected void clearTextShiftOffset(){
//      this.shiftOffset = 0;
//  }
//
//  protected void setTextShiftOffset(){
//      this.shiftOffset = defaultTextShiftOffset;
//  }
//
//  protected int getTextShiftOffset() {
//      return shiftOffset;
//  }
//
//  // ********************************
//  //          Layout Methods
//  // ********************************
//  public Dimension getMinimumSize(JComponent c) {
//      Dimension d = getPreferredSize(c);
//      View v = (View) c.getClientProperty(BasicHTML.propertyKey);
//      if (v != null) {
//          d.width -= v.getPreferredSpan(View.X_AXIS) - v.getMinimumSpan(View.X_AXIS);
//      }
//      return d;
//  }
//
//  public Dimension getPreferredSize(JComponent c) {
//      JTextComponent b = (JTextComponent)c;
//      return BasicGraphicsUtils.getPreferredButtonSize(b, b.getIconTextGap());
//  }
//
//  public Dimension getMaximumSize(JComponent c) {
//      Dimension d = getPreferredSize(c);
//      View v = (View) c.getClientProperty(BasicHTML.propertyKey);
//      if (v != null) {
//          d.width += v.getMaximumSpan(View.X_AXIS) - v.getPreferredSpan(View.X_AXIS);
//      }
//      return d;
//  }
//
//  /**
//   * Returns the baseline.
//   *
//   * @throws NullPointerException {@inheritDoc}
//   * @throws IllegalArgumentException {@inheritDoc}
//   * @see javax.swing.JComponent#getBaseline(int, int)
//   * @since 1.6
//   */
//  public int getBaseline(JComponent c, int width, int height) {
//      super.getBaseline(c, width, height);
//      JTextComponent b = (JTextComponent)c;
//      String text = b.getText();
//      if (text == null || "".equals(text)) {
//          return -1;
//      }
//      FontMetrics fm = b.getFontMetrics(b.getFont());
//      layout(b, fm, width, height);
//      return BasicHTML.getBaseline(b, textRect.y, fm.getAscent(),
//                                   textRect.width, textRect.height);
//  }
//
//  /**
//   * Returns an enum indicating how the baseline of the component
//   * changes as the size changes.
//   *
//   * @throws NullPointerException {@inheritDoc}
//   * @see javax.swing.JComponent#getBaseline(int, int)
//   * @since 1.6
//   */
//  public Component.BaselineResizeBehavior getBaselineResizeBehavior(
//          JComponent c) {
//      super.getBaselineResizeBehavior(c);
//      if (c.getClientProperty(BasicHTML.propertyKey) != null) {
//          return Component.BaselineResizeBehavior.OTHER;
//      }
//      switch(((JTextComponent)c).getVerticalAlignment()) {
//      case JTextComponent.TOP:
//          return Component.BaselineResizeBehavior.CONSTANT_ASCENT;
//      case JTextComponent.BOTTOM:
//          return Component.BaselineResizeBehavior.CONSTANT_DESCENT;
//      case JTextComponent.CENTER:
//          return Component.BaselineResizeBehavior.CENTER_OFFSET;
//      }
//      return Component.BaselineResizeBehavior.OTHER;
//  }
//
//  private String layout(JTextComponent b, FontMetrics fm,
//                        int width, int height) {
//      Insets i = b.getInsets();
//      viewRect.x = i.left;
//      viewRect.y = i.top;
//      viewRect.width = width - (i.right + viewRect.x);
//      viewRect.height = height - (i.bottom + viewRect.y);
//
//      textRect.x = textRect.y = textRect.width = textRect.height = 0;
//      iconRect.x = iconRect.y = iconRect.width = iconRect.height = 0;
//
//      // layout the text and icon
//      return SwingUtilities.layoutCompoundLabel(
//          b, fm, b.getText(), b.getIcon(),
//          b.getVerticalAlignment(), b.getHorizontalAlignment(),
//          b.getVerticalTextPosition(), b.getHorizontalTextPosition(),
//          viewRect, iconRect, textRect,
//          b.getText() == null ? 0 : b.getIconTextGap());
//  }
//
//  /**
//   * Returns the ButtonListener for the passed in Button, or null if one
//   * could not be found.
//   */
//  private JSButtonListener getButtonListener(JTextComponent b) {
//      MouseMotionListener[] listeners = b.getMouseMotionListeners();
//
//      if (listeners != null) {
//          for (int counter = 0; counter < listeners.length; counter++) {
//              if (listeners[counter] instanceof JSButtonListener) {
//                  return (JSButtonListener)listeners[counter];
//              }
//          }
//      }
//      return null;
//  }
//
//

}
