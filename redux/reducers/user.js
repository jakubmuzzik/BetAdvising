import {
    USER_STATE_CHANGE,
    USER_AUTH_STATE_CHANGE,
    CLEAR_DATA,
    OFFERS_STATE_CHANGE,
    UNLOCKED_STATE_CHANGE,
    NOTIFICATIONS_STATE_CHANGE
} from '../actionTypes'

const INITIAL_STATE = {
    currentUser: {},
    currentAuthUser: {},
    offers: null,
    unlocked: null,
    notifications: null
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
        case OFFERS_STATE_CHANGE:
            return {
                ...state,
                offers: action.offers
            }
        case UNLOCKED_STATE_CHANGE:
            return {
                ...state,
                unlocked: action.unlocked
            }
        case NOTIFICATIONS_STATE_CHANGE:
            return {
                ...state,
                notifications: action.notifications
            }
        default:
            return state;
    }
}