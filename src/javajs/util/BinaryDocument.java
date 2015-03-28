/* $RCSfile$
 * $Author: egonw $
 * $Date: 2006-03-18 15:59:33 -0600 (Sat, 18 Mar 2006) $
 * $Revision: 4652 $
 *
 * Copyright (C) 2003-2005  Miguel, Jmol Development, www.jmol.org
 *
 * Contact: hansonr@stolaf.edu
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
import java.io.DataInputStream;
import java.util.Map;


import javajs.api.GenericBinaryDocument;
import javajs.api.GenericZipTools;


//import java.io.RandomAccessFile;

/* a basic binary file reader (extended by CompoundDocument). 
 * 
 * random access file info: 
 * http://java.sun.com/docs/books/tutorial/essential/io/rafs.html
 * 
 * SHOOT! random access is only for applications, not applets!
 * 
 * Note that YOU are responsible for determining whether a file
 * is bigEndian or littleEndian; the default is bigEndian.
 * 
 * JavaScript note: readShort() malfunctioned because (short) (xx << 8) 
 * isn't the same as (int) (xx << 8); same problem in java.io.DataStream
 * 
 * 
 */

public class BinaryDocument extends BC implements GenericBinaryDocument {

  /**
   * @j2sIgnore
   */
  public BinaryDocument() {  
  }


  // called by reflection
  
  protected DataInputStream stream;
  protected boolean isRandom = false;
  public boolean isBigEndian = true;
  protected GenericZipTools jzt;

  @Override
  public void close() {
    if (stream != null)
      try {
        stream.close();
      } catch (Exception e) {
        // ignore
      }
    if (out != null)
       out.closeChannel();
  }
  
  @Override
  public void setStream(GenericZipTools jzt, BufferedInputStream bis, boolean isBigEndian) {
    if (jzt != null)
      this.jzt = jzt;
    if (bis != null)
      stream = new DataInputStream(bis);
    this.isBigEndian = isBigEndian;
  }
  
  @Override
  public void setStreamData(DataInputStream stream, boolean isBigEndian) {
    if (stream != null)
      this.stream = stream;
    this.isBigEndian = isBigEndian;
  }
  
  public void setRandom(boolean TF) {
    isRandom = TF;
    //CANNOT be random for web 
  }
  
  @Override
  public byte readByte() throws Exception {
    nBytes++;
    return ioReadByte();
  }

  private byte ioReadByte() throws Exception {
    byte b = stream.readByte();
    if (out != null)
      out.writeByteAsInt(b);
    return b;
  }

  @Override
  public int readByteArray(byte[] b, int off, int len) throws Exception {
    int n = ioRead(b, off, len);
    nBytes += n;
    return n;
  }

  private int ioRead(byte[] b, int off, int len) throws Exception {
    int m = 0;
    while (len > 0) {
      int n = stream.read(b, off, len);
      m += n;
      if (n > 0 && out != null)
        writeBytes(b, off, n);
      if (n >= len)
        break;
      off += n;
      len -= n;
    }
    return m;
  }

  public void writeBytes(byte[] b, int off, int n) throws Exception {
    out.write(b, off, n);
  }

  @Override
  public String readString(int nChar) throws Exception {
    byte[] temp = new byte[nChar];
    int n = readByteArray(temp, 0, nChar);
    return new String(temp, 0, n, "UTF-8");
  }
  
  @Override
  public short readShort() throws Exception {
    nBytes += 2;
    short n = (isBigEndian ? ioReadShort()
        : (short) ((ioReadByte() & 0xff) 
                 | (ioReadByte() & 0xff) << 8));
    /**
     * @j2sNative
     *
     * return (n > 0x7FFF ? n - 0x10000 : n);
     */
    {
      return n;
    }
  }

  private short ioReadShort() throws Exception {
    short b = stream.readShort();
    if (out != null)
      writeShort(b);
    return b;
  }


  public void writeShort(short i) throws Exception {
    out.writeByteAsInt(i >> 8);
    out.writeByteAsInt(i);
  }

  @Override
  public int readIntLE() throws Exception {
    nBytes += 4;
    return readLEInt();
  }
  
  @Override
  public int readInt() throws Exception {
    nBytes += 4;
    return (isBigEndian ? ioReadInt() : readLEInt());
  }
  
  private int ioReadInt() throws Exception {
    int i = stream.readInt();
    if (out != null)
      writeInt(i);
    return i;
  }

