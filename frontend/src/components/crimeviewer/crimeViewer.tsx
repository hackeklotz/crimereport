import * as React from 'react';
import './crimeViewer.css';

export interface ICrime {
  id: number;
  time: string;
  place: string;
  title: string;
  text: string
}

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
