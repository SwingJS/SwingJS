package swingjs;

import java.io.IOException;

import javax.imageio.metadata.IIOMetadata;

import jsjavax.imageio.IIOImage;
import jsjavax.imageio.ImageTypeSpecifier;
import jsjavax.imageio.ImageWriteParam;
import jsjavax.imageio.ImageWriter;

public class JSImageWriter extends ImageWriter {

//	@Override
//	public void write(IIOMetadata streamMetadata, IIOImage image, ImageWriteParam param)
//			throws IOException {
//		JSToolkit.notImplemented(null);
//		// TODO Auto-generated method stub		
//	}

	@Override
	public IIOMetadata getDefaultStreamMetadata(ImageWriteParam param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IIOMetadata getDefaultImageMetadata(ImageTypeSpecifier imageType,
			ImageWriteParam param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IIOMetadata convertStreamMetadata(IIOMetadata inData,
			ImageWriteParam param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IIOMetadata convertImageMetadata(IIOMetadata inData,
			ImageTypeSpecifier imageType, ImageWriteParam param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void write(Object streamMetadata, IIOImage image, ImageWriteParam param)
			throws IOException {
		// TODO Auto-generated method stub
		
	}

}
