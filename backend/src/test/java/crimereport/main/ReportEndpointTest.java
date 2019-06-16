package crimereport.main;

import static org.assertj.core.api.Assertions.assertThat;

import crimereport.crimes.Crime;
import org.junit.jupiter.api.Test;

import java.util.List;

class ReportEndpointTest {

    @Test
    void getAllReportIds() {
        ReportEndpoint reportEndpoint = createReportEndpoint();

        List<String> allReportIds = reportEndpoint.getAllReportIds(null);

        assertThat(allReportIds).containsExactly("MI_2019_123", "MI_2019_456", "MI_2019_789");
    }

    @Test
    void getAllReportIds_FilterRegion_Match() {
        ReportEndpoint reportEndpoint = createReportEndpoint();

        List<String> allReportIds = reportEndpoint.getAllReportIds("Landeshauptstadt Dresden");

        assertThat(allReportIds).containsExactly("MI_2019_123", "MI_2019_456", "MI_2019_789");
    }

    @Test
    void getAllReportIds_FilterRegion_NoMatch() {
        ReportEndpoint reportEndpoint = createReportEndpoint();

        List<String> allReportIds = reportEndpoint.getAllReportIds("Dräsd´n");

        assertThat(allReportIds).isEmpty();
    }

    @Test
    void getReport_Id() {
        ReportEndpoint reportEndpoint = createReportEndpoint();

        List<Crime> crimes = reportEndpoint.getReport("MI_2019_123", null);

        assertThat(crimes).hasSize(2);
        assertThat(crimes.get(0).getId()).isEqualTo(0);
        assertThat(crimes.get(1).getId()).isEqualTo(1);
    }

    @Test
    void getReport_Title() {
        ReportEndpoint reportEndpoint = createReportEndpoint();

        List<Crime> crimes = reportEndpoint.getReport("MI_2019_123", null);

        assertThat(crimes).hasSize(2);
        assertThat(crimes.get(0).getTitle()).isEqualTo("Katze weg");
    }

    @Test
    void getReport_FilterRegion_Match() {
        ReportEndpoint reportEndpoint = createReportEndpoint();

        List<Crime> crimes = reportEndpoint.getReport("MI_2019_123", "Landeshauptstadt Dresden");

        assertThat(crimes).hasSize(2);
    }

    @Test
    void getReport_FilterRegion_NoMatch() {
        ReportEndpoint reportEndpoint = createReportEndpoint();

        List<Crime> crimes = reportEndpoint.getReport("MI_2019_123", "Dräsd´n");

        assertThat(crimes).isEmpty();
    }

    private ReportEndpoint createReportEndpoint() {
        String path = getClass().getClassLoader().getResource("test.sq3").getPath();
        String url = "jdbc:sqlite:" + path;
        DatabaseProperties databaseProperties = new DatabaseProperties();
        databaseProperties.setUrl(url);
        return new ReportEndpoint(databaseProperties);
    }
}