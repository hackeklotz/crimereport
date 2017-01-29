import json
import parser
import enricher
import database
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)
stream = logging.StreamHandler()
logger.addHandler(stream)


def do_it_all(path_download, path_database):
    with open(path_download) as data_file:
        pages = json.load(data_file)

    logger.info('Parsing ' + str(len(pages)) + ' pages')
    parser2 = parser.Parser()
    reports = parser2.parse_reports(pages)

    logger.info('Enriching ' + str(len(reports)) + ' reports')
    enricher.enrich_crimes(reports)

    logger.info('Write to database')
    database2 = database.SqliteDatabase(path_database)
    database2.init_database()
    database2.store_reports(reports)


def main():
    pathDownload = '../examples/crimes2017.json'

    pathDatabase = '../examples/crimes2017.sq3'
    do_it_all(pathDownload, pathDatabase)


if __name__ == '__main__':
    main()
