package crimereport.crimes;

public class Crime {

  private int id;
  private String title;
  private String message;
  private String region;
  private String place;
  private String time;
  private Geometry point;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getRegion() {
    return region;
  }

  public void setRegion(String region) {
    this.region = region;
  }

  public String getPlace() {
    return place;
  }

  public void setPlace(String place) {
    this.place = place;
  }

  public String getTime() {
    return time;
  }

  public void setTime(String time) {
    this.time = time;
  }

  public Geometry getPoint() {
    return point;
  }

  public void setPoint(Geometry point) {
    this.point = point;
  }

  public Geometry getGeometry() {
    return point;
  }

  public void setGeometry(Geometry point) {
    this.point = point;
  }

}
