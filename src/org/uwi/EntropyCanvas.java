package org.uwi;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Point;

import javax.swing.JPanel;

// SwingJS  moved from Canvas to JPanel

public class EntropyCanvas extends JPanel {
  public double Entropy[];
  public int EntropyCalc;
  
  public EntropyCanvas()   {
    super();
  }

  public void paint(Graphics g)   {
    g.setColor(Color.blue);
    Dimension dim = this.getSize();
    double xScale = dim.width/EntropyCalc;
    double yScale = (dim.height-20)/(Entropy[EntropyCalc-1] + 10);
    Point start = new Point();
    start.x = 0;
    start.y = dim.height;
    for (int i=0;i<50;i++)     {
      g.drawLine(start.x,start.y,(int)Math.floor(i * xScale), dim.height - ((int) Math.floor(Entropy[i] * yScale)));
      start.x = (int)Math.floor(i * xScale);
      start.y = dim.height - ((int) Math.floor(Entropy[i] * yScale));
    }
  }
  
}
