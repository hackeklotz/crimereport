import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CrimeViewer, ICrime } from './components/crimeviewer/crimeViewer';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const crimes: ICrime[] = [{id: 1, time: '18:00', place: 'Plauen', title: 'Raub', text:'Raub in Plauen'},
                          {id: 2, time: '7:00', place: 'Cotta', title: 'Diebstahl', text:'Diebstahl in Cotta'}]

ReactDOM.render(
  <CrimeViewer day='today' crimes={crimes}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
