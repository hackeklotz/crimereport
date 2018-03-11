package crimereport.crimes;

import java.util.Map;

public class Crime {

	private String type = "Feature";
	private Geometry point;
	private Map<String, String> properties;

	public String getType() {
		return type;
	}

	public Geometry getGeometry() {
		return point;
	}

	public void setGeometry(Geometry point) {
		this.point = point;
	}

	public Map<String, String> getProperties() {
		return properties;
	}

	public void setProperties(Map<String, String> properties) {
		this.properties = properties;
	}

}
