package test;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javajs.util.ZipTools;

public class Test_zip {

	public static void main(String[] args) {

		try {
			URL url = new URL("http://chemapps.stolaf.edu/jmol/jsmol/data/sage.zip");
			InputStream fis = url.openStream();
			BufferedInputStream bis = new BufferedInputStream(fis);
			ZipInputStream zis = new ZipInputStream(bis);
			ZipEntry ze = zis.getNextEntry();
			System.out.println(ze.getName() + " " + ze.getSize());
			bis.close();
			
			
			
		  url = new URL("http://chemapps.stolaf.edu/jmol/jsmol/data/sage.zip");
			fis = url.openStream();
			bis = new BufferedInputStream(fis);
			String s = new ZipTools().getZipDirectoryAsStringAndClose(bis);
			System.out.println(s);
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}