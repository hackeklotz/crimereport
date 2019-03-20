import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from 'src/components/types';
import './crimeSelector.css';
import { nextReport, previousReport } from './crimeSelectorRedux';

interface IProps {
  reportId: number;
  onNext: () => void;
  onPrevious: () => void;
}

function CrimeSelector({reportId, onNext, onPrevious}: IProps) {
  return (
    <div className='crime-selector'>
        <button onClick={onPrevious} className="crime-selector-button left"/>
        {reportId}
        <button onClick={onNext} className="crime-selector-button right"/>
    </div>
  );
}


// container
function mapStateToProps({ reportId }: IStoreState) {
  return {
    reportId,
  }
}

function mapDispatchToProps(dispatch: any,) {
  return {
      onNext: () => dispatch(nextReport()),
      onPrevious: () => dispatch(previousReport()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeSelector);