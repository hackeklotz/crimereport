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
  day: string;
  crimes: ICrime[];
}

export function CrimeViewer({day, crimes}: IProps) {
  return (
    <div>
      <div>
        Crimes for {day}
      </div>
      <div>        
        <ul>
          {crimes.map((crime) => <li key={crime.id}>{crime.title}</li>)}
        </ul>
      </div>
    </div>
  );
}
