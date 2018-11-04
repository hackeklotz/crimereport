import * as React from 'react';

export interface IProps {
  day: string;
  onNext: () => void;
  onPrevious: () => void;
}

export function CrimeSelector({day, onNext, onPrevious}: IProps) {
  return (
    <div>
      <div>
        <h2>{day}</h2>
        <button onClick={onPrevious}>previous</button>
        <button onClick={onNext}>next</button>
      </div>      
    </div>
  );
}