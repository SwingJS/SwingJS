package test;
import java.awt.Component;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;

import javax.swing.JCheckBox;
import javax.swing.JFrame;

public class UsingComponentListener {

  public static void main(String[] a) {
    JFrame frame = new JFrame();
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    JCheckBox checkbox = new JCheckBox("Label visible", true);
    checkbox.addComponentListener(new ComponentListener() {
      public void componentHidden(ComponentEvent e) {
        System.out.println("componentHidden event from " + e.getComponent().getClass().getName());
      }

      public void componentMoved(ComponentEvent e) {
        Component c = e.getComponent();
        System.out.println("componentMoved event from " + c.getClass().getName()
            + "; new location: " + c.getLocation().x + ", " + c.getLocation().y);
      }

      public void componentResized(ComponentEvent e) {
        Component c = e.getComponent();
        System.out.println("componentResized event from " + c.getClass().getName() + "; new size: "
            + c.getSize().width + ", " + c.getSize().height);
      }

      public void componentShown(ComponentEvent e) {
        System.out.println("componentShown event from " + e.getComponent().getClass().getName());
      }

    });

    frame.add(checkbox, "North");

    frame.setSize(300, 200);
    frame.setVisible(true);
  }

}