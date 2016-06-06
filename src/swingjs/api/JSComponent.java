package swingjs.api;

import jsjavax.swing.plaf.ComponentUI;

public interface JSComponent {

  public void updateUI();
  public void setUI(ComponentUI newUI);
  public ComponentUI getUI();
	public String getUIClassID();

}
