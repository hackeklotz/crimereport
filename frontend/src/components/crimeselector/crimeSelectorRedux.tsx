import { IStoreState } from 'src/components/types';

// actions
export const NEXT_REPORT = 'NEXT_REPORT';
export const PREVIOUS_REPORT = 'PREVIOUS_REPORT';

// action creators
export interface ISwitchReport {
    type: string;
}

export function nextReport(): ISwitchReport {
    return {
        type: NEXT_REPORT
    }
}

export function previousReport(): ISwitchReport {
    return {
        type: PREVIOUS_REPORT
    }
}

// reducers
export function switchReport(state: IStoreState, action: ISwitchReport): IStoreState {
    switch (action.type) {
        case NEXT_REPORT:
            {
                let num = parseInt(state.day.slice(5), 10);
                num++;
                const day2 = 'today' + num;
                return { ...state, day: day2 };
            }
        case PREVIOUS_REPORT:
            {
                let num = parseInt(state.day.slice(5), 10);
                num--;
                const day2 = 'today' + num;
                return { ...state, day: day2 };
            }
    }
    return state;
}
