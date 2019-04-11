import scrapy


class PoliceSpider(scrapy.Spider):
    name = "police"

    start_urls = [
        'https://www.polizei.sachsen.de/de/medieninformationen_pdd.htm'
    ]

    def parse(self, response):
        links = response.css("div[id='presse'] a::attr(href)")
        for href in links:
            yield response.follow(href, self.parse_day)

    def parse_day(self, response):
        pass
