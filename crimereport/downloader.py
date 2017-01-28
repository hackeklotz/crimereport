import html

__author__ = 'aberklotz'

import ssl

from typing import Dict
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.poolmanager import PoolManager
import requests


class MyAdapter(HTTPAdapter):
    def init_poolmanager(self, connections, maxsize, block=False):
        self.poolmanager = PoolManager(num_pools=connections,
                                       maxsize=maxsize,
                                       block=block,
                                       ssl_version=ssl.PROTOCOL_TLSv1)


class Downloader:
    def retrieve(self, link):
        r = requests.get(link)
        r.encoding = 'utf-8'
        text = html.unescape(r.text)
        return text

    def retrieve_year(self, year: int) -> Dict[str, str]:
        print("Download year " + str(year))
        pages = {}

        for i in range(46964, 46971):
            url = "https://www.polizei.sachsen.de/de/MI_" + str(year) + "_" + str(i) + ".htm"
            print("Download " + str(url))
            text = self.retrieve(url)
            pages[url] = text

        print("Finished Downloading")
        return pages

if __name__ == "__main__":
    import json

    downloader = Downloader()
    pages = downloader.retrieve_year(2017)

    with open('../examples/crimes2017-Test.json', 'w', encoding='utf8') as fp:
        json.dump(pages, fp, ensure_ascii=False)