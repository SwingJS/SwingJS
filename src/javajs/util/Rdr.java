/* $RCSfile$
 * $Author: hansonr $
 * $Date: 2007-04-05 09:07:28 -0500 (Thu, 05 Apr 2007) $
 * $Revision: 7326 $
 *
 * Copyright (C) 2003-2005  The Jmol Development Team
 *
 * Contact: jmol-developers@lists.sf.net
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
package javajs.util;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;

import java.util.Map;


import javajs.api.GenericCifDataParser;
import javajs.api.GenericLineReader;
import javajs.api.GenericZipTools;
import javajs.api.ZInputStream;

/**
 * A general helper class for a variety of stream and reader functionality
 * including:
 * 
 *  stream and byte magic-number decoding for PNG, PNGJ, ZIP, and GZIP streams
 *  
 *  various stream/reader methods, including UTF-encoded stream reading
 *  
 *  reflection-protected access to a CIF parser and ZIP tools
 *  
 *   
 * 
 * 
 */
public class Rdr implements GenericLineReader {

  BufferedReader reader;

  public Rdr(BufferedReader reader) {
    this.reader = reader;
  }
  
  @Override
  public String readNextLine() throws Exception {
    return reader.readLine();
  }

  public static Map<String, Object> readCifData(GenericCifDataParser parser, BufferedReader br) {
    return parser.set(null, br).getAllCifData();
  }
  
  
  ///////////
  
  public static String fixUTF(byte[] bytes) {    
    Encoding encoding = getUTFEncoding(bytes);
    if (encoding != Encoding.NONE)
    try {
      String s = new String(bytes, encoding.name().replace('_', '-'));
      switch (encoding) {
      case UTF8:
      case UTF_16BE:
      case UTF_16LE:
        // extra byte at beginning removed
        s = s.substring(1);
        break;
      default:
        break;        
      }
      return s;
    } catch (UnsupportedEncodingException e) {
      System.out.println(e);
    }
    return new String(bytes);
  }

  private static Encoding getUTFEncoding(byte[] bytes) {
    if (bytes.length >= 3 && bytes[0] == (byte) 0xEF && bytes[1] == (byte) 0xBB && bytes[2] == (byte) 0xBF)
      return Encoding.UTF8;
    if (bytes.length >= 4 && bytes[0] == (byte) 0 && bytes[1] == (byte) 0 
        && bytes[2] == (byte) 0xFE && bytes[3] == (byte) 0xFF)
      return Encoding.UTF_32BE;
    if (bytes.length >= 4 && bytes[0] == (byte) 0xFF && bytes[1] == (byte) 0xFE 
        && bytes[2] == (byte) 0 && bytes[3] == (byte) 0)
      return Encoding.UTF_32LE;
    if (bytes.length >= 2 && bytes[0] == (byte) 0xFF && bytes[1] == (byte) 0xFE)
      return Encoding.UTF_16LE;
    if (bytes.length >= 2 && bytes[0] == (byte) 0xFE && bytes[1] == (byte) 0xFF)
      return Encoding.UTF_16BE;
    return Encoding.NONE;
  
  }
  
  ////////// stream type checking //////////
  

  private static Encoding getUTFEncodingForStream(BufferedInputStream is) throws IOException {
    /**
     * @j2sNative
     * 
     *  is.resetStream();
     * 
     */
    {
    }
    byte[] abMagic = new byte[4];
    abMagic[3] = 1;
    try{
    is.mark(5);
    } catch (Exception e) {
      return Encoding.NONE;
    }
    is.read(abMagic, 0, 4);
    is.reset();
    return getUTFEncoding(abMagic);
  }

  public static boolean isBase64(SB sb) {
    return (sb.indexOf(";base64,") == 0);
  }

  public static boolean isCompoundDocumentS(InputStream is) {
    return isCompoundDocumentB(getMagic(is, 8));
  }

  public static boolean isCompoundDocumentB(byte[] bytes) {
    return (bytes.length >= 8 && bytes[0] == (byte) 0xD0
        && bytes[1] == (byte) 0xCF && bytes[2] == (byte) 0x11
        && bytes[3] == (byte) 0xE0 && bytes[4] == (byte) 0xA1
        && bytes[5] == (byte) 0xB1 && bytes[6] == (byte) 0x1A 
        && bytes[7] == (byte) 0xE1);
  }

