import * as React from 'react';
import { connect } from 'react-redux';
import { ICrime, IStoreState } from 'src/components/types';
import './crimeViewer.css';

export interface IProps {
  crimes: ICrime[];
}

export function CrimeViewer({crimes}: IProps) {
  const crimeList = crimes.map((crime) => <li key={crime.id}>
    <h1>{crime.title}</h1>    
    <p>{crime.message}</p>
    </li>)
  return (    
    <ul className='crime-viewer-list'>
      {crimeList}
    </ul>
  );
}

// container
function mapStateToProps({ crimes }: IStoreState) {
  return {
      crimes,
  }
}

export default connect(mapStateToProps, null)(CrimeViewer);