  public void writeInt(int i) throws Exception {
    out.writeByteAsInt(i >> 24);
    out.writeByteAsInt(i >> 16);
    out.writeByteAsInt(i >> 8);
    out.writeByteAsInt(i);
  }

  @Override
  public int swapBytesI(int n) {
    return (((n >> 24) & 0xff)
        | ((n >> 16) & 0xff) << 8
        | ((n >> 8) & 0xff) << 16 
        | (n & 0xff) << 24);
  }

  @Override
  public short swapBytesS(short n) {
    return (short) ((((n >> 8) & 0xff)
        | (n & 0xff) << 8));
  }

  
  @Override
  public int readUnsignedShort() throws Exception {
    nBytes += 2;
    int a = (ioReadByte() & 0xff);
    int b = (ioReadByte() & 0xff);
    return (isBigEndian ? (a << 8) + b : (b << 8) + a);
  }
  
  @Override
  public long readLong() throws Exception {
    nBytes += 8;
    return (isBigEndian ? ioReadLong()
       : ((((long) ioReadByte()) & 0xff)
        | (((long) ioReadByte()) & 0xff) << 8
        | (((long) ioReadByte()) & 0xff) << 16
        | (((long) ioReadByte()) & 0xff) << 24
        | (((long) ioReadByte()) & 0xff) << 32
        | (((long) ioReadByte()) & 0xff) << 40
        | (((long) ioReadByte()) & 0xff) << 48 
        | (((long) ioReadByte()) & 0xff) << 54));
  }

  private long ioReadLong() throws Exception {
    long b = stream.readLong();
    if (out != null)
      writeLong(b);
    return b;
  }

  public void writeLong(long b) throws Exception {
    writeInt((int)((b >> 32) & 0xFFFFFFFFl));
    writeInt((int)(b & 0xFFFFFFFFl));
  }

  private int readLEInt() throws Exception {
    ioRead(t8, 0, 4);
    return bytesToInt(t8, 0, false);
  }

  byte[] t8 = new byte[8];
  
  @Override
  public float readFloat() throws Exception {
    return intToFloat(readInt());
  }

  @Override
  public double readDouble() throws Exception {
    /**
     * 
     * reading the float equivalent here in JavaScript
     * 
     * @j2sNative
     * 
     * this.readByteArray(this.t8, 0, 8);
     * return this.bytesToDoubleToFloat(this.t8, 0, this.isBigEndian);
     *  
     */
    {
      nBytes += 8;
      return (isBigEndian ? ioReadDouble() : Double.longBitsToDouble(readLELong()));  
    }
  }
  
  private double ioReadDouble() throws Exception {
    double d = stream.readDouble();
    if (out != null)
      writeLong(Double.doubleToRawLongBits(d));
    return d;
  }

  private long readLELong() throws Exception {
    return ((((long) ioReadByte()) & 0xff)
          | (((long) ioReadByte()) & 0xff) << 8
          | (((long) ioReadByte()) & 0xff) << 16 
          | (((long) ioReadByte()) & 0xff) << 24
          | (((long) ioReadByte()) & 0xff) << 32
          | (((long) ioReadByte()) & 0xff) << 40
          | (((long) ioReadByte()) & 0xff) << 48
          | (((long) ioReadByte()) & 0xff) << 56);
  }

  @Override
  public void seek(long offset) {
    // slower, but all that is available using the applet
    try {
      if (offset == nBytes)
        return;
      if (offset < nBytes) {
        stream.reset();
        if (out != null && nBytes != 0)
          out.reset();
        nBytes = 0;
      } else {
        offset -= nBytes;
      }
      if (out == null) {
        stream.skipBytes((int)offset);
      } else {
        readByteArray(new byte[(int)offset], 0, (int) offset);
      }
      nBytes += offset;
    } catch (Exception e) {
      System.out.println(e.toString());
    }
  }

  long nBytes;
  
  @Override
  public long getPosition() {
    return nBytes;
  }

  OC out;
  @Override
  public void setOutputChannel(OC out) {
      this.out = out;
  }

  @Override
  public SB getAllDataFiles(String binaryFileList, String firstFile) {
    return null;
  }

  @Override
  public void getAllDataMapped(String replace, String string,
                               Map<String, String> fileData) {
  }


/*  random access -- application only:
 * 
    void seekFile(long offset) {
    try {
      file.seek(offset);
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
  }
*/
}
