package jssun.awt.image;

import jsjava.awt.image.DataBuffer;
import jsjava.awt.image.DataBufferByte;
import jsjava.awt.image.DataBufferInt;
import jssun.java2d.StateTrackableDelegate;

public interface DataStealer {
        public byte[] getData(DataBufferByte dbb, int bank);
//        public short[] getData(DataBufferUShort dbus, int bank);
        public int[] getData(DataBufferInt dbi, int bank);
        public StateTrackableDelegate getTrackable(DataBuffer db);
        public void setTrackable(DataBuffer db, StateTrackableDelegate trackable);
    }