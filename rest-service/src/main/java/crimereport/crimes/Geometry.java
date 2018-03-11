package crimereport.crimes;

public class Geometry {
	private String type = "Point";
	private double[] coordinates;

	public String getType() {
		return type;
	}

	public double[] getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(double[] coordinates) {
		this.coordinates = coordinates;		
	}

}
