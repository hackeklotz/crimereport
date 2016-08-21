__author__ = 'aberklotz'

from geopy import Nominatim


def enrich_crimes(crimes):
    for crime in crimes:
        enrich_crime(crime)


def enrich_crime(crime):
    crime.latitude, crime.longitude = geocode_address(crime.place)
    #crime.time = retrieve_time(crime.date)
    #crime.type = retrieve_crime_type(crime.title.crime.message)


def geocode_address(place):
    geolocator = Nominatim(timeout=5)
    location = geolocator.geocode(place)
    if location is not None:
        return location.latitude, location.longitude
    else:
        return None, None


def retrieve_time(time):
    return None


def retrieve_crime_type(title, message):
    return None