  public static boolean isGzipS(InputStream is) {
    return isGzipB(getMagic(is, 2));
  }

  public static boolean isGzipB(byte[] bytes) {    
      return (bytes != null && bytes.length >= 2 
          && bytes[0] == (byte) 0x1F && bytes[1] == (byte) 0x8B);
  }

  public static boolean isPickleS(InputStream is) {
    return Rdr.isPickleB(getMagic(is, 2));
  }

  public static boolean isPickleB(byte[] bytes) {    
      return (bytes != null && bytes.length >= 2 
          && bytes[0] == (byte) 0x7D && bytes[1] == (byte) 0x71);
  }

  public static boolean isPngZipStream(InputStream is) {
    return isPngZipB(getMagic(is, 55));
  }

  public static boolean isPngZipB(byte[] bytes) {
    // \0PNGJ starting at byte 50
    return (bytes[50] == 0 && bytes[51] == 0x50 && bytes[52] == 0x4E && bytes[53] == 0x47 && bytes[54] == 0x4A);
  }

  public static boolean isZipS(InputStream is) {
    return isZipB(getMagic(is, 4));
  }

  public static boolean isZipB(byte[] bytes) {
    return (bytes.length >= 4 
        && bytes[0] == 0x50  //PK<03><04> 
        && bytes[1] == 0x4B
        && bytes[2] == 0x03 
        && bytes[3] == 0x04);
  }

  private static byte[] getMagic(InputStream is, int n) {
    byte[] abMagic = new byte[n];
    /**
     * @j2sNative
     * 
     * is.resetStream();
     * 
     */
    {
    }
    try {
      is.mark(n + 1);
      is.read(abMagic, 0, n);
    } catch (IOException e) {
    }
    try {
      is.reset();
    } catch (IOException e) {
    }
    return abMagic;
  }


  ////////// stream/byte methods ///////////
  
  public static BufferedInputStream getBIS(byte[] bytes) {
    return new BufferedInputStream(new ByteArrayInputStream(bytes));
  }

  public static BufferedReader getBR(String string) {
    return new BufferedReader(new StringReader(string));
  }

  /**
   * Drill down into a GZIP stack until no more layers.
   * @param jzt 
   * 
   * @param bis
   * @return non-gzipped buffered input stream.
   * 
   * @throws IOException
   */
  public static BufferedInputStream getUnzippedInputStream(GenericZipTools jzt, BufferedInputStream bis) throws IOException {
    while (isGzipS(bis))
      bis = new BufferedInputStream(newGZIPInputStream(jzt, bis));
    return bis;
  }

  /**
   * Allow for base64-encoding check.
   * 
   * @param sb
   * @return byte array
   */
  public static byte[] getBytesFromSB(SB sb) {
    return (isBase64(sb) ? Base64.decodeBase64(sb.substring(8)) : sb.toBytes(0, -1));    
  }

 /**
   * Read a an entire BufferedInputStream for its bytes, and 
   * either return them or leave them in the designated output channel.
   *  
   * @param bis
   * @param out a destination output channel, or null
   * @return byte[] (if out is null) or a message indicating length (if not)
   * 
   * @throws IOException
   */
  public static Object getStreamAsBytes(BufferedInputStream bis,
                                         OC out) throws IOException {
    byte[] buf = new byte[1024];
    byte[] bytes = (out == null ? new byte[4096] : null);
    int len = 0;
    int totalLen = 0;
    while ((len = bis.read(buf, 0, 1024)) > 0) {
      totalLen += len;
      if (out == null) {
        if (totalLen >= bytes.length)
          bytes = AU.ensureLengthByte(bytes, totalLen * 2);
        System.arraycopy(buf, 0, bytes, totalLen - len, len);
      } else {
        out.write(buf, 0, len);
      }
    }
    bis.close();
    if (out == null) {
      return AU.arrayCopyByte(bytes, totalLen);
    }
    return totalLen + " bytes";
  }

