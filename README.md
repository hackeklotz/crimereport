# crimereport-rest-service

Provides crimes via a rest interface.
The rest service is backed up by a SQLite database. The database is created via the crimereport-parser project. 

## First start

To run the rest service use the following command `.gradlew runBoot`.
The rest service should now be running under `localhost:9090/crimes` with a sample database.