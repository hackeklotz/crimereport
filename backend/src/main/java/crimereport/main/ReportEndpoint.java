package crimereport.main;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.TreeSet;

import crimereport.crimes.Report;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
        this.database = new Database(url);
    }

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public List<String> getAllReportIds(
            @RequestParam(value = "region", required = false) String region) {
        return database.getAllReportIds(Optional.ofNullable(region));
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public Report getReport(@PathVariable String id,
                            @RequestParam(value = "region", required = false) String region) {
        return database.getReport(id, Optional.ofNullable(region));
    }

}
