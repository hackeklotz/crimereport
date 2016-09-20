from kivy.adapters.listadapter import ListAdapter
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.listview import ListView, ListItemButton

from kivy.app import App

from kivy.garden.mapview import MapView, MapMarker


class Map(MapView):

    def __init__(self):
        super(Map, self).__init__(zoom=11, lat=51.049259, lon=13.73836)

    def add_crime_marker(self, crime):
        if crime.has_geo_position():
            marker = MapMarker(lat=crime.latitude, lon=crime.longitude)
            self.add_marker(marker)


class CrimeReportApp(App):
    def build(self):
        root = BoxLayout(orientation='horizontal')

        self.map = Map()
        root.add_widget(self.map)

        self.control = BoxLayout(orientation='vertical')
        self.control.size_hint = (0.6, 1)

        # create load button
        button = Button(text="load", size_hint=(1, 0.1))
        button.bind(on_release=self.load)
        self.control.add_widget(button)

	# create empty list view for crimes
        args_converter = lambda row_index, rec: {'text': get_caption(rec)}

        self.list_adapter = ListAdapter(data=[], # empty
                                   args_converter=args_converter,
                                   cls='CrimeButton')

        self.list_adapter.bind(on_selection_change=self.crimeSelected)

        list_view = ListView(adapter=self.list_adapter)
        self.control.add_widget(list_view)


        root.add_widget(self.control)
        return root

    def load(self, obj):
        # load crimes from data base
        import database
        database2 = database.SqliteDatabase()
        crimes = database2.load_crimes()

        for crime in crimes:
            self.map.add_crime_marker(crime)

        # replace the data in the list adapter -> list view will be updated automatically
        self.list_adapter.data = crimes

    def crimeSelected(self, adapter):
        for selection in adapter.selection:
            index = selection.index
            crime = adapter.data[index]
            self.map.add_crime_marker(crime)


def get_caption(crime):
        return crime.title + "\n" + crime.place + "\n" + crime.date

if __name__ == "__main__":
    CrimeReportApp().run()




