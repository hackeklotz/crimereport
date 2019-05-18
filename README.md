# Crime Report

This project consists of three sub projects.
1. Parser

   A web scraper to extract crimes from the Saxon State Police website.
   The extracted crimes are extended by geographical coordinates and saved into a SQLite database.
2. Backend

   Provides the crimes via a rest interface.
   The rest service is backed up by the SQLite database, created by the parser.
3. Frontend

   Provides a visualisation for the crimes, that are retrieved via the rest interface.

   
## First start

### Development
1. Parser

   * Prerequisite: Installed Python and Pipenv
   * Change to the parser directory.
   * Install all needed dependencies with `pipenv install`.
   * Run `pipenv run python main.py`. This should create a database in the root directory.
2. Backend

   * Run `.gradlew backend:runBoot` in the root directory.
   * The rest service should now start successfully.
3. Frontend

   * Run `.gradlew frontend:npm_run_start` in the root directory.
   * The website should now be available under `localhost:8080` and open automatically in the browser.

### Production
Build the project with `.gradlew build`. A single executable Jar should now be created within `backend/build/libs`.