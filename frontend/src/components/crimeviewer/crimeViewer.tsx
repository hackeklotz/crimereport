import * as React from 'react';
import { ICrime } from 'src/components/types'
import './crimeViewer.css';

export interface IProps {
  crimes: ICrime[];
}

export function CrimeViewer({crimes}: IProps) {
  const crimeList = crimes.map((crime) => <li key={crime.id}>
    <h3>{crime.title}</h3>
    <h4>Zeit: {crime.time}</h4>
    <h4>Ort: {crime.place}</h4>
    {crime.text}
    </li>)
  return (
    <div>
      <ul>
        {crimeList}
      </ul>      
    </div>
  );
}
