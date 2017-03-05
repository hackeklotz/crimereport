package crimereport.crimes;

import java.util.HashMap;
import java.util.Map;

public class CrimeBuilder {

	public final String title;
	public final String message;

	public Double latitude;
	public Double longitude;

	public CrimeBuilder(String title, String message) {
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

		setGeometry(crime);

		Map<String, String> properties = new HashMap<>();
		properties.put("name", title);
		properties.put("popupContent", message);
		crime.setProperties(properties);

		return crime;
	}

	private void setGeometry(Crime crime) {
		if (latitude == null || longitude == null) {
			return;
		}

		Geometry point = new Geometry();
		double[] coordinates = new double[2];
		coordinates[0] = longitude;
		coordinates[1] = latitude;
		point.setCoordinates(coordinates);
		crime.setGeometry(point);
	}
}
