import { Dispatch } from 'redux';
import { ICrime, IStoreState } from 'src/components/types';

// actions
export enum ActionTypes {
    NEXT_REPORT = 'NEXT_REPORT',
    PREVIOUS_REPORT = 'PREVIOUS_REPORT',
    REQUEST_REPORT = 'REQUEST_REPORT',
    RECEIVE_REPORT = 'RECEIVE_REPORT',
    REQUEST_ALL_REPORT_IDS = 'REQUEST_ALL_REPORT_IDS',
    RECEIVE_ALL_REPORT_IDS = 'RECEIVE_ALL_REPORT_IDS'
}

// action creators
export interface ISwitchReport {
    type: string;
}

export function nextReport() {
    return (dispatch: Dispatch<any>, getState: () => IStoreState) => {
        return dispatch(fetchAllReportIds()).then(() => {
            const reportIds = getState().allReportIds
            const currentReportId = getState().reportId
            const nextReportId = reportIds[reportIds.indexOf(currentReportId) + 1]
            return dispatch(fetchReport(nextReportId));
        })
    };
}

export function previousReport() {
    return (dispatch: Dispatch<any>, getState: () => IStoreState) => {
        return dispatch(fetchAllReportIds()).then(() => {
            const reportIds = getState().allReportIds
            const currentReportId = getState().reportId
            const nextReportId = reportIds[reportIds.indexOf(currentReportId) - 1]
            return dispatch(fetchReport(nextReportId));
        })
    };
}

export interface IFetchReport {
    type: string,
    reportId: number
}

export function requestReport(currentReportId: number): IFetchReport {
    return {
        reportId: currentReportId,
        type: ActionTypes.REQUEST_REPORT,
    }
}

export interface IReceiveReport {
    type: ActionTypes.RECEIVE_REPORT,
    reportId: number,
    posts: ICrime[],
    receivedAt: number
}

export function receiveReport(currentReportId: number, report: ICrime[]): IReceiveReport {
    return {
        posts: report,
        receivedAt: Date.now(),
        reportId: currentReportId,
        type: ActionTypes.RECEIVE_REPORT,
    }
}

export function fetchReport(reportId: number): any {
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

export interface IFetchReports {
    type: string
}

export function requestAllReportIds(): IFetchReports {
    return {
        type: ActionTypes.REQUEST_ALL_REPORT_IDS,
    }
}

export interface IReceiveReportIds {
    type: ActionTypes.RECEIVE_ALL_REPORT_IDS,
    allReportIds: number[],
    receivedAt: number
}

export function receiveAllReportIds(reports: number[]): IReceiveReportIds {
    return {
        allReportIds: reports,
        receivedAt: Date.now(),
        type: ActionTypes.RECEIVE_ALL_REPORT_IDS,
    }
}


export function fetchAllReportIds(): any {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestAllReportIds())

        return fetch(`http://localhost:9090/reports/list`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json => dispatch(receiveAllReportIds(json)))
    }
}

type Action = IReceiveReport | IReceiveReportIds

// reducers
export function selectReport(state: IStoreState, action: Action): IStoreState {
    switch (action.type) {
        case ActionTypes.RECEIVE_REPORT:
            {
                const newCrimes: ICrime[] = []
                action.posts.forEach((crime: any) => {
                    const newCrime = {
                        id: 1, message: crime.message, place: crime.place,
                        time: crime.time, title: crime.title
                    }
                    newCrimes.push(newCrime)
                })

                return { ...state, crimes: newCrimes, reportId: action.reportId };
            }
        case ActionTypes.RECEIVE_ALL_REPORT_IDS:
            {
                return { ...state, allReportIds: action.allReportIds };
            }
    }
    return state;
}

export default selectReport
