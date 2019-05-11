package crimereport.main;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import crimereport.crimes.Crime;
import crimereport.database.Database;

@Path("/reports")
public class ReportEndpoint {

	private Database database;

	@Autowired
	public ReportEndpoint(DatabaseProperties databaseProperties) {
		String url = databaseProperties.getUrl();
		Database database = new Database(url);
		this.database = database;
	}

	@GET
	@Path("/list")
	@Produces(MediaType.APPLICATION_JSON)
	public List<String> getAllReportIds() {
		TreeSet<String> reportIds = database.getAllReportIds();
		return new ArrayList<String>(reportIds);
	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Crime> getReport(@PathParam("id") String id) {
		return database.getReport(id);
	}

}