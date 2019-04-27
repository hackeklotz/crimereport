import sqlite3


class DatabasePipeline(object):

    def open_spider(self, spider):
        self.__connection = sqlite3.connect('crimes2019.sq3')
        self.__init_database()

    def __init_database(self):
        cursor = self.__connection.cursor()

        create_query = '''CREATE TABLE IF NOT EXISTS report (id int, year int, number int, title text, date text,
                              PRIMARY KEY (id))'''
        cursor.execute(create_query)

        create_query = '''CREATE TABLE IF NOT EXISTS crime (reportId int, id int, title text, date text, place text,
                              message text, latitude double, longitude double,
                              PRIMARY KEY (reportID, id))'''
        cursor.execute(create_query)

        self.__connection.commit()

    def close_spider(self, spider):
        self.__connection.close()

    def process_item(self, item, spider):

        crimes_to_insert = []

        for i, crime in enumerate(item["crimes"]):
            parameters = (item["id"], i, crime["title"], crime["time"], crime["place"], crime["content"], None, None)
            crimes_to_insert.append(parameters)

        parameters = (item["id"], item["year"], item["number"], None, None)

        cursor = self.__connection.cursor()

        cursor.execute('''
                    INSERT OR REPLACE INTO report ('id', 'year', 'number', 'title', 'date')
                    VALUES (?, ?, ?, ?, ?)''', parameters)

        cursor.executemany('''
                    INSERT OR REPLACE INTO crime ('reportId', 'id', 'title', 'date', 'place', 'message',
                    'latitude', 'longitude')
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)''', crimes_to_insert)

        self.__connection.commit()

        return item
