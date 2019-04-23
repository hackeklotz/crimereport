import re
import scrapy
from enum import Enum

from items import MediaInformationItem, CrimeItem


class PoliceSpider(scrapy.Spider):
    name = "police"

    start_urls = [
        "https://www.polizei.sachsen.de/de/medieninformationen_pdd.htm"
    ]

    def parse(self, response):
        links = response.css("div[id='presse'] a::attr(href)")
        for href in links:
            yield response.follow(href, self.parse_media_information)

    def parse_media_information(self, response):
        media_id = self.extract_unique_id(response.url)

        content = response.css("div[id='content']").get()
        parts = content.split("<br>")
        parts = [part.strip() for part in parts]
        parts = list(filter(None, parts))

        crime_parser = CrimeParser(parts)
        number, year = crime_parser.extract_number_and_year()
        crimes = crime_parser.extract_crimes()

        yield MediaInformationItem(id=media_id, number=number, year=year, crimes=crimes)

    def extract_unique_id(self, url):
        temp = url.rpartition('.')[0]
        return temp.rpartition('/')[2]


class CrimeParser:

    def __init__(self, parts):
        self.__parts = parts

    def extract_number_and_year(self):
        for part in self.__parts:
            match = re.search("Medieninformation:(.*)/(.*)", part)
            if match:
                number = int(match.group(1).strip())
                year = int(match.group(2).strip())
                return number, year

        return None, None

    def extract_crimes(self):
        crimes = []

        state = ParserState.NONE
        title = []
        content = []

        for part in self.__parts:
            if "<strong>" in part:
                state = ParserState.TITLE
                self.__assemble_and_append_crime(content, crimes, title)

            text = self.__remove_tags(part)
            if state == ParserState.TITLE and not self.__isLandkreis(text):
                title.append(text)
            elif state == ParserState.CONTENT:
                content.append(text)

            if "</strong>" in part:
                state = ParserState.CONTENT

        self.__assemble_and_append_crime(content, crimes, title)

        return crimes

    def __assemble_and_append_crime(self, content, crimes, title):
        if title and content:
            crimes.append(CrimeItem(title=title[0]))
            title.clear()
            content.clear()

    def __remove_tags(self, html_text):
        return re.sub("<.*?>", "", html_text)

    def __isLandkreis(self, text):
        return (text == "Landeshauptstadt Dresden"
                or text == "Landkreis Meißen"
                or text == "Landkreis Sächsische Schweiz-Osterzgebirge")


class ParserState(Enum):
    NONE = 0
    TITLE = 1
    CONTENT = 2
