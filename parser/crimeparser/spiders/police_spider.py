import scrapy

from items import MediaInformationItem


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
        content = response.css("div[id='content']").get()
        parts = content.split("<br>")
        parts = [part.strip() for part in parts]
        parts = list(filter(None, parts))

        id = self.extract_unique_id(response.url)

        yield MediaInformationItem(id=id)

    def extract_unique_id(self, url):
        temp = url.rpartition('.')[0]
        return temp.rpartition('/')[2]
