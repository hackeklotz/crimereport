package crimereport.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.Result;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;

import crimereport.crimes.Crime;
import crimereport.crimes.CrimeBuilder;
import crimereport.main.CrimeEndpoint;

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

	public List<Crime> getReport(String id) {
		LOGGER.info("Retrieve report with ID " + id);
		try (Connection conn = DriverManager.getConnection(url)) {
			DSLContext create = DSL.using(conn, SQLDialect.SQLITE);
			Result<Record> result = create.select().from("crime")
					.where(String.format("reportId = \"%s\"", id)).fetch();

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

	private Crime buildCrime(Record record) {
		String title = (String) record.get("title");
		String message = (String) record.get("message");

		CrimeBuilder crimeBuilder = new CrimeBuilder(title, message);

		Object longitude = record.get("longitude");
		Object latitude = record.get("latitude");
		if (latitude != null && longitude != null) {
			crimeBuilder.setCoordinate((double) latitude, (double) longitude);
		}
		return crimeBuilder.build();
	}

	public TreeSet<String> getAllReportIds() {
		LOGGER.info("Retrieve all report IDs");
		try (Connection conn = DriverManager.getConnection(url)) {
			DSLContext create = DSL.using(conn, SQLDialect.SQLITE);
			Result<Record> result = create.select().from("crime").fetch();

			TreeSet<String> reportIds = new TreeSet<>();
			for (Record record : result) {
				reportIds.add(record.get("reportId", String.class));
			}
			return reportIds;
		} catch (SQLException e) {
			LOGGER.error("Couldn't retrieve crimes", e);
			return new TreeSet<>();
		}
	}
}
