import {
    STORE_TOAST_REF,
} from '../actionTypes'

const INITIAL_STATE = {
    toastRef: undefined
}

export const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_TOAST_REF:
            return {
                ...state,
                toastRef: action.toastRef
            }
        default:
            return state
    }
}