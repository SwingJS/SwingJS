package test.oracle;

/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1995, 2008, Oracle and/or its affiliates. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */ 


import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

// SwingJS[1] Component --> JPanel	
// SwingJS[2] getCodeBase() --> getDocumentBase()
	class JumbledImage extends JPanel {

    private int numlocs = 2;
    private int numcells = numlocs*numlocs;
    private int[] cells;
    private BufferedImage bi;
    int w, h, cw, ch;
    
    public JumbledImage(URL imageSrc) {
        try {
            bi = ImageIO.read(imageSrc);
            w = bi.getWidth(null);
            h = bi.getHeight(null);
        } catch (IOException e) {
            System.out.println("Image could not be read");
//            System.exit(1);
        }
        cw = w/numlocs;
        ch = h/numlocs;
        cells = new int[numcells];
        for (int i=0;i<numcells;i++) {
            cells[i] = i;
        }
    }

    void jumble() {
        Random rand = new Random();
        int ri;
        for (int i=0; i<numcells; i++) {
            while ((ri = rand.nextInt(numlocs)) == i){}

            int tmp = cells[i];
            cells[i] = cells[ri];
            cells[ri] = tmp;
        }
    }

    @Override
		public Dimension getPreferredSize() {
        return new Dimension(w, h);
    }

    @Override
		public void paint(Graphics g) {

        int dx, dy;
        for (int x=0; x<numlocs; x++) {
            int sx = x*cw;
            for (int y=0; y<numlocs; y++) {
                int sy = y*ch;
                int cell = cells[x*numlocs+y];
                dx = (cell / numlocs) * cw;
                dy = (cell % numlocs) * ch;
                g.drawImage(bi,
                            dx, dy, dx+cw, dy+ch,
                            sx, sy, sx+cw, sy+ch,
                            null);
            }
        }
    }
}

public class JumbledImageApplet extends JApplet {

    static String imageFileName = "duke_skateboard.jpg";
    private URL imageSrc;

    public JumbledImageApplet () {
    }

    public JumbledImageApplet (URL imageSrc) {
        this.imageSrc = imageSrc;
    }

    @Override
		public void init() {
        try {
            imageSrc = pathTo(imageFileName);//new URL(getDocumentBase(), imageFileName);
        } catch (MalformedURLException e) {
        }
        buildUI();
    }
     
    public void buildUI() {
        final JumbledImage ji = new JumbledImage(imageSrc);
        add("Center", ji);
        JButton jumbleButton = new JButton("Jumble");
        jumbleButton.addActionListener(new ActionListener() {
                @Override
								public void actionPerformed(ActionEvent e) {
                    //JButton b = (JButton)e.getSource();
                    ji.jumble();
                    ji.repaint();
                }
            });
        Dimension jumbleSize = ji.getPreferredSize();
        resize(jumbleSize.width, jumbleSize.height+40);
        add("South", jumbleButton);
    }

    public static void main(String s[]) {
        JFrame f = new JFrame("Jumbled Image");
        f.addWindowListener(new WindowAdapter() {
            @Override
						public void windowClosing(WindowEvent e) {System.exit(0);}
        });
        URL imageSrc = null;
        try {
             imageSrc = ((new File(imageFileName)).toURI()).toURL();
        } catch (MalformedURLException e) {
        }
        JumbledImageApplet jumbler = new JumbledImageApplet(imageSrc);
        jumbler.buildUI();
        f.add("Center", jumbler);
        f.pack();
        f.setVisible(true);
    }
    
  	/**
  	 * SwingJS[2]: The original Applet called getCodebase(), but that is not
  	 * appropriate for this demo. Instead, we switch to getDocumentBase()
  	 * 
  	 * SwingJS[3]: We do a switch of /bin/ to /html/ so that we can run it 
  	 * as a Java applet within Eclipse.
  	 *  
  	 * @param file
  	 * @return
  	 * @throws MalformedURLException
  	 */
  	private URL pathTo(String file) throws MalformedURLException {
  		String path = getDocumentBase().toString();
  		int pt = path.indexOf("/bin/");
  		if (pt > 0)
  			path = path.substring(0, pt) + "/html/" + path.substring(pt + 5); 
  		path = path.substring(0, path.lastIndexOf("/") + 1) + file;
  		if (path.startsWith("/"))
  			path = "file://" + path;
  		return new URL(path);
  	}

}

