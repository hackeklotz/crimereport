import json
from osgeo import gdal, ogr

ways = {}


def process_features():
    gdal.SetConfigOption('OGR_INTERLEAVED_READING', 'YES')
    osm = ogr.Open('Dresden.osm')

    for iLayer in range(osm.GetLayerCount()):
        if iLayer > 1:
            break
        layer = osm.GetLayer(iLayer)
        feature = layer.GetNextFeature()

        while feature is not None:
            if iLayer == 1:
                process_way(feature)
            feature.Destroy()
            feature = layer.GetNextFeature()


def process_way(feature):
    if feature.IsFieldSet('name'):
        name = feature.GetFieldAsString('name')
        geometry = feature.GetGeometryRef()
        ways[name] = geometry.ExportToWkt()


def write_ways():
    with open('ways.json', 'w') as file:
        json.dump(ways, file)


if __name__ == '__main__':
    process_features()
    write_ways()
