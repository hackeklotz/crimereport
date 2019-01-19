import { Dispatch } from 'redux';
import { ICrime, IStoreState } from 'src/components/types';

// actions
export const NEXT_REPORT = 'NEXT_REPORT';
export const PREVIOUS_REPORT = 'PREVIOUS_REPORT';
export const REQUEST_REPORT = 'REQUEST_REPORT';
export const RECEIVE_REPORT = 'RECEIVE_REPORT';

// action creators
export interface ISwitchReport {
    type: string;
}

export function nextReport() {
    return (dispatch: Dispatch<any>, getState: IStoreState) => {
        const reportId = 46989;
        dispatch(fetchReport(reportId));
    };
}

export function previousReport() {
    return (dispatch: Dispatch<any>, getState: IStoreState) => {
        const reportId = 46987;
        dispatch(fetchReport(reportId));
    };
}

export interface IFetchReport {
    type: string,
    reportId: number
}

export function requestReport(currentReportId: number): IFetchReport {
    return {
        reportId: currentReportId,
        type: REQUEST_REPORT,
    }
}

export interface IReceiveReport {
    type: string,
    reportId: number,
    posts: ICrime[],
    receivedAt: number
}

export function receiveReport(currentReportId: number, report: ICrime[]): IReceiveReport {
    return {
        posts: report,
        receivedAt: Date.now(),
        reportId: currentReportId,
        type: RECEIVE_REPORT,
    }
}

export function fetchReport(reportId: number) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestReport(reportId))

        return fetch(`http://localhost:9090/reports/${reportId}`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json => dispatch(receiveReport(reportId, json)))
    }
}

// reducers
export function fetchReport2(state: IStoreState, action: IReceiveReport): IStoreState {
    switch (action.type) {
        case RECEIVE_REPORT:
            {
                const newCrimes: ICrime[] = []
                action.posts.forEach((crime) => {
                    const newCrime = {
                        id: 1, message: crime.message, place: crime.place,
                        time: crime.time, title: crime.title
                    }
                    newCrimes.push(newCrime)
                })

                return { ...state, crimes: newCrimes };
            }
    }
    return state;
}

export default fetchReport2
