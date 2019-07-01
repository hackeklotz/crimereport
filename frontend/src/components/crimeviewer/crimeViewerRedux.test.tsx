import viewerReducer, { highlightCrime } from 'components/crimeviewer/crimeViewerRedux';
import expect from 'expect';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { IStoreState, IReport } from 'components/types';


function createFakeStore(firstHighlight: boolean, secondHighlight: boolean): IStoreState {
    const report: IReport = {
        id: "",
        year: -1,
        number: -1,
        crimes: [{
            id: 1,
            title: "",
            time: "",
            place: "",
            message: "",
            coordinate: [-1,-1],
            highlight: firstHighlight
        }, {
            id: 2,
            title: "",
            time: "",
            place: "",
            message: "",
            coordinate: [-1,-1],
            highlight: secondHighlight
        }]
    }
    return {
        allReportIds: [],
        currentReport: report        
    }    
}

function createInitialStore() {
    const initialState = createFakeStore(false, true)

    return createStore(
        viewerReducer as any,
        initialState,
        applyMiddleware(thunkMiddleware)
    )
}

describe('highlightCrime', () => {

    it('highlight set to true', () => {
        const store = createInitialStore()

        store.dispatch(highlightCrime(1, true))

        expect(store.getState()).toEqual(createFakeStore(true, true))
    })

    it('highlight set to false', () => {
        const store = createInitialStore()

        store.dispatch(highlightCrime(2, false))

        expect(store.getState()).toEqual(createFakeStore(false, false))
    })

    it('highlight toggle', () => {
        const store = createInitialStore()

        store.dispatch(highlightCrime(1, true))
        store.dispatch(highlightCrime(1, false))

        expect(store.getState()).toEqual(createFakeStore(false, true))
    })

    it('invalid ID', () => {
        const store = createInitialStore()

        store.dispatch(highlightCrime(666, true))

        expect(store.getState()).toEqual(createFakeStore(false, true))
    })
})