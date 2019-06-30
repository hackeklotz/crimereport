import { Dispatch } from 'redux';
import { ICrime, IStoreState, IReport } from 'components/types';

const region = 'Landeshauptstadt Dresden'

// actions
enum ActionTypes {
    NEXT_REPORT = 'NEXT_REPORT',
    PREVIOUS_REPORT = 'PREVIOUS_REPORT',
    REQUEST_REPORT = 'REQUEST_REPORT',
    RECEIVE_REPORT = 'RECEIVE_REPORT',
    REQUEST_ALL_REPORT_IDS = 'REQUEST_ALL_REPORT_IDS',
    RECEIVE_ALL_REPORT_IDS = 'RECEIVE_ALL_REPORT_IDS',
}

// action creators
export function nextReport() {
    return (dispatch: Dispatch<any>, getState: () => IStoreState) => {
        return dispatch(fetchAllReportIds()).then(() => {
            const reportIds = getState().allReportIds
            const currentReportId = getState().currentReport.id
            let index = reportIds.indexOf(currentReportId) + 1
            index = Math.min(reportIds.length - 1, index)
            const nextReportId = reportIds[index]
            return dispatch(fetchReport(nextReportId));
        })
    };
}

export function previousReport() {
    return (dispatch: Dispatch<any>, getState: () => IStoreState) => {
        return dispatch(fetchAllReportIds()).then(() => {
            const reportIds = getState().allReportIds
            const currentReportId = getState().currentReport.id
            let index = reportIds.indexOf(currentReportId) - 1
            index = Math.max(0, index)
            const nextReportId = reportIds[index]
            return dispatch(fetchReport(nextReportId));
        })
    };
}

export function lastReport() {
    return (dispatch: Dispatch<any>, getState: () => IStoreState) => {
        return dispatch(fetchAllReportIds()).then(() => {
            const reportIds = getState().allReportIds
            let index = reportIds[reportIds.length - 1]
            return dispatch(fetchReport(index));
        })
    };
}

interface IFetchReport {
    type: string,
    reportId: string
}

function requestReport(currentReportId: string): IFetchReport {
    return {
        reportId: currentReportId,
        type: ActionTypes.REQUEST_REPORT,
    }
}

interface IReceiveReport {
    type: ActionTypes.RECEIVE_REPORT,
    reportId: string,
    posts: IReport,
    receivedAt: number
}

function receiveReport(currentReportId: string, report: IReport): IReceiveReport {
    return {
        posts: report,
        receivedAt: Date.now(),
        reportId: currentReportId,
        type: ActionTypes.RECEIVE_REPORT,
    }
}

function fetchReport(reportId: string): any {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestReport(reportId))

        return fetch(`/api/reports/${reportId}?region=` + region)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json => dispatch(receiveReport(reportId, json)))
    }
}

interface IFetchReports {
    type: string
}

function requestAllReportIds(): IFetchReports {
    return {
        type: ActionTypes.REQUEST_ALL_REPORT_IDS,
    }
}

interface IReceiveReportIds {
    type: ActionTypes.RECEIVE_ALL_REPORT_IDS,
    allReportIds: string[],
    receivedAt: number
}

function receiveAllReportIds(reports: string[]): IReceiveReportIds {
    return {
        allReportIds: reports,
        receivedAt: Date.now(),
        type: ActionTypes.RECEIVE_ALL_REPORT_IDS,
    }
}


function fetchAllReportIds(): any {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestAllReportIds())

        return fetch(`/api/reports/?region=` + region)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json => dispatch(receiveAllReportIds(json)))
    }
}

type Action = IReceiveReport | IReceiveReportIds

// reducers
function selectReport(state: IStoreState, action: Action): IStoreState {
    switch (action.type) {
        case ActionTypes.RECEIVE_REPORT:
            {
                const newCrimes: ICrime[] = []
                action.posts.crimes.forEach((crime: any) => {

                    let coordinate;
                    if (crime.point != null) {
                        coordinate = crime.point.coordinates;
                    }

                    const newCrime = {
                        coordinate,
                        id: crime.id,
                        message: crime.message,
                        place: crime.place,
                        time: crime.time,
                        title: crime.title,
                        highlight: false,
                    }
                    newCrimes.push(newCrime)
                })
                const report: IReport = {
                    id: action.posts.id,
                    year: action.posts.year,
                    number: action.posts.number,
                    crimes: newCrimes
                }

                return { ...state, currentReport: report};
            }
        case ActionTypes.RECEIVE_ALL_REPORT_IDS:
            {
                return { ...state, allReportIds: action.allReportIds };
            }
        default:
            return state;
    }
}

export default selectReport
