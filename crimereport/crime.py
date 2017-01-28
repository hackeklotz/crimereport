__author__ = 'aberklotz'


class MediaInformation:
    def __init__(self, id, year, number, title, date, crimes):
        self.id = id
        self.year = year
        self.number = number
        self.title = title
        self.date = date
        self.crimes = crimes


class CrimeOriginal:
    def __init__(self, title, date, place, message):
        self.title = title
        self.date = date
        self.place = place
        self.message = message

    def __str__(self):
        return "Title: " + self.title + "\n" + "Date: " + self.date + "\n" + "Place: " + self.place + "\n"


class CrimeEnriched:
    def __init__(self, crime_original, latitude, longitude):
        self.crime_original = crime_original
        self.latitude = self.latitude
        self.longitude = self.longitude

    def has_geo_position(self):
        return self.latitude is not None and self.longitude is not None