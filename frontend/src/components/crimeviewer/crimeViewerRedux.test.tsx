import viewerReducer, { highlightCrime } from 'components/crimeviewer/crimeViewerRedux';
import expect from 'expect';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

function createInitialStore() {
    const initialState = {
        crimes: [{
            id: 1,
            highlight: false
        }, {
            id: 2,
            highlight: true
        }]
    }
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

        expect(store.getState()).toEqual(
            {
                crimes: [{
                    id: 1,
                    highlight: true
                }, {
                    id: 2,
                    highlight: true
                }]
            }
        )
    })

    it('highlight set to false', () => {
        const store = createInitialStore()

        store.dispatch(highlightCrime(2, false))

        expect(store.getState()).toEqual(
            {
                crimes: [{
                    id: 1,
                    highlight: false
                }, {
                    id: 2,
                    highlight: false
                }]
            }
        )
    })

    it('highlight toggle', () => {
        const store = createInitialStore()

        store.dispatch(highlightCrime(1, true))
        store.dispatch(highlightCrime(1, false))

        expect(store.getState()).toEqual(
            {
                crimes: [{
                    id: 1,
                    highlight: false
                }, {
                    id: 2,
                    highlight: true
                }]
            }
        )
    })

    it('invalid ID', () => {
        const store = createInitialStore()

        store.dispatch(highlightCrime(666, true))

        expect(store.getState()).toEqual(
            {
                crimes: [{
                    id: 1,
                    highlight: false
                }, {
                    id: 2,
                    highlight: true
                }]
            }
        )
    })
})