import {
    NEW_TICKETS_COUNT_CHANGE,
    CLOSED_TICKETS_COUNT_CHANGE,
    CLEAR_DATA
} from '../actionTypes'

const INITIAL_STATE = {
    newTicketsCount: null,
    closedTicketsCount: null
}

export const admin = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEW_TICKETS_COUNT_CHANGE:
            return {
                ...state,
                newTicketsCount: action.newTicketsCount
            }
        case CLOSED_TICKETS_COUNT_CHANGE:
            return {
                ...state,
                closedTicketsCount: action.closedTicketsCount
            }
        case CLEAR_DATA:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}