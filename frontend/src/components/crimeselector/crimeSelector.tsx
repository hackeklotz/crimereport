import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from 'components/types';
import './crimeSelector.css';
import { lastReport, nextReport, previousReport } from './crimeSelectorRedux';
import { useEffect } from 'react';

interface IProps {
  reportId: number;
  onInit: () => void;
  onNext: () => void;
  onPrevious: () => void;
}


function CrimeSelector({ reportId, onInit, onNext, onPrevious }: IProps) {
  useEffect(() => { onInit(); }, [onInit])

  return (
    <div className='crime-selector'>
      <button onClick={onPrevious} className="crime-selector-button left" />
      {reportId}
      <button onClick={onNext} className="crime-selector-button right" />
    </div>
  );
}


// container
function mapStateToProps({ reportId }: IStoreState) {
  return {
    reportId,
  }
}

function mapDispatchToProps(dispatch: any, ) {
  return {
    onNext: () => dispatch(nextReport()),
    onPrevious: () => dispatch(previousReport()),
    onInit: () => dispatch(lastReport()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeSelector);