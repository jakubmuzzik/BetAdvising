import {
    STORE_TOAST_REF,
    TOGGLE_DRAWER
} from '../actionTypes'

const INITIAL_STATE = {
    toastRef: undefined,
    toggleDrawer: false
}

export const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_TOAST_REF:
            return {
                ...state,
                toastRef: action.toastRef
            }
        case TOGGLE_DRAWER:
            return {
                ...state,
                toggleDrawer: !state.toggleDrawer
            }
        default:
            return state
    }
}