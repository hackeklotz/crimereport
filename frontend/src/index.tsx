import CrimeMap from 'components/crimemap/crimeMap';
import CrimeSelector from 'components/crimeselector/crimeSelector';
import selectorReducer from 'components/crimeselector/crimeSelectorRedux';
import CrimeViewer from 'components/crimeviewer/crimeViewer';
import viewerReducer from 'components/crimeviewer/crimeViewerRedux';
import { IStoreState, IReport } from 'components/types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduceReducers from 'reduce-reducers';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const preloadedStore: IStoreState= {
  allReportIds: [],
  currentReport: {id: "", year:-1, number:-1, crimes:[]}
}

const rootReducer = reduceReducers(selectorReducer as any, viewerReducer as any)
const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  preloadedStore as any,
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
