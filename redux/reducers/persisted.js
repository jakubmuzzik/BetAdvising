import {
    HIDE_VERIFY_BANNER,
    CLEAR_PERSISTED_DATA
} from '../actionTypes'

const INITIAL_STATE = {
    verifyBannerHidden: false
}

export const persisted = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HIDE_VERIFY_BANNER:
            return {
                ...state,
                verifyBannerHidden: true
            }
        case CLEAR_PERSISTED_DATA:
            return INITIAL_STATE
            
        default:
            return state
    }
}