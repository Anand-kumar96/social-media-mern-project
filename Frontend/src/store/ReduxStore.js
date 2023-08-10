// this will contain all state
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunk from 'redux-thunk' // for asynchronous work in reducer
import { reducers } from '../reducers'

// storing in localStorage
function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store)
    window.localStorage.setItem('store', serializedStore)
  } catch (e) {
    console.log(e)
  }
}
// getting data from localStorage
function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem('store')
    if (serializedStore === null) return undefined
    return JSON.parse(serializedStore)
  } catch (e) {
    console.log(e)
    return undefined
  }
}
// it will make our store available for redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedState = loadFromLocalStorage()

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
)

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store

// to open any component use=> ctrl+p => then search