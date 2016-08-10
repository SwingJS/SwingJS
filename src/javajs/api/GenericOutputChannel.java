package javajs.api;

public interface GenericOutputChannel {

  void writeByteAsInt(int b);

  void write(byte[] b, int off, int n);

  void reset();

  String closeChannel();

	boolean isBigEndian();

}
