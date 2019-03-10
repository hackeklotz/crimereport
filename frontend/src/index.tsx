import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import CrimeSelector from 'src/components/crimeselector/crimeSelector';
import CrimeViewer from 'src/components/crimeviewer/crimeViewer';
import { ICrime } from 'src/components/types';
import rootReducer from './components/crimeselector/crimeSelectorRedux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


const crimesExample: ICrime[] = [{ id: 1, time: '18:00', place: 'Plauen', title: 'Raub', message: 'Raub in Plauen' },
{ id: 2, time: '7:00', place: 'Cotta', title: 'Diebstahl', message: 'Diebstahl in Cotta' }]

const preloadedStore = {
  allReportIds: [],
  crimes: crimesExample,
  day: 'today0',
  reportId: 46970  
}

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,  
  preloadedStore,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const position: [number,number] = [51.049259, 13.73836]
const map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position}>
      <Popup>Crime XYZ</Popup>
    </Marker>
  </Map>
)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <CrimeSelector />
      <CrimeViewer />
      {map}
    </div>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
