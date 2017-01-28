__author__ = 'aberklotz'

import sqlite3
import json


class SqliteDatabase:
    def __init__(self, path):
        self.conn = sqlite3.connect(path)

    def init_database(self):
        cursor = self.conn.cursor()

        create_query = '''CREATE TABLE IF NOT EXISTS report (id int, year int, number int, title text, date text,
                          PRIMARY KEY (id))'''
        cursor.execute(create_query)

        create_query = '''CREATE TABLE IF NOT EXISTS crime (reportId int, id int, title text, date text, place text,
                          message text, latitude double, longitude double,
                          PRIMARY KEY (reportID, id))'''
        cursor.execute(create_query)

        self.conn.commit()

    def store_reports(self, reports):

        reports_to_insert = []
        crimes_to_insert = []

        for report in reports:
            for i, crime in enumerate(report.crimes):
                value = (report.id, i,  crime.title, crime.date, crime.place, crime.message,
                         crime.latitude, crime.longitude)
                crimes_to_insert.append(value)

            value = (report.id, report.year, report.number, report.title, report.date)
            reports_to_insert.append(value)

        cursor = self.conn.cursor()

        cursor.executemany('''
            INSERT OR REPLACE INTO report ('id', 'year', 'number', 'title', 'date')
            VALUES (?, ?, ?, ?, ?)''', reports_to_insert)

        cursor.executemany('''
            INSERT OR REPLACE INTO crime ('reportId', 'id', 'title', 'date', 'place', 'message',
            'latitude', 'longitude')
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)''', crimes_to_insert)

        self.conn.commit()
