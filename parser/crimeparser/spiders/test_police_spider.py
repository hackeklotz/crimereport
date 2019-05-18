from unittest import TestCase

from scrapy.http import Request, HtmlResponse

from conftest import RESOURCE_DIR
from crimeparser.spiders.police_spider import PoliceSpider


class TestPoliceSpider(TestCase):
    def test_parse_id(self):
        response = self.fake_response("sample.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63764.htm")

        spider = PoliceSpider()
        report = next(spider.parse_report(response))

        self.assertEqual("MI_2019_63764", report["id"])

    def test_parse_number(self):
        response = self.fake_response("sample.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63764.htm")

        spider = PoliceSpider()
        report = next(spider.parse_report(response))

        self.assertEqual(206, report["number"])

    def test_parse_year(self):
        response = self.fake_response("sample.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63764.htm")

        spider = PoliceSpider()
        report = next(spider.parse_report(response))

        self.assertEqual(2019, report["year"])

    def test_parse_crimes_length(self):
        response = self.fake_response("sample.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63764.htm")

        spider = PoliceSpider()
        report = next(spider.parse_report(response))

        crimes = report["crimes"]
        self.assertEqual(10, len(crimes))

    def test_parse_crimes_title(self):
        response = self.fake_response("sample.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63764.htm")

        spider = PoliceSpider()
        report = next(spider.parse_report(response))

        crime = report["crimes"][0]
        self.assertEqual("Wohnungseinbruch", crime["title"])

    def test_parse_crimes_title2(self):
        response = self.fake_response("sample2.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63837.htm")

        spider = PoliceSpider()
        report = next(spider.parse_report(response))

        crime = report["crimes"][1]
        self.assertEqual("Infostand beschädigt – Mann leicht verletzt", crime["title"])
        crime = report["crimes"][7]
        self.assertEqual("Verkehrsunfall", crime["title"])

    def test_parse_crimes_time(self):
        response = self.fake_response("sample.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63764.htm")

        spider = PoliceSpider()
        report = next(spider.parse_report(response))

        crime = report["crimes"][0]
        self.assertEqual("05.04.2019, 08.00 Uhr bis 12.30 Uhr", crime["time"])

    def test_parse_crimes_place(self):
        response = self.fake_response("sample.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63764.htm")

        spider = PoliceSpider()
        report = next(spider.parse_report(response))

        crime = report["crimes"][0]
        self.assertEqual("Dresden-Strehlen, Otto-Dix-Ring", crime["place"])

    def test_parse_crimes_content(self):
        response = self.fake_response("sample.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63764.htm")

        spider = PoliceSpider()
        report = next(spider.parse_report(response))

        crime = report["crimes"][0]
        content = crime["content"]
        self.assertTrue(content.startswith("Unbekannte"))
        self.assertTrue(content.endswith("beziffert."))

    def test_parse_crimes_content_include_appeal_for_witnesses(self):
        response = self.fake_response("sample2.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63837.htm")

        spider = PoliceSpider()
        report = next(spider.parse_report(response))

        crime = report["crimes"][0]
        content = crime["content"]
        self.assertTrue(content.startswith("Gestern Nachmittag"))
        self.assertTrue(content.endswith("entgegen. (ml)"))

    def test_parse_crimes_content_exclude_appendix(self):
        response = self.fake_response("sample2.html",
                                      "https://www.polizei.sachsen.de/de/MI_2019_63837.htm")

        spider = PoliceSpider()
        report = next(spider.parse_report(response))

        crime = report["crimes"][7]
        content = crime["content"]
        self.assertTrue(content.startswith("Am Dienstagnachmittag kam"))
        self.assertTrue(content.endswith("von rund 7.100 Euro. (lr)"))

    def fake_response(self, file_name, url):
        request = Request(url=url)
        file_path = RESOURCE_DIR.joinpath(file_name)
        file_content = open(file_path, 'r').read()

        return HtmlResponse(url=url,
                            request=request,
                            body=file_content,
                            encoding="UTF-8")
