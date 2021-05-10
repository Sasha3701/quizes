import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from '../../store/actions/actionTypes'
import axios from '../../axios/axios-quize'

export const createQuizQuestion = item => {
    return {
        type: CREATE_QUIZ_QUESTION,
        item: item
    }
}

export const resetQuizCreation = () => {
    return {
        type: RESET_QUIZ_CREATION,
    }
}

export const finishCreateQuiz = () => {
    return async (dispatch, getState) => {
        const state = getState().create.quize
        await axios.post("/quizes.json", state);
        dispatch(resetQuizCreation())
    }
}