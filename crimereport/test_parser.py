from unittest import TestCase
from parser import Parser
import json
import os


class TestParser(TestCase):
    def test_parse_reports_filteroutnondresdenpolicedistrict(self):
        path = os.path.join(os.path.dirname(__file__), '../resources/crimePages.json')
        with open(path) as data_file:
            pages = json.load(data_file)

        parser2 = Parser()
        reports = parser2.parse_reports(pages)

        self.assertEqual(len(reports), 1)

    def test_parse_reports_multiplereports(self):
        path = os.path.join(os.path.dirname(__file__), '../resources/crimePages2.json')
        with open(path) as data_file:
            pages = json.load(data_file)

        parser2 = Parser()
        reports = parser2.parse_reports(pages)

        self.assertEqual(len(reports), 4)

    def test_parse_reports_getcrimes1(self):
        path = os.path.join(os.path.dirname(__file__), '../resources/raub.json')
        with open(path) as data_file:
            pages = json.load(data_file)

        parser2 = Parser()
        reports = parser2.parse_reports(pages)

        self.assertEqual(len(reports), 1)
        self.assertEqual(len(reports[0].crimes), 14)

    def test_parse_reports_getcrimes2(self):
        path = os.path.join(os.path.dirname(__file__), '../resources/bullenkopf.json')
        with open(path) as data_file:
            pages = json.load(data_file)

        parser2 = Parser()
        reports = parser2.parse_reports(pages)

        self.assertEqual(len(reports), 1)
        self.assertEqual(len(reports[0].crimes), 2)

    def test_parse_reports_getcrimes3(self):
        path = os.path.join(os.path.dirname(__file__), '../resources/injektionsnadeln.json')
        with open(path) as data_file:
            pages = json.load(data_file)

        parser2 = Parser()
        reports = parser2.parse_reports(pages)

        self.assertEqual(len(reports), 1)
        self.assertEqual(len(reports[0].crimes), 11)

    def test_parse_reports_getcrimes4(self):
        path = os.path.join(os.path.dirname(__file__), '../resources/fliegerbombe.json')
        with open(path) as data_file:
            pages = json.load(data_file)

        parser2 = Parser()
        reports = parser2.parse_reports(pages)

        self.assertEqual(len(reports), 1)
        self.assertEqual(len(reports[0].crimes), 1)

    def test_parse_reports_getcrimedetails(self):
        path = os.path.join(os.path.dirname(__file__), '../resources/bullenkopf.json')
        with open(path) as data_file:
            pages = json.load(data_file)

        parser2 = Parser()
        reports = parser2.parse_reports(pages)

        crime1 = reports[0].crimes[0]
        self.assertEqual(crime1.title, 'Polizeiliche Ermittlungen zu „Bullenkopf“ abgeschlossen')
        self.assertFalse(crime1.date)
        self.assertFalse(crime1.place)
        self.assertTrue(crime1.message.startswith('Die Polizeidirektion Dresden hat ihre Ermittlungen zum sogenannten'))

        crime2 = reports[0].crimes[1]
        self.assertEqual(crime2.title, 'Zusammenstoß mit Gegenverkehr')
        self.assertEqual(crime2.date, '07.11.2016, 11.15 Uhr')
        self.assertEqual(crime2.place, 'Kreischa, OT Brösgen')
        self.assertTrue(crime2.message.startswith('Heute Vormittag stießen auf der Ortsverbindungsstraße'))

    def test_parse_reports_getcrimedetails2(self):
        path = os.path.join(os.path.dirname(__file__), '../resources/raub.json')
        with open(path) as data_file:
            pages = json.load(data_file)

        parser2 = Parser()
        reports = parser2.parse_reports(pages)

        crime1 = reports[0].crimes[0]
        self.assertEqual(crime1.title, 'Raub')
        self.assertEqual(crime1.date, '25.11.2016, 20.30 Uhr')
        self.assertEqual(crime1.place, 'Dresden, Amalie-Dietrich-Platz')
        self.assertTrue(crime1.message.startswith('Der 33-jährige Geschädigte hielt sich bei'))
