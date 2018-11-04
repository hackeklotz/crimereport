import { IStoreState } from 'src/components/types';

// actions
export const NEXT_REPORT = 'NEXT_REPORT';

// action creators
export interface INextReport {
    type: string;
}

export function nextReport(): INextReport {
    return {
        type: NEXT_REPORT
    }
}

// reducers
export function switchReport(state: IStoreState, action: INextReport): IStoreState {
    switch (action.type) {
        case NEXT_REPORT:            
            let num = parseInt(state.day.slice(5), 10);
            num++;
            const day2 = 'today'+num;
            return { ...state, day: day2 };
    }
    return state;
}
