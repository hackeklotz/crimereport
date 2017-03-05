package crimereport.main;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import crimereport.crimes.Crime;
import crimereport.database.Database;

@Path("/crimes")
public class CrimeEndpoint {

	private Database database;

	@Autowired
	public CrimeEndpoint(DatabaseProperties databaseProperties) {
		String url = databaseProperties.getUrl();
		Database database = new Database(url);
		this.database = database;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Crime> getCrimes() {
		return database.getCrimes();
	}

}