import {
    USER_STATE_CHANGE,
    USER_AUTH_STATE_CHANGE,
    CLEAR_DATA
} from '../actionTypes'

const INITIAL_STATE = {
    currentUser: {},
    currentAuthUser: {}
}

export const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.data
                }
            }
        case USER_AUTH_STATE_CHANGE:
            return {
                ...state,
                currentAuthUser: action.currentAuthUser,
            }
        case CLEAR_DATA:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}