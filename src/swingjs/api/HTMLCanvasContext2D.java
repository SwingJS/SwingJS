package swingjs.api;

public interface HTMLCanvasContext2D {

	void beginPath();

	void moveTo(double x0, double y0);

	void lineTo(double x1, double y1);

	void stroke();

	void save();

	void scale(double f, double g);

	void arc(double x, double y, double width, double startAngle, double  endAngle, boolean fill);

	void closePath();

	void restore();

	void translate(double x, double y);

	void fill();

	void rect(double x, double y, double width, double height);

	void fillText(String s, double x, double y);

	void _setLineWidth(double d);

	void _setFont(String s);

	void _setFillStyle(String s);

	void _setStrokeStyle(String s);

	void fillRect(double x, double y, double width, double height);

	void clearRect(int i, int j, int windowWidth, int windowHeight);

}
