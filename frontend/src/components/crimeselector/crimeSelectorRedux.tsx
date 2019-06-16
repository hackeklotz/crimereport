import { Dispatch } from 'redux';
import { ICrime, IStoreState } from 'components/types';

const region = 'Landeshauptstadt Dresden'

// actions
enum ActionTypes {
    NEXT_REPORT = 'NEXT_REPORT',
    PREVIOUS_REPORT = 'PREVIOUS_REPORT',
    REQUEST_REPORT = 'REQUEST_REPORT',
    RECEIVE_REPORT = 'RECEIVE_REPORT',
    REQUEST_ALL_REPORT_IDS = 'REQUEST_ALL_REPORT_IDS',
    RECEIVE_ALL_REPORT_IDS = 'RECEIVE_ALL_REPORT_IDS',

    HIGHLIGHT_CRIME = 'HIGHLIGHT_CRIME'
}

// action creators
interface ISwitchReport {
    type: string;
}

export function nextReport() {
    return (dispatch: Dispatch<any>, getState: () => IStoreState) => {
        return dispatch(fetchAllReportIds()).then(() => {
            const reportIds = getState().allReportIds
            const currentReportId = getState().reportId
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
            const currentReportId = getState().reportId
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
    reportId: number
}

function requestReport(currentReportId: number): IFetchReport {
    return {
        reportId: currentReportId,
        type: ActionTypes.REQUEST_REPORT,
    }
}

interface IReceiveReport {
    type: ActionTypes.RECEIVE_REPORT,
    reportId: number,
    posts: ICrime[],
    receivedAt: number
}

function receiveReport(currentReportId: number, report: ICrime[]): IReceiveReport {
    return {
        posts: report,
        receivedAt: Date.now(),
        reportId: currentReportId,
        type: ActionTypes.RECEIVE_REPORT,
    }
}

function fetchReport(reportId: number): any {
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
    allReportIds: number[],
    receivedAt: number
}

function receiveAllReportIds(reports: number[]): IReceiveReportIds {
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

type Action = IReceiveReport | IReceiveReportIds | IHighlightCrime

// reducers
function selectReport(state: any, action: Action): IStoreState {
    switch (action.type) {
        case ActionTypes.RECEIVE_REPORT:
            {
                const newCrimes: ICrime[] = []
                action.posts.forEach((crime: any) => {

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

                return { ...state, crimes: newCrimes, reportId: action.reportId };
            }
        case ActionTypes.RECEIVE_ALL_REPORT_IDS:
            {
                return { ...state, allReportIds: action.allReportIds };
            }
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

export default selectReport
