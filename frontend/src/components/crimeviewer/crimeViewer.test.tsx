import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CrimeViewer } from './crimeViewer';

function dummyHighlight(crimeId: number, highlight:boolean){

}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CrimeViewer crimes={[]} highlightCrime={dummyHighlight}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});