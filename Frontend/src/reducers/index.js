// it specifies all the reducer in our application
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import postReducer from './postReducer'
import profileReducer from './showProfileReducer'
export const reducers = combineReducers({ authReducer, postReducer, profileReducer })
