from unittest import TestCase

from scrapy.http import Response, Request, HtmlResponse, TextResponse

from conftest import RESOURCE_DIR
from spiders.police_spider import PoliceSpider


class TestPoliceSpider(TestCase):
    def test_parse_id(self):
        response = self.fake_response("sample.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63764.htm")

        spider = PoliceSpider()
        media_information = next(spider.parse_media_information(response))

        self.assertEquals("MI_2019_63764", media_information["id"])

    def fake_response(self, file_name, url):
        request = Request(url=url)
        file_path = RESOURCE_DIR.joinpath(file_name)
        file_content = open(file_path, 'r').read()

        return HtmlResponse(url=url,
                            request=request,
                            body=file_content,
                            encoding="UTF-8")
