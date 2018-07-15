# Crime Report

This project consists of three sub projects.
1. Parser

   A web scraper to extract crimes from the Saxon State Police website.
   The extracted crimes are extended by geographical coordinates an saved into a SQLite database.
2. Rest Service

   Provides the crimes via a rest interface.
   The rest service is backed up by a SQLite database, created by the parser.
3. Frontend

   Provides a visualisation for the crimes, that are consumed via the rest service interface.

   
## First start

Run both the rest service and the frontend by using the command `.gradlew runBoot` in each subdirectory.
The website is now reachable under the URL `localhost:8080`.
The rest service will be providing the crimes under `localhost:9090/crimes` from a sample database.