  /**
   * Read an input stream fully, saving a byte array, then
   * return a buffered reader to those bytes converted to string form.
   * 
   * @param bis
   * @param charSet
   * @return Reader
   * @throws IOException
   */
  public static BufferedReader getBufferedReader(BufferedInputStream bis, String charSet)
      throws IOException {
    // could also just make sure we have a buffered input stream here.
    if (getUTFEncodingForStream(bis) == Encoding.NONE)
      return new BufferedReader(new InputStreamReader(bis, (charSet == null ? "UTF-8" : charSet)));
    byte[] bytes = getLimitedStreamBytes(bis, -1);
    bis.close();
    return getBR(charSet == null ? fixUTF(bytes) : new String(bytes, charSet));
  }

  /**
   * Read a possibly limited number of bytes (when n > 0) from a stream, 
   * leaving the stream open.
   * 
   * @param is an input stream, not necessarily buffered.
   * @param n the maximum number of bytes to read, or -1 for all
   * @return the bytes read
   * 
   * @throws IOException
   */
  public static byte[] getLimitedStreamBytes(InputStream is, long n)
      throws IOException {

    //Note: You cannot use InputStream.available() to reliably read
    //      zip data from the web. 

    int buflen = (n > 0 && n < 1024 ? (int) n : 1024);
    byte[] buf = new byte[buflen];
    byte[] bytes = new byte[n < 0 ? 4096 : (int) n];
    int len = 0;
    int totalLen = 0;
    if (n < 0)
      n = Integer.MAX_VALUE;
    while (totalLen < n && (len = is.read(buf, 0, buflen)) > 0) {
      totalLen += len;
      if (totalLen > bytes.length)
        bytes = AU.ensureLengthByte(bytes, totalLen * 2);
      System.arraycopy(buf, 0, bytes, totalLen - len, len);
      if (n != Integer.MAX_VALUE && totalLen + buflen > bytes.length)
        buflen = bytes.length - totalLen;

    }
    if (totalLen == bytes.length)
      return bytes;
    buf = new byte[totalLen];
    System.arraycopy(bytes, 0, buf, 0, totalLen);
    return buf;
  }

  /**
   * 
   * Read a UTF-8 stream fully, converting it to a String.
   * Called by Jmol's XMLReaders
   * 
   * @param bis
   * @return a UTF-8 string
   */
  public static String StreamToUTF8String(BufferedInputStream bis) {
    String[] data = new String[1];
    try {
      readAllAsString(getBufferedReader(bis, "UTF-8"), -1, true, data, 0);
    } catch (IOException e) {
    }
    return data[0];
  }

  /**
   * This method fills data[i] with string data from a file that may or may not
   * be binary even though it is being read by a reader. It is meant to be used
   * simple text-based files only.
   *  
   * @param br
   * @param nBytesMax
   * @param allowBinary
   * @param data
   * @param i
   * @return true if data[i] holds the data; false if data[i] holds an error message. 
   */
  public static boolean readAllAsString(BufferedReader br, int nBytesMax, boolean allowBinary, String[] data, int i) {
    try {
      SB sb = SB.newN(8192);
      String line;
      if (nBytesMax < 0) {
        line = br.readLine();
        if (allowBinary || line != null && line.indexOf('\0') < 0
            && (line.length() != 4 || line.charAt(0) != 65533
            || line.indexOf("PNG") != 1)) {
          sb.append(line).appendC('\n');
          while ((line = br.readLine()) != null)
            sb.append(line).appendC('\n');
        }
      } else {
        int n = 0;
        int len;
        while (n < nBytesMax && (line = br.readLine()) != null) {
          if (nBytesMax - n < (len = line.length()) + 1)
            line = line.substring(0, nBytesMax - n - 1);
          sb.append(line).appendC('\n');
          n += len + 1;
        }
      }
      br.close();
      data[i] = sb.toString();
      return true;
    } catch (Exception ioe) {
      data[i] = ioe.toString();
      return false;
    }
  }

  
  /////////// PNGJ support /////////////
  
  
  /**
   * Look at byte 50 for "\0PNGJxxxxxxxxx+yyyyyyyyy" where xxxxxxxxx is a byte
   * offset to the JMOL data and yyyyyyyyy is the length of the data.
   * 
   * @param bis
   * @return same stream or byte stream
   */

