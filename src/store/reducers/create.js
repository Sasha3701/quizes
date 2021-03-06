import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from '../actions/actionTypes'

const initialState = {
    quize: []
}

export default function createReducer(state = initialState, action) {
    switch(action.type) { 
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quize: [...state.quize, action.item]
            }
        case RESET_QUIZ_CREATION:
            return {
                ...state,
                quize: []
            }
        default:
            return state
    }
}