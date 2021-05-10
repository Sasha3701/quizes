import {combineReducers} from 'redux'
import authReducer from './auth'
import createReducer from './create'
import quizeReducer from './quiz'

export default combineReducers({
    quiz: quizeReducer,
    create: createReducer,
    auth: authReducer
})