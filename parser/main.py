from scrapy import cmdline
cmdline.execute("scrapy crawl police -L INFO -s DATABASE_PATH=../crimes2019.sq3".split())