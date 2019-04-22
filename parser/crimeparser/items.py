import scrapy


class MediaInformationItem(scrapy.Item):
    id = scrapy.Field()
    year = scrapy.Field()
    number = scrapy.Field()
    title = scrapy.Field()
    date = scrapy.Field()
    crimes = scrapy.Field()
