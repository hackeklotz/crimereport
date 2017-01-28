import html

__author__ = 'aberklotz'

from typing import Dict
import requests


class Downloader:
    def retrieve(self, link):
        r = requests.get(link)
        r.encoding = 'utf-8'
        text = html.unescape(r.text)
        return text

    def retrieve_year(self, year: int) -> Dict[str, str]:
        print("Download year " + str(year))
        pages = {}

        for i in range(46964, 46966):
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

    with open('../build/examples/crimes2017-Test.json', 'w', encoding='utf8') as fp:
        json.dump(pages, fp, ensure_ascii=False)
