import scrapy


class ReportItem(scrapy.Item):
    id = scrapy.Field()
    year = scrapy.Field()
    number = scrapy.Field()
    title = scrapy.Field()
    date = scrapy.Field()
    crimes = scrapy.Field()

    def __repr__(self):
        return repr({"id": self["id"], "year": self["year"], "number": self["number"], "title": self["title"]})


class CrimeItem(scrapy.Item):
    title = scrapy.Field()
    time = scrapy.Field()
    place = scrapy.Field()
    content = scrapy.Field()
