import * as React from 'react';
import { connect } from 'react-redux';
import { ICrime, IStoreState } from 'src/components/types';
import './crimeViewer.css';

export interface IProps {
  crimes: ICrime[];
}

export function CrimeViewer({crimes}: IProps) {
  const crimeList = crimes.map((crime) => <li key={crime.id}>
    <h3>{crime.title}</h3>
    <h4>Zeit: {crime.time}</h4>
    <h4>Ort: {crime.place}</h4>
    {crime.message}
    </li>)
  return (
    <div>
      <ul>
        {crimeList}
      </ul>      
    </div>
  );
}

// container
function mapStateToProps({ crimes }: IStoreState) {
  return {
      crimes,
  }
}

export default connect(mapStateToProps, null)(CrimeViewer);