  /**
   * Retrieve the two numbers in a PNG iTXt tag indicating the 
   * file pointer for the start of the ZIP data as well as its length.
   * 
   * @param bis
   * @param pt_count
   */
  static void getPngZipPointAndCount(BufferedInputStream bis, int[] pt_count) {
    bis.mark(75);
    try {
      byte[] data = getLimitedStreamBytes(bis, 74);
      bis.reset();
      int pt = 0;
      for (int i = 64, f = 1; --i > 54; f *= 10)
        pt += (data[i] - '0') * f;
      int n = 0;
      for (int i = 74, f = 1; --i > 64; f *= 10)
        n += (data[i] - '0') * f;
      pt_count[0] = pt;
      pt_count[1] = n;
    } catch (Throwable e) {
      pt_count[1] = 0;
    }
  }

  /**
   * Either advance a PNGJ stream to its zip file data or pull out the ZIP data
   * bytes and create a new stream for them from which a ZIP utility can start
   * extracting files.
   * 
   * @param bis
   * @param asNewStream  
   * @return new buffered ByteArrayInputStream, possibly with no data if there is an error
   */
  public static BufferedInputStream getPngZipStream(BufferedInputStream bis, boolean asNewStream) {
    if (!isPngZipStream(bis))
      return bis;
    byte[] data = new byte[0];
    bis.mark(75);
    try {
      int pt_count[] = new int[2];
      getPngZipPointAndCount(bis, pt_count);
      if (pt_count[1] != 0) {
        int pt = pt_count[0];
        while (pt > 0)
          pt -= bis.skip(pt);
        if (!asNewStream)
          return bis;
        data = getLimitedStreamBytes(bis, pt_count[1]);
      }
    } catch (Throwable e) {
    } finally {
      try {
        if (asNewStream)
          bis.close();
      } catch (Exception e) {
        // ignore
      }
    }
    return getBIS(data);
  }

  //////// ZIP methods protected by reflection /////////

  public static void readFileAsMap(GenericZipTools jzt, BufferedInputStream is,
                                   Map<String, Object> bdata, String name) {
    jzt.readFileAsMap(is, bdata, name);
  }

  public static String getZipDirectoryAsStringAndClose(GenericZipTools jzt, BufferedInputStream t) {
    return jzt.getZipDirectoryAsStringAndClose(t);
  }

  public static InputStream newGZIPInputStream(GenericZipTools jzt, BufferedInputStream bis) throws IOException {
    return jzt.newGZIPInputStream(bis);
  }

  public static ZInputStream newZipInputStream(GenericZipTools jzt, InputStream in) {
    return jzt.newZipInputStream(in);
  }

  public static Object getZipFileDirectory(GenericZipTools jzt, BufferedInputStream bis,
                                          String[] subFileList, int listPtr, boolean asBufferedInputStream) {
    return jzt.getZipFileDirectory(jzt, bis, subFileList, listPtr, asBufferedInputStream);
  }

  public static String[] getZipDirectoryAndClose(GenericZipTools jzt, BufferedInputStream t,
                                                 String manifestID) {
    return jzt.getZipDirectoryAndClose(t, manifestID);
  }

  public static void getAllZipData(GenericZipTools jzt, BufferedInputStream bis, String[] subFileList,
                                String replace, String string,
                                Map<String, String> fileData) {
    jzt.getAllZipData(bis, subFileList, replace, string, fileData);
  }

  public static Object getZipFileContentsAsBytes(GenericZipTools jzt, BufferedInputStream bis,
                                                 String[] subFileList, int i) {
    return jzt.getZipFileContentsAsBytes(bis, subFileList, i);
  }

  public static void addZipEntry(GenericZipTools jzt, Object zos, String fileName) throws IOException {
    jzt.addZipEntry(zos, fileName);    
  }

  public static void closeZipEntry(GenericZipTools jzt, Object zos) throws IOException {
    jzt.closeZipEntry(zos);
  }

  public static Object getZipOutputStream(GenericZipTools jzt, Object bos) {
    return jzt.getZipOutputStream(bos);
  }

  public static int getCrcValue(GenericZipTools jzt, byte[] bytes) {
    return jzt.getCrcValue(bytes);
  }

  /** We define a request for zip file extraction by vertical bar:
   *  zipName|interiorFileName. These may be nested if there is a
   *  zip file contained in a zip file. 
   *  
   * @param fileName
   * @return filename trimmed of interior fileName
   * 
   */
  public static String getZipRoot(String fileName) {
    int pt = fileName.indexOf("|");
    return (pt < 0 ? fileName : fileName.substring(0, pt));
  }

  
}

