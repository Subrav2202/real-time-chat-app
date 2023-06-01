import { combineReducers } from 'redux'
import { userRedcuer } from './user/userReducer'

export const rootReducer = combineReducers({
    user : userRedcuer
})