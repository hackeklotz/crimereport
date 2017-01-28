__author__ = 'aberklotz'

import time
from geopy import Nominatim
import logging

logger = logging.getLogger()

def enrich_crimes(reports):
    for i_report, report in enumerate(reports):
        logger.info('Enrich report ' + str(i_report) + '/' + str(len(reports)))
        for i, crime in enumerate(report.crimes):
            logger.info('  Enrich crime ' + str(i) + '/' + str(len(report.crimes)))
            enrich_crime(crime)

            # Nominatim Usage policy: maximum of 1 request per second
            # https://wiki.openstreetmap.org/wiki/Nominatim_usage_policy
            time.sleep(1)


def enrich_crime(crime):
    crime.latitude, crime.longitude = geocode_address(crime.place)


def geocode_address(place):
    if place is None:
        return None, None

    geolocator = Nominatim(timeout=5)
    location = geolocator.geocode(place)
    if location is not None:
        return location.latitude, location.longitude
    else:
        return None, None

