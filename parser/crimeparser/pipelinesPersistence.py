import sqlite3

from scrapy.exceptions import DropItem


class SkipReportPipeline(object):
    @classmethod
    def from_crawler(cls, crawler):
        database_path = crawler.settings.get("DATABASE_PATH")
        reprocess_reports = crawler.settings.getbool("REPROCESS_REPORTS")
        return cls(database_path, reprocess_reports)

    def __init__(self, database_path, reprocess_reports):
        self.__reprocess_reports = reprocess_reports
        self.__connection = sqlite3.connect(database_path)

    def process_item(self, item, spider):
        if self.__reprocess_reports:
            return item

        cursor = self.__connection.cursor()

        for _row in cursor.execute(f"SELECT id FROM report WHERE id='{item['id']}'"):
            raise DropItem("Already processed.")

        return item


class DatabasePipeline(object):

    @classmethod
    def from_crawler(cls, crawler):
        database_path = crawler.settings.get("DATABASE_PATH")
        return cls(database_path)

    def __init__(self, database_path):
        self.__connection = sqlite3.connect(database_path)

    def open_spider(self, spider):
        self.__init_database()

    def __init_database(self):
        cursor = self.__connection.cursor()

        create_query = '''CREATE TABLE IF NOT EXISTS report (id text, year int, number int, title text, date text,
                              PRIMARY KEY (id))'''
        cursor.execute(create_query)

        create_query = '''CREATE TABLE IF NOT EXISTS crime (reportId text, id int, title text, date text, region text,
                              place text, message text, latitude double, longitude double,
                              PRIMARY KEY (reportID, id))'''
        cursor.execute(create_query)

        self.__connection.commit()

    def close_spider(self, spider):
        self.__connection.close()

    def process_item(self, item, spider):

        crimes_to_insert = []

        for i, crime in enumerate(item["crimes"]):
            parameters = (item["id"], i, crime["title"], crime["time"], crime["region"], crime["place"],
                          crime["content"], crime["latitude"], crime["longitude"])
            crimes_to_insert.append(parameters)

        parameters = (item["id"], item["year"], item["number"], None, None)

        cursor = self.__connection.cursor()

        cursor.execute('''
                    INSERT OR REPLACE INTO report ('id', 'year', 'number', 'title', 'date')
                    VALUES (?, ?, ?, ?, ?)''', parameters)

        cursor.executemany('''
                    INSERT OR REPLACE INTO crime ('reportId', 'id', 'title', 'date', 'region', 'place', 'message',
                    'latitude', 'longitude')
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''', crimes_to_insert)

        self.__connection.commit()

        return item
