import { combineReducers } from 'redux'
import { user } from './user'
import { app } from './app'
import { admin } from './admin'
import { persisted } from './persisted'

const rootReducer = combineReducers({
    appState: app,
    userState: user,
    adminState: admin,
    persistedState: persisted
})

export default rootReducer