package crimereport.main;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import crimereport.crimes.Crime;
import crimereport.database.Database;

@RestController
public class CrimeEndpoint {

	private Database database;

	@Autowired
	public CrimeEndpoint(DatabaseProperties databaseProperties) {
		String url = databaseProperties.getUrl();
		Database database = new Database(url);
		this.database = database;
	}

	@RequestMapping(path = "/crimes", method = RequestMethod.GET)
	public List<Crime> getCrimes() {
		return database.getCrimes();
	}

}