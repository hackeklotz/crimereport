import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CrimeViewer} from './crimeViewer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CrimeViewer day='today' crimes={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
