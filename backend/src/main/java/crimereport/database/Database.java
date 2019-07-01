package crimereport.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.TreeSet;

import crimereport.crimes.Report;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jooq.*;
import org.jooq.impl.DSL;

import crimereport.crimes.Crime;
import crimereport.crimes.CrimeBuilder;
import crimereport.main.CrimeEndpoint;

import static org.jooq.impl.DSL.field;

public class Database {

    private String url;

    private static Logger LOGGER = LogManager.getLogger(CrimeEndpoint.class);

    public Database(String url) {
        LOGGER.info("Init database with url " + url);
        this.url = url;
        try {
            Class.forName("org.sqlite.JDBC");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Crime> getCrimes() {
        LOGGER.info("Retrieve crimes");
        try (Connection conn = DriverManager.getConnection(url)) {
            DSLContext create = DSL.using(conn, SQLDialect.SQLITE);
            Result<Record> result = create.select().from("crime").fetch();

            List<Crime> crimes = new ArrayList<>();
            for (Record record : result) {
                Crime crime = buildCrime(record);
                crimes.add(crime);
            }
            return crimes;
        } catch (SQLException e) {
            LOGGER.error("Couldn't retrieve crimes", e);
            return new ArrayList<>();
        }
    }

    public Report getReport(String id, Optional<String> region) {
        LOGGER.info("Retrieve report with ID " + id);
        Report report = new Report();
        report.setId(id);
        try (Connection conn = DriverManager.getConnection(url)) {
            addReportInfos(report, conn);
            List<Crime> crimes = getCrimes(id, region, conn);
            report.setCrimes(crimes);
        } catch (SQLException e) {
            LOGGER.error("Couldn't retrieve crimes", e);
        }
        return report;
    }

    private void addReportInfos(Report report, Connection conn) {
        Condition condition = DSL.condition(String.format("id = \"%s\"", report.getId()));

        DSLContext create = DSL.using(conn, SQLDialect.SQLITE);
        Record record = create
                .select()
                .from("report")
                .where(condition)
                .fetchOne();

        int year = (int) record.get("year");
        int number = (int) record.get("number");

        report.setYear(year);
        report.setNumber(number);
    }

    private List<Crime> getCrimes(String id, Optional<String> region, Connection conn) {
        Condition condition = DSL.condition(String.format("reportId = \"%s\"", id));
        condition = buildCondition(condition, region);

        DSLContext create = DSL.using(conn, SQLDialect.SQLITE);
        Result<Record> result = create
                .select()
                .from("crime")
                .where(condition)
                .fetch();

        List<Crime> crimes = new ArrayList<>();
        for (Record record : result) {
            Crime crime = buildCrime(record);
            crimes.add(crime);
        }
        return crimes;
    }

    private Crime buildCrime(Record record) {
        int id = (int) record.get("id");
        String title = (String) record.get("title");
        String message = (String) record.get("message");

        CrimeBuilder crimeBuilder = new CrimeBuilder(id, title, message);

        Object longitude = record.get("longitude");
        Object latitude = record.get("latitude");
        if (latitude != null && longitude != null) {
            crimeBuilder.setCoordinate((double) latitude, (double) longitude);
        }
        return crimeBuilder.build();
    }

    public List<String> getAllReportIds(Optional<String> region) {
        LOGGER.info("Retrieve all report IDs");
        try (Connection conn = DriverManager.getConnection(url)) {
            Condition condition = DSL.trueCondition();
            condition = buildCondition(condition, region);

            DSLContext create = DSL.using(conn, SQLDialect.SQLITE);
            Result<Record> result = create
                    .select()
                    .from("crime")
                    .join("report")
                    .on(field("crime.reportId").eq(field("report.Id")))
                    .where(condition)
                    .groupBy(field("crime.reportId"))
                    .orderBy(field("year"), field("number"))
                    .fetch();

            List<String> reportIds = new ArrayList<>();
            for (Record record : result) {
                reportIds.add(record.get("reportId", String.class));
            }
            return reportIds;
        } catch (SQLException e) {
            LOGGER.error("Couldn't retrieve crimes", e);
            return new ArrayList<>();
        }
    }

    private Condition buildCondition(Condition condition, Optional<String> region) {
        if (region.isPresent()) {
            condition = condition.and(String.format("region = \"%s\"", region.get()));
        }
        return condition;
    }
}
