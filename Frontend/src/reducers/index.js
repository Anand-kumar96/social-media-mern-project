// it specifies all the reducer in our application
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import postReducer from './postReducer'
export const reducers = combineReducers({ authReducer, postReducer })
