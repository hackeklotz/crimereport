from geopy import Photon
from geopy.extra.rate_limiter import RateLimiter


class GeoCodePipeline(object):

    def open_spider(self, spider):
        geolocator = Photon(timeout=5)
        self.__geocodeFunc = RateLimiter(geolocator.geocode, min_delay_seconds=2)

    def process_item(self, item, spider):

        for crime in item["crimes"]:
            place = crime["place"]
            latitude, longitude = self.__geocode_address(place)
            crime["latitude"] = latitude
            crime["longitude"] = longitude
        return item

    def __geocode_address(self, place):
        if place is None:
            return None, None

        location = self.__geocodeFunc(place)
        if location is not None:
            return location.latitude, location.longitude
        else:
            return None, None
