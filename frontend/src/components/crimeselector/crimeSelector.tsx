import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from 'src/components/types';
import { nextReport, previousReport } from './crimeSelectorRedux';

interface IProps {
  day: string;
  onNext: () => void;
  onPrevious: () => void;
}

function CrimeSelector({day, onNext, onPrevious}: IProps) {
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


// container
function mapStateToProps({ day }: IStoreState) {
  return {
      day,
  }
}

function mapDispatchToProps(dispatch: any,) {
  return {
      onNext: () => dispatch(nextReport()),
      onPrevious: () => dispatch(previousReport()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeSelector);