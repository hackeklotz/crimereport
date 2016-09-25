__author__ = 'aberklotz'

import html
import ssl
import re

from requests.adapters import HTTPAdapter
from requests.packages.urllib3.poolmanager import PoolManager
import requests

from geopy.geocoders import Nominatim


class MyAdapter(HTTPAdapter):
    def init_poolmanager(self, connections, maxsize, block=False):
        self.poolmanager = PoolManager(num_pools=connections,
                                       maxsize=maxsize,
                                       block=block,
                                       ssl_version=ssl.PROTOCOL_TLSv1)


class Parser:
    def retrieve(self, link):
        session = requests.Session()
        session.mount('https://', MyAdapter())

        page = session.get(link)
        return page.text

    def parse(self, text):
        crimes = []

        for match in re.finditer('<P><B>(.*?)</B></P>\n<P>(.*?)<BR>(.*?)</P>\n<P>(.*?)</P>', text):
            title = self.__cleantext(match.group(1))
            date = self.__cleantext(match.group(2)[len("Zeit:"):])
            place = self.__cleantext(match.group(3)[len("Ort:"):])
            message = self.__cleantext(match.group(4))
            crime = Crime(title, date, place, message, None, None)
            crimes.append(crime)

        return crimes

    def __cleantext(self, text):
        clean_text = text.replace("&nbsp;", "")
        clean_text = clean_text.strip()
        return html.unescape(clean_text)


class Crime:
    def __init__(self, title, date, place, message, latitude, longitude):
        self.title = title
        self.date = date
        self.place = place
        self.message = message
        self.latitude = latitude
        self.longitude = longitude

    def has_geo_position(self):
        return self.latitude is not None and self.longitude is not None

    def __str__(self):
        return "Title: " + self.title + "\n" + "Date: " + self.date + "\n" + "Place: " + self.place + "\n"


if __name__ == "__main__":
    text_file = open("../examples/Output.txt", "r")
    text = text_file.read()
    text_file.close()

    parser = Parser()
    # text = parser.retrieve('https://www.polizei.sachsen.de/de/MI_2015_37021.htm')
    crimes = parser.parse(text)

    import database

    database2 = database.SillyFileSaver()
    database2.store_crimes(crimes)
    print(database2.load_crimes())
