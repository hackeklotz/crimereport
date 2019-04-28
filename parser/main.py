from scrapy import cmdline

cmdline.execute("scrapy crawl police -L DEBUG -s DATABASE_PATH=../crimes2019.sq3 -s REPROCESS_REPORTS=False".split())
