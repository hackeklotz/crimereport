import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CrimeSelector from 'src/components/crimeselector/crimeSelector';
import CrimeViewer from 'src/components/crimeviewer/crimeViewer';
import { ICrime } from 'src/components/types';
import { switchReport } from './components/crimeselector/crimeSelectorRedux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


const crimesExample: ICrime[] = [{ id: 1, time: '18:00', place: 'Plauen', title: 'Raub', text: 'Raub in Plauen' },
{ id: 2, time: '7:00', place: 'Cotta', title: 'Diebstahl', text: 'Diebstahl in Cotta' }]

const store = createStore(switchReport, {
  crimes: crimesExample,
  day: 'today0',
});

ReactDOM.render(
  <Provider store={store}>
    <div>
      <CrimeSelector />
      <CrimeViewer />
    </div>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
