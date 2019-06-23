import { ICrime, IStoreState } from 'components/types';

// actions
enum ActionTypes {
    HIGHLIGHT_CRIME = 'HIGHLIGHT_CRIME'
}

// action creators
interface IHighlightCrime {
    type: ActionTypes.HIGHLIGHT_CRIME,
    crimeId: number,
    highlight: boolean,
}

export function highlightCrime(crimeId: number, highlight: boolean): IHighlightCrime {
    return {
        crimeId: crimeId,
        highlight: highlight,
        type: ActionTypes.HIGHLIGHT_CRIME,
    }
}

// reducers
function highlightReport(state: IStoreState, action: IHighlightCrime): IStoreState {
    switch (action.type) {        
        case ActionTypes.HIGHLIGHT_CRIME:
            {
                return {
                    ...state,
                    crimes: state.crimes.map((crime: ICrime) => crime.id === action.crimeId ?
                        { ...crime, highlight: action.highlight } : crime
                    )
                }
            }
        default:
            return state;
    }
}

export default highlightReport
