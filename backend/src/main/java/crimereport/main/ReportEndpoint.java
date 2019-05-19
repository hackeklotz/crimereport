package crimereport.main;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import crimereport.crimes.Crime;
import crimereport.database.Database;

@RestController
@RequestMapping("/api/reports")
public class ReportEndpoint {

	private Database database;

	@Autowired
	public ReportEndpoint(DatabaseProperties databaseProperties) {
		String url = databaseProperties.getUrl();
		Database database = new Database(url);
		this.database = database;
	}

	@RequestMapping(path = "/", method = RequestMethod.GET)
	public List<String> getAllReportIds() {
		TreeSet<String> reportIds = database.getAllReportIds();
		return new ArrayList<String>(reportIds);
	}
	
	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public List<Crime> getReport(@PathVariable String id) {
		return database.getReport(id);
	}

}