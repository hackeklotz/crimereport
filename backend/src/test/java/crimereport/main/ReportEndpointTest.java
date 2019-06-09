package crimereport.main;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

import java.util.List;

class ReportEndpointTest {

    @Test
    void getAllReportIds() {
        String path = getClass().getClassLoader().getResource("test.sq3").getPath();
        String url = "jdbc:sqlite:" + path;
        DatabaseProperties databaseProperties = new DatabaseProperties();
        databaseProperties.setUrl(url);
        ReportEndpoint reportEndpoint = new ReportEndpoint(databaseProperties);

        List<String> allReportIds = reportEndpoint.getAllReportIds();

        assertThat(allReportIds).containsExactly("MI_2019_123","MI_2019_456","MI_2019_789");
    }

}