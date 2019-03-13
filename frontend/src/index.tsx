import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import CrimeMap from 'src/components/crimemap/crimeMap';
import CrimeSelector from 'src/components/crimeselector/crimeSelector';
import CrimeViewer from 'src/components/crimeviewer/crimeViewer';
import { ICrime } from 'src/components/types';
import rootReducer from './components/crimeselector/crimeSelectorRedux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


const crimesExample: ICrime[] = []

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

ReactDOM.render(
  <Provider store={store}>
    <div className='crime-main'>
      <CrimeMap />
      <CrimeSelector />
      <CrimeViewer />      
    </div>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
