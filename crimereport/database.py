__author__ = 'aberklotz'

import sqlite3
import json
from parser import Crime


class SqliteDatabase:
    def __init__(self):
        self.conn = sqlite3.connect('../examples/crimes.sq3')

    def init_database(self):
        cursor = self.conn.cursor()

        create_query = '''CREATE TABLE IF NOT EXISTS crimes (id int, title text, date text, place text, message text,
                          PRIMARY KEY (id))'''
        cursor.execute(create_query)

        create_query = '''CREATE TABLE IF NOT EXISTS crimesLocalisation (id int, latitude int, longitude int,
                          PRIMARY KEY (id))'''
        cursor.execute(create_query)

        self.conn.commit()

    def store_crimes(self, crimes):
        crimes_dict = [x.__dict__ for x in crimes]

        values_to_insert = []
        values_to_insert2 = []
        for i, crime in enumerate(crimes):
            value = (i, crime.title, crime.date, crime.place, crime.message)
            values_to_insert.append(value)
            value = (i, crime.latitude, crime.longitude)
            values_to_insert2.append(value)

        cursor = self.conn.cursor()
        cursor.executemany('''
            INSERT OR REPLACE INTO crimes ('id', 'title', 'date', 'place', 'message')
            VALUES (?, ?, ?, ?, ?)''', values_to_insert)

        cursor.executemany('''
            INSERT OR REPLACE INTO crimesLocalisation ('id', 'latitude', 'longitude')
            VALUES (?, ?, ?)''', values_to_insert2)

        self.conn.commit()

    def load_crimes(self):
        c = self.conn.cursor()
        c.execute('SELECT title, date, place, message, latitude, longitude '
                  'FROM crimes, crimesLocalisation ON crimes.id == crimesLocalisation.id')
        rows = c.fetchall()

        crimes = []
        for row in rows:
            crime = Crime(row[0], row[1], row[2], row[3], row[4], row[5])
            crimes.append(crime)
        return crimes


class SillyFileSaver:
    def store_crimes(self, crimes):
        crimes_dict = [x.__dict__ for x in crimes]
        with open('../examples/crimes.txt', 'w') as outfile:
            json.dump(crimes_dict, outfile)

    def load_crimes(self):
        with open('../examples/crimes.txt', 'r') as outfile:
            crimes_dict = json.load(outfile)

        crimes = []
        for crime_dict in crimes_dict:
            crime = Crime(crime_dict['title'], crime_dict['date'], crime_dict['place'], crime_dict['message'], None,
                          None)
            crimes.append(crime)
        return crimes


def database_test():
    file_saver = SillyFileSaver()
    crimes = file_saver.load_crimes()
    import enricher
    enricher.enrich_crimes(crimes)

    database = SqliteDatabase()
    database.init_database()
    database.store_crimes(crimes)
    crimes2 = database.load_crimes()
    print(crimes2)


if __name__ == "__main__":
    database_test()
