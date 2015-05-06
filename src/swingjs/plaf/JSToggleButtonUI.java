package swingjs.plaf;

import swingjs.api.DOMNode;


public abstract class JSToggleButtonUI extends JSButtonUI {

	private boolean isDomChecked;

	boolean verifyButtonClick(boolean isRelease) {
		// state should change upon mouse release

		// Yes, we could do this with an HTML5 click event, but I want to try this...

		// cannot use node.getAttribute here because that returns "null" in FF
		boolean checked = ((Boolean) DOMNode.getAttr(domBtn, "checked") == true);
		//   System.out.println(c.getName() + this.id + " JSTogglebutton verify checked=" + checked + " isReleased=" + isRelease + " isDomChecked=" + isDomChecked);
		if (isRelease && isDomChecked == checked)
			return false;
		isDomChecked = checked;
		return true;
	}

	
//  private static final Object BASIC_TOGGLE_BUTTON_UI_KEY = new Object();

//  private final static String propertyPrefix = "ToggleButton" + ".";

//  // ********************************
//  //          Create PLAF
//  // ********************************
//  public static ComponentUI createUI(JComponent b) {
//      AppContext appContext = AppContext.getAppContext();
//      BasicToggleButtonUI toggleButtonUI = 
//              (BasicToggleButtonUI) appContext.get(BASIC_TOGGLE_BUTTON_UI_KEY);
//      if (toggleButtonUI == null) {
//          toggleButtonUI = new BasicToggleButtonUI();
//          appContext.put(BASIC_TOGGLE_BUTTON_UI_KEY, toggleButtonUI);
//      }
//      return toggleButtonUI;
//  }
//
//  protected String getPropertyPrefix() {
//      return propertyPrefix;
//  }
//

//  // ********************************
//  //          Paint Methods
//  // ********************************
//  public void paint(Graphics g, JComponent c) {
//      AbstractButton b = (AbstractButton) c;
//      ButtonModel model = b.getModel();
//
//      Dimension size = b.getSize();
//      FontMetrics fm = g.getFontMetrics();
//
//      Insets i = c.getInsets();
//
//      Rectangle viewRect = new Rectangle(size);
//
//      viewRect.x += i.left;
//      viewRect.y += i.top;
//      viewRect.width -= (i.right + viewRect.x);
//      viewRect.height -= (i.bottom + viewRect.y);
//
//      Rectangle iconRect = new Rectangle();
//      Rectangle textRect = new Rectangle();
//
//      Font f = c.getFont();
//      g.setFont(f);
//
//      // layout the text and icon
//      String text = SwingUtilities.layoutCompoundLabel(
//          c, fm, b.getText(), b.getIcon(),
//          b.getVerticalAlignment(), b.getHorizontalAlignment(),
//          b.getVerticalTextPosition(), b.getHorizontalTextPosition(),
//          viewRect, iconRect, textRect,
//          b.getText() == null ? 0 : b.getIconTextGap());
//
//      g.setColor(b.getBackground());
//
//      if (model.isArmed() && model.isPressed() || model.isSelected()) {
//          paintButtonPressed(g,b);
//      }
//
//      // Paint the Icon
//      if(b.getIcon() != null) {
//          paintIcon(g, b, iconRect);
//      }
//
//      // Draw the Text
//      if(text != null && !text.equals("")) {
//          View v = (View) c.getClientProperty(BasicHTML.propertyKey);
//          if (v != null) {
//             v.paint(g, textRect);
//          } else {
//             paintText(g, b, textRect, text);
//          }
//      }
//
//      // draw the dashed focus line.
//      if (b.isFocusPainted() && b.hasFocus()) {
//          paintFocus(g, b, viewRect, textRect, iconRect);
//      }
//  }

//  protected void paintIcon(Graphics g, AbstractButton b, Rectangle iconRect) {
//      ButtonModel model = b.getModel();
//      Icon icon = null;
//
//      if(!model.isEnabled()) {
//          if(model.isSelected()) {
//             icon = (Icon) b.getDisabledSelectedIcon();
//          } else {
//             icon = (Icon) b.getDisabledIcon();
//          }
//      } else if(model.isPressed() && model.isArmed()) {
//          icon = (Icon) b.getPressedIcon();
//          if(icon == null) {
//              // Use selected icon
//              icon = (Icon) b.getSelectedIcon();
//          }
//      } else if(model.isSelected()) {
//          if(b.isRolloverEnabled() && model.isRollover()) {
//              icon = (Icon) b.getRolloverSelectedIcon();
//              if (icon == null) {
//                  icon = (Icon) b.getSelectedIcon();
//              }
//          } else {
//              icon = (Icon) b.getSelectedIcon();
//          }
//      } else if(b.isRolloverEnabled() && model.isRollover()) {
//          icon = (Icon) b.getRolloverIcon();
//      }
//
//      if(icon == null) {
//          icon = (Icon) b.getIcon();
//      }
//
//      icon.paintIcon(b, g, iconRect.x, iconRect.y);
//  }
//
//  /**
//   * Overriden so that the text will not be rendered as shifted for
//   * Toggle buttons and subclasses.
//   */
//  protected int getTextShiftOffset() {
//      return 0;
//  }
//
//
}
