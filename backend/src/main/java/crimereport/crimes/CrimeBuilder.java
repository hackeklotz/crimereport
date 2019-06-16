package crimereport.crimes;

public class CrimeBuilder {

	private final int id;
	private final String title;
	private final String message;

	private Double latitude;
	private Double longitude;

	public CrimeBuilder(int id, String title, String message) {
		this.id = id;
		this.title = title;
		this.message = message;
	}

	public CrimeBuilder setCoordinate(double latitude, double longitude) {
		this.latitude = latitude;
		this.longitude = longitude;
		return this;
	}

	public Crime build() {
		Crime crime = new Crime();

		crime.setId(id);
		crime.setTitle(title);
		crime.setMessage(message);

		setGeometry(crime);

		return crime;
	}

	private void setGeometry(Crime crime) {
		if (latitude == null || longitude == null) {
			return;
		}

		Geometry point = new Geometry();
		double[] coordinates = new double[2];
		coordinates[0] = latitude;
		coordinates[1] = longitude;
		point.setCoordinates(coordinates);
		crime.setGeometry(point);
	}
}
