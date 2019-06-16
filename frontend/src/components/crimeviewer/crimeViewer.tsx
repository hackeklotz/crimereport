import * as React from 'react';
import { connect } from 'react-redux';
import { ICrime, IStoreState } from 'components/types';
import { highlightCrime } from 'components/crimeselector/crimeSelectorRedux';
import './crimeViewer.css';

export interface IProps {
  crimes: ICrime[];

  highlightCrime: (crimeId: number, highlight: boolean) => void;
}

export function CrimeViewer({ crimes, highlightCrime }: IProps) {
  const crimeList = crimes.map((crime) =>
    <li key={crime.id}
      className={crime.highlight ? 'crime-viewer-list-hover' : ''}
      onMouseEnter={() => highlightCrime(crime.id, true)}
      onMouseLeave={() => highlightCrime(crime.id, false)}>
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
function mapDispatchToProps(dispatch: any, ) {
  return {
    highlightCrime: (crimeId: number, highlight: boolean) => dispatch(highlightCrime(crimeId, highlight)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeViewer);