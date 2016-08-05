package javajs.api;

import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.util.Map;


import javajs.util.OC;
import javajs.util.SB;

public interface GenericBinaryDocument {

  void setStream(GenericZipTools jzt, BufferedInputStream bis, boolean isBigEndian);

  void setStreamData(DataInputStream dataInputStream, boolean isBigEndian);

  long getPosition();

  SB getAllDataFiles(String binaryFileList, String firstFile);

  void getAllDataMapped(String replace, String string, Map<String, String> fileData);

  int swapBytesI(int nx);

  short swapBytesS(short s);

  void seek(long i);

  byte readByte() throws Exception;

  int readInt() throws Exception;

  int readIntLE() throws Exception;

  long readLong() throws Exception;

  float readFloat() throws Exception;

  double readDouble() throws Exception;

  short readShort() throws Exception;

  int readUnsignedShort() throws Exception;

  String readString(int i) throws Exception;

  int readByteArray(byte[] b, int off, int len) throws Exception;

  void close();

  void setOutputChannel(OC out);

}
